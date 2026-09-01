import { Barcode, Icon, type IconName } from "./Icons";
import ParticleField from "./Particles";
import { TICKER_ITEMS } from "../data";
import { Reveal, scrollToId } from "../lib";

/* ---------- «чек», который печатается на экране ---------- */

interface ReceiptLine {
  l: string;
  r?: string;
  strong?: boolean;
  lime?: boolean;
  dim?: boolean;
}

const RECEIPT: ReceiptLine[] = [
  { l: "Кофе американо ×2", r: "9.00" },
  { l: "Круассан миндальный", r: "6.50" },
  { l: "Сырники со сметаной", r: "8.20" },
  { l: "sep" },
  { l: "ПОДЫТОГ", r: "23.70" },
  { l: "СКИДКА ПО КАРТЕ", r: "−1.19", dim: true },
  { l: "ИТОГ", r: "22.51 BYN", strong: true, lime: true },
  { l: "НАЛИЧНЫЕ", r: "25.00" },
  { l: "СДАЧА", r: "2.49" },
  { l: "sep" },
];

const TRUST: { icon: IconName; label: string }[] = [
  { icon: "wifioff", label: "Офлайн-работа" },
  { icon: "key", label: "Локальная лицензия" },
  { icon: "shield", label: "Соответствие РБ" },
  { icon: "headset", label: "Поддержка 7 дней" },
];

function Receipt() {
  return (
    <div className="inset-dark relative mx-auto w-full max-w-[360px] rounded-[14px]">
      {/* свечение и фоновые слои */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute inset-0 rotate-6 rounded-[14px] border border-viola/25 bg-surface/60" aria-hidden="true" />
      <div className="absolute inset-0 -rotate-3 rounded-[14px] border border-accent/20 bg-panel/70" aria-hidden="true" />

      <div className="relative rotate-1 rounded-[14px] border border-line bg-[#0b0f14] p-6 font-mono text-[13px] leading-[1.9] text-snow/90 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:rotate-0">
        <div className="pline flex items-center justify-between text-[11px] tracking-[0.14em] text-muted" style={{ animationDelay: "0.2s" }}>
          <span>МИКРОИНВЕСТ · КАССА №1</span>
          <span>14:32</span>
        </div>
        <div className="pline my-2 border-t border-dashed border-line" style={{ animationDelay: "0.3s" }} />

        {RECEIPT.map((line, i) => {
          const delay = `${0.4 + i * 0.14}s`;
          if (line.l === "sep")
            return <div key={i} className="pline my-2 border-t border-dashed border-line" style={{ animationDelay: delay }} />;
          return (
            <div
              key={i}
              className={`pline flex items-baseline justify-between gap-3 ${
                line.strong ? "text-[15px] font-bold" : ""
              } ${line.lime ? "text-lime" : ""} ${line.dim ? "text-muted" : ""}`}
              style={{ animationDelay: delay }}
            >
              <span>{line.l}</span>
              {line.r && <span className="num">{line.r}</span>}
            </div>
          );
        })}

        <div className="pline mt-4 text-accent" style={{ animationDelay: "1.9s" }}>
          <Barcode className="h-10 w-full opacity-90" />
        </div>
        <div className="pline mt-3 flex items-center justify-between text-[10.5px] tracking-[0.12em] text-muted" style={{ animationDelay: "2.05s" }}>
          <span>ЧЕК №004217 · СКА: АКТИВНА</span>
          <span className="caret" aria-hidden="true" />
        </div>
        <div className="pline mt-4 flex items-center gap-2 rounded-[9px] border border-ok/35 bg-ok/10 px-3 py-2 text-[11px] font-medium tracking-wide text-ok" style={{ animationDelay: "2.2s" }}>
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-ok" />
          ОФЛАЙН-РЕЖИМ — ДАННЫЕ СОХРАНЕНЫ ЛОКАЛЬНО
        </div>
      </div>

      {/* плавающие чипы */}
      <div className="float-a absolute -left-4 top-8 hidden items-center gap-2 rounded-[10px] border border-line bg-panel px-3 py-2 text-[12px] font-medium text-snow shadow-xl sm:flex lg:-left-12">
        <Icon name="wifioff" className="h-4 w-4 text-accent" />
        Интернет не нужен
      </div>
      <div className="float-b absolute -right-2 bottom-24 hidden items-center gap-2 rounded-[10px] border border-line bg-panel px-3 py-2 text-[12px] font-medium text-snow shadow-xl sm:flex lg:-right-8">
        <Icon name="sync" className="h-4 w-4 text-viola" />
        Синхронизация при появлении сети
      </div>
    </div>
  );
}

/* ---------- бегущая строка ---------- */

function Ticker() {
  const row = (hidden: boolean) => (
    <div className="flex items-center" aria-hidden={hidden}>
      {TICKER_ITEMS.map((t) => (
        <span key={t} className="flex items-center whitespace-nowrap">
          <span className="num px-6 text-[12px] font-medium tracking-[0.18em] text-muted uppercase">{t}</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-accent/60" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="tick-wrap relative z-10 border-y border-line bg-panel/70 py-3.5">
      <div className="tick-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ---------- герой ---------- */

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <ParticleField className="z-0" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-14 px-5 pb-16 pt-12 md:px-8 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel px-4 py-2">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-ok" />
              <span className="num text-[11px] font-medium tracking-[0.2em] text-muted uppercase">
                Системы автоматизации · Республика Беларусь
              </span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 text-[36px] font-extrabold leading-[1.08] tracking-tight md:text-[48px]">
              Автоматизация торговли и общепита{" "}
              <span className="hl text-accent">без обязательных облачных подписок</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-muted">
              Локальные решения для магазинов, кафе, салонов и сервисных компаний в Беларуси.
              Работает без интернета. Соответствует требованиям РБ — от реестра КСА до СКНО.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" className="btn btn-primary" onClick={() => scrollToId("kalkulyator")}>
                <Icon name="calc" className="h-[18px] w-[18px]" />
                Рассчитать стоимость
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => scrollToId("sravnenie")}>
                Сравнить с облачными системами
                <Icon name="arrow" className="h-[18px] w-[18px]" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TRUST.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2.5 rounded-[12px] border border-line bg-panel/80 px-3 py-2.5 transition-colors hover:border-accent/50"
                >
                  <Icon name={t.icon} className="h-[18px] w-[18px] shrink-0 text-accent" />
                  <span className="text-[12.5px] font-semibold leading-tight">{t.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="num mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-muted">
              <span>
                <b className="text-snow">480+</b> внедрений
              </span>
              <span className="h-1 w-1 rounded-full bg-line" />
              <span>
                <b className="text-snow">12</b> лет на рынке
              </span>
              <span className="h-1 w-1 rounded-full bg-line" />
              <span>
                <b className="text-snow">7 дней</b> — средний запуск
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:justify-self-end">
          <Receipt />
        </Reveal>
      </div>

      <Ticker />
    </section>
  );
}
