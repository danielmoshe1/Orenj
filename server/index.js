"use strict";

/* =========================================================
   Orenj relay server.

   - Serves the Receiver game (the static frontend in /public).
   - Exposes POST /api/receiver, which holds the Anthropic key
     server-side and runs the AI Receiver. The key never ships
     to the browser, so the game works on mobile, shared links,
     and any host — unlike calling the API from the page.
   ========================================================= */

require("dotenv").config();

const path = require("path");
const express = require("express");
const { receive, MODEL } = require("./receiver");

const app = express();
const PORT = process.env.PORT || 3000;

// Cap request bodies — this endpoint only ever needs a few short strings.
app.use(express.json({ limit: "16kb" }));

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const ROOT_DIR = path.join(__dirname, "..");

// Static frontend. Only /public is exposed as the web root, so the
// server source and .env are never reachable.
app.use(express.static(PUBLIC_DIR));
// Reuse the hand-built art kit from the repo root without duplicating it.
app.get("/art.js", (_req, res) => res.sendFile(path.join(ROOT_DIR, "art.js")));

// Limits that keep this from being abused as a generic model proxy:
// the system prompt is fixed server-side and the inputs are tiny.
const MAX_TARGET = 80;
const MAX_RIVALS = 12;
const MAX_EXPLANATION = 2000;

app.post("/api/receiver", async (req, res) => {
  try {
    const body = req.body || {};
    const target = typeof body.target === "string" ? body.target.trim() : "";
    const explanation =
      typeof body.explanation === "string" ? body.explanation.trim() : "";
    const level = Number.isFinite(body.level) ? body.level : undefined;
    const levelName =
      typeof body.levelName === "string"
        ? body.levelName.slice(0, 60)
        : undefined;
    const rivals = Array.isArray(body.rivals)
      ? body.rivals
          .filter((r) => typeof r === "string")
          .map((r) => r.trim())
          .filter(Boolean)
          .slice(0, MAX_RIVALS)
      : [];

    if (!target || target.length > MAX_TARGET) {
      return res.status(400).json({ error: "Missing or oversized target." });
    }
    if (!explanation) {
      return res.status(400).json({ error: "Write an explanation first." });
    }
    if (explanation.length > MAX_EXPLANATION) {
      return res
        .status(400)
        .json({ error: "That explanation is too long — keep it tight." });
    }

    const result = await receive({
      target,
      rivals,
      explanation: explanation.slice(0, MAX_EXPLANATION),
      level,
      levelName,
    });
    return res.json(result);
  } catch (err) {
    const status = err?.status && Number.isInteger(err.status) ? err.status : 502;
    console.error("Receiver error:", err?.message || err);
    return res.status(status).json({
      error: err?.message || "The Receiver is unavailable right now.",
    });
  }
});

// Tiny health endpoint — handy for "is the key wired up?" checks.
app.get("/api/health", (_req, res) => res.json({ ok: true, model: MODEL }));

app.listen(PORT, () => {
  const keyed = !!process.env.ANTHROPIC_API_KEY;
  console.log(`🍊 Orenj relay listening on http://localhost:${PORT}`);
  console.log(`   Model: ${MODEL}`);
  if (!keyed) {
    console.warn(
      "   ⚠️  ANTHROPIC_API_KEY is not set — copy server/.env.example to server/.env and add your key."
    );
  }
});
