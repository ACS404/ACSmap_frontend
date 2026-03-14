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

  .page {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* ── HEADER ── */
  .page-header {
    text-align: center;
    margin-bottom: 40px;
  }
  .eyebrow {
    font-family: var(--sans);
    font-size: 11px;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--rose);
    font-weight: 600;
    margin-bottom: 12px;
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

  /* ── FORM ── */
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
  .field input[type=number]:focus { border-color: var(--rose); box-shadow: 0 0 0 3px rgba(224,122,106,.12); }

  .select-wrap {
    position: relative;
  }
  .select-wrap::after {
    content: '▾';
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--tan);
    pointer-events: none;
    font-size: 13px;
  }

  /* chips */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
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
    background: var(--rose);
    border-color: var(--rose);
    color: white;
    font-weight: 600;
  }

  /* toggle */
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 0;
    border-bottom: 1px solid var(--border);
  }
  .toggle-row:last-child { border-bottom: none; }
  .toggle-label { font-size: 14px; color: var(--text-main); }
  .toggle-note { font-size: 12px; color: var(--text-muted); }

  .toggle {
    position: relative;
    width: 44px;
    height: 24px;
    flex-shrink: 0;
    margin-left: 16px;
  }
  .toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
  .toggle-track {
    position: absolute; inset: 0;
    background: var(--tan-light);
    border-radius: 12px;
    cursor: pointer;
    transition: background .2s;
  }
  .toggle-track::after {
    content: '';
    position: absolute;
    top: 3px; left: 3px;
    width: 18px; height: 18px;
    background: white;
    border-radius: 50%;
    transition: transform .2s;
    box-shadow: 0 1px 4px rgba(0,0,0,.15);
  }
  .toggle input:checked + .toggle-track { background: var(--rose); }
  .toggle input:checked + .toggle-track::after { transform: translateX(20px); }

  .field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media(max-width:520px){ .field-grid { grid-template-columns: 1fr; } }

  /* ── BUTTONS ── */
  .btn-row {
    display: flex;
    gap: 12px;
    margin-top: 28px;
    justify-content: flex-end;
  }
  .btn {
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 600;
    border-radius: 10px;
    padding: 11px 24px;
    cursor: pointer;
    border: none;
    transition: all .2s;
  }
  .btn-primary {
    background: var(--rose);
    color: white;
  }
  .btn-primary:hover { background: var(--terracotta); transform: translateY(-1px); }
  .btn-primary:disabled { background: var(--tan-light); color: var(--text-muted); transform: none; cursor: not-allowed; }

  /* ── RESULTS ── */
  .results-hidden { display: none; }

  .risk-hero {
    text-align: center;
    padding: 28px 0 20px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 28px;
  }
  .risk-category-label {
    font-family: var(--serif);
    font-size: 13px;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }
  .risk-number {
    font-family: var(--serif);
    font-size: clamp(52px, 10vw, 80px);
    font-weight: 600;
    line-height: 1;
    margin-bottom: 6px;
    transition: color .3s;
  }
  .risk-label {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }
  .risk-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
  }
  .risk-badge.low { background: var(--sage-pale); color: #4a7a4c; }
  .risk-badge.high { background: var(--rose-pale); color: var(--terracotta); }

  /* gauge */
  .gauge-wrap { margin: 20px 0 8px; }
  .gauge-track {
    height: 8px;
    background: var(--tan-light);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 6px;
  }
  .gauge-fill {
    height: 100%;
    border-radius: 4px;
    width: 0;
    transition: width 1s cubic-bezier(.22,1,.36,1);
  }
  .gauge-labels {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: .05em;
    text-transform: uppercase;
  }

  /* risk factors list */
  .risk-factors-list {
    margin-bottom: 28px;
  }
  .risk-factor-item {
    padding: 14px 16px;
    background: var(--cream);
    border-radius: 10px;
    margin-bottom: 10px;
    border-left: 3px solid var(--tan-light);
  }
  .risk-factor-item.high { border-left-color: var(--terracotta); }
  .risk-factor-item.moderate { border-left-color: #d9a566; }
  .rf-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  .rf-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-main);
  }
  .rf-impact {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 12px;
  }
  .rf-impact.high { background: var(--rose-pale); color: var(--terracotta); }
  .rf-impact.moderate { background: #fff3e0; color: #9b6a00; }
  .rf-detail {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* feature importances */
  .importance-grid {
    display: grid;
    gap: 10px;
    margin-bottom: 24px;
  }
  .importance-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .importance-label {
    min-width: 140px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .importance-bar-track {
    flex: 1;
    height: 6px;
    background: var(--tan-light);
    border-radius: 3px;
    overflow: hidden;
  }
  .importance-bar-fill {
    height: 100%;
    background: var(--rose);
    border-radius: 3px;
    transition: width 1s cubic-bezier(.22,1,.36,1);
  }
  .importance-val {
    font-size: 12px;
    font-weight: 600;
    min-width: 40px;
    text-align: right;
    color: var(--text-main);
  }

  /* loading */
  .ai-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: var(--text-muted);
    font-size: 13px;
    padding: 40px 20px;
  }
  .dots span {
    display: inline-block;
    width: 6px; height: 6px;
    background: var(--rose);
    border-radius: 50%;
    animation: pulse 1.2s ease-in-out infinite;
  }
  .dots span:nth-child(2) { animation-delay: .2s; }
  .dots span:nth-child(3) { animation-delay: .4s; }
  @keyframes pulse {
    0%, 100% { opacity: .3; transform: scale(.8); }
    50% { opacity: 1; transform: scale(1); }
  }

  .source-note {
    font-size: 11px;
    color: var(--text-muted);
    text-align: center;
    line-height: 1.6;
    margin-top: 8px;
    padding: 16px;
    border-top: 1px solid var(--border);
  }
  .source-note strong { color: var(--text-main); }
</style>
</head>
<body>
<div class="page">

  <div class="page-header">
    <p class="eyebrow">Machine Learning · ACS 2026 Data</p>
    <h1>Cancer Risk<br><em>ML Predictor</em></h1>
    <p>Answer questions about your demographics, lifestyle, and medical history. Our machine learning model, trained on ACS Cancer Facts & Figures 2026 epidemiological data, will predict your relative cancer risk category and identify your key modifiable risk factors.</p>
  </div>

  <div class="card">
    <div class="card-title">Patient Information</div>
    <div class="card-sub">Provide your demographic and lifestyle information for ML-based risk prediction</div>

    <div class="field-grid">
      <div class="field">
        <label>Age</label>
        <input type="number" id="age" min="18" max="100" placeholder="e.g. 55" value="">
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

    <div class="field">
      <label>Smoking Status</label>
      <div class="chips" id="smoke-chips">
        <div class="chip" data-val="never">Never smoked</div>
        <div class="chip" data-val="former">Former smoker</div>
        <div class="chip" data-val="current">Current smoker</div>
      </div>
    </div>

    <div class="field" id="pack-years-field" style="display:none">
      <label>Pack-Years</label>
      <input type="number" id="packYears" min="0" max="200" placeholder="e.g. 20" value="0">
    </div>

    <div class="field">
      <label>BMI Category</label>
      <div class="chips" id="bmi-chips">
        <div class="chip" data-val="normal">Normal</div>
        <div class="chip" data-val="overweight">Overweight</div>
        <div class="chip" data-val="obese">Obese</div>
        <div class="chip" data-val="severely-obese">Severely Obese</div>
      </div>
    </div>

    <div class="field">
      <label>Alcohol Consumption</label>
      <div class="chips" id="alcohol-chips">
        <div class="chip" data-val="none">None</div>
        <div class="chip" data-val="light">Light</div>
        <div class="chip" data-val="moderate">Moderate</div>
        <div class="chip" data-val="heavy">Heavy</div>
      </div>
    </div>

    <div class="field">
      <label>Physical Activity</label>
      <div class="chips" id="activity-chips">
        <div class="chip" data-val="sedentary">Sedentary</div>
        <div class="chip" data-val="moderate">Moderate</div>
        <div class="chip" data-val="active">Active (150+ min/wk)</div>
      </div>
    </div>

    <div class="field">
      <label>Diet Quality</label>
      <div class="chips" id="diet-chips">
        <div class="chip" data-val="poor">Poor</div>
        <div class="chip" data-val="average">Average</div>
        <div class="chip" data-val="healthy">Healthy</div>
      </div>
    </div>

    <div class="field">
      <label>Medical History</label>
      <div class="toggle-row">
        <div><div class="toggle-label">Family history of cancer</div></div>
        <label class="toggle"><input type="checkbox" id="familyHistory"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div><div class="toggle-label">Type 2 Diabetes</div></div>
        <label class="toggle"><input type="checkbox" id="diabetes"><div class="toggle-track"></div></label>
      </div>
      <div class="toggle-row">
        <div><div class="toggle-label">Hepatitis B or C infection</div></div>
        <label class="toggle"><input type="checkbox" id="hepatitis"><div class="toggle-track"></div></label>
      </div>
    </div>

    <div class="btn-row">
      <button class="btn btn-primary" id="predictBtn" onclick="predictRisk()">Predict My Risk →</button>
    </div>
  </div>

  <div class="card results-hidden" id="results">
    <div class="card-title">Your ML Risk Prediction</div>
    <div class="card-sub" id="results-sub">Based on machine learning analysis of your profile</div>

    <div class="risk-hero">
      <div class="risk-category-label">Predicted Risk Category</div>
      <div class="risk-number" id="res-risk-pct">—</div>
      <div class="risk-label" id="res-label">machine learning prediction</div>
      <div class="gauge-wrap">
        <div class="gauge-track"><div class="gauge-fill" id="gauge-fill"></div></div>
        <div class="gauge-labels"><span>Low Risk</span><span>High Risk</span></div>
      </div>
      <div class="risk-badge" id="risk-badge">—</div>
    </div>

    <div style="font-family:var(--serif);font-size:18px;font-weight:600;margin-bottom:14px;color:var(--text-main)">Your Key Risk Factors</div>
    <div class="risk-factors-list" id="risk-factors-list"></div>

    <div style="font-family:var(--serif);font-size:18px;font-weight:600;margin-bottom:14px;color:var(--text-main)">Feature Importance Analysis</div>
    <div class="importance-grid" id="importance-grid"></div>

    <div class="source-note">
      <strong>Model:</strong> Ensemble ML (Logistic Regression + Random Forest) trained on ACS Cancer Facts & Figures 2026 data. This is for educational purposes only and does not constitute medical advice. Consult a healthcare provider for personalized screening recommendations.
    </div>
  </div>

</div>

<script type="module">
  import { pythonURI, fetchOptions } from '/assets/js/api/config.js';

// ── STATE ──────────────────────────────────────────────────────────────────
const state = {
  age: null, sex: null, race: null,
  smoking_status: null, pack_years: 0,
  bmi_category: null, alcohol_consumption: null,
  physical_activity: null, diet_quality: null,
  family_history: false, diabetes: false, hepatitis: false
};

// ── HELPER FUNCTIONS ───────────────────────────────────────────────────────
function initChips(containerId, stateKey) {
  const container = document.getElementById(containerId);
  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      state[stateKey] = chip.dataset.val;
    });
  });
}

function validate() {
  const required = ['age', 'sex', 'race', 'smoking_status', 'bmi_category',
                   'alcohol_consumption', 'physical_activity', 'diet_quality'];
  const missing = required.filter(k => !state[k]);
  if (missing.length > 0) {
    alert(`Please fill in: ${missing.join(', ')}`);
    return false;
  }
  return true;
}

// ── PREDICTION ─────────────────────────────────────────────────────────────
window.predictRisk = async function() {
  if (!validate()) return;

  // Show loading state
  const resultsCard = document.getElementById('results');
  resultsCard.classList.remove('results-hidden');
  resultsCard.innerHTML = '<div class="ai-loading"><div class="dots"><span></span><span></span><span></span></div> Running ML prediction…</div>';
  resultsCard.scrollIntoView({ behavior: 'smooth' });

  try {
    // Call API
    const res = await fetch(`${pythonURI}/api/cancer-risk/predict`, fetchOptions);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || res.statusText);
    }

    const data = await res.json();
    displayResults(data);

  } catch(e) {
    resultsCard.innerHTML = `<div class="card-sub" style="color:var(--terracotta)">Error: ${e.message}. Make sure you are logged in and the backend is running.</div>`;
  }
};

function displayResults(data) {
  const resultsCard = document.getElementById('results');
  const isHighRisk = data.risk_category === 'high';
  const prob = isHighRisk ? data.high_risk_probability : data.low_risk_probability;

  // Rebuild results HTML
  resultsCard.innerHTML = `
    <div class="card-title">Your ML Risk Prediction</div>
    <div class="card-sub">Based on machine learning analysis of your profile</div>

    <div class="risk-hero">
      <div class="risk-category-label">Predicted Risk Category</div>
      <div class="risk-number" id="res-risk-pct" style="color:${isHighRisk ? 'var(--terracotta)' : 'var(--sage)'}">
        ${(prob * 100).toFixed(1)}%
      </div>
      <div class="risk-label">${data.risk_category.toUpperCase()} RISK (${(data.model_confidence * 100).toFixed(0)}% confidence)</div>
      <div class="gauge-wrap">
        <div class="gauge-track"><div class="gauge-fill" id="gauge-fill"></div></div>
        <div class="gauge-labels"><span>Low Risk</span><span>High Risk</span></div>
      </div>
      <div class="risk-badge ${data.risk_category}">
        ${isHighRisk ? '↑ Higher Than Average Risk' : '↓ Lower Than Average Risk'}
      </div>
    </div>

    <div style="font-family:var(--serif);font-size:18px;font-weight:600;margin-bottom:14px;color:var(--text-main)">Your Key Risk Factors</div>
    <div class="risk-factors-list" id="risk-factors-list"></div>

    <div style="font-family:var(--serif);font-size:18px;font-weight:600;margin-bottom:14px;color:var(--text-main)">Feature Importance Analysis</div>
    <div class="importance-grid" id="importance-grid"></div>

    <div class="source-note">
      <strong>Model:</strong> Ensemble ML (Logistic Regression + Random Forest) trained on ACS Cancer Facts & Figures 2026 data. This is for educational purposes only and does not constitute medical advice. Consult a healthcare provider for personalized screening recommendations.
    </div>
  `;

  // Animate gauge
  setTimeout(() => {
    const gf = document.getElementById('gauge-fill');
    const width = isHighRisk ? (prob * 100) : (50 - prob * 50);
    gf.style.width = width + '%';
    gf.style.background = isHighRisk ? 'var(--terracotta)' : 'var(--sage)';
  }, 200);

  // Render risk factors
  const rfList = document.getElementById('risk-factors-list');
  if (data.risk_factors && data.risk_factors.length > 0) {
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
    rfList.innerHTML = '<div class="card-sub">No significant modifiable risk factors identified. Continue healthy lifestyle behaviors!</div>';
  }

  // Render feature importances
  const impGrid = document.getElementById('importance-grid');
  const sortedImps = Object.entries(data.feature_importances)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  
  impGrid.innerHTML = sortedImps.map(([feature, imp]) => `
    <div class="importance-row">
      <div class="importance-label">${feature.replace(/_/g, ' ')}</div>
      <div class="importance-bar-track">
        <div class="importance-bar-fill" style="width:0%" data-w="${(imp * 100).toFixed(0)}"></div>
      </div>
      <div class="importance-val">${(imp * 100).toFixed(1)}%</div>
    </div>
  `).join('');

  setTimeout(() => {
    impGrid.querySelectorAll('.importance-bar-fill').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }, 300);
}

// ── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('age').addEventListener('input', e => { state.age = parseInt(e.target.value) || null; });
  document.getElementById('sex').addEventListener('change', e => { state.sex = e.target.value || null; });
  document.getElementById('packYears').addEventListener('input', e => { state.pack_years = parseInt(e.target.value) || 0; });

  initChips('race-chips', 'race');
  initChips('smoke-chips', 'smoking_status');
  initChips('bmi-chips', 'bmi_category');
  initChips('alcohol-chips', 'alcohol_consumption');
  initChips('activity-chips', 'physical_activity');
  initChips('diet-chips', 'diet_quality');

  document.getElementById('familyHistory').addEventListener('change', e => { state.family_history = e.target.checked; });
  document.getElementById('diabetes').addEventListener('change', e => { state.diabetes = e.target.checked; });
  document.getElementById('hepatitis').addEventListener('change', e => { state.hepatitis = e.target.checked; });

  // Show pack-years field for smokers
  document.getElementById('smoke-chips').querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const field = document.getElementById('pack-years-field');
      field.style.display = (chip.dataset.val !== 'never') ? 'block' : 'none';
    });
  });
});
</script>
</body>
</html>