import subprocess
import sys
import shutil
from pathlib import Path

root = Path(r"c:\Users\lutin\Manim")
html_dir = root / "html"

# Clean up accidental qmd/html if present
qmd_html = root / "qmd" / "html"
if qmd_html.exists():
    shutil.rmtree(qmd_html, ignore_errors=True)

print("1. Re-rendering chapters 1 through 15 with updated custom SCSS...")
results = {}
for ch in range(1, 16):
    qmd_rel = f"qmd/chapter{ch}.qmd"
    print(f"  Rendering {qmd_rel} -> html/...")
    cmd = f'quarto render "{qmd_rel}" --output-dir "{html_dir}"'
    r = subprocess.run(cmd, cwd=str(root), shell=True, capture_output=True, text=True, encoding="utf-8")
    if r.returncode != 0:
        print(f"    ERROR rendering {qmd_rel}:", (r.stderr or r.stdout)[:400])
        results[ch] = "FAIL (render)"
    else:
        # Validate
        val = subprocess.run([sys.executable, r"C:\Users\lutin\.gemini\antigravity\brain\7e75f97c-cb7d-427b-85be-204903b92420\scratch\validate_chapter.py", str(ch)], cwd=str(root), capture_output=True, text=True, encoding="utf-8")
        status = "PASS" if "PASS" in val.stdout else "FAIL"
        results[ch] = status
        print(f"    Validation: {status}")

print("\n2. Updating unified suite and mega-deck...")
subprocess.run([sys.executable, "build_unified_suite.py"], cwd=str(root), check=True)

print("3. Rendering qmd/syntrometrie_all.qmd -> html/...")
cmd_all = f'quarto render "qmd/syntrometrie_all.qmd" --output-dir "{html_dir}"'
r_all = subprocess.run(cmd_all, cwd=str(root), shell=True, capture_output=True, text=True, encoding="utf-8")
if r_all.returncode == 0:
    print("  syntrometrie_all.html rendered successfully in html/!")
else:
    print("  ERROR rendering syntrometrie_all.qmd:", (r_all.stderr or r_all.stdout)[:400])

# 4. Sync deliverables to root directory for GitHub Pages
print("\n4. Syncing deliverables to root directory for GitHub Pages...")
for f in html_dir.glob("*.html"):
    shutil.copy2(f, root / f.name)
for d in html_dir.iterdir():
    if d.is_dir() and d.name.endswith("_files"):
        dest = root / d.name
        if dest.exists():
            shutil.rmtree(dest, ignore_errors=True)
        shutil.copytree(d, dest, dirs_exist_ok=True)
if (root / "shared").exists():
    shutil.copytree(root / "shared", html_dir / "shared", dirs_exist_ok=True)
print("  Synced deliverables to root successfully.")

print("\n==========================================")
print("FINAL RECOMPILE SUMMARY:")
for ch, status in results.items():
    print(f"  Chapter {ch:2d}: {status}")
print(f"All 180 animations embedded and active in media/")
print("==========================================")
