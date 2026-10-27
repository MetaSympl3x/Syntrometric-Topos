from manim import *
import numpy as np

ROYAL = "#4169E1"
TEAL = "#20B2AA"
GOLD = "#FFD700"
ORANGE = "#FFA500"
CRIMSON = "#DC143C"
PURPLE = "#9370DB"

class Ch12_Act1_Discontinuity_Four_Tiers(ThreeDScene):
    def construct(self):
        title = Text("Act I: Discontinuity Four Tiers", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        boxes = VGroup(*[
            Rectangle(width=2.5, height=0.6, fill_opacity=0.3, fill_color=ROYAL).shift(UP * (1.5 - i * 0.9))
            for i in range(4)
        ])
        self.play(Create(boxes), run_time=1.5)
        self.wait(1.5)

class Ch12_Act2_Carnap_Goodman_Sheaf(ThreeDScene):
    def construct(self):
        title = Text("Act II: Carnap Goodman Sheaf", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        c1 = Circle(radius=1.2, color=ROYAL).shift(LEFT * 0.7)
        c2 = Circle(radius=1.2, color=TEAL).shift(RIGHT * 0.7)
        self.play(Create(c1), Create(c2), run_time=1.5)
        self.wait(1.5)

class Ch12_Act3_Zombie_Impossibility_Proof(ThreeDScene):
    def construct(self):
        title = Text("Act III: Zombie Impossibility Proof", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        cube = Cube(side_length=2.2, fill_opacity=0.4, stroke_color=CRIMSON)
        self.set_camera_orientation(phi=60 * DEGREES, theta=45 * DEGREES)
        self.play(Create(cube), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

class Ch12_Act4_Dialectical_Aufhebung_Mereology(ThreeDScene):
    def construct(self):
        title = Text("Act IV: Dialectical Aufhebung Mereology", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        p1 = Arrow(start=LEFT * 2, end=ORIGIN, color=ROYAL)
        p2 = Arrow(start=RIGHT * 2, end=ORIGIN, color=ORANGE)
        top = Arrow(start=ORIGIN, end=UP * 2, color=GOLD)
        self.play(Create(p1), Create(p2), run_time=1.0)
        self.play(Create(top), run_time=1.0)
        self.wait(1.5)

class Ch12_Act5_Operadic_Feature_Erasure(ThreeDScene):
    def construct(self):
        title = Text("Act V: Operadic Feature Erasure", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        tree = VGroup(
            Line(UP * 1.5, LEFT * 1.5 + DOWN * 0.5, color=PURPLE),
            Line(UP * 1.5, RIGHT * 1.5 + DOWN * 0.5, color=PURPLE),
            Line(UP * 1.5, DOWN * 0.5, color=PURPLE)
        )
        self.play(Create(tree), run_time=1.5)
        self.wait(1.5)

class Ch12_Act6_Protosimplex_Dimension_Collapse(ThreeDScene):
    def construct(self):
        title = Text("Act VI: Protosimplex Dimension Collapse", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        poly = RegularPolygon(n=5, radius=1.5, color=TEAL)
        self.play(Create(poly), run_time=1.5)
        self.wait(1.5)

class Ch12_Act7_NonAbelian_Qualia_Hodge(ThreeDScene):
    def construct(self):
        title = Text("Act VII: Non-Abelian Qualia Hodge", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        torus = Torus(major_radius=1.8, minor_radius=0.4).set_color(ROYAL).set_opacity(0.6)
        self.set_camera_orientation(phi=65 * DEGREES, theta=-45 * DEGREES)
        self.play(Create(torus), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

class Ch12_Act8_SixD_Affective_Predator(ThreeDScene):
    def construct(self):
        title = Text("Act VIII: 6D Affective Space", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        axes = ThreeDAxes(x_range=[-2, 2], y_range=[-2, 2], z_range=[-2, 2])
        pt = Dot3D(point=[1.2, 0.8, -0.6], color=CRIMSON, radius=0.1)
        self.set_camera_orientation(phi=60 * DEGREES, theta=30 * DEGREES)
        self.play(Create(axes), Create(pt), run_time=1.5)
        self.wait(1.5)

class Ch12_Act9_VanKampen_Liouville_Metropie(ThreeDScene):
    def construct(self):
        title = Text("Act IX: Van Kampen Liouville Metropie", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        flow = VGroup(*[
            Vector([0.5, 0.2 * i, 0]).shift(LEFT * 1.5 + UP * (i - 1.5) * 0.6)
            for i in range(4)
        ]).set_color(TEAL)
        self.play(Create(flow), run_time=1.5)
        self.wait(1.5)

class Ch12_Act10_Subcanonicity_Cech_Obstruction(ThreeDScene):
    def construct(self):
        title = Text("Act X: Subcanonicity Cech Obstruction", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        tri = Triangle(color=GOLD).scale(1.8)
        self.play(Create(tri), run_time=1.5)
        self.wait(1.5)

class Ch12_Act11_Pushout_Corporate_Closure(ThreeDScene):
    def construct(self):
        title = Text("Act XI: Pushout Corporate Closure", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        sq = Square(side_length=2.2, color=ROYAL)
        diag = Line(sq.get_corner(DL), sq.get_corner(UR), color=GOLD)
        self.play(Create(sq), Create(diag), run_time=1.5)
        self.wait(1.5)

class Ch12_Act12_Chapter12_Synthesis(ThreeDScene):
    def construct(self):
        title = Text("Act XII: Chapter 12 Synthesis", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        sphere = Sphere(radius=1.3, resolution=(16, 16)).set_color(GOLD).set_opacity(0.4)
        torus = Torus(major_radius=2.0, minor_radius=0.25).set_color(TEAL).set_opacity(0.5)
        self.set_camera_orientation(phi=65 * DEGREES, theta=45 * DEGREES)
        self.play(Create(sphere), Create(torus), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

