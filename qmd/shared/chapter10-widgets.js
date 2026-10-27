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
      el.addEventListener('keydown', e => e.stopPropagation());
      el.addEventListener('mousedown', e => e.stopPropagation());
      el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
    });
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
