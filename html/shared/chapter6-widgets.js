window.showGenericTab = function(prefix, idx, maxIdx, btnEl) {
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

// WIDGET 1: §6.1.1 Monodromie vs Polydromie & Area Hierarchy (SM-27)
window.polyMode = 4;
window.setPolyMode = function(pmu) {
  const el = document.getElementById('ar-pmu');
  if (el) { el.value = pmu; window.updateAreaLab(); }
};

window.updateAreaLab = function() {
  const elPmu = document.getElementById('ar-pmu');
  if (!elPmu) return;
  let pmu = parseInt(elPmu.value);
  let q = parseInt(document.getElementById('ar-q').value);
  document.getElementById('ar-pmu-val').innerText = pmu;
  document.getElementById('ar-q-val').innerText = `AR_${q}`;

  const btnM = document.getElementById('btn-mono');
  const btnP = document.getElementById('btn-poly');
  if (btnM && btnP) {
    if (pmu === 1) {
      btnM.style.background = '#FFD700'; btnM.style.color = '#000'; btnM.style.fontWeight = 'bold';
      btnP.style.background = '#1e293b'; btnP.style.color = '#FFD700'; btnP.style.fontWeight = 'normal';
    } else {
      btnP.style.background = '#FFD700'; btnP.style.color = '#000'; btnP.style.fontWeight = 'bold';
      btnM.style.background = '#1e293b'; btnM.style.color = '#FFD700'; btnM.style.fontWeight = 'normal';
    }
  }

  const svg = document.getElementById('ar-svg');
  if (svg) {
    let html = `<rect x="8" y="8" width="194" height="104" rx="6" fill="none" stroke="#334155" stroke-dasharray="3,2"/>`;
    if (pmu === 1) {
      html += `<path d="M 20,60 Q 105,25 190,60" fill="none" stroke="#20B2AA" stroke-width="3.5"/>`;
      html += `<circle cx="20" cy="60" r="5" fill="#4169E1"/><circle cx="190" cy="60" r="6" fill="#FFD700"/>`;
    } else {
      html += `<line x1="20" y1="60" x2="82" y2="60" stroke="#4169E1" stroke-width="3.2"/>`;
      html += `<circle cx="82" cy="60" r="5.5" fill="#DC143C"/>`;
      for (let i = 0; i < pmu; i++) {
        let frac = pmu === 1 ? 0 : (i / (pmu - 1)) * 2 - 1;
        let yEnd = 60 + frac * 42;
        html += `<path d="M 82,60 Q 135,${(60 + frac*18).toFixed(1)} 190,${yEnd.toFixed(1)}" fill="none" stroke="#FFA500" stroke-width="2.2"/>`;
        html += `<circle cx="190" cy="${yEnd.toFixed(1)}" r="4" fill="#FFD700"/>`;
      }
    }
    svg.innerHTML = html;
  }

  const box = document.getElementById('ar-readout');
  if (box) {
    let regStr = pmu === 1 ? "MONODROMIE (Unique Deterministic Trajectory)" : `POLYDROMIE (Branching Tuft of P_μ = ${pmu} Paths at Polydromiepunkt x₀)`;
    box.innerHTML = `<b>Regime:</b> <span style="color:#FFD700;">${regStr}</span> | <b>SM Eq. 27 (Order q=${q}):</b> AR_${q} bundles P_${q-1} sub-areas of order ${q-1} between (T₁, T₂).`;
  }
};

// WIDGET 2: §6.1.2 & Thm. 6.13 Telecentre Dimensionality & Foliation Lab
window.updateTeleDimLab = function() {
  const elN = document.getElementById('tc-n');
  if (!elN) return;
  let n = parseInt(elN.value);
  let g1In = document.getElementById('tc-g1');
  let g2In = document.getElementById('tc-g2');
  g1In.max = n - 1;
  g2In.max = n - 1;
  let g1 = Math.min(n - 1, parseInt(g1In.value));
  let g2 = Math.min(n - 1, parseInt(g2In.value));
  g1In.value = g1;
  g2In.value = g2;

  document.getElementById('tc-n-val').innerText = n;
  document.getElementById('tc-g1-val').innerText = g1;
  document.getElementById('tc-g2-val').innerText = g2;

  const names = ["Punkttelezentrum (0D Point)", "Linientelezentrum (1D Curve)", "Flächentelezentrum (2D Surface)", "Raumtelezentrum (3D Volume)", "4D Hypertelezentrum", "5D Hypertelezentrum"];
  let gMin = Math.min(g1, g2), gMax = Math.max(g1, g2);
  let folStr = (g1 === g2)
    ? `Equal Dimensions (γ₁ = γ₂ = ${g1}) ⇒ <b>Unique connecting Telezentrale of dimension γ₁ + 1 = ${g1 + 1}</b>`
    : `Unequal Dimensions (γmax = ${gMax} > γmin = ${gMin}) ⇒ <b>(${gMax - gMin})-parameter family of (${gMin + 1})-dim Telezentralen foliating a region of dim ${gMax + 1}</b>`;

  const box = document.getElementById('tc-readout');
  if (box) {
    box.innerHTML =
      `<b>Prop. 6.3 Names (0 ≤ γ_k ≤ ${n-1}):</b> T_{z,1} is a <span style="color:#5eead4;">${names[g1]}</span> | T_{z,2} is a <span style="color:#fcd34d;">${names[g2]}</span><br>` +
      `<b>Thm. 6.13 Foliation:</b> ${folStr}`;
  }
};

// WIDGET 3: §6.2.1 Far-Centered Collector Bifurcation Cycle
window.updateCollectorLab = function() {
  const elP = document.getElementById('col-pmu');
  if (!elP) return;
  let pmu = parseInt(elP.value);
  let sPct = parseInt(document.getElementById('col-s').value);
  document.getElementById('col-pmu-val').innerText = pmu;
  document.getElementById('col-s-val').innerText = sPct + '%';

  let s = sPct / 100.0;
  const svg = document.getElementById('col-svg');
  if (svg) {
    let html = `
      <line x1="18" y1="62" x2="88" y2="62" stroke="#4169E1" stroke-width="3.5"/>
      <circle cx="88" cy="62" r="6" fill="#FFA500" stroke="#000" stroke-width="1.5"/>
      <text x="88" y="82" fill="#FFA500" font-size="9.5" font-weight="bold" text-anchor="middle">x₀ ∈ D_ext</text>
      <circle cx="355" cy="62" r="18" fill="rgba(32,178,170,0.3)" stroke="#FFD700" stroke-width="2.5"/>
      <text x="355" y="66" fill="#FFD700" font-size="10.5" font-weight="bold" text-anchor="middle">Col 𝔎</text>
    `;
    let xDot = 88 + s * (355 - 88);
    for (let i = 0; i < pmu; i++) {
      let frac = (i / (pmu - 1)) * 2 - 1;
      let amp = frac * 42;
      let pts = [];
      for (let k = 0; k <= 40; k++) {
        let u = k / 40.0;
        let px = 88 + u * (355 - 88);
        let py = 62 + amp * Math.sin(Math.PI * u);
        pts.push((k === 0 ? "M " : "L ") + px.toFixed(1) + "," + py.toFixed(1));
      }
      html += `<path d="${pts.join(' ')}" fill="none" stroke="#20B2AA" stroke-width="2"/>`;
      let dy = 62 + amp * Math.sin(Math.PI * s);
      html += `<circle cx="${xDot.toFixed(1)}" cy="${dy.toFixed(1)}" r="4.5" fill="#FFD700"/>`;
    }
    svg.innerHTML = html;
  }

  const box = document.getElementById('col-readout');
  if (box) {
    box.innerHTML =
      `<b>Def. 6.4 Heteroclinic Collector Cycle:</b> W^u(x₀) ≅ ℝ^${pmu} branches at Polydromy saddle x₀ ∈ D_ext, while W^u_tele(x₀) = W^u(x₀)\\{x₀} ⊆ B(𝔎) reconverges to Collector 𝔎 ` +
      (sPct >= 96 ? `<span style="color:#FFD700;"><b>(CAPTURED AT TELEZENTRUM 𝔎!)</b></span>` : `(Progress ${sPct}%)`);
  }
};

// WIDGET 4: §6.2.2 Universal Coalgebra Tab Switcher
window.showCoalgTab = function(idx, btnEl) {
  for (let i = 1; i <= 4; i++) {
    const p = document.getElementById('coalg-pane-' + i);
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

// WIDGET 5: §6.2.2 Stage V Telecentric Phase-Locking
window.updateStage5 = function() {
  const elTh0 = document.getElementById('st5-th0');
  if (!elTh0) return;
  let deg0 = parseFloat(elTh0.value);
  let t = parseFloat(document.getElementById('st5-t').value);
  document.getElementById('st5-th0-val').innerText = (deg0 >= 0 ? '+' : '') + deg0 + '°';
  document.getElementById('st5-t-val').innerText = t.toFixed(1) + 's';

  let th0 = deg0 * Math.PI / 180.0;
  let th_t = 2.0 * Math.atan(Math.exp(-t) * Math.tan(th0 / 2.0));
  let deg_t = th_t * 180.0 / Math.PI;
  let psi0 = 1.0 - Math.cos(th0);
  let psi_t = 1.0 - Math.cos(th_t);
  let bound = Math.exp(-t) * psi0;

  let xEnd = 105 + 50 * Math.cos(-th_t);
  let yEnd = 68 + 50 * Math.sin(-th_t);
  document.getElementById('st5-vec').setAttribute('x2', xEnd.toFixed(1));
  document.getElementById('st5-vec').setAttribute('y2', yEnd.toFixed(1));
  document.getElementById('st5-tip').setAttribute('cx', xEnd.toFixed(1));
  document.getElementById('st5-tip').setAttribute('cy', yEnd.toFixed(1));

  document.getElementById('st5-svg-eq').textContent = `θ(t) = ${deg_t >= 0 ? '+' : ''}${deg_t.toFixed(2)}°`;
  document.getElementById('st5-svg-psi').textContent = `Ψ(θ(t)) = ${psi_t.toFixed(4)} ≤ e⁻ᵗ Ψ(0) = ${bound.toFixed(4)}`;

  document.getElementById('st5-readout').innerHTML =
    `<b>Exact Stream !ₐ(θ₀) ∈ νT_ℝ:</b> tan(θ(t)/2) = e⁻ᵗ tan(θ₀/2)  ⇒  <b>Ψ(t) = ${psi_t.toFixed(4)}</b> ` +
    (Math.abs(deg_t) < 2.0 ? `<span style="color:#FFD700;"><b>(SYNCHRONIZED AT TELEZENTRUM θ = 0!)</b></span>` : `(Converging exponentially to T_z)`);
};

// WIDGET 6: §6.3.1–6.3.2 Double-Well Basin & Separatrix D_ext
window.initDoubleWellCurve = function() {
  const path = document.getElementById('dw-curve');
  if (!path) return;
  let pts = [];
  for (let i = 0; i <= 100; i++) {
    let x = -1.65 + (i / 100.0) * 3.30;
    let psi = Math.pow(x * x - 1.0, 2);
    let sx = 210 + x * 90;
    let sy = 120 - psi * 36;
    pts.push((i === 0 ? "M " : "L ") + sx.toFixed(1) + "," + sy.toFixed(1));
  }
  path.setAttribute('d', pts.join(" "));
};

window.updateDoubleWell = function() {
  const elX0 = document.getElementById('dw-x0');
  if (!elX0) return;
  let x0 = parseFloat(elX0.value);
  document.getElementById('dw-x0-val').innerText = (x0 >= 0 ? '+' : '') + x0.toFixed(2);

  let psi = Math.pow(x0 * x0 - 1.0, 2);
  let grad = 4.0 * x0 * (x0 * x0 - 1.0);
  let sx = 210 + x0 * 90;
  let sy = 120 - psi * 36;

  let ball = document.getElementById('dw-ball');
  ball.setAttribute('cx', sx.toFixed(1));
  ball.setAttribute('cy', sy.toFixed(1));

  let box = document.getElementById('dw-readout');
  if (Math.abs(x0) < 0.03) {
    ball.setAttribute('fill', '#DC143C');
    box.style.borderLeftColor = "#DC143C";
    box.innerHTML = `<span style="color:#ff6b81;"><b>⚠ ON EXTINKTIONSDISKRIMINANTE D_ext (x₀ = 0.00, Index-1 Saddle p₀):</b></span><br>` +
      `grad Ψ(0) = 0, Hess Ψ(0) = -4 &lt; 0. Whitney-stratified separatrix W^s(p₀) between B(T_{z,1}) and B(T_{z,2})!`;
  } else if (x0 < 0) {
    ball.setAttribute('fill', '#20B2AA');
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<span style="color:#20B2AA;"><b>✓ TELEVARIANT BASIN B(T_{z,1}) = (-∞, 0):</b></span> Ψ(x₀) = ${psi.toFixed(3)}, X_AR = -Ψ'(x₀) = ${(-grad).toFixed(2)}<br>` +
      `Exponential Grönwall convergence to left Telezentrum <b>T_{z,1} = -1</b>!`;
  } else {
    ball.setAttribute('fill', '#FFD700');
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>✓ TELEVARIANT BASIN B(T_{z,2}) = (0, +∞):</b></span> Ψ(x₀) = ${psi.toFixed(3)}, X_AR = -Ψ'(x₀) = ${(-grad).toFixed(2)}<br>` +
      `Exponential Grönwall convergence to right Telezentrum <b>T_{z,2} = +1</b>!`;
  }
};

// WIDGET 7: §6.3.3 Telezentralenrelativität Stratum Escalator
window.setTransStratum = function(m) {
  let cards = document.getElementById('trans-cards');
  let box = document.getElementById('trans-readout');
  if (!cards || !box) return;

  let cLeft = `
    <div style="background:rgba(65,105,225,0.15); border:1.5px solid #4169E1; border-radius:8px; padding:8px;">
      <b style="color:#82aaff;">Stratum C(${m}) := Coalg(T_${m})</b><hr style="border-color:#2d3748; margin:4px 0;">
      <div style="color:#FFD700; font-weight:bold;">★ Haupttelezentrum: νT_${m}</div>
      <div style="font-size:0.9em; color:#cbd5e1;">Absolute Terminal Coalgebra Goal of Stratum C(${m})</div>
    </div>`;

  let cRight = `
    <div style="background:rgba(32,178,170,0.15); border:1.5px solid #20B2AA; border-radius:8px; padding:8px;">
      <b style="color:#5eead4;">Stratum C(${m+1}) := Coalg(T_${m+1})</b><hr style="border-color:#2d3748; margin:4px 0;">
      <div style="color:#FFA500; font-weight:bold;">↳ Nebentelezentrum: Γ_${m}(νT_${m}) ≅ HypMet_${m+1}</div>
      <div style="color:#FFD700; font-weight:bold; margin-top:3px;">★ New Higher Goal: νT_${m+1} ≇ Γ_${m}(νT_${m})</div>
    </div>`;

  cards.innerHTML = cLeft + cRight;
  box.innerHTML =
    `<b>Transzendenzsynkolator Adjunction (Γ_${m} ⊣ U_${m+1}, Thm. 6.19):</b> ` +
    `The terminal attractor <b>νT_${m}</b> of C(${m}) is demoted by left adjoint Γ_${m} into the initial generating building block <b>HypMet_${m+1}</b> on the way to <b>νT_${m+1}</b>!`;
};

// WIDGET 8A: §6.3.4 Morse-Poincare-Hopf Even Parity Explorer
window.updateMorseParity = function() {
  const elC0 = document.getElementById('mp-c0');
  if (!elC0) return;
  let c0 = parseInt(elC0.value);
  let c1 = c0;
  let mu = c0 + c1;
  document.getElementById('mp-c0-val').innerText = c0;

  const svg = document.getElementById('mp-svg');
  if (svg) {
    let html = `<circle cx="0" cy="0" r="46" fill="none" stroke="#20B2AA" stroke-width="2.2"/>`;
    for (let k = 0; k < c0; k++) {
      let aAtt = (k / c0) * 2 * Math.PI - Math.PI / 2;
      let aSad = ((k + 0.5) / c0) * 2 * Math.PI - Math.PI / 2;
      let ax = (46 * Math.cos(aAtt)).toFixed(1), ay = (46 * Math.sin(aAtt)).toFixed(1);
      let sx = (46 * Math.cos(aSad)).toFixed(1), sy = (46 * Math.sin(aSad)).toFixed(1);
      html += `<circle cx="${ax}" cy="${ay}" r="6" fill="#FFD700" stroke="#000" stroke-width="1"/>`;
      html += `<circle cx="${sx}" cy="${sy}" r="5.5" fill="#DC143C" stroke="#000" stroke-width="1"/>`;
    }
    svg.innerHTML = html;
  }

  const box = document.getElementById('mp-readout');
  if (box) {
    box.innerHTML =
      `<b>χ(Ω) = c₀ - c₁ = ${c0} - ${c1} = 0:</b> Total Secondary Centers μ = c₀ + c₁ = 2c₀ = <b style="color:#FFD700;">${mu} (Strictly Even!)</b> paired by μ/2 = <b>${c0}</b> geodetic Telezentralen.`;
  }
};

// WIDGET 8B: §6.3.4 Eyring-Kramers Survival & Resynkolation Lab
window.updateKramers = function() {
  const elDe = document.getElementById('kr-de');
  if (!elDe) return;
  let de = parseFloat(elDe.value);
  let eps = parseFloat(document.getElementById('kr-eps').value);
  document.getElementById('kr-de-val').innerText = de.toFixed(2);
  document.getElementById('kr-eps-val').innerText = eps.toFixed(2);

  let ratio = de / eps;
  let tauSurv = Math.exp(ratio);
  let box = document.getElementById('kr-readout');

  if (ratio < 2.0) {
    box.style.borderLeftColor = "#DC143C";
    box.innerHTML =
      `<span style="color:#ff6b81;"><b>⚠ METASTABLE EXTINCTION RISK (ΔE / ε_fluct = ${ratio.toFixed(2)} &lt; 2.0):</b></span><br>` +
      `Eyring–Kramers Survival Time τ_surv ∝ exp(ΔE/ε) = <b>${tauSurv.toFixed(1)} steps</b>. Imminent dysvariant escape across D_ext! Click <b>Trigger Resynkolation</b>!`;
  } else {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML =
      `<span style="color:#20B2AA;"><b>✓ TELEVARIANTLY STABILIZED BASIN (ΔE / ε_fluct = ${ratio.toFixed(2)} ≥ 2.0):</b></span><br>` +
      `Eyring–Kramers Mean Survival Time τ_surv ∝ exp(ΔE/ε) = <b style="color:#FFD700;">${tauSurv > 1000 ? tauSurv.toExponential(2) : tauSurv.toFixed(1)} steps</b> (Protected against thermal escape).`;
  }
};

window.triggerResynkolation = function() {
  document.getElementById('kr-de').value = 2.6;
  document.getElementById('kr-eps').value = 0.30;
  window.updateKramers();
};

// ---------------------------------------------------------------------------
// VIDEO CONTROL: play Manim clips only while their slide is visible
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

// ---------------------------------------------------------------------------
// WIDGET WIRING (runs once; slide changes no longer reset widget state)
// ---------------------------------------------------------------------------
function renderAllCh6Widgets() {
  window.updateAreaLab();
  window.updateTeleDimLab();
  window.updateCollectorLab();
  window.updateStage5();
  window.initDoubleWellCurve();
  window.updateDoubleWell();
  window.setTransStratum(0);
  window.updateMorseParity();
  window.updateKramers();
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

let synInitialised = false;
function initChapter6() {
  if (synInitialised) return;
  synInitialised = true;
  prepareVideos();
  bindControlsOnce();
  renderAllCh6Widgets();
  syncVideosToSlide();
}

if (window.Reveal && window.Reveal.on) {
  window.Reveal.on('ready', initChapter6);
  window.Reveal.on('slidechanged', syncVideosToSlide);
  window.Reveal.on('fragmentshown', syncVideosToSlide);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter6();
  });
} else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
  initChapter6();
}
