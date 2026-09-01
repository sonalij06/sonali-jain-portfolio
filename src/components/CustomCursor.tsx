"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fineHover = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (!fineHover || reduceMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.body.classList.add("cursor-ready");

    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      document.body.classList.add("cursor-active");
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    }
    function onLeaveWindow() {
      document.body.classList.remove("cursor-active");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    const hoverTargets = document.querySelectorAll<HTMLElement>(
      "a, button, .repo-card, .job, .skill-card"
    );
    const hoverHandlers: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = [];
    hoverTargets.forEach((el) => {
      const enter = () => {
        const labelHost = el.closest<HTMLElement>("[data-cursor]");
        ring.classList.add("is-link");
        label.textContent = labelHost?.getAttribute("data-cursor") ?? "";
      };
      const leave = () => {
        ring.classList.remove("is-link");
        label.textContent = "";
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      hoverHandlers.push({ el, enter, leave });
    });

    const magnets = document.querySelectorAll<HTMLElement>(".magnetic");
    const magnetHandlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
    magnets.forEach((el) => {
      const setMX = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1,0.35)" });
      const setMY = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1,0.35)" });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        setMX((e.clientX - (r.left + r.width / 2)) * 0.3);
        setMY((e.clientY - (r.top + r.height / 2)) * 0.3);
      };
      const leave = () => {
        setMX(0);
        setMY(0);
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      magnetHandlers.push({ el, move, leave });
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      hoverHandlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      magnetHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
      document.body.classList.remove("cursor-ready", "cursor-active");
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="ring-visual">
          <span className="cursor-label" ref={labelRef} />
        </span>
      </div>
    </>
  );
}
