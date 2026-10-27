# =============================================================================
# AUTOMATICALLY GENERATED MODULAR SCENES FOR REVEAL.JS PRESENTATION
# =============================================================================

from manim import *
import numpy as np


# =====================================================================
# STANDARDIZED BOOK COLOR PALETTE (MATCHING LATEX PREAMBLE)
# =====================================================================
ROYAL_BLUE = "#4169E1"     # Candidate System S / Inflow / Stratum C(m)
TEAL_BRIGHT = "#20B2AA"    # Televariant Basin / Collector K / Stratum C(m+1)
ORANGE_GOLD = "#FFA500"    # Polydromy Saddle x_0 / Basal Generator HypMet
CRIMSON_RED = "#DC143C"    # Extinktionsdiskriminante D_ext / Dysvariant Escape
HOLO_GOLD = "#FFD700"      # Final Coalgebra \nu T / Telezentrum T_z
PURPLE_SYN = "#9370DB"     # Universal Homomorphism !_\alpha / Resynkolation
SLATE_GREY = "#708090"     # Extinction Sink & Structural Framing



# =============================================================================
# SCENE: Ch6_Act1_Mono_Polydromie_Area (Act 1)
# =============================================================================
class Ch6_Act1_Mono_Polydromie_Area(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr1 = Text(
            "Act I (Sec. 6.1.1): Metroplexaeondyne, Mono/Polydromie & Area (SM-27)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm27_top = MathTex(
            r"AR_q \equiv AR_{(T_1)}^{(T_2)}\!\left[(AR_{q-1})_{\gamma_{q-1}}\right]_1^{P_{q-1}} "
            r"\quad\lor\quad AR_1 \equiv AR_{(T)}^{(T')}\!\left[\overset{\scriptscriptstyle n}{\mathbf{M}}\widetilde{\mathrm{a}}(t_i)_1^Q\right]\;\;(\text{SM-27})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr1, DOWN, buff=0.12).align_to(hdr1, LEFT)
        self.add_fixed_in_frame_mobjects(hdr1, sm27_top)
        self.play(Write(hdr1), Write(sm27_top), run_time=1.2)

        # Left Panel: Animated Monodromie vs Polydromie in the Aeondynentensorium
        mp_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        mp_hdr = MathTex(r"\text{Monodromie vs. Polydromie in }\mathcal{M}_{\mathfrak{AR}}", font_size=17, color=ROYAL_BLUE).next_to(mp_box.get_top(), DOWN, buff=0.12)

        mono_curve = ParametricFunction(
            lambda t: LEFT * 5.3 + UP * 0.15 + np.array([4.2 * t, 0.32 * np.sin(PI * t), 0]),
            t_range=[0, 1], color=TEAL_BRIGHT, stroke_width=4
        )
        mono_lbl = MathTex(r"\text{1. Monodromie: Unique Deterministic Path}", font_size=14, color=TEAL_BRIGHT).next_to(mono_curve, UP, buff=0.05)
        mono_dot = Dot(mono_curve.get_start(), color=HOLO_GOLD, radius=0.085)

        poly_stem = Line(LEFT * 5.3 + DOWN * 1.25, LEFT * 3.6 + DOWN * 1.25, color=ORANGE_GOLD, stroke_width=4)
        poly_pt = Dot(LEFT * 3.6 + DOWN * 1.25, color=CRIMSON_RED, radius=0.095)
        poly_branches = VGroup(*[
            ParametricFunction(
                lambda t, dh=dh_v: LEFT * 3.6 + DOWN * 1.25 + np.array([2.5 * t, dh * (t ** 1.2), 0]),
                t_range=[0, 1], color=ORANGE_GOLD, stroke_width=2.8
            )
            for dh_v in [-0.52, 0.0, 0.52]
        ])
        poly_lbl = MathTex(r"\text{2. Polydromie: Branching Tuft at }x_0", font_size=14, color=ORANGE_GOLD).move_to(LEFT * 3.15 + DOWN * 2.02)
        poly_dots = VGroup(*[Dot(LEFT * 3.6 + DOWN * 1.25, color=HOLO_GOLD, radius=0.075) for _ in range(3)])

        # Right Panel: Recursive Fiber-Bundle Hierarchy of the Aeonische Area (SM-27)
        ar_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        ar_tex = MathTex(
            r"\mathbf{Recursive\;Area\;Hierarchy\;(\text{SM-27}):}\\[5pt]"
            r"\bullet\;\mathbf{Base\;Area\;AR_1:}\;\text{Parameterized Metroplex }\\"
            r"\;\;\overset{\scriptscriptstyle n}{\mathbf{M}}\widetilde{\mathrm{a}}(t_1,\dots,t_Q)\text{ bounded by }(T, T').\\[5pt]"
            r"\bullet\;\mathbf{Higher\;Area\;AR_q:}\;\text{Fiber bundle of }P_{q-1}\text{ sub-areas}\\"
            r"\;\;(AR_{q-1})_{\gamma_{q-1}}\text{ oriented between }(T_1, T_2).\\[5pt]"
            r"\bullet\;\text{Provides the phase manifold }\mathcal{M}_{\mathfrak{AR}}\text{ for Telezentrik!}",
            font_size=15, color=WHITE
        ).move_to(ar_box)

        act1_foot = MathTex(
            r"\text{Dynamical Question of Chapter 6: }\; "
            r"\text{What selects a coherent evolutionary trajectory out of a polydromic branching tuft?}",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(mp_box), Write(mp_hdr),
            Create(mono_curve), Write(mono_lbl), FadeIn(mono_dot),
            Create(poly_stem), FadeIn(poly_pt), Create(poly_branches), Write(poly_lbl), FadeIn(poly_dots),
            Create(ar_box), Write(ar_tex), Write(act1_foot),
            run_time=1.8
        )
        self.play(
            MoveAlongPath(mono_dot, mono_curve),
            *[MoveAlongPath(poly_dots[i], poly_branches[i]) for i in range(3)],
            run_time=1.6, rate_func=rate_functions.ease_in_out_sine
        )
        self.wait(0.6)

        self.play(FadeOut(VGroup(
            hdr1, sm27_top, mp_box, mp_hdr, mono_curve, mono_lbl, mono_dot,
            poly_stem, poly_pt, poly_branches, poly_lbl, poly_dots, ar_box, ar_tex, act1_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch6_Act2_3_Telezentrik_Dimensions (Act 2)
# =============================================================================
class Ch6_Act2_3_Telezentrik_Dimensions(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr2 = Text(
            "Act II (Secs. 6.1.2-6.1.3): Telezentrik, Televarianz vs. Dysvarianz & D_ext",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        tele_top = MathTex(
            r"\mathbf{W}_{\text{tele}} \subset \mathcal{B}(T_z)\;\;(\text{Televariant}), \qquad "
            r"\mathcal{D}_{\text{ext}} := \partial\mathcal{B}(T_z)\;\;(\text{Extinktionsdiskriminante}), \qquad "
            r"\mathbf{W}_{\text{dys}} \longrightarrow \mathbf{ys}\widetilde{\mathbf{c}}\;\;(\text{Dysvariant})",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr2, DOWN, buff=0.12).align_to(hdr2, LEFT)
        self.add_fixed_in_frame_mobjects(hdr2, tele_top)
        self.play(FadeIn(hdr2), Write(tele_top), run_time=1.1)

        tz_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        tz_tex = MathTex(
            r"\mathbf{Telezentrik\;\&\;Telezentren\;(SM,\;pp.\;108\text{--}112):}\\[5pt]"
            r"\bullet\;\mathbf{Telezentrum\;(T_z):}\;\text{Asymptotic attractor submanifold}\\"
            r"\;\;\text{of maximal coherence and minimal entropy.}\\[4pt]"
            r"\bullet\;\mathbf{Clark\text{--}Friston\;Active\;Inference\;(2010/2016):}\\"
            r"\;\;\text{Self-organizing systems minimize variational free energy}\\"
            r"\;\;\text{along Lyapunov gradients toward attracting sets }T_z.\\[4pt]"
            r"\bullet\;\mathbf{Televarianzbedingung:}\;\mathcal{B}(T_z)\neq\emptyset\text{ (vs. Pseudotelezentrisch)}",
            font_size=15, color=WHITE
        ).move_to(tz_panel)

        dys_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=CRIMSON_RED, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        dys_tex = MathTex(
            r"\mathbf{Televarianz\;vs.\;Dysvarianz\;(Prop\;6.9,\;SM\;p.\;115):}\\[5pt]"
            r"1.\;\mathbf{Televariante\;(\mathbf{W}_{\text{tele}}):}\;\text{Preserves telecentric tectonics.}\\[4pt]"
            r"2.\;\mathbf{Functional\;Dysvarianz:}\;\text{Rule architecture intact, but}\\"
            r"\;\;\text{syndrome populations become undefined (intermittent).}\\[4pt]"
            r"3.\;\mathbf{Structural\;Dysvarianz:}\;\text{Internal Kombinat architecture}\\"
            r"\;\;\text{fractures across }\mathcal{D}_{\text{ext}}\text{ (final extinction }\to\mathbf{ys}\widetilde{\mathbf{c}}\text{).}\\[4pt]"
            r"\bullet\;\mathbf{Resynkolation:}\;\text{Metastable restructuring near }\mathcal{D}_{\text{ext}}!",
            font_size=15, color=HOLO_GOLD
        ).move_to(dys_panel)

        act2_foot = MathTex(
            r"\text{Non-Retrocausal Principle: }\; "
            r"\text{Telezentrik is governed by forward local differential gradients }-\operatorname{grad}\Psi,\;\text{never backward signals in time!}",
            font_size=18, color=GREEN_C
        ).to_edge(DOWN, buff=0.20)

        self.play(Create(tz_panel), Write(tz_tex), Create(dys_panel), Write(dys_tex), Write(act2_foot), run_time=1.9)
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr2, tele_top, tz_panel, tz_tex, dys_panel, dys_tex, act2_foot)), run_time=0.8)



# =============================================================================
# SCENE: Act3_Secs_614_621_Transzendenzstufen (Act 3)
# =============================================================================
class Act3_Secs_614_621_Transzendenzstufen(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr3 = Text(
            "Act III (Secs. 6.1.4 & 6.2.1): Transzendenzstufen C(m) & Telecentre Dimensions",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        m_top = MathTex(
            r"\frac{d}{dt}\Big|_{t=0}\Phi_t(x) = X_{\mathfrak{AR}}(x)\;\;(\text{Def 6.1}), \qquad "
            r"\mathcal{B}(\mathcal{A}) := \left\{x\in\mathcal{M}_{\mathfrak{AR}} \;\middle|\; "
            r"\lim_{t\to\infty}\operatorname{dist}_{g_{\mathfrak{AR}}}(\Phi_t(x), \mathcal{A}) = 0\right\}\;\;(\text{Def 6.2})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr3, DOWN, buff=0.12).align_to(hdr3, LEFT)
        self.add_fixed_in_frame_mobjects(hdr3, m_top)
        self.play(FadeIn(hdr3), Write(m_top), run_time=1.1)

        # Left Panel: Dimensional Names for Telecentres (Prop 6.3) with Visual Geometric Icons
        dim_cards = VGroup()
        dim_specs = [
            (r"\gamma = 0:\;\text{Punkttelezentrum (0D Point Attractor)}", ROYAL_BLUE, UP * 0.95),
            (r"\gamma = 1:\;\text{Linientelezentrum (1D Limit Cycle / Curve)}", TEAL_BRIGHT, UP * 0.15),
            (r"\gamma = 2:\;\text{Flaechentelezentrum (2D Surface Attractor)}", ORANGE_GOLD, DOWN * 0.65),
            (r"\gamma = 3:\;\text{Raumtelezentrum (3D Volume Attractor)}", PURPLE_SYN, DOWN * 1.45),
        ]
        icons = [
            Dot(color=HOLO_GOLD, radius=0.09),
            Circle(radius=0.18, color=TEAL_BRIGHT, stroke_width=2.8),
            Ellipse(width=0.42, height=0.24, color=ORANGE_GOLD, fill_color=ORANGE_GOLD, fill_opacity=0.45),
            Square(side_length=0.30, color=PURPLE_SYN, fill_color=PURPLE_SYN, fill_opacity=0.45),
        ]
        for idx, (tx_s, col_s, y_p) in enumerate(dim_specs):
            bx = RoundedRectangle(width=5.6, height=0.62, corner_radius=0.08, color=col_s, fill_opacity=0.20).move_to(LEFT * 3.15 + y_p)
            ic = icons[idx].move_to(bx.get_left() + RIGHT * 0.38)
            tx = MathTex(tx_s, font_size=14, color=WHITE).next_to(ic, RIGHT, buff=0.16)
            dim_cards.add(VGroup(bx, ic, tx))

        # Right Panel: Transzendenzstufen C(m), Transzendenzsynkolatoren \Gamma_i & Projective Telecentres
        tr_panel = RoundedRectangle(width=5.8, height=3.35, corner_radius=0.14, color=HOLO_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.25)
        tr_tex = MathTex(
            r"\mathbf{Def\;6.5\;(Projective\;Telecentres\;at\;Infinity):}\\[4pt]"
            r"\text{Open panoramas without affine telecentres adjoin ideal}\\"
            r"\text{boundary elements at }\infty\text{ (1-sided or 2-sided projective Area).}\\[6pt]"
            r"\mathbf{Transzendenzstufen\;C(m)\;(SM,\;pp.\;117\text{--}121):}\\[4pt]"
            r"\bullet\;\text{Stabilized Holoformen of }C(m)\text{ lifted by extrasynkolative}\\"
            r"\;\;\text{Transzendenzsynkolatoren }\Gamma_i: C(m) \longrightarrow C(m+1).\\[3pt]"
            r"\bullet\;\text{Haupttelezentrum of }C(m)\mapsto\text{Nebentelezentrum of }C(m+1)!",
            font_size=15, color=WHITE
        ).move_to(tr_panel)

        act3_foot = MathTex(
            r"\text{Prop 6.3: }\gamma\text{ specifies submanifold dimension }\dim\mathcal{A} = \gamma\le n-1 "
            r"\quad (\text{without restricting global topology to spheres or tori})",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(FadeIn(dim_cards, lag_ratio=0.1), Create(tr_panel), Write(tr_tex), Write(act3_foot), run_time=1.9)
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr3, m_top, dim_cards, tr_panel, tr_tex, act3_foot)), run_time=0.8)



# =============================================================================
# SCENE: Ch6_Act4_Collector_Bifurcation (Act 4)
# =============================================================================
class Ch6_Act4_Collector_Bifurcation(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr4 = Text(
            "Act IV (Sec. 6.2.1): Far-Centered Collector Bifurcation Cycle (Fig 6.1)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        col_top = MathTex(
            r"dX_{\mathfrak{AR}}(x_0):\; W^u(x_0) \cong \mathbb{R}^{P_\mu}\;(P_\mu > 1), \qquad "
            r"W^u(x_0) \subseteq \mathcal{B}(\mathcal{K}), \qquad "
            r"\lim_{t\to\infty} \operatorname{dist}_{g_{\mathfrak{AR}}}\!\left(\Phi_t(W^u_{\text{tele}}(x_0)),\, \mathcal{K}\right) = 0\;\;(\text{Def 6.4})",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr4, DOWN, buff=0.12).align_to(hdr4, LEFT)
        self.add_fixed_in_frame_mobjects(hdr4, col_top)
        self.play(FadeIn(hdr4), Write(col_top), run_time=1.1)

        c_box = RoundedRectangle(width=11.6, height=3.55, corner_radius=0.16, color=ROYAL_BLUE, fill_opacity=0.06).move_to(DOWN * 0.45)

        in_arr = Arrow(LEFT * 5.2 + DOWN * 0.35, LEFT * 2.8 + DOWN * 0.35, color=ROYAL_BLUE, buff=0, stroke_width=4)
        in_lbl = MathTex(r"\text{Deterministic Inflow}", font_size=16, color=ROYAL_BLUE).next_to(in_arr, UP, buff=0.06)

        x0_dot = Dot(LEFT * 2.8 + DOWN * 0.35, color=ORANGE_GOLD, radius=0.12)
        x0_lbl = MathTex(r"x_0\in\mathcal{D}_{\text{ext}}\\\text{(Polydromy Saddle)}", font_size=16, color=ORANGE_GOLD).next_to(x0_dot, DOWN, buff=0.12)

        col_node = Circle(radius=0.45, color=HOLO_GOLD, fill_color=TEAL_BRIGHT, fill_opacity=0.45, stroke_width=3.5).move_to(RIGHT * 3.4 + DOWN * 0.35)
        col_txt = MathTex(r"\mathfrak{Col}\\\mathcal{K}", font_size=19, color=HOLO_GOLD).move_to(col_node)
        col_sub = MathTex(r"\text{Far-Centered Collector }\mathcal{K}", font_size=16, color=TEAL_BRIGHT).next_to(col_node, DOWN, buff=0.12)

        tuft_paths = VGroup(*[
            ParametricFunction(
                lambda s, h_v=hv: np.array([-2.8 + 6.2 * s, -0.35 + h_v * np.sin(PI * s), 0]),
                t_range=[0, 1], color=TEAL_BRIGHT, stroke_width=2.8
            )
            for hv in [-1.15, -0.42, 0.42, 1.15]
        ])

        sep_arrow = DoubleArrow(LEFT * 2.8 + DOWN * 1.85, RIGHT * 3.4 + DOWN * 1.85, color=SLATE_GREY, buff=0, stroke_width=2.2)
        sep_lbl = MathTex(r"\text{Attractor Separation Distance } L > 0", font_size=16, color=GREY_B).next_to(sep_arrow, DOWN, buff=0.05)

        travel_dots = VGroup(*[Dot(LEFT * 2.8 + DOWN * 0.35, color=HOLO_GOLD, radius=0.085) for _ in range(4)])

        self.play(
            Create(c_box), GrowArrow(in_arr), Write(in_lbl),
            FadeIn(x0_dot), Write(x0_lbl),
            Create(tuft_paths), Create(col_node), Write(col_txt), Write(col_sub),
            Create(sep_arrow), Write(sep_lbl),
            run_time=1.8
        )
        self.play(
            *[MoveAlongPath(travel_dots[i], tuft_paths[i]) for i in range(4)],
            run_time=2.2, rate_func=rate_functions.ease_in_out_sine
        )
        self.wait(0.6)

        self.play(FadeOut(VGroup(
            hdr4, col_top, c_box, in_arr, in_lbl, x0_dot, x0_lbl,
            col_node, col_txt, col_sub, tuft_paths, sep_arrow, sep_lbl, travel_dots
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch6_Act5_6_Coalgebra_StageV (Act 5)
# =============================================================================
class Ch6_Act5_6_Coalgebra_StageV(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr5 = Text(
            "Act V (Sec. 6.2.2): Final Telecentric Coalgebra (nu T, zeta) & Lambek Lemma",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        coalg_top = MathTex(
            r"\mathcal{T}_{\mathbb{R}}(M) := \left(M\times C^\infty([0,\epsilon],M)\right)_{\operatorname{ev}_0=\operatorname{pr}_1} \amalg \mathbf{1}\;\;(\text{Def 6.6}), \qquad "
            r"\zeta: \nu\mathcal{T} \xrightarrow{\;\sim\;} \mathcal{T}(\nu\mathcal{T}), \qquad "
            r"\exists!\, !_\alpha: S \longrightarrow \nu\mathcal{T}\;\;(\text{Thm 6.7})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr5, DOWN, buff=0.12).align_to(hdr5, LEFT)
        self.add_fixed_in_frame_mobjects(hdr5, coalg_top)
        self.play(FadeIn(hdr5), Write(coalg_top), run_time=1.1)

        nd_S   = RoundedRectangle(width=2.2, height=0.72, corner_radius=0.09, color=ROYAL_BLUE, fill_opacity=0.22).move_to(LEFT * 4.8 + UP * 0.55)
        nd_TS  = RoundedRectangle(width=2.2, height=0.72, corner_radius=0.09, color=TEAL_BRIGHT, fill_opacity=0.22).move_to(LEFT * 1.4 + UP * 0.55)
        nd_nu  = RoundedRectangle(width=2.2, height=0.72, corner_radius=0.09, color=HOLO_GOLD, fill_opacity=0.25).move_to(LEFT * 4.8 + DOWN * 1.25)
        nd_Tnu = RoundedRectangle(width=2.2, height=0.72, corner_radius=0.09, color=HOLO_GOLD, fill_opacity=0.25).move_to(LEFT * 1.4 + DOWN * 1.25)

        tx_S   = MathTex(r"(S, \alpha)", font_size=19).move_to(nd_S)
        tx_TS  = MathTex(r"\mathcal{T}(S)", font_size=19, color=TEAL_BRIGHT).move_to(nd_TS)
        tx_nu  = MathTex(r"(\nu\mathcal{T}, \zeta)", font_size=19, color=HOLO_GOLD).move_to(nd_nu)
        tx_Tnu = MathTex(r"\mathcal{T}(\nu\mathcal{T})", font_size=19, color=HOLO_GOLD).move_to(nd_Tnu)

        ca_top = Arrow(nd_S.get_right(), nd_TS.get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.8)
        ca_bot = Arrow(nd_nu.get_right(), nd_Tnu.get_left(), color=HOLO_GOLD, buff=0.06, stroke_width=3)
        ca_l   = DashedLine(nd_S.get_bottom(), nd_nu.get_top(), color=PURPLE_SYN, stroke_width=3).add_tip(tip_length=0.18)
        ca_r   = Arrow(nd_TS.get_bottom(), nd_Tnu.get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.8)

        cl_top = MathTex(r"\alpha", font_size=18, color=ROYAL_BLUE).next_to(ca_top, UP, buff=0.04)
        cl_bot = MathTex(r"\zeta\cong", font_size=18, color=HOLO_GOLD).next_to(ca_bot, DOWN, buff=0.04)
        cl_l   = MathTex(r"\exists!\,!_\alpha", font_size=18, color=PURPLE_SYN).next_to(ca_l, LEFT, buff=0.05)
        cl_r   = MathTex(r"\mathcal{T}(!_\alpha)", font_size=18, color=TEAL_BRIGHT).next_to(ca_r, RIGHT, buff=0.05)

        lam_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.40)
        lam_tex = MathTex(
            r"\mathbf{Prop\;6.8\;(Terminal\;Sequence\;\&\;Lambek\;Proof):}\\[5pt]"
            r"\mathbf{1} \longleftarrow \mathcal{T}(\mathbf{1}) \longleftarrow \mathcal{T}^2(\mathbf{1}) \longleftarrow \cdots "
            r"\longleftarrow \nu\mathcal{T} := \lim_{k} \mathcal{T}^k(\mathbf{1})\\[5pt]"
            r"\bullet\;\text{Fixed-Point Mediating Map: }\; !_\alpha = \mathcal{T}(!_\alpha) \circ \alpha\\[4pt]"
            r"\bullet\;\text{Lambek Identity: }\; \eta\circ\zeta = \operatorname{id}_{\nu\mathcal{T}} \;\wedge\; \zeta\circ\eta = \operatorname{id}_{\mathcal{T}\nu\mathcal{T}}\\[6pt]"
            r"\mathbf{Carnap\;6.1\;(Explication\;of\;Telezentrik):}\\"
            r"\text{Replaces backward causation with forward coalgebraic}\\"
            r"\text{equivalence classes of asymptotic trajectory streams!}",
            font_size=15, color=WHITE
        ).move_to(lam_panel)

        lean6_foot = MathTex(
            r"\text{Lean 4 (\texttt{Syntrometrie.StratumB.Telezentrik}): }\; "
            r"\texttt{FinalCoalgebra T} \implies \texttt{uniq : }\forall (S\text{ : Coalgebra }T)\;(f : S\longrightarrow\text{terminal}),\; f = \texttt{toTerminal }S",
            font_size=16, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            FadeIn(nd_S, tx_S, nd_TS, tx_TS, nd_nu, tx_nu, nd_Tnu, tx_Tnu),
            GrowArrow(ca_top), Write(cl_top), GrowArrow(ca_bot), Write(cl_bot),
            Create(ca_l), Write(cl_l), GrowArrow(ca_r), Write(cl_r),
            Create(lam_panel), Write(lam_tex), Write(lean6_foot),
            run_time=2.0
        )
        self.wait(0.8)

        self.play(FadeOut(VGroup(
            hdr5, coalg_top, nd_S, tx_S, nd_TS, tx_TS, nd_nu, tx_nu, nd_Tnu, tx_Tnu,
            ca_top, cl_top, ca_bot, cl_bot, ca_l, cl_l, ca_r, cl_r, lam_panel, lam_tex, lean6_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Act6_Sec_622_Unified_Running (Act 6)
# =============================================================================
class Act6_Sec_622_Unified_Running(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr6 = Text(
            "Act VI (Sec. 6.2.2): Unified Running Example Stage V (Telecentric Phase-Lock)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        st5_top = MathTex(
            r"\theta(t) \in \left[-\frac{\pi}{2},\, \frac{\pi}{2}\right], \qquad "
            r"\Psi(\theta) = 1 - \cos\theta, \qquad "
            r"\dot{\theta} = -\sin\theta \implies \dot{\Psi} = -\sin^2\theta \le -\Psi \implies "
            r"\Psi(t) \le e^{-t}\Psi(0)",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr6, DOWN, buff=0.12).align_to(hdr6, LEFT)
        self.add_fixed_in_frame_mobjects(hdr6, st5_top)
        self.play(FadeIn(hdr6), Write(st5_top), run_time=1.1)

        # Left Side: Dual Polarimeter Dial Synchronizing \vec{p}_a and \vec{p}_b
        th_trk = ValueTracker(1.35)
        dial_c = LEFT * 3.15 + DOWN * 0.45
        dial_ring = Circle(radius=1.45, color=ROYAL_BLUE, stroke_width=3).move_to(dial_c)
        ref_vec = Arrow(dial_c, dial_c + RIGHT * 1.45, color=TEAL_BRIGHT, buff=0, stroke_width=3.5)
        ref_lbl = MathTex(r"\vec{p}_b\;(\theta_{\text{target}}=0)", font_size=15, color=TEAL_BRIGHT).next_to(ref_vec.get_end(), RIGHT, buff=0.06)

        rot_vec = always_redraw(lambda: Arrow(
            dial_c,
            dial_c + 1.45 * np.array([np.cos(th_trk.get_value()), np.sin(th_trk.get_value()), 0]),
            color=HOLO_GOLD, buff=0, stroke_width=4
        ))
        arc_theta = always_redraw(lambda: Arc(
            radius=0.55, start_angle=0, angle=max(th_trk.get_value(), 0.01),
            arc_center=dial_c, color=ORANGE_GOLD, stroke_width=2.5
        ))

        th_lbl = MathTex(r"\text{Relative Phase }\theta(t) = ", font_size=19, color=HOLO_GOLD)
        th_dec = DecimalNumber(1.35, num_decimal_places=2, font_size=19, color=HOLO_GOLD)
        th_dec.add_updater(lambda m: m.set_value(th_trk.get_value()))
        th_row = VGroup(th_lbl, th_dec).arrange(RIGHT, buff=0.08).move_to(RIGHT * 3.1 + UP * 0.65)

        psi_lbl = MathTex(r"\text{Lyapunov Potential }\Psi(\theta) = 1 - \cos\theta = ", font_size=19, color=TEAL_BRIGHT)
        psi_dec = DecimalNumber(1.0 - np.cos(1.35), num_decimal_places=3, font_size=19, color=GREEN_C)
        psi_dec.add_updater(lambda m: m.set_value(1.0 - np.cos(th_trk.get_value())))
        psi_row = VGroup(psi_lbl, psi_dec).arrange(RIGHT, buff=0.08).move_to(RIGHT * 3.1 + DOWN * 0.15)

        psi_axes = Axes(
            x_range=[-1.6, 1.6, 0.8], y_range=[0, 1.2, 0.5],
            x_length=4.6, y_length=1.7,
            axis_config={"include_tip": True, "color": GREY_B}
        ).move_to(RIGHT * 3.1 + DOWN * 1.45)
        psi_curve = psi_axes.plot(lambda a: 1.0 - np.cos(a), x_range=[-1.55, 1.55], color=ROYAL_BLUE, stroke_width=3.5)
        psi_ball = always_redraw(lambda: Dot(
            psi_axes.c2p(th_trk.get_value(), 1.0 - np.cos(th_trk.get_value())),
            color=HOLO_GOLD, radius=0.10
        ))

        self.play(
            Create(dial_ring), GrowArrow(ref_vec), Write(ref_lbl), FadeIn(rot_vec, arc_theta),
            FadeIn(th_row, psi_row),
            Create(psi_axes), Create(psi_curve), FadeIn(psi_ball),
            run_time=1.8
        )
        self.play(th_trk.animate.set_value(0.00), run_time=2.2, rate_func=rate_functions.ease_out_sine)
        th_dec.clear_updaters()
        psi_dec.clear_updaters()
        self.wait(0.6)

        self.remove(rot_vec, arc_theta, psi_ball)
        self.play(FadeOut(VGroup(hdr6, st5_top, dial_ring, ref_vec, ref_lbl, th_row, psi_row, psi_axes, psi_curve)), run_time=0.8)



# =============================================================================
# SCENE: Ch6_Act7_8_Lyapunov_Separatrix (Act 7)
# =============================================================================
class Ch6_Act7_8_Lyapunov_Separatrix(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr7 = Text(
            "Act VII (Sec. 6.3.1): 3D Lyapunov Landscape & Strict Televariant Stability",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        lyap_bot = MathTex(
            r"V(x) \ge \frac{\mu}{2}\operatorname{dist}_{g_{\mathfrak{AR}}}(x,\mathcal{A})^2, \quad "
            r"\dot{V}(x) \le -\gamma V(x) \;\Longrightarrow\; "
            r"\operatorname{dist}_{g_{\mathfrak{AR}}}(\Phi_t(x_0),\mathcal{A}) \le \sqrt{\frac{2V(x_0)}{\mu}}\,e^{-\frac{\gamma}{2}t}\;\;(\text{Thm 6.10})",
            font_size=17, color=TEAL_BRIGHT
        ).to_edge(DOWN, buff=0.20)
        self.add_fixed_in_frame_mobjects(hdr7, lyap_bot)
        self.play(FadeIn(hdr7), Write(lyap_bot), run_time=1.1)

        self.move_camera(phi=62 * DEGREES, theta=-46 * DEGREES, run_time=1.7)

        def z_surf(u, v):
            return -1.2 + 0.16 * ((u**2 - 2.25)**2) + 0.28 * (v**2)

        surf_3d = Surface(
            lambda u, v: np.array([u - 1.2, v, z_surf(u, v)]),
            u_range=[-2.1, 2.1], v_range=[-1.5, 1.5],
            resolution=(14, 12),
            fill_color=ROYAL_BLUE, fill_opacity=0.26, stroke_color=TEAL_BRIGHT, stroke_width=1.0
        )
        sep_ridge = ParametricFunction(
            lambda v: np.array([-1.2, v, z_surf(0.0, v) + 0.03]),
            t_range=[-1.5, 1.5], color=CRIMSON_RED, stroke_width=5
        )
        # Explicit 3D nodes for Telezentrum T_{z,1}, Saddle p_0, and Extinction Sink ys c
        node_Tz1  = Sphere(radius=0.11, color=HOLO_GOLD).move_to(np.array([-2.7, 0.0, z_surf(-1.5, 0.0) + 0.05]))
        node_p0   = Sphere(radius=0.09, color=ORANGE_GOLD).move_to(np.array([-1.2, 0.0, z_surf(0.0, 0.0) + 0.05]))
        node_sink = Sphere(radius=0.11, color=SLATE_GREY).move_to(np.array([0.9, -0.425, z_surf(2.1, -0.425) + 0.05]))

        t_path = ParametricFunction(
            lambda s: np.array([-1.45 - 1.25 * s, 1.05 * (1 - s), z_surf(-0.25 - 1.25 * s, 1.05 * (1 - s)) + 0.06]),
            t_range=[0, 1], color=GREEN_C, stroke_width=4
        )
        d_path = ParametricFunction(
            lambda s: np.array([-0.95 + 1.85 * s, -0.85 * (1 - 0.5 * s), z_surf(0.25 + 1.85 * s, -0.85 * (1 - 0.5 * s)) + 0.06]),
            t_range=[0, 1], color=CRIMSON_RED, stroke_width=4
        )

        dot_tele = Dot3D(t_path.get_start(), radius=0.11, color=GREEN_C)
        dot_dys  = Dot3D(d_path.get_start(), radius=0.11, color=CRIMSON_RED)

        pl_card = RoundedRectangle(width=5.4, height=2.45, corner_radius=0.12, color=TEAL_BRIGHT, fill_opacity=0.14).to_corner(UR, buff=0.35).shift(DOWN * 0.55)
        pl_tex = MathTex(
            r"\mathbf{Fig\;6.3\;\&\;Def\;6.9\;(PL\;Coercivity):}\\[4pt]"
            r"\|\operatorname{grad}\Psi(x)\|_{g_{\mathfrak{AR}}}^2 \ge \gamma V(x)\quad\text{on }\mathcal{K}_c\\[4pt]"
            r"V(\Phi_t(x_0)) \le V(x_0)e^{-\gamma t}\to 0\;\;(\text{at }T_{z,1})",
            font_size=15, color=WHITE
        ).move_to(pl_card)
        self.add_fixed_in_frame_mobjects(pl_card, pl_tex)

        self.play(
            Create(surf_3d), Create(sep_ridge),
            FadeIn(node_Tz1, node_p0, node_sink, dot_tele, dot_dys, pl_card, pl_tex),
            run_time=1.8
        )
        self.play(
            Create(t_path), Create(d_path),
            MoveAlongPath(dot_tele, t_path),
            MoveAlongPath(dot_dys, d_path),
            run_time=2.2, rate_func=rate_functions.ease_in_out_sine
        )
        self.wait(0.6)

        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.3)
        self.play(FadeOut(VGroup(
            surf_3d, sep_ridge, node_Tz1, node_p0, node_sink, t_path, d_path, dot_tele, dot_dys, pl_card, pl_tex, hdr7, lyap_bot
        )), run_time=0.8)



# =============================================================================
# SCENE: Act8_Sec_632_Morsesmale_Separatrix (Act 8)
# =============================================================================
class Act8_Sec_632_Morsesmale_Separatrix(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr8 = Text(
            "Act VIII (Sec. 6.3.2): Morse-Smale Separatrix D_ext (Thm 6.14) & Foliations",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sep_top = MathTex(
            r"\mathcal{D}_{\text{ext}} := \partial\mathcal{B}(\mathcal{A}) = "
            r"\overline{\bigcup_{\operatorname{ind}(p_j)=1} W^s(p_j)} = "
            r"\bigcup_{r:\,\operatorname{ind}(p_r)\ge 1} W^s(p_r), \qquad "
            r"\dim W^s(p_j) = n - 1\;\;(\text{Thm 6.14})",
            font_size=18, color=CRIMSON_RED
        ).next_to(hdr8, DOWN, buff=0.12).align_to(hdr8, LEFT)
        self.add_fixed_in_frame_mobjects(hdr8, sep_top)
        self.play(FadeIn(hdr8), Write(sep_top), run_time=1.1)

        wh_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=CRIMSON_RED, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        wh_tex = MathTex(
            r"\mathbf{Thm\;6.14\;(Whitney\text{-}Stratified\;Separatrix):}\\[4pt]"
            r"\bullet\;\text{Index-1 Saddles }p_j:\;\operatorname{codim} W^s(p_j) = 1\text{ (Smooth Walls)}\\[3pt]"
            r"\bullet\;\text{Higher-Index Saddles }p_r\;(\operatorname{ind}\ge 2):\;\text{Frontier Corners}\\[6pt]"
            r"\mathbf{Thm\;6.16\;(Extinction\;Boundary\;Branches,\;SM\;p.\;113):}\\[4pt]"
            r"1.\;\text{Initial / Final Dysvarianz: Single branch of }\mathcal{D}_{\text{ext}}\\[3pt]"
            r"2.\;\text{Intermittent Dysvarianz: Two branches enclosing}\\"
            r"\;\;\text{metastable recovery zone (\textit{Resynkolation})!}",
            font_size=15, color=WHITE
        ).move_to(wh_panel)

        fol_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        fol_tex = MathTex(
            r"\mathbf{Thm\;6.13\;(Telecentre\;Dimensionality\;\&\;Foliation):}\\[4pt]"
            r"\bullet\;\text{In }n\text{-dim Tensorium: }\; 0 \le \gamma_k \le n - 1\\[4pt]"
            r"\bullet\;\text{Equal dims }(\gamma_1=\gamma_2):\;\text{Unique connecting}\\"
            r"\;\;\textit{Telezentrale}\text{ of dimension }\gamma_1 + 1.\\[4pt]"
            r"\bullet\;\text{Unequal dims }(\gamma_2 > \gamma_1):\;(\gamma_2-\gamma_1)\text{-parameter}\\"
            r"\;\;\text{family of }(\gamma_1+1)\text{-dim Telezentralen in }\dim(\gamma_2+1).\\[5pt]"
            r"\mathbf{Thm\;6.17:}\;\text{Higher strata }C(m\ge 2)\text{ are purely monodromic!}",
            font_size=15, color=HOLO_GOLD
        ).move_to(fol_panel)

        self.play(Create(wh_panel), Write(wh_tex), Create(fol_panel), Write(fol_tex), run_time=1.9)
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr8, sep_top, wh_panel, wh_tex, fol_panel, fol_tex)), run_time=0.8)



# =============================================================================
# SCENE: Ch6_Act9_Telezentralenrelativitaet (Act 9)
# =============================================================================
class Ch6_Act9_Telezentralenrelativitaet(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr9 = Text(
            "Act IX (Sec. 6.3.3): Transzendente Telezentralenrelativitaet (Thm 6.19)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        rel_top = MathTex(
            r"\Gamma_m : \mathbf{Coalg}(\mathcal{T}_m) \rightleftarrows \mathbf{Coalg}(\mathcal{T}_{m+1}) : U_{m+1}, \qquad "
            r"\Gamma_m \dashv U_{m+1} \;\Longrightarrow\; "
            r"\Gamma_m(\nu\mathcal{T}_m) \cong \operatorname{HypMet}_{m+1} \not\cong \nu\mathcal{T}_{m+1}\;\;(\text{Thm 6.19})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr9, DOWN, buff=0.12).align_to(hdr9, LEFT)
        self.add_fixed_in_frame_mobjects(hdr9, rel_top)
        self.play(FadeIn(hdr9), Write(rel_top), run_time=1.1)

        cm_box = RoundedRectangle(width=4.8, height=3.35, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.3 + DOWN * 0.55)
        cm_hdr = MathTex(r"\text{Stratum }C(m) := \mathbf{Coalg}(\mathcal{T}_m)", font_size=18, color=ROYAL_BLUE).next_to(cm_box.get_top(), DOWN, buff=0.12)

        cm_goal = RoundedRectangle(width=3.8, height=0.82, corner_radius=0.09, color=HOLO_GOLD, fill_opacity=0.25).move_to(LEFT * 3.3 + UP * 0.15)
        tx_cmg  = MathTex(r"\text{Haupttelezentrum }\nu\mathcal{T}_m\\\text{(Terminal in }C(m))", font_size=16, color=HOLO_GOLD).move_to(cm_goal)

        cm_st   = RoundedRectangle(width=3.4, height=0.68, corner_radius=0.09, color=ROYAL_BLUE, fill_opacity=0.20).move_to(LEFT * 3.3 + DOWN * 1.45)
        tx_cms  = MathTex(r"\text{State }(S_m, \alpha_m)", font_size=16).move_to(cm_st)
        cm_up   = DashedLine(cm_st.get_top(), cm_goal.get_bottom(), color=HOLO_GOLD, stroke_width=2.5).add_tip(tip_length=0.16)

        cm1_box = RoundedRectangle(width=4.8, height=3.35, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.3 + DOWN * 0.55)
        cm1_hdr = MathTex(r"\text{Stratum }C(m+1) := \mathbf{Coalg}(\mathcal{T}_{m+1})", font_size=18, color=TEAL_BRIGHT).next_to(cm1_box.get_top(), DOWN, buff=0.12)

        cm1_goal = RoundedRectangle(width=3.8, height=0.82, corner_radius=0.09, color=HOLO_GOLD, fill_opacity=0.25).move_to(RIGHT * 3.3 + UP * 0.15)
        tx_cm1g  = MathTex(r"\text{Higher Goal }\nu\mathcal{T}_{m+1}\\\text{(New Terminal Attractor)}", font_size=16, color=HOLO_GOLD).move_to(cm1_goal)

        cm1_base = RoundedRectangle(width=3.8, height=0.82, corner_radius=0.09, color=ORANGE_GOLD, fill_opacity=0.25).move_to(RIGHT * 3.3 + DOWN * 1.45)
        tx_cm1b  = MathTex(r"\text{Nebentelezentrum }\Gamma_m(\nu\mathcal{T}_m)\\\text{(Basal }\operatorname{HypMet}_{m+1})", font_size=15, color=ORANGE_GOLD).move_to(cm1_base)
        cm1_up   = DashedLine(cm1_base.get_top(), cm1_goal.get_bottom(), color=TEAL_BRIGHT, stroke_width=2.5).add_tip(tip_length=0.16)

        diag_gam = Arrow(cm_goal.get_right(), cm1_base.get_left(), color=PURPLE_SYN, buff=0.08, stroke_width=3.5)
        lbl_gam  = MathTex(r"\Gamma_m\text{ (Left Adjoint)}", font_size=17, color=PURPLE_SYN).move_to(UP * 0.45)
        niso_sym = MathTex(
            r"\text{Left Adjoints Preserve Colimits, Not Terminal Coalgebras: }\; "
            r"\Gamma_m(\nu\mathcal{T}_m) \not\cong \nu\mathcal{T}_{m+1}",
            font_size=18, color=CRIMSON_RED
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(cm_box), Write(cm_hdr), FadeIn(cm_goal, tx_cmg, cm_st, tx_cms), Create(cm_up),
            Create(cm1_box), Write(cm1_hdr), FadeIn(cm1_goal, tx_cm1g),
            run_time=1.7
        )
        # Animate transporting a copy of \nu\mathcal{T}_m along \Gamma_m into the basal generator slot of C(m+1)
        carried_goal = cm_goal.copy()
        self.play(
            GrowArrow(diag_gam), Write(lbl_gam),
            Transform(carried_goal, cm1_base), FadeIn(tx_cm1b),
            Create(cm1_up), Write(niso_sym),
            run_time=1.6
        )
        self.wait(0.7)

        self.play(FadeOut(VGroup(
            hdr9, rel_top, cm_box, cm_hdr, cm_goal, tx_cmg, cm_st, tx_cms, cm_up,
            cm1_box, cm1_hdr, cm1_goal, tx_cm1g, carried_goal, tx_cm1b, cm1_up,
            diag_gam, lbl_gam, niso_sym
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch6_Act10_11_Parity_Resynkolation (Act 10)
# =============================================================================
class Ch6_Act10_11_Parity_Resynkolation(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr10 = Text(
            "Act X (Sec. 6.3.4): Morse-Poincare-Hopf Even Parity of Secondary Telezentren",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        morse_top = MathTex(
            r"\sum_{k=0}^n (-1)^k c_k = \chi(\Omega) = 0 \;\Longrightarrow\; "
            r"c_0 = c_1 \;\Longrightarrow\; "
            r"\mu := c_0 + c_1 = 2c_0 \equiv 0 \pmod{2}\;\;(\text{Thm 6.20})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr10, DOWN, buff=0.12).align_to(hdr10, LEFT)
        self.add_fixed_in_frame_mobjects(hdr10, morse_top)
        self.play(FadeIn(hdr10), Write(morse_top), run_time=1.1)

        om_ring = RoundedRectangle(width=5.6, height=3.4, corner_radius=0.4, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.50)
        om_hdr = MathTex(r"\text{Isolating Panorama }\Omega\text{ with }\chi(\Omega)=0", font_size=17, color=ROYAL_BLUE).next_to(om_ring.get_top(), DOWN, buff=0.12)

        c_center = LEFT * 3.15 + DOWN * 0.65
        att_pts = [c_center + np.array([1.15 * np.cos(k * 2 * PI / 3), 1.0 * np.sin(k * 2 * PI / 3), 0]) for k in range(3)]
        sad_pts = [c_center + np.array([1.15 * np.cos(PI / 3 + k * 2 * PI / 3), 1.0 * np.sin(PI / 3 + k * 2 * PI / 3), 0]) for k in range(3)]

        tele_lines1 = [Line(sad_pts[k], att_pts[k], color=TEAL_BRIGHT, stroke_width=3.2) for k in range(3)]
        tele_lines2 = [Line(sad_pts[k], att_pts[(k + 1) % 3], color=TEAL_BRIGHT, stroke_width=3.2) for k in range(3)]
        telezentralen = VGroup(*tele_lines1, *tele_lines2)
        att_dots = VGroup(*[Dot(p, color=HOLO_GOLD, radius=0.11) for p in att_pts])
        sad_dots = VGroup(*[Dot(p, color=CRIMSON_RED, radius=0.10) for p in sad_pts])

        flow_pulses = VGroup(*[Dot(sad_pts[k], color=HOLO_GOLD, radius=0.07) for k in range(3)])

        msw_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.50)
        msw_tex = MathTex(
            r"\mathbf{Morse\text{--}Smale\text{--}Witten\;Complex\;(Thm\;6.20):}\\[5pt]"
            r"\partial_{\text{MS}}: CM_1(\Omega) \longrightarrow CM_0(\Omega), \qquad \partial_{\text{MS}}^2 = 0\\[5pt]"
            r"\bullet\;c_0 = \#\{\text{Index-0 Point Telezentren }T_z\} = 3\\[3pt]"
            r"\bullet\;c_1 = \#\{\text{Index-1 Extinction Saddles }p_j\} = 3\\[4pt]"
            r"\implies \mu = c_0 + c_1 = 2c_0 = \mathbf{6\text{ (Strictly Even!)}}\\[5pt]"
            r"\bullet\;\text{Each saddle }W^u(p_j)\text{ forms a geodetic }\textit{Telezentrale}!",
            font_size=15, color=WHITE
        ).move_to(msw_panel)

        lean_parity = MathTex(
            r"\text{Lean 4 (\texttt{Syntrometrie.StratumB.PartAExpansions}): }\; "
            r"\texttt{telecentre\_even\_parity : }(c_0 = c_1) \implies c_0 + c_1 = 2c_0",
            font_size=17, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(om_ring), Write(om_hdr),
            Create(telezentralen), FadeIn(att_dots, sad_dots, flow_pulses),
            Create(msw_panel), Write(msw_tex), Write(lean_parity),
            run_time=1.8
        )
        self.play(
            *[MoveAlongPath(flow_pulses[k], tele_lines1[k]) for k in range(3)],
            run_time=1.3, rate_func=rate_functions.ease_in_out_sine
        )
        self.wait(0.6)

        self.play(FadeOut(VGroup(
            hdr10, morse_top, om_ring, om_hdr, telezentralen, att_dots, sad_dots, flow_pulses, msw_panel, msw_tex, lean_parity
        )), run_time=0.8)



# =============================================================================
# SCENE: Act11_Sec_634_Wasserstein_Free (Act 11)
# =============================================================================
class Act11_Sec_634_Wasserstein_Free(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr11 = Text(
            "Act XI (Sec. 6.3.4): Wasserstein Free-Energy Flow & Kramers Resynkolation",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        w2_top = MathTex(
            r"\mathcal{F}_{\text{free}}[\rho] := \int \Psi\rho\,d\operatorname{vol}_g + \varepsilon_{\text{fluct}}\int \rho\ln\rho\,d\operatorname{vol}_g, \qquad "
            r"\frac{d}{dt}\mathcal{F}_{\text{free}}[\rho_t] = -\int \|\operatorname{grad}(\Psi+\varepsilon_{\text{fluct}}\ln\rho_t)\|^2\rho_t\,d\operatorname{vol}_g \le 0",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr11, DOWN, buff=0.12).align_to(hdr11, LEFT)
        self.add_fixed_in_frame_mobjects(hdr11, w2_top)
        self.play(FadeIn(hdr11), Write(w2_top), run_time=1.1)

        r_axes = Axes(
            x_range=[-1.8, 1.8, 1], y_range=[0, 3.0, 1],
            x_length=5.0, y_length=2.85,
            axis_config={"include_tip": True, "color": GREY_B}
        ).move_to(LEFT * 3.15 + DOWN * 0.65)

        bar_trk = ValueTracker(0.55)
        jit_trk = ValueTracker(0.0)

        dyn_well = always_redraw(lambda: r_axes.plot(
            lambda x: 0.25 + bar_trk.get_value() * ((x**2 - 1.0)**2),
            x_range=[-1.65, 1.65],
            color=CRIMSON_RED if bar_trk.get_value() < 1.0 else GREEN_C,
            stroke_width=4
        ))
        state_ball = always_redraw(lambda: Dot(
            r_axes.c2p(
                -1.0 + (0.22 / bar_trk.get_value()) * np.sin(8 * jit_trk.get_value()),
                0.25 + bar_trk.get_value() * (((-1.0 + (0.22 / bar_trk.get_value()) * np.sin(8 * jit_trk.get_value()))**2 - 1.0)**2)
            ),
            color=HOLO_GOLD, radius=0.11
        ))

        b_lbl = MathTex(r"\text{Barrier Height }\Delta E_{\text{barrier}} = \Psi(p^*) - \Psi(\mathcal{A}) = ", font_size=17, color=HOLO_GOLD)
        b_dec = DecimalNumber(0.55, num_decimal_places=2, font_size=17, color=HOLO_GOLD)
        b_dec.add_updater(lambda m: m.set_value(bar_trk.get_value()))
        b_row = VGroup(b_lbl, b_dec).arrange(RIGHT, buff=0.08).next_to(r_axes, UP, buff=0.08)

        kr_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.55)
        kr_tex = MathTex(
            r"\mathbf{Thm\;6.21(2)\;(Eyring\text{--}Kramers\;Survival\;Law):}\\[5pt]"
            r"\tau_{\text{surv}} \simeq \frac{2\pi}{|\lambda_1(p^*)|}\sqrt{\frac{|\det\operatorname{Hess}\Psi(p^*)|}{\det\operatorname{Hess}\Psi(\mathcal{A})}}\,"
            r"\exp\!\left(\frac{\Delta E_{\text{barrier}}}{\varepsilon_{\text{fluct}}}\right)\\[6pt]"
            r"\bullet\;\text{When }\Delta E_{\text{barrier}} < \varepsilon_{\text{fluct}}\ln(\tau_{\min}/\tau_0),\\"
            r"\;\;\text{dysvariant escape across }\mathcal{D}_{\text{ext}}\text{ is imminent!}\\[5pt]"
            r"\bullet\;\mathbf{Resynkolation\;Morphism\;\mathcal{R}_{\text{resyn}}:}\\"
            r"\;\;(\mathcal{O}_{\text{syn}}, \Psi) \longmapsto (\mathcal{O}'_{\text{syn}}, \Psi')\quad(\Delta E'_{\text{barrier}} \gg \varepsilon_{\text{fluct}})",
            font_size=15, color=WHITE
        ).move_to(kr_panel)

        self.play(
            Create(r_axes), Create(dyn_well), FadeIn(state_ball, b_row),
            Create(kr_panel), Write(kr_tex),
            run_time=1.8
        )
        # Trigger Resynkolation: deepen barrier from 0.55 to 2.15 while damping thermal jitter
        self.play(
            bar_trk.animate.set_value(2.15),
            jit_trk.animate.set_value(2.0),
            run_time=2.2, rate_func=rate_functions.ease_in_out_sine
        )
        b_dec.clear_updaters()
        self.wait(0.6)

        self.remove(dyn_well, state_ball)
        self.play(FadeOut(VGroup(hdr11, w2_top, r_axes, b_row, kr_panel, kr_tex)), run_time=0.8)



# =============================================================================
# SCENE: Ch6_Act12_Synthesis (Act 12)
# =============================================================================
class Ch6_Act12_Synthesis(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr12 = Text(
            "Act XII (Secs. 6.4-6.6): Sanity Checks, Explication & Ch. 6 Synthesis",
            font_size=21, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr12)
        self.play(FadeIn(hdr12), run_time=0.7)

        s6_nodes = VGroup()
        s6_specs = [
            (r"\mathbf{1.\;Aeonische\;Area}\\(\mathcal{M}_{\mathfrak{AR}}, g_{\mathfrak{AR}}, \Phi_t)", ROYAL_BLUE, LEFT * 4.3 + UP * 1.45),
            (r"\mathbf{2.\;Televariant\;Basin}\\\dot{V}\le -\gamma V", TEAL_BRIGHT, ORIGIN + UP * 1.45),
            (r"\mathbf{3.\;Final\;Coalgebra}\\(\nu\mathcal{T}, \zeta\cong)", ORANGE_GOLD, RIGHT * 4.3 + UP * 1.45),
            (r"\mathbf{4.\;Separatrix\;Wall}\\\mathcal{D}_{\text{ext}}=\partial\mathcal{B}(\mathcal{A})", ROYAL_BLUE, LEFT * 4.3 + DOWN * 0.25),
            (r"\mathbf{5.\;Universal\;Arrow}\\\exists!\, !_\alpha: S\to\nu\mathcal{T}", TEAL_BRIGHT, ORIGIN + DOWN * 0.25),
            (r"\mathbf{6.\;Stratum\;Relativity}\\\Gamma_m\dashv U_{m+1}", HOLO_GOLD, RIGHT * 4.3 + DOWN * 0.25),
        ]
        for t_s, c_s, p_s in s6_specs:
            bx = RoundedRectangle(width=3.5, height=0.95, corner_radius=0.1, color=c_s, fill_opacity=0.20).move_to(p_s)
            tx = MathTex(t_s, font_size=16, color=WHITE).move_to(bx)
            s6_nodes.add(VGroup(bx, tx))

        s6_edges = VGroup(
            Arrow(s6_nodes[0].get_right(), s6_nodes[1].get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s6_nodes[1].get_right(), s6_nodes[2].get_left(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s6_nodes[0].get_bottom(), s6_nodes[3].get_top(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s6_nodes[1].get_bottom(), s6_nodes[4].get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s6_nodes[2].get_bottom(), s6_nodes[5].get_top(), color=ORANGE_GOLD, buff=0.06, stroke_width=2.5),
            DashedLine(s6_nodes[3].get_right(), s6_nodes[4].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16),
            DashedLine(s6_nodes[4].get_right(), s6_nodes[5].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16)
        )

        fin6_box = RoundedRectangle(width=12.0, height=1.65, corner_radius=0.12, color=HOLO_GOLD, fill_opacity=0.14).to_edge(DOWN, buff=0.20)
        fin6_tex = MathTex(
            r"\bullet\;\text{Sec. 6.5 Sanity Checks: }\; "
            r"(1)\;\operatorname{grad}\Psi\equiv 0 \implies \Phi_t=\operatorname{id}\;\text{(Unpolarized Projective Panorama)} \quad\mid\quad "
            r"(2)\;\Gamma_m(\nu\mathcal{T}_m)\not\cong\nu\mathcal{T}_{m+1}\\[4pt]"
            r"\bullet\;\mathbf{Completion\;of\;Teil\;A\;(Chapters\;1\text{--}6):}\;\text{The universal categorical logic of Syntrometrie is complete!}\\[4pt]"
            r"\bullet\;\mathbf{Dialectical\;Ascent\;to\;Chapter\;7\;(Teil\;B):}\;\text{Execute the Anthropomorphic Pivot to }\mathbf{Coeff}=[\mathbb{Q}\subseteq\mathbb{R}\subseteq\mathbb{C}]\text{ \& }R_n",
            font_size=15, color=HOLO_GOLD
        ).move_to(fin6_box)

        self.play(FadeIn(s6_nodes, lag_ratio=0.08), Create(s6_edges), run_time=1.8)
        self.play(Create(fin6_box), Write(fin6_tex), run_time=1.8)
        self.play(fin6_box.animate.set_stroke(WHITE, width=4), rate_func=rate_functions.there_and_back, run_time=1.0)
        self.wait(2.5)


