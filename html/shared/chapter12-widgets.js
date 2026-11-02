// ============================================================================
// CHAPTER 12: NEURO-SYNTROMETRY, AFFECTIVE TELECENTRICS & NON-REDUCTIVE PHYSICALISM
// Interactive Widgets + 12-Stage 3D WebGL-Style Morph Engine
// ============================================================================
(function () {
  "use strict";

  window.showGenericTab = function (prefix, idx, total, btnEl) {
    for (let i = 1; i <= total; i++) {
      const pane = document.getElementById(prefix + "-" + i);
      if (pane) pane.classList.toggle("active", i === idx);
    }
    if (btnEl && btnEl.parentElement) {
      const siblings = btnEl.parentElement.querySelectorAll(".syn-tab-btn");
      siblings.forEach((b) => b.classList.remove("active"));
      btnEl.classList.add("active");
    }
  };

  window.ch12_showXrefTab = function (idx, btnEl) {
    window.showGenericTab("ch12-xref-pane", idx, 3, btnEl);
  };

  // ==========================================================================
  // SLIDE 1: 4-TIER EPISTEMIC STRATIFICATION EXPLORER (DEF. 12.1)
  // ==========================================================================
  const TIER_DATA = {
    A: {
      badge: "Stratum A — Rigorously Proven",
      title: "Stratum A: Pure Mathematics & Formal Topos Proofs",
      border: "#20B2AA",
      desc: "Unconditionally proven mathematical theorems in differential geometry, category theory, coalgebra, and homological algebra.",
      examples: "Subobject classifier Ω_Phenom (Def. 12.2), Non-Triviality of Conscious Functor Ψ (Thm. 12.3), Mereological Adjunction ℒ_bind ⊣ ℛ_part (Thm. 12.4), Hodge Decomposition (Thm. 12.7), Lean 4 Kernel Proofs (App. C).",
      nodes: [1, 0.25, 0.25, 0.25]
    },
    B: {
      badge: "Stratum B — Conditional Bridge",
      title: "Stratum B: Conditional Mathematical Physics & Neuro-Modeling",
      border: "#4169E1",
      desc: "Exact mathematical theorems derived conditionally from explicit, stated neuro-computational or physical modeling hypotheses.",
      examples: "Non-Existence of Philosophical Zombies under Axiom 12.3 (Thm. 12.3(3)), Landauer Erasure Work Bound ΔQ ≥ N_erase k_B T ln 2 (Prop. 12.5), 4±1 Working Memory Capacity (Prop. 12.6), Affective Telecentric Flow (Thm. 12.8).",
      nodes: [0.55, 1, 0.3, 0.25]
    },
    C: {
      badge: "Stratum C — Phenomenological Ansatz",
      title: "Stratum C: Phenomenological Neuro-Biophysical Ansätze",
      border: "#FFA500",
      desc: "Falsifiable structural models mapping formal categorical invariants onto concrete neurobiological substrates and EEG/MEG signatures.",
      examples: "Thalamocortical ~40 Hz gamma phase-locking as cohomological gluing H^1(U,F)=0; Theta-gamma cross-frequency coupling (f_γ/f_θ ≈ 40/6); Noradrenergic/dopaminergic arousal modulation of g_AR.",
      nodes: [0.4, 0.65, 1, 0.3]
    },
    D: {
      badge: "Stratum D — Speculative Horizon",
      title: "Stratum D: Speculative Extrapolations & Open Conjectures",
      border: "#9370DB",
      desc: "Quarantined speculative hypotheses and philosophical horizons strictly barred from entering the premise set of Strata A–C.",
      examples: "Global trans-individual affinity fields, macro-scale telecentric attractors beyond biological neural networks, and open cosmological unification conjectures.",
      nodes: [0.25, 0.25, 0.35, 1]
    }
  };

  window.ch12_setTier = function (tier) {
    const d = TIER_DATA[tier] || TIER_DATA.A;
    ["a", "b", "c", "d"].forEach((k) => {
      const b = document.getElementById("ch12-tier-btn-" + k);
      if (b) {
        const active = k.toUpperCase() === tier;
        b.style.background = active ? d.border : "";
        b.style.color = active ? "#000" : "";
        b.style.fontWeight = active ? "bold" : "";
      }
    });
    const svg = document.getElementById("ch12-tier-svg");
    if (svg) {
      const labels = ["Stratum A: Math Proofs", "Stratum B: Bridge Models", "Stratum C: Neuro Ansatz", "Stratum D: Quarantined"];
      const cols = ["#20B2AA", "#4169E1", "#FFA500", "#9370DB"];
      const keys = ["A", "B", "C", "D"];
      let html = "";
      for (let i = 0; i < 4; i++) {
        const x = 14 + i * 102;
        const isSel = keys[i] === tier;
        const op = d.nodes[i];
        html += `<rect x="${x}" y="18" width="90" height="58" rx="7" fill="rgba(15,23,42,0.9)" stroke="${cols[i]}" stroke-width="${isSel ? 2.6 : 1.2}" opacity="${op}"/>`;
        html += `<text x="${x + 45}" y="42" fill="${cols[i]}" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle" opacity="${op}">STRATUM ${keys[i]}</text>`;
        html += `<text x="${x + 45}" y="60" fill="#cbd5e1" font-size="8.5" font-family="sans-serif" text-anchor="middle" opacity="${op}">${labels[i].split(": ")[1]}</text>`;
        if (i < 2) {
          html += `<line x1="${x + 90}" y1="47" x2="${x + 102}" y2="47" stroke="#64748b" stroke-width="1.5" marker-end="url(#arr)"/>`;
        } else if (i === 2) {
          html += `<line x1="${x + 96}" y1="12" x2="${x + 96}" y2="82" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,3"/>`;
          html += `<text x="${x + 96}" y="92" fill="#ef4444" font-size="7.5" font-family="monospace" text-anchor="middle">FIREWALL</text>`;
        }
      }
      svg.innerHTML = html;
    }
    const ro = document.getElementById("ch12-tier-readout");
    if (ro) {
      ro.style.borderLeftColor = d.border;
      ro.innerHTML = `<b style="color:${d.border};">${d.title}</b><br><span style="color:#cbd5e1;">${d.desc}</span><br><span style="color:#94a3b8;"><b>Chapter 12 Instances:</b> ${d.examples}</span>`;
    }
  };

  // ==========================================================================
  // SLIDE 2: GOODMAN IMPERFECT COMMUNITY & SHEAF DESCENT LAB (§12.1.4)
  // ==========================================================================
  window.ch12_setGoodmanMode = function (mode) {
    const m = typeof mode === "number" ? mode : (mode === "nominalist" ? 1 : 2);
    for (let i = 1; i <= 3; i++) {
      const b = document.getElementById("ch12-gm-btn-" + i);
      if (b) {
        const active = i === m;
        b.style.background = active ? "#FFD700" : "";
        b.style.color = active ? "#000" : "";
        b.style.fontWeight = active ? "bold" : "";
      }
    }
    const svg = document.getElementById("ch12-gm-svg");
    const ro = document.getElementById("ch12-gm-readout");
    if (svg) {
      if (m === 1) {
        svg.innerHTML = `
          <rect x="12" y="10" width="396" height="115" rx="8" fill="rgba(239,68,68,0.08)" stroke="#ff6b81" stroke-width="1.4" stroke-dasharray="4,3"/>
          <text x="210" y="28" fill="#ff6b81" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Goodman Imperfect Community: {e₁=(R,G), e₂=(G,B), e₃=(B,R)}</text>
          <circle cx="95" cy="75" r="28" fill="rgba(239,68,68,0.22)" stroke="#ff6b81" stroke-width="1.5"/><text x="95" y="78" fill="#fff" font-size="9.5" font-family="monospace" text-anchor="middle">e₁(R,G)</text>
          <circle cx="135" cy="75" r="28" fill="rgba(32,178,170,0.22)" stroke="#20B2AA" stroke-width="1.5"/><text x="135" y="78" fill="#fff" font-size="9.5" font-family="monospace" text-anchor="middle">e₂(G,B)</text>
          <circle cx="115" cy="52" r="28" fill="rgba(65,105,225,0.22)" stroke="#4169E1" stroke-width="1.5"/><text x="115" y="55" fill="#fff" font-size="9.5" font-family="monospace" text-anchor="middle">e₃(B,R)</text>
          <text x="290" y="56" fill="#ff6b81" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">e₁ ×_U e₂ ×_U e₃ ≅ 0_Ctx</text>
          <text x="290" y="76" fill="#FFD700" font-size="9.5" font-family="monospace" text-anchor="middle">Def_U(s)₁₂₃ ≠ 0 ⇒ Hol(U,P) = ∅</text>
          <text x="290" y="96" fill="#94a3b8" font-size="8.5" font-family="sans-serif" text-anchor="middle">Carnap clique accepted; Topos sheaf rejects</text>
        `;
      } else if (m === 2) {
        svg.innerHTML = `
          <rect x="12" y="10" width="396" height="115" rx="8" fill="rgba(32,178,170,0.08)" stroke="#20B2AA" stroke-width="1.5"/>
          <text x="210" y="28" fill="#20B2AA" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">True Holoform Community: {e₁=(R,G), e₂=(R,B), e₃=(R,Y)}</text>
          <circle cx="100" cy="72" r="28" fill="rgba(32,178,170,0.2)" stroke="#20B2AA" stroke-width="1.5"/>
          <circle cx="122" cy="72" r="28" fill="rgba(32,178,170,0.2)" stroke="#20B2AA" stroke-width="1.5"/>
          <circle cx="111" cy="56" r="28" fill="rgba(32,178,170,0.2)" stroke="#20B2AA" stroke-width="1.5"/>
          <circle cx="111" cy="67" r="9" fill="#FFD700"/><text x="111" y="70" fill="#000" font-size="8.5" font-weight="bold" text-anchor="middle">R</text>
          <text x="290" y="56" fill="#20B2AA" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">e₁ ×_U e₂ ×_U e₃ = {R} ≠ 0_Ctx</text>
          <text x="290" y="76" fill="#FFD700" font-size="9.5" font-family="monospace" text-anchor="middle">Def_U(s) = 0 ⇒ Hol(U,P) ≅ P(U)</text>
          <text x="290" y="96" fill="#cbd5e1" font-size="8.5" font-family="sans-serif" text-anchor="middle">Unique global section s ∈ Γ(U, P) glued</text>
        `;
      } else {
        svg.innerHTML = `
          <rect x="12" y="10" width="396" height="115" rx="8" fill="rgba(65,105,225,0.08)" stroke="#4169E1" stroke-width="1.5"/>
          <text x="210" y="28" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Companionship Difficulty Resolution via Fiber Pullbacks</text>
          <rect x="34" y="45" width="145" height="62" rx="6" fill="#0f172a" stroke="#38bdf8"/>
          <text x="106" y="68" fill="#38bdf8" font-size="9.5" font-family="monospace" text-anchor="middle">Subobject P_color ↪ y(U)</text>
          <text x="106" y="86" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="middle">Fiber π_color⁻¹(R)</text>
          <text x="205" y="78" fill="#FFD700" font-size="13" font-family="monospace" text-anchor="middle">≇</text>
          <rect x="232" y="45" width="150" height="62" rx="6" fill="#0f172a" stroke="#FFA500"/>
          <text x="307" y="68" fill="#FFA500" font-size="9.5" font-family="monospace" text-anchor="middle">Subobject P_pitch ↪ y(U)</text>
          <text x="307" y="86" fill="#94a3b8" font-size="8.5" font-family="monospace" text-anchor="middle">Fiber π_pitch⁻¹(C♯)</text>
        `;
      }
    }
    if (ro) {
      if (m === 1) {
        ro.innerHTML = `<span style="color:#ff6b81; font-weight:bold;">[IMPERFECT COMMUNITY — REJECTED BY TOPOS]</span> Pairwise overlaps are non-empty ($e_1 \\cap e_2 = \\{G\\}, e_2 \\cap e_3 = \\{B\\}, e_3 \\cap e_1 = \\{R\\}$), tricking Carnap's 2-clique into hallucinating a phantom quality. In $\\mathcal{E}_{\\mathrm{syn}}$, the triple pullback $e_1 \\times_U e_2 \\times_U e_3 \\cong \\mathbf{0}_{\\mathrm{Ctx}}$ forces $\\operatorname{Def}_{\\mathcal{U}}(s)_{123} \\ne 0$, so $\\operatorname{Hol}(\\mathcal{U},\\mathbf{P}) = \\emptyset$.`;
      } else if (m === 2) {
        ro.innerHTML = `<span style="color:#20B2AA; font-weight:bold;">[TRUE HOLOFORM — GLUED BY SHEAF EQUALIZER]</span> All three experiences share the universal quality $R$ on the triple fiber product $e_1 \\times_U e_2 \\times_U e_3 \\ne \\mathbf{0}_{\\mathrm{Ctx}}$. The Čech coboundary vanishes ($\\operatorname{Def}_{\\mathcal{U}}(s) = 0$), yielding a genuine conscious quale $s \\in \\operatorname{Hol}(\\mathcal{U},\\mathbf{P})$.`;
      } else {
        ro.innerHTML = `<span style="color:#38bdf8; font-weight:bold;">[COMPANIONSHIP SEPARATION]</span> Even if two qualities $q_1, q_2$ co-occur extensionally in every observed experience, their typed operadic projections $\\pi_1, \\pi_2$ in $\\operatorname{Sub}_{\\mathcal{E}_{\\mathrm{syn}}}(\\mathbf{y}(U))$ remain distinct subobjects.`;
      }
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 3: CHALMERSIAN ZOMBIE REFUTATION LAB (THM. 12.3)
  // ==========================================================================
  window.ch12_setZombiePreset = function (comm, aint) {
    const cEl = document.getElementById("ch12-zm-comm");
    const aEl = document.getElementById("ch12-zm-aint");
    if (cEl) cEl.value = String(comm);
    if (aEl) aEl.value = String(aint);
    window.ch12_updateZombieLab();
  };

  window.ch12_updateZombieLab = function () {
    const cEl = document.getElementById("ch12-zm-comm") || document.getElementById("ch12-zm-phi");
    const aEl = document.getElementById("ch12-zm-aint") || document.getElementById("ch12-zm-def");
    if (!cEl || !aEl) return;
    const comm = parseFloat(cEl.value);
    const aint = parseFloat(aEl.value);

    const cVal = document.getElementById("ch12-zm-comm-val") || document.getElementById("ch12-zm-phi-val");
    const aVal = document.getElementById("ch12-zm-aint-val") || document.getElementById("ch12-zm-def-val");
    if (cVal) cVal.textContent = comm.toFixed(2);
    if (aVal) aVal.textContent = aint.toFixed(2);

    const omegaNorm = Math.sqrt(comm * comm + aint * aint + 0.5 * comm * aint);
    const gE = 0.5 * omegaNorm * omegaNorm;
    const isZombieAttempt = gE < 0.005;

    const ro = document.getElementById("ch12-zm-readout");
    if (ro) {
      if (isZombieAttempt) {
        ro.innerHTML = `<span style="color:#ff6b81; font-weight:bold;">[ZOMBIE ATTEMPT (Ω_int ≡ 0) ⇒ TOTAL INFERENTIAL COLLAPSE]</span> Setting $\\|[a_1,a_2]\\| = 0$ and $\\|a_{\\mathrm{int}}\\| = 0$ forces $g_E = 0$ (P-Conscious = False). By Theorem 12.3, the carrier pushout collapses to the uncoupled $\\ell^1$-coproduct $P_1 \\oplus_1 P_2$, forcing overlap defect $\\operatorname{Def}_{\\mathcal{U}}(s)_{12} \\ne 0 \\implies \\operatorname{Hol}(\\mathcal{U},\\mathbf{P}) = \\emptyset \\implies \\operatorname{ev}(T_{\\mathsf{P}}) = \\{0\\}$ (<b>A-Conscious = False!</b>) — <b>Zombie Contradiction $\\llbracket \\mathsf{Zombie}(\\mathcal{N}) \\rrbracket = \\bot_\\Omega$</b>.`;
      } else {
        ro.innerHTML = `<span style="color:#20B2AA; font-weight:bold;">[CONSCIOUS MULTI-MODAL BINDING: g_E = ${gE.toFixed(3)} &gt; 0]</span> Non-Abelian curvature $\\|\\Omega_{\\mathrm{int}}^{\\mathcal{D}}\\| = ${omegaNorm.toFixed(2)} > 0$ glues the carrier pushout $P_1 \\boxplus_\\phi P_2$ with $\\operatorname{Def}_{\\mathcal{U}}(s) = 0$, enabling global section $s \\in \\operatorname{Hol}(\\mathcal{U},\\mathbf{P})$ and non-zero Access evaluation $\\operatorname{ev}(T_{\\mathsf{P}}) \\ne \\{0\\}$.`;
      }
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 4: HEYTING MEREOLOGY & t-NORM COORDINATION LAB (THM. 12.4, DEF. 12.5)
  // ==========================================================================
  window.ch12_updateMereologyLab = function () {
    const adEl = document.getElementById("ch12-mer-ad");
    const bpEl = document.getElementById("ch12-mer-bp");
    const thEl = document.getElementById("ch12-mer-th");
    const tnEl = document.getElementById("ch12-mer-tnorm");
    if (!adEl || !bpEl || !thEl) return;

    const a = parseFloat(adEl.value);
    const b = parseFloat(bpEl.value);
    const th = parseFloat(thEl.value);
    const mode = tnEl ? tnEl.value : "prod";

    const adVal = document.getElementById("ch12-mer-ad-val");
    const bpVal = document.getElementById("ch12-mer-bp-val");
    const thVal = document.getElementById("ch12-mer-th-val");
    if (adVal) adVal.textContent = a.toFixed(2);
    if (bpVal) bpVal.textContent = b.toFixed(2);
    if (thVal) thVal.textContent = th.toFixed(2);

    let chi = a * b;
    let normName = "Product (a · b)";
    if (mode === "luk") {
      chi = Math.max(0, a + b - 1);
      normName = "Łukasiewicz max(0, a+b-1)";
    } else if (mode === "godel") {
      chi = Math.min(a, b);
      normName = "Gödel min(a, b)";
    }
    const coordinated = chi > th;
    const ro = document.getElementById("ch12-mer-readout");
    if (ro) {
      ro.innerHTML =
        `Archimedean $t$-Norm (${normName}): $\\operatorname{Strength}((d_r,f_q),U) = \\chi(${a.toFixed(2)}, ${b.toFixed(2)}) = <b style="color:#FFD700;">${chi.toFixed(3)}</b>$ vs $\\theta_{\\mathrm{coord}} = <b>${th.toFixed(2)}</b>$<br>` +
        (coordinated
          ? `<span style="color:#20B2AA; font-weight:bold;">[ACTIVELY COORDINATED IN 𝔐_asp(U)]</span> Pair exceeds $\\theta_{\\mathrm{coord}}$, forming a unified Heyting parthood subobject satisfying constructive CEM axioms <b>MSL-M1</b> &amp; <b>MSL-M2</b>.`
          : `<span style="color:#ff6b81; font-weight:bold;">[UNCOORDINATED SUB-THRESHOLD PAIR]</span> $\\chi(a_D, b_P) \\le \\theta_{\\mathrm{coord}}$ — triggers dialectical sublation ($\\operatorname{Aufhebung}$, Thm. 12.4) to synthesize higher-level generator $C \\in \\operatorname{Prop}_{k+1}$.`);
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 5: LANDAUER METABOLIC ERASURE LAB (THM. 12.6, FIG. 12.9)
  // ==========================================================================
  window.ch12_updateErasureLab = function () {
    const dEl = document.getElementById("ch12-er-d");
    const rEl = document.getElementById("ch12-er-r");
    if (!dEl || !rEl) return;
    const D = parseInt(dEl.value, 10);
    const r = parseInt(rEl.value, 10);

    const dVal = document.getElementById("ch12-er-d-val");
    const rVal = document.getElementById("ch12-er-r-val");
    if (dVal) dVal.textContent = D + " bits/s";
    if (rVal) rVal.textContent = r + " bits/s";

    const nErase = Math.max(0, D - r);
    const kBTln2 = 2.977e-21;
    const powerMin = nErase * kBTln2;

    const barsSvg = document.getElementById("ch12-er-bars");
    if (barsSvg) {
      const wD = Math.min(320, Math.round((D / 10000) * 320));
      const wR = Math.min(320, Math.round((r / 10000) * 320));
      const wE = Math.max(0, wD - wR);
      barsSvg.innerHTML = `
        <text x="10" y="18" fill="#94a3b8" font-size="9.5" font-family="monospace">Sensory Inflow H(X) (${D})</text>
        <rect x="175" y="8" width="${Math.max(4, wD * 0.78)}" height="12" rx="3" fill="#38bdf8"/>
        <text x="10" y="38" fill="#20B2AA" font-size="9.5" font-family="monospace">Macro Quota H(Y) (${r})</text>
        <rect x="175" y="28" width="${Math.max(3, wR * 0.78)}" height="12" rx="3" fill="#20B2AA"/>
        <text x="10" y="56" fill="#ff6b81" font-size="9.5" font-family="monospace">Erased H(X|Y) (${nErase})</text>
        <rect x="175" y="46" width="${Math.max(4, wE * 0.78)}" height="12" rx="3" fill="#ff6b81"/>
      `;
    }

    const ro = document.getElementById("ch12-er-readout");
    if (ro) {
      ro.innerHTML = `Erased Fibre Entropy $H(X_n|Y_{n+1}) = <b>${nErase} bits/s</b>$ &nbsp;|&nbsp; Landauer Floor ($T=310\\text{ K}$): $\\mathcal{P}_{\\mathrm{diss}} \\ge <b style="color:#FFD700;">${powerMin.toExponential(2)} W</b>$<br>Biophysical Synaptic Coupling ($\\sim 20\\text{ W}$ cortical budget): Prevents combinatorial catastrophe by erasing micro-trajectories into a 0D macro-symbol.`;
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 6: PROTOSIMPLEX DIMENSION-COLLAPSE LAB (DEF. 12.7, THM. 12.8)
  // ==========================================================================
  window.ch12_updateWorkingMemoryLab = function () {
    const kEl = document.getElementById("ch12-wm-k");
    const subEl = document.getElementById("ch12-proto-sub");
    if (!kEl) return;

    const gamma = parseInt(kEl.value, 10);
    const mode = subEl ? subEl.value : "minimal";
    const kVal = document.getElementById("ch12-wm-k-val");
    if (kVal) kVal.textContent = "γ=" + gamma;

    const isMinimal = mode === "minimal";
    const ro = document.getElementById("ch12-wm-readout");
    if (ro) {
      ro.innerHTML = isMinimal
        ? `<span style="color:#20B2AA; font-weight:bold;">[PROTOSIMPLEX ENCAPSULATION ACTIVE: 𝒫 ∈ (N_{n+1}(M^{n+1}))₀]</span> Lyapunov contraction $\\dot{V} \\le -${gamma}V$ stabilizes the $10^4$-neuron attractor basin $\\mathcal{B}(T_z)$. Because $\\mathcal{P}$ has no proper augmented sub-algebras in $\\operatorname{Alg}_{\\mathcal{O}_n}^0$, internal trajectories collapse to degenerate 1-simplices $s_0(\\mathcal{P}) \\in X_1$, presenting a <b>0D Atomic Point Token</b> to $\\operatorname{Met}_{n+1}(\\mathcal{X}_{\\mathrm{syn}})$.`
        : `<span style="color:#ff6b81; font-weight:bold;">[REDUCIBLE CIRCUIT: A ↪ 𝒫 NON-TRIVIAL]</span> Proper sub-algebra $A \\hookrightarrow \\mathcal{P}$ prevents subobject minimality (Def. 12.7 fails). Internal 1-simplices remain non-degenerate in $X_1$, exposing unresolved micro-degrees of freedom to level $n+1$.`;
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 7: NON-ABELIAN VORTEX & HODGE ENERGY BIPARTITION LAB (THMS. 12.9–12.10)
  // ==========================================================================
  window.ch12_updateHodgeLab = function () {
    const dynEl = document.getElementById("ch12-hdg-dyn") || document.getElementById("ch12-hdg-ex");
    const harmEl = document.getElementById("ch12-hdg-harm") || document.getElementById("ch12-hdg-ha");
    if (!dynEl || !harmEl) return;

    const dyn = parseFloat(dynEl.value);
    const harm = parseFloat(harmEl.value);

    const dynVal = document.getElementById("ch12-hdg-dyn-val") || document.getElementById("ch12-hdg-ex-val");
    const harmVal = document.getElementById("ch12-hdg-harm-val") || document.getElementById("ch12-hdg-ha-val");
    if (dynVal) dynVal.textContent = dyn.toFixed(2);
    if (harmVal) harmVal.textContent = harm.toFixed(2);

    const eDyn = 0.5 * dyn * dyn;
    const eHarm = 0.5 * harm * harm;
    const gE = eDyn + eHarm;

    const svg = document.getElementById("ch12-hdg-svg");
    if (svg) {
      const scale = 210 / Math.max(2.0, gE);
      const wDyn = Math.max(6, Math.min(220, eDyn * scale));
      const wHarm = Math.max(6, Math.min(220, eHarm * scale));
      svg.innerHTML = `
        <text x="12" y="34" fill="#20B2AA" font-size="10" font-family="monospace" font-weight="bold">Dynamic ½‖Δ_A₀ Φ_int‖²</text>
        <rect x="175" y="22" width="${wDyn}" height="16" rx="4" fill="#20B2AA"/>
        <text x="${182 + wDyn}" y="34" fill="#e2e8f0" font-size="9.5" font-family="monospace">${eDyn.toFixed(2)}</text>
        <text x="12" y="68" fill="#FFA500" font-size="10" font-family="monospace" font-weight="bold">Harmonic ½‖γ_harm‖²</text>
        <rect x="175" y="56" width="${wHarm}" height="16" rx="4" fill="#FFA500"/>
        <text x="${182 + wHarm}" y="68" fill="#e2e8f0" font-size="9.5" font-family="monospace">${eHarm.toFixed(2)}</text>
        <text x="210" y="102" fill="#FFD700" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Total Quale Intensity g_E = ½‖Ω_int‖² = ${gE.toFixed(2)} (L²-Orthogonal)</text>
      `;
    }

    const ro = document.getElementById("ch12-hdg-readout");
    if (ro) {
      ro.innerHTML =
        `<b>Hodge Bipartition (Thm. 12.10):</b> $g_E = \\frac{1}{2}\\|\\Delta_{A_0}\\Phi_{\\mathrm{int}}\\|_{L^2}^2 (${eDyn.toFixed(2)}) + \\frac{1}{2}\\|\\gamma_{\\mathrm{harm}}\\|_{L^2}^2 (${eHarm.toFixed(2)}) = <b style="color:#FFD700;">${gE.toFixed(2)}</b>$<br>` +
        `<span style="color:#20B2AA;">Dynamic Flow $\\Delta_{A_0}\\Phi_{\\mathrm{int}} \\in \\operatorname{im}(\\Delta_{A_0})$:</span> Transient attention shift &amp; sensory update &nbsp;|&nbsp; <span style="color:#FFA500;">Topological Core $\\gamma_{\\mathrm{harm}} \\in \\ker(\\Delta_{A_0}) \\cong H^2_{\\mathrm{dR}}$:</span> Invariant background self-presence.`;
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 8: 6D AFFECTIVE CIRCUMPLEX (R_4 × S_2) LAB (THM. 12.11)
  // ==========================================================================
  window.ch12_setAffectivePreset = function (val, aro) {
    const vEl = document.getElementById("ch12-aff-val");
    const aEl = document.getElementById("ch12-aff-aro");
    if (vEl) vEl.value = String(val);
    if (aEl) aEl.value = String(aro);
    window.ch12_updateAffectiveLab();
  };

  window.ch12_updateAffectiveLab = function () {
    const vEl = document.getElementById("ch12-aff-val") || document.getElementById("ch12-aff-v");
    const aEl = document.getElementById("ch12-aff-aro") || document.getElementById("ch12-aff-g");
    if (!vEl || !aEl) return;

    const val = parseFloat(vEl.value);
    const aro = parseFloat(aEl.value);

    const vLbl = document.getElementById("ch12-aff-val-lbl") || document.getElementById("ch12-aff-v-val");
    const aLbl = document.getElementById("ch12-aff-aro-lbl") || document.getElementById("ch12-aff-g-val");
    if (vLbl) vLbl.textContent = (val >= 0 ? "+" : "") + val.toFixed(2);
    if (aLbl) aLbl.textContent = aro.toFixed(0) + "Hz";

    const dtMs = (1000 / Math.max(1, aro)).toFixed(1);
    let quadrant = "High-Arousal Distress / Acute Alertness";
    let qCol = "#ff6b81";
    if (val >= 0 && aro >= 25) {
      quadrant = "High-Arousal Positive Flow / Elation";
      qCol = "#FFD700";
    } else if (val >= 0 && aro < 25) {
      quadrant = "Low-Arousal Serene Homeostasis";
      qCol = "#20B2AA";
    } else if (val < 0 && aro < 25) {
      quadrant = "Low-Arousal Depletion / Melancholy";
      qCol = "#9370DB";
    }

    const ro = document.getElementById("ch12-aff-readout");
    if (ro) {
      ro.innerHTML =
        `<b style="color:${qCol};">[${quadrant}]</b> &nbsp;|&nbsp; $R_6 = R_4 \\times S_2$ ($Z_\\omega(6) = Z_k(6) = 81$, <b>21 symmetric + 15 skew</b>)<br>` +
        `Entelechial Valence $x_5$: $-\\mathcal{L}_{X_5}\\mathcal{S}_{\\mathrm{therm}} = <b>${(val >= 0 ? "+" : "") + val.toFixed(2)}</b>$ &nbsp;|&nbsp; Aeonic Arousal $x_6$: $\\|\\partial_6\\| = 1/\\delta t_n = <b>${aro} Hz</b>$ ($\\delta t_n \\approx ${dtMs}\\text{ ms}$).`;
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([ro]).catch(() => {});
      }
    }
  };

  // ==========================================================================
  // SLIDE 9: PREDATOR-IN-WOODS END-TO-END WORKED EXAMPLE (EX. 12.1)
  // ==========================================================================
  const PREDATOR_STEPS = {
    1: {
      title: "Step I — Retinal Input & 99.8% Landauer Filtering (Prop. 12.5)",
      body: "Raw optic-nerve inflow $D = 20{,}000\\text{ bits/s}$ is projected onto a $r = 40\\text{ bits/s}$ conscious workspace quota. The nullspace kernel $N_{\\mathrm{erase}} = 19{,}960\\text{ bits/s}$ (leaf clutter) is erased at minimal Landauer heat cost $\\Delta Q_{\\min} \\approx 5.94 \\times 10^{-17}\\text{ W}$."
    },
    2: {
      title: "Step II — 3-Patch Feature Extraction & Working Memory Load (Prop. 12.6)",
      body: "Surviving features occupy $k = 3 \\le 4$ working-memory slots: $U_1$ (orange-black stripes), $U_2$ (parallax contour motion), $U_3$ (branch snap acoustics). Cross-curvature load $\\binom{3}{2}\\sigma_0^2 = 3\\sigma_0^2 \\le C_{\\max}/\\lambda_1$ stays safely below the $4 \\pm 1$ crowding threshold."
    },
    3: {
      title: "Step III — Hodge Phase-Locking & Cohomological Gluing (Thms. 12.4 & 12.7)",
      body: "Before synchronization, $\\delta(\\sigma_i)_{12} = (0.4, -0.3)^T \\ne 0 \\implies H^0(U, \\mathcal{F}) = \\emptyset$. Thalamocortical $\\sim 40\\text{ Hz}$ gamma synchrony drives harmonic obstruction $\\gamma \\to 0$ and $\\delta(\\sigma_i) \\to 0$, gluing $\\sigma_{\\mathrm{global}} \\in H^0(U, \\mathcal{F})$ with synergy surplus $\\Delta\\mathcal{I}_{\\mathrm{syn}} = +12.4\\text{ bits}$."
    },
    4: {
      title: "Step IV — Affective Telecentric Flow & Evasive Action (Thm. 12.8)",
      body: "The bound predator Gestalt triggers a threat potential spike $\\Delta V = +8.5$ above $T_z$. Noradrenergic arousal scales $g_{\\mathrm{AR}}^{-1}$ by $4\\times$, accelerating evasive trajectory $\\dot{x} = -g_{\\mathrm{AR}}^{-1}dV + \\mathcal{A}(x)$ at rate $dV/dt = -\\|\\nabla_{g_{\\mathrm{AR}}}V\\|^2 < 0$."
    }
  };

  window.ch12_setPredatorStep = function (step) {
    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById("ch12-pred-btn-" + i);
      if (btn) {
        const active = i === step;
        btn.style.background = active ? "#20B2AA" : "";
        btn.style.color = active ? "#000" : "";
        btn.style.fontWeight = active ? "bold" : "";
      }
    }
    const d = PREDATOR_STEPS[step] || PREDATOR_STEPS[1];
    const ro = document.getElementById("ch12-pred-readout");
    if (ro) {
      ro.innerHTML = `<b style="color:#FFD700;">${d.title}</b><br><span style="color:#e2e8f0;">${d.body}</span>`;
    }
    if (window.MathJax && window.MathJax.typesetPromise && ro) {
      window.MathJax.typesetPromise([ro]).catch(() => {});
    }
  };

  // ==========================================================================
  // SLIDE 10: LIVE 16×16 OPERADIC NEURAL TOPOS RETINA SANDBOX
  // ==========================================================================
  let toposInstance = null;
  let retinaHoverIdx = -1;
  let retinaPainting = false;

  function ensureToposInstance() {
    if (!toposInstance && window.OperadicNeuralTopos) {
      toposInstance = new window.OperadicNeuralTopos();
      toposInstance.loadPreset("horizontal");
    }
    return toposInstance;
  }

  function renderRetinaCanvas() {
    const canvas = document.getElementById("ch12-retina-canvas");
    if (!canvas) return;
    const engine = ensureToposInstance();
    if (!engine) return;

    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const cellW = W / 16;
    const cellH = H / 16;

    ctx.fillStyle = "#050811";
    ctx.fillRect(0, 0, W, H);

    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        const idx = r * 16 + c;
        const v = engine.retina[idx];
        const x = c * cellW;
        const y = r * cellH;
        if (v > 0.02) {
          const alpha = Math.min(1, v);
          ctx.fillStyle = `rgba(56, 189, 248, ${0.2 + 0.75 * alpha})`;
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
        } else {
          ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
        }
        if (idx === retinaHoverIdx) {
          ctx.strokeStyle = "#FFD700";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(x + 1, y + 1, cellW - 2, cellH - 2);
        }
      }
    }

    // Overlay winners in each 4x4 patch
    if (engine.layer1 && engine.layer1.patches) {
      const oriChars = ["—", "|", "╱", "╲"];
      ctx.font = "bold 11px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      engine.layer1.patches.forEach((p) => {
        if (p.maxResponse > 0.28 && p.winnerOrientation >= 0) {
          const cx = (p.col0 + 2) * cellW;
          const cy = (p.row0 + 2) * cellH;
          ctx.strokeStyle = "rgba(32, 178, 170, 0.7)";
          ctx.lineWidth = 1.2;
          ctx.strokeRect(p.col0 * cellW + 1, p.row0 * cellH + 1, 4 * cellW - 2, 4 * cellH - 2);
          ctx.fillStyle = "#FFD700";
          ctx.fillText(oriChars[p.winnerOrientation], cx, cy);
        }
      });
    }

    const ro = document.getElementById("ch12-retina-readout");
    if (ro && engine.layer1 && engine.layer2 && engine.layer3) {
      const g = engine.layer2;
      const c3 = engine.layer3;
      const cohBadge = g.isCohomologicallyConsistent
        ? `<span style="color:#20B2AA; font-weight:bold;">H¹(U, ℱ) = 0 (Glued Global Section)</span>`
        : `<span style="color:#ff6b81; font-weight:bold;">H¹(U, ℱ) ≠ 0 (Obstruction δ = ${g.obstructionEnergy.toFixed(2)})</span>`;
      ro.innerHTML =
        `<b>Layer 1 (V1 Stalks):</b><br>` +
        `Active $4\\times 4$ Patches: <b style="color:#38bdf8;">${g.activePatchCount} / 9</b><br>` +
        `<b>Layer 2 (Čech Nerve &amp; Hodge):</b><br>` +
        `${cohBadge}<br>` +
        `Harmonic Frustration $\\|\\gamma\\|$: <b>${g.obstructionEnergy.toFixed(3)}</b><br>` +
        `<b>Layer 3 (Telecentric Classifier):</b><br>` +
        `Winning Gestalt: <b style="color:#FFD700;">${c3.winningConcept}</b> (${(c3.confidence * 100).toFixed(1)}%)<br>` +
        `Free Energy $V(x)$: <b style="color:#20B2AA;">${c3.freeEnergy.toFixed(3)}</b>`;
    }
  }

  function initRetinaCanvasEvents() {
    const canvas = document.getElementById("ch12-retina-canvas");
    if (!canvas || canvas.dataset.bound === "1") return;
    canvas.dataset.bound = "1";

    function paintAtEvent(e) {
      const engine = ensureToposInstance();
      if (!engine) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      const c = Math.floor((x / canvas.width) * 16);
      const r = Math.floor((y / canvas.height) * 16);
      if (r >= 0 && r < 16 && c >= 0 && c < 16) {
        retinaHoverIdx = r * 16 + c;
        if (retinaPainting) {
          engine.setPixel(r, c, 1.0);
        }
        renderRetinaCanvas();
      }
    }

    canvas.addEventListener("mousedown", (e) => {
      retinaPainting = true;
      paintAtEvent(e);
    });
    window.addEventListener("mouseup", () => {
      retinaPainting = false;
    });
    canvas.addEventListener("mousemove", paintAtEvent);
    canvas.addEventListener("mouseleave", () => {
      retinaHoverIdx = -1;
      renderRetinaCanvas();
    });
  }

  window.ch12_setRetinaPreset = function (presetName) {
    const engine = ensureToposInstance();
    if (!engine) return;
    engine.loadPreset(presetName);
    renderRetinaCanvas();
  };

  window.ch12_clearRetina = function () {
    const engine = ensureToposInstance();
    if (!engine) return;
    engine.clearRetina();
    renderRetinaCanvas();
  };

  // ==========================================================================
  // 12-STAGE 3D MORPH ENGINE FOR CHAPTER 12 (MATCHING ALL 12 SLIDES)
  // ==========================================================================
  const STAGE_META = [
    {
      title: "STAGE 01 // EPISTEMIC STRATIFICATION FIREWALL",
      sub: "Def. 12.1 | Strata A → B → C | Quarantine of Stratum D",
      caption: "Four-tier epistemic hierarchy with explicit premises and deductive firewall.",
      telemetry: "Strata A–C ⊥ D"
    },
    {
      title: "STAGE 02 // PHENOMENAL TOPOS & SUBOBJECT CLASSIFIER",
      sub: "Def. 12.2 & Prop. 12.1 | E_Phenom = Sh(Ctx_Phenom, J_coh)",
      caption: "Contextual truth sieves Ω_Phenom(U) and intuitionistic periphery ¬¬P ≇ P.",
      telemetry: "Ω_Phenom(U) Sieves"
    },
    {
      title: "STAGE 03 // CONSCIOUSNESS FUNCTOR & ZOMBIE EXCLUSION",
      sub: "Thm. 12.3 | Ψ: Met → E_Phenom | H^0(U, F_M) ≠ ∅",
      caption: "Non-collapsed metronic coalgebras map to non-empty global sections; Zombie = ⊥.",
      telemetry: "Ψ(M') ≅ Ψ(M) ≠ ∅"
    },
    {
      title: "STAGE 04 // MEREOLOGICAL ADJUNCTION & SYNERGY SURPLUS",
      sub: "Thm. 12.4 | L_bind ⊣ R_part | ΔI_syn > 0",
      caption: "Left-adjoint colimit binding generates super-additive synergy surplus.",
      telemetry: "S(L_bind(P)) > ∑ S(P_i)"
    },
    {
      title: "STAGE 05 // LANDAUER METABOLIC ERASURE FLOOR",
      sub: "Prop. 12.5 | N_erase = D - r | ΔQ ≥ N_erase k_B T ln 2",
      caption: "99.8% sensory compression funnels erased nullspace bits into thermodynamic heat.",
      telemetry: "N_erase = D - r > 0"
    },
    {
      title: "STAGE 06 // WORKING MEMORY 4 ± 1 COHOMOLOGICAL LIMIT",
      sub: "Prop. 12.6 | binom(k,2) σ_0^2 ≤ C_max / λ_1 ⇒ k_max ≈ 4",
      caption: "Quadratic pair-interaction growth saturates the metabolic capacity bound at k = 4 ± 1.",
      telemetry: "k_max = 4 ± 1"
    },
    {
      title: "STAGE 07 // HODGE DECOMPOSITION & 40 Hz GAMMA GLUING",
      sub: "Thm. 12.7 | ω = dα ⊕ δβ ⊕ γ | H^1(G, R) ≅ H^1(G)",
      caption: "Thalamocortical gamma phase-locking annihilates harmonic frustration γ → 0.",
      telemetry: "‖ω‖² = ‖dα‖²+‖δβ‖²+‖γ‖²"
    },
    {
      title: "STAGE 08 // AFFECTIVE TELECENTRICS & HOMEOSTATIC FLOW",
      sub: "Thm. 12.8 | ẋ = -g_AR^{-1} dV + A(x) | dV/dt ≤ 0",
      caption: "Riemannian gradient descent toward T_z determines valence; skew torsion drives cyclic exploration.",
      telemetry: "dV/dt = -‖∇V‖² < 0"
    },
    {
      title: "STAGE 09 // PREDATOR-IN-WOODS END-TO-END TRACE",
      sub: "Ex. 12.1 | 20,000 → 40 bits/s | k=3 Patches | ΔV = +8.5",
      caption: "Complete numerical trace from retinal erasure and 3-patch gamma gluing to evasive trajectory.",
      telemetry: "ΔI_syn = +12.4 bits"
    },
    {
      title: "STAGE 10 // OPERADIC NEURAL TOPOS 3-LAYER ARCHITECTURE",
      sub: "§12.9 | 16×16 Retina → 9 Gabor Stalks → Čech Nerve → Gestalt",
      caption: "Zero-dependency executable topos engine verifying sheaf gluing and Hodge relaxation.",
      telemetry: "3-Layer Topos Engine"
    },
    {
      title: "STAGE 11 // CROSS-DISCIPLINARY BRIDGE & FALSIFIABILITY",
      sub: "§12.10 | Topos ↔ IIT 4.0 ↔ GNW ↔ FEP | Empirical Protocols",
      caption: "Exact mathematical dictionary and empirical falsification criteria across neuroscience.",
      telemetry: "Topos ↔ IIT / GNW / FEP"
    },
    {
      title: "STAGE 12 // ASYMPTOTIC REDUCTIONS & GRAND SYNTHESIS",
      sub: "§12.11 | Unary m=1 & Abelian φ=0 Limits | Ch. 12 → Ch. 13",
      caption: "Classical feedforward and aggregative limits recover as exact boundary degeneracies.",
      telemetry: "Ch. 12 → Ch. 13 Bridge"
    }
  ];

  function buildStageGeometry(stageIdx, t, spikeBoost) {
    const pts = [];
    const edges = [];
    const s = ((stageIdx - 1) % 12) + 1;

    if (s === 1) {
      // 4 horizontal epistemic tier rings + firewall plane
      const cols = ["#20B2AA", "#4169E1", "#FFA500", "#9370DB"];
      for (let tier = 0; tier < 4; tier++) {
        const y = 1.05 - tier * 0.7;
        const r = 1.0 - tier * 0.08;
        const base = pts.length;
        for (let k = 0; k < 12; k++) {
          const a = (k / 12) * Math.PI * 2 + t * 0.4 * (tier % 2 === 0 ? 1 : -1);
          pts.push({ x: r * Math.cos(a), y, z: r * Math.sin(a), c: cols[tier], r: 3.2 });
          edges.push([base + k, base + ((k + 1) % 12), cols[tier], 0.45]);
        }
      }
    } else if (s === 2 || s === 3) {
      // Base coalgebra loop + lifted sheaf sections above
      const N = 16;
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2;
        const x = 1.25 * Math.cos(a);
        const z = 1.25 * Math.sin(a);
        const yBase = -0.85;
        const yTop = 0.55 + 0.28 * Math.sin(3 * a + t * 2.0) * (1 + 0.4 * spikeBoost);
        pts.push({ x, y: yBase, z, c: "#38bdf8", r: 3.0 });
        pts.push({ x: x * 0.85, y: yTop, z: z * 0.85, c: s === 2 ? "#FFD700" : "#10b981", r: 3.8 });
        edges.push([2 * i, 2 * ((i + 1) % N), "#38bdf8", 0.35]);
        edges.push([2 * i + 1, 2 * ((i + 1) % N) + 1, "#10b981", 0.65]);
        edges.push([2 * i, 2 * i + 1, "#64748b", 0.3]);
      }
    } else if (s === 4 || s === 6) {
      // K_4 / K_5 mereological / working memory tetrahedron + apex colimit
      const kNodes = s === 4 ? 4 : 5;
      for (let i = 0; i < kNodes; i++) {
        const a = (i / kNodes) * Math.PI * 2 + t * 0.3;
        pts.push({
          x: 1.2 * Math.cos(a),
          y: -0.55 + 0.15 * Math.sin(t + i),
          z: 1.2 * Math.sin(a),
          c: "#38bdf8",
          r: 4.5
        });
      }
      pts.push({ x: 0, y: 0.95, z: 0, c: "#FFD700", r: 5.5 });
      for (let i = 0; i < kNodes; i++) {
        edges.push([i, kNodes, "#FFD700", 0.6]);
        for (let j = i + 1; j < kNodes; j++) {
          edges.push([i, j, s === 6 ? "#ff6b81" : "#20B2AA", 0.5]);
        }
      }
    } else if (s === 5) {
      // Landauer compression funnel from wide sensory ring to narrow quota
      for (let ring = 0; ring < 5; ring++) {
        const frac = ring / 4;
        const rad = 1.45 * (1 - 0.72 * frac);
        const y = 1.0 - frac * 2.0;
        const base = pts.length;
        const M = 12;
        for (let k = 0; k < M; k++) {
          const a = (k / M) * Math.PI * 2 + t * (0.5 + frac);
          const col = ring < 3 ? "#38bdf8" : ring === 3 ? "#ff6b81" : "#20B2AA";
          pts.push({ x: rad * Math.cos(a), y, z: rad * Math.sin(a), c: col, r: 3.0 });
          edges.push([base + k, base + ((k + 1) % M), col, 0.4]);
          if (ring > 0) edges.push([base + k, base - M + k, col, 0.28]);
        }
      }
    } else if (s === 7 || s === 10) {
      // 3x3 cortical patch nerve lattice with phase-locked harmonic wave
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const x = (c - 1) * 0.95;
          const z = (r - 1) * 0.95;
          const y = 0.25 * Math.sin(t * 2.5 + (r + c) * 0.6) * (1 + 0.5 * spikeBoost);
          pts.push({ x, y, z, c: "#20B2AA", r: 4.5 });
        }
      }
      pts.push({ x: 0, y: 1.05, z: 0, c: "#FFD700", r: 5.5 });
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const idx = r * 3 + c;
          if (c < 2) edges.push([idx, idx + 1, "#38bdf8", 0.55]);
          if (r < 2) edges.push([idx, idx + 3, "#38bdf8", 0.55]);
          edges.push([idx, 9, "#FFD700", 0.28]);
        }
      }
    } else if (s === 8 || s === 9) {
      // Affective parabolic basin with spiralling trajectory toward T_z
      for (let ring = 1; ring <= 3; ring++) {
        const rad = ring * 0.45;
        const y = -0.85 + 0.55 * rad * rad;
        const base = pts.length;
        for (let k = 0; k < 14; k++) {
          const a = (k / 14) * Math.PI * 2;
          pts.push({ x: rad * Math.cos(a), y, z: rad * Math.sin(a), c: "#334155", r: 2.2 });
          edges.push([base + k, base + ((k + 1) % 14), "#475569", 0.3]);
        }
      }
      // Spiral trajectory
      const spiralBase = pts.length;
      for (let i = 0; i < 18; i++) {
        const u = i / 17;
        const rad = 1.35 * (1 - u);
        const a = u * Math.PI * 4 + t * 1.8;
        const y = -0.85 + 0.55 * rad * rad;
        pts.push({ x: rad * Math.cos(a), y, z: rad * Math.sin(a), c: i === 17 ? "#FFD700" : "#20B2AA", r: i === 17 ? 5.5 : 3.4 });
        if (i > 0) edges.push([spiralBase + i - 1, spiralBase + i, "#20B2AA", 0.75]);
      }
    } else {
      // Stages 11 & 12: Cross-disciplinary rosetta star / asymptotic synthesis torus
      const N = 18;
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2;
        const R = 1.05 + 0.3 * Math.cos(3 * a + t);
        const x = R * Math.cos(a);
        const z = R * Math.sin(a);
        const y = 0.45 * Math.sin(3 * a + t);
        pts.push({ x, y, z, c: i % 2 === 0 ? "#38bdf8" : "#FFD700", r: 3.8 });
        edges.push([i, (i + 1) % N, "#38bdf8", 0.55]);
        edges.push([i, (i + 3) % N, "#9370DB", 0.25]);
      }
    }
    return { pts, edges };
  }

  const CH12_3D_STYLE = `
  .ch12-3d-wrapper {
    position: relative; width: 100%; height: 100%; min-height: 275px;
    border-radius: 12px; overflow: hidden;
    background: radial-gradient(circle at 50% 50%, #0d1526 0%, #050811 100%);
    border: 1px solid rgba(56, 189, 248, 0.3);
    box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
    display: flex; flex-direction: column;
  }
  .ch12-3d-canvas { width: 100%; flex: 1; min-height: 205px; cursor: grab; display: block; }
  .ch12-3d-canvas:active { cursor: grabbing; }
  .ch12-hud-top {
    position: absolute; top: 8px; left: 10px; right: 10px;
    display: flex; justify-content: space-between; align-items: flex-start;
    pointer-events: none; z-index: 5;
  }
  .ch12-hud-badge {
    background: rgba(10, 15, 30, 0.86); backdrop-filter: blur(6px);
    border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 8px;
    padding: 4px 9px; font-family: 'JetBrains Mono', monospace;
    font-size: 0.62em; color: #e2e8f0; pointer-events: auto;
  }
  .ch12-hud-controls { display: flex; gap: 4px; pointer-events: auto; }
  .ch12-hud-btn {
    background: rgba(15, 23, 42, 0.88); border: 1px solid rgba(148, 163, 184, 0.35);
    color: #cbd5e1; border-radius: 5px; padding: 3px 7px;
    font-size: 0.62em; font-family: 'JetBrains Mono', monospace;
    cursor: pointer; transition: all 0.15s ease;
  }
  .ch12-hud-btn:hover, .ch12-hud-btn.active {
    background: rgba(56, 189, 248, 0.22); border-color: #38bdf8; color: #38bdf8;
  }
  .ch12-scrubber {
    background: rgba(10, 15, 28, 0.94); border-top: 1px solid rgba(56, 189, 248, 0.2);
    padding: 5px 10px; display: flex; align-items: center; gap: 6px;
    font-family: 'JetBrains Mono', monospace; font-size: 0.62em; color: #94a3b8; z-index: 5;
  }
  .ch12-scrubber input[type=range] { flex: 1; accent-color: #38bdf8; height: 4px; cursor: pointer; }
  .ch12-stage-caption {
    font-size: 0.60em; color: #cbd5e1; background: rgba(15, 23, 42, 0.92);
    padding: 4px 10px; border-top: 1px solid rgba(255,255,255,0.05);
    display: flex; justify-content: space-between; align-items: center; gap: 8px;
  }
  #ch12-floating-hud {
    position: fixed; right: 20px; bottom: 20px; width: clamp(290px, 30vw, 480px);
    z-index: 9999; background: rgba(7, 11, 22, 0.96);
    border: 1.5px solid rgba(56, 189, 248, 0.6); border-radius: 12px;
    padding: 7px 10px; box-shadow: 0 12px 40px rgba(0,0,0,0.85);
  }
  #ch12-floating-hud.minimized .ch12-float-body { display: none; }
  `;

  const CH12_WRAP_INNER = `
    <div class="ch12-hud-top">
      <div class="ch12-hud-badge">
        <span style="color:#38bdf8; font-weight:700;" class="ch12-stage-title">STAGE 01 // EPISTEMIC STRATIFICATION</span>
        <div style="font-size:0.88em; color:#94a3b8; margin-top:2px;" class="ch12-stage-sub">Ψ: Met → E_Phenom | Drag to Orbit · Scroll to Zoom</div>
      </div>
      <div class="ch12-hud-controls">
        <button class="ch12-hud-btn active" data-action="rot">⟳ Orbit</button>
        <button class="ch12-hud-btn" data-action="pulse">⚡ Spike</button>
        <button class="ch12-hud-btn" data-action="reset">⌖ Reset</button>
      </div>
    </div>
    <canvas class="ch12-3d-canvas" width="640" height="300"></canvas>
    <div class="ch12-stage-caption">
      <span class="ch12-caption-text">Consciousness Functor Ψ projects non-collapsed metronic coalgebras onto internal locales Ω_Phenom.</span>
      <span class="ch12-telemetry" style="font-family:'JetBrains Mono',monospace; color:#10b981; white-space:nowrap;">H^0(U,F) ≠ ∅</span>
    </div>
    <div class="ch12-scrubber">
      <button class="ch12-hud-btn" data-action="prev" title="Previous Stage" style="padding:2px 6px;">◀</button>
      <span style="color:#38bdf8; font-weight:700;">STAGE</span>
      <input type="range" class="ch12-stage-slider" min="1" max="12" step="0.02" value="1">
      <span class="ch12-stage-num" style="color:#e2e8f0; min-width:44px; text-align:right;">01 / 12</span>
      <button class="ch12-hud-btn" data-action="next" title="Next Stage" style="padding:2px 6px;">▶</button>
    </div>
  `;

  function initMorphEngines() {
    if (!document.getElementById("ch12-3d-injected-style")) {
      const st = document.createElement("style");
      st.id = "ch12-3d-injected-style";
      st.textContent = CH12_3D_STYLE;
      document.head.appendChild(st);
    }

    const hosts = document.querySelectorAll(".ch12-3d-Mount, [data-ch12-morph]");
    hosts.forEach((host) => {
      if (host.dataset.mounted === "1") return;
      host.dataset.mounted = "1";
      const wrap = document.createElement("div");
      wrap.className = "ch12-3d-wrapper";
      wrap.innerHTML = CH12_WRAP_INNER;
      host.appendChild(wrap);
    });

    const isMegaDeck = !!document.getElementById("syntrix-3d-hud") || document.querySelectorAll("h1").length > 5;
    if (!isMegaDeck && !document.getElementById("ch12-floating-hud")) {
      const fl = document.createElement("div");
      fl.id = "ch12-floating-hud";
      fl.className = "minimized";
      fl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:4px;">
          <span style="font-size:10.5px; font-weight:800; color:#38bdf8; font-family:monospace;">🧠 CH 12 · 12-STAGE NEURO-TOPOS 3D ENGINE</span>
          <button class="ch12-hud-btn" id="ch12-float-toggle" onclick="const h=document.getElementById('ch12-floating-hud'); h.classList.toggle('minimized'); this.textContent=h.classList.contains('minimized')?'+':'—';">+</button>
        </div>
        <div class="ch12-float-body">
          <div class="ch12-3d-wrapper">${CH12_WRAP_INNER}</div>
        </div>
      `;
      document.body.appendChild(fl);
    }

    document.querySelectorAll(".ch12-3d-wrapper").forEach((wrap) => {
      if (wrap.dataset.bound === "1") return;
      wrap.dataset.bound = "1";

      const canvas = wrap.querySelector(".ch12-3d-canvas");
      const slider = wrap.querySelector(".ch12-stage-slider");
      const titleEl = wrap.querySelector(".ch12-stage-title");
      const subEl = wrap.querySelector(".ch12-stage-sub");
      const capEl = wrap.querySelector(".ch12-caption-text");
      const telEl = wrap.querySelector(".ch12-telemetry");
      const numEl = wrap.querySelector(".ch12-stage-num");

      let curStage = parseFloat(slider ? slider.value : "1") || 1;
      let rotY = 0.4;
      let rotX = 0.32;
      let zoom = 1.0;
      let autoRot = true;
      let spikeBoost = 0.0;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;

      function updateMeta(val) {
        curStage = Math.max(1, Math.min(12, val));
        if (slider) slider.value = String(curStage);
        const idx = Math.round(curStage) - 1;
        const m = STAGE_META[idx] || STAGE_META[0];
        if (titleEl) titleEl.textContent = m.title;
        if (subEl) subEl.textContent = m.sub;
        if (capEl) capEl.textContent = m.caption;
        if (telEl) telEl.textContent = m.telemetry;
        if (numEl) {
          const sStr = String(idx + 1).padStart(2, "0");
          numEl.textContent = `${sStr} / 12`;
        }
      }

      if (slider) {
        slider.addEventListener("input", () => updateMeta(parseFloat(slider.value)));
      }

      wrap.querySelectorAll(".ch12-hud-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const act = btn.dataset.action;
          if (act === "rot") {
            autoRot = !autoRot;
            btn.classList.toggle("active", autoRot);
          } else if (act === "pulse") {
            spikeBoost = 1.5;
          } else if (act === "reset") {
            rotY = 0.4;
            rotX = 0.32;
            zoom = 1.0;
          } else if (act === "prev") {
            updateMeta(Math.max(1, Math.round(curStage) - 1));
          } else if (act === "next") {
            updateMeta(Math.min(12, Math.round(curStage) + 1));
          }
        });
      });

      if (canvas) {
        canvas.addEventListener("mousedown", (e) => {
          dragging = true;
          lastX = e.clientX;
          lastY = e.clientY;
        });
        window.addEventListener("mouseup", () => {
          dragging = false;
        });
        window.addEventListener("mousemove", (e) => {
          if (!dragging) return;
          rotY += (e.clientX - lastX) * 0.008;
          rotX = Math.max(-1.2, Math.min(1.2, rotX + (e.clientY - lastY) * 0.008));
          lastX = e.clientX;
          lastY = e.clientY;
        });
        canvas.addEventListener(
          "wheel",
          (e) => {
            e.preventDefault();
            zoom = Math.max(0.55, Math.min(2.0, zoom - e.deltaY * 0.001));
          },
          { passive: false }
        );
      }

      function project(p, W, H) {
        const cy = Math.cos(rotY),
          sy = Math.sin(rotY);
        const cx = Math.cos(rotX),
          sx = Math.sin(rotX);
        const x1 = p.x * cy - p.z * sy;
        const z1 = p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const scale = (Math.min(W, H) * 0.34 * zoom) / (3.2 + z2 * 0.45);
        return { x: W * 0.5 + x1 * scale, y: H * 0.52 - y2 * scale, z: z2, s: scale };
      }

      function drawGeom(ctx, geom, W, H, alpha) {
        if (alpha <= 0.01) return;
        ctx.save();
        ctx.globalAlpha = alpha;
        const proj = geom.pts.map((p) => ({ ...project(p, W, H), c: p.c, r: p.r }));
        geom.edges.forEach((e) => {
          const a = proj[e[0]],
            b = proj[e[1]];
          if (!a || !b) return;
          ctx.strokeStyle = e[2] || "#38bdf8";
          ctx.globalAlpha = alpha * (e[3] || 0.45);
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        });
        proj.forEach((p) => {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.c || "#38bdf8";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r || 3.2, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      function renderLoop(ts) {
        const t = (ts || 0) * 0.001;
        if (autoRot && !dragging) rotY += 0.0045;
        if (spikeBoost > 0) spikeBoost = Math.max(0, spikeBoost - 0.03);

        if (canvas) {
          const ctx = canvas.getContext("2d");
          const W = canvas.width;
          const H = canvas.height;
          ctx.clearRect(0, 0, W, H);

          const sLow = Math.floor(curStage);
          const sHigh = Math.min(12, Math.ceil(curStage));
          const frac = curStage - sLow;

          const gLow = buildStageGeometry(sLow, t, spikeBoost);
          drawGeom(ctx, gLow, W, H, 1.0 - frac * 0.85);
          if (sHigh !== sLow && frac > 0.02) {
            const gHigh = buildStageGeometry(sHigh, t, spikeBoost);
            drawGeom(ctx, gHigh, W, H, frac);
          }
        }
        requestAnimationFrame(renderLoop);
      }

      updateMeta(curStage);
      requestAnimationFrame(renderLoop);

      if (window.Reveal) {
        window.Reveal.on("slidechanged", (ev) => {
          const h = ev.indexh || 0;
          updateMeta(Math.min(12, Math.max(1, h + 1)));
        });
      }
    });
  }

  function initAllCh12Widgets() {
    window.ch12_setTier("A");
    window.ch12_setGoodmanMode("topos");
    window.ch12_updateZombieLab();
    window.ch12_updateMereologyLab();
    window.ch12_updateErasureLab();
    window.ch12_updateWorkingMemoryLab();
    window.ch12_updateHodgeLab();
    window.ch12_updateAffectiveLab();
    window.ch12_setPredatorStep(1);
    initRetinaCanvasEvents();
    renderRetinaCanvas();
    initMorphEngines();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllCh12Widgets);
  } else {
    initAllCh12Widgets();
  }
})();
