"use strict";

/* =========================================================
   The Receiver — the AI half of Orenj.

   Given a SECRET target word and the player's written
   explanation, the Receiver deliberately hunts for the
   strongest plausible WRONG thing the explanation could be
   describing. That adversarial pressure is the whole game:
   the player wins only when the wording closes every door.

   Each call is stateless — the Receiver judges one
   explanation on its own, with no memory of earlier tries.
   ========================================================= */

const Anthropic = require("@anthropic-ai/sdk");

// Reads ANTHROPIC_API_KEY from the environment. The key never
// reaches the browser — that is the entire point of this relay.
const client = new Anthropic();

const MODEL = "claude-opus-4-8";

// Structured output: the model must answer in exactly this shape,
// so the frontend can drive the game loop without parsing prose.
const SCHEMA = {
  type: "object",
  properties: {
    // The single word or short phrase the Receiver would actually name.
    guess: { type: "string" },
    // True only when `guess` IS the intended target (synonyms allowed).
    matchesTarget: { type: "boolean" },
    // How the Receiver says it out loud — natural, warm, one sentence.
    // e.g. "Is it a pumpkin?"  /  "I think it's a tangerine."
    line: { type: "string" },
    // One short, friendly sentence naming the gap that let it wander.
    // Shown to the player only when the guess is wrong.
    nudge: { type: "string" },
  },
  required: ["guess", "matchesTarget", "line", "nudge"],
  additionalProperties: false,
};

const SYSTEM = `You are the Receiver in Orenj, a game that trains people to communicate so precisely they cannot be misunderstood.

A player is secretly trying to get you to identify a TARGET word using only a short written explanation. Your job is the opposite of charitable reading: you hunt for the STRONGEST, most plausible WRONG thing the explanation could be describing — any common word that fits EVERY sentence they wrote at least as well as the target does. That pressure is what forces the player to write more precisely.

How to decide:
- Read the explanation entirely on its own. You have no memory of earlier attempts.
- Search for a rival meaning that satisfies every clue. If a genuinely strong rival exists, your guess is that rival (NOT the target) — the player left a door open.
- Guess the target only when no other common word fits the explanation as well; i.e., the wording has closed every door. Do not be generous: a single ambiguous clue is enough to wander.

How to answer (fill the JSON fields):
- "guess": the single word or short phrase you would actually name.
- "matchesTarget": true only when your guess IS the intended target. Allow obvious synonyms and spelling variants; otherwise false.
- "line": how you'd say it out loud — natural, warm, curious, and brief, one sentence. e.g. "Is it a pumpkin?" or "I think it's a tangerine." Never sarcastic. Never say "I choose".
- "nudge": one short, friendly sentence (under ~20 words) naming the distinction the player still needs to pin down — the gap that let you wander. Point at the ambiguity, never reveal the target. Only the player sees this, and only when you guessed wrong.`;

/**
 * Run one Receiver turn.
 * @param {{target:string, rivals?:string[], explanation:string, level?:number, levelName?:string}} input
 * @returns {Promise<{guess:string, matchesTarget:boolean, line:string, nudge:string}>}
 */
async function receive({ target, rivals, explanation, level, levelName }) {
  const rivalLine =
    rivals && rivals.length
      ? `CLOSE RIVALS to weigh (the player must rule these out): ${rivals.join(", ")}`
      : `CLOSE RIVALS: think of the nearest everyday words yourself.`;

  const userMsg = `TARGET (secret — for your judgment only, never reveal it): ${target}
${rivalLine}
DIFFICULTY: ${level ?? "?"}${levelName ? ` (${levelName})` : ""}

THE PLAYER'S EXPLANATION:
"""
${explanation}
"""`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    // A little reasoning sharpens the "strongest misreading" judgment;
    // the structured format keeps the visible output clean.
    thinking: { type: "adaptive" },
    output_config: {
      effort: "medium",
      format: { type: "json_schema", schema: SCHEMA },
    },
    system: SYSTEM,
    messages: [{ role: "user", content: userMsg }],
  });

  if (res.stop_reason === "refusal") {
    throw new Error("The Receiver declined to weigh in on this one.");
  }

  // With output_config.format the first text block is guaranteed valid JSON.
  const block = res.content.find((b) => b.type === "text");
  if (!block) throw new Error("The Receiver returned no answer.");

  const parsed = JSON.parse(block.text);
  return {
    guess: String(parsed.guess || "").trim(),
    matchesTarget: !!parsed.matchesTarget,
    line: String(parsed.line || "").trim(),
    nudge: String(parsed.nudge || "").trim(),
  };
}

module.exports = { receive, MODEL };
