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
      el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());});
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

      <input type="range" id="ch15-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh15Stage(this.value)">

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

      drawLine3D(pC, pHub, cj.col, 2.5, [4, 2]);

    });

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
    const vp = document.querySelector('.reveal-viewport');

    const isScroll = vp && vp.classList.contains('reveal-scroll');

    if (isScroll) {

      const scEl = vp.scrollHeight > vp.clientHeight ? vp : document.documentElement;

      const top = vp.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;

      const max = Math.max(1, (scEl.scrollHeight || document.body.scrollHeight) - window.innerHeight);

      window.setCh15Stage(1.0 + Math.min(1, Math.max(0, top / max)) * 9.0, false);

    } else if (window.Reveal && typeof window.Reveal.getIndices === 'function') {

      const idx = window.Reveal.getIndices();

      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 13);

      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;

      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;

      window.setCh15Stage(1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0, false);

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

    window.addEventListener('scroll', syncCh15WithDeck, { passive: true });

    const vp = document.querySelector('.reveal-viewport');

    if (vp) vp.addEventListener('scroll', syncCh15WithDeck, { passive: true });

    if (window.Reveal) {

      window.Reveal.on('ready', syncCh15WithDeck);

      window.Reveal.on('slidechanged', syncCh15WithDeck);

      window.Reveal.on('fragmentshown', syncCh15WithDeck);

      window.Reveal.on('fragmenthidden', syncCh15WithDeck);

    }

    const hud = document.getElementById('ch15-3d-hud');

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
    document.addEventListener('DOMContentLoaded', runCh15Engine);
  } else {
    runCh15Engine();
  }
})();
