# =============================================================================
# CHAPTER 9 MANIM SCENES: STRUKTURKASKADEN (12 MODULAR 3D SCENES)
# =============================================================================

from manim import *
import numpy as np

ROYAL_BLUE = "#4169E1"
TEAL_BRIGHT = "#20B2AA"
ORANGE_GOLD = "#FFA500"
CRIMSON_RED = "#DC143C"
HOLO_GOLD = "#FFD700"
PURPLE_SYN = "#9370DB"
SLATE_GREY = "#708090"


# =============================================================================
# SCENE 1: Ch9_Act1_Cascade_Principle
# =============================================================================
class Ch9_Act1_Cascade_Principle(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text("Act I (Sec. 9.1.1): Strukturkaskade, Partialkomposition & Sieve States (SM-59, SM-60)", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"{}^2\bar{\mathbf{g}}_{(\gamma_\alpha)}^{(\alpha)} = \mathfrak{f}\!\left[\left({}^2\bar{\mathbf{g}}_{(\gamma_{\alpha-1})}^{(\alpha-1)}\right)^{\omega_\alpha}\right]\;(\text{SM-60}),\quad "
            r"Z_+ = 2(3^\omega - 2^\omega + 1) = 40\;(\omega=3)",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        base_nodes = VGroup(*[
            RoundedRectangle(width=1.45, height=0.55, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.18).move_to(LEFT * (3.6 - 1.8 * i) + DOWN * 1.85)
            for i in range(5)
        ])
        base_lbls = VGroup(*[
            MathTex(rf"{{}}^2\bar{{\mathbf{{g}}}}_{{({i+1})}}^{{(1)}}", font_size=16, color=WHITE).move_to(base_nodes[i])
            for i in range(5)
        ])
        mid_nodes = VGroup(*[
            RoundedRectangle(width=1.75, height=0.60, corner_radius=0.08, color=TEAL_BRIGHT, fill_opacity=0.18).move_to(LEFT * (2.4 - 2.4 * j) + DOWN * 0.25)
            for j in range(3)
        ])
        mid_lbls = VGroup(*[
            MathTex(rf"\kappa_\alpha\mathcal{{T}}_\alpha({j+1})", font_size=16, color=TEAL_BRIGHT).move_to(mid_nodes[j])
            for j in range(3)
        ])
        apex_node = RoundedRectangle(width=3.6, height=0.72, corner_radius=0.10, color=HOLO_GOLD, fill_opacity=0.22).move_to(UP * 1.35)
        apex_lbl = MathTex(r"\text{Apex Metric } {}^2\bar{\mathbf{g}}_\infty \;(L_M = 1)", font_size=18, color=HOLO_GOLD).move_to(apex_node)

        edges1 = VGroup(*[
            Line(base_nodes[i].get_top(), mid_nodes[j].get_bottom(), color=ROYAL_BLUE, stroke_width=2.0)
            for j in range(3) for i in range(j, j + 3)
        ])
        edges2 = VGroup(*[
            Arrow(mid_nodes[j].get_top(), apex_node.get_bottom(), buff=0.06, color=TEAL_BRIGHT, stroke_width=2.8)
            for j in range(3)
        ])

        foot = MathTex(r"\text{Analytischer Syllogismus: Hierarchical Synthesis from }L_1=\binom{n}{\omega_1}\text{ to Unique Apex }L_M=1", font_size=17, color=ORANGE_GOLD).to_edge(DOWN, buff=0.22)
        self.play(Create(base_nodes), Write(base_lbls), run_time=1.0)
        self.play(Create(edges1), Create(mid_nodes), Write(mid_lbls), run_time=1.0)
        self.play(Create(edges2), Create(apex_node), Write(apex_lbl), Write(foot), run_time=1.1)
        self.wait(0.8)


# =============================================================================
# SCENE 2: Ch9_Act2_NonHermitian_Exegesis
# =============================================================================
class Ch9_Act2_NonHermitian_Exegesis(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text("Act II (Secs. 9.1.2-9.1.4): Non-Hermitian Hermetrie (SM-37) & Strukturassoziation", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"{}^2\bar{\mathbf{g}} = {}^2\bar{\mathbf{g}}_+ + {}^2\bar{\mathbf{g}}_-\;(\text{SM-37}),\quad "
            r"\dim_{\mathbb{R}}(\operatorname{Mat}_{6\times 6}) = 36 = 21\text{ (Sym)} + 15\text{ (Skew)}",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        box_sym = RoundedRectangle(width=5.4, height=3.1, corner_radius=0.12, color=ROYAL_BLUE, fill_opacity=0.12).move_to(LEFT * 3.1 + DOWN * 0.35)
        tex_sym = MathTex(
            r"\mathbf{Symmetric\;Sector\;{}^2\bar{\mathbf{g}}_+\;(21\;Potentials):}\\[5pt]"
            r"\bullet\;\text{Riemannian spacetime curvature }g_{\mu\nu}\\[4pt]"
            r"\bullet\;\text{Korrelationstensor }\mathbf{f}\;(\text{SM-52})\\[4pt]"
            r"\bullet\;\text{Binär-, Ternär-, Quartärfelder}",
            font_size=16, color=WHITE
        ).move_to(box_sym)

        box_skew = RoundedRectangle(width=5.4, height=3.1, corner_radius=0.12, color=ORANGE_GOLD, fill_opacity=0.12).move_to(RIGHT * 3.1 + DOWN * 0.35)
        tex_skew = MathTex(
            r"\mathbf{Skew\text{-}Symmetric\;Sector\;{}^2\bar{\mathbf{g}}_-\;(15\;Potentials):}\\[5pt]"
            r"\bullet\;\text{Maxwell EM vorticity }F_{\mu\nu}\text{ \& chiral torsion}\\[4pt]"
            r"\bullet\;\text{Koppelungstensor }\mathbf{Q}\;(\text{SM-53})\\[4pt]"
            r"\bullet\;\text{Übergangskriterium }\chi\sqrt{|g_{(p)}|}=1\;(\text{SM-64})",
            font_size=16, color=WHITE
        ).move_to(box_skew)

        bridge = DoubleArrow(box_sym.get_right(), box_skew.get_left(), buff=0.1, color=HOLO_GOLD, stroke_width=3.2)
        foot = MathTex(r"\text{Ontic Structural Realism (French) \& Structural Representation (van Fraassen) on }R_6 = R_4 \times S_2", font_size=17, color=HOLO_GOLD).to_edge(DOWN, buff=0.22)

        self.play(Create(box_sym), Write(tex_sym), Create(box_skew), Write(tex_skew), GrowArrow(bridge), Write(foot), run_time=1.6)
        self.wait(0.8)


# =============================================================================
# SCENE 3: Ch9_Act3_Metric_Bundles_Transport
# =============================================================================
class Ch9_Act3_Metric_Bundles_Transport(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=60 * DEGREES, theta=-45 * DEGREES)

        hdr = Text("Act III (Sec. 9.2.1): Frechet Metric Bundle Met(M) & Mixed-Variant Transport", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\operatorname{Met}(\mathcal{M}) \subset \Gamma(\mathcal{M}, \operatorname{Sym}^2 T^*\mathcal{M} \oplus \Lambda^2 T^*\mathcal{M}),\quad "
            r"\partial_k A_i - \partial_i A_k = A_s\!\left(\begin{Bmatrix}s\\ik\end{Bmatrix} - \begin{Bmatrix}s\\ki\end{Bmatrix}\right)",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        axes = ThreeDAxes(x_range=[-3, 3, 1], y_range=[-3, 3, 1], z_range=[-2, 2, 1], x_length=5.5, y_length=5.5, z_length=3.2)
        surf = Surface(
            lambda u, v: axes.c2p(u, v, 0.45 * np.sin(u) * np.cos(v)),
            u_range=[-2.4, 2.4], v_range=[-2.4, 2.4],
            resolution=(18, 18), fill_opacity=0.55, checkerboard_colors=[ROYAL_BLUE, TEAL_BRIGHT]
        )
        loop_curve = ParametricFunction(
            lambda t: axes.c2p(1.4 * np.cos(t), 1.4 * np.sin(t), 0.45 * np.sin(1.4 * np.cos(t)) * np.cos(1.4 * np.sin(t)) + 0.15),
            t_range=[0, TAU], color=HOLO_GOLD, stroke_width=4
        )
        foot = MathTex(r"\text{Def. 9.3: Smooth }C_b^\infty\text{ Fréchet Bundle }\operatorname{Met}(\mathcal{M})\text{ \& Affine Connection Space }\operatorname{Conn}(\mathcal{M})", font_size=17, color=ORANGE_GOLD).to_edge(DOWN, buff=0.22)
        self.add_fixed_in_frame_mobjects(foot)

        self.play(Create(axes), Create(surf), run_time=1.4)
        self.play(Create(loop_curve), Write(foot), run_time=1.2)
        self.begin_ambient_camera_rotation(rate=0.25)
        self.wait(1.2)
        self.stop_ambient_camera_rotation()


# =============================================================================
# SCENE 4: Ch9_Act4_Hermetry_36_Matrix
# =============================================================================
class Ch9_Act4_Hermetry_36_Matrix(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text("Act IV (Sec. 9.2.2): The 36-Component Hermetry Matrix on R_6 = R_4 x S_2 (Def. 9.5)", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"36 = \underbrace{10\;(g_{\mu\nu}) + 8\;(\text{KK}_+) + 3\;(S_2)}_{21\text{ Symmetric }({}^2\bar{\mathbf{g}}_+)} \;+\; "
            r"\underbrace{6\;(F_{\mu\nu}) + 8\;(\text{Torsion}_-) + 1\;([\partial_5,\partial_6])}_{15\text{ Skew-Symmetric }({}^2\bar{\mathbf{g}}_-)}",
            font_size=16, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        cells = VGroup()
        for r in range(6):
            for c in range(6):
                col = ROYAL_BLUE if (r < 4 and c < 4 and c >= r) else (
                    TEAL_BRIGHT if (r < 4 and c < 4 and c < r) else (
                        ORANGE_GOLD if ((r < 4) != (c < 4) and c >= r) else (
                            CRIMSON_RED if ((r < 4) != (c < 4) and c < r) else (
                                PURPLE_SYN if c >= r else HOLO_GOLD
                            )
                        )
                    )
                )
                sq = Square(side_length=0.52, color=col, fill_opacity=0.35, stroke_width=1.8)
                sq.move_to(LEFT * 4.4 + RIGHT * (c * 0.56) + UP * 0.95 + DOWN * (r * 0.56))
                cells.add(sq)

        legend = MathTex(
            r"\mathbf{6\times 6\;Hermetry\;Switchboard:}\\[4pt]"
            r"\bullet\;R_4\times R_4:\;10\text{ Gravity }g_{\mu\nu} + 6\text{ Maxwell }F_{\mu\nu}\\[4pt]"
            r"\bullet\;R_4\times S_2:\;8\text{ Kaluza--Klein} + 8\text{ Chiral Torsion}\\[4pt]"
            r"\bullet\;S_2\times S_2:\;3\text{ Mesobaric} + 1\text{ Entelechial }[\partial_5,\partial_6]\\[4pt]"
            r"\bullet\;\text{4D Toy Metric: }\det({}^2\bar{\mathbf{g}}) = -(1 + B^2)",
            font_size=16, color=WHITE
        ).move_to(RIGHT * 2.55 + DOWN * 0.45)

        self.play(LaggedStartMap(FadeIn, cells, lag_ratio=0.02), Write(legend), run_time=1.6)
        self.wait(0.8)


# =============================================================================
# SCENE 5: Ch9_Act5_Connection_Decomposition
# =============================================================================
class Ch9_Act5_Connection_Decomposition(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text("Act V (Sec. 9.3.1): Palatini Cross-Metric Connection Decomposition (Thm. 9.6, SM-53)", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\left\{\begin{smallmatrix}i\\kl\end{smallmatrix}\right\} = \sum_{\mu,\gamma=1}^\omega \left(\begin{Bmatrix}i\\kl\end{Bmatrix}_{(\gamma)}^{(\mu)} + \mathbf{Q}_{(\mu\gamma)m}^i \begin{Bmatrix}m\\kl\end{Bmatrix}_{(\gamma)}^{(\mu)}\right),\quad "
            r"\mathbf{Q}_{(\mu\gamma)m}^i := g^{is}g_{(\mu)sm} - \frac{1}{\omega}\delta_m^i",
            font_size=16, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        theta_tr = ValueTracker(0.0)
        ell1 = always_redraw(lambda: Ellipse(width=3.2, height=1.7, color=ROYAL_BLUE, fill_opacity=0.18).rotate(theta_tr.get_value()).move_to(LEFT * 2.8 + DOWN * 0.4))
        ell2 = always_redraw(lambda: Ellipse(width=3.2, height=1.7, color=TEAL_BRIGHT, fill_opacity=0.18).rotate(-theta_tr.get_value()).move_to(LEFT * 2.8 + DOWN * 0.4))
        ref_circ = Circle(radius=1.22, color=HOLO_GOLD, stroke_width=2.0).move_to(LEFT * 2.8 + DOWN * 0.4)

        q_card = RoundedRectangle(width=5.8, height=3.0, corner_radius=0.12, color=ORANGE_GOLD, fill_opacity=0.10).move_to(RIGHT * 2.75 + DOWN * 0.4)
        q_tex = MathTex(
            r"\mathbf{Decoupling\;Criterion\;(Thm.\;9.6):}\\[5pt]"
            r"\mathbf{Q}_{(\mu\gamma)m}^i \equiv 0 \iff g_{(\mu)} = \frac{1}{\omega}g\;\;\forall\mu\in\{1,\dots,\omega\}\\[6pt]"
            r"\bullet\;\text{Homothety-aligned metrics}\implies\text{Zero force}\\[4pt]"
            r"\bullet\;\text{Anisotropic misalignment}\implies\mathbf{Q}_{(\mu\gamma)}\ne\mathbf{0}",
            font_size=16, color=WHITE
        ).move_to(q_card)

        self.play(Create(ref_circ), Create(ell1), Create(ell2), Create(q_card), Write(q_tex), run_time=1.3)
        self.play(theta_tr.animate.set_value(0.65), run_time=1.4, rate_func=rate_functions.there_and_back)
        self.wait(0.6)


# =============================================================================
# SCENE 6: Ch9_Act6_Contortion_Torsion
# =============================================================================
class Ch9_Act6_Contortion_Torsion(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=62 * DEGREES, theta=-50 * DEGREES)

        hdr = Text("Act VI (Sec. 9.3.1b): Contortion Tensor K^i_kl, Chiral Transport & Ricci Curl (SM-51)", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\Gamma_{kl}^i = \left\{\begin{smallmatrix}i\\kl\end{smallmatrix}\right\}_{+} + \mathbf{K}_{kl}^i,\quad "
            r"K_{ikl} = \frac{1}{2}(T_{ikl} + T_{lik} - T_{kli}),\quad "
            r"R^i{}_{klm}(\Gamma) = R^{(+)i}{}_{klm} + 2\nabla^{(+)}_{[l}\mathbf{K}^i{}_{|k|m]} + 2\mathbf{K}^i{}_{s[l}\mathbf{K}^s{}_{|k|m]}",
            font_size=15, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        base_line = Line3D(start=np.array([-3.5, 0, 0]), end=np.array([3.5, 0, 0]), color=ROYAL_BLUE)
        helix = ParametricFunction(
            lambda t: np.array([t, 1.15 * np.cos(1.8 * t), 1.15 * np.sin(1.8 * t)]),
            t_range=[-3.4, 3.4], color=ORANGE_GOLD, stroke_width=4
        )
        spokes = VGroup(*[
            Line(np.array([x, 0, 0]), np.array([x, 1.15 * np.cos(1.8 * x), 1.15 * np.sin(1.8 * x)]), color=TEAL_BRIGHT, stroke_width=2.5)
            for x in np.linspace(-3.2, 3.2, 11)
        ])
        foot = MathTex(r"\text{Lemma 9.7 (SM-51): }\frac{1}{2}\left[\partial_l\!\left(\frac{1}{w}\llcorner_k w\right) - \partial_k\!\left(\frac{1}{w}\llcorner_l w\right)\right]\text{ Volume-Density Curl}", font_size=17, color=HOLO_GOLD).to_edge(DOWN, buff=0.22)
        self.add_fixed_in_frame_mobjects(foot)

        self.play(Create(base_line), Create(helix), Create(spokes), Write(foot), run_time=1.6)
        self.begin_ambient_camera_rotation(rate=0.28)
        self.wait(1.1)
        self.stop_ambient_camera_rotation()


# =============================================================================
# SCENE 7: Ch9_Act7_Palatini_Conservation
# =============================================================================
class Ch9_Act7_Palatini_Conservation(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text("Act VII (Sec. 9.3.1c): Non-Hermitian Palatini Conservation (Thm. 9.8, SM-49) & No-Go Firewall", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\operatorname{sp}\llcorner_{(-)}^{(6,6)}\!\left({}^2\bar{\mathbf{R}} - \frac{1}{2}{}^2\bar{\mathbf{g}}\mathrm{R}\right) = \mathbf{0}\;(\text{SM-49}),\quad "
            r"\nabla_k g_{lm} - T^s_{\;\;km}g_{ls} + \frac{2}{n-1}g_{l[m}T^s_{\;\;k]s} = 0",
            font_size=16, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        act_box = RoundedRectangle(width=7.8, height=0.95, corner_radius=0.10, color=HOLO_GOLD, fill_opacity=0.16).move_to(UP * 1.15)
        act_tex = MathTex(r"S[g,\Gamma] = \int_{\mathcal{M}} d^nx\sqrt{-\det g}\,g^{ik}R_{ik}(\Gamma) + \oint_{\partial\mathcal{M}}\sqrt{|g_\partial|}g^{ik}K_{ik}(\Gamma)", font_size=16, color=HOLO_GOLD).move_to(act_box)

        left_box = RoundedRectangle(width=5.2, height=1.35, corner_radius=0.10, color=TEAL_BRIGHT, fill_opacity=0.14).move_to(LEFT * 3.1 + DOWN * 0.45)
        left_tex = MathTex(r"\frac{\delta S}{\delta g^{ik}} = 0 \implies \operatorname{sp}\llcorner_{(-)}^{(6,6)}\mathbf{G} = \mathbf{0}", font_size=16, color=WHITE).move_to(left_box)

        right_box = RoundedRectangle(width=5.2, height=1.35, corner_radius=0.10, color=ORANGE_GOLD, fill_opacity=0.14).move_to(RIGHT * 3.1 + DOWN * 0.45)
        right_tex = MathTex(r"\frac{\delta S}{\delta\Gamma_{kl}^i} = 0 \implies \text{Fixes }n^3\text{ Connection DOF}", font_size=16, color=WHITE).move_to(right_box)

        fw_box = RoundedRectangle(width=11.4, height=0.95, corner_radius=0.10, color=CRIMSON_RED, fill_opacity=0.14).move_to(DOWN * 2.05)
        fw_tex = MathTex(r"\text{Carnap Scholium 9.1 (Damour--Deser--McCarthy Firewall): }\Gamma_{(-)}^{(6,6)}\text{ Stationary Vorticity Projection on }K_8 = S^2\times\mathbb{T}^6", font_size=15, color=WHITE).move_to(fw_box)

        a1 = Arrow(act_box.get_bottom(), left_box.get_top(), buff=0.06, color=TEAL_BRIGHT)
        a2 = Arrow(act_box.get_bottom(), right_box.get_top(), buff=0.06, color=ORANGE_GOLD)
        self.play(Create(act_box), Write(act_tex), run_time=0.9)
        self.play(GrowArrow(a1), GrowArrow(a2), Create(left_box), Write(left_tex), Create(right_box), Write(right_tex), run_time=1.1)
        self.play(Create(fw_box), Write(fw_tex), run_time=0.9)
        self.wait(0.8)


# =============================================================================
# SCENE 8: Ch9_Act8_Density_Divergence
# =============================================================================
class Ch9_Act8_Density_Divergence(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text("Act VIII (Sec. 9.3.1d): Density Divergence Splitting (SM-46) & (n-2) Theorem (SM-46a)", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"g_{ik}\llcorner_{(+),l}^{(1,2)}\underline{g}^{\underline{ik}} = (n-2)\llcorner_l w\;(\text{SM-46a}),\quad "
            r"\operatorname{sp}\llcorner_{(+)}^{(1)}\underline{\bar{\mathbf{A}}} - \operatorname{sp}\llcorner_{(+)}^{(2)}\underline{\bar{\mathbf{A}}} = 2\underline{A}^{\underline{k}}\begin{Bmatrix}s\\sk\end{Bmatrix}_-\;(\text{SM-46})",
            font_size=16, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        dims = [2, 4, 6, 8, 10, 12]
        bars = VGroup()
        lbls = VGroup()
        for idx, d in enumerate(dims):
            h = max(0.12, (d - 2) * 0.28)
            col = HOLO_GOLD if d == 6 else (TEAL_BRIGHT if d == 4 else ROYAL_BLUE)
            bar = Rectangle(width=0.75, height=h, color=col, fill_opacity=0.65).move_to(LEFT * 3.8 + RIGHT * (idx * 1.5) + DOWN * (1.8 - h / 2))
            lbl = MathTex(rf"n={d}\implies {d-2}\llcorner_l w", font_size=14, color=col).next_to(bar, UP, buff=0.08)
            bars.add(bar)
            lbls.add(lbl)

        foot = MathTex(r"\text{Thm. 9.10 \& 9.11: }n=2\text{ Conformal Vanishing }(0),\;n=4\text{ Spacetime }(2\llcorner_l w),\;n=6\text{ Physical Condensation }(4\llcorner_l w)", font_size=16, color=ORANGE_GOLD).to_edge(DOWN, buff=0.22)
        self.play(LaggedStartMap(GrowFromEdge, bars, edge=DOWN, lag_ratio=0.12), Write(lbls), Write(foot), run_time=1.6)
        self.wait(0.8)


# =============================================================================
# SCENE 9: Ch9_Act9_Sobolev_Apex_Convergence
# =============================================================================
class Ch9_Act9_Sobolev_Apex_Convergence(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=62 * DEGREES, theta=-48 * DEGREES)

        hdr = Text("Act IX (Sec. 9.3.2): DeTurck Parabolic Smoothing & Sobolev H^s Apex Convergence (Thm. 9.14)", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\mathbf{\Phi}_{\text{apex}} := e^{-\tau_M(\Delta_{\bar{g}}+c_0 I)}\circ\mathcal{T},\quad "
            r"\|\mathbf{\Phi}_{\text{apex}}(g_1) - \mathbf{\Phi}_{\text{apex}}(g_2)\|_{H^s} \le k_M\|g_1-g_2\|_{H^s}\;(k_M < 1)",
            font_size=16, color=ROYAL_BLUE
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        funnel = Surface(
            lambda u, v: np.array([u, 1.8 * np.exp(-0.48 * (u + 3.0)) * np.cos(v), 1.8 * np.exp(-0.48 * (u + 3.0)) * np.sin(v)]),
            u_range=[-3.0, 2.5], v_range=[0, TAU],
            resolution=(20, 20), fill_opacity=0.42, checkerboard_colors=[ROYAL_BLUE, TEAL_BRIGHT]
        )
        spiral = ParametricFunction(
            lambda t: np.array([t, 1.8 * np.exp(-0.48 * (t + 3.0)) * np.cos(3.5 * t), 1.8 * np.exp(-0.48 * (t + 3.0)) * np.sin(3.5 * t)]),
            t_range=[-3.0, 2.5], color=HOLO_GOLD, stroke_width=4
        )
        apex_dot = Sphere(radius=0.14, color=CRIMSON_RED).move_to(np.array([2.5, 0, 0]))
        foot = MathTex(r"\text{DeTurck Vector }V^k = g^{pq}(\Gamma_{pq}^k(g)-\Gamma_{pq}^k(\bar{g}))\implies\text{Unique Smooth Apex }{}^2\bar{\mathbf{g}}_\infty \in C^\infty(\mathcal{M})", font_size=16, color=HOLO_GOLD).to_edge(DOWN, buff=0.22)
        self.add_fixed_in_frame_mobjects(foot)

        self.play(Create(funnel), Create(spiral), FadeIn(apex_dot), Write(foot), run_time=1.7)
        self.begin_ambient_camera_rotation(rate=0.25)
        self.wait(1.1)
        self.stop_ambient_camera_rotation()


# =============================================================================
# SCENE 10: Ch9_Act10_Transition_Criterion
# =============================================================================
class Ch9_Act10_Transition_Criterion(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text("Act X (Sec. 9.3.3): Unsatisfiability of Literal SM-61 (Thm. 9.15) & Transition Criterion (SM-64)", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\chi\sqrt{|g_{(p)}|} = 1\;(\text{SM-64}),\quad "
            r"\|\nabla {}^2\bar{\mathbf{g}}\|_{\text{crit}} \ge \frac{1}{\sqrt{\tau}} \implies x_i = N_i\chi_i\sqrt{\tau} \in \mathbb{M}_\tau^n\;(\text{Thm. 9.17})",
            font_size=16, color=CRIMSON_RED
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        wall = DashedLine(UP * 1.45, DOWN * 1.95, color=CRIMSON_RED, stroke_width=3.5)
        wall_lbl = MathTex(r"\text{Metronic Wall }\chi\sqrt{|g_{(p)}|}=1", font_size=16, color=CRIMSON_RED).next_to(wall, UP, buff=0.08)

        smooth_curve = ParametricFunction(
            lambda t: np.array([-5.2 + 5.2 * t, -0.8 + 1.2 * np.sin(PI * t), 0]),
            t_range=[0, 1], color=TEAL_BRIGHT, stroke_width=4
        )
        lattice_dots = VGroup(*[
            Dot(np.array([0.6 + 0.75 * ix, -1.5 + 0.65 * iy, 0]), radius=0.065, color=HOLO_GOLD)
            for ix in range(7) for iy in range(5)
        ])
        step_path = VMobject(color=ORANGE_GOLD, stroke_width=3.5).set_points_as_corners([
            np.array([0.0, -0.8, 0]), np.array([0.6, -0.8, 0]), np.array([0.6, -0.2, 0]),
            np.array([2.1, -0.2, 0]), np.array([2.1, 0.45, 0]), np.array([3.6, 0.45, 0]), np.array([3.6, 1.1, 0]), np.array([5.1, 1.1, 0])
        ])
        foot = MathTex(r"\text{Thm. 9.15 \& Carnap Scholium 9.2: }L_\alpha = \operatorname{rank}(\kappa_\alpha(\operatorname{Sym}^{\omega_\alpha}(F_{\alpha-1}))) \le \binom{L_{\alpha-1}}{\omega_\alpha}", font_size=16, color=TEAL_BRIGHT).to_edge(DOWN, buff=0.22)

        self.play(Create(smooth_curve), Create(wall), Write(wall_lbl), run_time=1.1)
        self.play(FadeIn(lattice_dots), Create(step_path), Write(foot), run_time=1.3)
        self.wait(0.8)


# =============================================================================
# SCENE 11: Ch9_Act11_Reconstruction_Sanity
# =============================================================================
class Ch9_Act11_Reconstruction_Sanity(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text("Act XI (Secs. 9.4-9.5): Reconstruction Map R, Sanity Checks & Explication 9.1", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\mathcal{R}\colon\mathsf{HeimVocabulary}\rightsquigarrow\mathsf{MathematicalStructures},\quad "
            r"{}^2\bar{\mathbf{g}}_- \to 0 \implies \Gamma = \left\{\begin{smallmatrix}i\\kl\end{smallmatrix}\right\}\;\land\;\nabla^\mu G_{\mu\nu} = 0",
            font_size=16, color=TEAL_BRIGHT
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        gr_box = RoundedRectangle(width=5.5, height=2.9, corner_radius=0.12, color=ROYAL_BLUE, fill_opacity=0.14).move_to(LEFT * 3.05 + DOWN * 0.35)
        gr_tex = MathTex(
            r"\mathbf{Sanity\;Check\;1\;(GR\;Limit\;{}^2\bar{\mathbf{g}}_-\to 0):}\\[5pt]"
            r"\bullet\;{}^2\bar{\mathbf{g}} \to {}^2\bar{\mathbf{g}}_+ = g_{\mu\nu}\text{ (Symmetric)}\\[4pt]"
            r"\bullet\;\mathbf{K}_{kl}^i \to 0 \implies \text{Levi-Civita }\Gamma_{kl}^i\\[4pt]"
            r"\bullet\;\text{Recovers classical }\nabla^\mu G_{\mu\nu} = 0",
            font_size=15, color=WHITE
        ).move_to(gr_box)

        exp_box = RoundedRectangle(width=5.5, height=2.9, corner_radius=0.12, color=TEAL_BRIGHT, fill_opacity=0.14).move_to(RIGHT * 3.05 + DOWN * 0.35)
        exp_tex = MathTex(
            r"\mathbf{Carnapian\;Explication\;9.1:}\\[5pt]"
            r"1.\;\mathbf{Explicandum\;(D):}\;\text{SM Eqs. 37, 49, 53, 60, 64}\\[4pt]"
            r"2.\;\mathbf{Explicatum\;(A/B):}\;\operatorname{Met}(\mathcal{M}),\;\mathbf{Q}_{(\mu\gamma)},\;{}^2\bar{\mathbf{g}}_\infty\in H^s\\[4pt]"
            r"3.\;\mathbf{Fruitfulness:}\;\text{OSR + Metronic Fracture }\mathbb{M}_\tau^n",
            font_size=15, color=WHITE
        ).move_to(exp_box)

        foot = MathTex(r"\text{Sanity Check 2 }(M=1\text{ Triviality}):\;\Phi_1 = \kappa_1\mathcal{T}_1 \implies {}^2\bar{\mathbf{g}} = \kappa_1(g^{(0)})", font_size=16, color=HOLO_GOLD).to_edge(DOWN, buff=0.22)
        self.play(Create(gr_box), Write(gr_tex), Create(exp_box), Write(exp_tex), Write(foot), run_time=1.5)
        self.wait(0.8)


# =============================================================================
# SCENE 12: Ch9_Act12_Synthesis_Bridge
# =============================================================================
class Ch9_Act12_Synthesis_Bridge(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr = Text("Act XII (Sec. 9.6, Fig. 9.7): Chapter 9 Synthesis & Bridge to Chapter 10 (Metronics)", font_size=19, color=HOLO_GOLD).to_corner(UL, buff=0.25)
        eq_top = MathTex(
            r"\{g_{(\gamma)}^{(1)}\} \longrightarrow \mathbf{Q}_{(\mu\gamma)} \longrightarrow 36\text{-Hermetry }({}^2\bar{\mathbf{g}}_+ + {}^2\bar{\mathbf{g}}_-) "
            r"\longrightarrow {}^2\bar{\mathbf{g}}_\infty \in C^\infty(\mathcal{M}) \xrightarrow{\chi\sqrt{|g_{(p)}|}=1} \mathbb{M}_\tau^n",
            font_size=16, color=ORANGE_GOLD
        ).next_to(hdr, DOWN, buff=0.12).align_to(hdr, LEFT)
        self.add_fixed_in_frame_mobjects(hdr, eq_top)
        self.play(Write(hdr), Write(eq_top), run_time=1.1)

        labels = [
            (r"\text{Kaskadenbasis }\{g_{(\gamma)}^{(1)}\}", ROYAL_BLUE, LEFT * 4.2 + UP * 0.55),
            (r"\text{Connection }\{\!\begin{smallmatrix}i\\kl\end{smallmatrix}\!\}_{(\gamma)}^{(\mu)} + \mathbf{Q}", TEAL_BRIGHT, ORIGIN + UP * 0.55),
            (r"36\text{-Hermetry }{}^2\bar{\mathbf{g}}_+ + {}^2\bar{\mathbf{g}}_-", ORANGE_GOLD, RIGHT * 4.2 + UP * 0.55),
            (r"\text{Conservation }\operatorname{sp}\Gamma_{(-)}\mathbf{G}=0", ROYAL_BLUE, LEFT * 4.2 + DOWN * 1.15),
            (r"\text{Sobolev Apex }{}^2\bar{\mathbf{g}}_\infty", TEAL_BRIGHT, ORIGIN + DOWN * 1.15),
            (r"\text{Ch. 10 Lattice }\mathbb{M}_\tau^n", CRIMSON_RED, RIGHT * 4.2 + DOWN * 1.15),
        ]
        nodes = VGroup()
        for tex_s, col, pos in labels:
            b = RoundedRectangle(width=3.5, height=1.05, corner_radius=0.10, color=col, fill_opacity=0.16).move_to(pos)
            t = MathTex(tex_s, font_size=15, color=WHITE).move_to(b)
            nodes.add(VGroup(b, t))

        arrows = VGroup(
            Arrow(nodes[0].get_right(), nodes[1].get_left(), buff=0.06, color=HOLO_GOLD),
            Arrow(nodes[1].get_right(), nodes[2].get_left(), buff=0.06, color=HOLO_GOLD),
            Arrow(nodes[3].get_right(), nodes[4].get_left(), buff=0.06, color=HOLO_GOLD),
            Arrow(nodes[4].get_right(), nodes[5].get_left(), buff=0.06, color=CRIMSON_RED),
            Arrow(nodes[0].get_bottom(), nodes[3].get_top(), buff=0.06, color=ROYAL_BLUE),
            Arrow(nodes[1].get_bottom(), nodes[4].get_top(), buff=0.06, color=TEAL_BRIGHT),
            Arrow(nodes[2].get_bottom(), nodes[5].get_top(), buff=0.06, color=ORANGE_GOLD),
        )
        foot = MathTex(r"\text{Dialectical Bridge to Chapter 10: Discrete Metronic Lattice }\mathbb{M}_\tau^n\text{ \& DEC Cochains }(\Omega_d^\bullet, d_\tau, *_\tau)", font_size=16, color=HOLO_GOLD).to_edge(DOWN, buff=0.22)

        self.play(LaggedStartMap(FadeIn, nodes, lag_ratio=0.12), Create(arrows), Write(foot), run_time=1.7)
        self.wait(0.8)
