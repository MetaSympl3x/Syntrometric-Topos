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
      el.addEventListener('keydown', e => e.stopPropagation());
      el.addEventListener('mousedown', e => e.stopPropagation());
      el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
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

#ch11-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch11-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
}

#ch11-3d-hud.minimized .ch11-hud-body {
  display: none;
}

.ch11-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch11-hud-title {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.6px;
  color: #FFD700;
  text-transform: uppercase;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px 6px;
  min-width: 0;
  flex: 1 1 auto;
  line-height: 1.1;
}

.ch11-hud-title span:first-child {
  line-height: 1.1;
}

.ch11-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 9px;
  padding: 1px 6px;
  line-height: 1.1;
  border-radius: 4px;
}

.ch11-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(3px, 0.4vw, 6px);
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
    padding: 8px 10px 10px 10px;
  }
  .ch11-hud-title {
    font-size: clamp(9px, 2vw, 11px);
    gap: 2px 4px;
    line-height: 1.1;
  }
  .ch11-hud-controls {
    gap: 3px;
  }
  .ch11-hud-btn {
    padding: 2px clamp(4px, 1vw, 7px);
    font-size: clamp(8px, 1.8vw, 10px);
  }
  .ch11-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 480px) {
  #ch11-3d-hud {
    right: 4px;
    bottom: 4px;
    width: calc(100vw - 8px);
    padding: 6px 8px 8px 8px;
  }
  .ch11-hud-title {
    font-size: 8.5px;
    line-height: 1.05;
  }
  .ch11-hud-btn {
    padding: 2px 5px;
    font-size: 8px;
  }
  .ch11-scrubber span {
    font-size: 8.5px;
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

      <input type="range" id="ch11-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh11Stage(this.value)">

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

    else if (stInt === 5 || stInt === 6) renderStage5And6(w, h, curStage);

    else if (stInt === 7) renderStage7(w, h);

    else if (stInt === 8) renderStage8(w, h);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);



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
    const vp = document.querySelector('.reveal-viewport');

    const isScroll = vp && vp.classList.contains('reveal-scroll');

    if (isScroll) {

      const scEl = vp.scrollHeight > vp.clientHeight ? vp : document.documentElement;

      const top = vp.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;

      const max = Math.max(1, (scEl.scrollHeight || document.body.scrollHeight) - window.innerHeight);

      window.setCh11Stage(1.0 + Math.min(1, Math.max(0, top / max)) * 9.0, false);

    } else if (window.Reveal && typeof window.Reveal.getIndices === 'function') {

      const idx = window.Reveal.getIndices();

      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 13);

      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;

      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;

      window.setCh11Stage(1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0, false);

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

    window.addEventListener('scroll', syncCh11WithDeck, { passive: true });

    const vp = document.querySelector('.reveal-viewport');

    if (vp) vp.addEventListener('scroll', syncCh11WithDeck, { passive: true });

    if (window.Reveal) {

      window.Reveal.on('ready', syncCh11WithDeck);

      window.Reveal.on('slidechanged', syncCh11WithDeck);

      window.Reveal.on('fragmentshown', syncCh11WithDeck);

      window.Reveal.on('fragmenthidden', syncCh11WithDeck);

    }

    const hud = document.getElementById('ch11-3d-hud');

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
    document.addEventListener('DOMContentLoaded', runCh11Engine);
  } else {
    runCh11Engine();
  }
})();
