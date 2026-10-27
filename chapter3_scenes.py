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
ROYAL_BLUE = "#4169E1"     # Syntropode A / Konzenter Coproduct C_m
TEAL_BRIGHT = "#20B2AA"    # Syntropode B / Mixed Determinate Classes
ORANGE_GOLD = "#FFA500"    # Konflektorknoten R_\phi / Exzenter Pushout K_m
CRIMSON_RED = "#DC143C"    # Pure Underdetermined Classes / Quotient Kernel
HOLO_GOLD = "#FFD700"      # Universal Korporator / Emergent Homology Cycle
PURPLE_SYN = "#9370DB"     # Double Category Kor(Syn) / Mayer-Vietoris \partial_*
SLATE_GREY = "#708090"     # Tesseract Wireframe Struts & Structural Framing



# =============================================================================
# SCENE: Ch3_Act1_Inversion_Korporator (Act 1)
# =============================================================================
class Ch3_Act1_Inversion_Korporator(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr1 = Text(
            "Act I (Secs. 3.1.1-3.1.2): Principle of Inversion & 2x2 Korporator (SM-11)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm10_11 = MathTex(
            r"\widetilde{\mathrm{a}}\{K_m\;\; C_m\}\widetilde{\mathrm{b}},\;\overline{|CS|}_\gamma,\;\widetilde{\mathrm{c}}\;\;(\text{SM-10}), \qquad "
            r"\langle\langle f\widetilde{a}\rangle m\rangle "
            r"\begin{Bmatrix} K_s & C_s \\ K_m & C_m \end{Bmatrix} "
            r"\langle\langle \varphi\widetilde{b}\rangle \mu\rangle,\;\overline{|CS_c|}_\gamma,\;"
            r"\langle\langle G\widetilde{c}\rangle N\rangle\;\;(\text{SM-11})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr1, DOWN, buff=0.12).align_to(hdr1, LEFT)
        self.add_fixed_in_frame_mobjects(hdr1, sm10_11)
        self.play(Write(hdr1), Write(sm10_11), run_time=1.2)

        # Left Panel: Principle of Inversion (Spaltbarkeit <--> Corporate Synthesis)
        inv_box = RoundedRectangle(width=5.7, height=3.35, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(LEFT * 3.15 + DOWN * 0.5)
        inv_hdr = MathTex(r"\text{Prinzip der Inversion (SM, p. 42)}", font_size=18, color=PURPLE_SYN).next_to(inv_box.get_top(), DOWN, buff=0.12)

        spalt_node = RoundedRectangle(width=4.9, height=0.80, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.20).move_to(LEFT * 3.15 + UP * 0.20)
        spalt_txt = MathTex(
            r"\text{Ch. 2 Spaltbarkeit: }\; x\mathbf{y}\widetilde{\mathbf{a}} \xrightarrow{\;\widehat{\lambda}\;} "
            r"\overline{T}_{\text{frag}}\circ\overline{T}_{\text{pyr}}\;\text{(Splitting)}",
            font_size=15, color=WHITE
        ).move_to(spalt_node)

        inv_arrows = VGroup(
            Arrow(spalt_node.get_bottom() + LEFT * 0.5, spalt_node.get_bottom() + LEFT * 0.5 + DOWN * 0.55, color=HOLO_GOLD, buff=0.04, stroke_width=3),
            Arrow(spalt_node.get_bottom() + RIGHT * 0.5 + DOWN * 0.55, spalt_node.get_bottom() + RIGHT * 0.5, color=TEAL_BRIGHT, buff=0.04, stroke_width=3)
        )

        kor_node = RoundedRectangle(width=4.9, height=0.80, corner_radius=0.08, color=TEAL_BRIGHT, fill_opacity=0.22).move_to(LEFT * 3.15 + DOWN * 1.20)
        kor_txt = MathTex(
            r"\text{Ch. 3 Korporator: }\; (\mathcal{S}_a, \mathcal{S}_b) \xrightarrow{\;\mathbf{Kor}_{r,\Sigma}\;} "
            r"\mathcal{S}_c\;\text{(Inverse Synthesis)}",
            font_size=15, color=TEAL_BRIGHT
        ).move_to(kor_node)

        inv_orb = Dot(spalt_node.get_bottom() + LEFT * 0.5, color=HOLO_GOLD, radius=0.09)

        # Right Panel: Dual-Tier Action of the 2x2 Korporator Matrix
        mat_box = RoundedRectangle(width=5.8, height=3.35, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.5)
        mat_hdr = MathTex(
            r"\text{Dual-Tier Action }\begin{Bmatrix} K_s & C_s \\ K_m & C_m \end{Bmatrix}\;\text{(Duale Wirkung)}",
            font_size=17, color=HOLO_GOLD
        ).next_to(mat_box.get_top(), DOWN, buff=0.12)

        tier_synk = RoundedRectangle(width=5.2, height=1.0, corner_radius=0.08, color=TEAL_BRIGHT, fill_opacity=0.20).move_to(RIGHT * 3.1 + UP * 0.15)
        synk_txt = MathTex(
            r"\mathbf{Upper\;Row\;(Synkolative\;Korporation):}\\"
            r"K_s:\;\mathbf{F}^a\widehat{\otimes}_\pi\mathbf{F}^b\;\text{(Coupling)} \quad\mid\quad "
            r"C_s:\;\mathbf{F}^a\oplus_1\mathbf{F}^b\;\text{(Parallel)}",
            font_size=14, color=WHITE
        ).move_to(tier_synk)

        tier_met = RoundedRectangle(width=5.2, height=1.0, corner_radius=0.08, color=ORANGE_GOLD, fill_opacity=0.20).move_to(RIGHT * 3.1 + DOWN * 1.10)
        met_txt = MathTex(
            r"\mathbf{Lower\;Row\;(Metrophorkorporation):}\\"
            r"K_m:\; P_a\boxplus_\phi P_b\;\text{(Span Pushout)} \quad\mid\quad "
            r"C_m:\; P_a\oplus_1 P_b\;\text{(Coproduct)}",
            font_size=14, color=ORANGE_GOLD
        ).move_to(tier_met)

        act1_foot = MathTex(
            r"\text{Stage Combination: }\; M_c = \Phi(m_a, m_b), \qquad "
            r"\text{Every valid Syntrixkorporation realizes a Universalquantor }\mathbf{U}",
            font_size=18, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(inv_box), Write(inv_hdr), FadeIn(spalt_node, spalt_txt), Create(inv_arrows), FadeIn(kor_node, kor_txt, inv_orb),
            Create(mat_box), Write(mat_hdr), FadeIn(tier_synk, synk_txt, tier_met, met_txt), Write(act1_foot),
            run_time=1.8
        )
        self.play(
            inv_orb.animate.move_to(kor_node.get_top() + LEFT * 0.5),
            tier_synk.animate.set_stroke(HOLO_GOLD, width=3.5),
            run_time=0.7
        )
        self.play(
            inv_orb.animate.move_to(spalt_node.get_bottom() + RIGHT * 0.5),
            tier_synk.animate.set_stroke(TEAL_BRIGHT, width=2),
            tier_met.animate.set_stroke(HOLO_GOLD, width=3.5),
            run_time=0.7
        )
        self.wait(0.5)

        self.play(FadeOut(VGroup(
            hdr1, sm10_11, inv_box, inv_hdr, spalt_node, spalt_txt, inv_arrows, kor_node, kor_txt, inv_orb,
            mat_box, mat_hdr, tier_synk, synk_txt, tier_met, met_txt, act1_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch3_Act2_Eindeutigkeit_Decomp (Act 2)
# =============================================================================
class Ch3_Act2_Eindeutigkeit_Decomp(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr2 = Text(
            "Act II (Secs. 3.1.3-3.1.4): Eindeutigkeitssatz, Nullsyntrix & Decompositions",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        sm11abc = MathTex(
            r"\widetilde{a}\{\;\}\widetilde{b},\;\overline{||},\;\mathbf{ys}\widetilde{\mathbf{c}}\equiv\langle\bar{f}\widetilde{c}\bar{m}\rangle\;(\text{SM-11a}), \qquad "
            r"\langle\langle f\widetilde{a}\rangle m\rangle,\;\overline{||},\;\widetilde{a}_1\{\;\}_1\cdots\{\;\}_{L-1}\mathbf{ys}\widetilde{\mathbf{c}}\;(\text{SM-11b})",
            font_size=17, color=TEAL_BRIGHT
        ).next_to(hdr2, DOWN, buff=0.12).align_to(hdr2, LEFT)
        self.add_fixed_in_frame_mobjects(hdr2, sm11abc)
        self.play(FadeIn(hdr2), Write(sm11abc), run_time=1.1)

        eind_panel = RoundedRectangle(width=5.7, height=3.35, corner_radius=0.14, color=ROYAL_BLUE, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.5)
        eind_tex = MathTex(
            r"\mathbf{Heim's\;Eindeutigkeitssatz\;(SM,\;p.\;50):}\\[4pt]"
            r"\text{A Korporator is algebraically determinate iff}\\"
            r"r \cap \{K_m, C_m\} \neq \emptyset \;\wedge\; r \cap \{K_s, C_s\} \neq \emptyset\\[5pt]"
            r"\bullet\;\mathbf{Totalkorporationen:}\;\text{Single tier only }\implies\text{Ambiguous!}\\[3pt]"
            r"\bullet\;\mathbf{Partielle\;Korporationen:}\;\text{Mix }K\text{ and }C\text{ across tiers.}\\[3pt]"
            r"\bullet\;\mathbf{Nullsyntrix\;\mathbf{ys}\widetilde{\mathbf{c}}\;(\text{SM-11a}):}\;F_\gamma = \emptyset\;\forall\gamma\ge 1",
            font_size=15, color=WHITE
        ).move_to(eind_panel)

        dec_panel = RoundedRectangle(width=5.8, height=3.35, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.5)
        dec_tex = MathTex(
            r"\mathbf{1st\;Decomposition\;Theorem\;(\text{SM-11b}):}\\[4pt]"
            r"x\mathbf{y}\widetilde{\mathbf{a}} \;\xrightarrow{\;D_s\text{ Contractions}\;}\; "
            r"\mathbf{y}\widetilde{\mathbf{a}}_1\{\;\}_1\mathbf{y}\widetilde{\mathbf{a}}_2\cdots\{\;\}_{L-1}\mathbf{ys}\widetilde{\mathbf{c}}\\[5pt]"
            r"\mathbf{2nd\;Decomposition\;Theorem\;(\text{SM-11c}):}\\[3pt]"
            r"\text{Every pyramidal syntrix decomposes into the 4 basis gates:}",
            font_size=14, color=HOLO_GOLD
        ).move_to(dec_panel.get_top() + DOWN * 1.05)

        gate_cols = [ROYAL_BLUE, TEAL_BRIGHT, ORANGE_GOLD, PURPLE_SYN]
        gate_row = VGroup()
        for j in range(4):
            gb = RoundedRectangle(width=1.02, height=0.55, corner_radius=0.07, color=gate_cols[j], fill_opacity=0.25)
            gt = MathTex(rf"\mathbf{{y}}\widetilde{{\mathbf{{a}}}}_{{({j+1})}}", font_size=15, color=WHITE).move_to(gb)
            gate_row.add(VGroup(gb, gt))
            if j < 3:
                gate_row.add(MathTex(r"\{\;\}", font_size=16, color=HOLO_GOLD))
        gate_row.arrange(RIGHT, buff=0.08).move_to(dec_panel.get_bottom() + UP * 0.58)

        act2_foot = MathTex(
            r"\text{Combinatorial Taxonomy of }\mathcal{P}(\{K_s,C_s,K_m,C_m\})\setminus\{\emptyset\}:\quad "
            r"\sum_{\kappa=1}^4 \binom{4}{\kappa} = 4 + 6 + 4 + 1 = \mathbf{15\text{ Corporate Classes}}",
            font_size=18, color=GREEN_C
        ).to_edge(DOWN, buff=0.20)

        self.play(Create(eind_panel), Write(eind_tex), Create(dec_panel), Write(dec_tex), FadeIn(gate_row, lag_ratio=0.1), Write(act2_foot), run_time=1.9)
        self.wait(0.7)
        self.play(FadeOut(VGroup(hdr2, sm11abc, eind_panel, eind_tex, dec_panel, dec_tex, gate_row, act2_foot)), run_time=0.8)



# =============================================================================
# SCENE: Ch3_Act3_Category_Syn_Zero (Act 3)
# =============================================================================
class Ch3_Act3_Category_Syn_Zero(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr3 = Text(
            "Act III (Secs. 3.1.5 & 3.2.1-3.2.2): Category Syn, Functor R & Zero Object",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        syn_top = MathTex(
            r"\mathfrak{R}: \mathbf{Ctx}_{\text{adm}}^{\text{sk}} \longrightarrow \mathbf{FinBan}_{\le 1}\;\;(U\mapsto P^U), \qquad "
            r"\mathcal{S} := (U,\, \mathbf{F}=\{F_\gamma\}_{\gamma\ge 0},\, \theta,\, \iota: F_0\xrightarrow{\sim} P^U) \in \operatorname{Obj}(\mathbf{Syn})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr3, DOWN, buff=0.12).align_to(hdr3, LEFT)
        self.add_fixed_in_frame_mobjects(hdr3, syn_top)
        self.play(FadeIn(hdr3), Write(syn_top), run_time=1.1)

        syn_box = RoundedRectangle(width=5.7, height=3.35, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.5)
        syn_tex = MathTex(
            r"\mathbf{Def\;3.3\;(Morphisms\;\Phi=(h,(\Phi_\gamma))\;in\;\mathbf{Syn}):}\\[4pt]"
            r"\begin{matrix} "
            r"F_0^a & \xrightarrow{\;\;\Phi_0\;\;} & F_0^b \\ "
            r"\downarrow\scriptstyle\iota_a\cong & \circlearrowright & \downarrow\scriptstyle\iota_b\cong \\ "
            r"P^{U_a} & \xrightarrow{\;\mathfrak{R}(h)=h_P\;} & P^{U_b} "
            r"\end{matrix}\\[6pt]"
            r"\bullet\;\text{Operadic Intertwining: }\Phi_\gamma \circ \theta^a = \theta^b \circ (\operatorname{id}_{\mathcal{O}}\widehat{\otimes}_\pi\bigotimes\Phi_{\gamma_i})\\[3pt]"
            r"\bullet\;\text{Prop 3.1: }3\text{ Conflexive Distributions (Lengths, Fields, Branches)}",
            font_size=14, color=WHITE
        ).move_to(syn_box)

        z_box = RoundedRectangle(width=5.7, height=3.35, corner_radius=0.14, color=CRIMSON_RED, fill_opacity=0.09).move_to(RIGHT * 3.15 + DOWN * 0.5)
        z_hdr = MathTex(
            r"\text{Prop 3.2: Zero Object }0_{\mathbf{Syn}} \equiv \mathcal{R}(\mathbf{ys}\widetilde{\mathbf{c}})",
            font_size=18, color=HOLO_GOLD
        ).next_to(z_box.get_top(), DOWN, buff=0.12)

        sa_nd = RoundedRectangle(width=1.6, height=0.62, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.22).move_to(RIGHT * 1.15 + DOWN * 0.40)
        z0_nd = RoundedRectangle(width=2.1, height=0.72, corner_radius=0.08, color=CRIMSON_RED, fill_opacity=0.28).move_to(RIGHT * 3.15 + DOWN * 0.40)
        sb_nd = RoundedRectangle(width=1.6, height=0.62, corner_radius=0.08, color=TEAL_BRIGHT, fill_opacity=0.22).move_to(RIGHT * 5.15 + DOWN * 0.40)

        t_sa = MathTex(r"\mathcal{S}_a", font_size=19).move_to(sa_nd)
        # BUGFIX: Safely construct multiline MathTex with braces using VGroup
        t_z0 = VGroup(
            MathTex(r"0_{\mathbf{Syn}}", font_size=16, color=HOLO_GOLD),
            MathTex(r"\{0\}_{\gamma\ge 0}", font_size=16, color=HOLO_GOLD)
        ).arrange(DOWN, buff=0.05).move_to(z0_nd)

        t_sb = MathTex(r"\mathcal{S}_b", font_size=19).move_to(sb_nd)

        arr_term = DashedLine(sa_nd.get_right(), z0_nd.get_left(), color=HOLO_GOLD, stroke_width=2.8).add_tip(tip_length=0.18)
        arr_init = DashedLine(z0_nd.get_right(), sb_nd.get_left(), color=HOLO_GOLD, stroke_width=2.8).add_tip(tip_length=0.18)
        lbl_term = MathTex(r"\exists!\,0", font_size=15, color=HOLO_GOLD).next_to(arr_term, UP, buff=0.04)
        lbl_init = MathTex(r"\exists!\,0", font_size=15, color=HOLO_GOLD).next_to(arr_init, UP, buff=0.04)

        z_desc = MathTex(
            r"0_{\mathbf{Syn}} := (0_{\mathbf{Ctx}},\, \{0\}_{\gamma\ge 0},\, 0,\, \operatorname{id}_{\{0\}})\text{ is Initial \& Terminal!}",
            font_size=15, color=GREEN_C
        ).move_to(z_box.get_bottom() + UP * 0.32)

        act3_foot = MathTex(
            r"\text{Exzenter Schema (SM-12): }\; \widetilde{a}^{(k)}\{\;\}^{(l)}\widetilde{b},\;\overline{||},\;\widetilde{c} "
            r"\qquad\text{Syntropod Chain (SM-13): }\; \left(\widetilde{a}_i^{(k_i)}\{\;\}_i^{(l_{i+1})}\widetilde{a}_{i+1}\right]_{i=1}^{N-1},\;\overline{||},\;\widetilde{c}",
            font_size=17, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            Create(syn_box), Write(syn_tex), Create(z_box), Write(z_hdr),
            FadeIn(sa_nd, t_sa, z0_nd, t_z0, sb_nd, t_sb),
            Create(arr_term), Write(lbl_term), Create(arr_init), Write(lbl_init),
            Write(z_desc), Write(act3_foot), run_time=1.8
        )
        self.wait(0.7)

        self.play(FadeOut(VGroup(
            hdr3, syn_top, syn_box, syn_tex, z_box, z_hdr, sa_nd, t_sa, z0_nd, t_z0, sb_nd, t_sb,
            arr_term, lbl_term, arr_init, lbl_init, z_desc, act3_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Ch3_Act4_Orbital_Pushout (Act 4)
# =============================================================================
class Ch3_Act4_Orbital_Pushout(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr4 = Text(
            "Act IV (Sec. 3.2.3): Orbital Conflexivity (Fig 3.1) & Span Pushout (Fig 3.2)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        po_top = MathTex(
            r"C_m(P_a,P_b) := P_a \oplus_1 P_b\;(\dim = p+q), \qquad "
            r"K_m:\; P_a \boxplus_\phi P_b := \frac{P_a \oplus_1 P_b}{\operatorname{Im}(\delta_\phi)}\;"
            r"(\dim = p+q-\lambda_{\text{eff}})",
            font_size=17, color=ORANGE_GOLD
        ).next_to(hdr4, DOWN, buff=0.12).align_to(hdr4, LEFT)
        self.add_fixed_in_frame_mobjects(hdr4, po_top)
        self.play(FadeIn(hdr4), Write(po_top), run_time=1.1)

        sep_trk = ValueTracker(2.1)
        lam_trk = ValueTracker(0.0)
        orb_orig = LEFT * 3.1 + DOWN * 0.45

        ecc_orbits = always_redraw(lambda: VGroup(
            Ellipse(width=4.3, height=1.55, color=ORANGE_GOLD, stroke_width=2.0, stroke_opacity=0.35 * lam_trk.get_value()).rotate(22 * DEGREES).move_to(orb_orig),
            Ellipse(width=4.3, height=1.55, color=ORANGE_GOLD, stroke_width=2.0, stroke_opacity=0.35 * lam_trk.get_value()).rotate(-22 * DEGREES).move_to(orb_orig)
        ))

        disk_A = always_redraw(lambda: VGroup(
            Circle(radius=1.45, color=ROYAL_BLUE, fill_color=ROYAL_BLUE, fill_opacity=0.20, stroke_width=3),
            DashedVMobject(Circle(radius=0.92, color=ROYAL_BLUE, stroke_width=1.4), num_dashes=18),
            MathTex(r"P_a\;(p=3)", font_size=17, color=ROYAL_BLUE).shift(UP * 1.1)
        ).move_to(orb_orig + LEFT * sep_trk.get_value() * 0.55))

        disk_B = always_redraw(lambda: VGroup(
            Circle(radius=1.45, color=TEAL_BRIGHT, fill_color=TEAL_BRIGHT, fill_opacity=0.20, stroke_width=3),
            DashedVMobject(Circle(radius=0.92, color=TEAL_BRIGHT, stroke_width=1.4), num_dashes=18),
            MathTex(r"P_b\;(q=3)", font_size=17, color=TEAL_BRIGHT).shift(UP * 1.1)
        ).move_to(orb_orig + RIGHT * sep_trk.get_value() * 0.55))

        knot_core = always_redraw(lambda: VGroup(
            Circle(
                radius=0.14 + 0.11 * lam_trk.get_value(),
                color=ORANGE_GOLD, fill_color=HOLO_GOLD,
                fill_opacity=0.80 if lam_trk.get_value() > 0.05 else 0.0,
                stroke_width=3 if lam_trk.get_value() > 0.05 else 0.0
            ).move_to(orb_orig),
            MathTex(
                r"R_\phi", font_size=18,
                color=BLACK if lam_trk.get_value() > 0.4 else ORANGE_GOLD
            ).move_to(orb_orig).set_opacity(1.0 if lam_trk.get_value() > 0.05 else 0.0)
        ))

        dash_panel = RoundedRectangle(width=5.8, height=3.35, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.45)
        dash_hdr = MathTex(
            r"\delta_\phi(r) := (\phi_a(r), -\phi_b(r)), \quad \|[(x,y)]\|_q := \inf_r(\|x-\phi_a r\|+\|y+\phi_b r\|)",
            font_size=14, color=ORANGE_GOLD
        ).next_to(dash_panel.get_top(), DOWN, buff=0.12)

        r_lbl = MathTex(r"\text{Shared Rank }\lambda_{\text{eff}} = \operatorname{rank}(\delta_\phi) = ", font_size=17, color=HOLO_GOLD)
        r_dec = DecimalNumber(0.00, num_decimal_places=2, font_size=17, color=HOLO_GOLD)
        r_dec.add_updater(lambda m: m.set_value(lam_trk.get_value()))
        r_row = VGroup(r_lbl, r_dec).arrange(RIGHT, buff=0.08).move_to(dash_panel.get_center() + UP * 0.55)

        q_lbl = MathTex(r"\text{Quotient Dim } \dim(P_a\boxplus_\phi P_b) = 6 - \lambda_{\text{eff}} = ", font_size=17, color=GREEN_C)
        q_dec = DecimalNumber(6.00, num_decimal_places=2, font_size=17, color=GREEN_C)
        q_dec.add_updater(lambda m: m.set_value(6.0 - lam_trk.get_value()))
        q_row = VGroup(q_lbl, q_dec).arrange(RIGHT, buff=0.08).move_to(dash_panel.get_center() + DOWN * 0.05)

        z_lbl = MathTex(r"\text{Combinatorial Count } Z_{\text{comb}} = p\cdot\lambda\cdot q = ", font_size=16, color=TEAL_BRIGHT)
        z_dec = DecimalNumber(0.0, num_decimal_places=1, font_size=16, color=TEAL_BRIGHT)
        z_dec.add_updater(lambda m: m.set_value(9.0 * lam_trk.get_value()))
        z_row = VGroup(z_lbl, z_dec).arrange(RIGHT, buff=0.08).move_to(dash_panel.get_center() + DOWN * 0.65)

        toy31_tex = MathTex(
            r"\text{Toy Ex (Rem 3.2): }\mathbb{R}^3_{(x,y,z)}\boxplus_{\mathbb{R}_z}\mathbb{R}^3_{(z,\theta,\psi)}\cong\mathbb{R}^5\;\;([\operatorname{Im}(\delta_\phi)]=\mathbf{0})",
            font_size=14, color=WHITE
        ).move_to(dash_panel.get_bottom() + UP * 0.25)

        carnap31_foot = MathTex(
            r"\text{Carnap 3.1 (Intersubjective Constitution \& OSR): }\; "
            r"0 \longrightarrow R_\phi/(\ker\phi_a\cap\ker\phi_b) \xrightarrow{\;\bar{\delta}_\phi\;} "
            r"P_a\oplus_1 P_b \xrightarrow{\;\pi_{\boxplus}\;} P_a\boxplus_\phi P_b \longrightarrow 0",
            font_size=17, color=PURPLE_SYN
        ).to_edge(DOWN, buff=0.20)

        self.play(
            FadeIn(ecc_orbits, disk_A, disk_B, knot_core),
            Create(dash_panel), Write(dash_hdr),
            FadeIn(r_row, q_row, z_row), Write(toy31_tex), Write(carnap31_foot),
            run_time=1.6
        )
        self.play(sep_trk.animate.set_value(1.15), lam_trk.animate.set_value(1.00), run_time=1.5, rate_func=rate_functions.ease_in_out_sine)
        self.play(sep_trk.animate.set_value(0.25), lam_trk.animate.set_value(3.00), run_time=1.5, rate_func=rate_functions.ease_in_out_sine)

        r_dec.clear_updaters()
        q_dec.clear_updaters()
        z_dec.clear_updaters()
        self.wait(0.5)
        self.remove(ecc_orbits, disk_A, disk_B, knot_core)

        self.play(FadeOut(VGroup(hdr4, po_top, dash_panel, dash_hdr, r_row, q_row, z_row, toy31_tex, carnap31_foot)), run_time=0.8)



# =============================================================================
# SCENE: Ch3_Act5_Konflektorknoten_Modules (Act 5)
# =============================================================================
class Ch3_Act5_Konflektorknoten_Modules(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr5 = Text(
            "Act V (Secs. 3.2.3-3.2.4): Konflektorknoten (Fig 3.3) & Module Lifts (C_s, K_s)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr5)
        self.play(FadeIn(hdr5), run_time=0.6)

        pb_a = RoundedRectangle(width=2.5, height=1.10, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.18).move_to(LEFT * 4.65 + UP * 1.15)
        pb_b = RoundedRectangle(width=2.5, height=1.10, corner_radius=0.08, color=TEAL_BRIGHT, fill_opacity=0.18).move_to(LEFT * 1.65 + UP * 1.15)

        # BUGFIX: Safely construct multiline MathTex with brackets using VGroup
        tx_pba = VGroup(
            MathTex(r"\text{Band }f_a\in P_a", font_size=14, color=ROYAL_BLUE),
            MathTex(r"[a_1,\, f_1,\, b_1]", font_size=14, color=ROYAL_BLUE)
        ).arrange(DOWN, buff=0.05).move_to(pb_a.get_top() + DOWN * 0.28)

        tx_pbb = VGroup(
            MathTex(r"\text{Band }f_b\in P_b", font_size=14, color=TEAL_BRIGHT),
            MathTex(r"[a_2,\, f_2,\, b_2]", font_size=14, color=TEAL_BRIGHT)
        ).arrange(DOWN, buff=0.05).move_to(pb_b.get_top() + DOWN * 0.28)

        bar_a = Line(pb_a.get_center() + DOWN * 0.2 + LEFT * 0.85, pb_a.get_center() + DOWN * 0.2 + RIGHT * 0.85, color=ROYAL_BLUE, stroke_width=6)
        bar_b = Line(pb_b.get_center() + DOWN * 0.2 + LEFT * 0.85, pb_b.get_center() + DOWN * 0.2 + RIGHT * 0.85, color=TEAL_BRIGHT, stroke_width=6)

        f1_shift = ValueTracker(-0.35)
        f2_shift = ValueTracker(0.40)
        dot_fa = always_redraw(lambda: Dot(pb_a.get_center() + DOWN * 0.2 + RIGHT * f1_shift.get_value(), color=HOLO_GOLD, radius=0.08))
        dot_fb = always_redraw(lambda: Dot(pb_b.get_center() + DOWN * 0.2 + RIGHT * f2_shift.get_value(), color=HOLO_GOLD, radius=0.08))

        kf_node = RoundedRectangle(width=4.4, height=0.90, corner_radius=0.1, color=ORANGE_GOLD, fill_opacity=0.25).move_to(LEFT * 3.15 + DOWN * 0.30)
        kf_txt = MathTex(
            r"\text{Konflektorknoten }\phi_l\;(R_\phi\cong\mathbb{R})\\"
            r"\chi(x_a, x_b) > \theta_{\text{coord}} \implies \delta_\phi(r)=0",
            font_size=15, color=ORANGE_GOLD
        ).move_to(kf_node)

        out_cl = RoundedRectangle(width=4.8, height=0.70, corner_radius=0.08, color=HOLO_GOLD, fill_opacity=0.22).move_to(LEFT * 3.15 + DOWN * 1.65)
        out_txt = MathTex(r"\text{Entangled Unit }c_l := (a_1,\phi_l,b_2)\;(\dim = p+q-1)", font_size=15, color=HOLO_GOLD).move_to(out_cl)

        arr_fa = always_redraw(lambda: Arrow(dot_fa.get_center(), kf_node.get_top() + LEFT * 0.8, color=ORANGE_GOLD, buff=0.05, stroke_width=2.5))
        arr_fb = always_redraw(lambda: Arrow(dot_fb.get_center(), kf_node.get_top() + RIGHT * 0.8, color=ORANGE_GOLD, buff=0.05, stroke_width=2.5))
        arr_out = Arrow(kf_node.get_bottom(), out_cl.get_top(), color=HOLO_GOLD, buff=0.05, stroke_width=3)

        mod_panel = RoundedRectangle(width=5.8, height=3.6, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(RIGHT * 3.1 + DOWN * 0.30)
        mod_tex = MathTex(
            r"\mathbf{Graded\;Module\;Operations\;(Def\;3.5,\;Prop\;3.3):}\\[5pt]"
            r"1.\;\mathbf{Composition\;(C_s):}\;\left(\mathbf{F}^{C_s}\right)_\gamma := F_\gamma^a \oplus_1 F_\gamma^b\\[3pt]"
            r"\;\;\theta^{C_s}(f\otimes\vec{u}) = \big(\theta^a(f\otimes\vec{x}),\; \theta^b(f\otimes\vec{y})\big)\\[5pt]"
            r"2.\;\mathbf{Coupling\;(K_s):}\;\left(\mathbf{F}^{K_s}\right)_\gamma := \bigoplus_{\alpha+\beta=\gamma}^{\ell^1} F_\alpha^a\widehat{\otimes}_\pi F_\beta^b\\[3pt]"
            r"\;\;\theta^{K_s} := (\theta^a\widehat{\otimes}_\pi\theta^b)\circ\tau_m\circ(\Delta_{\vec{\gamma};\gamma}\widehat{\otimes}_\pi\operatorname{id})\\[6pt]"
            r"\mathbf{Def\;3.6\;(Pseudovalenz\;r\;vs.\;Factual\;Valency):}\\"
            r"\operatorname{Val}_{\text{fact}} = r - n + 1\quad (n\text{ identical inputs})",
            font_size=14, color=WHITE
        ).move_to(mod_panel)

        act5_foot = MathTex(
            r"\text{Amalgamated Operadic Coproduct (No Diagonal): }\quad "
            r"\mathbf{F}^a \star_{\mathcal{O}_{\text{syn}}}^{R_\phi} \mathbf{F}^b := \operatorname{Free}_{\mathcal{O}_{\text{syn}}}(P^{U_c}) / \mathcal{I}_{\text{rel}}^{a,b}",
            font_size=17, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(
            FadeIn(pb_a, tx_pba, bar_a, dot_fa, pb_b, tx_pbb, bar_b, dot_fb, kf_node, kf_txt, out_cl, out_txt),
            Create(arr_fa), Create(arr_fb), GrowArrow(arr_out),
            Create(mod_panel), Write(mod_tex), Write(act5_foot),
            run_time=1.8
        )
        self.play(
            f1_shift.animate.set_value(0.25),
            f2_shift.animate.set_value(-0.20),
            kf_node.animate.set_stroke(HOLO_GOLD, width=4),
            out_cl.animate.set_stroke(WHITE, width=3.5),
            run_time=1.2, rate_func=rate_functions.ease_in_out_sine
        )
        self.wait(0.6)
        self.remove(dot_fa, dot_fb, arr_fa, arr_fb)

        self.play(FadeOut(VGroup(
            hdr5, pb_a, tx_pba, bar_a, pb_b, tx_pbb, bar_b,
            kf_node, kf_txt, out_cl, out_txt, arr_out, mod_panel, mod_tex, act5_foot
        )), run_time=0.8)



# =============================================================================
# SCENE: Act6_Sec_331_3level_Determinacy (Act 6)
# =============================================================================
class Act6_Sec_331_3level_Determinacy(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr6 = Text(
            "Act VI (Sec. 3.3.1): 3-Level Corporate Determinacy Architecture (Thm 3.4)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr6)
        self.play(FadeIn(hdr6), run_time=0.6)

        lv1 = RoundedRectangle(width=10.8, height=0.82, corner_radius=0.1, color=ROYAL_BLUE, fill_opacity=0.20).move_to(UP * 1.55)
        lv2 = RoundedRectangle(width=10.8, height=0.96, corner_radius=0.1, color=TEAL_BRIGHT, fill_opacity=0.20).move_to(UP * 0.15)
        lv3 = RoundedRectangle(width=10.8, height=0.96, corner_radius=0.1, color=HOLO_GOLD, fill_opacity=0.24).move_to(DOWN * 1.25)

        tx_lv1 = MathTex(
            r"\mathbf{Level\;I\;(Rule\text{-}Type\;Selection):}\quad "
            r"r \subseteq \{K_s, C_s, K_m, C_m\}, \quad "
            r"\mathsf{Met}:=\{K_m,C_m\},\quad \mathsf{Synk}:=\{K_s,C_s\}",
            font_size=16, color=WHITE
        ).move_to(lv1)

        tx_lv2 = MathTex(
            r"\mathbf{Level\;II\;(Complete\;Corporate\;Specification\;Datum,\;Def\;3.7):}\\"
            r"\Sigma_r := \big(r,\; \Sigma_m=(R_\phi,\phi_a,\phi_b),\; \Sigma_s=(\Phi,\theta^c),\; \Gamma=(U_c,\iota_c),\; \mathsf{Comp}\big)",
            font_size=16, color=TEAL_BRIGHT
        ).move_to(lv2)

        tx_lv3 = MathTex(
            r"\mathbf{Level\;III\;(Universal\;Construction\;Determinacy,\;Thm\;3.4):}\\"
            r"\mathbf{Kor}_{r,\Sigma_r}(\mathcal{S}_a,\mathcal{S}_b) := \mathcal{S}_c = (U_c,\mathbf{F}_c,\theta_c,\iota_c)\in\operatorname{Obj}(\mathbf{Syn})\;\text{ Unique up to Unique Isomorphism!}",
            font_size=16, color=HOLO_GOLD
        ).move_to(lv3)

        lv_arr1 = Arrow(lv1.get_bottom(), lv2.get_top(), color=TEAL_BRIGHT, buff=0.05, stroke_width=3)
        lv_arr2 = Arrow(lv2.get_bottom(), lv3.get_top(), color=HOLO_GOLD, buff=0.05, stroke_width=3)

        lean3_foot = MathTex(
            r"\text{Lean 4 (\texttt{Syntrometrie.StratumA.Corporations}): }\; "
            r"\texttt{IsMixedSelection }r \;\wedge\; \texttt{pushoutCarrierDim p q 0 = p + q}",
            font_size=17, color=GREEN_C
        ).to_edge(DOWN, buff=0.20)

        self.play(
            FadeIn(lv1, tx_lv1), GrowArrow(lv_arr1),
            FadeIn(lv2, tx_lv2), GrowArrow(lv_arr2),
            FadeIn(lv3, tx_lv3), Write(lean3_foot),
            run_time=1.8
        )
        self.wait(0.7)

        self.play(FadeOut(VGroup(hdr6, lv1, tx_lv1, lv2, tx_lv2, lv3, tx_lv3, lv_arr1, lv_arr2, lean3_foot)), run_time=0.8)



# =============================================================================
# SCENE: Ch3_Act7_Tesseract_15_Classes (Act 7)
# =============================================================================
class Ch3_Act7_Tesseract_15_Classes(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr7 = Text(
            "Act VII (Sec. 3.3.2): 4D Tesseract of the 15 Corporate Classes (9 Mixed / 6 Pure)",
            font_size=19, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        part15_eq = MathTex(
            r"\kappa=4:\;1\text{ Mixed} \quad\mid\quad \kappa=3:\;4\text{ Mixed} \quad\mid\quad "
            r"\kappa=2:\;4\text{ Mixed} + 2\text{ Pure} \quad\mid\quad \kappa=1:\;4\text{ Pure} "
            r"\;\Longrightarrow\; \mathbf{9\text{ Mixed} + 6\text{ Pure} = 15}",
            font_size=17, color=TEAL_BRIGHT
        ).to_edge(DOWN, buff=0.20)
        self.add_fixed_in_frame_mobjects(hdr7, part15_eq)
        self.play(FadeIn(hdr7), Write(part15_eq), run_time=1.1)

        self.move_camera(phi=64 * DEGREES, theta=-38 * DEGREES, run_time=1.6)

        v_map = {}
        v_dots = VGroup()
        for b0 in [0, 1]:
            for b1 in [0, 1]:
                for b2 in [0, 1]:
                    for b3 in [0, 1]:
                        rad = 0.68 if b3 == 1 else 1.55
                        pos = np.array([(2 * b0 - 1) * rad - 1.4, (2 * b1 - 1) * rad, (2 * b2 - 1) * rad * 0.85])
                        v_map[(b0, b1, b2, b3)] = pos
                        has_m = (b0 == 1) or (b1 == 1)
                        has_s = (b2 == 1) or (b3 == 1)
                        if not has_m and not has_s:
                            col, r_d = WHITE, 0.08
                        elif has_m and has_s:
                            col = HOLO_GOLD if (b0 + b1 + b2 + b3 == 4) else TEAL_BRIGHT
                            r_d = 0.13 if (b0 + b1 + b2 + b3 == 4) else 0.10
                        else:
                            col, r_d = CRIMSON_RED, 0.10
                        v_dots.add(Dot3D(pos, radius=r_d, color=col))

        t_edges = VGroup()
        k_list = list(v_map.keys())
        for i in range(len(k_list)):
            for j in range(i + 1, len(k_list)):
                ka, kb = k_list[i], k_list[j]
                if sum(abs(ka[d] - kb[d]) for d in range(4)) == 1:
                    is_w = (ka[3] != kb[3])
                    t_edges.add(Line3D(v_map[ka], v_map[kb], color=ORANGE_GOLD if is_w else SLATE_GREY, thickness=0.012 if is_w else 0.015))

        tess_3d = VGroup(t_edges, v_dots)

        tess_hud = RoundedRectangle(width=5.4, height=2.5, corner_radius=0.12, color=TEAL_BRIGHT, fill_opacity=0.12).to_corner(UR, buff=0.35).shift(DOWN * 0.65)
        tess_txt = MathTex(
            r"\mathbf{Prop\;3.5\;\&\;3.6\;(4D\;Tesseract\;Lattice):}\\[4pt]"
            r"\bullet\;\text{Gold (1): Full Matrix }\{K_s,C_s,K_m,C_m\}\\[3pt]"
            r"\bullet\;\text{Teal (8): Mixed Pairs \& Triads (Determinate)}\\[3pt]"
            r"\bullet\;\text{Red (6): Pure Single-Tier }\subseteq\mathsf{Met}\text{ or }\subseteq\mathsf{Synk}\\[3pt]"
            r"\bullet\;\text{White (1): Vacuous Origin }\emptyset",
            font_size=15, color=WHITE
        ).move_to(tess_hud)
        self.add_fixed_in_frame_mobjects(tess_hud, tess_txt)

        self.play(Create(t_edges), FadeIn(v_dots, tess_hud, tess_txt), run_time=1.6)
        self.play(Rotate(tess_3d, angle=PI * 0.85, axis=UP + OUT * 0.4), run_time=2.8, rate_func=rate_functions.linear)

        self.move_camera(phi=0 * DEGREES, theta=-90 * DEGREES, run_time=1.2)
        self.play(FadeOut(VGroup(tess_3d, tess_hud, tess_txt, hdr7, part15_eq)), run_time=0.8)



# =============================================================================
# SCENE: Ch3_Act8_Homogeneous_Decomp (Act 8)
# =============================================================================
class Ch3_Act8_Homogeneous_Decomp(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr8 = Text(
            "Act VIII (Secs. 3.3.3-3.3.4): Homogeneous Decomposition Chain (Thms 3.8-3.10)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        dec_top = MathTex(
            r"\mu: \operatorname{Obj}(\mathbf{Syn}_{\text{hom}}) \longrightarrow \mathbb{N}, \quad "
            r"\mu(D_s(\mathcal{S})) < \mu(\mathcal{S}), \quad "
            r"\mu(\mathcal{S})=0 \iff \mathcal{S}\cong 0_{\mathbf{Syn}}, \quad "
            r"n_H - \mu = \sum_{j=1}^p n_j\;\; (\text{Thm 3.10})",
            font_size=17, color=ROYAL_BLUE
        ).next_to(hdr8, DOWN, buff=0.12).align_to(hdr8, LEFT)
        self.add_fixed_in_frame_mobjects(hdr8, dec_top)
        self.play(FadeIn(hdr8), Write(dec_top), run_time=1.1)

        ch_nodes = VGroup()
        ch_labels = [
            (r"\mathcal{S}\in\mathbf{Syn}_{\text{hom}}\\\mu(\mathcal{S})=3", PURPLE_SYN),
            (r"D_s(\mathcal{S})\oplus\mathcal{P}_1\\\mu=2", ORANGE_GOLD),
            (r"D_s^2(\mathcal{S})\oplus\mathcal{P}_2\\\mu=1", TEAL_BRIGHT),
            (r"0_{\mathbf{Syn}}\equiv\mathbf{ys}\widetilde{\mathbf{c}}\\\mu=0", CRIMSON_RED),
        ]
        for idx, (l_tx, l_col) in enumerate(ch_labels):
            bx = RoundedRectangle(width=2.6, height=1.05, corner_radius=0.1, color=l_col, fill_opacity=0.20).move_to(LEFT * 4.65 + RIGHT * idx * 3.1 + UP * 0.35)
            # BUGFIX: Safely construct multiline MathTex
            lines = l_tx.split(r"\\")
            tx = VGroup(*[MathTex(l, font_size=16, color=WHITE) for l in lines]).arrange(DOWN, buff=0.05).move_to(bx)
            ch_nodes.add(VGroup(bx, tx))

        ch_arrs = VGroup(*[Arrow(ch_nodes[k].get_right(), ch_nodes[k+1].get_left(), color=HOLO_GOLD, buff=0.06, stroke_width=3) for k in range(3)])

        mu_trk = ValueTracker(3.0)
        mu_lbl = MathTex(r"\text{Well-Founded Complexity }\mu(D_s^k(\mathcal{S})) = ", font_size=18, color=HOLO_GOLD)
        mu_dec = DecimalNumber(3.0, num_decimal_places=0, font_size=18, color=HOLO_GOLD)
        mu_dec.add_updater(lambda m: m.set_value(mu_trk.get_value()))
        mu_row = VGroup(mu_lbl, mu_dec).arrange(RIGHT, buff=0.08).move_to(DOWN * 0.42)

        enthom_box = RoundedRectangle(width=11.8, height=1.5, corner_radius=0.12, color=TEAL_BRIGHT, fill_opacity=0.09).move_to(DOWN * 1.35)
        enthom_tex = MathTex(
            r"\bullet\;\text{Thm 3.8 (Iterated Corporate Chain): }\; "
            r"\mathcal{S} \cong \mathbf{Kor}_{r_{L-1}}\!\left(\dots\mathbf{Kor}_{r_1}(\mathcal{S}_1,\mathcal{S}_2),\dots,\mathcal{S}_L\right) \quad (\mathcal{S}_k\in\mathbf{Syn}_{\text{pyr}})\\[4pt]"
            r"\bullet\;\text{Prop 3.9 (\textit{Enthomogenisierende Dekomposition}): }\; "
            r"\text{Removes shared }F_1\text{ from Homogenfragment }\implies\text{Pyramidal fragments start at }\gamma=2",
            font_size=15, color=WHITE
        ).move_to(enthom_box)

        self.play(FadeIn(ch_nodes[0], mu_row), Create(enthom_box), Write(enthom_tex), run_time=1.3)
        for k in range(3):
            self.play(
                GrowArrow(ch_arrs[k]), FadeIn(ch_nodes[k + 1]),
                mu_trk.animate.set_value(2.0 - k),
                run_time=0.65
            )
        mu_dec.clear_updaters()
        self.wait(0.6)

        self.play(FadeOut(VGroup(hdr8, dec_top, ch_nodes, ch_arrs, mu_row, enthom_box, enthom_tex)), run_time=0.8)



# =============================================================================
# SCENE: Act9_Sec_335_4syntropod_Colimit (Act 9)
# =============================================================================
class Act9_Sec_335_4syntropod_Colimit(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr9 = Text(
            "Act IX (Sec. 3.3.5): 4-Syntropod Colimit Network (Fig 3.6) & Conflexivity",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        col_top = MathTex(
            r"\tau_{\le k}(\mathcal{S}) := (U,\,(F_0,\dots,F_k,\{0\},\dots),\,\theta|_{\le k},\,\iota), \quad "
            r"\mathbf{y}\widetilde{\mathbf{c}} \cong \varinjlim_{\mathsf{Tree}_{\mathbf{Kor}}(G_{\mathcal{S}})} D, \quad "
            r"\operatorname{ConfIndex}_{\text{pres}}(G_{\mathcal{S}}) := k(V,E_C) = |E_K| + 1 = \varepsilon + 1",
            font_size=16, color=ROYAL_BLUE
        ).next_to(hdr9, DOWN, buff=0.12).align_to(hdr9, LEFT)
        self.add_fixed_in_frame_mobjects(hdr9, col_top)
        self.play(FadeIn(hdr9), Write(col_top), run_time=1.1)

        syn_leaves = VGroup()
        for idx in range(4):
            bx = RoundedRectangle(width=2.3, height=0.65, corner_radius=0.08, color=ROYAL_BLUE, fill_opacity=0.20).move_to(LEFT * 4.5 + RIGHT * idx * 3.0 + UP * 1.05)
            tx = MathTex(rf"\text{{Syntropode }}\mathcal{{S}}_{idx+1}\;(\mathbb{{R}}^{{p_{idx+1}}})", font_size=14, color=WHITE).move_to(bx)
            syn_leaves.add(VGroup(bx, tx))

        k1_ex = RoundedRectangle(width=3.6, height=0.72, corner_radius=0.1, color=ORANGE_GOLD, fill_opacity=0.24).move_to(LEFT * 3.0 + DOWN * 0.25)
        t_k1 = MathTex(r"\mathbf{Kor}_1\text{ (Exzenter }e_1\in E_K): P_1\boxplus_{\phi_1} P_2", font_size=15, color=ORANGE_GOLD).move_to(k1_ex)

        r_phi1 = Circle(radius=0.24, color=ORANGE_GOLD, fill_color=ORANGE_GOLD, fill_opacity=0.28).move_to(LEFT * 3.0 + UP * 0.45)
        t_rphi1 = MathTex(r"R_{\phi_1}", font_size=13, color=HOLO_GOLD).move_to(r_phi1)

        k2_kz = RoundedRectangle(width=3.6, height=0.72, corner_radius=0.1, color=ROYAL_BLUE, fill_opacity=0.24).move_to(RIGHT * 3.0 + DOWN * 0.25)
        t_k2 = MathTex(r"\mathbf{Kor}_2\text{ (Konzenter }e_2\in E_C): P_3\oplus_1 P_4", font_size=15, color=ROYAL_BLUE).move_to(k2_kz)

        apex_c = RoundedRectangle(width=6.8, height=0.80, corner_radius=0.12, color=HOLO_GOLD, fill_opacity=0.25).move_to(DOWN * 1.65)
        # BUGFIX: Handle multiline text strictly in a safe way without raw \dim causing align issues
        t_apex = MathTex(
            r"\text{Composite Apex }\mathbf{y}\widetilde{\mathbf{c}}\text{ via Exzenter }e_3\in E_K:\; "
            r"\text{dim} = \sum_{i=1}^4 p_i - (\lambda_1 + \lambda_2)",
            font_size=16, color=HOLO_GOLD
        ).move_to(apex_c)

        r_phi2 = Circle(radius=0.24, color=ORANGE_GOLD, fill_color=ORANGE_GOLD, fill_opacity=0.28).move_to(DOWN * 0.90)
        t_rphi2 = MathTex(r"R_{\phi_2}", font_size=13, color=HOLO_GOLD).move_to(r_phi2)

        edges_ex = VGroup(
            DashedLine(syn_leaves[0].get_bottom(), k1_ex.get_top() + LEFT * 0.6, color=ORANGE_GOLD, stroke_width=3),
            DashedLine(syn_leaves[1].get_bottom(), k1_ex.get_top() + RIGHT * 0.6, color=ORANGE_GOLD, stroke_width=3),
            DashedLine(k1_ex.get_bottom(), apex_c.get_top() + LEFT * 1.2, color=ORANGE_GOLD, stroke_width=3.5),
            DashedLine(k2_kz.get_bottom(), apex_c.get_top() + RIGHT * 1.2, color=ORANGE_GOLD, stroke_width=3.5),
            r_phi1, t_rphi1, r_phi2, t_rphi2
        )
        edges_kz = VGroup(
            Line(syn_leaves[2].get_bottom(), k2_kz.get_top() + LEFT * 0.6, color=ROYAL_BLUE, stroke_width=3),
            Line(syn_leaves[3].get_bottom(), k2_kz.get_top() + RIGHT * 0.6, color=ROYAL_BLUE, stroke_width=3)
        )

        forest_halos = VGroup(
            dashed_box(2.5, 0.85, GREEN_C, 8).move_to(syn_leaves[0].get_center()),
            dashed_box(2.5, 0.85, GREEN_C, 8).move_to(syn_leaves[1].get_center()),
            dashed_box(3.8, 1.85, GREEN_C, 12).move_to(k2_kz.get_top() + UP * 0.15)
        )

        conf_foot = MathTex(
            r"|V|=4,\;\; |E_K|=\varepsilon=2,\;\; |E_C|=1 \;\Longrightarrow\; "
            r"\operatorname{ConfIndex}_{\text{pres}}(G_{\mathcal{S}}) = |E_K| + 1 = \mathbf{3}\quad(\text{3-gliedrig konflexiv})",
            font_size=18, color=GREEN_C
        ).to_edge(DOWN, buff=0.20)

        self.play(
            FadeIn(syn_leaves), Create(k1_ex), Write(t_k1), Create(k2_kz), Write(t_k2),
            Create(apex_c), Write(t_apex), FadeIn(edges_ex), Create(edges_kz), Write(conf_foot),
            run_time=1.8
        )
        self.play(edges_ex.animate.set_opacity(0.12), FadeIn(forest_halos), run_time=0.75)
        self.play(edges_ex.animate.set_opacity(1.0), FadeOut(forest_halos), run_time=0.75)
        self.wait(0.5)

        self.play(FadeOut(VGroup(hdr9, col_top, syn_leaves, k1_ex, t_k1, k2_kz, t_k2, apex_c, t_apex, edges_ex, edges_kz, conf_foot)), run_time=0.8)



# =============================================================================
# SCENE: Act10_Sec_335_Pseudoexzenter_21branch (Act 10)
# =============================================================================
class Act10_Sec_335_Pseudoexzenter_21branch(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr10 = Text(
            "Act X (Sec. 3.3.5): Pseudoexzenter 21-Branch Fan-Out & Stage III (Dim 36)",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr10)
        self.play(FadeIn(hdr10), run_time=0.6)

        fan_frame = RoundedRectangle(width=5.7, height=3.7, corner_radius=0.14, color=TEAL_BRIGHT, fill_opacity=0.08).move_to(LEFT * 3.15 + DOWN * 0.35)
        fan_hdr = MathTex(
            r"\text{Thm 3.11 (Pseudoexzenter Fan-Out): } N_{\text{branches}} = N + \binom{N}{2} = \frac{1}{2}N(N+1)",
            font_size=15, color=TEAL_BRIGHT
        ).next_to(fan_frame.get_top(), DOWN, buff=0.12)

        h_orig = LEFT * 3.15 + DOWN * 0.50
        h_pts = [h_orig + np.array([1.2 * np.cos(k * PI / 3), 1.2 * np.sin(k * PI / 3), 0]) for k in range(6)]
        chords_15 = VGroup(*[Line(h_pts[i], h_pts[j], color=TEAL_BRIGHT, stroke_width=2.0, stroke_opacity=0.75) for i in range(6) for j in range(i + 1, 6)])
        nodes_6 = VGroup(*[Circle(radius=0.14, color=HOLO_GOLD, fill_color=ORANGE_GOLD, fill_opacity=0.9).move_to(p) for p in h_pts])
        fan_sub = MathTex(
            r"N=6 \implies 6\text{ Pure} + \binom{6}{2}=15\text{ Mixed} = \mathbf{21\text{ Symmetric Branches}}",
            font_size=15, color=HOLO_GOLD
        ).move_to(fan_frame.get_bottom() + UP * 0.25)

        st3_frame = RoundedRectangle(width=5.8, height=3.7, corner_radius=0.14, color=ORANGE_GOLD, fill_opacity=0.09).move_to(RIGHT * 3.1 + DOWN * 0.35)
        st3_tex = MathTex(
            r"\mathbf{Unified\;Running\;Example\;(Stage\;III\;of\;VI):}\\[5pt]"
            r"\bullet\;\text{Two Polarimeters }\mathcal{S}_a,\mathcal{S}_b\;(p=6,\, q=6)\text{ coupled across}\\"
            r"\;\;\text{shared 3D polarization knot }R_\phi = \mathbb{R}^3\;(\lambda_{\text{eff}}=3):\\[4pt]"
            r"P_c = P_a \boxplus_\phi P_b = \frac{\mathbb{R}^6_a \oplus_1 \mathbb{R}^6_b}{\operatorname{Im}(\delta_\phi)} \cong \mathbb{R}^{6+6-3} = \mathbf{\mathbb{R}^9}\\[5pt]"
            r"\bullet\;\text{Conflexivity Index: }\operatorname{ConfIndex}_{\text{pres}}(G_{\mathcal{S}}) = 1 + 1 = \mathbf{2}\\[4pt]"
            r"\bullet\;\text{Synkolative Coupling }(K_s):\; F_1^c = \Lambda^2(\mathbb{R}^9)\implies\\"
            r"\dim F_1^c = \binom{9}{2} = \mathbf{36}\;\text{ (Exact Ch. 9 Hermetry Capacity!)}",
            font_size=14, color=WHITE
        ).move_to(st3_frame)

        self.play(Create(fan_frame), Write(fan_hdr), Create(chords_15), FadeIn(nodes_6), Write(fan_sub), Create(st3_frame), Write(st3_tex), run_time=1.8)
        self.wait(0.7)

        self.play(FadeOut(VGroup(hdr10, fan_frame, fan_hdr, chords_15, nodes_6, fan_sub, st3_frame, st3_tex)), run_time=0.8)



# =============================================================================
# SCENE: Act11_Sec_336_Double_Category (Act 11)
# =============================================================================
class Act11_Sec_336_Double_Category(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr11 = Text(
            "Act XI (Sec. 3.3.6): Double Category Kor(Syn) & Mayer-Vietoris Emergence",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        mv_top = MathTex(
            r"0 \longrightarrow C_\bullet(\mathcal{S}_\phi) \xrightarrow{\;\delta_\phi\;} C_\bullet(\mathcal{S}_a)\oplus_1 C_\bullet(\mathcal{S}_b) \xrightarrow{\;\pi_{\boxplus}\;} C_\bullet(\mathcal{S}_c) \longrightarrow 0 "
            r"\;\Longrightarrow\; H_{\gamma+1}(\mathcal{S}_c) \xrightarrow{\;\partial_*\;} \ker(\delta_{\phi *}) \subset H_\gamma(\mathcal{S}_\phi)",
            font_size=16, color=PURPLE_SYN
        ).next_to(hdr11, DOWN, buff=0.12).align_to(hdr11, LEFT)
        self.add_fixed_in_frame_mobjects(hdr11, mv_top)
        self.play(FadeIn(hdr11), Write(mv_top), run_time=1.1)

        dbl_box = RoundedRectangle(width=5.6, height=3.35, corner_radius=0.14, color=PURPLE_SYN, fill_opacity=0.09).move_to(LEFT * 3.15 + DOWN * 0.55)
        dbl_tex = MathTex(
            r"\mathbf{Def\;3.13\;(Double\;Category\;\mathbb{K}\mathbf{or}(\mathbf{Syn})\;2\text{-}Cell):}\\[6pt]"
            r"\begin{matrix} "
            r"\mathcal{S}_a & \xleftarrow{\;\;\phi_a\;\;} & \mathcal{S}_\phi & \xrightarrow{\;\;\phi_b\;\;} & \mathcal{S}_b \\ "
            r"\downarrow\scriptstyle\Phi_a & & \downarrow\scriptstyle\Phi_\phi & & \downarrow\scriptstyle\Phi_b \\ "
            r"\mathcal{S}'_a & \xleftarrow{\;\phi'_a\;} & \mathcal{S}'_\phi & \xrightarrow{\;\phi'_b\;} & \mathcal{S}'_b "
            r"\end{matrix}\\[8pt]"
            r"\text{Horizontal Span Composition: }\;\mathfrak{K}_2 \odot \mathfrak{K}_1 := R_{\phi_1}\times_{P_b} R_{\phi_2}",
            font_size=15, color=WHITE
        ).move_to(dbl_box)

        em_orig = RIGHT * 3.15 + DOWN * 0.55
        g_trk = ValueTracker(1.15)

        arc_top = always_redraw(lambda: Arc(radius=1.15, start_angle=0, angle=PI, color=ROYAL_BLUE, stroke_width=5).move_arc_center_to(em_orig + UP * g_trk.get_value() * 0.45))
        arc_bot = always_redraw(lambda: Arc(radius=1.15, start_angle=PI, angle=PI, color=TEAL_BRIGHT, stroke_width=5).move_arc_center_to(em_orig + DOWN * g_trk.get_value() * 0.45))

        v_pts = VGroup(Dot(em_orig + LEFT * 1.15, color=ORANGE_GOLD, radius=0.11), Dot(em_orig + RIGHT * 1.15, color=ORANGE_GOLD, radius=0.11))
        em_hdr = MathTex(
            r"H_1(\mathcal{S}_a)=0,\; H_1(\mathcal{S}_b)=0 \;\xrightarrow{v_i=w_i}\; H_1(\mathcal{S}_c)=\mathbb{R}[e_a-e_b]",
            font_size=16, color=HOLO_GOLD
        ).move_to(RIGHT * 3.15 + UP * 1.25)

        carnap32_foot = MathTex(
            r"\text{Carnap 3.2 (Humphreys Fusion Emergence): }\; "
            r"\partial_*([e_a - e_b]) = [r_1 - r_0] \in \ker(\delta_{\phi *}) \neq \{0\} "
            r"\implies \text{Emergent Global Cycle!}",
            font_size=17, color=HOLO_GOLD
        ).to_edge(DOWN, buff=0.20)

        self.play(Create(dbl_box), Write(dbl_tex), Create(arc_top), Create(arc_bot), FadeIn(v_pts), Write(em_hdr), run_time=1.6)
        self.play(g_trk.animate.set_value(0.00), Write(carnap32_foot), run_time=1.6, rate_func=rate_functions.ease_in_out_sine)

        ring_glow = Circle(radius=1.15, color=HOLO_GOLD, fill_color=HOLO_GOLD, fill_opacity=0.28, stroke_width=6).move_to(em_orig)
        cycle_tag = MathTex(r"\partial_*([z]) \in \ker(\delta_{\phi *})", font_size=19, color=HOLO_GOLD).move_to(em_orig)
        self.play(FadeIn(ring_glow), Write(cycle_tag), run_time=0.8)
        self.play(ring_glow.animate.scale(1.08), rate_func=rate_functions.there_and_back, run_time=0.9)
        self.wait(0.5)

        self.remove(arc_top, arc_bot)
        self.play(FadeOut(VGroup(hdr11, mv_top, dbl_box, dbl_tex, v_pts, em_hdr, ring_glow, cycle_tag, carnap32_foot)), run_time=0.8)



# =============================================================================
# SCENE: Ch3_Act12_Synthesis (Act 12)
# =============================================================================
class Ch3_Act12_Synthesis(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        hdr12 = Text(
            "Act XII (Secs. 3.4-3.6): Sanity Checks, Explication & Ch. 3 Synthesis",
            font_size=20, color=HOLO_GOLD
        ).to_corner(UL, buff=0.25)
        self.add_fixed_in_frame_mobjects(hdr12)
        self.play(FadeIn(hdr12), run_time=0.6)

        s3_nodes = VGroup()
        s3_specs = [
            (r"\mathbf{1.\;Selection\;Matrix}\\r,\;\Sigma_r", ROYAL_BLUE, LEFT * 4.3 + UP * 1.45),
            (r"\mathbf{2.\;Carrier\;Coproduct}\\P_a\oplus_1 P_b\;(\text{dim}=p+q)", TEAL_BRIGHT, ORIGIN + UP * 1.45),
            (r"\mathbf{3.\;Span\;Pushout}\\P_a\boxplus_\phi P_b\;(\text{dim}=p+q-\lambda)", ORANGE_GOLD, RIGHT * 4.3 + UP * 1.45),
            (r"\mathbf{4.\;Module\;Lifts}\\C_s\,(\oplus_1),\; K_s\,(\widehat{\otimes}_\pi)", ROYAL_BLUE, LEFT * 4.3 + DOWN * 0.25),
            (r"\mathbf{5.\;Operadic\;Apex}\\\mathbf{Kor}_{r,\Sigma_r}(\mathcal{S}_a,\mathcal{S}_b)", TEAL_BRIGHT, ORIGIN + DOWN * 0.25),
            (r"\mathbf{6.\;Tree\;Colimit}\\\mathbf{y}\widetilde{\mathbf{c}}\cong\varinjlim_{\mathsf{Tree}} D", HOLO_GOLD, RIGHT * 4.3 + DOWN * 0.25),
        ]
        # BUGFIX: Split multiline flowchart nodes using VGroup instead of MathTex with \\
        for t_s, c_s, p_s in s3_specs:
            bx = RoundedRectangle(width=3.5, height=0.92, corner_radius=0.1, color=c_s, fill_opacity=0.20).move_to(p_s)
            lines = t_s.split(r"\\")
            tx = VGroup(*[MathTex(l, font_size=15, color=WHITE) for l in lines]).arrange(DOWN, buff=0.05).move_to(bx)
            s3_nodes.add(VGroup(bx, tx))

        s3_edges = VGroup(
            Arrow(s3_nodes[0].get_right(), s3_nodes[1].get_left(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s3_nodes[1].get_right(), s3_nodes[2].get_left(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s3_nodes[0].get_bottom(), s3_nodes[3].get_top(), color=ROYAL_BLUE, buff=0.06, stroke_width=2.5),
            Arrow(s3_nodes[1].get_bottom(), s3_nodes[4].get_top(), color=TEAL_BRIGHT, buff=0.06, stroke_width=2.5),
            Arrow(s3_nodes[2].get_bottom(), s3_nodes[5].get_top(), color=ORANGE_GOLD, buff=0.06, stroke_width=2.5),
            DashedLine(s3_nodes[3].get_right(), s3_nodes[4].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16),
            DashedLine(s3_nodes[4].get_right(), s3_nodes[5].get_left(), color=ORANGE_GOLD, stroke_width=2.5).add_tip(tip_length=0.16)
        )

        san_box = RoundedRectangle(width=12.0, height=1.65, corner_radius=0.12, color=HOLO_GOLD, fill_opacity=0.14).to_edge(DOWN, buff=0.20)
        san_tex = MathTex(
            r"\bullet\;\text{Sec. 3.5 Sanity Checks: }\; "
            r"(1)\;\lambda=0 \implies P_a\boxplus_0 P_b \cong P_a\oplus_1 P_b\;(p+q) \quad\mid\quad "
            r"(2)\;\lambda=p=q \implies P_a\boxplus_{\text{id}} P_a \cong P_a\;(p)\\[4pt]"
            r"\bullet\;\text{Static Tree Topology: }\;\beta_1(G_{\mathcal{S}}) = (N-1) - N + 1 = 0, \quad "
            r"\text{while Emergent Chain Homology } \partial_*: H_{\gamma+1}(\mathcal{S}_c)\to H_\gamma(\mathcal{S}_\phi)\\[4pt]"
            r"\bullet\;\mathbf{Dialectical\;Ascent\;to\;Chapter\;4:}\;\text{Endow static colimits with Non-Abelian Gauge Curvature }\mathbf{\Omega}_{\text{int}}^{\mathcal{D}}\text{ \& Enyphane Flows }\Phi_t^X",
            font_size=14, color=HOLO_GOLD
        ).move_to(san_box)

        self.play(FadeIn(s3_nodes, lag_ratio=0.08), Create(s3_edges), run_time=1.8)
        self.play(Create(san_box), Write(san_tex), run_time=1.8)
        self.play(san_box.animate.set_stroke(WHITE, width=4), rate_func=rate_functions.there_and_back, run_time=1.0)
        self.wait(2.5)


