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

  // Auto-load site telemetry & visitor counter if not present
  if (!window.__SYN_SITE_TELEMETRY_LOADED__) {
    try {
      const telScript = document.createElement('script');
      telScript.src = 'shared/site-telemetry.js';
      telScript.async = true;
      document.head.appendChild(telScript);
    } catch (e) {}
  }

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
  "nullsyntrix": "\\mathbf{y}\\widetilde{\\overline{\\mathbf{c}}}",
  "elementarstruktur": "\\mathbf{y}\\widetilde{\\mathbf{a}}",
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
  "quantitaetssyntrix": "\\mathbf{y}\\widetilde{\\mathbf{R}}_n",
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
    "\\left.{}^{#2}_{|}\\overline{\\left|#1\\right|}\\right.^{#4}_{#3}",
    4
  ],
  "quantor": [
    "\\overline{\\left|#1\\right|}",
    1
  ],
  "homogenesyntrix": [
    "\\mathbf{x}#1",
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
  "predicatesymbol": "\\mathrel{\\overline{||}}",
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
  "xlongrightarrow": "\\xrightarrow",
  "rrbracket": "\\mathclose{]\\mkern-3mu]}",
  "joinrel": "\\mathrel{\\mkern-3mu}",
  "relbar": "\\mathrel{-}",
  "Relbar": "\\mathrel{=}",
  "longhookrightarrow": "\\lhook\\joinrel\\longrightarrow",
  "longhookleftarrow": "\\longleftarrow\\joinrel\\rhook",
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
    "\\rule{0pt}{#1}",
    1
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
    { eq: "SM Eq. 11a", ch: "Ch 3", page: 59, tex: "prop:zero_object_syn", d: "\\mathbf{y}\\widetilde{\\overline{\\mathbf{c}}} \\equiv \\langle\\overline{f}\\,\\widetilde{c}\\,\\overline{m}\\rangle \\quad (\\text{Nullsyntrix})", r: "Initial & terminal zero object \\(0_{\\mathbf{Syn}} \\in \\mathrm{Obj}(\\mathbf{Syn})\\)" },
    { eq: "SM Eq. 13", ch: "Ch 3", page: 60, tex: "def:conflexivity_index", d: "\\mathbf{y}\\widetilde{a}_{\\mathrm{conf}} \\equiv \\prod_{i=1}^k \\mathbf{S}_i \\quad (\\text{Konflexivsyntrix})", r: "Tree colimit \\(\\varinjlim D\\) with Presentation Conflexivity Index \\(\\mathrm{ConfIndex}_{\\mathrm{pres}}(G_S) = |E_K| + 1\\)" },
    { eq: "SM Eq. 14", ch: "Ch 4", page: 79, tex: "thm:slice_site_equivalence_ch4", d: "G_{\\mathrm{gen}} \\equiv \\left[ P_i \\big\\vert_1^4 \\{\\dots\\}_{(j)} \\big\\vert_1^Q \\right] \\quad (\\text{Generative & 4D Syntrixtotalit\\\"at})", r: "Slice sheaf topos \\(\\mathrm{Sh}(\\mathbf{Ctx}_{/U_G}, J_{/U_G}) \\simeq \\mathcal{E}_{\\mathrm{syn}} / y(U_G)\\) over \\(P^{U_G} \\cong \\mathbb{R}^{12}\\)" },
    { eq: "SM Eqs. 16a, 17", ch: "Ch 4", page: 80, tex: "thm:relative_interaction_curvature_decomp", d: "E, \\; E^{-1}, \\; E_\\nu \\quad (\\text{Continuous Enyphane & Enyphanie})", r: "Boundary-tangent corner flow \\(\\Phi_t^X\\) and Non-Abelian Interaction Curvature \\(\\Omega_{\\mathrm{int}}^D = \\sum [a_i, a_j] + \\dots\\)" },
    { eq: "SM Eq. 18", ch: "Ch 4", page: 94, tex: "def:discrete_chronometry_clock_ch4", d: "\\mathrm{YF}(\\delta t_i) \\quad (\\text{Syntrixfunktor & Zeitkorn})", r: "Pushout endofunctor \\(\\mathrm{YF}_{\\mathrm{model}}(f) = B \\amalg_{C_0} f^{\\otimes r}\\) and discrete clock difference \\(\\delta t_n = \\tau(n+1) - \\tau(n)\\)" },
    { eq: "SM Eqs. 20--25a", ch: "Ch 5", page: 103, tex: "def:complete_segal_objects_ch5", d: "\\mathsf{M}^1, \\; \\mathsf{M}^n, \\; {}^{n+N}\\alpha \\quad (\\text{Hypersyntrix & Metroplex})", r: "Dendroidal Complete Segal Spaces \\(\\mathrm{dCSeg}(\\mathcal{X}_{\\mathrm{syn}})\\) and change-of-operad adjunction \\((\\phi)_! \\dashv (\\phi)^*\\)" },
    { eq: "SM Eq. 27", ch: "Ch 6", page: 123, tex: "thm:final_coalgebra_existence_ch6", d: "\\mathrm{AR}_q, \\; T_z \\quad (\\text{\\\"Aonische Area & Telezentrum})", r: "Final Telecentric Coalgebra \\((\\nu \\mathcal{T}, \\zeta \\cong)\\) via Lambek's Lemma and Lyapunov basin \\(\\dot{V} \\leq -\\gamma V\\)" },
    { eq: "SM Eqs. 28--35a", ch: "Ch 7--8", page: 144, tex: "thm:nuclear_variable_separation", d: "\\mathbf{y}\\widetilde{\\mathbf{R}}_n \\equiv \\langle f, R_n, m\\rangle \\quad (\\text{Quantit\\\"atssyntrix})", r: "Quantitative Topos \\(\\mathcal{E}_{\\mathrm{quant}}\\), Seeley extension \\(E^{(n)}\\) and Grothendieck nuclearity \\(\\mathcal{S}((\\mathbb{R}_{\\geq 0})^m)\\)" },
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
    align-items: flex-end !important;
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
    width: auto !important;
    max-width: 100% !important;
    margin-left: auto !important;
    align-self: flex-end !important;
  }
}

/* Desktop Viewports (>= 901px): Horizontal Flexbox with Desktop Taskbar Avoidance */
@media (min-width: 901px) {
  #syn-bottom-dock {
    left: 20px !important;
    right: 20px !important;
    bottom: var(--syn-bottom-offset, 64px) !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
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
    margin-left: auto !important;
    align-self: flex-end !important;
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
  margin: 0 !important;
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

/* =========================================================================
   NOVEL UI UPGRADES:
   1. OMNI-SEARCH COMMAND PALETTE (Ctrl+K)
   2. SLIDE MINIMAP & EPISTEMIC STRATUM RADAR BAR (Shortcut: T)
   3. SMART CALLOUT MICRO-TOOLBAR (TeX Sync, Copy LaTeX, Lecture Spotlight)
   4. MANIM VIDEO CINEMA HUD (Play/Pause, 0.5x-2x Speed, Restart, Theater)
   5. INTERACTIVE ARCHITECTURE & DEPENDENCY GRAPH (5th Workbench Tab)
   ========================================================================= */

/* --- 1. Omni-Search Command Palette (Ctrl+K) --- */
#syn-cmd-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(4, 7, 14, 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100020 !important;
  display: none;
  align-items: flex-start;
  justify-content: center;
  padding-top: min(10vh, 72px);
  font-family: "Libertinus Sans", "Inter", system-ui, sans-serif;
}
#syn-cmd-backdrop.open {
  display: flex;
}
#syn-cmd-modal {
  width: min(780px, 94vw);
  max-height: 80vh;
  background: linear-gradient(160deg, rgba(11, 16, 29, 0.98), rgba(7, 10, 18, 0.99));
  border: 1.5px solid #FFD700;
  border-radius: 14px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.92), 0 0 35px rgba(65, 105, 225, 0.28);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #e8ecf2;
}
.cmd-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(65, 105, 225, 0.4);
}
.cmd-search-icon {
  font-size: 16px;
  color: #FFD700;
}
#syn-cmd-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 15px;
  font-family: inherit;
}
#syn-cmd-input::placeholder {
  color: #64748b;
}
.cmd-kbd {
  background: #1e293b;
  color: #94a3b8;
  border: 1px solid #334155;
  border-radius: 5px;
  padding: 2px 6px;
  font-size: 10.5px;
  font-family: "Libertinus Mono", monospace;
}
.cmd-filters {
  display: flex;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(10, 14, 24, 0.9);
  border-bottom: 1px solid #1e293b;
  flex-wrap: wrap;
}
.cmd-filter-pill {
  background: #151e32;
  color: #94a3b8;
  border: 1px solid #2d3748;
  border-radius: 999px;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}
.cmd-filter-pill.active, .cmd-filter-pill:hover {
  background: rgba(65, 105, 225, 0.32);
  color: #FFD700;
  border-color: #FFD700;
}
#syn-cmd-results {
  flex: 1;
  overflow-y: auto;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 56vh;
}
.cmd-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 12px;
  background: rgba(15, 23, 42, 0.78);
  border: 1px solid #263248;
  border-left: 4px solid #4169E1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.12s ease;
}
.cmd-item:hover, .cmd-item.selected {
  background: rgba(65, 105, 225, 0.22);
  border-color: #FFD700;
  transform: translateX(2px);
}
.cmd-item-main {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.cmd-item-title {
  font-size: 13px;
  font-weight: 700;
  color: #f8fafc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cmd-item-sub {
  font-size: 11px;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cmd-item-badges {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}
.cmd-badge {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
.cmd-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 16px;
  background: rgba(7, 10, 18, 0.96);
  border-top: 1px solid #1e293b;
  font-size: 11px;
  color: #64748b;
}

/* --- 2. Slide Minimap & Epistemic Stratum Radar Bar --- */
#syn-stratum-radar {
  position: fixed;
  top: 10px;
  right: 14px;
  z-index: 9500;
  display: flex;
  align-items: center;
  gap: 7px;
  background: rgba(10, 14, 24, 0.88);
  border: 1px solid rgba(65, 105, 225, 0.5);
  border-radius: 999px;
  padding: 4px 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.55);
  font-family: "Libertinus Sans", "Inter", system-ui, sans-serif;
  user-select: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
body.zen-mode #syn-stratum-radar,
body.mdrawer-open #syn-stratum-radar {
  opacity: 0;
  pointer-events: none;
}
#syn-radar-stratum-pill {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.8px;
  padding: 2px 7px;
  border-radius: 999px;
  text-transform: uppercase;
  white-space: nowrap;
  background: rgba(65, 105, 225, 0.25);
  border: 1px solid #4169E1;
  color: #82aaff;
}
.radar-segments {
  display: flex;
  align-items: center;
  gap: 3px;
}
.radar-seg {
  width: 9px;
  height: 12px;
  border-radius: 3px;
  cursor: pointer;
  opacity: 0.55;
  transition: all 0.16s ease;
  position: relative;
}
.radar-seg:hover {
  opacity: 1;
  transform: scaleY(1.35);
}
.radar-seg.active {
  width: 16px;
  opacity: 1;
  box-shadow: 0 0 8px #FFD700;
  outline: 1.5px solid #FFD700;
}
.radar-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid #334155;
  color: #cbd5e1;
  border-radius: 999px;
  padding: 2px 7px;
  font-size: 10.5px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  transition: all 0.15s ease;
}
.radar-btn:hover, .radar-btn.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
}
#syn-radar-tooltip {
  position: fixed;
  top: 44px;
  right: 16px;
  z-index: 9505;
  background: rgba(11, 16, 29, 0.97);
  border: 1.5px solid #FFD700;
  border-radius: 9px;
  padding: 8px 12px;
  color: #f8fafc;
  font-size: 11.5px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  pointer-events: none;
  display: none;
  max-width: 340px;
  font-family: "Libertinus Sans", "Inter", sans-serif;
}
#syn-radar-popover {
  position: fixed;
  top: 46px;
  right: 14px;
  width: min(420px, 92vw);
  max-height: 74vh;
  background: linear-gradient(160deg, rgba(11, 16, 29, 0.98), rgba(7, 10, 18, 0.99));
  border: 1.5px solid #4169E1;
  border-radius: 12px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.88);
  z-index: 9502;
  display: none;
  flex-direction: column;
  overflow: hidden;
  font-family: "Libertinus Sans", "Inter", sans-serif;
  color: #e8ecf2;
}
#syn-radar-popover.open {
  display: flex;
}
.radar-pop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 12px;
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid #2d3748;
  font-size: 12px;
  font-weight: 800;
  color: #FFD700;
}
.radar-pop-filters {
  display: flex;
  gap: 4px;
  padding: 6px 10px;
  background: #090d16;
  border-bottom: 1px solid #1e293b;
  flex-wrap: wrap;
}
.radar-pop-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.radar-slide-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 9px;
  background: rgba(21, 30, 50, 0.72);
  border: 1px solid #263248;
  border-left: 3.5px solid #4169E1;
  border-radius: 6px;
  font-size: 11.5px;
  cursor: pointer;
  transition: all 0.12s ease;
}
.radar-slide-row:hover, .radar-slide-row.active {
  background: rgba(65, 105, 225, 0.24);
  border-color: #FFD700;
}

/* --- 3. Smart Callout Micro-Toolbar (.syn-box-toolbar) --- */
.thm-box, .def-box, .prop-box, .proof-box, .carnap-box, .scholium-box, .firewall-box, .deliverables-box, .interactive-panel {
  position: relative;
}
.syn-box-toolbar {
  position: absolute;
  top: 5px;
  right: 7px;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.16s ease;
  z-index: 25;
}
.thm-box:hover > .syn-box-toolbar,
.def-box:hover > .syn-box-toolbar,
.prop-box:hover > .syn-box-toolbar,
.proof-box:hover > .syn-box-toolbar,
.carnap-box:hover > .syn-box-toolbar,
.scholium-box:hover > .syn-box-toolbar,
.firewall-box:hover > .syn-box-toolbar,
.deliverables-box:hover > .syn-box-toolbar,
.interactive-panel:hover > .syn-box-toolbar {
  opacity: 1;
  pointer-events: auto;
}
.syn-micro-btn {
  background: rgba(7, 10, 18, 0.9);
  color: #cbd5e1;
  border: 1px solid rgba(255, 215, 0, 0.45);
  border-radius: 5px;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 700;
  font-family: "Libertinus Sans", "Inter", sans-serif;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  transition: all 0.14s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
.syn-micro-btn:hover {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
  transform: translateY(-1px);
}

/* --- 4. Manim Video Cinema HUD (.syn-video-hud) --- */
.video-container, .video-card {
  position: relative;
}
.syn-video-hud {
  position: absolute;
  top: 9px;
  right: 9px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(7, 10, 18, 0.86);
  border: 1px solid rgba(65, 105, 225, 0.55);
  border-radius: 7px;
  padding: 3px 6px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
  z-index: 25;
  backdrop-filter: blur(6px);
}
.video-container:hover .syn-video-hud,
.video-card:hover .syn-video-hud {
  opacity: 1;
  pointer-events: auto;
}
.syn-vid-btn {
  background: transparent;
  color: #e8ecf2;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 10.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.12s ease;
}
.syn-vid-btn:hover {
  background: rgba(255, 215, 0, 0.22);
  border-color: #FFD700;
  color: #FFD700;
}

/* =========================================================================
   6. UNIVERSAL 3D MORPH STAGE QUICK-JUMP PILL STRIP & CINEMA TOUR CONTROLS
   ========================================================================= */
.syn-morph-pills {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3px;
  padding: 4px 8px;
  background: rgba(7, 11, 20, 0.96);
  border-top: 1px solid rgba(65, 105, 225, 0.25);
  font-family: "JetBrains Mono", monospace;
}

.syn-morph-pill {
  flex: 1;
  background: #131c31;
  color: #94a3b8;
  border: 1px solid #2d3b55;
  border-radius: 4px;
  padding: 2px 0;
  font-size: 9.5px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: all 0.14s ease;
}

.syn-morph-pill:hover {
  background: rgba(65, 105, 225, 0.35);
  color: #fff;
  border-color: #FFD700;
}

.syn-morph-pill.active {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.45);
}

.syn-morph-slide-btn {
  background: rgba(32, 178, 170, 0.18);
  color: #5eead4;
  border: 1px solid #20B2AA;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 9.5px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 3px;
  white-space: nowrap;
  transition: all 0.14s ease;
}

.syn-morph-slide-btn:hover {
  background: #20B2AA;
  color: #000;
}

.syn-morph-tour-btn.playing {
  background: #FFD700 !important;
  color: #000 !important;
  border-color: #FFD700 !important;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.55);
}

/* --- Lecture Spotlight & Cinema Lightbox Modal (#syn-spotlight-modal) --- */
#syn-spotlight-modal {
  position: fixed;
  inset: 0;
  background: rgba(4, 7, 14, 0.90);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 100015 !important;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: "Libertinus Sans", "Inter", sans-serif;
}
#syn-spotlight-modal.open {
  display: flex;
}
.spotlight-card {
  width: min(1140px, 95vw);
  max-height: 90vh;
  background: linear-gradient(155deg, rgba(13, 19, 34, 0.98), rgba(7, 10, 18, 0.99));
  border: 2px solid #FFD700;
  border-radius: 14px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 215, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #f8fafc;
}
.spotlight-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px;
  background: rgba(15, 23, 42, 0.96);
  border-bottom: 1px solid rgba(255, 215, 0, 0.35);
  color: #FFD700;
  font-weight: 800;
  font-size: 13.5px;
}
#syn-spotlight-body {
  padding: 22px 26px;
  overflow-y: auto;
  font-size: 1.18rem;
  line-height: 1.55;
}
#syn-spotlight-body video {
  width: 100%;
  max-height: 70vh;
  border-radius: 10px;
  background: #000;
  display: block;
  margin: 0 auto;
}

/* --- 5. Architecture & Dependency Graph Tab (#mpane-graph) --- */
.arch-graph-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px 14px;
  gap: 10px;
  overflow-y: auto;
  box-sizing: border-box;
}
.arch-svg-box {
  background: #060911;
  border: 1px solid #2d3748;
  border-radius: 10px;
  padding: 8px;
  overflow-x: auto;
  flex-shrink: 0;
}
.arch-node {
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
}
.arch-node:hover {
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.65));
}
.arch-inspector {
  background: rgba(15, 23, 42, 0.92);
  border: 1px solid #4169E1;
  border-left: 4px solid #FFD700;
  border-radius: 9px;
  padding: 12px 15px;
  font-size: 12.2px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* --- Floating Confirmation Toast (#syn-toast) --- */
#syn-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: linear-gradient(135deg, #151e32, #0d1322);
  color: #FFD700;
  border: 1.5px solid #FFD700;
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 12.5px;
  font-weight: 800;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  z-index: 100050 !important;
  opacity: 0;
  pointer-events: none;
  transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1);
  font-family: "Libertinus Sans", "Inter", sans-serif;
}
#syn-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

@media (max-width: 768px) {
  #syn-stratum-radar .radar-segments {
    display: none;
  }
  #syn-stratum-radar {
    top: 6px;
    right: 8px;
    padding: 3px 8px;
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
      <a href="javascript:void(0)" onclick="window.openVisitTelemetryModal ? window.openVisitTelemetryModal(event) : null" style="display:inline-flex; align-items:center; text-decoration:none; margin-left:6px;" title="Site Visit Telemetry Ledger">
        <img class="syn-counter-badge-img" alt="Visits" height="16" style="display:none;" />
        <span class="syn-counter-fallback" style="display:none; font-size:11px; color:#60a5fa; font-weight:700;">VISITS <span class="syn-visit-count-display">1</span></span>
      </a>
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
    <button class="mdrawer-tab" id="mtab-graph" onclick="window.switchMonographTab('graph')">🕸️ Architecture Graph</button>
    <div style="margin-left:auto; display:flex; align-items:center; gap:5px; font-size:11.5px;">
      <span>PDF Page:</span>
      <input type="number" id="pdf-page-input" min="1" max="380" value="11" style="width:56px; background:#070a12; color:#FFD700; border:1px solid #4169E1; border-radius:4px; padding:2px 5px; font-weight:bold;" onchange="window.jumpToPDFPage(this.value)">
    </div>
  </div>

  <div class="mdrawer-body">
    <!-- PANE 1: Synchronized Embedded PDF -->
    <div class="mdrawer-pane active" id="mpane-pdf">
      <iframe id="monograph-pdf-frame" data-pdf-base="Syntrometric-Topos.pdf" src="about:blank" loading="lazy"></iframe>
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

    <!-- PANE 5: Interactive Architecture & Dependency Graph -->
    <div class="mdrawer-pane" id="mpane-graph">
      <div class="tex-toolbar" style="justify-content:space-between;">
        <span style="font-size:11.5px; color:#cbd5e1;"><b>Syntrometric Dependency DAG:</b> Click any node (Ch 1–15, App A–E) to inspect morphisms, theorems &amp; Polarimeter stages.</span>
        <button class="m3d-btn" onclick="window.toggleCommandPalette()">🔍 Omni-Search (Ctrl+K)</button>
      </div>
      <div class="arch-graph-wrap">
        <div class="arch-svg-box" id="arch-graph-svg-mount"></div>
        <div class="arch-inspector" id="arch-node-inspector"></div>
      </div>
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

  function checkHUDExtendedState() {
    const huds = document.querySelectorAll('[id$="-3d-hud"], #syntrix-3d-hud, .anim-hud-tray, .animation-hud');
    let hasExpanded = false;
    huds.forEach(hud => {
      if (hud && (!hud.classList.contains('minimized') || hud.classList.contains('spotlight'))) {
        hasExpanded = true;
      }
    });

    if (document.body.classList.contains('syn-3d-expanded') !== hasExpanded) {
      document.body.classList.toggle('syn-3d-expanded', hasExpanded);
    }

    if (window.parent && window.parent !== window && window.parent.document && window.parent.document.body) {
      try {
        const pBody = window.parent.document.body;
        if (pBody.classList.contains('syn-3d-expanded') !== hasExpanded) {
          pBody.classList.toggle('syn-3d-expanded', hasExpanded);
        }
      } catch (_) {}
    }

    // On mobile, if a 3D panel is expanded, automatically close the monograph drawer if open
    if (hasExpanded && window.innerWidth <= 900) {
      const drawer = document.getElementById('syn-monograph-drawer');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        document.body.classList.remove('mdrawer-open');
      }
      try {
        if (window.parent && window.parent.document) {
          const pDrawer = window.parent.document.getElementById('syn-monograph-drawer');
          if (pDrawer && pDrawer.classList.contains('open')) {
            pDrawer.classList.remove('open');
            window.parent.document.body.classList.remove('mdrawer-open');
          }
        }
      } catch (_) {}
    }
  }

  let hudObsInitialized = false;
  let hudCheckRaf = false;
  function scheduleHUDCheck() {
    if (hudCheckRaf) return;
    hudCheckRaf = true;
    requestAnimationFrame(() => {
      hudCheckRaf = false;
      dockAnimationHUDs();
    });
  }

  function setupHUDMutationObserver() {
    if (hudObsInitialized || !('MutationObserver' in window) || !document.body) return;
    hudObsInitialized = true;
    const obs = new MutationObserver(mutations => {
      for (let i = 0; i < mutations.length; i++) {
        const m = mutations[i];
        if (m.type === 'childList') {
          scheduleHUDCheck();
          break;
        } else if (m.type === 'attributes') {
          const t = m.target;
          if (t && t.id && (t.id.endsWith('-3d-hud') || t.id === 'syntrix-3d-hud')) {
            scheduleHUDCheck();
            break;
          }
        }
      }
    });
    obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
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
    checkHUDExtendedState();
  }

  function injectDOM() {
    // Always inject core & novel UI styles so slide-level toolbars, radar minimap, and spotlight work inside iframes too
    if (!document.getElementById('syn-monograph-style')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'syn-monograph-style';
      styleEl.textContent = STYLES;
      document.head.appendChild(styleEl);
    }

    // Initialize slide-level enhancements (Stratum Radar, Callout Micro-Toolbars, Video HUD, Spotlight Modal)
    initSlideDeckEnhancements();

    // 1. If running inside an iframe whose parent already has the monograph workbench,
    // proxy drawer/palette actions to parent and do NOT inject a duplicate drawer or FAB inside the iframe.
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
          window.toggleCommandPalette = function(initialFilter) {
            if (typeof window.parent.toggleCommandPalette === 'function') {
              window.parent.toggleCommandPalette(initialFilter);
            }
          };
          ensureBottomDock();
          dockAnimationHUDs();
          setupHUDMutationObserver();
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

    // (Styles already injected at start of injectDOM)

    const dock = ensureBottomDock();

    const container = document.createElement('div');
    container.id = 'syn-monograph-mount';
    container.innerHTML = DRAWER_HTML;
    document.body.appendChild(container);
    try {
      if (typeof window.updateAllTelemetryBadgeImages === 'function') {
        window.updateAllTelemetryBadgeImages();
      }
    } catch(e) {}

    // Place the FAB inside the bottom dock so flexbox coordinates it with animation HUDs
    const fab = document.getElementById('syn-monograph-fab');
    if (fab && dock) {
      dock.insertBefore(fab, dock.firstChild);
    }

    // Dock existing animation HUDs and watch for dynamically injected ones & expand/collapse
    dockAnimationHUDs();
    setupHUDMutationObserver();

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

  function syncPDFIfDrawerOpen() {
    const dr = document.getElementById('syn-monograph-drawer');
    const frame = document.getElementById('monograph-pdf-frame');
    if (!dr || !dr.classList.contains('open') || !frame) return;
    const baseSrc = frame.getAttribute('data-pdf-base') || 'Syntrometric-Topos.pdf';
    const targetSrc = `${baseSrc}#page=${currentPDFPage}&view=FitH`;
    if (frame.getAttribute('src') !== targetSrc) {
      frame.setAttribute('src', targetSrc);
    }
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
        syncPDFIfDrawerOpen();
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
    ['pdf', 'tex', 'thm', 'rosetta', 'graph'].forEach(t => {
      document.getElementById('mtab-' + t)?.classList.toggle('active', t === tab);
      document.getElementById('mpane-' + t)?.classList.toggle('active', t === tab);
    });
    if (tab === 'pdf') {
      syncPDFIfDrawerOpen();
    } else if (tab === 'graph' && typeof window.renderArchitectureGraph === 'function') {
      window.renderArchitectureGraph();
    }
    if (!rawTeXCache) {
      loadRawTeXFile();
    } else {
      if (tab === 'rosetta') {
        const cont = document.getElementById('rosetta-cards-container');
        if (cont && !cont.children.length) window.filterRosettaRegister("");
        else safeTypeset(cont);
      } else if (tab === 'thm') {
        const cont = document.getElementById('thm-cards-container');
        if (cont && !cont.children.length) window.filterTheoremIndex("");
        else safeTypeset(cont);
      }
    }
  };

  window.jumpToPDFPage = function(pageNum) {
    currentPDFPage = Math.max(1, parseInt(pageNum) || 1);
    const inp = document.getElementById('pdf-page-input');
    if (inp) inp.value = currentPDFPage;
    const pill = document.getElementById('fab-page-pill');
    if (pill) pill.innerText = `p. ${currentPDFPage}`;
    syncPDFIfDrawerOpen();
  };

  window.jumpToMonographChapter = function(chKey) {
    const entry = CHAPTER_PAGE_MAP[chKey];
    if (!entry) return;
    const sel = document.getElementById('monograph-chapter-select');
    if (sel) sel.value = chKey;
    window.jumpToPDFPage(entry.basePage);
    const dr = document.getElementById('syn-monograph-drawer');
    if (rawTeXCache) {
      showTeXAtAnchor(entry.texAnchor);
    } else if (dr && dr.classList.contains('open')) {
      loadRawTeXFile().then(() => showTeXAtAnchor(entry.texAnchor));
    }
  };

  window.openMonographAtPage = function(pageNum, texQuery) {
    const dr = document.getElementById('syn-monograph-drawer');
    if (dr && !dr.classList.contains('open')) {
      dr.classList.add('open');
      document.body.classList.add('mdrawer-open');
    }
    if (pageNum) window.jumpToPDFPage(pageNum);
    syncPDFIfDrawerOpen();
    if (texQuery) {
      loadRawTeXFile().then(() => {
        window.switchMonographTab('tex');
        const sb = document.getElementById('tex-search-box');
        if (sb) { sb.value = texQuery; window.searchRawTeX(texQuery); }
      });
    } else if (!rawTeXCache) {
      loadRawTeXFile();
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

  // Keyboard shortcuts: 'Ctrl+K' / '/' Omni-Search, 'M' Monograph Drawer, 'T' Slide Map, 'Escape' Close Modals
  window.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      e.stopPropagation();
      window.toggleCommandPalette();
      return;
    }
    if (e.key === 'Escape') {
      window.closeSynSpotlight && window.closeSynSpotlight();
      document.getElementById('syn-cmd-backdrop')?.classList.remove('open');
      document.getElementById('syn-radar-popover')?.classList.remove('open');
      const dr = document.getElementById('syn-monograph-drawer');
      if (dr && dr.classList.contains('open')) {
        dr.classList.remove('open');
        document.body.classList.remove('mdrawer-open');
      }
      return;
    }
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      window.toggleMonographDrawer();
    } else if (e.key === '/') {
      e.preventDefault();
      window.toggleCommandPalette();
    } else if (e.key === 't' || e.key === 'T') {
      const mapBtn = document.getElementById('syn-radar-map-btn');
      if (mapBtn) { e.preventDefault(); mapBtn.click(); }
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


  // =========================================================================
  // MASTER ARCHITECTURE & CHAPTER METADATA FOR GRAPH & OMNI-SEARCH
  // =========================================================================
  const ARCH_NODES = [
    { id: 'ch1',  num: 1,  part: 'A', x: 75,  y: 42,  color: '#4169E1', label: 'Ch 1: Subjective Topos',   page: 11,  polar: 'Stage I',   deps: [],               desc: 'Epistemic Firewall (Strata A–D), Admissible Site (Ctx, J_syn), Sheaf Topos E_syn, and Intuitionistic Modal Logic L_iMSL.' },
    { id: 'ch2',  num: 2,  part: 'A', x: 205, y: 42,  color: '#20B2AA', label: 'Ch 2: Syntrix Operads',    page: 34,  polar: 'Stage II',  deps: ['ch1'],          desc: 'Colored Operad O_syn, Free Tree Monad T_O, Grothendieck Fibration ∫M, and 4 Elementary Selection Representations.' },
    { id: 'ch3',  num: 3,  part: 'A', x: 335, y: 42,  color: '#FFA500', label: 'Ch 3: Korporationen',      page: 56,  polar: 'Stage III', deps: ['ch2'],          desc: '2×2 Korporator Matrix, Span Pushouts P_a ⊞_φ P_b, Rank-Nullity Dimension Subtraction, and Double Category Kor(Syn) with Mayer–Vietoris Homology.' },
    { id: 'ch4',  num: 4,  part: 'A', x: 465, y: 42,  color: '#DC143C', label: 'Ch 4: Enyphansyntrizen',   page: 78,  polar: 'Stage IV',  deps: ['ch1', 'ch3'],   desc: 'Principal G-Bundles, Non-Abelian Interaction Curvature Ω_int^D, Fredholm Laplacian Splitting, Atiyah Lie Algebroid At(P_U), and Chern–Weil Bogomolny Bound.' },
    { id: 'ch5',  num: 5,  part: 'A', x: 595, y: 42,  color: '#9370DB', label: 'Ch 5: Metroplextheorie',   page: 102, polar: null,        deps: ['ch2', 'ch4'],   desc: 'Ambient (∞,1)-Topos X_syn, Dendroidal Complete Segal Spaces, Syntroclinic Adjunctions, Lawvere–Schreiber Cohesion (∫ ⊣ ♭ ⊣ ♯), and Tectonic Spectral Sequence.' },
    { id: 'ch6',  num: 6,  part: 'A', x: 725, y: 42,  color: '#FFD700', label: 'Ch 6: Televariante Area',  page: 122, polar: 'Stage V',   deps: ['ch4', 'ch5'],   desc: 'Final Telecentric Path Coalgebras (νT, ζ), Lambek Isomorphism, Polyak–Łojasiewicz Lyapunov Basins, Morse–Smale Separatrices, and 2-Wasserstein Resynkolation.' },
    { id: 'ch7',  num: 7,  part: 'B', x: 110, y: 128, color: '#4169E1', label: 'Ch 7: Anthropomorphic',    page: 142, polar: 'Stage VI',  deps: ['ch1', 'ch6'],   desc: 'Quantitative Context Site Ctx_quant, Dedekind/Cauchy Internal Reals, Colored Tensor Operad O_quant, and Layered Field Cascades (SM Eq. 28).' },
    { id: 'ch8',  num: 8,  part: 'B', x: 265, y: 128, color: '#20B2AA', label: 'Ch 8: Quantitätsaspekt',   page: 158, polar: null,        deps: ['ch3', 'ch7'],   desc: 'Cornered Parameter Manifolds M_n = (R_≥0)^n, Grothendieck Nuclear Fréchet Spaces S(M_n), Double Partial Sieve (Thm. 8.1), and 3-Class Collapse.' },
    { id: 'ch9',  num: 9,  part: 'B', x: 420, y: 128, color: '#FFA500', label: 'Ch 9: Strukturkaskaden',   page: 174, polar: null,        deps: ['ch4', 'ch8'],   desc: 'Non-Hermitian 36-Component Hermetry Tensor, (n−2) Condensation Theorem, Palatini Contortion Decomposition, and DeTurck–Sobolev Parabolic Contraction.' },
    { id: 'ch10', num: 10, part: 'B', x: 575, y: 128, color: '#DC143C', label: 'Ch 10: Metronik & DEC',    page: 196, polar: 'Stage VI+', deps: ['ch8', 'ch9'],   desc: 'Elementary Metron τ, Discrete Exterior Calculus (DEC), Discrete Leibniz/Gauss–Stokes, Wronskian Determinant, and Cubical FEEC Whitney–de Rham Isomorphism.' },
    { id: 'ch11', num: 11, part: 'B', x: 725, y: 128, color: '#9370DB', label: 'Ch 11: Selektortheorie',   page: 216, polar: null,        deps: ['ch9', 'ch10'],  desc: '12D Fibration R_12 ≅ R_4 × K_8, Euclideanized Spectral Space H_E, Geometric Selector Eigenvalues, and 63-Channel Hyper-Lattice Mass Formula.' },
    { id: 'ch12', num: 12, part: 'C', x: 150, y: 214, color: '#FFD700', label: 'Ch 12: Discontinuity',     page: 236, polar: null,        deps: ['ch4', 'ch5'],   desc: 'Representational Discontinuity, 4 Cortical Mechanisms (Operadic Erasure, Protosimplex Collapse, Non-Abelian Qualia Bipartition, 6D Affective Hermetry), Zombie Refutation.' },
    { id: 'ch13', num: 13, part: 'C', x: 340, y: 214, color: '#4169E1', label: 'Ch 13: Qualia & Φ_topos',  page: 262, polar: null,        deps: ['ch6', 'ch12'],  desc: 'Topos Integrated Information Φ_topos vs IIT 4.0, Curry–Howard Lawvere Ego Fixed Point, Active Inference Sheaf Descent, and REBUS Protosimplex De-Encapsulation.' },
    { id: 'ch14', num: 14, part: 'C', x: 530, y: 214, color: '#20B2AA', label: 'Ch 14: Master Register',   page: 282, polar: null,        deps: ['ch11', 'ch13'], desc: 'Complete 8-Cluster Master Translation Register (SM-1 through SM-100a) mapping historical Heimian transcriptions to modern categorical/geometric types.' },
    { id: 'ch15', num: 15, part: 'C', x: 710, y: 214, color: '#FFD700', label: 'Ch 15: Horizon & Synthesis', page: 308, polar: null,      deps: ['ch11', 'ch13', 'ch14'], desc: 'Master Axiomatic Architecture, Five Open Conjectures, 21-Particle Empirical Mass Validation (Table B.1), Lean 4 Verification Suite, and Epistemic Closure.' }
  ];

  window.showSynToast = function(msg) {
    let t = document.getElementById('syn-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'syn-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t.__timer);
    t.__timer = setTimeout(() => t.classList.remove('show'), 2200);
  };

  // =========================================================================
  // 5. INTERACTIVE ARCHITECTURE & DEPENDENCY GRAPH RENDERER
  // =========================================================================
  let selectedArchId = 'ch1';
  window.renderArchitectureGraph = function(activeId) {
    const svgMount = document.getElementById('arch-graph-svg-mount');
    const inspMount = document.getElementById('arch-node-inspector');
    if (!svgMount || !inspMount) return;

    if (activeId) selectedArchId = activeId;
    else selectedArchId = detectActiveChKey() || 'ch1';
    if (!ARCH_NODES.some(n => n.id === selectedArchId)) selectedArchId = 'ch1';

    const nodeMap = {};
    ARCH_NODES.forEach(n => { nodeMap[n.id] = n; });
    const selNode = nodeMap[selectedArchId] || ARCH_NODES[0];

    let edgesSvg = '';
    ARCH_NODES.forEach(target => {
      target.deps.forEach(srcId => {
        const src = nodeMap[srcId];
        if (!src) return;
        const isHighlighted = (target.id === selNode.id || src.id === selNode.id);
        const stroke = isHighlighted ? '#FFD700' : 'rgba(100, 116, 139, 0.38)';
        const width = isHighlighted ? 2.4 : 1.2;
        const dash = isHighlighted ? '' : 'stroke-dasharray="3,3"';
        const mx = (src.x + target.x) / 2;
        const my = (src.y + target.y) / 2 - (src.y === target.y ? 18 : 0);
        edgesSvg += `<path d="M ${src.x} ${src.y} Q ${mx} ${my} ${target.x} ${target.y}" fill="none" stroke="${stroke}" stroke-width="${width}" ${dash}/>`;
      });
    });

    let nodesSvg = '';
    ARCH_NODES.forEach(n => {
      const isSel = n.id === selNode.id;
      const isDep = selNode.deps.includes(n.id) || n.deps.includes(selNode.id);
      const r = isSel ? 21 : 17;
      const stroke = isSel ? '#FFD700' : (isDep ? '#5eead4' : n.color);
      const sw = isSel ? 3 : 1.8;
      const shortLbl = n.label.split(':')[0];
      const subLbl = n.label.split(':')[1]?.trim().slice(0, 13) || '';
      nodesSvg += `
        <g class="arch-node" onclick="window.renderArchitectureGraph('${n.id}')">
          <circle cx="${n.x}" cy="${n.y}" r="${r}" fill="#0b1120" stroke="${stroke}" stroke-width="${sw}"/>
          <text x="${n.x}" y="${n.y + 4}" text-anchor="middle" fill="${isSel ? '#FFD700' : '#f8fafc'}" font-size="10.5" font-weight="bold">${shortLbl}</text>
          <text x="${n.x}" y="${n.y + r + 12}" text-anchor="middle" fill="#cbd5e1" font-size="9.2">${subLbl}</text>
          ${n.polar ? `<circle cx="${n.x + r - 3}" cy="${n.y - r + 3}" r="4.5" fill="#FFD700" title="${n.polar}"/>` : ''}
        </g>`;
    });

    svgMount.innerHTML = `
      <svg viewBox="0 0 800 255" width="100%" height="235" style="display:block;">
        <text x="12" y="16" fill="#82aaff" font-size="10" font-weight="bold">TEIL A: CATEGORICAL &amp; TOPOS FOUNDATIONS (CH 1–6)</text>
        <text x="12" y="102" fill="#5eead4" font-size="10" font-weight="bold">TEIL B: QUANTITATIVE, HERMETRIC &amp; METRONIC PHYSICS (CH 7–11)</text>
        <text x="12" y="188" fill="#FFD700" font-size="10" font-weight="bold">TEIL C: DISCONTINUITY, CONSCIOUSNESS &amp; HORIZON SYNTHESIS (CH 12–15)</text>
        ${edgesSvg}
        ${nodesSvg}
      </svg>`;

    const upstream = selNode.deps.map(d => nodeMap[d]?.label.split(':')[0]).filter(Boolean).join(', ') || 'Foundational Axiom Base (Stratum A)';
    const downstream = ARCH_NODES.filter(n => n.deps.includes(selNode.id)).map(n => n.label.split(':')[0]).join(', ') || 'Terminal Synthesis Horizon';

    inspMount.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div>
          <span style="color:#FFD700; font-weight:800; font-size:14px;">${selNode.label}</span>
          ${selNode.polar ? `<span style="background:rgba(255,215,0,0.18); border:1px solid #FFD700; color:#FFD700; font-size:10px; padding:1px 6px; border-radius:4px; margin-left:6px; font-weight:700;">⚡ Polarimeter ${selNode.polar}</span>` : ''}
        </div>
        <div style="display:flex; gap:6px;">
          <button class="m3d-btn" onclick="window.navigateToChapterDeck(${selNode.num})">▶ Open Ch ${selNode.num} Slides</button>
          <button class="m3d-btn" onclick="window.jumpToMonographChapter('${selNode.id}'); window.switchMonographTab('pdf');">📄 PDF p. ${selNode.page}</button>
          <button class="m3d-btn" onclick="window.jumpToMonographChapter('${selNode.id}'); window.switchMonographTab('tex');">📜 Raw TeX</button>
        </div>
      </div>
      <div style="color:#cbd5e1; line-height:1.45;">${selNode.desc}</div>
      <div style="display:flex; gap:16px; flex-wrap:wrap; font-size:11px; color:#94a3b8; border-top:1px solid #1e293b; padding-top:6px;">
        <span><b>⬅ Prerequisites:</b> <span style="color:#82aaff;">${upstream}</span></span>
        <span><b>➡ Feeds Into:</b> <span style="color:#5eead4;">${downstream}</span></span>
      </div>`;
  };

  window.navigateToChapterDeck = function(chNum, slideIdx) {
    // Close drawer or command palette if open
    document.getElementById('syn-monograph-drawer')?.classList.remove('open');
    document.body.classList.remove('mdrawer-open');
    document.getElementById('syn-cmd-backdrop')?.classList.remove('open');

    const hashSuffix = typeof slideIdx === 'number' && slideIdx > 0 ? `#/${slideIdx}` : '';
    if (typeof window.selectChapter === 'function') {
      window.selectChapter(chNum, hashSuffix);
    } else if (window.parent && window.parent !== window && typeof window.parent.selectChapter === 'function') {
      window.parent.selectChapter(chNum, hashSuffix);
    } else {
      window.location.href = `chapter${chNum}.html${hashSuffix}`;
    }
  };

  // =========================================================================
  // 1. OMNI-SEARCH COMMAND PALETTE (Ctrl+K / Cmd+K)
  // =========================================================================
  let cmdFilterMode = 'all';
  let cmdSelectedIdx = 0;
  let cmdCurrentItems = [];

  function ensureCommandPaletteDOM() {
    if (document.getElementById('syn-cmd-backdrop')) return;
    const bd = document.createElement('div');
    bd.id = 'syn-cmd-backdrop';
    bd.setAttribute('data-prevent-swipe', 'true');
    bd.onclick = e => { if (e.target === bd) window.toggleCommandPalette(); };
    bd.innerHTML = `
      <div id="syn-cmd-modal">
        <div class="cmd-header">
          <span class="cmd-search-icon">🔍</span>
          <input type="text" id="syn-cmd-input" placeholder="Omni-Search 214 Slides, 15 Chapters, 380+ Theorems, Lean 4 &amp; SM Eqs. 1–100a..." autocomplete="off">
          <span class="cmd-kbd">ESC</span>
        </div>
        <div class="cmd-filters">
          <button class="cmd-filter-pill active" data-f="all" onclick="window.setCmdFilter('all')">All</button>
          <button class="cmd-filter-pill" data-f="slides" onclick="window.setCmdFilter('slides')">📑 Active Deck Slides</button>
          <button class="cmd-filter-pill" data-f="chapters" onclick="window.setCmdFilter('chapters')">🏛️ Chapters 1–15</button>
          <button class="cmd-filter-pill" data-f="thm" onclick="window.setCmdFilter('thm')">📐 Theorems &amp; Lean 4</button>
          <button class="cmd-filter-pill" data-f="sm" onclick="window.setCmdFilter('sm')">🔍 SM Equations</button>
          <button class="cmd-filter-pill" data-f="labs" onclick="window.setCmdFilter('labs')">⚡ Interactive Labs</button>
        </div>
        <div id="syn-cmd-results"></div>
        <div class="cmd-footer">
          <span><kbd class="cmd-kbd">↑</kbd> <kbd class="cmd-kbd">↓</kbd> Navigate &nbsp;·&nbsp; <kbd class="cmd-kbd">Enter</kbd> Jump / Open &nbsp;·&nbsp; <kbd class="cmd-kbd">Ctrl+K</kbd> Toggle</span>
          <span style="display:flex; align-items:center; gap:8px;">
            <a href="javascript:void(0)" onclick="window.openVisitTelemetryModal ? window.openVisitTelemetryModal(event) : null" style="display:inline-flex; align-items:center; text-decoration:none;" title="Site Visit Telemetry Ledger">
              <img class="syn-counter-badge-img" alt="Visits" height="14" style="display:none;" />
              <span class="syn-counter-fallback" style="display:none; font-size:11px; color:#60a5fa; font-weight:700;">VISITS <span class="syn-visit-count-display">1</span></span>
            </a>
            <span id="syn-cmd-count">Ready</span>
          </span>
        </div>
      </div>`;
    document.body.appendChild(bd);

    const inp = document.getElementById('syn-cmd-input');
    if (inp) {
      inp.addEventListener('input', () => renderCommandPaletteResults());
      inp.addEventListener('keydown', e => {
        e.stopPropagation();
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          cmdSelectedIdx = Math.min(cmdCurrentItems.length - 1, cmdSelectedIdx + 1);
          highlightCmdSelection();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          cmdSelectedIdx = Math.max(0, cmdSelectedIdx - 1);
          highlightCmdSelection();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (cmdCurrentItems[cmdSelectedIdx]) cmdCurrentItems[cmdSelectedIdx].action();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          window.toggleCommandPalette();
        }
      });
    }
  }

  window.setCmdFilter = function(mode) {
    cmdFilterMode = mode || 'all';
    document.querySelectorAll('.cmd-filter-pill').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-f') === cmdFilterMode);
    });
    renderCommandPaletteResults();
  };

  window.toggleCommandPalette = function(initialFilter) {
    ensureCommandPaletteDOM();
    const bd = document.getElementById('syn-cmd-backdrop');
    if (!bd) return;
    const willOpen = !bd.classList.contains('open');
    bd.classList.toggle('open', willOpen);
    if (willOpen) {
      if (!rawTeXCache) loadRawTeXFile().then(() => renderCommandPaletteResults());
      if (initialFilter) window.setCmdFilter(initialFilter);
      else renderCommandPaletteResults();
      setTimeout(() => {
        const inp = document.getElementById('syn-cmd-input');
        if (inp) { inp.focus(); inp.select(); }
      }, 40);
    }
  };

  function collectActiveDeckSlides() {
    let doc = document;
    let revWin = window;
    const frame = document.getElementById('chapter-frame');
    if (frame && frame.contentDocument && frame.contentWindow) {
      doc = frame.contentDocument;
      revWin = frame.contentWindow;
    }
    const sections = Array.from(doc.querySelectorAll('.reveal .slides > section'));
    return sections.map((sec, idx) => {
      const h = sec.querySelector('h1, h2, h3');
      const title = h ? h.textContent.replace(/\s+/g, ' ').trim() : `Slide ${idx + 1}`;
      const hasLab = !!sec.querySelector('.interactive-panel, input[type="range"], .syn-tabs');
      const hasVid = !!sec.querySelector('video');
      const hasProof = !!sec.querySelector('.proof-box');
      const stratum = detectSlideStratum(sec);
      const bodySnippet = (sec.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 260);
      return {
        idx,
        title,
        stratum,
        hasLab,
        hasVid,
        hasProof,
        bodySnippet,
        jump: () => {
          document.getElementById('syn-cmd-backdrop')?.classList.remove('open');
          if (revWin.Reveal && typeof revWin.Reveal.slide === 'function') {
            revWin.Reveal.slide(idx);
          }
        }
      };
    });
  }

  function renderCommandPaletteResults() {
    const cont = document.getElementById('syn-cmd-results');
    const inp = document.getElementById('syn-cmd-input');
    const countEl = document.getElementById('syn-cmd-count');
    if (!cont) return;

    const q = (inp ? inp.value : '').trim().toLowerCase();
    const items = [];

    // 1. Active Deck Slides
    if (cmdFilterMode === 'all' || cmdFilterMode === 'slides' || cmdFilterMode === 'labs') {
      const slides = collectActiveDeckSlides();
      slides.forEach(s => {
        if (cmdFilterMode === 'labs' && !s.hasLab) return;
        if (!q || s.title.toLowerCase().includes(q) || s.bodySnippet.toLowerCase().includes(q) || s.stratum.label.toLowerCase().includes(q)) {
          items.push({
            color: s.stratum.color,
            title: `Slide ${s.idx + 1}: ${s.title}`,
            sub: `${s.stratum.label}${s.hasLab ? ' · ⚡ Interactive Lab' : ''}${s.hasVid ? ' · 🎬 Manim Video' : ''}${s.hasProof ? ' · 📐 Proof' : ''}`,
            badge: `SLIDE ${s.idx + 1}`,
            badgeBg: s.stratum.color,
            action: s.jump
          });
        }
      });
    }

    // 2. All 15 Chapters
    if (cmdFilterMode === 'all' || cmdFilterMode === 'chapters' || cmdFilterMode === 'labs') {
      ARCH_NODES.forEach(ch => {
        if (!q || ch.label.toLowerCase().includes(q) || ch.desc.toLowerCase().includes(q) || (ch.polar && ch.polar.toLowerCase().includes(q))) {
          items.push({
            color: ch.color,
            title: ch.label,
            sub: `${ch.desc.slice(0, 115)}...`,
            badge: `CH ${ch.num} · p.${ch.page}`,
            badgeBg: ch.color,
            action: () => window.navigateToChapterDeck(ch.num)
          });
        }
      });
    }

    // 3. Parsed TeX Theorems & Lean 4
    if (cmdFilterMode === 'all' || cmdFilterMode === 'thm') {
      const thmList = parsedTheorems.slice(0, 400);
      for (const t of thmList) {
        if (!q || t.title.toLowerCase().includes(q) || t.label.toLowerCase().includes(q) || t.preview.toLowerCase().includes(q)) {
          const cleanEnv = t.env.replace('my', '').toUpperCase();
          const col = t.env.includes('lean') ? '#a78bfa' : (t.env.includes('theorem') ? '#FFD700' : '#20B2AA');
          items.push({
            color: col,
            title: `${cleanEnv}: ${t.title}`,
            sub: t.preview.replace(/\s+/g, ' ').slice(0, 110) + '...',
            badge: `p. ${t.page}`,
            badgeBg: col,
            action: () => {
              document.getElementById('syn-cmd-backdrop')?.classList.remove('open');
              window.openMonographAtPage(t.page, t.anchor);
            }
          });
          if (items.length > 75) break;
        }
      }
    }

    // 4. SM Equations 1-100a
    if (cmdFilterMode === 'all' || cmdFilterMode === 'sm') {
      const smList = parsedSMEquations.length ? [...FALLBACK_ROSETTA, ...parsedSMEquations] : FALLBACK_ROSETTA;
      for (const sm of smList) {
        if (!q || sm.eq.toLowerCase().includes(q) || sm.d.toLowerCase().includes(q) || sm.r.toLowerCase().includes(q)) {
          items.push({
            color: '#FFA500',
            title: `${sm.eq} (${sm.ch})`,
            sub: sm.r.slice(0, 110),
            badge: `PDF p. ${sm.page}`,
            badgeBg: '#FFA500',
            action: () => {
              document.getElementById('syn-cmd-backdrop')?.classList.remove('open');
              window.openMonographAtPage(sm.page, sm.tex);
            }
          });
          if (items.length > 90) break;
        }
      }
    }

    cmdCurrentItems = items.slice(0, 60);
    cmdSelectedIdx = 0;
    if (countEl) countEl.textContent = `${cmdCurrentItems.length} result${cmdCurrentItems.length === 1 ? '' : 's'}`;

    if (!cmdCurrentItems.length) {
      cont.innerHTML = `<div style="padding:18px; text-align:center; color:#94a3b8;">No matching slides, theorems, or SM equations found for "<b>${q.replace(/</g, '&lt;')}</b>".</div>`;
      return;
    }

    cont.innerHTML = cmdCurrentItems.map((it, i) => `
      <div class="cmd-item ${i === 0 ? 'selected' : ''}" data-idx="${i}" style="border-left-color:${it.color};">
        <div class="cmd-item-main">
          <div class="cmd-item-title">${it.title.replace(/</g, '&lt;')}</div>
          <div class="cmd-item-sub">${it.sub.replace(/</g, '&lt;')}</div>
        </div>
        <div class="cmd-item-badges">
          <span class="cmd-badge" style="background:rgba(255,255,255,0.07); border:1px solid ${it.badgeBg}; color:${it.badgeBg};">${it.badge}</span>
        </div>
      </div>`).join('');

    cont.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-idx') || '0');
        if (cmdCurrentItems[idx]) cmdCurrentItems[idx].action();
      });
    });
  }

  function highlightCmdSelection() {
    const cont = document.getElementById('syn-cmd-results');
    if (!cont) return;
    const rows = cont.querySelectorAll('.cmd-item');
    rows.forEach((r, i) => {
      const sel = i === cmdSelectedIdx;
      r.classList.toggle('selected', sel);
      if (sel) r.scrollIntoView({ block: 'nearest' });
    });
  }

  // =========================================================================
  // 2, 3, 4. SLIDE-DECK ENHANCEMENTS:
  //    - Epistemic Stratum Radar & Slide Minimap (#syn-stratum-radar)
  //    - Smart Callout Micro-Toolbar (.syn-box-toolbar)
  //    - Manim Video Cinema HUD (.syn-video-hud)
  //    - Lecture Spotlight & Cinema Modal (#syn-spotlight-modal)
  // =========================================================================
  function detectSlideStratum(sec) {
    if (!sec) return { code: 'A', label: 'STRATUM A · MATH', color: '#4169E1' };
    const html = sec.innerHTML || '';
    if (sec.querySelector('.badge-firewall, .firewall-box') || html.includes('EPISTEMIC FIREWALL')) {
      return { code: 'FW', label: 'FIREWALL · BOUNDARY', color: '#DC143C' };
    }
    if (sec.querySelector('.badge-c, .tag-c') || html.includes('STRATUM C')) {
      return { code: 'C', label: 'STRATUM C · RECON ℛ', color: '#FFA500' };
    }
    if (sec.querySelector('.badge-b, .tag-b') || html.includes('STRATUM B')) {
      return { code: 'B', label: 'STRATUM B · THEOREM', color: '#20B2AA' };
    }
    if (sec.querySelector('.badge-d, .tag-d') || html.includes('STRATUM D')) {
      return { code: 'D', label: 'STRATUM D · EXEGESIS', color: '#94a3b8' };
    }
    if (sec.querySelector('.badge-a, .tag-a') || html.includes('STRATUM A')) {
      return { code: 'A', label: 'STRATUM A · FOUNDATIONS', color: '#4169E1' };
    }
    return { code: 'SYN', label: 'SYNTHESIS & OVERVIEW', color: '#FFD700' };
  }

  function ensureSpotlightModal() {
    let modal = document.getElementById('syn-spotlight-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'syn-spotlight-modal';
    modal.setAttribute('data-prevent-swipe', 'true');
    modal.onclick = e => { if (e.target === modal) window.closeSynSpotlight(); };
    modal.innerHTML = `
      <div class="spotlight-card">
        <div class="spotlight-header">
          <span id="syn-spotlight-title">🔍 Syntrometric Lecture Spotlight</span>
          <div style="display:flex; gap:6px;">
            <button class="m3d-btn" id="syn-spotlight-copy-btn">📋 Copy LaTeX / Text</button>
            <button class="m3d-btn" onclick="window.closeSynSpotlight()" style="background:#DC143C; color:#fff; border-color:#DC143C;">✕ Close (Esc)</button>
          </div>
        </div>
        <div id="syn-spotlight-body"></div>
      </div>`;
    document.body.appendChild(modal);
    return modal;
  }

  window.closeSynSpotlight = function() {
    const modal = document.getElementById('syn-spotlight-modal');
    if (modal) {
      modal.classList.remove('open');
      const body = document.getElementById('syn-spotlight-body');
      if (body) body.innerHTML = '';
    }
  };

  function extractCleanTextWithLaTeX(el) {
    if (!el) return '';
    const clone = el.cloneNode(true);
    clone.querySelectorAll('.syn-box-toolbar, .syn-video-hud').forEach(t => t.remove());
    return (clone.innerText || clone.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
  }

  function initSlideDeckEnhancements() {
    const slidesRoot = document.querySelector('.reveal .slides');
    if (!slidesRoot) return; // Only mount inside Reveal slide decks

    // A. Mount Slide Minimap & Epistemic Stratum Radar Bar
    if (!document.getElementById('syn-stratum-radar')) {
      const sections = Array.from(slidesRoot.querySelectorAll(':scope > section'));
      const radar = document.createElement('div');
      radar.id = 'syn-stratum-radar';
      radar.setAttribute('data-prevent-swipe', 'true');

      const segsHtml = sections.map((sec, idx) => {
        const st = detectSlideStratum(sec);
        return `<div class="radar-seg ${idx === 0 ? 'active' : ''}" data-slide="${idx}" style="background:${st.color};"></div>`;
      }).join('');

      radar.innerHTML = `
        <span id="syn-radar-stratum-pill">STRATUM A</span>
        <div class="radar-segments">${segsHtml}</div>
        <button class="radar-btn" id="syn-radar-map-btn" title="Toggle Chapter Slide Map &amp; Stratum Filter (Shortcut: T)">🗺️ Map</button>
        <button class="radar-btn" onclick="window.toggleActiveMorphSpotlight()" title="Expand / Spotlight 3D Morph Stage Engine (Shortcut: G)">🧊 3D</button>
        <button class="radar-btn" onclick="window.toggleCommandPalette('slides')" title="Omni-Search Slides, Theorems &amp; SM Equations (Ctrl+K)">🔍</button>`;
      document.body.appendChild(radar);

      const tooltip = document.createElement('div');
      tooltip.id = 'syn-radar-tooltip';
      document.body.appendChild(tooltip);

      const pop = document.createElement('div');
      pop.id = 'syn-radar-popover';
      pop.setAttribute('data-prevent-swipe', 'true');
      pop.innerHTML = `
        <div class="radar-pop-header">
          <span>🗺️ Slide Navigator &amp; Epistemic Stratum Filter (${sections.length} Slides)</span>
          <button class="syn-vid-btn" id="syn-radar-pop-close">✕</button>
        </div>
        <div class="radar-pop-filters">
          <button class="cmd-filter-pill active" data-rf="ALL">All (${sections.length})</button>
          <button class="cmd-filter-pill" data-rf="A" style="color:#82aaff;">Stratum A</button>
          <button class="cmd-filter-pill" data-rf="B" style="color:#5eead4;">Stratum B</button>
          <button class="cmd-filter-pill" data-rf="C" style="color:#fcd34d;">Stratum C</button>
          <button class="cmd-filter-pill" data-rf="D" style="color:#cbd5e1;">Stratum D</button>
          <button class="cmd-filter-pill" data-rf="LAB" style="color:#FFD700;">⚡ Labs</button>
        </div>
        <div class="radar-pop-list" id="syn-radar-pop-list"></div>`;
      document.body.appendChild(pop);

      let activeRadarFilter = 'ALL';
      const renderRadarPopList = () => {
        const listEl = document.getElementById('syn-radar-pop-list');
        if (!listEl) return;
        const curH = (window.Reveal && typeof window.Reveal.getIndices === 'function') ? (window.Reveal.getIndices().h || 0) : 0;
        listEl.innerHTML = sections.map((sec, idx) => {
          const st = detectSlideStratum(sec);
          const hasLab = !!sec.querySelector('.interactive-panel, input[type="range"]');
          const hasVid = !!sec.querySelector('video');
          if (activeRadarFilter === 'LAB' && !hasLab) return '';
          if (['A', 'B', 'C', 'D'].includes(activeRadarFilter) && st.code !== activeRadarFilter) return '';
          const h = sec.querySelector('h1, h2, h3');
          const title = h ? h.textContent.replace(/\s+/g, ' ').trim() : `Slide ${idx + 1}`;
          return `
            <div class="radar-slide-row ${idx === curH ? 'active' : ''}" data-jump="${idx}" style="border-left-color:${st.color};">
              <div style="min-width:0; flex:1;">
                <div style="font-weight:700; color:#f8fafc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${idx + 1}. ${title.replace(/</g, '&lt;')}</div>
                <div style="font-size:10px; color:#94a3b8;">${st.label}</div>
              </div>
              <div style="display:flex; gap:4px; flex-shrink:0; font-size:11px;">
                ${hasLab ? '<span title="Interactive Lab">⚡</span>' : ''}
                ${hasVid ? '<span title="Manim 3D Video">🎬</span>' : ''}
              </div>
            </div>`;
        }).join('');
        listEl.querySelectorAll('.radar-slide-row').forEach(r => {
          r.onclick = () => {
            const idx = parseInt(r.getAttribute('data-jump') || '0');
            if (window.Reveal && typeof window.Reveal.slide === 'function') window.Reveal.slide(idx);
            pop.classList.remove('open');
          };
        });
      };

      document.getElementById('syn-radar-map-btn')?.addEventListener('click', () => {
        const willOpen = !pop.classList.contains('open');
        pop.classList.toggle('open', willOpen);
        if (willOpen) renderRadarPopList();
      });
      document.getElementById('syn-radar-pop-close')?.addEventListener('click', () => pop.classList.remove('open'));
      pop.querySelectorAll('.cmd-filter-pill').forEach(btn => {
        btn.onclick = () => {
          activeRadarFilter = btn.getAttribute('data-rf') || 'ALL';
          pop.querySelectorAll('.cmd-filter-pill').forEach(b => b.classList.toggle('active', b === btn));
          renderRadarPopList();
        };
      });

      radar.querySelectorAll('.radar-seg').forEach(seg => {
        const idx = parseInt(seg.getAttribute('data-slide') || '0');
        seg.addEventListener('mouseenter', () => {
          const sec = sections[idx];
          if (!sec) return;
          const st = detectSlideStratum(sec);
          const h = sec.querySelector('h1, h2, h3');
          const title = h ? h.textContent.replace(/\s+/g, ' ').trim() : `Slide ${idx + 1}`;
          const hasLab = !!sec.querySelector('.interactive-panel, input[type="range"]');
          const hasVid = !!sec.querySelector('video');
          tooltip.innerHTML = `
            <div style="color:${st.color}; font-weight:800; font-size:10px; letter-spacing:0.6px;">SLIDE ${idx + 1} / ${sections.length} · ${st.label}</div>
            <div style="font-weight:700; margin:2px 0;">${title.replace(/</g, '&lt;')}</div>
            <div style="font-size:10.5px; color:#94a3b8;">${hasLab ? '⚡ Interactive Lab  ' : ''}${hasVid ? '🎬 Manim Animation' : ''}</div>`;
          tooltip.style.display = 'block';
        });
        seg.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
        });
        seg.addEventListener('click', () => {
          if (window.Reveal && typeof window.Reveal.slide === 'function') window.Reveal.slide(idx);
        });
      });

      const updateRadarActiveSlide = () => {
        const idx = (window.Reveal && typeof window.Reveal.getIndices === 'function') ? (window.Reveal.getIndices().h || 0) : 0;
        const sec = sections[idx];
        const st = detectSlideStratum(sec);
        const pill = document.getElementById('syn-radar-stratum-pill');
        if (pill) {
          pill.textContent = `${idx + 1}/${sections.length} · ${st.label.split('·')[0].trim()}`;
          pill.style.borderColor = st.color;
          pill.style.color = st.color;
          pill.style.background = 'rgba(7, 10, 18, 0.9)';
        }
        radar.querySelectorAll('.radar-seg').forEach((s, i) => s.classList.toggle('active', i === idx));
      };

      if (window.Reveal) {
        window.Reveal.on('ready', updateRadarActiveSlide);
        window.Reveal.on('slidechanged', updateRadarActiveSlide);
      }
      setTimeout(updateRadarActiveSlide, 150);
    }

    // B. Enhance all Mathematical Callout Boxes & Interactive Panels with Micro-Toolbar
    const callouts = slidesRoot.querySelectorAll('.thm-box, .def-box, .prop-box, .proof-box, .carnap-box, .scholium-box, .firewall-box, .deliverables-box, .interactive-panel');
    callouts.forEach(box => {
      if (box.querySelector(':scope > .syn-box-toolbar')) return;
      const tb = document.createElement('div');
      tb.className = 'syn-box-toolbar';
      tb.setAttribute('data-prevent-swipe', 'true');

      const isLab = box.classList.contains('interactive-panel');
      const titleEl = box.querySelector('.box-title, .proof-title, .carnap-title, .scholium-title, .panel-title, h4, b, strong');
      const boxTitle = titleEl ? titleEl.textContent.replace(/\s+/g, ' ').trim() : (isLab ? 'Interactive Laboratory' : 'Mathematical Callout');

      if (!isLab) {
        const texBtn = document.createElement('button');
        texBtn.className = 'syn-micro-btn';
        texBtn.innerHTML = '📖 TeX';
        texBtn.title = 'Open & Sync this Theorem/Definition in Syntrometric-Topos.tex & PDF';
        texBtn.onclick = e => {
          e.stopPropagation();
          const chKey = detectActiveChKey();
          const basePage = CHAPTER_PAGE_MAP[chKey]?.basePage || 11;
          const mSm = boxTitle.match(/SM[-\s]*(?:Eq\.?\s*)?(\d+[a-z]?)/i);
          const query = mSm ? `SM-${mSm[1]}` : boxTitle.replace(/^(?:Theorem|Definition|Proposition|Lemma|Corollary|Carnap|Scholium)\s*[\d.]+\s*[:(]?\s*/i, '').slice(0, 38);
          window.openMonographAtPage(basePage, query);
        };
        tb.appendChild(texBtn);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'syn-micro-btn';
        copyBtn.innerHTML = '📋 Copy';
        copyBtn.title = 'Copy Theorem / Formula Statement to Clipboard';
        copyBtn.onclick = e => {
          e.stopPropagation();
          const txt = extractCleanTextWithLaTeX(box);
          if (navigator.clipboard) {
            navigator.clipboard.writeText(txt).then(() => window.showSynToast('✓ Copied Statement & Math to Clipboard'));
          }
        };
        tb.appendChild(copyBtn);
      }

      const spotBtn = document.createElement('button');
      spotBtn.className = 'syn-micro-btn';
      spotBtn.innerHTML = '⛶ Focus';
      spotBtn.title = 'Expand in Full-Screen Lecture Spotlight Modal';
      spotBtn.onclick = e => {
        e.stopPropagation();
        const modal = ensureSpotlightModal();
        const hdr = document.getElementById('syn-spotlight-title');
        const body = document.getElementById('syn-spotlight-body');
        const cpBtn = document.getElementById('syn-spotlight-copy-btn');
        if (hdr) hdr.textContent = `🔍 ${boxTitle}`;
        if (body) {
          body.innerHTML = '';
          const clone = box.cloneNode(true);
          clone.querySelectorAll('.syn-box-toolbar').forEach(t => t.remove());
          clone.classList.remove('fragment', 'fade-up', 'fade-left', 'fade-right', 'zoom-in', 'blur-in');
          clone.style.fontSize = '1.08em';
          clone.style.margin = '0';
          body.appendChild(clone);
          safeTypeset(body);
        }
        if (cpBtn) {
          cpBtn.onclick = () => {
            const txt = extractCleanTextWithLaTeX(box);
            if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => window.showSynToast('✓ Copied to Clipboard'));
          };
        }
        modal.classList.add('open');
      };
      tb.appendChild(spotBtn);

      box.appendChild(tb);
    });

    // C. Enhance all Manim Videos with Cinema HUD & Playback Speed Controls
    const vidContainers = slidesRoot.querySelectorAll('.video-container, .video-card');
    vidContainers.forEach(vc => {
      if (vc.querySelector('.syn-video-hud')) return;
      const vid = vc.querySelector('video');
      if (!vid) return;

      const hud = document.createElement('div');
      hud.className = 'syn-video-hud';
      hud.setAttribute('data-prevent-swipe', 'true');

      const playBtn = document.createElement('button');
      playBtn.className = 'syn-vid-btn';
      playBtn.textContent = '⏸';
      playBtn.title = 'Play / Pause Manim Scene';
      playBtn.onclick = e => {
        e.stopPropagation();
        if (vid.paused) { vid.play(); playBtn.textContent = '⏸'; }
        else { vid.pause(); playBtn.textContent = '▶'; }
      };

      const speeds = [0.5, 1.0, 1.5, 2.0];
      let spIdx = 1;
      const speedBtn = document.createElement('button');
      speedBtn.className = 'syn-vid-btn';
      speedBtn.textContent = '1.0×';
      speedBtn.title = 'Cycle Playback Speed (0.5×, 1.0×, 1.5×, 2.0×)';
      speedBtn.onclick = e => {
        e.stopPropagation();
        spIdx = (spIdx + 1) % speeds.length;
        vid.playbackRate = speeds[spIdx];
        speedBtn.textContent = `${speeds[spIdx].toFixed(1)}×`;
        window.showSynToast(`🎬 Manim Playback Speed: ${speeds[spIdx].toFixed(1)}×`);
      };

      const restartBtn = document.createElement('button');
      restartBtn.className = 'syn-vid-btn';
      restartBtn.textContent = '↺';
      restartBtn.title = 'Restart Animation from t = 0';
      restartBtn.onclick = e => {
        e.stopPropagation();
        vid.currentTime = 0;
        vid.play();
        playBtn.textContent = '⏸';
      };

      const theaterBtn = document.createElement('button');
      theaterBtn.className = 'syn-vid-btn';
      theaterBtn.textContent = '⛶';
      theaterBtn.title = 'Open Manim Scene in Cinema Theater Lightbox';
      theaterBtn.onclick = e => {
        e.stopPropagation();
        const modal = ensureSpotlightModal();
        const capEl = vc.querySelector('.video-caption, .video-label');
        const capTxt = capEl ? capEl.textContent.trim() : 'Manim 3D Mathematical Scene';
        const hdr = document.getElementById('syn-spotlight-title');
        const body = document.getElementById('syn-spotlight-body');
        if (hdr) hdr.textContent = `🎬 ${capTxt}`;
        if (body) {
          const src = vid.getAttribute('src') || vid.querySelector('source')?.getAttribute('src') || '';
          body.innerHTML = `
            <video src="${src}" autoplay loop muted playsinline controls style="width:100%; max-height:72vh; border-radius:10px; border:1px solid #4169E1;"></video>
            <div style="text-align:center; color:#FFD700; font-size:0.95rem; font-weight:700; margin-top:10px;">${capTxt.replace(/</g, '&lt;')}</div>`;
        }
        modal.classList.add('open');
      };

      hud.appendChild(playBtn);
      hud.appendChild(speedBtn);
      hud.appendChild(restartBtn);
      hud.appendChild(theaterBtn);
      vc.appendChild(hud);
    });

    // D. Upgrade all 3D Morph Stage HUDs with Auto-Morph Cinema Tour & 10-Stage Quick-Jump Pill Strip
    setTimeout(initMorphHUDUpgrades, 220);
  }

  window.toggleActiveMorphSpotlight = function() {
    for (let ch = 1; ch <= 15; ch++) {
      const hudId = ch === 2 ? 'syntrix-3d-hud' : `ch${ch}-3d-hud`;
      const hud = document.getElementById(hudId);
      if (hud && hud.style.display !== 'none') {
        const spotFn = ch === 2 ? window.toggle3DSpotlight : window[`toggleCh${ch}Spotlight`];
        if (typeof spotFn === 'function') {
          spotFn();
          return;
        }
      }
    }
  };

  function initMorphHUDUpgrades() {
    for (let ch = 1; ch <= 15; ch++) {
      const hudId = ch === 2 ? 'syntrix-3d-hud' : `ch${ch}-3d-hud`;
      const hud = document.getElementById(hudId);
      if (!hud || hud.dataset.synUpgraded === '1') continue;
      hud.dataset.synUpgraded = '1';

      const setStageFn = ch === 2 ? window.set3DStage : window[`setCh${ch}Stage`];
      const sliderId = ch === 2 ? 'syntrix-slider' : `ch${ch}-slider`;
      const controls = hud.querySelector('.ch' + ch + '-hud-controls, .syntrix-hud-controls, [class*="-hud-controls"]');
      const scrubber = hud.querySelector('.ch' + ch + '-scrubber, .syntrix-scrubber, [class*="-scrubber"]');

      let tourRaf = null;
      let tourPlaying = false;

      const stopTour = () => {
        tourPlaying = false;
        if (tourRaf) cancelAnimationFrame(tourRaf);
        tourRaf = null;
        const tBtn = hud.querySelector('.syn-morph-tour-btn');
        if (tBtn) {
          tBtn.classList.remove('playing');
          tBtn.textContent = '▶ Tour';
        }
      };

      // 1. Inject ▶ Tour (Continuous 60fps Auto-Morph) Button into HUD Header Controls
      if (controls && typeof setStageFn === 'function') {
        const tourBtn = document.createElement('button');
        tourBtn.className = (controls.querySelector('button')?.className.replace(/active/g, '').trim() || 'ch1-hud-btn') + ' syn-morph-tour-btn';
        tourBtn.textContent = '▶ Tour';
        tourBtn.title = 'Play / Pause Continuous 60fps 10-Stage 3D Morph Cinema Tour';
        tourBtn.onclick = e => {
          e.stopPropagation();
          if (tourPlaying) {
            stopTour();
            return;
          }
          tourPlaying = true;
          hud.classList.remove('minimized');
          const minBtn = document.getElementById(ch === 2 ? 'syntrix-btn-min' : `ch${ch}-btn-min`);
          if (minBtn) minBtn.textContent = '—';
          tourBtn.classList.add('playing');
          tourBtn.textContent = '⏸ Tour';

          let lastTs = performance.now();
          const stepTour = now => {
            if (!tourPlaying) return;
            const dt = Math.min(0.05, (now - lastTs) * 0.001);
            lastTs = now;
            const sl = document.getElementById(sliderId);
            let cur = sl ? parseFloat(sl.value) || 1.0 : 1.0;
            cur += dt * 0.68; // Smoothly traverse 1 stage every ~1.47 seconds
            if (cur > 10.0) cur = 1.0;
            setStageFn(cur, true);
            updatePillHighlight(Math.round(cur));
            tourRaf = requestAnimationFrame(stepTour);
          };
          tourRaf = requestAnimationFrame(stepTour);
        };
        controls.insertBefore(tourBtn, controls.firstChild);
      }

      // 2. Inject Interactive 10-Stage Quick-Jump Pill Strip (1..10) + 🔗 Slide Sync Button
      if (scrubber && typeof setStageFn === 'function') {
        const pillBar = document.createElement('div');
        pillBar.className = 'syn-morph-pills';
        pillBar.setAttribute('data-prevent-swipe', 'true');

        for (let s = 1; s <= 10; s++) {
          const p = document.createElement('button');
          p.className = 'syn-morph-pill' + (s === 1 ? ' active' : '');
          p.textContent = String(s);
          p.title = `Jump 3D Engine to Stage ${s} / 10`;
          p.dataset.st = String(s);
          p.onclick = e => {
            e.stopPropagation();
            stopTour();
            setStageFn(s, true);
            updatePillHighlight(s);
          };
          pillBar.appendChild(p);
        }

        const jumpSlideBtn = document.createElement('button');
        jumpSlideBtn.className = 'syn-morph-slide-btn';
        jumpSlideBtn.textContent = '🔗 Slide';
        jumpSlideBtn.title = 'Jump Slide Deck to Match Current 3D Morph Stage';
        jumpSlideBtn.onclick = e => {
          e.stopPropagation();
          const sl = document.getElementById(sliderId);
          const stVal = sl ? parseFloat(sl.value) || 1.0 : 1.0;
          if (window.Reveal && typeof window.Reveal.getTotalSlides === 'function') {
            const tot = Math.max(1, window.Reveal.getTotalSlides());
            const targetIdx = Math.round(((stVal - 1.0) / 9.0) * (tot - 1));
            window.Reveal.slide(targetIdx);
            window.showSynToast(`🔗 Jumped to Slide ${targetIdx + 1} (Morph Stage ${Math.round(stVal)})`);
          }
        };
        pillBar.appendChild(jumpSlideBtn);

        scrubber.parentNode.insertBefore(pillBar, scrubber.nextSibling);

        function updatePillHighlight(activeInt) {
          pillBar.querySelectorAll('.syn-morph-pill').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.st || '0') === activeInt);
          });
        }

        const slEl = document.getElementById(sliderId);
        if (slEl) {
          slEl.addEventListener('input', () => {
            stopTour();
            updatePillHighlight(Math.round(parseFloat(slEl.value) || 1));
          });
        }

        // Hook into setStageFn so automatic slide changes also update the active stage pill
        const origSetStage = ch === 2 ? window.set3DStage : window[`setCh${ch}Stage`];
        if (typeof origSetStage === 'function' && !origSetStage.__synWrapped) {
          const wrapped = function(val, manual) {
            origSetStage(val, manual);
            updatePillHighlight(Math.round(parseFloat(val) || 1));
          };
          wrapped.__synWrapped = true;
          if (ch === 2) window.set3DStage = wrapped;
          else window[`setCh${ch}Stage`] = wrapped;
        }
      }
    }
  }

  function initMonographWorkbench() {
    updateWindowsTrayAvoidance();
    injectDOM();
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

  let morphSyncRaf = false;
  const triggerMorphStageSync = () => {
    if (morphSyncRaf) return;
    morphSyncRaf = true;
    requestAnimationFrame(() => {
      morphSyncRaf = false;
      for (let ch = 1; ch <= 15; ch++) {
        const fnName = ch === 2 ? 'sync3DWithDeck' : `syncCh${ch}WithDeck`;
        if (typeof window[fnName] === 'function') {
          try { window[fnName](); } catch (_) {}
        }
      }
    });
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
