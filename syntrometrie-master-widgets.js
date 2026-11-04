/**
 * =========================================================================
 * SYNTROMETRISCHE MAXIMENTELEZENTRIK — MASTER INTERACTIVE WIDGET SUITE
 * Complete Consolidated Widget Runtime for Chapters 1–15
 * Auto-assembled unified master file for all interactive slides, 3D WebGL
 * visualizations, category-theoretic state machines, and canvas pipelines.
 * =========================================================================
 */

/* ==========================================================================
 * CHAPTER 1 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
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
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = 'auto';
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('muted', '');
    v.setAttribute('loop', '');
    v.setAttribute('preload', 'auto');
  });
}

function syncVideosToSlide() {
  const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
    || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
    || window.innerWidth <= 768;

  const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
  const winH = window.innerHeight || document.documentElement.clientHeight;
  const winW = window.innerWidth || document.documentElement.clientWidth;

  document.querySelectorAll('video').forEach(v => {
    let shouldPlay = false;
    if (isScroll) {
      const rect = v.getBoundingClientRect();
      const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
      shouldPlay = inView;
    } else {
      shouldPlay = current ? current.contains(v) : true;
    }

    if (shouldPlay) {
      v.muted = true;
      v.playsInline = true;
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } else if (!v.paused) {
      v.pause();
    }
  });
}

// Ensure continuous sync on mobile scroll and touch gestures
if (typeof window !== 'undefined') {
  window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
  window.__syn_video_sync_handlers.push(syncVideosToSlide);
  if (!window.__syn_video_scroll_hooked) {
    window.__syn_video_scroll_hooked = true;
    const runSync = () => {
      (window.__syn_video_sync_handlers || []).forEach(fn => {
        try { fn(); } catch (_) {}
      });
    };
    window.addEventListener('scroll', runSync, { passive: true });
    window.addEventListener('touchmove', runSync, { passive: true });
    window.addEventListener('resize', runSync, { passive: true });
    let synMediaUnlocked = false;
    function synUnlockMedia() {
      if (synMediaUnlocked) return;
      synMediaUnlocked = true;
      runSync();
    }
    document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
    document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
  }
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
      <button class="ch1-hud-btn" title="Previous Stage" onclick="window.setCh1Stage(Math.round( parseFloat(document.getElementById('ch1-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch1-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh1Stage(this.value)">
      <button class="ch1-hud-btn" title="Next Stage" onclick="window.setCh1Stage(Math.round( parseFloat(document.getElementById('ch1-slider').value) ) + 1, true)">▶</button>
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
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch1-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }
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

      function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);
      else if (stInt === 2) renderStage2(w, h);
      else if (stInt === 3) renderStage3(w, h);
      else if (stInt === 4) renderStage4(w, h);
      else if (stInt === 5) renderStage5(w, h);
      else if (stInt === 6 || stInt === 7) renderStage6And7(w, h, stArg);
      else if (stInt === 8) renderStage8(w, h);
      else if (stInt === 9) renderStage9(w, h);
      else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
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

      const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
      const chHud = document.getElementById('ch1-3d-hud');
      if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
      const currentSlide = window.Reveal.getCurrentSlide();
      const inCh = currentSlide ? (!currentSlide.closest('section[id^="chapter-"]') || !!currentSlide.closest('#chapter-1, section[data-chapter="1"]')) : true;
      chHud.style.display = inCh ? '' : 'none';
      if (!inCh) return;
      }

      const rev = document.querySelector('.reveal');
      const vp = document.querySelector('.reveal-viewport');
      const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
        || (vp && vp.classList.contains('reveal-scroll'))
        || (rev && rev.classList.contains('reveal-scroll'))
        || (rev && rev.scrollHeight > rev.clientHeight + 100)
        || window.innerWidth <= 768;

      let stageVal = null;

      if (isScroll) {
        const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
          : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
          : (window.scrollY || document.documentElement.scrollTop || 0));

        let max = 1;
        if (rev && rev.scrollHeight > rev.clientHeight + 10) {
          max = rev.scrollHeight - rev.clientHeight;
        } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
          max = vp.scrollHeight - vp.clientHeight;
        } else {
          const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          max = Math.max(1, docH - window.innerHeight);
        }

        const frac = Math.min(1.0, Math.max(0.0, top / max));
        stageVal = 1.0 + frac * 9.0;
      }

      if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
        const idx = window.Reveal.getIndices();
        const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 21);
        const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
        const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
        stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
      }

      if (typeof stageVal === 'number' && !isNaN(stageVal)) {
        window.setCh1Stage(stageVal, false);
      }
    }

    if (typeof window !== 'undefined') {
      window.syncCh1WithDeck = syncCh1WithDeck;
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
        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_1 = false;
    const synBindSync_syncCh1WithDeck = () => {
      if (syncRaf_1) return;
      syncRaf_1 = true;
      requestAnimationFrame(() => {
        syncRaf_1 = false;
        syncCh1WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh1WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh1WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh1WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh1WithDeck, { passive: true });

    const revEl_syncCh1WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh1WithDeck) {
      revEl_syncCh1WithDeck.addEventListener('scroll', synBindSync_syncCh1WithDeck, { passive: true });
      revEl_syncCh1WithDeck.addEventListener('touchmove', synBindSync_syncCh1WithDeck, { passive: true });
    }
    const vpEl_syncCh1WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh1WithDeck) {
      vpEl_syncCh1WithDeck.addEventListener('scroll', synBindSync_syncCh1WithDeck, { passive: true });
      vpEl_syncCh1WithDeck.addEventListener('touchmove', synBindSync_syncCh1WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh1WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh1WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh1WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh1WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh1WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh1WithDeck);
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

})();

/* ==========================================================================
 * CHAPTER 2 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
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
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = 'auto';
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('muted', '');
    v.setAttribute('loop', '');
    v.setAttribute('preload', 'auto');
  });
}

function syncVideosToSlide() {
  const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
    || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
    || window.innerWidth <= 768;

  const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
  const winH = window.innerHeight || document.documentElement.clientHeight;
  const winW = window.innerWidth || document.documentElement.clientWidth;

  document.querySelectorAll('video').forEach(v => {
    let shouldPlay = false;
    if (isScroll) {
      const rect = v.getBoundingClientRect();
      const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
      shouldPlay = inView;
    } else {
      shouldPlay = current ? current.contains(v) : true;
    }

    if (shouldPlay) {
      v.muted = true;
      v.playsInline = true;
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } else if (!v.paused) {
      v.pause();
    }
  });
}

// Ensure continuous sync on mobile scroll and touch gestures
if (typeof window !== 'undefined') {
  window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
  window.__syn_video_sync_handlers.push(syncVideosToSlide);
  if (!window.__syn_video_scroll_hooked) {
    window.__syn_video_scroll_hooked = true;
    const runSync = () => {
      (window.__syn_video_sync_handlers || []).forEach(fn => {
        try { fn(); } catch (_) {}
      });
    };
    window.addEventListener('scroll', runSync, { passive: true });
    window.addEventListener('touchmove', runSync, { passive: true });
    window.addEventListener('resize', runSync, { passive: true });
    let synMediaUnlocked = false;
    function synUnlockMedia() {
      if (synMediaUnlocked) return;
      synMediaUnlocked = true;
      runSync();
    }
    document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
    document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
  }
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
    el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());
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
      <button class="hud3d-btn" title="Previous Stage" onclick="window.set3DStage(Math.round(parseFloat(document.getElementById('hud3d-slider').value)) - 1, true)">◀</button>
      <input type="range" id="hud3d-slider" min="1" max="10" step="0.05" value="1" oninput="scrub3DStage(this.value)">
      <button class="hud3d-btn" title="Next Stage" onclick="window.set3DStage(Math.round(parseFloat(document.getElementById('hud3d-slider').value)) + 1, true)">▶</button>
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
    if (document.hidden) {
      setTimeout(() => requestAnimationFrame(renderFrame), 250);
      return;
    }
    const hudGuard = document.getElementById('syntrix-3d-hud');
    if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
      setTimeout(() => requestAnimationFrame(renderFrame), 180);
      return;
    }
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

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('syntrix-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-2, section[data-chapter="2"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.set3DStage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.sync3DWithDeck = sync3DWithDeck;
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
        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_2 = false;
    const synBindSync_sync3DWithDeck = () => {
      if (syncRaf_2) return;
      syncRaf_2 = true;
      requestAnimationFrame(() => {
        syncRaf_2 = false;
        sync3DWithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_sync3DWithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_sync3DWithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_sync3DWithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_sync3DWithDeck, { passive: true });

    const revEl_sync3DWithDeck = document.querySelector('.reveal');
    if (revEl_sync3DWithDeck) {
      revEl_sync3DWithDeck.addEventListener('scroll', synBindSync_sync3DWithDeck, { passive: true });
      revEl_sync3DWithDeck.addEventListener('touchmove', synBindSync_sync3DWithDeck, { passive: true });
    }
    const vpEl_sync3DWithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_sync3DWithDeck) {
      vpEl_sync3DWithDeck.addEventListener('scroll', synBindSync_sync3DWithDeck, { passive: true });
      vpEl_sync3DWithDeck.addEventListener('touchmove', synBindSync_sync3DWithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_sync3DWithDeck);
      window.Reveal.on('slidechanged', synBindSync_sync3DWithDeck);
      window.Reveal.on('fragmentshown', synBindSync_sync3DWithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_sync3DWithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_sync3DWithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_sync3DWithDeck);
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

})();

/* ==========================================================================
 * CHAPTER 3 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
window.comb3 = function(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let r = 1;
  for (let i = 1; i <= k; i++) r = r * (n - i + 1) / i;
  return Math.round(r);
};

window.showGenericTab = function(prefix, idx, maxIdx, btnEl) {
  for (let i = 1; i <= maxIdx; i++) {
    const p = document.getElementById(prefix + '-' + i);
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

// WIDGET 1: §3.1.2 Metrophorkorporation Coupling Mode Explorer
window.updateMetCorp = function() {
  const elP = document.getElementById('mc-p');
  if (!elP) return;
  let p = parseInt(elP.value);
  let q = parseInt(document.getElementById('mc-q').value);
  let lamIn = document.getElementById('mc-lam');
  let maxL = Math.min(p, q);
  lamIn.max = maxL;
  let lam = Math.min(maxL, parseInt(lamIn.value));
  lamIn.value = lam;

  document.getElementById('mc-p-val').innerText = p;
  document.getElementById('mc-q-val').innerText = q;
  document.getElementById('mc-lam-val').innerText = lam;

  let uncoupled = p + q;
  let nonComb = (p + q - 2 * lam) + lam; // p + q - lam
  let combCount = p * lam * q;

  const box = document.getElementById('mc-readout');
  if (box) {
    box.innerHTML =
      `<b>1. Uncoupled Composition (C_m):</b> p + q = <b style="color:#82aaff;">${uncoupled}</b> independent channels<br>` +
      `<b>2. Non-Combinatorial Coupling (K_m Pushout, SM p. 43):</b> (p + q - 2λ) + λ = p + q - λ = <b style="color:#FFD700;">${nonComb}</b><br>` +
      `<b>3. Combinatorial Coupling (Heim SM p. 44):</b> Z_comb = p · λ · q = <b style="color:#20B2AA;">${combCount}</b> coupled pairs`;
  }
};

// WIDGET 2: §3.2.3 Span Pushout & Stage III Polarimeter Lab
window.updatePushoutLab = function() {
  const elP = document.getElementById('po-p');
  if (!elP) return;
  let p = parseInt(elP.value);
  let q = parseInt(document.getElementById('po-q').value);
  let lamInput = document.getElementById('po-lam');
  let maxLam = Math.min(p, q);
  lamInput.max = maxLam;
  let lam = Math.min(maxLam, parseInt(lamInput.value));
  lamInput.value = lam;

  document.getElementById('po-p-val').innerText = p;
  document.getElementById('po-q-val').innerText = q;
  document.getElementById('po-lam-val').innerText = lam;

  let dimCoprod = p + q;
  let dimPushout = p + q - lam;
  let ext2 = window.comb3(dimPushout, 2);

  // Update SVG Orbital Circles
  let frac = maxLam > 0 ? (lam / maxLam) : 0;
  let sep = 42 * (1.0 - 0.85 * frac);
  const c1 = document.getElementById('po-c1');
  const c2 = document.getElementById('po-c2');
  const knot = document.getElementById('po-knot');
  const kTxt = document.getElementById('po-knot-txt');
  if (c1 && c2 && knot && kTxt) {
    c1.setAttribute('cx', (105 - sep).toFixed(1));
    c2.setAttribute('cx', (105 + sep).toFixed(1));
    knot.setAttribute('r', (lam === 0 ? 0 : 7 + lam * 2.2).toFixed(1));
    kTxt.setAttribute('opacity', lam === 0 ? '0' : '1');
  }

  let note = "";
  if (p === 6 && q === 6 && lam === 3) {
    note = `<br><span style="color:#FFD700;">★ STAGE III POLARIMETER MATCH: dim(P_c) = 9 ⇒ dim Λ²(ℝ⁹) = C(9,2) = <b>36</b> (Exact Ch. 9 Hermetry Capacity!)</span>`;
  } else if (lam === 0) {
    note = `<br><span style="color:#82aaff;">★ UNCOUPLED KONZENTER LIMIT (λ = 0): P_a ⊞₀ P_b ≅ P_a ⊕₁ P_b (dim = ${dimCoprod})</span>`;
  } else if (lam === p && p === q) {
    note = `<br><span style="color:#20B2AA;">★ FULL IDENTIFICATION LIMIT (λ = p = q): P_a ⊞_id P_a ≅ P_a (dim = ${p}, zero channel inflation)</span>`;
  }

  document.getElementById('po-lab-readout').innerHTML =
    `<b>Coproduct Dim (C_m):</b> p + q = ${dimCoprod}  |  <b>Span Pushout Dim (K_m):</b> p + q - λ_eff = <b style="color:#FFD700;">${dimPushout}</b><br>` +
    `<b>Coincidence Module F₁^c = Λ²(P_c):</b> C(${dimPushout}, 2) = <b style="color:#20B2AA;">${ext2}</b>` + note;
};

window.setPoPreset = function(p, q, lam) {
  document.getElementById('po-p').value = p;
  document.getElementById('po-q').value = q;
  document.getElementById('po-lam').max = Math.min(p, q);
  document.getElementById('po-lam').value = lam;
  window.updatePushoutLab();
};

// WIDGET 3: §3.2.4 Konflektorknoten & Factual Valency Lab
window.updateKonflektorLab = function() {
  const elChi = document.getElementById('kf-chi');
  if (!elChi) return;
  let chi = parseFloat(elChi.value);
  let th = parseFloat(document.getElementById('kf-th').value);
  let r = parseInt(document.getElementById('kf-r').value);
  let nIn = document.getElementById('kf-n');
  nIn.max = r;
  let n = Math.min(r, parseInt(nIn.value));
  nIn.value = n;

  document.getElementById('kf-r-val').innerText = r;
  document.getElementById('kf-n-val').innerText = n;

  let valFact = r - n + 1;
  let boundStatus = chi > th
    ? `<span style="color:#20B2AA;"><b>✓ KONFLEKTORKNOTEN ACTIVE (χ=${chi.toFixed(2)} > θ=${th.toFixed(2)}):</b> Quotient relation δ_φ(r) = (φ_a r, -φ_b r) = 0 binds c_l = (a₁, φ_l, b₂)!</span>`
    : `<span style="color:#ff6b81;"><b>✗ BELOW THRESHOLD (χ=${chi.toFixed(2)} ≤ θ=${th.toFixed(2)}):</b> Channels remain uncoupled in P_a ⊕₁ P_b.</span>`;

  const box = document.getElementById('kf-readout');
  if (box) {
    box.style.borderLeftColor = chi > th ? "#20B2AA" : "#DC143C";
    box.innerHTML = `${boundStatus}<br><b>Def. 3.6 (Pseudovalenz r = ${r} with n = ${n} identical inputs):</b> Factual Valency Val_fact = r - n + 1 = <b style="color:#FFD700;">${valFact}</b>`;
  }
};

// WIDGET 4: §3.3.2 2x2 Korporator Matrix & 4D Tesseract SVG Inspector
window.korState = { ks: true, cs: false, km: true, cm: false };

window.toggleKorRule = function(key) {
  window.korState[key] = !window.korState[key];
  const labels = {
    ks: "K_s (Synk. Coup)",
    cs: "C_s (Synk. Comp)",
    km: "K_m (Met. Push)",
    cm: "C_m (Met. Coprod)"
  };
  let btn = document.getElementById('btn-' + key);
  if (btn) {
    if (window.korState[key]) {
      btn.style.background = (key === 'ks' || key === 'cs') ? "#20B2AA" : "#FFA500";
      btn.style.color = "#000";
      btn.style.fontWeight = "bold";
      btn.innerText = "✓ " + labels[key];
    } else {
      btn.style.background = "#1e293b";
      btn.style.color = "#FFD700";
      btn.style.fontWeight = "normal";
      btn.innerText = "✗ " + labels[key];
    }
  }
  window.updateKorMatrixStatus();
};

window.updateKorMatrixStatus = function() {
  const box = document.getElementById('kor-matrix-status');
  if (!box) return;
  let active = [];
  if (window.korState.ks) active.push("K_s");
  if (window.korState.cs) active.push("C_s");
  if (window.korState.km) active.push("K_m");
  if (window.korState.cm) active.push("C_m");

  let hasSynk = window.korState.ks || window.korState.cs;
  let hasMet = window.korState.km || window.korState.cm;
  let kappa = active.length;

  // Render 4D Tesseract 2D Projection SVG
  const svg = document.getElementById('tess-svg');
  if (svg) {
    let coords = {};
    let htmlEdges = "", htmlNodes = "";
    for (let b0 = 0; b0 <= 1; b0++) {
      for (let b1 = 0; b1 <= 1; b1++) {
        for (let b2 = 0; b2 <= 1; b2++) {
          for (let b3 = 0; b3 <= 1; b3++) {
            let scale = b3 === 1 ? 18 : 38;
            let x = 100 + (2 * b0 - 1) * scale + (2 * b2 - 1) * 12;
            let y = 68 + (2 * b1 - 1) * (scale * 0.72) - (2 * b3 - 1) * 8;
            coords[`${b0}${b1}${b2}${b3}`] = { x, y, b0, b1, b2, b3 };
          }
        }
      }
    }
    let keys = Object.keys(coords);
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        let a = coords[keys[i]], b = coords[keys[j]];
        let diff = Math.abs(a.b0-b.b0) + Math.abs(a.b1-b.b1) + Math.abs(a.b2-b.b2) + Math.abs(a.b3-b.b3);
        if (diff === 1) {
          htmlEdges += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="#334155" stroke-width="1.2"/>`;
        }
      }
    }
    let curKey = `${window.korState.km?1:0}${window.korState.cm?1:0}${window.korState.ks?1:0}${window.korState.cs?1:0}`;
    keys.forEach(k => {
      let c = coords[k];
      let m = (c.b0 === 1 || c.b1 === 1);
      let s = (c.b2 === 1 || c.b3 === 1);
      let col = (!m && !s) ? "#94a3b8" : (m && s ? "#20B2AA" : "#DC143C");
      let isCur = (k === curKey);
      let r = isCur ? 7.5 : 4.0;
      let stroke = isCur ? "#FFD700" : "#000";
      let sw = isCur ? 2.5 : 1.0;
      htmlNodes += `<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${r}" fill="${isCur ? '#FFD700' : col}" stroke="${stroke}" stroke-width="${sw}"/>`;
    });
    svg.innerHTML = htmlEdges + htmlNodes;
  }

  if (kappa === 0) {
    box.style.borderLeftColor = "#708090";
    box.innerHTML = `<span style="color:#cbd5e1;"><b>Vacuous Origin ∅ (κ = 0):</b> No corporate rules active.</span>`;
  } else if (hasSynk && hasMet) {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<span style="color:#20B2AA;"><b>✓ MIXED DETERMINATE CLASS (1 of 9, Rank κ = ${kappa}):</b> r = {${active.join(", ")}}</span><br>` +
      `Satisfies Heim's <i>Eindeutigkeitssatz</i> (r ∩ Met ≠ ∅ ∧ r ∩ Synk ≠ ∅) ⇒ Unique composite Syntrix algebra S_c ∈ Obj(Syn)!`;
  } else {
    box.style.borderLeftColor = "#DC143C";
    let missing = hasMet ? "Synkolative module tier (K_s, C_s)" : "Metrophoric carrier tier (K_m, C_m)";
    box.innerHTML = `<span style="color:#ff6b81;"><b>✗ PURE UNDERDETERMINED CLASS (1 of 6, Rank κ = ${kappa}):</b> r = {${active.join(", ")}}</span><br>` +
      `Violates <i>Eindeutigkeitssatz</i>: leaves the ${missing} underdetermined (*zweideutig*)!`;
  }
};

// WIDGET 5: §3.3.4 Homogeneous Decomposition & Compositive Population Balance
window.updateDecompLab = function() {
  const elStep = document.getElementById('dec-step');
  if (!elStep) return;
  let k = parseInt(elStep.value);
  let nH = parseInt(document.getElementById('dec-nh').value);
  let mu = parseInt(document.getElementById('dec-mu').value);

  document.getElementById('dec-step-val').innerText = `k = ${k}`;
  document.getElementById('dec-nh-val').innerText = nH;
  document.getElementById('dec-mu-val').innerText = mu;

  let remMu = Math.max(0, 4 - k);
  let pyrSum = Math.max(0, nH - mu);
  let p1 = Math.floor(pyrSum * 0.45), p2 = Math.floor(pyrSum * 0.35), p3 = pyrSum - p1 - p2;

  let stages = [
    { lbl: "x yã (μ=4)", active: k === 0, col: "#9370DB" },
    { lbl: "D_s¹ (μ=3)", active: k === 1, col: "#FFA500" },
    { lbl: "D_s² (μ=2)", active: k === 2, col: "#20B2AA" },
    { lbl: "D_s³ (μ=1)", active: k === 3, col: "#4169E1" },
    { lbl: "0_Syn (μ=0)", active: k === 4, col: "#DC143C" }
  ];
  document.getElementById('dec-chain-cards').innerHTML = stages.map(s => `
    <div style="flex:1; text-align:center; padding:5px; border-radius:5px; font-size:0.58em; font-weight:bold;
         background:${s.active ? s.col : '#151c2c'}; color:${s.active ? '#000' : '#94a3b8'}; border:1px solid ${s.col};">
      ${s.lbl}
    </div>
  `).join("");

  const box = document.getElementById('dec-readout');
  if (box) {
    box.style.borderLeftColor = remMu === 0 ? "#FFD700" : "#20B2AA";
    box.innerHTML =
      `<b>Complexity μ(D_s^${k}(S)) = ${remMu}:</b> ${remMu === 0 ? '<span style="color:#FFD700;">TERMINATED AT NULLSYNTRIX 0_Syn!</span>' : 'Contracting historical cross-talk into pyramidal components...'}<br>` +
      `<b>Thm. 3.10 Additive Population Balance:</b> n_H - μ = ${nH} - ${mu} = <b style="color:#FFD700;">${pyrSum}</b> = ∑ n_j (${p1} + ${p2} + ${p3})`;
  }
};

// WIDGET 6 & 7: §3.3.5 Syntropod Tree, Forest Surgery & Pseudoexzenter Fan-Out
window.treeEdgesEx = [true, false, true];
window.surgeryMode = false;

window.toggleTreeEdge = function(idx) {
  window.treeEdgesEx[idx] = !window.treeEdgesEx[idx];
  window.renderSyntropodTree();
};

window.toggleForestSurgery = function() {
  window.surgeryMode = !window.surgeryMode;
  window.renderSyntropodTree();
};

window.renderSyntropodTree = function() {
  const elFan = document.getElementById('fan-n');
  if (!elFan) return;
  let N = parseInt(elFan.value);
  document.getElementById('fan-n-val').innerText = N;
  let fanBranches = (N * (N + 1)) / 2;

  const configs = [
    { nd: 'nd-kor1', tx: 'tx-kor1', l1: 'te-1a', l2: 'te-1b', name: 'Kor₁' },
    { nd: 'nd-kor2', tx: 'tx-kor2', l1: 'te-2a', l2: 'te-2b', name: 'Kor₂' },
    { nd: 'nd-kor3', tx: 'tx-kor3', l1: 'te-3a', l2: 'te-3b', name: 'Apex Kor₃' }
  ];
  let eps = 0;
  for (let i = 0; i < 3; i++) {
    let isEx = window.treeEdgesEx[i];
    if (isEx) eps++;
    let c = configs[i];
    let rect = document.getElementById(c.nd);
    let txt = document.getElementById(c.tx);
    let lineA = document.getElementById(c.l1);
    let lineB = document.getElementById(c.l2);

    if (isEx) {
      rect.setAttribute('stroke', '#FFA500');
      rect.setAttribute('fill', '#2d1a04');
      txt.setAttribute('fill', '#FFA500');
      txt.textContent = `${c.name}: Exzenter (K_m)`;
      lineA.setAttribute('stroke', '#FFA500');
      lineB.setAttribute('stroke', '#FFA500');
      lineA.setAttribute('opacity', window.surgeryMode ? '0.12' : '1.0');
      lineB.setAttribute('opacity', window.surgeryMode ? '0.12' : '1.0');
    } else {
      rect.setAttribute('stroke', '#4169E1');
      rect.setAttribute('fill', '#0f1b3d');
      txt.setAttribute('fill', '#82aaff');
      txt.textContent = `${c.name}: Konzenter (C_m)`;
      lineA.setAttribute('stroke', '#4169E1');
      lineB.setAttribute('stroke', '#4169E1');
      lineA.setAttribute('opacity', '1.0');
      lineB.setAttribute('opacity', '1.0');
    }
  }
  let kc = 3 - eps;
  let confIdx = eps + 1;
  let status = document.getElementById('tree-readout');
  status.innerHTML =
    `<b>Conflexivity:</b> |E_K|=ε=<b>${eps}</b>, |E_C|=<b>${kc}</b> ⇒ <b>ConfIndex_pres = ε + 1 = ${confIdx}</b>` +
    (window.surgeryMode ? ` <span style="color:#20B2AA;">[Forest Surgery: ${confIdx} Subtrees]</span>` : '') +
    `  |  <b>Thm. 3.11 (N=${N}):</b> ½N(N+1) = <b style="color:#FFD700;">${fanBranches} Branches</b>`;
};

// WIDGET 8: §3.3.6 Mayer-Vietoris Homological Emergence
window.updateMayerVietoris = function() {
  const elG = document.getElementById('mv-glue');
  if (!elG) return;
  let g = parseInt(elG.value);
  document.getElementById('mv-glue-val').innerText = g + '%';
  let t = g / 100.0;

  let yTop = 35 + t * 30.0;
  let yBot = 95 - t * 30.0;
  document.getElementById('mv-arc-top').setAttribute('d', `M 90,${yTop} Q 210,${-10 + t*20} 330,${yTop}`);
  document.getElementById('mv-arc-bot').setAttribute('d', `M 90,${yBot} Q 210,${140 - t*20} 330,${yBot}`);
  document.getElementById('mv-v0').setAttribute('cy', yTop);
  document.getElementById('mv-v1').setAttribute('cy', yTop);
  document.getElementById('mv-w0').setAttribute('cy', yBot);
  document.getElementById('mv-w1').setAttribute('cy', yBot);

  let cycTxt = document.getElementById('mv-cycle-txt');
  let box = document.getElementById('mv-readout');
  if (g >= 96) {
    cycTxt.setAttribute('opacity', '1');
    document.getElementById('mv-arc-top').setAttribute('stroke', '#FFD700');
    document.getElementById('mv-arc-bot').setAttribute('stroke', '#FFD700');
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>✓ HOMOLOGICAL FUSION EMERGENCE (v_i = w_i):</b> H₁(S_c) ≅ ker(δ_{φ*}) ≅ ℝ[e_a - e_b] ≠ 0!</span>`;
  } else {
    cycTxt.setAttribute('opacity', '0');
    document.getElementById('mv-arc-top').setAttribute('stroke', '#4169E1');
    document.getElementById('mv-arc-bot').setAttribute('stroke', '#20B2AA');
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `Uncoupled / Partial Gluing (${g}%): Boundaries separate ⇒ H₁(S_a) = 0, H₁(S_b) = 0 (No global cycle).`;
  }
};

// ---------------------------------------------------------------------------
// VIDEO CONTROL: play Manim clips only while their slide is visible
// ---------------------------------------------------------------------------
function prepareVideos() {
  document.querySelectorAll('video').forEach(v => {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = 'auto';
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('muted', '');
    v.setAttribute('loop', '');
    v.setAttribute('preload', 'auto');
  });
}

function syncVideosToSlide() {
  const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
    || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
    || window.innerWidth <= 768;

  const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
  const winH = window.innerHeight || document.documentElement.clientHeight;
  const winW = window.innerWidth || document.documentElement.clientWidth;

  document.querySelectorAll('video').forEach(v => {
    let shouldPlay = false;
    if (isScroll) {
      const rect = v.getBoundingClientRect();
      const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
      shouldPlay = inView;
    } else {
      shouldPlay = current ? current.contains(v) : true;
    }

    if (shouldPlay) {
      v.muted = true;
      v.playsInline = true;
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } else if (!v.paused) {
      v.pause();
    }
  });
}

// Ensure continuous sync on mobile scroll and touch gestures
if (typeof window !== 'undefined') {
  window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
  window.__syn_video_sync_handlers.push(syncVideosToSlide);
  if (!window.__syn_video_scroll_hooked) {
    window.__syn_video_scroll_hooked = true;
    const runSync = () => {
      (window.__syn_video_sync_handlers || []).forEach(fn => {
        try { fn(); } catch (_) {}
      });
    };
    window.addEventListener('scroll', runSync, { passive: true });
    window.addEventListener('touchmove', runSync, { passive: true });
    window.addEventListener('resize', runSync, { passive: true });
    let synMediaUnlocked = false;
    function synUnlockMedia() {
      if (synMediaUnlocked) return;
      synMediaUnlocked = true;
      runSync();
    }
    document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
    document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
  }
}

// ---------------------------------------------------------------------------
// WIDGET WIRING (runs once; slide changes no longer reset widget state)
// ---------------------------------------------------------------------------
function renderAllCh3Widgets() {
  window.updateMetCorp();
  window.updatePushoutLab();
  window.updateKonflektorLab();
  window.updateKorMatrixStatus();
  window.updateDecompLab();
  window.renderSyntropodTree();
  window.updateMayerVietoris();
}

function bindControlsOnce() {
  document.querySelectorAll('input[type="range"], select, button').forEach(el => {
    if (el.dataset.synBound) return;
    el.dataset.synBound = '1';
    el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());
  });
}

let synInitialised = false;
function initChapter3() {
  if (synInitialised) return;
  synInitialised = true;
  prepareVideos();
  bindControlsOnce();
  renderAllCh3Widgets();
  syncVideosToSlide();
}

if (window.Reveal && window.Reveal.on) {
  window.Reveal.on('ready', initChapter3);
  window.Reveal.on('slidechanged', syncVideosToSlide);
  window.Reveal.on('fragmentshown', syncVideosToSlide);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter3();
  });
} else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
  initChapter3();
}


// =========================================================================
// CHAPTER 3: 60FPS 3D INTERACTIVE KORPORATOR, 4D TESSERACT & MAYER-VIETORIS ENGINE
// =========================================================================

const CH3_3D_STYLE = `
#ch3-3d-hud {
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

#ch3-3d-hud *, #ch3-3d-hud *::before, #ch3-3d-hud *::after {
  box-sizing: border-box;
}

#ch3-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch3-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch3-3d-hud.minimized .ch3-hud-body {
  display: none;
}

.ch3-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch3-hud-title {
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

.ch3-hud-title span:first-child {
  line-height: 1.15;
}

.ch3-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch3-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch3-hud-btn {
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

.ch3-hud-btn:hover, .ch3-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch3-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch3-canvas-wrap:active {
  cursor: grabbing;
}

#ch3-3d-hud.spotlight .ch3-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch3-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch3-overlay-bar {
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

.ch3-telemetry {
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

#ch3-node-inspector {
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

.ch3-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch3-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch3-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch3-scrubber .ch3-hud-btn {
  flex-shrink: 0;
}

#ch3-caption {
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
  #ch3-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch3-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch3-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch3-hud-controls {
    gap: 3px;
  }
  .ch3-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch3-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch3-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch3-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch3-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch3-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch3-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch3-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch3-hud-controls {
    gap: 3px;
  }
  .ch3-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch3-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch3-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch3-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch3-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch3-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch3-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch3-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH3_3D_HTML = `
<div class="ch3-hud-header">
    <div class="ch3-hud-title">
      <span>🔗 Ch 3 · 3D Korporator Engine</span>
      <span id="ch3-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>
    </div>
    <div class="ch3-hud-controls">
      <button class="ch3-hud-btn active" id="ch3-btn-orbit" onclick="toggleCh3Orbit()">⟳ Orbit</button>
      <button class="ch3-hud-btn" onclick="toggleCh3Spotlight()">⛶ Spotlight</button>
      <button class="ch3-hud-btn" id="ch3-btn-min" onclick="toggleCh3Minimize()">+</button>
    </div>
  </div>

  <div class="ch3-hud-body">
    <div class="ch3-canvas-wrap" id="ch3-canvas-wrap">
      <canvas id="ch3-3d-canvas"></canvas>
      <div class="ch3-overlay-bar">
        <div class="ch3-telemetry" id="ch3-telemetry">P_a ⊞_φ P_b ∈ FinBan_≤1</div>
        <div id="ch3-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>
      </div>
    </div>

    <div class="ch3-scrubber">
      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>
      <button class="ch3-hud-btn" title="Previous Stage" onclick="window.setCh3Stage(Math.round( parseFloat(document.getElementById('ch3-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch3-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh3Stage(this.value)">
      <button class="ch3-hud-btn" title="Next Stage" onclick="window.setCh3Stage(Math.round( parseFloat(document.getElementById('ch3-slider').value) ) + 1, true)">▶</button>
      <button class="ch3-hud-btn active" id="ch3-btn-sync" onclick="enableCh3Sync()">Auto-Sync</button>
    </div>

    <div id="ch3-caption">
      <b>Stage 1 (§3.1.1–3.1.2):</b> Principle of Inversion &amp; Metrophorkorporation (C_m: p+q vs. K_m: p+q−λ).
    </div>
  </div>
`;

function injectCh33DHUD() {
  if (document.getElementById('ch3-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH3_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch3-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH3_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch3_3d_engine_loaded) return;
  window.__ch3_3d_engine_loaded = true;

  function runCh3Engine() {
    injectCh33DHUD();
    if (window.__ch3_3d_engine_initialized) return;
    window.__ch3_3d_engine_initialized = true;

    const canvas = document.getElementById('ch3-3d-canvas');
    const wrap = document.getElementById('ch3-canvas-wrap');
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');

    let targetStage = 1.0;
    let curStage = 1.0;
    let autoSync = true;
    let autoOrbit = true;
    let camYaw = -0.48;
    let camPitch = 0.35;
    let camZoom = 1.65;
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let timeSec = 0;
    let hitNodes = [];
    let selectedId = null;

    const STAGE_CAPTIONS = {
      1: "<b>Stage 1 (§3.1.1–3.1.2 — Inversion &amp; Metrophorkorporation):</b> 3D carriers P_a (ℝ^p) and P_b (ℝ^q) linked across λ shared R_φ channels.",
      2: "<b>Stage 2 (§3.1.3–3.1.4 — Korporator Matrix &amp; Prop. 3.1):</b> 2×2 Korporator Matrix {K_s, C_s; K_m, C_m} &amp; Tripartite Syntropod ring z = z_c + z_p + z_e.",
      3: "<b>Stage 3 (§3.2.1–3.2.2 — Category Syn &amp; Zero Object 0_Syn):</b> Graded Syntrix tower F_γ anchored to Nullsyntrix zero object 0_Syn (Prop. 3.2).",
      4: "<b>Stage 4 (§3.2.3 — Thm. 3.4 Span Pushout P_a ⊞_φ P_b):</b> Quotienting P_a ⊕₁ P_b by Im(δ_φ) yields exact dimension subtraction p + q − λ_eff.",
      5: "<b>Stage 5 (Stage III Polarimeter Running Example):</b> Two ℝ⁶ polarimeters fuse across R_φ = ℝ³ into P_c = ℝ⁹ ⇒ Λ²(ℝ⁹) = 36 Hermetry capacity!",
      6: "<b>Stage 6 (§3.2.4 — Prop. 3.7 Synkolative Lifts C_s &amp; K_s):</b> Graded projective tensor module F_α^a ⊗̂_π F_β^b &amp; Factual Valency r − n + 1.",
      7: "<b>Stage 7 (§3.3.1–3.3.2 — 4D Tesseract of 15 Corporate Classes):</b> Rotating 4D hypercube: 9 Teal Mixed (Determinate) vs. 6 Crimson Pure (Underdetermined)!",
      8: "<b>Stage 8 (§3.3.3–3.3.4 — Thms. 3.17 &amp; 3.19 Decomposition Chain):</b> Well-founded complexity contraction μ(D_s(S)) &lt; μ(S) &amp; population balance n_H − μ.",
      9: "<b>Stage 9 (§3.3.5 — Thm. 3.22 Syntropod Tree &amp; 21-Branch Fan-Out):</b> 4-Syntropod Colimit Tree (ConfIndex = ε + 1) &amp; Pseudoexzenter ½N(N+1) = 21 crown.",
      10: "<b>Stage 10 (§3.3.6–3.6 — Thm. 3.26 Double Category &amp; Mayer–Vietoris):</b> Gluing contractible edges e_a, e_b across R_φ births emergent cycle [e_a − e_b] ∈ H₁(S_c)!"
    };

    const STAGE_TELEMETRY = {
      1: "C_m: p+q | K_m: p+q−λ | Z_comb = p·λ·q",
      2: "Kor ≡ {K_s, C_s; K_m, C_m} (SM Eq. 10)",
      3: "Kor_{C_m,C_s}(S, 0_Syn) ≅ S (Prop. 3.2)",
      4: "0 → R_φ/ker δ_φ → P_a⊕₁P_b → P_a⊞_φP_b → 0",
      5: "Stage III: 6 + 6 − 3 = 9 ⇒ C(9,2) = 36",
      6: "F_γ^{K_s} = ⨁ F_α^a ⊗̂_π F_β^b | Val = r−n+1",
      7: "2⁴ − 1 = 15 Classes: 9 Mixed + 6 Pure",
      8: "n_H − μ = ∑ n_j (Thm. 3.19 Balance)",
      9: "ConfIndex = ε + 1 | Fan-Out ½(6)(7) = 21",
      10: "∂_* : H_{γ+1}(S_c) → ker(δ_{φ*}) ⊂ H_γ(S_φ)"
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

    function drawOctahedron(cx, cy, cz, rad, col, w, h) {
      const v = [
        proj(cx + rad, cy, cz, w, h), proj(cx - rad, cy, cz, w, h),
        proj(cx, cy + rad, cz, w, h), proj(cx, cy - rad, cz, w, h),
        proj(cx, cy, cz + rad, w, h), proj(cx, cy, cz - rad, w, h)
      ];
      const edges = [[4,0],[4,1],[4,2],[4,3],[5,0],[5,1],[5,2],[5,3],[0,2],[2,1],[1,3],[3,0]];
      edges.forEach(e => drawLine3D(v[e[0]], v[e[1]], col, 1.5));
    }

    function renderStage1(w, h) {
      drawOctahedron(-1.05, 0, 0, 0.72, "rgba(65,105,225,0.65)", w, h);
      drawOctahedron( 1.05, 0, 0, 0.72, "rgba(32,178,170,0.65)", w, h);
      const pA = drawNode3D("P_a", -1.05, 0, 0, 8.5, "#4169E1", "#fff", "P_a (ℝ^p)", "Carrier Space P_a (p = 6 channels)", w, h);
      const pB = drawNode3D("P_b",  1.05, 0, 0, 8.5, "#20B2AA", "#fff", "P_b (ℝ^q)", "Carrier Space P_b (q = 6 channels)", w, h);
      [-0.45, 0.0, 0.45].forEach((zOff, l) => {
        const pK = drawNode3D("Phi_" + l, 0, 0.25 * Math.sin(timeSec * 2 + l), zOff, 6, "#FFD700", "#FFA500", l === 1 ? "R_φ (λ)" : "", `Shared Coupling Channel φ_${l+1} ∈ R_φ (Reduces dim to p+q−λ)`, w, h);
        drawLine3D(pA, pK, "#FFD700", 2.0, [4, 2]);
        drawLine3D(pK, pB, "#FFD700", 2.0, [4, 2]);
      });
    }

    function renderStage2(w, h) {
      const kor = [
        { id: "K_s", x: -0.45, z:  0.45, col: "#20B2AA", info: "K_s: Synkolative Coupling (Graded Projective Tensor F^a ⊗̂_π F^b)" },
        { id: "C_s", x:  0.45, z:  0.45, col: "#4169E1", info: "C_s: Synkolative Composition (Direct Sum Module F^a ⊕₁ F^b)" },
        { id: "K_m", x: -0.45, z: -0.45, col: "#FFA500", info: "K_m: Metrophor Coupling (Span Pushout P_a ⊞_φ P_b)" },
        { id: "C_m", x:  0.45, z: -0.45, col: "#9370DB", info: "C_m: Metrophor Composition (ℓ¹-Coproduct P_a ⊕₁ P_b)" }
      ];
      kor.forEach(k => drawNode3D(k.id, k.x, 0, k.z, 8.5, k.col, "#fff", k.id, k.info, w, h));
      const types = [
        { lbl: "z_c (Konzenter)", col: "#4169E1", info: "Concentric Sub-System: Disjoint carriers (K_m = 0, C_m ≠ 0)" },
        { lbl: "z_p (Pseudoexz.)", col: "#9370DB", info: "Pseudoexcentric Sub-System: Indirect chain fan-out ½N(N+1)" },
        { lbl: "z_e (Exzenter)", col: "#FFA500", info: "Excentric Sub-System: Active Konflektorknoten pushout (K_m ≠ 0)" }
      ];
      for (let i = 0; i < 6; i++) {
        const a = timeSec * 0.55 + (i / 6) * Math.PI * 2;
        const t = types[i % 3];
        const pS = drawNode3D("Syn_" + i, 1.38 * Math.cos(a), 1.38 * Math.sin(a), 0.25 * Math.sin(a * 2), 6, t.col, "#fff", i < 3 ? t.lbl : "", t.info, w, h);
        drawLine3D(pS, proj(0, 0, 0, w, h), "rgba(255,215,0,0.35)", 1.4, [3, 3]);
      }
    }

    function renderStage3(w, h) {
      const pZero = drawNode3D("Zero_Syn", -1.15, 0, -0.8, 9, "#64748b", "#FFD700", "0_Syn (ys c̃ ≡ 0)", "Strict Zero Object in Syn: Initial & Terminal (Prop. 3.2)", w, h);
      const grades = [-0.8, -0.1, 0.6, 1.25];
      let prev = null;
      grades.forEach((z, g) => {
        const pG = drawNode3D("F_" + g, 0.65, 0, z, 7.5 + g, g === 0 ? "#4169E1" : (g === 3 ? "#FFD700" : "#20B2AA"), "#fff", `F_${g}`, `Grade-${g} Banach Space F_${g} ⊕₁ {0} ≅ F_${g} (Isometric Identity)`, w, h);
        if (prev) drawLine3D(prev, pG, "#20B2AA", 2.5);
        drawLine3D(pZero, pG, "rgba(255,215,0,0.5)", 1.6, [4, 3]);
        prev = pG;
      });
    }

    function renderStage4And5(w, h, st) {
      const isStage5 = (st >= 4.5);
      const sep = isStage5 ? 0.55 : 0.85;
      drawOctahedron(-sep, 0, -0.35, 0.68, "rgba(65,105,225,0.55)", w, h);
      drawOctahedron( sep, 0, -0.35, 0.68, "rgba(32,178,170,0.55)", w, h);

      const pA = drawNode3D("Pa_po", -sep, 0, -0.35, 8, "#4169E1", "#fff", isStage5 ? "S_a (ℝ⁶)" : "P_a (ℝ^p)", "Polarimeter A Carrier P_a = ℝ³_H ⊕ ℝ³_V ≅ ℝ⁶", w, h);
      const pB = drawNode3D("Pb_po",  sep, 0, -0.35, 8, "#20B2AA", "#fff", isStage5 ? "S_b (ℝ⁶)" : "P_b (ℝ^q)", "Polarimeter B Carrier P_b = ℝ³_H ⊕ ℝ³_V ≅ ℝ⁶", w, h);
      const pR = drawNode3D("R_phi",  0,   0, -1.05, 7.5, "#FFA500", "#FFD700", isStage5 ? "R_φ = ℝ³ (λ=3)" : "R_φ / ker δ_φ", "Shared Konflektorknoten Parameter Space R_φ (Rank λ_eff = 3)", w, h);
      const pPush = drawNode3D("P_push", 0, 0, 0.65, 10.5, "#FFD700", "#fff", isStage5 ? "P_c = ℝ⁹" : "P_a ⊞_φ P_b", "Quotient Pushout Space (P_a ⊕₁ P_b)/Im(δ_φ) of dim p+q−λ = 9", w, h);

      drawLine3D(pR, pA, "#FFA500", 2.2);
      drawLine3D(pR, pB, "#FFA500", 2.2);
      drawLine3D(pA, pPush, "#FFD700", 2.6);
      drawLine3D(pB, pPush, "#FFD700", 2.6);

      if (isStage5) {
        ctx.beginPath();
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 2.0;
        for (let i = 0; i <= 36; i++) {
          const a = (i / 36) * Math.PI * 2 + timeSec * 0.4;
          const p = proj(1.15 * Math.cos(a), 1.15 * Math.sin(a), 1.15, w, h);
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
        drawNode3D("Ext_36", 0, 0, 1.25, 8, "#20B2AA", "#FFD700", "F₁^c = Λ²(ℝ⁹) (dim 36)", "Exact 36-Component Hermetry Matrix Capacity C(9,2) = 36!", w, h);
      }
    }

    function renderStage6(w, h) {
      for (let a = 1; a <= 3; a++) {
        for (let b = 1; b <= 3; b++) {
          const x = (a - 2) * 0.85;
          const y = (b - 2) * 0.85;
          const z = (a + b - 4) * 0.45;
          const isDiag = (a + b === 4);
          const p = drawNode3D(
            `Ks_${a}_${b}`, x, y, z, isDiag ? 7.5 : 5.5,
            isDiag ? "#FFD700" : "#20B2AA", "#fff",
            isDiag ? `F_${a}^a⊗F_${b}^b` : "",
            `Graded Projective Tensor Summand F_${a}^a ⊗̂_π F_${b}^b at total grade γ = ${a+b}`, w, h
          );
          if (a < 3) drawLine3D(p, proj(x + 0.85, y, z + 0.45, w, h), "rgba(65,105,225,0.5)", 1.5);
          if (b < 3) drawLine3D(p, proj(x, y + 0.85, z + 0.45, w, h), "rgba(32,178,170,0.5)", 1.5);
        }
      }
    }

    function renderStage7(w, h) {
      const pts = [];
      for (let b0 of [-1, 1]) for (let b1 of [-1, 1]) for (let b2 of [-1, 1]) for (let b3 of [-1, 1]) {
        const r = b3 > 0 ? 0.52 : 1.15;
        const wRot = 0.22 * Math.sin(timeSec * 1.2 + b3);
        const x = b0 * r + wRot, y = b1 * r, z = b2 * r * 0.85;
        const hasMet = (b0 > 0 || b1 > 0);
        const hasSynk = (b2 > 0 || b3 > 0);
        const isMixed = hasMet && hasSynk;
        const isNull = !hasMet && !hasSynk;
        const ruleNames = [];
        if (b0 > 0) ruleNames.push("K_m");
        if (b1 > 0) ruleNames.push("C_m");
        if (b2 > 0) ruleNames.push("K_s");
        if (b3 > 0) ruleNames.push("C_s");
        const rStr = isNull ? "∅ (0_Syn)" : `{${ruleNames.join(",")}}`;
        pts.push({
          b: [b0, b1, b2, b3], x, y, z, isMixed, isNull, rStr,
          p: proj(x, y, z, w, h)
        });
      }
      for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
          let diff = 0;
          for (let k = 0; k < 4; k++) if (pts[i].b[k] !== pts[j].b[k]) diff++;
          if (diff === 1) {
            const isW = pts[i].b[3] !== pts[j].b[3];
            drawLine3D(pts[i].p, pts[j].p, isW ? "rgba(255,165,0,0.65)" : "rgba(100,116,139,0.45)", isW ? 2.0 : 1.3);
          }
        }
      }
      pts.forEach((v, idx) => {
        const col = v.isNull ? "#ffffff" : (v.isMixed ? "#20B2AA" : "#DC143C");
        const status = v.isNull ? "Nullsyntrix 0_Syn" : (v.isMixed ? "MIXED (Determinate Class — Eindeutigkeitssatz ✓)" : "PURE (Underdetermined Row-Only Class ✗)");
        drawNode3D("Tess_" + idx, v.x, v.y, v.z, v.isMixed ? 6.5 : 5.0, col, "#000", idx === 15 ? "{K_m,C_m,K_s,C_s}" : "", `${v.rStr}: ${status}`, w, h);
      });
    }

    function renderStage8(w, h) {
      const steps = [
        { id: "S_hom", x: -1.25, z:  1.0, col: "#FFD700", lbl: "S ∈ Syn_hom (μ=4)", info: "Homogeneous Syntrix Algebra: Population n_H − μ = ∑ n_j (Thm. 3.19)" },
        { id: "Ds_1",  x: -0.42, z:  0.35, col: "#FFA500", lbl: "D_s(S) (μ=3)", info: "1st Synkolative Contraction Step: Peels off Pyramidal Leaf P₄" },
        { id: "Ds_2",  x:  0.42, z: -0.30, col: "#20B2AA", lbl: "D_s²(S) (μ=2)", info: "2nd Synkolative Contraction Step: Peels off Pyramidal Leaf P₃" },
        { id: "Ds_3",  x:  1.25, z: -0.95, col: "#4169E1", lbl: "P₁ ∈ Syn_pyr (μ=1)", info: "Terminal Pyramidal Base Syntrix P₁ (Terminates at 0_Syn)" }
      ];
      for (let i = 0; i < steps.length; i++) {
        const s = steps[i];
        const pMain = drawNode3D(s.id, s.x, -0.3, s.z, 8.5, s.col, "#fff", s.lbl, s.info, w, h);
        if (i > 0) {
          const pPrev = proj(steps[i - 1].x, -0.3, steps[i - 1].z, w, h);
          drawLine3D(pPrev, pMain, "#FFD700", 2.6);
          const pLeaf = drawNode3D("Leaf_" + i, s.x, 0.85, s.z + 0.25, 6.5, "#20B2AA", "#fff", `P_${5-i} ∈ Syn_pyr`, `Extracted Pyramidal Factor P_${5-i} in Corporate Chain (SM-11b)`, w, h);
          drawLine3D(pPrev, pLeaf, "#20B2AA", 1.8, [4, 2]);
        }
      }
    }

    function renderStage9(w, h) {
      const ringPts = [];
      for (let k = 0; k < 6; k++) {
        const a = timeSec * 0.3 + (k / 6) * Math.PI * 2;
        const x = 1.25 * Math.cos(a), y = 1.25 * Math.sin(a), z = -0.75;
        ringPts.push(drawNode3D("Br_" + k, x, y, z, 6, "#4169E1", "#fff", `S_${k+1}`, `Pure Single-Metrophor Branch ${k+1} (Total: 6 pure + 15 mixed = 21 branches)`, w, h));
      }
      for (let i = 0; i < 6; i++) {
        for (let j = i + 1; j < 6; j++) {
          drawLine3D(ringPts[i], ringPts[j], "rgba(32,178,170,0.35)", 1.2);
        }
      }
      const pKor1 = drawNode3D("Kor_1", -0.65, 0, 0.2, 8, "#FFA500", "#fff", "Kor₁ (Exzenter)", "Exzenter Edge e₁ ∈ E_K (K_m ≠ 0)", w, h);
      const pKor2 = drawNode3D("Kor_2",  0.65, 0, 0.2, 8, "#4169E1", "#fff", "Kor₂ (Konzenter)", "Konzenter Edge e₂ ∈ E_C (K_m = 0)", w, h);
      const pApex = drawNode3D("Colim_Apex", 0, 0, 1.15, 10.5, "#FFD700", "#fff", "y c̃ = colim G_S (ConfIndex = 3)", "Universal Tree Colimit in Syn (Prop. 3.24)", w, h);
      drawLine3D(ringPts[0], pKor1, "#FFA500", 2.2);
      drawLine3D(ringPts[1], pKor1, "#FFA500", 2.2);
      drawLine3D(ringPts[3], pKor2, "#4169E1", 2.2);
      drawLine3D(ringPts[4], pKor2, "#4169E1", 2.2);
      drawLine3D(pKor1, pApex, "#FFA500", 2.8);
      drawLine3D(pKor2, pApex, "#FFD700", 2.8);
    }

    function renderStage10(w, h) {
      const r0 = drawNode3D("MV_r0", -1.25, 0, 0, 8.5, "#FFA500", "#FFD700", "r₀ ∈ R_φ (v₀∼w₀)", "Glued Konflektorknoten Boundary Vertex r₀ ∈ C₀(S_φ)", w, h);
      const r1 = drawNode3D("MV_r1",  1.25, 0, 0, 8.5, "#FFA500", "#FFD700", "r₁ ∈ R_φ (v₁∼w₁)", "Glued Konflektorknoten Boundary Vertex r₁ ∈ C₀(S_φ)", w, h);

      for (let sgn of [-1, 1]) {
        ctx.beginPath();
        ctx.strokeStyle = sgn > 0 ? "#4169E1" : "#20B2AA";
        ctx.lineWidth = 3.2;
        for (let i = 0; i <= 36; i++) {
          const a = (i / 36) * Math.PI;
          const p = proj(-1.25 * Math.cos(a), 0.35 * sgn * Math.sin(a), sgn * 0.95 * Math.sin(a), w, h);
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }
      drawNode3D("MV_ea", 0,  0.35,  0.95, 7, "#4169E1", "#fff", "e_a ∈ C₁(S_a)", "Contractible 1-Chain in S_a (H₁(S_a) = 0 in isolation)", w, h);
      drawNode3D("MV_eb", 0, -0.35, -0.95, 7, "#20B2AA", "#fff", "e_b ∈ C₁(S_b)", "Contractible 1-Chain in S_b (H₁(S_b) = 0 in isolation)", w, h);

      const ang = timeSec * 2.2;
      const pCyc = proj(-1.25 * Math.cos(ang), 0.35 * Math.sin(ang), 0.95 * Math.sin(ang), w, h);
      ctx.save();
      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.arc(pCyc.sx, pCyc.sy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      drawNode3D("MV_H1", 0, 0, 0, 9.5, "#FFD700", "#DC143C", "∂_*[e_a − e_b] = [r₁ − r₀] ≠ 0", "Thm. 3.26 Emergent Homology Class in H₁(S_c) \ Im(π_*) (Humphreys Fusion Emergence)!", w, h);
    }

    function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch3-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }
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

      function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);
      else if (stInt === 2) renderStage2(w, h);
      else if (stInt === 3) renderStage3(w, h);
      else if (stInt === 4 || stInt === 5) renderStage4And5(w, h, stArg);
      else if (stInt === 6) renderStage6(w, h);
      else if (stInt === 7) renderStage7(w, h);
      else if (stInt === 8) renderStage8(w, h);
      else if (stInt === 9) renderStage9(w, h);
      else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);
    }

    // Window controller handlers
    window.setCh3Stage = function(val, manual) {
      targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));
      const stInt = Math.round(targetStage);

      const sl = document.getElementById('ch3-slider');
      if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;

      const pill = document.getElementById('ch3-stage-pill');
      if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;

      const cap = document.getElementById('ch3-caption');
      if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];

      const tel = document.getElementById('ch3-telemetry');
      if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];

      if (manual) {
        autoSync = false;
        const b = document.getElementById('ch3-btn-sync');
        if (b) { b.classList.remove('active'); b.innerText = "Manual"; }
      }
    };

    window.scrubCh3Stage = function(val) { window.setCh3Stage(val, true); };

    window.enableCh3Sync = function() {
      autoSync = true;
      const b = document.getElementById('ch3-btn-sync');
      if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }
      syncCh3WithDeck();
    };

    window.toggleCh3Orbit = function() {
      autoOrbit = !autoOrbit;
      const b = document.getElementById('ch3-btn-orbit');
      if (b) b.classList.toggle('active', autoOrbit);
    };

    window.toggleCh3Spotlight = function() {
      const hud = document.getElementById('ch3-3d-hud');
      if (hud) {
        hud.classList.remove('minimized');
        hud.classList.toggle('spotlight');
        setTimeout(resize, 360);
      }
    };

    window.toggleCh3Minimize = function() {
      const hud = document.getElementById('ch3-3d-hud');
      const b = document.getElementById('ch3-btn-min');
      if (hud) {
        hud.classList.remove('spotlight');
        hud.classList.toggle('minimized');
        if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";
        setTimeout(resize, 360);
      }
    };

        function syncCh3WithDeck() {
      if (!autoSync) return;

      const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
      const chHud = document.getElementById('ch3-3d-hud');
      if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
      const currentSlide = window.Reveal.getCurrentSlide();
      const inCh = currentSlide ? !!currentSlide.closest('#chapter-3, section[data-chapter="3"]') : true;
      chHud.style.display = inCh ? '' : 'none';
      if (!inCh) return;
      }

      const rev = document.querySelector('.reveal');
      const vp = document.querySelector('.reveal-viewport');
      const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
        || (vp && vp.classList.contains('reveal-scroll'))
        || (rev && rev.classList.contains('reveal-scroll'))
        || (rev && rev.scrollHeight > rev.clientHeight + 100)
        || window.innerWidth <= 768;

      let stageVal = null;

      if (isScroll) {
        const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
          : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
          : (window.scrollY || document.documentElement.scrollTop || 0));

        let max = 1;
        if (rev && rev.scrollHeight > rev.clientHeight + 10) {
          max = rev.scrollHeight - rev.clientHeight;
        } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
          max = vp.scrollHeight - vp.clientHeight;
        } else {
          const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          max = Math.max(1, docH - window.innerHeight);
        }

        const frac = Math.min(1.0, Math.max(0.0, top / max));
        stageVal = 1.0 + frac * 9.0;
      }

      if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
        const idx = window.Reveal.getIndices();
        const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
        const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
        const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
        stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
      }

      if (typeof stageVal === 'number' && !isNaN(stageVal)) {
        window.setCh3Stage(stageVal, false);
      }
    }

    if (typeof window !== 'undefined') {
      window.syncCh3WithDeck = syncCh3WithDeck;
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
      const insp = document.getElementById('ch3-node-inspector');
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
    syncCh3WithDeck();
    requestAnimationFrame(renderLoop);
    window.addEventListener('resize', resize);
        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_3 = false;
    const synBindSync_syncCh3WithDeck = () => {
      if (syncRaf_3) return;
      syncRaf_3 = true;
      requestAnimationFrame(() => {
        syncRaf_3 = false;
        syncCh3WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh3WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh3WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh3WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh3WithDeck, { passive: true });

    const revEl_syncCh3WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh3WithDeck) {
      revEl_syncCh3WithDeck.addEventListener('scroll', synBindSync_syncCh3WithDeck, { passive: true });
      revEl_syncCh3WithDeck.addEventListener('touchmove', synBindSync_syncCh3WithDeck, { passive: true });
    }
    const vpEl_syncCh3WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh3WithDeck) {
      vpEl_syncCh3WithDeck.addEventListener('scroll', synBindSync_syncCh3WithDeck, { passive: true });
      vpEl_syncCh3WithDeck.addEventListener('touchmove', synBindSync_syncCh3WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh3WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh3WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh3WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh3WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh3WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh3WithDeck);
    }
    const hud = document.getElementById('ch3-3d-hud');
    if (hud) {
      hud.querySelectorAll('input, button').forEach(el => {
        el.addEventListener('keydown', e => e.stopPropagation());
        el.addEventListener('mousedown', e => e.stopPropagation());
        el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh3Engine);
  } else {
    runCh3Engine();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 4 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
window.comb4 = function(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let r = 1;
  for (let i = 1; i <= k; i++) r = r * (n - i + 1) / i;
  return Math.round(r);
};

window.showGenericTab = function(prefix, idx, maxIdx, btnEl) {
  for (let i = 1; i <= maxIdx; i++) {
    const p = document.getElementById(prefix + '-' + i);
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

window.fact4 = function(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};

// WIDGET 1: §4.1.2 4-Store Protyposis Tetrahedron & Simplex Fillings
window.tetTier = 4;
window.setTetTier = function(t) {
  window.tetTier = t;
  window.updateSimplexCalc();
};

window.updateSimplexCalc = function() {
  const elQ = document.getElementById('simp-q');
  if (!elQ) return;
  let Q = parseInt(elQ.value);
  document.getElementById('simp-q-val').innerText = Q;

  let f2D = Q;
  let f3D = window.comb4(Q + 1, 2);
  let f4D_mult = window.comb4(Q + 2, 3);
  let f4D_heim = window.comb4(Q, 3) + window.comb4(Q, 2);

  // Render 4-Store Tetrahedron SVG
  const svg = document.getElementById('tet-svg');
  if (svg) {
    const pts = [
      { x: 90, y: 16, lbl: "P₁" },
      { x: 26, y: 108, lbl: "P₂" },
      { x: 154, y: 108, lbl: "P₃" },
      { x: 98, y: 68, lbl: "P₄" }
    ];
    let html = "";
    if (window.tetTier >= 3) {
      let op = window.tetTier === 4 ? 0.32 : 0.22;
      html += `<polygon points="90,16 26,108 98,68" fill="rgba(147,112,219,${op})"/>`;
      html += `<polygon points="90,16 154,108 98,68" fill="rgba(255,165,0,${op})"/>`;
      html += `<polygon points="26,108 154,108 98,68" fill="rgba(32,178,170,${op})"/>`;
    }
    if (window.tetTier >= 2) {
      for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
          html += `<line x1="${pts[i].x}" y1="${pts[i].y}" x2="${pts[j].x}" y2="${pts[j].y}" stroke="#20B2AA" stroke-width="2.2"/>`;
        }
      }
    }
    pts.forEach(p => {
      html += `<circle cx="${p.x}" cy="${p.y}" r="7.5" fill="#FFD700" stroke="#000" stroke-width="1.5"/>`;
      html += `<text x="${p.x}" y="${p.y - 10}" fill="#FFD700" font-size="9.5" font-weight="bold" text-anchor="middle">${p.lbl}</text>`;
    });
    svg.innerHTML = html;
  }

  let tierDesc = window.tetTier === 1 ? "1-Store Subcollections: C(4,1) = 4 Vertices" :
                 (window.tetTier === 2 ? "2-Store Pairs: C(4,2) = 6 Edges" :
                 (window.tetTier === 3 ? "3-Store Triads: C(4,3) = 4 Faces" : "Full 4-Store Syntrixtotalität T0 (4 + 6 + 4 = 14 Proper Subcollections)"));

  document.getElementById('simp-readout').innerHTML =
    `<b>Active View:</b> <span style="color:#FFD700;">${tierDesc}</span><br>` +
    `<b>Simplex Fillings (Q=${Q}):</b> 2D Planes = <b>${f2D}</b> | 3D Subspaces C(Q+1,2) = <b>${f3D}</b> | 4D Interior C(Q+2,3) = <b style="color:#20B2AA;">${f4D_mult}</b> (Heim C(Q,3)+C(Q,2) = <b>${f4D_heim}</b>)`;
};

// WIDGET 2: §4.2.1 Wilson Loop Holonomy & Gauge Invariance
window.updateWilsonLab = function() {
  const elFl = document.getElementById('wil-flux');
  if (!elFl) return;
  let flux = parseFloat(elFl.value);
  let sig = parseFloat(document.getElementById('wil-sig').value);
  document.getElementById('wil-flux-val').innerText = flux.toFixed(2);
  document.getElementById('wil-sig-val').innerText = sig.toFixed(0) + '°';

  let yEnd = 88 - (flux / 3.14) * 64;
  const lift = document.getElementById('wil-lift');
  const gap = document.getElementById('wil-gap');
  const endPt = document.getElementById('wil-end');
  if (lift && gap && endPt) {
    lift.setAttribute('d', `M 45,88 Q 155,75 155,${(60 - flux*6).toFixed(1)} Q 155,${(45 - flux*8).toFixed(1)} 45,${yEnd.toFixed(1)}`);
    gap.setAttribute('y2', yEnd.toFixed(1));
    endPt.setAttribute('cy', yEnd.toFixed(1));
  }

  let trHol = 2.0 * Math.cos(flux); // SU(2) trace 2 cos(flux)
  let normFA = (flux * flux * 0.5).toFixed(3);
  const box = document.getElementById('wil-readout');
  if (box) {
    box.innerHTML =
      `<b>Wilson Holonomy:</b> ½ tr Hol_A(C) = cos(∬ Ω_int) = <b style="color:#FFD700;">${Math.cos(flux).toFixed(3)}</b> ${flux === 0 ? '(Trivial I)' : '(Non-Integrable Phase Shift!)'}<br>` +
      `<b>Prop. 4.4 Gauge Invariance at σ = ${sig}°:</b> ‖F_{σ·A}‖_{g_E,𝔤}² = ‖Ad(σ)F_A‖² = <b style="color:#20B2AA;">${normFA}</b> (Strictly Invariant!)`;
  }
};

// WIDGET 3: §4.2.3 Boundary-Tangent Corner Flow
window.updateCornerFlow = function() {
  const elT = document.getElementById('fl-t');
  if (!elT) return;
  let t = parseFloat(elT.value);
  document.getElementById('fl-t-val').innerText = (t >= 0 ? '+' : '') + t.toFixed(2);

  let x1 = Math.exp(t);
  let x2 = Math.exp(-t);
  let sx = 22 + x1 * 38;
  let sy = 95 - x2 * 26;
  const dot = document.getElementById('fl-dot');
  if (dot) {
    dot.setAttribute('cx', Math.min(162, Math.max(24, sx)).toFixed(1));
    dot.setAttribute('cy', Math.min(93, Math.max(12, sy)).toFixed(1));
  }

  const box = document.getElementById('fl-readout');
  if (box) {
    box.innerHTML =
      `<b>Flow State Φ_t^X(1, 1) = (e^t, e^{-t}) = (${x1.toFixed(2)}, ${x2.toFixed(2)}) ∈ (ℝ_{≥0})²</b> | ` +
      `Wall Tangency X^i|_{x^i=0} = 0 Preserved  |  Inverse Check: Φ_{-t}^X(Φ_t^X(x₀)) = (1.00, 1.00)`;
  }
};

window.setFlowTime = function(t) {
  const el = document.getElementById('fl-t');
  if (el) { el.value = t; window.updateCornerFlow(); }
};

// WIDGET 4: §4.2.4 Yang-Mills & BRST Tab Switcher
window.showBRSTTab = function(idx, btnEl) {
  for (let i = 1; i <= 4; i++) {
    const p = document.getElementById('brst-pane-' + i);
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

// WIDGET 5: §4.3.1 Stage IV Non-Abelian su(2) Polarimeter Lab
window.updateSU2Lab = function() {
  const elGrp = document.getElementById('su2-group');
  if (!elGrp) return;
  let grp = elGrp.value;
  let w1 = parseFloat(document.getElementById('su2-w1').value);
  let w2 = parseFloat(document.getElementById('su2-w2').value);
  document.getElementById('su2-w1-val').innerText = w1.toFixed(2);
  document.getElementById('su2-w2-val').innerText = w2.toFixed(2);

  let box = document.getElementById('su2-readout');
  const r1 = document.getElementById('su2-r1');
  const r2 = document.getElementById('su2-r2');
  const r3 = document.getElementById('su2-r3');

  if (grp === 'u1') {
    if (r1 && r2 && r3) { r1.setAttribute('r', '2'); r2.setAttribute('opacity', '0.1'); r3.setAttribute('opacity', '0.1'); }
    box.style.borderLeftColor = "#4169E1";
    box.innerHTML =
      `<span style="color:#82aaff;"><b>★ ABELIAN U(1) SANITY CHECK (§4.5.1):</b> [T₁, T₂] = 0, a_int = 0</span><br>` +
      `<b>Interaction Curvature:</b> Ω_int^D = [a₁, a₂] = <b>0</b>  |  <b>Enyphaniegrad Density:</b> g_E^D(x) = <b>0.000</b><br>` +
      `<b>Holoform Emergence:</b> Δ_emerg^I = <b>0.000</b> (Linear Abelian fields cannot self-generate interaction curvature!)`;
  } else {
    let commMag = w1 * w2;
    let gE = 0.125 * commMag * commMag;
    let scale = Math.min(1.3, 0.25 + commMag * 0.25);
    if (r1 && r2 && r3) {
      r1.setAttribute('r', (16 * scale).toFixed(1));
      r2.setAttribute('r', (32 * scale).toFixed(1));
      r3.setAttribute('r', (48 * scale).toFixed(1));
      r2.setAttribute('opacity', commMag > 0 ? '0.75' : '0.1');
      r3.setAttribute('opacity', commMag > 0 ? '0.5' : '0.1');
    }
    let status = (gE > 0.0001)
      ? `<span style="color:#FFD700;"><b>SUPER-ADDITIVE HOLOFORM EMERGENCE (Δ_emerg^I > 0)!</b></span>`
      : `<span style="color:#cbd5e1;">Uncoupled Vacuum Baseline (g_E = 0)</span>`;
    box.style.borderLeftColor = (gE > 0.0001) ? "#FFD700" : "#708090";
    box.innerHTML =
      `<b>Constituent Curvatures:</b> F₁ = da₁ + ½[a₁,a₁] = <b>0</b>,  F₂ = da₂ + ½[a₂,a₂] = <b>0</b> (Individually Flat!)<br>` +
      `<b>Emergent Commutator:</b> Ω_int^D = [a₁, a₂] = <b style="color:#20B2AA;">${commMag.toFixed(3)} · T₃ dx¹ ∧ dx²</b><br>` +
      `<b>Enyphaniegrad Density:</b> g_E^D = ⅛ ω₁² ω₂² = <b style="color:#FFA500;">${gE.toFixed(4)}</b>  ⇒  ${status}`;
  }
};

// WIDGET 6A: §4.3.1 Non-Flat Hodge-Laplacian Splitting Lab
window.updateLaplacianLab = function() {
  const elGr = document.getElementById('lap-gr');
  const elHa = document.getElementById('lap-ha');
  if (!elGr || !elHa) return;
  let gr = parseFloat(elGr.value);
  let ha = parseFloat(elHa.value);

  const elGrVal = document.getElementById('lap-gr-val');
  const elHaVal = document.getElementById('lap-ha-val');
  if (elGrVal) elGrVal.innerText = gr.toFixed(2);
  if (elHaVal) elHaVal.innerText = ha.toFixed(2);

  let eGr = 0.5 * (gr * gr);
  let eHa = 0.5 * (ha * ha);
  let eInt = eGr + eHa;

  let box = document.getElementById('lap-readout');
  if (!box) return;
  box.style.borderLeft = "4px solid #20B2AA";
  box.innerHTML = `<b>Theorem 4.13 Energy Orthogonality:</b> E_int^D = ½(‖Δ_{A₀}Φ_int‖² + ‖γ_harm‖²) = ½(${(gr*gr).toFixed(2)} + ${(ha*ha).toFixed(2)}) = <b style="color:#20B2AA;">${eInt.toFixed(3)}</b><br>` +
    `<span style="color:#82aaff;"><b>Fredholm Orthogonal Decomposition:</b> Ω_int^D = Δ_{A₀}Φ_int + γ_harm with ⟨Δ_{A₀}Φ_int, γ_harm⟩_{L²} ≡ 0.</span><br>` +
    `<span style="color:#FFA500;"><b>Claim Ceiling c_LAPLACE:</b> 2-way splitting holds for all connections A₀; 3-way Hodge splitting requires D_{A₀}² = 0.</span>`;
};

// WIDGET 6B: §4.3.3 Atiyah Lie Algebroid & Bogomolny Bound Lab
window.updateBogomolny = function() {
  const elQ = document.getElementById('bog-q');
  const elFl = document.getElementById('bog-fl');
  if (!elQ || !elFl) return;
  let q = parseInt(elQ.value);
  let fl = parseFloat(elFl.value);

  const elQVal = document.getElementById('bog-q-val');
  const elFlVal = document.getElementById('bog-fl-val');
  if (elQVal) elQVal.innerText = (q >= 0 ? '+' : '') + q;
  if (elFlVal) elFlVal.innerText = fl.toFixed(1);

  let fourPiSq = 4.0 * Math.PI * Math.PI;
  let bound = fourPiSq * Math.abs(q);
  let action = bound + 0.25 * fl * fl;

  let box = document.getElementById('bog-readout');
  if (!box) return;

  if (q !== 0 && fl === 0) {
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>★ INSTANTON SATURATION (*F_A = ${q > 0 ? '+' : '-'}F_A, Q_top = ${q}):</b></span> ` +
      `Action I(A) = 4π²|Q_top| = <b>${action.toFixed(2)}</b> (Topologically locked Holoform; Chern–Weil invariant prevents decay to vacuum!)`;
  } else if (q !== 0) {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<b>Topological Sector Q_top = ${q}:</b> ¼‖F_A ∓ *F_A‖² + 4π²|Q_top| = <b style="color:#FFA500;">${action.toFixed(2)} ≥ ${bound.toFixed(2)}</b> (Stable Holoform, Non-Self-Dual dev = ${fl.toFixed(1)})`;
  } else {
    box.style.borderLeftColor = "#708090";
    box.innerHTML = `<b>Topologically Trivial Sector (Q_top = 0):</b> Lower bound = 0.00 | Action I(A) = <b>${action.toFixed(2)}</b> (Can continuously relax to vacuum).`;
  }
};


// WIDGET 7: §4.3.5 Syntrixfunktor Combinatorics & Zeitkorn Clock
window.zkStep = 0;
window.zkTime = 0.0;

window.updateYFLab = function() {
  const elN = document.getElementById('yf-n');
  if (!elN) return;
  let N = parseInt(elN.value);
  let rIn = document.getElementById('yf-r');
  rIn.max = N;
  let r = Math.min(N, parseInt(rIn.value));
  rIn.value = r;

  let kIn = document.getElementById('yf-k');
  kIn.max = r;
  let k = Math.min(r, parseInt(kIn.value));
  kIn.value = k;

  document.getElementById('yf-n-val').innerText = N;
  document.getElementById('yf-r-val').innerText = r;
  document.getElementById('yf-k-val').innerText = k;

  let zSym = window.comb4(N, r);
  let zKAsym = window.fact4(k) * window.comb4(N, r) * window.comb4(r, k);
  let zAsym = window.fact4(r) * zSym;

  document.getElementById('yf-cards').innerHTML = `
    <div class="stat-card" style="border-left-color:#4169E1;">
      <b style="color:#82aaff;">Z_sym (Symmetric):</b><br>C(${N}, ${r}) = <b style="color:#FFD700;">${zSym.toLocaleString()}</b>
    </div>
    <div class="stat-card" style="border-left-color:#20B2AA;">
      <b style="color:#5eead4;">Z_{k-asym} (k=${k}):</b><br>k!C(N,r)C(r,k) = <b style="color:#FFD700;">${zKAsym.toLocaleString()}</b>
    </div>
    <div class="stat-card" style="border-left-color:#FFA500;">
      <b style="color:#fcd34d;">Z_asym (Full Asym):</b><br>N!/(N-r)! = <b style="color:#FFD700;">${zAsym.toLocaleString()}</b>
    </div>
  `;
};

window.stepZeitkorn = function() {
  window.zkStep += 1;
  let dt = 0.85 + 0.15 * (window.zkStep % 3);
  window.zkTime += dt;
  const box = document.getElementById('zk-readout');
  if (box) {
    box.style.borderLeftColor = "#FFD700";
    box.innerText =
      `Iteration Step n = ${window.zkStep} (Sheaf f_${window.zkStep} = YF^${window.zkStep}(f₀)) | Zeitkorn δt_${window.zkStep-1} = +${dt.toFixed(2)} | Total Elapsed Time t_${window.zkStep} = τ(${window.zkStep}) = ${window.zkTime.toFixed(2)}`;
  }
};

window.resetZeitkorn = function() {
  window.zkStep = 0;
  window.zkTime = 0.0;
  const box = document.getElementById('zk-readout');
  if (box) {
    box.style.borderLeftColor = "#20B2AA";
    box.innerText = `Iteration Step n = 0 (Sheaf f₀) | Last Zeitkorn δt = 0.00 | Elapsed Physical Time t_N = τ(0) = 0.00`;
  }
};

// WIDGET 8: §4.3.7 3x3 Taxonomic Grid A_ik
window.inspectAik = function(i, k) {
  const data = {
    "11": { title: "Class A₁₁ (Synthesizing Conflexive — REGULAR)", col: "#20B2AA", desc: "Preserves finite colimits; adds span pushout nodes φ_l while preserving Syntropodenzahl (SM p. 78)." },
    "12": { title: "⚠ Class A₁₂ (Synthesizing Tensorial — SINGULAR)", col: "#DC143C", desc: "Preserves colimits but strictly compresses state-space tensor dimension: dim F(M_syn) < dim M_syn (Dimension-Defect Singularity!)." },
    "13": { title: "Class A₁₃ (Synthesizing Field-Intrinsic — REGULAR)", col: "#20B2AA", desc: "Preserves finite colimits and manifold dimension; synthesizes metric tensor g^{syn} and vector field X_{kor}." },
    "21": { title: "Class A₂₁ (Analyzing Conflexive — REGULAR)", col: "#20B2AA", desc: "Preserves finite limits (overlap pullbacks); decomposes conflexive network channels when split products preserve Syntropodenzahl." },
    "22": { title: "⚠ Class A₂₂ (Analyzing Tensorial — SINGULAR)", col: "#DC143C", desc: "Preserves limits but strictly inflates state-space tensor dimension: dim F(M_syn) > dim M_syn (Dimension-Inflation Singularity!)." },
    "23": { title: "Class A₂₃ (Analyzing Field-Intrinsic — REGULAR)", col: "#20B2AA", desc: "Preserves finite limits and manifold dimension; analyzes affine connection coefficients Γ_{kl}^i." },
    "31": { title: "Class A₃₁ (Isogonal Conflexive — UNCONDITIONALLY REGULAR)", col: "#4169E1", desc: "Categorical equivalence inducing invertible network isomorphism on pushout incidence graphs." },
    "32": { title: "Class A₃₂ (Isogonal Tensorial — MORITA REGULAR)", col: "#4169E1", desc: "Categorical equivalence preserving bundle spectrum via Morita equivalence of endomorphism algebras." },
    "33": { title: "Class A₃₃ (Isogonal Field-Intrinsic — CONFORMAL REGULAR)", col: "#4169E1", desc: "Conformal diffeomorphism equivalence preserving smooth manifold dimension and causal structure." }
  };
  let item = data[`${i}${k}`];
  let box = document.getElementById('aik-readout');
  if (box && item) {
    box.style.borderLeftColor = item.col;
    box.innerHTML = `<b style="color:${item.col};">${item.title}:</b><br>${item.desc}`;
  }
};

// ---------------------------------------------------------------------------
// VIDEO CONTROL: play Manim clips only while their slide is visible
// ---------------------------------------------------------------------------
function prepareVideos() {
  document.querySelectorAll('video').forEach(v => {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = 'auto';
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('muted', '');
    v.setAttribute('loop', '');
    v.setAttribute('preload', 'auto');
  });
}

function syncVideosToSlide() {
  const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
    || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
    || window.innerWidth <= 768;

  const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
  const winH = window.innerHeight || document.documentElement.clientHeight;
  const winW = window.innerWidth || document.documentElement.clientWidth;

  document.querySelectorAll('video').forEach(v => {
    let shouldPlay = false;
    if (isScroll) {
      const rect = v.getBoundingClientRect();
      const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
      shouldPlay = inView;
    } else {
      shouldPlay = current ? current.contains(v) : true;
    }

    if (shouldPlay) {
      v.muted = true;
      v.playsInline = true;
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } else if (!v.paused) {
      v.pause();
    }
  });
}

// Ensure continuous sync on mobile scroll and touch gestures
if (typeof window !== 'undefined') {
  window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
  window.__syn_video_sync_handlers.push(syncVideosToSlide);
  if (!window.__syn_video_scroll_hooked) {
    window.__syn_video_scroll_hooked = true;
    const runSync = () => {
      (window.__syn_video_sync_handlers || []).forEach(fn => {
        try { fn(); } catch (_) {}
      });
    };
    window.addEventListener('scroll', runSync, { passive: true });
    window.addEventListener('touchmove', runSync, { passive: true });
    window.addEventListener('resize', runSync, { passive: true });
    let synMediaUnlocked = false;
    function synUnlockMedia() {
      if (synMediaUnlocked) return;
      synMediaUnlocked = true;
      runSync();
    }
    document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
    document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
  }
}

// ---------------------------------------------------------------------------
// WIDGET WIRING (runs once; slide changes no longer reset widget state)
// ---------------------------------------------------------------------------
function renderAllCh4Widgets() {
  window.updateSimplexCalc();
  window.updateWilsonLab();
  window.updateCornerFlow();
  window.updateSU2Lab();
  window.updateLaplacianLab();
  window.updateBogomolny();
  window.updateYFLab();
}

function bindControlsOnce() {
  document.querySelectorAll('input[type="range"], select, button').forEach(el => {
    if (el.dataset.synBound) return;
    el.dataset.synBound = '1';
    el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());
  });
}

let synInitialised = false;
function initChapter4() {
  if (synInitialised) return;
  synInitialised = true;
  prepareVideos();
  bindControlsOnce();
  renderAllCh4Widgets();
  syncVideosToSlide();
}

if (window.Reveal && window.Reveal.on) {
  window.Reveal.on('ready', initChapter4);
  window.Reveal.on('slidechanged', syncVideosToSlide);
  window.Reveal.on('fragmentshown', syncVideosToSlide);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter4();
  });
} else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
  initChapter4();
}


// =========================================================================
// CHAPTER 4: 60FPS 3D INTERACTIVE GAUGE CURVATURE, WILSON LOOP & ZEITKORN ENGINE
// =========================================================================

const CH4_3D_STYLE = `
#ch4-3d-hud {
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

#ch4-3d-hud *, #ch4-3d-hud *::before, #ch4-3d-hud *::after {
  box-sizing: border-box;
}

#ch4-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch4-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch4-3d-hud.minimized .ch4-hud-body {
  display: none;
}

.ch4-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch4-hud-title {
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

.ch4-hud-title span:first-child {
  line-height: 1.15;
}

.ch4-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch4-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch4-hud-btn {
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

.ch4-hud-btn:hover, .ch4-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch4-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch4-canvas-wrap:active {
  cursor: grabbing;
}

#ch4-3d-hud.spotlight .ch4-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch4-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch4-overlay-bar {
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

.ch4-telemetry {
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

#ch4-node-inspector {
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

.ch4-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch4-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch4-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch4-scrubber .ch4-hud-btn {
  flex-shrink: 0;
}

#ch4-caption {
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
  #ch4-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch4-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch4-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch4-hud-controls {
    gap: 3px;
  }
  .ch4-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch4-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch4-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch4-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch4-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch4-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch4-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch4-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch4-hud-controls {
    gap: 3px;
  }
  .ch4-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch4-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch4-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch4-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch4-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch4-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch4-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch4-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH4_3D_HTML = `
<div class="ch4-hud-header">
    <div class="ch4-hud-title">
      <span>🌀 Ch 4 · 3D Gauge &amp; Enyphanie Engine</span>
      <span id="ch4-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>
    </div>
    <div class="ch4-hud-controls">
      <button class="ch4-hud-btn active" id="ch4-btn-orbit" onclick="toggleCh4Orbit()">⟳ Orbit</button>
      <button class="ch4-hud-btn" onclick="toggleCh4Spotlight()">⛶ Spotlight</button>
      <button class="ch4-hud-btn" id="ch4-btn-min" onclick="toggleCh4Minimize()">+</button>
    </div>
  </div>

  <div class="ch4-hud-body">
    <div class="ch4-canvas-wrap" id="ch4-canvas-wrap">
      <canvas id="ch4-3d-canvas"></canvas>
      <div class="ch4-overlay-bar">
        <div class="ch4-telemetry" id="ch4-telemetry">Ω_int^𝒟 ∈ Ω²(M_U, ad P_U)</div>
        <div id="ch4-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>
      </div>
    </div>

    <div class="ch4-scrubber">
      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>
      <button class="ch4-hud-btn" title="Previous Stage" onclick="window.setCh4Stage(Math.round( parseFloat(document.getElementById('ch4-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch4-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh4Stage(this.value)">
      <button class="ch4-hud-btn" title="Next Stage" onclick="window.setCh4Stage(Math.round( parseFloat(document.getElementById('ch4-slider').value) ) + 1, true)">▶</button>
      <button class="ch4-hud-btn active" id="ch4-btn-sync" onclick="enableCh4Sync()">Auto-Sync</button>
    </div>

    <div id="ch4-caption">
      <b>Stage 1 (§4.1.1–4.1.2):</b> 4-Store Protyposis Tetrahedron (4+6+4 = 14 degenerate sub-stores + T0 core).
    </div>
  </div>
`;

function injectCh43DHUD() {
  if (document.getElementById('ch4-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH4_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch4-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH4_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch4_3d_engine_loaded) return;
  window.__ch4_3d_engine_loaded = true;

  function runCh4Engine() {
    injectCh43DHUD();
    if (window.__ch4_3d_engine_initialized) return;
    window.__ch4_3d_engine_initialized = true;

    const canvas = document.getElementById('ch4-3d-canvas');
    const wrap = document.getElementById('ch4-canvas-wrap');
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');

    let targetStage = 1.0;
    let curStage = 1.0;
    let autoSync = true;
    let autoOrbit = true;
    let camYaw = -0.50;
    let camPitch = 0.36;
    let camZoom = 1.65;
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let timeSec = 0;
    let hitNodes = [];
    let selectedId = null;

    const STAGE_CAPTIONS = {
      1: "<b>Stage 1 (§4.1.1–4.1.2 — 4-Store Protyposis Tetrahedron):</b> 4 stores {P₁..P₄} span 4+6+4 = 14 proper sub-collections around Syntrixtotalität T0.",
      2: "<b>Stage 2 (§4.1.3–4.1.4 — Enyphane Flow &amp; Holoformen):</b> Continuous parameter flow ℰ with exact inverse ℰ⁻¹(ℰ(yã)) = yã &amp; superadditive Holoform H.",
      3: "<b>Stage 3 (§4.2.1 — Principal G-Bundle &amp; 3D Wilson Loop Lift):</b> Horizontal lift γ̃(t) accumulates vertical holonomy Hol_A(γ) = 𝒫 exp(−∮ A) ≠ I.",
      4: "<b>Stage 4 (§4.2.2–4.2.3 — Slice Topos T0 &amp; Corner Flows):</b> Boundary-tangent Enyphane trajectories X^i|_{x^i=0} = 0 on orthant M_n = (ℝ_≥0)^n.",
      5: "<b>Stage 5 (§4.2.4 — Yang–Mills Action &amp; Graded BRST Complex):</b> Nilpotent BRST differential s_BRST² ≡ 0 isolating gauge-invariant H⁰_BRST(ℱ_ext).",
      6: "<b>Stage 6 (§4.3.1 — Thm. 4.12 Interaction Curvature Decomposition):</b> Non-Abelian Lie commutator Ω_int^𝒟 = ∑_{i<j}[a_i, a_j] + D_{A₀}a_int + … ≠ 0!",
      7: "<b>Stage 7 (Stage IV su(2) Polarimeter &amp; Enyphaniegrad g_E^𝒟):</b> Flat potentials a₁=ω₁T₁dx¹, a₂=ω₂T₂dx² ignite T₃ vortex with g_E^𝒟 = ⅛ω₁²ω₂² > 0!",
      8: "<b>Stage 8 (§4.3.1–4.3.3 — Fredholm Laplacian &amp; Bogomolny Instanton):</b> Orthogonal splitting Δ_{A₀}Φ_int ⊕ γ_harm &amp; Bogomolny bound ℐ(A) ≥ 4π²|Q_top|.",
      9: "<b>Stage 9 (§4.3.4–4.3.5 — Syntrixfeld Triple &amp; Zeitkorn δt_n):</b> Pushout functor iteration f_{n+1} = YF_model(f_n) quantizes discrete Zeitkorn steps δt_n.",
      10: "<b>Stage 10 (§4.3.6–4.6 — 3×3 Matrix Â = (A_ik) &amp; Affinity β^∞):</b> Singular dimension-defect pillars A₁₂, A₂₂ vs. regular isogonal classes &amp; β^∞ interface."
    };

    const STAGE_TELEMETRY = {
      1: "Protyposis: ∑_{j=1}^3 C(4,j) = 14 + T0",
      2: "YC = ℰ(yã) | ℰ⁻¹(ℰ(yã)) = yã (SM-16a)",
      3: "‖F_{σ·A}‖_{g,𝔤} = ‖F_A‖_{g,𝔤} (Prop. 4.4)",
      4: "T0 ≃ Sh(Ctx_{/U_G}) ≃ ℰ_syn / y(U_G)",
      5: "D_A* F_A = 0 | s_BRST² ≡ 0 (Prop. 4.11)",
      6: "F_A = ∑ ℱ_k^{(A₀)} + Ω_int^𝒟 (Thm. 4.12)",
      7: "[T₁, T₂] = T₃ ⇒ g_E^𝒟 = ½‖Ω_int^𝒟‖² > 0",
      8: "ℐ(A) ≥ 4π²|Q_top(A)| (Thm. 4.18)",
      9: "Zeitkorn: δt_n = τ(n+1) − τ(n) > 0",
      10: "Singular: A₁₂, A₂₂ | ker T_β = ker S_β = {0}"
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
      const tv = [
        { id: "P1", x:  0.00, y:  0.00, z:  1.25, col: "#4169E1", lbl: "Store P₁" },
        { id: "P2", x:  1.22, y:  0.00, z: -0.65, col: "#20B2AA", lbl: "Store P₂" },
        { id: "P3", x: -0.61, y:  1.05, z: -0.65, col: "#FFA500", lbl: "Store P₃" },
        { id: "P4", x: -0.61, y: -1.05, z: -0.65, col: "#9370DB", lbl: "Store P₄" }
      ];
      const pts = tv.map(v => drawNode3D(v.id, v.x, v.y, v.z, 8.5, v.col, "#fff", v.lbl, `${v.lbl}: 1 of 4 Syntrixspeicher (C(4,1)=4 vertices, C(4,2)=6 edges, C(4,3)=4 faces)`, w, h));
      const pT0 = drawNode3D("T0_core", 0, 0, -0.1, 11, "#FFD700", "#DC143C", "Syntrixtotalität T0", "Full 4-Store Syntrixtotalität T0 ≃ Sh(Ctx_{/U_G}) (14 proper + 1 full = 15)", w, h);
      for (let i = 0; i < 4; i++) {
        drawLine3D(pts[i], pT0, "rgba(255,215,0,0.5)", 1.6, [3, 3]);
        for (let j = i + 1; j < 4; j++) {
          drawLine3D(pts[i], pts[j], "rgba(32,178,170,0.65)", 2.2);
        }
      }
    }

    function renderStage2(w, h) {
      for (let k = 0; k < 3; k++) {
        const baseAng = (k / 3) * Math.PI * 2;
        ctx.beginPath();
        ctx.strokeStyle = k === 0 ? "#4169E1" : (k === 1 ? "#20B2AA" : "#FFA500");
        ctx.lineWidth = 2.6;
        for (let i = 0; i <= 50; i++) {
          const s = i / 50;
          const rad = 1.35 * (1 - s * 0.78);
          const a = baseAng + s * Math.PI * 2.2 + timeSec * 1.2;
          const p = proj(rad * Math.cos(a), rad * Math.sin(a), -1.0 + s * 2.0, w, h);
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
        const sx = 1.35 * Math.cos(baseAng + timeSec * 1.2);
        const sy = 1.35 * Math.sin(baseAng + timeSec * 1.2);
        drawNode3D("Geb_" + k, sx, sy, -1.0, 7, "#4169E1", "#fff", `Gebilde G_${k+1}`, `Discrete Constituent Gebilde G_${k+1} transported by Enyphane flow Φ_t^X`, w, h);
      }
      drawNode3D("Hol_Emerg", 0, 0, 1.0, 11.5, "#FFD700", "#DC143C", "Holoform H (Δ_emerg > 0)", "Superadditive Emergent Holoform: ℐ(A) − ∑ ℐ(A₀+a_k) + (N−1)ℐ(A₀) > 0", w, h);
    }

    function renderStage3(w, h) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(65,105,225,0.65)";
      ctx.lineWidth = 2.2;
      ctx.setLineDash([4, 3]);
      for (let i = 0; i <= 48; i++) {
        const a = (i / 48) * Math.PI * 2;
        const p = proj(1.15 * Math.cos(a), 1.15 * Math.sin(a), -1.05, w, h);
        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      const holGap = 1.35 + 0.25 * Math.sin(timeSec * 1.5);
      ctx.beginPath();
      ctx.strokeStyle = "#20B2AA";
      ctx.lineWidth = 3.2;
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        const a = t * Math.PI * 2;
        const p = proj(1.15 * Math.cos(a), 1.15 * Math.sin(a), -0.75 + t * holGap, w, h);
        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
      }
      ctx.stroke();

      const pStart = drawNode3D("Wil_p0", 1.15, 0, -0.75, 7.5, "#4169E1", "#fff", "p₀ ∈ π⁻¹(x₀)", "Initial Fiber Point p₀ ∈ P_U above basepoint x₀ ∈ M_U", w, h);
      const pEnd   = drawNode3D("Wil_p1", 1.15, 0, -0.75 + holGap, 8.5, "#FFD700", "#DC143C", "p₀ · Hol_A(γ)", "Parallel-Transported Endpoint: Hol_A(γ) = 𝒫 exp(−∮ A) ∈ G", w, h);
      drawLine3D(proj(1.15, 0, -1.15, w, h), proj(1.15, 0, 1.15, w, h), "#FFD700", 3.0);
    }

    function renderStage4(w, h) {
      const orig = drawNode3D("Corner_0", -0.9, -0.9, -0.9, 8, "#DC143C", "#FFD700", "Corner 0 ∈ M_n", "Octant Origin Corner: X^i|_{x^i=0} = 0 prevents trajectories escaping M_n", w, h);
      const axX = drawNode3D("Wall_1",  1.3, -0.9, -0.9, 6, "#ff6b81", "#fff", "x¹ ≥ 0", "Boundary Face x² = x³ = 0 (Tangent Wall)", w, h);
      const axY = drawNode3D("Wall_2", -0.9,  1.3, -0.9, 6, "#ff6b81", "#fff", "x² ≥ 0", "Boundary Face x¹ = x³ = 0 (Tangent Wall)", w, h);
      const axZ = drawNode3D("Wall_3", -0.9, -0.9,  1.3, 6, "#ff6b81", "#fff", "x³ ≥ 0", "Boundary Face x¹ = x² = 0 (Tangent Wall)", w, h);
      drawLine3D(orig, axX, "#DC143C", 2.6);
      drawLine3D(orig, axY, "#DC143C", 2.6);
      drawLine3D(orig, axZ, "#DC143C", 2.6);

      for (let k = 1; k <= 3; k++) {
        ctx.beginPath();
        ctx.strokeStyle = "#20B2AA";
        ctx.lineWidth = 2.4;
        for (let s = -1.2; s <= 1.21; s += 0.1) {
          const u = -0.82 + 0.32 * k * Math.exp(s * 0.75);
          const v = -0.82 + 0.32 * k * Math.exp(-s * 0.75);
          const z = -0.82 + 0.28 * k;
          if (u <= 1.35 && v <= 1.35) {
            const p = proj(u, v, z, w, h);
            if (s === -1.2) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
          }
        }
        ctx.stroke();
      }
      const sBall = Math.sin(timeSec * 1.6);
      drawNode3D("Flow_Pt", -0.82 + 0.64 * Math.exp(sBall * 0.7), -0.82 + 0.64 * Math.exp(-sBall * 0.7), -0.25, 7.5, "#FFD700", "#000", "φ_t^X(x₀)", "Globally Complete Diffeomorphism Flow (Grönwall Sub-Linear Bound)", w, h);
    }

    function renderStage5(w, h) {
      const tiers = [
        { id: "BRST_m1", z: -1.05, col: "#9370DB", lbl: "ℱ⁻¹: Antighost c̄ (gh = −1)", info: "s_BRST(c̄) = b (Nakanishi–Lautrup Auxiliary Field)" },
        { id: "BRST_0",  z: -0.35, col: "#20B2AA", lbl: "ℱ⁰: H⁰_BRST = ker s / im s (A, b)", info: "Gauge-Invariant Physical Observables (D_A* F_A = 0)" },
        { id: "BRST_p1", z:  0.35, col: "#FFA500", lbl: "ℱ¹: Faddeev–Popov Ghost c (gh = +1)", info: "s_BRST(A) = D_A c | Odd total degree |c| = 1" },
        { id: "BRST_p2", z:  1.05, col: "#DC143C", lbl: "ℱ²: −½[c, c] (s²c = ½[[c,c],c] ≡ 0)", info: "Graded Jacobi Identity guarantees exact nilpotency s_BRST² ≡ 0!" }
      ];
      let prev = null;
      tiers.forEach(t => {
        const p = drawNode3D(t.id, 0, 0, t.z, t.id === "BRST_0" ? 10.5 : 8, t.col, "#fff", t.lbl, t.info, w, h);
        if (prev) drawLine3D(prev, p, "#FFD700", 2.5, [4, 2]);
        prev = p;
      });
    }

    function renderStage6And7(w, h, st) {
      for (let g = -1.4; g <= 1.41; g += 0.7) {
        drawLine3D(proj(g, -1.4, -1.05, w, h), proj(g, 1.4, -1.05, w, h), "rgba(65,105,225,0.28)", 1);
        drawLine3D(proj(-1.4, g, -1.05, w, h), proj(1.4, g, -1.05, w, h), "rgba(65,105,225,0.28)", 1);
      }
      const pA1 = drawNode3D("Pot_a1", 1.35, 0, -1.05, 7.5, "#4169E1", "#fff", "a₁ = ω₁ T₁ dx¹", "Polarimeter S_a Potential: Individually Flat (ℱ₁ = 0)", w, h);
      const pA2 = drawNode3D("Pot_a2", 0, 1.35, -1.05, 7.5, "#20B2AA", "#fff", "a₂ = ω₂ T₂ dx²", "Polarimeter S_b Potential: Individually Flat (ℱ₂ = 0)", w, h);
      drawLine3D(proj(-1.35, 0, -1.05, w, h), pA1, "#4169E1", 3.0);
      drawLine3D(proj(0, -1.35, -1.05, w, h), pA2, "#20B2AA", 3.0);

      ctx.beginPath();
      ctx.strokeStyle = "#DC143C";
      ctx.lineWidth = 3.2;
      for (let i = 0; i <= 90; i++) {
        const s = (i / 90) * Math.PI * 6;
        const r = 0.14 + 0.042 * s;
        const z = -1.05 + (i / 90) * 2.25;
        const p = proj(r * Math.cos(s - timeSec * 3.2), r * Math.sin(s - timeSec * 3.2), z, w, h);
        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
      }
      ctx.stroke();

      if (st >= 6.5) {
        for (let k = 1; k <= 3; k++) {
          const rad = 0.35 * k + ((timeSec * 0.4) % 0.35);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 215, 0, ${1.0 - rad / 1.45})`;
          ctx.lineWidth = 2.0;
          for (let i = 0; i <= 36; i++) {
            const a = (i / 36) * Math.PI * 2;
            const p = proj(rad * Math.cos(a), rad * Math.sin(a), -0.2 + k * 0.3, w, h);
            if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
          }
          ctx.stroke();
        }
      }
      drawNode3D("Vortex_Apex", 0, 0, 1.2, 10, "#FFD700", "#DC143C", "Ω_int^𝒟 = [a₁,a₂] ≠ 0", "Emergent Non-Abelian Interaction Curvature (g_E^𝒟 = ½‖Ω_int^𝒟‖² > 0)", w, h);
    }

    function renderStage8(w, h) {
      for (let lat = -60; lat <= 60; lat += 30) {
        const r = 0.95 * Math.cos(lat * Math.PI / 180);
        const z = 0.95 * Math.sin(lat * Math.PI / 180);
        ctx.beginPath();
        ctx.strokeStyle = "rgba(32, 178, 170, 0.55)";
        ctx.lineWidth = 1.6;
        for (let i = 0; i <= 36; i++) {
          const a = (i / 36) * Math.PI * 2;
          const p = proj(r * Math.cos(a), r * Math.sin(a), z, w, h);
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }
      const pOrig = drawNode3D("Bog_Core", 0, 0, 0, 10, "#FFD700", "#DC143C", "Instanton *F_A = ±F_A", "Bogomolny Bound: ℐ(A) ≥ 4π²|Q_top| (Topologically Locked Holoform, Thm. 4.18)", w, h);
      const pGr = drawNode3D("Lap_Green", 1.35, 0, 0, 7.5, "#20B2AA", "#fff", "Δ_{A₀}Φ_int ∈ im(Δ)", "Exact Green Potential Component in L²Ω²(M_U, ad P_U) (Thm. 4.13)", w, h);
      const pHa = drawNode3D("Lap_Harm", 0, 0, 1.3, 7.5, "#FFA500", "#fff", "γ_harm ∈ ker(Δ_{A₀})", "Harmonic Cohomology Component: ℰ_int = ½(‖ΔΦ‖² + ‖γ_harm‖²)", w, h);
      drawLine3D(pOrig, pGr, "#20B2AA", 2.8);
      drawLine3D(pOrig, pHa, "#FFA500", 2.8);
    }

    function renderStage9(w, h) {
      const N = 7;
      let prev = null;
      for (let n = 0; n < N; n++) {
        const a = (n / (N - 1)) * Math.PI * 1.8 - 0.8;
        const x = 1.15 * Math.cos(a), y = 1.15 * Math.sin(a), z = -1.05 + n * 0.35;
        const isActive = (Math.floor(timeSec * 2) % N) === n;
        const p = drawNode3D(
          "Zk_" + n, x, y, z, isActive ? 9 : 6.5,
          isActive ? "#FFD700" : "#20B2AA", "#fff",
          `f_${n} (τ_${n})`,
          `Discrete Chronometric State f_${n} = (YF_model)^${n}(f₀) | Zeitkorn δt_${n} = τ(${n+1})−τ(${n}) > 0`, w, h
        );
        if (prev) {
          const pCorner = proj(x, y, z - 0.35, w, h);
          drawLine3D(prev, pCorner, "#4169E1", 2.2);
          drawLine3D(pCorner, p, "#FFD700", 2.6);
        }
        prev = p;
      }
    }

    function renderStage10(w, h) {
      for (let i = 1; i <= 3; i++) {
        for (let k = 1; k <= 3; k++) {
          const x = (k - 2) * 0.95;
          const y = (i - 2) * 0.85;
          const isSing = (i === 1 && k === 2) || (i === 2 && k === 2);
          const z = isSing ? 0.65 + 0.15 * Math.sin(timeSec * 4) : -0.45;
          const col = isSing ? "#DC143C" : (i === 3 ? "#4169E1" : "#20B2AA");
          const pBase = proj(x, y, -0.85, w, h);
          const pTop = drawNode3D(
            `A_${i}${k}`, x, y, z, isSing ? 9 : 6.5, col, "#fff",
            isSing ? `⚠ A_${i}${k}` : `A_${i}${k}`,
            isSing
              ? `Class A_${i}${k} (SINGULAR): Tensor Dimension Defect dim F(M_syn) ≠ dim M_syn (Thm. 4.25)!`
              : `Class A_${i}${k} (REGULAR): Preserves manifold dimension & Affinitätssyntrix β^∞`, w, h
          );
          drawLine3D(pBase, pTop, col, isSing ? 3.2 : 1.8);
        }
      }
    }

    function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch4-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }
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

      function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);
      else if (stInt === 2) renderStage2(w, h);
      else if (stInt === 3) renderStage3(w, h);
      else if (stInt === 4) renderStage4(w, h);
      else if (stInt === 5) renderStage5(w, h);
      else if (stInt === 6 || stInt === 7) renderStage6And7(w, h, stArg);
      else if (stInt === 8) renderStage8(w, h);
      else if (stInt === 9) renderStage9(w, h);
      else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);
    }

    // Window controller handlers
    window.setCh4Stage = function(val, manual) {
      targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));
      const stInt = Math.round(targetStage);

      const sl = document.getElementById('ch4-slider');
      if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;

      const pill = document.getElementById('ch4-stage-pill');
      if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;

      const cap = document.getElementById('ch4-caption');
      if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];

      const tel = document.getElementById('ch4-telemetry');
      if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];

      if (manual) {
        autoSync = false;
        const b = document.getElementById('ch4-btn-sync');
        if (b) { b.classList.remove('active'); b.innerText = "Manual"; }
      }
    };

    window.scrubCh4Stage = function(val) { window.setCh4Stage(val, true); };

    window.enableCh4Sync = function() {
      autoSync = true;
      const b = document.getElementById('ch4-btn-sync');
      if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }
      syncCh4WithDeck();
    };

    window.toggleCh4Orbit = function() {
      autoOrbit = !autoOrbit;
      const b = document.getElementById('ch4-btn-orbit');
      if (b) b.classList.toggle('active', autoOrbit);
    };

    window.toggleCh4Spotlight = function() {
      const hud = document.getElementById('ch4-3d-hud');
      if (hud) {
        hud.classList.remove('minimized');
        hud.classList.toggle('spotlight');
        setTimeout(resize, 360);
      }
    };

    window.toggleCh4Minimize = function() {
      const hud = document.getElementById('ch4-3d-hud');
      const b = document.getElementById('ch4-btn-min');
      if (hud) {
        hud.classList.remove('spotlight');
        hud.classList.toggle('minimized');
        if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";
        setTimeout(resize, 360);
      }
    };

        function syncCh4WithDeck() {
      if (!autoSync) return;

      const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
      const chHud = document.getElementById('ch4-3d-hud');
      if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
      const currentSlide = window.Reveal.getCurrentSlide();
      const inCh = currentSlide ? !!currentSlide.closest('#chapter-4, section[data-chapter="4"]') : true;
      chHud.style.display = inCh ? '' : 'none';
      if (!inCh) return;
      }

      const rev = document.querySelector('.reveal');
      const vp = document.querySelector('.reveal-viewport');
      const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
        || (vp && vp.classList.contains('reveal-scroll'))
        || (rev && rev.classList.contains('reveal-scroll'))
        || (rev && rev.scrollHeight > rev.clientHeight + 100)
        || window.innerWidth <= 768;

      let stageVal = null;

      if (isScroll) {
        const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
          : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
          : (window.scrollY || document.documentElement.scrollTop || 0));

        let max = 1;
        if (rev && rev.scrollHeight > rev.clientHeight + 10) {
          max = rev.scrollHeight - rev.clientHeight;
        } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
          max = vp.scrollHeight - vp.clientHeight;
        } else {
          const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          max = Math.max(1, docH - window.innerHeight);
        }

        const frac = Math.min(1.0, Math.max(0.0, top / max));
        stageVal = 1.0 + frac * 9.0;
      }

      if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
        const idx = window.Reveal.getIndices();
        const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
        const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
        const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
        stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
      }

      if (typeof stageVal === 'number' && !isNaN(stageVal)) {
        window.setCh4Stage(stageVal, false);
      }
    }

    if (typeof window !== 'undefined') {
      window.syncCh4WithDeck = syncCh4WithDeck;
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
      const insp = document.getElementById('ch4-node-inspector');
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
    syncCh4WithDeck();
    requestAnimationFrame(renderLoop);
    window.addEventListener('resize', resize);
        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_4 = false;
    const synBindSync_syncCh4WithDeck = () => {
      if (syncRaf_4) return;
      syncRaf_4 = true;
      requestAnimationFrame(() => {
        syncRaf_4 = false;
        syncCh4WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh4WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh4WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh4WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh4WithDeck, { passive: true });

    const revEl_syncCh4WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh4WithDeck) {
      revEl_syncCh4WithDeck.addEventListener('scroll', synBindSync_syncCh4WithDeck, { passive: true });
      revEl_syncCh4WithDeck.addEventListener('touchmove', synBindSync_syncCh4WithDeck, { passive: true });
    }
    const vpEl_syncCh4WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh4WithDeck) {
      vpEl_syncCh4WithDeck.addEventListener('scroll', synBindSync_syncCh4WithDeck, { passive: true });
      vpEl_syncCh4WithDeck.addEventListener('touchmove', synBindSync_syncCh4WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh4WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh4WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh4WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh4WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh4WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh4WithDeck);
    }
    const hud = document.getElementById('ch4-3d-hud');
    if (hud) {
      hud.querySelectorAll('input, button').forEach(el => {
        el.addEventListener('keydown', e => e.stopPropagation());
        el.addEventListener('mousedown', e => e.stopPropagation());
        el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh4Engine);
  } else {
    runCh4Engine();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 5 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
window.showGenericTab = function(prefix, idx, maxIdx, btnEl) {
  for (let i = 1; i <= maxIdx; i++) {
    const p = document.getElementById(prefix + '-' + i);
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

// WIDGET 1: §5.1.1–5.1.2 Hypermetrophor Encapsulation & Functor Hierarchy S(n+1)
window.updateEncapsulationLab = function() {
  const elEnc = document.getElementById('enc-slider');
  if (!elEnc) return;
  let pct = parseInt(elEnc.value);
  let grade = parseInt(document.getElementById('enc-grade').value);
  document.getElementById('enc-val').innerText = pct + '%';
  document.getElementById('enc-grade-val').innerText = `M^${grade}`;

  let t = pct / 100.0;
  const svg = document.getElementById('enc-svg');
  if (svg) {
    const centers = [
      { cx: 52, cy: 42, col: "#4169E1" },
      { cx: 148, cy: 42, col: "#20B2AA" },
      { cx: 100, cy: 92, col: "#FFA500" }
    ];
    let html = `<line x1="52" y1="42" x2="148" y2="42" stroke="#FFD700" stroke-width="2" stroke-dasharray="3,2"/>`;
    html += `<line x1="52" y1="42" x2="100" y2="92" stroke="#FFD700" stroke-width="2" stroke-dasharray="3,2"/>`;
    html += `<line x1="148" y1="42" x2="100" y2="92" stroke="#FFD700" stroke-width="2" stroke-dasharray="3,2"/>`;

    let rad = 22 * (1.0 - 0.78 * t);
    centers.forEach((c, idx) => {
      let p1x = c.cx + rad * Math.cos(0), p1y = c.cy + rad * Math.sin(0);
      let p2x = c.cx + rad * Math.cos(2.09), p2y = c.cy + rad * Math.sin(2.09);
      let p3x = c.cx + rad * Math.cos(4.18), p3y = c.cy + rad * Math.sin(4.18);
      if (t < 0.92) {
        html += `<polygon points="${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)} ${p3x.toFixed(1)},${p3y.toFixed(1)}" fill="none" stroke="${c.col}" stroke-width="1.8"/>`;
      }
      html += `<circle cx="${c.cx}" cy="${c.cy}" r="${(6 + 6*t).toFixed(1)}" fill="${t > 0.85 ? '#FFD700' : c.col}" stroke="#fff" stroke-width="1.5"/>`;
    });
    svg.innerHTML = html;
  }

  const box = document.getElementById('enc-readout');
  if (box) {
    let fnStr = grade === 0 ? "S1 ≡ f (Generates M⁰ ≡ yã from AP₀)" :
                `S(${grade+1}) ≡ ^${grade}f (Generates M^${grade} from Hypermetrophor ^${grade}wã ∈ Fun(Δ^op, Met_${grade-1}))`;
    box.innerHTML =
      `<b>Active Functor Tier:</b> <span style="color:#FFD700;">${fnStr}</span><br>` +
      `<b>Encapsulation (${pct}%):</b> ${pct >= 90 ? '<span style="color:#20B2AA;"><b>PROTOSIMPLEX ATOMIC LOCK:</b> Lower networks collapsed to 0D objects in CSeg(X_syn)_0!</span>' : 'Contracting internal grade-(n-1) trajectories into degenerate 1-simplices s₀(P)...'}`;
  }
};

// WIDGET 2: §5.1.4–5.1.5 Syntrokline Bridges & Metroplexdiabatik
window.setDiabatikMode = function(mode) {
  const svg = document.getElementById('diab-svg');
  const box = document.getElementById('diab-readout');
  if (!svg || !box) return;

  let html = `
    <!-- Floor T_{m-1} and Floor T_m -->
    <rect x="20" y="82" width="145" height="32" rx="5" fill="#0f1b3d" stroke="#4169E1" stroke-width="2"/>
    <text x="92" y="102" fill="#82aaff" font-size="10.5" font-weight="bold" text-anchor="middle">Floor T_{m-1} (Met_{m-1})</text>
    <rect x="235" y="15" width="165" height="98" rx="6" fill="#151c2c" stroke="#20B2AA" stroke-width="2"/>
    <text x="317" y="32" fill="#5eead4" font-size="10.5" font-weight="bold" text-anchor="middle">Associative Metroplex M^m</text>
    <rect x="250" y="78" width="135" height="24" rx="4" fill="#1e293b" stroke="#4169E1" stroke-width="1.5"/>
    <text x="317" y="94" fill="#fff" font-size="9.5" text-anchor="middle">γ = 0: Hypermetrophor Idea</text>
    <rect x="250" y="42" width="135" height="24" rx="4" fill="#2d1a04" stroke="#FFA500" stroke-width="1.5"/>
    <text x="317" y="58" fill="#FFD700" font-size="9.5" text-anchor="middle">γ > 0: Higher Syndrome</text>
  `;

  if (mode === 'in' || mode === 'loop') {
    html += `<path d="M 165,94 L 248,90" fill="none" stroke="#20B2AA" stroke-width="3.2"/>`;
    html += `<circle cx="208" cy="92" r="4.5" fill="#FFD700"/>`;
  }
  if (mode === 'out' || mode === 'loop') {
    html += `<path d="M 250,54 Q 140,45 110,80" fill="none" stroke="#DC143C" stroke-width="3.2" stroke-dasharray="4,2"/>`;
    html += `<circle cx="165" cy="56" r="4.5" fill="#DC143C"/>`;
  }
  if (mode === 'loop') {
    html += `<line x1="317" y1="78" x2="317" y2="66" stroke="#FFD700" stroke-width="3"/>`;
  }
  svg.innerHTML = html;

  if (mode === 'in') {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<b style="color:#20B2AA;">Metrophoric Diabatik (γ = 0, SM p. 103):</b> Syntroclinic lines from T_{m-1} penetrate M^m at level γ = 0, directly modulating its foundational Hypermetrophor Idea!`;
  } else if (mode === 'out') {
    box.style.borderLeftColor = "#FFA500";
    box.innerHTML = `<b style="color:#FFA500;">Syndromatic Diabatik (γ > 0, SM p. 103):</b> Internal syndrome generation at level γ > 0 emits a tectonic coupling outward into T_{m-1}!`;
  } else {
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<b style="color:#FFD700;">★ CLOSED SYNTROKLINE RÜCKKOPPELUNG (Closed Feedback Loop):</b> Combines inward Metrophoric (γ=0) and outward Syndromatic (γ>0) couplings into a self-sustaining recurrent loop!`;
  }
};

// WIDGET 3: §5.2.2 Dendroidal Corolla Grafting Explorer
window.setDendroidalStep = function(step) {
  const svg = document.getElementById('dend-svg');
  const box = document.getElementById('dend-readout');
  if (!svg || !box) return;

  if (step === 1) {
    svg.innerHTML = `
      <line x1="85" y1="18" x2="125" y2="48" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="165" y1="18" x2="125" y2="48" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="125" y1="48" x2="185" y2="88" stroke="#FFD700" stroke-width="3.8"/>
      <text x="135" y="75" fill="#FFD700" font-size="10.5" font-weight="bold">η_e</text>
      <line x1="245" y1="48" x2="185" y2="88" stroke="#FFA500" stroke-width="2.5"/>
      <line x1="185" y1="88" x2="185" y2="118" stroke="#20B2AA" stroke-width="3.2"/>
      <circle cx="125" cy="48" r="14" fill="#1e293b" stroke="#4169E1" stroke-width="2.2"/>
      <text x="125" y="52" fill="#82aaff" font-size="10" font-weight="bold" text-anchor="middle">C₂^(u)</text>
      <circle cx="185" cy="88" r="14" fill="#2d1a04" stroke="#FFA500" stroke-width="2.2"/>
      <text x="185" y="92" fill="#FFD700" font-size="10" font-weight="bold" text-anchor="middle">C₂^(v)</text>
    `;
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<b>1. Dendroidal Segal Equivalence (Prop. 5.3):</b> X(T) xrightarrow{~} X(C₂^(v)) ×^h_{X(η_e)} X(C₂^(u)). Compatible binary operations determine a point of X(T) uniquely up to a contractible space of choices!`;
  } else if (step === 2) {
    svg.innerHTML = `
      <line x1="130" y1="20" x2="210" y2="72" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="210" y1="20" x2="210" y2="72" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="290" y1="20" x2="210" y2="72" stroke="#FFA500" stroke-width="2.5"/>
      <line x1="210" y1="72" x2="210" y2="116" stroke="#FFD700" stroke-width="3.5"/>
      <circle cx="210" cy="72" r="18" fill="#2d1a04" stroke="#FFD700" stroke-width="2.5"/>
      <text x="210" y="76" fill="#FFD700" font-size="11" font-weight="bold" text-anchor="middle">C₃</text>
      <text x="315" y="76" fill="#5eead4" font-size="10.5" font-weight="bold">∂_{η_e}^* : X(T) → X(C₃)</text>
    `;
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<b>2. Inner-Edge Contraction ∂_{η_e}:</b> Contracting inner edge η_e maps C₃ ↪ T in Ω, inducing the ternary composite operation ∂_{η_e}^* : X(T) → X(C₃) in X_syn!`;
  } else {
    svg.innerHTML = `
      <rect x="45" y="32" width="125" height="55" rx="6" fill="#0f1b3d" stroke="#4169E1" stroke-width="2"/>
      <text x="107" y="56" fill="#82aaff" font-size="10.5" font-weight="bold" text-anchor="middle">(w ∘₁ v) ∘₁ u</text>
      <text x="107" y="74" fill="#cbd5e1" font-size="9" text-anchor="middle">Left Graft Order</text>
      <path d="M 175,58 L 245,58" stroke="#FFD700" stroke-width="3"/>
      <text x="210" y="48" fill="#FFD700" font-size="11" font-weight="bold" text-anchor="middle">≃ X(T₃)</text>
      <rect x="250" y="32" width="125" height="55" rx="6" fill="#151c2c" stroke="#20B2AA" stroke-width="2"/>
      <text x="312" y="56" fill="#5eead4" font-size="10.5" font-weight="bold" text-anchor="middle">w ∘₁ (v ∘₂ u)</text>
      <text x="312" y="74" fill="#cbd5e1" font-size="9" text-anchor="middle">Right Graft Order</text>
    `;
    box.style.borderLeftColor = "#9370DB";
    box.innerHTML = `<b>3. Coherent Associativity Homotopy:</b> Applying the dendroidal Segal equivalence to a 3-vertex tree T₃ identifies both iterated composites with X(T₃), supplying the canonical associativity homotopy!`;
  }
};

// WIDGET 4: §5.3.3 Postnikov Homotopy Contraction
window.updatePostnikov = function() {
  const elM = document.getElementById('post-m');
  if (!elM) return;
  let m = parseInt(elM.value);
  let lbl = document.getElementById('post-m-val');
  let path = document.getElementById('post-path');
  let pt0 = document.getElementById('post-pt0');
  let box = document.getElementById('post-readout');

  if (m === 0) {
    lbl.innerText = "m = 0";
    path.setAttribute('d', '');
    pt0.setAttribute('opacity', '1');
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>0-Truncation τ_{≤0} X ≃ π₀(X) (Set Collapse, §5.5.2):</b></span><br>` +
      `All higher homotopy groups vanish (π_{k≥1} = 0). Collapses the homotopy type to its discrete sheaf of connected components!`;
  } else {
    pt0.setAttribute('opacity', '0');
    lbl.innerText = (m === 3) ? "m = ∞" : `m = ${m}`;
    let amp = (m === 1) ? 0.0 : (m === 2 ? 7.5 : 18.0);
    let freq = (m === 2) ? 6 : 14;
    let pts = [];
    for (let i = 0; i <= 120; i++) {
      let t = (i / 120.0) * 2.0 * Math.PI;
      let rx = 90 + amp * Math.sin(freq * t);
      let ry = 50 + amp * Math.cos(freq * t);
      let x = 210 + rx * Math.cos(t);
      let y = 72 + ry * Math.sin(t);
      pts.push((i === 0 ? "M " : "L ") + x.toFixed(1) + "," + y.toFixed(1));
    }
    pts.push("Z");
    path.setAttribute('d', pts.join(" "));
    path.setAttribute('stroke', m === 1 ? "#20B2AA" : (m === 2 ? "#FFA500" : "#DC143C"));

    if (m === 1) {
      box.style.borderLeftColor = "#20B2AA";
      box.innerHTML = `<span style="color:#20B2AA;"><b>1-Truncation τ_{≤1} X (Fundamental Groupoid):</b></span><br>` +
        `Preserves π₀(X) and fundamental group loops π₁(X), while extinguishing all higher homotopy noise (π_{k≥2} = 0)!`;
    } else if (m === 2) {
      box.style.borderLeftColor = "#FFA500";
      box.innerHTML = `<span style="color:#FFA500;"><b>2-Truncation τ_{≤2} X (2-Type Approximation):</b></span><br>` +
        `Retains π₀, π₁, and 2-dimensional surface homotopy π₂(X); filters out all k ≥ 3 fluctuations.`;
    } else {
      box.style.borderLeftColor = "#DC143C";
      box.innerHTML = `<span style="color:#ff6b81;"><b>Untruncated Object X ∈ X_syn (Full ∞-Groupoid):</b></span><br>` +
        `Contains arbitrarily high microscopic homotopy fluctuations π_k(X) across all degrees k ≥ 1.`;
    }
  }
};

// WIDGET 5: §5.3.4 Bisimplicial Tectonic Grid
window.setTectMode = function(mode) {
  let svg = document.getElementById('tect-svg');
  let box = document.getElementById('tect-readout');
  if (!svg || !box) return;
  let html = '';

  for (let p = 0; p < 4; p++) {
    for (let q = 0; q < 4; q++) {
      let x = 75 + p * 90;
      let y = 142 - q * 38;
      if (p < 3) {
        let col = (mode === 'syn') ? '#4169E1' : '#2d3748';
        let w = (mode === 'syn') ? 3.2 : 1.5;
        html += `<line x1="${x}" y1="${y}" x2="${x+90}" y2="${y}" stroke="${col}" stroke-width="${w}"/>`;
      }
      if (q < 3) {
        let col = (mode === 'grad') ? '#20B2AA' : '#2d3748';
        let w = (mode === 'grad') ? 3.2 : 1.5;
        html += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y-38}" stroke="${col}" stroke-width="${w}"/>`;
      }
    }
  }

  if (mode === 'diag') {
    html += `<line x1="75" y1="142" x2="345" y2="28" stroke="#FFD700" stroke-width="4"/>`;
  }

  for (let p = 0; p < 4; p++) {
    for (let q = 0; q < 4; q++) {
      let x = 75 + p * 90;
      let y = 142 - q * 38;
      let isDiag = (p === q);
      let fill = '#1e293b';
      let stroke = '#4169E1';
      let r = 12;
      if (mode === 'diag' && isDiag) { fill = '#FFD700'; stroke = '#fff'; r = 15; }
      else if (mode === 'syn') { fill = '#4169E1'; stroke = '#fff'; }
      else if (mode === 'grad') { fill = '#20B2AA'; stroke = '#fff'; }

      let txtCol = (mode === 'diag' && isDiag) ? '#000' : '#fff';
      html += `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
      html += `<text x="${x}" y="${y+3.5}" text-anchor="middle" fill="${txtCol}" font-size="9.5" font-weight="bold">S_${p},${q}</text>`;
    }
  }

  svg.innerHTML = html;
  if (mode === 'diag') {
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>Diagonal Realization |Tect(S)|_Δ (Thm. 5.13):</b></span> colim_{Δ^op}(diag* Tect(S)) ≃ colim_{Δ^op × Δ^op} S_{p,q} unifies vertical and horizontal tectonics!`;
  } else if (mode === 'syn') {
    box.style.borderLeftColor = "#4169E1";
    box.innerHTML = `<span style="color:#82aaff;"><b>Horizontal Axis Syn_• (d_i^h):</b></span> Syndromatische Tektonik—within-grade syndrome layers generated by operadic composition ^k f.`;
  } else {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<span style="color:#5eead4;"><b>Vertical Axis Gr_• (d_j^v):</b></span> Graduelle Tektonik—nested compositional filtration across associated lower Metroplex grades 0 ≤ p ≤ n-1.`;
  }
};

// WIDGET 6: §5.3.4–5.3.5 Cohesion & Dold-Kan Tab Switcher
window.showCohesionTab = function(idx, btnEl) {
  for (let i = 1; i <= 4; i++) {
    const p = document.getElementById('coh-pane-' + i);
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

// WIDGET 7: §5.3.5 Tectonic Spectral Sequence E^r_{p,q}
window.setSpecPage = function(r) {
  let d2 = document.getElementById('ss-d2');
  let d3 = document.getElementById('ss-d3');
  let box = document.getElementById('ss-readout');
  if (!d2 || !d3 || !box) return;

  if (r === 2) {
    d2.setAttribute('opacity', '1');
    d3.setAttribute('opacity', '0');
    box.style.borderLeftColor = "#DC143C";
    box.innerHTML = `<span style="color:#ff6b81;"><b>E²-Page Active (d² : E²_{p,q} → E²_{p-2, q+1} ≠ 0):</b></span> First-order <b>Metroplexdiabatik</b>—a grade-p structure injects a non-trivial boundary 2 grades down into syndrome level q + 1!`;
  } else if (r === 3) {
    d2.setAttribute('opacity', '0.2');
    d3.setAttribute('opacity', '1');
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>E³-Page Active (d³ : E³_{3,0} → E³_{0,2} ≠ 0):</b></span> Deep cross-scale <b>Metroplexdiabatik</b>—transgressing 3 vertical Metroplex grades into syndrome level q + 2!`;
  } else {
    d2.setAttribute('opacity', '0');
    d3.setAttribute('opacity', '0');
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<span style="color:#20B2AA;"><b>Adiabatic Decoupled Limit (d^r ≡ 0 for all r ≥ 2):</b></span> Spectral sequence degenerates at E² = E^∞; scales evolve without cross-grade diabatic feedback.`;
  }
};

// WIDGET 8: §5.3.7 Endogenous Grade-Admissibility (SM Eq. 26)
window.updateENLab = function() {
  const elN = document.getElementById('en-n');
  if (!elN) return;
  let n = parseInt(elN.value);
  let p = parseInt(document.getElementById('en-p').value);
  let q = parseInt(document.getElementById('en-q').value);
  document.getElementById('en-n-val').innerText = n;
  document.getElementById('en-p-val').innerText = p;
  document.getElementById('en-q-val').innerText = q;

  let sum = p + q;
  let box = document.getElementById('en-readout');

  if (q <= 0) {
    box.style.borderLeftColor = "#DC143C";
    box.innerHTML = `<span style="color:#ff6b81;"><b>✗ VIOLATES POSITIVITY (q = ${q} ≤ 0):</b></span> SM Eq. 26 and Lean 4 <code>pos_shift : 0 &lt; q</code> require strictly positive shift grade q &gt; 0!`;
  } else if (sum > n) {
    box.style.borderLeftColor = "#DC143C";
    box.innerHTML = `<span style="color:#ff6b81;"><b>✗ VIOLATES GRADE BOUND (p + q = ${sum} &gt; n = ${n}):</b></span> Exceeds ambient Metroplex grade n; triggers recursive grade runaway!`;
  } else if (sum === n) {
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>✓ EXACT ENDOGENOUS SYNTHESIS (p + q = ${sum} = n, q = ${q} &gt; 0):</b></span><br>` +
      `Activates <b>SynEN_{${p},${q}}^{${n}} : Met_${p} × Met_${q} → Met_${n}</b> (and <b>AbsEN_${n}^{${sum}}</b>)!`;
  } else {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<span style="color:#20B2AA;"><b>✓ ADMISSIBLE TECTONIC ABSORPTION (p + q = ${sum} &lt; n = ${n}, q = ${q} &gt; 0):</b></span><br>` +
      `Satisfies Lean 4 <code>EndogenousAdmissible ${n} ${p} ${q}</code>; activates <b>AbsEN_${n}^{${sum}} : Met_${n} × Met_${sum} → Met_${n}</b>!`;
  }
};

// ---------------------------------------------------------------------------
// VIDEO CONTROL: play Manim clips only while their slide is visible
// ---------------------------------------------------------------------------
function prepareVideos() {
  document.querySelectorAll('video').forEach(v => {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = 'auto';
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('muted', '');
    v.setAttribute('loop', '');
    v.setAttribute('preload', 'auto');
  });
}

function syncVideosToSlide() {
  const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
    || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
    || window.innerWidth <= 768;

  const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
  const winH = window.innerHeight || document.documentElement.clientHeight;
  const winW = window.innerWidth || document.documentElement.clientWidth;

  document.querySelectorAll('video').forEach(v => {
    let shouldPlay = false;
    if (isScroll) {
      const rect = v.getBoundingClientRect();
      const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
      shouldPlay = inView;
    } else {
      shouldPlay = current ? current.contains(v) : true;
    }

    if (shouldPlay) {
      v.muted = true;
      v.playsInline = true;
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } else if (!v.paused) {
      v.pause();
    }
  });
}

// Ensure continuous sync on mobile scroll and touch gestures
if (typeof window !== 'undefined') {
  window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
  window.__syn_video_sync_handlers.push(syncVideosToSlide);
  if (!window.__syn_video_scroll_hooked) {
    window.__syn_video_scroll_hooked = true;
    const runSync = () => {
      (window.__syn_video_sync_handlers || []).forEach(fn => {
        try { fn(); } catch (_) {}
      });
    };
    window.addEventListener('scroll', runSync, { passive: true });
    window.addEventListener('touchmove', runSync, { passive: true });
    window.addEventListener('resize', runSync, { passive: true });
    let synMediaUnlocked = false;
    function synUnlockMedia() {
      if (synMediaUnlocked) return;
      synMediaUnlocked = true;
      runSync();
    }
    document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
    document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
  }
}

// ---------------------------------------------------------------------------
// WIDGET WIRING (runs once; slide changes no longer reset widget state)
// ---------------------------------------------------------------------------
function renderAllCh5Widgets() {
  window.updateEncapsulationLab();
  window.setDiabatikMode('loop');
  window.setDendroidalStep(1);
  window.updatePostnikov();
  window.setTectMode('diag');
  window.setSpecPage(2);
  window.updateENLab();
}

function bindControlsOnce() {
  document.querySelectorAll('input[type="range"], select, button').forEach(el => {
    if (el.dataset.synBound) return;
    el.dataset.synBound = '1';
    el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());
  });
}

let synInitialised = false;
function initChapter5() {
  if (synInitialised) return;
  synInitialised = true;
  prepareVideos();
  bindControlsOnce();
  renderAllCh5Widgets();
  syncVideosToSlide();
}

if (window.Reveal && window.Reveal.on) {
  window.Reveal.on('ready', initChapter5);
  window.Reveal.on('slidechanged', syncVideosToSlide);
  window.Reveal.on('fragmentshown', syncVideosToSlide);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter5();
  });
} else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
  initChapter5();
}

// =========================================================================
// CHAPTER 5: 60FPS 3D INTERACTIVE (∞,1)-TOPOS, DENDROIDAL COMPLETE SEGAL SPACE & TECTONIC ENGINE
// =========================================================================

const CH5_3D_STYLE = `
#ch5-3d-hud {
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

#ch5-3d-hud *, #ch5-3d-hud *::before, #ch5-3d-hud *::after {
  box-sizing: border-box;
}

#ch5-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch5-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch5-3d-hud.minimized .ch5-hud-body {
  display: none;
}

.ch5-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch5-hud-title {
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

.ch5-hud-title span:first-child {
  line-height: 1.15;
}

.ch5-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch5-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch5-hud-btn {
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

.ch5-hud-btn:hover, .ch5-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch5-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch5-canvas-wrap:active {
  cursor: grabbing;
}

#ch5-3d-hud.spotlight .ch5-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch5-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch5-overlay-bar {
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

.ch5-telemetry {
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

#ch5-node-inspector {
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

.ch5-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch5-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch5-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch5-scrubber .ch5-hud-btn {
  flex-shrink: 0;
}

#ch5-caption {
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
  #ch5-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch5-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch5-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch5-hud-controls {
    gap: 3px;
  }
  .ch5-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch5-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch5-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch5-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch5-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch5-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch5-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch5-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch5-hud-controls {
    gap: 3px;
  }
  .ch5-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch5-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch5-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch5-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch5-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch5-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch5-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch5-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH5_3D_HTML = `
<div class="ch5-hud-header">

    <div class="ch5-hud-title">

      <span>🏛️ Ch 5 · 3D (∞,1)-Metroplex Engine</span>

      <span id="ch5-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch5-hud-controls">

      <button class="ch5-hud-btn active" id="ch5-btn-orbit" onclick="toggleCh5Orbit()">⟳ Orbit</button>

      <button class="ch5-hud-btn" onclick="toggleCh5Spotlight()">⛶ Spotlight</button>

      <button class="ch5-hud-btn" id="ch5-btn-min" onclick="toggleCh5Minimize()">+</button>

    </div>

  </div>



  <div class="ch5-hud-body">

    <div class="ch5-canvas-wrap" id="ch5-canvas-wrap">

      <canvas id="ch5-3d-canvas"></canvas>

      <div class="ch5-overlay-bar">

        <div class="ch5-telemetry" id="ch5-telemetry">𝒳_syn = Sh_∞(Ctx, J_syn)</div>

        <div id="ch5-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch5-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <button class="ch5-hud-btn" title="Previous Stage" onclick="window.setCh5Stage(Math.round( parseFloat(document.getElementById('ch5-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch5-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh5Stage(this.value)">
      <button class="ch5-hud-btn" title="Next Stage" onclick="window.setCh5Stage(Math.round( parseFloat(document.getElementById('ch5-slider').value) ) + 1, true)">▶</button>

      <button class="ch5-hud-btn active" id="ch5-btn-sync" onclick="enableCh5Sync()">Auto-Sync</button>

    </div>



    <div id="ch5-caption">

      <b>Stage 1 (§5.1.1 — SM-20):</b> Encapsulating Grade-0 Syntrix networks into 0D Hypermetrophor atoms inside Hypersyntrix ¹M.

    </div>

  </div>
`;

function injectCh53DHUD() {
  if (document.getElementById('ch5-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH5_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch5-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH5_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch5_3d_engine_loaded) return;
  window.__ch5_3d_engine_loaded = true;

  function runCh5Engine() {
    injectCh53DHUD();
    if (window.__ch5_3d_engine_initialized) return;
    window.__ch5_3d_engine_initialized = true;

const canvas = document.getElementById('ch5-3d-canvas');

  const wrap = document.getElementById('ch5-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.52;

  let camPitch = 0.35;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§5.1.1 — SM-20 Hypersyntrix ¹M):</b> Grade-0 Syntrix networks contract into 0D Hypermetrophor atoms ¹wã = (yã_i)_N.",

    2: "<b>Stage 2 (§5.1.2–5.1.3 — SM-21–24 Functor Hierarchy S(n+1)):</b> 4-Grade Transcendence Tower (M⁰ → M¹ → M² → M³) &amp; Duale Tektonik.",

    3: "<b>Stage 3 (§5.1.4–5.1.5 — SM-25a Syntrokline Brücken &amp; Diabatik):</b> Cross-grade elevator bridges ^{n+N}α &amp; closed Syntrokline Rückkoppelung.",

    4: "<b>Stage 4 (§5.2.1 — Def. 5.1 Ambient (∞,1)-Topos 𝒳_syn):</b> Cumulative universes U₀ ∈ U₁ ∈ U₂ housing all Metroplex grades without size paradoxes.",

    5: "<b>Stage 5 (§5.2.2–5.2.3 — Prop. 5.3 Dendroidal Segal Grafting):</b> Binary corollas C₂^(v) ∘_e C₂^(u) contract along inner edge η_e to ternary C₃.",

    6: "<b>Stage 6 (§5.3.1 — Defs. 5.5–5.6 Simplicial Hypermetrophor H_n):</b> Internal category nerve: 0-simplices S₁⊔S₂, 1-simplex Kor(S₁,S₂), 2-simplex C₂.",

    7: "<b>Stage 7 (§5.3.2–5.3.3 — Props. 5.8 &amp; 5.10 Bridge &amp; Postnikov τ_{≤m}):</b> Postnikov filter strips higher homotopy ripples π_k (k > m) to smooth core.",

    8: "<b>Stage 8 (§5.3.4 — Thm. 5.13 Bisimplicial Tectonic Grid):</b> 4×4 grid Tect(S)_{p,q} pierced by golden diagonal realization |Tect(S)|_Δ &amp; R_Ban.",

    9: "<b>Stage 9 (§5.3.5 — Thm. 5.15 Cohesive Modalities &amp; Spectral Sequence):</b> Transgression beams d² : E²_{p,q} → E²_{p-2,q+1} &amp; d³ (Metroplexdiabatik)!",

    10: "<b>Stage 10 (§5.3.6–5.6 — Defs. 5.16–5.18 Slice Totality T_n &amp; EN-Product):</b> Protosimplexe 𝒫 in T_n = Met_n/G_n &amp; Endogenous operator Syn_{p,q}^n (p+q≤n)."

  };



  const STAGE_TELEMETRY = {

    1: "¹M ã ≡ ⟨⟨F, ã⟩ r⟩ | ¹wã ≡ (yã_i)_N (SM-20)",

    2: "S(n+1) ≡ ⁿf : Met_n → Met_{n+1} (SM-24)",

    3: "Bridge ^{n+N}α | EN-Rule: p+q ≤ n, q > 0",

    4: "𝒳_syn = L_{J_syn} Fun(Ctx^op, 𝒮_{U₀})",

    5: "X(T) ≃ X(C₂^(v)) ×^h_{X(η_e)} X(C₂^(u))",

    6: "HypMet_n = colim_{Δ^op} (U_{n-1} ∘ H_n)",

    7: "B_{n,n+N} ⊣ R_{n+N,n} | τ_{≤m} ⊣ ι_m",

    8: "|Tect(S)|_Δ = colim_{Δ^op} diag* Tect(S)",

    9: "∫ ⊣ ♭ ⊣ ♯ | d^r : E^r_{p,q} → E^r_{p-r,q+r-1}",

    10: "T_n = Met_n(𝒳_syn)/G_n | Protosimplex 𝒫"

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



  // =========================================================================

  // STAGE RENDERERS (STAGES 1 TO 10)

  // =========================================================================



  // Stage 1: Encapsulating Grade-0 Syntrix Networks into 0D Hypermetrophor Atoms (SM-20)

  function renderStage1(w, h) {

    const enc = 0.5 + 0.45 * Math.sin(timeSec * 1.6); // Pulsing encapsulation factor [0.05, 0.95]

    const pApex = drawNode3D("M1_Apex", 0, 0, 1.15, 11, "#FFD700", "#FFA500", "¹M (Hypersyntrix)", "Grade-1 Hypersyntrix ¹M correlating N encapsulated base Syntrices (SM Eq. 20)", w, h);



    for (let k = 0; k < 3; k++) {

      const ang = (k / 3) * Math.PI * 2 + timeSec * 0.35;

      const cx = 1.05 * Math.cos(ang), cy = 1.05 * Math.sin(ang), cz = -0.55;

      const spread = 0.45 * (1 - enc);

      // Mini 3-node Grade-0 Syntrix sub-network contracting into a 0D Protosimplex atom

      const sub = [0, 1, 2].map(j => {

        const sa = ang + (j / 3) * Math.PI * 2;

        return proj(cx + spread * Math.cos(sa), cy + spread * Math.sin(sa), cz - 0.25 * (1 - enc), w, h);

      });

      sub.forEach((p, j) => drawLine3D(p, sub[(j + 1) % 3], "rgba(65,105,225,0.6)", 1.6));

      const pAtom = drawNode3D(

        "Atom_" + k, cx, cy, cz, 6.5 + 3.5 * enc, "#20B2AA", "#FFD700",

        `yã_${k+1} ∈ ¹wã`,

        `Encapsulated Grade-0 Syntrix yã_${k+1}: Contracts into a 0D object of Hypermetrophor ¹wã`, w, h

      );

      drawLine3D(pAtom, pApex, "#FFD700", 2.4);

    }

  }



  // Stage 2 & 3: 4-Grade Transcendence Tower S(n+1), Syntrokline Bridges & Metroplexdiabatik

  function renderStage2And3(w, h, st) {

    const isStage3 = (st >= 2.5);

    const floors = [

      { z: -1.15, col: "#4169E1", lbl: "T₀: M⁰ (Syntrices, S1)", id: "T0" },

      { z: -0.38, col: "#20B2AA", lbl: "T₁: M¹ (Hypersyntrices, S2)", id: "T1" },

      { z:  0.38, col: "#FFA500", lbl: "T₂: M² (Grade-2 Metroplex, S3)", id: "T2" },

      { z:  1.15, col: "#FFD700", lbl: "T₃: M³ (Grade-n Metroplex, S(n+1))", id: "T3" }

    ];

    floors.forEach((fl, idx) => {

      const r = 1.28 - idx * 0.16;

      ctx.beginPath();

      ctx.strokeStyle = fl.col;

      ctx.lineWidth = 2.2;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const p = proj(r * Math.cos(a), r * Math.sin(a), fl.z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      drawNode3D(fl.id, 0, 0, fl.z, 8, fl.col, "#fff", fl.lbl, `Metroplextotality Floor ${fl.lbl} (SM Eqs. 21–25a)`, w, h);

    });



    // Stage 3: Syntrokline Elevator Bridges ^{n+N}\alpha & Closed Diabatik Loop

    if (isStage3) {

      const pB0 = proj(-1.1, 0, -1.15, w, h);

      const pB3 = proj(-0.65, 0, 1.15, w, h);

      drawLine3D(pB0, pB3, "#20B2AA", 3.2);

      drawNode3D("Br_Up", -0.88, 0, 0.0, 7, "#20B2AA", "#FFD700", "^{n+N}α ↑ (Bridge)", "Syntrokline Metroplexbrücke lifting lower-grade syndromes across N floors (SM-25a)", w, h);



      // Crimson Closed Feedback Loop (Syntrokline Rückkoppelung) on right side

      const pR2 = proj(0.95, 0, 0.38, w, h);

      const pR1 = proj(1.12, 0, -0.38, w, h);

      drawLine3D(pR2, pR1, "#DC143C", 3.2, [4, 2]);

      drawNode3D("Diab_Loop", 1.05, 0, 0.0, 7, "#DC143C", "#FFD700", "↻ Rückkoppelung", "Closed Metroplexdiabatik Feedback Loop T_m ⇄ T_{m-1} (SM p. 103)", w, h);
      drawNode3D("Cohes_Quad", 0.0, 1.15, 0.65, 8, "#FFD700", "#20B2AA", "Π_disc ⊣ Disc ⊣ Γ_glob ⊣ Codisc", "Lawvere–Schreiber Cohesive (∞,1)-Topos Adjoint Quadruple governing Syntrokline Bridges!", w, h);

    }

  }



  // Stage 4: Cumulative Grothendieck Universe Shells U_0 \in U_1 \in U_2 in \mathcal{X}_{syn}

  function renderStage4(w, h) {

    const shells = [

      { r: 0.52, col: "#20B2AA", id: "Univ_U0", lbl: "U₀: Internal M^n ∈ Met_n", info: "Small Universe U₀: Site Ctx_adm^sk and all internal Metroplex objects M^n remain U₀-small" },

      { r: 0.98, col: "#4169E1", id: "Univ_U1", lbl: "U₁: Ambient Topos 𝒳_syn", info: "Ambient Universe U₁: Houses (∞,1)-topos 𝒳_syn = Sh_∞(Ctx, J_syn) & categories Met_n(𝒳_syn)" },

      { r: 1.42, col: "#FFD700", id: "Univ_U2", lbl: "U₂: Meta-Slice Fun(Δ^op, Met_n)", info: "Meta-Universe U₂: Houses external simplicial functor categories & meta-totalities T_n^ext" }

    ];

    shells.forEach((sh, idx) => {

      ctx.beginPath();

      ctx.strokeStyle = sh.col;

      ctx.lineWidth = 2.0;

      ctx.setLineDash(idx === 2 ? [5, 3] : []);

      for (let i = 0; i <= 44; i++) {

        const a = (i / 44) * Math.PI * 2;

        const p = proj(sh.r * Math.cos(a), sh.r * Math.sin(a), 0.25 * Math.sin(a * 2 + timeSec + idx), w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      ctx.setLineDash([]);

      drawNode3D(sh.id, sh.r * Math.cos(idx * 2.1), sh.r * Math.sin(idx * 2.1), 0, 8, sh.col, "#fff", sh.lbl, sh.info, w, h);

    });

  }



  // Stage 5: Dendroidal Complete Segal Space dCSeg(\mathcal{X}_{syn}) & Corolla Grafting (Prop. 5.3)

  function renderStage5(w, h) {

    // Lower Binary Corolla C_2^{(u)} grafted via inner edge \eta_e into Upper Binary Corolla C_2^{(v)}

    const vNode = drawNode3D("Cor_v", 0.25, 0, -0.35, 9, "#4169E1", "#fff", "C₂^(v)", "Lower Binary 2-Corolla v ∈ V(T) in Moerdijk–Weiss Category Ω", w, h);

    const uNode = drawNode3D("Cor_u", -0.35, 0, 0.45, 9, "#20B2AA", "#fff", "C₂^(u)", "Upper Binary 2-Corolla u ∈ V(T) grafted along inner edge η_e", w, h);

    drawLine3D(vNode, uNode, "#FFD700", 3.5);

    drawNode3D("Inner_e", -0.05, 0, 0.05, 6.5, "#FFD700", "#DC143C", "η_e (∂_{η_e}^* → C₃)", "Inner Edge η_e: Contraction ∂_{η_e} composes (v, u) ↦ v ∘_e u ∈ X(C₃) (Prop. 5.3)", w, h);



    // 3 Input Leaves and 1 Root Output

    const l1 = drawNode3D("Leaf_1", -1.15, -0.5, 1.05, 6, "#FFA500", "#fff", "in₁", "Leaf 1 of Composite Ternary Corolla C₃", w, h);

    const l2 = drawNode3D("Leaf_2", -0.15,  0.6, 1.15, 6, "#FFA500", "#fff", "in₂", "Leaf 2 of Composite Ternary Corolla C₃", w, h);

    const l3 = drawNode3D("Leaf_3",  1.05,  0.4, 0.35, 6, "#FFA500", "#fff", "in₃", "Leaf 3 of Composite Ternary Corolla C₃", w, h);

    const rt = drawNode3D("Root_T",  0.25,  0.0, -1.15, 7.5, "#FFD700", "#fff", "Root(T)", "Output Root of Grafted Dendroidal Tree T ∈ Ω", w, h);

    drawLine3D(l1, uNode, "#20B2AA", 2.2);

    drawLine3D(l2, uNode, "#20B2AA", 2.2);

    drawLine3D(l3, vNode, "#4169E1", 2.2);

    drawLine3D(vNode, rt, "#FFD700", 2.8);

  }



  // Stage 6 & 7: Simplicial Hypermetrophor Nerve & Postnikov Homotopy Filter \tau_{\le m}

  function renderStage6And7(w, h, st) {

    const isStage7 = (st >= 6.5);

    // 3D Surface with high-frequency homotopy ripples that flatten under Postnikov truncation

    const rippleAmp = isStage7 ? 0.06 + 0.32 * Math.max(0, Math.sin(timeSec * 1.4)) : 0.35;

    for (let u = -1.35; u <= 1.36; u += 0.45) {

      ctx.beginPath();

      ctx.strokeStyle = isStage7 ? "rgba(147,112,219,0.65)" : "rgba(65,105,225,0.45)";

      ctx.lineWidth = 1.6;

      for (let v = -1.1; v <= 1.11; v += 0.15) {

        const z = -0.55 + rippleAmp * Math.sin(u * 5 + timeSec * 3) * Math.cos(v * 5);

        const p = proj(u, v, z, w, h);

        if (v === -1.1) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    // Simplicial Nerve Triangle [2]: C_2 \cong C_1 \times_{C_0} C_1 above

    const s0 = drawNode3D("Seg_0", -1.0, -0.5, 0.65, 8, "#4169E1", "#fff", "S₁ ∈ C₀", "0-Simplex Object S₁ in Complete Segal Space CSeg(𝒳_syn)", w, h);

    const s1 = drawNode3D("Seg_1",  1.0, -0.5, 0.65, 8, "#20B2AA", "#fff", "S₂ ∈ C₀", "0-Simplex Object S₂ in Complete Segal Space CSeg(𝒳_syn)", w, h);

    const s2 = drawNode3D("Seg_2",  0.0,  0.8, 0.95, 9, "#FFD700", "#FFA500", isStage7 ? "τ_{≤m}X (Postnikov)" : "C₂ ≃ C₁×_{C₀}C₁", isStage7 ? "Postnikov Contraction κ_model = τ_{≤m} killing π_k for k > m (Prop. 5.10)" : "2-Simplex Segal Composition Witness in H_n : Δ^op → Met_{n-1}", w, h);

    drawLine3D(s0, s1, "#20B2AA", 2.5);

    drawLine3D(s1, s2, "#FFD700", 2.5);

    drawLine3D(s0, s2, "#FFA500", 2.5, [4, 2]);

  }



  // Stage 8 & 9: 3D 4x4 Bisimplicial Tectonic Grid, Diagonal Ray & Spectral Sequence d^2, d^3 Beams

  function renderStage8And9(w, h, st) {

    const isStage9 = (st >= 8.5);

    const grid = [];

    for (let p = 0; p < 4; p++) {

      grid[p] = [];

      for (let q = 0; q < 4; q++) {

        const x = (p - 1.5) * 0.78;

        const y = (q - 1.5) * 0.65;

        const z = (p + q - 3) * 0.32;

        const isDiag = (p === q);

        grid[p][q] = drawNode3D(

          `Tect_${p}_${q}`, x, y, z, isDiag ? 7.5 : 4.8,

          isDiag ? "#FFD700" : "#20B2AA", "#fff",

          isDiag ? `S_${p},${p}` : "",

          `Bisimplicial Tectonic Cell Tect(S)_{${p},${q}} (Grade p=${p}, Syndrome q=${q})`, w, h

        );

        if (p > 0) drawLine3D(grid[p - 1][q], grid[p][q], "rgba(65,105,225,0.45)", 1.3);

        if (q > 0) drawLine3D(grid[p][q - 1], grid[p][q], "rgba(32,178,170,0.45)", 1.3);

      }

    }

    // Golden Diagonal Simplicial Realization Ray |Tect(S)|_\Delta (Thm. 5.13)

    for (let k = 0; k < 3; k++) {

      drawLine3D(grid[k][k], grid[k + 1][k + 1], "#FFD700", 3.4);

    }



    // Stage 9: Tectonic Spectral Sequence Transgression Beams d^2 : (p,q) -> (p-2, q+1) & d^3 : (3,0) -> (0,2)

    if (isStage9) {

      drawLine3D(grid[2][0], grid[0][1], "#DC143C", 3.0);

      drawLine3D(grid[3][0], grid[1][1], "#DC143C", 3.0);

      drawLine3D(grid[3][1], grid[1][2], "#DC143C", 3.0);

      drawLine3D(grid[3][0], grid[0][2], "#FFA500", 3.2, [4, 2]);

      drawNode3D("Spec_d2", grid[1][1].sx ? 0 : 0, -0.6, 0.95, 8.5, "#DC143C", "#FFD700", "d² : E²_{p,q} → E²_{p−2,q+1}", "Thm. 5.15 Spectral Differential d^r ≠ 0: Homological Metroplexdiabatik & Downward Constraint!", w, h);
      drawNode3D("Hol_Obst", 0, 0.85, 0.95, 8.5, "#FFD700", "#DC143C", "[F_∇] ≠ 0 ∈ H²_dR (g^(t+1))", "Non-Trivial Curvature Obstruction & Metric Feedback Loop g^(t+1) = g^(t) + η Sym(d^r* ∘ d^r)!", w, h);

    }

  }



  // Stage 10: Slice Totality T_n = Met_n / G_n, Protosimplexe \mathcal{P} & EN-Product (p+q <= n)

  function renderStage10(w, h) {

    const pGn = drawNode3D("Blue_Gn", 0, 0, -1.1, 10.5, "#FFD700", "#FFA500", "Blueprint G_n (id_{G_n})", "Terminal Slice Object id_{G_n} : G_n → G_n in State Totality T_n = Met_n / G_n (Def. 5.16)", w, h);

    const pNull = drawNode3D("Null_M0", -1.25, -0.5, 0.2, 7.5, "#64748b", "#fff", "ⁿM₀ (Nullmetroplex)", "Initial Slice Object 0_n → G_n modeling structural exhaustion", w, h);

    const pProto1 = drawNode3D("Proto_1", -0.35, 0.75, 0.35, 8.5, "#20B2AA", "#FFD700", "Protosimplex 𝒫_p", "Augmented Subobject-Minimal Object 𝒫_p ∈ T_n (No proper non-trivial subalgebras, Def. 5.17)", w, h);

    const pProto2 = drawNode3D("Proto_2",  0.85, 0.55, 0.35, 8.5, "#4169E1", "#FFD700", "Metroplex M^{p+q}", "Secondary Factor of Grade p+q ≤ n (q > 0) for Endogenous Combination", w, h);

    const pEN = drawNode3D("EN_Out", 0.25, 0, 1.15, 10, "#FFA500", "#fff", "M^n EN M^{p+q} (SM-26)", "Endogenous Combination Operator Syn_{p,q}^n / Abs_n^{p+q} (p+q ≤ n prevents runaway, Def. 5.18)", w, h);



    drawLine3D(pNull, pGn, "rgba(148,163,184,0.6)", 1.8, [3, 3]);

    drawLine3D(pProto1, pGn, "#20B2AA", 2.4);

    drawLine3D(pProto2, pGn, "#4169E1", 2.4);

    drawLine3D(pProto1, pEN, "#FFD700", 2.6);

    drawLine3D(pProto2, pEN, "#FFD700", 2.6);

    drawLine3D(pEN, pGn, "#FFA500", 2.8);

  }



  // Master 60fps Loop

  function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch5-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }

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



    function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);

    else if (stInt === 2 || stInt === 3) renderStage2And3(w, h, stArg);

    else if (stInt === 4) renderStage4(w, h);

    else if (stInt === 5) renderStage5(w, h);

    else if (stInt === 6 || stInt === 7) renderStage6And7(w, h, stArg);

    else if (stInt === 8 || stInt === 9) renderStage8And9(w, h, stArg);

    else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh5Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch5-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch5-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch5-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch5-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch5-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh5Stage = function(val) { window.setCh5Stage(val, true); };



  window.enableCh5Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch5-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh5WithDeck();

  };



  window.toggleCh5Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch5-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh5Spotlight = function() {

    const hud = document.getElementById('ch5-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh5Minimize = function() {

    const hud = document.getElementById('ch5-3d-hud');

    const b = document.getElementById('ch5-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh5WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch5-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-5, section[data-chapter="5"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.setCh5Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh5WithDeck = syncCh5WithDeck;
  }



  // 3D Orbit Drag, Wheel Zoom & Node Click Hit-Testing

  wrap.addEventListener('mousedown', e => {

    e.stopPropagation();

    isDragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mousemove', e => {

    if (!isDragging) return;

    camYaw += (e.clientX - lastX) * 0.012;

    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));

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

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    camYaw += dx * 0.012;
    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('mouseup', () => { isDragging = false; });



  wrap.addEventListener('click', e => {

    e.stopPropagation();

    const rect = canvas.getBoundingClientRect();

    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    let hit = null;

    for (let i = hitNodes.length - 1; i >= 0; i--) {

      const n = hitNodes[i];

      if (Math.hypot(mx - n.p.sx, my - n.p.sy) <= n.r + 6) { hit = n; break; }

    }

    const insp = document.getElementById('ch5-node-inspector');

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



  function init() {

    resize();

    syncCh5WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_5 = false;
    const synBindSync_syncCh5WithDeck = () => {
      if (syncRaf_5) return;
      syncRaf_5 = true;
      requestAnimationFrame(() => {
        syncRaf_5 = false;
        syncCh5WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh5WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh5WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh5WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh5WithDeck, { passive: true });

    const revEl_syncCh5WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh5WithDeck) {
      revEl_syncCh5WithDeck.addEventListener('scroll', synBindSync_syncCh5WithDeck, { passive: true });
      revEl_syncCh5WithDeck.addEventListener('touchmove', synBindSync_syncCh5WithDeck, { passive: true });
    }
    const vpEl_syncCh5WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh5WithDeck) {
      vpEl_syncCh5WithDeck.addEventListener('scroll', synBindSync_syncCh5WithDeck, { passive: true });
      vpEl_syncCh5WithDeck.addEventListener('touchmove', synBindSync_syncCh5WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh5WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh5WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh5WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh5WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh5WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh5WithDeck);
    }

    const hud = document.getElementById('ch5-3d-hud');

    if (hud) {

      hud.querySelectorAll('input, button').forEach(el => {

        el.addEventListener('keydown', e => e.stopPropagation());

        el.addEventListener('mousedown', e => e.stopPropagation());

        el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });

      });

    }

  }



  init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh5Engine);
  } else {
    runCh5Engine();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 6 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
window.showGenericTab = function(prefix, idx, maxIdx, btnEl) {
  for (let i = 1; i <= maxIdx; i++) {
    const p = document.getElementById(prefix + '-' + i);
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

// WIDGET 1: §6.1.1 Monodromie vs Polydromie & Area Hierarchy (SM-27)
window.polyMode = 4;
window.setPolyMode = function(pmu) {
  const el = document.getElementById('ar-pmu');
  if (el) { el.value = pmu; window.updateAreaLab(); }
};

window.updateAreaLab = function() {
  const elPmu = document.getElementById('ar-pmu');
  if (!elPmu) return;
  let pmu = parseInt(elPmu.value);
  let q = parseInt(document.getElementById('ar-q').value);
  document.getElementById('ar-pmu-val').innerText = pmu;
  document.getElementById('ar-q-val').innerText = `AR_${q}`;

  const btnM = document.getElementById('btn-mono');
  const btnP = document.getElementById('btn-poly');
  if (btnM && btnP) {
    if (pmu === 1) {
      btnM.style.background = '#FFD700'; btnM.style.color = '#000'; btnM.style.fontWeight = 'bold';
      btnP.style.background = '#1e293b'; btnP.style.color = '#FFD700'; btnP.style.fontWeight = 'normal';
    } else {
      btnP.style.background = '#FFD700'; btnP.style.color = '#000'; btnP.style.fontWeight = 'bold';
      btnM.style.background = '#1e293b'; btnM.style.color = '#FFD700'; btnM.style.fontWeight = 'normal';
    }
  }

  const svg = document.getElementById('ar-svg');
  if (svg) {
    let html = `<rect x="8" y="8" width="194" height="104" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
    if (pmu === 1) {
      html += `<path d="M 20,60 Q 105,25 190,60" fill="none" stroke="#20B2AA" stroke-width="3.5"/>`;
      html += `<circle cx="20" cy="60" r="5" fill="#4169E1"/><circle cx="190" cy="60" r="6" fill="#FFD700"/>`;
    } else {
      html += `<line x1="20" y1="60" x2="82" y2="60" stroke="#4169E1" stroke-width="3.2"/>`;
      html += `<circle cx="82" cy="60" r="5.5" fill="#DC143C"/>`;
      for (let i = 0; i < pmu; i++) {
        let frac = pmu === 1 ? 0 : (i / (pmu - 1)) * 2 - 1;
        let yEnd = 60 + frac * 42;
        html += `<path d="M 82,60 Q 135,${(60 + frac*18).toFixed(1)} 190,${yEnd.toFixed(1)}" fill="none" stroke="#FFA500" stroke-width="2.2"/>`;
        html += `<circle cx="190" cy="${yEnd.toFixed(1)}" r="4" fill="#FFD700"/>`;
      }
    }
    svg.innerHTML = html;
  }

  const box = document.getElementById('ar-readout');
  if (box) {
    let regStr = pmu === 1 ? "MONODROMIE (Unique Deterministic Trajectory)" : `POLYDROMIE (Branching Tuft of P_μ = ${pmu} Paths at Polydromiepunkt x₀)`;
    box.innerHTML = `<b>Regime:</b> <span style="color:#FFD700;">${regStr}</span> | <b>SM Eq. 27 (Order q=${q}):</b> AR_${q} bundles P_${q-1} sub-areas of order ${q-1} between (T₁, T₂).`;
  }
};

// WIDGET 2: §6.1.2 & Thm. 6.13 Telecentre Dimensionality & Foliation Lab
window.updateTeleDimLab = function() {
  const elN = document.getElementById('tc-n');
  if (!elN) return;
  let n = parseInt(elN.value);
  let g1In = document.getElementById('tc-g1');
  let g2In = document.getElementById('tc-g2');
  g1In.max = n - 1;
  g2In.max = n - 1;
  let g1 = Math.min(n - 1, parseInt(g1In.value));
  let g2 = Math.min(n - 1, parseInt(g2In.value));
  g1In.value = g1;
  g2In.value = g2;

  document.getElementById('tc-n-val').innerText = n;
  document.getElementById('tc-g1-val').innerText = g1;
  document.getElementById('tc-g2-val').innerText = g2;

  const names = ["Punkttelezentrum (0D Point)", "Linientelezentrum (1D Curve)", "Flächentelezentrum (2D Surface)", "Raumtelezentrum (3D Volume)", "4D Hypertelezentrum", "5D Hypertelezentrum"];
  let gMin = Math.min(g1, g2), gMax = Math.max(g1, g2);
  let folStr = (g1 === g2)
    ? `Equal Dimensions (γ₁ = γ₂ = ${g1}) ⇒ <b>Unique connecting Telezentrale of dimension γ₁ + 1 = ${g1 + 1}</b>`
    : `Unequal Dimensions (γmax = ${gMax} > γmin = ${gMin}) ⇒ <b>(${gMax - gMin})-parameter family of (${gMin + 1})-dim Telezentralen foliating a region of dim ${gMax + 1}</b>`;

  const box = document.getElementById('tc-readout');
  if (box) {
    box.innerHTML =
      `<b>Prop. 6.3 Names (0 ≤ γ_k ≤ ${n-1}):</b> T_{z,1} is a <span style="color:#5eead4;">${names[g1]}</span> | T_{z,2} is a <span style="color:#fcd34d;">${names[g2]}</span><br>` +
      `<b>Thm. 6.13 Foliation:</b> ${folStr}`;
  }
};

// WIDGET 3: §6.2.1 Far-Centered Collector Bifurcation Cycle
window.updateCollectorLab = function() {
  const elP = document.getElementById('col-pmu');
  if (!elP) return;
  let pmu = parseInt(elP.value);
  let sPct = parseInt(document.getElementById('col-s').value);
  document.getElementById('col-pmu-val').innerText = pmu;
  document.getElementById('col-s-val').innerText = sPct + '%';

  let s = sPct / 100.0;
  const svg = document.getElementById('col-svg');
  if (svg) {
    let html = `
      <line x1="18" y1="62" x2="88" y2="62" stroke="#4169E1" stroke-width="3.5"/>
      <circle cx="88" cy="62" r="6" fill="#FFA500" stroke="#000" stroke-width="1.5"/>
      <text x="88" y="82" fill="#FFA500" font-size="9.5" font-weight="bold" text-anchor="middle">x₀ ∈ D_ext</text>
      <circle cx="355" cy="62" r="18" fill="rgba(32,178,170,0.3)" stroke="#FFD700" stroke-width="2.5"/>
      <text x="355" y="66" fill="#FFD700" font-size="10.5" font-weight="bold" text-anchor="middle">Col 𝔎</text>
    `;
    let xDot = 88 + s * (355 - 88);
    for (let i = 0; i < pmu; i++) {
      let frac = (i / (pmu - 1)) * 2 - 1;
      let amp = frac * 42;
      let pts = [];
      for (let k = 0; k <= 40; k++) {
        let u = k / 40.0;
        let px = 88 + u * (355 - 88);
        let py = 62 + amp * Math.sin(Math.PI * u);
        pts.push((k === 0 ? "M " : "L ") + px.toFixed(1) + "," + py.toFixed(1));
      }
      html += `<path d="${pts.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2"/>`;
      let dy = 62 + amp * Math.sin(Math.PI * s);
      html += `<circle cx="${xDot.toFixed(1)}" cy="${dy.toFixed(1)}" r="4.5" fill="#FFD700"/>`;
    }
    svg.innerHTML = html;
  }

  const box = document.getElementById('col-readout');
  if (box) {
    box.innerHTML =
      `<b>Def. 6.4 Heteroclinic Collector Cycle:</b> W^u(x₀) ≅ ℝ^${pmu} branches at Polydromy saddle x₀ ∈ D_ext, while W^u_tele(x₀) = W^u(x₀)\\{x₀} ⊆ B(𝔎) reconverges to Collector 𝔎 ` +
      (sPct >= 96 ? `<span style="color:#FFD700;"><b>(CAPTURED AT TELEZENTRUM 𝔎!)</b></span>` : `(Progress ${sPct}%)`);
  }
};

// WIDGET 4: §6.2.2 Universal Coalgebra Tab Switcher
window.showCoalgTab = function(idx, btnEl) {
  for (let i = 1; i <= 4; i++) {
    const p = document.getElementById('coalg-pane-' + i);
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

// WIDGET 5: §6.2.2 Stage V Telecentric Phase-Locking
window.updateStage5 = function() {
  const elTh0 = document.getElementById('st5-th0');
  if (!elTh0) return;
  let deg0 = parseFloat(elTh0.value);
  let t = parseFloat(document.getElementById('st5-t').value);
  document.getElementById('st5-th0-val').innerText = (deg0 >= 0 ? '+' : '') + deg0 + '°';
  document.getElementById('st5-t-val').innerText = t.toFixed(1) + 's';

  let th0 = deg0 * Math.PI / 180.0;
  let th_t = 2.0 * Math.atan(Math.exp(-t) * Math.tan(th0 / 2.0));
  let deg_t = th_t * 180.0 / Math.PI;
  let psi0 = 1.0 - Math.cos(th0);
  let psi_t = 1.0 - Math.cos(th_t);
  let bound = Math.exp(-t) * psi0;

  let xEnd = 105 + 50 * Math.cos(-th_t);
  let yEnd = 68 + 50 * Math.sin(-th_t);
  document.getElementById('st5-vec').setAttribute('x2', xEnd.toFixed(1));
  document.getElementById('st5-vec').setAttribute('y2', yEnd.toFixed(1));
  document.getElementById('st5-tip').setAttribute('cx', xEnd.toFixed(1));
  document.getElementById('st5-tip').setAttribute('cy', yEnd.toFixed(1));

  document.getElementById('st5-svg-eq').textContent = `θ(t) = ${deg_t >= 0 ? '+' : ''}${deg_t.toFixed(2)}°`;
  document.getElementById('st5-svg-psi').textContent = `Ψ(θ(t)) = ${psi_t.toFixed(4)} ≤ e⁻ᵗ Ψ(0) = ${bound.toFixed(4)}`;

  document.getElementById('st5-readout').innerHTML =
    `<b>Exact Stream !ₐ(θ₀) ∈ νT_ℝ:</b> tan(θ(t)/2) = e⁻ᵗ tan(θ₀/2)  ⇒  <b>Ψ(t) = ${psi_t.toFixed(4)}</b> ` +
    (Math.abs(deg_t) < 2.0 ? `<span style="color:#FFD700;"><b>(SYNCHRONIZED AT TELEZENTRUM θ = 0!)</b></span>` : `(Converging exponentially to T_z)`);
};

// WIDGET 6: §6.3.1–6.3.2 Double-Well Basin & Separatrix D_ext
window.initDoubleWellCurve = function() {
  const path = document.getElementById('dw-curve');
  if (!path) return;
  let pts = [];
  for (let i = 0; i <= 100; i++) {
    let x = -1.65 + (i / 100.0) * 3.30;
    let psi = Math.pow(x * x - 1.0, 2);
    let sx = 210 + x * 90;
    let sy = 120 - psi * 36;
    pts.push((i === 0 ? "M " : "L ") + sx.toFixed(1) + "," + sy.toFixed(1));
  }
  path.setAttribute('d', pts.join(" "));
};

window.updateDoubleWell = function() {
  const elX0 = document.getElementById('dw-x0');
  if (!elX0) return;
  let x0 = parseFloat(elX0.value);
  document.getElementById('dw-x0-val').innerText = (x0 >= 0 ? '+' : '') + x0.toFixed(2);

  let psi = Math.pow(x0 * x0 - 1.0, 2);
  let grad = 4.0 * x0 * (x0 * x0 - 1.0);
  let sx = 210 + x0 * 90;
  let sy = 120 - psi * 36;

  let ball = document.getElementById('dw-ball');
  ball.setAttribute('cx', sx.toFixed(1));
  ball.setAttribute('cy', sy.toFixed(1));

  let box = document.getElementById('dw-readout');
  if (Math.abs(x0) < 0.03) {
    ball.setAttribute('fill', '#DC143C');
    box.style.borderLeftColor = "#DC143C";
    box.innerHTML = `<span style="color:#ff6b81;"><b>⚠ ON EXTINKTIONSDISKRIMINANTE D_ext (x₀ = 0.00, Index-1 Saddle p₀):</b></span><br>` +
      `grad Ψ(0) = 0, Hess Ψ(0) = -4 &lt; 0. Whitney-stratified separatrix W^s(p₀) between B(T_{z,1}) and B(T_{z,2})!`;
  } else if (x0 < 0) {
    ball.setAttribute('fill', '#20B2AA');
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<span style="color:#20B2AA;"><b>✓ TELEVARIANT BASIN B(T_{z,1}) = (-∞, 0):</b></span> Ψ(x₀) = ${psi.toFixed(3)}, X_AR = -Ψ'(x₀) = ${(-grad).toFixed(2)}<br>` +
      `Exponential Grönwall convergence to left Telezentrum <b>T_{z,1} = -1</b>!`;
  } else {
    ball.setAttribute('fill', '#FFD700');
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>✓ TELEVARIANT BASIN B(T_{z,2}) = (0, +∞):</b></span> Ψ(x₀) = ${psi.toFixed(3)}, X_AR = -Ψ'(x₀) = ${(-grad).toFixed(2)}<br>` +
      `Exponential Grönwall convergence to right Telezentrum <b>T_{z,2} = +1</b>!`;
  }
};

// WIDGET 7: §6.3.3 Telezentralenrelativität Stratum Escalator
window.setTransStratum = function(m) {
  let cards = document.getElementById('trans-cards');
  let box = document.getElementById('trans-readout');
  if (!cards || !box) return;

  let cLeft = `
    <div style="background:rgba(65,105,225,0.15); border:1.5px solid #4169E1; border-radius:8px; padding:8px;">
      <b style="color:#82aaff;">Stratum C(${m}) := Coalg(T_${m})</b><hr style="border-color:#2d3748; margin:4px 0;">
      <div style="color:#FFD700; font-weight:bold;">★ Haupttelezentrum: νT_${m}</div>
      <div style="font-size:0.9em; color:#cbd5e1;">Absolute Terminal Coalgebra Goal of Stratum C(${m})</div>
    </div>`;

  let cRight = `
    <div style="background:rgba(32,178,170,0.15); border:1.5px solid #20B2AA; border-radius:8px; padding:8px;">
      <b style="color:#5eead4;">Stratum C(${m+1}) := Coalg(T_${m+1})</b><hr style="border-color:#2d3748; margin:4px 0;">
      <div style="color:#FFA500; font-weight:bold;">↳ Nebentelezentrum: Γ_${m}(νT_${m}) ≅ HypMet_${m+1}</div>
      <div style="color:#FFD700; font-weight:bold; margin-top:3px;">★ New Higher Goal: νT_${m+1} ≇ Γ_${m}(νT_${m})</div>
    </div>`;

  cards.innerHTML = cLeft + cRight;
  box.innerHTML =
    `<b>Transzendenzsynkolator Adjunction (Γ_${m} ⊣ U_${m+1}, Thm. 6.19):</b> ` +
    `The terminal attractor <b>νT_${m}</b> of C(${m}) is demoted by left adjoint Γ_${m} into the initial generating building block <b>HypMet_${m+1}</b> on the way to <b>νT_${m+1}</b>!`;
};

// WIDGET 8A: §6.3.4 Morse-Poincare-Hopf Even Parity Explorer
window.updateMorseParity = function() {
  const elC0 = document.getElementById('mp-c0');
  if (!elC0) return;
  let c0 = parseInt(elC0.value);
  let c1 = c0;
  let mu = c0 + c1;
  document.getElementById('mp-c0-val').innerText = c0;

  const svg = document.getElementById('mp-svg');
  if (svg) {
    let html = `<circle cx="0" cy="0" r="46" fill="none" stroke="#20B2AA" stroke-width="2.2"/>`;
    for (let k = 0; k < c0; k++) {
      let aAtt = (k / c0) * 2 * Math.PI - Math.PI / 2;
      let aSad = ((k + 0.5) / c0) * 2 * Math.PI - Math.PI / 2;
      let ax = (46 * Math.cos(aAtt)).toFixed(1), ay = (46 * Math.sin(aAtt)).toFixed(1);
      let sx = (46 * Math.cos(aSad)).toFixed(1), sy = (46 * Math.sin(aSad)).toFixed(1);
      html += `<circle cx="${ax}" cy="${ay}" r="6" fill="#FFD700" stroke="#000" stroke-width="1"/>`;
      html += `<circle cx="${sx}" cy="${sy}" r="5.5" fill="#DC143C" stroke="#000" stroke-width="1"/>`;
    }
    svg.innerHTML = html;
  }

  const box = document.getElementById('mp-readout');
  if (box) {
    box.innerHTML =
      `<b>χ(Ω) = c₀ - c₁ = ${c0} - ${c1} = 0:</b> Total Secondary Centers μ = c₀ + c₁ = 2c₀ = <b style="color:#FFD700;">${mu} (Strictly Even!)</b> paired by μ/2 = <b>${c0}</b> geodetic Telezentralen.`;
  }
};

// WIDGET 8B: §6.3.4 Eyring-Kramers Survival & Resynkolation Lab
window.updateKramers = function() {
  const elDe = document.getElementById('kr-de');
  if (!elDe) return;
  let de = parseFloat(elDe.value);
  let eps = parseFloat(document.getElementById('kr-eps').value);
  document.getElementById('kr-de-val').innerText = de.toFixed(2);
  document.getElementById('kr-eps-val').innerText = eps.toFixed(2);

  let ratio = de / eps;
  let tauSurv = Math.exp(ratio);
  let box = document.getElementById('kr-readout');

  if (ratio < 2.0) {
    box.style.borderLeftColor = "#DC143C";
    box.innerHTML =
      `<span style="color:#ff6b81;"><b>⚠ METASTABLE EXTINCTION RISK (ΔE / ε_fluct = ${ratio.toFixed(2)} &lt; 2.0):</b></span><br>` +
      `Eyring–Kramers Survival Time τ_surv ∝ exp(ΔE/ε) = <b>${tauSurv.toFixed(1)} steps</b>. Imminent dysvariant escape across D_ext! Click <b>Trigger Resynkolation</b>!`;
  } else {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML =
      `<span style="color:#20B2AA;"><b>✓ TELEVARIANTLY STABILIZED BASIN (ΔE / ε_fluct = ${ratio.toFixed(2)} ≥ 2.0):</b></span><br>` +
      `Eyring–Kramers Mean Survival Time τ_surv ∝ exp(ΔE/ε) = <b style="color:#FFD700;">${tauSurv > 1000 ? tauSurv.toExponential(2) : tauSurv.toFixed(1)} steps</b> (Protected against thermal escape).`;
  }
};

window.triggerResynkolation = function() {
  document.getElementById('kr-de').value = 2.6;
  document.getElementById('kr-eps').value = 0.30;
  window.updateKramers();
};

// ---------------------------------------------------------------------------
// VIDEO CONTROL: play Manim clips only while their slide is visible
// ---------------------------------------------------------------------------
function prepareVideos() {
  document.querySelectorAll('video').forEach(v => {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = 'auto';
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('muted', '');
    v.setAttribute('loop', '');
    v.setAttribute('preload', 'auto');
  });
}

function syncVideosToSlide() {
  const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
    || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
    || window.innerWidth <= 768;

  const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
  const winH = window.innerHeight || document.documentElement.clientHeight;
  const winW = window.innerWidth || document.documentElement.clientWidth;

  document.querySelectorAll('video').forEach(v => {
    let shouldPlay = false;
    if (isScroll) {
      const rect = v.getBoundingClientRect();
      const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
      shouldPlay = inView;
    } else {
      shouldPlay = current ? current.contains(v) : true;
    }

    if (shouldPlay) {
      v.muted = true;
      v.playsInline = true;
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } else if (!v.paused) {
      v.pause();
    }
  });
}

// Ensure continuous sync on mobile scroll and touch gestures
if (typeof window !== 'undefined') {
  window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
  window.__syn_video_sync_handlers.push(syncVideosToSlide);
  if (!window.__syn_video_scroll_hooked) {
    window.__syn_video_scroll_hooked = true;
    const runSync = () => {
      (window.__syn_video_sync_handlers || []).forEach(fn => {
        try { fn(); } catch (_) {}
      });
    };
    window.addEventListener('scroll', runSync, { passive: true });
    window.addEventListener('touchmove', runSync, { passive: true });
    window.addEventListener('resize', runSync, { passive: true });
    let synMediaUnlocked = false;
    function synUnlockMedia() {
      if (synMediaUnlocked) return;
      synMediaUnlocked = true;
      runSync();
    }
    document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
    document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
  }
}

// ---------------------------------------------------------------------------
// WIDGET WIRING (runs once; slide changes no longer reset widget state)
// ---------------------------------------------------------------------------
function renderAllCh6Widgets() {
  window.updateAreaLab();
  window.updateTeleDimLab();
  window.updateCollectorLab();
  window.updateStage5();
  window.initDoubleWellCurve();
  window.updateDoubleWell();
  window.setTransStratum(0);
  window.updateMorseParity();
  window.updateKramers();
}

function bindControlsOnce() {
  document.querySelectorAll('input[type="range"], select, button').forEach(el => {
    if (el.dataset.synBound) return;
    el.dataset.synBound = '1';
    el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());
  });
}

let synInitialised = false;
function initChapter6() {
  if (synInitialised) return;
  synInitialised = true;
  prepareVideos();
  bindControlsOnce();
  renderAllCh6Widgets();
  syncVideosToSlide();
}

if (window.Reveal && window.Reveal.on) {
  window.Reveal.on('ready', initChapter6);
  window.Reveal.on('slidechanged', syncVideosToSlide);
  window.Reveal.on('fragmentshown', syncVideosToSlide);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter6();
  });
} else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
  initChapter6();
}

// =========================================================================
// CHAPTER 6: 60FPS 3D INTERACTIVE COALGEBRA, LYAPUNOV BASIN & SEPARATRIX ENGINE
// =========================================================================

const CH6_3D_STYLE = `
#ch6-3d-hud {
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

#ch6-3d-hud *, #ch6-3d-hud *::before, #ch6-3d-hud *::after {
  box-sizing: border-box;
}

#ch6-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch6-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch6-3d-hud.minimized .ch6-hud-body {
  display: none;
}

.ch6-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch6-hud-title {
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

.ch6-hud-title span:first-child {
  line-height: 1.15;
}

.ch6-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch6-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch6-hud-btn {
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

.ch6-hud-btn:hover, .ch6-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch6-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch6-canvas-wrap:active {
  cursor: grabbing;
}

#ch6-3d-hud.spotlight .ch6-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch6-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch6-overlay-bar {
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

.ch6-telemetry {
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

#ch6-node-inspector {
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

.ch6-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch6-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch6-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch6-scrubber .ch6-hud-btn {
  flex-shrink: 0;
}

#ch6-caption {
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
  #ch6-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch6-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch6-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch6-hud-controls {
    gap: 3px;
  }
  .ch6-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch6-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch6-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch6-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch6-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch6-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch6-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch6-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch6-hud-controls {
    gap: 3px;
  }
  .ch6-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch6-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch6-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch6-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch6-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch6-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch6-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch6-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH6_3D_HTML = `
<div class="ch6-hud-header">

    <div class="ch6-hud-title">

      <span>🎯 Ch 6 · 3D Telezentrik Engine</span>

      <span id="ch6-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch6-hud-controls">

      <button class="ch6-hud-btn active" id="ch6-btn-orbit" onclick="toggleCh6Orbit()">⟳ Orbit</button>

      <button class="ch6-hud-btn" onclick="toggleCh6Spotlight()">⛶ Spotlight</button>

      <button class="ch6-hud-btn" id="ch6-btn-min" onclick="toggleCh6Minimize()">+</button>

    </div>

  </div>



  <div class="ch6-hud-body">

    <div class="ch6-canvas-wrap" id="ch6-canvas-wrap">

      <canvas id="ch6-3d-canvas"></canvas>

      <div class="ch6-overlay-bar">

        <div class="ch6-telemetry" id="ch6-telemetry">(ν𝒯, ζ) | V̇ ≤ −γV</div>

        <div id="ch6-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch6-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <button class="ch6-hud-btn" title="Previous Stage" onclick="window.setCh6Stage(Math.round( parseFloat(document.getElementById('ch6-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch6-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh6Stage(this.value)">
      <button class="ch6-hud-btn" title="Next Stage" onclick="window.setCh6Stage(Math.round( parseFloat(document.getElementById('ch6-slider').value) ) + 1, true)">▶</button>

      <button class="ch6-hud-btn active" id="ch6-btn-sync" onclick="enableCh6Sync()">Auto-Sync</button>

    </div>



    <div id="ch6-caption">

      <b>Stage 1 (§6.1.1 — SM-27):</b> Polydromic branching tuft (P_μ = 4) between guiding attractors (T₁, T₂) in Area AR_q.

    </div>

  </div>
`;

function injectCh63DHUD() {
  if (document.getElementById('ch6-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH6_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch6-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH6_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch6_3d_engine_loaded) return;
  window.__ch6_3d_engine_loaded = true;

  function runCh6Engine() {
    injectCh63DHUD();
    if (window.__ch6_3d_engine_initialized) return;
    window.__ch6_3d_engine_initialized = true;

const canvas = document.getElementById('ch6-3d-canvas');

  const wrap = document.getElementById('ch6-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.46;

  let camPitch = 0.36;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§6.1.1 — SM-27 Mono-/Polydromie &amp; Area AR_q):</b> Polydromic branching tuft P_μ = 4 at saddle x₀ bounded by attractors (T₁, T₂).",

    2: "<b>Stage 2 (§6.1.2–6.1.4 — Televarianz vs. Dysvarianz):</b> Televariant orbits W_tele ⊂ B(T_z) (−grad Ψ) vs. Dysvariant escape across D_ext.",

    3: "<b>Stage 3 (§6.2.1 — Def. 6.4 Far-Centered Collector 𝔎):</b> Unstable tuft W^u_tele(x₀) reconverges into Far-Centered Collector 𝔎 at distance L > 0.",

    4: "<b>Stage 4 (§6.2.2 — Thm. 6.7 &amp; Prop. 6.8 Final Coalgebra (ν𝒯, ζ)):</b> Terminal cone lim_k 𝒯^k(1), universal arrow !ₐ &amp; Lambek fixed point ζ.",

    5: "<b>Stage 5 (Stage V Polarimeter &amp; Thm. 6.10 Lyapunov Stability):</b> Coercive PL basin V̇ ≤ −γV driving exponential convergence dist(Φ_t, 𝒜) ≤ C e^{−γt/2}.",

    6: "<b>Stage 6 (§6.3.2 — Thm. 6.14 Morse–Smale Separatrix D_ext):</b> 3D Double-Well surface Ψ(x,y) = (x²−1)²+y² split by crimson ridge D_ext = W^s(p₀).",

    7: "<b>Stage 7 (Thm. 6.13 Telezentralen Foliations &amp; Thm. 6.16):</b> Geodesic Telezentralen foliating between γ₁=0 and γ₂=1 attractors + metastable recovery.",

    8: "<b>Stage 8 (§6.3.3 — Thm. 6.19 Telezentralenrelativität):</b> Left adjoint Γ_m ⊣ U_{m+1} maps terminal ν𝒯_m in C(m) to basal Nebentelezentrum in C(m+1)!",

    9: "<b>Stage 9 (§6.3.4 — Thm. 6.20 Even Parity μ=2c₀ &amp; Thm. 6.21 Resynkolation):</b> Morse–Poincaré–Hopf ring (3 attractors + 3 saddles) &amp; Kramers barrier deepening!",

    10: "<b>Stage 10 (§6.4–6.6 — Completion of Teil A &amp; Pivot to Teil B):</b> Teil A Synthesis Crown projecting onto the Number Field Triad Coeff = [ℚ ⊆ ℝ ⊆ ℂ]."

  };



  const STAGE_TELEMETRY = {

    1: "AR_q ≡ AR_{(T₁)}^{(T₂)}[(AR_{q−1})]_1^{P_{q−1}} (SM-27)",

    2: "W_tele ⊂ B(T_z) | D_ext = ∂B(T_z)",

    3: "W^u_tele(x₀) ⊆ B(𝔎) | γ ∈ {0, 1, 2, 3}",

    4: "ν𝒯 = lim_{k<ω} 𝒯^k(1) | ζ : ν𝒯 ≅ 𝒯(ν𝒯)",

    5: "V̇ ≤ −γV ⇒ dist(Φ_t, 𝒜) ≤ √(2V₀/μ) e^{−γt/2}",

    6: "D_ext = ⋃_{ind(p_r)≥1} W^s(p_r) (Thm. 6.14)",

    7: "dim(Telezentrale) = γ₁ + 1 (Thm. 6.13)",

    8: "Γ_m(ν𝒯_m) ≅ HypMet_{m+1} ≇ ν𝒯_{m+1}",

    9: "χ(Ω)=0 ⇒ μ = 2c₀ ∈ 2ℕ | τ_surv ~ exp(ΔE/ε)",

    10: "Teil A Complete ⇒ Pivot to Coeff = [ℚ⊆ℝ⊆ℂ]"

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



  // =========================================================================

  // STAGE RENDERERS (STAGES 1 TO 10)

  // =========================================================================



  // Stage 1 & 3: Polydromic Branching Tuft (SM-27) & Far-Centered Collector \mathcal{K} (Def. 6.4)

  function renderStage1And3(w, h, st) {

    const isCollector = (st >= 2.5);

    const pIn  = drawNode3D("In_State", -1.45, 0, 0, 7, "#4169E1", "#fff", "S₀", "Initial Metroplexäondyne State before Polydromy Saddle", w, h);

    const pSad = drawNode3D("Sad_x0",   -0.55, 0, 0, 8.5, "#DC143C", "#FFD700", "x₀ ∈ D_ext", "Polydromie Bifurcation Saddle x₀: Branches into P_μ = 4 paths", w, h);

    drawLine3D(pIn, pSad, "#4169E1", 3.0);



    const pCol = isCollector

      ? drawNode3D("Col_K", 1.35, 0, 0, 10.5, "#FFD700", "#20B2AA", "Collector 𝔎 (L > 0)", "Far-Centered Collector 𝔎 capturing unstable tuft W^u_tele(x₀) ⊆ B(𝔎) (Def. 6.4)", w, h)

      : null;



    for (let b = 0; b < 4; b++) {

      const ang = (b / 4) * Math.PI * 2 + timeSec * 0.6;

      const radY = 0.75 * Math.cos(ang);

      const radZ = 0.75 * Math.sin(ang);

      ctx.beginPath();

      ctx.strokeStyle = b % 2 === 0 ? "#20B2AA" : "#FFA500";

      ctx.lineWidth = 2.4;

      for (let i = 0; i <= 40; i++) {

        const s = i / 40;

        const env = isCollector ? Math.sin(s * Math.PI) : s;

        const x = -0.55 + s * 1.9;

        const p = proj(x, radY * env, radZ * env, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      if (!isCollector) {

        drawNode3D("Tuft_" + b, 1.35, radY, radZ, 6.5, "#20B2AA", "#fff", `T_{z,${b+1}}`, `Competing Polydromic Attractor Branch ${b+1} in AR_q`, w, h);

      }

    }

  }



  // Stage 2: Televarianz (Inward Basin Spiral) vs Dysvarianz (Outward Escape across D_ext)

  function renderStage2(w, h) {

    // Separatrix Ring D_ext = \partial B(T_z)

    ctx.beginPath();

    ctx.strokeStyle = "#DC143C";

    ctx.lineWidth = 2.6;

    ctx.setLineDash([5, 3]);

    for (let i = 0; i <= 48; i++) {

      const a = (i / 48) * Math.PI * 2;

      const p = proj(1.05 * Math.cos(a), 1.05 * Math.sin(a), 0, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();

    ctx.setLineDash([]);



    // Inward Televariant Spiral W_tele -> T_z

    ctx.beginPath();

    ctx.strokeStyle = "#20B2AA";

    ctx.lineWidth = 2.8;

    for (let i = 0; i <= 70; i++) {

      const s = i / 70;

      const r = 0.95 * (1 - s * 0.9);

      const a = s * Math.PI * 5 + timeSec * 2;

      const p = proj(r * Math.cos(a), r * Math.sin(a), -0.75 * s, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    // Outward Dysvariant Trajectory W_dys -> Nullsyntrix

    const dysA = timeSec * 1.2;

    const pDys = drawNode3D("W_dys", 1.48 * Math.cos(dysA), 1.48 * Math.sin(dysA), 0.55, 7, "#DC143C", "#fff", "W_dys → 0_Syn", "Dysvariant Trajectory crossing D_ext into structural/functional decay", w, h);

    drawLine3D(proj(1.05 * Math.cos(dysA), 1.05 * Math.sin(dysA), 0, w, h), pDys, "#DC143C", 2.4);

    drawNode3D("Tz_Center", 0, 0, -0.75, 10, "#FFD700", "#20B2AA", "T_z (W_tele)", "Televariant Telezentrum Attractor minimizing Friston Free Energy", w, h);

  }



  // Stage 4: Final Telecentric Coalgebra (\nu\mathcal{T}_{\mathbb{R}}, \zeta) & Lambek Isomorphism

  function renderStage4(w, h) {

    // Adamek-Aczel Terminal Sequence Rings 1 <- T(1) <- T^2(1) <- \nu T

    const levels = [

      { z: -1.1, r: 1.35, col: "#4169E1", lbl: "𝒯¹(1)" },

      { z: -0.4, r: 0.95, col: "#20B2AA", lbl: "𝒯²(1)" },

      { z:  0.3, r: 0.55, col: "#FFA500", lbl: "𝒯^k(1)" }

    ];

    levels.forEach((lv, idx) => {

      ctx.beginPath();

      ctx.strokeStyle = lv.col;

      ctx.lineWidth = 2.0;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const p = proj(lv.r * Math.cos(a), lv.r * Math.sin(a), lv.z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      drawNode3D("Term_" + idx, lv.r, 0, lv.z, 6.5, lv.col, "#fff", lv.lbl, `Terminal Sequence Approximant ${lv.lbl} in Diff_smooth (Thm. 6.7)`, w, h);

    });

    const pNu = drawNode3D("Nu_T", 0, 0, 1.05, 11.5, "#FFD700", "#fff", "ν𝒯 ≅ 𝒯(ν𝒯) (Lambek ζ)", "Final Telecentric Coalgebra (ν𝒯, ζ): Unique mediating arrow !ₐ : (S,α) → ν𝒯 (Prop. 6.8)", w, h);

    const pS  = drawNode3D("State_S", -1.25, 0.6, -0.9, 8, "#20B2AA", "#fff", "(S, α)", "Local Dynamical System Coalgebra (S, α : S → 𝒯(S))", w, h);

    drawLine3D(pS, pNu, "#FFD700", 3.0, [5, 3]);

  }



  // Stage 5: Stage V Coupled Polarimeter Phase-Locking & Coercive PL Basin (Thm. 6.10)

  function renderStage5(w, h) {

    // 3D Paraboloid Bowl V(\theta) = 1 - \cos\theta \ge \frac{\mu}{2}\theta^2

    for (let r = 0.35; r <= 1.41; r += 0.35) {

      ctx.beginPath();

      ctx.strokeStyle = "rgba(65,105,225,0.48)";

      ctx.lineWidth = 1.6;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const z = -0.95 + 0.85 * r * r;

        const p = proj(r * Math.cos(a), r * Math.sin(a), z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    const decay = Math.exp(-((timeSec % 3.5) * 0.95));

    const rad = 1.3 * decay;

    const ang = timeSec * 3.0;

    const bx = rad * Math.cos(ang), by = rad * Math.sin(ang), bz = -0.95 + 0.85 * rad * rad;

    drawNode3D("Pol_Ball", bx, by, bz, 7.5, "#FFD700", "#000", "θ(t) → 0", "Stage V Polarimeter State: dist(Φ_t(x₀), 𝒜) ≤ √(2V₀/μ) e^{−γt/2} (Thm. 6.10)", w, h);

    drawNode3D("Pol_Min", 0, 0, -0.95, 10, "#20B2AA", "#FFD700", "θ_target = 0 (T_z)", "Synchronized Polarimeter Telezentrum Ψ(0) = 0", w, h);

  }



  // Stage 6, 7 & 9: 3D Double-Well Lyapunov Surface \Psi(x,y) = (x^2-1)^2 + y^2, Separatrix D_ext & Kramers

  function renderStage6And7And9(w, h, st) {

    const isStage7 = (st >= 6.5 && st < 7.5);

    const isStage9 = (st >= 8.5);

    const wellScale = isStage9 ? (0.28 + 0.14 * Math.sin(timeSec * 2)) : 0.22;

    const zFn = (u, v) => -0.85 + wellScale * Math.pow(u * u - 1.35, 2) + 0.28 * v * v;



    for (let u = -1.6; u <= 1.61; u += 0.32) {

      ctx.beginPath();

      const isRidge = Math.abs(u) < 0.05;

      ctx.strokeStyle = isRidge ? "#DC143C" : "rgba(65,105,225,0.42)";

      ctx.lineWidth = isRidge ? 3.4 : 1.3;

      for (let v = -1.1; v <= 1.11; v += 0.22) {

        const p = proj(u, v, zFn(u, v), w, h);

        if (v === -1.1) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }



    const pTz1 = drawNode3D("Tz_1", -1.16, 0, zFn(-1.16, 0), 8.5, "#20B2AA", "#FFD700", "T_{z,1} (−1)", "Left Stable Punkttelezentrum T_{z,1} (Morse Index 0)", w, h);

    const pTz2 = drawNode3D("Tz_2",  1.16, 0, zFn( 1.16, 0), 8.5, "#20B2AA", "#FFD700", "T_{z,2} (+1)", "Right Stable Punkttelezentrum T_{z,2} (Morse Index 0)", w, h);

    const pSad = drawNode3D("Sad_p0", 0, 0, zFn(0, 0), 8, "#DC143C", "#FFD700", "p* ∈ D_ext (Index 1)", "Morse Index-1 Saddle on Extinktionsdiskriminante D_ext = ∂B(𝒜) (Thm. 6.14)", w, h);



    if (isStage7) {

      // Telezentralen Foliation Arcs between T_{z,1} and T_{z,2} (Thm. 6.13)

      for (let vOff of [-0.65, 0.0, 0.65]) {

        ctx.beginPath();

        ctx.strokeStyle = "#FFD700";

        ctx.lineWidth = 2.0;

        for (let i = 0; i <= 30; i++) {

          const u = -1.16 + (i / 30) * 2.32;

          const v = vOff * Math.sin((i / 30) * Math.PI);

          const p = proj(u, v, zFn(u, v) + 0.08, w, h);

          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

        }

        ctx.stroke();

      }

    }



    if (isStage9) {

      // Thermal Kramers particle hopping & Resynkolation barrier

      const ux = -1.16 + 0.45 * Math.sin(timeSec * 5);

      drawNode3D("Kramers_Pt", ux, 0, zFn(ux, 0) + 0.12, 7, "#FFD700", "#DC143C", "R_resyn (τ_surv ~ e^{ΔE/ε})", "Thm. 6.21 Wasserstein W₂ Optimal Transport Geodesic & Eyring–Kramers Resynkolation!", w, h);
      const pW2 = drawNode3D("Wass_Br", 0, 0.65, 0.65, 8.5, "#38bdf8", "#FFD700", "∂_t ρ = −grad_{W₂} ℱ_ε(ρ)", "Jordan–Kinderlehrer–Otto Wasserstein-2 Gradient Flow Bridge between Metastable Wells!", w, h);
      drawLine3D(pTz1, pW2, "#38bdf8", 2.4, [4, 2]);
      drawLine3D(pW2, pTz2, "#38bdf8", 2.4, [4, 2]);

    }

  }



  // Stage 8: Transzendente Telezentralenrelativität \Gamma_m(\nu\mathcal{T}_m) \not\cong \nu\mathcal{T}_{m+1} (Thm. 6.19)

  function renderStage8(w, h) {

    // Lower Stratum C(m) vs Upper Stratum C(m+1)

    const pBotTerm = drawNode3D("Nu_m", -0.85, 0, -0.75, 10, "#FFD700", "#20B2AA", "ν𝒯_m (Haupttelezentrum in C(m))", "Terminal Final Coalgebra at the Apex of Lower Stratum C(m)", w, h);

    const pTopBasal = drawNode3D("Hyp_m1", -0.85, 0, 0.45, 8.5, "#4169E1", "#FFD700", "Γ_m(ν𝒯_m) = HypMet_{m+1}", "Demoted by Left Adjoint Γ_m ⊣ U_{m+1} to Basal Nebentelezentrum in C(m+1)!", w, h);

    const pTopTerm = drawNode3D("Nu_m1", 0.95, 0, 0.95, 11, "#FFD700", "#DC143C", "ν𝒯_{m+1} (New Terminal in C(m+1))", "Thm. 6.19: Γ_m(ν𝒯_m) ≇ ν𝒯_{m+1} (Left adjoints do not preserve terminal coalgebras!)", w, h);



    drawLine3D(pBotTerm, pTopBasal, "#20B2AA", 3.0);

    drawLine3D(pTopBasal, pTopTerm, "#FFD700", 3.0, [5, 3]);

  }



  // Stage 10: Teil A Completion Crown & Anthropomorphic Pivot to Coeff = [\mathbb{Q} \subseteq \mathbb{R} \subseteq \mathbb{C}]

  function renderStage10(w, h) {

    const teilA = ["Ch1: ℰ_syn", "Ch2: 𝒪_syn", "Ch3: ⊞_φ", "Ch4: Ω_int", "Ch5: 𝒳_syn", "Ch6: ν𝒯"];

    const ringPts = teilA.map((lbl, k) => {

      const a = timeSec * 0.45 + (k / 6) * Math.PI * 2;

      return drawNode3D("TA_" + k, 1.25 * Math.cos(a), 1.25 * Math.sin(a), 0.55, 7, "#20B2AA", "#fff", lbl, `Completed Teil A Pillar ${lbl}`, w, h);

    });

    for (let i = 0; i < 6; i++) {

      drawLine3D(ringPts[i], ringPts[(i + 1) % 6], "#20B2AA", 2.0);

    }

    // Lower Number Field Triad Coeff = [Q <= R <= C] (Bridge to Teil B, Chapter 7)

    const pQ = drawNode3D("Fld_Q", -1.0, 0, -0.85, 8, "#4169E1", "#fff", "ℚ (Discrete Counts)", "Rational Field ℚ ∈ Coeff (Teil B Anthropomorphic Pivot)", w, h);

    const pR = drawNode3D("Fld_R",  0.0, 0, -0.85, 9, "#FFA500", "#fff", "ℝ (Continuum R_n)", "Real Field ℝ ∈ Coeff (Semantischer Metrophor R_n = S_n ; ã)", w, h);

    const pC = drawNode3D("Fld_C",  1.0, 0, -0.85, 9.5, "#FFD700", "#fff", "ℂ (Phase / Realification)", "Complex Field ℂ ∈ Coeff (Realification dim_ℝ((ℂ^n)_ℝ) = 2n)", w, h);

    drawLine3D(pQ, pR, "#FFD700", 2.8);

    drawLine3D(pR, pC, "#FFD700", 2.8);

    ringPts.forEach(p => drawLine3D(p, pR, "rgba(255,215,0,0.38)", 1.5, [3, 3]));

  }



  // Master 60fps Loop

  function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch6-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }

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



    function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1 || stInt === 3) renderStage1And3(w, h, stArg);

    else if (stInt === 2) renderStage2(w, h);

    else if (stInt === 4) renderStage4(w, h);

    else if (stInt === 5) renderStage5(w, h);

    else if (stInt === 6 || stInt === 7 || stInt === 9) renderStage6And7And9(w, h, stArg);

    else if (stInt === 8) renderStage8(w, h);

    else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh6Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch6-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch6-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch6-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch6-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch6-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh6Stage = function(val) { window.setCh6Stage(val, true); };



  window.enableCh6Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch6-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh6WithDeck();

  };



  window.toggleCh6Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch6-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh6Spotlight = function() {

    const hud = document.getElementById('ch6-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh6Minimize = function() {

    const hud = document.getElementById('ch6-3d-hud');

    const b = document.getElementById('ch6-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh6WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch6-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-6, section[data-chapter="6"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.setCh6Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh6WithDeck = syncCh6WithDeck;
  }



  // 3D Orbit Drag, Wheel Zoom & Node Click Hit-Testing

  wrap.addEventListener('mousedown', e => {

    e.stopPropagation();

    isDragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mousemove', e => {

    if (!isDragging) return;

    camYaw += (e.clientX - lastX) * 0.012;

    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));

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

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    camYaw += dx * 0.012;
    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('mouseup', () => { isDragging = false; });



  wrap.addEventListener('click', e => {

    e.stopPropagation();

    const rect = canvas.getBoundingClientRect();

    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    let hit = null;

    for (let i = hitNodes.length - 1; i >= 0; i--) {

      const n = hitNodes[i];

      if (Math.hypot(mx - n.p.sx, my - n.p.sy) <= n.r + 6) { hit = n; break; }

    }

    const insp = document.getElementById('ch6-node-inspector');

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



  function init() {

    resize();

    syncCh6WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_6 = false;
    const synBindSync_syncCh6WithDeck = () => {
      if (syncRaf_6) return;
      syncRaf_6 = true;
      requestAnimationFrame(() => {
        syncRaf_6 = false;
        syncCh6WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh6WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh6WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh6WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh6WithDeck, { passive: true });

    const revEl_syncCh6WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh6WithDeck) {
      revEl_syncCh6WithDeck.addEventListener('scroll', synBindSync_syncCh6WithDeck, { passive: true });
      revEl_syncCh6WithDeck.addEventListener('touchmove', synBindSync_syncCh6WithDeck, { passive: true });
    }
    const vpEl_syncCh6WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh6WithDeck) {
      vpEl_syncCh6WithDeck.addEventListener('scroll', synBindSync_syncCh6WithDeck, { passive: true });
      vpEl_syncCh6WithDeck.addEventListener('touchmove', synBindSync_syncCh6WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh6WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh6WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh6WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh6WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh6WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh6WithDeck);
    }

    const hud = document.getElementById('ch6-3d-hud');

    if (hud) {

      hud.querySelectorAll('input, button').forEach(el => {

        el.addEventListener('keydown', e => e.stopPropagation());

        el.addEventListener('mousedown', e => e.stopPropagation());

        el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });

      });

    }

  }



  init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh6Engine);
  } else {
    runCh6Engine();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 7 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
window.showGenericTab = window.showGenericTab || function(prefix, idx, maxIdx, btnEl) {
  for (let i = 1; i <= maxIdx; i++) {
    const p = document.getElementById(prefix + '-' + i);
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

(function() {
  let aspectMode = 'quant';
  let coeffField = 'C';

  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) {
      res = Math.round((res * (n - i + 1)) / i);
    }
    return res;
  }

  // WIDGET 1: §7.1.1 Cognitive Pluralism & Mengendialektik Lab
  window.ch7_setAspectMode = function(mode) {
    aspectMode = mode;
    window.ch7_updatePluralismLab();
  };

  window.ch7_updatePluralismLab = function() {
    const elAspects = document.getElementById('ch7-plur-aspects');
    if (!elAspects) return;
    const numS = parseInt(elAspects.value);
    const valA = parseFloat(document.getElementById('ch7-plur-a').value);
    const valB = parseFloat(document.getElementById('ch7-plur-b').value);

    document.getElementById('ch7-plur-aspects-val').innerText = numS;
    document.getElementById('ch7-plur-a-val').innerText = valA.toFixed(1);
    document.getElementById('ch7-plur-b-val').innerText = valB.toFixed(1);

    const btnQual = document.getElementById('ch7-btn-qual');
    const btnQuant = document.getElementById('ch7-btn-quant');
    if (btnQual && btnQuant) {
      if (aspectMode === 'qual') {
        btnQual.style.background = '#FFD700'; btnQual.style.color = '#000'; btnQual.style.fontWeight = 'bold';
        btnQuant.style.background = '#1e293b'; btnQuant.style.color = '#FFD700'; btnQuant.style.fontWeight = 'normal';
      } else {
        btnQuant.style.background = '#FFD700'; btnQuant.style.color = '#000'; btnQuant.style.fontWeight = 'bold';
        btnQual.style.background = '#1e293b'; btnQual.style.color = '#FFD700'; btnQual.style.fontWeight = 'normal';
      }
    }

    const svg = document.getElementById('ch7-plur-svg');
    if (svg) {
      let html = '';
      const cx = 105, cy = 62, r = 42;
      const colors = ['#4169E1', '#20B2AA', '#FFA500', '#9370DB', '#DC143C', '#FFD700'];
      for (let i = 0; i < numS; i++) {
        const ang = (i / numS) * 2 * Math.PI - Math.PI / 2;
        const x = cx + r * Math.cos(ang);
        const y = cy + r * Math.sin(ang);
        if (aspectMode === 'quant') {
          html += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${cx}" y2="${cy}" stroke="#FFD700" stroke-width="2" stroke-dasharray="3,2"/>`;
        } else if (i > 0) {
          const prevAng = ((i - 1) / numS) * 2 * Math.PI - Math.PI / 2;
          const px = cx + r * Math.cos(prevAng);
          const py = cy + r * Math.sin(prevAng);
          html += `<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#475569" stroke-width="1.5" stroke-dasharray="2,3"/>`;
        }
        html += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="${colors[i % colors.length]}" fill-opacity="0.85" stroke="#fff" stroke-width="1"/>`;
        html += `<text x="${x.toFixed(1)}" y="${(y + 3.5).toFixed(1)}" fill="#fff" font-size="8.5" font-weight="bold" text-anchor="middle">S_${i + 1}</text>`;
      }
      if (aspectMode === 'quant') {
        html += `<circle cx="${cx}" cy="${cy}" r="14" fill="rgba(255,215,0,0.25)" stroke="#FFD700" stroke-width="2.2"/>`;
        html += `<text x="${cx}" y="${cy + 3.5}" fill="#FFD700" font-size="9" font-weight="bold" text-anchor="middle">ℚ⊆ℝ⊆ℂ</text>`;
      } else {
        html += `<text x="${cx}" y="${cy + 3.5}" fill="#94a3b8" font-size="8.5" font-weight="bold" text-anchor="middle">Regional □_S</text>`;
      }
      svg.innerHTML = html;
    }

    const diff = valA - valB;
    let dialectStr = '';
    if (Math.abs(diff) < 0.05) {
      dialectStr = `<span style="color:#20B2AA;"><b>Affirmation |m̄|₊ ≡ (a = b):</b></span> ${valA.toFixed(1)} = ${valB.toFixed(1)} (Ratio a/b = 1.00)`;
    } else if (diff > 0) {
      dialectStr = `<span style="color:#FFA500;"><b>Negation |m̄|₋ ≡ (a ≠ b ⇒ a &gt; b):</b></span> ${valA.toFixed(1)} &gt; ${valB.toFixed(1)} (Δ = +${diff.toFixed(1)}, Sum = ${(valA + valB).toFixed(1)})`;
    } else {
      dialectStr = `<span style="color:#FFA500;"><b>Negation |m̄|₋ ≡ (a ≠ b ⇒ a &lt; b):</b></span> ${valA.toFixed(1)} &lt; ${valB.toFixed(1)} (Δ = ${diff.toFixed(1)}, Sum = ${(valA + valB).toFixed(1)})`;
    }

    const box = document.getElementById('ch7-plur-readout');
    if (box) {
      if (aspectMode === 'qual') {
        box.innerHTML =
          `<b>Qualitätsaspekt (Regional Pluralism, |I| = ${numS}):</b> Sensory modalities S₁…S_${numS} differ in intrinsic kind ⇒ ` +
          `<span style="color:#9370DB;"><b>Apodiktische Pluralitäten</b></span> (local necessity □_{S_i} only, no global scalar ordering).`;
      } else {
        box.innerHTML =
          `<b>Quantitätsaspekt (Global Unification over Coeff):</b> All ${numS} quantitative channels converge via <b>Mengendialektik</b>:<br>${dialectStr}`;
      }
    }
  };

  // WIDGET 2: §7.1.2 Quantitätssyntrix (SM-28) & Synkolatorraum (m + m^k)
  window.ch7_updateSyntrixCombinatorics = function() {
    const elN = document.getElementById('ch7-syn-n');
    if (!elN) return;
    const n = parseInt(elN.value);
    const elM = document.getElementById('ch7-syn-m');
    elM.max = n;
    const m = Math.min(n, parseInt(elM.value));
    elM.value = m;
    const k = parseInt(document.getElementById('ch7-syn-k').value);

    document.getElementById('ch7-syn-n-val').innerText = n;
    document.getElementById('ch7-syn-m-val').innerText = m;
    document.getElementById('ch7-syn-k-val').innerText = k;

    const comb = binom(n, m);
    const fiberDim = Math.pow(m, k);
    const totalDim = m + fiberDim;

    const svg = document.getElementById('ch7-syn-svg');
    if (svg) {
      let html = `<rect x="12" y="80" width="186" height="26" rx="5" fill="rgba(65,105,225,0.22)" stroke="#4169E1" stroke-width="1.8"/>`;
      html += `<text x="105" y="96" fill="#82aaff" font-size="9.5" font-weight="bold" text-anchor="middle">Base R_${m} ⊆ R_${n} (dim = ${m})</text>`;
      const numFibers = Math.min(m, 6);
      for (let i = 0; i < numFibers; i++) {
        const x = 32 + (i / Math.max(1, numFibers - 1)) * 146;
        html += `<line x1="${x.toFixed(1)}" y1="80" x2="${x.toFixed(1)}" y2="20" stroke="#9370DB" stroke-width="2" stroke-dasharray="3,2"/>`;
        html += `<circle cx="${x.toFixed(1)}" cy="46" r="10" fill="rgba(147,112,219,0.25)" stroke="#FFD700" stroke-width="1.4"/>`;
        html += `<text x="${x.toFixed(1)}" y="49" fill="#FFD700" font-size="8" font-weight="bold" text-anchor="middle">m^k</text>`;
      }
      html += `<text x="105" y="13" fill="#20B2AA" font-size="9" font-weight="bold" text-anchor="middle">Fiber T^⊗${k} R_${m}: dim = ${m}^${k} = ${fiberDim}</text>`;
      svg.innerHTML = html;
    }

    const typeNames = ['Scalar Field (k=0)', 'Vector Field (k=1)', 'Rank-2 Metric/Tensor (k=2)', 'Rank-3 Connection/Tensor (k=3)', 'Rank-4 Curvature Tensor (k=4)'];
    const box = document.getElementById('ch7-syn-readout');
    if (box) {
      box.innerHTML =
        `<b>SM Eq. 28 ⟨f, R_${n}, ${m}⟩:</b> Admissible m-subsets = <b style="color:#FFA500;">C(${n},${m}) = ${comb}</b> | Field Type: <span style="color:#20B2AA;">${typeNames[k] || 'Rank-' + k}</span><br>` +
        `<b>Synkolatorraum M_syn := T^⊗${k} R_${m}:</b> Base (${m}) + Fiber (${m}^${k} = ${fiberDim}) = <b style="color:#FFD700;">dim(M_syn) = ${totalDim}</b>`;
    }
  };

  // WIDGET 3: §7.2.1 Coefficient Poset Coeff & Realification Functor V_R
  window.ch7_selectCoeffField = function(f) {
    coeffField = f;
    window.ch7_updateRealification();
  };

  window.ch7_updateRealification = function() {
    const elN = document.getElementById('ch7-real-n');
    if (!elN) return;
    const n = parseInt(elN.value);
    const deg = parseInt(document.getElementById('ch7-real-theta').value);
    document.getElementById('ch7-real-n-val').innerText = n;
    document.getElementById('ch7-real-theta-val').innerText = deg + '°';

    ['Q', 'R', 'C'].forEach(k => {
      const b = document.getElementById('ch7-btn-field-' + k);
      if (b) {
        if (k === coeffField) {
          b.style.background = '#FFD700'; b.style.color = '#000'; b.style.fontWeight = 'bold';
        } else {
          b.style.background = '#1e293b'; b.style.color = '#FFD700'; b.style.fontWeight = 'normal';
        }
      }
    });

    const dK = (coeffField === 'C') ? 2 : 1;
    const realDim = dK * n;
    const predDim = 3 * dK * n;
    const rad = (deg * Math.PI) / 180.0;
    const cVal = Math.cos(rad);
    const sVal = Math.sin(rad);

    const svg = document.getElementById('ch7-real-svg');
    if (svg) {
      let html = `<polygon points="15,98 155,98 195,62 55,62" fill="rgba(65,105,225,0.20)" stroke="#4169E1" stroke-width="1.6"/>`;
      for (let ix = 0; ix < 4; ix++) {
        for (let iy = 0; iy < 2; iy++) {
          const px = 45 + ix * 32 + iy * 14;
          const py = 90 - iy * 18;
          html += `<circle cx="${px}" cy="${py}" r="${coeffField === 'Q' ? 3.5 : 2.2}" fill="${coeffField === 'Q' ? '#FFD700' : '#82aaff'}"/>`;
        }
      }
      if (coeffField === 'C') {
        html += `<line x1="105" y1="78" x2="105" y2="34" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3,2"/>`;
        html += `<circle cx="105" cy="34" r="22" fill="rgba(32,178,170,0.22)" stroke="#20B2AA" stroke-width="1.8"/>`;
        const vx = 105 + 20 * cVal;
        const vy = 34 - 20 * sVal;
        html += `<line x1="105" y1="34" x2="${vx.toFixed(1)}" y2="${vy.toFixed(1)}" stroke="#FFA500" stroke-width="2.5"/>`;
        html += `<circle cx="${vx.toFixed(1)}" cy="${vy.toFixed(1)}" r="3.5" fill="#FFD700"/>`;
        html += `<text x="155" y="26" fill="#20B2AA" font-size="8.5" font-weight="bold">J_ℂ² = -id</text>`;
      } else {
        html += `<text x="105" y="34" fill="#FFD700" font-size="9.5" font-weight="bold" text-anchor="middle">${coeffField === 'Q' ? 'Scalar Extension ℝ ⊗_ℚ ℚ^n' : 'Identity Real Continuum ℝ^n'}</text>`;
      }
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch7-real-readout');
    if (box) {
      const opStr = coeffField === 'Q'
        ? `Scalar Extension ℝ ⊗_ℚ ℚ^${n}`
        : (coeffField === 'R' ? `Identity Real Space ℝ^${n}` : `Scalar Restriction Res_ℝ^ℂ(ℂ^${n}) with ρ_ℂ(e^{iθ}) = [[${cVal.toFixed(2)}, ${(-sVal).toFixed(2)}], [${sVal.toFixed(2)}, ${cVal.toFixed(2)}]]`);
      box.innerHTML =
        `<b>Field 𝕂 = 𝔸_${coeffField} (d(𝕂) = ${dK}):</b> ${opStr}<br>` +
        `<b>Realified Parameter Space:</b> dim_ℝ((𝕂^${n})_ℝ) = <b>${realDim}</b> | <b>Predicatrix Carrier P^U ≅ ℝ^{3·d(𝕂)·n}:</b> dim_ℝ(P^U) = <b style="color:#FFD700;">${predDim}</b>`;
    }
  };

  // WIDGET 4: §7.2.1 Internal Dedekind Real Object R_E & Locatedness
  window.ch7_updateDedekindCut = function() {
    const elQ = document.getElementById('ch7-ded-q');
    if (!elQ) return;
    let q = parseFloat(elQ.value);
    let r = parseFloat(document.getElementById('ch7-ded-r').value);
    if (q >= r - 0.04) {
      q = Math.max(0.2, r - 0.1);
      elQ.value = q.toFixed(2);
    }
    document.getElementById('ch7-ded-q-val').innerText = q.toFixed(2);
    document.getElementById('ch7-ded-r-val').innerText = r.toFixed(2);

    const alpha = Math.SQRT2; // 1.4142
    const inL = q < alpha;
    const inU = r > alpha;

    const svg = document.getElementById('ch7-ded-svg');
    if (svg) {
      const toX = v => 20 + (v / 2.4) * 380;
      const xAlpha = toX(alpha);
      const xQ = toX(q);
      const xR = toX(r);
      let html = `
        <line x1="20" y1="52" x2="400" y2="52" stroke="#475569" stroke-width="2"/>
        <line x1="20" y1="52" x2="${(xAlpha - 4).toFixed(1)}" y2="52" stroke="#20B2AA" stroke-width="6"/>
        <line x1="${(xAlpha + 4).toFixed(1)}" y1="52" x2="400" y2="52" stroke="#FFA500" stroke-width="6"/>
        <circle cx="${xAlpha.toFixed(1)}" cy="52" r="6" fill="#FFD700" stroke="#000" stroke-width="1.5"/>
        <text x="${xAlpha.toFixed(1)}" y="34" fill="#FFD700" font-size="9.5" font-weight="bold" text-anchor="middle">α = √2 ≈ 1.414</text>
        <circle cx="${xQ.toFixed(1)}" cy="52" r="5" fill="${inL ? '#20B2AA' : '#DC143C'}" stroke="#fff" stroke-width="1.2"/>
        <text x="${xQ.toFixed(1)}" y="76" fill="#5eead4" font-size="9.5" font-weight="bold" text-anchor="middle">q=${q.toFixed(2)}</text>
        <circle cx="${xR.toFixed(1)}" cy="52" r="5" fill="${inU ? '#FFA500' : '#DC143C'}" stroke="#fff" stroke-width="1.2"/>
        <text x="${xR.toFixed(1)}" y="76" fill="#fcd34d" font-size="9.5" font-weight="bold" text-anchor="middle">r=${r.toFixed(2)}</text>
        <text x="65" y="22" fill="#20B2AA" font-size="9.5" font-weight="bold">Lower Cut L (q &lt; α)</text>
        <text x="335" y="22" fill="#FFA500" font-size="9.5" font-weight="bold">Upper Cut U (r &gt; α)</text>
      `;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch7-ded-readout');
    if (box) {
      let witness = [];
      if (inL) witness.push(`<span style="color:#20B2AA;"><b>L(q=${q.toFixed(2)}) = TRUE</b></span>`);
      if (inU) witness.push(`<span style="color:#FFA500;"><b>U(r=${r.toFixed(2)}) = TRUE</b></span>`);
      box.innerHTML =
        `<b>Heyting Locatedness (∀ q &lt; r in ℚ_ℰ, L(q) ∨ U(r)):</b> With q = ${q.toFixed(2)} &lt; r = ${r.toFixed(2)}, ` +
        `witnesses: ${witness.join(' and ')} ⇒ <b style="color:#FFD700;">L(q) ∨ U(r) Verified!</b><br>` +
        `<b>Thm. 7.9 Caveat:</b> ℝ_Cauchy ↪ ℝ_ℰ is a monomorphism (isomorphism requires internal countable choice / local compactness).`;
    }
  };

  // WIDGET 5: §7.2.2 Tensor Operad O_quant Action Ribbon & Cross-Norm
  window.ch7_updateOperadRibbon = function() {
    const elR = document.getElementById('ch7-op-r');
    if (!elR) return;
    const r = parseInt(elR.value);
    const fNorm = parseFloat(document.getElementById('ch7-op-fnorm').value);
    const aNorm = parseFloat(document.getElementById('ch7-op-anorm').value);
    const kOut = parseInt(document.getElementById('ch7-op-k').value);

    document.getElementById('ch7-op-r-val').innerText = r;
    document.getElementById('ch7-op-fnorm-val').innerText = fNorm.toFixed(2);
    document.getElementById('ch7-op-anorm-val').innerText = aNorm.toFixed(2);
    document.getElementById('ch7-op-k-val').innerText = kOut;

    const crossNorm = Math.pow(aNorm, r);
    const outBound = fNorm * crossNorm;

    const svg = document.getElementById('ch7-op-svg');
    if (svg) {
      let html = '';
      for (let i = 0; i < r; i++) {
        const y = 18 + (i / Math.max(1, r - 1)) * 68;
        const ym = r === 1 ? 52 : y;
        html += `<path d="M 55,${ym.toFixed(1)} C 110,${ym.toFixed(1)} 125,52 165,52" fill="none" stroke="#4169E1" stroke-width="2.2"/>`;
        html += `<rect x="10" y="${(ym - 9).toFixed(1)}" width="46" height="18" rx="4" fill="rgba(65,105,225,0.25)" stroke="#4169E1" stroke-width="1.2"/>`;
        html += `<text x="33" y="${(ym + 3.5).toFixed(1)}" fill="#fff" font-size="8.5" text-anchor="middle">A_${i + 1}</text>`;
      }
      html += `<rect x="165" y="26" width="88" height="52" rx="7" fill="rgba(32,178,170,0.25)" stroke="#20B2AA" stroke-width="2"/>`;
      html += `<text x="209" y="48" fill="#20B2AA" font-size="9.5" font-weight="bold" text-anchor="middle">f ∈ O_quant</text>`;
      html += `<text x="209" y="64" fill="#cbd5e1" font-size="8.5" text-anchor="middle">‖f‖_op = ${fNorm.toFixed(2)}</text>`;
      html += `<line x1="253" y1="52" x2="312" y2="52" stroke="#FFA500" stroke-width="3"/>`;
      html += `<rect x="312" y="30" width="98" height="44" rx="6" fill="rgba(255,165,0,0.22)" stroke="#FFA500" stroke-width="1.8"/>`;
      html += `<text x="361" y="49" fill="#FFD700" font-size="9" font-weight="bold" text-anchor="middle">A_out ∈ X_(m,${kOut})</text>`;
      html += `<text x="361" y="64" fill="#fff" font-size="8.5" text-anchor="middle">≤ ${outBound.toFixed(3)}</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch7-op-readout');
    if (box) {
      box.innerHTML =
        `<b>Projective Cross-Norm (⊗̂_π, Arity r=${r}):</b> ∏_{i=1}^${r} ‖A_i‖_{C_b^0} = (${aNorm.toFixed(2)})^${r} = <b>${crossNorm.toFixed(4)}</b><br>` +
        `<b>Def. 7.12 Output Estimate (Rank k=${kOut}):</b> ‖f(A₁,…,A_${r})‖_{C_b^0} ≤ ‖f‖_op · ∏‖A_i‖ = <b style="color:#FFD700;">${outBound.toFixed(4)}</b> ` +
        `<span style="color:#20B2AA;">(O_isom: f(φ_*A_i) = φ_*f(A_i))</span>`;
    }
  };

  // WIDGET 6: §7.3.1 Dimensional Parameter Functor S_n & SO(n) Metropie Geodesic Lab
  window.ch7_updateDimIteratorLab = function() {
    const elL1 = document.getElementById('ch7-dim-l1');
    if (!elL1) return;
    const l1 = parseFloat(elL1.value);
    const l2 = parseFloat(document.getElementById('ch7-dim-l2').value);
    const omega = parseFloat(document.getElementById('ch7-dim-omega').value);

    document.getElementById('ch7-dim-l1-val').innerText = l1.toFixed(1);
    document.getElementById('ch7-dim-l2-val').innerText = l2.toFixed(1);
    document.getElementById('ch7-dim-omega-val').innerText = omega.toFixed(2);

    const y1 = 1.5, y2 = 1.2;
    const w1 = l1 * y1, w2 = l2 * y2;
    const normRn = Math.max(w1, w2);
    // For a 2x2 rotation generator [[0, -omega], [omega, 0]] in so(n), -1/2 tr(A^2) = omega^2
    const gMet = omega * omega;

    const svg = document.getElementById('ch7-dim-svg');
    if (svg) {
      const endX = 115 + 45 * Math.cos(omega * 0.8);
      const endY = 58 - 32 * Math.sin(omega * 0.8);
      let html = `
        <rect x="12" y="10" width="396" height="84" rx="10" fill="rgba(65,105,225,0.08)" stroke="#4169E1" stroke-width="1.4"/>
        <text x="24" y="25" fill="#82aaff" font-size="9" font-weight="bold">Isom⁺(P^U) ≅ SO(n) Cipher Manifold</text>
        <path d="M 45,72 Q 115,24 195,62" fill="none" stroke="#20B2AA" stroke-width="2.6"/>
        <circle cx="45" cy="72" r="5" fill="#20B2AA"/>
        <text x="45" y="86" fill="#20B2AA" font-size="8.5" text-anchor="middle">z(0)=z^U</text>
        <circle cx="195" cy="62" r="5" fill="#20B2AA"/>
        <text x="195" y="76" fill="#20B2AA" font-size="8.5" text-anchor="middle">z(1)=z^V</text>
        <circle cx="115" cy="48" r="4.5" fill="#FFA500"/>
        <line x1="115" y1="48" x2="${endX.toFixed(1)}" y2="${endY.toFixed(1)}" stroke="#DC143C" stroke-width="2.5"/>
        <text x="${(endX + 6).toFixed(1)}" y="${endY.toFixed(1)}" fill="#ff6b81" font-size="8.5" font-weight="bold">ż(t) ∈ 𝔰𝔬(n)</text>
        <rect x="245" y="22" width="150" height="60" rx="6" fill="rgba(15,23,42,0.85)" stroke="#FFA500" stroke-width="1.2"/>
        <text x="320" y="40" fill="#FFA500" font-size="9" font-weight="bold" text-anchor="middle">Weighted Norm ‖y‖_{R_n}</text>
        <text x="320" y="56" fill="#FFD700" font-size="10" font-weight="bold" text-anchor="middle">max(${w1.toFixed(2)}, ${w2.toFixed(2)}) = ${normRn.toFixed(2)}</text>
        <text x="320" y="72" fill="#5eead4" font-size="8.5" text-anchor="middle">g_met(ż,ż) = ${gMet.toFixed(3)}</text>
      `;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch7-dim-readout');
    if (box) {
      box.innerHTML =
        `<b>Def. 7.13 Functor S_n(𝕂, Λ):</b> ‖y‖_{R_n} = max_l λ_l ‖y_l‖_𝕂 = max(${l1.toFixed(1)}×1.5, ${l2.toFixed(1)}×1.2) = <b style="color:#FFD700;">${normRn.toFixed(2)}</b><br>` +
        `<b>Fig. 7.4 Killing–Cartan Metric:</b> g_met(ż, ż) = -½ tr((z⁻¹ż)²) = <b>${gMet.toFixed(3)} ≥ 0</b> ⇒ Geodesic bound d_Ctx(U,V) ≤ ${omega.toFixed(2)}`;
    }
  };

  // WIDGET 7: §7.3.2 Isocline Submersion Foliation f_A & Morse-Bott Center Z_alpha
  window.ch7_updateIsoclineFoliation = function() {
    const elC = document.getElementById('ch7-iso-c');
    if (!elC) return;
    const cVal = parseFloat(elC.value);
    const aniso = parseFloat(document.getElementById('ch7-iso-aniso').value);
    document.getElementById('ch7-iso-c-val').innerText = cVal.toFixed(2);
    document.getElementById('ch7-iso-aniso-val').innerText = aniso.toFixed(1);

    const svg = document.getElementById('ch7-iso-svg');
    if (svg) {
      const ox = 38, oy = 102;
      let html = `
        <line x1="${ox}" y1="${oy}" x2="200" y2="${oy}" stroke="#4169E1" stroke-width="2.2"/>
        <line x1="${ox}" y1="${oy}" x2="${ox}" y2="10" stroke="#4169E1" stroke-width="2.2"/>
        <text x="195" y="${oy + 12}" fill="#82aaff" font-size="8.5" font-weight="bold">y₁ ≥ 0</text>
        <text x="18" y="18" fill="#82aaff" font-size="8.5" font-weight="bold">y₂</text>
      `;
      const levels = [0.6, 1.2, 2.0, 3.0];
      levels.forEach(lv => {
        const rx = 42 * Math.sqrt(lv);
        const ry = (42 * Math.sqrt(lv)) / Math.sqrt(aniso);
        const isSel = Math.abs(lv - cVal) < 0.35;
        let pts = [];
        for (let s = 0; s <= 24; s++) {
          const ang = (s / 24) * (Math.PI / 2);
          const px = ox + rx * Math.cos(ang);
          const py = oy - ry * Math.sin(ang);
          if (px <= 202 && py >= 6) {
            pts.push((pts.length === 0 ? 'M ' : 'L ') + px.toFixed(1) + ',' + py.toFixed(1));
          }
        }
        if (pts.length > 1) {
          html += `<path d="${pts.join(' ')}" fill="none" stroke="${isSel ? '#FFD700' : '#20B2AA'}" stroke-width="${isSel ? 2.8 : 1.5}"/>`;
        }
      });
      // Active level curve cVal
      const rxC = 42 * Math.sqrt(cVal);
      const ryC = (42 * Math.sqrt(cVal)) / Math.sqrt(aniso);
      let ptsC = [];
      for (let s = 0; s <= 28; s++) {
        const ang = (s / 28) * (Math.PI / 2);
        const px = ox + rxC * Math.cos(ang);
        const py = oy - ryC * Math.sin(ang);
        if (px <= 202 && py >= 6) {
          ptsC.push((ptsC.length === 0 ? 'M ' : 'L ') + px.toFixed(1) + ',' + py.toFixed(1));
        }
      }
      if (ptsC.length > 1) {
        html += `<path d="${ptsC.join(' ')}" fill="none" stroke="#FFD700" stroke-width="3"/>`;
      }
      // Gradient arrow at 45 deg
      const gx0 = ox + rxC * Math.cos(Math.PI / 4);
      const gy0 = oy - ryC * Math.sin(Math.PI / 4);
      const gx1 = ox + 0.65 * rxC * Math.cos(Math.PI / 4);
      const gy1 = oy - 0.65 * ryC * Math.sin(Math.PI / 4);
      if (cVal > 0.08 && gx0 <= 200 && gy0 >= 8) {
        html += `<line x1="${gx0.toFixed(1)}" y1="${gy0.toFixed(1)}" x2="${gx1.toFixed(1)}" y2="${gy1.toFixed(1)}" stroke="#FFA500" stroke-width="2.2"/>`;
        html += `<circle cx="${gx1.toFixed(1)}" cy="${gy1.toFixed(1)}" r="2.8" fill="#FFA500"/>`;
      }
      // Fehlstelle 0 (Field Center)
      html += `<circle cx="${ox}" cy="${oy}" r="6" fill="#DC143C" stroke="#fff" stroke-width="1.5"/>`;
      html += `<text x="${ox + 48}" y="${oy - 6}" fill="#ff6b81" font-size="8.5" font-weight="bold">Z_α = {0} (Fehlstelle)</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch7-iso-readout');
    if (box) {
      if (cVal < 0.08) {
        box.innerHTML =
          `<span style="color:#ff6b81;"><b>⚠ AT CRITICAL FIELD CENTER Z(A, g_m, Φ) = {(0,0)} (Fehlstelle 0):</b></span><br>` +
          `d(Φ ∘ A)_0 = (2y₁, 2αy₂) = (0, 0) ⇒ Rank = 0 &lt; d=1. Isolated 0D Morse–Bott minimum Z_α!`;
      } else {
        box.innerHTML =
          `<b>Regular Submersion Locus R_2^reg (c = ${cVal.toFixed(2)} &gt; 0):</b> d(y₁² + ${aniso.toFixed(1)}y₂²) ≠ 0 ⇒ <b>rank(dA_y) = d = 1</b>.<br>` +
          `<b>Isokline Σ_c:</b> Smooth embedded 1D submanifold of <b>codimension d = 1</b> in foliation 𝔣_A, orthogonal to −∇Φ!`;
      }
    }
  };

  // WIDGET 8: §7.3.3 Layered Field Cascade Norm Bound Simulator (Thm. 7.19)
  window.ch7_updateCascadeBound = function() {
    const elM = document.getElementById('ch7-casc-m');
    if (!elM) return;
    const M = parseInt(elM.value);
    const r = parseInt(document.getElementById('ch7-casc-r').value);
    const C = parseFloat(document.getElementById('ch7-casc-c').value);
    const a0 = parseFloat(document.getElementById('ch7-casc-a0').value);

    document.getElementById('ch7-casc-m-val').innerText = M;
    document.getElementById('ch7-casc-r-val').innerText = r;
    document.getElementById('ch7-casc-c-val').innerText = C.toFixed(2);
    document.getElementById('ch7-casc-a0-val').innerText = a0.toFixed(2);

    let vals = [a0];
    let D_g = 1;
    let Gamma_g = 1.0;
    for (let g = 1; g <= M; g++) {
      D_g = Math.pow(r, g);
      // For uniform C_j = C and r_j = r, prod_{j=1}^g C^(r^(g-j)) = C^(sum_{k=0}^{g-1} r^k)
      let expSum = 0;
      for (let k = 0; k < g; k++) expSum += Math.pow(r, k);
      Gamma_g = Math.pow(C, expSum);
      vals.push(Gamma_g * Math.pow(a0, D_g));
    }

    const svg = document.getElementById('ch7-casc-svg');
    if (svg) {
      const maxVal = Math.max(2.0, ...vals.map(v => Math.min(v, 25)));
      let html = `
        <line x1="35" y1="98" x2="395" y2="98" stroke="#475569" stroke-width="1.8"/>
        <line x1="35" y1="98" x2="35" y2="12" stroke="#475569" stroke-width="1.8"/>
      `;
      let pts = [];
      for (let g = 0; g <= M; g++) {
        const px = 35 + (g / M) * 340;
        const clamped = Math.min(vals[g], 25);
        const py = 98 - (clamped / maxVal) * 78;
        pts.push((g === 0 ? 'M ' : 'L ') + px.toFixed(1) + ',' + py.toFixed(1));
      }
      const lineCol = vals[M] <= 1.001 ? '#20B2AA' : '#FFA500';
      html += `<path d="${pts.join(' ')}" fill="none" stroke="${lineCol}" stroke-width="3"/>`;
      for (let g = 0; g <= M; g++) {
        const px = 35 + (g / M) * 340;
        const clamped = Math.min(vals[g], 25);
        const py = 98 - (clamped / maxVal) * 78;
        html += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4.5" fill="#FFD700" stroke="#000" stroke-width="1"/>`;
        html += `<text x="${px.toFixed(1)}" y="111" fill="#cbd5e1" font-size="8.5" text-anchor="middle">γ=${g}</text>`;
        const vStr = vals[g] > 999 ? vals[g].toExponential(1) : vals[g].toFixed(2);
        html += `<text x="${px.toFixed(1)}" y="${Math.max(11, py - 7).toFixed(1)}" fill="#FFD700" font-size="8" font-weight="bold" text-anchor="middle">${vStr}</text>`;
      }
      svg.innerHTML = html;
    }

    const finalBound = vals[M];
    const finalStr = finalBound > 1e4 ? finalBound.toExponential(3) : finalBound.toFixed(4);
    const gammaStr = Gamma_g > 1e4 ? Gamma_g.toExponential(3) : Gamma_g.toFixed(4);
    const box = document.getElementById('ch7-casc-readout');
    if (box) {
      let regimeNote = '';
      if (a0 === 0) {
        regimeNote = `<span style="color:#20B2AA;"><b>Zero-Field Vacuum Stability (§7.5 Check 3):</b> A₀ ≡ 0 ⇒ A_M ≡ 0!</span>`;
      } else if (r === 1) {
        regimeNote = `<span style="color:#20B2AA;"><b>Linear Unary Cascade (§7.5 Check 1):</b> r_j = 1 ⇒ D_M = 1, Γ_M = C^M = ${gammaStr}</span>`;
      } else if (finalBound <= 1.0) {
        regimeNote = `<span style="color:#20B2AA;"><b>Contractive Unit-Ball Regime:</b> Monomial bound stays ≤ 1 across all ${M} stages!</span>`;
      } else {
        regimeNote = `<span style="color:#FFA500;"><b>Finite-Depth Polynomial Safety Bound:</b> Finite &lt; ∞ at depth M=${M} (no blow-up).</span>`;
      }
      box.innerHTML =
        `<b>Thm. 7.19 Closed Form (Stage M=${M}):</b> Degree <b style="color:#20B2AA;">D_${M} = ∏ r_j = ${r}^${M} = ${D_g}</b> | Constant <b style="color:#FFA500;">Γ_${M} = ${gammaStr}</b><br>` +
        `<b>Estimate:</b> ‖A_${M}‖_{C_b^0} ≤ Γ_${M} ‖A₀‖^{D_${M}} = <b style="color:#FFD700;">${finalStr}</b> | ${regimeNote}`;
    }
  };

  // ---------------------------------------------------------------------------
  // VIDEO CONTROL & INIT BOILERPLATE (IIFE-isolated for combined deck safety)
  // ---------------------------------------------------------------------------
  function prepareVideos() {
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'auto';
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('muted', '');
      v.setAttribute('loop', '');
      v.setAttribute('preload', 'auto');
    });
  }

  function syncVideosToSlide() {
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
      || window.innerWidth <= 768;

    const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
    const winH = window.innerHeight || document.documentElement.clientHeight;
    const winW = window.innerWidth || document.documentElement.clientWidth;

    document.querySelectorAll('video').forEach(v => {
      let shouldPlay = false;
      if (isScroll) {
        const rect = v.getBoundingClientRect();
        const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
        shouldPlay = inView;
      } else {
        shouldPlay = current ? current.contains(v) : true;
      }

      if (shouldPlay) {
        v.muted = true;
        v.playsInline = true;
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      } else if (!v.paused) {
        v.pause();
      }
    });
  }

  // Ensure continuous sync on mobile scroll and touch gestures
  if (typeof window !== 'undefined') {
    window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
    window.__syn_video_sync_handlers.push(syncVideosToSlide);
    if (!window.__syn_video_scroll_hooked) {
      window.__syn_video_scroll_hooked = true;
      const runSync = () => {
        (window.__syn_video_sync_handlers || []).forEach(fn => {
          try { fn(); } catch (_) {}
        });
      };
      window.addEventListener('scroll', runSync, { passive: true });
      window.addEventListener('touchmove', runSync, { passive: true });
      window.addEventListener('resize', runSync, { passive: true });
      let synMediaUnlocked = false;
      function synUnlockMedia() {
        if (synMediaUnlocked) return;
        synMediaUnlocked = true;
        runSync();
      }
      document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
      document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
    }
  }

  function renderAllCh7Widgets() {
    window.ch7_updatePluralismLab();
    window.ch7_updateSyntrixCombinatorics();
    window.ch7_updateRealification();
    window.ch7_updateDedekindCut();
    window.ch7_updateOperadRibbon();
    window.ch7_updateDimIteratorLab();
    window.ch7_updateIsoclineFoliation();
    window.ch7_updateCascadeBound();
  }

  function bindControlsOnce() {
    document.querySelectorAll('input[type="range"], select, button').forEach(el => {
      if (el.dataset.synBound) return;
      el.dataset.synBound = '1';
      el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());
    });
  }

  let ch7Initialised = false;
  function initChapter7() {
    if (ch7Initialised) return;
    ch7Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh7Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter7);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter7();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter7();
  }
})();

// =========================================================================
// CHAPTER 7: 60FPS 3D INTERACTIVE REALIFICATION, ISOCLINE & CASCADE ENGINE
// =========================================================================

const CH7_3D_STYLE = `
#ch7-3d-hud {
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

#ch7-3d-hud *, #ch7-3d-hud *::before, #ch7-3d-hud *::after {
  box-sizing: border-box;
}

#ch7-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch7-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch7-3d-hud.minimized .ch7-hud-body {
  display: none;
}

.ch7-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch7-hud-title {
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

.ch7-hud-title span:first-child {
  line-height: 1.15;
}

.ch7-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch7-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch7-hud-btn {
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

.ch7-hud-btn:hover, .ch7-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch7-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch7-canvas-wrap:active {
  cursor: grabbing;
}

#ch7-3d-hud.spotlight .ch7-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch7-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch7-overlay-bar {
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

.ch7-telemetry {
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

#ch7-node-inspector {
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

.ch7-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch7-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch7-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch7-scrubber .ch7-hud-btn {
  flex-shrink: 0;
}

#ch7-caption {
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
  #ch7-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch7-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch7-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch7-hud-controls {
    gap: 3px;
  }
  .ch7-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch7-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch7-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch7-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch7-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch7-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch7-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch7-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch7-hud-controls {
    gap: 3px;
  }
  .ch7-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch7-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch7-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch7-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch7-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch7-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch7-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch7-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH7_3D_HTML = `
<div class="ch7-hud-header">

    <div class="ch7-hud-title">

      <span>📐 Ch 7 · 3D Quantitative Site Engine</span>

      <span id="ch7-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch7-hud-controls">

      <button class="ch7-hud-btn active" id="ch7-btn-orbit" onclick="toggleCh7Orbit()">⟳ Orbit</button>

      <button class="ch7-hud-btn" onclick="toggleCh7Spotlight()">⛶ Spotlight</button>

      <button class="ch7-hud-btn" id="ch7-btn-min" onclick="toggleCh7Minimize()">+</button>

    </div>

  </div>



  <div class="ch7-hud-body">

    <div class="ch7-canvas-wrap" id="ch7-canvas-wrap">

      <canvas id="ch7-3d-canvas"></canvas>

      <div class="ch7-overlay-bar">

        <div class="ch7-telemetry" id="ch7-telemetry">Coeff = [ℚ ⊆ ℝ ⊆ ℂ] | ℰ_quant</div>

        <div id="ch7-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch7-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <button class="ch7-hud-btn" title="Previous Stage" onclick="window.setCh7Stage(Math.round( parseFloat(document.getElementById('ch7-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch7-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh7Stage(this.value)">
      <button class="ch7-hud-btn" title="Next Stage" onclick="window.setCh7Stage(Math.round( parseFloat(document.getElementById('ch7-slider').value) ) + 1, true)">▶</button>

      <button class="ch7-hud-btn active" id="ch7-btn-sync" onclick="enableCh7Sync()">Auto-Sync</button>

    </div>



    <div id="ch7-caption">

      <b>Stage 1 (§7.1.1 — Anthropomorphic Pivot):</b> Regional Qualitätsaspekte (□_{S_i}) vs. Global Quantitätsaspekt over [ℚ ⊆ ℝ ⊆ ℂ].

    </div>

  </div>
`;

function injectCh73DHUD() {
  if (document.getElementById('ch7-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH7_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch7-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH7_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch7_3d_engine_loaded) return;
  window.__ch7_3d_engine_loaded = true;

  function runCh7Engine() {
    injectCh73DHUD();
    if (window.__ch7_3d_engine_initialized) return;
    window.__ch7_3d_engine_initialized = true;

const canvas = document.getElementById('ch7-3d-canvas');

  const wrap = document.getElementById('ch7-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.48;

  let camPitch = 0.36;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§7.1.1 — Anthropomorphic Pivot):</b> 5 regional Qualitätsaspekte (S_i) vs. global Quantitätsaspekt via Mengendialektik.",

    2: "<b>Stage 2 (§7.1.2 — SM-28 Quantitätssyntrix):</b> Semantic Iterator S_n ; ã = R_n &amp; Synkolatorraum M_syn = T^{⊗k}R_m (dim m + m^k).",

    3: "<b>Stage 3 (§7.2.1 — Def. 7.2 Realification Bundle (V)_ℝ):</b> Discrete ℚ^n lattice ⊂ ℝ^n continuum beneath complex phase fibers (ℂ^n)_ℝ ≅ ℝ^{2n}.",

    4: "<b>Stage 4 (§7.2.1 — Prop. 7.5 Pullbacks in Ctx_quant):</b> Cospan 𝕂_{V₁} ↪ 𝕂_U ↩ 𝕂_{V₂} meets at 𝕂_W = min(𝕂_{V₁}, 𝕂_{V₂}) on P^U ≅ ℝ^{3d(𝕂)n}.",

    5: "<b>Stage 5 (§7.2.1 — Thms. 7.7 &amp; 7.9 Topos ℰ_quant &amp; Dedekind Reals):</b> Geometric morphism π_quant : ℰ_quant → ℰ_syn &amp; located cut (L, U) ∈ ℝ_ℰ.",

    6: "<b>Stage 6 (§7.2.2 — Def. 7.12 Colored Tensor Operad 𝒪_quant):</b> Multilinear contraction X_{(m_i,k_i)} ⊗̂_π … → X_{(m,k)} &amp; isometric suboperad 𝒪_isom.",

    7: "<b>Stage 7 (§7.3.1 — Def. 7.13 Dimensional Functor S_n &amp; SO(n) Metropie):</b> Scaling matrix Λ = diag(λ_l) &amp; Killing–Cartan geodesic g_met(ż, ż).",

    8: "<b>Stage 8 (§7.3.2 — Def. 7.15 Isocline Foliation 𝔣_A &amp; Centers Z_α):</b> Regular level surfaces Σ_c = (ᵐĀ)⁻¹(c) around Morse–Bott Fehlstelle 0 ∈ Z_α.",

    9: "<b>Stage 9 (§7.3.3 — Def. 7.16 &amp; Prop. 7.17 Musical Pullback π_γ^⊛):</b> Unit frame A₀ (‖A₀‖=1) lifted across submanifolds via ♯_g ∘ π_γ* ∘ ♭_g.",

    10: "<b>Stage 10 (§7.3.3–7.6 — Thm. 7.19 Cascade Monomial Norm Bound):</b> Layered Strukturkaskade bounded by ‖A_γ‖_{C_b⁰} ≤ Γ_γ ‖A₀‖^{D_γ} (D_γ = ∏ r_j)!"

  };



  const STAGE_TELEMETRY = {

    1: "S_human = ⋃ S_i | Mengendialektik (= vs ≶)",

    2: "S_n ; ã = R_n (SM-28) | dim M_syn = m + m^k",

    3: "dim_ℝ((𝕂^n)_ℝ) = d(𝕂)n | J_ℂ² = −id",

    4: "P^U ≅ ℝ^{3d(𝕂_U)n_U} | 𝕂_W = 𝕂_{V₁} ∩ 𝕂_{V₂}",

    5: "π_quant* ⊣ π_quant* : ℰ_quant → ℰ_syn",

    6: "X_{(m,k)} = Γ_b⁰(R_m, T^{⊗k}R_m) | 𝒪_quant",

    7: "‖y‖_{R_n} = max_l λ_l‖y_l‖_𝕂 | g_met ≥ 0",

    8: "Σ_c = (ᵐĀ)⁻¹(c) ∩ R_m^reg | d(Φ∘A)_y = 0",

    9: "π_γ^⊛ = ♯_g^{⊗k} ∘ π_γ* ∘ ♭_g^{⊗k} | ‖A₀‖ = 1",

    10: "‖A_M‖_{C_b⁰} ≤ Γ_M ‖A₀‖_{C_b⁰}^{D_M} (Thm. 7.19)"

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



  // =========================================================================

  // STAGE RENDERERS (STAGES 1 TO 10)

  // =========================================================================



  // Stage 1: Anthropomorphic Pivot — 5 Regional Qualitätsaspekte vs Global Quantitätsaspekt

  function renderStage1(w, h) {

    const pHub = drawNode3D("Quant_Hub", 0, 0, 0.85, 11.5, "#FFD700", "#20B2AA", "Quantitätsaspekt [ℚ⊆ℝ⊆ℂ]", "Global Quantitative Unification via Mengendialektik (a = b vs. a ≶ b)", w, h);

    const quals = ["S₁ (Color)", "S₂ (Timbre)", "S₃ (Valence)", "S₄ (Tactile)", "S₅ (Normative)"];

    const cols  = ["#4169E1", "#20B2AA", "#FFA500", "#9370DB", "#ff6b81"];

    for (let i = 0; i < 5; i++) {

      const a = timeSec * 0.4 + (i / 5) * Math.PI * 2;

      const x = 1.25 * Math.cos(a), y = 1.25 * Math.sin(a), z = -0.75;

      const pQ = drawNode3D("Qual_" + i, x, y, z, 7.5, cols[i], "#fff", quals[i], `Regional Apodiktische Pluralität ${quals[i]} (Local necessity □_{S_${i+1}} only)`, w, h);

      drawLine3D(pQ, pHub, "rgba(255,215,0,0.55)", 2.0, [4, 3]);

    }

  }



  // Stage 2: Quantitätssyntrix (SM-28) & Synkolatorraum M_syn = T^{\otimes k}R_m (dim m + m^k)

  function renderStage2(w, h) {

    const pSing = drawNode3D("Sing_a", -1.25, 0, -0.85, 8, "#4169E1", "#fff", "ã = (a_i)_q", "Singularer Metrophor: Pure dimensionless constants in 𝕂^q (SM p. 125)", w, h);

    const pSem  = drawNode3D("Sem_Rn",  0.00, 0, -0.15, 9.5, "#20B2AA", "#FFD700", "R_n = S_n ; ã", "Semantischer Metrophor: Dimensioned parameter continuum via Iterator S_n (SM-28)", w, h);

    const pSynk = drawNode3D("Synk_M",  1.15, 0,  0.85, 11, "#FFD700", "#FFA500", "M_syn (dim m+m^k)", "Synkolatorraum Total Bundle T^{⊗k}R_m hosting Synkolationsfeld ᵐĀ", w, h);



    drawLine3D(pSing, pSem, "#20B2AA", 3.0);

    drawLine3D(pSem, pSynk, "#FFD700", 3.0);



    // C(n, m) coordinate selection rays fanning from R_n to M_syn

    for (let k = -2; k <= 2; k++) {

      const pMid = proj(0.55, k * 0.35, 0.35, w, h);

      drawLine3D(pSem, pMid, "rgba(255,165,0,0.45)", 1.5);

      drawLine3D(pMid, pSynk, "rgba(255,215,0,0.45)", 1.5);

    }

  }



  // Stage 3: 3D Realification Bundle (V)_R over Q^n \subset R^n with C^n Phase Circles (Def. 7.2)

  function renderStage3(w, h) {

    // Base Continuum Plane R^2 & Discrete Rational Lattice Q^2 at z = -0.85

    for (let ix = -1; ix <= 1; ix++) {

      for (let iy = -1; iy <= 1; iy++) {

        const gx = ix * 0.95, gy = iy * 0.85;

        const pLat = drawNode3D(

          `Q_${ix}_${iy}`, gx, gy, -0.85, 5, "#4169E1", "#fff",

          (ix === 0 && iy === 0) ? "ℚ^n ⊂ ℝ^n" : "",

          `Rational Lattice Node (${ix},${iy}) ∈ ℚ² embedded in Realified Continuum (ℝ²)_ℝ`, w, h

        );

        // Above each node, a Complex Phase Circle (\mathbb{C})_{\mathbb{R}} \cong \mathbb{R}^2 driven by J_{\mathbb{C}}

        if (Math.abs(ix) + Math.abs(iy) <= 1) {

          const cz = 0.45;

          ctx.beginPath();

          ctx.strokeStyle = "#FFD700";

          ctx.lineWidth = 2.0;

          for (let s = 0; s <= 28; s++) {

            const a = (s / 28) * Math.PI * 2;

            const pC = proj(gx + 0.32 * Math.cos(a), gy + 0.32 * Math.sin(a), cz, w, h);

            if (s === 0) ctx.moveTo(pC.sx, pC.sy); else ctx.lineTo(pC.sx, pC.sy);

          }

          ctx.stroke();

          drawLine3D(pLat, proj(gx, gy, cz, w, h), "rgba(32,178,170,0.55)", 1.6, [3, 2]);

          const rotA = timeSec * 2.2 + ix + iy;

          drawNode3D(

            `C_fib_${ix}_${iy}`, gx + 0.32 * Math.cos(rotA), gy + 0.32 * Math.sin(rotA), cz,

            5.5, "#FFD700", "#000", (ix === 0 && iy === 0) ? "J_ℂ (d(ℂ)=2)" : "",

            "Realified Complex Fiber (ℂ)_ℝ ≅ ℝ²: ρ_ℂ(i) = J_ℂ with J_ℂ² = −id, ‖J_ℂ‖_op = 1", w, h

          );

        }

      }

    }

  }



  // Stage 4 & 5: Pullbacks in Ctx_quant, Geometric Morphism \pi_{quant} & Internal Dedekind Cut (L, U)

  function renderStage4And5(w, h, st) {

    const isStage5 = (st >= 4.5);

    // Upper Ctx_quant / E_quant Pullback Diamond

    const pU  = drawNode3D("UQ",  0.0,  0.85, 0.75, 8.5, "#FFD700", "#fff", "U_Q (𝕂_U = ℂ)", "Target Quantitative Context U_Q with carrier P^U ≅ ℝ^{6n}", w, h);

    const pV1 = drawNode3D("V1Q", -1.1, 0.0,  0.75, 8,   "#20B2AA", "#fff", "V_{1,Q} (𝕂 = ℝ)", "Subcontext V_{1,Q} over ℝ", w, h);

    const pV2 = drawNode3D("V2Q",  1.1, 0.0,  0.75, 8,   "#FFA500", "#fff", "V_{2,Q} (𝕂 = ℚ)", "Subcontext V_{2,Q} over ℚ", w, h);

    const pW  = drawNode3D("WQ",   0.0, -0.85, 0.75, 9,  "#4169E1", "#FFD700", "W_Q (𝕂_W = min = ℚ)", "Pullback Context W_Q in Ctx_quant: 𝕂_W = 𝕂_{V₁} ∩ 𝕂_{V₂} = ℚ (Prop. 7.5)", w, h);

    drawLine3D(pW, pV1, "#4169E1", 2.4);

    drawLine3D(pW, pV2, "#4169E1", 2.4);

    drawLine3D(pV1, pU, "#20B2AA", 2.4);

    drawLine3D(pV2, pU, "#FFA500", 2.4);



    // Stage 5: Internal Dedekind Cut Axis (L, U) locating \sqrt{2} \in \mathbb{R}_{\mathcal{E}} at z = -0.85

    if (isStage5) {

      const pL = drawNode3D("Ded_L", -1.25, 0, -0.85, 7.5, "#20B2AA", "#fff", "Lower Cut L(q)", "Inhabited Downward-Closed Rational Subsheaf L ⊂ ℚ_ℰ (q < √2)", w, h);

      const pR = drawNode3D("Ded_U",  1.25, 0, -0.85, 7.5, "#FFA500", "#fff", "Upper Cut U(r)", "Inhabited Upward-Closed Rational Subsheaf U ⊂ ℚ_ℰ (r > √2)", w, h);

      const pCut = drawNode3D("Ded_Alpha", 0, 0, -0.85, 9.5, "#FFD700", "#DC143C", "α ∈ ℝ_ℰ (L(q) ∨ U(r))", "Internal Dedekind Real Object ℝ_ℰ in ℰ_quant (Def. 7.8, Thm. 7.9)", w, h);

      drawLine3D(pL, pCut, "#20B2AA", 3.2);

      drawLine3D(pCut, pR, "#FFA500", 3.2);

      drawLine3D(pW, pCut, "rgba(255,215,0,0.55)", 2.0, [4, 3]);

    }

  }



  // Stage 6: Colored Tensor Operad \mathcal{O}_{quant} & Isometric Suboperad \mathcal{O}_{isom} (Def. 7.12)

  function renderStage6(w, h) {

    const inputs = [

      { id: "In_1", x: -1.2, y: -0.7, z: -0.9, col: "#4169E1", lbl: "A₁ ∈ X_{(m₁,k₁)}" },

      { id: "In_2", x:  0.0, y:  0.9, z: -0.9, col: "#20B2AA", lbl: "A₂ ∈ X_{(m₂,k₂)}" },

      { id: "In_3", x:  1.2, y: -0.7, z: -0.9, col: "#FFA500", lbl: "A₃ ∈ X_{(m₃,k₃)}" }

    ];

    const pCorolla = drawNode3D("Op_f", 0, 0, 0.1, 10.5, "#9370DB", "#FFD700", "f ∈ 𝒪_quant (r=3)", "Bounded Multilinear Operator f on X₁ ⊗̂_π X₂ ⊗̂_π X₃ (G_m-Equivariant 𝒪_isom)", w, h);

    const pOut = drawNode3D("Out_A", 0, 0, 1.15, 11, "#FFD700", "#fff", "ᵐĀ = f(A₁,A₂,A₃) ∈ X_{(m,k)}", "Output Bounded Continuous Rank-k Tensor Section: ‖f(A₁,A₂,A₃)‖_{C_b⁰} ≤ ‖f‖ ∏ ‖A_i‖", w, h);



    inputs.forEach(inp => {

      const pIn = drawNode3D(inp.id, inp.x, inp.y, inp.z, 7.5, inp.col, "#fff", inp.lbl, `Bounded Continuous Tensor Field ${inp.lbl} = Γ_b⁰(R_{m_i}, T^{⊗k_i}R_{m_i})`, w, h);

      drawLine3D(pIn, pCorolla, inp.col, 2.5);

    });

    drawLine3D(pCorolla, pOut, "#FFD700", 3.4);

  }



  // Stage 7: Dimensional Parameter Functor S_n (\Lambda = diag(\lambda_l)) & SO(n) Metropie Geodesic

  function renderStage7(w, h) {

    // Anisotropic Weighted Norm Ellipsoid \Lambda = diag(\lambda_1, \lambda_2, \lambda_3)

    const rx = 1.35, ry = 0.85, rz = 0.65;

    for (let plane = 0; plane < 3; plane++) {

      ctx.beginPath();

      ctx.strokeStyle = plane === 0 ? "#4169E1" : (plane === 1 ? "#20B2AA" : "#FFA500");

      ctx.lineWidth = 2.0;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const x = plane === 2 ? 0 : rx * Math.cos(a);

        const y = plane === 0 ? ry * Math.sin(a) : (plane === 1 ? 0 : ry * Math.cos(a));

        const z = plane === 0 ? 0 : rz * Math.sin(a);

        const p = proj(x, y, z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    // Geodesic Metropie Trajectory z(t) = z^U \exp(t \Omega) on SO(n)

    const gAng = timeSec * 1.5;

    drawNode3D("Sn_Origin", 0, 0, 0, 9.5, "#FFD700", "#000", "S_n(𝕂, Λ) = R_n", "Dimensional Parameter Functor S_n : DimField_Λ → Ban_≤1 (‖y‖_{R_n} = max λ_l‖y_l‖)", w, h);

    drawNode3D("SO_Geod", rx * Math.cos(gAng), ry * Math.sin(gAng), 0, 7.5, "#DC143C", "#FFD700", "z(t) ∈ SO(n)", "Killing–Cartan Metropie Geodesic: g_met(ż, ż) = −½ tr((z⁻¹ż)²) ≥ 0 (Fig. 7.4)", w, h);

  }



  // Stage 8: Isocline Submersion Foliation \mathfrak{f}_A & Morse-Bott Field Center Z_\alpha (Def. 7.15)

  function renderStage8(w, h) {

    // Nested Isocline Level Rings \Sigma_c = ({}^m\bar{A})^{-1}(c) on Paraboloid \Phi(A) = y_1^2 + y_2^2

    [0.35, 0.72, 1.08, 1.42].forEach((rad, idx) => {

      const z = -0.95 + 0.85 * rad * rad;

      ctx.beginPath();

      ctx.strokeStyle = idx === 2 ? "#FFD700" : "#20B2AA";

      ctx.lineWidth = idx === 2 ? 2.8 : 1.8;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    });

    // Inward Gradient Flow Rays -\nabla \Phi toward Morse-Bott Center Z_\alpha = {0}

    for (let k = 0; k < 4; k++) {

      const a = (k / 4) * Math.PI * 2 + timeSec * 0.4;

      drawLine3D(proj(1.42 * Math.cos(a), 1.42 * Math.sin(a), 0.76, w, h), proj(0, 0, -0.95, w, h), "rgba(255,165,0,0.55)", 1.8, [4, 2]);

    }

    drawNode3D("Z_alpha", 0, 0, -0.95, 10, "#DC143C", "#FFD700", "Z_α = {0} (Feldzentrum)", "Morse–Bott Critical Submanifold Z(A, g_m, Φ) where d(Φ∘A)_y = 0 (Fehlstelle 0)", w, h);

    drawNode3D("Iso_Sig", 1.08, 0, -0.95 + 0.85 * 1.08 * 1.08, 7, "#FFD700", "#000", "Σ_c ∈ 𝔣_A", "Regular Codimension-d Isocline Submanifold Σ_c on R_m^reg (Def. 7.15)", w, h);

  }



  // Stage 9 & 10: Musical Pullbacks \pi_\gamma^\circledast & Layered Cascade Norm Bound (Thm. 7.19)

  function renderStage9And10(w, h, st) {

    const isStage10 = (st >= 9.5);

    const stages = [

      { g: 0, z: -1.10, r: 1.00, col: "#4169E1", lbl: "X₀: A₀ (‖A₀‖ = 1)" },

      { g: 1, z: -0.38, r: 0.85, col: "#20B2AA", lbl: "X₁: A₁ = f₁(A₀)" },

      { g: 2, z:  0.35, r: 0.68, col: "#FFA500", lbl: "X₂: A₂ = f₂(π₂^⊛ A₁)" },

      { g: 3, z:  1.10, r: 0.52, col: "#FFD700", lbl: "X_M: ‖A_M‖ ≤ Γ_M ‖A₀‖^{D_M}" }

    ];

    let prev = null;

    stages.forEach(s => {

      // Norm Bound Envelope Ring at Stage \gamma

      ctx.beginPath();

      ctx.strokeStyle = s.col;

      ctx.lineWidth = 2.0;

      for (let i = 0; i <= 36; i++) {

        const a = (i / 36) * Math.PI * 2;

        const p = proj(s.r * Math.cos(a), s.r * Math.sin(a), s.z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();



      const pNode = drawNode3D(

        "Casc_" + s.g, 0, 0, s.z, 8 + s.g * 0.8, s.col, "#fff", s.lbl,

        isStage10

          ? `Thm. 7.19 Monomial Bound: ‖A_${s.g}‖_{C_b⁰} ≤ Γ_${s.g} ‖A₀‖^{D_${s.g}} (D_γ = ∏ r_j)`

          : `Prop. 7.17 Contravariant Musical Pullback π_${s.g}^⊛ = ♯_g ∘ π* ∘ ♭_g`, w, h

      );

      if (prev) drawLine3D(prev, pNode, "#FFD700", 3.0);

      prev = pNode;

    });

  }



  // Master 60fps Loop

  function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch7-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }

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



    function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);

    else if (stInt === 2) renderStage2(w, h);

    else if (stInt === 3) renderStage3(w, h);

    else if (stInt === 4 || stInt === 5) renderStage4And5(w, h, stArg);

    else if (stInt === 6) renderStage6(w, h);

    else if (stInt === 7) renderStage7(w, h);

    else if (stInt === 8) renderStage8(w, h);

    else renderStage9And10(w, h, stArg);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh7Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch7-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch7-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch7-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch7-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch7-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh7Stage = function(val) { window.setCh7Stage(val, true); };



  window.enableCh7Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch7-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh7WithDeck();

  };



  window.toggleCh7Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch7-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh7Spotlight = function() {

    const hud = document.getElementById('ch7-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh7Minimize = function() {

    const hud = document.getElementById('ch7-3d-hud');

    const b = document.getElementById('ch7-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh7WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch7-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-7, section[data-chapter="7"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.setCh7Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh7WithDeck = syncCh7WithDeck;
  }



  // 3D Orbit Drag, Wheel Zoom & Node Click Hit-Testing

  wrap.addEventListener('mousedown', e => {

    e.stopPropagation();

    isDragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mousemove', e => {

    if (!isDragging) return;

    camYaw += (e.clientX - lastX) * 0.012;

    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));

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

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    camYaw += dx * 0.012;
    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('mouseup', () => { isDragging = false; });



  wrap.addEventListener('click', e => {

    e.stopPropagation();

    const rect = canvas.getBoundingClientRect();

    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    let hit = null;

    for (let i = hitNodes.length - 1; i >= 0; i--) {

      const n = hitNodes[i];

      if (Math.hypot(mx - n.p.sx, my - n.p.sy) <= n.r + 6) { hit = n; break; }

    }

    const insp = document.getElementById('ch7-node-inspector');

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



  function init() {

    resize();

    syncCh7WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_7 = false;
    const synBindSync_syncCh7WithDeck = () => {
      if (syncRaf_7) return;
      syncRaf_7 = true;
      requestAnimationFrame(() => {
        syncRaf_7 = false;
        syncCh7WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh7WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh7WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh7WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh7WithDeck, { passive: true });

    const revEl_syncCh7WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh7WithDeck) {
      revEl_syncCh7WithDeck.addEventListener('scroll', synBindSync_syncCh7WithDeck, { passive: true });
      revEl_syncCh7WithDeck.addEventListener('touchmove', synBindSync_syncCh7WithDeck, { passive: true });
    }
    const vpEl_syncCh7WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh7WithDeck) {
      vpEl_syncCh7WithDeck.addEventListener('scroll', synBindSync_syncCh7WithDeck, { passive: true });
      vpEl_syncCh7WithDeck.addEventListener('touchmove', synBindSync_syncCh7WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh7WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh7WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh7WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh7WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh7WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh7WithDeck);
    }

    const hud = document.getElementById('ch7-3d-hud');

    if (hud) {

      hud.querySelectorAll('input, button').forEach(el => {

        el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());

      });

    }

  }



  init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh7Engine);
  } else {
    runCh7Engine();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 8 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
window.showGenericTab = window.showGenericTab || function(prefix, idx, maxIdx, btnEl) {
  for (let i = 1; i <= maxIdx; i++) {
    const p = document.getElementById(prefix + '-' + i);
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

// ============================================================================
// WIDGET 1 (§8.1.1): Primigene Äondyne & Parameter-Tensorium R_n (SM-29)
// ============================================================================
window.ch8_updateAeondyneLab = function() {
  const elN = document.getElementById('ch8-aeon-n');
  if (!elN) return;
  let n = parseInt(elN.value);
  let elM = document.getElementById('ch8-aeon-m');
  elM.max = n;
  let m = Math.min(n, parseInt(elM.value));
  elM.value = m;
  let x1 = parseFloat(document.getElementById('ch8-aeon-x').value);

  document.getElementById('ch8-aeon-n-val').innerText = n;
  document.getElementById('ch8-aeon-m-val').innerText = m;
  document.getElementById('ch8-aeon-x-val').innerText = x1.toFixed(2);

  function binom(a, b) {
    if (b < 0 || b > a) return 0;
    let res = 1;
    for (let i = 1; i <= b; i++) res = res * (a - i + 1) / i;
    return Math.round(res);
  }
  let subCount = binom(n, m);
  let amp = Math.exp(-0.35 * x1) * Math.cos(1.4 * x1);

  const svg = document.getElementById('ch8-aeon-svg');
  if (svg) {
    let html = `
      <rect x="24" y="14" width="174" height="90" rx="4" fill="rgba(65,105,225,0.10)" stroke="#334155" stroke-width="1"/>
      <line x1="24" y1="92" x2="192" y2="92" stroke="#4169E1" stroke-width="2.2"/>
      <line x1="24" y1="92" x2="24" y2="18" stroke="#4169E1" stroke-width="2.2"/>
      <circle cx="24" cy="92" r="4.5" fill="#DC143C"/>
      <text x="15" y="102" fill="#DC143C" font-size="8.5" font-weight="bold">0</text>
      <line x1="64" y1="89" x2="64" y2="95" stroke="#FFD700" stroke-width="2"/>
      <text x="64" y="103" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">E=1</text>
    `;
    let pts = [];
    for (let k = 0; k <= 40; k++) {
      let u = (k / 40.0) * 4.0;
      let px = 24 + u * 40.0;
      let py = 56 - 28.0 * Math.exp(-0.35 * u) * Math.cos(1.4 * u);
      pts.push((k === 0 ? "M " : "L ") + px.toFixed(1) + "," + py.toFixed(1));
    }
    html += `<path d="${pts.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2.5"/>`;
    let sx = 24 + x1 * 40.0;
    let sy = 56 - 28.0 * amp;
    html += `<line x1="${sx.toFixed(1)}" y1="92" x2="${sx.toFixed(1)}" y2="${sy.toFixed(1)}" stroke="#FFA500" stroke-width="1.8" stroke-dasharray="3,2"/>`;
    html += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="5" fill="#FFD700" stroke="#000" stroke-width="1"/>`;
    html += `<text x="112" y="26" fill="#cbd5e1" font-size="8.5" text-anchor="middle">Fiber Section ã(x_i) over M_${n} = (ℝ_≥0)^${n}</text>`;
    svg.innerHTML = html;
  }

  const box = document.getElementById('ch8-aeon-readout');
  if (box) {
    box.innerHTML =
      `<b>SM Eq. 29 Identification:</b> <span style="color:#FFD700;">yR_${n} ≡ ⟨𝔣, R_${n}, ${m}⟩ ≡ ã(x_i)₁^${n}</span> | ` +
      `<b>Subspaces:</b> C(${n},${m}) = <b>${subCount}</b> active ${m}D channels | ` +
      `<b>Corner Faces ∂_i M_${n}:</b> ${n} hyperplanes | <b>ã(${x1.toFixed(2)}) = ${amp.toFixed(3)}</b>`;
  }
};

// ============================================================================
// WIDGET 2 (§8.1.2): Variable Separation, Asymmetries & Ganzläufigkeit
// ============================================================================
window.ch8_updateAsymmetryLab = function() {
  const elA1 = document.getElementById('ch8-asym-a1');
  if (!elA1) return;
  let a1 = parseFloat(elA1.value);
  let a2 = parseFloat(document.getElementById('ch8-asym-a2').value);
  let tp = parseFloat(document.getElementById('ch8-asym-tp').value);

  document.getElementById('ch8-asym-a1-val').innerText = a1.toFixed(2);
  document.getElementById('ch8-asym-a2-val').innerText = a2.toFixed(2);
  document.getElementById('ch8-asym-tp-val').innerText = tp.toFixed(2);

  let effA1 = a1 * (1.0 + 0.30 * tp);
  let effA2 = a2 * (1.0 + 0.25 * tp);
  let ratio = effA2 / effA1;

  const svg = document.getElementById('ch8-asym-svg');
  if (svg) {
    let p1 = [], p2 = [], prod = [];
    for (let k = 0; k <= 50; k++) {
      let x = (k / 50.0) * 3.0;
      let px = 18 + (k / 50.0) * 180.0;
      let v1 = Math.exp(-effA1 * x);
      let v2 = Math.exp(-0.35 * x) * Math.cos(effA2 * x);
      let vp = v1 * v2;
      p1.push((k === 0 ? "M " : "L ") + px.toFixed(1) + "," + (62 - 38 * v1).toFixed(1));
      p2.push((k === 0 ? "M " : "L ") + px.toFixed(1) + "," + (62 - 38 * v2).toFixed(1));
      prod.push((k === 0 ? "M " : "L ") + px.toFixed(1) + "," + (62 - 38 * vp).toFixed(1));
    }
    svg.innerHTML = `
      <line x1="18" y1="62" x2="198" y2="62" stroke="#475569" stroke-width="1.2"/>
      <line x1="18" y1="15" x2="18" y2="105" stroke="#475569" stroke-width="1.5"/>
      <path d="${p1.join(' ')}" fill="none" stroke="#4169E1" stroke-width="2" stroke-dasharray="4,2"/>
      <path d="${p2.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2" stroke-dasharray="2,2"/>
      <path d="${prod.join(' ')}" fill="none" stroke="#FFD700" stroke-width="2.8"/>
      <text x="108" y="106" fill="#cbd5e1" font-size="8" text-anchor="middle">Blue: φ₁(x₁;t') | Teal: φ₂(x₂;t') | Gold: Separated Product f = φ₁·φ₂</text>
    `;
  }

  const box = document.getElementById('ch8-asym-readout');
  if (box) {
    let symTag = Math.abs(effA1 - effA2) < 0.15
      ? `<span style="color:#20B2AA;">Near-Symmetric Weighting</span>`
      : `<span style="color:#FFA500;">Funktionale Asymmetrie (Anisotropy Ratio ω₂/α₁ = ${ratio.toFixed(2)})</span>`;
    box.innerHTML =
      `<b>Separated Kernel:</b> f(x₁,x₂;t') = φ₁(x₁;t')·φ₂(x₂;t') | ${symTag}<br>` +
      `<b>Ganzläufige Äondyne 𝔣(t'):</b> Auxiliary Synkolationstensorium parameter t' = ${tp.toFixed(2)} modulates (α₁_eff, ω₂_eff) = (${effA1.toFixed(2)}, ${effA2.toFixed(2)}).`;
  }
};

// ============================================================================
// WIDGET 3 (§8.1.3): Differential/Integral Functors & Double Partial Sieve (SM-30..35a)
// ============================================================================
window.ch8_updateSieveCalcLab = function() {
  const elN = document.getElementById('ch8-calc-n');
  if (!elN) return;
  let N = parseInt(elN.value);
  let y = parseFloat(document.getElementById('ch8-calc-y').value);

  document.getElementById('ch8-calc-n-val').innerText = N;
  document.getElementById('ch8-calc-y-val').innerText = y.toFixed(2);

  let dx = y / N;
  let diffQuot = ((y + dx) * (y + dx) - y * y) / dx;
  let exactDeriv = 2.0 * y;

  let sumLower = 0.0, sumUpper = 0.0;
  for (let j = 0; j < N; j++) {
    sumLower += (j * dx) * dx;
    sumUpper += ((j + 1) * dx) * dx;
  }
  let exactHalfSq = 0.5 * y * y;

  const svg = document.getElementById('ch8-calc-svg');
  if (svg) {
    let scale = 28.0;
    let w = y * scale;
    let x0 = 32, y0 = 98;
    let rects = '';
    let stepDraw = Math.max(1, Math.floor(N / 12));
    for (let j = 0; j < N; j += stepDraw) {
      let rx = x0 + j * dx * scale;
      let rw = Math.min(w - j * dx * scale, stepDraw * dx * scale);
      let rh = (j + 1) * dx * scale;
      rects += `<rect x="${rx.toFixed(1)}" y="${(y0 - rh).toFixed(1)}" width="${rw.toFixed(1)}" height="${rh.toFixed(1)}" fill="rgba(32,178,170,0.22)" stroke="#20B2AA" stroke-width="0.7"/>`;
    }
    svg.innerHTML = `
      <rect x="${x0}" y="${(y0 - w).toFixed(1)}" width="${w.toFixed(1)}" height="${w.toFixed(1)}" fill="rgba(147,112,219,0.14)" stroke="#9370DB" stroke-width="1.2" stroke-dasharray="3,2"/>
      ${rects}
      <line x1="${x0}" y1="${y0}" x2="${(x0 + w).toFixed(1)}" y2="${(y0 - w).toFixed(1)}" stroke="#FFD700" stroke-width="2.4"/>
      <line x1="24" y1="${y0}" x2="195" y2="${y0}" stroke="#4169E1" stroke-width="1.8"/>
      <line x1="${x0}" y1="12" x2="${x0}" y2="104" stroke="#4169E1" stroke-width="1.8"/>
      <text x="145" y="34" fill="#FFD700" font-size="8.5" font-weight="bold">½ y² = ${exactHalfSq.toFixed(3)}</text>
      <text x="145" y="48" fill="#20B2AA" font-size="8">_+(y,y)ℐ (Teal)</text>
      <text x="145" y="60" fill="#9370DB" font-size="8">^+(y,y)ℐ (Purple)</text>
    `;
  }

  const box = document.getElementById('ch8-calc-readout');
  if (box) {
    box.innerHTML =
      `<b>SM-30 Difference Quotient (Δx = ${dx.toFixed(3)}):</b> Δ(y²)/Δx = <b>${diffQuot.toFixed(3)}</b> → d̃|(y²) = <b>${exactDeriv.toFixed(3)}</b><br>` +
      `<b>SM-32/35a Integral Chain (N=${N}):</b> I_lower = ${sumLower.toFixed(3)} ≤ <span style="color:#FFD700;"><b>^+(_+(y,y)ℐ,( ))ℐ = ½y² = ${exactHalfSq.toFixed(3)}</b></span> ≤ I_upper = ${sumUpper.toFixed(3)}`;
  }
};

// ============================================================================
// WIDGET 4 (§8.2.1): Schwartz Seminorms & Algebraic Base Ring Envelope
// ============================================================================
window.ch8_updateSchwartzSeminormLab = function() {
  const elA = document.getElementById('ch8-sch-alpha');
  if (!elA) return;
  let alpha = parseInt(elA.value);
  let beta = parseInt(document.getElementById('ch8-sch-beta').value);
  let c0 = parseFloat(document.getElementById('ch8-sch-c0').value);

  document.getElementById('ch8-sch-alpha-val').innerText = alpha;
  document.getElementById('ch8-sch-beta-val').innerText = beta;
  document.getElementById('ch8-sch-c0-val').innerText = c0.toFixed(2);

  let xStar = alpha;
  let supVal = alpha === 0 ? 1.0 : Math.pow(alpha / Math.E, alpha);

  const svg = document.getElementById('ch8-sch-svg');
  if (svg) {
    let pts = [];
    let yScale = 58.0 / Math.max(1.0, supVal * 1.15);
    for (let k = 0; k <= 60; k++) {
      let x = (k / 60.0) * 7.5;
      let val = Math.pow(x, alpha) * Math.exp(-x);
      let px = 22 + (x / 7.5) * 172.0;
      let py = 92 - val * yScale;
      pts.push((k === 0 ? "M " : "L ") + px.toFixed(1) + "," + py.toFixed(1));
    }
    let sxStar = 22 + (xStar / 7.5) * 172.0;
    let syStar = 92 - supVal * yScale;
    let syUnit = 92 - Math.min(58, c0 * 24.0);
    svg.innerHTML = `
      <line x1="22" y1="92" x2="196" y2="92" stroke="#4169E1" stroke-width="1.8"/>
      <line x1="22" y1="14" x2="22" y2="98" stroke="#4169E1" stroke-width="1.8"/>
      <line x1="22" y1="${syUnit.toFixed(1)}" x2="194" y2="${syUnit.toFixed(1)}" stroke="#FFA500" stroke-width="1.5" stroke-dasharray="4,2"/>
      <path d="${pts.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2.6"/>
      <circle cx="${sxStar.toFixed(1)}" cy="${syStar.toFixed(1)}" r="4.8" fill="#FFD700" stroke="#000" stroke-width="1"/>
      <circle cx="22" cy="92" r="4" fill="#DC143C"/>
      <text x="110" y="24" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">‖f₀‖_{${alpha},${beta}} = sup |x^${alpha} ∂^${beta}(e⁻ˣ)| = ${supVal.toFixed(3)} at x*=${xStar}</text>
    `;
  }

  const box = document.getElementById('ch8-sch-readout');
  if (box) {
    box.innerHTML =
      `<b>Def. 8.3 Schwartz Seminorm:</b> ‖e⁻ˣ‖_{α=${alpha},β=${beta}} = (${alpha}/e)^${alpha} = <b style="color:#FFD700;">${supVal.toFixed(4)} &lt; ∞</b> (attained at x* = ${xStar})<br>` +
      `<b>Def. 8.4 Envelope f = ${c0.toFixed(2)}·1_𝒜 + e⁻ˣ ∈ 𝒜_𝕂(M₁):</b> Value at <i>Fehlstelle</i> x=0 is <b>${(c0 + 1).toFixed(2)}</b>; limit as x→∞ is <b>${c0.toFixed(2)}·E</b>.`;
  }
};

// ============================================================================
// WIDGET 5 (§8.2.2): Poincaré Homotopy Ray Integral I_0 & Path Independence
// ============================================================================
window.ch8_updatePoincareRayLab = function() {
  const elX1 = document.getElementById('ch8-poin-x1');
  if (!elX1) return;
  let x1 = parseFloat(elX1.value);
  let x2 = parseFloat(document.getElementById('ch8-poin-x2').value);
  let kap = parseFloat(document.getElementById('ch8-poin-kap').value);

  document.getElementById('ch8-poin-x1-val').innerText = x1.toFixed(2);
  document.getElementById('ch8-poin-x2-val').innerText = x2.toFixed(2);
  document.getElementById('ch8-poin-kap-val').innerText = (kap >= 0 ? '+' : '') + kap.toFixed(2);

  // f(x1,x2) = x1^2 * x2 + 0.5 * x1 * x2^2 + 1.0, so f(0,0) = 1.0
  // omega = d f = (2*x1*x2 + 0.5*x2^2) dx1 + (x1^2 + x1*x2) dx2
  let fExactDiff = (x1 * x1 * x2) + 0.5 * (x1 * x2 * x2);

  // Numerical integration along straight radial ray and curved path (60 steps midpoint)
  let rayInt = 0.0, curveInt = 0.0;
  let M = 60;
  for (let k = 0; k < M; k++) {
    let t = (k + 0.5) / M;
    let dt = 1.0 / M;
    // Ray: r(t) = (t*x1, t*x2), r'(t) = (x1, x2)
    let rx1 = t * x1, rx2 = t * x2;
    let w1_r = 2 * rx1 * rx2 + 0.5 * rx2 * rx2;
    let w2_r = rx1 * rx1 + rx1 * rx2;
    rayInt += (w1_r * x1 + w2_r * x2) * dt;

    // Bowed path inside positive octant: c(t) = (t*x1 + kap*t*(1-t)*x1, t*x2 - kap*t*(1-t)*x2)
    let cx1 = t * x1 + kap * t * (1 - t) * x1;
    let cx2 = t * x2 - kap * t * (1 - t) * x2;
    let dcx1 = x1 * (1 + kap * (1 - 2 * t));
    let dcx2 = x2 * (1 - kap * (1 - 2 * t));
    let w1_c = 2 * cx1 * cx2 + 0.5 * cx2 * cx2;
    let w2_c = cx1 * cx1 + cx1 * cx2;
    curveInt += (w1_c * dcx1 + w2_c * dcx2) * dt;
  }

  const svg = document.getElementById('ch8-poin-svg');
  if (svg) {
    let ox = 26, oy = 96, sc = 56.0 / 2.5;
    let tx = ox + x1 * sc * 2.2, ty = oy - x2 * sc * 1.35;
    let cPts = [];
    for (let k = 0; k <= 30; k++) {
      let t = k / 30.0;
      let cx1 = t * x1 + kap * t * (1 - t) * x1;
      let cx2 = t * x2 - kap * t * (1 - t) * x2;
      let px = ox + cx1 * sc * 2.2;
      let py = oy - cx2 * sc * 1.35;
      cPts.push((k === 0 ? "M " : "L ") + px.toFixed(1) + "," + py.toFixed(1));
    }
    svg.innerHTML = `
      <rect x="${ox}" y="14" width="160" height="82" fill="rgba(32,178,170,0.08)" stroke="#334155" stroke-width="1"/>
      <line x1="${ox}" y1="${oy}" x2="192" y2="${oy}" stroke="#4169E1" stroke-width="2"/>
      <line x1="${ox}" y1="${oy}" x2="${ox}" y2="12" stroke="#4169E1" stroke-width="2"/>
      <path d="${cPts.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2.2" stroke-dasharray="4,2"/>
      <line x1="${ox}" y1="${oy}" x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="#FFD700" stroke-width="2.6"/>
      <circle cx="${ox}" cy="${oy}" r="4.5" fill="#DC143C"/>
      <circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="5" fill="#FFD700" stroke="#000" stroke-width="1"/>
      <text x="108" y="25" fill="#FFD700" font-size="8" font-weight="bold" text-anchor="middle">Gold: Radial Ray γ_x(t)=tx | Teal: Curved Path γ_κ</text>
    `;
  }

  const box = document.getElementById('ch8-poin-readout');
  if (box) {
    box.innerHTML =
      `<b>Def. 8.5 &amp; SM Eq. 33 Path-Independence on Star-Shaped Octant M₂:</b><br>` +
      `Radial Ray <b>(I₀ ω)(x) = ${rayInt.toFixed(4)}</b> | Bowed Path <b>I_{γ_κ}(ω) = ${curveInt.toFixed(4)}</b> | Exact <b>f(x) - f(0) = ${fExactDiff.toFixed(4)}</b>`;
  }
};

// ============================================================================
// WIDGET 6 (§8.3.1): Seeley Corner Extension vs Naive Extensions (Thm. 8.6, Fig. 8.2)
// ============================================================================
window.ch8_seeleyMode = 'seeley';
window.ch8_setSeeleyMode = function(mode) {
  window.ch8_seeleyMode = mode;
  window.ch8_updateSeeleyExtensionLab();
};

window.ch8_updateSeeleyExtensionLab = function() {
  const elK = document.getElementById('ch8-see-terms');
  if (!elK) return;
  let K = parseInt(elK.value);
  document.getElementById('ch8-see-terms-val').innerText = K;

  const modes = ['zero', 'even', 'seeley'];
  modes.forEach(m => {
    const b = document.getElementById('ch8-btn-' + m);
    if (b) {
      if (m === window.ch8_seeleyMode) {
        b.style.background = '#FFD700'; b.style.color = '#000'; b.style.fontWeight = 'bold';
      } else {
        b.style.background = '#151c2c'; b.style.color = '#cbd5e1'; b.style.fontWeight = 'normal';
      }
    }
  });

  // Exact Vandermonde weights a_k for sum_{k=0}^{K-1} a_k (-2^k)^m = 1 (m=0..K-1)
  const weightsMap = {
    2: [3, -2],
    3: [7, -8, 2],
    4: [15, -28, 14, -1]
  };
  let a = weightsMap[K] || weightsMap[3];

  function seeleyVal(x) {
    if (x >= 0) return Math.exp(-x);
    let sum = 0.0;
    for (let k = 0; k < a.length; k++) {
      let arg = -Math.pow(2, k) * x; // arg > 0
      // smooth cutoff chi(arg)
      let chi = arg <= 1.0 ? 1.0 : (arg >= 2.2 ? 0.0 : Math.exp(-2.5 * Math.pow(arg - 1.0, 2)));
      sum += a[k] * chi * Math.exp(-arg);
    }
    return sum;
  }

  const svg = document.getElementById('ch8-see-svg');
  if (svg) {
    let posPts = [], negPts = [];
    let ox = 105, oy = 88, xSc = 54.0, ySc = 38.0;
    for (let i = 0; i <= 40; i++) {
      let x = (i / 40.0) * 1.6;
      let px = ox + x * xSc;
      let py = oy - Math.exp(-x) * ySc;
      posPts.push((i === 0 ? "M " : "L ") + px.toFixed(1) + "," + py.toFixed(1));
    }
    for (let i = 0; i <= 40; i++) {
      let x = -1.6 + (i / 40.0) * 1.6;
      let yv = 0.0;
      if (window.ch8_seeleyMode === 'zero') yv = 0.0;
      else if (window.ch8_seeleyMode === 'even') yv = Math.exp(-Math.abs(x));
      else yv = seeleyVal(x);
      let px = ox + x * xSc;
      let py = Math.max(10, Math.min(104, oy - yv * ySc));
      negPts.push((i === 0 ? "M " : "L ") + px.toFixed(1) + "," + py.toFixed(1));
    }
    let negCol = window.ch8_seeleyMode === 'seeley' ? '#20B2AA' : '#DC143C';
    svg.innerHTML = `
      <rect x="${ox}" y="12" width="90" height="86" fill="rgba(32,178,170,0.10)" stroke="none"/>
      <line x1="14" y1="${oy}" x2="196" y2="${oy}" stroke="#475569" stroke-width="1.5"/>
      <line x1="${ox}" y1="12" x2="${ox}" y2="102" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="3,2"/>
      <path d="${negPts.join(' ')}" fill="none" stroke="${negCol}" stroke-width="2.6" stroke-dasharray="${window.ch8_seeleyMode === 'seeley' ? 'none' : '4,2'}"/>
      <path d="${posPts.join(' ')}" fill="none" stroke="#4169E1" stroke-width="2.8"/>
      <circle cx="${ox}" cy="${(oy - ySc).toFixed(1)}" r="4.5" fill="#FFD700" stroke="#000" stroke-width="1"/>
      <text x="58" y="23" fill="${negCol}" font-size="8" font-weight="bold" text-anchor="middle">x &lt; 0 (Extended)</text>
      <text x="152" y="23" fill="#4169E1" font-size="8" font-weight="bold" text-anchor="middle">x ≥ 0 (Physical M₁)</text>
    `;
  }

  const box = document.getElementById('ch8-see-readout');
  if (box) {
    if (window.ch8_seeleyMode === 'zero') {
      box.innerHTML = `<span style="color:#ff6b81;"><b>✗ ZERO EXTENSION FAILS:</b></span> Jump discontinuity at corner x = 0 (f(0⁺)=1 ≠ f(0⁻)=0). Destroys Schwartz seminorms!`;
    } else if (window.ch8_seeleyMode === 'even') {
      box.innerHTML = `<span style="color:#ff6b81;"><b>✗ EVEN REFLECTION e^{-|x|} FAILS:</b></span> First-derivative kink at x = 0 (f'(0⁺) = -1 ≠ f'(0⁻) = +1). Fails C¹ smoothness!`;
    } else {
      box.innerHTML =
        `<span style="color:#20B2AA;"><b>✓ SEELEY EXTENSION ℰ_x f (K=${K} Vandermonde Weights [${a.join(', ')}]):</b></span><br>` +
        `Matches derivatives ∑ a_k (-2^k)^m = 1 across x = 0 up to order m = ${K - 1}; <b>ℛ₊ ∘ ℰ^(n) = id</b> preserves nuclearity!`;
    }
  }
};

// ============================================================================
// WIDGET 7 (§8.3.1): Grothendieck Nuclear Series Separation & cosh(1) Lab
// ============================================================================
window.ch8_updateNuclearSeriesLab = function() {
  const elK = document.getElementById('ch8-nuc-k');
  if (!elK) return;
  let K = parseInt(elK.value);
  let x1 = parseFloat(document.getElementById('ch8-nuc-x1').value);
  let x2 = parseFloat(document.getElementById('ch8-nuc-x2').value);

  document.getElementById('ch8-nuc-k-val').innerText = K;
  document.getElementById('ch8-nuc-x1-val').innerText = x1.toFixed(2);
  document.getElementById('ch8-nuc-x2-val').innerText = x2.toFixed(2);

  function fact(n) {
    let r = 1.0;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  let exactVal = Math.exp(-(x1 + x2)) * Math.cos(x1 * x2);
  let sumVal = 0.0, normSum = 0.0;
  for (let k = 0; k <= K; k++) {
    let lamAbs = 1.0 / fact(2 * k);
    let lam = (k % 2 === 0 ? 1.0 : -1.0) * lamAbs;
    let phi1 = Math.pow(x1, 2 * k) * Math.exp(-x1);
    let phi2 = Math.pow(x2, 2 * k) * Math.exp(-x2);
    sumVal += lam * phi1 * phi2;
    normSum += lamAbs;
  }
  let err = Math.abs(exactVal - sumVal);
  let cosh1 = Math.cosh(1.0);

  const svg = document.getElementById('ch8-nuc-svg');
  if (svg) {
    let bars = '';
    for (let k = 0; k <= 5; k++) {
      let lamAbs = 1.0 / fact(2 * k);
      let h = Math.max(3, Math.log10(lamAbs * 1e7 + 1) * 9.5);
      let bx = 28 + k * 28;
      let col = k <= K ? '#FFD700' : '#334155';
      bars += `<rect x="${bx}" y="${(90 - h).toFixed(1)}" width="18" height="${h.toFixed(1)}" rx="2" fill="${col}"/>`;
      bars += `<text x="${bx + 9}" y="102" fill="#cbd5e1" font-size="7.5" text-anchor="middle">k=${k}</text>`;
    }
    svg.innerHTML = `
      <line x1="20" y1="90" x2="196" y2="90" stroke="#4169E1" stroke-width="1.8"/>
      ${bars}
      <text x="108" y="18" fill="#20B2AA" font-size="8" font-weight="bold" text-anchor="middle">Nuclear Coefficients |λ_k| = 1/(2k)! (Log Scale)</text>
    `;
  }

  const box = document.getElementById('ch8-nuc-readout');
  if (box) {
    box.innerHTML =
      `<b>Exact f(x₁,x₂):</b> ${exactVal.toFixed(6)} | <b>Rank-${K + 1} Tensor Sum S_${K}:</b> <span style="color:#FFD700;"><b>${sumVal.toFixed(6)}</b></span> (Error: ${err.toExponential(2)})<br>` +
      `<b>Projective Tensor Norm:</b> ∑_{k=0}^${K} |λ_k| = <b>${normSum.toFixed(6)}</b> → cosh(1) ≈ <b>${cosh1.toFixed(6)} &lt; ∞</b>`;
  }
};

// ============================================================================
// WIDGET 8 (§8.3.2): Homometral Polarization & Arity Reduction Calculator
// ============================================================================
window.ch8_updatePolarizationLab = function() {
  const elM = document.getElementById('ch8-pol-m');
  if (!elM) return;
  let m = parseInt(elM.value);
  let u = parseFloat(document.getElementById('ch8-pol-u').value);
  let v = parseFloat(document.getElementById('ch8-pol-v').value);

  document.getElementById('ch8-pol-m-val').innerText = m;
  document.getElementById('ch8-pol-u-val').innerText = u.toFixed(2);
  document.getElementById('ch8-pol-v-val').innerText = v.toFixed(2);

  // Evaluate polarization formula on tuple (u, u, ..., u, v) with (m-1) copies of u and 1 copy of v
  // Nominal arity m, effective arity k = 2
  let vec = [];
  for (let i = 0; i < m - 1; i++) vec.push(u);
  vec.push(v);

  let factM = 1;
  for (let i = 2; i <= m; i++) factM *= i;
  let numConfigs = 1 << m;
  let polSum = 0.0;
  for (let mask = 0; mask < numConfigs; mask++) {
    let prodEps = 1.0;
    let linComb = 0.0;
    for (let bit = 0; bit < m; bit++) {
      let eps = (mask & (1 << bit)) ? 1.0 : -1.0;
      prodEps *= eps;
      linComb += eps * vec[bit];
    }
    polSum += prodEps * Math.pow(linComb, m);
  }
  let polVal = polSum / (numConfigs * factM);
  let redVal = Math.pow(u, m - 1) * v;

  const box = document.getElementById('ch8-pol-readout');
  if (box) {
    box.innerHTML =
      `<b>Input Tuple (${vec.map(x => x.toFixed(1)).join(', ')}):</b> Nominal Arity <b>m = ${m}</b> (${numConfigs} hypercube signs) → Effective Strict Arity <b style="color:#FFD700;">k = 2 &lt; ${m}</b><br>` +
      `<b>Polarization Identity Pol(v₁,…,v_${m}):</b> <b>${polVal.toFixed(4)}</b> = <b>F_red(x₁,x₂) = x₁^${m - 1} x₂ = ${redVal.toFixed(4)}</b> ∈ 𝒪_quant(2; 1)`;
  }
};

// ============================================================================
// WIDGET 9 (§8.3.3): 15-to-3 Corporate Class Collapse Explorer (Thm. 8.9)
// ============================================================================
window.ch8_selectedCorpMask = 5; // bit0=Km, bit1=Cm, bit2=Ks, bit3=Cs -> 5 = {Km, Ks} = Kor_{K}

window.ch8_selectCorpMask = function(mask) {
  window.ch8_selectedCorpMask = mask;
  window.ch8_updateCorporateCollapseLab();
};

window.ch8_updateCorporateCollapseLab = function() {
  const gridEl = document.getElementById('ch8-corp-grid');
  if (!gridEl) return;

  const validMasks = [5, 10, 15]; // 5={Km,Ks}, 10={Cm,Cs}, 15={Km,Cm,Ks,Cs}
  const labels = {
    1: "{Km}", 2: "{Cm}", 3: "{Km,Cm}", 4: "{Ks}",
    5: "Kor_{K}: {Km,Ks}", 6: "{Cm,Ks}", 7: "{Km,Cm,Ks}", 8: "{Cs}",
    9: "{Km,Cs}", 10: "Kor_{C}: {Cm,Cs}", 11: "{Km,Cm,Cs}", 12: "{Ks,Cs}",
    13: "{Km,Ks,Cs}", 14: "{Cm,Ks,Cs}", 15: "Kor_{K,C}: {All}"
  };

  let html = '';
  for (let mask = 1; mask <= 15; mask++) {
    let isValid = validMasks.includes(mask);
    let isSel = (mask === window.ch8_selectedCorpMask);
    let bg = isValid ? 'rgba(255,215,0,0.22)' : 'rgba(220,20,60,0.12)';
    let brd = isSel ? '#FFFFFF' : (isValid ? '#FFD700' : '#475569');
    let col = isValid ? '#FFD700' : '#94a3b8';
    html += `<button onclick="ch8_selectCorpMask(${mask})" style="background:${bg}; border:${isSel ? '2px' : '1px'} solid ${brd}; color:${col}; border-radius:5px; padding:4px 3px; font-size:0.55em; font-weight:${isValid ? '700' : '400'}; cursor:pointer;">${labels[mask]}</button>`;
  }
  gridEl.innerHTML = html;

  const box = document.getElementById('ch8-corp-readout');
  if (box) {
    let m = window.ch8_selectedCorpMask;
    if (m === 5) {
      box.innerHTML = `<span style="color:#FFD700;"><b>✓ ADMISSIBLE CLASS 1 — Kor_{K} = {K_m, K_s} (Pure Coupled Interaction):</b></span> Shared coordinates λ &gt; 0 in R_{m_a} ⊞_φ R_{m_b} force functional cross-modulation across number fields 𝕂.`;
    } else if (m === 10) {
      box.innerHTML = `<span style="color:#20B2AA;"><b>✓ ADMISSIBLE CLASS 2 — Kor_{C} = {C_m, C_s} (Pure Parallel Composition):</b></span> Uncoupled carrier coproduct (λ = 0) forces block-diagonal parallel functional action.`;
    } else if (m === 15) {
      box.innerHTML = `<span style="color:#FFA500;"><b>✓ ADMISSIBLE CLASS 3 — Kor_{K,C} = {K_m, C_m, K_s, C_s} (Partial Coupling + Composition):</b></span> Coupled interaction on shared coordinates λ &gt; 0 combined with parallel evaluation on uncoupled summands.`;
    } else {
      box.innerHTML = `<span style="color:#ff6b81;"><b>✗ ALGEBRAICALLY FORBIDDEN IN Ctx_quant (${labels[m]}):</b></span> Desynchronized carrier/functional selection violates ring evaluation over 𝕂 (Thm. 8.9 collapses 2⁴-1=15 → 2²-1=3 classes).`;
    }
  }
};

// ============================================================================
// COMBINED-DECK SAFE BOILERPLATE (IIFE)
// ============================================================================
(function() {
  function prepareVideos() {
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'auto';
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('muted', '');
      v.setAttribute('loop', '');
      v.setAttribute('preload', 'auto');
    });
  }

  function syncVideosToSlide() {
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
      || window.innerWidth <= 768;

    const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
    const winH = window.innerHeight || document.documentElement.clientHeight;
    const winW = window.innerWidth || document.documentElement.clientWidth;

    document.querySelectorAll('video').forEach(v => {
      let shouldPlay = false;
      if (isScroll) {
        const rect = v.getBoundingClientRect();
        const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
        shouldPlay = inView;
      } else {
        shouldPlay = current ? current.contains(v) : true;
      }

      if (shouldPlay) {
        v.muted = true;
        v.playsInline = true;
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      } else if (!v.paused) {
        v.pause();
      }
    });
  }

  // Ensure continuous sync on mobile scroll and touch gestures
  if (typeof window !== 'undefined') {
    window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
    window.__syn_video_sync_handlers.push(syncVideosToSlide);
    if (!window.__syn_video_scroll_hooked) {
      window.__syn_video_scroll_hooked = true;
      const runSync = () => {
        (window.__syn_video_sync_handlers || []).forEach(fn => {
          try { fn(); } catch (_) {}
        });
      };
      window.addEventListener('scroll', runSync, { passive: true });
      window.addEventListener('touchmove', runSync, { passive: true });
      window.addEventListener('resize', runSync, { passive: true });
      let synMediaUnlocked = false;
      function synUnlockMedia() {
        if (synMediaUnlocked) return;
        synMediaUnlocked = true;
        runSync();
      }
      document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
      document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
    }
  }

  function renderAllCh8Widgets() {
    window.ch8_updateAeondyneLab();
    window.ch8_updateAsymmetryLab();
    window.ch8_updateSieveCalcLab();
    window.ch8_updateSchwartzSeminormLab();
    window.ch8_updatePoincareRayLab();
    window.ch8_updateSeeleyExtensionLab();
    window.ch8_updateNuclearSeriesLab();
    window.ch8_updatePolarizationLab();
    window.ch8_updateCorporateCollapseLab();
  }

  function bindControlsOnce() {
    document.querySelectorAll('input[type="range"], select, button').forEach(el => {
      if (el.dataset.synBound) return;
      el.dataset.synBound = '1';
      el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());
    });
  }

  let ch8Initialised = false;
  function initChapter8() {
    if (ch8Initialised) return;
    ch8Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh8Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter8);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || !window.Reveal.isReady()) initChapter8();
      else initChapter8();
    });
  } else {
    initChapter8();
  }
})();

// =========================================================================
// CHAPTER 8: 60FPS 3D INTERACTIVE SEELEY EXTENSION, NUCLEARITY & 15-TO-3 ENGINE
// =========================================================================

const CH8_3D_STYLE = `
#ch8-3d-hud {
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

#ch8-3d-hud *, #ch8-3d-hud *::before, #ch8-3d-hud *::after {
  box-sizing: border-box;
}

#ch8-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch8-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch8-3d-hud.minimized .ch8-hud-body {
  display: none;
}

.ch8-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch8-hud-title {
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

.ch8-hud-title span:first-child {
  line-height: 1.15;
}

.ch8-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch8-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch8-hud-btn {
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

.ch8-hud-btn:hover, .ch8-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch8-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch8-canvas-wrap:active {
  cursor: grabbing;
}

#ch8-3d-hud.spotlight .ch8-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch8-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch8-overlay-bar {
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

.ch8-telemetry {
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

#ch8-node-inspector {
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

.ch8-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch8-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch8-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch8-scrubber .ch8-hud-btn {
  flex-shrink: 0;
}

#ch8-caption {
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
  #ch8-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch8-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch8-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch8-hud-controls {
    gap: 3px;
  }
  .ch8-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch8-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch8-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch8-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch8-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch8-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch8-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch8-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch8-hud-controls {
    gap: 3px;
  }
  .ch8-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch8-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch8-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch8-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch8-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch8-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch8-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch8-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH8_3D_HTML = `
<div class="ch8-hud-header">

    <div class="ch8-hud-title">

      <span>⚛️ Ch 8 · 3D Nuclear &amp; Corner Engine</span>

      <span id="ch8-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch8-hud-controls">

      <button class="ch8-hud-btn active" id="ch8-btn-orbit" onclick="toggleCh8Orbit()">⟳ Orbit</button>

      <button class="ch8-hud-btn" onclick="toggleCh8Spotlight()">⛶ Spotlight</button>

      <button class="ch8-hud-btn" id="ch8-btn-min" onclick="toggleCh8Minimize()">+</button>

    </div>

  </div>



  <div class="ch8-hud-body">

    <div class="ch8-canvas-wrap" id="ch8-canvas-wrap">

      <canvas id="ch8-3d-canvas"></canvas>

      <div class="ch8-overlay-bar">

        <div class="ch8-telemetry" id="ch8-telemetry">𝒮(ℳ_m) ≅ ⊗̂_π 𝒮(ℝ_≥0)</div>

        <div id="ch8-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch8-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <button class="ch8-hud-btn" title="Previous Stage" onclick="window.setCh8Stage(Math.round( parseFloat(document.getElementById('ch8-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch8-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh8Stage(this.value)">
      <button class="ch8-hud-btn" title="Next Stage" onclick="window.setCh8Stage(Math.round( parseFloat(document.getElementById('ch8-slider').value) ) + 1, true)">▶</button>

      <button class="ch8-hud-btn active" id="ch8-btn-sync" onclick="enableCh8Sync()">Auto-Sync</button>

    </div>



    <div id="ch8-caption">

      <b>Stage 1 (§8.1.1 — SM-29):</b> Quantitätssyntrix yR_n as a Primigene Äondyne over Parameter-Tensorium R_n = (ℝ_≥0)^n.

    </div>

  </div>
`;

function injectCh83DHUD() {
  if (document.getElementById('ch8-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH8_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch8-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH8_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch8_3d_engine_loaded) return;
  window.__ch8_3d_engine_loaded = true;

  function runCh8Engine() {
    injectCh83DHUD();
    if (window.__ch8_3d_engine_initialized) return;
    window.__ch8_3d_engine_initialized = true;

const canvas = document.getElementById('ch8-3d-canvas');

  const wrap = document.getElementById('ch8-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.50;

  let camPitch = 0.35;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§8.1.1 — SM-29 Primigene Äondyne):</b> Continuous fiber section S̱(x) over Parameter-Tensorium R_n = (ℝ_≥0)^n.",

    2: "<b>Stage 2 (§8.1.2 — Separation der Variablen &amp; Ganzläufigkeit):</b> 2D field f(x₁,x₂;t') factoring into 1D marginals φ₁(x₁) · φ₂(x₂).",

    3: "<b>Stage 3 (§8.1.3 — SM-30–35a Corporate Calculus &amp; Thm. 8.1):</b> Dual partial integrators ⁺(₊(y,y)?)? partitioning y² into ½y² + ½y².",

    4: "<b>Stage 4 (§8.1.4 &amp; §8.2 — Fehlstelle 0, Einheit E &amp; Nuclearity):</b> Cornered octant M_n anchored at 0 and E=1 with ⊗̂_π = ⊗̂_ε.",

    5: "<b>Stage 5 (§8.2.1 — Defs. 8.3–8.4 Schwartz Space &amp; Base Envelope):</b> Rapid-decay bell f ∈ 𝒮(ℳ_n) over constant unit plane c₀·1_𝒜 ∈ 𝒜_𝕂(ℳ_n).",

    6: "<b>Stage 6 (§8.2.2 — Def. 8.5 Poincaré Radial Homotopy Ray I₀):</b> Radial ray γ_x(t)=tx vs. bowed curve γ_κ verifying I₀(d̃f)(x) = f(x)−f(0).",

    7: "<b>Stage 7 (§8.3.1 — Thm. 8.6 Part 1 Seeley Corner Extension ℰ^(n)):</b> Smooth Vandermonde moment extension across x₁=0, x₂=0 vs. naive cusp!",

    8: "<b>Stage 8 (§8.3.1 — Thm. 8.6 Parts 2–4 Grothendieck Nuclear Series):</b> e^{−(x₁+x₂)}cos(x₁x₂) expanding into rank-1 tensors (∑|λ_k| = cosh(1)).",

    9: "<b>Stage 9 (§8.3.2 — Thm. 8.8 Multilinear Polarization on Sym^m V):</b> 8-vertex sign-cube Pol(v₁,v₂,v₃) reducing homometral m=3 to k=2 < 3.",

    10: "<b>Stage 10 (§8.3.3–8.6 — Thm. 8.9 15-to-3 Corporate Class Collapse):</b> 15 corporate classes collapsing onto the 3 synchronized quantitative modes!"

  };



  const STAGE_TELEMETRY = {

    1: "yR_n ≡ ⟨𝔣, R_n, m⟩ ≡ S̱ (SM Eq. 29)",

    2: "f(x₁,…,x_m; t') = ∏ φ_l(x_l; t')",

    3: "⁺(₊(y,y)?, ( ))? = ½(yỹ)² (Thm. 8.1)",

    4: "{0, 1} ⊂ x_l | 𝒮(ℳ_m) : ⊗̂_π ≅ ⊗̂_ε",

    5: "𝒜_𝕂(ℳ_n) = 𝕂·1_𝒜 ⊕ 𝒮(ℳ_n, 𝕂) (Def. 8.4)",

    6: "(I₀ ω)(x) = ∫₀¹ ∑ x^i ω_i(tx) dt",

    7: "∑ a_k (−2^k)^m = 1 | ℛ_+ ∘ ℰ^(n) = id",

    8: "∑ |λ_k| = cosh(1) ≈ 1.543 < ∞ (Thm. 8.6)",

    9: "F(x₁,x₁,x₂) = F_red(x₁,x₂) ∈ 𝒪_quant(2;1)",

    10: "Op_quant = {Kor_{K}, Kor_{C}, Kor_{K,C}} (3)"

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



  // =========================================================================

  // STAGE RENDERERS (STAGES 1 TO 10)

  // =========================================================================



  // Stage 1: Primigene Äondyne S̱ over Parameter-Tensorium R_n = (\mathbb{R}_{\ge 0})^n (SM-29)

  function renderStage1(w, h) {

    // Non-Negative Octant Floor [0, 2.2]^2 shifted to center (-1.1, -1.1)

    for (let u = -1.1; u <= 1.11; u += 0.36) {

      ctx.beginPath();

      ctx.strokeStyle = "rgba(32, 178, 170, 0.55)";

      ctx.lineWidth = 1.6;

      for (let v = -1.1; v <= 1.11; v += 0.18) {

        const z = -0.35 + 0.55 * Math.sin((u + 1.1) * 1.8 + timeSec * 2) * Math.exp(-0.35 * (u + 1.1 + v + 1.1));

        const p = proj(u, v, z, w, h);

        if (v === -1.1) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    drawNode3D("Fehl_0", -1.1, -1.1, -0.35, 8.5, "#DC143C", "#FFD700", "Fehlstelle 0", "Origin Basepoint x_i = 0 of Parameter-Tensorium R_n (SM Eq. 29)", w, h);

    drawNode3D("Aeon_Sec", 0.0, 0.0, 0.25, 9.5, "#FFD700", "#20B2AA", "yR_n ≡ S̱(x)", "Primigene Äondyne Section varying smoothly over algebraic number continuum R_n", w, h);

  }



  // Stage 2: Separation der Variablen f(x_1, x_2; t') = \phi_1(x_1; t') \phi_2(x_2; t')

  function renderStage2(w, h) {

    // 1D Marginal Curve \phi_1(x_1) along Back-Left Wall (y = -1.2)

    ctx.beginPath();

    ctx.strokeStyle = "#4169E1";

    ctx.lineWidth = 3.0;

    for (let u = -1.1; u <= 1.11; u += 0.1) {

      const phi1 = Math.exp(-0.75 * (u + 1.1));

      const p = proj(u, -1.2, -0.8 + 1.3 * phi1, w, h);

      if (u === -1.1) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    // 1D Marginal Curve \phi_2(x_2) along Back-Right Wall (x = -1.2)

    ctx.beginPath();

    ctx.strokeStyle = "#FFA500";

    ctx.lineWidth = 3.0;

    for (let v = -1.1; v <= 1.11; v += 0.1) {

      const phi2 = 0.5 + 0.5 * Math.cos(2.6 * (v + 1.1) + timeSec * 2);

      const p = proj(-1.2, v, -0.8 + 1.3 * phi2, w, h);

      if (v === -1.1) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    // Product Surface f(x_1, x_2) = \phi_1(x_1) \phi_2(x_2)

    for (let u = -1.0; u <= 1.01; u += 0.4) {

      const phi1 = Math.exp(-0.75 * (u + 1.1));

      ctx.beginPath();

      ctx.strokeStyle = "rgba(32, 178, 170, 0.5)";

      ctx.lineWidth = 1.5;

      for (let v = -1.0; v <= 1.01; v += 0.15) {

        const phi2 = 0.5 + 0.5 * Math.cos(2.6 * (v + 1.1) + timeSec * 2);

        const p = proj(u, v, -0.8 + 1.4 * phi1 * phi2, w, h);

        if (v === -1.0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    drawNode3D("Phi_1", 0.0, -1.2, 0.0, 7.5, "#4169E1", "#fff", "φ₁(x₁) Spatial", "1D Spatial Decay Factor φ₁(x₁) (Anisotropic Channel 1)", w, h);

    drawNode3D("Phi_2", -1.2, 0.0, 0.1, 7.5, "#FFA500", "#fff", "φ₂(x₂; t') Charge", "1D Charge/Temporal Factor φ₂(x₂; t') modulated by Ganzläufige Äondyne t'", w, h);

  }



  // Stage 3: Corporate Calculus & Double Partial Sieve Theorem 8.1 (1/2 y^2 + 1/2 y^2 = y^2)

  function renderStage3(w, h) {

    const s = 1.05;

    // Lower Triangle: Syncolatively Partial Integrator _+(y,y)? (Area = 1/2 y^2)

    const tri1 = [proj(-s, -s, -0.4, w, h), proj(s, -s, -0.4, w, h), proj(s, s, 0.5, w, h)];

    ctx.save();

    ctx.fillStyle = "rgba(65, 105, 225, 0.34)";

    ctx.strokeStyle = "#4169E1";

    ctx.lineWidth = 2.4;

    ctx.beginPath();

    ctx.moveTo(tri1[0].sx, tri1[0].sy);

    tri1.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));

    ctx.closePath();

    ctx.fill();

    ctx.stroke();

    ctx.restore();



    // Upper Triangle: Metrophorically Partial Integrator ^+(y,y)? (Area = 1/2 y^2)

    const tri2 = [proj(-s, -s, -0.4, w, h), proj(-s, s, -0.4, w, h), proj(s, s, 0.5, w, h)];

    ctx.save();

    ctx.fillStyle = "rgba(32, 178, 170, 0.34)";

    ctx.strokeStyle = "#20B2AA";

    ctx.lineWidth = 2.4;

    ctx.beginPath();

    ctx.moveTo(tri2[0].sx, tri2[0].sy);

    tri2.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));

    ctx.closePath();

    ctx.fill();

    ctx.stroke();

    ctx.restore();



    drawLine3D(tri1[0], tri1[2], "#FFD700", 3.4);

    drawNode3D("Sieve_Half1", 0.35, -0.45, -0.1, 8, "#4169E1", "#fff", "₊(y,y)? = ½y²", "Syncolatively Partial Integrator (SM Eq. 35)", w, h);

    drawNode3D("Sieve_Half2", -0.35, 0.45, -0.1, 8, "#20B2AA", "#fff", "⁺(y,y)? = ½y²", "Metrophorically Partial Integrator: Sum = y² (Thm. 8.1, SM-35a)", w, h);

  }



  // Stage 4 & 5: Cornered Manifold M_n, Fehlstelle 0, Einheit E & Unital Base Envelope \mathcal{A}_{\mathbb{K}}(\mathcal{M}_n)

  function renderStage4And5(w, h, st) {

    const isStage5 = (st >= 4.5);

    // Flat Constant Unit Section Plane c_0 \cdot 1_{\mathcal{A}} at z = -0.75

    const uPlane = [

      proj(-1.2, -1.2, -0.75, w, h), proj(1.2, -1.2, -0.75, w, h),

      proj(1.2,  1.2, -0.75, w, h), proj(-1.2,  1.2, -0.75, w, h)

    ];

    ctx.save();

    ctx.fillStyle = "rgba(255, 165, 0, 0.16)";

    ctx.strokeStyle = "#FFA500";

    ctx.lineWidth = 2.0;

    ctx.beginPath();

    ctx.moveTo(uPlane[0].sx, uPlane[0].sy);

    uPlane.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));

    ctx.closePath();

    ctx.fill();

    ctx.stroke();

    ctx.restore();



    // Rapidly Decreasing Schwartz Bell f \in \mathscr{S}(\mathcal{M}_n) rising above 1_{\mathcal{A}}

    for (let r = 0.25; r <= 1.15; r += 0.3) {

      const z = -0.75 + 1.45 * Math.exp(-2.2 * r * r);

      ctx.beginPath();

      ctx.strokeStyle = "#20B2AA";

      ctx.lineWidth = 2.0;

      for (let i = 0; i <= 36; i++) {

        const a = (i / 36) * Math.PI * 2;

        const p = proj(r * Math.cos(a), r * Math.sin(a), z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    drawNode3D("Env_Zero", -1.2, -1.2, -0.75, 8, "#DC143C", "#FFD700", "Fehlstelle 0 ∈ ℳ_n", "Additive Identity 0_𝕂 & Geometric Corner Origin 0 ∈ (ℝ_≥0)^n", w, h);

    drawNode3D("Env_Unit",  1.2, -1.2, -0.75, 8, "#FFA500", "#fff", "Einheit E ≡ 1_𝒜", "Unital Base Ring Envelope 𝒜_𝕂(ℳ_n) = 𝕂·1_𝒜 ⊕ 𝒮(ℳ_n, 𝕂) (Def. 8.4)", w, h);

    drawNode3D("Env_Peak",  0.0,  0.0,  0.70, 9.5, "#FFD700", "#20B2AA", isStage5 ? "‖f‖_{α,β} = sup|x^α ∂^β f|" : "⊗̂_π ≅ ⊗̂_ε (Nuclear)", "Nuclear Fréchet Ideal 𝒮(ℳ_n) where Projective & Injective Cross-Norms Coincide!", w, h);

  }



  // Stage 6: Exterior Differential \tilde{d}| & Poincaré Radial Homotopy Ray I_0 (Def. 8.5)

  function renderStage6(w, h) {

    const pOrig = drawNode3D("Poin_0", -1.15, -0.95, -0.75, 8.5, "#DC143C", "#FFD700", "Origin 0 (f(0))", "Star-Shaped Octant Anchor 0 ∈ ℳ_n for Poincaré Homotopy Operator I₀", w, h);

    const pTarg = drawNode3D("Poin_x",  1.15,  0.95,  0.75, 9.5, "#FFD700", "#20B2AA", "Target x (I₀(d̃f) = f(x)−f(0))", "Def. 8.5 Fundamental Theorem: d̃(I₀ ω) = ω and I₀(d̃f)(x) = f(x) − f(0)", w, h);



    // Straight Radial Ray \gamma_x(t) = t x

    drawLine3D(pOrig, pTarg, "#FFD700", 3.4);



    // Bowed Alternative Path \gamma_\kappa showing exact Path-Independence on closed 1-forms

    ctx.beginPath();

    ctx.strokeStyle = "#20B2AA";

    ctx.lineWidth = 2.4;

    ctx.setLineDash([5, 3]);

    for (let i = 0; i <= 40; i++) {

      const t = i / 40;

      const bow = 0.85 * Math.sin(t * Math.PI);

      const p = proj(-1.15 + 2.3 * t - bow * 0.5, -0.95 + 1.9 * t + bow, -0.75 + 1.5 * t + bow * 0.4, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();

    ctx.setLineDash([]);



    // Animated Integration Particle t \in [0, 1] along Radial Ray

    const s = (timeSec * 0.55) % 1.0;

    drawNode3D("Poin_Pt", -1.15 + 2.3 * s, -0.95 + 1.9 * s, -0.75 + 1.5 * s, 6, "#ffffff", "#FFD700", "γ_x(t) = tx", "Radial Homotopy Evaluation Point tx ∈ [0, x]", w, h);

  }



  // Stage 7 & 8: Seeley Moment-Matched Corner Extension \mathcal{E}^{(n)} & Nuclear Wave-Packet (Thm. 8.6)

  function renderStage7And8(w, h, st) {

    const isStage8 = (st >= 7.5);

    // 4-Quadrant Surface across Corner Boundary x_1 = 0: x >= 0 (Teal) vs Seeley Extension x < 0 (Purple)

    for (let u = -1.45; u <= 1.46; u += 0.28) {

      ctx.beginPath();

      ctx.strokeStyle = (u >= 0) ? "#20B2AA" : "#9370DB";

      ctx.lineWidth = 1.8;

      for (let v = -1.15; v <= 1.16; v += 0.2) {

        const z = isStage8

          ? 0.72 * Math.exp(-0.55 * (u * u + v * v)) * Math.cos(2.4 * u * v + timeSec * 2)

          : 0.65 * Math.exp(-0.65 * (u * u + v * v)) * Math.cos(1.8 * u);

        const p = proj(u, v, -0.2 + z, w, h);

        if (v === -1.15) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    // Golden Corner Wall Divider x_1 = 0

    drawLine3D(proj(0, -1.25, -0.2, w, h), proj(0, 1.25, -0.2, w, h), "#FFD700", 3.2, [4, 2]);

    drawNode3D("See_Pos",  0.85, 0, 0.35, 8, "#20B2AA", "#fff", "x ≥ 0: 𝒮(ℳ_n)", "Physical Positive Octant Kernel f(x₁,x₂) ∈ 𝒮((ℝ_≥0)^n)", w, h);

    drawNode3D("See_Ext", -0.85, 0, 0.25, 8, "#9370DB", "#FFD700", isStage8 ? "∑ λ_k φ_k^(1)⊗φ_k^(2)" : "x < 0: Seeley ℰ^(n)f", isStage8 ? "Thm. 8.6 Nuclear Series: ∑ |λ_k| = cosh(1) ≈ 1.543 < ∞" : "Thm. 8.6 Vandermonde Extension: ∑ a_k(−2^k)^m = 1 matches all ∂^m at x=0!", w, h);

  }



  // Stage 9: Multilinear Polarization Sign-Cube \epsilon \in \{-1,+1\}^3 & Arity Reduction (Thm. 8.8)

  function renderStage9(w, h) {

    const s = 0.72;

    const cubePts = [];

    for (let e1 of [-1, 1]) for (let e2 of [-1, 1]) for (let e3 of [-1, 1]) {

      const prod = e1 * e2 * e3;

      const p = drawNode3D(

        `Pol_${e1}_${e2}_${e3}`, e1 * s - 0.35, e2 * s, e3 * s, 5.5,

        prod > 0 ? "#20B2AA" : "#FFA500", "#fff", "",

        `Polarization Sign Vertex ε = (${e1},${e2},${e3}), ∏ ε_i = ${prod > 0 ? "+1" : "−1"}`, w, h

      );

      cubePts.push({ e: [e1, e2, e3], p });

    }

    for (let i = 0; i < 8; i++) {

      for (let j = i + 1; j < 8; j++) {

        let d = 0;

        for (let k = 0; k < 3; k++) if (cubePts[i].e[k] !== cubePts[j].e[k]) d++;

        if (d === 1) drawLine3D(cubePts[i].p, cubePts[j].p, "rgba(130,170,255,0.45)", 1.4);

      }

    }

    const pRed = drawNode3D("F_red", 1.15, 0, 0, 10.5, "#FFD700", "#20B2AA", "F_red(x₁,x₂) ∈ 𝒪(2;1)", "Thm. 8.8 Homometral Reduction: Nominal arity m=3 collapses to strict binary arity k=2 < 3!", w, h);

    cubePts.forEach(c => drawLine3D(c.p, pRed, "rgba(255,215,0,0.35)", 1.3, [3, 2]));

  }



  // Stage 10: Algebraic 15-to-3 Corporate Class Collapse Funnel (Thm. 8.9)

  function renderStage10(w, h) {

    // Upper Ring of 15 General Qualitative Corporate Classes collapsing onto 3 Quantitative Modes

    const surv = [

      { id: "Kor_K",  x: -1.05, y: 0, z: -0.75, col: "#20B2AA", lbl: "Kor_{K} (Pure Coupled)", info: "Synchronized Column 1: {K_m, K_s} — Shared pushout coordinates force functional coupling" },

      { id: "Kor_KC", x:  0.00, y: 0, z: -0.75, col: "#FFD700", lbl: "Kor_{K,C} (Mixed Coupled+Parallel)", info: "Both Synchronized Columns {K_m, C_m, K_s, C_s} — Partial coupling + parallel composition" },

      { id: "Kor_C",  x:  1.05, y: 0, z: -0.75, col: "#4169E1", lbl: "Kor_{C} (Pure Parallel)", info: "Synchronized Column 2: {C_m, C_s} — Disjoint coproduct coordinates act block-diagonally" }

    ];

    const sPts = surv.map(s => drawNode3D(s.id, s.x, s.y, s.z, 10, s.col, "#fff", s.lbl, s.info, w, h));



    for (let i = 0; i < 15; i++) {

      const a = timeSec * 0.35 + (i / 15) * Math.PI * 2;

      const isSync = (i === 0 || i === 5 || i === 10);

      const pUp = drawNode3D(

        "C15_" + i, 1.32 * Math.cos(a), 1.32 * Math.sin(a), 0.85,

        isSync ? 7 : 4.5, isSync ? "#FFD700" : "#64748b", "#fff",

        isSync ? "✓ Sync" : "",

        isSync ? "Column-Synchronized Class: Survives in Ctx_quant!" : "Unsynchronized Qualitative Class: Collapses under ring evaluation in 𝕂 (Thm. 8.9)", w, h

      );

      const targ = sPts[i % 3];

      drawLine3D(pUp, targ, isSync ? "#FFD700" : "rgba(148,163,184,0.28)", isSync ? 2.4 : 1.1, isSync ? null : [3, 3]);

    }

  }



  // Master 60fps Loop

  function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch8-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }

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



    function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);

    else if (stInt === 2) renderStage2(w, h);

    else if (stInt === 3) renderStage3(w, h);

    else if (stInt === 4 || stInt === 5) renderStage4And5(w, h, stArg);

    else if (stInt === 6) renderStage6(w, h);

    else if (stInt === 7 || stInt === 8) renderStage7And8(w, h, stArg);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh8Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch8-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch8-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch8-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch8-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch8-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh8Stage = function(val) { window.setCh8Stage(val, true); };



  window.enableCh8Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch8-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh8WithDeck();

  };



  window.toggleCh8Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch8-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh8Spotlight = function() {

    const hud = document.getElementById('ch8-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh8Minimize = function() {

    const hud = document.getElementById('ch8-3d-hud');

    const b = document.getElementById('ch8-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh8WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch8-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-8, section[data-chapter="8"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.setCh8Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh8WithDeck = syncCh8WithDeck;
  }



  // 3D Orbit Drag, Wheel Zoom & Node Click Hit-Testing

  wrap.addEventListener('mousedown', e => {

    e.stopPropagation();

    isDragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mousemove', e => {

    if (!isDragging) return;

    camYaw += (e.clientX - lastX) * 0.012;

    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));

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

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    camYaw += dx * 0.012;
    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('mouseup', () => { isDragging = false; });



  wrap.addEventListener('click', e => {

    e.stopPropagation();

    const rect = canvas.getBoundingClientRect();

    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    let hit = null;

    for (let i = hitNodes.length - 1; i >= 0; i--) {

      const n = hitNodes[i];

      if (Math.hypot(mx - n.p.sx, my - n.p.sy) <= n.r + 6) { hit = n; break; }

    }

    const insp = document.getElementById('ch8-node-inspector');

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



  function init() {

    resize();

    syncCh8WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_8 = false;
    const synBindSync_syncCh8WithDeck = () => {
      if (syncRaf_8) return;
      syncRaf_8 = true;
      requestAnimationFrame(() => {
        syncRaf_8 = false;
        syncCh8WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh8WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh8WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh8WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh8WithDeck, { passive: true });

    const revEl_syncCh8WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh8WithDeck) {
      revEl_syncCh8WithDeck.addEventListener('scroll', synBindSync_syncCh8WithDeck, { passive: true });
      revEl_syncCh8WithDeck.addEventListener('touchmove', synBindSync_syncCh8WithDeck, { passive: true });
    }
    const vpEl_syncCh8WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh8WithDeck) {
      vpEl_syncCh8WithDeck.addEventListener('scroll', synBindSync_syncCh8WithDeck, { passive: true });
      vpEl_syncCh8WithDeck.addEventListener('touchmove', synBindSync_syncCh8WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh8WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh8WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh8WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh8WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh8WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh8WithDeck);
    }

    const hud = document.getElementById('ch8-3d-hud');

    if (hud) {

      hud.querySelectorAll('input, button').forEach(el => {

        el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());

      });

    }

  }



  init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh8Engine);
  } else {
    runCh8Engine();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 9 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
window.showGenericTab = window.showGenericTab || function(prefix, idx, maxIdx, btnEl) {
  for (let i = 1; i <= maxIdx; i++) {
    const p = document.getElementById(prefix + '-' + i);
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

(function() {
  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    k = Math.min(k, n - k);
    let c = 1;
    for (let i = 0; i < k; i++) {
      c = Math.round((c * (n - i)) / (i + 1));
    }
    return c;
  }

  // WIDGET 1: §9.1.1 Sieve-State Partition (SM-59, SM-59a) & Cascade Combinatorics (SM-60)
  window.ch9_updateSieveCascade = function() {
    const elOmega = document.getElementById('ch9-sieve-omega');
    if (!elOmega) return;
    const omega = parseInt(elOmega.value, 10);
    const n = 2 * omega;
    const omega1El = document.getElementById('ch9-sieve-w1');
    omega1El.max = Math.max(1, n - 1);
    const omega1 = Math.min(parseInt(omega1El.value, 10), n - 1);
    omega1El.value = omega1;

    document.getElementById('ch9-sieve-omega-val').innerText = `n=${n} (ω=${omega})`;
    document.getElementById('ch9-sieve-w1-val').innerText = omega1;

    const zPlus = 2 * (Math.pow(3, omega) - Math.pow(2, omega) + 1);
    const L1 = binom(n, omega1);
    const rankFilteredL2 = Math.max(1, Math.round(L1 / 2));

    let terms = [];
    for (let p = 0; p < omega; p++) {
      const sieveCount = Math.pow(2, omega - p) - 1;
      const b = binom(omega, p);
      terms.push(`p=${p}: (${sieveCount})·C(${omega},${p})=${sieveCount * b}`);
    }

    const svg = document.getElementById('ch9-sieve-svg');
    if (svg) {
      const showB = Math.min(L1, 6);
      const showM = Math.min(rankFilteredL2, 3);
      let html = `<rect x="4" y="4" width="232" height="112" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      let bCoords = [];
      for (let i = 0; i < showB; i++) {
        let bx = 26 + (i * 188) / Math.max(1, showB - 1);
        if (showB === 1) bx = 120;
        bCoords.push(bx);
      }
      let mCoords = [];
      for (let j = 0; j < showM; j++) {
        let mx = 55 + (j * 130) / Math.max(1, showM - 1);
        if (showM === 1) mx = 120;
        mCoords.push(mx);
      }
      bCoords.forEach(bx => {
        mCoords.forEach(mx => {
          html += `<line x1="${bx}" y1="92" x2="${mx}" y2="56" stroke="rgba(65,105,225,0.45)" stroke-width="1.3"/>`;
        });
      });
      mCoords.forEach(mx => {
        html += `<line x1="${mx}" y1="56" x2="120" y2="20" stroke="#20B2AA" stroke-width="1.8"/>`;
      });
      bCoords.forEach((bx, idx) => {
        html += `<rect x="${bx - 12}" y="84" width="24" height="16" rx="3" fill="#151c2c" stroke="#4169E1" stroke-width="1.4"/>`;
        html += `<text x="${bx}" y="95" fill="#93c5fd" font-size="7.5" text-anchor="middle">g⁽¹⁾_${idx + 1}</text>`;
      });
      mCoords.forEach((mx, idx) => {
        html += `<rect x="${mx - 14}" y="48" width="28" height="16" rx="3" fill="#0f292a" stroke="#20B2AA" stroke-width="1.4"/>`;
        html += `<text x="${mx}" y="59" fill="#5eead4" font-size="7.5" text-anchor="middle">κ_α T_α</text>`;
      });
      html += `<rect x="78" y="10" width="84" height="18" rx="4" fill="#2e1f0f" stroke="#FFD700" stroke-width="1.8"/>`;
      html += `<text x="120" y="22" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">Apex ²ḡ_∞ (L_M=1)</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-sieve-readout');
    if (box) {
      box.innerHTML =
        `<b>Prop. 9.1 Closed-Form Sieve Partition (SM-59, 59a):</b> Z₊ = 2(3^${omega} − 2^${omega} + 1) = <b style="color:#FFD700;">${zPlus}</b> states ` +
        `<span style="color:#94a3b8;">[${terms.join(', ')}]</span><br>` +
        `<b>Kaskadenbasis (α=1, SM-60):</b> L₁ = C(${n}, ${omega1}) = <b style="color:#5eead4;">${L1}</b> basal partial metrics ²ḡ⁽¹⁾_(γ₁) ⟶ Rank-filtered tier L_α = <b>${rankFilteredL2}</b> ⟶ <b>Apex L_M = 1</b>.`;
    }
  };

  // WIDGET 2: §9.2.1 Mixed-Variant Covariant Derivative & Transposition Identity
  window.ch9_updateTransposedTransport = function() {
    const elCurl = document.getElementById('ch9-trans-curl');
    if (!elCurl) return;
    const curl = parseFloat(elCurl.value);
    const amp = parseFloat(document.getElementById('ch9-trans-amp').value);
    const mu = parseInt(document.getElementById('ch9-trans-mu').value, 10);

    document.getElementById('ch9-trans-curl-val').innerText = curl.toFixed(2);
    document.getElementById('ch9-trans-amp-val').innerText = amp.toFixed(2);
    document.getElementById('ch9-trans-mu-val').innerText = `(${mu}, ${4 - mu})`;

    const skewGamma = amp > 0.01 ? curl / amp : 0.0;
    const svg = document.getElementById('ch9-trans-svg');
    if (svg) {
      let html = `<rect x="5" y="5" width="220" height="105" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      const cx = 115, cy = 58;
      const r = 18 + Math.abs(curl) * 18;
      const col = Math.abs(curl) < 0.05 ? "#4169E1" : "#FFA500";
      html += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none" stroke="${col}" stroke-width="2" stroke-dasharray="${Math.abs(curl) < 0.05 ? '4,3' : 'none'}"/>`;
      for (let k = 0; k < 6; k++) {
        const ang = (k / 6) * 2 * Math.PI;
        const x1 = cx + r * Math.cos(ang);
        const y1 = cy + r * Math.sin(ang);
        const tx = -Math.sin(ang) * curl * 14;
        const ty = Math.cos(ang) * curl * 14;
        html += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${(x1 + tx).toFixed(1)}" y2="${(y1 + ty).toFixed(1)}" stroke="#20B2AA" stroke-width="2.2"/>`;
        html += `<circle cx="${(x1 + tx).toFixed(1)}" cy="${(y1 + ty).toFixed(1)}" r="2.8" fill="#FFD700"/>`;
      }
      html += `<text x="${cx}" y="${cy + 3}" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">2 T^s_ik = ${skewGamma.toFixed(2)}</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-trans-readout');
    if (box) {
      const statusStr = (Math.abs(curl) > 0.05 && amp > 0.1)
        ? `<span style="color:#20B2AA;"><b>Non-vanishing Curl &amp; Non-degenerate A_s:</b> Skew connection 2A_s Γ^s_[ik] = ${curl.toFixed(2)} ≠ 0 certified!</span>`
        : `<span style="color:#FFA500;"><b>Epistemic Firewall Caveat (Rem. 9.2):</b> Vanishing curl or degenerate A_s leaves skew connection undetermined without extra premise.</span>`;
      box.innerHTML =
        `<b>Valence (μ=${mu} cov, ${4 - mu} contra):</b> Eq. (9.5) has <b>${mu}</b> negative Christoffel terms &amp; <b>${4 - mu}</b> positive terms.<br>` +
        `<b>Transposed Identity Eq. (9.6):</b> ∂_k A_i − ∂_i A_k = <b>${curl.toFixed(2)}</b> = A_s({s/ik} − {s/ki}) ⇒ Implied skew torsion Γ^s_[ik] ≈ <b style="color:#FFD700;">${(0.5 * skewGamma).toFixed(3)}</b>. ${statusStr}`;
    }
  };

  // WIDGET 3: §9.2.2 36-Component Hermetry Matrix Switchboard & 4D Magnetic Vorticity Toy Model
  let currentHermetryBlock = 'all';
  window.ch9_selectHermetryBlock = function(blockId) {
    currentHermetryBlock = blockId;
    window.ch9_updateHermetryMatrix();
  };

  window.ch9_updateHermetryMatrix = function() {
    const elB = document.getElementById('ch9-herm-b');
    if (!elB) return;
    const B = parseFloat(elB.value);
    document.getElementById('ch9-herm-b-val').innerText = B.toFixed(2);

    const svg = document.getElementById('ch9-herm-svg');
    if (svg) {
      let html = '';
      const cellW = 32, cellH = 19, offX = 16, offY = 8;
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
          const isSym = c >= r;
          const inR4 = r < 4 && c < 4;
          const inS2 = r >= 4 && c >= 4;
          let channel = '';
          let fill = '#1e293b', stroke = '#475569', lbl = '';
          if (inR4 && isSym) { channel = 'grav'; fill = 'rgba(65,105,225,0.38)'; stroke = '#4169E1'; lbl = 'g_μν'; }
          else if (inR4 && !isSym) { channel = 'em'; fill = 'rgba(32,178,170,0.38)'; stroke = '#20B2AA'; lbl = 'F_μν'; }
          else if (!inR4 && !inS2 && isSym) { channel = 'kk'; fill = 'rgba(255,165,0,0.35)'; stroke = '#FFA500'; lbl = 'KK+'; }
          else if (!inR4 && !inS2 && !isSym) { channel = 'tors'; fill = 'rgba(220,20,60,0.35)'; stroke = '#DC143C'; lbl = 'Tor-'; }
          else if (inS2 && isSym) { channel = 'meso'; fill = 'rgba(147,112,219,0.38)'; stroke = '#9370DB'; lbl = 'S₂+'; }
          else { channel = 'ent'; fill = 'rgba(255,215,0,0.38)'; stroke = '#FFD700'; lbl = '[∂₅∂₆]'; }

          const active = (currentHermetryBlock === 'all' || currentHermetryBlock === channel ||
            (currentHermetryBlock === 'sym21' && isSym) || (currentHermetryBlock === 'skew15' && !isSym));
          const op = active ? '1.0' : '0.20';
          const x = offX + c * cellW, y = offY + r * cellH;
          html += `<g class="ch9-grid-cell" opacity="${op}" onclick="ch9_selectHermetryBlock('${channel}')">`;
          html += `<rect x="${x}" y="${y}" width="${cellW - 2}" height="${cellH - 2}" rx="2.5" fill="${fill}" stroke="${stroke}" stroke-width="${active ? 1.5 : 0.7}"/>`;
          html += `<text x="${x + (cellW - 2) / 2}" y="${y + 12}" fill="#e2e8f0" font-size="6.8" font-family="monospace" text-anchor="middle">${lbl}</text>`;
          html += `</g>`;
        }
      }
      svg.innerHTML = html;
    }

    const det4 = -(1 + B * B);
    const gxxInv = (1 / (1 + B * B)).toFixed(3);
    const gxyInv = (-B / (1 + B * B)).toFixed(3);

    const descMap = {
      all: '<b>All 36 Components (R₆ = R₄ × S₂):</b> 21 Symmetric (²ḡ₊) + 15 Skew-Symmetric (²ḡ₋) — complete Ontic Structural Realism switchboard.',
      sym21: '<b>21 Symmetric Potentials (²ḡ₊):</b> 10 Spacetime Gravity g_μν (R₄) + 8 Kaluza–Klein (R₄×S₂) + 3 Mesobaric Scalars (S₂).',
      skew15: '<b>15 Skew-Symmetric Potentials (²ḡ₋):</b> 6 Maxwell Vorticity F_μν (R₄) + 8 Chiral Spin-Torsion (R₄×S₂) + 1 Entelechial Commutator [∂₅,∂₆] (S₂).',
      grav: '<b>10 Spacetime Metric Potentials g_μν (R₄ × R₄, Symmetric):</b> Einsteinian Riemannian curvature and gravitational acceleration.',
      em: '<b>6 Electromagnetic Vorticity Components F_μν (R₄ × R₄, Skew):</b> Maxwell field-strength tensor embedded as metric skew-symmetry.',
      kk: '<b>8 Kaluza–Klein Gravito-EM Potentials (R₄ × S₂, Symmetric):</b> Cross-dimensional meso-field gauge couplings.',
      tors: '<b>8 Chiral Spin-Torsion Potentials (R₄ × S₂, Skew):</b> Rotational momentum and inertial mass-flux couplings.',
      meso: '<b>3 Mesobaric Scalars (S₂ × S₂, Symmetric):</b> Internal organizational plane metric potentials on S₂.',
      ent: '<b>1 Entelechial Commutator [∂₅, ∂₆] (S₂ × S₂, Skew):</b> Non-commuting aeonic-entelechial evolutionary sector.'
    };

    const box = document.getElementById('ch9-herm-readout');
    if (box) {
      box.innerHTML =
        `${descMap[currentHermetryBlock] || descMap.all}<br>` +
        `<b>4D Maxwell Vorticity Toy Metric (F_xy = B = ${B.toFixed(2)}):</b> det(²ḡ) = −(1 + B²) = <b style="color:#FFD700;">${det4.toFixed(3)}</b> | Right-Inverse g^xx = g^yy = <b>${gxxInv}</b>, g^xy = −g^yx = <b style="color:#20B2AA;">${gxyInv}</b>.`;
    }
  };

  // WIDGET 4: §9.3.1 Palatini Cross-Metric Coupling Tensor Q_(μγ) (Theorem 9.6, SM-53)
  window.ch9_updateCouplingQ = function() {
    const elAniso = document.getElementById('ch9-q-aniso');
    if (!elAniso) return;
    const aniso = parseFloat(elAniso.value);
    const angleDeg = parseFloat(document.getElementById('ch9-q-angle').value);
    document.getElementById('ch9-q-aniso-val').innerText = aniso.toFixed(2);
    document.getElementById('ch9-q-angle-val').innerText = angleDeg.toFixed(0) + '°';

    const theta = (angleDeg * Math.PI) / 180.0;
    // Construct two 2x2 partial metrics g_(1), g_(2) (omega = 2 model) with homothety at aniso=0, angle=0
    const g1_xx = 1 + aniso * Math.cos(theta), g1_xy = 0.5 * aniso * Math.sin(theta), g1_yy = 1 - 0.5 * aniso * Math.cos(theta);
    const g2_xx = 1 - aniso * Math.cos(theta), g2_xy = -0.5 * aniso * Math.sin(theta), g2_yy = 1 + 0.5 * aniso * Math.cos(theta);
    const g_xx = g1_xx + g2_xx, g_xy = g1_xy + g2_xy, g_yy = g1_yy + g2_yy;
    const detG = g_xx * g_yy - g_xy * g_xy;
    const gInv_xx = g_yy / detG, gInv_xy = -g_xy / detG, gInv_yy = g_xx / detG;

    // Q_(1)m^i = g^{is} g_{(1)sm} - (1/2) delta^i_m
    const q11 = gInv_xx * g1_xx + gInv_xy * g1_xy - 0.5;
    const q12 = gInv_xx * g1_xy + gInv_xy * g1_yy;
    const q21 = gInv_xy * g1_xx + gInv_yy * g1_xy;
    const q22 = gInv_xy * g1_xy + gInv_yy * g1_yy - 0.5;
    const frobQ = Math.sqrt(q11 * q11 + q12 * q12 + q21 * q21 + q22 * q22);

    const svg = document.getElementById('ch9-q-svg');
    if (svg) {
      const rx1 = 26 * (1 + 0.35 * aniso), ry1 = 26 * (1 - 0.25 * aniso);
      const rx2 = 26 * (1 - 0.25 * aniso), ry2 = 26 * (1 + 0.35 * aniso);
      let html = `<rect x="4" y="4" width="222" height="106" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      html += `<g transform="translate(115,57)">`;
      html += `<ellipse cx="0" cy="0" rx="26" ry="26" fill="none" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="3,3"/>`;
      html += `<ellipse cx="0" cy="0" rx="${rx1.toFixed(1)}" ry="${ry1.toFixed(1)}" transform="rotate(${(angleDeg / 2).toFixed(1)})" fill="rgba(65,105,225,0.20)" stroke="#4169E1" stroke-width="2"/>`;
      html += `<ellipse cx="0" cy="0" rx="${rx2.toFixed(1)}" ry="${ry2.toFixed(1)}" transform="rotate(${(-angleDeg / 2).toFixed(1)})" fill="rgba(32,178,170,0.20)" stroke="#20B2AA" stroke-width="2"/>`;
      html += `</g>`;
      html += `<text x="115" y="18" fill="#cbd5e1" font-size="8" text-anchor="middle">g₍₁₎ (Blue) vs. g₍₂₎ (Teal) vs. Homothety g/ω (Gold)</text>`;
      html += `<text x="115" y="103" fill="${frobQ < 0.005 ? '#20B2AA' : '#FFA500'}" font-size="8.5" font-weight="bold" text-anchor="middle">‖Q_(μγ)‖_F = ${frobQ.toFixed(4)}</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-q-readout');
    if (box) {
      const stateMsg = frobQ < 0.005
        ? `<span style="color:#20B2AA;"><b>HOMOTHETY DECOUPLED (g_(μ) = g/ω):</b> Koppelungstensor Q_(μγ) ≡ 0 — zero cross-metric force!</span>`
        : `<span style="color:#FFA500;"><b>ACTIVE STRUKTURASSOZIATION (g_(μ) ≠ g/ω):</b> Non-linear commutator coupling Q_(μγ) ≠ 0 generates cross-metric forces!</span>`;
      box.innerHTML =
        `<b>Thm. 9.6 Koppelungstensor Matrix Q¹_m (SM-53):</b> [[${q11.toFixed(3)}, ${q12.toFixed(3)}], [${q21.toFixed(3)}, ${q22.toFixed(3)}]] | Frobenius Norm ‖Q‖_F = <b style="color:#FFD700;">${frobQ.toFixed(4)}</b><br>${stateMsg}`;
    }
  };

  // WIDGET 5: §9.3.1b Contortion Tensor K^i_kl & Chiral Parallel Transport Streamlines
  window.ch9_updateContortionStreamlines = function() {
    const elTors = document.getElementById('ch9-cont-tors');
    if (!elTors) return;
    const T0 = parseFloat(elTors.value);
    const sDist = parseFloat(document.getElementById('ch9-cont-s').value);
    document.getElementById('ch9-cont-tors-val').innerText = T0.toFixed(2);
    document.getElementById('ch9-cont-s-val').innerText = sDist.toFixed(2);

    const rotAngleDeg = (T0 * sDist * 90) / Math.PI;
    const curvQuad = 0.5 * T0 * T0;

    const svg = document.getElementById('ch9-cont-svg');
    if (svg) {
      let html = `<rect x="4" y="4" width="222" height="106" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      html += `<line x1="18" y1="78" x2="210" y2="78" stroke="#4169E1" stroke-width="2.2"/>`;
      let pathPts = [];
      for (let i = 0; i <= 36; i++) {
        const u = i / 36.0;
        const x = 18 + u * 192;
        const phi = u * sDist * T0 * 2.2;
        const y = 78 - (28 * Math.cos(phi) + 10 * Math.sin(phi));
        pathPts.push((i === 0 ? 'M ' : 'L ') + x.toFixed(1) + ',' + y.toFixed(1));
      }
      html += `<path d="${pathPts.join(' ')}" fill="none" stroke="#FFA500" stroke-width="1.8"/>`;
      for (let k = 0; k <= 6; k++) {
        const u = k / 6.0;
        const x = 18 + u * 192;
        // Symmetric Levi-Civita dashed arrow
        html += `<line x1="${x.toFixed(1)}" y1="78" x2="${x.toFixed(1)}" y2="48" stroke="rgba(65,105,225,0.55)" stroke-width="1.3" stroke-dasharray="2,2"/>`;
        // Contortion rotated arrow
        const phi = u * sDist * T0 * 2.2;
        const vx = x - 12 * Math.sin(phi);
        const vy = 78 - (28 * Math.cos(phi) + 10 * Math.sin(phi));
        html += `<line x1="${x.toFixed(1)}" y1="78" x2="${vx.toFixed(1)}" y2="${vy.toFixed(1)}" stroke="#20B2AA" stroke-width="2.1"/>`;
        html += `<circle cx="${vx.toFixed(1)}" cy="${vy.toFixed(1)}" r="2.6" fill="#FFD700"/>`;
      }
      html += `<text x="115" y="18" fill="#cbd5e1" font-size="7.8" text-anchor="middle">Dashed Blue: Levi-Civita (K=0) | Teal/Orange: Contortion Transport</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-cont-readout');
    if (box) {
      box.innerHTML =
        `<b>Def. 9.13 Contortion K_ikl = ½(T_ikl + T_lik − T_kli):</b> For torsion amplitude T₀ = <b>${T0.toFixed(2)}</b> over s = <b>${sDist.toFixed(2)}</b>, chiral frame rotation Δθ = <b style="color:#FFD700;">${rotAngleDeg.toFixed(1)}°</b>.<br>` +
        `<b>Curvature Difference (Rem.):</b> Quadratic contortion contribution ‖K ★ K‖ ≈ <b style="color:#20B2AA;">${curvQuad.toFixed(3)}</b> ` +
        (T0 === 0 ? `<span style="color:#93c5fd;">(²ḡ₋ = 0 ⇒ Standard Torsion-Free Levi-Civita Recovered!)</span>` : '');
    }
  };

  // WIDGET 6: §9.3.1d Metric Density Divergence & (n-2) Density Theorem (SM-46, SM-46a)
  window.ch9_updateDensityTheorem = function() {
    const elN = document.getElementById('ch9-dens-n');
    if (!elN) return;
    const n = parseInt(elN.value, 10);
    const lw = parseFloat(document.getElementById('ch9-dens-lw').value);
    const torsTr = parseFloat(document.getElementById('ch9-dens-tors').value);

    document.getElementById('ch9-dens-n-val').innerText = `n = ${n}`;
    document.getElementById('ch9-dens-lw-val').innerText = lw.toFixed(2);
    document.getElementById('ch9-dens-tors-val').innerText = torsTr.toFixed(2);

    const rhs = (n - 2) * lw;
    const svg = document.getElementById('ch9-dens-svg');
    if (svg) {
      const dims = [2, 4, 6, 8, 10, 12];
      let html = `<rect x="4" y="4" width="222" height="106" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      html += `<line x1="20" y1="88" x2="212" y2="88" stroke="#64748b" stroke-width="1.2"/>`;
      dims.forEach((d, idx) => {
        const val = (d - 2) * lw;
        const barH = Math.min(62, Math.abs(val) * 4.2);
        const bx = 28 + idx * 30;
        const by = 88 - barH;
        const isSel = d === n;
        const fill = isSel ? '#FFD700' : (d === 6 ? '#20B2AA' : '#4169E1');
        html += `<rect x="${bx}" y="${by.toFixed(1)}" width="18" height="${Math.max(2, barH).toFixed(1)}" rx="2" fill="${fill}" opacity="${isSel ? 1.0 : 0.65}"/>`;
        html += `<text x="${bx + 9}" y="100" fill="${isSel ? '#FFD700' : '#cbd5e1'}" font-size="7.5" font-weight="${isSel ? 'bold' : 'normal'}" text-anchor="middle">n=${d}</text>`;
        html += `<text x="${bx + 9}" y="${(by - 3).toFixed(1)}" fill="#e2e8f0" font-size="7" text-anchor="middle">${(d - 2)}⌞w</text>`;
      });
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-dens-readout');
    if (box) {
      let dimNote = n === 2 ? 'Vanishes identically in 2D conformal geometry (n−2 = 0)!'
        : (n === 4 ? 'Evaluates to 2 ⌞_l w in 4D Einsteinian spacetime (R₄).'
        : (n === 6 ? 'Evaluates to 4 ⌞_l w in the 6D physical Hermetry condensation space (R₆ = R₄ × S₂)!'
        : `Evaluates to ${n - 2} ⌞_l w in dimension n = ${n}.`));
      box.innerHTML =
        `<b>Thm. 9.10 (2) The (n−2) Density Identity (SM-46a):</b> g_ik ⌞⁽¹'²⁾_(+),l g̲^ik = (${n} − 2)·(${lw.toFixed(2)}) = <b style="color:#FFD700;">${rhs.toFixed(2)}</b> — <span style="color:#5eead4;">${dimNote}</span><br>` +
        `<b>Thm. 9.10 (1) Divergence Splitting (SM-46):</b> Antisymmetric difference sp ⌞⁽¹⁾ − sp ⌞⁽²⁾ = 2 A̲^k {s/sk}₋ = <b style="color:#FFA500;">${(2 * torsTr).toFixed(2)}</b>.`;
    }
  };

  // WIDGET 7: §9.3.2 DeTurck Parabolic Smoothing & Sobolev H^s Banach Contraction (Thm. 9.14)
  window.ch9_updateSobolevContraction = function() {
    const elTau = document.getElementById('ch9-sob-tau');
    if (!elTau) return;
    const tauM = parseFloat(elTau.value);
    const cGeom = parseFloat(document.getElementById('ch9-sob-cgeom').value);
    const c0 = parseFloat(document.getElementById('ch9-sob-c0').value);

    document.getElementById('ch9-sob-tau-val').innerText = tauM.toFixed(2);
    document.getElementById('ch9-sob-cgeom-val').innerText = cGeom.toFixed(1);
    document.getElementById('ch9-sob-c0-val').innerText = c0.toFixed(2);

    const kM = (cGeom * Math.exp(-c0 * tauM)) / tauM;
    const isContractive = kM < 1.0;

    const svg = document.getElementById('ch9-sob-svg');
    if (svg) {
      let html = `<rect x="4" y="4" width="222" height="106" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      html += `<line x1="24" y1="90" x2="212" y2="90" stroke="#64748b" stroke-width="1.2"/>`;
      html += `<line x1="24" y1="16" x2="24" y2="90" stroke="#64748b" stroke-width="1.2"/>`;
      let pts = [];
      for (let m = 0; m <= 8; m++) {
        const dist = Math.min(1.3, Math.pow(kM, m));
        const px = 24 + (m / 8.0) * 184;
        const py = 90 - (dist / 1.3) * 68;
        pts.push((m === 0 ? 'M ' : 'L ') + px.toFixed(1) + ',' + py.toFixed(1));
      }
      const strokeCol = isContractive ? '#20B2AA' : '#DC143C';
      html += `<path d="${pts.join(' ')}" fill="none" stroke="${strokeCol}" stroke-width="2.4"/>`;
      for (let m = 0; m <= 8; m++) {
        const dist = Math.min(1.3, Math.pow(kM, m));
        const px = 24 + (m / 8.0) * 184;
        const py = 90 - (dist / 1.3) * 68;
        html += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.2" fill="#FFD700"/>`;
      }
      html += `<text x="118" y="18" fill="${strokeCol}" font-size="8.2" font-weight="bold" text-anchor="middle">k_M = ${kM.toFixed(3)} ${isContractive ? '< 1 (Banach Contraction!)' : '≥ 1 (Increase τ_M!)'}</text>`;
      html += `<text x="118" y="103" fill="#94a3b8" font-size="7.5" text-anchor="middle">Cascade Iteration m = 0 … 8 ⟶ ‖g⁽ᵐ⁾ − ²ḡ_∞‖_{H^s}</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-sob-readout');
    if (box) {
      const err5 = Math.pow(kM, 5);
      box.innerHTML =
        `<b>Thm. 9.14 Contraction Modulus:</b> k_M = C_heat C_geom (e^{−c₀ τ_M} / τ_M) = <b style="color:${isContractive ? '#20B2AA' : '#ff6b81'};">${kM.toFixed(4)}</b> ` +
        (isContractive
          ? `⇒ <b>Strict Banach Contraction on B_{H^s}(ḡ, δ)!</b> Error after m=5 tiers: k_M⁵ = <b style="color:#FFD700;">${err5.toExponential(2)}</b>; elliptic bootstrap ⇒ <b>²ḡ_∞ ∈ C^∞(𝓜)</b>.`
          : `⇒ <b>Insufficient Parabolic Smoothing (k_M ≥ 1):</b> Increase cascade depth parameter τ_M ≥ τ_M* to damp high-frequency curvature!`);
    }
  };

  // WIDGET 8: §9.3.3 Übergangskriterium (SM-64) & Geodesic Singularity Fracture (Thm. 9.17)
  window.ch9_updateTransitionCriterion = function() {
    const elGrad = document.getElementById('ch9-tr-grad');
    if (!elGrad) return;
    const gradRatio = parseFloat(elGrad.value); // ||grad g|| * sqrt(tau)
    const chi = parseFloat(document.getElementById('ch9-tr-chi').value);
    document.getElementById('ch9-tr-grad-val').innerText = gradRatio.toFixed(2) + ' / √τ';
    document.getElementById('ch9-tr-chi-val').innerText = chi.toFixed(2);

    const critDet = 1.0 / (chi * chi); // since chi * sqrt(|g_(p)|) = 1 => |g_(p)| = 1/chi^2
    const fractured = gradRatio >= 1.0;

    const svg = document.getElementById('ch9-tr-svg');
    if (svg) {
      let html = `<rect x="4" y="4" width="222" height="106" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      // Draw transition wall at x = 122
      html += `<line x1="122" y1="10" x2="122" y2="100" stroke="#DC143C" stroke-width="2" stroke-dasharray="4,2"/>`;
      html += `<text x="122" y="18" fill="#ff6b81" font-size="7.5" font-weight="bold" text-anchor="middle">χ√|g_(p)| = 1</text>`;

      // Left half: smooth curve
      let smoothPts = [];
      for (let i = 0; i <= 25; i++) {
        const u = i / 25.0;
        const x = 14 + u * 108;
        const y = 78 - 42 * Math.sin(0.5 * Math.PI * u);
        smoothPts.push((i === 0 ? 'M ' : 'L ') + x.toFixed(1) + ',' + y.toFixed(1));
      }
      html += `<path d="${smoothPts.join(' ')}" fill="none" stroke="#4169E1" stroke-width="2.4"/>`;

      if (!fractured) {
        let rightPts = [];
        for (let i = 0; i <= 25; i++) {
          const u = i / 25.0;
          const x = 122 + u * 92;
          const y = 36 + 38 * Math.sin(0.5 * Math.PI * u);
          rightPts.push((i === 0 ? 'M ' : 'L ') + x.toFixed(1) + ',' + y.toFixed(1));
        }
        html += `<path d="${rightPts.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2.4"/>`;
        html += `<text x="168" y="96" fill="#20B2AA" font-size="7.8" font-weight="bold" text-anchor="middle">Smooth C² Continuum</text>`;
      } else {
        // Staircase discrete metronic lattice cells x_i = N_i alpha_i
        const steps = 6;
        let prevX = 122, prevY = 36;
        for (let k = 1; k <= steps; k++) {
          const u = k / steps;
          const nx = 122 + u * 92;
          const ny = 36 + 42 * u;
          html += `<line x1="${prevX.toFixed(1)}" y1="${prevY.toFixed(1)}" x2="${nx.toFixed(1)}" y2="${prevY.toFixed(1)}" stroke="#FFD700" stroke-width="2.2"/>`;
          html += `<line x1="${nx.toFixed(1)}" y1="${prevY.toFixed(1)}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#FFD700" stroke-width="2.2"/>`;
          html += `<circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="3" fill="#DC143C"/>`;
          prevX = nx; prevY = ny;
        }
        html += `<text x="168" y="96" fill="#FFD700" font-size="7.8" font-weight="bold" text-anchor="middle">Metronic Lattice 𝕄_τ^n (x_i = N_i α_i)</text>`;
      }
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-tr-readout');
    if (box) {
      box.innerHTML =
        `<b>Def. 9.16 Übergangskriterium (SM-64):</b> χ√|g_(p)| = 1 with χ = <b>${chi.toFixed(2)}</b> ⇒ Critical metric determinant |g_(p)|_crit = 1/χ² = <b style="color:#FFD700;">${critDet.toFixed(3)}</b>.<br>` +
        (fractured
          ? `<span style="color:#ff6b81;"><b>⚠ METRONIC FRACTURE TRIGGERED (Thm. 9.17, ‖∇²ḡ‖ = ${gradRatio.toFixed(2)}/√τ ≥ 1/√τ):</b></span> Continuous Christoffel symbols diverge; manifold fractures into discrete cells <b>x_i = N_i χ_i √τ ∈ 𝕄_τ^n</b> (Chapter 10)!`
          : `<span style="color:#20B2AA;"><b>✓ SUB-CRITICAL CONTINUUM REGIME (‖∇²ḡ‖ = ${gradRatio.toFixed(2)}/√τ &lt; 1/√τ):</b></span> Smooth C^∞ apex metric ²ḡ_∞ and continuous Riemannian geodesics remain valid.`);
    }
  };

  // ---------------------------------------------------------------------------
  // VIDEO CONTROL & INITIALIZATION BOILERPLATE (IIFE-scoped for combined deck)
  // ---------------------------------------------------------------------------
  function prepareVideos() {
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'auto';
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('muted', '');
      v.setAttribute('loop', '');
      v.setAttribute('preload', 'auto');
    });
  }

  function syncVideosToSlide() {
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
      || window.innerWidth <= 768;

    const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
    const winH = window.innerHeight || document.documentElement.clientHeight;
    const winW = window.innerWidth || document.documentElement.clientWidth;

    document.querySelectorAll('video').forEach(v => {
      let shouldPlay = false;
      if (isScroll) {
        const rect = v.getBoundingClientRect();
        const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
        shouldPlay = inView;
      } else {
        shouldPlay = current ? current.contains(v) : true;
      }

      if (shouldPlay) {
        v.muted = true;
        v.playsInline = true;
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      } else if (!v.paused) {
        v.pause();
      }
    });
  }

  // Ensure continuous sync on mobile scroll and touch gestures
  if (typeof window !== 'undefined') {
    window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
    window.__syn_video_sync_handlers.push(syncVideosToSlide);
    if (!window.__syn_video_scroll_hooked) {
      window.__syn_video_scroll_hooked = true;
      const runSync = () => {
        (window.__syn_video_sync_handlers || []).forEach(fn => {
          try { fn(); } catch (_) {}
        });
      };
      window.addEventListener('scroll', runSync, { passive: true });
      window.addEventListener('touchmove', runSync, { passive: true });
      window.addEventListener('resize', runSync, { passive: true });
      let synMediaUnlocked = false;
      function synUnlockMedia() {
        if (synMediaUnlocked) return;
        synMediaUnlocked = true;
        runSync();
      }
      document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
      document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
    }
  }

  function renderAllCh9Widgets() {
    window.ch9_updateSieveCascade();
    window.ch9_updateTransposedTransport();
    window.ch9_updateHermetryMatrix();
    window.ch9_updateCouplingQ();
    window.ch9_updateContortionStreamlines();
    window.ch9_updateDensityTheorem();
    window.ch9_updateSobolevContraction();
    window.ch9_updateTransitionCriterion();
  }

  function bindControlsOnce() {
    document.querySelectorAll('input[type="range"], select, button').forEach(el => {
      if (el.dataset.synBound) return;
      el.dataset.synBound = '1';
      el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());
    });
  }

  let synCh9Initialised = false;
  function initChapter9() {
    if (synCh9Initialised) return;
    synCh9Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh9Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter9);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter9();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter9();
  }
})();

// =========================================================================
// CHAPTER 9: 60FPS 3D INTERACTIVE 36-HERMETRY, PALATINI & SOBOLEV APEX ENGINE
// =========================================================================

const CH9_3D_STYLE = `
#ch9-3d-hud {
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

#ch9-3d-hud *, #ch9-3d-hud *::before, #ch9-3d-hud *::after {
  box-sizing: border-box;
}

#ch9-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch9-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch9-3d-hud.minimized .ch9-hud-body {
  display: none;
}

.ch9-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch9-hud-title {
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

.ch9-hud-title span:first-child {
  line-height: 1.15;
}

.ch9-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch9-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch9-hud-btn {
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

.ch9-hud-btn:hover, .ch9-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch9-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch9-canvas-wrap:active {
  cursor: grabbing;
}

#ch9-3d-hud.spotlight .ch9-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch9-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch9-overlay-bar {
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

.ch9-telemetry {
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

#ch9-node-inspector {
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

.ch9-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch9-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch9-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch9-scrubber .ch9-hud-btn {
  flex-shrink: 0;
}

#ch9-caption {
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
  #ch9-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch9-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch9-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch9-hud-controls {
    gap: 3px;
  }
  .ch9-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch9-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch9-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch9-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch9-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch9-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch9-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch9-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch9-hud-controls {
    gap: 3px;
  }
  .ch9-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch9-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch9-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch9-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch9-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch9-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch9-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch9-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH9_3D_HTML = `
<div class="ch9-hud-header">

    <div class="ch9-hud-title">

      <span>🎛️ Ch 9 · 3D Hermetry &amp; Cascade Engine</span>

      <span id="ch9-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch9-hud-controls">

      <button class="ch9-hud-btn active" id="ch9-btn-orbit" onclick="toggleCh9Orbit()">⟳ Orbit</button>

      <button class="ch9-hud-btn" onclick="toggleCh9Spotlight()">⛶ Spotlight</button>

      <button class="ch9-hud-btn" id="ch9-btn-min" onclick="toggleCh9Minimize()">+</button>

    </div>

  </div>



  <div class="ch9-hud-body">

    <div class="ch9-canvas-wrap" id="ch9-canvas-wrap">

      <canvas id="ch9-3d-canvas"></canvas>

      <div class="ch9-overlay-bar">

        <div class="ch9-telemetry" id="ch9-telemetry">²ḡ = ²ḡ₊(21) + ²ḡ₋(15) on R₆</div>

        <div id="ch9-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch9-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <button class="ch9-hud-btn" title="Previous Stage" onclick="window.setCh9Stage(Math.round( parseFloat(document.getElementById('ch9-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch9-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh9Stage(this.value)">
      <button class="ch9-hud-btn" title="Next Stage" onclick="window.setCh9Stage(Math.round( parseFloat(document.getElementById('ch9-slider').value) ) + 1, true)">▶</button>

      <button class="ch9-hud-btn active" id="ch9-btn-sync" onclick="enableCh9Sync()">Auto-Sync</button>

    </div>



    <div id="ch9-caption">

      <b>Stage 1 (§9.1.1 — SM-59–60):</b> Multi-tiered Strukturkaskade pyramid from L₁ = C(6,2) = 15 to Apex L_M = 1 (Z₊ = 40).

    </div>

  </div>
`;

function injectCh93DHUD() {
  if (document.getElementById('ch9-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH9_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch9-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH9_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch9_3d_engine_loaded) return;
  window.__ch9_3d_engine_loaded = true;

  function runCh9Engine() {
    injectCh93DHUD();
    if (window.__ch9_3d_engine_initialized) return;
    window.__ch9_3d_engine_initialized = true;

const canvas = document.getElementById('ch9-3d-canvas');

  const wrap = document.getElementById('ch9-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.52;

  let camPitch = 0.38;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§9.1.1 — SM-59–60 Cascade Pyramid):</b> Partialkomposition from L₁ = C(6,2) = 15 to Apex L_M = 1 (Z₊ = 2(3^ω−2^ω+1) = 40).",

    2: "<b>Stage 2 (§9.1.2–9.1.4 — SM-37 Non-Hermitian Split):</b> Symmetric ²ḡ₊ (21 gravity/KK potentials) + Skew ²ḡ₋ (15 Maxwell/torsion potentials).",

    3: "<b>Stage 3 (§9.2.1 — Def. 9.3 Met(ℳ) &amp; Transposed Transport):</b> Antisymmetric curl ∂_k A_i − ∂_i A_k = A_s(Γ^s_{ik} − Γ^s_{ki}) certifying skew torsion.",

    4: "<b>Stage 4 (§9.2.2 — Def. 9.5 3D 6×6 Hermetry Switchboard on R₆):</b> Click any 3D pillar: 10 Gravity, 6 EM, 8 KK, 8 Torsion, 3 Mesobaric, 1 Entelechial!",

    5: "<b>Stage 5 (§9.3.1 — Thm. 9.6 Palatini Cross-Metric Coupling Q_(μγ)):</b> Koppelungstensor Q_(μγ)m^i = g^{is}g_(μ)sm − (1/ω)δ_m^i from misaligned metrics.",

    6: "<b>Stage 6 (§9.3.1b — Def. 9.13 Chiral Contortion Helix K_{kl}^i):</b> Non-Hermitian parallel transport Γ = Γ^(+) + K twisting frames along γ(s) ⊂ R₆.",

    7: "<b>Stage 7 (§9.3.1c — Thm. 9.8 Palatini Conservation &amp; No-Go Firewall):</b> Divergence-free sp ⌞_(−)^(6,6)(G) = 0 (SM-49) &amp; K₈ = S²×𝕋⁶ compactification.",

    8: "<b>Stage 8 (§9.3.1d — Thm. 9.10 The (n−2) Density Theorem, SM-46a):</b> g_{ik}⌞_{(+),l}^{(1,2)} g̲^{ik} = (n−2)⌞_l w (0 at n=2, 2⌞_l w in R₄, 4⌞_l w in R₆)!",

    9: "<b>Stage 9 (§9.3.2 — Thm. 9.14 DeTurck–Sobolev Apex Contraction):</b> Heat-smoothed operator Φ_apex = e^{−τ_M(Δ+c₀I)}∘𝒯 (k_M < 1) converging to ²ḡ_∞ ∈ C^∞.",

    10: "<b>Stage 10 (§9.3.3–9.6 — SM-64 Übergangskriterium &amp; Lattice Fracture):</b> Critical gradient ‖∇²ḡ‖ ≥ 1/√τ (χ√|g|=1) fractures geodesics into 𝕄_τ^n!"

  };



  const STAGE_TELEMETRY = {

    1: "Z₊ = 2(3^ω − 2^ω + 1) = 40 (ω=3, Prop. 9.1)",

    2: "²ḡ = ²ḡ₊ + ²ḡ₋ | ³Γ ≡ Γ_{kl}^i (SM-37)",

    3: "∂_k A_i − ∂_i A_k = 2 A_s Γ^s_{[ik]}",

    4: "dim_ℝ Mat_{6×6} = 36 = 21 Sym + 15 Skew",

    5: "Q_(μγ)m^i = g^{is}g_(μ)sm − (1/ω)δ_m^i (SM-53)",

    6: "K_{ikl} = ½(T_{ikl} + T_{lik} − T_{kli}) (Def. 9.13)",

    7: "sp ⌞_(−)^(6,6)(²R̄ − ½ ²ḡ R) = 0 (SM-49)",

    8: "g_{ik} ⌞_{(+),l}^{(1,2)} g̲^{ik} = (n − 2) ⌞_l w (SM-46a)",

    9: "‖Φ_apex(g₁) − Φ_apex(g₂)‖_{H^s} ≤ k_M ‖g₁−g₂‖",

    10: "χ√|g_(p)| = 1 ⇒ x_i = N_i α_i ∈ 𝕄_τ^n (SM-64)"

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



  // =========================================================================

  // STAGE RENDERERS (STAGES 1 TO 10)

  // =========================================================================



  // Stage 1: Multi-Tiered Strukturkaskade Pyramid (L_1 = 15 -> L_2 = 6 -> L_M = 1, Z_+ = 40)

  function renderStage1(w, h) {

    const pApex = drawNode3D("Kask_Apex", 0, 0, 1.15, 11.5, "#FFD700", "#fff", "²ḡ_∞ (L_M = 1, Z₊ = 40)", "Kaskadenspitze (α = M): Convergent Unified Metric on R₆ (SM Eq. 60a, Prop. 9.1)", w, h);

    const midPts = [];

    for (let j = 0; j < 4; j++) {

      const a = (j / 4) * Math.PI * 2 + timeSec * 0.3;

      const pM = drawNode3D("Kask_M_" + j, 0.72 * Math.cos(a), 0.72 * Math.sin(a), 0.1, 7.5, "#20B2AA", "#fff", `g^(2)_${j+1}`, "Intermediate Partialkomposition Tier α = 2 (Rank-Filtered κ₂)", w, h);

      drawLine3D(pM, pApex, "#FFD700", 2.5);

      midPts.push(pM);

    }

    for (let i = 0; i < 8; i++) {

      const a = (i / 8) * Math.PI * 2 - timeSec * 0.2;

      const pB = drawNode3D("Kask_B_" + i, 1.35 * Math.cos(a), 1.35 * Math.sin(a), -0.95, 5.5, "#4169E1", "#fff", i === 0 ? "L₁ = C(6,2) = 15" : "", `Kaskadenbasis Partial Metric g_(γ₁)^(1) ∈ Met(R₆)`, w, h);

      drawLine3D(pB, midPts[i % 4], "rgba(65,105,225,0.65)", 1.6);

    }

  }



  // Stage 2 & 3: Non-Hermitian Split ²ḡ = ²ḡ₊ + ²ḡ₋ & Transposed Parallel Transport Curl

  function renderStage2And3(w, h, st) {

    const isStage3 = (st >= 2.5);

    // Golden Symmetric Ellipsoid ²ḡ₊ (21 potentials)

    ctx.beginPath();

    ctx.strokeStyle = "#FFD700";

    ctx.lineWidth = 2.4;

    for (let i = 0; i <= 44; i++) {

      const a = (i / 44) * Math.PI * 2;

      const p = proj(1.25 * Math.cos(a), 0.85 * Math.sin(a), 0, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    // Tilted Skew-Symmetric Vorticity Loop ²ḡ₋ (15 potentials)

    ctx.beginPath();

    ctx.strokeStyle = "#20B2AA";

    ctx.lineWidth = 2.8;

    for (let i = 0; i <= 44; i++) {

      const a = (i / 44) * Math.PI * 2;

      const p = proj(0.95 * Math.cos(a), 0.95 * Math.sin(a), 0.85 * Math.sin(a + timeSec * 2), w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    drawNode3D("Sym_21", 1.25, 0, 0, 8.5, "#FFD700", "#000", "²ḡ₊ (21 Sym)", "Symmetric Metric Sector (10 Gravity + 8 KK + 3 Mesobaric)", w, h);

    drawNode3D("Skew_15", 0, 0.95, 0.75, 8.5, "#20B2AA", "#fff", "²ḡ₋ (15 Skew)", "Skew-Symmetric Sector (6 Maxwell F_μν + 8 Torsion + 1 Entelechial)", w, h);

    drawNode3D("Kond_Gamma", 0, 0, 0, 10.5, "#FFA500", "#fff", isStage3 ? "2 A_s Γ^s_{[ik]}" : "³Γ ≡ Γ_{kl}^i", isStage3 ? "Transposed Parallel Transport Curl ∂_k A_i − ∂_i A_k = A_s(Γ^s_{ik} − Γ^s_{ki})" : "Fundamentalkondensor ³Γ mediating Strukturassoziation (SM p. 157)", w, h);

  }



  // Stage 4: 3D 6x6 Non-Hermitian Hermetry Switchboard on R_6 = R_4 x S_2 (Def. 9.5)

  function renderStage4(w, h) {

    for (let r = 0; r < 6; r++) {

      for (let c = 0; c < 6; c++) {

        const x = (c - 2.5) * 0.44;

        const y = (r - 2.5) * 0.44;

        const isDiag = (r === c);

        const isSym  = (r <= c);

        const inR4   = (r < 4 && c < 4);

        const inS2   = (r >= 4 && c >= 4);



        let col = "#4169E1", sector = "Gravity g_μν (10 Sym on R₄)";

        if (inR4 && !isSym) { col = "#20B2AA"; sector = "Maxwell EM Vorticity F_μν (6 Skew on R₄)"; }

        else if (!inR4 && !inS2 && isSym) { col = "#FFA500"; sector = "Kaluza–Klein Gravito-EM (8 Sym on R₄×S₂)"; }

        else if (!inR4 && !inS2 && !isSym) { col = "#DC143C"; sector = "Chiral Spin-Torsion (8 Skew on R₄×S₂)"; }

        else if (inS2 && isSym) { col = "#9370DB"; sector = "Mesobaric Homeostasis (3 Sym on S₂)"; }

        else if (inS2 && !isSym) { col = "#FFD700"; sector = "Entelechial Commutator [∂₅, ∂₆] (1 Skew on S₂)"; }



        const zH = isDiag ? 0.55 : (isSym ? 0.25 : -0.25 + 0.18 * Math.sin(timeSec * 3 + r + c));

        const pBase = proj(x, y, -0.75, w, h);

        const pTop = drawNode3D(

          `H_${r+1}_${c+1}`, x, y, zH, isDiag ? 5.8 : 4.6, col, "#fff",

          (r === 0 && c === 0) ? "R₄" : ((r === 5 && c === 5) ? "S₂" : ""),

          `g_{${r+1}${c+1}}: ${sector}`, w, h

        );

        drawLine3D(pBase, pTop, col, 2.0);

      }

    }

  }



  // Stage 5: Palatini Cross-Metric Connection Decomposition & Koppelungstensor Q_{(\mu\gamma)} (Thm. 9.6)

  function renderStage5(w, h) {

    const pCenter = drawNode3D("Q_Tensor", 0, 0, 0, 11, "#FFD700", "#DC143C", "Q_(μγ)m^i = g^{is}g_(μ)sm − (1/ω)δ_m^i", "Thm. 9.6 Koppelungstensor (SM-53): Vanishes iff homothety-aligned g_(μ) = g/ω!", w, h);

    const cols = ["#4169E1", "#20B2AA", "#FFA500"];

    for (let mu = 0; mu < 3; mu++) {

      const a = timeSec * 0.5 + (mu / 3) * Math.PI * 2;

      const cx = 1.18 * Math.cos(a), cy = 1.18 * Math.sin(a), cz = 0.35 * Math.sin(a * 2);

      const pM = drawNode3D("PartG_" + mu, cx, cy, cz, 8.5, cols[mu], "#fff", `g_(${mu+1})`, `Partial Metric g_(${mu+1}) (ω = 3): Misalignment drives cross-metric force Q_(μγ) ≠ 0`, w, h);

      drawLine3D(pM, pCenter, "#FFA500", 2.8, [4, 2]);

    }

  }



  // Stage 6: Algebraic Contortion Tensor K_{kl}^i & Chiral Parallel Transport Helix (Def. 9.13)

  function renderStage6(w, h) {

    // Base Geodesic Spine \gamma(s) along X-axis

    drawLine3D(proj(-1.45, 0, 0, w, h), proj(1.45, 0, 0, w, h), "#4169E1", 2.8);

    // Chiral Contortion Helix twisting around \gamma(s) due to K_{kl}^i

    ctx.beginPath();

    ctx.strokeStyle = "#FFA500";

    ctx.lineWidth = 2.8;

    for (let i = 0; i <= 60; i++) {

      const s = i / 60;

      const x = -1.4 + 2.8 * s;

      const a = s * Math.PI * 4 - timeSec * 3;

      const p = proj(x, 0.72 * Math.cos(a), 0.72 * Math.sin(a), w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    // Rotating Frame Vectors along \gamma(s)

    for (let k = -2; k <= 2; k++) {

      const x = k * 0.62;

      const a = (k + 2) * 0.9 - timeSec * 3;

      const pBase = proj(x, 0, 0, w, h);

      const pTip  = drawNode3D("Cont_" + k, x, 0.72 * Math.cos(a), 0.72 * Math.sin(a), 6, "#FFD700", "#000", k === 0 ? "Γ = { }₊ + K_{kl}^i" : "", "Def. 9.13 Contortion Tensor K_{ikl} = ½(T_{ikl} + T_{lik} − T_{kli}) twisting parallel transport", w, h);

      drawLine3D(pBase, pTip, "#FFD700", 2.4);

    }

  }



  // Stage 7: Non-Hermitian Palatini Conservation (SM-49) & Damour-Deser-McCarthy Firewall (Thm. 9.8)

  function renderStage7(w, h) {

    const pAct = drawNode3D("Pal_S", 0, 0, 1.05, 10.5, "#FFD700", "#fff", "S[g, Γ] = ∫ √−g g^{ik} R_{ik}(Γ)", "Palatini Action Functional with independent Metric g^{ik} and Connection Γ_{kl}^i variations", w, h);

    const pMet = drawNode3D("Pal_Met", -1.1, 0, -0.25, 9, "#20B2AA", "#fff", "δS/δg^{ik} = 0 ⇒ SM-49", "Thm. 9.8(1): Divergence-Free Vorticity Conservation sp ⌞_(−)^(6,6)(²R̄ − ½ ²ḡ R) = 0", w, h);

    const pCon = drawNode3D("Pal_Con",  1.1, 0, -0.25, 9, "#FFA500", "#fff", "δS/δΓ_{kl}^i = 0 (216 eqs)", "Thm. 9.8(2): Algebraically fixes all n³ = 6³ = 216 connection components in terms of g_{ab}", w, h);

    const pFw  = drawNode3D("Pal_FW",   0, 0, -1.05, 8.5, "#9370DB", "#FFD700", "Carnap 9.1: K₈ = S²×𝕋⁶", "Stationary vorticity projection ⌞_(−)^(6,6) + compact K₈ evades unconstrained ghost modes", w, h);



    drawLine3D(pAct, pMet, "#20B2AA", 2.8);

    drawLine3D(pAct, pCon, "#FFA500", 2.8);

    drawLine3D(pMet, pFw, "#9370DB", 2.2, [4, 2]);

    drawLine3D(pCon, pFw, "#9370DB", 2.2, [4, 2]);

  }



  // Stage 8: The (n - 2) Metric Density Theorem g_{ik} \llcorner \underline{g}^{ik} = (n - 2) \llcorner_l w (Thm. 9.10, SM-46a)

  function renderStage8(w, h) {

    const dims = [2, 4, 6, 8, 12];

    dims.forEach((n, idx) => {

      const x = (idx - 2) * 0.72;

      const factor = n - 2; // 0, 2, 4, 6, 10

      const zTop = -0.85 + factor * 0.19;

      const isR6 = (n === 6);

      const col = n === 2 ? "#64748b" : (isR6 ? "#FFD700" : "#20B2AA");

      const pBot = proj(x, 0, -0.85, w, h);

      const pTop = drawNode3D(

        "Dens_" + n, x, 0, zTop, isR6 ? 10 : 7, col, "#fff",

        `n=${n}: ${factor}⌞_l w`,

        `Thm. 9.10 (SM-46a) at Dimension n = ${n}: g_{ik} ⌞_{(+),l}^{(1,2)} g̲^{ik} = (${n} − 2) ⌞_l w = ${factor} ⌞_l w`, w, h

      );

      drawLine3D(pBot, pTop, col, isR6 ? 6.0 : 3.5);

    });

  }



  // Stage 9: DeTurck-Sobolev H^s Contraction Funnel onto Apex Metric ²ḡ_\infty (Thm. 9.14)

  function renderStage9(w, h) {

    // 3D Exponential Contraction Funnel \Phi_{apex} = e^{-\tau_M(\Delta + c_0 I)} \circ \mathcal{T}

    for (let z = -1.0; z <= 1.01; z += 0.5) {

      const s = (z + 1.0) / 2.0; // 0 at bottom (apex) to 1 at top (initial ball)

      const rad = 0.14 + 1.2 * Math.pow(s, 1.4);

      ctx.beginPath();

      ctx.strokeStyle = s < 0.1 ? "#FFD700" : "rgba(32, 178, 170, 0.55)";

      ctx.lineWidth = 1.8;

      for (let i = 0; i <= 36; i++) {

        const a = (i / 36) * Math.PI * 2;

        const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    // Contracting Spiral Trajectory g^{(m+1)} = \Phi_{apex}(g^{(m)})

    ctx.beginPath();

    ctx.strokeStyle = "#FFD700";

    ctx.lineWidth = 3.0;

    for (let i = 0; i <= 75; i++) {

      const t = i / 75;

      const rad = 1.3 * Math.pow(1 - t, 1.5);

      const a = t * Math.PI * 6 + timeSec * 2.5;

      const p = proj(rad * Math.cos(a), rad * Math.sin(a), 1.0 - 2.0 * t, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    drawNode3D("Sob_Init", 1.3 * Math.cos(timeSec * 2.5), 1.3 * Math.sin(timeSec * 2.5), 1.0, 7.5, "#4169E1", "#fff", "g^(0) ∈ B_{H^s}(ḡ, δ)", "Initial Perturbed Metric in Sobolev Ball B_{H^s} (s > n/2 + 2)", w, h);

    drawNode3D("Sob_Apex", 0, 0, -1.0, 11, "#FFD700", "#20B2AA", "²ḡ_∞ ∈ C^∞(ℳ) (k_M < 1)", "Thm. 9.14 Unique Smooth Apex Fixed Point via DeTurck Parabolic Smoothing!", w, h);

  }



  // Stage 10: Übergangskriterium \chi\sqrt{|g_{(p)}|} = 1 (SM-64) & Geodesic Fracture into \mathbb{M}_\tau^n

  function renderStage10(w, h) {

    // Left Side (x < 0): Smooth C^2 Riemannian Geodesics approaching x = 0

    for (let yOff of [-0.65, 0.0, 0.65]) {

      ctx.beginPath();

      ctx.strokeStyle = "#20B2AA";

      ctx.lineWidth = 2.6;

      for (let x = -1.45; x <= 0.0; x += 0.1) {

        const p = proj(x, yOff, 0.35 * Math.sin(x * 3 + timeSec * 2), w, h);

        if (x === -1.45) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    // Crimson Critical Metronic Transition Wall at x = 0: \chi\sqrt{|g_{(p)}|} = 1 (SM-64)

    const wall = [proj(0, -1.1, -0.95, w, h), proj(0, 1.1, -0.95, w, h), proj(0, 1.1, 0.95, w, h), proj(0, -1.1, 0.95, w, h)];

    ctx.save();

    ctx.fillStyle = "rgba(220, 20, 60, 0.28)";

    ctx.strokeStyle = "#DC143C";

    ctx.lineWidth = 2.8;

    ctx.setLineDash([5, 3]);

    ctx.beginPath();

    ctx.moveTo(wall[0].sx, wall[0].sy);

    wall.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));

    ctx.closePath();

    ctx.fill();

    ctx.stroke();

    ctx.restore();



    // Right Side (x > 0): Discretized Metronic Lattice Cells x_i = N_i \alpha_i \in \mathbb{M}_\tau^n

    for (let nx = 1; nx <= 3; nx++) {

      for (let ny = -1; ny <= 1; ny++) {

        const lx = nx * 0.45, ly = ny * 0.65;

        drawNode3D(`Met_${nx}_${ny}`, lx, ly, 0, 5.5, "#FFD700", "#000", (nx === 2 && ny === 0) ? "x_i = N_i α_i ∈ 𝕄_τ^n" : "", "Discrete Metronic Lattice Cell (Chapter 10): Eliminates Christoffel singularity!", w, h);

      }

    }

    drawNode3D("Wall_SM64", 0, 0, 0.95, 9, "#DC143C", "#FFD700", "χ√|g_(p)| = 1 (SM-64)", "Thm. 9.17 Critical Gradient Wall ‖∇²ḡ‖ ≥ 1/√τ forcing continuum fracture!", w, h);

  }



  // Master 60fps Loop

  function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch9-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }

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



    function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);

    else if (stInt === 2 || stInt === 3) renderStage2And3(w, h, stArg);

    else if (stInt === 4) renderStage4(w, h);

    else if (stInt === 5) renderStage5(w, h);

    else if (stInt === 6) renderStage6(w, h);

    else if (stInt === 7) renderStage7(w, h);

    else if (stInt === 8) renderStage8(w, h);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh9Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch9-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch9-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch9-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch9-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch9-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh9Stage = function(val) { window.setCh9Stage(val, true); };



  window.enableCh9Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch9-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh9WithDeck();

  };



  window.toggleCh9Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch9-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh9Spotlight = function() {

    const hud = document.getElementById('ch9-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh9Minimize = function() {

    const hud = document.getElementById('ch9-3d-hud');

    const b = document.getElementById('ch9-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh9WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch9-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-9, section[data-chapter="9"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.setCh9Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh9WithDeck = syncCh9WithDeck;
  }



  // 3D Orbit Drag, Wheel Zoom & Node Click Hit-Testing

  wrap.addEventListener('mousedown', e => {

    e.stopPropagation();

    isDragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mousemove', e => {

    if (!isDragging) return;

    camYaw += (e.clientX - lastX) * 0.012;

    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));

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

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    camYaw += dx * 0.012;
    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('mouseup', () => { isDragging = false; });



  wrap.addEventListener('click', e => {

    e.stopPropagation();

    const rect = canvas.getBoundingClientRect();

    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    let hit = null;

    for (let i = hitNodes.length - 1; i >= 0; i--) {

      const n = hitNodes[i];

      if (Math.hypot(mx - n.p.sx, my - n.p.sy) <= n.r + 6) { hit = n; break; }

    }

    const insp = document.getElementById('ch9-node-inspector');

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



  function init() {

    resize();

    syncCh9WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_9 = false;
    const synBindSync_syncCh9WithDeck = () => {
      if (syncRaf_9) return;
      syncRaf_9 = true;
      requestAnimationFrame(() => {
        syncRaf_9 = false;
        syncCh9WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh9WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh9WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh9WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh9WithDeck, { passive: true });

    const revEl_syncCh9WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh9WithDeck) {
      revEl_syncCh9WithDeck.addEventListener('scroll', synBindSync_syncCh9WithDeck, { passive: true });
      revEl_syncCh9WithDeck.addEventListener('touchmove', synBindSync_syncCh9WithDeck, { passive: true });
    }
    const vpEl_syncCh9WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh9WithDeck) {
      vpEl_syncCh9WithDeck.addEventListener('scroll', synBindSync_syncCh9WithDeck, { passive: true });
      vpEl_syncCh9WithDeck.addEventListener('touchmove', synBindSync_syncCh9WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh9WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh9WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh9WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh9WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh9WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh9WithDeck);
    }

    const hud = document.getElementById('ch9-3d-hud');

    if (hud) {

      hud.querySelectorAll('input, button').forEach(el => {

        el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());

      });

    }

  }



  init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh9Engine);
  } else {
    runCh9Engine();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 10 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
(function() {
  window.showGenericTab = window.showGenericTab || function(prefix, idx, maxIdx, btnEl) {
    for (let i = 1; i <= maxIdx; i++) {
      const p = document.getElementById(prefix + '-' + i);
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

  // WIDGET 1: §10.1.1 Televarianzbedingung (SM-63) & Spin-Oriented Boundary Surfaces (Thm. 10.1)
  window.ch10_updateMetronCell = function() {
    const elP = document.getElementById('ch10-mc-p');
    if (!elP) return;
    const p = parseInt(elP.value, 10);
    const ni = parseInt(document.getElementById('ch10-mc-ni').value, 10);
    const chi = parseFloat(document.getElementById('ch10-mc-chi').value);

    document.getElementById('ch10-mc-p-val').innerText = 'R_' + p;
    document.getElementById('ch10-mc-ni-val').innerText = (ni >= 0 ? '+' : '') + ni;
    document.getElementById('ch10-mc-chi-val').innerText = chi.toFixed(2);

    const nPlanes = (p * (p - 1)) / 2;
    const nSurfaces = p * (p - 1);
    const alphaScale = chi;
    const xCoord = ni * alphaScale;

    const svg = document.getElementById('ch10-mc-svg');
    if (svg) {
      let html = `<rect x="6" y="6" width="218" height="108" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      const cx = 115, cy = 60, r = 38;
      if (p === 1) {
        html += `<line x1="35" y1="60" x2="195" y2="60" stroke="#4169E1" stroke-width="3.5"/>`;
        for (let k = -3; k <= 3; k++) {
          const px = 115 + k * 22;
          const col = (k === Math.max(-3, Math.min(3, ni))) ? '#FFD700' : '#20B2AA';
          html += `<circle cx="${px}" cy="60" r="${k === ni ? 6 : 3.5}" fill="${col}"/>`;
        }
        html += `<text x="115" y="96" fill="#94a3b8" font-size="9.5" text-anchor="middle">1D Lattice Line (0 Coordinate 2-Planes)</text>`;
      } else {
        const verts = [];
        const nV = Math.max(3, p * 2);
        for (let k = 0; k < nV; k++) {
          const ang = (2 * Math.PI * k) / nV - Math.PI / 2;
          verts.push([cx + r * Math.cos(ang), cy + r * Math.sin(ang)]);
        }
        for (let i = 0; i < verts.length; i++) {
          for (let j = i + 1; j < verts.length; j++) {
            if ((i + j) % 2 === 0 || p >= 4) {
              html += `<line x1="${verts[i][0].toFixed(1)}" y1="${verts[i][1].toFixed(1)}" x2="${verts[j][0].toFixed(1)}" y2="${verts[j][1].toFixed(1)}" stroke="rgba(65,105,225,0.42)" stroke-width="1.3"/>`;
            }
          }
        }
        const polyPts = verts.map(v => `${v[0].toFixed(1)},${v[1].toFixed(1)}`).join(' ');
        html += `<polygon points="${polyPts}" fill="rgba(32,178,170,0.16)" stroke="#20B2AA" stroke-width="2.2"/>`;
        html += `<circle cx="${cx}" cy="${cy}" r="14" fill="none" stroke="#FFA500" stroke-width="2" stroke-dasharray="3,2"/>`;
        html += `<text x="${cx}" y="${cy + 3}" fill="#FFD700" font-size="9.5" font-weight="bold" text-anchor="middle">±s (${nSurfaces})</text>`;
        verts.forEach(v => {
          html += `<circle cx="${v[0].toFixed(1)}" cy="${v[1].toFixed(1)}" r="3.5" fill="#FFD700"/>`;
        });
      }
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch10-mc-readout');
    if (box) {
      box.innerHTML =
        `<b>SM-63 Coordinate:</b> $x_i = N_i \\chi_i \\tau^{1/${p}} = (${ni})(${chi.toFixed(2)})\\tau^{1/${p}} = $ <b style="color:#FFD700;">${xCoord.toFixed(2)} τ<sup>1/${p}</sup></b> (` +
        `<i>τ = (√3/4)ℓ<sub>P</sub>² ≈ 1.131×10⁻⁷⁰ m²</i>)<br>` +
        `<b>Thm. 10.1 (SM p. 267):</b> Subspace <b>R<sub>${p}</sub></b> has C(${p},2) = <b>${nPlanes}</b> coordinate 2-planes × 2 spin orientations = ` +
        `<b style="color:#20B2AA;">N<sub>surfaces</sub>(${p}) = ${p}(${p}−1) = ${nSurfaces} spin-oriented boundary 2-surfaces</b>.`;
    }
  };

  // WIDGET 2: §10.1.2 Discrete Osculating Curvature & Extremwerttheorie (Fig. 10.1, SM-67, SM-68b)
  const oscPhi = [0.2, 1.0, 2.2, 3.6, 4.0, 3.4, 2.3, 1.2, 0.6, 0.4, 0.8, 2.0, 3.3];
  window.ch10_updateOsculatingLab = function() {
    const elN = document.getElementById('ch10-osc-n');
    if (!elN) return;
    const n = parseInt(elN.value, 10);
    document.getElementById('ch10-osc-n-val').innerText = 'n = ' + n;

    const phi_n = oscPhi[n];
    const phi_prev = oscPhi[n - 1];
    const phi_prev2 = n >= 2 ? oscPhi[n - 2] : oscPhi[0];
    const d1 = phi_n - phi_prev;
    const d2 = phi_n - 2 * phi_prev + phi_prev2;
    const d2_next = oscPhi[n + 1] - 2 * phi_n + phi_prev;
    const prodInflect = d2 * d2_next;

    const svg = document.getElementById('ch10-osc-svg');
    if (svg) {
      let html = `
        <line x1="20" y1="108" x2="400" y2="108" stroke="#64748b" stroke-width="1.5"/>
        <circle cx="132" cy="48" r="24" fill="rgba(32,178,170,0.10)" stroke="#20B2AA" stroke-width="1.4" stroke-dasharray="3,2"/>
        <text x="132" y="18" fill="#20B2AA" font-size="8.5" font-weight="bold" text-anchor="middle">Concave (∇²φ &lt; 0)</text>
        <circle cx="298" cy="72" r="24" fill="rgba(220,20,60,0.10)" stroke="#DC143C" stroke-width="1.4" stroke-dasharray="3,2"/>
        <text x="298" y="42" fill="#ff6b81" font-size="8.5" font-weight="bold" text-anchor="middle">Convex (∇²φ &gt; 0)</text>
      `;
      let pts = [];
      for (let k = 1; k <= 11; k++) {
        const sx = 22 + k * 33;
        const sy = 104 - oscPhi[k] * 21;
        pts.push((k === 1 ? 'M ' : 'L ') + sx.toFixed(1) + ',' + sy.toFixed(1));
      }
      html += `<path d="${pts.join(' ')}" fill="none" stroke="#4169E1" stroke-width="2.6"/>`;
      for (let k = 1; k <= 11; k++) {
        const sx = 22 + k * 33;
        const sy = 104 - oscPhi[k] * 21;
        const isSel = (k === n);
        const isW = (k === 6);
        const col = isSel ? '#FFD700' : (isW ? '#FFA500' : '#5eead4');
        const rad = isSel ? 6.5 : (isW ? 5.0 : 3.5);
        html += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${rad}" fill="${col}" stroke="#000" stroke-width="1"/>`;
        html += `<text x="${sx.toFixed(1)}" y="120" fill="#94a3b8" font-size="8.5" text-anchor="middle">${k}</text>`;
      }
      const sxN = 22 + n * 33, syN = 104 - oscPhi[n] * 21;
      const sxPrev = 22 + (n - 1) * 33, syPrev = 104 - oscPhi[n - 1] * 21;
      html += `<line x1="${sxPrev.toFixed(1)}" y1="${syPrev.toFixed(1)}" x2="${sxN.toFixed(1)}" y2="${syN.toFixed(1)}" stroke="#FFD700" stroke-width="3.5"/>`;
      svg.innerHTML = html;
    }

    let regTag = '';
    if (n === 6) {
      regTag = `<span style="color:#FFA500;"><b>★ DISCRETE INFLECTION NODE (Wendepunkt w = 6, SM-68b):</b> ∇²φ(6)·∇²φ(7) = (${d2.toFixed(2)})(${d2_next.toFixed(2)}) = ${prodInflect.toFixed(3)} &lt; 0!</span>`;
    } else if (n === 4) {
      regTag = `<span style="color:#20B2AA;"><b>★ DISCRETE MAXIMUM (n = 4):</b> Sign reversal in ∇φ across node with ∇²φ(4) = ${d2.toFixed(2)} &lt; 0 (Concave Peak)</span>`;
    } else if (n === 9) {
      regTag = `<span style="color:#ff6b81;"><b>★ DISCRETE MINIMUM (n = 9):</b> Sign reversal in ∇φ across node with ∇²φ(9) = +${d2.toFixed(2)} &gt; 0 (Convex Trough)</span>`;
    } else if (d2 < 0) {
      regTag = `<span style="color:#5eead4;"><b>Concave Region:</b> ∇²φ(${n}) = ${d2.toFixed(2)} &lt; 0</span>`;
    } else {
      regTag = `<span style="color:#fcd34d;"><b>Convex Region:</b> ∇²φ(${n}) = +${d2.toFixed(2)} &gt; 0</span>`;
    }

    const box = document.getElementById('ch10-osc-readout');
    if (box) {
      box.innerHTML =
        `<b>Node n=${n}:</b> φ(${n}) = <b>${phi_n.toFixed(2)}</b> | <b>SM-67 First Diff:</b> ∇φ(${n}) = φ(${n}) − φ(${n-1}) = <b>${(d1 >= 0 ? '+' : '') + d1.toFixed(2)}</b> | ` +
        `<b>Second Diff:</b> ∇²φ(${n}) = <b>${(d2 >= 0 ? '+' : '') + d2.toFixed(2)}</b><br>${regTag}`;
    }
  };

  // WIDGET 3: §10.1.3 & §10.3 Telescoping Metronintegral Staircase & Domain-Splitting (SM-67a, SM-69, Fig. 10.5)
  window.ch10_updateStaircaseLab = function() {
    const elN1 = document.getElementById('ch10-st-n1');
    if (!elN1) return;
    let n1 = parseInt(elN1.value, 10);
    let n2 = parseInt(document.getElementById('ch10-st-n2').value, 10);
    if (n2 < n1 + 1) {
      n2 = n1 + 1;
      document.getElementById('ch10-st-n2').value = n2;
    }
    const elGam = document.getElementById('ch10-st-gam');
    elGam.min = n1;
    elGam.max = n2 - 1;
    let gam = Math.max(n1, Math.min(n2 - 1, parseInt(elGam.value, 10)));
    elGam.value = gam;

    document.getElementById('ch10-st-n1-val').innerText = n1;
    document.getElementById('ch10-st-gam-val').innerText = gam;
    document.getElementById('ch10-st-n2-val').innerText = n2;

    // Primitive Phi(n) = n^2, difference phi(n) = 2n - 1
    const Phi = k => k * k;
    const phi = k => 2 * k - 1;

    let sumLeft = 0, sumRight = 0;
    for (let j = n1; j <= gam; j++) sumLeft += phi(j);
    for (let j = gam + 1; j <= n2; j++) sumRight += phi(j);
    const totalSum = sumLeft + sumRight;
    const teleDiff = Phi(n2) - Phi(n1 - 1);

    const svg = document.getElementById('ch10-st-svg');
    if (svg) {
      const maxPhi = Phi(n2) + 2;
      let html = `<line x1="25" y1="108" x2="395" y2="108" stroke="#64748b" stroke-width="1.5"/>`;
      const count = n2 - n1 + 1;
      const w = Math.min(48, 320 / count);
      for (let j = n1; j <= n2; j++) {
        const idx = j - n1;
        const x0 = 38 + idx * w;
        const yLo = 106 - (Phi(j - 1) / maxPhi) * 88;
        const yHi = 106 - (Phi(j) / maxPhi) * 88;
        const isFirstHalf = (j <= gam);
        const fillCol = isFirstHalf ? 'rgba(65,105,225,0.22)' : 'rgba(32,178,170,0.22)';
        const strokeCol = isFirstHalf ? '#4169E1' : '#20B2AA';
        html += `<rect x="${x0.toFixed(1)}" y="${yHi.toFixed(1)}" width="${(w - 3).toFixed(1)}" height="${(106 - yHi).toFixed(1)}" fill="${fillCol}" stroke="${strokeCol}" stroke-width="1.2"/>`;
        html += `<line x1="${x0.toFixed(1)}" y1="${yLo.toFixed(1)}" x2="${x0.toFixed(1)}" y2="${yHi.toFixed(1)}" stroke="#FFA500" stroke-width="2.8"/>`;
        html += `<circle cx="${x0.toFixed(1)}" cy="${yHi.toFixed(1)}" r="3.5" fill="#FFD700"/>`;
        html += `<text x="${(x0 + w / 2 - 2).toFixed(1)}" y="120" fill="#cbd5e1" font-size="8.5" text-anchor="middle">j=${j}</text>`;
      }
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch10-st-readout');
    if (box) {
      box.innerHTML =
        `<b>Model Sequence:</b> $\\Phi(n) = n^2 \\implies \\phi(n) = \\nabla\\Phi(n) = 2n - 1$<br>` +
        `<b>SM-69 Domain Split:</b> $\\mathcal{S}_{${n1}}^{${gam}}\\phi + \\mathcal{S}_{${gam+1}}^{${n2}}\\phi = ${sumLeft} + ${sumRight} = $ <b style="color:#20B2AA;">${totalSum}</b> | ` +
        `<b>SM-67a Telescoping:</b> $\\Phi(${n2}) - \\Phi(${n1-1}) = ${Phi(n2)} - ${Phi(n1-1)} = $ <b style="color:#FFD700;">${teleDiff} (Exact Match!)</b>`;
    }
  };

  // WIDGET 4: §10.1.4 & §10.2 2D Metronic Stencil & Nearest-Neighbor Lattice Theorem (Def. 10.4, SM-74a, Fig. 10.2)
  window.ch10_updateStencilLab = function() {
    const elN1 = document.getElementById('ch10-sn-n1');
    if (!elN1) return;
    const n1 = parseInt(elN1.value, 10);
    const n2 = parseInt(document.getElementById('ch10-sn-n2').value, 10);
    document.getElementById('ch10-sn-n1-val').innerText = n1;
    document.getElementById('ch10-sn-n2-val').innerText = n2;

    // 2D field phi(n1, n2) = n1^2 + n1*n2 + 2*n2^2
    const f = (x, y) => x * x + x * y + 2 * y * y;
    const phi_c = f(n1, n2);
    const phi_l = f(n1 - 1, n2);
    const phi_d = f(n1, n2 - 1);
    const d1 = phi_c - phi_l;
    const d2 = phi_c - phi_d;
    const dTot = d1 + d2;
    const lhs74a = 2 * phi_c - dTot;
    const rhs74a = phi_l + phi_d;

    const svg = document.getElementById('ch10-sn-svg');
    if (svg) {
      let html = '';
      for (let gx = 0; gx <= 4; gx++) {
        for (let gy = 0; gy <= 3; gy++) {
          const sx = 35 + gx * 42;
          const sy = 102 - gy * 28;
          html += `<circle cx="${sx}" cy="${sy}" r="2.5" fill="#475569"/>`;
        }
      }
      const cx = 35 + n1 * 42, cy = 102 - n2 * 28;
      const lx = 35 + (n1 - 1) * 42, ly = cy;
      const dx = cx, dy = 102 - (n2 - 1) * 28;
      html += `<rect x="${lx}" y="${cy}" width="42" height="28" fill="rgba(65,105,225,0.20)" stroke="#4169E1" stroke-width="1.5"/>`;
      html += `<text x="${lx + 21}" y="${cy + 17}" fill="#93c5fd" font-size="8.5" font-weight="bold" text-anchor="middle">Metron τ</text>`;
      html += `<line x1="${lx}" y1="${ly}" x2="${cx}" y2="${cy}" stroke="#20B2AA" stroke-width="3"/>`;
      html += `<line x1="${dx}" y1="${dy}" x2="${cx}" y2="${cy}" stroke="#20B2AA" stroke-width="3"/>`;
      html += `<circle cx="${lx}" cy="${ly}" r="5.5" fill="#FFA500" stroke="#000" stroke-width="1"/>`;
      html += `<circle cx="${dx}" cy="${dy}" r="5.5" fill="#FFA500" stroke="#000" stroke-width="1"/>`;
      html += `<circle cx="${cx}" cy="${cy}" r="6.5" fill="#FFD700" stroke="#000" stroke-width="1.2"/>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch10-sn-readout');
    if (box) {
      box.innerHTML =
        `<b>Field $\\phi(n_1,n_2) = n_1^2 + n_1 n_2 + 2n_2^2$ at $(${n1},${n2})$:</b> $\\phi(\\mathbf{n}) = ${phi_c}$, $\\phi(E_1^{-1}\\mathbf{n}) = ${phi_l}$, $\\phi(E_2^{-1}\\mathbf{n}) = ${phi_d}$<br>` +
        `<b>Differences:</b> $\\nabla_1\\phi = ${d1}$, $\\nabla_2\\phi = ${d2}$, $\\nabla_{\\mathrm{tot}}\\phi = ${dTot}$ | ` +
        `<b>SM-74a Nearest-Neighbor Identity ($L=2$):</b> $2\\phi(\\mathbf{n}) - \\nabla_{\\mathrm{tot}}\\phi = 2(${phi_c}) - ${dTot} = $ <b style="color:#FFD700;">${lhs74a} = ${rhs74a}</b> $= \\sum_{i=1}^2 \\phi(\\mathbf{n}-\\mathbf{e}_i)$!`;
    }
  };

  // WIDGET 5: §10.2 DEC Primal-Dual Cell & Discrete Hodge Star Calculator (Defs. 10.5–10.6, Fig. 10.3)
  window.ch10_updateHodgeLab = function() {
    const elN = document.getElementById('ch10-hd-n');
    if (!elN) return;
    const n = parseInt(elN.value, 10);
    const elK = document.getElementById('ch10-hd-k');
    elK.max = n;
    let k = Math.min(n, parseInt(elK.value, 10));
    elK.value = k;
    const s = parseInt(document.getElementById('ch10-hd-s').value, 10);

    document.getElementById('ch10-hd-n-val').innerText = 'n = ' + n;
    document.getElementById('ch10-hd-k-val').innerText = 'k = ' + k;
    document.getElementById('ch10-hd-s-val').innerText = s === 0 ? 's=0 (Riem)' : 's=1 (Lor)';

    const nk = n - k;
    const expSign = k * nk + s;
    const invSign = (expSign % 2 === 0) ? '+1' : '−1';
    const codiffExp = n * (k - 1) + 1 + s;
    const codiffSign = (((codiffExp % 2) + 2) % 2 === 0) ? '+' : '−';
    const tauPower = n - 2 * k;

    const primalNames = ['0-Node (Vertex)', '1-Edge (Link)', '2-Plaquette (Face)', '3-Cube (Volume)', '4-Hypercube'];
    const box = document.getElementById('ch10-hd-readout');
    if (box) {
      box.innerHTML =
        `<b>Primal $k$-Cell $\\sigma_${k}$:</b> <span style="color:#5eead4;">${primalNames[k] || k+'-Cell'}</span> ($|\\sigma_${k}| = \\tau^{${k}/2}$) $\\xrightarrow{*_K}$ ` +
        `<b>Voronoi Dual $(n-k)$-Cell $\\sigma^*_{${nk}}$:</b> <span style="color:#fcd34d;">${primalNames[nk] || nk+'-Cell'}</span> ($|\\sigma^*_{${nk}}| = \\tau^{${nk}/2}$)<br>` +
        `<b>Metric Scale Factor:</b> $|\\sigma^*_{${nk}}| / |\\sigma_${k}| = \\tau^{(${n}-2\\cdot ${k})/2} = $ <b style="color:#FFA500;">τ<sup>${tauPower}/2</sup></b> | ` +
        `<b>Duality Involution (Def. 10.5):</b> $*_{K^*}\\circ *_K = (-1)^{${k}(${nk})+${s}}\\operatorname{id} = $ <b style="color:#FFD700;">${invSign} id</b> | ` +
        `<b>Codifferential (Def. 10.6):</b> $\\delta_\\tau = ${codiffSign}*_{K^*} d_{K^*} *_K$`;
    }
  };

  // WIDGET 6: §10.3 Power Monomial Difference \nabla^k n^\gamma & Stirling Explorer (Thms. 10.7–10.8)
  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    let res = 1;
    for (let i = 1; i <= k; i++) res = (res * (n - i + 1)) / i;
    return Math.round(res);
  }
  function factorial(m) {
    let r = 1;
    for (let i = 2; i <= m; i++) r *= i;
    return r;
  }
  window.ch10_updateMonomialLab = function() {
    const elK = document.getElementById('ch10-mn-k');
    if (!elK) return;
    const k = parseInt(elK.value, 10);
    const gam = parseInt(document.getElementById('ch10-mn-gam').value, 10);
    const n = parseInt(document.getElementById('ch10-mn-n').value, 10);

    document.getElementById('ch10-mn-k-val').innerText = 'k = ' + k;
    document.getElementById('ch10-mn-gam-val').innerText = 'γ = ' + gam;
    document.getElementById('ch10-mn-n-val').innerText = 'n = ' + n;

    const evalDiff = (node) => {
      let sum = 0;
      for (let l = 0; l <= k; l++) {
        const sign = (l % 2 === 0) ? 1 : -1;
        sum += sign * binom(k, l) * Math.pow(node - l, gam);
      }
      return sum;
    };

    const valAtN = evalDiff(n);
    let regimeStr = '';
    if (k < gam) {
      regimeStr = `<span style="color:#5eead4;"><b>Sub-Critical ($k = ${k} &lt; \\gamma = ${gam}$):</b> Polynomial of degree $\\gamma - k = ${gam - k}$, value at $n=${n}$ is <b>${valAtN}</b></span>`;
    } else if (k === gam) {
      regimeStr = `<span style="color:#FFD700;"><b>Critical Factorial ($k = \\gamma = ${gam}$):</b> Constant $\\nabla^{${k}} n^{${gam}} \\equiv \\gamma! = ${gam}! = $ <b>${factorial(gam)}</b> (Independent of $n$!)</span>`;
    } else {
      regimeStr = `<span style="color:#ff6b81;"><b>Super-Critical Annihilation ($k = ${k} &gt; \\gamma = ${gam}$):</b> Identically $\\nabla^{${k}} n^{${gam}} \\equiv $ <b>0</b> $\\forall n \\in \\mathbb{Z}$!</span>`;
    }

    const box = document.getElementById('ch10-mn-readout');
    if (box) {
      box.innerHTML =
        `<b>Thm. 10.7–10.8 Binomial Sum (SM-68):</b> $\\nabla^{${k}} n^{${gam}}\\big|_{n=${n}} = \\sum_{\\ell=0}^{${k}} (-1)^\\ell \\binom{${k}}{\\ell}(${n}-\\ell)^{${gam}} = $ <b style="color:#FFD700;">${valAtN}</b><br>` +
        `${regimeStr}`;
    }
  };

  // WIDGET 7: §10.3 Discrete Leibniz Cross-Term & Continuum Correspondence Limit (Thms. 10.12 & 10.15)
  window.ch10_updateLeibnizLab = function() {
    const elTau = document.getElementById('ch10-lb-tau');
    if (!elTau) return;
    const tau = parseFloat(elTau.value);
    const x = parseFloat(document.getElementById('ch10-lb-x').value);
    document.getElementById('ch10-lb-tau-val').innerText = tau.toFixed(2);
    document.getElementById('ch10-lb-x-val').innerText = x.toFixed(1);

    // Test functions: u(x) = x^2, v(x) = exp(0.5*x)
    const u = t => t * t;
    const v = t => Math.exp(0.5 * t);
    const du_tau = (u(x) - u(x - tau)) / tau;
    const dv_tau = (v(x) - v(x - tau)) / tau;
    const duv_tau = (u(x) * v(x) - u(x - tau) * v(x - tau)) / tau;

    const leibnizNaive = du_tau * v(x) + u(x) * dv_tau;
    const crossTermScaled = -tau * du_tau * dv_tau;
    const exactRHS = leibnizNaive + crossTermScaled;
    const exactCont = 2 * x * v(x) + 0.5 * u(x) * v(x);

    const box = document.getElementById('ch10-lb-readout');
    if (box) {
      box.innerHTML =
        `<b>Test Pair $u(x)=x^2,\\; v(x)=e^{x/2}$ at $x=${x.toFixed(1)},\\; \\tau=${tau.toFixed(2)}$:</b><br>` +
        `• <b>Scaled Discrete Product $\\nabla_\\tau(uv)/\\tau$:</b> <b style="color:#FFD700;">${duv_tau.toFixed(4)}</b> vs. <b>Classical $(uv)'(x)$:</b> <b>${exactCont.toFixed(4)}</b> (Thm. 10.15 Error: ${Math.abs(duv_tau - exactCont).toFixed(4)})<br>` +
        `• <b>SM-68a Decomposition:</b> $[(\\nabla_\\tau u/\\tau)v + u(\\nabla_\\tau v/\\tau)] = ${leibnizNaive.toFixed(4)}$ ` +
        `<span style="color:#ff6b81;"><b>− τ(∇<sub>τ</sub>u/τ)(∇<sub>τ</sub>v/τ) = ${crossTermScaled.toFixed(4)}</b></span> $= $ <b style="color:#20B2AA;">${exactRHS.toFixed(4)} (Exact Identity!)</b>`;
    }
  };

  // WIDGET 8: §10.3 Discrete Gauss Divergence Flux Conservation Lab (Thm. 10.17, SM-80, Fig. 10.6)
  window.ch10_updateGaussBoxLab = function() {
    const elB1 = document.getElementById('ch10-gs-b1');
    if (!elB1) return;
    const b1 = parseInt(elB1.value, 10);
    const b2 = parseInt(document.getElementById('ch10-gs-b2').value, 10);
    document.getElementById('ch10-gs-b1-val').innerText = '[1, ' + b1 + ']';
    document.getElementById('ch10-gs-b2-val').innerText = '[1, ' + b2 + ']';

    // Vector field A = (A1, A2) with A1(n1,n2) = n1^2 * n2, A2(n1,n2) = n1 * n2^2 on Omega = [1,b1] x [1,b2]
    const A1 = (x, y) => x * x * y;
    const A2 = (x, y) => x * y * y;
    let volSum = 0;
    for (let x = 1; x <= b1; x++) {
      for (let y = 1; y <= b2; y++) {
        const divA = (A1(x, y) - A1(x - 1, y)) + (A2(x, y) - A2(x, y - 1));
        volSum += divA;
      }
    }
    let fluxX = 0, fluxY = 0;
    for (let y = 1; y <= b2; y++) fluxX += (A1(b1, y) - A1(0, y));
    for (let x = 1; x <= b1; x++) fluxY += (A2(x, b2) - A2(x, 0));
    const totalBoundaryFlux = fluxX + fluxY;

    const box = document.getElementById('ch10-gs-readout');
    if (box) {
      box.innerHTML =
        `<b>Lattice Box $\\Omega = [1,${b1}]\\times[1,${b2}] \\subset \\mathbb{M}_\\tau^2$ (${b1 * b2} cells) with $\\mathbf{A}(n_1,n_2) = (n_1^2 n_2,\\, n_1 n_2^2)$:</b><br>` +
        `• <b>Interior Volume Sum $\\sum_{\\mathbf{n}\\in\\Omega}(\\operatorname{DIV}_2\\mathbf{A})(\\mathbf{n})$:</b> <b style="color:#FFD700;">${volSum}</b> (Interior faces cancel telescopically)<br>` +
        `• <b>SM-80 Boundary Facet Flux:</b> Flux<sub>1</sub> ($n_1=b_1$ vs $a_1-1$) = <b>${fluxX}</b> + Flux<sub>2</sub> ($n_2=b_2$ vs $a_2-1$) = <b>${fluxY}</b> ⇒ <b style="color:#20B2AA;">Total Flux = ${totalBoundaryFlux} (Exact Gauss Conservation!)</b>`;
    }
  };

  // WIDGET 9: §10.3 Brillouin Zone Momentum Dispersion & UV Cutoff (Thm. 10.21)
  window.ch10_updateDispersionLab = function() {
    const elTau = document.getElementById('ch10-uv-tau');
    if (!elTau) return;
    const tau = parseFloat(elTau.value);
    const N = parseInt(document.getElementById('ch10-uv-n').value, 10);
    document.getElementById('ch10-uv-tau-val').innerText = tau.toFixed(2);
    document.getElementById('ch10-uv-n-val').innerText = 'N = ' + N;

    const lambdaMax1D = 4.0 / (tau * tau);
    const lambdaMax4D = 16.0 / (tau * tau);
    const uvCutoff = 4.0 / Math.sqrt(tau);
    const gap1D = (4.0 / (tau * tau)) * Math.pow(Math.sin(Math.PI / N), 2);

    const svg = document.getElementById('ch10-uv-svg');
    if (svg) {
      let html = `
        <line x1="25" y1="102" x2="395" y2="102" stroke="#64748b" stroke-width="1.5"/>
        <line x1="210" y1="12" x2="210" y2="105" stroke="#475569" stroke-width="1.2" stroke-dasharray="3,2"/>
        <text x="215" y="22" fill="#94a3b8" font-size="8.5">k ∈ [−π/τ, +π/τ]</text>
      `;
      let ptsCont = [], ptsLat = [];
      const yScale = 78.0 / lambdaMax1D;
      for (let i = 0; i <= 80; i++) {
        const u = (i / 80.0) * 2 - 1; // -1 to +1 representing -pi/tau to +pi/tau
        const k = u * (Math.PI / tau);
        const lamLat = (4.0 / (tau * tau)) * Math.pow(Math.sin((k * tau) / 2.0), 2);
        const lamCont = k * k;
        const sx = 210 + u * 170;
        const syLat = 100 - lamLat * yScale;
        const syCont = Math.max(8, 100 - lamCont * yScale);
        ptsLat.push((i === 0 ? 'M ' : 'L ') + sx.toFixed(1) + ',' + syLat.toFixed(1));
        ptsCont.push((i === 0 ? 'M ' : 'L ') + sx.toFixed(1) + ',' + syCont.toFixed(1));
      }
      html += `<path d="${ptsCont.join(' ')}" fill="none" stroke="#DC143C" stroke-width="1.8" stroke-dasharray="4,3"/>`;
      html += `<path d="${ptsLat.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2.8"/>`;
      html += `<text x="345" y="20" fill="#ff6b81" font-size="8.5">Continuum k² → ∞</text>`;
      html += `<text x="335" y="42" fill="#20B2AA" font-size="8.5" font-weight="bold">DEC 4/τ² sin²(kτ/2)</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch10-uv-readout');
    if (box) {
      box.innerHTML =
        `<b>1D Max Eigenvalue:</b> $\\lambda_{\\max}^{(1\\mathrm{D})} = 4/\\tau^2 = $ <b>${lambdaMax1D.toFixed(2)}</b> | ` +
        `<b>4D Spectrum $\\sigma(\\Delta_\\tau)$:</b> $[0, 16/\\tau^2] = [0, $ <b style="color:#FFD700;">${lambdaMax4D.toFixed(2)}</b>$]$ | ` +
        `<b>UV Scale:</b> $\\Lambda_{\\mathrm{UV}} = 4/\\sqrt{\\tau} = $ <b style="color:#20B2AA;">${uvCutoff.toFixed(2)}</b> | ` +
        `<b>Torus Gap:</b> $\\Delta E_{\\min} = $ <b style="color:#FFA500;">${gap1D.toFixed(4)} &gt; 0</b>`;
    }
  };

  // ---------------------------------------------------------------------------
  // VIDEO CONTROL & WIDGET WIRING (Combined-deck safe IIFE)
  // ---------------------------------------------------------------------------
  function prepareVideos() {
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'auto';
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('muted', '');
      v.setAttribute('loop', '');
      v.setAttribute('preload', 'auto');
    });
  }

  function syncVideosToSlide() {
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
      || window.innerWidth <= 768;

    const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
    const winH = window.innerHeight || document.documentElement.clientHeight;
    const winW = window.innerWidth || document.documentElement.clientWidth;

    document.querySelectorAll('video').forEach(v => {
      let shouldPlay = false;
      if (isScroll) {
        const rect = v.getBoundingClientRect();
        const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
        shouldPlay = inView;
      } else {
        shouldPlay = current ? current.contains(v) : true;
      }

      if (shouldPlay) {
        v.muted = true;
        v.playsInline = true;
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      } else if (!v.paused) {
        v.pause();
      }
    });
  }

  // Ensure continuous sync on mobile scroll and touch gestures
  if (typeof window !== 'undefined') {
    window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
    window.__syn_video_sync_handlers.push(syncVideosToSlide);
    if (!window.__syn_video_scroll_hooked) {
      window.__syn_video_scroll_hooked = true;
      const runSync = () => {
        (window.__syn_video_sync_handlers || []).forEach(fn => {
          try { fn(); } catch (_) {}
        });
      };
      window.addEventListener('scroll', runSync, { passive: true });
      window.addEventListener('touchmove', runSync, { passive: true });
      window.addEventListener('resize', runSync, { passive: true });
      let synMediaUnlocked = false;
      function synUnlockMedia() {
        if (synMediaUnlocked) return;
        synMediaUnlocked = true;
        runSync();
      }
      document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
      document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
    }
  }

  function renderAllCh10Widgets() {
    window.ch10_updateMetronCell();
    window.ch10_updateOsculatingLab();
    window.ch10_updateStaircaseLab();
    window.ch10_updateStencilLab();
    window.ch10_updateHodgeLab();
    window.ch10_updateMonomialLab();
    window.ch10_updateLeibnizLab();
    window.ch10_updateGaussBoxLab();
    window.ch10_updateDispersionLab();
  }

  function bindControlsOnce() {
    document.querySelectorAll('input[type="range"], select, button').forEach(el => {
      if (el.dataset.synBound) return;
      el.dataset.synBound = '1';
      el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());
    });
  }

  let ch10Initialised = false;
  function initChapter10() {
    if (ch10Initialised) return;
    ch10Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh10Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter10);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter10();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter10();
  }
})();

// =========================================================================
// CHAPTER 10: 60FPS 3D INTERACTIVE METRONIC LATTICE, DEC HODGE & UV CUTOFF ENGINE
// =========================================================================

const CH10_3D_STYLE = `
#ch10-3d-hud {
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

#ch10-3d-hud *, #ch10-3d-hud *::before, #ch10-3d-hud *::after {
  box-sizing: border-box;
}

#ch10-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch10-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch10-3d-hud.minimized .ch10-hud-body {
  display: none;
}

.ch10-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch10-hud-title {
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

.ch10-hud-title span:first-child {
  line-height: 1.15;
}

.ch10-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch10-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch10-hud-btn {
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

.ch10-hud-btn:hover, .ch10-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch10-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch10-canvas-wrap:active {
  cursor: grabbing;
}

#ch10-3d-hud.spotlight .ch10-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch10-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch10-overlay-bar {
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

.ch10-telemetry {
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

#ch10-node-inspector {
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

.ch10-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch10-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch10-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch10-scrubber .ch10-hud-btn {
  flex-shrink: 0;
}

#ch10-caption {
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
  #ch10-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch10-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch10-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch10-hud-controls {
    gap: 3px;
  }
  .ch10-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch10-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch10-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch10-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch10-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch10-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch10-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch10-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch10-hud-controls {
    gap: 3px;
  }
  .ch10-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch10-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch10-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch10-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch10-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch10-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch10-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch10-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH10_3D_HTML = `
<div class="ch10-hud-header">

    <div class="ch10-hud-title">

      <span>🧊 Ch 10 · 3D Metronic DEC Engine</span>

      <span id="ch10-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch10-hud-controls">

      <button class="ch10-hud-btn active" id="ch10-btn-orbit" onclick="toggleCh10Orbit()">⟳ Orbit</button>

      <button class="ch10-hud-btn" onclick="toggleCh10Spotlight()">⛶ Spotlight</button>

      <button class="ch10-hud-btn" id="ch10-btn-min" onclick="toggleCh10Minimize()">+</button>

    </div>

  </div>



  <div class="ch10-hud-body">

    <div class="ch10-canvas-wrap" id="ch10-canvas-wrap">

      <canvas id="ch10-3d-canvas"></canvas>

      <div class="ch10-overlay-bar">

        <div class="ch10-telemetry" id="ch10-telemetry">𝕄_τ^n = ⨁ √τ ℤ | d_τ² ≡ 0</div>

        <div id="ch10-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch10-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <button class="ch10-hud-btn" title="Previous Stage" onclick="window.setCh10Stage(Math.round( parseFloat(document.getElementById('ch10-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch10-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh10Stage(this.value)">
      <button class="ch10-hud-btn" title="Next Stage" onclick="window.setCh10Stage(Math.round( parseFloat(document.getElementById('ch10-slider').value) ) + 1, true)">▶</button>

      <button class="ch10-hud-btn active" id="ch10-btn-sync" onclick="enableCh10Sync()">Auto-Sync</button>

    </div>



    <div id="ch10-caption">

      <b>Stage 1 (§10.1.1 — SM-63 &amp; Thm. 10.1):</b> Elementary Metron cell τ with p(p−1) = 6 spin-oriented boundary 2-surfaces in R₃.

    </div>

  </div>
`;

function injectCh103DHUD() {
  if (document.getElementById('ch10-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH10_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch10-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH10_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch10_3d_engine_loaded) return;
  window.__ch10_3d_engine_loaded = true;

  function runCh10Engine() {
    injectCh103DHUD();
    if (window.__ch10_3d_engine_initialized) return;
    window.__ch10_3d_engine_initialized = true;

const canvas = document.getElementById('ch10-3d-canvas');

  const wrap = document.getElementById('ch10-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.50;

  let camPitch = 0.36;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§10.1.1 — SM-63 &amp; Thm. 10.1):</b> Elementary Metron cell τ in R₃ with N_surfaces(3) = 3(2) = 6 spin-oriented boundary faces.",

    2: "<b>Stage 2 (§10.1.2 — SM-67–68b Discrete Extremwerttheorie):</b> Backward difference ∇φ(n), osculating circles &amp; inflection node w=6.",

    3: "<b>Stage 3 (§10.1.3 — SM-67a–71 Metronintegral Staircase):</b> Telescoping sum 𝒮_{n₁}^{n₂}φ = Φ(n₂) − Φ(n₁−1) canceling interior risers.",

    4: "<b>Stage 4 (§10.1.4 — SM-73a Commutativity &amp; Thm. 10.2 Wronskian):</b> Commuting shifts F_k F_l = F_l F_k &amp; discrete Wronskian D(n) ≠ 0.",

    5: "<b>Stage 5 (§10.1.5 &amp; §10.2 — Def. 10.4 Lattice 𝕄_τ^n &amp; Stencil):</b> Backward shift stencil ∇_i = I − E_i⁻¹ (‖∇_i‖_op ≤ 2) on ℓ^∞(𝕄_τ^n).",

    6: "<b>Stage 6 (§10.2 — Defs. 10.5–10.6 Primal K &amp; Voronoi Dual K*):</b> Discrete Hodge star *_τ intertwining primal faces σ₂ with dual edges σ₁*!",

    7: "<b>Stage 7 (§10.3 — Thms. 10.7–10.8 Monomials &amp; Honeycomb Vortex):</b> Triangular area quantum τ = (√3/4)ℓ_P², rotor ŝ &amp; ∇^γ n^γ ≡ γ!.",

    8: "<b>Stage 8 (§10.3 — Thm. 10.12 Discrete Leibniz Cross-Term):</b> 3D product decomposition ∇(uv) = (∇u)v + u(∇v) − (∇u)(∇v) (SM-68a).",

    9: "<b>Stage 9 (§10.3 — Thm. 10.17 3D Discrete Gauss–Stokes Flux Cube):</b> Interior divergence cancels pairwise, leaving exact 6-facet boundary flux!",

    10: "<b>Stage 10 (§10.3–10.6 — Thm. 10.21 Brillouin UV Cutoff &amp; Stage VI):</b> Sine-squared dispersion λ(k) = (4/τ²)∑sin²(k_iτ/2) bounded by Λ_UV = 4/√τ!"

  };



  const STAGE_TELEMETRY = {

    1: "x_i = N_i χ_i τ^{1/p} (SM-63) | N_surf = p(p−1)",

    2: "∇φ(n) = φ(n)−φ(n−1) | ∇²φ(w)∇²φ(w+1) < 0",

    3: "𝒮_{n₁}^{n₂} φ = Φ(n₂) − Φ(n₁−1) (SM-67a)",

    4: "F_k F_l φ = F_l F_k φ | det[∇^{γ−1}y_k] ≠ 0",

    5: "∇_i = I − E_i⁻¹ ∈ ℬ(ℓ^∞(𝕄_τ^n)) | ‖∇_i‖ ≤ 2",

    6: "d_K ∘ d_K ≡ 0 | *_{K*} ∘ *_K = (−1)^{k(n−k)+s}",

    7: "∇^γ n^γ = γ! | τ = (√3/4)ℓ_P² ≈ 1.13e−70 m²",

    8: "∇_i(uv) = (∇_i u)v + u(∇_i v) − (∇_i u)(∇_i v)",

    9: "∑_{Ω} DIV_n A = ∑_i τ_i⁻¹ (Flux_{b_i} − Flux_{a_i−1})",

    10: "λ(k) = ∑ (4/τ_i²) sin²(k_i τ_i / 2) ≤ 16/τ²"

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



  function drawCubeWireframe(cx, cy, cz, s, col, lw, dash, w, h) {

    const v = [];

    for (let dx of [-s, s]) for (let dy of [-s, s]) for (let dz of [-s, s]) {

      v.push(proj(cx + dx, cy + dy, cz + dz, w, h));

    }

    const edges = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];

    edges.forEach(e => drawLine3D(v[e[0]], v[e[1]], col, lw, dash));

  }



  // =========================================================================

  // STAGE RENDERERS (STAGES 1 TO 10)

  // =========================================================================



  // Stage 1: Elementary Metron Cell \tau & 6 Spin-Oriented Boundary 2-Surfaces (Thm. 10.1)

  function renderStage1(w, h) {

    drawCubeWireframe(0, 0, 0, 0.85, "#4169E1", 2.0, null, w, h);

    const faces = [

      { id: "F_xp", x:  0.85, y: 0, z: 0, col: "#20B2AA", lbl: "+ŝ_{yz}" },

      { id: "F_xm", x: -0.85, y: 0, z: 0, col: "#20B2AA", lbl: "−ŝ_{yz}" },

      { id: "F_yp", x: 0, y:  0.85, z: 0, col: "#FFA500", lbl: "+ŝ_{xz}" },

      { id: "F_ym", x: 0, y: -0.85, z: 0, col: "#FFA500", lbl: "−ŝ_{xz}" },

      { id: "F_zp", x: 0, y: 0, z:  0.85, col: "#FFD700", lbl: "+ŝ_{xy}" },

      { id: "F_zm", x: 0, y: 0, z: -0.85, col: "#FFD700", lbl: "−ŝ_{xy}" }

    ];

    faces.forEach(f => {

      drawNode3D(f.id, f.x, f.y, f.z, 7, f.col, "#fff", f.lbl, `Spin-Oriented Metron Boundary Surface ${f.lbl}: N_surfaces(p) = 2C(p,2) = p(p−1) = 6 (Thm. 10.1)`, w, h);

    });

    drawNode3D("Met_Center", 0, 0, 0, 9.5, "#FFD700", "#DC143C", "τ ≈ 1.13×10⁻⁷⁰ m²", "Indivisible Quantum of Geometric Area τ = (√3/4)ℓ_P² (Televarianzbedingung SM-63)", w, h);

  }



  // Stage 2: Metrondifferentiale \nabla\phi & Discrete Osculating Extremwerttheorie (Fig. 10.1)

  function renderStage2(w, h) {

    let prev = null;

    for (let n = 0; n <= 10; n++) {

      const x = (n - 5) * 0.28;

      const z = 0.78 * Math.sin((n - 1.5) * 0.62);

      const isMax = (n === 4), isInf = (n === 6), isMin = (n === 9);

      const col = isMax ? "#20B2AA" : (isInf ? "#FFD700" : (isMin ? "#FFA500" : "#4169E1"));

      const lbl = isMax ? "Max (∇²φ<0)" : (isInf ? "Wendepunkt w" : (isMin ? "Min (∇²φ>0)" : ""));

      const p = drawNode3D(

        "Osc_" + n, x, 0, z, (isMax || isInf || isMin) ? 8.5 : 5, col, "#fff", lbl,

        isInf ? "Discrete Inflection Node w=6: ∇²φ(w)·∇²φ(w+1) < 0 (SM Eq. 68b)" : `Lattice Node n=${n}: φ(n) = ${z.toFixed(2)}`, w, h

      );

      if (prev) drawLine3D(prev, p, "#20B2AA", 2.4);

      prev = p;

    }

  }



  // Stage 3: Metronintegral Telescoping Staircase \mathcal{S}_{n_1}^{n_2}\phi = \Phi(n_2) - \Phi(n_1-1) (SM-67a)

  function renderStage3(w, h) {

    for (let j = 1; j <= 5; j++) {

      const x = (j - 3) * 0.58;

      const zBot = -0.95;

      const zPrev = -0.95 + ((j - 1) * (j - 1)) * 0.075;

      const zCurr = -0.95 + (j * j) * 0.075;

      const isEnd = (j === 5);

      const pBot  = proj(x, 0, zBot, w, h);

      const pPrev = proj(x, 0, zPrev, w, h);

      const pCurr = drawNode3D(

        "Stair_" + j, x, 0, zCurr, isEnd ? 9.5 : 6.5,

        isEnd ? "#FFD700" : "#20B2AA", "#fff",

        isEnd ? "Φ(n₂) = N²" : `Φ(${j})`,

        `Primitive Sequence Φ(${j}) = ${j*j}: Riser ∇Φ(${j}) = Φ(${j})−Φ(${j-1}) = ${2*j-1} telescopes!`, w, h

      );

      drawLine3D(pBot, pPrev, "rgba(65,105,225,0.45)", 4.0);

      drawLine3D(pPrev, pCurr, "#FFD700", 5.5);

    }

  }



  // Stage 4 & 5: Commuting Shifts F_k F_l = F_l F_k, Discrete Wronskian & 3D Stencil \nabla_i = I - E_i^{-1}

  function renderStage4And5(w, h, st) {

    const isStage5 = (st >= 4.5);

    // 3x3x2 Lattice Grid \mathbb{M}_\tau^3 showing backward stencil around central node n

    for (let ix = -1; ix <= 1; ix++) {

      for (let iy = -1; iy <= 1; iy++) {

        const p = proj(ix * 0.85, iy * 0.85, -0.35, w, h);

        if (ix < 1) drawLine3D(p, proj((ix + 1) * 0.85, iy * 0.85, -0.35, w, h), "rgba(65,105,225,0.35)", 1.3);

        if (iy < 1) drawLine3D(p, proj(ix * 0.85, (iy + 1) * 0.85, -0.35, w, h), "rgba(65,105,225,0.35)", 1.3);

      }

    }

    const pCenter = drawNode3D("St_n", 0, 0, -0.35, 10, "#FFD700", "#DC143C", "Node n ∈ 𝕄_τ^n", "Primary Lattice Node n: Backward Difference ∇_i φ(n) = φ(n) − φ(n − e_i)", w, h);

    const pEx = drawNode3D("St_ex", -0.85, 0, -0.35, 8, "#4169E1", "#fff", "E₁⁻¹ n (n−e₁)", "Backward Shift along Axis 1: E₁⁻¹ φ(n) = φ(n₁−1, n₂, n₃)", w, h);

    const pEy = drawNode3D("St_ey", 0, -0.85, -0.35, 8, "#20B2AA", "#fff", "E₂⁻¹ n (n−e₂)", "Backward Shift along Axis 2: E₂⁻¹ φ(n) = φ(n₁, n₂−1, n₃)", w, h);

    const pEz = drawNode3D("St_ez", 0, 0, 0.65, 8, "#FFA500", "#fff", isStage5 ? "E₃⁻¹ n (‖∇_i‖≤2)" : "Wronskian D(n) ≠ 0", isStage5 ? "Def. 10.4 Bounded Operator ∇_i = I − E_i⁻¹ on ℓ^∞(𝕄_τ^n)" : "Thm. 10.2 Discrete Wronskian Determinant det[∇^{γ−1}y_k(n)] ≠ 0 (SM-82)", w, h);



    drawLine3D(pEx, pCenter, "#4169E1", 3.2);

    drawLine3D(pEy, pCenter, "#20B2AA", 3.2);

    drawLine3D(pCenter, pEz, "#FFA500", 3.2);

  }



  // Stage 6: DEC Primal Cubical Complex K & Circumcentric Voronoi Dual Complex K* (*_\tau Hodge Star)

  function renderStage6(w, h) {

    // Primal Cube K centered at (-0.35, -0.35, -0.35) (Blue)

    drawCubeWireframe(-0.32, -0.32, -0.25, 0.68, "#4169E1", 2.2, null, w, h);

    // Circumcentric Voronoi Dual Cube K* shifted by (+0.64, +0.64, +0.50) (Gold dashed)

    drawCubeWireframe(0.32, 0.32, 0.25, 0.68, "#FFD700", 2.0, [4, 3], w, h);



    // Highlight Primal 2-Face \sigma_2 pierced orthogonally by Dual 1-Edge \sigma_1^* = *_K \sigma_2

    const pFace = drawNode3D("Primal_Sig2", 0.36, -0.32, -0.25, 8.5, "#20B2AA", "#fff", "Primal Face σ₂ ∈ K", "Primal 2-Cell σ₂: Coboundary d_K ω(σ₂) = ∮_{∂σ₂} ω satisfies d_K² ≡ 0 (Def. 10.6)", w, h);

    const pDual = drawNode3D("Dual_Sig1", 0.36, 0.32, 0.25, 8.5, "#FFD700", "#DC143C", "Dual Edge σ₁* = *_K σ₂", "Voronoi Dual Cell σ_{n−k}^* ∈ K*: (*_K ω)(σ*) = (|σ*|/|σ|) ω(σ) (Def. 10.5)", w, h);

    drawLine3D(proj(-0.32, -0.32, -0.25, w, h), pDual, "#FFD700", 3.4);

  }



  // Stage 7: Hexagonal Metronic Honeycomb (\tau = \frac{\sqrt{3}}{4}\ell_P^2), Spin Rotor \hat{s} & \nabla^\gamma n^\gamma = \gamma!

  function renderStage7(w, h) {

    const hex = [];

    for (let k = 0; k < 6; k++) {

      const a = timeSec * 0.4 + (k / 6) * Math.PI * 2;

      const x = 1.15 * Math.cos(a), y = 1.15 * Math.sin(a);

      hex.push(drawNode3D("Hex_" + k, x, y, -0.45, 6.5, "#20B2AA", "#fff", k === 0 ? "ℓ_P" : "", "Equilateral Metronic Triangle Vertex: Area τ = (√3/4)ℓ_P² ≈ 1.13115×10⁻⁷⁰ m²", w, h));

    }

    const pHub = drawNode3D("Hex_Hub", 0, 0, -0.45, 8.5, "#4169E1", "#fff", "τ = (√3/4)ℓ_P²", "Honeycomb Center Node: Minimum non-singular radius r_min ≥ √τ (Fig. 10.4)", w, h);

    for (let k = 0; k < 6; k++) {

      drawLine3D(hex[k], hex[(k + 1) % 6], "#20B2AA", 2.4);

      drawLine3D(pHub, hex[k], "rgba(65,105,225,0.65)", 1.8);

    }

    // Vertical Spin Rotor Vector \hat{s} = ROT_N \widehat{\Phi}

    const pSpin = drawNode3D("Spin_s", 0, 0, 0.95, 10, "#FFD700", "#DC143C", "ŝ = ROT_N Φ̂ | ∇^γ n^γ = γ!", "Discrete Spin Rotor Eigenvalue (ŝ; n)_{n=1} = τ̂ & Thm. 10.8 Monomial Identity ∇^γ n^γ = γ!", w, h);

    drawLine3D(pHub, pSpin, "#FFD700", 3.5);

  }



  // Stage 8: Discrete Leibniz Product Cross-Term Box \nabla(uv) = u\nabla v + v\nabla u - (\nabla u)(\nabla v) (Thm. 10.12)

  function renderStage8(w, h) {

    // Main Product Block u(n) v(n) + Crimson Corner Discreteness Cross-Term -(\nabla u)(\nabla v)

    drawCubeWireframe(-0.25, -0.25, -0.15, 0.65, "#4169E1", 2.0, null, w, h);

    drawCubeWireframe( 0.62,  0.62,  0.52, 0.32, "#DC143C", 2.8, null, w, h);



    drawNode3D("Lb_u", -0.9, 0, -0.15, 8, "#4169E1", "#fff", "(∇_i u) v", "First Classical Leibniz Summand (∇_i u)v", w, h);

    drawNode3D("Lb_v", 0, -0.9, -0.15, 8, "#20B2AA", "#fff", "u (∇_i v)", "Second Classical Leibniz Summand u(∇_i v)", w, h);

    drawNode3D("Lb_Cross", 0.62, 0.62, 0.52, 9.5, "#DC143C", "#FFD700", "−(∇_i u)(∇_i v) (SM-68a)", "Thm. 10.12 Non-Linear Discreteness Signature: Scales as O(τ²) → 0 as τ → 0⁺!", w, h);

  }



  // Stage 9: 3D Discrete Gauss-Stokes Divergence Flux Cube (Thm. 10.17, SM-80)

  function renderStage9(w, h) {

    drawCubeWireframe(0, 0, 0, 0.78, "#20B2AA", 2.2, null, w, h);

    const normals = [

      { id: "Fl_xp", dx:  1, dy:  0, dz:  0, lbl: "+Flux_{b₁}" },

      { id: "Fl_xm", dx: -1, dy:  0, dz:  0, lbl: "−Flux_{a₁−1}" },

      { id: "Fl_yp", dx:  0, dy:  1, dz:  0, lbl: "+Flux_{b₂}" },

      { id: "Fl_ym", dx:  0, dy: -1, dz:  0, lbl: "−Flux_{a₂−1}" },

      { id: "Fl_zp", dx:  0, dy:  0, dz:  1, lbl: "+Flux_{b₃}" },

      { id: "Fl_zm", dx:  0, dy:  0, dz: -1, lbl: "−Flux_{a₃−1}" }

    ];

    const pulse = 1.18 + 0.15 * Math.sin(timeSec * 3);

    normals.forEach(nm => {

      const pFace = proj(nm.dx * 0.78, nm.dy * 0.78, nm.dz * 0.78, w, h);

      const pTip  = drawNode3D(nm.id, nm.dx * pulse, nm.dy * pulse, nm.dz * pulse, 6.5, "#FFD700", "#DC143C", nm.lbl, `Thm. 10.17 Discrete Gauss Facet Flux ${nm.lbl}: Interior differences telescope to ∂Ω!`, w, h);

      drawLine3D(pFace, pTip, "#FFD700", 3.0);

    });

    drawNode3D("GS_Core", 0, 0, 0, 8.5, "#20B2AA", "#fff", "∑_Ω DIV_n A", "Interior Volume Divergence Sum equals Net Boundary Flux across all 2n = 6 facets (SM-80)", w, h);

  }



  // Stage 10: 3D Brillouin Zone UV Dispersion Surface \lambda(k) = (4/\tau^2)\sum\sin^2(k_i\tau/2) & Stage VI Polarimeter

  function renderStage10(w, h) {

    // 3D Sine-Squared Brillouin Dispersion Dome over [-\pi/\tau, +\pi/\tau]^2

    for (let u = -1.35; u <= 1.36; u += 0.34) {

      ctx.beginPath();

      ctx.strokeStyle = "#FFA500";

      ctx.lineWidth = 1.8;

      for (let v = -1.35; v <= 1.36; v += 0.17) {

        const ku = (u / 1.35) * (Math.PI * 0.5);

        const kv = (v / 1.35) * (Math.PI * 0.5);

        const lam = -0.85 + 0.92 * (Math.pow(Math.sin(ku), 2) + Math.pow(Math.sin(kv), 2));

        const p = proj(u, v, lam, w, h);

        if (v === -1.35) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    drawNode3D("UV_Zero", 0, 0, -0.85, 8.5, "#20B2AA", "#fff", "k = 0 (IR Continuum)", "Long-Wavelength Continuum Limit: λ(k) ≈ |k|² + O(τ²|k|⁴) (Thm. 10.21)", w, h);

    drawNode3D("UV_Max", 1.35, 1.35, 0.99, 10, "#FFD700", "#DC143C", "Λ_UV = 4/√τ (Brillouin Corner)", "Thm. 10.21 Intrinsic Ultraviolet Cutoff at Brillouin Zone Boundary k_i = ±π/τ!", w, h);

  }



  // Master 60fps Loop

  function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch10-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }

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



    function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);

    else if (stInt === 2) renderStage2(w, h);

    else if (stInt === 3) renderStage3(w, h);

    else if (stInt === 4 || stInt === 5) renderStage4And5(w, h, stArg);

    else if (stInt === 6) renderStage6(w, h);

    else if (stInt === 7) renderStage7(w, h);

    else if (stInt === 8) renderStage8(w, h);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh10Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch10-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch10-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch10-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch10-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch10-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh10Stage = function(val) { window.setCh10Stage(val, true); };



  window.enableCh10Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch10-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh10WithDeck();

  };



  window.toggleCh10Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch10-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh10Spotlight = function() {

    const hud = document.getElementById('ch10-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh10Minimize = function() {

    const hud = document.getElementById('ch10-3d-hud');

    const b = document.getElementById('ch10-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh10WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch10-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-10, section[data-chapter="10"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.setCh10Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh10WithDeck = syncCh10WithDeck;
  }



  // 3D Orbit Drag, Wheel Zoom & Node Click Hit-Testing

  wrap.addEventListener('mousedown', e => {

    e.stopPropagation();

    isDragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mousemove', e => {

    if (!isDragging) return;

    camYaw += (e.clientX - lastX) * 0.012;

    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));

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

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    camYaw += dx * 0.012;
    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('mouseup', () => { isDragging = false; });



  wrap.addEventListener('click', e => {

    e.stopPropagation();

    const rect = canvas.getBoundingClientRect();

    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    let hit = null;

    for (let i = hitNodes.length - 1; i >= 0; i--) {

      const n = hitNodes[i];

      if (Math.hypot(mx - n.p.sx, my - n.p.sy) <= n.r + 6) { hit = n; break; }

    }

    const insp = document.getElementById('ch10-node-inspector');

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



  function init() {

    resize();

    syncCh10WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_10 = false;
    const synBindSync_syncCh10WithDeck = () => {
      if (syncRaf_10) return;
      syncRaf_10 = true;
      requestAnimationFrame(() => {
        syncRaf_10 = false;
        syncCh10WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh10WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh10WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh10WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh10WithDeck, { passive: true });

    const revEl_syncCh10WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh10WithDeck) {
      revEl_syncCh10WithDeck.addEventListener('scroll', synBindSync_syncCh10WithDeck, { passive: true });
      revEl_syncCh10WithDeck.addEventListener('touchmove', synBindSync_syncCh10WithDeck, { passive: true });
    }
    const vpEl_syncCh10WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh10WithDeck) {
      vpEl_syncCh10WithDeck.addEventListener('scroll', synBindSync_syncCh10WithDeck, { passive: true });
      vpEl_syncCh10WithDeck.addEventListener('touchmove', synBindSync_syncCh10WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh10WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh10WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh10WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh10WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh10WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh10WithDeck);
    }

    const hud = document.getElementById('ch10-3d-hud');

    if (hud) {

      hud.querySelectorAll('input, button').forEach(el => {

        el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());

      });

    }

  }



  init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh10Engine);
  } else {
    runCh10Engine();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 11 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
window.showGenericTab = window.showGenericTab || function(prefix, idx, maxIdx, btnEl) {
  for (let i = 1; i <= maxIdx; i++) {
    const p = document.getElementById(prefix + '-' + i) || document.getElementById(prefix + '-pane-' + i);
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

(function() {
  // WIDGET 1: §11.1.1 & Prop. 11.6 Strukturkompressor (^4\zeta) & Null-Stability (^4 F = 0)
  window.ch11_setNullStability = function(lockMode) {
    const elDg = document.getElementById('ch11-komp-dgamma');
    const elWg = document.getElementById('ch11-komp-wedge');
    const elLm = document.getElementById('ch11-komp-lambda');
    if (!elDg || !elWg || !elLm) return;
    if (lockMode === 1) {
      elDg.value = "1.20";
      elWg.value = "0.60";
      elLm.value = "1.80";
    } else {
      elDg.value = "1.65";
      elWg.value = "0.95";
      elLm.value = "1.10";
    }
    window.ch11_updateKompressor();
  };

  window.ch11_updateKompressor = function() {
    const elDg = document.getElementById('ch11-komp-dgamma');
    if (!elDg) return;
    const dg = parseFloat(elDg.value);
    const wg = parseFloat(document.getElementById('ch11-komp-wedge').value);
    const lm = parseFloat(document.getElementById('ch11-komp-lambda').value);

    document.getElementById('ch11-komp-dgamma-val').innerText = dg.toFixed(2);
    document.getElementById('ch11-komp-wedge-val').innerText = wg.toFixed(2);
    document.getElementById('ch11-komp-lambda-val').innerText = lm.toFixed(2);

    const zetaTotal = dg + wg;
    const residualF = Math.abs(zetaTotal - lm);
    const isLocked = residualF < 0.05;

    // 4-sector decomposition (Prop. 11.6, SM-99a)
    const sIntrinsic = 0.42 * zetaTotal;
    const sCoupling = 0.26 * zetaTotal;
    const sCross = 0.18 * zetaTotal;
    const sMixed = 0.14 * zetaTotal;

    const svg = document.getElementById('ch11-komp-svg');
    if (svg) {
      const sectors = [
        { lbl: "⁴ζ(α)", val: sIntrinsic, col: "#4169E1" },
        { lbl: "⁴q(α)", val: sCoupling, col: "#20B2AA" },
        { lbl: "⁴C(α)", val: sCross, col: "#FFA500" },
        { lbl: "⁴D(α)", val: sMixed, col: "#9370DB" }
      ];
      let html = `<line x1="15" y1="98" x2="205" y2="98" stroke="#475569" stroke-width="1.5"/>`;
      sectors.forEach((s, i) => {
        const bx = 24 + i * 44;
        const bh = Math.min(72, Math.max(6, s.val * 55));
        const by = 98 - bh;
        html += `<rect x="${bx}" y="${by.toFixed(1)}" width="28" height="${bh.toFixed(1)}" rx="3" fill="${s.col}" fill-opacity="0.82" stroke="#e2e8f0" stroke-width="0.8"/>`;
        html += `<text x="${bx + 14}" y="111" fill="#cbd5e1" font-size="8.5" font-weight="bold" text-anchor="middle">${s.lbl}</text>`;
        html += `<text x="${bx + 14}" y="${(by - 4).toFixed(1)}" fill="${s.col}" font-size="8" font-weight="bold" text-anchor="middle">${s.val.toFixed(2)}</text>`;
      });
      const statusCol = isLocked ? "#FFD700" : "#DC143C";
      const statusTxt = isLocked ? "⁴F = 0 (TENSORION LOCKED)" : `||⁴F|| = ${residualF.toFixed(2)} (STRESSED)`;
      html += `<text x="110" y="14" fill="${statusCol}" font-size="9" font-weight="bold" text-anchor="middle">${statusTxt}</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch11-komp-readout');
    if (box) {
      box.style.borderLeftColor = isLocked ? "#FFD700" : "#DC143C";
      box.innerHTML =
        `<b>SM-99 Curvature Compressor:</b> ζ^i_{klm} = (d_τ Γ) + [Γ∧Γ] = ${dg.toFixed(2)} + ${wg.toFixed(2)} = <b>${zetaTotal.toFixed(2)}</b> | ` +
        `<b>SM-99a 4-Sectors:</b> ⁴ζ=${sIntrinsic.toFixed(2)}, ⁴q=${sCoupling.toFixed(2)}, ⁴C=${sCross.toFixed(2)}, ⁴D=${sMixed.toFixed(2)}<br>` +
        (isLocked
          ? `<span style="color:#FFD700;"><b>✓ NULL-STABILITY ACHIEVED (SM-100: ⁴F(ζ, λ_m Γ) = 0):</b></span> Internal geometric stress cancels; state stabilizes as a quantized <b>Tensorion</b> with eigenvalue λ_m = ${lm.toFixed(2)}!`
          : `<span style="color:#ff6b81;"><b>⚠ NON-ZERO CURVATURE STRESS (||⁴F|| = ${residualF.toFixed(2)} &gt; 0):</b></span> Unbalanced stress dynamically suppresses configuration. Click <b>Lock Null-Stability (⁴F = 0)</b>!`);
    }
  };

  // WIDGET 2: §11.1.2 Discrete Spin Rotor Plaquette Lab (SM-87 & Fig. 11.4)
  window.ch11_setSpinPreset = function(twoJ) {
    const elP1 = document.getElementById('ch11-spin-phi1');
    const elP2 = document.getElementById('ch11-spin-phi2');
    if (!elP1 || !elP2) return;
    // Set link fluxes so (\nabla_1 \Phi_2 - \nabla_2 \Phi_1) = Q / 2
    elP1.value = (twoJ * 0.5 + 0.5).toFixed(2);
    elP2.value = "0.50";
    window.ch11_updateSpinPlaquette();
  };

  window.ch11_updateSpinPlaquette = function() {
    const elP1 = document.getElementById('ch11-spin-phi1');
    if (!elP1) return;
    const d1Phi2 = parseFloat(elP1.value);
    const d2Phi1 = parseFloat(document.getElementById('ch11-spin-phi2').value);
    document.getElementById('ch11-spin-phi1-val').innerText = d1Phi2.toFixed(2);
    document.getElementById('ch11-spin-phi2-val').innerText = d2Phi1.toFixed(2);

    const curlVal = d1Phi2 - d2Phi1;
    const twoJ = Math.round(Math.abs(curlVal) * 2);
    const isQuantized = Math.abs(Math.abs(curlVal) * 2 - twoJ) < 0.08;
    const spinJ = (twoJ / 2);

    const svg = document.getElementById('ch11-spin-svg');
    if (svg) {
      const colArc = isQuantized ? "#FFD700" : "#FFA500";
      const html = `
        <rect x="45" y="18" width="120" height="84" fill="rgba(65,105,225,0.10)" stroke="#4169E1" stroke-width="1.8" rx="4"/>
        <circle cx="45" cy="102" r="3.5" fill="#4169E1"/><text x="38" y="114" fill="#94a3b8" font-size="8" text-anchor="end">n</text>
        <circle cx="165" cy="102" r="3.5" fill="#4169E1"/><text x="172" y="114" fill="#94a3b8" font-size="8">n+e₁</text>
        <circle cx="165" cy="18" r="3.5" fill="#4169E1"/><text x="172" y="14" fill="#94a3b8" font-size="8">n+e₁+e₂</text>
        <circle cx="45" cy="18" r="3.5" fill="#4169E1"/><text x="38" y="14" fill="#94a3b8" font-size="8" text-anchor="end">n+e₂</text>
        <line x1="58" y1="102" x2="152" y2="102" stroke="#20B2AA" stroke-width="2.2"/>
        <line x1="165" y1="92" x2="165" y2="28" stroke="#20B2AA" stroke-width="2.2"/>
        <line x1="152" y1="18" x2="58" y2="18" stroke="#20B2AA" stroke-width="2.2"/>
        <line x1="45" y1="28" x2="45" y2="92" stroke="#20B2AA" stroke-width="2.2"/>
        <path d="M 127,60 A 22,22 0 1,0 105,82" fill="none" stroke="${colArc}" stroke-width="2.8"/>
        <polygon points="105,78 113,82 105,86" fill="${colArc}"/>
        <text x="105" y="57" fill="${colArc}" font-size="9.5" font-weight="bold" text-anchor="middle">ŝ = ${curlVal.toFixed(2)} τ̂</text>
        <text x="105" y="70" fill="#e2e8f0" font-size="8" text-anchor="middle">Q = 2J = ${twoJ}</text>
      `;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch11-spin-readout');
    if (box) {
      const fam = twoJ === 0 ? "Pseudoscalar Meson (J=0, e.g. π, K)" :
                  twoJ === 1 ? "Chiral Fermion / Nucleon (J=1/2, e.g. e⁻, p, n)" :
                  twoJ === 2 ? "Vector Boson / Meson (J=1, e.g. ρ±, γ)" :
                  "Decuplet Baryon Resonance (J=3/2, e.g. Ω⁻)";
      box.innerHTML =
        `<b>SM-87 Spin Selector:</b> ŝ = ROT_N Φ̂ = (∇₁Φ₂ - ∇₂Φ₁)/√τ = <b>${curlVal.toFixed(2)} τ̂</b> | ` +
        `<b>Double Spin:</b> <span style="color:#FFD700;"><b>Q = 2J = ${twoJ} (Spin J = ${spinJ})</b></span> → ${fam}`;
    }
  };

  // WIDGET 3: §11.1.3 Resonant Geometric Soliton & Strukturkondensation (SM-91, SM-96, SM-100)
  window.ch11_updateSolitonShells = function() {
    const elP = document.getElementById('ch11-sol-p');
    if (!elP) return;
    const p = parseInt(elP.value);
    const nu = parseInt(document.getElementById('ch11-sol-nu').value);
    document.getElementById('ch11-sol-p-val').innerText = `p=${p}`;
    document.getElementById('ch11-sol-nu-val').innerText = `ν=${nu}`;

    const binom6 = [1, 6, 15, 20, 15, 6, 1][p];
    const pnu = (nu - 1) + 7.42 * Math.pow(nu - 1, 3);
    const nCond = (binom6 * (1 + 0.18 * nu)).toFixed(2);

    const svg = document.getElementById('ch11-sol-svg');
    if (svg) {
      let html = `
        <circle cx="105" cy="60" r="52" fill="none" stroke="#4169E1" stroke-width="0.9" stroke-dasharray="2,2" opacity="0.6"/>
        <circle cx="105" cy="60" r="40" fill="rgba(32,178,170,0.14)" stroke="#20B2AA" stroke-width="2.2"/>
        <text x="105" y="15" fill="#20B2AA" font-size="7.5" font-weight="bold" text-anchor="middle">Boundary Shell ⁴F = 0</text>
      `;
      for (let k = 1; k <= nu; k++) {
        const rk = 14 + (k / (nu + 0.4)) * 23;
        html += `<circle cx="105" cy="60" r="${rk.toFixed(1)}" fill="none" stroke="#FFA500" stroke-width="1.5" stroke-dasharray="4,2"/>`;
      }
      html += `
        <circle cx="105" cy="60" r="11" fill="rgba(220,20,60,0.35)" stroke="#DC143C" stroke-width="2"/>
        <text x="105" y="63" fill="#FFD700" font-size="7.5" font-weight="bold" text-anchor="middle">I₆</text>
      `;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch11-sol-readout');
    if (box) {
      box.innerHTML =
        `<b>Fig. 11.1 Resonant Soliton:</b> Rank p=${p} ⇒ Multiplicity L_${p} = C(6,${p}) = <b style="color:#FFD700;">${binom6}</b> | ` +
        `Radial Mode ν=${nu} ⇒ Excitation P(ν) = <b>${pnu.toFixed(2)}</b> | ` +
        `<b>SM-91 Condensation:</b> N̄ = S K̄ δ̄n ≈ <b>${nCond}</b>`;
    }
  };

  // WIDGET 4: §11.2 Combinatorial Capacity Balance Polynomial Explorer (Assumption 11.1 & Thm. 11.12)
  window.ch11_updateCapacityBalance = function() {
    const elN = document.getElementById('ch11-cap-n');
    if (!elN) return;
    const N = parseFloat(elN.value);
    document.getElementById('ch11-cap-n-val').innerText = N.toFixed(1);

    const zOmega = Math.pow(N, 4) / 16.0;
    const zCoord = (Math.pow(N, 3) + 3.0 * Math.pow(N, 2)) / 4.0;
    const diff = zOmega - zCoord;

    const svg = document.getElementById('ch11-cap-svg');
    if (svg) {
      let pathOmega = [];
      let pathCoord = [];
      for (let i = 0; i <= 70; i++) {
        const xVal = 1.0 + (i / 70.0) * 6.5; // N from 1 to 7.5
        const yo = Math.pow(xVal, 4) / 16.0;
        const yc = (Math.pow(xVal, 3) + 3.0 * Math.pow(xVal, 2)) / 4.0;
        const sx = 22 + ((xVal - 1.0) / 6.5) * 172;
        const syO = 104 - Math.min(92, (yo / 140.0) * 86);
        const syC = 104 - Math.min(92, (yc / 140.0) * 86);
        pathOmega.push((i === 0 ? "M " : "L ") + sx.toFixed(1) + "," + syO.toFixed(1));
        pathCoord.push((i === 0 ? "M " : "L ") + sx.toFixed(1) + "," + syC.toFixed(1));
      }
      const curX = 22 + ((N - 1.0) / 6.5) * 172;
      const curYO = 104 - Math.min(92, (zOmega / 140.0) * 86);
      const curYC = 104 - Math.min(92, (zCoord / 140.0) * 86);
      const x6 = 22 + ((6.0 - 1.0) / 6.5) * 172;
      const y6 = 104 - (81.0 / 140.0) * 86;

      svg.innerHTML = `
        <line x1="22" y1="104" x2="198" y2="104" stroke="#475569" stroke-width="1.2"/>
        <line x1="22" y1="12" x2="22" y2="104" stroke="#475569" stroke-width="1.2"/>
        <path d="${pathOmega.join(' ')}" fill="none" stroke="#4169E1" stroke-width="2.4"/>
        <path d="${pathCoord.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2.4" stroke-dasharray="4,2"/>
        <circle cx="${x6.toFixed(1)}" cy="${y6.toFixed(1)}" r="5.5" fill="none" stroke="#FFD700" stroke-width="2"/>
        <line x1="${curX.toFixed(1)}" y1="14" x2="${curX.toFixed(1)}" y2="104" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
        <circle cx="${curX.toFixed(1)}" cy="${curYO.toFixed(1)}" r="4" fill="#4169E1"/>
        <circle cx="${curX.toFixed(1)}" cy="${curYC.toFixed(1)}" r="4" fill="#20B2AA"/>
        <text x="108" y="20" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">Unique Root: N=6 (Z=81)</text>
        <text x="65" y="96" fill="#4169E1" font-size="7.5" font-weight="bold">Z_ω = N⁴/16</text>
        <text x="148" y="96" fill="#20B2AA" font-size="7.5" font-weight="bold">Z_k = (N³+3N²)/4</text>
      `;
    }

    const box = document.getElementById('ch11-cap-readout');
    if (box) {
      const isSix = Math.abs(N - 6.0) < 0.05;
      box.style.borderLeftColor = isSix ? "#FFD700" : "#4169E1";
      box.innerHTML =
        `<b>At N = ${N.toFixed(1)} (ω = ${(N/2).toFixed(2)}):</b> Condenser Capacity Z_ω(N) = <b>${zOmega.toFixed(2)}</b> vs. Deformation Capacity Z_k(N) = <b>${zCoord.toFixed(2)}</b> (ΔZ = ${diff.toFixed(2)})<br>` +
        (isSix
          ? `<span style="color:#FFD700;"><b>★ EXACT CAPACITY BALANCE LOCKED AT N = 6 (ω = 3, Z_ω = Z_k = 81):</b></span> Unique positive root of N²(N-6)(N+2)=0! By <b>Thm. 11.12</b>, N=pM ⇒ p ∈ Div(6) = {1, 2, 3, 6}.`
          : `Polynomial factorization: N⁴/16 - (N³+3N²)/4 = N²(N-6)(N+2)/16 ≠ 0. Slide to <b>N = 6.0</b> to lock physical condensation subspace R₆!`);
    }
  };

  // WIDGET 5: §11.3 K_8 = S^2 x T^6 Separated Kaluza-Klein Eigenvalue Spectrum (Thm. 11.8)
  window.ch11_updateK8Spectrum = function() {
    const elEll = document.getElementById('ch11-k8-ell');
    if (!elEll) return;
    const ell = parseInt(elEll.value);
    const ma = parseInt(document.getElementById('ch11-k8-m').value);
    const rs = parseFloat(document.getElementById('ch11-k8-rs').value);
    const la = parseFloat(document.getElementById('ch11-k8-la').value);

    document.getElementById('ch11-k8-ell-val').innerText = ell;
    document.getElementById('ch11-k8-m-val').innerText = ma;
    document.getElementById('ch11-k8-rs-val').innerText = rs.toFixed(1);
    document.getElementById('ch11-k8-la-val').innerText = la.toFixed(1);

    const s2Term = (ell * (ell + 1)) / (rs * rs);
    const t6Term = 6.0 * (4.0 * Math.PI * Math.PI * ma * ma) / (la * la);
    const mu0 = 1.25;
    const lambdaTotal = s2Term + t6Term + mu0;
    const degS2 = 2 * ell + 1;

    const svg = document.getElementById('ch11-k8-svg');
    if (svg) {
      let html = `<rect x="12" y="10" width="186" height="100" rx="5" fill="#070a12" stroke="#334155"/>`;
      for (let l = 0; l <= 4; l++) {
        const eVal = (l * (l + 1)) / (rs * rs) + t6Term + mu0;
        const yPos = 98 - Math.min(80, Math.log10(1 + eVal) * 32);
        const isCur = (l === ell);
        const col = isCur ? "#FFD700" : "#20B2AA";
        const sw = isCur ? "2.8" : "1.3";
        html += `<line x1="30" y1="${yPos.toFixed(1)}" x2="145" y2="${yPos.toFixed(1)}" stroke="${col}" stroke-width="${sw}"/>`;
        html += `<text x="152" y="${(yPos + 3).toFixed(1)}" fill="${col}" font-size="7.5" font-weight="${isCur ? 'bold' : 'normal'}">ℓ=${l}: ${eVal.toFixed(1)}</text>`;
      }
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch11-k8-readout');
    if (box) {
      box.innerHTML =
        `<b>Thm. 11.8 Separated Spectrum on K₈ = S²(R_S) × 𝕋⁶(L_a):</b> ` +
        `λ_{ℓ,m,α} = ℓ(ℓ+1)/R_S² (${s2Term.toFixed(2)}) + ∑ 4π²m_a²/L_a² (${t6Term.toFixed(2)}) + μ_α (${mu0}) = ` +
        `<span style="color:#FFD700;"><b>${lambdaTotal.toFixed(2)} &gt; 0</b></span> (S² Multiplet Degeneracy: 2ℓ+1 = <b>${degS2}</b>).`;
    }
  };

  // WIDGET 6: §11.3 & App. B §B.5 Symplectic Verlet Lattice Geodesic & Precession Lab (Def. 11.9, Def. B.8, Prop. B.9)
  window.ch11_updateVerletOrbit = function() {
    const elEcc = document.getElementById('ch11-verlet-ecc');
    if (!elEcc) return;
    const ecc = parseFloat(elEcc.value);
    const epsGR = parseFloat(document.getElementById('ch11-verlet-eps').value);
    const nSteps = parseInt(document.getElementById('ch11-verlet-steps').value);

    document.getElementById('ch11-verlet-ecc-val').innerText = ecc.toFixed(2);
    document.getElementById('ch11-verlet-eps-val').innerText = epsGR.toFixed(2);
    document.getElementById('ch11-verlet-steps-val').innerText = nSteps;

    const svg = document.getElementById('ch11-verlet-svg');
    if (svg) {
      const cx = 105, cy = 60;
      const aSemi = 44;
      const bSemi = aSemi * Math.sqrt(1 - ecc * ecc);
      let html = `
        <ellipse cx="${cx}" cy="${cy}" rx="${aSemi}" ry="${bSemi.toFixed(1)}" fill="none" stroke="#20B2AA" stroke-width="1.2" stroke-dasharray="3,2" opacity="0.65"/>
        <circle cx="${cx}" cy="${cy}" r="6" fill="#FFA500" stroke="#DC143C" stroke-width="1.5"/>
      `;
      let pts = [];
      let dots = "";
      for (let m = 0; m <= nSteps; m++) {
        const phi = (m / nSteps) * 2.0 * Math.PI * 1.35;
        const r = (aSemi * (1 - ecc * ecc)) / (1 + ecc * Math.cos((1 - epsGR * 0.12) * phi));
        const px = cx + r * Math.cos(phi);
        const py = cy - r * Math.sin(phi);
        pts.push((m === 0 ? "M " : "L ") + px.toFixed(1) + "," + py.toFixed(1));
        dots += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="2.3" fill="#FFD700"/>`;
      }
      html += `<path d="${pts.join(' ')}" fill="none" stroke="#4169E1" stroke-width="1.8"/>` + dots;
      svg.innerHTML = html;
    }

    const dPhiArcsec = (42.98 * (epsGR / 0.15) / (1 - ecc * ecc) * (1 - 0.2056 * 0.2056)).toFixed(2);
    const box = document.getElementById('ch11-verlet-readout');
    if (box) {
      box.innerHTML =
        `<b>Def. 11.9 &amp; Prop. B.9 Centered Verlet Stencil on 𝕄_τ⁴:</b> Midpoint connection ½[Γ(n(m))+Γ(n(m-1))] achieves O(τ²) accuracy with minimum cell cutoff r_min ≥ √τ (no r→0 singularity). ` +
        `<b>Precession:</b> Δφ = 6πGM/[c²a(1-e²)] ≈ <span style="color:#FFD700;"><b>${dPhiArcsec}″/century</b></span> (Mercury baseline: 42.98″/cy, lattice error O(τ/r²) &lt; 10⁻⁴⁰).`;
    }
  };

  // WIDGET 7: §11.3 Thm. 11.11 & Def. B.5 63-Channel Boolean Hypercube Multiplicity Explorer
  window.ch11_selectChannelTier = function(pRank) {
    const elP = document.getElementById('ch11-chan-p');
    if (elP && pRank !== undefined) elP.value = pRank;
    if (!elP) return;
    const p = parseInt(elP.value);
    document.getElementById('ch11-chan-p-val').innerText = `p = ${p}`;

    const L = [0, 6, 15, 20, 15, 6, 1];
    const roles = [
      "",
      "Primary Lepton Channel (e⁻, μ⁻, τ⁻, ν)",
      "Mesonic 2-Flux Bound States (π⁰, π±, K±, K⁰, η, ρ±)",
      "Baryonic 3-Flux Nucleon & Hyperon Tier (p, n, Λ⁰, Σ, Ξ, Ω⁻) — Maximal Symmetry!",
      "Heavy Charmed Mesonic Resonances (D, J/ψ)",
      "Exotic 5-Flux Leptoquark Resonances",
      "Full 6D Volume Scalar Baseline on R₆ = R₄ × S₂"
    ];
    const cols = ["", "#4169E1", "#20B2AA", "#FFA500", "#20B2AA", "#4169E1", "#DC143C"];

    const svg = document.getElementById('ch11-chan-svg');
    if (svg) {
      let html = `<line x1="14" y1="100" x2="196" y2="100" stroke="#475569" stroke-width="1.4"/>`;
      for (let k = 1; k <= 6; k++) {
        const bx = 18 + (k - 1) * 29;
        const bh = L[k] * 3.8;
        const by = 100 - bh;
        const isSel = (k === p);
        const fillOp = isSel ? "0.92" : "0.30";
        const strokeCol = isSel ? "#FFD700" : cols[k];
        html += `<rect x="${bx}" y="${by.toFixed(1)}" width="22" height="${bh.toFixed(1)}" rx="2" fill="${cols[k]}" fill-opacity="${fillOp}" stroke="${strokeCol}" stroke-width="${isSel ? 2.2 : 1}"/>`;
        html += `<text x="${bx + 11}" y="${(by - 3).toFixed(1)}" fill="${isSel ? '#FFD700' : '#cbd5e1'}" font-size="8" font-weight="bold" text-anchor="middle">${L[k]}</text>`;
        html += `<text x="${bx + 11}" y="111" fill="#94a3b8" font-size="7.5" text-anchor="middle">p=${k}</text>`;
      }
      svg.innerHTML = html;
    }

    const ratio = (L[p] / 6.0).toFixed(3);
    const pct = ((L[p] / 63.0) * 100).toFixed(1);
    const box = document.getElementById('ch11-chan-readout');
    if (box) {
      box.innerHTML =
        `<b>Rank p = ${p}:</b> Combinatorial Multiplicity L_${p} = C(6,${p}) = <span style="color:#FFD700;"><b>${L[p]} channels</b></span> (${pct}% of 2⁶-1 = 63 total active channels) | ` +
        `<b>Mass Pre-Factor:</b> L_${p}/L₁ = ${L[p]}/6 = <b>${ratio}</b><br>` +
        `<b>Physical Realization:</b> <span style="color:#5eead4;">${roles[p]}</span>`;
    }
  };

  // WIDGET 8: App. B (§B.2–B.3) & App. D Interactive DESY Particle Mass Eigenvalue Calculator
  const desyPresets = {
    e:     { name: "Electron (e⁻)",       p: 1, P: 0, Q: 1, nu: 1, C: 0,  qx: -1, prod: 0.0005449635, exp: 0.5109989 },
    mu:    { name: "Muon (μ⁻)",           p: 1, P: 0, Q: 1, nu: 2, C: 0,  qx: -1, prod: 0.11258245,   exp: 105.65837 },
    tau:   { name: "Tau (τ⁻)",            p: 1, P: 0, Q: 1, nu: 3, C: 0,  qx: -1, prod: 1.790512,     exp: 1776.86 },
    pi0:   { name: "Neutral Pion (π⁰)",   p: 2, P: 2, Q: 0, nu: 1, C: 0,  qx: 0,  prod: 0.0575114,    exp: 134.9768 },
    pip:   { name: "Charged Pion (π±)",   p: 2, P: 2, Q: 0, nu: 1, C: 0,  qx: 1,  prod: 0.0595900,    exp: 139.5704 },
    kp:    { name: "Charged Kaon (K±)",   p: 2, P: 1, Q: 0, nu: 1, C: 1,  qx: 1,  prod: 0.2105065,    exp: 493.677 },
    p:     { name: "Proton (p⁺)",         p: 3, P: 1, Q: 1, nu: 1, C: 0,  qx: 1,  prod: 0.30013404,   exp: 938.27208 },
    n:     { name: "Neutron (n⁰)",        p: 3, P: 1, Q: 1, nu: 1, C: 0,  qx: 0,  prod: 0.29997080,   exp: 939.56542 },
    lam:   { name: "Lambda (Λ⁰)",         p: 3, P: 0, Q: 1, nu: 1, C: -1, qx: 0,  prod: 0.3557645,    exp: 1115.683 },
    omega: { name: "Omega Minus (Ω⁻)",    p: 3, P: 0, Q: 3, nu: 1, C: -3, qx: -1, prod: 0.5333120,    exp: 1672.45 }
  };

  window.ch11_CurrentPreset = 'p';

  window.ch11_setDesyPreset = function(key) {
    const pr = desyPresets[key];
    if (!pr) return;
    window.ch11_CurrentPreset = key;
    const elP = document.getElementById('ch11-desy-p');
    const elQx = document.getElementById('ch11-desy-qx');
    const elC = document.getElementById('ch11-desy-c');
    const elNu = document.getElementById('ch11-desy-nu');
    if (elP) elP.value = pr.p;
    if (elQx) elQx.value = pr.qx;
    if (elC) elC.value = pr.C;
    if (elNu) elNu.value = pr.nu;
    window.ch11_updateDesyCalc(true);
  };

  window.ch11_updateDesyCalc = function(fromPreset) {
    const elP = document.getElementById('ch11-desy-p');
    if (!elP) return;
    const p = parseInt(elP.value);
    const qx = parseInt(document.getElementById('ch11-desy-qx').value);
    const C = parseInt(document.getElementById('ch11-desy-c').value);
    const nu = parseInt(document.getElementById('ch11-desy-nu').value);

    document.getElementById('ch11-desy-p-val').innerText = p;
    document.getElementById('ch11-desy-qx-val').innerText = (qx > 0 ? '+' : '') + qx;
    document.getElementById('ch11-desy-c-val').innerText = (C > 0 ? '+' : '') + C;
    document.getElementById('ch11-desy-nu-val').innerText = nu;

    const pr = desyPresets[window.ch11_CurrentPreset] || desyPresets.p;
    // Exact Python metronic_mass_scale formula from Appendix D.2
    const hbar = 1.054571817e-34, G = 6.67430e-11, c = 2.99792458e8;
    const tau = (Math.sqrt(3.0) / 4.0) * hbar * G / Math.pow(c, 3);
    const m0 = hbar / (c * Math.sqrt(tau));
    const ratio = Math.sqrt(tau) / 2.103089e-16;
    const excitation = (nu - 1) + 7.42 * Math.pow(nu - 1, 3);
    const correction = 1.0 - 0.000543 * (qx * qx) + 0.001378 * (1 - Math.abs(qx)) + 0.001210 * Math.abs(C) + 0.000852 * excitation;
    const binom6 = [1, 6, 15, 20, 15, 6, 1][p];
    const m0MeV = m0 * c * c / (1.602176634e-19 * 1e6);
    const mCalc = m0MeV * ratio * (binom6 / 6.0) * pr.prod * correction;

    const matchedPreset = (p === pr.p && qx === pr.qx && C === pr.C && nu === pr.nu);
    const relErr = ((mCalc - pr.exp) / pr.exp) * 100.0;

    const box = document.getElementById('ch11-desy-readout');
    if (box) {
      box.innerHTML =
        `<b>State Vector q_Heim = (k=${p}, P=${pr.P}, Q=${pr.Q}, ν=${nu}, C=${C}, q_x=${qx}):</b> ` +
        `L_${p}/6 = ${(binom6/6).toFixed(3)} | Perturbation Bracket [1 - κ₁q_x² + κ_n(1-|q_x|) + κ₂|C| + κ₃P(ν)] = <b>${correction.toFixed(6)}</b><br>` +
        `<b>Computed Heim Rest Mass (SM-100a.app):</b> <span style="color:#FFD700; font-size:1.08em;"><b>${mCalc.toFixed(4)} MeV/c²</b></span> ` +
        (matchedPreset
          ? `| <b>PDG Exp (${pr.name}):</b> ${pr.exp} MeV/c² (<span style="color:#5eead4;"><b>Δm/m = ${relErr >= 0 ? '+' : ''}${relErr.toFixed(4)}%</b></span>)`
          : `| <i>(Custom perturbation of ${pr.name} baseline; toggle q_x=0 vs q_x=+1 on Proton to see +1.805 MeV isospin lift!)</i>`);
    }
  };

  // WIDGET 9: App. B (§B.4 Thm. B.6 & §B.6 Scholium B.10) FCC Fine-Structure Constant & GRB 090510 LIV Bounds
  window.ch11_PackingMode = 'FCC';
  window.ch11_setPackingMode = function(mode) {
    window.ch11_PackingMode = mode;
    window.ch11_updateAlphaLivLab();
  };

  window.ch11_updateAlphaLivLab = function() {
    const elE = document.getElementById('ch11-liv-e');
    if (!elE) return;
    const eGeV = parseFloat(elE.value);
    document.getElementById('ch11-liv-e-val').innerText = eGeV.toFixed(0) + ' GeV';

    let fPack = Math.PI / (3.0 * Math.sqrt(2.0)); // FCC 0.74048
    let packName = "FCC Maximal Sphere Packing (π / 3√2 ≈ 0.74048)";
    if (window.ch11_PackingMode === 'SC') {
      fPack = Math.PI / 6.0;
      packName = "Simple Cubic Packing (π / 6 ≈ 0.52360)";
    } else if (window.ch11_PackingMode === 'BCC') {
      fPack = (Math.PI * Math.sqrt(3.0)) / 8.0;
      packName = "Body-Centered Cubic Packing (π√3 / 8 ≈ 0.68017)";
    }

    const alpha0 = 1.0 / 137.035999;
    const etaCell = 1.0 + fPack * (Math.sqrt(3.0) / (8.0 * Math.PI)) * Math.sqrt(8.0 / Math.PI) * alpha0;
    const alphaInvMet = 137.000 * etaCell;
    const alphaCodata = 137.035999084;
    const relPrecision = Math.abs(alphaInvMet - alphaCodata) / alphaCodata;

    // GRB 090510 LIV calculation: E_QG = 1.855e19 GeV = 1.52 M_Planck
    const eQG = 1.855e19;
    const distLightSec = 1.4e17; // ~4.4 Gpc cosmological path
    const deltaT = Math.pow(eGeV / eQG, 2) * distLightSec;

    const box = document.getElementById('ch11-liv-readout');
    if (box) {
      const isFCC = (window.ch11_PackingMode === 'FCC');
      box.innerHTML =
        `<b>Thm. B.6 (${packName}):</b> η_cell = ${etaCell.toFixed(8)} ⇒ ` +
        `<span style="color:${isFCC ? '#FFD700' : '#FFA500'};"><b>α_met⁻¹ = ${alphaInvMet.toFixed(6)}</b></span> ` +
        `(CODATA: 137.035999084, Rel. Diff: <b>${relPrecision.toExponential(2)}</b>)<br>` +
        `<b>Scholium B.10 (GRB 090510 LIV Bound at E = ${eGeV} GeV):</b> E_QG = m₀c² = <b>1.855×10¹⁹ GeV = 1.52 M_Planck &gt; 1.22 M_Planck</b> (95% CL passed!) | Quadratic delay Δt ≈ <b>${deltaT.toExponential(2)} s</b>.`;
    }
  };

  // ---------------------------------------------------------------------------
  // VIDEO CONTROL & INITIALIZATION BOILERPLATE (IIFE-scoped for combined deck)
  // ---------------------------------------------------------------------------
  function prepareVideos() {
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'auto';
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('muted', '');
      v.setAttribute('loop', '');
      v.setAttribute('preload', 'auto');
    });
  }

  function syncVideosToSlide() {
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
      || window.innerWidth <= 768;

    const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
    const winH = window.innerHeight || document.documentElement.clientHeight;
    const winW = window.innerWidth || document.documentElement.clientWidth;

    document.querySelectorAll('video').forEach(v => {
      let shouldPlay = false;
      if (isScroll) {
        const rect = v.getBoundingClientRect();
        const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
        shouldPlay = inView;
      } else {
        shouldPlay = current ? current.contains(v) : true;
      }

      if (shouldPlay) {
        v.muted = true;
        v.playsInline = true;
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      } else if (!v.paused) {
        v.pause();
      }
    });
  }

  // Ensure continuous sync on mobile scroll and touch gestures
  if (typeof window !== 'undefined') {
    window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
    window.__syn_video_sync_handlers.push(syncVideosToSlide);
    if (!window.__syn_video_scroll_hooked) {
      window.__syn_video_scroll_hooked = true;
      const runSync = () => {
        (window.__syn_video_sync_handlers || []).forEach(fn => {
          try { fn(); } catch (_) {}
        });
      };
      window.addEventListener('scroll', runSync, { passive: true });
      window.addEventListener('touchmove', runSync, { passive: true });
      window.addEventListener('resize', runSync, { passive: true });
      let synMediaUnlocked = false;
      function synUnlockMedia() {
        if (synMediaUnlocked) return;
        synMediaUnlocked = true;
        runSync();
      }
      document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
      document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
    }
  }

  function renderAllCh11Widgets() {
    window.ch11_updateKompressor();
    window.ch11_updateSpinPlaquette();
    window.ch11_updateSolitonShells();
    window.ch11_updateCapacityBalance();
    window.ch11_updateK8Spectrum();
    window.ch11_updateVerletOrbit();
    window.ch11_selectChannelTier(3);
    window.ch11_updateDesyCalc(true);
    window.ch11_updateAlphaLivLab();
  }

  function bindControlsOnce() {
    document.querySelectorAll('input[type="range"], select, button').forEach(el => {
      if (el.dataset.synBound) return;
      el.dataset.synBound = '1';
      el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());
    });
  }

  let ch11Initialised = false;
  function initChapter11() {
    if (ch11Initialised) return;
    ch11Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh11Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter11);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter11();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter11();
  }
})();


// =========================================================================
// CHAPTER 11 3D ENGINE INJECTOR & RUNNER
// =========================================================================
const CH11_3D_STYLE = `
#ch11-3d-hud {
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

#ch11-3d-hud *, #ch11-3d-hud *::before, #ch11-3d-hud *::after {
  box-sizing: border-box;
}

#ch11-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch11-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch11-3d-hud.minimized .ch11-hud-body {
  display: none;
}

.ch11-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch11-hud-title {
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

.ch11-hud-title span:first-child {
  line-height: 1.15;
}

.ch11-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch11-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch11-hud-btn {
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

.ch11-hud-btn:hover, .ch11-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch11-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch11-canvas-wrap:active {
  cursor: grabbing;
}

#ch11-3d-hud.spotlight .ch11-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch11-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch11-overlay-bar {
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

.ch11-telemetry {
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

#ch11-node-inspector {
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

.ch11-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch11-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch11-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch11-scrubber .ch11-hud-btn {
  flex-shrink: 0;
}

#ch11-caption {
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
  #ch11-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch11-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch11-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch11-hud-controls {
    gap: 3px;
  }
  .ch11-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch11-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch11-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch11-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch11-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch11-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch11-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch11-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch11-hud-controls {
    gap: 3px;
  }
  .ch11-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch11-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch11-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch11-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch11-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch11-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch11-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch11-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH11_3D_HTML = `<div class="ch11-hud-header">

    <div class="ch11-hud-title">

      <span>⚛️ Ch 11 · 3D Selector &amp; Mass Engine</span>

      <span id="ch11-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch11-hud-controls">

      <button class="ch11-hud-btn active" id="ch11-btn-orbit" onclick="toggleCh11Orbit()">⟳ Orbit</button>

      <button class="ch11-hud-btn" onclick="toggleCh11Spotlight()">⛶ Spotlight</button>

      <button class="ch11-hud-btn" id="ch11-btn-min" onclick="toggleCh11Minimize()">+</button>

    </div>

  </div>



  <div class="ch11-hud-body">

    <div class="ch11-canvas-wrap" id="ch11-canvas-wrap">

      <canvas id="ch11-3d-canvas"></canvas>

      <div class="ch11-overlay-bar">

        <div class="ch11-telemetry" id="ch11-telemetry">Sel Ψ = λΨ | ⁴F = 0 on R₁₂</div>

        <div id="ch11-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch11-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <button class="ch11-hud-btn" title="Previous Stage" onclick="window.setCh11Stage(Math.round( parseFloat(document.getElementById('ch11-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch11-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh11Stage(this.value)">
      <button class="ch11-hud-btn" title="Next Stage" onclick="window.setCh11Stage(Math.round( parseFloat(document.getElementById('ch11-slider').value) ) + 1, true)">▶</button>

      <button class="ch11-hud-btn active" id="ch11-btn-sync" onclick="enableCh11Sync()">Auto-Sync</button>

    </div>



    <div id="ch11-caption">

      <b>Stage 1 (§11.1.1 — SM-99–100):</b> Strukturkompressor ⁴ζ = d_τ Γ + [Γ ∧ Γ] filtering primitive fields into Tensorion eigenstates.

    </div>

  </div>`;

function injectCh113DHUD() {
  if (document.getElementById('ch11-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH11_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch11-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH11_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch11_3d_engine_loaded) return;
  window.__ch11_3d_engine_loaded = true;

  function runCh11Engine() {
    injectCh113DHUD();
    if (window.__ch11_3d_engine_initialized) return;
    window.__ch11_3d_engine_initialized = true;

const canvas = document.getElementById('ch11-3d-canvas');

  const wrap = document.getElementById('ch11-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.48;

  let camPitch = 0.36;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§11.1.1 — SM-99 Strukturkompressor ⁴ζ):</b> 4-sector stress decomposition ⁴ς̄(α)+⁴q̄(α)+⁴C̄(α)+⁴D̄(α) locking Null-Stability ⁴F̄ = 0.",

    2: "<b>Stage 2 (§11.1.2 — SM-87 Spinselektor ŝ &amp; SM-93a):</b> Metron cell plaquette circulation ŝ = ROT_N Φ̂ = (∇₁Φ₂−∇₂Φ₁)/√τ fixing spin Q = 2J.",

    3: "<b>Stage 3 (§11.1.3 — Fig. 11.1 Resonant Geometric Soliton):</b> Core I₆, standing-wave nodal shells λ_k, Null-Stability shell ⁴F=0 &amp; 1/r tail.",

    4: "<b>Stage 4 (§11.2 — Assump. 11.1 Capacity Balance N=6 &amp; Thm. 11.12):</b> N⁴/16 = (N³+3N²)/4 selects unique positive root N = 6 (ω=3) &amp; Div(6).",

    5: "<b>Stage 5 (§11.2.1 — Def. 11.3 12D Fibration R₁₂ ≅ R₄ × S² × 𝕋⁶):</b> Spacetime R₄, organizational sphere S² &amp; compact internal torus 𝕋⁶.",

    6: "<b>Stage 6 (§11.3 — Thm. 11.8 Discrete Real Spectrum on K₈):</b> Self-adjoint selector Sel on L²(K₈,E) &amp; conjectural 3-generation Dirac index.",

    7: "<b>Stage 7 (§11.3 &amp; §B.5 — Def. 11.9 &amp; Prop. B.9 Verlet Geodesic):</b> Symplectic Verlet precessing rosette orbit on 𝕄_τ⁴ (r_min ≥ √τ cutoff!).",

    8: "<b>Stage 8 (§11.3 — Thm. 11.11 63-Channel Binomial Crown):</b> L_p = C(6,p) = (6, 15, 20, 15, 6, 1) peaking at baryonic nucleons L₃ = 20!",

    9: "<b>Stage 9 (App. B §B.1–B.3 — Proton–Neutron 3-Flux Splitting &amp; Krawczyk):</b> p⁺ (938.272 MeV) vs. n⁰ (939.565 MeV, Δm = +1.293 MeV) &amp; Alg. D.4.",

    10: "<b>Stage 10 (App. B §B.4, §B.6 — Thm. B.6 FCC α_met⁻¹ &amp; GRB 090510):</b> Maximal FCC sphere packing (0.74048) ⇒ α_met⁻¹ = 137.036036 &amp; E_QG = 1.52 M_P!"

  };



  const STAGE_TELEMETRY = {

    1: "⁴F̄(ς_{klm}^i, λ_m Γ_{kl}^i) = ⁴0̄ (SM Eq. 100)",

    2: "ŝ = ROT_N Φ̂ | (ŝ ; n)_{n=1} = τ̂ (SM-87)",

    3: "N̄ = 𝒮 K̄ δ̄n (SM-91) | m = m₀ (L_p/L₁) ∏ λ_k",

    4: "N²(N − 6)(N + 2) = 0 ⇒ N = 6 | Div(6)={1,2,3,6}",

    5: "R₁₂ ≅ R₄ × K₈ ≅ R₄ × S² × 𝕋⁶ (∂K₈ = ∅)",

    6: "λ_{ℓ,m,α} = ℓ(ℓ+1)/R_S² + ∑ 4π²m_a²/L_a² + μ_α",

    7: "Δφ = 6πGM/[c²a(1−e²)] = 42.98''/cy (r_min ≥ √τ)",

    8: "∑_{p=1}^6 C(6,p) = 2⁶ − 1 = 63 Channels",

    9: "m_p = 938.272 MeV | m_n = 939.565 MeV (ε̄ < 0.012%)",

    10: "α_met⁻¹ = 137.036036 | E_QG = 1.855×10¹⁹ GeV"

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



  // =========================================================================

  // STAGE RENDERERS (STAGES 1 TO 10)

  // =========================================================================



  // Stage 1: Strukturkompressor ^4\zeta (SM-99) & 4-Component Decomposition (Prop. 11.6)

  function renderStage1(w, h) {

    const pCore = drawNode3D("Null_F", 0, 0, 0, 11.5, "#FFD700", "#20B2AA", "⁴F̄(ς, λ_m Γ) = ⁴0̄", "Null-Stability Eigenstate (SM-100): Sel(Ψ) = λ_m Ψ with perfect internal stress cancellation!", w, h);

    const sectors = [

      { id: "Sec_S", x: -1.15, y: -0.65, z:  0.65, col: "#4169E1", lbl: "⁴ς̄(α) (Intrinsic)" },

      { id: "Sec_Q", x:  1.15, y: -0.65, z:  0.65, col: "#20B2AA", lbl: "⁴q̄(α) (Coupling)" },

      { id: "Sec_C", x: -1.15, y:  0.65, z: -0.65, col: "#FFA500", lbl: "⁴C̄(α) (Cross-Channel)" },

      { id: "Sec_D", x:  1.15, y:  0.65, z: -0.65, col: "#9370DB", lbl: "⁴D̄(α) (Mixed Conn)" }

    ];

    sectors.forEach(s => {

      const pS = drawNode3D(s.id, s.x, s.y, s.z, 8, s.col, "#fff", s.lbl, `Prop. 11.6 Curvature-Compression Sector ${s.lbl} (SM Eq. 99a)`, w, h);

      drawLine3D(pS, pCore, s.col, 2.6, [4, 2]);

    });

  }



  // Stage 2: Metronische Hyperstrukturen & Spinselektor Plaquette \hat{s} = ROT_N \widehat{\Phi} (SM-87)

  function renderStage2(w, h) {

    const s = 0.95;

    const corners = [

      drawNode3D("Pl_00", -s, -s, -0.45, 6.5, "#4169E1", "#fff", "n", "Plaquette Base Node n ∈ 𝕄_τ^n (Gitterselektor C_k / Hyperselektor χ_k)", w, h),

      drawNode3D("Pl_10",  s, -s, -0.45, 6.5, "#4169E1", "#fff", "n+e₁", "Link Φ̂₁(n)", w, h),

      drawNode3D("Pl_11",  s,  s, -0.45, 6.5, "#4169E1", "#fff", "n+e₁+e₂", "Link Φ̂₂(n+e₁)", w, h),

      drawNode3D("Pl_01", -s,  s, -0.45, 6.5, "#4169E1", "#fff", "n+e₂", "Link −Φ̂₁(n+e₂)", w, h)

    ];

    for (let i = 0; i < 4; i++) {

      drawLine3D(corners[i], corners[(i + 1) % 4], "#20B2AA", 3.0);

    }

    // Vertical Spin Rotor Vector \hat{s} = (\nabla_1 \Phi_2 - \nabla_2 \Phi_1)/\sqrt{\tau}

    const pCent = proj(0, 0, -0.45, w, h);

    const pSpin = drawNode3D("Spin_Vec", 0, 0, 1.05, 10.5, "#FFD700", "#DC143C", "ŝ = ROT_N Φ̂ (Q = 2J)", "SM Eq. 87 Spinselektor Matrix: (ŝ ; n)_{n=1} = τ̂ fixing intrinsic spin Q = 2J!", w, h);

    drawLine3D(pCent, pSpin, "#FFD700", 3.8);

  }



  // Stage 3: Resonant Geometric Soliton (Fig. 11.1, SM-91, SM-100a)

  function renderStage3(w, h) {

    const shells = [

      { r: 0.38, col: "#9370DB", id: "Sol_Core", lbl: "Core I₆", info: "Compact Internal Gauge Core I₆ inside the Resonant Geometric Soliton" },

      { r: 0.78, col: "#20B2AA", id: "Sol_Lam",  lbl: "Nodal Shells λ_k", info: "Standing-Wave Eigenvalue Nodal Surfaces λ₁, λ₂, λ₃ of Self-Adjoint Selector Sel" },

      { r: 1.18, col: "#FFD700", id: "Sol_Null", lbl: "Null-Stability Shell ⁴F = 0", info: "Boundary Shell where Curvature Compressor ⁴F̄ vanishes identically (SM-100)" }

    ];

    shells.forEach((sh, idx) => {

      ctx.beginPath();

      ctx.strokeStyle = sh.col;

      ctx.lineWidth = idx === 2 ? 2.8 : 1.8;

      for (let i = 0; i <= 44; i++) {

        const a = (i / 44) * Math.PI * 2;

        const p = proj(sh.r * Math.cos(a), sh.r * Math.sin(a), 0.22 * Math.sin(a * 3 + timeSec * 2), w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      drawNode3D(sh.id, sh.r * Math.cos(idx * 2.0), sh.r * Math.sin(idx * 2.0), 0, idx === 2 ? 9.5 : 7.5, sh.col, "#fff", sh.lbl, sh.info, w, h);

    });

  }



  // Stage 4: Capacity Balance N^4/16 = (N^3+3N^2)/4 => N = 6 (Assump. 11.1) & Div(6) = {1,2,3,6}

  function renderStage4(w, h) {

    // Plot 3D Capacity Curves Z_\omega(N) and Z_k(N) for N \in [1, 7]

    ["omega", "k"].forEach(mode => {

      ctx.beginPath();

      ctx.strokeStyle = mode === "omega" ? "#FFD700" : "#20B2AA";

      ctx.lineWidth = 2.8;

      for (let N = 1.0; N <= 6.8; N += 0.2) {

        const x = (N - 4.0) * 0.44;

        const val = mode === "omega" ? Math.pow(N, 4) / 16.0 : (Math.pow(N, 3) + 3 * N * N) / 4.0;

        const z = -0.95 + (val / 81.0) * 1.65;

        const p = proj(x, mode === "omega" ? -0.25 : 0.25, z, w, h);

        if (N === 1.0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    });

    // Unique Positive Intersection at N = 6 (Z = 81)

    const x6 = (6.0 - 4.0) * 0.44;

    drawNode3D("Root_N6", x6, 0, -0.95 + 1.65, 11, "#FFD700", "#DC143C", "N = 6 (Z_ω = Z_k = 81)", "Assump. 11.1 Unique Positive Root of N²(N − 6)(N + 2) = 0 locking condensation onto R₆!", w, h);

    // 4 Divisor Pillars Div(6) = {1, 2, 3, 6} (Thm. 11.12)

    [1, 2, 3, 6].forEach(d => {

      const xd = (d - 4.0) * 0.44;

      drawNode3D("Div_" + d, xd, -0.85, -0.85, 6.5, "#4169E1", "#fff", `p=${d}∈Div(6)`, `Thm. 11.12 Allowed Metron Divisor p = ${d} (6 = p·M, SM Eqs. 65–65a)`, w, h);

    });

  }



  // Stage 5 & 6: 12D Fibration R_{12} \cong R_4 \times S^2 \times \mathbb{T}^6 & K_8 Eigenvalue Spectrum

  function renderStage5And6(w, h, st) {

    const isStage6 = (st >= 5.5);

    // 3D Torus Wireframe representing K_8 = S^2 \times \mathbb{T}^6

    const R = 0.92, r = 0.36;

    for (let u = 0; u < 12; u++) {

      const a = (u / 12) * Math.PI * 2;

      ctx.beginPath();

      ctx.strokeStyle = "rgba(32, 178, 170, 0.55)";

      ctx.lineWidth = 1.4;

      for (let v = 0; v <= 24; v++) {

        const b = (v / 24) * Math.PI * 2;

        const x = (R + r * Math.cos(b)) * Math.cos(a);

        const y = (R + r * Math.cos(b)) * Math.sin(a);

        const z = r * Math.sin(b) + 0.25;

        const p = proj(x, y, z, w, h);

        if (v === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    drawNode3D("Base_R4", 0, 0, -1.05, 9, "#4169E1", "#fff", "R₄(x₁..x₄) Spacetime", "Observable 4D Lorentzian Spacetime Base Bundle R₄", w, h);

    drawNode3D("Fib_K8", 0, 0, 0.25, 10.5, "#FFD700", "#20B2AA", isStage6 ? "Spec(Sel) = {λ_k} ⊂ ℝ" : "K₈ = S²(x₅,x₆) × 𝕋⁶(x₇..x₁₂)", isStage6 ? "Thm. 11.8 Purely Discrete Real Eigenvalue Spectrum on compact boundaryless K₈ (∂K₈ = ∅)!" : "Def. 11.3 Compact 8D Internal Sub-Bundle K₈ = S² × 𝕋⁶ condensing onto R₆ = R₄ × S₂", w, h);



    if (isStage6) {

      // 3 Chiral Generation Modes (e^-, \mu^-, \tau^-)

      ["ν=1 (e⁻)", "ν=2 (μ⁻)", "ν=3 (τ⁻)"].forEach((lbl, idx) => {

        const a = timeSec * 1.2 + (idx / 3) * Math.PI * 2;

        drawNode3D("Gen_" + idx, R * Math.cos(a), R * Math.sin(a), 0.25, 7, "#FFA500", "#fff", lbl, `Radial Multiplet / Generation Mode ${lbl} on K₈ (Carnap Scholium 11.2, c_GEN3)`, w, h);

      });

    }

  }



  // Stage 7: Symplectic Verlet Precessing Rosette Geodesic on \mathbb{M}_\tau^4 (Def. 11.9, Prop. B.9)

  function renderStage7(w, h) {

    // Precessing Relativistic Rosette Orbit around Schwarzschild-Heim Center with r_min >= \sqrt{\tau}

    ctx.beginPath();

    ctx.strokeStyle = "#20B2AA";

    ctx.lineWidth = 2.4;

    for (let i = 0; i <= 160; i++) {

      const s = (i / 160) * Math.PI * 8;

      const rad = 0.88 / (1.0 + 0.34 * Math.cos(0.86 * s));

      const p = proj(rad * Math.cos(s), rad * Math.sin(s), 0.15 * Math.sin(s), w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    const sNow = (timeSec * 2.2) % (Math.PI * 8);

    const rNow = 0.88 / (1.0 + 0.34 * Math.cos(0.86 * sNow));

    drawNode3D("Verlet_Pt", rNow * Math.cos(sNow), rNow * Math.sin(sNow), 0.15 * Math.sin(sNow), 7.5, "#FFD700", "#000", "n^i(m+1) Verlet", "Def. 11.9 & Prop. B.9 Symplectic Verlet Lattice Geodesic: Δφ = 42.98''/cy", w, h);

    drawNode3D("Rmin_Core", 0, 0, 0, 10, "#DC143C", "#FFD700", "r_min ≥ √τ (No Singularity)", "Minimum Metronic Cell Cutoff eliminates r → 0 continuum singularity!", w, h);

  }



  // Stage 8: 63-Channel Boolean Hypercube Crown L_p = \binom{6}{p} = (6, 15, 20, 15, 6, 1) (Thm. 11.11)

  function renderStage8(w, h) {

    const Lp = [6, 15, 20, 15, 6, 1];

    const names = ["p=1: Leptons (6)", "p=2: Mesons (15)", "p=3: Baryons (20)", "p=4: Heavy (15)", "p=5: Hyper (6)", "p=6: Top (1)"];

    Lp.forEach((L, idx) => {

      const x = (idx - 2.5) * 0.52;

      const zTop = -0.85 + (L / 20.0) * 1.85;

      const isBaryon = (idx === 2);

      const col = isBaryon ? "#FFD700" : (idx < 2 ? "#20B2AA" : "#4169E1");

      const pBot = proj(x, 0, -0.85, w, h);

      const pTop = drawNode3D(

        "Chan_" + (idx + 1), x, 0, zTop, isBaryon ? 10.5 : 7.5, col, "#fff",

        isBaryon ? "L₃ = C(6,3) = 20" : `L_${idx+1}=${L}`,

        `${names[idx]}: Multiplier L_p/L₁ = ${L}/6 = ${(L/6).toFixed(3)} (Total ∑ C(6,p) = 63)`, w, h

      );

      drawLine3D(pBot, pTop, col, isBaryon ? 6.5 : 4.0);

    });

  }



  // Stage 9: Proton-Neutron 3-Flux Splitting (\Delta m = +1.293 MeV) & Interval Newton-Krawczyk Box (Alg. D.4)

  function renderStage9(w, h) {

    // 3-Flux Baryonic Trefoil Ring (k = 3, L_3 = 20)

    ctx.beginPath();

    ctx.strokeStyle = "#20B2AA";

    ctx.lineWidth = 2.8;

    for (let i = 0; i <= 90; i++) {

      const t = (i / 90) * Math.PI * 2;

      const r = 0.85 + 0.28 * Math.cos(3 * t + timeSec * 2);

      const p = proj(r * Math.cos(t), r * Math.sin(t), 0.32 * Math.sin(3 * t + timeSec * 2), w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    const pProt = drawNode3D("Part_p", -0.85, 0, -0.25, 9.5, "#4169E1", "#FFD700", "Proton p⁺ (938.272 MeV)", "q_x = +1: Coulomb self-energy −κ₁ q_x² = −0.000543 on x₅ (Rel. Error −0.000008%)", w, h);

    const pNeut = drawNode3D("Part_n",  0.85, 0,  0.35, 9.5, "#FFA500", "#FFD700", "Neutron n⁰ (939.565 MeV)", "q_x = 0: Isospin bias +κ_n(1−|q_x|) = +0.001378 lifts m_n > m_p by +1.293 MeV!", w, h);

    const pKraw = drawNode3D("Kraw_Box", 0, 0, 0.95, 8.5, "#FFD700", "#DC143C", "Krawczyk 𝕂(X) ⊂ int(X)", "Alg. D.4 Brouwer Fixed-Point Mass Enclosure certifying unique eigenvalue λ ∈ [m_min, m_max]", w, h);

    drawLine3D(pProt, pNeut, "#FFD700", 2.6, [4, 2]);

  }



  // Stage 10: FCC Sphere-Packing \alpha_{met}^{-1} = 137.036036 (Thm. B.6) & GRB 090510 LIV Cutoff

  function renderStage10(w, h) {

    // 3D Face-Centered Cubic (FCC) Close-Packed Sphere Cluster (f_pack = \pi / (3\sqrt{2}) \approx 0.74048)

    const fcc = [

      [0, 0, 0], [0.75, 0.75, 0], [-0.75, 0.75, 0], [0.75, -0.75, 0], [-0.75, -0.75, 0],

      [0.75, 0, 0.75], [-0.75, 0, 0.75], [0, 0.75, -0.75], [0, -0.75, -0.75]

    ];

    fcc.forEach((c, idx) => {

      const isCent = (idx === 0);

      drawNode3D(

        "FCC_" + idx, c[0], c[1], c[2], isCent ? 11.5 : 8.5,

        isCent ? "#FFD700" : "#20B2AA", "#fff",

        isCent ? "α_met⁻¹ = 137.036036" : (idx === 1 ? "f_pack = 0.74048" : ""),

        isCent

          ? "Thm. B.6 FCC Rotor Packing: α_met⁻¹ = 137.000 · η_cell = 137.036036 (2.7×10⁻⁷ match)!"

          : "Scholium B.10 LIV Cutoff: E_QG = m₀c² = 1.855×10¹⁹ GeV = 1.52 M_Planck > 1.22 M_Planck (GRB 090510)", w, h

      );

    });

  }



  // Master 60fps Loop

  function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch11-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }

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



    function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);

    else if (stInt === 2) renderStage2(w, h);

    else if (stInt === 3) renderStage3(w, h);

    else if (stInt === 4) renderStage4(w, h);

    else if (stInt === 5 || stInt === 6) renderStage5And6(w, h, stArg);

    else if (stInt === 7) renderStage7(w, h);

    else if (stInt === 8) renderStage8(w, h);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh11Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch11-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch11-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch11-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch11-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch11-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh11Stage = function(val) { window.setCh11Stage(val, true); };



  window.enableCh11Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch11-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh11WithDeck();

  };



  window.toggleCh11Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch11-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh11Spotlight = function() {

    const hud = document.getElementById('ch11-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh11Minimize = function() {

    const hud = document.getElementById('ch11-3d-hud');

    const b = document.getElementById('ch11-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh11WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch11-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-11, section[data-chapter="11"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.setCh11Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh11WithDeck = syncCh11WithDeck;
  }



  // 3D Orbit Drag, Wheel Zoom & Node Click Hit-Testing

  wrap.addEventListener('mousedown', e => {

    e.stopPropagation();

    isDragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mousemove', e => {

    if (!isDragging) return;

    camYaw += (e.clientX - lastX) * 0.012;

    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mouseup', () => { isDragging = false; });

  wrap.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    camYaw += dx * 0.012;
    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
  }, { passive: true });

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

    const insp = document.getElementById('ch11-node-inspector');

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



  function init() {

    resize();

    syncCh11WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_11 = false;
    const synBindSync_syncCh11WithDeck = () => {
      if (syncRaf_11) return;
      syncRaf_11 = true;
      requestAnimationFrame(() => {
        syncRaf_11 = false;
        syncCh11WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh11WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh11WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh11WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh11WithDeck, { passive: true });

    const revEl_syncCh11WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh11WithDeck) {
      revEl_syncCh11WithDeck.addEventListener('scroll', synBindSync_syncCh11WithDeck, { passive: true });
      revEl_syncCh11WithDeck.addEventListener('touchmove', synBindSync_syncCh11WithDeck, { passive: true });
    }
    const vpEl_syncCh11WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh11WithDeck) {
      vpEl_syncCh11WithDeck.addEventListener('scroll', synBindSync_syncCh11WithDeck, { passive: true });
      vpEl_syncCh11WithDeck.addEventListener('touchmove', synBindSync_syncCh11WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh11WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh11WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh11WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh11WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh11WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh11WithDeck);
    }

    const hud = document.getElementById('ch11-3d-hud');

    if (hud) {

      hud.querySelectorAll('input, button').forEach(el => {

        el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());

      });

    }

  }



  init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh11Engine);
  } else {
    runCh11Engine();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 12 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
// ============================================================================
// CHAPTER 12: NEURO-SYNTROMETRY, AFFECTIVE TELECENTRICS & NON-REDUCTIVE PHYSICALISM
// Interactive Widgets + 12-Stage 3D WebGL-Style Morph Engine
// ============================================================================
(function () {
  "use strict";

  window.showGenericTab = function (prefix, idx, total, btnEl) {
    for (let i = 1; i <= total; i++) {
      const pane = document.getElementById(prefix + "-" + i);
      if (pane) pane.classList.toggle("active", i === idx);
    }
    if (btnEl && btnEl.parentElement) {
      const siblings = btnEl.parentElement.querySelectorAll(".syn-tab-btn");
      siblings.forEach((b) => b.classList.remove("active"));
      btnEl.classList.add("active");
    }
  };

  window.ch12_showXrefTab = function (idx, btnEl) {
    window.showGenericTab("ch12-xref-pane", idx, 3, btnEl);
  };

  // ==========================================================================
  // SLIDE 1: 4-TIER EPISTEMIC STRATIFICATION EXPLORER (DEF. 12.1)
  // ==========================================================================
  const TIER_DATA = {
    A: {
      badge: "Stratum A — Rigorously Proven",
      title: "Stratum A: Pure Mathematics & Formal Topos Proofs",
      border: "#20B2AA",
      desc: "Unconditionally proven mathematical theorems in differential geometry, category theory, coalgebra, and homological algebra.",
      examples: "Subobject classifier Ω_Phenom (Def. 12.2), Non-Triviality of Conscious Functor Ψ (Thm. 12.3), Mereological Adjunction ℒ_bind ⊣ ℛ_part (Thm. 12.4), Hodge Decomposition (Thm. 12.7), Lean 4 Kernel Proofs (App. C).",
      nodes: [1, 0.25, 0.25, 0.25]
    },
    B: {
      badge: "Stratum B — Conditional Bridge",
      title: "Stratum B: Conditional Mathematical Physics & Neuro-Modeling",
      border: "#4169E1",
      desc: "Exact mathematical theorems derived conditionally from explicit, stated neuro-computational or physical modeling hypotheses.",
      examples: "Non-Existence of Philosophical Zombies under Axiom 12.3 (Thm. 12.3(3)), Landauer Erasure Work Bound ΔQ ≥ N_erase k_B T ln 2 (Prop. 12.5), 4±1 Working Memory Capacity (Prop. 12.6), Affective Telecentric Flow (Thm. 12.8).",
      nodes: [0.55, 1, 0.3, 0.25]
    },
    C: {
      badge: "Stratum C — Phenomenological Ansatz",
      title: "Stratum C: Phenomenological Neuro-Biophysical Ansätze",
      border: "#FFA500",
      desc: "Falsifiable structural models mapping formal categorical invariants onto concrete neurobiological substrates and EEG/MEG signatures.",
      examples: "Thalamocortical ~40 Hz gamma phase-locking as cohomological gluing H^1(U,F)=0; Theta-gamma cross-frequency coupling (f_γ/f_θ ≈ 40/6); Noradrenergic/dopaminergic arousal modulation of g_AR.",
      nodes: [0.4, 0.65, 1, 0.3]
    },
    D: {
      badge: "Stratum D — Speculative Horizon",
      title: "Stratum D: Speculative Extrapolations & Open Conjectures",
      border: "#9370DB",
      desc: "Quarantined speculative hypotheses and philosophical horizons strictly barred from entering the premise set of Strata A–C.",
      examples: "Global trans-individual affinity fields, macro-scale telecentric attractors beyond biological neural networks, and open cosmological unification conjectures.",
      nodes: [0.25, 0.25, 0.35, 1]
    }
  };

  window.ch12_setTier = function (tier) {
    const d = TIER_DATA[tier] || TIER_DATA.A;
    ["a", "b", "c", "d"].forEach((k) => {
      const b = document.getElementById("ch12-tier-btn-" + k);
      if (b) {
        const active = k.toUpperCase() === tier;
        b.style.background = active ? d.border : "";
        b.style.color = active ? "#000" : "";
        b.style.fontWeight = active ? "bold" : "";
      }
    });
    const svg = document.getElementById("ch12-tier-svg");
    if (svg) {
      const labels = ["Stratum A: Math Proofs", "Stratum B: Bridge Models", "Stratum C: Neuro Ansatz", "Stratum D: Quarantined"];
      const cols = ["#20B2AA", "#4169E1", "#FFA500", "#9370DB"];
      const keys = ["A", "B", "C", "D"];
      let html = "";
      for (let i = 0; i < 4; i++) {
        const x = 14 + i * 102;
        const isSel = keys[i] === tier;
        const op = d.nodes[i];
        html += `<rect x="${x}" y="18" width="90" height="58" rx="7" fill="rgba(15,23,42,0.9)" stroke="${cols[i]}" stroke-width="${isSel ? 2.6 : 1.2}" opacity="${op}"/>`;
        html += `<text x="${x + 45}" y="42" fill="${cols[i]}" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle" opacity="${op}">STRATUM ${keys[i]}</text>`;
        html += `<text x="${x + 45}" y="60" fill="#cbd5e1" font-size="8.5" font-family="sans-serif" text-anchor="middle" opacity="${op}">${labels[i].split(": ")[1]}</text>`;
        if (i < 2) {
          html += `<line x1="${x + 90}" y1="47" x2="${x + 102}" y2="47" stroke="#64748b" stroke-width="1.5" marker-end="url(#arr)"/>`;
        } else if (i === 2) {
          html += `<line x1="${x + 96}" y1="12" x2="${x + 96}" y2="82" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,3"/>`;
          html += `<text x="${x + 96}" y="92" fill="#ef4444" font-size="7.5" font-family="monospace" text-anchor="middle">FIREWALL</text>`;
        }
      }
      svg.innerHTML = html;
    }
    const ro = document.getElementById("ch12-tier-readout");
    if (ro) {
      ro.style.borderLeftColor = d.border;
      ro.innerHTML = `<b style="color:${d.border};">${d.title}</b><br><span style="color:#cbd5e1;">${d.desc}</span><br><span style="color:#94a3b8;"><b>Chapter 12 Instances:</b> ${d.examples}</span>`;
    }
  };

  // ==========================================================================
  // SLIDE 2: GOODMAN IMPERFECT COMMUNITY & SHEAF DESCENT LAB (§12.1.4)
  // ==========================================================================
  window.ch12_setGoodmanMode = function (mode) {
    const m = typeof mode === "number" ? mode : (mode === "nominalist" ? 1 : 2);
    for (let i = 1; i <= 3; i++) {
      const b = document.getElementById("ch12-gm-btn-" + i);
      if (b) {
        const active = i === m;
        b.style.background = active ? "#FFD700" : "";
        b.style.color = active ? "#000" : "";
        b.style.fontWeight = active ? "bold" : "";
      }
    }
    const svg = document.getElementById("ch12-gm-svg");
    const ro = document.getElementById("ch12-gm-readout");
    if (svg) {
      if (m === 1) {
        svg.innerHTML = `
          <rect x="12" y="10" width="396" height="115" rx="8" fill="rgba(239,68,68,0.08)" stroke="#ff6b81" stroke-width="1.4" stroke-dasharray="4,3"/>
          <text x="210" y="28" fill="#ff6b81" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Goodman Imperfect Community: {e₁=(R,G), e₂=(G,B), e₃=(B,R)}</text>
          <circle cx="95" cy="75" r="28" fill="rgba(239,68,68,0.22)" stroke="#ff6b81" stroke-width="1.5"/><text x="95" y="78" fill="#fff" font-size="9.5" font-family="monospace" text-anchor="middle">e₁(R,G)</text>
          <circle cx="135" cy="75" r="28" fill="rgba(32,178,170,0.22)" stroke="#20B2AA" stroke-width="1.5"/><text x="135" y="78" fill="#fff" font-size="9.5" font-family="monospace" text-anchor="middle">e₂(G,B)</text>
          <circle cx="115" cy="52" r="28" fill="rgba(65,105,225,0.22)" stroke="#4169E1" stroke-width="1.5"/><text x="115" y="55" fill="#fff" font-size="9.5" font-family="monospace" text-anchor="middle">e₃(B,R)</text>
          <text x="290" y="56" fill="#ff6b81" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">e₁ ×_U e₂ ×_U e₃ ≅ 0_Ctx</text>
          <text x="290" y="76" fill="#FFD700" font-size="9.5" font-family="monospace" text-anchor="middle">Def_U(s)₁₂₃ ≠ 0 ⇒ Hol(U,P) = ∅</text>
          <text x="290" y="96" fill="#94a3b8" font-size="8.5" font-family="sans-serif" text-anchor="middle">Carnap clique accepted; Topos sheaf rejects</text>
        `;
      } else if (m === 2) {
        svg.innerHTML = `
          <rect x="12" y="10" width="396" height="115" rx="8" fill="rgba(32,178,170,0.08)" stroke="#20B2AA" stroke-width="1.5"/>
          <text x="210" y="28" fill="#20B2AA" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">True Holoform Community: {e₁=(R,G), e₂=(R,B), e₃=(R,Y)}</text>
          <circle cx="100" cy="72" r="28" fill="rgba(32,178,170,0.2)" stroke="#20B2AA" stroke-width="1.5"/>
          <circle cx="122" cy="72" r="28" fill="rgba(32,178,170,0.2)" stroke="#20B2AA" stroke-width="1.5"/>
          <circle cx="111" cy="56" r="28" fill="rgba(32,178,170,0.2)" stroke="#20B2AA" stroke-width="1.5"/>
          <circle cx="111" cy="67" r="9" fill="#FFD700"/><text x="111" y="70" fill="#000" font-size="8.5" font-weight="bold" text-anchor="middle">R</text>
          <text x="290" y="56" fill="#20B2AA" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">e₁ ×_U e₂ ×_U e₃ = {R} ≠ 0_Ctx</text>
          <text x="290" y="76" fill="#FFD700" font-size="9.5" font-family="monospace" text-anchor="middle">Def_U(s) = 0 ⇒ Hol(U,P) ≅ P(U)</text>
          <text x="290" y="96" fill="#cbd5e1" font-size="8.5" font-family="sans-serif" text-anchor="middle">Unique global section s ∈ Γ(U, P) glued</text>
        `;
      } else {
        svg.innerHTML = `
          <rect x="12" y="10" width="396" height="115" rx="8" fill="rgba(65,105,225,0.08)" stroke="#4169E1" stroke-width="1.5"/>
          <text x="210" y="28" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Companionship Difficulty Resolution via Fiber Pullbacks</text>
          <rect x="34" y="45" width="145" height="62" rx="6" fill="#0f172a" stroke="#38bdf8"/>
          <text x="106" y="68" fill="#38bdf8" font-size="9.5" font-family="monospace" text-anchor="middle">Subobject P_color ↪ y(U)</text>
          <text x="106" y="86" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="middle">Fiber π_color⁻¹(R)</text>
          <text x="205" y="78" fill="#FFD700" font-size="13" font-family="monospace" text-anchor="middle">≇</text>
          <rect x="232" y="45" width="150" height="62" rx="6" fill="#0f172a" stroke="#FFA500"/>
          <text x="307" y="68" fill="#FFA500" font-size="9.5" font-family="monospace" text-anchor="middle">Subobject P_pitch ↪ y(U)</text>
          <text x="307" y="86" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="middle">Fiber π_pitch⁻¹(C♯)</text>
        `;
      }
    }
    if (ro) {
      if (m === 1) {
        ro.innerHTML = `<span style="color:#ff6b81; font-weight:bold;">[IMPERFECT COMMUNITY — REJECTED BY TOPOS]</span> Pairwise overlaps are non-empty ($e_1 \\cap e_2 = \\{G\\}, e_2 \\cap e_3 = \\{B\\}, e_3 \\cap e_1 = \\{R\\}$), tricking Carnap's 2-clique into hallucinating a phantom quality. In $\\mathcal{E}_{\\mathrm{syn}}$, the triple pullback $e_1 \\times_U e_2 \\times_U e_3 \\cong \\mathbf{0}_{\\mathrm{Ctx}}$ forces $\\operatorname{Def}_{\\mathcal{U}}(s)_{123} \\ne 0$, so $\\operatorname{Hol}(\\mathcal{U},\\mathbf{P}) = \\emptyset$.`;
      } else if (m === 2) {
        ro.innerHTML = `<span style="color:#20B2AA; font-weight:bold;">[TRUE HOLOFORM — GLUED BY SHEAF EQUALIZER]</span> All three experiences share the universal quality $R$ on the triple fiber product $e_1 \\times_U e_2 \\times_U e_3 \\ne \\mathbf{0}_{\\mathrm{Ctx}}$. The Čech coboundary vanishes ($\\operatorname{Def}_{\\mathcal{U}}(s) = 0$), yielding a genuine conscious quale $s \\in \\operatorname{Hol}(\\mathcal{U},\\mathbf{P})$.`;
      } else {
        ro.innerHTML = `<span style="color:#38bdf8; font-weight:bold;">[COMPANIONSHIP SEPARATION]</span> Even if two qualities $q_1, q_2$ co-occur extensionally in every observed experience, their typed operadic projections $\\pi_1, \\pi_2$ in $\\operatorname{Sub}_{\\mathcal{E}_{\\mathrm{syn}}}(\\mathbf{y}(U))$ remain distinct subobjects.`;
      }
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 3: CHALMERSIAN ZOMBIE REFUTATION LAB (THM. 12.3)
  // ==========================================================================
  window.ch12_setZombiePreset = function (comm, aint) {
    const cEl = document.getElementById("ch12-zm-comm");
    const aEl = document.getElementById("ch12-zm-aint");
    if (cEl) cEl.value = String(comm);
    if (aEl) aEl.value = String(aint);
    window.ch12_updateZombieLab();
  };

  window.ch12_updateZombieLab = function () {
    const cEl = document.getElementById("ch12-zm-comm") || document.getElementById("ch12-zm-phi");
    const aEl = document.getElementById("ch12-zm-aint") || document.getElementById("ch12-zm-def");
    if (!cEl || !aEl) return;
    const comm = parseFloat(cEl.value);
    const aint = parseFloat(aEl.value);

    const cVal = document.getElementById("ch12-zm-comm-val") || document.getElementById("ch12-zm-phi-val");
    const aVal = document.getElementById("ch12-zm-aint-val") || document.getElementById("ch12-zm-def-val");
    if (cVal) cVal.textContent = comm.toFixed(2);
    if (aVal) aVal.textContent = aint.toFixed(2);

    const omegaNorm = Math.sqrt(comm * comm + aint * aint + 0.5 * comm * aint);
    const gE = 0.5 * omegaNorm * omegaNorm;
    const isZombieAttempt = gE < 0.005;

    const ro = document.getElementById("ch12-zm-readout");
    if (ro) {
      if (isZombieAttempt) {
        ro.innerHTML = `<span style="color:#ff6b81; font-weight:bold;">[ZOMBIE ATTEMPT (Ω_int ≡ 0) ⇒ TOTAL INFERENTIAL COLLAPSE]</span> Setting $\\|[a_1,a_2]\\| = 0$ and $\\|a_{\\mathrm{int}}\\| = 0$ forces $g_E = 0$ (P-Conscious = False). By Theorem 12.3, the carrier pushout collapses to the uncoupled $\\ell^1$-coproduct $P_1 \\oplus_1 P_2$, forcing overlap defect $\\operatorname{Def}_{\\mathcal{U}}(s)_{12} \\ne 0 \\implies \\operatorname{Hol}(\\mathcal{U},\\mathbf{P}) = \\emptyset \\implies \\operatorname{ev}(T_{\\mathsf{P}}) = \\{0\\}$ (<b>A-Conscious = False!</b>) — <b>Zombie Contradiction $\\llbracket \\mathsf{Zombie}(\\mathcal{N}) \\rrbracket = \\bot_\\Omega$</b>.`;
      } else {
        ro.innerHTML = `<span style="color:#20B2AA; font-weight:bold;">[CONSCIOUS MULTI-MODAL BINDING: g_E = ${gE.toFixed(3)} &gt; 0]</span> Non-Abelian curvature $\\|\\Omega_{\\mathrm{int}}^{\\mathcal{D}}\\| = ${omegaNorm.toFixed(2)} > 0$ glues the carrier pushout $P_1 \\boxplus_\\phi P_2$ with $\\operatorname{Def}_{\\mathcal{U}}(s) = 0$, enabling global section $s \\in \\operatorname{Hol}(\\mathcal{U},\\mathbf{P})$ and non-zero Access evaluation $\\operatorname{ev}(T_{\\mathsf{P}}) \\ne \\{0\\}$.`;
      }
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 4: HEYTING MEREOLOGY & t-NORM COORDINATION LAB (THM. 12.4, DEF. 12.5)
  // ==========================================================================
  window.ch12_updateMereologyLab = function () {
    const adEl = document.getElementById("ch12-mer-ad");
    const bpEl = document.getElementById("ch12-mer-bp");
    const thEl = document.getElementById("ch12-mer-th");
    const tnEl = document.getElementById("ch12-mer-tnorm");
    if (!adEl || !bpEl || !thEl) return;

    const a = parseFloat(adEl.value);
    const b = parseFloat(bpEl.value);
    const th = parseFloat(thEl.value);
    const mode = tnEl ? tnEl.value : "prod";

    const adVal = document.getElementById("ch12-mer-ad-val");
    const bpVal = document.getElementById("ch12-mer-bp-val");
    const thVal = document.getElementById("ch12-mer-th-val");
    if (adVal) adVal.textContent = a.toFixed(2);
    if (bpVal) bpVal.textContent = b.toFixed(2);
    if (thVal) thVal.textContent = th.toFixed(2);

    let chi = a * b;
    let normName = "Product (a · b)";
    if (mode === "luk") {
      chi = Math.max(0, a + b - 1);
      normName = "Łukasiewicz max(0, a+b-1)";
    } else if (mode === "godel") {
      chi = Math.min(a, b);
      normName = "Gödel min(a, b)";
    }
    const coordinated = chi > th;
    const ro = document.getElementById("ch12-mer-readout");
    if (ro) {
      ro.innerHTML =
        `Archimedean $t$-Norm (${normName}): $\\operatorname{Strength}((d_r,f_q),U) = \\chi(${a.toFixed(2)}, ${b.toFixed(2)}) = <b style="color:#FFD700;">${chi.toFixed(3)}</b>$ vs $\\theta_{\\mathrm{coord}} = <b>${th.toFixed(2)}</b>$<br>` +
        (coordinated
          ? `<span style="color:#20B2AA; font-weight:bold;">[ACTIVELY COORDINATED IN 𝔐_asp(U)]</span> Pair exceeds $\\theta_{\\mathrm{coord}}$, forming a unified Heyting parthood subobject satisfying constructive CEM axioms <b>MSL-M1</b> &amp; <b>MSL-M2</b>.`
          : `<span style="color:#ff6b81; font-weight:bold;">[UNCOORDINATED SUB-THRESHOLD PAIR]</span> $\\chi(a_D, b_P) \\le \\theta_{\\mathrm{coord}}$ — triggers dialectical sublation ($\\operatorname{Aufhebung}$, Thm. 12.4) to synthesize higher-level generator $C \\in \\operatorname{Prop}_{k+1}$.`);
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 5: LANDAUER METABOLIC ERASURE LAB (THM. 12.6, FIG. 12.9)
  // ==========================================================================
  window.ch12_updateErasureLab = function () {
    const dEl = document.getElementById("ch12-er-d");
    const rEl = document.getElementById("ch12-er-r");
    if (!dEl || !rEl) return;
    const D = parseInt(dEl.value, 10);
    const r = parseInt(rEl.value, 10);

    const dVal = document.getElementById("ch12-er-d-val");
    const rVal = document.getElementById("ch12-er-r-val");
    if (dVal) dVal.textContent = D + " bits/s";
    if (rVal) rVal.textContent = r + " bits/s";

    const nErase = Math.max(0, D - r);
    const kBTln2 = 2.977e-21;
    const powerMin = nErase * kBTln2;

    const barsSvg = document.getElementById("ch12-er-bars");
    if (barsSvg) {
      const wD = Math.min(320, Math.round((D / 10000) * 320));
      const wR = Math.min(320, Math.round((r / 10000) * 320));
      const wE = Math.max(0, wD - wR);
      barsSvg.innerHTML = `
        <text x="10" y="18" fill="#94a3b8" font-size="9.5" font-family="monospace">Sensory Inflow H(X) (${D})</text>
        <rect x="175" y="8" width="${Math.max(4, wD * 0.78)}" height="12" rx="3" fill="#38bdf8"/>
        <text x="10" y="38" fill="#20B2AA" font-size="9.5" font-family="monospace">Macro Quota H(Y) (${r})</text>
        <rect x="175" y="28" width="${Math.max(3, wR * 0.78)}" height="12" rx="3" fill="#20B2AA"/>
        <text x="10" y="56" fill="#ff6b81" font-size="9.5" font-family="monospace">Erased H(X|Y) (${nErase})</text>
        <rect x="175" y="46" width="${Math.max(4, wE * 0.78)}" height="12" rx="3" fill="#ff6b81"/>
      `;
    }

    const ro = document.getElementById("ch12-er-readout");
    if (ro) {
      ro.innerHTML = `Erased Fibre Entropy $H(X_n|Y_{n+1}) = <b>${nErase} bits/s</b>$ &nbsp;|&nbsp; Landauer Floor ($T=310\\text{ K}$): $\\mathcal{P}_{\\mathrm{diss}} \\ge <b style="color:#FFD700;">${powerMin.toExponential(2)} W</b>$<br>Biophysical Synaptic Coupling ($\\sim 20\\text{ W}$ cortical budget): Prevents combinatorial catastrophe by erasing micro-trajectories into a 0D macro-symbol.`;
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 6: PROTOSIMPLEX DIMENSION-COLLAPSE LAB (DEF. 12.7, THM. 12.8)
  // ==========================================================================
  window.ch12_updateWorkingMemoryLab = function () {
    const kEl = document.getElementById("ch12-wm-k");
    const subEl = document.getElementById("ch12-proto-sub");
    if (!kEl) return;

    const gamma = parseInt(kEl.value, 10);
    const mode = subEl ? subEl.value : "minimal";
    const kVal = document.getElementById("ch12-wm-k-val");
    if (kVal) kVal.textContent = "γ=" + gamma;

    const isMinimal = mode === "minimal";
    const ro = document.getElementById("ch12-wm-readout");
    if (ro) {
      ro.innerHTML = isMinimal
        ? `<span style="color:#20B2AA; font-weight:bold;">[PROTOSIMPLEX ENCAPSULATION ACTIVE: 𝒫 ∈ (N_{n+1}(M^{n+1}))₀]</span> Lyapunov contraction $\\dot{V} \\le -${gamma}V$ stabilizes the $10^4$-neuron attractor basin $\\mathcal{B}(T_z)$. Because $\\mathcal{P}$ has no proper augmented sub-algebras in $\\operatorname{Alg}_{\\mathcal{O}_n}^0$, internal trajectories collapse to degenerate 1-simplices $s_0(\\mathcal{P}) \\in X_1$, presenting a <b>0D Atomic Point Token</b> to $\\operatorname{Met}_{n+1}(\\mathcal{X}_{\\mathrm{syn}})$.`
        : `<span style="color:#ff6b81; font-weight:bold;">[REDUCIBLE CIRCUIT: A ↪ 𝒫 NON-TRIVIAL]</span> Proper sub-algebra $A \\hookrightarrow \\mathcal{P}$ prevents subobject minimality (Def. 12.7 fails). Internal 1-simplices remain non-degenerate in $X_1$, exposing unresolved micro-degrees of freedom to level $n+1$.`;
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 7: NON-ABELIAN VORTEX & HODGE ENERGY BIPARTITION LAB (THMS. 12.9–12.10)
  // ==========================================================================
  window.ch12_updateHodgeLab = function () {
    const dynEl = document.getElementById("ch12-hdg-dyn") || document.getElementById("ch12-hdg-ex");
    const harmEl = document.getElementById("ch12-hdg-harm") || document.getElementById("ch12-hdg-ha");
    if (!dynEl || !harmEl) return;

    const dyn = parseFloat(dynEl.value);
    const harm = parseFloat(harmEl.value);

    const dynVal = document.getElementById("ch12-hdg-dyn-val") || document.getElementById("ch12-hdg-ex-val");
    const harmVal = document.getElementById("ch12-hdg-harm-val") || document.getElementById("ch12-hdg-ha-val");
    if (dynVal) dynVal.textContent = dyn.toFixed(2);
    if (harmVal) harmVal.textContent = harm.toFixed(2);

    const eDyn = 0.5 * dyn * dyn;
    const eHarm = 0.5 * harm * harm;
    const gE = eDyn + eHarm;

    const svg = document.getElementById("ch12-hdg-svg");
    if (svg) {
      const scale = 210 / Math.max(2.0, gE);
      const wDyn = Math.max(6, Math.min(220, eDyn * scale));
      const wHarm = Math.max(6, Math.min(220, eHarm * scale));
      svg.innerHTML = `
        <text x="12" y="34" fill="#20B2AA" font-size="10" font-family="monospace" font-weight="bold">Dynamic ½‖Δ_A₀ Φ_int‖²</text>
        <rect x="175" y="22" width="${wDyn}" height="16" rx="4" fill="#20B2AA"/>
        <text x="${182 + wDyn}" y="34" fill="#e2e8f0" font-size="9.5" font-family="monospace">${eDyn.toFixed(2)}</text>
        <text x="12" y="68" fill="#FFA500" font-size="10" font-family="monospace" font-weight="bold">Harmonic ½‖γ_harm‖²</text>
        <rect x="175" y="56" width="${wHarm}" height="16" rx="4" fill="#FFA500"/>
        <text x="${182 + wHarm}" y="68" fill="#e2e8f0" font-size="9.5" font-family="monospace">${eHarm.toFixed(2)}</text>
        <text x="210" y="102" fill="#FFD700" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Total Quale Intensity g_E = ½‖Ω_int‖² = ${gE.toFixed(2)} (L²-Orthogonal)</text>
      `;
    }

    const ro = document.getElementById("ch12-hdg-readout");
    if (ro) {
      ro.innerHTML =
        `<b>Hodge Bipartition (Thm. 12.10):</b> $g_E = \\frac{1}{2}\\|\\Delta_{A_0}\\Phi_{\\mathrm{int}}\\|_{L^2}^2 (${eDyn.toFixed(2)}) + \\frac{1}{2}\\|\\gamma_{\\mathrm{harm}}\\|_{L^2}^2 (${eHarm.toFixed(2)}) = <b style="color:#FFD700;">${gE.toFixed(2)}</b>$<br>` +
        `<span style="color:#20B2AA;">Dynamic Flow $\\Delta_{A_0}\\Phi_{\\mathrm{int}} \\in \\operatorname{im}(\\Delta_{A_0})$:</span> Transient attention shift &amp; sensory update &nbsp;|&nbsp; <span style="color:#FFA500;">Topological Core $\\gamma_{\\mathrm{harm}} \\in \\ker(\\Delta_{A_0}) \\cong H^2_{\\mathrm{dR}}$:</span> Invariant background self-presence.`;
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 8: 6D AFFECTIVE CIRCUMPLEX (R_4 × S_2) LAB (THM. 12.11)
  // ==========================================================================
  window.ch12_setAffectivePreset = function (val, aro) {
    const vEl = document.getElementById("ch12-aff-val");
    const aEl = document.getElementById("ch12-aff-aro");
    if (vEl) vEl.value = String(val);
    if (aEl) aEl.value = String(aro);
    window.ch12_updateAffectiveLab();
  };

  window.ch12_updateAffectiveLab = function () {
    const vEl = document.getElementById("ch12-aff-val") || document.getElementById("ch12-aff-v");
    const aEl = document.getElementById("ch12-aff-aro") || document.getElementById("ch12-aff-g");
    if (!vEl || !aEl) return;

    const val = parseFloat(vEl.value);
    const aro = parseFloat(aEl.value);

    const vLbl = document.getElementById("ch12-aff-val-lbl") || document.getElementById("ch12-aff-v-val");
    const aLbl = document.getElementById("ch12-aff-aro-lbl") || document.getElementById("ch12-aff-g-val");
    if (vLbl) vLbl.textContent = (val >= 0 ? "+" : "") + val.toFixed(2);
    if (aLbl) aLbl.textContent = aro.toFixed(0) + "Hz";

    const dtMs = (1000 / Math.max(1, aro)).toFixed(1);
    let quadrant = "High-Arousal Distress / Acute Alertness";
    let qCol = "#ff6b81";
    if (val >= 0 && aro >= 25) {
      quadrant = "High-Arousal Positive Flow / Elation";
      qCol = "#FFD700";
    } else if (val >= 0 && aro < 25) {
      quadrant = "Low-Arousal Serene Homeostasis";
      qCol = "#20B2AA";
    } else if (val < 0 && aro < 25) {
      quadrant = "Low-Arousal Depletion / Melancholy";
      qCol = "#9370DB";
    }

    const ro = document.getElementById("ch12-aff-readout");
    if (ro) {
      ro.innerHTML =
        `<b style="color:${qCol};">[${quadrant}]</b> &nbsp;|&nbsp; $R_6 = R_4 \\times S_2$ ($Z_\\omega(6) = Z_k(6) = 81$, <b>21 symmetric + 15 skew</b>)<br>` +
        `Entelechial Valence $x_5$: $-\\mathcal{L}_{X_5}\\mathcal{S}_{\\mathrm{therm}} = <b>${(val >= 0 ? "+" : "") + val.toFixed(2)}</b>$ &nbsp;|&nbsp; Aeonic Arousal $x_6$: $\\|\\partial_6\\| = 1/\\delta t_n = <b>${aro} Hz</b>$ ($\\delta t_n \\approx ${dtMs}\\text{ ms}$).`;
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 9: PREDATOR-IN-WOODS END-TO-END WORKED EXAMPLE (EX. 12.1)
  // ==========================================================================
  const PREDATOR_STEPS = {
    1: {
      title: "Step I — Retinal Input & 99.8% Landauer Filtering (Prop. 12.5)",
      body: "Raw optic-nerve inflow $D = 20{,}000\\text{ bits/s}$ is projected onto a $r = 40\\text{ bits/s}$ conscious workspace quota. The nullspace kernel $N_{\\mathrm{erase}} = 19{,}960\\text{ bits/s}$ (leaf clutter) is erased at minimal Landauer heat cost $\\Delta Q_{\\min} \\approx 5.94 \\times 10^{-17}\\text{ W}$."
    },
    2: {
      title: "Step II — 3-Patch Feature Extraction & Working Memory Load (Prop. 12.6)",
      body: "Surviving features occupy $k = 3 \\le 4$ working-memory slots: $U_1$ (orange-black stripes), $U_2$ (parallax contour motion), $U_3$ (branch snap acoustics). Cross-curvature load $\\binom{3}{2}\\sigma_0^2 = 3\\sigma_0^2 \\le C_{\\max}/\\lambda_1$ stays safely below the $4 \\pm 1$ crowding threshold."
    },
    3: {
      title: "Step III — Hodge Phase-Locking & Cohomological Gluing (Thms. 12.4 & 12.7)",
      body: "Before synchronization, $\\delta(\\sigma_i)_{12} = (0.4, -0.3)^T \\ne 0 \\implies H^0(U, \\mathcal{F}) = \\emptyset$. Thalamocortical $\\sim 40\\text{ Hz}$ gamma synchrony drives harmonic obstruction $\\gamma \\to 0$ and $\\delta(\\sigma_i) \\to 0$, gluing $\\sigma_{\\mathrm{global}} \\in H^0(U, \\mathcal{F})$ with synergy surplus $\\Delta\\mathcal{I}_{\\mathrm{syn}} = +12.4\\text{ bits}$."
    },
    4: {
      title: "Step IV — Affective Telecentric Flow & Evasive Action (Thm. 12.8)",
      body: "The bound predator Gestalt triggers a threat potential spike $\\Delta V = +8.5$ above $T_z$. Noradrenergic arousal scales $g_{\\mathrm{AR}}^{-1}$ by $4\\times$, accelerating evasive trajectory $\\dot{x} = -g_{\\mathrm{AR}}^{-1}dV + \\mathcal{A}(x)$ at rate $dV/dt = -\\|\\nabla_{g_{\\mathrm{AR}}}V\\|^2 < 0$."
    }
  };

  window.ch12_setPredatorStep = function (step) {
    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById("ch12-pred-btn-" + i);
      if (btn) {
        const active = i === step;
        btn.style.background = active ? "#20B2AA" : "";
        btn.style.color = active ? "#000" : "";
        btn.style.fontWeight = active ? "bold" : "";
      }
    }
    const d = PREDATOR_STEPS[step] || PREDATOR_STEPS[1];
    const ro = document.getElementById("ch12-pred-readout");
    if (ro) {
      ro.innerHTML = `<b style="color:#FFD700;">${d.title}</b><br><span style="color:#e2e8f0;">${d.body}</span>`;
    }
    if (window.MathJax && window.MathJax.typesetPromise && ro) {
      window.MathJax.typesetPromise([ro]).catch(() => {});
    }
  };

  // ==========================================================================
  // SLIDE 10: LIVE 16×16 OPERADIC NEURAL TOPOS RETINA SANDBOX
  // ==========================================================================
  let toposInstance = null;
  let retinaHoverIdx = -1;
  let retinaPainting = false;

  function ensureToposInstance() {
    if (!toposInstance && window.OperadicNeuralTopos) {
      toposInstance = new window.OperadicNeuralTopos();
      toposInstance.loadPreset("horizontal");
    }
    return toposInstance;
  }

  function renderRetinaCanvas() {
    const canvas = document.getElementById("ch12-retina-canvas");
    if (!canvas) return;
    const engine = ensureToposInstance();
    if (!engine) return;

    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const cellW = W / 16;
    const cellH = H / 16;

    ctx.fillStyle = "#050811";
    ctx.fillRect(0, 0, W, H);

    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        const idx = r * 16 + c;
        const v = engine.retina[idx];
        const x = c * cellW;
        const y = r * cellH;
        if (v > 0.02) {
          const alpha = Math.min(1, v);
          ctx.fillStyle = `rgba(56, 189, 248, ${0.2 + 0.75 * alpha})`;
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
        } else {
          ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
        }
        if (idx === retinaHoverIdx) {
          ctx.strokeStyle = "#FFD700";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(x + 1, y + 1, cellW - 2, cellH - 2);
        }
      }
    }

    // Overlay winners in each 4x4 patch
    if (engine.layer1 && engine.layer1.patches) {
      const oriChars = ["—", "|", "╱", "╲"];
      ctx.font = "bold 11px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      engine.layer1.patches.forEach((p) => {
        if (p.maxResponse > 0.28 && p.winnerOrientation >= 0) {
          const cx = (p.col0 + 2) * cellW;
          const cy = (p.row0 + 2) * cellH;
          ctx.strokeStyle = "rgba(32, 178, 170, 0.7)";
          ctx.lineWidth = 1.2;
          ctx.strokeRect(p.col0 * cellW + 1, p.row0 * cellH + 1, 4 * cellW - 2, 4 * cellH - 2);
          ctx.fillStyle = "#FFD700";
          ctx.fillText(oriChars[p.winnerOrientation], cx, cy);
        }
      });
    }

    const ro = document.getElementById("ch12-retina-readout");
    if (ro && engine.layer1 && engine.layer2 && engine.layer3) {
      const g = engine.layer2;
      const c3 = engine.layer3;
      const cohBadge = g.isCohomologicallyConsistent
        ? `<span style="color:#20B2AA; font-weight:bold;">H¹(U, ℱ) = 0 (Glued Global Section)</span>`
        : `<span style="color:#ff6b81; font-weight:bold;">H¹(U, ℱ) ≠ 0 (Obstruction δ = ${g.obstructionEnergy.toFixed(2)})</span>`;
      ro.innerHTML =
        `<b>Layer 1 (V1 Stalks):</b><br>` +
        `Active $4\\times 4$ Patches: <b style="color:#38bdf8;">${g.activePatchCount} / 9</b><br>` +
        `<b>Layer 2 (Čech Nerve &amp; Hodge):</b><br>` +
        `${cohBadge}<br>` +
        `Harmonic Frustration $\\|\\gamma\\|$: <b>${g.obstructionEnergy.toFixed(3)}</b><br>` +
        `<b>Layer 3 (Telecentric Classifier):</b><br>` +
        `Winning Gestalt: <b style="color:#FFD700;">${c3.winningConcept}</b> (${(c3.confidence * 100).toFixed(1)}%)<br>` +
        `Free Energy $V(x)$: <b style="color:#20B2AA;">${c3.freeEnergy.toFixed(3)}</b>`;
    }
  }

  function initRetinaCanvasEvents() {
    const canvas = document.getElementById("ch12-retina-canvas");
    if (!canvas || canvas.dataset.bound === "1") return;
    canvas.dataset.bound = "1";

    function paintAtEvent(e) {
      const engine = ensureToposInstance();
      if (!engine) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      const c = Math.floor((x / canvas.width) * 16);
      const r = Math.floor((y / canvas.height) * 16);
      if (r >= 0 && r < 16 && c >= 0 && c < 16) {
        retinaHoverIdx = r * 16 + c;
        if (retinaPainting) {
          engine.setPixel(r, c, 1.0);
        }
        renderRetinaCanvas();
      }
    }

    canvas.addEventListener("mousedown", (e) => {
      retinaPainting = true;
      paintAtEvent(e);
    });
    window.addEventListener("mouseup", () => {
      retinaPainting = false;
    });
    canvas.addEventListener("mousemove", paintAtEvent);
    canvas.addEventListener("mouseleave", () => {
      retinaHoverIdx = -1;
      renderRetinaCanvas();
    });
  }

  window.ch12_setRetinaPreset = function (presetName) {
    const engine = ensureToposInstance();
    if (!engine) return;
    engine.loadPreset(presetName);
    renderRetinaCanvas();
  };

  window.ch12_clearRetina = function () {
    const engine = ensureToposInstance();
    if (!engine) return;
    engine.clearRetina();
    renderRetinaCanvas();
  };

  // ==========================================================================
  // 10-STAGE 3D NEURO-TOPOS, PROTOSIMPLEX & AFFECTIVE TELECENTRICS ENGINE
  // ==========================================================================
  const CH12_3D_STYLE = `
  #ch12-3d-hud {
    position: fixed;
    right: 18px;
    bottom: 18px;
    width: 390px;
    background: rgba(11, 15, 25, 0.96);
    border: 1.5px solid #20B2AA;
    border-radius: 12px;
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.85), 0 0 22px rgba(32, 178, 170, 0.22);
    z-index: 9999;
    font-family: "Inter", system-ui, sans-serif;
    color: #e8ecf2;
    transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    overflow: hidden;
    user-select: none;
  }
  #ch12-3d-hud.spotlight {
    width: min(800px, 84vw);
    right: 8vw;
    bottom: 7vh;
    border-color: #FFD700;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 215, 0, 0.35);
  }
  #ch12-3d-hud.minimized .ch12-hud-body {
    display: none;
  }
  .ch12-hud-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 11px;
    background: linear-gradient(90deg, rgba(32, 178, 170, 0.28), rgba(65, 105, 225, 0.25));
    border-bottom: 1px solid rgba(32, 178, 170, 0.45);
    font-size: 11px;
    font-weight: 700;
  }
  .ch12-hud-title {
    color: #FFD700;
    letter-spacing: 0.4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ch12-hud-controls {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .ch12-hud-btn {
    background: #161f33;
    color: #cbd5e1;
    border: 1px solid #334155;
    border-radius: 5px;
    padding: 2px 7px;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .ch12-hud-btn:hover, .ch12-hud-btn.active {
    background: #20B2AA;
    color: #000;
    border-color: #FFD700;
  }
  #ch12-canvas-wrap {
    position: relative;
    width: 100%;
    height: 245px;
    background: radial-gradient(circle at 50% 45%, #131c31 0%, #070a12 100%);
    cursor: grab;
  }
  #ch12-3d-hud.spotlight #ch12-canvas-wrap {
    height: 440px;
  }
  #ch12-canvas-wrap:active {
    cursor: grabbing;
  }
  #ch12-3d-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  .ch12-overlay-top {
    position: absolute;
    top: 7px;
    left: 9px;
    right: 9px;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    font-size: 10px;
  }
  .ch12-badge {
    background: rgba(8, 12, 22, 0.88);
    border: 1px solid #4169E1;
    border-radius: 5px;
    padding: 2px 7px;
    color: #93c5fd;
    font-weight: 600;
  }
  #ch12-telemetry {
    position: absolute;
    bottom: 6px;
    left: 9px;
    right: 9px;
    background: rgba(7, 10, 18, 0.90);
    border: 1px solid rgba(255, 215, 0, 0.45);
    border-radius: 5px;
    padding: 3px 8px;
    font-family: monospace;
    font-size: 10px;
    color: #FFD700;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ch12-scrubber {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px 10px;
    background: #0d1322;
    border-top: 1px solid #1e293b;
    font-size: 10.5px;
  }
  .ch12-scrubber input[type="range"] {
    flex: 1;
    accent-color: #FFD700;
    cursor: pointer;
    height: 5px;
  }
  #ch12-caption {
    padding: 5px 10px 7px 10px;
    background: #090d18;
    border-top: 1px solid #1e293b;
    font-size: 10.5px;
    color: #cbd5e1;
    line-height: 1.35;
  }
  `;

  const CH12_3D_HTML = `
  <div class="ch12-hud-header">
    <div class="ch12-hud-title">🧠 Ch. 12: 3D Neuro-Topos &amp; Protosimplex Engine</div>
    <div class="ch12-hud-controls">
      <button class="ch12-hud-btn active" id="ch12-btn-orbit" onclick="toggleCh12Orbit()">⟳ Orbit</button>
      <button class="ch12-hud-btn" id="ch12-btn-spot" onclick="toggleCh12Spotlight()">⛶ Spotlight</button>
      <button class="ch12-hud-btn" id="ch12-btn-min" onclick="toggleCh12Minimize()">+</button>
    </div>
  </div>
  <div class="ch12-hud-body">
    <div id="ch12-canvas-wrap">
      <canvas id="ch12-3d-canvas"></canvas>
      <div class="ch12-overlay-top">
        <span class="ch12-badge" id="ch12-stage-pill">Stage 1.0 / 10</span>
        <span class="ch12-badge" id="ch12-node-inspector" style="border-color:#20B2AA; color:#5eead4;">Drag to Orbit 3D · Click Node to Inspect</span>
      </div>
      <div id="ch12-telemetry">Strata A–C ⊥ Stratum D | Ω_Phenom(U) Sieves</div>
    </div>
    <div class="ch12-scrubber">
      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>
      <button class="ch12-hud-btn" title="Previous Stage" onclick="window.setCh12Stage(Math.round(parseFloat(document.getElementById('ch12-slider').value)) - 1, true)">◀</button>
      <input type="range" id="ch12-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh12Stage(this.value)">
      <button class="ch12-hud-btn" title="Next Stage" onclick="window.setCh12Stage(Math.round(parseFloat(document.getElementById('ch12-slider').value)) + 1, true)">▶</button>
      <button class="ch12-hud-btn active" id="ch12-btn-sync" onclick="enableCh12Sync()">Auto-Sync</button>
    </div>
    <div id="ch12-caption">
      <b>Stage 1 (§12.1 — Def. 12.1 Epistemic Stratification):</b> 4-Tier Firewall separating proven mathematics (Strata A–C) from speculative horizons (Stratum D).
    </div>
  </div>`;

  function injectCh123DHUD() {
    if (document.getElementById('ch12-3d-hud')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'ch12-3d-injected-style';
    styleEl.textContent = CH12_3D_STYLE;
    document.head.appendChild(styleEl);

    const hudEl = document.createElement('div');
    hudEl.id = 'ch12-3d-hud';
    hudEl.className = 'minimized';
    hudEl.innerHTML = CH12_3D_HTML;
    document.body.appendChild(hudEl);
  }

  function runCh12Engine() {
    injectCh123DHUD();
    if (window.__ch12_3d_engine_initialized) return;
    window.__ch12_3d_engine_initialized = true;

    const canvas = document.getElementById('ch12-3d-canvas');
    const wrap = document.getElementById('ch12-canvas-wrap');
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');

    let targetStage = 1.0;
    let curStage = 1.0;
    let autoSync = true;
    let autoOrbit = true;
    let camYaw = -0.48;
    let camPitch = 0.35;
    let camZoom = 1.65;
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let timeSec = 0;
    let hitNodes = [];
    let selectedId = null;

    const STAGE_CAPTIONS = {
      1: "<b>Stage 1 (§12.1 — Def. 12.1 Epistemic Stratification):</b> 4-Tier Firewall separating Strata A–C proofs/models from quarantined Stratum D.",
      2: "<b>Stage 2 (§12.1.4 — Goodman Imperfect Community &amp; Sheaf Descent):</b> Triple pullback e₁×_U e₂×_U e₃ rejects phantom cliques; glues true holoforms.",
      3: "<b>Stage 3 (§12.2 — Thm. 12.3 Chalmersian Zombie Refutation):</b> Non-Abelian curvature Ω_int^𝒟 ≠ 0 couples P-Conscious pushout to A-Conscious evaluation!",
      4: "<b>Stage 4 (§12.3 — Thm. 12.4 Heyting Mereology &amp; Sublation):</b> Left-adjoint binding ℒ_bind ⊣ ℛ_part, t-norm parthood &amp; dialectical Aufhebung.",
      5: "<b>Stage 5 (§12.4 — Thm. 12.6 Landauer Thermodynamic Erasure):</b> 10⁷ → 40 bits/s sensory funnel dissipating ΔQ ≥ N_erase k_B T ln 2.",
      6: "<b>Stage 6 (§12.5 — Prop. 12.6 Working Memory 4±1 Limit):</b> Protosimplex encapsulation &amp; K_k pair-interaction saturation at k_max = 4 ± 1.",
      7: "<b>Stage 7 (§12.6 — Thm. 12.7 Simplicial Hodge &amp; 40 Hz Gamma):</b> Orthogonal decomposition ω = dα ⊕ δβ ⊕ γ &amp; thalamocortical phase-locking.",
      8: "<b>Stage 8 (§12.7 — Thm. 12.8 Affective Telecentrics):</b> Riemannian gradient descent ẋ = −g_AR⁻¹dV + A(x) spiralling into homeostatic attractor T_z.",
      9: "<b>Stage 9 (§12.8–12.9 — Predator Trace &amp; 3-Layer Neural Topos):</b> Retinal erasure → 9 Gabor stalks → Čech 1-nerve → glued Gestalt colimit!",
      10: "<b>Stage 10 (§12.10–12.11 — Neuro-Rosetta &amp; Asymptotic Limits):</b> Topos ↔ IIT 4.0 ↔ GNW ↔ FEP dictionary &amp; Unary/Abelian degeneracy limits!"
    };

    const STAGE_TELEMETRY = {
      1: "Strata A → B → C ⊥ Stratum D (Strict Deductive Firewall)",
      2: "e₁ ×_U e₂ ×_U e₃ ≠ 0_Ctx ⟺ Def_U(s) = 0",
      3: "g_E > 0 ⟺ Def_U(s) = 0 ⟹ ⟦Zombie(𝒩)⟧ = ⊥_Ω",
      4: "ℒ_bind ⊣ ℛ_part | χ(a_D, b_P) > θ_coord",
      5: "N_erase = D − r > 0 | 𝒫_diss ≥ N_erase k_B T ln 2",
      6: "binom(k,2) σ₀² ≤ C_max / λ₁ ⟹ k_max = 4 ± 1",
      7: "C¹(𝒢) = im(d₀) ⊕ im(d₁*) ⊕ ker(Δ₁) | γ → 0 at 40 Hz",
      8: "dV/dt = −g_AR⁻¹(dV, dV) ≤ 0 (Valence = −V̇)",
      9: "16×16 Retina → 9 Gabor Stalks → Čech Nerve → Gestalt",
      10: "ℰ_syn ↔ IIT 4.0 / GNW / FEP | m=1 & φ=0 Limits"
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

    // Stage 1: 4-Tier Epistemic Stratification & Deductive Firewall (Def. 12.1)
    function renderStage1(w, h) {
      const tiers = [
        { z:  1.05, col: "#20B2AA", id: "Tier_A", lbl: "Stratum A: Pure Topos & Lean Proofs", info: "Stratum A: Unconditionally proven theorems (Ω_Phenom, Thm. 12.3, Hodge Decomposition)" },
        { z:  0.40, col: "#4169E1", id: "Tier_B", lbl: "Stratum B: Conditional Neuro-Bridge", info: "Stratum B: Conditional mathematical physics (Landauer Floor, 4±1 Working Memory, Telecentrics)" },
        { z: -0.25, col: "#FFA500", id: "Tier_C", lbl: "Stratum C: 40 Hz Biophysical Ansatz", info: "Stratum C: Falsifiable neurobiological realization (40 Hz gamma phase-locking, θ-γ coupling)" },
        { z: -1.05, col: "#9370DB", id: "Tier_D", lbl: "Stratum D: Quarantined Horizon", info: "Stratum D: Speculative metaphysical extrapolations strictly barred from Strata A–C premises!" }
      ];
      let prev = null;
      tiers.forEach((tr, idx) => {
        const rad = 1.15 - idx * 0.08;
        ctx.beginPath();
        ctx.strokeStyle = tr.col;
        ctx.lineWidth = 2.0;
        ctx.setLineDash(idx === 3 ? [4, 3] : []);
        for (let i = 0; i <= 36; i++) {
          const a = (i / 36) * Math.PI * 2 + timeSec * (idx % 2 === 0 ? 0.3 : -0.3);
          const p = proj(rad * Math.cos(a), rad * Math.sin(a), tr.z, w, h);
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        const pN = drawNode3D(tr.id, 0, 0, tr.z, 8.5, tr.col, "#fff", tr.lbl, tr.info, w, h);
        if (prev && idx < 3) drawLine3D(prev, pN, "#64748b", 2.2);
        prev = pN;
      });
      // Crimson Firewall Plane at z = -0.65
      const fw = [proj(-1.2, -0.9, -0.65, w, h), proj(1.2, -0.9, -0.65, w, h), proj(1.2, 0.9, -0.65, w, h), proj(-1.2, 0.9, -0.65, w, h)];
      ctx.save();
      ctx.fillStyle = "rgba(220, 20, 60, 0.20)";
      ctx.strokeStyle = "#DC143C";
      ctx.lineWidth = 2.2;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(fw[0].sx, fw[0].sy);
      fw.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      drawNode3D("FW_Shield", 1.1, 0, -0.65, 7.5, "#DC143C", "#FFD700", "⛔ Deductive Firewall", "Strict Import Firewall barring Stratum D from entering Strata A–C proofs!", w, h);
    }

    // Stage 2: Goodman Imperfect Community vs. Sheaf Descent Equalizer (§12.1.4)
    function renderStage2(w, h) {
      const e1 = drawNode3D("G_e1", -0.85, -0.55, -0.45, 8.5, "#ff6b81", "#fff", "e₁(R, G)", "Local Experience Patch e₁ carrying qualities {Red, Green}", w, h);
      const e2 = drawNode3D("G_e2",  0.85, -0.55, -0.45, 8.5, "#20B2AA", "#fff", "e₂(R, B)", "Local Experience Patch e₂ carrying qualities {Red, Blue}", w, h);
      const e3 = drawNode3D("G_e3",  0.00,  0.90, -0.45, 8.5, "#4169E1", "#fff", "e₃(R, Y)", "Local Experience Patch e₃ carrying qualities {Red, Yellow}", w, h);
      drawLine3D(e1, e2, "#20B2AA", 2.4);
      drawLine3D(e2, e3, "#20B2AA", 2.4);
      drawLine3D(e3, e1, "#20B2AA", 2.4);

      const pTriple = drawNode3D("G_Pull", 0, 0, 0.15, 9.5, "#20B2AA", "#FFD700", "e₁×_U e₂×_U e₃ ≠ 0_Ctx", "Non-Empty Triple Pullback Intersection (Def_U(s) = 0) refuting Goodman Imperfect Community!", w, h);
      const pHol = drawNode3D("G_Hol", 0, 0, 0.95, 11.5, "#FFD700", "#20B2AA", "s ∈ Hol(U, P) (Glued Quale)", "Unique Glued Global Section in Sheaf Equalizer Hol(U, P) ≅ P(U)", w, h);
      drawLine3D(e1, pTriple, "rgba(32,178,170,0.65)", 1.8, [3, 2]);
      drawLine3D(e2, pTriple, "rgba(32,178,170,0.65)", 1.8, [3, 2]);
      drawLine3D(e3, pTriple, "rgba(32,178,170,0.65)", 1.8, [3, 2]);
      drawLine3D(pTriple, pHol, "#FFD700", 3.2);
    }

    // Stage 3: Chalmersian Zombie Refutation (Thm. 12.3)
    function renderStage3(w, h) {
      const p1 = drawNode3D("Z_P1", -1.10, -0.45, -0.55, 8.5, "#4169E1", "#fff", "Stream P₁ (a₁)", "Sensory Carrier Stream P₁ with non-Abelian operator a₁", w, h);
      const p2 = drawNode3D("Z_P2",  1.10, -0.45, -0.55, 8.5, "#20B2AA", "#fff", "Stream P₂ (a₂)", "Sensory Carrier Stream P₂ with non-Abelian operator a₂", w, h);
      const pPush = drawNode3D("Z_Push", 0, 0, 0.15, 10, "#FFA500", "#FFD700", "P₁ ⊞_φ P₂ (g_E > 0)", "Coupled Carrier Pushout with Interaction Curvature Ω_int^𝒟 = [a₁,a₂] ≠ 0 (P-Conscious!)", w, h);
      const pAcc = drawNode3D("Z_Acc", 0, 0, 0.98, 11.5, "#FFD700", "#20B2AA", "ev(T_P) ≠ {0} (A-Conscious)", "Thm. 12.3: Non-Zero Global Access Evaluation — Zombie Hypothesis ⟦Zombie(𝒩)⟧ = ⊥_Ω!", w, h);
      const pZom = drawNode3D("Z_Bot", 1.25, 0.75, -0.75, 7.5, "#DC143C", "#fff", "⚠ Zombie (g_E=0 ⇒ ev={0})", "Setting g_E = 0 collapses P₁ ⊕₁ P₂ and annihilates global access ev(T_P) = {0}!", w, h);

      drawLine3D(p1, pPush, "#4169E1", 2.8);
      drawLine3D(p2, pPush, "#20B2AA", 2.8);
      drawLine3D(pPush, pAcc, "#FFD700", 3.4);
      drawLine3D(p2, pZom, "#DC143C", 2.0, [4, 3]);
    }

    // Stage 4: Constructive Heyting Mereology & Dialectical Sublation (Thm. 12.4)
    function renderStage4(w, h) {
      const dNode = drawNode3D("M_Dr", -1.05, -0.5, -0.65, 8.5, "#4169E1", "#fff", "d_r ∈ D_U (Dialectical)", "Dialectical Operator Component d_r with norm a_D", w, h);
      const pNode = drawNode3D("M_Fq",  1.05, -0.5, -0.65, 8.5, "#20B2AA", "#fff", "f_q ∈ P_U (Predicative)", "Predicative Feature Component f_q with norm b_P", w, h);
      const mCone = drawNode3D("M_Asp", 0, 0, 0.10, 10, "#20B2AA", "#FFD700", "𝔐_asp(U): χ(a_D,b_P) > θ", "Archimedean t-Norm Coordination Subobject satisfying CEM Axioms MSL-M1 & MSL-M2", w, h);
      const aufNode = drawNode3D("M_Auf", 0, 0, 0.98, 11.5, "#FFD700", "#FFA500", "Aufhebung C ∈ Prop_{k+1}", "Thm. 12.4 Left-Adjoint Binding ℒ_bind ⊣ ℛ_part & Dialectical Sublation Apex!", w, h);
      drawLine3D(dNode, mCone, "#4169E1", 2.8);
      drawLine3D(pNode, mCone, "#20B2AA", 2.8);
      drawLine3D(mCone, aufNode, "#FFD700", 3.4);
    }

    // Stage 5: Landauer Thermodynamic Erasure Funnel (Thm. 12.6)
    function renderStage5(w, h) {
      for (let ring = 0; ring < 5; ring++) {
        const frac = ring / 4;
        const rad = 1.35 * (1 - 0.72 * frac);
        const z = 0.95 - frac * 1.9;
        const col = ring < 2 ? "#38bdf8" : (ring < 4 ? "#ff6b81" : "#FFD700");
        ctx.beginPath();
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.0;
        for (let k = 0; k <= 32; k++) {
          const a = (k / 32) * Math.PI * 2 + timeSec * (0.4 + frac);
          const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);
          if (k === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }
      drawNode3D("L_In", 0, 0, 0.95, 9, "#38bdf8", "#fff", "Sensory Inflow H(X) = 10⁷ bits/s", "High-Dimensional Retinal/Sensory Micro-State Inflow D", w, h);
      drawNode3D("L_Heat", 1.15, 0, 0.0, 8, "#ff6b81", "#FFD700", "ΔQ ≥ N_erase k_B T ln 2", "Erased Conditional Fibre Entropy H(X_n | Y_{n+1}) dissipated as metabolic heat (~20 W cortex)", w, h);
      drawNode3D("L_Out", 0, 0, -0.95, 11, "#FFD700", "#20B2AA", "Macro Quota H(Y) ≈ 40 bits/s", "Compressed Conscious Protosimplex Pointer Stream (99.8% Dimension Reduction!)", w, h);
    }

    // Stage 6: Protosimplex Encapsulation & 4 ± 1 Working Memory Clique (Prop. 12.6)
    function renderStage6(w, h) {
      const kPts = [];
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + timeSec * 0.35;
        const x = 1.12 * Math.cos(a), y = 1.12 * Math.sin(a), z = -0.45 + 0.15 * Math.sin(timeSec * 2 + i);
        const p = drawNode3D("WM_" + (i + 1), x, y, z, 8.5, "#20B2AA", "#fff", `𝒫_${i + 1} (Chunk ${i + 1})`, `Encapsulated 0D Protosimplex Working Memory Chunk 𝒫_${i + 1}`, w, h);
        kPts.push(p);
      }
      const pApex = drawNode3D("WM_Apex", 0, 0, 0.90, 11.5, "#FFD700", "#DC143C", "k_max = 4 ± 1 (binom(4,2)=6)", "Prop. 12.6 Working Memory Capacity Bound: Quadratic Čech pair-overlaps saturate C_max / λ₁!", w, h);
      for (let i = 0; i < 4; i++) {
        drawLine3D(kPts[i], pApex, "#FFD700", 2.4);
        for (let j = i + 1; j < 4; j++) {
          drawLine3D(kPts[i], kPts[j], "#ff6b81", 2.2);
        }
      }
    }

    // Stage 7: Simplicial Hodge Decomposition & 40 Hz Thalamocortical Gamma Gluing (Thm. 12.7)
    function renderStage7(w, h) {
      const gPts = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const x = (c - 1) * 0.92;
          const y = (r - 1) * 0.92;
          const z = -0.45 + 0.18 * Math.sin(timeSec * 3.2 + (r + c) * 0.7);
          const idx = r * 3 + c;
          gPts.push(drawNode3D("Hdg_" + idx, x, y, z, 6.5, "#20B2AA", "#fff", idx === 4 ? "40 Hz Sync" : "", `Cortical Patch Stalk U_${idx + 1} in 3×3 Simplicial Nerve`, w, h));
        }
      }
      const pGest = drawNode3D("Hdg_Apex", 0, 0, 0.95, 11.5, "#FFD700", "#20B2AA", "ω = dα ⊕ δβ ⊕ γ (γ → 0)", "Thm. 12.7 Hodge Decomposition: 40 Hz Gamma Synchrony annihilates harmonic frustration γ → 0!", w, h);
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const idx = r * 3 + c;
          if (c < 2) drawLine3D(gPts[idx], gPts[idx + 1], "#38bdf8", 2.0);
          if (r < 2) drawLine3D(gPts[idx], gPts[idx + 3], "#38bdf8", 2.0);
          if (idx % 2 === 0) drawLine3D(gPts[idx], pGest, "rgba(255,215,0,0.45)", 1.6);
        }
      }
    }

    // Stage 8: Affective Telecentric Flow & Valence/Arousal Basin (Thm. 12.8)
    function renderStage8(w, h) {
      for (let ring = 1; ring <= 3; ring++) {
        const rad = ring * 0.42;
        const z = -0.85 + 0.65 * rad * rad;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(65,105,225,0.45)";
        ctx.lineWidth = 1.6;
        for (let k = 0; k <= 32; k++) {
          const a = (k / 32) * Math.PI * 2;
          const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);
          if (k === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.strokeStyle = "#20B2AA";
      ctx.lineWidth = 3.0;
      for (let i = 0; i <= 50; i++) {
        const u = i / 50;
        const rad = 1.25 * (1 - u);
        const a = u * Math.PI * 4 + timeSec * 2.2;
        const z = -0.85 + 0.65 * rad * rad;
        const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);
        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
      }
      ctx.stroke();

      drawNode3D("Aff_Start", 1.15, 0, 0.05, 8, "#ff6b81", "#fff", "Perturbation ΔV = +8.5", "High-Dissonance Threat Perturbation triggering noradrenergic metric scaling g_AR", w, h);
      drawNode3D("Aff_Tz", 0, 0, -0.85, 11.5, "#FFD700", "#20B2AA", "Telezentrum T_z (V̇ ≤ 0)", "Thm. 12.8 Homeostatic Attractor T_z: Positive Valence = −dV/dt = g_AR⁻¹(dV,dV) > 0!", w, h);
    }

    // Stage 9: Predator-in-the-Woods Trace & 3-Layer Operadic Neural Topos (§12.8–12.9)
    function renderStage9(w, h) {
      const pRet = drawNode3D("NT_Ret", 0, 0, -0.95, 9.5, "#38bdf8", "#fff", "Layer 1: 16×16 Retinal Lattice", "Sensory Input Grid (20,000 bits/s compressed via Landauer erasure to 40 bits/s)", w, h);
      const stalks = [];
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 + timeSec * 0.4;
        const pS = drawNode3D("NT_S" + k, 1.05 * Math.cos(a), 1.05 * Math.sin(a), 0.0, 7, "#20B2AA", "#fff", k === 0 ? "Layer 2: Gabor Stalks" : "", `V1 Orientation Stalk & Čech Nerve Overlap Patch ${k + 1}`, w, h);
        stalks.push(pS);
        drawLine3D(pRet, pS, "#38bdf8", 1.8);
      }
      const pGest = drawNode3D("NT_Gest", 0, 0, 0.95, 11.5, "#FFD700", "#DC143C", "Layer 3: Glued Predator Gestalt", "Global Colimit Section s ∈ Γ(U, F) triggering Telecentric Evasive Trajectory (ΔI_syn = +12.4 bits)!", w, h);
      for (let k = 0; k < 6; k++) {
        drawLine3D(stalks[k], stalks[(k + 1) % 6], "#20B2AA", 2.0);
        drawLine3D(stalks[k], pGest, "#FFD700", 2.4);
      }
    }

    // Stage 10: Cross-Disciplinary Neuro-Rosetta Star & Asymptotic Reductions (§12.10–12.11)
    function renderStage10(w, h) {
      const pHub = drawNode3D("Ros_Hub", 0, 0, 0, 11.5, "#FFD700", "#20B2AA", "Syntrometric Neuro-Topos ℰ_syn", "Unified Categorical Framework bridging IIT 4.0, GNW, FEP, and Classical Limits", w, h);
      const arms = [
        { id: "R_IIT",  x: -1.15, y: -0.65, z:  0.55, col: "#20B2AA", lbl: "IIT 4.0 (Φ ↔ ΔI_syn & Ω_int)", info: "Maps Integrated Information Φ to Mereological Synergy Surplus ΔI_syn & Gauge Curvature" },
        { id: "R_GNW",  x:  1.15, y: -0.65, z:  0.55, col: "#4169E1", lbl: "Dehaene GNW (Ignition ↔ Γ(U,P))", info: "Maps Global Workspace Broadcast to Non-Empty Sheaf Equalizer Hol(U, P) ≠ ∅" },
        { id: "R_FEP",  x: -1.15, y:  0.65, z: -0.55, col: "#FFA500", lbl: "Friston FEP (F_VFE ↔ V(x) → T_z)", info: "Maps Variational Free Energy Minimization to Affective Telecentric Flow dV/dt ≤ 0" },
        { id: "R_Lim",  x:  1.15, y:  0.65, z: -0.55, col: "#9370DB", lbl: "Unary m=1 & Abelian φ=0 Limits", info: "Recovers Classical Feedforward Reflex Chains & Unbound Aggregate Models as exact degeneracies!" }
      ];
      arms.forEach(ar => {
        const pA = drawNode3D(ar.id, ar.x, ar.y, ar.z, 8.5, ar.col, "#fff", ar.lbl, ar.info, w, h);
        drawLine3D(pHub, pA, ar.col, 2.8);
      });
    }

    function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch12-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }
      timeSec += 0.016;
      curStage += (targetStage - curStage) * 0.14;
      if (autoOrbit && !isDragging) camYaw += 0.0055;

      const w = wrap.clientWidth, h = wrap.clientHeight;
      if (w <= 0 || h <= 0) {
        requestAnimationFrame(renderLoop);
        return;
      }
      if (canvas.width === 0 || Math.abs(canvas.width / Math.min(window.devicePixelRatio || 1, 2) - w) > 2) {
        resize();
      }
      ctx.clearRect(0, 0, w, h);
      hitNodes = [];

      function dispatchStageCrossFade(stInt) {
        if (stInt === 1) renderStage1(w, h);
        else if (stInt === 2) renderStage2(w, h);
        else if (stInt === 3) renderStage3(w, h);
        else if (stInt === 4) renderStage4(w, h);
        else if (stInt === 5) renderStage5(w, h);
        else if (stInt === 6) renderStage6(w, h);
        else if (stInt === 7) renderStage7(w, h);
        else if (stInt === 8) renderStage8(w, h);
        else if (stInt === 9) renderStage9(w, h);
        else renderStage10(w, h);
      }

      const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
      const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
      const frac = curStage - stLow;
      if (stLow === stHigh || frac < 0.02) {
        ctx.save();
        ctx.globalAlpha = 1.0;
        dispatchStageCrossFade(Math.round(curStage));
        ctx.restore();
      } else {
        ctx.save();
        ctx.globalAlpha = 1.0 - frac * 0.82;
        dispatchStageCrossFade(stLow);
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = frac;
        dispatchStageCrossFade(stHigh);
        ctx.restore();
      }
      requestAnimationFrame(renderLoop);
    }

    window.setCh12Stage = function(val, manual) {
      targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));
      const stInt = Math.round(targetStage);
      const sl = document.getElementById('ch12-slider');
      if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;
      const pill = document.getElementById('ch12-stage-pill');
      if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;
      const cap = document.getElementById('ch12-caption');
      if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];
      const tel = document.getElementById('ch12-telemetry');
      if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];
      if (manual) {
        autoSync = false;
        const b = document.getElementById('ch12-btn-sync');
        if (b) { b.classList.remove('active'); b.innerText = "Manual"; }
      }
    };

    window.scrubCh12Stage = function(val) { window.setCh12Stage(val, true); };

    window.enableCh12Sync = function() {
      autoSync = true;
      const b = document.getElementById('ch12-btn-sync');
      if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }
      syncCh12WithDeck();
    };

    window.toggleCh12Orbit = function() {
      autoOrbit = !autoOrbit;
      const b = document.getElementById('ch12-btn-orbit');
      if (b) b.classList.toggle('active', autoOrbit);
    };

    window.toggleCh12Spotlight = function() {
      const hud = document.getElementById('ch12-3d-hud');
      if (hud) {
        hud.classList.remove('minimized');
        hud.classList.toggle('spotlight');
        setTimeout(resize, 360);
      }
    };

    window.toggleCh12Minimize = function() {
      const hud = document.getElementById('ch12-3d-hud');
      const b = document.getElementById('ch12-btn-min');
      if (hud) {
        hud.classList.remove('spotlight');
        hud.classList.toggle('minimized');
        if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";
        setTimeout(resize, 360);
      }
    };

    function syncCh12WithDeck() {
      if (!autoSync) return;
      const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
      const chHud = document.getElementById('ch12-3d-hud');
      if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
        const currentSlide = window.Reveal.getCurrentSlide();
        const inCh = currentSlide ? !!currentSlide.closest('#chapter-12, section[data-chapter="12"]') : true;
        chHud.style.display = inCh ? '' : 'none';
        if (!inCh) return;
      }

      const rev = document.querySelector('.reveal');
      const vp = document.querySelector('.reveal-viewport');
      const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
        || (vp && vp.classList.contains('reveal-scroll'))
        || (rev && rev.classList.contains('reveal-scroll'))
        || (rev && rev.scrollHeight > rev.clientHeight + 100)
        || window.innerWidth <= 768;

      let stageVal = null;
      if (isScroll) {
        const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
          : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
          : (window.scrollY || document.documentElement.scrollTop || 0));
        let max = 1;
        if (rev && rev.scrollHeight > rev.clientHeight + 10) max = rev.scrollHeight - rev.clientHeight;
        else if (vp && vp.scrollHeight > vp.clientHeight + 10) max = vp.scrollHeight - vp.clientHeight;
        else max = Math.max(1, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight);
        const frac = Math.min(1.0, Math.max(0.0, top / max));
        stageVal = 1.0 + frac * 9.0;
      }

      if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
        const idx = window.Reveal.getIndices();
        const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 13);
        const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
        const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
        stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
      }

      if (typeof stageVal === 'number' && !isNaN(stageVal)) {
        window.setCh12Stage(stageVal, false);
      }
    }

    window.syncCh12WithDeck = syncCh12WithDeck;

    wrap.addEventListener('mousedown', e => {
      e.stopPropagation();
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      camYaw += (e.clientX - lastX) * 0.012;
      camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));
      lastX = e.clientX;
      lastY = e.clientY;
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    wrap.addEventListener('click', e => {
      e.stopPropagation();
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let hit = null;
      for (let i = hitNodes.length - 1; i >= 0; i--) {
        const n = hitNodes[i];
        if (Math.hypot(mx - n.p.sx, my - n.p.sy) <= n.r + 6) { hit = n; break; }
      }
      const insp = document.getElementById('ch12-node-inspector');
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
    syncCh12WithDeck();
    requestAnimationFrame(renderLoop);
    window.addEventListener('resize', resize);
    if (window.Reveal) {
      window.Reveal.on('ready', syncCh12WithDeck);
      window.Reveal.on('slidechanged', syncCh12WithDeck);
      window.Reveal.on('fragmentshown', syncCh12WithDeck);
      window.Reveal.on('fragmenthidden', syncCh12WithDeck);
    }
  }

  function initCh12InlineMount() {
    document.querySelectorAll('.ch12-3d-Mount, [data-ch12-morph]').forEach(el => {
      if (el.dataset.mounted === '1') return;
      el.dataset.mounted = '1';
      el.innerHTML = `<div style="background:rgba(10,15,28,0.92); border:1px solid rgba(32,178,170,0.45); border-radius:10px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div style="font-size:0.66em; color:#cbd5e1;">
          <b style="color:#FFD700;">🧠 Interactive 10-Stage 3D Neuro-Topos &amp; Protosimplex Engine</b><br>
          <span>Synchronized across all 13 slides — inspect Goodman sheaf descent, Zombie refutation, Landauer funnel, and 40 Hz Hodge gluing in 3D.</span>
        </div>
        <button class="syn-btn" style="background:#FFD700; color:#000; font-weight:bold; white-space:nowrap;" onclick="if(window.toggleCh12Spotlight) window.toggleCh12Spotlight();">⛶ Launch 3D Spotlight</button>
      </div>`;
    });
  }

  function initAllCh12Widgets() {
    window.ch12_setTier("A");
    window.ch12_setGoodmanMode("topos");
    window.ch12_updateZombieLab();
    window.ch12_updateMereologyLab();
    window.ch12_updateErasureLab();
    window.ch12_updateWorkingMemoryLab();
    window.ch12_updateHodgeLab();
    window.ch12_updateAffectiveLab();
    window.ch12_setPredatorStep(1);
    initRetinaCanvasEvents();
    renderRetinaCanvas();
    runCh12Engine();
    initCh12InlineMount();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllCh12Widgets);
  } else {
    initAllCh12Widgets();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 13 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
window.showGenericTab = window.showGenericTab || function(prefix, idx, maxIdx, btnEl) {
  for (let i = 1; i <= maxIdx; i++) {
    const p = document.getElementById(prefix + '-' + i);
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

// WIDGET 1: §13.1.1 Non-Abelian Stokes-Wilson Holonomy for Bound Qualia (Thm. 13.2)
window.ch13_setWilsonPreset = function(mode) {
  const th = document.getElementById('ch13-wilson-theta');
  const a1 = document.getElementById('ch13-wilson-a1');
  const a2 = document.getElementById('ch13-wilson-a2');
  if (!th || !a1 || !a2) return;
  if (mode === 'flat') {
    th.value = 0;
  } else {
    th.value = 90;
    a1.value = 1.2;
    a2.value = 1.2;
  }
  window.ch13_updateWilsonLab();
};

window.ch13_updateWilsonLab = function() {
  const elA1 = document.getElementById('ch13-wilson-a1');
  if (!elA1) return;
  const a1 = parseFloat(elA1.value);
  const a2 = parseFloat(document.getElementById('ch13-wilson-a2').value);
  const thetaDeg = parseFloat(document.getElementById('ch13-wilson-theta').value);
  const area = parseFloat(document.getElementById('ch13-wilson-area').value);

  document.getElementById('ch13-wilson-a1-val').innerText = a1.toFixed(2);
  document.getElementById('ch13-wilson-a2-val').innerText = a2.toFixed(2);
  document.getElementById('ch13-wilson-theta-val').innerText = thetaDeg.toFixed(0) + '°';
  document.getElementById('ch13-wilson-area-val').innerText = area.toFixed(2);

  const thetaRad = (thetaDeg * Math.PI) / 180.0;
  const commNorm = 2.0 * a1 * a2 * Math.sin(thetaRad);
  const flux = commNorm * area;
  const halfPhase = 0.5 * flux;
  const wilsonTrace = 2.0 * Math.cos(halfPhase);
  const holDeviation = Math.abs(2.0 - wilsonTrace);

  const svg = document.getElementById('ch13-wilson-svg');
  if (svg) {
    const cx = 110, cy = 62;
    const w = 52 * Math.sqrt(area), h = 36 * Math.sqrt(area);
    const x0 = cx - w, y0 = cy - h, x1 = cx + w, y1 = cy + h;
    const vx = 28 * Math.cos(-halfPhase), vy = 28 * Math.sin(-halfPhase);
    const fillAlpha = Math.min(0.48, 0.08 + 0.12 * commNorm);
    const strokeCol = commNorm > 0.05 ? '#FFD700' : '#20B2AA';
    svg.innerHTML = `
      <rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${(2*w).toFixed(1)}" height="${(2*h).toFixed(1)}" rx="5"
        fill="rgba(147,112,219,${fillAlpha.toFixed(2)})" stroke="${strokeCol}" stroke-width="2.2"/>
      <text x="${cx}" y="${(cy - 4).toFixed(1)}" fill="#e2e8f0" font-size="9.5" font-weight="bold" text-anchor="middle">Σ ([a₁,a₂] = ${commNorm.toFixed(2)})</text>
      <text x="${cx}" y="${(cy + 10).toFixed(1)}" fill="#FFD700" font-size="8.5" text-anchor="middle">tr Hol(∂Σ) = ${wilsonTrace.toFixed(3)}</text>
      <circle cx="${x0.toFixed(1)}" cy="${y1.toFixed(1)}" r="4.5" fill="#4169E1"/>
      <line x1="${x0.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${(x0 + 28).toFixed(1)}" y2="${y1.toFixed(1)}" stroke="#20B2AA" stroke-width="2.4"/>
      <line x1="${x0.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${(x0 + vx).toFixed(1)}" y2="${(y1 + vy).toFixed(1)}" stroke="#DC143C" stroke-width="2.6"/>
      <text x="${(x0 + 4).toFixed(1)}" y="${(y1 + 14).toFixed(1)}" fill="#cbd5e1" font-size="8">x₀ fiber phase Δφ = ${(halfPhase * 180 / Math.PI).toFixed(1)}°</text>
    `;
  }

  const box = document.getElementById('ch13-wilson-readout');
  if (box) {
    const status = commNorm < 0.02
      ? `<span style="color:#20B2AA;"><b>ABELIAN / UNBOUND (Hol = id_G):</b></span> [a₁, a₂] = 0 ⇒ No emergent quale phase shift.`
      : `<span style="color:#FFD700;"><b>NON-ABELIAN BOUND QUALE (Hol ≠ id_G):</b></span> ‖[a₁, a₂]‖ = <b>${commNorm.toFixed(3)}</b>, Flux ∬_Σ [a₁,a₂] = <b>${flux.toFixed(3)} rad</b>, Wilson Trace tr(Hol_A(𝒞)) = <b>${wilsonTrace.toFixed(3)}</b> (|2 - tr| = ${holDeviation.toFixed(3)}).`;
    box.innerHTML = status;
  }
};

// WIDGET 2: §13.1.2-13.1.4 Zeitkorn Chronometry, Object Constancy & Intersubjectivity
window.ch13_updateConstancyLab = function() {
  const elHol = document.getElementById('ch13-const-hol');
  if (!elHol) return;
  const holLoop = parseFloat(elHol.value);
  const dtMs = parseFloat(document.getElementById('ch13-const-dt').value);
  const kerDim = parseInt(document.getElementById('ch13-const-ker').value);

  document.getElementById('ch13-const-hol-val').innerText = holLoop.toFixed(2);
  document.getElementById('ch13-const-dt-val').innerText = dtMs.toFixed(0) + ' ms';
  document.getElementById('ch13-const-ker-val').innerText = kerDim;

  const rateHz = (1000.0 / dtMs).toFixed(1);
  const isConst = holLoop < 0.05;
  const isFaithful = kerDim === 0;

  const svg = document.getElementById('ch13-const-svg');
  if (svg) {
    const colLoop = isConst ? '#20B2AA' : '#DC143C';
    const colAff = isFaithful ? '#FFD700' : '#FFA500';
    const shift = holLoop * 18;
    svg.innerHTML = `
      <polygon points="58,18 20,92 96,92" fill="rgba(32,178,170,0.10)" stroke="${colLoop}" stroke-width="2.2"/>
      <circle cx="58" cy="18" r="5" fill="#4169E1"/><text x="58" y="11" fill="#e2e8f0" font-size="8.5" text-anchor="middle">B₁</text>
      <circle cx="20" cy="92" r="5" fill="#4169E1"/><text x="12" y="104" fill="#e2e8f0" font-size="8.5">B₂</text>
      <circle cx="96" cy="92" r="5" fill="#4169E1"/><text x="98" y="104" fill="#e2e8f0" font-size="8.5">B₃</text>
      <circle cx="${(58 + shift).toFixed(1)}" cy="${(18 + shift*0.5).toFixed(1)}" r="4" fill="${colLoop}"/>
      <text x="58" y="66" fill="${colLoop}" font-size="8" font-weight="bold" text-anchor="middle">∮ A = ${holLoop.toFixed(2)}</text>
      <line x1="125" y1="55" x2="195" y2="55" stroke="${colAff}" stroke-width="2.5" stroke-dasharray="${isFaithful ? 'none' : '4,3'}"/>
      <circle cx="125" cy="55" r="11" fill="rgba(65,105,225,0.25)" stroke="#4169E1" stroke-width="1.8"/>
      <text x="125" y="58" fill="#fff" font-size="8.5" text-anchor="middle">ℰ_A</text>
      <circle cx="195" cy="55" r="11" fill="rgba(32,178,170,0.25)" stroke="#20B2AA" stroke-width="1.8"/>
      <text x="195" y="58" fill="#fff" font-size="8.5" text-anchor="middle">ℰ_B</text>
      <text x="160" y="43" fill="${colAff}" font-size="8" font-weight="bold" text-anchor="middle">dim ker = ${kerDim}</text>
      <text x="160" y="85" fill="#cbd5e1" font-size="8" text-anchor="middle">Zeitkorn δt_n = ${dtMs}ms (${rateHz}Hz)</text>
    `;
  }

  const box = document.getElementById('ch13-const-readout');
  if (box) {
    const cStr = isConst
      ? `<span style="color:#20B2AA;"><b>✓ Object Constancy Holds (∮_𝒞 A = 0 ⇒ Hol = id)</b></span>`
      : `<span style="color:#ff6b81;"><b>✗ Constancy Breakdown (∮_𝒞 A = ${holLoop.toFixed(2)} ≠ 0)</b></span>`;
    const fStr = isFaithful
      ? `<span style="color:#FFD700;"><b>✓ Faithful Theory of Mind (ker T_β = ker S_β = {0})</b></span>`
      : `<span style="color:#FFA500;"><b>⚠ Solipsistic Kernel Defect (dim ker = ${kerDim} > 0)</b></span>`;
    box.innerHTML = `${cStr} | ${fStr} | <b>Thm. 13.3:</b> Discrete pushout step (YF_model)^n at ${rateHz} Hz.`;
  }
};

// WIDGET 3: §13.1.6 3x3 Taxonomic Property Grid \hat{A} = (A_{ik}) Explorer
window.ch13_selectGridCell = function(i, k, btnEl) {
  document.querySelectorAll('.ch13-grid-cell').forEach(el => el.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const actions = {
    1: "i = 1: Colimit-Preserving (Conflexive Synthesis Functor)",
    2: "i = 2: Limit-Preserving (Projective Cone / Filtration Functor)",
    3: "i = 3: Isogonal Equivalence (Angle & Metric-Conformal Automorphism)"
  };
  const targets = {
    1: "k = 1: Conflexive Pushout Nodes (Topological Gluing Locus)",
    2: "k = 2: Tensor Rank & Manifold Dimension Alterations",
    3: "k = 3: Field-Intrinsic Gauge Connections (A_μ Modulation)"
  };
  const details = {
    "1-1": { status: "REGULAR GLUING", col: "#20B2AA", desc: "Preserves colimits across pushout nodes without altering manifold dimension (dim F(ℳ) = dim ℳ)." },
    "1-2": { status: "⚠ CLASS A₁₂ SINGULARITY (COMPRESSION)", col: "#DC143C", desc: "Strict dimensional compression (dim F(ℳ) < dim ℳ): induces Class A₁₂ Dimension-Defect Singularities and topological tearing of state space (Thm. 13.8)!" },
    "1-3": { status: "GEODESIC COMPLETE", col: "#20B2AA", desc: "Colimit-compatible connection modulation; preserves smooth base manifold and geodesic completeness." },
    "2-1": { status: "REGULAR LIMIT CONE", col: "#20B2AA", desc: "Preserves projective limits across descent equalizers without rank singularity." },
    "2-2": { status: "⚠ CLASS A₂₂ SINGULARITY (EXPANSION)", col: "#DC143C", desc: "Strict dimensional expansion (dim F(ℳ) > dim ℳ): induces dimensional blow-up / tearing across fiber transitions (Thm. 13.8)!" },
    "2-3": { status: "GEODESIC COMPLETE", col: "#20B2AA", desc: "Limit-preserving gauge connection adjustment; preserves geodesic completeness." },
    "3-1": { status: "✓ ISOGONAL EQUIVALENCE (COMPLETE)", col: "#FFD700", desc: "Isogonal equivalence on pushout nodes; strictly preserves geodesic completeness and metric regularity." },
    "3-2": { status: "✓ ISOGONAL EQUIVALENCE (COMPLETE)", col: "#FFD700", desc: "Isogonal rank-preserving frame rotation; no dimensional defect." },
    "3-3": { status: "✓ ISOGONAL EQUIVALENCE (COMPLETE)", col: "#FFD700", desc: "Pure gauge automorphism in H⁰_BRST(ℱ_ext); preserves all physical & phenomenal invariants." }
  };

  const info = details[`${i}-${k}`];
  const box = document.getElementById('ch13-grid-readout');
  if (box && info) {
    box.innerHTML =
      `<b>Selected Entry A<sub>${i}${k}</sub>:</b> <span style="color:${info.col}; font-weight:bold;">${info.status}</span><br>` +
      `<span style="color:#93c5fd;">${actions[i]}</span> × <span style="color:#5eead4;">${targets[k]}</span><br>` +
      `${info.desc}`;
  }
};

// WIDGET 4: §13.2.1 DeTurck Parabolic Smoothing & Sobolev Contraction (Thm. 13.9-13.10)
window.ch13_updateDeTurckLab = function() {
  const elTau = document.getElementById('ch13-dt-tau');
  if (!elTau) return;
  const tau = parseFloat(elTau.value);
  const cGeom = parseFloat(document.getElementById('ch13-dt-cgeom').value);
  const gamma = parseFloat(document.getElementById('ch13-dt-gamma').value);

  document.getElementById('ch13-dt-tau-val').innerText = tau.toFixed(2);
  document.getElementById('ch13-dt-cgeom-val').innerText = cGeom.toFixed(2);
  document.getElementById('ch13-dt-gamma-val').innerText = gamma.toFixed(2);

  const cHeat = 0.65, c0 = 0.55;
  const kM = (cHeat * cGeom * Math.exp(-c0 * tau)) / tau;
  const isContraction = kM < 1.0;

  const svg = document.getElementById('ch13-dt-svg');
  if (svg) {
    let pts = [];
    let err = 1.0;
    for (let n = 0; n <= 8; n++) {
      let x = 22 + n * 22;
      let y = 98 - Math.min(82, err * 72);
      pts.push((n === 0 ? 'M ' : 'L ') + x.toFixed(1) + ',' + y.toFixed(1));
      err = Math.min(1.15, err * kM);
    }
    const curveCol = isContraction ? '#20B2AA' : '#DC143C';
    svg.innerHTML = `
      <line x1="20" y1="98" x2="200" y2="98" stroke="#475569" stroke-width="1.5"/>
      <line x1="20" y1="14" x2="20" y2="98" stroke="#475569" stroke-width="1.5"/>
      <line x1="20" y1="26" x2="200" y2="26" stroke="#DC143C" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="196" y="22" fill="#DC143C" font-size="7.5" text-anchor="end">Sobolev Ball Boundary δ (D_ext)</text>
      <path d="${pts.join(' ')}" fill="none" stroke="${curveCol}" stroke-width="2.6"/>
      <text x="110" y="112" fill="#cbd5e1" font-size="8" text-anchor="middle">Cascade Iteration n (g^(n+1) = Φ_apex(g^(n)))</text>
      <text x="115" y="55" fill="${curveCol}" font-size="9" font-weight="bold" text-anchor="middle">k_M = ${kM.toFixed(3)}</text>
    `;
  }

  const box = document.getElementById('ch13-dt-readout');
  if (box) {
    box.innerHTML = isContraction
      ? `<span style="color:#20B2AA;"><b>✓ STRICT SOBOLEV CONTRACTION (k_M = ${kM.toFixed(3)} &lt; 1):</b></span> Banach Fixed-Point Theorem guarantees unique smooth stationary apex metric <b>²g̅_∞ ∈ C^∞(ℳ)</b>; Lyapunov basin decays as V(t) ≤ V₀ e^(-${(2*gamma).toFixed(2)}t).`
      : `<span style="color:#ff6b81;"><b>⚠ NON-CONTRACTIVE REGIME (k_M = ${kM.toFixed(3)} ≥ 1):</b></span> Parabolic smoothing time τ_M = ${tau.toFixed(2)} is too small for Lipschitz constant C_geom = ${cGeom.toFixed(2)}. Increase τ_M!`;
  }
};

// WIDGET 5: §13.3.1-13.3.2 6D Phenomenal Condensation & 36-Component Hermetry Matrix
window.ch13_hermetrySector = 'all';
window.ch13_setHermetrySector = function(sec) {
  window.ch13_hermetrySector = sec;
  window.ch13_updateCondensationLab();
};

window.ch13_updateCondensationLab = function() {
  const elN = document.getElementById('ch13-cond-n');
  if (!elN) return;
  const N = parseInt(elN.value);
  document.getElementById('ch13-cond-n-val').innerText = N;

  const zOmega = Math.pow(N, 4) / 16.0;
  const zK = (Math.pow(N, 3) + 3 * Math.pow(N, 2)) / 4.0;
  const diff = zOmega - zK;

  const mat = document.getElementById('ch13-cond-matrix');
  if (mat) {
    const sec = window.ch13_hermetrySector || 'all';
    const labels = ['x₁', 'x₂', 'x₃', 'x₄', 'x₅', 'x₆'];
    let html = '';
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const isSym = i <= j;
        const inR4 = i < 4 && j < 4;
        const inS2 = i >= 4 && j >= 4;
        const inMix = !inR4 && !inS2;
        let bg = isSym ? 'rgba(65,105,225,0.28)' : 'rgba(255,165,0,0.28)';
        let border = isSym ? '#4169E1' : '#FFA500';
        if (sec === 'sym' && !isSym) { bg = '#0b0f19'; border = '#1e293b'; }
        if (sec === 'r4' && !(!isSym && inR4)) { bg = '#0b0f19'; border = '#1e293b'; }
        if (sec === 'mix' && !(!isSym && inMix)) { bg = '#0b0f19'; border = '#1e293b'; }
        if (sec === 's2' && !(!isSym && inS2)) { bg = '#0b0f19'; border = '#1e293b'; }
        const symTag = i === j ? 'g₊' : (i < j ? 'g₊' : 'g₋');
        html += `<div class="ch13-hcell" style="background:${bg}; border-color:${border}; color:#e2e8f0;">${symTag}(${labels[i]},${labels[j]})</div>`;
      }
    }
    mat.innerHTML = html;
  }

  const box = document.getElementById('ch13-cond-readout');
  if (box) {
    const rootMsg = N === 6
      ? `<span style="color:#FFD700;"><b>★ EXACT CONDENSATION ROOT (N = 6 ⇒ R₆ = R₄ × S₂):</b></span> Z_ω(6) = Z_k(6) = <b>81.00</b>!`
      : `Dimension N = ${N}: Z_ω(${N}) = ${zOmega.toFixed(2)}, Z_k(${N}) = ${zK.toFixed(2)} (Mismatch ΔZ = ${diff.toFixed(2)} ≠ 0). Set <b>N = 6</b>!`;
    box.innerHTML = `${rootMsg}<br><b>Thm. 13.14 (36 = 21 Sym + 15 Skew):</b> 21 symmetric components (blue, g₊) + 15 skew components (orange, g₋: 6 on R₄ vorticity, 8 on R₄×S₂ valence/arousal bias, 1 on S₂ agency [∂₅,∂₆]).`;
  }
};

// WIDGET 6: §13.3.6 Metronic Lattice Momentum Dispersion & UV Cutoff (Thm. 13.19-13.20)
window.ch13_updateLatticeDispersion = function() {
  const elTau = document.getElementById('ch13-lat-tau');
  if (!elTau) return;
  const tau = parseFloat(elTau.value);
  const N = parseInt(document.getElementById('ch13-lat-n').value);
  const kFrac = parseFloat(document.getElementById('ch13-lat-k').value);

  document.getElementById('ch13-lat-tau-val').innerText = tau.toFixed(2);
  document.getElementById('ch13-lat-n-val').innerText = N;
  document.getElementById('ch13-lat-k-val').innerText = kFrac.toFixed(2) + ' π/τ';

  const kTau = kFrac * Math.PI;
  const lam1D = (4.0 / (tau * tau)) * Math.pow(Math.sin(kTau / 2.0), 2);
  const lamCont = Math.pow(kTau / tau, 2);
  const uvMax4D = 16.0 / (tau * tau);
  const lambdaUV = 4.0 / Math.sqrt(tau);
  const irGap = (4.0 / (tau * tau)) * Math.pow(Math.sin(Math.PI / N), 2);

  const svg = document.getElementById('ch13-lat-svg');
  if (svg) {
    let ptsLat = [], ptsCont = [];
    const maxY = 4.0 / (tau * tau);
    for (let s = 0; s <= 40; s++) {
      let u = s / 40.0;
      let kt = u * Math.PI;
      let lLat = (4.0 / (tau * tau)) * Math.pow(Math.sin(kt / 2.0), 2);
      let lCon = Math.pow(kt / tau, 2);
      let px = 20 + u * 175;
      let pyLat = 96 - (lLat / maxY) * 68;
      let pyCon = 96 - Math.min(82, (lCon / maxY) * 68);
      ptsLat.push((s === 0 ? 'M ' : 'L ') + px.toFixed(1) + ',' + pyLat.toFixed(1));
      ptsCont.push((s === 0 ? 'M ' : 'L ') + px.toFixed(1) + ',' + pyCon.toFixed(1));
    }
    const curX = 20 + kFrac * 175;
    const curY = 96 - (lam1D / maxY) * 68;
    svg.innerHTML = `
      <line x1="20" y1="96" x2="198" y2="96" stroke="#475569" stroke-width="1.5"/>
      <line x1="20" y1="14" x2="20" y2="96" stroke="#475569" stroke-width="1.5"/>
      <path d="${ptsCont.join(' ')}" fill="none" stroke="#64748b" stroke-width="1.6" stroke-dasharray="3,3"/>
      <path d="${ptsLat.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2.6"/>
      <circle cx="${curX.toFixed(1)}" cy="${curY.toFixed(1)}" r="5" fill="#FFD700" stroke="#000" stroke-width="1"/>
      <text x="195" y="24" fill="#20B2AA" font-size="8" font-weight="bold" text-anchor="end">DEC λ(k) = (4/τ²)sin²(kτ/2)</text>
      <text x="195" y="35" fill="#94a3b8" font-size="7.5" text-anchor="end">Continuum k² (UV Divergent)</text>
      <text x="110" y="110" fill="#cbd5e1" font-size="8" text-anchor="middle">Brillouin Zone k ∈ [0, π/τ]</text>
    `;
  }

  const box = document.getElementById('ch13-lat-readout');
  if (box) {
    box.innerHTML =
      `<b>DEC Dispersion λ(k):</b> <span style="color:#FFD700;"><b>${lam1D.toFixed(3)}</b></span> (vs Continuum k² = ${lamCont.toFixed(3)}) | ` +
      `<b>ℤ⁴ Spectrum:</b> [0, ${uvMax4D.toFixed(2)}], <b>Λ_UV = ${lambdaUV.toFixed(2)}</b> | ` +
      `<b>Finite Torus IR Gap (N=${N}):</b> ΔE_min = <span style="color:#20B2AA;"><b>${irGap.toFixed(4)} &gt; 0</b></span>.`;
  }
};

// WIDGET 7: §13.5 Three-Node \Phi_{topos} vs. IIT 4.0 Simulator (Def. 13.21, Thm. 13.22, Prop. 13.23)
window.ch13_phiAbelian = false;
window.ch13_setPhiRegime = function(mode) {
  const w1 = document.getElementById('ch13-phi-w1');
  const w2 = document.getElementById('ch13-phi-w2');
  const w3 = document.getElementById('ch13-phi-w3');
  const dv = document.getElementById('ch13-phi-dv');
  if (!w1) return;
  if (mode === 'bound') {
    window.ch13_phiAbelian = false;
    w1.value = 1.4; w2.value = 1.2; w3.value = 1.5; dv.value = 0.0;
  } else if (mode === 'split') {
    window.ch13_phiAbelian = true;
    dv.value = 0.0;
  } else if (mode === 'rivalry') {
    window.ch13_phiAbelian = false;
    w1.value = 1.4; w2.value = 1.2; w3.value = 1.5; dv.value = 2.2;
  }
  window.ch13_updatePhiToposLab();
};

window.ch13_updatePhiToposLab = function() {
  const elW1 = document.getElementById('ch13-phi-w1');
  if (!elW1) return;
  const w1 = parseFloat(elW1.value);
  const w2 = parseFloat(document.getElementById('ch13-phi-w2').value);
  const w3 = parseFloat(document.getElementById('ch13-phi-w3').value);
  const dv = parseFloat(document.getElementById('ch13-phi-dv').value);
  const N = parseInt(document.getElementById('ch13-phi-nodes').value);

  document.getElementById('ch13-phi-w1-val').innerText = w1.toFixed(2);
  document.getElementById('ch13-phi-w2-val').innerText = w2.toFixed(2);
  document.getElementById('ch13-phi-w3-val').innerText = w3.toFixed(2);
  document.getElementById('ch13-phi-dv-val').innerText = dv.toFixed(2);
  document.getElementById('ch13-phi-nodes-val').innerText = N;

  const isAbelian = window.ch13_phiAbelian;
  const phiBound = isAbelian ? 0.0 : 0.5 * Math.sqrt(w1*w1*w2*w2 + w2*w2*w3*w3 + w3*w3*w1*w1);
  const penalty = Math.exp(-(dv * dv) / 2.0);
  const phiTopos = phiBound * penalty;

  const polyOps = (N * (N - 1)) / 2;
  const iitPartitions = Math.pow(2, N);

  const svg = document.getElementById('ch13-phi-svg');
  if (svg) {
    const edgeCol = isAbelian ? '#64748b' : (dv > 1.2 ? '#DC143C' : '#20B2AA');
    svg.innerHTML = `
      <polygon points="105,16 38,92 172,92" fill="rgba(65,105,225,0.12)" stroke="${edgeCol}" stroke-width="2.5" stroke-dasharray="${isAbelian ? '4,3' : 'none'}"/>
      <circle cx="105" cy="16" r="11" fill="#1e293b" stroke="#FFD700" stroke-width="2"/>
      <text x="105" y="19" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">ω₁</text>
      <circle cx="38" cy="92" r="11" fill="#1e293b" stroke="#FFD700" stroke-width="2"/>
      <text x="38" y="95" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">ω₂</text>
      <circle cx="172" cy="92" r="11" fill="#1e293b" stroke="#FFD700" stroke-width="2"/>
      <text x="172" y="95" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">ω₃</text>
      <text x="105" y="64" fill="#fff" font-size="9.5" font-weight="bold" text-anchor="middle">Φ_topos = ${phiTopos.toFixed(3)}</text>
      <text x="105" y="77" fill="#cbd5e1" font-size="7.5" text-anchor="middle">exp(-Δv²/2σ²) = ${penalty.toFixed(3)}</text>
    `;
  }

  const box = document.getElementById('ch13-phi-readout');
  if (box) {
    const regName = isAbelian ? "Abelian Split ([a_i, a_j] = 0)" : (dv > 0.1 ? "Contradictory Rivalry (Δv > 0)" : "Coherent Bound Triad (Def = 0)");
    box.innerHTML =
      `<b>Prop. 13.23 (${regName}):</b> ‖Ω_int‖_L² = <b>${phiBound.toFixed(3)}</b> × Descent Factor <b>${penalty.toFixed(3)}</b> ⇒ <span style="color:#FFD700;"><b>Φ_topos = ${phiTopos.toFixed(3)}</b></span><br>` +
      `<b>Complexity at N = ${N} Nodes (Thm. 13.22):</b> Topos Lie Brackets = <span style="color:#20B2AA;"><b>${polyOps} edges O(N²)</b></span> vs. Classical IIT 4.0 MIP = <span style="color:#ff6b81;"><b>${iitPartitions.toLocaleString()} cuts O(2^N)</b></span>.`;
  }
};

// WIDGET 8: §13.7 Altered States of Consciousness & Psychopathology (Table 13.2 & Def. 13.26)
window.ch13_setConsciousState = function(mode, btnEl) {
  if (btnEl && btnEl.parentElement) {
    Array.from(btnEl.parentElement.children).forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  const conf = document.getElementById('ch13-asc-conf');
  const hol = document.getElementById('ch13-asc-hol');
  const def = document.getElementById('ch13-asc-def');
  const curv = document.getElementById('ch13-asc-curv');
  if (!conf) return;

  if (mode === 'wake') {
    conf.value = 2.0; hol.value = 0.0; def.value = 0.0; curv.value = 1.5;
  } else if (mode === 'rebus') {
    conf.value = 7.5; hol.value = 0.35; def.value = 0.45; curv.value = 2.4;
  } else if (mode === 'schizo') {
    conf.value = 3.8; hol.value = 1.65; def.value = 1.85; curv.value = 1.3;
  } else if (mode === 'coma') {
    conf.value = 0.5; hol.value = 0.0; def.value = 0.0; curv.value = 0.0;
  }
  window.ch13_updateAscLab();
};

window.ch13_updateAscLab = function() {
  const elConf = document.getElementById('ch13-asc-conf');
  if (!elConf) return;
  const conf = parseFloat(elConf.value);
  const hol = parseFloat(document.getElementById('ch13-asc-hol').value);
  const def = parseFloat(document.getElementById('ch13-asc-def').value);
  const curv = parseFloat(document.getElementById('ch13-asc-curv').value);

  document.getElementById('ch13-asc-conf-val').innerText = conf.toFixed(1);
  document.getElementById('ch13-asc-hol-val').innerText = hol.toFixed(2);
  document.getElementById('ch13-asc-def-val').innerText = def.toFixed(2);
  document.getElementById('ch13-asc-curv-val').innerText = curv.toFixed(2);

  let stateTitle = "Baseline Wakefulness";
  let stateColor = "#20B2AA";
  let phenom = "Coherent, bounded multimodal percepts with stabilized Lawvere ego token e* and vanishing descent defect.";
  if (curv < 0.15) {
    stateTitle = "General Anesthesia / Coma (P₁ ⊕₁ P₂)";
    stateColor = "#94a3b8";
    phenom = "Collapse of non-Abelian commutators (Ω_int → 0): complete loss of phenomenal awareness (Φ_topos = 0) while isolated modular processing may persist.";
  } else if (conf >= 5.0) {
    stateTitle = "Psychedelic State — REBUS De-Encapsulation (Def. 13.26)";
    stateColor = "#9370DB";
    phenom = "5-HT₂A agonism relaxes high-level priors: 𝔇_relax unravels 0D Protosimplexe 𝒫 into Free_𝒪(x₁,…,x_m), causing ego dissolution (loss of e*) and cross-modal synesthesia.";
  } else if (hol > 0.6 || def > 0.8) {
    stateTitle = "Schizophrenia / Aberrant Salience (∮ A ≠ 0, Def ≠ 0)";
    stateColor = "#DC143C";
    phenom = "Breakdown of metrophoric holonomy loops (∮_𝒞 A ≠ 0) and divergent Čech overlap defect: loss of perceptual object constancy, hallucinations, impaired agency.";
  }

  const box = document.getElementById('ch13-asc-readout');
  if (box) {
    box.style.borderLeftColor = stateColor;
    box.innerHTML =
      `<b style="color:${stateColor};">${stateTitle}:</b> ` +
      `ConfIndex = <b>${conf.toFixed(1)}</b>, ∮_𝒞 A = <b>${hol.toFixed(2)}</b>, ‖Def_𝒰‖ = <b>${def.toFixed(2)}</b>, ‖Ω_int‖ = <b>${curv.toFixed(2)}</b>.<br>` +
      `${phenom}`;
  }
};

// ---------------------------------------------------------------------------
// IIFE BOILERPLATE: Combined-deck safe video control and widget initialization
// ---------------------------------------------------------------------------
(function() {
  function prepareVideos() {
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'auto';
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('muted', '');
      v.setAttribute('loop', '');
      v.setAttribute('preload', 'auto');
    });
  }

  function syncVideosToSlide() {
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
      || window.innerWidth <= 768;

    const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
    const winH = window.innerHeight || document.documentElement.clientHeight;
    const winW = window.innerWidth || document.documentElement.clientWidth;

    document.querySelectorAll('video').forEach(v => {
      let shouldPlay = false;
      if (isScroll) {
        const rect = v.getBoundingClientRect();
        const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
        shouldPlay = inView;
      } else {
        shouldPlay = current ? current.contains(v) : true;
      }

      if (shouldPlay) {
        v.muted = true;
        v.playsInline = true;
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      } else if (!v.paused) {
        v.pause();
      }
    });
  }

  // Ensure continuous sync on mobile scroll and touch gestures
  if (typeof window !== 'undefined') {
    window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
    window.__syn_video_sync_handlers.push(syncVideosToSlide);
    if (!window.__syn_video_scroll_hooked) {
      window.__syn_video_scroll_hooked = true;
      const runSync = () => {
        (window.__syn_video_sync_handlers || []).forEach(fn => {
          try { fn(); } catch (_) {}
        });
      };
      window.addEventListener('scroll', runSync, { passive: true });
      window.addEventListener('touchmove', runSync, { passive: true });
      window.addEventListener('resize', runSync, { passive: true });
      let synMediaUnlocked = false;
      function synUnlockMedia() {
        if (synMediaUnlocked) return;
        synMediaUnlocked = true;
        runSync();
      }
      document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
      document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
    }
  }

  function renderAllCh13Widgets() {
    if (window.ch13_updateWilsonLab) window.ch13_updateWilsonLab();
    if (window.ch13_updateConstancyLab) window.ch13_updateConstancyLab();
    if (window.ch13_selectGridCell) window.ch13_selectGridCell(1, 2, document.getElementById('ch13-cell-1-2'));
    if (window.ch13_updateDeTurckLab) window.ch13_updateDeTurckLab();
    if (window.ch13_updateCondensationLab) window.ch13_updateCondensationLab();
    if (window.ch13_updateLatticeDispersion) window.ch13_updateLatticeDispersion();
    if (window.ch13_updatePhiToposLab) window.ch13_updatePhiToposLab();
    if (window.ch13_updateAscLab) window.ch13_updateAscLab();
  }

  function bindControlsOnce() {
    document.querySelectorAll('input[type="range"], select, button').forEach(el => {
      if (el.dataset.synBound) return;
      el.dataset.synBound = '1';
      el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());
    });
  }

  let ch13Initialised = false;
  function initChapter13() {
    if (ch13Initialised) return;
    ch13Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh13Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter13);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter13();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter13();
  }
})();


// =========================================================================
// CHAPTER 13 3D ENGINE INJECTOR & RUNNER
// =========================================================================
const CH13_3D_STYLE = `
#ch13-3d-hud {
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

#ch13-3d-hud *, #ch13-3d-hud *::before, #ch13-3d-hud *::after {
  box-sizing: border-box;
}

#ch13-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch13-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch13-3d-hud.minimized .ch13-hud-body {
  display: none;
}

.ch13-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch13-hud-title {
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

.ch13-hud-title span:first-child {
  line-height: 1.15;
}

.ch13-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch13-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch13-hud-btn {
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

.ch13-hud-btn:hover, .ch13-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch13-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch13-canvas-wrap:active {
  cursor: grabbing;
}

#ch13-3d-hud.spotlight .ch13-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch13-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch13-overlay-bar {
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

.ch13-telemetry {
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

#ch13-node-inspector {
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

.ch13-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch13-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch13-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch13-scrubber .ch13-hud-btn {
  flex-shrink: 0;
}

#ch13-caption {
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
  #ch13-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch13-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch13-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch13-hud-controls {
    gap: 3px;
  }
  .ch13-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch13-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch13-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch13-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch13-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch13-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch13-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch13-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch13-hud-controls {
    gap: 3px;
  }
  .ch13-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch13-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch13-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch13-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch13-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch13-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch13-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch13-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH13_3D_HTML = `<div class="ch13-hud-header">

    <div class="ch13-hud-title">

      <span>👁️ Ch 13 · 3D Qualia, Φ_topos &amp; Ego Engine</span>

      <span id="ch13-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch13-hud-controls">

      <button class="ch13-hud-btn active" id="ch13-btn-orbit" onclick="toggleCh13Orbit()">⟳ Orbit</button>

      <button class="ch13-hud-btn" onclick="toggleCh13Spotlight()">⛶ Spotlight</button>

      <button class="ch13-hud-btn" id="ch13-btn-min" onclick="toggleCh13Minimize()">+</button>

    </div>

  </div>



  <div class="ch13-hud-body">

    <div class="ch13-canvas-wrap" id="ch13-canvas-wrap">

      <canvas id="ch13-3d-canvas"></canvas>

      <div class="ch13-overlay-bar">

        <div class="ch13-telemetry" id="ch13-telemetry">Hol_A(∂Σ) ≠ id | Φ_topos | e* : 1 → A</div>

        <div id="ch13-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch13-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <button class="ch13-hud-btn" title="Previous Stage" onclick="window.setCh13Stage(Math.round( parseFloat(document.getElementById('ch13-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch13-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh13Stage(this.value)">
      <button class="ch13-hud-btn" title="Next Stage" onclick="window.setCh13Stage(Math.round( parseFloat(document.getElementById('ch13-slider').value) ) + 1, true)">▶</button>

      <button class="ch13-hud-btn active" id="ch13-btn-sync" onclick="enableCh13Sync()">Auto-Sync</button>

    </div>



    <div id="ch13-caption">

      <b>Stage 1 (§13.1.1 — Thm. 13.2):</b> Non-Abelian Stokes–Wilson Quale Holonomy Hol_A(∂Σ) = 𝒫 exp(−∬ [a₁, a₂]) ≠ id_G.

    </div>

  </div>`;

function injectCh133DHUD() {
  if (document.getElementById('ch13-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH13_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch13-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH13_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch13_3d_engine_loaded) return;
  window.__ch13_3d_engine_loaded = true;

  function runCh13Engine() {
    injectCh133DHUD();
    if (window.__ch13_3d_engine_initialized) return;
    window.__ch13_3d_engine_initialized = true;

const canvas = document.getElementById('ch13-3d-canvas');

  const wrap = document.getElementById('ch13-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.50;

  let camPitch = 0.36;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§13.1.1 — Thm. 13.2 Stokes–Wilson Holonomy):</b> Flat channels (ℱ₁=ℱ₂=0) with [a₁,a₂]≠0 generate Hol_A(∂Σ) = 𝒫 exp(−∬[a₁,a₂]) ≠ id_G!",

    2: "<b>Stage 2 (§13.1.2–13.1.4 — Thms. 13.3–13.5 Zeitkorn, Constancy &amp; ToM):</b> Saccade loop ∮_𝒞 A = 0 &amp; two-sided affinity interface ker T_β = ker S_β = {0}.",

    3: "<b>Stage 3 (§13.1.5–13.1.6 — Thms. 13.6–13.8 BRST &amp; 3×3 Grid Â):</b> Observer-invariant H⁰_BRST(ℱ_ext) &amp; dimension-defect singularities A₁₂, A₂₂.",

    4: "<b>Stage 4 (§13.2.1 — Thms. 13.9–13.10 Morse Separatrix &amp; DeTurck):</b> Parabolic heat-smoothed contraction Φ_apex (k_M < 1) onto stationary ²ḡ_∞.",

    5: "<b>Stage 5 (§13.2.2 — Thm. 13.11 &amp; Def. 13.12 Postnikov Tower τ_{≤m}):</b> Filtering synaptic homotopy noise (π_k=0 for k>1) to π₁ rules &amp; π₀ concepts.",

    6: "<b>Stage 6 (§13.3.1–13.3.2 — Thms. 13.13–13.14 6D Phenomenal Field R₆):</b> N²(N−6)(N+2)=0 ⇒ R₆ = R₄ × S₂ (21 Sym + 15 Skew Affective Hermetry).",

    7: "<b>Stage 7 (§13.3.3–13.3.6 — Thms. 13.18–13.20 K₈ Harmonics &amp; DEC):</b> Orthonormal eigenmodes Sel(Ψ_k)=λ_kΨ_k on K₈ &amp; Stokes–Cartan d_τ∘ℛ_τ = ℛ_τ∘d.",

    8: "<b>Stage 8 (§13.4–13.5 — Def. 13.21 &amp; Thm. 13.22 Topos Φ_topos vs. IIT 4.0):</b> Polynomial O(N²) 3-node su(2) curvature triad vs. O(2^N) MIP explosion!",

    9: "<b>Stage 9 (§13.6.1 — Thm. 13.24 Lawvere Ego Fixed-Point Theorem):</b> Diagonal self-reflection Δ_A induces invariant Ego Token e* : 1 → A (f∘y* = y*)!",

    10: "<b>Stage 10 (§13.6.2–13.10 — Thm. 13.25 Active Inference &amp; Def. 13.26 REBUS):</b> Psychedelic de-encapsulation 𝔇_relax(𝒫), AST Firewall Auditor &amp; Appraisal Matrix!"

  };



  const STAGE_TELEMETRY = {

    1: "Hol_A(∂Σ) = 𝒫 exp(−∬_Σ [a₁, a₂]) ≠ id_G",

    2: "Hol_Syn(𝒞)(a) = a | ker T_β = ker S_β = {0}",

    3: "ℋ_phenom = H⁰_BRST(ℱ_ext) | π : ∫_Ctx Syn → Ctx",

    4: "‖Φ_apex(g₁) − Φ_apex(g₂)‖_{H^s} ≤ k_M ‖g₁−g₂‖",

    5: "τ_{≤m} ⊣ ι_m : Map(τ_{≤m}X, Y) ≃ Map(X, Y)",

    6: "R₆ = R₄ × S₂ | div_ḡ[Γ_(−)^(6,6)(G)] = 0",

    7: "d_τ ∘ ℛ_τ^k = ℛ_τ^{k+1} ∘ d | Λ_UV = 2√n/√τ | Λ_UV = 4/√τ",

    8: "Φ_topos = ‖Ω_int^𝒟‖_{L²} exp(−‖Def_U‖²/2σ²)",

    9: "Φ ∘ ⟨e*, e*⟩ = f(Φ ∘ ⟨e*, e*⟩) (Lawvere Thm. 13.24)",

    10: "𝔇_relax : CSeg(𝒳_syn) → Alg_{𝒪_syn} (REBUS)"

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



  // =========================================================================

  // STAGE RENDERERS (STAGES 1 TO 10)

  // =========================================================================



  // Stage 1: Non-Abelian Stokes-Wilson Quale Holonomy Hol_A(\partial\Sigma) = P\exp(-\iint [a_1, a_2]) (Thm. 13.2)

  function renderStage1(w, h) {

    // Plaquette Surface \Sigma \subset M_U at z = -0.85

    const s = 1.05;

    const pl = [proj(-s, -s, -0.85, w, h), proj(s, -s, -0.85, w, h), proj(s, s, -0.85, w, h), proj(-s, s, -0.85, w, h)];

    ctx.save();

    ctx.fillStyle = "rgba(65, 105, 225, 0.22)";

    ctx.strokeStyle = "#4169E1";

    ctx.lineWidth = 2.4;

    ctx.beginPath();

    ctx.moveTo(pl[0].sx, pl[0].sy);

    pl.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));

    ctx.closePath();

    ctx.fill();

    ctx.stroke();

    ctx.restore();



    // Lifted Wilson Loop Helix in Principal Fiber G accumulating phase \iint_\Sigma [a_1, a_2]

    ctx.beginPath();

    ctx.strokeStyle = "#20B2AA";

    ctx.lineWidth = 3.2;

    for (let i = 0; i <= 60; i++) {

      const t = i / 60;

      const a = t * Math.PI * 2;

      const p = proj(0.95 * Math.cos(a), 0.95 * Math.sin(a), -0.65 + t * 1.55, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    drawNode3D("W_Start", 0.95, 0, -0.65, 7.5, "#4169E1", "#fff", "Γ(0) = id_G", "Initial Fiber Reference Frame before parallel transport around ∂Σ", w, h);

    drawNode3D("W_End",   0.95, 0,  0.90, 9.5, "#FFD700", "#DC143C", "Hol_A(∂Σ) ≠ id_G", "Thm. 13.2 Pure Quale Commutator Phase Shift: 𝒫 exp(−∬_Σ [a₁,a₂]) ≠ id_G!", w, h);

    drawNode3D("W_Flux",  0.00, 0,  0.10, 8.5, "#DC143C", "#FFD700", "∬_Σ [a₁, a₂]", "Surface Integral of Non-Abelian Commutator 2-Form over Σ", w, h);

    drawLine3D(proj(0.95, 0, -0.65, w, h), proj(0.95, 0, 0.90, w, h), "#FFD700", 3.2, [4, 2]);

  }



  // Stage 2: Functorial Zeitkorn \delta t_n, Saccadic Object Constancy & Theory of Mind (Thms. 13.3-13.5)

  function renderStage2(w, h) {

    // Left: Saccadic Loop B_1 -> B_2 -> B_3 -> B_1 with zero holonomy defect \oint A = 0 (Thm. 13.4)

    const b1 = drawNode3D("Sac_B1", -1.25, -0.65, 0.3, 7.5, "#20B2AA", "#fff", "B₁ (Fovea 1)", "Saccade Fixation Frame B₁ in ∫_Ctx Syn", w, h);

    const b2 = drawNode3D("Sac_B2", -0.45,  0.85, 0.3, 7.5, "#20B2AA", "#fff", "B₂ (Fovea 2)", "Saccade Fixation Frame B₂: Hol_Syn(𝒞)(a) = a iff ∮_𝒞 A = 0 (Thm. 13.4)", w, h);

    const b3 = drawNode3D("Sac_B3", -0.35, -0.65, -0.6, 7.5, "#20B2AA", "#fff", "B₃ (Fovea 3)", "Saccade Fixation Frame B₃ (Perceptual Object Constancy)", w, h);

    drawLine3D(b1, b2, "#20B2AA", 2.6);

    drawLine3D(b2, b3, "#20B2AA", 2.6);

    drawLine3D(b3, b1, "#20B2AA", 2.6);



    // Right: Intersubjective Affinity Bridge \beta^\infty between \mathcal{E}_A and \mathcal{E}_B (Thm. 13.5)

    const eA = drawNode3D("ToM_A", 0.65, -0.65,  0.65, 9, "#4169E1", "#FFD700", "ℰ_A (Subject A)", "Autopsychological Topos ℰ_A with Metrophor Base F₀^A", w, h);

    const eB = drawNode3D("ToM_B", 1.25,  0.65, -0.55, 9, "#FFA500", "#FFD700", "ℰ_B (Subject B)", "Autopsychological Topos ℰ_B: ker(T_β) = ker(S_β) = {0} (Faithful Theory of Mind!)", w, h);

    drawLine3D(eA, eB, "#FFD700", 3.4);

  }



  // Stage 3 & 4: BRST Cohomology H^0_{BRST}, 3x3 Grid & DeTurck Parabolic Contraction (Thms. 13.6-13.10)

  function renderStage3And4(w, h, st) {

    const isStage4 = (st >= 3.5);

    // 3D DeTurck / BRST Funnel converging onto Gauge-Invariant Stationary Core

    for (let z = -0.9; z <= 0.91; z += 0.45) {

      const s = (z + 0.9) / 1.8;

      const rad = 0.22 + 1.05 * s;

      ctx.beginPath();

      ctx.strokeStyle = isStage4 ? "#20B2AA" : "#4169E1";

      ctx.lineWidth = 1.8;

      for (let i = 0; i <= 36; i++) {

        const a = (i / 36) * Math.PI * 2;

        const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    drawNode3D("Core_Inv", 0, 0, -0.9, 11, "#FFD700", "#20B2AA", isStage4 ? "²ḡ_∞ ∈ C^∞(ℳ) (k_M < 1)" : "H⁰_BRST = ker s / im s", isStage4 ? "Thm. 13.10 DeTurck Parabolic Smoothing Contraction onto Stationary Apex Metric!" : "Thm. 13.6 Observer-Invariant Phenomenal Cohomology (s_BRST² ≡ 0)", w, h);

    drawNode3D("Sing_A12", -1.15, 0.5, 0.75, 8, "#DC143C", "#fff", "⚠ A₁₂ / A₂₂ Singular", "Thm. 13.8 Dimension-Defect Topological Singularity (dim F(ℳ) ≠ dim ℳ)", w, h);
    if (!isStage4) {
      const pGh = drawNode3D("BRST_Gh", 1.10, -0.45, 0.65, 7.5, "#9370DB", "#FFD700", "s_BRST c = −½[c,c] (s²=0)", "Thm. 13.6 Faddeev–Popov Ghost/Antighost Quartet filtering subjective frame drift!", w, h);
      drawLine3D(pGh, proj(0, 0, -0.9, w, h), "#9370DB", 2.2, [3, 2]);
    } else {
      const pLy = drawNode3D("DeT_Lyap", 1.10, 0.45, 0.35, 8, "#20B2AA", "#FFD700", "V(t) ≤ V₀ e^{−2γt} (Sobolev H^s)", "Thm. 13.9–13.10 Exponential Lyapunov Decay along DeTurck Parabolic Flow!", w, h);
      drawLine3D(pLy, proj(0, 0, -0.9, w, h), "#20B2AA", 2.6);
    }

  }



  // Stage 5: Postnikov Homotopy Truncation Tower \tau_{\le m} \dashv \iota_m in \mathcal{X}_{syn} (Def. 13.12)

  function renderStage5(w, h) {

    const levels = [

      { z:  0.95, col: "#DC143C", rip: 0.32, id: "Post_Inf", lbl: "X ∈ 𝒳_syn (Raw ∞-Stack: π_k jitter)", info: "Unfiltered Sensory ∞-Stack containing high-frequency thermal/synaptic homotopy fluctuations" },

      { z:  0.00, col: "#20B2AA", rip: 0.08, id: "Post_1",   lbl: "τ_{≤1}(X) ∈ 𝒳_syn^{≤1} (π₁ Holonomy Rules)", info: "1-Truncation: Kills π_k = 0 for k ≥ 2 while preserving fundamental groupoid holonomy loops" },

      { z: -0.95, col: "#FFD700", rip: 0.00, id: "Post_0",   lbl: "τ_{≤0}(X) ≃ π₀(X) ∈ ℰ_syn (0D Concepts)", info: "0-Truncation: Collapses paths into discrete conceptual Protosimplex pointers in 1-topos ℰ_syn" }

    ];

    levels.forEach(lv => {

      ctx.beginPath();

      ctx.strokeStyle = lv.col;

      ctx.lineWidth = 2.4;

      for (let i = 0; i <= 48; i++) {

        const a = (i / 48) * Math.PI * 2;

        const r = 1.05 + lv.rip * Math.sin(a * 8 + timeSec * 4);

        const p = proj(r * Math.cos(a), r * Math.sin(a), lv.z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      drawNode3D(lv.id, 0, 0, lv.z, 8.5, lv.col, "#fff", lv.lbl, lv.info, w, h);

    });

  }



  // Stage 6 & 7: 6D Phenomenal Field R_6 = R_4 x S_2, K_8 Harmonics & Stokes-Cartan DEC (Thms. 13.13-13.20)

  function renderStage6And7(w, h, st) {

    const isStage7 = (st >= 6.5);

    // 2D Affective Sphere S_2(x_5 Valence, x_6 Arousal) / Compact Fiber K_8

    for (let lat = -45; lat <= 45; lat += 45) {

      const r = 0.95 * Math.cos(lat * Math.PI / 180);

      const z = 0.95 * Math.sin(lat * Math.PI / 180);

      ctx.beginPath();

      ctx.strokeStyle = "#20B2AA";

      ctx.lineWidth = 2.0;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const p = proj(r * Math.cos(a), r * Math.sin(a), z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    drawNode3D("R6_Core", 0, 0, 0, 11, "#FFD700", "#DC143C", isStage7 ? "Sel(Ψ_k) = λ_k Ψ_k on K₈" : "R₆ = R₄ × S₂ (N=6 Root)", isStage7 ? "Thm. 13.18 Discrete Orthonormal Eigenbasis on Compact K₈ & Thm. 13.19 Stokes–Cartan d_τ∘ℛ_τ = ℛ_τ∘d" : "Thm. 13.13 Phenomenal Condensation N²(N−6)(N+2)=0 ⇒ 36 = 21 Sym + 15 Skew Hermetry", w, h);

    drawNode3D("S2_Val", 1.15, 0, 0, 7.5, "#FFA500", "#fff", "x₅ Valence (Negentropy)", "Entelechial Valence Axis: ℒ_{X₅} S_therm ≤ −γV < 0", w, h);

    drawNode3D("S2_Aro", 0, 0, 1.15, 7.5, "#4169E1", "#fff", "x₆ Arousal (1/δt_n)", "Aeonic Arousal Axis & Intentional Agency Commutator [∂₅, ∂₆]", w, h);
    if (isStage7) {
      for (let m = 0; m < 6; m++) {
        const ang = timeSec * 0.6 + (m / 6) * Math.PI * 2;
        const pM = drawNode3D("K8_M" + m, 1.28 * Math.cos(ang), 1.28 * Math.sin(ang), 0.35 * Math.cos(ang * 2), 6, "#FFD700", "#fff", m === 0 ? "d_τ∘ℛ_τ = ℛ_τ∘d" : "", "Thm. 13.18–13.20 K₈ Eigenmode & Exact Stokes–Cartan DEC Coboundary Commutation!", w, h);
        drawLine3D(pM, proj(0, 0, 0, w, h), "rgba(255,215,0,0.5)", 1.8);
      }
    }

  }



  // Stage 8: Topos Integrated Information \Phi_{topos} (O(N^2)) vs Classical IIT 4.0 (O(2^N), Def. 13.21-Prop. 13.23)

  function renderStage8(w, h) {

    // 3-Node su(2) Bound Triad (\omega_1, \omega_2, \omega_3) with polynomial O(N^2) Lie Bracket Edges

    const n1 = drawNode3D("Phi_1", -1.10, -0.70, 0, 9, "#4169E1", "#fff", "Module V₁ (ω₁ T₁)", "Cortical Stream 1: su(2) Generator T₁ with strength ω₁", w, h);

    const n2 = drawNode3D("Phi_2",  1.10, -0.70, 0, 9, "#20B2AA", "#fff", "Module V₂ (ω₂ T₂)", "Cortical Stream 2: su(2) Generator T₂ with strength ω₂", w, h);

    const n3 = drawNode3D("Phi_3",  0.00,  1.05, 0, 9, "#FFA500", "#fff", "Module V₃ (ω₃ T₃)", "Cortical Stream 3: su(2) Generator T₃ with strength ω₃", w, h);



    drawLine3D(n1, n2, "#FFD700", 3.4);

    drawLine3D(n2, n3, "#FFD700", 3.4);

    drawLine3D(n3, n1, "#FFD700", 3.4);



    drawNode3D("Phi_Center", 0, -0.1, 0.35, 11.5, "#FFD700", "#DC143C", "Φ_topos = ½√(∑ ω_i²ω_j²) (O(N²))", "Thm. 13.22 & Prop. 13.23: Polynomial O(N²) Lie curvature + Čech descent replaces O(2^N) MIP cuts!", w, h);

  }



  // Stage 9: Lawvere Diagonal Ego Fixed-Point Theorem e* : 1 -> A (Thm. 13.24)

  function renderStage9(w, h) {

    // 3D Figure-Eight / Möbius Diagonal Self-Evaluation Loop \Delta_A : A -> A \times A -> \Omega

    ctx.beginPath();

    ctx.strokeStyle = "#FFD700";

    ctx.lineWidth = 3.2;

    for (let i = 0; i <= 80; i++) {

      const t = (i / 80) * Math.PI * 2;

      const x = 1.25 * Math.sin(t);

      const y = 0.85 * Math.sin(2 * t);

      const z = 0.55 * Math.cos(t + timeSec * 2);

      const p = proj(x, y, z, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    const pTerm = drawNode3D("Law_1", -1.25, 0, -0.65, 8, "#4169E1", "#fff", "Terminal 1", "Terminal Object 1 in Cartesian Closed Category 𝒞", w, h);

    const pEgo  = drawNode3D("Law_Ego", 0, 0, 0, 12, "#FFD700", "#DC143C", "Ego Token e* : 1 → A", "Thm. 13.24 Lawvere Fixed Point: Φ ∘ ⟨e*, e*⟩ = f(Φ ∘ ⟨e*, e*⟩) (Self-awareness without regress!)", w, h);

    const pOm   = drawNode3D("Law_Om",  1.25, 0,  0.65, 9, "#20B2AA", "#fff", "y* ∈ Ω (f ∘ y* = y*)", "Fixed Point in Internal Truth/Evaluation Object Ω under endomorphism f : Ω → Ω", w, h);



    drawLine3D(pTerm, pEgo, "#4169E1", 3.0);

    drawLine3D(pEgo, pOm, "#20B2AA", 3.0);

  }



  // Stage 10: Active Inference Descent, REBUS De-Encapsulation \mathfrak{D}_{relax} & Lean 4 Firewall (Def. 13.26)

  function renderStage10(w, h) {

    // Central Protosimplex \mathcal{P} blossoming outward under REBUS De-Encapsulation \mathfrak{D}_{relax}

    const pCore = drawNode3D("Reb_Core", 0, 0, 0, 10.5, "#FFD700", "#9370DB", "𝔇_relax(𝒫) = Free_{𝒪_syn}(x_i)", "Def. 13.26 REBUS De-Encapsulation: 5-HT₂A prior relaxation unravels 0D tokens into Tier-II syntax!", w, h);

    const expRad = 0.75 + 0.55 * (0.5 + 0.5 * Math.sin(timeSec * 2.2));

    for (let k = 0; k < 8; k++) {

      const a = timeSec * 0.8 + (k / 8) * Math.PI * 2;

      const x = expRad * Math.cos(a), y = expRad * Math.sin(a), z = 0.55 * Math.sin(a * 2 + timeSec);

      const pF = drawNode3D("Reb_" + k, x, y, z, 6, k % 2 === 0 ? "#20B2AA" : "#FFA500", "#fff", k === 0 ? "Unraveled Tier-II Syntax" : "", "Unraveled Micro-Circuit Filament flooding Global Workspace (Synesthesia / Ego Dissolution)", w, h);

      drawLine3D(pCore, pF, "#9370DB", 2.0, [3, 2]);

    }

  }



  // Master 60fps Loop

  function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch13-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }

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



    function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);

    else if (stInt === 2) renderStage2(w, h);

    else if (stInt === 3 || stInt === 4) renderStage3And4(w, h, stArg);

    else if (stInt === 5) renderStage5(w, h);

    else if (stInt === 6 || stInt === 7) renderStage6And7(w, h, stArg);

    else if (stInt === 8) renderStage8(w, h);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh13Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch13-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch13-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch13-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch13-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch13-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh13Stage = function(val) { window.setCh13Stage(val, true); };



  window.enableCh13Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch13-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh13WithDeck();

  };



  window.toggleCh13Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch13-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh13Spotlight = function() {

    const hud = document.getElementById('ch13-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh13Minimize = function() {

    const hud = document.getElementById('ch13-3d-hud');

    const b = document.getElementById('ch13-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh13WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch13-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-13, section[data-chapter="13"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.setCh13Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh13WithDeck = syncCh13WithDeck;
  }



  // 3D Orbit Drag, Wheel Zoom & Node Click Hit-Testing

  wrap.addEventListener('mousedown', e => {

    e.stopPropagation();

    isDragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mousemove', e => {

    if (!isDragging) return;

    camYaw += (e.clientX - lastX) * 0.012;

    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mouseup', () => { isDragging = false; });

  wrap.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    camYaw += dx * 0.012;
    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
  }, { passive: true });

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

    const insp = document.getElementById('ch13-node-inspector');

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



  function init() {

    resize();

    syncCh13WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_13 = false;
    const synBindSync_syncCh13WithDeck = () => {
      if (syncRaf_13) return;
      syncRaf_13 = true;
      requestAnimationFrame(() => {
        syncRaf_13 = false;
        syncCh13WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh13WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh13WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh13WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh13WithDeck, { passive: true });

    const revEl_syncCh13WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh13WithDeck) {
      revEl_syncCh13WithDeck.addEventListener('scroll', synBindSync_syncCh13WithDeck, { passive: true });
      revEl_syncCh13WithDeck.addEventListener('touchmove', synBindSync_syncCh13WithDeck, { passive: true });
    }
    const vpEl_syncCh13WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh13WithDeck) {
      vpEl_syncCh13WithDeck.addEventListener('scroll', synBindSync_syncCh13WithDeck, { passive: true });
      vpEl_syncCh13WithDeck.addEventListener('touchmove', synBindSync_syncCh13WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh13WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh13WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh13WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh13WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh13WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh13WithDeck);
    }

    const hud = document.getElementById('ch13-3d-hud');

    if (hud) {

      hud.querySelectorAll('input, button').forEach(el => {

        el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());

      });

    }

  }



  init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh13Engine);
  } else {
    runCh13Engine();
  }
})();


  function initCh13InlineMount() {
    document.querySelectorAll('.ch13-3d-Mount').forEach(el => {
      if (el.dataset.mounted === '1') return;
      el.dataset.mounted = '1';
      el.innerHTML = `<div style="background:rgba(10,15,28,0.92); border:1px solid rgba(255,215,0,0.45); border-radius:10px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div style="font-size:0.66em; color:#cbd5e1;">
          <b style="color:#FFD700;">👁️ Interactive 10-Stage 3D Qualia, Φ_topos &amp; Lawvere Ego Engine</b><br>
          <span>Synchronized across all 14 slides — inspect Stokes–Wilson holonomy, 6D R₆ Hermetry, and REBUS de-encapsulation in 3D.</span>
        </div>
        <button class="syn-btn" style="background:#FFD700; color:#000; font-weight:bold; white-space:nowrap;" onclick="if(window.toggleCh13Spotlight) window.toggleCh13Spotlight();">⛶ Launch 3D Spotlight</button>
      </div>`;
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCh13InlineMount);
  else initCh13InlineMount();

})();

/* ==========================================================================
 * CHAPTER 14 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
(function() {
  window.showGenericTab = window.showGenericTab || function(prefix, idx, maxIdx, btnEl) {
    for (let i = 1; i <= maxIdx; i++) {
      const p1 = document.getElementById(prefix + '-' + i);
      const p2 = document.getElementById(prefix + '-pane-' + i);
      if (p1) p1.classList.toggle('active', i === idx);
      if (p2) p2.classList.toggle('active', i === idx);
    }
    if (btnEl && btnEl.parentElement) {
      Array.from(btnEl.parentElement.children).forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch(() => {});
    }
  };

  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) {
      res = Math.round((res * (n - i + 1)) / i);
    }
    return res;
  }

  function fact(n) {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  // =========================================================================
  // WIDGET 1: §14.1 & Appendix E Concordance Functor Explorer (8 Clusters -> 9 Frameworks)
  // =========================================================================
  const clusterData = [
    {
      roman: "I", eqs: "SM Eqs. 1–4", ch: "Ch. 1 & App. A",
      title: "Epistemic Contexts, Aspect Systems & Quantifier Forcing",
      dom: "HeimCorpus(S, Pn, Dn, Kn, Quantoren)",
      cod: "Esyn = Sh(Ctx_adm^sk, Jsyn) in Ban_<=1",
      targets: [0, 8],
      desc: "Maps subjective aspect schemas S = [D_nn x K_n x P_nn] to structured Banach contexts U in Ctx_adm^sk, aspect transitions to pullback functors f*, and Polyquantors to product-slice Kripke–Joyal sheaf forcing."
    },
    {
      roman: "II", eqs: "SM Eqs. 5–9a", ch: "Ch. 2",
      title: "The Syntrix Triad, Operadic Algebras & Äondyne Bundles",
      dom: "HeimCorpus(ya = <f, a, m>, xS, Aeondynen)",
      cod: "Alg(Osyn), T_hom = T_frag o T_pyr, Grothendieck Fibration",
      targets: [1],
      desc: "Reconstructs the Syntrix triad as a free algebra over the completed colored Banach operad Osyn, Spaltbarkeit via Beck's Distributive Law lambda, and continuous Äondynen as Cartesian sections of the Grothendieck fibration."
    },
    {
      roman: "III", eqs: "SM Eqs. 10–13a", ch: "Ch. 3",
      title: "Corporate Pairings, Carrier Pushouts & Syntropod Networks",
      dom: "HeimCorpus(2x2 Korporator {Ks Cs; Km Cm}, Nullsyntrix, Conflexive Trees)",
      cod: "Kor_{r,Sigma} : Syn x Syn -> Syn (15 Classes: 9 Mixed / 6 Pure)",
      targets: [2],
      desc: "Decouples carrier operations into l1-coproducts C_m (dim p+q) and Exzenter span pushouts K_m (dim p+q-lambda), module operations into C_s and K_s, and networks into colimits over trees G_S with ConfIndex_pres = |E_K| + 1."
    },
    {
      roman: "IV", eqs: "SM Eqs. 14–19a", ch: "Ch. 4",
      title: "Sliced Topos Totalities, Diffeomorphism Flows & Gauge Curvature",
      dom: "HeimCorpus(Generative G, Enyphanen E, Holoformen, Affinitaet)",
      cod: "Esyn/y(U_G), Diff(M) Flows Phi_t^X, Non-Abelian Residual Omega_int^D",
      targets: [3, 8],
      desc: "Formalizes the Generative G as a presentation blueprint for slice topos T0, Enyphanie as non-Abelian interaction curvature Omega_int^D = F_A - sum F_k^(A0), Holoforms via Delta_emerg^I > 0, and affinity as non-degenerate bilinear pairings."
    },
    {
      roman: "V", eqs: "SM Eqs. 20–27", ch: "Ch. 5 & Ch. 6",
      title: "Metroplex Hierarchies, Operadic Bridges & Higher Topos Towers",
      dom: "HeimCorpus(Hypersyntrix M1, Metroplex Mn, Syntrokline Bruecken, Area AR_q)",
      cod: "CSeg(Xsyn), Met_n(Xsyn), Adjunction (phi_!) -| (phi^*), Final Coalgebra nu T",
      targets: [4],
      desc: "Lifts base syntrices into complete Segal spaces CSeg(Xsyn) inside the (infty,1)-topos Xsyn, models syntroclinic bridges as change-of-operad adjunctions, and formalizes the aeonische Area AR_q and Telezentren via terminal coalgebras."
    },
    {
      roman: "VI", eqs: "SM Eqs. 28–62", ch: "Ch. 7, Ch. 8 & Ch. 9",
      title: "Continuous Parameter Spaces, Differential Functors & Metric Cascades",
      dom: "HeimCorpus(yR_n, d|, I, 36-Hermetry ^2g, Q_(mu,gamma), Strukturkaskade)",
      cod: "DimField_Lambda -> Ban_<=1, Frechet Calculus, Met(R_4 x S_2), Contraction Phi_M",
      targets: [5],
      desc: "Bridges realified parameter continua R_n and nuclear Frechet calculus to the 36-component non-Hermitian metric ^2g = ^2g_+ + ^2g_- on R_6, divergence-free Einstein conservation (SM-49), and Banach contraction cascades."
    },
    {
      roman: "VII", eqs: "SM Eqs. 63–83", ch: "Ch. 10",
      title: "Metronic Lattice Quantization, Difference Calculus & Discrete Vector Analysis",
      dom: "HeimCorpus(x_i = alpha_i N_i, Metron tau, nabla, S, GRAD_L, DIV_L, ROT_L)",
      cod: "Lattice M_tau^n = oplus tau_i Z, l^infty(M_tau^n), DEC Cochain Complex (Omega_d^*, d_tau)",
      targets: [6],
      desc: "Replaces smooth manifolds at the Uebergangskriterium chi*sqrt(|g|)=1 with the discrete lattice M_tau^n, backward differences nabla = I - E^-1, summation S (nabla o S = id), and Discrete Exterior Calculus with d_tau^2 = 0."
    },
    {
      roman: "VIII", eqs: "SM Eqs. 84–100a", ch: "Ch. 11 & App. B",
      title: "Metric Selectors, Non-Hermitian Hermetry & Closed Mass Spectrum",
      dom: "HeimCorpus(^2gamma;n, Spin Rotor s_hat, ^4zeta, ^4F = 0, L_p = binom(6,p))",
      cod: "Self-Adjoint Selectors on H_E = L^2(M,E), ker(^4F), Mass Formula m(p, lambda_k)",
      targets: [7, 8],
      desc: "Condenses R_12 -> R_6 (N=6), evaluates discrete lattice geodesics and curvature compression ^4zeta_tau (converging to ^4R as tau -> 0), and extracts the discrete particle mass spectrum from the null stability kernel ker(^4F) across L_p = binom(6,p)."
    }
  ];

  const fwNames = [
    "1. Topos Logic E_syn (Ch. 1, App. A)",
    "2. Colored Operads O_syn (Ch. 2)",
    "3. Corporate Algebra Syn (Ch. 3)",
    "4. Gauge Geometry F_A (Ch. 4)",
    "5. (∞,1)-Topos X_syn (Ch. 5, 6)",
    "6. Metric Bundles ²g̅ (Ch. 7–9)",
    "7. DEC Lattices M_τⁿ (Ch. 10)",
    "8. Selector Matter m(p,ŝ) (Ch. 11, App. B)",
    "9. Cognition & Horizon (Ch. 12–15, App. C–E)"
  ];

  let activeClusterIdx = 0;

  window.ch14_selectCluster = function(idx) {
    if (typeof idx === 'number') activeClusterIdx = idx;
    const svg = document.getElementById('ch14-concordance-svg');
    const readout = document.getElementById('ch14-concordance-readout');
    if (!svg || !readout) return;

    for (let i = 0; i < 8; i++) {
      const btn = document.getElementById('ch14-cl-btn-' + i);
      if (btn) {
        if (i === activeClusterIdx) {
          btn.style.background = '#FFD700';
          btn.style.color = '#000';
          btn.style.fontWeight = 'bold';
        } else {
          btn.style.background = '#151c2c';
          btn.style.color = '#e2e8f0';
          btn.style.fontWeight = 'normal';
        }
      }
    }

    const c = clusterData[activeClusterIdx];
    let html = `
      <rect x="6" y="10" width="128" height="190" rx="6" fill="#111827" stroke="#64748b" stroke-width="1.5"/>
      <text x="70" y="26" fill="#FFD700" font-size="9.5" font-weight="bold" text-anchor="middle">Heim Corpus (D)</text>
    `;
    for (let i = 0; i < 8; i++) {
      const y = 42 + i * 19;
      const isSel = (i === activeClusterIdx);
      html += `
        <rect x="12" y="${y - 10}" width="116" height="15" rx="3" fill="${isSel ? 'rgba(255,215,0,0.25)' : '#1e293b'}" stroke="${isSel ? '#FFD700' : '#334155'}" stroke-width="${isSel ? '1.5' : '0.8'}"/>
        <text x="70" y="${y}" fill="${isSel ? '#FFD700' : '#94a3b8'}" font-size="7.8" font-weight="${isSel ? 'bold' : 'normal'}" text-anchor="middle">Cluster ${clusterData[i].roman}: ${clusterData[i].eqs.replace('SM ', '')}</text>
      `;
    }

    // Central branch point R
    const bx = 195, by = 105;
    const ay = 42 + activeClusterIdx * 19 - 2;
    html += `
      <path d="M 134,${ay} C 162,${ay} 165,${by} ${bx},${by}" fill="none" stroke="#FFD700" stroke-width="2.4"/>
      <circle cx="${bx}" cy="${by}" r="14" fill="#1e1b4b" stroke="#FFD700" stroke-width="2"/>
      <text x="${bx}" y="${by + 4}" fill="#FFD700" font-size="10.5" font-weight="bold" text-anchor="middle">ℛ</text>
    `;

    // 9 Target Frameworks on the right
    for (let j = 0; j < 9; j++) {
      const ty = 20 + j * 21;
      const hit = c.targets.indexOf(j) !== -1;
      html += `
        <path d="M ${bx + 14},${by} C 232,${by} 232,${ty} 258,${ty}" fill="none" stroke="${hit ? '#20B2AA' : '#334155'}" stroke-width="${hit ? '2.4' : '0.9'}" stroke-dasharray="${hit ? 'none' : '2,2'}"/>
        <rect x="258" y="${ty - 8}" width="194" height="16" rx="3" fill="${hit ? 'rgba(32,178,170,0.25)' : '#0f172a'}" stroke="${hit ? '#20B2AA' : '#334155'}" stroke-width="${hit ? '1.6' : '0.8'}"/>
        <text x="264" y="${ty + 3}" fill="${hit ? '#5eead4' : '#64748b'}" font-size="7.6" font-weight="${hit ? 'bold' : 'normal'}">${fwNames[j]}</text>
      `;
    }
    svg.innerHTML = html;

    readout.innerHTML =
      `<div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px;">` +
      `<span><b style="color:#FFD700;">Cluster ${c.roman} (${c.eqs} → ${c.ch}):</b> ${c.title}</span>` +
      `<span style="color:#5eead4;"><b>Typed Morphism:</b> $\\mathcal{R}_{\\mathrm{${c.roman}}} \\colon \\mathbf{D} \\rightsquigarrow \\mathbf{A,B,C}$</span>` +
      `</div>` +
      `<div style="margin-top:4px; color:#cbd5e1;"><b>Domain (D):</b> <code>${c.dom}</code> &nbsp;|&nbsp; <b>Codomain (A/B):</b> <code>${c.cod}</code></div>` +
      `<div style="margin-top:3px; color:#94a3b8;">${c.desc}</div>`;
  };

  // =========================================================================
  // WIDGET 2: §14.2.1 (Part I) Source Formula Inspector (SM Eqs. 1–27)
  // =========================================================================
  const eqPart1List = [
    { tag: "SM Eq. 1", cl: "Cluster I (Ch. 1)", src: "S ≡ ⌈D_nn × K_n × P_nn⌉ ≡ ⌈ζ_n, [(α,d,β)_q]_n × [(y,χ,r)_q]_n F(ζ_n,z_n) × z_n, [(a,f,b)_q]_n⌉", rec: "Structured Context Object U ∈ Obj(Ctx_adm^sk) in Ban_<=1 with contraction K : D ⊗̂_π P → C and isometric ciphers z, ζ (Def. 1.7)." },
    { tag: "SM Eq. 2", cl: "Cluster I (Ch. 1)", src: "a, Q[AS]_γ b ∨ F(a_i)_1^p, Q[AS]_γ, Φ(b_k)_1^q", rec: "Context morphism α : V → U in Ctx_adm^sk inducing pullback base-change functor f* : E_syn/U → E_syn/V." },
    { tag: "SM Eq. 3", cl: "Cluster I (Ch. 1)", src: "( )_ρ, Q_{ρ,1}^r(A_ρ), ( )_ρ", rec: "Local Kripke–Joyal sheaf forcing judgment U ⊩ φ(s) over the internal Heyting algebra Ω(U)." },
    { tag: "SM Eq. 4", cl: "Cluster I (Ch. 1)", src: "( )_ρ, Q_{f_ρ,1}^r(A_ρ), ( )_ρ ∨ β_ρ ≡ f_ρ; α_ρ ∨ α_ρ ≡ A_ρ ∨ β_ρ ≡ B_ρ", rec: "Polyquantor product-slice forcing ∏_{i=1}^r V_i ⊩ φ equipped with transition cocycles across observer overlaps." },
    { tag: "SM Eq. 5", cl: "Cluster II (Ch. 2)", src: "yã ≡ (f, ã, m) ∨ ã ≡ (a_i)_n ∨ F_1 ≡ f(a_k)_1^m ∨ 1 ≤ m ≤ n", rec: "Free algebra over completed symmetric colored Banach operad O_syn on color profile (γ,…,γ; γ+1)." },
    { tag: "SM Eq. 5a", cl: "Cluster II (Ch. 2)", src: "H(yã) = ⟨(f, ã) m⟩", rec: "Homogeneous Syntrix Monad Algebra for composite monad T_hom := T_frag ∘ T_pyr under Beck's Distributive Law λ (Spaltbarkeit)." },
    { tag: "SM Eq. 6", cl: "Cluster II (Ch. 2)", src: "ã ≡ (a_i)_n ∨ n ≥ 1", rec: "Non-trivial carrier existence axiom dim P^U ≥ 1 in FinBan_<=1 (excluding the degenerate zero context)." },
    { tag: "SM Eq. 7", cl: "Cluster II (Ch. 2)", src: "ã ≡ (A_i, a_i, B_i)_n", rec: "Closed convex interval state space S(P_n) := ∏_{q=1}^n I(ℝ) ⊂ P_n." },
    { tag: "SM Eq. 8", cl: "Cluster II (Ch. 2)", src: "(f̲, m̲) ≡ ∫_{γ=1}^χ (f_γ, m_γ)|_{χ(γ-1)}^{χ(γ)} ã| ≡ ⟨f̲, ã, m̲⟩", rec: "Piecewise-color filtered operad algebra with stage partition intervals I_k := [χ(k-1), χ(k)-1]." },
    { tag: "SM Eq. 9", cl: "Cluster II (Ch. 2)", src: "(yã) ≡ ⟨f, (ã), m⟩ ∨ (ã) ≡ (a_i(t_{(i)j})_1^{n_i})_n ∨ α_{(i)j}, t_{(i)j}, β_{(i)j}", rec: "Primigene Äondyne: Cartesian fiber section S̲ ∈ Obj(Syn(U)) over smooth parameter manifold M_U in Grothendieck fibration ∫_Ctx Syn → Ctx." },
    { tag: "SM Eq. 9a", cl: "Cluster II (Ch. 2)", src: "S̲ ≡ ⟨f, (ã), m⟩ ∨ S̅ ≡ ⟨(f), ã, m⟩ ∨ S̲̅ ≡ ⟨(f), (ã), m⟩", rec: "Regel- & Ganzläufige Äondynen: Smooth families of colored operad operations t' ↦ f(t') ∈ C^0(M'_U, O_syn)." },
    { tag: "SM Eq. 10", cl: "Cluster III (Ch. 3)", src: "ã {K_m C_m} b̃, Q[CS]_γ, c̃ ∨ (f̲, m̲), {K_s C_s}, (φ̲, μ̲), Q[AS]_γ, (G̲, N̲)", rec: "Decoupled carrier coproduct C_m (P_a ⊕_1 P_b) / pushout K_m (P_a ⊞_φ P_b) and graded module direct sum C_s / projective tensor K_s." },
    { tag: "SM Eq. 11", cl: "Cluster III (Ch. 3)", src: "⟨(f̲ ã) m̲⟩ {K_s C_s ; K_m C_m} ⟨(φ̲ b̃) μ̲⟩, Q[CS_c]_γ, ⟨(G̲ c̃) N̲⟩", rec: "Universal 2×2 Corporate Pairing Functor Kor_{r,Σ_r}(S_a, S_b) ∈ Syn: deterministic across 15 combinatorial classes (9 Mixed / 6 Pure)." },
    { tag: "SM Eq. 11a", cl: "Cluster III (Ch. 3)", src: "yã { } yb̃, ⊨, yc̅̃ ∨ yc̅̃ ≡ ⟨f̲̅ c̃ m̲̅⟩", rec: "Zero Object (Nullsyntrix) 0_Syn := (0_Ctx, {0}_{γ≥0}, 0, id_{0}), both initial and terminal in Syn." },
    { tag: "SM Eq. 11b", cl: "Cluster III (Ch. 3)", src: "⟨(f̲ ã) m̲⟩, ⊨, yã_1 { } … { } yã_k { } … { } yã", rec: "Finite Corporate Chain Decomposition of homogeneous syntrices terminating in Nullsyntrix under complexity measure μ(S)." },
    { tag: "SM Eq. 11c", cl: "Cluster III (Ch. 3)", src: "yã, ⊨, yã_(1) { } yã_(2) { } yã_(3) { } yã_(4)", rec: "Colimit decomposition into the 4 elementary selection representations Sel_{ε,ρ}^{(m)}(V) ∈ {Sym^m, Λ^m, V^{⊗̲m}, V^{⊗m}}." },
    { tag: "SM Eq. 12", cl: "Cluster III (Ch. 3)", src: "yã^{(k)}{ }^{(l)} yb̃, ⊨, yc̃  (source p. 56 has a repeated-c slip)", rec: "Conflexive Corporate Pairing with span pushout over coupling node R_φ → P_a, P_b at grades (k, l)." },
    { tag: "SM Eq. 13", cl: "Cluster III (Ch. 3)", src: "(ã_i^{(k_i)} { }_i^{(l_{i+1})} ã_{i+1}]_{i=1}^{N-1}, ⊨, c̃  (untagged display, SM p. 58)", rec: "Colimit of decorated corporate interaction tree G_S = (V, E_C ⊔ E_K, Σ) with presentation index ConfIndex_pres = |E_K| + 1." },
    { tag: "SM Eq. 13a", cl: "Cluster III (Ch. 3)", src: "⌞, yã, ⊨, yc̃ ∨ ⌞ ≡ (( )_i^{(k_i)}{ }_i^{(l_{i+1})}( )_{i+1}]_{i=1}^{N-1}", rec: "Total Conflexive Syntrix: Higher operadic corporate pairing whose internal arguments are composite interaction trees." },
    { tag: "SM Eq. 14", cl: "Cluster IV (Ch. 4)", src: "G ≡ [P_i|_1^4 { }_{(j)}|_1^Q]_{(A,S)}", rec: "Generative Presentation Blueprint inducing context object U_G ∈ Ctx_adm^sk and slice topos E_syn / y(U_G) (Syntrixtotalität T0)." },
    { tag: "SM Eq. 15", cl: "Cluster IV (Ch. 4)", src: "yã, ⊨, yc̃(⌞_j( )]_1^n ∨ yβ̃, ⊨, yã, yb̃", rec: "Discrete Enyphansyntrix: Sequential corporate selection program operating in the slice topos Sh(Ctx_{/U_G})." },
    { tag: "SM Eq. 16", cl: "Cluster IV (Ch. 4)", src: "yF̃ ε yf̃ → yf̅̃ ∨ (G_k, ε]_1^n ≡ E ∨ yF̃ ε yf̃, ⊨, E, yf̃", rec: "1-Parameter Automorphism Flow Φ_t^X := (φ_t^X)* : C^∞(M) → C^∞(M) generated by complete Lie derivation X ∈ X(M)." },
    { tag: "SM Eq. 16a", cl: "Cluster IV (Ch. 4)", src: "E^{-1}, E, yf̃, ⊨, yf̃", rec: "Group Inversion in Diffeomorphism Group: (Φ_t^X)^{-1} = Φ_{-t}^X = Φ_t^{-X} ∈ Diff(M)." },
    { tag: "SM Eq. 17–17a", cl: "Cluster IV (Ch. 4)", src: "yC̃ ≡ yc̃, ⌞̲ E, ⊨, (yã_i ⌞_i yã_{i+1}]_1^{N-1} ⌞( )⌞̲ E", rec: "Continuous Enyphansyntrix & Holoform Coupling: Smooth vector field derivation modulating a corporate network with non-Abelian gauge curvature Ω_int^D." },
    { tag: "SM Eq. 18–18a", cl: "Cluster IV (Ch. 4)", src: "yf̃, (yã_ς)_1^r, ⊨, yÃ ∨ yf̃ ≡ yc̃ C(( )⌞_ς( )]_1^{r-1}", rec: "Syntrix Functor Pushout Endofunctor YF_model(f) := B ⊔_{C_0} f^{⊗r} generating discrete time granules δt_n = τ(n+1) - τ(n)." },
    { tag: "SM Eq. 19–19a", cl: "Cluster IV (Ch. 4)", src: "S ≡ (yã_i / m_{(λ)γ_i} |_{i=1}^N |_{γ_i=0}^{k_i})_{λ=1}^L", rec: "Stabilized Affinity Bilinear Interface β^∞ ∈ ∏ Bil_<=1(F_γ, B; ℝ) with two-sided non-degeneracy ker T_β = {0}, ker S_β = {0}." },
    { tag: "SM Eq. 20–20b", cl: "Cluster V (Ch. 5)", src: "M^1(a) ≡ ⟨(F̲, wã) r̲⟩ ∨ wã ≡ (yã_i)_N ; M^1(a) {K_s C_s ; K_m C_m} M^1(b), ⊨, M^1(c)", rec: "Hypersyntrix M^1: Internal category object in Cat_∞(X_syn) := CSeg(X_syn) via nerve embedding N_1 and higher corporate pairings." },
    { tag: "SM Eq. 21–24", cl: "Cluster V (Ch. 5)", src: "yã ≡ M^0(a) ; M^{n+1}(a) ≡ ⟨M^n(F), M^{ñ}(a) r̲⟩ ∨ 1 ≤ p ≤ 4", rec: "Metroplex Hierarchy: Sequence of full sub-∞-categories Met_n(X_syn) ↪ Alg_{O_n}(X_syn) in the ambient (∞,1)-topos X_syn." },
    { tag: "SM Eq. 25–25a", cl: "Cluster V (Ch. 5)", src: "B_{n+N}(α) ≡ K_n^{n+N} M^n(a) [ (M_{n-1}(φ)) (M_{n-1}(f̲), m̲) (M_n(f̲), r̲) (M_{n+1}(f̲), p) ]", rec: "Syntroclinic Bridge Adjunction: Change-of-operad extension and restriction functors (φ_{n,n+N})_! ⊣ (φ_{n,n+N})*." },
    { tag: "SM Eq. 26", cl: "Cluster V (Ch. 5)", src: "B_{ñ}(a) ≡ M^n(a) E N B_{p+q}(b) ∨ p + q ≤ n ∨ q > 0", rec: "Endogenous Combination Operator EN_{p,q}^n on graded domain p + q ≤ n, q > 0." },
    { tag: "SM Eq. 27", cl: "Cluster V (Ch. 6)", src: "AR_q ≡ AR_{(T)}^{(T')} [(AR_{q-1})_{γ_{q-1}}]_1^{P_{q-1}} ∨ AR_1 ≡ AR_{(T)}^{(T')}[M^n(a̲)(t_i)_1^Q]", rec: "Area Recurrence Hierarchy: Iterated fiber bundles of parameterized dynamical flows (M_AR^{(q)}, g_AR, Φ_t) oriented between telecentric attractors." }
  ];

  window.ch14_inspectSourceEqPart1 = function() {
    const el = document.getElementById('ch14-eq1-idx');
    const lbl = document.getElementById('ch14-eq1-val');
    const out = document.getElementById('ch14-eq1-readout');
    if (!el || !out) return;
    const idx = Math.max(0, Math.min(eqPart1List.length - 1, parseInt(el.value) || 0));
    const item = eqPart1List[idx];
    if (lbl) lbl.innerText = item.tag;
    out.innerHTML =
      `<div style="display:flex; justify-content:space-between; margin-bottom:4px;">` +
      `<b style="color:#FFD700; font-size:1.05em;">${item.tag}</b>` +
      `<span style="color:#5eead4; font-weight:bold;">${item.cl}</span>` +
      `</div>` +
      `<div style="background:#070b14; border:1px solid #334155; border-radius:5px; padding:5px 8px; font-family:monospace; color:#f8fafc; margin-bottom:5px;">` +
      `<b>Source (D):</b> ${item.src}` +
      `</div>` +
      `<div style="color:#cbd5e1;"><b>Modern Reconstruction $\\mathcal{R}$ (A/B/C):</b> ${item.rec}</div>`;
  };

  // =========================================================================
  // WIDGET 3: §14.2.4–14.2.5 Corporate Pairing, Conflexivity & Gauge Curvature Lab
  // =========================================================================
  let korMode = 'Km';
  window.ch14_setKorMode = function(m) {
    korMode = m;
    window.ch14_updateKorporatorGauge();
  };

  window.ch14_updateKorporatorGauge = function() {
    const elP = document.getElementById('ch14-kor-p');
    if (!elP) return;
    const p = parseInt(elP.value) || 4;
    const q = parseInt(document.getElementById('ch14-kor-q').value) || 4;
    const lamIn = document.getElementById('ch14-kor-lam');
    const maxLam = Math.min(p, q) - 1;
    lamIn.max = Math.max(1, maxLam);
    const lam = korMode === 'Cm' ? 0 : Math.min(maxLam, parseInt(lamIn.value) || 1);
    const ek = parseInt(document.getElementById('ch14-kor-ek').value) || 3;
    const gNorm = parseFloat(document.getElementById('ch14-kor-gnorm').value) || 1.2;

    document.getElementById('ch14-kor-p-val').innerText = p;
    document.getElementById('ch14-kor-q-val').innerText = q;
    document.getElementById('ch14-kor-lam-val').innerText = lam;
    document.getElementById('ch14-kor-ek-val').innerText = ek;
    document.getElementById('ch14-kor-gnorm-val').innerText = gNorm.toFixed(1);

    const btnCm = document.getElementById('ch14-btn-cm');
    const btnKm = document.getElementById('ch14-btn-km');
    if (btnCm && btnKm) {
      if (korMode === 'Cm') {
        btnCm.style.background = '#FFD700'; btnCm.style.color = '#000'; btnCm.style.fontWeight = 'bold';
        btnKm.style.background = '#151c2c'; btnKm.style.color = '#e2e8f0'; btnKm.style.fontWeight = 'normal';
      } else {
        btnKm.style.background = '#FFD700'; btnKm.style.color = '#000'; btnKm.style.fontWeight = 'bold';
        btnCm.style.background = '#151c2c'; btnCm.style.color = '#e2e8f0'; btnCm.style.fontWeight = 'normal';
      }
    }

    const dimCarrier = p + q - lam;
    const confIdx = ek + 1;
    const gE = (gNorm * gNorm).toFixed(2);
    const deltaEmerg = (0.5 * gNorm * gNorm).toFixed(2);

    const svg = document.getElementById('ch14-kor-svg');
    if (svg) {
      let s = `<rect x="4" y="4" width="222" height="102" rx="6" fill="#070a12" stroke="#334155"/>`;
      // Draw carrier pushout on left half
      s += `<circle cx="42" cy="54" r="24" fill="rgba(65,105,225,0.28)" stroke="#4169E1" stroke-width="1.8"/>`;
      const cx2 = korMode === 'Cm' ? 98 : 70;
      s += `<circle cx="${cx2}" cy="54" r="24" fill="rgba(32,178,170,0.28)" stroke="#20B2AA" stroke-width="1.8"/>`;
      if (korMode === 'Km') {
        s += `<text x="56" y="57" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">R_φ(${lam})</text>`;
      }
      s += `<text x="70" y="96" fill="#cbd5e1" font-size="8.5" text-anchor="middle">dim P = ${dimCarrier}</text>`;

      // Draw interaction tree & gauge curvature on right half
      const tx0 = 135, ty0 = 54;
      for (let i = 0; i < Math.min(ek + 1, 6); i++) {
        const ang = (i / Math.min(ek + 1, 6)) * 2 * Math.PI;
        const nx = (172 + 28 * Math.cos(ang)).toFixed(1);
        const ny = (50 + 26 * Math.sin(ang)).toFixed(1);
        s += `<line x1="172" y1="50" x2="${nx}" y2="${ny}" stroke="#FFA500" stroke-width="1.6"/>`;
        s += `<circle cx="${nx}" cy="${ny}" r="4.5" fill="#FFD700"/>`;
      }
      s += `<circle cx="172" cy="50" r="${(6 + gNorm * 3.5).toFixed(1)}" fill="rgba(220,20,60,0.28)" stroke="#DC143C" stroke-width="1.6"/>`;
      s += `<text x="172" y="96" fill="#FFA500" font-size="8.5" text-anchor="middle">ConfIdx=${confIdx} | g_E=${gE}</text>`;
      svg.innerHTML = s;
    }

    const box = document.getElementById('ch14-kor-readout');
    if (box) {
      box.innerHTML =
        `<b>Cluster III (SM Eqs. 10–13a):</b> ${korMode === 'Cm' ? 'Konzenter Coproduct $P_a \\oplus_1 P_b$' : 'Exzenter Span Pushout $P_a \\boxplus_\\phi P_b$'} ⇒ <b>dim = ${p} + ${q} - ${lam} = <span style="color:#FFD700;">${dimCarrier}</span></b> | Tree Conflexivity $\\operatorname{ConfIndex}_{\\mathrm{pres}} = |E_K| + 1 = \\mathbf{${confIdx}}$<br>` +
        `<b>Cluster IV (SM Eqs. 14–19a):</b> Enyphanie Curvature Density $g_E^{\\mathcal{D}} = c_E\\|\\mathbf{\\Omega}_{\\mathrm{int}}^{\\mathcal{D}}\\|^2 = \\mathbf{${gE}}$ | Holoform Emergence $\\Delta_{\\mathrm{emerg}}^{\\mathcal{I}} = \\mathbf{+${deltaEmerg}} > 0$ ${gNorm > 0.05 ? '<span style="color:#20B2AA;"><b>(HOLOFORM STABILIZED)</b></span>' : '<span style="color:#94a3b8;">(Decoupled Aggregate)</span>'}`;
    }
  };

  // =========================================================================
  // WIDGET 4: §14.2.6 Cluster V Metroplex Bridge & Endogenous Operator EN_{p,q}^n
  // =========================================================================
  window.ch14_updateMetroplexBridge = function() {
    const elN = document.getElementById('ch14-met-n');
    if (!elN) return;
    const n = parseInt(elN.value) || 3;
    const capN = parseInt(document.getElementById('ch14-met-capn').value) || 2;
    const p = parseInt(document.getElementById('ch14-met-p').value) || 1;
    const q = parseInt(document.getElementById('ch14-met-q').value) || 1;

    document.getElementById('ch14-met-n-val').innerText = n;
    document.getElementById('ch14-met-capn-val').innerText = capN;
    document.getElementById('ch14-met-p-val').innerText = p;
    document.getElementById('ch14-met-q-val').innerText = q;

    const targetGrade = n + capN;
    const pqSum = p + q;
    const enValid = (pqSum <= n) && (q > 0);

    const svg = document.getElementById('ch14-met-svg');
    if (svg) {
      let s = `<rect x="4" y="4" width="232" height="102" rx="6" fill="#070a12" stroke="#334155"/>`;
      const maxG = Math.max(targetGrade, 6);
      for (let k = 0; k <= maxG; k++) {
        const x = 18 + (k / maxG) * 196;
        const isBase = (k === n);
        const isTop = (k === targetGrade);
        const isSub = (k === pqSum);
        const col = isTop ? '#FFD700' : (isBase ? '#4169E1' : (isSub ? '#20B2AA' : '#334155'));
        s += `<line x1="${x.toFixed(1)}" y1="22" x2="${x.toFixed(1)}" y2="82" stroke="${col}" stroke-width="${(isBase || isTop) ? '2.5' : '1.2'}"/>`;
        s += `<circle cx="${x.toFixed(1)}" cy="52" r="${(isBase || isTop) ? '6.5' : '4'}" fill="${col}"/>`;
        s += `<text x="${x.toFixed(1)}" y="95" fill="${col}" font-size="8" font-weight="bold" text-anchor="middle">M${k}</text>`;
      }
      const x1 = 18 + (n / maxG) * 196;
      const x2 = 18 + (targetGrade / maxG) * 196;
      s += `<path d="M ${x1.toFixed(1)},44 Q ${((x1+x2)/2).toFixed(1)},12 ${x2.toFixed(1)},44" fill="none" stroke="#FFD700" stroke-width="2.2"/>`;
      s += `<text x="${((x1+x2)/2).toFixed(1)}" y="20" fill="#FFD700" font-size="8.2" font-weight="bold" text-anchor="middle">(φ_{${n},${targetGrade}})_! ⊣ (φ_{${n},${targetGrade}})*</text>`;
      svg.innerHTML = s;
    }

    const box = document.getElementById('ch14-met-readout');
    if (box) {
      box.style.borderLeftColor = enValid ? '#20B2AA' : '#DC143C';
      box.innerHTML =
        `<b>Syntroclinic Bridge (SM Eqs. 25–25a):</b> $(\\phi_{${n},${targetGrade}})_! \\colon \\operatorname{Met}_{${n}}(\\mathcal{X}_{\\mathrm{syn}}) \\rightleftarrows \\operatorname{Met}_{${targetGrade}}(\\mathcal{X}_{\\mathrm{syn}}) \\colon (\\phi_{${n},${targetGrade}})^*$ (Leap $N = ${capN}$)<br>` +
        `<b>Endogenous Operator $\\operatorname{EN}_{${p},${q}}^{${n}}$ (SM Eq. 26):</b> Grade check $p + q = ${p} + ${q} = ${pqSum} ${enValid ? '\\le' : '>'} n = ${n}$ (` +
        (enValid
          ? `<span style="color:#20B2AA;"><b>✓ ADMISSIBLE ENDOGENOUS COUPLING IN $\\operatorname{Met}_{${n}}(\\mathcal{X}_{\\mathrm{syn}})$</b></span>`
          : `<span style="color:#ff6b81;"><b>✗ GRADE OVERFLOW: $p+q=${pqSum} > n=${n}$ VIOLATES SM EQ. 26</b></span>`) + `)`;
    }
  };

  // =========================================================================
  // WIDGET 5: §14.2.1 (Part II) & §14.2.7 Combinatorial Sieve Z_± & Cascade Lab
  // =========================================================================
  window.ch14_updateCombinatorialBounds = function() {
    const elOm = document.getElementById('ch14-comb-om');
    if (!elOm) return;
    const om = parseInt(elOm.value) || 3;
    const om1 = parseInt(document.getElementById('ch14-comb-om1').value) || 2;
    const kap = parseFloat(document.getElementById('ch14-comb-kap').value) || 0.45;

    document.getElementById('ch14-comb-om-val').innerText = om + ' (n=' + (2 * om) + ')';
    document.getElementById('ch14-comb-om1-val').innerText = om1;
    document.getElementById('ch14-comb-kap-val').innerText = kap.toFixed(2);

    // SM Eqs. 59 & 59a:
    // (omega - p)' = sum_{l=1}^{omega-p} binom(omega-p, l) = 2^{omega-p} - 1
    // Z_+ = 2 * (sum_{p=0}^{omega-1} (omega-p)' * binom(omega, p) + 1)
    // Z_- = 2 * (sum_{p=0}^{omega-1} (omega-p)' * (omega! / p!) + 1)
    let sumPlus = 0;
    let sumMinus = 0;
    const omFact = fact(om);
    for (let p = 0; p <= om - 1; p++) {
      const omMinusPPrime = Math.pow(2, om - p) - 1;
      sumPlus += omMinusPPrime * binom(om, p);
      sumMinus += omMinusPPrime * Math.round(omFact / fact(p));
    }
    const Zplus = 2 * (sumPlus + 1);
    const Zminus = 2 * (sumMinus + 1);

    // SM Eqs. 60–61: L_1 = binom(n, omega_1), L_2 = binom(L_1, omega)
    const nDim = 2 * om;
    const L1 = binom(nDim, Math.min(om1, nDim));
    const L2 = binom(Math.min(L1, 15), Math.min(om, Math.min(L1, 15)));
    const kap3 = Math.pow(kap, 3);

    const box = document.getElementById('ch14-comb-readout');
    if (box) {
      box.innerHTML =
        `<b>SM Eq. 38 &amp; 59–59a ($n = 2\\omega = ${nDim},\\; (\\omega-p)' = 2^{\\omega-p}-1$):</b> ` +
        `Symmetric Sieve Bound <b style="color:#5eead4;">$Z_+ = ${Zplus.toLocaleString()}$</b> &nbsp;|&nbsp; ` +
        `Skew-Symmetric Sieve Bound <b style="color:#FFD700;">$Z_- = ${Zminus.toLocaleString()}$</b><br>` +
        `<b>SM Eqs. 60–62 Strukturkaskade:</b> Stage-1 Multiplicity $L_1 = \\binom{${nDim}}{${Math.min(om1, nDim)}} = \\mathbf{${L1}}$, Stage-2 $L_2 = \\mathbf{${L2}}$, Apex $L_M = \\mathbf{1}$ &nbsp;|&nbsp; ` +
        `3-Stage Banach Contraction Factor $\\prod_{\\alpha=1}^3 \\kappa_\\alpha = \\mathbf{${kap3.toFixed(4)} < 1}$ (Unique Apex Metric \${}^2\\bar{\\mathbf{g}}_\\infty$!).`;
    }
  };

  // =========================================================================
  // WIDGET 6: §14.2.1 (Part III) Source Formula Inspector (SM Eqs. 63–100a)
  // =========================================================================
  const eqPart3List = [
    { tag: "SM Eq. 63", cl: "Cluster VII (Ch. 10)", src: "x_i = α_i N_i, N ≥ 1, α_i = χ_i τ^{1/p}, |χ_i| = 1, 1 ≤ p ≤ n, τ > 0", rec: "Metronic Lattice Quantization M_τ^n := ⊕_{i=1}^n τ_i ℤ ⊂ ℝ^n with fundamental Metron area quantum τ." },
    { tag: "SM Eq. 64", cl: "Cluster VII (Ch. 10)", src: "χ√|g_{(p)}| = 1, χ = |χ_i δ_{ik}|_p, ²g̅_{(p)} = const", rec: "Übergangskriterium: Determinant threshold forcing continuous geometry to fracture into discrete lattice cells M_τ^n." },
    { tag: "SM Eq. 65–65a", cl: "Cluster VII (Ch. 10)", src: "m = p M  (SM p. 208)  ;  ω = (1/2) p M  (SM p. 209)", rec: "Metronic dimension quantization and partial-structure selection rule." },
    { tag: "SM Eq. 66", cl: "Cluster VII (Ch. 10)", src: "lim_{ΔF_γ → τ} ∑_{γ=1}^n ỹ_γ Δx_γ = n τ  ;  ∫_{x_0}^{x_n} f(x) dx = n τ", rec: "Quantized action-area step replacing Riemann Partition limits by integer multiples of τ." },
    { tag: "SM Eq. 67–67a", cl: "Cluster VII (Ch. 10)", src: "∇φ = φ(n) - φ(n-1), 1 ≤ n ≤ N  ;  J(n_1,n_2) = S_{n_1}^{n_2} φ(n) dn", rec: "Bounded backward difference operator ∇ := I - E^{-1} on ℓ^∞(M_τ^n) and discrete summation operator S." },
    { tag: "SM Eq. 68", cl: "Cluster VII (Ch. 10)", src: "∇^k φ = ∑_{γ=0}^k (-1)^γ binom(k,γ) φ(n-γ)", rec: "Binomial expansion theorem for k-th order metronic differences ∇^k = (I - E^{-1})^k." },
    { tag: "SM Eq. 68a", cl: "Cluster VII (Ch. 10)", src: "∇(uv) = u ∇v + v ∇u - ∇u ∇v  ;  ∇(u/v) = (v ∇u - u ∇v) / (v(n)(v(n)-∇v))", rec: "Exact discrete Leibniz product and quotient rules with non-linear lattice cross-term -∇u ∇v." },
    { tag: "SM Eq. 68b", cl: "Cluster VII (Ch. 10)", src: "∇φ = 0 at n = n_ext : ∇²φ < 0 (φ_max), ∇²φ > 0 (φ_min), ∇²φ = 0 (φ_w)", rec: "Discrete lattice extrema and inflection classification via first and second backward differences." },
    { tag: "SM Eq. 69–72", cl: "Cluster VII (Ch. 10)", src: "Φ(n) = S φ(n) dn + C, ∇Φ = φ ; S(u g dn) = u S g dn + S(g - S g dn)∇u", rec: "Fundamental Theorem of Discrete Calculus (∇ ∘ S = id), summation by parts, and discrete Taylor–Newton series." },
    { tag: "SM Eq. 73–77", cl: "Cluster VII (Ch. 10)", src: "∇_k φ = φ - φ(…,n_k-1,…), [∇_k, ∇_l] = 0, ∇φ = ∑_{i=1}^L ∇_i φ", rec: "Commuting multi-variable partial difference operators, discrete chain rule (SM-75), and Euler homogeneity relation (SM-77)." },
    { tag: "SM Eq. 78–79c", cl: "Cluster VII (Ch. 10)", src: "∇̅φ = GRAD_L φ, sp ∇̅ ᵐC̅ = DIV_L ᵐC̅, ∇̅ ᵐC̅ - (∇̅ ᵐC̅)^× = ROT_L ᵐC̅, ROT_L GRAD_L = 0", rec: "Discrete Vector Calculus and Discrete Exterior Calculus (DEC) cochain complex (Ω_d^•, d_τ) satisfying exact nilpotency d_τ² ≡ 0." },
    { tag: "SM Eq. 80", cl: "Cluster VII (Ch. 10)", src: "S_{Ω(L)} DIV_L Φ̅ dV = S_{L-1} Φ̅ dV̅  ;  SS ROT_L Φ̅ d²F̅ = S Φ̅ dN̅", rec: "Exact Discrete Gauss–Ostrogradsky Divergence Theorem and Discrete Stokes Circulation Theorem on M_τ^n." },
    { tag: "SM Eq. 81–83", cl: "Cluster VII (Ch. 10)", src: "φ ∇_φ ln φ = ∇φ, e^{iφ} = cos φ + i sin φ, L = binom(N, p)", rec: "Discrete logarithmic/exponential operators, linear difference equations with Casoratian determinant D ≠ 0, andGrassmannian rank L = binom(N,p)." },
    { tag: "SM Eq. 84–86b", cl: "Cluster VIII (Ch. 11)", src: "²g̅(x^⊥)_1^N = ²γ̅(z^k)_1^N ; n, χ^i χ^k γ_{ik} - α(p,τ)( )/( ) = 0, x_k = C_k;n", rec: "Discrete Lattice Metric Sampling ²g̅_τ ∈ ℓ^∞(M_τ^n, Sym²(ℝ^n)) under coordinate grid selectors C_k;n = α_k τ^{1/p} n_k." },
    { tag: "SM Eq. 87–91a", cl: "Cluster VIII (Ch. 11)", src: "ŝ = ROT_N Φ̂, (ŝ;n)_{n=1} = τ̂, N̲ = S K̅ dn̅, ²K̅ = ²χ̅;n", rec: "Spin/vorticity lattice rotor selectors ŝ ∈ End(ℓ²(M_τ^n)) and Structural Condensation Functional N̅ := S K̃ = ∑_n K̃(n) < ∞." },
    { tag: "SM Eq. 92–93c", cl: "Cluster VIII (Ch. 11)", src: "∇_p² n^i + (α_k α_l / α_i) ∇_p n^k ∇_p n^l [i / k l]_{(ab)}^{(cd)};n = 0", rec: "Metronized Christoffel symbols of first/second kind and Discrete Lattice Geodesic Difference Equation." },
    { tag: "SM Eq. 94–98", cl: "Cluster VIII (Ch. 11)", src: "[(cd)/(-+)/(ab)] ≠ [(cd)/(-+)/(ab)]^× ; lim_{²γ̅ → ²E̅} (χ)_{(±)}^{(s_1)(s_2)} = DIV_{(x)}, GRAD_{(x)}", rec: "Non-Hermitian Metronized Connection Operators, flat-lattice Euclidean limits, and cross-sector coupling sum (SM-98)." },
    { tag: "SM Eq. 99–99b", cl: "Cluster VIII (Ch. 11)", src: "ς^i_{klm} = (1/α_l)∇_l[i / km] - (1/α_m)∇_m[i / kl] + [i / sl][s / km] - [s / im][s / kl] ; lim_{τ→0} ⁴ς̅;n = ⁴R̅", rec: "Metronized Curvature Compression Tensor ⁴ζ_τ decomposing into (ς, q, C, D) and converging to Riemann curvature ⁴R as τ → 0." },
    { tag: "SM Eq. 100", cl: "Cluster VIII (Ch. 11)", src: "⁴F̅(ς^i_{klm}, λ_m [i / kl])_1^N = ⁴0̅, λ_m = f_m(q)", rec: "Metronized Null Stability Condition: ker(⁴F̅) selecting invariant particle mass eigenvalues in H_E = L²(M, E)." },
    { tag: "SM Eq. 100a", cl: "Cluster VIII (Ch. 11)", src: "L_p = binom(6, p)", rec: "Physical Compactification Dimension N = 6 (R_6 = R_4 × S_2) and Closed-Form Mass Spectrum m = m_0 (L_p / L_1) ∏ λ_k." }
  ];

  window.ch14_inspectSourceEqPart3 = function() {
    const el = document.getElementById('ch14-eq3-idx');
    const lbl = document.getElementById('ch14-eq3-val');
    const out = document.getElementById('ch14-eq3-readout');
    if (!el || !out) return;
    const idx = Math.max(0, Math.min(eqPart3List.length - 1, parseInt(el.value) || 0));
    const item = eqPart3List[idx];
    if (lbl) lbl.innerText = item.tag;
    out.innerHTML =
      `<div style="display:flex; justify-content:space-between; margin-bottom:4px;">` +
      `<b style="color:#FFD700; font-size:1.05em;">${item.tag}</b>` +
      `<span style="color:#5eead4; font-weight:bold;">${item.cl}</span>` +
      `</div>` +
      `<div style="background:#070b14; border:1px solid #334155; border-radius:5px; padding:5px 8px; font-family:monospace; color:#f8fafc; margin-bottom:5px;">` +
      `<b>Source (D):</b> ${item.src}` +
      `</div>` +
      `<div style="color:#cbd5e1;"><b>Modern Reconstruction $\\mathcal{R}$ (A/B/C):</b> ${item.rec}</div>`;
  };

  // =========================================================================
  // WIDGET 7: §14.2.8 Cluster VII Metronic Difference & Leibniz Defect Lab
  // =========================================================================
  window.ch14_updateDiscreteCalculus = function() {
    const elN = document.getElementById('ch14-dec-n');
    if (!elN) return;
    const n = parseInt(elN.value) || 5;
    const k = parseInt(document.getElementById('ch14-dec-k').value) || 2;
    document.getElementById('ch14-dec-n-val').innerText = n;
    document.getElementById('ch14-dec-k-val').innerText = k;

    // Test functions on lattice: u(n) = n^2, v(n) = n
    const u = m => m * m;
    const v = m => m;
    const uv = m => u(m) * v(m);

    // SM Eq. 68: nabla^k u(n) = sum_{gamma=0}^k (-1)^gamma binom(k,gamma) u(n-gamma)
    let nablaKu = 0;
    let terms = [];
    for (let g = 0; g <= k; g++) {
      const sign = (g % 2 === 0) ? 1 : -1;
      const b = binom(k, g);
      const val = u(n - g);
      nablaKu += sign * b * val;
      terms.push(`${sign > 0 ? '+' : '-'}${b}·u(${n - g})`);
    }

    // SM Eq. 68a: nabla(uv)(n) = u(n)nabla v(n) + v(n)nabla u(n) - nabla u(n) nabla v(n)
    const du = u(n) - u(n - 1);
    const dv = v(n) - v(n - 1);
    const duvExact = uv(n) - uv(n - 1);
    const naiveLeibniz = u(n) * dv + v(n) * du;
    const crossDefect = du * dv;
    const rhsExact = naiveLeibniz - crossDefect;

    const svg = document.getElementById('ch14-dec-svg');
    if (svg) {
      let s = `<rect x="4" y="4" width="212" height="96" rx="6" fill="#070a12" stroke="#334155"/>`;
      for (let m = 1; m <= 8; m++) {
        const x = 16 + ((m - 1) / 7) * 184;
        const y = 86 - (u(m) / 64) * 68;
        const isCur = (m === n);
        const isStencil = (m <= n && m >= n - k);
        s += `<line x1="${x.toFixed(1)}" y1="86" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${isCur ? '#FFD700' : (isStencil ? '#20B2AA' : '#334155')}" stroke-width="${isCur ? '2.5' : '1.4'}"/>`;
        s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isCur ? '5' : (isStencil ? '4' : '2.8')}" fill="${isCur ? '#FFD700' : (isStencil ? '#20B2AA' : '#64748b')}"/>`;
      }
      s += `<text x="108" y="20" fill="#5eead4" font-size="8.5" font-weight="bold" text-anchor="middle">Stencil [n-${k}, …, n] on M_τ¹</text>`;
      svg.innerHTML = s;
    }

    const box = document.getElementById('ch14-dec-readout');
    if (box) {
      box.innerHTML =
        `<b>Binomial Difference (SM Eq. 68, $u(n)=n^2$):</b> $\\nabla^{${k}} u(${n}) = ${terms.join(' ').replace(/^\+/, '')} = \\mathbf{${nablaKu}}$ ` +
        `${k > 2 ? '<span style="color:#FFD700;"><b>(= 0 for degree-2 polynomial when k &gt; 2!)</b></span>' : ''}<br>` +
        `<b>Discrete Leibniz Rule (SM Eq. 68a, $v(n)=n$):</b> Naive $u\\nabla v + v\\nabla u = ${naiveLeibniz}$ vs. Exact $\\nabla(uv)(${n}) = ${ naiveLeibniz } - \\underbrace{\\nabla u\\nabla v}_{${crossDefect}} = \\mathbf{${rhsExact} = ${duvExact}}$ &nbsp;|&nbsp; $\\nabla(\\mathcal{S}u)(${n}) = u(${n}) = \\mathbf{${u(n)}}$`;
    }
  };

  // =========================================================================
  // WIDGET 8: §14.2.9 Cluster VIII Channel Multiplicity L_p = binom(6,p) & Mass Lab
  // =========================================================================
  const sectorDescriptions = {
    1: "p = 1 (L₁ = 6): Single-axis metronic line excitations across R₆ = R₄ × S₂ (Reference baseline L₁ = 6).",
    2: "p = 2 (L₂ = 15): Fundamental 2D area-plaquette condensations (SM Eq. 87 spin/vorticity rotors ŝ_αβ on 15 skew planes).",
    3: "p = 3 (L₃ = 20): Maximal 3-volume metronic hyperstructure multiplicity (Baryonic / mesobaric trivalent core).",
    4: "p = 4 (L₄ = 15): Dual 4-dimensional spacetime-internal plaquette duals (Hodge-*_τ dual to p = 2 on R₆).",
    5: "p = 5 (L₅ = 6): Hypersurface 5-cell duals on R₆ (Hodge-*_τ dual to p = 1).",
    6: "p = 6 (L₆ = 1): Complete 6D volume element on R₆ = R₄ × S₂ (Unique top-form condensation)."
  };

  window.ch14_updateMassSelector = function() {
    const elP = document.getElementById('ch14-ms-p');
    if (!elP) return;
    const p = parseInt(elP.value) || 2;
    const lamProd = parseFloat(document.getElementById('ch14-ms-lam').value) || 1.25;
    const tauScale = parseFloat(document.getElementById('ch14-ms-tau').value) || 0.15;

    document.getElementById('ch14-ms-p-val').innerText = p;
    document.getElementById('ch14-ms-lam-val').innerText = lamProd.toFixed(2);
    document.getElementById('ch14-ms-tau-val').innerText = tauScale.toFixed(2);

    const Lp = binom(6, p);
    const L1 = 6;
    const ratio = Lp / L1;
    const mOverM0 = ratio * lamProd;
    const curvErr = (tauScale * tauScale * 0.42).toFixed(4);

    const svg = document.getElementById('ch14-ms-svg');
    if (svg) {
      let s = `<rect x="4" y="4" width="212" height="96" rx="6" fill="#070a12" stroke="#334155"/>`;
      for (let k = 1; k <= 6; k++) {
        const bVal = binom(6, k);
        const bx = 14 + (k - 1) * 32;
        const bh = (bVal / 20) * 62;
        const by = 80 - bh;
        const isSel = (k === p);
        s += `<rect x="${bx}" y="${by.toFixed(1)}" width="22" height="${bh.toFixed(1)}" rx="2" fill="${isSel ? '#FFD700' : '#20B2AA'}" opacity="${isSel ? '1.0' : '0.45'}"/>`;
        s += `<text x="${bx + 11}" y="${(by - 3).toFixed(1)}" fill="${isSel ? '#FFD700' : '#cbd5e1'}" font-size="8" font-weight="bold" text-anchor="middle">${bVal}</text>`;
        s += `<text x="${bx + 11}" y="92" fill="${isSel ? '#FFD700' : '#94a3b8'}" font-size="7.5" text-anchor="middle">p=${k}</text>`;
      }
      svg.innerHTML = s;
    }

    const box = document.getElementById('ch14-ms-readout');
    if (box) {
      box.innerHTML =
        `<b>SM Eq. 100a ($N=6,\\; L_p = \\binom{6}{p}$):</b> $L_{${p}} = \\binom{6}{${p}} = \\mathbf{${Lp}}$ &nbsp;|&nbsp; Channel Ratio $L_{${p}}/L_1 = ${Lp}/6 = \\mathbf{${ratio.toFixed(3)}}$<br>` +
        `<b>SM Eq. 100 ($\\ker {}^4\\bar{\\mathbf{F}}$ Mass Formula):</b> $m / m_0 = \\frac{L_{${p}}}{L_1}\\prod \\lambda_k = \\mathbf{${mOverM0.toFixed(4)}}$ &nbsp;|&nbsp; ` +
        `<b>SM Eq. 99 Continuum Limit:</b> $\\|{}^4\\zeta_\\tau - {}^4\\mathbf{R}\\| \\approx ${curvErr}$ ${tauScale <= 0.05 ? '<span style="color:#FFD700;"><b>(CONTINUUM RIEMANN LIMIT REACHED!)</b></span>' : ''}<br>` +
        `<span style="color:#94a3b8;">${sectorDescriptions[p]}</span>`;
    }
  };

  // =========================================================================
  // WIDGET 9: §14.3 Encyclopedic Lexicon Interactive Rosetta Explorer (All 20 Terms)
  // =========================================================================
  const lexiconEntries = [
    { term: "Affinitätssyndrom (𝔄)", pg: "SM, p. 80", cl: "IV", hist: "A structured tensor matrix defining the coupling potential between internal syntrometric states and external environmental contexts.", math: "Bounded bilinear interaction forms β ∈ ∏ Bil_<=1(F_γ, B; ℝ) on Banach context spaces with two-sided non-degeneracy ker T_β = {0}, ker S_β = {0} (Def. 4.19)." },
    { term: "Antagonismus (Antinomy)", pg: "SM, p. 6", cl: "I", hist: "A cognitive or structural conflict arising from projecting multi-dimensional continuous phenomena onto bivalent, discrete perceptual frames.", math: "Tripartite taxonomy separating mereological part-incompatibilities (Ant_mer), non-vanishing Čech descent defects (Ant_desc ⇔ Def_U(s) ≠ 0), and internal topos contradictions (Ant_log ⇔ U ⊩ ⊥) (Def. 1.18)." },
    { term: "Äondyne (S̲)", pg: "SM, p. 36", cl: "II", hist: "A Syntrix whose foundational Metrophor and generative Synkolator vary continuously across a multi-dimensional parameter manifold.", math: "Cartesian fiber section within the Grothendieck fibration π : ∫_Ctx Syn → Ctx over smooth base parameter manifolds M_U (Thm. 2.18)." },
    { term: "Enyphanie (Eν) / Enyphaniegrad (g_E)", pg: "SM, p. 62", cl: "IV", hist: "The latent, intrinsic capacity for structural transformation and energetic interaction inherent in organized syntrometric forms.", math: "Non-Abelian interaction gauge curvature residual Ω_int^D := F_A - ∑ F_k^{(A_0)} ∈ Ω²(M, ad P) and its quadratic Frobenius norm density g_E^D(x) = c_E ‖Ω_int^D‖² (Thm. 4.11)." },
    { term: "Fundamentalkondensor (³Γ)", pg: "SM, p. 157", cl: "VI", hist: "The primary structural condenser governing parallel transport, connection coefficients, and cross-metric correlations.", math: "The affine Christoffel connection Γ_{kl}^i ∈ Conn(M) of a non-Hermitian metric bundle, partitioned into symmetric correlation tensors f and commutator coupling tensors Q (Thm. 9.14)." },
    { term: "Hermetrie-Matrix (36)", pg: "SM, p. 145", cl: "VI", hist: "The comprehensive 36-component unified field tensor defined on the 6-dimensional subspace R_6 = R_4 × S_2.", math: "Non-Hermitian metric decomposition ²g̅ = ²g̅_+ + ²g̅_- on T*(R_4 × S_2)^{⊗2}, comprising 21 symmetric potentials and 15 skew-symmetric potentials (Def. 9.4)." },
    { term: "Holoform (Hol)", pg: "SM, p. 72", cl: "IV", hist: "An emergent, unified whole exhibiting non-reducible holistic properties and integrated causal persistence.", math: "Global sheaf section Γ ∈ Hol(U, P) in the descent equalizer with strictly positive Yang–Mills emergence action Δ_emerg^I(Γ; D) > 0 (Thm. 4.14)." },
    { term: "Hypersyntrix (M¹)", pg: "SM, p. 81", cl: "V", hist: "The Metroplex of the First Grade, treating an entire category of base syntrices as a foundational Hypermetrophor.", math: "Internal category object in the ambient (∞,1)-topos: Cat_∞(X_syn) := CSeg(X_syn), modeled as a complete Segal space (Def. 5.3)." },
    { term: "Korporator ({…})", pg: "SM, p. 42", cl: "III", hist: "The dual-action operator governing the inter-syntrix coupling and compositional synthesis of static Metrophors and dynamic Synkolators.", math: "Corporate pairing functor Kor_{r,Σ} : Syn × Syn → Syn combining carriers via ℓ¹-coproducts (C_m) or span pushouts (K_m), and modules via direct sums (C_s) or projective tensor products (K_s) (Def. 3.6)." },
    { term: "Metron (τ)", pg: "SM, p. 206", cl: "VII", hist: "The indivisible, fundamental quantum of geometric extension and area (τ ≈ 10^{-70} m²).", math: "Fundamental grid spacing parameter of the discrete lattice manifold M_τ^n := ⊕ τ_i ℤ ⊂ ℝ^n, providing the ultraviolet cutoff for discrete quantum physics (Def. 10.1)." },
    { term: "Metrondifferential (Fφ ≡ ∇φ)", pg: "SM, p. 213", cl: "VII", hist: "The finite difference operator replacing classical infinitesimal derivatives on quantized lattices.", math: "Bounded backward difference operator ∇_i := I - E_i^{-1} ∈ B(ℓ^∞(M_τ^n)), satisfying discrete Leibniz product rules with non-linear cross-terms (Thm. 10.6)." },
    { term: "Protyposis", pg: "SM, p. 63", cl: "II", hist: "The primordial structural reservoir consisting of elementary pyramidal building blocks (Speicher) and combination rules (Simplex).", math: "Generating signature of elementary selection representations Sel_{ε,ρ}^{(m)} spanning the free polynomial tree monad T_{O_pyr} (Def. 2.9)." },
    { term: "Spaltbarkeit (Splittability)", pg: "SM, p. 29", cl: "II", hist: "The structural principle asserting that every homogeneous, history-dependent syntrix can be factored into a pyramidal core and an interaction fragment.", math: "Beck's Distributive Law for monads λ : T_pyr ∘ T_frag ⇒ T_frag ∘ T_pyr, ensuring associative composite monad multiplication μ_hom (Prop. 2.12)." },
    { term: "Strukturkaskade", pg: "SM, p. 180", cl: "VI", hist: "The multi-tiered hierarchical ascent from elementary partial metrics to a fully synthesized apex metric field.", math: "Sequence of metric bundle operations Φ_M := ◯_{α=1}^M (κ_α T_α) forming a strict Banach contraction that converges uniquely to the apex metric ²g̅_∞ (Thm. 9.22)." },
    { term: "Strukturkompressor (⁴ζ)", pg: "SM, p. 255", cl: "VIII", hist: "The 4th-rank curvature compression tensor measuring non-linear internal geometric stresses.", math: "Self-adjoint geometric selector operator ζ_{klm}^i ∈ Ω²(M, End(TM)) on H_E = L²(M, E) whose kernel ker(⁴F) selects stable particle mass eigenvalues (Thm. 11.15)." },
    { term: "Syntropode", pg: "SM, p. 58", cl: "III", hist: "The uncorporated modular base of a syntrix prior to its entry into a conflexive network.", math: "Truncated graded operadic submodule τ_{≤ k_i-1}(S_i) acting as an atomic leaf vertex in a corporate interaction tree G_S (Def. 3.14)." },
    { term: "Televarianz", pg: "SM, p. 112", cl: "V", hist: "The property of an evolutionary trajectory that preserves internal structural stability and converges toward a telecentric attractor.", math: "Invariant dynamical orbit W_tele(t) = Φ_t(x_0) exhibiting strictly negative Lyapunov dissipation V̇ ≤ -γ V within the attractor basin B(A) (Thm. 6.11)." },
    { term: "Telezentrum (T_z)", pg: "SM, p. 108", cl: "V", hist: "An asymptotic target state of optimal structural integration and minimal entropy.", math: "Final coalgebra (νT, ζ) over polynomial transition endofunctors T, inducing the unique universal telecentric homomorphism ! α : S → νT (Thm. 6.7)." },
    { term: "Transzendente Telezentralenrelativität", pg: "SM, p. 117", cl: "V", hist: "The principle asserting that what constitutes an absolute goal at transcendence level m becomes a subordinate building block at level m+1.", math: "Categorical property that left adjoint lifting functors Γ_m ⊣ U_{m+1} do not preserve terminal objects: Γ_m(νT_m) ≇ νT_{m+1} (Thm. 6.19)." },
    { term: "Übergangskriterium", pg: "SM, p. 206", cl: "VII", hist: "The scalar determinant threshold (χ√|g_{(p)}| = 1) marking the breakdown of continuous geometry.", math: "Geodesic gradient threshold ‖∇ ²g̅‖ ≥ τ^{-1/p} where continuous geodesics develop finite-time singularities, forcing the continuum to fracture into discrete lattice cells M_τ^n (Thm. 9.25)." }
  ];

  window.ch14_searchLexicon = function() {
    const selEl = document.getElementById('ch14-lex-sel');
    const clEl = document.getElementById('ch14-lex-cl');
    const out = document.getElementById('ch14-lex-readout');
    if (!selEl || !out) return;

    const clFilter = clEl ? clEl.value : 'ALL';
    const filtered = lexiconEntries.filter(e => clFilter === 'ALL' || e.cl === clFilter);

    // Keep select options synced if filter changed
    if (selEl.dataset.lastCl !== clFilter) {
      selEl.dataset.lastCl = clFilter;
      selEl.innerHTML = filtered.map((e, i) => `<option value="${i}">${e.term} [Cluster ${e.cl}]</option>`).join('');
      selEl.value = "0";
    }

    const idx = Math.max(0, Math.min(filtered.length - 1, parseInt(selEl.value) || 0));
    const item = filtered[idx] || lexiconEntries[0];

    out.innerHTML =
      `<div style="display:flex; justify-content:space-between; margin-bottom:4px;">` +
      `<b style="color:#FFD700; font-size:1.06em;">${item.term}</b>` +
      `<span style="color:#5eead4; font-weight:bold;">Cluster ${item.cl} &nbsp;|&nbsp; ${item.pg}</span>` +
      `</div>` +
      `<div style="background:rgba(15,23,42,0.9); border-left:3px solid #94a3b8; padding:5px 8px; margin-bottom:5px; color:#e2e8f0;">` +
      `<b>Historical Definition (Stratum D):</b> <i>${item.hist}</i>` +
      `</div>` +
      `<div style="background:rgba(16,185,129,0.1); border-left:3px solid #20B2AA; padding:5px 8px; color:#f8fafc;">` +
      `<b>Mathematical Reconstruction $\\mathcal{R}$ (Strata A/B/C):</b> ${item.math}` +
      `</div>`;
  };

  // =========================================================================
  // VIDEO CONTROL & WIDGET INITIALIZATION BOILERPLATE
  // =========================================================================
  function prepareVideos() {
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'auto';
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('muted', '');
      v.setAttribute('loop', '');
      v.setAttribute('preload', 'auto');
    });
  }

  function syncVideosToSlide() {
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
      || window.innerWidth <= 768;

    const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
    const winH = window.innerHeight || document.documentElement.clientHeight;
    const winW = window.innerWidth || document.documentElement.clientWidth;

    document.querySelectorAll('video').forEach(v => {
      let shouldPlay = false;
      if (isScroll) {
        const rect = v.getBoundingClientRect();
        const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
        shouldPlay = inView;
      } else {
        shouldPlay = current ? current.contains(v) : true;
      }

      if (shouldPlay) {
        v.muted = true;
        v.playsInline = true;
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      } else if (!v.paused) {
        v.pause();
      }
    });
  }

  // Ensure continuous sync on mobile scroll and touch gestures
  if (typeof window !== 'undefined') {
    window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
    window.__syn_video_sync_handlers.push(syncVideosToSlide);
    if (!window.__syn_video_scroll_hooked) {
      window.__syn_video_scroll_hooked = true;
      const runSync = () => {
        (window.__syn_video_sync_handlers || []).forEach(fn => {
          try { fn(); } catch (_) {}
        });
      };
      window.addEventListener('scroll', runSync, { passive: true });
      window.addEventListener('touchmove', runSync, { passive: true });
      window.addEventListener('resize', runSync, { passive: true });
      let synMediaUnlocked = false;
      function synUnlockMedia() {
        if (synMediaUnlocked) return;
        synMediaUnlocked = true;
        runSync();
      }
      document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
      document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
    }
  }

  function renderAllCh14Widgets() {
    window.ch14_selectCluster(0);
    window.ch14_inspectSourceEqPart1();
    window.ch14_updateKorporatorGauge();
    window.ch14_updateMetroplexBridge();
    window.ch14_updateCombinatorialBounds();
    window.ch14_inspectSourceEqPart3();
    window.ch14_updateDiscreteCalculus();
    window.ch14_updateMassSelector();
    window.ch14_searchLexicon();
  }

  function bindControlsOnce() {
    document.querySelectorAll('input[type="range"], select, button').forEach(el => {
      if (el.dataset.synBound) return;
      el.dataset.synBound = '1';
      el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());
    });
  }

  let synCh14Initialised = false;
  function initChapter14() {
    if (synCh14Initialised) return;
    synCh14Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh14Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter14);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter14();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter14();
  }
})();


// =========================================================================
// CHAPTER 14 3D ENGINE INJECTOR & RUNNER
// =========================================================================
const CH14_3D_STYLE = `
#ch14-3d-hud {
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

#ch14-3d-hud *, #ch14-3d-hud *::before, #ch14-3d-hud *::after {
  box-sizing: border-box;
}

#ch14-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch14-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch14-3d-hud.minimized .ch14-hud-body {
  display: none;
}

.ch14-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch14-hud-title {
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

.ch14-hud-title span:first-child {
  line-height: 1.15;
}

.ch14-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch14-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch14-hud-btn {
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

.ch14-hud-btn:hover, .ch14-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch14-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch14-canvas-wrap:active {
  cursor: grabbing;
}

#ch14-3d-hud.spotlight .ch14-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch14-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch14-overlay-bar {
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

.ch14-telemetry {
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

#ch14-node-inspector {
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

.ch14-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch14-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch14-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch14-scrubber .ch14-hud-btn {
  flex-shrink: 0;
}

#ch14-caption {
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
  #ch14-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch14-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch14-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch14-hud-controls {
    gap: 3px;
  }
  .ch14-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch14-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch14-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch14-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch14-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch14-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch14-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch14-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch14-hud-controls {
    gap: 3px;
  }
  .ch14-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch14-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch14-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch14-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch14-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch14-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch14-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch14-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH14_3D_HTML = `<div class="ch14-hud-header">

    <div class="ch14-hud-title">

      <span>🏛️ Ch 14 · 3D Master Register Engine</span>

      <span id="ch14-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch14-hud-controls">

      <button class="ch14-hud-btn active" id="ch14-btn-orbit" onclick="toggleCh14Orbit()">⟳ Orbit</button>

      <button class="ch14-hud-btn" onclick="toggleCh14Spotlight()">⛶ Spotlight</button>

      <button class="ch14-hud-btn" id="ch14-btn-min" onclick="toggleCh14Minimize()">+</button>

    </div>

  </div>



  <div class="ch14-hud-body">

    <div class="ch14-canvas-wrap" id="ch14-canvas-wrap">

      <canvas id="ch14-3d-canvas"></canvas>

      <div class="ch14-overlay-bar">

        <div class="ch14-telemetry" id="ch14-telemetry">ℛ : HeimCorpus(1–100a) → Math</div>

        <div id="ch14-node-inspector">Drag to Orbit 3D · Click Cluster to Inspect</div>

      </div>

    </div>



    <div class="ch14-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <button class="ch14-hud-btn" title="Previous Stage" onclick="window.setCh14Stage(Math.round( parseFloat(document.getElementById('ch14-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch14-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh14Stage(this.value)">
      <button class="ch14-hud-btn" title="Next Stage" onclick="window.setCh14Stage(Math.round( parseFloat(document.getElementById('ch14-slider').value) ) + 1, true)">▶</button>

      <button class="ch14-hud-btn active" id="ch14-btn-sync" onclick="enableCh14Sync()">Auto-Sync</button>

    </div>



    <div id="ch14-caption">

      <b>Stage 1 (§14.1 — Master Register):</b> 8 Canonical Equation Clusters (SM Eqs. 1–100a) mapped by functor ℛ.

    </div>

  </div>`;

function injectCh143DHUD() {
  if (document.getElementById('ch14-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH14_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch14-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH14_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch14_3d_engine_loaded) return;
  window.__ch14_3d_engine_loaded = true;

  function runCh14Engine() {
    injectCh143DHUD();
    if (window.__ch14_3d_engine_initialized) return;
    window.__ch14_3d_engine_initialized = true;

const canvas = document.getElementById('ch14-3d-canvas');

  const wrap = document.getElementById('ch14-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.45;

  let camPitch = 0.36;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const CLUSTERS = [

    { id: "CL_I",    num: "I",    eqs: "SM 1–4",    col: "#4169E1", name: "Cluster I: Epistemology & Aspects", target: "ℰ_syn = Sh(Ctx_adm^sk, J_syn) & Ω", info: "Cluster I (SM 1–4): Prädikatrix P_n, Dialektik D_n, Koordination K_n, Quantoren → Sheaf Topos ℰ_syn (Ch. 1)" },

    { id: "CL_II",   num: "II",   eqs: "SM 5–9a",   col: "#20B2AA", name: "Cluster II: Syntrix & Operads",     target: "𝒪_syn, Tree Monad T_P & Beck Law λ̂", info: "Cluster II (SM 5–9a): Syntrix Triad yã, Bandsyntrix, Spaltbarkeit, Äondyne → Colored Operad 𝒪_syn (Ch. 2)" },

    { id: "CL_III",  num: "III",  eqs: "SM 10–13a", col: "#FFA500", name: "Cluster III: Corporate Pushouts",   target: "Span Pushout P_a ⊞_φ P_b & 4D Tesseract", info: "Cluster III (SM 10–13a): Korporator Matrix, Eindeutigkeitssatz, Konflexion → Span Pushout ⊞_φ (Ch. 3)" },

    { id: "CL_IV",   num: "IV",   eqs: "SM 14–19a", col: "#DC143C", name: "Cluster IV: Enyphanie & Gauge",     target: "Curvature Ω_int^𝒟 = [a_i,a_j] & BRST", info: "Cluster IV (SM 14–19a): Enyphanie Eν, T0, Holoformen, Zeitkorn → Non-Abelian Gauge Curvature Ω_int^𝒟 (Ch. 4)" },

    { id: "CL_V",    num: "V",    eqs: "SM 20–27",  col: "#9370DB", name: "Cluster V: Metroplexe & Area",      target: "(∞,1)-Topos 𝒳_syn & Coalgebra (ν𝒯, ζ)", info: "Cluster V (SM 20–27): Hypersyntrix ⁿM, Syntrokline Brücken, Telezentren → 𝒳_syn & Final Coalgebra ν𝒯 (Ch. 5–6)" },

    { id: "CL_VI",   num: "VI",   eqs: "SM 28–62",  col: "#FFD700", name: "Cluster VI: Continua & Cascades",   target: "Nuclear 𝒮(ℳ_n) & 36-Hermetry ²ḡ on R₆", info: "Cluster VI (SM 28–62): Quantitätssyntrix, Separation, Kondensor ³Γ, 36-Hermetry → Sobolev Apex ²ḡ_∞ (Ch. 7–9)" },

    { id: "CL_VII",  num: "VII",  eqs: "SM 63–83",  col: "#38bdf8", name: "Cluster VII: Metronic Calculus",    target: "Lattice 𝕄_τ^n & DEC (Ω_d^•, d_τ, *_τ)", info: "Cluster VII (SM 63–83): Metron τ, Differences ∇_i, Metronintegral 𝒮, Gauss–Stokes → DEC Cochains (Ch. 10)" },

    { id: "CL_VIII", num: "VIII", eqs: "SM 84–100a",col: "#4ade80", name: "Cluster VIII: Selectors & Matter",  target: "Sel Ψ = λΨ on K₈ & Mass m = m₀(L_p/L₁)∏λ_k", info: "Cluster VIII (SM 84–100a): Strukturkompressor ⁴ζ, Null-Stability ⁴F=0, Mass Formula → Spectral Selectors (Ch. 11)" }

  ];



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§14.1 — Master Translation Register):</b> All 8 Canonical Clusters (SM Eqs. 1–100a) mapped by Reconstruction Functor ℛ.",

    2: "<b>Stage 2 (§14.2 — Cluster I, SM 1–4):</b> Epistemology, Prädikatrix P_n, Dialektik D_n &amp; Quantoren → Sheaf Topos ℰ_syn = Sh(Ctx, J_syn).",

    3: "<b>Stage 3 (§14.3 — Cluster II, SM 5–9a):</b> Syntrix Triad, Spaltbarkeit &amp; Äondynen → Colored Banach Operad 𝒪_syn &amp; Beck Law λ̂.",

    4: "<b>Stage 4 (§14.4 — Cluster III, SM 10–13a):</b> Korporator 2×2 Matrix &amp; Konflexionsfeld → Banach Span Pushout P_a ⊞_φ P_b (15 Classes).",

    5: "<b>Stage 5 (§14.5 — Cluster IV, SM 14–19a):</b> Enyphanie Eν, T0, Holoformen &amp; Zeitkorn → Non-Abelian Gauge Curvature Ω_int^𝒟 &amp; BRST.",

    6: "<b>Stage 6 (§14.6 — Cluster V, SM 20–27):</b> Metroplexe ⁿM, Bridges &amp; Telezentren → Ambient (∞,1)-Topos 𝒳_syn &amp; Final Coalgebra (ν𝒯, ζ).",

    7: "<b>Stage 7 (§14.7 — Cluster VI, SM 28–62):</b> Continua R_n, Kondensor ³Γ &amp; Strukturkaskaden → Nuclear 𝒮(ℳ_n) &amp; 36-Component Hermetry ²ḡ.",

    8: "<b>Stage 8 (§14.8 — Cluster VII, SM 63–83):</b> Metron τ, Differences ∇_i &amp; Sums 𝒮 → Discrete Exterior Calculus (Ω_d^•(𝕄_τ^n), d_τ, *_τ).",

    9: "<b>Stage 9 (§14.9 — Cluster VIII, SM 84–100a):</b> Strukturkompressor ⁴ζ &amp; Null-Stability ⁴F=0 → Self-Adjoint Selectors &amp; PDG Mass Spectrum.",

    10: "<b>Stage 10 (§14.10–14.12 — 35-Term Lexicon &amp; 4 Asymptotic Limits):</b> Classical (τ→0), Boolean (ΔP→0), Abelian ([a_i,a_j]→0) &amp; Autonomous limits!"

  };



  const STAGE_TELEMETRY = {

    1: "ℛ : HeimCorpus(100 Eqs) → 9 Math Frameworks",

    2: "Cluster I (SM 1–4): MSC 18F20, 03B45 → Ch. 1",

    3: "Cluster II (SM 5–9a): MSC 18M60, 18M70 → Ch. 2",

    4: "Cluster III (SM 10–13a): MSC 18A30 → Ch. 3",

    5: "Cluster IV (SM 14–19a): MSC 53C07, 81T13 → Ch. 4",

    6: "Cluster V (SM 20–27): MSC 18N60, 18F10 → Ch. 5–6",

    7: "Cluster VI (SM 28–62): MSC 53B20, 58A10 → Ch. 7–9",

    8: "Cluster VII (SM 63–83): MSC 39A12, 52C22 → Ch. 10",

    9: "Cluster VIII (SM 84–100a): MSC 81V25 → Ch. 11 & App. B",

    10: "35 Canonical Terms | 4 Exact Degeneracy Limits"

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



  // =========================================================================

  // RENDERER FOR STAGES 1–9 (8-CLUSTER CONCORDANCE RING + SPOTLIGHTED CLUSTER)

  // =========================================================================

  function renderConcordanceRing(w, h, stInt) {

    // stInt = 1: All 8 Clusters active; stInt = 2..9: Spotlight Cluster (stInt - 2)

    const activeIdx = (stInt >= 2 && stInt <= 9) ? (stInt - 2) : -1;



    // Central Modern Mathematical Synthesis Core

    const coreLbl = activeIdx >= 0 ? CLUSTERS[activeIdx].target : "Modern Topos / Operad / Gauge / DEC Core";

    const pCore = drawNode3D(

      "Core_R", 0, 0, 0.55, 12, "#FFD700", "#20B2AA", coreLbl,

      "Codomain of Reconstruction Functor ℛ : HeimCorpus(SM Eqs. 1–100a) → Modern Mathematics (Strata A/B/C)", w, h

    );



    // Outer Octagonal Ring of the 8 Canonical Equation Clusters

    const ringPts = [];

    CLUSTERS.forEach((cl, idx) => {

      const a = (idx / 8) * Math.PI * 2 + timeSec * 0.25;

      const isSpot = (activeIdx === -1 || activeIdx === idx);

      const rad = (activeIdx === idx) ? 1.15 : 1.32;

      const z = (activeIdx === idx) ? 0.15 : -0.55;

      const x = rad * Math.cos(a), y = rad * Math.sin(a);



      const pCl = drawNode3D(

        cl.id, x, y, z, isSpot ? 9.5 : 6.0,

        isSpot ? cl.col : "#334155", "#fff",

        `Cluster ${cl.num} (${cl.eqs})`, cl.info, w, h

      );

      ringPts.push({ p: pCl, x, y, z, col: cl.col, isSpot });



      // Functorial R-Translation Beam to Central Core

      drawLine3D(pCl, pCore, isSpot ? cl.col : "rgba(100,116,139,0.25)", isSpot ? 2.8 : 1.2, isSpot ? null : [3, 3]);



      // Animated Functorial Translation Packet along active beam(s)

      if (isSpot) {

        const s = (timeSec * 0.75 + idx * 0.125) % 1.0;

        const px = x * (1 - s), py = y * (1 - s), pz = z * (1 - s) + 0.55 * s;

        const pt = proj(px, py, pz, w, h);

        ctx.save();

        ctx.fillStyle = "#FFD700";

        ctx.beginPath();

        ctx.arc(pt.sx, pt.sy, 4.0, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();

      }

    });



    // Connect Octagonal Ring Perimeter
    for (let i = 0; i < 8; i++) {
      drawLine3D(ringPts[i].p, ringPts[(i + 1) % 8].p, "rgba(65,105,225,0.42)", 1.6);
    }

    // Distinct 3D Holographic Centerpiece Sculpture for Spotlighted Cluster (Stages 2..9)
    if (activeIdx === 0) {
      // Cluster I (SM 1-4): 3D Aspect Compass (P_n, D_n, K_n) & Kripke-Joyal Sieve Tetrahedron
      const pP = drawNode3D("C1_Pn", -0.52, -0.35, 0.95, 6.5, "#4169E1", "#fff", "P_n (Predicative)", "SM Eq. 1: Prädikatrix Feature Space P^U in Ban_<=1", w, h);
      const pD = drawNode3D("C1_Dn",  0.52, -0.35, 0.95, 6.5, "#20B2AA", "#fff", "D_n (Dialectical)", "SM Eq. 1: Dialektik Operator Space D^U in Ban_<=1", w, h);
      const pQ = drawNode3D("C1_Om",  0.00,  0.52, 1.05, 7.5, "#FFD700", "#fff", "U ⊩ φ(s) (Ω)", "SM Eqs. 3–4: Kripke–Joyal Forcing over Heyting Classifier Ω(U)", w, h);
      drawLine3D(pP, pD, "#4169E1", 2.2); drawLine3D(pD, pQ, "#20B2AA", 2.2); drawLine3D(pQ, pP, "#FFD700", 2.2);
    } else if (activeIdx === 1) {
      // Cluster II (SM 5-9a): Operadic Tree Monad Pyramid & Grothendieck Aeondyne Helix
      const l1 = drawNode3D("C2_L1", -0.55, 0, 1.05, 6, "#20B2AA", "#fff", "T_frag", "SM Eq. 5a: Fragmentation Monad T_frag (Spaltbarkeit)", w, h);
      const l2 = drawNode3D("C2_L2",  0.55, 0, 1.05, 6, "#4169E1", "#fff", "T_pyr", "SM Eq. 5a: Pyramidal Grading Monad T_pyr via Beck Law λ̂", w, h);
      drawLine3D(l1, pCore, "#20B2AA", 2.4); drawLine3D(l2, pCore, "#4169E1", 2.4); drawLine3D(l1, l2, "#FFD700", 2.0, [3, 2]);
    } else if (activeIdx === 2) {
      // Cluster III (SM 10-13a): 3D Exzenter Span Pushout Octahedron P_a boxplus_phi P_b
      const pa = drawNode3D("C3_Pa", -0.58, 0, 0.55, 7, "#4169E1", "#fff", "P_a", "SM Eq. 10: Left Syntrix Carrier P_a", w, h);
      const pb = drawNode3D("C3_Pb",  0.58, 0, 0.55, 7, "#20B2AA", "#fff", "P_b", "SM Eq. 10: Right Syntrix Carrier P_b", w, h);
      const rPhi = drawNode3D("C3_R", 0, 0, 1.08, 7.5, "#FFA500", "#FFD700", "R_φ (dim p+q−λ)", "SM Eqs. 11–12: Exzenter Span Pushout Coupling Node R_φ (15 Classes)", w, h);
      drawLine3D(rPhi, pa, "#FFA500", 2.4); drawLine3D(rPhi, pb, "#FFA500", 2.4);
      drawLine3D(pa, pCore, "#4169E1", 2.2); drawLine3D(pb, pCore, "#20B2AA", 2.2);
    } else if (activeIdx === 3) {
      // Cluster IV (SM 14-19a): Non-Abelian Yang-Mills Flux Tube & Holoform Emergence Ring
      ctx.beginPath(); ctx.strokeStyle = "#DC143C"; ctx.lineWidth = 2.6;
      for (let i = 0; i <= 36; i++) {
        const a = (i / 36) * Math.PI * 2;
        const p = proj(0.52 * Math.cos(a), 0.52 * Math.sin(a), 0.85 + 0.12 * Math.sin(a * 3 + timeSec * 3), w, h);
        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
      }
      ctx.stroke();
      drawNode3D("C4_Hol", 0, 0, 1.05, 8, "#DC143C", "#FFD700", "Δ_emerg^ℐ > 0 (Holoform)", "SM Eqs. 16–19a: Non-Abelian Enyphanie Curvature Ω_int^𝒟 stabilizing Holoform!", w, h);
    } else if (activeIdx === 4) {
      // Cluster V (SM 20-27): Postnikov / Metroplex Tower & Final Coalgebra nu T
      const m1 = drawNode3D("C5_M1", 0, 0, 0.82, 6.5, "#9370DB", "#fff", "Met_n(𝒳_syn)", "SM Eqs. 20–25: Higher Metroplex Hierarchy in (∞,1)-Topos 𝒳_syn", w, h);
      const nu = drawNode3D("C5_Nu", 0, 0, 1.12, 8, "#FFD700", "#9370DB", "ν𝒯 ≅ 𝒯(ν𝒯) (SM-27)", "SM Eq. 27: Final Telecentric Coalgebra Attractors in Area AR_q", w, h);
      drawLine3D(pCore, m1, "#9370DB", 2.4); drawLine3D(m1, nu, "#FFD700", 2.6);
    } else if (activeIdx === 5) {
      // Cluster VI (SM 28-62): 36-Component Hermetry Tensor Ring (21 Sym + 15 Skew) on R_6
      const gPlus  = drawNode3D("C6_Sym", -0.55, 0, 0.98, 7.5, "#4169E1", "#fff", "²ḡ₊ (21 Sym)", "SM Eqs. 42–49: 21 Symmetric Riemannian Metric Components on R₆", w, h);
      const gMinus = drawNode3D("C6_Skw",  0.55, 0, 0.98, 7.5, "#FFA500", "#fff", "²ḡ₋ (15 Skew)", "SM Eqs. 42–62: 15 Anti-Hermitian Skew Torsion/EM Components on R₄ × S₂", w, h);
      drawLine3D(gPlus, pCore, "#4169E1", 2.4); drawLine3D(gMinus, pCore, "#FFA500", 2.4); drawLine3D(gPlus, gMinus, "#FFD700", 2.2);
    } else if (activeIdx === 6) {
      // Cluster VII (SM 63-83): 3D Metronic DEC Primal-Dual Lattice Cell
      const d1 = drawNode3D("C7_Nab", -0.52, 0, 0.98, 7, "#38bdf8", "#fff", "∇_i = I − E_i⁻¹", "SM Eqs. 63–72: Discrete Metronic Backward Difference Operator", w, h);
      const d2 = drawNode3D("C7_DEC",  0.52, 0, 0.98, 7, "#20B2AA", "#FFD700", "d_τ² = 0 (DEC)", "SM Eqs. 73–83: Exact Discrete Exterior Calculus Cochain Complex on 𝕄_τ^n", w, h);
      drawLine3D(d1, d2, "#38bdf8", 2.4); drawLine3D(d1, pCore, "#38bdf8", 2.0); drawLine3D(d2, pCore, "#20B2AA", 2.0);
    } else if (activeIdx === 7) {
      // Cluster VIII (SM 84-100a): K_8 Selector Polytope & Binomial Mass Spire L_p = binom(6,p)
      const sKer = drawNode3D("C8_Ker", -0.52, 0, 0.95, 7.5, "#4ade80", "#fff", "ker(⁴F) ≠ {0}", "SM Eqs. 84–95: Null-Stability Kernel of 4th-Stage Metronic Compressor", w, h);
      const sMas = drawNode3D("C8_Mas",  0.52, 0, 0.95, 8.0, "#FFD700", "#4ade80", "L_p = (6,15,20)", "SM Eqs. 96–100a: Closed Particle Mass Spectrum across 6D Subspace Tiers", w, h);
      drawLine3D(sKer, sMas, "#4ade80", 2.6); drawLine3D(sKer, pCore, "#4ade80", 2.2); drawLine3D(sMas, pCore, "#FFD700", 2.2);
    }
  }



  // Stage 10: 35-Term Ontological Lexicon Tree & 4 Asymptotic Degeneracy Reductions (§14.10–14.12)

  function renderStage10(w, h) {

    const pCenter = drawNode3D("Lex_Root", 0, 0, 0, 11.5, "#FFD700", "#fff", "35-Term Syntrometric Lexicon", "Complete Ontological Concordance & Asymptotic Degeneracy Reductions (§14.10–14.12)", w, h);

    const limits = [

      { id: "Lim_Class", x: -1.15, y: -0.75, z:  0.65, col: "#38bdf8", lbl: "1. Classical Limit (τ → 0)", info: "Metron area τ → 0: ∇_i → ∂_i and DEC complex Ω_d^• converges to smooth de Rham Ω^•(M)" },

      { id: "Lim_Bool",  x:  1.15, y: -0.75, z:  0.65, col: "#4169E1", lbl: "2. Boolean Limit (ΔP, ΔD → 0)", info: "Interval bands collapse to points: Heyting Ω(U) degenerates to Boolean {0, 1} (Tarskian logic)" },

      { id: "Lim_Abel",  x: -1.15, y:  0.75, z: -0.65, col: "#20B2AA", lbl: "3. Abelian Limit ([a_i, a_j] → 0)", info: "Commutators vanish: Interaction curvature Ω_int^𝒟 → 0 (Decoupled Maxwell electrodynamics)" },

      { id: "Lim_Auto",  x:  1.15, y:  0.75, z: -0.65, col: "#FFA500", lbl: "4. Autonomous Limit (ν𝒯 → const)", info: "Telecentric attractor decouples: Äondyne trajectories reduce to memoryless Markov chains" }

    ];

    limits.forEach(lm => {

      const pL = drawNode3D(lm.id, lm.x, lm.y, lm.z, 8.5, lm.col, "#fff", lm.lbl, lm.info, w, h);

      drawLine3D(pCenter, pL, lm.col, 2.8, [4, 2]);

    });

  }



  // Master 60fps Loop

  function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch14-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }

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



    function dispatchStageCrossFade(stInt, stArg) {
      if (stInt <= 9) renderConcordanceRing(w, h, stInt);

    else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh14Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch14-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch14-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch14-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch14-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch14-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh14Stage = function(val) { window.setCh14Stage(val, true); };



  window.enableCh14Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch14-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh14WithDeck();

  };



  window.toggleCh14Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch14-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh14Spotlight = function() {

    const hud = document.getElementById('ch14-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh14Minimize = function() {

    const hud = document.getElementById('ch14-3d-hud');

    const b = document.getElementById('ch14-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh14WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch14-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-14, section[data-chapter="14"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.setCh14Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh14WithDeck = syncCh14WithDeck;
  }



  // 3D Orbit Drag, Wheel Zoom & Node Click Hit-Testing

  wrap.addEventListener('mousedown', e => {

    e.stopPropagation();

    isDragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mousemove', e => {

    if (!isDragging) return;

    camYaw += (e.clientX - lastX) * 0.012;

    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mouseup', () => { isDragging = false; });

  wrap.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    camYaw += dx * 0.012;
    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
  }, { passive: true });

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

    const insp = document.getElementById('ch14-node-inspector');

    if (hit && insp) {

      selectedId = hit.id;

      insp.innerText = hit.info;

    } else if (insp) {

      selectedId = null;

      insp.innerText = "Drag to Orbit 3D · Click Cluster to Inspect";

    }

  });



  wrap.addEventListener('wheel', e => {

    e.preventDefault();

    e.stopPropagation();

    camZoom = Math.max(0.65, Math.min(2.0, camZoom - e.deltaY * 0.001));

  }, { passive: false });



  function init() {

    resize();

    syncCh14WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_14 = false;
    const synBindSync_syncCh14WithDeck = () => {
      if (syncRaf_14) return;
      syncRaf_14 = true;
      requestAnimationFrame(() => {
        syncRaf_14 = false;
        syncCh14WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh14WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh14WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh14WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh14WithDeck, { passive: true });

    const revEl_syncCh14WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh14WithDeck) {
      revEl_syncCh14WithDeck.addEventListener('scroll', synBindSync_syncCh14WithDeck, { passive: true });
      revEl_syncCh14WithDeck.addEventListener('touchmove', synBindSync_syncCh14WithDeck, { passive: true });
    }
    const vpEl_syncCh14WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh14WithDeck) {
      vpEl_syncCh14WithDeck.addEventListener('scroll', synBindSync_syncCh14WithDeck, { passive: true });
      vpEl_syncCh14WithDeck.addEventListener('touchmove', synBindSync_syncCh14WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh14WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh14WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh14WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh14WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh14WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh14WithDeck);
    }

    const hud = document.getElementById('ch14-3d-hud');

    if (hud) {

      hud.querySelectorAll('input, button').forEach(el => {

        el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());

      });

    }

  }



  init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh14Engine);
  } else {
    runCh14Engine();
  }
})();

})();

/* ==========================================================================
 * CHAPTER 15 INTERACTIVE WIDGET RUNTIME
 * ========================================================================== */
(function() {
(function() {
  window.showGenericTab = window.showGenericTab || function(prefix, idx, maxIdx, btnEl) {
    for (let i = 1; i <= maxIdx; i++) {
      const p1 = document.getElementById(prefix + '-' + i);
      if (p1) p1.classList.toggle('active', i === idx);
      const p2 = document.getElementById(prefix + '-pane-' + i);
      if (p2) p2.classList.toggle('active', i === idx);
    }
    if (btnEl && btnEl.parentElement) {
      Array.from(btnEl.parentElement.children).forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch(() => {});
    }
  };

  // =========================================================================
  // WIDGET 1 (§15.1): Master Axiomatic Dependency DAG Explorer
  // =========================================================================
  const dagNodes = {
    topos: {
      title: "Stratum I (Ch 1): Sheaf Topos E_syn = Sh(Ctx_adm^sk, J_syn)",
      thm: "Thm. 1.8 & Thm. 1.14 (Grothendieck Site & Exact Descent Equalizers)",
      inEdges: "Primordial Apodictic Base AP_0 & Contractive Contexts U = (D,P,C,K,z,ζ)",
      outEdges: "→ Operad O_syn (Requires Rank Expansion) | → Quantitative Site Ctx_quant (Restriction to Coeff)",
      color: "#4169E1"
    },
    operad: {
      title: "Stratum I (Ch 2): Colored Banach Operad O_syn & Tree Monads",
      thm: "Def. 2.1 & Thm. 2.9 (Beck Distributive Law λ : T_pyr T_frag ⇒ T_frag T_pyr)",
      inEdges: "← Sheaf Topos E_syn (Rank Expansion)",
      outEdges: "→ Corporate Pushouts ⊞_φ (Coupling Σ_r) | → Higher Topos X_syn (Recursive Nesting)",
      color: "#20B2AA"
    },
    pushout: {
      title: "Stratum I (Ch 3): Corporate Determinacy & Span Pushouts",
      thm: "Thm. 3.11 (Coupled Span Pushouts ⊞_φ & Conflexivity Colimits lim_→ D)",
      inEdges: "← Operad O_syn (Coupling Σ_r)",
      outEdges: "→ Interaction Curvature Ω_int^D (Induces Cross-Commutators)",
      color: "#20B2AA"
    },
    coalg: {
      title: "Stratum II (Ch 6): Telecentric Final Coalgebra (νT, ζ)",
      thm: "Thm. 6.7 & Thm. 6.14 (Final Coalgebra Existence & Lyapunov Stability V̇ ≤ -γV)",
      inEdges: "← Ambient (∞,1)-Topos X_syn (Asymptotic Attractors)",
      outEdges: "→ Matter Condensation m = m_0 (L_p/L_1) ∏ λ_k (Global Telecentric Filtering)",
      color: "#FFD700"
    },
    highertopos: {
      title: "Stratum II (Ch 5): Ambient (∞,1)-Topos X_syn & Tektonik",
      thm: "Def. 5.2 & Thm. 5.12 (Complete Segal Spaces & Bridge Adjunctions B ⊣ R)",
      inEdges: "← Operad O_syn (Recursive Nesting)",
      outEdges: "→ Telecentric Final Coalgebra (νT, ζ) (Asymptotic Attractors)",
      color: "#20B2AA"
    },
    gauge: {
      title: "Stratum II (Ch 4): Non-Abelian Interaction Curvature Ω_int^D",
      thm: "Thm. 4.6 & Thm. 4.9 (Ω_int^D = F_A - ∑ F_k^(A_0) & Bochner–Weitzenböck Laplacian)",
      inEdges: "← Corporate Pushouts ⊞_φ (Induces Cross-Commutators)",
      outEdges: "→ Strukturkaskaden ²ḡ_∞ (Christoffel Assembly Γ_{kl}^i)",
      color: "#20B2AA"
    },
    quant: {
      title: "Stratum III (Ch 7–8): Quantitative Site Ctx_quant & Fréchet Separation",
      thm: "Def. 7.1 & Thm. 7.6 (Nuclear Variable Separation C_b^∞ ≅ ⊗̂_π C_b^∞ over ℝ_{≥0}^n)",
      inEdges: "← Sheaf Topos E_syn (Restriction to Coeff)",
      outEdges: "→ Strukturkaskaden ²ḡ_∞ (Tensor Operad O_quant)",
      color: "#4169E1"
    },
    cascade: {
      title: "Stratum III (Ch 8–9): Strukturkaskaden & Banach Apex ²ḡ_∞",
      thm: "Thm. 8.5 & Thm. 9.4 (Monomial Tensor Norm Estimates & Apex Convergence ²ḡ_∞)",
      inEdges: "← Quantitative Site Ctx_quant (O_quant) | ← Interaction Curvature (Christoffel Γ_{kl}^i)",
      outEdges: "→ Geodesic Breakdown Singularity (∇ ²ḡ → ∞)",
      color: "#20B2AA"
    },
    singularity: {
      title: "Stratum III→IV CRISIS (Ch 9): Geodesic Gradient Breakdown",
      thm: "Thm. 9.7 (Transition Criterion χ√|g_{(p)}| = 1 ⇒ Geodesic Singularity)",
      inEdges: "← Strukturkaskaden (∇ ²ḡ → ∞)",
      outEdges: "⇢ [GEOMETRIC OBSTRUCTION] Forces Discrete Lattice Transition to Metronic Calculus M_τ^n (Thm. 10.4)!",
      color: "#DC143C"
    },
    dec: {
      title: "Stratum IV (Ch 10): Metronic Calculus & Discrete Exterior Calculus",
      thm: "Thm. 10.2 & Thm. 10.6 (Discrete Lattice M_τ^n, Difference Algebra ∇_i, DEC d_τ² ≡ 0)",
      inEdges: "⇠ Geodesic Breakdown Singularity (Forced by χ√|g_{(p)}| = 1 Obstruction)",
      outEdges: "→ Matter Condensation (Metronization ⁴F = 0)",
      color: "#FFA500"
    },
    mass: {
      title: "Stratum IV (Ch 11): Matter Condensation & Mass Eigenvalue Spectrum",
      thm: "Thm. 11.5 & Thm. 11.9 (Self-Adjoint Selectors Sel Ψ = λΨ, m = m_0 (L_p/L_1) ∏ λ_k)",
      inEdges: "← Metronic Calculus (Metronization ⁴F = 0) | ← Telecentric Coalgebra (Telecentric Filtering)",
      outEdges: "→ Empirical PDG Mass Spectrum & Astroparticle LIV Falsification Protocols (Ch 15 & App B)",
      color: "#FFD700"
    }
  };

  window.ch15_selectDagNode = function(key) {
    const info = dagNodes[key] || dagNodes.singularity;
    const readout = document.getElementById('ch15-dag-readout');
    if (!readout) return;
    document.querySelectorAll('.ch15-dag-rect').forEach(el => {
      el.setAttribute('stroke-width', el.id === 'ch15-node-' + key ? '3.2' : '1.4');
    });
    readout.style.borderLeftColor = info.color;
    readout.innerHTML =
      `<b style="color:${info.color};">${info.title}</b> — <span>${info.thm}</span><br>` +
      `<span style="color:#94a3b8;"><b>Incoming:</b> ${info.inEdges}</span><br>` +
      `<span style="color:#fcd34d;"><b>Outgoing:</b> ${info.outEdges}</span>`;
  };

  // =========================================================================
  // WIDGET 2 (§15.3 & App B.6): Astroparticle LIV Dispersion & Exclusion Lab
  // =========================================================================
  window.ch15_updateLIVLab = function() {
    const elTau = document.getElementById('ch15-liv-tau');
    if (!elTau) return;
    const tauRatio = parseFloat(elTau.value); // tau / tau_derived
    const eGamma = parseFloat(document.getElementById('ch15-liv-egamma').value); // GeV
    const distGpc = parseFloat(document.getElementById('ch15-liv-dist').value); // Gpc

    document.getElementById('ch15-liv-tau-val').innerText = tauRatio.toFixed(2) + ' × τ₀';
    document.getElementById('ch15-liv-egamma-val').innerText = eGamma.toFixed(0) + ' GeV';
    document.getElementById('ch15-liv-dist-val').innerText = distGpc.toFixed(1) + ' Gpc';

    // Derived metronic scale E_QG / M_Planck = 1.52 / sqrt(tauRatio)
    const eqgRatio = 1.519 / Math.sqrt(tauRatio);
    const eqgGeV = eqgRatio * 1.2209e19;
    // Quadratic dispersion delay (ms) over D Gpc: D/c in seconds = distGpc * 1.029e17 s
    const dOverC_sec = distGpc * 1.029e17;
    const deltaT_quad_ps = Math.pow(eGamma / eqgGeV, 2) * dOverC_sec * 1e12;
    const deltaT_lin_ms = (eGamma / eqgGeV) * dOverC_sec * 1e3;

    const marker = document.getElementById('ch15-liv-marker');
    const markerLbl = document.getElementById('ch15-liv-marker-lbl');
    if (marker && markerLbl) {
      // Map eqgRatio in [0.5, 2.5] to x in [30, 390]
      const xPos = Math.max(25, Math.min(395, 30 + ((eqgRatio - 0.5) / 2.0) * 360));
      marker.setAttribute('cx', xPos.toFixed(1));
      markerLbl.setAttribute('x', xPos.toFixed(1));
      markerLbl.textContent = `E_QG = ${eqgRatio.toFixed(2)} M_P`;
      marker.setAttribute('fill', eqgRatio >= 1.22 ? '#FFD700' : '#DC143C');
    }

    const box = document.getElementById('ch15-liv-readout');
    if (box) {
      const viable = eqgRatio >= 1.22;
      box.style.borderLeftColor = viable ? '#20B2AA' : '#DC143C';
      box.innerHTML =
        `<b>Derived Cutoff:</b> E_QG = ħc/√τ = <b style="color:#FFD700;">${eqgRatio.toFixed(3)} M_Planck</b> (${eqgGeV.toExponential(3)} GeV) | ` +
        `<b>Fermi-LAT GRB 090510 Bound (1.22 M_P):</b> ` +
        (viable
          ? `<span style="color:#20B2AA; font-weight:bold;">✓ EMPIRICALLY VIABLE (E_QG &gt; 1.22 M_P)</span>`
          : `<span style="color:#ff6b81; font-weight:bold;">✗ EXCLUDED BY GRB 090510 (E_QG &lt; 1.22 M_P)</span>`) +
        `<br><b>Arrival Time Delay (E = ${eGamma} GeV, D = ${distGpc} Gpc):</b> Linear Δt₁ ≈ <b>${deltaT_lin_ms.toFixed(2)} ms</b> | Parity-Symmetric Quadratic Δt₂ ≈ <b>${deltaT_quad_ps.toExponential(2)} ps</b>`;
    }
  };

  // =========================================================================
  // WIDGET 3 (§15.4): 5 Open Conjectures Simulator (Spectral Gap & Negentropy)
  // =========================================================================
  window.ch15_updateConjectureSim = function() {
    const elGamma = document.getElementById('ch15-conj-gamma');
    if (!elGamma) return;
    const gamma = parseFloat(elGamma.value);
    const tAeon = parseFloat(document.getElementById('ch15-conj-taeon').value);
    const pTier = parseInt(document.getElementById('ch15-conj-p').value);

    document.getElementById('ch15-conj-gamma-val').innerText = gamma.toFixed(2);
    document.getElementById('ch15-conj-taeon-val').innerText = tAeon.toFixed(1);
    document.getElementById('ch15-conj-p-val').innerText = `p=${pTier}`;

    const comb6 = [1, 6, 15, 20, 15, 6, 1][pTier];
    const vRatio = Math.exp(-gamma * tAeon);
    const negFlux = -gamma * vRatio;
    const box = document.getElementById('ch15-conj-readout');
    if (box) {
      box.innerHTML =
        `<b>Conj. 2 Combinatorial Weight:</b> L_${pTier} = C(6,${pTier}) = <b style="color:#FFD700;">${comb6}</b> (Ratio L_${pTier}/L_1 = ${(comb6/6).toFixed(3)}) | ` +
        `<b>Conj. 3 Spectral Gap:</b> ΔE ≥ ħc/√τ = <b>1.855×10¹⁹ GeV &gt; 0</b><br>` +
        `<b>Conj. 4 Negentropy Flux on S₂(x₅,x₆):</b> V(t)/V(0) = e^{-γt} = <b>${vRatio.toFixed(4)}</b> ⇒ ` +
        `L_{X₅} S_therm ≤ -γ V(t) = <b style="color:#20B2AA;">${negFlux.toFixed(4)} V(0) &lt; 0 (Strict Local Entropy Reduction!)</b>`;
    }
  };

  // =========================================================================
  // WIDGET 4 (§15.5): Global Limiting Projections Explorer
  // =========================================================================
  window.ch15_updateLimitProjection = function() {
    const elTau = document.getElementById('ch15-lim-tau');
    if (!elTau) return;
    const tauPct = parseInt(elTau.value); // 0 = continuum limit, 100 = discrete metronic
    const skewPct = parseInt(document.getElementById('ch15-lim-skew').value); // 0 = symmetric GR, 100 = full non-Hermitian
    const dimMode = parseInt(document.getElementById('ch15-lim-dim').value); // 12, 6, or 4

    document.getElementById('ch15-lim-tau-val').innerText = tauPct === 0 ? 'τ → 0⁺' : `${tauPct}% τ₀`;
    document.getElementById('ch15-lim-skew-val').innerText = skewPct === 0 ? '²ḡ₋ → 0' : `${skewPct}%`;
    document.getElementById('ch15-lim-dim-val').innerText = `R_${dimMode}`;

    let regime = "";
    let eq = "";
    let color = "#FFD700";
    if (dimMode === 4 && tauPct === 0 && skewPct === 0) {
      regime = "CLASSICAL EINSTEIN GENERAL RELATIVITY RECOVERED (Exact Uncoupled Reduct)";
      eq = "∇^μ G_{μν} = 0  and  G_{μν} = 0 on smooth 4D Lorentzian manifold R₄";
      color = "#20B2AA";
    } else if (tauPct === 0 && skewPct > 0) {
      regime = `CONTINUOUS EINSTEIN–MAXWELL–TORSION FIELD THEORY ON R_${dimMode}`;
      eq = "²ḡ = ²ḡ₊ + ²ḡ₋ with non-vanishing anti-Hermitian torsion connection Γ_{(-)}";
      color = "#FFA500";
    } else if (tauPct > 0 && dimMode === 4 && skewPct === 0) {
      regime = "DISCRETE LATTICE QUANTUM MECHANICS / REGGE–VERLET GRAVITY ON M_τ⁴";
      eq = "Δ_τ ψ = ∑ ∇_i^* ∇_i ψ on ℓ²(M_τ⁴) → Schrödinger/Dirac correspondence as τ → 0⁺";
      color = "#4169E1";
    } else {
      regime = `FULL MODERNIZED SYNTROMETRIC DISCRETE GEOMETRY ON R_${dimMode} (M_τ^${dimMode})`;
      eq = "⁴F(g, ∇) = 0  ⇒  Self-Adjoint Selector Spectrum Sel Ψ_k = λ_k Ψ_k";
      color = "#FFD700";
    }

    const box = document.getElementById('ch15-lim-readout');
    if (box) {
      box.style.borderLeftColor = color;
      box.innerHTML =
        `<b style="color:${color};">${regime}</b><br>` +
        `<b>Governing Equation:</b> <span style="font-family:monospace;">${eq}</span> | ` +
        `<b>Firewall Check:</b> Stratum A/B proofs remain 100% invariant under limiting projections.`;
    }
  };

  // =========================================================================
  // WIDGET 5 (App A §A.3): Gentzen Cut-Elimination Rank & Height Reducer
  // =========================================================================
  window.ch15_updateCutReduction = function() {
    const elConn = document.getElementById('ch15-cut-conn');
    if (!elConn) return;
    const conn = elConn.value;
    const kLvl = parseInt(document.getElementById('ch15-cut-k').value);
    const rkA = parseInt(document.getElementById('ch15-cut-rka').value);
    const rkB = parseInt(document.getElementById('ch15-cut-rkb').value);

    document.getElementById('ch15-cut-k-val').innerText = `k=${kLvl}`;
    document.getElementById('ch15-cut-rka-val').innerText = rkA;
    document.getElementById('ch15-cut-rkb-val').innerText = rkB;

    let rkCut = 1, newRankStr = "", rulePair = "", treeAfter = "";
    if (conn === 'conj') {
      rkCut = Math.max(rkA, rkB) + 1;
      rulePair = "(∧R) + (∧L) Principal Cut on φ₁ ∧ φ₂";
      newRankStr = `Two sequential cuts on φ₁ (rk=${rkA}) and φ₂ (rk=${rkB}), both < rk(φ₁∧φ₂) = ${rkCut}`;
      treeAfter = "Cut(D_{1b} ⊢ φ₂,  Cut(D_{1a} ⊢ φ₁,  D_{2a}: Δ,φ₁,φ₂ ⊢ χ)) + Contraction (C)";
    } else if (conn === 'impl') {
      rkCut = Math.max(rkA, rkB) + 1;
      rulePair = "(→R) + (→L) Principal Cut on φ₁ → φ₂";
      newRankStr = `Inner cut on φ₁ (rk=${rkA}) feeding outer cut on φ₂ (rk=${rkB}), both < ${rkCut}`;
      treeAfter = "Cut(Cut(D_{2a}: Δ ⊢ φ₁, D_{1a}: Γ,φ₁ ⊢ φ₂),  D_{2b}: Δ',φ₂ ⊢ χ)";
    } else if (conn === 'box') {
      rkCut = rkA + 1;
      rulePair = "(□_S K) + (□_S-Ref) Principal Cut on □_S θ";
      newRankStr = `Single lower-rank cut on θ (rk=${rkA} < rk(□_S θ) = ${rkCut}) after iterative (□_S-Ref)`;
      treeAfter = "Cut(D'_{1a}: □_S Γ₀ ⊢^k θ,  D_{2a}: Δ, θ ⊢^k χ)";
    } else if (conn === 'dyn') {
      rkCut = rkA + 1;
      rulePair = "([π_F]-Unstep) + ([π_F]-Step) Principal Cut on [π_F]θ";
      newRankStr = `Level-shifted cut at k+1=${kLvl+1} on θ (rk=${rkA} < rk([π_F]θ) = ${rkCut}) followed by ([π_F]-Unstep)`;
      treeAfter = "[π_F]-Unstep( Cut_{k+1}(D_{1a}: Ext(Γ) ⊢ θ,  D_{2a}: Ext(Δ),θ ⊢ φ₀) )";
    } else if (conn === 'dia') {
      rkCut = rkA + 1;
      rulePair = "(◇_S-Ref) + (FS-Int) Dual Principal Cut on ◇_S θ";
      newRankStr = `Dualizes across □_S Γ₀, θ ⊢^k ◇_S φ with strictly smaller cut rank rk(θ) = ${rkA} < rk(◇_S θ) = ${rkCut}`;
      treeAfter = "◇_S-Ref( Cut_k(D_{1a}: Γ₀ ⊢^k θ,  D_{2a}: □_S Δ₀, θ ⊢^k ◇_S χ) )";
    } else {
      rkCut = Math.pow(2, kLvl) + rkA + 2;
      rulePair = `(Stab_${kLvl} R) + (Stab L₁/L₂) Principal Cut on Stable_${kLvl}(P)`;
      newRankStr = `Reduces to generative sub-part X with rk(Stable_${Math.max(0,kLvl-1)}(X)) = ${Math.pow(2,Math.max(0,kLvl-1)) + Math.max(1,rkA-1) + 2} < ${rkCut}`;
      treeAfter = "Direct cut on P' (via Stab L₁) or level-(k-1) IGP stability cut (via Stab L₂)";
    }

    const box = document.getElementById('ch15-cut-readout');
    if (box) {
      box.innerHTML =
        `<b>Redex:</b> <span style="color:#FFD700;">${rulePair}</span> | <b>Original Measure:</b> (lvl=${kLvl}, rk=${rkCut})<br>` +
        `<b>Principal Reduction (Lem. A.5):</b> <span style="color:#20B2AA;">${newRankStr}</span><br>` +
        `<b>Reduced Proof Term:</b> <code style="color:#fcd34d;">${treeAfter}</code>`;
    }
  };

  // =========================================================================
  // WIDGET 6 (App B §B.2–B.3): DESY 6D Particle Mass Spectrum Calculator
  // =========================================================================
  const desyParticles = [
    { name: "Electron (e⁻)", k: 1, P: 0, Q: 1, nu: 1, C: 0, qx: -1, heim: 0.51099, exp: 0.5109989 },
    { name: "Muon (μ⁻)", k: 1, P: 0, Q: 1, nu: 2, C: 0, qx: -1, heim: 105.658, exp: 105.65837 },
    { name: "Tau (τ⁻)", k: 1, P: 0, Q: 1, nu: 3, C: 0, qx: -1, heim: 1776.82, exp: 1776.86 },
    { name: "Neutral Pion (π⁰)", k: 2, P: 2, Q: 0, nu: 1, C: 0, qx: 0, heim: 134.96, exp: 134.9768 },
    { name: "Charged Pion (π±)", k: 2, P: 2, Q: 0, nu: 1, C: 0, qx: 1, heim: 139.57, exp: 139.5704 },
    { name: "Charged Kaon (K±)", k: 2, P: 1, Q: 0, nu: 1, C: 1, qx: 1, heim: 493.68, exp: 493.677 },
    { name: "Neutral Kaon (K⁰)", k: 2, P: 1, Q: 0, nu: 1, C: 1, qx: 0, heim: 497.61, exp: 497.611 },
    { name: "Eta Meson (η)", k: 2, P: 0, Q: 0, nu: 1, C: 0, qx: 0, heim: 548.64, exp: 547.862 },
    { name: "Rho Resonance (ρ±)", k: 2, P: 2, Q: 2, nu: 1, C: 0, qx: 1, heim: 775.20, exp: 775.26 },
    { name: "Proton (p⁺)", k: 3, P: 1, Q: 1, nu: 1, C: 0, qx: 1, heim: 938.272, exp: 938.27208 },
    { name: "Neutron (n⁰)", k: 3, P: 1, Q: 1, nu: 1, C: 0, qx: 0, heim: 939.565, exp: 939.56542 },
    { name: "Lambda (Λ⁰)", k: 3, P: 0, Q: 1, nu: 1, C: -1, qx: 0, heim: 1115.68, exp: 1115.683 },
    { name: "Sigma Plus (Σ⁺)", k: 3, P: 2, Q: 1, nu: 1, C: -1, qx: 1, heim: 1189.37, exp: 1189.37 },
    { name: "Sigma Zero (Σ⁰)", k: 3, P: 2, Q: 1, nu: 1, C: -1, qx: 0, heim: 1192.64, exp: 1192.642 },
    { name: "Sigma Minus (Σ⁻)", k: 3, P: 2, Q: 1, nu: 1, C: -1, qx: -1, heim: 1197.45, exp: 1197.449 },
    { name: "Xi Minus (Ξ⁻)", k: 3, P: 1, Q: 1, nu: 1, C: -2, qx: -1, heim: 1321.71, exp: 1321.71 },
    { name: "Omega Minus (Ω⁻)", k: 3, P: 0, Q: 3, nu: 1, C: -3, qx: -1, heim: 1672.45, exp: 1672.45 }
  ];

  window.ch15_updateMassCalc = function() {
    const sel = document.getElementById('ch15-mass-preset');
    if (!sel) return;
    const idx = parseInt(sel.value);
    const pt = desyParticles[idx] || desyParticles[9];
    const L_vec = [0, 6, 15, 20, 15, 6, 1];
    const Lp = L_vec[pt.k];
    const P_nu = (pt.nu - 1) + 7.42 * Math.pow(pt.nu - 1, 3);
    const corr = 1.0 - 0.000543 * (pt.qx * pt.qx) + 0.001378 * (1 - Math.abs(pt.qx)) + 0.001210 * Math.abs(pt.C) + 0.000852 * P_nu;
    const relErr = ((pt.heim - pt.exp) / pt.exp) * 100.0;

    const box = document.getElementById('ch15-mass-readout');
    if (box) {
      box.innerHTML =
        `<b>6D Quantum State Vector q_Heim = (k=${pt.k}, P=${pt.P}, Q=${pt.Q}, ν=${pt.nu}, C=${pt.C}, q_x=${pt.qx >= 0 ? '+'+pt.qx : pt.qx}):</b><br>` +
        `<b>Subspace Weight:</b> L_${pt.k} = C(6,${pt.k}) = <b style="color:#FFD700;">${Lp}</b> | ` +
        `<b>Perturbation Bracket:</b> [1 - κ₁q_x² + κ_n(1-|q_x|) + κ₂|C| + κ₃P(ν)] = <b>${corr.toFixed(6)}</b><br>` +
        `<b>Heim Mass (SM-100a):</b> <b style="color:#20B2AA;">${pt.heim} MeV/c²</b> vs. <b>PDG Exp:</b> <b>${pt.exp} MeV/c²</b> ` +
        `(Relative Error Δm/m = <b style="color:#FFD700;">${relErr >= 0 ? '+' : ''}${relErr.toFixed(5)}%</b>)`;
    }
  };

  // =========================================================================
  // WIDGET 7 (App C §C.1–C.2): Lean 4 Import Firewall Linter Simulator
  // =========================================================================
  window.ch15_testFirewallLinter = function() {
    const src = document.getElementById('ch15-fw-src');
    const dst = document.getElementById('ch15-fw-dst');
    if (!src || !dst) return;
    const sVal = src.value; // Target module being compiled
    const dVal = dst.value; // Imported dependency

    const box = document.getElementById('ch15-fw-readout');
    if (!box) return;

    const isCore = (sVal === 'StratumA.Topos' || sVal === 'StratumA.DEC' || sVal === 'StratumB.Sequents');
    const isForbiddenDep = (dVal === 'StratumC.Realization' || dVal === 'StratumD.HeimCorpus');

    if (isCore && isForbiddenDep) {
      box.style.borderLeftColor = '#DC143C';
      box.innerHTML =
        `<span style="color:#ff6b81; font-weight:bold;">✗ LEAN 4 IMPORT FIREWALL BREACH DETECTED (checkTransitiveFirewall):</span><br>` +
        `<code>Syntrometrie.${sVal}</code> (Stratum A/B Core, Type <code>[M]</code>) attempted to import <code>Syntrometrie.${dVal}</code> ` +
        `(${dVal.startsWith('StratumC') ? 'Type [P] PhysicalHypothesis' : 'Stratum D Historical Register'}).<br>` +
        `<span style="color:#fcd34d;"><b>Kernel Action:</b> Compilation aborted! Axiomatic Non-Contamination Rule enforced statically.</span>`;
    } else {
      box.style.borderLeftColor = '#20B2AA';
      box.innerHTML =
        `<span style="color:#20B2AA; font-weight:bold;">✓ IMPORT FIREWALL LINTER PASSED (checkTransitiveFirewall = ok):</span><br>` +
        `Dependency <code>Syntrometrie.${dVal}</code> → <code>Syntrometrie.${sVal}</code> respects the Directed Acyclic Graph ` +
        `(Stratum A → Stratum B → Stratum C ← Stratum D) and preserves <code>FullMetadataCompatible</code>.`;
    }
  };

  // =========================================================================
  // WIDGET 8 (App D §D.1–D.2): Interval Newton–Krawczyk & Cech Descent Lab
  // =========================================================================
  window.ch15_updateKrawczykCech = function() {
    const elDelta = document.getElementById('ch15-kr-delta');
    if (!elDelta) return;
    const delta0 = parseFloat(elDelta.value);
    const lip = parseFloat(document.getElementById('ch15-kr-lip').value); // ||I - Y_k J_k||
    const defect = parseFloat(document.getElementById('ch15-kr-def').value); // max ||s_i - s_j||

    document.getElementById('ch15-kr-delta-val').innerText = `±${delta0.toFixed(2)} MeV`;
    document.getElementById('ch15-kr-lip-val').innerText = lip.toFixed(2);
    document.getElementById('ch15-kr-def-val').innerText = defect.toFixed(2);

    const mTrue = 938.27208;
    const w1 = delta0 * lip;
    const w2 = w1 * lip * lip;
    const w3 = w2 * lip * lip;
    const contracted = lip < 1.0;

    // Cech descent & SU(2) integrated information Phi_topos (App D.2.3)
    const w_1 = 1.2, w_2 = 1.0, w_3 = 0.8;
    const curvNorm = 0.5 * Math.sqrt(Math.pow(w_1*w_2, 2) + Math.pow(w_2*w_3, 2) + Math.pow(w_3*w_1, 2));
    const sigmaTol = 0.25;
    const descentWeight = Math.exp(-(defect * defect) / (2.0 * sigmaTol * sigmaTol));
    const phiTopos = curvNorm * descentWeight;

    const svg = document.getElementById('ch15-kr-svg');
    if (svg) {
      const radii = [delta0, Math.min(delta0 * 1.15, w1), Math.min(delta0 * 1.15, w2), Math.min(delta0 * 1.15, w3)];
      let html = `<line x1="200" y1="8" x2="200" y2="82" stroke="#FFD700" stroke-dasharray="3,2" stroke-width="1.5"/>`;
      for (let k = 0; k < 4; k++) {
        const y = 14 + k * 18;
        const halfW = Math.max(3, Math.min(175, (radii[k] / 2.0) * 160));
        const col = contracted ? (k === 3 ? '#20B2AA' : '#4169E1') : '#DC143C';
        html += `<rect x="${(200 - halfW).toFixed(1)}" y="${y}" width="${(2 * halfW).toFixed(1)}" height="11" rx="3" fill="${col}" fill-opacity="0.45" stroke="${col}" stroke-width="1.5"/>`;
        html += `<text x="12" y="${y + 9}" fill="#cbd5e1" font-size="9" font-family="monospace">k=${k}</text>`;
      }
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch15-kr-readout');
    if (box) {
      box.style.borderLeftColor = (contracted && defect <= 0.25) ? '#20B2AA' : '#FFA500';
      box.innerHTML =
        `<b>Alg. D.4 Krawczyk Enclosure:</b> k=0: [${(mTrue-delta0).toFixed(3)}, ${(mTrue+delta0).toFixed(3)}] → ` +
        (contracted
          ? `<span style="color:#20B2AA;"><b>k=3 Guaranteed Brouwer Enclosure: [${(mTrue-w3).toFixed(6)}, ${(mTrue+w3).toFixed(6)}] MeV!</b></span>`
          : `<span style="color:#ff6b81;"><b>‖I - Y_k J_k‖ ≥ 1: Interval fails contraction!</b></span>`) +
        `<br><b>Alg. D.1 &amp; D.2.3 Čech Descent:</b> ‖Ω_int‖ = ${curvNorm.toFixed(3)}, Defect D = ${defect.toFixed(2)} ⇒ ` +
        `<b>Φ_topos = ${phiTopos.toFixed(4)}</b> ` +
        (defect <= 0.25 ? `<span style="color:#FFD700;">(Glued Global Section Γ ∈ Hol(U, P))</span>` : `<span style="color:#ff6b81;">(Overlap Rivalry: Descent Suppressed)</span>`);
    }
  };

  // =========================================================================
  // VIDEO CONTROL & GUARDED INIT BOILERPLATE
  // =========================================================================
  function prepareVideos() {
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'auto';
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('muted', '');
      v.setAttribute('loop', '');
      v.setAttribute('preload', 'auto');
    });
  }

  function syncVideosToSlide() {
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || document.querySelector('.reveal-viewport.reveal-scroll, .reveal.reveal-scroll') !== null
      || window.innerWidth <= 768;

    const current = window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
    const winH = window.innerHeight || document.documentElement.clientHeight;
    const winW = window.innerWidth || document.documentElement.clientWidth;

    document.querySelectorAll('video').forEach(v => {
      let shouldPlay = false;
      if (isScroll) {
        const rect = v.getBoundingClientRect();
        const inView = (rect.top <= winH + 150) && (rect.bottom >= -150) && (rect.left <= winW + 60) && (rect.right >= -60);
        shouldPlay = inView;
      } else {
        shouldPlay = current ? current.contains(v) : true;
      }

      if (shouldPlay) {
        v.muted = true;
        v.playsInline = true;
        const p = v.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      } else if (!v.paused) {
        v.pause();
      }
    });
  }

  // Ensure continuous sync on mobile scroll and touch gestures
  if (typeof window !== 'undefined') {
    window.__syn_video_sync_handlers = window.__syn_video_sync_handlers || [];
    window.__syn_video_sync_handlers.push(syncVideosToSlide);
    if (!window.__syn_video_scroll_hooked) {
      window.__syn_video_scroll_hooked = true;
      const runSync = () => {
        (window.__syn_video_sync_handlers || []).forEach(fn => {
          try { fn(); } catch (_) {}
        });
      };
      window.addEventListener('scroll', runSync, { passive: true });
      window.addEventListener('touchmove', runSync, { passive: true });
      window.addEventListener('resize', runSync, { passive: true });
      let synMediaUnlocked = false;
      function synUnlockMedia() {
        if (synMediaUnlocked) return;
        synMediaUnlocked = true;
        runSync();
      }
      document.addEventListener('touchstart', synUnlockMedia, { passive: true, once: true });
      document.addEventListener('click', synUnlockMedia, { passive: true, once: true });
    }
  }

  function renderAllCh15Widgets() {
    window.ch15_selectDagNode('singularity');
    window.ch15_updateLIVLab();
    window.ch15_updateConjectureSim();
    window.ch15_updateLimitProjection();
    window.ch15_updateCutReduction();
    window.ch15_updateMassCalc();
    window.ch15_testFirewallLinter();
    window.ch15_updateKrawczykCech();
  }

  function bindControlsOnce() {
    document.querySelectorAll('input[type="range"], select, button').forEach(el => {
      if (el.dataset.synBound) return;
      el.dataset.synBound = '1';
      el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());
    });
  }

  let ch15Initialised = false;
  function initChapter15() {
    if (ch15Initialised) return;
    ch15Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh15Widgets();
    syncVideosToSlide();
  }

  window.initChapter15 = initChapter15;
  window.renderAllCh15Widgets = renderAllCh15Widgets;

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter15);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter15();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter15();
  }
})();



// =========================================================================
// CHAPTER 15 3D ENGINE INJECTOR & RUNNER
// =========================================================================
const CH15_3D_STYLE = `
#ch15-3d-hud {
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

#ch15-3d-hud *, #ch15-3d-hud *::before, #ch15-3d-hud *::after {
  box-sizing: border-box;
}

#ch15-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch15-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch15-3d-hud.minimized .ch15-hud-body {
  display: none;
}

.ch15-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch15-hud-title {
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

.ch15-hud-title span:first-child {
  line-height: 1.15;
}

.ch15-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch15-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch15-hud-btn {
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

.ch15-hud-btn:hover, .ch15-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch15-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch15-canvas-wrap:active {
  cursor: grabbing;
}

#ch15-3d-hud.spotlight .ch15-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch15-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch15-overlay-bar {
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

.ch15-telemetry {
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

#ch15-node-inspector {
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

.ch15-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch15-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch15-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch15-scrubber .ch15-hud-btn {
  flex-shrink: 0;
}

#ch15-caption {
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
  #ch15-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch15-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch15-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch15-hud-controls {
    gap: 3px;
  }
  .ch15-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch15-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch15-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch15-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch15-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch15-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch15-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch15-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch15-hud-controls {
    gap: 3px;
  }
  .ch15-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch15-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch15-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch15-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch15-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch15-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch15-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch15-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH15_3D_HTML = `<div class="ch15-hud-header">

    <div class="ch15-hud-title">

      <span>🌌 Ch 15 &amp; App A–D · 3D Horizon Engine</span>

      <span id="ch15-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch15-hud-controls">

      <button class="ch15-hud-btn active" id="ch15-btn-orbit" onclick="toggleCh15Orbit()">⟳ Orbit</button>

      <button class="ch15-hud-btn" onclick="toggleCh15Spotlight()">⛶ Spotlight</button>

      <button class="ch15-hud-btn" id="ch15-btn-min" onclick="toggleCh15Minimize()">+</button>

    </div>

  </div>



  <div class="ch15-hud-body">

    <div class="ch15-canvas-wrap" id="ch15-canvas-wrap">

      <canvas id="ch15-3d-canvas"></canvas>

      <div class="ch15-overlay-bar">

        <div class="ch15-telemetry" id="ch15-telemetry">Master DAG | Hauptsatz | Lean 4 S₂</div>

        <div id="ch15-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch15-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <button class="ch15-hud-btn" title="Previous Stage" onclick="window.setCh15Stage(Math.round( parseFloat(document.getElementById('ch15-slider').value) ) - 1, true)">◀</button>
      <input type="range" id="ch15-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh15Stage(this.value)">
      <button class="ch15-hud-btn" title="Next Stage" onclick="window.setCh15Stage(Math.round( parseFloat(document.getElementById('ch15-slider').value) ) + 1, true)">▶</button>

      <button class="ch15-hud-btn active" id="ch15-btn-sync" onclick="enableCh15Sync()">Auto-Sync</button>

    </div>



    <div id="ch15-caption">

      <b>Stage 1 (§15.1 — Master Axiomatic DAG):</b> 4-Tier Deductive Architecture &amp; Geodesic Singularity Bridge (Thm. 9.7 ⇢ Thm. 10.4).

    </div>

  </div>`;

function injectCh153DHUD() {
  if (document.getElementById('ch15-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH15_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch15-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH15_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch15_3d_engine_loaded) return;
  window.__ch15_3d_engine_loaded = true;

  function runCh15Engine() {
    injectCh153DHUD();
    if (window.__ch15_3d_engine_initialized) return;
    window.__ch15_3d_engine_initialized = true;

const canvas = document.getElementById('ch15-3d-canvas');

  const wrap = document.getElementById('ch15-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.48;

  let camPitch = 0.36;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§15.1 — Master Axiomatic Dependency DAG):</b> 11 nodes across Tiers I–IV &amp; crimson Geodesic Crisis Bridge (Thm. 9.7 ⇢ Thm. 10.4).",

    2: "<b>Stage 2 (§15.2–15.3 — 21st-Century Triad &amp; LIV Bounds):</b> Topos QT + Higher Gauge + DEC &amp; E_QG = 1.52 M_Planck > 1.22 M_P (GRB 090510).",

    3: "<b>Stage 3 (§15.4.1–15.4.2 — Conjectures 1 &amp; 2):</b> Joyal Topos Realization Φ_realize : ℳ^c ↪ ℰ_syn &amp; 12D ker(⁴F) ≠ {0} condensation onto R₆.",

    4: "<b>Stage 4 (§15.4.3–15.4.5 — Conjectures 3, 4 &amp; 5):</b> Brillouin Mass Gap ΔE ≥ ħc/√τ, S₂ Negentropy ℒ_{X₅}S < 0 &amp; I₆ = (T²)³ coupling moduli.",

    5: "<b>Stage 5 (§15.5–15.7 — Global Limiting Projections &amp; Reflexive Loop):</b> R₁₂ → R₆ → R₄ GR (τ→0⁺, ²ḡ₋→0) &amp; Reflexive Epistemic Loop.",

    6: "<b>Stage 6 (App. A §A.1–A.3 — Thm. A.6 Gentzen Cut Elimination):</b> Double induction on (rk(ψ), |𝒟₁|+|𝒟₂|) reducing principal cuts to cut-free 𝒟_norm!",

    7: "<b>Stage 7 (App. A §A.4–A.5 — Thms. A.7–A.12 Consistency &amp; Joyal):</b> Subformula property, ∅ ⊬^k ⊥, Disjunction property &amp; Joyal Functor Φ_F.",

    8: "<b>Stage 8 (App. B §B.1–B.7 — DESY Spectrum, α_met⁻¹ &amp; Verlet):</b> 17 PDG ground states (ε̄ < 0.012%), FCC α_met⁻¹ = 137.036036 &amp; Verlet orbits.",

    9: "<b>Stage 9 (App. C §C.1–C.10 — Lean 4 Import Firewall DAG &amp; S₂ Proofs):</b> Static checkTransitiveFirewall blocking Stratum C/D leakage into Stratum A/B!",

    10: "<b>Stage 10 (App. D §D.1–D.2 — Alg. D.4 Interval Newton–Krawczyk):</b> Contracting interval boxes 𝕂(X^(k)) ⊂ int(X^(k)) certifying unique mass eigenvalues!"

  };



  const STAGE_TELEMETRY = {

    1: "Tiers I–IV DAG | Crisis: χ√|g_(p)| = 1 ⇢ 𝕄_τ^n",

    2: "E_QG = ħc/√τ ≈ 1.52 M_P > 1.22 M_P (Fermi-LAT)",

    3: "Conj 1: (Δ,k)⊨ψ ⟺ U_Δ⊩ψ | Conj 2: ker ⁴F ≠ {0}",

    4: "Conj 3: ΔE ≥ ħc/√τ | Conj 4: ℒ_{X₅}S ≤ −γV < 0",

    5: "R₁₂ → R₆ → R₄ | τ→0⁺, ²ḡ₋→0 ⇒ ∇^μ G_μν = 0",

    6: "Hauptsatz (Thm. A.6): (rk(ψ), |𝒟₁|+|𝒟₂|) → 𝒟_norm",

    7: "Cor. A.8: S(x); ∅ ⊬^k ⊥ | Thm. A.12: c_JOYAL",

    8: "m_p = 938.272 MeV | α_met⁻¹ = 137.036036 (FCC)",

    9: "StratumA → StratumB || ↚ || StratumC ← StratumD",

    10: "Alg. D.4: 𝕂(X^(k)) ⊂ int(X^(k)) ⇒ ∃! λ* ∈ X*"

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



  function drawBox3D(cx, cy, cz, sx, sy, sz, col, lw, dash, w, h) {

    const v = [];

    for (let dx of [-sx, sx]) for (let dy of [-sy, sy]) for (let dz of [-sz, sz]) {

      v.push(proj(cx + dx, cy + dy, cz + dz, w, h));

    }

    const edges = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];

    edges.forEach(e => drawLine3D(v[e[0]], v[e[1]], col, lw, dash));

  }



  // =========================================================================

  // STAGE RENDERERS (STAGES 1 TO 10)

  // =========================================================================



  // Stage 1: 3D 4-Tier Master Axiomatic Dependency DAG (§15.1)

  function renderStage1(w, h) {

    const pE   = drawNode3D("D_Topos", -1.15, -0.4,  1.05, 7.5, "#4169E1", "#fff", "1. ℰ_syn (Ch 1)", "Tier I: Sheaf Topos ℰ_syn & Heyting Classifier Ω", w, h);

    const pOp  = drawNode3D("D_Oper",   0.00, -0.4,  1.05, 7.5, "#20B2AA", "#fff", "2. 𝒪_syn (Ch 2)", "Tier I: Colored Operad 𝒪_syn & Beck Law λ̂", w, h);

    const pPo  = drawNode3D("D_Push",   1.15, -0.4,  1.05, 7.5, "#20B2AA", "#fff", "3. ⊞_φ (Ch 3)", "Tier I: Corporate Span Pushouts P_a ⊞_φ P_b", w, h);



    const pGg  = drawNode3D("D_Gauge",  1.15,  0.4,  0.35, 7.5, "#FFA500", "#fff", "4. Ω_int (Ch 4)", "Tier II: Non-Abelian Interaction Curvature Ω_int^𝒟", w, h);

    const pInf = drawNode3D("D_Xsyn",   0.00,  0.4,  0.35, 7.5, "#20B2AA", "#fff", "5. 𝒳_syn (Ch 5)", "Tier II: Ambient (∞,1)-Topos 𝒳_syn & Tectonics", w, h);

    const pCo  = drawNode3D("D_Coalg", -1.15,  0.4,  0.35, 7.5, "#FFD700", "#fff", "6. ν𝒯 (Ch 6)", "Tier II: Final Telecentric Coalgebra (ν𝒯, ζ)", w, h);



    const pQt  = drawNode3D("D_Quant", -1.15, -0.4, -0.35, 7.5, "#4169E1", "#fff", "7. Ctx_quant (Ch 7)", "Tier III: Quantitative Site & Nuclear Separation (Ch 7–8)", w, h);

    const pCas = drawNode3D("D_Casc",   0.00, -0.4, -0.35, 7.5, "#20B2AA", "#fff", "8. ²ḡ_∞ (Ch 9)", "Tier III: 36-Component Hermetry & Sobolev Apex ²ḡ_∞", w, h);

    const pCr  = drawNode3D("D_Cris",   1.15, -0.4, -0.35, 9.5, "#DC143C", "#FFD700", "9. Crisis χ√|g|=1", "Thm. 9.7 Singular Geodesic Gradient Breakdown forcing Lattice Transition!", w, h);



    const pDec = drawNode3D("D_DEC",   -0.45,  0.4, -1.05, 8.5, "#FFA500", "#fff", "10. DEC 𝕄_τ^n (Ch 10)", "Tier IV: Metronic Lattice 𝕄_τ^n & Discrete Exterior Calculus d_τ²=0", w, h);

    const pMas = drawNode3D("D_Mass",   0.85,  0.4, -1.05, 9.5, "#FFD700", "#20B2AA", "11. Mass Spectrum (Ch 11)", "Tier IV: Self-Adjoint Selectors Sel Ψ = λΨ & PDG Mass Eigenvalues!", w, h);



    drawLine3D(pE, pOp, "#64748b", 1.8); drawLine3D(pOp, pPo, "#64748b", 1.8);

    drawLine3D(pPo, pGg, "#64748b", 1.8); drawLine3D(pOp, pInf, "#64748b", 1.8); drawLine3D(pInf, pCo, "#64748b", 1.8);

    drawLine3D(pE, pQt, "#64748b", 1.8); drawLine3D(pQt, pCas, "#64748b", 1.8); drawLine3D(pCas, pCr, "#DC143C", 2.5);

    drawLine3D(pCr, pDec, "#DC143C", 3.2, [4, 2]); drawLine3D(pDec, pMas, "#FFD700", 2.8);

  }



  // Stage 2: 21st-Century Foundational Triad & Astroparticle LIV Exclusion Wall (§15.2–15.3)

  function renderStage2(w, h) {

    const t1 = drawNode3D("Tr_Top", -1.15, -0.65, 0.55, 8.5, "#4169E1", "#fff", "Topos QT (Isham–Döring)", "Presheaf Contextuality upgraded with contractive Banach channels & Metropie flows", w, h);

    const t2 = drawNode3D("Tr_HGT",  1.15, -0.65, 0.55, 8.5, "#20B2AA", "#fff", "Higher Gauge (Schreiber–Lurie)", "Cohesive (∞,1)-topos 𝒳_syn & change-of-operad Syntrokline bridges", w, h);

    const t3 = drawNode3D("Tr_DEC",  0.00,  0.95, 0.55, 8.5, "#FFA500", "#fff", "DEC (Desbrun–Hirani–Marsden)", "Dynamical continuum-to-lattice transition at χ√|g_(p)| = 1", w, h);

    drawLine3D(t1, t2, "#20B2AA", 2.4); drawLine3D(t2, t3, "#20B2AA", 2.4); drawLine3D(t3, t1, "#20B2AA", 2.4);



    // Lower LIV Energy Axis with Fermi-LAT GRB 090510 Wall (1.22 M_P) vs E_QG = 1.52 M_P

    const pWall = drawNode3D("LIV_Wall", -0.25, 0, -0.85, 8, "#DC143C", "#fff", "GRB 090510 (1.22 M_P)", "Fermi-LAT 95% CL Lower Bound excluding linear LIV below 1.22 M_Planck", w, h);

    const pEqg  = drawNode3D("LIV_Eqg",   0.75, 0, -0.85, 10, "#FFD700", "#20B2AA", "E_QG = 1.52 M_P ✓", "Derived Metronic Cutoff E_QG = ħc/√τ ≈ 1.855×10¹⁹ GeV = 1.52 M_Planck (Viable!)", w, h);

    drawLine3D(proj(-1.35, 0, -0.85, w, h), pWall, "#DC143C", 3.5);

    drawLine3D(pWall, proj(1.35, 0, -0.85, w, h), "#20B2AA", 3.5);

  }



  // Stage 3 & 4: Five Open Conjectures (Joyal Completeness, 12D->6D, Mass Gap, S_2 Negentropy, I_6 Moduli)

  function renderStage3And4(w, h, st) {

    const isStage4 = (st >= 3.5);

    const conjs = [

      { id: "C1", a: 0.0, col: "#4169E1", lbl: "Conj 1: Φ_realize ↪ ℰ_syn", info: "Conjecture 1: Unconditional Joyal Topos Completeness (Δ,k)⊨ψ ⟺ U_Δ⊩ψ (§15.4.1)" },

      { id: "C2", a: 1.256, col: "#20B2AA", lbl: "Conj 2: ker(⁴F) ≠ {0} (R₁₂→R₆)", info: "Conjecture 2: Discrete Atiyah–Singer Index on 𝕋_τ¹² locking I₆ solitons onto R₆ (§15.4.2)" },

      { id: "C3", a: 2.513, col: "#FFA500", lbl: "Conj 3: Mass Gap ΔE ≥ ħc/√τ", info: "Conjecture 3: Uniform Yang–Mills Spectral Gap on compact Brillouin 4-torus 𝕋⁴ (§15.4.3)" },

      { id: "C4", a: 3.770, col: "#4ade80", lbl: "Conj 4: ℒ_{X₅}S_therm ≤ −γV < 0", info: "Conjecture 4: Dynamic Entelechial Negentropy Flux along S₂(x₅,x₆) (§15.4.4)" },

      { id: "C5", a: 5.026, col: "#9370DB", lbl: "Conj 5: I₆ = (T²)³ Moduli (α_QED)", info: "Conjecture 5: SL(2,ℤ)³ Modular Holonomy Quantization fixing α_QED, α_s, G_F (§15.4.5)" }

    ];

    const pHub = drawNode3D("Conj_Hub", 0, 0, 0, 11, "#FFD700", "#DC143C", isStage4 ? "ℒ_{X₅}S_therm < 0 | ΔE > 0" : "5 Open Horizon Conjectures", "Section 15.4 Research Horizon Program (Strata B & C)", w, h);

    conjs.forEach((cj, idx) => {

      const ang = cj.a + timeSec * 0.35;

      const x = 1.25 * Math.cos(ang), y = 1.25 * Math.sin(ang), z = 0.35 * Math.sin(ang * 2);

      const pC = drawNode3D(cj.id, x, y, z, 8.5, cj.col, "#fff", cj.lbl, cj.info, w, h);

      const isSpot = isStage4 ? (idx >= 2) : (idx <= 2);
      drawLine3D(pC, pHub, cj.col, isSpot ? 3.2 : 1.5, isSpot ? null : [4, 2]);
    });
    if (!isStage4) {
      drawBox3D(0, 0, 0, 0.55, 0.55, 0.55, "rgba(32,178,170,0.55)", 1.8, [3, 2], w, h);
    } else {
      ctx.beginPath(); ctx.strokeStyle = "#4ade80"; ctx.lineWidth = 2.4;
      for (let i = 0; i <= 36; i++) {
        const u = i / 36;
        const r = 0.85 * (1 - 0.65 * u);
        const a = u * Math.PI * 4 + timeSec * 2;
        const p = proj(r * Math.cos(a), r * Math.sin(a), -0.6 + 1.2 * u, w, h);
        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
      }
      ctx.stroke();
    }

  }



  // Stage 5: Global Limiting Projections (R_12 -> R_6 -> R_4 GR) & Reflexive Epistemic Loop (§15.5–15.7)

  function renderStage5(w, h) {

    const p12 = drawNode3D("Lim_12", -1.20, -0.55,  0.75, 8.5, "#9370DB", "#fff", "12D: R₁₂ = R₄×S₂×I₆", "Full 12D Metronic Product Fibration", w, h);

    const p6  = drawNode3D("Lim_6",   0.00, -0.55,  0.00, 9.5, "#20B2AA", "#fff", "6D: R₆ (36-Hermetry ²ḡ)", "Compactify I₆: 21 Symmetric + 15 Skew Einstein–Maxwell–Torsion", w, h);

    const p4  = drawNode3D("Lim_4",   1.20, -0.55, -0.75, 10.5, "#FFD700", "#000", "4D GR: ∇^μ G_μν = 0", "Continuum Limit τ → 0⁺ & Vanishing Skew ²ḡ₋ → 0 recovers Classical GR!", w, h);

    drawLine3D(p12, p6, "#20B2AA", 3.0);

    drawLine3D(p6, p4, "#FFD700", 3.0);



    // Upper Reflexive Epistemic Loop (Fig. 15.4)

    ctx.beginPath();

    ctx.strokeStyle = "#FFA500";

    ctx.lineWidth = 2.4;

    ctx.setLineDash([5, 3]);

    for (let i = 0; i <= 44; i++) {

      const a = (i / 44) * Math.PI * 2;

      const p = proj(1.1 * Math.cos(a), 0.55 + 0.45 * Math.sin(a), 0.55 * Math.sin(a), w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();

    ctx.setLineDash([]);

    drawNode3D("Ref_Loop", 0, 0.95, 0.35, 8, "#FFA500", "#FFD700", "Reflexive Epistemic Loop", "§15.7 Epilogue: Subjective Contexts U → Sheaf Topos ℰ_syn → Condensed Matter → Observer!", w, h);

  }



  // Stage 6 & 7: Appendix A — Gentzen Cut-Elimination Tree (Thm. A.6) & Joyal Completeness (Thm. A.12)

  function renderStage6And7(w, h, st) {

    const isStage7 = (st >= 6.5);

    // Binary Proof Derivation Tree reducing Principal Cut rank rk(\psi_1 \wedge \psi_2) -> rk(\psi_1), rk(\psi_2)

    const pRoot = drawNode3D("Prf_Root", 0, 0, -1.0, 10.5, "#FFD700", "#20B2AA", isStage7 ? "S(x); ∅ ⊬^k ⊥ (Cor. A.8)" : "𝒟_norm (Cut-Free Hauptsatz!)", isStage7 ? "Cor. A.8 Absolute Syntactic Consistency & Thm. A.12 Conditional Joyal Completeness (c_JOYAL)" : "Thm. A.6 Gentzen's Hauptsatz: Every derivable sequent admits a cut-free proof 𝒟_norm!", w, h);

    const pL = drawNode3D("Prf_L", -0.85, 0, 0.0, 8.5, "#4169E1", "#fff", "Cut(ψ₁): rk < rk(ψ₁∧ψ₂)", "Reduced Cut on Subformula ψ₁ (Lem. A.5 Principal Reduction)", w, h);

    const pR = drawNode3D("Prf_R",  0.85, 0, 0.0, 8.5, "#20B2AA", "#fff", "Cut(ψ₂): rk < rk(ψ₁∧ψ₂)", "Reduced Cut on Subformula ψ₂ decreasing lexicographic pair (rk(ψ), |𝒟₁|+|𝒟₂|)", w, h);

    const pAx1 = drawNode3D("Ax_1", -1.25, -0.4, 0.95, 6.5, "#FFA500", "#fff", "Ax (|𝒟|=0)", "Initial Axiom Leaf S(x); Γ, φ ⊢^k φ", w, h);

    const pAx2 = drawNode3D("Ax_2", -0.45,  0.4, 0.95, 6.5, "#FFA500", "#fff", "FS-Int", "Fischer–Servi Bi-Modal Rule (Lemma A.11 FS1 Saturation)", w, h);

    const pAx3 = drawNode3D("Ax_3",  0.45, -0.4, 0.95, 6.5, "#FFA500", "#fff", "Stab_{j+1}R", "Hereditary Stability Rule grounded in AP₀", w, h);

    const pAx4 = drawNode3D("Ax_4",  1.25,  0.4, 0.95, 6.5, "#FFA500", "#fff", "[π_F]-Unstep", "Deterministic Dynamic Step/Unstep Rule", w, h);



    drawLine3D(pAx1, pL, "#4169E1", 2.2); drawLine3D(pAx2, pL, "#4169E1", 2.2);

    drawLine3D(pAx3, pR, "#20B2AA", 2.2); drawLine3D(pAx4, pR, "#20B2AA", 2.2);

    drawLine3D(pL, pRoot, "#FFD700", 3.0); drawLine3D(pR, pRoot, "#FFD700", 3.0);

  }



  // Stage 8: Appendix B — 17-Particle PDG Mass Crown (<0.012%), FCC \alpha_{met}^{-1} & Verlet Rosette

  function renderStage8(w, h) {

    const pAlpha = drawNode3D("AppB_Core", 0, 0, 0, 11.5, "#FFD700", "#20B2AA", "α_met⁻¹ = 137.036036 | ε̄ < 0.012%", "Appendix B Synthesis: 17 PDG ground states validated to < 0.012% + FCC Fine-Structure Constant!", w, h);

    const states = ["e⁻ (0.511)", "μ⁻ (105.7)", "τ⁻ (1776.8)", "π⁰ (135.0)", "K± (493.7)", "p⁺ (938.272)", "n⁰ (939.565)", "Ω⁻ (1672.45)"];

    states.forEach((lbl, idx) => {

      const a = timeSec * 0.45 + (idx / 8) * Math.PI * 2;

      const x = 1.28 * Math.cos(a), y = 1.28 * Math.sin(a), z = 0.35 * Math.cos(a * 2);

      const pS = drawNode3D("B_St_" + idx, x, y, z, 7, idx >= 5 ? "#FFD700" : "#20B2AA", "#fff", lbl, `Table B.1 Validated Particle Eigenstate ${lbl} MeV/c²`, w, h);

      drawLine3D(pS, pAlpha, "rgba(255,215,0,0.45)", 1.8);

    });

  }



  // Stage 9: Appendix C — Lean 4 Namespace Import Firewall DAG & Static Linter (Fig. 46)

  function renderStage9(w, h) {

    const pA = drawNode3D("Ln_A", -1.15, 0,  0.75, 9.5, "#4169E1", "#fff", "StratumA.{Topos,Operads,DEC}", "Kernel-Checked S₂ Foundations (opNorm_comp_le_one, dec_coboundary_nilpotent)", w, h);

    const pB = drawNode3D("Ln_B", -0.20, 0,  0.15, 9.5, "#20B2AA", "#fff", "StratumB.{Sequents,Joyal}", "Derived Logic & Algebraic Theorems (Glivenko, N=6 root, 63 channels, Palatini Q)", w, h);

    const pC = drawNode3D("Ln_C",  0.75, 0, -0.45, 8.5, "#FFA500", "#fff", "StratumC.Realization [P]", "Physical Bridge Models & Selector Mass Hypotheses (Isolated from A/B!)", w, h);

    const pD = drawNode3D("Ln_D",  1.35, 0, -0.95, 7.5, "#94a3b8", "#fff", "StratumD.HeimCorpus [R]", "Historical Exegetical Corpus (Zero upward imports into A/B/C!)", w, h);



    drawLine3D(pA, pB, "#20B2AA", 3.2);

    drawLine3D(pB, pC, "#FFA500", 2.4, [4, 2]);

    drawLine3D(pC, pD, "#94a3b8", 2.0, [3, 3]);



    // Glowing Crimson Static Firewall Shield between Stratum B and Stratum C/D

    drawBox3D(0.28, 0, -0.15, 0.06, 0.95, 0.85, "#DC143C", 2.8, [4, 2], w, h);

    drawNode3D("Ln_FW", 0.28, 0, 0.85, 8, "#DC143C", "#FFD700", "⛔ checkTransitiveFirewall", "App. C Module 6 Static Linter: Rejects any Stratum A/B declaration importing [P] or Stratum D!", w, h);

  }



  // Stage 10: Appendix D — Nested Contracting Interval Newton-Krawczyk Boxes \mathbb{K}(X^{(k)}) \subset \operatorname{int}(X^{(k)}) (Alg. D.4)

  function renderStage10(w, h) {

    // 3 Concentric Contracting 3D Interval Boxes X^(0) \supset X^(1) \supset X^(2) enclosing unique eigenvalue \lambda^*

    const pulse = 0.85 + 0.15 * Math.sin(timeSec * 2.5);

    drawBox3D(0, 0, 0, 1.15, 0.95, 0.85, "rgba(65,105,225,0.55)", 1.6, [4, 3], w, h);

    drawBox3D(0, 0, 0, 0.72 * pulse, 0.60 * pulse, 0.52 * pulse, "#20B2AA", 2.4, null, w, h);

    drawBox3D(0, 0, 0, 0.34 * pulse, 0.28 * pulse, 0.25 * pulse, "#FFD700", 2.8, null, w, h);



    drawNode3D("Kr_X0", -1.15, -0.95, 0.85, 7, "#4169E1", "#fff", "X^(0) = [m⁰−δ, m⁰+δ]", "Initial Candidate Interval Box X^(0) in Alg. D.4", w, h);

    drawNode3D("Kr_KX",  0.72 * pulse, 0.60 * pulse, 0.52 * pulse, 8, "#20B2AA", "#fff", "𝕂(X^(k)) ⊂ int(X^(k))", "Krawczyk Operator Contraction Condition certifying Brouwer Fixed Point!", w, h);

    drawNode3D("Kr_Eig", 0, 0, 0, 11, "#FFD700", "#DC143C", "∃! λ* ∈ X* (938.2721 MeV)", "Unique Verified Selector Mass Eigenvalue enclosed by Interval Newton–Krawczyk Solver!", w, h);

  }



  // Master 60fps Loop

  function renderLoop() {
      if (document.hidden) {
        setTimeout(() => requestAnimationFrame(renderLoop), 250);
        return;
      }
      const hudGuard = document.getElementById('ch15-3d-hud');
      if (hudGuard && (hudGuard.classList.contains('minimized') || hudGuard.style.display === 'none')) {
        setTimeout(() => requestAnimationFrame(renderLoop), 180);
        return;
      }

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



    function dispatchStageCrossFade(stInt, stArg) {
      if (stInt === 1) renderStage1(w, h);

    else if (stInt === 2) renderStage2(w, h);

    else if (stInt === 3 || stInt === 4) renderStage3And4(w, h, stArg);

    else if (stInt === 5) renderStage5(w, h);

    else if (stInt === 6 || stInt === 7) renderStage6And7(w, h, stArg);

    else if (stInt === 8) renderStage8(w, h);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);
    }
    const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
    const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
    const frac = curStage - stLow;
    if (stLow === stHigh || frac < 0.02) {
      ctx.save();
      ctx.globalAlpha = 1.0;
      dispatchStageCrossFade(Math.round(curStage), curStage);
      ctx.restore();
    } else {
      ctx.save();
      ctx.globalAlpha = 1.0 - frac * 0.82;
      dispatchStageCrossFade(stLow, stLow);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = frac;
      dispatchStageCrossFade(stHigh, stHigh);
      ctx.restore();
    }
    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh15Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch15-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch15-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch15-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch15-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch15-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh15Stage = function(val) { window.setCh15Stage(val, true); };



  window.enableCh15Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch15-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh15WithDeck();

  };



  window.toggleCh15Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch15-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh15Spotlight = function() {

    const hud = document.getElementById('ch15-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh15Minimize = function() {

    const hud = document.getElementById('ch15-3d-hud');

    const b = document.getElementById('ch15-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh15WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch15-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-15, section[data-chapter="15"]') : true;
    chHud.style.display = inCh ? '' : 'none';
    if (!inCh) return;
    }

    const rev = document.querySelector('.reveal');
    const vp = document.querySelector('.reveal-viewport');
    const isScroll = (window.Reveal && typeof window.Reveal.isScrollView === 'function' && window.Reveal.isScrollView())
      || (vp && vp.classList.contains('reveal-scroll'))
      || (rev && rev.classList.contains('reveal-scroll'))
      || (rev && rev.scrollHeight > rev.clientHeight + 100)
      || window.innerWidth <= 768;

    let stageVal = null;

    if (isScroll) {
      const top = (rev && typeof rev.scrollTop === 'number' && rev.scrollTop > 0) ? rev.scrollTop
        : ((vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 0) ? vp.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0));

      let max = 1;
      if (rev && rev.scrollHeight > rev.clientHeight + 10) {
        max = rev.scrollHeight - rev.clientHeight;
      } else if (vp && vp.scrollHeight > vp.clientHeight + 10) {
        max = vp.scrollHeight - vp.clientHeight;
      } else {
        const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        max = Math.max(1, docH - window.innerHeight);
      }

      const frac = Math.min(1.0, Math.max(0.0, top / max));
      stageVal = 1.0 + frac * 9.0;
    }

    if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
      stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
    }

    if (typeof stageVal === 'number' && !isNaN(stageVal)) {
      window.setCh15Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh15WithDeck = syncCh15WithDeck;
  }



  // 3D Orbit Drag, Wheel Zoom & Node Click Hit-Testing

  wrap.addEventListener('mousedown', e => {

    e.stopPropagation();

    isDragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mousemove', e => {

    if (!isDragging) return;

    camYaw += (e.clientX - lastX) * 0.012;

    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));

    lastX = e.clientX;

    lastY = e.clientY;

  });



  window.addEventListener('mouseup', () => { isDragging = false; });

  wrap.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    camYaw += dx * 0.012;
    camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
  }, { passive: true });

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

    const insp = document.getElementById('ch15-node-inspector');

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



  function init() {

    resize();

    syncCh15WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    let syncRaf_15 = false;
    const synBindSync_syncCh15WithDeck = () => {
      if (syncRaf_15) return;
      syncRaf_15 = true;
      requestAnimationFrame(() => {
        syncRaf_15 = false;
        syncCh15WithDeck();
      });
    };

    window.addEventListener('scroll', synBindSync_syncCh15WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh15WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh15WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh15WithDeck, { passive: true });

    const revEl_syncCh15WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh15WithDeck) {
      revEl_syncCh15WithDeck.addEventListener('scroll', synBindSync_syncCh15WithDeck, { passive: true });
      revEl_syncCh15WithDeck.addEventListener('touchmove', synBindSync_syncCh15WithDeck, { passive: true });
    }
    const vpEl_syncCh15WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh15WithDeck) {
      vpEl_syncCh15WithDeck.addEventListener('scroll', synBindSync_syncCh15WithDeck, { passive: true });
      vpEl_syncCh15WithDeck.addEventListener('touchmove', synBindSync_syncCh15WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh15WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh15WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh15WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh15WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh15WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh15WithDeck);
    }

    const hud = document.getElementById('ch15-3d-hud');

    if (hud) {

      hud.querySelectorAll('input, button').forEach(el => {

        el.setAttribute('data-prevent-swipe', 'true');
      el.addEventListener('keydown', e => e.stopPropagation());

      });

    }

  }



  init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh15Engine);
  } else {
    runCh15Engine();
  }
})();

})();

