"use client";

import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactLenis from "lenis/react";
import SEO from "@/components/seo/seo-head";

// ✅ Code-split DevLayout for faster first paint
const DevLayout = dynamic(() => import("@/components/ui/dev/page-layout"), {
  loading: () => null, // we handle loader ourselves
});

/** =========================
 *  Full-page Loader (fast + premium)
 *  - Shows immediately
 *  - Animates out only after DevLayout is mounted + window loaded
 *  - Honors prefers-reduced-motion
 *  ========================= */
function PageLoader({
  show,
  progress,
}: {
  show: boolean;
  progress: number;
}) {
  // Clamp
  const p = Math.max(0, Math.min(100, progress));

  return (
    <div
      aria-hidden={!show}
      className={[
        "fixed inset-0 z-[9999] grid place-items-center",
        "bg-[#0A0B0E] text-white",
        "transition-opacity duration-500",
        show ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* soft atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full bg-white/[0.06] blur-[180px]" />
        <div className="absolute -bottom-44 -right-44 h-[620px] w-[620px] rounded-full bg-neutral-200/[0.05] blur-[220px]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_35%,rgba(255,255,255,0.06),transparent_58%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/85" />
        <div
          className="
            absolute inset-0 opacity-[0.14]
            [background-image:
              linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]
            [background-size:72px_72px]
          "
        />
      </div>

      <div className="relative w-full max-w-[520px] px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* “A” mark */}
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-xl">
              <span className="text-lg font-semibold tracking-tight  font-[family-name:var(--font-revamped)] ">A</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm  font-[family-name:var(--font-revamped)]  font-medium tracking-wide text-white/85">
                Algorim
              </div>
              <div className="text-[11px] tracking-[0.22em] text-white/45 uppercase">
                Loading experience
              </div>
            </div>
          </div>

          {/* spinner */}
          <div className="grid place-items-center">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-0 rounded-full border border-white/35 border-t-transparent animate-spin motion-reduce:animate-none" />
              <div className="absolute inset-[7px] rounded-full bg-white/[0.03]" />
            </div>
          </div>
        </div>

        {/* progress */}
        <div className="mt-7">
          <div className="flex items-center justify-between text-[11px] tracking-[0.24em] uppercase text-white/45">
            <span>Preparing</span>
            <span>{p}%</span>
          </div>

          <div className="mt-3 h-[10px] rounded-full bg-white/[0.06] ring-1 ring-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-300 transition-[width] duration-300 ease-out"
              style={{ width: `${p}%` }}
            />
          </div>

          <div className="mt-4 text-sm text-white/55">
            Optimizing visuals, animations, and smooth scrolling…
          </div>
        </div>

        {/* subtle shimmer line */}
        <div className="relative mt-8 h-px w-full overflow-hidden bg-white/10">
          <div className="absolute -left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.35s_linear_infinite] motion-reduce:animate-none" />
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(200%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

const LandingClient = () => {
  const [layoutMounted, setLayoutMounted] = useState(false);
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // simple “perceived progress” ramp (lightweight)
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    // mark when the browser finished loading critical assets
    const onLoad = () => setWindowLoaded(true);
    if (document.readyState === "complete") setWindowLoaded(true);
    else window.addEventListener("load", onLoad, { once: true });

    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (!showLoader) return;

    // fast progress simulation: ramps to 92%, then waits for "ready"
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (layoutMounted && windowLoaded) return 100;
        if (p >= 92) return 92;
        const bump = p < 35 ? 6 : p < 70 ? 4 : 2;
        return Math.min(92, p + bump);
      });
    }, 140);

    return () => window.clearInterval(id);
  }, [showLoader, layoutMounted, windowLoaded]);

  useEffect(() => {
    // When DevLayout mounted + window load fired => fade out loader
    if (!layoutMounted || !windowLoaded) return;

    // finish bar
    setProgress(100);

    // small delay to avoid flash + allow first paint
    const t1 = window.setTimeout(() => setShowLoader(false), 260);

    return () => window.clearTimeout(t1);
  }, [layoutMounted, windowLoaded]);

  return (
    <>
      <SEO
        title="Algorim.io | Full-stack Development, Blockchain, & AI Solutions"
        description="Utilizing the technology of Blockchain & AI for Business. We build robust, scalable, and secure solutions for your business."
        url="https://algorimsoft.com"
        image="https://algorimsoft.com/og-image.jpg"
      />

      {/* Full page loader */}
      <PageLoader show={showLoader} progress={progress} />

      <ReactLenis
        root
        options={{
          lerp: 0.08,
          duration: 1.1,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          syncTouch: true,
          gestureOrientation: "vertical",
        }}
      >
        {/* Mount marker: makes loader disappear only when DevLayout is actually in DOM */}
        <div
          ref={() => {
            // this callback fires when the wrapper mounts
            // (safe + zero extra renders)
            if (!layoutMounted) setLayoutMounted(true);
          }}
        >
          <DevLayout />
        </div>
      </ReactLenis>
    </>
  );
};

export default memo(LandingClient);
