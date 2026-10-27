# =============================================================================
# MODULAR MANIM 3D SCENES FOR CHAPTER 7: ANTHROPOMORPHIC SYNTROMETRY
# =============================================================================

from manim import *
import numpy as np


# =====================================================================
# STANDARDIZED BOOK COLOR PALETTE (MATCHING LATEX PREAMBLE)
# =====================================================================
ROYAL_BLUE = "#4169E1"     # Real Continuum R^n / Base Parameter Manifold
TEAL_BRIGHT = "#20B2AA"    # Complex Phase Fiber C / Isocline Foliation
ORANGE_GOLD = "#FFA500"    # Semantic Iterator S_n / Gradient Vectors
CRIMSON_RED = "#DC143C"    # Fehlstelle 0 / Morse-Bott Center / Super-Linear Bound
HOLO_GOLD = "#FFD700"      # Geometric Morphism / Dedekind Cut / Cascade Bound
PURPLE_SYN = "#9370DB"     # Synkolatorraum / Musical Pullback
SLATE_GREY = "#708090"     # Structural Framing & Boundaries


# =============================================================================
# SCENE 1: Ch7_Act1_Anthropomorphic_Pivot (Act 1)
# =============================================================================
class Ch7_Act1_Anthropomorphic_Pivot(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr1 = Text(
            "Act I (Sec. 7.1.1): Anthropomorphic Pivot, Pluralism & Mengendialektik",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        piv_top = MathTex(
            r"S_{\text{human}} = \bigcup_{i\in I} S_i, \qquad "
            r"A_0:\; \overline{|\Pi|}_+ \;\text{vs.}\; \overline{|\Pi|}_-\;\left(\sum h_i = 1\right), \qquad "
            r"\text{Mengendialektik: }\; \overline{|m|}_+ \equiv {=} \;\text{vs.}\; \overline{|m|}_- \equiv {\neq}",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr1, DOWN, buff=0.12).align_to(hdr1, LEFT)
        self.add_fixed_in_frame_mobjects(hdr1, piv_top)
        self.play(Write(hdr1), Write(piv_top), run_time=1.2)

        qq_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        qq_hdr = MathTex(r"\text{Qualitaetsaspekt vs. Quantitaetsaspekt (SM, pp. 122--123)}", font_size=17, color=TEAL_BRIGHT).next_to(qq_box.get_top(), DOWN, buff=0.12)
        qq_tex = MathTex(
            r"1.\;\mathbf{Qualitaet\;(Regional\;Pluralism):}\\"
            r"\;\;\text{Color qualia, timbre, affect differ in intrinsic kind.}\\"
            r"\;\;\text{Invariants remain }\textit{Apodiktische Pluralitaeten}\;(\Box_S).\\[6pt]"
            r"2.\;\mathbf{Quantitaet\;(Global\;Unification):}\\"
            r"\;\;\text{Length, duration, mass admit additive concatenation}\\"
            r"\;\;\text{and ordering }(a>b\lor a<b)\text{ over }\mathbf{Coeff}=[\mathbb{Q}\subseteq\mathbb{R}\subseteq\mathbb{C}]!",
            font_size=15, color=WHITE
        ).move_to(qq_box.get_center() + DOWN * 0.15)

        c71_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        c71_tex = MathTex(
            r"\mathbf{Carnap\;7.1\;(Coordinative\;Definitions):}\\[5pt]"
            r"\bullet\;\text{Carnap (1936/1956): Theoretical language }L_T\text{ gains}\\"
            r"\;\;\text{empirical meaning via correspondence rules to }L_O.\\[5pt]"
            r"\bullet\;\text{Friedman (2001) \& van Fraassen (2008):}\\"
            r"\;\;\text{Coordinative definitions embed phenomena into}\\"
            r"\;\;\text{normed measurement scales via }(V)_{\mathbb{R}}\text{ and }S_n.\\[5pt]"
            r"\implies\text{Bridges pure logic (Teil A) to physics (Teil B)!}",
            font_size=15, color=HOLO_GOLD
        ).move_to(c71_box)

        act1_foot = MathTex(
            r"\text{The Anthropomorphic Pivot: }\; "
            r"\text{Restricting }(\mathbf{Ctx}_{\text{adm}}^{\text{sk}}, J_{\text{syn}})\text{ to }\mathbf{Coeff}\text{-Module Carriers }P^U\text{ yields }\mathcal{E}_{\text{quant}}",
            font_size=18, color=GREEN_C
        ).to_edge(DOWN, buff=0.20)

        self.play(Create(qq_box), Write(qq_hdr), Write(qq_tex), Create(c71_box), Write(c71_tex), Write(act1_foot), run_time=1.9)
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr1, piv_top, qq_box, qq_hdr, qq_tex, c71_box, c71_tex, act1_foot)), run_time=0.8)


# =============================================================================
# SCENE 2: Ch7_Act2_Quantitaetssyntrix_SM28 (Act 2)
# =============================================================================
class Ch7_Act2_Quantitaetssyntrix_SM28(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr2 = Text(
            "Act II (Sec. 7.1.2): Quantitaetssyntrix (SM-28) & Synkolatorraum (m + m^k)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm28_top = MathTex(
            r"\mathrm{S}_n ; \widetilde{\mathrm{a}} = \mathrm{R}_n, \qquad "
            r"\widetilde{\mathrm{a}} = (\mathrm{a}_i)_q, \qquad "
            r"\mathbf{y}\mathbf{R}_n \equiv \widetilde{\mathrm{a}}| = \langle \mathrm{f},\, \mathrm{R}_n,\, \mathrm{m} \rangle\;\;(\text{SM-28})",
            font_size=19, color=ROYAL_BLUE
        ).next_to(hdr2, DOWN, buff=0.12).align_to(hdr2, LEFT)
        self.add_fixed_in_frame_mobjects(hdr2, sm28_top)
        self.play(FadeIn(hdr2), Write(sm28_top), run_time=1.1)

        met_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        met_tex = MathTex(
            r"\mathbf{Three\;Pillars\;of\;SM\;Eq.\;28:}\\[5pt]"
            r"1.\;\mathbf{Singularer\;Metrophor\;\widetilde{a}=(a_i)_q:}\\"
            r"\;\;\text{Dimensionless numbers in }\mathbb{K}\in\{\mathbb{Q},\mathbb{R},\mathbb{C}\}.\\[5pt]"
            r"2.\;\mathbf{Semantischer\;Iterator\;S_n:}\\"
            r"\;\;\text{Clothes pure numbers with physical units }\mathbf{\Lambda}.\\[5pt]"
            r"3.\;\mathbf{Semantischer\;Metrophor\;R_n=(y_l)_n:}\\"
            r"\;\;n\text{-dim parameter continuum }(0\le y_l\le\infty).",
            font_size=15, color=WHITE
        ).move_to(met_panel)

        synk_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.52)
        synk_tex = MathTex(
            r"\mathbf{Tensorial\;Synkolationsfelder\;{}^m\bar{A}:}\\[5pt]"
            r"\bullet\;\text{Funktionaloperator }f\text{ selects }m\text{ coordinates}\\"
            r"\;\;R_m\subseteq R_n\;\left(\binom{n}{m}\text{ combinations}\right).\\[4pt]"
            r"\bullet\;\mathbf{Synkolatorraum:}\;\mathcal{M}_{\text{syn}} := T^{\otimes k}R_m\\"
            r"\;\;\dim(\mathcal{M}_{\text{syn}}) = \underbrace{m}_{\text{Base }R_m} + \underbrace{m^k}_{\text{Tensor Fiber}}\\[5pt]"
            r"\bullet\;\mathbf{Cascade\;Principle:}\;\text{Only }f_1\text{ acts on }R_n;\\"
            r"\;\;\text{higher }f_\gamma\;(\gamma>1)\text{ process tensor fields }F_{\gamma-1}!",
            font_size=15, color=HOLO_GOLD
        ).move_to(synk_panel)

        act2_foot = MathTex(
            r"R_n \xrightarrow{\;\;f_1\;\;} F_1({}^m\bar{A}_1) "
            r"\xrightarrow{\;\;f_2\;\;} F_2({}^m\bar{A}_2) "
            r"\xrightarrow{\;\;f_3\;\;} \cdots "
            r"\xrightarrow{\;\;f_M\;\;} F_M({}^m\bar{A}_M)\quad(\text{Foundation of Strukturkaskaden})",
            font_size=18, color=TEAL_BRIGHT
        ).to_edge(DOWN, buff=0.20)

        self.play(Create(met_panel), Write(met_tex), Create(synk_panel), Write(synk_tex), Write(act2_foot), run_time=1.9)
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr2, sm28_top, met_panel, met_tex, synk_panel, synk_tex, act2_foot)), run_time=0.8)


# =============================================================================
# SCENE 3: Ch7_Act3_Realification_Bundle (Act 3)
# =============================================================================
class Ch7_Act3_Realification_Bundle(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr3 = Text(
            "Act III (Sec. 7.2.1): 3D Realification Bundle (Fig 7.1) & Coeff Poset",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        poset_bot = MathTex(
            r"\mathbf{Coeff} := [\mathbb{Q}\subseteq\mathbb{R}\subseteq\mathbb{C}], \qquad "
            r"\dim_{\mathbb{R}}((\mathbb{Q}^n)_{\mathbb{R}})=n "
            r"\xrightarrow{\;\iota_{\mathbb{Q},\mathbb{R}}\;} \dim_{\mathbb{R}}((\mathbb{R}^n)_{\mathbb{R}})=n "
            r"\xrightarrow{\;\iota_{\mathbb{R},\mathbb{C}}\;} \dim_{\mathbb{R}}((\mathbb{C}^n)_{\mathbb{R}})=2n\;\;(\text{Def 7.2})",
            font_size=17, color=TEAL_BRIGHT
        ).to_edge(DOWN, buff=0.20)
        self.add_fixed_in_frame_mobjects(hdr3, poset_bot)
        self.play(FadeIn(hdr3), Write(poset_bot), run_time=1.1)

        self.move_camera(phi=62 * DEGREES, theta=-42 * DEGREES, run_time=1.7)

        r_surf = Surface(
            lambda u, v: np.array([u - 1.5, v, -1.2]),
            u_range=[-2.4, 2.4], v_range=[-1.6, 1.6],
            resolution=(10, 8),
            fill_color=ROYAL_BLUE, fill_opacity=0.22, stroke_color=ROYAL_BLUE, stroke_width=1
        )
        q_dots = VGroup(*[
            Dot3D(np.array([xv - 1.5, yv, -1.2]), radius=0.055, color=HOLO_GOLD)
            for xv in [-1.6, -0.8, 0.0, 0.8, 1.6] for yv in [-0.8, 0.0, 0.8]
        ])

        st_1 = DashedLine(np.array([-2.3, 0, -1.2]), np.array([-2.3, 0, 0.85]), color=SLATE_GREY, stroke_width=2)
        st_2 = DashedLine(np.array([-0.7, 0, -1.2]), np.array([-0.7, 0, 0.85]), color=SLATE_GREY, stroke_width=2)
        sph_1 = Sphere(radius=0.65, resolution=(12, 10)).set_color(TEAL_BRIGHT).set_opacity(0.42).move_to(np.array([-2.3, 0, 0.85]))
        sph_2 = Sphere(radius=0.65, resolution=(12, 10)).set_color(TEAL_BRIGHT).set_opacity(0.42).move_to(np.array([-0.7, 0, 0.85]))
        vec_1 = Line3D(np.array([-2.3, 0, 0.85]), np.array([-2.3 + 0.65, 0, 0.85]), color=ORANGE_GOLD, thickness=0.025)
        vec_2 = Line3D(np.array([-0.7, 0, 0.85]), np.array([-0.7, 0.65, 0.85]), color=ORANGE_GOLD, thickness=0.025)

        real_card = RoundedRectangle(width=5.6, height=2.65, corner_radius=0.12, color=ORANGE_GOLD, fill_opacity=0.14).to_corner(UR, buff=0.35).shift(DOWN * 0.55)
        real_tex = MathTex(
            r"\mathbf{Realification\;Functor\;V_{\mathbb{R}}\;(Def\;7.2):}\\[4pt]"
            r"\bullet\;\mathbb{K}=\mathbb{Q}:\; V_{\mathbb{R}} := \mathbb{R}\otimes_{\mathbb{Q}} V\quad(d(\mathbb{Q})=1)\\[3pt]"
            r"\bullet\;\mathbb{K}=\mathbb{R}:\; V_{\mathbb{R}} := V\quad(d(\mathbb{R})=1)\\[3pt]"
            r"\bullet\;\mathbb{K}=\mathbb{C}:\; V_{\mathbb{R}} := \operatorname{Res}_{\mathbb{R}}^{\mathbb{C}}(V)\quad(d(\mathbb{C})=2)\\[3pt]"
            r"\bullet\;\rho_{\mathbb{C}}(\mathrm{i}) = J_{\mathbb{C}}:\; J_{\mathbb{C}}^2 = -\operatorname{id},\;\;\|J_{\mathbb{C}}\|_{\text{op}} = 1",
            font_size=15, color=WHITE
        ).move_to(real_card)
        self.add_fixed_in_frame_mobjects(real_card, real_tex)

        self.play(
            Create(r_surf), FadeIn(q_dots),
            Create(st_1), Create(st_2),
            Create(sph_1), Create(sph_2),
            FadeIn(vec_1, vec_2, real_card, real_tex),
            run_time=1.8
        )
        self.play(
            Rotate(vec_1, angle=PI, axis=OUT, about_point=np.array([-2.3, 0, 0.85])),
            Rotate(vec_2, angle=PI, axis=OUT, about_point=np.array([-0.7, 0, 0.85])),
            run_time=1.8, rate_func=rate_functions.linear
        )
        self.wait(0.5)
        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.2)
        self.play(FadeOut(VGroup(r_surf, q_dots, st_1, st_2, sph_1, sph_2, vec_1, vec_2, real_card, real_tex, hdr3, poset_bot)), run_time=0.8)


# =============================================================================
# SCENE 4: Ch7_Act4_Quantitative_Contexts_Pullback (Act 4)
# =============================================================================
class Ch7_Act4_Quantitative_Contexts_Pullback(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr4 = Text(
            "Act IV (Sec. 7.2.1): Category Ctx_quant, Scalar Intertwining & Pullbacks",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        ctx_top = MathTex(
            r"U_Q := (U, n_U, \mathbb{K}_U, \rho_U), \qquad "
            r"U_{\text{quant}}(U_Q) := P^U \cong \mathbb{R}^{3d(\mathbb{K}_U)n_U}, \qquad "
            r"\alpha_P \circ \rho_U(\lambda) = \rho_V(\iota(\lambda))\circ\alpha_P\;\;(\text{Defs 7.3--7.4})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr4, DOWN, buff=0.12).align_to(hdr4, LEFT)
        self.add_fixed_in_frame_mobjects(hdr4, ctx_top)
        self.play(FadeIn(hdr4), Write(ctx_top), run_time=1.1)

        pb_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        pb_hdr = MathTex(r"\text{Pullback Square in }\mathbf{Ctx}_{\text{quant}}\;(\text{Prop 7.5})", font_size=17, color=ROYAL_BLUE).next_to(pb_box.get_top(), DOWN, buff=0.12)

        n_w = RoundedRectangle(width=2.1, height=0.68, corner_radius=0.08, color=HOLO_GOLD, fill_opacity=0.22).move_to(LEFT * 4.55 + UP * 0.1)
        n_v1 = RoundedRectangle(width=2.1, height=0.68, corner_radius=0.08, color=TEAL_BRIGHT, fill_opacity=0.20).move_to(LEFT * 1.75 + UP * 0.1)
        n_v2 = RoundedRectangle(width=2.1, height=0.68, corner_radius=0.08, color=TEAL_BRIGHT, fill_opacity=0.20).move_to(LEFT * 4.55 + DOWN * 1.45)
        n_u = RoundedRectangle(width=2.1, height=0.68, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.20).move_to(LEFT * 1.75 + DOWN * 1.45)

        t_w = MathTex(r"W_Q\;(\mathbb{K}_W=\mathbb{K}_{V_1}\cap\mathbb{K}_{V_2})", font_size=13, color=HOLO_GOLD).move_to(n_w)
        t_v1 = MathTex(r"V_{1,Q}\;(\mathbb{K}_{V_1})", font_size=14, color=TEAL_BRIGHT).move_to(n_v1)
        t_v2 = MathTex(r"V_{2,Q}\;(\mathbb{K}_{V_2})", font_size=14, color=TEAL_BRIGHT).move_to(n_v2)
        t_u = MathTex(r"U_Q\;(\mathbb{K}_U)", font_size=14, color=WHITE).move_to(n_u)

        pb_arrs = VGroup(
            Arrow(n_w.get_right(), n_v1.get_left(), color=HOLO_GOLD, buff=0.06, stroke_width=2.4),
            Arrow(n_w.get_bottom(), n_v2.get_top(), color=HOLO_GOLD, buff=0.06, stroke_width=2.4),
            Arrow(n_v1.get_bottom(), n_u.get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.4),
            Arrow(n_v2.get_right(), n_u.get_left(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.4),
        )

        prf_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        prf_tex = MathTex(
            r"\mathbf{Proof\;of\;Prop\;7.5\;(Pullback\;Completeness):}\\[5pt]"
            r"\bullet\;\text{Lattice Meet: }\;\mathbb{K}_W := \min(\mathbb{K}_{V_1},\mathbb{K}_{V_2})\in\mathbf{Coeff}\\[4pt]"
            r"\bullet\;\text{Diagonal Action on }P^W\subset P^{V_1}\oplus_\infty P^{V_2}:\\"
            r"\;\;\rho_W(\lambda)(p_1,p_2) := (\rho_{V_1}(\lambda)p_1,\, \rho_{V_2}(\lambda)p_2)\\[4pt]"
            r"\bullet\;\text{Closure on }\alpha_P(p_1)=\beta_P(p_2):\\"
            r"\;\;\alpha_P(\rho_{V_1}(\lambda)p_1) = \rho_U(\lambda)\alpha_P(p_1) = \beta_P(\rho_{V_2}(\lambda)p_2)\\[4pt]"
            r"\implies I:\mathbf{Ctx}_{\text{quant}}\to\mathbf{Ctx}_{\text{adm}}^{\text{sk}}\text{ preserves pullbacks!}",
            font_size=14, color=WHITE
        ).move_to(prf_box)

        self.play(
            Create(pb_box), Write(pb_hdr),
            FadeIn(n_w, t_w, n_v1, t_v1, n_v2, t_v2, n_u, t_u),
            Create(pb_arrs),
            Create(prf_box), Write(prf_tex),
            run_time=1.9
        )
        self.wait(0.8)
        self.play(FadeOut(VGroup(hdr4, ctx_top, pb_box, pb_hdr, n_w, t_w, n_v1, t_v1, n_v2, t_v2, n_u, t_u, pb_arrs, prf_box, prf_tex)), run_time=0.8)


# =============================================================================
# SCENE 5: Ch7_Act5_Quantitative_Topos_Dedekind (Act 5)
# =============================================================================
class Ch7_Act5_Quantitative_Topos_Dedekind(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr5 = Text(
            "Act V (Sec. 7.2.1): Quantitative Topos E_quant & Internal Dedekind Reals",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"J_{\text{quant}} := I^* J_{\text{syn}}, \qquad "
            r"\mathcal{E}_{\text{quant}} := \mathbf{Sh}(\mathbf{Ctx}_{\text{quant}}, J_{\text{quant}}), \qquad "
            r"\pi_{\text{quant}} = (\pi_{\text{quant}}^* \dashv \pi_{\text{quant}*}) : \mathcal{E}_{\text{quant}} \longrightarrow \mathcal{E}_{\text{syn}}",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr5, DOWN, buff=0.12).align_to(hdr5, LEFT)
        self.add_fixed_in_frame_mobjects(hdr5, eq_top)
        self.play(FadeIn(hdr5), Write(eq_top), run_time=1.1)

        gm_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        gm_tex = MathTex(
            r"\mathbf{Def\;7.6\;\&\;Thm\;7.7\;(Geometric\;Morphism):}\\[5pt]"
            r"\bullet\;\text{Maximality, Pullback Stability \& Transitivity}\\"
            r"\;\;\text{hold unconditionally for }J_{\text{quant}} = I^*J_{\text{syn}}.\\[4pt]"
            r"\bullet\;\text{Direct Image: }\;(\pi_{\text{quant}*}\mathbf{F})(U) = \lim_{I(U_Q)\to U}\mathbf{F}(U_Q)\\[4pt]"
            r"\bullet\;\text{Inverse Image: }\;\pi_{\text{quant}}^* = \mathbf{a}_{J_{\text{quant}}}(-\circ I^{\text{op}})\text{ is exact!}",
            font_size=15, color=WHITE
        ).move_to(gm_panel)

        ded_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.52)
        ded_tex = MathTex(
            r"\mathbf{Def\;7.8\;\&\;Thm\;7.9\;(Internal\;Dedekind\;Reals\;\mathbb{R}_{\mathcal{E}}):}\\[4pt]"
            r"\mathbb{R}_{\mathcal{E}} := \left\{(L, U) \in \Omega^{\mathbb{Q}_{\mathcal{E}}}\times\Omega^{\mathbb{Q}_{\mathcal{E}}} \;\middle|\; \text{Cut Axioms}\right\}\\[4pt]"
            r"1.\;L, U\text{ inhabited, rounded}\quad 2.\;L \cap U = \emptyset\\[3pt]"
            r"3.\;\text{Locatedness (Heyting }\vee\text{): }\;\forall q < r\text{ in }\mathbb{Q}_{\mathcal{E}},\; L(q)\vee U(r)",
            font_size=14, color=HOLO_GOLD
        ).move_to(ded_panel.get_top() + DOWN * 1.15)

        cut_nl = NumberLine(x_range=[0, 2.5, 0.5], length=4.6, include_numbers=True, font_size=14).move_to(RIGHT * 3.1 + DOWN * 1.55)
        cut_gap = ValueTracker(0.45)
        cut_L = always_redraw(lambda: Line(cut_nl.n2p(0), cut_nl.n2p(1.414 - cut_gap.get_value()), color=TEAL_BRIGHT, stroke_width=10))
        cut_U = always_redraw(lambda: Line(cut_nl.n2p(1.414 + cut_gap.get_value()), cut_nl.n2p(2.5), color=ORANGE_GOLD, stroke_width=10))
        cut_pt = Dot(cut_nl.n2p(1.414), color=HOLO_GOLD, radius=0.085)

        self.play(
            Create(gm_panel), Write(gm_tex),
            Create(ded_panel), Write(ded_tex),
            Create(cut_nl), FadeIn(cut_L, cut_U, cut_pt),
            run_time=1.8
        )
        self.play(cut_gap.animate.set_value(0.04), run_time=1.4, rate_func=rate_functions.ease_in_out_sine)
        self.wait(0.6)
        self.remove(cut_L, cut_U)
        self.play(FadeOut(VGroup(hdr5, eq_top, gm_panel, gm_tex, ded_panel, ded_tex, cut_nl, cut_pt)), run_time=0.8)


# =============================================================================
# SCENE 6: Ch7_Act6_Tensor_Operad_Oquant (Act 6)
# =============================================================================
class Ch7_Act6_Tensor_Operad_Oquant(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr6 = Text(
            "Act VI (Sec. 7.2.2): Tensor Operad O_quant (Fig 7.3) & Suboperad O_isom",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        op_top = MathTex(
            r"X_{(m,k)} := \Gamma_b^0(R_m, T^{\otimes k}R_m), \qquad "
            r"\mathcal{O}_{\text{quant}}(\vec{c}; c) := \mathcal{B}\!\left(\widehat{\bigotimes}_{i=1}^{r,\pi} X_{(m_i,k_i)},\; X_{(m,k)}\right)\;\;(\text{Defs 7.11--7.12})",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr6, DOWN, buff=0.12).align_to(hdr6, LEFT)
        self.add_fixed_in_frame_mobjects(hdr6, op_top)
        self.play(FadeIn(hdr6), Write(op_top), run_time=1.1)

        in1 = RoundedRectangle(width=2.3, height=0.62, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.20).move_to(LEFT * 5.0 + UP * 0.65)
        in2 = RoundedRectangle(width=2.3, height=0.62, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.20).move_to(LEFT * 5.0 + DOWN * 0.45)
        in3 = RoundedRectangle(width=2.3, height=0.62, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.20).move_to(LEFT * 5.0 + DOWN * 1.55)
        t_i1 = MathTex(r"A_1\in X_{(m_1,k_1)}", font_size=15).move_to(in1)
        t_i2 = MathTex(r"A_2\in X_{(m_2,k_2)}", font_size=15).move_to(in2)
        t_i3 = MathTex(r"A_r\in X_{(m_r,k_r)}", font_size=15).move_to(in3)

        coup = RoundedRectangle(width=2.2, height=1.85, corner_radius=0.12, color=TEAL_BRIGHT, fill_opacity=0.24).move_to(LEFT * 2.1 + DOWN * 0.45)
        t_cp = MathTex(r"f\in\mathcal{O}_{\text{quant}}\\\widehat{\bigotimes}_\pi\to X_c", font_size=16, color=TEAL_BRIGHT).move_to(coup)

        rib_arrs = VGroup(
            Arrow(in1.get_right(), coup.get_left() + UP * 0.45, color=ROYAL_BLUE, buff=0.05, stroke_width=2.5),
            Arrow(in2.get_right(), coup.get_left(), color=ROYAL_BLUE, buff=0.05, stroke_width=2.5),
            Arrow(in3.get_right(), coup.get_left() + DOWN * 0.45, color=ROYAL_BLUE, buff=0.05, stroke_width=2.5)
        )

        isom_panel = RoundedRectangle(width=5.8, height=3.45, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.45)
        isom_tex = MathTex(
            r"\mathbf{Operadic\;Composition\;\&\;\mathcal{O}_{\text{isom}}\;(Def\;7.12):}\\[5pt]"
            r"\bullet\;\gamma(f; g_1,\dots,g_r) := f\circ(g_1\widehat{\otimes}_\pi\cdots\widehat{\otimes}_\pi g_r)\\[4pt]"
            r"\bullet\;\text{Cross-Norm Estimate:}\\"
            r"\;\;\|A_{\text{out}}\|_{C_b^0} \le \|f\|_{\text{op}}\prod_{i=1}^r \|A_i\|_{C_b^0}\\[4pt]"
            r"\bullet\;\text{Isometric Equivariance }(\varphi\in\operatorname{Isom}(R_m,g_m)):\\"
            r"\;\;f(\varphi_* A_1,\dots,\varphi_* A_r) = \varphi_* f(A_1,\dots,A_r)",
            font_size=15, color=WHITE
        ).move_to(isom_panel)

        self.play(
            FadeIn(in1, t_i1, in2, t_i2, in3, t_i3),
            Create(coup), Write(t_cp), Create(rib_arrs),
            Create(isom_panel), Write(isom_tex),
            run_time=1.9
        )
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr6, op_top, in1, t_i1, in2, t_i2, in3, t_i3, coup, t_cp, rib_arrs, isom_panel, isom_tex)), run_time=0.8)


# =============================================================================
# SCENE 7: Ch7_Act7_Semantic_Iterator_Metropie (Act 7)
# =============================================================================
class Ch7_Act7_Semantic_Iterator_Metropie(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr7 = Text(
            "Act VII (Sec. 7.3.1): Functor S_n (Def 7.13) & Continuous Metropie Flow (Fig 7.4)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sn_top = MathTex(
            r"S_n : \mathbf{DimField}_\Lambda \longrightarrow \mathbf{Ban}_{\le 1}, \qquad "
            r"\|y\|_{R_n} := \max_{1\le l\le n} \lambda_l\|y_l\|_{\mathbb{K}}, \qquad "
            r"g_{\text{met}}(\dot{z},\dot{z}) := -\frac{1}{2}\operatorname{tr}\!\left((z^{-1}\dot{z})^2\right) \ge 0",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr7, DOWN, buff=0.12).align_to(hdr7, LEFT)
        self.add_fixed_in_frame_mobjects(hdr7, sn_top)
        self.play(FadeIn(hdr7), Write(sn_top), run_time=1.1)

        sn_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        sn_tex = MathTex(
            r"\mathbf{Dimensional\;Parameter\;Functor\;S_n\;(Def\;7.13):}\\[5pt]"
            r"\bullet\;\text{Objects }(\mathbb{K}, \mathbf{\Lambda})\text{ with }\mathbf{\Lambda}=\operatorname{diag}(\lambda_1,\dots,\lambda_n)>0.\\[4pt]"
            r"\bullet\;\text{Scale-Contractive Morphisms }\iota:(\mathbb{K},\mathbf{\Lambda})\to(\mathbb{L},\mathbf{\Lambda}'):\\"
            r"\;\;\lambda'_l\|\iota(x)\|_{\mathbb{L}} \le \lambda_l\|x\|_{\mathbb{K}}\\[4pt]"
            r"\bullet\;\text{Clothes dimensionless numbers in physical units}\\"
            r"\;\;R_n := (\mathbb{K}^n)_{\mathbb{R}} \cong \mathbb{R}^{d(\mathbb{K})n}\text{ functorially!}",
            font_size=15, color=WHITE
        ).move_to(sn_box)

        lie_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        lie_hdr = MathTex(r"\text{Fig 7.4: Metropie Geodesic }\gamma(t)=z(t)\in\mathrm{SO}(n)", font_size=16, color=TEAL_BRIGHT).next_to(lie_box.get_top(), DOWN, buff=0.12)

        geo_arc = ParametricFunction(
            lambda t: RIGHT * (1.2 + 3.8 * t) + DOWN * (1.1 - 0.85 * np.sin(PI * t)),
            t_range=[0, 1], color=TEAL_BRIGHT, stroke_width=3.5
        )
        z0_dot = Dot(geo_arc.get_start(), color=HOLO_GOLD, radius=0.085)
        z1_dot = Dot(geo_arc.get_end(), color=HOLO_GOLD, radius=0.085)
        zt_dot = Dot(geo_arc.get_start(), color=ORANGE_GOLD, radius=0.09)
        z0_lbl = MathTex(r"z(0)=z^U", font_size=14, color=HOLO_GOLD).next_to(z0_dot, DOWN, buff=0.08)
        z1_lbl = MathTex(r"z(1)=z^V", font_size=14, color=HOLO_GOLD).next_to(z1_dot, DOWN, buff=0.08)
        dist_lbl = MathTex(r"d_{\mathbf{Ctx}}(U,V) \le \int_0^1 \sqrt{g_{\text{met}}(\dot{\gamma},\dot{\gamma})}\,dt", font_size=15, color=HOLO_GOLD).move_to(RIGHT * 3.1 + DOWN * 1.75)

        self.play(
            Create(sn_box), Write(sn_tex),
            Create(lie_box), Write(lie_hdr),
            Create(geo_arc), FadeIn(z0_dot, z1_dot, zt_dot), Write(z0_lbl), Write(z1_lbl), Write(dist_lbl),
            run_time=1.8
        )
        self.play(MoveAlongPath(zt_dot, geo_arc), run_time=1.5, rate_func=rate_functions.ease_in_out_sine)
        self.wait(0.6)
        self.play(FadeOut(VGroup(hdr7, sn_top, sn_box, sn_tex, lie_box, lie_hdr, geo_arc, z0_dot, z1_dot, zt_dot, z0_lbl, z1_lbl, dist_lbl)), run_time=0.8)


# =============================================================================
# SCENE 8: Ch7_Act8_Isocline_Foliation_Centers (Act 8)
# =============================================================================
class Ch7_Act8_Isocline_Foliation_Centers(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr8 = Text(
            "Act VIII (Sec. 7.3.2): Isocline Foliation f_A & Morse-Bott Centers (Fig 7.5)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        fol_top = MathTex(
            r"\mathcal{M}_{\text{syn}} := T^{\otimes k}R_m\;(\dim=m+m^k), \qquad "
            r"R_m^{\text{reg}} := \{y\in R_m \mid \operatorname{rank}(d({}^m\bar{A})_y)=d\}, \qquad "
            r"Z(A,g_m,\Phi) := \{y \mid d(\Phi\circ A)_y = 0\}",
            font_size=16, color=ROYAL_BLUE
        ).next_to(hdr8, DOWN, buff=0.12).align_to(hdr8, LEFT)
        self.add_fixed_in_frame_mobjects(hdr8, fol_top)
        self.play(FadeIn(hdr8), Write(fol_top), run_time=1.1)

        o_orig = LEFT * 5.2 + DOWN * 1.95
        ax_x = Arrow(o_orig, o_orig + RIGHT * 3.8, color=ROYAL_BLUE, buff=0, stroke_width=3.2)
        ax_y = Arrow(o_orig, o_orig + UP * 2.9, color=ROYAL_BLUE, buff=0, stroke_width=3.2)
        iso_arcs = VGroup(*[
            Arc(radius=r, start_angle=0, angle=PI / 2, arc_center=o_orig, color=TEAL_BRIGHT, stroke_width=2.8)
            for r in [0.8, 1.45, 2.1, 2.75]
        ])
        g_vecs = VGroup(*[
            Arrow(
                o_orig + r * np.array([np.cos(a), np.sin(a), 0]),
                o_orig + (r - 0.48) * np.array([np.cos(a), np.sin(a), 0]),
                color=ORANGE_GOLD, buff=0, stroke_width=2.4, max_tip_length_to_length_ratio=0.28
            )
            for r in [1.45, 2.1, 2.75] for a in [22 * DEGREES, 45 * DEGREES, 68 * DEGREES]
        ])
        z_pt = Dot(o_orig, color=CRIMSON_RED, radius=0.11)
        z_lbl = MathTex(r"Z_\alpha:\;d(\Phi\circ A)_y=0\;\text{(Fehlstelle }\mathbf{0})", font_size=16, color=CRIMSON_RED).next_to(o_orig, DOWN + RIGHT, buff=0.08).shift(UP * 0.15)

        toy_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        toy_tex = MathTex(
            r"\mathbf{Def\;7.15\;\&\;2D\;Toy\;Example\;(f(y_1,y_2)=y_1^2+y_2^2):}\\[5pt]"
            r"\bullet\;\mathbf{Synkolatorraum:}\;\mathcal{M}_{\text{syn}} = R_2\times\mathbb{R}^1 \cong \mathbb{R}^3\\[4pt]"
            r"\bullet\;\mathbf{Regular\;Locus:}\;R_2^{\text{reg}} = \mathbb{R}^2\setminus\{(0,0)\}\quad(df\neq 0)\\[4pt]"
            r"\bullet\;\mathbf{Isoclines\;(\Sigma_c):}\;\text{Concentric circles }y_1^2+y_2^2=c\\"
            r"\;\;\text{forming a smooth codimension-}d\text{ foliation }\mathfrak{f}_A.\\[4pt]"
            r"\bullet\;\mathbf{Field\;Center\;(Z_\alpha):}\;\text{Isolated Morse minimum }\{(0,0)\}!",
            font_size=15, color=WHITE
        ).move_to(toy_box)

        self.play(
            GrowArrow(ax_x), GrowArrow(ax_y), Create(iso_arcs),
            FadeIn(g_vecs, z_pt), Write(z_lbl),
            Create(toy_box), Write(toy_tex),
            run_time=1.9
        )
        self.wait(0.8)
        self.play(FadeOut(VGroup(hdr8, fol_top, ax_x, ax_y, iso_arcs, g_vecs, z_pt, z_lbl, toy_box, toy_tex)), run_time=0.8)


# =============================================================================
# SCENE 9: Ch7_Act9_Musical_Pullback_Cascade (Act 9)
# =============================================================================
class Ch7_Act9_Musical_Pullback_Cascade(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr9 = Text(
            "Act IX (Sec. 7.3.3): Unit Frame A_0 (Def 7.16) & Musical Pullbacks (Prop 7.17)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        mus_top = MathTex(
            r"A_0(y) := \frac{\sum_{i=1}^{m_1}\partial/\partial y_i}{\|\sum_{i=1}^{m_1}\partial/\partial y_i\|_{g(y)}}\;(\|A_0\|_{C_b^0}=1), \qquad "
            r"\pi_\gamma^\circledast := \sharp_{g_{m_\gamma}}^{\otimes k_{\gamma-1}}\circ\pi_\gamma^*\circ\flat_{g_{m_{\gamma-1}}}^{\otimes k_{\gamma-1}}\;\;(\text{Prop 7.17})",
            font_size=16, color=PURPLE_SYN
        ).next_to(hdr9, DOWN, buff=0.12).align_to(hdr9, LEFT)
        self.add_fixed_in_frame_mobjects(hdr9, mus_top)
        self.play(FadeIn(hdr9), Write(mus_top), run_time=1.1)

        stages = VGroup()
        st_specs = [
            (r"R_n\;\text{(Metrophor)}", ROYAL_BLUE, LEFT * 5.1 + DOWN * 0.45),
            (r"X_0\;(A_0,\;\|A_0\|=1)", TEAL_BRIGHT, LEFT * 2.4 + DOWN * 0.45),
            (r"X_1\;(A_1=f_1(A_0))", ORANGE_GOLD, RIGHT * 0.3 + DOWN * 0.45),
            (r"X_2\;(f_2\circ\pi_2^\circledast)", PURPLE_SYN, RIGHT * 3.0 + DOWN * 0.45),
            (r"X_M\;\text{(Kaskade)}", HOLO_GOLD, RIGHT * 5.4 + DOWN * 0.45),
        ]
        for lbl_s, col_s, pos_s in st_specs:
            bx = RoundedRectangle(width=2.1, height=1.1, corner_radius=0.1, color=col_s, fill_opacity=0.20).move_to(pos_s)
            tx = MathTex(lbl_s, font_size=14, color=WHITE).move_to(bx)
            stages.add(VGroup(bx, tx))

        st_arrs = VGroup(*[
            Arrow(stages[i].get_right(), stages[i + 1].get_left(), color=HOLO_GOLD, buff=0.05, stroke_width=2.6)
            for i in range(4)
        ])

        mus_card = RoundedRectangle(width=11.4, height=1.6, corner_radius=0.12, color=TEAL_BRIGHT, fill_opacity=0.10).to_edge(DOWN, buff=0.22)
        mus_tex = MathTex(
            r"\mathbf{Contravariant\;Musical\;Pullback\;Contractivity\;(Prop\;7.17):}\quad "
            r"\|\pi_\gamma^\circledast(A)\|_{C_b^0} \le \|A\|_{C_b^0} \quad\implies\quad "
            r"f_\gamma\circ(\pi_\gamma^\circledast)^{\widehat{\otimes}_\pi r_\gamma} : X_{\gamma-1}^{\widehat{\otimes}_\pi r_\gamma} \longrightarrow X_\gamma",
            font_size=16, color=HOLO_GOLD
        ).move_to(mus_card)

        self.play(FadeIn(stages, lag_ratio=0.1), Create(st_arrs), Create(mus_card), Write(mus_tex), run_time=1.9)
        self.wait(0.8)
        self.play(FadeOut(VGroup(hdr9, mus_top, stages, st_arrs, mus_card, mus_tex)), run_time=0.8)


# =============================================================================
# SCENE 10: Ch7_Act10_Cascade_Norm_Theorem (Act 10)
# =============================================================================
class Ch7_Act10_Cascade_Norm_Theorem(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr10 = Text(
            "Act X (Sec. 7.3.3): Layered Field Cascade Norm Estimate (Theorem 7.19)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        thm_top = MathTex(
            r"\|A_\gamma\|_{C_b^0} \le \Gamma_\gamma \|A_0\|_{C_b^0}^{D_\gamma}, \qquad "
            r"D_\gamma := \prod_{j=1}^\gamma r_j, \qquad "
            r"\Gamma_\gamma := \prod_{j=1}^\gamma C_j^{\prod_{\ell=j+1}^\gamma r_\ell}\;\;(\text{Thm 7.19})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr10, DOWN, buff=0.12).align_to(hdr10, LEFT)
        self.add_fixed_in_frame_mobjects(hdr10, thm_top)
        self.play(FadeIn(hdr10), Write(thm_top), run_time=1.1)

        ind_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        ind_tex = MathTex(
            r"\mathbf{Induction\;Proof\;of\;Theorem\;7.19:}\\[5pt]"
            r"1.\;\mathbf{Base\;(\gamma=1):}\;\|A_1\| \le C_1\|A_0\|^{r_1} = \Gamma_1\|A_0\|^{D_1}\\[4pt]"
            r"2.\;\mathbf{Inductive\;Step\;(\gamma-1\to\gamma):}\\"
            r"\;\;\|A_\gamma\| \le C_\gamma\|A_{\gamma-1}\|^{r_\gamma} \le C_\gamma\left(\Gamma_{\gamma-1}\|A_0\|^{D_{\gamma-1}}\right)^{r_\gamma}\\[4pt]"
            r"3.\;\mathbf{Closed\;Form:}\;\Gamma_\gamma = C_\gamma \Gamma_{\gamma-1}^{r_\gamma},\;\;D_\gamma = r_\gamma D_{\gamma-1}\;\blacksquare",
            font_size=15, color=WHITE
        ).move_to(ind_box)

        c_ax = Axes(
            x_range=[0, 4, 1], y_range=[0, 8, 2],
            x_length=4.8, y_length=2.75,
            axis_config={"include_tip": True, "color": GREY_B}
        ).move_to(RIGHT * 3.1 + DOWN * 0.65)
        c_unit = c_ax.plot(lambda g: 4.2 * (0.85 ** (2 ** g)), x_range=[0, 3.8], color=GREEN_C, stroke_width=3.8)
        c_sup = c_ax.plot(lambda g: 1.4 * (1.18 ** (2 ** (0.72 * g))), x_range=[0, 3.2], color=CRIMSON_RED, stroke_width=3.5)

        g_trk = ValueTracker(0.0)
        c_dot = always_redraw(lambda: Dot(
            c_ax.c2p(g_trk.get_value(), 4.2 * (0.85 ** (2 ** g_trk.get_value()))),
            color=HOLO_GOLD, radius=0.10
        ))
        n_foot = MathTex(
            r"\text{Lean 4 (\texttt{cascade\_inductive\_step}): Contractive Unit-Ball Stability vs. Super-Linear Growth}",
            font_size=16, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(ind_box), Write(ind_tex),
            Create(c_ax), Create(c_unit), Create(c_sup),
            FadeIn(c_dot), Write(n_foot),
            run_time=1.8
        )
        self.play(g_trk.animate.set_value(3.5), run_time=1.8, rate_func=rate_functions.ease_in_out_sine)
        self.wait(0.5)
        self.remove(c_dot)
        self.play(FadeOut(VGroup(hdr10, thm_top, ind_box, ind_tex, c_ax, c_unit, c_sup, n_foot)), run_time=0.8)


# =============================================================================
# SCENE 11: Ch7_Act11_Reconstruction_Sanity (Act 11)
# =============================================================================
class Ch7_Act11_Reconstruction_Sanity(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr11 = Text(
            "Act XI (Secs. 7.4-7.5): Reconstruction Map R, Sanity Checks & Explication 7.1",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        rm_top = MathTex(
            r"\mathcal{R} : \mathsf{HeimVocabulary} \rightsquigarrow \mathsf{MathematicalStructures} \qquad "
            r"(\mathbf{Ctx}_{\text{quant}}, J_{\text{quant}}) \;\xrightarrow{\;\pi_{\text{quant}}\;}\; \mathcal{E}_{\text{syn}}",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr11, DOWN, buff=0.12).align_to(hdr11, LEFT)
        self.add_fixed_in_frame_mobjects(hdr11, rm_top)
        self.play(FadeIn(hdr11), Write(rm_top), run_time=1.1)

        san_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        san_tex = MathTex(
            r"\mathbf{Three\;Sanity\;Checks\;(\S 7.5):}\\[5pt]"
            r"1.\;\mathbf{Linear\;Unary\;Cascade\;(r_j=1):}\\"
            r"\;\;D_M = 1,\;\; \Gamma_M = \prod_{j=1}^M C_j \implies \|A_M\| \le \Big(\prod C_j\Big)\|A_0\|.\\[4pt]"
            r"2.\;\mathbf{Realification\;Dimensions:}\\"
            r"\;\;\dim_{\mathbb{R}} = n\;(\mathbb{Q}),\;\; n\;(\mathbb{R}),\;\; 2n\;(\mathbb{C}).\\[4pt]"
            r"3.\;\mathbf{Zero\text{-}Field\;Vacuum\;Stability:}\\"
            r"\;\;A_0 \equiv 0 \implies A_M = f_M(\dots f_1(0)\dots) \equiv 0!",
            font_size=15, color=WHITE
        ).move_to(san_box)

        exp_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        exp_tex = MathTex(
            r"\mathbf{Carnapian\;Explication\;7.1:}\\[5pt]"
            r"\bullet\;\mathbf{Explicandum\;(D):}\;\text{Quantitaetsaspekt, }S_n;\widetilde{a}=R_n,\\"
            r"\;\;\text{Synkolatorraum }(m+m^k),\text{ Isoklinen, Feldzentren.}\\[4pt]"
            r"\bullet\;\mathbf{Explicatum\;(A/B):}\;\mathcal{E}_{\text{quant}},\;\mathcal{O}_{\text{quant}},\;S_n,\;\mathcal{M}_{\text{syn}},\\"
            r"\;\;\text{Foliation }\mathfrak{f}_A,\;\text{Morse--Bott }Z_\alpha,\;\text{Bound }\Gamma_M\|A_0\|^{D_M}.\\[4pt]"
            r"\bullet\;\mathbf{Fruitfulness:}\;\text{Uniform }C_b^0\text{ stability without blow-up!}",
            font_size=15, color=HOLO_GOLD
        ).move_to(exp_box)

        self.play(Create(san_box), Write(san_tex), Create(exp_box), Write(exp_tex), run_time=1.9)
        self.wait(0.8)
        self.play(FadeOut(VGroup(hdr11, rm_top, san_box, san_tex, exp_box, exp_tex)), run_time=0.8)


# =============================================================================
# SCENE 12: Ch7_Act12_Synthesis_Bridge_Ch8 (Act 12)
# =============================================================================
class Ch7_Act12_Synthesis_Bridge_Ch8(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr12 = Text(
            "Act XII (Sec. 7.6): Chapter 7 Synthesis Flowchart & Bridge to Chapter 8",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr12)
        self.play(FadeIn(hdr12), run_time=0.7)

        s7_nodes = VGroup()
        s7_specs = [
            (r"\mathbf{1.\;Quant\;Site}\\(\mathbf{Ctx}_{\text{quant}}, J_{\text{quant}})", ROYAL_BLUE, LEFT * 4.3 + UP * 1.45),
            (r"\mathbf{2.\;Coeff\;Poset}\\\mathbb{Q}\subseteq\mathbb{R}\subseteq\mathbb{C}", TEAL_BRIGHT, ORIGIN + UP * 1.45),
            (r"\mathbf{3.\;Tensor\;Operad}\\\mathcal{O}_{\text{quant}}\;(\widehat{\otimes}_\pi)", ORANGE_GOLD, RIGHT * 4.3 + UP * 1.45),
            (r"\mathbf{4.\;Realified\;Space}\\R_n\cong\mathbb{R}^{d(\mathbb{K})n}", ROYAL_BLUE, LEFT * 4.3 + DOWN * 0.25),
            (r"\mathbf{5.\;Synkolatorraum}\\\mathcal{M}_{\text{syn}}=T^{\otimes k}R_m", TEAL_BRIGHT, ORIGIN + DOWN * 0.25),
            (r"\mathbf{6.\;Cascade\;Bound}\\\|A_M\|\le\Gamma_M\|A_0\|^{D_M}", HOLO_GOLD, RIGHT * 4.3 + DOWN * 0.25),
        ]
        for t_s, c_s, p_s in s7_specs:
            bx = RoundedRectangle(width=3.5, height=0.95, corner_radius=0.1, color=c_s, fill_opacity=0.20).move_to(p_s)
            tx = MathTex(t_s, font_size=16, color=WHITE).move_to(bx)
            s7_nodes.add(VGroup(bx, tx))

        s7_edges = VGroup(
            Arrow(s7_nodes[0].get_right(), s7_nodes[1].get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s7_nodes[1].get_right(), s7_nodes[2].get_left(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s7_nodes[0].get_bottom(), s7_nodes[3].get_top(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s7_nodes[1].get_bottom(), s7_nodes[4].get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s7_nodes[2].get_bottom(), s7_nodes[5].get_top(), color=ORANGE_GOLD, buff=0.06, stroke_width=2.5),
            DashedLine(s7_nodes[3].get_right(), s7_nodes[4].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16),
            DashedLine(s7_nodes[4].get_right(), s7_nodes[5].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16)
        )

        fin7_box = RoundedRectangle(width=12.0, height=1.55, corner_radius=0.12, color=HOLO_GOLD, fill_opacity=0.14).to_edge(DOWN, buff=0.20)
        fin7_tex = MathTex(
            r"\bullet\;\textbf{Analytical Obstruction:}\;\text{Unconstrained multilinear operations }f\in\mathcal{O}_{\text{quant}}\text{ entangle all coordinates }(y_1,\dots,y_m).\\[4pt]"
            r"\bullet\;\textbf{Functorial Ascent to Chapter 8:}\;\text{Seeley }C^\infty\text{ Extensions on }(\mathbb{R}_{\ge 0})^n,\;\text{Grothendieck Nuclearity }"
            r"\mathcal{S}(\mathcal{M}_m)\cong\widehat{\bigotimes}_\pi\mathcal{S}(\mathbb{R}_{\ge 0})\text{ \& }15\to 3\text{ Modes!}",
            font_size=15, color=HOLO_GOLD
        ).move_to(fin7_box)

        self.play(FadeIn(s7_nodes, lag_ratio=0.08), Create(s7_edges), run_time=1.8)
        self.play(Create(fin7_box), Write(fin7_tex), run_time=1.8)
        self.play(fin7_box.animate.set_stroke(WHITE, width=4), rate_func=rate_functions.there_and_back, run_time=1.0)
        self.wait(1.5)
