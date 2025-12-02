// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export function ZigZagSection() {
//   const ref = useRef<HTMLDivElement | null>(null);

//   // Track scroll progress for this section
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     // 0 = when top of section hits top of viewport
//     // 1 = when bottom of section hits top of viewport
//     offset: ["start end", "end center"],
//   });

//   // Card starts above (-120) and slides down to 0
//   const cardY = useTransform(scrollYProgress, [0, 1], [-300, 0]);

//   return (
//     <section ref={ref} className="min-h-screen flex items-center !text-black">
//       <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 md:flex-row md:items-center md:px-12">
//         {/* Text */}
//         <div className="flex-1">
//           <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
//             02 — SCROLL TRIGGER
//           </p>
//           <h2 className="mb-4 text-3xl md:text-4xl font-semibold">
//             Card slides down when section two starts.
//           </h2>
//           <p className="max-w-md text-zinc-300">
//             As soon as the top of this section reaches the top of the screen,
//             the card begins above and slides down into place while you scroll.
//           </p>
//         </div>

//         {/* Card that slides down */}
//         <motion.div
//           initial={{ y: -400 }}
//           style={{ y: cardY }}
//           className="flex-1 flex justify-center"
//         >
//           <div className="relative h-64 w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black shadow-[0_0_60px_rgba(56,189,248,0.4)]">
//             <div className="absolute inset-px rounded-[22px] bg-gradient-to-b from-sky-500/20 via-transparent to-indigo-500/10" />
//             <div className="relative flex h-full flex-col justify-between p-6">
//               <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 flex justify-between">
//                 <span>Section 2</span>
//                 <span>Slide Down</span>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm text-zinc-100">
//                   I move down when you scroll.
//                 </p>
//                 <p className="text-xs text-zinc-400">
//                   My <code>y</code> position is linked to the scroll progress of
//                   this section.
//                 </p>
//               </div>
//               <div className="flex gap-2 text-[10px] text-zinc-300">
//                 <span className="rounded-full border border-zinc-700/60 bg-zinc-900/70 px-3 py-1">
//                   useScroll
//                 </span>
//                 <span className="rounded-full border border-zinc-700/60 bg-zinc-900/70 px-3 py-1">
//                   useTransform
//                 </span>
//                 <span className="rounded-full border border-zinc-700/60 bg-zinc-900/70 px-3 py-1">
//                   y: -120 → 0
//                 </span>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ZigZagSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.from(cardRef.current, {
        y: -300,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",      // when section hits top of screen
          end: "bottom top",     // when bottom leaves top
          scrub: 1,              // smooth sync with scroll
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-black"
    >
      <div className="max-w-3xl text-center">
        <h1 className="text-white text-4xl mb-10">Section Two</h1>

        <div
          ref={cardRef}
          className="w-80 h-48 bg-zinc-900 text-white p-6 rounded-2xl shadow-xl mx-auto"
        >
          Card slides down using GSAP ScrollTrigger
        </div>
      </div>
    </section>
  );
}
