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
      el.addEventListener('keydown', e => e.stopPropagation());
      el.addEventListener('mousedown', e => e.stopPropagation());
      el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
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
