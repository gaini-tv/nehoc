#!/usr/bin/env python3
"""Génère des PNG 32×32 depuis public/logo.gif pour favicon animé (Chrome)."""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'public' / 'logo.gif'
OUT = ROOT / 'public' / 'favicon-frames'
STEP = 2
SIZE = 32


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f'Missing {SRC}')

    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob('frame-*.png'):
        old.unlink()

    gif = Image.open(SRC)
    frames_meta: list[dict[str, object]] = []
    i = 0
    idx = 0

    while True:
        try:
            gif.seek(i)
            frame = gif.copy().convert('RGBA')
            w, h = frame.size
            side = min(w, h)
            left = (w - side) // 2
            top = max(0, (h - side) // 4)
            frame = frame.crop((left, top, left + side, top + side))
            frame = frame.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
            filename = f'frame-{idx:03d}.png'
            frame.save(OUT / filename, optimize=True)
            frames_meta.append({
                'file': f'/favicon-frames/{filename}',
                'delay': max(int(gif.info.get('duration', 100)), 40),
            })
            idx += 1
            i += STEP
        except EOFError:
            break

    (OUT / 'manifest.json').write_text(
        json.dumps({'frames': frames_meta}, indent=2),
        encoding='utf-8',
    )
    print(f'✓ {idx} frames → {OUT}')


if __name__ == '__main__':
    main()
