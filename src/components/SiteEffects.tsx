"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TERMINAL_LINES } from "@/content/site";

export function SiteEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- terminal typing sequence ----
    const termBody = document.getElementById("termBody");
    let typingTimeout: ReturnType<typeof setTimeout> | undefined;

    function typeLines() {
      if (!termBody) return;
      if (reduceMotion) {
        termBody.innerHTML = TERMINAL_LINES.map((l) => {
          const cls = l.type === "prompt" ? "p" : l.type === "ok" ? "ok" : "out";
          return `<div class="${cls}">${l.text}</div>`;
        }).join("");
        return;
      }
      let i = 0;
      function nextLine() {
        if (!termBody) return;
        if (i >= TERMINAL_LINES.length) {
          const caret = document.createElement("span");
          caret.className = "caret";
          termBody.appendChild(caret);
          return;
        }
        const l = TERMINAL_LINES[i];
        const div = document.createElement("div");
        div.className = l.type === "prompt" ? "p" : l.type === "ok" ? "ok" : "out";
        termBody.appendChild(div);
        const text = l.text;
        let j = 0;
        const speed = l.type === "prompt" ? 34 : 14;
        (function type() {
          div.textContent = text.slice(0, j);
          j++;
          if (j <= text.length) {
            typingTimeout = setTimeout(type, speed);
          } else {
            i++;
            typingTimeout = setTimeout(nextLine, l.type === "prompt" ? 220 : 340);
          }
        })();
      }
      nextLine();
    }
    typeLines();

    // ---- hero count-up ----
    function animateCount(el: Element) {
      const raw = el.getAttribute("data-count");
      if (!raw || reduceMotion) return;
      const target = parseFloat(raw);
      const isDecimal = raw.indexOf(".") > -1;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.4,
        ease: "power2.out",
        onUpdate() {
          const unitEl = el.querySelector(".unit");
          const unitHTML = unitEl ? unitEl.outerHTML : "";
          el.innerHTML = (isDecimal ? obj.v.toFixed(1) : Math.round(obj.v)) + unitHTML;
        },
      });
    }

    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add("js-ready");

    const ctx = gsap.context(() => {
        // hero load sequence
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(".hero h1 .line span", { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.09 })
          .fromTo(
            [".hero-sub", ".cta-row", ".stat-strip"],
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
            "-=.5"
          )
          .fromTo(".term", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, "-=.6");

        document.querySelectorAll(".stat .num[data-count]").forEach(animateCount);

        // generic reveal on scroll for everything below hero
        gsap.utils.toArray<Element>(".section .reveal, .marquee.reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          );
        });

        // stage-by-stage stagger inside experience/skill/repo cards
        gsap.utils.toArray<Element>(".job, .skill-card, .repo-card").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%" },
            }
          );
        });

        // pipeline node activation
        document.querySelectorAll(".stage").forEach((stage) => {
          ScrollTrigger.create({
            trigger: stage,
            start: "top 70%",
            onEnter: () => stage.classList.add("is-live"),
          });
        });

        // rail fill progress across whole pipeline
        const railFill = document.getElementById("railFill");
        const pipeline = document.querySelector(".rail-col");
        if (railFill && pipeline) {
          ScrollTrigger.create({
            trigger: pipeline,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              railFill.style.transform = `scaleY(${self.progress})`;
            },
          });
        }
    });

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }, []);

  return null;
}
