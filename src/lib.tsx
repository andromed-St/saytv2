import { useEffect, useRef, useState, type ReactNode } from "react";

/* Предпочтение сниженной анимации */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* Появление блока при скролле */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* Заголовок секции в едином стиле */
export function SectionHead({
  num,
  eyebrow,
  title,
  lead,
}: {
  num: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-3xl md:mb-14">
      <div className="eyebrow">
        <span className="text-line">{"//"}</span> {num} · {eyebrow}
      </div>
      <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight md:text-[34px]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[17px] leading-relaxed text-muted">{lead}</p>}
    </Reveal>
  );
}

/* Плавная анимация числа */
export function useAnimatedNumber(value: number, duration = 550): number {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      prevRef.current = value;
      return;
    }
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prevRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduced]);
  return display;
}

/* Форматирование чисел (ru-BY, неразрывные пробелы) */
export function fmt(n: number): string {
  return Math.round(n).toLocaleString("ru-RU");
}

/* Программный скролл к якорю */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
