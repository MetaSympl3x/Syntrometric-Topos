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

// WIDGET 1: §5.1.1–5.1.2 Hypermetrophor Encapsulation & Functor Hierarchy S(n+1)
window.updateEncapsulationLab = function() {
  const elEnc = document.getElementById('enc-slider');
  if (!elEnc) return;
  let pct = parseInt(elEnc.value);
  let grade = parseInt(document.getElementById('enc-grade').value);
  document.getElementById('enc-val').innerText = pct + '%';
  document.getElementById('enc-grade-val').innerText = `M^${grade}`;

  let t = pct / 100.0;
  const svg = document.getElementById('enc-svg');
  if (svg) {
    const centers = [
      { cx: 52, cy: 42, col: "#4169E1" },
      { cx: 148, cy: 42, col: "#20B2AA" },
      { cx: 100, cy: 92, col: "#FFA500" }
    ];
    let html = `<line x1="52" y1="42" x2="148" y2="42" stroke="#FFD700" stroke-width="2" stroke-dasharray="3,2"/>`;
    html += `<line x1="52" y1="42" x2="100" y2="92" stroke="#FFD700" stroke-width="2" stroke-dasharray="3,2"/>`;
    html += `<line x1="148" y1="42" x2="100" y2="92" stroke="#FFD700" stroke-width="2" stroke-dasharray="3,2"/>`;

    let rad = 22 * (1.0 - 0.78 * t);
    centers.forEach((c, idx) => {
      let p1x = c.cx + rad * Math.cos(0), p1y = c.cy + rad * Math.sin(0);
      let p2x = c.cx + rad * Math.cos(2.09), p2y = c.cy + rad * Math.sin(2.09);
      let p3x = c.cx + rad * Math.cos(4.18), p3y = c.cy + rad * Math.sin(4.18);
      if (t < 0.92) {
        html += `<polygon points="${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)} ${p3x.toFixed(1)},${p3y.toFixed(1)}" fill="none" stroke="${c.col}" stroke-width="1.8"/>`;
      }
      html += `<circle cx="${c.cx}" cy="${c.cy}" r="${(6 + 6*t).toFixed(1)}" fill="${t > 0.85 ? '#FFD700' : c.col}" stroke="#fff" stroke-width="1.5"/>`;
    });
    svg.innerHTML = html;
  }

  const box = document.getElementById('enc-readout');
  if (box) {
    let fnStr = grade === 0 ? "S1 ≡ f (Generates M⁰ ≡ yã from AP₀)" :
                `S(${grade+1}) ≡ ^${grade}f (Generates M^${grade} from Hypermetrophor ^${grade}wã ∈ Fun(Δ^op, Met_${grade-1}))`;
    box.innerHTML =
      `<b>Active Functor Tier:</b> <span style="color:#FFD700;">${fnStr}</span><br>` +
      `<b>Encapsulation (${pct}%):</b> ${pct >= 90 ? '<span style="color:#20B2AA;"><b>PROTOSIMPLEX ATOMIC LOCK:</b> Lower networks collapsed to 0D objects in CSeg(X_syn)_0!</span>' : 'Contracting internal grade-(n-1) trajectories into degenerate 1-simplices s₀(P)...'}`;
  }
};

// WIDGET 2: §5.1.4–5.1.5 Syntrokline Bridges & Metroplexdiabatik
window.setDiabatikMode = function(mode) {
  const svg = document.getElementById('diab-svg');
  const box = document.getElementById('diab-readout');
  if (!svg || !box) return;

  let html = `
    <!-- Floor T_{m-1} and Floor T_m -->
    <rect x="20" y="82" width="145" height="32" rx="5" fill="#0f1b3d" stroke="#4169E1" stroke-width="2"/>
    <text x="92" y="102" fill="#82aaff" font-size="10.5" font-weight="bold" text-anchor="middle">Floor T_{m-1} (Met_{m-1})</text>
    <rect x="235" y="15" width="165" height="98" rx="6" fill="#151c2c" stroke="#20B2AA" stroke-width="2"/>
    <text x="317" y="32" fill="#5eead4" font-size="10.5" font-weight="bold" text-anchor="middle">Associative Metroplex M^m</text>
    <rect x="250" y="78" width="135" height="24" rx="4" fill="#1e293b" stroke="#4169E1" stroke-width="1.5"/>
    <text x="317" y="94" fill="#fff" font-size="9.5" text-anchor="middle">γ = 0: Hypermetrophor Idea</text>
    <rect x="250" y="42" width="135" height="24" rx="4" fill="#2d1a04" stroke="#FFA500" stroke-width="1.5"/>
    <text x="317" y="58" fill="#FFD700" font-size="9.5" text-anchor="middle">γ > 0: Higher Syndrome</text>
  `;

  if (mode === 'in' || mode === 'loop') {
    html += `<path d="M 165,94 L 248,90" fill="none" stroke="#20B2AA" stroke-width="3.2"/>`;
    html += `<circle cx="208" cy="92" r="4.5" fill="#FFD700"/>`;
  }
  if (mode === 'out' || mode === 'loop') {
    html += `<path d="M 250,54 Q 140,45 110,80" fill="none" stroke="#DC143C" stroke-width="3.2" stroke-dasharray="4,2"/>`;
    html += `<circle cx="165" cy="56" r="4.5" fill="#DC143C"/>`;
  }
  if (mode === 'loop') {
    html += `<line x1="317" y1="78" x2="317" y2="66" stroke="#FFD700" stroke-width="3"/>`;
  }
  svg.innerHTML = html;

  if (mode === 'in') {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<b style="color:#20B2AA;">Metrophoric Diabatik (γ = 0, SM p. 103):</b> Syntroclinic lines from T_{m-1} penetrate M^m at level γ = 0, directly modulating its foundational Hypermetrophor Idea!`;
  } else if (mode === 'out') {
    box.style.borderLeftColor = "#FFA500";
    box.innerHTML = `<b style="color:#FFA500;">Syndromatic Diabatik (γ > 0, SM p. 103):</b> Internal syndrome generation at level γ > 0 emits a tectonic coupling outward into T_{m-1}!`;
  } else {
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<b style="color:#FFD700;">★ CLOSED SYNTROKLINE RÜCKKOPPELUNG (Re-Entrant Loop):</b> Combines inward Metrophoric (γ=0) and outward Syndromatic (γ>0) couplings into a self-sustaining recurrent loop!`;
  }
};

// WIDGET 3: §5.2.2 Dendroidal Corolla Grafting Explorer
window.setDendroidalStep = function(step) {
  const svg = document.getElementById('dend-svg');
  const box = document.getElementById('dend-readout');
  if (!svg || !box) return;

  if (step === 1) {
    svg.innerHTML = `
      <line x1="85" y1="18" x2="125" y2="48" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="165" y1="18" x2="125" y2="48" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="125" y1="48" x2="185" y2="88" stroke="#FFD700" stroke-width="3.8"/>
      <text x="135" y="75" fill="#FFD700" font-size="10.5" font-weight="bold">η_e</text>
      <line x1="245" y1="48" x2="185" y2="88" stroke="#FFA500" stroke-width="2.5"/>
      <line x1="185" y1="88" x2="185" y2="118" stroke="#20B2AA" stroke-width="3.2"/>
      <circle cx="125" cy="48" r="14" fill="#1e293b" stroke="#4169E1" stroke-width="2.2"/>
      <text x="125" y="52" fill="#82aaff" font-size="10" font-weight="bold" text-anchor="middle">C₂^(u)</text>
      <circle cx="185" cy="88" r="14" fill="#2d1a04" stroke="#FFA500" stroke-width="2.2"/>
      <text x="185" y="92" fill="#FFD700" font-size="10" font-weight="bold" text-anchor="middle">C₂^(v)</text>
    `;
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<b>1. Dendroidal Segal Equivalence (Prop. 5.3):</b> X(T) xrightarrow{~} X(C₂^(v)) ×^h_{X(η_e)} X(C₂^(u)). Compatible binary operations determine a point of X(T) uniquely up to a contractible space of choices!`;
  } else if (step === 2) {
    svg.innerHTML = `
      <line x1="130" y1="20" x2="210" y2="72" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="210" y1="20" x2="210" y2="72" stroke="#4169E1" stroke-width="2.5"/>
      <line x1="290" y1="20" x2="210" y2="72" stroke="#FFA500" stroke-width="2.5"/>
      <line x1="210" y1="72" x2="210" y2="116" stroke="#FFD700" stroke-width="3.5"/>
      <circle cx="210" cy="72" r="18" fill="#2d1a04" stroke="#FFD700" stroke-width="2.5"/>
      <text x="210" y="76" fill="#FFD700" font-size="11" font-weight="bold" text-anchor="middle">C₃</text>
      <text x="315" y="76" fill="#5eead4" font-size="10.5" font-weight="bold">∂_{η_e}^* : X(T) → X(C₃)</text>
    `;
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<b>2. Inner-Edge Contraction ∂_{η_e}:</b> Contracting inner edge η_e maps C₃ ↪ T in Ω, inducing the ternary composite operation ∂_{η_e}^* : X(T) → X(C₃) in X_syn!`;
  } else {
    svg.innerHTML = `
      <rect x="45" y="32" width="125" height="55" rx="6" fill="#0f1b3d" stroke="#4169E1" stroke-width="2"/>
      <text x="107" y="56" fill="#82aaff" font-size="10.5" font-weight="bold" text-anchor="middle">(w ∘₁ v) ∘₁ u</text>
      <text x="107" y="74" fill="#cbd5e1" font-size="9" text-anchor="middle">Left Graft Order</text>
      <path d="M 175,58 L 245,58" stroke="#FFD700" stroke-width="3"/>
      <text x="210" y="48" fill="#FFD700" font-size="11" font-weight="bold" text-anchor="middle">≃ X(T₃)</text>
      <rect x="250" y="32" width="125" height="55" rx="6" fill="#151c2c" stroke="#20B2AA" stroke-width="2"/>
      <text x="312" y="56" fill="#5eead4" font-size="10.5" font-weight="bold" text-anchor="middle">w ∘₁ (v ∘₂ u)</text>
      <text x="312" y="74" fill="#cbd5e1" font-size="9" text-anchor="middle">Right Graft Order</text>
    `;
    box.style.borderLeftColor = "#9370DB";
    box.innerHTML = `<b>3. Coherent Associativity Homotopy:</b> Applying the dendroidal Segal equivalence to a 3-vertex tree T₃ identifies both iterated composites with X(T₃), supplying the canonical associativity homotopy!`;
  }
};

// WIDGET 4: §5.3.3 Postnikov Homotopy Contraction
window.updatePostnikov = function() {
  const elM = document.getElementById('post-m');
  if (!elM) return;
  let m = parseInt(elM.value);
  let lbl = document.getElementById('post-m-val');
  let path = document.getElementById('post-path');
  let pt0 = document.getElementById('post-pt0');
  let box = document.getElementById('post-readout');

  if (m === 0) {
    lbl.innerText = "m = 0";
    path.setAttribute('d', '');
    pt0.setAttribute('opacity', '1');
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>0-Truncation τ_{≤0} X ≃ π₀(X) (Set Collapse, §5.5.2):</b></span><br>` +
      `All higher homotopy groups vanish (π_{k≥1} = 0). Collapses the homotopy type to its discrete sheaf of connected components!`;
  } else {
    pt0.setAttribute('opacity', '0');
    lbl.innerText = (m === 3) ? "m = ∞" : `m = ${m}`;
    let amp = (m === 1) ? 0.0 : (m === 2 ? 7.5 : 18.0);
    let freq = (m === 2) ? 6 : 14;
    let pts = [];
    for (let i = 0; i <= 120; i++) {
      let t = (i / 120.0) * 2.0 * Math.PI;
      let rx = 90 + amp * Math.sin(freq * t);
      let ry = 50 + amp * Math.cos(freq * t);
      let x = 210 + rx * Math.cos(t);
      let y = 72 + ry * Math.sin(t);
      pts.push((i === 0 ? "M " : "L ") + x.toFixed(1) + "," + y.toFixed(1));
    }
    pts.push("Z");
    path.setAttribute('d', pts.join(" "));
    path.setAttribute('stroke', m === 1 ? "#20B2AA" : (m === 2 ? "#FFA500" : "#DC143C"));

    if (m === 1) {
      box.style.borderLeftColor = "#20B2AA";
      box.innerHTML = `<span style="color:#20B2AA;"><b>1-Truncation τ_{≤1} X (Fundamental Groupoid):</b></span><br>` +
        `Preserves π₀(X) and fundamental group loops π₁(X), while extinguishing all higher homotopy noise (π_{k≥2} = 0)!`;
    } else if (m === 2) {
      box.style.borderLeftColor = "#FFA500";
      box.innerHTML = `<span style="color:#FFA500;"><b>2-Truncation τ_{≤2} X (2-Type Approximation):</b></span><br>` +
        `Retains π₀, π₁, and 2-dimensional surface homotopy π₂(X); filters out all k ≥ 3 fluctuations.`;
    } else {
      box.style.borderLeftColor = "#DC143C";
      box.innerHTML = `<span style="color:#ff6b81;"><b>Untruncated Object X ∈ X_syn (Full ∞-Groupoid):</b></span><br>` +
        `Contains arbitrarily high microscopic homotopy fluctuations π_k(X) across all degrees k ≥ 1.`;
    }
  }
};

// WIDGET 5: §5.3.4 Bisimplicial Tectonic Grid
window.setTectMode = function(mode) {
  let svg = document.getElementById('tect-svg');
  let box = document.getElementById('tect-readout');
  if (!svg || !box) return;
  let html = '';

  for (let p = 0; p < 4; p++) {
    for (let q = 0; q < 4; q++) {
      let x = 75 + p * 90;
      let y = 142 - q * 38;
      if (p < 3) {
        let col = (mode === 'syn') ? '#4169E1' : '#2d3748';
        let w = (mode === 'syn') ? 3.2 : 1.5;
        html += `<line x1="${x}" y1="${y}" x2="${x+90}" y2="${y}" stroke="${col}" stroke-width="${w}"/>`;
      }
      if (q < 3) {
        let col = (mode === 'grad') ? '#20B2AA' : '#2d3748';
        let w = (mode === 'grad') ? 3.2 : 1.5;
        html += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y-38}" stroke="${col}" stroke-width="${w}"/>`;
      }
    }
  }

  if (mode === 'diag') {
    html += `<line x1="75" y1="142" x2="345" y2="28" stroke="#FFD700" stroke-width="4"/>`;
  }

  for (let p = 0; p < 4; p++) {
    for (let q = 0; q < 4; q++) {
      let x = 75 + p * 90;
      let y = 142 - q * 38;
      let isDiag = (p === q);
      let fill = '#1e293b';
      let stroke = '#4169E1';
      let r = 12;
      if (mode === 'diag' && isDiag) { fill = '#FFD700'; stroke = '#fff'; r = 15; }
      else if (mode === 'syn') { fill = '#4169E1'; stroke = '#fff'; }
      else if (mode === 'grad') { fill = '#20B2AA'; stroke = '#fff'; }

      let txtCol = (mode === 'diag' && isDiag) ? '#000' : '#fff';
      html += `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
      html += `<text x="${x}" y="${y+3.5}" text-anchor="middle" fill="${txtCol}" font-size="9.5" font-weight="bold">S_${p},${q}</text>`;
    }
  }

  svg.innerHTML = html;
  if (mode === 'diag') {
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>Diagonal Realization |Tect(S)|_Δ (Thm. 5.13):</b></span> colim_{Δ^op}(diag* Tect(S)) ≃ colim_{Δ^op × Δ^op} S_{p,q} unifies vertical and horizontal tectonics!`;
  } else if (mode === 'syn') {
    box.style.borderLeftColor = "#4169E1";
    box.innerHTML = `<span style="color:#82aaff;"><b>Horizontal Axis Syn_• (d_i^h):</b></span> Syndromatische Tektonik—within-grade syndrome layers generated by operadic composition ^k f.`;
  } else {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<span style="color:#5eead4;"><b>Vertical Axis Gr_• (d_j^v):</b></span> Graduelle Tektonik—nested compositional filtration across associated lower Metroplex grades 0 ≤ p ≤ n-1.`;
  }
};

// WIDGET 6: §5.3.4–5.3.5 Cohesion & Dold-Kan Tab Switcher
window.showCohesionTab = function(idx, btnEl) {
  for (let i = 1; i <= 4; i++) {
    const p = document.getElementById('coh-pane-' + i);
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

// WIDGET 7: §5.3.5 Tectonic Spectral Sequence E^r_{p,q}
window.setSpecPage = function(r) {
  let d2 = document.getElementById('ss-d2');
  let d3 = document.getElementById('ss-d3');
  let box = document.getElementById('ss-readout');
  if (!d2 || !d3 || !box) return;

  if (r === 2) {
    d2.setAttribute('opacity', '1');
    d3.setAttribute('opacity', '0');
    box.style.borderLeftColor = "#DC143C";
    box.innerHTML = `<span style="color:#ff6b81;"><b>E²-Page Active (d² : E²_{p,q} → E²_{p-2, q+1} ≠ 0):</b></span> First-order <b>Metroplexdiabatik</b>—a grade-p structure injects a non-trivial boundary 2 grades down into syndrome level q + 1!`;
  } else if (r === 3) {
    d2.setAttribute('opacity', '0.2');
    d3.setAttribute('opacity', '1');
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>E³-Page Active (d³ : E³_{3,0} → E³_{0,2} ≠ 0):</b></span> Deep cross-scale <b>Metroplexdiabatik</b>—transgressing 3 vertical Metroplex grades into syndrome level q + 2!`;
  } else {
    d2.setAttribute('opacity', '0');
    d3.setAttribute('opacity', '0');
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<span style="color:#20B2AA;"><b>Adiabatic Decoupled Limit (d^r ≡ 0 for all r ≥ 2):</b></span> Spectral sequence degenerates at E² = E^∞; scales evolve without cross-grade diabatic feedback.`;
  }
};

// WIDGET 8: §5.3.7 Endogenous Grade-Admissibility (SM Eq. 26)
window.updateENLab = function() {
  const elN = document.getElementById('en-n');
  if (!elN) return;
  let n = parseInt(elN.value);
  let p = parseInt(document.getElementById('en-p').value);
  let q = parseInt(document.getElementById('en-q').value);
  document.getElementById('en-n-val').innerText = n;
  document.getElementById('en-p-val').innerText = p;
  document.getElementById('en-q-val').innerText = q;

  let sum = p + q;
  let box = document.getElementById('en-readout');

  if (q <= 0) {
    box.style.borderLeftColor = "#DC143C";
    box.innerHTML = `<span style="color:#ff6b81;"><b>✗ VIOLATES POSITIVITY (q = ${q} ≤ 0):</b></span> SM Eq. 26 and Lean 4 <code>pos_shift : 0 &lt; q</code> require strictly positive shift grade q &gt; 0!`;
  } else if (sum > n) {
    box.style.borderLeftColor = "#DC143C";
    box.innerHTML = `<span style="color:#ff6b81;"><b>✗ VIOLATES GRADE BOUND (p + q = ${sum} &gt; n = ${n}):</b></span> Exceeds ambient Metroplex grade n; triggers recursive grade runaway!`;
  } else if (sum === n) {
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>✓ EXACT ENDOGENOUS SYNTHESIS (p + q = ${sum} = n, q = ${q} &gt; 0):</b></span><br>` +
      `Activates <b>SynEN_{${p},${q}}^{${n}} : Met_${p} × Met_${q} → Met_${n}</b> (and <b>AbsEN_${n}^{${sum}}</b>)!`;
  } else {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<span style="color:#20B2AA;"><b>✓ ADMISSIBLE TECTONIC ABSORPTION (p + q = ${sum} &lt; n = ${n}, q = ${q} &gt; 0):</b></span><br>` +
      `Satisfies Lean 4 <code>EndogenousAdmissible ${n} ${p} ${q}</code>; activates <b>AbsEN_${n}^{${sum}} : Met_${n} × Met_${sum} → Met_${n}</b>!`;
  }
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
function renderAllCh5Widgets() {
  window.updateEncapsulationLab();
  window.setDiabatikMode('loop');
  window.setDendroidalStep(1);
  window.updatePostnikov();
  window.setTectMode('diag');
  window.setSpecPage(2);
  window.updateENLab();
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
function initChapter5() {
  if (synInitialised) return;
  synInitialised = true;
  prepareVideos();
  bindControlsOnce();
  renderAllCh5Widgets();
  syncVideosToSlide();
}

if (window.Reveal && window.Reveal.on) {
  window.Reveal.on('ready', initChapter5);
  window.Reveal.on('slidechanged', syncVideosToSlide);
  window.Reveal.on('fragmentshown', syncVideosToSlide);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter5();
  });
} else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
  initChapter5();
}
