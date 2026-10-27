from manim import *
import numpy as np

ROYAL = "#4169E1"
TEAL = "#20B2AA"
GOLD = "#FFD700"
ORANGE = "#FFA500"
CRIMSON = "#DC143C"
PURPLE = "#9370DB"

class Ch14_Act1_Master_Register_Architecture(ThreeDScene):
    def construct(self):
        title = Text("Act I: Master Register Architecture", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        boxes = VGroup(*[
            Rectangle(width=2.5, height=0.5, color=ROYAL).shift(UP * (1.5 - i * 0.7))
            for i in range(5)
        ])
        self.play(Create(boxes), run_time=1.5)
        self.wait(1.5)

class Ch14_Act2_Cluster_I_Epistemology_Aspects(ThreeDScene):
    def construct(self):
        title = Text("Act II: Cluster I Epistemology & Aspects", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        c = Circle(radius=1.5, color=TEAL)
        self.play(Create(c), run_time=1.5)
        self.wait(1.5)

class Ch14_Act3_Cluster_II_Syntrix_Triad(ThreeDScene):
    def construct(self):
        title = Text("Act III: Cluster II Syntrix Triad", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        tri = Triangle(color=GOLD).scale(1.8)
        self.play(Create(tri), run_time=1.5)
        self.wait(1.5)

class Ch14_Act4_Cluster_III_Corporate_Pushouts(ThreeDScene):
    def construct(self):
        title = Text("Act IV: Cluster III Corporate Pushouts", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        sq = Square(side_length=2.2, color=ROYAL)
        self.play(Create(sq), run_time=1.5)
        self.wait(1.5)

class Ch14_Act5_Cluster_IV_Gauge_Enyphanie(ThreeDScene):
    def construct(self):
        title = Text("Act V: Cluster IV Gauge Enyphanie", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        torus = Torus(major_radius=1.8, minor_radius=0.4).set_color(CRIMSON).set_opacity(0.6)
        self.set_camera_orientation(phi=65 * DEGREES, theta=30 * DEGREES)
        self.play(Create(torus), run_time=1.5)
        self.wait(1.5)

class Ch14_Act6_Cluster_V_Higher_Metroplexes(ThreeDScene):
    def construct(self):
        title = Text("Act VI: Cluster V Higher Metroplexes", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        cube = Cube(side_length=2.0, fill_opacity=0.3, stroke_color=PURPLE)
        self.set_camera_orientation(phi=60 * DEGREES, theta=-45 * DEGREES)
        self.play(Create(cube), run_time=1.5)
        self.wait(1.5)

class Ch14_Act7_Cluster_VI_Metric_Cascades(ThreeDScene):
    def construct(self):
        title = Text("Act VII: Cluster VI Metric Cascades", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        spiral = ParametricFunction(
            lambda t: np.array([0.15 * t * np.cos(3 * t), 0.15 * t * np.sin(3 * t), 0.1 * t]),
            t_range=[0, 4 * PI], color=ORANGE
        )
        self.set_camera_orientation(phi=65 * DEGREES, theta=-45 * DEGREES)
        self.play(Create(spiral), run_time=1.5)
        self.wait(1.5)

class Ch14_Act8_Cluster_VII_Metronic_Calculus(ThreeDScene):
    def construct(self):
        title = Text("Act VIII: Cluster VII Metronic Calculus", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        dots = VGroup(*[
            Dot([(x - 2) * 0.7, (y - 2) * 0.7, 0], radius=0.06, color=GOLD)
            for x in range(5) for y in range(5)
        ])
        self.play(Create(dots), run_time=1.5)
        self.wait(1.5)

class Ch14_Act9_Cluster_VIII_Mass_Selectors(ThreeDScene):
    def construct(self):
        title = Text("Act IX: Cluster VIII Mass Selectors", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        bars = VGroup(*[
            Rectangle(width=0.35, height=0.4 * (i + 1), fill_color=GOLD, fill_opacity=0.7)
            .move_to(RIGHT * (i - 3) * 0.7 + DOWN * 0.8)
            for i in range(7)
        ])
        self.play(Create(bars), run_time=1.5)
        self.wait(1.5)

class Ch14_Act10_Encyclopedic_Lexicon_Tree(ThreeDScene):
    def construct(self):
        title = Text("Act X: Encyclopedic Lexicon Tree", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        tree = VGroup(
            Line(UP * 1.5, LEFT * 1.5 + DOWN * 0.5, color=TEAL),
            Line(UP * 1.5, RIGHT * 1.5 + DOWN * 0.5, color=TEAL),
            Line(UP * 1.5, DOWN * 0.5, color=GOLD)
        )
        self.play(Create(tree), run_time=1.5)
        self.wait(1.5)

class Ch14_Act11_Universal_Concordance_Map(ThreeDScene):
    def construct(self):
        title = Text("Act XI: Universal Concordance Map", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        grid = NumberPlane().scale(0.8)
        self.play(Create(grid), run_time=1.5)
        self.wait(1.5)

class Ch14_Act12_Synthesis_Horizon_Bridge(ThreeDScene):
    def construct(self):
        title = Text("Act XII: Synthesis Horizon Bridge", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        sphere = Sphere(radius=1.3, resolution=(16, 16)).set_color(GOLD).set_opacity(0.4)
        torus = Torus(major_radius=2.0, minor_radius=0.25).set_color(TEAL).set_opacity(0.5)
        self.set_camera_orientation(phi=65 * DEGREES, theta=45 * DEGREES)
        self.play(Create(sphere), Create(torus), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

