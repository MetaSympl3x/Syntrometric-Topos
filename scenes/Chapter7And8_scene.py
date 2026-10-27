from manim import *
import numpy as np


def dashed_box(width, height, color, num_dashes=7):
    hw, hh = width / 2, height / 2
    ul, ur, dl, dr = np.array([-hw, hh, 0]), np.array([hw, hh, 0]), np.array([-hw, -hh, 0]), np.array([hw, -hh, 0])
    return VGroup(
        DashedLine(ul, ur, color=color, dash_length=width / (2 * num_dashes)),
        DashedLine(ur, dr, color=color, dash_length=height / (2 * num_dashes)),
        DashedLine(dr, dl, color=color, dash_length=width / (2 * num_dashes)),
        DashedLine(dl, ul, color=color, dash_length=height / (2 * num_dashes)),
    )


class Chapter7And8UltimateUpgraded(ThreeDScene):
    def construct(self):
        # =====================================================================
        # STANDARDIZED BOOK COLOR PALETTE (MATCHING LATEX PREAMBLE)
        # =====================================================================
        ROYAL_BLUE = "#4169E1"     # Real Continuum R^n / Base Parameter Manifold
        TEAL_BRIGHT = "#20B2AA"    # Complex Phase Fiber C / Isocline Foliation
        ORANGE_GOLD = "#FFA500"    # Semantic Iterator S_n / Gradient Vectors
        CRIMSON_RED = "#DC143C"    # Fehlstelle 0 / Morse-Bott Center / Super-Linear Bound
        HOLO_GOLD = "#FFD700"      # Geometric Morphism / Nuclear Tensor / 3 Quant Modes
        PURPLE_SYN = "#9370DB"     # Seeley Extension / Polarization / Poincare Integral
        SLATE_GREY = "#708090"     # Structural Framing & Corner Boundaries

        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        # =====================================================================
        # ACT I (SEC 7.1.1): ANTHROPOMORPHIC PIVOT & COGNITIVE PLURALISM
        # =====================================================================
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

        # Left Panel: Qualitaet (Regional Pluralism) vs Quantitaet (Global Unification)
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

        # Right Panel: Carnap 7.1 (Reduction Sentences & Friedman Coordinative Definitions)
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

        # =====================================================================
        # ACT II (SEC 7.1.2): QUANTITÄTSSYNTRIX (SM-28) & SYNKOLATORRAUM
        # =====================================================================
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

        # =====================================================================
        # ACT III (SEC 7.2.1): 3D REALIFICATION BUNDLE (FIG 7.1) & COEFF POSET
        # =====================================================================
        hdr3 = Text(
            "Act III (Sec. 7.2.1): 3D Realification Bundle (Fig 7.1) & Coeff Poset",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        poset_bot = MathTex(
            r"\mathbf{Coeff} := [\mathbb{Q}\subseteq\mathbb{R}\subseteq\mathbb{C}], \qquad "
            r"\dim_{\mathbb{R}}((\mathbb{Q}^n)_{\mathbb{R}})=n "
            r"\xrightarrow{\;\iota_{\mathbb{Q},\mathbb{R}}\;} \dim_{\mathbb{R}}((\mathbb{R}^n)_{\mathbb{R}})=n "
            r"\xrightarrow{\;\iota_{\mathbb{R},\mathbb{C}}\;} \dim_{\mathbb{R}}((\mathbb{C}^n)_{\mathbb{R}})=2n\;\;(\text{Def 7.1})",
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
            r"\mathbf{Realification\;Functor\;V_{\mathbb{R}}\;(Def\;7.1):}\\[4pt]"
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

        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.3)
        self.play(FadeOut(VGroup(r_surf, q_dots, st_1, st_2, sph_1, sph_2, vec_1, vec_2, real_card, real_tex, hdr3, poset_bot)), run_time=0.8)

        # =====================================================================
        # ACT IV (SEC 7.2.1): QUANTITATIVE TOPOS E_quant & DEDEKIND REALS R_E
        # =====================================================================
        hdr4 = Text(
            "Act IV (Sec. 7.2.1): Quantitative Topos E_quant & Internal Dedekind Reals",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"U_{\text{quant}}(U_Q) := P^U \cong \mathbb{R}^{3d(\mathbb{K}_U)n_U}, \qquad "
            r"\mathcal{E}_{\text{quant}} := \mathbf{Sh}(\mathbf{Ctx}_{\text{quant}}, J_{\text{quant}}), \qquad "
            r"\pi_{\text{quant}} = (\pi_{\text{quant}}^* \dashv \pi_{\text{quant}*}) : \mathcal{E}_{\text{quant}} \longrightarrow \mathcal{E}_{\text{syn}}",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr4, DOWN, buff=0.12).align_to(hdr4, LEFT)
        self.add_fixed_in_frame_mobjects(hdr4, eq_top)
        self.play(FadeIn(hdr4), Write(eq_top), run_time=1.1)

        gm_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        gm_tex = MathTex(
            r"\mathbf{Prop\;7.4\;\&\;Thm\;7.6\;(Quantitative\;Topos):}\\[5pt]"
            r"\bullet\;\text{Scalar Intertwining: }\;\alpha_P\circ\rho_U(\lambda) = \rho_V(\iota(\lambda))\circ\alpha_P\\[4pt]"
            r"\bullet\;\text{Pullback Field Meet: }\;\mathbb{K}_W := \mathbb{K}_{V_1}\cap\mathbb{K}_{V_2} = \min(\mathbb{K}_{V_1},\mathbb{K}_{V_2})\\[4pt]"
            r"\bullet\;\text{Direct Image: }\;(\pi_{\text{quant}*}\mathbf{F})(U) = \lim_{I(U_Q)\to U}\mathbf{F}(U_Q)\\[4pt]"
            r"\bullet\;\text{Inverse Image: }\;\pi_{\text{quant}}^* = \mathbf{a}_{J_{\text{quant}}}(-\circ I^{\text{op}})\text{ is exact!}",
            font_size=15, color=WHITE
        ).move_to(gm_panel)

        # Right Panel: Internal Dedekind Real Object \mathbb{R}_{\mathcal{E}} with Animated Cut (L, U)
        ded_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.52)
        ded_tex = MathTex(
            r"\mathbf{Def\;7.7\;\&\;Thm\;7.8\;(Internal\;Dedekind\;Reals\;\mathbb{R}_{\mathcal{E}}):}\\[4pt]"
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
        self.play(FadeOut(VGroup(hdr4, eq_top, gm_panel, gm_tex, ded_panel, ded_tex, cut_nl, cut_pt)), run_time=0.8)

        # =====================================================================
        # ACT V (SECS 7.2.2 & 7.3.1): TENSOR OPERAD O_quant (FIG 7.3) & FUNCTOR S_n
        # =====================================================================
        hdr5 = Text(
            "Act V (Secs. 7.2.2 & 7.3.1): Tensor Operad O_quant (Fig 7.3) & Functor S_n",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        op_top = MathTex(
            r"X_{(m,k)} := \Gamma_b^0(R_m, T^{\otimes k}R_m), \quad "
            r"\mathcal{O}_{\text{quant}}(\vec{c}; c) := \mathcal{B}\!\left(\widehat{\bigotimes}_{i=1}^{r,\pi} X_{(m_i,k_i)},\; X_{(m,k)}\right), \quad "
            r"\|y\|_{R_n} := \max_{1\le l\le n} \lambda_l\|y_l\|_{\mathbb{K}}\;\;(\text{Def 7.12})",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr5, DOWN, buff=0.12).align_to(hdr5, LEFT)
        self.add_fixed_in_frame_mobjects(hdr5, op_top)
        self.play(FadeIn(hdr5), Write(op_top), run_time=1.1)

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

        sn_panel = RoundedRectangle(width=5.8, height=3.45, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.45)
        sn_tex = MathTex(
            r"\mathbf{Isometric\;Suboperad\;\mathcal{O}_{\text{isom}}\subseteq\mathcal{O}_{\text{quant}}\;(Def\;7.11):}\\[4pt]"
            r"f(\varphi_* A_1,\dots,\varphi_* A_r) = \varphi_* f(A_1,\dots,A_r)\quad\forall\varphi\in\operatorname{Isom}(R_m,g_m)\\[6pt]"
            r"\mathbf{Dimensional\;Parameter\;Functor\;S_n\;(Def\;7.12):}\\[4pt]"
            r"S_n: \mathbf{DimField}_\Lambda \longrightarrow \mathbf{Ban}_{\le 1},\quad (\mathbb{K},\mathbf{\Lambda})\longmapsto R_n\cong\mathbb{R}^{d(\mathbb{K})n}\\[4pt]"
            r"\bullet\;\text{Scale Contraction: }\;\lambda'_l\|\iota(x)\|_{\mathbb{L}} \le \lambda_l\|x\|_{\mathbb{K}}",
            font_size=15, color=WHITE
        ).move_to(sn_panel)

        self.play(
            FadeIn(in1, t_i1, in2, t_i2, in3, t_i3),
            Create(coup), Write(t_cp), Create(rib_arrs),
            Create(sn_panel), Write(sn_tex),
            run_time=1.9
        )
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr5, op_top, in1, t_i1, in2, t_i2, in3, t_i3, coup, t_cp, rib_arrs, sn_panel, sn_tex)), run_time=0.8)

        # =====================================================================
        # ACT VI (SECS 7.3.2–7.3.3): ISOCLINE FOLIATIONS & CASCADE NORM BOUND
        # =====================================================================
        hdr6 = Text(
            "Act VI (Secs. 7.3.2-7.3.3): Isocline Foliations (Fig 7.5) & Cascade Bound",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        fol_top = MathTex(
            r"\mathcal{M}_{\text{syn}} := T^{\otimes k}R_m\;(\dim=m+m^k), \qquad "
            r"\pi_\gamma^\circledast := \sharp_g^{\otimes k}\circ\pi_\gamma^*\circ\flat_g^{\otimes k}\;\;(\text{Prop 7.15}), \qquad "
            r"\|A_\gamma\|_{C_b^0} \le \Gamma_\gamma \|A_0\|_{C_b^0}^{D_\gamma}\;\;(\text{Thm 7.16})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr6, DOWN, buff=0.12).align_to(hdr6, LEFT)
        self.add_fixed_in_frame_mobjects(hdr6, fol_top)
        self.play(FadeIn(hdr6), Write(fol_top), run_time=1.1)

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

        c_ax = Axes(
            x_range=[0, 4, 1], y_range=[0, 8, 2],
            x_length=4.8, y_length=2.75,
            axis_config={"include_tip": True, "color": GREY_B}
        ).move_to(RIGHT * 3.1 + DOWN * 0.65)
        c_hdr = MathTex(
            r"D_\gamma := \prod_{j=1}^\gamma r_j, \qquad \Gamma_\gamma := \prod_{j=1}^\gamma C_j^{\prod_{\ell=j+1}^\gamma r_\ell}",
            font_size=17, color=HOLO_GOLD
        ).next_to(c_ax, UP, buff=0.08)

        c_unit = c_ax.plot(lambda g: 4.2 * (0.85 ** (2 ** g)), x_range=[0, 3.8], color=GREEN_C, stroke_width=3.8)
        c_sup  = c_ax.plot(lambda g: 1.4 * (1.18 ** (2 ** (0.72 * g))), x_range=[0, 3.2], color=CRIMSON_RED, stroke_width=3.5)

        g_trk = ValueTracker(0.0)
        c_dot = always_redraw(lambda: Dot(
            c_ax.c2p(g_trk.get_value(), 4.2 * (0.85 ** (2 ** g_trk.get_value()))),
            color=HOLO_GOLD, radius=0.10
        ))

        n_lbl = MathTex(r"\text{Lean 4 (\texttt{cascade\_inductive\_step}): }\|A_\gamma\|_{C_b^0} \le ", font_size=16, color=GREEN_C)
        n_dec = DecimalNumber(0.85, num_decimal_places=2, font_size=16, color=HOLO_GOLD)
        n_dec.add_updater(lambda m: m.set_value(0.85 ** (2 ** g_trk.get_value())))
        n_row = VGroup(n_lbl, n_dec).arrange(RIGHT, buff=0.08).to_edge(DOWN, buff=0.20)

        self.play(
            GrowArrow(ax_x), GrowArrow(ax_y), Create(iso_arcs),
            FadeIn(g_vecs, z_pt), Write(z_lbl),
            Create(c_ax), Write(c_hdr), Create(c_unit), Create(c_sup),
            FadeIn(c_dot, n_row),
            run_time=1.8
        )
        self.play(g_trk.animate.set_value(3.5), run_time=1.8, rate_func=rate_functions.ease_in_out_sine)
        n_dec.clear_updaters()
        self.wait(0.5)

        self.remove(c_dot)
        self.play(FadeOut(VGroup(hdr6, fol_top, ax_x, ax_y, iso_arcs, g_vecs, z_pt, z_lbl, c_ax, c_hdr, c_unit, c_sup, n_row)), run_time=0.8)

        # =====================================================================
        # ACT VII (SECS 8.1.1–8.1.2): PRIMIGENE ÄONDYNE (SM-29) & SEPARATION
        # =====================================================================
        hdr7 = Text(
            "Act VII (Secs. 8.1.1-8.1.2): Primigene Aeondyne (SM-29) & Variable Separation",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm29_top = MathTex(
            r"\mathbf{y}\mathbf{R}_n \equiv \langle \mathfrak{f},\, R_n,\, m \rangle \equiv \widetilde{\mathbf{a}}(x_i)_1^n, \qquad "
            r"R_n = (x_i)_n, \qquad 0 \le x_i \le \infty\;\;(\text{SM-29})",
            font_size=19, color=TEAL_BRIGHT
        ).next_to(hdr7, DOWN, buff=0.12).align_to(hdr7, LEFT)
        self.add_fixed_in_frame_mobjects(hdr7, sm29_top)
        self.play(FadeIn(hdr7), Write(sm29_top), run_time=1.1)

        ae_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        ae_tex = MathTex(
            r"\mathbf{Quantitaetssyntrix\;as\;Primigene\;Aeondyne:}\\[5pt]"
            r"\bullet\;\text{Because algebraic number continua }x_i\in[0,\infty)\\"
            r"\;\;\text{vary continuously, }\mathbf{y}\mathbf{R}_n\text{ is automatically}\\"
            r"\;\;\text{a }\textit{primigene Aeondyne}\text{ (SM Eq. 29)!}\\[5pt]"
            r"\bullet\;\mathbf{Parameter\text{-}Tensorium\;R_n:}\;\mathcal{M}_n = (\mathbb{R}_{\ge 0})^n\\[4pt]"
            r"\bullet\;\mathbf{Ganzlaeufige\;Aeondyne:}\;\mathfrak{f}\equiv\mathfrak{f}(t'),\;\;t'\in R_{m_s}",
            font_size=15, color=WHITE
        ).move_to(ae_panel)

        sep_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        sep_tex = MathTex(
            r"\mathbf{Separation\;der\;Variablen\;(SM,\;p.\;132):}\\[5pt]"
            r"f(x_1,\dots,x_m) = \prod_{l=1}^m \phi_l(x_l) \quad\text{or}\quad \sum_{j=1}^\infty \lambda_j\bigotimes_{l=1}^m \phi_j^{(l)}(x_l)\\[5pt]"
            r"\bullet\;\text{Decomposes multi-dimensional synkolation fields}\\"
            r"\;\;\text{into isolated 1D coordinate channels.}\\[5pt]"
            r"\bullet\;\mathbf{Funktionale\;Asymmetrien:}\;\text{Exposes anisotropic}\\"
            r"\;\;\text{weightings between space, time, and charge axes!}",
            font_size=15, color=HOLO_GOLD
        ).move_to(sep_panel)

        self.play(Create(ae_panel), Write(ae_tex), Create(sep_panel), Write(sep_tex), run_time=1.9)
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr7, sm29_top, ae_panel, ae_tex, sep_panel, sep_tex)), run_time=0.8)

        # =====================================================================
        # ACT VIII (SECS 8.1.3 & 8.2.2): INFINITESIMAL FUNCTORS (SM-30..36) & SDG
        # =====================================================================
        hdr8 = Text(
            "Act VIII (Secs. 8.1.3 & 8.2.2): Differential/Integral Functors (SM-30..36)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        calc_top = MathTex(
            r"\tilde{\mathrm{d}}|f := df = \sum_{i=1}^n (\tilde{\partial}_i|f)\,dx^i\;\;(\text{SM-30}), \quad "
            r"(\mathrm{I}_{\mathbf{0}}\,\omega)(x) := \int_0^1 \sum_{i=1}^n x^i\omega_i(tx)\,dt, \quad "
            r"\tilde{\mathrm{d}}|(\mathrm{I}_{\mathbf{0}}\,\omega) = \omega\;\;(\text{SM-33})",
            font_size=17, color=PURPLE_SYN
        ).next_to(hdr8, DOWN, buff=0.12).align_to(hdr8, LEFT)
        self.add_fixed_in_frame_mobjects(hdr8, calc_top)
        self.play(FadeIn(hdr8), Write(calc_top), run_time=1.1)

        p_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(LEFT * 3.15 + DOWN * 0.52)
        p_hdr = MathTex(r"\text{Poincare Homotopy Ray Integral }\mathrm{I}_{\mathbf{0}}\text{ \& Thm 8.1}", font_size=17, color=PURPLE_SYN).next_to(p_box.get_top(), DOWN, buff=0.12)

        orig_pt = Dot(LEFT * 5.1 + DOWN * 1.45, color=CRIMSON_RED, radius=0.10)
        orig_lbl = MathTex(r"\mathbf{0}", font_size=18, color=CRIMSON_RED).next_to(orig_pt, DOWN + LEFT, buff=0.04)
        ray_lines = [
            Line(
                LEFT * 5.1 + DOWN * 1.45,
                LEFT * 5.1 + DOWN * 1.45 + 1.85 * np.array([np.cos(a), np.sin(a), 0]),
                color=HOLO_GOLD, stroke_width=2.5
            )
            for a in [15 * DEGREES, 45 * DEGREES, 75 * DEGREES]
        ]
        p_rays = VGroup(*[Arrow(l.get_start(), l.get_end(), color=HOLO_GOLD, buff=0, stroke_width=2.5) for l in ray_lines])
        ray_dots = VGroup(*[Dot(LEFT * 5.1 + DOWN * 1.45, color=TEAL_BRIGHT, radius=0.075) for _ in range(3)])

        sm35a_tex = MathTex(
            r"\mathbf{Thm\;8.1\;(\text{SM-35a}):}\\"
            r"{}^+\!\left({}_+(y,y)?,(\;)\right)? = \frac{1}{2}\left(\mathbf{y}\widetilde{\mathbf{y}}\right)^2",
            font_size=16, color=WHITE
        ).move_to(LEFT * 2.15 + DOWN * 0.85)

        sdg_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        sdg_tex = MathTex(
            r"\mathbf{Carnap\;8.1\;(Synthetic\;Infinitesimals\;vs.\;DEC):}\\[5pt]"
            r"\bullet\;\textbf{Synthetic Differential Geometry (Kock--Lawvere):}\\"
            r"\;\;D := [\![d\in R \mid d^2 = 0]\!]\subset R\quad(\text{Smooth Topos})\\[3pt]"
            r"\;\;\forall d\in D,\;\; f(x+d) = f(x) + f'(x)d\\[6pt]"
            r"\bullet\;\textbf{Discrete Exterior Calculus (Ch. 10 Metronics):}\\"
            r"\;\;\text{Finite lattice step }\tau > 0\text{ on }\mathbb{M}_\tau^n\text{ with cross-term}\\"
            r"\;\;\nabla(uv) = u\nabla v + v\nabla u - (\nabla u)(\nabla v)!",
            font_size=15, color=WHITE
        ).move_to(sdg_box)

        self.play(
            Create(p_box), Write(p_hdr),
            FadeIn(orig_pt), Write(orig_lbl),
            Create(p_rays), FadeIn(ray_dots), Write(sm35a_tex),
            Create(sdg_box), Write(sdg_tex),
            run_time=1.8
        )
        self.play(
            *[MoveAlongPath(ray_dots[i], ray_lines[i]) for i in range(3)],
            run_time=1.3, rate_func=rate_functions.ease_in_out_sine
        )
        self.wait(0.6)

        self.play(FadeOut(VGroup(hdr8, calc_top, p_box, p_hdr, orig_pt, orig_lbl, p_rays, ray_dots, sm35a_tex, sdg_box, sdg_tex)), run_time=0.8)

        # =====================================================================
        # ACT IX (SECS 8.2.1 & 8.3.1): SEELEY EXTENSION ON CORNERS (FIG 8.2)
        # =====================================================================
        hdr9 = Text(
            "Act IX (Secs. 8.2.1 & 8.3.1): Corner Smoothness & Seeley Extension (Fig 8.2)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        see_top = MathTex(
            r"\mathcal{A}_{\mathbb{K}}(\mathcal{M}_n) := \mathbb{K}\cdot 1_{\mathcal{A}} \oplus \mathscr{S}(\mathcal{M}_n,\mathbb{K}), \quad "
            r"(\mathcal{E}_{x_i} f)(x_i) := \sum_{k=0}^\infty a_k \chi(-2^k x_i) f(-2^k x_i), \quad "
            r"\sum_{k=0}^\infty a_k (-2^k)^m = 1\;\;(\forall m\in\mathbb{N}_0)",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr9, DOWN, buff=0.12).align_to(hdr9, LEFT)
        self.add_fixed_in_frame_mobjects(hdr9, see_top)
        self.play(FadeIn(hdr9), Write(see_top), run_time=1.1)

        # Left Side: Why Naive Approaches Fail II + Visual Kink vs Smooth Seeley Curve
        fail2_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=CRIMSON_RED, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        fail2_tex = MathTex(
            r"\mathbf{Why\;Naive\;Corner\;Extensions\;Fail\;II:}\\[3pt]"
            r"\bullet\;\text{Even Reflection }e^{-|x|}\text{ (Red): Derivative kink at }x=0!\\[2pt]"
            r"\bullet\;\text{Seeley Extension }\mathcal{E}_{x_1}f\text{ (Green): }C^\infty\text{ across }x=0!",
            font_size=14, color=WHITE
        ).move_to(fail2_box.get_top() + DOWN * 0.65)

        kink_axes = Axes(
            x_range=[-1.6, 1.6, 0.8], y_range=[0, 1.4, 0.5],
            x_length=4.4, y_length=1.55,
            axis_config={"include_tip": True, "color": GREY_B}
        ).move_to(LEFT * 3.15 + DOWN * 1.25)
        kink_curve = kink_axes.plot(lambda x: np.exp(-abs(x)), x_range=[-1.5, 1.5], color=CRIMSON_RED, stroke_width=3.2, use_smoothing=False)
        smooth_seeley = kink_axes.plot(
            lambda x: np.exp(-x) if x >= 0 else (1.0 - x + 0.5 * (x**2)) * np.exp(-1.2 * (x**2)),
            x_range=[-1.5, 1.5], color=GREEN_C, stroke_width=3.5
        )

        # Right Side: 4-Quadrant Multidimensional Seeley Extension (Figure 8.2) using safe dashed_box
        s_c = RIGHT * 3.15 + DOWN * 0.52
        q_1 = Rectangle(width=2.1, height=1.45, color=TEAL_BRIGHT, fill_color=TEAL_BRIGHT, fill_opacity=0.28).move_to(s_c + RIGHT * 1.05 + UP * 0.725)
        q_2 = dashed_box(width=2.1, height=1.45, color=PURPLE_SYN, num_dashes=6).move_to(s_c + LEFT * 1.05 + UP * 0.725)
        q_4 = dashed_box(width=2.1, height=1.45, color=PURPLE_SYN, num_dashes=6).move_to(s_c + RIGHT * 1.05 + DOWN * 0.725)
        q_3 = dashed_box(width=2.1, height=1.45, color=ORANGE_GOLD, num_dashes=6).move_to(s_c + LEFT * 1.05 + DOWN * 0.725)

        tq1 = MathTex(r"\mathcal{M}_2=(\mathbb{R}_{\ge 0})^2\\f\in\mathscr{S}(\mathcal{M}_2)", font_size=15, color=TEAL_BRIGHT).move_to(q_1)
        tq2 = MathTex(r"\mathcal{E}_{x_1} f\\(x_1<0)", font_size=15, color=PURPLE_SYN).move_to(q_2)
        tq4 = MathTex(r"\mathcal{E}_{x_2} f\\(x_2<0)", font_size=15, color=PURPLE_SYN).move_to(q_4)
        tq3 = MathTex(r"(\mathcal{E}_{x_1}\otimes\mathcal{E}_{x_2})f\\(\text{Corner})", font_size=14, color=ORANGE_GOLD).move_to(q_3)
        c_zero = Dot(s_c, color=CRIMSON_RED, radius=0.10)

        self.play(
            Create(fail2_box), Write(fail2_tex),
            Create(kink_axes), Create(kink_curve), Create(smooth_seeley),
            FadeIn(q_1, tq1, c_zero),
            run_time=1.6
        )
        self.play(
            Create(q_2), Write(tq2),
            Create(q_4), Write(tq4),
            Create(q_3), Write(tq3),
            run_time=1.6
        )
        self.wait(0.7)

        self.play(FadeOut(VGroup(
            hdr9, see_top, fail2_box, fail2_tex, kink_axes, kink_curve, smooth_seeley,
            q_1, tq1, q_2, tq2, q_4, tq4, q_3, tq3, c_zero
        )), run_time=0.8)

        # =====================================================================
        # ACT X (SEC 8.3.1): GROTHENDIECK NUCLEARITY (FIG 8.1) & TOY SERIES
        # =====================================================================
        hdr10 = Text(
            "Act X (Sec. 8.3.1): Grothendieck Nuclearity (Fig 8.1) & Series Separation",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        nuc_top = MathTex(
            r"\mathscr{S}\!\left((\mathbb{R}_{\ge 0})^m\right) \;\cong\; "
            r"\widehat{\bigotimes}_{l=1}^{m,\pi} \mathscr{S}(\mathbb{R}_{\ge 0}) \;\cong\; "
            r"\widehat{\bigotimes}_{l=1}^{m,\varepsilon} \mathscr{S}(\mathbb{R}_{\ge 0}), \qquad "
            r"f(x_1,\dots,x_m) = \sum_{j=1}^\infty \lambda_j\,\phi_j^{(1)}(x_1)\otimes\cdots\otimes\phi_j^{(m)}(x_m)\;\;(\text{Thm 8.4})",
            font_size=16, color=ROYAL_BLUE
        ).next_to(hdr10, DOWN, buff=0.12).align_to(hdr10, LEFT)
        self.add_fixed_in_frame_mobjects(hdr10, nuc_top)
        self.play(FadeIn(hdr10), Write(nuc_top), run_time=1.1)

        pkt_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        pkt_hdr = MathTex(r"\text{Fig 8.1: Nuclear Wave-Packet Factorization}", font_size=17, color=ROYAL_BLUE).next_to(pkt_box.get_top(), DOWN, buff=0.12)

        blob_2d = Ellipse(width=1.45, height=0.85, color=TEAL_BRIGHT, fill_color=TEAL_BRIGHT, fill_opacity=0.45).rotate(30 * DEGREES).move_to(LEFT * 4.75 + DOWN * 0.65)
        eq_sign = MathTex(r"=", font_size=28, color=HOLO_GOLD).move_to(LEFT * 3.55 + DOWN * 0.65)

        w1_x = FunctionGraph(lambda t: 0.42 * np.exp(-t**2) * np.cos(4 * t), x_range=[-1.1, 1.1], color=ROYAL_BLUE, stroke_width=3.2).move_to(LEFT * 1.95 + DOWN * 0.15)
        ox_s = MathTex(r"\widehat{\otimes}_\pi = \widehat{\otimes}_\varepsilon", font_size=18, color=HOLO_GOLD).move_to(LEFT * 1.95 + DOWN * 0.65)
        w1_y = FunctionGraph(lambda t: 0.42 * np.exp(-t**2) * np.sin(4 * t), x_range=[-1.1, 1.1], color=TEAL_BRIGHT, stroke_width=3.2).move_to(LEFT * 1.95 + DOWN * 1.15)

        ex81_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=HOLO_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        ex81_tex = MathTex(
            r"\mathbf{Remark\;8.1\;(Explicit\;Nuclear\;Expansion):}\\[5pt]"
            r"f(x_1, x_2) = e^{-(x_1+x_2)}\cos(x_1 x_2) \in \mathscr{S}((\mathbb{R}_{\ge 0})^2)\\[5pt]"
            r"= \sum_{k=0}^\infty \underbrace{\frac{(-1)^k}{(2k)!}}_{\lambda_k} "
            r"\underbrace{\left(x_1^{2k} e^{-x_1}\right)}_{\phi_k^{(1)}(x_1)} \otimes "
            r"\underbrace{\left(x_2^{2k} e^{-x_2}\right)}_{\phi_k^{(2)}(x_2)}\\[5pt]"
            r"\sum_{k=0}^\infty |\lambda_k| = \sum_{k=0}^\infty \frac{1}{(2k)!} = \cosh(1) \approx 1.543 < \infty!",
            font_size=15, color=WHITE
        ).move_to(ex81_box)

        self.play(
            Create(pkt_box), Write(pkt_hdr),
            FadeIn(blob_2d), Write(eq_sign),
            Create(w1_x), Write(ox_s), Create(w1_y),
            Create(ex81_box), Write(ex81_tex),
            run_time=1.9
        )
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr10, nuc_top, pkt_box, pkt_hdr, blob_2d, eq_sign, w1_x, ox_s, w1_y, ex81_box, ex81_tex)), run_time=0.8)

        # =====================================================================
        # ACT XI (SECS 8.3.2–8.3.3): POLARIZATION (THM 8.5) & 15-TO-3 COLLAPSE
        # =====================================================================
        hdr11 = Text(
            "Act XI (Secs. 8.3.2-8.3.3): Polarization (Thm 8.5) & 15-to-3 Class Collapse",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        pol_top = MathTex(
            r"\operatorname{Pol}(v_1,\dots,v_m) = \frac{1}{2^m m!}\sum_{\epsilon\in\{-1,1\}^m} \left(\prod_{i=1}^m\epsilon_i\right)\!\left(\sum_{j=1}^m\epsilon_j v_j\right)^m, \qquad "
            r"F(\underbrace{x_1,\dots,x_1}_{a_1},\dots,x_k) = F_{\text{red}}(x_1,\dots,x_k)\;\;(k<m)",
            font_size=16, color=PURPLE_SYN
        ).next_to(hdr11, DOWN, buff=0.12).align_to(hdr11, LEFT)
        self.add_fixed_in_frame_mobjects(hdr11, pol_top)
        self.play(FadeIn(hdr11), Write(pol_top), run_time=1.1)

        pol_panel = RoundedRectangle(width=5.7, height=3.35, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(LEFT * 3.15 + DOWN * 0.45)
        pol_tex = MathTex(
            r"\mathbf{Thm\;8.5\;(Homometral\;Reducibility,\;SM\;p.\;133):}\\[5pt]"
            r"v^m = \sum_{k=1}^m \sum_{1\le i_1<\dots<i_k\le n} c_{i_1\dots i_k}\left(e_{i_1}\odot\cdots\odot e_{i_k}\right)\\[6pt]"
            r"\mathbf{Cubic\;Toy\;Example\;(m=3,\; k=2):}\\[4pt]"
            r"F(x_1, x_1, x_2) = x_1^2 x_2\quad(\text{Nominal Arity }m=3)\\[3pt]"
            r"\implies F_{\text{red}}(u, v) := u^2 v \in \mathcal{O}_{\text{quant}}(2; 1)\quad(\text{Effective }k=2 < 3)!",
            font_size=15, color=WHITE
        ).move_to(pol_panel)

        c3_panel = RoundedRectangle(width=5.8, height=3.35, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.45)
        c3_hdr = MathTex(r"\text{Thm 8.6: } 2^4-1=15 \;\longrightarrow\; 2^2-1=\mathbf{3\text{ Quantitative Modes}}", font_size=17, color=HOLO_GOLD).next_to(c3_panel.get_top(), DOWN, buff=0.12)

        grid_15 = VGroup(*[
            Dot(
                RIGHT * (1.50 + (idx % 5) * 0.8) + UP * (0.15 - (idx // 5) * 0.55),
                color=TEAL_BRIGHT if idx < 9 else CRIMSON_RED, radius=0.075
            )
            for idx in range(15)
        ])

        m_card1 = RoundedRectangle(width=5.1, height=0.60, corner_radius=0.08, color=ORANGE_GOLD, fill_opacity=0.24).move_to(RIGHT * 3.1 + UP * 0.15)
        m_card2 = RoundedRectangle(width=5.1, height=0.60, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.24).move_to(RIGHT * 3.1 + DOWN * 0.60)
        m_card3 = RoundedRectangle(width=5.1, height=0.60, corner_radius=0.08, color=HOLO_GOLD, fill_opacity=0.24).move_to(RIGHT * 3.1 + DOWN * 1.35)

        mt1 = MathTex(r"1.\;\mathbf{Kor}_{\{K\}}:\;\text{Pure Coupled Interaction }\{K_m, K_s\}", font_size=16, color=ORANGE_GOLD).move_to(m_card1)
        mt2 = MathTex(r"2.\;\mathbf{Kor}_{\{C\}}:\;\text{Pure Parallel Composition }\{C_m, C_s\}", font_size=16, color=ROYAL_BLUE).move_to(m_card2)
        mt3 = MathTex(r"3.\;\mathbf{Kor}_{\{K,C\}}:\;\text{Partial Coupling + Composition}", font_size=16, color=HOLO_GOLD).move_to(m_card3)
        modes_3 = VGroup(m_card1, mt1, m_card2, mt2, m_card3, mt3)

        lean8_foot = MathTex(
            r"\text{Lean 4 (\texttt{Syntrometrie.StratumB.QuantitativeAlgebra}): }\; "
            r"\texttt{binary\_polarization\_identity} \;\wedge\; \texttt{Fintype.card (Finset QuantMode) - 1 = 3}",
            font_size=16, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(pol_panel), Write(pol_tex),
            Create(c3_panel), Write(c3_hdr), FadeIn(grid_15, lag_ratio=0.04),
            Write(lean8_foot),
            run_time=1.8
        )
        self.play(ReplacementTransform(grid_15, modes_3), run_time=1.5, rate_func=rate_functions.ease_in_out_sine)
        self.wait(0.7)

        self.play(FadeOut(VGroup(hdr11, pol_top, pol_panel, pol_tex, c3_panel, c3_hdr, modes_3, lean8_foot)), run_time=0.8)

        # =====================================================================
        # ACT XII (SECS 7.4–7.6 & 8.4–8.6): SANITY CHECKS & COMBINED SYNTHESIS
        # =====================================================================
        hdr12 = Text(
            "Act XII (Chs. 7 & 8 Synthesis): Sanity Checks & Bridge to Strukturkaskaden",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr12)
        self.play(FadeIn(hdr12), run_time=0.7)

        s78_nodes = VGroup()
        s78_specs = [
            (r"\mathbf{1.\;Quant\;Site}\\(\mathbf{Ctx}_{\text{quant}}, J_{\text{quant}})", ROYAL_BLUE, LEFT * 4.3 + UP * 1.45),
            (r"\mathbf{2.\;Realification}\\R_n\cong\mathbb{R}^{d(\mathbb{K})n}\;(\text{SM-28})", TEAL_BRIGHT, ORIGIN + UP * 1.45),
            (r"\mathbf{3.\;Cascade\;Bound}\\\|A_M\|\le\Gamma_M\|A_0\|^{D_M}", ORANGE_GOLD, RIGHT * 4.3 + UP * 1.45),
            (r"\mathbf{4.\;Seeley\;Corners}\\\mathcal{M}_n=(\mathbb{R}_{\ge 0})^n\;(\text{SM-29})", ROYAL_BLUE, LEFT * 4.3 + DOWN * 0.25),
            (r"\mathbf{5.\;Nuclear\;Tensor}\\\mathscr{S}(\mathcal{M}_m)\cong\widehat{\bigotimes}_\pi\mathscr{S}(\mathbb{R}_{\ge 0})", TEAL_BRIGHT, ORIGIN + DOWN * 0.25),
            (r"\mathbf{6.\;3\text{-}Mode\;Collapse}\\15\longrightarrow 3\text{ Modes}", HOLO_GOLD, RIGHT * 4.3 + DOWN * 0.25),
        ]
        for t_s, c_s, p_s in s78_specs:
            bx = RoundedRectangle(width=3.5, height=0.95, corner_radius=0.1, color=c_s, fill_opacity=0.20).move_to(p_s)
            tx = MathTex(t_s, font_size=16, color=WHITE).move_to(bx)
            s78_nodes.add(VGroup(bx, tx))

        s78_edges = VGroup(
            Arrow(s78_nodes[0].get_right(), s78_nodes[1].get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s78_nodes[1].get_right(), s78_nodes[2].get_left(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s78_nodes[0].get_bottom(), s78_nodes[3].get_top(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s78_nodes[1].get_bottom(), s78_nodes[4].get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s78_nodes[2].get_bottom(), s78_nodes[5].get_top(), color=ORANGE_GOLD, buff=0.06, stroke_width=2.5),
            DashedLine(s78_nodes[3].get_right(), s78_nodes[4].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16),
            DashedLine(s78_nodes[4].get_right(), s78_nodes[5].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16)
        )

        fin78_box = RoundedRectangle(width=12.0, height=1.65, corner_radius=0.12, color=HOLO_GOLD, fill_opacity=0.14).to_edge(DOWN, buff=0.20)
        fin78_tex = MathTex(
            r"\bullet\;\text{Ch. 7 Sanity Checks: }\; "
            r"r_j=1 \implies D_M=1,\; \Gamma_M=\prod C_j \quad\mid\quad "
            r"A_0\equiv 0 \implies A_M\equiv 0\;\text{(Zero-Field Vacuum Stability)}\\[4pt]"
            r"\bullet\;\text{Ch. 8 Sanity Checks: }\; "
            r"\tilde{\mathrm{d}}|(fg) = f\,\tilde{\mathrm{d}}|g + g\,\tilde{\mathrm{d}}|f \quad\mid\quad "
            r"\text{Grothendieck Nuclear Uniqueness: }\widehat{\otimes}_\pi = \widehat{\otimes}_\varepsilon\\[4pt]"
            r"\bullet\;\mathbf{Dialectical\;Ascent\;to\;Chapter\;9\;(Strukturkaskaden):}\;"
            r"\text{Assemble partial metrics into the 36-Component Non-Hermitian Hermetry Matrix }{}^2\bar{\mathbf{g}}",
            font_size=15, color=HOLO_GOLD
        ).move_to(fin78_box)

        self.play(FadeIn(s78_nodes, lag_ratio=0.08), Create(s78_edges), run_time=1.8)
        self.play(Create(fin78_box), Write(fin78_tex), run_time=1.8)
        self.play(fin78_box.animate.set_stroke(WHITE, width=4), rate_func=rate_functions.there_and_back, run_time=1.0)
        self.wait(2.5)