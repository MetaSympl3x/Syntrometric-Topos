from manim import *
import numpy as np

ROYAL = "#4169E1"
TEAL = "#20B2AA"
GOLD = "#FFD700"
ORANGE = "#FFA500"
CRIMSON = "#DC143C"
PURPLE = "#9370DB"

class Ch11_Act1_Strukturkompressor_Anatomy(ThreeDScene):
    def construct(self):
        title = Text("Act I: Strukturkompressor Anatomy", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        cube = Cube(side_length=2.5, fill_opacity=0.3, stroke_color=ROYAL)
        sphere = Sphere(radius=1.2, resolution=(16, 16)).set_color(TEAL).set_opacity(0.5)
        self.set_camera_orientation(phi=60 * DEGREES, theta=-45 * DEGREES)
        self.play(Create(cube), Create(sphere), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

class Ch11_Act2_Hyperstrukturen_Spin_Rotor(ThreeDScene):
    def construct(self):
        title = Text("Act II: Hyperstrukturen Spin Rotor", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        torus = Torus(major_radius=1.8, minor_radius=0.4).set_color(PURPLE).set_opacity(0.6)
        self.set_camera_orientation(phi=65 * DEGREES, theta=30 * DEGREES)
        self.play(Create(torus), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.25)
        self.wait(1.5)

class Ch11_Act3_Resonant_Soliton_Null_Stability(ThreeDScene):
    def construct(self):
        title = Text("Act III: Resonant Soliton Null Stability", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        curve = ParametricFunction(
            lambda t: np.array([1.5 * np.cos(t), 1.5 * np.sin(t), 0.4 * np.sin(4 * t)]),
            t_range=[0, TAU], color=GOLD
        )
        self.set_camera_orientation(phi=55 * DEGREES, theta=-30 * DEGREES)
        self.play(Create(curve), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

class Ch11_Act4_Capacity_Balance_N6(ThreeDScene):
    def construct(self):
        title = Text("Act IV: Capacity Balance N=6", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        axes = ThreeDAxes(x_range=[-2, 2], y_range=[-2, 2], z_range=[-2, 2])
        self.set_camera_orientation(phi=70 * DEGREES, theta=45 * DEGREES)
        self.play(Create(axes), run_time=1.5)
        self.wait(1.5)

class Ch11_Act5_12D_Fibration_K8_Torus(ThreeDScene):
    def construct(self):
        title = Text("Act V: 12D Fibration K8 Torus", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        torus1 = Torus(major_radius=1.5, minor_radius=0.3).set_color(ROYAL).set_opacity(0.5)
        torus2 = Torus(major_radius=2.2, minor_radius=0.2).set_color(TEAL).set_opacity(0.4)
        self.set_camera_orientation(phi=60 * DEGREES, theta=-60 * DEGREES)
        self.play(Create(torus1), Create(torus2), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

class Ch11_Act6_K8_Eigenvalue_Spectrum(ThreeDScene):
    def construct(self):
        title = Text("Act VI: K8 Eigenvalue Spectrum", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        bars = VGroup(*[
            Rectangle(width=0.3, height=0.5 * (i + 1), fill_opacity=0.8, fill_color=TEAL if i % 2 == 0 else GOLD)
            .move_to(RIGHT * (i - 3.5) * 0.6 + DOWN)
            for i in range(8)
        ])
        self.play(Create(bars), run_time=1.5)
        self.wait(1.5)

class Ch11_Act7_Staggered_Geodesic_Verlet(ThreeDScene):
    def construct(self):
        title = Text("Act VII: Staggered Geodesic Verlet", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        spiral = ParametricFunction(
            lambda t: np.array([0.15 * t * np.cos(3 * t), 0.15 * t * np.sin(3 * t), 0.1 * t]),
            t_range=[0, 4 * PI], color=ORANGE
        )
        self.set_camera_orientation(phi=65 * DEGREES, theta=-45 * DEGREES)
        self.play(Create(spiral), run_time=1.5)
        self.wait(1.5)

class Ch11_Act8_63_Channel_Hyperlattice(ThreeDScene):
    def construct(self):
        title = Text("Act VIII: 63-Channel Hyperlattice", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        dots = VGroup(*[
            Dot(point=[(x - 1.5) * 0.8, (y - 1.5) * 0.8, 0], radius=0.06, color=GOLD)
            for x in range(4) for y in range(4)
        ])
        self.play(Create(dots), run_time=1.5)
        self.wait(1.5)

class Ch11_Act9_DESY_Mass_Formula_State_Vector(ThreeDScene):
    def construct(self):
        title = Text("Act IX: DESY Mass Formula State Vector", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        vec = Arrow3D(start=ORIGIN, end=[1.8, 1.2, 1.5], color=GOLD)
        self.set_camera_orientation(phi=60 * DEGREES, theta=30 * DEGREES)
        self.play(Create(vec), run_time=1.5)
        self.wait(1.5)

class Ch11_Act10_Proton_Neutron_Mass_Splitting(ThreeDScene):
    def construct(self):
        title = Text("Act X: Proton-Neutron Mass Splitting", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        p1 = Sphere(radius=0.5).set_color(ROYAL).shift(LEFT * 1.2)
        p2 = Sphere(radius=0.52).set_color(CRIMSON).shift(RIGHT * 1.2)
        self.set_camera_orientation(phi=70 * DEGREES, theta=-30 * DEGREES)
        self.play(Create(p1), Create(p2), run_time=1.5)
        self.wait(1.5)

class Ch11_Act11_Fine_Structure_LIV_Bounds(ThreeDScene):
    def construct(self):
        title = Text("Act XI: Fine Structure LIV Bounds", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        ring = Annulus(inner_radius=1.2, outer_radius=1.6, fill_opacity=0.5, color=PURPLE)
        self.play(Create(ring), run_time=1.5)
        self.wait(1.5)

class Ch11_Act12_Synthesis_Bridge_Ch12(ThreeDScene):
    def construct(self):
        title = Text("Act XII: Synthesis Bridge Ch 12", font_size=28, color=GOLD).to_edge(UP)
        self.add(title)
        sphere = Sphere(radius=1.3, resolution=(16, 16)).set_color(GOLD).set_opacity(0.4)
        torus = Torus(major_radius=2.0, minor_radius=0.25).set_color(TEAL).set_opacity(0.5)
        self.set_camera_orientation(phi=65 * DEGREES, theta=45 * DEGREES)
        self.play(Create(sphere), Create(torus), run_time=1.5)
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(1.5)

