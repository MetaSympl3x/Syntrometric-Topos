window.mapToPercent = function(val) {
  return ((parseFloat(val) + 2.0) / 4.0) * 100;
};

// WIDGET 1: §1.1.1–1.1.2 Bands & Live SVG Aspect Compass
window.updateBands = function() {
  const elA = document.getElementById('sl-a');
  if (!elA) return;
  let a = parseFloat(elA.value);
  let f = parseFloat(document.getElementById('sl-f').value);
  let b = parseFloat(document.getElementById('sl-b').value);
  if (f < a) { f = a; document.getElementById('sl-f').value = f; }
  if (f > b) { f = b; document.getElementById('sl-f').value = b; }

  let al = parseFloat(document.getElementById('sl-al').value);
  let d = parseFloat(document.getElementById('sl-d').value);
  let be = parseFloat(document.getElementById('sl-be').value);
  if (d < al) { d = al; document.getElementById('sl-d').value = d; }
  if (d > be) { d = be; document.getElementById('sl-d').value = be; }

  document.getElementById('p-readout').innerText = `[${a.toFixed(2)}, ${f.toFixed(2)}, ${b.toFixed(2)}]`;
  document.getElementById('d-readout').innerText = `[${al.toFixed(2)}, ${d.toFixed(2)}, ${be.toFixed(2)}]`;

  let pLeft = window.mapToPercent(a), pRight = window.mapToPercent(b), pDot = window.mapToPercent(f);
  document.getElementById('p-fill').style.left = pLeft + '%';
  document.getElementById('p-fill').style.width = Math.max(1.0, pRight - pLeft) + '%';
  document.getElementById('p-dot').style.left = pDot + '%';

  let dLeft = window.mapToPercent(al), dRight = window.mapToPercent(be), dDot = window.mapToPercent(d);
  document.getElementById('d-fill').style.left = dLeft + '%';
  document.getElementById('d-fill').style.width = Math.max(1.0, dRight - dLeft) + '%';
  document.getElementById('d-dot').style.left = dDot + '%';

  // Update Live SVG Aspect Compass
  let rMin = 24 + (a + 2.0) * 16;
  let rMax = 24 + (b + 2.0) * 16;
  let rFoc = 24 + (f + 2.0) * 16;
  let ang1 = -0.7, ang2 = 0.25;
  let x1 = (rMin * Math.cos(ang1)).toFixed(1), y1 = (rMin * Math.sin(ang1)).toFixed(1);
  let x2 = (rMax * Math.cos(ang1)).toFixed(1), y2 = (rMax * Math.sin(ang1)).toFixed(1);
  let x3 = (rMax * Math.cos(ang2)).toFixed(1), y3 = (rMax * Math.sin(ang2)).toFixed(1);
  let x4 = (rMin * Math.cos(ang2)).toFixed(1), y4 = (rMin * Math.sin(ang2)).toFixed(1);
  const poly = document.getElementById('svg-p-band');
  if (poly) poly.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`);

  const pPt = document.getElementById('svg-p-pt');
  if (pPt) {
    pPt.setAttribute('cx', (rFoc * Math.cos(-0.22)).toFixed(1));
    pPt.setAttribute('cy', (rFoc * Math.sin(-0.22)).toFixed(1));
  }
  const dEll = document.getElementById('svg-d-ellipse');
  let rx = Math.max(12, 22 + (be - al) * 16);
  let ry = Math.max(10, 14 + (be - al) * 10);
  if (dEll) {
    dEll.setAttribute('rx', rx.toFixed(1));
    dEll.setAttribute('ry', ry.toFixed(1));
  }
  const dPt = document.getElementById('svg-d-pt');
  if (dPt) {
    let dAng = d * 1.1;
    dPt.setAttribute('cx', (rx * Math.cos(dAng)).toFixed(1));
    dPt.setAttribute('cy', (ry * Math.sin(dAng)).toFixed(1));
  }
  const cap = document.getElementById('compass-caption');
  if (cap) {
    let dp = (b - a).toFixed(2), dd = (be - al).toFixed(2);
    cap.innerText = (dp === "0.00" && dd === "0.00")
      ? "CLASSICAL BOOLEAN LIMIT (ΔP = 0, ΔD = 0)"
      : `Bandwidth ΔP = ${dp} | ΔD = ${dd}`;
  }
};

window.booleanCollapse = function() {
  ['sl-a','sl-f','sl-b','sl-al','sl-d','sl-be'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = 0.0;
  });
  window.updateBands();
};

window.flipCipher = function() {
  const fEl = document.getElementById('sl-f');
  const dEl = document.getElementById('sl-d');
  if (fEl && dEl) {
    fEl.value = (-parseFloat(fEl.value)).toFixed(2);
    dEl.value = (-parseFloat(dEl.value)).toFixed(2);
    window.updateBands();
  }
};

window.resetBands = function() {
  document.getElementById('sl-a').value = -1.45;
  document.getElementById('sl-f').value = 0.40;
  document.getElementById('sl-b').value = 1.55;
  document.getElementById('sl-al').value = -1.25;
  document.getElementById('sl-d').value = 0.65;
  document.getElementById('sl-be').value = 1.35;
  window.updateBands();
};

// WIDGET 2: §1.1.4 The 7 Nonempty Aspect Subsystems (Prop. 1.2)
window.subsysState = { D: true, K: true, P: true };
window.toggleSubsys = function(comp) {
  window.subsysState[comp] = !window.subsysState[comp];
  if (!window.subsysState.D && !window.subsysState.K && !window.subsysState.P) {
    window.subsysState[comp] = true;
  }
  ['D','K','P'].forEach(k => {
    const btn = document.getElementById('btn-sub-' + k.toLowerCase());
    if (btn) btn.className = 'subsys-toggle' + (window.subsysState[k] ? ' on' : '');
  });
  let active = [];
  if (window.subsysState.D) active.push('D_nn');
  if (window.subsysState.K) active.push('K_n');
  if (window.subsysState.P) active.push('P_nn');
  let count = active.length;
  let tierName = count === 3 ? "Total Subsystem C(3,3)=1" : (count === 2 ? "Two-Component Subsystem C(3,2)=3" : "Single-Component Subsystem C(3,1)=3");
  let arityRule = count === 3 ? "Predicative Arity n VARIABLE (Total Generator α)" : "Predicative Arity n FIXED (Partial Generator α — Def. 1.1)";
  const box = document.getElementById('subsys-readout');
  if (box) {
    box.style.borderLeftColor = count === 3 ? "#20B2AA" : "#FFA500";
    box.innerText = `Support: {${active.join(', ')}} [${tierName}] ⇒ ${arityRule}`;
  }
};

// WIDGET 3: §1.2.3 Toy 2-Channel Laboratory
window.updateToy = function() {
  const elD1 = document.getElementById('toy-d1');
  if (!elD1) return;
  let d1 = parseFloat(elD1.value);
  let f1 = parseFloat(document.getElementById('toy-f1').value);
  let d2 = parseFloat(document.getElementById('toy-d2').value);
  let f2 = parseFloat(document.getElementById('toy-f2').value);
  let c1 = d1 * f1;
  let c2 = d2 * f2;
  let normOut = Math.max(Math.abs(c1), Math.abs(c2));
  let normBound = Math.max(d1, d2) * Math.max(Math.abs(f1), Math.abs(f2));
  document.getElementById('toy-matrix-output').innerText =
    `K^U(d ⊗ p) = [ c₁ = ${c1.toFixed(2)} , c₂ = ${c2.toFixed(2)} ]ᵀ  |  ‖K^U(d ⊗ p)‖_∞ = ${normOut.toFixed(2)} ≤ ‖d‖_∞‖p‖_∞ = ${normBound.toFixed(2)} ≤ 1.00`;
};

// WIDGET 4: §1.4 Kripke-Joyal Heyting Countermodel Explorer
window.kripkeState = { w: false, u: true, v: false };
window.toggleKripkeWorld = function(node) {
  if (node === 'w') {
    window.kripkeState.w = !window.kripkeState.w;
    if (window.kripkeState.w) {
      window.kripkeState.u = true;
      window.kripkeState.v = true;
    }
  } else {
    window.kripkeState[node] = !window.kripkeState[node];
    if (!window.kripkeState[node]) {
      window.kripkeState.w = false;
    }
  }
  window.renderKripkeWidget();
};

window.renderKripkeWidget = function() {
  const st = window.kripkeState;
  ['w','u','v'].forEach(k => {
    const c = document.getElementById('kr-' + k);
    const l = document.getElementById('kr-' + k + '-lbl');
    if (c && l) {
      c.setAttribute('fill', st[k] ? '#20B2AA' : '#1e293b');
      l.setAttribute('fill', st[k] ? '#000' : '#94a3b8');
      l.textContent = `${k} ${st[k] ? '⊩' : '⊭'} p`;
    }
  });
  let wForcesP = st.w;
  let wForcesNotP = (!st.w && !st.u && !st.v);
  let wForcesLEM = wForcesP || wForcesNotP;
  const box = document.getElementById('kripke-readout');
  if (box) {
    if (!wForcesLEM) {
      box.style.borderLeftColor = "#FFA500";
      box.innerText = `At Root w: w ⊭ p AND w ⊭ ¬p (since extension forces p) ⇒ w ⊭ (p ∨ ¬p) [Non-Boolean Gap!] | Glivenko: w ⊩ ¬¬(p ∨ ¬p) = ⊤`;
    } else {
      box.style.borderLeftColor = "#20B2AA";
      box.innerText = `At Root w: ${wForcesP ? 'w ⊩ p' : 'w ⊩ ¬p (refuted on all extensions)'} ⇒ w ⊩ (p ∨ ¬p) [Decided in Context w]`;
    }
  }
};

// WIDGET 5: §1.5 3-Observer Holoform & Cech Cocycle Simulator
window.updateHoloform = function() {
  const elS1 = document.getElementById('hol-s1');
  if (!elS1) return;
  let s1 = parseFloat(elS1.value);
  let s2 = parseFloat(document.getElementById('hol-s2').value);
  let s3 = parseFloat(document.getElementById('hol-s3').value);
  let eps = parseFloat(document.getElementById('hol-eps').value);

  document.getElementById('hol-s1-val').innerText = (s1 >= 0 ? '+' : '') + s1.toFixed(2);
  document.getElementById('hol-s2-val').innerText = (s2 >= 0 ? '+' : '') + s2.toFixed(2);
  document.getElementById('hol-s3-val').innerText = (s3 >= 0 ? '+' : '') + s3.toFixed(2);
  document.getElementById('hol-eps-val').innerText = eps.toFixed(2);

  let d12 = Math.abs(s1 - s2), d23 = Math.abs(s2 - s3), d13 = Math.abs(s1 - s3);
  let def = Math.max(d12, d23, d13);
  let gamma = (s1 + s2 + s3) / 3.0;

  const setEdge = (id, d) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('stroke', d <= eps ? '#20B2AA' : '#DC143C');
  };
  setEdge('hol-e12', d12);
  setEdge('hol-e23', d23);
  setEdge('hol-e13', d13);

  const cNode = document.getElementById('hol-center');
  const cTxt = document.getElementById('hol-center-txt');
  const box = document.getElementById('hol-status-box');

  if (def <= eps) {
    if (cNode) { cNode.setAttribute('fill', 'rgba(32,178,170,0.35)'); cNode.setAttribute('stroke', '#FFD700'); }
    if (cTxt) { cTxt.setAttribute('fill', '#FFD700'); cTxt.textContent = 'Γ_σ'; }
    box.style.borderLeftColor = "#20B2AA";
    box.style.color = "#FFD700";
    box.innerText = `‖Def_U(s)‖_Č¹ = ${def.toFixed(2)} ≤ ε (${eps.toFixed(2)}) ⇒ HOLOFORM CONDENSED: Γ_σ = ${gamma.toFixed(2)} ∈ Hol_ε(U, A)`;
  } else {
    if (cNode) { cNode.setAttribute('fill', 'rgba(220,20,60,0.25)'); cNode.setAttribute('stroke', '#DC143C'); }
    if (cTxt) { cTxt.setAttribute('fill', '#ff6b81'); cTxt.textContent = '∅'; }
    box.style.borderLeftColor = "#DC143C";
    box.style.color = "#ff6b81";
    box.innerText = `‖Def_U(s)‖_Č¹ = ${def.toFixed(2)} > ε (${eps.toFixed(2)}) ⇒ ANTAGONISMUS (Čech 0-Coboundary Obstruction δ⁰s ≠ 0)`;
  }
};

window.alignHoloform = function() {
  document.getElementById('hol-s1').value = 0.48;
  document.getElementById('hol-s2').value = 0.48;
  document.getElementById('hol-s3').value = 0.48;
  window.updateHoloform();
};

window.epsHoloform = function() {
  document.getElementById('hol-s1').value = 0.45;
  document.getElementById('hol-s2').value = 0.50;
  document.getElementById('hol-s3').value = 0.51;
  document.getElementById('hol-eps').value = 0.10;
  window.updateHoloform();
};

window.perturbHoloform = function() {
  document.getElementById('hol-s1').value = -0.60;
  document.getElementById('hol-s2').value = 0.65;
  document.getElementById('hol-s3').value = 0.10;
  window.updateHoloform();
};

// WIDGET 6: §1.6 T-Norm & Dialectical Aufhebung
window.updateTNorm = function() {
  const elType = document.getElementById('tnorm-type');
  if (!elType) return;
  let type = elType.value;
  let u = parseFloat(document.getElementById('tn-u').value);
  let v = parseFloat(document.getElementById('tn-v').value);
  let th = parseFloat(document.getElementById('tn-th').value);
  let disc = parseFloat(document.getElementById('tn-disc').value);

  let chi = 0.0;
  if (type === "product") chi = u * v;
  else if (type === "godel") chi = Math.min(u, v);
  else if (type === "lukasiewicz") chi = Math.max(0.0, u + v - 1.0);

  let coordStr = chi > th ? `COORDINATED (χ=${chi.toFixed(2)} > θ=${th.toFixed(2)})` : `UNCOORDINATED (χ=${chi.toFixed(2)} ≤ θ=${th.toFixed(2)})`;
  let antStr = disc > 0.30 ? `|v₁-v₂|=${disc.toFixed(2)} > θ_tol ⇒ Ant_mer ∧ Ant_desc Active` : `|v₁-v₂|=${disc.toFixed(2)} ≤ θ_tol ⇒ Compatible (No Antagonism)`;

  let box = document.getElementById('tnorm-readout');
  box.style.borderLeftColor = (chi > th && disc <= 0.30) ? "#20B2AA" : "#DC143C";
  box.style.color = (chi > th && disc <= 0.30) ? "#FFD700" : "#ff6b81";
  box.innerText = `${coordStr}  |  ${antStr}`;
};

window.triggerAufhebung = function() {
  document.getElementById('tn-disc').value = 0.00;
  document.getElementById('tn-u').value = 0.90;
  document.getElementById('tn-v').value = 0.90;
  window.updateTNorm();
  let box = document.getElementById('tnorm-readout');
  box.style.borderLeftColor = "#20B2AA";
  box.style.color = "#5eead4";
  box.innerText = `AUFHEBUNG EXECUTED: S_mod(x) → S'_mod(x') with Synthesize(A, B) = C ∈ Prop₁ (Internal Incompatibility Resolved!)`;
};

// WIDGET 7: §1.7 Polarimeter & Metropie Flow
window.updatePolarimeter = function() {
  const elTh = document.getElementById('pol-theta');
  if (!elTh) return;
  let deg = parseFloat(elTh.value);
  let rad = deg * Math.PI / 180.0;
  let dh = parseFloat(document.getElementById('pol-dh').value);
  let dv = parseFloat(document.getElementById('pol-dv').value);
  document.getElementById('pol-theta-lbl').innerText = deg.toFixed(0) + '°';

  let fh = Math.cos(rad);
  let fv = Math.sin(rad);
  let kh = dh * fh;
  let kv = dv * fv;
  let normInf = Math.max(Math.abs(kh), Math.abs(kv));
  let bound = Math.sqrt(dh * dh + dv * dv);
  let metropieLen = Math.sqrt(3.0) * rad;

  const vec = document.getElementById('pol-vec');
  const tip = document.getElementById('pol-tip');
  if (vec && tip) {
    let vx = (48 * fh).toFixed(1), vy = (-48 * fv).toFixed(1);
    vec.setAttribute('x2', vx);
    vec.setAttribute('y2', vy);
    tip.setAttribute('cx', vx);
    tip.setAttribute('cy', vy);
  }

  document.getElementById('pol-readout').innerText =
    `z^U(${deg}°) ∈ SO(6) | K(d,p) = (${kh.toFixed(2)}, ${kv.toFixed(2)}) | ‖K‖_∞ = ${normInf.toFixed(2)} ≤ ‖d‖₂‖p‖₂ = ${bound.toFixed(2)} | Metropie ℓ(γ) = ${metropieLen.toFixed(2)}`;
};

// WIDGET 8: §1.8 Sequent Calculus Rule Browser & Generic Proof/Detail Tab Switcher
window.showRuleTab = function(idx, btnEl) {
  for (let i = 1; i <= 6; i++) {
    const p = document.getElementById('rule-pane-' + i);
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

// ---------------------------------------------------------------------------
// VIDEO CONTROL: play Manim clips only while their slide is visible
// (works in both slide mode and scroll mode).
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
// WIDGET WIRING (idempotent: safe to call repeatedly)
// ---------------------------------------------------------------------------
function renderAllWidgets() {
  window.updateBands();
  window.updateToy();
  window.renderKripkeWidget();
  window.updateHoloform();
  window.updateTNorm();
  window.updatePolarimeter();
}

function bindControlsOnce() {
  document.querySelectorAll('input[type="range"], select, button').forEach(el => {
    if (el.dataset.synBound) return;
    el.dataset.synBound = '1';
    // Keep Reveal's keyboard/touch navigation from hijacking widget interaction.
    el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());
  });
}

let synInitialised = false;
function initChapter1() {
  if (synInitialised) return;
  synInitialised = true;
  prepareVideos();
  bindControlsOnce();
  renderAllWidgets();
  syncVideosToSlide();
}

if (window.Reveal && window.Reveal.on) {
  // Quarto loads this script before Reveal.initialize resolves; hook both paths.
  window.Reveal.on('ready', initChapter1);
  window.Reveal.on('slidechanged', syncVideosToSlide);
  window.Reveal.on('fragmentshown', syncVideosToSlide);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter1();
  });
} else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
  initChapter1();
}


// =========================================================================
// CHAPTER 1: 60FPS 3D INTERACTIVE TOPOS, PULLBACK & HOLOFORM ENGINE
// =========================================================================

const CH1_3D_STYLE = `
#ch1-3d-hud {
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

#ch1-3d-hud *, #ch1-3d-hud *::before, #ch1-3d-hud *::after {
  box-sizing: border-box;
}

#ch1-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch1-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch1-3d-hud.minimized .ch1-hud-body {
  display: none;
}

.ch1-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch1-hud-title {
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

.ch1-hud-title span:first-child {
  line-height: 1.15;
}

.ch1-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch1-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch1-hud-btn {
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

.ch1-hud-btn:hover, .ch1-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch1-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch1-canvas-wrap:active {
  cursor: grabbing;
}

#ch1-3d-hud.spotlight .ch1-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch1-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch1-overlay-bar {
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

.ch1-telemetry {
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

#ch1-node-inspector {
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

.ch1-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch1-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch1-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch1-scrubber .ch1-hud-btn {
  flex-shrink: 0;
}

#ch1-caption {
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
  #ch1-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch1-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch1-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch1-hud-controls {
    gap: 3px;
  }
  .ch1-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch1-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch1-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch1-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch1-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch1-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch1-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch1-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch1-hud-controls {
    gap: 3px;
  }
  .ch1-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch1-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch1-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch1-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch1-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch1-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch1-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch1-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH1_3D_HTML = `
<div class="ch1-hud-header">
    <div class="ch1-hud-title">
      <span>🧭 Ch 1 · 3D Topos Engine</span>
      <span id="ch1-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>
    </div>
    <div class="ch1-hud-controls">
      <button class="ch1-hud-btn active" id="ch1-btn-orbit" onclick="toggleCh1Orbit()">⟳ Orbit</button>
      <button class="ch1-hud-btn" onclick="toggleCh1Spotlight()">⛶ Spotlight</button>
      <button class="ch1-hud-btn" id="ch1-btn-min" onclick="toggleCh1Minimize()">+</button>
    </div>
  </div>

  <div class="ch1-hud-body">
    <div class="ch1-canvas-wrap" id="ch1-canvas-wrap">
      <canvas id="ch1-3d-canvas"></canvas>
      <div class="ch1-overlay-bar">
        <div class="ch1-telemetry" id="ch1-telemetry">ℰ_syn = Sh(Ctx_adm^sk, J_syn)</div>
        <div id="ch1-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>
      </div>
    </div>

    <div class="ch1-scrubber">
      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>
      <input type="range" id="ch1-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh1Stage(this.value)">
      <button class="ch1-hud-btn active" id="ch1-btn-sync" onclick="enableCh1Sync()">Auto-Sync</button>
    </div>

    <div id="ch1-caption">
      <b>Stage 1 (Firewall &amp; Aufbau):</b> 4-Stratum Epistemic Firewall (A, B, C, D) blocking illicit upward transfer.
    </div>
  </div>
`;

function injectCh13DHUD() {
  if (document.getElementById('ch1-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH1_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch1-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH1_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch1_3d_engine_loaded) return;
  window.__ch1_3d_engine_loaded = true;

  function runCh1Engine() {
    injectCh13DHUD();
    if (window.__ch1_3d_engine_initialized) return;
    window.__ch1_3d_engine_initialized = true;

    const canvas = document.getElementById('ch1-3d-canvas');
    const wrap = document.getElementById('ch1-canvas-wrap');
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');

    let targetStage = 1.0;
    let curStage = 1.0;
    let autoSync = true;
    let autoOrbit = true;
    let camYaw = -0.52;
    let camPitch = 0.34;
    let camZoom = 1.65;
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let timeSec = 0;
    let hitNodes = [];
    let selectedId = null;

    const STAGE_CAPTIONS = {
      1: "<b>Stage 1 (Frontmatter &amp; Firewall):</b> 4-Stratum Epistemic Firewall (D → C → B → A) with Non-Transfer Barrier (A ⇏ C ⇏ E).",
      2: "<b>Stage 2 (Crisis of Bivalence &amp; Carnap 1.1):</b> Continuous context wave φ(U) shattered by a binary {0,1} sieve vs. smooth Heyting sieves Ω(U).",
      3: "<b>Stage 3 (§1.1.1–1.1.3 — Aspect Compass, SM-1–SM-4):</b> 3D radial Prädikatbänder P_nn, tilted Dialektik ring D_nn &amp; Koordination lens K_n.",
      4: "<b>Stage 4 (§1.1.4–1.1.6 — 7 Aspect Subsystems):</b> 3D Boolean Hypercube {D, K, P} highlighting the 2³ − 1 = 7 nonempty generator supports (Prop. 1.2).",
      5: "<b>Stage 5 (§1.2.1–1.2.3 — Naturality in Ban_≤1):</b> Commuting 3D Naturality Prism α_C ∘ K^U = K^V ∘ (α_D ⊗̂_π α_P) eliminating context creep.",
      6: "<b>Stage 6 (§1.2.3 — Prop. 1.13 Pullback W = V₁ ×_U V₂):</b> 3D ℓ^∞ unit cube F^{V₁} ⊕_∞ F^{V₂} sliced by the contractive equalizer plane.",
      7: "<b>Stage 7 (§1.3–1.4 — Subcanonical Site &amp; Hyperdoctrine Prism):</b> Base pullback W lifted to subobject fibers (∃_f ⊣ f* ⊣ ∀_f Beck–Chevalley).",
      8: "<b>Stage 8 (§1.5 — Thm. 1.22/1.24 Holoform Crystal):</b> Vanishing Čech defect Def_U(s) = δ⁰(s) = 0 condenses the golden 3D Holoform Γ ∈ Hol(U,P)!",
      9: "<b>Stage 9 (§1.6–1.7 — Dialectical Aufhebung &amp; Metropie d_P):</b> Conflicting A, B ∈ Prop₀ sublate along the 3D helix into C ∈ Prop₁ inside SO(6) flow.",
      10: "<b>Stage 10 (§1.8–1.11 — Tri-Layer Synthesis &amp; ℒ_iMSL):</b> Layer 1 Topos ℰ_syn + Layer 2 Fischer–Servi Frame + Layer 3 Cut-Free Sequent Crown!"
    };

    const STAGE_TELEMETRY = {
      1: "Firewall: ClaimType(c) = (S, T, R, V, E_p)",
      2: "U ⊭ φ ∨ ¬φ  ⇏  U ⊩ ⊥ (Heyting Ω)",
      3: "S ≡ ⌈D_nn × K_n × P_nn⌉ (SM Eq. 1)",
      4: "Prop 1.2: 2³ − 1 = 7 Aspect Subsystems",
      5: "‖K^U(d ⊗ p)‖ ≤ ‖d‖·‖p‖ ≤ 1 (Ban_≤1)",
      6: "Pullback W = V₁ ×_U V₂ in ℓ^∞ Norm",
      7: "Beck–Chevalley: g*∃_f ≅ ∃_{π₁}π₂*",
      8: "Holoform Γ ∈ Eq(d⁰, d¹) | Def_U(s) ≤ ε",
      9: "Aufhebung: Synthesize(A,B) ∈ Prop₁",
      10: "S(x); Γ ⊢^k φ ⟺ S(x); Γ ⊨^k φ (Thm 1.38)"
    };

    function resize() {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function proj(x, y, z, w, h) {
      const cy = Math.cos(camYaw), sy = Math.sin(camYaw);
      const x1 = x * cy - y * sy;
      const y1 = x * sy + y * cy;
      const cp = Math.cos(camPitch), sp = Math.sin(camPitch);
      const y2 = y1 * cp - z * sp;
      const z2 = y1 * sp + z * cp;
      const fov = Math.min(w, h) * 0.43 * camZoom;
      const sc = fov / Math.max(0.85, 4.6 - y2 * 0.45);
      return { sx: w * 0.5 + x1 * sc, sy: h * 0.53 - z2 * sc, depth: y2, sc: sc / 100 };
    }

    function drawLine3D(p1, p2, col, lw, dash) {
      ctx.save();
      ctx.beginPath();
      if (dash) ctx.setLineDash(dash);
      ctx.strokeStyle = col;
      ctx.lineWidth = lw || 2;
      ctx.moveTo(p1.sx, p1.sy);
      ctx.lineTo(p2.sx, p2.sy);
      ctx.stroke();
      ctx.restore();
    }

    function drawNode3D(id, x, y, z, r, fill, stroke, label, info, w, h) {
      const p = proj(x, y, z, w, h);
      hitNodes.push({ id, p, r, info });
      const isSel = (selectedId === id);
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = isSel ? "#ffffff" : fill;
      ctx.strokeStyle = isSel ? "#FFD700" : (stroke || "#ffffff");
      ctx.lineWidth = isSel ? 3.0 : 1.6;
      ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      if (label) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9.5px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(label, p.sx, p.sy - r - 4);
      }
      ctx.restore();
      return p;
    }

    function renderStage1(w, h) {
      const strata = [
        { z: -1.1, col: "#94a3b8", lbl: "Stratum D: Historical Exegesis (SM 2000)", id: "S_D" },
        { z: -0.4, col: "#FFA500", lbl: "Stratum C: Reconstruction Map ℛ", id: "S_C" },
        { z:  0.4, col: "#20B2AA", lbl: "Stratum B: Derived Logic ℒ_iMSL & Hol", id: "S_B" },
        { z:  1.1, col: "#4169E1", lbl: "Stratum A: Foundational Topos ℰ_syn", id: "S_A" }
      ];
      strata.forEach((st, idx) => {
        const c = [
          proj(-1.3, -0.8, st.z, w, h), proj(1.3, -0.8, st.z, w, h),
          proj(1.3,  0.8, st.z, w, h), proj(-1.3,  0.8, st.z, w, h)
        ];
        ctx.save();
        ctx.fillStyle = idx === 3 ? "rgba(65,105,225,0.22)" : "rgba(30,41,59,0.45)";
        ctx.strokeStyle = st.col;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(c[0].sx, c[0].sy);
        c.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        drawNode3D(st.id, 0, 0, st.z, 7, st.col, "#fff", st.id, st.lbl, w, h);
      });
      const fwZ = 0.0 + 0.04 * Math.sin(timeSec * 3);
      const fw = [
        proj(-1.45, -0.95, fwZ, w, h), proj(1.45, -0.95, fwZ, w, h),
        proj(1.45,  0.95, fwZ, w, h), proj(-1.45,  0.95, fwZ, w, h)
      ];
      ctx.save();
      ctx.fillStyle = "rgba(220, 20, 60, 0.28)";
      ctx.strokeStyle = "#DC143C";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(fw[0].sx, fw[0].sy);
      fw.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    function renderStage2(w, h) {
      for (let y = -0.9; y <= 0.91; y += 0.45) {
        ctx.beginPath();
        ctx.strokeStyle = "#20B2AA";
        ctx.lineWidth = 2.2;
        for (let x = -1.6; x <= 1.61; x += 0.1) {
          const z = 0.65 * Math.sin(x * 2.2 + timeSec * 2) * Math.cos(y * 1.5);
          const p = proj(x, y, z, w, h);
          if (x === -1.6) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }
      for (let k = -1; k <= 1; k++) {
        const xZero = (k * Math.PI - (timeSec * 2) % Math.PI) / 2.2;
        if (Math.abs(xZero) < 1.45) {
          const pBot = proj(xZero, 0, -0.95, w, h);
          const pTop = proj(xZero, 0,  1.15, w, h);
          drawLine3D(pBot, pTop, "#DC143C", 2.8, [3, 2]);
          drawNode3D("Ant_" + k, xZero, 0, 1.15, 6, "#DC143C", "#FFD700", "⚡Antinomy", "Binary Sieve Tear: U ⊭ φ ∨ ¬φ forced into {0,1}", w, h);
        }
      }
    }

    function renderStage3(w, h) {
      for (let q = 0; q < 6; q++) {
        const a1 = (q / 6) * Math.PI * 2 + timeSec * 0.25;
        const a2 = a1 + 0.38;
        const p0 = proj(0, 0, 0, w, h);
        const p1 = proj(1.45 * Math.cos(a1), 1.45 * Math.sin(a1), 0, w, h);
        const p2 = proj(1.45 * Math.cos(a2), 1.45 * Math.sin(a2), 0, w, h);
        ctx.save();
        ctx.fillStyle = "rgba(65, 105, 225, 0.28)";
        ctx.strokeStyle = "#4169E1";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy);
        ctx.lineTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.strokeStyle = "#20B2AA";
      ctx.lineWidth = 3.0;
      for (let i = 0; i <= 48; i++) {
        const a = (i / 48) * Math.PI * 2;
        const p = proj(1.15 * Math.cos(a), 0.85 * Math.sin(a), 0.65 * Math.sin(a + timeSec), w, h);
        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
      }
      ctx.stroke();
      drawNode3D("K_n", 0, 0, 0, 13, "#FFA500", "#FFD700", "K_n ≡ E_n F(ζ,z)", "Koordination Lens K^U : D^U ⊗̂_π P^U → C^U (SM Eq. 1)", w, h);
      drawNode3D("P_nn", 1.25, 0.3, 0, 7, "#4169E1", "#fff", "P_nn [a,f,b]", "Prädikatrix Continuous Interval Cylinder S_P^U", w, h);
      drawNode3D("D_nn", -0.8, 0.6, 0.5, 7, "#20B2AA", "#fff", "D_nn [α,d,β]", "Dialektik Evaluative Nuance Band S_D^U", w, h);
    }

    function renderStage4(w, h) {
      const verts = [];
      const labels = ["∅", "{D}", "{K}", "{D,K}", "{P}", "{D,P}", "{K,P}", "{D,K,P}"];
      for (let b = 0; b < 8; b++) {
        const dx = (b & 1) ? 0.9 : -0.9;
        const dy = (b & 2) ? 0.9 : -0.9;
        const dz = (b & 4) ? 0.85 : -0.85;
        verts.push({ b, x: dx, y: dy, z: dz, lbl: labels[b] });
      }
      for (let i = 0; i < 8; i++) {
        for (let j = i + 1; j < 8; j++) {
          const xor = i ^ j;
          if (xor === 1 || xor === 2 || xor === 4) {
            const p1 = proj(verts[i].x, verts[i].y, verts[i].z, w, h);
            const p2 = proj(verts[j].x, verts[j].y, verts[j].z, w, h);
            drawLine3D(p1, p2, (i === 0) ? "rgba(148,163,184,0.3)" : "rgba(32,178,170,0.65)", 1.8);
          }
        }
      }
      verts.forEach(v => {
        const col = v.b === 0 ? "#475569" : (v.b === 7 ? "#FFD700" : "#20B2AA");
        const info = v.b === 7
          ? "Total Subsystem {D_nn, K_n, P_nn}: Allows variable arity n!"
          : (v.b === 0 ? "Empty Support (Excluded)" : `Partial Subsystem ${v.lbl}: Must keep arity n fixed (Prop. 1.2)`);
        drawNode3D("Sub_" + v.b, v.x, v.y, v.z, v.b === 7 ? 10 : 6.5, col, "#fff", v.lbl, info, w, h);
      });
    }

    function renderStage5(w, h) {
      const n1 = drawNode3D("DU_PU", -1.1, -0.6,  0.8, 8.5, "#4169E1", "#fff", "D^U ⊗̂_π P^U", "Source Projective Tensor Product (‖u‖_π ≤ 1)", w, h);
      const n2 = drawNode3D("CU",     1.1, -0.6,  0.8, 8.5, "#FFA500", "#fff", "C^U", "Source Coordinated State Space C^U", w, h);
      const n3 = drawNode3D("DV_PV", -1.1,  0.6, -0.8, 8.5, "#20B2AA", "#fff", "D^V ⊗̂_π P^V", "Target Projective Tensor Product via α_D ⊗̂_π α_P", w, h);
      const n4 = drawNode3D("CV",     1.1,  0.6, -0.8, 9.5, "#FFD700", "#fff", "C^V", "Commuting Target State: α_C(K^U) = K^V(α_D ⊗ α_P)", w, h);

      drawLine3D(n1, n2, "#FFA500", 2.6);
      drawLine3D(n1, n3, "#20B2AA", 2.6);
      drawLine3D(n2, n4, "#FFD700", 2.6);
      drawLine3D(n3, n4, "#FFD700", 2.6);

      const s = (timeSec * 0.65) % 1.0;
      const pTop = (s < 0.5)
        ? proj(-1.1 + 4.4 * s, -0.6, 0.8, w, h)
        : proj(1.1, -0.6 + 2.4 * (s - 0.5), 0.8 - 3.2 * (s - 0.5), w, h);
      const pBot = (s < 0.5)
        ? proj(-1.1, -0.6 + 2.4 * s, 0.8 - 3.2 * s, w, h)
        : proj(-1.1 + 4.4 * (s - 0.5), 0.6, -0.8, w, h);
      ctx.fillStyle = "#FFD700";
      ctx.beginPath(); ctx.arc(pTop.sx, pTop.sy, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#5eead4";
      ctx.beginPath(); ctx.arc(pBot.sx, pBot.sy, 4.5, 0, Math.PI * 2); ctx.fill();
    }

    function renderStage6And7(w, h, st) {
      const s = 0.95;
      const zShift = (st >= 6.5) ? -0.45 : 0.0;
      const cube = [];
      for (let dx of [-s, s]) for (let dy of [-s, s]) for (let dz of [-s * 0.75 + zShift, s * 0.75 + zShift]) {
        cube.push(proj(dx, dy, dz, w, h));
      }
      const edges = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];
      edges.forEach(e => drawLine3D(cube[e[0]], cube[e[1]], "rgba(130,170,255,0.42)", 1.5, [3, 2]));

      const eq = [
        proj(-s, -s, -s * 0.75 + zShift, w, h),
        proj( s,  s, -s * 0.75 + zShift, w, h),
        proj( s,  s,  s * 0.75 + zShift, w, h),
        proj(-s, -s,  s * 0.75 + zShift, w, h)
      ];
      ctx.save();
      ctx.fillStyle = "rgba(32, 178, 170, 0.34)";
      ctx.strokeStyle = "#20B2AA";
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(eq[0].sx, eq[0].sy);
      eq.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      drawNode3D("W_pb", 0, 0, zShift, 8.5, "#FFD700", "#000", "W = V₁ ×_U V₂", "Pullback in Ctx_adm^sk with ℓ^∞ Norm max(‖x₁‖, ‖x₂‖)", w, h);

      if (st >= 6.5) {
        const zUp = 0.95;
        const roof = [
          drawNode3D("Sub_W",  0.0, -0.9, zUp, 7, "#FFD700", "#fff", "Sub(yW)", "Pullback Subobject Fiber Sub(yW)", w, h),
          drawNode3D("Sub_V1", -1.1, 0.0, zUp, 7, "#4169E1", "#fff", "Sub(yV₁)", "Left Adjoint ∃_{π₁} / Right Adjoint ∀_{π₁}", w, h),
          drawNode3D("Sub_V2",  1.1, 0.0, zUp, 7, "#20B2AA", "#fff", "Sub(yV₂)", "Pullback π₂* along V₁ ×_U V₂ → V₂", w, h),
          drawNode3D("Sub_U",   0.0, 0.9, zUp, 7.5, "#FFA500", "#fff", "Sub(yU)", "Base Heyting Subobject Lattice Ω(U) (∀_f = Universalquantor)", w, h)
        ];
        drawLine3D(roof[0], roof[1], "#FFD700", 2.2);
        drawLine3D(roof[0], roof[2], "#FFD700", 2.2);
        drawLine3D(roof[1], roof[3], "#4169E1", 2.2);
        drawLine3D(roof[2], roof[3], "#20B2AA", 2.2);
        drawLine3D(proj(0, 0, zShift, w, h), roof[0], "rgba(255,215,0,0.55)", 1.8, [4, 3]);
      }
    }

    function renderStage8(w, h) {
      const obsCols = ["#4169E1", "#20B2AA", "#FFA500"];
      const obsBase = [0, 1, 2].map(k => {
        const a = (k / 3) * Math.PI * 2 + timeSec * 0.35;
        return drawNode3D(
          "V_" + (k + 1),
          1.15 * Math.cos(a), 1.15 * Math.sin(a), -0.85,
          8.5, obsCols[k], "#fff", `V_${k+1} (s_${k+1})`,
          `Local Observer Context V_${k+1}: Compatible Section s_${k+1} ∈ P(V_${k+1})`, w, h
        );
      });
      for (let i = 0; i < 3; i++) {
        drawLine3D(obsBase[i], obsBase[(i + 1) % 3], "#20B2AA", 2.4);
      }
      const top = proj(0, 0, 1.35, w, h);
      const bot = proj(0, 0, 0.15, w, h);
      const mid = [0, 1, 2, 3].map(k => {
        const a = -timeSec * 1.4 + (k / 4) * Math.PI * 2;
        return proj(0.65 * Math.cos(a), 0.65 * Math.sin(a), 0.75, w, h);
      });
      mid.forEach((m, k) => {
        drawLine3D(top, m, "#FFD700", 2.6);
        drawLine3D(bot, m, "#FFA500", 2.2);
        drawLine3D(m, mid[(k + 1) % 4], "#FFD700", 2.2);
      });
      obsBase.forEach(v => drawLine3D(v, bot, "rgba(255,215,0,0.5)", 1.6, [4, 3]));
      drawNode3D("Hol_Gamma", 0, 0, 1.35, 10, "#FFD700", "#fff", "Γ ∈ Hol(U,P)", "Global Amalgamated Holoform Section: Def_U(s) = δ⁰(s) = 0", w, h);
    }

    function renderStage9(w, h) {
      for (let strand of [-1, 1]) {
        ctx.beginPath();
        ctx.strokeStyle = strand < 0 ? "#ff6b81" : "#4169E1";
        ctx.lineWidth = 2.6;
        for (let i = 0; i <= 60; i++) {
          const t = i / 60;
          const rad = 0.95 * (1 - t * 0.88);
          const ang = strand * Math.PI * 0.5 + t * Math.PI * 3 + timeSec * 1.5;
          const p = proj(rad * Math.cos(ang), rad * Math.sin(ang), -1.1 + t * 2.3, w, h);
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }
      drawNode3D("Ant_A", -0.95, 0, -1.1, 7.5, "#DC143C", "#fff", "A ∈ Prop₀", "Basal Subobject A: |ev_P(A) − ev_P(B)| > θ_tol (Ant_mer)", w, h);
      drawNode3D("Ant_B",  0.95, 0, -1.1, 7.5, "#4169E1", "#fff", "B ∈ Prop₀", "Basal Subobject B: Dialectical Thesis/Antithesis Pair", w, h);
      drawNode3D("Auf_C",  0,    0,  1.2, 11,  "#FFD700", "#20B2AA", "C = Synthesize(A,B) ∈ Prop₁", "Thm 1.30 Dialectical Sublation (Aufhebung) into Level-1 Generator!", w, h);
    }

    function renderStage10(w, h) {
      const zTiers = [
        { z: -1.05, col: "#4169E1", lbl: "Layer 1: Sheaf Topos ℰ_syn (U ⊩ φ)", id: "L1" },
        { z:  0.00, col: "#20B2AA", lbl: "Layer 2: Fischer–Servi Frame 𝔉_cand (d_P < ε_A)", id: "L2" },
        { z:  1.05, col: "#FFD700", lbl: "Layer 3: Cut-Free Sequent Calculus ℒ_iMSL", id: "L3" }
      ];
      zTiers.forEach((tr, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = tr.col;
        ctx.lineWidth = 2.2;
        for (let i = 0; i <= 40; i++) {
          const a = (i / 40) * Math.PI * 2;
          const r = 1.25 - idx * 0.22;
          const p = proj(r * Math.cos(a), r * Math.sin(a), tr.z, w, h);
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
        drawNode3D(tr.id, 0, 0, tr.z, 8.5 + idx * 1.5, tr.col, "#fff", tr.id, tr.lbl, w, h);
      });
      for (let k = 0; k < 4; k++) {
        const a = timeSec * 0.6 + (k / 4) * Math.PI * 2;
        const p1 = proj(1.15 * Math.cos(a), 1.15 * Math.sin(a), -1.05, w, h);
        const p2 = proj(0.95 * Math.cos(a), 0.95 * Math.sin(a),  0.00, w, h);
        const p3 = proj(0.75 * Math.cos(a), 0.75 * Math.sin(a),  1.05, w, h);
        drawLine3D(p1, p2, "#20B2AA", 2.0);
        drawLine3D(p2, p3, "#FFD700", 2.0);
      }
    }

    function renderLoop() {
      timeSec += 0.016;
      curStage += (targetStage - curStage) * 0.14;
      if (autoOrbit && !isDragging) camYaw += 0.0055;

      const w = wrap.clientWidth, h = wrap.clientHeight;
    if (w <= 0 || h <= 0) {
      requestAnimationFrame(renderLoop);
      return;
    }
    if (w > 0 && h > 0 && (canvas.width === 0 || Math.abs(canvas.width / Math.min(window.devicePixelRatio || 1, 2) - w) > 2)) {
        resize();
      }
      ctx.clearRect(0, 0, w, h);
      hitNodes = [];

      const stInt = Math.round(curStage);
      if (stInt === 1) renderStage1(w, h);
      else if (stInt === 2) renderStage2(w, h);
      else if (stInt === 3) renderStage3(w, h);
      else if (stInt === 4) renderStage4(w, h);
      else if (stInt === 5) renderStage5(w, h);
      else if (stInt === 6 || stInt === 7) renderStage6And7(w, h, curStage);
      else if (stInt === 8) renderStage8(w, h);
      else if (stInt === 9) renderStage9(w, h);
      else renderStage10(w, h);

      requestAnimationFrame(renderLoop);
    }

    // UI Handlers on window
    window.setCh1Stage = function(val, manual) {
      targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));
      const stInt = Math.round(targetStage);

      const sl = document.getElementById('ch1-slider');
      if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;

      const pill = document.getElementById('ch1-stage-pill');
      if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;

      const cap = document.getElementById('ch1-caption');
      if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];

      const tel = document.getElementById('ch1-telemetry');
      if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];

      if (manual) {
        autoSync = false;
        const b = document.getElementById('ch1-btn-sync');
        if (b) { b.classList.remove('active'); b.innerText = "Manual"; }
      }
    };

    window.scrubCh1Stage = function(val) { window.setCh1Stage(val, true); };

    window.enableCh1Sync = function() {
      autoSync = true;
      const b = document.getElementById('ch1-btn-sync');
      if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }
      syncCh1WithDeck();
    };

    window.toggleCh1Orbit = function() {
      autoOrbit = !autoOrbit;
      const b = document.getElementById('ch1-btn-orbit');
      if (b) b.classList.toggle('active', autoOrbit);
    };

    window.toggleCh1Spotlight = function() {
      const hud = document.getElementById('ch1-3d-hud');
      if (hud) {
        hud.classList.remove('minimized');
        hud.classList.toggle('spotlight');
        setTimeout(resize, 360);
      }
    };

    window.toggleCh1Minimize = function() {
      const hud = document.getElementById('ch1-3d-hud');
      const b = document.getElementById('ch1-btn-min');
      if (hud) {
        hud.classList.remove('spotlight');
        hud.classList.toggle('minimized');
        if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";
        setTimeout(resize, 360);
      }
    };

    function syncCh1WithDeck() {
      if (!autoSync) return;

      // In unified mega-deck, show Chapter 1 HUD only when viewing Chapter 1
      const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
      const ch1Hud = document.getElementById('ch1-3d-hud');
      if (isMegaDeck && ch1Hud && window.Reveal && window.Reveal.getCurrentSlide) {
        const currentSlide = window.Reveal.getCurrentSlide();
        const inCh1 = currentSlide ? (!currentSlide.closest('section[id^="chapter-"]') || !!currentSlide.closest('#chapter-1')) : true;
        ch1Hud.style.display = inCh1 ? '' : 'none';
        if (!inCh1) return;
      }

      const vp = document.querySelector('.reveal-viewport');
      const isScroll = vp && vp.classList.contains('reveal-scroll');
      if (isScroll) {
        const scEl = vp.scrollHeight > vp.clientHeight ? vp : document.documentElement;
        const top = vp.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;
        const max = Math.max(1, (scEl.scrollHeight || document.body.scrollHeight) - window.innerHeight);
        window.setCh1Stage(1.0 + Math.min(1, Math.max(0, top / max)) * 9.0, false);
      } else if (window.Reveal && typeof window.Reveal.getIndices === 'function') {
        const idx = window.Reveal.getIndices();
        const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 21);
        const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
        const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.18) : 0;
        window.setCh1Stage(1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0, false);
      }
    }

    wrap.addEventListener('mousedown', e => {
      e.stopPropagation();
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    wrap.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      camYaw += (e.clientX - lastX) * 0.012;
      camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));
      lastX = e.clientX;
      lastY = e.clientY;
    });

    window.addEventListener('touchmove', e => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastX;
      const dy = e.touches[0].clientY - lastY;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      camYaw += dx * 0.012;
      camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
    }, { passive: true });

    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });

    wrap.addEventListener('click', e => {
      e.stopPropagation();
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let hit = null;
      for (let i = hitNodes.length - 1; i >= 0; i--) {
        const n = hitNodes[i];
        if (Math.hypot(mx - n.p.sx, my - n.p.sy) <= n.r + 6) { hit = n; break; }
      }
      const insp = document.getElementById('ch1-node-inspector');
      if (hit && insp) {
        selectedId = hit.id;
        insp.innerText = hit.info;
      } else if (insp) {
        selectedId = null;
        insp.innerText = "Drag to Orbit 3D · Click Node to Inspect";
      }
    });

    wrap.addEventListener('wheel', e => {
      e.preventDefault();
      e.stopPropagation();
      camZoom = Math.max(0.65, Math.min(2.0, camZoom - e.deltaY * 0.001));
    }, { passive: false });

    resize();
    syncCh1WithDeck();
    requestAnimationFrame(renderLoop);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', syncCh1WithDeck, { passive: true });
    const vp = document.querySelector('.reveal-viewport');
    if (vp) vp.addEventListener('scroll', syncCh1WithDeck, { passive: true });
    if (window.Reveal) {
      window.Reveal.on('ready', syncCh1WithDeck);
      window.Reveal.on('slidechanged', syncCh1WithDeck);
      window.Reveal.on('fragmentshown', syncCh1WithDeck);
      window.Reveal.on('fragmenthidden', syncCh1WithDeck);
    }
    const hud = document.getElementById('ch1-3d-hud');
    if (hud) {
      hud.querySelectorAll('input, button').forEach(el => {
        el.addEventListener('keydown', e => e.stopPropagation());
        el.addEventListener('mousedown', e => e.stopPropagation());
        el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh1Engine);
  } else {
    runCh1Engine();
  }
})();
