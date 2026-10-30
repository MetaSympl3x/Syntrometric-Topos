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

      <input type="range" id="ch13-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh13Stage(this.value)">

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

    7: "<b>Stage 7 (§13.3.3–13.3.6 — Thms. 13.18–13.20 K₈ Harmonics &amp; DEC):</b> Orthonormal eigenmodes Sel(Ψ_k)=λ_kΨ_k on K₈ &amp; Stokes–Cartan d_h∘ℛ_h = ℛ_h∘d.",

    8: "<b>Stage 8 (§13.4–13.5 — Def. 13.21 &amp; Thm. 13.22 Topos Φ_topos vs. IIT 4.0):</b> Polynomial O(N²) 3-node su(2) curvature triad vs. O(2^N) MIP explosion!",

    9: "<b>Stage 9 (§13.6.1 — Thm. 13.24 Lawvere Ego Fixed-Point Theorem):</b> Diagonal self-reflection Δ_A induces invariant Ego Token e* : 1 → A (f∘y* = y*)!",

    10: "<b>Stage 10 (§13.6.2–13.10 — Thm. 13.25 Active Inference &amp; Def. 13.26 REBUS):</b> Psychedelic de-encapsulation 𝔇_relax(𝒫) &amp; Lean 4 Import Firewall DAG!"

  };



  const STAGE_TELEMETRY = {

    1: "Hol_A(∂Σ) = 𝒫 exp(−∬_Σ [a₁, a₂]) ≠ id_G",

    2: "Hol_Syn(𝒞)(a) = a | ker T_β = ker S_β = {0}",

    3: "ℋ_phenom = H⁰_BRST(ℱ_ext) | π : ∫_Ctx Syn → Ctx",

    4: "‖Φ_apex(g₁) − Φ_apex(g₂)‖_{H^s} ≤ k_M ‖g₁−g₂‖",

    5: "τ_{≤m} ⊣ ι_m : Map(τ_{≤m}X, Y) ≃ Map(X, Y)",

    6: "R₆ = R₄ × S₂ | div_ḡ[Γ_(−)^(6,6)(G)] = 0",

    7: "d_h ∘ ℛ_h^k = ℛ_h^{k+1} ∘ d | Λ_UV = 4/√τ",

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

    drawNode3D("R6_Core", 0, 0, 0, 11, "#FFD700", "#DC143C", isStage7 ? "Sel(Ψ_k) = λ_k Ψ_k on K₈" : "R₆ = R₄ × S₂ (N=6 Root)", isStage7 ? "Thm. 13.18 Discrete Orthonormal Eigenbasis on Compact K₈ & Thm. 13.19 Stokes–Cartan d_h∘ℛ_h = ℛ_h∘d" : "Thm. 13.13 Phenomenal Condensation N²(N−6)(N+2)=0 ⇒ 36 = 21 Sym + 15 Skew Hermetry", w, h);

    drawNode3D("S2_Val", 1.15, 0, 0, 7.5, "#FFA500", "#fff", "x₅ Valence (Negentropy)", "Entelechial Valence Axis: ℒ_{X₅} S_therm ≤ −γV < 0", w, h);

    drawNode3D("S2_Aro", 0, 0, 1.15, 7.5, "#4169E1", "#fff", "x₆ Arousal (1/δt_n)", "Aeonic Arousal Axis & Intentional Agency Commutator [∂₅, ∂₆]", w, h);

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

    else if (stInt === 3 || stInt === 4) renderStage3And4(w, h, curStage);

    else if (stInt === 5) renderStage5(w, h);

    else if (stInt === 6 || stInt === 7) renderStage6And7(w, h, curStage);

    else if (stInt === 8) renderStage8(w, h);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);



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
    const vp = document.querySelector('.reveal-viewport');

    const isScroll = vp && vp.classList.contains('reveal-scroll');

    if (isScroll) {

      const scEl = vp.scrollHeight > vp.clientHeight ? vp : document.documentElement;

      const top = vp.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;

      const max = Math.max(1, (scEl.scrollHeight || document.body.scrollHeight) - window.innerHeight);

      window.setCh13Stage(1.0 + Math.min(1, Math.max(0, top / max)) * 9.0, false);

    } else if (window.Reveal && typeof window.Reveal.getIndices === 'function') {

      const idx = window.Reveal.getIndices();

      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 14);

      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;

      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;

      window.setCh13Stage(1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0, false);

    }

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

    window.addEventListener('scroll', syncCh13WithDeck, { passive: true });

    const vp = document.querySelector('.reveal-viewport');

    if (vp) vp.addEventListener('scroll', syncCh13WithDeck, { passive: true });

    if (window.Reveal) {

      window.Reveal.on('ready', syncCh13WithDeck);

      window.Reveal.on('slidechanged', syncCh13WithDeck);

      window.Reveal.on('fragmentshown', syncCh13WithDeck);

      window.Reveal.on('fragmenthidden', syncCh13WithDeck);

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
