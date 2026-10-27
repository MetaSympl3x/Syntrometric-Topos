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

(function() {
  let aspectMode = 'quant';
  let coeffField = 'C';

  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) {
      res = Math.round((res * (n - i + 1)) / i);
    }
    return res;
  }

  // WIDGET 1: §7.1.1 Cognitive Pluralism & Mengendialektik Lab
  window.ch7_setAspectMode = function(mode) {
    aspectMode = mode;
    window.ch7_updatePluralismLab();
  };

  window.ch7_updatePluralismLab = function() {
    const elAspects = document.getElementById('ch7-plur-aspects');
    if (!elAspects) return;
    const numS = parseInt(elAspects.value);
    const valA = parseFloat(document.getElementById('ch7-plur-a').value);
    const valB = parseFloat(document.getElementById('ch7-plur-b').value);

    document.getElementById('ch7-plur-aspects-val').innerText = numS;
    document.getElementById('ch7-plur-a-val').innerText = valA.toFixed(1);
    document.getElementById('ch7-plur-b-val').innerText = valB.toFixed(1);

    const btnQual = document.getElementById('ch7-btn-qual');
    const btnQuant = document.getElementById('ch7-btn-quant');
    if (btnQual && btnQuant) {
      if (aspectMode === 'qual') {
        btnQual.style.background = '#FFD700'; btnQual.style.color = '#000'; btnQual.style.fontWeight = 'bold';
        btnQuant.style.background = '#1e293b'; btnQuant.style.color = '#FFD700'; btnQuant.style.fontWeight = 'normal';
      } else {
        btnQuant.style.background = '#FFD700'; btnQuant.style.color = '#000'; btnQuant.style.fontWeight = 'bold';
        btnQual.style.background = '#1e293b'; btnQual.style.color = '#FFD700'; btnQual.style.fontWeight = 'normal';
      }
    }

    const svg = document.getElementById('ch7-plur-svg');
    if (svg) {
      let html = '';
      const cx = 105, cy = 62, r = 42;
      const colors = ['#4169E1', '#20B2AA', '#FFA500', '#9370DB', '#DC143C', '#FFD700'];
      for (let i = 0; i < numS; i++) {
        const ang = (i / numS) * 2 * Math.PI - Math.PI / 2;
        const x = cx + r * Math.cos(ang);
        const y = cy + r * Math.sin(ang);
        if (aspectMode === 'quant') {
          html += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${cx}" y2="${cy}" stroke="#FFD700" stroke-width="2" stroke-dasharray="3,2"/>`;
        } else if (i > 0) {
          const prevAng = ((i - 1) / numS) * 2 * Math.PI - Math.PI / 2;
          const px = cx + r * Math.cos(prevAng);
          const py = cy + r * Math.sin(prevAng);
          html += `<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#475569" stroke-width="1.5" stroke-dasharray="2,3"/>`;
        }
        html += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="${colors[i % colors.length]}" fill-opacity="0.85" stroke="#fff" stroke-width="1"/>`;
        html += `<text x="${x.toFixed(1)}" y="${(y + 3.5).toFixed(1)}" fill="#fff" font-size="8.5" font-weight="bold" text-anchor="middle">S_${i + 1}</text>`;
      }
      if (aspectMode === 'quant') {
        html += `<circle cx="${cx}" cy="${cy}" r="14" fill="rgba(255,215,0,0.25)" stroke="#FFD700" stroke-width="2.2"/>`;
        html += `<text x="${cx}" y="${cy + 3.5}" fill="#FFD700" font-size="9" font-weight="bold" text-anchor="middle">ℚ⊆ℝ⊆ℂ</text>`;
      } else {
        html += `<text x="${cx}" y="${cy + 3.5}" fill="#94a3b8" font-size="8.5" font-weight="bold" text-anchor="middle">Regional □_S</text>`;
      }
      svg.innerHTML = html;
    }

    const diff = valA - valB;
    let dialectStr = '';
    if (Math.abs(diff) < 0.05) {
      dialectStr = `<span style="color:#20B2AA;"><b>Affirmation |m̄|₊ ≡ (a = b):</b></span> ${valA.toFixed(1)} = ${valB.toFixed(1)} (Ratio a/b = 1.00)`;
    } else if (diff > 0) {
      dialectStr = `<span style="color:#FFA500;"><b>Negation |m̄|₋ ≡ (a ≠ b ⇒ a &gt; b):</b></span> ${valA.toFixed(1)} &gt; ${valB.toFixed(1)} (Δ = +${diff.toFixed(1)}, Sum = ${(valA + valB).toFixed(1)})`;
    } else {
      dialectStr = `<span style="color:#FFA500;"><b>Negation |m̄|₋ ≡ (a ≠ b ⇒ a &lt; b):</b></span> ${valA.toFixed(1)} &lt; ${valB.toFixed(1)} (Δ = ${diff.toFixed(1)}, Sum = ${(valA + valB).toFixed(1)})`;
    }

    const box = document.getElementById('ch7-plur-readout');
    if (box) {
      if (aspectMode === 'qual') {
        box.innerHTML =
          `<b>Qualitätsaspekt (Regional Pluralism, |I| = ${numS}):</b> Sensory modalities S₁…S_${numS} differ in intrinsic kind ⇒ ` +
          `<span style="color:#9370DB;"><b>Apodiktische Pluralitäten</b></span> (local necessity □_{S_i} only, no global scalar ordering).`;
      } else {
        box.innerHTML =
          `<b>Quantitätsaspekt (Global Unification over Coeff):</b> All ${numS} quantitative channels converge via <b>Mengendialektik</b>:<br>${dialectStr}`;
      }
    }
  };

  // WIDGET 2: §7.1.2 Quantitätssyntrix (SM-28) & Synkolatorraum (m + m^k)
  window.ch7_updateSyntrixCombinatorics = function() {
    const elN = document.getElementById('ch7-syn-n');
    if (!elN) return;
    const n = parseInt(elN.value);
    const elM = document.getElementById('ch7-syn-m');
    elM.max = n;
    const m = Math.min(n, parseInt(elM.value));
    elM.value = m;
    const k = parseInt(document.getElementById('ch7-syn-k').value);

    document.getElementById('ch7-syn-n-val').innerText = n;
    document.getElementById('ch7-syn-m-val').innerText = m;
    document.getElementById('ch7-syn-k-val').innerText = k;

    const comb = binom(n, m);
    const fiberDim = Math.pow(m, k);
    const totalDim = m + fiberDim;

    const svg = document.getElementById('ch7-syn-svg');
    if (svg) {
      let html = `<rect x="12" y="80" width="186" height="26" rx="5" fill="rgba(65,105,225,0.22)" stroke="#4169E1" stroke-width="1.8"/>`;
      html += `<text x="105" y="96" fill="#82aaff" font-size="9.5" font-weight="bold" text-anchor="middle">Base R_${m} ⊆ R_${n} (dim = ${m})</text>`;
      const numFibers = Math.min(m, 6);
      for (let i = 0; i < numFibers; i++) {
        const x = 32 + (i / Math.max(1, numFibers - 1)) * 146;
        html += `<line x1="${x.toFixed(1)}" y1="80" x2="${x.toFixed(1)}" y2="20" stroke="#9370DB" stroke-width="2" stroke-dasharray="3,2"/>`;
        html += `<circle cx="${x.toFixed(1)}" cy="46" r="10" fill="rgba(147,112,219,0.25)" stroke="#FFD700" stroke-width="1.4"/>`;
        html += `<text x="${x.toFixed(1)}" y="49" fill="#FFD700" font-size="8" font-weight="bold" text-anchor="middle">m^k</text>`;
      }
      html += `<text x="105" y="13" fill="#20B2AA" font-size="9" font-weight="bold" text-anchor="middle">Fiber T^⊗${k} R_${m}: dim = ${m}^${k} = ${fiberDim}</text>`;
      svg.innerHTML = html;
    }

    const typeNames = ['Scalar Field (k=0)', 'Vector Field (k=1)', 'Rank-2 Metric/Tensor (k=2)', 'Rank-3 Connection/Tensor (k=3)', 'Rank-4 Curvature Tensor (k=4)'];
    const box = document.getElementById('ch7-syn-readout');
    if (box) {
      box.innerHTML =
        `<b>SM Eq. 28 ⟨f, R_${n}, ${m}⟩:</b> Admissible m-subsets = <b style="color:#FFA500;">C(${n},${m}) = ${comb}</b> | Field Type: <span style="color:#20B2AA;">${typeNames[k] || 'Rank-' + k}</span><br>` +
        `<b>Synkolatorraum M_syn := T^⊗${k} R_${m}:</b> Base (${m}) + Fiber (${m}^${k} = ${fiberDim}) = <b style="color:#FFD700;">dim(M_syn) = ${totalDim}</b>`;
    }
  };

  // WIDGET 3: §7.2.1 Coefficient Poset Coeff & Realification Functor V_R
  window.ch7_selectCoeffField = function(f) {
    coeffField = f;
    window.ch7_updateRealification();
  };

  window.ch7_updateRealification = function() {
    const elN = document.getElementById('ch7-real-n');
    if (!elN) return;
    const n = parseInt(elN.value);
    const deg = parseInt(document.getElementById('ch7-real-theta').value);
    document.getElementById('ch7-real-n-val').innerText = n;
    document.getElementById('ch7-real-theta-val').innerText = deg + '°';

    ['Q', 'R', 'C'].forEach(k => {
      const b = document.getElementById('ch7-btn-field-' + k);
      if (b) {
        if (k === coeffField) {
          b.style.background = '#FFD700'; b.style.color = '#000'; b.style.fontWeight = 'bold';
        } else {
          b.style.background = '#1e293b'; b.style.color = '#FFD700'; b.style.fontWeight = 'normal';
        }
      }
    });

    const dK = (coeffField === 'C') ? 2 : 1;
    const realDim = dK * n;
    const predDim = 3 * dK * n;
    const rad = (deg * Math.PI) / 180.0;
    const cVal = Math.cos(rad);
    const sVal = Math.sin(rad);

    const svg = document.getElementById('ch7-real-svg');
    if (svg) {
      let html = `<polygon points="15,98 155,98 195,62 55,62" fill="rgba(65,105,225,0.20)" stroke="#4169E1" stroke-width="1.6"/>`;
      for (let ix = 0; ix < 4; ix++) {
        for (let iy = 0; iy < 2; iy++) {
          const px = 45 + ix * 32 + iy * 14;
          const py = 90 - iy * 18;
          html += `<circle cx="${px}" cy="${py}" r="${coeffField === 'Q' ? 3.5 : 2.2}" fill="${coeffField === 'Q' ? '#FFD700' : '#82aaff'}"/>`;
        }
      }
      if (coeffField === 'C') {
        html += `<line x1="105" y1="78" x2="105" y2="34" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3,2"/>`;
        html += `<circle cx="105" cy="34" r="22" fill="rgba(32,178,170,0.22)" stroke="#20B2AA" stroke-width="1.8"/>`;
        const vx = 105 + 20 * cVal;
        const vy = 34 - 20 * sVal;
        html += `<line x1="105" y1="34" x2="${vx.toFixed(1)}" y2="${vy.toFixed(1)}" stroke="#FFA500" stroke-width="2.5"/>`;
        html += `<circle cx="${vx.toFixed(1)}" cy="${vy.toFixed(1)}" r="3.5" fill="#FFD700"/>`;
        html += `<text x="155" y="26" fill="#20B2AA" font-size="8.5" font-weight="bold">J_ℂ² = -id</text>`;
      } else {
        html += `<text x="105" y="34" fill="#FFD700" font-size="9.5" font-weight="bold" text-anchor="middle">${coeffField === 'Q' ? 'Scalar Extension ℝ ⊗_ℚ ℚ^n' : 'Identity Real Continuum ℝ^n'}</text>`;
      }
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch7-real-readout');
    if (box) {
      const opStr = coeffField === 'Q'
        ? `Scalar Extension ℝ ⊗_ℚ ℚ^${n}`
        : (coeffField === 'R' ? `Identity Real Space ℝ^${n}` : `Scalar Restriction Res_ℝ^ℂ(ℂ^${n}) with ρ_ℂ(e^{iθ}) = [[${cVal.toFixed(2)}, ${(-sVal).toFixed(2)}], [${sVal.toFixed(2)}, ${cVal.toFixed(2)}]]`);
      box.innerHTML =
        `<b>Field 𝕂 = 𝔸_${coeffField} (d(𝕂) = ${dK}):</b> ${opStr}<br>` +
        `<b>Realified Parameter Space:</b> dim_ℝ((𝕂^${n})_ℝ) = <b>${realDim}</b> | <b>Predicatrix Carrier P^U ≅ ℝ^{3·d(𝕂)·n}:</b> dim_ℝ(P^U) = <b style="color:#FFD700;">${predDim}</b>`;
    }
  };

  // WIDGET 4: §7.2.1 Internal Dedekind Real Object R_E & Locatedness
  window.ch7_updateDedekindCut = function() {
    const elQ = document.getElementById('ch7-ded-q');
    if (!elQ) return;
    let q = parseFloat(elQ.value);
    let r = parseFloat(document.getElementById('ch7-ded-r').value);
    if (q >= r - 0.04) {
      q = Math.max(0.2, r - 0.1);
      elQ.value = q.toFixed(2);
    }
    document.getElementById('ch7-ded-q-val').innerText = q.toFixed(2);
    document.getElementById('ch7-ded-r-val').innerText = r.toFixed(2);

    const alpha = Math.SQRT2; // 1.4142
    const inL = q < alpha;
    const inU = r > alpha;

    const svg = document.getElementById('ch7-ded-svg');
    if (svg) {
      const toX = v => 20 + (v / 2.4) * 380;
      const xAlpha = toX(alpha);
      const xQ = toX(q);
      const xR = toX(r);
      let html = `
        <line x1="20" y1="52" x2="400" y2="52" stroke="#475569" stroke-width="2"/>
        <line x1="20" y1="52" x2="${(xAlpha - 4).toFixed(1)}" y2="52" stroke="#20B2AA" stroke-width="6"/>
        <line x1="${(xAlpha + 4).toFixed(1)}" y1="52" x2="400" y2="52" stroke="#FFA500" stroke-width="6"/>
        <circle cx="${xAlpha.toFixed(1)}" cy="52" r="6" fill="#FFD700" stroke="#000" stroke-width="1.5"/>
        <text x="${xAlpha.toFixed(1)}" y="34" fill="#FFD700" font-size="9.5" font-weight="bold" text-anchor="middle">α = √2 ≈ 1.414</text>
        <circle cx="${xQ.toFixed(1)}" cy="52" r="5" fill="${inL ? '#20B2AA' : '#DC143C'}" stroke="#fff" stroke-width="1.2"/>
        <text x="${xQ.toFixed(1)}" y="76" fill="#5eead4" font-size="9.5" font-weight="bold" text-anchor="middle">q=${q.toFixed(2)}</text>
        <circle cx="${xR.toFixed(1)}" cy="52" r="5" fill="${inU ? '#FFA500' : '#DC143C'}" stroke="#fff" stroke-width="1.2"/>
        <text x="${xR.toFixed(1)}" y="76" fill="#fcd34d" font-size="9.5" font-weight="bold" text-anchor="middle">r=${r.toFixed(2)}</text>
        <text x="65" y="22" fill="#20B2AA" font-size="9.5" font-weight="bold">Lower Cut L (q &lt; α)</text>
        <text x="335" y="22" fill="#FFA500" font-size="9.5" font-weight="bold">Upper Cut U (r &gt; α)</text>
      `;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch7-ded-readout');
    if (box) {
      let witness = [];
      if (inL) witness.push(`<span style="color:#20B2AA;"><b>L(q=${q.toFixed(2)}) = TRUE</b></span>`);
      if (inU) witness.push(`<span style="color:#FFA500;"><b>U(r=${r.toFixed(2)}) = TRUE</b></span>`);
      box.innerHTML =
        `<b>Heyting Locatedness (∀ q &lt; r in ℚ_ℰ, L(q) ∨ U(r)):</b> With q = ${q.toFixed(2)} &lt; r = ${r.toFixed(2)}, ` +
        `witnesses: ${witness.join(' and ')} ⇒ <b style="color:#FFD700;">L(q) ∨ U(r) Verified!</b><br>` +
        `<b>Thm. 7.9 Caveat:</b> ℝ_Cauchy ↪ ℝ_ℰ is a monomorphism (isomorphism requires internal countable choice / local compactness).`;
    }
  };

  // WIDGET 5: §7.2.2 Tensor Operad O_quant Action Ribbon & Cross-Norm
  window.ch7_updateOperadRibbon = function() {
    const elR = document.getElementById('ch7-op-r');
    if (!elR) return;
    const r = parseInt(elR.value);
    const fNorm = parseFloat(document.getElementById('ch7-op-fnorm').value);
    const aNorm = parseFloat(document.getElementById('ch7-op-anorm').value);
    const kOut = parseInt(document.getElementById('ch7-op-k').value);

    document.getElementById('ch7-op-r-val').innerText = r;
    document.getElementById('ch7-op-fnorm-val').innerText = fNorm.toFixed(2);
    document.getElementById('ch7-op-anorm-val').innerText = aNorm.toFixed(2);
    document.getElementById('ch7-op-k-val').innerText = kOut;

    const crossNorm = Math.pow(aNorm, r);
    const outBound = fNorm * crossNorm;

    const svg = document.getElementById('ch7-op-svg');
    if (svg) {
      let html = '';
      for (let i = 0; i < r; i++) {
        const y = 18 + (i / Math.max(1, r - 1)) * 68;
        const ym = r === 1 ? 52 : y;
        html += `<path d="M 55,${ym.toFixed(1)} C 110,${ym.toFixed(1)} 125,52 165,52" fill="none" stroke="#4169E1" stroke-width="2.2"/>`;
        html += `<rect x="10" y="${(ym - 9).toFixed(1)}" width="46" height="18" rx="4" fill="rgba(65,105,225,0.25)" stroke="#4169E1" stroke-width="1.2"/>`;
        html += `<text x="33" y="${(ym + 3.5).toFixed(1)}" fill="#fff" font-size="8.5" text-anchor="middle">A_${i + 1}</text>`;
      }
      html += `<rect x="165" y="26" width="88" height="52" rx="7" fill="rgba(32,178,170,0.25)" stroke="#20B2AA" stroke-width="2"/>`;
      html += `<text x="209" y="48" fill="#20B2AA" font-size="9.5" font-weight="bold" text-anchor="middle">f ∈ O_quant</text>`;
      html += `<text x="209" y="64" fill="#cbd5e1" font-size="8.5" text-anchor="middle">‖f‖_op = ${fNorm.toFixed(2)}</text>`;
      html += `<line x1="253" y1="52" x2="312" y2="52" stroke="#FFA500" stroke-width="3"/>`;
      html += `<rect x="312" y="30" width="98" height="44" rx="6" fill="rgba(255,165,0,0.22)" stroke="#FFA500" stroke-width="1.8"/>`;
      html += `<text x="361" y="49" fill="#FFD700" font-size="9" font-weight="bold" text-anchor="middle">A_out ∈ X_(m,${kOut})</text>`;
      html += `<text x="361" y="64" fill="#fff" font-size="8.5" text-anchor="middle">≤ ${outBound.toFixed(3)}</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch7-op-readout');
    if (box) {
      box.innerHTML =
        `<b>Projective Cross-Norm (⊗̂_π, Arity r=${r}):</b> ∏_{i=1}^${r} ‖A_i‖_{C_b^0} = (${aNorm.toFixed(2)})^${r} = <b>${crossNorm.toFixed(4)}</b><br>` +
        `<b>Def. 7.12 Output Estimate (Rank k=${kOut}):</b> ‖f(A₁,…,A_${r})‖_{C_b^0} ≤ ‖f‖_op · ∏‖A_i‖ = <b style="color:#FFD700;">${outBound.toFixed(4)}</b> ` +
        `<span style="color:#20B2AA;">(O_isom: f(φ_*A_i) = φ_*f(A_i))</span>`;
    }
  };

  // WIDGET 6: §7.3.1 Dimensional Parameter Functor S_n & SO(n) Metropie Geodesic Lab
  window.ch7_updateDimIteratorLab = function() {
    const elL1 = document.getElementById('ch7-dim-l1');
    if (!elL1) return;
    const l1 = parseFloat(elL1.value);
    const l2 = parseFloat(document.getElementById('ch7-dim-l2').value);
    const omega = parseFloat(document.getElementById('ch7-dim-omega').value);

    document.getElementById('ch7-dim-l1-val').innerText = l1.toFixed(1);
    document.getElementById('ch7-dim-l2-val').innerText = l2.toFixed(1);
    document.getElementById('ch7-dim-omega-val').innerText = omega.toFixed(2);

    const y1 = 1.5, y2 = 1.2;
    const w1 = l1 * y1, w2 = l2 * y2;
    const normRn = Math.max(w1, w2);
    // For a 2x2 rotation generator [[0, -omega], [omega, 0]] in so(n), -1/2 tr(A^2) = omega^2
    const gMet = omega * omega;

    const svg = document.getElementById('ch7-dim-svg');
    if (svg) {
      const endX = 115 + 45 * Math.cos(omega * 0.8);
      const endY = 58 - 32 * Math.sin(omega * 0.8);
      let html = `
        <rect x="12" y="10" width="396" height="84" rx="10" fill="rgba(65,105,225,0.08)" stroke="#4169E1" stroke-width="1.4"/>
        <text x="24" y="25" fill="#82aaff" font-size="9" font-weight="bold">Isom⁺(P^U) ≅ SO(n) Cipher Manifold</text>
        <path d="M 45,72 Q 115,24 195,62" fill="none" stroke="#20B2AA" stroke-width="2.6"/>
        <circle cx="45" cy="72" r="5" fill="#20B2AA"/>
        <text x="45" y="86" fill="#20B2AA" font-size="8.5" text-anchor="middle">z(0)=z^U</text>
        <circle cx="195" cy="62" r="5" fill="#20B2AA"/>
        <text x="195" y="76" fill="#20B2AA" font-size="8.5" text-anchor="middle">z(1)=z^V</text>
        <circle cx="115" cy="48" r="4.5" fill="#FFA500"/>
        <line x1="115" y1="48" x2="${endX.toFixed(1)}" y2="${endY.toFixed(1)}" stroke="#DC143C" stroke-width="2.5"/>
        <text x="${(endX + 6).toFixed(1)}" y="${endY.toFixed(1)}" fill="#ff6b81" font-size="8.5" font-weight="bold">ż(t) ∈ 𝔰𝔬(n)</text>
        <rect x="245" y="22" width="150" height="60" rx="6" fill="rgba(15,23,42,0.85)" stroke="#FFA500" stroke-width="1.2"/>
        <text x="320" y="40" fill="#FFA500" font-size="9" font-weight="bold" text-anchor="middle">Weighted Norm ‖y‖_{R_n}</text>
        <text x="320" y="56" fill="#FFD700" font-size="10" font-weight="bold" text-anchor="middle">max(${w1.toFixed(2)}, ${w2.toFixed(2)}) = ${normRn.toFixed(2)}</text>
        <text x="320" y="72" fill="#5eead4" font-size="8.5" text-anchor="middle">g_met(ż,ż) = ${gMet.toFixed(3)}</text>
      `;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch7-dim-readout');
    if (box) {
      box.innerHTML =
        `<b>Def. 7.13 Functor S_n(𝕂, Λ):</b> ‖y‖_{R_n} = max_l λ_l ‖y_l‖_𝕂 = max(${l1.toFixed(1)}×1.5, ${l2.toFixed(1)}×1.2) = <b style="color:#FFD700;">${normRn.toFixed(2)}</b><br>` +
        `<b>Fig. 7.4 Killing–Cartan Metric:</b> g_met(ż, ż) = -½ tr((z⁻¹ż)²) = <b>${gMet.toFixed(3)} ≥ 0</b> ⇒ Geodesic bound d_Ctx(U,V) ≤ ${omega.toFixed(2)}`;
    }
  };

  // WIDGET 7: §7.3.2 Isocline Submersion Foliation f_A & Morse-Bott Center Z_alpha
  window.ch7_updateIsoclineFoliation = function() {
    const elC = document.getElementById('ch7-iso-c');
    if (!elC) return;
    const cVal = parseFloat(elC.value);
    const aniso = parseFloat(document.getElementById('ch7-iso-aniso').value);
    document.getElementById('ch7-iso-c-val').innerText = cVal.toFixed(2);
    document.getElementById('ch7-iso-aniso-val').innerText = aniso.toFixed(1);

    const svg = document.getElementById('ch7-iso-svg');
    if (svg) {
      const ox = 38, oy = 102;
      let html = `
        <line x1="${ox}" y1="${oy}" x2="200" y2="${oy}" stroke="#4169E1" stroke-width="2.2"/>
        <line x1="${ox}" y1="${oy}" x2="${ox}" y2="10" stroke="#4169E1" stroke-width="2.2"/>
        <text x="195" y="${oy + 12}" fill="#82aaff" font-size="8.5" font-weight="bold">y₁ ≥ 0</text>
        <text x="18" y="18" fill="#82aaff" font-size="8.5" font-weight="bold">y₂</text>
      `;
      const levels = [0.6, 1.2, 2.0, 3.0];
      levels.forEach(lv => {
        const rx = 42 * Math.sqrt(lv);
        const ry = (42 * Math.sqrt(lv)) / Math.sqrt(aniso);
        const isSel = Math.abs(lv - cVal) < 0.35;
        let pts = [];
        for (let s = 0; s <= 24; s++) {
          const ang = (s / 24) * (Math.PI / 2);
          const px = ox + rx * Math.cos(ang);
          const py = oy - ry * Math.sin(ang);
          if (px <= 202 && py >= 6) {
            pts.push((pts.length === 0 ? 'M ' : 'L ') + px.toFixed(1) + ',' + py.toFixed(1));
          }
        }
        if (pts.length > 1) {
          html += `<path d="${pts.join(' ')}" fill="none" stroke="${isSel ? '#FFD700' : '#20B2AA'}" stroke-width="${isSel ? 2.8 : 1.5}"/>`;
        }
      });
      // Active level curve cVal
      const rxC = 42 * Math.sqrt(cVal);
      const ryC = (42 * Math.sqrt(cVal)) / Math.sqrt(aniso);
      let ptsC = [];
      for (let s = 0; s <= 28; s++) {
        const ang = (s / 28) * (Math.PI / 2);
        const px = ox + rxC * Math.cos(ang);
        const py = oy - ryC * Math.sin(ang);
        if (px <= 202 && py >= 6) {
          ptsC.push((ptsC.length === 0 ? 'M ' : 'L ') + px.toFixed(1) + ',' + py.toFixed(1));
        }
      }
      if (ptsC.length > 1) {
        html += `<path d="${ptsC.join(' ')}" fill="none" stroke="#FFD700" stroke-width="3"/>`;
      }
      // Gradient arrow at 45 deg
      const gx0 = ox + rxC * Math.cos(Math.PI / 4);
      const gy0 = oy - ryC * Math.sin(Math.PI / 4);
      const gx1 = ox + 0.65 * rxC * Math.cos(Math.PI / 4);
      const gy1 = oy - 0.65 * ryC * Math.sin(Math.PI / 4);
      if (cVal > 0.08 && gx0 <= 200 && gy0 >= 8) {
        html += `<line x1="${gx0.toFixed(1)}" y1="${gy0.toFixed(1)}" x2="${gx1.toFixed(1)}" y2="${gy1.toFixed(1)}" stroke="#FFA500" stroke-width="2.2"/>`;
        html += `<circle cx="${gx1.toFixed(1)}" cy="${gy1.toFixed(1)}" r="2.8" fill="#FFA500"/>`;
      }
      // Fehlstelle 0 (Field Center)
      html += `<circle cx="${ox}" cy="${oy}" r="6" fill="#DC143C" stroke="#fff" stroke-width="1.5"/>`;
      html += `<text x="${ox + 48}" y="${oy - 6}" fill="#ff6b81" font-size="8.5" font-weight="bold">Z_α = {0} (Fehlstelle)</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch7-iso-readout');
    if (box) {
      if (cVal < 0.08) {
        box.innerHTML =
          `<span style="color:#ff6b81;"><b>⚠ AT CRITICAL FIELD CENTER Z(A, g_m, Φ) = {(0,0)} (Fehlstelle 0):</b></span><br>` +
          `d(Φ ∘ A)_0 = (2y₁, 2αy₂) = (0, 0) ⇒ Rank = 0 &lt; d=1. Isolated 0D Morse–Bott minimum Z_α!`;
      } else {
        box.innerHTML =
          `<b>Regular Submersion Locus R_2^reg (c = ${cVal.toFixed(2)} &gt; 0):</b> d(y₁² + ${aniso.toFixed(1)}y₂²) ≠ 0 ⇒ <b>rank(dA_y) = d = 1</b>.<br>` +
          `<b>Isokline Σ_c:</b> Smooth embedded 1D submanifold of <b>codimension d = 1</b> in foliation 𝔣_A, orthogonal to −∇Φ!`;
      }
    }
  };

  // WIDGET 8: §7.3.3 Layered Field Cascade Norm Bound Simulator (Thm. 7.19)
  window.ch7_updateCascadeBound = function() {
    const elM = document.getElementById('ch7-casc-m');
    if (!elM) return;
    const M = parseInt(elM.value);
    const r = parseInt(document.getElementById('ch7-casc-r').value);
    const C = parseFloat(document.getElementById('ch7-casc-c').value);
    const a0 = parseFloat(document.getElementById('ch7-casc-a0').value);

    document.getElementById('ch7-casc-m-val').innerText = M;
    document.getElementById('ch7-casc-r-val').innerText = r;
    document.getElementById('ch7-casc-c-val').innerText = C.toFixed(2);
    document.getElementById('ch7-casc-a0-val').innerText = a0.toFixed(2);

    let vals = [a0];
    let D_g = 1;
    let Gamma_g = 1.0;
    for (let g = 1; g <= M; g++) {
      D_g = Math.pow(r, g);
      // For uniform C_j = C and r_j = r, prod_{j=1}^g C^(r^(g-j)) = C^(sum_{k=0}^{g-1} r^k)
      let expSum = 0;
      for (let k = 0; k < g; k++) expSum += Math.pow(r, k);
      Gamma_g = Math.pow(C, expSum);
      vals.push(Gamma_g * Math.pow(a0, D_g));
    }

    const svg = document.getElementById('ch7-casc-svg');
    if (svg) {
      const maxVal = Math.max(2.0, ...vals.map(v => Math.min(v, 25)));
      let html = `
        <line x1="35" y1="98" x2="395" y2="98" stroke="#475569" stroke-width="1.8"/>
        <line x1="35" y1="98" x2="35" y2="12" stroke="#475569" stroke-width="1.8"/>
      `;
      let pts = [];
      for (let g = 0; g <= M; g++) {
        const px = 35 + (g / M) * 340;
        const clamped = Math.min(vals[g], 25);
        const py = 98 - (clamped / maxVal) * 78;
        pts.push((g === 0 ? 'M ' : 'L ') + px.toFixed(1) + ',' + py.toFixed(1));
      }
      const lineCol = vals[M] <= 1.001 ? '#20B2AA' : '#FFA500';
      html += `<path d="${pts.join(' ')}" fill="none" stroke="${lineCol}" stroke-width="3"/>`;
      for (let g = 0; g <= M; g++) {
        const px = 35 + (g / M) * 340;
        const clamped = Math.min(vals[g], 25);
        const py = 98 - (clamped / maxVal) * 78;
        html += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4.5" fill="#FFD700" stroke="#000" stroke-width="1"/>`;
        html += `<text x="${px.toFixed(1)}" y="111" fill="#cbd5e1" font-size="8.5" text-anchor="middle">γ=${g}</text>`;
        const vStr = vals[g] > 999 ? vals[g].toExponential(1) : vals[g].toFixed(2);
        html += `<text x="${px.toFixed(1)}" y="${Math.max(11, py - 7).toFixed(1)}" fill="#FFD700" font-size="8" font-weight="bold" text-anchor="middle">${vStr}</text>`;
      }
      svg.innerHTML = html;
    }

    const finalBound = vals[M];
    const finalStr = finalBound > 1e4 ? finalBound.toExponential(3) : finalBound.toFixed(4);
    const gammaStr = Gamma_g > 1e4 ? Gamma_g.toExponential(3) : Gamma_g.toFixed(4);
    const box = document.getElementById('ch7-casc-readout');
    if (box) {
      let regimeNote = '';
      if (a0 === 0) {
        regimeNote = `<span style="color:#20B2AA;"><b>Zero-Field Vacuum Stability (§7.5 Check 3):</b> A₀ ≡ 0 ⇒ A_M ≡ 0!</span>`;
      } else if (r === 1) {
        regimeNote = `<span style="color:#20B2AA;"><b>Linear Unary Cascade (§7.5 Check 1):</b> r_j = 1 ⇒ D_M = 1, Γ_M = C^M = ${gammaStr}</span>`;
      } else if (finalBound <= 1.0) {
        regimeNote = `<span style="color:#20B2AA;"><b>Contractive Unit-Ball Regime:</b> Monomial bound stays ≤ 1 across all ${M} stages!</span>`;
      } else {
        regimeNote = `<span style="color:#FFA500;"><b>Finite-Depth Polynomial Safety Bound:</b> Finite &lt; ∞ at depth M=${M} (no blow-up).</span>`;
      }
      box.innerHTML =
        `<b>Thm. 7.19 Closed Form (Stage M=${M}):</b> Degree <b style="color:#20B2AA;">D_${M} = ∏ r_j = ${r}^${M} = ${D_g}</b> | Constant <b style="color:#FFA500;">Γ_${M} = ${gammaStr}</b><br>` +
        `<b>Estimate:</b> ‖A_${M}‖_{C_b^0} ≤ Γ_${M} ‖A₀‖^{D_${M}} = <b style="color:#FFD700;">${finalStr}</b> | ${regimeNote}`;
    }
  };

  // ---------------------------------------------------------------------------
  // VIDEO CONTROL & INIT BOILERPLATE (IIFE-isolated for combined deck safety)
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

  function renderAllCh7Widgets() {
    window.ch7_updatePluralismLab();
    window.ch7_updateSyntrixCombinatorics();
    window.ch7_updateRealification();
    window.ch7_updateDedekindCut();
    window.ch7_updateOperadRibbon();
    window.ch7_updateDimIteratorLab();
    window.ch7_updateIsoclineFoliation();
    window.ch7_updateCascadeBound();
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

  let ch7Initialised = false;
  function initChapter7() {
    if (ch7Initialised) return;
    ch7Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh7Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter7);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter7();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter7();
  }
})();
