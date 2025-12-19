// components/AnimationsLayer.client.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

/**
 * Ultra-optimized GSAP/ScrollTrigger layer:
 * - ZERO GSAP in initial bundle (dynamic import on demand)
 * - Initializes per-section only when near viewport (IntersectionObserver)
 * - Scopes selectors to each section (no global querySelectorAll)
 * - Avoids heavy onUpdate spam by only updating discrete states when index changes
 * - Respects prefers-reduced-motion + mobile
 */

import { useEffect } from "react";

type Gsap = any;
type ScrollTriggerType = any;

function idle(fn: () => void) {

  const ric = window.requestIdleCallback;
  if (ric) ric(fn);
  else setTimeout(fn, 1);
}

function rafThrottle<T extends (...args: any[]) => void>(fn: T) {
  let raf = 0;
  let lastArgs: any[] | null = null;
  return (...args: any[]) => {
    lastArgs = args;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      if (lastArgs) fn(...(lastArgs as any[]));
      lastArgs = null;
    });
  };
}


export default function AnimationsLayer() {
  useEffect(() => {
    let killed = false;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduce) return;

    // Track which keys already initialized (avoid double init)
    const inited = new Set<string>();

    // Load GSAP once, reuse for all sections
    let gsapPromise: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTriggerType }> | null = null;

    const getGsap = () => {
      if (gsapPromise) return gsapPromise;
      gsapPromise = (async () => {
        const gsapMod = await import("gsap");
        const stMod = await import("gsap/ScrollTrigger");
        const gsap = gsapMod.default;
        const ScrollTrigger = stMod.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Reduce overhead
        ScrollTrigger.config({
          ignoreMobileResize: true,
          limitCallbacks: true,
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", // less noisy
        });

        return { gsap, ScrollTrigger };
      })();
      return gsapPromise;
    };

    const initSection = async (section: HTMLElement) => {
      const key = section.dataset.anim;
      if (!key || inited.has(key)) return;
      inited.add(key);

      const { gsap, ScrollTrigger } = await getGsap();
      if (killed) return;

      // Per section init
      switch (key) {
        case "hero":
          initHero(gsap, ScrollTrigger, section);
          break;
        case "process":
          initProcess(gsap, ScrollTrigger, section);
          break;
        case "who":
          initWho(gsap, ScrollTrigger, section);
          break;
        case "ct":
          initCreativityTech(gsap, ScrollTrigger, section);
          break;
        case "world":
          initWorld(gsap, ScrollTrigger, section);
          break;
        case "services":
          initServicesHorizontal(gsap, ScrollTrigger, section);
          break;
        case "cta":
          initCTA(gsap, ScrollTrigger, section);
          break;
        case "portfolio":
          initPortfolio(gsap, ScrollTrigger, section);
          break;
        case "brand":
          initBrandCircles(gsap, ScrollTrigger, section);
          break;
        case "giantA":
          initGiantA(gsap, ScrollTrigger, section);
          break;
        case "footer":
          initFooter(gsap, ScrollTrigger, section);
          break;
        default:
          // safe no-op for unknown keys
          break;
      }
    };

    // Observe sections; init when near viewport
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement);

        if (!visible.length) return;

        visible.forEach((el) => io.unobserve(el));

        idle(() => {
          if (killed) return;
          // init in sequence to reduce main-thread spike
          (async () => {
            for (const el of visible) {
              if (killed) return;
              await initSection(el);
            }
            const { ScrollTrigger } = await getGsap();
            if (!killed) ScrollTrigger.refresh();
          })();
        });
      },
      {
        rootMargin: "900px 0px",
        threshold: 0.01,
      }
    );

    document.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => io.observe(el));

    const onResize = rafThrottle(async () => {
      // Avoid expensive refresh storms
      const { ScrollTrigger } = await getGsap();
      if (!killed) ScrollTrigger.refresh();
    });

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      killed = true;
      io.disconnect();
      window.removeEventListener("resize", onResize);
      // If GSAP loaded, kill all triggers to free memory
      gsapPromise?.then(({ ScrollTrigger }) => {
        try {
          ScrollTrigger.getAll().forEach((t: any) => t.kill(true));
          ScrollTrigger.clearMatchMedia?.();
        } catch {
          // ignore
        }
      });
    };
  }, []);

  return null;
}

/* =========================
   SECTION INITIALIZERS
   ========================= */

/** HERO pinned */
function initHero(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  const overlay = section.querySelector<HTMLElement>(".hero-overlay");
  const word = section.querySelector<HTMLElement>(".hero-word");
  if (!overlay || !word) return;

  gsap.set(overlay, { yPercent: 100, willChange: "transform" });
  gsap.set(word, { autoAlpha: 0, y: 40, scale: 0.95, willChange: "transform,opacity" });

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=140%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  })
    .to(overlay, { yPercent: 0, duration: 1, ease: "power3.out" })
    .to(word, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, "-=0.4");
}

/** PROCESS pinned — updates discrete state only when index changes */
function initProcess(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  const cards = Array.from(section.querySelectorAll<HTMLElement>(".process-card-inner"));
  const labels = Array.from(section.querySelectorAll<HTMLElement>(".process-step-label"));
  const lineFill = section.querySelector<HTMLElement>(".process-line-fill");
  if (!cards.length) return;

  const total = cards.length;
  let lastIdx = -1;

  cards.forEach((c, i) =>
    gsap.set(c, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 18, scale: i === 0 ? 1 : 0.96 })
  );
  labels.forEach((l, i) => gsap.set(l, { opacity: i === 0 ? 1 : 0.45 }));
  if (lineFill) gsap.set(lineFill, { scaleY: 0, transformOrigin: "top" });

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: `+=${total * 150}%`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    onUpdate: (self: any) => {
      const idx = Math.round(self.progress * (total - 1));

      // continuous: line only (use set, not to)
      if (lineFill) gsap.set(lineFill, { scaleY: self.progress });

      if (idx === lastIdx) return;
      lastIdx = idx;

      cards.forEach((c, i) =>
        gsap.to(c, {
          autoAlpha: i === idx ? 1 : 0,
          y: i === idx ? 0 : 18,
          scale: i === idx ? 1 : 0.96,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        })
      );

      labels.forEach((l, i) =>
        gsap.to(l, {
          opacity: i === idx ? 1 : 0.45,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
        })
      );
    },
  });
}

/** WHO stack pinned */
function initWho(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  const cards = Array.from(section.querySelectorAll<HTMLElement>(".who-card"));
  const heading = section.querySelector<HTMLElement>("#who-heading");

  if (!cards.length) return;

  cards.forEach((card, index) => {
    gsap.set(card, {
      autoAlpha: 0,
      x: 220,
      y: 220,
      scale: 0.97,
      rotateX: -4,
      rotateY: 4,
      transformPerspective: 1200,
      zIndex: index + 1,
      willChange: "transform,opacity",
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=320%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  if (heading) {
    tl.from(heading, { autoAlpha: 0, y: 28, duration: 0.6, ease: "power3.out" });
  }

  cards.forEach((card, index) => {
    const offset = index * 28;
    const iconEl = card.querySelector<HTMLElement>(".who-icon");

    tl.to(
      card,
      {
        autoAlpha: 1,
        x: -offset,
        y: -offset,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 0.9,
        ease: "power2.out",
      },
      index === 0 ? "+=0.15" : ">-=0.25"
    );

    if (iconEl) {
      tl.fromTo(
        iconEl,
        { y: 12, autoAlpha: 0, scale: 0.9 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        "<+0.05"
      );
    }
  });
}

/** Creativity vs Technicality pinned */
function initCreativityTech(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  const cards = Array.from(section.querySelectorAll<HTMLElement>(".ct-card"));
  const divider = section.querySelector<HTMLElement>(".ct-divider");

  const leftText = Array.from(
    section.querySelectorAll<HTMLElement>(".ct-kicker-left, .ct-title-left, .ct-copy-left, .ct-chip-left")
  );
  const rightText = Array.from(
    section.querySelectorAll<HTMLElement>(".ct-kicker-right, .ct-title-right, .ct-copy-right, .ct-chip-right")
  );

  const iconLeft = section.querySelector<HTMLElement>(".ct-icon-left");
  const iconRight = section.querySelector<HTMLElement>(".ct-icon-right");
  const glowA = section.querySelector<HTMLElement>(".ct-glow-a");
  const glowB = section.querySelector<HTMLElement>(".ct-glow-b");

  if (!cards.length) return;

  // Avoid animating filter blur on scroll; keep it light (opacity/transform)
  gsap.set(cards, { autoAlpha: 0, y: 30, scale: 0.99, willChange: "transform,opacity" });
  if (divider) gsap.set(divider, { scaleY: 0, transformOrigin: "top", willChange: "transform" });
  gsap.set([...leftText, ...rightText], { autoAlpha: 0, y: 14, willChange: "transform,opacity" });
  if (iconLeft) gsap.set(iconLeft, { autoAlpha: 0, scale: 0.9, x: -8, y: -8, willChange: "transform,opacity" });
  if (iconRight) gsap.set(iconRight, { autoAlpha: 0, scale: 0.9, x: 8, y: 8, willChange: "transform,opacity" });

  if (glowA) gsap.set(glowA, { x: -40, y: -20, scale: 0.95, autoAlpha: 0.7 });
  if (glowB) gsap.set(glowB, { x: 40, y: 20, scale: 0.95, autoAlpha: 0.65 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=210%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  tl.to(cards, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" })
    .to([iconLeft, iconRight].filter(Boolean), { autoAlpha: 1, scale: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.6")
    .to(leftText, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 }, "-=0.55");

  if (divider) tl.to(divider, { scaleY: 1, duration: 0.6, ease: "power2.out" }, "-=0.45");

  tl.to(rightText, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 }, "-=0.5");

  if (glowA) tl.to(glowA, { x: 20, y: 10, scale: 1.05, autoAlpha: 0.9, duration: 1.1, ease: "sine.inOut" }, 0.2);
  if (glowB) tl.to(glowB, { x: -20, y: -10, scale: 1.06, autoAlpha: 0.85, duration: 1.1, ease: "sine.inOut" }, 0.2);
}

/** WORLD pinned */
function initWorld(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  const kicker = section.querySelector<HTMLElement>("#world-kicker");
  const title = section.querySelector<HTMLElement>("#world-title");
  const copy = section.querySelector<HTMLElement>("#world-copy");
  const stats = Array.from(section.querySelectorAll<HTMLElement>(".world-stat"));
  const globeShell = section.querySelector<HTMLElement>(".world-globe-shell");

  const text = [kicker, title, copy].filter(Boolean) as HTMLElement[];

  gsap.set(text, { autoAlpha: 0, y: 20, willChange: "transform,opacity" });
  gsap.set(stats, { autoAlpha: 0, y: 14, willChange: "transform,opacity" });

  if (globeShell) {
    gsap.set(globeShell, {
      autoAlpha: 0,
      y: 40,
      scale: 0.92,
      rotateX: -6,
      rotateY: 10,
      transformStyle: "preserve-3d",
      transformOrigin: "50% 50%",
      willChange: "transform,opacity",
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=200%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  tl.to(text, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }, 0)
    .to(stats, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, 0.15);

  if (globeShell) {
    tl.to(globeShell, { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, duration: 1, ease: "power3.out" }, 0.1);
  }
}

/** SERVICES horizontal pinned — optimized: fewer triggers, avoid global selectors */
function initServicesHorizontal(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  const track = section.querySelector<HTMLElement>("[data-services-track]") || section.querySelector<HTMLElement>(".services-track");
  if (!track) return;

  const cards = Array.from(section.querySelectorAll<HTMLElement>(".service-card-h"));
  if (!cards.length) return;

  const getScrollDistance = () => {
    const raw = track.scrollWidth - section.clientWidth;
    return raw > 0 ? raw + 64 : 0;
  };

  // Main horizontal tween
  const horizontalTween = gsap.to(track, {
    x: () => -getScrollDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${getScrollDistance()}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Light float on icons (optional). If you want MAX performance, remove this.
  const icons = Array.from(section.querySelectorAll<HTMLElement>(".service-icon"));
  if (icons.length) {
    gsap.to(icons, { y: -3, repeat: -1, yoyo: true, duration: 2.4, ease: "sine.inOut" });
  }

  cards.forEach((card, index) => {
    const direction = index % 2 === 0 ? -1 : 1;
    const iconEl = card.querySelector<HTMLElement>(".service-icon");

    gsap.set(card, { autoAlpha: 0, y: 50, rotateY: 8 * direction, scale: 0.95, willChange: "transform,opacity" });
    if (iconEl) gsap.set(iconEl, { y: 10, autoAlpha: 0, scale: 0.9, willChange: "transform,opacity" });

    // Trigger per card, driven by containerAnimation (cheap)
    ScrollTrigger.create({
      trigger: card,
      containerAnimation: horizontalTween,
      start: "left 92%",
      end: "left 40%",
      onEnter: () => {
        gsap.to(card, { autoAlpha: 1, y: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        if (iconEl) gsap.to(iconEl, { y: 0, autoAlpha: 1, scale: 1, duration: 0.45, ease: "power2.out", overwrite: "auto" });
      },
      onLeaveBack: () => {
        gsap.to(card, { autoAlpha: 0, y: 50, rotateY: 8 * direction, scale: 0.95, duration: 0.35, ease: "power2.in", overwrite: "auto" });
        if (iconEl) gsap.to(iconEl, { y: 10, autoAlpha: 0, scale: 0.9, duration: 0.25, ease: "power2.in", overwrite: "auto" });
      },
    });
  });
}

/** CTA (not pinned) */
function initCTA(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  const card = section.querySelector<HTMLElement>("[data-cta-card]");
  const sheen = section.querySelector<HTMLElement>("[data-cta-sheen]");
  const glow = section.querySelector<HTMLElement>("[data-cta-glow]");

  const texts = Array.from(
    section.querySelectorAll<HTMLElement>("[data-cta-kicker],[data-cta-title],[data-cta-subtitle],[data-cta-actions]")
  );

  if (card) gsap.set(card, { y: 30, autoAlpha: 0, scale: 0.99, willChange: "transform,opacity" });
  gsap.set(texts, { y: 12, autoAlpha: 0, willChange: "transform,opacity" });
  if (sheen) gsap.set(sheen, { xPercent: -120, autoAlpha: 0, willChange: "transform,opacity" });
  if (glow) gsap.set(glow, { autoAlpha: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 78%",
      end: "bottom 35%",
      scrub: 1,
    },
  });

  if (card) tl.to(card, { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out" }, 0);

  tl.to(
    texts,
    { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.06 },
    0.06
  );

  if (sheen) {
    tl.to(sheen, { xPercent: 120, autoAlpha: 1, duration: 1.1, ease: "none" }, 0.1);
  }

  if (glow) {
    ScrollTrigger.create({
      trigger: section,
      start: "top 55%",
      onEnter: () => gsap.to(glow, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(glow, { autoAlpha: 0, duration: 0.2, ease: "power2.out" }),
    });
  }
}

/** PORTFOLIO pinned — optimized activate only on index change */
function initPortfolio(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  const items = Array.from(section.querySelectorAll<HTMLElement>("[data-portfolio-item]"));
  const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-portfolio-panel]"));

  if (!panels.length || !items.length) return;

  const scan = section.querySelector<HTMLElement>(".portfolio-scan");
  const glow = section.querySelector<HTMLElement>(".portfolio-glow");
  const needle = section.querySelector<HTMLElement>(".portfolio-needle");
  const radars = Array.from(section.querySelectorAll<HTMLElement>(".portfolio-radar"));

  gsap.set(panels, { autoAlpha: 0, y: 14, willChange: "transform,opacity" });
  gsap.set(items, { autoAlpha: 1, x: 0, willChange: "opacity" });

  if (scan) gsap.set(scan, { y: -60, autoAlpha: 0, willChange: "transform,opacity" });
  if (glow) gsap.set(glow, { autoAlpha: 0, scale: 0.95, willChange: "transform,opacity" });
  if (needle) gsap.set(needle, { scaleY: 0.12, transformOrigin: "top center", willChange: "transform" });

  const total = Math.max(1, panels.length);
  let lastIdx = -1;

  const activate = (idx: number) => {
    if (idx === lastIdx) return;
    lastIdx = idx;

    items.forEach((el, i) => {
      el.setAttribute("data-active", i === idx ? "true" : "false");
      gsap.to(el, { opacity: i === idx ? 1 : 0.55, duration: 0.18, ease: "power2.out", overwrite: "auto" });
    });

    panels.forEach((p, i) => {
      const on = i === idx;
      gsap.to(p, {
        autoAlpha: on ? 1 : 0,
        y: on ? 0 : 14,
        duration: on ? 0.28 : 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  activate(0);

  // Optional header reveal inside section
  const headings = Array.from(section.querySelectorAll<HTMLElement>(".portfolio-kicker, .portfolio-title, .portfolio-sub"));
  if (headings.length) {
    gsap.fromTo(
      headings,
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: section, start: "top 82%" },
      }
    );
  }

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: `+=${total * 140}%`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    onUpdate: (self: any) => {
      const idx = Math.round(self.progress * (total - 1));
      activate(idx);

      // continuous (cheap) updates
      if (needle) gsap.set(needle, { scaleY: 0.12 + self.progress * 0.88 });
      if (scan) {
        gsap.set(scan, { autoAlpha: 1, y: -50 + self.progress * 240 });
      }
    },
  });

  if (glow) {
    gsap.to(glow, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 60%" },
    });
  }

  if (radars.length) {
    gsap.to(radars, { rotate: 360, duration: 26, ease: "none", repeat: -1 });
  }
}

/** BRAND circles pinned */
function initBrandCircles(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  const circles = Array.from(section.querySelectorAll<HTMLElement>(".brand-circle-wrapper"));
  if (!circles.length) return;

  const aa = section.querySelector<HTMLElement>(".brand-aa");
  const heading = section.querySelector<HTMLElement>("#brand-circles-heading");
  const quote = section.querySelector<HTMLElement>("#brand-quote");
  const circleInner = Array.from(section.querySelectorAll<HTMLElement>(".brand-circle"));

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=300%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  if (aa) tl.from(aa, { autoAlpha: 0, y: 18, scale: 0.98, duration: 0.8, ease: "power3.out" });

  if (heading) {
    const rest = Array.from(heading.querySelectorAll<HTMLElement>(":scope > :not(.brand-aa)"));
    if (rest.length) tl.from(rest, { autoAlpha: 0, y: 24, duration: 0.8, ease: "power3.out", stagger: 0.06 }, "-=0.55");
  }

  circles.forEach((c, i) => {
    tl.from(
      c,
      { autoAlpha: 0, y: 20, scale: 0.98, duration: 0.6, ease: "power3.out" },
      i === 0 ? "+=0.05" : "-=0.4"
    );
  });

  if (quote) tl.from(quote, { autoAlpha: 0, y: 18, duration: 0.7, ease: "power3.out" }, "+=0.05");

  // Gentle pulse (optional)
  if (circleInner.length) {
    gsap.to(circleInner, {
      scale: 1.02,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
      stagger: { each: 0.35, from: "center" },
    });
  }
}

/** Giant A zoom pinned */
function initGiantA(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  // You must have `.giant-a` inside this section (or adjust selector)
  const giant = section.querySelector<HTMLElement>("[data-giant-a]") || section.querySelector<HTMLElement>(".giant-a");
  if (!giant) return;

  gsap.set(giant, { willChange: "transform,opacity" });

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=180%",
      scrub: 1.1,
      pin: true,
      anticipatePin: 1,
    },
  }).fromTo(
    giant,
    { scale: 1, opacity: 0.95 },
    { scale: 7.5, opacity: 0, ease: "power2.inOut" }
  );
}

/** FOOTER pinned reveal */
function initFooter(gsap: Gsap, ScrollTrigger: ScrollTriggerType, section: HTMLElement) {
  const parts = Array.from(
    section.querySelectorAll<HTMLElement>(".footer-head, .footer-cta, .footer-grid, .footer-bottom")
  );
  const glow = section.querySelector<HTMLElement>(".footer-glow");
  const dots = Array.from(section.querySelectorAll<HTMLElement>(".footer-dot"));

  gsap.set(parts, { autoAlpha: 0, y: 18, willChange: "transform,opacity" });
  if (glow) gsap.set(glow, { autoAlpha: 0, scale: 0.95, y: 30, willChange: "transform,opacity" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=150%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  if (glow) tl.to(glow, { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0);
  tl.to(parts, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, 0.05);

  if (glow) tl.to(glow, { y: -40, duration: 1.1, ease: "sine.inOut" }, 0.2);

  if (dots.length) {
    gsap.to(dots, { scale: 1.18, repeat: -1, yoyo: true, duration: 1.2, ease: "sine.inOut" });
  }
}
