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
      <text x="145" y="48" fill="#20B2AA" font-size="8">_+(y,y)? (Teal)</text>
      <text x="145" y="60" fill="#9370DB" font-size="8">^+(y,y)? (Purple)</text>
    `;
  }

  const box = document.getElementById('ch8-calc-readout');
  if (box) {
    box.innerHTML =
      `<b>SM-30 Difference Quotient (Δx = ${dx.toFixed(3)}):</b> Δ(y²)/Δx = <b>${diffQuot.toFixed(3)}</b> → d̃|(y²) = <b>${exactDeriv.toFixed(3)}</b><br>` +
      `<b>SM-32/35a Integral Chain (N=${N}):</b> I_lower = ${sumLower.toFixed(3)} ≤ <span style="color:#FFD700;"><b>^+(_+(y,y)?,( ))? = ½y² = ${exactHalfSq.toFixed(3)}</b></span> ≤ I_upper = ${sumUpper.toFixed(3)}`;
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
    el.addEventListener('keydown', e => e.stopPropagation());});
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

      <input type="range" id="ch8-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh8Stage(this.value)">

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

    else if (stInt === 4 || stInt === 5) renderStage4And5(w, h, curStage);

    else if (stInt === 6) renderStage6(w, h);

    else if (stInt === 7 || stInt === 8) renderStage7And8(w, h, curStage);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);



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
    const synBindSync_syncCh8WithDeck = () => {
      syncCh8WithDeck();
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

        el.addEventListener('keydown', e => e.stopPropagation());

        el.addEventListener('mousedown', e => e.stopPropagation());

        el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });

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
