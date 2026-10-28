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

// =========================================================================
// CHAPTER 7: 60FPS 3D INTERACTIVE REALIFICATION, ISOCLINE & CASCADE ENGINE
// =========================================================================

const CH7_3D_STYLE = `#ch7-3d-hud {

  position: fixed;

  right: 20px;

  bottom: 20px;

  width: 445px;

  background: linear-gradient(145deg, rgba(7, 10, 19, 0.96) 0%, rgba(14, 21, 38, 0.98) 100%);

  border: 1.5px solid rgba(255, 215, 0, 0.65);

  border-radius: 14px;

  padding: 10px 14px 12px 14px;

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



#ch7-3d-hud.spotlight {

  right: 50%;

  bottom: 50%;

  transform: translate(50%, 50%);

  width: min(920px, 95vw);

  border-color: #FFD700;

  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);

}



#ch7-3d-hud.minimized {

  width: 285px;

  padding: 7px 12px;

}



#ch7-3d-hud.minimized .ch7-hud-body {

  display: none;

}



.ch7-hud-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  border-bottom: 1px solid rgba(65, 105, 225, 0.45);

  padding-bottom: 6px;

  margin-bottom: 8px;

}



.ch7-hud-title {

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 0.7px;

  color: #FFD700;

  text-transform: uppercase;

  display: flex;

  align-items: center;

  gap: 7px;

}



.ch7-hud-controls {

  display: flex;

  gap: 5px;

}



.ch7-hud-btn {

  background: #172033;

  color: #cbd5e1;

  border: 1px solid #3b4963;

  border-radius: 5px;

  padding: 2px 8px;

  font-size: 10px;

  font-weight: 700;

  cursor: pointer;

  transition: all 0.15s ease;

}



.ch7-hud-btn:hover, .ch7-hud-btn.active {

  background: #FFD700;

  color: #000;

  border-color: #FFD700;

}



.ch7-canvas-wrap {

  position: relative;

  width: 100%;

  height: 265px;

  border-radius: 10px;

  overflow: hidden;

  border: 1px solid #2d3748;

  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);

  cursor: grab;

}



.ch7-canvas-wrap:active {

  cursor: grabbing;

}



#ch7-3d-hud.spotlight .ch7-canvas-wrap {

  height: 500px;

}



#ch7-3d-canvas {

  width: 100%;

  height: 100%;

  display: block;

}



.ch7-overlay-bar {

  position: absolute;

  top: 7px;

  left: 9px;

  right: 9px;

  display: flex;

  justify-content: space-between;

  pointer-events: none;

  font-family: "Libertinus Mono", monospace;

  font-size: 10px;

  gap: 6px;

}



.ch7-telemetry {

  background: rgba(6, 9, 17, 0.84);

  border: 1px solid rgba(65, 105, 225, 0.55);

  border-radius: 5px;

  padding: 2px 7px;

  color: #82aaff;

  white-space: nowrap;

}



#ch7-node-inspector {

  background: rgba(6, 9, 17, 0.88);

  border: 1px solid rgba(255, 215, 0, 0.6);

  border-radius: 5px;

  padding: 2px 8px;

  color: #FFD700;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

}



.ch7-scrubber {

  display: flex;

  align-items: center;

  gap: 8px;

  margin-top: 8px;

  font-size: 11px;

}



.ch7-scrubber input[type="range"] {

  flex: 1;

  accent-color: #FFD700;

  height: 5px;

  cursor: pointer;

}



#ch7-caption {

  margin-top: 6px;

  padding: 6px 9px;

  background: rgba(4, 7, 14, 0.9);

  border-left: 3px solid #20B2AA;

  border-radius: 5px;

  font-family: "Libertinus Mono", monospace;

  font-size: 10.5px;

  line-height: 1.38;

  color: #5eead4;

}



@media (max-width: 900px) {

  #ch7-3d-hud {

    right: 8px;

    bottom: 8px;

    width: calc(100vw - 16px);

    max-width: 385px;

  }

}`;

const CH7_3D_HTML = `
<div class="ch7-hud-header">

    <div class="ch7-hud-title">

      <span>📐 Ch 7 · 3D Quantitative Site Engine</span>

      <span id="ch7-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch7-hud-controls">

      <button class="ch7-hud-btn active" id="ch7-btn-orbit" onclick="toggleCh7Orbit()">⟳ Orbit</button>

      <button class="ch7-hud-btn" onclick="toggleCh7Spotlight()">⛶ Spotlight</button>

      <button class="ch7-hud-btn" id="ch7-btn-min" onclick="toggleCh7Minimize()">—</button>

    </div>

  </div>



  <div class="ch7-hud-body">

    <div class="ch7-canvas-wrap" id="ch7-canvas-wrap">

      <canvas id="ch7-3d-canvas"></canvas>

      <div class="ch7-overlay-bar">

        <div class="ch7-telemetry" id="ch7-telemetry">Coeff = [ℚ ⊆ ℝ ⊆ ℂ] | ℰ_quant</div>

        <div id="ch7-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch7-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <input type="range" id="ch7-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh7Stage(this.value)">

      <button class="ch7-hud-btn active" id="ch7-btn-sync" onclick="enableCh7Sync()">Auto-Sync</button>

    </div>



    <div id="ch7-caption">

      <b>Stage 1 (§7.1.1 — Anthropomorphic Pivot):</b> Regional Qualitätsaspekte (□_{S_i}) vs. Global Quantitätsaspekt over [ℚ ⊆ ℝ ⊆ ℂ].

    </div>

  </div>
`;

function injectCh73DHUD() {
  if (document.getElementById('ch7-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH7_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch7-3d-hud';
  hudEl.innerHTML = CH7_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch7_3d_engine_loaded) return;
  window.__ch7_3d_engine_loaded = true;

  function runCh7Engine() {
    injectCh73DHUD();
    if (window.__ch7_3d_engine_initialized) return;
    window.__ch7_3d_engine_initialized = true;

const canvas = document.getElementById('ch7-3d-canvas');

  const wrap = document.getElementById('ch7-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.48;

  let camPitch = 0.36;

  let camZoom = 1.0;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§7.1.1 — Anthropomorphic Pivot):</b> 5 regional Qualitätsaspekte (S_i) vs. global Quantitätsaspekt via Mengendialektik.",

    2: "<b>Stage 2 (§7.1.2 — SM-28 Quantitätssyntrix):</b> Semantic Iterator S_n ; ã = R_n &amp; Synkolatorraum M_syn = T^{⊗k}R_m (dim m + m^k).",

    3: "<b>Stage 3 (§7.2.1 — Def. 7.2 Realification Bundle (V)_ℝ):</b> Discrete ℚ^n lattice ⊂ ℝ^n continuum beneath complex phase fibers (ℂ^n)_ℝ ≅ ℝ^{2n}.",

    4: "<b>Stage 4 (§7.2.1 — Prop. 7.5 Pullbacks in Ctx_quant):</b> Cospan 𝕂_{V₁} ↪ 𝕂_U ↩ 𝕂_{V₂} meets at 𝕂_W = min(𝕂_{V₁}, 𝕂_{V₂}) on P^U ≅ ℝ^{3d(𝕂)n}.",

    5: "<b>Stage 5 (§7.2.1 — Thms. 7.7 &amp; 7.9 Topos ℰ_quant &amp; Dedekind Reals):</b> Geometric morphism π_quant : ℰ_quant → ℰ_syn &amp; located cut (L, U) ∈ ℝ_ℰ.",

    6: "<b>Stage 6 (§7.2.2 — Def. 7.12 Colored Tensor Operad 𝒪_quant):</b> Multilinear contraction X_{(m_i,k_i)} ⊗̂_π … → X_{(m,k)} &amp; isometric suboperad 𝒪_isom.",

    7: "<b>Stage 7 (§7.3.1 — Def. 7.13 Dimensional Functor S_n &amp; SO(n) Metropie):</b> Scaling matrix Λ = diag(λ_l) &amp; Killing–Cartan geodesic g_met(ż, ż).",

    8: "<b>Stage 8 (§7.3.2 — Def. 7.15 Isocline Foliation 𝔣_A &amp; Centers Z_α):</b> Regular level surfaces Σ_c = (ᵐĀ)⁻¹(c) around Morse–Bott Fehlstelle 0 ∈ Z_α.",

    9: "<b>Stage 9 (§7.3.3 — Def. 7.16 &amp; Prop. 7.17 Musical Pullback π_γ^⊛):</b> Unit frame A₀ (‖A₀‖=1) lifted across submanifolds via ♯_g ∘ π_γ* ∘ ♭_g.",

    10: "<b>Stage 10 (§7.3.3–7.6 — Thm. 7.19 Cascade Monomial Norm Bound):</b> Layered Strukturkaskade bounded by ‖A_γ‖_{C_b⁰} ≤ Γ_γ ‖A₀‖^{D_γ} (D_γ = ∏ r_j)!"

  };



  const STAGE_TELEMETRY = {

    1: "S_human = ⋃ S_i | Mengendialektik (= vs ≶)",

    2: "S_n ; ã = R_n (SM-28) | dim M_syn = m + m^k",

    3: "dim_ℝ((𝕂^n)_ℝ) = d(𝕂)n | J_ℂ² = −id",

    4: "P^U ≅ ℝ^{3d(𝕂_U)n_U} | 𝕂_W = 𝕂_{V₁} ∩ 𝕂_{V₂}",

    5: "π_quant* ⊣ π_quant* : ℰ_quant → ℰ_syn",

    6: "X_{(m,k)} = Γ_b⁰(R_m, T^{⊗k}R_m) | 𝒪_quant",

    7: "‖y‖_{R_n} = max_l λ_l‖y_l‖_𝕂 | g_met ≥ 0",

    8: "Σ_c = (ᵐĀ)⁻¹(c) ∩ R_m^reg | d(Φ∘A)_y = 0",

    9: "π_γ^⊛ = ♯_g^{⊗k} ∘ π_γ* ∘ ♭_g^{⊗k} | ‖A₀‖ = 1",

    10: "‖A_M‖_{C_b⁰} ≤ Γ_M ‖A₀‖_{C_b⁰}^{D_M} (Thm. 7.19)"

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



  // Stage 1: Anthropomorphic Pivot — 5 Regional Qualitätsaspekte vs Global Quantitätsaspekt

  function renderStage1(w, h) {

    const pHub = drawNode3D("Quant_Hub", 0, 0, 0.85, 11.5, "#FFD700", "#20B2AA", "Quantitätsaspekt [ℚ⊆ℝ⊆ℂ]", "Global Quantitative Unification via Mengendialektik (a = b vs. a ≶ b)", w, h);

    const quals = ["S₁ (Color)", "S₂ (Timbre)", "S₃ (Valence)", "S₄ (Tactile)", "S₅ (Normative)"];

    const cols  = ["#4169E1", "#20B2AA", "#FFA500", "#9370DB", "#ff6b81"];

    for (let i = 0; i < 5; i++) {

      const a = timeSec * 0.4 + (i / 5) * Math.PI * 2;

      const x = 1.25 * Math.cos(a), y = 1.25 * Math.sin(a), z = -0.75;

      const pQ = drawNode3D("Qual_" + i, x, y, z, 7.5, cols[i], "#fff", quals[i], `Regional Apodiktische Pluralität ${quals[i]} (Local necessity □_{S_${i+1}} only)`, w, h);

      drawLine3D(pQ, pHub, "rgba(255,215,0,0.55)", 2.0, [4, 3]);

    }

  }



  // Stage 2: Quantitätssyntrix (SM-28) & Synkolatorraum M_syn = T^{\otimes k}R_m (dim m + m^k)

  function renderStage2(w, h) {

    const pSing = drawNode3D("Sing_a", -1.25, 0, -0.85, 8, "#4169E1", "#fff", "ã = (a_i)_q", "Singularer Metrophor: Pure dimensionless constants in 𝕂^q (SM p. 125)", w, h);

    const pSem  = drawNode3D("Sem_Rn",  0.00, 0, -0.15, 9.5, "#20B2AA", "#FFD700", "R_n = S_n ; ã", "Semantischer Metrophor: Dimensioned parameter continuum via Iterator S_n (SM-28)", w, h);

    const pSynk = drawNode3D("Synk_M",  1.15, 0,  0.85, 11, "#FFD700", "#FFA500", "M_syn (dim m+m^k)", "Synkolatorraum Total Bundle T^{⊗k}R_m hosting Synkolationsfeld ᵐĀ", w, h);



    drawLine3D(pSing, pSem, "#20B2AA", 3.0);

    drawLine3D(pSem, pSynk, "#FFD700", 3.0);



    // C(n, m) coordinate selection rays fanning from R_n to M_syn

    for (let k = -2; k <= 2; k++) {

      const pMid = proj(0.55, k * 0.35, 0.35, w, h);

      drawLine3D(pSem, pMid, "rgba(255,165,0,0.45)", 1.5);

      drawLine3D(pMid, pSynk, "rgba(255,215,0,0.45)", 1.5);

    }

  }



  // Stage 3: 3D Realification Bundle (V)_R over Q^n \subset R^n with C^n Phase Circles (Def. 7.2)

  function renderStage3(w, h) {

    // Base Continuum Plane R^2 & Discrete Rational Lattice Q^2 at z = -0.85

    for (let ix = -1; ix <= 1; ix++) {

      for (let iy = -1; iy <= 1; iy++) {

        const gx = ix * 0.95, gy = iy * 0.85;

        const pLat = drawNode3D(

          `Q_${ix}_${iy}`, gx, gy, -0.85, 5, "#4169E1", "#fff",

          (ix === 0 && iy === 0) ? "ℚ^n ⊂ ℝ^n" : "",

          `Rational Lattice Node (${ix},${iy}) ∈ ℚ² embedded in Realified Continuum (ℝ²)_ℝ`, w, h

        );

        // Above each node, a Complex Phase Circle (\mathbb{C})_{\mathbb{R}} \cong \mathbb{R}^2 driven by J_{\mathbb{C}}

        if (Math.abs(ix) + Math.abs(iy) <= 1) {

          const cz = 0.45;

          ctx.beginPath();

          ctx.strokeStyle = "#FFD700";

          ctx.lineWidth = 2.0;

          for (let s = 0; s <= 28; s++) {

            const a = (s / 28) * Math.PI * 2;

            const pC = proj(gx + 0.32 * Math.cos(a), gy + 0.32 * Math.sin(a), cz, w, h);

            if (s === 0) ctx.moveTo(pC.sx, pC.sy); else ctx.lineTo(pC.sx, pC.sy);

          }

          ctx.stroke();

          drawLine3D(pLat, proj(gx, gy, cz, w, h), "rgba(32,178,170,0.55)", 1.6, [3, 2]);

          const rotA = timeSec * 2.2 + ix + iy;

          drawNode3D(

            `C_fib_${ix}_${iy}`, gx + 0.32 * Math.cos(rotA), gy + 0.32 * Math.sin(rotA), cz,

            5.5, "#FFD700", "#000", (ix === 0 && iy === 0) ? "J_ℂ (d(ℂ)=2)" : "",

            "Realified Complex Fiber (ℂ)_ℝ ≅ ℝ²: ρ_ℂ(i) = J_ℂ with J_ℂ² = −id, ‖J_ℂ‖_op = 1", w, h

          );

        }

      }

    }

  }



  // Stage 4 & 5: Pullbacks in Ctx_quant, Geometric Morphism \pi_{quant} & Internal Dedekind Cut (L, U)

  function renderStage4And5(w, h, st) {

    const isStage5 = (st >= 4.5);

    // Upper Ctx_quant / E_quant Pullback Diamond

    const pU  = drawNode3D("UQ",  0.0,  0.85, 0.75, 8.5, "#FFD700", "#fff", "U_Q (𝕂_U = ℂ)", "Target Quantitative Context U_Q with carrier P^U ≅ ℝ^{6n}", w, h);

    const pV1 = drawNode3D("V1Q", -1.1, 0.0,  0.75, 8,   "#20B2AA", "#fff", "V_{1,Q} (𝕂 = ℝ)", "Subcontext V_{1,Q} over ℝ", w, h);

    const pV2 = drawNode3D("V2Q",  1.1, 0.0,  0.75, 8,   "#FFA500", "#fff", "V_{2,Q} (𝕂 = ℚ)", "Subcontext V_{2,Q} over ℚ", w, h);

    const pW  = drawNode3D("WQ",   0.0, -0.85, 0.75, 9,  "#4169E1", "#FFD700", "W_Q (𝕂_W = min = ℚ)", "Pullback Context W_Q in Ctx_quant: 𝕂_W = 𝕂_{V₁} ∩ 𝕂_{V₂} = ℚ (Prop. 7.5)", w, h);

    drawLine3D(pW, pV1, "#4169E1", 2.4);

    drawLine3D(pW, pV2, "#4169E1", 2.4);

    drawLine3D(pV1, pU, "#20B2AA", 2.4);

    drawLine3D(pV2, pU, "#FFA500", 2.4);



    // Stage 5: Internal Dedekind Cut Axis (L, U) locating \sqrt{2} \in \mathbb{R}_{\mathcal{E}} at z = -0.85

    if (isStage5) {

      const pL = drawNode3D("Ded_L", -1.25, 0, -0.85, 7.5, "#20B2AA", "#fff", "Lower Cut L(q)", "Inhabited Downward-Closed Rational Subsheaf L ⊂ ℚ_ℰ (q < √2)", w, h);

      const pR = drawNode3D("Ded_U",  1.25, 0, -0.85, 7.5, "#FFA500", "#fff", "Upper Cut U(r)", "Inhabited Upward-Closed Rational Subsheaf U ⊂ ℚ_ℰ (r > √2)", w, h);

      const pCut = drawNode3D("Ded_Alpha", 0, 0, -0.85, 9.5, "#FFD700", "#DC143C", "α ∈ ℝ_ℰ (L(q) ∨ U(r))", "Internal Dedekind Real Object ℝ_ℰ in ℰ_quant (Def. 7.8, Thm. 7.9)", w, h);

      drawLine3D(pL, pCut, "#20B2AA", 3.2);

      drawLine3D(pCut, pR, "#FFA500", 3.2);

      drawLine3D(pW, pCut, "rgba(255,215,0,0.55)", 2.0, [4, 3]);

    }

  }



  // Stage 6: Colored Tensor Operad \mathcal{O}_{quant} & Isometric Suboperad \mathcal{O}_{isom} (Def. 7.12)

  function renderStage6(w, h) {

    const inputs = [

      { id: "In_1", x: -1.2, y: -0.7, z: -0.9, col: "#4169E1", lbl: "A₁ ∈ X_{(m₁,k₁)}" },

      { id: "In_2", x:  0.0, y:  0.9, z: -0.9, col: "#20B2AA", lbl: "A₂ ∈ X_{(m₂,k₂)}" },

      { id: "In_3", x:  1.2, y: -0.7, z: -0.9, col: "#FFA500", lbl: "A₃ ∈ X_{(m₃,k₃)}" }

    ];

    const pCorolla = drawNode3D("Op_f", 0, 0, 0.1, 10.5, "#9370DB", "#FFD700", "f ∈ 𝒪_quant (r=3)", "Bounded Multilinear Operator f on X₁ ⊗̂_π X₂ ⊗̂_π X₃ (G_m-Equivariant 𝒪_isom)", w, h);

    const pOut = drawNode3D("Out_A", 0, 0, 1.15, 11, "#FFD700", "#fff", "ᵐĀ = f(A₁,A₂,A₃) ∈ X_{(m,k)}", "Output Bounded Continuous Rank-k Tensor Section: ‖f(A₁,A₂,A₃)‖_{C_b⁰} ≤ ‖f‖ ∏ ‖A_i‖", w, h);



    inputs.forEach(inp => {

      const pIn = drawNode3D(inp.id, inp.x, inp.y, inp.z, 7.5, inp.col, "#fff", inp.lbl, `Bounded Continuous Tensor Field ${inp.lbl} = Γ_b⁰(R_{m_i}, T^{⊗k_i}R_{m_i})`, w, h);

      drawLine3D(pIn, pCorolla, inp.col, 2.5);

    });

    drawLine3D(pCorolla, pOut, "#FFD700", 3.4);

  }



  // Stage 7: Dimensional Parameter Functor S_n (\Lambda = diag(\lambda_l)) & SO(n) Metropie Geodesic

  function renderStage7(w, h) {

    // Anisotropic Weighted Norm Ellipsoid \Lambda = diag(\lambda_1, \lambda_2, \lambda_3)

    const rx = 1.35, ry = 0.85, rz = 0.65;

    for (let plane = 0; plane < 3; plane++) {

      ctx.beginPath();

      ctx.strokeStyle = plane === 0 ? "#4169E1" : (plane === 1 ? "#20B2AA" : "#FFA500");

      ctx.lineWidth = 2.0;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const x = plane === 2 ? 0 : rx * Math.cos(a);

        const y = plane === 0 ? ry * Math.sin(a) : (plane === 1 ? 0 : ry * Math.cos(a));

        const z = plane === 0 ? 0 : rz * Math.sin(a);

        const p = proj(x, y, z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    // Geodesic Metropie Trajectory z(t) = z^U \exp(t \Omega) on SO(n)

    const gAng = timeSec * 1.5;

    drawNode3D("Sn_Origin", 0, 0, 0, 9.5, "#FFD700", "#000", "S_n(𝕂, Λ) = R_n", "Dimensional Parameter Functor S_n : DimField_Λ → Ban_≤1 (‖y‖_{R_n} = max λ_l‖y_l‖)", w, h);

    drawNode3D("SO_Geod", rx * Math.cos(gAng), ry * Math.sin(gAng), 0, 7.5, "#DC143C", "#FFD700", "z(t) ∈ SO(n)", "Killing–Cartan Metropie Geodesic: g_met(ż, ż) = −½ tr((z⁻¹ż)²) ≥ 0 (Fig. 7.4)", w, h);

  }



  // Stage 8: Isocline Submersion Foliation \mathfrak{f}_A & Morse-Bott Field Center Z_\alpha (Def. 7.15)

  function renderStage8(w, h) {

    // Nested Isocline Level Rings \Sigma_c = ({}^m\bar{A})^{-1}(c) on Paraboloid \Phi(A) = y_1^2 + y_2^2

    [0.35, 0.72, 1.08, 1.42].forEach((rad, idx) => {

      const z = -0.95 + 0.85 * rad * rad;

      ctx.beginPath();

      ctx.strokeStyle = idx === 2 ? "#FFD700" : "#20B2AA";

      ctx.lineWidth = idx === 2 ? 2.8 : 1.8;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    });

    // Inward Gradient Flow Rays -\nabla \Phi toward Morse-Bott Center Z_\alpha = {0}

    for (let k = 0; k < 4; k++) {

      const a = (k / 4) * Math.PI * 2 + timeSec * 0.4;

      drawLine3D(proj(1.42 * Math.cos(a), 1.42 * Math.sin(a), 0.76, w, h), proj(0, 0, -0.95, w, h), "rgba(255,165,0,0.55)", 1.8, [4, 2]);

    }

    drawNode3D("Z_alpha", 0, 0, -0.95, 10, "#DC143C", "#FFD700", "Z_α = {0} (Feldzentrum)", "Morse–Bott Critical Submanifold Z(A, g_m, Φ) where d(Φ∘A)_y = 0 (Fehlstelle 0)", w, h);

    drawNode3D("Iso_Sig", 1.08, 0, -0.95 + 0.85 * 1.08 * 1.08, 7, "#FFD700", "#000", "Σ_c ∈ 𝔣_A", "Regular Codimension-d Isocline Submanifold Σ_c on R_m^reg (Def. 7.15)", w, h);

  }



  // Stage 9 & 10: Musical Pullbacks \pi_\gamma^\circledast & Layered Cascade Norm Bound (Thm. 7.19)

  function renderStage9And10(w, h, st) {

    const isStage10 = (st >= 9.5);

    const stages = [

      { g: 0, z: -1.10, r: 1.00, col: "#4169E1", lbl: "X₀: A₀ (‖A₀‖ = 1)" },

      { g: 1, z: -0.38, r: 0.85, col: "#20B2AA", lbl: "X₁: A₁ = f₁(A₀)" },

      { g: 2, z:  0.35, r: 0.68, col: "#FFA500", lbl: "X₂: A₂ = f₂(π₂^⊛ A₁)" },

      { g: 3, z:  1.10, r: 0.52, col: "#FFD700", lbl: "X_M: ‖A_M‖ ≤ Γ_M ‖A₀‖^{D_M}" }

    ];

    let prev = null;

    stages.forEach(s => {

      // Norm Bound Envelope Ring at Stage \gamma

      ctx.beginPath();

      ctx.strokeStyle = s.col;

      ctx.lineWidth = 2.0;

      for (let i = 0; i <= 36; i++) {

        const a = (i / 36) * Math.PI * 2;

        const p = proj(s.r * Math.cos(a), s.r * Math.sin(a), s.z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();



      const pNode = drawNode3D(

        "Casc_" + s.g, 0, 0, s.z, 8 + s.g * 0.8, s.col, "#fff", s.lbl,

        isStage10

          ? `Thm. 7.19 Monomial Bound: ‖A_${s.g}‖_{C_b⁰} ≤ Γ_${s.g} ‖A₀‖^{D_${s.g}} (D_γ = ∏ r_j)`

          : `Prop. 7.17 Contravariant Musical Pullback π_${s.g}^⊛ = ♯_g ∘ π* ∘ ♭_g`, w, h

      );

      if (prev) drawLine3D(prev, pNode, "#FFD700", 3.0);

      prev = pNode;

    });

  }



  // Master 60fps Loop

  function renderLoop() {

    timeSec += 0.016;

    curStage += (targetStage - curStage) * 0.14;

    if (autoOrbit && !isDragging) camYaw += 0.0055;



    const w = wrap.clientWidth, h = wrap.clientHeight;

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

    else if (stInt === 7) renderStage7(w, h);

    else if (stInt === 8) renderStage8(w, h);

    else renderStage9And10(w, h, curStage);



    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh7Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch7-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch7-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch7-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch7-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch7-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh7Stage = function(val) { window.setCh7Stage(val, true); };



  window.enableCh7Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch7-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh7WithDeck();

  };



  window.toggleCh7Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch7-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh7Spotlight = function() {

    const hud = document.getElementById('ch7-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh7Minimize = function() {

    const hud = document.getElementById('ch7-3d-hud');

    const b = document.getElementById('ch7-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



  function syncCh7WithDeck() {
    if (!autoSync) return;
    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const ch7Hud = document.getElementById('ch7-3d-hud');
    if (isMegaDeck && ch7Hud && window.Reveal && window.Reveal.getCurrentSlide) {
      const currentSlide = window.Reveal.getCurrentSlide();
      const inCh7 = currentSlide ? !!currentSlide.closest('#chapter-7, section[data-chapter="7"]') : true;
      ch7Hud.style.display = inCh7 ? '' : 'none';
      if (!inCh7) return;
    }
    const vp = document.querySelector('.reveal-viewport');

    const isScroll = vp && vp.classList.contains('reveal-scroll');

    if (isScroll) {

      const scEl = vp.scrollHeight > vp.clientHeight ? vp : document.documentElement;

      const top = vp.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;

      const max = Math.max(1, (scEl.scrollHeight || document.body.scrollHeight) - window.innerHeight);

      window.setCh7Stage(1.0 + Math.min(1, Math.max(0, top / max)) * 9.0, false);

    } else if (window.Reveal && typeof window.Reveal.getIndices === 'function') {

      const idx = window.Reveal.getIndices();

      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);

      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;

      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;

      window.setCh7Stage(1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0, false);

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

    const insp = document.getElementById('ch7-node-inspector');

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

    camZoom = Math.max(0.65, Math.min(1.65, camZoom - e.deltaY * 0.001));

  }, { passive: false });



  function init() {

    resize();

    syncCh7WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

    window.addEventListener('scroll', syncCh7WithDeck, { passive: true });

    const vp = document.querySelector('.reveal-viewport');

    if (vp) vp.addEventListener('scroll', syncCh7WithDeck, { passive: true });

    if (window.Reveal) {

      window.Reveal.on('ready', syncCh7WithDeck);

      window.Reveal.on('slidechanged', syncCh7WithDeck);

      window.Reveal.on('fragmentshown', syncCh7WithDeck);

      window.Reveal.on('fragmenthidden', syncCh7WithDeck);

    }

    const hud = document.getElementById('ch7-3d-hud');

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
    document.addEventListener('DOMContentLoaded', runCh7Engine);
  } else {
    runCh7Engine();
  }
})();
