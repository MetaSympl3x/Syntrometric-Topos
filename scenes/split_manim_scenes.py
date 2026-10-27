#!/usr/bin/env python3
"""
split_manim_scenes.py
=====================
Automated parser and refactorer that converts monolithic Manim scripts 
(with Act I, Act II, ... headers) into modular, individual Scene classes 
named according to the video targets specified in your Quarto/Reveal.js .qmd file.
"""

import re
import sys
import shutil
import argparse
from pathlib import Path

# Roman numeral conversion dictionary for Acts
ROMAN_TO_INT = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
    'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
    'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14, 'XV': 15,
    'XVI': 16, 'XVII': 17, 'XVIII': 18, 'XIX': 19, 'XX': 20
}

def parse_qmd_video_targets(qmd_path: Path) -> dict[int, str]:
    """
    Extracts all video references of the form `media/Act{N}_{Name}.mp4`
    from the .qmd file and returns a mapping: { act_number: class_name }
    """
    if not qmd_path.exists():
        print(f"[!] Warning: QMD file '{qmd_path}' not found. Auto-naming will be used.")
        return {}

    qmd_text = qmd_path.read_text(encoding="utf-8")
    
    # Matches <video ... src="media/Act1_Firewall.mp4"> or ![](media/Act1_Firewall.mp4)
    # Optional chapter prefix (e.g. Ch2_) before 'Act<N>'; the class name is the full clip name.
    pattern = re.compile(r'media/((?:\w+?_)??Act(\d+)[^"\'\)\s]*)\.mp4', re.IGNORECASE)
    matches = pattern.findall(qmd_text)

    mapping = {}
    for full_name, act_num_str in matches:
        mapping[int(act_num_str)] = full_name
        
    print(f"[✓] Extracted {len(mapping)} video targets from '{qmd_path.name}':")
    for act_n, name in sorted(mapping.items()):
        print(f"    • Act {act_n:2d} -> {name}.mp4")
    return mapping


def sanitize_title_to_class_name(title: str, act_num: int) -> str:
    """Fallback generator: converts raw Act header text into a valid Python class name."""
    clean = re.sub(r'\(.*?\)', '', title)  # remove parentheticals
    clean = re.sub(r'[^a-zA-Z0-9\s]', '', clean)  # remove special chars
    words = [w.capitalize() for w in clean.split() if w]
    slug = "_".join(words[:4]) if words else "Scene"
    return f"Act{act_num}_{slug}"


def extract_act_blocks(manim_code: str):
    """
    Splits the monolithic construct() body into:
    - Global module code (imports, color palettes, constants)
    - List of Acts: (act_num, act_title, act_body_lines)
    """
    lines = manim_code.splitlines()

    # Regex detecting act headers:
    # # =====================================================================
    # # ACT I (INTRO): QUINT-AXIAL PROVENANCE & 4-STRATUM FIREWALL (FIG 1.1)
    # # =====================================================================
    act_header_pattern = re.compile(r'^\s*#\s*ACT\s+([IVXLCDM\d]+)\s*(?:[:\-\(](.*?))?$', re.IGNORECASE)

    act_indices = []
    for idx, line in enumerate(lines):
        m = act_header_pattern.match(line)
        if m:
            raw_act, raw_title = m.group(1).upper(), m.group(2) or ""
            act_num = ROMAN_TO_INT.get(raw_act, int(raw_act) if raw_act.isdigit() else None)
            if act_num is not None:
                act_indices.append((idx, act_num, raw_title.strip()))

    if not act_indices:
        raise ValueError("Could not find any '# ACT ...' headers in the Manim file!")

    # 1. Preamble & Global Scope Extraction
    first_act_line = act_indices[0][0]
    # Go backwards to skip the separator comment lines (# ======)
    while first_act_line > 0 and re.match(r'^\s*#\s*={3,}\s*$', lines[first_act_line - 1]):
        first_act_line -= 1

    preamble_raw = lines[:first_act_line]
    
    # Filter out class header and construct def, promoting colors/constants to module scope
    clean_preamble = []
    for line in preamble_raw:
        if re.match(r'^\s*class\s+\w+\s*\(.*?\)\s*:', line) or re.match(r'^\s*def\s+construct\s*\(.*?\)\s*:', line):
            continue
        if "self.set_camera_orientation" in line:
            continue
        # Dedent constants if they were indented inside construct()
        clean_preamble.append(re.sub(r'^\s{8}', '', line))

    # 2. Extract Individual Act Blocks
    act_blocks = []
    for i, (line_idx, act_num, title) in enumerate(act_indices):
        end_idx = act_indices[i + 1][0] if i + 1 < len(act_indices) else len(lines)
        
        # Step back to exclude preceding separator lines of the next act
        while end_idx > line_idx and re.match(r'^\s*#\s*={3,}\s*$', lines[end_idx - 1]):
            end_idx -= 1
            
        block_lines = lines[line_idx:end_idx]
        act_blocks.append((act_num, title, block_lines))

    return "\n".join(clean_preamble), act_blocks


def build_split_script(preamble: str, acts: list, qmd_map: dict[int, str]) -> str:
    """Assembles the final modular Manim Python script with standalone Scene classes."""
    output = []
    
    # Header & Imports
    output.append("# =============================================================================")
    output.append("# AUTOMATICALLY GENERATED MODULAR SCENES FOR REVEAL.JS PRESENTATION")
    output.append("# =============================================================================\n")
    output.append(preamble.strip())
    output.append("\n\n")

    # Helper function injection for cross-act shared assets (like compass_snapshot)
    helper = ("""# =============================================================================
# SHARED COMPASS HELPER (Ensures Act IX renders independently)
# =============================================================================
def build_aspect_compass_snapshot(comp_c=ORIGIN):
    polar_grid = VGroup(*[
        DashedVMobject(Circle(radius=r, color=GREY_E, stroke_width=1.1).move_to(comp_c), num_dashes=26)
        for r in [0.85, 1.65, 2.45]
    ])
    spokes = VGroup(*[
        Line(comp_c, comp_c + 2.50 * np.array([np.cos(k * PI / 4), np.sin(k * PI / 4), 0]), color=GREY_E, stroke_width=0.9)
        for k in range(8)
    ])
    c_angles = [30 * DEGREES, 150 * DEGREES, 270 * DEGREES]
    axes_grp, bands_grp = VGroup(), VGroup()
    axis_names = [r"q_1\\text{ (Temp)}", r"q_2\\text{ (Bright)}", r"q_3"]
    for idx, ang in enumerate(c_angles):
        u_vec = np.array([np.cos(ang), np.sin(ang), 0])
        axes_grp.add(Arrow(comp_c, comp_c + u_vec * 2.7, color=ROYAL_BLUE, buff=0, stroke_width=3.0))
        bands_grp.add(Line(comp_c + u_vec * 0.90, comp_c + u_vec * 2.25, color=ROYAL_BLUE, stroke_width=13, stroke_opacity=0.45))
        axes_grp.add(MathTex(axis_names[idx], font_size=17, color=BLUE_B).move_to(comp_c + u_vec * 2.95))

    dial_ring = Ellipse(width=4.6, height=2.8, color=TEAL_BRIGHT, stroke_width=2.8).move_to(comp_c)
    lens_core = Circle(radius=0.55, color=ORANGE_GOLD, fill_color=ORANGE_GOLD, fill_opacity=0.28, stroke_width=3.2).move_to(comp_c)
    lens_tex = MathTex(r"K_n", font_size=22, color=HOLO_GOLD).move_to(comp_c)

    u_ax1 = np.array([np.cos(c_angles[0]), np.sin(c_angles[0]), 0])
    u_ax2 = np.array([np.cos(c_angles[1]), np.sin(c_angles[1]), 0])

    f1_pt = Dot(comp_c + u_ax1 * (0.90 + 1.35 * 0.75), color=CRIMSON_RED, radius=0.09)
    f2_pt = Dot(comp_c + u_ax2 * (0.90 + 1.35 * 0.55), color=CRIMSON_RED, radius=0.09)
    d1_pt = Dot(comp_c + np.array([2.3 * np.cos(0.85 * PI), 1.4 * np.sin(0.85 * PI), 0]), color=TEAL_BRIGHT, radius=0.09)
    d2_pt = Dot(comp_c + np.array([2.3 * np.cos(PI + 0.45 * PI), 1.4 * np.sin(PI + 0.45 * PI), 0]), color=TEAL_BRIGHT, radius=0.09)

    link_d1 = DashedLine(d1_pt.get_center(), comp_c, color=ORANGE_GOLD, stroke_width=1.8)
    link_d2 = DashedLine(d2_pt.get_center(), comp_c, color=ORANGE_GOLD, stroke_width=1.8)
    link_f1 = Arrow(comp_c, f1_pt.get_center(), color=CRIMSON_RED, buff=0.06, stroke_width=2.6)
    link_f2 = Arrow(comp_c, f2_pt.get_center(), color=CRIMSON_RED, buff=0.06, stroke_width=2.6)

    return VGroup(
        polar_grid, spokes, axes_grp, bands_grp, dial_ring, lens_core, lens_tex,
        f1_pt, f2_pt, d1_pt, d2_pt, link_d1, link_d2, link_f1, link_f2
    ).scale(0.48)
\n\n""")
    if any("compass_snapshot" in l for _, _, body in acts for l in body):
        output.append(helper)

    # Render each Act into a standalone ThreeDScene class
    for act_num, title, body_lines in acts:
        # Determine class name from QMD mapping, or fallback to sanitized name
        class_name = qmd_map.get(act_num, sanitize_title_to_class_name(title, act_num))
        if act_num not in qmd_map:
            print(f"[!] Act {act_num}: no video in the .qmd, using fallback class name {class_name}")
        
        output.append("# " + "=" * 77)
        output.append(f"# SCENE: {class_name} (Act {act_num})")
        output.append("# " + "=" * 77)
        output.append(f"class {class_name}(ThreeDScene):")
        output.append("    def construct(self):")
        output.append("        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)\n")

        # Normalize indentation: ensure all body lines have 8-space indentation
        formatted_body = []
        for line in body_lines:
            # Replace cross-act compass snapshot reuse with helper
            line = line.replace("compass_snapshot.copy()", "build_aspect_compass_snapshot().copy()")
            
            # Skip the act comment title lines if they start with # ==
            if re.match(r'^\s*#\s*={3,}\s*$', line) or re.match(r'^\s*#\s*ACT\s+', line, re.I):
                continue
                
            # Strip outer indentation (assumed 8 spaces from original construct) and re-indent
            stripped = re.sub(r'^\s{8}', '', line)
            formatted_body.append("        " + stripped if stripped.strip() else "")

        output.append("\n".join(formatted_body).rstrip())
        output.append("\n\n")

    return "\n".join(output)


def main():
    sys.stdout.reconfigure(encoding="utf-8")  # avoid cp1252 crashes on Windows consoles
    parser = argparse.ArgumentParser(description="Split monolithic Manim file into QMD-compatible scene classes.")
    parser.add_argument("--manim", type=Path, default=Path("Chapter1UltimateUpgraded.py"), help="Input monolithic Manim script")
    parser.add_argument("--qmd", type=Path, default=Path("presentation.qmd"), help="Target Reveal.js Quarto QMD file")
    parser.add_argument("--output", type=Path, default=Path("chapter1_scenes.py"), help="Output split scenes Python file")
    
    args = parser.parse_args()

    if not args.manim.exists():
        print(f"[X] Error: Manim input file '{args.manim}' not found.")
        sys.exit(1)

    print(f"[*] Reading '{args.manim}'...")
    manim_code = args.manim.read_text(encoding="utf-8")

    print(f"[*] Parsing target video names from '{args.qmd}'...")
    qmd_map = parse_qmd_video_targets(args.qmd)

    print("[*] Extracting act blocks...")
    preamble, acts = extract_act_blocks(manim_code)
    print(f"[✓] Detected {len(acts)} individual acts.")

    print(f"[*] Generating '{args.output}'...")
    result_code = build_split_script(preamble, acts, qmd_map)
    args.output.write_text(result_code, encoding="utf-8")

    print(f"[✓] Successfully generated '{args.output}'!")
    print("\nNext step: Render all scenes at 1080p in PowerShell:")
    print(f"  manim -qh -v WARNING -a {args.output.name}")
    print("  Copy-Item \"media\\videos\\" + args.output.stem + "\\1080p60\\*.mp4\" -Destination \"media\\\"\n")


if __name__ == "__main__":
    main()