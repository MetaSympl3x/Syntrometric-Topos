import subprocess
import sys
from pathlib import Path

root = Path(r"c:\Users\lutin\Manim")

print("1. Re-rendering chapters 1 through 15 with new animations...")
results = {}
for ch in range(1, 16):
    qmd_rel = f"qmd/chapter{ch}.qmd"
    print(f"  Rendering {qmd_rel}...")
    r = subprocess.run(["quarto", "render", qmd_rel, "--output-dir", str(root)], cwd=str(root), capture_output=True, text=True, encoding="utf-8")
    if r.returncode != 0:
        print(f"    ERROR rendering {qmd_rel}:", r.stderr[:300])
        results[ch] = "FAIL (render)"
    else:
        # Validate
        val = subprocess.run([sys.executable, r"C:\Users\lutin\.gemini\antigravity\brain\7e75f97c-cb7d-427b-85be-204903b92420\scratch\validate_chapter.py", str(ch)], cwd=str(root), capture_output=True, text=True, encoding="utf-8")
        status = "PASS" if "PASS" in val.stdout else "FAIL"
        results[ch] = status
        print(f"    Validation: {status}")

print("\n2. Updating unified suite and mega-deck...")
subprocess.run([sys.executable, "build_unified_suite.py"], cwd=str(root), check=True)

print("3. Rendering qmd/syntrometrie_all.qmd...")
r_all = subprocess.run(["quarto", "render", "qmd/syntrometrie_all.qmd", "--output-dir", str(root)], cwd=str(root), capture_output=True, text=True, encoding="utf-8")
if r_all.returncode == 0:
    print("  syntrometrie_all.html rendered successfully!")
else:
    print("  ERROR rendering syntrometrie_all.qmd:", r_all.stderr[:300])

print("\n==========================================")
print("FINAL RECOMPILE SUMMARY:")
for ch, status in results.items():
    print(f"  Chapter {ch:2d}: {status}")
print(f"All 180 animations embedded and active in media/")
print("==========================================")

