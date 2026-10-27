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
    el.addEventListener('keydown', e => e.stopPropagation());
    el.addEventListener('mousedown', e => e.stopPropagation());
    el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
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
