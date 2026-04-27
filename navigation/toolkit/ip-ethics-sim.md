---
layout: page
title: AP CSP Legal and Ethical Sprint
description: Five-minute AP CSP game-style review for IP, copyright, plagiarism, open source, open access, privacy, bias, and digital divide.
permalink: /student/ip-ethics-sim/
---

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo+Expanded:wght@500;700&family=Public+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

<section id="ap-sprint" aria-label="AP CSP legal and ethical sprint game">
  <div class="sprint-wrap">
    <header class="hero panel">
      <p class="eyebrow">AP CSP Review Mode</p>
      <h1>Legal and Ethical Sprint</h1>
      <p class="subtitle">
        Five-minute exam drill. Read each prompt and classify it as <strong>Legal</strong>,
        <strong>Ethical</strong>, <strong>Both</strong>, or <strong>Neither</strong>.
      </p>
      <div class="hud" role="status" aria-live="polite">
        <span>Mode: <strong id="modeStatus">Not Started</strong></span>
        <span>Time: <strong id="time">5:00</strong></span>
        <span>Question: <strong id="questionNum">0/8</strong></span>
        <span>Score: <strong id="score">0</strong></span>
      </div>
      <div class="meter"><div id="meterFill"></div></div>
      <div class="actions">
        <button id="startBtn" class="btn">Start Drill</button>
        <button id="startTalkBtn" class="btn alt">Start Talk-Along</button>
        <button id="restartBtn" class="btn alt" hidden>Restart</button>
      </div>
    </header>

    <main class="grid">
      <article class="panel prompt-panel">
        <p class="prompt-label" id="promptLabel">Ready</p>
        <h2 id="promptTitle">AP Practice Prompt</h2>
        <p id="promptText">
          Press Start Drill to begin. You will answer 8 classification prompts built from your notes.
        </p>

        <div id="choices" class="choices" hidden>
          <button class="choice" data-choice="legal">Legal</button>
          <button class="choice" data-choice="ethical">Ethical</button>
          <button class="choice" data-choice="both">Both</button>
          <button class="choice" data-choice="neither">Neither</button>
        </div>

        <div id="feedback" class="feedback" hidden>
          <p id="feedbackTag" class="feedback-tag"></p>
          <p id="feedbackText"></p>
          <button id="nextBtn" class="btn alt">Next</button>
        </div>
      </article>

      <aside class="panel side">
        <h3>Term Reminders</h3>
        <ul>
          <li><strong>IP:</strong> creative work with ownership rights.</li>
          <li><strong>Copyright:</strong> legal protection of IP.</li>
          <li><strong>Plagiarism:</strong> presenting others' work as your own.</li>
          <li><strong>Creative Commons:</strong> reuse allowed under stated conditions.</li>
          <li><strong>Open Source:</strong> usable/modifiable code with license rules.</li>
          <li><strong>Open Access:</strong> free access to research, still cite sources.</li>
        </ul>
        <h3>AP Response Frame</h3>
        <p class="frame">
          Name the term -> classify issue -> explain impact -> propose one mitigation.
        </p>
        <ol id="log" class="log"></ol>
      </aside>
    </main>
  </div>
</section>

<script>
(() => {
  const prompts = [
    {
      title: "Intellectual Property",
      text: "A student posts another team's original infographic as their own work with no credit.",
      answer: "both",
      reason: "Copyright ownership is violated and plagiarism is committed.",
      term: "IP / Copyright / Plagiarism"
    },
    {
      title: "Creative Commons",
      text: "A creator publishes work with a Creative Commons license requiring attribution, and a user gives proper credit.",
      answer: "neither",
      reason: "This follows the creator's license terms and respects ownership.",
      term: "Creative Commons"
    },
    {
      title: "Open Source",
      text: "A team copies open-source code, removes the license notice, and distributes the modified version.",
      answer: "both",
      reason: "License noncompliance is a legal issue and misattribution is an ethical issue.",
      term: "Open Source Licensing"
    },
    {
      title: "Open Access",
      text: "A presentation uses data from an open-access article but intentionally omits citation.",
      answer: "ethical",
      reason: "This is plagiarism; access is free, but attribution remains required in academic ethics.",
      term: "Open Access / Plagiarism"
    },
    {
      title: "Privacy",
      text: "An app collects user activity and location data without clear disclosure or consent.",
      answer: "both",
      reason: "Potential privacy law/policy violations plus ethical harm from non-transparent monitoring.",
      term: "Data Privacy"
    },
    {
      title: "Algorithmic Bias",
      text: "A moderation algorithm repeatedly flags one demographic group at a higher false-positive rate.",
      answer: "ethical",
      reason: "Unfair impact and potential discrimination are core ethical concerns.",
      term: "Bias / Fairness"
    },
    {
      title: "Digital Divide",
      text: "A required online tool assumes fast internet and newer devices, excluding some students.",
      answer: "ethical",
      reason: "Unequal access creates fairness and equity issues.",
      term: "Digital Divide"
    },
    {
      title: "Compliant Use",
      text: "A team uses licensed media with permission, cites sources, and explains data collection clearly.",
      answer: "neither",
      reason: "No legal or ethical issue is indicated because safeguards are in place.",
      term: "Best Practice"
    }
  ];

  const state = {
    mode: null,
    index: -1,
    score: 0,
    remaining: 300,
    timer: null,
    complete: false
  };

  const timeEl = document.getElementById("time");
  const modeStatusEl = document.getElementById("modeStatus");
  const questionNumEl = document.getElementById("questionNum");
  const scoreEl = document.getElementById("score");
  const meterFillEl = document.getElementById("meterFill");
  const promptLabelEl = document.getElementById("promptLabel");
  const promptTitleEl = document.getElementById("promptTitle");
  const promptTextEl = document.getElementById("promptText");
  const choicesEl = document.getElementById("choices");
  const feedbackEl = document.getElementById("feedback");
  const feedbackTagEl = document.getElementById("feedbackTag");
  const feedbackTextEl = document.getElementById("feedbackText");
  const nextBtn = document.getElementById("nextBtn");
  const startBtn = document.getElementById("startBtn");
  const startTalkBtn = document.getElementById("startTalkBtn");
  const restartBtn = document.getElementById("restartBtn");
  const logEl = document.getElementById("log");

  function fmt(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${String(sec).padStart(2, "0")}`;
  }

  function updateHud() {
    if (state.mode === "talk") {
      timeEl.textContent = "--:--";
      scoreEl.textContent = "-";
      modeStatusEl.textContent = "Talk-Along";
    } else if (state.mode === "drill") {
      timeEl.textContent = fmt(Math.max(state.remaining, 0));
      scoreEl.textContent = state.score;
      modeStatusEl.textContent = "Drill";
    } else {
      timeEl.textContent = "5:00";
      scoreEl.textContent = 0;
      modeStatusEl.textContent = "Not Started";
    }
    questionNumEl.textContent = `${Math.max(state.index + 1, 0)}/${prompts.length}`;
    const pct = Math.max(0, Math.min(100, ((state.index + 1) / prompts.length) * 100));
    meterFillEl.style.width = `${pct}%`;
  }

  function pushLog(text) {
    const item = document.createElement("li");
    item.textContent = text;
    logEl.prepend(item);
  }

  function startTimer() {
    if (state.timer) return;
    state.timer = setInterval(() => {
      if (state.complete) return;
      state.remaining -= 1;
      updateHud();
      if (state.remaining <= 0) {
        finish(true);
      }
    }, 1000);
  }

  function renderPrompt() {
    const prompt = prompts[state.index];
    promptLabelEl.textContent = `Prompt ${state.index + 1}`;
    promptTitleEl.textContent = prompt.title;
    promptTextEl.textContent = prompt.text;
    choicesEl.hidden = false;
    feedbackEl.hidden = true;
    Array.from(choicesEl.querySelectorAll("button")).forEach((button) => {
      button.disabled = false;
      button.classList.remove("correct", "wrong", "selected");
    });
    updateHud();
  }

  function submitChoice(choice) {
    const prompt = prompts[state.index];
    const isCorrect = choice === prompt.answer;

    Array.from(choicesEl.querySelectorAll("button")).forEach((button) => {
      button.disabled = true;
      if (state.mode === "talk") {
        if (button.dataset.choice === choice) {
          button.classList.add("selected");
        }
        if (button.dataset.choice === prompt.answer) {
          button.classList.add("correct");
        }
      } else {
        if (button.dataset.choice === prompt.answer) {
          button.classList.add("correct");
        } else if (button.dataset.choice === choice) {
          button.classList.add("wrong");
        }
      }
    });

    if (isCorrect && state.mode === "drill") {
      state.score += 1;
    }

    if (state.mode === "talk") {
      feedbackTagEl.textContent = `Reference classification: ${prompt.answer.toUpperCase()}`;
    } else {
      feedbackTagEl.textContent = isCorrect ? "Correct" : `Best classification: ${prompt.answer.toUpperCase()}`;
    }
    feedbackTextEl.textContent = `${prompt.reason} Term: ${prompt.term}.`;
    feedbackEl.hidden = false;

    if (state.mode === "talk") {
      pushLog(`${prompt.title}: discussed`);
    } else {
      pushLog(`${prompt.title}: ${isCorrect ? "correct" : "review needed"}`);
    }
    updateHud();
  }

  function nextPrompt() {
    if (state.index >= prompts.length - 1) {
      finish(false);
      return;
    }
    state.index += 1;
    renderPrompt();
  }

  function finish(outOfTime) {
    if (state.complete) return;
    state.complete = true;
    clearInterval(state.timer);
    state.timer = null;

    choicesEl.hidden = true;
    feedbackEl.hidden = true;

    promptLabelEl.textContent = outOfTime ? "Time Expired" : "Drill Complete";
    if (state.mode === "talk") {
      promptLabelEl.textContent = "Talk-Along Complete";
      promptTitleEl.textContent = "Discussion Set Finished";
      promptTextEl.innerHTML = "You covered all 8 prompts. Quick close: ask which prompt was legal but still ethically concerning, and why.";
    } else {
      const pct = Math.round((state.score / prompts.length) * 100);
      let band = "Needs Review";
      if (pct >= 88) band = "Strong AP Readiness";
      else if (pct >= 63) band = "Developing AP Readiness";
      promptTitleEl.textContent = band;
      promptTextEl.innerHTML = `Final score: <strong>${state.score}/${prompts.length}</strong> (${pct}%).<br/>Use missed terms for targeted review: copyright, plagiarism, licensing, privacy, bias, and digital divide.`;
    }
    restartBtn.hidden = false;
    updateHud();
  }

  function reset() {
    state.mode = null;
    state.index = -1;
    state.score = 0;
    state.remaining = 300;
    state.complete = false;
    clearInterval(state.timer);
    state.timer = null;
    logEl.innerHTML = "";
    promptLabelEl.textContent = "Ready";
    promptTitleEl.textContent = "AP Practice Prompt";
    promptTextEl.textContent = "Press Start Drill to begin. You will answer 8 classification prompts built from your notes.";
    choicesEl.hidden = true;
    feedbackEl.hidden = true;
    restartBtn.hidden = true;
    updateHud();
  }

  choicesEl.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-choice]");
    if (!button) return;
    submitChoice(button.dataset.choice);
  });

  nextBtn.addEventListener("click", nextPrompt);

  startBtn.addEventListener("click", () => {
    if (state.index === -1 && !state.complete && !state.mode) {
      state.mode = "drill";
      startTimer();
      nextPrompt();
    }
  });

  startTalkBtn.addEventListener("click", () => {
    if (state.index === -1 && !state.complete && !state.mode) {
      state.mode = "talk";
      nextPrompt();
    }
  });

  restartBtn.addEventListener("click", reset);

  reset();
})();
</script>

<style>
#ap-sprint {
  --ink: #1d232b;
  --muted: #5b6470;
  --line: rgba(24, 34, 42, 0.14);
  --card: rgba(255, 255, 255, 0.82);
  --accent: #0a6e67;
  --accent-dark: #07544f;
  --warn: #9f3f35;
  --ok: #1f7a45;
  min-height: 100vh;
  padding: 2rem 1rem 3rem;
  background:
    radial-gradient(circle at 9% 12%, #f7dcac 0%, transparent 29%),
    radial-gradient(circle at 90% 86%, #cde5df 0%, transparent 32%),
    linear-gradient(130deg, #ece5d8, #edf3f2 56%, #e9e3d8);
  color: var(--ink);
  font-family: "Public Sans", sans-serif;
}

#ap-sprint .sprint-wrap {
  max-width: 1080px;
  margin: 0 auto;
}

#ap-sprint .panel {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 1rem;
  box-shadow: 0 12px 24px rgba(16, 28, 34, 0.08);
}

#ap-sprint .hero {
  padding: 1.2rem;
}

#ap-sprint h1,
#ap-sprint h2,
#ap-sprint h3 {
  margin: 0;
  font-family: "Archivo Expanded", sans-serif;
  letter-spacing: 0.01em;
}

#ap-sprint h1 {
  font-size: clamp(1.45rem, 3.2vw, 2.15rem);
  margin-top: 0.25rem;
}

#ap-sprint .eyebrow {
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--accent-dark);
  font-weight: 700;
}

#ap-sprint .subtitle {
  margin: 0.7rem 0 0.95rem;
  max-width: 74ch;
  color: var(--muted);
  line-height: 1.5;
}

#ap-sprint .hud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  font-size: 0.94rem;
}

#ap-sprint .hud span {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
}

#ap-sprint .meter {
  margin-top: 0.8rem;
  height: 0.68rem;
  background: rgba(27, 39, 46, 0.14);
  border-radius: 999px;
  overflow: hidden;
}

#ap-sprint #meterFill {
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #21a095);
  transition: width 0.28s ease;
}

#ap-sprint .actions {
  margin-top: 0.85rem;
  display: flex;
  gap: 0.55rem;
}

#ap-sprint .btn {
  border: none;
  border-radius: 0.72rem;
  padding: 0.65rem 0.9rem;
  font: inherit;
  font-weight: 700;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
}

#ap-sprint .btn:hover,
#ap-sprint .btn:focus-visible {
  background: var(--accent-dark);
  outline: none;
}

#ap-sprint .btn.alt {
  background: #2a3946;
}

#ap-sprint .btn.alt:hover,
#ap-sprint .btn.alt:focus-visible {
  background: #1f2d38;
}

#ap-sprint .grid {
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 2fr 1fr;
}

#ap-sprint .prompt-panel {
  padding: 1.1rem;
}

#ap-sprint .prompt-label {
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-dark);
  font-weight: 700;
}

#ap-sprint #promptTitle {
  margin-top: 0.2rem;
  font-size: clamp(1.1rem, 2.3vw, 1.45rem);
}

#ap-sprint #promptText {
  margin-top: 0.6rem;
  line-height: 1.5;
}

#ap-sprint .choices {
  margin-top: 0.95rem;
  display: grid;
  gap: 0.58rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

#ap-sprint .choice {
  border: 1px solid rgba(10, 110, 103, 0.35);
  background: #fff;
  border-radius: 0.8rem;
  padding: 0.7rem;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  color: #21303b;
}

#ap-sprint .choice:hover,
#ap-sprint .choice:focus-visible {
  border-color: var(--accent);
  box-shadow: 0 6px 14px rgba(10, 110, 103, 0.16);
  outline: none;
}

#ap-sprint .choice.correct {
  border-color: var(--ok);
  background: rgba(31, 122, 69, 0.12);
}

#ap-sprint .choice.wrong {
  border-color: var(--warn);
  background: rgba(159, 63, 53, 0.12);
}

#ap-sprint .choice.selected {
  border-color: #2d5d9f;
  background: rgba(45, 93, 159, 0.12);
}

#ap-sprint .feedback {
  margin-top: 0.95rem;
  border: 1px dashed rgba(42, 57, 70, 0.35);
  border-radius: 0.82rem;
  background: rgba(255, 255, 255, 0.86);
  padding: 0.75rem;
}

#ap-sprint .feedback-tag {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.76rem;
  color: #304455;
  font-weight: 700;
}

#ap-sprint .side {
  padding: 1rem;
}

#ap-sprint .side h3 {
  font-size: 0.96rem;
  margin-bottom: 0.45rem;
}

#ap-sprint .side ul {
  margin: 0;
  padding-left: 1.1rem;
}

#ap-sprint .side li {
  margin-bottom: 0.32rem;
  line-height: 1.4;
}

#ap-sprint .frame {
  margin: 0.25rem 0 0.65rem;
  padding: 0.55rem 0.6rem;
  border-left: 4px solid var(--accent);
  background: rgba(214, 237, 233, 0.72);
  border-radius: 0.52rem;
  line-height: 1.45;
}

#ap-sprint .log {
  margin: 0;
  padding-left: 1.15rem;
  max-height: 220px;
  overflow: auto;
}

#ap-sprint .log li {
  margin-bottom: 0.34rem;
}

@media (max-width: 920px) {
  #ap-sprint .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  #ap-sprint {
    padding: 1.2rem 0.7rem 2rem;
  }

  #ap-sprint .choices {
    grid-template-columns: 1fr;
  }
}
</style>
