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
    el.setAttribute('data-prevent-swipe', 'true');
    el.addEventListener('keydown', e => e.stopPropagation());
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

// =========================================================================
// CHAPTER 5: 60FPS 3D INTERACTIVE (∞,1)-TOPOS, DENDROIDAL COMPLETE SEGAL SPACE & TECTONIC ENGINE
// =========================================================================

const CH5_3D_STYLE = `
#ch5-3d-hud {
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

#ch5-3d-hud *, #ch5-3d-hud *::before, #ch5-3d-hud *::after {
  box-sizing: border-box;
}

#ch5-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch5-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch5-3d-hud.minimized .ch5-hud-body {
  display: none;
}

.ch5-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch5-hud-title {
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

.ch5-hud-title span:first-child {
  line-height: 1.15;
}

.ch5-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch5-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch5-hud-btn {
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

.ch5-hud-btn:hover, .ch5-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch5-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch5-canvas-wrap:active {
  cursor: grabbing;
}

#ch5-3d-hud.spotlight .ch5-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch5-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch5-overlay-bar {
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

.ch5-telemetry {
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

#ch5-node-inspector {
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

.ch5-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch5-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch5-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch5-scrubber .ch5-hud-btn {
  flex-shrink: 0;
}

#ch5-caption {
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
  #ch5-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch5-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch5-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch5-hud-controls {
    gap: 3px;
  }
  .ch5-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch5-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch5-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch5-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch5-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch5-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch5-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch5-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch5-hud-controls {
    gap: 3px;
  }
  .ch5-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch5-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch5-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch5-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch5-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch5-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch5-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch5-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH5_3D_HTML = `
<div class="ch5-hud-header">

    <div class="ch5-hud-title">

      <span>🏛️ Ch 5 · 3D (∞,1)-Metroplex Engine</span>

      <span id="ch5-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch5-hud-controls">

      <button class="ch5-hud-btn active" id="ch5-btn-orbit" onclick="toggleCh5Orbit()">⟳ Orbit</button>

      <button class="ch5-hud-btn" onclick="toggleCh5Spotlight()">⛶ Spotlight</button>

      <button class="ch5-hud-btn" id="ch5-btn-min" onclick="toggleCh5Minimize()">+</button>

    </div>

  </div>



  <div class="ch5-hud-body">

    <div class="ch5-canvas-wrap" id="ch5-canvas-wrap">

      <canvas id="ch5-3d-canvas"></canvas>

      <div class="ch5-overlay-bar">

        <div class="ch5-telemetry" id="ch5-telemetry">𝒳_syn = Sh_∞(Ctx, J_syn)</div>

        <div id="ch5-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch5-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <input type="range" id="ch5-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh5Stage(this.value)">

      <button class="ch5-hud-btn active" id="ch5-btn-sync" onclick="enableCh5Sync()">Auto-Sync</button>

    </div>



    <div id="ch5-caption">

      <b>Stage 1 (§5.1.1 — SM-20):</b> Encapsulating Grade-0 Syntrix networks into 0D Hypermetrophor atoms inside Hypersyntrix ¹M.

    </div>

  </div>
`;

function injectCh53DHUD() {
  if (document.getElementById('ch5-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH5_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch5-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH5_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch5_3d_engine_loaded) return;
  window.__ch5_3d_engine_loaded = true;

  function runCh5Engine() {
    injectCh53DHUD();
    if (window.__ch5_3d_engine_initialized) return;
    window.__ch5_3d_engine_initialized = true;

const canvas = document.getElementById('ch5-3d-canvas');

  const wrap = document.getElementById('ch5-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.52;

  let camPitch = 0.35;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§5.1.1 — SM-20 Hypersyntrix ¹M):</b> Grade-0 Syntrix networks contract into 0D Hypermetrophor atoms ¹wã = (yã_i)_N.",

    2: "<b>Stage 2 (§5.1.2–5.1.3 — SM-21–24 Functor Hierarchy S(n+1)):</b> 4-Grade Transcendence Tower (M⁰ → M¹ → M² → M³) &amp; Duale Tektonik.",

    3: "<b>Stage 3 (§5.1.4–5.1.5 — SM-25a Syntrokline Brücken &amp; Diabatik):</b> Cross-grade elevator bridges ^{n+N}α &amp; closed Syntrokline Rückkoppelung.",

    4: "<b>Stage 4 (§5.2.1 — Def. 5.1 Ambient (∞,1)-Topos 𝒳_syn):</b> Cumulative universes U₀ ∈ U₁ ∈ U₂ housing all Metroplex grades without size paradoxes.",

    5: "<b>Stage 5 (§5.2.2–5.2.3 — Prop. 5.3 Dendroidal Segal Grafting):</b> Binary corollas C₂^(v) ∘_e C₂^(u) contract along inner edge η_e to ternary C₃.",

    6: "<b>Stage 6 (§5.3.1 — Defs. 5.5–5.6 Simplicial Hypermetrophor H_n):</b> Internal category nerve: 0-simplices S₁⊔S₂, 1-simplex Kor(S₁,S₂), 2-simplex C₂.",

    7: "<b>Stage 7 (§5.3.2–5.3.3 — Props. 5.8 &amp; 5.10 Bridge &amp; Postnikov τ_{≤m}):</b> Postnikov filter strips higher homotopy ripples π_k (k > m) to smooth core.",

    8: "<b>Stage 8 (§5.3.4 — Thm. 5.13 Bisimplicial Tectonic Grid):</b> 4×4 grid Tect(S)_{p,q} pierced by golden diagonal realization |Tect(S)|_Δ &amp; R_Ban.",

    9: "<b>Stage 9 (§5.3.5 — Thm. 5.15 Cohesive Modalities &amp; Spectral Sequence):</b> Transgression beams d² : E²_{p,q} → E²_{p-2,q+1} &amp; d³ (Metroplexdiabatik)!",

    10: "<b>Stage 10 (§5.3.6–5.6 — Defs. 5.16–5.18 Slice Totality T_n &amp; EN-Product):</b> Protosimplexe 𝒫 in T_n = Met_n/G_n &amp; Endogenous operator Syn_{p,q}^n (p+q≤n)."

  };



  const STAGE_TELEMETRY = {

    1: "¹M ã ≡ ⟨⟨F, ã⟩ r⟩ | ¹wã ≡ (yã_i)_N (SM-20)",

    2: "S(n+1) ≡ ⁿf : Met_n → Met_{n+1} (SM-24)",

    3: "Bridge ^{n+N}α | EN-Rule: p+q ≤ n, q > 0",

    4: "𝒳_syn = L_{J_syn} Fun(Ctx^op, 𝒮_{U₀})",

    5: "X(T) ≃ X(C₂^(v)) ×^h_{X(η_e)} X(C₂^(u))",

    6: "HypMet_n = colim_{Δ^op} (U_{n-1} ∘ H_n)",

    7: "B_{n,n+N} ⊣ R_{n+N,n} | τ_{≤m} ⊣ ι_m",

    8: "|Tect(S)|_Δ = colim_{Δ^op} diag* Tect(S)",

    9: "∫ ⊣ ♭ ⊣ ♯ | d^r : E^r_{p,q} → E^r_{p-r,q+r-1}",

    10: "T_n = Met_n(𝒳_syn)/G_n | Protosimplex 𝒫"

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



  // Stage 1: Encapsulating Grade-0 Syntrix Networks into 0D Hypermetrophor Atoms (SM-20)

  function renderStage1(w, h) {

    const enc = 0.5 + 0.45 * Math.sin(timeSec * 1.6); // Pulsing encapsulation factor [0.05, 0.95]

    const pApex = drawNode3D("M1_Apex", 0, 0, 1.15, 11, "#FFD700", "#FFA500", "¹M (Hypersyntrix)", "Grade-1 Hypersyntrix ¹M correlating N encapsulated base Syntrices (SM Eq. 20)", w, h);



    for (let k = 0; k < 3; k++) {

      const ang = (k / 3) * Math.PI * 2 + timeSec * 0.35;

      const cx = 1.05 * Math.cos(ang), cy = 1.05 * Math.sin(ang), cz = -0.55;

      const spread = 0.45 * (1 - enc);

      // Mini 3-node Grade-0 Syntrix sub-network contracting into a 0D Protosimplex atom

      const sub = [0, 1, 2].map(j => {

        const sa = ang + (j / 3) * Math.PI * 2;

        return proj(cx + spread * Math.cos(sa), cy + spread * Math.sin(sa), cz - 0.25 * (1 - enc), w, h);

      });

      sub.forEach((p, j) => drawLine3D(p, sub[(j + 1) % 3], "rgba(65,105,225,0.6)", 1.6));

      const pAtom = drawNode3D(

        "Atom_" + k, cx, cy, cz, 6.5 + 3.5 * enc, "#20B2AA", "#FFD700",

        `yã_${k+1} ∈ ¹wã`,

        `Encapsulated Grade-0 Syntrix yã_${k+1}: Contracts into a 0D object of Hypermetrophor ¹wã`, w, h

      );

      drawLine3D(pAtom, pApex, "#FFD700", 2.4);

    }

  }



  // Stage 2 & 3: 4-Grade Transcendence Tower S(n+1), Syntrokline Bridges & Re-Entrant Diabatik

  function renderStage2And3(w, h, st) {

    const isStage3 = (st >= 2.5);

    const floors = [

      { z: -1.15, col: "#4169E1", lbl: "T₀: M⁰ (Syntrices, S1)", id: "T0" },

      { z: -0.38, col: "#20B2AA", lbl: "T₁: M¹ (Hypersyntrices, S2)", id: "T1" },

      { z:  0.38, col: "#FFA500", lbl: "T₂: M² (Grade-2 Metroplex, S3)", id: "T2" },

      { z:  1.15, col: "#FFD700", lbl: "T₃: M³ (Grade-n Metroplex, S(n+1))", id: "T3" }

    ];

    floors.forEach((fl, idx) => {

      const r = 1.28 - idx * 0.16;

      ctx.beginPath();

      ctx.strokeStyle = fl.col;

      ctx.lineWidth = 2.2;

      for (let i = 0; i <= 40; i++) {

        const a = (i / 40) * Math.PI * 2;

        const p = proj(r * Math.cos(a), r * Math.sin(a), fl.z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      drawNode3D(fl.id, 0, 0, fl.z, 8, fl.col, "#fff", fl.lbl, `Metroplextotality Floor ${fl.lbl} (SM Eqs. 21–25a)`, w, h);

    });



    // Stage 3: Syntrokline Elevator Bridges ^{n+N}\alpha & Closed Re-Entrant Diabatik Loop

    if (isStage3) {

      const pB0 = proj(-1.1, 0, -1.15, w, h);

      const pB3 = proj(-0.65, 0, 1.15, w, h);

      drawLine3D(pB0, pB3, "#20B2AA", 3.2);

      drawNode3D("Br_Up", -0.88, 0, 0.0, 7, "#20B2AA", "#FFD700", "^{n+N}α ↑ (Bridge)", "Syntrokline Metroplexbrücke lifting lower-grade syndromes across N floors (SM-25a)", w, h);



      // Crimson Re-Entrant Feedback Loop (Syntrokline Rückkoppelung) on right side

      const pR2 = proj(0.95, 0, 0.38, w, h);

      const pR1 = proj(1.12, 0, -0.38, w, h);

      drawLine3D(pR2, pR1, "#DC143C", 3.2, [4, 2]);

      drawNode3D("Diab_Loop", 1.05, 0, 0.0, 7, "#DC143C", "#FFD700", "↻ Rückkoppelung", "Closed Re-Entrant Metroplexdiabatik Feedback Loop T_m ⇄ T_{m-1} (SM p. 103)", w, h);

    }

  }



  // Stage 4: Cumulative Grothendieck Universe Shells U_0 \in U_1 \in U_2 in \mathcal{X}_{syn}

  function renderStage4(w, h) {

    const shells = [

      { r: 0.52, col: "#20B2AA", id: "Univ_U0", lbl: "U₀: Internal M^n ∈ Met_n", info: "Small Universe U₀: Site Ctx_adm^sk and all internal Metroplex objects M^n remain U₀-small" },

      { r: 0.98, col: "#4169E1", id: "Univ_U1", lbl: "U₁: Ambient Topos 𝒳_syn", info: "Ambient Universe U₁: Houses (∞,1)-topos 𝒳_syn = Sh_∞(Ctx, J_syn) & categories Met_n(𝒳_syn)" },

      { r: 1.42, col: "#FFD700", id: "Univ_U2", lbl: "U₂: Meta-Slice Fun(Δ^op, Met_n)", info: "Meta-Universe U₂: Houses external simplicial functor categories & meta-totalities T_n^ext" }

    ];

    shells.forEach((sh, idx) => {

      ctx.beginPath();

      ctx.strokeStyle = sh.col;

      ctx.lineWidth = 2.0;

      ctx.setLineDash(idx === 2 ? [5, 3] : []);

      for (let i = 0; i <= 44; i++) {

        const a = (i / 44) * Math.PI * 2;

        const p = proj(sh.r * Math.cos(a), sh.r * Math.sin(a), 0.25 * Math.sin(a * 2 + timeSec + idx), w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      ctx.setLineDash([]);

      drawNode3D(sh.id, sh.r * Math.cos(idx * 2.1), sh.r * Math.sin(idx * 2.1), 0, 8, sh.col, "#fff", sh.lbl, sh.info, w, h);

    });

  }



  // Stage 5: Dendroidal Complete Segal Space dCSeg(\mathcal{X}_{syn}) & Corolla Grafting (Prop. 5.3)

  function renderStage5(w, h) {

    // Lower Binary Corolla C_2^{(u)} grafted via inner edge \eta_e into Upper Binary Corolla C_2^{(v)}

    const vNode = drawNode3D("Cor_v", 0.25, 0, -0.35, 9, "#4169E1", "#fff", "C₂^(v)", "Lower Binary 2-Corolla v ∈ V(T) in Moerdijk–Weiss Category Ω", w, h);

    const uNode = drawNode3D("Cor_u", -0.35, 0, 0.45, 9, "#20B2AA", "#fff", "C₂^(u)", "Upper Binary 2-Corolla u ∈ V(T) grafted along inner edge η_e", w, h);

    drawLine3D(vNode, uNode, "#FFD700", 3.5);

    drawNode3D("Inner_e", -0.05, 0, 0.05, 6.5, "#FFD700", "#DC143C", "η_e (∂_{η_e}^* → C₃)", "Inner Edge η_e: Contraction ∂_{η_e} composes (v, u) ↦ v ∘_e u ∈ X(C₃) (Prop. 5.3)", w, h);



    // 3 Input Leaves and 1 Root Output

    const l1 = drawNode3D("Leaf_1", -1.15, -0.5, 1.05, 6, "#FFA500", "#fff", "in₁", "Leaf 1 of Composite Ternary Corolla C₃", w, h);

    const l2 = drawNode3D("Leaf_2", -0.15,  0.6, 1.15, 6, "#FFA500", "#fff", "in₂", "Leaf 2 of Composite Ternary Corolla C₃", w, h);

    const l3 = drawNode3D("Leaf_3",  1.05,  0.4, 0.35, 6, "#FFA500", "#fff", "in₃", "Leaf 3 of Composite Ternary Corolla C₃", w, h);

    const rt = drawNode3D("Root_T",  0.25,  0.0, -1.15, 7.5, "#FFD700", "#fff", "Root(T)", "Output Root of Grafted Dendroidal Tree T ∈ Ω", w, h);

    drawLine3D(l1, uNode, "#20B2AA", 2.2);

    drawLine3D(l2, uNode, "#20B2AA", 2.2);

    drawLine3D(l3, vNode, "#4169E1", 2.2);

    drawLine3D(vNode, rt, "#FFD700", 2.8);

  }



  // Stage 6 & 7: Simplicial Hypermetrophor Nerve & Postnikov Homotopy Filter \tau_{\le m}

  function renderStage6And7(w, h, st) {

    const isStage7 = (st >= 6.5);

    // 3D Surface with high-frequency homotopy ripples that flatten under Postnikov truncation

    const rippleAmp = isStage7 ? 0.06 + 0.32 * Math.max(0, Math.sin(timeSec * 1.4)) : 0.35;

    for (let u = -1.35; u <= 1.36; u += 0.45) {

      ctx.beginPath();

      ctx.strokeStyle = isStage7 ? "rgba(147,112,219,0.65)" : "rgba(65,105,225,0.45)";

      ctx.lineWidth = 1.6;

      for (let v = -1.1; v <= 1.11; v += 0.15) {

        const z = -0.55 + rippleAmp * Math.sin(u * 5 + timeSec * 3) * Math.cos(v * 5);

        const p = proj(u, v, z, w, h);

        if (v === -1.1) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    // Simplicial Nerve Triangle [2]: C_2 \cong C_1 \times_{C_0} C_1 above

    const s0 = drawNode3D("Seg_0", -1.0, -0.5, 0.65, 8, "#4169E1", "#fff", "S₁ ∈ C₀", "0-Simplex Object S₁ in Complete Segal Space CSeg(𝒳_syn)", w, h);

    const s1 = drawNode3D("Seg_1",  1.0, -0.5, 0.65, 8, "#20B2AA", "#fff", "S₂ ∈ C₀", "0-Simplex Object S₂ in Complete Segal Space CSeg(𝒳_syn)", w, h);

    const s2 = drawNode3D("Seg_2",  0.0,  0.8, 0.95, 9, "#FFD700", "#FFA500", isStage7 ? "τ_{≤m}X (Postnikov)" : "C₂ ≃ C₁×_{C₀}C₁", isStage7 ? "Postnikov Contraction κ_model = τ_{≤m} killing π_k for k > m (Prop. 5.10)" : "2-Simplex Segal Composition Witness in H_n : Δ^op → Met_{n-1}", w, h);

    drawLine3D(s0, s1, "#20B2AA", 2.5);

    drawLine3D(s1, s2, "#FFD700", 2.5);

    drawLine3D(s0, s2, "#FFA500", 2.5, [4, 2]);

  }



  // Stage 8 & 9: 3D 4x4 Bisimplicial Tectonic Grid, Diagonal Ray & Spectral Sequence d^2, d^3 Beams

  function renderStage8And9(w, h, st) {

    const isStage9 = (st >= 8.5);

    const grid = [];

    for (let p = 0; p < 4; p++) {

      grid[p] = [];

      for (let q = 0; q < 4; q++) {

        const x = (p - 1.5) * 0.78;

        const y = (q - 1.5) * 0.65;

        const z = (p + q - 3) * 0.32;

        const isDiag = (p === q);

        grid[p][q] = drawNode3D(

          `Tect_${p}_${q}`, x, y, z, isDiag ? 7.5 : 4.8,

          isDiag ? "#FFD700" : "#20B2AA", "#fff",

          isDiag ? `S_${p},${p}` : "",

          `Bisimplicial Tectonic Cell Tect(S)_{${p},${q}} (Grade p=${p}, Syndrome q=${q})`, w, h

        );

        if (p > 0) drawLine3D(grid[p - 1][q], grid[p][q], "rgba(65,105,225,0.45)", 1.3);

        if (q > 0) drawLine3D(grid[p][q - 1], grid[p][q], "rgba(32,178,170,0.45)", 1.3);

      }

    }

    // Golden Diagonal Simplicial Realization Ray |Tect(S)|_\Delta (Thm. 5.13)

    for (let k = 0; k < 3; k++) {

      drawLine3D(grid[k][k], grid[k + 1][k + 1], "#FFD700", 3.4);

    }



    // Stage 9: Tectonic Spectral Sequence Transgression Beams d^2 : (p,q) -> (p-2, q+1) & d^3 : (3,0) -> (0,2)

    if (isStage9) {

      drawLine3D(grid[2][0], grid[0][1], "#DC143C", 3.0);

      drawLine3D(grid[3][0], grid[1][1], "#DC143C", 3.0);

      drawLine3D(grid[3][1], grid[1][2], "#DC143C", 3.0);

      drawLine3D(grid[3][0], grid[0][2], "#FFA500", 3.2, [4, 2]);

      drawNode3D("Spec_d2", grid[1][1].sx ? 0 : 0, -0.6, 0.95, 8.5, "#DC143C", "#FFD700", "d² : E²_{p,q} → E²_{p−2,q+1}", "Thm. 5.15 Spectral Differential d^r ≠ 0: Homological Metroplexdiabatik & Downward Constraint!", w, h);

    }

  }



  // Stage 10: Slice Totality T_n = Met_n / G_n, Protosimplexe \mathcal{P} & EN-Product (p+q <= n)

  function renderStage10(w, h) {

    const pGn = drawNode3D("Blue_Gn", 0, 0, -1.1, 10.5, "#FFD700", "#FFA500", "Blueprint G_n (id_{G_n})", "Terminal Slice Object id_{G_n} : G_n → G_n in State Totality T_n = Met_n / G_n (Def. 5.16)", w, h);

    const pNull = drawNode3D("Null_M0", -1.25, -0.5, 0.2, 7.5, "#64748b", "#fff", "ⁿM₀ (Nullmetroplex)", "Initial Slice Object 0_n → G_n modeling structural exhaustion", w, h);

    const pProto1 = drawNode3D("Proto_1", -0.35, 0.75, 0.35, 8.5, "#20B2AA", "#FFD700", "Protosimplex 𝒫_p", "Augmented Subobject-Minimal Object 𝒫_p ∈ T_n (No proper non-trivial subalgebras, Def. 5.17)", w, h);

    const pProto2 = drawNode3D("Proto_2",  0.85, 0.55, 0.35, 8.5, "#4169E1", "#FFD700", "Metroplex M^{p+q}", "Secondary Factor of Grade p+q ≤ n (q > 0) for Endogenous Combination", w, h);

    const pEN = drawNode3D("EN_Out", 0.25, 0, 1.15, 10, "#FFA500", "#fff", "M^n EN M^{p+q} (SM-26)", "Endogenous Combination Operator Syn_{p,q}^n / Abs_n^{p+q} (p+q ≤ n prevents runaway, Def. 5.18)", w, h);



    drawLine3D(pNull, pGn, "rgba(148,163,184,0.6)", 1.8, [3, 3]);

    drawLine3D(pProto1, pGn, "#20B2AA", 2.4);

    drawLine3D(pProto2, pGn, "#4169E1", 2.4);

    drawLine3D(pProto1, pEN, "#FFD700", 2.6);

    drawLine3D(pProto2, pEN, "#FFD700", 2.6);

    drawLine3D(pEN, pGn, "#FFA500", 2.8);

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

    else if (stInt === 6 || stInt === 7) renderStage6And7(w, h, curStage);

    else if (stInt === 8 || stInt === 9) renderStage8And9(w, h, curStage);

    else renderStage10(w, h);



    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh5Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch5-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch5-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch5-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch5-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch5-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh5Stage = function(val) { window.setCh5Stage(val, true); };



  window.enableCh5Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch5-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh5WithDeck();

  };



  window.toggleCh5Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch5-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh5Spotlight = function() {

    const hud = document.getElementById('ch5-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh5Minimize = function() {

    const hud = document.getElementById('ch5-3d-hud');

    const b = document.getElementById('ch5-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



    function syncCh5WithDeck() {
    if (!autoSync) return;

    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch5-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
    const currentSlide = window.Reveal.getCurrentSlide();
    const inCh = currentSlide ? !!currentSlide.closest('#chapter-5, section[data-chapter="5"]') : true;
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
      window.setCh5Stage(stageVal, false);
    }
  }

  if (typeof window !== 'undefined') {
    window.syncCh5WithDeck = syncCh5WithDeck;
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

    const insp = document.getElementById('ch5-node-inspector');

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

    syncCh5WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    const synBindSync_syncCh5WithDeck = () => {
      syncCh5WithDeck();
    };

    window.addEventListener('scroll', synBindSync_syncCh5WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh5WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh5WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh5WithDeck, { passive: true });

    const revEl_syncCh5WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh5WithDeck) {
      revEl_syncCh5WithDeck.addEventListener('scroll', synBindSync_syncCh5WithDeck, { passive: true });
      revEl_syncCh5WithDeck.addEventListener('touchmove', synBindSync_syncCh5WithDeck, { passive: true });
    }
    const vpEl_syncCh5WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh5WithDeck) {
      vpEl_syncCh5WithDeck.addEventListener('scroll', synBindSync_syncCh5WithDeck, { passive: true });
      vpEl_syncCh5WithDeck.addEventListener('touchmove', synBindSync_syncCh5WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh5WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh5WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh5WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh5WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh5WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh5WithDeck);
    }

    const hud = document.getElementById('ch5-3d-hud');

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
    document.addEventListener('DOMContentLoaded', runCh5Engine);
  } else {
    runCh5Engine();
  }
})();
