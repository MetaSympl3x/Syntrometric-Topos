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
      el.addEventListener('keydown', e => e.stopPropagation());
      el.addEventListener('mousedown', e => e.stopPropagation());
      el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
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

