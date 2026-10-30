window.comb3 = function(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let r = 1;
  for (let i = 1; i <= k; i++) r = r * (n - i + 1) / i;
  return Math.round(r);
};

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

// WIDGET 1: §3.1.2 Metrophorkorporation Coupling Mode Explorer
window.updateMetCorp = function() {
  const elP = document.getElementById('mc-p');
  if (!elP) return;
  let p = parseInt(elP.value);
  let q = parseInt(document.getElementById('mc-q').value);
  let lamIn = document.getElementById('mc-lam');
  let maxL = Math.min(p, q);
  lamIn.max = maxL;
  let lam = Math.min(maxL, parseInt(lamIn.value));
  lamIn.value = lam;

  document.getElementById('mc-p-val').innerText = p;
  document.getElementById('mc-q-val').innerText = q;
  document.getElementById('mc-lam-val').innerText = lam;

  let uncoupled = p + q;
  let nonComb = (p + q - 2 * lam) + lam; // p + q - lam
  let combCount = p * lam * q;

  const box = document.getElementById('mc-readout');
  if (box) {
    box.innerHTML =
      `<b>1. Uncoupled Composition (C_m):</b> p + q = <b style="color:#82aaff;">${uncoupled}</b> independent channels<br>` +
      `<b>2. Non-Combinatorial Coupling (K_m Pushout, SM p. 43):</b> (p + q - 2λ) + λ = p + q - λ = <b style="color:#FFD700;">${nonComb}</b><br>` +
      `<b>3. Combinatorial Coupling (Heim SM p. 44):</b> Z_comb = p · λ · q = <b style="color:#20B2AA;">${combCount}</b> coupled pairs`;
  }
};

// WIDGET 2: §3.2.3 Span Pushout & Stage III Polarimeter Lab
window.updatePushoutLab = function() {
  const elP = document.getElementById('po-p');
  if (!elP) return;
  let p = parseInt(elP.value);
  let q = parseInt(document.getElementById('po-q').value);
  let lamInput = document.getElementById('po-lam');
  let maxLam = Math.min(p, q);
  lamInput.max = maxLam;
  let lam = Math.min(maxLam, parseInt(lamInput.value));
  lamInput.value = lam;

  document.getElementById('po-p-val').innerText = p;
  document.getElementById('po-q-val').innerText = q;
  document.getElementById('po-lam-val').innerText = lam;

  let dimCoprod = p + q;
  let dimPushout = p + q - lam;
  let ext2 = window.comb3(dimPushout, 2);

  // Update SVG Orbital Circles
  let frac = maxLam > 0 ? (lam / maxLam) : 0;
  let sep = 42 * (1.0 - 0.85 * frac);
  const c1 = document.getElementById('po-c1');
  const c2 = document.getElementById('po-c2');
  const knot = document.getElementById('po-knot');
  const kTxt = document.getElementById('po-knot-txt');
  if (c1 && c2 && knot && kTxt) {
    c1.setAttribute('cx', (105 - sep).toFixed(1));
    c2.setAttribute('cx', (105 + sep).toFixed(1));
    knot.setAttribute('r', (lam === 0 ? 0 : 7 + lam * 2.2).toFixed(1));
    kTxt.setAttribute('opacity', lam === 0 ? '0' : '1');
  }

  let note = "";
  if (p === 6 && q === 6 && lam === 3) {
    note = `<br><span style="color:#FFD700;">★ STAGE III POLARIMETER MATCH: dim(P_c) = 9 ⇒ dim Λ²(ℝ⁹) = C(9,2) = <b>36</b> (Exact Ch. 9 Hermetry Capacity!)</span>`;
  } else if (lam === 0) {
    note = `<br><span style="color:#82aaff;">★ UNCOUPLED KONZENTER LIMIT (λ = 0): P_a ⊞₀ P_b ≅ P_a ⊕₁ P_b (dim = ${dimCoprod})</span>`;
  } else if (lam === p && p === q) {
    note = `<br><span style="color:#20B2AA;">★ FULL IDENTIFICATION LIMIT (λ = p = q): P_a ⊞_id P_a ≅ P_a (dim = ${p}, zero channel inflation)</span>`;
  }

  document.getElementById('po-lab-readout').innerHTML =
    `<b>Coproduct Dim (C_m):</b> p + q = ${dimCoprod}  |  <b>Span Pushout Dim (K_m):</b> p + q - λ_eff = <b style="color:#FFD700;">${dimPushout}</b><br>` +
    `<b>Coincidence Module F₁^c = Λ²(P_c):</b> C(${dimPushout}, 2) = <b style="color:#20B2AA;">${ext2}</b>` + note;
};

window.setPoPreset = function(p, q, lam) {
  document.getElementById('po-p').value = p;
  document.getElementById('po-q').value = q;
  document.getElementById('po-lam').max = Math.min(p, q);
  document.getElementById('po-lam').value = lam;
  window.updatePushoutLab();
};

// WIDGET 3: §3.2.4 Konflektorknoten & Factual Valency Lab
window.updateKonflektorLab = function() {
  const elChi = document.getElementById('kf-chi');
  if (!elChi) return;
  let chi = parseFloat(elChi.value);
  let th = parseFloat(document.getElementById('kf-th').value);
  let r = parseInt(document.getElementById('kf-r').value);
  let nIn = document.getElementById('kf-n');
  nIn.max = r;
  let n = Math.min(r, parseInt(nIn.value));
  nIn.value = n;

  document.getElementById('kf-r-val').innerText = r;
  document.getElementById('kf-n-val').innerText = n;

  let valFact = r - n + 1;
  let boundStatus = chi > th
    ? `<span style="color:#20B2AA;"><b>✓ KONFLEKTORKNOTEN ACTIVE (χ=${chi.toFixed(2)} > θ=${th.toFixed(2)}):</b> Quotient relation δ_φ(r) = (φ_a r, -φ_b r) = 0 binds c_l = (a₁, φ_l, b₂)!</span>`
    : `<span style="color:#ff6b81;"><b>✗ BELOW THRESHOLD (χ=${chi.toFixed(2)} ≤ θ=${th.toFixed(2)}):</b> Channels remain uncoupled in P_a ⊕₁ P_b.</span>`;

  const box = document.getElementById('kf-readout');
  if (box) {
    box.style.borderLeftColor = chi > th ? "#20B2AA" : "#DC143C";
    box.innerHTML = `${boundStatus}<br><b>Def. 3.6 (Pseudovalenz r = ${r} with n = ${n} identical inputs):</b> Factual Valency Val_fact = r - n + 1 = <b style="color:#FFD700;">${valFact}</b>`;
  }
};

// WIDGET 4: §3.3.2 2x2 Korporator Matrix & 4D Tesseract SVG Inspector
window.korState = { ks: true, cs: false, km: true, cm: false };

window.toggleKorRule = function(key) {
  window.korState[key] = !window.korState[key];
  const labels = {
    ks: "K_s (Synk. Coup)",
    cs: "C_s (Synk. Comp)",
    km: "K_m (Met. Push)",
    cm: "C_m (Met. Coprod)"
  };
  let btn = document.getElementById('btn-' + key);
  if (btn) {
    if (window.korState[key]) {
      btn.style.background = (key === 'ks' || key === 'cs') ? "#20B2AA" : "#FFA500";
      btn.style.color = "#000";
      btn.style.fontWeight = "bold";
      btn.innerText = "✓ " + labels[key];
    } else {
      btn.style.background = "#1e293b";
      btn.style.color = "#FFD700";
      btn.style.fontWeight = "normal";
      btn.innerText = "✗ " + labels[key];
    }
  }
  window.updateKorMatrixStatus();
};

window.updateKorMatrixStatus = function() {
  const box = document.getElementById('kor-matrix-status');
  if (!box) return;
  let active = [];
  if (window.korState.ks) active.push("K_s");
  if (window.korState.cs) active.push("C_s");
  if (window.korState.km) active.push("K_m");
  if (window.korState.cm) active.push("C_m");

  let hasSynk = window.korState.ks || window.korState.cs;
  let hasMet = window.korState.km || window.korState.cm;
  let kappa = active.length;

  // Render 4D Tesseract 2D Projection SVG
  const svg = document.getElementById('tess-svg');
  if (svg) {
    let coords = {};
    let htmlEdges = "", htmlNodes = "";
    for (let b0 = 0; b0 <= 1; b0++) {
      for (let b1 = 0; b1 <= 1; b1++) {
        for (let b2 = 0; b2 <= 1; b2++) {
          for (let b3 = 0; b3 <= 1; b3++) {
            let scale = b3 === 1 ? 18 : 38;
            let x = 100 + (2 * b0 - 1) * scale + (2 * b2 - 1) * 12;
            let y = 68 + (2 * b1 - 1) * (scale * 0.72) - (2 * b3 - 1) * 8;
            coords[`${b0}${b1}${b2}${b3}`] = { x, y, b0, b1, b2, b3 };
          }
        }
      }
    }
    let keys = Object.keys(coords);
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        let a = coords[keys[i]], b = coords[keys[j]];
        let diff = Math.abs(a.b0-b.b0) + Math.abs(a.b1-b.b1) + Math.abs(a.b2-b.b2) + Math.abs(a.b3-b.b3);
        if (diff === 1) {
          htmlEdges += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="#334155" stroke-width="1.2"/>`;
        }
      }
    }
    let curKey = `${window.korState.km?1:0}${window.korState.cm?1:0}${window.korState.ks?1:0}${window.korState.cs?1:0}`;
    keys.forEach(k => {
      let c = coords[k];
      let m = (c.b0 === 1 || c.b1 === 1);
      let s = (c.b2 === 1 || c.b3 === 1);
      let col = (!m && !s) ? "#94a3b8" : (m && s ? "#20B2AA" : "#DC143C");
      let isCur = (k === curKey);
      let r = isCur ? 7.5 : 4.0;
      let stroke = isCur ? "#FFD700" : "#000";
      let sw = isCur ? 2.5 : 1.0;
      htmlNodes += `<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${r}" fill="${isCur ? '#FFD700' : col}" stroke="${stroke}" stroke-width="${sw}"/>`;
    });
    svg.innerHTML = htmlEdges + htmlNodes;
  }

  if (kappa === 0) {
    box.style.borderLeftColor = "#708090";
    box.innerHTML = `<span style="color:#cbd5e1;"><b>Vacuous Origin ∅ (κ = 0):</b> No corporate rules active.</span>`;
  } else if (hasSynk && hasMet) {
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `<span style="color:#20B2AA;"><b>✓ MIXED DETERMINATE CLASS (1 of 9, Rank κ = ${kappa}):</b> r = {${active.join(", ")}}</span><br>` +
      `Satisfies Heim's <i>Eindeutigkeitssatz</i> (r ∩ Met ≠ ∅ ∧ r ∩ Synk ≠ ∅) ⇒ Unique composite Syntrix algebra S_c ∈ Obj(Syn)!`;
  } else {
    box.style.borderLeftColor = "#DC143C";
    let missing = hasMet ? "Synkolative module tier (K_s, C_s)" : "Metrophoric carrier tier (K_m, C_m)";
    box.innerHTML = `<span style="color:#ff6b81;"><b>✗ PURE UNDERDETERMINED CLASS (1 of 6, Rank κ = ${kappa}):</b> r = {${active.join(", ")}}</span><br>` +
      `Violates <i>Eindeutigkeitssatz</i>: leaves the ${missing} underdetermined (*zweideutig*)!`;
  }
};

// WIDGET 5: §3.3.4 Homogeneous Decomposition & Compositive Population Balance
window.updateDecompLab = function() {
  const elStep = document.getElementById('dec-step');
  if (!elStep) return;
  let k = parseInt(elStep.value);
  let nH = parseInt(document.getElementById('dec-nh').value);
  let mu = parseInt(document.getElementById('dec-mu').value);

  document.getElementById('dec-step-val').innerText = `k = ${k}`;
  document.getElementById('dec-nh-val').innerText = nH;
  document.getElementById('dec-mu-val').innerText = mu;

  let remMu = Math.max(0, 4 - k);
  let pyrSum = Math.max(0, nH - mu);
  let p1 = Math.floor(pyrSum * 0.45), p2 = Math.floor(pyrSum * 0.35), p3 = pyrSum - p1 - p2;

  let stages = [
    { lbl: "x yã (μ=4)", active: k === 0, col: "#9370DB" },
    { lbl: "D_s¹ (μ=3)", active: k === 1, col: "#FFA500" },
    { lbl: "D_s² (μ=2)", active: k === 2, col: "#20B2AA" },
    { lbl: "D_s³ (μ=1)", active: k === 3, col: "#4169E1" },
    { lbl: "0_Syn (μ=0)", active: k === 4, col: "#DC143C" }
  ];
  document.getElementById('dec-chain-cards').innerHTML = stages.map(s => `
    <div style="flex:1; text-align:center; padding:5px; border-radius:5px; font-size:0.58em; font-weight:bold;
         background:${s.active ? s.col : '#151c2c'}; color:${s.active ? '#000' : '#94a3b8'}; border:1px solid ${s.col};">
      ${s.lbl}
    </div>
  `).join("");

  const box = document.getElementById('dec-readout');
  if (box) {
    box.style.borderLeftColor = remMu === 0 ? "#FFD700" : "#20B2AA";
    box.innerHTML =
      `<b>Complexity μ(D_s^${k}(S)) = ${remMu}:</b> ${remMu === 0 ? '<span style="color:#FFD700;">TERMINATED AT NULLSYNTRIX 0_Syn!</span>' : 'Contracting historical cross-talk into pyramidal components...'}<br>` +
      `<b>Thm. 3.10 Additive Population Balance:</b> n_H - μ = ${nH} - ${mu} = <b style="color:#FFD700;">${pyrSum}</b> = ∑ n_j (${p1} + ${p2} + ${p3})`;
  }
};

// WIDGET 6 & 7: §3.3.5 Syntropod Tree, Forest Surgery & Pseudoexzenter Fan-Out
window.treeEdgesEx = [true, false, true];
window.surgeryMode = false;

window.toggleTreeEdge = function(idx) {
  window.treeEdgesEx[idx] = !window.treeEdgesEx[idx];
  window.renderSyntropodTree();
};

window.toggleForestSurgery = function() {
  window.surgeryMode = !window.surgeryMode;
  window.renderSyntropodTree();
};

window.renderSyntropodTree = function() {
  const elFan = document.getElementById('fan-n');
  if (!elFan) return;
  let N = parseInt(elFan.value);
  document.getElementById('fan-n-val').innerText = N;
  let fanBranches = (N * (N + 1)) / 2;

  const configs = [
    { nd: 'nd-kor1', tx: 'tx-kor1', l1: 'te-1a', l2: 'te-1b', name: 'Kor₁' },
    { nd: 'nd-kor2', tx: 'tx-kor2', l1: 'te-2a', l2: 'te-2b', name: 'Kor₂' },
    { nd: 'nd-kor3', tx: 'tx-kor3', l1: 'te-3a', l2: 'te-3b', name: 'Apex Kor₃' }
  ];
  let eps = 0;
  for (let i = 0; i < 3; i++) {
    let isEx = window.treeEdgesEx[i];
    if (isEx) eps++;
    let c = configs[i];
    let rect = document.getElementById(c.nd);
    let txt = document.getElementById(c.tx);
    let lineA = document.getElementById(c.l1);
    let lineB = document.getElementById(c.l2);

    if (isEx) {
      rect.setAttribute('stroke', '#FFA500');
      rect.setAttribute('fill', '#2d1a04');
      txt.setAttribute('fill', '#FFA500');
      txt.textContent = `${c.name}: Exzenter (K_m)`;
      lineA.setAttribute('stroke', '#FFA500');
      lineB.setAttribute('stroke', '#FFA500');
      lineA.setAttribute('opacity', window.surgeryMode ? '0.12' : '1.0');
      lineB.setAttribute('opacity', window.surgeryMode ? '0.12' : '1.0');
    } else {
      rect.setAttribute('stroke', '#4169E1');
      rect.setAttribute('fill', '#0f1b3d');
      txt.setAttribute('fill', '#82aaff');
      txt.textContent = `${c.name}: Konzenter (C_m)`;
      lineA.setAttribute('stroke', '#4169E1');
      lineB.setAttribute('stroke', '#4169E1');
      lineA.setAttribute('opacity', '1.0');
      lineB.setAttribute('opacity', '1.0');
    }
  }
  let kc = 3 - eps;
  let confIdx = eps + 1;
  let status = document.getElementById('tree-readout');
  status.innerHTML =
    `<b>Conflexivity:</b> |E_K|=ε=<b>${eps}</b>, |E_C|=<b>${kc}</b> ⇒ <b>ConfIndex_pres = ε + 1 = ${confIdx}</b>` +
    (window.surgeryMode ? ` <span style="color:#20B2AA;">[Forest Surgery: ${confIdx} Subtrees]</span>` : '') +
    `  |  <b>Thm. 3.11 (N=${N}):</b> ½N(N+1) = <b style="color:#FFD700;">${fanBranches} Branches</b>`;
};

// WIDGET 8: §3.3.6 Mayer-Vietoris Homological Emergence
window.updateMayerVietoris = function() {
  const elG = document.getElementById('mv-glue');
  if (!elG) return;
  let g = parseInt(elG.value);
  document.getElementById('mv-glue-val').innerText = g + '%';
  let t = g / 100.0;

  let yTop = 35 + t * 30.0;
  let yBot = 95 - t * 30.0;
  document.getElementById('mv-arc-top').setAttribute('d', `M 90,${yTop} Q 210,${-10 + t*20} 330,${yTop}`);
  document.getElementById('mv-arc-bot').setAttribute('d', `M 90,${yBot} Q 210,${140 - t*20} 330,${yBot}`);
  document.getElementById('mv-v0').setAttribute('cy', yTop);
  document.getElementById('mv-v1').setAttribute('cy', yTop);
  document.getElementById('mv-w0').setAttribute('cy', yBot);
  document.getElementById('mv-w1').setAttribute('cy', yBot);

  let cycTxt = document.getElementById('mv-cycle-txt');
  let box = document.getElementById('mv-readout');
  if (g >= 96) {
    cycTxt.setAttribute('opacity', '1');
    document.getElementById('mv-arc-top').setAttribute('stroke', '#FFD700');
    document.getElementById('mv-arc-bot').setAttribute('stroke', '#FFD700');
    box.style.borderLeftColor = "#FFD700";
    box.innerHTML = `<span style="color:#FFD700;"><b>✓ HOMOLOGICAL FUSION EMERGENCE (v_i = w_i):</b> H₁(S_c) ≅ ker(δ_{φ*}) ≅ ℝ[e_a - e_b] ≠ 0!</span>`;
  } else {
    cycTxt.setAttribute('opacity', '0');
    document.getElementById('mv-arc-top').setAttribute('stroke', '#4169E1');
    document.getElementById('mv-arc-bot').setAttribute('stroke', '#20B2AA');
    box.style.borderLeftColor = "#20B2AA";
    box.innerHTML = `Uncoupled / Partial Gluing (${g}%): Boundaries separate ⇒ H₁(S_a) = 0, H₁(S_b) = 0 (No global cycle).`;
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
function renderAllCh3Widgets() {
  window.updateMetCorp();
  window.updatePushoutLab();
  window.updateKonflektorLab();
  window.updateKorMatrixStatus();
  window.updateDecompLab();
  window.renderSyntropodTree();
  window.updateMayerVietoris();
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
function initChapter3() {
  if (synInitialised) return;
  synInitialised = true;
  prepareVideos();
  bindControlsOnce();
  renderAllCh3Widgets();
  syncVideosToSlide();
}

if (window.Reveal && window.Reveal.on) {
  window.Reveal.on('ready', initChapter3);
  window.Reveal.on('slidechanged', syncVideosToSlide);
  window.Reveal.on('fragmentshown', syncVideosToSlide);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter3();
  });
} else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
  initChapter3();
}


// =========================================================================
// CHAPTER 3: 60FPS 3D INTERACTIVE KORPORATOR, 4D TESSERACT & MAYER-VIETORIS ENGINE
// =========================================================================

const CH3_3D_STYLE = `
#ch3-3d-hud {
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

#ch3-3d-hud *, #ch3-3d-hud *::before, #ch3-3d-hud *::after {
  box-sizing: border-box;
}

#ch3-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch3-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch3-3d-hud.minimized .ch3-hud-body {
  display: none;
}

.ch3-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch3-hud-title {
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

.ch3-hud-title span:first-child {
  line-height: 1.15;
}

.ch3-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch3-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch3-hud-btn {
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

.ch3-hud-btn:hover, .ch3-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch3-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch3-canvas-wrap:active {
  cursor: grabbing;
}

#ch3-3d-hud.spotlight .ch3-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch3-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch3-overlay-bar {
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

.ch3-telemetry {
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

#ch3-node-inspector {
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

.ch3-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch3-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch3-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch3-scrubber .ch3-hud-btn {
  flex-shrink: 0;
}

#ch3-caption {
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
  #ch3-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch3-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch3-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch3-hud-controls {
    gap: 3px;
  }
  .ch3-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch3-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch3-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch3-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch3-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch3-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch3-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch3-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch3-hud-controls {
    gap: 3px;
  }
  .ch3-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch3-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch3-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch3-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch3-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch3-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch3-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch3-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH3_3D_HTML = `
<div class="ch3-hud-header">
    <div class="ch3-hud-title">
      <span>🔗 Ch 3 · 3D Korporator Engine</span>
      <span id="ch3-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>
    </div>
    <div class="ch3-hud-controls">
      <button class="ch3-hud-btn active" id="ch3-btn-orbit" onclick="toggleCh3Orbit()">⟳ Orbit</button>
      <button class="ch3-hud-btn" onclick="toggleCh3Spotlight()">⛶ Spotlight</button>
      <button class="ch3-hud-btn" id="ch3-btn-min" onclick="toggleCh3Minimize()">+</button>
    </div>
  </div>

  <div class="ch3-hud-body">
    <div class="ch3-canvas-wrap" id="ch3-canvas-wrap">
      <canvas id="ch3-3d-canvas"></canvas>
      <div class="ch3-overlay-bar">
        <div class="ch3-telemetry" id="ch3-telemetry">P_a ⊞_φ P_b ∈ FinBan_≤1</div>
        <div id="ch3-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>
      </div>
    </div>

    <div class="ch3-scrubber">
      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>
      <input type="range" id="ch3-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh3Stage(this.value)">
      <button class="ch3-hud-btn active" id="ch3-btn-sync" onclick="enableCh3Sync()">Auto-Sync</button>
    </div>

    <div id="ch3-caption">
      <b>Stage 1 (§3.1.1–3.1.2):</b> Principle of Inversion &amp; Metrophorkorporation (C_m: p+q vs. K_m: p+q−λ).
    </div>
  </div>
`;

function injectCh33DHUD() {
  if (document.getElementById('ch3-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH3_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch3-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH3_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch3_3d_engine_loaded) return;
  window.__ch3_3d_engine_loaded = true;

  function runCh3Engine() {
    injectCh33DHUD();
    if (window.__ch3_3d_engine_initialized) return;
    window.__ch3_3d_engine_initialized = true;

    const canvas = document.getElementById('ch3-3d-canvas');
    const wrap = document.getElementById('ch3-canvas-wrap');
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');

    let targetStage = 1.0;
    let curStage = 1.0;
    let autoSync = true;
    let autoOrbit = true;
    let camYaw = -0.48;
    let camPitch = 0.35;
    let camZoom = 1.65;
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let timeSec = 0;
    let hitNodes = [];
    let selectedId = null;

    const STAGE_CAPTIONS = {
      1: "<b>Stage 1 (§3.1.1–3.1.2 — Inversion &amp; Metrophorkorporation):</b> 3D carriers P_a (ℝ^p) and P_b (ℝ^q) linked across λ shared R_φ channels.",
      2: "<b>Stage 2 (§3.1.3–3.1.4 — Korporator Matrix &amp; Prop. 3.1):</b> 2×2 Korporator Matrix {K_s, C_s; K_m, C_m} &amp; Tripartite Syntropod ring z = z_c + z_p + z_e.",
      3: "<b>Stage 3 (§3.2.1–3.2.2 — Category Syn &amp; Zero Object 0_Syn):</b> Graded Syntrix tower F_γ anchored to Nullsyntrix zero object 0_Syn (Prop. 3.2).",
      4: "<b>Stage 4 (§3.2.3 — Thm. 3.4 Span Pushout P_a ⊞_φ P_b):</b> Quotienting P_a ⊕₁ P_b by Im(δ_φ) yields exact dimension subtraction p + q − λ_eff.",
      5: "<b>Stage 5 (Stage III Polarimeter Running Example):</b> Two ℝ⁶ polarimeters fuse across R_φ = ℝ³ into P_c = ℝ⁹ ⇒ Λ²(ℝ⁹) = 36 Hermetry capacity!",
      6: "<b>Stage 6 (§3.2.4 — Prop. 3.7 Synkolative Lifts C_s &amp; K_s):</b> Graded projective tensor module F_α^a ⊗̂_π F_β^b &amp; Factual Valency r − n + 1.",
      7: "<b>Stage 7 (§3.3.1–3.3.2 — 4D Tesseract of 15 Corporate Classes):</b> Rotating 4D hypercube: 9 Teal Mixed (Determinate) vs. 6 Crimson Pure (Underdetermined)!",
      8: "<b>Stage 8 (§3.3.3–3.3.4 — Thms. 3.17 &amp; 3.19 Decomposition Chain):</b> Well-founded complexity contraction μ(D_s(S)) &lt; μ(S) &amp; population balance n_H − μ.",
      9: "<b>Stage 9 (§3.3.5 — Thm. 3.22 Syntropod Tree &amp; 21-Branch Fan-Out):</b> 4-Syntropod Colimit Tree (ConfIndex = ε + 1) &amp; Pseudoexzenter ½N(N+1) = 21 crown.",
      10: "<b>Stage 10 (§3.3.6–3.6 — Thm. 3.26 Double Category &amp; Mayer–Vietoris):</b> Gluing contractible edges e_a, e_b across R_φ births emergent cycle [e_a − e_b] ∈ H₁(S_c)!"
    };

    const STAGE_TELEMETRY = {
      1: "C_m: p+q | K_m: p+q−λ | Z_comb = p·λ·q",
      2: "Kor ≡ {K_s, C_s; K_m, C_m} (SM Eq. 10)",
      3: "Kor_{C_m,C_s}(S, 0_Syn) ≅ S (Prop. 3.2)",
      4: "0 → R_φ/ker δ_φ → P_a⊕₁P_b → P_a⊞_φP_b → 0",
      5: "Stage III: 6 + 6 − 3 = 9 ⇒ C(9,2) = 36",
      6: "F_γ^{K_s} = ⨁ F_α^a ⊗̂_π F_β^b | Val = r−n+1",
      7: "2⁴ − 1 = 15 Classes: 9 Mixed + 6 Pure",
      8: "n_H − μ = ∑ n_j (Thm. 3.19 Balance)",
      9: "ConfIndex = ε + 1 | Fan-Out ½(6)(7) = 21",
      10: "∂_* : H_{γ+1}(S_c) → ker(δ_{φ*}) ⊂ H_γ(S_φ)"
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

    function drawOctahedron(cx, cy, cz, rad, col, w, h) {
      const v = [
        proj(cx + rad, cy, cz, w, h), proj(cx - rad, cy, cz, w, h),
        proj(cx, cy + rad, cz, w, h), proj(cx, cy - rad, cz, w, h),
        proj(cx, cy, cz + rad, w, h), proj(cx, cy, cz - rad, w, h)
      ];
      const edges = [[4,0],[4,1],[4,2],[4,3],[5,0],[5,1],[5,2],[5,3],[0,2],[2,1],[1,3],[3,0]];
      edges.forEach(e => drawLine3D(v[e[0]], v[e[1]], col, 1.5));
    }

    function renderStage1(w, h) {
      drawOctahedron(-1.05, 0, 0, 0.72, "rgba(65,105,225,0.65)", w, h);
      drawOctahedron( 1.05, 0, 0, 0.72, "rgba(32,178,170,0.65)", w, h);
      const pA = drawNode3D("P_a", -1.05, 0, 0, 8.5, "#4169E1", "#fff", "P_a (ℝ^p)", "Carrier Space P_a (p = 6 channels)", w, h);
      const pB = drawNode3D("P_b",  1.05, 0, 0, 8.5, "#20B2AA", "#fff", "P_b (ℝ^q)", "Carrier Space P_b (q = 6 channels)", w, h);
      [-0.45, 0.0, 0.45].forEach((zOff, l) => {
        const pK = drawNode3D("Phi_" + l, 0, 0.25 * Math.sin(timeSec * 2 + l), zOff, 6, "#FFD700", "#FFA500", l === 1 ? "R_φ (λ)" : "", `Shared Coupling Channel φ_${l+1} ∈ R_φ (Reduces dim to p+q−λ)`, w, h);
        drawLine3D(pA, pK, "#FFD700", 2.0, [4, 2]);
        drawLine3D(pK, pB, "#FFD700", 2.0, [4, 2]);
      });
    }

    function renderStage2(w, h) {
      const kor = [
        { id: "K_s", x: -0.45, z:  0.45, col: "#20B2AA", info: "K_s: Synkolative Coupling (Graded Projective Tensor F^a ⊗̂_π F^b)" },
        { id: "C_s", x:  0.45, z:  0.45, col: "#4169E1", info: "C_s: Synkolative Composition (Direct Sum Module F^a ⊕₁ F^b)" },
        { id: "K_m", x: -0.45, z: -0.45, col: "#FFA500", info: "K_m: Metrophor Coupling (Span Pushout P_a ⊞_φ P_b)" },
        { id: "C_m", x:  0.45, z: -0.45, col: "#9370DB", info: "C_m: Metrophor Composition (ℓ¹-Coproduct P_a ⊕₁ P_b)" }
      ];
      kor.forEach(k => drawNode3D(k.id, k.x, 0, k.z, 8.5, k.col, "#fff", k.id, k.info, w, h));
      const types = [
        { lbl: "z_c (Konzenter)", col: "#4169E1", info: "Concentric Sub-System: Disjoint carriers (K_m = 0, C_m ≠ 0)" },
        { lbl: "z_p (Pseudoexz.)", col: "#9370DB", info: "Pseudoexcentric Sub-System: Indirect chain fan-out ½N(N+1)" },
        { lbl: "z_e (Exzenter)", col: "#FFA500", info: "Excentric Sub-System: Active Konflektorknoten pushout (K_m ≠ 0)" }
      ];
      for (let i = 0; i < 6; i++) {
        const a = timeSec * 0.55 + (i / 6) * Math.PI * 2;
        const t = types[i % 3];
        const pS = drawNode3D("Syn_" + i, 1.38 * Math.cos(a), 1.38 * Math.sin(a), 0.25 * Math.sin(a * 2), 6, t.col, "#fff", i < 3 ? t.lbl : "", t.info, w, h);
        drawLine3D(pS, proj(0, 0, 0, w, h), "rgba(255,215,0,0.35)", 1.4, [3, 3]);
      }
    }

    function renderStage3(w, h) {
      const pZero = drawNode3D("Zero_Syn", -1.15, 0, -0.8, 9, "#64748b", "#FFD700", "0_Syn (ys c̃ ≡ 0)", "Strict Zero Object in Syn: Initial & Terminal (Prop. 3.2)", w, h);
      const grades = [-0.8, -0.1, 0.6, 1.25];
      let prev = null;
      grades.forEach((z, g) => {
        const pG = drawNode3D("F_" + g, 0.65, 0, z, 7.5 + g, g === 0 ? "#4169E1" : (g === 3 ? "#FFD700" : "#20B2AA"), "#fff", `F_${g}`, `Grade-${g} Banach Space F_${g} ⊕₁ {0} ≅ F_${g} (Isometric Identity)`, w, h);
        if (prev) drawLine3D(prev, pG, "#20B2AA", 2.5);
        drawLine3D(pZero, pG, "rgba(255,215,0,0.5)", 1.6, [4, 3]);
        prev = pG;
      });
    }

    function renderStage4And5(w, h, st) {
      const isStage5 = (st >= 4.5);
      const sep = isStage5 ? 0.55 : 0.85;
      drawOctahedron(-sep, 0, -0.35, 0.68, "rgba(65,105,225,0.55)", w, h);
      drawOctahedron( sep, 0, -0.35, 0.68, "rgba(32,178,170,0.55)", w, h);

      const pA = drawNode3D("Pa_po", -sep, 0, -0.35, 8, "#4169E1", "#fff", isStage5 ? "S_a (ℝ⁶)" : "P_a (ℝ^p)", "Polarimeter A Carrier P_a = ℝ³_H ⊕ ℝ³_V ≅ ℝ⁶", w, h);
      const pB = drawNode3D("Pb_po",  sep, 0, -0.35, 8, "#20B2AA", "#fff", isStage5 ? "S_b (ℝ⁶)" : "P_b (ℝ^q)", "Polarimeter B Carrier P_b = ℝ³_H ⊕ ℝ³_V ≅ ℝ⁶", w, h);
      const pR = drawNode3D("R_phi",  0,   0, -1.05, 7.5, "#FFA500", "#FFD700", isStage5 ? "R_φ = ℝ³ (λ=3)" : "R_φ / ker δ_φ", "Shared Konflektorknoten Parameter Space R_φ (Rank λ_eff = 3)", w, h);
      const pPush = drawNode3D("P_push", 0, 0, 0.65, 10.5, "#FFD700", "#fff", isStage5 ? "P_c = ℝ⁹" : "P_a ⊞_φ P_b", "Quotient Pushout Space (P_a ⊕₁ P_b)/Im(δ_φ) of dim p+q−λ = 9", w, h);

      drawLine3D(pR, pA, "#FFA500", 2.2);
      drawLine3D(pR, pB, "#FFA500", 2.2);
      drawLine3D(pA, pPush, "#FFD700", 2.6);
      drawLine3D(pB, pPush, "#FFD700", 2.6);

      if (isStage5) {
        ctx.beginPath();
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 2.0;
        for (let i = 0; i <= 36; i++) {
          const a = (i / 36) * Math.PI * 2 + timeSec * 0.4;
          const p = proj(1.15 * Math.cos(a), 1.15 * Math.sin(a), 1.15, w, h);
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
        drawNode3D("Ext_36", 0, 0, 1.25, 8, "#20B2AA", "#FFD700", "F₁^c = Λ²(ℝ⁹) (dim 36)", "Exact 36-Component Hermetry Matrix Capacity C(9,2) = 36!", w, h);
      }
    }

    function renderStage6(w, h) {
      for (let a = 1; a <= 3; a++) {
        for (let b = 1; b <= 3; b++) {
          const x = (a - 2) * 0.85;
          const y = (b - 2) * 0.85;
          const z = (a + b - 4) * 0.45;
          const isDiag = (a + b === 4);
          const p = drawNode3D(
            `Ks_${a}_${b}`, x, y, z, isDiag ? 7.5 : 5.5,
            isDiag ? "#FFD700" : "#20B2AA", "#fff",
            isDiag ? `F_${a}^a⊗F_${b}^b` : "",
            `Graded Projective Tensor Summand F_${a}^a ⊗̂_π F_${b}^b at total grade γ = ${a+b}`, w, h
          );
          if (a < 3) drawLine3D(p, proj(x + 0.85, y, z + 0.45, w, h), "rgba(65,105,225,0.5)", 1.5);
          if (b < 3) drawLine3D(p, proj(x, y + 0.85, z + 0.45, w, h), "rgba(32,178,170,0.5)", 1.5);
        }
      }
    }

    function renderStage7(w, h) {
      const pts = [];
      for (let b0 of [-1, 1]) for (let b1 of [-1, 1]) for (let b2 of [-1, 1]) for (let b3 of [-1, 1]) {
        const r = b3 > 0 ? 0.52 : 1.15;
        const wRot = 0.22 * Math.sin(timeSec * 1.2 + b3);
        const x = b0 * r + wRot, y = b1 * r, z = b2 * r * 0.85;
        const hasMet = (b0 > 0 || b1 > 0);
        const hasSynk = (b2 > 0 || b3 > 0);
        const isMixed = hasMet && hasSynk;
        const isNull = !hasMet && !hasSynk;
        const ruleNames = [];
        if (b0 > 0) ruleNames.push("K_m");
        if (b1 > 0) ruleNames.push("C_m");
        if (b2 > 0) ruleNames.push("K_s");
        if (b3 > 0) ruleNames.push("C_s");
        const rStr = isNull ? "∅ (0_Syn)" : `{${ruleNames.join(",")}}`;
        pts.push({
          b: [b0, b1, b2, b3], x, y, z, isMixed, isNull, rStr,
          p: proj(x, y, z, w, h)
        });
      }
      for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
          let diff = 0;
          for (let k = 0; k < 4; k++) if (pts[i].b[k] !== pts[j].b[k]) diff++;
          if (diff === 1) {
            const isW = pts[i].b[3] !== pts[j].b[3];
            drawLine3D(pts[i].p, pts[j].p, isW ? "rgba(255,165,0,0.65)" : "rgba(100,116,139,0.45)", isW ? 2.0 : 1.3);
          }
        }
      }
      pts.forEach((v, idx) => {
        const col = v.isNull ? "#ffffff" : (v.isMixed ? "#20B2AA" : "#DC143C");
        const status = v.isNull ? "Nullsyntrix 0_Syn" : (v.isMixed ? "MIXED (Determinate Class — Eindeutigkeitssatz ✓)" : "PURE (Underdetermined Row-Only Class ✗)");
        drawNode3D("Tess_" + idx, v.x, v.y, v.z, v.isMixed ? 6.5 : 5.0, col, "#000", idx === 15 ? "{K_m,C_m,K_s,C_s}" : "", `${v.rStr}: ${status}`, w, h);
      });
    }

    function renderStage8(w, h) {
      const steps = [
        { id: "S_hom", x: -1.25, z:  1.0, col: "#FFD700", lbl: "S ∈ Syn_hom (μ=4)", info: "Homogeneous Syntrix Algebra: Population n_H − μ = ∑ n_j (Thm. 3.19)" },
        { id: "Ds_1",  x: -0.42, z:  0.35, col: "#FFA500", lbl: "D_s(S) (μ=3)", info: "1st Synkolative Contraction Step: Peels off Pyramidal Leaf P₄" },
        { id: "Ds_2",  x:  0.42, z: -0.30, col: "#20B2AA", lbl: "D_s²(S) (μ=2)", info: "2nd Synkolative Contraction Step: Peels off Pyramidal Leaf P₃" },
        { id: "Ds_3",  x:  1.25, z: -0.95, col: "#4169E1", lbl: "P₁ ∈ Syn_pyr (μ=1)", info: "Terminal Pyramidal Base Syntrix P₁ (Terminates at 0_Syn)" }
      ];
      for (let i = 0; i < steps.length; i++) {
        const s = steps[i];
        const pMain = drawNode3D(s.id, s.x, -0.3, s.z, 8.5, s.col, "#fff", s.lbl, s.info, w, h);
        if (i > 0) {
          const pPrev = proj(steps[i - 1].x, -0.3, steps[i - 1].z, w, h);
          drawLine3D(pPrev, pMain, "#FFD700", 2.6);
          const pLeaf = drawNode3D("Leaf_" + i, s.x, 0.85, s.z + 0.25, 6.5, "#20B2AA", "#fff", `P_${5-i} ∈ Syn_pyr`, `Extracted Pyramidal Factor P_${5-i} in Corporate Chain (SM-11b)`, w, h);
          drawLine3D(pPrev, pLeaf, "#20B2AA", 1.8, [4, 2]);
        }
      }
    }

    function renderStage9(w, h) {
      const ringPts = [];
      for (let k = 0; k < 6; k++) {
        const a = timeSec * 0.3 + (k / 6) * Math.PI * 2;
        const x = 1.25 * Math.cos(a), y = 1.25 * Math.sin(a), z = -0.75;
        ringPts.push(drawNode3D("Br_" + k, x, y, z, 6, "#4169E1", "#fff", `S_${k+1}`, `Pure Single-Metrophor Branch ${k+1} (Total: 6 pure + 15 mixed = 21 branches)`, w, h));
      }
      for (let i = 0; i < 6; i++) {
        for (let j = i + 1; j < 6; j++) {
          drawLine3D(ringPts[i], ringPts[j], "rgba(32,178,170,0.35)", 1.2);
        }
      }
      const pKor1 = drawNode3D("Kor_1", -0.65, 0, 0.2, 8, "#FFA500", "#fff", "Kor₁ (Exzenter)", "Exzenter Edge e₁ ∈ E_K (K_m ≠ 0)", w, h);
      const pKor2 = drawNode3D("Kor_2",  0.65, 0, 0.2, 8, "#4169E1", "#fff", "Kor₂ (Konzenter)", "Konzenter Edge e₂ ∈ E_C (K_m = 0)", w, h);
      const pApex = drawNode3D("Colim_Apex", 0, 0, 1.15, 10.5, "#FFD700", "#fff", "y c̃ = colim G_S (ConfIndex = 3)", "Universal Tree Colimit in Syn (Prop. 3.24)", w, h);
      drawLine3D(ringPts[0], pKor1, "#FFA500", 2.2);
      drawLine3D(ringPts[1], pKor1, "#FFA500", 2.2);
      drawLine3D(ringPts[3], pKor2, "#4169E1", 2.2);
      drawLine3D(ringPts[4], pKor2, "#4169E1", 2.2);
      drawLine3D(pKor1, pApex, "#FFA500", 2.8);
      drawLine3D(pKor2, pApex, "#FFD700", 2.8);
    }

    function renderStage10(w, h) {
      const r0 = drawNode3D("MV_r0", -1.25, 0, 0, 8.5, "#FFA500", "#FFD700", "r₀ ∈ R_φ (v₀∼w₀)", "Glued Konflektorknoten Boundary Vertex r₀ ∈ C₀(S_φ)", w, h);
      const r1 = drawNode3D("MV_r1",  1.25, 0, 0, 8.5, "#FFA500", "#FFD700", "r₁ ∈ R_φ (v₁∼w₁)", "Glued Konflektorknoten Boundary Vertex r₁ ∈ C₀(S_φ)", w, h);

      for (let sgn of [-1, 1]) {
        ctx.beginPath();
        ctx.strokeStyle = sgn > 0 ? "#4169E1" : "#20B2AA";
        ctx.lineWidth = 3.2;
        for (let i = 0; i <= 36; i++) {
          const a = (i / 36) * Math.PI;
          const p = proj(-1.25 * Math.cos(a), 0.35 * sgn * Math.sin(a), sgn * 0.95 * Math.sin(a), w, h);
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }
      drawNode3D("MV_ea", 0,  0.35,  0.95, 7, "#4169E1", "#fff", "e_a ∈ C₁(S_a)", "Contractible 1-Chain in S_a (H₁(S_a) = 0 in isolation)", w, h);
      drawNode3D("MV_eb", 0, -0.35, -0.95, 7, "#20B2AA", "#fff", "e_b ∈ C₁(S_b)", "Contractible 1-Chain in S_b (H₁(S_b) = 0 in isolation)", w, h);

      const ang = timeSec * 2.2;
      const pCyc = proj(-1.25 * Math.cos(ang), 0.35 * Math.sin(ang), 0.95 * Math.sin(ang), w, h);
      ctx.save();
      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.arc(pCyc.sx, pCyc.sy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      drawNode3D("MV_H1", 0, 0, 0, 9.5, "#FFD700", "#DC143C", "∂_*[e_a − e_b] = [r₁ − r₀] ≠ 0", "Thm. 3.26 Emergent Homology Class in H₁(S_c) \ Im(π_*) (Humphreys Fusion Emergence)!", w, h);
    }

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

    // Window controller handlers
    window.setCh3Stage = function(val, manual) {
      targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));
      const stInt = Math.round(targetStage);

      const sl = document.getElementById('ch3-slider');
      if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;

      const pill = document.getElementById('ch3-stage-pill');
      if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;

      const cap = document.getElementById('ch3-caption');
      if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];

      const tel = document.getElementById('ch3-telemetry');
      if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];

      if (manual) {
        autoSync = false;
        const b = document.getElementById('ch3-btn-sync');
        if (b) { b.classList.remove('active'); b.innerText = "Manual"; }
      }
    };

    window.scrubCh3Stage = function(val) { window.setCh3Stage(val, true); };

    window.enableCh3Sync = function() {
      autoSync = true;
      const b = document.getElementById('ch3-btn-sync');
      if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }
      syncCh3WithDeck();
    };

    window.toggleCh3Orbit = function() {
      autoOrbit = !autoOrbit;
      const b = document.getElementById('ch3-btn-orbit');
      if (b) b.classList.toggle('active', autoOrbit);
    };

    window.toggleCh3Spotlight = function() {
      const hud = document.getElementById('ch3-3d-hud');
      if (hud) {
        hud.classList.remove('minimized');
        hud.classList.toggle('spotlight');
        setTimeout(resize, 360);
      }
    };

    window.toggleCh3Minimize = function() {
      const hud = document.getElementById('ch3-3d-hud');
      const b = document.getElementById('ch3-btn-min');
      if (hud) {
        hud.classList.remove('spotlight');
        hud.classList.toggle('minimized');
        if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";
        setTimeout(resize, 360);
      }
    };

        function syncCh3WithDeck() {
      if (!autoSync) return;

      const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
      const chHud = document.getElementById('ch3-3d-hud');
      if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
      const currentSlide = window.Reveal.getCurrentSlide();
      const inCh = currentSlide ? !!currentSlide.closest('#chapter-3, section[data-chapter="3"]') : true;
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
        window.setCh3Stage(stageVal, false);
      }
    }

    if (typeof window !== 'undefined') {
      window.syncCh3WithDeck = syncCh3WithDeck;
    }

    wrap.addEventListener('mousedown', e => {
      e.stopPropagation();
      isDragging = true;
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

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      camYaw += (e.clientX - lastX) * 0.012;
      camPitch = Math.max(-0.85, Math.min(1.15, camPitch + (e.clientY - lastY) * 0.012));
      lastX = e.clientX;
      lastY = e.clientY;
    });

    window.addEventListener('touchmove', e => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastX;
      const dy = e.touches[0].clientY - lastY;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      camYaw += dx * 0.012;
      camPitch = Math.max(-0.85, Math.min(1.15, camPitch + dy * 0.012));
    }, { passive: true });

    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });

    wrap.addEventListener('click', e => {
      e.stopPropagation();
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let hit = null;
      for (let i = hitNodes.length - 1; i >= 0; i--) {
        const n = hitNodes[i];
        if (Math.hypot(mx - n.p.sx, my - n.p.sy) <= n.r + 6) { hit = n; break; }
      }
      const insp = document.getElementById('ch3-node-inspector');
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

    resize();
    syncCh3WithDeck();
    requestAnimationFrame(renderLoop);
    window.addEventListener('resize', resize);
        // Universal multi-target scroll and touch listeners for mobile & desktop morph stage sync
    const synBindSync_syncCh3WithDeck = () => {
      syncCh3WithDeck();
    };

    window.addEventListener('scroll', synBindSync_syncCh3WithDeck, { capture: true, passive: true });
    document.addEventListener('scroll', synBindSync_syncCh3WithDeck, { capture: true, passive: true });
    window.addEventListener('touchmove', synBindSync_syncCh3WithDeck, { passive: true });
    document.addEventListener('touchmove', synBindSync_syncCh3WithDeck, { passive: true });

    const revEl_syncCh3WithDeck = document.querySelector('.reveal');
    if (revEl_syncCh3WithDeck) {
      revEl_syncCh3WithDeck.addEventListener('scroll', synBindSync_syncCh3WithDeck, { passive: true });
      revEl_syncCh3WithDeck.addEventListener('touchmove', synBindSync_syncCh3WithDeck, { passive: true });
    }
    const vpEl_syncCh3WithDeck = document.querySelector('.reveal-viewport');
    if (vpEl_syncCh3WithDeck) {
      vpEl_syncCh3WithDeck.addEventListener('scroll', synBindSync_syncCh3WithDeck, { passive: true });
      vpEl_syncCh3WithDeck.addEventListener('touchmove', synBindSync_syncCh3WithDeck, { passive: true });
    }

    if (window.Reveal) {
      window.Reveal.on('ready', synBindSync_syncCh3WithDeck);
      window.Reveal.on('slidechanged', synBindSync_syncCh3WithDeck);
      window.Reveal.on('fragmentshown', synBindSync_syncCh3WithDeck);
      window.Reveal.on('fragmenthidden', synBindSync_syncCh3WithDeck);
      window.Reveal.on('scroll-view-activated', synBindSync_syncCh3WithDeck);
      window.Reveal.on('scroll-view-deactivated', synBindSync_syncCh3WithDeck);
    }
    const hud = document.getElementById('ch3-3d-hud');
    if (hud) {
      hud.querySelectorAll('input, button').forEach(el => {
        el.addEventListener('keydown', e => e.stopPropagation());
        el.addEventListener('mousedown', e => e.stopPropagation());
        el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCh3Engine);
  } else {
    runCh3Engine();
  }
})();
