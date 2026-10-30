/**
 * =========================================================================
 * SYNTROMETRIC MONOGRAPH WORKBENCH (CH 1–15 + APPENDICES A–E)
 * Live Slide-Synchronized Monograph PDF, Raw LaTeX & 100-Eq. Rosetta Register
 * Auto-Parses Syntrometric-Topos.tex for 380+ Theorems, Definitions & Lean 4
 * With Mobile-Optimized Real-Time LaTeX Math Rendering & Formula Inspector
 * Shortcut: Press 'M' on keyboard or click '📖 Monograph PDF & TeX'
 * =========================================================================
 */
(function() {
  if (window.__SYN_MONOGRAPH_WORKBENCH_LOADED__) return;
  window.__SYN_MONOGRAPH_WORKBENCH_LOADED__ = true;

  let rawTeXCache = null;
  let parsedTheorems = [];
  let parsedSMEquations = [];
  let currentPDFPage = 11;
  let activeTab = 'pdf';

  // 15 Chapters + 5 Appendices Exact LaTeX Anchors and PDF Base Pages
  const CHAPTER_PAGE_MAP = {
    front: { basePage: 1,   texAnchor: "\\chapter*{Preface & Reader's Guide}" },
    ch1:   { basePage: 11,  texAnchor: "\\label{chap:ch1}" },
    ch2:   { basePage: 34,  texAnchor: "\\label{chap:ch2}" },
    ch3:   { basePage: 56,  texAnchor: "\\label{chap:ch3}" },
    ch4:   { basePage: 78,  texAnchor: "\\label{chap:ch4}" },
    ch5:   { basePage: 102, texAnchor: "\\label{chap:ch5}" },
    ch6:   { basePage: 122, texAnchor: "\\label{chap:ch6}" },
    ch7:   { basePage: 142, texAnchor: "\\label{chap:ch7}" },
    ch8:   { basePage: 158, texAnchor: "\\label{chap:ch8}" },
    ch9:   { basePage: 174, texAnchor: "\\label{chap:ch9}" },
    ch10:  { basePage: 196, texAnchor: "\\label{chap:ch10}" },
    ch11:  { basePage: 216, texAnchor: "\\label{chap:ch11}" },
    ch12:  { basePage: 236, texAnchor: "\\label{chap:ch12}" },
    ch13:  { basePage: 262, texAnchor: "\\label{chap:ch13}" },
    ch14:  { basePage: 282, texAnchor: "\\label{chap:ch14}" },
    ch15:  { basePage: 308, texAnchor: "\\label{chap:ch15}" },
    appA:  { basePage: 320, texAnchor: "\\label{app:proof_theory_imsl}" },
    appB:  { basePage: 330, texAnchor: "\\label{app:mass_spectrum_validation}" },
    appC:  { basePage: 338, texAnchor: "\\label{app:lean4_blueprint}" },
    appD:  { basePage: 354, texAnchor: "\\label{app:computational_algorithms}" },
    appE:  { basePage: 360, texAnchor: "\\label{app:master_concordance}" }
  };

  // Comprehensive Syntrometric & Heim Historical Math Macros for MathJax
  const SYN_MATH_MACROS = Object.assign({}, (typeof window !== "undefined" && window.SYN_TEX_MACROS) || {}, {
  "syntrix": "\\mathbf{y}\\widetilde{\\mathbf{a}}",
  "homogeneoussyntrix": "\\mathbf{x}\\widetilde{\\mathbf{a}}",
  "metrophor": "\\widetilde{\\mathbf{a}}",
  "synkolator": "\\mathfrak{f}",
  "synkolationsstufe": "m",
  "syndrom": "F",
  "conceptualsyndrome": "a",
  "universalquantor": "\\mathbf{U}",
  "aspektivsystem": "P",
  "funktor": "\\mathbf{F}",
  "subjektiveraspekt": "S",
  "pradikatrix": "P_n",
  "dialektik": "D_n",
  "koordination": "K_n",
  "nullsyntrix": "\\mathbf{ys}\\widetilde{\\mathbf{c}}",
  "elementarstruktur": "\\mathbf{y}\\widetilde{\\mathbf{a}}_{(j)}",
  "konzenter": "\\text{Konzenter}",
  "exzenter": "\\text{Exzenter}",
  "konflexivsyntrix": "\\mathbf{y}\\widetilde{\\mathbf{c}}",
  "syntropode": "\\text{Syntropode}",
  "korporatorkette": "\\mathord{\\llcorner}",
  "enyphaniegrad": "g_E",
  "syntrixtotalitaet": "T_0",
  "generative": "G",
  "syntrixspeicher": "\\text{Syntrixspeicher}",
  "korporatorsimplex": "Q",
  "protyposis": "\\text{Protyposis}",
  "syntrixfeld": "\\text{Syntrixfeld}",
  "diskreteEnyphansyntrix": "\\mathbf{y}\\widetilde{\\mathbf{a}}",
  "kontinuierlicheEnyphansyntrix": "YC",
  "enyphane": "E",
  "syntrometrischesGebilde": "\\text{Gebilde}",
  "holoform": "\\text{Holoform}",
  "syntrixraum": "\\mathcal{M}_{\\text{syn}}",
  "syntrometrik": "g^{\\text{syn}}",
  "korporatorfeld": "\\mathbf{X}_{\\text{kor}}",
  "syntrixfunktor": "YF",
  "zeitkorn": "\\delta t_i",
  "affinitaetssyndrom": "S",
  "metroplexfont": [
    "\\mathbf{#1}",
    1
  ],
  "metroplex": [
    "\\overset{\\scriptscriptstyle #1}{\\mathbf{M}}",
    1
  ],
  "hypersyntrix": "\\overset{\\scriptscriptstyle 1}{\\mathbf{M}}",
  "hypermetrophor": [
    "{}^{#1}\\mathbf{w}\\widetilde{\\mathbf{a}}",
    1
  ],
  "metroplexsynkolator": [
    "{}^{#1}\\mathfrak{f}",
    1
  ],
  "nullmetroplex": [
    "{}^{#1}\\mathbf{M}_0",
    1
  ],
  "metroplextotalitaet": [
    "T_{#1}",
    1
  ],
  "metroplextotalitaetarg": [
    "T_{#1}",
    1
  ],
  "metroplexfunktor": "S",
  "metroplexfunktorcommand": "S",
  "syntroklinebruecke": [
    "{}^{#1}\\alpha",
    1
  ],
  "metroplexaeondyne": "\\text{Metroplex\u00e4ondyne}",
  "telezentrum": "T_z",
  "aeonischearea": "\\mathrm{AR}_q",
  "transzendenzstufe": [
    "C(#1)",
    1
  ],
  "transcendenzstufe": [
    "C(#1)",
    1
  ],
  "transzendenzsynkolator": "\\Gamma_i",
  "quantitaetsaspekt": "\\text{Quantit\u00e4tsaspekt}",
  "qualitaetsaspekt": "\\text{Qualit\u00e4tsaspekt}",
  "quantitaetssyntrix": "\\mathbf{y}\\mathbf{R}_n",
  "zahlenkoerper": "\\text{Zahlenk\u00f6rper}",
  "semantischermetrophor": "R_n",
  "semantischeriterator": "S_n",
  "funktionaloperator": "\\mathfrak{f}",
  "synkolatorraum": "\\text{Synkolatorraum}",
  "aeondynechaptereight": "\\widetilde{\\mathbf{a}}(x_i)_1^n",
  "kompositionsfeld": "{}^2\\bar{\\mathrm{g}}",
  "partialstruktur": [
    "{}^2\\mathbf{g}_{(#1)}",
    1
  ],
  "fundamentalkondensor": "{}^3\\mathbf{\\Gamma}",
  "korrelationstensor": "\\mathbf{f}",
  "koppelungstensor": "\\mathbf{Q}",
  "kaskadenstufe": "\\alpha",
  "metron": "\\tau",
  "metronischegitter": "\\text{Metronische Gitter}",
  "metrondifferential": "\\bar{\\delta}",
  "metronbar": "\\bar{\\delta}",
  "metrondelta": "\\nabla",
  "metronintegral": "\\mathrm{S}",
  "metronenfunktion": "\\phi(n)",
  "metronenziffer": "n",
  "metrischesieboperator": "S(\\gamma)",
  "strukturkompressor": "{}^4\\mathbf{\\zeta}",
  "metronischerstrukturkompressor": "{}^4\\mathbf{\\psi}",
  "metronisiertekondensor": [
    "{}^{#1}\\mathbf{F}",
    1
  ],
  "turnstilek": [
    "\\vdash^{#1}",
    1
  ],
  "modelsk": [
    "\\models^{#1}",
    1
  ],
  "dynboxgen": [
    "[#1]",
    1
  ],
  "dyndiamondgen": [
    "\\langle #1 \\rangle",
    1
  ],
  "kategorie": "\\mathbf{K}",
  "Ctx": "\\mathbf{Ctx}_{\\mathrm{adm}}^{\\mathrm{sk}}",
  "CtxPos": "\\mathbf{Ctx}_{>0}^{\\mathrm{sk}}",
  "Ctxadm": "\\mathbf{Ctx}_{\\mathrm{adm}}^{\\mathrm{sk}}",
  "Ctxquant": "\\mathbf{Ctx}_{\\mathrm{quant}}",
  "Ban": "\\mathbf{Ban}_{\\le 1}",
  "FinBan": "\\mathbf{FinBan}_{\\le 1}",
  "Esyn": "\\mathcal{E}_{\\mathrm{syn}}",
  "Jsyn": "J_{\\mathrm{syn}}",
  "Ksyn": "\\mathcal{K}_{\\mathrm{syn}}",
  "Xsyn": "\\mathcal{X}_{\\mathrm{syn}}",
  "Osyn": "\\mathcal{O}_{\\mathrm{syn}}",
  "otpi": "\\mathbin{\\widehat{\\otimes}_\\pi}",
  "Hol": "\\mathsf{Hol}",
  "Def": "\\operatorname{Def}",
  "Isom": "\\operatorname{Isom}",
  "Hom": "\\operatorname{Hom}",
  "Sub": "\\operatorname{Sub}",
  "Colim": "\\operatorname{colim}",
  "hocolim": "\\operatorname{hocolim}",
  "Spec": "\\operatorname{Spec}",
  "Div": "\\operatorname{div}",
  "Grad": "\\operatorname{grad}",
  "Rot": "\\operatorname{rot}",
  "Eq": "\\operatorname{Eq}",
  "id": "\\operatorname{id}",
  "rk": "\\operatorname{rk}",
  "Aut": "\\operatorname{Aut}",
  "Bil": "\\operatorname{Bil}",
  "Cov": "\\operatorname{Cov}",
  "Lie": "\\operatorname{Lie}",
  "Map": "\\operatorname{Map}",
  "IntCat": "\\operatorname{IntCat}",
  "PSh": "\\operatorname{PSh}",
  "Sh": "\\operatorname{Sh}",
  "Free": "\\operatorname{Free}",
  "Sym": "\\operatorname{Sym}",
  "Frag": "\\operatorname{Frag}",
  "Der": "\\operatorname{Der}",
  "Orb": "\\operatorname{Orb}",
  "Epi": "\\operatorname{Epi}",
  "Pro": "\\operatorname{Pro}",
  "LMSL": "\\mathcal{L}_{\\text{MSL}}",
  "WFFMSL": "\\text{WFF}_{\\mathcal{L}_{\\text{MSL}}}",
  "Smodx": "S_{\\text{mod}}(x)",
  "Smodarg": [
    "S_{\\text{mod}}(#1)",
    1
  ],
  "BoxS": "\\Box_S",
  "BoxSyn": "\\Box_{\\text{Syn}}",
  "DiaS": "\\Diamond_S",
  "Propk": [
    "\\text{Prop}_{#1}",
    1
  ],
  "Stabk": [
    "\\text{Stab}_{#1}",
    1
  ],
  "IGPk": [
    "\\text{IGP}_{#1}",
    1
  ],
  "Origink": [
    "\\text{Origin}_{#1}",
    1
  ],
  "fops": "F_{\\text{ops}}",
  "APS": "\\mathbf{AP}_S",
  "APZero": "\\mathbf{AP}_0",
  "APSigma": "\\mathbf{AP}_\\Sigma",
  "ProgZero": "\\mathbf{Prog}_0",
  "Kmax": "K_{\\text{max}}",
  "Mexp": "M_{\\text{exp}}",
  "piF": "\\pi_F",
  "MCS": "\\text{MCS}",
  "MCCT": "\\text{MCCT}",
  "Kor": "\\mathbf{Kor}",
  "polyquantor": [
    "\\mathop{\\mathsf{Q}}\\limits_{#2,#3}^{#4}\\!\\left(#1\\right)",
    4
  ],
  "quantor": [
    "\\mathsf{Q}\\left[#1\\right]",
    1
  ],
  "homogenesyntrix": [
    "\\mathsf{H}\\!\\left(#1\\right)",
    1
  ],
  "widemetroplex": [
    "\\mathsf{M}_{#2}\\!\\left(#1\\right)",
    2
  ],
  "syntroklinemetroplex": [
    "\\mathsf{B}_{#2}\\!\\left(#1\\right)",
    2
  ],
  "syntroklinekettenkoppelung": "\\mathsf{K}",
  "infinitesimalchainoperatorI": "\\mathop{\\mathrm{I}}",
  "predicatesymbol": "\\mathrel{\\models}",
  "supmedsubscript": [
    "{}^{#2}_{#1,#3}",
    3
  ],
  "prescript": [
    "{}^{#1}_{#2}{#3}",
    3
  ],
  "smformula": [
    "#1",
    1
  ],
  "xrightsquigarrow": [
    "\\overset{#1}{\\rightsquigarrow}",
    1
  ],
  "underrightarrow": [
    "\\overrightarrow{#1}",
    1
  ],
  "dbinom": [
    "\\binom{#1}{#2}",
    2
  ],
  "dfrac": [
    "\\frac{#1}{#2}",
    2
  ],
  "coloneqq": "\\mathrel{:=}",
  "Coloneqq": "\\mathrel{::=}",
  "centernot": [
    "\\not#1",
    1
  ],
  "llbracket": "\\mathopen{[\\mkern-3mu[}",
  "rrbracket": "\\mathclose{]\\mkern-3mu]}",
  "longhookrightarrow": "\\lhook\\joinrel\\longrightarrow",
  "sidx": [
    "",
    1
  ],
  "hidx": [
    "",
    2
  ],
  "nidx": [
    "",
    2
  ],
  "claimceiling": [
    "#2",
    2
  ],
  "carnapexplication": [
    "#5",
    5
  ],
  "vspacing": [
    "\\vphantom{\\sum}",
    0
  ],
  "ab": "\\mathrm{ab}"
});

  // Curated Highlights of the 100-Equation Master Register with exact LaTeX
  const FALLBACK_ROSETTA = [
    { eq: "SM Eq. 1 / SM-4", ch: "Ch 1", page: 15, tex: "eq:sm_4", d: "S \\equiv \\left\\lceil D_{nn} \\times K_n \\times P_{nn} \\right\\rceil \\equiv \\left\\lceil \\zeta_n,\\; \\left[\\begin{pmatrix} \\alpha \\\\ d \\\\ \\beta \\end{pmatrix}_{q}\\right]_n \\times \\dots \\right\\rceil", r: "Context \\(U = (D^U, P^U, C^U, K^U, z^U, \\zeta^U) \\in \\mathbf{Ctx}_{\\mathrm{adm}}^{\\mathrm{sk}}\\) with contraction \\(K^U : D^U \\widehat{\\otimes}_\\pi P^U \\to C^U\\)" },
    { eq: "SM Eq. 4", ch: "Ch 1", page: 17, tex: "prop:quantor_degeneration_hierarchy", d: "(\\cdot)_{\\rho}, \\polyquantor{A_\\rho}{\\underrightarrow{f_\\rho}}{1}{r}, (\\cdot)_\\rho \\quad (\\text{Polyquantor-Hierarchie})", r: "Product-slice Kripke–Joyal forcing \\(\\prod V_i \\Vdash \\phi\\) and right-adjoint universal quantifier \\(\\forall_f\\)" },
    { eq: "SM Eq. 5", ch: "Ch 2", page: 35, tex: "eq:heim_syntrix_eq5", d: "\\syntrix{\\metrophor{a}} \\equiv \\langle f, \\metrophor{a}, m\\rangle \\lor F_1 \\equiv f(a_k)_1^m \\quad (\\text{Syntrix Triad})", r: "Free algebra over completed colored Banach operad \\(\\mathcal{O}_{\\mathrm{syn}}\\) on profile \\((\\gamma,\\dots,\\gamma; \\gamma+1)\\)" },
    { eq: "SM Eq. 5a", ch: "Ch 2", page: 36, tex: "eq:heim_homogeneous_eq5a", d: "\\mathbf{x}\\syntrix{\\metrophor{a}} \\equiv \\langle\\langle f, \\metrophor{a}\\rangle m\\rangle \\quad (\\text{Homogeneous Syntrix & Spaltbarkeit})", r: "Boardman–Vogt tensor \\(\\mathcal{O}_{\\mathrm{pyr}} \\otimes_{\\mathrm{BV}} \\mathcal{O}_{\\mathrm{frag}}\\) and Beck Distributive Law \\(\\widehat{\\lambda} : \\overline{T}_{\\mathrm{pyr}} \\overline{T}_{\\mathrm{frag}} \\Rightarrow \\overline{T}_{\\mathrm{frag}} \\overline{T}_{\\mathrm{pyr}}\\)" },
    { eq: "SM Eq. 8", ch: "Ch 2", page: 37, tex: "def:piecewise_colored_operad", d: "(\\underline{f}, \\underline{m}) \\equiv \\int (f_\\gamma, m_\\gamma) \\quad (\\text{Komplexsynkolator})", r: "Piecewise-color filtered operad algebra with \\(m_K > \\dim F \\implies C(\\dim F, m_K) = 0\\)" },
    { eq: "SM Eqs. 9, 9a", ch: "Ch 2", page: 51, tex: "thm:aeondyne_fibration_strict", d: "\\underline{S} \\equiv \\langle f, (\\metrophor{a}), m\\rangle \\lor \\overline{S} \\equiv \\langle(f), \\metrophor{a}, m\\rangle", r: "Cartesian fiber section in Grothendieck fibration \\(\\pi : \\int_{\\mathbf{Ctx}} \\mathbf{Syn} \\to \\mathbf{Ctx}\\)" },
    { eq: "SM Eq. 11", ch: "Ch 3", page: 58, tex: "eq:original_universal_korporator_matrix_ch3", d: "\\begin{pmatrix} K_s & C_s \\\\ K_m & C_m \\end{pmatrix} \\quad (2 \\times 2 \\; \\text{Universal Korporator Matrix})", r: "Corporate pairing functor \\(\\mathbf{Kor}_{r,\\Sigma}\\): Span pushout \\(P_a \\boxplus_\\phi P_b\\) and 9 Mixed / 6 Pure classes" },
    { eq: "SM Eq. 11a", ch: "Ch 3", page: 59, tex: "prop:zero_object_syn", d: "\\mathbf{ys}\\,\\widetilde{c} \\equiv \\langle\\overline{f}\\,\\widetilde{c}\\,\\overline{m}\\rangle \\quad (\\text{Nullsyntrix})", r: "Initial & terminal zero object \\(0_{\\mathbf{Syn}} \\in \\mathrm{Obj}(\\mathbf{Syn})\\)" },
    { eq: "SM Eq. 13", ch: "Ch 3", page: 60, tex: "def:conflexivity_index", d: "\\mathbf{y}\\widetilde{a}_{\\mathrm{conf}} \\equiv \\prod_{i=1}^k \\mathbf{S}_i \\quad (\\text{Konflexivsyntrix})", r: "Tree colimit \\(\\varinjlim D\\) with Presentation Conflexivity Index \\(\\mathrm{ConfIndex}_{\\mathrm{pres}}(G_S) = |E_K| + 1\\)" },
    { eq: "SM Eq. 14", ch: "Ch 4", page: 79, tex: "thm:slice_site_equivalence_ch4", d: "G_{\\mathrm{gen}} \\equiv \\left[ P_i \\big\\vert_1^4 \\{\\dots\\}_{(j)} \\big\\vert_1^Q \\right] \\quad (\\text{Generative & 4D Syntrixtotalit\\\"at})", r: "Slice sheaf topos \\(\\mathrm{Sh}(\\mathbf{Ctx}_{/U_G}, J_{/U_G}) \\simeq \\mathcal{E}_{\\mathrm{syn}} / y(U_G)\\) over \\(P^{U_G} \\cong \\mathbb{R}^{12}\\)" },
    { eq: "SM Eqs. 16a, 17", ch: "Ch 4", page: 80, tex: "thm:relative_interaction_curvature_decomp", d: "E, \\; E^{-1}, \\; E_\\nu \\quad (\\text{Continuous Enyphane & Enyphanie})", r: "Boundary-tangent corner flow \\(\\Phi_t^X\\) and Non-Abelian Interaction Curvature \\(\\Omega_{\\mathrm{int}}^D = \\sum [a_i, a_j] + \\dots\\)" },
    { eq: "SM Eq. 18", ch: "Ch 4", page: 94, tex: "def:discrete_chronometry_clock_ch4", d: "\\mathrm{YF}(\\delta t_i) \\quad (\\text{Syntrixfunktor & Zeitkorn})", r: "Pushout endofunctor \\(\\mathrm{YF}_{\\mathrm{model}}(f) = B \\amalg_{C_0} f^{\\otimes r}\\) and discrete clock difference \\(\\delta t_n = \\tau(n+1) - \\tau(n)\\)" },
    { eq: "SM Eqs. 20--25a", ch: "Ch 5", page: 103, tex: "def:complete_segal_objects_ch5", d: "\\mathsf{M}^1, \\; \\mathsf{M}^n, \\; {}^{n+N}\\alpha \\quad (\\text{Hypersyntrix & Metroplex})", r: "Dendroidal Complete Segal Spaces \\(\\mathrm{dCSeg}(\\mathcal{X}_{\\mathrm{syn}})\\) and change-of-operad adjunction \\((\\phi)_! \\dashv (\\phi)^*\\)" },
    { eq: "SM Eq. 27", ch: "Ch 6", page: 123, tex: "thm:final_coalgebra_existence_ch6", d: "\\mathrm{AR}_q, \\; T_z \\quad (\\text{\\\"Aonische Area & Telezentrum})", r: "Final Telecentric Coalgebra \\((\\nu \\mathcal{T}, \\zeta \\cong)\\) via Lambek's Lemma and Lyapunov basin \\(\\dot{V} \\leq -\\gamma V\\)" },
    { eq: "SM Eqs. 28--35a", ch: "Ch 7--8", page: 144, tex: "thm:nuclear_variable_separation", d: "\\mathbf{y}R_n \\equiv \\langle f, R_n, m\\rangle \\quad (\\text{Quantit\\\"atssyntrix})", r: "Quantitative Topos \\(\\mathcal{E}_{\\mathrm{quant}}\\), Seeley extension \\(E^{(n)}\\) and Grothendieck nuclearity \\(\\mathcal{S}((\\mathbb{R}_{\\geq 0})^m)\\)" },
    { eq: "SM Eqs. 37, 53, 64", ch: "Ch 9", page: 182, tex: "def:hermetry_matrix_36", d: "{}^2\\bar{g} = {}^2\\bar{g}_+ + {}^2\\bar{g}_- \\quad (36\\text{-Component Hermetry})", r: "21 symmetric + 15 skew potentials on \\(R_6\\), Palatini \\(Q_{(\\mu\\gamma)}\\) and Sobolev fixed point \\({}^2\\bar{g}_\\infty\\)" },
    { eq: "SM Eqs. 67--80", ch: "Ch 10", page: 205, tex: "thm:discrete_leibniz_rules", d: "\\metrondelta\\varphi = \\varphi(n) - \\varphi(n-1), \\quad \\nabla(uv) = u\\nabla v + v\\nabla u - (\\nabla u)(\\nabla v), \\quad \\mathrm{S}", r: "Backward difference \\(\\nabla_i = I - E_i^{-1}\\), DEC \\(d_\\tau^2 \\equiv 0\\) and Finite Element Exterior Calculus" },
    { eq: "SM Eqs. 99, 100, 100a", ch: "Ch 11", page: 228, tex: "thm:mass_eigenvalue_formula_ch11", d: "{}^4\\zeta, \\quad {}^4F = 0, \\quad L_p = C(6,p) \\quad (\\text{Strukturkompressor & Masses})", r: "Self-adjoint selector spectrum on \\(K_8 = S^2 \\times \\mathbb{T}^6\\) across 63 channels fixing elementary particle masses" }
  ];

  const STYLES = `
/* =========================================================================
   UNIVERSAL MOBILE LATEX & MONOGRAPH WORKBENCH STYLING
   ========================================================================= */

/* =========================================================================
   SYN BOTTOM CONTROLS FLEX DOCK
   Flex-boxes the Monograph Drawer trigger and Animation HUDs/Buttons
   so they never collide or overlap on any device.
   ========================================================================= */
#syn-bottom-dock {
  position: fixed !important;
  pointer-events: none !important;
  z-index: 10000 !important;
  display: flex !important;
  box-sizing: border-box !important;
}

#syn-bottom-dock > * {
  pointer-events: auto !important;
}

#syn-monograph-fab {
  position: fixed;
  left: 20px;
  bottom: var(--syn-bottom-offset, 64px);
  background: linear-gradient(135deg, #111a2e 0%, #1e293b 100%);
  color: #FFD700;
  border: 1.5px solid #FFD700;
  border-radius: 10px;
  padding: 8px 14px;
  font-family: "Libertinus Sans", "Inter", system-ui, sans-serif;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.6px;
  cursor: pointer;
  z-index: 10000;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.75), 0 0 18px rgba(255, 215, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  user-select: none;
  box-sizing: border-box;
}

/* Mobile Viewports (<= 900px): Vertical Flexbox Column Dock */
@media (max-width: 900px) {
  #syn-bottom-dock {
    left: 8px !important;
    right: 8px !important;
    bottom: calc(var(--syn-bottom-offset, 8px) + env(safe-area-inset-bottom, 0px)) !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 6px !important;
    max-width: calc(100vw - 16px) !important;
  }

  #syn-bottom-dock #syn-monograph-fab {
    position: static !important;
    margin: 0 !important;
    align-self: flex-start !important;
    max-width: calc(100vw - 16px) !important;
    padding: 6px 11px !important;
    font-size: 11px !important;
    border-radius: 8px !important;
  }

  #syn-bottom-dock [id$="-3d-hud"],
  #syn-bottom-dock #syntrix-3d-hud,
  #syn-bottom-dock .anim-hud-tray,
  #syn-bottom-dock .animation-hud {
    position: static !important;
    margin: 0 !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    width: 100% !important;
    max-width: 100% !important;
  }
}

/* Desktop Viewports (>= 901px): Horizontal Flexbox with Desktop Taskbar Avoidance */
@media (min-width: 901px) {
  #syn-bottom-dock {
    left: 20px !important;
    right: 20px !important;
    bottom: var(--syn-bottom-offset, 64px) !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: flex-end !important;
    gap: 20px !important;
    transition: bottom 0.28s cubic-bezier(0.22, 1, 0.36, 1) !important;
  }

  #syn-bottom-dock #syn-monograph-fab {
    position: static !important;
    align-self: flex-end !important;
  }

  #syn-bottom-dock [id$="-3d-hud"],
  #syn-bottom-dock #syntrix-3d-hud,
  #syn-bottom-dock .anim-hud-tray,
  #syn-bottom-dock .animation-hud {
    position: static !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    width: auto !important;
    max-width: min(480px, 45vw) !important;
  }
}

/* Spotlight HUD centered on screen */
#syn-bottom-dock [id$="-3d-hud"].spotlight,
#syn-bottom-dock #syntrix-3d-hud.spotlight {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  bottom: auto !important;
  right: auto !important;
  z-index: 100005 !important;
}

/* When Monograph Drawer is OPEN: Hide bottom dock / animation HUD to avoid distraction */
body.mdrawer-open #syn-bottom-dock [id$="-3d-hud"],
body.mdrawer-open #syn-bottom-dock #syntrix-3d-hud,
body.mdrawer-open #syn-bottom-dock .anim-hud-tray,
body.mdrawer-open [id$="-3d-hud"],
body.mdrawer-open #syntrix-3d-hud,
body.mdrawer-open .anim-hud-tray {
  opacity: 0 !important;
  pointer-events: none !important;
  visibility: hidden !important;
}

/* Dynamic Avoidance of Windows System Tray & Taskbar for Desktop Trays */
@media (min-width: 901px) {
  #syn-monograph-fab {
    bottom: var(--syn-bottom-offset, 64px) !important;
    transition: bottom 0.28s cubic-bezier(0.22, 1, 0.36, 1), transform 0.2s ease, background 0.2s ease !important;
  }
  
  [id$="-3d-hud"],
  #syntrix-3d-hud,
  .anim-hud-tray,
  .animation-hud {
    bottom: var(--syn-bottom-offset, 64px) !important;
    max-height: calc(100vh - var(--syn-bottom-offset, 64px) - 32px) !important;
    transition: bottom 0.28s cubic-bezier(0.22, 1, 0.36, 1), width 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1) !important;
  }

  [id$="-3d-hud"].spotlight,
  #syntrix-3d-hud.spotlight {
    bottom: 50% !important;
  }
}

#syn-monograph-fab:hover {
  background: #FFD700;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
}

#syn-monograph-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: min(880px, 96vw);
  height: 100vh;
  height: 100dvh;
  max-height: 100dvh;
  background: linear-gradient(160deg, rgba(7, 10, 18, 0.98) 0%, rgba(13, 19, 34, 0.99) 100%);
  border-right: 2px solid #FFD700;
  box-shadow: 20px 0 65px rgba(0, 0, 0, 0.92);
  z-index: 100001 !important;
  transform: translateX(-104%);
  transition: transform 0.36s cubic-bezier(0.22, 1, 0.36, 1);
  display: flex;
  flex-direction: column;
  font-family: "Libertinus Sans", "Inter", system-ui, sans-serif;
  color: #e8ecf2;
  box-sizing: border-box;
}

#syn-monograph-drawer.open {
  transform: translateX(0);
}

.mdrawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px;
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(65, 105, 225, 0.45);
  flex-wrap: wrap;
  gap: 8px;
  box-sizing: border-box;
}

.mdrawer-title {
  font-size: 13.5px;
  font-weight: 800;
  color: #FFD700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mdrawer-tabs {
  display: flex;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(10, 14, 24, 0.92);
  border-bottom: 1px solid #2d3748;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.mdrawer-tab {
  background: #162032;
  color: #94a3b8;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 5px 11px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.mdrawer-tab.active, .mdrawer-tab:hover {
  background: rgba(65, 105, 225, 0.32);
  color: #FFD700;
  border-color: #FFD700;
}

.mdrawer-body {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.mdrawer-pane {
  display: none;
  width: 100%;
  height: 100%;
  flex-direction: column;
  min-height: 0;
}

.mdrawer-pane.active {
  display: flex;
}

#monograph-pdf-frame {
  width: 100%;
  flex: 1;
  border: none;
  background: #090d16;
}

.tex-toolbar {
  display: flex;
  gap: 8px;
  padding: 9px 14px;
  background: #0d1322;
  border-bottom: 1px solid #2d3748;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.tex-search-input, .chapter-jump-select {
  background: #070a12;
  color: #e8ecf2;
  border: 1px solid #3b4963;
  border-radius: 6px;
  padding: 6px 10px;
  font-family: "Libertinus Mono", "Fira Code", monospace;
  font-size: 11.5px;
}

.tex-search-input {
  flex: 1;
  min-width: 180px;
}

.chapter-jump-select {
  max-width: 320px;
}

#monograph-tex-viewer {
  flex: 1;
  margin: 0;
  padding: 16px;
  overflow-y: auto;
  background: #070a12;
  color: #cbd5e1;
  font-family: "Libertinus Mono", "Fira Code", "Courier New", monospace;
  font-size: 11.8px;
  line-height: 1.52;
  white-space: pre-wrap;
  word-break: break-word;
}

.rosetta-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
}

.rosetta-card {
  background: rgba(15, 23, 42, 0.90);
  border: 1px solid #334155;
  border-left: 4px solid #4169E1;
  border-radius: 8px;
  padding: 11px 14px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}

.rosetta-card:hover {
  border-color: #FFD700;
  background: rgba(22, 33, 58, 0.94);
  transform: translateX(2px);
}

/* Formula Containers with High-Performance Mobile Horizontal Scroll */
.rosetta-formula-box {
  margin: 4px 0;
  padding: 8px 11px;
  background: rgba(6, 9, 16, 0.88);
  border: 1px solid rgba(65, 105, 225, 0.35);
  border-radius: 6px;
  box-sizing: border-box;
  max-width: 100%;
}

.rosetta-formula-label {
  font-size: 9.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #FFD700;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rosetta-formula-math {
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  padding: 4px 0 6px 0;
  font-size: 13.5px;
  color: #f8fafc;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 215, 0, 0.4) transparent;
}

.rosetta-formula-math::-webkit-scrollbar,
.thm-math-preview::-webkit-scrollbar {
  height: 3px;
}
.rosetta-formula-math::-webkit-scrollbar-thumb,
.thm-math-preview::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.5);
  border-radius: 3px;
}

.rosetta-recon-box {
  font-size: 11.8px;
  color: #5eead4;
  line-height: 1.46;
  padding-top: 2px;
}

.thm-math-preview {
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  padding: 4px 0 6px 0;
  font-size: 12.2px;
  color: #cbd5e1;
  line-height: 1.48;
}

.thm-code-block {
  margin: 4px 0 0 0;
  padding: 7px 10px;
  background: #05070d;
  border: 1px solid #1e293b;
  border-radius: 5px;
  font-family: "Libertinus Mono", "Fira Code", monospace;
  font-size: 11px;
  color: #a78bfa;
  overflow-x: auto;
  max-width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
}

.m3d-btn {
  background: #162032;
  color: #e8ecf2;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s ease;
  text-decoration: none;
  user-select: none;
}

.m3d-btn:hover {
  background: rgba(65, 105, 225, 0.35);
  border-color: #FFD700;
  color: #FFD700;
}

.tex-peek-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid #334155;
  border-radius: 4px;
  color: #94a3b8;
  padding: 1px 6px;
  font-size: 9.5px;
  font-family: "Libertinus Mono", monospace;
  cursor: pointer;
  transition: all 0.12s ease;
}
.tex-peek-btn:hover {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}

.pdf-cite-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 215, 0, 0.14);
  border: 1px solid #FFD700;
  color: #FFD700;
  border-radius: 4px;
  padding: 2px 7px;
  font-size: 0.72em;
  font-weight: 700;
  cursor: pointer;
  vertical-align: middle;
  transition: all 0.15s ease;
  user-select: none;
}

.pdf-cite-badge:hover {
  background: #FFD700;
  color: #000;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.35);
}

/* =========================================================================
   MOBILE LATEX DISPLAY OPTIMIZATION RULES (MATCHES REVEAL & CARDS)
   ========================================================================= */

.rosetta-card mjx-container[display="true"],
.thm-card mjx-container[display="true"],
.rosetta-formula-math mjx-container {
  max-width: 100% !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  -webkit-overflow-scrolling: touch !important;
  touch-action: pan-x pan-y !important;
  padding: 4px 2px !important;
  margin: 6px 0 !important;
  box-sizing: border-box !important;
  scrollbar-width: thin !important;
  scrollbar-color: rgba(255, 215, 0, 0.4) transparent !important;
}

@media (max-width: 768px) {
  #syn-monograph-fab {
    left: 10px;
    bottom: 10px;
    padding: 6px 10px;
    font-size: 11px;
    max-width: 48vw;
  }
  #syn-monograph-drawer {
    width: 100vw;
  }
  .mdrawer-header {
    padding: 8px 10px;
  }
  .chapter-jump-select {
    max-width: 190px;
    font-size: 10.5px;
  }
  .tex-search-input {
    min-width: 130px;
  }
  .rosetta-formula-math {
    font-size: 12px;
  }
  .thm-math-preview {
    font-size: 11.5px;
  }
  .rosetta-card {
    padding: 9px 11px;
  }
  .rosetta-list {
    padding: 8px 10px;
    gap: 8px;
  }
  .reveal .MathJax_Display,
  .reveal mjx-container[display="true"],
  .reveal-viewport.reveal-scroll .MathJax_Display,
  .reveal-viewport.reveal-scroll mjx-container[display="true"] {
    font-size: 0.84em !important;
  }
  .reveal mjx-container:not([display="true"]),
  .reveal-viewport.reveal-scroll mjx-container:not([display="true"]) {
    font-size: 0.90em !important;
  }
}

@media (max-width: 480px) {
  .reveal .MathJax_Display,
  .reveal mjx-container[display="true"],
  .reveal-viewport.reveal-scroll .MathJax_Display,
  .reveal-viewport.reveal-scroll mjx-container[display="true"] {
    font-size: 0.76em !important;
  }
  .reveal mjx-container:not([display="true"]),
  .reveal-viewport.reveal-scroll mjx-container:not([display="true"]) {
    font-size: 0.84em !important;
  }
  .rosetta-formula-math {
    font-size: 11px;
  }
}
`;

  const DRAWER_HTML = `
<!-- Floating Launcher Button (Bottom-Left) -->
<button id="syn-monograph-fab" data-prevent-swipe="true" onclick="window.toggleMonographDrawer()" title="Open Synchronized Monograph PDF, Raw TeX & 100-Equation Rosetta Register (Shortcut: M)">
  <span>📖 Monograph PDF &amp; TeX</span>
  <span id="fab-page-pill" style="background:#4169E1; color:#fff; padding:1px 6px; border-radius:4px; font-size:10.5px;">p. 11</span>
</button>

<!-- Slide-Over Monograph & TeX Workbench Drawer -->
<div id="syn-monograph-drawer" data-prevent-swipe="true" aria-label="Monograph Workbench Drawer">
  <div class="mdrawer-header">
    <div class="mdrawer-title">
      <span>🏛️ Syntrometric Monograph Workbench</span>
      <span id="mdrawer-sync-badge" style="background:rgba(32,178,170,0.2); border:1px solid #20B2AA; color:#5eead4; padding:2px 8px; border-radius:4px; font-size:11px;">
        Ch. 1–15 + App. A–E
      </span>
    </div>
    <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
      <select id="monograph-chapter-select" class="chapter-jump-select" onchange="window.jumpToMonographChapter(this.value)">
        <option value="front">Frontmatter &amp; Aufbau Tree (p. 1)</option>
        <option value="ch1" selected>Ch. 1: Topos of Subjective Experience (p. 11)</option>
        <option value="ch2">Ch. 2: The Syntrix Architecture (p. 34)</option>
        <option value="ch3">Ch. 3: Syntrixkorporationen (p. 56)</option>
        <option value="ch4">Ch. 4: Enyphansyntrizen &amp; Gauge Curvature (p. 78)</option>
        <option value="ch5">Ch. 5: Metroplextheorie &amp; (∞,1)-Topos (p. 102)</option>
        <option value="ch6">Ch. 6: Die televariante äonische Area (p. 122)</option>
        <option value="ch7">Ch. 7: Anthropomorphic Syntrometry (p. 142)</option>
        <option value="ch8">Ch. 8: Syntrometrie über dem Quantitätsaspekt (p. 158)</option>
        <option value="ch9">Ch. 9: Strukturkaskaden &amp; 36-Hermetry (p. 174)</option>
        <option value="ch10">Ch. 10: Metronische Elementaroperationen (p. 196)</option>
        <option value="ch11">Ch. 11: Metrische Selektortheorie &amp; Masses (p. 216)</option>
        <option value="ch12">Ch. 12: Representational Discontinuity (p. 236)</option>
        <option value="ch13">Ch. 13: Qualia Geometry, Lawvere &amp; Φ_topos (p. 262)</option>
        <option value="ch14">Ch. 14: Synthese &amp; 100-Eq. Register (p. 282)</option>
        <option value="ch15">Ch. 15: Conclusion &amp; Conjectures (p. 308)</option>
        <option value="appA">App. A: Proof Theory &amp; Cut Elimination (p. 320)</option>
        <option value="appB">App. B: DESY Mass Validation &amp; Geodesics (p. 330)</option>
        <option value="appC">App. C: Lean 4 Formalization Blueprint (p. 338)</option>
        <option value="appD">App. D: Solvers &amp; Python/SymPy Sandbox (p. 354)</option>
        <option value="appE">App. E: Master Equation Concordance (p. 360)</option>
      </select>
      <a id="monograph-pdf-link" href="Syntrometric-Topos.pdf" target="_blank" class="m3d-btn" style="text-decoration:none;">↗ PDF</a>
      <a id="monograph-tex-link" href="Syntrometric-Topos.tex" download class="m3d-btn" style="text-decoration:none;">⬇ .tex</a>
      <button class="m3d-btn" onclick="window.toggleMonographDrawer()" style="background:#DC143C; color:#fff; border-color:#DC143C;">✕</button>
    </div>
  </div>

  <div class="mdrawer-tabs">
    <button class="mdrawer-tab active" id="mtab-pdf" onclick="window.switchMonographTab('pdf')">📄 Compiled PDF</button>
    <button class="mdrawer-tab" id="mtab-tex" onclick="window.switchMonographTab('tex')">📜 Raw LaTeX (.tex)</button>
    <button class="mdrawer-tab" id="mtab-thm" onclick="window.switchMonographTab('thm')">📐 Theorems &amp; Lean 4 Index</button>
    <button class="mdrawer-tab" id="mtab-rosetta" onclick="window.switchMonographTab('rosetta')">🔍 100-Eq. Rosetta Stone</button>
    <div style="margin-left:auto; display:flex; align-items:center; gap:5px; font-size:11.5px;">
      <span>PDF Page:</span>
      <input type="number" id="pdf-page-input" min="1" max="380" value="11" style="width:56px; background:#070a12; color:#FFD700; border:1px solid #4169E1; border-radius:4px; padding:2px 5px; font-weight:bold;" onchange="window.jumpToPDFPage(this.value)">
    </div>
  </div>

  <div class="mdrawer-body">
    <!-- PANE 1: Synchronized Embedded PDF -->
    <div class="mdrawer-pane active" id="mpane-pdf">
      <iframe id="monograph-pdf-frame" src="Syntrometric-Topos.pdf#page=11&view=FitH"></iframe>
    </div>

    <!-- PANE 2: Live Raw LaTeX Source Explorer -->
    <div class="mdrawer-pane" id="mpane-tex">
      <div class="tex-toolbar">
        <input type="text" id="tex-search-box" class="tex-search-input" placeholder="Search Syntrometric-Topos.tex (e.g., thm:exact_descent_holoform, zombie_impossibility, \\SyntrometricSequentCalculus)..." oninput="window.debounceTeXSearch(this.value)">
        <button class="m3d-btn" onclick="window.copyCurrentTeXSnippet()">📋 Copy TeX</button>
      </div>
      <pre id="monograph-tex-viewer">Loading Syntrometric-Topos.tex source...</pre>
    </div>

    <!-- PANE 3: Auto-Extracted Theorem, Definition & Lean 4 Index -->
    <div class="mdrawer-pane" id="mpane-thm">
      <div class="tex-toolbar">
        <input type="text" id="thm-search" class="tex-search-input" placeholder="Filter 380+ Theorems, Definitions, Scholia & Lean 4 blocks (with rendered LaTeX math)..." oninput="window.debounceTheoremSearch(this.value)">
      </div>
      <div class="rosetta-list" id="thm-cards-container"></div>
    </div>

    <!-- PANE 4: Interactive 100-Equation Rosetta Register -->
    <div class="mdrawer-pane" id="mpane-rosetta">
      <div class="tex-toolbar">
        <input type="text" id="rosetta-search" class="tex-search-input" placeholder="Filter all SM Equations 1–100a with live rendered math (e.g., SM Eq. 1, SM Eq. 11, Hermetry)..." oninput="window.debounceRosettaSearch(this.value)">
      </div>
      <div class="rosetta-list" id="rosetta-cards-container"></div>
    </div>
  </div>
</div>
`;

  // Dynamic MathJax Availability & Safe Typesetting Queue Guard
  const typesetQueue = new Set();
  let typesetDraining = false;
  let mathJaxLoading = false;
  const mathJaxCallbacks = [];

  // Pre-configure MathJax immediately with all 179 syntrometric macros before any script loads
  window.MathJax = window.MathJax || {};
  window.MathJax.tex = window.MathJax.tex || {};
  window.MathJax.tex.inlineMath = window.MathJax.tex.inlineMath || [['$', '$'], ['\(', '\)']];
  window.MathJax.tex.displayMath = window.MathJax.tex.displayMath || [['', ''], ['\[', '\]']];
  window.MathJax.tex.processEscapes = true;
  window.MathJax.tex.macros = Object.assign(window.MathJax.tex.macros || {}, SYN_MATH_MACROS);
  window.MathJax.chtml = window.MathJax.chtml || { scale: 0.95 };

  function registerRuntimeMacros() {
    if (typeof window === 'undefined' || !window.MathJax) return;
    if (window.MathJax.config && window.MathJax.config.tex) {
      window.MathJax.config.tex.macros = Object.assign(window.MathJax.config.tex.macros || {}, SYN_MATH_MACROS);
    }
    if (window.MathJax.tex) {
      window.MathJax.tex.macros = Object.assign(window.MathJax.tex.macros || {}, SYN_MATH_MACROS);
    }
    try {
      const doc = window.MathJax.startup && window.MathJax.startup.document;
      if (doc && doc.inputJax) {
        const texJax = doc.inputJax.find(j => j.name === 'tex');
        if (texJax && texJax.parseOptions && texJax.parseOptions.options) {
          texJax.parseOptions.options.macros = Object.assign(texJax.parseOptions.options.macros || {}, SYN_MATH_MACROS);
          const cm = window.MathJax._ && window.MathJax._.input && window.MathJax._.input.tex &&
                     window.MathJax._.input.tex.configmacros &&
                     window.MathJax._.input.tex.configmacros.ConfigMacrosConfiguration &&
                     (window.MathJax._.input.tex.configmacros.ConfigMacrosConfiguration.ConfigMacrosConfiguration ||
                      window.MathJax._.input.tex.configmacros.ConfigMacrosConfiguration);
          if (cm && typeof cm.config === 'function') {
            cm.config({}, texJax);
          }
        }
      }
    } catch (e) {}
  }

  function ensureMathJaxAvailable(callback) {
    registerRuntimeMacros();

    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      if (callback) setTimeout(callback, 0);
      return;
    }
    if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
      window.MathJax.startup.promise.then(() => {
        registerRuntimeMacros();
        if (callback) setTimeout(callback, 0);
      }).catch(() => {
        if (callback) setTimeout(callback, 0);
      });
      return;
    }
    if (callback) mathJaxCallbacks.push(callback);
    if (mathJaxLoading) return;
    mathJaxLoading = true;

    // If no MathJax script tag exists in document, inject mathjax@3 production build immediately!
    if (!document.getElementById('syn-monograph-mathjax') && !document.getElementById('mathjax-script')) {
      window.MathJax = window.MathJax || {};
      window.MathJax.tex = window.MathJax.tex || {};
      window.MathJax.tex.inlineMath = window.MathJax.tex.inlineMath || [['$', '$'], ['\(', '\)']];
      window.MathJax.tex.displayMath = window.MathJax.tex.displayMath || [['', ''], ['\[', '\]']];
      window.MathJax.tex.processEscapes = true;
      window.MathJax.tex.macros = Object.assign(window.MathJax.tex.macros || {}, SYN_MATH_MACROS);
      window.MathJax.chtml = window.MathJax.chtml || { scale: 0.95 };

      const script = document.createElement('script');
      script.id = 'syn-monograph-mathjax';
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
      script.async = true;
      script.onload = () => {
        const flush = () => {
          registerRuntimeMacros();
          mathJaxLoading = false;
          while (mathJaxCallbacks.length > 0) {
            const cb = mathJaxCallbacks.shift();
            try { cb(); } catch (e) {}
          }
        };
        if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
          window.MathJax.startup.promise.then(flush).catch(flush);
        } else {
          flush();
        }
      };
      document.head.appendChild(script);
      return;
    }

    // Otherwise, check for existing page MathJax to finish startup
    let attempts = 0;
    const checker = setInterval(() => {
      attempts++;
      if (window.MathJax && (typeof window.MathJax.typesetPromise === 'function' || (window.MathJax.startup && window.MathJax.startup.promise))) {
        clearInterval(checker);
        mathJaxLoading = false;
        const flush = () => {
          registerRuntimeMacros();
          while (mathJaxCallbacks.length > 0) {
            const cb = mathJaxCallbacks.shift();
            try { cb(); } catch (e) {}
          }
        };
        if (window.MathJax.startup && window.MathJax.startup.promise) {
          window.MathJax.startup.promise.then(flush).catch(flush);
        } else {
          flush();
        }
        return;
      }
      if (attempts > 30) {
        clearInterval(checker);
        mathJaxLoading = false;
      }
    }, 50);
  }

  function safeTypeset(element) {
    if (!element) return;
    typesetQueue.add(element);
    scheduleTypesetDrain();
  }

  function scheduleTypesetDrain() {
    if (typesetDraining) return;
    setTimeout(drainTypesetQueue, 35);
  }

  function drainTypesetQueue() {
    if (typesetDraining || typesetQueue.size === 0) return;

    if (!window.MathJax || (!window.MathJax.typesetPromise && (!window.MathJax.startup || !window.MathJax.startup.promise))) {
      ensureMathJaxAvailable(() => scheduleTypesetDrain());
      return;
    }

    const elements = Array.from(typesetQueue);
    typesetQueue.clear();
    typesetDraining = true;

    const runPromise = (window.MathJax.startup && window.MathJax.startup.promise)
      ? window.MathJax.startup.promise
      : Promise.resolve();

    runPromise.then(() => {
      registerRuntimeMacros();
      if (typeof window.MathJax.typesetPromise === 'function') {
        try {
          if (typeof window.MathJax.typesetClear === 'function') {
            window.MathJax.typesetClear(elements);
          }
        } catch (e) {}
        return window.MathJax.typesetPromise(elements);
      }
    }).catch(err => {
      // Non-fatal typesetting warning
    }).finally(() => {
      typesetDraining = false;
      if (typesetQueue.size > 0) {
        setTimeout(drainTypesetQueue, 35);
      }
    });
  }

  // Pre-register all syntrometric macros into existing MathJax instance if already loaded
  registerRuntimeMacros();

  function ensureBottomDock() {
    let dock = document.getElementById('syn-bottom-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.id = 'syn-bottom-dock';
      dock.setAttribute('data-prevent-swipe', 'true');
      document.body.appendChild(dock);
    }
    return dock;
  }

  function dockAnimationHUDs() {
    const dock = document.getElementById('syn-bottom-dock');
    if (!dock) return;
    const huds = document.querySelectorAll('[id$="-3d-hud"], #syntrix-3d-hud, .anim-hud-tray, .animation-hud');
    huds.forEach(hud => {
      if (hud && hud.parentElement !== dock) {
        dock.appendChild(hud);
      }
    });
  }

  function injectDOM() {
    // 1. If running inside an iframe whose parent already has the monograph workbench,
    // do NOT inject a duplicate drawer or FAB inside the iframe.
    try {
      if (window.parent && window.parent !== window && window.parent.document) {
        if (window.parent.document.getElementById('syn-monograph-drawer') || window.parent.document.getElementById('syn-monograph-fab')) {
          window.toggleMonographDrawer = function() {
            if (typeof window.parent.toggleMonographDrawer === 'function') {
              window.parent.toggleMonographDrawer();
            }
          };
          window.openMonographAtPage = function(page, query) {
            if (typeof window.parent.openMonographAtPage === 'function') {
              window.parent.openMonographAtPage(page, query);
            }
          };
          return;
        }
      }
    } catch (e) {}

    // 2. Strict deduplication guard: eliminate any duplicate drawers or FABs in DOM
    const existingDrawers = document.querySelectorAll('#syn-monograph-drawer');
    if (existingDrawers.length > 1) {
      for (let i = 1; i < existingDrawers.length; i++) existingDrawers[i].remove();
    }
    const existingFabs = document.querySelectorAll('#syn-monograph-fab');
    if (existingFabs.length > 1) {
      for (let i = 1; i < existingFabs.length; i++) existingFabs[i].remove();
    }
    const existingMounts = document.querySelectorAll('#syn-monograph-mount');
    if (existingMounts.length > 1) {
      for (let i = 1; i < existingMounts.length; i++) existingMounts[i].remove();
    }

    if (document.getElementById('syn-monograph-drawer')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'syn-monograph-style';
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);

    const dock = ensureBottomDock();

    const container = document.createElement('div');
    container.id = 'syn-monograph-mount';
    container.innerHTML = DRAWER_HTML;
    document.body.appendChild(container);

    // Place the FAB inside the bottom dock so flexbox coordinates it with animation HUDs
    const fab = document.getElementById('syn-monograph-fab');
    if (fab && dock) {
      dock.insertBefore(fab, dock.firstChild);
    }

    // Dock existing animation HUDs and watch for dynamically injected ones
    dockAnimationHUDs();
    if ('MutationObserver' in window) {
      const obs = new MutationObserver(() => dockAnimationHUDs());
      obs.observe(document.body, { childList: true, subtree: false });
    }

    // Stop propagation on inputs inside drawer so Reveal doesn't capture keystrokes
    const dr = document.getElementById('syn-monograph-drawer');
    if (dr) {
      dr.querySelectorAll('input, button, select, pre').forEach(el => {
        el.addEventListener('keydown', e => e.stopPropagation());
        el.addEventListener('keyup', e => e.stopPropagation());
        el.addEventListener('keypress', e => e.stopPropagation());
      });
    }

    // Attach click listeners to any .pdf-cite-badge elements present on slide
    document.querySelectorAll('.pdf-cite-badge').forEach(badge => {
      badge.addEventListener('click', e => {
        const page = badge.getAttribute('data-pdf-page') || parseInt(badge.innerText.match(/p\.\s*(\d+)/i)?.[1] || 11);
        const query = badge.getAttribute('data-tex-label') || badge.getAttribute('data-tex-query') || '';
        window.openMonographAtPage(page, query);
      });
    });
  }

  window.toggleMonographDrawer = function() {
    if (window.parent && window.parent !== window && typeof window.parent.toggleMonographDrawer === 'function') {
      window.parent.toggleMonographDrawer();
      return;
    }
    const dr = document.getElementById('syn-monograph-drawer');
    if (dr) {
      const willOpen = !dr.classList.contains('open');
      dr.classList.toggle('open', willOpen);
      document.body.classList.toggle('mdrawer-open', willOpen);
      if (willOpen) {
        if (!rawTeXCache) {
          loadRawTeXFile();
        } else {
          if (activeTab === 'rosetta') window.filterRosettaRegister("");
          else if (activeTab === 'thm') window.filterTheoremIndex("");
        }
      }
    }
  };

  window.switchMonographTab = function(tab) {
    activeTab = tab;
    ['pdf', 'tex', 'thm', 'rosetta'].forEach(t => {
      document.getElementById('mtab-' + t)?.classList.toggle('active', t === tab);
      document.getElementById('mpane-' + t)?.classList.toggle('active', t === tab);
    });
    if (!rawTeXCache) {
      loadRawTeXFile();
    } else {
      if (tab === 'rosetta') {
        const cont = document.getElementById('rosetta-cards-container');
        safeTypeset(cont);
      } else if (tab === 'thm') {
        const cont = document.getElementById('thm-cards-container');
        safeTypeset(cont);
      }
    }
  };

  window.jumpToPDFPage = function(pageNum) {
    currentPDFPage = Math.max(1, parseInt(pageNum) || 1);
    const inp = document.getElementById('pdf-page-input');
    if (inp) inp.value = currentPDFPage;
    const pill = document.getElementById('fab-page-pill');
    if (pill) pill.innerText = `p. ${currentPDFPage}`;
    const frame = document.getElementById('monograph-pdf-frame');
    if (frame) {
      const currentSrc = frame.getAttribute('src') || 'Syntrometric-Topos.pdf';
      const baseSrc = currentSrc.split('#')[0];
      frame.src = `${baseSrc}#page=${currentPDFPage}&view=FitH`;
    }
  };

  window.jumpToMonographChapter = function(chKey) {
    const entry = CHAPTER_PAGE_MAP[chKey];
    if (!entry) return;
    window.jumpToPDFPage(entry.basePage);
    if (rawTeXCache) {
      showTeXAtAnchor(entry.texAnchor);
    } else {
      loadRawTeXFile().then(() => showTeXAtAnchor(entry.texAnchor));
    }
  };

  window.openMonographAtPage = function(pageNum, texQuery) {
    const dr = document.getElementById('syn-monograph-drawer');
    if (dr && !dr.classList.contains('open')) dr.classList.add('open');
    if (pageNum) window.jumpToPDFPage(pageNum);
    if (texQuery) {
      loadRawTeXFile().then(() => {
        window.switchMonographTab('tex');
        const sb = document.getElementById('tex-search-box');
        if (sb) { sb.value = texQuery; window.searchRawTeX(texQuery); }
      });
    }
  };

  function showTeXAtAnchor(anchorStr) {
    if (!rawTeXCache) return;
    const viewer = document.getElementById('monograph-tex-viewer');
    if (!viewer) return;
    const pos = rawTeXCache.indexOf(anchorStr);
    const start = pos >= 0 ? Math.max(0, pos - 120) : 0;
    viewer.textContent = rawTeXCache.slice(start, start + 16000);
    viewer.scrollTop = 0;
  }

  async function loadRawTeXFile() {
    if (rawTeXCache) return rawTeXCache;
    const viewer = document.getElementById('monograph-tex-viewer');
    const candidateUrls = [
      'Syntrometric-Topos.tex',
      '../Syntrometric-Topos.tex',
      './Syntrometric-Topos.tex'
    ];

    let loaded = null;
    for (const url of candidateUrls) {
      try {
        const resp = await fetch(url);
        if (resp.ok) {
          loaded = await resp.text();
          break;
        }
      } catch (e) {}
    }

    if (!loaded) {
      if (viewer) {
        viewer.textContent =
          `% Place 'Syntrometric-Topos.tex' and 'Syntrometric-Topos.pdf' in the root directory.\n` +
          `% Once present, this workbench automatically parses all 15 Chapters, 5 Appendices,\n` +
          `% 380+ Theorems/Definitions, Lean 4 blocks, and SM Equations 1–100a.`;
      }
      return null;
    }

    rawTeXCache = loaded;
    parseMonographTeX(rawTeXCache);
    const chKey = detectActiveChKey();
    showTeXAtAnchor(CHAPTER_PAGE_MAP[chKey]?.texAnchor || "\\label{chap:ch1}");
    window.filterTheoremIndex("");
    window.filterRosettaRegister("");
    return rawTeXCache;
  }

  // Precompute chapter offsets in TeX string for smooth page interpolation
  let chapterOffsets = null;
  function getInterpolatedPage(texIndex, texLength) {
    if (!chapterOffsets && rawTeXCache) {
      chapterOffsets = [];
      const keys = Object.keys(CHAPTER_PAGE_MAP);
      for (const k of keys) {
        const entry = CHAPTER_PAGE_MAP[k];
        const p = rawTeXCache.indexOf(entry.texAnchor);
        if (p >= 0) {
          chapterOffsets.push({ pos: p, page: entry.basePage, key: k });
        }
      }
      chapterOffsets.sort((a, b) => a.pos - b.pos);
      chapterOffsets.push({ pos: rawTeXCache.length, page: 376, key: 'end' });
    }

    if (chapterOffsets && chapterOffsets.length >= 2) {
      for (let i = 0; i < chapterOffsets.length - 1; i++) {
        const c1 = chapterOffsets[i];
        const c2 = chapterOffsets[i + 1];
        if (texIndex >= c1.pos && texIndex < c2.pos && c2.pos > c1.pos) {
          const ratio = (texIndex - c1.pos) / (c2.pos - c1.pos);
          return Math.max(1, Math.min(380, Math.round(c1.page + ratio * (c2.page - c1.page))));
        }
      }
    }
    return Math.max(1, Math.min(380, Math.round((texIndex / (texLength || 1)) * 365) + 8));
  }

  // Dynamically parses all Theorems, Definitions, Scholia, Lean 4 Boxes & SM Eqs. 1-100a
  function parseMonographTeX(tex) {
    parsedTheorems = [];
    chapterOffsets = null;

    const envRegex = /\\begin\{(mytheorem|mydefinition|myproposition|mylemma|mycorollary|myscholium|mycarnapscholium|myexplication|leanbox|pythonbox)\}(?:\[([^\]]*)\])?([\s\S]*?)\\end\{\1\}/g;
    let m;
    while ((m = envRegex.exec(tex)) !== null) {
      const envType = m[1];
      const rawTitle = (m[2] || "").trim();
      const title = rawTitle
        .replace(/\\texorpdfstring\{([^}]*)\}\{[^}]*\}/g, "$1")
        .replace(/^title=\{?(.*?)\}?$/, "$1")
        .trim();
      const body = m[3] || "";
      const labelMatch = body.match(/\\label\{([^}]+)\}/);
      const label = labelMatch ? labelMatch[1] : "";
      const approxPage = getInterpolatedPage(m.index, tex.length);

      // Clean LaTeX clutter from preview while preserving math formulas
      let cleanBody = body
        .replace(/\\label\{[^}]+\}/g, "")
        .replace(/\\(?:sidx|hidx|nidx)\{[^}]*\}\%?/g, "")
        .replace(/%.*$/gm, "")
        .trim();

      const isCode = (envType === 'leanbox' || envType === 'pythonbox');

      parsedTheorems.push({
        env: envType,
        title: title || label || envType,
        label: label,
        page: approxPage,
        anchor: label ? `\\label{${label}}` : m[0].slice(0, 60),
        preview: cleanBody.slice(0, 320),
        isCode: isCode
      });
    }

    // Parse all 160+ Canonical Source Formulas from Chapter 14's hypertarget register
    parsedSMEquations = [];
    const smRegex = /\\hypertarget\{sm-source-eq-([^}]+)\}\{\\textbf\{(SM Eq\.~[^}]+)\}\}\s*&\s*\\smformula\{([\s\S]*?)\}\s*\\\\/g;
    let sm;
    while ((sm = smRegex.exec(tex)) !== null) {
      const eqName = sm[2].replace("~", " ");
      const rawFormula = sm[3].replace(/%.*$/gm, "").replace(/\s+/g, " ").trim();
      parsedSMEquations.push({
        eq: eqName,
        ch: "Ch 14 Register",
        page: 284,
        tex: `sm-source-eq-${sm[1]}`,
        d: rawFormula,
        r: `Canonical historical formula ${eqName} transcribed from Heim (2000). Click to view LaTeX and sync PDF.`
      });
    }
  }

  // Debounced input handlers for ultra-responsive search on mobile devices
  let rosettaTimer = null;
  window.debounceRosettaSearch = function(q) {
    clearTimeout(rosettaTimer);
    rosettaTimer = setTimeout(() => window.filterRosettaRegister(q), 150);
  };

  let thmTimer = null;
  window.debounceTheoremSearch = function(q) {
    clearTimeout(thmTimer);
    thmTimer = setTimeout(() => window.filterTheoremIndex(q), 150);
  };

  let texTimer = null;
  window.debounceTeXSearch = function(q) {
    clearTimeout(texTimer);
    texTimer = setTimeout(() => window.searchRawTeX(q), 150);
  };

  window.filterTheoremIndex = function(q) {
    const cont = document.getElementById('thm-cards-container');
    if (!cont) return;
    if (!parsedTheorems.length) {
      cont.innerHTML = `<div class="rosetta-card">Loading theorem &amp; Lean 4 index from <code>Syntrometric-Topos.tex</code>...</div>`;
      return;
    }
    const filter = (q || "").toLowerCase();
    const list = parsedTheorems.filter(t =>
      !filter ||
      t.title.toLowerCase().includes(filter) ||
      t.label.toLowerCase().includes(filter) ||
      t.env.toLowerCase().includes(filter) ||
      t.preview.toLowerCase().includes(filter)
    ).slice(0, 80);

    cont.innerHTML = list.map(t => {
      const cleanEnv = t.env.replace('my', '').toUpperCase();
      const badgeColor = t.env.includes('theorem') ? '#FFD700' :
                         t.env.includes('lean') ? '#a78bfa' :
                         t.env.includes('python') ? '#38bdf8' :
                         t.env.includes('definition') ? '#5eead4' : '#82aaff';
      const escapedAnchor = t.anchor.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

      let previewMarkup = '';
      if (t.isCode) {
        previewMarkup = `<pre class="thm-code-block">${t.preview.replace(/</g, '&lt;')}...</pre>`;
      } else {
        const hasDelims = (t.preview.includes('$') || t.preview.includes('\\(') || t.preview.includes('\\[')) || t.preview.includes('\\begin{');
        const formattedPreview = hasDelims ? t.preview : t.preview.replace(/</g, '&lt;');
        previewMarkup = `<div class="thm-math-preview">${formattedPreview}...</div>`;
      }

      return `
      <div class="rosetta-card" onclick="window.openMonographAtPage(${t.page}, '${escapedAnchor}')">
        <div style="display:flex; justify-content:space-between; align-items:center; color:#FFD700; font-weight:bold; margin-bottom:2px; gap:8px;">
          <span>
            <span style="color:${badgeColor}; font-size:10px; border:1px solid ${badgeColor}; padding:1px 5px; border-radius:3px; margin-right:6px; letter-spacing:0.4px;">${cleanEnv}</span>
            <span>${t.title}</span>
          </span>
          <span style="color:#82aaff; font-size:11px; white-space:nowrap;">${t.label ? `<code>${t.label}</code> · ` : ''}~p. ${t.page} →</span>
        </div>
        ${previewMarkup}
      </div>`;
    }).join("");

    // Render LaTeX mathematics with MathJax
    safeTypeset(cont);
  };

  window.searchRawTeX = function(query) {
    if (!rawTeXCache) return;
    const viewer = document.getElementById('monograph-tex-viewer');
    if (!viewer) return;
    if (!query || query.trim().length < 2) {
      const chKey = detectActiveChKey();
      showTeXAtAnchor(CHAPTER_PAGE_MAP[chKey]?.texAnchor || "\\label{chap:ch1}");
      return;
    }
    const idx = rawTeXCache.toLowerCase().indexOf(query.toLowerCase());
    if (idx >= 0) {
      const start = Math.max(0, idx - 350);
      viewer.textContent = rawTeXCache.slice(start, start + 12000);
      viewer.scrollTop = 0;
    } else {
      viewer.textContent = `% No match found for "${query}" in Syntrometric-Topos.tex`;
    }
  };

  window.copyCurrentTeXSnippet = function() {
    const viewer = document.getElementById('monograph-tex-viewer');
    if (viewer && navigator.clipboard) {
      navigator.clipboard.writeText(viewer.textContent.slice(0, 5000));
    }
  };

  window.filterRosettaRegister = function(q) {
    const cont = document.getElementById('rosetta-cards-container');
    if (!cont) return;
    const sourceList = parsedSMEquations.length ? [...FALLBACK_ROSETTA, ...parsedSMEquations] : FALLBACK_ROSETTA;
    const filter = (q || "").toLowerCase();
    const items = sourceList.filter(item =>
      !filter ||
      item.eq.toLowerCase().includes(filter) ||
      item.ch.toLowerCase().includes(filter) ||
      item.d.toLowerCase().includes(filter) ||
      item.r.toLowerCase().includes(filter)
    ).slice(0, 80);

    cont.innerHTML = items.map(it => {
      const escapedTex = it.tex.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const isAlreadyWrapped = it.d.startsWith('\\(') || it.d.startsWith('$$');
      const mathContent = isAlreadyWrapped ? it.d : `\\(\\displaystyle ${it.d} \\)`;

      return `
      <div class="rosetta-card" onclick="window.openMonographAtPage(${it.page}, '${escapedTex}')">
        <div style="display:flex; justify-content:space-between; align-items:center; color:#FFD700; font-weight:bold; margin-bottom:2px;">
          <span>${it.eq} <span style="color:#94a3b8; font-weight:normal; font-size:11px;">(${it.ch})</span></span>
          <span style="color:#82aaff; font-size:11px;">📄 PDF p. ${it.page} &amp; TeX →</span>
        </div>
        
        <!-- Rendered LaTeX Formula Box (with Mobile Touch Scroll) -->
        <div class="rosetta-formula-box">
          <div class="rosetta-formula-label">
            <span>Stratum D (Historical Formula):</span>
            <button class="tex-peek-btn" onclick="event.stopPropagation(); window.openMonographAtPage(${it.page}, '${escapedTex}')" title="Inspect raw LaTeX source">TeX Code</button>
          </div>
          <div class="rosetta-formula-math">${mathContent}</div>
        </div>

        <div class="rosetta-recon-box">
          <span style="color:#FFD700; font-weight:bold; font-size:11px;">Reconstruction (ℛ):</span>
          <span>${it.r}</span>
        </div>
      </div>`;
    }).join("");

    // Render LaTeX mathematics with MathJax
    safeTypeset(cont);
  };

  function detectActiveChKey() {
    const txt = (document.title + " " + (document.querySelector('.subtitle')?.innerText || "")).toLowerCase();
    for (let i = 15; i >= 1; i--) {
      if (txt.includes(`chapter ${i}`) || txt.includes(`ch. ${i}`) || txt.includes(`ch ${i}`) || window.location.pathname.includes(`chapter${i}`)) {
        return `ch${i}`;
      }
    }
    if (txt.includes("syntrix architecture")) return "ch2";
    if (txt.includes("syntrixkorporationen")) return "ch3";
    if (txt.includes("enyphansyntrizen")) return "ch4";
    if (txt.includes("metroplextheorie")) return "ch5";
    if (txt.includes("televariante")) return "ch6";
    if (txt.includes("anthropomorphic")) return "ch7";
    if (txt.includes("quantitätsaspekt")) return "ch8";
    if (txt.includes("strukturkaskaden")) return "ch9";
    if (txt.includes("metronische elementar")) return "ch10";
    if (txt.includes("selektortheorie")) return "ch11";
    if (txt.includes("discontinuity")) return "ch12";
    if (txt.includes("qualia")) return "ch13";
    return "ch1";
  }

  function syncMonographPageWithSlide() {
    const chKey = detectActiveChKey();
    const sel = document.getElementById('monograph-chapter-select');
    if (sel) sel.value = chKey;
    const base = CHAPTER_PAGE_MAP[chKey]?.basePage || 11;
    let slideOffset = 0;
    if (window.Reveal && typeof window.Reveal.getIndices === 'function') {
      const idx = window.Reveal.getIndices();
      slideOffset = (idx && typeof idx.h === 'number') ? Math.round(idx.h * 1.8) : 0;
    }
    window.jumpToPDFPage(base + slideOffset);
  }

  // Keyboard shortcut 'M' toggles Monograph Drawer
  window.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      window.toggleMonographDrawer();
    } else if (e.key === 'Escape') {
      const dr = document.getElementById('syn-monograph-drawer');
      if (dr && dr.classList.contains('open')) {
        dr.classList.remove('open');
        document.body.classList.remove('mdrawer-open');
      }
    }
  });


  // Dynamic Windows Taskbar / System Tray Avoidance Engine for Desktop Trays
  function updateWindowsTrayAvoidance() {
    if (typeof window === 'undefined') return;

    if (window.innerWidth < 901) {
      document.documentElement.style.setProperty('--syn-bottom-offset', '12px');
      return;
    }

    let offset = 64; // Default desktop clearance
    try {
      const s = window.screen;
      if (s) {
        const screenH = s.height || 0;
        const availH = s.availHeight || 0;
        const availTop = s.availTop || 0;
        const taskbarH = Math.max(0, screenH - (availTop + availH));
        
        const isFullscreen = !!(document.fullscreenElement || window.innerHeight >= screenH - 5);
        const winY = typeof window.screenY === 'number' ? window.screenY : (window.screenTop || 0);
        const winBottom = winY + (window.outerHeight || window.innerHeight);
        const distFromBottom = screenH - winBottom;

        if (isFullscreen) {
          // In fullscreen mode, Windows Taskbar sensor triggers within ~15px of bottom edge.
          // Maintain a 38px clearance so hovering or clicking trays never triggers taskbar unhide.
          offset = 72;
        } else if (distFromBottom <= 20) {
          // Window is maximized or flush against the screen bottom / taskbar.
          const taskbarClearance = taskbarH > 0 ? Math.min(taskbarH + 20, 84) : 68;
          offset = Math.max(64, taskbarClearance);
        } else {
          offset = 64;
        }
      }
    } catch (e) {}

    document.documentElement.style.setProperty('--syn-bottom-offset', offset + 'px');

    // Notify parent window or child iframes of offset change
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'syn-bottom-offset-change', offset: offset }, '*');
      }
    } catch (e) {}
  }

  window.addEventListener('resize', updateWindowsTrayAvoidance, { passive: true });
  window.addEventListener('fullscreenchange', updateWindowsTrayAvoidance, { passive: true });
  window.addEventListener('webkitfullscreenchange', updateWindowsTrayAvoidance, { passive: true });
  window.addEventListener('focus', updateWindowsTrayAvoidance, { passive: true });
  window.addEventListener('message', e => {
    if (e.data && e.data.type === 'syn-bottom-offset-change' && typeof e.data.offset === 'number') {
      document.documentElement.style.setProperty('--syn-bottom-offset', e.data.offset + 'px');
    }
  });

  function initMonographWorkbench() {
    updateWindowsTrayAvoidance();
    injectDOM();
    window.filterRosettaRegister("");
    syncMonographPageWithSlide();
    if (window.Reveal) {
      window.Reveal.on('slidechanged', syncMonographPageWithSlide);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMonographWorkbench);
  } else {
    initMonographWorkbench();
  }
})();

// Universal Reveal & Mobile Scroll Monitor for Morph Stage Trays
if (typeof window !== 'undefined' && !window.__syn_morph_stage_monitor_initialized) {
  window.__syn_morph_stage_monitor_initialized = true;

  const triggerMorphStageSync = () => {
    for (let ch = 1; ch <= 15; ch++) {
      const fnName = ch === 2 ? 'sync3DWithDeck' : `syncCh${ch}WithDeck`;
      if (typeof window[fnName] === 'function') {
        try { window[fnName](); } catch (_) {}
      }
    }
  };

  window.addEventListener('scroll', triggerMorphStageSync, { capture: true, passive: true });
  document.addEventListener('scroll', triggerMorphStageSync, { capture: true, passive: true });
  window.addEventListener('touchmove', triggerMorphStageSync, { passive: true });
  document.addEventListener('touchmove', triggerMorphStageSync, { passive: true });

  const hookRevealScroll = () => {
    const rev = document.querySelector('.reveal');
    if (rev && !rev.__syn_morph_stage_hooked) {
      rev.__syn_morph_stage_hooked = true;
      rev.addEventListener('scroll', triggerMorphStageSync, { passive: true });
      rev.addEventListener('touchmove', triggerMorphStageSync, { passive: true });
    }
    const vp = document.querySelector('.reveal-viewport');
    if (vp && !vp.__syn_morph_stage_hooked) {
      vp.__syn_morph_stage_hooked = true;
      vp.addEventListener('scroll', triggerMorphStageSync, { passive: true });
      vp.addEventListener('touchmove', triggerMorphStageSync, { passive: true });
    }
  };

  hookRevealScroll();
  document.addEventListener('DOMContentLoaded', hookRevealScroll);
  window.addEventListener('load', hookRevealScroll);
  if (window.Reveal) {
    window.Reveal.on('ready', () => { hookRevealScroll(); triggerMorphStageSync(); });
    window.Reveal.on('slidechanged', triggerMorphStageSync);
    window.Reveal.on('fragmentshown', triggerMorphStageSync);
    window.Reveal.on('fragmenthidden', triggerMorphStageSync);
    window.Reveal.on('scroll-view-activated', () => { hookRevealScroll(); triggerMorphStageSync(); });
    window.Reveal.on('scroll-view-deactivated', () => { hookRevealScroll(); triggerMorphStageSync(); });
  }
}
