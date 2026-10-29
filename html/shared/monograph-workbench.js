/**
 * =========================================================================
 * SYNTROMETRIC MONOGRAPH WORKBENCH (CH 1–15 + APPENDICES A–E)
 * Live Slide-Synchronized Monograph PDF, Raw LaTeX & 100-Eq. Rosetta Register
 * Auto-Parses Syntrometric-Topos.tex for 380+ Theorems, Definitions & Lean 4
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

  // Curated Highlights of the 100-Equation Master Register (Chapter 14)
  const FALLBACK_ROSETTA = [
    { eq: "SM Eq. 1 / SM-4", ch: "Ch 1", page: 15, tex: "eq:sm_4", d: "S ≡ ⌈D_nn × K_n × P_nn⌉ (Subjektiver Aspekt)", r: "Context U = (D^U, P^U, C^U, K^U, z^U, ζ^U) ∈ Ctx_adm^sk with K^U : D^U ⊗̂_π P^U → C^U" },
    { eq: "SM Eq. 4", ch: "Ch 1", page: 17, tex: "prop:quantor_degeneration_hierarchy", d: "Continuous & Discrete Polyquantor Hierarchy Q_poly", r: "Product-slice Kripke–Joyal forcing ∏ V_i ⊩ φ & right-adjoint Universalquantor ∀_f" },
    { eq: "SM Eq. 5", ch: "Ch 2", page: 35, tex: "eq:heim_syntrix_eq5", d: "yã ≡ ⟨f, ã, m⟩ ∨ F₁ ≡ f(a_k)₁^m (Syntrix Triad)", r: "Free algebra over completed colored Banach operad O_syn on profile (γ,…,γ; γ+1)" },
    { eq: "SM Eq. 5a", ch: "Ch 2", page: 36, tex: "eq:heim_homogeneous_eq5a", d: "x yã ≡ ⟨⟨f, ã⟩ m⟩ (Homogeneous Syntrix & Spaltbarkeit)", r: "Boardman–Vogt tensor O_pyr ⊗_BV O_frag & Beck Distributive Law λ̂ : T̄_pyr T̄_frag ⇒ T̄_frag T̄_pyr" },
    { eq: "SM Eq. 8", ch: "Ch 2", page: 37, tex: "def:piecewise_colored_operad", d: "(f̲, m̲) ≡ ∫ (f_γ, m_γ) (Komplexsynkolator & Syndromabschluß)", r: "Piecewise-color filtered operad algebra with m_K > dim F ⇒ C(dim F, m_K) = 0" },
    { eq: "SM Eqs. 9, 9a", ch: "Ch 2", page: 51, tex: "thm:aeondyne_fibration_strict", d: "S̲ ≡ ⟨f, (ã), m⟩ (Primigene & Ganzläufige Äondyne)", r: "Cartesian fiber section in Grothendieck fibration π : ∫_Ctx Syn → Ctx" },
    { eq: "SM Eq. 11", ch: "Ch 3", page: 58, tex: "eq:original_universal_korporator_matrix_ch3", d: "2 × 2 Universal Korporator Matrix {K_s, C_s; K_m, C_m}", r: "Corporate pairing functor Kor_{r,Σ}: Span pushout P_a ⊞_φ P_b (p+q-λ) & 9 Mixed / 6 Pure classes" },
    { eq: "SM Eq. 11a", ch: "Ch 3", page: 59, tex: "prop:zero_object_syn", d: "ys c̃ ≡ ⟨f̄ c̃ m̄⟩ (Nullsyntrix)", r: "Initial & terminal zero object 0_Syn ∈ Obj(Syn)" },
    { eq: "SM Eq. 13", ch: "Ch 3", page: 60, tex: "def:conflexivity_index", d: "Mehrgliedrige Konflexivsyntrix & Syntropod Chain", r: "Tree colimit varinjlim D with Presentation Conflexivity Index ConfIndex_pres(G_S) = |E_K| + 1" },
    { eq: "SM Eq. 14", ch: "Ch 4", page: 79, tex: "thm:slice_site_equivalence_ch4", d: "Generative G_gen & 4D Syntrixtotalität T0", r: "Slice sheaf topos Sh(Ctx_{/U_G}, J_{/U_G}) ≃ E_syn / y(U_G) over P^{U_G} ≅ ℝ¹²" },
    { eq: "SM Eqs. 16a, 17", ch: "Ch 4", page: 80, tex: "thm:relative_interaction_curvature_decomp", d: "Continuous Enyphane E, Inverse E⁻¹ & Enyphanie Eν", r: "Boundary-tangent corner flow Φ_t^X & Non-Abelian Interaction Curvature Ω_int^D = ∑[a_i, a_j] + …" },
    { eq: "SM Eq. 18", ch: "Ch 4", page: 94, tex: "def:discrete_chronometry_clock_ch4", d: "Syntrixfunktor YF & Elementary Zeitkorn δt_i", r: "Pushout endofunctor YF_model(f) = B ⨿_{C₀} f^{⊗r} & discrete clock difference δt_n = τ(n+1) - τ(n)" },
    { eq: "SM Eqs. 20–25a", ch: "Ch 5", page: 103, tex: "def:complete_segal_objects_ch5", d: "Hypersyntrix M¹ & Metroplex M^n", r: "Dendroidal Complete Segal Spaces dCSeg(X_syn) & change-of-operad adjunction (φ)_! ⊣ (φ)*" },
    { eq: "SM Eq. 27", ch: "Ch 6", page: 123, tex: "thm:final_coalgebra_existence_ch6", d: "Äonische Area AR_q & Telezentrum T_z", r: "Final Telecentric Coalgebra (ν𝒯, ζ ≅) via Lambek's Lemma & Lyapunov basin V̇ ≤ -γV" },
    { eq: "SM Eqs. 28–35a", ch: "Ch 7–8", page: 144, tex: "thm:nuclear_variable_separation", d: "Quantitätssyntrix yR_n & Separation der Variablen", r: "Quantitative Topos E_quant, Seeley extension E^{(n)} & Grothendieck nuclearity 𝒮((ℝ_≥0)^m)" },
    { eq: "SM Eqs. 37, 53, 64", ch: "Ch 9", page: 182, tex: "def:hermetry_matrix_36", d: "36-Component Non-Hermitian Hermetry ²ḡ & Übergangskriterium", r: "21 symmetric + 15 skew potentials on R₆, Palatini Q_{(μγ)} & Sobolev fixed point ²ḡ_∞" },
    { eq: "SM Eqs. 67–80", ch: "Ch 10", page: 205, tex: "thm:discrete_leibniz_rules", d: "Metrondifferential ∇φ, Product Rule & Metronintegral S", r: "Backward difference ∇_i = I - E_i⁻¹, non-linear cross-term -(∇u)(∇v), DEC d_τ² ≡ 0 & FEEC" },
    { eq: "SM Eqs. 99, 100, 100a", ch: "Ch 11", page: 228, tex: "thm:mass_eigenvalue_formula_ch11", d: "Strukturkompressor ⁴ζ, Null-Stability ⁴F = 0 & L_p = C(6,p)", r: "Self-adjoint selector spectrum on K₈ = S² × 𝕋⁶ across 63 channels L_p = C(6,p) fixing particle masses" }
  ];

  const STYLES = `
#syn-monograph-fab {
  position: fixed;
  left: 20px;
  bottom: 20px;
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
  background: linear-gradient(160deg, rgba(7, 10, 18, 0.98) 0%, rgba(13, 19, 34, 0.99) 100%);
  border-right: 2px solid #FFD700;
  box-shadow: 20px 0 65px rgba(0, 0, 0, 0.92);
  z-index: 10001;
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
  gap: 8px;
}

.rosetta-card {
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid #334155;
  border-left: 4px solid #4169E1;
  border-radius: 7px;
  padding: 9px 13px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-sizing: border-box;
}

.rosetta-card:hover {
  border-color: #FFD700;
  background: rgba(65, 105, 225, 0.16);
  transform: translateX(2px);
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
}
`;

  const DRAWER_HTML = `
<!-- Floating Launcher Button (Bottom-Left) -->
<button id="syn-monograph-fab" onclick="window.toggleMonographDrawer()" title="Open Synchronized Monograph PDF, Raw TeX & 100-Equation Rosetta Register (Shortcut: M)">
  <span>📖 Monograph PDF &amp; TeX</span>
  <span id="fab-page-pill" style="background:#4169E1; color:#fff; padding:1px 6px; border-radius:4px; font-size:10.5px;">p. 11</span>
</button>

<!-- Slide-Over Monograph & TeX Workbench Drawer -->
<div id="syn-monograph-drawer" aria-label="Monograph Workbench Drawer">
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
        <input type="text" id="tex-search-box" class="tex-search-input" placeholder="Search Syntrometric-Topos.tex (e.g., thm:exact_descent_holoform, zombie_impossibility, \\SyntrometricSequentCalculus)..." oninput="window.searchRawTeX(this.value)">
        <button class="m3d-btn" onclick="window.copyCurrentTeXSnippet()">📋 Copy TeX</button>
      </div>
      <pre id="monograph-tex-viewer">Loading Syntrometric-Topos.tex source...</pre>
    </div>

    <!-- PANE 3: Auto-Extracted Theorem, Definition & Lean 4 Index -->
    <div class="mdrawer-pane" id="mpane-thm">
      <div class="tex-toolbar">
        <input type="text" id="thm-search" class="tex-search-input" placeholder="Filter 380+ Theorems, Definitions, Scholia & Lean 4 blocks parsed from Syntrometric-Topos.tex..." oninput="window.filterTheoremIndex(this.value)">
      </div>
      <div class="rosetta-list" id="thm-cards-container"></div>
    </div>

    <!-- PANE 4: Interactive 100-Equation Rosetta Register -->
    <div class="mdrawer-pane" id="mpane-rosetta">
      <div class="tex-toolbar">
        <input type="text" id="rosetta-search" class="tex-search-input" placeholder="Filter all SM Equations 1–100a (e.g., SM Eq. 1, SM Eq. 11, SM Eq. 64, SM Eq. 100a)..." oninput="window.filterRosettaRegister(this.value)">
      </div>
      <div class="rosetta-list" id="rosetta-cards-container"></div>
    </div>
  </div>
</div>
`;

  function injectDOM() {
    if (document.getElementById('syn-monograph-drawer')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'syn-monograph-style';
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);

    const container = document.createElement('div');
    container.id = 'syn-monograph-mount';
    container.innerHTML = DRAWER_HTML;
    document.body.appendChild(container);

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
    const dr = document.getElementById('syn-monograph-drawer');
    if (dr) {
      dr.classList.toggle('open');
      if (dr.classList.contains('open') && !rawTeXCache) {
        loadRawTeXFile();
      }
    }
  };

  window.switchMonographTab = function(tab) {
    activeTab = tab;
    ['pdf', 'tex', 'thm', 'rosetta'].forEach(t => {
      document.getElementById('mtab-' + t)?.classList.toggle('active', t === tab);
      document.getElementById('mpane-' + t)?.classList.toggle('active', t === tab);
    });
    if ((tab === 'tex' || tab === 'thm' || tab === 'rosetta') && !rawTeXCache) {
      loadRawTeXFile();
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

  // Precompute chapter offsets in TeX string for page interpolation
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
    chapterOffsets = null; // reset to compute with loaded tex

    const envRegex = /\\begin\{(mytheorem|mydefinition|myproposition|mylemma|mycorollary|myscholium|mycarnapscholium|myexplication|leanbox|pythonbox)\}(?:\[([^\]]*)\])?([\s\S]*?)\\end\{\1\}/g;
    let m;
    while ((m = envRegex.exec(tex)) !== null) {
      const envType = m[1];
      const title = (m[2] || "")
        .replace(/\\texorpdfstring\{([^}]*)\}\{[^}]*\}/g, "$1")
        .replace(/[{}]/g, "")
        .trim();
      const body = m[3] || "";
      const labelMatch = body.match(/\\label\{([^}]+)\}/);
      const label = labelMatch ? labelMatch[1] : "";
      const approxPage = getInterpolatedPage(m.index, tex.length);

      parsedTheorems.push({
        env: envType,
        title: title || label || envType,
        label: label,
        page: approxPage,
        anchor: label ? `\\label{${label}}` : m[0].slice(0, 60),
        preview: body.replace(/\\label\{[^}]+\}/g, "").trim().slice(0, 240)
      });
    }

    // Parse all 160+ Canonical Source Formulas from Chapter 14's hypertarget register
    parsedSMEquations = [];
    const smRegex = /\\hypertarget\{sm-source-eq-([^}]+)\}\{\\textbf\{(SM Eq\.~[^}]+)\}\}\s*&\s*\\smformula\{([\s\S]*?)\}\s*\\\\/g;
    let sm;
    while ((sm = smRegex.exec(tex)) !== null) {
      const eqName = sm[2].replace("~", " ");
      const rawFormula = sm[3].replace(/\s+/g, " ").trim();
      parsedSMEquations.push({
        eq: eqName,
        ch: "Ch 14 Register",
        page: 284,
        tex: `sm-source-eq-${sm[1]}`,
        d: rawFormula.slice(0, 240),
        r: `Canonical historical formula ${eqName} transcribed from Heim (2000). Click to view LaTeX and sync PDF.`
      });
    }
  }

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
    ).slice(0, 100);

    cont.innerHTML = list.map(t => {
      const cleanEnv = t.env.replace('my', '').toUpperCase();
      const badgeColor = t.env.includes('theorem') ? '#FFD700' :
                         t.env.includes('lean') ? '#a78bfa' :
                         t.env.includes('python') ? '#38bdf8' :
                         t.env.includes('definition') ? '#5eead4' : '#82aaff';
      const escapedAnchor = t.anchor.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `
      <div class="rosetta-card" onclick="window.openMonographAtPage(${t.page}, '${escapedAnchor}')">
        <div style="display:flex; justify-content:space-between; align-items:center; color:#FFD700; font-weight:bold; margin-bottom:4px; gap:8px;">
          <span><span style="color:${badgeColor}; font-size:10.5px; border:1px solid ${badgeColor}; padding:1px 5px; border-radius:3px; margin-right:6px;">${cleanEnv}</span>${t.title}</span>
          <span style="color:#82aaff; font-size:11px; white-space:nowrap;">${t.label ? `<code>${t.label}</code> · ` : ''}~p. ${t.page} →</span>
        </div>
        <div style="color:#cbd5e1; font-family:'Libertinus Mono',monospace; font-size:11px;">${t.preview.replace(/</g,'&lt;')}...</div>
      </div>`;
    }).join("");
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
    );
    cont.innerHTML = items.map(it => {
      const escapedTex = it.tex.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `
      <div class="rosetta-card" onclick="window.openMonographAtPage(${it.page}, '${escapedTex}')">
        <div style="display:flex; justify-content:space-between; color:#FFD700; font-weight:bold; margin-bottom:4px;">
          <span>${it.eq} (${it.ch})</span>
          <span style="color:#82aaff; font-size:11px;">📄 PDF p. ${it.page} &amp; TeX →</span>
        </div>
        <div style="color:#cbd5e1; font-size:11.5px; font-family:'Libertinus Mono',monospace;"><b>Source (D):</b> ${it.d.replace(/</g,'&lt;')}</div>
        <div style="color:#5eead4; font-size:11.5px; margin-top:3px;"><b>Reconstruction (ℛ):</b> ${it.r}</div>
      </div>`;
    }).join("");
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
      }
    }
  });

  function initMonographWorkbench() {
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
