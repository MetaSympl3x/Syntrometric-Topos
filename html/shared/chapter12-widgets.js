(function() {
  window.showGenericTab = window.showGenericTab || function(prefix, idx, maxIdx, btnEl) {
    for (let i = 1; i <= maxIdx; i++) {
      const p1 = document.getElementById(prefix + '-' + i);
      const p2 = document.getElementById(prefix + '-pane-' + i);
      if (p1) p1.classList.toggle('active', i === idx);
      if (p2) p2.classList.toggle('active', i === idx);
    }
    if (btnEl && btnEl.parentElement) {
      Array.from(btnEl.parentElement.children).forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch(() => {});
    }
  };

  // 1. Four Tiers of Discontinuity
  const tierDescriptions = [
    { name: "Fallacy: Linear Pooling", desc: "Linear combination of sensory values collapses context. Fails Kochen-Specker and destroys non-commutative aspect geometry." },
    { name: "Tier I: Continua R_n", desc: "Smooth parameter continua with boundary tangents and nuclear Fréchet representations. Preserves local aspect differentials." },
    { name: "Tier II: Operadic Compression", desc: "Colored operad O_syn with free tree monads and Beck distributive laws. Encapsulates multi-arity feature composition." },
    { name: "Tier III: Sheaf Topos Gluing", desc: "Grothendieck sheaf topos E_syn over (Ctx_adm^sk, J_syn). Subcanonical site ensures holoform equalizers without phantom sections." }
  ];

  window.ch12_setTier = function(idx) {
    for (let i = 0; i < 4; i++) {
      const b = document.getElementById('ch12-tier-btn-' + i);
      if (b) b.classList.toggle('active', i === idx);
    }
    const readout = document.getElementById('ch12-tier-readout');
    if (readout && tierDescriptions[idx]) {
      readout.innerHTML = `<strong>${tierDescriptions[idx].name}</strong>: ${tierDescriptions[idx].desc}`;
    }
  };

  // 2. Goodman Mode
  window.ch12_setGoodmanMode = function(mode) {
    for (let i = 1; i <= 2; i++) {
      const b = document.getElementById('ch12-gm-btn-' + i);
      if (b) b.classList.toggle('active', i === mode);
    }
    const readout = document.getElementById('ch12-gm-readout');
    if (readout) {
      if (mode === 1) {
        readout.innerHTML = "<strong>Imperfect Community (Phantom)</strong>: Pairwise intersections nonempty, but triple equalizer Hol(U) = 0. Section fails to glue.";
      } else {
        readout.innerHTML = "<strong>True Holoform (Subcanonical Sheaf)</strong>: Full Cech 0-coboundary equalizer holds. Compatible sections glue to an invariant holoform.";
      }
    }
  };

  // 3. Zombie Impossibility Lab
  window.ch12_setZombiePreset = function(omg, dyn) {
    const slO = document.getElementById('ch12-zom-omg');
    const slD = document.getElementById('ch12-zom-dyn');
    if (slO) slO.value = omg;
    if (slD) slD.value = dyn;
    window.ch12_updateZombieLab();
  };

  window.ch12_updateZombieLab = function() {
    const elO = document.getElementById('ch12-zom-omg');
    const elD = document.getElementById('ch12-zom-dyn');
    if (!elO || !elD) return;
    const omg = parseFloat(elO.value);
    const dyn = parseFloat(elD.value);
    const vO = document.getElementById('ch12-zom-omg-val');
    const vD = document.getElementById('ch12-zom-dyn-val');
    if (vO) vO.textContent = omg.toFixed(2);
    if (vD) vD.textContent = dyn.toFixed(2);

    const energy = 0.5 * omg * omg + 0.3 * dyn * dyn;
    const isZombie = (omg === 0 && dyn === 0);
    const readout = document.getElementById('ch12-zom-readout');
    if (readout) {
      readout.innerHTML = isZombie
        ? "<span style='color:#ef4444; font-weight:bold;'>Philosophical Zombie State (Ω_int = 0): Unconscious flat manifold. Destroys all non-commutative aspect integration.</span>"
        : `<span style='color:#10b981; font-weight:bold;'>Conscious Experiential State</span>: Interaction curvature ‖Ω_int‖ = ${omg.toFixed(2)} | Gauge energy E = ${energy.toFixed(3)} > 0`;
    }
  };

  // 4. Dialectical Mereology Lab
  window.ch12_updateMereologyLab = function() {
    const elAd = document.getElementById('ch12-mer-ad');
    const elBp = document.getElementById('ch12-mer-bp');
    if (!elAd || !elBp) return;
    const ad = parseFloat(elAd.value);
    const bp = parseFloat(elBp.value);
    const vAd = document.getElementById('ch12-mer-ad-val');
    const vBp = document.getElementById('ch12-mer-bp-val');
    if (vAd) vAd.textContent = ad.toFixed(2);
    if (vBp) vBp.textContent = bp.toFixed(2);
    const aufhebung = Math.min(1.0, Math.sqrt(ad * bp) + 0.15 * Math.abs(ad - bp));
    const readout = document.getElementById('ch12-mer-readout');
    if (readout) {
      readout.textContent = `Dialectical Aufhebung Integral χ(ad, bp) = ${aufhebung.toFixed(3)} | Reflexive abstraction preserves partial aspects in higher corporate structure.`;
    }
  };

  // 5. Operadic Feature Erasure Lab
  window.ch12_updateErasureLab = function() {
    const elN = document.getElementById('ch12-er-n');
    const elM = document.getElementById('ch12-er-m');
    if (!elN || !elM) return;
    const n = parseInt(elN.value);
    const m = parseInt(elM.value);
    const vN = document.getElementById('ch12-er-n-val');
    const vM = document.getElementById('ch12-er-m-val');
    if (vN) vN.textContent = n;
    if (vM) vM.textContent = m;
    const preserved = Math.max(1, Math.round(n * (m / (m + 2.0))));
    const erased = Math.max(0, n - preserved);
    const readout = document.getElementById('ch12-er-readout');
    if (readout) {
      readout.textContent = `Input Features: ${n} | Operadic Tree Arity: ${m} | Preserved in Core: ${preserved} | Erased Marginals: ${erased}`;
    }
  };

  // 6. Working Memory Protosimplex Lab
  window.ch12_updateWorkingMemoryLab = function() {
    const elK = document.getElementById('ch12-wm-k');
    if (!elK) return;
    const k = parseInt(elK.value);
    const vK = document.getElementById('ch12-wm-k-val');
    if (vK) vK.textContent = `k=${k}`;
    const capacity = 2 * k + 1;
    const readout = document.getElementById('ch12-wm-readout');
    if (readout) {
      readout.textContent = `Postnikov Truncation Level τ_≤${k}: Working Memory Slot Span 2k+1 = ${capacity} chunks | Lawvere fixed-point ego capacity stabilized.`;
    }
  };

  // 7. Non-Abelian Qualia Hodge Lab
  window.ch12_updateHodgeLab = function() {
    const elDyn = document.getElementById('ch12-hdg-dyn');
    const elHar = document.getElementById('ch12-hdg-har');
    if (!elDyn || !elHar) return;
    const dyn = parseFloat(elDyn.value);
    const har = parseFloat(elHar.value);
    const vD = document.getElementById('ch12-hdg-dyn-val');
    const vH = document.getElementById('ch12-hdg-har-val');
    if (vD) vD.textContent = dyn.toFixed(2);
    if (vH) vH.textContent = har.toFixed(2);
    const totalQ = Math.sqrt(dyn * dyn + har * har);
    const readout = document.getElementById('ch12-hdg-readout');
    if (readout) {
      readout.textContent = `Hodge Decomposition: ‖γ_exact‖ = ${(0.6*dyn).toFixed(2)} | ‖γ_harmonic‖ = ${har.toFixed(2)} | Total Qualia Holonomy = ${totalQ.toFixed(3)}`;
    }
  };

  // 8. 6D Affective Space Lab
  window.ch12_setAffectivePreset = function(v, a, d) {
    const elV = document.getElementById('ch12-aff-v');
    const elA = document.getElementById('ch12-aff-a');
    const elD = document.getElementById('ch12-aff-d');
    if (elV) elV.value = v;
    if (elA) elA.value = a;
    if (elD) elD.value = d;
    window.ch12_updateAffectiveLab();
  };

  window.ch12_updateAffectiveLab = function() {
    const elV = document.getElementById('ch12-aff-v');
    const elA = document.getElementById('ch12-aff-a');
    const elD = document.getElementById('ch12-aff-d');
    if (!elV || !elA || !elD) return;
    const v = parseFloat(elV.value);
    const a = parseFloat(elA.value);
    const d = parseFloat(elD.value);
    const vV = document.getElementById('ch12-aff-v-val');
    const vA = document.getElementById('ch12-aff-a-val');
    const vD = document.getElementById('ch12-aff-d-val');
    if (vV) vV.textContent = v.toFixed(2);
    if (vA) vA.textContent = a.toFixed(2);
    if (vD) vD.textContent = d.toFixed(2);
    const stateNorm = Math.sqrt(v*v + a*a + d*d);
    const readout = document.getElementById('ch12-aff-readout');
    if (readout) {
      readout.textContent = `Affective Coordinate (Valence=${v.toFixed(2)}, Arousal=${a.toFixed(2)}, Dominance=${d.toFixed(2)}) | ‖Ψ_aff‖_R6 = ${stateNorm.toFixed(2)}`;
    }
  };

  // 9. Cech Obstruction Mode
  window.ch12_setObstructionMode = function(mode) {
    window.ch12_updateObstructionLab(mode);
  };

  window.ch12_updateObstructionLab = function(mode) {
    const m = mode || 1;
    const readout = document.getElementById('ch12-obs-readout');
    if (readout) {
      readout.innerHTML = (m === 1)
        ? "<strong>Vanishing Cech 1-Cocycle H^1(U, O_syn) = 0</strong>: No obstruction to cross-modal perceptual binding. Complete holoform equalizes."
        : "<strong>Non-Trivial Cocycle H^1 != 0</strong>: Perceptual agnosia / binding breakdown. Local sections cannot be glued globally.";
    }
  };

  // 10. Pushout Corporate Closure Lab
  window.ch12_updatePushoutClosureLab = function() {
    const elP = document.getElementById('ch12-push-p');
    const elQ = document.getElementById('ch12-push-q');
    if (!elP || !elQ) return;
    const p = parseInt(elP.value);
    const q = parseInt(elQ.value);
    const vP = document.getElementById('ch12-push-p-val');
    const vQ = document.getElementById('ch12-push-q-val');
    if (vP) vP.textContent = p;
    if (vQ) vQ.textContent = q;
    const dimPushout = p + q - Math.min(p, q, 2);
    const readout = document.getElementById('ch12-push-readout');
    if (readout) {
      readout.textContent = `Span Pushout P_a ⊞_φ P_b: dim(P_a)=${p}, dim(P_b)=${q} ⇒ dim(P_a ⊞ P_b) = ${dimPushout} | Satisfies Universal Factoring.`;
    }
  };

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

  function renderAllCh12Widgets() {
    window.ch12_setTier(0);
    window.ch12_setGoodmanMode(1);
    window.ch12_updateZombieLab();
    window.ch12_updateMereologyLab();
    window.ch12_updateErasureLab();
    window.ch12_updateWorkingMemoryLab();
    window.ch12_updateHodgeLab();
    window.ch12_updateAffectiveLab();
    window.ch12_updateObstructionLab(1);
    window.ch12_updatePushoutClosureLab();
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

  let synCh12Initialised = false;
  function initChapter12() {
    if (synCh12Initialised) return;
    synCh12Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh12Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter12);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter12();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter12();
  }
})();



// =========================================================================
// CHAPTER 12 3D ENGINE INJECTOR & RUNNER
// =========================================================================
const CH12_3D_STYLE = `
#ch12-3d-hud {
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

#ch12-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch12-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
}

#ch12-3d-hud.minimized .ch12-hud-body {
  display: none;
}

.ch12-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch12-hud-title {
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

.ch12-hud-title span:first-child {
  line-height: 1.15;
}

.ch12-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch12-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch12-hud-btn {
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

.ch12-hud-btn:hover, .ch12-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch12-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch12-canvas-wrap:active {
  cursor: grabbing;
}

#ch12-3d-hud.spotlight .ch12-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch12-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch12-overlay-bar {
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

.ch12-telemetry {
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

#ch12-node-inspector {
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

.ch12-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch12-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch12-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch12-scrubber .ch12-hud-btn {
  flex-shrink: 0;
}

#ch12-caption {
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
  #ch12-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    padding: 8px 10px 10px 10px;
  }
  #ch12-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
  }
  .ch12-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch12-hud-controls {
    gap: 3px;
  }
  .ch12-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch12-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch12-3d-hud {
    right: 6px;
    bottom: 6px;
    width: calc(100vw - 12px);
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
  }
  #ch12-3d-hud.minimized {
    width: calc(100vw - 12px);
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
  }
  .ch12-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch12-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch12-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch12-hud-controls {
    gap: 3px;
  }
  .ch12-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch12-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch12-3d-hud {
    right: 4px;
    bottom: 4px;
    width: calc(100vw - 8px);
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
  }
  #ch12-3d-hud.minimized {
    width: calc(100vw - 8px);
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
  }
  .ch12-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch12-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch12-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH12_3D_HTML = `<div class="ch12-hud-header">

    <div class="ch12-hud-title">

      <span>🧠 Ch 12 · 3D Discontinuity &amp; Qualia Engine</span>

      <span id="ch12-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch12-hud-controls">

      <button class="ch12-hud-btn active" id="ch12-btn-orbit" onclick="toggleCh12Orbit()">⟳ Orbit</button>

      <button class="ch12-hud-btn" onclick="toggleCh12Spotlight()">⛶ Spotlight</button>

      <button class="ch12-hud-btn" id="ch12-btn-min" onclick="toggleCh12Minimize()">+</button>

    </div>

  </div>



  <div class="ch12-hud-body">

    <div class="ch12-canvas-wrap" id="ch12-canvas-wrap">

      <canvas id="ch12-3d-canvas"></canvas>

      <div class="ch12-overlay-bar">

        <div class="ch12-telemetry" id="ch12-telemetry">R_n → ev_{𝒪_syn} → 𝒫 → Hol + Ω_int</div>

        <div id="ch12-node-inspector">Drag to Orbit 3D · Click Node to Inspect</div>

      </div>

    </div>



    <div class="ch12-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <input type="range" id="ch12-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh12Stage(this.value)">

      <button class="ch12-hud-btn active" id="ch12-btn-sync" onclick="enableCh12Sync()">Auto-Sync</button>

    </div>



    <div id="ch12-caption">

      <b>Stage 1 (§12.1.1–12.1.2):</b> 4-Tier Syntrometric Functorial Ascent resolving Representational Discontinuity.

    </div>

  </div>`;

function injectCh123DHUD() {
  if (document.getElementById('ch12-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH12_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch12-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH12_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch12_3d_engine_loaded) return;
  window.__ch12_3d_engine_loaded = true;

  function runCh12Engine() {
    injectCh123DHUD();
    if (window.__ch12_3d_engine_initialized) return;
    window.__ch12_3d_engine_initialized = true;

const canvas = document.getElementById('ch12-3d-canvas');

  const wrap = document.getElementById('ch12-canvas-wrap');

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

    1: "<b>Stage 1 (§12.1.1–12.1.2 — 4-Tier Functorial Ascent):</b> Tier I (R_n) → Tier II (ev_{𝒪_syn}) → Tier III (0D Protosimplex 𝒫) → Tier IV (Quale Gestalt).",

    2: "<b>Stage 2 (§12.1.3–12.1.4 — Goodman's Imperfect Community Resolved):</b> Triple fiber product e₁×_U e₂×_U e₃ ≅ 0_Ctx forces Def_U(s)_{123} ≠ 0!",

    3: "<b>Stage 3 (§12.1.5–12.1.7 — Thm. 12.3 Zombie Impossibility Proof):</b> Ω_int ≡ 0 ⇒ [a_i,a_j]=0 ⇒ Def_U ≠ 0 ⇒ Hol = ∅ ⇒ ev_{T_P} = {0} (⟦Zombie⟧ = ⊥_Ω)!",

    4: "<b>Stage 4 (§12.1.8–12.1.9 — Thm. 12.4 Aufhebung &amp; Def. 12.5 Mereology):</b> Archimedean t-norm χ(a_D,b_P) > θ_coord &amp; sublation C ∈ Prop_{k+1}.",

    5: "<b>Stage 5 (§12.2.1 — Thm. 12.6 Operadic Information Erasure):</b> Coinvariant projection π_sym erases dim ker(ev) ≥ n^m − C(n+m−1, m) > 0!",

    6: "<b>Stage 6 (§12.2.2 — Def. 12.7 &amp; Thm. 12.8 Protosimplex Collapse):</b> 10⁴-neuron IT attractor basin collapses via nerve N_{n+1} to 0D token 𝒫 ∈ CSeg(𝒳)_0.",

    7: "<b>Stage 7 (§12.2.3 — Thms. 12.9–12.10 Hodge Qualia Bipartition):</b> L²-orthogonal split Ω_int = Δ_{A₀}Φ_int (Dynamic Flow) ⊕ γ_harm (Topological Core).",

    8: "<b>Stage 8 (§12.2.4–12.2.5 — Thm. 12.11 6D Affective Circumplex &amp; Predator):</b> P_tiger ⊞_φ P_growl ⊞_φ P_visc with [a_vis, a_threat] ≠ 0 on R₄ × S₂!",

    9: "<b>Stage 9 (§12.3.1–12.3.5 — Thm. 12.21 Epistemic Obstruction Dichotomy):</b> Type I Evaluative 0-Coboundary (δ⁰s ≠ 0) vs. Type II Topological Ȟ¹ Antinomy!",

    10: "<b>Stage 10 (§12.3.6–12.5 — Thms. 12.25 &amp; 12.34 Working Memory &amp; Closure):</b> Hereditary stability Stable_k(P) under α* &amp; Syndromabschluss Λ^{m_K}(F) = {0}."

  };



  const STAGE_TELEMETRY = {

    1: "Tier I (R_n) → II (𝒪_syn) → III (𝒫) → IV (Hol)",

    2: "e₁ ×_U e₂ ×_U e₃ ≅ 0_Ctx ⇒ Def_U(s)_{123} ≠ 0",

    3: "Ω_int^𝒟 ≡ 0 ⇒ Hol = ∅ ⇒ ⟦Zombie(𝒩)⟧ = ⊥_Ω",

    4: "Strength = χ(ζ_r σ_{dr}, z_q σ_{fq}) > θ_coord",

    5: "dim ker(ev) ≥ n^m − C(n+m−1, m) > 0 (Thm. 12.6)",

    6: "𝒫 ∈ (N_{n+1}(M^{n+1}))_0 ≅ Obj(M^{n+1}) (0D)",

    7: "g_E = ½‖Δ_{A₀}Φ_int‖_{L²}² + ½‖γ_harm‖_{L²}²",

    8: "R₆ = R₄ × S₂ (x₅ Valence, x₆ Arousal) | 21+15",

    9: "Type I: [δ⁰s] = 0 ∈ Ȟ¹ | Type II: [g] ≠ 0 ∈ Ȟ¹",

    10: "U ⊩ Stable_k(P) ⇒ V ⊩ α*P | m_K > dim F ⇒ {0}"

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



  // Stage 1: 4-Tier Syntrometric Functorial Ascent Tower (Fig. 12.1)

  function renderStage1(w, h) {

    const tiers = [

      { id: "T1", z: -1.10, r: 1.30, col: "#4169E1", lbl: "Tier I: Continua R_n (Retina/Cochlea)", info: "Tier I: Raw sensory receptor coordinate arrays in R_n" },

      { id: "T2", z: -0.36, r: 0.95, col: "#20B2AA", lbl: "Tier II: Operad ev_{𝒪_syn} (V1/A1 Coinvariants)", info: "Tier II: Operadic evaluation consumes raw syntax into coinvariant quotients F_{γ+1}" },

      { id: "T3", z:  0.38, r: 0.55, col: "#FFA500", lbl: "Tier III: 0D Protosimplex 𝒫 (IT/STG Pointers)", info: "Tier III: 10⁴-neuron attractor basins collapse into 0-simplex tokens 𝒫 ∈ CSeg(𝒳)_0" },

      { id: "T4", z:  1.12, r: 0.22, col: "#FFD700", lbl: "Tier IV: Quale Gestalt (Hol + Ω_int^𝒟)", info: "Tier IV: Global Workspace Sheaf Equalizer Def_U(s)=0 + Non-Abelian Curvature Ω_int ≠ 0!" }

    ];

    let prev = null;

    tiers.forEach(t => {

      ctx.beginPath();

      ctx.strokeStyle = t.col;

      ctx.lineWidth = 2.0;

      for (let i = 0; i <= 36; i++) {

        const a = (i / 36) * Math.PI * 2;

        const p = proj(t.r * Math.cos(a), t.r * Math.sin(a), t.z, w, h);

        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

      const pNode = drawNode3D(t.id, 0, 0, t.z, t.id === "T4" ? 11 : 8, t.col, "#fff", t.lbl, t.info, w, h);

      if (prev) drawLine3D(prev, pNode, "#FFD700", 2.8);

      prev = pNode;

    });

  }



  // Stage 2: Goodman's Imperfect Community Simplicial Hollow Triangle (Fig. 12.4)

  function renderStage2(w, h) {

    const e1 = drawNode3D("Good_e1", -1.15, -0.75, 0, 9, "#4169E1", "#fff", "e₁ (Red, Rough)", "Elementary Experience e₁: Shares Red with e₂ and Rough with e₃", w, h);

    const e2 = drawNode3D("Good_e2",  1.15, -0.75, 0, 9, "#20B2AA", "#fff", "e₂ (Red, Round)", "Elementary Experience e₂: Shares Red with e₁ and Round with e₃", w, h);

    const e3 = drawNode3D("Good_e3",  0.00,  1.05, 0, 9, "#FFA500", "#fff", "e₃ (Round, Rough)", "Elementary Experience e₃: Shares Round with e₂ and Rough with e₁", w, h);



    drawLine3D(e1, e2, "#20B2AA", 3.0);

    drawLine3D(e2, e3, "#20B2AA", 3.0);

    drawLine3D(e3, e1, "#20B2AA", 3.0);



    // Central Triple Pullback Void e_1 x_U e_2 x_U e_3 \cong 0_{Ctx}

    drawNode3D("Good_Void", 0, -0.15, 0.35 * Math.sin(timeSec * 3), 10.5, "#DC143C", "#FFD700", "e₁×_U e₂×_U e₃ = 0_Ctx (Def_{123} ≠ 0)", "Sheaf Pullback Resolution: Empty triple intersection rejects Goodman's Phantom Quale!", w, h);

  }



  // Stage 3: Formal Impossibility of Chalmersian Zombies (Thm. 12.3)

  function renderStage3(w, h) {

    const chain = [

      { id: "Z_1", x: -1.30, z:  0.85, col: "#DC143C", lbl: "1. Assume Ω_int^𝒟 ≡ 0", info: "Zombie Premise: P-Consciousness suppressed (g_E = ½‖Ω_int‖² = 0)" },

      { id: "Z_2", x: -0.45, z:  0.30, col: "#FFA500", lbl: "2. [a_i, a_j] = 0 (Abelian)", info: "Vanishing Lie bracket decouples P₁ ⊞_φ P₂ into disjoint coproduct P₁ ⊕₁ P₂" },

      { id: "Z_3", x:  0.45, z: -0.30, col: "#9370DB", lbl: "3. Def_U(s) ≠ 0 ⇒ Hol = ∅", info: "Čech 0-coboundary defect diverges on overlap W = V₁ ×_U V₂; no global section!" },

      { id: "Z_4", x:  1.30, z: -0.85, col: "#FFD700", lbl: "4. ev_{T_P} = {0} (⊥_Ω)", info: "Thm. 12.3 Contradiction: Access Tree Monad T_P(X) cannot evaluate cross-modal inputs!" }

    ];

    let prev = null;

    chain.forEach(c => {

      const p = drawNode3D(c.id, c.x, 0, c.z, 9, c.col, "#fff", c.lbl, c.info, w, h);

      if (prev) drawLine3D(prev, p, "#DC143C", 3.2);

      prev = p;

    });

  }



  // Stage 4: Dialectical Sublation (Aufhebung, Thm. 12.4) & Archimedean t-Norm Surface (Def. 12.5)

  function renderStage4(w, h) {

    // 3D Product t-Norm Surface \chi(u, v) = u \cdot v over [-1, 1]^2

    for (let u = -1.1; u <= 1.11; u += 0.44) {

      ctx.beginPath();

      ctx.strokeStyle = "rgba(32, 178, 170, 0.48)";

      ctx.lineWidth = 1.5;

      for (let v = -1.1; v <= 1.11; v += 0.22) {

        const a = (u + 1.1) / 2.2, b = (v + 1.1) / 2.2;

        const z = -0.95 + 1.45 * (a * b);

        const p = proj(u, v, z, w, h);

        if (v === -1.1) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

      }

      ctx.stroke();

    }

    const pA = drawNode3D("Auf_A", -0.95, -0.5, -0.45, 8, "#DC143C", "#fff", "A ∈ Prop_k", "Antagonistic Subobject A: |ev_P(A) − ev_P(B)| > θ_tol", w, h);

    const pB = drawNode3D("Auf_B",  0.95, -0.5, -0.45, 8, "#4169E1", "#fff", "B ∈ Prop_k", "Antagonistic Subobject B in Heyting Mereology 𝔐_asp(U)", w, h);

    const pC = drawNode3D("Auf_C",  0.00,  0.6,  0.95, 11, "#FFD700", "#20B2AA", "C = Synthesize(A,B) ∈ Prop_{k+1}", "Thm. 12.4 Dialectical Aufhebung: Conflict-free higher-level syndrome generator!", w, h);

    drawLine3D(pA, pC, "#FFD700", 2.8);

    drawLine3D(pB, pC, "#FFD700", 2.8);

  }



  // Stage 5: Operadic Feature Consumption & Information Erasure (Thm. 12.6)

  function renderStage5(w, h) {

    const pQuot = drawNode3D("Sym_Quot", 0, 0, 1.05, 11, "#FFD700", "#20B2AA", "F_{γ+1} ≅ Sym^m(F_γ)/ℐ", "Thm. 12.6 Coinvariant Quotient: dim = C(n+m−1, m) (Raw V1 Gabor syntax consumed!)", w, h);

    // Full n^m Tensor Input Grid below: Symmetric modes rise to F_{\gamma+1}, Kernel modes evaporate

    for (let i = 0; i < 8; i++) {

      const a = timeSec * 0.5 + (i / 8) * Math.PI * 2;

      const isKer = (i % 2 === 1);

      const r = isKer ? 1.35 : 0.85;

      const z = isKer ? -0.35 + 0.35 * Math.sin(timeSec * 3 + i) : -0.95;

      const pNode = drawNode3D(

        "Er_" + i, r * Math.cos(a), r * Math.sin(a), z, isKer ? 5.5 : 7.5,

        isKer ? "#DC143C" : "#4169E1", "#fff",

        i === 0 ? "F_γ^{⊗m} (n^m)" : (i === 1 ? "ker(ev) > 0 (Erased)" : ""),

        isKer

          ? "Erased Non-Symmetric Permutation Mode in ker(ev) (dim ≥ n^m − C(n+m−1,m) > 0)"

          : "Operand Feature Channel consumed into Coinvariant Quotient F_{γ+1}", w, h

      );

      if (!isKer) drawLine3D(pNode, pQuot, "#20B2AA", 2.5);

    }

  }



  // Stage 6: Protosimplex Encapsulation & 0-Simplex Dimension Collapse (Def. 12.7, Thm. 12.8)

  function renderStage6(w, h) {

    // Lower 10^4-Neuron IT Attractor Basin Cloud collapsing into Upper 0-Simplex Point Token \mathcal{P}

    const pToken = drawNode3D("Proto_0D", 0, 0, 1.05, 12, "#FFD700", "#fff", "𝒫 ∈ CSeg(𝒳_syn)_0 (0D Token)", "Thm. 12.8 Protosimplex Dimension-Collapse: Internal circuit trajectories become degenerate s₀(𝒫)!", w, h);

    for (let k = 0; k < 10; k++) {

      const a = timeSec * 1.4 + (k / 10) * Math.PI * 2;

      const rad = 0.35 + 0.65 * (k % 2);

      const x = rad * Math.cos(a), y = rad * Math.sin(a), z = -0.85 + 0.15 * Math.sin(a * 3);

      const pN = drawNode3D("Neu_" + k, x, y, z, 5, "#20B2AA", "#fff", k === 0 ? "10⁴-D IT Attractor B(T_z)" : "", "Recurrent Neural Micro-Circuit State in Fréchet Manifold C^∞(ℝ^k, ℝ^N)", w, h);

      drawLine3D(pN, pToken, "rgba(255,215,0,0.42)", 1.5, [3, 2]);

    }

  }



  // Stage 7: Non-Abelian Commutators & Hodge Bipartition of Qualia Energy (Thms. 12.9-12.10)

  function renderStage7(w, h) {

    // Persistent Harmonic Topological Background Torus \gamma_{harm} \in \ker(\Delta_{A_0})

    ctx.beginPath();

    ctx.strokeStyle = "#FFA500";

    ctx.lineWidth = 3.2;

    for (let i = 0; i <= 48; i++) {

      const a = (i / 48) * Math.PI * 2;

      const p = proj(1.15 * Math.cos(a), 1.15 * Math.sin(a), -0.45, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    // Orthogonal Dynamic Intentional Qualia Wave \Delta_{A_0}\Phi_{int} \in \operatorname{im}(\Delta_{A_0})

    ctx.beginPath();

    ctx.strokeStyle = "#20B2AA";

    ctx.lineWidth = 2.8;

    for (let i = 0; i <= 48; i++) {

      const s = (i / 48) * 2.2 - 1.1;

      const p = proj(0, 0.45 * Math.sin(s * 5 + timeSec * 4), s, w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();



    drawNode3D("Hodge_Harm", 1.15, 0, -0.45, 8.5, "#FFA500", "#fff", "γ_harm ∈ ker(Δ_{A₀})", "Topological Background Self-Presence (Persistent de Rham Cohomology H²_dR)", w, h);

    drawNode3D("Hodge_Dyn", 0, 0, 0.95, 8.5, "#20B2AA", "#fff", "Δ_{A₀}Φ_int ∈ im(Δ_{A₀})", "Dynamic Intentional Qualia (Transient Focal Attention Shifts)", w, h);

    drawNode3D("Hodge_Sum", 0, 0, -0.45, 10.5, "#FFD700", "#DC143C", "g_E = ½‖ΔΦ‖² + ½‖γ_harm‖²", "Thm. 12.10 Exact L²-Orthogonal Fredholm Bipartition of Qualia Energy!", w, h);

  }



  // Stage 8: 6D Affective Circumplex (R_4 x S_2) & Predator Threat Synthesis (Thm. 12.11)

  function renderStage8(w, h) {

    const pTig = drawNode3D("Pr_Vis", -1.15, -0.65, -0.75, 8, "#FFA500", "#fff", "P_tiger (IT 0D)", "Visual Protosimplex Token (580nm orange/black moving vertical stripes)", w, h);

    const pGrw = drawNode3D("Pr_Aud",  1.15, -0.65, -0.75, 8, "#4169E1", "#fff", "P_growl (STG 0D)", "Auditory Protosimplex Token (80Hz low-frequency acoustic harmonics)", w, h);

    const pVis = drawNode3D("Pr_Vsc",  0.00,  1.05, -0.75, 8, "#DC143C", "#fff", "P_visc (Amygdala)", "Visceral Affective Stream on S₂(x₅ Valence < 0, x₆ Arousal 42Hz)", w, h);



    const pQuale = drawNode3D("Pr_Quale", 0, 0, 0.45, 11.5, "#FFD700", "#DC143C", "[a_vis, a_threat] ≠ 0 (Terror Quale)", "Tier IV Global Workspace Pushout P_vis ⊞_φ P_aud ⊞_φ P_visc on R₆ = R₄ × S₂!", w, h);

    const pMotor = drawNode3D("Pr_Act", 0, 0, 1.25, 9, "#20B2AA", "#FFD700", "Motor Saccade α : U → U' (V̇ ≤ −γV)", "Telecentric Active Inference Escape Action minimizing Lyapunov threat potential!", w, h);



    drawLine3D(pTig, pQuale, "#FFA500", 2.6);

    drawLine3D(pGrw, pQuale, "#4169E1", 2.6);

    drawLine3D(pVis, pQuale, "#DC143C", 2.6);

    drawLine3D(pQuale, pMotor, "#20B2AA", 3.4);

  }



  // Stage 9: Epistemic Obstruction Dichotomy — Type I (0-Coboundary) vs Type II (\check{H}^1 Antinomy, Thm. 12.21)

  function renderStage9(w, h) {

    // Left: Type I Evaluative Discrepancy (\delta^0 s \ne 0, [g] = 0 \in \check{H}^1)

    const pT1 = drawNode3D("Ob_T1", -0.95, 0, 0, 9.5, "#20B2AA", "#fff", "Type I: [δ⁰s] = 0 ∈ Ȟ¹", "Thm. 12.21(1) Evaluative Discrepancy: 0-coboundary δ⁰s ≠ 0 resolvable by local context refinement", w, h);

    // Right: Type II Twisted Möbius 1-Cocycle Antinomy ([g] \ne 0 \in \check{H}^1)

    ctx.beginPath();

    ctx.strokeStyle = "#DC143C";

    ctx.lineWidth = 2.8;

    for (let i = 0; i <= 50; i++) {

      const a = (i / 50) * Math.PI * 2;

      const r = 0.55 + 0.18 * Math.cos(a * 0.5 + timeSec * 2);

      const p = proj(0.85 + r * Math.cos(a), r * Math.sin(a), 0.45 * Math.sin(a * 0.5 + timeSec * 2), w, h);

      if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);

    }

    ctx.stroke();

    const pT2 = drawNode3D("Ob_T2", 0.85, 0, 0, 9.5, "#DC143C", "#FFD700", "Type II: [g] ≠ 0 ∈ Ȟ¹", "Thm. 12.21(2) Intrinsic Topological Antinomy: Non-trivial 1-cocycle obstructs global Holoform!", w, h);

    drawLine3D(pT1, pT2, "rgba(255,215,0,0.45)", 1.8, [4, 3]);

  }



  // Stage 10: Hereditary Working Memory \mathsf{Stable}_k(P) (Thm. 12.25) & Syndromabschluss \Lambda^{m_K}(F) = {0} (Thm. 12.34)

  function renderStage10(w, h) {

    const levels = [

      { k: 0, z: -1.05, col: "#4169E1", lbl: "k=0: Stable₀(a_i) ∈ AP₀" },

      { k: 1, z: -0.35, col: "#20B2AA", lbl: "k=1: Stable₁(P') (IGP₁ Grounded)" },

      { k: 2, z:  0.35, col: "#FFA500", lbl: "k=2: α* Stable₂(P'') (Pullback Invariant)" },

      { k: 3, z:  1.05, col: "#FFD700", lbl: "m_K > dim F ⇒ Λ^{m_K}(F) = {0} (Closure!)" }

    ];

    let prev = null;

    levels.forEach(lv => {

      const p = drawNode3D(

        "WM_" + lv.k, 0, 0, lv.z, lv.k === 3 ? 11 : 8.5, lv.col, "#fff", lv.lbl,

        lv.k === 3

          ? "Thm. 12.34 Programmable Cognitive Closure (Syndromabschluss): Exterior power vanishes for m_K > dim F!"

          : `Thm. 12.25 Working Memory Invariance at Stratum k=${lv.k}: Preserved under any context pullback α*`, w, h

      );

      if (prev) drawLine3D(prev, p, "#FFD700", 3.0);

      prev = p;

    });

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

  window.setCh12Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch12-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch12-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch12-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch12-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch12-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh12Stage = function(val) { window.setCh12Stage(val, true); };



  window.enableCh12Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch12-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh12WithDeck();

  };



  window.toggleCh12Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch12-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh12Spotlight = function() {

    const hud = document.getElementById('ch12-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh12Minimize = function() {

    const hud = document.getElementById('ch12-3d-hud');

    const b = document.getElementById('ch12-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



  function syncCh12WithDeck() {
    if (!autoSync) return;
    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch12-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
      const currentSlide = window.Reveal.getCurrentSlide();
      const inCh = currentSlide ? !!currentSlide.closest('#chapter-12, section[data-chapter="12"]') : true;
      chHud.style.display = inCh ? '' : 'none';
      if (!inCh) return;
    }
    const vp = document.querySelector('.reveal-viewport');

    const isScroll = vp && vp.classList.contains('reveal-scroll');

    if (isScroll) {

      const scEl = vp.scrollHeight > vp.clientHeight ? vp : document.documentElement;

      const top = vp.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;

      const max = Math.max(1, (scEl.scrollHeight || document.body.scrollHeight) - window.innerHeight);

      window.setCh12Stage(1.0 + Math.min(1, Math.max(0, top / max)) * 9.0, false);

    } else if (window.Reveal && typeof window.Reveal.getIndices === 'function') {

      const idx = window.Reveal.getIndices();

      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 13);

      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;

      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;

      window.setCh12Stage(1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0, false);

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



  window.addEventListener('mouseup', () => { isDragging = false; });

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



  wrap.addEventListener('click', e => {

    e.stopPropagation();

    const rect = canvas.getBoundingClientRect();

    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    let hit = null;

    for (let i = hitNodes.length - 1; i >= 0; i--) {

      const n = hitNodes[i];

      if (Math.hypot(mx - n.p.sx, my - n.p.sy) <= n.r + 6) { hit = n; break; }

    }

    const insp = document.getElementById('ch12-node-inspector');

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

    syncCh12WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

    window.addEventListener('scroll', syncCh12WithDeck, { passive: true });

    const vp = document.querySelector('.reveal-viewport');

    if (vp) vp.addEventListener('scroll', syncCh12WithDeck, { passive: true });

    if (window.Reveal) {

      window.Reveal.on('ready', syncCh12WithDeck);

      window.Reveal.on('slidechanged', syncCh12WithDeck);

      window.Reveal.on('fragmentshown', syncCh12WithDeck);

      window.Reveal.on('fragmenthidden', syncCh12WithDeck);

    }

    const hud = document.getElementById('ch12-3d-hud');

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
    document.addEventListener('DOMContentLoaded', runCh12Engine);
  } else {
    runCh12Engine();
  }
})();
