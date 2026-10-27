from manim import *
import numpy as np


class Chapter1UltimateUpgraded(ThreeDScene):
    def construct(self):
        # =====================================================================
        # STANDARDIZED BOOK COLOR PALETTE (MATCHING LATEX PREAMBLE)
        # =====================================================================
        ROYAL_BLUE = "#4169E1"     # Stratum A: Foundational Math / Prädikatrix P_nn
        TEAL_BRIGHT = "#20B2AA"    # Stratum B: Derived Proofs / Dialektik D_nn / Sieves
        ORANGE_GOLD = "#FFA500"    # Stratum C: Reconstruction Map R / Koordination K_n
        CRIMSON_RED = "#DC143C"    # Epistemic Firewall / Antinomies / Non-Boolean Gap
        HOLO_GOLD = "#FFD700"      # Holoform Equalizer / Universalquantor / Completeness
        PURPLE_SYN = "#9370DB"     # Hyperdoctrine / Aufhebung Cylinder / Lawvere-Tierney
        SLATE_GREY = "#708090"     # Stratum D: Historical Exegesis / Structural Framing

        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        # =====================================================================
        # ACT I (INTRO): QUINT-AXIAL PROVENANCE & 4-STRATUM FIREWALL (FIG 1.1)
        # =====================================================================
        hdr1 = Text(
            "Act I (Intro): Quint-Axial Provenance & 4-Stratum Epistemic Firewall",
            font_size=21, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        claim_eq = MathTex(
            r"\mathsf{ClaimType}(c) := \big(S(c),\; T(c),\; R(c),\; V(c),\; E_p(c)\big) "
            r"\in \mathsf{AdmissibleClaims} \subsetneq S\times T\times R\times V\times E_p",
            font_size=18, color=WHITE
        ).next_to(hdr1, DOWN, buff=0.12).align_to(hdr1, LEFT)
        self.add_fixed_in_frame_mobjects(hdr1, claim_eq)
        self.play(Write(hdr1), Write(claim_eq), run_time=1.2)

        # 4-Stratum Architecture Boxes (Figure 1.1)
        box_A = RoundedRectangle(width=5.3, height=1.15, corner_radius=0.12, color=ROYAL_BLUE, fill_opacity=0.18).move_to(LEFT * 3.1 + UP * 1.0)
        txt_A = VGroup(
            Text("Stratum A: Foundational Mathematics", font_size=17, color=ROYAL_BLUE),
            MathTex(r"\mathcal{E}_{\text{syn}},\; (\mathbf{Ban}_{\le 1},\widehat{\otimes}_\pi),\; \mathcal{O}_{\text{syn}},\; \mathcal{X}_{\text{syn}}", font_size=18)
        ).arrange(DOWN, buff=0.05).move_to(box_A)

        box_B = RoundedRectangle(width=5.3, height=1.15, corner_radius=0.12, color=TEAL_BRIGHT, fill_opacity=0.18).move_to(RIGHT * 3.1 + UP * 1.0)
        txt_B = VGroup(
            Text("Stratum B: Derived Logic & Proofs", font_size=17, color=TEAL_BRIGHT),
            MathTex(r"\mathcal{L}_{\text{iMSL}}\text{ Sequents},\; \mathsf{Hol}(\mathcal{U},\mathbf{P}),\; \kappa < 1", font_size=18)
        ).arrange(DOWN, buff=0.05).move_to(box_B)

        box_C = RoundedRectangle(width=5.3, height=1.15, corner_radius=0.12, color=ORANGE_GOLD, fill_opacity=0.18).move_to(LEFT * 3.1 + DOWN * 1.35)
        txt_C = VGroup(
            Text("Stratum C: Reconstruction Map R", font_size=17, color=ORANGE_GOLD),
            MathTex(r"\mathcal{R}: \mathsf{HeimVocabulary} \rightsquigarrow \mathsf{MathStructures}", font_size=17)
        ).arrange(DOWN, buff=0.05).move_to(box_C)

        box_D = RoundedRectangle(width=5.3, height=1.15, corner_radius=0.12, color=SLATE_GREY, fill_opacity=0.18).move_to(RIGHT * 3.1 + DOWN * 1.35)
        txt_D = VGroup(
            Text("Stratum D: Historical Exegesis (2000)", font_size=17, color=GREY_B),
            MathTex(r"\text{Heim Manuscripts (SM Eqs. 1--100a)}", font_size=17)
        ).arrange(DOWN, buff=0.05).move_to(box_D)

        arr_AB = Arrow(box_A.get_right(), box_B.get_left(), color=ROYAL_BLUE, buff=0.08, stroke_width=3.0)
        lbl_AB = MathTex(r"\mathbf{A}\vdash\mathbf{B}", font_size=18, color=ROYAL_BLUE).next_to(arr_AB, UP, buff=0.04)
        arr_DC = DashedLine(box_D.get_left(), box_C.get_right(), color=SLATE_GREY, stroke_width=2.2).add_tip(tip_length=0.16)
        arr_CA = Arrow(box_C.get_top(), box_A.get_bottom(), color=ORANGE_GOLD, buff=0.08, stroke_width=2.6)
        lbl_CA = MathTex(r"\mathcal{R}", font_size=17, color=ORANGE_GOLD).next_to(arr_CA, LEFT, buff=0.05)

        fw_line = DashedLine(LEFT * 6.4 + DOWN * 0.18, RIGHT * 6.4 + DOWN * 0.18, color=CRIMSON_RED, stroke_width=3.8)
        fw_tag = MathTex(
            r"\text{EPISTEMIC FIREWALL: }\;\mathbf{D},\mathbf{C} \nvdash \mathbf{A},\mathbf{B}",
            font_size=18, color=CRIMSON_RED
        ).move_to(DOWN * 0.18 + RIGHT * 2.1).add_background_rectangle(color=BLACK, opacity=0.85, buff=0.06)

        act1_foot = MathTex(
            r"\mathbf{A}\text{-Mathematical Validity} \;\not\Rightarrow_{\text{arch}}\; "
            r"\mathbf{C}\text{-Physical Hypothesis} \;\not\Rightarrow_{\text{arch}}\; "
            r"\mathbf{E}\text{-Empirical Confirmation}",
            font_size=19, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            FadeIn(box_A, txt_A, box_B, txt_B, box_C, txt_C, box_D, txt_D),
            GrowArrow(arr_AB), Write(lbl_AB), Create(arr_DC), GrowArrow(arr_CA), Write(lbl_CA),
            run_time=1.6
        )
        self.play(Create(fw_line), FadeIn(fw_tag), Write(act1_foot), run_time=1.3)

        # Illicit upward premise transfer blocked by Firewall
        illicit_arr = Arrow(box_D.get_top(), box_B.get_bottom(), color=CRIMSON_RED, buff=0.08, stroke_width=3.8)
        block_x = MathTex(r"\times", font_size=50, color=CRIMSON_RED).move_to(illicit_arr.get_center())
        self.play(GrowArrow(illicit_arr), run_time=0.5)
        self.play(FadeIn(block_x, scale=1.3), run_time=0.4)
        self.play(FadeOut(illicit_arr, block_x), run_time=0.5)
        self.wait(0.5)

        self.play(
            FadeOut(VGroup(
                hdr1, claim_eq, box_A, txt_A, box_B, txt_B, box_C, txt_C, box_D, txt_D,
                arr_AB, lbl_AB, arr_DC, arr_CA, lbl_CA, fw_line, fw_tag, act1_foot
            )),
            run_time=0.8
        )

        # =====================================================================
        # ACT II (INTRO): CRISIS OF BIVALENCE & CARNAPIAN FRAMEWORKS (CARNAP 1.1)
        # =====================================================================
        hdr2 = Text(
            "Act II (Intro): Crisis of Bivalent Reductionism & Carnapian Frameworks",
            font_size=21, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        carnap_eq = MathTex(
            r"\text{Carnap 1.1 (Relativized Frameworks): }\; "
            r"U \not\Vdash \phi \vee \neg\phi \;\nRightarrow\; U \Vdash \bot, \qquad "
            r"\mathcal{E}_{\text{syn}} := \mathbf{Sh}(\mathbf{Ctx}_{\text{adm}}^{\text{sk}}, J_{\text{syn}})",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr2, DOWN, buff=0.12).align_to(hdr2, LEFT)
        self.add_fixed_in_frame_mobjects(hdr2, carnap_eq)
        self.play(FadeIn(hdr2), Write(carnap_eq), run_time=1.1)

        # Left Panel: Continuous Context Wave vs Binary {0,1} Sieve with Antinomy Spikes
        w_axes = Axes(
            x_range=[-3.2, 3.2, 1], y_range=[-1.8, 1.8, 1],
            x_length=5.5, y_length=3.0,
            axis_config={"color": GREY_C, "include_tip": True}
        ).move_to(LEFT * 3.1 + DOWN * 0.5)
        w_hdr = MathTex(r"\text{Continuous Reality vs. Binary Sieve }\{0,1\}", font_size=17, color=ROYAL_BLUE).next_to(w_axes, UP, buff=0.06)

        c_wave = w_axes.plot(lambda x: 1.25 * np.sin(1.4 * x) * np.cos(0.6 * x), x_range=[-2.8, 2.8], color=ROYAL_BLUE, stroke_width=3.8)
        step_w = w_axes.plot(
            lambda x: 1.35 if (np.sin(1.4 * x) * np.cos(0.6 * x)) >= 0 else -1.35,
            x_range=[-2.8, 2.8], color=CRIMSON_RED, stroke_width=2.8, use_smoothing=False
        )
        spikes = VGroup(*[
            Line(w_axes.c2p(zx, -1.45), w_axes.c2p(zx, 1.45), color=HOLO_GOLD, stroke_width=4.0)
            for zx in [-2.41, 0.0, 2.41]
        ])

        # Right Panel: Tripartite Mathematical Reconstruction
        tri_box = RoundedRectangle(width=5.8, height=3.3, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.5)
        tri_tex = MathTex(
            r"\mathbf{Tripartite\;Reconstruction\;of\;Chapter\;1:}\\[4pt]"
            r"1.\;\mathbf{Categorical\;Sheaf\;Topos:}\;\mathcal{E}_{\text{syn}} = \mathbf{Sh}(\mathbf{Ctx}_{\text{adm}}^{\text{sk}}, J_{\text{syn}})\\[4pt]"
            r"2.\;\mathbf{Typed\;Extensional\;Mereology:}\;\mathfrak{M}_{\text{asp}}(U)\;\&\;t\text{-Norm }\chi\\[4pt]"
            r"3.\;\mathbf{Fischer\text{--}Servi\;Modal\;Logic\;\mathcal{L}_{\text{iMSL}}:}\;S(x);\Gamma\vdash^k\phi\\[4pt]"
            r"\bullet\;\text{Friedman Relativized }\textit{A Priori}\text{ + Husserl }\textit{Abschattungen}",
            font_size=15, color=WHITE
        ).move_to(tri_box)

        act2_foot = MathTex(
            r"\text{Reflexive Abstraction (SM, p. 6): }\; "
            r"\text{Isolate Structural Invariants }(\textit{Konnexreflexionen})\text{ Across Subjective Aspects }S",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(Create(w_axes), Write(w_hdr), Create(c_wave), run_time=1.3)
        self.play(TransformFromCopy(c_wave, step_w), FadeIn(spikes, scale=1.2), Create(tri_box), Write(tri_tex), Write(act2_foot), run_time=1.7)
        self.wait(0.7)

        self.play(FadeOut(VGroup(hdr2, carnap_eq, w_axes, w_hdr, c_wave, step_w, spikes, tri_box, tri_tex, act2_foot)), run_time=0.8)

        # =====================================================================
        # ACT III (SECS 1.1.1–1.1.2): PRÄDIKATRIX (SM-1), DIALEKTIK (SM-2) & CIPHERS
        # =====================================================================
        hdr3 = Text(
            "Act III (Secs. 1.1.1-1.1.2): Praedikatrix (SM-1), Dialektik (SM-2) & Ciphers",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm12_top = MathTex(
            r"f_q \equiv \begin{pmatrix} a \\ f \\ b \end{pmatrix}_q,\;\; "
            r"P_{nn} \equiv z_n; \begin{bmatrix}\begin{pmatrix} a \\ f \\ b \end{pmatrix}_q\end{bmatrix}_n\;(\text{SM-1}), \qquad "
            r"d_q \equiv \begin{pmatrix} \alpha \\ d \\ \beta \end{pmatrix}_q,\;\; "
            r"D_{nn} \equiv \zeta_n; \begin{bmatrix}\begin{pmatrix} \alpha \\ d \\ \beta \end{pmatrix}_q\end{bmatrix}_n\;(\text{SM-2})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr3, DOWN, buff=0.12).align_to(hdr3, LEFT)
        self.add_fixed_in_frame_mobjects(hdr3, sm12_top)
        self.play(FadeIn(hdr3), Write(sm12_top), run_time=1.1)

        a_trk, f_trk, b_trk = ValueTracker(-1.45), ValueTracker(0.40), ValueTracker(1.55)
        al_trk, d_trk, be_trk = ValueTracker(-1.25), ValueTracker(0.65), ValueTracker(1.35)

        p_nl = NumberLine(x_range=[-2.2, 2.2, 1], length=4.6, include_numbers=True, font_size=16).move_to(LEFT * 3.2 + UP * 0.3)
        d_nl = NumberLine(x_range=[-2.2, 2.2, 1], length=4.6, include_numbers=True, font_size=16).move_to(RIGHT * 3.2 + UP * 0.3)

        p_bar = always_redraw(lambda: Line(p_nl.n2p(a_trk.get_value()), p_nl.n2p(b_trk.get_value()), color=ROYAL_BLUE, stroke_width=15, stroke_opacity=0.65))
        p_pt = always_redraw(lambda: Dot(p_nl.n2p(f_trk.get_value()), color=HOLO_GOLD, radius=0.10))
        d_bar = always_redraw(lambda: Line(d_nl.n2p(al_trk.get_value()), d_nl.n2p(be_trk.get_value()), color=TEAL_BRIGHT, stroke_width=15, stroke_opacity=0.65))
        d_pt = always_redraw(lambda: Dot(d_nl.n2p(d_trk.get_value()), color=WHITE, radius=0.10))

        # Live 3x1 Matrix Column Readouts
        p_matrix_live = always_redraw(lambda: MathTex(
            rf"\begin{{pmatrix}} a_1 = {a_trk.get_value():.2f} \\ f_1 = {f_trk.get_value():.2f} \\ b_1 = {b_trk.get_value():.2f} \end{{pmatrix}}",
            font_size=24, color=ROYAL_BLUE
        ).move_to(LEFT * 3.2 + DOWN * 1.45))

        d_matrix_live = always_redraw(lambda: MathTex(
            rf"\begin{{pmatrix}} \alpha_1 = {al_trk.get_value():.2f} \\ d_1 = {d_trk.get_value():.2f} \\ \beta_1 = {be_trk.get_value():.2f} \end{{pmatrix}}",
            font_size=24, color=TEAL_BRIGHT
        ).move_to(RIGHT * 3.2 + DOWN * 1.45))

        ciph_foot = MathTex(
            r"\text{Evaluative Ciphers: }\; z_n \in \operatorname{Isom}(P^U),\;\; \zeta_n \in \operatorname{Isom}(D^U), \qquad "
            r"C' = c ; C\;\text{ (Orientation Flip }c\text{ \& Band Permutation }C\text{)}",
            font_size=18, color=ORANGE_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(p_nl), Create(d_nl),
            FadeIn(p_bar, p_pt, d_bar, d_pt, p_matrix_live, d_matrix_live),
            Write(ciph_foot), run_time=1.5
        )
        # 1. Continuous evaluation shift
        self.play(f_trk.animate.set_value(1.15), d_trk.animate.set_value(-0.60), run_time=1.3, rate_func=rate_functions.ease_in_out_sine)
        # 2. Cipher orientation flip
        self.play(
            a_trk.animate.set_value(-1.55), b_trk.animate.set_value(1.45), f_trk.animate.set_value(-1.10),
            al_trk.animate.set_value(-1.35), be_trk.animate.set_value(1.25), d_trk.animate.set_value(0.80),
            run_time=1.4, rate_func=rate_functions.ease_in_out_sine
        )
        # 3. Degenerate classical Boolean collapse (a_q = f_q = b_q) & restoration
        self.play(a_trk.animate.set_value(0.55), f_trk.animate.set_value(0.55), b_trk.animate.set_value(0.55), run_time=1.1)
        self.play(a_trk.animate.set_value(-1.45), b_trk.animate.set_value(1.55), f_trk.animate.set_value(0.40), run_time=1.0)

        self.remove(p_bar, p_pt, d_bar, d_pt, p_matrix_live, d_matrix_live)
        self.play(FadeOut(VGroup(hdr3, sm12_top, p_nl, d_nl, ciph_foot)), run_time=0.8)

        # =====================================================================
        # ACT IV (SEC 1.1.3): KOORDINATION (SM-3) & ASPECT COMPASS (SM-4, FIG 1.2)
        # =====================================================================
        hdr4 = Text(
            "Act IV (Sec. 1.1.3): Koordination (SM-3) & Complete Aspect Compass (SM-4)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm3_top = MathTex(
            r"K_n \equiv E_n F(\zeta_n, z_n)\;\; (\text{SM-3}), \qquad "
            r"E_n \equiv [\chi_q]_n \equiv \left[(y\,\chi\,r)_q^T\right]_n \quad (\text{Imprinting / }\textit{Praegung})",
            font_size=18, color=ORANGE_GOLD
        ).next_to(hdr4, DOWN, buff=0.12).align_to(hdr4, LEFT)
        self.add_fixed_in_frame_mobjects(hdr4, sm3_top)
        self.play(FadeIn(hdr4), Write(sm3_top), run_time=1.1)

        # Left Side: Figure 1.2 Geometric Aspectual Matrix Compass
        comp_c = LEFT * 3.1 + DOWN * 0.45
        polar_grid = VGroup(*[
            DashedVMobject(Circle(radius=r, color=GREY_E, stroke_width=1.1).move_to(comp_c), num_dashes=26)
            for r in [0.85, 1.65, 2.45]
        ])
        spokes = VGroup(*[
            Line(comp_c, comp_c + 2.50 * np.array([np.cos(k * PI / 4), np.sin(k * PI / 4), 0]), color=GREY_E, stroke_width=0.9)
            for k in range(8)
        ])
        c_angles = [30 * DEGREES, 150 * DEGREES, 270 * DEGREES]
        axes_grp = VGroup()
        bands_grp = VGroup()
        axis_names = [r"q_1\text{ (Temp)}", r"q_2\text{ (Bright)}", r"q_3"]
        for idx, ang in enumerate(c_angles):
            u_vec = np.array([np.cos(ang), np.sin(ang), 0])
            axes_grp.add(Arrow(comp_c, comp_c + u_vec * 2.7, color=ROYAL_BLUE, buff=0, stroke_width=3.0))
            bands_grp.add(Line(comp_c + u_vec * 0.90, comp_c + u_vec * 2.25, color=ROYAL_BLUE, stroke_width=13, stroke_opacity=0.45))
            axes_grp.add(MathTex(axis_names[idx], font_size=17, color=BLUE_B).move_to(comp_c + u_vec * 2.95))

        dial_ring = Ellipse(width=4.6, height=2.8, color=TEAL_BRIGHT, stroke_width=2.8).move_to(comp_c)
        lens_core = Circle(radius=0.55, color=ORANGE_GOLD, fill_color=ORANGE_GOLD, fill_opacity=0.28, stroke_width=3.2).move_to(comp_c)
        lens_tex = MathTex(r"K_n", font_size=22, color=HOLO_GOLD).move_to(comp_c)

        f1_trk, f2_trk = ValueTracker(0.75), ValueTracker(0.55)
        d1_trk, d2_trk = ValueTracker(0.85), ValueTracker(0.45)
        u_ax1 = np.array([np.cos(c_angles[0]), np.sin(c_angles[0]), 0])
        u_ax2 = np.array([np.cos(c_angles[1]), np.sin(c_angles[1]), 0])

        f1_pt = always_redraw(lambda: Dot(comp_c + u_ax1 * (0.90 + 1.35 * f1_trk.get_value()), color=CRIMSON_RED, radius=0.09))
        f2_pt = always_redraw(lambda: Dot(comp_c + u_ax2 * (0.90 + 1.35 * f2_trk.get_value()), color=CRIMSON_RED, radius=0.09))
        d1_pt = always_redraw(lambda: Dot(comp_c + np.array([2.3 * np.cos(d1_trk.get_value() * PI), 1.4 * np.sin(d1_trk.get_value() * PI), 0]), color=TEAL_BRIGHT, radius=0.09))
        d2_pt = always_redraw(lambda: Dot(comp_c + np.array([2.3 * np.cos(PI + d2_trk.get_value() * PI), 1.4 * np.sin(PI + d2_trk.get_value() * PI), 0]), color=TEAL_BRIGHT, radius=0.09))

        link_d1 = always_redraw(lambda: DashedLine(d1_pt.get_center(), comp_c, color=ORANGE_GOLD, stroke_width=1.8))
        link_d2 = always_redraw(lambda: DashedLine(d2_pt.get_center(), comp_c, color=ORANGE_GOLD, stroke_width=1.8))
        link_f1 = always_redraw(lambda: Arrow(comp_c, f1_pt.get_center(), color=CRIMSON_RED, buff=0.06, stroke_width=2.6))
        link_f2 = always_redraw(lambda: Arrow(comp_c, f2_pt.get_center(), color=CRIMSON_RED, buff=0.06, stroke_width=2.6))

        # Right Side: Banach Contraction Panel + Two-Level Coordination Card
        coord_card = RoundedRectangle(width=5.7, height=3.45, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.09).move_to(RIGHT * 3.15 + DOWN * 0.45)
        panel_hdr = MathTex(r"K^U : D^U \widehat{\otimes}_\pi P^U \longrightarrow C^U \; (\|K^U\|_{\text{op}}\le 1)", font_size=18, color=HOLO_GOLD).next_to(coord_card.get_top(), DOWN, buff=0.14)

        live_tensor_eq = always_redraw(lambda: MathTex(
            rf"K^U(d \otimes p) = \begin{{pmatrix}} ({d1_trk.get_value():.2f})({f1_trk.get_value():.2f}) \\ ({d2_trk.get_value():.2f})({f2_trk.get_value():.2f}) \end{{pmatrix}} = \begin{{pmatrix}} {d1_trk.get_value()*f1_trk.get_value():.2f} \\ {d2_trk.get_value()*f2_trk.get_value():.2f} \end{{pmatrix}}",
            font_size=18, color=WHITE
        ).move_to(coord_card.get_center() + UP * 0.50))

        coord_tex = MathTex(
            r"1.\;\mathbf{Chiffrenkoordination\;F(\zeta_n, z_n):}\;\text{Correlates }\zeta_n\text{ with }z_n\\"
            r"2.\;\mathbf{Koordinationsbaender\;E_n\equiv[(y\,\chi\,r)_q^T]_n:}\;\text{Imprints }d_q\text{ on }f_q",
            font_size=15, color=TEAL_BRIGHT
        ).move_to(coord_card.get_center() + DOWN * 0.65)

        sm4_full = MathTex(
            r"S \equiv \left[ D_{nn}\times K_n\times P_{nn} \right] \equiv "
            r"\left[ \zeta_n;\begin{bmatrix}\begin{pmatrix}\alpha\\d\\\beta\end{pmatrix}_q\end{bmatrix}_n \times "
            r"\begin{bmatrix}\begin{pmatrix}y\\\chi\\r\end{pmatrix}_q\end{bmatrix}_n F(\zeta_n,z_n) \times "
            r"z_n;\begin{bmatrix}\begin{pmatrix}a\\f\\b\end{pmatrix}_q\end{bmatrix}_n \right]\;\; (\text{SM-4})",
            font_size=17, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.18)

        self.play(
            FadeIn(polar_grid, spokes), Create(axes_grp), FadeIn(bands_grp), Create(dial_ring), Create(lens_core), Write(lens_tex),
            FadeIn(f1_pt, f2_pt, d1_pt, d2_pt), Create(link_d1), Create(link_d2), Create(link_f1), Create(link_f2),
            Create(coord_card), Write(panel_hdr), FadeIn(live_tensor_eq), Write(coord_tex), Write(sm4_full),
            run_time=1.8
        )
        self.play(
            f1_trk.animate.set_value(0.92), d1_trk.animate.set_value(0.95),
            f2_trk.animate.set_value(0.30), d2_trk.animate.set_value(0.80),
            run_time=1.8, rate_func=rate_functions.ease_in_out_sine
        )
        self.play(
            f1_trk.animate.set_value(0.45), d1_trk.animate.set_value(0.60),
            f2_trk.animate.set_value(0.88), d2_trk.animate.set_value(0.90),
            run_time=1.8, rate_func=rate_functions.ease_in_out_sine
        )
        self.wait(0.5)

        # Save a static miniature snapshot of the Aspect Compass for Act IX 3D Pullback
        compass_snapshot = VGroup(
            polar_grid.copy(), axes_grp.copy(), bands_grp.copy(), dial_ring.copy(), lens_core.copy(), lens_tex.copy(),
            f1_pt.copy(), f2_pt.copy(), d1_pt.copy(), d2_pt.copy(),
            link_d1.copy(), link_d2.copy(), link_f1.copy(), link_f2.copy()
        ).scale(0.48)

        self.remove(f1_pt, f2_pt, d1_pt, d2_pt, link_d1, link_d2, link_f1, link_f2, live_tensor_eq)
        self.play(
            FadeOut(VGroup(
                hdr4, sm3_top, polar_grid, spokes, axes_grp, bands_grp, dial_ring, lens_core, lens_tex,
                coord_card, panel_hdr, coord_tex, sm4_full
            )),
            run_time=0.8
        )

        # =====================================================================
        # ACT V (SECS 1.1.4–1.1.6): ASPEKTIVFELDER, 7 SUBSYSTEMS & QUANTOREN
        # =====================================================================
        hdr5 = Text(
            "Act V (Secs. 1.1.4-1.1.6): Aspektivfelder, 7 Subsystems & Quantor Hierarchy",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        asp_eq = MathTex(
            r"\mathfrak{A} \equiv \begin{pmatrix} \alpha ; S \\ p ; g \end{pmatrix}, \qquad "
            r"\operatorname{Compl}(\alpha, S) \subset \operatorname{Grp}(S) := \bigcup_{\alpha\in\operatorname{Gen}(S)} \operatorname{Compl}(\alpha, S)\;\; (\text{Def 1.3})",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr5, DOWN, buff=0.12).align_to(hdr5, LEFT)
        self.add_fixed_in_frame_mobjects(hdr5, asp_eq)
        self.play(FadeIn(hdr5), Write(asp_eq), run_time=1.1)

        # Left Panel: Proposition 1.2 (7 Nonempty Aspect Subsystems) & Syllogismen
        sub7_box = RoundedRectangle(width=5.7, height=3.3, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.5)
        sub7_tex = MathTex(
            r"\mathbf{Prop\;1.2\;(7\;Nonempty\;Aspect\;Subsystems):}\\[4pt]"
            r"\bullet\;\binom{3}{1}=3\text{ Single: }\{D_{nn}\},\; \{K_n\},\; \{P_{nn}\}\\[3pt]"
            r"\bullet\;\binom{3}{2}=3\text{ Two-Comp: }\{D_{nn},K_n\},\; \{K_n,P_{nn}\},\; \{D_{nn},P_{nn}\}\\[3pt]"
            r"\bullet\;\binom{3}{3}=1\text{ Total: }\{D_{nn},K_n,P_{nn}\} \implies \mathbf{7\text{ Supports}}\\[6pt]"
            r"\mathbf{Kategorien\;(\mathfrak{K})\;\&\;Syllogismen:}\\[3pt]"
            r"\text{Episyllogismus }(k\uparrow)\;\text{vs.}\;\text{Prosyllogismus }(k\downarrow)\;\text{on }\mathfrak{M}=\mathbf{AP}_0",
            font_size=15, color=WHITE
        ).move_to(sub7_box)

        # Right Panel: Proposition 1.4 & Theorem 1.5 (4-Tier Quantor Hierarchy)
        q4_box = RoundedRectangle(width=5.7, height=3.3, corner_radius=0.14, color=HOLO_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.15 + DOWN * 0.5)
        q4_tex = MathTex(
            r"\mathbf{Prop\;1.4\;(4\text{-}Tier\;Quantor\;Hierarchy,\;SM\;Eq.\;4):}\\[4pt]"
            r"1.\;\text{Monoquantor }Q_{\text{mono}}:\; (r=1,\; f=\operatorname{id})\;\text{ [Single Aspect]}\\[3pt]"
            r"2.\;\text{Discrete Polyquantor }Q_{\text{poly}}^{(r)}:\; (r>1,\; f=\operatorname{id})\\[3pt]"
            r"3.\;\text{Continuous Monoquantor }Q_{\text{mono}}^{(f)}:\; (r=1,\; f\neq\operatorname{id})\\[3pt]"
            r"4.\;\text{Continuous Polyquantor }Q_{\text{poly}}^{(B)}:\; (r>1,\; f\neq\operatorname{id})\\[4pt]"
            r"\longrightarrow\;\mathbf{Universalquantor\;\mathbf{U}}:\;\text{Invariant Across All Aspects!}",
            font_size=15, color=HOLO_GOLD
        ).move_to(q4_box)

        thm15_foot = MathTex(
            r"\text{Thm 1.5 \& Prop 1.5 (Polyquantor Apodiktizitaet): }\; "
            r"\text{Every Polyquantor contains at least one apodictic baseline term }a_i \in \mathfrak{M} = \mathbf{AP}_0",
            font_size=17, color=GREEN_C
        ).to_edge(DOWN, buff=0.20)

        self.play(Create(sub7_box), Write(sub7_tex), Create(q4_box), Write(q4_tex), Write(thm15_foot), run_time=1.8)
        self.wait(0.7)

        self.play(FadeOut(VGroup(hdr5, asp_eq, sub7_box, sub7_tex, q4_box, q4_tex, thm15_foot)), run_time=0.8)

        # =====================================================================
        # ACT VI (SECS 1.2.1–1.2.3): CATEGORY Ctx_adm^sk, NATURALITY & TOY MODEL
        # =====================================================================
        hdr6 = Text(
            "Act VI (Secs. 1.2.1-1.2.3): Category Ctx_adm^sk, Naturality & 2-Channel Toy",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        ban_top = MathTex(
            r"\|u\|_{X\widehat{\otimes}_\pi Y} := \inf\left\{\sum_{i=1}^\infty \|x_i\|_X\|y_i\|_Y \;\middle|\; u=\sum x_i\otimes y_i\right\}, \quad "
            r"\operatorname{Hom}_{\mathbf{Ban}_{\le 1}}(X\widehat{\otimes}_\pi Y, Z) \cong \operatorname{Hom}_{\mathbf{Ban}_{\le 1}}(X, \mathcal{L}(Y, Z))",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr6, DOWN, buff=0.12).align_to(hdr6, LEFT)
        self.add_fixed_in_frame_mobjects(hdr6, ban_top)
        self.play(FadeIn(hdr6), Write(ban_top), run_time=1.1)

        # Left Side: Proposition 1.8 Naturality Square
        sq_1 = RoundedRectangle(width=2.4, height=0.65, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.22).move_to(LEFT * 4.8 + UP * 0.5)
        sq_2 = RoundedRectangle(width=2.4, height=0.65, corner_radius=0.08, color=TEAL_BRIGHT, fill_opacity=0.22).move_to(LEFT * 1.5 + UP * 0.5)
        sq_3 = RoundedRectangle(width=2.4, height=0.65, corner_radius=0.08, color=ORANGE_GOLD, fill_opacity=0.22).move_to(LEFT * 4.8 + DOWN * 1.35)
        sq_4 = RoundedRectangle(width=2.4, height=0.65, corner_radius=0.08, color=HOLO_GOLD, fill_opacity=0.25).move_to(LEFT * 1.5 + DOWN * 1.35)

        st1 = MathTex(r"D^U\widehat{\otimes}_\pi P^U", font_size=18).move_to(sq_1)
        st2 = MathTex(r"D^V\widehat{\otimes}_\pi P^V", font_size=18).move_to(sq_2)
        st3 = MathTex(r"C^U", font_size=19).move_to(sq_3)
        st4 = MathTex(r"C^V", font_size=19, color=HOLO_GOLD).move_to(sq_4)

        nat_arrs = VGroup(
            Arrow(sq_1.get_right(), sq_2.get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(sq_3.get_right(), sq_4.get_left(), color=ORANGE_GOLD, buff=0.06, stroke_width=2.5),
            Arrow(sq_1.get_bottom(), sq_3.get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(sq_2.get_bottom(), sq_4.get_top(), color=HOLO_GOLD, buff=0.06, stroke_width=2.5)
        )
        nat_lbls = VGroup(
            MathTex(r"D(\alpha)\widehat{\otimes}_\pi P(\alpha)", font_size=15, color=ROYAL_BLUE).next_to(nat_arrs[0], UP, buff=0.04),
            MathTex(r"C(\alpha)=\alpha_C", font_size=15, color=ORANGE_GOLD).next_to(nat_arrs[1], DOWN, buff=0.04),
            MathTex(r"K^U", font_size=17, color=TEAL_BRIGHT).next_to(nat_arrs[2], LEFT, buff=0.05),
            MathTex(r"K^V", font_size=17, color=HOLO_GOLD).next_to(nat_arrs[3], RIGHT, buff=0.05)
        )

        # Right Side: 2-Channel Perceptual Toy with Live DecimalNumbers
        toy_panel = RoundedRectangle(width=5.6, height=3.25, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.09).move_to(RIGHT * 3.15 + DOWN * 0.45)
        toy_title = MathTex(r"\text{2-Channel Perceptual Toy }(P^U\cong\mathbb{R}^6,\; D^U\cong\mathbb{R}^6,\; C^U\cong\mathbb{R}^2)", font_size=16, color=ORANGE_GOLD).next_to(toy_panel.get_top(), DOWN, buff=0.12)
        toy_formula = MathTex(r"K^U(d\otimes p) = \begin{pmatrix} d_1\cdot f_1\text{ (Temp)} \\ d_2\cdot f_2\text{ (Bright)} \end{pmatrix}, \quad \|K^U\|_{\text{op}}\le 1", font_size=17, color=WHITE).move_to(toy_panel.get_center() + UP * 0.42)

        c1_trk, c2_trk = ValueTracker(0.52), ValueTracker(0.45)
        c1_lbl = MathTex(r"\text{Channel 1 Output } c_1 = d_1 f_1 = ", font_size=18, color=TEAL_BRIGHT)
        c1_dec = DecimalNumber(0.52, num_decimal_places=2, font_size=18, color=HOLO_GOLD)
        c1_dec.add_updater(lambda m: m.set_value(c1_trk.get_value()))
        c1_row = VGroup(c1_lbl, c1_dec).arrange(RIGHT, buff=0.08).move_to(toy_panel.get_center() + DOWN * 0.35)

        c2_lbl = MathTex(r"\text{Channel 2 Output } c_2 = d_2 f_2 = ", font_size=18, color=ROYAL_BLUE)
        c2_dec = DecimalNumber(0.45, num_decimal_places=2, font_size=18, color=HOLO_GOLD)
        c2_dec.add_updater(lambda m: m.set_value(c2_trk.get_value()))
        c2_row = VGroup(c2_lbl, c2_dec).arrange(RIGHT, buff=0.08).move_to(toy_panel.get_center() + DOWN * 0.90)

        act6_foot = MathTex(
            r"\text{Prop 1.8 (Eliminating Context Creep): }\; "
            r"C(\alpha)\circ K^V = K^U\circ(D(\alpha)\widehat{\otimes}_\pi P(\alpha)), \quad "
            r"\alpha_P(\mathcal{S}_P^V)\subseteq\mathcal{S}_P^U",
            font_size=18, color=GREEN_C
        ).to_edge(DOWN, buff=0.20)

        self.play(
            FadeIn(sq_1, st1, sq_2, st2, sq_3, st3, sq_4, st4),
            Create(nat_arrs), Write(nat_lbls),
            Create(toy_panel), Write(toy_title), Write(toy_formula),
            FadeIn(c1_row, c2_row), Write(act6_foot),
            run_time=1.8
        )
        self.play(c1_trk.animate.set_value(0.88), c2_trk.animate.set_value(0.74), run_time=1.5, rate_func=rate_functions.ease_in_out_sine)
        c1_dec.clear_updaters()
        c2_dec.clear_updaters()
        self.wait(0.5)

        self.play(
            FadeOut(VGroup(
                hdr6, ban_top, sq_1, st1, sq_2, st2, sq_3, st3, sq_4, st4, nat_arrs, nat_lbls,
                toy_panel, toy_title, toy_formula, c1_row, c2_row, act6_foot
            )),
            run_time=0.8
        )

        # =====================================================================
        # ACT VII (SECS 1.2.3 & 1.3): 3D PULLBACK IN l^infty & SUBCANONICAL SITE
        # =====================================================================
        hdr7 = Text(
            "Act VII (Secs. 1.2.3 & 1.3): 3D Pullback W = V1 x_U V2 & Subcanonical Site",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        pb_bot = MathTex(
            r"F^W := \{(x_1,x_2)\in F^{V_1}\oplus_\infty F^{V_2} \mid \alpha_F(x_1)=\beta_F(x_2)\}, \quad "
            r"(\sigma_C(c))_i^{(k)} := r_k^{-1}c_k, \quad "
            r"\mathbf{y}: \mathbf{Ctx}_{>0}^{\text{sk}} \hookrightarrow \mathcal{E}_{\text{syn}}",
            font_size=18, color=TEAL_BRIGHT
        ).to_edge(DOWN, buff=0.20)
        self.add_fixed_in_frame_mobjects(hdr7, pb_bot)
        self.play(FadeIn(hdr7), Write(pb_bot), run_time=1.1)

        self.move_camera(phi=62 * DEGREES, theta=-40 * DEGREES, run_time=1.6)

        cube_linf = Cube(side_length=2.2, fill_opacity=0.12, fill_color=ROYAL_BLUE, stroke_color=ROYAL_BLUE, stroke_width=2).move_to(np.array([-2.2, 0, 0]))
        diag_pb = Surface(
            lambda u, v: np.array([-2.2 + u, u, v]),
            u_range=[-1.1, 1.1], v_range=[-1.1, 1.1],
            resolution=(8, 8), fill_color=HOLO_GOLD, fill_opacity=0.55, stroke_color=ORANGE_GOLD, stroke_width=1.2
        )

        site_card = RoundedRectangle(width=5.8, height=2.8, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.12).to_corner(UR, buff=0.35).shift(DOWN * 0.6)
        site_tex = MathTex(
            r"\bullet\;\text{Prop 1.9: }\|K^W(u)\|_{C^W} = \max(\|K_1(u)\|,\|K_2(u)\|)\le 1\\[4pt]"
            r"\bullet\;\text{Def 1.10: }\dim P^U\ge 1 \implies \bot(U)=\operatorname{cl}_{J_{\text{syn}}}(\emptyset)=\emptyset\\[4pt]"
            r"\bullet\;\text{Prop 1.11: }\rho_F\circ\sigma_F = \operatorname{id}_{F^U},\;\;\|\sigma_F\|_{\text{op}}\le 1\\[4pt]"
            r"\bullet\;\text{Thm 1.12: Every }\mathbf{h}_X=\operatorname{Hom}(-,X)\text{ is a sheaf!}",
            font_size=15, color=WHITE
        ).move_to(site_card)
        self.add_fixed_in_frame_mobjects(site_card, site_tex)

        self.play(Create(cube_linf), Create(diag_pb), FadeIn(site_card, site_tex), run_time=1.6)
        self.play(Rotate(VGroup(cube_linf, diag_pb), angle=PI * 0.65, axis=OUT), run_time=2.0, rate_func=rate_functions.linear)

        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.2)
        self.play(FadeOut(VGroup(cube_linf, diag_pb, site_card, site_tex, hdr7, pb_bot)), run_time=0.8)

        # =====================================================================
        # ACT VIII (SEC 1.4): HEYTING SIEVE ALGEBRA & 3D HYPERDOCTRINE PRISM
        # =====================================================================
        hdr8 = Text(
            "Act VIII (Sec. 1.4): Heyting Sieve Classifier & 3D Hyperdoctrine Prism",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        heyt_bot = MathTex(
            r"\neg_J R := \{f:V\to U \mid f^*(R)=\emptyset\}, \quad "
            r"R\vee\neg_J R \neq \top_{\Omega(U)}, \quad "
            r"\exists_f \dashv f^* \dashv \forall_f, \quad "
            r"\mathbf{BC}_\exists: g^*\exists_f \xrightarrow{\sim} \exists_{\pi_1}\pi_2^*",
            font_size=17, color=ROYAL_BLUE
        ).to_edge(DOWN, buff=0.20)
        self.add_fixed_in_frame_mobjects(hdr8, heyt_bot)
        self.play(FadeIn(hdr8), Write(heyt_bot), run_time=1.0)

        # Phase 8A (2D): Outer Sieve Frame \Omega(U), Expanding Verification Sieve & Kripke Card
        omega_frame = RoundedRectangle(width=6.2, height=3.3, corner_radius=0.18, color=ROYAL_BLUE, fill_opacity=0.06, stroke_width=2).move_to(LEFT * 3.0 + DOWN * 0.45)
        r_sieve = ValueTracker(0.95)
        sieve_R = always_redraw(lambda: Circle(radius=r_sieve.get_value(), color=TEAL_BRIGHT, fill_color=TEAL_BRIGHT, fill_opacity=0.32, stroke_width=2.5).move_to(LEFT * 4.5 + DOWN * 0.45))
        sieve_negR = always_redraw(lambda: Circle(radius=1.95 - r_sieve.get_value(), color=ORANGE_GOLD, fill_color=ORANGE_GOLD, fill_opacity=0.28, stroke_width=2.5).move_to(LEFT * 1.5 + DOWN * 0.45))
        gap_box = RoundedRectangle(width=2.1, height=1.8, corner_radius=0.12, color=CRIMSON_RED).set_stroke(width=3.5).move_to(LEFT * 3.0 + DOWN * 0.45)
        gap_txt = VGroup(
            Text("Non-Boolean Gap", font_size=14, color=CRIMSON_RED),
            MathTex(r"R \vee \neg_J R \neq \top", font_size=16, color=CRIMSON_RED),
            MathTex(r"U \not\Vdash \phi \vee \neg\phi", font_size=16, color=HOLO_GOLD)
        ).arrange(DOWN, buff=0.05).move_to(gap_box)

        krip_card = RoundedRectangle(width=5.6, height=3.1, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.10).move_to(RIGHT * 3.2 + DOWN * 0.45)
        krip_tex = MathTex(
            r"\mathbf{Heyting\;Sieve\;Classifier\;\Omega(U)\;(Thm\;1.13):}\\[3pt]"
            r"S \le (R_1 \Rightarrow_J R_2) \;\Longleftrightarrow\; S \wedge R_1 \le R_2\\[4pt]"
            r"\mathbf{3\text{-}World\;Countermodel\;(w\le u,\, w\le v):}\\[3pt]"
            r"u\Vdash p,\; v\not\Vdash p \implies w\not\Vdash p \;\wedge\; w\not\Vdash\neg p \implies w\not\Vdash p\vee\neg p\\[4pt]"
            r"\mathbf{Beck\text{--}Chevalley\;(Prop\;1.14):}\; g^*\forall_f \xrightarrow{\sim} \forall_{\pi_1}\pi_2^*",
            font_size=15, color=WHITE
        ).move_to(krip_card)
        self.add_fixed_in_frame_mobjects(krip_card, krip_tex)

        self.play(Create(omega_frame), FadeIn(sieve_R, sieve_negR, gap_box, gap_txt), FadeIn(krip_card, krip_tex), run_time=1.5)
        self.play(r_sieve.animate.set_value(1.25), run_time=1.1, rate_func=rate_functions.ease_in_out_sine)
        self.play(r_sieve.animate.set_value(0.85), run_time=1.1, rate_func=rate_functions.ease_in_out_sine)

        self.remove(sieve_R, sieve_negR)
        self.play(FadeOut(VGroup(omega_frame, gap_box, gap_txt)), run_time=0.6)

        # Phase 8B (3D): Two-Tier Fibrational Hyperdoctrine Prism & \varepsilon-Amalgamation
        self.move_camera(phi=60 * DEGREES, theta=-46 * DEGREES, run_time=1.5)
        b_pts = [np.array([-2.3, -1.4, -1.1]), np.array([-3.8, 0.0, -1.1]), np.array([-2.3, 1.4, -1.1]), np.array([-0.8, 0.0, -1.1])]
        u_pts = [np.array([-2.3, -1.4, 1.0]), np.array([-3.8, 0.0, 1.0]), np.array([-2.3, 1.4, 1.0]), np.array([-0.8, 0.0, 1.0])]

        b_diam = Polygon(*b_pts, color=ROYAL_BLUE, fill_color=ROYAL_BLUE, fill_opacity=0.20)
        u_diam = Polygon(*u_pts, color=TEAL_BRIGHT, fill_color=TEAL_BRIGHT, fill_opacity=0.28)
        f_stalks = VGroup(*[DashedLine(b, u, color=HOLO_GOLD, stroke_width=2) for b, u in zip(b_pts, u_pts)])

        eps_trk = ValueTracker(0.75)
        sec_s1 = always_redraw(lambda: ParametricFunction(
            lambda t: np.array([-2.3 + t, 0.35 * np.sin(2 * t), 1.0 + eps_trk.get_value() * 0.45]),
            t_range=[-1.3, 1.3], color=ORANGE_GOLD, stroke_width=3.8
        ))
        sec_s2 = always_redraw(lambda: ParametricFunction(
            lambda t: np.array([-2.3 + t, 0.35 * np.sin(2 * t), 1.0 - eps_trk.get_value() * 0.45]),
            t_range=[-1.3, 1.3], color=CRIMSON_RED, stroke_width=3.8
        ))

        self.play(Create(b_diam), Create(f_stalks), Create(u_diam), Create(sec_s1), Create(sec_s2), run_time=1.5)
        self.play(eps_trk.animate.set_value(0.00), run_time=1.6, rate_func=rate_functions.ease_in_out_sine)
        self.remove(sec_s1, sec_s2)

        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.2)
        self.play(FadeOut(VGroup(b_diam, f_stalks, u_diam, krip_card, krip_tex, hdr8, heyt_bot)), run_time=0.8)

        # =====================================================================
        # ACT IX (SEC 1.5): SHEAF DESCENT, 3D HOLOFORM CRYSTAL & KOCHEN-SPECKER
        # =====================================================================
        hdr9 = Text(
            "Act IX (Sec. 1.5): Sheaf Descent, 3D Holoform Crystal & Kochen-Specker",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        hol_top = MathTex(
            r"\mathsf{Hol}_\varepsilon(\mathcal{U},\mathbf{A}) := \left\{s\in\prod\mathbf{A}(V_i) \;\middle|\; "
            r"\max_{i,j}\|\pi_{1,ij}^*s_i - \pi_{2,ij}^*s_j\| \le \varepsilon\right\}, \quad "
            r"\Gamma_\sigma := \sum_{i=1}^m \sigma_i^*(s_i)",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr9, DOWN, buff=0.12).align_to(hdr9, LEFT)
        act9_foot = MathTex(
            r"\text{Exact Descent (Thm 1.17): }\quad "
            r"d^0(s) = d^1(s) \;\Longleftrightarrow\; \operatorname{Def}_{\mathcal{U}}(s) = 0 "
            r"\;\Longleftrightarrow\; \exists!\,\Gamma \in \mathsf{Hol}(\mathcal{U},\mathbf{P})",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)
        self.add_fixed_in_frame_mobjects(hdr9, hol_top, act9_foot)
        self.play(FadeIn(hdr9), Write(hol_top), Write(act9_foot), run_time=1.1)

        # Left/Center 3D Zone: Miniature Aspect Compasses in V_1, V_2 & Emergent 3D Icosahedron
        comp_V1 = compass_snapshot.copy().move_to(LEFT * 3.8 + DOWN * 0.4)
        comp_V2 = compass_snapshot.copy().move_to(LEFT * 0.6 + DOWN * 0.4).set_color(TEAL_BRIGHT)
        disk_V1 = Circle(radius=1.55, color=ROYAL_BLUE, fill_opacity=0.22).move_to(LEFT * 3.8 + DOWN * 0.4)
        disk_V2 = Circle(radius=1.55, color=TEAL_BRIGHT, fill_opacity=0.22).move_to(LEFT * 0.6 + DOWN * 0.4)

        defect_trk = ValueTracker(1.42)
        defect_hud = always_redraw(lambda: MathTex(
            rf"\operatorname{{Def}}_{{\mathcal{{U}}}}(s) = \|d^0(s)-d^1(s)\|_\infty = {defect_trk.get_value():.2f}",
            font_size=20, color=CRIMSON_RED if defect_trk.get_value() > 0.05 else GREEN_C
        ).to_corner(UR, buff=0.32))

        ks_box = RoundedRectangle(width=5.5, height=2.9, corner_radius=0.14, color=HOLO_GOLD, fill_opacity=0.09).to_corner(DR, buff=0.35).shift(UP * 0.45)
        ks_tex = MathTex(
            r"\mathbf{Thm\;1.18\;(\varepsilon\text{-}Holoform\;Stability):}\\[3pt]"
            r"\max_{k} \|\rho_k^*(\Gamma_\sigma) - s_k\| \le \varepsilon \xrightarrow{\varepsilon\to 0^+} \mathsf{Hol}(\mathcal{U},\mathbf{P})\\[5pt]"
            r"\mathbf{Carnap\;1.2\;(Husserl\;\&\;Kochen\text{--}Specker):}\\[3pt]"
            r"1.\;\text{Husserl }\textit{Abschattungen}\text{ glue into }\mathsf{Hol}(\mathcal{U},\mathbf{P}).\\[2pt]"
            r"2.\;\text{Kochen--Specker }\Gamma(\mathbf{1},\underline{\Sigma})=\emptyset\text{ is }\check{H}^1\neq 0,\text{ not }\bot!",
            font_size=14, color=WHITE
        ).move_to(ks_box)
        self.add_fixed_in_frame_mobjects(defect_hud, ks_box, ks_tex)

        self.play(FadeIn(disk_V1, comp_V1, disk_V2, comp_V2, defect_hud, ks_box, ks_tex), run_time=1.3)
        self.move_camera(phi=62 * DEGREES, theta=-42 * DEGREES, run_time=1.8)
        self.play(
            comp_V1.animate.shift(RIGHT * 0.85), disk_V1.animate.shift(RIGHT * 0.85),
            comp_V2.animate.shift(LEFT * 0.85), disk_V2.animate.shift(LEFT * 0.85),
            defect_trk.animate.set_value(0.00),
            run_time=2.0, rate_func=rate_functions.ease_in_out_sine
        )

        overlap_W = Intersection(disk_V1, disk_V2, color=HOLO_GOLD, fill_opacity=0.60)
        holoform_poly = Icosahedron(edge_length=1.05).set_color(HOLO_GOLD).set_opacity(0.88).move_to(np.array([-2.2, -0.4, 1.45]))
        descent_cones = VGroup(
            DashedLine(np.array([-2.95, -0.4, 0]), np.array([-2.2, -0.4, 1.45]), color=HOLO_GOLD),
            DashedLine(np.array([-1.45, -0.4, 0]), np.array([-2.2, -0.4, 1.45]), color=HOLO_GOLD)
        )

        self.play(FadeIn(overlap_W), Create(descent_cones), Create(holoform_poly), run_time=1.5)
        self.play(Rotate(holoform_poly, angle=2 * PI, axis=OUT), run_time=2.4, rate_func=rate_functions.linear)

        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.2)
        self.remove(defect_hud)
        self.play(
            FadeOut(VGroup(
                comp_V1, comp_V2, disk_V1, disk_V2, overlap_W, descent_cones, holoform_poly,
                ks_box, ks_tex, hdr9, hol_top, act9_foot
            )),
            run_time=0.8
        )

        # =====================================================================
        # ACT X (SEC 1.6): CEM MEREOLOGY, t-NORM & 3D DIALECTICAL AUFHEBUNG
        # =====================================================================
        hdr10 = Text(
            "Act X (Sec. 1.6): Typed Mereology M_asp, t-Norm & 3D Dialectical Aufhebung",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        tnorm_top = MathTex(
            r"\operatorname{Strength}((d_r, f_q), S) := \chi(\zeta_r\sigma_{dr}(v_{dr}),\, z_q\sigma_{fq}(v_{fq})) > \theta_{\text{coord}}",
            font_size=18, color=ORANGE_GOLD
        ).next_to(hdr10, DOWN, buff=0.12).align_to(hdr10, LEFT)
        cem_bot = MathTex(
            r"\operatorname{Ant}_{\text{mer}} \;\wedge\; \operatorname{Ant}_{\text{desc}} \neq 0 "
            r"\;\xrightarrow{\text{Aufhebung}}\; C = \operatorname{Synthesize}(A,B) \in \mathbf{Prop}_1",
            font_size=18, color=PURPLE_SYN
        ).to_edge(DOWN, buff=0.20)
        self.add_fixed_in_frame_mobjects(hdr10, tnorm_top, cem_bot)
        self.play(FadeIn(hdr10), Write(tnorm_top), Write(cem_bot), run_time=1.1)

        # Left Panel: Continuous t-Norm Coordination Meter
        str_trk = ValueTracker(0.28)
        gauge_bar_bg = Rectangle(width=0.68, height=2.8, color=GREY_C, fill_opacity=0.15).move_to(LEFT * 4.6 + DOWN * 0.45)
        gauge_fill = always_redraw(lambda: Rectangle(
            width=0.68, height=2.8 * str_trk.get_value(),
            color=GREEN_C if str_trk.get_value() > 0.60 else CRIMSON_RED,
            fill_opacity=0.82
        ).move_to(gauge_bar_bg.get_bottom(), aligned_edge=DOWN))
        thresh_line = DashedLine(
            gauge_bar_bg.get_bottom() + UP * 1.68 + LEFT * 0.55,
            gauge_bar_bg.get_bottom() + UP * 1.68 + RIGHT * 0.55,
            color=HOLO_GOLD, stroke_width=2.8
        )
        thresh_lbl = MathTex(r"\theta_{\text{coord}} = 0.60", font_size=17, color=HOLO_GOLD).next_to(thresh_line, RIGHT, buff=0.08)
        str_val_lbl = always_redraw(lambda: MathTex(
            rf"\chi = {str_trk.get_value():.2f}",
            font_size=20, color=GREEN_C if str_trk.get_value() > 0.60 else CRIMSON_RED
        ).next_to(gauge_bar_bg, DOWN, buff=0.12))

        # Right Zone: 2D Projections Clashing -> 3D Sublation Cylinder
        proj1 = Circle(radius=1.05, color=ROYAL_BLUE, fill_opacity=0.35).move_to(LEFT * 0.4 + DOWN * 0.35)
        proj2 = Square(side_length=2.1, color=ORANGE_GOLD, fill_opacity=0.35).move_to(RIGHT * 2.6 + DOWN * 0.35)
        clash_lbl = MathTex(
            r"\operatorname{Incomp}_{\mathcal{E}}(A,B) := [\![|\operatorname{ev}_P(A)-\operatorname{ev}_P(B)|>\theta_{\text{tol}}]\!] = \top",
            font_size=18, color=CRIMSON_RED
        ).move_to(RIGHT * 1.1 + UP * 1.15)

        self.play(
            Create(gauge_bar_bg), FadeIn(gauge_fill, str_val_lbl), Create(thresh_line), Write(thresh_lbl),
            Create(proj1), Create(proj2), Write(clash_lbl),
            run_time=1.5
        )
        self.play(str_trk.animate.set_value(0.86), run_time=1.3, rate_func=rate_functions.ease_in_out_sine)

        self.play(
            proj1.animate.move_to(RIGHT * 1.1 + DOWN * 0.35),
            proj2.animate.move_to(RIGHT * 1.1 + DOWN * 0.35),
            FadeOut(clash_lbl),
            run_time=1.0
        )
        self.move_camera(phi=62 * DEGREES, theta=-35 * DEGREES, run_time=1.5)
        cyl_3d = Cylinder(radius=1.05, height=2.1, direction=OUT, show_ends=True).set_color(PURPLE_SYN).set_opacity(0.82).move_to(np.array([1.1, -0.35, 0]))
        auf_hud = MathTex(
            r"\text{Thm 1.24 (Dialectical Sublation / }\textit{Aufhebung}\text{): }\; "
            r"\neg\exists A',B'\le C\,\big(\operatorname{Part}(A',C)\wedge\operatorname{Part}(B',C)\wedge\operatorname{Incomp}(A',B')\big)",
            font_size=17, color=GREEN_C
        ).to_corner(UR, buff=0.32).shift(DOWN * 0.55)
        self.add_fixed_in_frame_mobjects(auf_hud)

        self.play(FadeOut(VGroup(proj1, proj2)), Create(cyl_3d), FadeIn(auf_hud), run_time=1.5)
        self.play(Rotate(cyl_3d, angle=PI / 2, axis=RIGHT), run_time=1.7)

        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.2)
        self.remove(gauge_fill, str_val_lbl)
        self.play(FadeOut(VGroup(cyl_3d, auf_hud, gauge_bar_bg, thresh_line, thresh_lbl, hdr10, tnorm_top, cem_bot)), run_time=0.8)

        # =====================================================================
        # ACT XI (SEC 1.7): PSEUDOMETRIC d_P, METROPIE GEODESIC, j_S & STAGE I
        # =====================================================================
        hdr11 = Text(
            "Act XI (Sec. 1.7): Pseudometric d_P, Metropie Flow, Closure j_S & Polarimeter",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        dp_top = MathTex(
            r"d_P(U,V) := \inf_{\alpha,\beta}\max_{F}\max\!\left(\|I_{F^U}-\beta_F\alpha_F\|_{\text{op}},\,\|I_{F^V}-\alpha_F\beta_F\|_{\text{op}}\right) < \epsilon_A, \quad "
            r"g_{\text{met}}(\dot{z},\dot{z}) := -\frac{1}{2}\operatorname{tr}\!\left((z^{-1}\dot{z})^2\right)",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr11, DOWN, buff=0.12).align_to(hdr11, LEFT)
        self.add_fixed_in_frame_mobjects(hdr11, dp_top)
        self.play(FadeIn(hdr11), Write(dp_top), run_time=1.1)

        # Upper Left: SO(n) Metropie Geodesic Curve with Moving Orthonormal Frame & \epsilon_A Ball
        so_curve = ParametricFunction(
            lambda t: np.array([-5.6 + 2.5 * t, 0.55 + 0.55 * np.sin(2.2 * t), 0]),
            t_range=[0, 1], color=TEAL_BRIGHT, stroke_width=3.8
        )
        t_geod = ValueTracker(0.0)
        moving_frame = always_redraw(lambda: VGroup(
            Dot(np.array([-5.6 + 2.5 * t_geod.get_value(), 0.55 + 0.55 * np.sin(2.2 * t_geod.get_value()), 0]), color=HOLO_GOLD, radius=0.085),
            Arrow(
                np.array([-5.6 + 2.5 * t_geod.get_value(), 0.55 + 0.55 * np.sin(2.2 * t_geod.get_value()), 0]),
                np.array([-5.6 + 2.5 * t_geod.get_value(), 0.55 + 0.55 * np.sin(2.2 * t_geod.get_value()), 0])
                + 0.55 * np.array([np.cos(1.6 * t_geod.get_value()), np.sin(1.6 * t_geod.get_value()), 0]),
                color=ROYAL_BLUE, buff=0, stroke_width=2.6
            ),
            Arrow(
                np.array([-5.6 + 2.5 * t_geod.get_value(), 0.55 + 0.55 * np.sin(2.2 * t_geod.get_value()), 0]),
                np.array([-5.6 + 2.5 * t_geod.get_value(), 0.55 + 0.55 * np.sin(2.2 * t_geod.get_value()), 0])
                + 0.55 * np.array([-np.sin(1.6 * t_geod.get_value()), np.cos(1.6 * t_geod.get_value()), 0]),
                color=ORANGE_GOLD, buff=0, stroke_width=2.6
            )
        ))

        eps_ball = DashedVMobject(Circle(radius=0.75, color=HOLO_GOLD).move_to(LEFT * 1.45 + UP * 0.55), num_dashes=24)
        node_U = Dot(LEFT * 1.45 + UP * 0.55, color=HOLO_GOLD, radius=0.075)
        node_V = Dot(LEFT * 1.05 + UP * 0.85, color=TEAL_BRIGHT, radius=0.075)
        line_UV = Line(node_U.get_center(), node_V.get_center(), color=WHITE, stroke_width=1.8)
        lbl_UV = MathTex(r"d_P<\epsilon_A", font_size=14, color=HOLO_GOLD).next_to(eps_ball, DOWN, buff=0.05)

        # Lower Left: Lawvere-Tierney Modal Bridge & Plus-Sheafification
        lt_panel = RoundedRectangle(width=5.7, height=1.85, corner_radius=0.12, color=PURPLE_SYN, fill_opacity=0.09).move_to(LEFT * 3.15 + DOWN * 1.30)
        lt_tex = MathTex(
            r"\mathbf{Thm\;1.29\;(Lawvere\text{--}Tierney\;Bridge):}\;\Diamond_S \dashv \Box_S,\;\; j_S := \neg_J \Box_S \neg_J\\[3pt]"
            r"\mathbf{Thm\;1.30\;(Plus\text{-}Sheafification):}\;(L_{j_S} P)(U) := \operatorname*{colim}_{S\in J_{j_S}(U)} \operatorname{Nat}(S, P),\;\; \mathbf{a}_{j_S} P = L_{j_S}^2 P",
            font_size=14, color=WHITE
        ).move_to(lt_panel)

        # Right Panel: Unified Running Example Stage I (Dichromatic Spin-Polarimeter)
        st1_panel = RoundedRectangle(width=5.7, height=3.35, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.09).move_to(RIGHT * 3.15 + DOWN * 0.55)
        st1_tex = MathTex(
            r"\mathbf{Unified\;Running\;Example\;(Stage\;I\;of\;VI):}\\[4pt]"
            r"\text{Dichromatic Spin-Polarimeter: }P^U = \mathbb{R}^6 = \mathbb{R}_H^3 \oplus \mathbb{R}_V^3\\[4pt]"
            r"z^U(\theta) = \begin{pmatrix} \cos\theta\,I_3 & -\sin\theta\,I_3 \\ \sin\theta\,I_3 & \cos\theta\,I_3 \end{pmatrix} \in \mathrm{SO}(6)\\[4pt]"
            r"K(d, p) = (d_H f_H,\; d_V f_V) \in \mathbb{R}^2,\quad \|K(d,p)\|_\infty \le \|d\|_2\|p\|_2",
            font_size=15, color=TEAL_BRIGHT
        ).move_to(st1_panel)

        fs_foot = MathTex(
            r"\text{Fischer--Servi Invariant (Def 1.28): }\; "
            r"\Diamond_S(\phi\to\psi) \to (\Box_S\phi \to \Diamond_S\psi) "
            r"\iff \text{(FS1) \& (FS2) Commute on } d_P(U,V) < \epsilon_A",
            font_size=17, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(so_curve), FadeIn(moving_frame),
            Create(eps_ball), FadeIn(node_U, node_V), Create(line_UV), Write(lbl_UV),
            Create(lt_panel), Write(lt_tex),
            Create(st1_panel), Write(st1_tex), Write(fs_foot),
            run_time=1.8
        )
        self.play(t_geod.animate.set_value(1.0), run_time=2.0, rate_func=rate_functions.ease_in_out_sine)
        self.wait(0.6)

        self.remove(moving_frame)
        self.play(
            FadeOut(VGroup(
                hdr11, dp_top, so_curve, eps_ball, node_U, node_V, line_UV, lbl_UV,
                lt_panel, lt_tex, st1_panel, st1_tex, fs_foot
            )),
            run_time=0.8
        )

        # =====================================================================
        # ACT XII (SECS 1.8–1.11): SEQUENT CALCULUS, RULES & SYNTHESIS FLOWCHART
        # =====================================================================
        hdr12 = Text(
            "Act XII (Secs. 1.8-1.11): Sequent Calculus L_iMSL, Completeness & Synthesis",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr12)
        self.play(FadeIn(hdr12), run_time=0.6)

        # Phase 12A: Stratified Sequent Calculus Rules
        rule_coord = MathTex(
            r"\frac{S(x);\Gamma \vdash^k (d_r, v_{dr}) \quad S(x);\Delta \vdash^k (f_q, v_{fq}) \quad [\operatorname{Strength}>\theta_{\text{coord}}]}"
            r"{S(x);\Gamma,\Delta \vdash^k \operatorname{Coord}((d_r, v_{dr}), (f_q, v_{fq}))}\; (\chi\text{-I}_S)",
            font_size=19, color=ROYAL_BLUE
        ).move_to(UP * 1.8)

        rule_stab = MathTex(
            r"\frac{P'\in\operatorname{Gen}_{j+1} \quad S(x);\Gamma \vdash^{j+1} P' \quad \forall X\, (\operatorname{IGP}_{j+1}(X, P') \Rightarrow S(x);\Gamma|_{\le j}\vdash^j \operatorname{Stable}_j(X))}"
            r"{S(x);\Gamma \vdash^{j+1} \operatorname{Stable}_{j+1}(P')}\; (\operatorname{Stab}_{j+1}R)",
            font_size=18, color=TEAL_BRIGHT
        ).move_to(UP * 0.55)

        rule_dyn = MathTex(
            r"\frac{S(x);\Gamma \vdash^k [\pi_F]\phi}{S(x);\operatorname{Cons}(\Gamma, \pi_F) \vdash^{k+1} \phi}\; ([\pi_F]\text{-App})"
            r"\qquad (U, k) \models [\pi_F]\phi \;\Longleftrightarrow\; (F(U), k+1) \models \phi",
            font_size=19, color=ORANGE_GOLD
        ).move_to(DOWN * 0.70)

        self.play(Write(rule_coord), Write(rule_stab), Write(rule_dyn), run_time=1.8)
        self.wait(0.7)
        self.play(FadeOut(VGroup(rule_coord, rule_stab, rule_dyn)), run_time=0.6)

        # Phase 12B: 6-Node Synthesis Flowchart of Chapter 1 (Figure 1.12) & Completeness Banner
        f_nodes = VGroup()
        f_specs = [
            (r"\mathbf{Layer\;1A:}\text{ Contexts}\\U\in\mathbf{Ctx}_{\text{adm}}^{\text{sk}}", ROYAL_BLUE, LEFT * 4.3 + UP * 1.45),
            (r"\mathbf{Layer\;1B:}\text{ Site}\\(\mathbf{Ctx}_{\text{adm}}^{\text{sk}}, J_{\text{syn}})", TEAL_BRIGHT, ORIGIN + UP * 1.45),
            (r"\mathbf{Layer\;1C:}\text{ Topos}\\\mathcal{E}_{\text{syn}}=\mathbf{Sh}(\mathbf{Ctx}, J_{\text{syn}})", ORANGE_GOLD, RIGHT * 4.3 + UP * 1.45),
            (r"\mathbf{Layer\;2:}\text{ Frames}\\\mathcal{M}=(W,\preceq,R_{\Box_S},\nu)", ROYAL_BLUE, LEFT * 4.3 + DOWN * 0.25),
            (r"\mathbf{Layer\;3:}\text{ Sequents}\\S(x);\Gamma\vdash^k\phi", TEAL_BRIGHT, ORIGIN + DOWN * 0.25),
            (r"\mathbf{Holoform:}\text{ Descent}\\\operatorname{Def}_{\mathcal{U}}(s)=0", HOLO_GOLD, RIGHT * 4.3 + DOWN * 0.25),
        ]
        for t_s, c_s, p_s in f_specs:
            bx = RoundedRectangle(width=3.5, height=0.92, corner_radius=0.1, color=c_s, fill_opacity=0.20).move_to(p_s)
            tx = MathTex(t_s, font_size=16, color=WHITE).move_to(bx)
            f_nodes.add(VGroup(bx, tx))

        f_edges = VGroup(
            Arrow(f_nodes[0].get_right(), f_nodes[1].get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(f_nodes[1].get_right(), f_nodes[2].get_left(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(f_nodes[0].get_bottom(), f_nodes[3].get_top(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(f_nodes[1].get_bottom(), f_nodes[4].get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(f_nodes[2].get_bottom(), f_nodes[5].get_top(), color=ORANGE_GOLD, buff=0.06, stroke_width=2.5),
            DashedLine(f_nodes[3].get_right(), f_nodes[4].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16),
            DashedLine(f_nodes[4].get_right(), f_nodes[5].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16)
        )

        final_box = RoundedRectangle(width=12.0, height=1.65, corner_radius=0.12, color=HOLO_GOLD, fill_opacity=0.14).to_edge(DOWN, buff=0.20)
        final_tex = MathTex(
            r"\bullet\;\text{Thms 1.34, 1.37 \& 1.38 (Soundness \& Canonical Completeness): }\; "
            r"S(x);\,\Gamma_G \vdash^k \phi \;\Longleftrightarrow\; S(x);\,\Gamma_G \models^k \phi \;\;(\forall k\in\mathbb{N}_0)\\[4pt]"
            r"\bullet\;\text{Sec. 1.10 (Boolean Collapse): }\mathbf{Ctx}_{\text{adm}}^{\text{sk}}\to\{*\},\;a_q=f_q=b_q \implies \mathcal{E}_{\text{syn}}\cong\mathbf{Set},\;\Omega\cong\mathbf{2}=\{0,1\}\\[4pt]"
            r"\bullet\;\mathbf{Dialectical\;Ascent\;to\;Chapter\;2:}\;\text{Lift Sheaves in }\mathcal{E}_{\text{syn}}\text{ to Algebras over Colored Operad }\mathcal{O}_{\text{syn}}\text{ \& Tree Monad }T_{\mathsf{P}}",
            font_size=15, color=HOLO_GOLD
        ).move_to(final_box)

        self.play(FadeIn(f_nodes, lag_ratio=0.08), Create(f_edges), run_time=1.8)
        self.play(Create(final_box), Write(final_tex), run_time=1.8)
        self.play(final_box.animate.set_stroke(WHITE, width=4), rate_func=rate_functions.there_and_back, run_time=1.0)
        self.wait(2.5)