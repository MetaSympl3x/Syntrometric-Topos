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
  // 10-STAGE 3D NEURO-TOPOS, PROTOSIMPLEX & AFFECTIVE TELECENTRICS ENGINE
  // ==========================================================================
  const CH12_3D_STYLE = `
  #ch12-3d-hud {
    position: fixed;
    right: 18px;
    bottom: 18px;
    width: 390px;
    background: rgba(11, 15, 25, 0.96);
    border: 1.5px solid #20B2AA;
    border-radius: 12px;
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.85), 0 0 22px rgba(32, 178, 170, 0.22);
    z-index: 9999;
    font-family: "Inter", system-ui, sans-serif;
    color: #e8ecf2;
    transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    overflow: hidden;
    user-select: none;
  }
  #ch12-3d-hud.spotlight {
    width: min(800px, 84vw);
    right: 8vw;
    bottom: 7vh;
    border-color: #FFD700;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 215, 0, 0.35);
  }
  #ch12-3d-hud.minimized .ch12-hud-body {
    display: none;
  }
  .ch12-hud-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 11px;
    background: linear-gradient(90deg, rgba(32, 178, 170, 0.28), rgba(65, 105, 225, 0.25));
    border-bottom: 1px solid rgba(32, 178, 170, 0.45);
    font-size: 11px;
    font-weight: 700;
  }
  .ch12-hud-title {
    color: #FFD700;
    letter-spacing: 0.4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ch12-hud-controls {
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .ch12-hud-btn {
    background: #161f33;
    color: #cbd5e1;
    border: 1px solid #334155;
    border-radius: 5px;
    padding: 2px 7px;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .ch12-hud-btn:hover, .ch12-hud-btn.active {
    background: #20B2AA;
    color: #000;
    border-color: #FFD700;
  }
  #ch12-canvas-wrap {
    position: relative;
    width: 100%;
    height: 245px;
    background: radial-gradient(circle at 50% 45%, #131c31 0%, #070a12 100%);
    cursor: grab;
  }
  #ch12-3d-hud.spotlight #ch12-canvas-wrap {
    height: 440px;
  }
  #ch12-canvas-wrap:active {
    cursor: grabbing;
  }
  #ch12-3d-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  .ch12-overlay-top {
    position: absolute;
    top: 7px;
    left: 9px;
    right: 9px;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    font-size: 10px;
  }
  .ch12-badge {
    background: rgba(8, 12, 22, 0.88);
    border: 1px solid #4169E1;
    border-radius: 5px;
    padding: 2px 7px;
    color: #93c5fd;
    font-weight: 600;
  }
  #ch12-telemetry {
    position: absolute;
    bottom: 6px;
    left: 9px;
    right: 9px;
    background: rgba(7, 10, 18, 0.90);
    border: 1px solid rgba(255, 215, 0, 0.45);
    border-radius: 5px;
    padding: 3px 8px;
    font-family: monospace;
    font-size: 10px;
    color: #FFD700;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ch12-scrubber {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px 10px;
    background: #0d1322;
    border-top: 1px solid #1e293b;
    font-size: 10.5px;
  }
  .ch12-scrubber input[type="range"] {
    flex: 1;
    accent-color: #FFD700;
    cursor: pointer;
    height: 5px;
  }
  #ch12-caption {
    padding: 5px 10px 7px 10px;
    background: #090d18;
    border-top: 1px solid #1e293b;
    font-size: 10.5px;
    color: #cbd5e1;
    line-height: 1.35;
  }
  `;

  const CH12_3D_HTML = `
  <div class="ch12-hud-header">
    <div class="ch12-hud-title">🧠 Ch. 12: 3D Neuro-Topos &amp; Protosimplex Engine</div>
    <div class="ch12-hud-controls">
      <button class="ch12-hud-btn active" id="ch12-btn-orbit" onclick="toggleCh12Orbit()">⟳ Orbit</button>
      <button class="ch12-hud-btn" id="ch12-btn-spot" onclick="toggleCh12Spotlight()">⛶ Spotlight</button>
      <button class="ch12-hud-btn" id="ch12-btn-min" onclick="toggleCh12Minimize()">+</button>
    </div>
  </div>
  <div class="ch12-hud-body">
    <div id="ch12-canvas-wrap">
      <canvas id="ch12-3d-canvas"></canvas>
      <div class="ch12-overlay-top">
        <span class="ch12-badge" id="ch12-stage-pill">Stage 1.0 / 10</span>
        <span class="ch12-badge" id="ch12-node-inspector" style="border-color:#20B2AA; color:#5eead4;">Drag to Orbit 3D · Click Node to Inspect</span>
      </div>
      <div id="ch12-telemetry">Strata A–C ⊥ Stratum D | Ω_Phenom(U) Sieves</div>
    </div>
    <div class="ch12-scrubber">
      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>
      <button class="ch12-hud-btn" title="Previous Stage" onclick="window.setCh12Stage(Math.round(parseFloat(document.getElementById('ch12-slider').value)) - 1, true)">◀</button>
      <input type="range" id="ch12-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh12Stage(this.value)">
      <button class="ch12-hud-btn" title="Next Stage" onclick="window.setCh12Stage(Math.round(parseFloat(document.getElementById('ch12-slider').value)) + 1, true)">▶</button>
      <button class="ch12-hud-btn active" id="ch12-btn-sync" onclick="enableCh12Sync()">Auto-Sync</button>
    </div>
    <div id="ch12-caption">
      <b>Stage 1 (§12.1 — Def. 12.1 Epistemic Stratification):</b> 4-Tier Firewall separating proven mathematics (Strata A–C) from speculative horizons (Stratum D).
    </div>
  </div>`;

  function injectCh123DHUD() {
    if (document.getElementById('ch12-3d-hud')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'ch12-3d-injected-style';
    styleEl.textContent = CH12_3D_STYLE;
    document.head.appendChild(styleEl);

    const hudEl = document.createElement('div');
    hudEl.id = 'ch12-3d-hud';
    hudEl.className = 'minimized';
    hudEl.innerHTML = CH12_3D_HTML;
    document.body.appendChild(hudEl);
  }

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
    let camYaw = -0.48;
    let camPitch = 0.35;
    let camZoom = 1.65;
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let timeSec = 0;
    let hitNodes = [];
    let selectedId = null;

    const STAGE_CAPTIONS = {
      1: "<b>Stage 1 (§12.1 — Def. 12.1 Epistemic Stratification):</b> 4-Tier Firewall separating Strata A–C proofs/models from quarantined Stratum D.",
      2: "<b>Stage 2 (§12.1.4 — Goodman Imperfect Community &amp; Sheaf Descent):</b> Triple pullback e₁×_U e₂×_U e₃ rejects phantom cliques; glues true holoforms.",
      3: "<b>Stage 3 (§12.2 — Thm. 12.3 Chalmersian Zombie Refutation):</b> Non-Abelian curvature Ω_int^𝒟 ≠ 0 couples P-Conscious pushout to A-Conscious evaluation!",
      4: "<b>Stage 4 (§12.3 — Thm. 12.4 Heyting Mereology &amp; Sublation):</b> Left-adjoint binding ℒ_bind ⊣ ℛ_part, t-norm parthood &amp; dialectical Aufhebung.",
      5: "<b>Stage 5 (§12.4 — Thm. 12.6 Landauer Thermodynamic Erasure):</b> 10⁷ → 40 bits/s sensory funnel dissipating ΔQ ≥ N_erase k_B T ln 2.",
      6: "<b>Stage 6 (§12.5 — Prop. 12.6 Working Memory 4±1 Limit):</b> Protosimplex encapsulation &amp; K_k pair-interaction saturation at k_max = 4 ± 1.",
      7: "<b>Stage 7 (§12.6 — Thm. 12.7 Simplicial Hodge &amp; 40 Hz Gamma):</b> Orthogonal decomposition ω = dα ⊕ δβ ⊕ γ &amp; thalamocortical phase-locking.",
      8: "<b>Stage 8 (§12.7 — Thm. 12.8 Affective Telecentrics):</b> Riemannian gradient descent ẋ = −g_AR⁻¹dV + A(x) spiralling into homeostatic attractor T_z.",
      9: "<b>Stage 9 (§12.8–12.9 — Predator Trace &amp; 3-Layer Neural Topos):</b> Retinal erasure → 9 Gabor stalks → Čech 1-nerve → glued Gestalt colimit!",
      10: "<b>Stage 10 (§12.10–12.11 — Neuro-Rosetta &amp; Asymptotic Limits):</b> Topos ↔ IIT 4.0 ↔ GNW ↔ FEP dictionary &amp; Unary/Abelian degeneracy limits!"
    };

    const STAGE_TELEMETRY = {
      1: "Strata A → B → C ⊥ Stratum D (Strict Deductive Firewall)",
      2: "e₁ ×_U e₂ ×_U e₃ ≠ 0_Ctx ⟺ Def_U(s) = 0",
      3: "g_E > 0 ⟺ Def_U(s) = 0 ⟹ ⟦Zombie(𝒩)⟧ = ⊥_Ω",
      4: "ℒ_bind ⊣ ℛ_part | χ(a_D, b_P) > θ_coord",
      5: "N_erase = D − r > 0 | 𝒫_diss ≥ N_erase k_B T ln 2",
      6: "binom(k,2) σ₀² ≤ C_max / λ₁ ⟹ k_max = 4 ± 1",
      7: "C¹(𝒢) = im(d₀) ⊕ im(d₁*) ⊕ ker(Δ₁) | γ → 0 at 40 Hz",
      8: "dV/dt = −g_AR⁻¹(dV, dV) ≤ 0 (Valence = −V̇)",
      9: "16×16 Retina → 9 Gabor Stalks → Čech Nerve → Gestalt",
      10: "ℰ_syn ↔ IIT 4.0 / GNW / FEP | m=1 & φ=0 Limits"
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

    // Stage 1: 4-Tier Epistemic Stratification & Deductive Firewall (Def. 12.1)
    function renderStage1(w, h) {
      const tiers = [
        { z:  1.05, col: "#20B2AA", id: "Tier_A", lbl: "Stratum A: Pure Topos & Lean Proofs", info: "Stratum A: Unconditionally proven theorems (Ω_Phenom, Thm. 12.3, Hodge Decomposition)" },
        { z:  0.40, col: "#4169E1", id: "Tier_B", lbl: "Stratum B: Conditional Neuro-Bridge", info: "Stratum B: Conditional mathematical physics (Landauer Floor, 4±1 Working Memory, Telecentrics)" },
        { z: -0.25, col: "#FFA500", id: "Tier_C", lbl: "Stratum C: 40 Hz Biophysical Ansatz", info: "Stratum C: Falsifiable neurobiological realization (40 Hz gamma phase-locking, θ-γ coupling)" },
        { z: -1.05, col: "#9370DB", id: "Tier_D", lbl: "Stratum D: Quarantined Horizon", info: "Stratum D: Speculative metaphysical extrapolations strictly barred from Strata A–C premises!" }
      ];
      let prev = null;
      tiers.forEach((tr, idx) => {
        const rad = 1.15 - idx * 0.08;
        ctx.beginPath();
        ctx.strokeStyle = tr.col;
        ctx.lineWidth = 2.0;
        ctx.setLineDash(idx === 3 ? [4, 3] : []);
        for (let i = 0; i <= 36; i++) {
          const a = (i / 36) * Math.PI * 2 + timeSec * (idx % 2 === 0 ? 0.3 : -0.3);
          const p = proj(rad * Math.cos(a), rad * Math.sin(a), tr.z, w, h);
          if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        const pN = drawNode3D(tr.id, 0, 0, tr.z, 8.5, tr.col, "#fff", tr.lbl, tr.info, w, h);
        if (prev && idx < 3) drawLine3D(prev, pN, "#64748b", 2.2);
        prev = pN;
      });
      // Crimson Firewall Plane at z = -0.65
      const fw = [proj(-1.2, -0.9, -0.65, w, h), proj(1.2, -0.9, -0.65, w, h), proj(1.2, 0.9, -0.65, w, h), proj(-1.2, 0.9, -0.65, w, h)];
      ctx.save();
      ctx.fillStyle = "rgba(220, 20, 60, 0.20)";
      ctx.strokeStyle = "#DC143C";
      ctx.lineWidth = 2.2;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(fw[0].sx, fw[0].sy);
      fw.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      drawNode3D("FW_Shield", 1.1, 0, -0.65, 7.5, "#DC143C", "#FFD700", "⛔ Deductive Firewall", "Strict Import Firewall barring Stratum D from entering Strata A–C proofs!", w, h);
    }

    // Stage 2: Goodman Imperfect Community vs. Sheaf Descent Equalizer (§12.1.4)
    function renderStage2(w, h) {
      const e1 = drawNode3D("G_e1", -0.85, -0.55, -0.45, 8.5, "#ff6b81", "#fff", "e₁(R, G)", "Local Experience Patch e₁ carrying qualities {Red, Green}", w, h);
      const e2 = drawNode3D("G_e2",  0.85, -0.55, -0.45, 8.5, "#20B2AA", "#fff", "e₂(R, B)", "Local Experience Patch e₂ carrying qualities {Red, Blue}", w, h);
      const e3 = drawNode3D("G_e3",  0.00,  0.90, -0.45, 8.5, "#4169E1", "#fff", "e₃(R, Y)", "Local Experience Patch e₃ carrying qualities {Red, Yellow}", w, h);
      drawLine3D(e1, e2, "#20B2AA", 2.4);
      drawLine3D(e2, e3, "#20B2AA", 2.4);
      drawLine3D(e3, e1, "#20B2AA", 2.4);

      const pTriple = drawNode3D("G_Pull", 0, 0, 0.15, 9.5, "#20B2AA", "#FFD700", "e₁×_U e₂×_U e₃ ≠ 0_Ctx", "Non-Empty Triple Pullback Intersection (Def_U(s) = 0) refuting Goodman Imperfect Community!", w, h);
      const pHol = drawNode3D("G_Hol", 0, 0, 0.95, 11.5, "#FFD700", "#20B2AA", "s ∈ Hol(U, P) (Glued Quale)", "Unique Glued Global Section in Sheaf Equalizer Hol(U, P) ≅ P(U)", w, h);
      drawLine3D(e1, pTriple, "rgba(32,178,170,0.65)", 1.8, [3, 2]);
      drawLine3D(e2, pTriple, "rgba(32,178,170,0.65)", 1.8, [3, 2]);
      drawLine3D(e3, pTriple, "rgba(32,178,170,0.65)", 1.8, [3, 2]);
      drawLine3D(pTriple, pHol, "#FFD700", 3.2);
    }

    // Stage 3: Chalmersian Zombie Refutation (Thm. 12.3)
    function renderStage3(w, h) {
      const p1 = drawNode3D("Z_P1", -1.10, -0.45, -0.55, 8.5, "#4169E1", "#fff", "Stream P₁ (a₁)", "Sensory Carrier Stream P₁ with non-Abelian operator a₁", w, h);
      const p2 = drawNode3D("Z_P2",  1.10, -0.45, -0.55, 8.5, "#20B2AA", "#fff", "Stream P₂ (a₂)", "Sensory Carrier Stream P₂ with non-Abelian operator a₂", w, h);
      const pPush = drawNode3D("Z_Push", 0, 0, 0.15, 10, "#FFA500", "#FFD700", "P₁ ⊞_φ P₂ (g_E > 0)", "Coupled Carrier Pushout with Interaction Curvature Ω_int^𝒟 = [a₁,a₂] ≠ 0 (P-Conscious!)", w, h);
      const pAcc = drawNode3D("Z_Acc", 0, 0, 0.98, 11.5, "#FFD700", "#20B2AA", "ev(T_P) ≠ {0} (A-Conscious)", "Thm. 12.3: Non-Zero Global Access Evaluation — Zombie Hypothesis ⟦Zombie(𝒩)⟧ = ⊥_Ω!", w, h);
      const pZom = drawNode3D("Z_Bot", 1.25, 0.75, -0.75, 7.5, "#DC143C", "#fff", "⚠ Zombie (g_E=0 ⇒ ev={0})", "Setting g_E = 0 collapses P₁ ⊕₁ P₂ and annihilates global access ev(T_P) = {0}!", w, h);

      drawLine3D(p1, pPush, "#4169E1", 2.8);
      drawLine3D(p2, pPush, "#20B2AA", 2.8);
      drawLine3D(pPush, pAcc, "#FFD700", 3.4);
      drawLine3D(p2, pZom, "#DC143C", 2.0, [4, 3]);
    }

    // Stage 4: Constructive Heyting Mereology & Dialectical Sublation (Thm. 12.4)
    function renderStage4(w, h) {
      const dNode = drawNode3D("M_Dr", -1.05, -0.5, -0.65, 8.5, "#4169E1", "#fff", "d_r ∈ D_U (Dialectical)", "Dialectical Operator Component d_r with norm a_D", w, h);
      const pNode = drawNode3D("M_Fq",  1.05, -0.5, -0.65, 8.5, "#20B2AA", "#fff", "f_q ∈ P_U (Predicative)", "Predicative Feature Component f_q with norm b_P", w, h);
      const mCone = drawNode3D("M_Asp", 0, 0, 0.10, 10, "#20B2AA", "#FFD700", "𝔐_asp(U): χ(a_D,b_P) > θ", "Archimedean t-Norm Coordination Subobject satisfying CEM Axioms MSL-M1 & MSL-M2", w, h);
      const aufNode = drawNode3D("M_Auf", 0, 0, 0.98, 11.5, "#FFD700", "#FFA500", "Aufhebung C ∈ Prop_{k+1}", "Thm. 12.4 Left-Adjoint Binding ℒ_bind ⊣ ℛ_part & Dialectical Sublation Apex!", w, h);
      drawLine3D(dNode, mCone, "#4169E1", 2.8);
      drawLine3D(pNode, mCone, "#20B2AA", 2.8);
      drawLine3D(mCone, aufNode, "#FFD700", 3.4);
    }

    // Stage 5: Landauer Thermodynamic Erasure Funnel (Thm. 12.6)
    function renderStage5(w, h) {
      for (let ring = 0; ring < 5; ring++) {
        const frac = ring / 4;
        const rad = 1.35 * (1 - 0.72 * frac);
        const z = 0.95 - frac * 1.9;
        const col = ring < 2 ? "#38bdf8" : (ring < 4 ? "#ff6b81" : "#FFD700");
        ctx.beginPath();
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.0;
        for (let k = 0; k <= 32; k++) {
          const a = (k / 32) * Math.PI * 2 + timeSec * (0.4 + frac);
          const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);
          if (k === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }
      drawNode3D("L_In", 0, 0, 0.95, 9, "#38bdf8", "#fff", "Sensory Inflow H(X) = 10⁷ bits/s", "High-Dimensional Retinal/Sensory Micro-State Inflow D", w, h);
      drawNode3D("L_Heat", 1.15, 0, 0.0, 8, "#ff6b81", "#FFD700", "ΔQ ≥ N_erase k_B T ln 2", "Erased Conditional Fibre Entropy H(X_n | Y_{n+1}) dissipated as metabolic heat (~20 W cortex)", w, h);
      drawNode3D("L_Out", 0, 0, -0.95, 11, "#FFD700", "#20B2AA", "Macro Quota H(Y) ≈ 40 bits/s", "Compressed Conscious Protosimplex Pointer Stream (99.8% Dimension Reduction!)", w, h);
    }

    // Stage 6: Protosimplex Encapsulation & 4 ± 1 Working Memory Clique (Prop. 12.6)
    function renderStage6(w, h) {
      const kPts = [];
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + timeSec * 0.35;
        const x = 1.12 * Math.cos(a), y = 1.12 * Math.sin(a), z = -0.45 + 0.15 * Math.sin(timeSec * 2 + i);
        const p = drawNode3D("WM_" + (i + 1), x, y, z, 8.5, "#20B2AA", "#fff", `𝒫_${i + 1} (Chunk ${i + 1})`, `Encapsulated 0D Protosimplex Working Memory Chunk 𝒫_${i + 1}`, w, h);
        kPts.push(p);
      }
      const pApex = drawNode3D("WM_Apex", 0, 0, 0.90, 11.5, "#FFD700", "#DC143C", "k_max = 4 ± 1 (binom(4,2)=6)", "Prop. 12.6 Working Memory Capacity Bound: Quadratic Čech pair-overlaps saturate C_max / λ₁!", w, h);
      for (let i = 0; i < 4; i++) {
        drawLine3D(kPts[i], pApex, "#FFD700", 2.4);
        for (let j = i + 1; j < 4; j++) {
          drawLine3D(kPts[i], kPts[j], "#ff6b81", 2.2);
        }
      }
    }

    // Stage 7: Simplicial Hodge Decomposition & 40 Hz Thalamocortical Gamma Gluing (Thm. 12.7)
    function renderStage7(w, h) {
      const gPts = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const x = (c - 1) * 0.92;
          const y = (r - 1) * 0.92;
          const z = -0.45 + 0.18 * Math.sin(timeSec * 3.2 + (r + c) * 0.7);
          const idx = r * 3 + c;
          gPts.push(drawNode3D("Hdg_" + idx, x, y, z, 6.5, "#20B2AA", "#fff", idx === 4 ? "40 Hz Sync" : "", `Cortical Patch Stalk U_${idx + 1} in 3×3 Simplicial Nerve`, w, h));
        }
      }
      const pGest = drawNode3D("Hdg_Apex", 0, 0, 0.95, 11.5, "#FFD700", "#20B2AA", "ω = dα ⊕ δβ ⊕ γ (γ → 0)", "Thm. 12.7 Hodge Decomposition: 40 Hz Gamma Synchrony annihilates harmonic frustration γ → 0!", w, h);
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const idx = r * 3 + c;
          if (c < 2) drawLine3D(gPts[idx], gPts[idx + 1], "#38bdf8", 2.0);
          if (r < 2) drawLine3D(gPts[idx], gPts[idx + 3], "#38bdf8", 2.0);
          if (idx % 2 === 0) drawLine3D(gPts[idx], pGest, "rgba(255,215,0,0.45)", 1.6);
        }
      }
    }

    // Stage 8: Affective Telecentric Flow & Valence/Arousal Basin (Thm. 12.8)
    function renderStage8(w, h) {
      for (let ring = 1; ring <= 3; ring++) {
        const rad = ring * 0.42;
        const z = -0.85 + 0.65 * rad * rad;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(65,105,225,0.45)";
        ctx.lineWidth = 1.6;
        for (let k = 0; k <= 32; k++) {
          const a = (k / 32) * Math.PI * 2;
          const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);
          if (k === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.strokeStyle = "#20B2AA";
      ctx.lineWidth = 3.0;
      for (let i = 0; i <= 50; i++) {
        const u = i / 50;
        const rad = 1.25 * (1 - u);
        const a = u * Math.PI * 4 + timeSec * 2.2;
        const z = -0.85 + 0.65 * rad * rad;
        const p = proj(rad * Math.cos(a), rad * Math.sin(a), z, w, h);
        if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
      }
      ctx.stroke();

      drawNode3D("Aff_Start", 1.15, 0, 0.05, 8, "#ff6b81", "#fff", "Perturbation ΔV = +8.5", "High-Dissonance Threat Perturbation triggering noradrenergic metric scaling g_AR", w, h);
      drawNode3D("Aff_Tz", 0, 0, -0.85, 11.5, "#FFD700", "#20B2AA", "Telezentrum T_z (V̇ ≤ 0)", "Thm. 12.8 Homeostatic Attractor T_z: Positive Valence = −dV/dt = g_AR⁻¹(dV,dV) > 0!", w, h);
    }

    // Stage 9: Predator-in-the-Woods Trace & 3-Layer Operadic Neural Topos (§12.8–12.9)
    function renderStage9(w, h) {
      const pRet = drawNode3D("NT_Ret", 0, 0, -0.95, 9.5, "#38bdf8", "#fff", "Layer 1: 16×16 Retinal Lattice", "Sensory Input Grid (20,000 bits/s compressed via Landauer erasure to 40 bits/s)", w, h);
      const stalks = [];
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 + timeSec * 0.4;
        const pS = drawNode3D("NT_S" + k, 1.05 * Math.cos(a), 1.05 * Math.sin(a), 0.0, 7, "#20B2AA", "#fff", k === 0 ? "Layer 2: Gabor Stalks" : "", `V1 Orientation Stalk & Čech Nerve Overlap Patch ${k + 1}`, w, h);
        stalks.push(pS);
        drawLine3D(pRet, pS, "#38bdf8", 1.8);
      }
      const pGest = drawNode3D("NT_Gest", 0, 0, 0.95, 11.5, "#FFD700", "#DC143C", "Layer 3: Glued Predator Gestalt", "Global Colimit Section s ∈ Γ(U, F) triggering Telecentric Evasive Trajectory (ΔI_syn = +12.4 bits)!", w, h);
      for (let k = 0; k < 6; k++) {
        drawLine3D(stalks[k], stalks[(k + 1) % 6], "#20B2AA", 2.0);
        drawLine3D(stalks[k], pGest, "#FFD700", 2.4);
      }
    }

    // Stage 10: Cross-Disciplinary Neuro-Rosetta Star & Asymptotic Reductions (§12.10–12.11)
    function renderStage10(w, h) {
      const pHub = drawNode3D("Ros_Hub", 0, 0, 0, 11.5, "#FFD700", "#20B2AA", "Syntrometric Neuro-Topos ℰ_syn", "Unified Categorical Framework bridging IIT 4.0, GNW, FEP, and Classical Limits", w, h);
      const arms = [
        { id: "R_IIT",  x: -1.15, y: -0.65, z:  0.55, col: "#20B2AA", lbl: "IIT 4.0 (Φ ↔ ΔI_syn & Ω_int)", info: "Maps Integrated Information Φ to Mereological Synergy Surplus ΔI_syn & Gauge Curvature" },
        { id: "R_GNW",  x:  1.15, y: -0.65, z:  0.55, col: "#4169E1", lbl: "Dehaene GNW (Ignition ↔ Γ(U,P))", info: "Maps Global Workspace Broadcast to Non-Empty Sheaf Equalizer Hol(U, P) ≠ ∅" },
        { id: "R_FEP",  x: -1.15, y:  0.65, z: -0.55, col: "#FFA500", lbl: "Friston FEP (F_VFE ↔ V(x) → T_z)", info: "Maps Variational Free Energy Minimization to Affective Telecentric Flow dV/dt ≤ 0" },
        { id: "R_Lim",  x:  1.15, y:  0.65, z: -0.55, col: "#9370DB", lbl: "Unary m=1 & Abelian φ=0 Limits", info: "Recovers Classical Feedforward Reflex Chains & Unbound Aggregate Models as exact degeneracies!" }
      ];
      arms.forEach(ar => {
        const pA = drawNode3D(ar.id, ar.x, ar.y, ar.z, 8.5, ar.col, "#fff", ar.lbl, ar.info, w, h);
        drawLine3D(pHub, pA, ar.col, 2.8);
      });
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
      if (canvas.width === 0 || Math.abs(canvas.width / Math.min(window.devicePixelRatio || 1, 2) - w) > 2) {
        resize();
      }
      ctx.clearRect(0, 0, w, h);
      hitNodes = [];

      function dispatchStageCrossFade(stInt) {
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
      }

      const stLow = Math.max(1, Math.min(10, Math.floor(curStage)));
      const stHigh = Math.max(1, Math.min(10, Math.ceil(curStage)));
      const frac = curStage - stLow;
      if (stLow === stHigh || frac < 0.02) {
        ctx.save();
        ctx.globalAlpha = 1.0;
        dispatchStageCrossFade(Math.round(curStage));
        ctx.restore();
      } else {
        ctx.save();
        ctx.globalAlpha = 1.0 - frac * 0.82;
        dispatchStageCrossFade(stLow);
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = frac;
        dispatchStageCrossFade(stHigh);
        ctx.restore();
      }
      requestAnimationFrame(renderLoop);
    }

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
        if (rev && rev.scrollHeight > rev.clientHeight + 10) max = rev.scrollHeight - rev.clientHeight;
        else if (vp && vp.scrollHeight > vp.clientHeight + 10) max = vp.scrollHeight - vp.clientHeight;
        else max = Math.max(1, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight);
        const frac = Math.min(1.0, Math.max(0.0, top / max));
        stageVal = 1.0 + frac * 9.0;
      }

      if (stageVal === null && window.Reveal && typeof window.Reveal.getIndices === 'function') {
        const idx = window.Reveal.getIndices();
        const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 13);
        const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;
        const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;
        stageVal = 1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0;
      }

      if (typeof stageVal === 'number' && !isNaN(stageVal)) {
        window.setCh12Stage(stageVal, false);
      }
    }

    window.syncCh12WithDeck = syncCh12WithDeck;

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

    resize();
    syncCh12WithDeck();
    requestAnimationFrame(renderLoop);
    window.addEventListener('resize', resize);
    if (window.Reveal) {
      window.Reveal.on('ready', syncCh12WithDeck);
      window.Reveal.on('slidechanged', syncCh12WithDeck);
      window.Reveal.on('fragmentshown', syncCh12WithDeck);
      window.Reveal.on('fragmenthidden', syncCh12WithDeck);
    }
  }

  function initCh12InlineMount() {
    document.querySelectorAll('.ch12-3d-Mount, [data-ch12-morph]').forEach(el => {
      if (el.dataset.mounted === '1') return;
      el.dataset.mounted = '1';
      el.innerHTML = `<div style="background:rgba(10,15,28,0.92); border:1px solid rgba(32,178,170,0.45); border-radius:10px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div style="font-size:0.66em; color:#cbd5e1;">
          <b style="color:#FFD700;">🧠 Interactive 10-Stage 3D Neuro-Topos &amp; Protosimplex Engine</b><br>
          <span>Synchronized across all 13 slides — inspect Goodman sheaf descent, Zombie refutation, Landauer funnel, and 40 Hz Hodge gluing in 3D.</span>
        </div>
        <button class="syn-btn" style="background:#FFD700; color:#000; font-weight:bold; white-space:nowrap;" onclick="if(window.toggleCh12Spotlight) window.toggleCh12Spotlight();">⛶ Launch 3D Spotlight</button>
      </div>`;
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
    runCh12Engine();
    initCh12InlineMount();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllCh12Widgets);
  } else {
    initAllCh12Widgets();
  }
})();
