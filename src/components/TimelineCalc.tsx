import { useState, type CSSProperties } from "react";
import { Icon } from "./Icons";
import {
  BIZ_TYPES,
  CLOUD_MONTHLY,
  EQUIP_ITEMS,
  LAUNCH_FEE,
  MAX_POINTS,
  MIN_POINTS,
  SUPPORT_MONTHLY,
  TIMELINE,
  pointsDiscount,
  type BizId,
} from "../data";
import { fmt, Reveal, SectionHead, useAnimatedNumber } from "../lib";

/* ================= Таймлайн «Запуск за 7 дней» ================= */

export function Timeline() {
  return (
    <section id="zapusk" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <SectionHead
          num="06"
          eyebrow="Регламент внедрения"
          title={
            <>
              Запуск за <span className="text-accent">7 рабочих дней</span> — по дням
            </>
          }
          lead="От заявки до первого чека. Каждый день — конкретный результат, который вы видите."
        />

        <div className="relative">
          <div className="absolute left-[11px] top-2 hidden h-px w-full bg-gradient-to-r from-accent/60 via-line to-line lg:block" aria-hidden="true" />
          <div className="grid gap-8 lg:grid-cols-7 lg:gap-5">
            {TIMELINE.map((s, i) => (
              <Reveal key={s.day} delay={i * 80}>
                <div className="group relative flex gap-5 lg:block">
                  {/* вертикальная линия на мобильных */}
                  {i !== TIMELINE.length - 1 && (
                    <span className="absolute left-[11px] top-6 h-full w-px bg-line lg:hidden" aria-hidden="true" />
                  )}
                  <span className="relative z-10 mt-1 h-[23px] w-[23px] shrink-0 rounded-full border-2 border-accent bg-ink transition-all duration-300 group-hover:border-lime group-hover:shadow-[0_0_16px_rgba(163,230,53,0.45)] lg:mb-4">
                    <span className="absolute inset-[5px] rounded-full bg-accent transition-colors group-hover:bg-lime" />
                  </span>
                  <div>
                    <span className="num text-[11px] font-bold uppercase tracking-[0.16em] text-accent">{s.day}</span>
                    <h3 className="mt-1.5 text-[15.5px] font-bold leading-snug">{s.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200}>
          <div className="num mt-12 inline-flex items-center gap-2.5 rounded-[10px] border border-lime/50 bg-lime/12 px-4 py-2.5 text-[13px] font-medium text-limedeep">
            <Icon name="zap" className="h-4 w-4" />
            Средний фактический запуск — 7 дней. Сложные сети — 2–3 недели по графику.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Калькулятор ================= */

interface CalcProps {
  bizType: BizId;
  setBizType: (b: BizId) => void;
  onSend: (note: string) => void;
}

export function Calculator({ bizType, setBizType, onSend }: CalcProps) {
  const [points, setPoints] = useState(1);
  const [equip, setEquip] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    EQUIP_ITEMS.forEach((e) => (init[e.id] = !!e.onByDefault));
    return init;
  });
  const [launch, setLaunch] = useState(true);

  const biz = BIZ_TYPES.find((b) => b.id === bizType) ?? BIZ_TYPES[0];
  const disc = pointsDiscount(points);
  const softGross = biz.base * points;
  const softNet = Math.round(softGross * (1 - disc));
  const equipPerPoint = EQUIP_ITEMS.filter((e) => equip[e.id]).reduce((s, e) => s + e.price, 0);
  const equipTotal = equipPerPoint * points;
  const launchTotal = launch ? LAUNCH_FEE * points : 0;
  const total = softNet + equipTotal + launchTotal;

  const cloud3 = points * CLOUD_MONTHLY * 36;
  const local3 = softNet + points * SUPPORT_MONTHLY * 36;
  const save = Math.round(cloud3 - local3);

  const shownTotal = useAnimatedNumber(total);
  const fill = `${((points - MIN_POINTS) / (MAX_POINTS - MIN_POINTS)) * 100}%`;

  const toggleEquip = (id: string) => setEquip((p) => ({ ...p, [id]: !p[id] }));

  const sendNote = () => {
    const lines = [
      `Расчёт с калькулятора microinvest.by:`,
      `• Бизнес: ${biz.label}, точек: ${points}`,
      `• ПО и лицензии: ${fmt(softNet)} BYN${disc ? ` (скидка ${Math.round(disc * 100)}%)` : ""}`,
      `• Оборудование: ${equipTotal ? `${fmt(equipTotal)} BYN` : "не выбрано"}`,
      `• Запуск и обучение: ${launchTotal ? `${fmt(launchTotal)} BYN` : "без запуска"}`,
      `• Итого под ключ: ≈ ${fmt(total)} BYN`,
    ];
    onSend(lines.join("\n"));
  };

  return (
    <section id="kalkulyator" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <SectionHead
          num="07"
          eyebrow="Калькулятор"
          title={
            <>
              Сколько стоит автоматизация — <span className="text-accent">узнайте за минуту</span>
            </>
          }
          lead="Формула открытая: базовый модуль под тип бизнеса × количество точек + оборудование. Скидка за сеть применяется автоматически."
        />

        <Reveal>
          <div className="grid overflow-hidden rounded-[14px] border border-line bg-panel lg:grid-cols-[1.08fr_0.92fr]">
            {/* ------- левая колонка: параметры ------- */}
            <div className="p-6 md:p-8">
              <div>
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="num text-[11px] font-bold uppercase tracking-[0.16em] text-accent">01</span>
                  <span className="text-[14px] font-semibold">Тип бизнеса</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {BIZ_TYPES.map((b) => {
                    const active = b.id === bizType;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBizType(b.id)}
                        aria-pressed={active}
                        className={`flex items-center gap-2.5 rounded-[12px] border px-3.5 py-3 text-left text-[13.5px] font-semibold transition-all duration-200 ${
                          active
                            ? "border-lime bg-lime/10 text-snow shadow-[0_0_20px_-6px_rgba(163,230,53,0.4)]"
                            : "border-line bg-surface/60 text-muted hover:border-accent/50 hover:text-snow"
                        }`}
                      >
                        <Icon name={b.icon} className={`h-5 w-5 shrink-0 ${active ? "text-lime" : "text-accent"}`} />
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="num text-[11px] font-bold uppercase tracking-[0.16em] text-accent">02</span>
                    <span className="text-[14px] font-semibold">Количество точек</span>
                  </div>
                  <span className="num rounded-[8px] border border-lime/50 bg-lime/12 px-3 py-1 text-[16px] font-bold text-limedeep">
                    {points}
                  </span>
                </div>
                <input
                  type="range"
                  min={MIN_POINTS}
                  max={MAX_POINTS}
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="range-mi"
                  style={{ "--fill": fill } as CSSProperties}
                  aria-label="Количество точек"
                />
                <div className="num mt-2 flex justify-between text-[11px] text-muted">
                  <span>1 точка</span>
                  <span className="font-medium text-limedeep">{disc > 0 ? `скидка за сеть −${Math.round(disc * 100)}%` : "5 точек — скидка 12%"}</span>
                  <span>{MAX_POINTS} точек</span>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="num text-[11px] font-bold uppercase tracking-[0.16em] text-accent">03</span>
                  <span className="text-[14px] font-semibold">Оборудование на точку</span>
                </div>
                <div className="space-y-2.5">
                  {EQUIP_ITEMS.map((e) => {
                    const on = !!equip[e.id];
                    return (
                      <label
                        key={e.id}
                        className={`flex cursor-pointer items-center gap-3.5 rounded-[12px] border px-4 py-3 transition-all duration-200 ${
                          on ? "border-accent/55 bg-accent/[0.07]" : "border-line bg-surface/60 hover:border-accent/35"
                        }`}
                      >
                        <input type="checkbox" checked={on} onChange={() => toggleEquip(e.id)} className="sr-only" />
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-all duration-200 ${
                            on ? "border-lime bg-lime" : "border-line bg-ink"
                          }`}
                        >
                          <Icon name="check" className={`h-3 w-3 text-ink transition-opacity ${on ? "opacity-100" : "opacity-0"}`} />
                        </span>
                        <Icon name={e.icon} className={`h-5 w-5 shrink-0 ${on ? "text-accent" : "text-muted"}`} />
                        <span className={`flex-1 text-[14px] font-medium ${on ? "text-snow" : "text-muted"}`}>{e.label}</span>
                        <span className="num text-[13px] font-semibold text-limedeep">+{fmt(e.price)} BYN</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  role="switch"
                  aria-checked={launch}
                  onClick={() => setLaunch(!launch)}
                  className="flex w-full items-center justify-between rounded-[12px] border border-line bg-surface/60 px-4 py-3.5 transition-colors hover:border-accent/40"
                >
                  <span className="flex items-center gap-3 text-left">
                    <Icon name="headset" className={`h-5 w-5 ${launch ? "text-accent" : "text-muted"}`} />
                    <span>
                      <span className="block text-[14px] font-semibold text-snow">Запуск и обучение персонала</span>
                      <span className="num block text-[12px] text-muted">настройка + обучение · {fmt(LAUNCH_FEE)} BYN/точка</span>
                    </span>
                  </span>
                  <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${launch ? "bg-lime" : "bg-line"}`}>
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(15,23,42,0.35)] transition-all duration-300 ${
                        launch ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* ------- правая колонка: итог ------- */}
            <div className="inset-dark border-t border-line p-6 font-mono md:p-8 lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted">
                <span>Предварительный расчёт</span>
                <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-ok" />
              </div>

              <div className="mt-6 space-y-3.5 text-[13.5px]">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-muted">
                    ПО «Микроинвест» · {points} × {fmt(biz.base)}
                  </span>
                  <span className="num text-right font-medium text-snow">
                    {fmt(softNet)}
                    {disc > 0 && (
                      <>
                        {" "}
                        <span className="text-muted line-through">{fmt(softGross)}</span>{" "}
                        <span className="text-lime">−{Math.round(disc * 100)}%</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-muted">Оборудование · {points} {points === 1 ? "точка" : points < 5 ? "точки" : "точек"}</span>
                  <span className={`num text-right font-medium ${equipTotal ? "text-snow" : "text-muted/60"}`}>
                    {equipTotal ? fmt(equipTotal) : "—"}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-muted">Запуск и обучение</span>
                  <span className={`num text-right font-medium ${launchTotal ? "text-snow" : "text-muted/60"}`}>
                    {launchTotal ? fmt(launchTotal) : "—"}
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-dashed border-line" />

              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[13px] uppercase tracking-[0.14em] text-muted">Итого под ключ</span>
                <span className="num text-[32px] font-bold leading-none text-lime">
                  ≈ {fmt(shownTotal)} <span className="text-[16px] font-medium text-muted">BYN</span>
                </span>
              </div>

              <div className="mt-6 space-y-2 rounded-[10px] border border-line bg-panel/70 p-4 text-[12px] leading-relaxed text-muted">
                <p>
                  Поддержка — по желанию: <span className="num text-snow">{SUPPORT_MONTHLY} BYN/мес</span> за точку. Без неё система
                  продолжает работать.
                </p>
                <p className="flex flex-wrap items-center gap-2">
                  Облачная подписка за 3 года: <span className="num text-snow">{fmt(cloud3)} BYN</span>
                  {save > 0 ? (
                    <span className="num rounded-[6px] border border-ok/35 bg-ok/10 px-2 py-0.5 font-bold text-ok">
                      выгода {fmt(save)} BYN
                    </span>
                  ) : (
                    <span className="rounded-[6px] border border-viola/35 bg-viola/10 px-2 py-0.5 text-viola">
                      зато лицензия и данные — ваши навсегда
                    </span>
                  )}
                </p>
              </div>

              <button type="button" onClick={sendNote} className="btn btn-primary mt-6 w-full">
                <Icon name="send" className="h-[18px] w-[18px]" />
                Отправить заявку с расчётом
              </button>
              <p className="mt-3 text-center text-[11.5px] text-muted/80">
                Расчёт ориентировочный, в BYN. Точное КП — после 30-минутного брифа.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
