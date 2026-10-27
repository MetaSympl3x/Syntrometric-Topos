# =============================================================================
# AUTOMATICALLY GENERATED MODULAR SCENES FOR REVEAL.JS PRESENTATION
# =============================================================================

from manim import *
import numpy as np


# =====================================================================
# STANDARDIZED BOOK COLOR PALETTE (MATCHING LATEX PREAMBLE)
# =====================================================================
ROYAL_BLUE = "#4169E1"     # Stratum 0 / Universe U_0 / Horizontal Syndromatic
TEAL_BRIGHT = "#20B2AA"    # Stratum 1 / Universe U_1 / Vertical Gradual
ORANGE_GOLD = "#FFA500"    # Stratum n / Universe U_2 / Diagonal Realization
CRIMSON_RED = "#DC143C"    # Metroplexdiabatik Differential d^r / High-Homotopy Noise
HOLO_GOLD = "#FFD700"      # Syntroclinic Bridge / Diagonal Colimit / Protosimplex
PURPLE_SYN = "#9370DB"     # Postnikov Truncation \tau_{\le m} / Cohesive Modalities
SLATE_GREY = "#708090"     # Structural Framing



# =============================================================================
# SCENE: Ch5_Act1_Hypersyntrix_Encapsulation (Act 1)
# =============================================================================
class Ch5_Act1_Hypersyntrix_Encapsulation(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr1 = Text(
            "Act I (Sec. 5.1.1): Hypersyntrix M^1 (SM-20) & Hypermetrophor Encapsulation",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm20_top = MathTex(
            r"\overset{\scriptscriptstyle 1}{\mathbf{M}}\widetilde{\mathrm{a}} \equiv "
            r"\langle\langle \underline{\mathrm{F}},\, \widetilde{\mathrm{a}} \rangle \underline{\mathrm{r}} \rangle "
            r"\quad\lor\quad \widetilde{\mathrm{a}}| \equiv (\widetilde{\mathrm{a}}_i)_N\;\;(\text{SM-20}), \qquad "
            r"{}^1\mathbf{w}\widetilde{\mathbf{a}} \equiv (\mathbf{y}\widetilde{\mathbf{a}}_i)_N",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr1, DOWN, buff=0.12).align_to(hdr1, LEFT)
        self.add_fixed_in_frame_mobjects(hdr1, sm20_top)
        self.play(Write(hdr1), Write(sm20_top), run_time=1.2)

        # Left Panel: Dynamic Encapsulation of Grade-0 Syntrices into Hypermetrophor ^1 w a
        hyp_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        hyp_hdr = MathTex(r"\text{Hypersyntrix }\overset{\scriptscriptstyle 1}{\mathbf{M}}\;\text{(Hyperkategorie, SM p. 82)}", font_size=17, color=ROYAL_BLUE).next_to(hyp_box.get_top(), DOWN, buff=0.12)

        # Mini Grade-0 Syntrix Network that encapsulates into a single 0D Hypermetrophor Atom
        enc_center = LEFT * 4.55 + UP * 0.10
        sub_pts = [enc_center + np.array([0.48 * np.cos(k * 2 * PI / 3), 0.48 * np.sin(k * 2 * PI / 3), 0]) for k in range(3)]
        sub_edges = VGroup(*[Line(sub_pts[i], sub_pts[(i + 1) % 3], color=ROYAL_BLUE, stroke_width=2.2) for i in range(3)])
        sub_dots = VGroup(*[Dot(p, color=TEAL_BRIGHT, radius=0.07) for p in sub_pts])
        sub_net = VGroup(sub_edges, sub_dots)
        enc_shell = Circle(radius=0.65, color=HOLO_GOLD, stroke_width=2.5).move_to(enc_center)
        enc_lbl = MathTex(r"\mathbf{y}\widetilde{\mathbf{a}}_i \mapsto \text{0D Atom}", font_size=14, color=HOLO_GOLD).next_to(enc_shell, DOWN, buff=0.06)

        hyp_tex = MathTex(
            r"1.\;\mathbf{Hypermetrophor\;{}^1\mathbf{w}\widetilde{\mathbf{a}}:}\\"
            r"\;\;\text{Encapsulates }N\text{ Syntrices.}\\[4pt]"
            r"2.\;\mathbf{Synkolator\;{}^1\mathfrak{f}\equiv S(2):}\\"
            r"\;\;\text{Valency }r\text{ functor.}\\[4pt]"
            r"3.\;\mathbf{Nullmetroplex\;{}^1\mathbf{M}_0}",
            font_size=14, color=WHITE
        ).move_to(LEFT * 2.15 + DOWN * 0.65)

        # Right Panel: Higher-Order Corporate Pairings (SM-20a Konzenter vs SM-20b Exzenter)
        kor_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        kor_hdr = MathTex(r"\text{Higher Metroplexkorporatoren (SM-20a \& SM-20b)}", font_size=17, color=TEAL_BRIGHT).next_to(kor_box.get_top(), DOWN, buff=0.12)
        kor_tex = MathTex(
            r"\mathbf{1.\;Hypersyntrix\;Konzenter\;(\text{SM-20a}):}\\[4pt]"
            r"\overset{\scriptscriptstyle 1}{\mathbf{M}}\widetilde{\mathrm{a}} "
            r"\begin{Bmatrix} K_s & C_s \\ K_m & C_m \end{Bmatrix} "
            r"\overset{\scriptscriptstyle 1}{\mathbf{M}}\widetilde{\mathrm{b}},\;\overline{|B|},\;"
            r"\overset{\scriptscriptstyle 1}{\mathbf{M}}\widetilde{\mathrm{c}}\\[7pt]"
            r"\mathbf{2.\;Hypersyntrix\;Exzenter\;(\text{SM-20b}):}\\[4pt]"
            r"\overset{\scriptscriptstyle 1}{\mathbf{M}}\widetilde{\mathrm{a}}^{(l)} "
            r"\begin{Bmatrix} K_s & C_s \\ K_m & C_m \end{Bmatrix}^{(m)} "
            r"\overset{\scriptscriptstyle 1}{\mathbf{M}}\widetilde{\mathrm{b}},\;\overline{||},\;"
            r"\overset{\scriptscriptstyle 1}{\mathbf{M}}\widetilde{\mathrm{c}}\\[5pt]"
            r"\bullet\;\text{Inherits higher-order }\textit{Spaltbarkeit}\text{ \& 4 Elementary Types!}",
            font_size=15, color=HOLO_GOLD
        ).move_to(kor_box.get_center() + DOWN * 0.15)

        act1_foot = MathTex(
            r"\text{Multi-Scale Encapsulation: }\; "
            r"\text{An entire network of grade-}0\text{ Syntrices becomes a single }0\text{-dimensional object in }\overset{\scriptscriptstyle 1}{\mathbf{M}}",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(hyp_box), Write(hyp_hdr), FadeIn(sub_net), Create(enc_shell), Write(enc_lbl), Write(hyp_tex),
            Create(kor_box), Write(kor_hdr), Write(kor_tex), Write(act1_foot),
            run_time=1.8
        )
        # Contract the 3-node sub-network into a single golden 0D Hypermetrophor atom
        atom_pt = Dot(enc_center, color=HOLO_GOLD, radius=0.14)
        self.play(
            sub_net.animate.scale(0.15).move_to(enc_center),
            enc_shell.animate.scale(0.35).set_fill(HOLO_GOLD, opacity=0.65),
            FadeIn(atom_pt),
            run_time=1.2
        )
        self.wait(0.6)

        self.play(FadeOut(VGroup(
            hdr1, sm20_top, hyp_box, hyp_hdr, sub_net, enc_shell, enc_lbl, atom_pt, hyp_tex,
            kor_box, kor_hdr, kor_tex, act1_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch5_Act2_3_Tektonik_Diabatik (Act 2)
# =============================================================================
class Ch5_Act2_3_Tektonik_Diabatik(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr2 = Text(
            "Act II (Secs. 5.1.2-5.1.3): Functor Hierarchy S(n+1), SM-21..24 & Duale Tektonik",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm21_24 = MathTex(
            r"\widetilde{\mathrm{a}} \equiv \overset{\scriptscriptstyle 0}{\mathbf{M}}\widetilde{\mathrm{a}}\;(\text{SM-21}), \qquad "
            r"\overset{\scriptscriptstyle n+1}{\mathbf{M}}\widetilde{\mathrm{a}} \equiv "
            r"\langle \overset{\scriptscriptstyle n}{\mathbf{M}}\widetilde{\mathrm{F}},\, "
            r"\overset{\scriptscriptstyle\sim}{\mathbf{M}}{}^n\widetilde{\mathrm{a}}\,\underline{\mathrm{r}}\rangle \;\lor\; "
            r"\overset{\scriptscriptstyle\sim}{\mathbf{M}}{}^n\widetilde{\mathrm{a}} \equiv "
            r"\left(\overset{\scriptscriptstyle n}{\mathbf{M}}\widetilde{\mathrm{a}}_{(p)}\right)_{N_n}\;\;(\text{SM-24})",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr2, DOWN, buff=0.12).align_to(hdr2, LEFT)
        self.add_fixed_in_frame_mobjects(hdr2, sm21_24)
        self.play(FadeIn(hdr2), Write(sm21_24), run_time=1.1)

        fn_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        fn_tex = MathTex(
            r"\mathbf{Generative\;Functor\;Hierarchy\;S(n+1):}\\[5pt]"
            r"\bullet\;S1 \equiv \mathfrak{f}:\;\text{Generates }\overset{\scriptscriptstyle 0}{\mathbf{M}}\text{ from }\mathbf{AP}_0\\[3pt]"
            r"\bullet\;S2 \equiv {}^1\mathfrak{f}:\;\text{Generates }\overset{\scriptscriptstyle 1}{\mathbf{M}}\text{ from }\overset{\scriptscriptstyle 0}{\mathbf{M}}\\[3pt]"
            r"\bullet\;S3 \equiv {}^2\mathfrak{f}:\;\text{Generates }\overset{\scriptscriptstyle 2}{\mathbf{M}}\text{ from }\overset{\scriptscriptstyle 1}{\mathbf{M}}\\[3pt]"
            r"\bullet\;S(n+1) \equiv {}^n\mathfrak{f}:\;\text{Generates }\overset{\scriptscriptstyle n}{\mathbf{M}}\text{ from }\overset{\scriptscriptstyle n-1}{\mathbf{M}}\\[6pt]"
            r"\mathbf{Protosimplexe\;(SM,\;p.\;87):}\;\text{Minimal irreducible units in }T_n",
            font_size=15, color=WHITE
        ).move_to(fn_box)

        tek_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.52)
        tek_tex = MathTex(
            r"\mathbf{Duale\;Endogene\;Tektonik\;(SM,\;p.\;93):}\\[5pt]"
            r"1.\;\mathbf{Graduelle\;Tektonik\;(Vertical):}\\"
            r"\;\;\text{Nested compositional filtration across grades }0\le k\le n-1.\\[5pt]"
            r"2.\;\mathbf{Syndromatische\;Tektonik\;(Horizontal):}\\"
            r"\;\;\text{Within-grade syndrome layers generated by }{}^k\mathfrak{f}.\\[6pt]"
            r"\mathbf{Kontraktion\;(\kappa:\;\overset{\scriptscriptstyle n}{\mathbf{M}}\to\overset{\scriptscriptstyle m}{\mathbf{M}}',\;m<n):}\\"
            r"\text{Compresses complexity while preserving dominant invariants!}",
            font_size=15, color=HOLO_GOLD
        ).move_to(tek_box)

        act2_foot = MathTex(
            r"\text{Elementary Basis at Grade }n\text{ (SM-22, SM-23): }\; "
            r"\widetilde{\mathrm{a}}_i \equiv \widetilde{\mathrm{p}}_{(k)i} \quad\text{and}\quad "
            r"\overset{\scriptscriptstyle 1}{\mathbf{M}}\widetilde{\mathrm{a}},\;\overline{|B|},\;C,\;\overset{\scriptscriptstyle 1}{\mathbf{M}}\widetilde{\mathrm{p}}_{(k)} \quad (1\le k\le 4)",
            font_size=18, color=GREEN_C
        ).to_edge(DOWN, buff=0.20)

        self.play(Create(fn_box), Write(fn_tex), Create(tek_box), Write(tek_tex), Write(act2_foot), run_time=1.9)
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr2, sm21_24, fn_box, fn_tex, tek_box, tek_tex, act2_foot)), run_time=0.8)



# =============================================================================
# SCENE: Act3_Secs_514515_Syntrokline_Brcken (Act 3)
# =============================================================================
class Act3_Secs_514515_Syntrokline_Brcken(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr3 = Text(
            "Act III (Secs. 5.1.4-5.1.5): Syntrokline Bruecken (SM-25) & Metroplexdiabatik",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm25_26 = MathTex(
            r"\overset{\scriptscriptstyle n+N}{\tilde{\alpha}} \equiv "
            r"\underset{n}{\overset{n+N}{\mathrm{S}}}\,\overset{\scriptscriptstyle n}{\mathbf{M}}\widetilde{\mathrm{a}}"
            r"\Big[(\overset{\scriptscriptstyle n-1}{\Phi}_{j\gamma})(\overset{\scriptscriptstyle n-1}{\mathrm{f}}_{j\gamma},\underline{\mathrm{m}}_{j\gamma})"
            r"(\overset{\scriptscriptstyle n}{\mathrm{f}}_\gamma,\underline{\mathrm{r}}_\gamma)(\overset{\scriptscriptstyle n+1}{\mathrm{f}},\mathrm{p})\Big]_{\gamma=1}^{k_{(n)}}\;\;(\text{SM-25a}), \qquad "
            r"\overset{\scriptscriptstyle\sim}{\mathbf{M}}{}^n \equiv \overset{\scriptscriptstyle n}{\mathbf{M}}\,\mathrm{EN}\,\overset{\scriptscriptstyle p+q}{\mathbf{M}}\;\;(\text{SM-26})",
            font_size=16, color=ROYAL_BLUE
        ).next_to(hdr3, DOWN, buff=0.12).align_to(hdr3, LEFT)
        self.add_fixed_in_frame_mobjects(hdr3, sm25_26)
        self.play(FadeIn(hdr3), Write(sm25_26), run_time=1.1)

        br_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        br_tex = MathTex(
            r"\mathbf{Syntrokline\;Metroplexbruecken\;(SM,\;pp.\;94\text{--}98):}\\[5pt]"
            r"\bullet\;\text{Totalities }T_n\text{ act as floors (\textit{Etagen});}\\[3pt]"
            r"\bullet\;\text{Bridges }{}^{n+N}\alpha\text{ act as elevators (\textit{Aufzuege}).}\\[5pt]"
            r"\mathbf{Endogene\;Kombination\;(\text{SM-26}):}\\[3pt]"
            r"\overset{\scriptscriptstyle\sim}{\mathbf{M}}{}^n \equiv "
            r"\overset{\scriptscriptstyle n}{\mathbf{M}}\widetilde{\mathrm{a}}\,\mathrm{EN}\,"
            r"\overset{\scriptscriptstyle p+q}{\mathbf{M}}\widetilde{\mathrm{b}} "
            r"\quad\text{with}\quad p + q \le n \;\wedge\; q > 0",
            font_size=15, color=WHITE
        ).move_to(br_panel)

        dia_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=CRIMSON_RED, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.52)
        dia_hdr = MathTex(r"\text{Metroplexdiabatik \& Syntrokline Rueckkoppelung}", font_size=17, color=CRIMSON_RED).next_to(dia_panel.get_top(), DOWN, buff=0.14)

        m_idea = RoundedRectangle(width=2.3, height=0.72, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.22).move_to(RIGHT * 1.65 + DOWN * 0.65)
        m_synd = RoundedRectangle(width=2.3, height=0.72, corner_radius=0.08, color=ORANGE_GOLD, fill_opacity=0.22).move_to(RIGHT * 4.55 + DOWN * 0.65)
        t_idea = MathTex(r"\gamma = 0\text{ (Idee)}\\\text{Metrophoric In}", font_size=15).move_to(m_idea)
        t_synd = MathTex(r"\gamma > 0\text{ (Syndrom)}\\\text{Syndromatic Out}", font_size=15, color=ORANGE_GOLD).move_to(m_synd)

        loop_top = ArcBetweenPoints(m_idea.get_top(), m_synd.get_top(), angle=-0.45, color=TEAL_BRIGHT, stroke_width=3)
        loop_bot = ArcBetweenPoints(m_synd.get_bottom(), m_idea.get_bottom(), angle=-0.45, color=CRIMSON_RED, stroke_width=3.5)
        pulse_dot = Dot(m_idea.get_top(), color=HOLO_GOLD, radius=0.10)
        loop_lbl = MathTex(r"\text{Syntrokline Rueckkoppelung (Re-Entrant Loop)}", font_size=15, color=HOLO_GOLD).move_to(dia_panel.get_bottom() + UP * 0.28)

        act3_foot = MathTex(
            r"\text{Exogene vs. Endogene Tektonik: }\; "
            r"\text{Closed metrophoric-syndromatic diabatic loops model recurrent cognitive re-entry}",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(br_panel), Write(br_tex),
            Create(dia_panel), Write(dia_hdr),
            FadeIn(m_idea, t_idea, m_synd, t_synd),
            Create(loop_top), Create(loop_bot), FadeIn(pulse_dot), Write(loop_lbl),
            Write(act3_foot),
            run_time=1.8
        )
        # Animate re-entrant diabatic signal pulse around the closed feedback loop
        self.play(MoveAlongPath(pulse_dot, loop_top), run_time=0.8, rate_func=rate_functions.ease_in_out_sine)
        self.play(MoveAlongPath(pulse_dot, loop_bot), run_time=0.8, rate_func=rate_functions.ease_in_out_sine)
        self.wait(0.5)

        self.play(FadeOut(VGroup(
            hdr3, sm25_26, br_panel, br_tex, dia_panel, dia_hdr,
            m_idea, t_idea, m_synd, t_synd, loop_top, loop_bot, pulse_dot, loop_lbl, act3_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch5_Act4_5_Universes_Dendroidal (Act 4)
# =============================================================================
class Ch5_Act4_5_Universes_Dendroidal(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr4 = Text(
            "Act IV (Sec. 5.2.1): Ambient (infty,1)-Topos X_syn & Universes (Fig 5.2)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        x_top = MathTex(
            r"\mathcal{X}_{\text{syn}} := \mathbf{Sh}_\infty(\mathbf{Ctx}_{\text{adm}}^{\text{sk}}, J_{\text{syn}}) := "
            r"L_{J_{\text{syn}}}\!\left(\operatorname{Fun}((\mathbf{Ctx}_{\text{adm}}^{\text{sk}})^{\text{op}}, \mathcal{S})\right), \qquad "
            r"\mathcal{U}_0 \in \mathcal{U}_1 \in \mathcal{U}_2\;\;(\text{Def 5.1})",
            font_size=18, color=ROYAL_BLUE
        ).next_to(hdr4, DOWN, buff=0.12).align_to(hdr4, LEFT)
        self.add_fixed_in_frame_mobjects(hdr4, x_top)
        self.play(FadeIn(hdr4), Write(x_top), run_time=1.1)

        u0_col = RoundedRectangle(width=3.6, height=3.35, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.14).move_to(LEFT * 4.2 + DOWN * 0.50)
        u1_col = RoundedRectangle(width=3.6, height=3.35, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.14).move_to(ORIGIN + DOWN * 0.50)
        u2_col = RoundedRectangle(width=3.6, height=3.35, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.14).move_to(RIGHT * 4.2 + DOWN * 0.50)

        t_u0 = MathTex(
            r"\mathbf{Universe\;\mathcal{U}_0\;(Internal)}\\[6pt]"
            r"\bullet\;\text{Small Site }\mathbf{Ctx}_{\text{adm}}^{\text{sk}}\\[4pt]"
            r"\bullet\;\text{Objects }X\in\operatorname{Obj}(\mathcal{X}_{\text{syn}})\\[4pt]"
            r"\bullet\;\text{Internal Metroplexe }\mathbf{M}^n",
            font_size=16, color=WHITE
        ).move_to(u0_col)

        t_u1 = MathTex(
            r"\mathbf{Universe\;\mathcal{U}_1\;(Ambient)}\\[6pt]"
            r"\bullet\;\text{Space }\mathcal{S} := \mathcal{S}_{\mathcal{U}_0}\\[4pt]"
            r"\bullet\;\text{Topos }\mathcal{X}_{\text{syn}} = \mathbf{Sh}_\infty(\mathbf{Ctx}, J_{\text{syn}})\\[4pt]"
            r"\bullet\;\text{Categories }\operatorname{Met}_n(\mathcal{X}_{\text{syn}})",
            font_size=16, color=TEAL_BRIGHT
        ).move_to(u1_col)

        t_u2 = MathTex(
            r"\mathbf{Universe\;\mathcal{U}_2\;(Meta\text{-}Slice)}\\[6pt]"
            r"\bullet\;\operatorname{Fun}(\mathbf{\Delta}^{\text{op}}, \operatorname{Met}_n(\mathcal{X}_{\text{syn}}))\\[4pt]"
            r"\bullet\;\text{External Totalities }T_n := \operatorname{Met}_n/G_n\\[4pt]"
            r"\bullet\;\text{Enlarged }\mathcal{X}_{\text{syn}}^{(k)}",
            font_size=16, color=ORANGE_GOLD
        ).move_to(u2_col)

        u_arr1 = Arrow(u0_col.get_right(), u1_col.get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=3)
        u_arr2 = Arrow(u1_col.get_right(), u2_col.get_left(), color=TEAL_BRIGHT, buff=0.06, stroke_width=3)
        u_lbl1 = MathTex(r"\in\mathcal{U}_1", font_size=17, color=ROYAL_BLUE).next_to(u_arr1, UP, buff=0.04)
        u_lbl2 = MathTex(r"\in\mathcal{U}_2", font_size=17, color=TEAL_BRIGHT).next_to(u_arr2, UP, buff=0.04)

        size_foot = MathTex(
            r"\text{Size Invariance Principle: }\; "
            r"\mathbf{M}^n \in \operatorname{Obj}(\operatorname{Met}_n(\mathcal{X}_{\text{syn}}))\text{ is }\mathcal{U}_0\text{-small inside }\mathcal{X}_{\text{syn}}, "
            r"\text{ preventing site-proliferation paradoxes!}",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            FadeIn(u0_col, t_u0, u1_col, t_u1, u2_col, t_u2),
            GrowArrow(u_arr1), Write(u_lbl1), GrowArrow(u_arr2), Write(u_lbl2), Write(size_foot),
            run_time=1.9
        )
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr4, x_top, u0_col, t_u0, u1_col, t_u1, u2_col, t_u2, u_arr1, u_lbl1, u_arr2, u_lbl2, size_foot)), run_time=0.8)



# =============================================================================
# SCENE: Act5_Secs_522523_Dendroidal_Complete (Act 5)
# =============================================================================
class Act5_Secs_522523_Dendroidal_Complete(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr5 = Text(
            "Act V (Secs. 5.2.2-5.2.3): Dendroidal Segal Spaces dCSeg & Corolla Grafting",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        dcseg_top = MathTex(
            r"\operatorname{Met}_1(\mathcal{X}_{\text{syn}}) := \operatorname{dCSeg}(\mathcal{X}_{\text{syn}}) \subset \operatorname{Fun}(\mathbf{\Omega}^{\text{op}}, \mathcal{X}_{\text{syn}}), \qquad "
            r"X(T) \xrightarrow{\;\sim\;} \lim_{v\in V(T)}^{\mathcal{X}_{\text{syn}}} X(C_{n(v)})\;\;(\text{Def 5.2})",
            font_size=18, color=TEAL_BRIGHT
        ).next_to(hdr5, DOWN, buff=0.12).align_to(hdr5, LEFT)
        self.add_fixed_in_frame_mobjects(hdr5, dcseg_top)
        self.play(FadeIn(hdr5), Write(dcseg_top), run_time=1.1)

        # Left Panel: Proposition 5.3 Binary Corolla Grafting T = C_2^{(v)} \circ_e C_2^{(u)} & Inner-Edge Contraction
        gr_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        gr_hdr = MathTex(r"\text{Prop 5.3: Binary Corolla Grafting }T = C_2^{(v)}\circ_e C_2^{(u)}", font_size=16, color=TEAL_BRIGHT).next_to(gr_panel.get_top(), DOWN, buff=0.12)

        nd_u = Circle(radius=0.25, color=ROYAL_BLUE, fill_opacity=0.45).move_to(LEFT * 4.55 + UP * 0.15)
        nd_v = Circle(radius=0.25, color=ORANGE_GOLD, fill_opacity=0.45).move_to(LEFT * 3.45 + DOWN * 0.75)
        tx_u = MathTex(r"u", font_size=17).move_to(nd_u)
        tx_v = MathTex(r"v", font_size=17).move_to(nd_v)

        t_branches = VGroup(
            Line(nd_u.get_top() + LEFT * 0.1, nd_u.get_top() + LEFT * 0.45 + UP * 0.40, color=ROYAL_BLUE, stroke_width=2.5),
            Line(nd_u.get_top() + RIGHT * 0.1, nd_u.get_top() + RIGHT * 0.45 + UP * 0.40, color=ROYAL_BLUE, stroke_width=2.5),
            Line(nd_v.get_top() + RIGHT * 0.1, nd_v.get_top() + RIGHT * 0.45 + UP * 0.40, color=ORANGE_GOLD, stroke_width=2.5),
            Line(nd_v.get_bottom(), nd_v.get_bottom() + DOWN * 0.40, color=HOLO_GOLD, stroke_width=3.5)
        )
        edge_eta = Line(nd_u.get_bottom() + RIGHT * 0.10, nd_v.get_top() + LEFT * 0.10, color=HOLO_GOLD, stroke_width=3.8)
        lbl_eta = MathTex(r"\eta_e", font_size=16, color=HOLO_GOLD).next_to(edge_eta, LEFT, buff=0.05)

        # Inner-edge contracted ternary corolla C_3
        arr_contract = Arrow(LEFT * 2.85 + DOWN * 0.30, LEFT * 2.05 + DOWN * 0.30, color=HOLO_GOLD, buff=0.04, stroke_width=2.5)
        lbl_contract = MathTex(r"\partial_{\eta_e}", font_size=15, color=HOLO_GOLD).next_to(arr_contract, UP, buff=0.04)
        nd_c3 = Circle(radius=0.28, color=HOLO_GOLD, fill_opacity=0.45).move_to(LEFT * 1.35 + DOWN * 0.30)
        tx_c3 = MathTex(r"C_3", font_size=16, color=HOLO_GOLD).move_to(nd_c3)
        c3_legs = VGroup(
            Line(nd_c3.get_top() + LEFT * 0.12, nd_c3.get_top() + LEFT * 0.48 + UP * 0.45, color=ROYAL_BLUE, stroke_width=2.4),
            Line(nd_c3.get_top(), nd_c3.get_top() + UP * 0.48, color=ROYAL_BLUE, stroke_width=2.4),
            Line(nd_c3.get_top() + RIGHT * 0.12, nd_c3.get_top() + RIGHT * 0.48 + UP * 0.45, color=ORANGE_GOLD, stroke_width=2.4),
            Line(nd_c3.get_bottom(), nd_c3.get_bottom() + DOWN * 0.45, color=HOLO_GOLD, stroke_width=3.5)
        )

        gr_eq = MathTex(
            r"X(T) \xrightarrow{\;\sim\;} X(C_2^{(v)}) \mathop{\times}\limits^{\mathrm{h}}_{X(\eta_e)} X(C_2^{(u)})",
            font_size=17, color=HOLO_GOLD
        ).move_to(gr_panel.get_bottom() + UP * 0.28)

        # Right Panel: Rezk Completeness & Graded Operadic System (Assumption 5.4)
        op_panel = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.52)
        op_tex = MathTex(
            r"\mathbf{Rezk\;Completeness\;Condition\;(Def\;5.2(2)):}\\[4pt]"
            r"(i^*X)_0 \xrightarrow{\;\sim\;} (i^*X)_{\text{hoequiv}} \subset (i^*X)_1\\[6pt]"
            r"\mathbf{Assump\;5.4\;(Graded\;Operadic\;System\;\{\mathcal{O}_n\}_{n\ge 0}):}\\[4pt]"
            r"\operatorname{Free}_{\mathcal{O}_n}: \mathcal{X}_{\text{syn}} \rightleftarrows \operatorname{Alg}_{\mathcal{O}_n}(\mathcal{X}_{\text{syn}}) : U_n\\[4pt]"
            r"\phi_{n,n+1}: \mathcal{O}_n \to \mathcal{O}_{n+1} \implies (\phi_{n,n+1})_! \dashv (\phi_{n,n+1})^*",
            font_size=15, color=WHITE
        ).move_to(op_panel)

        self.play(
            Create(gr_panel), Write(gr_hdr),
            FadeIn(nd_u, tx_u, nd_v, tx_v), Create(t_branches), Create(edge_eta), Write(lbl_eta),
            Create(op_panel), Write(op_tex),
            run_time=1.7
        )
        self.play(
            GrowArrow(arr_contract), Write(lbl_contract),
            FadeIn(nd_c3, tx_c3), Create(c3_legs), Write(gr_eq),
            run_time=1.3
        )
        self.wait(0.7)

        self.play(FadeOut(VGroup(
            hdr5, dcseg_top, gr_panel, gr_hdr, nd_u, tx_u, nd_v, tx_v, t_branches, edge_eta, lbl_eta,
            arr_contract, lbl_contract, nd_c3, tx_c3, c3_legs, gr_eq, op_panel, op_tex
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch5_Act6_7_Tower_Postnikov (Act 6)
# =============================================================================
class Ch5_Act6_7_Tower_Postnikov(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr6 = Text(
            "Act VI (Secs. 5.3.1-5.3.2): 3D Transcendence Tower (Fig 5.1) & Hypermetrophors",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        met_bot = MathTex(
            r"H_n: \mathbf{\Delta}^{\text{op}} \longrightarrow \operatorname{Met}_{n-1}(\mathcal{X}_{\text{syn}}), \qquad "
            r"\operatorname{HypMet}_n := \operatorname*{colim}_{\mathbf{\Delta}^{\text{op}}}(U_{n-1}^{\text{Met}}\circ H_n), \qquad "
            r"\overset{\scriptscriptstyle n}{\mathbf{M}}\mathcal{S} := \operatorname{Free}_{\mathcal{O}_n}(\operatorname{HypMet}_n)\;\;(\text{Def 5.6})",
            font_size=17, color=TEAL_BRIGHT
        ).to_edge(DOWN, buff=0.20)
        self.add_fixed_in_frame_mobjects(hdr6, met_bot)
        self.play(FadeIn(hdr6), Write(met_bot), run_time=1.1)

        self.move_camera(phi=62 * DEGREES, theta=-42 * DEGREES, run_time=1.7)

        # 3-Tier Translucent Elliptical Transcendence Tower (Figure 5.1)
        e_t0 = Ellipse(width=4.2, height=2.6, color=ROYAL_BLUE, fill_color=ROYAL_BLUE, fill_opacity=0.18, stroke_width=3.5).move_to(np.array([-1.8, 0, -1.35]))
        e_t1 = Ellipse(width=4.2, height=2.6, color=TEAL_BRIGHT, fill_color=TEAL_BRIGHT, fill_opacity=0.18, stroke_width=3.5).move_to(np.array([-1.8, 0, 0.00]))
        e_tN = Ellipse(width=4.2, height=2.6, color=ORANGE_GOLD, fill_color=ORANGE_GOLD, fill_opacity=0.18, stroke_width=3.5).move_to(np.array([-1.8, 0, 1.35]))

        pil_up = Line3D(np.array([-2.9, 0, -1.35]), np.array([-2.9, 0, 1.35]), color=HOLO_GOLD, thickness=0.025)
        pil_dn = Line3D(np.array([-0.7, 0, 1.35]), np.array([-0.7, 0, -1.35]), color=TEAL_BRIGHT, thickness=0.025)

        # Curved 3D Postnikov Contraction Arc \tau_{\le m} on the outer rim
        post_arc_3d = ParametricFunction(
            lambda t: np.array([-1.8 + 2.35 * np.cos(0.35 * np.sin(PI * t)), 1.35 * np.sin(PI * t), 1.35 - 2.70 * t]),
            t_range=[0, 1], color=PURPLE_SYN, stroke_width=4
        )

        dot_up = Sphere(radius=0.12, color=HOLO_GOLD).move_to(np.array([-2.9, 0, -1.35]))
        dot_dn = Sphere(radius=0.12, color=TEAL_BRIGHT).move_to(np.array([-0.7, 0, 1.35]))

        toy5_card = RoundedRectangle(width=5.8, height=2.75, corner_radius=0.12, color=TEAL_BRIGHT, fill_opacity=0.14).to_corner(UR, buff=0.35).shift(DOWN * 0.55)
        toy5_tex = MathTex(
            r"\mathbf{Fig\;5.1\;\&\;Toy\;Example\;(\overset{\scriptscriptstyle 1}{\mathbf{M}}\;as\;Internal\;Category):}\\[4pt]"
            r"\bullet\;\text{Objects }C_0 := \mathcal{S}_1 \sqcup \mathcal{S}_2\quad(\text{Base Syntrices in }\operatorname{Met}_0)\\[3pt]"
            r"\bullet\;\text{Morphisms }C_1 := \mathbf{Kor}(\mathcal{S}_1, \mathcal{S}_2)\quad(\text{Corporate Pairings})\\[3pt]"
            r"\bullet\;\text{Segal Composition: }\; C_2 \xrightarrow{\;\sim\;} C_1 \times_{C_0} C_1\\[3pt]"
            r"\bullet\;\text{Bridge Adjunction: }\; (\phi_{k,n})_! \dashv (\phi_{k,n})^*",
            font_size=15, color=WHITE
        ).move_to(toy5_card)
        self.add_fixed_in_frame_mobjects(toy5_card, toy5_tex)

        self.play(
            FadeIn(e_t0, e_t1, e_tN),
            FadeIn(pil_up, pil_dn, dot_up, dot_dn, toy5_card, toy5_tex),
            Create(post_arc_3d),
            run_time=1.8
        )
        self.play(
            dot_up.animate.move_to(np.array([-2.9, 0, 1.35])),
            dot_dn.animate.move_to(np.array([-0.7, 0, -1.35])),
            run_time=2.2, rate_func=rate_functions.ease_in_out_sine
        )
        self.wait(0.6)

        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.3)
        self.play(FadeOut(VGroup(e_t0, e_t1, e_tN, pil_up, pil_dn, post_arc_3d, dot_up, dot_dn, toy5_card, toy5_tex, hdr6, met_bot)), run_time=0.8)



# =============================================================================
# SCENE: Act7_Secs_532533_Syntroclinic_Adjunction (Act 7)
# =============================================================================
class Act7_Secs_532533_Syntroclinic_Adjunction(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr7 = Text(
            "Act VII (Secs. 5.3.2-5.3.3): Syntroclinic Adjunction & Postnikov Truncation",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        adj_top = MathTex(
            r"B_{n,n+N} := (\phi_{n,n+N})_! \;\dashv\; (\phi_{n,n+N})^* =: R_{n+N,n}, \qquad "
            r"\eta_X: X \xrightarrow{\;\sim\;} R_{n+N,n}(B_{n,n+N}(X)), \qquad "
            r"\tau_{\le m} \dashv \iota_m : \mathcal{X}_{\text{syn}}^{\le m} \hookrightarrow \mathcal{X}_{\text{syn}}",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr7, DOWN, buff=0.12).align_to(hdr7, LEFT)
        self.add_fixed_in_frame_mobjects(hdr7, adj_top)
        self.play(FadeIn(hdr7), Write(adj_top), run_time=1.1)

        br_box = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.52)
        br_hdr = MathTex(r"\text{Fig 5.3 \& Prop 5.8: Fully Faithful Bridge Lifting}", font_size=17, color=TEAL_BRIGHT).next_to(br_box.get_top(), DOWN, buff=0.12)

        alg_n = RoundedRectangle(width=2.1, height=0.75, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.22).move_to(LEFT * 4.75 + DOWN * 0.35)
        alg_nN = RoundedRectangle(width=2.3, height=0.75, corner_radius=0.08, color=ORANGE_GOLD, fill_opacity=0.22).move_to(LEFT * 1.55 + DOWN * 0.35)
        tx_an = MathTex(r"\operatorname{Alg}_{\mathcal{O}_n}(\mathcal{X}_{\text{syn}})", font_size=16).move_to(alg_n)
        tx_anN = MathTex(r"\operatorname{Alg}_{\mathcal{O}_{n+N}}(\mathcal{X}_{\text{syn}})", font_size=16, color=ORANGE_GOLD).move_to(alg_nN)

        arr_B = Arrow(alg_n.get_right() + UP * 0.12, alg_nN.get_left() + UP * 0.12, color=HOLO_GOLD, buff=0.05, stroke_width=2.8)
        arr_R = Arrow(alg_nN.get_left() + DOWN * 0.12, alg_n.get_right() + DOWN * 0.12, color=TEAL_BRIGHT, buff=0.05, stroke_width=2.8)
        lbl_B = MathTex(r"B_{n,n+N}=(\phi)_!", font_size=14, color=HOLO_GOLD).next_to(arr_B, UP, buff=0.04)
        lbl_R = MathTex(r"R_{n+N,n}=(\phi)^*", font_size=14, color=TEAL_BRIGHT).next_to(arr_R, DOWN, buff=0.04)

        unit_note = MathTex(
            r"B_{n,n+N}|_{\mathcal{I}_n}\text{ fully faithful } \iff \eta_X: X\xrightarrow{\sim} R(B(X))",
            font_size=15, color=HOLO_GOLD
        ).move_to(br_box.get_bottom() + UP * 0.28)

        post_box = RoundedRectangle(width=5.8, height=3.4, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.52)
        post_hdr = MathTex(r"\text{Fig 5.4: Postnikov Homotopy Contraction }\kappa := \tau_{\le m}", font_size=17, color=PURPLE_SYN).next_to(post_box.get_top(), DOWN, buff=0.12)

        amp_trk = ValueTracker(0.36)
        wobbly_ring = always_redraw(lambda: ParametricFunction(
            lambda t: RIGHT * 3.1 + DOWN * 0.45 + np.array([
                (0.95 + amp_trk.get_value() * np.sin(8 * t)) * np.cos(t),
                (0.75 + amp_trk.get_value() * np.cos(8 * t)) * np.sin(t),
                0
            ]),
            t_range=[0, 2 * PI],
            color=CRIMSON_RED if amp_trk.get_value() > 0.05 else GREEN_C,
            stroke_width=4
        ))

        pi_lbl = MathTex(r"\|\underline{\pi}_{k>m}(\tau_{\le m}X)\| = ", font_size=18, color=HOLO_GOLD)
        pi_dec = DecimalNumber(0.36, num_decimal_places=2, font_size=18, color=CRIMSON_RED)
        pi_dec.add_updater(lambda m: m.set_value(amp_trk.get_value()))
        pi_row = VGroup(pi_lbl, pi_dec).arrange(RIGHT, buff=0.08).move_to(post_box.get_bottom() + UP * 0.28)

        post_foot = MathTex(
            r"\operatorname{Map}_{\mathcal{X}_{\text{syn}}}(\tau_{\le m}X, Y) \simeq \operatorname{Map}_{\mathcal{X}_{\text{syn}}}(X, Y)\;\;(\forall Y\in\mathcal{X}_{\text{syn}}^{\le m}), \qquad "
            r"\underline{\pi}_k(\tau_{\le m}X) = 0\;\;\forall k > m",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(br_box), Write(br_hdr),
            FadeIn(alg_n, tx_an, alg_nN, tx_anN),
            GrowArrow(arr_B), Write(lbl_B), GrowArrow(arr_R), Write(lbl_R), Write(unit_note),
            Create(post_box), Write(post_hdr), Create(wobbly_ring), FadeIn(pi_row),
            Write(post_foot),
            run_time=1.8
        )
        self.play(amp_trk.animate.set_value(0.00), run_time=1.8, rate_func=rate_functions.ease_in_out_sine)
        pi_dec.clear_updaters()
        self.wait(0.5)

        self.remove(wobbly_ring)
        self.play(FadeOut(VGroup(
            hdr7, adj_top, br_box, br_hdr, alg_n, tx_an, alg_nN, tx_anN,
            arr_B, lbl_B, arr_R, lbl_R, unit_note, post_box, post_hdr, pi_row, post_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch5_Act8_Bisimplicial_Tectonic (Act 8)
# =============================================================================
class Ch5_Act8_Bisimplicial_Tectonic(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr8 = Text(
            "Act VIII (Sec. 5.3.4): Bisimplicial Tectonic Grid (Fig 5.5) & Dold-Kan R_Ban",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        tect_top = MathTex(
            r"\operatorname{Tect}(\mathcal{S}) \in \operatorname{Fun}(\mathbf{\Delta}^{\text{op}}\times\mathbf{\Delta}^{\text{op}}, \mathcal{X}_{\text{syn}}), \qquad "
            r"|\operatorname{Tect}(\mathcal{S})|_{\mathbf{\Delta}} := \operatorname*{colim}_{\mathbf{\Delta}^{\text{op}}}\!\left(\operatorname{diag}^*\operatorname{Tect}(\mathcal{S})\right) "
            r"\simeq \operatorname*{colim}_{\mathbf{\Delta}^{\text{op}}\times\mathbf{\Delta}^{\text{op}}} \mathcal{S}_{p,q}",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr8, DOWN, buff=0.12).align_to(hdr8, LEFT)
        self.add_fixed_in_frame_mobjects(hdr8, tect_top)
        self.play(FadeIn(hdr8), Write(tect_top), run_time=1.1)

        g_orig = LEFT * 5.25 + DOWN * 1.75
        t_nodes = VGroup()
        diag_circles = VGroup()
        h_arrs = VGroup()
        v_arrs = VGroup()

        for p_i in range(4):
            for q_i in range(4):
                pt = g_orig + RIGHT * p_i * 1.05 + UP * q_i * 0.85
                is_d = (p_i == q_i)
                nd = Circle(
                    radius=0.21 if is_d else 0.16,
                    color=HOLO_GOLD if is_d else ROYAL_BLUE,
                    fill_color=HOLO_GOLD if is_d else ROYAL_BLUE,
                    fill_opacity=0.38 if is_d else 0.18,
                    stroke_width=2.4 if is_d else 1.4
                ).move_to(pt)
                lb = MathTex(rf"\mathcal{{S}}_{{{p_i},{q_i}}}", font_size=13, color=WHITE).move_to(pt)
                t_nodes.add(VGroup(nd, lb))
                if is_d:
                    diag_circles.add(nd)
                if p_i > 0:
                    h_arrs.add(Arrow(pt + LEFT * 0.17, pt + LEFT * 0.88, color=ROYAL_BLUE, buff=0, stroke_width=1.7, max_tip_length_to_length_ratio=0.22))
                if q_i > 0:
                    v_arrs.add(Arrow(pt + DOWN * 0.17, pt + DOWN * 0.68, color=TEAL_BRIGHT, buff=0, stroke_width=1.7, max_tip_length_to_length_ratio=0.22))

        d_ray = Arrow(g_orig + DOWN * 0.1 + LEFT * 0.1, g_orig + RIGHT * 3.35 + UP * 2.75, color=HOLO_GOLD, buff=0, stroke_width=4)

        dk_panel = RoundedRectangle(width=5.8, height=3.45, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.50)
        dk_tex = MathTex(
            r"\mathbf{Def\;5.12\;(Homological\;Banach\;Realization\;\mathfrak{R}_{\text{Ban}}):}\\[6pt]"
            r"\mathfrak{R}_{\text{Ban}}(X) := \bigoplus_{k=0}^\infty H_k\!\left(N_\bullet\left(\mathbb{R}[\Gamma(X)]\right)\right)_{\ell^1} "
            r"\in \operatorname{Obj}(\mathbf{FinBan}_{\le 1})\\[6pt]"
            r"\bullet\;N_\bullet: s\mathbf{Vect}_{\mathbb{R}} \xrightarrow{\;\sim\;} \mathbf{Ch}_{\ge 0}(\mathbf{Vect}_{\mathbb{R}})\;\text{(Dold--Kan)}\\[4pt]"
            r"\bullet\;k=0:\; H_0(N_\bullet(\mathbb{R}[\Gamma(X)])) \cong \mathbb{R}[\pi_0(\Gamma(X))]\\[4pt]"
            r"\bullet\;k\ge 1:\;\text{Preserves higher homotopical invariants!}\\[4pt]"
            r"\implies \operatorname{Tect}_{\mathbf{Ban}}(\mathcal{S}) := \mathfrak{R}_{\text{Ban}} \circ \operatorname{Tect}(\mathcal{S})",
            font_size=15, color=WHITE
        ).move_to(dk_panel)

        self.play(
            FadeIn(t_nodes), Create(h_arrs), Create(v_arrs), Create(d_ray),
            Create(dk_panel), Write(dk_tex),
            run_time=1.8
        )
        # Pulse the diagonal simplicial realization \mathcal{S}_{k,k}
        self.play(
            diag_circles.animate.scale(1.22).set_fill(HOLO_GOLD, opacity=0.75),
            rate_func=rate_functions.there_and_back, run_time=1.1
        )
        self.wait(0.6)

        self.play(FadeOut(VGroup(hdr8, tect_top, t_nodes, h_arrs, v_arrs, d_ray, dk_panel, dk_tex)), run_time=0.8)



# =============================================================================
# SCENE: Act9_Sec_535_Cohesive_Topos (Act 9)
# =============================================================================
class Act9_Sec_535_Cohesive_Topos(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr9 = Text(
            "Act IX (Sec. 5.3.5): Cohesive (infty,1)-Topos Modalities (Shape, Flat, Sharp)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        coh_top = MathTex(
            r"\Pi \;\dashv\; \operatorname{Disc} \;\dashv\; \Gamma \;\dashv\; \operatorname{Codisc} "
            r"\quad\left(\mathcal{X}_{\text{syn}} \underset{\operatorname{Disc},\,\operatorname{Codisc}}{\overset{\Pi,\,\Gamma}{\rightleftarrows}} \mathcal{S}\right) "
            r"\;\Longrightarrow\; \int \;\dashv\; \flat \;\dashv\; \sharp : \mathcal{X}_{\text{syn}} \longrightarrow \mathcal{X}_{\text{syn}}\;\;(\text{Def 5.14})",
            font_size=17, color=PURPLE_SYN
        ).next_to(hdr9, DOWN, buff=0.12).align_to(hdr9, LEFT)
        self.add_fixed_in_frame_mobjects(hdr9, coh_top)
        self.play(FadeIn(hdr9), Write(coh_top), run_time=1.1)

        c_shape = RoundedRectangle(width=3.7, height=3.2, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.14).move_to(LEFT * 4.15 + DOWN * 0.45)
        c_flat  = RoundedRectangle(width=3.7, height=3.2, corner_radius=0.14, color=HOLO_GOLD, fill_opacity=0.14).move_to(ORIGIN + DOWN * 0.45)
        c_sharp = RoundedRectangle(width=3.7, height=3.2, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.14).move_to(RIGHT * 4.15 + DOWN * 0.45)

        sh_ring = Circle(radius=0.62, color=TEAL_BRIGHT, stroke_width=4).move_to(c_shape.get_center() + UP * 0.45)
        sh_txt = MathTex(
            r"\mathbf{1.\;Shape\;\int := \operatorname{Disc}\circ\Pi}\\"
            r"\int(\mathcal{S})\text{ extracts smooth}\\"
            r"\text{path-homotopy }\textit{Aeondyne}",
            font_size=15, color=TEAL_BRIGHT
        ).move_to(c_shape.get_center() + DOWN * 0.85)

        fl_pts = VGroup(*[
            Dot(c_flat.get_center() + UP * 0.45 + np.array([0.62 * np.cos(k * PI / 3), 0.62 * np.sin(k * PI / 3), 0]), color=HOLO_GOLD, radius=0.08)
            for k in range(6)
        ])
        fl_txt = MathTex(
            r"\mathbf{2.\;Flat\;\flat := \operatorname{Disc}\circ\Gamma}\\"
            r"\flat(\mathcal{S})\text{ extracts discrete}\\"
            r"\textit{Enyphanmetroplex}\text{ skeleton}",
            font_size=15, color=HOLO_GOLD
        ).move_to(c_flat.get_center() + DOWN * 0.85)

        sp_mesh = VGroup(
            Circle(radius=0.62, color=PURPLE_SYN, fill_color=PURPLE_SYN, fill_opacity=0.35).move_to(c_sharp.get_center() + UP * 0.45),
            *[Line(
                c_sharp.get_center() + UP * 0.45 + np.array([0.62 * np.cos(i * PI / 3), 0.62 * np.sin(i * PI / 3), 0]),
                c_sharp.get_center() + UP * 0.45 + np.array([0.62 * np.cos(j * PI / 3), 0.62 * np.sin(j * PI / 3), 0]),
                color=PURPLE_SYN, stroke_width=1.5
            ) for i in range(6) for j in range(i + 1, 6)]
        )
        sp_txt = MathTex(
            r"\mathbf{3.\;Sharp\;\sharp := \operatorname{Codisc}\circ\Gamma}\\"
            r"\sharp(\mathcal{S})\text{ embeds into}\\"
            r"\text{codiscrete envelope}",
            font_size=15, color=PURPLE_SYN
        ).move_to(c_sharp.get_center() + DOWN * 0.85)

        coh_foot = MathTex(
            r"\text{Product Preservation of }\Pi:\; \Pi(X\times Y) \simeq \Pi(X)\times\Pi(Y), \qquad "
            r"\flat(\mathcal{S}) \longrightarrow \mathcal{S} \longrightarrow \sharp(\mathcal{S})",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(c_shape), Create(sh_ring), Write(sh_txt),
            Create(c_flat), FadeIn(fl_pts), Write(fl_txt),
            Create(c_sharp), FadeIn(sp_mesh), Write(sp_txt),
            Write(coh_foot),
            run_time=2.0
        )
        self.wait(0.8)

        self.play(FadeOut(VGroup(hdr9, coh_top, c_shape, sh_ring, sh_txt, c_flat, fl_pts, fl_txt, c_sharp, sp_mesh, sp_txt, coh_foot)), run_time=0.8)



# =============================================================================
# SCENE: Act10_Sec_535_Tectonic_Spectral (Act 10)
# =============================================================================
class Act10_Sec_535_Tectonic_Spectral(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr10 = Text(
            "Act X (Sec. 5.3.5): Tectonic Spectral Sequence E^2_{p,q} & Downward Causation",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        ss_top = MathTex(
            r"E^2_{p,q} = H_p^{\text{grad}}\!\left(H_q^{\text{syn}}(C_{\bullet,\bullet}(\mathcal{S}))\right) "
            r"\Longrightarrow H_{p+q}\!\left(|\operatorname{Tect}_{\mathbf{Ban}}(\mathcal{S})|_{\mathbf{\Delta}}\right), \qquad "
            r"d^r: E^r_{p,q} \longrightarrow E^r_{p-r,\, q+r-1}\;\;(\text{Thm 5.15})",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr10, DOWN, buff=0.12).align_to(hdr10, LEFT)
        self.add_fixed_in_frame_mobjects(hdr10, ss_top)
        self.play(FadeIn(hdr10), Write(ss_top), run_time=1.1)

        ss_axes = Axes(
            x_range=[0, 4, 1], y_range=[0, 3, 1],
            x_length=4.8, y_length=3.0,
            axis_config={"include_tip": True, "color": GREY_B}
        ).move_to(LEFT * 3.15 + DOWN * 0.60)
        ss_hdr = MathTex(r"\text{Spectral Sequence Page }E^r_{p,q}\;(r=2,3)", font_size=17, color=TEAL_BRIGHT).next_to(ss_axes, UP, buff=0.08)

        lat_pts = VGroup(*[
            Dot(ss_axes.c2p(p_v, q_v), color=TEAL_BRIGHT, radius=0.08)
            for p_v in range(4) for q_v in range(3)
        ])
        d2_a1 = Arrow(ss_axes.c2p(2, 0), ss_axes.c2p(0, 1), color=CRIMSON_RED, buff=0.10, stroke_width=3.5)
        d2_a2 = Arrow(ss_axes.c2p(3, 0), ss_axes.c2p(1, 1), color=CRIMSON_RED, buff=0.10, stroke_width=3.5)
        d3_a1 = Arrow(ss_axes.c2p(3, 0), ss_axes.c2p(0, 2), color=HOLO_GOLD, buff=0.10, stroke_width=3.5)

        lbl_d2 = MathTex(r"d^2", font_size=16, color=CRIMSON_RED).move_to(ss_axes.c2p(1.15, 0.65))
        lbl_d3 = MathTex(r"d^3", font_size=16, color=HOLO_GOLD).move_to(ss_axes.c2p(1.65, 1.35))

        kim_panel = RoundedRectangle(width=5.8, height=3.45, corner_radius=0.14, color=CRIMSON_RED, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.55)
        kim_tex = MathTex(
            r"\mathbf{Thm\;5.15(3)\;(Criterion\;for\;Metroplexdiabatik):}\\[5pt]"
            r"\bullet\;d^r \equiv 0\;(\forall r\ge 2):\;\text{Purely Adiabatic (Decoupled Scales)}\\[4pt]"
            r"\bullet\;d^r \neq 0\;(r\ge 2):\;\mathbf{Homological\;Metroplexdiabatik!}\\"
            r"\;\;\text{Grade-}p\text{ structure injects boundary across }r\text{ lower}\\"
            r"\;\;\text{grades into syndrome level }q+r-1.\\[6pt]"
            r"\mathbf{Carnap\;5.1\;(Resolving\;Kim's\;Downward\;Causation):}\\"
            r"\text{Macro-constraint is not an overdetermining force,}\\"
            r"\text{but the differential }d^r\text{ \& right adjoint }(\phi_{n,n+N})^*!",
            font_size=15, color=WHITE
        ).move_to(kim_panel)

        self.play(
            Create(ss_axes), Write(ss_hdr), FadeIn(lat_pts),
            GrowArrow(d2_a1), GrowArrow(d2_a2), Write(lbl_d2),
            GrowArrow(d3_a1), Write(lbl_d3),
            Create(kim_panel), Write(kim_tex),
            run_time=2.0
        )
        self.wait(0.8)

        self.play(FadeOut(VGroup(hdr10, ss_top, ss_axes, ss_hdr, lat_pts, d2_a1, d2_a2, d3_a1, lbl_d2, lbl_d3, kim_panel, kim_tex)), run_time=0.8)



# =============================================================================
# SCENE: Act11_Secs_536537_Protosimplexe_Enproduct (Act 11)
# =============================================================================
class Act11_Secs_536537_Protosimplexe_Enproduct(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr11 = Text(
            "Act XI (Secs. 5.3.6-5.3.7): Slice Totality T_n, Protosimplexe & EN-Product",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        en_top = MathTex(
            r"T_n := \operatorname{Met}_n(\mathcal{X}_{\text{syn}}) / G_n, \qquad "
            r"\operatorname{SynEN}_{p,q}^n: \operatorname{Met}_p\times\operatorname{Met}_q \to \operatorname{Met}_n\;(p+q=n,\,q>0), \qquad "
            r"\operatorname{AbsEN}_n^{p+q}\;(p+q\le n,\,q>0)",
            font_size=17, color=ORANGE_GOLD
        ).next_to(hdr11, DOWN, buff=0.12).align_to(hdr11, LEFT)
        self.add_fixed_in_frame_mobjects(hdr11, en_top)
        self.play(FadeIn(hdr11), Write(en_top), run_time=1.1)

        pr_panel = RoundedRectangle(width=5.7, height=3.4, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.45)
        pr_tex = MathTex(
            r"\mathbf{Def\;5.16\;(Grade\text{-}n\;Slice\;Totality\;T_n := \operatorname{Met}_n/G_n):}\\[5pt]"
            r"\bullet\;\text{Terminal Object: }\;\operatorname{id}_{G_n}: G_n \longrightarrow G_n\\[4pt]"
            r"\bullet\;\text{Initial Nullmetroplex: }\;{}^n\mathbf{M}_0 := (0_n \to G_n)\\[6pt]"
            r"\mathbf{Def\;5.17\;(Augmented\;Subobject\text{-}Minimal\;Protosimplex):}\\[4pt]"
            r"\mathcal{P} \not\cong \operatorname{Free}_{\mathcal{O}_n}(\emptyset) \quad\wedge\quad "
            r"\forall A \hookrightarrow \mathcal{P}\text{ in }\operatorname{Alg}_{\mathcal{O}_n}^0,\\[3pt]"
            r"A \cong \operatorname{Free}_{\mathcal{O}_n}(\emptyset) \;\vee\; A \cong \mathcal{P}\quad(\text{Atomic Irreducibility!})",
            font_size=15, color=WHITE
        ).move_to(pr_panel)

        en_ax = Axes(
            x_range=[0, 5, 1], y_range=[0, 5, 1],
            x_length=4.2, y_length=2.7,
            axis_config={"include_tip": True, "color": GREY_B}
        ).move_to(RIGHT * 3.15 + DOWN * 0.50)
        en_hdr = MathTex(r"\text{SM-26 Admissible Region: }p+q\le 4,\; q\ge 1", font_size=17, color=GREEN_C).next_to(en_ax, UP, buff=0.08)

        tri_adm = Polygon(
            en_ax.c2p(0, 1), en_ax.c2p(3, 1), en_ax.c2p(0, 4),
            color=GREEN_C, fill_color=GREEN_C, fill_opacity=0.28, stroke_width=3
        )
        pts_adm = VGroup(*[
            Dot(en_ax.c2p(pv, qv), color=HOLO_GOLD, radius=0.085)
            for pv in range(4) for qv in range(1, 5) if pv + qv <= 4
        ])

        lean5_foot = MathTex(
            r"\text{Lean 4 (\texttt{Syntrometrie.StratumA.Metroplex}): }\; "
            r"\texttt{EndogenousAdmissible (n p q : }\mathbb{N}\texttt{) : }p+q\le n \wedge 0<q, \quad "
            r"\texttt{adj.homEquiv X Y}",
            font_size=16, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(pr_panel), Write(pr_tex),
            Create(en_ax), Write(en_hdr),
            Create(tri_adm), FadeIn(pts_adm, lag_ratio=0.08),
            Write(lean5_foot),
            run_time=2.0
        )
        self.wait(0.8)

        self.play(FadeOut(VGroup(hdr11, en_top, pr_panel, pr_tex, en_ax, en_hdr, tri_adm, pts_adm, lean5_foot)), run_time=0.8)



# =============================================================================
# SCENE: Ch5_Act12_Synthesis (Act 12)
# =============================================================================
class Ch5_Act12_Synthesis(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr12 = Text(
            "Act XII (Secs. 5.4-5.6): Sanity Checks, Explication & Ch. 5 Synthesis",
            font_size=21, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr12)
        self.play(FadeIn(hdr12), run_time=0.7)

        s5_nodes = VGroup()
        s5_specs = [
            (r"\mathbf{1.\;Ambient\;Site}\\(\mathbf{Ctx}_{\text{adm}}^{\text{sk}}, J_{\text{syn}})", ROYAL_BLUE, LEFT * 4.3 + UP * 1.45),
            (r"\mathbf{2.\;(\infty,1)\text{-}Topos}\\\mathcal{X}_{\text{syn}}=\mathbf{Sh}_\infty(\mathbf{Ctx}, J_{\text{syn}})", TEAL_BRIGHT, ORIGIN + UP * 1.45),
            (r"\mathbf{3.\;Dendroidal\;Segal}\\\operatorname{dCSeg}(\mathcal{X}_{\text{syn}})", ORANGE_GOLD, RIGHT * 4.3 + UP * 1.45),
            (r"\mathbf{4.\;Grade\;Hierarchy}\\\operatorname{Met}_n(\mathcal{X}_{\text{syn}})", ROYAL_BLUE, LEFT * 4.3 + DOWN * 0.25),
            (r"\mathbf{5.\;Bridge\;Adjunction}\\(\phi_{n,n+N})_!\dashv(\phi_{n,n+N})^*", TEAL_BRIGHT, ORIGIN + DOWN * 0.25),
            (r"\mathbf{6.\;Postnikov\;Filter}\\\tau_{\le m}\dashv\iota_m", HOLO_GOLD, RIGHT * 4.3 + DOWN * 0.25),
        ]
        for t_s, c_s, p_s in s5_specs:
            bx = RoundedRectangle(width=3.5, height=0.95, corner_radius=0.1, color=c_s, fill_opacity=0.20).move_to(p_s)
            tx = MathTex(t_s, font_size=16, color=WHITE).move_to(bx)
            s5_nodes.add(VGroup(bx, tx))

        s5_edges = VGroup(
            Arrow(s5_nodes[0].get_right(), s5_nodes[1].get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s5_nodes[1].get_right(), s5_nodes[2].get_left(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s5_nodes[0].get_bottom(), s5_nodes[3].get_top(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s5_nodes[1].get_bottom(), s5_nodes[4].get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s5_nodes[2].get_bottom(), s5_nodes[5].get_top(), color=ORANGE_GOLD, buff=0.06, stroke_width=2.5),
            DashedLine(s5_nodes[3].get_right(), s5_nodes[4].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16),
            DashedLine(s5_nodes[4].get_right(), s5_nodes[5].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16)
        )

        fin5_box = RoundedRectangle(width=12.0, height=1.65, corner_radius=0.12, color=HOLO_GOLD, fill_opacity=0.14).to_edge(DOWN, buff=0.20)
        fin5_tex = MathTex(
            r"\bullet\;\text{Sec. 5.5 Sanity Checks: }\; "
            r"(1)\;n=0 \implies \operatorname{Met}_0(\mathcal{X}_{\text{syn}}) \equiv \operatorname{Alg}_{\mathcal{O}_0}(\mathcal{X}_{\text{syn}}) \cong \mathbf{Syn} \quad\mid\quad "
            r"(2)\;\tau_{\le 0}X \simeq \underline{\pi}_0(X)\;(\text{0-Truncated Set Collapse})\\[4pt]"
            r"\bullet\;\text{Tectonic Diagonal Unification (Thm 5.13): }\; "
            r"|\operatorname{Tect}(\mathcal{S})|_{\mathbf{\Delta}} = \operatorname*{colim}_{\mathbf{\Delta}^{\text{op}}}(\operatorname{diag}^*\operatorname{Tect}(\mathcal{S})) "
            r"\text{ unifies Graduelle \& Syndromatische Tektonik}\\[4pt]"
            r"\bullet\;\mathbf{Dialectical\;Ascent\;to\;Chapter\;6:}\;\text{Orient multi-scale homotopy flows via Terminal Coalgebras }(\nu\mathcal{T},\zeta)\text{ \& Lyapunov Telezentrik}",
            font_size=15, color=HOLO_GOLD
        ).move_to(fin5_box)

        self.play(FadeIn(s5_nodes, lag_ratio=0.08), Create(s5_edges), run_time=1.8)
        self.play(Create(fin5_box), Write(fin5_tex), run_time=1.8)
        self.play(fin5_box.animate.set_stroke(WHITE, width=4), rate_func=rate_functions.there_and_back, run_time=1.0)
        self.wait(2.5)


