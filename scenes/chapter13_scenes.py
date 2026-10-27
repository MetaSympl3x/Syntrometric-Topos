from manim import *
import numpy as np

ROYAL = "#4169E1"
TEAL = "#20B2AA"
GOLD = "#FFD700"
ORANGE = "#FFA500"
CRIMSON = "#DC143C"
PURPLE = "#9370DB"

class Ch13_Act1_Stokes_Wilson_Holonomy(ThreeDScene):
    def construct(self):
        title = Text("Act I: Stokes Wilson Holonomy", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        loop = Circle(radius=1.5, color=ROYAL)
        arrow = Arrow(LEFT * 1.5, RIGHT * 1.5, color=GOLD)
        self.play(Create(loop), Create(arrow), run_time=1.5)
        self.wait(1.5)

class Ch13_Act2_Zeitkorn_Object_Constancy(ThreeDScene):
    def construct(self):
        title = Text("Act II: Zeitkorn Object Constancy", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        dots = VGroup(*[
            Dot([i * 0.6 - 1.5, 0, 0], color=TEAL if i % 2 == 0 else GOLD, radius=0.08)
            for i in range(6)
        ])
        self.play(Create(dots), run_time=1.5)
        self.wait(1.5)

class Ch13_Act3_BRST_Taxonomic_Grid(ThreeDScene):
    def construct(self):
        title = Text("Act III: BRST Taxonomic Grid", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        grid = NumberPlane(x_range=[-2, 2, 1], y_range=[-2, 2, 1]).scale(0.8)
        self.play(Create(grid), run_time=1.5)
        self.wait(1.5)

class Ch13_Act4_DeTurck_Sobolev_Contraction(ThreeDScene):
    def construct(self):
        title = Text("Act IV: DeTurck Sobolev Contraction", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        c = Circle(radius=1.8, color=CRIMSON)
        c2 = Circle(radius=0.9, color=TEAL)
        self.play(Create(c), Transform(c, c2), run_time=1.5)
        self.wait(1.5)

class Ch13_Act5_Coalgebra_Postnikov_Tower(ThreeDScene):
    def construct(self):
        title = Text("Act V: Coalgebra Postnikov Tower", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        tower = VGroup(*[
            Rectangle(width=2.5 - i * 0.4, height=0.5, color=PURPLE).shift(UP * (i * 0.7 - 1.2))
            for i in range(4)
        ])
        self.play(Create(tower), run_time=1.5)
        self.wait(1.5)

class Ch13_Act6_6D_Phenomenal_Hermetry(ThreeDScene):
    def construct(self):
        title = Text("Act VI: 6D Phenomenal Hermetry", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        axes = ThreeDAxes(x_range=[-2, 2], y_range=[-2, 2], z_range=[-2, 2])
        self.set_camera_orientation(phi=65 * DEGREES, theta=45 * DEGREES)
        self.play(Create(axes), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

class Ch13_Act7_K8_Selector_Spectra(ThreeDScene):
    def construct(self):
        title = Text("Act VII: K8 Selector Spectra", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        bars = VGroup(*[
            Rectangle(width=0.35, height=0.4 * (i + 1), fill_color=GOLD, fill_opacity=0.7)
            .move_to(RIGHT * (i - 3) * 0.7 + DOWN * 0.8)
            for i in range(7)
        ])
        self.play(Create(bars), run_time=1.5)
        self.wait(1.5)

class Ch13_Act8_Stokes_Cartan_DEC_Lattice(ThreeDScene):
    def construct(self):
        title = Text("Act VIII: Stokes Cartan DEC Lattice", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        cube = Cube(side_length=2.0, fill_opacity=0.3, stroke_color=ROYAL)
        self.set_camera_orientation(phi=60 * DEGREES, theta=-45 * DEGREES)
        self.play(Create(cube), run_time=1.5)
        self.wait(1.5)

class Ch13_Act9_Phi_Topos_vs_IIT4(ThreeDScene):
    def construct(self):
        title = Text("Act IX: Phi Topos vs IIT 4.0", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        c1 = Circle(radius=1.2, color=ROYAL).shift(LEFT * 1)
        c2 = Circle(radius=1.2, color=ORANGE).shift(RIGHT * 1)
        self.play(Create(c1), Create(c2), run_time=1.5)
        self.wait(1.5)

class Ch13_Act10_Lawvere_Ego_Fixed_Point(ThreeDScene):
    def construct(self):
        title = Text("Act X: Lawvere Ego Fixed Point", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        dot = Dot(ORIGIN, radius=0.15, color=GOLD)
        arrow = CurvedArrow(start_point=UP * 1.5, end_point=RIGHT * 1.5, color=TEAL)
        self.play(Create(dot), Create(arrow), run_time=1.5)
        self.wait(1.5)

class Ch13_Act11_Active_Inference_REBUS(ThreeDScene):
    def construct(self):
        title = Text("Act XI: Active Inference REBUS", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        p = ParametricFunction(lambda t: np.array([t, np.sin(3 * t), 0]), t_range=[-2, 2], color=PURPLE)
        self.play(Create(p), run_time=1.5)
        self.wait(1.5)

class Ch13_Act12_Cognitive_Synthesis_Zombie(ThreeDScene):
    def construct(self):
        title = Text("Act XII: Cognitive Synthesis", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        sphere = Sphere(radius=1.3, resolution=(16, 16)).set_color(GOLD).set_opacity(0.4)
        torus = Torus(major_radius=2.0, minor_radius=0.25).set_color(TEAL).set_opacity(0.5)
        self.set_camera_orientation(phi=65 * DEGREES, theta=45 * DEGREES)
        self.play(Create(sphere), Create(torus), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

