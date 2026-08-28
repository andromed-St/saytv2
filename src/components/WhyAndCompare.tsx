import { Icon, type IconName } from "./Icons";
import { Reveal, SectionHead, scrollToId } from "../lib";

/* ================= Почему локальное решение ================= */

interface WhyCard {
  icon: IconName;
  title: string;
  text: string;
  metric: string;
  tone: "accent" | "lime" | "viola" | "ok";
}

const WHY: WhyCard[] = [
  {
    icon: "wifioff",
    title: "Не зависит от интернета",
    text: "Касса пробивает чеки, склад проводит накладные даже при полном отключении сети. Офлайн-очередь документов синхронизируется автоматически, как только связь появляется.",
    metric: "0 BYN потерь при сбое сети",
    tone: "accent",
  },
  {
    icon: "key",
    title: "Разовая лицензия, а не подписка",
    text: "Вы платите за систему один раз и пользуетесь бессрочно. Подписка на обновления и поддержку — по желанию: без неё система не «ломается» и продолжает работать.",
    metric: "−68% затрат на горизонте 3 лет",
    tone: "lime",
  },
  {
    icon: "db",
    title: "Данные принадлежат вам",
    text: "База живёт на вашем сервере или рабочей станции, а не на чужих облаках. Никакого vendor lock-in: выгрузка и перенос — в любой момент, без выкупа у вендора.",
    metric: "100% контроль базы и архивов",
    tone: "viola",
  },
  {
    icon: "shield",
    title: "Соответствие требованиям РБ",
    text: "Кассовые аппараты из реестра КСА, работа со СКНО и маркировкой товаров, накладные ТТН/ТН и ЭСЧФ. Комплект документов для проверок готовим вместе с внедрением.",
    metric: "Реестр КСА · СКНО · маркировка",
    tone: "ok",
  },
];

const TONES: Record<WhyCard["tone"], { box: string; chip: string }> = {
  accent: { box: "border-accent/35 bg-accent/10 text-accent", chip: "border-accent/30 bg-accent/8 text-accent" },
  lime: { box: "border-lime/35 bg-lime/10 text-lime", chip: "border-lime/30 bg-lime/8 text-lime" },
  viola: { box: "border-viola/40 bg-viola/10 text-viola", chip: "border-viola/35 bg-viola/8 text-viola" },
  ok: { box: "border-ok/35 bg-ok/10 text-ok", chip: "border-ok/30 bg-ok/8 text-ok" },
};

export function WhyLocal() {
  return (
    <section id="pochemu" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <SectionHead
          num="01"
          eyebrow="Почему локальное решение"
          title={
            <>
              Подписка — это аренда. <span className="text-accent">Лицензия — это актив</span>
            </>
          }
          lead="Облачные системы удобны, пока интернет стабилен, а вендор не поднял тариф. Локальная архитектура Microinvest забирает эти риски у бизнеса."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {WHY.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <article className="card-mi group flex h-full flex-col p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-[12px] border ${TONES[c.tone].box}`}>
                    <Icon name={c.icon} className="h-6 w-6" />
                  </span>
                  <span className="num text-[12px] text-line group-hover:text-accent/50 transition-colors">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-[19px] font-bold leading-snug">{c.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{c.text}</p>
                <div className={`num mt-5 inline-flex self-start rounded-[8px] border px-3 py-1.5 text-[12px] font-medium ${TONES[c.tone].chip}`}>
                  {c.metric}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Сравнительная таблица ================= */

interface Row {
  label: string;
  cloud: string;
  local: string;
}

const ROWS: Row[] = [
  { label: "Подключение к интернету", cloud: "Обязательно: нет сети — нет продаж", local: "Не обязательно: офлайн-режим" },
  { label: "Модель оплаты", cloud: "Подписка 40–120 BYN/мес за точку", local: "Разовая лицензия + поддержка по желанию" },
  { label: "Расход за 3 года (1 точка)", cloud: "≈ 4 320 BYN — и дальше каждый месяц", local: "≈ 2 400 BYN разово + поддержка" },
  { label: "Данные бизнеса", cloud: "На серверах вендора", local: "На вашем оборудовании" },
  { label: "Сбой сети", cloud: "Продажи останавливаются", local: "Продажи продолжаются" },
  { label: "Доработка под процессы", cloud: "В рамках возможностей вендора", local: "Под ваши сценарии работы" },
  { label: "Выбор оборудования", cloud: "Из списка вендора", local: "Любое совместимое оборудование" },
];

export function Compare() {
  return (
    <section id="sravnenie" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <SectionHead
          num="02"
          eyebrow="Сравнение"
          title={
            <>
              Локальная лицензия <span className="text-muted">или</span> облачная подписка
            </>
          }
          lead="Честное сравнение по типовому магазину. Без названий конкурентов — только модели владения системой."
        />

        <Reveal>
          <div className="overflow-hidden rounded-[14px] border border-line bg-panel">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th className="px-6 py-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Критерий</th>
                    <th className="px-6 py-5">
                      <span className="text-[15px] font-bold text-muted">Облачная подписка</span>
                      <span className="mt-1 block text-[12px] font-normal text-muted/70">аренда системы</span>
                    </th>
                    <th className="border-x border-accent/25 bg-accent/[0.06] px-6 py-5">
                      <span className="flex items-center gap-2 text-[15px] font-bold text-snow">
                        Локальная лицензия
                        <span className="badge badge-hit">Microinvest</span>
                      </span>
                      <span className="mt-1 block text-[12px] font-normal text-muted">система — ваша собственность</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r, i) => (
                    <tr key={r.label} className={`transition-colors hover:bg-surface/60 ${i !== ROWS.length - 1 ? "border-b border-line/70" : ""}`}>
                      <td className="px-6 py-4 text-[14px] font-semibold text-snow">{r.label}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-start gap-2.5">
                          <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0 text-err/80" />
                          <span className="text-[14px] leading-snug text-muted">{r.cloud}</span>
                        </span>
                      </td>
                      <td className="border-x border-accent/25 bg-accent/[0.06] px-6 py-4">
                        <span className="flex items-start gap-2.5">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                          <span className="text-[14px] font-medium leading-snug text-snow">{r.local}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-surface/50 px-6 py-4">
              <p className="text-[13px] text-muted">
                Расчёт для одной торговой точки при подписке <span className="num text-snow">120 BYN/мес</span>. Цифры уточним под ваш сценарий.
              </p>
              <button type="button" onClick={() => scrollToId("kalkulyator")} className="btn btn-secondary btn-sm">
                Посчитать под себя
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
