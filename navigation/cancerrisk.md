---
layout: opencs
permalink: /cancerrisk
title: Risk Calculator
---

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ML Cancer Risk Predictor · ACS 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Nunito:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --cream: #fdf6ee;
    --warm-white: #fff9f3;
    --rose: #e07a6a;
    --rose-light: #f2b5ab;
    --rose-pale: #fce9e6;
    --terracotta: #c45e4a;
    --sage: #8aaa8c;
    --sage-light: #b8ceb9;
    --sage-pale: #eaf1ea;
    --tan: #c4a882;
    --tan-light: #e8d9c4;
    --brown: #6b4c3b;
    --text-main: #3d2c24;
    --text-muted: #937468;
    --border: rgba(196,168,130,0.25);
    --border-bright: rgba(196,168,130,0.5);
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Nunito', system-ui, sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; }

  body {
    background: var(--cream);
    color: var(--text-main);
    font-family: var(--sans);
    font-size: 15px;
    line-height: 1.65;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  /* ── SCROLL PROGRESS SIDEBAR ── */
  .progress-sidebar {
    position: fixed;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    z-index: 100;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .progress-sidebar.visible { opacity: 1; }

  .progress-pct {
    font-family: var(--serif);
    font-size: 13px;
    font-weight: 600;
    color: var(--rose);
    margin-bottom: 10px;
  }

  .progress-track {
    width: 3px;
    height: 52px;
    background: var(--tan-light);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }
  .progress-fill {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 0%;
    background: linear-gradient(to bottom, var(--rose-light), var(--rose));
    border-radius: 2px;
    transition: height 0.4s cubic-bezier(.22,1,.36,1);
  }

  .progress-dot-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 4px 0;
  }
  .progress-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--tan-light);
    border: 2px solid var(--warm-white);
    transition: background 0.3s ease, transform 0.25s ease, box-shadow 0.25s ease;
    z-index: 1;
  }
  .progress-dot.done  { background: var(--rose); }
  .progress-dot.active {
    background: var(--terracotta);
    transform: scale(1.35);
    box-shadow: 0 0 0 4px rgba(224,122,106,0.2);
  }

  .progress-dot-wrap .tip {
    position: absolute;
    left: 20px;
    background: var(--text-main);
    color: white;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .05em;
    text-transform: uppercase;
    padding: 4px 9px;
    border-radius: 6px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .progress-dot-wrap:hover .tip { opacity: 1; }

  .progress-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--text-muted);
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    margin-top: 12px;
    opacity: 0.6;
  }

  @media(max-width: 880px) { .progress-sidebar { display: none; } }

  /* ── PAGE ── */
  .page {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* ── HEADER ── */
  .page-header { text-align: center; margin-bottom: 40px; }
  .lang-switch {
    display: inline-flex;
    background: rgba(196,168,130,0.16);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 3px;
    gap: 3px;
    margin-bottom: 14px;
  }
  .lang-btn {
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    border-radius: 999px;
    padding: 5px 10px;
    cursor: pointer;
  }
  .lang-btn.active {
    background: #fff;
    color: var(--text-main);
    box-shadow: 0 1px 6px rgba(61,44,36,0.12);
  }
  .page-header h1 {
    font-family: var(--serif);
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 600;
    color: var(--text-main);
    line-height: 1.1;
    margin: 0 0 14px;
  }
  .page-header h1 em { font-style: italic; color: var(--rose); }
  .page-header p {
    color: var(--text-muted);
    max-width: 640px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 1.75;
  }

  /* ── CARD ── */
  .card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 36px 40px;
    margin-bottom: 20px;
    box-shadow: 0 4px 24px rgba(61,44,36,.05);
  }
  @media(max-width:520px){ .card { padding: 24px 20px; } }

  .card-title {
    font-family: var(--serif);
    font-size: 24px;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 6px;
  }
  .card-sub {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 28px;
    line-height: 1.6;
  }

  /* ── SECTION HEADINGS ── */
  .section-heading {
    font-family: var(--serif);
    font-size: 20px;
    font-weight: 600;
    color: var(--text-main);
    margin: 36px 0 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-heading:first-of-type { margin-top: 0; }
  .section-icon {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: var(--rose-pale);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
  }

  /* ── FORM ELEMENTS ── */
  .field { margin-bottom: 22px; }
  .field:last-child { margin-bottom: 0; }
  .field label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }
  .field select,
  .field input[type=number] {
    width: 100%;
    background: var(--cream);
    border: 1px solid var(--tan-light);
    border-radius: 10px;
    padding: 11px 14px;
    font-family: var(--sans);
    font-size: 14px;
    color: var(--text-main);
    outline: none;
    appearance: none;
    transition: border-color .2s;
    cursor: pointer;
  }
  .field select:focus,
  .field input[type=number]:focus {
    border-color: var(--rose);
    box-shadow: 0 0 0 3px rgba(224,122,106,.12);
  }
  .select-wrap { position: relative; }
  .select-wrap::after {
    content: '▾';
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    color: var(--tan); pointer-events: none; font-size: 13px;
  }

  /* chips – used for single-select AND multi-select */
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    padding: 7px 16px;
    border-radius: 20px;
    border: 1px solid var(--border-bright);
    background: var(--cream);
    font-family: var(--sans);
    font-size: 13px;
    color: var(--text-muted);
    cursor: pointer;
    transition: all .18s;
    user-select: none;
  }
  .chip:hover { border-color: var(--rose-light); color: var(--text-main); }
  .chip.selected {
    background: var(--rose); border-color: var(--rose);
    color: white; font-weight: 600;
  }

  /* cancer-type chips get a slightly different selected colour so they
     look distinct from the single-select chips */
  .cancer-chips .chip.selected {
    background: var(--terracotta); border-color: var(--terracotta);
  }
  .cancer-chips .chip.na {
    opacity: .35; pointer-events: none; cursor: default;
  }

  .toggles-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 24px;
  }
  @media(max-width: 600px) { .toggles-grid { grid-template-columns: 1fr; } }

  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 0;
    border-bottom: 1px solid var(--border);
  }
  .toggle-row:last-child { border-bottom: none; }
  .toggle-label { font-size: 14px; color: var(--text-main); }

  .toggle {
    position: relative; width: 44px; height: 24px;
    flex-shrink: 0; margin-left: 16px;
  }
  .toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
  .toggle-track {
    position: absolute; inset: 0;
    background: var(--tan-light);
    border-radius: 12px; cursor: pointer; transition: background .2s;
  }
  .toggle-track::after {
    content: '';
    position: absolute; top: 3px; left: 3px;
    width: 18px; height: 18px;
    background: white; border-radius: 50%;
    transition: transform .2s;
    box-shadow: 0 1px 4px rgba(0,0,0,.15);
  }
  .toggle input:checked + .toggle-track { background: var(--rose); }
  .toggle input:checked + .toggle-track::after { transform: translateX(20px); }

  .field-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  }
  @media(max-width:520px){ .field-grid { grid-template-columns: 1fr; } }

  .btn-row {
    display: flex; gap: 12px;
    margin-top: 28px; justify-content: flex-end;
  }
  .btn {
    font-family: var(--sans); font-size: 14px; font-weight: 600;
    border-radius: 10px; padding: 11px 24px;
    cursor: pointer; border: none; transition: all .2s;
  }
  .btn-primary { background: var(--rose); color: white; }
  .btn-primary:hover { background: var(--terracotta); transform: translateY(-1px); }
  .btn-primary:disabled { background: var(--tan-light); color: var(--text-muted); transform: none; cursor: not-allowed; }

  /* ── RESULTS ── */
  .results-hidden { display: none; }

  /* ── RISK HERO (redesigned) ── */
  .risk-hero {
    text-align: center;
    padding: 32px 0 24px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 28px;
  }

  /* Big primary number */
  .risk-number {
    font-family: var(--serif);
    font-size: clamp(72px, 14vw, 110px);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.02em;
    transition: color .3s;
    margin-bottom: 4px;
  }

  /* Category label sits UNDER the big number */
  .risk-category-label {
    font-family: var(--serif);
    font-size: clamp(20px, 3.5vw, 28px);
    font-weight: 600;
    letter-spacing: .04em;
    text-transform: uppercase;
    margin-bottom: 10px;
    line-height: 1.2;
  }

  /* Gauge */
  .gauge-wrap { margin: 16px auto 12px; max-width: 480px; }
  .gauge-track {
    height: 8px; background: var(--tan-light);
    border-radius: 4px; overflow: hidden; margin-bottom: 6px;
  }
  .gauge-fill {
    height: 100%; border-radius: 4px; width: 0;
    transition: width 1s cubic-bezier(.22,1,.36,1);
  }
  .gauge-labels {
    display: flex; justify-content: space-between;
    font-size: 10px; color: var(--text-muted);
    letter-spacing: .05em; text-transform: uppercase;
  }

  /* Badge */
  .risk-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 18px; border-radius: 20px;
    font-size: 13px; font-weight: 700;
    letter-spacing: .04em; text-transform: uppercase;
    margin-bottom: 12px;
  }
  .risk-badge.low  { background: var(--sage-pale); color: #4a7a4c; }
  .risk-badge.high { background: var(--rose-pale); color: var(--terracotta); }

  /* Model confidence — now small and muted */
  .confidence-note {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: .03em;
    margin-top: 4px;
  }

  /* ── RISK FACTORS ── */
  .risk-factors-list { margin-bottom: 28px; }
  .risk-factor-item {
    padding: 14px 16px; background: var(--cream);
    border-radius: 10px; margin-bottom: 10px;
    border-left: 3px solid var(--tan-light);
  }
  .risk-factor-item.high     { border-left-color: var(--terracotta); }
  .risk-factor-item.moderate { border-left-color: #d9a566; }
  .rf-header {
    display: flex; align-items: center;
    justify-content: space-between; margin-bottom: 4px;
  }
  .rf-name   { font-size: 14px; font-weight: 600; color: var(--text-main); }
  .rf-impact {
    font-size: 10px; font-weight: 700;
    letter-spacing: .08em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 12px;
  }
  .rf-impact.high     { background: var(--rose-pale); color: var(--terracotta); }
  .rf-impact.moderate { background: #fff3e0; color: #9b6a00; }
  .rf-detail { font-size: 12px; color: var(--text-muted); line-height: 1.6; }

  /* ── FEATURE IMPORTANCE ── */
  .importance-grid { display: grid; gap: 10px; margin-bottom: 24px; }
  .importance-row  { display: flex; align-items: center; gap: 12px; }
  .importance-label { min-width: 160px; font-size: 12px; color: var(--text-muted); }
  .importance-bar-track {
    flex: 1; height: 6px;
    background: var(--tan-light); border-radius: 3px; overflow: hidden;
  }
  .importance-bar-fill {
    height: 100%; background: var(--rose); border-radius: 3px;
    transition: width 1s cubic-bezier(.22,1,.36,1);
  }
  .importance-val { font-size: 12px; font-weight: 600; min-width: 40px; text-align: right; color: var(--text-main); }

  /* ── CANCER TYPE BREAKDOWN ── */
  .ct-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 14px;
    margin-bottom: 28px;
  }
  .ct-card {
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px 18px;
    position: relative;
    overflow: hidden;
    transition: box-shadow .2s;
  }
  .ct-card:hover { box-shadow: 0 4px 16px rgba(61,44,36,.08); }
  .ct-card-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }
  .ct-rr {
    font-family: var(--serif);
    font-size: 36px;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 2px;
  }
  .ct-rr-sub {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: .06em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .ct-level-bar {
    height: 4px;
    border-radius: 2px;
    background: var(--tan-light);
    overflow: hidden;
    margin-bottom: 10px;
  }
  .ct-level-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 1s cubic-bezier(.22,1,.36,1);
  }
  .ct-level-fill.low      { background: var(--sage); }
  .ct-level-fill.moderate { background: #d9a566; }
  .ct-level-fill.high     { background: var(--terracotta); }
  .ct-badge {
    display: inline-block;
    font-size: 10px; font-weight: 700;
    letter-spacing: .07em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 10px;
    margin-bottom: 8px;
  }
  .ct-badge.low      { background: var(--sage-pale); color: #4a7a4c; }
  .ct-badge.moderate { background: #fff3e0; color: #9b6a00; }
  .ct-badge.high     { background: var(--rose-pale); color: var(--terracotta); }
  .ct-factors {
    font-size: 11px;
    color: var(--text-muted);
    line-height: 1.55;
    margin-top: 6px;
  }
  .ct-note {
    font-size: 11px;
    color: var(--text-muted);
    font-style: italic;
    margin-top: 6px;
    line-height: 1.5;
    border-top: 1px solid var(--border);
    padding-top: 6px;
  }
  .ct-na {
    opacity: .5;
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 4px;
  }

  /* ── LOADING / MISC ── */
  .ai-loading {
    display: flex; align-items: center; justify-content: center;
    gap: 10px; color: var(--text-muted); font-size: 13px; padding: 40px 20px;
  }
  .dots span {
    display: inline-block; width: 6px; height: 6px;
    background: var(--rose); border-radius: 50%;
    animation: pulse 1.2s ease-in-out infinite;
  }
  .dots span:nth-child(2) { animation-delay: .2s; }
  .dots span:nth-child(3) { animation-delay: .4s; }
  @keyframes pulse {
    0%, 100% { opacity: .3; transform: scale(.8); }
    50%       { opacity: 1; transform: scale(1);   }
  }

  .source-note {
    font-size: 11px; color: var(--text-muted);
    text-align: center; line-height: 1.6; margin-top: 8px;
    padding: 16px; border-top: 1px solid var(--border);
  }
  .source-note strong { color: var(--text-main); }

  /* cancer-type optional notice */
  .optional-note {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 8px;
    font-style: italic;
  }
</style>
</head>
<body>

<!-- ── SCROLL PROGRESS SIDEBAR ── -->
<nav class="progress-sidebar" id="progressSidebar" aria-label="Form completion progress">
  <div class="progress-pct" id="progressPct">0%</div>

  <div class="progress-dot-wrap" id="wrap-demographics">
    <div class="progress-dot active" id="dot-demographics"></div>
    <span class="tip" data-i18n="tipDemographics">Demographics</span>
  </div>

  <div class="progress-track"><div class="progress-fill" id="fill-1"></div></div>

  <div class="progress-dot-wrap" id="wrap-lifestyle">
    <div class="progress-dot" id="dot-lifestyle"></div>
    <span class="tip" data-i18n="tipLifestyle">Lifestyle</span>
  </div>

  <div class="progress-track"><div class="progress-fill" id="fill-2"></div></div>

  <div class="progress-dot-wrap" id="wrap-medical">
    <div class="progress-dot" id="dot-medical"></div>
    <span class="tip" data-i18n="tipMedical">Medical History</span>
  </div>

  <div class="progress-track"><div class="progress-fill" id="fill-3"></div></div>

  <div class="progress-dot-wrap" id="wrap-environmental">
    <div class="progress-dot" id="dot-environmental"></div>
    <span class="tip" data-i18n="tipEnvironmental">Environmental</span>
  </div>

  <div class="progress-label" data-i18n="progressLabel">Progress</div>
</nav>

<div class="page">

  <div class="page-header">
    <div class="lang-switch" aria-label="Language switch">
      <button class="lang-btn active" type="button" data-lang="en" onclick="rcSetLanguage('en')">EN</button>
      <button class="lang-btn" type="button" data-lang="es" onclick="rcSetLanguage('es')">ES</button>
    </div>
    <h1 id="rcTitle">Cancer Risk<br><em>ML Predictor</em></h1>
    <p id="rcIntro">Answer questions about your demographics, lifestyle, and medical history. Our machine learning model, trained on ACS Cancer Facts &amp; Figures 2026 epidemiological data, will predict your relative cancer risk category and identify your key modifiable risk factors.</p>
  </div>

  <div class="card">

    <!-- SECTION 1: DEMOGRAPHICS -->
    <div class="section-heading" id="section-demographics">
      <span class="section-icon">𐦂𖨆𖠋</span><span data-i18n="sectionDemographics">Demographics</span>
    </div>

    <div class="field-grid">
      <div class="field">
        <label data-i18n="labelAge">Age</label>
        <input type="number" id="age" min="18" max="100" placeholder="e.g. 55">
      </div>
      <div class="field">
        <label data-i18n="labelSex">Biological Sex</label>
        <div class="select-wrap">
          <select id="sex">
            <option value="">Select…</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label data-i18n="labelRace">Race / Ethnicity</label>
      <div class="chips" id="race-chips">
        <div class="chip" data-val="white">White</div>
        <div class="chip" data-val="black">Black / African American</div>
        <div class="chip" data-val="hispanic">Hispanic / Latino</div>
        <div class="chip" data-val="aian">American Indian / Alaskan Native</div>
        <div class="chip" data-val="aapi">Asian American / Pacific Islander</div>
      </div>
    </div>

    <!-- SECTION 2: LIFESTYLE -->
    <div class="section-heading" id="section-lifestyle">
      <span class="section-icon">☕︎</span><span data-i18n="sectionLifestyle">Lifestyle Factors</span>
    </div>

    <div class="field">
      <label data-i18n="labelSmoking">Smoking Status</label>
      <div class="chips" id="smoke-chips">
        <div class="chip" data-val="never">Never smoked</div>
        <div class="chip" data-val="former">Former smoker</div>
        <div class="chip" data-val="current">Current smoker</div>
      </div>
    </div>

    <div class="field" id="pack-years-field" style="display:none">
      <label data-i18n="labelPackYears">Pack-Years</label>
      <input type="number" id="packYears" min="0" max="200" placeholder="e.g. 20" value="0">
    </div>

    <div class="field">
      <label data-i18n="labelBmi">BMI Category</label>
      <div class="chips" id="bmi-chips">
        <div class="chip" data-val="normal">Normal</div>
        <div class="chip" data-val="overweight">Overweight</div>
        <div class="chip" data-val="obese">Obese</div>
        <div class="chip" data-val="severely-obese">Severely Obese</div>
      </div>
    </div>

    <div class="field">
      <label data-i18n="labelAlcohol">Alcohol Consumption</label>
      <div class="chips" id="alcohol-chips">
        <div class="chip" data-val="none">None</div>
        <div class="chip" data-val="light">Light</div>
        <div class="chip" data-val="moderate">Moderate</div>
        <div class="chip" data-val="heavy">Heavy</div>
      </div>
    </div>

    <div class="field">
      <label data-i18n="labelActivity">Physical Activity</label>
      <div class="chips" id="activity-chips">
        <div class="chip" data-val="sedentary">Sedentary</div>
        <div class="chip" data-val="moderate">Moderate</div>
        <div class="chip" data-val="active">Active (150+ min/wk)</div>
      </div>
    </div>

    <div class="field">
      <label data-i18n="labelDiet">Diet Quality</label>
      <div class="chips" id="diet-chips">
        <div class="chip" data-val="poor">Poor</div>
        <div class="chip" data-val="average">Average</div>
        <div class="chip" data-val="healthy">Healthy</div>
      </div>
    </div>

    <!-- SECTION 3: MEDICAL HISTORY -->
    <div class="section-heading" id="section-medical">
      <span class="section-icon">☤</span><span data-i18n="sectionMedical">Medical History</span>
    </div>
    <p class="card-sub" style="margin-top:-10px;margin-bottom:16px" data-i18n="medicalHelp">Toggle any conditions that apply to you</p>

    <div class="toggles-grid">
      <div class="toggle-row">
        <div class="toggle-label">Family history of cancer</div>
        <label class="toggle"><input type="checkbox" id="familyHistory"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div class="toggle-label">Type 2 Diabetes</div>
        <label class="toggle"><input type="checkbox" id="diabetes"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div class="toggle-label">Hepatitis B or C</div>
        <label class="toggle"><input type="checkbox" id="hepatitis"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div class="toggle-label">HPV infection</div>
        <label class="toggle"><input type="checkbox" id="hpv"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div class="toggle-label">H. pylori infection</div>
        <label class="toggle"><input type="checkbox" id="hPylori"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div class="toggle-label">Inflammatory Bowel Disease</div>
        <label class="toggle"><input type="checkbox" id="ibd"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div class="toggle-label">Prior radiation therapy</div>
        <label class="toggle"><input type="checkbox" id="radiationHistory"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div class="toggle-label">Immunosuppression</div>
        <label class="toggle"><input type="checkbox" id="immunosuppression"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div class="toggle-label">Precancerous lesions</div>
        <label class="toggle"><input type="checkbox" id="precancerousLesions"><div class="toggle-track"></div></label>
      </div>
    </div>

    <!-- SECTION 4: ENVIRONMENTAL -->
    <div class="section-heading" id="section-environmental">
      <span class="section-icon">☀</span><span data-i18n="sectionEnvironmental">Environmental Exposures</span>
    </div>
    <p class="card-sub" style="margin-top:-10px;margin-bottom:16px" data-i18n="environmentalHelp">Toggle any exposures that apply to you</p>

    <div class="toggles-grid">
      <div class="toggle-row">
        <div class="toggle-label">Occupational chemical exposure</div>
        <label class="toggle"><input type="checkbox" id="occupationalExposure"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div class="toggle-label">High UV / sun exposure history</div>
        <label class="toggle"><input type="checkbox" id="uvExposure"><div class="toggle-track"></div></label>
      </div>
    </div>

    <!-- SECTION 5: CANCER TYPES OF INTEREST -->
    <div class="section-heading" id="section-cancertypes">
      <span class="section-icon">🎯</span><span data-i18n="sectionCancerTypes">Cancer Types of Interest</span>
    </div>
    <p class="card-sub" style="margin-top:-10px;margin-bottom:8px" data-i18n="cancerTypesHelp">
      Select any cancer types you'd like a specific risk breakdown for
    </p>
    <p class="optional-note" data-i18n="cancerTypesOptional">Optional — leave unselected for overall risk only</p>
    <br>

    <div class="chips cancer-chips" id="cancer-type-chips">
      <div class="chip" data-val="lung">Lung</div>
      <div class="chip" data-val="colorectal">Colorectal</div>
      <div class="chip" data-val="breast" data-sex="female">Breast</div>
      <div class="chip" data-val="prostate" data-sex="male">Prostate</div>
      <div class="chip" data-val="melanoma">Melanoma</div>
      <div class="chip" data-val="liver">Liver</div>
      <div class="chip" data-val="cervical" data-sex="female">Cervical</div>
      <div class="chip" data-val="stomach">Stomach</div>
      <div class="chip" data-val="bladder">Bladder</div>
      <div class="chip" data-val="lymphoma">Lymphoma</div>
      <div class="chip" data-val="leukemia">Leukemia</div>
      <div class="chip" data-val="pancreatic">Pancreatic</div>
    </div>

    <div class="btn-row">
      <button class="btn btn-primary" id="predictBtn" onclick="predictRisk()" data-i18n="predictBtn">Predict My Risk →</button>
    </div>
  </div>

  <!-- RESULTS -->
  <div class="card results-hidden" id="results"></div>

</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

// ── STATE ──────────────────────────────────────────────────────────────────
const state = {
  age: null, sex: null, race: null,
  smoking_status: null, pack_years: 0,
  bmi_category: null, alcohol_consumption: null,
  physical_activity: null, diet_quality: null,
  family_history: false, diabetes: false, hepatitis: false,
  hpv: false, h_pylori: false, ibd: false,
  radiation_history: false, immunosuppression: false,
  precancerous_lesions: false,
  occupational_exposure: false, uv_exposure: false,
  selected_cancer_types: []   // multi-select
};

const REQUIRED = ['age','sex','race','smoking_status','bmi_category',
                  'alcohol_consumption','physical_activity','diet_quality'];
const DEMO_KEYS     = ['age','sex','race'];
const LIFESTYLE_KEYS= ['smoking_status','bmi_category','alcohol_consumption','physical_activity','diet_quality'];

const RC_LANGUAGE_KEY = 'acsReportLanguage';
let rcLanguage = (() => {
  const saved = localStorage.getItem(RC_LANGUAGE_KEY);
  return saved === 'es' ? 'es' : 'en';
})();

const RC_I18N = {
  en: {
    titleMain: 'Cancer Risk', titleSub: 'ML Predictor',
    introText: 'Answer questions about your demographics, lifestyle, and medical history. Our machine learning model, trained on ACS Cancer Facts & Figures 2026 epidemiological data, will predict your relative cancer risk category and identify your key modifiable risk factors.',
    tipDemographics: 'Demographics', tipLifestyle: 'Lifestyle',
    tipMedical: 'Medical History', tipEnvironmental: 'Environmental',
    progressLabel: 'Progress',
    sectionDemographics: 'Demographics', labelAge: 'Age', labelSex: 'Biological Sex', labelRace: 'Race / Ethnicity',
    sectionLifestyle: 'Lifestyle Factors', labelSmoking: 'Smoking Status', labelPackYears: 'Pack-Years',
    labelBmi: 'BMI Category', labelAlcohol: 'Alcohol Consumption', labelActivity: 'Physical Activity', labelDiet: 'Diet Quality',
    sectionMedical: 'Medical History', medicalHelp: 'Toggle any conditions that apply to you',
    sectionEnvironmental: 'Environmental Exposures', environmentalHelp: 'Toggle any exposures that apply to you',
    sectionCancerTypes: 'Cancer Types of Interest',
    cancerTypesHelp: 'Select any cancer types you\'d like a specific risk breakdown for',
    cancerTypesOptional: 'Optional — leave unselected for overall risk only',
    predictBtn: 'Predict My Risk →',
    validatePrefix: 'Please fill in',
    loading: 'Running ML prediction…',
    errorPrefix: 'Error', errorHelp: 'Make sure you are logged in and the backend is running.',
    resultTitle: 'Your ML Risk Prediction', resultSub: 'Based on machine learning analysis of your profile',
    predictedCategory: 'Predicted Risk Category',
    lowRisk: 'Low Risk', highRisk: 'High Risk',
    highBadge: '↑ Higher Than Average Risk', lowBadge: '↓ Lower Than Average Risk',
    keyFactorsTitle: 'Your Key Risk Factors',
    importanceTitle: 'Feature Importance Analysis',
    cancerTypeTitle: 'Cancer-Type Risk Breakdown',
    cancerTypeSub: 'Estimated lifetime risk based on your profile vs. population baseline',
    lifetimeRiskLabel: 'estimated lifetime risk',
    rrLabel: 'avg. risk',
    baselineLabel: 'population baseline',
    rrExplain: 'Relative risk vs. population average (1.0×). Select cancer types below for individual lifetime risk estimates.',
    keyFactorsLabel: 'Contributing factors',
    sourceModel: 'Model',
    sourceBody: 'Ensemble ML (Logistic Regression + Random Forest) trained on ACS Cancer Facts & Figures 2026 data. This is for educational purposes only and does not constitute medical advice. Consult a healthcare provider for personalized screening recommendations.',
    noFactors: 'No significant modifiable risk factors identified. Continue healthy lifestyle behaviors!',
    naLabel: 'Not applicable'
  },
  es: {
    titleMain: 'Riesgo de Cáncer', titleSub: 'Predictor ML',
    introText: 'Responda preguntas sobre su demografía, estilo de vida e historial médico. Nuestro modelo de aprendizaje automático, entrenado con datos epidemiológicos de ACS Cancer Facts & Figures 2026, predecirá su categoría de riesgo relativo de cáncer e identificará sus principales factores de riesgo modificables.',
    tipDemographics: 'Demografía', tipLifestyle: 'Estilo de vida',
    tipMedical: 'Historial médico', tipEnvironmental: 'Exposición',
    progressLabel: 'Progreso',
    sectionDemographics: 'Demografía', labelAge: 'Edad', labelSex: 'Sexo biológico', labelRace: 'Raza / Etnicidad',
    sectionLifestyle: 'Factores de estilo de vida', labelSmoking: 'Tabaquismo', labelPackYears: 'Años-paquete',
    labelBmi: 'Categoría de IMC', labelAlcohol: 'Consumo de alcohol', labelActivity: 'Actividad física', labelDiet: 'Calidad de la dieta',
    sectionMedical: 'Historial médico', medicalHelp: 'Marque las condiciones que correspondan a su caso',
    sectionEnvironmental: 'Exposiciones ambientales', environmentalHelp: 'Marque las exposiciones que correspondan a su caso',
    sectionCancerTypes: 'Tipos de cáncer de interés',
    cancerTypesHelp: 'Seleccione los tipos de cáncer para los que desea un desglose de riesgo específico',
    cancerTypesOptional: 'Opcional — déjelo sin seleccionar para el riesgo general únicamente',
    predictBtn: 'Predecir mi riesgo →',
    validatePrefix: 'Por favor complete',
    loading: 'Ejecutando predicción ML…',
    errorPrefix: 'Error', errorHelp: 'Asegúrese de haber iniciado sesión y de que el backend esté en ejecución.',
    resultTitle: 'Su predicción de riesgo (ML)', resultSub: 'Basada en un análisis de aprendizaje automático de su perfil',
    predictedCategory: 'Categoría de riesgo predicha',
    lowRisk: 'Riesgo bajo', highRisk: 'Riesgo alto',
    highBadge: '↑ Riesgo superior al promedio', lowBadge: '↓ Riesgo inferior al promedio',
    keyFactorsTitle: 'Sus factores de riesgo clave',
    importanceTitle: 'Análisis de importancia de variables',
    cancerTypeTitle: 'Desglose de riesgo por tipo de cáncer',
    cancerTypeSub: 'Riesgo estimado de por vida basado en su perfil frente al promedio poblacional',
    lifetimeRiskLabel: 'riesgo estimado de por vida',
    rrLabel: 'riesgo prom.',
    baselineLabel: 'referencia poblacional',
    rrExplain: 'Riesgo relativo frente al promedio poblacional (1.0×). Seleccione tipos de cáncer para estimaciones individuales.',
    keyFactorsLabel: 'Factores contribuyentes',
    sourceModel: 'Modelo',
    sourceBody: 'Modelo de ML ensamblado (regresión logística + Random Forest) entrenado con datos de ACS Cancer Facts & Figures 2026. Esto es solo con fines educativos y no constituye consejo médico. Consulte a un profesional de la salud para recomendaciones de detección personalizadas.',
    noFactors: 'No se identificaron factores de riesgo modificables significativos. ¡Mantenga hábitos de vida saludables!',
    naLabel: 'No aplicable'
  }
};

function rcT(key) {
  const s = RC_I18N[rcLanguage] || RC_I18N.en;
  return s[key] || RC_I18N.en[key] || key;
}

const RC_CHIP_TEXT = {
  en: {
    race: { white:'White', black:'Black / African American', hispanic:'Hispanic / Latino', aian:'American Indian / Alaskan Native', aapi:'Asian American / Pacific Islander' },
    smoking_status: { never:'Never smoked', former:'Former smoker', current:'Current smoker' },
    bmi_category: { normal:'Normal', overweight:'Overweight', obese:'Obese', 'severely-obese':'Severely Obese' },
    alcohol_consumption: { none:'None', light:'Light', moderate:'Moderate', heavy:'Heavy' },
    physical_activity: { sedentary:'Sedentary', moderate:'Moderate', active:'Active (150+ min/wk)' },
    diet_quality: { poor:'Poor', average:'Average', healthy:'Healthy' },
    cancer_types: { lung:'Lung', colorectal:'Colorectal', breast:'Breast', prostate:'Prostate',
                    melanoma:'Melanoma', liver:'Liver', cervical:'Cervical', stomach:'Stomach',
                    bladder:'Bladder', lymphoma:'Lymphoma', leukemia:'Leukemia', pancreatic:'Pancreatic' }
  },
  es: {
    race: { white:'Blanco', black:'Negro / Afroamericano', hispanic:'Hispano / Latino', aian:'Indígena americano / Nativo de Alaska', aapi:'Asiático-estadounidense / Isleño del Pacífico' },
    smoking_status: { never:'Nunca fumó', former:'Exfumador', current:'Fumador actual' },
    bmi_category: { normal:'Normal', overweight:'Sobrepeso', obese:'Obesidad', 'severely-obese':'Obesidad severa' },
    alcohol_consumption: { none:'Ninguno', light:'Bajo', moderate:'Moderado', heavy:'Alto' },
    physical_activity: { sedentary:'Sedentario', moderate:'Moderado', active:'Activo (150+ min/sem)' },
    diet_quality: { poor:'Mala', average:'Promedio', healthy:'Saludable' },
    cancer_types: { lung:'Pulmón', colorectal:'Colorrectal', breast:'Mama', prostate:'Próstata',
                    melanoma:'Melanoma', liver:'Hígado', cervical:'Cervical', stomach:'Estómago',
                    bladder:'Vejiga', lymphoma:'Linfoma', leukemia:'Leucemia', pancreatic:'Pancreático' }
  }
};

const RC_TOGGLE_TEXT = {
  en: {
    familyHistory:'Family history of cancer', diabetes:'Type 2 Diabetes',
    hepatitis:'Hepatitis B or C', hpv:'HPV infection', hPylori:'H. pylori infection',
    ibd:'Inflammatory Bowel Disease', radiationHistory:'Prior radiation therapy',
    immunosuppression:'Immunosuppression', precancerousLesions:'Precancerous lesions',
    occupationalExposure:'Occupational chemical exposure', uvExposure:'High UV / sun exposure history'
  },
  es: {
    familyHistory:'Antecedentes familiares de cáncer', diabetes:'Diabetes tipo 2',
    hepatitis:'Hepatitis B o C', hpv:'Infección por VPH', hPylori:'Infección por H. pylori',
    ibd:'Enfermedad inflamatoria intestinal', radiationHistory:'Radioterapia previa',
    immunosuppression:'Inmunosupresión', precancerousLesions:'Lesiones precancerosas',
    occupationalExposure:'Exposición ocupacional a químicos', uvExposure:'Antecedentes de alta exposición a UV/sol'
  }
};

function rcApplyChoiceTexts() {
  const map = RC_CHIP_TEXT[rcLanguage] || RC_CHIP_TEXT.en;
  const applyGroup = (id, dict) => {
    const root = document.getElementById(id);
    if (!root) return;
    root.querySelectorAll('.chip').forEach(chip => {
      const key = chip.getAttribute('data-val');
      if (key && dict[key]) chip.textContent = dict[key];
    });
  };
  applyGroup('race-chips',     map.race);
  applyGroup('smoke-chips',    map.smoking_status);
  applyGroup('bmi-chips',      map.bmi_category);
  applyGroup('alcohol-chips',  map.alcohol_consumption);
  applyGroup('activity-chips', map.physical_activity);
  applyGroup('diet-chips',     map.diet_quality);
  applyGroup('cancer-type-chips', map.cancer_types);

  const sex = document.getElementById('sex');
  if (sex) {
    const opts = { '': rcLanguage==='es'?'Seleccionar…':'Select…', male: rcLanguage==='es'?'Masculino':'Male', female: rcLanguage==='es'?'Femenino':'Female' };
    sex.querySelectorAll('option').forEach(o => { if (opts[o.value]!==undefined) o.textContent=opts[o.value]; });
  }

  const toggleMap = RC_TOGGLE_TEXT[rcLanguage] || RC_TOGGLE_TEXT.en;
  Object.entries(toggleMap).forEach(([id, label]) => {
    const input = document.getElementById(id);
    if (!input) return;
    const row = input.closest('.toggle-row');
    const node = row ? row.querySelector('.toggle-label') : null;
    if (node) node.textContent = label;
  });
}

function rcApplyLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = rcT(key);
  });
  const title = document.getElementById('rcTitle');
  if (title) title.innerHTML = `${rcT('titleMain')}<br><em>${rcT('titleSub')}</em>`;
  const intro = document.getElementById('rcIntro');
  if (intro) intro.textContent = rcT('introText');
  rcApplyChoiceTexts();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.getAttribute('data-lang') === rcLanguage;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

window.rcSetLanguage = function(lang) {
  rcLanguage = lang === 'es' ? 'es' : 'en';
  localStorage.setItem(RC_LANGUAGE_KEY, rcLanguage);
  rcApplyLanguage();
  if (window.__lastRiskData) displayResults(window.__lastRiskData);
};

// ── SEX → grey-out inapplicable cancer type chips ─────────────────────────
function updateCancerChipAvailability() {
  const sex = state.sex;
  document.querySelectorAll('#cancer-type-chips .chip[data-sex]').forEach(chip => {
    const chipSex = chip.getAttribute('data-sex');
    if (sex && chipSex && chipSex !== sex) {
      chip.classList.add('na');
      chip.classList.remove('selected');
      // remove from selected list if sex changed
      const val = chip.dataset.val;
      state.selected_cancer_types = state.selected_cancer_types.filter(t => t !== val);
    } else {
      chip.classList.remove('na');
    }
  });
}

// ── PROGRESS ───────────────────────────────────────────────────────────────
function pct(keys) {
  return keys.filter(k => state[k] !== null && state[k] !== '').length / keys.length;
}
function updateProgress() {
  const demoPct      = pct(DEMO_KEYS);
  const lifestylePct = pct(LIFESTYLE_KEYS);
  const overall      = Math.round(pct(REQUIRED) * 100);
  document.getElementById('progressPct').textContent = overall + '%';
  document.getElementById('fill-1').style.height = (demoPct * 100) + '%';
  document.getElementById('fill-2').style.height = (demoPct === 1 ? lifestylePct * 100 : 0) + '%';
  document.getElementById('fill-3').style.height = (lifestylePct === 1 ? 50 : 0) + '%';
  setDot('dot-demographics',  demoPct === 1,  demoPct > 0 && demoPct < 1);
  setDot('dot-lifestyle',     lifestylePct === 1 && demoPct === 1, demoPct === 1 && lifestylePct < 1);
  setDot('dot-medical',       false, lifestylePct === 1);
  setDot('dot-environmental', false, lifestylePct === 1);
}
function setDot(id, done, active) {
  const el = document.getElementById(id);
  el.classList.toggle('done', done);
  el.classList.toggle('active', !done && active);
}
function showSidebar() {
  document.getElementById('progressSidebar').classList.add('visible');
}

// Dot-click scrolls to section
[
  ['wrap-demographics',  'section-demographics'],
  ['wrap-lifestyle',     'section-lifestyle'],
  ['wrap-medical',       'section-medical'],
  ['wrap-environmental', 'section-environmental'],
].forEach(([wrapId, sectionId]) => {
  document.getElementById(wrapId).addEventListener('click', () => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── CHIP INIT (single-select) ──────────────────────────────────────────────
function initChips(containerId, stateKey) {
  document.getElementById(containerId).querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById(containerId).querySelectorAll('.chip')
        .forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      state[stateKey] = chip.dataset.val;
      showSidebar();
      updateProgress();
    });
  });
}

// ── CANCER TYPE CHIPS (multi-select) ──────────────────────────────────────
function initCancerTypeChips() {
  document.getElementById('cancer-type-chips').querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (chip.classList.contains('na')) return;
      chip.classList.toggle('selected');
      const val = chip.dataset.val;
      if (chip.classList.contains('selected')) {
        if (!state.selected_cancer_types.includes(val)) state.selected_cancer_types.push(val);
      } else {
        state.selected_cancer_types = state.selected_cancer_types.filter(t => t !== val);
      }
    });
  });
}

// ── VALIDATE ───────────────────────────────────────────────────────────────
function validate() {
  const missing = REQUIRED.filter(k => !state[k]);
  if (missing.length > 0) {
    alert(`${rcT('validatePrefix')}: ${missing.join(', ')}`);
    return false;
  }
  return true;
}

// ── PREDICT ────────────────────────────────────────────────────────────────
window.predictRisk = async function() {
  if (!validate()) return;

  const resultsCard = document.getElementById('results');
  resultsCard.classList.remove('results-hidden');
  resultsCard.innerHTML = `<div class="ai-loading"><div class="dots"><span></span><span></span><span></span></div> ${rcT('loading')}</div>`;
  resultsCard.scrollIntoView({ behavior: 'smooth' });

  ['dot-demographics','dot-lifestyle','dot-medical','dot-environmental'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('active'); el.classList.add('done');
  });
  ['fill-1','fill-2','fill-3'].forEach(id => {
    document.getElementById(id).style.height = '100%';
  });
  document.getElementById('progressPct').textContent = '100%';

  try {
    const payload = {
      age: state.age, sex: state.sex, race: state.race,
      smoking_status: state.smoking_status, pack_years: state.pack_years,
      bmi_category: state.bmi_category, alcohol_consumption: state.alcohol_consumption,
      physical_activity: state.physical_activity, diet_quality: state.diet_quality,
      family_history: state.family_history, diabetes: state.diabetes, hepatitis: state.hepatitis,
      hpv: state.hpv, h_pylori: state.h_pylori, ibd: state.ibd,
      radiation_history: state.radiation_history, immunosuppression: state.immunosuppression,
      precancerous_lesions: state.precancerous_lesions,
      occupational_exposure: state.occupational_exposure, uv_exposure: state.uv_exposure,
      // Only send selected_cancer_types if at least one type chosen
      ...(state.selected_cancer_types.length > 0
          ? { selected_cancer_types: state.selected_cancer_types }
          : {})
    };

    const res = await fetch(`${pythonURI}/api/cancer-risk/predict`, {
      ...fetchOptions,
      method: 'POST',
      headers: { ...(fetchOptions.headers || {}), 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || res.statusText);
    }

    displayResults(await res.json());

  } catch(e) {
    resultsCard.innerHTML = `<div class="card-sub" style="color:var(--terracotta);padding:20px">
      ${rcT('errorPrefix')}: ${e.message}. ${rcT('errorHelp')}
    </div>`;
  }
};

// ── DISPLAY RESULTS ────────────────────────────────────────────────────────
function displayResults(data) {
  window.__lastRiskData = data;
  const resultsCard = document.getElementById('results');
  const isHigh  = data.risk_category === 'high';
  const prob    = isHigh ? data.high_risk_probability : data.low_risk_probability;
  const color   = isHigh ? 'var(--terracotta)' : 'var(--sage)';

  resultsCard.innerHTML = `
    <div class="card-title">${rcT('resultTitle')}</div>
    <div class="card-sub">${rcT('resultSub')}</div>

    <!-- ── HERO: overall relative risk multiplier ── -->
    <div class="risk-hero">
      <div class="risk-number" style="color:${color}">
        ${data.overall_relative_risk.toFixed(1)}<span style="font-size:.38em;vertical-align:middle;opacity:.6">×</span>
      </div>
      <div class="risk-category-label" style="color:${color}">
        ${data.risk_category === 'high' ? rcT('highRisk') : rcT('lowRisk')}
      </div>
      <div class="risk-badge ${data.risk_category}">
        ${isHigh ? rcT('highBadge') : rcT('lowBadge')}
      </div>
      <div class="gauge-wrap">
        <div class="gauge-track"><div class="gauge-fill" id="gauge-fill"></div></div>
        <div class="gauge-labels"><span>${rcT('lowRisk')}</span><span>${rcT('highRisk')}</span></div>
      </div>
      <div class="confidence-note">
        ${rcT('rrExplain')}
      </div>
    </div>
    </div>

    <!-- ── CANCER TYPE BREAKDOWN (only if data exists) ── -->
    ${data.cancer_type_risks ? `
      <div style="font-family:var(--serif);font-size:18px;font-weight:600;margin-bottom:6px;color:var(--text-main)">${rcT('cancerTypeTitle')}</div>
      <div class="card-sub" style="margin-bottom:16px">${rcT('cancerTypeSub')}</div>
      <div class="ct-grid" id="ct-grid"></div>
    ` : ''}

    <!-- ── KEY RISK FACTORS ── -->
    <div style="font-family:var(--serif);font-size:18px;font-weight:600;margin-bottom:14px;color:var(--text-main)">${rcT('keyFactorsTitle')}</div>
    <div class="risk-factors-list" id="risk-factors-list"></div>

    <!-- ── FEATURE IMPORTANCE ── -->
    <div style="font-family:var(--serif);font-size:18px;font-weight:600;margin-bottom:14px;color:var(--text-main)">${rcT('importanceTitle')}</div>
    <div class="importance-grid" id="importance-grid"></div>

    <div class="source-note">
      <strong>${rcT('sourceModel')}:</strong> ${rcT('sourceBody')}
    </div>
  `;

  // Animate gauge — cap at 4× for display (4× avg = full bar)
  setTimeout(() => {
    const gf = document.getElementById('gauge-fill');
    const rrPct = Math.min(100, (data.overall_relative_risk / 4) * 100);
    gf.style.width = Math.max(4, rrPct) + '%';
    gf.style.background = color;
  }, 200);

  // Cancer type cards
  if (data.cancer_type_risks) {
    const grid = document.getElementById('ct-grid');
    const entries = Object.entries(data.cancer_type_risks);

    grid.innerHTML = entries.map(([ct, res]) => {
      if (!res.applicable) {
        return `
          <div class="ct-card">
            <div class="ct-card-label">${res.label}</div>
            <div class="ct-na">${rcT('naLabel')}</div>
            <div class="ct-note">${res.note}</div>
          </div>`;
      }

      // Cap bar at 80% lifetime risk for display
      const barPct = Math.min(100, (res.lifetime_risk_pct / 80) * 100);
      const rrColor = res.risk_level === 'high' ? 'var(--terracotta)'
                    : res.risk_level === 'moderate' ? '#d9a566'
                    : 'var(--sage)';

      return `
        <div class="ct-card">
          <div class="ct-card-label">${res.label}</div>
          <div class="ct-rr" style="color:${rrColor}" data-rr="${res.lifetime_risk_pct}">0.0</div>
          <div class="ct-rr-sub">${rcT('lifetimeRiskLabel')}</div>
          <div class="ct-level-bar">
            <div class="ct-level-fill ${res.risk_level}" style="width:0%" data-w="${barPct.toFixed(1)}"></div>
          </div>
          <div class="ct-badge ${res.risk_level}">${res.risk_level.toUpperCase()}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">
            ${res.relative_risk.toFixed(1)}× ${rcT('rrLabel')} &nbsp;·&nbsp; ${rcT('baselineLabel')}: ${res.baseline_risk_pct}%
          </div>
          ${res.key_factors.length > 0 ? `
            <div class="ct-factors">
              <strong style="font-size:10px;text-transform:uppercase;letter-spacing:.05em">${rcT('keyFactorsLabel')}:</strong>
              ${res.key_factors.join(' · ')}
            </div>` : ''}
          <div class="ct-note">${res.note}</div>
        </div>`;
    }).join('');

    // Animate RR counters and bars
    setTimeout(() => {
      grid.querySelectorAll('.ct-rr[data-rr]').forEach(el => {
        const target = parseFloat(el.dataset.rr);
        let start = null;
        const dur = 900;
        function step(ts) {
          if (!start) start = ts;
          const prog = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - prog, 3);
          el.textContent = (target * ease).toFixed(1) + '%';
          if (prog < 1) requestAnimationFrame(step);
          else el.textContent = target.toFixed(1) + '%';
        }
        requestAnimationFrame(step);
      });
      grid.querySelectorAll('.ct-level-fill[data-w]').forEach(el => {
        el.style.width = el.dataset.w + '%';
      });
    }, 300);
  }

  // Risk factors
  const rfList = document.getElementById('risk-factors-list');
  if (data.risk_factors?.length > 0) {
    rfList.innerHTML = data.risk_factors.map(rf => `
      <div class="risk-factor-item ${rf.impact}">
        <div class="rf-header">
          <div class="rf-name">${rf.factor}</div>
          <div class="rf-impact ${rf.impact}">${rf.impact}</div>
        </div>
        <div class="rf-detail">${rf.detail}</div>
      </div>
    `).join('');
  } else {
    rfList.innerHTML = `<div class="card-sub">${rcT('noFactors')}</div>`;
  }

  // Feature importance bars
  const impGrid = document.getElementById('importance-grid');
  const sorted = Object.entries(data.feature_importances)
    .sort((a,b) => b[1]-a[1]).slice(0, 8);

  impGrid.innerHTML = sorted.map(([feat, imp]) => `
    <div class="importance-row">
      <div class="importance-label">${feat.replace(/_/g,' ')}</div>
      <div class="importance-bar-track">
        <div class="importance-bar-fill" style="width:0%" data-w="${(imp*100).toFixed(0)}"></div>
      </div>
      <div class="importance-val">${(imp*100).toFixed(1)}%</div>
    </div>
  `).join('');

  setTimeout(() => {
    impGrid.querySelectorAll('.importance-bar-fill')
      .forEach(el => { el.style.width = el.dataset.w + '%'; });
  }, 300);
}

// ── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  rcApplyLanguage();

  document.getElementById('age').addEventListener('input', e => {
    state.age = parseInt(e.target.value) || null;
    showSidebar(); updateProgress();
  });
  document.getElementById('sex').addEventListener('change', e => {
    state.sex = e.target.value || null;
    showSidebar(); updateProgress();
    updateCancerChipAvailability();
  });
  document.getElementById('packYears').addEventListener('input', e => {
    state.pack_years = parseInt(e.target.value) || 0;
  });

  initChips('race-chips',     'race');
  initChips('smoke-chips',    'smoking_status');
  initChips('bmi-chips',      'bmi_category');
  initChips('alcohol-chips',  'alcohol_consumption');
  initChips('activity-chips', 'physical_activity');
  initChips('diet-chips',     'diet_quality');
  initCancerTypeChips();

  const checkboxMap = {
    familyHistory:'family_history', diabetes:'diabetes', hepatitis:'hepatitis',
    hpv:'hpv', hPylori:'h_pylori', ibd:'ibd',
    radiationHistory:'radiation_history', immunosuppression:'immunosuppression',
    precancerousLesions:'precancerous_lesions',
    occupationalExposure:'occupational_exposure', uvExposure:'uv_exposure'
  };
  Object.entries(checkboxMap).forEach(([elId, key]) => {
    document.getElementById(elId).addEventListener('change', e => {
      state[key] = e.target.checked;
      showSidebar(); updateProgress();
    });
  });

  // Pack-years visibility
  document.getElementById('smoke-chips').querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('pack-years-field').style.display =
        chip.dataset.val !== 'never' ? 'block' : 'none';
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) showSidebar();
  }, { passive: true });

  updateProgress();
});
</script>
</body>
</html>