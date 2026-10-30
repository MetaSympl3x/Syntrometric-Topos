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
      el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());});
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

// =========================================================================
// CHAPTER 9: 60FPS 3D INTERACTIVE 36-HERMETRY, PALATINI & SOBOLEV APEX ENGINE
// =========================================================================

const CH9_3D_STYLE = `
#ch9-3d-hud {
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

#ch9-3d-hud *, #ch9-3d-hud *::before, #ch9-3d-hud *::after {
  box-sizing: border-box;
}

#ch9-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch9-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch9-3d-hud.minimized .ch9-hud-body {
  display: none;
}

.ch9-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch9-hud-title {
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

.ch9-hud-title span:first-child {
  line-height: 1.15;
}

.ch9-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch9-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch9-hud-btn {
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

.ch9-hud-btn:hover, .ch9-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch9-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch9-canvas-wrap:active {
  cursor: grabbing;
}

#ch9-3d-hud.spotlight .ch9-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch9-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch9-overlay-bar {
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

.ch9-telemetry {
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

#ch9-node-inspector {
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

.ch9-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch9-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch9-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch9-scrubber .ch9-hud-btn {
  flex-shrink: 0;
}

#ch9-caption {
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
  #ch9-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch9-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch9-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch9-hud-controls {
    gap: 3px;
  }
  .ch9-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch9-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch9-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch9-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch9-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch9-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch9-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch9-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch9-hud-controls {
    gap: 3px;
  }
  .ch9-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch9-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch9-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch9-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch9-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch9-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch9-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch9-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH9_3D_HTML = `
<div class="ch9-hud-header">

    <div class="ch9-hud-title">

      <span>🎛️ Ch 9 · 3D Hermetry &amp; Cascade Engine</span>

      <span id="ch9-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch9-hud-controls">

      <button class="ch9-hud-btn active" id="ch9-btn-orbit" onclick="toggleCh9Orbit()">⟳ Orbit</button>

      <button class="ch9-hud-btn" onclick="toggleCh9Spotlight()">⛶ Spotlight</button>

      <button class="ch9-hud-btn" id="ch9-btn-min" onclick="toggleCh9Minimize()">+</button>

    </div>

  </div>



  <div class="ch9-hud-body">

    <div class="ch9-canvas-wrap" id="ch9-canvas-wrap">

      <canvas id="ch9-3d-canvas"></canvas>

      <div class="ch9-overlay-bar">

        <div class="ch9-telemetry" id="ch9-telemetry">²ḡ = ²ḡ₊(21) + ²ḡ₋(15) on R₆</div>

        <div id="ch9-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch9-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <input type="range" id="ch9-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh9Stage(this.value)">

      <button class="ch9-hud-btn active" id="ch9-btn-sync" onclick="enableCh9Sync()">Auto-Sync</button>

    </div>



    <div id="ch9-caption">

      <b>Stage 1 (§9.1.1 — SM-59–60):</b> Multi-tiered Strukturkaskade pyramid from L₁ = C(6,2) = 15 to Apex L_M = 1 (Z₊ = 40).

    </div>

  </div>
`;

function injectCh93DHUD() {
  if (document.getElementById('ch9-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH9_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch9-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH9_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch9_3d_engine_loaded) return;
  window.__ch9_3d_engine_loaded = true;

  function runCh9Engine() {
    injectCh93DHUD();
    if (window.__ch9_3d_engine_initialized) return;
    window.__ch9_3d_engine_initialized = true;

const canvas = document.getElementById('ch9-3d-canvas');

  const wrap = document.getElementById('ch9-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.52;

  let camPitch = 0.38;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§9.1.1 — SM-59–60 Cascade Pyramid):</b> Partialkomposition from L₁ = C(6,2) = 15 to Apex L_M = 1 (Z₊ = 2(3^ω−2^ω+1) = 40).",

    2: "<b>Stage 2 (§9.1.2–9.1.4 — SM-37 Non-Hermitian Split):</b> Symmetric ²ḡ₊ (21 gravity/KK potentials) + Skew ²ḡ₋ (15 Maxwell/torsion potentials).",

    3: "<b>Stage 3 (§9.2.1 — Def. 9.3 Met(ℳ) &amp; Transposed Transport):</b> Antisymmetric curl ∂_k A_i − ∂_i A_k = A_s(Γ^s_{ik} − Γ^s_{ki}) certifying skew torsion.",

    4: "<b>Stage 4 (§9.2.2 — Def. 9.5 3D 6×6 Hermetry Switchboard on R₆):</b> Click any 3D pillar: 10 Gravity, 6 EM, 8 KK, 8 Torsion, 3 Mesobaric, 1 Entelechial!",

    5: "<b>Stage 5 (§9.3.1 — Thm. 9.6 Palatini Cross-Metric Coupling Q_(μγ)):</b> Koppelungstensor Q_(μγ)m^i = g^{is}g_(μ)sm − (1/ω)δ_m^i from misaligned metrics.",

    6: "<b>Stage 6 (§9.3.1b — Def. 9.13 Chiral Contortion Helix K_{kl}^i):</b> Non-Hermitian parallel transport Γ = Γ^(+) + K twisting frames along γ(s) ⊂ R₆.",

    7: "<b>Stage 7 (§9.3.1c — Thm. 9.8 Palatini Conservation &amp; No-Go Firewall):</b> Divergence-free sp ⌞_(−)^(6,6)(G) = 0 (SM-49) &amp; K₈ = S²×𝕋⁶ compactification.",

    8: "<b>Stage 8 (§9.3.1d — Thm. 9.10 The (n−2) Density Theorem, SM-46a):</b> g_{ik}⌞_{(+),l}^{(1,2)} g̲^{ik} = (n−2)⌞_l w (0 at n=2, 2⌞_l w in R₄, 4⌞_l w in R₆)!",

    9: "<b>Stage 9 (§9.3.2 — Thm. 9.14 DeTurck–Sobolev Apex Contraction):</b> Heat-smoothed operator Φ_apex = e^{−τ_M(Δ+c₀I)}∘𝒯 (k_M < 1) converging to ²ḡ_∞ ∈ C^∞.",

    10: "<b>Stage 10 (§9.3.3–9.6 — SM-64 Übergangskriterium &amp; Lattice Fracture):</b> Critical gradient ‖∇²ḡ‖ ≥ 1/√τ (χ√|g|=1) fractures geodesics into 𝕄_τ^n!"

  };



  const STAGE_TELEMETRY = {

    1: "Z₊ = 2(3^ω − 2^ω + 1) = 40 (ω=3, Prop. 9.1)",

    2: "²ḡ = ²ḡ₊ + ²ḡ₋ | ³Γ ≡ Γ_{kl}^i (SM-37)",

    3: "∂_k A_i − ∂_i A_k = 2 A_s Γ^s_{[ik]}",

    4: "dim_ℝ Mat_{6×6} = 36 = 21 Sym + 15 Skew",

    5: "Q_(μγ)m^i = g^{is}g_(μ)sm − (1/ω)δ_m^i (SM-53)",

    6: "K_{ikl} = ½(T_{ikl} + T_{lik} − T_{kli}) (Def. 9.13)",

    7: "sp ⌞_(−)^(6,6)(²R̄ − ½ ²ḡ R) = 0 (SM-49)",

    8: "g_{ik} ⌞_{(+),l}^{(1,2)} g̲^{ik} = (n − 2) ⌞_l w (SM-46a)",

    9: "‖Φ_apex(g₁) − Φ_apex(g₂)‖_{H^s} ≤ k_M ‖g₁−g₂‖",

    10: "χ√|g_(p)| = 1 ⇒ x_i = N_i α_i ∈ 𝕄_τ^n (SM-64)"

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



  // Stage 1: Multi-Tiered Strukturkaskade Pyramid (L_1 = 15 -> L_2 = 6 -> L_M = 1, Z_+ = 40)

  function renderStage1(w, h) {

    const pApex = drawNode3D("Kask_Apex", 0, 0, 1.15, 11.5, "#FFD700", "#fff", "²ḡ_∞ (L_M = 1, Z₊ = 40)", "Kaskadenspitze (α = M): Convergent Unified Metric on R₆ (SM Eq. 60a, Prop. 9.1)", w, h);

    const midPts = [];

    for (let j = 0; j < 4; j++) {

      const a = (j / 4) * Math.PI * 2 + timeSec * 0.3;

      const pM = drawNode3D("Kask_M_" + j, 0.72 * Math.cos(a), 0.72 * Math.sin(a), 0.1, 7.5, "#20B2AA", "#fff", `g^(2)_${j+1}`, "Intermediate Partialkomposition Tier α = 2 (Rank-Filtered κ₂)", w, h);

      drawLine3D(pM, pApex, "#FFD700", 2.5);

      midPts.push(pM);

    }

    for (let i = 0; i < 8; i++) {

      const a = (i / 8) * Math.PI * 2 - timeSec * 0.2;

      const pB = drawNode3D("Kask_B_" + i, 1.35 * Math.cos(a), 1.35 * Math.sin(a), -0.95, 5.5, "#4169E1", "#fff", i === 0 ? "L₁ = C(6,2) = 15" : "", `Kaskadenbasis Partial Metric g_(γ₁)^(1) ∈ Met(R₆)`, w, h);

      drawLine3D(pB, midPts[i % 4], "rgba(65,105,225,0.65)", 1.6);

    }

  }



  // Stage 2 & 3: Non-Hermitian Split ²ḡ = ²ḡ₊ + ²ḡ₋ & Transposed Parallel Transport Curl

  function renderStage2And3(w, h, st) {

    const isStage3 = (st >= 2.5);

    // Golden Symmetric Ellipsoid ²ḡ₊ (21 potentials)

    ctx.beginPath();

    ctx.strokeStyle = "#FFD700";

    ctx.lineWidth = 2.4;

    for (let i = 0; i <= 44; i++) {

      const a = (i / 44) * Math.PI * 2;

      const p = proj(1.25 * Math.cos(a), 0.85 * Math.sin(a), 0, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    // Tilted Skew-Symmetric Vorticity Loop ²ḡ₋ (15 potentials)

    ctx.beginPath();

    ctx.strokeStyle = "#20B2AA";

    ctx.lineWidth = 2.8;

    for (let i = 0; i <= 44; i++) {

      const a = (i / 44) * Math.PI * 2;

      const p = proj(0.95 * Math.cos(a), 0.95 * Math.sin(a), 0.85 * Math.sin(a + timeSec * 2), w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    drawNode3D("Sym_21", 1.25, 0, 0, 8.5, "#FFD700", "#000", "²ḡ₊ (21 Sym)", "Symmetric Metric Sector (10 Gravity + 8 KK + 3 Mesobaric)", w, h);

    drawNode3D("Skew_15", 0, 0.95, 0.75, 8.5, "#20B2AA", "#fff", "²ḡ₋ (15 Skew)", "Skew-Symmetric Sector (6 Maxwell F_μν + 8 Torsion + 1 Entelechial)", w, h);

    drawNode3D("Kond_Gamma", 0, 0, 0, 10.5, "#FFA500", "#fff", isStage3 ? "2 A_s Γ^s_{[ik]}" : "³Γ ≡ Γ_{kl}^i", isStage3 ? "Transposed Parallel Transport Curl ∂_k A_i − ∂_i A_k = A_s(Γ^s_{ik} − Γ^s_{ki})" : "Fundamentalkondensor ³Γ mediating Strukturassoziation (SM p. 157)", w, h);

  }



  // Stage 4: 3D 6x6 Non-Hermitian Hermetry Switchboard on R_6 = R_4 x S_2 (Def. 9.5)

  function renderStage4(w, h) {

    for (let r = 0; r < 6; r++) {

      for (let c = 0; c < 6; c++) {

        const x = (c - 2.5) * 0.44;

        const y = (r - 2.5) * 0.44;

        const isDiag = (r === c);

        const isSym  = (r <= c);

        const inR4   = (r < 4 && c < 4);

        const inS2   = (r >= 4 && c >= 4);



        let col = "#4169E1", sector = "Gravity g_μν (10 Sym on R₄)";

        if (inR4 && !isSym) { col = "#20B2AA"; sector = "Maxwell EM Vorticity F_μν (6 Skew on R₄)"; }

        else if (!inR4 && !inS2 && isSym) { col = "#FFA500"; sector = "Kaluza–Klein Gravito-EM (8 Sym on R₄×S₂)"; }

        else if (!inR4 && !inS2 && !isSym) { col = "#DC143C"; sector = "Chiral Spin-Torsion (8 Skew on R₄×S₂)"; }

        else if (inS2 && isSym) { col = "#9370DB"; sector = "Mesobaric Homeostasis (3 Sym on S₂)"; }

        else if (inS2 && !isSym) { col = "#FFD700"; sector = "Entelechial Commutator [∂₅, ∂₆] (1 Skew on S₂)"; }



        const zH = isDiag ? 0.55 : (isSym ? 0.25 : -0.25 + 0.18 * Math.sin(timeSec * 3 + r + c));

        const pBase = proj(x, y, -0.75, w, h);

        const pTop = drawNode3D(

          `H_${r+1}_${c+1}`, x, y, zH, isDiag ? 5.8 : 4.6, col, "#fff",

          (r === 0 && c === 0) ? "R₄" : ((r === 5 && c === 5) ? "S₂" : ""),

          `g_{${r+1}${c+1}}: ${sector}`, w, h

        );

        drawLine3D(pBase, pTop, col, 2.0);

      }

    }

  }



  // Stage 5: Palatini Cross-Metric Connection Decomposition & Koppelungstensor Q_{(\mu\gamma)} (Thm. 9.6)

  function renderStage5(w, h) {

    const pCenter = drawNode3D("Q_Tensor", 0, 0, 0, 11, "#FFD700", "#DC143C", "Q_(μγ)m^i = g^{is}g_(μ)sm − (1/ω)δ_m^i", "Thm. 9.6 Koppelungstensor (SM-53): Vanishes iff homothety-aligned g_(μ) = g/ω!", w, h);

    const cols = ["#4169E1", "#20B2AA", "#FFA500"];

    for (let mu = 0; mu < 3; mu++) {

      const a = timeSec * 0.5 + (mu / 3) * Math.PI * 2;

      const cx = 1.18 * Math.cos(a), cy = 1.18 * Math.sin(a), cz = 0.35 * Math.sin(a * 2);

      const pM = drawNode3D("PartG_" + mu, cx, cy, cz, 8.5, cols[mu], "#fff", `g_(${mu+1})`, `Partial Metric g_(${mu+1}) (ω = 3): Misalignment drives cross-metric force Q_(μγ) ≠ 0`, w, h);

      drawLine3D(pM, pCenter, "#FFA500", 2.8, [4, 2]);

    }

  }



  // Stage 6: Algebraic Contortion Tensor K_{kl}^i & Chiral Parallel Transport Helix (Def. 9.13)

  function renderStage6(w, h) {

    // Base Geodesic Spine \gamma(s) along X-axis

    drawLine3D(proj(-1.45, 0, 0, w, h), proj(1.45, 0, 0, w, h), "#4169E1", 2.8);

    // Chiral Contortion Helix twisting around \gamma(s) due to K_{kl}^i

    ctx.beginPath();

    ctx.strokeStyle = "#FFA500";

    ctx.lineWidth = 2.8;

    for (let i = 0; i <= 60; i++) {

      const s = i / 60;

      const x = -1.4 + 2.8 * s;

      const a = s * Math.PI * 4 - timeSec * 3;

      const p = proj(x, 0.72 * Math.cos(a), 0.72 * Math.sin(a), w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    // Rotating Frame Vectors along \gamma(s)

    for (let k = -2; k <= 2; k++) {

      const x = k * 0.62;

      const a = (k + 2) * 0.9 - timeSec * 3;

      const pBase = proj(x, 0, 0, w, h);

      const pTip  = drawNode3D("Cont_" + k, x, 0.72 * Math.cos(a), 0.72 * Math.sin(a), 6, "#FFD700", "#000", k === 0 ? "Γ = { }₊ + K_{kl}^i" : "", "Def. 9.13 Contortion Tensor K_{ikl} = ½(T_{ikl} + T_{lik} − T_{kli}) twisting parallel transport", w, h);

      drawLine3D(pBase, pTip, "#FFD700", 2.4);

    }

  }



  // Stage 7: Non-Hermitian Palatini Conservation (SM-49) & Damour-Deser-McCarthy Firewall (Thm. 9.8)

  function renderStage7(w, h) {

    const pAct = drawNode3D("Pal_S", 0, 0, 1.05, 10.5, "#FFD700", "#fff", "S[g, Γ] = ∫ √−g g^{ik} R_{ik}(Γ)", "Palatini Action Functional with independent Metric g^{ik} and Connection Γ_{kl}^i variations", w, h);

    const pMet = drawNode3D("Pal_Met", -1.1, 0, -0.25, 9, "#20B2AA", "#fff", "δS/δg^{ik} = 0 ⇒ SM-49", "Thm. 9.8(1): Divergence-Free Vorticity Conservation sp ⌞_(−)^(6,6)(²R̄ − ½ ²ḡ R) = 0", w, h);

    const pCon = drawNode3D("Pal_Con",  1.1, 0, -0.25, 9, "#FFA500", "#fff", "δS/δΓ_{kl}^i = 0 (216 eqs)", "Thm. 9.8(2): Algebraically fixes all n³ = 6³ = 216 connection components in terms of g_{ab}", w, h);

    const pFw  = drawNode3D("Pal_FW",   0, 0, -1.05, 8.5, "#9370DB", "#FFD700", "Carnap 9.1: K₈ = S²×𝕋⁶", "Stationary vorticity projection ⌞_(−)^(6,6) + compact K₈ evades unconstrained ghost modes", w, h);



    drawLine3D(pAct, pMet, "#20B2AA", 2.8);

    drawLine3D(pAct, pCon, "#FFA500", 2.8);

    drawLine3D(pMet, pFw, "#9370DB", 2.2, [4, 2]);

    drawLine3D(pCon, pFw, "#9370DB", 2.2, [4, 2]);

  }



  // Stage 8: The (n - 2) Metric Density Theorem g_{ik} \llcorner \underline{g}^{ik} = (n - 2) \llcorner_l w (Thm. 9.10, SM-46a)

  function renderStage8(w, h) {

    const dims = [2, 4, 6, 8, 12];

    dims.forEach((n, idx) => {

      const x = (idx - 2) * 0.72;

      const factor = n - 2; // 0, 2, 4, 6, 10

      const zTop = -0.85 + factor * 0.19;

      const isR6 = (n === 6);

      const col = n === 2 ? "#64748b" : (isR6 ? "#FFD700" : "#20B2AA");

      const pBot = proj(x, 0, -0.85, w, h);

      const pTop = drawNode3D(

        "Dens_" + n, x, 0, zTop, isR6 ? 10 : 7, col, "#fff",

        `n=${n}: ${factor}⌞_l w`,

        `Thm. 9.10 (SM-46a) at Dimension n = ${n}: g_{ik} ⌞_{(+),l}^{(1,2)} g̲^{ik} = (${n} − 2) ⌞_l w = ${factor} ⌞_l w`, w, h

      );

      drawLine3D(pBot, pTop, col, isR6 ? 6.0 : 3.5);

    });

  }



  // Stage 9: DeTurck-Sobolev H^s Contraction Funnel onto Apex Metric ²ḡ_\infty (Thm. 9.14)

  function renderStage9(w, h) {

    // 3D Exponential Contraction Funnel \Phi_{apex} = e^{-\tau_M(\Delta + c_0 I)} \circ \mathcal{T}

    for (let z = -1.0; z <= 1.01; z += 0.5) {

      const s = (z + 1.0) / 2.0; // 0 at bottom (apex) to 1 at top (initial ball)

      const rad = 0.14 + 1.2 * Math.pow(s, 1.4);

      ctx.beginPath();

      ctx.strokeStyle = s < 0.1 ? "#FFD700" : "rgba(32, 178, 170, 0.55)";

      ctx.lineWidth = 1.8;

      for (let i = 0; i <= 36; i++) {

        const a = (i / 36) * Math.PI * 2;

        const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    // Contracting Spiral Trajectory g^{(m+1)} = \Phi_{apex}(g^{(m)})

    ctx.beginPath();

    ctx.strokeStyle = "#FFD700";

    ctx.lineWidth = 3.0;

    for (let i = 0; i <= 75; i++) {

      const t = i / 75;

      const rad = 1.3 * Math.pow(1 - t, 1.5);

      const a = t * Math.PI * 6 + timeSec * 2.5;

      const p = proj(rad * Math.cos(a), rad * Math.sin(a), 1.0 - 2.0 * t, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    drawNode3D("Sob_Init", 1.3 * Math.cos(timeSec * 2.5), 1.3 * Math.sin(timeSec * 2.5), 1.0, 7.5, "#4169E1", "#fff", "g^(0) ∈ B_{H^s}(ḡ, δ)", "Initial Perturbed Metric in Sobolev Ball B_{H^s} (s > n/2 + 2)", w, h);

    drawNode3D("Sob_Apex", 0, 0, -1.0, 11, "#FFD700", "#20B2AA", "²ḡ_∞ ∈ C^∞(ℳ) (k_M < 1)", "Thm. 9.14 Unique Smooth Apex Fixed Point via DeTurck Parabolic Smoothing!", w, h);

  }



  // Stage 10: Übergangskriterium \chi\sqrt{|g_{(p)}|} = 1 (SM-64) & Geodesic Fracture into \mathbb{M}_\tau^n

  function renderStage10(w, h) {

    // Left Side (x < 0): Smooth C^2 Riemannian Geodesics approaching x = 0

    for (let yOff of [-0.65, 0.0, 0.65]) {

      ctx.beginPath();

      ctx.strokeStyle = "#20B2AA";

      ctx.lineWidth = 2.6;

      for (let x = -1.45; x <= 0.0; x += 0.1) {

        const p = proj(x, yOff, 0.35 * Math.sin(x * 3 + timeSec * 2), w, h);

        if (x === -1.45) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    // Crimson Critical Metronic Transition Wall at x = 0: \chi\sqrt{|g_{(p)}|} = 1 (SM-64)

    const wall = [proj(0, -1.1, -0.95, w, h), proj(0, 1.1, -0.95, w, h), proj(0, 1.1, 0.95, w, h), proj(0, -1.1, 0.95, w, h)];

    ctx.save();

    ctx.fillStyle = "rgba(220, 20, 60, 0.28)";

    ctx.strokeStyle = "#DC143C";

    ctx.lineWidth = 2.8;

    ctx.setLineDash([5, 3]);

    ctx.beginPath();

    ctx.moveTo(wall[0].sx, wall[0].sy);

    wall.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));

    ctx.closePath();

    ctx.fill();

    ctx.stroke();

    ctx.restore();



    // Right Side (x > 0): Discretized Metronic Lattice Cells x_i = N_i \alpha_i \in \mathbb{M}_\tau^n

    for (let nx = 1; nx <= 3; nx++) {

      for (let ny = -1; ny <= 1; ny++) {

        const lx = nx * 0.45, ly = ny * 0.65;

        drawNode3D(`Met_${nx}_${ny}`, lx, ly, 0, 5.5, "#FFD700", "#000", (nx === 2 && ny === 0) ? "x_i = N_i α_i ∈ 𝕄_τ^n" : "", "Discrete Metronic Lattice Cell (Chapter 10): Eliminates Christoffel singularity!", w, h);

      }

    }

    drawNode3D("Wall_SM64", 0, 0, 0.95, 9, "#DC143C", "#FFD700", "χ√|g_(p)| = 1 (SM-64)", "Thm. 9.17 Critical Gradient Wall ‖∇²ḡ‖ ≥ 1/√τ forcing continuum fracture!", w, h);

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

    else if (stInt === 2 || stInt === 3) renderStage2And3(w, h, curStage);

    else if (stInt === 4) renderStage4(w, h);

    else if (stInt === 5) renderStage5(w, h);

    else if (stInt === 6) renderStage6(w, h);

    else if (stInt === 7) renderStage7(w, h);

    else if (stInt === 8) renderStage8(w, h);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);



    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh9Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch9-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch9-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch9-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch9-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch9-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh9Stage = function(val) { window.setCh9Stage(val, true); };



  window.enableCh9Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch9-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh9WithDeck();

  };



  window.toggleCh9Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch9-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh9Spotlight = function() {

    const hud = document.getElementById('ch9-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh9Minimize = function() {

    const hud = document.getElementById('ch9-3d-hud');

    const b = document.getElementById('ch9-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh9WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch9-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-9, section[data-chapter="9"]') : true;
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
      window.setCh9Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh9WithDeck = syncCh9WithDeck;
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

    const insp = document.getElementById('ch9-node-inspector');

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

    syncCh9WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    const synBindSync_syncCh9WithDeck = () => {
      syncCh9WithDeck();
    };

    window.addEventListener('scroll', synBindSync_syncCh9WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh9WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh9WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh9WithDeck, { passive: true });

    const revEl_syncCh9WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh9WithDeck) {
      revEl_syncCh9WithDeck.addEventListener('scroll', synBindSync_syncCh9WithDeck, { passive: true });
      revEl_syncCh9WithDeck.addEventListener('touchmove', synBindSync_syncCh9WithDeck, { passive: true });
    }
    const vpEl_syncCh9WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh9WithDeck) {
      vpEl_syncCh9WithDeck.addEventListener('scroll', synBindSync_syncCh9WithDeck, { passive: true });
      vpEl_syncCh9WithDeck.addEventListener('touchmove', synBindSync_syncCh9WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh9WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh9WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh9WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh9WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh9WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh9WithDeck);
    }

    const hud = document.getElementById('ch9-3d-hud');

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
    document.addEventListener('DOMContentLoaded', runCh9Engine);
  } else {
    runCh9Engine();
  }
})();
