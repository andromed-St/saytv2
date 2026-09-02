import { useEffect, useState } from "react";
import { Icon } from "./Icons";
import { CASES, FAQS, REVIEWS } from "../data";
import { Reveal, SectionHead, usePrefersReducedMotion } from "../lib";

/* ================= Кейсы «До / После» ================= */

export function Cases() {
  return (
    <section id="keysy" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <SectionHead
          num="08"
          eyebrow="Кейсы внедрения"
          title={
            <>
              Цифры «до» и «после» — <span className="text-accent">из реальных проектов</span>
            </>
          }
          lead="Три типовых внедрения последнего года: магазин, кафе и фитнес-клуб. Метрики считаем вместе с клиентом до старта."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <article className="card-mi flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="badge badge-new">{c.tag}</span>
                  <span className="num flex items-center gap-1.5 text-[12px] text-muted">
                    <Icon name="pin" className="h-3.5 w-3.5 text-accent" />
                    {c.city}
                  </span>
                </div>
                <h3 className="mt-4 text-[19px] font-bold">{c.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{c.text}</p>

                <div className="mt-5 flex-1 space-y-3">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="rounded-[10px] border border-line/80 bg-surface/50 px-4 py-3">
                      <div className="text-[11.5px] font-medium uppercase tracking-[0.1em] text-muted">{m.label}</div>
                      <div className="num mt-1.5 flex items-center gap-2.5 text-[14.5px]">
                        <span className="text-muted line-through decoration-err/60">{m.before}</span>
                        <Icon name="arrow" className="h-4 w-4 shrink-0 text-accent" />
                        <span className="font-bold text-snow">{m.after}</span>
                        <span className="ml-auto rounded-[6px] bg-ok/12 px-2 py-0.5 text-[11.5px] font-bold text-ok">{m.delta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Карусель отзывов ================= */

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export function Reviews() {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || hover) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 6500);
    return () => window.clearInterval(t);
  }, [reduced, hover]);

  const go = (d: number) => setIdx((i) => (i + d + REVIEWS.length) % REVIEWS.length);

  return (
    <section id="otzyvy" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <SectionHead
          num="09"
          eyebrow="Отзывы"
          title={
            <>
              Что говорят владельцы <span className="text-accent">после запуска</span>
            </>
          }
        />

        <Reveal>
          <div
            className="relative overflow-hidden rounded-[14px] border border-line bg-panel"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className="pointer-events-none absolute -right-10 -top-14 select-none font-mono text-[180px] font-bold leading-none text-accent/8" aria-hidden="true">
              ”
            </div>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${idx * 100}%)` }}
              >
                {REVIEWS.map((r) => (
                  <figure key={r.name} className="w-full shrink-0 p-7 md:p-10">
                    <div className="flex items-center gap-1 text-warn">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Icon key={s} name="star" className="h-4 w-4" />
                      ))}
                    </div>
                    <blockquote className="mt-5 max-w-[820px] text-[17px] leading-relaxed text-snow/95 md:text-[19px]">
                      «{r.text}»
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-surface text-[14px] font-bold text-accent">
                        {initials(r.name)}
                      </span>
                      <span>
                        <span className="block text-[15px] font-bold">{r.name}</span>
                        <span className="block text-[13px] text-muted">{r.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-line px-7 py-4 md:px-10">
              <div className="flex items-center gap-2">
                {REVIEWS.map((r, i) => (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-label={`Отзыв ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === idx ? "w-6 bg-accent" : "w-2 bg-line hover:bg-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="num mr-3 text-[12px] text-muted">
                  {String(idx + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Предыдущий отзыв"
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-muted transition-all hover:border-accent hover:text-accent"
                >
                  <Icon name="arrow" className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Следующий отзыв"
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-muted transition-all hover:border-accent hover:text-accent"
                >
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= FAQ ================= */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[860px] px-5 md:px-8">
        <SectionHead
          num="10"
          eyebrow="Вопросы и ответы"
          title={
            <>
              Спрашивают <span className="text-accent">до подписания договора</span>
            </>
          }
        />

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={`overflow-hidden rounded-[12px] border transition-colors duration-300 ${isOpen ? "border-accent/50 bg-panel" : "border-line bg-panel/70 hover:border-accent/30"}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left md:px-6 md:py-5"
                  >
                    <span className="flex items-baseline gap-3.5">
                      <span className="num text-[12px] font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`text-[15.5px] font-semibold leading-snug ${isOpen ? "text-snow" : "text-snow/85"}`}>{f.q}</span>
                    </span>
                    <Icon
                      name="plus"
                      className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-[52px] text-[14.5px] leading-relaxed text-muted md:px-6 md:pb-6 md:pl-[56px]">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
