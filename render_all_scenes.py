import os
import sys
import shutil
import subprocess
from pathlib import Path
import re

sys.stdout.reconfigure(encoding='utf-8', line_buffering=True)
root = Path(r"c:\Users\lutin\Manim")
media = root / "media"
media.mkdir(exist_ok=True)

def get_missing_scenes():
    targets = []
    for ch in range(1, 16):
        qmd = root / "qmd" / f"chapter{ch}.qmd"
        if not qmd.exists():
            continue
        vids = sorted(set(re.findall(r'media/([\w\-]+)\.mp4', qmd.read_text(encoding='utf-8'))))
        scenes_file = root / "scenes" / f"chapter{ch}_scenes.py"
        if not scenes_file.exists():
            continue
        classes = set(re.findall(r'^class\s+(\w+)\s*\(', scenes_file.read_text(encoding='utf-8'), re.M))
        for v in vids:
            target_mp4 = media / f"{v}.mp4"
            if not target_mp4.exists() or target_mp4.stat().st_size == 0:
                targets.append({
                    "chapter": ch,
                    "file": scenes_file.name,
                    "scene": v,
                    "has_class": v in classes
                })
    return targets

def render_scene(ch, file_name, scene_name):
    print(f"\n>>> [Ch {ch}] Rendering {scene_name} from scenes/{file_name}...", flush=True)
    cmd = [
        sys.executable, "-m", "manim",
        "-ql",
        "--media_dir", str(media),
        str(root / "scenes" / file_name),
        scene_name
    ]
    res = subprocess.run(cmd, cwd=str(root), capture_output=True, text=True, encoding="utf-8")
    
    # Locate generated mp4
    mod_name = Path(file_name).stem
    candidates = list((media / "videos" / mod_name).glob(f"**/{scene_name}.mp4"))
    if candidates:
        src = candidates[0]
        dst = media / f"{scene_name}.mp4"
        shutil.copy(src, dst)
        print(f"✓ Saved to {dst.name} ({dst.stat().st_size} bytes)", flush=True)
        return True
    else:
        print(f"✗ Failed to find output for {scene_name}!", flush=True)
        if res.stderr:
            err_lines = [l for l in res.stderr.splitlines() if "Error" in l or "Exception" in l or "latex" in l]
            print("  Errors:\n   ", "\n    ".join(err_lines[:5]), flush=True)
        return False

def main():
    missing = get_missing_scenes()
    total = len(missing)
    print(f"Found {total} unrendered scenes across chapters 3–15.", flush=True)
    
    completed = 0
    failed = []
    for idx, item in enumerate(missing, 1):
        print(f"\nProgress: [{idx}/{total}]", flush=True)
        success = render_scene(item["chapter"], item["file"], item["scene"])
        if success:
            completed += 1
        else:
            failed.append(item["scene"])
            
    print(f"\n==========================================", flush=True)
    print(f"Render Summary: {completed}/{total} successfully rendered.", flush=True)
    if failed:
        print(f"Failed scenes ({len(failed)}): {failed}", flush=True)
    print(f"==========================================", flush=True)

if __name__ == "__main__":
    main()

