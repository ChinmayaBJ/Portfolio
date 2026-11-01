"use client";

import { useEffect, useRef } from "react";

/**
 * Hero visual — a re-creation of the production Three.js scene in the same
 * spirit ("from the screen to the silicon"): a drifting node field over a
 * faint die/grid, with signal pulses travelling the traces and a soft ember
 * core glow. Pure Canvas 2D, no dependencies. Honors prefers-reduced-motion.
 */
export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const EMBER = "217,102,61";
    const EMERALD = "0,210,148";
    const BONE = "237,232,220";

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    type Pulse = { a: number; b: number; t: number; speed: number; color: string };
    let pulses: Pulse[] = [];

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(46, Math.max(20, (w * h) / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.7,
      }));
      pulses = [];
    }

    const LINK = 130; // px link distance

    function neighbors(i: number): number[] {
      const out: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < LINK * LINK) out.push(j);
      }
      return out;
    }

    function spawnPulse() {
      if (nodes.length < 2) return;
      const a = Math.floor(Math.random() * nodes.length);
      const n = neighbors(a);
      if (!n.length) return;
      const b = n[Math.floor(Math.random() * n.length)];
      pulses.push({
        a,
        b,
        t: 0,
        speed: 0.012 + Math.random() * 0.02,
        color: Math.random() > 0.78 ? EMERALD : EMBER,
      });
    }

    let raf = 0;
    let last = performance.now();
    let acc = 0;

    function frame(now: number) {
      const dt = Math.min(48, now - last);
      last = now;

      ctx!.clearRect(0, 0, w, h);

      // ease mouse
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const px = (mouse.x - 0.5) * 24;
      const py = (mouse.y - 0.5) * 24;

      // central ember core glow
      const cx = w * 0.52 + px * 0.6;
      const cy = h * 0.46 + py * 0.6;
      const glow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
      glow.addColorStop(0, `rgba(${EMBER},0.10)`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, w, h);

      // faint die outline (concentric squares)
      const s = Math.min(w, h);
      ctx!.save();
      ctx!.translate(cx, cy);
      for (let k = 0; k < 3; k++) {
        const size = s * (0.18 + k * 0.12);
        ctx!.strokeStyle = `rgba(${BONE},${0.05 - k * 0.012})`;
        ctx!.lineWidth = 1;
        ctx!.strokeRect(-size / 2, -size / 2, size, size);
      }
      ctx!.restore();

      // move nodes
      for (const nd of nodes) {
        if (!reduce) {
          nd.x += nd.vx * (dt / 16);
          nd.y += nd.vy * (dt / 16);
        }
        if (nd.x < 0 || nd.x > w) nd.vx *= -1;
        if (nd.y < 0 || nd.y > h) nd.vy *= -1;
        nd.x = Math.max(0, Math.min(w, nd.x));
        nd.y = Math.max(0, Math.min(h, nd.y));
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.14;
            ctx!.strokeStyle = `rgba(${BONE},${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // nodes
      for (const nd of nodes) {
        ctx!.fillStyle = `rgba(${BONE},0.5)`;
        ctx!.beginPath();
        ctx!.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // pulses
      if (!reduce) {
        acc += dt;
        if (acc > 420) {
          acc = 0;
          spawnPulse();
          if (pulses.length > 26) pulses.splice(0, pulses.length - 26);
        }
        for (let p = pulses.length - 1; p >= 0; p--) {
          const pl = pulses[p];
          pl.t += pl.speed * (dt / 16);
          if (pl.t >= 1 || !nodes[pl.a] || !nodes[pl.b]) {
            pulses.splice(p, 1);
            continue;
          }
          const x = nodes[pl.a].x + (nodes[pl.b].x - nodes[pl.a].x) * pl.t;
          const y = nodes[pl.a].y + (nodes[pl.b].y - nodes[pl.a].y) * pl.t;
          ctx!.fillStyle = `rgba(${pl.color},${0.9 * (1 - Math.abs(0.5 - pl.t) * 1.2)})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 2, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      raf = requestAnimationFrame(frame);
    }

    function onResize() {
      build();
    }
    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = (e.clientY - rect.top) / rect.height;
    }

    build();
    if (reduce) {
      // paint a single static frame
      frame(performance.now());
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
