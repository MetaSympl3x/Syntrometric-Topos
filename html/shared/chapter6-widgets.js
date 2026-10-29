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
    el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());
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

// =========================================================================
// CHAPTER 6: 60FPS 3D INTERACTIVE COALGEBRA, LYAPUNOV BASIN & SEPARATRIX ENGINE
// =========================================================================

const CH6_3D_STYLE = `
#ch6-3d-hud {
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

#ch6-3d-hud *, #ch6-3d-hud *::before, #ch6-3d-hud *::after {
  box-sizing: border-box;
}

#ch6-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch6-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch6-3d-hud.minimized .ch6-hud-body {
  display: none;
}

.ch6-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch6-hud-title {
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

.ch6-hud-title span:first-child {
  line-height: 1.15;
}

.ch6-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch6-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch6-hud-btn {
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

.ch6-hud-btn:hover, .ch6-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch6-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch6-canvas-wrap:active {
  cursor: grabbing;
}

#ch6-3d-hud.spotlight .ch6-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch6-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch6-overlay-bar {
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

.ch6-telemetry {
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

#ch6-node-inspector {
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

.ch6-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch6-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch6-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch6-scrubber .ch6-hud-btn {
  flex-shrink: 0;
}

#ch6-caption {
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
  #ch6-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch6-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch6-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch6-hud-controls {
    gap: 3px;
  }
  .ch6-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch6-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch6-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch6-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch6-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch6-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch6-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch6-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch6-hud-controls {
    gap: 3px;
  }
  .ch6-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch6-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch6-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch6-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch6-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch6-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch6-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch6-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH6_3D_HTML = `
<div class="ch6-hud-header">

    <div class="ch6-hud-title">

      <span>🎯 Ch 6 · 3D Telezentrik Engine</span>

      <span id="ch6-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch6-hud-controls">

      <button class="ch6-hud-btn active" id="ch6-btn-orbit" onclick="toggleCh6Orbit()">⟳ Orbit</button>

      <button class="ch6-hud-btn" onclick="toggleCh6Spotlight()">⛶ Spotlight</button>

      <button class="ch6-hud-btn" id="ch6-btn-min" onclick="toggleCh6Minimize()">+</button>

    </div>

  </div>



  <div class="ch6-hud-body">

    <div class="ch6-canvas-wrap" id="ch6-canvas-wrap">

      <canvas id="ch6-3d-canvas"></canvas>

      <div class="ch6-overlay-bar">

        <div class="ch6-telemetry" id="ch6-telemetry">(ν𝒯, ζ) | V̇ ≤ −γV</div>

        <div id="ch6-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch6-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <input type="range" id="ch6-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh6Stage(this.value)">

      <button class="ch6-hud-btn active" id="ch6-btn-sync" onclick="enableCh6Sync()">Auto-Sync</button>

    </div>



    <div id="ch6-caption">

      <b>Stage 1 (§6.1.1 — SM-27):</b> Polydromic branching tuft (P_μ = 4) between guiding attractors (T₁, T₂) in Area AR_q.

    </div>

  </div>
`;

function injectCh63DHUD() {
  if (document.getElementById('ch6-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH6_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch6-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH6_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch6_3d_engine_loaded) return;
  window.__ch6_3d_engine_loaded = true;

  function runCh6Engine() {
    injectCh63DHUD();
    if (window.__ch6_3d_engine_initialized) return;
    window.__ch6_3d_engine_initialized = true;

const canvas = document.getElementById('ch6-3d-canvas');

  const wrap = document.getElementById('ch6-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.46;

  let camPitch = 0.36;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§6.1.1 — SM-27 Mono-/Polydromie &amp; Area AR_q):</b> Polydromic branching tuft P_μ = 4 at saddle x₀ bounded by attractors (T₁, T₂).",

    2: "<b>Stage 2 (§6.1.2–6.1.4 — Televarianz vs. Dysvarianz):</b> Televariant orbits W_tele ⊂ B(T_z) (−grad Ψ) vs. Dysvariant escape across D_ext.",

    3: "<b>Stage 3 (§6.2.1 — Def. 6.4 Far-Centered Collector 𝔎):</b> Unstable tuft W^u_tele(x₀) reconverges into Far-Centered Collector 𝔎 at distance L > 0.",

    4: "<b>Stage 4 (§6.2.2 — Thm. 6.7 &amp; Prop. 6.8 Final Coalgebra (ν𝒯, ζ)):</b> Terminal cone lim_k 𝒯^k(1), universal arrow !ₐ &amp; Lambek fixed point ζ.",

    5: "<b>Stage 5 (Stage V Polarimeter &amp; Thm. 6.10 Lyapunov Stability):</b> Coercive PL basin V̇ ≤ −γV driving exponential convergence dist(Φ_t, 𝒜) ≤ C e^{−γt/2}.",

    6: "<b>Stage 6 (§6.3.2 — Thm. 6.14 Morse–Smale Separatrix D_ext):</b> 3D Double-Well surface Ψ(x,y) = (x²−1)²+y² split by crimson ridge D_ext = W^s(p₀).",

    7: "<b>Stage 7 (Thm. 6.13 Telezentralen Foliations &amp; Thm. 6.16):</b> Geodesic Telezentralen foliating between γ₁=0 and γ₂=1 attractors + metastable recovery.",

    8: "<b>Stage 8 (§6.3.3 — Thm. 6.19 Telezentralenrelativität):</b> Left adjoint Γ_m ⊣ U_{m+1} maps terminal ν𝒯_m in C(m) to basal Nebentelezentrum in C(m+1)!",

    9: "<b>Stage 9 (§6.3.4 — Thm. 6.20 Even Parity μ=2c₀ &amp; Thm. 6.21 Resynkolation):</b> Morse–Poincaré–Hopf ring (3 attractors + 3 saddles) &amp; Kramers barrier deepening!",

    10: "<b>Stage 10 (§6.4–6.6 — Completion of Teil A &amp; Pivot to Teil B):</b> Teil A Synthesis Crown projecting onto the Number Field Triad Coeff = [ℚ ⊆ ℝ ⊆ ℂ]."

  };



  const STAGE_TELEMETRY = {

    1: "AR_q ≡ AR_{(T₁)}^{(T₂)}[(AR_{q−1})]_1^{P_{q−1}} (SM-27)",

    2: "W_tele ⊂ B(T_z) | D_ext = ∂B(T_z)",

    3: "W^u_tele(x₀) ⊆ B(𝔎) | γ ∈ {0, 1, 2, 3}",

    4: "ν𝒯 = lim_{k<ω} 𝒯^k(1) | ζ : ν𝒯 ≅ 𝒯(ν𝒯)",

    5: "V̇ ≤ −γV ⇒ dist(Φ_t, 𝒜) ≤ √(2V₀/μ) e^{−γt/2}",

    6: "D_ext = ⋃_{ind(p_r)≥1} W^s(p_r) (Thm. 6.14)",

    7: "dim(Telezentrale) = γ₁ + 1 (Thm. 6.13)",

    8: "Γ_m(ν𝒯_m) ≅ HypMet_{m+1} ≇ ν𝒯_{m+1}",

    9: "χ(Ω)=0 ⇒ μ = 2c₀ ∈ 2ℕ | τ_surv ~ exp(ΔE/ε)",

    10: "Teil A Complete ⇒ Pivot to Coeff = [ℚ⊆ℝ⊆ℂ]"

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



  // Stage 1 & 3: Polydromic Branching Tuft (SM-27) & Far-Centered Collector \mathcal{K} (Def. 6.4)

  function renderStage1And3(w, h, st) {

    const isCollector = (st >= 2.5);

    const pIn  = drawNode3D("In_State", -1.45, 0, 0, 7, "#4169E1", "#fff", "S₀", "Initial Metroplexäondyne State before Polydromy Saddle", w, h);

    const pSad = drawNode3D("Sad_x0",   -0.55, 0, 0, 8.5, "#DC143C", "#FFD700", "x₀ ∈ D_ext", "Polydromie Bifurcation Saddle x₀: Branches into P_μ = 4 paths", w, h);

    drawLine3D(pIn, pSad, "#4169E1", 3.0);



    const pCol = isCollector

      ? drawNode3D("Col_K", 1.35, 0, 0, 10.5, "#FFD700", "#20B2AA", "Collector 𝔎 (L > 0)", "Far-Centered Collector 𝔎 capturing unstable tuft W^u_tele(x₀) ⊆ B(𝔎) (Def. 6.4)", w, h)

      : null;



    for (let b = 0; b < 4; b++) {

      const ang = (b / 4) * Math.PI * 2 + timeSec * 0.6;

      const radY = 0.75 * Math.cos(ang);

      const radZ = 0.75 * Math.sin(ang);

      ctx.beginPath();

      ctx.strokeStyle = b % 2 === 0 ? "#20B2AA" : "#FFA500";

      ctx.lineWidth = 2.4;

      for (let i = 0; i <= 40; i++) {

        const s = i / 40;

        const env = isCollector ? Math.sin(s * Math.PI) : s;

        const x = -0.55 + s * 1.9;

        const p = proj(x, radY * env, radZ * env, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      if (!isCollector) {

        drawNode3D("Tuft_" + b, 1.35, radY, radZ, 6.5, "#20B2AA", "#fff", `T_{z,${b+1}}`, `Competing Polydromic Attractor Branch ${b+1} in AR_q`, w, h);

      }

    }

  }



  // Stage 2: Televarianz (Inward Basin Spiral) vs Dysvarianz (Outward Escape across D_ext)

  function renderStage2(w, h) {

    // Separatrix Ring D_ext = \partial B(T_z)

    ctx.beginPath();

    ctx.strokeStyle = "#DC143C";

    ctx.lineWidth = 2.6;

    ctx.setLineDash([5, 3]);

    for (let i = 0; i <= 48; i++) {

      const a = (i / 48) * Math.PI * 2;

      const p = proj(1.05 * Math.cos(a), 1.05 * Math.sin(a), 0, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();

    ctx.setLineDash([]);



    // Inward Televariant Spiral W_tele -> T_z

    ctx.beginPath();

    ctx.strokeStyle = "#20B2AA";

    ctx.lineWidth = 2.8;

    for (let i = 0; i <= 70; i++) {

      const s = i / 70;

      const r = 0.95 * (1 - s * 0.9);

      const a = s * Math.PI * 5 + timeSec * 2;

      const p = proj(r * Math.cos(a), r * Math.sin(a), -0.75 * s, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    // Outward Dysvariant Trajectory W_dys -> Nullsyntrix

    const dysA = timeSec * 1.2;

    const pDys = drawNode3D("W_dys", 1.48 * Math.cos(dysA), 1.48 * Math.sin(dysA), 0.55, 7, "#DC143C", "#fff", "W_dys → 0_Syn", "Dysvariant Trajectory crossing D_ext into structural/functional decay", w, h);

    drawLine3D(proj(1.05 * Math.cos(dysA), 1.05 * Math.sin(dysA), 0, w, h), pDys, "#DC143C", 2.4);

    drawNode3D("Tz_Center", 0, 0, -0.75, 10, "#FFD700", "#20B2AA", "T_z (W_tele)", "Televariant Telezentrum Attractor minimizing Friston Free Energy", w, h);

  }



  // Stage 4: Final Telecentric Coalgebra (\nu\mathcal{T}_{\mathbb{R}}, \zeta) & Lambek Isomorphism

  function renderStage4(w, h) {

    // Adamek-Aczel Terminal Sequence Rings 1 <- T(1) <- T^2(1) <- \nu T

    const levels = [

      { z: -1.1, r: 1.35, col: "#4169E1", lbl: "𝒯¹(1)" },

      { z: -0.4, r: 0.95, col: "#20B2AA", lbl: "𝒯²(1)" },

      { z:  0.3, r: 0.55, col: "#FFA500", lbl: "𝒯^k(1)" }

    ];

    levels.forEach((lv, idx) => {

      ctx.beginPath();

      ctx.strokeStyle = lv.col;

      ctx.lineWidth = 2.0;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const p = proj(lv.r * Math.cos(a), lv.r * Math.sin(a), lv.z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      drawNode3D("Term_" + idx, lv.r, 0, lv.z, 6.5, lv.col, "#fff", lv.lbl, `Terminal Sequence Approximant ${lv.lbl} in Diff_smooth (Thm. 6.7)`, w, h);

    });

    const pNu = drawNode3D("Nu_T", 0, 0, 1.05, 11.5, "#FFD700", "#fff", "ν𝒯 ≅ 𝒯(ν𝒯) (Lambek ζ)", "Final Telecentric Coalgebra (ν𝒯, ζ): Unique mediating arrow !ₐ : (S,α) → ν𝒯 (Prop. 6.8)", w, h);

    const pS  = drawNode3D("State_S", -1.25, 0.6, -0.9, 8, "#20B2AA", "#fff", "(S, α)", "Local Dynamical System Coalgebra (S, α : S → 𝒯(S))", w, h);

    drawLine3D(pS, pNu, "#FFD700", 3.0, [5, 3]);

  }



  // Stage 5: Stage V Coupled Polarimeter Phase-Locking & Coercive PL Basin (Thm. 6.10)

  function renderStage5(w, h) {

    // 3D Paraboloid Bowl V(\theta) = 1 - \cos\theta \ge \frac{\mu}{2}\theta^2

    for (let r = 0.35; r <= 1.41; r += 0.35) {

      ctx.beginPath();

      ctx.strokeStyle = "rgba(65,105,225,0.48)";

      ctx.lineWidth = 1.6;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const z = -0.95 + 0.85 * r * r;

        const p = proj(r * Math.cos(a), r * Math.sin(a), z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    const decay = Math.exp(-((timeSec % 3.5) * 0.95));

    const rad = 1.3 * decay;

    const ang = timeSec * 3.0;

    const bx = rad * Math.cos(ang), by = rad * Math.sin(ang), bz = -0.95 + 0.85 * rad * rad;

    drawNode3D("Pol_Ball", bx, by, bz, 7.5, "#FFD700", "#000", "θ(t) → 0", "Stage V Polarimeter State: dist(Φ_t(x₀), 𝒜) ≤ √(2V₀/μ) e^{−γt/2} (Thm. 6.10)", w, h);

    drawNode3D("Pol_Min", 0, 0, -0.95, 10, "#20B2AA", "#FFD700", "θ_target = 0 (T_z)", "Synchronized Polarimeter Telezentrum Ψ(0) = 0", w, h);

  }



  // Stage 6, 7 & 9: 3D Double-Well Lyapunov Surface \Psi(x,y) = (x^2-1)^2 + y^2, Separatrix D_ext & Kramers

  function renderStage6And7And9(w, h, st) {

    const isStage7 = (st >= 6.5 && st < 7.5);

    const isStage9 = (st >= 8.5);

    const wellScale = isStage9 ? (0.28 + 0.14 * Math.sin(timeSec * 2)) : 0.22;

    const zFn = (u, v) => -0.85 + wellScale * Math.pow(u * u - 1.35, 2) + 0.28 * v * v;



    for (let u = -1.6; u <= 1.61; u += 0.32) {

      ctx.beginPath();

      const isRidge = Math.abs(u) < 0.05;

      ctx.strokeStyle = isRidge ? "#DC143C" : "rgba(65,105,225,0.42)";

      ctx.lineWidth = isRidge ? 3.4 : 1.3;

      for (let v = -1.1; v <= 1.11; v += 0.22) {

        const p = proj(u, v, zFn(u, v), w, h);

        if (v === -1.1) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }



    const pTz1 = drawNode3D("Tz_1", -1.16, 0, zFn(-1.16, 0), 8.5, "#20B2AA", "#FFD700", "T_{z,1} (−1)", "Left Stable Punkttelezentrum T_{z,1} (Morse Index 0)", w, h);

    const pTz2 = drawNode3D("Tz_2",  1.16, 0, zFn( 1.16, 0), 8.5, "#20B2AA", "#FFD700", "T_{z,2} (+1)", "Right Stable Punkttelezentrum T_{z,2} (Morse Index 0)", w, h);

    const pSad = drawNode3D("Sad_p0", 0, 0, zFn(0, 0), 8, "#DC143C", "#FFD700", "p* ∈ D_ext (Index 1)", "Morse Index-1 Saddle on Extinktionsdiskriminante D_ext = ∂B(𝒜) (Thm. 6.14)", w, h);



    if (isStage7) {

      // Telezentralen Foliation Arcs between T_{z,1} and T_{z,2} (Thm. 6.13)

      for (let vOff of [-0.65, 0.0, 0.65]) {

        ctx.beginPath();

        ctx.strokeStyle = "#FFD700";

        ctx.lineWidth = 2.0;

        for (let i = 0; i <= 30; i++) {

          const u = -1.16 + (i / 30) * 2.32;

          const v = vOff * Math.sin((i / 30) * Math.PI);

          const p = proj(u, v, zFn(u, v) + 0.08, w, h);

          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

        }

        ctx.stroke();

      }

    }



    if (isStage9) {

      // Thermal Kramers particle hopping & Resynkolation barrier

      const ux = -1.16 + 0.45 * Math.sin(timeSec * 5);

      drawNode3D("Kramers_Pt", ux, 0, zFn(ux, 0) + 0.12, 7, "#FFD700", "#DC143C", "R_resyn (τ_surv)", "Thm. 6.21 Wasserstein Free-Energy & Eyring–Kramers Resynkolation!", w, h);

    }

  }



  // Stage 8: Transzendente Telezentralenrelativität \Gamma_m(\nu\mathcal{T}_m) \not\cong \nu\mathcal{T}_{m+1} (Thm. 6.19)

  function renderStage8(w, h) {

    // Lower Stratum C(m) vs Upper Stratum C(m+1)

    const pBotTerm = drawNode3D("Nu_m", -0.85, 0, -0.75, 10, "#FFD700", "#20B2AA", "ν𝒯_m (Haupttelezentrum in C(m))", "Terminal Final Coalgebra at the Apex of Lower Stratum C(m)", w, h);

    const pTopBasal = drawNode3D("Hyp_m1", -0.85, 0, 0.45, 8.5, "#4169E1", "#FFD700", "Γ_m(ν𝒯_m) = HypMet_{m+1}", "Demoted by Left Adjoint Γ_m ⊣ U_{m+1} to Basal Nebentelezentrum in C(m+1)!", w, h);

    const pTopTerm = drawNode3D("Nu_m1", 0.95, 0, 0.95, 11, "#FFD700", "#DC143C", "ν𝒯_{m+1} (New Terminal in C(m+1))", "Thm. 6.19: Γ_m(ν𝒯_m) ≇ ν𝒯_{m+1} (Left adjoints do not preserve terminal coalgebras!)", w, h);



    drawLine3D(pBotTerm, pTopBasal, "#20B2AA", 3.0);

    drawLine3D(pTopBasal, pTopTerm, "#FFD700", 3.0, [5, 3]);

  }



  // Stage 10: Teil A Completion Crown & Anthropomorphic Pivot to Coeff = [\mathbb{Q} \subseteq \mathbb{R} \subseteq \mathbb{C}]

  function renderStage10(w, h) {

    const teilA = ["Ch1: ℰ_syn", "Ch2: 𝒪_syn", "Ch3: ⊞_φ", "Ch4: Ω_int", "Ch5: 𝒳_syn", "Ch6: ν𝒯"];

    const ringPts = teilA.map((lbl, k) => {

      const a = timeSec * 0.45 + (k / 6) * Math.PI * 2;

      return drawNode3D("TA_" + k, 1.25 * Math.cos(a), 1.25 * Math.sin(a), 0.55, 7, "#20B2AA", "#fff", lbl, `Completed Teil A Pillar ${lbl}`, w, h);

    });

    for (let i = 0; i < 6; i++) {

      drawLine3D(ringPts[i], ringPts[(i + 1) % 6], "#20B2AA", 2.0);

    }

    // Lower Number Field Triad Coeff = [Q <= R <= C] (Bridge to Teil B, Chapter 7)

    const pQ = drawNode3D("Fld_Q", -1.0, 0, -0.85, 8, "#4169E1", "#fff", "ℚ (Discrete Counts)", "Rational Field ℚ ∈ Coeff (Teil B Anthropomorphic Pivot)", w, h);

    const pR = drawNode3D("Fld_R",  0.0, 0, -0.85, 9, "#FFA500", "#fff", "ℝ (Continuum R_n)", "Real Field ℝ ∈ Coeff (Semantischer Metrophor R_n = S_n ; ã)", w, h);

    const pC = drawNode3D("Fld_C",  1.0, 0, -0.85, 9.5, "#FFD700", "#fff", "ℂ (Phase / Realification)", "Complex Field ℂ ∈ Coeff (Realification dim_ℝ((ℂ^n)_ℝ) = 2n)", w, h);

    drawLine3D(pQ, pR, "#FFD700", 2.8);

    drawLine3D(pR, pC, "#FFD700", 2.8);

    ringPts.forEach(p => drawLine3D(p, pR, "rgba(255,215,0,0.38)", 1.5, [3, 3]));

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

    if (stInt === 1 || stInt === 3) renderStage1And3(w, h, curStage);

    else if (stInt === 2) renderStage2(w, h);

    else if (stInt === 4) renderStage4(w, h);

    else if (stInt === 5) renderStage5(w, h);

    else if (stInt === 6 || stInt === 7 || stInt === 9) renderStage6And7And9(w, h, curStage);

    else if (stInt === 8) renderStage8(w, h);

    else renderStage10(w, h);



    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh6Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch6-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch6-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch6-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch6-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch6-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh6Stage = function(val) { window.setCh6Stage(val, true); };



  window.enableCh6Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch6-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh6WithDeck();

  };



  window.toggleCh6Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch6-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh6Spotlight = function() {

    const hud = document.getElementById('ch6-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh6Minimize = function() {

    const hud = document.getElementById('ch6-3d-hud');

    const b = document.getElementById('ch6-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



  function syncCh6WithDeck() {
    if (!autoSync) return;
    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const ch6Hud = document.getElementById('ch6-3d-hud');
    if (isMegaDeck && ch6Hud && window.Reveal && window.Reveal.getCurrentSlide) {
      const currentSlide = window.Reveal.getCurrentSlide();
      const inCh6 = currentSlide ? !!currentSlide.closest('#chapter-6, section[data-chapter="6"]') : true;
      ch6Hud.style.display = inCh6 ? '' : 'none';
      if (!inCh6) return;
    }
    const vp = document.querySelector('.reveal-viewport');

    const isScroll = vp && vp.classList.contains('reveal-scroll');

    if (isScroll) {

      const scEl = vp.scrollHeight > vp.clientHeight ? vp : document.documentElement;

      const top = vp.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;

      const max = Math.max(1, (scEl.scrollHeight || document.body.scrollHeight) - window.innerHeight);

      window.setCh6Stage(1.0 + Math.min(1, Math.max(0, top / max)) * 9.0, false);

    } else if (window.Reveal && typeof window.Reveal.getIndices === 'function') {

      const idx = window.Reveal.getIndices();

      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 10);

      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;

      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;

      window.setCh6Stage(1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0, false);

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

    const insp = document.getElementById('ch6-node-inspector');

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

    syncCh6WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

    window.addEventListener('scroll', syncCh6WithDeck, { passive: true });

    const vp = document.querySelector('.reveal-viewport');

    if (vp) vp.addEventListener('scroll', syncCh6WithDeck, { passive: true });

    if (window.Reveal) {

      window.Reveal.on('ready', syncCh6WithDeck);

      window.Reveal.on('slidechanged', syncCh6WithDeck);

      window.Reveal.on('fragmentshown', syncCh6WithDeck);

      window.Reveal.on('fragmenthidden', syncCh6WithDeck);

    }

    const hud = document.getElementById('ch6-3d-hud');

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
    document.addEventListener('DOMContentLoaded', runCh6Engine);
  } else {
    runCh6Engine();
  }
})();
