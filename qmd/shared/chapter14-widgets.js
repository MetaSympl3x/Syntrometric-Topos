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

  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) {
      res = Math.round((res * (n - i + 1)) / i);
    }
    return res;
  }

  function fact(n) {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  // =========================================================================
  // WIDGET 1: §14.1 & Appendix E Concordance Functor Explorer (8 Clusters -> 9 Frameworks)
  // =========================================================================
  const clusterData = [
    {
      roman: "I", eqs: "SM Eqs. 1–4", ch: "Ch. 1 & App. A",
      title: "Epistemic Contexts, Aspect Systems & Quantifier Forcing",
      dom: "HeimCorpus(S, Pn, Dn, Kn, Quantoren)",
      cod: "Esyn = Sh(Ctx_adm^sk, Jsyn) in Ban_<=1",
      targets: [0, 8],
      desc: "Maps subjective aspect schemas S = [D_nn x K_n x P_nn] to structured Banach contexts U in Ctx_adm^sk, aspect transitions to pullback functors f*, and Polyquantors to product-slice Kripke–Joyal sheaf forcing."
    },
    {
      roman: "II", eqs: "SM Eqs. 5–9a", ch: "Ch. 2",
      title: "The Syntrix Triad, Operadic Algebras & Äondyne Bundles",
      dom: "HeimCorpus(ya = <f, a, m>, xS, Aeondynen)",
      cod: "Alg(Osyn), T_hom = T_frag o T_pyr, Grothendieck Fibration",
      targets: [1],
      desc: "Reconstructs the Syntrix triad as a free algebra over the completed colored Banach operad Osyn, Spaltbarkeit via Beck's Distributive Law lambda, and continuous Äondynen as Cartesian sections of the Grothendieck fibration."
    },
    {
      roman: "III", eqs: "SM Eqs. 10–13a", ch: "Ch. 3",
      title: "Corporate Pairings, Carrier Pushouts & Syntropod Networks",
      dom: "HeimCorpus(2x2 Korporator {Ks Cs; Km Cm}, Nullsyntrix, Conflexive Trees)",
      cod: "Kor_{r,Sigma} : Syn x Syn -> Syn (15 Classes: 9 Mixed / 6 Pure)",
      targets: [2],
      desc: "Decouples carrier operations into l1-coproducts C_m (dim p+q) and Exzenter span pushouts K_m (dim p+q-lambda), module operations into C_s and K_s, and networks into colimits over trees G_S with ConfIndex_pres = |E_K| + 1."
    },
    {
      roman: "IV", eqs: "SM Eqs. 14–19a", ch: "Ch. 4",
      title: "Sliced Topos Totalities, Diffeomorphism Flows & Gauge Curvature",
      dom: "HeimCorpus(Generative G, Enyphanen E, Holoformen, Affinitaet)",
      cod: "Esyn/y(U_G), Diff(M) Flows Phi_t^X, Non-Abelian Residual Omega_int^D",
      targets: [3, 8],
      desc: "Formalizes the Generative G as a presentation blueprint for slice topos T0, Enyphanie as non-Abelian interaction curvature Omega_int^D = F_A - sum F_k^(A0), Holoforms via Delta_emerg^I > 0, and affinity as non-degenerate bilinear pairings."
    },
    {
      roman: "V", eqs: "SM Eqs. 20–27", ch: "Ch. 5 & Ch. 6",
      title: "Metroplex Hierarchies, Operadic Bridges & Higher Topos Towers",
      dom: "HeimCorpus(Hypersyntrix M1, Metroplex Mn, Syntrokline Bruecken, Area AR_q)",
      cod: "CSeg(Xsyn), Met_n(Xsyn), Adjunction (phi_!) -| (phi^*), Final Coalgebra nu T",
      targets: [4],
      desc: "Lifts base syntrices into complete Segal spaces CSeg(Xsyn) inside the (infty,1)-topos Xsyn, models syntroclinic bridges as change-of-operad adjunctions, and formalizes the aeonische Area AR_q and Telezentren via terminal coalgebras."
    },
    {
      roman: "VI", eqs: "SM Eqs. 28–62", ch: "Ch. 7, Ch. 8 & Ch. 9",
      title: "Continuous Parameter Spaces, Differential Functors & Metric Cascades",
      dom: "HeimCorpus(yR_n, d|, I, 36-Hermetry ^2g, Q_(mu,gamma), Strukturkaskade)",
      cod: "DimField_Lambda -> Ban_<=1, Frechet Calculus, Met(R_4 x S_2), Contraction Phi_M",
      targets: [5],
      desc: "Bridges realified parameter continua R_n and nuclear Frechet calculus to the 36-component non-Hermitian metric ^2g = ^2g_+ + ^2g_- on R_6, divergence-free Einstein conservation (SM-49), and Banach contraction cascades."
    },
    {
      roman: "VII", eqs: "SM Eqs. 63–83", ch: "Ch. 10",
      title: "Metronic Lattice Quantization, Difference Calculus & Discrete Vector Analysis",
      dom: "HeimCorpus(x_i = alpha_i N_i, Metron tau, nabla, S, GRAD_L, DIV_L, ROT_L)",
      cod: "Lattice M_tau^n = oplus tau_i Z, l^infty(M_tau^n), DEC Cochain Complex (Omega_d^*, d_tau)",
      targets: [6],
      desc: "Replaces smooth manifolds at the Uebergangskriterium chi*sqrt(|g|)=1 with the discrete lattice M_tau^n, backward differences nabla = I - E^-1, summation S (nabla o S = id), and Discrete Exterior Calculus with d_tau^2 = 0."
    },
    {
      roman: "VIII", eqs: "SM Eqs. 84–100a", ch: "Ch. 11 & App. B",
      title: "Metric Selectors, Non-Hermitian Hermetry & Closed Mass Spectrum",
      dom: "HeimCorpus(^2gamma;n, Spin Rotor s_hat, ^4zeta, ^4F = 0, L_p = binom(6,p))",
      cod: "Self-Adjoint Selectors on H_E = L^2(M,E), ker(^4F), Mass Formula m(p, lambda_k)",
      targets: [7, 8],
      desc: "Condenses R_12 -> R_6 (N=6), evaluates discrete lattice geodesics and curvature compression ^4zeta_tau (converging to ^4R as tau -> 0), and extracts the discrete particle mass spectrum from the null stability kernel ker(^4F) across L_p = binom(6,p)."
    }
  ];

  const fwNames = [
    "1. Topos Logic E_syn (Ch. 1, App. A)",
    "2. Colored Operads O_syn (Ch. 2)",
    "3. Corporate Algebra Syn (Ch. 3)",
    "4. Gauge Geometry F_A (Ch. 4)",
    "5. (∞,1)-Topos X_syn (Ch. 5, 6)",
    "6. Metric Bundles ²g̅ (Ch. 7–9)",
    "7. DEC Lattices M_τⁿ (Ch. 10)",
    "8. Selector Matter m(p,ŝ) (Ch. 11, App. B)",
    "9. Cognition & Horizon (Ch. 12–15, App. C–E)"
  ];

  let activeClusterIdx = 0;

  window.ch14_selectCluster = function(idx) {
    if (typeof idx === 'number') activeClusterIdx = idx;
    const svg = document.getElementById('ch14-concordance-svg');
    const readout = document.getElementById('ch14-concordance-readout');
    if (!svg || !readout) return;

    for (let i = 0; i < 8; i++) {
      const btn = document.getElementById('ch14-cl-btn-' + i);
      if (btn) {
        if (i === activeClusterIdx) {
          btn.style.background = '#FFD700';
          btn.style.color = '#000';
          btn.style.fontWeight = 'bold';
        } else {
          btn.style.background = '#151c2c';
          btn.style.color = '#e2e8f0';
          btn.style.fontWeight = 'normal';
        }
      }
    }

    const c = clusterData[activeClusterIdx];
    let html = `
      <rect x="6" y="10" width="128" height="190" rx="6" fill="#111827" stroke="#64748b" stroke-width="1.5"/>
      <text x="70" y="26" fill="#FFD700" font-size="9.5" font-weight="bold" text-anchor="middle">Heim Corpus (D)</text>
    `;
    for (let i = 0; i < 8; i++) {
      const y = 42 + i * 19;
      const isSel = (i === activeClusterIdx);
      html += `
        <rect x="12" y="${y - 10}" width="116" height="15" rx="3" fill="${isSel ? 'rgba(255,215,0,0.25)' : '#1e293b'}" stroke="${isSel ? '#FFD700' : '#334155'}" stroke-width="${isSel ? '1.5' : '0.8'}"/>
        <text x="70" y="${y}" fill="${isSel ? '#FFD700' : '#94a3b8'}" font-size="7.8" font-weight="${isSel ? 'bold' : 'normal'}" text-anchor="middle">Cluster ${clusterData[i].roman}: ${clusterData[i].eqs.replace('SM ', '')}</text>
      `;
    }

    // Central branch point R
    const bx = 195, by = 105;
    const ay = 42 + activeClusterIdx * 19 - 2;
    html += `
      <path d="M 134,${ay} C 162,${ay} 165,${by} ${bx},${by}" fill="none" stroke="#FFD700" stroke-width="2.4"/>
      <circle cx="${bx}" cy="${by}" r="14" fill="#1e1b4b" stroke="#FFD700" stroke-width="2"/>
      <text x="${bx}" y="${by + 4}" fill="#FFD700" font-size="10.5" font-weight="bold" text-anchor="middle">ℛ</text>
    `;

    // 9 Target Frameworks on the right
    for (let j = 0; j < 9; j++) {
      const ty = 20 + j * 21;
      const hit = c.targets.indexOf(j) !== -1;
      html += `
        <path d="M ${bx + 14},${by} C 232,${by} 232,${ty} 258,${ty}" fill="none" stroke="${hit ? '#20B2AA' : '#334155'}" stroke-width="${hit ? '2.4' : '0.9'}" stroke-dasharray="${hit ? 'none' : '2,2'}"/>
        <rect x="258" y="${ty - 8}" width="194" height="16" rx="3" fill="${hit ? 'rgba(32,178,170,0.25)' : '#0f172a'}" stroke="${hit ? '#20B2AA' : '#334155'}" stroke-width="${hit ? '1.6' : '0.8'}"/>
        <text x="264" y="${ty + 3}" fill="${hit ? '#5eead4' : '#64748b'}" font-size="7.6" font-weight="${hit ? 'bold' : 'normal'}">${fwNames[j]}</text>
      `;
    }
    svg.innerHTML = html;

    readout.innerHTML =
      `<div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px;">` +
      `<span><b style="color:#FFD700;">Cluster ${c.roman} (${c.eqs} → ${c.ch}):</b> ${c.title}</span>` +
      `<span style="color:#5eead4;"><b>Typed Morphism:</b> $\\mathcal{R}_{\\mathrm{${c.roman}}} \\colon \\mathbf{D} \\rightsquigarrow \\mathbf{A,B,C}$</span>` +
      `</div>` +
      `<div style="margin-top:4px; color:#cbd5e1;"><b>Domain (D):</b> <code>${c.dom}</code> &nbsp;|&nbsp; <b>Codomain (A/B):</b> <code>${c.cod}</code></div>` +
      `<div style="margin-top:3px; color:#94a3b8;">${c.desc}</div>`;
  };

  // =========================================================================
  // WIDGET 2: §14.2.1 (Part I) Source Formula Inspector (SM Eqs. 1–27)
  // =========================================================================
  const eqPart1List = [
    { tag: "SM Eq. 1", cl: "Cluster I (Ch. 1)", src: "S ≡ ⌈D_nn × K_n × P_nn⌉ ≡ ⌈ζ_n, [(α,d,β)_q]_n × [(y,χ,r)_q]_n F(ζ_n,z_n) × z_n, [(a,f,b)_q]_n⌉", rec: "Structured Context Object U ∈ Obj(Ctx_adm^sk) in Ban_<=1 with contraction K : D ⊗̂_π P → C and isometric ciphers z, ζ (Def. 1.7)." },
    { tag: "SM Eq. 2", cl: "Cluster I (Ch. 1)", src: "a, Q[AS]_γ b ∨ F(a_i)_1^p, Q[AS]_γ, Φ(b_k)_1^q", rec: "Context morphism α : V → U in Ctx_adm^sk inducing pullback base-change functor f* : E_syn/U → E_syn/V." },
    { tag: "SM Eq. 3", cl: "Cluster I (Ch. 1)", src: "( )_ρ, Q_{ρ,1}^r(A_ρ), ( )_ρ", rec: "Local Kripke–Joyal sheaf forcing judgment U ⊩ φ(s) over the internal Heyting algebra Ω(U)." },
    { tag: "SM Eq. 4", cl: "Cluster I (Ch. 1)", src: "( )_ρ, Q_{f_ρ,1}^r(A_ρ), ( )_ρ ∨ β_ρ ≡ f_ρ; α_ρ ∨ α_ρ ≡ A_ρ ∨ β_ρ ≡ B_ρ", rec: "Polyquantor product-slice forcing ∏_{i=1}^r V_i ⊩ φ equipped with transition cocycles across observer overlaps." },
    { tag: "SM Eq. 5", cl: "Cluster II (Ch. 2)", src: "yã ≡ (f, ã, m) ∨ ã ≡ (a_i)_n ∨ F_1 ≡ f(a_k)_1^m ∨ 1 ≤ m ≤ n", rec: "Free algebra over completed symmetric colored Banach operad O_syn on color profile (γ,…,γ; γ+1)." },
    { tag: "SM Eq. 5a", cl: "Cluster II (Ch. 2)", src: "H(yã) = ⟨(f, ã) m⟩", rec: "Homogeneous Syntrix Monad Algebra for composite monad T_hom := T_frag ∘ T_pyr under Beck's Distributive Law λ (Spaltbarkeit)." },
    { tag: "SM Eq. 6", cl: "Cluster II (Ch. 2)", src: "ã ≡ (a_i)_n ∨ n ≥ 1", rec: "Non-trivial carrier existence axiom dim P^U ≥ 1 in FinBan_<=1 (excluding the degenerate zero context)." },
    { tag: "SM Eq. 7", cl: "Cluster II (Ch. 2)", src: "ã ≡ (A_i, a_i, B_i)_n", rec: "Closed convex interval state space S(P_n) := ∏_{q=1}^n I(ℝ) ⊂ P_n." },
    { tag: "SM Eq. 8", cl: "Cluster II (Ch. 2)", src: "(f̲, m̲) ≡ ∫_{γ=1}^χ (f_γ, m_γ)|_{χ(γ-1)}^{χ(γ)} ã| ≡ ⟨f̲, ã, m̲⟩", rec: "Piecewise-color filtered operad algebra with stage partition intervals I_k := [χ(k-1), χ(k)-1]." },
    { tag: "SM Eq. 9", cl: "Cluster II (Ch. 2)", src: "(yã) ≡ ⟨f, (ã), m⟩ ∨ (ã) ≡ (a_i(t_{(i)j})_1^{n_i})_n ∨ α_{(i)j}, t_{(i)j}, β_{(i)j}", rec: "Primigene Äondyne: Cartesian fiber section S̲ ∈ Obj(Syn(U)) over smooth parameter manifold M_U in Grothendieck fibration ∫_Ctx Syn → Ctx." },
    { tag: "SM Eq. 9a", cl: "Cluster II (Ch. 2)", src: "S̲ ≡ ⟨f, (ã), m⟩ ∨ S̅ ≡ ⟨(f), ã, m⟩ ∨ S̲̅ ≡ ⟨(f), (ã), m⟩", rec: "Regel- & Ganzläufige Äondynen: Smooth families of colored operad operations t' ↦ f(t') ∈ C^0(M'_U, O_syn)." },
    { tag: "SM Eq. 10", cl: "Cluster III (Ch. 3)", src: "ã {K_m C_m} b̃, Q[CS]_γ, c̃ ∨ (f̲, m̲), {K_s C_s}, (φ̲, μ̲), Q[AS]_γ, (G̲, N̲)", rec: "Decoupled carrier coproduct C_m (P_a ⊕_1 P_b) / pushout K_m (P_a ⊞_φ P_b) and graded module direct sum C_s / projective tensor K_s." },
    { tag: "SM Eq. 11", cl: "Cluster III (Ch. 3)", src: "⟨(f̲ ã) m̲⟩ {K_s C_s ; K_m C_m} ⟨(φ̲ b̃) μ̲⟩, Q[CS_c]_γ, ⟨(G̲ c̃) N̲⟩", rec: "Universal 2×2 Corporate Pairing Functor Kor_{r,Σ_r}(S_a, S_b) ∈ Syn: deterministic across 15 combinatorial classes (9 Mixed / 6 Pure)." },
    { tag: "SM Eq. 11a", cl: "Cluster III (Ch. 3)", src: "yã { } yb̃, ⊨, yc̅̃ ∨ yc̅̃ ≡ ⟨f̲̅ c̃ m̲̅⟩", rec: "Zero Object (Nullsyntrix) 0_Syn := (0_Ctx, {0}_{γ≥0}, 0, id_{0}), both initial and terminal in Syn." },
    { tag: "SM Eq. 11b", cl: "Cluster III (Ch. 3)", src: "⟨(f̲ ã) m̲⟩, ⊨, yã_1 { } … { } yã_k { } … { } yã", rec: "Finite Corporate Chain Decomposition of homogeneous syntrices terminating in Nullsyntrix under complexity measure μ(S)." },
    { tag: "SM Eq. 11c", cl: "Cluster III (Ch. 3)", src: "yã, ⊨, yã_(1) { } yã_(2) { } yã_(3) { } yã_(4)", rec: "Colimit decomposition into the 4 elementary selection representations Sel_{ε,ρ}^{(m)}(V) ∈ {Sym^m, Λ^m, V^{⊗̲m}, V^{⊗m}}." },
    { tag: "SM Eq. 12", cl: "Cluster III (Ch. 3)", src: "yã^{(k)}{ }^{(l)} yb̃, ⊨, yc̃  (source p. 56 has a repeated-c slip)", rec: "Conflexive Corporate Pairing with span pushout over coupling node R_φ → P_a, P_b at grades (k, l)." },
    { tag: "SM Eq. 13", cl: "Cluster III (Ch. 3)", src: "(ã_i^{(k_i)} { }_i^{(l_{i+1})} ã_{i+1}]_{i=1}^{N-1}, ⊨, c̃  (untagged display, SM p. 58)", rec: "Colimit of decorated corporate interaction tree G_S = (V, E_C ⊔ E_K, Σ) with presentation index ConfIndex_pres = |E_K| + 1." },
    { tag: "SM Eq. 13a", cl: "Cluster III (Ch. 3)", src: "⌞, yã, ⊨, yc̃ ∨ ⌞ ≡ (( )_i^{(k_i)}{ }_i^{(l_{i+1})}( )_{i+1}]_{i=1}^{N-1}", rec: "Total Conflexive Syntrix: Higher operadic corporate pairing whose internal arguments are composite interaction trees." },
    { tag: "SM Eq. 14", cl: "Cluster IV (Ch. 4)", src: "G ≡ [P_i|_1^4 { }_{(j)}|_1^Q]_{(A,S)}", rec: "Generative Presentation Blueprint inducing context object U_G ∈ Ctx_adm^sk and slice topos E_syn / y(U_G) (Syntrixtotalität T0)." },
    { tag: "SM Eq. 15", cl: "Cluster IV (Ch. 4)", src: "yã, ⊨, yc̃(⌞_j( )]_1^n ∨ yβ̃, ⊨, yã, yb̃", rec: "Discrete Enyphansyntrix: Sequential corporate selection program operating in the slice topos Sh(Ctx_{/U_G})." },
    { tag: "SM Eq. 16", cl: "Cluster IV (Ch. 4)", src: "yF̃ ε yf̃ → yf̅̃ ∨ (G_k, ε]_1^n ≡ E ∨ yF̃ ε yf̃, ⊨, E, yf̃", rec: "1-Parameter Automorphism Flow Φ_t^X := (φ_t^X)* : C^∞(M) → C^∞(M) generated by complete Lie derivation X ∈ X(M)." },
    { tag: "SM Eq. 16a", cl: "Cluster IV (Ch. 4)", src: "E^{-1}, E, yf̃, ⊨, yf̃", rec: "Group Inversion in Diffeomorphism Group: (Φ_t^X)^{-1} = Φ_{-t}^X = Φ_t^{-X} ∈ Diff(M)." },
    { tag: "SM Eq. 17–17a", cl: "Cluster IV (Ch. 4)", src: "yC̃ ≡ yc̃, ⌞̲ E, ⊨, (yã_i ⌞_i yã_{i+1}]_1^{N-1} ⌞( )⌞̲ E", rec: "Continuous Enyphansyntrix & Holoform Coupling: Smooth vector field derivation modulating a corporate network with non-Abelian gauge curvature Ω_int^D." },
    { tag: "SM Eq. 18–18a", cl: "Cluster IV (Ch. 4)", src: "yf̃, (yã_ς)_1^r, ⊨, yÃ ∨ yf̃ ≡ yc̃ C(( )⌞_ς( )]_1^{r-1}", rec: "Syntrix Functor Pushout Endofunctor YF_model(f) := B ⊔_{C_0} f^{⊗r} generating discrete time granules δt_n = τ(n+1) - τ(n)." },
    { tag: "SM Eq. 19–19a", cl: "Cluster IV (Ch. 4)", src: "S ≡ (yã_i / m_{(λ)γ_i} |_{i=1}^N |_{γ_i=0}^{k_i})_{λ=1}^L", rec: "Stabilized Affinity Bilinear Interface β^∞ ∈ ∏ Bil_<=1(F_γ, B; ℝ) with two-sided non-degeneracy ker T_β = {0}, ker S_β = {0}." },
    { tag: "SM Eq. 20–20b", cl: "Cluster V (Ch. 5)", src: "M^1(a) ≡ ⟨(F̲, wã) r̲⟩ ∨ wã ≡ (yã_i)_N ; M^1(a) {K_s C_s ; K_m C_m} M^1(b), ⊨, M^1(c)", rec: "Hypersyntrix M^1: Internal category object in Cat_∞(X_syn) := CSeg(X_syn) via nerve embedding N_1 and higher corporate pairings." },
    { tag: "SM Eq. 21–24", cl: "Cluster V (Ch. 5)", src: "yã ≡ M^0(a) ; M^{n+1}(a) ≡ ⟨M^n(F), M^{ñ}(a) r̲⟩ ∨ 1 ≤ p ≤ 4", rec: "Metroplex Hierarchy: Sequence of full sub-∞-categories Met_n(X_syn) ↪ Alg_{O_n}(X_syn) in the ambient (∞,1)-topos X_syn." },
    { tag: "SM Eq. 25–25a", cl: "Cluster V (Ch. 5)", src: "B_{n+N}(α) ≡ K_n^{n+N} M^n(a) [ (M_{n-1}(φ)) (M_{n-1}(f̲), m̲) (M_n(f̲), r̲) (M_{n+1}(f̲), p) ]", rec: "Syntroclinic Bridge Adjunction: Change-of-operad extension and restriction functors (φ_{n,n+N})_! ⊣ (φ_{n,n+N})*." },
    { tag: "SM Eq. 26", cl: "Cluster V (Ch. 5)", src: "B_{ñ}(a) ≡ M^n(a) E N B_{p+q}(b) ∨ p + q ≤ n ∨ q > 0", rec: "Endogenous Combination Operator EN_{p,q}^n on graded domain p + q ≤ n, q > 0." },
    { tag: "SM Eq. 27", cl: "Cluster V (Ch. 6)", src: "AR_q ≡ AR_{(T)}^{(T')} [(AR_{q-1})_{γ_{q-1}}]_1^{P_{q-1}} ∨ AR_1 ≡ AR_{(T)}^{(T')}[M^n(a̲)(t_i)_1^Q]", rec: "Area Recurrence Hierarchy: Iterated fiber bundles of parameterized dynamical flows (M_AR^{(q)}, g_AR, Φ_t) oriented between telecentric attractors." }
  ];

  window.ch14_inspectSourceEqPart1 = function() {
    const el = document.getElementById('ch14-eq1-idx');
    const lbl = document.getElementById('ch14-eq1-val');
    const out = document.getElementById('ch14-eq1-readout');
    if (!el || !out) return;
    const idx = Math.max(0, Math.min(eqPart1List.length - 1, parseInt(el.value) || 0));
    const item = eqPart1List[idx];
    if (lbl) lbl.innerText = item.tag;
    out.innerHTML =
      `<div style="display:flex; justify-content:space-between; margin-bottom:4px;">` +
      `<b style="color:#FFD700; font-size:1.05em;">${item.tag}</b>` +
      `<span style="color:#5eead4; font-weight:bold;">${item.cl}</span>` +
      `</div>` +
      `<div style="background:#070b14; border:1px solid #334155; border-radius:5px; padding:5px 8px; font-family:monospace; color:#f8fafc; margin-bottom:5px;">` +
      `<b>Source (D):</b> ${item.src}` +
      `</div>` +
      `<div style="color:#cbd5e1;"><b>Modern Reconstruction $\\mathcal{R}$ (A/B/C):</b> ${item.rec}</div>`;
  };

  // =========================================================================
  // WIDGET 3: §14.2.4–14.2.5 Corporate Pairing, Conflexivity & Gauge Curvature Lab
  // =========================================================================
  let korMode = 'Km';
  window.ch14_setKorMode = function(m) {
    korMode = m;
    window.ch14_updateKorporatorGauge();
  };

  window.ch14_updateKorporatorGauge = function() {
    const elP = document.getElementById('ch14-kor-p');
    if (!elP) return;
    const p = parseInt(elP.value) || 4;
    const q = parseInt(document.getElementById('ch14-kor-q').value) || 4;
    const lamIn = document.getElementById('ch14-kor-lam');
    const maxLam = Math.min(p, q) - 1;
    lamIn.max = Math.max(1, maxLam);
    const lam = korMode === 'Cm' ? 0 : Math.min(maxLam, parseInt(lamIn.value) || 1);
    const ek = parseInt(document.getElementById('ch14-kor-ek').value) || 3;
    const gNorm = parseFloat(document.getElementById('ch14-kor-gnorm').value) || 1.2;

    document.getElementById('ch14-kor-p-val').innerText = p;
    document.getElementById('ch14-kor-q-val').innerText = q;
    document.getElementById('ch14-kor-lam-val').innerText = lam;
    document.getElementById('ch14-kor-ek-val').innerText = ek;
    document.getElementById('ch14-kor-gnorm-val').innerText = gNorm.toFixed(1);

    const btnCm = document.getElementById('ch14-btn-cm');
    const btnKm = document.getElementById('ch14-btn-km');
    if (btnCm && btnKm) {
      if (korMode === 'Cm') {
        btnCm.style.background = '#FFD700'; btnCm.style.color = '#000'; btnCm.style.fontWeight = 'bold';
        btnKm.style.background = '#151c2c'; btnKm.style.color = '#e2e8f0'; btnKm.style.fontWeight = 'normal';
      } else {
        btnKm.style.background = '#FFD700'; btnKm.style.color = '#000'; btnKm.style.fontWeight = 'bold';
        btnCm.style.background = '#151c2c'; btnCm.style.color = '#e2e8f0'; btnCm.style.fontWeight = 'normal';
      }
    }

    const dimCarrier = p + q - lam;
    const confIdx = ek + 1;
    const gE = (gNorm * gNorm).toFixed(2);
    const deltaEmerg = (0.5 * gNorm * gNorm).toFixed(2);

    const svg = document.getElementById('ch14-kor-svg');
    if (svg) {
      let s = `<rect x="4" y="4" width="222" height="102" rx="6" fill="#070a12" stroke="#334155"/>`;
      // Draw carrier pushout on left half
      s += `<circle cx="42" cy="54" r="24" fill="rgba(65,105,225,0.28)" stroke="#4169E1" stroke-width="1.8"/>`;
      const cx2 = korMode === 'Cm' ? 98 : 70;
      s += `<circle cx="${cx2}" cy="54" r="24" fill="rgba(32,178,170,0.28)" stroke="#20B2AA" stroke-width="1.8"/>`;
      if (korMode === 'Km') {
        s += `<text x="56" y="57" fill="#FFD700" font-size="8.5" font-weight="bold" text-anchor="middle">R_φ(${lam})</text>`;
      }
      s += `<text x="70" y="96" fill="#cbd5e1" font-size="8.5" text-anchor="middle">dim P = ${dimCarrier}</text>`;

      // Draw interaction tree & gauge curvature on right half
      const tx0 = 135, ty0 = 54;
      for (let i = 0; i < Math.min(ek + 1, 6); i++) {
        const ang = (i / Math.min(ek + 1, 6)) * 2 * Math.PI;
        const nx = (172 + 28 * Math.cos(ang)).toFixed(1);
        const ny = (50 + 26 * Math.sin(ang)).toFixed(1);
        s += `<line x1="172" y1="50" x2="${nx}" y2="${ny}" stroke="#FFA500" stroke-width="1.6"/>`;
        s += `<circle cx="${nx}" cy="${ny}" r="4.5" fill="#FFD700"/>`;
      }
      s += `<circle cx="172" cy="50" r="${(6 + gNorm * 3.5).toFixed(1)}" fill="rgba(220,20,60,0.28)" stroke="#DC143C" stroke-width="1.6"/>`;
      s += `<text x="172" y="96" fill="#FFA500" font-size="8.5" text-anchor="middle">ConfIdx=${confIdx} | g_E=${gE}</text>`;
      svg.innerHTML = s;
    }

    const box = document.getElementById('ch14-kor-readout');
    if (box) {
      box.innerHTML =
        `<b>Cluster III (SM Eqs. 10–13a):</b> ${korMode === 'Cm' ? 'Konzenter Coproduct $P_a \\oplus_1 P_b$' : 'Exzenter Span Pushout $P_a \\boxplus_\\phi P_b$'} ⇒ <b>dim = ${p} + ${q} - ${lam} = <span style="color:#FFD700;">${dimCarrier}</span></b> | Tree Conflexivity $\\operatorname{ConfIndex}_{\\mathrm{pres}} = |E_K| + 1 = \\mathbf{${confIdx}}$<br>` +
        `<b>Cluster IV (SM Eqs. 14–19a):</b> Enyphanie Curvature Density $g_E^{\\mathcal{D}} = c_E\\|\\mathbf{\\Omega}_{\\mathrm{int}}^{\\mathcal{D}}\\|^2 = \\mathbf{${gE}}$ | Holoform Emergence $\\Delta_{\\mathrm{emerg}}^{\\mathcal{I}} = \\mathbf{+${deltaEmerg}} > 0$ ${gNorm > 0.05 ? '<span style="color:#20B2AA;"><b>(HOLOFORM STABILIZED)</b></span>' : '<span style="color:#94a3b8;">(Decoupled Aggregate)</span>'}`;
    }
  };

  // =========================================================================
  // WIDGET 4: §14.2.6 Cluster V Metroplex Bridge & Endogenous Operator EN_{p,q}^n
  // =========================================================================
  window.ch14_updateMetroplexBridge = function() {
    const elN = document.getElementById('ch14-met-n');
    if (!elN) return;
    const n = parseInt(elN.value) || 3;
    const capN = parseInt(document.getElementById('ch14-met-capn').value) || 2;
    const p = parseInt(document.getElementById('ch14-met-p').value) || 1;
    const q = parseInt(document.getElementById('ch14-met-q').value) || 1;

    document.getElementById('ch14-met-n-val').innerText = n;
    document.getElementById('ch14-met-capn-val').innerText = capN;
    document.getElementById('ch14-met-p-val').innerText = p;
    document.getElementById('ch14-met-q-val').innerText = q;

    const targetGrade = n + capN;
    const pqSum = p + q;
    const enValid = (pqSum <= n) && (q > 0);

    const svg = document.getElementById('ch14-met-svg');
    if (svg) {
      let s = `<rect x="4" y="4" width="232" height="102" rx="6" fill="#070a12" stroke="#334155"/>`;
      const maxG = Math.max(targetGrade, 6);
      for (let k = 0; k <= maxG; k++) {
        const x = 18 + (k / maxG) * 196;
        const isBase = (k === n);
        const isTop = (k === targetGrade);
        const isSub = (k === pqSum);
        const col = isTop ? '#FFD700' : (isBase ? '#4169E1' : (isSub ? '#20B2AA' : '#334155'));
        s += `<line x1="${x.toFixed(1)}" y1="22" x2="${x.toFixed(1)}" y2="82" stroke="${col}" stroke-width="${(isBase || isTop) ? '2.5' : '1.2'}"/>`;
        s += `<circle cx="${x.toFixed(1)}" cy="52" r="${(isBase || isTop) ? '6.5' : '4'}" fill="${col}"/>`;
        s += `<text x="${x.toFixed(1)}" y="95" fill="${col}" font-size="8" font-weight="bold" text-anchor="middle">M${k}</text>`;
      }
      const x1 = 18 + (n / maxG) * 196;
      const x2 = 18 + (targetGrade / maxG) * 196;
      s += `<path d="M ${x1.toFixed(1)},44 Q ${((x1+x2)/2).toFixed(1)},12 ${x2.toFixed(1)},44" fill="none" stroke="#FFD700" stroke-width="2.2"/>`;
      s += `<text x="${((x1+x2)/2).toFixed(1)}" y="20" fill="#FFD700" font-size="8.2" font-weight="bold" text-anchor="middle">(φ_{${n},${targetGrade}})_! ⊣ (φ_{${n},${targetGrade}})*</text>`;
      svg.innerHTML = s;
    }

    const box = document.getElementById('ch14-met-readout');
    if (box) {
      box.style.borderLeftColor = enValid ? '#20B2AA' : '#DC143C';
      box.innerHTML =
        `<b>Syntroclinic Bridge (SM Eqs. 25–25a):</b> $(\\phi_{${n},${targetGrade}})_! \\colon \\operatorname{Met}_{${n}}(\\mathcal{X}_{\\mathrm{syn}}) \\rightleftarrows \\operatorname{Met}_{${targetGrade}}(\\mathcal{X}_{\\mathrm{syn}}) \\colon (\\phi_{${n},${targetGrade}})^*$ (Leap $N = ${capN}$)<br>` +
        `<b>Endogenous Operator $\\operatorname{EN}_{${p},${q}}^{${n}}$ (SM Eq. 26):</b> Grade check $p + q = ${p} + ${q} = ${pqSum} ${enValid ? '\\le' : '>'} n = ${n}$ (` +
        (enValid
          ? `<span style="color:#20B2AA;"><b>✓ ADMISSIBLE ENDOGENOUS COUPLING IN $\\operatorname{Met}_{${n}}(\\mathcal{X}_{\\mathrm{syn}})$</b></span>`
          : `<span style="color:#ff6b81;"><b>✗ GRADE OVERFLOW: $p+q=${pqSum} > n=${n}$ VIOLATES SM EQ. 26</b></span>`) + `)`;
    }
  };

  // =========================================================================
  // WIDGET 5: §14.2.1 (Part II) & §14.2.7 Combinatorial Sieve Z_± & Cascade Lab
  // =========================================================================
  window.ch14_updateCombinatorialBounds = function() {
    const elOm = document.getElementById('ch14-comb-om');
    if (!elOm) return;
    const om = parseInt(elOm.value) || 3;
    const om1 = parseInt(document.getElementById('ch14-comb-om1').value) || 2;
    const kap = parseFloat(document.getElementById('ch14-comb-kap').value) || 0.45;

    document.getElementById('ch14-comb-om-val').innerText = om + ' (n=' + (2 * om) + ')';
    document.getElementById('ch14-comb-om1-val').innerText = om1;
    document.getElementById('ch14-comb-kap-val').innerText = kap.toFixed(2);

    // SM Eqs. 59 & 59a:
    // (omega - p)' = sum_{l=1}^{omega-p} binom(omega-p, l) = 2^{omega-p} - 1
    // Z_+ = 2 * (sum_{p=0}^{omega-1} (omega-p)' * binom(omega, p) + 1)
    // Z_- = 2 * (sum_{p=0}^{omega-1} (omega-p)' * (omega! / p!) + 1)
    let sumPlus = 0;
    let sumMinus = 0;
    const omFact = fact(om);
    for (let p = 0; p <= om - 1; p++) {
      const omMinusPPrime = Math.pow(2, om - p) - 1;
      sumPlus += omMinusPPrime * binom(om, p);
      sumMinus += omMinusPPrime * Math.round(omFact / fact(p));
    }
    const Zplus = 2 * (sumPlus + 1);
    const Zminus = 2 * (sumMinus + 1);

    // SM Eqs. 60–61: L_1 = binom(n, omega_1), L_2 = binom(L_1, omega)
    const nDim = 2 * om;
    const L1 = binom(nDim, Math.min(om1, nDim));
    const L2 = binom(Math.min(L1, 15), Math.min(om, Math.min(L1, 15)));
    const kap3 = Math.pow(kap, 3);

    const box = document.getElementById('ch14-comb-readout');
    if (box) {
      box.innerHTML =
        `<b>SM Eq. 38 &amp; 59–59a ($n = 2\\omega = ${nDim},\\; (\\omega-p)' = 2^{\\omega-p}-1$):</b> ` +
        `Symmetric Sieve Bound <b style="color:#5eead4;">$Z_+ = ${Zplus.toLocaleString()}$</b> &nbsp;|&nbsp; ` +
        `Skew-Symmetric Sieve Bound <b style="color:#FFD700;">$Z_- = ${Zminus.toLocaleString()}$</b><br>` +
        `<b>SM Eqs. 60–62 Strukturkaskade:</b> Stage-1 Multiplicity $L_1 = \\binom{${nDim}}{${Math.min(om1, nDim)}} = \\mathbf{${L1}}$, Stage-2 $L_2 = \\mathbf{${L2}}$, Apex $L_M = \\mathbf{1}$ &nbsp;|&nbsp; ` +
        `3-Stage Banach Contraction Factor $\\prod_{\\alpha=1}^3 \\kappa_\\alpha = \\mathbf{${kap3.toFixed(4)} < 1}$ (Unique Apex Metric \${}^2\\bar{\\mathbf{g}}_\\infty$!).`;
    }
  };

  // =========================================================================
  // WIDGET 6: §14.2.1 (Part III) Source Formula Inspector (SM Eqs. 63–100a)
  // =========================================================================
  const eqPart3List = [
    { tag: "SM Eq. 63", cl: "Cluster VII (Ch. 10)", src: "x_i = α_i N_i, N ≥ 1, α_i = χ_i τ^{1/p}, |χ_i| = 1, 1 ≤ p ≤ n, τ > 0", rec: "Metronic Lattice Quantization M_τ^n := ⊕_{i=1}^n τ_i ℤ ⊂ ℝ^n with fundamental Metron area quantum τ." },
    { tag: "SM Eq. 64", cl: "Cluster VII (Ch. 10)", src: "χ√|g_{(p)}| = 1, χ = |χ_i δ_{ik}|_p, ²g̅_{(p)} = const", rec: "Übergangskriterium: Determinant threshold forcing continuous geometry to fracture into discrete lattice cells M_τ^n." },
    { tag: "SM Eq. 65–65a", cl: "Cluster VII (Ch. 10)", src: "m = p M  (SM p. 208)  ;  ω = (1/2) p M  (SM p. 209)", rec: "Metronic dimension quantization and partial-structure selection rule." },
    { tag: "SM Eq. 66", cl: "Cluster VII (Ch. 10)", src: "lim_{ΔF_γ → τ} ∑_{γ=1}^n ỹ_γ Δx_γ = n τ  ;  ∫_{x_0}^{x_n} f(x) dx = n τ", rec: "Quantized action-area step replacing Riemann Partition limits by integer multiples of τ." },
    { tag: "SM Eq. 67–67a", cl: "Cluster VII (Ch. 10)", src: "∇φ = φ(n) - φ(n-1), 1 ≤ n ≤ N  ;  J(n_1,n_2) = S_{n_1}^{n_2} φ(n) dn", rec: "Bounded backward difference operator ∇ := I - E^{-1} on ℓ^∞(M_τ^n) and discrete summation operator S." },
    { tag: "SM Eq. 68", cl: "Cluster VII (Ch. 10)", src: "∇^k φ = ∑_{γ=0}^k (-1)^γ binom(k,γ) φ(n-γ)", rec: "Binomial expansion theorem for k-th order metronic differences ∇^k = (I - E^{-1})^k." },
    { tag: "SM Eq. 68a", cl: "Cluster VII (Ch. 10)", src: "∇(uv) = u ∇v + v ∇u - ∇u ∇v  ;  ∇(u/v) = (v ∇u - u ∇v) / (v(n)(v(n)-∇v))", rec: "Exact discrete Leibniz product and quotient rules with non-linear lattice cross-term -∇u ∇v." },
    { tag: "SM Eq. 68b", cl: "Cluster VII (Ch. 10)", src: "∇φ = 0 at n = n_ext : ∇²φ < 0 (φ_max), ∇²φ > 0 (φ_min), ∇²φ = 0 (φ_w)", rec: "Discrete lattice extrema and inflection classification via first and second backward differences." },
    { tag: "SM Eq. 69–72", cl: "Cluster VII (Ch. 10)", src: "Φ(n) = S φ(n) dn + C, ∇Φ = φ ; S(u g dn) = u S g dn + S(g - S g dn)∇u", rec: "Fundamental Theorem of Discrete Calculus (∇ ∘ S = id), summation by parts, and discrete Taylor–Newton series." },
    { tag: "SM Eq. 73–77", cl: "Cluster VII (Ch. 10)", src: "∇_k φ = φ - φ(…,n_k-1,…), [∇_k, ∇_l] = 0, ∇φ = ∑_{i=1}^L ∇_i φ", rec: "Commuting multi-variable partial difference operators, discrete chain rule (SM-75), and Euler homogeneity relation (SM-77)." },
    { tag: "SM Eq. 78–79c", cl: "Cluster VII (Ch. 10)", src: "∇̅φ = GRAD_L φ, sp ∇̅ ᵐC̅ = DIV_L ᵐC̅, ∇̅ ᵐC̅ - (∇̅ ᵐC̅)^× = ROT_L ᵐC̅, ROT_L GRAD_L = 0", rec: "Discrete Vector Calculus and Discrete Exterior Calculus (DEC) cochain complex (Ω_d^•, d_τ) satisfying exact nilpotency d_τ² ≡ 0." },
    { tag: "SM Eq. 80", cl: "Cluster VII (Ch. 10)", src: "S_{Ω(L)} DIV_L Φ̅ dV = S_{L-1} Φ̅ dV̅  ;  SS ROT_L Φ̅ d²F̅ = S Φ̅ dN̅", rec: "Exact Discrete Gauss–Ostrogradsky Divergence Theorem and Discrete Stokes Circulation Theorem on M_τ^n." },
    { tag: "SM Eq. 81–83", cl: "Cluster VII (Ch. 10)", src: "φ ∇_φ ln φ = ∇φ, e^{iφ} = cos φ + i sin φ, L = binom(N, p)", rec: "Discrete logarithmic/exponential operators, linear difference equations with Casoratian determinant D ≠ 0, andGrassmannian rank L = binom(N,p)." },
    { tag: "SM Eq. 84–86b", cl: "Cluster VIII (Ch. 11)", src: "²g̅(x^⊥)_1^N = ²γ̅(z^k)_1^N ; n, χ^i χ^k γ_{ik} - α(p,τ)( )/( ) = 0, x_k = C_k;n", rec: "Discrete Lattice Metric Sampling ²g̅_τ ∈ ℓ^∞(M_τ^n, Sym²(ℝ^n)) under coordinate grid selectors C_k;n = α_k τ^{1/p} n_k." },
    { tag: "SM Eq. 87–91a", cl: "Cluster VIII (Ch. 11)", src: "ŝ = ROT_N Φ̂, (ŝ;n)_{n=1} = τ̂, N̲ = S K̅ dn̅, ²K̅ = ²χ̅;n", rec: "Spin/vorticity lattice rotor selectors ŝ ∈ End(ℓ²(M_τ^n)) and Structural Condensation Functional N̅ := S K̃ = ∑_n K̃(n) < ∞." },
    { tag: "SM Eq. 92–93c", cl: "Cluster VIII (Ch. 11)", src: "∇_p² n^i + (α_k α_l / α_i) ∇_p n^k ∇_p n^l [i / k l]_{(ab)}^{(cd)};n = 0", rec: "Metronized Christoffel symbols of first/second kind and Discrete Lattice Geodesic Difference Equation." },
    { tag: "SM Eq. 94–98", cl: "Cluster VIII (Ch. 11)", src: "[(cd)/(-+)/(ab)] ≠ [(cd)/(-+)/(ab)]^× ; lim_{²γ̅ → ²E̅} (χ)_{(±)}^{(s_1)(s_2)} = DIV_{(x)}, GRAD_{(x)}", rec: "Non-Hermitian Metronized Connection Operators, flat-lattice Euclidean limits, and cross-sector coupling sum (SM-98)." },
    { tag: "SM Eq. 99–99b", cl: "Cluster VIII (Ch. 11)", src: "ς^i_{klm} = (1/α_l)∇_l[i / km] - (1/α_m)∇_m[i / kl] + [i / sl][s / km] - [s / im][s / kl] ; lim_{τ→0} ⁴ς̅;n = ⁴R̅", rec: "Metronized Curvature Compression Tensor ⁴ζ_τ decomposing into (ς, q, C, D) and converging to Riemann curvature ⁴R as τ → 0." },
    { tag: "SM Eq. 100", cl: "Cluster VIII (Ch. 11)", src: "⁴F̅(ς^i_{klm}, λ_m [i / kl])_1^N = ⁴0̅, λ_m = f_m(q)", rec: "Metronized Null Stability Condition: ker(⁴F̅) selecting invariant particle mass eigenvalues in H_E = L²(M, E)." },
    { tag: "SM Eq. 100a", cl: "Cluster VIII (Ch. 11)", src: "L_p = binom(6, p)", rec: "Physical Compactification Dimension N = 6 (R_6 = R_4 × S_2) and Closed-Form Mass Spectrum m = m_0 (L_p / L_1) ∏ λ_k." }
  ];

  window.ch14_inspectSourceEqPart3 = function() {
    const el = document.getElementById('ch14-eq3-idx');
    const lbl = document.getElementById('ch14-eq3-val');
    const out = document.getElementById('ch14-eq3-readout');
    if (!el || !out) return;
    const idx = Math.max(0, Math.min(eqPart3List.length - 1, parseInt(el.value) || 0));
    const item = eqPart3List[idx];
    if (lbl) lbl.innerText = item.tag;
    out.innerHTML =
      `<div style="display:flex; justify-content:space-between; margin-bottom:4px;">` +
      `<b style="color:#FFD700; font-size:1.05em;">${item.tag}</b>` +
      `<span style="color:#5eead4; font-weight:bold;">${item.cl}</span>` +
      `</div>` +
      `<div style="background:#070b14; border:1px solid #334155; border-radius:5px; padding:5px 8px; font-family:monospace; color:#f8fafc; margin-bottom:5px;">` +
      `<b>Source (D):</b> ${item.src}` +
      `</div>` +
      `<div style="color:#cbd5e1;"><b>Modern Reconstruction $\\mathcal{R}$ (A/B/C):</b> ${item.rec}</div>`;
  };

  // =========================================================================
  // WIDGET 7: §14.2.8 Cluster VII Metronic Difference & Leibniz Defect Lab
  // =========================================================================
  window.ch14_updateDiscreteCalculus = function() {
    const elN = document.getElementById('ch14-dec-n');
    if (!elN) return;
    const n = parseInt(elN.value) || 5;
    const k = parseInt(document.getElementById('ch14-dec-k').value) || 2;
    document.getElementById('ch14-dec-n-val').innerText = n;
    document.getElementById('ch14-dec-k-val').innerText = k;

    // Test functions on lattice: u(n) = n^2, v(n) = n
    const u = m => m * m;
    const v = m => m;
    const uv = m => u(m) * v(m);

    // SM Eq. 68: nabla^k u(n) = sum_{gamma=0}^k (-1)^gamma binom(k,gamma) u(n-gamma)
    let nablaKu = 0;
    let terms = [];
    for (let g = 0; g <= k; g++) {
      const sign = (g % 2 === 0) ? 1 : -1;
      const b = binom(k, g);
      const val = u(n - g);
      nablaKu += sign * b * val;
      terms.push(`${sign > 0 ? '+' : '-'}${b}·u(${n - g})`);
    }

    // SM Eq. 68a: nabla(uv)(n) = u(n)nabla v(n) + v(n)nabla u(n) - nabla u(n) nabla v(n)
    const du = u(n) - u(n - 1);
    const dv = v(n) - v(n - 1);
    const duvExact = uv(n) - uv(n - 1);
    const naiveLeibniz = u(n) * dv + v(n) * du;
    const crossDefect = du * dv;
    const rhsExact = naiveLeibniz - crossDefect;

    const svg = document.getElementById('ch14-dec-svg');
    if (svg) {
      let s = `<rect x="4" y="4" width="212" height="96" rx="6" fill="#070a12" stroke="#334155"/>`;
      for (let m = 1; m <= 8; m++) {
        const x = 16 + ((m - 1) / 7) * 184;
        const y = 86 - (u(m) / 64) * 68;
        const isCur = (m === n);
        const isStencil = (m <= n && m >= n - k);
        s += `<line x1="${x.toFixed(1)}" y1="86" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${isCur ? '#FFD700' : (isStencil ? '#20B2AA' : '#334155')}" stroke-width="${isCur ? '2.5' : '1.4'}"/>`;
        s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${isCur ? '5' : (isStencil ? '4' : '2.8')}" fill="${isCur ? '#FFD700' : (isStencil ? '#20B2AA' : '#64748b')}"/>`;
      }
      s += `<text x="108" y="20" fill="#5eead4" font-size="8.5" font-weight="bold" text-anchor="middle">Stencil [n-${k}, …, n] on M_τ¹</text>`;
      svg.innerHTML = s;
    }

    const box = document.getElementById('ch14-dec-readout');
    if (box) {
      box.innerHTML =
        `<b>Binomial Difference (SM Eq. 68, $u(n)=n^2$):</b> $\\nabla^{${k}} u(${n}) = ${terms.join(' ').replace(/^\+/, '')} = \\mathbf{${nablaKu}}$ ` +
        `${k > 2 ? '<span style="color:#FFD700;"><b>(= 0 for degree-2 polynomial when k &gt; 2!)</b></span>' : ''}<br>` +
        `<b>Discrete Leibniz Rule (SM Eq. 68a, $v(n)=n$):</b> Naive $u\\nabla v + v\\nabla u = ${naiveLeibniz}$ vs. Exact $\\nabla(uv)(${n}) = ${ naiveLeibniz } - \\underbrace{\\nabla u\\nabla v}_{${crossDefect}} = \\mathbf{${rhsExact} = ${duvExact}}$ &nbsp;|&nbsp; $\\nabla(\\mathcal{S}u)(${n}) = u(${n}) = \\mathbf{${u(n)}}$`;
    }
  };

  // =========================================================================
  // WIDGET 8: §14.2.9 Cluster VIII Channel Multiplicity L_p = binom(6,p) & Mass Lab
  // =========================================================================
  const sectorDescriptions = {
    1: "p = 1 (L₁ = 6): Single-axis metronic line excitations across R₆ = R₄ × S₂ (Reference baseline L₁ = 6).",
    2: "p = 2 (L₂ = 15): Fundamental 2D area-plaquette condensations (SM Eq. 87 spin/vorticity rotors ŝ_αβ on 15 skew planes).",
    3: "p = 3 (L₃ = 20): Maximal 3-volume metronic hyperstructure multiplicity (Baryonic / mesobaric trivalent core).",
    4: "p = 4 (L₄ = 15): Dual 4-dimensional spacetime-internal plaquette duals (Hodge-*_τ dual to p = 2 on R₆).",
    5: "p = 5 (L₅ = 6): Hypersurface 5-cell duals on R₆ (Hodge-*_τ dual to p = 1).",
    6: "p = 6 (L₆ = 1): Complete 6D volume element on R₆ = R₄ × S₂ (Unique top-form condensation)."
  };

  window.ch14_updateMassSelector = function() {
    const elP = document.getElementById('ch14-ms-p');
    if (!elP) return;
    const p = parseInt(elP.value) || 2;
    const lamProd = parseFloat(document.getElementById('ch14-ms-lam').value) || 1.25;
    const tauScale = parseFloat(document.getElementById('ch14-ms-tau').value) || 0.15;

    document.getElementById('ch14-ms-p-val').innerText = p;
    document.getElementById('ch14-ms-lam-val').innerText = lamProd.toFixed(2);
    document.getElementById('ch14-ms-tau-val').innerText = tauScale.toFixed(2);

    const Lp = binom(6, p);
    const L1 = 6;
    const ratio = Lp / L1;
    const mOverM0 = ratio * lamProd;
    const curvErr = (tauScale * tauScale * 0.42).toFixed(4);

    const svg = document.getElementById('ch14-ms-svg');
    if (svg) {
      let s = `<rect x="4" y="4" width="212" height="96" rx="6" fill="#070a12" stroke="#334155"/>`;
      for (let k = 1; k <= 6; k++) {
        const bVal = binom(6, k);
        const bx = 14 + (k - 1) * 32;
        const bh = (bVal / 20) * 62;
        const by = 80 - bh;
        const isSel = (k === p);
        s += `<rect x="${bx}" y="${by.toFixed(1)}" width="22" height="${bh.toFixed(1)}" rx="2" fill="${isSel ? '#FFD700' : '#20B2AA'}" opacity="${isSel ? '1.0' : '0.45'}"/>`;
        s += `<text x="${bx + 11}" y="${(by - 3).toFixed(1)}" fill="${isSel ? '#FFD700' : '#cbd5e1'}" font-size="8" font-weight="bold" text-anchor="middle">${bVal}</text>`;
        s += `<text x="${bx + 11}" y="92" fill="${isSel ? '#FFD700' : '#94a3b8'}" font-size="7.5" text-anchor="middle">p=${k}</text>`;
      }
      svg.innerHTML = s;
    }

    const box = document.getElementById('ch14-ms-readout');
    if (box) {
      box.innerHTML =
        `<b>SM Eq. 100a ($N=6,\\; L_p = \\binom{6}{p}$):</b> $L_{${p}} = \\binom{6}{${p}} = \\mathbf{${Lp}}$ &nbsp;|&nbsp; Channel Ratio $L_{${p}}/L_1 = ${Lp}/6 = \\mathbf{${ratio.toFixed(3)}}$<br>` +
        `<b>SM Eq. 100 ($\\ker {}^4\\bar{\\mathbf{F}}$ Mass Formula):</b> $m / m_0 = \\frac{L_{${p}}}{L_1}\\prod \\lambda_k = \\mathbf{${mOverM0.toFixed(4)}}$ &nbsp;|&nbsp; ` +
        `<b>SM Eq. 99 Continuum Limit:</b> $\\|{}^4\\zeta_\\tau - {}^4\\mathbf{R}\\| \\approx ${curvErr}$ ${tauScale <= 0.05 ? '<span style="color:#FFD700;"><b>(CONTINUUM RIEMANN LIMIT REACHED!)</b></span>' : ''}<br>` +
        `<span style="color:#94a3b8;">${sectorDescriptions[p]}</span>`;
    }
  };

  // =========================================================================
  // WIDGET 9: §14.3 Encyclopedic Lexicon Interactive Rosetta Explorer (All 20 Terms)
  // =========================================================================
  const lexiconEntries = [
    { term: "Affinitätssyndrom (𝔄)", pg: "SM, p. 80", cl: "IV", hist: "A structured tensor matrix defining the coupling potential between internal syntrometric states and external environmental contexts.", math: "Bounded bilinear interaction forms β ∈ ∏ Bil_<=1(F_γ, B; ℝ) on Banach context spaces with two-sided non-degeneracy ker T_β = {0}, ker S_β = {0} (Def. 4.19)." },
    { term: "Antagonismus (Antinomy)", pg: "SM, p. 6", cl: "I", hist: "A cognitive or structural conflict arising from projecting multi-dimensional continuous phenomena onto bivalent, discrete perceptual frames.", math: "Tripartite taxonomy separating mereological part-incompatibilities (Ant_mer), non-vanishing Čech descent defects (Ant_desc ⇔ Def_U(s) ≠ 0), and internal topos contradictions (Ant_log ⇔ U ⊩ ⊥) (Def. 1.18)." },
    { term: "Äondyne (S̲)", pg: "SM, p. 36", cl: "II", hist: "A Syntrix whose foundational Metrophor and generative Synkolator vary continuously across a multi-dimensional parameter manifold.", math: "Cartesian fiber section within the Grothendieck fibration π : ∫_Ctx Syn → Ctx over smooth base parameter manifolds M_U (Thm. 2.18)." },
    { term: "Enyphanie (Eν) / Enyphaniegrad (g_E)", pg: "SM, p. 62", cl: "IV", hist: "The latent, intrinsic capacity for structural transformation and energetic interaction inherent in organized syntrometric forms.", math: "Non-Abelian interaction gauge curvature residual Ω_int^D := F_A - ∑ F_k^{(A_0)} ∈ Ω²(M, ad P) and its quadratic Frobenius norm density g_E^D(x) = c_E ‖Ω_int^D‖² (Thm. 4.11)." },
    { term: "Fundamentalkondensor (³Γ)", pg: "SM, p. 157", cl: "VI", hist: "The primary structural condenser governing parallel transport, connection coefficients, and cross-metric correlations.", math: "The affine Christoffel connection Γ_{kl}^i ∈ Conn(M) of a non-Hermitian metric bundle, partitioned into symmetric correlation tensors f and commutator coupling tensors Q (Thm. 9.14)." },
    { term: "Hermetrie-Matrix (36)", pg: "SM, p. 145", cl: "VI", hist: "The comprehensive 36-component unified field tensor defined on the 6-dimensional subspace R_6 = R_4 × S_2.", math: "Non-Hermitian metric decomposition ²g̅ = ²g̅_+ + ²g̅_- on T*(R_4 × S_2)^{⊗2}, comprising 21 symmetric potentials and 15 skew-symmetric potentials (Def. 9.4)." },
    { term: "Holoform (Hol)", pg: "SM, p. 72", cl: "IV", hist: "An emergent, unified whole exhibiting non-reducible holistic properties and integrated causal persistence.", math: "Global sheaf section Γ ∈ Hol(U, P) in the descent equalizer with strictly positive Yang–Mills emergence action Δ_emerg^I(Γ; D) > 0 (Thm. 4.14)." },
    { term: "Hypersyntrix (M¹)", pg: "SM, p. 81", cl: "V", hist: "The Metroplex of the First Grade, treating an entire category of base syntrices as a foundational Hypermetrophor.", math: "Internal category object in the ambient (∞,1)-topos: Cat_∞(X_syn) := CSeg(X_syn), modeled as a complete Segal space (Def. 5.3)." },
    { term: "Korporator ({…})", pg: "SM, p. 42", cl: "III", hist: "The dual-action operator governing the inter-syntrix coupling and compositional synthesis of static Metrophors and dynamic Synkolators.", math: "Corporate pairing functor Kor_{r,Σ} : Syn × Syn → Syn combining carriers via ℓ¹-coproducts (C_m) or span pushouts (K_m), and modules via direct sums (C_s) or projective tensor products (K_s) (Def. 3.6)." },
    { term: "Metron (τ)", pg: "SM, p. 206", cl: "VII", hist: "The indivisible, fundamental quantum of geometric extension and area (τ ≈ 10^{-70} m²).", math: "Fundamental grid spacing parameter of the discrete lattice manifold M_τ^n := ⊕ τ_i ℤ ⊂ ℝ^n, providing the ultraviolet cutoff for discrete quantum physics (Def. 10.1)." },
    { term: "Metrondifferential (Fφ ≡ ∇φ)", pg: "SM, p. 213", cl: "VII", hist: "The finite difference operator replacing classical infinitesimal derivatives on quantized lattices.", math: "Bounded backward difference operator ∇_i := I - E_i^{-1} ∈ B(ℓ^∞(M_τ^n)), satisfying discrete Leibniz product rules with non-linear cross-terms (Thm. 10.6)." },
    { term: "Protyposis", pg: "SM, p. 63", cl: "II", hist: "The primordial structural reservoir consisting of elementary pyramidal building blocks (Speicher) and combination rules (Simplex).", math: "Generating signature of elementary selection representations Sel_{ε,ρ}^{(m)} spanning the free polynomial tree monad T_{O_pyr} (Def. 2.9)." },
    { term: "Spaltbarkeit (Splittability)", pg: "SM, p. 29", cl: "II", hist: "The structural principle asserting that every homogeneous, history-dependent syntrix can be factored into a pyramidal core and an interaction fragment.", math: "Beck's Distributive Law for monads λ : T_pyr ∘ T_frag ⇒ T_frag ∘ T_pyr, ensuring associative composite monad multiplication μ_hom (Prop. 2.12)." },
    { term: "Strukturkaskade", pg: "SM, p. 180", cl: "VI", hist: "The multi-tiered hierarchical ascent from elementary partial metrics to a fully synthesized apex metric field.", math: "Sequence of metric bundle operations Φ_M := ◯_{α=1}^M (κ_α T_α) forming a strict Banach contraction that converges uniquely to the apex metric ²g̅_∞ (Thm. 9.22)." },
    { term: "Strukturkompressor (⁴ζ)", pg: "SM, p. 255", cl: "VIII", hist: "The 4th-rank curvature compression tensor measuring non-linear internal geometric stresses.", math: "Self-adjoint geometric selector operator ζ_{klm}^i ∈ Ω²(M, End(TM)) on H_E = L²(M, E) whose kernel ker(⁴F) selects stable particle mass eigenvalues (Thm. 11.15)." },
    { term: "Syntropode", pg: "SM, p. 58", cl: "III", hist: "The uncorporated modular base of a syntrix prior to its entry into a conflexive network.", math: "Truncated graded operadic submodule τ_{≤ k_i-1}(S_i) acting as an atomic leaf vertex in a corporate interaction tree G_S (Def. 3.14)." },
    { term: "Televarianz", pg: "SM, p. 112", cl: "V", hist: "The property of an evolutionary trajectory that preserves internal structural stability and converges toward a telecentric attractor.", math: "Invariant dynamical orbit W_tele(t) = Φ_t(x_0) exhibiting strictly negative Lyapunov dissipation V̇ ≤ -γ V within the attractor basin B(A) (Thm. 6.11)." },
    { term: "Telezentrum (T_z)", pg: "SM, p. 108", cl: "V", hist: "An asymptotic target state of optimal structural integration and minimal entropy.", math: "Final coalgebra (νT, ζ) over polynomial transition endofunctors T, inducing the unique universal telecentric homomorphism ! α : S → νT (Thm. 6.7)." },
    { term: "Transzendente Telezentralenrelativität", pg: "SM, p. 117", cl: "V", hist: "The principle asserting that what constitutes an absolute goal at transcendence level m becomes a subordinate building block at level m+1.", math: "Categorical property that left adjoint lifting functors Γ_m ⊣ U_{m+1} do not preserve terminal objects: Γ_m(νT_m) ≇ νT_{m+1} (Thm. 6.19)." },
    { term: "Übergangskriterium", pg: "SM, p. 206", cl: "VII", hist: "The scalar determinant threshold (χ√|g_{(p)}| = 1) marking the breakdown of continuous geometry.", math: "Geodesic gradient threshold ‖∇ ²g̅‖ ≥ τ^{-1/p} where continuous geodesics develop finite-time singularities, forcing the continuum to fracture into discrete lattice cells M_τ^n (Thm. 9.25)." }
  ];

  window.ch14_searchLexicon = function() {
    const selEl = document.getElementById('ch14-lex-sel');
    const clEl = document.getElementById('ch14-lex-cl');
    const out = document.getElementById('ch14-lex-readout');
    if (!selEl || !out) return;

    const clFilter = clEl ? clEl.value : 'ALL';
    const filtered = lexiconEntries.filter(e => clFilter === 'ALL' || e.cl === clFilter);

    // Keep select options synced if filter changed
    if (selEl.dataset.lastCl !== clFilter) {
      selEl.dataset.lastCl = clFilter;
      selEl.innerHTML = filtered.map((e, i) => `<option value="${i}">${e.term} [Cluster ${e.cl}]</option>`).join('');
      selEl.value = "0";
    }

    const idx = Math.max(0, Math.min(filtered.length - 1, parseInt(selEl.value) || 0));
    const item = filtered[idx] || lexiconEntries[0];

    out.innerHTML =
      `<div style="display:flex; justify-content:space-between; margin-bottom:4px;">` +
      `<b style="color:#FFD700; font-size:1.06em;">${item.term}</b>` +
      `<span style="color:#5eead4; font-weight:bold;">Cluster ${item.cl} &nbsp;|&nbsp; ${item.pg}</span>` +
      `</div>` +
      `<div style="background:rgba(15,23,42,0.9); border-left:3px solid #94a3b8; padding:5px 8px; margin-bottom:5px; color:#e2e8f0;">` +
      `<b>Historical Definition (Stratum D):</b> <i>${item.hist}</i>` +
      `</div>` +
      `<div style="background:rgba(16,185,129,0.1); border-left:3px solid #20B2AA; padding:5px 8px; color:#f8fafc;">` +
      `<b>Mathematical Reconstruction $\\mathcal{R}$ (Strata A/B/C):</b> ${item.math}` +
      `</div>`;
  };

  // =========================================================================
  // VIDEO CONTROL & WIDGET INITIALIZATION BOILERPLATE
  // =========================================================================
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

  function renderAllCh14Widgets() {
    window.ch14_selectCluster(0);
    window.ch14_inspectSourceEqPart1();
    window.ch14_updateKorporatorGauge();
    window.ch14_updateMetroplexBridge();
    window.ch14_updateCombinatorialBounds();
    window.ch14_inspectSourceEqPart3();
    window.ch14_updateDiscreteCalculus();
    window.ch14_updateMassSelector();
    window.ch14_searchLexicon();
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

  let synCh14Initialised = false;
  function initChapter14() {
    if (synCh14Initialised) return;
    synCh14Initialised = true;
    prepareVideos();
    bindControlsOnce();
    renderAllCh14Widgets();
    syncVideosToSlide();
  }

  if (window.Reveal && window.Reveal.on) {
    window.Reveal.on('ready', initChapter14);
    window.Reveal.on('slidechanged', syncVideosToSlide);
    window.Reveal.on('fragmentshown', syncVideosToSlide);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) initChapter14();
    });
  } else if (!window.Reveal || !window.Reveal.isReady || window.Reveal.isReady()) {
    initChapter14();
  }
})();


// =========================================================================
// CHAPTER 14 3D ENGINE INJECTOR & RUNNER
// =========================================================================
const CH14_3D_STYLE = `
#ch14-3d-hud {
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

#ch14-3d-hud *, #ch14-3d-hud *::before, #ch14-3d-hud *::after {
  box-sizing: border-box;
}

#ch14-3d-hud.spotlight {
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  width: min(960px, 94vw);
  max-width: 94vw;
  box-sizing: border-box;
  border-color: #FFD700;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.96), 0 0 58px rgba(255, 215, 0, 0.44);
}

#ch14-3d-hud.minimized {
  width: clamp(280px, 26vw, 380px);
  max-width: calc(100vw - 20px);
  padding: 6px 11px;
  box-sizing: border-box;
}

#ch14-3d-hud.minimized .ch14-hud-body {
  display: none;
}

.ch14-hud-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  padding-bottom: 5px;
  margin-bottom: 6px;
}

.ch14-hud-title {
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

.ch14-hud-title span:first-child {
  line-height: 1.15;
}

.ch14-hud-title span[id$="-stage-pill"] {
  flex-shrink: 0;
  font-size: 8.5px;
  padding: 1px 5px;
  line-height: 1.15;
  border-radius: 4px;
}

.ch14-hud-controls {
  display: flex;
  align-items: center;
  gap: clamp(2.5px, 0.35vw, 5px);
  flex-shrink: 0;
}

.ch14-hud-btn {
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

.ch14-hud-btn:hover, .ch14-hud-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.ch14-canvas-wrap {
  position: relative;
  width: 100%;
  height: clamp(200px, 28vh, 440px);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #2d3748;
  background: radial-gradient(circle at 50% 55%, #111b30 0%, #05070e 100%);
  cursor: grab;
}

.ch14-canvas-wrap:active {
  cursor: grabbing;
}

#ch14-3d-hud.spotlight .ch14-canvas-wrap {
  height: clamp(340px, 60vh, 720px);
}

#ch14-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ch14-overlay-bar {
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

.ch14-telemetry {
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

#ch14-node-inspector {
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

.ch14-scrubber {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
  margin-top: 7px;
  font-size: clamp(9px, 0.9vw, 11px);
}

.ch14-scrubber span {
  white-space: nowrap;
  flex-shrink: 0;
}

.ch14-scrubber input[type="range"] {
  flex: 1 1 50px;
  min-width: 35px;
  accent-color: #FFD700;
  height: 5px;
  cursor: pointer;
}

.ch14-scrubber .ch14-hud-btn {
  flex-shrink: 0;
}

#ch14-caption {
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
  #ch14-3d-hud {
    right: 8px;
    bottom: 8px;
    width: clamp(280px, calc(100vw - 16px), 480px);
    max-width: calc(100vw - 16px);
    padding: 8px 10px 10px 10px;
    box-sizing: border-box;
  }
  #ch14-3d-hud.minimized {
    width: clamp(280px, calc(100vw - 16px), 380px);
    max-width: calc(100vw - 16px);
    box-sizing: border-box;
  }
  .ch14-hud-title {
    font-size: clamp(9px, 1.8vw, 10.5px);
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch14-hud-controls {
    gap: 3px;
  }
  .ch14-hud-btn {
    padding: 2px clamp(4px, 0.8vw, 6px);
    font-size: clamp(8px, 1.6vw, 9.5px);
  }
  .ch14-hud-scrubber {
    gap: 4px;
    font-size: 9.5px;
  }
}

@media (max-width: 600px) {
  #ch14-3d-hud {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px 8px 9px;
    box-sizing: border-box;
  }
  #ch14-3d-hud.minimized {
    left: 6px;
    right: 6px;
    bottom: 6px;
    width: auto;
    max-width: calc(100vw - 12px);
    padding: 6px 9px;
    box-sizing: border-box;
  }
  #ch14-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
  }
  .ch14-hud-header {
    gap: 5px;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .ch14-hud-title {
    font-size: 9.5px;
    gap: 2px 4px;
    line-height: 1.15;
  }
  .ch14-hud-title span[id$="-stage-pill"] {
    font-size: 8px;
    padding: 1px 4px;
  }
  .ch14-hud-controls {
    gap: 3px;
  }
  .ch14-hud-btn {
    padding: 2px 5px;
    font-size: 8.5px;
  }
  .ch14-hud-scrubber span {
    font-size: 8.5px;
  }
}

@media (max-width: 400px) {
  #ch14-3d-hud {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px 7px 7px;
    box-sizing: border-box;
  }
  #ch14-3d-hud.minimized {
    left: 4px;
    right: 4px;
    bottom: 4px;
    width: auto;
    max-width: calc(100vw - 8px);
    padding: 5px 7px;
    box-sizing: border-box;
  }
  #ch14-3d-hud.spotlight {
    left: auto;
    right: 50%;
    width: min(960px, calc(100vw - 8px));
    max-width: calc(100vw - 8px);
  }
  .ch14-hud-title {
    font-size: 8.5px;
    gap: 2px 3px;
  }
  .ch14-hud-title span[id$="-stage-pill"] {
    font-size: 7.5px;
    padding: 0.5px 3px;
  }
  .ch14-hud-btn {
    padding: 1.5px 4px;
    font-size: 8px;
  }
}
`;

const CH14_3D_HTML = `<div class="ch14-hud-header">

    <div class="ch14-hud-title">

      <span>🏛️ Ch 14 · 3D Master Register Engine</span>

      <span id="ch14-stage-pill" style="background:#4169E1; color:#fff; padding:1px 7px; border-radius:4px; font-size:9.5px;">Stage 1.0 / 10</span>

    </div>

    <div class="ch14-hud-controls">

      <button class="ch14-hud-btn active" id="ch14-btn-orbit" onclick="toggleCh14Orbit()">⟳ Orbit</button>

      <button class="ch14-hud-btn" onclick="toggleCh14Spotlight()">⛶ Spotlight</button>

      <button class="ch14-hud-btn" id="ch14-btn-min" onclick="toggleCh14Minimize()">+</button>

    </div>

  </div>



  <div class="ch14-hud-body">

    <div class="ch14-canvas-wrap" id="ch14-canvas-wrap">

      <canvas id="ch14-3d-canvas"></canvas>

      <div class="ch14-overlay-bar">

        <div class="ch14-telemetry" id="ch14-telemetry">ℛ : HeimCorpus(1–100a) → Math</div>

        <div id="ch14-node-inspector">Drag to Orbit 3D · Click Cluster to Inspect</div>

      </div>

    </div>



    <div class="ch14-scrubber">

      <span style="color:#94a3b8; font-weight:bold;">Morph Stage:</span>

      <input type="range" id="ch14-slider" min="1" max="10" step="0.05" value="1" oninput="scrubCh14Stage(this.value)">

      <button class="ch14-hud-btn active" id="ch14-btn-sync" onclick="enableCh14Sync()">Auto-Sync</button>

    </div>



    <div id="ch14-caption">

      <b>Stage 1 (§14.1 — Master Register):</b> 8 Canonical Equation Clusters (SM Eqs. 1–100a) mapped by functor ℛ.

    </div>

  </div>`;

function injectCh143DHUD() {
  if (document.getElementById('ch14-3d-hud')) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CH14_3D_STYLE;
  document.head.appendChild(styleEl);

  const hudEl = document.createElement('div');
  hudEl.id = 'ch14-3d-hud';
  hudEl.className = 'minimized';
  hudEl.innerHTML = CH14_3D_HTML;
  document.body.appendChild(hudEl);
}

(function() {
  if (window.__ch14_3d_engine_loaded) return;
  window.__ch14_3d_engine_loaded = true;

  function runCh14Engine() {
    injectCh143DHUD();
    if (window.__ch14_3d_engine_initialized) return;
    window.__ch14_3d_engine_initialized = true;

const canvas = document.getElementById('ch14-3d-canvas');

  const wrap = document.getElementById('ch14-canvas-wrap');

  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');



  let targetStage = 1.0;

  let curStage = 1.0;

  let autoSync = true;

  let autoOrbit = true;

  let camYaw = -0.45;

  let camPitch = 0.36;

  let camZoom = 1.65;

  let isDragging = false;

  let lastX = 0, lastY = 0;

  let timeSec = 0;

  let hitNodes = [];

  let selectedId = null;



  const CLUSTERS = [

    { id: "CL_I",    num: "I",    eqs: "SM 1–4",    col: "#4169E1", name: "Cluster I: Epistemology & Aspects", target: "ℰ_syn = Sh(Ctx_adm^sk, J_syn) & Ω", info: "Cluster I (SM 1–4): Prädikatrix P_n, Dialektik D_n, Koordination K_n, Quantoren → Sheaf Topos ℰ_syn (Ch. 1)" },

    { id: "CL_II",   num: "II",   eqs: "SM 5–9a",   col: "#20B2AA", name: "Cluster II: Syntrix & Operads",     target: "𝒪_syn, Tree Monad T_P & Beck Law λ̂", info: "Cluster II (SM 5–9a): Syntrix Triad yã, Bandsyntrix, Spaltbarkeit, Äondyne → Colored Operad 𝒪_syn (Ch. 2)" },

    { id: "CL_III",  num: "III",  eqs: "SM 10–13a", col: "#FFA500", name: "Cluster III: Corporate Pushouts",   target: "Span Pushout P_a ⊞_φ P_b & 4D Tesseract", info: "Cluster III (SM 10–13a): Korporator Matrix, Eindeutigkeitssatz, Konflexion → Span Pushout ⊞_φ (Ch. 3)" },

    { id: "CL_IV",   num: "IV",   eqs: "SM 14–19a", col: "#DC143C", name: "Cluster IV: Enyphanie & Gauge",     target: "Curvature Ω_int^𝒟 = [a_i,a_j] & BRST", info: "Cluster IV (SM 14–19a): Enyphanie Eν, T0, Holoformen, Zeitkorn → Non-Abelian Gauge Curvature Ω_int^𝒟 (Ch. 4)" },

    { id: "CL_V",    num: "V",    eqs: "SM 20–27",  col: "#9370DB", name: "Cluster V: Metroplexe & Area",      target: "(∞,1)-Topos 𝒳_syn & Coalgebra (ν𝒯, ζ)", info: "Cluster V (SM 20–27): Hypersyntrix ⁿM, Syntrokline Brücken, Telezentren → 𝒳_syn & Final Coalgebra ν𝒯 (Ch. 5–6)" },

    { id: "CL_VI",   num: "VI",   eqs: "SM 28–62",  col: "#FFD700", name: "Cluster VI: Continua & Cascades",   target: "Nuclear 𝒮(ℳ_n) & 36-Hermetry ²ḡ on R₆", info: "Cluster VI (SM 28–62): Quantitätssyntrix, Separation, Kondensor ³Γ, 36-Hermetry → Sobolev Apex ²ḡ_∞ (Ch. 7–9)" },

    { id: "CL_VII",  num: "VII",  eqs: "SM 63–83",  col: "#38bdf8", name: "Cluster VII: Metronic Calculus",    target: "Lattice 𝕄_τ^n & DEC (Ω_d^•, d_τ, *_τ)", info: "Cluster VII (SM 63–83): Metron τ, Differences ∇_i, Metronintegral 𝒮, Gauss–Stokes → DEC Cochains (Ch. 10)" },

    { id: "CL_VIII", num: "VIII", eqs: "SM 84–100a",col: "#4ade80", name: "Cluster VIII: Selectors & Matter",  target: "Sel Ψ = λΨ on K₈ & Mass m = m₀(L_p/L₁)∏λ_k", info: "Cluster VIII (SM 84–100a): Strukturkompressor ⁴ζ, Null-Stability ⁴F=0, Mass Formula → Spectral Selectors (Ch. 11)" }

  ];



  const STAGE_CAPTIONS = {

    1: "<b>Stage 1 (§14.1 — Master Translation Register):</b> All 8 Canonical Clusters (SM Eqs. 1–100a) mapped by Reconstruction Functor ℛ.",

    2: "<b>Stage 2 (§14.2 — Cluster I, SM 1–4):</b> Epistemology, Prädikatrix P_n, Dialektik D_n &amp; Quantoren → Sheaf Topos ℰ_syn = Sh(Ctx, J_syn).",

    3: "<b>Stage 3 (§14.3 — Cluster II, SM 5–9a):</b> Syntrix Triad, Spaltbarkeit &amp; Äondynen → Colored Banach Operad 𝒪_syn &amp; Beck Law λ̂.",

    4: "<b>Stage 4 (§14.4 — Cluster III, SM 10–13a):</b> Korporator 2×2 Matrix &amp; Konflexionsfeld → Banach Span Pushout P_a ⊞_φ P_b (15 Classes).",

    5: "<b>Stage 5 (§14.5 — Cluster IV, SM 14–19a):</b> Enyphanie Eν, T0, Holoformen &amp; Zeitkorn → Non-Abelian Gauge Curvature Ω_int^𝒟 &amp; BRST.",

    6: "<b>Stage 6 (§14.6 — Cluster V, SM 20–27):</b> Metroplexe ⁿM, Bridges &amp; Telezentren → Ambient (∞,1)-Topos 𝒳_syn &amp; Final Coalgebra (ν𝒯, ζ).",

    7: "<b>Stage 7 (§14.7 — Cluster VI, SM 28–62):</b> Continua R_n, Kondensor ³Γ &amp; Strukturkaskaden → Nuclear 𝒮(ℳ_n) &amp; 36-Component Hermetry ²ḡ.",

    8: "<b>Stage 8 (§14.8 — Cluster VII, SM 63–83):</b> Metron τ, Differences ∇_i &amp; Sums 𝒮 → Discrete Exterior Calculus (Ω_d^•(𝕄_τ^n), d_τ, *_τ).",

    9: "<b>Stage 9 (§14.9 — Cluster VIII, SM 84–100a):</b> Strukturkompressor ⁴ζ &amp; Null-Stability ⁴F=0 → Self-Adjoint Selectors &amp; PDG Mass Spectrum.",

    10: "<b>Stage 10 (§14.10–14.12 — 35-Term Lexicon &amp; 4 Asymptotic Limits):</b> Classical (τ→0), Boolean (ΔP→0), Abelian ([a_i,a_j]→0) &amp; Autonomous limits!"

  };



  const STAGE_TELEMETRY = {

    1: "ℛ : HeimCorpus(100 Eqs) → 9 Math Frameworks",

    2: "Cluster I (SM 1–4): MSC 18F20, 03B45 → Ch. 1",

    3: "Cluster II (SM 5–9a): MSC 18M60, 18M70 → Ch. 2",

    4: "Cluster III (SM 10–13a): MSC 18A30 → Ch. 3",

    5: "Cluster IV (SM 14–19a): MSC 53C07, 81T13 → Ch. 4",

    6: "Cluster V (SM 20–27): MSC 18N60, 18F10 → Ch. 5–6",

    7: "Cluster VI (SM 28–62): MSC 53B20, 58A10 → Ch. 7–9",

    8: "Cluster VII (SM 63–83): MSC 39A12, 52C22 → Ch. 10",

    9: "Cluster VIII (SM 84–100a): MSC 81V25 → Ch. 11 & App. B",

    10: "35 Canonical Terms | 4 Exact Degeneracy Limits"

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

  // RENDERER FOR STAGES 1–9 (8-CLUSTER CONCORDANCE RING + SPOTLIGHTED CLUSTER)

  // =========================================================================

  function renderConcordanceRing(w, h, stInt) {

    // stInt = 1: All 8 Clusters active; stInt = 2..9: Spotlight Cluster (stInt - 2)

    const activeIdx = (stInt >= 2 && stInt <= 9) ? (stInt - 2) : -1;



    // Central Modern Mathematical Synthesis Core

    const coreLbl = activeIdx >= 0 ? CLUSTERS[activeIdx].target : "Modern Topos / Operad / Gauge / DEC Core";

    const pCore = drawNode3D(

      "Core_R", 0, 0, 0.55, 12, "#FFD700", "#20B2AA", coreLbl,

      "Codomain of Reconstruction Functor ℛ : HeimCorpus(SM Eqs. 1–100a) → Modern Mathematics (Strata A/B/C)", w, h

    );



    // Outer Octagonal Ring of the 8 Canonical Equation Clusters

    const ringPts = [];

    CLUSTERS.forEach((cl, idx) => {

      const a = (idx / 8) * Math.PI * 2 + timeSec * 0.25;

      const isSpot = (activeIdx === -1 || activeIdx === idx);

      const rad = (activeIdx === idx) ? 1.15 : 1.32;

      const z = (activeIdx === idx) ? 0.15 : -0.55;

      const x = rad * Math.cos(a), y = rad * Math.sin(a);



      const pCl = drawNode3D(

        cl.id, x, y, z, isSpot ? 9.5 : 6.0,

        isSpot ? cl.col : "#334155", "#fff",

        `Cluster ${cl.num} (${cl.eqs})`, cl.info, w, h

      );

      ringPts.push({ p: pCl, x, y, z, col: cl.col, isSpot });



      // Functorial R-Translation Beam to Central Core

      drawLine3D(pCl, pCore, isSpot ? cl.col : "rgba(100,116,139,0.25)", isSpot ? 2.8 : 1.2, isSpot ? null : [3, 3]);



      // Animated Functorial Translation Packet along active beam(s)

      if (isSpot) {

        const s = (timeSec * 0.75 + idx * 0.125) % 1.0;

        const px = x * (1 - s), py = y * (1 - s), pz = z * (1 - s) + 0.55 * s;

        const pt = proj(px, py, pz, w, h);

        ctx.save();

        ctx.fillStyle = "#FFD700";

        ctx.beginPath();

        ctx.arc(pt.sx, pt.sy, 4.0, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();

      }

    });



    // Connect Octagonal Ring Perimeter

    for (let i = 0; i < 8; i++) {

      drawLine3D(ringPts[i].p, ringPts[(i + 1) % 8].p, "rgba(65,105,225,0.42)", 1.6);

    }

  }



  // Stage 10: 35-Term Ontological Lexicon Tree & 4 Asymptotic Degeneracy Reductions (§14.10–14.12)

  function renderStage10(w, h) {

    const pCenter = drawNode3D("Lex_Root", 0, 0, 0, 11.5, "#FFD700", "#fff", "35-Term Syntrometric Lexicon", "Complete Ontological Concordance & Asymptotic Degeneracy Reductions (§14.10–14.12)", w, h);

    const limits = [

      { id: "Lim_Class", x: -1.15, y: -0.75, z:  0.65, col: "#38bdf8", lbl: "1. Classical Limit (τ → 0)", info: "Metron area τ → 0: ∇_i → ∂_i and DEC complex Ω_d^• converges to smooth de Rham Ω^•(M)" },

      { id: "Lim_Bool",  x:  1.15, y: -0.75, z:  0.65, col: "#4169E1", lbl: "2. Boolean Limit (ΔP, ΔD → 0)", info: "Interval bands collapse to points: Heyting Ω(U) degenerates to Boolean {0, 1} (Tarskian logic)" },

      { id: "Lim_Abel",  x: -1.15, y:  0.75, z: -0.65, col: "#20B2AA", lbl: "3. Abelian Limit ([a_i, a_j] → 0)", info: "Commutators vanish: Interaction curvature Ω_int^𝒟 → 0 (Decoupled Maxwell electrodynamics)" },

      { id: "Lim_Auto",  x:  1.15, y:  0.75, z: -0.65, col: "#FFA500", lbl: "4. Autonomous Limit (ν𝒯 → const)", info: "Telecentric attractor decouples: Äondyne trajectories reduce to memoryless Markov chains" }

    ];

    limits.forEach(lm => {

      const pL = drawNode3D(lm.id, lm.x, lm.y, lm.z, 8.5, lm.col, "#fff", lm.lbl, lm.info, w, h);

      drawLine3D(pCenter, pL, lm.col, 2.8, [4, 2]);

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

    if (stInt <= 9) renderConcordanceRing(w, h, stInt);

    else renderStage10(w, h);



    requestAnimationFrame(renderLoop);

  }



  // UI & Slide Sync Controllers

  window.setCh14Stage = function(val, manual) {

    targetStage = Math.max(1.0, Math.min(10.0, parseFloat(val)));

    const stInt = Math.round(targetStage);



    const sl = document.getElementById('ch14-slider');

    if (sl && Math.abs(parseFloat(sl.value) - targetStage) > 0.02) sl.value = targetStage;



    const pill = document.getElementById('ch14-stage-pill');

    if (pill) pill.innerText = `Stage ${targetStage.toFixed(1)} / 10`;



    const cap = document.getElementById('ch14-caption');

    if (cap) cap.innerHTML = STAGE_CAPTIONS[stInt] || STAGE_CAPTIONS[1];



    const tel = document.getElementById('ch14-telemetry');

    if (tel) tel.innerText = STAGE_TELEMETRY[stInt] || STAGE_TELEMETRY[1];



    if (manual) {

      autoSync = false;

      const b = document.getElementById('ch14-btn-sync');

      if (b) { b.classList.remove('active'); b.innerText = "Manual"; }

    }

  };



  window.scrubCh14Stage = function(val) { window.setCh14Stage(val, true); };



  window.enableCh14Sync = function() {

    autoSync = true;

    const b = document.getElementById('ch14-btn-sync');

    if (b) { b.classList.add('active'); b.innerText = "Auto-Sync"; }

    syncCh14WithDeck();

  };



  window.toggleCh14Orbit = function() {

    autoOrbit = !autoOrbit;

    const b = document.getElementById('ch14-btn-orbit');

    if (b) b.classList.toggle('active', autoOrbit);

  };



  window.toggleCh14Spotlight = function() {

    const hud = document.getElementById('ch14-3d-hud');

    if (hud) {

      hud.classList.remove('minimized');

      hud.classList.toggle('spotlight');

      setTimeout(resize, 360);

    }

  };



  window.toggleCh14Minimize = function() {

    const hud = document.getElementById('ch14-3d-hud');

    const b = document.getElementById('ch14-btn-min');

    if (hud) {

      hud.classList.remove('spotlight');

      hud.classList.toggle('minimized');

      if (b) b.innerText = hud.classList.contains('minimized') ? "+" : "—";

      setTimeout(resize, 360);

    }

  };



  function syncCh14WithDeck() {
    if (!autoSync) return;
    const isMegaDeck = !!document.getElementById('syntrix-3d-hud') || document.querySelectorAll('h1').length > 5;
    const chHud = document.getElementById('ch14-3d-hud');
    if (isMegaDeck && chHud && window.Reveal && window.Reveal.getCurrentSlide) {
      const currentSlide = window.Reveal.getCurrentSlide();
      const inCh = currentSlide ? !!currentSlide.closest('#chapter-14, section[data-chapter="14"]') : true;
      chHud.style.display = inCh ? '' : 'none';
      if (!inCh) return;
    }
    const vp = document.querySelector('.reveal-viewport');

    const isScroll = vp && vp.classList.contains('reveal-scroll');

    if (isScroll) {

      const scEl = vp.scrollHeight > vp.clientHeight ? vp : document.documentElement;

      const top = vp.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;

      const max = Math.max(1, (scEl.scrollHeight || document.body.scrollHeight) - window.innerHeight);

      window.setCh14Stage(1.0 + Math.min(1, Math.max(0, top / max)) * 9.0, false);

    } else if (window.Reveal && typeof window.Reveal.getIndices === 'function') {

      const idx = window.Reveal.getIndices();

      const tot = Math.max(1, window.Reveal.getTotalSlides ? window.Reveal.getTotalSlides() : 12);

      const hIdx = (idx && typeof idx.h === 'number') ? idx.h : 0;

      const fOff = (idx && typeof idx.f === 'number' && idx.f >= 0) ? Math.min(0.45, (idx.f + 1) * 0.2) : 0;

      window.setCh14Stage(1.0 + ((hIdx + fOff) / Math.max(1, tot - 1)) * 9.0, false);

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

    const insp = document.getElementById('ch14-node-inspector');

    if (hit && insp) {

      selectedId = hit.id;

      insp.innerText = hit.info;

    } else if (insp) {

      selectedId = null;

      insp.innerText = "Drag to Orbit 3D · Click Cluster to Inspect";

    }

  });



  wrap.addEventListener('wheel', e => {

    e.preventDefault();

    e.stopPropagation();

    camZoom = Math.max(0.65, Math.min(2.0, camZoom - e.deltaY * 0.001));

  }, { passive: false });



  function init() {

    resize();

    syncCh14WithDeck();

    requestAnimationFrame(renderLoop);

    window.addEventListener('resize', resize);

    window.addEventListener('scroll', syncCh14WithDeck, { passive: true });

    const vp = document.querySelector('.reveal-viewport');

    if (vp) vp.addEventListener('scroll', syncCh14WithDeck, { passive: true });

    if (window.Reveal) {

      window.Reveal.on('ready', syncCh14WithDeck);

      window.Reveal.on('slidechanged', syncCh14WithDeck);

      window.Reveal.on('fragmentshown', syncCh14WithDeck);

      window.Reveal.on('fragmenthidden', syncCh14WithDeck);

    }

    const hud = document.getElementById('ch14-3d-hud');

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
    document.addEventListener('DOMContentLoaded', runCh14Engine);
  } else {
    runCh14Engine();
  }
})();
