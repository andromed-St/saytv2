import { Icon } from "./Icons";
import {
  BADGE_LABELS,
  BUNDLES,
  EQUIP_CATS,
  NICHES,
  PRODUCTS,
  type BadgeKind,
  type BizId,
} from "../data";
import { fmt, Reveal, SectionHead } from "../lib";

const BADGE_CLASS: Record<BadgeKind, string> = {
  hit: "badge-hit",
  new: "badge-new",
  sale: "badge-sale",
  offline: "badge-offline",
  local: "badge-local",
};

/* ================= Решения по нишам ================= */

export function Niches({ onPick }: { onPick: (id: BizId) => void }) {
  return (
    <section id="resheniya" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <SectionHead
          num="03"
          eyebrow="Решения по нишам"
          title={
            <>
              Шесть готовых сценариев — <span className="text-accent">под ваш формат бизнеса</span>
            </>
          }
          lead="Каждое решение собрано из наших продуктов и оборудования под конкретные процессы: от ларька до мини-сети."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NICHES.map((n, i) => (
            <Reveal key={n.id} delay={(i % 3) * 90}>
              <article className={`card-mi group flex h-full flex-col p-6 ${i % 2 ? "card-squish-alt" : "card-squish"}`}>
                <div className="flex items-center gap-3.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-accent/35 bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
                    <Icon name={n.icon} className="prod-ico h-6 w-6" />
                  </span>
                  <h3 className="text-[18px] font-bold">{n.title}</h3>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-muted">{n.desc}</p>
                <ul className="mt-4 space-y-2">
                  {n.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-snow/85">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onPick(n.id)}
                  className="mt-5 inline-flex items-center gap-2 self-start text-[13.5px] font-semibold text-accent transition-all hover:gap-3 hover:text-limedeep"
                >
                  Рассчитать для «{n.title.toLowerCase()}»
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Продукты ================= */

export function Products({ onCalc }: { onCalc: () => void }) {
  return (
    <section id="produkty" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <SectionHead
          num="04"
          eyebrow="Продукты"
          title={
            <>
              Продуктовая линейка <span className="text-accent">Microinvest</span>
            </>
          }
          lead="Программы комбинируются между собой: склад дружит с кассой, касса — с POS-системой, а GPS и CallMi закрывают доставку и звонки."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 80}>
              <article className={`card-mi group flex h-full flex-col p-5 ${i % 2 ? "card-squish-alt" : "card-squish"}`}>
                <div className="flex min-h-[22px] flex-wrap gap-1.5">
                  {p.badges.map((b) => (
                    <span key={b} className={`badge ${BADGE_CLASS[b]}`}>
                      {BADGE_LABELS[b]}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 text-accent">
                  <Icon name={p.icon} className="prod-ico h-5 w-5" />
                  <span className="num text-[11px] font-medium uppercase tracking-[0.14em] text-muted">{p.cat}</span>
                </div>
                <h3 className="mt-2.5 text-[16px] font-bold leading-snug">{p.name}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{p.desc}</p>
                <ul className="mt-3 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12.5px] leading-snug text-snow/80">
                      <Icon name="plus" className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-baseline gap-2 border-t border-line/70 pt-4">
                  <span className="num text-[19px] font-bold text-limedeep">от {fmt(p.price)} BYN</span>
                  {p.oldPrice && <span className="num text-[13px] text-muted line-through">{fmt(p.oldPrice)}</span>}
                </div>
                <div className="num mt-1 text-[10.5px] tracking-[0.12em] text-muted/70">SKU: {p.sku}</div>
                <button
                  type="button"
                  onClick={onCalc}
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-all hover:gap-2.5 hover:text-limedeep"
                >
                  Добавить в расчёт
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Оборудование и комплекты ================= */

export function Equipment({ onNote }: { onNote: (text: string) => void }) {
  return (
    <section id="oborudovanie" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <SectionHead
          num="05"
          eyebrow="Оборудование"
          title={
            <>
              КСА, сканеры, весы, POS — <span className="text-accent">со склада в Минске</span>
            </>
          }
          lead="Подбираем оборудование под задачи, а не под складские остатки. Гарантия и сервис — через нас, в одном окне."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {EQUIP_CATS.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <article className={`card-mi group flex h-full flex-col p-5 ${i % 2 ? "card-squish-alt" : "card-squish"}`}>
                <Icon name={c.icon} className="prod-ico h-7 w-7 text-accent" />
                <h3 className="mt-3.5 flex-1 text-[14.5px] font-bold leading-snug">{c.title}</h3>
                <div className="num mt-4 text-[12px] text-muted">
                  {c.models} моделей · от <span className="font-bold text-limedeep">{fmt(c.from)} BYN</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Комплекты */}
        <div id="komplekty" className="mt-16 scroll-mt-24">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h3 className="text-[24px] font-bold tracking-tight md:text-[28px]">
                Готовые комплекты <span className="text-muted">«под ключ»</span>
              </h3>
              <span className="num hidden text-[12px] uppercase tracking-[0.18em] text-muted sm:block">
                ПО + оборудование + запуск
              </span>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {BUNDLES.map((b, i) => (
              <Reveal key={b.id} delay={i * 100}>
                <article
                  className={`card-mi relative flex h-full flex-col p-6 ${i % 2 ? "card-squish-alt" : "card-squish"} ${
                    b.accent ? "border-accent/50 shadow-[0_0_0_1px_rgba(14,116,144,0.18),0_20px_50px_-25px_rgba(14,116,144,0.4)]" : ""
                  }`}
                >
                  {b.accent && (
                    <span className="badge badge-new absolute -top-3 left-6">Популярно у кафе</span>
                  )}
                  <h4 className="text-[19px] font-bold">{b.name}</h4>
                  <p className="num mt-1 text-[12px] uppercase tracking-[0.12em] text-muted">{b.audience}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {b.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-[14px] leading-snug text-snow/90">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="num mt-6 text-[28px] font-bold text-lime">
                    {b.price} <span className="text-[15px] font-medium text-muted">BYN</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNote(`Запрос КП: комплект ${b.name} (${b.audience}).`)}
                    className="btn btn-secondary btn-sm mt-4 w-full"
                  >
                    Запросить состав и КП
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
