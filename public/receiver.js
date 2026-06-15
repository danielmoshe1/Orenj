/* =========================================================
   Orenj — the Receiver game (frontend).

   You get a secret word. You explain it. The AI Receiver
   (via /api/receiver) hunts for the strongest WRONG word
   your explanation could mean. Revise until it can't
   misread you — in as few tries, and as few words, as you can.

   All guessing happens on the backend so the game works on
   mobile, shared links, and any host. State lives in
   localStorage. Art comes from /art.js (ART.pip).
   ========================================================= */
"use strict";

/* ---------------- Curriculum ----------------
   5 levels of rising slipperiness. `rivals` are hints passed
   to the Receiver so each level probes the right confusions —
   the player never sees them. */

const LEVELS = [
  {
    n: 1, emoji: "🥄", name: "Everyday Objects",
    sub: "Plain things — but plain words slip too.",
    targets: [
      { word: "spoon", rivals: ["fork", "ladle", "cup", "bowl"] },
      { word: "umbrella", rivals: ["tent", "raincoat", "parasol", "roof"] },
      { word: "candle", rivals: ["lamp", "match", "torch", "flashlight"] },
      { word: "mirror", rivals: ["window", "photograph", "painting", "screen"] },
      { word: "key", rivals: ["lock", "keycard", "password", "code"] },
      { word: "broom", rivals: ["mop", "rake", "brush", "vacuum"] },
    ],
  },
  {
    n: 2, emoji: "🍊", name: "Similar Objects",
    sub: "Near-twins. One loose clue and the Receiver picks the cousin.",
    targets: [
      { word: "tangerine", rivals: ["orange", "clementine", "mandarin", "peach"] },
      { word: "violin", rivals: ["viola", "cello", "fiddle", "guitar"] },
      { word: "alligator", rivals: ["crocodile", "lizard", "caiman"] },
      { word: "turtle", rivals: ["tortoise", "terrapin"] },
      { word: "jam", rivals: ["jelly", "marmalade", "preserve", "syrup"] },
      { word: "butterfly", rivals: ["moth", "dragonfly"] },
    ],
  },
  {
    n: 3, emoji: "⚙️", name: "Processes",
    sub: "Things that happen, not things you hold.",
    targets: [
      { word: "evaporation", rivals: ["boiling", "melting", "condensation", "drying"] },
      { word: "photosynthesis", rivals: ["respiration", "digestion", "growth"] },
      { word: "voting", rivals: ["surveying", "auctioning", "applauding", "queuing"] },
      { word: "recycling", rivals: ["composting", "reusing", "donating", "sorting"] },
      { word: "fermentation", rivals: ["rotting", "cooking", "freezing", "brewing"] },
      { word: "erosion", rivals: ["weathering", "melting", "digging", "flooding"] },
    ],
  },
  {
    n: 4, emoji: "💜", name: "Emotions & Experiences",
    sub: "Invisible. The Receiver leans on the nearest feeling.",
    targets: [
      { word: "nostalgia", rivals: ["sadness", "homesickness", "regret", "longing"] },
      { word: "relief", rivals: ["happiness", "calm", "gratitude", "satisfaction"] },
      { word: "embarrassment", rivals: ["shame", "guilt", "shyness", "regret"] },
      { word: "anticipation", rivals: ["excitement", "anxiety", "hope", "impatience"] },
      { word: "déjà vu", rivals: ["memory", "premonition", "dream", "familiarity"] },
      { word: "awe", rivals: ["surprise", "fear", "admiration", "wonder"] },
    ],
  },
  {
    n: 5, emoji: "🌀", name: "Complex Concepts",
    sub: "Abstract and contested. Precision is the only way through.",
    targets: [
      { word: "inflation", rivals: ["recession", "taxation", "interest", "debt"] },
      { word: "democracy", rivals: ["republic", "freedom", "voting", "government"] },
      { word: "gravity", rivals: ["magnetism", "weight", "friction", "momentum"] },
      { word: "irony", rivals: ["sarcasm", "coincidence", "bad luck", "paradox"] },
      { word: "entropy", rivals: ["chaos", "decay", "energy", "randomness"] },
      { word: "empathy", rivals: ["sympathy", "kindness", "pity", "compassion"] },
    ],
  },
];

const MAX_TRIES = 5;

/* ---------------- State ---------------- */

const STORE_KEY = "orenj-receiver-v1";

function defaultState() {
  return {
    won: 0,          // total rounds solved
    played: 0,       // total rounds finished (won or lost)
    streak: 0,       // consecutive solves
    bestStreak: 0,
    best: {},        // `${levelN}:${word}` -> best (fewest) tries to solve
    solved: {},      // `${levelN}:${word}` -> true
  };
}

let S = loadState();
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) { /* fresh start */ }
  return defaultState();
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(S)); }
function keyOf(level, t) { return level.n + ":" + t.word; }

/* ---------------- DOM helpers ---------------- */

const $ = (id) => document.getElementById(id);

function toast(msg, ms = 3000) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), ms);
}
function showScreen(name) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $("screen-" + name).classList.add("active");
  window.scrollTo({ top: 0 });
}
function renderStats() {
  $("stat-won").textContent = S.won;
  $("stat-streak").textContent = S.streak;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function wordCount(text) { return (text.trim().match(/\S+/g) || []).length; }

/* ---------------- Home ---------------- */

function renderHome() {
  $("hero-pip").innerHTML = ART.pip("happy");

  const total = LEVELS.reduce((a, l) => a + l.targets.length, 0);
  $("home-foot").textContent = `${Object.keys(S.solved).length} / ${total} words mastered · best streak ${S.bestStreak}`;

  $("levels").innerHTML = LEVELS.map((l) => {
    const solved = l.targets.filter((t) => S.solved[keyOf(l, t)]).length;
    const pct = Math.round((solved / l.targets.length) * 100);
    return `<div class="level-card" data-level="${l.n}">
      <div class="lc-n">Lv ${l.n}</div>
      <div class="lc-emoji">${l.emoji}</div>
      <div class="lc-name">${l.name}</div>
      <div class="lc-sub">${l.sub}</div>
      <div class="lc-bar"><i style="width:${pct}%"></i></div>
      <div class="lc-prog">${solved}/${l.targets.length} solved</div>
    </div>`;
  }).join("");

  $("levels").querySelectorAll(".level-card").forEach((el) => {
    el.addEventListener("click", () => {
      const lvl = LEVELS.find((l) => l.n === +el.dataset.level);
      startLevel(lvl);
    });
  });

  renderStats();
  showScreen("home");
}

/* ---------------- Round flow ---------------- */

let current = null;   // { level, target, tries, lastExplanation }

function pickTarget(level) {
  // Prefer an unsolved word; otherwise any (replay).
  const unsolved = level.targets.filter((t) => !S.solved[keyOf(level, t)]);
  const pool = unsolved.length ? unsolved : level.targets;
  return pool[Math.floor(Math.random() * pool.length)];
}

function startLevel(level) {
  startRound(level, pickTarget(level));
}

function startRound(level, target) {
  current = { level, target, tries: 0, lastExplanation: "" };

  $("round-level").textContent = `${level.emoji} Level ${level.n} · ${level.name}`;
  $("secret-word").textContent = target.word;
  $("secret-hint").textContent = "Only you can see this. The Receiver only reads your explanation.";
  $("receiver-pip").innerHTML = ART.pip("happy");
  $("receiver-bubble").classList.remove("thinking");
  $("receiver-line").textContent = "I'm listening… explain your word and I'll try to guess it.";
  const nudge = $("receiver-nudge");
  nudge.hidden = true; nudge.textContent = "";

  $("explain-input").value = "";
  $("btn-send").disabled = true;
  $("wordcount").textContent = "0 words";

  renderTries();
  showScreen("round");
  $("explain-input").focus();
}

function renderTries() {
  let html = "";
  for (let i = 0; i < MAX_TRIES; i++) {
    const cls = i < current.tries ? "spent" : (i === current.tries ? "now" : "");
    html += `<i class="${cls}"></i>`;
  }
  $("tries").innerHTML = html + `<span style="color:#cdbff0;font-weight:800;font-size:13px;margin-left:6px">${current.tries}/${MAX_TRIES}</span>`;
}

async function sendToReceiver() {
  const text = $("explain-input").value.trim();
  if (wordCount(text) < 3) { toast("Give the Receiver a sentence or two to work with."); return; }

  current.lastExplanation = text;
  setThinking(true);
  $("btn-send").disabled = true;

  let result;
  try {
    const res = await fetch("/api/receiver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        target: current.target.word,
        rivals: current.target.rivals || [],
        explanation: text,
        level: current.level.n,
        levelName: current.level.name,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Receiver error (${res.status})`);
    }
    result = await res.json();
  } catch (e) {
    setThinking(false);
    $("btn-send").disabled = false;
    toast(networkHint(e.message), 5000);
    return;
  }

  setThinking(false);
  current.tries += 1;
  renderTries();

  if (result.matchesTarget) {
    revealReceiver(result, true);
    setTimeout(() => finishRound(true, text), 1100);
    return;
  }

  // Wrong guess — show it + the nudge, keep the text for editing.
  revealReceiver(result, false);
  if (current.tries >= MAX_TRIES) {
    setTimeout(() => finishRound(false, text), 1300);
  } else {
    $("btn-send").disabled = false;
  }
}

function setThinking(on) {
  const bubble = $("receiver-bubble");
  const nudge = $("receiver-nudge");
  if (on) {
    $("receiver-pip").innerHTML = ART.pip("think");
    bubble.classList.add("thinking");
    $("receiver-line").innerHTML = `The Receiver is weighing your words <span class="dots"><i></i><i></i><i></i></span>`;
    nudge.hidden = true;
  } else {
    bubble.classList.remove("thinking");
  }
}

function revealReceiver(result, correct) {
  $("receiver-pip").innerHTML = ART.pip(correct ? "cheer" : "encourage");
  $("receiver-line").textContent = result.line || (correct ? "Got it!" : "Hmm…");
  const nudge = $("receiver-nudge");
  if (!correct && result.nudge) {
    nudge.textContent = result.nudge;
    nudge.hidden = false;
  } else {
    nudge.hidden = true;
  }
}

function networkHint(msg) {
  // The game needs the backend relay running. Make that obvious.
  if (/Failed to fetch|NetworkError|load failed/i.test(msg)) {
    return "Can't reach the Receiver. Is the server running? (see README — npm start in /server)";
  }
  return msg;
}

/* ---------------- Scoring ---------------- */

// Fewer tries is better. Fewer words is better. Precision blends the two.
const TRY_BASE = { 1: 100, 2: 84, 3: 66, 4: 50, 5: 38 };

function tierFor(tries, won) {
  if (!won) return { label: "Needs work", color: "#ff5d8f" };
  if (tries === 1) return { label: "Masterful", color: "#3fbf63" };
  if (tries === 2) return { label: "Strong", color: "#3fbf63" };
  if (tries <= 4) return { label: "Average", color: "#ff8c1a" };
  return { label: "Needs work", color: "#ff5d8f" };
}
function efficiencyScore(words) {
  // ~6 words and under is ideal; long-winded wins lose points.
  return Math.max(20, Math.min(100, Math.round(100 - (words - 6) * 4)));
}
function precisionScore(tries, words, won) {
  const base = won ? (TRY_BASE[tries] || 30) : 15;
  return Math.round(base * 0.65 + efficiencyScore(words) * 0.35);
}

function finishRound(won, finalText) {
  const { level, target, tries } = current;
  const k = keyOf(level, target);
  const words = wordCount(finalText);

  S.played += 1;
  if (won) {
    S.won += 1;
    S.streak += 1;
    S.bestStreak = Math.max(S.bestStreak, S.streak);
    S.solved[k] = true;
    if (!S.best[k] || tries < S.best[k]) S.best[k] = tries;
  } else {
    S.streak = 0;
  }
  save();
  renderStats();
  renderResult(won, finalText, words);
}

function renderResult(won, finalText, words) {
  const { target, tries } = current;
  const tier = tierFor(tries, won);

  $("result-pip").innerHTML = ART.pip(won ? "cheer" : "encourage");
  $("result-headline").textContent = won
    ? (tries === 1 ? "Read you perfectly — first try! 🎯" : "The Receiver got it! ✅")
    : "The doors stayed open. 🚪";
  $("result-tagline").textContent = won
    ? "Your words left only one possible meaning."
    : `It kept landing on something else. The word was "${target.word}".`;
  $("result-word").textContent = `🍊 ${target.word}`;

  const eff = efficiencyScore(words);
  const prec = precisionScore(tries, words, won);

  $("metrics").innerHTML = `
    <div class="metric">
      <div class="m-val">${won ? tries : "—"}<small>${won ? "/" + MAX_TRIES : ""}</small></div>
      <div class="m-label">Attempts</div>
      <div class="m-tier" style="color:${tier.color}">${tier.label}</div>
    </div>
    <div class="metric">
      <div class="m-val">${won ? eff : "—"}</div>
      <div class="m-label">Word efficiency</div>
      <div class="m-tier" style="color:#8a7ca0">${won ? words + " words" : "—"}</div>
    </div>
    <div class="metric">
      <div class="m-val">${won ? prec : "—"}<small>${won ? "/100" : ""}</small></div>
      <div class="m-label">Precision</div>
      <div class="m-tier" style="color:#8a7ca0">${won ? "overall" : "—"}</div>
    </div>`;

  const wrap = $("result-final-wrap");
  if (finalText) { wrap.style.display = ""; $("result-final").textContent = `"${finalText}"`; }
  else wrap.style.display = "none";

  showScreen("result");
  if (won) burstConfetti(tries === 1 ? 70 : 36);
}

/* ---------------- Confetti ---------------- */

function burstConfetti(count) {
  const colors = ["#ff8c1a", "#ffcb3d", "#ff5d8f", "#9d6bff", "#4cc4ff", "#3fbf63"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = (1.6 + Math.random() * 1.4) + "s";
    c.style.animationDelay = (Math.random() * 0.3) + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3400);
  }
}

/* ---------------- Wiring ---------------- */

$("brand-home").addEventListener("click", renderHome);
$("btn-quit").addEventListener("click", renderHome);

$("explain-input").addEventListener("input", () => {
  const n = wordCount($("explain-input").value);
  $("wordcount").textContent = n + (n === 1 ? " word" : " words");
  $("btn-send").disabled = n < 3;
});
$("btn-send").addEventListener("click", sendToReceiver);

$("btn-replay").addEventListener("click", () => startRound(current.level, current.target));
$("btn-next").addEventListener("click", () => startLevel(current.level));

// Cmd/Ctrl+Enter sends.
$("explain-input").addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !$("btn-send").disabled) sendToReceiver();
});

/* ---------------- Voice dictation (Web Speech API) ----------------
   Speak your explanation. Browser-native, no key. Hides where unsupported. */
(function setupVoiceInput() {
  const micBtn = $("btn-mic");
  const input = $("explain-input");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!micBtn || !SR) { if (micBtn) micBtn.hidden = true; return; }

  let rec = null, listening = false, baseText = "", finalText = "";

  function syncInput(interim) {
    const joiner = baseText && !/\s$/.test(baseText) ? " " : "";
    input.value = baseText + joiner + finalText + interim;
    input.dispatchEvent(new Event("input"));
  }
  function setIdle() {
    listening = false;
    micBtn.classList.remove("recording");
    micBtn.title = "Dictate with your voice";
  }
  function stop() { if (rec) { try { rec.stop(); } catch (e) {} } setIdle(); }
  function start() {
    rec = new SR();
    rec.lang = navigator.language || "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    baseText = input.value; finalText = "";
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const chunk = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += chunk; else interim += chunk;
      }
      syncInput(interim);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") toast("Microphone blocked — allow mic access to dictate 🎤");
      else if (e.error === "no-speech") toast("Didn't catch that — try again 🎤");
      setIdle();
    };
    rec.onend = () => { if (listening) setIdle(); };
    try { rec.start(); } catch (e) { return; }
    listening = true;
    micBtn.classList.add("recording");
    micBtn.title = "Stop dictating";
    toast("Listening… speak now 🎤");
  }
  micBtn.addEventListener("click", () => { listening ? stop() : start(); });
  $("btn-quit").addEventListener("click", stop);
  $("btn-send").addEventListener("click", stop);
})();

/* ---------------- Boot ---------------- */
renderHome();
