import re
from pathlib import Path

root = Path(r"c:\Users\lutin\Manim")
shared = root / "shared"
inc_dir = shared / "includes"
inc_dir.mkdir(exist_ok=True)

# Chapter Titles & Subtitles mapping
chapters_meta = [
    (1, "The Topos of Subjective Experience", "Categorical Contexts, Sheaf Semantics, and Leveled Modal Logics"),
    (2, "The Syntrix Architecture", "Colored Operads, Free Tree Monads, and Grothendieck Fibrations"),
    (3, "Syntrixkorporationen", "Compositional Network Calculus, Pushout Spans & Cayley–Menger Extinction"),
    (4, "Enyphansyntrizen", "Non-Abelian Gauge Curvature, Holoforms & Chronometry"),
    (5, "Metroplextheorie", "The Ambient (∞,1)-Topos, Dendroidal Complete Segal Spaces, and Tectonic Spectral Sequences"),
    (6, "Die televariante äonische Area", "Terminal Coalgebras, Lyapunov Basins, and Transcendental Relativity"),
    (7, "Anthropomorphic Syntrometry", "Quantitative Sites, Realification, Tensor Operads, and Layered Field Cascades"),
    (8, "Syntrometrie über dem Quantitätsaspekt", "Cornered Parameter Manifolds, Grothendieck Nuclearity, and the 3-Class Collapse"),
    (9, "Strukturkaskaden", "Non-Hermitian 36-Component Hermetry, Palatini Coupling, and Sobolev Apex Convergence"),
    (10, "Metronische Elementaroperationen", "Discrete Lattice Modules, Finite-Difference Algebras, and Discrete Exterior Calculus"),
    (11, "Metrische Selektortheorie and Hyperstrukturen", "12D Fibrations, Spectral Matter Condensation, and DESY Precision Validation"),
    (12, "The Resolution of Representational Discontinuity", "Operadic Consumption and Protosimplex Encapsulation"),
    (13, "The Geometry of Qualia, Self-Consciousness, and Topos Integrated Information", "Postnikov Towers, Grothendieck Galois Groups, and IIT 4.0 Syntrometric Realization"),
    (14, "Synthese des Formalismus", "Master Translation Register (SM Eqs. 1–100a), Concordance Functor & Encyclopedic Lexicon"),
    (15, "Conclusion & The Syntrometric Horizon", "Master Axiomatic Architecture, Five Open Conjectures & Appendices A–D"),
]

# 1. Extract bodies of each chapterN.qmd (after YAML frontmatter) into shared/includes/chN_body.qmd
for ch in range(1, 16):
    p = root / f"chapter{ch}.qmd"
    txt = p.read_text(encoding="utf-8")
    m = re.match(r"^---\r?\n.*?\r?\n---\r?\n", txt, flags=re.DOTALL)
    body = txt[m.end():] if m else txt
    (inc_dir / f"ch{ch}_body.qmd").write_text(body, encoding="utf-8")
    print(f"Wrote shared/includes/ch{ch}_body.qmd ({len(body.splitlines())} lines)")

# 2. Merge all headers into shared/all-headers.html (merging MathJax macros & CSS)
header_files = [shared / "syntrometrie-header.html"] + [
    shared / f"chapter{ch}-header.html" for ch in range(2, 16)
]

macros = {}
styles = []
for hf in header_files:
    if not hf.exists():
        print(f"Warning: {hf.name} does not exist!")
        continue
    htxt = hf.read_text(encoding="utf-8")
    # Extract macro lines
    for line in htxt.splitlines():
        m_mac = re.match(r'^\s*([a-zA-Z0-9_\\]+)\s*:\s*(.+?)\s*,?\s*$', line)
        if m_mac and m_mac.group(1) not in ("tex", "macros", "window", "script", "style"):
            key = m_mac.group(1).lstrip("\\")
            macros[key] = m_mac.group(2).rstrip(",")
    # Extract <style>...</style>
    for sm in re.findall(r"<style>(.*?)</style>", htxt, flags=re.DOTALL):
        styles.append(sm.strip())

macro_lines = [f"      {k}: {v}" for k, v in sorted(macros.items())]
all_header_html = (
    "<script>\nwindow.MathJax = {\n"
    + "  \"HTML-CSS\": { linebreaks: { automatic: true, width: \"container\" } },\n"
    + "  CommonHTML: { linebreaks: { automatic: true, width: \"container\" } },\n"
    + "  SVG: { linebreaks: { automatic: true, width: \"container\" } },\n"
    + "  tex: {\n    macros: {\n"
    + ",\n".join(macro_lines)
    + "\n    }\n  }\n};\n</script>\n<style>\n"
    + "\n\n".join(styles)
    + "\n</style>\n"
)
(shared / "all-headers.html").write_text(all_header_html, encoding="utf-8")
print(f"Wrote shared/all-headers.html with {len(macros)} MathJax macros.")

# 3. Create syntrometrie_all.qmd with all 15 chapters
script_tags = "\n".join([f'        <script src="shared/chapter{ch}-widgets.js"></script>' for ch in range(1, 16)])

sections = []
for ch, title, subtitle in chapters_meta:
    sections.append(f"""# Chapter {ch}: {title} {{transition="zoom"}}

<div style="font-size:0.75em; color:#a0aec0; margin-top:-10px; margin-bottom:20px;">
<i>{subtitle}</i>
</div>

{{{{< include shared/includes/ch{ch}_body.qmd >}}}}
""")

mega_qmd = f"""---
title: "Syntrometrische Maximentelezentrik"
subtitle: "Complete Interactive Treatise (Chapters 1–15) — Topos Theory, Operads, Gauge Curvature, Hermetry & Consciousness"
author: "Research Collective — Department of Mathematical Physics & Formal Epistemology"
date: "August 2026"
format:
  revealjs:
    theme: [dark, custom_syntrometrie.scss]
    navigation-mode: grid
    width: 1440
    height: 900
    margin: 0.04
    min-scale: 0.2
    max-scale: 2.0
    scrollable: true
    transition: fade
    background-transition: fade
    slide-number: c/t
    controls: true
    progress: true
    hash: true
    center: false
    html-math-method: mathjax
    include-in-header: shared/all-headers.html
    include-after-body:
      text: |
{script_tags}
---

""" + "\n".join(sections)

(root / "syntrometrie_all.qmd").write_text(mega_qmd, encoding="utf-8")
print("Wrote syntrometrie_all.qmd for all 15 chapters.")

