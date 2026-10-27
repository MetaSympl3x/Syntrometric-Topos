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
    el.addEventListener('keydown', e => e.stopPropagation());
    el.addEventListener('mousedown', e => e.stopPropagation());
    el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
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
