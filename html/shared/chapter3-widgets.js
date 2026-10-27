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
    el.addEventListener('keydown', e => e.stopPropagation());
    el.addEventListener('mousedown', e => e.stopPropagation());
    el.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
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
