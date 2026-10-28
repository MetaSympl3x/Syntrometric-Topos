window.comb2 = function(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let res = 1;
  for (let i = 1; i <= k; i++) {
    res = res * (n - i + 1) / i;
  }
  return Math.round(res);
};

window.fact2 = function(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};

// WIDGET 1: §2.1.2–2.1.4 Pyramidal vs Homogeneous & Bandsyntrix (SM-7)
window.archMode = 'hom';
window.setArchMode = function(mode) {
  window.archMode = mode;
  const btnPyr = document.getElementById('btn-arch-pyr');
  const btnHom = document.getElementById('btn-arch-hom');
  const arcL = document.getElementById('hom-arc-l');
  const arcR = document.getElementById('hom-arc-r');
  if (btnPyr && btnHom) {
    if (mode === 'pyr') {
      btnPyr.style.background = '#FFD700'; btnPyr.style.color = '#000'; btnPyr.style.fontWeight = 'bold';
      btnHom.style.background = '#1e293b'; btnHom.style.color = '#FFD700'; btnHom.style.fontWeight = 'normal';
    } else {
      btnHom.style.background = '#FFD700'; btnHom.style.color = '#000'; btnHom.style.fontWeight = 'bold';
      btnPyr.style.background = '#1e293b'; btnPyr.style.color = '#FFD700'; btnPyr.style.fontWeight = 'normal';
    }
  }
  if (arcL && arcR) {
    arcL.setAttribute('opacity', mode === 'hom' ? '1' : '0.12');
    arcR.setAttribute('opacity', mode === 'hom' ? '1' : '0.12');
  }
  window.updateBandsyntrix();
};

window.updateBandsyntrix = function() {
  const elW = document.getElementById('bs-width');
  if (!elW) return;
  let w = parseFloat(elW.value);
  document.getElementById('bs-width-val').innerText = w.toFixed(2);

  let pxW = Math.max(2, Math.round(w * 22));
  const centers = [68, 110, 152];
  [1, 2, 3].forEach((idx, i) => {
    const r = document.getElementById('bs-rect-' + idx);
    if (r) {
      r.setAttribute('x', (centers[i] - pxW / 2).toFixed(1));
      r.setAttribute('width', pxW);
    }
  });

  const box = document.getElementById('bs-readout');
  if (box) {
    let archStr = window.archMode === 'hom'
      ? "Homogeneous Syntrix x yã (Historical Cross-Talk T_frag Active)"
      : "Pyramidal Syntrix y yã (Strict Step-by-Step T_pyr Only)";
    let bandStr = w === 0
      ? "DEGENERATE DISCRETE LIMIT (A_i = B_i = a_i, Δ_i = 0 — Prop. 2.1 & Thm. 2.2)"
      : `Continuous Bandsyntrix (A_i, a_i, B_i)_n with Δ_i = ${w.toFixed(2)} > 0`;
    box.style.borderLeftColor = w === 0 ? "#FFA500" : "#20B2AA";
    box.innerText = `${archStr}  |  ${bandStr}`;
  }
};

window.collapseBandsyntrix = function() {
  const el = document.getElementById('bs-width');
  if (el) { el.value = 0.0; window.updateBandsyntrix(); }
};

window.restoreBandsyntrix = function() {
  const el = document.getElementById('bs-width');
  if (el) { el.value = 0.90; window.updateBandsyntrix(); }
};

// WIDGET 2: §2.2.1–2.2.2 Operadic Tree Grafting & De-Grafting
window.setOperadTreeMode = function(mode) {
  const svg = document.getElementById('operad-tree-svg');
  const box = document.getElementById('operad-tree-readout');
  if (!svg || !box) return;

  if (mode === 'two') {
    svg.innerHTML = `
      <line x1="85" y1="22" x2="135" y2="55" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="185" y1="22" x2="135" y2="55" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="135" y1="55" x2="195" y2="95" stroke="#20B2AA" stroke-width="3.2"/>
      <line x1="265" y1="55" x2="195" y2="95" stroke="#20B2AA" stroke-width="2.5"/>
      <line x1="195" y1="95" x2="195" y2="124" stroke="#FFD700" stroke-width="3.2"/>
      <circle cx="85" cy="22" r="11" fill="#4169E1"/><text x="85" y="26" fill="#fff" font-size="9" text-anchor="middle">F_γ</text>
      <circle cx="185" cy="22" r="11" fill="#4169E1"/><text x="185" y="26" fill="#fff" font-size="9" text-anchor="middle">F_γ</text>
      <rect x="108" y="43" width="54" height="22" rx="4" fill="#1e293b" stroke="#4169E1" stroke-width="2"/>
      <text x="135" y="58" fill="#82aaff" font-size="10" font-weight="bold" text-anchor="middle">g (γ→γ+1)</text>
      <circle cx="265" cy="48" r="12" fill="#20B2AA"/><text x="265" y="52" fill="#000" font-size="9" font-weight="bold" text-anchor="middle">F_{γ+1}</text>
      <rect x="155" y="83" width="80" height="22" rx="4" fill="#1e293b" stroke="#20B2AA" stroke-width="2"/>
      <text x="195" y="98" fill="#5eead4" font-size="10" font-weight="bold" text-anchor="middle">f (γ+1→γ+2)</text>
    `;
    box.style.borderLeftColor = "#20B2AA";
    box.innerText = `Two-Stage Tree: g ∈ O_syn(γ,γ; γ+1) feeds color γ+1 into slot 1 of f ∈ O_syn(γ+1,γ+1; γ+2)`;
  } else if (mode === 'graft') {
    svg.innerHTML = `
      <line x1="95" y1="22" x2="190" y2="75" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="190" y1="22" x2="190" y2="75" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="285" y1="22" x2="190" y2="75" stroke="#20B2AA" stroke-width="2.5"/>
      <line x1="190" y1="75" x2="190" y2="122" stroke="#FFD700" stroke-width="3.5"/>
      <circle cx="95" cy="22" r="11" fill="#4169E1"/><text x="95" y="26" fill="#fff" font-size="9" text-anchor="middle">F_γ</text>
      <circle cx="190" cy="22" r="11" fill="#4169E1"/><text x="190" y="26" fill="#fff" font-size="9" text-anchor="middle">F_γ</text>
      <circle cx="285" cy="22" r="12" fill="#20B2AA"/><text x="285" y="26" fill="#000" font-size="8.5" font-weight="bold" text-anchor="middle">F_{γ+1}</text>
      <rect x="115" y="62" width="150" height="26" rx="5" fill="#2d1a04" stroke="#FFA500" stroke-width="2.2"/>
      <text x="190" y="79" fill="#FFD700" font-size="10.5" font-weight="bold" text-anchor="middle">γ(f; g, id) ∈ O_syn(γ,γ,γ+1; γ+2)</text>
    `;
    box.style.borderLeftColor = "#FFA500";
    box.innerText = `Grafted Composite Operation (Episyllogismus k↑): ‖f ∘₁ g‖_op ≤ ‖f‖·‖g‖ ≤ 1 in O_syn(γ,γ,γ+1; γ+2)`;
  } else {
    svg.innerHTML = `
      <line x1="85" y1="22" x2="135" y2="55" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="185" y1="22" x2="135" y2="55" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="135" y1="55" x2="195" y2="95" stroke="#DC143C" stroke-width="3" stroke-dasharray="4,3"/>
      <line x1="142" y1="75" x2="188" y2="75" stroke="#DC143C" stroke-width="3.5"/>
      <text x="110" y="80" fill="#ff6b81" font-size="9.5" font-weight="bold">✂ Δ_prosyl</text>
      <line x1="265" y1="55" x2="195" y2="95" stroke="#20B2AA" stroke-width="2.5"/>
      <rect x="108" y="43" width="54" height="22" rx="4" fill="#1e293b" stroke="#4169E1" stroke-width="2"/>
      <text x="135" y="58" fill="#82aaff" font-size="10" font-weight="bold" text-anchor="middle">s ḡ</text>
      <rect x="155" y="83" width="80" height="22" rx="4" fill="#1e293b" stroke="#9370DB" stroke-width="2"/>
      <text x="195" y="98" fill="#e9d5ff" font-size="10" font-weight="bold" text-anchor="middle">s f̄ ∈ B(O_syn)</text>
    `;
    box.style.borderLeftColor = "#9370DB";
    box.innerText = `Prosyllogistic Bar Cooperad B(O_syn) (Def. 2.8, k↓): Cocomposition Δ_prosyl cuts internal edge e to extract ancestral lineage!`;
  }
};

// WIDGET 3: §2.2.3 Permutohedron Pi_3 Stabilizers
window.setPermStab = function(mode) {
  const cTeal = "#20B2AA", cOrange = "#FFA500", cPurple = "#9370DB", cBlue = "#4169E1", cRed = "#DC143C", cGold = "#FFD700";
  let colors = [];
  let text = "";
  if (mode === 'sym') {
    colors = [cGold, cGold, cGold, cGold, cGold, cGold];
    text = "Stab(f) = Σ₃ (|Stab(f)| = 6) ⇒ Asymmetry Index r_f = 6 / 6 = 1 Orbit (Fully Symmetric Operation)";
  } else if (mode === 's1') {
    colors = [cTeal, cTeal, cOrange, cPurple, cPurple, cOrange];
    text = "Stab(f) = ⟨s₁⟩ = {e, (12)} (|Stab(f)| = 2) ⇒ Asymmetry Index r_f = 6 / 2 = 3 Coset Orbits: [e], [s₂], [s₁s₂]";
  } else if (mode === 'a3') {
    colors = [cTeal, cOrange, cTeal, cOrange, cTeal, cOrange];
    text = "Stab(f) = A₃ (Cyclic Subgroup, |Stab(f)| = 3) ⇒ Asymmetry Index r_f = 6 / 3 = 2 Chiral Coset Orbits";
  } else {
    colors = [cTeal, cOrange, cPurple, cBlue, cRed, cGold];
    text = "Stab(f) = {e} (|Stab(f)| = 1) ⇒ Asymmetry Index r_f = 6 / 1 = 6 Distinct Orbits (Completely Asymmetric)";
  }
  for (let i = 0; i < 6; i++) {
    const nd = document.getElementById('nd-' + i);
    if (nd) nd.setAttribute('fill', colors[i]);
  }
  const box = document.getElementById('perm-readout');
  if (box) box.innerText = text;
};

// WIDGET 4: §2.4.1 4 Elementary Structures, Asymmetric Bridge & Homometral Class A
window.updateSelectionDims = function() {
  const elN = document.getElementById('sel-n');
  if (!elN) return;
  let n = parseInt(elN.value);
  let m = parseInt(document.getElementById('sel-m').value);
  let kInput = document.getElementById('sel-k');
  kInput.max = m;
  let k = Math.min(m, parseInt(kInput.value));
  kInput.value = k;

  let repInput = document.getElementById('sel-rep');
  repInput.max = Math.max(0, m - 1);
  let rep = Math.min(Math.max(0, m - 1), parseInt(repInput.value));
  repInput.value = rep;

  document.getElementById('sel-n-val').innerText = n;
  document.getElementById('sel-m-val').innerText = m;
  document.getElementById('sel-k-val').innerText = k;
  document.getElementById('sel-rep-val').innerText = rep;

  let s1 = window.comb2(n, m);
  let s2 = (m <= n) ? s1 * window.fact2(m) : 0;
  let s3 = window.comb2(n + m - 1, m);
  let s4 = Math.pow(n, m);

  let asymK = (m <= n) ? window.fact2(k) * window.comb2(m, k) * window.comb2(n, m) : 0;
  let effA = m - rep;
  let homPop = window.comb2(n, effA);

  document.getElementById('sel-bars').innerHTML = `
    <div class="stat-card" style="border-left-color:#4169E1;">
      <b style="color:#82aaff;">S₍₁₎ Het, Sym (Λ^m V):</b><br>C(${n}, ${m}) = <b style="color:#FFD700;">${s1.toLocaleString()}</b> ${s1===0 ? '<span style="color:#ff6b81;">(Closed!)</span>' : ''}
    </div>
    <div class="stat-card" style="border-left-color:#20B2AA;">
      <b style="color:#5eead4;">S₍₂₎ Het, Asym (V^{⊗_dist m}):</b><br>n!/(n-m)! = <b style="color:#FFD700;">${s2.toLocaleString()}</b>
    </div>
    <div class="stat-card" style="border-left-color:#FFA500;">
      <b style="color:#fcd34d;">S₍₃₎ Hom, Sym (Sym^m V):</b><br>C(${n+m-1}, ${m}) = <b style="color:#FFD700;">${s3.toLocaleString()}</b>
    </div>
    <div class="stat-card" style="border-left-color:#a855f7;">
      <b style="color:#e9d5ff;">S₍₄₎ Hom, Asym (V^{⊗m}):</b><br>${n}^${m} = <b style="color:#FFD700;">${s4.toLocaleString()}</b>
    </div>
  `;

  const brBox = document.getElementById('sel-bridge-readout');
  if (brBox) {
    brBox.innerText =
      `Lemma 2.18 (k=${k} Asymmetry): k!C(m,k)C(n,m) = ${asymK.toLocaleString()}  |  Thm 2.22 (Effective Class A = m - ∑(a_j-1) = ${effA}): C(${n}, ${effA}) = ${homPop.toLocaleString()}` +
      ((effA === 1 || m === n - 1) ? " [ÄQUISYNDROMATIK: n₁ = n!]" : "");
  }
};

window.setSelPreset = function(n, m, k, rep) {
  document.getElementById('sel-n').value = n;
  document.getElementById('sel-m').value = m;
  document.getElementById('sel-k').value = k;
  document.getElementById('sel-rep').value = rep;
  window.updateSelectionDims();
};

// WIDGET 5: §2.4.3 Dynamical Phase Trichotomy SVG Plotter
window.updateTrichotomy = function() {
  const elN0 = document.getElementById('tri-n0');
  if (!elN0) return;
  let n0 = parseInt(elN0.value);
  let m = parseInt(document.getElementById('tri-m').value);
  document.getElementById('tri-n0-val').innerText = n0;
  document.getElementById('tri-m-val').innerText = m;

  let seq = [n0];
  let curr = n0;
  for (let g = 1; g <= 5; g++) {
    if (curr > 10000) {
      seq.push("1.11×10¹⁴");
      break;
    }
    curr = window.comb2(curr, m);
    seq.push(curr);
  }

  let regime = "", col = "#FFD700";
  if (n0 <= m) {
    regime = "SUB-CRITICAL EXTINCTION (n₀ ≤ m ⇒ Syndromabschluß at γ ≤ 2)";
    col = "#ff6b81";
  } else if (n0 === m + 1) {
    regime = "CRITICAL EQUI-SYNDROMATIC FIXED POINT (n₀ = m + 1 ⇒ Constant n_γ = " + n0 + ")";
    col = "#20B2AA";
  } else {
    regime = "SUPER-CRITICAL DOUBLY-EXPONENTIAL REGIME (n₀ ≥ m + 2 ⇒ Rapid Explosion)";
    col = "#FFA500";
  }

  // Update SVG Plot
  const poly = document.getElementById('tri-poly');
  const dotsGrp = document.getElementById('tri-dots');
  if (poly && dotsGrp) {
    let pts = [];
    let dotsHtml = "";
    let numSteps = Math.min(4, seq.length);
    for (let i = 0; i < numSteps; i++) {
      let val = typeof seq[i] === 'number' ? seq[i] : 500;
      let logY = val <= 0 ? 0 : Math.min(1.0, Math.log10(val + 1) / 3.8);
      let x = 30 + i * 52;
      let y = (92 - logY * 74).toFixed(1);
      pts.push(`${x},${y}`);
      dotsHtml += `<circle cx="${x}" cy="${y}" r="4.5" fill="${col}"/>`;
    }
    poly.setAttribute('points', pts.join(' '));
    poly.setAttribute('stroke', col);
    dotsGrp.innerHTML = dotsHtml;
  }

  const box = document.getElementById('tri-trajectory');
  if (box) {
    box.style.borderLeftColor = col;
    box.style.color = col;
    box.innerHTML = `<b>${regime}</b><br>Trajectory (γ = 0 … 5): ` + seq.join("  →  ");
  }
};

window.setTriPreset = function(n0, m) {
  document.getElementById('tri-n0').value = n0;
  document.getElementById('tri-m').value = m;
  window.updateTrichotomy();
};

// WIDGET 6: §2.5 Beck Coherence Tab Switcher
window.showBeckTab = function(idx, btnEl) {
  for (let i = 1; i <= 4; i++) {
    const p = document.getElementById('beck-pane-' + i);
    if (p) p.classList.toggle('active', i === idx);
  }
  if (btnEl && btnEl.parentElement) {
    Array.from(btnEl.parentElement.children).forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise().catch(() => {});
  }
};

// WIDGET 7: §2.6–2.7 Stability & Spine Reflexivity Tab Switcher
window.showStabTab = function(idx, btnEl) {
  for (let i = 1; i <= 4; i++) {
    const p = document.getElementById('stab-pane-' + i);
    if (p) p.classList.toggle('active', i === idx);
  }
  if (btnEl && btnEl.parentElement) {
    Array.from(btnEl.parentElement.children).forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise().catch(() => {});
  }
};

window.showGenericTab = function(prefix, idx, maxIdx, btnEl) {
  for (let i = 1; i <= maxIdx; i++) {
    const p = document.getElementById(prefix + '-pane-' + i);
    if (p) p.classList.toggle('active', i === idx);
  }
  if (btnEl && btnEl.parentElement) {
    Array.from(btnEl.parentElement.children).forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise().catch(() => {});
  }
};

// WIDGET 8: §2.8 Polycyclic Metrophorischer Zirkel & Holonomy Lab
window.updateMetrophoricCircle = function() {
  const elZ = document.getElementById('cir-z');
  if (!elZ) return;
  let Z = parseInt(elZ.value);
  let N = parseInt(document.getElementById('cir-n').value);
  let phi = parseFloat(document.getElementById('cir-phi').value);

  document.getElementById('cir-z-val').innerText = Z;
  document.getElementById('cir-n-val').innerText = N;
  document.getElementById('cir-phi-val').innerText = phi.toFixed(0) + '°';

  let L = window.comb2(Z, 2);
  let degTruth = L * N;

  const svg = document.getElementById('cir-svg');
  if (svg) {
    let html = `<circle cx="0" cy="0" r="52" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
    let pts = [];
    for (let i = 0; i < Z; i++) {
      let a = (i / Z) * 2 * Math.PI - Math.PI / 2;
      pts.push({ x: 52 * Math.cos(a), y: 52 * Math.sin(a) });
    }
    for (let i = 0; i < Z; i++) {
      for (let j = i + 1; j < Z; j++) {
        html += `<line x1="${pts[i].x.toFixed(1)}" y1="${pts[i].y.toFixed(1)}" x2="${pts[j].x.toFixed(1)}" y2="${pts[j].y.toFixed(1)}" stroke="rgba(65,105,225,0.45)" stroke-width="1.3"/>`;
      }
    }
    pts.forEach((p, idx) => {
      html += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="7" fill="#20B2AA" stroke="#fff" stroke-width="1"/>`;
    });
    let rad = (phi - 90) * Math.PI / 180.0;
    let hx = (52 * Math.cos(rad)).toFixed(1), hy = (52 * Math.sin(rad)).toFixed(1);
    html += `<circle cx="${hx}" cy="${hy}" r="6" fill="#FFD700" stroke="#000" stroke-width="1.5"/>`;
    svg.innerHTML = html;
  }

  const box = document.getElementById('cir-readout');
  if (box) {
    box.innerText =
      `Z = ${Z} Aspect Systems ⇒ Partial Circles L = C(${Z}, 2) = ${L}  |  Bounded Universalquantor Degree ∑ N_j = ${degTruth} (Thm 2.22(5))`;
  }
};

// ---------------------------------------------------------------------------
// VIDEO CONTROL: play Manim clips only while their slide is visible
// ---------------------------------------------------------------------------
function prepareVideos() {
  document.querySelectorAll('video').forEach(v => {
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.removeAttribute('autoplay');
    v.preload = 'metadata';
  });
}

function syncVideosToSlide() {
  const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
  document.querySelectorAll('video').forEach(v => {
    const visible = current ? current.contains(v) : true;
    if (visible) {
      v.play().catch(() => {});
    } else if (!v.paused) {
      v.pause();
    }
  });
}

// ---------------------------------------------------------------------------
// WIDGET WIRING (runs once; slide changes no longer reset widget state)
// ---------------------------------------------------------------------------
function renderAllCh2Widgets() {
  window.updateBandsyntrix();
  window.setOperadTreeMode('two');
  window.updateSelectionDims();
  window.updateTrichotomy();
  window.updateMetrophoricCircle();
}

function bindControlsOnce() {
  document.querySelectorAll('input[type="range"], select, button').forEach(el => {
    if (el.dataset.synBound) return;
    el.dataset.synBound = '1';
    el.addEventListener('keydown', e => e.stopPropagation());
    el.addEventListener('mousedown', e => e.stopPropagation());
    el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
  });
}

let synInitialised = false;
function initChapter2() {
  if (synInitialised) return;
  synInitialised = true;
  prepareVideos();
  bindControlsOnce();
  renderAllCh2Widgets();
  syncVideosToSlide();
}

if (window.Reveal && window.Reveal.on) {
  window.Reveal.on('ready', initChapter2);
  window.Reveal.on('slidechanged', syncVideosToSlide);
  window.Reveal.on('fragmentshown', syncVideosToSlide);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter2();
  });
} else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
  initChapter2();
}
// =========================================================================
// ADVANCED 60FPS 3D INTERACTIVE SYNTRIX CRYSTAL & OPERADIC FIBRATION ENGINE
// =========================================================================

const HUD_3D_STYLE = `
#syntrix-3d-hud {
  box-sizing: border-box;
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: clamp(280px, 30vw, 540px);
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 20px);
  background: linear-gradient(145deg, rgba(7, 10, 19, 0.96) 0%, rgba(14, 21, 38, 0.98) 100%);
  border: 1.5px solid rgba(255, 215, 0, 0.65);
  border-radius: 14px;
  padding: 9px 13px 11px 13px;
  z-index: 9999;
  box-shadow: 0 14px 46px rgba(0, 0, 0, 0.86), 0 0 28px rgba(65, 105, 225, 0.34);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-family: "Libertinus Sans", "Inter", system-ui, sans-serif;
  color: #e8ecf2;
  transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  user-select: none;
}

#syntrix-3d-hud *, #syntrix-3d-hud *::before, #syntrix-3d-hud *::after {
  box-sizing: border-box;
}

#syntrix-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#syntrix-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#syntrix-3d-hud.minimized .hud3d-body {
  display: none;
}

.hud3d-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.hud3d-title {
  font-size: clamp(10px, 1.05vw, 11.5px);
  font-weight: 800;
  letter-spacing: 0.35px;
  color: #FFD700;
  text-transform: uppercase;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px 5px;
  min-width: 0;
  flex: 1 1 auto;
  line-height: 1.15;
}

.hud3d-title span:first-child {
  line-height: 1.15;
}

.hud3d-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.hud3d-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.hud3d-btn {
  background: #172033;
  color: #cbd5e1;
  border: 1px solid #3b4963;
  border-radius: 5px;
  padding: clamp(2.5px, 0.35vh, 4.5px) clamp(5px, 0.6vw, 9px);
  font-size: clamp(9px, 0.9vw, 11px);
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  box-sizing: border-box;
  transition: all 0.15s ease;
}

.hud3d-btn:hover, .hud3d-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.canvas-wrap:active {
  cursor: grabbing;
}

#syntrix-3d-hud.spotlight .canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#syntrix-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.canvas-overlay-hud {
  position: absolute;
  top: 7px;
  left: 9px;
  right: 9px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  font-family: "Libertinus Mono", monospace;
  font-size: clamp(8px, 0.8vw, 10px);
  gap: 6px;
}

.hud-telemetry-badge {
  background: rgba(6, 9, 17, 0.84);
  border: 1px solid rgba(65, 105, 225, 0.55);
  border-radius: 5px;
  padding: 2px 7px;
  color: #82aaff;
  white-space: nowrap;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
}

#hud3d-node-inspector {
  background: rgba(6, 9, 17, 0.88);
  border: 1px solid rgba(255, 215, 0, 0.6);
  border-radius: 5px;
  padding: 2px 8px;
  color: #FFD700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 50%;
}

.hud3d-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.hud3d-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.hud3d-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.hud3d-scrubber .hud3d-btn {
  flex-shrink: 0;
}

#hud3d-caption {
  margin-top: 6px;
  padding: 6px 9px;
  background: rgba(4, 7, 14, 0.9);
  border-left: 3px solid #20B2AA;
  border-radius: 5px;
  font-family: "Libertinus Mono", monospace;
  font-size: clamp(8.5px, 0.85vw, 10.5px);
  line-height: 1.35;
  color: #5eead4;
}

@media (max-width: 900px) {
  #syntrix-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #syntrix-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .hud3d-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .hud3d-controls {
    gap: 3px;
  }
  .hud3d-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .hud3d-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #syntrix-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #syntrix-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #syntrix-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .hud3d-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .hud3d-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .hud3d-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .hud3d-controls {
    gap: 3px;
  }
  .hud3d-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .hud3d-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #syntrix-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #syntrix-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #syntrix-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .hud3d-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .hud3d-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .hud3d-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const HUD_3D_HTML = `
  <div class="hud3d-header">
    <div class="hud3d-title">
      <span>💠 3D Syntrix Engine</span>
      <span id="hud3d-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:10px;">Stage 1.0 / 10</span>
    </div>
    <div class="hud3d-controls">
      <button class="hud3d-btn active" id="btn-orbit-3d" title="Toggle 3D Auto-Orbit" onclick="toggle3DOrbit()">⟳ Orbit</button>
      <button class="hud3d-btn" title="Spotlight Mode (Expand Center)" onclick="toggle3DSpotlight()">⛶ Spotlight</button>
      <button class="hud3d-btn" id="btn-min-3d" title="Minimize / Restore" onclick="toggle3DMinimize()">+</button>
    </div>
  </div>

  <div class="hud3d-body">
    <div class="canvas-wrap" id="syntrix-canvas-wrap">
      <canvas id="syntrix-3d-canvas"></canvas>
      <div class="canvas-overlay-hud">
        <div class="hud-telemetry-badge" id="hud3d-telemetry">
          Col = ℕ₀ | T_P(X) ∈ Ban_≤1
        </div>
        <div id="hud3d-node-inspector">
          Drag to Rotate 3D · Click Node to Inspect
        </div>
      </div>
    </div>

    <div class="hud3d-scrubber">
      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>
      <input type="range" id="hud3d-slider" min="1" max="10" step="0.05" value="1" oninput="scrub3DStage(this.value)">
      <button class="hud3d-btn active" id="btn-sync-3d" onclick="enable3DAutoSync()">Auto-Sync</button>
    </div>

    <div id="hud3d-caption">
      <b>Stage 1 (§2.1.1 — SM Eq. 5):</b> Apodictic Metrophor Base ã = (a₁, a₂, a₃, a₄) ∈ AP₀ initialized in 3D space.
    </div>
  </div>
`;

function inject3DHUD() {
  if (document.getElementById('syntrix-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = HUD_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'syntrix-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = HUD_3D_HTML;
  document.body.appendChild(hudEl);
}

// 3D Canvas Engine Implementation
(function() {
  let canvas, wrap, ctx;
  let targetStage = 1.0;
  let currentStage = 1.0;
  let autoSync = true;
  let autoOrbit = true;
  let camYaw = -0.45;
  let camPitch = 0.32;
  let camZoom = 1.65;
  let isDragging = false;
  let lastMX = 0, lastMY = 0;
  let timeSec = 0;
  let selectedNode = null;
  let projectedNodes = [];

  const STAGE_NOTES = {
    1: "<b>Stage 1 (§2.1.1 — SM Eq. 5):</b> Unconditioned Metrophor Base ã = (a₁, a₂, a₃, a₄) ∈ AP₀ initialized in 3D tetrahedral base.",
    2: "<b>Stage 2 (§2.1.2–4 — SM-5a, SM-7):</b> 3D Bandsyntrix cylinders [A_i, B_i] + First Syndrome F₁ + Red Homogeneous cross-talk (x yã).",
    3: "<b>Stage 3 (§2.2.1–2 — Def. 2.4):</b> Colored Operad O_syn grafts F₁ → F₂ → Apex F₃ via contractive tree composition γ(f; g, id).",
    4: "<b>Stage 4 (§2.2.3 — Def. 2.6):</b> 3D Permutohedron Π₃ hexagons orbit F₂ vertices (Lagrange Asymmetry Index r_f = [Σ₃ : Stab(f)] = 3).",
    5: "<b>Stage 5 (§2.2.4–5 — Thm. 2.9):</b> Bar–Cobar Duality (Ω_cobar ⊣ B_bar)! Purple Prosyllogistic laser plane Δ_prosyl cuts internal edges (k↓).",
    6: "<b>Stage 6 (§2.3–2.4.1 — Thm. 2.17):</b> Central Thin Spine C_spine = (ℕ₀, ≤) illuminates withStage II Polarimeter capacities (6 → 15 → 105).",
    7: "<b>Stage 7 (§2.4.2–3 — Thm. 2.26):</b> Komplexsynkolator arity rings m(γ) clamp onto levels, separating Extinction from Doubly-Exponential growth.",
    8: "<b>Stage 8 (§2.5 — Thm. 2.29 Beck Law):</b> Watch the red homogeneous filaments morph outward onto the outer cylinder (T̄_frag ∘ T̄_pyr Spaltbarkeit)!",
    9: "<b>Stage 9 (§2.6–2.7 — Thm. 2.33):</b> Hereditary Stability □_Syn golden halos & Spine Reflexivity arcs ρ₀⁽³⁾ = Lift_{□_Syn}³.",
    10: "<b>Stage 10 (§2.8–2.11 — Thm. 2.35):</b> 3D Grothendieck Äondyne Fibration ∫_Ctx Syn → Ctx & Metrophoric Circle Holonomy 𝒞!"
  };

  const STAGE_TELEMETRY = {
    1: "Level 0: F₀ = AP₀ (dim = 6)",
    2: "Bandsyntrix Δ_i > 0 | F₁ = f(F₀^⊗m)",
    3: "γ(f; g, id) ∈ O_syn | ‖∘_i‖_op ≤ 1",
    4: "Permutohedron Π₃ | r_f = 6/2 = 3",
    5: "Bar Cooperad B(O_syn) | ∂α + α⋆α = 0",
    6: "Stage II: dim Λ²(ℝ⁶)=15 → Λ²(ℝ¹⁵)=105",
    7: "Trichotomy: n₀ = m+1 Fixed Pt",
    8: "Beck Law: T_hom = T̄_frag ∘ T̄_pyr",
    9: "□_Syn Grounded | ρ_{k+n}^(m) ∘ ρ_k^(n)",
    10: "Fibration π : ∫_Ctx Syn → Ctx"
  };

  const NODES = [
    { id: "a₁", lvl: 0, x: -1.35, y: -0.75, z: -1.25, col: "#4169E1", r: 7.5, info: "a₁ ∈ AP₀ (Metrophor Atom 1, Stable₀=1, Origin={a₁})" },
    { id: "a₂", lvl: 0, x:  1.35, y: -0.75, z: -1.25, col: "#4169E1", r: 7.5, info: "a₂ ∈ AP₀ (Metrophor Atom 2, Stable₀=1, Origin={a₂})" },
    { id: "a₃", lvl: 0, x:  1.15, y:  0.95, z: -1.25, col: "#4169E1", r: 7.5, info: "a₃ ∈ AP₀ (Metrophor Atom 3, Stable₀=1, Origin={a₃})" },
    { id: "a₄", lvl: 0, x: -1.15, y:  0.95, z: -1.25, col: "#4169E1", r: 7.5, info: "a₄ ∈ AP₀ (Metrophor Atom 4, Stable₀=1, Origin={a₄})" },
    { id: "F₁⁽¹⁾", lvl: 1, x: -0.95, y: -0.35, z: -0.35, col: "#20B2AA", r: 9.0, info: "F₁⁽¹⁾ ∈ Λ²(F₀) (Stage 1 Syndrome, dim = C(6,2) = 15)" },
    { id: "F₁⁽²⁾", lvl: 1, x:  0.00, y:  0.00, z: -0.35, col: "#20B2AA", r: 9.5, info: "F₁⁽²⁾ ∈ C_spine (Central Spine Node L⁽¹⁾ = Shift(L*))" },
    { id: "F₁⁽³⁾", lvl: 1, x:  0.95, y:  0.35, z: -0.35, col: "#20B2AA", r: 9.0, info: "F₁⁽³⁾ ∈ Λ²(F₀) (Cross-Channel Polarimeter Pair)" },
    { id: "F₂⁽¹⁾", lvl: 2, x: -0.55, y: -0.15, z:  0.55, col: "#FFA500", r: 10.0, info: "F₂⁽¹⁾ ∈ Λ²(F₁) (Stage 2 Syndrome, dim = C(15,2) = 105)" },
    { id: "F₂⁽²⁾", lvl: 2, x:  0.55, y:  0.15, z:  0.55, col: "#FFA500", r: 10.0, info: "F₂⁽²⁾ ∈ O_syn(γ+1,γ+1; γ+2) (Coset Orbit r_f = 3)" },
    { id: "F₃",    lvl: 3, x:  0.00, y:  0.00, z:  1.35, col: "#FFD700", r: 12.5, info: "Apex F₃ ∈ T_P(X) (Synthesized Kategorie Invariant, □_Syn F₃)" }
  ];

  const PYR_EDGES = [
    { u: 0, v: 4, minSt: 1.5 }, { u: 1, v: 4, minSt: 1.5 },
    { u: 0, v: 5, minSt: 1.6 }, { u: 2, v: 5, minSt: 1.6 },
    { u: 1, v: 6, minSt: 1.7 }, { u: 3, v: 6, minSt: 1.7 },
    { u: 4, v: 7, minSt: 2.4 }, { u: 5, v: 7, minSt: 2.4 },
    { u: 5, v: 8, minSt: 2.5 }, { u: 6, v: 8, minSt: 2.5 },
    { u: 7, v: 9, minSt: 2.8 }, { u: 8, v: 9, minSt: 2.8 }
  ];

  const HOM_EDGES = [
    { u: 0, v: 7, bowInt: 0.25, bowExt: 1.45 },
    { u: 1, v: 8, bowInt: 0.25, bowExt: 1.45 },
    { u: 2, v: 9, bowInt: 0.30, bowExt: 1.65 },
    { u: 3, v: 9, bowInt: 0.30, bowExt: 1.65 }
  ];

  const PARTICLES = [];
  for (let i = 0; i < 24; i++) {
    PARTICLES.push({
      edgeIdx: i % PYR_EDGES.length,
      isHom: i >= 16,
      homIdx: i % HOM_EDGES.length,
      t: Math.random(),
      speed: 0.35 + Math.random() * 0.28
    });
  }

  function resizeCanvas() {
    if (!wrap || !canvas) return;
    const rect = wrap.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function project3D(x, y, z, w, h) {
    const cosY = Math.cos(camYaw), sinY = Math.sin(camYaw);
    const x1 = x * cosY - y * sinY;
    const y1 = x * sinY + y * cosY;

    const cosP = Math.cos(camPitch), sinP = Math.sin(camPitch);
    const y2 = y1 * cosP - z * sinP;
    const z2 = y1 * sinP + z * cosP;

    const fov = Math.min(w, h) * 0.42 * camZoom;
    const dist = 4.6;
    const scale = fov / Math.max(0.8, dist - y2 * 0.45);
    return {
      sx: w * 0.5 + x1 * scale,
      sy: h * 0.52 - z2 * scale,
      depth: y2,
      scale: scale / 100.0
    };
  }

  function drawQuadBezier3D(p0, pCtrl, p1, strokeStyle, width, dash) {
    ctx.save();
    ctx.beginPath();
    if (dash) ctx.setLineDash(dash);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = width;
    ctx.moveTo(p0.sx, p0.sy);
    ctx.quadraticCurveTo(pCtrl.sx, pCtrl.sy, p1.sx, p1.sy);
    ctx.stroke();
    ctx.restore();
  }

  function renderFrame(ts) {
    if (!canvas || !wrap || !ctx) return;
    const dt = 0.016;
    timeSec += dt;

    currentStage += (targetStage - currentStage) * 0.12;
    if (autoOrbit && !isDragging) {
      camYaw += 0.0055;
    }

    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w > 0 && h > 0 && (canvas.width === 0 || Math.abs(canvas.width / (Math.min(window.devicePixelRatio||1,2)) - w) > 2)) {
      resizeCanvas();
    }

    ctx.clearRect(0, 0, w, h);

    // 1. Stage 10: 3D Grothendieck Aeondyne Base Manifold
    if (currentStage > 9.05) {
      const alpha10 = Math.min(1.0, (currentStage - 9.05) / 0.7);
      ctx.save();
      ctx.globalAlpha = alpha10;
      for (let gx = -1.8; gx <= 1.81; gx += 0.6) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(65, 105, 225, 0.28)";
        ctx.lineWidth = 1;
        for (let gy = -1.4; gy <= 1.41; gy += 0.35) {
          const gz = -1.55 + 0.06 * Math.sin(gx * 2 + timeSec) * Math.cos(gy * 2);
          const pt = project3D(gx, gy, gz, w, h);
          if (gy === -1.4) ctx.moveTo(pt.sx, pt.sy);
          else ctx.lineTo(pt.sx, pt.sy);
        }
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.strokeStyle = "#FFD700";
      ctx.lineWidth = 2.2;
      for (let i = 0; i <= 48; i++) {
        const ang = (i / 48.0) * Math.PI * 2;
        const pC = project3D(1.35 * Math.cos(ang), 1.05 * Math.sin(ang), -1.55, w, h);
        if (i === 0) ctx.moveTo(pC.sx, pC.sy);
        else ctx.lineTo(pC.sx, pC.sy);
      }
      ctx.stroke();

      const holAng = timeSec * 1.4;
      const baseOrb = project3D(1.35 * Math.cos(holAng), 1.05 * Math.sin(holAng), -1.55, w, h);
      const liftOrb = project3D(0, 0, 1.35, w, h);
      ctx.beginPath();
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = "rgba(32, 178, 170, 0.7)";
      ctx.moveTo(baseOrb.sx, baseOrb.sy);
      ctx.lineTo(liftOrb.sx, liftOrb.sy);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.fillStyle = "#FFD700";
      ctx.arc(baseOrb.sx, baseOrb.sy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 2. Stage 6: Central Thin Spine Subcategory Pillar C_spine
    if (currentStage > 5.2) {
      const spAlpha = Math.min(0.85, (currentStage - 5.2) * 0.9);
      const spBot = project3D(0, 0, -1.35, w, h);
      const spTop = project3D(0, 0,  1.45, w, h);
      ctx.save();
      ctx.globalAlpha = spAlpha;
      ctx.strokeStyle = "#20B2AA";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(spBot.sx, spBot.sy);
      ctx.lineTo(spTop.sx, spTop.sy);
      ctx.stroke();
      ctx.restore();
    }

    // 3. Stage 7: Komplexsynkolator Interval Rings
    if (currentStage > 6.2 && currentStage < 8.6) {
      const gateAlpha = Math.min(1.0, 1.0 - Math.abs(currentStage - 7.0) * 0.75);
      if (gateAlpha > 0.05) {
        [
          { z: -0.35, col: "#20B2AA", r: 1.25 },
          { z:  0.55, col: "#FFA500", r: 0.90 },
          { z:  1.35, col: "#DC143C", r: 0.45 }
        ].forEach(ring => {
          ctx.save();
          ctx.globalAlpha = gateAlpha * 0.7;
          ctx.strokeStyle = ring.col;
          ctx.setLineDash([4, 3]);
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          for (let i = 0; i <= 36; i++) {
            const a = (i / 36.0) * Math.PI * 2;
            const p = project3D(ring.r * Math.cos(a), ring.r * Math.sin(a), ring.z, w, h);
            if (i === 0) ctx.moveTo(p.sx, p.sy);
            else ctx.lineTo(p.sx, p.sy);
          }
          ctx.stroke();
          ctx.restore();
        });
      }
    }

    // 4. Pyramidal Edges & Stage 5 Prosyllogistic Laser Plane
    PYR_EDGES.forEach(e => {
      if (currentStage >= e.minSt) {
        const alphaE = Math.min(1.0, (currentStage - e.minSt) * 2.2);
        const nU = NODES[e.u], nV = NODES[e.v];
        const pU = project3D(nU.x, nU.y, nU.z, w, h);
        const pV = project3D(nV.x, nV.y, nV.z, w, h);

        ctx.save();
        ctx.globalAlpha = alphaE * 0.85;
        const grad = ctx.createLinearGradient(pU.sx, pU.sy, pV.sx, pV.sy);
        grad.addColorStop(0, nU.col);
        grad.addColorStop(1, nV.col);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(pU.sx, pU.sy);
        ctx.lineTo(pV.sx, pV.sy);
        ctx.stroke();
        ctx.restore();
      }
    });

    if (currentStage > 4.25 && currentStage < 5.85) {
      const cutAlpha = Math.max(0, 1.0 - Math.abs(currentStage - 5.0) * 1.4);
      const zCut = 0.10 + 0.22 * Math.sin(timeSec * 3.5);
      const cCorners = [
        project3D(-1.3, -0.9, zCut, w, h),
        project3D( 1.3, -0.9, zCut, w, h),
        project3D( 1.3,  0.9, zCut, w, h),
        project3D(-1.3,  0.9, zCut, w, h)
      ];
      ctx.save();
      ctx.globalAlpha = cutAlpha * 0.65;
      ctx.fillStyle = "rgba(147, 112, 219, 0.28)";
      ctx.strokeStyle = "#e9d5ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cCorners[0].sx, cCorners[0].sy);
      cCorners.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // 5. Homogeneous Bypass Arcs & Beck Morphing
    if (currentStage >= 1.8) {
      const beckT = Math.max(0.0, Math.min(1.0, (currentStage - 7.3) / 0.65));
      HOM_EDGES.forEach(he => {
        const nU = NODES[he.u], nV = NODES[he.v];
        const bow = he.bowInt * (1.0 - beckT) + he.bowExt * beckT;
        const midX = (nU.x + nV.x) * 0.5 + (nU.x >= 0 ? bow : -bow);
        const midY = (nU.y + nV.y) * 0.5 + (nU.y >= 0 ? bow * 0.6 : -bow * 0.6);
        const midZ = (nU.z + nV.z) * 0.5;

        const p0 = project3D(nU.x, nU.y, nU.z, w, h);
        const pC = project3D(midX, midY, midZ, w, h);
        const p1 = project3D(nV.x, nV.y, nV.z, w, h);

        const col = beckT > 0.5 ? "#FFA500" : "#DC143C";
        const dash = beckT > 0.8 ? null : [5, 3];
        drawQuadBezier3D(p0, pC, p1, col, 2.2 + beckT * 0.8, dash);
      });
    }

    // 6. Stage 9: Spine Reflexivity Arcs
    if (currentStage >= 8.3) {
      const refAlpha = Math.min(1.0, (currentStage - 8.3) * 1.8);
      const pStart = project3D(0, 0, -0.35, w, h);
      const pCtrl  = project3D(0.95, -0.95, 0.55, w, h);
      const pEnd   = project3D(0, 0,  1.35, w, h);
      ctx.save();
      ctx.globalAlpha = refAlpha;
      drawQuadBezier3D(pStart, pCtrl, pEnd, "#FFD700", 3.0, null);
      ctx.restore();
    }

    // 7. Signal Particles
    const isProsyllogismus = (currentStage > 4.4 && currentStage < 5.6);
    PARTICLES.forEach(pt => {
      pt.t += (isProsyllogismus ? -1 : 1) * pt.speed * dt;
      if (pt.t > 1.0) pt.t -= 1.0;
      if (pt.t < 0.0) pt.t += 1.0;

      if (!pt.isHom) {
        const e = PYR_EDGES[pt.edgeIdx];
        if (currentStage >= e.minSt) {
          const nU = NODES[e.u], nV = NODES[e.v];
          const px = nU.x + (nV.x - nU.x) * pt.t;
          const py = nU.y + (nV.y - nU.y) * pt.t;
          const pz = nU.z + (nV.z - nU.z) * pt.t;
          const proj = project3D(px, py, pz, w, h);
          ctx.beginPath();
          ctx.fillStyle = isProsyllogismus ? "#e9d5ff" : "#FFD700";
          ctx.arc(proj.sx, proj.sy, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (currentStage >= 2.0) {
        const he = HOM_EDGES[pt.homIdx];
        const beckT = Math.max(0.0, Math.min(1.0, (currentStage - 7.3) / 0.65));
        const bow = he.bowInt * (1.0 - beckT) + he.bowExt * beckT;
        const nU = NODES[he.u], nV = NODES[he.v];
        const midX = (nU.x + nV.x) * 0.5 + (nU.x >= 0 ? bow : -bow);
        const midY = (nU.y + nV.y) * 0.5 + (nU.y >= 0 ? bow * 0.6 : -bow * 0.6);
        const midZ = (nU.z + nV.z) * 0.5;
        const s = pt.t, inv = 1.0 - s;
        const px = inv*inv*nU.x + 2*inv*s*midX + s*s*nV.x;
        const py = inv*inv*nU.y + 2*inv*s*midY + s*s*nV.y;
        const pz = inv*inv*nU.z + 2*inv*s*midZ + s*s*nV.z;
        const proj = project3D(px, py, pz, w, h);
        ctx.beginPath();
        ctx.fillStyle = beckT > 0.5 ? "#FFD700" : "#ff6b81";
        ctx.arc(proj.sx, proj.sy, 3.0, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 8. 3D Nodes
    projectedNodes = [];
    NODES.forEach((nd, idx) => {
      const minSt = nd.lvl === 0 ? 1.0 : (nd.lvl === 1 ? 1.5 : (nd.lvl === 2 ? 2.4 : 2.8));
      if (currentStage >= minSt) {
        const nAlpha = Math.min(1.0, (currentStage - minSt) * 2.5);
        const proj = project3D(nd.x, nd.y, nd.z, w, h);
        projectedNodes.push({ idx, nd, proj, nAlpha });
      }
    });

    projectedNodes.sort((a, b) => a.proj.depth - b.proj.depth);

    projectedNodes.forEach(item => {
      const { idx, nd, proj, nAlpha } = item;
      ctx.save();
      ctx.globalAlpha = nAlpha;

      if (nd.lvl === 0 && currentStage >= 1.4) {
        const bTop = project3D(nd.x, nd.y, nd.z + 0.22, w, h);
        const bBot = project3D(nd.x, nd.y, nd.z - 0.22, w, h);
        ctx.strokeStyle = "rgba(130, 170, 255, 0.55)";
        ctx.lineWidth = 9;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(bBot.sx, bBot.sy);
        ctx.lineTo(bTop.sx, bTop.sy);
        ctx.stroke();
      }

      if (nd.lvl === 2 && currentStage >= 3.4) {
        const permAlpha = Math.min(1.0, (currentStage - 3.4) * 1.8);
        ctx.save();
        ctx.globalAlpha = nAlpha * permAlpha * 0.85;
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let k = 0; k <= 6; k++) {
          const a = timeSec * 1.5 + (k / 6.0) * Math.PI * 2;
          const hp = project3D(nd.x + 0.32 * Math.cos(a), nd.y + 0.32 * Math.sin(a), nd.z, w, h);
          if (k === 0) ctx.moveTo(hp.sx, hp.sy);
          else ctx.lineTo(hp.sx, hp.sy);
        }
        ctx.stroke();
        ctx.restore();
      }

      if (currentStage >= 8.2) {
        ctx.beginPath();
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 2.2;
        ctx.arc(proj.sx, proj.sy, nd.r + 5 + 1.5 * Math.sin(timeSec * 4 + idx), 0, Math.PI * 2);
        ctx.stroke();
      }

      const isSel = selectedNode === idx;
      ctx.beginPath();
      ctx.fillStyle = isSel ? "#ffffff" : nd.col;
      ctx.strokeStyle = isSel ? "#FFD700" : "#ffffff";
      ctx.lineWidth = isSel ? 3.0 : 1.6;
      ctx.arc(proj.sx, proj.sy, nd.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = (nd.lvl >= 1 || isSel) ? "#000000" : "#ffffff";
      ctx.font = "bold 9.5px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(nd.id, proj.sx, proj.sy + 0.5);

      ctx.restore();
    });

    requestAnimationFrame(renderFrame);
  }

  // Window Controller Handlers
  window.set3DStage = function(stVal, manual) {
    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(stVal)));
    const stInt = Math.round(targetStage);

    const slider = document.getElementById('hud3d-slider');
    if (slider && Math.abs(parseFloat(slider.value) - targetStage) > 0.02) {
      slider.value = targetStage;
    }

    const pill = document.getElementById('hud3d-stage-pill');
    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;

    const cap = document.getElementById('hud3d-caption');
    if (cap) cap.innerHTML = STAGE_NOTES[stInt] || STAGE_NOTES[1];

    const tel = document.getElementById('hud3d-telemetry');
    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];

    if (manual) {
      autoSync = false;
      const btn = document.getElementById('btn-sync-3d');
      if (btn) { btn.classList.remove('active'); btn.innerText = "Sync Off"; }
    }
  };

  window.scrub3DStage = function(val) {
    window.set3DStage(val, true);
  };

  window.enable3DAutoSync = function() {
    autoSync = true;
    const btn = document.getElementById('btn-sync-3d');
    if (btn) { btn.classList.add('active'); btn.innerText = "Auto-Sync"; }
    sync3DWithDeck();
  };

  window.toggle3DOrbit = function() {
    autoOrbit = !autoOrbit;
    const btn = document.getElementById('btn-orbit-3d');
    if (btn) btn.classList.toggle('active', autoOrbit);
  };

  window.toggle3DSpotlight = function() {
    const hud = document.getElementById('syntrix-3d-hud');
    if (hud) {
      hud.classList.remove('minimized');
      hud.classList.toggle('spotlight');
      setTimeout(resizeCanvas, 360);
    }
  };

  window.toggle3DMinimize = function() {
    const hud = document.getElementById('syntrix-3d-hud');
    const btn = document.getElementById('btn-min-3d');
    if (hud) {
      hud.classList.remove('spotlight');
      hud.classList.toggle('minimized');
      if (btn) btn.innerText = hud.classList.contains('minimized') ? "+" : "—";
      setTimeout(resizeCanvas, 360);
    }
  };

  function sync3DWithDeck() {
    if (!autoSync) return;
    const viewport = document.querySelector('.reveal-viewport');
    const isScrollMode = viewport && viewport.classList.contains('reveal-scroll');

    if (isScrollMode) {
      const scrollEl = viewport.scrollHeight > viewport.clientHeight ? viewport : document.documentElement;
      const scrollTop = viewport.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, (scrollEl.scrollHeight || document.body.scrollHeight) - window.innerHeight);
      const frac = Math.min(1.0, Math.max(0.0, scrollTop / maxScroll));
      window.set3DStage(1.0 + frac * 9.0, false);
    } else if (window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const totalSlides = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 9);
      const slideIndex = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fragOffset = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      const st = 1.0 + ((slideIndex + fragOffset) / Math.max(1, totalSlides - 1)) * 9.0;
      window.set3DStage(st, false);
    }
  }

  function init3DEngine() {
    inject3DHUD();
    canvas = document.getElementById('syntrix-3d-canvas');
    wrap = document.getElementById('syntrix-canvas-wrap');
    if (!canvas || !wrap) return;
    ctx = canvas.getContext('2d');

    wrap.addEventListener('mousedown', e => {
      e.stopPropagation();
      isDragging = true;
      lastMX = e.clientX;
      lastMY = e.clientY;
    });

    wrap.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMX = e.touches[0].clientX;
        lastMY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = e.clientX - lastMX;
      const dy = e.clientY - lastMY;
      lastMX = e.clientX;
      lastMY = e.clientY;
      camYaw += dx * 0.012;
      camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
    });

    window.addEventListener('touchmove', e => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMX;
      const dy = e.touches[0].clientY - lastMY;
      lastMX = e.touches[0].clientX;
      lastMY = e.touches[0].clientY;
      camYaw += dx * 0.012;
      camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
    }, { passive: true });

    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });

    wrap.addEventListener('click', e => {
      e.stopPropagation();
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let hit = null;
      for (let i = projectedNodes.length - 1; i >= 0; i--) {
        const p = projectedNodes[i];
        const dist = Math.hypot(mx - p.proj.sx, my - p.proj.sy);
        if (dist <= p.nd.r + 6) {
          hit = p;
          break;
        }
      }
      const insp = document.getElementById('hud3d-node-inspector');
      if (hit && insp) {
        selectedNode = hit.idx;
        insp.innerText = hit.nd.info;
      } else if (insp) {
        selectedNode = null;
        insp.innerText = "Drag to Rotate 3D · Click Node to Inspect";
      }
    });

    wrap.addEventListener('wheel', e => {
      e.preventDefault();
      e.stopPropagation();
      camZoom = Math.max(0.65, Math.min(2.0, camZoom - e.deltaY * 0.001));
    }, { passive: false });

    resizeCanvas();
    window.set3DStage(1.0, false);
    requestAnimationFrame(renderFrame);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', sync3DWithDeck, { passive: true });
    const vp = document.querySelector('.reveal-viewport');
    if (vp) vp.addEventListener('scroll', sync3DWithDeck, { passive: true });

    if (window.Reveal) {
      window.Reveal.on('ready', sync3DWithDeck);
      window.Reveal.on('slidechanged', sync3DWithDeck);
      window.Reveal.on('fragmentshown', sync3DWithDeck);
      window.Reveal.on('fragmenthidden', sync3DWithDeck);
    }

    const hud = document.getElementById('syntrix-3d-hud');
    if (hud) {
      hud.querySelectorAll('input, button').forEach(el => {
        el.addEventListener('keydown', e => e.stopPropagation());
        el.addEventListener('mousedown', e => e.stopPropagation());
        el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DEngine);
  } else {
    init3DEngine();
  }
})();
