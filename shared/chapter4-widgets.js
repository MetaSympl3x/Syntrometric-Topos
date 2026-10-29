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

// WIDGET 6: §4.3.1–4.3.3 Hodge-Laplacian & Bogomolny Bound
window.updateBogomolny = function() {
  const elQ = document.getElementById('bog-q');
  if (!elQ) return;
  let q = parseInt(elQ.value);
  let fl = parseFloat(document.getElementById('bog-fl').value);
  let gr = parseFloat(document.getElementById('bog-gr').value);
  let ha = parseFloat(document.getElementById('bog-ha').value);

  document.getElementById('bog-q-val').innerText = (q >= 0 ? '+' : '') + q;
  document.getElementById('bog-fl-val').innerText = fl.toFixed(1);

  let fourPiSq = 4.0 * Math.PI * Math.PI;
  let bound = fourPiSq * Math.abs(q);
  let action = bound + 0.25 * fl * fl;
  let eInt = 0.5 * (gr * gr + ha * ha);

  let box = document.getElementById('bog-readout');
  let topLine = `<b>Thm. 4.11 L² Orthogonal Energy:</b> E_int^D = ½(‖Δ_{A₀}Φ_int‖² + ‖γ_harm‖²) = ½(${(gr*gr).toFixed(2)} + ${(ha*ha).toFixed(2)}) = <b style="color:#20B2AA;">${eInt.toFixed(3)}</b><br>`;

  if (q !== 0 && fl === 0) {
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = topLine +
      `<span style="color:#FFD700;"><b>★ SELF-DUAL BOGOMOLNY SATURATION (*F_A = ${q > 0 ? '+' : '-'}F_A, Q_top = ${q}):</b></span> ` +
      `Action I(A) = 4π²|Q_top| = <b>${action.toFixed(2)}</b> (Topologically locked; cannot decay to Q_top = 0!)`;
  } else if (q !== 0) {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = topLine +
      `<b>Topological Sector Q_top = ${q}:</b> ¼‖F_A ∓ *F_A‖² + 4π²|Q_top| = <b style="color:#FFA500;">${action.toFixed(2)} ≥ ${bound.toFixed(2)}</b> (Protected Holoform)`;
  } else {
    box.style.borderLeftColor = "#708090";
    box.innerHTML = topLine +
      `<b>Topologically Trivial Sector (Q_top = 0):</b> Lower bound = 0.00 | Action I(A) = <b>${action.toFixed(2)}</b> (Can relax to flat vacuum).`;
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
function renderAllCh4Widgets() {
  window.updateSimplexCalc();
  window.updateWilsonLab();
  window.updateCornerFlow();
  window.updateSU2Lab();
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
      <input type="range" id="ch4-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh4Stage(this.value)">
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
      const ch4Hud = document.getElementById('ch4-3d-hud');
      if (isMegaDeck && ch4Hud && window.Reveal && window.Reveal.getCurrentSlide) {
        const currentSlide = window.Reveal.getCurrentSlide();
        const inCh4 = currentSlide ? !!currentSlide.closest('#chapter-4, section[data-chapter="4"]') : true;
        ch4Hud.style.display = inCh4 ? '' : 'none';
        if (!inCh4) return;
      }

      const vp = document.querySelector('.reveal-viewport');
      const isScroll = vp && vp.classList.contains('reveal-scroll');
      if (isScroll) {
        const scEl = vp.scrollHeight > vp.clientHeight ? vp : document.documentElement;
        const top = vp.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;
        const max = Math.max(1, (scEl.scrollHeight || document.body.scrollHeight) - window.innerHeight);
        window.setCh4Stage(1.0 + Math.min(1, Math.max(0, top / max)) * 9.0, false);
      } else if (window.Reveal && typeof window.Reveal.getIndices === 'function') {
        const idx = window.Reveal.getIndices();
        const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);
        const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
        const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
        window.setCh4Stage(1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0, false);
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
    window.addEventListener('scroll', syncCh4WithDeck, { passive: true });
    const vp = document.querySelector('.reveal-viewport');
    if (vp) vp.addEventListener('scroll', syncCh4WithDeck, { passive: true });
    if (window.Reveal) {
      window.Reveal.on('ready', syncCh4WithDeck);
      window.Reveal.on('slidechanged', syncCh4WithDeck);
      window.Reveal.on('fragmentshown', syncCh4WithDeck);
      window.Reveal.on('fragmenthidden', syncCh4WithDeck);
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
