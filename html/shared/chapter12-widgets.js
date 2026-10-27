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

