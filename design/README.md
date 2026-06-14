# Orenj — Art Direction Explorations

Three creative directions for how Orenj could look and feel, while keeping its
DNA: **Pip** the citrus guide, an orange-forward warmth, a journey through
worlds, gamified rings/stars/confetti, 100% hand-built vector art (no stock
images), and the encouraging-coach voice.

## View it

Open **`art-directions.html`** in any browser — it's fully self-contained
(only Google Fonts loaded over the network). No build step, no server.

The PNGs are rendered previews of each section, viewable directly on GitHub:

| # | Direction | Preview |
|---|-----------|---------|
| — | Cover | `preview-00-cover.png` |
| 01 | **Sunlit Storybook** — cozy, painterly, heartfelt (lowest risk) | `preview-01-storybook.png` |
| 02 | **Cosmic Citrus** — electric neon, glass & glow, game-y (most distinctive screenshot) | `preview-02-cosmic.png` |
| 03 | **Paper Citrus Co.** — cut-paper / risograph, tactile & ownable (most unique brand) | `preview-03-paper.png` |
| — | Side-by-side comparison | `preview-04-compare.png` |

## Each spread includes

- **Pip** redrawn in the direction's style (hand-built SVG)
- A named **color palette** with hex values
- A **type** specimen (display + body pairing)
- Real **UI components** themed in that skin: buttons, a lesson node, the score
  ring, skill bars, a chapter banner
- A redrawn **audience character** (the "swirling idea")
- A **mini journey strip** showing the world map in that style
- **Keeps / Evolves / New** notes + a finish-and-texture summary

## Next step

Pick a direction (or a blend — e.g. "Storybook Pip with the Cosmic journey
map"). The chosen direction then becomes a full interactive demo of one real
Orenj screen, and from there rolls across the whole app: a new `art.js`
(mascot + cast) and a refreshed `style.css`.

## Regenerating the previews

The PNGs were rendered from the HTML with headless Chromium:

```
npm i puppeteer
node shoot.js   # see commit history / design notes for the script
```
