"use client";

import { useEffect, useRef } from "react";

const MAX_LIVE = 6;
const LIFETIME_MS = 550;

/**
 * Touch-device counterpart to the desktop custom cursor: since there's no
 * hover ring to react with on a touchscreen, every tap pings an expanding
 * signal-green ring at the contact point instead — same "system is alive"
 * language as the status dot / pipeline rail, just triggered by touch.
 */
export function TouchPing() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const host = hostRef.current;
    if (!host) return;

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType !== "touch" || !host) return;

      while (host.childElementCount >= MAX_LIVE) {
        host.firstElementChild?.remove();
      }

      const ping = document.createElement("span");
      ping.className = "touch-ping";
      ping.style.left = `${e.clientX}px`;
      ping.style.top = `${e.clientY}px`;
      host.appendChild(ping);
      setTimeout(() => ping.remove(), LIFETIME_MS);
    }

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return <div className="touch-ping-host" ref={hostRef} aria-hidden="true" />;
}
