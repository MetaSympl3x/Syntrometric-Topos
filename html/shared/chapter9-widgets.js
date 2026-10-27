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
  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    k = Math.min(k, n - k);
    let c = 1;
    for (let i = 0; i < k; i++) {
      c = Math.round((c * (n - i)) / (i + 1));
    }
    return c;
  }

  // WIDGET 1: §9.1.1 Sieve-State Partition (SM-59, SM-59a) & Cascade Combinatorics (SM-60)
  window.ch9_updateSieveCascade = function() {
    const elOmega = document.getElementById('ch9-sieve-omega');
    if (!elOmega) return;
    const omega = parseInt(elOmega.value, 10);
    const n = 2 * omega;
    const omega1El = document.getElementById('ch9-sieve-w1');
    omega1El.max = Math.max(1, n - 1);
    const omega1 = Math.min(parseInt(omega1El.value, 10), n - 1);
    omega1El.value = omega1;

    document.getElementById('ch9-sieve-omega-val').innerText = `n=${n} (ω=${omega})`;
    document.getElementById('ch9-sieve-w1-val').innerText = omega1;

    const zPlus = 2 * (Math.pow(3, omega) - Math.pow(2, omega) + 1);
    const L1 = binom(n, omega1);
    const rankFilteredL2 = Math.max(1, Math.round(L1 / 2));

    let terms = [];
    for (let p = 0; p < omega; p++) {
      const sieveCount = Math.pow(2, omega - p) - 1;
      const b = binom(omega, p);
      terms.push(`p=${p}: (${sieveCount})·C(${omega},${p})=${sieveCount * b}`);
    }

    const svg = document.getElementById('ch9-sieve-svg');
    if (svg) {
      const showB = Math.min(L1, 6);
      const showM = Math.min(rankFilteredL2, 3);
      let html = `<rect x="4" y="4" width="232" height="112" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      let bCoords = [];
      for (let i = 0; i < showB; i++) {
        let bx = 26 + (i * 188) / Math.max(1, showB - 1);
        if (showB === 1) bx = 120;
        bCoords.push(bx);
      }
      let mCoords = [];
      for (let j = 0; j < showM; j++) {
        let mx = 55 + (j * 130) / Math.max(1, showM - 1);
        if (showM === 1) mx = 120;
        mCoords.push(mx);
      }
      bCoords.forEach(bx => {
        mCoords.forEach(mx => {
          html += `<line x1="${bx}" y1="92" x2="${mx}" y2="56" stroke="rgba(65,105,225,0.45)" stroke-width="1.3"/>`;
        });
      });
      mCoords.forEach(mx => {
        html += `<line x1="${mx}" y1="56" x2="120" y2="20" stroke="#20B2AA" stroke-width="1.8"/>`;
      });
      bCoords.forEach((bx, idx) => {
        html += `<rect x="${bx - 12}" y="84" width="24" height="16" rx="3" fill="#151c2c" stroke="#4169E1" stroke-width="1.4"/>`;
        html += `<text x="${bx}" y="95" fill="#93c5fd" font-size="7.5" text-anchor="middle">g⁽¹⁾_${idx + 1}</text>`;
      });
      mCoords.forEach((mx, idx) => {
        html += `<rect x="${mx - 14}" y="48" width="28" height="16" rx="3" fill="#0f292a" stroke="#20B2AA" stroke-width="1.4"/>`;
        html += `<text x="${mx}" y="59" fill="#5eead4" font-size="7.5" text-anchor="middle">κ_α T_α</text>`;
      });
      html += `<rect x="78" y="10" width="84" height="18" rx="4" fill="#2e1f0f" stroke="#FFD700" stroke-width="1.8"/>`;
      html += `<text x="120" y="22" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">Apex ²ḡ_∞ (L_M=1)</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-sieve-readout');
    if (box) {
      box.innerHTML =
        `<b>Prop. 9.1 Closed-Form Sieve Partition (SM-59, 59a):</b> Z₊ = 2(3^${omega} − 2^${omega} + 1) = <b style="color:#FFD700;">${zPlus}</b> states ` +
        `<span style="color:#94a3b8;">[${terms.join(', ')}]</span><br>` +
        `<b>Kaskadenbasis (α=1, SM-60):</b> L₁ = C(${n}, ${omega1}) = <b style="color:#5eead4;">${L1}</b> basal partial metrics ²ḡ⁽¹⁾_(γ₁) ⟶ Rank-filtered tier L_α = <b>${rankFilteredL2}</b> ⟶ <b>Apex L_M = 1</b>.`;
    }
  };

  // WIDGET 2: §9.2.1 Mixed-Variant Covariant Derivative & Transposition Identity
  window.ch9_updateTransposedTransport = function() {
    const elCurl = document.getElementById('ch9-trans-curl');
    if (!elCurl) return;
    const curl = parseFloat(elCurl.value);
    const amp = parseFloat(document.getElementById('ch9-trans-amp').value);
    const mu = parseInt(document.getElementById('ch9-trans-mu').value, 10);

    document.getElementById('ch9-trans-curl-val').innerText = curl.toFixed(2);
    document.getElementById('ch9-trans-amp-val').innerText = amp.toFixed(2);
    document.getElementById('ch9-trans-mu-val').innerText = `(${mu}, ${4 - mu})`;

    const skewGamma = amp > 0.01 ? curl / amp : 0.0;
    const svg = document.getElementById('ch9-trans-svg');
    if (svg) {
      let html = `<rect x="5" y="5" width="220" height="105" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      const cx = 115, cy = 58;
      const r = 18 + Math.abs(curl) * 18;
      const col = Math.abs(curl) < 0.05 ? "#4169E1" : "#FFA500";
      html += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none" stroke="${col}" stroke-width="2" stroke-dasharray="${Math.abs(curl) < 0.05 ? '4,3' : 'none'}"/>`;
      for (let k = 0; k < 6; k++) {
        const ang = (k / 6) * 2 * Math.PI;
        const x1 = cx + r * Math.cos(ang);
        const y1 = cy + r * Math.sin(ang);
        const tx = -Math.sin(ang) * curl * 14;
        const ty = Math.cos(ang) * curl * 14;
        html += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${(x1 + tx).toFixed(1)}" y2="${(y1 + ty).toFixed(1)}" stroke="#20B2AA" stroke-width="2.2"/>`;
        html += `<circle cx="${(x1 + tx).toFixed(1)}" cy="${(y1 + ty).toFixed(1)}" r="2.8" fill="#FFD700"/>`;
      }
      html += `<text x="${cx}" y="${cy + 3}" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">2 T^s_ik = ${skewGamma.toFixed(2)}</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-trans-readout');
    if (box) {
      const statusStr = (Math.abs(curl) > 0.05 && amp > 0.1)
        ? `<span style="color:#20B2AA;"><b>Non-vanishing Curl &amp; Non-degenerate A_s:</b> Skew connection 2A_s Γ^s_[ik] = ${curl.toFixed(2)} ≠ 0 certified!</span>`
        : `<span style="color:#FFA500;"><b>Epistemic Firewall Caveat (Rem. 9.2):</b> Vanishing curl or degenerate A_s leaves skew connection undetermined without extra premise.</span>`;
      box.innerHTML =
        `<b>Valence (μ=${mu} cov, ${4 - mu} contra):</b> Eq. (9.5) has <b>${mu}</b> negative Christoffel terms &amp; <b>${4 - mu}</b> positive terms.<br>` +
        `<b>Transposed Identity Eq. (9.6):</b> ∂_k A_i − ∂_i A_k = <b>${curl.toFixed(2)}</b> = A_s({s/ik} − {s/ki}) ⇒ Implied skew torsion Γ^s_[ik] ≈ <b style="color:#FFD700;">${(0.5 * skewGamma).toFixed(3)}</b>. ${statusStr}`;
    }
  };

  // WIDGET 3: §9.2.2 36-Component Hermetry Matrix Switchboard & 4D Magnetic Vorticity Toy Model
  let currentHermetryBlock = 'all';
  window.ch9_selectHermetryBlock = function(blockId) {
    currentHermetryBlock = blockId;
    window.ch9_updateHermetryMatrix();
  };

  window.ch9_updateHermetryMatrix = function() {
    const elB = document.getElementById('ch9-herm-b');
    if (!elB) return;
    const B = parseFloat(elB.value);
    document.getElementById('ch9-herm-b-val').innerText = B.toFixed(2);

    const svg = document.getElementById('ch9-herm-svg');
    if (svg) {
      let html = '';
      const cellW = 32, cellH = 19, offX = 16, offY = 8;
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
          const isSym = c >= r;
          const inR4 = r < 4 && c < 4;
          const inS2 = r >= 4 && c >= 4;
          let channel = '';
          let fill = '#1e293b', stroke = '#475569', lbl = '';
          if (inR4 && isSym) { channel = 'grav'; fill = 'rgba(65,105,225,0.38)'; stroke = '#4169E1'; lbl = 'g_μν'; }
          else if (inR4 && !isSym) { channel = 'em'; fill = 'rgba(32,178,170,0.38)'; stroke = '#20B2AA'; lbl = 'F_μν'; }
          else if (!inR4 && !inS2 && isSym) { channel = 'kk'; fill = 'rgba(255,165,0,0.35)'; stroke = '#FFA500'; lbl = 'KK+'; }
          else if (!inR4 && !inS2 && !isSym) { channel = 'tors'; fill = 'rgba(220,20,60,0.35)'; stroke = '#DC143C'; lbl = 'Tor-'; }
          else if (inS2 && isSym) { channel = 'meso'; fill = 'rgba(147,112,219,0.38)'; stroke = '#9370DB'; lbl = 'S₂+'; }
          else { channel = 'ent'; fill = 'rgba(255,215,0,0.38)'; stroke = '#FFD700'; lbl = '[∂₅∂₆]'; }

          const active = (currentHermetryBlock === 'all' || currentHermetryBlock === channel ||
            (currentHermetryBlock === 'sym21' && isSym) || (currentHermetryBlock === 'skew15' && !isSym));
          const op = active ? '1.0' : '0.20';
          const x = offX + c * cellW, y = offY + r * cellH;
          html += `<g class="ch9-grid-cell" opacity="${op}" onclick="ch9_selectHermetryBlock('${channel}')">`;
          html += `<rect x="${x}" y="${y}" width="${cellW - 2}" height="${cellH - 2}" rx="2.5" fill="${fill}" stroke="${stroke}" stroke-width="${active ? 1.5 : 0.7}"/>`;
          html += `<text x="${x + (cellW - 2) / 2}" y="${y + 12}" fill="#e2e8f0" font-size="6.8" font-family="monospace" text-anchor="middle">${lbl}</text>`;
          html += `</g>`;
        }
      }
      svg.innerHTML = html;
    }

    const det4 = -(1 + B * B);
    const gxxInv = (1 / (1 + B * B)).toFixed(3);
    const gxyInv = (-B / (1 + B * B)).toFixed(3);

    const descMap = {
      all: '<b>All 36 Components (R₆ = R₄ × S₂):</b> 21 Symmetric (²ḡ₊) + 15 Skew-Symmetric (²ḡ₋) — complete Ontic Structural Realism switchboard.',
      sym21: '<b>21 Symmetric Potentials (²ḡ₊):</b> 10 Spacetime Gravity g_μν (R₄) + 8 Kaluza–Klein (R₄×S₂) + 3 Mesobaric Scalars (S₂).',
      skew15: '<b>15 Skew-Symmetric Potentials (²ḡ₋):</b> 6 Maxwell Vorticity F_μν (R₄) + 8 Chiral Spin-Torsion (R₄×S₂) + 1 Entelechial Commutator [∂₅,∂₆] (S₂).',
      grav: '<b>10 Spacetime Metric Potentials g_μν (R₄ × R₄, Symmetric):</b> Einsteinian Riemannian curvature and gravitational acceleration.',
      em: '<b>6 Electromagnetic Vorticity Components F_μν (R₄ × R₄, Skew):</b> Maxwell field-strength tensor embedded as metric skew-symmetry.',
      kk: '<b>8 Kaluza–Klein Gravito-EM Potentials (R₄ × S₂, Symmetric):</b> Cross-dimensional meso-field gauge couplings.',
      tors: '<b>8 Chiral Spin-Torsion Potentials (R₄ × S₂, Skew):</b> Rotational momentum and inertial mass-flux couplings.',
      meso: '<b>3 Mesobaric Scalars (S₂ × S₂, Symmetric):</b> Internal organizational plane metric potentials on S₂.',
      ent: '<b>1 Entelechial Commutator [∂₅, ∂₆] (S₂ × S₂, Skew):</b> Non-commuting aeonic-entelechial evolutionary sector.'
    };

    const box = document.getElementById('ch9-herm-readout');
    if (box) {
      box.innerHTML =
        `${descMap[currentHermetryBlock] || descMap.all}<br>` +
        `<b>4D Maxwell Vorticity Toy Metric (F_xy = B = ${B.toFixed(2)}):</b> det(²ḡ) = −(1 + B²) = <b style="color:#FFD700;">${det4.toFixed(3)}</b> | Right-Inverse g^xx = g^yy = <b>${gxxInv}</b>, g^xy = −g^yx = <b style="color:#20B2AA;">${gxyInv}</b>.`;
    }
  };

  // WIDGET 4: §9.3.1 Palatini Cross-Metric Coupling Tensor Q_(μγ) (Theorem 9.6, SM-53)
  window.ch9_updateCouplingQ = function() {
    const elAniso = document.getElementById('ch9-q-aniso');
    if (!elAniso) return;
    const aniso = parseFloat(elAniso.value);
    const angleDeg = parseFloat(document.getElementById('ch9-q-angle').value);
    document.getElementById('ch9-q-aniso-val').innerText = aniso.toFixed(2);
    document.getElementById('ch9-q-angle-val').innerText = angleDeg.toFixed(0) + '°';

    const theta = (angleDeg * Math.PI) / 180.0;
    // Construct two 2x2 partial metrics g_(1), g_(2) (omega = 2 model) with homothety at aniso=0, angle=0
    const g1_xx = 1 + aniso * Math.cos(theta), g1_xy = 0.5 * aniso * Math.sin(theta), g1_yy = 1 - 0.5 * aniso * Math.cos(theta);
    const g2_xx = 1 - aniso * Math.cos(theta), g2_xy = -0.5 * aniso * Math.sin(theta), g2_yy = 1 + 0.5 * aniso * Math.cos(theta);
    const g_xx = g1_xx + g2_xx, g_xy = g1_xy + g2_xy, g_yy = g1_yy + g2_yy;
    const detG = g_xx * g_yy - g_xy * g_xy;
    const gInv_xx = g_yy / detG, gInv_xy = -g_xy / detG, gInv_yy = g_xx / detG;

    // Q_(1)m^i = g^{is} g_{(1)sm} - (1/2) delta^i_m
    const q11 = gInv_xx * g1_xx + gInv_xy * g1_xy - 0.5;
    const q12 = gInv_xx * g1_xy + gInv_xy * g1_yy;
    const q21 = gInv_xy * g1_xx + gInv_yy * g1_xy;
    const q22 = gInv_xy * g1_xy + gInv_yy * g1_yy - 0.5;
    const frobQ = Math.sqrt(q11 * q11 + q12 * q12 + q21 * q21 + q22 * q22);

    const svg = document.getElementById('ch9-q-svg');
    if (svg) {
      const rx1 = 26 * (1 + 0.35 * aniso), ry1 = 26 * (1 - 0.25 * aniso);
      const rx2 = 26 * (1 - 0.25 * aniso), ry2 = 26 * (1 + 0.35 * aniso);
      let html = `<rect x="4" y="4" width="222" height="106" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      html += `<g transform="translate(115,57)">`;
      html += `<ellipse cx="0" cy="0" rx="26" ry="26" fill="none" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="3,3"/>`;
      html += `<ellipse cx="0" cy="0" rx="${rx1.toFixed(1)}" ry="${ry1.toFixed(1)}" transform="rotate(${(angleDeg / 2).toFixed(1)})" fill="rgba(65,105,225,0.20)" stroke="#4169E1" stroke-width="2"/>`;
      html += `<ellipse cx="0" cy="0" rx="${rx2.toFixed(1)}" ry="${ry2.toFixed(1)}" transform="rotate(${(-angleDeg / 2).toFixed(1)})" fill="rgba(32,178,170,0.20)" stroke="#20B2AA" stroke-width="2"/>`;
      html += `</g>`;
      html += `<text x="115" y="18" fill="#cbd5e1" font-size="8" text-anchor="middle">g₍₁₎ (Blue) vs. g₍₂₎ (Teal) vs. Homothety g/ω (Gold)</text>`;
      html += `<text x="115" y="103" fill="${frobQ < 0.005 ? '#20B2AA' : '#FFA500'}" font-size="8.5" font-weight="bold" text-anchor="middle">‖Q_(μγ)‖_F = ${frobQ.toFixed(4)}</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-q-readout');
    if (box) {
      const stateMsg = frobQ < 0.005
        ? `<span style="color:#20B2AA;"><b>HOMOTHETY DECOUPLED (g_(μ) = g/ω):</b> Koppelungstensor Q_(μγ) ≡ 0 — zero cross-metric force!</span>`
        : `<span style="color:#FFA500;"><b>ACTIVE STRUKTURASSOZIATION (g_(μ) ≠ g/ω):</b> Non-linear commutator coupling Q_(μγ) ≠ 0 generates cross-metric forces!</span>`;
      box.innerHTML =
        `<b>Thm. 9.6 Koppelungstensor Matrix Q¹_m (SM-53):</b> [[${q11.toFixed(3)}, ${q12.toFixed(3)}], [${q21.toFixed(3)}, ${q22.toFixed(3)}]] | Frobenius Norm ‖Q‖_F = <b style="color:#FFD700;">${frobQ.toFixed(4)}</b><br>${stateMsg}`;
    }
  };

  // WIDGET 5: §9.3.1b Contortion Tensor K^i_kl & Chiral Parallel Transport Streamlines
  window.ch9_updateContortionStreamlines = function() {
    const elTors = document.getElementById('ch9-cont-tors');
    if (!elTors) return;
    const T0 = parseFloat(elTors.value);
    const sDist = parseFloat(document.getElementById('ch9-cont-s').value);
    document.getElementById('ch9-cont-tors-val').innerText = T0.toFixed(2);
    document.getElementById('ch9-cont-s-val').innerText = sDist.toFixed(2);

    const rotAngleDeg = (T0 * sDist * 90) / Math.PI;
    const curvQuad = 0.5 * T0 * T0;

    const svg = document.getElementById('ch9-cont-svg');
    if (svg) {
      let html = `<rect x="4" y="4" width="222" height="106" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      html += `<line x1="18" y1="78" x2="210" y2="78" stroke="#4169E1" stroke-width="2.2"/>`;
      let pathPts = [];
      for (let i = 0; i <= 36; i++) {
        const u = i / 36.0;
        const x = 18 + u * 192;
        const phi = u * sDist * T0 * 2.2;
        const y = 78 - (28 * Math.cos(phi) + 10 * Math.sin(phi));
        pathPts.push((i === 0 ? 'M ' : 'L ') + x.toFixed(1) + ',' + y.toFixed(1));
      }
      html += `<path d="${pathPts.join(' ')}" fill="none" stroke="#FFA500" stroke-width="1.8"/>`;
      for (let k = 0; k <= 6; k++) {
        const u = k / 6.0;
        const x = 18 + u * 192;
        // Symmetric Levi-Civita dashed arrow
        html += `<line x1="${x.toFixed(1)}" y1="78" x2="${x.toFixed(1)}" y2="48" stroke="rgba(65,105,225,0.55)" stroke-width="1.3" stroke-dasharray="2,2"/>`;
        // Contortion rotated arrow
        const phi = u * sDist * T0 * 2.2;
        const vx = x - 12 * Math.sin(phi);
        const vy = 78 - (28 * Math.cos(phi) + 10 * Math.sin(phi));
        html += `<line x1="${x.toFixed(1)}" y1="78" x2="${vx.toFixed(1)}" y2="${vy.toFixed(1)}" stroke="#20B2AA" stroke-width="2.1"/>`;
        html += `<circle cx="${vx.toFixed(1)}" cy="${vy.toFixed(1)}" r="2.6" fill="#FFD700"/>`;
      }
      html += `<text x="115" y="18" fill="#cbd5e1" font-size="7.8" text-anchor="middle">Dashed Blue: Levi-Civita (K=0) | Teal/Orange: Contortion Transport</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-cont-readout');
    if (box) {
      box.innerHTML =
        `<b>Def. 9.13 Contortion K_ikl = ½(T_ikl + T_lik − T_kli):</b> For torsion amplitude T₀ = <b>${T0.toFixed(2)}</b> over s = <b>${sDist.toFixed(2)}</b>, chiral frame rotation Δθ = <b style="color:#FFD700;">${rotAngleDeg.toFixed(1)}°</b>.<br>` +
        `<b>Curvature Difference (Rem.):</b> Quadratic contortion contribution ‖K ★ K‖ ≈ <b style="color:#20B2AA;">${curvQuad.toFixed(3)}</b> ` +
        (T0 === 0 ? `<span style="color:#93c5fd;">(²ḡ₋ = 0 ⇒ Standard Torsion-Free Levi-Civita Recovered!)</span>` : '');
    }
  };

  // WIDGET 6: §9.3.1d Metric Density Divergence & (n-2) Density Theorem (SM-46, SM-46a)
  window.ch9_updateDensityTheorem = function() {
    const elN = document.getElementById('ch9-dens-n');
    if (!elN) return;
    const n = parseInt(elN.value, 10);
    const lw = parseFloat(document.getElementById('ch9-dens-lw').value);
    const torsTr = parseFloat(document.getElementById('ch9-dens-tors').value);

    document.getElementById('ch9-dens-n-val').innerText = `n = ${n}`;
    document.getElementById('ch9-dens-lw-val').innerText = lw.toFixed(2);
    document.getElementById('ch9-dens-tors-val').innerText = torsTr.toFixed(2);

    const rhs = (n - 2) * lw;
    const svg = document.getElementById('ch9-dens-svg');
    if (svg) {
      const dims = [2, 4, 6, 8, 10, 12];
      let html = `<rect x="4" y="4" width="222" height="106" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      html += `<line x1="20" y1="88" x2="212" y2="88" stroke="#64748b" stroke-width="1.2"/>`;
      dims.forEach((d, idx) => {
        const val = (d - 2) * lw;
        const barH = Math.min(62, Math.abs(val) * 4.2);
        const bx = 28 + idx * 30;
        const by = 88 - barH;
        const isSel = d === n;
        const fill = isSel ? '#FFD700' : (d === 6 ? '#20B2AA' : '#4169E1');
        html += `<rect x="${bx}" y="${by.toFixed(1)}" width="18" height="${Math.max(2, barH).toFixed(1)}" rx="2" fill="${fill}" opacity="${isSel ? 1.0 : 0.65}"/>`;
        html += `<text x="${bx + 9}" y="100" fill="${isSel ? '#FFD700' : '#cbd5e1'}" font-size="7.5" font-weight="${isSel ? 'bold' : 'normal'}" text-anchor="middle">n=${d}</text>`;
        html += `<text x="${bx + 9}" y="${(by - 3).toFixed(1)}" fill="#e2e8f0" font-size="7" text-anchor="middle">${(d - 2)}⌞w</text>`;
      });
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-dens-readout');
    if (box) {
      let dimNote = n === 2 ? 'Vanishes identically in 2D conformal geometry (n−2 = 0)!'
        : (n === 4 ? 'Evaluates to 2 ⌞_l w in 4D Einsteinian spacetime (R₄).'
        : (n === 6 ? 'Evaluates to 4 ⌞_l w in the 6D physical Hermetry condensation space (R₆ = R₄ × S₂)!'
        : `Evaluates to ${n - 2} ⌞_l w in dimension n = ${n}.`));
      box.innerHTML =
        `<b>Thm. 9.10 (2) The (n−2) Density Identity (SM-46a):</b> g_ik ⌞⁽¹'²⁾_(+),l g̲^ik = (${n} − 2)·(${lw.toFixed(2)}) = <b style="color:#FFD700;">${rhs.toFixed(2)}</b> — <span style="color:#5eead4;">${dimNote}</span><br>` +
        `<b>Thm. 9.10 (1) Divergence Splitting (SM-46):</b> Antisymmetric difference sp ⌞⁽¹⁾ − sp ⌞⁽²⁾ = 2 A̲^k {s/sk}₋ = <b style="color:#FFA500;">${(2 * torsTr).toFixed(2)}</b>.`;
    }
  };

  // WIDGET 7: §9.3.2 DeTurck Parabolic Smoothing & Sobolev H^s Banach Contraction (Thm. 9.14)
  window.ch9_updateSobolevContraction = function() {
    const elTau = document.getElementById('ch9-sob-tau');
    if (!elTau) return;
    const tauM = parseFloat(elTau.value);
    const cGeom = parseFloat(document.getElementById('ch9-sob-cgeom').value);
    const c0 = parseFloat(document.getElementById('ch9-sob-c0').value);

    document.getElementById('ch9-sob-tau-val').innerText = tauM.toFixed(2);
    document.getElementById('ch9-sob-cgeom-val').innerText = cGeom.toFixed(1);
    document.getElementById('ch9-sob-c0-val').innerText = c0.toFixed(2);

    const kM = (cGeom * Math.exp(-c0 * tauM)) / tauM;
    const isContractive = kM < 1.0;

    const svg = document.getElementById('ch9-sob-svg');
    if (svg) {
      let html = `<rect x="4" y="4" width="222" height="106" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      html += `<line x1="24" y1="90" x2="212" y2="90" stroke="#64748b" stroke-width="1.2"/>`;
      html += `<line x1="24" y1="16" x2="24" y2="90" stroke="#64748b" stroke-width="1.2"/>`;
      let pts = [];
      for (let m = 0; m <= 8; m++) {
        const dist = Math.min(1.3, Math.pow(kM, m));
        const px = 24 + (m / 8.0) * 184;
        const py = 90 - (dist / 1.3) * 68;
        pts.push((m === 0 ? 'M ' : 'L ') + px.toFixed(1) + ',' + py.toFixed(1));
      }
      const strokeCol = isContractive ? '#20B2AA' : '#DC143C';
      html += `<path d="${pts.join(' ')}" fill="none" stroke="${strokeCol}" stroke-width="2.4"/>`;
      for (let m = 0; m <= 8; m++) {
        const dist = Math.min(1.3, Math.pow(kM, m));
        const px = 24 + (m / 8.0) * 184;
        const py = 90 - (dist / 1.3) * 68;
        html += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.2" fill="#FFD700"/>`;
      }
      html += `<text x="118" y="18" fill="${strokeCol}" font-size="8.2" font-weight="bold" text-anchor="middle">k_M = ${kM.toFixed(3)} ${isContractive ? '< 1 (Banach Contraction!)' : '≥ 1 (Increase τ_M!)'}</text>`;
      html += `<text x="118" y="103" fill="#94a3b8" font-size="7.5" text-anchor="middle">Cascade Iteration m = 0 … 8 ⟶ ‖g⁽ᵐ⁾ − ²ḡ_∞‖_{H^s}</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-sob-readout');
    if (box) {
      const err5 = Math.pow(kM, 5);
      box.innerHTML =
        `<b>Thm. 9.14 Contraction Modulus:</b> k_M = C_heat C_geom (e^{−c₀ τ_M} / τ_M) = <b style="color:${isContractive ? '#20B2AA' : '#ff6b81'};">${kM.toFixed(4)}</b> ` +
        (isContractive
          ? `⇒ <b>Strict Banach Contraction on B_{H^s}(ḡ, δ)!</b> Error after m=5 tiers: k_M⁵ = <b style="color:#FFD700;">${err5.toExponential(2)}</b>; elliptic bootstrap ⇒ <b>²ḡ_∞ ∈ C^∞(𝓜)</b>.`
          : `⇒ <b>Insufficient Parabolic Smoothing (k_M ≥ 1):</b> Increase cascade depth parameter τ_M ≥ τ_M* to damp high-frequency curvature!`);
    }
  };

  // WIDGET 8: §9.3.3 Übergangskriterium (SM-64) & Geodesic Singularity Fracture (Thm. 9.17)
  window.ch9_updateTransitionCriterion = function() {
    const elGrad = document.getElementById('ch9-tr-grad');
    if (!elGrad) return;
    const gradRatio = parseFloat(elGrad.value); // ||grad g|| * sqrt(tau)
    const chi = parseFloat(document.getElementById('ch9-tr-chi').value);
    document.getElementById('ch9-tr-grad-val').innerText = gradRatio.toFixed(2) + ' / √τ';
    document.getElementById('ch9-tr-chi-val').innerText = chi.toFixed(2);

    const critDet = 1.0 / (chi * chi); // since chi * sqrt(|g_(p)|) = 1 => |g_(p)| = 1/chi^2
    const fractured = gradRatio >= 1.0;

    const svg = document.getElementById('ch9-tr-svg');
    if (svg) {
      let html = `<rect x="4" y="4" width="222" height="106" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      // Draw transition wall at x = 122
      html += `<line x1="122" y1="10" x2="122" y2="100" stroke="#DC143C" stroke-width="2" stroke-dasharray="4,2"/>`;
      html += `<text x="122" y="18" fill="#ff6b81" font-size="7.5" font-weight="bold" text-anchor="middle">χ√|g_(p)| = 1</text>`;

      // Left half: smooth curve
      let smoothPts = [];
      for (let i = 0; i <= 25; i++) {
        const u = i / 25.0;
        const x = 14 + u * 108;
        const y = 78 - 42 * Math.sin(0.5 * Math.PI * u);
        smoothPts.push((i === 0 ? 'M ' : 'L ') + x.toFixed(1) + ',' + y.toFixed(1));
      }
      html += `<path d="${smoothPts.join(' ')}" fill="none" stroke="#4169E1" stroke-width="2.4"/>`;

      if (!fractured) {
        let rightPts = [];
        for (let i = 0; i <= 25; i++) {
          const u = i / 25.0;
          const x = 122 + u * 92;
          const y = 36 + 38 * Math.sin(0.5 * Math.PI * u);
          rightPts.push((i === 0 ? 'M ' : 'L ') + x.toFixed(1) + ',' + y.toFixed(1));
        }
        html += `<path d="${rightPts.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2.4"/>`;
        html += `<text x="168" y="96" fill="#20B2AA" font-size="7.8" font-weight="bold" text-anchor="middle">Smooth C² Continuum</text>`;
      } else {
        // Staircase discrete metronic lattice cells x_i = N_i alpha_i
        const steps = 6;
        let prevX = 122, prevY = 36;
        for (let k = 1; k <= steps; k++) {
          const u = k / steps;
          const nx = 122 + u * 92;
          const ny = 36 + 42 * u;
          html += `<line x1="${prevX.toFixed(1)}" y1="${prevY.toFixed(1)}" x2="${nx.toFixed(1)}" y2="${prevY.toFixed(1)}" stroke="#FFD700" stroke-width="2.2"/>`;
          html += `<line x1="${nx.toFixed(1)}" y1="${prevY.toFixed(1)}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#FFD700" stroke-width="2.2"/>`;
          html += `<circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="3" fill="#DC143C"/>`;
          prevX = nx; prevY = ny;
        }
        html += `<text x="168" y="96" fill="#FFD700" font-size="7.8" font-weight="bold" text-anchor="middle">Metronic Lattice 𝕄_τ^n (x_i = N_i α_i)</text>`;
      }
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch9-tr-readout');
    if (box) {
      box.innerHTML =
        `<b>Def. 9.16 Übergangskriterium (SM-64):</b> χ√|g_(p)| = 1 with χ = <b>${chi.toFixed(2)}</b> ⇒ Critical metric determinant |g_(p)|_crit = 1/χ² = <b style="color:#FFD700;">${critDet.toFixed(3)}</b>.<br>` +
        (fractured
          ? `<span style="color:#ff6b81;"><b>⚠ METRONIC FRACTURE TRIGGERED (Thm. 9.17, ‖∇²ḡ‖ = ${gradRatio.toFixed(2)}/√τ ≥ 1/√τ):</b></span> Continuous Christoffel symbols diverge; manifold fractures into discrete cells <b>x_i = N_i χ_i √τ ∈ 𝕄_τ^n</b> (Chapter 10)!`
          : `<span style="color:#20B2AA;"><b>✓ SUB-CRITICAL CONTINUUM REGIME (‖∇²ḡ‖ = ${gradRatio.toFixed(2)}/√τ &lt; 1/√τ):</b></span> Smooth C^∞ apex metric ²ḡ_∞ and continuous Riemannian geodesics remain valid.`);
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

  function renderAllCh9Widgets() {
    window.ch9_updateSieveCascade();
    window.ch9_updateTransposedTransport();
    window.ch9_updateHermetryMatrix();
    window.ch9_updateCouplingQ();
    window.ch9_updateContortionStreamlines();
    window.ch9_updateDensityTheorem();
    window.ch9_updateSobolevContraction();
    window.ch9_updateTransitionCriterion();
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

  let synCh9Initialised = false;
  function initChapter9() {
    if (synCh9Initialised) return;
    synCh9Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh9Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter9);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter9();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter9();
  }
})();
