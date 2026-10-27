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
