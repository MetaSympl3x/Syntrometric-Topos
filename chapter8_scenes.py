# =============================================================================
# MODULAR MANIM SCENES FOR CHAPTER 8 REVEAL.JS PRESENTATION
# Chapter 8: Syntrometrie über dem Quantitätsaspekt
# =============================================================================

from manim import *
import numpy as np


# =====================================================================
# STANDARDIZED BOOK COLOR PALETTE (MATCHING LATEX PREAMBLE)
# =====================================================================
ROYAL_BLUE = "#4169E1"     # Parameter Manifold M_n = (R_{>=0})^n / Base Continuum
TEAL_BRIGHT = "#20B2AA"    # Fiber Sections / Schwartz Space S(M_n)
ORANGE_GOLD = "#FFA500"    # Anisotropic Synkolator / Ganzläufigkeit f(t')
CRIMSON_RED = "#DC143C"    # Fehlstelle 0 / Corner Boundary / Naive Extension Kink
HOLO_GOLD = "#FFD700"      # Grothendieck Nuclear Tensor / 3 Synchronized Modes
PURPLE_SYN = "#9370DB"     # Seeley Extension / Polarization / Poincaré Ray Integral
SLATE_GREY = "#708090"     # Structural Framing & Corner Hyperplanes


def dashed_box(width, height, color, num_dashes=7):
    hw, hh = width / 2, height / 2
    ul, ur, dl, dr = (
        np.array([-hw, hh, 0]),
        np.array([hw, hh, 0]),
        np.array([-hw, -hh, 0]),
        np.array([hw, -hh, 0]),
    )
    return VGroup(
        DashedLine(ul, ur, color=color, dash_length=width / (2 * num_dashes)),
        DashedLine(ur, dr, color=color, dash_length=height / (2 * num_dashes)),
        DashedLine(dr, dl, color=color, dash_length=width / (2 * num_dashes)),
        DashedLine(dl, ul, color=color, dash_length=height / (2 * num_dashes)),
    )


# =============================================================================
# SCENE 1: Ch8_Act1_Primigene_Aeondyne_SM29
# =============================================================================
class Ch8_Act1_Primigene_Aeondyne_SM29(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=60 * DEGREES, theta=-45 * DEGREES)

        hdr = Text(
            "Act I (Sec. 8.1.1): Quantitaetssyntrix as Primigene Aeondyne (SM-29)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm29 = MathTex(
            r"\mathbf{y}\mathbf{R}_n \equiv \langle \mathfrak{f},\, R_n,\, m \rangle \equiv \widetilde{\mathbf{a}}(x_i)_1^n, \qquad "
            r"R_n = (x_i)_n, \qquad 0 \le x_i \le \infty\;\;(\text{SM-29})",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, sm29)
        self.play(Write(hdr), Write(sm29), run_time=1.1)

        base_octant = Surface(
            lambda u, v: np.array([u - 2.2, v - 1.2, -1.2]),
            u_range=[0.0, 3.2], v_range=[0.0, 2.4],
            resolution=(12, 10),
            fill_color=ROYAL_BLUE, fill_opacity=0.22, stroke_color=ROYAL_BLUE, stroke_width=1
        )
        fiber_surf = Surface(
            lambda u, v: np.array([
                u - 2.2,
                v - 1.2,
                -0.2 + 0.65 * np.exp(-0.35 * (u + v)) * np.cos(1.6 * u) * np.cos(1.4 * v)
            ]),
            u_range=[0.0, 3.2], v_range=[0.0, 2.4],
            resolution=(16, 14),
            fill_color=TEAL_BRIGHT, fill_opacity=0.55, stroke_color=HOLO_GOLD, stroke_width=0.8
        )
        origin_dot = Dot3D(np.array([-2.2, -1.2, -1.2]), radius=0.08, color=CRIMSON_RED)

        info_card = RoundedRectangle(width=5.4, height=2.5, corner_radius=0.12, color=ROYAL_BLUE, fill_opacity=0.15).to_corner(UR, buff=0.35).shift(DOWN * 0.65)
        info_tex = MathTex(
            r"\mathbf{Parameter\text{-}Tensorium\;R_n\;(SM,\;p.\;131):}\\[4pt]"
            r"\bullet\;\text{Continuous coordinates }x_i\in[0,\infty)\\"
            r"\bullet\;\text{Fehlstelle }\mathbf{0}\text{ (Red) at octant corner}\\"
            r"\bullet\;\text{Inherits Metroplex }\overset{\scriptscriptstyle n}{\mathbf{M}}\text{ \& fibration lifts!}",
            font_size=15, color=WHITE
        ).move_to(info_card)
        self.add_fixed_in_frame_mobjects(info_card, info_tex)

        self.play(Create(base_octant), FadeIn(origin_dot), Create(fiber_surf), FadeIn(info_card, info_tex), run_time=1.8)
        self.begin_ambient_camera_rotation(rate=0.18)
        self.wait(1.6)
        self.stop_ambient_camera_rotation()


# =============================================================================
# SCENE 2: Ch8_Act2_Variable_Separation_Ganzlaeufig
# =============================================================================
class Ch8_Act2_Variable_Separation_Ganzlaeufig(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act II (Sec. 8.1.2): Separation der Variablen, Asymmetries & Ganzlaeufigkeit",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        top_eq = MathTex(
            r"f(x_1,\dots,x_m) = \prod_{l=1}^m \phi_l(x_l), \qquad "
            r"\mathfrak{f} \equiv \mathfrak{f}(t'), \qquad t' \in R_{m_s} := M'_U\;\;(\text{SM, p. 132})",
            font_size=18, color=ORANGE_GOLD
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, top_eq)
        self.play(FadeIn(hdr), Write(top_eq), run_time=1.1)

        left_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        ax = Axes(
            x_range=[0, 3, 1], y_range=[-0.8, 1.1, 0.5],
            x_length=4.6, y_length=2.2,
            axis_config={"include_tip": True, "color": GREY_B}
        ).move_to(LEFT * 3.15 + DOWN * 0.65)
        tp_trk = ValueTracker(0.0)
        c_phi1 = always_redraw(lambda: ax.plot(
            lambda x: np.exp(-0.8 * (1 + 0.35 * tp_trk.get_value()) * x),
            x_range=[0, 2.8], color=ROYAL_BLUE, stroke_width=3.2
        ))
        c_phi2 = always_redraw(lambda: ax.plot(
            lambda x: np.exp(-0.3 * x) * np.cos(2.4 * (1 + 0.25 * tp_trk.get_value()) * x),
            x_range=[0, 2.8], color=TEAL_BRIGHT, stroke_width=3.2
        ))
        c_prod = always_redraw(lambda: ax.plot(
            lambda x: np.exp(-(0.8 * (1 + 0.35 * tp_trk.get_value()) + 0.3) * x) * np.cos(2.4 * (1 + 0.25 * tp_trk.get_value()) * x),
            x_range=[0, 2.8], color=HOLO_GOLD, stroke_width=3.8
        ))

        right_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        right_tex = MathTex(
            r"\mathbf{Analytical\;Channel\;Decomposition:}\\[5pt]"
            r"1.\;\mathbf{Separation\;der\;Variablen:}\\"
            r"\;\;\text{Factors multidimensional field into 1D channels }\phi_l(x_l).\\[5pt]"
            r"2.\;\mathbf{Funktionale\;Asymmetrie:}\\"
            r"\;\;\text{Exposes anisotropic weighting of space, time, charge.}\\[5pt]"
            r"3.\;\mathbf{Ganzlaeufige\;Aeondyne\;\mathfrak{f}(t'):}\\"
            r"\;\;\text{Synkolator law adapts smoothly over }t'\in R_{m_s}!",
            font_size=15, color=WHITE
        ).move_to(right_box)

        self.play(
            Create(left_box), Create(ax), FadeIn(c_phi1, c_phi2, c_prod),
            Create(right_box), Write(right_tex),
            run_time=1.7
        )
        self.play(tp_trk.animate.set_value(1.5), run_time=1.8, rate_func=rate_functions.ease_in_out_sine)
        self.wait(0.5)


# =============================================================================
# SCENE 3: Ch8_Act3_Infinitesimal_Functors_SM30_35
# =============================================================================
class Ch8_Act3_Infinitesimal_Functors_SM30_35(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act III (Sec. 8.1.3): Differential/Integral Functors (SM-30..35a) & Thm 8.1",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\tilde{\mathrm{d}}| = \lim_{(\Delta x_i)_n\to 0} \Delta_{\text{kor}}\;\;(\text{SM-30}), \qquad "
            r"\mathrm{I} = \lim_{N\to\infty}\sum_{j=1}^{N-1}\;\;(\text{SM-32}), \qquad "
            r"{}^+\!\left({}_+(y,y)?,(\;)\right)? = \frac{1}{2}(\mathbf{y}\widetilde{\mathbf{y}})^2\;\;(\text{Thm 8.1 / SM-35a})",
            font_size=16, color=PURPLE_SYN
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(FadeIn(hdr), Write(eq_top), run_time=1.1)

        sq = Square(side_length=2.8, color=PURPLE_SYN, fill_color=PURPLE_SYN, fill_opacity=0.15).move_to(LEFT * 3.2 + DOWN * 0.55)
        tri_low = Polygon(
            sq.get_corner(DL), sq.get_corner(DR), sq.get_corner(UR),
            color=TEAL_BRIGHT, fill_color=TEAL_BRIGHT, fill_opacity=0.38
        )
        diag = Line(sq.get_corner(DL), sq.get_corner(UR), color=HOLO_GOLD, stroke_width=3.5)
        lbl_low = MathTex(r"{}_+(y,y)? = \tfrac{1}{2}y^2", font_size=16, color=HOLO_GOLD).move_to(LEFT * 2.55 + DOWN * 1.25)
        lbl_up = MathTex(r"{}^+(y,y)? = \tfrac{1}{2}y^2", font_size=16, color=PURPLE_SYN).move_to(LEFT * 3.85 + UP * 0.15)

        r_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        r_tex = MathTex(
            r"\mathbf{Continuum\;Consistency\;Test\;(SM,\;pp.\;136\text{--}144):}\\[5pt]"
            r"\bullet\;\textbf{SM-30..31:}\;\tilde{\mathrm{d}}|\text{ and }\tilde{\partial}_k|\text{ from limiting corporate}\\"
            r"\;\;\text{difference chains across }\Delta x_i\to 0.\\[5pt]"
            r"\bullet\;\textbf{SM-32..34:}\;\text{Integral functor }\mathrm{I}\text{ as infinite corporate}\\"
            r"\;\;\text{accumulation chain recovering primitives.}\\[5pt]"
            r"\bullet\;\textbf{Thm 8.1 (SM-35a):}\;\text{Composing syncolative }({}_+)\text{ and}\\"
            r"\;\;\text{metrophoric }({}^+)\text{ partial integrators yields }\int x\,dx = \tfrac{1}{2}x^2 + C!",
            font_size=15, color=WHITE
        ).move_to(r_box)

        self.play(
            Create(sq), FadeIn(tri_low), Create(diag), Write(lbl_low), Write(lbl_up),
            Create(r_box), Write(r_tex),
            run_time=1.8
        )
        self.wait(0.8)


# =============================================================================
# SCENE 4: Ch8_Act4_Algebraic_Constraints_Nuclear_Scholium
# =============================================================================
class Ch8_Act4_Algebraic_Constraints_Nuclear_Scholium(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act IV (Secs. 8.1.4 & 8.2): Algebraic Constraints & Nuclearity Scholium 8.2",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        top_eq = MathTex(
            r"\{0, 1\} \subset x_l\;(\forall l), \qquad "
            r"\mathcal{M}_n = (\mathbb{R}_{\ge 0})^n, \qquad "
            r"\mathcal{S}(\mathcal{M}_{m_1}\times\mathcal{M}_{m_2}) \cong "
            r"\mathcal{S}(\mathcal{M}_{m_1})\widehat{\otimes}_\pi\mathcal{S}(\mathcal{M}_{m_2}) \cong "
            r"\mathcal{S}(\mathcal{M}_{m_1})\widehat{\otimes}_\varepsilon\mathcal{S}(\mathcal{M}_{m_2})",
            font_size=16, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, top_eq)
        self.play(FadeIn(hdr), Write(top_eq), run_time=1.1)

        l_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=CRIMSON_RED, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        l_tex = MathTex(
            r"\mathbf{Three\;Algebraic\;Constraints\;(SM,\;p.\;133):}\\[5pt]"
            r"1.\;\mathbf{Fehlstelle\;0\;\&\;Einheit\;E:}\\"
            r"\;\;\{0, 1\}\subset x_l\text{ anchors origin and unit scale in }\mathbb{K}.\\[5pt]"
            r"2.\;\mathbf{Reduzierbarkeit\;homometraler\;Formen:}\\"
            r"\;\;\text{Repeated inputs reduce to strict arity }A < m.\\[5pt]"
            r"3.\;\mathbf{3\text{-}Class\;Corporate\;Collapse:}\\"
            r"\;\;15\text{ qualitative classes collapse to }3\text{ on }\mathbf{Ctx}_{\text{quant}}.",
            font_size=15, color=WHITE
        ).move_to(l_box)

        r_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=HOLO_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        r_tex = MathTex(
            r"\mathbf{Scholium\;8.2\;(Zalamea\;2012;\;Marquis\;2009):}\\[5pt]"
            r"\bullet\;\text{Physical magnitudes }(m, r, T, \rho)\text{ satisfy }0\le x_i<\infty,\\"
            r"\;\;\text{forming cornered manifolds }\mathcal{M}_n=(\mathbb{R}_{\ge 0})^n.\\[5pt]"
            r"\bullet\;\text{Grothendieck created both }\textbf{Topos Theory}\text{ (Ch. 1)}\\"
            r"\;\;\text{and }\textbf{Nuclear Locally Convex Spaces}\text{ (1955)!}\\[5pt]"
            r"\bullet\;\text{In }\mathcal{S}(\mathcal{M}_n),\;\widehat{\otimes}_\pi = \widehat{\otimes}_\varepsilon\text{ powers variable separation!}",
            font_size=15, color=HOLO_GOLD
        ).move_to(r_box)

        self.play(Create(l_box), Write(l_tex), Create(r_box), Write(r_tex), run_time=1.8)
        self.wait(0.8)


# =============================================================================
# SCENE 5: Ch8_Act5_Man_Param_Base_Ring_Envelope
# =============================================================================
class Ch8_Act5_Man_Param_Base_Ring_Envelope(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act V (Sec. 8.2.1): Category Man_param (Def 8.3) & Base Envelope (Def 8.4)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        top_eq = MathTex(
            r"\|f\|_{\alpha,\beta} := \sup_{x\in\mathcal{M}_n}\left|x^\alpha\partial^\beta f(x)\right| < \infty\;\;(\text{Def 8.3}), \qquad "
            r"\mathcal{A}_{\mathbb{K}}(\mathcal{M}_n) := \mathbb{K}\cdot 1_{\mathcal{A}} \oplus \mathcal{S}(\mathcal{M}_n,\mathbb{K}) \subset C_b^\infty(\mathcal{M}_n,\mathbb{K})\;\;(\text{Def 8.4})",
            font_size=16, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, top_eq)
        self.play(FadeIn(hdr), Write(top_eq), run_time=1.1)

        ax = Axes(
            x_range=[0, 6, 1], y_range=[0, 1.4, 0.5],
            x_length=5.0, y_length=2.5,
            axis_config={"include_tip": True, "color": GREY_B}
        ).move_to(LEFT * 3.15 + DOWN * 0.65)
        unit_line = DashedLine(ax.c2p(0, 1.0), ax.c2p(5.8, 1.0), color=ORANGE_GOLD, stroke_width=2.5)
        sch_curve = ax.plot(lambda x: (x ** 2) * np.exp(-x), x_range=[0, 5.8], color=TEAL_BRIGHT, stroke_width=3.5)
        peak_dot = Dot(ax.c2p(2.0, 4.0 * np.exp(-2.0)), color=HOLO_GOLD, radius=0.09)
        orig_dot = Dot(ax.c2p(0, 0), color=CRIMSON_RED, radius=0.09)
        lbl_pk = MathTex(r"\|e^{-x}\|_{2,0} = (2/e)^2", font_size=15, color=HOLO_GOLD).next_to(peak_dot, UP, buff=0.08)

        r_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        r_tex = MathTex(
            r"\mathbf{Unital\;Algebraic\;Base\;Envelope\;(Def\;8.4):}\\[5pt]"
            r"\mathcal{A}_{\mathbb{K}}(\mathcal{M}_n) = \mathbb{K}\cdot 1_{\mathcal{A}} \;\oplus\; \mathcal{S}(\mathcal{M}_n,\mathbb{K})\\[5pt]"
            r"\bullet\;\mathbf{Fehlstelle\;0:}\;\text{Origin }\mathbf{0}\in\mathcal{M}_n\text{ and zero section }0_{\mathcal{A}}\\"
            r"\bullet\;\mathbf{Einheit\;E:}\;\text{Constant unit section }1_{\mathcal{A}}(x)\equiv 1_{\mathbb{K}}\\"
            r"\bullet\;\mathbf{Nuclear\;Ideal:}\;\mathcal{S}(\mathcal{M}_n,\mathbb{K})\text{ carries rapid-decay fields!}",
            font_size=15, color=WHITE
        ).move_to(r_box)

        self.play(
            Create(ax), Create(unit_line), Create(sch_curve),
            FadeIn(peak_dot, orig_dot), Write(lbl_pk),
            Create(r_box), Write(r_tex),
            run_time=1.8
        )
        self.wait(0.8)


# =============================================================================
# SCENE 6: Ch8_Act6_Poincare_Integral_SDG_Carnap
# =============================================================================
class Ch8_Act6_Poincare_Integral_SDG_Carnap(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act VI (Sec. 8.2.2): Poincare Integral I_0 (Def 8.5) & Carnap 8.1 (SDG vs DEC)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        calc_top = MathTex(
            r"\tilde{\mathrm{d}}|f := df = \sum_{i=1}^n (\tilde{\partial}_i|f)\,dx^i\;\;(\text{SM-30}), \quad "
            r"(\mathrm{I}_{\mathbf{0}}\,\omega)(x) := \int_0^1 \sum_{i=1}^n x^i\omega_i(tx)\,dt, \quad "
            r"\tilde{\mathrm{d}}|(\mathrm{I}_{\mathbf{0}}\,\omega) = \omega\;\;(\text{SM-33})",
            font_size=16, color=PURPLE_SYN
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, calc_top)
        self.play(FadeIn(hdr), Write(calc_top), run_time=1.1)

        p_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(LEFT * 3.15 + DOWN * 0.52)
        orig_pt = Dot(LEFT * 5.0 + DOWN * 1.55, color=CRIMSON_RED, radius=0.10)
        orig_lbl = MathTex(r"\mathbf{0}", font_size=18, color=CRIMSON_RED).next_to(orig_pt, DL, buff=0.04)
        ray_lines = [
            Line(
                LEFT * 5.0 + DOWN * 1.55,
                LEFT * 5.0 + DOWN * 1.55 + 2.1 * np.array([np.cos(a), np.sin(a), 0]),
                color=HOLO_GOLD, stroke_width=2.5
            )
            for a in [15 * DEGREES, 45 * DEGREES, 75 * DEGREES]
        ]
        p_rays = VGroup(*[Arrow(l.get_start(), l.get_end(), color=HOLO_GOLD, buff=0, stroke_width=2.5) for l in ray_lines])
        ray_dots = VGroup(*[Dot(LEFT * 5.0 + DOWN * 1.55, color=TEAL_BRIGHT, radius=0.075) for _ in range(3)])
        ftc_tex = MathTex(
            r"\mathrm{I}_{\mathbf{0}}(\tilde{\mathrm{d}}|f)(x) = f(x) - f(\mathbf{0})\\"
            r"\mathrm{I}_a^b(\tilde{\mathrm{d}}|f) = f(\gamma(b)) - f(\gamma(a))",
            font_size=15, color=WHITE
        ).move_to(LEFT * 2.05 + DOWN * 0.95)

        sdg_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        sdg_tex = MathTex(
            r"\mathbf{Carnap\;8.1\;(Synthetic\;Infinitesimals\;vs.\;DEC):}\\[5pt]"
            r"\bullet\;\textbf{Synthetic Differential Geometry (Kock--Lawvere):}\\"
            r"\;\;D := [\![d\in R \mid d^2 = 0]\!]\subset R\quad(\text{Smooth Topos})\\[3pt]"
            r"\;\;\forall d\in D,\;\; f(x+d) = f(x) + f'(x)d\\[6pt]"
            r"\bullet\;\textbf{Epistemic Demarcation Principle:}\\"
            r"\;\;\text{SDG (Stratum A) }\neq\text{ DEC Cochain Calculus (Stratum C)}!",
            font_size=15, color=WHITE
        ).move_to(sdg_box)

        self.play(
            Create(p_box), FadeIn(orig_pt), Write(orig_lbl),
            Create(p_rays), FadeIn(ray_dots), Write(ftc_tex),
            Create(sdg_box), Write(sdg_tex),
            run_time=1.7
        )
        self.play(
            *[MoveAlongPath(ray_dots[i], ray_lines[i]) for i in range(3)],
            run_time=1.4, rate_func=rate_functions.ease_in_out_sine
        )
        self.wait(0.6)


# =============================================================================
# SCENE 7: Ch8_Act7_Seeley_Extension_Corners_Fig82
# =============================================================================
class Ch8_Act7_Seeley_Extension_Corners_Fig82(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act VII (Sec. 8.3.1): Corner Smoothness & Seeley Extension (Thm 8.6, Fig 8.2)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        see_top = MathTex(
            r"(\mathcal{E}_{x_i} f)(x_i) := \sum_{k=0}^\infty a_k \chi(-2^k x_i) f(-2^k x_i), \qquad "
            r"\sum_{k=0}^\infty a_k (-2^k)^m = 1\;(\forall m\in\mathbb{N}_0), \qquad "
            r"\mathcal{R}_+\circ\mathcal{E}^{(n)} = \operatorname{id}",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, see_top)
        self.play(FadeIn(hdr), Write(see_top), run_time=1.1)

        fail2_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=CRIMSON_RED, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        fail2_tex = MathTex(
            r"\mathbf{Why\;Naive\;Approaches\;Fail\;II:}\\[3pt]"
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
            lambda x: np.exp(-x) if x >= 0 else (1.0 - x + 0.5 * (x ** 2)) * np.exp(-1.2 * (x ** 2)),
            x_range=[-1.5, 1.5], color=GREEN_C, stroke_width=3.5
        )

        s_c = RIGHT * 3.15 + DOWN * 0.52
        q_1 = Rectangle(width=2.1, height=1.45, color=TEAL_BRIGHT, fill_color=TEAL_BRIGHT, fill_opacity=0.28).move_to(s_c + RIGHT * 1.05 + UP * 0.725)
        q_2 = dashed_box(width=2.1, height=1.45, color=PURPLE_SYN, num_dashes=6).move_to(s_c + LEFT * 1.05 + UP * 0.725)
        q_4 = dashed_box(width=2.1, height=1.45, color=PURPLE_SYN, num_dashes=6).move_to(s_c + RIGHT * 1.05 + DOWN * 0.725)
        q_3 = dashed_box(width=2.1, height=1.45, color=ORANGE_GOLD, num_dashes=6).move_to(s_c + LEFT * 1.05 + DOWN * 0.725)

        tq1 = MathTex(r"\mathcal{M}_2=(\mathbb{R}_{\ge 0})^2\\f\in\mathcal{S}(\mathcal{M}_2)", font_size=15, color=TEAL_BRIGHT).move_to(q_1)
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
        self.play(Create(q_2), Write(tq2), Create(q_4), Write(tq4), Create(q_3), Write(tq3), run_time=1.5)
        self.wait(0.6)


# =============================================================================
# SCENE 8: Ch8_Act8_Grothendieck_Nuclear_Wavepacket_Fig81
# =============================================================================
class Ch8_Act8_Grothendieck_Nuclear_Wavepacket_Fig81(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act VIII (Sec. 8.3.1): Grothendieck Nuclearity (Fig 8.1) & Series Separation",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        nuc_top = MathTex(
            r"\mathcal{S}\!\left((\mathbb{R}_{\ge 0})^m\right) \;\cong\; "
            r"\widehat{\bigotimes}_{l=1}^{m,\pi} \mathcal{S}(\mathbb{R}_{\ge 0}) \;\cong\; "
            r"\widehat{\bigotimes}_{l=1}^{m,\varepsilon} \mathcal{S}(\mathbb{R}_{\ge 0}), \qquad "
            r"f(x_1,\dots,x_m) = \sum_{j=1}^\infty \lambda_j\,\phi_j^{(1)}(x_1)\otimes\cdots\otimes\phi_j^{(m)}(x_m)\;\;(\text{Thm 8.6})",
            font_size=15, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, nuc_top)
        self.play(FadeIn(hdr), Write(nuc_top), run_time=1.1)

        pkt_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        pkt_hdr = MathTex(r"\text{Fig 8.1: Nuclear Wave-Packet Factorization}", font_size=17, color=ROYAL_BLUE).next_to(pkt_box.get_top(), DOWN, buff=0.12)

        blob_2d = Ellipse(width=1.45, height=0.85, color=TEAL_BRIGHT, fill_color=TEAL_BRIGHT, fill_opacity=0.45).rotate(30 * DEGREES).move_to(LEFT * 4.75 + DOWN * 0.65)
        eq_sign = MathTex(r"=", font_size=28, color=HOLO_GOLD).move_to(LEFT * 3.55 + DOWN * 0.65)

        w1_x = FunctionGraph(lambda t: 0.42 * np.exp(-t ** 2) * np.cos(4 * t), x_range=[-1.1, 1.1], color=ROYAL_BLUE, stroke_width=3.2).move_to(LEFT * 1.95 + DOWN * 0.15)
        ox_s = MathTex(r"\widehat{\otimes}_\pi = \widehat{\otimes}_\varepsilon", font_size=18, color=HOLO_GOLD).move_to(LEFT * 1.95 + DOWN * 0.65)
        w1_y = FunctionGraph(lambda t: 0.42 * np.exp(-t ** 2) * np.sin(4 * t), x_range=[-1.1, 1.1], color=TEAL_BRIGHT, stroke_width=3.2).move_to(LEFT * 1.95 + DOWN * 1.15)

        ex81_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=HOLO_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        ex81_tex = MathTex(
            r"\mathbf{Toy\;Example\;(Explicit\;Nuclear\;Expansion):}\\[5pt]"
            r"f(x_1, x_2) = e^{-(x_1+x_2)}\cos(x_1 x_2) \in \mathcal{S}((\mathbb{R}_{\ge 0})^2)\\[5pt]"
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


# =============================================================================
# SCENE 9: Ch8_Act9_Homometral_Polarization_Reduction
# =============================================================================
class Ch8_Act9_Homometral_Polarization_Reduction(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act IX (Sec. 8.3.2): Homometral Polarization & Arity Reduction (Thm 8.8)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        pol_top = MathTex(
            r"\operatorname{Pol}(v_1,\dots,v_m) = \frac{1}{2^m m!}\sum_{\epsilon\in\{-1,1\}^m} \left(\prod_{i=1}^m\epsilon_i\right)\!\left(\sum_{j=1}^m\epsilon_j v_j\right)^m, \qquad "
            r"F(\underbrace{x_1,\dots,x_1}_{a_1},\dots,x_k) = F_{\text{red}}(x_1,\dots,x_k)\;\;(k<m)",
            font_size=15, color=PURPLE_SYN
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, pol_top)
        self.play(FadeIn(hdr), Write(pol_top), run_time=1.1)

        pol_panel = RoundedRectangle(width=5.7, height=3.35, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(LEFT * 3.15 + DOWN * 0.50)
        pol_tex = MathTex(
            r"\mathbf{Thm\;8.8\;(Homometral\;Reducibility,\;SM\;p.\;133):}\\[5pt]"
            r"v^m = \sum_{k=1}^m \sum_{1\le i_1<\dots<i_k\le n} c_{i_1\dots i_k}\left(e_{i_1}\odot\cdots\odot e_{i_k}\right)\\[6pt]"
            r"\mathbf{Cubic\;Toy\;Example\;(m=3,\; k=2):}\\[4pt]"
            r"F(x_1, x_1, x_2) = x_1^2 x_2\quad(\text{Nominal Arity }m=3)\\[3pt]"
            r"\implies F_{\text{red}}(u, v) := u^2 v \in \mathcal{O}_{\text{quant}}(2; 1)\quad(\text{Effective }k=2 < 3)!",
            font_size=15, color=WHITE
        ).move_to(pol_panel)

        r_panel = RoundedRectangle(width=5.8, height=3.35, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.50)
        s1 = RoundedRectangle(width=1.4, height=0.55, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.25).move_to(RIGHT * 1.4 + UP * 0.45)
        s2 = RoundedRectangle(width=1.4, height=0.55, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.25).move_to(RIGHT * 1.4 + DOWN * 0.35)
        s3 = RoundedRectangle(width=1.4, height=0.55, corner_radius=0.08, color=TEAL_BRIGHT, fill_opacity=0.25).move_to(RIGHT * 1.4 + DOWN * 1.15)
        ts1 = MathTex(r"x_1", font_size=18).move_to(s1)
        ts2 = MathTex(r"x_1", font_size=18).move_to(s2)
        ts3 = MathTex(r"x_2", font_size=18).move_to(s3)

        red_box = RoundedRectangle(width=2.3, height=1.2, corner_radius=0.10, color=HOLO_GOLD, fill_opacity=0.22).move_to(RIGHT * 4.4 + DOWN * 0.35)
        t_red = MathTex(r"F_{\text{red}}(x_1, x_2)\\= x_1^2 x_2\\(k=2 < 3)", font_size=16, color=HOLO_GOLD).move_to(red_box)
        arrs = VGroup(
            Arrow(s1.get_right(), red_box.get_left() + UP * 0.25, color=HOLO_GOLD, buff=0.05),
            Arrow(s2.get_right(), red_box.get_left(), color=HOLO_GOLD, buff=0.05),
            Arrow(s3.get_right(), red_box.get_left() + DOWN * 0.25, color=TEAL_BRIGHT, buff=0.05),
        )

        self.play(
            Create(pol_panel), Write(pol_tex),
            Create(r_panel), FadeIn(s1, ts1, s2, ts2, s3, ts3),
            Create(arrs), Create(red_box), Write(t_red),
            run_time=1.8
        )
        self.wait(0.7)


# =============================================================================
# SCENE 10: Ch8_Act10_Corporate_15_to_3_Collapse
# =============================================================================
class Ch8_Act10_Corporate_15_to_3_Collapse(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act X (Sec. 8.3.3): Algebraic 15-to-3 Corporate Class Collapse (Thm 8.9)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        top_eq = MathTex(
            r"\left\{\begin{smallmatrix} K_s & C_s \\ K_m & C_m \end{smallmatrix}\right\}: \quad "
            r"2^4 - 1 = 15 \;\xrightarrow{\;\text{Ring Eval over }\mathbb{K}\;}\; "
            r"2^2 - 1 = \mathbf{3}\;\text{Synchronized Classes}\;\;(\text{Thm 8.9})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, top_eq)
        self.play(FadeIn(hdr), Write(top_eq), run_time=1.1)

        l_panel = RoundedRectangle(width=5.7, height=3.35, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.45)
        l_tex = MathTex(
            r"\mathbf{Why\;12\;Classes\;Collapse\;(Thm\;8.9):}\\[5pt]"
            r"\bullet\;\text{Every }f\in\mathcal{O}_{\text{quant}}\text{ is evaluated directly on }R_n\\"
            r"\;\;\text{coordinates via ring operations of }\mathbb{K}.\\[5pt]"
            r"\bullet\;\text{Shared coordinates }\lambda > 0\text{ in }R_{m_a}\boxplus_\phi R_{m_b}\\"
            r"\;\;\text{force functional coupling }K_s\iff K_m.\\[5pt]"
            r"\bullet\;\text{Uncoupled coordinates force parallel }C_s\iff C_m!",
            font_size=15, color=WHITE
        ).move_to(l_panel)

        c3_panel = RoundedRectangle(width=5.8, height=3.35, corner_radius=0.14, color=HOLO_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.45)
        grid_15 = VGroup(*[
            Dot(
                RIGHT * (1.50 + (idx % 5) * 0.8) + UP * (0.35 - (idx // 5) * 0.65),
                color=HOLO_GOLD if idx in (4, 9, 14) else CRIMSON_RED, radius=0.085
            )
            for idx in range(15)
        ])

        m_card1 = RoundedRectangle(width=5.1, height=0.62, corner_radius=0.08, color=ORANGE_GOLD, fill_opacity=0.24).move_to(RIGHT * 3.1 + UP * 0.30)
        m_card2 = RoundedRectangle(width=5.1, height=0.62, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.24).move_to(RIGHT * 3.1 + DOWN * 0.45)
        m_card3 = RoundedRectangle(width=5.1, height=0.62, corner_radius=0.08, color=HOLO_GOLD, fill_opacity=0.24).move_to(RIGHT * 3.1 + DOWN * 1.20)
        mt1 = MathTex(r"1.\;\mathbf{Kor}_{\{K\}}:\;\text{Pure Coupled Interaction }\{K_m, K_s\}", font_size=16, color=ORANGE_GOLD).move_to(m_card1)
        mt2 = MathTex(r"2.\;\mathbf{Kor}_{\{C\}}:\;\text{Pure Parallel Composition }\{C_m, C_s\}", font_size=16, color=ROYAL_BLUE).move_to(m_card2)
        mt3 = MathTex(r"3.\;\mathbf{Kor}_{\{K,C\}}:\;\text{Partial Coupling + Composition}", font_size=16, color=HOLO_GOLD).move_to(m_card3)
        modes_3 = VGroup(m_card1, mt1, m_card2, mt2, m_card3, mt3)

        lean_foot = MathTex(
            r"\text{Lean 4 (\texttt{quant\_corporate\_classes\_card}): }\; "
            r"\texttt{Fintype.card (Finset QuantMode) - 1 = 3}",
            font_size=16, color=TEAL_BRIGHT
        ).to_edge(DOWN, buff=0.20)

        self.play(Create(l_panel), Write(l_tex), Create(c3_panel), FadeIn(grid_15, lag_ratio=0.04), Write(lean_foot), run_time=1.6)
        self.play(ReplacementTransform(grid_15, modes_3), run_time=1.4, rate_func=rate_functions.ease_in_out_sine)
        self.wait(0.6)


# =============================================================================
# SCENE 11: Ch8_Act11_Reconstruction_Map_Sanity
# =============================================================================
class Ch8_Act11_Reconstruction_Map_Sanity(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act XI (Secs. 8.4-8.5): Reconstruction Map R, Sanity Checks & Explication 8.1",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        top_eq = MathTex(
            r"\mathcal{R}: \mathsf{HeimVocabulary} \rightsquigarrow \mathsf{MathematicalStructures}, \qquad "
            r"\tilde{\mathrm{d}}|(fg) = f\,\tilde{\mathrm{d}}|g + g\,\tilde{\mathrm{d}}|f, \qquad "
            r"\widehat{\otimes}_\pi = \widehat{\otimes}_\varepsilon",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, top_eq)
        self.play(FadeIn(hdr), Write(top_eq), run_time=1.1)

        l_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        l_tex = MathTex(
            r"\mathbf{Three\;Sanity\;Checks\;(Sec.\;8.5):}\\[5pt]"
            r"1.\;\mathbf{Leibniz\;Product\;Derivation:}\\"
            r"\;\;\tilde{\mathrm{d}}|(f\cdot g) = f\cdot(\tilde{\mathrm{d}}|g) + g\cdot(\tilde{\mathrm{d}}|f)\;\text{on }\mathcal{M}_n.\\[5pt]"
            r"2.\;\mathbf{Ring\;Element\;Invariance:}\\"
            r"\;\;f\cdot 0_{\mathcal{A}}=0_{\mathcal{A}},\quad f\cdot 1_{\mathcal{A}}=f,\quad f+0_{\mathcal{A}}=f.\\[5pt]"
            r"3.\;\mathbf{Nuclear\;Completion\;Uniqueness:}\\"
            r"\;\;\widehat{\otimes}_\pi = \widehat{\otimes}_\varepsilon\implies\text{Frame-invariant channels!}",
            font_size=15, color=WHITE
        ).move_to(l_box)

        r_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=HOLO_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        r_tex = MathTex(
            r"\mathbf{Carnapian\;Explication\;8.1:}\\[5pt]"
            r"\bullet\;\mathbf{Explicandum\;(D):}\;\text{SM Eq. 29--36, Separation,}\\"
            r"\;\;\text{Fehlstelle 0, Einheit E, }15\to 3\text{ Collapse.}\\[5pt]"
            r"\bullet\;\mathbf{Explicatum\;(A/B):}\;\mathbf{Man}_{\text{param}},\;\mathcal{E}^{(n)},\;\mathcal{S}(\mathcal{M}_m)\cong\widehat{\bigotimes}_\pi,\\"
            r"\;\;\text{Poincare }\mathrm{I}_{\mathbf{0}},\;\operatorname{Pol},\text{ and }\operatorname{Op}_{\text{quant}}\text{ (3 modes).}\\[5pt]"
            r"\bullet\;\mathbf{Fruitfulness:}\;\text{Unifies Topos Logic \& Nuclear Analysis!}",
            font_size=15, color=HOLO_GOLD
        ).move_to(r_box)

        self.play(Create(l_box), Write(l_tex), Create(r_box), Write(r_tex), run_time=1.8)
        self.wait(0.8)


# =============================================================================
# SCENE 12: Ch8_Act12_Chapter8_Synthesis_Bridge_Ch9
# =============================================================================
class Ch8_Act12_Chapter8_Synthesis_Bridge_Ch9(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act XII (Sec. 8.6): Chapter 8 Synthesis & Bridge to Chapter 9 (Strukturkaskaden)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr)
        self.play(FadeIn(hdr), run_time=0.7)

        s8_nodes = VGroup()
        s8_specs = [
            (r"\mathbf{1.\;Parameter\;Manifold}\\\mathcal{M}_n=(\mathbb{R}_{\ge 0})^n\;(\text{SM-29})", ROYAL_BLUE, LEFT * 4.3 + UP * 1.35),
            (r"\mathbf{2.\;Nuclear\;Separation}\\\mathcal{S}(\prod\mathcal{M}_1^{(i)})\cong\widehat{\bigotimes}_\pi\mathcal{S}(\mathcal{M}_1^{(i)})", TEAL_BRIGHT, ORIGIN + UP * 1.35),
            (r"\mathbf{3.\;Polarization}\\\operatorname{Sym}^m(V)\twoheadrightarrow\mathcal{O}_{\text{quant}}(k;1)", ORANGE_GOLD, RIGHT * 4.3 + UP * 1.35),
            (r"\mathbf{4.\;Calculus\;Functors}\\\tilde{\mathrm{d}}|,\;\mathrm{I}_{\mathbf{0}}\;(\text{SM-30..35a})", PURPLE_SYN, LEFT * 4.3 + DOWN * 0.25),
            (r"\mathbf{5.\;Corporate\;Collapse}\\15\longrightarrow 3\text{ Modes}", TEAL_BRIGHT, ORIGIN + DOWN * 0.25),
            (r"\mathbf{6.\;Metric\;Foundation}\\36\text{-Comp Hermetry }{}^2\bar{\mathbf{g}}", HOLO_GOLD, RIGHT * 4.3 + DOWN * 0.25),
        ]
        for t_s, c_s, p_s in s8_specs:
            bx = RoundedRectangle(width=3.55, height=0.95, corner_radius=0.1, color=c_s, fill_opacity=0.20).move_to(p_s)
            tx = MathTex(t_s, font_size=15, color=WHITE).move_to(bx)
            s8_nodes.add(VGroup(bx, tx))

        s8_edges = VGroup(
            Arrow(s8_nodes[0].get_right(), s8_nodes[1].get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s8_nodes[1].get_right(), s8_nodes[2].get_left(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s8_nodes[0].get_bottom(), s8_nodes[3].get_top(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s8_nodes[1].get_bottom(), s8_nodes[4].get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s8_nodes[2].get_bottom(), s8_nodes[5].get_top(), color=ORANGE_GOLD, buff=0.06, stroke_width=2.5),
            DashedLine(s8_nodes[3].get_right(), s8_nodes[4].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16),
            DashedLine(s8_nodes[4].get_right(), s8_nodes[5].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16),
        )

        fin8_box = RoundedRectangle(width=12.0, height=1.55, corner_radius=0.12, color=HOLO_GOLD, fill_opacity=0.14).to_edge(DOWN, buff=0.20)
        fin8_tex = MathTex(
            r"\bullet\;\mathbf{The\;Geometric\;Obstruction:}\;\text{Separated tensor potentials float in an uncurved coordinate space without affine connection.}\\[4pt]"
            r"\bullet\;\mathbf{Functorial\;Ascent\;to\;Chapter\;9\;(Strukturkaskaden):}\;"
            r"\text{Combine partial metrics }{}^2\mathbf{g}_{(\mu)}\text{ into the 36-Component Non-Hermitian}\\[2pt]"
            r"\;\;\text{Hermetry Matrix }{}^2\bar{\mathbf{g}}\text{ on }R_6\text{ and prove Sobolev fixed-point convergence to the apex metric }{}^2\bar{\mathbf{g}}_\infty!",
            font_size=15, color=HOLO_GOLD
        ).move_to(fin8_box)

        self.play(FadeIn(s8_nodes, lag_ratio=0.08), Create(s8_edges), run_time=1.8)
        self.play(Create(fin8_box), Write(fin8_tex), run_time=1.6)
        self.play(fin8_box.animate.set_stroke(WHITE, width=4), rate_func=rate_functions.there_and_back, run_time=0.9)
        self.wait(1.0)
