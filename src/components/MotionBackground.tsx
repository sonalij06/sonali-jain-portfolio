"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type Packet = {
  from: number;
  to: number;
  t: number;
  speed: number;
  color: string;
};

/**
 * Ambient canvas backdrop: a drifting service-mesh — nodes standing in for
 * regions/hosts, edges for links, and small packets crawling along edges
 * for traffic. Reads as infra topology, not decorative particles.
 */
export function MotionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const signal = "57,255,158";
    const amber = "255,180,84";

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let rafId = 0;
    let running = false;
    let linkDist = 170;

    function isSmall() {
      return width < 720;
    }

    function seed() {
      const area = width * height;
      const divisor = isSmall() ? 26000 : 17000;
      const count = Math.max(10, Math.min(46, Math.round(area / divisor)));

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isSmall() ? 0.09 : 0.14),
        vy: (Math.random() - 0.5) * (isSmall() ? 0.09 : 0.14),
        r: Math.random() < 0.16 ? 2.6 : 1.4,
      }));

      linkDist = isSmall() ? 130 : 170;

      const packetCount = isSmall() ? 3 : 6;
      packets = Array.from({ length: packetCount }, () => spawnPacket());
    }

    function spawnPacket(): Packet {
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      if (to === from) to = (to + 1) % nodes.length;
      return {
        from,
        to,
        t: 0,
        speed: 0.004 + Math.random() * 0.006,
        color: Math.random() < 0.82 ? signal : amber,
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function step() {
      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.16;
            ctx!.strokeStyle = `rgba(${signal},${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of packets) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (!a || !b) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > linkDist) {
          Object.assign(p, spawnPacket());
          continue;
        }
        p.t += p.speed;
        if (p.t >= 1) {
          Object.assign(p, spawnPacket());
          continue;
        }
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;
        ctx!.fillStyle = `rgba(${p.color},.75)`;
        ctx!.beginPath();
        ctx!.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const n of nodes) {
        ctx!.fillStyle = `rgba(${signal},.4)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafId = requestAnimationFrame(step);
    }

    function start() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(step);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    resize();

    if (reduceMotion) {
      // one static frame — topology stays visible, nothing moves.
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDist) {
            ctx.strokeStyle = `rgba(${signal},${(1 - dist / linkDist) * 0.14})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${signal},.35)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      start();
    }

    let resizeTimeout: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    }
    function onVisibility() {
      if (reduceMotion) return;
      if (document.hidden) stop();
      else start();
    }

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas className="bg-network" ref={canvasRef} aria-hidden="true" />;
}
