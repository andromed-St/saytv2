import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number; // базовая прозрачность
  tw: number; // скорость мерцания
  ph: number; // фаза мерцания
  c: [number, number, number];
  plus: boolean;
}

/* Фирменные цвета частиц под светлую тему */
const COLORS: [number, number, number][] = [
  [14, 116, 144], // глубокий циан
  [77, 124, 15], // тёмный лайм
  [100, 116, 139], // графит
  [14, 165, 233], // искра
];

/**
 * Лёгкое поле частиц для первого экрана.
 * — число частиц зависит от площади (24–55);
 * — пауза, когда hero вне вьюпорта или вкладка свёрнута;
 * — при prefers-reduced-motion — «спокойный» режим: медленный дрейф без мерцания.
 */
export default function ParticleField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reduced ? 0.3 : 1; // спокойный режим — медленный дрейф
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let parts: Particle[] = [];
    let W = 0;
    let H = 0;
    let raf = 0;
    let running = false;
    let visible = true;

    const rnd = (min: number, max: number) => min + Math.random() * (max - min);

    const makeParticle = (): Particle => ({
      x: rnd(0, W),
      y: rnd(0, H),
      r: rnd(0.9, 2.6),
      vx: rnd(-0.14, 0.14),
      vy: rnd(-0.28, -0.06), // медленный подъём, как «искры»
      a: rnd(0.14, 0.42),
      tw: rnd(0.6, 1.8),
      ph: rnd(0, Math.PI * 2),
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      plus: Math.random() < 0.16,
    });

    const init = () => {
      const rect = parent.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(55, Math.max(24, Math.round((W * H) / 24000)));
      parts = Array.from({ length: count }, makeParticle);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        const alpha = reduced ? p.a : p.a * (0.55 + 0.45 * Math.sin(t * 0.001 * p.tw + p.ph));
        ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${alpha.toFixed(3)})`;
        ctx.strokeStyle = ctx.fillStyle;
        if (p.plus) {
          const s = p.r + 2.4;
          ctx.lineWidth = 1.1;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.x - s, p.y);
          ctx.lineTo(p.x + s, p.y);
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x, p.y + s);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const step = (t: number) => {
      for (const p of parts) {
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.y < -12) {
          p.y = H + 10;
          p.x = rnd(0, W);
        }
        if (p.x < -12) p.x = W + 10;
        if (p.x > W + 12) p.x = -10;
      }
      draw(t);
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    init();
    draw(0);
    start();

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      init();
      if (!running) draw(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
}
