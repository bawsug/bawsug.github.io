# TODO

## Image pipeline — needs review before any cleanup

Mostly housekeeping, with **one item that may be an actual bug on mobile** — see
"Oversized images" below. The rest is parked for review because the answers
change how we handle photos for every future event.

### Oversized images may not render on iPhones (check this first)

The March 5 carousel mixes wildly different resolutions:

| File | Dimensions | Size |
|---|---|---|
| `15001.jpg`, `15005.jpg`, `15008.jpg`, `15011.jpg` | 8160x6144 (50 MP) | 1.1-1.5 MB |
| the seven `IMG_*.jpg` | 640x480 (0.3 MP) | 56-88 KB |

A 170x spread in pixel count, all rendered into a 720px-wide carousel.

- A 50 MP image decodes to roughly 200 MB of uncompressed RAM. iOS Safari caps
  decoded image size and will downsample or silently fail past it. There are
  four such images in one carousel.
- `15001.jpg` is the **first** gallery entry, so the heaviest, riskiest image is
  what a visitor loads first.
- **Needs testing on a real iPhone** before we assume the March post works.
- 50 MP squeezed into 1.1 MB also implies heavy compression artifacts.
- The 640x480 files are conversely *under*-resolved for a 720px carousel, worse
  on retina, so slides alternate between crisp and soft.

Fix direction: settle on one delivery resolution (roughly 1440-2160px wide
covers a 720px carousel at 2-3x) and re-export everything to it.

### What else we found (`assets/img/2026-03-05/`)

- Seven `.HEIC` files are untracked leftovers. Each has a **committed** `.jpg`
  counterpart at identical dimensions, so no page depends on the HEICs.
- The HEICs are **not** full-resolution originals — all are 640x480 (one
  480x640). They were already downscaled before reaching the repo. The true
  originals presumably live in a phone or Photos library.
- The HEIC to JPG conversion saved almost nothing: 68 KB HEIC to 64 KB JPG,
  where HEIC normally beats JPEG roughly 2:1 at equal quality. Suggests the
  JPGs were written at low quality, or the HEICs were already recompressed.
- The four `15xxx.jpg` files are about 5.4 MB of the 6 MB gallery. The carousel
  sets `loading="lazy"` on every slide, which helps the offscreen ones but not
  the first.
- The seven 640x480 JPGs are the **smallest copies that exist anywhere** — the
  repo has no better source. Recovering sharp versions means getting originals
  off whoever's phone shot them, and that window narrows as phones get replaced.
- `.HEIC` is not in `_config.yml`'s `exclude`, so a build copies all seven into
  `_site`. No effect on Pages since they are untracked, just local dead weight.

### Can we serve HEIC directly?

No. HEIC decodes in Safari only — Chrome, Firefox, and Edge do not support it,
so `<img src="photo.HEIC">` is a blank box for most visitors.

Use **AVIF** instead. AVIF and HEIC are the same HEIF/ISOBMFF container family;
HEIC wraps HEVC (patent-encumbered, which is why browsers never shipped it) and
AVIF wraps AV1 (royalty-free). AVIF has broad support and compresses better than
JPEG. WebP is the safer-still fallback with universal support.

### Open questions

1. Do camera-native files belong in the repo at all? The seven HEICs sitting
   there now are a non-question — they are 56-88 KB and not masters, so they can
   just go. The real decision is for *future* events: if someone hands us true
   full-resolution originals, do those get committed? Git stores binaries
   forever, so that is a permanent cost, and an archive outside the repo may
   serve better.
2. Target delivery format: AVIF with a JPEG fallback via `<picture>`, or plain
   WebP for simplicity?
3. Should conversion be a documented manual step, or scripted so every event
   gallery comes out consistent? Nothing today records what produced the JPGs.
4. Re-export the four 50 MP `15xxx.jpg` files down to delivery size — see
   "Oversized images" above. Visible change, so it needs a look before shipping,
   but this is the one item with a plausible real-world failure behind it.
5. Add an ignore rule so stray `.HEIC` and `.pdf` files stop appearing in
   `git status`? A stray recipe PDF had been sitting in `assets/img/` since
   Jan 8 2026 before anyone noticed, so the noise does hide things.

## Speaker photos

- No headshots for Erika Simon or Mike Fontaine (LucidPoint) on the
  September 3 2026 FinOps post. The layout omits the photo when absent, so the
  page is fine, but add them if we get images.
