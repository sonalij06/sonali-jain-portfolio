"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close on Escape, and if the viewport grows back past the mobile breakpoint.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onResize() {
      if (window.innerWidth > 880) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Stagger the links in/out instead of an instant display toggle.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = nav.querySelectorAll("a");

    if (!open) {
      if (nav.style.display === "none" || !nav.classList.contains("is-open")) return;
      if (reduceMotion) {
        nav.classList.remove("is-open");
        return;
      }
      gsap.to(items, {
        opacity: 0,
        y: -8,
        duration: 0.16,
        stagger: 0.02,
        ease: "power2.in",
        onComplete: () => nav.classList.remove("is-open"),
      });
      return;
    }

    nav.classList.add("is-open");
    if (reduceMotion) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.32, stagger: 0.045, ease: "power3.out" }
    );
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
          {open ? (
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6H17M3 10H17M3 14H17"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && <div className="nav-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}

      <nav className="links" ref={navRef}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
