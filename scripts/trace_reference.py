"""Trace a flat vector reference image (a hand on a phone, an object) into colour layers as SVG paths.

    python3 -I trace_reference.py reference.png spec.json out_dir

Needs Pillow, numpy, scipy and potrace (brew install potrace). Writes out_dir/layers.json:
    { "<layer>": { "t": "<potrace transform>", "d": "<path data>" }, ... }
in the reference's pixel coordinates. Paint each with
    <g transform="${t}"><path d="${d}" fill="..." fill-rule="evenodd"/></g>
inside an <svg viewBox="..."> on the reference's grid, in the order the layers are listed.

spec.json:
{
  "palette": { "bg": "#ffffff", "skin": "#ffa6aa", "shade": "#f8768e", "sleeve": "#3c83f7", "cuff": "#1261d7",
               "stripe": "#5c9cfd", "frame": "#152771" },      # read these off the image: the most common colours
  "exclude": [[474, 324, 710, 778, 36]],      # rounded rects (x0, y0, x1, y1, r) kept out of every layer except the
                                              # ones with "inside": true -- e.g. a phone you will redraw yourself
  "layers": [
    { "name": "sleeve", "classes": ["sleeve", "cuff", "stripe"], "min": 600, "close": 4 },
    { "name": "cuff",   "classes": ["cuff"], "min": 600, "close": 3 },
    { "name": "stripe", "classes": ["stripe"], "long": 90 },  # thin lines: keep pieces at least 90px long
    { "name": "skin",   "classes": ["skin", "shade"], "min": 300, "close": 2, "nails": "nail" },
    { "name": "shade",  "classes": ["shade"], "min": 120 }
  ],
  "split": { "prefix": "tap-", "rect": [620, 598, 99999, 99999] }   # optional: copy every layer's part inside rect
                                              # into its own layer (a second hand), so it can be moved to sit on top
}
"nails": "<name>" adds a layer of the bright holes inside that layer's filled shape (white nails on a white ground).
"""
import sys, json, re, subprocess
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as nd

src, spec_path, out = sys.argv[1:4]
spec = json.load(open(spec_path))
a = np.asarray(Image.open(src).convert('RGB')).astype(int)
H, W = a.shape[:2]
Y, X = np.mgrid[:H, :W]

names = list(spec['palette'])
cols = np.array([[int(spec['palette'][n][i:i + 2], 16) for i in (1, 3, 5)] for n in names])
nearest = ((a[:, :, None, :] - cols[None, None]) ** 2).sum(-1).argmin(-1)   # every pixel to its nearest palette colour
cls = {n: nearest == i for i, n in enumerate(names)}

def rrect(x0, y0, x1, y1, r):
    cx = np.clip(X, x0 + r, x1 - r); cy = np.clip(Y, y0 + r, y1 - r)
    return (X >= x0) & (X <= x1) & (Y >= y0) & (Y <= y1) & ((X - cx) ** 2 + (Y - cy) ** 2 <= r * r)

excl = np.zeros((H, W), bool)
for box in spec.get('exclude', []): excl |= rrect(*box)
excl = nd.binary_dilation(excl, iterations=2)

def tidy(m, minpx, close):
    m = nd.binary_opening(m, iterations=1)
    lab, n = nd.label(m)
    if n:
        s = nd.sum(m, lab, range(1, n + 1)); m = np.isin(lab, [i + 1 for i in range(n) if s[i] >= minpx])
    return nd.binary_closing(m, iterations=close) if close else m

def long_only(m, minlen):   # thin lines (cuff stripes) survive, short marks (watermark letters) go
    lab, _ = nd.label(m)
    keep = [i + 1 for i, sl in enumerate(nd.find_objects(lab)) if max(sl[0].stop - sl[0].start, sl[1].stop - sl[1].start) >= minlen]
    return nd.binary_dilation(np.isin(lab, keep), iterations=1)

L = {}
for ly in spec['layers']:
    m = np.zeros((H, W), bool)
    for c in ly['classes']: m |= cls[c]
    if not ly.get('inside'): m &= ~excl
    nail = None
    if ly.get('nails'):
        filled = nd.binary_fill_holes(nd.binary_closing(m, iterations=2))
        nail = filled & ~m & (a.sum(-1) > 640)
        m |= nail
    L[ly['name']] = long_only(m, ly['long']) if 'long' in ly else tidy(m, ly.get('min', 250), ly.get('close', 1))
    if nail is not None: L[ly['nails']] = tidy(nail, 120, 0)   # listed after its layer, so painted on top

if 'split' in spec:
    x0, y0, x1, y1 = spec['split']['rect']; R = (X > x0) & (Y > y0) & (X < x1) & (Y < y1)
    for k in list(L): L[spec['split']['prefix'] + k] = L[k] & R; L[k] = L[k] & ~R

res = {}
for k, m in L.items():
    m = np.asarray(Image.fromarray((m * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.2))) > 127
    if not m.any(): continue
    Image.fromarray(((~m) * 255).astype('uint8')).convert('1').save(f'{out}/{k}.pbm')
    subprocess.run(['potrace', '-s', '-a', '1.1', '-O', '0.4', f'{out}/{k}.pbm', '-o', f'{out}/{k}.svg'], check=True)
    sv = open(f'{out}/{k}.svg').read()
    res[k] = {'t': re.search(r'<g transform="([^"]+)"', sv).group(1), 'd': ' '.join(re.findall(r' d="([^"]+)"', sv))}
    print(f'{k:16} {int(m.sum()):>8} px')
json.dump(res, open(f'{out}/layers.json', 'w'))
print(f'{out}/layers.json')
