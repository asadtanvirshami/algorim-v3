// components/hero/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { HeroCanvas } from "../3D/hero/scene";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D background */}
      <HeroCanvas />

      {/* gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 md:px-12">
        <motion.p
          className="mb-4 text-sm uppercase tracking-[0.35em] text-zinc-400"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          SMOOTH SCROLL / REACT · THREE · MOTION
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-semibold leading-[0.95]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          Scroll as a
          <span className="block bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
            designed experience
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base md:text-lg text-zinc-300"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          Powered by Lenis, blended with 3D and motion to create a single,
          continuous scroll that feels intentional instead of accidental.
        </motion.p>

        {/* scroll hint */}
        <motion.div
          className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-500"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="h-10 w-[1px] overflow-hidden bg-zinc-700/60">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-zinc-100 to-transparent"
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
            />
          </div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
