# =============================================================================
# AUTOMATICALLY GENERATED MODULAR SCENES FOR REVEAL.JS PRESENTATION
# =============================================================================

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


# =====================================================================
# STANDARDIZED BOOK COLOR PALETTE (MATCHING LATEX PREAMBLE)
# =====================================================================
ROYAL_BLUE = "#4169E1"     # Base Manifold M_U / Isogonal Regular Classes
TEAL_BRIGHT = "#20B2AA"    # Potentials a_k / Regular Field Classes
ORANGE_GOLD = "#FFA500"    # Enyphaniegrad Density g_E / Ghost Fields
CRIMSON_RED = "#DC143C"    # Interaction Vortex / Singular Classes A_12, A_22
HOLO_GOLD = "#FFD700"      # Holoform / BRST Cohomology H^0 / Wilson Holonomy
PURPLE_SYN = "#9370DB"     # Atiyah Lie Algebroid / Bogomolny Instanton Sector
SLATE_GREY = "#708090"     # Principal Bundle Fibers & Structural Framing



# =============================================================================
# SCENE: Ch4_Act1_Enyphanie_Generative (Act 1)
# =============================================================================
class Ch4_Act1_Enyphanie_Generative(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr1 = Text(
            "Act I (Secs. 4.1.1-4.1.2): Enyphanie (Enu), Protyposis & Generative (SM-14)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm14_top = MathTex(
            r"\mathsf{G}_{\text{gen}} \equiv \left[ P_i\big|_1^4,\;\; \{\;\}_{(j)}\big|_1^Q \right]_{(A,S)}\;\;(\text{SM-14}), \qquad "
            r"\text{Degenerations: }\binom{4}{1}+\binom{4}{2}+\binom{4}{3} = 4+6+4 = \mathbf{14}\;\;(\text{Prop 4.1})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr1, DOWN, buff=0.12).align_to(hdr1, LEFT)
        self.add_fixed_in_frame_mobjects(hdr1, sm14_top)
        self.play(Write(hdr1), Write(sm14_top), run_time=1.2)

        # Left Panel: Three Coupled Scales of Enyphanie (Enu) & Enyphaniegrad (g_E)
        eny_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        eny_hdr = MathTex(r"\text{Enyphanie }(E\nu)\text{ \& Scalar Enyphaniegrad }(g_E)", font_size=17, color=TEAL_BRIGHT).next_to(eny_box.get_top(), DOWN, buff=0.12)
        eny_tex = MathTex(
            r"1.\;\mathbf{Autonomous\;Phase\;Evolution:}\;\mathcal{S}_m \longrightarrow \mathcal{S}_{m+1}\\[5pt]"
            r"2.\;\mathbf{Interactive\;Coupling\;Readiness:}\;K_m,\, K_s\text{ Valencies}\\[5pt]"
            r"3.\;\mathbf{Holistic\;Field\;Emergence:}\;\text{Non-Additive }\textit{Holoformen}\\[6pt]"
            r"\bullet\;\text{Enyphaniegrad }g_E(x) := \frac{1}{2}\|\mathbf{\Omega}_{\text{int}}^{\mathcal{D}}(x)\|_{g_U,\mathfrak{g}}^2 \ge 0\\"
            r"\;\;\text{(Analogous to Thermodynamic Free Energy!)}",
            font_size=15, color=WHITE
        ).move_to(eny_box.get_center() + DOWN * 0.15)

        # Right Panel: Protyposis 4-Store Tetrahedron (4 Vertices + 6 Edges + 4 Faces = 14) & Simplex Fillings
        tot_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        tot_hdr = MathTex(r"\text{Syntrixtotalitaet }T0\text{ \& 4D Syntrixgeruest (Prop 4.3)}", font_size=17, color=ORANGE_GOLD).next_to(tot_box.get_top(), DOWN, buff=0.12)

        tet_c = RIGHT * 1.45 + DOWN * 0.65
        t_pts = [
            tet_c + UP * 0.85,
            tet_c + LEFT * 0.85 + DOWN * 0.65,
            tet_c + RIGHT * 0.85 + DOWN * 0.65,
            tet_c + UP * 0.05 + RIGHT * 0.22
        ]
        tet_faces = VGroup(
            Polygon(t_pts[0], t_pts[1], t_pts[3], color=PURPLE_SYN, fill_color=PURPLE_SYN, fill_opacity=0.22, stroke_width=0),
            Polygon(t_pts[0], t_pts[2], t_pts[3], color=ORANGE_GOLD, fill_color=ORANGE_GOLD, fill_opacity=0.22, stroke_width=0),
            Polygon(t_pts[1], t_pts[2], t_pts[3], color=TEAL_BRIGHT, fill_color=TEAL_BRIGHT, fill_opacity=0.22, stroke_width=0)
        )
        tet_edges = VGroup(*[Line(t_pts[i], t_pts[j], color=TEAL_BRIGHT, stroke_width=2.4) for i in range(4) for j in range(i + 1, 4)])
        tet_verts = VGroup(*[
            VGroup(Dot(t_pts[i], color=HOLO_GOLD, radius=0.085), MathTex(rf"P_{i+1}", font_size=13, color=HOLO_GOLD).next_to(t_pts[i], UP if i == 0 else DOWN, buff=0.04))
            for i in range(4)
        ])

        tot_tex = MathTex(
            r"\mathbf{14\;Sub\text{-}Store\;Degenerations:}\\"
            r"\bullet\;\binom{4}{1}=4\text{ Stores }(P_i)\\"
            r"\bullet\;\binom{4}{2}=6\text{ Pairs}\\"
            r"\bullet\;\binom{4}{3}=4\text{ Triads}\\[5pt]"
            r"\mathbf{Simplex\;Fillings\;(Q):}\\"
            r"\text{2D: }Q,\;\text{3D: }\binom{Q+1}{2},\;\text{4D: }\binom{Q+2}{3}",
            font_size=14, color=WHITE
        ).move_to(RIGHT * 4.3 + DOWN * 0.65)

        act1_foot = MathTex(
            r"\text{Four-Store Span of }T0:\; P^{U_{\mathsf{G}}} := \bigoplus_{i=1}^4 P_i \cong \mathbb{R}^{12} \quad "
            r"\text{with }2^4 - 2 = \mathbf{14}\text{ Proper Nonempty Sub-Store Degenerations}",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(eny_box), Write(eny_hdr), Write(eny_tex),
            Create(tot_box), Write(tot_hdr), Write(tot_tex), Write(act1_foot),
            run_time=1.7
        )
        # Sequentially highlight the 4 vertices, 6 edges, and 4 faces (4 + 6 + 4 = 14)
        self.play(FadeIn(tet_verts, scale=1.3), run_time=0.5)
        self.play(Create(tet_edges), run_time=0.6)
        self.play(FadeIn(tet_faces), run_time=0.5)
        self.wait(0.6)

        self.play(FadeOut(VGroup(
            hdr1, sm14_top, eny_box, eny_hdr, eny_tex,
            tot_box, tot_hdr, tet_faces, tet_edges, tet_verts, tot_tex, act1_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch4_Act2_Discrete_Continuous_Enyphane (Act 2)
# =============================================================================
class Ch4_Act2_Discrete_Continuous_Enyphane(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr2 = Text(
            "Act II (Secs. 4.1.3-4.1.5): Discrete (SM-15) vs. Continuous Enyphansyntrizen",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm15_17 = MathTex(
            r"\widetilde{a}|,\;\overline{||},\;\widetilde{c}|\left(\llcorner_j(\;)\right]_1^n\;\;(\text{SM-15}), \qquad "
            r"E^{-1}\,E\,\mathbf{y}\widetilde{\mathbf{f}},\;\overline{||},\;\mathbf{y}\widetilde{\mathbf{f}}\;\;(\text{SM-16a}), \qquad "
            r"\widetilde{C}| \equiv \widetilde{c}|,\;\underline{\llcorner}\,E\;\;(\text{SM-17})",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr2, DOWN, buff=0.12).align_to(hdr2, LEFT)
        self.add_fixed_in_frame_mobjects(hdr2, sm15_17)
        self.play(FadeIn(hdr2), Write(sm15_17), run_time=1.1)

        # Left Panel: Discrete Step Chain vs Continuous Reversible Enyphane Flow
        dc_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        dc_tex = MathTex(
            r"\mathbf{1.\;Diskrete\;Enyphansyntrix\;(\text{SM-15}):}\\"
            r"\text{Finite corporate selection chain }\left(\llcorner_j(\;)\right]_1^n\text{ on }T0.\\[18pt]"
            r"\mathbf{2.\;Kontinuierliche\;Enyphansyntrix\;(\text{SM-16,\;17}):}\\"
            r"\text{Driven by }E\equiv(G_k,\varepsilon]_1^n:\;\; (\Phi_t^X)^{-1} = \Phi_{-t}^X = \Phi_t^{-X}",
            font_size=14, color=WHITE
        ).move_to(dc_panel.get_center() + UP * 0.25)

        disc_nodes = VGroup(*[Dot(LEFT * (5.1 - k * 1.3) + UP * 0.12, color=ROYAL_BLUE, radius=0.075) for k in range(4)])
        disc_links = VGroup(*[Arrow(disc_nodes[k].get_right(), disc_nodes[k + 1].get_left(), color=ROYAL_BLUE, buff=0.04, stroke_width=2.4) for k in range(3)])

        cont_stream = ParametricFunction(
            lambda t: LEFT * 5.1 + DOWN * 1.55 + np.array([3.9 * t, 0.25 * np.sin(2 * PI * t), 0]),
            t_range=[0, 1], color=TEAL_BRIGHT, stroke_width=3.8
        )
        rev_orb = Dot(cont_stream.get_start(), color=HOLO_GOLD, radius=0.095)

        # Right Panel: Syntrixfeld Geometric Triple (\mathcal{M}_{syn}, g^{syn}, X_{kor}), Holoform, Zeitkorn & Affinity
        hol_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.52)
        hol_tex = MathTex(
            r"\mathbf{Syntrixfeld\;Geometric\;Triple\;(\mathfrak{F}_{\text{syn}}):}\\[4pt]"
            r"\mathfrak{F}_{\text{syn}} := \left(\mathcal{M}_{\text{syn}},\; g^{\text{syn}},\; \mathbf{X}_{\text{kor}}\right)\quad(\dim\mathcal{M}_{\text{syn}}=n)\\[6pt]"
            r"\bullet\;\mathbf{Holoform:}\;\text{Irreducible emergent whole }(\Delta_{\text{emerg}}^{\mathcal{I}}>0)\\[3pt]"
            r"\bullet\;\mathbf{Syntrixfunktor\;(\text{SM-18}):}\;\widetilde{F}|,(\widetilde{a}_\varsigma)_1^r,\overline{||}_A,\widetilde{A}\\[3pt]"
            r"\bullet\;\mathbf{Zeitkorn\;\delta t_i:}\;\text{Quantum of operational duration}\\[3pt]"
            r"\bullet\;\mathbf{Affinitaetssyndrom\;(\text{SM-19}):}\;\text{Bilinear coupling }\beta^\infty",
            font_size=15, color=HOLO_GOLD
        ).move_to(hol_panel)

        act2_foot = MathTex(
            r"\text{Ontic Structural Realism (French 2014): }\; "
            r"\text{Enyphanie is the non-Abelian gauge curvature }\mathbf{\Omega}_{\text{int}}^{\mathcal{D}}\text{ of non-commuting connections}",
            font_size=18, color=GREEN_C
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(dc_panel), Write(dc_tex),
            FadeIn(disc_nodes), Create(disc_links),
            Create(cont_stream), FadeIn(rev_orb),
            Create(hol_panel), Write(hol_tex), Write(act2_foot),
            run_time=1.8
        )
        # Animate forward Enyphane E and inverse Enyphane E^{-1}
        self.play(MoveAlongPath(rev_orb, cont_stream), run_time=0.9, rate_func=rate_functions.ease_in_out_sine)
        self.play(MoveAlongPath(rev_orb, cont_stream, rate_func= lambda t: 1 - t), run_time=0.9)
        self.wait(0.5)

        self.play(FadeOut(VGroup(
            hdr2, sm15_17, dc_panel, dc_tex, disc_nodes, disc_links, cont_stream, rev_orb,
            hol_panel, hol_tex, act2_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch4_Act3_4_Gauge_Wilson_Loop (Act 3)
# =============================================================================
class Ch4_Act3_4_Gauge_Wilson_Loop(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr3 = Text(
            "Act III (Sec. 4.2.1): Functor G_nabla (Const 4.2) & Gauge Invariance (Fig 4.1)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        g_top = MathTex(
            r"\mathfrak{G}_\nabla: \mathbf{Ctx}_{\text{adm}}^{\text{sk}} \longrightarrow \mathbf{BunConn}_G^{\text{contr}}, \qquad "
            r"U \longmapsto (\pi_U: P_U \to M_U,\; g_U,\; \mathbf{A}_U \in \Omega^1(P_U,\mathfrak{g}))",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr3, DOWN, buff=0.12).align_to(hdr3, LEFT)
        self.add_fixed_in_frame_mobjects(hdr3, g_top)
        self.play(FadeIn(hdr3), Write(g_top), run_time=1.1)

        g_ladder = VGroup()
        g_specs = [
            (r"1.\;\text{Principal Connection }\mathbf{A}\in\Omega^1(P_U,\mathfrak{g})\;(R_g^*\mathbf{A}=\operatorname{Ad}(g^{-1})\mathbf{A})", ROYAL_BLUE, UP * 1.05),
            (r"2.\;\text{Horizontal Curvature }\widetilde{F}_A := d\mathbf{A}+\tfrac{1}{2}[\mathbf{A},\mathbf{A}]\in\Omega^2_{\text{hor,eq}}(P_U,\mathfrak{g})", TEAL_BRIGHT, UP * 0.10),
            (r"3.\;\text{Descended Adjoint Curvature }F_A\in\Omega^2(M_U,\operatorname{ad} P_U)", ORANGE_GOLD, DOWN * 0.85),
            (r"4.\;\text{Gauge-Invariant Norm }\|F_{\sigma\cdot A}\|_{g_E,\mathfrak{g}} = \|F_A\|_{g_E,\mathfrak{g}}\;(\text{Prop 4.4})", HOLO_GOLD, DOWN * 1.80),
        ]
        for tx_s, col_s, y_p in g_specs:
            bx = RoundedRectangle(width=5.8, height=0.68, corner_radius=0.08, color=col_s, fill_opacity=0.20).move_to(LEFT * 3.1 + y_p)
            tx = MathTex(tx_s, font_size=14, color=WHITE).move_to(bx)
            g_ladder.add(VGroup(bx, tx))

        g_arrs = VGroup(*[Arrow(g_ladder[k].get_bottom(), g_ladder[k + 1].get_top(), color=TEAL_BRIGHT, buff=0.04, stroke_width=2.5) for k in range(3)])

        # Right Side: Construction 4.2 + Live Ad(sigma) Fiber Rotation Invariance Dial
        c42_box = RoundedRectangle(width=5.7, height=3.55, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.15 + DOWN * 0.38)
        c42_tex = MathTex(
            r"\mathbf{Construction\;4.2\;(Explicit\;Functor\;\mathfrak{G}_\nabla):}\\[4pt]"
            r"\omega_U(x)(v) := \Theta_U\!\left(K^U\left(\zeta^U(d_0^U)\otimes v\right)\right) \in \mathfrak{g}\\[4pt]"
            r"\mathbf{A}_U(x,g)(v,\xi_g) := \operatorname{Ad}(g^{-1})\!\left(\omega_U(x)(v)\right) + g^{-1}dg(\xi_g)\\[4pt]"
            r"\bullet\;\text{Strict Naturality: }\; h_P^*\mathbf{A}_U = \mathbf{A}_V \quad (\|dh_M\|_{\text{op}}\le 1)",
            font_size=14, color=WHITE
        ).move_to(c42_box.get_top() + DOWN * 0.95)

        fib_c = RIGHT * 1.75 + DOWN * 1.45
        fib_circle = Circle(radius=0.58, color=ROYAL_BLUE, stroke_width=2.5).move_to(fib_c)
        sig_ang = ValueTracker(0.35)
        fib_vec = always_redraw(lambda: Arrow(
            fib_c, fib_c + 0.58 * np.array([np.cos(sig_ang.get_value()), np.sin(sig_ang.get_value()), 0]),
            color=HOLO_GOLD, buff=0, stroke_width=3.5
        ))
        inv_readout = MathTex(
            r"\operatorname{Ad}(\sigma(x))F_A:\;\; \|F_{\sigma\cdot A}\|_{g_E,\mathfrak{g}} \equiv 1.00",
            font_size=15, color=GREEN_C
        ).move_to(RIGHT * 4.05 + DOWN * 1.45)

        self.play(
            FadeIn(g_ladder, lag_ratio=0.1), Create(g_arrs),
            Create(c42_box), Write(c42_tex),
            Create(fib_circle), FadeIn(fib_vec), Write(inv_readout),
            run_time=1.8
        )
        self.play(sig_ang.animate.set_value(2.15 * PI), run_time=1.5, rate_func=rate_functions.ease_in_out_sine)
        self.wait(0.5)

        self.remove(fib_vec)
        self.play(FadeOut(VGroup(hdr3, g_top, g_ladder, g_arrs, c42_box, c42_tex, fib_circle, inv_readout)), run_time=0.8)



# =============================================================================
# SCENE: Act4_Sec_421_3d_Wilson (Act 4)
# =============================================================================
class Act4_Sec_421_3d_Wilson(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr4 = Text(
            "Act IV (Sec. 4.2.1): 3D Wilson Loop Holonomy & Non-Abelian Stokes (Fig 4.2)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        stokes_bot = MathTex(
            r"\operatorname{Hol}_A(\mathcal{C}) := \mathcal{P}\exp\!\left(-\oint_{\mathcal{C}} \mathbf{A}\right) = "
            r"\mathcal{P}\exp\!\left(-\iint_\Sigma F_A\right) = "
            r"\mathcal{P}\exp\!\left(-\iint_\Sigma \mathbf{\Omega}_{\text{int}}^{\mathcal{D}}\right) \neq I",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)
        self.add_fixed_in_frame_mobjects(hdr4, stokes_bot)
        self.play(FadeIn(hdr4), Write(stokes_bot), run_time=1.1)

        self.move_camera(phi=62 * DEGREES, theta=-42 * DEGREES, run_time=1.7)

        m_plane = Surface(
            lambda u, v: np.array([u, v, -1.25]),
            u_range=[-2.8, 2.8], v_range=[-2.0, 2.0], resolution=(10, 8),
            fill_color=ROYAL_BLUE, fill_opacity=0.20, stroke_color=ROYAL_BLUE, stroke_width=1
        )
        fibers_bg = VGroup(*[
            DashedLine(np.array([x, y, -1.25]), np.array([x, y, 1.4]), color=SLATE_GREY, stroke_width=1.4)
            for x in [-2.0, 0.0, 1.4] for y in [-1.2, 0.0, 1.2]
        ])
        w_loop = ParametricFunction(lambda t: np.array([1.4 * np.cos(t), 1.4 * np.sin(t), -1.25]), t_range=[0, 2 * PI], color=ROYAL_BLUE, stroke_width=3.5)
        h_lift = ParametricFunction(lambda t: np.array([1.4 * np.cos(t), 1.4 * np.sin(t), -0.85 + 0.285 * t]), t_range=[0, 2 * PI], color=TEAL_BRIGHT, stroke_width=4.5)
        hol_gap = Arrow3D(np.array([1.4, 0, -0.85]), np.array([1.4, 0, -0.85 + 0.285 * 2 * PI]), color=HOLO_GOLD)

        dot_w = Dot3D(w_loop.get_start(), radius=0.09, color=ROYAL_BLUE)
        dot_h = Sphere(radius=0.11, color=HOLO_GOLD).move_to(h_lift.get_start())

        hol_card = RoundedRectangle(width=5.4, height=1.65, corner_radius=0.12, color=CRIMSON_RED, fill_opacity=0.14).to_corner(UR, buff=0.35).shift(DOWN * 0.55)
        hol_txt = MathTex(
            r"\mathbf{Horizontal\;Lift\;\widetilde{\mathcal{C}}(t):}\;\mathbf{A}(\dot{\widetilde{\mathcal{C}}}) = 0\\[4pt]"
            r"p(1) = p(0)\cdot\operatorname{Hol}_A(\mathcal{C}) \neq p(0)",
            font_size=17, color=HOLO_GOLD
        ).move_to(hol_card)
        self.add_fixed_in_frame_mobjects(hol_card, hol_txt)

        self.play(Create(m_plane), Create(fibers_bg), Create(w_loop), FadeIn(dot_w, dot_h, hol_card, hol_txt), run_time=1.6)
        self.play(Create(h_lift), MoveAlongPath(dot_w, w_loop), MoveAlongPath(dot_h, h_lift), run_time=2.6, rate_func=rate_functions.ease_in_out_sine)
        self.play(FadeIn(hol_gap, shift=OUT * 0.3), run_time=0.8)
        self.wait(0.6)

        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.3)
        self.play(FadeOut(VGroup(m_plane, fibers_bg, w_loop, h_lift, hol_gap, dot_w, dot_h, hol_card, hol_txt, hdr4, stokes_bot)), run_time=0.8)



# =============================================================================
# SCENE: Ch4_Act5_6_CornerFlow_BRST (Act 5)
# =============================================================================
class Ch4_Act5_6_CornerFlow_BRST(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr5 = Text(
            "Act V (Secs. 4.2.2-4.2.3): Slice Topos T0 & Enyphane Flows on Corners (Fig 4.3)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        slice_top = MathTex(
            r"P^{U_{\mathsf{G}}} := \left(\bigoplus_{i=1}^4 P_i\right)_{\ell^1} \cong \mathbb{R}^{12}, \qquad "
            r"\mathbf{Sh}(\mathbf{Ctx}_{/U_{\mathsf{G}}}, J_{/U_{\mathsf{G}}}) \simeq \mathcal{E}_{\text{syn}}/\mathbf{y}(U_{\mathsf{G}})\;\;(\text{Thm 4.6})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr5, DOWN, buff=0.12).align_to(hdr5, LEFT)
        self.add_fixed_in_frame_mobjects(hdr5, slice_top)
        self.play(FadeIn(hdr5), Write(slice_top), run_time=1.1)

        sep3_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        sep3_tex = MathTex(
            r"\mathbf{Def\;4.5\;(Three\;Distinct\;Spaces\;of\;U_{\mathsf{G}}):}\\[5pt]"
            r"1.\;\text{Algebraic Carrier: }\; P^{U_{\mathsf{G}}}\cong(\mathbb{R}^{12},\|\cdot\|_{\ell^1})\in\mathbf{FinBan}_{\le 1}\\[4pt]"
            r"2.\;\text{Bundle Base Manifold: }\; M_{U_{\mathsf{G}}}\text{ of }\mathfrak{G}_\nabla(U_{\mathsf{G}})\\[4pt]"
            r"3.\;\text{Dynamical State Space: }\; \mathcal{M}_{\text{syn}}\subseteq M_{U_{\mathsf{G}}}\\[6pt]"
            r"\bullet\;\text{Zalamea Slice Relativity: }\mathbf{y}(U_{\mathsf{G}})\text{ becomes }\mathbf{1}_{/U_{\mathsf{G}}}",
            font_size=15, color=WHITE
        ).move_to(sep3_box)

        oct_axes = Axes(
            x_range=[0, 3.2, 1], y_range=[0, 2.4, 1],
            x_length=4.8, y_length=2.7,
            axis_config={"include_tip": True, "color": TEAL_BRIGHT}
        ).move_to(RIGHT * 3.1 + DOWN * 0.65)
        oct_hdr = MathTex(
            r"\text{Fig 4.3: Wall-Tangent Flow }X^i|_{x^i=0}=0,\; \|X\|\le C_X(1+\|x\|)",
            font_size=16, color=TEAL_BRIGHT
        ).next_to(oct_axes, UP, buff=0.08)

        hyp1 = oct_axes.plot(lambda x: 0.55 / x, x_range=[0.28, 2.9], color=TEAL_BRIGHT, stroke_width=3)
        hyp2 = oct_axes.plot(lambda x: 1.25 / x, x_range=[0.55, 2.9], color=ORANGE_GOLD, stroke_width=3.5)

        # Boundary wall tangent arrows along x^1=0 and x^2=0 from Book Figure 4.3
        wall_arrs = VGroup(
            Arrow(oct_axes.c2p(0, 2.1), oct_axes.c2p(0, 1.4), color=CRIMSON_RED, buff=0, stroke_width=2.8),
            Arrow(oct_axes.c2p(0, 1.2), oct_axes.c2p(0, 0.5), color=CRIMSON_RED, buff=0, stroke_width=2.8),
            Arrow(oct_axes.c2p(0.8, 0), oct_axes.c2p(1.6, 0), color=CRIMSON_RED, buff=0, stroke_width=2.8),
            Arrow(oct_axes.c2p(1.8, 0), oct_axes.c2p(2.6, 0), color=CRIMSON_RED, buff=0, stroke_width=2.8),
            Dot(oct_axes.c2p(0, 0), color=CRIMSON_RED, radius=0.09)
        )

        t_fl = ValueTracker(0.60)
        fl_dot = always_redraw(lambda: Dot(
            oct_axes.c2p(t_fl.get_value(), 1.25 / t_fl.get_value()),
            color=HOLO_GOLD, radius=0.10
        ))

        act5_foot = MathTex(
            r"\text{Picard--Lindeloef \& Groenwall Completeness on Corners (Def 4.7): }\; "
            r"\Phi_t^X(\mathcal{M}) = \mathcal{M}\;\;\forall t\in\mathbb{R}, \quad (\Phi_t^X)^{-1} = \Phi_{-t}^X",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(sep3_box), Write(sep3_tex),
            Create(oct_axes), Write(oct_hdr), FadeIn(wall_arrs),
            Create(hyp1), Create(hyp2), FadeIn(fl_dot),
            Write(act5_foot),
            run_time=1.8
        )
        self.play(t_fl.animate.set_value(2.65), run_time=1.2, rate_func=rate_functions.ease_in_out_sine)
        self.play(t_fl.animate.set_value(0.65), run_time=1.2, rate_func=rate_functions.ease_in_out_sine)
        self.wait(0.5)

        self.remove(fl_dot)
        self.play(FadeOut(VGroup(hdr5, slice_top, sep3_box, sep3_tex, oct_axes, oct_hdr, wall_arrs, hyp1, hyp2, act5_foot)), run_time=0.8)



# =============================================================================
# SCENE: Act6_Sec_424_Yangmills_Action (Act 6)
# =============================================================================
class Act6_Sec_424_Yangmills_Action(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr6 = Text(
            "Act VI (Sec. 4.2.4): Yang-Mills Action I(A) & Graded BRST Complex (Prop 4.9)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        ym_top = MathTex(
            r"\mathcal{I}(\mathbf{A}) := \frac{1}{2}\int_{M_U} \|F_A\|_{g_E,\mathfrak{g}}^2\,d\operatorname{vol}_{g_U} = "
            r"-\frac{1}{4}\int_{M_U} \operatorname{tr}(F_A\wedge *F_A), \qquad "
            r"\delta\mathcal{I}_{\mathbf{A}}(a) = 0 \;\Longleftrightarrow\; D_A^* F_A = 0\;\;(\text{Def 4.8})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr6, DOWN, buff=0.12).align_to(hdr6, LEFT)
        self.add_fixed_in_frame_mobjects(hdr6, ym_top)
        self.play(FadeIn(hdr6), Write(ym_top), run_time=1.1)

        b_cards = VGroup()
        b_specs = [
            (r"g = -1\\\mathcal{F}^{-1}\text{ (Anti-Ghost }\bar{c})\\s_{\text{BRST}}\bar{c}=b", SLATE_GREY, LEFT * 4.65 + UP * 0.15),
            (r"g = 0\\\mathcal{F}^0\text{ (Gauge }\mathbf{A},\, b)\\s_{\text{BRST}}\mathbf{A}=D_A c", TEAL_BRIGHT, LEFT * 1.55 + UP * 0.15),
            (r"g = +1\\\mathcal{F}^1\text{ (Ghost }c)\\s_{\text{BRST}}c=-\tfrac{1}{2}[c,c]", ORANGE_GOLD, RIGHT * 1.55 + UP * 0.15),
            (r"g = +2\\\mathcal{F}^2\text{ }([c,c])\\s_{\text{BRST}}^2 \equiv 0", PURPLE_SYN, RIGHT * 4.65 + UP * 0.15),
        ]
        for tx_s, col_s, pos_s in b_specs:
            bx = RoundedRectangle(width=2.8, height=1.25, corner_radius=0.1, color=col_s, fill_opacity=0.20).move_to(pos_s)
            tx = MathTex(tx_s, font_size=15, color=WHITE).move_to(bx)
            b_cards.add(VGroup(bx, tx))

        b_arrs = VGroup(*[Arrow(b_cards[k].get_right(), b_cards[k + 1].get_left(), color=TEAL_BRIGHT, buff=0.05, stroke_width=2.8) for k in range(3)])
        nilp_arc1 = ArcBetweenPoints(b_cards[0].get_bottom(), b_cards[2].get_bottom(), angle=0.32, color=CRIMSON_RED)
        nilp_arc2 = ArcBetweenPoints(b_cards[1].get_bottom(), b_cards[3].get_bottom(), angle=0.32, color=CRIMSON_RED)

        brst_foot = MathTex(
            r"s_{\text{BRST}}^2 \mathbf{A} = [[\mathbf{A},c],c]+\tfrac{1}{2}[\mathbf{A},[c,c]] \equiv 0, \qquad "
            r"\mathcal{H}_{\text{phys}} \cong H^0_{\text{BRST}}(\mathcal{F}_{\text{ext}}) = "
            r"\frac{\ker(s_{\text{BRST}}: \mathcal{F}^0\to\mathcal{F}^1)}{\operatorname{im}(s_{\text{BRST}}: \mathcal{F}^{-1}\to\mathcal{F}^0)}",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(FadeIn(b_cards, lag_ratio=0.1), Create(b_arrs), run_time=1.5)
        self.play(Create(nilp_arc1), Create(nilp_arc2), Write(brst_foot), run_time=1.5)
        # Highlight the physical state space cohomology H^0_BRST at ghost number g = 0
        self.play(b_cards[1][0].animate.set_stroke(HOLO_GOLD, width=4), rate_func=rate_functions.there_and_back, run_time=0.9)
        self.wait(0.6)

        self.play(FadeOut(VGroup(hdr6, ym_top, b_cards, b_arrs, nilp_arc1, nilp_arc2, brst_foot)), run_time=0.8)



# =============================================================================
# SCENE: Ch4_Act7_Interaction_Vortex (Act 7)
# =============================================================================
class Ch4_Act7_Interaction_Vortex(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr7 = Text(
            "Act VII (Sec. 4.3.1): 3D Interaction Curvature Vortex & Stage IV (su(2))",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        curv_bot = MathTex(
            r"F_A = \sum_{k=1}^N \mathcal{F}_k^{(A_0)} + \mathbf{\Omega}_{\text{int}}^{\mathcal{D}}, \qquad "
            r"\mathbf{\Omega}_{\text{int}}^{\mathcal{D}} := \sum_{1\le i<j\le N}[a_i, a_j] + D_{A_0}a_{\text{int}} + "
            r"\sum_{k=1}^N [a_k, a_{\text{int}}] + \frac{1}{2}[a_{\text{int}}, a_{\text{int}}]\;\;(\text{Thm 4.10})",
            font_size=17, color=TEAL_BRIGHT
        ).to_edge(DOWN, buff=0.20)
        self.add_fixed_in_frame_mobjects(hdr7, curv_bot)
        self.play(FadeIn(hdr7), Write(curv_bot), run_time=1.1)

        self.move_camera(phi=62 * DEGREES, theta=-42 * DEGREES, run_time=1.7)

        su2_plane = Surface(
            lambda u, v: np.array([u - 2.0, v, -1.2]),
            u_range=[-1.8, 1.8], v_range=[-1.6, 1.6], resolution=(8, 8),
            fill_color=ROYAL_BLUE, fill_opacity=0.22, stroke_color=ROYAL_BLUE, stroke_width=1
        )
        pot_a1 = Arrow3D(np.array([-3.4, -0.8, -1.2]), np.array([-0.6, -0.8, -1.2]), color=TEAL_BRIGHT)
        pot_a2 = Arrow3D(np.array([-2.0, -1.5, -1.2]), np.array([-2.0, 1.3, -1.2]), color=ORANGE_GOLD)

        vortex_3d = ParametricFunction(
            lambda t: np.array([
                -2.0 + 0.55 * (1 - 0.12 * t) * np.cos(4.5 * t),
                0.55 * (1 - 0.12 * t) * np.sin(4.5 * t),
                -1.2 + 0.50 * t
            ]),
            t_range=[0, 5.0], color=CRIMSON_RED, stroke_width=5
        )
        gE_rings = VGroup(*[Circle(radius=r, color=HOLO_GOLD, stroke_width=2.5).move_to(np.array([-2.0, 0, 0.35])) for r in [0.6, 0.95, 1.3]])

        st4_card = RoundedRectangle(width=5.8, height=2.75, corner_radius=0.12, color=ORANGE_GOLD, fill_opacity=0.14).to_corner(UR, buff=0.35).shift(DOWN * 0.55)
        st4_tex = MathTex(
            r"\mathbf{Stage\;IV\;(Non\text{-}Abelian\;\mathfrak{su}(2)\;Polarimeter):}\\[4pt]"
            r"a_1 = \omega_1 T_1\,dx^1\;(\mathcal{F}_1=0),\quad a_2 = \omega_2 T_2\,dx^2\;(\mathcal{F}_2=0)\\[4pt]"
            r"\mathbf{\Omega}_{\text{int}}^{\mathcal{D}} = [a_1, a_2] = \omega_1\omega_2\,T_3\,dx^1\wedge dx^2 \neq 0\\[4pt]"
            r"g_E^{\mathcal{D}}(x) = \frac{1}{2}\|\mathbf{\Omega}_{\text{int}}^{\mathcal{D}}\|_{g,\mathfrak{g}}^2 = "
            r"\frac{1}{8}\omega_1^2\omega_2^2 > 0 \implies \Delta_{\text{emerg}}^{\mathcal{I}} > 0",
            font_size=16, color=WHITE
        ).move_to(st4_card)
        self.add_fixed_in_frame_mobjects(st4_card, st4_tex)

        self.play(Create(su2_plane), FadeIn(pot_a1, shift=RIGHT * 0.3), FadeIn(pot_a2, shift=UP * 0.3), FadeIn(st4_card, st4_tex), run_time=1.6)
        self.play(Create(vortex_3d), FadeIn(gE_rings, scale=0.8), run_time=1.8)
        self.play(gE_rings.animate.scale(1.12), rate_func=rate_functions.there_and_back, run_time=1.1)

        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.3)
        self.play(FadeOut(VGroup(su2_plane, pot_a1, pot_a2, vortex_3d, gE_rings, st4_card, st4_tex, hdr7, curv_bot)), run_time=0.8)



# =============================================================================
# SCENE: Ch4_Act8_9_Laplacian_Bogomolny (Act 8)
# =============================================================================
class Ch4_Act8_9_Laplacian_Bogomolny(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr8 = Text(
            "Act VIII (Sec. 4.3.1): Fredholm L2 Hodge-Laplacian Splitting (Thm 4.11)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        lap_top = MathTex(
            r"\Delta_{A_0} := D_{A_0}D_{A_0}^* + D_{A_0}^* D_{A_0}, \qquad "
            r"L^2\Omega^2(M_U,\operatorname{ad} P_U) = \operatorname{im}(\Delta_{A_0}) \oplus_{L^2} \mathcal{H}_{\Delta_{A_0}}^2(M_U,\operatorname{ad} P_U)",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr8, DOWN, buff=0.12).align_to(hdr8, LEFT)
        self.add_fixed_in_frame_mobjects(hdr8, lap_top)
        self.play(FadeIn(hdr8), Write(lap_top), run_time=1.1)

        outer_hilb = RoundedRectangle(width=11.8, height=3.55, corner_radius=0.16, color=ROYAL_BLUE, fill_opacity=0.05).move_to(DOWN * 0.45)
        im_panel = RoundedRectangle(width=4.6, height=2.85, corner_radius=0.12, color=TEAL_BRIGHT, fill_opacity=0.18).move_to(LEFT * 3.35 + DOWN * 0.45)
        im_txt = MathTex(
            r"\mathbf{Dynamic\;Green\;\operatorname{im}(\Delta_{A_0}):}\\[5pt]"
            r"\Delta_{A_0}\Phi_{\text{int}} = \Delta_{A_0}G_{A_0}(\mathbf{\Omega}_{\text{int}}^{\mathcal{D}})\\[4pt]"
            r"\Phi_{\text{int}}\in(\ker\Delta_{A_0})^\perp",
            font_size=15, color=TEAL_BRIGHT
        ).move_to(im_panel)

        # Center Orthogonal Vector Projection Widget
        p_orig = DOWN * 1.15
        vec_im  = Arrow(p_orig, p_orig + LEFT * 0.85, color=TEAL_BRIGHT, buff=0, stroke_width=3.5)
        vec_ker = Arrow(p_orig, p_orig + UP * 1.35, color=ORANGE_GOLD, buff=0, stroke_width=3.5)
        vec_tot = Arrow(p_orig, p_orig + LEFT * 0.85 + UP * 1.35, color=HOLO_GOLD, buff=0, stroke_width=4)
        orth_lbl = MathTex(r"\oplus_{L^2}", font_size=24, color=HOLO_GOLD).move_to(UP * 0.55)

        ker_panel = RoundedRectangle(width=4.6, height=2.85, corner_radius=0.12, color=ORANGE_GOLD, fill_opacity=0.18).move_to(RIGHT * 3.35 + DOWN * 0.45)
        ker_txt = MathTex(
            r"\mathbf{Harmonic\;\mathcal{H}_{\Delta_{A_0}}^2 := \ker(\Delta_{A_0}):}\\[5pt]"
            r"\gamma_{\text{harm}}\in\Omega^2(M_U,\operatorname{ad} P_U)\\[4pt]"
            r"D_{A_0}\gamma_{\text{harm}}=0 \;\wedge\; D_{A_0}^*\gamma_{\text{harm}}=0",
            font_size=15, color=ORANGE_GOLD
        ).move_to(ker_panel)

        orth_foot = MathTex(
            r"\text{Energy Orthogonality: }\; "
            r"\mathcal{E}_{\text{int}}^{\mathcal{D}} := \frac{1}{2}\|\mathbf{\Omega}_{\text{int}}^{\mathcal{D}}\|_{L^2}^2 = "
            r"\frac{1}{2}\left(\|\Delta_{A_0}\Phi_{\text{int}}\|_{L^2}^2 + \|\gamma_{\text{harm}}\|_{L^2}^2\right) "
            r"\quad (\text{3-Way Split iff } D_{A_0}^2 = 0)",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(outer_hilb),
            FadeIn(im_panel, im_txt, orth_lbl, ker_panel, ker_txt),
            GrowArrow(vec_tot),
            run_time=1.6
        )
        self.play(GrowArrow(vec_im), GrowArrow(vec_ker), Write(orth_foot), run_time=1.3)
        self.wait(0.7)

        self.play(FadeOut(VGroup(
            hdr8, lap_top, outer_hilb, im_panel, im_txt, orth_lbl,
            vec_im, vec_ker, vec_tot, ker_panel, ker_txt, orth_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Act9_Secs_432433_Atiyah_Algebroid (Act 9)
# =============================================================================
class Act9_Secs_432433_Atiyah_Algebroid(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr9 = Text(
            "Act IX (Secs. 4.3.2-4.3.3): Atiyah Lie Algebroid & Bogomolny Bound (Thm 4.15)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        at_top = MathTex(
            r"0 \longrightarrow \operatorname{ad} P_U \xrightarrow{\;\iota\;} \operatorname{At}(P_U) := TP_U/G \xrightarrow{\;a:=d\pi_U\;} TM_U \longrightarrow 0, \qquad "
            r"\iota(F_A(X,Y)) = [\sigma_{\mathbf{A}}(X),\sigma_{\mathbf{A}}(Y)] - \sigma_{\mathbf{A}}([X,Y])",
            font_size=17, color=PURPLE_SYN
        ).next_to(hdr9, DOWN, buff=0.12).align_to(hdr9, LEFT)
        self.add_fixed_in_frame_mobjects(hdr9, at_top)
        self.play(FadeIn(hdr9), Write(at_top), run_time=1.1)

        em_panel = RoundedRectangle(width=5.7, height=3.35, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.50)
        em_tex = MathTex(
            r"\mathbf{Def\;4.13\;(Coupling\;Emergence\;Functional):}\\[4pt]"
            r"\Delta_{\text{emerg}}^{\mathcal{I}}(\Gamma;\mathcal{D}) := \mathcal{I}(\mathbf{A}) - \sum_{k=1}^N \mathcal{I}(A_0+a_k) + (N-1)\mathcal{I}(A_0)\\[5pt]"
            r"\bullet\;\Delta_{\text{emerg}}^{\mathcal{I}} < 0:\;\text{Sub-Additive Binding}\\[3pt]"
            r"\bullet\;\Delta_{\text{emerg}}^{\mathcal{I}} = 0:\;\text{Uncoupled Additive Baseline}\\[3pt]"
            r"\bullet\;\mathbf{\Delta_{\text{emerg}}^{\mathcal{I}} > 0:\;Super\text{-}Additive\;Holoform!}",
            font_size=15, color=WHITE
        ).move_to(em_panel)

        b_axes = Axes(
            x_range=[-2.3, 2.3, 1], y_range=[0, 9.2, 4],
            x_length=5.0, y_length=2.8,
            axis_config={"include_tip": True, "color": GREY_B}
        ).move_to(RIGHT * 3.15 + DOWN * 0.60)
        b_hdr = MathTex(r"\text{Thm 4.15: }\mathcal{I}(\mathbf{A}) \ge 4\pi^2 |Q_{\text{top}}(\mathbf{A})|\;\;(*F_A = \pm F_A)", font_size=17, color=HOLO_GOLD).next_to(b_axes, UP, buff=0.08)

        b_cone = b_axes.plot_line_graph(x_values=[-2, -1, 0, 1, 2], y_values=[8, 4, 0, 4, 8], line_color=PURPLE_SYN, vertex_dot_radius=0.08, stroke_width=3.5)
        inst_dot = Dot(b_axes.c2p(1, 5.2), color=HOLO_GOLD, radius=0.11)
        inst_lbl = MathTex(r"\text{Holoform }(|Q_{\text{top}}|=1)", font_size=16, color=HOLO_GOLD).next_to(inst_dot, UP + LEFT, buff=0.06)

        lean4_foot = MathTex(
            r"\text{Lean 4 (\texttt{GaugeCurvature \& PartAExpansions}): }\; "
            r"\texttt{couplingEmergence2\_zero\_of\_decoupled} \;\wedge\; "
            r"4\pi^2 Q_{\text{top}} \le \frac{1}{4}\|F_A \mp *F_A\|^2 + 4\pi^2 Q_{\text{top}}",
            font_size=15, color=GREEN_C
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(em_panel), Write(em_tex),
            Create(b_axes), Write(b_hdr), Create(b_cone),
            FadeIn(inst_dot, scale=1.4), Write(inst_lbl), Write(lean4_foot),
            run_time=1.9
        )
        self.wait(0.7)

        self.play(FadeOut(VGroup(hdr9, at_top, em_panel, em_tex, b_axes, b_hdr, b_cone, inst_dot, inst_lbl, lean4_foot)), run_time=0.8)



# =============================================================================
# SCENE: Ch4_Act10_11_Zeitkorn_Grid (Act 10)
# =============================================================================
class Ch4_Act10_11_Zeitkorn_Grid(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr10 = Text(
            "Act X (Secs. 4.3.4-4.3.6): Pushout Functor YF_model & Zeitkorn Chronometry",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        yf_top = MathTex(
            r"YF_{\text{model}}(\mathfrak{f}) := B \amalg_{C_0} \mathfrak{f}^{\otimes r}\;\;(\text{Def 4.19}), \qquad "
            r"\mathfrak{f}_n := (YF_{\text{model}})^n(\mathfrak{f}_0), \qquad "
            r"\delta t_n := \tau(n+1) - \tau(n) > 0\;\;(\text{Def 4.20})",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr10, DOWN, buff=0.12).align_to(hdr10, LEFT)
        self.add_fixed_in_frame_mobjects(hdr10, yf_top)
        self.play(FadeIn(hdr10), Write(yf_top), run_time=1.1)

        yf_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        yf_tex = MathTex(
            r"\mathbf{Def\;4.19\;(Pushout\;Endofunctor\;YF_{\text{model}}):}\\[5pt]"
            r"\begin{matrix} "
            r"C_0 & \xrightarrow{\;\;u\;\;} & B \\ "
            r"\downarrow\scriptstyle v_{\mathfrak{f}} & \ulcorner & \downarrow \\ "
            r"\mathfrak{f}^{\otimes r} & \xrightarrow{\;\;\;\;} & YF_{\text{model}}(\mathfrak{f}) "
            r"\end{matrix}\\[8pt]"
            r"\mathbf{Thm\;4.18\;(Syntrixfunktor\;Counts,\;N\ge r):}\\"
            r"Z_{\text{sym}}=\binom{N}{r},\;\; Z_{k\text{-asym}}=k!\binom{N}{r}\binom{r}{k},\;\; Z_{\text{asym}}=\frac{N!}{(N-r)!}",
            font_size=15, color=WHITE
        ).move_to(yf_panel)

        ch_frame = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        ch_hdr = MathTex(r"\text{Fig 4.9: Emergent Discrete Chronometry }(\delta t_n)", font_size=18, color=ORANGE_GOLD).next_to(ch_frame.get_top(), DOWN, buff=0.14)

        f_steps = VGroup()
        for k in range(3):
            bx = RoundedRectangle(width=1.45, height=0.72, corner_radius=0.08, color=TEAL_BRIGHT, fill_opacity=0.22).move_to(RIGHT * (1.25 + k * 1.85) + DOWN * 0.35)
            tx = MathTex(rf"\mathfrak{{f}}_{k}", font_size=21, color=WHITE).move_to(bx)
            f_steps.add(VGroup(bx, tx))

        yf_steps = VGroup(*[Arrow(f_steps[k].get_right(), f_steps[k + 1].get_left(), color=HOLO_GOLD, buff=0.05, stroke_width=2.8) for k in range(2)])
        dt_arcs = VGroup(*[ArcBetweenPoints(f_steps[k].get_bottom(), f_steps[k + 1].get_bottom(), angle=0.45, color=ORANGE_GOLD) for k in range(2)])
        dt_lbls = VGroup(*[MathTex(rf"\delta t_{k}>0", font_size=16, color=ORANGE_GOLD).next_to(dt_arcs[k], DOWN, buff=0.06) for k in range(2)])

        # Live Accumulating Chronometric Clock t_N = \tau(N)
        tau_trk = ValueTracker(0.00)
        tau_lbl = MathTex(r"\text{Elapsed Physical Time } t_N = \sum \delta t_k = \tau(N) = ", font_size=16, color=HOLO_GOLD)
        tau_dec = DecimalNumber(0.00, num_decimal_places=2, font_size=16, color=HOLO_GOLD)
        tau_dec.add_updater(lambda m: m.set_value(tau_trk.get_value()))
        tau_row = VGroup(tau_lbl, tau_dec).arrange(RIGHT, buff=0.06).move_to(ch_frame.get_bottom() + UP * 0.28)

        self.play(
            Create(yf_panel), Write(yf_tex),
            Create(ch_frame), Write(ch_hdr),
            FadeIn(f_steps[0], tau_row),
            run_time=1.4
        )
        self.play(
            GrowArrow(yf_steps[0]), FadeIn(f_steps[1]),
            Create(dt_arcs[0]), Write(dt_lbls[0]),
            tau_trk.animate.set_value(1.25),
            run_time=0.8
        )
        self.play(
            GrowArrow(yf_steps[1]), FadeIn(f_steps[2]),
            Create(dt_arcs[1]), Write(dt_lbls[1]),
            tau_trk.animate.set_value(2.70),
            run_time=0.8
        )
        tau_dec.clear_updaters()
        self.wait(0.6)

        self.play(FadeOut(VGroup(
            hdr10, yf_top, yf_panel, yf_tex, ch_frame, ch_hdr,
            f_steps, yf_steps, dt_arcs, dt_lbls, tau_row
        )), run_time=0.8)



# =============================================================================
# SCENE: Act11_Secs_437438_3x3_Grid (Act 11)
# =============================================================================
class Act11_Secs_437438_3x3_Grid(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr11 = Text(
            "Act XI (Secs. 4.3.7-4.3.8): 3x3 Taxonomic Grid A_ik (Fig 4.10) & Affinity",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr11)
        self.play(FadeIn(hdr11), run_time=0.7)

        g_cells = VGroup()
        sing_boxes = VGroup()
        c_titles = [
            [r"A_{11}\\\text{Colim, Conf}", r"A_{12}\\\text{dim }F < \text{dim}", r"A_{13}\\\text{Colim, Met}"],
            [r"A_{21}\\\text{Lim, Conf}",   r"A_{22}\\\text{dim }F > \text{dim}", r"A_{23}\\\text{Lim, Conn}"],
            [r"A_{31}\\\text{Isog, Conf}",  r"A_{32}\\\text{Morita Eq}",  r"A_{33}\\\text{Conformal}"]
        ]
        for r_i in range(3):
            for c_i in range(3):
                is_s = (c_i == 1 and r_i in [0, 1])
                col_c = CRIMSON_RED if is_s else (ROYAL_BLUE if r_i == 2 else TEAL_BRIGHT)
                bx = RoundedRectangle(width=1.8, height=0.98, corner_radius=0.08, color=col_c, fill_opacity=0.22)
                bx.move_to(LEFT * (4.95 - c_i * 1.95) + UP * (0.95 - r_i * 1.12))
                tx = MathTex(c_titles[r_i][c_i], font_size=15, color=WHITE).move_to(bx)
                g_cells.add(VGroup(bx, tx))
                if is_s:
                    sing_boxes.add(bx)

        sing_outline = dashed_box(width=1.96, height=2.26, color=CRIMSON_RED, num_dashes=6).move_to(sing_boxes.get_center())

        aff_panel = RoundedRectangle(width=5.6, height=3.45, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.15 + DOWN * 0.15)
        aff_tex = MathTex(
            r"\mathbf{Def\;4.23\;(Affinitaetssyntrix\;Interface,\;SM\text{-}19):}\\[5pt]"
            r"\beta \in \prod_{\gamma=0}^K \prod_{\lambda=1}^L \operatorname{Bil}_{\le 1}\!\left(F_\gamma(\mathcal{S}),\, \mathcal{B};\, \mathbb{R}\right)\\[5pt]"
            r"\lim_{n\to\infty} \|\beta_{\gamma,\lambda}^{(n)} - \beta_{\gamma,\lambda}^\infty\|_{\text{op}} = 0\\[5pt]"
            r"\mathbf{Two\text{-}Sided\;Non\text{-}Degeneracy\;on\;F_0\cong P^U:}\\"
            r"T_\beta: F_0 \to \mathcal{B}^*,\;\; S_\beta: \mathcal{B} \to F_0^* \implies "
            r"\ker T_\beta = \{0\} \;\wedge\; \ker S_\beta = \{0\}",
            font_size=15, color=WHITE
        ).move_to(aff_panel)

        thm422_foot = MathTex(
            r"\text{Thm 4.22 (Singularity Classification): }\; "
            r"A_{12}\text{ (Dimension Compression) \& }A_{22}\text{ (Dimension Inflation) are Singular!}",
            font_size=18, color=CRIMSON_RED
        ).to_edge(DOWN, buff=0.20)

        self.play(FadeIn(g_cells, lag_ratio=0.05), Create(sing_outline), Create(aff_panel), Write(aff_tex), Write(thm422_foot), run_time=1.8)
        self.play(sing_boxes.animate.set_fill(CRIMSON_RED, opacity=0.65), rate_func=rate_functions.there_and_back, run_time=1.1)
        self.wait(0.7)

        self.play(FadeOut(VGroup(hdr11, g_cells, sing_outline, aff_panel, aff_tex, thm422_foot)), run_time=0.8)



# =============================================================================
# SCENE: Ch4_Act12_Synthesis (Act 12)
# =============================================================================
class Ch4_Act12_Synthesis(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr12 = Text(
            "Act XII (Secs. 4.4-4.6): Abelian Sanity Check & Ch. 4 Synthesis (Fig 4.11)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr12)
        self.play(FadeIn(hdr12), run_time=0.7)

        s4_nodes = VGroup()
        s4_specs = [
            (r"\mathbf{1.\;Coupled\;Connection}\\\mathbf{A}=A_0+\sum a_k+a_{\text{int}}", ROYAL_BLUE, LEFT * 4.3 + UP * 1.45),
            (r"\mathbf{2.\;Curvature\;Residual}\\\mathbf{\Omega}_{\text{int}}^{\mathcal{D}}=F_A-\sum\mathcal{F}_k^{(A_0)}", TEAL_BRIGHT, ORIGIN + UP * 1.45),
            (r"\mathbf{3.\;Interaction\;Density}\\g_E=\frac{1}{2}\|\mathbf{\Omega}_{\text{int}}^{\mathcal{D}}\|^2", ORANGE_GOLD, RIGHT * 4.3 + UP * 1.45),
            (r"\mathbf{4.\;Slice\;Totality}\\T0\simeq\mathcal{E}_{\text{syn}}/\mathbf{y}(U_{\mathsf{G}})", ROYAL_BLUE, LEFT * 4.3 + DOWN * 0.25),
            (r"\mathbf{5.\;Enyphane\;Flow}\\\Phi_t^X\in\operatorname{Diff}(\mathcal{M})", TEAL_BRIGHT, ORIGIN + DOWN * 0.25),
            (r"\mathbf{6.\;Zeitkorn\;Clock}\\\delta t_n=\tau(n+1)-\tau(n)", HOLO_GOLD, RIGHT * 4.3 + DOWN * 0.25),
        ]
        for t_s, c_s, p_s in s4_specs:
            bx = RoundedRectangle(width=3.5, height=0.95, corner_radius=0.1, color=c_s, fill_opacity=0.20).move_to(p_s)
            tx = MathTex(t_s, font_size=16, color=WHITE).move_to(bx)
            s4_nodes.add(VGroup(bx, tx))

        s4_edges = VGroup(
            Arrow(s4_nodes[0].get_right(), s4_nodes[1].get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s4_nodes[1].get_right(), s4_nodes[2].get_left(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s4_nodes[0].get_bottom(), s4_nodes[3].get_top(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s4_nodes[1].get_bottom(), s4_nodes[4].get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s4_nodes[2].get_bottom(), s4_nodes[5].get_top(), color=ORANGE_GOLD, buff=0.06, stroke_width=2.5),
            DashedLine(s4_nodes[3].get_right(), s4_nodes[4].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16),
            DashedLine(s4_nodes[4].get_right(), s4_nodes[5].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16)
        )

        fin4_box = RoundedRectangle(width=12.0, height=1.65, corner_radius=0.12, color=HOLO_GOLD, fill_opacity=0.14).to_edge(DOWN, buff=0.20)
        fin4_tex = MathTex(
            r"\bullet\;\text{Sec. 4.5 Abelian }\mathrm{U}(1)\text{ Collapse Check: }\; "
            r"G=\mathrm{U}(1) \implies [a_i, a_j]\equiv 0 \implies \mathbf{\Omega}_{\text{int}}^{\mathcal{D}} = da_{\text{int}}\;"
            r"(\text{Vanishes if }a_{\text{int}}=0!)\\[4pt]"
            r"\bullet\;\text{Flat Vacuum Baseline Check: }\; F_{A_0}=0,\; a_k=0,\; a_{\text{int}}=0 \implies "
            r"\mathcal{I}(\mathbf{A})=0 \;\wedge\; \Delta_{\text{emerg}}^{\mathcal{I}} = 0\\[4pt]"
            r"\bullet\;\mathbf{Dialectical\;Ascent\;to\;Chapter\;5:}\;\text{Lift single-stratum toposes into the Ambient }(\infty,1)\text{-Topos }\mathcal{X}_{\text{syn}}\text{ \& Metroplex Towers}",
            font_size=15, color=HOLO_GOLD
        ).move_to(fin4_box)

        self.play(FadeIn(s4_nodes, lag_ratio=0.08), Create(s4_edges), run_time=1.8)
        self.play(Create(fin4_box), Write(fin4_tex), run_time=1.8)
        self.play(fin4_box.animate.set_stroke(WHITE, width=4), rate_func=rate_functions.there_and_back, run_time=1.0)
        self.wait(2.5)


