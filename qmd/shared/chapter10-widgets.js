(function() {
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

  // WIDGET 1: §10.1.1 Televarianzbedingung (SM-63) & Spin-Oriented Boundary Surfaces (Thm. 10.1)
  window.ch10_updateMetronCell = function() {
    const elP = document.getElementById('ch10-mc-p');
    if (!elP) return;
    const p = parseInt(elP.value, 10);
    const ni = parseInt(document.getElementById('ch10-mc-ni').value, 10);
    const chi = parseFloat(document.getElementById('ch10-mc-chi').value);

    document.getElementById('ch10-mc-p-val').innerText = 'R_' + p;
    document.getElementById('ch10-mc-ni-val').innerText = (ni >= 0 ? '+' : '') + ni;
    document.getElementById('ch10-mc-chi-val').innerText = chi.toFixed(2);

    const nPlanes = (p * (p - 1)) / 2;
    const nSurfaces = p * (p - 1);
    const alphaScale = chi;
    const xCoord = ni * alphaScale;

    const svg = document.getElementById('ch10-mc-svg');
    if (svg) {
      let html = `<rect x="6" y="6" width="218" height="108" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
      const cx = 115, cy = 60, r = 38;
      if (p === 1) {
        html += `<line x1="35" y1="60" x2="195" y2="60" stroke="#4169E1" stroke-width="3.5"/>`;
        for (let k = -3; k <= 3; k++) {
          const px = 115 + k * 22;
          const col = (k === Math.max(-3, Math.min(3, ni))) ? '#FFD700' : '#20B2AA';
          html += `<circle cx="${px}" cy="60" r="${k === ni ? 6 : 3.5}" fill="${col}"/>`;
        }
        html += `<text x="115" y="96" fill="#94a3b8" font-size="9.5" text-anchor="middle">1D Lattice Line (0 Coordinate 2-Planes)</text>`;
      } else {
        const verts = [];
        const nV = Math.max(3, p * 2);
        for (let k = 0; k < nV; k++) {
          const ang = (2 * Math.PI * k) / nV - Math.PI / 2;
          verts.push([cx + r * Math.cos(ang), cy + r * Math.sin(ang)]);
        }
        for (let i = 0; i < verts.length; i++) {
          for (let j = i + 1; j < verts.length; j++) {
            if ((i + j) % 2 === 0 || p >= 4) {
              html += `<line x1="${verts[i][0].toFixed(1)}" y1="${verts[i][1].toFixed(1)}" x2="${verts[j][0].toFixed(1)}" y2="${verts[j][1].toFixed(1)}" stroke="rgba(65,105,225,0.42)" stroke-width="1.3"/>`;
            }
          }
        }
        const polyPts = verts.map(v => `${v[0].toFixed(1)},${v[1].toFixed(1)}`).join(' ');
        html += `<polygon points="${polyPts}" fill="rgba(32,178,170,0.16)" stroke="#20B2AA" stroke-width="2.2"/>`;
        html += `<circle cx="${cx}" cy="${cy}" r="14" fill="none" stroke="#FFA500" stroke-width="2" stroke-dasharray="3,2"/>`;
        html += `<text x="${cx}" y="${cy + 3}" fill="#FFD700" font-size="9.5" font-weight="bold" text-anchor="middle">±s (${nSurfaces})</text>`;
        verts.forEach(v => {
          html += `<circle cx="${v[0].toFixed(1)}" cy="${v[1].toFixed(1)}" r="3.5" fill="#FFD700"/>`;
        });
      }
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch10-mc-readout');
    if (box) {
      box.innerHTML =
        `<b>SM-63 Coordinate:</b> $x_i = N_i \\chi_i \\tau^{1/${p}} = (${ni})(${chi.toFixed(2)})\\tau^{1/${p}} = $ <b style="color:#FFD700;">${xCoord.toFixed(2)} τ<sup>1/${p}</sup></b> (` +
        `<i>τ = (√3/4)ℓ<sub>P</sub>² ≈ 1.131×10⁻⁷⁰ m²</i>)<br>` +
        `<b>Thm. 10.1 (SM p. 267):</b> Subspace <b>R<sub>${p}</sub></b> has C(${p},2) = <b>${nPlanes}</b> coordinate 2-planes × 2 spin orientations = ` +
        `<b style="color:#20B2AA;">N<sub>surfaces</sub>(${p}) = ${p}(${p}−1) = ${nSurfaces} spin-oriented boundary 2-surfaces</b>.`;
    }
  };

  // WIDGET 2: §10.1.2 Discrete Osculating Curvature & Extremwerttheorie (Fig. 10.1, SM-67, SM-68b)
  const oscPhi = [0.2, 1.0, 2.2, 3.6, 4.0, 3.4, 2.3, 1.2, 0.6, 0.4, 0.8, 2.0, 3.3];
  window.ch10_updateOsculatingLab = function() {
    const elN = document.getElementById('ch10-osc-n');
    if (!elN) return;
    const n = parseInt(elN.value, 10);
    document.getElementById('ch10-osc-n-val').innerText = 'n = ' + n;

    const phi_n = oscPhi[n];
    const phi_prev = oscPhi[n - 1];
    const phi_prev2 = n >= 2 ? oscPhi[n - 2] : oscPhi[0];
    const d1 = phi_n - phi_prev;
    const d2 = phi_n - 2 * phi_prev + phi_prev2;
    const d2_next = oscPhi[n + 1] - 2 * phi_n + phi_prev;
    const prodInflect = d2 * d2_next;

    const svg = document.getElementById('ch10-osc-svg');
    if (svg) {
      let html = `
        <line x1="20" y1="108" x2="400" y2="108" stroke="#64748b" stroke-width="1.5"/>
        <circle cx="132" cy="48" r="24" fill="rgba(32,178,170,0.10)" stroke="#20B2AA" stroke-width="1.4" stroke-dasharray="3,2"/>
        <text x="132" y="18" fill="#20B2AA" font-size="8.5" font-weight="bold" text-anchor="middle">Concave (∇²φ &lt; 0)</text>
        <circle cx="298" cy="72" r="24" fill="rgba(220,20,60,0.10)" stroke="#DC143C" stroke-width="1.4" stroke-dasharray="3,2"/>
        <text x="298" y="42" fill="#ff6b81" font-size="8.5" font-weight="bold" text-anchor="middle">Convex (∇²φ &gt; 0)</text>
      `;
      let pts = [];
      for (let k = 1; k <= 11; k++) {
        const sx = 22 + k * 33;
        const sy = 104 - oscPhi[k] * 21;
        pts.push((k === 1 ? 'M ' : 'L ') + sx.toFixed(1) + ',' + sy.toFixed(1));
      }
      html += `<path d="${pts.join(' ')}" fill="none" stroke="#4169E1" stroke-width="2.6"/>`;
      for (let k = 1; k <= 11; k++) {
        const sx = 22 + k * 33;
        const sy = 104 - oscPhi[k] * 21;
        const isSel = (k === n);
        const isW = (k === 6);
        const col = isSel ? '#FFD700' : (isW ? '#FFA500' : '#5eead4');
        const rad = isSel ? 6.5 : (isW ? 5.0 : 3.5);
        html += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${rad}" fill="${col}" stroke="#000" stroke-width="1"/>`;
        html += `<text x="${sx.toFixed(1)}" y="120" fill="#94a3b8" font-size="8.5" text-anchor="middle">${k}</text>`;
      }
      const sxN = 22 + n * 33, syN = 104 - oscPhi[n] * 21;
      const sxPrev = 22 + (n - 1) * 33, syPrev = 104 - oscPhi[n - 1] * 21;
      html += `<line x1="${sxPrev.toFixed(1)}" y1="${syPrev.toFixed(1)}" x2="${sxN.toFixed(1)}" y2="${syN.toFixed(1)}" stroke="#FFD700" stroke-width="3.5"/>`;
      svg.innerHTML = html;
    }

    let regTag = '';
    if (n === 6) {
      regTag = `<span style="color:#FFA500;"><b>★ DISCRETE INFLECTION NODE (Wendepunkt w = 6, SM-68b):</b> ∇²φ(6)·∇²φ(7) = (${d2.toFixed(2)})(${d2_next.toFixed(2)}) = ${prodInflect.toFixed(3)} &lt; 0!</span>`;
    } else if (n === 4) {
      regTag = `<span style="color:#20B2AA;"><b>★ DISCRETE MAXIMUM (n = 4):</b> Sign reversal in ∇φ across node with ∇²φ(4) = ${d2.toFixed(2)} &lt; 0 (Concave Peak)</span>`;
    } else if (n === 9) {
      regTag = `<span style="color:#ff6b81;"><b>★ DISCRETE MINIMUM (n = 9):</b> Sign reversal in ∇φ across node with ∇²φ(9) = +${d2.toFixed(2)} &gt; 0 (Convex Trough)</span>`;
    } else if (d2 < 0) {
      regTag = `<span style="color:#5eead4;"><b>Concave Region:</b> ∇²φ(${n}) = ${d2.toFixed(2)} &lt; 0</span>`;
    } else {
      regTag = `<span style="color:#fcd34d;"><b>Convex Region:</b> ∇²φ(${n}) = +${d2.toFixed(2)} &gt; 0</span>`;
    }

    const box = document.getElementById('ch10-osc-readout');
    if (box) {
      box.innerHTML =
        `<b>Node n=${n}:</b> φ(${n}) = <b>${phi_n.toFixed(2)}</b> | <b>SM-67 First Diff:</b> ∇φ(${n}) = φ(${n}) − φ(${n-1}) = <b>${(d1 >= 0 ? '+' : '') + d1.toFixed(2)}</b> | ` +
        `<b>Second Diff:</b> ∇²φ(${n}) = <b>${(d2 >= 0 ? '+' : '') + d2.toFixed(2)}</b><br>${regTag}`;
    }
  };

  // WIDGET 3: §10.1.3 & §10.3 Telescoping Metronintegral Staircase & Domain-Splitting (SM-67a, SM-69, Fig. 10.5)
  window.ch10_updateStaircaseLab = function() {
    const elN1 = document.getElementById('ch10-st-n1');
    if (!elN1) return;
    let n1 = parseInt(elN1.value, 10);
    let n2 = parseInt(document.getElementById('ch10-st-n2').value, 10);
    if (n2 < n1 + 1) {
      n2 = n1 + 1;
      document.getElementById('ch10-st-n2').value = n2;
    }
    const elGam = document.getElementById('ch10-st-gam');
    elGam.min = n1;
    elGam.max = n2 - 1;
    let gam = Math.max(n1, Math.min(n2 - 1, parseInt(elGam.value, 10)));
    elGam.value = gam;

    document.getElementById('ch10-st-n1-val').innerText = n1;
    document.getElementById('ch10-st-gam-val').innerText = gam;
    document.getElementById('ch10-st-n2-val').innerText = n2;

    // Primitive Phi(n) = n^2, difference phi(n) = 2n - 1
    const Phi = k => k * k;
    const phi = k => 2 * k - 1;

    let sumLeft = 0, sumRight = 0;
    for (let j = n1; j <= gam; j++) sumLeft += phi(j);
    for (let j = gam + 1; j <= n2; j++) sumRight += phi(j);
    const totalSum = sumLeft + sumRight;
    const teleDiff = Phi(n2) - Phi(n1 - 1);

    const svg = document.getElementById('ch10-st-svg');
    if (svg) {
      const maxPhi = Phi(n2) + 2;
      let html = `<line x1="25" y1="108" x2="395" y2="108" stroke="#64748b" stroke-width="1.5"/>`;
      const count = n2 - n1 + 1;
      const w = Math.min(48, 320 / count);
      for (let j = n1; j <= n2; j++) {
        const idx = j - n1;
        const x0 = 38 + idx * w;
        const yLo = 106 - (Phi(j - 1) / maxPhi) * 88;
        const yHi = 106 - (Phi(j) / maxPhi) * 88;
        const isFirstHalf = (j <= gam);
        const fillCol = isFirstHalf ? 'rgba(65,105,225,0.22)' : 'rgba(32,178,170,0.22)';
        const strokeCol = isFirstHalf ? '#4169E1' : '#20B2AA';
        html += `<rect x="${x0.toFixed(1)}" y="${yHi.toFixed(1)}" width="${(w - 3).toFixed(1)}" height="${(106 - yHi).toFixed(1)}" fill="${fillCol}" stroke="${strokeCol}" stroke-width="1.2"/>`;
        html += `<line x1="${x0.toFixed(1)}" y1="${yLo.toFixed(1)}" x2="${x0.toFixed(1)}" y2="${yHi.toFixed(1)}" stroke="#FFA500" stroke-width="2.8"/>`;
        html += `<circle cx="${x0.toFixed(1)}" cy="${yHi.toFixed(1)}" r="3.5" fill="#FFD700"/>`;
        html += `<text x="${(x0 + w / 2 - 2).toFixed(1)}" y="120" fill="#cbd5e1" font-size="8.5" text-anchor="middle">j=${j}</text>`;
      }
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch10-st-readout');
    if (box) {
      box.innerHTML =
        `<b>Model Sequence:</b> $\\Phi(n) = n^2 \\implies \\phi(n) = \\nabla\\Phi(n) = 2n - 1$<br>` +
        `<b>SM-69 Domain Split:</b> $\\mathcal{S}_{${n1}}^{${gam}}\\phi + \\mathcal{S}_{${gam+1}}^{${n2}}\\phi = ${sumLeft} + ${sumRight} = $ <b style="color:#20B2AA;">${totalSum}</b> | ` +
        `<b>SM-67a Telescoping:</b> $\\Phi(${n2}) - \\Phi(${n1-1}) = ${Phi(n2)} - ${Phi(n1-1)} = $ <b style="color:#FFD700;">${teleDiff} (Exact Match!)</b>`;
    }
  };

  // WIDGET 4: §10.1.4 & §10.2 2D Metronic Stencil & Nearest-Neighbor Lattice Theorem (Def. 10.4, SM-74a, Fig. 10.2)
  window.ch10_updateStencilLab = function() {
    const elN1 = document.getElementById('ch10-sn-n1');
    if (!elN1) return;
    const n1 = parseInt(elN1.value, 10);
    const n2 = parseInt(document.getElementById('ch10-sn-n2').value, 10);
    document.getElementById('ch10-sn-n1-val').innerText = n1;
    document.getElementById('ch10-sn-n2-val').innerText = n2;

    // 2D field phi(n1, n2) = n1^2 + n1*n2 + 2*n2^2
    const f = (x, y) => x * x + x * y + 2 * y * y;
    const phi_c = f(n1, n2);
    const phi_l = f(n1 - 1, n2);
    const phi_d = f(n1, n2 - 1);
    const d1 = phi_c - phi_l;
    const d2 = phi_c - phi_d;
    const dTot = d1 + d2;
    const lhs74a = 2 * phi_c - dTot;
    const rhs74a = phi_l + phi_d;

    const svg = document.getElementById('ch10-sn-svg');
    if (svg) {
      let html = '';
      for (let gx = 0; gx <= 4; gx++) {
        for (let gy = 0; gy <= 3; gy++) {
          const sx = 35 + gx * 42;
          const sy = 102 - gy * 28;
          html += `<circle cx="${sx}" cy="${sy}" r="2.5" fill="#475569"/>`;
        }
      }
      const cx = 35 + n1 * 42, cy = 102 - n2 * 28;
      const lx = 35 + (n1 - 1) * 42, ly = cy;
      const dx = cx, dy = 102 - (n2 - 1) * 28;
      html += `<rect x="${lx}" y="${cy}" width="42" height="28" fill="rgba(65,105,225,0.20)" stroke="#4169E1" stroke-width="1.5"/>`;
      html += `<text x="${lx + 21}" y="${cy + 17}" fill="#93c5fd" font-size="8.5" font-weight="bold" text-anchor="middle">Metron τ</text>`;
      html += `<line x1="${lx}" y1="${ly}" x2="${cx}" y2="${cy}" stroke="#20B2AA" stroke-width="3"/>`;
      html += `<line x1="${dx}" y1="${dy}" x2="${cx}" y2="${cy}" stroke="#20B2AA" stroke-width="3"/>`;
      html += `<circle cx="${lx}" cy="${ly}" r="5.5" fill="#FFA500" stroke="#000" stroke-width="1"/>`;
      html += `<circle cx="${dx}" cy="${dy}" r="5.5" fill="#FFA500" stroke="#000" stroke-width="1"/>`;
      html += `<circle cx="${cx}" cy="${cy}" r="6.5" fill="#FFD700" stroke="#000" stroke-width="1.2"/>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch10-sn-readout');
    if (box) {
      box.innerHTML =
        `<b>Field $\\phi(n_1,n_2) = n_1^2 + n_1 n_2 + 2n_2^2$ at $(${n1},${n2})$:</b> $\\phi(\\mathbf{n}) = ${phi_c}$, $\\phi(E_1^{-1}\\mathbf{n}) = ${phi_l}$, $\\phi(E_2^{-1}\\mathbf{n}) = ${phi_d}$<br>` +
        `<b>Differences:</b> $\\nabla_1\\phi = ${d1}$, $\\nabla_2\\phi = ${d2}$, $\\nabla_{\\mathrm{tot}}\\phi = ${dTot}$ | ` +
        `<b>SM-74a Nearest-Neighbor Identity ($L=2$):</b> $2\\phi(\\mathbf{n}) - \\nabla_{\\mathrm{tot}}\\phi = 2(${phi_c}) - ${dTot} = $ <b style="color:#FFD700;">${lhs74a} = ${rhs74a}</b> $= \\sum_{i=1}^2 \\phi(\\mathbf{n}-\\mathbf{e}_i)$!`;
    }
  };

  // WIDGET 5: §10.2 DEC Primal-Dual Cell & Discrete Hodge Star Calculator (Defs. 10.5–10.6, Fig. 10.3)
  window.ch10_updateHodgeLab = function() {
    const elN = document.getElementById('ch10-hd-n');
    if (!elN) return;
    const n = parseInt(elN.value, 10);
    const elK = document.getElementById('ch10-hd-k');
    elK.max = n;
    let k = Math.min(n, parseInt(elK.value, 10));
    elK.value = k;
    const s = parseInt(document.getElementById('ch10-hd-s').value, 10);

    document.getElementById('ch10-hd-n-val').innerText = 'n = ' + n;
    document.getElementById('ch10-hd-k-val').innerText = 'k = ' + k;
    document.getElementById('ch10-hd-s-val').innerText = s === 0 ? 's=0 (Riem)' : 's=1 (Lor)';

    const nk = n - k;
    const expSign = k * nk + s;
    const invSign = (expSign % 2 === 0) ? '+1' : '−1';
    const codiffExp = n * (k - 1) + 1 + s;
    const codiffSign = (((codiffExp % 2) + 2) % 2 === 0) ? '+' : '−';
    const tauPower = n - 2 * k;

    const primalNames = ['0-Node (Vertex)', '1-Edge (Link)', '2-Plaquette (Face)', '3-Cube (Volume)', '4-Hypercube'];
    const box = document.getElementById('ch10-hd-readout');
    if (box) {
      box.innerHTML =
        `<b>Primal $k$-Cell $\\sigma_${k}$:</b> <span style="color:#5eead4;">${primalNames[k] || k+'-Cell'}</span> ($|\\sigma_${k}| = \\tau^{${k}/2}$) $\\xrightarrow{*_K}$ ` +
        `<b>Voronoi Dual $(n-k)$-Cell $\\sigma^*_{${nk}}$:</b> <span style="color:#fcd34d;">${primalNames[nk] || nk+'-Cell'}</span> ($|\\sigma^*_{${nk}}| = \\tau^{${nk}/2}$)<br>` +
        `<b>Metric Scale Factor:</b> $|\\sigma^*_{${nk}}| / |\\sigma_${k}| = \\tau^{(${n}-2\\cdot ${k})/2} = $ <b style="color:#FFA500;">τ<sup>${tauPower}/2</sup></b> | ` +
        `<b>Duality Involution (Def. 10.5):</b> $*_{K^*}\\circ *_K = (-1)^{${k}(${nk})+${s}}\\operatorname{id} = $ <b style="color:#FFD700;">${invSign} id</b> | ` +
        `<b>Codifferential (Def. 10.6):</b> $\\delta_\\tau = ${codiffSign}*_{K^*} d_{K^*} *_K$`;
    }
  };

  // WIDGET 6: §10.3 Power Monomial Difference \nabla^k n^\gamma & Stirling Explorer (Thms. 10.7–10.8)
  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    let res = 1;
    for (let i = 1; i <= k; i++) res = (res * (n - i + 1)) / i;
    return Math.round(res);
  }
  function factorial(m) {
    let r = 1;
    for (let i = 2; i <= m; i++) r *= i;
    return r;
  }
  window.ch10_updateMonomialLab = function() {
    const elK = document.getElementById('ch10-mn-k');
    if (!elK) return;
    const k = parseInt(elK.value, 10);
    const gam = parseInt(document.getElementById('ch10-mn-gam').value, 10);
    const n = parseInt(document.getElementById('ch10-mn-n').value, 10);

    document.getElementById('ch10-mn-k-val').innerText = 'k = ' + k;
    document.getElementById('ch10-mn-gam-val').innerText = 'γ = ' + gam;
    document.getElementById('ch10-mn-n-val').innerText = 'n = ' + n;

    const evalDiff = (node) => {
      let sum = 0;
      for (let l = 0; l <= k; l++) {
        const sign = (l % 2 === 0) ? 1 : -1;
        sum += sign * binom(k, l) * Math.pow(node - l, gam);
      }
      return sum;
    };

    const valAtN = evalDiff(n);
    let regimeStr = '';
    if (k < gam) {
      regimeStr = `<span style="color:#5eead4;"><b>Sub-Critical ($k = ${k} &lt; \\gamma = ${gam}$):</b> Polynomial of degree $\\gamma - k = ${gam - k}$, value at $n=${n}$ is <b>${valAtN}</b></span>`;
    } else if (k === gam) {
      regimeStr = `<span style="color:#FFD700;"><b>Critical Factorial ($k = \\gamma = ${gam}$):</b> Constant $\\nabla^{${k}} n^{${gam}} \\equiv \\gamma! = ${gam}! = $ <b>${factorial(gam)}</b> (Independent of $n$!)</span>`;
    } else {
      regimeStr = `<span style="color:#ff6b81;"><b>Super-Critical Annihilation ($k = ${k} &gt; \\gamma = ${gam}$):</b> Identically $\\nabla^{${k}} n^{${gam}} \\equiv $ <b>0</b> $\\forall n \\in \\mathbb{Z}$!</span>`;
    }

    const box = document.getElementById('ch10-mn-readout');
    if (box) {
      box.innerHTML =
        `<b>Thm. 10.7–10.8 Binomial Sum (SM-68):</b> $\\nabla^{${k}} n^{${gam}}\\big|_{n=${n}} = \\sum_{\\ell=0}^{${k}} (-1)^\\ell \\binom{${k}}{\\ell}(${n}-\\ell)^{${gam}} = $ <b style="color:#FFD700;">${valAtN}</b><br>` +
        `${regimeStr}`;
    }
  };

  // WIDGET 7: §10.3 Discrete Leibniz Cross-Term & Continuum Correspondence Limit (Thms. 10.12 & 10.15)
  window.ch10_updateLeibnizLab = function() {
    const elTau = document.getElementById('ch10-lb-tau');
    if (!elTau) return;
    const tau = parseFloat(elTau.value);
    const x = parseFloat(document.getElementById('ch10-lb-x').value);
    document.getElementById('ch10-lb-tau-val').innerText = tau.toFixed(2);
    document.getElementById('ch10-lb-x-val').innerText = x.toFixed(1);

    // Test functions: u(x) = x^2, v(x) = exp(0.5*x)
    const u = t => t * t;
    const v = t => Math.exp(0.5 * t);
    const du_tau = (u(x) - u(x - tau)) / tau;
    const dv_tau = (v(x) - v(x - tau)) / tau;
    const duv_tau = (u(x) * v(x) - u(x - tau) * v(x - tau)) / tau;

    const leibnizNaive = du_tau * v(x) + u(x) * dv_tau;
    const crossTermScaled = -tau * du_tau * dv_tau;
    const exactRHS = leibnizNaive + crossTermScaled;
    const exactCont = 2 * x * v(x) + 0.5 * u(x) * v(x);

    const box = document.getElementById('ch10-lb-readout');
    if (box) {
      box.innerHTML =
        `<b>Test Pair $u(x)=x^2,\\; v(x)=e^{x/2}$ at $x=${x.toFixed(1)},\\; \\tau=${tau.toFixed(2)}$:</b><br>` +
        `• <b>Scaled Discrete Product $\\nabla_\\tau(uv)/\\tau$:</b> <b style="color:#FFD700;">${duv_tau.toFixed(4)}</b> vs. <b>Classical $(uv)'(x)$:</b> <b>${exactCont.toFixed(4)}</b> (Thm. 10.15 Error: ${Math.abs(duv_tau - exactCont).toFixed(4)})<br>` +
        `• <b>SM-68a Decomposition:</b> $[(\\nabla_\\tau u/\\tau)v + u(\\nabla_\\tau v/\\tau)] = ${leibnizNaive.toFixed(4)}$ ` +
        `<span style="color:#ff6b81;"><b>− τ(∇<sub>τ</sub>u/τ)(∇<sub>τ</sub>v/τ) = ${crossTermScaled.toFixed(4)}</b></span> $= $ <b style="color:#20B2AA;">${exactRHS.toFixed(4)} (Exact Identity!)</b>`;
    }
  };

  // WIDGET 8: §10.3 Discrete Gauss Divergence Flux Conservation Lab (Thm. 10.17, SM-80, Fig. 10.6)
  window.ch10_updateGaussBoxLab = function() {
    const elB1 = document.getElementById('ch10-gs-b1');
    if (!elB1) return;
    const b1 = parseInt(elB1.value, 10);
    const b2 = parseInt(document.getElementById('ch10-gs-b2').value, 10);
    document.getElementById('ch10-gs-b1-val').innerText = '[1, ' + b1 + ']';
    document.getElementById('ch10-gs-b2-val').innerText = '[1, ' + b2 + ']';

    // Vector field A = (A1, A2) with A1(n1,n2) = n1^2 * n2, A2(n1,n2) = n1 * n2^2 on Omega = [1,b1] x [1,b2]
    const A1 = (x, y) => x * x * y;
    const A2 = (x, y) => x * y * y;
    let volSum = 0;
    for (let x = 1; x <= b1; x++) {
      for (let y = 1; y <= b2; y++) {
        const divA = (A1(x, y) - A1(x - 1, y)) + (A2(x, y) - A2(x, y - 1));
        volSum += divA;
      }
    }
    let fluxX = 0, fluxY = 0;
    for (let y = 1; y <= b2; y++) fluxX += (A1(b1, y) - A1(0, y));
    for (let x = 1; x <= b1; x++) fluxY += (A2(x, b2) - A2(x, 0));
    const totalBoundaryFlux = fluxX + fluxY;

    const box = document.getElementById('ch10-gs-readout');
    if (box) {
      box.innerHTML =
        `<b>Lattice Box $\\Omega = [1,${b1}]\\times[1,${b2}] \\subset \\mathbb{M}_\\tau^2$ (${b1 * b2} cells) with $\\mathbf{A}(n_1,n_2) = (n_1^2 n_2,\\, n_1 n_2^2)$:</b><br>` +
        `• <b>Interior Volume Sum $\\sum_{\\mathbf{n}\\in\\Omega}(\\operatorname{DIV}_2\\mathbf{A})(\\mathbf{n})$:</b> <b style="color:#FFD700;">${volSum}</b> (Interior faces cancel telescopically)<br>` +
        `• <b>SM-80 Boundary Facet Flux:</b> Flux<sub>1</sub> ($n_1=b_1$ vs $a_1-1$) = <b>${fluxX}</b> + Flux<sub>2</sub> ($n_2=b_2$ vs $a_2-1$) = <b>${fluxY}</b> ⇒ <b style="color:#20B2AA;">Total Flux = ${totalBoundaryFlux} (Exact Gauss Conservation!)</b>`;
    }
  };

  // WIDGET 9: §10.3 Brillouin Zone Momentum Dispersion & UV Cutoff (Thm. 10.21)
  window.ch10_updateDispersionLab = function() {
    const elTau = document.getElementById('ch10-uv-tau');
    if (!elTau) return;
    const tau = parseFloat(elTau.value);
    const N = parseInt(document.getElementById('ch10-uv-n').value, 10);
    document.getElementById('ch10-uv-tau-val').innerText = tau.toFixed(2);
    document.getElementById('ch10-uv-n-val').innerText = 'N = ' + N;

    const lambdaMax1D = 4.0 / (tau * tau);
    const lambdaMax4D = 16.0 / (tau * tau);
    const uvCutoff = 4.0 / Math.sqrt(tau);
    const gap1D = (4.0 / (tau * tau)) * Math.pow(Math.sin(Math.PI / N), 2);

    const svg = document.getElementById('ch10-uv-svg');
    if (svg) {
      let html = `
        <line x1="25" y1="102" x2="395" y2="102" stroke="#64748b" stroke-width="1.5"/>
        <line x1="210" y1="12" x2="210" y2="105" stroke="#475569" stroke-width="1.2" stroke-dasharray="3,2"/>
        <text x="215" y="22" fill="#94a3b8" font-size="8.5">k ∈ [−π/τ, +π/τ]</text>
      `;
      let ptsCont = [], ptsLat = [];
      const yScale = 78.0 / lambdaMax1D;
      for (let i = 0; i <= 80; i++) {
        const u = (i / 80.0) * 2 - 1; // -1 to +1 representing -pi/tau to +pi/tau
        const k = u * (Math.PI / tau);
        const lamLat = (4.0 / (tau * tau)) * Math.pow(Math.sin((k * tau) / 2.0), 2);
        const lamCont = k * k;
        const sx = 210 + u * 170;
        const syLat = 100 - lamLat * yScale;
        const syCont = Math.max(8, 100 - lamCont * yScale);
        ptsLat.push((i === 0 ? 'M ' : 'L ') + sx.toFixed(1) + ',' + syLat.toFixed(1));
        ptsCont.push((i === 0 ? 'M ' : 'L ') + sx.toFixed(1) + ',' + syCont.toFixed(1));
      }
      html += `<path d="${ptsCont.join(' ')}" fill="none" stroke="#DC143C" stroke-width="1.8" stroke-dasharray="4,3"/>`;
      html += `<path d="${ptsLat.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2.8"/>`;
      html += `<text x="345" y="20" fill="#ff6b81" font-size="8.5">Continuum k² → ∞</text>`;
      html += `<text x="335" y="42" fill="#20B2AA" font-size="8.5" font-weight="bold">DEC 4/τ² sin²(kτ/2)</text>`;
      svg.innerHTML = html;
    }

    const box = document.getElementById('ch10-uv-readout');
    if (box) {
      box.innerHTML =
        `<b>1D Max Eigenvalue:</b> $\\lambda_{\\max}^{(1\\mathrm{D})} = 4/\\tau^2 = $ <b>${lambdaMax1D.toFixed(2)}</b> | ` +
        `<b>4D Spectrum $\\sigma(\\Delta_\\tau)$:</b> $[0, 16/\\tau^2] = [0, $ <b style="color:#FFD700;">${lambdaMax4D.toFixed(2)}</b>$]$ | ` +
        `<b>UV Scale:</b> $\\Lambda_{\\mathrm{UV}} = 4/\\sqrt{\\tau} = $ <b style="color:#20B2AA;">${uvCutoff.toFixed(2)}</b> | ` +
        `<b>Torus Gap:</b> $\\Delta E_{\\min} = $ <b style="color:#FFA500;">${gap1D.toFixed(4)} &gt; 0</b>`;
    }
  };

  // ---------------------------------------------------------------------------
  // VIDEO CONTROL & WIDGET WIRING (Combined-deck safe IIFE)
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

  function renderAllCh10Widgets() {
    window.ch10_updateMetronCell();
    window.ch10_updateOsculatingLab();
    window.ch10_updateStaircaseLab();
    window.ch10_updateStencilLab();
    window.ch10_updateHodgeLab();
    window.ch10_updateMonomialLab();
    window.ch10_updateLeibnizLab();
    window.ch10_updateGaussBoxLab();
    window.ch10_updateDispersionLab();
  }

  function bindControlsOnce() {
    document.querySelectorAll('input[type="range"], select, button').forEach(el => {
      if (el.dataset.synBound) return;
      el.dataset.synBound = '1';
      el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());});
  }

  let ch10Initialised = false;
  function initChapter10() {
    if (ch10Initialised) return;
    ch10Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh10Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter10);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter10();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter10();
  }
})();

// =========================================================================
// CHAPTER 10: 60FPS 3D INTERACTIVE METRONIC LATTICE, DEC HODGE & UV CUTOFF ENGINE
// =========================================================================

const CH10_3D_STYLE = `
#ch10-3d-hud {
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

#ch10-3d-hud *, #ch10-3d-hud *::before, #ch10-3d-hud *::after {
  box-sizing: border-box;
}

#ch10-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch10-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch10-3d-hud.minimized .ch10-hud-body {
  display: none;
}

.ch10-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch10-hud-title {
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

.ch10-hud-title span:first-child {
  line-height: 1.15;
}

.ch10-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch10-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch10-hud-btn {
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

.ch10-hud-btn:hover, .ch10-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch10-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch10-canvas-wrap:active {
  cursor: grabbing;
}

#ch10-3d-hud.spotlight .ch10-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch10-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch10-overlay-bar {
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

.ch10-telemetry {
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

#ch10-node-inspector {
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

.ch10-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch10-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch10-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch10-scrubber .ch10-hud-btn {
  flex-shrink: 0;
}

#ch10-caption {
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
  #ch10-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch10-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch10-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch10-hud-controls {
    gap: 3px;
  }
  .ch10-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch10-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch10-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch10-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch10-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch10-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch10-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch10-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch10-hud-controls {
    gap: 3px;
  }
  .ch10-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch10-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch10-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch10-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch10-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch10-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch10-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch10-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH10_3D_HTML = `
<div class="ch10-hud-header">

    <div class="ch10-hud-title">

      <span>🧊 Ch 10 · 3D Metronic DEC Engine</span>

      <span id="ch10-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch10-hud-controls">

      <button class="ch10-hud-btn active" id="ch10-btn-orbit" onclick="toggleCh10Orbit()">⟳ Orbit</button>

      <button class="ch10-hud-btn" onclick="toggleCh10Spotlight()">⛶ Spotlight</button>

      <button class="ch10-hud-btn" id="ch10-btn-min" onclick="toggleCh10Minimize()">+</button>

    </div>

  </div>



  <div class="ch10-hud-body">

    <div class="ch10-canvas-wrap" id="ch10-canvas-wrap">

      <canvas id="ch10-3d-canvas"></canvas>

      <div class="ch10-overlay-bar">

        <div class="ch10-telemetry" id="ch10-telemetry">𝕄_τ^n = ⨁ √τ ℤ | d_τ² ≡ 0</div>

        <div id="ch10-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch10-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <input type="range" id="ch10-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh10Stage(this.value)">

      <button class="ch10-hud-btn active" id="ch10-btn-sync" onclick="enableCh10Sync()">Auto-Sync</button>

    </div>



    <div id="ch10-caption">

      <b>Stage 1 (§10.1.1 — SM-63 &amp; Thm. 10.1):</b> Elementary Metron cell τ with p(p−1) = 6 spin-oriented boundary 2-surfaces in R₃.

    </div>

  </div>
`;

function injectCh103DHUD() {
  if (document.getElementById('ch10-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH10_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch10-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH10_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch10_3d_engine_loaded) return;
  window.__ch10_3d_engine_loaded = true;

  function runCh10Engine() {
    injectCh103DHUD();
    if (window.__ch10_3d_engine_initialized) return;
    window.__ch10_3d_engine_initialized = true;

const canvas = document.getElementById('ch10-3d-canvas');

  const wrap = document.getElementById('ch10-canvas-wrap');

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

    1: "<b>Stage 1 (§10.1.1 — SM-63 &amp; Thm. 10.1):</b> Elementary Metron cell τ in R₃ with N_surfaces(3) = 3(2) = 6 spin-oriented boundary faces.",

    2: "<b>Stage 2 (§10.1.2 — SM-67–68b Discrete Extremwerttheorie):</b> Backward difference ∇φ(n), osculating circles &amp; inflection node w=6.",

    3: "<b>Stage 3 (§10.1.3 — SM-67a–71 Metronintegral Staircase):</b> Telescoping sum 𝒮_{n₁}^{n₂}φ = Φ(n₂) − Φ(n₁−1) canceling interior risers.",

    4: "<b>Stage 4 (§10.1.4 — SM-73a Commutativity &amp; Thm. 10.2 Wronskian):</b> Commuting shifts F_k F_l = F_l F_k &amp; discrete Wronskian D(n) ≠ 0.",

    5: "<b>Stage 5 (§10.1.5 &amp; §10.2 — Def. 10.4 Lattice 𝕄_τ^n &amp; Stencil):</b> Backward shift stencil ∇_i = I − E_i⁻¹ (‖∇_i‖_op ≤ 2) on ℓ^∞(𝕄_τ^n).",

    6: "<b>Stage 6 (§10.2 — Defs. 10.5–10.6 Primal K &amp; Voronoi Dual K*):</b> Discrete Hodge star *_τ intertwining primal faces σ₂ with dual edges σ₁*!",

    7: "<b>Stage 7 (§10.3 — Thms. 10.7–10.8 Monomials &amp; Honeycomb Vortex):</b> Triangular area quantum τ = (√3/4)ℓ_P², rotor ŝ &amp; ∇^γ n^γ ≡ γ!.",

    8: "<b>Stage 8 (§10.3 — Thm. 10.12 Discrete Leibniz Cross-Term):</b> 3D product decomposition ∇(uv) = (∇u)v + u(∇v) − (∇u)(∇v) (SM-68a).",

    9: "<b>Stage 9 (§10.3 — Thm. 10.17 3D Discrete Gauss–Stokes Flux Cube):</b> Interior divergence cancels pairwise, leaving exact 6-facet boundary flux!",

    10: "<b>Stage 10 (§10.3–10.6 — Thm. 10.21 Brillouin UV Cutoff &amp; Stage VI):</b> Sine-squared dispersion λ(k) = (4/τ²)∑sin²(k_iτ/2) bounded by Λ_UV = 4/√τ!"

  };



  const STAGE_TELEMETRY = {

    1: "x_i = N_i χ_i τ^{1/p} (SM-63) | N_surf = p(p−1)",

    2: "∇φ(n) = φ(n)−φ(n−1) | ∇²φ(w)∇²φ(w+1) < 0",

    3: "𝒮_{n₁}^{n₂} φ = Φ(n₂) − Φ(n₁−1) (SM-67a)",

    4: "F_k F_l φ = F_l F_k φ | det[∇^{γ−1}y_k] ≠ 0",

    5: "∇_i = I − E_i⁻¹ ∈ ℬ(ℓ^∞(𝕄_τ^n)) | ‖∇_i‖ ≤ 2",

    6: "d_K ∘ d_K ≡ 0 | *_{K*} ∘ *_K = (−1)^{k(n−k)+s}",

    7: "∇^γ n^γ = γ! | τ = (√3/4)ℓ_P² ≈ 1.13e−70 m²",

    8: "∇_i(uv) = (∇_i u)v + u(∇_i v) − (∇_i u)(∇_i v)",

    9: "∑_{Ω} DIV_n A = ∑_i τ_i⁻¹ (Flux_{b_i} − Flux_{a_i−1})",

    10: "λ(k) = ∑ (4/τ_i²) sin²(k_i τ_i / 2) ≤ 16/τ²"

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



  function drawCubeWireframe(cx, cy, cz, s, col, lw, dash, w, h) {

    const v = [];

    for (let dx of [-s, s]) for (let dy of [-s, s]) for (let dz of [-s, s]) {

      v.push(proj(cx + dx, cy + dy, cz + dz, w, h));

    }

    const edges = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];

    edges.forEach(e => drawLine3D(v[e[0]], v[e[1]], col, lw, dash));

  }



  // =========================================================================

  // STAGE RENDERERS (STAGES 1 TO 10)

  // =========================================================================



  // Stage 1: Elementary Metron Cell \tau & 6 Spin-Oriented Boundary 2-Surfaces (Thm. 10.1)

  function renderStage1(w, h) {

    drawCubeWireframe(0, 0, 0, 0.85, "#4169E1", 2.0, null, w, h);

    const faces = [

      { id: "F_xp", x:  0.85, y: 0, z: 0, col: "#20B2AA", lbl: "+ŝ_{yz}" },

      { id: "F_xm", x: -0.85, y: 0, z: 0, col: "#20B2AA", lbl: "−ŝ_{yz}" },

      { id: "F_yp", x: 0, y:  0.85, z: 0, col: "#FFA500", lbl: "+ŝ_{xz}" },

      { id: "F_ym", x: 0, y: -0.85, z: 0, col: "#FFA500", lbl: "−ŝ_{xz}" },

      { id: "F_zp", x: 0, y: 0, z:  0.85, col: "#FFD700", lbl: "+ŝ_{xy}" },

      { id: "F_zm", x: 0, y: 0, z: -0.85, col: "#FFD700", lbl: "−ŝ_{xy}" }

    ];

    faces.forEach(f => {

      drawNode3D(f.id, f.x, f.y, f.z, 7, f.col, "#fff", f.lbl, `Spin-Oriented Metron Boundary Surface ${f.lbl}: N_surfaces(p) = 2C(p,2) = p(p−1) = 6 (Thm. 10.1)`, w, h);

    });

    drawNode3D("Met_Center", 0, 0, 0, 9.5, "#FFD700", "#DC143C", "τ ≈ 1.13×10⁻⁷⁰ m²", "Indivisible Quantum of Geometric Area τ = (√3/4)ℓ_P² (Televarianzbedingung SM-63)", w, h);

  }



  // Stage 2: Metrondifferentiale \nabla\phi & Discrete Osculating Extremwerttheorie (Fig. 10.1)

  function renderStage2(w, h) {

    let prev = null;

    for (let n = 0; n <= 10; n++) {

      const x = (n - 5) * 0.28;

      const z = 0.78 * Math.sin((n - 1.5) * 0.62);

      const isMax = (n === 4), isInf = (n === 6), isMin = (n === 9);

      const col = isMax ? "#20B2AA" : (isInf ? "#FFD700" : (isMin ? "#FFA500" : "#4169E1"));

      const lbl = isMax ? "Max (∇²φ<0)" : (isInf ? "Wendepunkt w" : (isMin ? "Min (∇²φ>0)" : ""));

      const p = drawNode3D(

        "Osc_" + n, x, 0, z, (isMax || isInf || isMin) ? 8.5 : 5, col, "#fff", lbl,

        isInf ? "Discrete Inflection Node w=6: ∇²φ(w)·∇²φ(w+1) < 0 (SM Eq. 68b)" : `Lattice Node n=${n}: φ(n) = ${z.toFixed(2)}`, w, h

      );

      if (prev) drawLine3D(prev, p, "#20B2AA", 2.4);

      prev = p;

    }

  }



  // Stage 3: Metronintegral Telescoping Staircase \mathcal{S}_{n_1}^{n_2}\phi = \Phi(n_2) - \Phi(n_1-1) (SM-67a)

  function renderStage3(w, h) {

    for (let j = 1; j <= 5; j++) {

      const x = (j - 3) * 0.58;

      const zBot = -0.95;

      const zPrev = -0.95 + ((j - 1) * (j - 1)) * 0.075;

      const zCurr = -0.95 + (j * j) * 0.075;

      const isEnd = (j === 5);

      const pBot  = proj(x, 0, zBot, w, h);

      const pPrev = proj(x, 0, zPrev, w, h);

      const pCurr = drawNode3D(

        "Stair_" + j, x, 0, zCurr, isEnd ? 9.5 : 6.5,

        isEnd ? "#FFD700" : "#20B2AA", "#fff",

        isEnd ? "Φ(n₂) = N²" : `Φ(${j})`,

        `Primitive Sequence Φ(${j}) = ${j*j}: Riser ∇Φ(${j}) = Φ(${j})−Φ(${j-1}) = ${2*j-1} telescopes!`, w, h

      );

      drawLine3D(pBot, pPrev, "rgba(65,105,225,0.45)", 4.0);

      drawLine3D(pPrev, pCurr, "#FFD700", 5.5);

    }

  }



  // Stage 4 & 5: Commuting Shifts F_k F_l = F_l F_k, Discrete Wronskian & 3D Stencil \nabla_i = I - E_i^{-1}

  function renderStage4And5(w, h, st) {

    const isStage5 = (st >= 4.5);

    // 3x3x2 Lattice Grid \mathbb{M}_\tau^3 showing backward stencil around central node n

    for (let ix = -1; ix <= 1; ix++) {

      for (let iy = -1; iy <= 1; iy++) {

        const p = proj(ix * 0.85, iy * 0.85, -0.35, w, h);

        if (ix < 1) drawLine3D(p, proj((ix + 1) * 0.85, iy * 0.85, -0.35, w, h), "rgba(65,105,225,0.35)", 1.3);

        if (iy < 1) drawLine3D(p, proj(ix * 0.85, (iy + 1) * 0.85, -0.35, w, h), "rgba(65,105,225,0.35)", 1.3);

      }

    }

    const pCenter = drawNode3D("St_n", 0, 0, -0.35, 10, "#FFD700", "#DC143C", "Node n ∈ 𝕄_τ^n", "Primary Lattice Node n: Backward Difference ∇_i φ(n) = φ(n) − φ(n − e_i)", w, h);

    const pEx = drawNode3D("St_ex", -0.85, 0, -0.35, 8, "#4169E1", "#fff", "E₁⁻¹ n (n−e₁)", "Backward Shift along Axis 1: E₁⁻¹ φ(n) = φ(n₁−1, n₂, n₃)", w, h);

    const pEy = drawNode3D("St_ey", 0, -0.85, -0.35, 8, "#20B2AA", "#fff", "E₂⁻¹ n (n−e₂)", "Backward Shift along Axis 2: E₂⁻¹ φ(n) = φ(n₁, n₂−1, n₃)", w, h);

    const pEz = drawNode3D("St_ez", 0, 0, 0.65, 8, "#FFA500", "#fff", isStage5 ? "E₃⁻¹ n (‖∇_i‖≤2)" : "Wronskian D(n) ≠ 0", isStage5 ? "Def. 10.4 Bounded Operator ∇_i = I − E_i⁻¹ on ℓ^∞(𝕄_τ^n)" : "Thm. 10.2 Discrete Wronskian Determinant det[∇^{γ−1}y_k(n)] ≠ 0 (SM-82)", w, h);



    drawLine3D(pEx, pCenter, "#4169E1", 3.2);

    drawLine3D(pEy, pCenter, "#20B2AA", 3.2);

    drawLine3D(pCenter, pEz, "#FFA500", 3.2);

  }



  // Stage 6: DEC Primal Cubical Complex K & Circumcentric Voronoi Dual Complex K* (*_\tau Hodge Star)

  function renderStage6(w, h) {

    // Primal Cube K centered at (-0.35, -0.35, -0.35) (Blue)

    drawCubeWireframe(-0.32, -0.32, -0.25, 0.68, "#4169E1", 2.2, null, w, h);

    // Circumcentric Voronoi Dual Cube K* shifted by (+0.64, +0.64, +0.50) (Gold dashed)

    drawCubeWireframe(0.32, 0.32, 0.25, 0.68, "#FFD700", 2.0, [4, 3], w, h);



    // Highlight Primal 2-Face \sigma_2 pierced orthogonally by Dual 1-Edge \sigma_1^* = *_K \sigma_2

    const pFace = drawNode3D("Primal_Sig2", 0.36, -0.32, -0.25, 8.5, "#20B2AA", "#fff", "Primal Face σ₂ ∈ K", "Primal 2-Cell σ₂: Coboundary d_K ω(σ₂) = ∮_{∂σ₂} ω satisfies d_K² ≡ 0 (Def. 10.6)", w, h);

    const pDual = drawNode3D("Dual_Sig1", 0.36, 0.32, 0.25, 8.5, "#FFD700", "#DC143C", "Dual Edge σ₁* = *_K σ₂", "Voronoi Dual Cell σ_{n−k}^* ∈ K*: (*_K ω)(σ*) = (|σ*|/|σ|) ω(σ) (Def. 10.5)", w, h);

    drawLine3D(proj(-0.32, -0.32, -0.25, w, h), pDual, "#FFD700", 3.4);

  }



  // Stage 7: Hexagonal Metronic Honeycomb (\tau = \frac{\sqrt{3}}{4}\ell_P^2), Spin Rotor \hat{s} & \nabla^\gamma n^\gamma = \gamma!

  function renderStage7(w, h) {

    const hex = [];

    for (let k = 0; k < 6; k++) {

      const a = timeSec * 0.4 + (k / 6) * Math.PI * 2;

      const x = 1.15 * Math.cos(a), y = 1.15 * Math.sin(a);

      hex.push(drawNode3D("Hex_" + k, x, y, -0.45, 6.5, "#20B2AA", "#fff", k === 0 ? "ℓ_P" : "", "Equilateral Metronic Triangle Vertex: Area τ = (√3/4)ℓ_P² ≈ 1.13115×10⁻⁷⁰ m²", w, h));

    }

    const pHub = drawNode3D("Hex_Hub", 0, 0, -0.45, 8.5, "#4169E1", "#fff", "τ = (√3/4)ℓ_P²", "Honeycomb Center Node: Minimum non-singular radius r_min ≥ √τ (Fig. 10.4)", w, h);

    for (let k = 0; k < 6; k++) {

      drawLine3D(hex[k], hex[(k + 1) % 6], "#20B2AA", 2.4);

      drawLine3D(pHub, hex[k], "rgba(65,105,225,0.65)", 1.8);

    }

    // Vertical Spin Rotor Vector \hat{s} = ROT_N \widehat{\Phi}

    const pSpin = drawNode3D("Spin_s", 0, 0, 0.95, 10, "#FFD700", "#DC143C", "ŝ = ROT_N Φ̂ | ∇^γ n^γ = γ!", "Discrete Spin Rotor Eigenvalue (ŝ; n)_{n=1} = τ̂ & Thm. 10.8 Monomial Identity ∇^γ n^γ = γ!", w, h);

    drawLine3D(pHub, pSpin, "#FFD700", 3.5);

  }



  // Stage 8: Discrete Leibniz Product Cross-Term Box \nabla(uv) = u\nabla v + v\nabla u - (\nabla u)(\nabla v) (Thm. 10.12)

  function renderStage8(w, h) {

    // Main Product Block u(n) v(n) + Crimson Corner Discreteness Cross-Term -(\nabla u)(\nabla v)

    drawCubeWireframe(-0.25, -0.25, -0.15, 0.65, "#4169E1", 2.0, null, w, h);

    drawCubeWireframe( 0.62,  0.62,  0.52, 0.32, "#DC143C", 2.8, null, w, h);



    drawNode3D("Lb_u", -0.9, 0, -0.15, 8, "#4169E1", "#fff", "(∇_i u) v", "First Classical Leibniz Summand (∇_i u)v", w, h);

    drawNode3D("Lb_v", 0, -0.9, -0.15, 8, "#20B2AA", "#fff", "u (∇_i v)", "Second Classical Leibniz Summand u(∇_i v)", w, h);

    drawNode3D("Lb_Cross", 0.62, 0.62, 0.52, 9.5, "#DC143C", "#FFD700", "−(∇_i u)(∇_i v) (SM-68a)", "Thm. 10.12 Non-Linear Discreteness Signature: Scales as O(τ²) → 0 as τ → 0⁺!", w, h);

  }



  // Stage 9: 3D Discrete Gauss-Stokes Divergence Flux Cube (Thm. 10.17, SM-80)

  function renderStage9(w, h) {

    drawCubeWireframe(0, 0, 0, 0.78, "#20B2AA", 2.2, null, w, h);

    const normals = [

      { id: "Fl_xp", dx:  1, dy:  0, dz:  0, lbl: "+Flux_{b₁}" },

      { id: "Fl_xm", dx: -1, dy:  0, dz:  0, lbl: "−Flux_{a₁−1}" },

      { id: "Fl_yp", dx:  0, dy:  1, dz:  0, lbl: "+Flux_{b₂}" },

      { id: "Fl_ym", dx:  0, dy: -1, dz:  0, lbl: "−Flux_{a₂−1}" },

      { id: "Fl_zp", dx:  0, dy:  0, dz:  1, lbl: "+Flux_{b₃}" },

      { id: "Fl_zm", dx:  0, dy:  0, dz: -1, lbl: "−Flux_{a₃−1}" }

    ];

    const pulse = 1.18 + 0.15 * Math.sin(timeSec * 3);

    normals.forEach(nm => {

      const pFace = proj(nm.dx * 0.78, nm.dy * 0.78, nm.dz * 0.78, w, h);

      const pTip  = drawNode3D(nm.id, nm.dx * pulse, nm.dy * pulse, nm.dz * pulse, 6.5, "#FFD700", "#DC143C", nm.lbl, `Thm. 10.17 Discrete Gauss Facet Flux ${nm.lbl}: Interior differences telescope to ∂Ω!`, w, h);

      drawLine3D(pFace, pTip, "#FFD700", 3.0);

    });

    drawNode3D("GS_Core", 0, 0, 0, 8.5, "#20B2AA", "#fff", "∑_Ω DIV_n A", "Interior Volume Divergence Sum equals Net Boundary Flux across all 2n = 6 facets (SM-80)", w, h);

  }



  // Stage 10: 3D Brillouin Zone UV Dispersion Surface \lambda(k) = (4/\tau^2)\sum\sin^2(k_i\tau/2) & Stage VI Polarimeter

  function renderStage10(w, h) {

    // 3D Sine-Squared Brillouin Dispersion Dome over [-\pi/\tau, +\pi/\tau]^2

    for (let u = -1.35; u <= 1.36; u += 0.34) {

      ctx.beginPath();

      ctx.strokeStyle = "#FFA500";

      ctx.lineWidth = 1.8;

      for (let v = -1.35; v <= 1.36; v += 0.17) {

        const ku = (u / 1.35) * (Math.PI * 0.5);

        const kv = (v / 1.35) * (Math.PI * 0.5);

        const lam = -0.85 + 0.92 * (Math.pow(Math.sin(ku), 2) + Math.pow(Math.sin(kv), 2));

        const p = proj(u, v, lam, w, h);

        if (v === -1.35) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    drawNode3D("UV_Zero", 0, 0, -0.85, 8.5, "#20B2AA", "#fff", "k = 0 (IR Continuum)", "Long-Wavelength Continuum Limit: λ(k) ≈ |k|² + O(τ²|k|⁴) (Thm. 10.21)", w, h);

    drawNode3D("UV_Max", 1.35, 1.35, 0.99, 10, "#FFD700", "#DC143C", "Λ_UV = 4/√τ (Brillouin Corner)", "Thm. 10.21 Intrinsic Ultraviolet Cutoff at Brillouin Zone Boundary k_i = ±π/τ!", w, h);

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

    else if (stInt === 4 || stInt === 5) renderStage4And5(w, h, curStage);

    else if (stInt === 6) renderStage6(w, h);

    else if (stInt === 7) renderStage7(w, h);

    else if (stInt === 8) renderStage8(w, h);

    else if (stInt === 9) renderStage9(w, h);

    else renderStage10(w, h);



    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh10Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch10-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch10-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch10-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch10-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch10-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh10Stage = function(val) { window.setCh10Stage(val, true); };



  window.enableCh10Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch10-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh10WithDeck();

  };



  window.toggleCh10Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch10-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh10Spotlight = function() {

    const hud = document.getElementById('ch10-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh10Minimize = function() {

    const hud = document.getElementById('ch10-3d-hud');

    const b = document.getElementById('ch10-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh10WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch10-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-10, section[data-chapter="10"]') : true;
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
      window.setCh10Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh10WithDeck = syncCh10WithDeck;
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

    const insp = document.getElementById('ch10-node-inspector');

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

    syncCh10WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    const synBindSync_syncCh10WithDeck = () => {
      syncCh10WithDeck();
    };

    window.addEventListener('scroll', synBindSync_syncCh10WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh10WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh10WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh10WithDeck, { passive: true });

    const revEl_syncCh10WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh10WithDeck) {
      revEl_syncCh10WithDeck.addEventListener('scroll', synBindSync_syncCh10WithDeck, { passive: true });
      revEl_syncCh10WithDeck.addEventListener('touchmove', synBindSync_syncCh10WithDeck, { passive: true });
    }
    const vpEl_syncCh10WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh10WithDeck) {
      vpEl_syncCh10WithDeck.addEventListener('scroll', synBindSync_syncCh10WithDeck, { passive: true });
      vpEl_syncCh10WithDeck.addEventListener('touchmove', synBindSync_syncCh10WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh10WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh10WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh10WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh10WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh10WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh10WithDeck);
    }

    const hud = document.getElementById('ch10-3d-hud');

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
    document.addEventListener('DOMContentLoaded', runCh10Engine);
  } else {
    runCh10Engine();
  }
})();
