---
layout: opencs
title: IP & Ethics Decision Path
description: Follow-along decision tool for AP CSP legal and ethical computing checkpoints
permalink: /student/ip-ethics-path/
---

<div class="ip-path-wrap">
  <header class="ip-header">
    <p class="eyebrow">AP CSP Follow-Along Tool</p>
    <h1>IP & Ethics Decision Path</h1>
    <p class="subtitle">Move your project from <strong>Idea</strong> to <strong>Launch</strong> by answering practical legal and ethical questions.</p>
  </header>

  <section class="rail" aria-label="Progress path">
    <div class="rail-track" id="railTrack"></div>
  </section>

  <section class="card" id="stageCard" aria-live="polite">
    <p class="stage-label" id="stageLabel"></p>
    <h2 id="stageTitle"></h2>
    <p class="stage-goal" id="stageGoal"></p>

    <div class="question-block">
      <h3>Decision Check</h3>
      <p id="stageQuestion"></p>
      <div class="actions" role="group" aria-label="Decision options">
        <button class="decision yes" data-decision="yes">Yes</button>
        <button class="decision no" data-decision="no">No</button>
        <button class="decision unsure" data-decision="unsure">Not Sure</button>
      </div>
    </div>

    <div class="feedback" id="feedbackPanel">
      <p class="feedback-tag" id="feedbackTag">Choose an option to see guidance.</p>
      <p class="feedback-text" id="feedbackText">This step helps you check copyright, attribution, privacy, and fairness before moving forward.</p>
    </div>

    <div class="controls">
      <button id="prevBtn" class="nav-btn">Back</button>
      <button id="nextBtn" class="nav-btn primary">Next Step</button>
    </div>
  </section>

  <section class="summary" id="summary" hidden>
    <h2>Launch Readiness Summary</h2>
    <p>Review your responses before launch.</p>
    <ul id="summaryList"></ul>
    <button id="restartBtn" class="nav-btn primary">Start Over</button>
  </section>
</div>

<style>
  :root {
    --ink: #162129;
    --muted: #59656f;
    --paper: #f8fafb;
    --panel: #ffffff;
    --line: #d8e0e5;
    --accent: #0c7c93;
    --accent-2: #c45b2d;
    --ok: #1e7a4f;
    --warn: #a26205;
    --risk: #9f2d2d;
    --shadow: 0 12px 32px rgba(15, 34, 44, 0.08);
  }

  .ip-path-wrap {
    max-width: 980px;
    margin: 32px auto 56px;
    padding: 20px;
    font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
    color: var(--ink);
  }

  .ip-header {
    background: linear-gradient(135deg, #edf5f8 0%, #fdf6f2 100%);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 24px;
    box-shadow: var(--shadow);
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.76rem;
    color: var(--accent);
    margin: 0 0 8px;
    font-weight: 700;
  }

  .ip-header h1 {
    margin: 0;
    font-size: clamp(1.6rem, 2.5vw, 2.2rem);
  }

  .subtitle {
    margin: 10px 0 0;
    color: var(--muted);
  }

  .rail {
    margin: 20px 0 14px;
  }

  .rail-track {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
  }

  .node {
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 10px 8px;
    text-align: center;
    background: var(--panel);
    font-size: 0.85rem;
    color: var(--muted);
    transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
  }

  .node.active {
    border-color: var(--accent);
    background: #edf8fb;
    color: var(--ink);
    font-weight: 700;
    transform: translateY(-2px);
  }

  .node.done {
    border-color: #95c6d1;
    background: #f2fbfd;
  }

  .card,
  .summary {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 20px;
    box-shadow: var(--shadow);
  }

  .stage-label {
    margin: 0;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    font-weight: 700;
  }

  #stageTitle {
    margin: 8px 0 4px;
  }

  .stage-goal {
    margin-top: 0;
    color: var(--muted);
  }

  .question-block {
    border-top: 1px solid var(--line);
    margin-top: 14px;
    padding-top: 14px;
  }

  .question-block h3 {
    margin: 0 0 8px;
    font-size: 1rem;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }

  .decision,
  .nav-btn {
    border-radius: 10px;
    border: 1px solid var(--line);
    background: #fff;
    color: var(--ink);
    padding: 9px 14px;
    cursor: pointer;
    font-weight: 600;
  }

  .decision:hover,
  .nav-btn:hover {
    border-color: var(--accent);
  }

  .decision.yes { border-left: 4px solid var(--ok); }
  .decision.no { border-left: 4px solid var(--risk); }
  .decision.unsure { border-left: 4px solid var(--warn); }

  .feedback {
    margin-top: 14px;
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 12px;
    background: var(--paper);
  }

  .feedback-tag {
    margin: 0;
    font-weight: 700;
  }

  .feedback-text {
    margin: 6px 0 0;
    color: var(--muted);
  }

  .controls {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  .nav-btn.primary {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
  }

  .summary {
    margin-top: 14px;
  }

  .summary ul {
    padding-left: 20px;
  }

  .summary li {
    margin: 8px 0;
  }

  @media (max-width: 760px) {
    .rail-track {
      grid-template-columns: repeat(2, 1fr);
    }

    .controls {
      flex-direction: column;
    }

    .controls .nav-btn {
      width: 100%;
    }
  }
</style>

<script>
  const stages = [
    {
      id: "idea",
      title: "Idea",
      goal: "Define what you are building and what source material you plan to use.",
      question: "Are all outside ideas, text, media, or code clearly identified as your work vs someone else's work?",
      feedback: {
        yes: { tag: "Good Start (Integrity)", text: "You are reducing plagiarism risk by separating original work from borrowed material." },
        no: { tag: "Risk: Plagiarism", text: "Pause and label which parts are yours and which are borrowed. Misrepresenting authorship is plagiarism." },
        unsure: { tag: "Action Needed", text: "Create a source list now so attribution is built in from the beginning." }
      }
    },
    {
      id: "rights",
      title: "Build",
      goal: "Confirm legal permission to use any non-original content.",
      question: "Do you have legal rights to reuse each external source (copyright permission, Creative Commons terms, open-source license, or open-access terms)?",
      feedback: {
        yes: { tag: "Legal Check Passed", text: "You can continue, but keep records of license terms and required attribution." },
        no: { tag: "Legal Risk", text: "Using copyrighted material without permission can violate law. Replace it or get permission." },
        unsure: { tag: "Verify Before Use", text: "If rights are unclear, treat as restricted until you confirm license and usage conditions." }
      }
    },
    {
      id: "data",
      title: "Data",
      goal: "Evaluate how your tool handles personal or behavioral data.",
      question: "Does your project collect or analyze user data, and if so, are users informed and protected?",
      feedback: {
        yes: { tag: "Privacy Awareness", text: "State what data is collected, why it is needed, and how it is protected or minimized." },
        no: { tag: "Lower Privacy Exposure", text: "No collection lowers risk, but confirm that analytics or third-party tools are not collecting data silently." },
        unsure: { tag: "Potential Compliance Gap", text: "Audit data flows, including plugins and services, before release." }
      }
    },
    {
      id: "ethics",
      title: "Fairness",
      goal: "Check whether outcomes are fair across different users.",
      question: "Could your algorithm, rules, or content create biased outcomes for some groups?",
      feedback: {
        yes: { tag: "Ethical Red Flag", text: "Identify where bias may appear and revise design, data, or decision rules before launch." },
        no: { tag: "Good Signal", text: "Keep testing with diverse users. No obvious bias now does not guarantee fairness later." },
        unsure: { tag: "Needs Review", text: "Run a bias check with varied user cases and ask others to review assumptions." }
      }
    },
    {
      id: "access",
      title: "Access",
      goal: "Address digital divide concerns in your launch plan.",
      question: "Can users with limited devices, bandwidth, or technical experience still access and understand this project?",
      feedback: {
        yes: { tag: "Inclusive Design", text: "You are reducing digital divide barriers with accessibility and low-friction access." },
        no: { tag: "Equity Concern", text: "Consider mobile-first layout, lower bandwidth mode, and clearer instructions for broader access." },
        unsure: { tag: "Test Accessibility", text: "Pilot with users who have varied access levels before launch." }
      }
    },
    {
      id: "launch",
      title: "Launch",
      goal: "Make final legal and ethical release decision.",
      question: "Based on your checks, are you ready to launch now, or should you revise first?",
      feedback: {
        yes: { tag: "Ready to Launch", text: "Document your citations, permissions, privacy statement, and fairness checks." },
        no: { tag: "Revise Before Release", text: "Use your flagged items as a launch checklist. Fix legal or ethical issues first." },
        unsure: { tag: "Hold and Review", text: "Collect one more round of feedback from peers/teacher focused on law and ethics." }
      }
    }
  ];

  let current = 0;
  const decisions = Array(stages.length).fill(null);

  const railTrack = document.getElementById("railTrack");
  const stageLabel = document.getElementById("stageLabel");
  const stageTitle = document.getElementById("stageTitle");
  const stageGoal = document.getElementById("stageGoal");
  const stageQuestion = document.getElementById("stageQuestion");
  const feedbackTag = document.getElementById("feedbackTag");
  const feedbackText = document.getElementById("feedbackText");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const summary = document.getElementById("summary");
  const summaryList = document.getElementById("summaryList");
  const stageCard = document.getElementById("stageCard");
  const restartBtn = document.getElementById("restartBtn");

  function renderRail() {
    railTrack.innerHTML = "";
    stages.forEach((s, idx) => {
      const n = document.createElement("div");
      n.className = "node";
      if (idx === current) n.classList.add("active");
      if (idx < current) n.classList.add("done");
      n.textContent = s.title;
      railTrack.appendChild(n);
    });
  }

  function showStage() {
    const s = stages[current];
    stageLabel.textContent = `Step ${current + 1} of ${stages.length}`;
    stageTitle.textContent = s.title;
    stageGoal.textContent = s.goal;
    stageQuestion.textContent = s.question;

    const selected = decisions[current];
    if (!selected) {
      feedbackTag.textContent = "Choose an option to see guidance.";
      feedbackText.textContent = "This step helps you check copyright, attribution, privacy, and fairness before moving forward.";
    } else {
      feedbackTag.textContent = s.feedback[selected].tag;
      feedbackText.textContent = s.feedback[selected].text;
    }

    prevBtn.disabled = current === 0;
    nextBtn.textContent = current === stages.length - 1 ? "View Summary" : "Next Step";
    renderRail();
  }

  function choose(decision) {
    const s = stages[current];
    decisions[current] = decision;
    feedbackTag.textContent = s.feedback[decision].tag;
    feedbackText.textContent = s.feedback[decision].text;
  }

  function showSummary() {
    stageCard.hidden = true;
    summary.hidden = false;
    summaryList.innerHTML = "";

    stages.forEach((s, idx) => {
      const item = document.createElement("li");
      const d = decisions[idx] || "not answered";
      const note = decisions[idx] ? s.feedback[decisions[idx]].tag : "Needs response";
      item.textContent = `${s.title}: ${d.toUpperCase()} - ${note}`;
      summaryList.appendChild(item);
    });
  }

  function restart() {
    for (let i = 0; i < decisions.length; i += 1) decisions[i] = null;
    current = 0;
    summary.hidden = true;
    stageCard.hidden = false;
    showStage();
  }

  document.querySelectorAll(".decision").forEach((btn) => {
    btn.addEventListener("click", () => choose(btn.dataset.decision));
  });

  prevBtn.addEventListener("click", () => {
    if (current > 0) {
      current -= 1;
      showStage();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (current < stages.length - 1) {
      current += 1;
      showStage();
    } else {
      showSummary();
    }
  });

  restartBtn.addEventListener("click", restart);

  showStage();
</script>
