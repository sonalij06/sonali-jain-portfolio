"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Touch-only floating action cluster: a persistent "email" shortcut and a
 * "scroll to top" button that appears once the hero has scrolled out of
 * view. Hidden entirely above the nav's mobile breakpoint (desktop already
 * has hover CTAs and the custom cursor for this).
 */
export function MobileQuickActions() {
  const [showTop, setShowTop] = useState(false);
  const topBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowTop(!entry.isIntersecting),
      { rootMargin: "-40% 0px 0px 0px" }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const btn = topBtnRef.current;
    if (!btn) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      btn.style.opacity = showTop ? "1" : "0";
      btn.style.pointerEvents = showTop ? "auto" : "none";
      return;
    }
    gsap.to(btn, {
      opacity: showTop ? 1 : 0,
      scale: showTop ? 1 : 0.6,
      duration: 0.28,
      ease: showTop ? "back.out(1.7)" : "power2.in",
      onStart: () => {
        if (showTop) btn.style.pointerEvents = "auto";
      },
      onComplete: () => {
        if (!showTop) btn.style.pointerEvents = "none";
      },
    });
  }, [showTop]);

  return (
    <div className="mobile-quick-actions">
      <button
        type="button"
        className="qa-btn qa-top"
        ref={topBtnRef}
        aria-label="Back to top"
        aria-hidden={!showTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 16 16" fill="none" width="15" height="15" aria-hidden="true">
          <path d="M8 13V3M3.5 7L8 2.5L12.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <a href="mailto:sonalijain0605@gmail.com" className="qa-btn qa-email" aria-label="Email Sonali">
        <svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">
          <path
            d="M2.5 4H13.5C13.7761 4 14 4.22386 14 4.5V11.5C14 11.7761 13.7761 12 13.5 12H2.5C2.22386 12 2 11.7761 2 11.5V4.5C2 4.22386 2.22386 4 2.5 4Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M2.5 4.5L8 8.5L13.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
