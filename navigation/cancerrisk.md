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
    background: var(--cream); color: var(--text-main);
    font-family: var(--sans); font-size: 15px; line-height: 1.65;
    margin: 0; -webkit-font-smoothing: antialiased; min-height: 100vh;
  }

  /* ── SCROLL PROGRESS SIDEBAR ── */
  .progress-sidebar {
    position: fixed; left: 20px; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0;
    z-index: 100; opacity: 0; transition: opacity 0.4s ease;
  }
  .progress-sidebar.visible { opacity: 1; }
  .progress-pct { font-family: var(--serif); font-size: 13px; font-weight: 600; color: var(--rose); margin-bottom: 10px; }
  .progress-track { width: 3px; height: 52px; background: var(--tan-light); border-radius: 2px; position: relative; overflow: hidden; }
  .progress-fill { position: absolute; top: 0; left: 0; width: 100%; height: 0%; background: linear-gradient(to bottom, var(--rose-light), var(--rose)); border-radius: 2px; transition: height 0.4s cubic-bezier(.22,1,.36,1); }
  .progress-dot-wrap { position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 4px 0; }
  .progress-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--tan-light); border: 2px solid var(--warm-white); transition: background 0.3s ease, transform 0.25s ease, box-shadow 0.25s ease; z-index: 1; }
  .progress-dot.done  { background: var(--rose); }
  .progress-dot.active { background: var(--terracotta); transform: scale(1.35); box-shadow: 0 0 0 4px rgba(224,122,106,0.2); }
  .progress-dot-wrap .tip { position: absolute; left: 20px; background: var(--text-main); color: white; font-size: 10px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; padding: 4px 9px; border-radius: 6px; white-space: nowrap; pointer-events: none; opacity: 0; transition: opacity 0.15s; }
  .progress-dot-wrap:hover .tip { opacity: 1; }
  .progress-label { font-size: 9px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--text-muted); writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg); margin-top: 12px; opacity: 0.6; }
  @media(max-width: 880px) { .progress-sidebar { display: none; } }

  /* ── PAGE ── */
  .page { max-width: 900px; margin: 0 auto; padding: 48px 24px 80px; }
  .page-header { text-align: center; margin-bottom: 40px; }
  .page-header h1 { font-family: var(--serif); font-size: clamp(32px, 5vw, 52px); font-weight: 600; color: var(--text-main); line-height: 1.1; margin: 0 0 14px; }
  .page-header h1 em { font-style: italic; color: var(--rose); }
  .page-header p { color: var(--text-muted); max-width: 640px; margin: 0 auto; font-size: 14px; line-height: 1.75; }

  /* ── CARD ── */
  .card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 18px; padding: 36px 40px; margin-bottom: 20px; box-shadow: 0 4px 24px rgba(61,44,36,.05); }
  @media(max-width:520px){ .card { padding: 24px 20px; } }
  .card-title { font-family: var(--serif); font-size: 24px; font-weight: 600; color: var(--text-main); margin-bottom: 6px; }
  .card-sub { font-size: 13px; color: var(--text-muted); margin-bottom: 28px; line-height: 1.6; }

  /* ── SECTION HEADINGS ── */
  .section-heading { font-family: var(--serif); font-size: 20px; font-weight: 600; color: var(--text-main); margin: 36px 0 18px; padding-bottom: 10px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .section-heading:first-of-type { margin-top: 0; }
  .section-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--rose-pale); display: flex; align-items: center; justify-content: center; font-size: 15px; }

  /* ── FORM ELEMENTS ── */
  .field { margin-bottom: 22px; }
  .field:last-child { margin-bottom: 0; }
  .field label { display: block; font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; }
  .field select, .field input[type=number] { width: 100%; background: var(--cream); border: 1px solid var(--tan-light); border-radius: 10px; padding: 11px 14px; font-family: var(--sans); font-size: 14px; color: var(--text-main); outline: none; appearance: none; transition: border-color .2s; cursor: pointer; }
  .field select:focus, .field input[type=number]:focus { border-color: var(--rose); box-shadow: 0 0 0 3px rgba(224,122,106,.12); }
  .select-wrap { position: relative; }
  .select-wrap::after { content: '▾'; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--tan); pointer-events: none; font-size: 13px; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { padding: 7px 16px; border-radius: 20px; border: 1px solid var(--border-bright); background: var(--cream); font-family: var(--sans); font-size: 13px; color: var(--text-muted); cursor: pointer; transition: all .18s; user-select: none; }
  .chip:hover { border-color: var(--rose-light); color: var(--text-main); }
  .chip.selected { background: var(--rose); border-color: var(--rose); color: white; font-weight: 600; }
  .cancer-chips .chip.selected { background: var(--terracotta); border-color: var(--terracotta); }
  .cancer-chips .chip.na { opacity: .35; pointer-events: none; cursor: default; }
  .toggles-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
  @media(max-width: 600px) { .toggles-grid { grid-template-columns: 1fr; } }
  .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--border); }
  .toggle-row:last-child { border-bottom: none; }
  .toggle-label { font-size: 14px; color: var(--text-main); }
  .toggle { position: relative; width: 44px; height: 24px; flex-shrink: 0; margin-left: 16px; }
  .toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
  .toggle-track { position: absolute; inset: 0; background: var(--tan-light); border-radius: 12px; cursor: pointer; transition: background .2s; }
  .toggle-track::after { content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: white; border-radius: 50%; transition: transform .2s; box-shadow: 0 1px 4px rgba(0,0,0,.15); }
  .toggle input:checked + .toggle-track { background: var(--rose); }
  .toggle input:checked + .toggle-track::after { transform: translateX(20px); }
  .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media(max-width:520px){ .field-grid { grid-template-columns: 1fr; } }
  .btn-row { display: flex; gap: 12px; margin-top: 28px; justify-content: flex-end; }
  .btn { font-family: var(--sans); font-size: 14px; font-weight: 600; border-radius: 10px; padding: 11px 24px; cursor: pointer; border: none; transition: all .2s; }
  .btn-primary { background: var(--rose); color: white; }
  .btn-primary:hover { background: var(--terracotta); transform: translateY(-1px); }
  .btn-primary:disabled { background: var(--tan-light); color: var(--text-muted); transform: none; cursor: not-allowed; }
  .optional-note { font-size: 11px; color: var(--text-muted); margin-top: 8px; font-style: italic; }
  .results-hidden { display: none; }

  /* ── HERO — the 1.8× multiplier ── */
  .risk-hero {
    text-align: center;
    padding: 32px 0 24px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 28px;
  }

  /* ×label above the number */
  .rr-eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  /* The big ×multiplier */
  .rr-number {
    font-family: var(--serif);
    font-size: clamp(78px, 15vw, 118px);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.02em;
    transition: color .3s;
    margin-bottom: 6px;
  }
  .rr-number sup {
    font-size: .32em;
    vertical-align: top;
    margin-top: .18em;
    opacity: .7;
    font-weight: 400;
    font-style: italic;
  }

  /* Subtitle: "times the population average" */
  .rr-subtitle {
    font-family: var(--serif);
    font-size: clamp(15px, 2.5vw, 20px);
    color: var(--text-muted);
    font-style: italic;
    margin-bottom: 18px;
  }

  /* Badge: above / at / below average */
  .rr-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 20px; border-radius: 20px;
    font-size: 12px; font-weight: 700;
    letter-spacing: .06em; text-transform: uppercase;
    margin-bottom: 20px;
  }
  .rr-badge.above   { background: var(--rose-pale);  color: var(--terracotta); }
  .rr-badge.at      { background: #fff3e0;            color: #9b6a00; }
  .rr-badge.below   { background: var(--sage-pale);   color: #4a7a4c; }

  /* gauge */
  .gauge-wrap { margin: 0 auto 8px; max-width: 480px; }
  .gauge-track { height: 8px; background: var(--tan-light); border-radius: 4px; overflow: hidden; margin-bottom: 6px; }
  .gauge-fill { height: 100%; border-radius: 4px; width: 0; transition: width 1s cubic-bezier(.22,1,.36,1); }
  .gauge-labels { display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); letter-spacing: .05em; text-transform: uppercase; }

  /* Key: 1.0× line marker */
  .gauge-marker-row { position: relative; height: 0; margin: -6px 0 0; max-width: 480px; margin-left: auto; margin-right: auto; }
  .gauge-marker {
    position: absolute;
    width: 2px; height: 14px;
    background: var(--text-muted);
    top: -8px;
    /* 1.0× sits at 25% of the 4× scale */
    left: 25%;
    transform: translateX(-50%);
  }
  .gauge-marker::after {
    content: '1.0×';
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 9px;
    color: var(--text-muted);
    white-space: nowrap;
    letter-spacing: .04em;
  }

  /* explanation callout */
  .rr-explain {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.7;
    max-width: 520px;
    margin: 14px auto 0;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    text-align: left;
  }
  .rr-explain strong { color: var(--text-main); }

  /* ── RISK FACTORS ── */
  .risk-factors-list { margin-bottom: 28px; }
  .risk-factor-item { padding: 14px 16px; background: var(--cream); border-radius: 10px; margin-bottom: 10px; border-left: 3px solid var(--tan-light); }
  .risk-factor-item.high { border-left-color: var(--terracotta); }
  .risk-factor-item.moderate { border-left-color: #d9a566; }
  .rf-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
  .rf-name { font-size: 14px; font-weight: 600; color: var(--text-main); }
  .rf-impact { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 3px 10px; border-radius: 12px; }
  .rf-impact.high { background: var(--rose-pale); color: var(--terracotta); }
  .rf-impact.moderate { background: #fff3e0; color: #9b6a00; }
  .rf-detail { font-size: 12px; color: var(--text-muted); line-height: 1.6; }

  /* ── FEATURE IMPORTANCE ── */
  .importance-grid { display: grid; gap: 10px; margin-bottom: 24px; }
  .importance-row { display: flex; align-items: center; gap: 12px; }
  .importance-label { min-width: 160px; font-size: 12px; color: var(--text-muted); }
  .importance-bar-track { flex: 1; height: 6px; background: var(--tan-light); border-radius: 3px; overflow: hidden; }
  .importance-bar-fill { height: 100%; background: var(--rose); border-radius: 3px; transition: width 1s cubic-bezier(.22,1,.36,1); }
  .importance-val { font-size: 12px; font-weight: 600; min-width: 40px; text-align: right; color: var(--text-main); }

  /* ── CANCER TYPE CARDS ── */
  .ct-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; margin-bottom: 28px; }
  .ct-card { background: var(--cream); border: 1px solid var(--border); border-radius: 14px; padding: 16px 18px; transition: box-shadow .2s; }
  .ct-card:hover { box-shadow: 0 4px 16px rgba(61,44,36,.08); }
  .ct-card-label { font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; }

  /* Lifetime risk % — the main number per card */
  .ct-lifetime {
    font-family: var(--serif);
    font-size: 36px;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 2px;
  }
  .ct-lifetime-sub { font-size: 10px; color: var(--text-muted); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 4px; }

  /* relative risk shown smaller below */
  .ct-rr-line { font-size: 11px; color: var(--text-muted); margin-bottom: 10px; }
  .ct-rr-line strong { color: var(--text-main); }

  .ct-level-bar { height: 4px; border-radius: 2px; background: var(--tan-light); overflow: hidden; margin-bottom: 10px; }
  .ct-level-fill { height: 100%; border-radius: 2px; transition: width 1s cubic-bezier(.22,1,.36,1); }
  .ct-level-fill.low      { background: var(--sage); }
  .ct-level-fill.moderate { background: #d9a566; }
  .ct-level-fill.high     { background: var(--terracotta); }
  .ct-badge { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; padding: 3px 10px; border-radius: 10px; margin-bottom: 8px; }
  .ct-badge.low      { background: var(--sage-pale); color: #4a7a4c; }
  .ct-badge.moderate { background: #fff3e0; color: #9b6a00; }
  .ct-badge.high     { background: var(--rose-pale); color: var(--terracotta); }
  .ct-factors { font-size: 11px; color: var(--text-muted); line-height: 1.55; margin-top: 6px; }
  .ct-note { font-size: 11px; color: var(--text-muted); font-style: italic; margin-top: 6px; line-height: 1.5; border-top: 1px solid var(--border); padding-top: 6px; }
  .ct-na { opacity: .5; font-size: 12px; color: var(--text-muted); margin-top: 4px; }

  /* ── LOADING ── */
  .ai-loading { display: flex; align-items: center; justify-content: center; gap: 10px; color: var(--text-muted); font-size: 13px; padding: 40px 20px; }
  .dots span { display: inline-block; width: 6px; height: 6px; background: var(--rose); border-radius: 50%; animation: pulse 1.2s ease-in-out infinite; }
  .dots span:nth-child(2) { animation-delay: .2s; }
  .dots span:nth-child(3) { animation-delay: .4s; }
  @keyframes pulse { 0%, 100% { opacity: .3; transform: scale(.8); } 50% { opacity: 1; transform: scale(1); } }

  .source-note { font-size: 11px; color: var(--text-muted); text-align: center; line-height: 1.6; margin-top: 8px; padding: 16px; border-top: 1px solid var(--border); }
  .source-note strong { color: var(--text-main); }

  /* section sub-headers inside results */
  .res-section-title { font-family: var(--serif); font-size: 18px; font-weight: 600; color: var(--text-main); margin: 28px 0 14px; }
</style>
</head>
<body>

<!-- ── SCROLL PROGRESS SIDEBAR ── -->
<nav class="progress-sidebar" id="progressSidebar" aria-label="Form completion progress">
  <div class="progress-pct" id="progressPct">0%</div>
  <div class="progress-dot-wrap" id="wrap-demographics">
    <div class="progress-dot active" id="dot-demographics"></div>
    <span class="tip">Demographics</span>
  </div>
  <div class="progress-track"><div class="progress-fill" id="fill-1"></div></div>
  <div class="progress-dot-wrap" id="wrap-lifestyle">
    <div class="progress-dot" id="dot-lifestyle"></div>
    <span class="tip">Lifestyle</span>
  </div>
  <div class="progress-track"><div class="progress-fill" id="fill-2"></div></div>
  <div class="progress-dot-wrap" id="wrap-medical">
    <div class="progress-dot" id="dot-medical"></div>
    <span class="tip">Medical History</span>
  </div>
  <div class="progress-track"><div class="progress-fill" id="fill-3"></div></div>
  <div class="progress-dot-wrap" id="wrap-environmental">
    <div class="progress-dot" id="dot-environmental"></div>
    <span class="tip">Environmental</span>
  </div>
  <div class="progress-label">Progress</div>
</nav>

<div class="page">
  <div class="page-header">
    <h1>Cancer Risk<br><em>ML Predictor</em></h1>
    <p>Answer questions about your demographics, lifestyle, and medical history. Our machine learning model — trained on ACS Cancer Facts &amp; Figures 2026 epidemiological data — predicts your relative cancer risk compared to the average US population.</p>
  </div>

  <div class="card">

    <!-- SECTION 1: DEMOGRAPHICS -->
    <div class="section-heading" id="section-demographics">
      <span class="section-icon">👤</span><span>Demographics</span>
    </div>
    <div class="field-grid">
      <div class="field">
        <label>Age</label>
        <input type="number" id="age" min="18" max="100" placeholder="e.g. 55">
      </div>
      <div class="field">
        <label>Biological Sex</label>
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
      <label>Race / Ethnicity</label>
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
      <span class="section-icon">🌿</span><span>Lifestyle Factors</span>
    </div>
    <div class="field">
      <label>Smoking Status</label>
      <div class="chips" id="smoke-chips">
        <div class="chip" data-val="never">Never smoked</div>
        <div class="chip" data-val="former">Former smoker</div>
        <div class="chip" data-val="current">Current smoker</div>
      </div>
    </div>
    <div class="field" id="pack-years-field" style="display:none">
      <label>Pack-Years (packs/day × years smoked)</label>
      <input type="number" id="packYears" min="0" max="200" placeholder="e.g. 20" value="0">
    </div>
    <div class="field">
      <label>BMI Category</label>
      <div class="chips" id="bmi-chips">
        <div class="chip" data-val="normal">Normal (18.5–24.9)</div>
        <div class="chip" data-val="overweight">Overweight (25–29.9)</div>
        <div class="chip" data-val="obese">Obese (30–39.9)</div>
        <div class="chip" data-val="severely-obese">Severely Obese (40+)</div>
      </div>
    </div>
    <div class="field">
      <label>Alcohol Consumption</label>
      <div class="chips" id="alcohol-chips">
        <div class="chip" data-val="none">None</div>
        <div class="chip" data-val="light">Light (1–7 drinks/wk)</div>
        <div class="chip" data-val="moderate">Moderate (8–14/wk)</div>
        <div class="chip" data-val="heavy">Heavy (15+/wk)</div>
      </div>
    </div>
    <div class="field">
      <label>Physical Activity</label>
      <div class="chips" id="activity-chips">
        <div class="chip" data-val="sedentary">Sedentary / low activity</div>
        <div class="chip" data-val="moderate">Moderately active</div>
        <div class="chip" data-val="active">Active (150+ min/wk)</div>
      </div>
    </div>
    <div class="field">
      <label>Diet Quality</label>
      <div class="chips" id="diet-chips">
        <div class="chip" data-val="poor">Poor (high red/processed meat)</div>
        <div class="chip" data-val="average">Average</div>
        <div class="chip" data-val="healthy">Healthy (high fruit/veg/fiber)</div>
      </div>
    </div>

    <!-- SECTION 3: MEDICAL HISTORY -->
    <div class="section-heading" id="section-medical">
      <span class="section-icon">⚕</span><span>Medical History</span>
    </div>
    <p class="card-sub" style="margin-top:-10px;margin-bottom:16px">Toggle any conditions that apply to you</p>
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
      <span class="section-icon">☀</span><span>Environmental Exposures</span>
    </div>
    <p class="card-sub" style="margin-top:-10px;margin-bottom:16px">Toggle any exposures that apply to you</p>
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

    <!-- SECTION 5: CANCER TYPES -->
    <div class="section-heading" id="section-cancertypes">
      <span class="section-icon">⚲</span><span>Cancer Types of Interest</span>
    </div>
    <p class="card-sub" style="margin-top:-10px;margin-bottom:8px">Select specific cancers to get individual lifetime risk estimates</p>
    <p class="optional-note">Optional: leave unselected for overall relative risk only</p>
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
      <button class="btn btn-primary" id="predictBtn" onclick="predictRisk()">Predict My Risk →</button>
    </div>
  </div>

  <!-- RESULTS -->
  <div class="card results-hidden" id="results"></div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

// ── STATE ─────────────────────────────────────────────────────────────────
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
  selected_cancer_types: []
};

const REQUIRED = ['age','sex','race','smoking_status','bmi_category',
                  'alcohol_consumption','physical_activity','diet_quality'];
const DEMO_KEYS      = ['age','sex','race'];
const LIFESTYLE_KEYS = ['smoking_status','bmi_category','alcohol_consumption','physical_activity','diet_quality'];

// ── HELPERS ────────────────────────────────────────────────────────────────
function pct(keys) {
  return keys.filter(k => state[k] !== null && state[k] !== '').length / keys.length;
}

function rrColor(rr) {
  if (rr < 0.85) return 'var(--sage)';
  if (rr < 1.25) return 'var(--tan)';
  if (rr < 2.0)  return 'var(--rose)';
  return 'var(--terracotta)';
}

function rrBadgeClass(rr) {
  if (rr < 0.9) return 'below';
  if (rr < 1.2) return 'at';
  return 'above';
}

function rrBadgeText(rr) {
  if (rr < 0.9)  return `↓ ${((1 - rr) * 100).toFixed(0)}% below population average`;
  if (rr < 1.2)  return '≈ Near population average';
  return `↑ ${((rr - 1) * 100).toFixed(0)}% above population average`;
}

// ── PROGRESS ───────────────────────────────────────────────────────────────
function updateProgress() {
  const demoPct      = pct(DEMO_KEYS);
  const lifestylePct = pct(LIFESTYLE_KEYS);
  const overall      = Math.round(pct(REQUIRED) * 100);
  document.getElementById('progressPct').textContent = overall + '%';
  document.getElementById('fill-1').style.height = (demoPct * 100) + '%';
  document.getElementById('fill-2').style.height = (demoPct === 1 ? lifestylePct * 100 : 0) + '%';
  document.getElementById('fill-3').style.height = (lifestylePct === 1 ? 50 : 0) + '%';
  setDot('dot-demographics', demoPct === 1, demoPct > 0 && demoPct < 1);
  setDot('dot-lifestyle', lifestylePct === 1 && demoPct === 1, demoPct === 1 && lifestylePct < 1);
  setDot('dot-medical', false, lifestylePct === 1);
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

[
  ['wrap-demographics','section-demographics'],
  ['wrap-lifestyle','section-lifestyle'],
  ['wrap-medical','section-medical'],
  ['wrap-environmental','section-environmental'],
].forEach(([wrapId, sectionId]) => {
  document.getElementById(wrapId).addEventListener('click', () => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── CHIP INIT ─────────────────────────────────────────────────────────────
function initChips(containerId, stateKey) {
  document.getElementById(containerId).querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById(containerId).querySelectorAll('.chip')
        .forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      state[stateKey] = chip.dataset.val;
      showSidebar(); updateProgress();
    });
  });
}

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

function updateCancerChipAvailability() {
  const sex = state.sex;
  document.querySelectorAll('#cancer-type-chips .chip[data-sex]').forEach(chip => {
    const chipSex = chip.getAttribute('data-sex');
    if (sex && chipSex && chipSex !== sex) {
      chip.classList.add('na');
      chip.classList.remove('selected');
      state.selected_cancer_types = state.selected_cancer_types.filter(t => t !== chip.dataset.val);
    } else {
      chip.classList.remove('na');
    }
  });
}

// ── VALIDATE ──────────────────────────────────────────────────────────────
function validate() {
  const missing = REQUIRED.filter(k => !state[k]);
  if (missing.length > 0) {
    alert(`Please fill in: ${missing.map(k => k.replace(/_/g,' ')).join(', ')}`);
    return false;
  }
  return true;
}

// ── PREDICT ───────────────────────────────────────────────────────────────
window.predictRisk = async function() {
  if (!validate()) return;

  const resultsCard = document.getElementById('results');
  resultsCard.classList.remove('results-hidden');
  resultsCard.innerHTML = `<div class="ai-loading"><div class="dots"><span></span><span></span><span></span></div> Running ML prediction…</div>`;
  resultsCard.scrollIntoView({ behavior: 'smooth' });

  // Complete the progress sidebar
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
      family_history: state.family_history, diabetes: state.diabetes,
      hepatitis: state.hepatitis, hpv: state.hpv, h_pylori: state.h_pylori,
      ibd: state.ibd, radiation_history: state.radiation_history,
      immunosuppression: state.immunosuppression,
      precancerous_lesions: state.precancerous_lesions,
      occupational_exposure: state.occupational_exposure, uv_exposure: state.uv_exposure,
      ...(state.selected_cancer_types.length > 0
          ? { selected_cancer_types: state.selected_cancer_types } : {})
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
      Error: ${e.message}. Make sure you are logged in and the backend is running.
    </div>`;
  }
};

// ── DISPLAY RESULTS ────────────────────────────────────────────────────────
function displayResults(data) {
  const rr    = data.overall_relative_risk;
  const color = rrColor(rr);
  const badgeClass = rrBadgeClass(rr);
  const badgeText  = rrBadgeText(rr);

  // Gauge: 1.0× sits at 25%, 4× is 100%
  const gaugePct = Math.min(100, Math.max(4, (rr / 4) * 100));

  const resultsCard = document.getElementById('results');
  resultsCard.innerHTML = `
    <div class="card-title">Your ML Risk Prediction</div>
    <div class="card-sub">Based on machine learning analysis of your profile</div>

    <!-- ── HERO: relative risk multiplier ── -->
    <div class="risk-hero">

      <div class="rr-eyebrow">Overall Relative Cancer Risk</div>

      <div class="rr-number" style="color:${color}">
        ${rr.toFixed(1)}<sup>×</sup>
      </div>

      <div class="rr-subtitle">times the average US population risk</div>

      <div class="rr-badge ${badgeClass}">${badgeText}</div>

      <div class="gauge-wrap">
        <div class="gauge-track">
          <div class="gauge-fill" id="gauge-fill"></div>
        </div>
        <div class="gauge-marker-row">
          <div class="gauge-marker"></div>
        </div>
        <br>
        <div class="gauge-labels">
          <span>0.5× (half average)</span>
          <span style="font-weight:600;color:var(--text-main)">1.0× average</span>
          <span>4× (very elevated)</span>
        </div>
      </div>

      <div class="rr-explain">
        <strong>How to read this:</strong> 1.0× means exactly the same risk as the average American.
        Your score of <strong>${rr.toFixed(1)}×</strong> means your overall cancer risk is estimated at
        <strong>${rr.toFixed(1)} times</strong> the population baseline based on your profile —
        ${rr > 1 ? 'higher' : 'lower'} than average, driven by the factors listed below.
        <br><br>
        The individual cancer cards below show separate <strong>lifetime risk %</strong> estimates
        for each specific cancer type — these are different numbers and are independent of the ×multiplier above.
      </div>
    </div>

    <!-- ── CANCER TYPE BREAKDOWN ── -->
    ${data.cancer_type_risks ? `
      <div class="res-section-title">Cancer-Type Risk Breakdown</div>
      <p class="card-sub" style="margin-top:-8px;margin-bottom:16px">
        Estimated <strong>lifetime risk %</strong> for each cancer type based on your profile vs. the US population baseline.
        Each card is independent — prostate cancer at 75% lifetime risk means 1 in 1.3 men with your profile are
        expected to develop it over a lifetime, not that you will definitely get it.
      </p>
      <div class="ct-grid" id="ct-grid"></div>
    ` : ''}

    <!-- ── KEY RISK FACTORS ── -->
    <div class="res-section-title">Your Key Risk Factors</div>
    <div class="risk-factors-list" id="risk-factors-list"></div>

    <!-- ── FEATURE IMPORTANCE ── -->
    <div class="res-section-title">Feature Importance (Decision Tree)</div>
    <p class="card-sub" style="margin-top:-8px;margin-bottom:16px">
      Which inputs had the most influence on the ML model's prediction for your profile.
    </p>
    <div class="importance-grid" id="importance-grid"></div>

    <div class="source-note">
      <strong>Model:</strong> Ensemble ML (Logistic Regression + Random Forest + Decision Tree)
      trained on synthetic data calibrated to ACS Cancer Facts &amp; Figures 2026 epidemiological rates.
      For educational purposes only — not medical advice. Consult a healthcare provider for
      personalized screening recommendations.
    </div>
  `;

  // Animate gauge
  setTimeout(() => {
    const gf = document.getElementById('gauge-fill');
    gf.style.width = gaugePct + '%';
    gf.style.background = color;
  }, 200);

  // Cancer type cards
  if (data.cancer_type_risks) {
    const grid = document.getElementById('ct-grid');
    grid.innerHTML = Object.entries(data.cancer_type_risks).map(([ct, res]) => {
      if (!res.applicable) {
        return `
          <div class="ct-card">
            <div class="ct-card-label">${res.label}</div>
            <div class="ct-na">Not applicable for your biological sex</div>
            <div class="ct-note">${res.note}</div>
          </div>`;
      }
      const barPct = Math.min(100, (res.lifetime_risk_pct / 80) * 100);
      const levelColor = res.risk_level === 'high' ? 'var(--terracotta)'
                       : res.risk_level === 'moderate' ? '#d9a566' : 'var(--sage)';
      return `
        <div class="ct-card">
          <div class="ct-card-label">${res.label}</div>
          <div class="ct-lifetime" style="color:${levelColor}" data-target="${res.lifetime_risk_pct}">0.0%</div>
          <div class="ct-lifetime-sub">estimated lifetime risk</div>
          <div class="ct-rr-line">
            <strong>${res.relative_risk.toFixed(1)}×</strong> population average
            &nbsp;·&nbsp; baseline: ${res.baseline_risk_pct}%
          </div>
          <div class="ct-level-bar">
            <div class="ct-level-fill ${res.risk_level}" style="width:0%" data-w="${barPct.toFixed(1)}"></div>
          </div>
          <div class="ct-badge ${res.risk_level}">${res.risk_level}</div>
          ${res.key_factors.length > 0 ? `
            <div class="ct-factors">
              <strong style="font-size:10px;text-transform:uppercase;letter-spacing:.05em">Contributing factors:</strong>
              ${res.key_factors.join(' · ')}
            </div>` : ''}
          <div class="ct-note">${res.note}</div>
        </div>`;
    }).join('');

    // Animate numbers and bars
    setTimeout(() => {
      grid.querySelectorAll('.ct-lifetime[data-target]').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const dur = 900; let start = null;
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
    rfList.innerHTML = '<div class="card-sub">No significant modifiable risk factors identified. Keep up healthy lifestyle habits!</div>';
  }

  // Feature importance
  const impGrid = document.getElementById('importance-grid');
  const sorted = Object.entries(data.feature_importances).sort((a,b) => b[1]-a[1]).slice(0, 8);
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
    impGrid.querySelectorAll('.importance-bar-fill').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }, 300);
}

// ── INIT ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
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