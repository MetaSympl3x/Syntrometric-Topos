from manim import *
import numpy as np

ROYAL = "#4169E1"
TEAL = "#20B2AA"
GOLD = "#FFD700"
ORANGE = "#FFA500"
CRIMSON = "#DC143C"
PURPLE = "#9370DB"

class Ch15_Act1_Master_Axiomatic_DAG(ThreeDScene):
    def construct(self):
        title = Text("Act I: Master Axiomatic DAG", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        d1 = Dot(LEFT * 2, color=ROYAL)
        d2 = Dot(ORIGIN, color=TEAL)
        d3 = Dot(RIGHT * 2, color=GOLD)
        a1 = Arrow(LEFT * 2, ORIGIN, color=ROYAL)
        a2 = Arrow(ORIGIN, RIGHT * 2, color=TEAL)
        self.play(Create(d1), Create(d2), Create(d3), Create(a1), Create(a2), run_time=1.5)
        self.wait(1.5)

class Ch15_Act2_Physics_Landscape_LIV(ThreeDScene):
    def construct(self):
        title = Text("Act II: Physics Landscape LIV", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        plane = NumberPlane().scale(0.8)
        self.play(Create(plane), run_time=1.5)
        self.wait(1.5)

class Ch15_Act3_Conjectures_Topos_12D(ThreeDScene):
    def construct(self):
        title = Text("Act III: 12D Topos Conjectures", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        axes = ThreeDAxes(x_range=[-2, 2], y_range=[-2, 2], z_range=[-2, 2])
        self.set_camera_orientation(phi=60 * DEGREES, theta=45 * DEGREES)
        self.play(Create(axes), run_time=1.5)
        self.wait(1.5)

class Ch15_Act4_Spectral_Gap_Negentropy_I6(ThreeDScene):
    def construct(self):
        title = Text("Act IV: Spectral Gap Negentropy", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        curve = ParametricFunction(lambda t: np.array([t, np.exp(-t * t), 0]), t_range=[-2, 2], color=TEAL)
        self.play(Create(curve), run_time=1.5)
        self.wait(1.5)

class Ch15_Act5_Global_Limits_Reflexive_Loop(ThreeDScene):
    def construct(self):
        title = Text("Act V: Global Reflexive Loop", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        c = Circle(radius=1.5, color=GOLD)
        self.play(Create(c), run_time=1.5)
        self.wait(1.5)

class Ch15_Act6_AppA_Sequent_Calculus(ThreeDScene):
    def construct(self):
        title = Text("Act VI: Appendix A Sequent Calculus", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        tree = VGroup(
            Line(UP, LEFT + DOWN, color=ROYAL),
            Line(UP, RIGHT + DOWN, color=ROYAL)
        )
        self.play(Create(tree), run_time=1.5)
        self.wait(1.5)

class Ch15_Act7_AppA_Cut_Elimination(ThreeDScene):
    def construct(self):
        title = Text("Act VII: Cut Elimination Proof", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        l1 = Line(LEFT * 2, ORIGIN, color=CRIMSON)
        l2 = Line(ORIGIN, RIGHT * 2, color=TEAL)
        self.play(Create(l1), Create(l2), run_time=1.5)
        self.wait(1.5)

class Ch15_Act8_AppA_Joyal_Completeness(ThreeDScene):
    def construct(self):
        title = Text("Act VIII: Joyal Completeness", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        torus = Torus(major_radius=1.6, minor_radius=0.35).set_color(PURPLE).set_opacity(0.6)
        self.set_camera_orientation(phi=65 * DEGREES, theta=30 * DEGREES)
        self.play(Create(torus), run_time=1.5)
        self.wait(1.5)

class Ch15_Act9_AppB_DESY_Mass_Spectrum(ThreeDScene):
    def construct(self):
        title = Text("Act IX: DESY Mass Spectrum Verification", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        bars = VGroup(*[
            Rectangle(width=0.3, height=0.4 * (i + 1), fill_color=GOLD, fill_opacity=0.7)
            .move_to(RIGHT * (i - 3) * 0.6 + DOWN * 0.8)
            for i in range(7)
        ])
        self.play(Create(bars), run_time=1.5)
        self.wait(1.5)

class Ch15_Act10_AppB_Alpha_Verlet_Geodesics(ThreeDScene):
    def construct(self):
        title = Text("Act X: Alpha Verlet Geodesics", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        spiral = ParametricFunction(
            lambda t: np.array([0.15 * t * np.cos(3 * t), 0.15 * t * np.sin(3 * t), 0.1 * t]),
            t_range=[0, 4 * PI], color=ORANGE
        )
        self.set_camera_orientation(phi=65 * DEGREES, theta=-45 * DEGREES)
        self.play(Create(spiral), run_time=1.5)
        self.wait(1.5)

class Ch15_Act11_AppC_Lean4_Firewall_DAG(ThreeDScene):
    def construct(self):
        title = Text("Act XI: Lean 4 Firewall DAG", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        boxes = VGroup(*[
            Rectangle(width=2.2, height=0.5, color=TEAL).shift(UP * (1.2 - i * 0.8))
            for i in range(4)
        ])
        self.play(Create(boxes), run_time=1.5)
        self.wait(1.5)

class Ch15_Act12_AppD_Krawczyk_Cech_Solvers(ThreeDScene):
    def construct(self):
        title = Text("Act XII: Krawczyk Cech Solvers", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        sphere = Sphere(radius=1.3, resolution=(16, 16)).set_color(GOLD).set_opacity(0.4)
        torus = Torus(major_radius=2.0, minor_radius=0.25).set_color(TEAL).set_opacity(0.5)
        self.set_camera_orientation(phi=65 * DEGREES, theta=45 * DEGREES)
        self.play(Create(sphere), Create(torus), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

