---
hide: true
show_reading_time: false
---

<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ACS · Interactive Cancer Body Map</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<style>
/* ── RESET ───────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream:      #fdf6ee;
  --warm-white: #fff9f3;
  --rose:       #e07a6a;
  --rose-light: #f2b5ab;
  --rose-pale:  #fce9e6;
  --terra:      #c45e4a;
  --sage:       #8aaa8c;
  --sage-pale:  #eaf1ea;
  --tan:        #c4a882;
  --tan-light:  #e8d9c4;
  --brown:      #6b4c3b;
  --text:       #3d2c24;
  --muted:      #937468;
  --border:     rgba(196,168,130,0.3);
  --serif:      'Cormorant Garamond', Georgia, serif;
  --sans:       'Nunito', system-ui, sans-serif;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--sans);
  background: var(--cream);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

/* Warm paper texture */
body::after {
  content: '';
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 9999; opacity: 0.4;
}

/* ── HERO BANNER ─────────────────────────────────────── */
.acs-hero {
  background: linear-gradient(135deg, var(--brown) 0%, #4a2e22 100%);
  padding: 56px 48px 48px;
  position: relative; overflow: hidden;
}
.acs-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(224,122,106,0.18) 0%, transparent 60%);
  pointer-events: none;
}
.hero-inner {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: center;
  position: relative; z-index: 1;
}
.hero-eyebrow {
  font-family: var(--sans);
  font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--rose-light);
  margin-bottom: 12px;
  display: flex; align-items: center; gap: 8px;
}
.hero-eyebrow::before {
  content: '♥'; font-size: 10px;
  width: 20px; height: 20px; background: var(--rose);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; flex-shrink: 0;
}
.hero-title {
  font-family: var(--serif);
  font-size: clamp(32px, 4.5vw, 58px);
  font-weight: 700; line-height: 1.08; color: #fff;
  letter-spacing: -0.3px;
}
.hero-title em { font-style: italic; color: var(--rose-light); }
.hero-sub {
  margin-top: 14px; font-size: 15px;
  color: rgba(255,255,255,0.55); line-height: 1.7;
  max-width: 500px;
}
.hero-stats {
  display: flex; gap: 28px; margin-top: 28px;
}
.hstat-num {
  font-family: var(--serif); font-size: 30px; font-weight: 700;
  color: var(--rose-light); line-height: 1;
}
.hstat-label {
  font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: rgba(255,255,255,0.4);
  margin-top: 3px;
}
.hero-cta {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 26px; background: var(--rose); color: #fff;
  font-weight: 700; font-size: 13px; letter-spacing: 0.06em;
  text-transform: uppercase; text-decoration: none;
  border-radius: 8px; align-self: flex-start;
  transition: background 0.2s, transform 0.15s;
  box-shadow: 0 4px 20px rgba(224,122,106,0.3);
}
.hero-cta:hover { background: var(--terra); transform: translateY(-2px); }
.hero-cta svg { width: 13px; height: 13px; }

/* ── MAIN LAYOUT ─────────────────────────────────────── */
.main-section {
  max-width: 1100px; margin: 0 auto;
  padding: 48px 48px 0;
}

/* gender toggle */
.gender-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 32px; flex-wrap: wrap; gap: 12px;
}
.section-eyebrow {
  font-family: var(--sans); font-size: 11px; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--muted);
}
.gender-toggle {
  display: flex; gap: 0;
  background: var(--tan-light); border-radius: 8px;
  padding: 3px; border: 1px solid var(--border);
}
.gender-btn {
  padding: 8px 20px; border: none; background: transparent;
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  color: var(--muted); border-radius: 6px; cursor: pointer;
  transition: all 0.2s;
}
.gender-btn.active {
  background: var(--warm-white); color: var(--text);
  box-shadow: 0 2px 8px rgba(61,44,36,0.1);
}
.gender-btn:hover:not(.active) { color: var(--text); }

/* diagram + panel layout */
.diagram-area {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 40px; align-items: start;
}

/* ── SVG BODY WRAPPER ────────────────────────────────── */
.body-wrap {
  position: relative;
  width: 300px; flex-shrink: 0;
}

#body-svg-female,
#body-svg-male {
  width: 300px;
  height: auto;
  display: block;
  filter: drop-shadow(0 8px 32px rgba(61,44,36,0.12));
}




/* Hotspot dot container - inside the SVG via foreignObject or overlay div */
.hotspot-layer {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
}

.hs-dot {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: all; cursor: pointer;
  z-index: 10;
}
.hs-dot-ring {
  position: relative; width: 22px; height: 22px;
}
.hs-dot-core {
  position: absolute; top: 5px; left: 5px;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--dot-color);
  box-shadow: 0 0 6px var(--dot-color);
  transition: transform 0.2s, box-shadow 0.2s;
}
.hs-dot-pulse {
  position: absolute; inset: 0; border-radius: 50%;
  border: 2px solid var(--dot-color); opacity: 0.5;
  animation: hsPulse 2.2s ease-out infinite;
}
.hs-dot:hover .hs-dot-core,
.hs-dot.active .hs-dot-core {
  transform: scale(1.4);
  box-shadow: 0 0 14px var(--dot-color), 0 0 28px var(--dot-color);
}
.hs-dot.active .hs-dot-pulse { animation: none; opacity: 1; }

@keyframes hsPulse {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(2.8); opacity: 0; }
}

/* ── POPUP PANEL ─────────────────────────────────────── */
.info-panel {
  flex: 1;
  background: var(--warm-white);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  min-height: 320px;
  transition: border-color 0.3s;
  display: flex; flex-direction: column;
  position: sticky; top: 80px;
  box-shadow: 0 4px 24px rgba(61,44,36,0.06);
}
.info-panel.active {
  border-color: var(--panel-accent, var(--border));
  box-shadow: 0 8px 40px rgba(61,44,36,0.1);
}

.panel-top {
  padding: 24px 24px 20px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, var(--warm-white), var(--cream));
  position: relative; overflow: hidden;
}
.panel-glow {
  position: absolute; top: -40px; right: -40px;
  width: 140px; height: 140px; border-radius: 50%;
  background: var(--panel-accent, transparent);
  opacity: 0.1; pointer-events: none; transition: background 0.4s;
}
.panel-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 4px 12px; border-radius: 20px;
  background: rgba(196,168,130,0.12);
  border: 1px solid var(--border);
  font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; margin-bottom: 10px;
  color: var(--panel-accent, var(--muted));
  border-color: var(--panel-accent, var(--border));
  transition: all 0.3s;
}
.panel-region {
  font-family: var(--serif); font-size: 24px; font-weight: 700;
  color: var(--text); line-height: 1.2; margin-bottom: 4px;
}
.panel-count {
  font-size: 12px; color: var(--muted);
}

.panel-body {
  padding: 8px 0 16px; overflow-y: auto; flex: 1;
  max-height: 460px;
}

.cancer-item {
  display: flex; flex-direction: column;
  padding: 12px 24px;
  border-bottom: 1px solid rgba(196,168,130,0.15);
  cursor: pointer; transition: background 0.15s, padding-left 0.15s;
}
.cancer-item:last-child { border-bottom: none; }
.cancer-item:hover { background: rgba(196,168,130,0.06); padding-left: 28px; }
.cancer-item.open { background: var(--rose-pale); padding-left: 28px; }

.cancer-row {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
}
.cancer-name-link {
  font-size: 13px; font-weight: 700; color: var(--text);
  text-decoration: none; line-height: 1.3; transition: color 0.15s;
}
.cancer-item:hover .cancer-name-link,
.cancer-item.open .cancer-name-link { color: var(--rose); }
.cancer-arrow {
  font-size: 11px; color: var(--muted); flex-shrink: 0;
  margin-top: 2px; transition: transform 0.15s, color 0.15s;
}
.cancer-item:hover .cancer-arrow,
.cancer-item.open .cancer-arrow {
  transform: translateX(4px); color: var(--rose);
}

.cancer-tags {
  display: flex; flex-wrap: wrap; gap: 4px; margin-top: 5px;
}
.ctag {
  font-size: 10px; padding: 2px 8px;
  background: rgba(196,168,130,0.12);
  border: 1px solid rgba(196,168,130,0.3);
  border-radius: 3px; color: var(--muted);
  font-weight: 500;
}
.cancer-desc {
  font-size: 12px; color: var(--muted); margin-top: 6px;
  line-height: 1.6; display: none;
  padding: 8px 12px; background: rgba(196,168,130,0.06);
  border-radius: 6px; border-left: 2px solid var(--rose-light);
}
.cancer-item.open .cancer-desc { display: block; }

/* Empty state */
.empty-state {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 60px 32px; text-align: center; gap: 14px;
  flex: 1;
}
.empty-icon {
  width: 54px; height: 54px; border-radius: 50%;
  background: var(--rose-pale); border: 1px solid var(--rose-light);
  display: flex; align-items: center; justify-content: center; font-size: 22px;
}
.empty-title {
  font-family: var(--serif); font-size: 18px; font-weight: 600; color: var(--text);
}
.empty-sub {
  font-size: 13px; color: var(--muted); line-height: 1.65; max-width: 240px;
}

/* ── BOTTOM CATEGORIES ────────────────────────────────── */
.categories-section {
  max-width: 1100px; margin: 0 auto;
  padding: 56px 48px 80px;
}
.cat-heading {
  font-family: var(--serif); font-size: clamp(28px,3vw,42px);
  font-weight: 700; color: var(--text); margin-bottom: 6px;
}
.cat-sub {
  font-size: 14px; color: var(--muted); margin-bottom: 36px; line-height: 1.6;
}
.cat-divider {
  height: 1px; background: var(--border); margin-bottom: 36px;
}

.sys-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.sys-card {
  background: var(--warm-white);
  border: 1px solid var(--border);
  border-radius: 14px; padding: 20px;
  cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
  position: relative; overflow: hidden;
}
.sys-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--sys-color);
  border-radius: 14px 14px 0 0;
}
.sys-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(61,44,36,0.09);
}
.sys-icon { font-size: 22px; margin-bottom: 10px; }
.sys-label {
  font-family: var(--serif); font-size: 17px; font-weight: 700;
  color: var(--text); margin-bottom: 6px;
}
.sys-cancers {
  font-size: 11px; font-weight: 600; letter-spacing: 0.05em;
  text-transform: uppercase; color: var(--muted);
}
.sys-count {
  display: inline-block; margin-top: 8px;
  padding: 3px 10px; border-radius: 20px;
  background: var(--rose-pale); color: var(--terra);
  font-size: 10px; font-weight: 700; letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ── FOOTER ───────────────────────────────────────────── */
.acs-footer {
  background: var(--brown);
  padding: 32px 48px;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
}
.footer-copy {
  font-size: 12px; color: rgba(255,255,255,0.4);
}
.footer-link {
  font-size: 12px; color: var(--rose-light);
  text-decoration: none; transition: opacity 0.2s; font-weight: 600;
}
.footer-link:hover { opacity: 0.75; }

/* ── FADE-IN ──────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeUp 0.5s ease both; }

/* ── RESPONSIVE ───────────────────────────────────────── */
@media (max-width: 820px) {
  .acs-hero { padding: 36px 24px; }
  .hero-inner { grid-template-columns: 1fr; }
  .main-section { padding: 32px 24px 0; }
  .diagram-area { grid-template-columns: 1fr; }
  .body-wrap { margin: 0 auto; }
  .info-panel { position: static; }
  .categories-section { padding: 40px 24px 60px; }
  .acs-footer { padding: 24px; }
}
</style>
</head>
<body>

<!-- ── HERO ──────────────────────────────────────────────── -->
<div class="acs-hero">
  <div class="hero-inner">
    <div>
      <div class="hero-eyebrow">American Cancer Society</div>
      <h1 class="hero-title">Every cancer.<br><em>One body.</em><br>Fully mapped.</h1>
      <p class="hero-sub">Click any glowing hotspot to explore cancer types by body region — symptoms, risk factors, and ACS resources.</p>
      <div class="hero-stats">
        <div><div class="hstat-num">80+</div><div class="hstat-label">Cancer Types</div></div>
        <div><div class="hstat-num">13</div><div class="hstat-label">Body Systems</div></div>
        <div><div class="hstat-num">17</div><div class="hstat-label">Regions</div></div>
      </div>
    </div>
    <a href="https://www.cancer.org" target="_blank" class="hero-cta">
      Visit Cancer.org
      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 7h12M8 3l5 4-5 4"/></svg>
    </a>
  </div>
</div>

<!-- ── MAIN INTERACTIVE SECTION ──────────────────────────── -->
<div class="main-section">
  <div class="gender-row">
    <div class="section-eyebrow">Interactive Body Map</div>
    <div class="gender-toggle">
      <button class="gender-btn active" id="btn-female" onclick="switchGender('female')">♀ Female</button>
      <button class="gender-btn" id="btn-male" onclick="switchGender('male')">♂ Male</button>
    </div>
  </div>

  <div class="diagram-area fade-in">
    <!-- SVG Body -->
    <div class="body-wrap" id="bodyWrap">
      <!-- Female SVG -->
      <div id="svg-container-female">
        <img src="{{site.baseurl}}/shinybody-main/inst/svgs/homo_sapiens_female.svg" id="body-svg-female" style="width:300px;display:block;" />
      </div>
      <!-- Male SVG (hidden by default) -->
      <div id="svg-container-male" style="display:none">
        <img src="{{site.baseurl}}/shinybody-main/inst/svgs/homo_sapiens_male.svg" id="body-svg-male" style="width:300px;display:block;" />
      </div>
      <!-- Hotspot overlay -->
      <div class="hotspot-layer" id="hotspotLayer"></div>
    </div>

    <!-- Info Panel -->
    <div class="info-panel" id="infoPanel">
      <div id="panelContent">
        <div class="empty-state">
          <div class="empty-icon">🔬</div>
          <div class="empty-title">Select a body region</div>
          <div class="empty-sub">Click any pulsing hotspot on the diagram to explore cancer types for that area.</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ── CATEGORIES GRID ───────────────────────────────────── -->
<div class="categories-section">
  <div class="cat-divider" style="margin-top:48px"></div>
  <h2 class="cat-heading">Browse by Body System</h2>
  <p class="cat-sub">All 13 body systems covered — click any card to jump to that region on the diagram above.</p>
  <div class="sys-grid" id="sysGrid"></div>
</div>

<!-- ── FOOTER ────────────────────────────────────────────── -->
<div class="acs-footer">
  <div class="footer-copy">© 2025 American Cancer Society — Educational Reference Tool</div>
  <a href="https://www.cancer.org" target="_blank" class="footer-link">cancer.org →</a>
</div>

<script>
// ─── DATA ──────────────────────────────────────────────────────────────────
const SYSTEMS = {
  head_neck:    { label:'Head & Neck',           color:'#c45e4a', icon:'🗣️' },
  lung_chest:   { label:'Lung & Chest',           color:'#6a9fd8', icon:'🫁' },
  breast:       { label:'Breast',                 color:'#d97fb8', icon:'🎗️' },
  digestive:    { label:'Digestive System',       color:'#c49a3c', icon:'🫃' },
  urinary:      { label:'Urinary System',         color:'#7a9e7e', icon:'🫘' },
  reproductive: { label:'Reproductive System',    color:'#a07cc5', icon:'🌸' },
  endocrine:    { label:'Endocrine System',       color:'#d4845a', icon:'⚗️' },
  skin:         { label:'Skin',                   color:'#c4a35a', icon:'☀️' },
  bone_soft:    { label:'Bone & Soft Tissue',     color:'#7a8fa6', icon:'🦴' },
  eye:          { label:'Eye',                    color:'#5aabb5', icon:'👁️' },
  brain_ns:     { label:'Brain & Nervous System', color:'#9b7ec8', icon:'🧠' },
  blood_lymph:  { label:'Blood & Lymph',          color:'#e07a6a', icon:'🩸' },
  other:        { label:'Other Cancers',          color:'#937468', icon:'🔬' },
};

const CANCERS = {
  head_neck_general:  { name:'Head and Neck Cancers',                 link:'https://www.cancer.org/cancer/head-neck-cancer.html',                           tags:['Sore throat','Hoarseness','Difficulty swallowing'], desc:'A broad category covering cancers in the head/neck. Risk factors include tobacco, alcohol, and HPV.' },
  laryngeal:          { name:'Laryngeal & Hypopharyngeal Cancer',      link:'https://www.cancer.org/cancer/laryngeal-hypopharyngeal-cancer.html',             tags:['Hoarseness','Sore throat','Ear pain'],              desc:'Cancers of the voice box and lower throat. Strongly linked to tobacco and alcohol use.' },
  nasal:              { name:'Nasal Cavity & Paranasal Sinus Cancer',  link:'https://www.cancer.org/cancer/nasal-cavity-paranasal-sinus-cancer.html',         tags:['Nasal blockage','Nosebleeds','Facial pain'],        desc:'Rare cancers affecting the nasal passages and sinus cavities.' },
  nasopharyngeal:     { name:'Nasopharyngeal Cancer',                  link:'https://www.cancer.org/cancer/nasopharyngeal-cancer.html',                       tags:['Neck lump','Hearing loss','Nasal congestion'],      desc:'Cancer of the upper throat behind the nose. More common in Southeast Asia.' },
  oral_oropharyngeal: { name:'Oral Cavity & Oropharyngeal Cancer',     link:'https://www.cancer.org/cancer/oral-cavity-oropharyngeal-cancer.html',            tags:['Mouth sore','Jaw pain','Difficulty chewing'],       desc:'Cancers of the mouth, lips, tongue, and throat. HPV is increasingly a cause.' },
  salivary:           { name:'Salivary Gland Cancer',                  link:'https://www.cancer.org/cancer/salivary-gland-cancer.html',                       tags:['Facial swelling','Facial numbness','Jaw pain'],     desc:'Rare cancers from the salivary glands near the jaw and neck.' },
  thyroid:            { name:'Thyroid Cancer',                         link:'https://www.cancer.org/cancer/thyroid-cancer.html',                              tags:['Neck lump','Hoarseness','Swallowing problems'],    desc:'Most common endocrine cancer. Usually very treatable. Papillary is the most common subtype.' },
  lung:               { name:'Lung Cancer',                            link:'https://www.cancer.org/cancer/lung-cancer.html',                                 tags:['Persistent cough','Chest pain','Shortness of breath'], desc:'Leading cause of cancer death in the US. Strongly linked to smoking.' },
  lung_net:           { name:'Lung Neuroendocrine Tumor',              link:'https://www.cancer.org/cancer/lung-cancer/about/what-is.html',                   tags:['Cough','Wheezing','Flushing'],                      desc:'A subtype of lung tumor from neuroendocrine cells. Ranges from slow-growing to aggressive.' },
  mesothelioma:       { name:'Mesothelioma',                           link:'https://www.cancer.org/cancer/malignant-mesothelioma.html',                      tags:['Chest pain','Shortness of breath','Asbestos exposure'], desc:'Rare cancer of the lining of the lungs, strongly linked to asbestos exposure.' },
  thymus:             { name:'Thymus Cancer',                          link:'https://www.cancer.org/cancer/thymoma.html',                                     tags:['Chest pain','Cough','Difficulty swallowing'],      desc:'Rare cancers of the thymus gland in the chest. Often found incidentally on imaging.' },
  breast:             { name:'Breast Cancer',                          link:'https://www.cancer.org/cancer/breast-cancer.html',                               tags:['Lump','Skin changes','Nipple discharge'],           desc:'Most common cancer in American women. Regular mammograms are critical for early detection.' },
  breast_men:         { name:'Breast Cancer in Men',                   link:'https://www.cancer.org/cancer/breast-cancer-in-men.html',                        tags:['Breast lump','Nipple changes','Skin changes'],      desc:'Though rare, men can develop breast cancer. BRCA2 gene mutations increase risk.' },
  anal:               { name:'Anal Cancer',                            link:'https://www.cancer.org/cancer/anal-cancer.html',                                 tags:['Rectal bleeding','Anal pain','Lump near anus'],     desc:'Cancer of the anal canal, increasingly linked to HPV infection.' },
  bile_duct:          { name:'Bile Duct Cancer (Cholangiocarcinoma)',   link:'https://www.cancer.org/cancer/bile-duct-cancer.html',                            tags:['Jaundice','Abdominal pain','Itching'],              desc:'Cancer in the bile ducts. Often diagnosed at an advanced stage.' },
  colorectal:         { name:'Colorectal Cancer',                      link:'https://www.cancer.org/cancer/colon-rectal-cancer.html',                         tags:['Blood in stool','Bowel changes','Cramping'],        desc:'Third most common cancer in the US. Colonoscopy from age 45 is highly effective.' },
  esophageal:         { name:'Esophageal Cancer',                      link:'https://www.cancer.org/cancer/esophagus-cancer.html',                            tags:['Difficulty swallowing','Weight loss','Chest pain'], desc:'Cancer of the esophagus. Risk factors include GERD, Barrett's esophagus, tobacco, and alcohol.' },
  gallbladder:        { name:'Gallbladder Cancer',                     link:'https://www.cancer.org/cancer/gallbladder-cancer.html',                          tags:['Abdominal pain','Jaundice','Nausea'],               desc:'Rare gallbladder cancer. Often found late due to few early symptoms.' },
  gi_net:             { name:'GI Neuroendocrine (Carcinoid) Tumors',   link:'https://www.cancer.org/cancer/gastrointestinal-carcinoid-tumor.html',            tags:['Flushing','Diarrhea','Abdominal pain'],             desc:'Slow-growing tumors from neuroendocrine cells of the GI tract.' },
  gist:               { name:'Gastrointestinal Stromal Tumor (GIST)',  link:'https://www.cancer.org/cancer/gastrointestinal-stromal-tumor.html',              tags:['Abdominal pain','GI bleeding','Early fullness'],    desc:'Rare tumors in the walls of the GI tract. Most occur in the stomach or small intestine.' },
  liver:              { name:'Liver Cancer',                           link:'https://www.cancer.org/cancer/liver-cancer.html',                                tags:['Abdominal pain','Jaundice','Weight loss'],          desc:'Primary liver cancer often linked to cirrhosis, hepatitis B/C, and heavy alcohol use.' },
  pancreatic:         { name:'Pancreatic Cancer',                      link:'https://www.cancer.org/cancer/pancreatic-cancer.html',                           tags:['Back pain','Jaundice','Weight loss'],               desc:'One of the hardest cancers to detect early. CA 19-9 and imaging used for diagnosis.' },
  pancreatic_net:     { name:'Pancreatic Neuroendocrine Tumor',        link:'https://www.cancer.org/cancer/pancreatic-cancer/about/what-is-pancreatic-cancer.html', tags:['Low blood sugar','Abdominal pain','Diarrhea'], desc:'A subtype from hormone-producing cells. Generally slower-growing.' },
  small_intestine:    { name:'Small Intestine Cancer',                 link:'https://www.cancer.org/cancer/small-intestine-cancer.html',                      tags:['Abdominal pain','Weight loss','Blood in stool'],    desc:'Rare cancer of the small bowel. Several subtypes exist.' },
  stomach:            { name:'Stomach Cancer',                         link:'https://www.cancer.org/cancer/stomach-cancer.html',                              tags:['Indigestion','Nausea','Weight loss'],               desc:'Develops slowly. H. pylori infection, diet, and smoking are major risk factors.' },
  bladder:            { name:'Bladder Cancer',                         link:'https://www.cancer.org/cancer/bladder-cancer.html',                              tags:['Blood in urine','Urinary frequency','Pelvic pain'], desc:'Common urologic cancer. Smoking is the leading risk factor.' },
  kidney:             { name:'Kidney Cancer',                          link:'https://www.cancer.org/cancer/kidney-cancer.html',                               tags:['Blood in urine','Flank pain','Lump in side'],       desc:'Renal cell carcinoma is the most common type. Smoking, obesity increase risk.' },
  wilms:              { name:'Wilms Tumor',                            link:'https://www.cancer.org/cancer/wilms-tumor.html',                                 tags:['Abdominal swelling','Flank pain','Fever'],          desc:'Rare kidney cancer primarily affecting children. One of the most successfully treated.' },
  cervical:           { name:'Cervical Cancer',                        link:'https://www.cancer.org/cancer/cervical-cancer.html',                             tags:['Irregular bleeding','Pelvic pain','Discharge'],     desc:'Almost all caused by HPV. Pap smears and HPV vaccines are highly effective prevention.' },
  endometrial:        { name:'Endometrial Cancer',                     link:'https://www.cancer.org/cancer/endometrial-cancer.html',                          tags:['Abnormal bleeding','Pelvic pain','Weight loss'],    desc:'Most common gynecologic cancer in the US. Abnormal vaginal bleeding is the main early sign.' },
  ovarian:            { name:'Ovarian Cancer',                         link:'https://www.cancer.org/cancer/ovarian-cancer.html',                              tags:['Bloating','Pelvic pain','Early fullness'],          desc:'Called the "silent killer" due to vague early symptoms. BRCA1/2 mutations increase risk.' },
  penile:             { name:'Penile Cancer',                          link:'https://www.cancer.org/cancer/penile-cancer.html',                               tags:['Skin changes','Sores','Discharge'],                 desc:'A rare cancer of the penis, often linked to HPV, poor hygiene, or phimosis.' },
  prostate:           { name:'Prostate Cancer',                        link:'https://www.cancer.org/cancer/prostate-cancer.html',                             tags:['Urinary changes','Pelvic discomfort','Bone pain'],  desc:'Most common cancer in American men. PSA screening recommended starting at age 50.' },
  testicular:         { name:'Testicular Cancer',                      link:'https://www.cancer.org/cancer/testicular-cancer.html',                           tags:['Testicular lump','Swelling','Dull ache'],           desc:'Most common in men aged 15–35. Highly treatable, especially when caught early.' },
  uterine_sarcoma:    { name:'Uterine Sarcoma',                        link:'https://www.cancer.org/cancer/uterine-sarcoma.html',                             tags:['Abnormal bleeding','Pelvic pain','Uterine mass'],   desc:'Rare, aggressive cancer from the muscle/connective tissue of the uterus.' },
  vaginal:            { name:'Vaginal Cancer',                         link:'https://www.cancer.org/cancer/vaginal-cancer.html',                              tags:['Vaginal bleeding','Discharge','Pelvic pain'],       desc:'Rare cancer of the vaginal lining. HPV is the primary risk factor.' },
  vulvar:             { name:'Vulvar Cancer',                          link:'https://www.cancer.org/cancer/vulvar-cancer.html',                               tags:['Itching','Skin changes','Lump'],                    desc:'Cancer of the external female genitalia. HPV and lichen sclerosus are risk factors.' },
  neuroendocrine:     { name:'Neuroendocrine Tumors',                  link:'https://www.cancer.org/cancer/gastrointestinal-carcinoid-tumor.html',            tags:['Flushing','Diarrhea','Wheezing'],                   desc:'Tumors from neuroendocrine cells throughout the body. Behavior varies widely.' },
  adrenal:            { name:'Adrenal Cancer',                         link:'https://www.cancer.org/cancer/adrenal-cancer.html',                              tags:['Abdominal pain','Hormonal changes','Weight gain'],  desc:'Rare cancer of the adrenal glands. May produce excess hormones.' },
  pituitary:          { name:'Pituitary Tumors',                       link:'https://www.cancer.org/cancer/pituitary-tumors.html',                            tags:['Headaches','Vision changes','Hormonal imbalance'],  desc:'Most are benign adenomas but cause significant hormonal and neurological effects.' },
  skin_general:       { name:'Skin Cancer',                            link:'https://www.cancer.org/cancer/skin-cancer.html',                                 tags:['New moles','Changing spots','Non-healing sores'],   desc:'Most common cancer overall. UV exposure is the primary risk factor.' },
  basal_squamous:     { name:'Basal & Squamous Cell Skin Cancer',      link:'https://www.cancer.org/cancer/basal-squamous-cell-skin-cancer.html',             tags:['Pearly bump','Flat lesion','Bleeding sore'],        desc:'Most common skin cancers. Rarely spread but should be treated promptly.' },
  kaposi:             { name:'Kaposi Sarcoma',                         link:'https://www.cancer.org/cancer/kaposi-sarcoma.html',                              tags:['Skin lesions','Mouth sores','Lymph node swelling'], desc:'Caused by HHV-8 virus, commonly associated with HIV/AIDS.' },
  skin_lymphoma:      { name:'Lymphoma of the Skin',                   link:'https://www.cancer.org/cancer/lymphoma-skin.html',                               tags:['Skin patches','Itching','Tumors on skin'],          desc:'Non-Hodgkin lymphoma originating in the skin. Mycosis fungoides is the most common type.' },
  melanoma:           { name:'Melanoma Skin Cancer',                   link:'https://www.cancer.org/cancer/melanoma-skin-cancer.html',                        tags:['Asymmetric mole','Irregular border','Color variation'], desc:'Most dangerous form of skin cancer. Can spread to other organs if not caught early.' },
  merkel:             { name:'Merkel Cell Skin Cancer',                link:'https://www.cancer.org/cancer/merkel-cell-skin-cancer.html',                     tags:['Firm skin lump','Reddish nodule','Fast growth'],    desc:'Rare and aggressive skin cancer linked to Merkel cell polyomavirus and UV exposure.' },
  bone:               { name:'Bone Cancer',                            link:'https://www.cancer.org/cancer/bone-cancer.html',                                 tags:['Bone pain','Swelling','Fractures'],                 desc:'Primary bone cancers are rare. Types include osteosarcoma, Ewing sarcoma, chondrosarcoma.' },
  ewing:              { name:'Ewing Sarcoma',                          link:'https://www.cancer.org/cancer/ewing-tumor.html',                                 tags:['Bone pain','Swelling','Fever'],                     desc:'Malignant tumor in bones or soft tissue, most common in children and young adults.' },
  osteosarcoma:       { name:'Osteosarcoma',                           link:'https://www.cancer.org/cancer/osteosarcoma.html',                                tags:['Bone pain','Swelling near joint','Fracture'],       desc:'Most common primary bone cancer, usually near the knee or shoulder in adolescents.' },
  rhabdomyosarcoma:   { name:'Rhabdomyosarcoma',                       link:'https://www.cancer.org/cancer/rhabdomyosarcoma.html',                            tags:['Lump or swelling','Bulging eye','Bloody discharge'], desc:'Cancer of soft tissue from skeletal muscle cells; most common in children.' },
  soft_tissue:        { name:'Soft Tissue Sarcomas',                   link:'https://www.cancer.org/cancer/soft-tissue-sarcoma.html',                         tags:['Growing lump','Pain','Limited range of motion'],    desc:'Rare cancers of fat, muscle, blood vessels, and deep skin.' },
  spinal:             { name:'Spinal Tumors',                          link:'https://www.cancer.org/cancer/brain-spinal-cord-tumors-adults.html',             tags:['Back pain','Weakness','Numbness'],                  desc:'Tumors can arise from the spinal cord or surrounding structures.' },
  eye_c:              { name:'Eye Cancer (Ocular Melanoma)',           link:'https://www.cancer.org/cancer/eye-cancer.html',                                  tags:['Vision changes','Floaters','Flashes of light'],     desc:'Most common primary eye cancer in adults. Arises from melanocytes in the uvea.' },
  retinoblastoma:     { name:'Retinoblastoma',                         link:'https://www.cancer.org/cancer/retinoblastoma.html',                              tags:['White pupil reflex','Crossed eyes','Vision problems'], desc:'Rare eye cancer primarily affecting young children under age 5. Highly curable early.' },
  brain_adults:       { name:'Brain Tumors in Adults',                 link:'https://www.cancer.org/cancer/brain-spinal-cord-tumors-adults.html',             tags:['Headaches','Seizures','Cognitive changes'],         desc:'Can be primary (originating in brain) or metastatic. Symptoms depend on tumor location.' },
  brain_children:     { name:'Brain Tumors in Children',              link:'https://www.cancer.org/cancer/brain-spinal-cord-tumors-children.html',           tags:['Headaches','Nausea','Balance problems'],            desc:'Most common solid tumor in children. Types include medulloblastoma, glioma, ependymoma.' },
  glioblastoma:       { name:'Glioblastoma',                           link:'https://www.cancer.org/cancer/glioblastoma.html',                                tags:['Severe headache','Neurological changes','Seizures'], desc:'Most aggressive primary brain tumor. Despite treatment, typically recurs.' },
  medulloblastoma:    { name:'Medulloblastoma',                        link:'https://www.cancer.org/cancer/brain-spinal-cord-tumors-children.html',           tags:['Coordination problems','Headaches','Nausea'],       desc:'Fast-growing brain tumor in the cerebellum, most common in children.' },
  meningioma:         { name:'Meningioma',                             link:'https://www.cancer.org/cancer/brain-spinal-cord-tumors-adults.html',             tags:['Headaches','Vision changes','Weakness'],            desc:'Most common primary brain tumor. Most are benign and slow-growing.' },
  neuroblastoma:      { name:'Neuroblastoma',                          link:'https://www.cancer.org/cancer/neuroblastoma.html',                               tags:['Abdominal lump','Bone pain','Fatigue'],             desc:'Cancer of the peripheral nervous system, most often in adrenal glands of young children.' },
  leukemia_general:   { name:'Leukemia',                               link:'https://www.cancer.org/cancer/leukemia.html',                                    tags:['Fatigue','Easy bruising','Frequent infections'],    desc:'Cancer of blood-forming tissues. More common in adults over 55 and children under 15.' },
  all:                { name:'Acute Lymphocytic Leukemia (ALL)',        link:'https://www.cancer.org/cancer/acute-lymphocytic-leukemia.html',                  tags:['Fatigue','Bone pain','Enlarged lymph nodes'],       desc:'Fast-growing cancer of lymphoid cells; in adults more aggressive than in children.' },
  aml:                { name:'Acute Myeloid Leukemia (AML)',            link:'https://www.cancer.org/cancer/acute-myeloid-leukemia.html',                      tags:['Fatigue','Bleeding','Infections'],                  desc:'Most common acute leukemia in adults. Rapidly progressing; requires urgent treatment.' },
  cll:                { name:'Chronic Lymphocytic Leukemia (CLL)',      link:'https://www.cancer.org/cancer/chronic-lymphocytic-leukemia.html',                tags:['Swollen lymph nodes','Fatigue','Night sweats'],     desc:'Most common leukemia in adults in Western countries. Often initially observed.' },
  cml:                { name:'Chronic Myeloid Leukemia (CML)',          link:'https://www.cancer.org/cancer/chronic-myeloid-leukemia.html',                    tags:['Fatigue','Spleen enlargement','Weight loss'],       desc:'Driven by BCR-ABL gene mutation. Targeted therapies (TKIs) have dramatically improved outcomes.' },
  hodgkin:            { name:'Hodgkin Lymphoma',                        link:'https://www.cancer.org/cancer/hodgkin-lymphoma.html',                            tags:['Painless swollen nodes','Night sweats','Itching'],  desc:'Defined by Reed-Sternberg cells. Highly treatable, especially in younger patients.' },
  nhl:                { name:'Non-Hodgkin Lymphoma',                    link:'https://www.cancer.org/cancer/non-hodgkin-lymphoma.html',                        tags:['Swollen lymph nodes','Fever','Fatigue'],            desc:'Diverse group of blood cancers. Many subtypes with varying aggressiveness.' },
  myeloma:            { name:'Multiple Myeloma',                        link:'https://www.cancer.org/cancer/multiple-myeloma.html',                            tags:['Bone pain','Fatigue','Kidney problems'],            desc:'Cancer of plasma cells in bone marrow. New therapies have significantly extended survival.' },
  mds:                { name:'Myelodysplastic Syndromes',               link:'https://www.cancer.org/cancer/myelodysplastic-syndrome.html',                   tags:['Fatigue','Shortness of breath','Easy bleeding'],    desc:'Group of disorders with poorly formed blood cells. Can progress to AML.' },
  unknown_primary:    { name:'Cancer of Unknown Primary',               link:'https://www.cancer.org/cancer/cancer-unknown-primary.html',                     tags:['Varies by site','Unexplained symptoms','Metastatic'], desc:'Cancer found in the body when the original site cannot be determined (~2–5% of diagnoses).' },
  rare:               { name:'Rare Cancers & Pre-cancers',              link:'https://www.cancer.org/cancer.html',                                             tags:['Varies','Rare presentation','Specialized care'],   desc:'Uncommon cancers and precancerous conditions that don't fit neatly into other groupings.' },
};

// Hotspots: organ IDs to highlight + position as % of viewBox (105.43 × 194.70)
// x% and y% are positions in the SVG coordinate space
const HOTSPOTS = [
  { id:'brain',       system:'brain_ns',    label:'Brain & Nervous System',
     cancerIds:['brain_adults','brain_children','glioblastoma','medulloblastoma','meningioma','neuroblastoma'],
     px:49.5, py:5.5 },
  { id:'eye',         system:'eye',         label:'Eye',
     cancerIds:['eye_c','retinoblastoma'],
     px:58, py:11.5 },
  { id:'head_neck',   system:'head_neck',   label:'Head & Neck',
     cancerIds:['head_neck_general','laryngeal','nasal','nasopharyngeal','oral_oropharyngeal','salivary'],
     px:49.5, py:19 },
  { id:'endocrine',   system:'endocrine',   label:'Endocrine / Pituitary',
     cancerIds:['pituitary','thyroid','neuroendocrine','adrenal'],
     px:63, py:14 },
  { id:'lung',        system:'lung_chest',  label:'Lung & Chest',
     cancerIds:['lung','lung_net','mesothelioma','thymus'],
     px:31, py:35 },
  { id:'heart',       system:'blood_lymph', label:'Heart / Circulatory',
     cancerIds:['leukemia_general','all','aml','cll','cml','hodgkin','nhl','myeloma','mds'],
     px:49.5, py:37 },
  { id:'breast',      system:'breast',      label:'Breast',
     cancerIds:['breast','breast_men'],
     px:66, py:40 },
  { id:'skin',        system:'skin',        label:'Skin',
     cancerIds:['skin_general','basal_squamous','melanoma','merkel','kaposi','skin_lymphoma'],
     px:79, py:30 },
  { id:'liver',       system:'digestive',   label:'Liver & Bile Ducts',
     cancerIds:['liver','bile_duct','gallbladder'],
     px:66, py:52 },
  { id:'stomach',     system:'digestive',   label:'Stomach & Esophagus',
     cancerIds:['stomach','esophageal','gi_net','gist'],
     px:44, py:52 },
  { id:'kidney',      system:'urinary',     label:'Kidney & Adrenal',
     cancerIds:['kidney','wilms','adrenal'],
     px:31, py:54 },
  { id:'pancreas',    system:'digestive',   label:'Pancreas & Spleen',
     cancerIds:['pancreatic','pancreatic_net','small_intestine'],
     px:44, py:61 },
  { id:'intestine',   system:'digestive',   label:'Colorectal & Intestines',
     cancerIds:['colorectal','small_intestine','anal'],
     px:49.5, py:70 },
  { id:'bladder',     system:'urinary',     label:'Bladder',
     cancerIds:['bladder'],
     px:57, py:80 },
  { id:'repro',       system:'reproductive',label:'Reproductive System',
     cancerIds:['cervical','endometrial','ovarian','uterine_sarcoma','vaginal','vulvar','prostate','testicular','penile'],
     px:49.5, py:86 },
  { id:'lymph',       system:'blood_lymph', label:'Lymph Nodes',
     cancerIds:['hodgkin','nhl','myeloma','mds','leukemia_general'],
     px:22, py:60 },
  { id:'bone',        system:'bone_soft',   label:'Bone & Soft Tissue',
     cancerIds:['bone','ewing','osteosarcoma','rhabdomyosarcoma','soft_tissue','spinal'],
     px:22, py:80 },
  { id:'other',       system:'other',       label:'Other / Unknown',
     cancerIds:['unknown_primary','rare'],
     px:81, py:62 },
];

// ─── GENDER STATE ──────────────────────────────────────────────────────────
let currentGender = 'female';

function switchGender(g) {
  currentGender = g;
  document.getElementById('svg-container-female').style.display = g === 'female' ? '' : 'none';
  document.getElementById('svg-container-male').style.display   = g === 'male'   ? '' : 'none';
  document.getElementById('btn-female').classList.toggle('active', g === 'female');
  document.getElementById('btn-male').classList.toggle('active',   g === 'male');
  const img = document.getElementById(g === 'female' ? 'body-svg-female' : 'body-svg-male');
  const reposition = () => { positionHotspots(); if (activeHotspotId) activateHotspot(activeHotspotId); };
  if (img && (img.naturalWidth > 0 || img.complete)) { reposition(); }
  else if (img) { img.addEventListener('load', reposition, { once: true }); }
}

// ─── HOTSPOT RENDERING ──────────────────────────────────────────────────────
function getSVGElement() {
  const cid = currentGender === 'female' ? 'body-svg-female' : 'body-svg-male';
  return document.getElementById(cid);
}

function positionHotspots() {
  const layer = document.getElementById('hotspotLayer');
  layer.innerHTML = '';
  const bodyWrap = document.getElementById('bodyWrap');
  const svgEl = getSVGElement();
  if (!svgEl) return;

  const svgRect = svgEl.getBoundingClientRect();
  const wrapRect = bodyWrap.getBoundingClientRect();
  const offsetX = svgRect.left - wrapRect.left;
  const offsetY = svgRect.top  - wrapRect.top;
  const svgW = svgRect.width;
  const svgH = svgRect.height;

  HOTSPOTS.forEach(hs => {
    const sys = SYSTEMS[hs.system];
    const x = offsetX + (hs.px / 100) * svgW;
    const y = offsetY + (hs.py / 100) * svgH;

    const dot = document.createElement('div');
    dot.className = 'hs-dot';
    dot.id = 'hsdot-' + hs.id;
    dot.style.left = x + 'px';
    dot.style.top  = y + 'px';
    dot.style.setProperty('--dot-color', sys.color);
    dot.innerHTML = `
      <div class="hs-dot-ring">
        <div class="hs-dot-pulse"></div>
        <div class="hs-dot-core"></div>
      </div>`;
    dot.title = hs.label;
    dot.addEventListener('click', () => activateHotspot(hs.id));
    layer.appendChild(dot);
  });
}


// ─── ACTIVATE HOTSPOT ──────────────────────────────────────────────────────
let activeHotspotId = null;

function activateHotspot(id) {
  // deactivate previous
  if (activeHotspotId) {
    const prev = document.getElementById('hsdot-' + activeHotspotId);
    if (prev) prev.classList.remove('active');
  }
  activeHotspotId = id;

  const dot = document.getElementById('hsdot-' + id);
  if (dot) dot.classList.add('active');

  const hs = HOTSPOTS.find(h => h.id === id);
  if (!hs) return;
  const sys = SYSTEMS[hs.system];


  // Build info panel
  const panel = document.getElementById('infoPanel');
  panel.classList.add('active');
  panel.style.setProperty('--panel-accent', sys.color);

  const cancers = hs.cancerIds.map(cid => CANCERS[cid]).filter(Boolean);

  document.getElementById('panelContent').innerHTML = `
    <div class="panel-top">
      <div class="panel-glow" style="background:${sys.color}"></div>
      <div class="panel-badge" style="color:${sys.color};border-color:${sys.color}">
        ${sys.icon} &nbsp;${sys.label}
      </div>
      <div class="panel-region">${hs.label}</div>
      <div class="panel-count">${cancers.length} cancer type${cancers.length!==1?'s':''} in this region</div>
    </div>
    <div class="panel-body">
      ${cancers.map((c,i) => `
        <div class="cancer-item" data-idx="${i}">
          <div class="cancer-row">
            <a href="${c.link}" target="_blank" class="cancer-name-link">${c.name}</a>
            <span class="cancer-arrow">→</span>
          </div>
          <div class="cancer-tags">
            ${c.tags.map(t=>`<span class="ctag">${t}</span>`).join('')}
          </div>
          <div class="cancer-desc">${c.desc}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Toggle expand
  panel.querySelectorAll('.cancer-item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.tagName === 'A') return;
      item.classList.toggle('open');
    });
  });
}

// ─── SYSTEM GRID ──────────────────────────────────────────────────────────
function buildSysGrid() {
  const grid = document.getElementById('sysGrid');
  const counts = {};
  HOTSPOTS.forEach(h => { counts[h.system] = (counts[h.system]||0) + h.cancerIds.length; });

  Object.entries(SYSTEMS).forEach(([key, sys]) => {
    const n = counts[key] || 0;
    const hs = HOTSPOTS.find(h => h.system === key);
    const card = document.createElement('div');
    card.className = 'sys-card';
    card.style.setProperty('--sys-color', sys.color);
    card.innerHTML = `
      <div class="sys-icon">${sys.icon}</div>
      <div class="sys-label">${sys.label}</div>
      <div class="sys-cancers">${n} cancer type${n!==1?'s':''}</div>
    `;
    if (hs) card.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior:'smooth' });
      setTimeout(() => activateHotspot(hs.id), 400);
    });
    grid.appendChild(card);
  });
}

// ─── INIT ──────────────────────────────────────────────────────────────────
function initHotspots() {
  const img = document.getElementById('body-svg-female');
  if (!img) return;
  // If image already has dimensions, go immediately; otherwise wait for load
  if (img.naturalWidth > 0 || img.complete) {
    positionHotspots();
  } else {
    img.addEventListener('load', positionHotspots, { once: true });
  }
}

window.addEventListener('load', () => {
  // Fix line-height on containers
  ['svg-container-female','svg-container-male'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.lineHeight = '0';
  });

  buildSysGrid();   // always runs, no dependency on SVG
  initHotspots();   // waits for img if needed
});

// Re-position on resize
window.addEventListener('resize', () => { positionHotspots(); });
</script>
</body>
</html>