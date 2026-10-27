# =============================================================================
# AUTOMATICALLY GENERATED MODULAR SCENES FOR REVEAL.JS PRESENTATION — CHAPTER 10
# =============================================================================

from manim import *
import numpy as np


# =====================================================================
# STANDARDIZED BOOK COLOR PALETTE (MATCHING LATEX PREAMBLE)
# =====================================================================
ROYAL_BLUE = "#4169E1"     # Lattice Manifold M_tau^n / Primal Cochains
TEAL_BRIGHT = "#20B2AA"    # Backward Difference \nabla_i / DEC Coboundary d_tau
ORANGE_GOLD = "#FFA500"    # Shift Operator E_i^{-1} / Inflection Node w
CRIMSON_RED = "#DC143C"    # Continuum Singularity / Leibniz Cross-Term
HOLO_GOLD = "#FFD700"      # Metron \tau / Telescoping Boundary / UV Cutoff
PURPLE_SYN = "#9370DB"     # Dual Complex K^* / Discrete Hodge Star *_tau
SLATE_GREY = "#708090"     # Coordinate Grid & Structural Framing


# =============================================================================
# SCENE 1: Ch10_Act1_Televarianz_Metron
# =============================================================================
class Ch10_Act1_Televarianz_Metron(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=55 * DEGREES, theta=-45 * DEGREES)

        hdr = Text(
            "Act I (Sec. 10.1.1): Televarianzbedingung, Metron tau & Spin Surfaces (SM-63)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"x_i = N_i \alpha_i, \quad \alpha_i := \chi_i \sqrt[p]{\tau}\;\;(\text{SM-63}), \qquad "
            r"\tau = \frac{\sqrt{3}}{4}\ell_P^2, \qquad N_{\mathrm{surfaces}}(p) = 2\binom{p}{2} = p(p-1)\;\;(\text{Thm 10.1})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        axes = ThreeDAxes(
            x_range=[-3, 3, 1], y_range=[-3, 3, 1], z_range=[0, 4, 1],
            x_length=5.5, y_length=5.5, z_length=3.2
        ).shift(DOWN * 0.6)

        tau_tracker = ValueTracker(0.25)
        lattice_dots = VGroup(*[
            Dot3D(point=axes.c2p(nx, ny, 2.6 / (0.4 + nx**2 + ny**2)), radius=0.07, color=TEAL_BRIGHT)
            for nx in range(-2, 3) for ny in range(-2, 3)
        ])
        cell_cube = Cube(side_length=1.1, fill_opacity=0.22, fill_color=ROYAL_BLUE, stroke_color=HOLO_GOLD, stroke_width=2.5)
        cell_cube.move_to(axes.c2p(0, 0, 1.5))

        spin_arrows = VGroup(
            CurvedArrow(LEFT * 0.4, RIGHT * 0.4, radius=0.45, color=ORANGE_GOLD).move_to(cell_cube.get_top()),
            CurvedArrow(RIGHT * 0.4, LEFT * 0.4, radius=-0.45, color=CRIMSON_RED).move_to(cell_cube.get_bottom()),
        )

        foot = MathTex(
            r"\text{Resolution Limit } r_{\min} \ge \sqrt{\tau} \implies \text{Elimination of } \Delta x \to 0 \text{ UV Singularities!}",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.2)
        self.add_fixed_in_frame_mobjects(foot)

        self.play(Create(axes), FadeIn(lattice_dots), Create(cell_cube), Create(spin_arrows), Write(foot), run_time=1.8)
        self.begin_ambient_camera_rotation(rate=0.25)
        self.play(tau_tracker.animate.set_value(1.0), cell_cube.animate.scale(1.2), run_time=1.8)
        self.stop_ambient_camera_rotation()
        self.wait(0.5)


# =============================================================================
# SCENE 2: Ch10_Act2_Metrondifferential_Curvature
# =============================================================================
class Ch10_Act2_Metrondifferential_Curvature(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act II (Sec. 10.1.2 & Fig. 10.1): Metrondifferential & Discrete Osculating Curvature",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"F\phi(n) \equiv \nabla\phi(n) := \phi(n) - \phi(n-1)\;\;(\text{SM-67}), \qquad "
            r"\nabla^2\phi(w)\cdot\nabla^2\phi(w+1) < 0\;\;(\text{SM-68b})",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        ax = Axes(
            x_range=[0, 12, 1], y_range=[0, 4.5, 1],
            x_length=9.5, y_length=4.0,
            axis_config={"color": SLATE_GREY}
        ).shift(DOWN * 0.45)

        phi_vals = [1.0, 2.2, 3.6, 4.0, 3.4, 2.3, 1.2, 0.6, 0.4, 0.8, 2.0]
        pts = [ax.c2p(i + 1, phi_vals[i]) for i in range(len(phi_vals))]
        poly = VMobject(color=ROYAL_BLUE, stroke_width=3.5).set_points_as_corners(pts)
        dots = VGroup(*[Dot(p, color=TEAL_BRIGHT, radius=0.075) for p in pts])

        conc_circ = DashedVMobject(Circle(radius=0.85, color=TEAL_BRIGHT).move_to(ax.c2p(3.8, 2.6)))
        conc_lbl = MathTex(r"\nabla^2\phi < 0\text{ (Concave)}", font_size=15, color=TEAL_BRIGHT).next_to(conc_circ, UP, buff=0.1)

        conv_circ = DashedVMobject(Circle(radius=0.85, color=CRIMSON_RED).move_to(ax.c2p(8.8, 1.75)))
        conv_lbl = MathTex(r"\nabla^2\phi > 0\text{ (Convex)}", font_size=15, color=CRIMSON_RED).next_to(conv_circ, UP, buff=0.1)

        infl_dot = Dot(pts[5], color=ORANGE_GOLD, radius=0.12)
        infl_lbl = MathTex(r"\text{Inflection Node } w=6", font_size=16, color=ORANGE_GOLD).next_to(infl_dot, RIGHT, buff=0.15)

        idx_tracker = ValueTracker(1.0)
        cursor_dot = always_redraw(lambda: Dot(
            pts[min(10, max(0, int(idx_tracker.get_value()) - 1))], color=HOLO_GOLD, radius=0.11
        ))

        self.play(Create(ax), Create(poly), FadeIn(dots), FadeIn(cursor_dot), run_time=1.5)
        self.play(Create(conc_circ), Write(conc_lbl), Create(conv_circ), Write(conv_lbl), FadeIn(infl_dot), Write(infl_lbl), run_time=1.4)
        self.play(idx_tracker.animate.set_value(11.0), run_time=2.0, rate_func=linear)
        self.wait(0.5)


# =============================================================================
# SCENE 3: Ch10_Act3_Metronintegral_Staircase
# =============================================================================
class Ch10_Act3_Metronintegral_Staircase(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act III (Sec. 10.1.3 & Fig. 10.5): Metronintegral & Telescoping Staircase (SM-67a-71)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\mathcal{S}_{n_1}^{n_2}\phi(n)\,\Delta n = \sum_{j=n_1}^{n_2}\big(\Phi(j)-\Phi(j-1)\big) = \Phi(n_2) - \Phi(n_1-1)\;\;(\text{SM-67a})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        ax = Axes(
            x_range=[0, 6, 1], y_range=[0, 4.0, 1],
            x_length=7.8, y_length=3.8,
            axis_config={"color": SLATE_GREY}
        ).shift(LEFT * 1.1 + DOWN * 0.45)

        heights = [0.5, 1.2, 2.0, 2.6, 3.4]
        bars = VGroup()
        risers = VGroup()
        for j in range(1, 5):
            p_lo = ax.c2p(j, heights[j - 1])
            p_hi = ax.c2p(j, heights[j])
            p_next = ax.c2p(j + 1, heights[j])
            p_base = ax.c2p(j, 0)
            rect = Polygon(p_base, ax.c2p(j + 1, 0), p_next, p_hi, color=ROYAL_BLUE, fill_opacity=0.18, stroke_width=1.8)
            riser = Arrow(p_lo, p_hi, buff=0, color=ORANGE_GOLD, stroke_width=4)
            bars.add(rect)
            risers.add(riser)

        brace_line = DoubleArrow(ax.c2p(5.3, heights[0]), ax.c2p(5.3, heights[4]), buff=0, color=TEAL_BRIGHT, stroke_width=4)
        brace_lbl = MathTex(
            r"\text{Telescoping Sum:}\\"
            r"\Phi(n_2) - \Phi(n_1-1)",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(brace_line, RIGHT, buff=0.2)

        foot = MathTex(
            r"\text{Domain Splitting (SM-69): }\;\mathcal{S}_{n_1}^\gamma\phi + \mathcal{S}_{\gamma+1}^{n_2}\phi = \mathcal{S}_{n_1}^{n_2}\phi",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.2)

        self.play(Create(ax), FadeIn(bars), LaggedStart(*[GrowArrow(r) for r in risers], lag_ratio=0.25), run_time=1.8)
        self.play(GrowArrow(brace_line), Write(brace_lbl), Write(foot), run_time=1.4)
        self.wait(0.6)


# =============================================================================
# SCENE 4: Ch10_Act4_Partial_Euler_Wronskian
# =============================================================================
class Ch10_Act4_Partial_Euler_Wronskian(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act IV (Sec. 10.1.4): Commuting Partial Shifts, Euler Homogeneity & Wronskian (SM-73-82)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"F_k F_l \phi = F_l F_k \phi\;\;(\text{SM-73a}), \qquad "
            r"L\phi(\mathbf{n}) - \nabla_{\mathrm{tot}}\phi(\mathbf{n}) = \sum_{i=1}^L \phi(\mathbf{n}-\mathbf{e}_i)\;\;(\text{SM-74a})",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        left_box = RoundedRectangle(width=5.6, height=3.5, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.45)
        left_tex = MathTex(
            r"\mathbf{Discrete\;Euler\;\&\;Transcendentals:}\\[6pt]"
            r"\bullet\;\pm\sum_{i=1}^L n_i\nabla_i\phi = (-1)^{h+1}\phi\sum_{\gamma=0}^{h-1}\binom{h}{\gamma}(\mp 1)^\gamma\;\;(\text{SM-77})\\[5pt]"
            r"\bullet\;\phi\,\nabla_\phi\ln\phi = \nabla\phi, \quad \nabla_\phi e^\phi = e^\phi\nabla\phi\;\;(\text{SM-81})\\[5pt]"
            r"\bullet\;e^{\mathrm{i}\phi} = \cos\phi + \mathrm{i}\sin\phi\;\;(\text{SM-81a})\\[5pt]"
            r"\bullet\;D_u\arctan u = \frac{1 + u\nabla\phi}{1 + u^2}",
            font_size=15, color=WHITE
        ).move_to(left_box)

        right_box = RoundedRectangle(width=5.8, height=3.5, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.45)
        right_tex = MathTex(
            r"\mathbf{Theorem\;10.2\;(Discrete\;Wronskian,\;SM\text{-}82):}\\[6pt]"
            r"Cy(\mathbf{n}) := \sum_{\gamma=0}^N p_\gamma(\mathbf{n})\nabla^\gamma y(\mathbf{n}) = Q(\mathbf{n})\\[6pt]"
            r"D(\mathbf{n}) := \det\!\begin{bmatrix}"
            r"y_1(\mathbf{n}) & \cdots & y_N(\mathbf{n}) \\"
            r"\nabla y_1(\mathbf{n}) & \cdots & \nabla y_N(\mathbf{n}) \\"
            r"\vdots & \ddots & \vdots \\"
            r"\nabla^{N-1}y_1(\mathbf{n}) & \cdots & \nabla^{N-1}y_N(\mathbf{n})"
            r"\end{bmatrix} \neq 0",
            font_size=15, color=HOLO_GOLD
        ).move_to(right_box)

        foot = MathTex(
            r"\text{Non-vanishing Wronskian } D(\mathbf{n}) \neq 0 \text{ certifies linear independence of } N \text{ fundamental lattice modes!}",
            font_size=17, color=TEAL_BRIGHT
        ).to_edge(DOWN, buff=0.2)

        self.play(Create(left_box), Write(left_tex), Create(right_box), Write(right_tex), Write(foot), run_time=1.9)
        self.wait(0.7)


# =============================================================================
# SCENE 5: Ch10_Act5_Lattice_Module_Stencil
# =============================================================================
class Ch10_Act5_Lattice_Module_Stencil(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act V (Sec. 10.2 & Fig. 10.2): Metronic Lattice Manifold M_tau^n & Backward Stencil",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\mathbb{M}_\tau^n := \bigoplus_{i=1}^n \sqrt{\tau}\,\mathbb{Z}, \qquad "
            r"\nabla_i := I - E_i^{-1} \in \mathcal{B}(\ell^\infty(\mathbb{M}_\tau^n)), \qquad \|\nabla_i\|_{\mathrm{op}} \le 2\;\;(\text{Def 10.4})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        grid_group = VGroup()
        for ix in range(-2, 3):
            for iy in range(-1, 3):
                pt = LEFT * 2.5 + RIGHT * (ix * 1.1) + UP * (iy * 1.0 - 0.5)
                grid_group.add(Dot(pt, radius=0.055, color=SLATE_GREY))

        c_pt = LEFT * 2.5 + RIGHT * 1.1 + UP * 0.5
        l_pt = LEFT * 2.5 + UP * 0.5
        d_pt = LEFT * 2.5 + RIGHT * 1.1 + DOWN * 0.5

        cell_sq = Square(side_length=1.05, color=ROYAL_BLUE, fill_opacity=0.22).move_to((c_pt + l_pt + d_pt + (LEFT * 2.5 + DOWN * 0.5)) / 4.0)
        cell_lbl = MathTex(r"\tau", font_size=22, color=HOLO_GOLD).move_to(cell_sq)

        arr1 = Arrow(l_pt, c_pt, buff=0.1, color=TEAL_BRIGHT, stroke_width=4.5)
        arr2 = Arrow(d_pt, c_pt, buff=0.1, color=TEAL_BRIGHT, stroke_width=4.5)
        lbl1 = MathTex(r"\nabla_1 = I - E_1^{-1}", font_size=15, color=TEAL_BRIGHT).next_to(arr1, UP, buff=0.06)
        lbl2 = MathTex(r"\nabla_2 = I - E_2^{-1}", font_size=15, color=TEAL_BRIGHT).next_to(arr2, RIGHT, buff=0.06)

        nodes = VGroup(
            Dot(c_pt, radius=0.11, color=HOLO_GOLD),
            Dot(l_pt, radius=0.095, color=ORANGE_GOLD),
            Dot(d_pt, radius=0.095, color=ORANGE_GOLD),
        )

        info_box = RoundedRectangle(width=5.4, height=3.2, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.15 + DOWN * 0.4)
        info_tex = MathTex(
            r"\mathbf{Scholium\;10.3\;\&\;Def.\;10.4:}\\[6pt]"
            r"1.\;\mathbf{Causal\;Stencil:}\;\nabla_i\phi(\mathbf{n}) = \phi(\mathbf{n}) - \phi(\mathbf{n}-e_i)\\[5pt]"
            r"2.\;\mathbf{Exact\;Inverse:}\;\nabla_i \circ \mathcal{S}_i = \operatorname{id}_{\ell^\infty(\mathbb{M}_\tau^n)}\\[5pt]"
            r"3.\;\mathbf{Continuum\;Limit:}\;\lim_{\tau\to 0^+}\frac{\nabla_i\phi}{\tau_i} = \frac{\partial f}{\partial x_i}",
            font_size=15, color=WHITE
        ).move_to(info_box)

        self.play(FadeIn(grid_group), Create(cell_sq), Write(cell_lbl), FadeIn(nodes), run_time=1.3)
        self.play(GrowArrow(arr1), Write(lbl1), GrowArrow(arr2), Write(lbl2), Create(info_box), Write(info_tex), run_time=1.6)
        self.wait(0.6)


# =============================================================================
# SCENE 6: Ch10_Act6_DEC_Hodge_Duality
# =============================================================================
class Ch10_Act6_DEC_Hodge_Duality(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=60 * DEGREES, theta=-40 * DEGREES)

        hdr = Text(
            "Act VI (Sec. 10.2 & Fig. 10.3): 3D DEC Cubical Complex K, Voronoi Dual K* & Hodge Star *_tau",
            font_size=19, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"d_K \circ d_K \equiv 0, \qquad \delta_\tau \circ \delta_\tau \equiv 0, \qquad "
            r"*_{K^*}\circ *_K = (-1)^{k(n-k)+s}\operatorname{id}, \qquad \Delta_\tau = \delta_\tau d_\tau \ge 0\;\;(\text{Defs 10.5--10.6})",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        primal_cube = Cube(side_length=2.1, fill_opacity=0.14, fill_color=ROYAL_BLUE, stroke_color=ROYAL_BLUE, stroke_width=2.5).shift(DOWN * 0.4)
        dual_center = Dot3D(point=primal_cube.get_center(), radius=0.11, color=CRIMSON_RED)
        dual_edges = VGroup(
            DashedLine(primal_cube.get_center(), primal_cube.get_center() + RIGHT * 1.8, color=PURPLE_SYN, stroke_width=3.5),
            DashedLine(primal_cube.get_center(), primal_cube.get_center() + UP * 1.8, color=PURPLE_SYN, stroke_width=3.5),
            DashedLine(primal_cube.get_center(), primal_cube.get_center() + OUT * 1.8, color=PURPLE_SYN, stroke_width=3.5),
        )
        plaquette_loop = Circle(radius=0.55, color=ORANGE_GOLD, stroke_width=4).move_to(primal_cube.get_center() + OUT * 1.05)

        foot = MathTex(
            r"\text{Lean 4 Verified (Appendix C): }\;\texttt{dec\_coboundary\_nilpotent : d1 (d0 f) = 0}",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.2)
        self.add_fixed_in_frame_mobjects(foot)

        self.play(Create(primal_cube), FadeIn(dual_center), Create(dual_edges), Create(plaquette_loop), Write(foot), run_time=1.8)
        self.begin_ambient_camera_rotation(rate=0.3)
        self.wait(2.0)
        self.stop_ambient_camera_rotation()


# =============================================================================
# SCENE 7: Ch10_Act7_Binomial_Monomials_Honeycomb
# =============================================================================
class Ch10_Act7_Binomial_Monomials_Honeycomb(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act VII (Sec. 10.3 & Fig. 10.4): Binomial Stencil, Power Monomials & Honeycomb Vortex",
            font_size=19, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\nabla^k n^\gamma = \sum_{\ell=0}^k (-1)^\ell\binom{k}{\ell}(n-\ell)^\gamma = "
            r"\begin{cases}\text{deg }\gamma-k & (k<\gamma)\\ \gamma! & (k=\gamma)\\ 0 & (k>\gamma)\end{cases}\;\;(\text{Thms 10.7--10.8})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        hex_group = VGroup()
        for row in range(-1, 2):
            for col in range(-1, 2):
                hx = LEFT * 3.2 + RIGHT * (col * 1.25) + UP * (row * 1.08 + (col % 2) * 0.54 - 0.5)
                h_poly = RegularPolygon(n=6, radius=0.68, color=SLATE_GREY, stroke_width=1.8).move_to(hx)
                hex_group.add(h_poly)

        tri = Polygon(LEFT * 3.2 + DOWN * 0.5, LEFT * 2.0 + DOWN * 0.5, LEFT * 2.6 + UP * 0.45, color=TEAL_BRIGHT, fill_opacity=0.32, stroke_width=3)
        vortex = CurvedArrow(LEFT * 2.85 + DOWN * 0.25, LEFT * 2.35 + DOWN * 0.25, radius=0.35, color=ORANGE_GOLD, stroke_width=4)
        s_lbl = MathTex(r"\hat{s} = \operatorname{ROT}_N\widehat{\Phi}", font_size=16, color=ORANGE_GOLD).next_to(tri, DOWN, buff=0.15)

        right_card = RoundedRectangle(width=5.8, height=3.3, corner_radius=0.14, color=HOLO_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.45)
        right_tex = MathTex(
            r"\mathbf{Stirling\;\&\;Newton\;Interpolation:}\\[6pt]"
            r"\nabla^k n^\gamma = \sum_{j=k}^\gamma \left\{\begin{matrix}\gamma\\j\end{matrix}\right\} j^{\underline{k}}(n-k)^{\underline{j-k}}\\[6pt]"
            r"f(n) = \sum_{k=0}^n \binom{n}{k}(\nabla^k f)(k)\quad(n \ge 0)\\[6pt]"
            r"\tau := \frac{\sqrt{3}}{4}\ell_P^2 \approx 1.131\times 10^{-70}\,\mathrm{m}^2",
            font_size=15, color=WHITE
        ).move_to(right_card)

        self.play(Create(hex_group), Create(tri), Create(vortex), Write(s_lbl), Create(right_card), Write(right_tex), run_time=1.9)
        self.wait(0.7)


# =============================================================================
# SCENE 8: Ch10_Act8_Leibniz_Product_Quotient
# =============================================================================
class Ch10_Act8_Leibniz_Product_Quotient(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act VIII (Sec. 10.3): Discrete Leibniz Product Cross-Term & Non-Commutative Quotient Rule",
            font_size=19, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\nabla_i(uv) = (\nabla_i u)v + u(\nabla_i v) - (\nabla_i u)(\nabla_i v)\;\;(\text{SM-68a, Thm 10.12})",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        base_rect = Rectangle(width=2.6, height=1.8, color=ROYAL_BLUE, fill_opacity=0.22).move_to(LEFT * 3.6 + DOWN * 0.8)
        top_strip = Rectangle(width=2.6, height=0.75, color=TEAL_BRIGHT, fill_opacity=0.35).next_to(base_rect, UP, buff=0)
        right_strip = Rectangle(width=0.95, height=1.8, color=ORANGE_GOLD, fill_opacity=0.35).next_to(base_rect, RIGHT, buff=0)
        corner_sq = Rectangle(width=0.95, height=0.75, color=CRIMSON_RED, fill_opacity=0.55).next_to(top_strip, RIGHT, buff=0)

        lbl_base = MathTex(r"u(n-1)v(n-1)", font_size=14, color=WHITE).move_to(base_rect)
        lbl_top = MathTex(r"u(\nabla v)", font_size=14, color=TEAL_BRIGHT).move_to(top_strip)
        lbl_right = MathTex(r"(\nabla u)v", font_size=14, color=ORANGE_GOLD).move_to(right_strip)
        lbl_corner = MathTex(r"-(\nabla u)(\nabla v)", font_size=13, color=HOLO_GOLD).move_to(corner_sq)

        quot_box = RoundedRectangle(width=5.8, height=3.2, corner_radius=0.14, color=CRIMSON_RED, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.45)
        quot_tex = MathTex(
            r"\mathbf{Non\text{-}Commutative\;Quotient\;\&\;Pseudochain:}\\[6pt]"
            r"\nabla_i(uv^{-1}) = (\nabla_i u)v^{-1} - (E_i^{-1}u)v^{-1}(\nabla_i v)(E_i^{-1}v)^{-1}\\[6pt]"
            r"\nabla\Phi = \sum_{k=1}^\Lambda \Phi_{(\psi_k)}\nabla\psi_k, \quad \Phi_{(\psi_k)} := \frac{\nabla_{(\psi_k)}\Phi}{\nabla\psi_k}\;\;(\text{SM-75})\\[6pt]"
            r"\text{Cross-term scales as }\mathcal{O}(\tau^2)\to 0\text{ in continuum limit!}",
            font_size=15, color=WHITE
        ).move_to(quot_box)

        self.play(Create(base_rect), Write(lbl_base), Create(top_strip), Write(lbl_top), Create(right_strip), Write(lbl_right), run_time=1.5)
        self.play(Create(corner_sq), Write(lbl_corner), Create(quot_box), Write(quot_tex), run_time=1.5)
        self.wait(0.6)


# =============================================================================
# SCENE 9: Ch10_Act9_Fundamental_Theorem_Continuum
# =============================================================================
class Ch10_Act9_Fundamental_Theorem_Continuum(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act IX (Sec. 10.3): Fundamental Theorem of Discrete Calculus & Continuum Limit (Thms 10.14-10.15)",
            font_size=19, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\nabla(\mathcal{S}\phi) = \phi, \qquad "
            r"\left|\frac{\nabla\phi_\tau(n)}{\tau} - f'(x)\right| \le \frac{\tau}{2}\|f''\|_\infty \xrightarrow{\tau\to 0^+} 0\;\;(\text{Thm 10.15})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        ax = Axes(
            x_range=[0, 4, 1], y_range=[0, 3.5, 1],
            x_length=6.8, y_length=3.6,
            axis_config={"color": SLATE_GREY}
        ).shift(LEFT * 2.2 + DOWN * 0.5)

        smooth_curve = ax.plot(lambda x: 0.4 + 0.35 * x * x, x_range=[0, 3.6], color=TEAL_BRIGHT, stroke_width=3.5)
        secant_line = Line(ax.c2p(1.2, 0.4 + 0.35 * 1.44), ax.c2p(2.6, 0.4 + 0.35 * 6.76), color=ORANGE_GOLD, stroke_width=3.5)
        tangent_line = Line(ax.c2p(1.8, 0.4 + 0.35 * 6.76 - 2.6 * 0.7 * 0.8), ax.c2p(3.2, 0.4 + 0.35 * 6.76 + 2.6 * 0.7 * 0.6), color=HOLO_GOLD, stroke_width=3.5)

        right_card = RoundedRectangle(width=4.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.5 + DOWN * 0.45)
        right_tex = MathTex(
            r"\mathbf{Worked\;Example\;(\phi(n)=n^2):}\\[6pt]"
            r"\nabla(n^2) = n^2 - (n-1)^2 = 2n - 1\\[6pt]"
            r"\mathcal{S}_1^N(2n-1) = N^2 = \Phi(N)-\Phi(0)\\[6pt]"
            r"\lim_{\tau\to 0^+}\tau\sum_{j=n_1}^{n_2}\phi_\tau(j) = \int_a^b f(x)\,dx",
            font_size=15, color=WHITE
        ).move_to(right_card)

        self.play(Create(ax), Create(smooth_curve), Create(secant_line), Create(right_card), Write(right_tex), run_time=1.6)
        self.play(Transform(secant_line, tangent_line), run_time=1.5)
        self.wait(0.6)


# =============================================================================
# SCENE 10: Ch10_Act10_Vector_Calculus_Gauss_Stokes
# =============================================================================
class Ch10_Act10_Vector_Calculus_Gauss_Stokes(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=60 * DEGREES, theta=-35 * DEGREES)

        hdr = Text(
            "Act X (Sec. 10.3 & Fig. 10.6): Discrete Vector Calculus & Gauss Divergence Flux (SM-79b-80)",
            font_size=19, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\sum_{\mathbf{n}\in\Omega}(\operatorname{DIV}_n\mathbf{A})(\mathbf{n}) = "
            r"\sum_{i=1}^n \frac{1}{\tau_i}\left(\sum_{n_i=b_i} A_i(\mathbf{n}) - \sum_{n_i=a_i-1} A_i(\mathbf{n})\right)\;\;(\text{SM-80, Thm 10.17})",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        box_vol = Prism(dimensions=[3.2, 2.2, 1.8], fill_opacity=0.15, fill_color=ROYAL_BLUE, stroke_color=ROYAL_BLUE, stroke_width=2.5).shift(DOWN * 0.4)
        out_arrows = VGroup(
            Arrow3D(start=np.array([1.6, 0, -0.4]), end=np.array([2.8, 0, -0.4]), color=TEAL_BRIGHT),
            Arrow3D(start=np.array([-1.6, 0, -0.4]), end=np.array([-2.8, 0, -0.4]), color=ORANGE_GOLD),
            Arrow3D(start=np.array([0, 1.1, -0.4]), end=np.array([0, 2.2, -0.4]), color=TEAL_BRIGHT),
            Arrow3D(start=np.array([0, 0, 0.5]), end=np.array([0, 0, 1.6]), color=HOLO_GOLD),
        )

        foot = MathTex(
            r"\text{Exact DEC Null Identities (SM-79c): }\;\operatorname{ROT}_n\operatorname{GRAD}_n\phi \equiv \mathbf{0}, \quad \operatorname{DIV}_n\operatorname{ROT}_n\mathbf{A} \equiv 0",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.2)
        self.add_fixed_in_frame_mobjects(foot)

        self.play(Create(box_vol), FadeIn(out_arrows), Write(foot), run_time=1.8)
        self.begin_ambient_camera_rotation(rate=0.28)
        self.wait(1.9)
        self.stop_ambient_camera_rotation()


# =============================================================================
# SCENE 11: Ch10_Act11_FEEC_Whitney_Dispersion
# =============================================================================
class Ch10_Act11_FEEC_Whitney_Dispersion(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act XI (Sec. 10.3): Cubical FEEC, Whitney-de Rham Isomorphism & Brillouin UV Cutoff",
            font_size=19, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"H^k(\Omega_d^\bullet(K), d_\tau) \cong H_{\mathrm{dR}}^k(|\Omega|)\;\;(\text{Thm 10.19}), \qquad "
            r"\lambda(\mathbf{k}) = \sum_{i=1}^n \frac{4}{\tau_i^2}\sin^2\!\left(\frac{k_i\tau_i}{2}\right), \quad \Lambda_{\mathrm{UV}} = \frac{4}{\sqrt{\tau}}\;\;(\text{Thm 10.21})",
            font_size=16, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        ax = Axes(
            x_range=[-3.14, 3.14, 1.57], y_range=[0, 4.5, 1],
            x_length=6.2, y_length=3.4,
            axis_config={"color": SLATE_GREY}
        ).shift(LEFT * 2.6 + DOWN * 0.5)

        disp_curve = ax.plot(lambda k: 4.0 * (np.sin(k / 2.0) ** 2), x_range=[-3.14, 3.14], color=TEAL_BRIGHT, stroke_width=3.8)
        cont_curve = DashedVMobject(ax.plot(lambda k: min(4.3, k * k), x_range=[-2.05, 2.05], color=CRIMSON_RED, stroke_width=2.5))

        feec_box = RoundedRectangle(width=5.4, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.08).move_to(RIGHT * 3.2 + DOWN * 0.45)
        feec_tex = MathTex(
            r"\mathbf{FEEC\;\&\;Whitney\text{--}de\;Rham\;(Thms\;10.18\text{--}10.20):}\\[6pt]"
            r"\bullet\;d \circ \Pi_\tau^k = \Pi_\tau^{k+1}\circ d, \;\; \|\Pi_\tau^k\alpha - \alpha\|_{L^2} \le C\tau^s\|\alpha\|_{H^s}\\[5pt]"
            r"\bullet\;d \circ W_\tau = W_\tau \circ d_\tau, \;\; R_\tau \circ W_\tau = \operatorname{id}_{\Omega_d^k}\\[5pt]"
            r"\bullet\;\mathbf{Claim\;Ceiling\;(c_{\mathrm{FEEC}}):}\;\text{Valid }L^2\text{ approximation;}\\"
            r"\;\;\text{does not by itself prove physical spacetime is discrete.}",
            font_size=14, color=WHITE
        ).move_to(feec_box)

        self.play(Create(ax), Create(cont_curve), Create(disp_curve), Create(feec_box), Write(feec_tex), run_time=1.9)
        self.wait(0.7)


# =============================================================================
# SCENE 12: Ch10_Act12_Synthesis_StageVI
# =============================================================================
class Ch10_Act12_Synthesis_StageVI(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text(
            "Act XII (Sec. 10.6 & Fig. 10.7): Chapter 10 Synthesis, Stage VI Polarimeter & Bridge to Ch. 11",
            font_size=19, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\widehat{\Phi}_i(\mathbf{n}) = \int_{\mathbf{n}}^{\mathbf{n}+\mathbf{e}_i} A\;\;(\text{Stage VI Link Integrals}), \qquad "
            r"\mathbb{M}_\tau^n \longrightarrow (\nabla_i, \mathcal{S}) \longrightarrow (\Omega_d^\bullet, d_\tau^2 = 0) \longrightarrow \text{Ch. 11 Selector Matter}",
            font_size=16, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        cards = VGroup()
        specs = [
            (r"\mathbf{1.\;Metronic\;Lattice}\\\mathbb{M}_\tau^n = \bigoplus_i \tau_i\mathbb{Z}", ROYAL_BLUE, LEFT * 4.0 + UP * 0.4),
            (r"\mathbf{2.\;Difference\;Algebra}\\\nabla_i = I - E_i^{-1},\;\nabla\circ\mathcal{S}=\operatorname{id}", TEAL_BRIGHT, ORIGIN + UP * 0.4),
            (r"\mathbf{3.\;DEC\;Cochains}\\\Omega_d^k(\mathbb{M}_\tau^n),\;d_\tau^2 = 0", ORANGE_GOLD, RIGHT * 4.0 + UP * 0.4),
            (r"\mathbf{4.\;Stage\;VI\;Polarimeter}\\\text{Plaquette Flux }d_\tau\widehat{\Phi}", PURPLE_SYN, LEFT * 2.2 + DOWN * 1.35),
            (r"\mathbf{5.\;Ascent\;to\;Chapter\;11}\\\text{Self-Adjoint Selectors on }R_{12}", HOLO_GOLD, RIGHT * 2.2 + DOWN * 1.35),
        ]
        for tx_s, col_s, pos in specs:
            bx = RoundedRectangle(width=3.6, height=1.25, corner_radius=0.12, color=col_s, fill_opacity=0.16).move_to(pos)
            tx = MathTex(tx_s, font_size=15, color=WHITE).move_to(bx)
            cards.add(VGroup(bx, tx))

        arrows = VGroup(
            Arrow(cards[0].get_right(), cards[1].get_left(), buff=0.1, color=TEAL_BRIGHT),
            Arrow(cards[1].get_right(), cards[2].get_left(), buff=0.1, color=ORANGE_GOLD),
            Arrow(cards[1].get_bottom(), cards[3].get_top(), buff=0.1, color=PURPLE_SYN),
            Arrow(cards[2].get_bottom(), cards[4].get_top(), buff=0.1, color=HOLO_GOLD),
        )

        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.15) for c in cards], lag_ratio=0.15), run_time=1.6)
        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.15), run_time=1.2)
        self.wait(0.7)
