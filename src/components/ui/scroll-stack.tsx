"use client";

import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  ReactElement,
} from "react";

type ScrollStackItemBaseProps = {
  children: ReactNode;
  itemClassName?: string;
};

type ScrollStackItemInjectedProps = {
  index?: number;
  total?: number;
};

type ScrollStackItemProps = ScrollStackItemBaseProps &
  ScrollStackItemInjectedProps;

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
  index = 0,
  total = 1,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 = off screen, 1 = focused

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // distance from center of viewport
      const center = rect.top + rect.height / 2;
      const distanceToCenter = Math.abs(center - vh / 2);

      // raw progress => 1 at center, 0 when far away
      const raw = 1 - distanceToCenter / (vh * 0.8); // 0.8 = how “wide” the active area is
      const clamped = Math.max(0, Math.min(1, raw));

      setProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Map progress → transforms
  const scale = 0.9 + progress * 0.12; // 0.9 → 1.02
  const yOffset = (1 - progress) * 60; // lifts into place
  const rotation = (1 - progress) * -2; // slight tilt when not centered
  const opacity = 0.12 + progress * 0.9;

  return (
    <section
      ref={ref}
      className={`h-screen sticky top-0 flex items-center justify-center ${itemClassName}`}
      style={{
        zIndex: (total ?? 1) - (index ?? 0),
        transform: `translateY(${yOffset}px) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        transition: "transform 0.18s ease-out, opacity 0.18s ease-out",
      }}
    >
      <div className="max-w-2xl px-8 py-10 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.75)]">
        {children}
      </div>
    </section>
  );
};

type ScrollStackProps = {
  children: ReactNode;
};

const ScrollStack: React.FC<ScrollStackProps> = ({ children }) => {
  const arr = React.Children.toArray(children);
  const total = arr.length;

  return (
    <div className="relative">
      {arr.map((child, index) =>
        React.isValidElement(child)
          ? (React.cloneElement(child as ReactElement<any>, {
              index,
              total,
            }) as ReactElement)
          : child
      )}
    </div>
  );
};

export default ScrollStack;
