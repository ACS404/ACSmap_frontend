---
layout: opencs
hide: true
show_reading_time: false
---

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

<style>
/* ── RESET ───────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

#body-map-root {
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
  font-family: var(--sans);
  background: var(--cream);
  color: var(--text);
}

/* ── HERO BANNER ─────────────────────────────────────── */
#body-map-root .acs-hero {
  background: linear-gradient(135deg, var(--brown) 0%, #4a2e22 100%);
  padding: 56px 48px 48px;
  position: relative; overflow: hidden;
}
#body-map-root .acs-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(224,122,106,0.18) 0%, transparent 60%);
  pointer-events: none;
}
#body-map-root .hero-inner {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: center;
  position: relative; z-index: 1;
}
#body-map-root .hero-eyebrow {
  font-family: var(--sans);
  font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--rose-light);
  margin-bottom: 12px;
  display: flex; align-items: center; gap: 8px;
}
#body-map-root .hero-eyebrow::before {
  content: '♥'; font-size: 10px;
  width: 20px; height: 20px; background: var(--rose);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; flex-shrink: 0;
}
#body-map-root .hero-title {
  font-family: var(--serif);
  font-size: clamp(32px, 4.5vw, 58px);
  font-weight: 700; line-height: 1.08; color: #fff;
  letter-spacing: -0.3px;
}
#body-map-root .hero-title em { font-style: italic; color: var(--rose-light); }
#body-map-root .hero-sub {
  margin-top: 14px; font-size: 15px;
  color: rgba(255,255,255,0.55); line-height: 1.7;
  max-width: 500px;
}
#body-map-root .hero-stats {
  display: flex; gap: 28px; margin-top: 28px;
}
#body-map-root .hstat-num {
  font-family: var(--serif); font-size: 30px; font-weight: 700;
  color: var(--rose-light); line-height: 1;
}
#body-map-root .hstat-label {
  font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: rgba(255,255,255,0.4);
  margin-top: 3px;
}
#body-map-root .hero-cta {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 26px; background: var(--rose); color: #fff !important;
  font-weight: 700; font-size: 13px; letter-spacing: 0.06em;
  text-transform: uppercase; text-decoration: none;
  border-radius: 8px; align-self: flex-start;
  transition: background 0.2s, transform 0.15s;
  box-shadow: 0 4px 20px rgba(224,122,106,0.3);
}
#body-map-root .hero-cta:hover { background: var(--terra); transform: translateY(-2px); }
#body-map-root .hero-cta svg { width: 13px; height: 13px; }

/* ── MAIN LAYOUT ─────────────────────────────────────── */
#body-map-root .main-section {
  max-width: 1100px; margin: 0 auto;
  padding: 48px 48px 0;
}
#body-map-root .gender-row {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 32px; flex-wrap: wrap; gap: 12px;
}
#body-map-root .section-eyebrow {
  font-family: var(--sans); font-size: 11px; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--muted);
}
#body-map-root .gender-toggle {
  display: flex;
  background: var(--tan-light); border-radius: 8px;
  padding: 3px; border: 1px solid var(--border);
}
#body-map-root .gender-btn {
  padding: 8px 20px; border: none; background: transparent;
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  color: var(--muted); border-radius: 6px; cursor: pointer;
  transition: all 0.2s;
}
#body-map-root .gender-btn.active {
  background: var(--warm-white); color: var(--text);
  box-shadow: 0 2px 8px rgba(61,44,36,0.1);
}
#body-map-root .gender-btn:hover:not(.active) { color: var(--text); }

/* diagram + panel layout */
#body-map-root .diagram-area {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 40px; align-items: start;
}

/* ── SVG BODY WRAPPER ────────────────────────────────── */
#body-map-root .body-wrap {
  position: relative;
  width: 300px;
  flex-shrink: 0;
  line-height: 0;
}

#body-map-root #body-svg-female,
#body-map-root #body-svg-male {
  width: 300px;
  height: auto;
  display: block;
  filter: drop-shadow(0 8px 32px rgba(61,44,36,0.12));
}

/* Hotspot overlay - covers body-wrap exactly */
#body-map-root .hotspot-layer {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
}

#body-map-root .hs-dot {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: all; cursor: pointer;
  z-index: 10;
}
#body-map-root .hs-dot-ring {
  position: relative; width: 22px; height: 22px;
}
#body-map-root .hs-dot-core {
  position: absolute; top: 5px; left: 5px;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--dot-color);
  box-shadow: 0 0 6px var(--dot-color);
  transition: transform 0.2s, box-shadow 0.2s;
}
#body-map-root .hs-dot-pulse {
  position: absolute; inset: 0; border-radius: 50%;
  border: 2px solid var(--dot-color); opacity: 0.5;
  animation: hsPulse 2.2s ease-out infinite;
}
#body-map-root .hs-dot:hover .hs-dot-core,
#body-map-root .hs-dot.active .hs-dot-core {
  transform: scale(1.4);
  box-shadow: 0 0 14px var(--dot-color), 0 0 28px var(--dot-color);
}
#body-map-root .hs-dot.active .hs-dot-pulse { animation: none; opacity: 1; }

@keyframes hsPulse {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(2.8); opacity: 0; }
}

/* ── INFO PANEL ──────────────────────────────────────── */
#body-map-root .info-panel {
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
#body-map-root .info-panel.active {
  border-color: var(--panel-accent, var(--border));
  box-shadow: 0 8px 40px rgba(61,44,36,0.1);
}
#body-map-root .panel-top {
  padding: 24px 24px 20px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, var(--warm-white), var(--cream));
  position: relative; overflow: hidden;
}
#body-map-root .panel-glow {
  position: absolute; top: -40px; right: -40px;
  width: 140px; height: 140px; border-radius: 50%;
  background: var(--panel-accent, transparent);
  opacity: 0.1; pointer-events: none; transition: background 0.4s;
}
#body-map-root .panel-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 4px 12px; border-radius: 20px;
  background: rgba(196,168,130,0.12);
  border: 1px solid var(--border);
  font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; margin-bottom: 10px;
  transition: all 0.3s;
}
#body-map-root .panel-region {
  font-family: var(--serif); font-size: 24px; font-weight: 700;
  color: var(--text); line-height: 1.2; margin-bottom: 4px;
}
#body-map-root .panel-count { font-size: 12px; color: var(--muted); }
#body-map-root .panel-body {
  padding: 8px 0 16px; overflow-y: auto; flex: 1;
  max-height: 460px;
}
#body-map-root .cancer-item {
  display: flex; flex-direction: column;
  padding: 12px 24px;
  border-bottom: 1px solid rgba(196,168,130,0.15);
  cursor: pointer; transition: background 0.15s, padding-left 0.15s;
}
#body-map-root .cancer-item:last-child { border-bottom: none; }
#body-map-root .cancer-item:hover { background: rgba(196,168,130,0.06); padding-left: 28px; }
#body-map-root .cancer-item.open { background: var(--rose-pale); padding-left: 28px; }
#body-map-root .cancer-row {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
}
#body-map-root .cancer-name-link {
  font-size: 13px; font-weight: 700; color: var(--text);
  text-decoration: none; line-height: 1.3; transition: color 0.15s;
}
#body-map-root .cancer-item:hover .cancer-name-link,
#body-map-root .cancer-item.open .cancer-name-link { color: var(--rose); }
#body-map-root .cancer-arrow {
  font-size: 11px; color: var(--muted); flex-shrink: 0;
  margin-top: 2px; transition: transform 0.15s, color 0.15s;
}
#body-map-root .cancer-item:hover .cancer-arrow,
#body-map-root .cancer-item.open .cancer-arrow { transform: translateX(4px); color: var(--rose); }
#body-map-root .cancer-tags {
  display: flex; flex-wrap: wrap; gap: 4px; margin-top: 5px;
}
#body-map-root .ctag {
  font-size: 10px; padding: 2px 8px;
  background: rgba(196,168,130,0.12);
  border: 1px solid rgba(196,168,130,0.3);
  border-radius: 3px; color: var(--muted); font-weight: 500;
}
#body-map-root .cancer-desc {
  font-size: 12px; color: var(--muted); margin-top: 6px;
  line-height: 1.6; display: none;
  padding: 8px 12px; background: rgba(196,168,130,0.06);
  border-radius: 6px; border-left: 2px solid var(--rose-light);
}
#body-map-root .cancer-item.open .cancer-desc { display: block; }
#body-map-root .empty-state {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 60px 32px; text-align: center; gap: 14px;
  flex: 1;
}
#body-map-root .empty-icon {
  width: 54px; height: 54px; border-radius: 50%;
  background: var(--rose-pale); border: 1px solid var(--rose-light);
  display: flex; align-items: center; justify-content: center; font-size: 22px;
}
#body-map-root .empty-title {
  font-family: var(--serif); font-size: 18px; font-weight: 600; color: var(--text);
}
#body-map-root .empty-sub {
  font-size: 13px; color: var(--muted); line-height: 1.65; max-width: 240px;
}

/* ── BOTTOM CATEGORIES ────────────────────────────────── */
#body-map-root .categories-section {
  max-width: 1100px; margin: 0 auto;
  padding: 56px 48px 80px;
}
#body-map-root .cat-heading {
  font-family: var(--serif); font-size: clamp(28px,3vw,42px);
  font-weight: 700; color: var(--text); margin-bottom: 6px;
}
#body-map-root .cat-sub {
  font-size: 14px; color: var(--muted); margin-bottom: 36px; line-height: 1.6;
}
#body-map-root .cat-divider {
  height: 1px; background: var(--border); margin-bottom: 36px;
}
#body-map-root .sys-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
#body-map-root .sys-card {
  background: var(--warm-white);
  border: 1px solid var(--border);
  border-radius: 14px; padding: 20px;
  cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
  position: relative; overflow: hidden;
}
#body-map-root .sys-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--sys-color);
  border-radius: 14px 14px 0 0;
}
#body-map-root .sys-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(61,44,36,0.09);
}
#body-map-root .sys-icon { font-size: 22px; margin-bottom: 10px; }
#body-map-root .sys-label {
  font-family: var(--serif); font-size: 17px; font-weight: 700;
  color: var(--text); margin-bottom: 6px;
}
#body-map-root .sys-cancers {
  font-size: 11px; font-weight: 600; letter-spacing: 0.05em;
  text-transform: uppercase; color: var(--muted);
}
#body-map-root .sys-count {
  display: inline-block; margin-top: 8px;
  padding: 3px 10px; border-radius: 20px;
  background: var(--rose-pale); color: var(--terra);
  font-size: 10px; font-weight: 700; letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ── FADE-IN ──────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
#body-map-root .fade-in { animation: fadeUp 0.5s ease both; }

/* ── RESPONSIVE ───────────────────────────────────────── */
@media (max-width: 820px) {
  #body-map-root .acs-hero { padding: 36px 24px; }
  #body-map-root .hero-inner { grid-template-columns: 1fr; }
  #body-map-root .main-section { padding: 32px 24px 0; }
  #body-map-root .diagram-area { grid-template-columns: 1fr; }
  #body-map-root .body-wrap { margin: 0 auto; }
  #body-map-root .info-panel { position: static; }
  #body-map-root .categories-section { padding: 40px 24px 60px; }
}

/* ── BREAK OUT OF JEKYLL .WRAPPER PADDING ──────────────── */
/* The layout wraps content in .wrapper with padding. These rules
   let our full-bleed hero and categories sections escape it.    */
#body-map-root .acs-hero,
#body-map-root .categories-section {
  margin-left: -48px;
  margin-right: -48px;
  padding-left: 48px;
  padding-right: 48px;
}
@media (max-width: 768px) {
  #body-map-root .acs-hero,
  #body-map-root .categories-section {
    margin-left: -20px;
    margin-right: -20px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
/* Remove the extra top padding from .page-content since hero handles its own spacing */
.page-content {
  padding-top: 64px !important;
}
</style>

<div id="body-map-root">

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
      <button class="gender-btn active" id="bm-btn-female" onclick="bmSwitchGender('female')">♀ Female</button>
      <button class="gender-btn" id="bm-btn-male" onclick="bmSwitchGender('male')">♂ Male</button>
    </div>
  </div>

  <div class="diagram-area fade-in">
    <!-- SVG Body -->
    <div class="body-wrap" id="bmBodyWrap">
      <div id="bm-svg-container-female">
        <img src="{{ site.baseurl }}/shinybody-main/inst/svgs/homo_sapiens_female.svg"
             id="bm-body-svg-female" style="width:300px;display:block;" />
      </div>
      <div id="bm-svg-container-male" style="display:none">
        <img src="{{ site.baseurl }}/shinybody-main/inst/svgs/homo_sapiens_male.svg"
             id="bm-body-svg-male" style="width:300px;display:block;" />
      </div>
      <!-- Hotspot overlay — uses CSS % positioning, no JS measurement needed -->
      <div class="hotspot-layer" id="bmHotspotLayer"></div>
    </div>

    <!-- Info Panel -->
    <div class="info-panel" id="bmInfoPanel">
      <div id="bmPanelContent">
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
  <div class="sys-grid" id="bmSysGrid"></div>
</div>

</div><!-- #body-map-root -->

<script>
// ─── DATA ──────────────────────────────────────────────────────────────────
const BM_SYSTEMS = {
  head_neck:    { label:'Head & Neck',           color:'#c45e4a', icon:'🗣️' },
  lung_chest:   { label:'Lung & Chest',           color:'#6a9fd8', icon:'🫁' },
  breast:       { label:'Breast',                 color:'#d97fb8', icon:'🎗️' },
  digestive:    { label:'Digestive System',       color:'#c49a3c', icon:'🫃' },
  urinary:      { label:'Urinary System',         color:'#7a9e7e', icon:'🫘' },
  reproductive: { label:'Reproductive System',    color:'#a07cc5', icon:'🌸' },
  endocrine:    { label:'Endocrine System',       color:'#d4845a', icon:'⚗️' },
  skin:         { label:'Skin',                   color:'#bca36d', icon:'☀️' },
  bone_soft:    { label:'Bone & Soft Tissue',     color:'#7a8fa6', icon:'🦴' },
  eye:          { label:'Eye',                    color:'#5aabb5', icon:'👁️' },
  brain_ns:     { label:'Brain & Nervous System', color:'#9b7ec8', icon:'🧠' },
  blood_lymph:  { label:'Blood & Lymph',          color:'#e07a6a', icon:'🩸' },
  other:        { label:'Other Cancers',          color:'#937468', icon:'🔬' },
};

const BM_CANCERS = {
 head_neck_general:  { name:'Head and Neck Cancers',                link:'https://www.cancer.org/cancer/head-neck-cancer.html',                          tags:['Sore throat','Hoarseness','Difficulty swallowing'], desc:'A broad group of cancers affecting the mouth, throat, voice box, and sinuses. A persistent sore throat, hoarseness that won\'t go away, or trouble swallowing are key warning signs. Tobacco, alcohol, and HPV are the biggest risk factors. Treatment depends on location and stage but usually involves surgery, radiation, or chemo — often in combination.' },
laryngeal:          { name:'Laryngeal & Hypopharyngeal Cancer',     link:'https://www.cancer.org/cancer/laryngeal-hypopharyngeal-cancer.html',            tags:['Hoarseness','Sore throat','Ear pain'],              desc:'Affects the voice box and lower throat, causing hoarseness that lasts more than 2 weeks, chronic sore throat, and ear pain. Strongly linked to smoking and heavy alcohol use. Caught early it\'s very treatable with radiation or surgery. Advanced cases may require removal of the voice box, though speech therapy can help restore communication.' },
nasal:              { name:'Nasal Cavity & Paranasal Sinus Cancer', link:'https://www.cancer.org/cancer/nasal-cavity-paranasal-sinus-cancer.html',        tags:['Nasal blockage','Nosebleeds','Facial pain'],        desc:'A rare cancer that can mimic chronic sinusitis — persistent nasal blockage on one side, frequent nosebleeds, and facial pain or pressure are common signs. Often diagnosed late because symptoms are easy to dismiss. Treatment typically involves surgery to remove the tumor followed by radiation.' },
nasopharyngeal:     { name:'Nasopharyngeal Cancer',                 link:'https://www.cancer.org/cancer/nasopharyngeal-cancer.html',                      tags:['Neck lump','Hearing loss','Nasal congestion'],      desc:'Develops in the upper throat behind the nose. A painless lump in the neck is often the first noticed sign, along with hearing loss or ringing in one ear and nasal congestion. More common in Southeast Asia and linked to the Epstein-Barr virus. Radiation is the primary treatment, often combined with chemo for advanced cases.' },
oral_oropharyngeal: { name:'Oral Cavity & Oropharyngeal Cancer',    link:'https://www.cancer.org/cancer/oral-cavity-oropharyngeal-cancer.html',           tags:['Mouth sore','Jaw pain','Difficulty chewing'],       desc:'Covers cancers of the lips, tongue, gums, and throat. A mouth sore that won\'t heal, jaw pain, and difficulty chewing or swallowing are warning signs to take seriously. HPV is now a leading cause in younger non-smokers. Early-stage cancers are highly treatable with surgery or radiation — the HPV vaccine is an important prevention tool.' },
salivary:           { name:'Salivary Gland Cancer',                 link:'https://www.cancer.org/cancer/salivary-gland-cancer.html',                      tags:['Facial swelling','Facial numbness','Jaw pain'],     desc:'A rare cancer arising in the glands that produce saliva near the jaw and neck. Swelling around the jaw or cheek, facial numbness, and jaw pain are common signs. Unlike many head and neck cancers it isn\'t strongly linked to tobacco or alcohol. Surgery is the main treatment, with radiation added for higher-grade tumors.' },
  thyroid:            { name:'Thyroid Cancer',                        link:'https://www.cancer.org/cancer/thyroid-cancer.html',                             tags:['Neck lump','Hoarseness','Swallowing problems'],    desc:'Most common endocrine cancer. Usually very treatable.' },
  lung:               { name:'Lung Cancer',                           link:'https://www.cancer.org/cancer/lung-cancer.html',                                tags:['Persistent cough','Chest pain','Shortness of breath'], desc:'Leading cause of cancer death in the US. Strongly linked to smoking.' },
  lung_net:           { name:'Lung Neuroendocrine Tumor',             link:'https://www.cancer.org/cancer/lung-cancer/about/what-is.html',                  tags:['Cough','Wheezing','Flushing'],                      desc:'A subtype of lung tumor from neuroendocrine cells. Ranges from slow-growing to aggressive.' },
  mesothelioma:       { name:'Mesothelioma',                          link:'https://www.cancer.org/cancer/malignant-mesothelioma.html',                     tags:['Chest pain','Shortness of breath','Asbestos exposure'], desc:'Rare cancer of the lining of the lungs, strongly linked to asbestos exposure.' },
  thymus:             { name:'Thymus Cancer',                         link:'https://www.cancer.org/cancer/thymoma.html',                                    tags:['Chest pain','Cough','Difficulty swallowing'],      desc:'Rare cancers of the thymus gland in the chest.' },
  breast:             { name:'Breast Cancer',                         link:'https://www.cancer.org/cancer/breast-cancer.html',                              tags:['Lump','Skin changes','Nipple discharge'],           desc:'Most common cancer in American women. Regular mammograms are critical for early detection.' },
  breast_men:         { name:'Breast Cancer in Men',                  link:'https://www.cancer.org/cancer/breast-cancer-in-men.html',                       tags:['Breast lump','Nipple changes','Skin changes'],      desc:'Though rare, men can develop breast cancer. BRCA2 gene mutations increase risk.' },
  anal:               { name:'Anal Cancer',                           link:'https://www.cancer.org/cancer/anal-cancer.html',                                tags:['Rectal bleeding','Anal pain','Lump near anus'],     desc:'Cancer of the anal canal, increasingly linked to HPV infection.' },
  bile_duct:          { name:'Bile Duct Cancer (Cholangiocarcinoma)', link:'https://www.cancer.org/cancer/bile-duct-cancer.html',                           tags:['Jaundice','Abdominal pain','Itching'],              desc:'Develops in the tubes that carry bile from the liver to the small intestine. Jaundice (yellowing skin and eyes), persistent abdominal pain, and intense itching from bile buildup are the most common signs. Often diagnosed late because symptoms are subtle early on. Treatment usually involves surgery when possible, combined with radiation or chemo for advanced cases.' }, 
  colorectal:         { name:'Colorectal Cancer',                     link:'https://www.cancer.org/cancer/colon-rectal-cancer.html',                        tags:['Blood in stool','Bowel changes','Cramping'],        desc:'Third most common cancer in the US. Colonoscopy from age 45 is highly effective.' },
  esophageal:         { name:'Esophageal Cancer',                     link:'https://www.cancer.org/cancer/esophagus-cancer.html',                           tags:['Difficulty swallowing','Weight loss','Chest pain'], desc:'Risk factors include GERD, Barrett\'s esophagus, tobacco, and alcohol.' },
  gallbladder:        { name:'Gallbladder Cancer',                    link:'https://www.cancer.org/cancer/gallbladder-cancer.html',                         tags:['Abdominal pain','Jaundice','Nausea'],               desc:'A rare cancer that is hard to catch early since the gallbladder is hidden behind the liver and early symptoms are easy to mistake for gallstones — abdominal pain, jaundice, and nausea are the main signs. Often discovered accidentally during gallbladder removal surgery. Surgery is the only curative option, so early detection is critical. Those with a history of gallstones or chronic inflammation are at higher risk.' }, 
  gi_net:             { name:'GI Neuroendocrine (Carcinoid) Tumors',  link:'https://www.cancer.org/cancer/gastrointestinal-carcinoid-tumor.html',           tags:['Flushing','Diarrhea','Abdominal pain'],             desc:'Slow-growing tumors from neuroendocrine cells of the GI tract.' },
  gist:               { name:'Gastrointestinal Stromal Tumor (GIST)', link:'https://www.cancer.org/cancer/gastrointestinal-stromal-tumor.html',             tags:['Abdominal pain','GI bleeding','Early fullness'],    desc:'Rare tumors in the walls of the GI tract.' },
 liver:              { name:'Liver Cancer',                          link:'https://www.cancer.org/cancer/liver-cancer.html',                               tags:['Abdominal pain','Jaundice','Weight loss'],          desc:'Primary liver cancer usually develops from cirrhosis, hepatitis B or C, or heavy alcohol use. Symptoms include upper abdominal pain, yellowing of the skin and eyes, and rapid unexplained weight loss. Treatment options include surgery, ablation, targeted therapy, and immunotherapy — outcomes are best when caught early, so high-risk individuals should get regular ultrasounds and AFP blood tests.' }, 
  pancreatic:         { name:'Pancreatic Cancer',                     link:'https://www.cancer.org/cancer/pancreatic-cancer.html',                          tags:['Back pain','Jaundice','Weight loss'],               desc:'One of the hardest cancers to detect early.' },
  pancreatic_net:     { name:'Pancreatic Neuroendocrine Tumor',       link:'https://www.cancer.org/cancer/pancreatic-cancer/about/what-is-pancreatic-cancer.html', tags:['Low blood sugar','Abdominal pain','Diarrhea'], desc:'A subtype from hormone-producing cells. Generally slower-growing.' },
  small_intestine:    { name:'Small Intestine Cancer',                link:'https://www.cancer.org/cancer/small-intestine-cancer.html',                     tags:['Abdominal pain','Weight loss','Blood in stool'],    desc:'Rare cancer of the small bowel. Several subtypes exist.' },
  stomach:            { name:'Stomach Cancer',                        link:'https://www.cancer.org/cancer/stomach-cancer.html',                             tags:['Indigestion','Nausea','Weight loss'],               desc:'H. pylori infection, diet, and smoking are major risk factors.' },
  bladder:            { name:'Bladder Cancer',                        link:'https://www.cancer.org/cancer/bladder-cancer.html',                             tags:['Blood in urine','Urinary frequency','Pelvic pain'], desc:'Common urologic cancer. Smoking is the leading risk factor.' },
  kidney:             { name:'Kidney Cancer',                         link:'https://www.cancer.org/cancer/kidney-cancer.html',                              tags:['Blood in urine','Flank pain','Lump in side'],       desc:'Renal cell carcinoma is the most common type.' },
  wilms:              { name:'Wilms Tumor',                           link:'https://www.cancer.org/cancer/wilms-tumor.html',                                tags:['Abdominal swelling','Flank pain','Fever'],          desc:'Rare kidney cancer primarily affecting children.' },
  cervical:           { name:'Cervical Cancer',                       link:'https://www.cancer.org/cancer/cervical-cancer.html',                            tags:['Irregular bleeding','Pelvic pain','Discharge'],     desc:'Almost all caused by HPV. Pap smears and HPV vaccines are highly effective prevention.',  reproGender:'female' },
  endometrial:        { name:'Endometrial Cancer',                    link:'https://www.cancer.org/cancer/endometrial-cancer.html',                         tags:['Abnormal bleeding','Pelvic pain','Weight loss'],    desc:'Most common gynecologic cancer in the US.',                                               reproGender:'female' },
  ovarian:            { name:'Ovarian Cancer',                        link:'https://www.cancer.org/cancer/ovarian-cancer.html',                             tags:['Bloating','Pelvic pain','Early fullness'],          desc:'Called the "silent killer" due to vague early symptoms.',                                 reproGender:'female' },
  uterine_sarcoma:    { name:'Uterine Sarcoma',                       link:'https://www.cancer.org/cancer/uterine-sarcoma.html',                            tags:['Abnormal bleeding','Pelvic pain','Uterine mass'],   desc:'Rare, aggressive cancer from the muscle/connective tissue of the uterus.',                reproGender:'female' },
  vaginal:            { name:'Vaginal Cancer',                        link:'https://www.cancer.org/cancer/vaginal-cancer.html',                             tags:['Vaginal bleeding','Discharge','Pelvic pain'],       desc:'Rare cancer of the vaginal lining. HPV is the primary risk factor.',                      reproGender:'female' },
  vulvar:             { name:'Vulvar Cancer',                         link:'https://www.cancer.org/cancer/vulvar-cancer.html',                              tags:['Itching','Skin changes','Lump'],                    desc:'Cancer of the external female genitalia.',                                                reproGender:'female' },
  penile:             { name:'Penile Cancer',                         link:'https://www.cancer.org/cancer/penile-cancer.html',                              tags:['Skin changes','Sores','Discharge'],                 desc:'A rare cancer of the penis, often linked to HPV.',                                        reproGender:'male' },
  prostate:           { name:'Prostate Cancer',                       link:'https://www.cancer.org/cancer/prostate-cancer.html',                            tags:['Urinary changes','Pelvic discomfort','Bone pain'],  desc:'Most common cancer in American men. PSA screening recommended starting at age 50.',       reproGender:'male' },
  testicular:         { name:'Testicular Cancer',                     link:'https://www.cancer.org/cancer/testicular-cancer.html',                          tags:['Testicular lump','Swelling','Dull ache'],           desc:'Most common in men aged 15–35. Highly treatable.',                                        reproGender:'male' },
  neuroendocrine:     { name:'Neuroendocrine Tumors',                 link:'https://www.cancer.org/cancer/gastrointestinal-carcinoid-tumor.html',           tags:['Flushing','Diarrhea','Wheezing'],                   desc:'Tumors from neuroendocrine cells throughout the body.' },
  adrenal:            { name:'Adrenal Cancer',                        link:'https://www.cancer.org/cancer/adrenal-cancer.html',                             tags:['Abdominal pain','Hormonal changes','Weight gain'],  desc:'Rare cancer of the adrenal glands. May produce excess hormones.' },
  pituitary:          { name:'Pituitary Tumors',                      link:'https://www.cancer.org/cancer/pituitary-tumors.html',                           tags:['Headaches','Vision changes','Hormonal imbalance'],  desc:'Most are benign adenomas but cause significant hormonal and neurological effects.' },
  skin_general:       { name:'Skin Cancer',                           link:'https://www.cancer.org/cancer/skin-cancer.html',                                tags:['New moles','Changing spots','Non-healing sores'],   desc:'Most common cancer overall. UV exposure is the primary risk factor.' },
  basal_squamous:     { name:'Basal & Squamous Cell Skin Cancer',     link:'https://www.cancer.org/cancer/basal-squamous-cell-skin-cancer.html',            tags:['Pearly bump','Flat lesion','Bleeding sore'],        desc:'Most common skin cancers. Rarely spread but should be treated promptly.' },
  kaposi:             { name:'Kaposi Sarcoma',                        link:'https://www.cancer.org/cancer/kaposi-sarcoma.html',                             tags:['Skin lesions','Mouth sores','Lymph node swelling'], desc:'Caused by HHV-8 virus, commonly associated with HIV/AIDS.' },
  skin_lymphoma:      { name:'Lymphoma of the Skin',                  link:'https://www.cancer.org/cancer/lymphoma-skin.html',                              tags:['Skin patches','Itching','Tumors on skin'],          desc:'Non-Hodgkin lymphoma originating in the skin.' },
  melanoma:           { name:'Melanoma Skin Cancer',                  link:'https://www.cancer.org/cancer/melanoma-skin-cancer.html',                       tags:['Asymmetric mole','Irregular border','Color variation'], desc:'Most dangerous form of skin cancer. Can spread to other organs if not caught early.' },
  merkel:             { name:'Merkel Cell Skin Cancer',               link:'https://www.cancer.org/cancer/merkel-cell-skin-cancer.html',                    tags:['Firm skin lump','Reddish nodule','Fast growth'],    desc:'Rare and aggressive skin cancer linked to Merkel cell polyomavirus and UV exposure.' },
  bone:               { name:'Bone Cancer',                           link:'https://www.cancer.org/cancer/bone-cancer.html',                                tags:['Bone pain','Swelling','Fractures'],                 desc:'Primary bone cancers are rare. Types include osteosarcoma, Ewing sarcoma, chondrosarcoma.' },
  ewing:              { name:'Ewing Sarcoma',                         link:'https://www.cancer.org/cancer/ewing-tumor.html',                                tags:['Bone pain','Swelling','Fever'],                     desc:'Malignant tumor in bones or soft tissue, most common in children and young adults.' },
  osteosarcoma:       { name:'Osteosarcoma',                          link:'https://www.cancer.org/cancer/osteosarcoma.html',                               tags:['Bone pain','Swelling near joint','Fracture'],       desc:'Most common primary bone cancer, usually near the knee or shoulder in adolescents.' },
  rhabdomyosarcoma:   { name:'Rhabdomyosarcoma',                      link:'https://www.cancer.org/cancer/rhabdomyosarcoma.html',                           tags:['Lump or swelling','Bulging eye','Bloody discharge'], desc:'Cancer of soft tissue from skeletal muscle cells; most common in children.' },
  soft_tissue:        { name:'Soft Tissue Sarcomas',                  link:'https://www.cancer.org/cancer/soft-tissue-sarcoma.html',                        tags:['Growing lump','Pain','Limited range of motion'],    desc:'Rare cancers of fat, muscle, blood vessels, and deep skin.' },
  spinal:             { name:'Spinal Tumors',                         link:'https://www.cancer.org/cancer/brain-spinal-cord-tumors-adults.html',            tags:['Back pain','Weakness','Numbness'],                  desc:'Tumors can arise from the spinal cord or surrounding structures.' },
 eye_c:              { name:'Eye Cancer (Ocular Melanoma)',          link:'https://www.cancer.org/cancer/eye-cancer.html',                                 tags:['Vision changes','Floaters','Flashes of light'],     desc:'Develops in the pigment cells of the eye, often causing blurry vision, increasing floaters, or flashes of light — though many people have no symptoms at all early on. Usually treated with radiation therapy or surgery. Regular eye exams are key since it\'s often caught during a routine checkup.' },
retinoblastoma:     { name:'Retinoblastoma',                        link:'https://www.cancer.org/cancer/retinoblastoma.html',                             tags:['White pupil reflex','Crossed eyes','Vision problems'], desc:'A rare eye cancer almost always affecting children under 5. The most telling sign is a white glow in the pupil visible in photos taken with flash. Crossed eyes and vision problems can also appear. Highly treatable when caught early — options include laser therapy, chemo, and in some cases surgery to remove the eye.' },
  brain_adults:       { name:'Brain Tumors in Adults',                link:'https://www.cancer.org/cancer/brain-spinal-cord-tumors-adults.html',            tags:['Headaches','Seizures','Cognitive changes'],         desc:'Brain tumors cause worsening morning headaches, seizures, and memory or personality changes depending on where they grow. They can start in the brain or spread from another cancer. Treatment usually involves surgery, radiation, and chemo — see a neuro-oncologist and ask about clinical trials.' },
brain_children:     { name:'Brain Tumors in Children',             link:'https://www.cancer.org/cancer/brain-spinal-cord-tumors-children.html',          tags:['Headaches','Nausea','Balance problems'],            desc:'The most common solid cancer in kids. Tumors pressing on the brain cause morning headaches, vomiting, and balance or walking issues. Treatment is usually surgery first, then radiation and chemo. A pediatric neuro-oncology team gives the best outcomes.' },
glioblastoma:       { name:'Glioblastoma',                          link:'https://www.cancer.org/cancer/glioblastoma.html',                               tags:['Severe headache','Neurological changes','Seizures'], desc:'The most aggressive brain tumor. Rapid growth causes intense headaches, new-onset seizures, and sudden weakness or speech problems. Treatment is surgery followed by radiation and temozolomide chemo. Ask your doctor about Tumor Treating Fields (TTFields) and open clinical trials.' },
medulloblastoma:    { name:'Medulloblastoma',                       link:'https://www.cancer.org/cancer/brain-spinal-cord-tumors-children.html',          tags:['Coordination problems','Headaches','Nausea'],       desc:'A fast-growing tumor in the cerebellum that disrupts balance, causing stumbling, headaches, and nausea. Most common in children and can spread through spinal fluid. Treated with surgery, then radiation to the brain and spine plus chemo. Many kids reach long-term remission.' },
meningioma:         { name:'Meningioma',                            link:'https://www.cancer.org/cancer/brain-spinal-cord-tumors-adults.html',            tags:['Headaches','Vision changes','Weakness'],            desc:'Usually benign and slow-growing. As it presses on the brain it causes dull headaches, blurred vision, or arm and leg weakness over time. Small tumors are often just monitored with regular MRIs. When treatment is needed, surgery is the main option, sometimes with radiation.' },
neuroblastoma:      { name:'Neuroblastoma',                         link:'https://www.cancer.org/cancer/neuroblastoma.html',                              tags:['Abdominal lump','Bone pain','Fatigue'],             desc:'Affects children under 5, usually starting in the adrenal glands. A firm belly lump is often the first sign, along with bone pain and extreme tiredness from the tumor crowding out healthy blood cells. Treatment depends on risk level and can include surgery, chemo, radiation, and immunotherapy.' },
  leukemia_general:   { name:'Leukemia',                              link:'https://www.cancer.org/cancer/leukemia.html',                                   tags:['Fatigue','Easy bruising','Frequent infections'],    desc:'Cancer of blood-forming tissues. More common in adults over 55 and children under 15.' },
  all:                { name:'Acute Lymphocytic Leukemia (ALL)',       link:'https://www.cancer.org/cancer/acute-lymphocytic-leukemia.html',                 tags:['Fatigue','Bone pain','Enlarged lymph nodes'],       desc:'Fast-growing cancer of lymphoid cells; most curable leukemia in children.' },
  aml:                { name:'Acute Myeloid Leukemia (AML)',           link:'https://www.cancer.org/cancer/acute-myeloid-leukemia.html',                     tags:['Fatigue','Bleeding','Infections'],                  desc:'Most common acute leukemia in adults. Rapidly progressing.' },
  cll:                { name:'Chronic Lymphocytic Leukemia (CLL)',     link:'https://www.cancer.org/cancer/chronic-lymphocytic-leukemia.html',               tags:['Swollen lymph nodes','Fatigue','Night sweats'],     desc:'Most common leukemia in adults in Western countries.' },
  cml:                { name:'Chronic Myeloid Leukemia (CML)',         link:'https://www.cancer.org/cancer/chronic-myeloid-leukemia.html',                   tags:['Fatigue','Spleen enlargement','Weight loss'],       desc:'Driven by BCR-ABL gene mutation. Targeted therapies have dramatically improved outcomes.' },
  hodgkin:            { name:'Hodgkin Lymphoma',                       link:'https://www.cancer.org/cancer/hodgkin-lymphoma.html',                           tags:['Painless swollen nodes','Night sweats','Itching'],  desc:'Defined by Reed-Sternberg cells. Highly treatable, especially in younger patients.' },
  nhl:                { name:'Non-Hodgkin Lymphoma',                   link:'https://www.cancer.org/cancer/non-hodgkin-lymphoma.html',                       tags:['Swollen lymph nodes','Fever','Fatigue'],            desc:'Diverse group of blood cancers. Many subtypes with varying aggressiveness.' },
  myeloma:            { name:'Multiple Myeloma',                       link:'https://www.cancer.org/cancer/multiple-myeloma.html',                           tags:['Bone pain','Fatigue','Kidney problems'],            desc:'Cancer of plasma cells in bone marrow.' },
  mds:                { name:'Myelodysplastic Syndromes',              link:'https://www.cancer.org/cancer/myelodysplastic-syndrome.html',                  tags:['Fatigue','Shortness of breath','Easy bleeding'],    desc:'Group of disorders with poorly formed blood cells. Can progress to AML.' },
  unknown_primary:    { name:'Cancer of Unknown Primary',              link:'https://www.cancer.org/cancer/cancer-unknown-primary.html',                    tags:['Varies by site','Unexplained symptoms','Metastatic'], desc:'Cancer found in the body when the original site cannot be determined.' },
  rare:               { name:'Rare Cancers & Pre-cancers',             link:'https://www.cancer.org/cancer.html',                                            tags:['Varies','Rare presentation','Specialized care'],   desc:'Uncommon cancers and precancerous conditions.' },
};

// ─── HOTSPOTS ─────────────────────────────────────────────────────────────
// px/py are CSS % positions on the body-wrap container
// Derived from actual SVG organ coordinates (viewBox 105×195)
const BM_HOTSPOTS = [
  { id:'brain',     system:'brain_ns',    label:'Brain & Nervous System',
    cancerIds:['brain_adults','brain_children','glioblastoma','medulloblastoma','meningioma','neuroblastoma'],
    px:50, py:4 },
  { id:'eye',       system:'eye',         label:'Eye',
    cancerIds:['eye_c','retinoblastoma'],
    px:56, py:8 },
  { id:'head_neck', system:'head_neck',   label:'Head & Neck',
    cancerIds:['head_neck_general','laryngeal','nasal','nasopharyngeal','oral_oropharyngeal','salivary'],
    px:50, py:12 },
  { id:'endocrine', system:'endocrine',   label:'Endocrine / Thyroid',
    cancerIds:['thyroid','pituitary','neuroendocrine','adrenal'],
    px:50, py:18 },
  { id:'lung',      system:'lung_chest',  label:'Lung & Chest',
    cancerIds:['lung','lung_net','mesothelioma','thymus'],
    px:40, py:29 },
  { id:'heart',     system:'blood_lymph', label:'Blood / Heart',
    cancerIds:['leukemia_general','all','aml','cll','cml','myeloma','mds'],
    px:50, py:25 },
  { id:'breast',    system:'breast',      label:'Breast',
    cancerIds:['breast','breast_men'],
    px:60, py:26 },
  { id:'skin',      system:'skin',        label:'Skin',
    cancerIds:['skin_general','basal_squamous','melanoma','merkel','kaposi','skin_lymphoma'],
    px:60, py:70 },
  { id:'liver',     system:'digestive',   label:'Liver & Bile Ducts',
    cancerIds:['liver','bile_duct','gallbladder'],
    px:60, py:34 },
  { id:'stomach',   system:'digestive',   label:'Stomach & Esophagus',
    cancerIds:['stomach','esophageal','gi_net','gist'],
    px:41, py:37 },
  { id:'kidney',    system:'urinary',     label:'Kidney',
    cancerIds:['kidney','wilms'],
    px:58, py:37 },
  { id:'lymph',     system:'blood_lymph', label:'Lymph Nodes',
    cancerIds:['hodgkin','nhl'],
    px:34, py:22 },
  { id:'pancreas',  system:'digestive',   label:'Pancreas & Spleen',
    cancerIds:['pancreatic','pancreatic_net','small_intestine'],
    px:52, py:42 },
  { id:'intestine', system:'digestive',   label:'Colorectal & Intestines',
    cancerIds:['colorectal','small_intestine','anal'],
    px:55, py:46 },
  { id:'bladder',   system:'urinary',     label:'Bladder',
    cancerIds:['bladder'],
    px:45, py:46 },
  { id:'repro',     system:'reproductive',label:'Reproductive System',
    cancerIds:['cervical','endometrial','ovarian','uterine_sarcoma','vaginal','vulvar','prostate','testicular','penile'],
    px:50, py:49.5 },
  { id:'bone',      system:'bone_soft',   label:'Bone & Soft Tissue',
    cancerIds:['bone','ewing','osteosarcoma','rhabdomyosarcoma','soft_tissue','spinal'],
    px:42, py:72 },
  { id:'other',     system:'other',       label:'Other / Unknown',
    cancerIds:['unknown_primary','rare'],
    px:89, py:48 },
];

// ─── GENDER STATE ──────────────────────────────────────────────────────────
let bmGender = 'female';
let bmActiveId = null;

function bmSwitchGender(g) {
  bmGender = g;
  document.getElementById('bm-svg-container-female').style.display = g === 'female' ? '' : 'none';
  document.getElementById('bm-svg-container-male').style.display   = g === 'male'   ? '' : 'none';
  document.getElementById('bm-btn-female').classList.toggle('active', g === 'female');
  document.getElementById('bm-btn-male').classList.toggle('active',   g === 'male');
  // Hotspots use CSS %, so no repositioning needed
  if (bmActiveId) bmActivateHotspot(bmActiveId);
}

// ─── HOTSPOT RENDERING ─────────────────────────────────────────────────────
// Uses CSS percentage positioning — no getBoundingClientRect, no timing issues
function bmBuildHotspots() {
  const layer = document.getElementById('bmHotspotLayer');
  layer.innerHTML = '';
  BM_HOTSPOTS.forEach(hs => {
    const sys = BM_SYSTEMS[hs.system];
    const dot = document.createElement('div');
    dot.className = 'hs-dot';
    dot.id = 'bm-hsdot-' + hs.id;
    dot.style.left = hs.px + '%';
    dot.style.top  = hs.py + '%';
    dot.style.setProperty('--dot-color', sys.color);
    dot.innerHTML = `<div class="hs-dot-ring"><div class="hs-dot-pulse"></div><div class="hs-dot-core"></div></div>`;
    dot.title = hs.label;
    dot.addEventListener('click', () => bmActivateHotspot(hs.id));
    layer.appendChild(dot);
  });
}

// ─── ACTIVATE HOTSPOT ──────────────────────────────────────────────────────
function bmActivateHotspot(id) {
  if (bmActiveId) {
    const prev = document.getElementById('bm-hsdot-' + bmActiveId);
    if (prev) prev.classList.remove('active');
  }
  bmActiveId = id;
  const dot = document.getElementById('bm-hsdot-' + id);
  if (dot) dot.classList.add('active');

  const hs = BM_HOTSPOTS.find(h => h.id === id);
  if (!hs) return;
  const sys = BM_SYSTEMS[hs.system];
  const panel = document.getElementById('bmInfoPanel');
  panel.classList.add('active');
  panel.style.setProperty('--panel-accent', sys.color);

  const cancers = hs.cancerIds.map(cid => BM_CANCERS[cid]).filter(c => {
    if (!c) return false;
    if (c.reproGender) return c.reproGender === bmGender;
    return true;
  });

  document.getElementById('bmPanelContent').innerHTML = `
    <div class="panel-top">
      <div class="panel-glow" style="background:${sys.color}"></div>
      <div class="panel-badge" style="color:${sys.color};border-color:${sys.color}">${sys.icon}&nbsp;${sys.label}</div>
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
          <div class="cancer-tags">${c.tags.map(t=>`<span class="ctag">${t}</span>`).join('')}</div>
          <div class="cancer-desc">${c.desc}</div>
        </div>`).join('')}
    </div>`;

  panel.querySelectorAll('.cancer-item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.tagName === 'A') return;
      item.classList.toggle('open');
    });
  });
}

// ─── SYSTEM GRID ──────────────────────────────────────────────────────────
function bmBuildSysGrid() {
  const grid = document.getElementById('bmSysGrid');
  if (!grid) return;
  const counts = {};
  BM_HOTSPOTS.forEach(h => { counts[h.system] = (counts[h.system]||0) + h.cancerIds.length; });

  Object.entries(BM_SYSTEMS).forEach(([key, sys]) => {
    const n = counts[key] || 0;
    const hs = BM_HOTSPOTS.find(h => h.system === key);
    const card = document.createElement('div');
    card.className = 'sys-card';
    card.style.setProperty('--sys-color', sys.color);
    card.innerHTML = `
      <div class="sys-icon">${sys.icon}</div>
      <div class="sys-label">${sys.label}</div>
      <div class="sys-cancers">${n} cancer type${n!==1?'s':''}</div>`;
    if (hs) card.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => bmActivateHotspot(hs.id), 400);
    });
    grid.appendChild(card);
  });
}

// ─── INIT ──────────────────────────────────────────────────────────────────
(function() {
  function init() {
    bmBuildHotspots();
    bmBuildSysGrid();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>

<script src="{{ site.baseurl }}/ACSstuff/search.js"></script>