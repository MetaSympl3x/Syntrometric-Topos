/**
 * =========================================================================
 * SYNTROMETRIC & HEIM MASTER TEX MACROS (UNIFIED SHARED REGISTER)
 * Comprehensive LaTeX math macros across Syntrometric-Topos.tex, Chapters 1-15,
 * Monograph Workbench, Rosetta Register & Lean 4 Formalizations.
 * Restores \shift, \Shift, \cspine, \Cspine, \AP, \ap, \Stab, \stab, \Kor, etc.
 * Auto-registers with MathJax v3 / v2, RevealMath, and window.SYN_TEX_MACROS.
 * =========================================================================
 */
(function() {
  const MASTER_TEX_MACROS = {
  "closingtransition": [
    "%\n  \\par\n  \\setbox\\transFitBox=\\vbox{%\n    \\hsize=\\textwidth\\linewidth=\\textwidth\n    \\vspace{10pt}%\n    \\noindent\\color{maincolor!30!black}\\rule{\\textwidth}{0.4pt}\\par\\vspace{6pt}%\n    \\noindent\\small\\sffamily\\color{black!85}%\n    \\textbf{Syntrometric Dialectical Transition:}\\space\\textit{#1}%\n    \\par\n  }%\n  \\transFitNeed=\\dimexpr\\ht\\transFitBox+\\dp\\transFitBox+14pt\\relax\n  \\transFitAvail=\\dimexpr\\pagegoal-\\pagetotal\\relax\n  \\ifdim\\pagegoal=\\maxdimen\n    \\transFitAvail=\\dimexpr\\textheight-\\pagetotal\\relax\n  \\fi\n  \\ifdim\\transFitNeed<\\transFitAvail\n    \\noindent\\box\\transFitBox\n  \\fi\n  \\par",
    1
  ],
  "measureSynBox": [
    "%\n  \\setbox\\synTestBox=\\vbox{%\n    \\small\\sffamily\n    \\begin{adjustbox}{max width=\\textwidth}\n      #1\n    \\end{adjustbox}%\n  }%\n  \\synItemHeight=\\dimexpr\\ht\\synTestBox + \\dp\\synTestBox + 10pt\\relax",
    1
  ],
  "summaryextension": [
    "\\autoAdaptiveSynthesis{#1}{#2}{#3}{#4}{}{#5}{#6}",
    6
  ],
  "AdditionalSynthesisChapterOne": "\\FloatBarrier",
  "AdditionalSynthesisChapterTwo": "\\FloatBarrier",
  "AdditionalSynthesisChapterThree": "\\FloatBarrier",
  "AdditionalSynthesisChapterFour": "\\FloatBarrier",
  "AdditionalSynthesisChapterFive": "\\FloatBarrier",
  "AdditionalSynthesisChapterSix": "\\FloatBarrier",
  "AdditionalSynthesisChapterSeven": "\\FloatBarrier",
  "AdditionalSynthesisChapterEight": "\\FloatBarrier",
  "AdditionalSynthesisChapterNine": "\\FloatBarrier",
  "AdditionalSynthesisChapterTen": "\\FloatBarrier",
  "AdditionalSynthesisChapterEleven": "\\FloatBarrier",
  "AdditionalSynthesisChapterTwelve": "\\FloatBarrier",
  "AdditionalSynthesisChapterThirteen": "\\FloatBarrier",
  "AdditionalSynthesisChapterFourteen": "\\FloatBarrier",
  "AdditionalSynthesisChapterFifteen": "\\FloatBarrier",
  "llbracket": "\\mathopen{[\\mkern-3mu[}",
  "rrbracket": "\\mathclose{]\\mkern-3mu]}",
  "arraystretch": "1.3",
  "ggg": "\\mathrel{\\gggtr}",
  "topfraction": "0.95",
  "bottomfraction": "0.95",
  "textfraction": "0.05",
  "floatpagefraction": "0.70",
  "dbltopfraction": "0.95",
  "dblfloatpagefraction": "0.75",
  "themytheoremcounter": "\\thechapter.\\arabic{mytheoremcounter}",
  "themyexplicationcounter": "\\thechapter.\\arabic{myexplicationcounter}",
  "themycarnapscholiumcounter": "\\thechapter.\\arabic{mycarnapscholiumcounter}",
  "claimceiling": [
    "#2",
    2
  ],
  "crefrangeconjunction": "--",
  "pr": "\\operatorname{pr}",
  "pb": "\\operatorname{pb}",
  "extwedge": "\\mathbin{\\wedge}",
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
  "xrightsquigarrow": [
    "\\overset{#1}{\\rightsquigarrow}",
    1
  ],
  "Hol": "\\operatorname{Hol}",
  "Omegaint": "\\mathbf{\\Omega}_{\\mathrm{int}}",
  "Ctx": "\\mathbf{Ctx}",
  "Osyn": "\\mathcal{O}_{\\mathrm{syn}}",
  "Esyn": "\\mathcal{E}_{\\mathrm{syn}}",
  "Jsyn": "J_{\\mathrm{syn}}",
  "Ksyn": "\\mathcal{K}_{\\mathrm{syn}}",
  "Xsyn": "\\mathcal{X}_{\\mathrm{syn}}",
  "FinBan": "\\mathbf{FinBan}_{\\le 1}",
  "CSeg": "\\operatorname{CSeg}",
  "Stable": "\\operatorname{Stable}",
  "IGP": "\\operatorname{IGP}",
  "Gen": "\\operatorname{Gen}",
  "Prop": "\\mathbf{Prop}",
  "AP": "\\mathbf{AP}",
  "Alg": "\\operatorname{Alg}",
  "ev": "\\operatorname{ev}",
  "longhookrightarrow": "\\lhook\\joinrel\\longrightarrow",
  "longlongrightarrow": "\\longrightarrow",
  "q": [
    "\\enquote{#1}",
    1
  ],
  "Im": "\\operatorname{Im}",
  "LMSL": "\\mathcal{L}_{\\text{MSL}}",
  "WFFMSL": "\\text{WFF}_{\\mathcal{L}_{\\text{MSL}}}",
  "Smodx": "S_{\\text{mod}}(x)",
  "Smodarg": [
    "S_{\\text{mod}}(#1)",
    1
  ],
  "BoxS": "\\Box_S",
  "BoxSyn": "\\Box_{\\mathrm{Syn}}",
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
  "synthflowchart": [
    "%\n\\begin{figure}[htbp]\n\\centering\n\\begin{adjustbox}{max width=\\textwidth}\n\\begin{tikzpicture}[>=Stealth, auto, thick, scale=1.0]\n  \\node[synbox, minimum width=3.6cm, minimum height=1.4cm] (A) at (-5.5, 1.4) {#3};\n  \\node[synbox, minimum width=3.6cm, minimum height=1.4cm] (D) at (-5.5, -1.4) {#6};\n  \\node[syngreenbox, minimum width=3.6cm, minimum height=1.4cm] (B) at (0.0, 1.4) {#4};\n  \\node[syngreenbox, minimum width=3.6cm, minimum height=1.4cm] (E) at (0.0, -1.4) {#7};\n  \\node[synorangebox, minimum width=3.6cm, minimum height=1.4cm] (C) at (5.5, 1.4) {#5};\n  \\node[synorangebox, minimum width=3.6cm, minimum height=1.4cm] (F) at (5.5, -1.4) {#8};\n  \\draw[synline, line width=1.3pt, maincolor!90!black] (A) -- node[above, font=\\scriptsize\\bfseries\\sffamily, text width=1.8cm, align=center, fill=white, inner sep=1pt] {Structural\\\\Lift} (B);\n  \\draw[synline, line width=1.3pt, secondarycolor!90!black] (B) -- node[above, font=\\scriptsize\\bfseries\\sffamily, text width=1.8cm, align=center, fill=white, inner sep=1pt] {Derived\\\\Realization} (C);\n  \\draw[synline, line width=1.1pt] (A) -- (D);\n  \\draw[synline, line width=1.1pt] (B) -- (E);\n  \\draw[synline, line width=1.1pt] (C) -- (F);\n  \\draw[synline, dashed, orange!90!black] (D) -- (E);\n  \\draw[synline, dashed, orange!90!black] (E) -- (F);\n\\end{tikzpicture}\n\\end{adjustbox}\n\\caption{#1.}\n\\label{#2}\n\\end{figure}%",
    8
  ],
  "advancedfigure": [
    "%\n\\begin{figure}[htbp]\n\\centering\n\\begin{adjustbox}{max width=\\textwidth}\n\\begin{tikzpicture}[>=Stealth, thick, node distance=1.2cm]\n  \\node[synbox, minimum width=4.0cm, minimum height=1.25cm, align=center] (A) {#3};\n  \\node[syngreenbox, minimum width=4.0cm, minimum height=1.25cm, align=center, right=2.0cm of A] (B) {#4};\n  \\draw[->, synline, line width=1.6pt] (A) -- node[above, font=\\scriptsize\\bfseries\\sffamily] {Structural lift} (B);\n  \\node[synorangebox, minimum width=8.0cm, minimum height=0.85cm, align=center, below=1.0cm of $(A)!0.5!(B)$] (C) {\\footnotesize\\sffamily Invariant: \\(\\text{local data}\\;\\longrightarrow\\;\\text{global structure}\\)};\n  \\draw[->, dashed, orange!90!black] (A) -- (C);\n  \\draw[->, dashed, orange!90!black] (B) -- (C);\n\\end{tikzpicture}\n\\end{adjustbox}\n\\caption{#1.}\n\\label{#2}\n\\end{figure}%",
    4
  ],
  "quantor": [
    "\\mathsf{Q}\\left[#1\\right]",
    1
  ],
  "polyquantor": [
    "\\mathop{\\mathsf{Q}}\\limits_{#2,#3}^{#4}\\!\\left(#1\\right)",
    4
  ],
  "homogenesyntrix": [
    "\\mathsf{H}\\!\\left(#1\\right)",
    1
  ],
  "predicatesymbol": "\\mathrel{\\models}",
  "vspacing": [
    "\\vphantom{\\sum}",
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
  "metrondelta": "\\nabla",
  "metrondifferential": "\\mathrm{d}",
  "supmedsubscript": [
    "{}^{#2}_{#1,#3}",
    3
  ],
  "smformula": [
    "#1",
    1
  ],
  "Sp": "\\operatorname{sp}",
  "tr": "\\operatorname{tr}",
  "Hom": "\\operatorname{Hom}",
  "Obj": "\\operatorname{Obj}",
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
  "Sh": "\\mathbf{Sh}",
  "Free": "\\operatorname{Free}",
  "Sym": "\\operatorname{Sym}",
  "Frag": "\\operatorname{Frag}",
  "Der": "\\operatorname{Der}",
  "Def": "\\operatorname{Def}",
  "Orb": "\\operatorname{Orb}",
  "Epi": "\\operatorname{Epi}",
  "Pro": "\\operatorname{Pro}",
  "hypersyntrix": "\\overset{\\scriptscriptstyle 1}{\\mathbf{M}}",
  "korporatorkette": "\\mathord{\\llcorner}",
  "tau": "tau",
  "phi": "phi",
  "zeta": "zeta",
  "Gamma": "Gamma",
  "Omega": "Omega",
  "infty": "infinity",
  "boxplusphi": "\\mathbin{\\boxplus_\\phi}",
  "syntrix": [
    "\\mathbf{y}\\widetilde{#1}",
    1
  ],
  "metrophor": [
    "\\widetilde{#1}",
    1
  ],
  "fundamentalkondensor": "\\operatorname{Sel}",
  "strukturkompressor": "{}^4\\mathbf{\\zeta}",
  "metroplexaeondyne": "\\text{Metroplexäondyne}",
  "r": "1.4",
  "homogeneoussyntrix": "\\mathbf{x}\\widetilde{\\mathbf{a}}",
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
  "metroplexfunktor": "S",
  "metroplexfunktorcommand": "S",
  "telezentrum": "T_z",
  "aeonischearea": "\\mathrm{AR}_q",
  "transzendenzsynkolator": "\\Gamma_i",
  "quantitaetsaspekt": "\\text{Quantitätsaspekt}",
  "qualitaetsaspekt": "\\text{Qualitätsaspekt}",
  "quantitaetssyntrix": "\\mathbf{y}\\mathbf{R}_n",
  "zahlenkoerper": "\\text{Zahlenkörper}",
  "semantischermetrophor": "R_n",
  "semantischeriterator": "S_n",
  "funktionaloperator": "\\mathfrak{f}",
  "synkolatorraum": "\\text{Synkolatorraum}",
  "aeondynechaptereight": "\\widetilde{\\mathbf{a}}(x_i)_1^n",
  "kompositionsfeld": "{}^2\\bar{\\mathbf{g}}",
  "korrelationstensor": "\\mathbf{f}",
  "koppelungstensor": "\\mathbf{Q}",
  "kaskadenstufe": "\\alpha",
  "metron": "\\tau",
  "metronischegitter": "\\text{Metronische Gitter}",
  "metronbar": "\\bar{\\delta}",
  "metronintegral": "\\mathrm{S}",
  "metronenfunktion": "\\phi(n)",
  "metronenziffer": "n",
  "metrischesieboperator": "S(\\gamma)",
  "metronischerstrukturkompressor": "{}^4\\mathbf{\\psi}",
  "kategorie": "\\mathbf{K}",
  "CtxPos": "\\mathbf{Ctx}_{>0}^{\\mathrm{sk}}",
  "Ctxadm": "\\mathbf{Ctx}_{\\mathrm{adm}}^{\\mathrm{sk}}",
  "Ctxquant": [
    "\\mathbf{Ctx}_{\\mathrm{quant}}"
  ],
  "Ban": "\\mathbf{Ban}_{\\le 1}",
  "otpi": "\\mathbin{\\widehat{\\otimes}_\\pi}",
  "Isom": "\\operatorname{Isom}",
  "DiaS": "\\Diamond_S",
  "Kor": "\\mathbf{Kor}",
  "coloneqq": "\\mathrel{:=}",
  "Coloneqq": "\\mathrel{::=}",
  "ab": "\\mathrm{ab}",
  "metroplexfont": [
    "\\mathbf{#1}",
    1
  ],
  "metroplex": [
    "\\overset{\\scriptscriptstyle #2}{\\mathbf{M}}\\!\\left(#1\\right)",
    2
  ],
  "hypermetrophor": [
    "\\mathbf{w}\\widetilde{#1}",
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
  "syntroklinebruecke": [
    "{}^{#1}\\alpha",
    1
  ],
  "transzendenzstufe": [
    "C(#1)",
    1
  ],
  "transcendenzstufe": [
    "C(#1)",
    1
  ],
  "partialstruktur": [
    "{}^2\\mathbf{g}_{(#1)}",
    1
  ],
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
  "dyndiamondgen": [
    "\\langle #1 \\rangle",
    1
  ],
  "prescript": [
    "{}^{#1}_{#2}{#3}",
    3
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
  "centernot": [
    "\\not#1",
    1
  ],
  "carnapexplication": [
    "#5",
    5
  ],
  "width": "container",
  "AbsEN": "\\operatorname{AbsEN}",
  "Ad": "\\operatorname{Ad}",
  "Ahat": "\\widehat{A}",
  "At": "\\operatorname{At}",
  "BunConn": "\\mathbf{BunConn}_G^{\\mathrm{contr}}",
  "CSL": "\\mathcal{C}_{\\mathrm{SL}}",
  "Coalg": "\\mathbf{Coalg}",
  "Codisc": "\\operatorname{Codisc}",
  "Coeff": "\\mathbf{Coeff}",
  "Col": "\\mathbf{Col}",
  "ConfIndex": "\\operatorname{ConfIndex}_{\\mathrm{pres}}",
  "Conn": "\\operatorname{Conn}",
  "Crit": "\\operatorname{Crit}",
  "Cspine": "\\mathcal{C}_{\\mathrm{spine}}",
  "DIV": "\\operatorname{DIV}",
  "DKor": "\\mathbb{K}\\mathbf{or}",
  "Dext": "\\mathcal{D}_{\\mathrm{ext}}",
  "DimField": "\\mathbf{DimField}_{\\Lambda}",
  "Disc": "\\operatorname{Disc}",
  "Dom": "\\operatorname{Dom}",
  "End": "\\operatorname{End}",
  "Equant": "\\mathcal{E}_{\\mathrm{quant}}",
  "Face": "\\operatorname{Face}",
  "Fext": "\\mathcal{F}_{\\mathrm{ext}}",
  "Ffree": "\\mathcal{F}_{\\mathrm{free}}",
  "Fsyn": "\\mathfrak{F}_{\\mathrm{syn}}",
  "GRAD": "\\operatorname{GRAD}",
  "Ggen": "\\mathsf{G}_{\\mathrm{gen}}",
  "Gnabla": "\\mathfrak{G}_\\nabla",
  "Hess": "\\operatorname{Hess}",
  "HypMet": "\\operatorname{HypMet}",
  "Ind": "\\operatorname{Index}",
  "Izero": "\\mathrm{I}_{\\mathbf{0}}",
  "Jproof": "J_{\\mathrm{proof}}",
  "Jquant": "J_{\\mathrm{quant}}",
  "LiMSL": "\\mathcal{L}_{\\mathrm{iMSL}}",
  "MAR": "\\mathcal{M}_{\\mathfrak{AR}}",
  "Manparam": "\\mathbf{Man}_{\\mathrm{param}}",
  "Match": "\\mathsf{Match}_{\\mathcal{U}}",
  "Met": "\\operatorname{Met}",
  "Msyn": "\\mathcal{M}_{\\mathrm{syn}}",
  "Mtau": "\\mathbb{M}_{\\tau}",
  "Ofrag": "\\mathcal{O}_{\\mathrm{frag}}",
  "Ohom": "\\mathcal{O}_{\\mathrm{hom}}",
  "Oisom": "\\mathcal{O}_{\\mathrm{isom}}",
  "On": "\\mathcal{O}_n",
  "Opyr": "\\mathcal{O}_{\\mathrm{pyr}}",
  "Oquant": "\\mathcal{O}_{\\mathrm{quant}}",
  "Pol": "\\operatorname{Pol}",
  "RBan": "\\mathfrak{R}_{\\mathrm{Ban}}",
  "ROT": "\\operatorname{ROT}",
  "Rbar": "{}^2\\bar{\\mathbf{R}}",
  "Rresyn": "\\mathcal{R}_{\\mathrm{resyn}}",
  "Sel": "\\operatorname{Sel}",
  "Shift": "\\mathsf{Shift}",
  "Ssum": "\\mathcal{S}",
  "Stab": "\\operatorname{Stab}",
  "SynCat": "\\mathbf{Syn}(\\mathcal{L}_{\\mathrm{iMSL}})",
  "SynEN": "\\operatorname{SynEN}",
  "Synquant": "\\mathbf{Syn}_{\\mathrm{quant}}",
  "Tect": "\\operatorname{Tect}",
  "UG": "U_{\\mathsf{G}}",
  "Valfact": "\\operatorname{Val}_{\\mathrm{fact}}",
  "WFFiMSL": "\\mathbf{WFF}_{\\mathrm{iMSL}}",
  "XAR": "X_{\\mathfrak{AR}}",
  "Xkor": "\\mathbf{X}_{\\mathrm{kor}}",
  "YF": "YF_{\\mathrm{model}}",
  "ad": "\\operatorname{ad}",
  "ch": "\\operatorname{ch}",
  "cl": "\\operatorname{cl}",
  "colim": "\\operatorname*{colim}",
  "dCSeg": "\\operatorname{dCSeg}",
  "deg": "\\operatorname{deg}",
  "diam": "\\operatorname{diam}",
  "dist": "\\operatorname{dist}",
  "divg": "\\operatorname{div}_{\\bar{g}}",
  "dtilde": "\\tilde{\\mathrm{d}}",
  "gAR": "g_{\\mathfrak{AR}}",
  "gbar": "{}^2\\bar{\\mathbf{g}}",
  "gbarinf": "{}^2\\bar{\\mathbf{g}}_\\infty",
  "gbarminus": "{}^2\\bar{\\mathbf{g}}_-",
  "gbarplus": "{}^2\\bar{\\mathbf{g}}_+",
  "grad": "\\operatorname{grad}",
  "gsyn": "g^{\\mathrm{syn}}",
  "homsyntrix": "\\mathbf{x}\\widetilde{\\mathbf{a}}",
  "im": "\\operatorname{im}",
  "ind": "\\operatorname{ind}",
  "konflexiv": "\\mathbf{y}\\widetilde{\\mathbf{c}}",
  "lvl": "\\operatorname{lvl}",
  "midpt": "\\operatorname{mid}",
  "op": "\\mathrm{op}",
  "or": "\\operatorname{or}",
  "otBV": "\\mathbin{\\otimes_{\\mathrm{BV}}}",
  "oteps": "\\mathbin{\\widehat{\\otimes}_\\varepsilon}",
  "parttilde": "\\tilde{\\partial}",
  "rank": "\\operatorname{rank}",
  "sBRST": "s_{\\mathrm{BRST}}",
  "sp": "\\operatorname{sp}",
  "vol": "\\operatorname{vol}",
  "family": "Libertinus Mono",
  "threshold": [
    0,
    0.08,
    0.4
  ],
  "shift": "\\mathsf{Shift}",
  "cspine": "\\mathcal{C}_{\\mathrm{spine}}",
  "ap": "\\mathbf{AP}",
  "stab": "\\operatorname{Stab}",
  "stable": "\\operatorname{Stable}",
  "kor": "\\mathbf{Kor}",
  "Box": "\\Box",
  "Diamond": "\\Diamond",
  "SyntrometricSequentCalculus": "\\mathbf{SSC}"
};

  // Expose authoritative global dictionary
  if (typeof window !== 'undefined') {
    window.SYN_TEX_MACROS = Object.assign(window.SYN_TEX_MACROS || {}, MASTER_TEX_MACROS);

    // Merge into MathJax configuration
    window.MathJax = window.MathJax || {};
    window.MathJax.tex = window.MathJax.tex || {};
    window.MathJax.tex.macros = Object.assign(window.MathJax.tex.macros || {}, MASTER_TEX_MACROS);

    // If MathJax v3 is already loaded and initialized, register into active TeX configuration
    try {
      if (window.MathJax.config && window.MathJax.config.tex && window.MathJax.config.tex.macros) {
        Object.assign(window.MathJax.config.tex.macros, MASTER_TEX_MACROS);
      }
    } catch (e) {}

    // Hook Reveal ready to trigger MathJax typeset
    if (window.Reveal && window.Reveal.on) {
      window.Reveal.on('ready', function() {
        if (window.MathJax && window.MathJax.typesetPromise) {
          window.MathJax.typesetPromise();
        }
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MASTER_TEX_MACROS;
  }
})();
