import re
from pathlib import Path

root = Path(r"c:\Users\lutin\Manim")
shared = root / "shared"
inc_dir = shared / "includes"
inc_dir.mkdir(exist_ok=True)

# Chapter Titles & Subtitles mapping
chapters_meta = [
    (1, "The Topos of Subjective Experience", "Categorical Contexts, Sheaf Semantics, and Leveled Modal Logics"),
    (2, "The Syntrix Architecture", "Colored Operads, Free Tree Monads, and Grothendieck Fibrations"),
    (3, "Syntrixkorporationen", "Compositional Network Calculus, Pushout Spans & Cayley–Menger Extinction"),
    (4, "Enyphansyntrizen", "Non-Abelian Gauge Curvature, Holoforms & Chronometry"),
    (5, "Metroplextheorie", "The Ambient (∞,1)-Topos, Dendroidal Complete Segal Spaces, and Tectonic Spectral Sequences"),
    (6, "Die televariante äonische Area", "Terminal Coalgebras, Lyapunov Basins, and Transcendental Relativity"),
    (7, "Anthropomorphic Syntrometry", "Quantitative Sites, Realification, Tensor Operads, and Layered Field Cascades"),
    (8, "Syntrometrie über dem Quantitätsaspekt", "Cornered Parameter Manifolds, Grothendieck Nuclearity, and the 3-Class Collapse"),
    (9, "Strukturkaskaden", "Non-Hermitian 36-Component Hermetry, Palatini Coupling, and Sobolev Apex Convergence"),
    (10, "Metronische Elementaroperationen", "Discrete Lattice Modules, Finite-Difference Algebras, and Discrete Exterior Calculus"),
    (11, "Metrische Selektortheorie and Hyperstrukturen", "12D Fibrations, Spectral Matter Condensation, and DESY Precision Validation"),
    (12, "The Resolution of Representational Discontinuity", "Operadic Consumption and Protosimplex Encapsulation"),
    (13, "The Geometry of Qualia, Self-Consciousness, and Topos Integrated Information", "Postnikov Towers, Grothendieck Galois Groups, and IIT 4.0 Syntrometric Realization"),
    (14, "Synthese des Formalismus", "Master Translation Register (SM Eqs. 1–100a), Concordance Functor & Encyclopedic Lexicon"),
    (15, "Conclusion & The Syntrometric Horizon", "Master Axiomatic Architecture, Five Open Conjectures & Appendices A–D"),
]

# 1. Extract bodies of each chapterN.qmd (after YAML frontmatter) into shared/includes/chN_body.qmd
for ch in range(1, 16):
    p = root / "qmd" / f"chapter{ch}.qmd"
    txt = p.read_text(encoding="utf-8")
    m = re.match(r"^---\r?\n.*?\r?\n---\r?\n", txt, flags=re.DOTALL)
    body = txt[m.end():] if m else txt
    (inc_dir / f"ch{ch}_body.qmd").write_text(body, encoding="utf-8")
    print(f"Wrote shared/includes/ch{ch}_body.qmd ({len(body.splitlines())} lines)")

# 2. Merge all headers into shared/all-headers.html (merging MathJax macros & CSS)
header_files = [shared / "syntrometrie-header.html"] + [
    shared / f"chapter{ch}-header.html" for ch in range(2, 16)
]

macros = {}
styles = []
for hf in header_files:
    if not hf.exists():
        print(f"Warning: {hf.name} does not exist!")
        continue
    htxt = hf.read_text(encoding="utf-8")
    # Extract macro lines
    for line in htxt.splitlines():
        m_mac = re.match(r'^\s*([a-zA-Z0-9_\\]+)\s*:\s*(.+?)\s*,?\s*$', line)
        if m_mac and m_mac.group(1) not in ("tex", "macros", "window", "script", "style"):
            key = m_mac.group(1).lstrip("\\")
            macros[key] = m_mac.group(2).rstrip(",")
    # Extract <style>...</style>
    for sm in re.findall(r"<style>(.*?)</style>", htxt, flags=re.DOTALL):
        styles.append(sm.strip())

macro_lines = [f"      {k}: {v}" for k, v in sorted(macros.items())]
all_header_html = (
    "<script>\nwindow.MathJax = {\n"
    + "  \"HTML-CSS\": { linebreaks: { automatic: true, width: \"container\" } },\n"
    + "  CommonHTML: { linebreaks: { automatic: true, width: \"container\" } },\n"
    + "  SVG: { linebreaks: { automatic: true, width: \"container\" } },\n"
    + "  tex: {\n    macros: {\n"
    + ",\n".join(macro_lines)
    + "\n    }\n  }\n};\n</script>\n<style>\n"
    + "\n\n".join(styles)
    + "\n</style>\n"
    + '<script>\n// Expose robust scroll view toggle helper for Quarto Reveal.js with debounce guard\nlet toggleScrollDebounce = 0;\nwindow.togglePresentationScrollView = function() {\n  const now = Date.now();\n  if (now - toggleScrollDebounce < 350) return;\n  toggleScrollDebounce = now;\n\n  if (!window.Reveal) return;\n  const qs = window.Reveal.getPlugin ? window.Reveal.getPlugin("quarto-support") : null;\n  if (qs && typeof qs.toggleScrollView === \'function\') {\n    qs.toggleScrollView();\n  } else if (typeof window.Reveal.toggleScrollView === \'function\') {\n    const isScroll = typeof window.Reveal.isScrollView === \'function\' && window.Reveal.isScrollView();\n    if (isScroll) {\n      window.Reveal.configure({ scrollActivationWidth: 0 });\n      window.Reveal.toggleScrollView(false);\n    } else {\n      window.Reveal.configure({ scrollActivationWidth: null });\n      window.Reveal.toggleScrollView(true);\n    }\n  } else {\n    const ev = new KeyboardEvent(\'keydown\', { key: \'r\', keyCode: 82, which: 82, bubbles: true });\n    document.dispatchEvent(ev);\n  }\n\n  setTimeout(() => {\n    if (window.MathJax && window.MathJax.Hub) {\n      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);\n    }\n  }, 100);\n\n  setTimeout(() => {\n    const isScroll = window.Reveal && typeof window.Reveal.isScrollView === \'function\' ? window.Reveal.isScrollView() : false;\n    try { window.parent.postMessage({ type: \'scroll-view-state\', isScrollView: isScroll }, \'*\'); } catch (e) {}\n  }, 150);\n};\n\n// Listen for message from parent index.html\nwindow.addEventListener(\'message\', (event) => {\n  if (!event.data) return;\n  if (event.data.type === \'toggle-scroll-view\') {\n    window.togglePresentationScrollView();\n  } else if (event.data.type === \'window-resize\' || event.data.type === \'resize\') {\n    if (window.handleDynamicScaling) window.handleDynamicScaling();\n  }\n});\n\n// Dynamic Window Scaling & Resize Controller\n(function() {\n  let resizeTimer = null;\n\n  function performDynamicScaling() {\n    if (window.Reveal) {\n      if (typeof window.Reveal.layout === \'function\') {\n        window.Reveal.layout();\n      }\n    }\n    if (window.MathJax && window.MathJax.Hub) {\n      try {\n        window.MathJax.Hub.Queue(["Rerender", window.MathJax.Hub]);\n      } catch (e) {}\n    }\n    if (typeof prepareVideosAndPanels === \'function\') {\n      prepareVideosAndPanels();\n    }\n    try {\n      const scale = window.Reveal && typeof window.Reveal.getScale === \'function\' ? window.Reveal.getScale() : 1;\n      window.dispatchEvent(new CustomEvent(\'syntrometrie:resize\', {\n        detail: {\n          width: window.innerWidth,\n          height: window.innerHeight,\n          scale: scale,\n          isScroll: window.Reveal && typeof window.Reveal.isScrollView === \'function\' ? window.Reveal.isScrollView() : false\n        }\n      }));\n    } catch (e) {}\n  }\n\n  window.handleDynamicScaling = function() {\n    clearTimeout(resizeTimer);\n    resizeTimer = setTimeout(performDynamicScaling, 50);\n  };\n\n  window.addEventListener(\'resize\', window.handleDynamicScaling, { passive: true });\n  window.addEventListener(\'orientationchange\', () => setTimeout(performDynamicScaling, 100));\n  document.addEventListener(\'fullscreenchange\', () => setTimeout(performDynamicScaling, 60));\n})();\n\n// Mobile & Scroll View Animation Controller (Videos, Interactive Panels & Cards)\n(function() {\n  let scrollObserver = null;\n\n  function prepareVideosAndPanels() {\n    // 1. Prepare and configure videos\n    const videos = document.querySelectorAll(\'video\');\n    videos.forEach(v => {\n      v.setAttribute(\'playsinline\', \'\');\n      v.setAttribute(\'webkit-playsinline\', \'\');\n      v.setAttribute(\'muted\', \'\');\n      v.muted = true;\n      v.defaultMuted = true;\n      v.setAttribute(\'loop\', \'\');\n      v.setAttribute(\'preload\', \'auto\');\n      v.style.cursor = \'pointer\';\n\n      // Tap on touch devices to toggle play/pause\n      if (!v.dataset.touchBound) {\n        v.dataset.touchBound = \'true\';\n        v.addEventListener(\'click\', (e) => {\n          e.stopPropagation();\n          if (v.paused) {\n            v.play().catch(() => {});\n          } else {\n            v.pause();\n          }\n        });\n      }\n\n      // If video is in active slide or in scroll mode, start playback\n      const slide = v.closest(\'.present, .scroll-page, section\');\n      if (slide && (slide.classList.contains(\'present\') || document.querySelector(\'.reveal-viewport.reveal-scroll\'))) {\n        v.play().catch(() => {});\n      }\n    });\n\n    // 2. Tag panels and cards with .syn-scroll-reveal for polished scroll reveals\n    const revealTargets = document.querySelectorAll(\n      \'.interactive-panel, .video-card, .video-container, .thm-box, .def-box, .prop-box, .proof-box, .carnap-box, .firewall-box, .intuition-box, .vignette-box, .scholium-box, .claim-ceiling, .lean-card, .lean-code-card\'\n    );\n    revealTargets.forEach(el => {\n      if (!el.classList.contains(\'syn-scroll-reveal\')) {\n        el.classList.add(\'syn-scroll-reveal\');\n      }\n    });\n\n    // 3. Setup IntersectionObserver for smooth entrance and in-view autoplay\n    if (\'IntersectionObserver\' in window) {\n      if (!scrollObserver) {\n        scrollObserver = new IntersectionObserver((entries) => {\n          entries.forEach(entry => {\n            const el = entry.target;\n            if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {\n              el.classList.add(\'syn-in-view\');\n\n              // Autoplay visible video or nested videos\n              if (el.tagName === \'VIDEO\') {\n                el.play().catch(() => {});\n              } else {\n                const innerVids = el.querySelectorAll(\'video\');\n                innerVids.forEach(iv => iv.play().catch(() => {}));\n              }\n            } else if (!entry.isIntersecting && entry.intersectionRatio === 0) {\n              // Pause when completely off screen to preserve battery\n              if (el.tagName === \'VIDEO\') {\n                el.pause();\n              } else {\n                const innerVids = el.querySelectorAll(\'video\');\n                innerVids.forEach(iv => iv.pause());\n              }\n            }\n          });\n        }, {\n          threshold: [0, 0.08, 0.4],\n          rootMargin: \'30px 0px 30px 0px\'\n        });\n      }\n\n      // Observe all videos and reveal targets\n      videos.forEach(v => scrollObserver.observe(v));\n      revealTargets.forEach(rt => scrollObserver.observe(rt));\n    }\n  }\n  window.prepareVideos = prepareVideosAndPanels;\n  window.prepareVideosAndPanels = prepareVideosAndPanels;\n\n  // Awaken media on first touch or scroll\n  let mediaUnlocked = false;\n  function unlockMedia() {\n    if (mediaUnlocked) return;\n    mediaUnlocked = true;\n    document.querySelectorAll(\'video\').forEach(v => {\n      v.muted = true;\n      v.defaultMuted = true;\n      const rect = v.getBoundingClientRect();\n      if (rect.top < window.innerHeight && rect.bottom > 0) {\n        v.play().catch(() => {});\n      }\n    });\n  }\n  document.addEventListener(\'touchstart\', unlockMedia, { passive: true });\n  document.addEventListener(\'click\', unlockMedia, { passive: true });\n  window.addEventListener(\'scroll\', unlockMedia, { passive: true });\n\n  function initRevealHooks() {\n    if (window.Reveal) {\n      if (typeof window.Reveal.configure === \'function\') {\n        try {\n          window.Reveal.configure({\n            mouseWheel: true\n          });\n        } catch (e) {}\n      }\n\n      window.Reveal.on(\'slidechanged\', () => setTimeout(prepareVideosAndPanels, 60));\n      window.Reveal.on(\'ready\', () => {\n        setTimeout(prepareVideosAndPanels, 120);\n        try {\n          const isScroll = window.Reveal.isScrollView && window.Reveal.isScrollView();\n          window.parent.postMessage({ type: \'scroll-view-state\', isScrollView: isScroll }, \'*\');\n        } catch (e) {}\n      });\n      window.Reveal.on(\'scroll-view-activated\', () => {\n        setTimeout(() => {\n          if (window.MathJax && window.MathJax.Hub) {\n            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);\n          }\n          prepareVideosAndPanels();\n        }, 120);\n        try { window.parent.postMessage({ type: \'scroll-view-state\', isScrollView: true }, \'*\'); } catch (e) {}\n      });\n      window.Reveal.on(\'scroll-view-deactivated\', () => {\n        setTimeout(() => {\n          if (window.MathJax && window.MathJax.Hub) {\n            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);\n          }\n          prepareVideosAndPanels();\n        }, 120);\n        try { window.parent.postMessage({ type: \'scroll-view-state\', isScrollView: false }, \'*\'); } catch (e) {}\n      });\n    }\n  }\n\n  if (document.readyState === \'loading\') {\n    document.addEventListener(\'DOMContentLoaded\', () => {\n      prepareVideosAndPanels();\n      initRevealHooks();\n    });\n  } else {\n    prepareVideosAndPanels();\n    initRevealHooks();\n  }\n  window.addEventListener(\'load\', () => {\n    prepareVideosAndPanels();\n    initRevealHooks();\n  });\n})();\n</script>\\n'
)
(shared / "all-headers.html").write_text(all_header_html, encoding="utf-8")
print(f"Wrote shared/all-headers.html with {len(macros)} MathJax macros.")

# 3. Create syntrometrie_all.qmd with all 15 chapters
script_tags = "\n".join([f'        <script src="shared/chapter{ch}-widgets.js"></script>' for ch in range(1, 16)])

sections = []
for ch, title, subtitle in chapters_meta:
    sections.append(f"""# Chapter {ch}: {title} {{transition="zoom"}}

<div style="font-size:0.75em; color:#a0aec0; margin-top:-10px; margin-bottom:20px;">
<i>{subtitle}</i>
</div>

{{{{< include shared/includes/ch{ch}_body.qmd >}}}}
""")

mega_qmd = f"""---
title: "Syntrometrische Maximentelezentrik"
subtitle: "Complete Interactive Treatise (Chapters 1–15) — Topos Theory, Operads, Gauge Curvature, Hermetry & Consciousness"
author: "Research Collective — Department of Mathematical Physics & Formal Epistemology"
date: "August 2026"
format:
  revealjs:
    theme: [dark, scss/custom_syntrometrie.scss]
    navigation-mode: grid
    width: 1440
    height: 900
    margin: 0.04
    min-scale: 0.2
    max-scale: 2.0
    scrollable: true
    transition: fade
    background-transition: fade
    slide-number: c/t
    controls: true
    progress: true
    hash: true
    center: false
    html-math-method: mathjax
    include-in-header: shared/all-headers.html
    include-after-body:
      text: |
{script_tags}
---

""" + "\n".join(sections)

(root / "qmd" / "syntrometrie_all.qmd").write_text(mega_qmd, encoding="utf-8")
print("Wrote syntrometrie_all.qmd for all 15 chapters.")

