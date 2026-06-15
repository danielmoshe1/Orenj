# Orenj — Make it impossible to misunderstand

A communication-training game. You're handed a **secret word**. You write an
explanation. An AI **Receiver** tries to identify the word — but it reads
adversarially, hunting for the strongest *wrong* thing your words could mean.
You revise until it can't misread you, in as few tries (and as few words) as
you can manage.

> Core loop: secret word → you explain → Receiver guesses ("Is it a pumpkin?")
> → if wrong, one short gap-nudge → you revise (your text stays in the box) →
> repeat. Max 5 tries. Each revision is judged fresh.

## Architecture — live AI via a backend relay

The Receiver runs on **Claude (`claude-opus-4-8`)** through a small Node relay
that holds the API key server-side. The key never reaches the browser, so the
game works on mobile, shared links, and any host — unlike calling the Anthropic
API directly from the page (which only works inside an authenticated
Claude.ai session).

```
public/            the Receiver game (static frontend)
  index.html
  receiver.css
  receiver.js      game loop, 5 levels, scoring, voice dictation
art.js             hand-built SVG art kit (Pip the Receiver), shared
server/            the relay
  index.js         Express: serves the frontend + POST /api/receiver
  receiver.js      the Receiver prompt + structured-output Claude call
  .env.example     copy to .env, add your key
```

The Receiver returns structured JSON (`guess`, `matchesTarget`, `line`,
`nudge`) so the frontend can drive the game without parsing prose. Each call is
stateless — the Receiver has no memory of earlier attempts.

## Run it locally

```bash
cd server
cp .env.example .env          # then put your key in .env
npm install
npm start
```

Open <http://localhost:3000>. Get a key at
<https://console.anthropic.com/> — use a low-limit, revocable one.

`GET /api/health` confirms the key is wired up.

## Scoring

- **Attempts** — 1 = Masterful · 2 = Strong · 3–4 = Average · 5+ = Needs work.
- **Word efficiency** — shorter winning explanations score higher.
- **Precision** — a 0–100 blend of attempts and efficiency.

Progress (rounds solved, streak, best tries per word) is stored in
`localStorage`.

## Levels

1. **Everyday Objects** — plain things whose plain words still slip.
2. **Similar Objects** — near-twins (tangerine vs. orange, violin vs. viola).
3. **Processes** — things that happen, not things you hold.
4. **Emotions & Experiences** — invisible; the Receiver leans on the nearest feeling.
5. **Complex Concepts** — abstract and contested; precision is the only way through.

## Deploying

The game needs the relay, so it can't run as a pure static site (GitHub Pages
won't work for the Receiver). Deploy `server/` to any Node host (Render,
Railway, Fly, a small VM…), set `ANTHROPIC_API_KEY` in the host's environment,
and it serves the frontend and the API together.

> Note: a separate, earlier **offline coaching** prototype still lives at the
> repo root (`index.html`, `app.js`, `style.css`) and is what the GitHub Pages
> workflow deploys. The Receiver game is the `public/` + `server/` app above and
> is served by the Node relay — Pages does not run it.

---

_Prototype. The key lives only in the server's environment; never commit `.env`._
