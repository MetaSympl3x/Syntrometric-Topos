#!/usr/bin/env python3
"""
media_map.py
============
Keeps a chapter's .qmd video references, its Manim scene classes and the
rendered clips in media/ consistent.

  python media_map.py --qmd chapter1.qmd --scenes chapter1_scenes.py
  python media_map.py --qmd chapter1.qmd --scenes chapter1_scenes.py --render
  python media_map.py --qmd chapter1.qmd --scenes chapter1_scenes.py --render --only Act3_Secs_111112_Prdikatrix_Dialektik

Convention: a video `media/<Name>.mp4` must be produced by a Scene class
called exactly `<Name>`.  Reports:
  OK        referenced, scene exists, clip exists and is newer than the scene file
  STALE     clip older than the scenes file (coarse: file-level mtime)
  NO CLIP   referenced + scene exists, clip not rendered yet   (--render fixes)
  NO SCENE  referenced in the .qmd but no Scene class by that name
  UNUSED    Scene class that no slide references
Exit code is 1 if any NO SCENE / NO CLIP / STALE problem remains.
"""
import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

VIDEO_RE = re.compile(r'media/([\w\-]+)\.mp4')
CLASS_RE = re.compile(r'^class\s+(\w+)\s*\(\s*[\w\.]*Scene\s*\)', re.MULTILINE)


def qmd_videos(qmd: Path) -> list[str]:
    seen, out = set(), []
    for name in VIDEO_RE.findall(qmd.read_text(encoding='utf-8')):
        if name not in seen:
            seen.add(name)
            out.append(name)
    return out


def scene_classes(scenes: Path) -> list[str]:
    return CLASS_RE.findall(scenes.read_text(encoding='utf-8'))


def render(scenes: Path, names: list[str], media: Path, quality: str) -> None:
    qflag = {'l': '-ql', 'm': '-qm', 'h': '-qh', 'k': '-qk'}[quality]
    res = {'l': '480p15', 'm': '720p30', 'h': '1080p60', 'k': '2160p60'}[quality]
    cmd = [sys.executable, '-m', 'manim', qflag, '-v', 'WARNING', '--media_dir', str(media), str(scenes), *names]
    print('[*]', ' '.join(cmd))
    subprocess.run(cmd, check=True)
    src_dir = media / 'videos' / scenes.stem / res
    for n in names:
        src = src_dir / f'{n}.mp4'
        if src.exists():
            shutil.copy2(src, media / f'{n}.mp4')
            print(f'[✓] {n}.mp4 -> {media}')
        else:
            print(f'[!] expected output not found: {src}')


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--qmd', type=Path, required=True)
    ap.add_argument('--scenes', type=Path, required=True)
    ap.add_argument('--media', type=Path, default=Path('media'))
    ap.add_argument('--render', action='store_true', help='render NO CLIP and STALE scenes')
    ap.add_argument('--only', nargs='+', help='restrict --render to these scene names')
    ap.add_argument('--quality', choices='lmhk', default='h')
    a = ap.parse_args()

    videos, classes = qmd_videos(a.qmd), scene_classes(a.scenes)
    scenes_mtime = a.scenes.stat().st_mtime
    todo, bad = [], False

    print(f'{a.qmd.name}: {len(videos)} videos | {a.scenes.name}: {len(classes)} scenes\n')
    for v in videos:
        clip = a.media / f'{v}.mp4'
        if v not in classes:
            status, bad = 'NO SCENE', True
        elif not clip.exists():
            status, bad = 'NO CLIP', True
            todo.append(v)
        elif clip.stat().st_mtime < scenes_mtime:
            status, bad = 'STALE', True
            todo.append(v)
        else:
            status = 'OK'
        print(f'  {status:9s} {v}')
    for c in classes:
        if c not in videos:
            print(f'  {"UNUSED":9s} {c}')

    if a.render:
        if a.only:
            todo = [t for t in todo if t in a.only] or [o for o in a.only if o in classes]
        if todo:
            render(a.scenes, todo, a.media, a.quality)
            return 0
        print('\nNothing to render.')
    elif todo:
        print(f'\n{len(todo)} clip(s) need rendering: re-run with --render')
    return 1 if bad and not a.render else 0


if __name__ == '__main__':
    sys.exit(main())

