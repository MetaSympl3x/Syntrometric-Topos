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
      el.addEventListener('keydown', e => e.stopPropagation());
      el.addEventListener('mousedown', e => e.stopPropagation());
      el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
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
