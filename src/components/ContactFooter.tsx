import { useEffect, useState, type FormEvent } from "react";
import { Icon, LogoMark, type IconName } from "./Icons";
import { BIZ_TYPES, CONTACTS, NICHES, PRODUCTS } from "../data";
import { Reveal, scrollToId } from "../lib";

/* ================= Мессенджеры ================= */

const MESSENGERS: { name: string; icon: IconName; href: string; color: string }[] = [
  { name: "Viber", icon: "viber", href: CONTACTS.viber, color: "hover:border-[#7360F2] hover:text-[#a99df7]" },
  { name: "Telegram", icon: "send", href: CONTACTS.telegram, color: "hover:border-accent hover:text-accent" },
  { name: "WhatsApp", icon: "whatsapp", href: CONTACTS.whatsapp, color: "hover:border-[#25D366] hover:text-[#5fe08f]" },
];

function MessengerRow({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "" : "mt-7"}`}>
      {MESSENGERS.map((m) => (
        <a
          key={m.name}
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2.5 rounded-[12px] border border-line bg-panel px-4 py-2.5 text-[14px] font-semibold text-muted transition-all duration-200 hover:-translate-y-0.5 ${m.color}`}
        >
          <Icon name={m.icon} className="h-[18px] w-[18px]" />
          {m.name}
        </a>
      ))}
    </div>
  );
}

/* ================= Финальный CTA с формой ================= */

type FormStatus = "idle" | "sending" | "done";

export function ContactCta({ calcNote }: { calcNote: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [biz, setBiz] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    if (calcNote) setMessage(calcNote);
  }, [calcNote]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) next.phone = "Укажите корректный номер телефона";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 900);
  };

  return (
    <section id="kontakty" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="grid overflow-hidden rounded-[14px] border border-line bg-panel lg:grid-cols-2">
          {/* левая часть */}
          <div className="relative p-7 md:p-10">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
            <Reveal>
              <div className="eyebrow">
                <span className="text-line">//</span> 11 · Контакты
              </div>
              <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight md:text-[34px]">
                Обсудим ваш проект <span className="text-accent">на этой неделе?</span>
              </h2>
              <p className="mt-4 max-w-[440px] text-[15.5px] leading-relaxed text-muted">
                Оставьте заявку — за 30 минут созвона разберём процессы и назовём точную стоимость.
                Без «менеджер вам перезвонит через три дня».
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 space-y-4">
                <a href={CONTACTS.phoneHref} className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-accent/35 bg-accent/10 text-accent">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="num block text-[18px] font-bold text-snow transition-colors group-hover:text-accent">{CONTACTS.phone}</span>
                    <span className="block text-[12.5px] text-muted">звонок бесплатный по РБ</span>
                  </span>
                </a>
                <a href={`mailto:${CONTACTS.email}`} className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-viola/40 bg-viola/10 text-viola">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold text-snow transition-colors group-hover:text-viola">{CONTACTS.email}</span>
                    <span className="block text-[12.5px] text-muted">ответим в течение рабочего дня</span>
                  </span>
                </a>
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-lime/35 bg-lime/10 text-lime">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold">{CONTACTS.address}</span>
                    <span className="block text-[12.5px] text-muted">{CONTACTS.hours}</span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 border-t border-line pt-6">
                <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Удобнее в мессенджере?</div>
                <MessengerRow compact />
              </div>
            </Reveal>
          </div>

          {/* правая часть: форма */}
          <div className="border-t border-line bg-surface/60 p-7 md:p-10 lg:border-l lg:border-t-0">
            {status === "done" ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ok/40 bg-ok/12 text-ok">
                  <Icon name="check" className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-[22px] font-bold">Заявка принята</h3>
                <p className="mt-3 max-w-[320px] text-[14.5px] leading-relaxed text-muted">
                  Менеджер перезвонит в течение 30 минут в рабочее время. Если удобнее — напишите нам в мессенджер.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm mt-6"
                  onClick={() => {
                    setStatus("idle");
                    setName("");
                    setPhone("");
                    setMessage("");
                  }}
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 className="text-[19px] font-bold">Оставить заявку</h3>
                <p className="mt-1.5 text-[13px] text-muted">Если пришлёте расчёт из калькулятора — сразу приложим его к смете.</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="f-name" className="num mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Имя
                    </label>
                    <input
                      id="f-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться"
                      className={`field ${errors.name ? "has-error" : ""}`}
                    />
                    {errors.name && <p className="mt-1.5 text-[12.5px] font-medium text-err">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-phone" className="num mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Телефон
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+375 (29) 000-00-00"
                      className={`field ${errors.phone ? "has-error" : ""}`}
                    />
                    {errors.phone && <p className="mt-1.5 text-[12.5px] font-medium text-err">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-biz" className="num mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Тип бизнеса
                    </label>
                    <select id="f-biz" value={biz} onChange={(e) => setBiz(e.target.value)} className="field">
                      <option value="">Выберите из списка</option>
                      {BIZ_TYPES.map((b) => (
                        <option key={b.id} value={b.label}>
                          {b.label}
                        </option>
                      ))}
                      <option value="other">Другое / пока не определился</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="f-msg" className="num mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Комментарий
                    </label>
                    <textarea
                      id="f-msg"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Например: 2 магазина, нужен учёт и кассы, сейчас работаем в 1С"
                      rows={5}
                      className="field resize-none"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-6 w-full" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <span className="spinner" />
                      Отправляем…
                    </>
                  ) : (
                    <>
                      <Icon name="send" className="h-[18px] w-[18px]" />
                      Отправить заявку
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-[11.5px] leading-relaxed text-muted/80">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Политика (модальное окно) ================= */

function PolicyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(13,17,23,0.82)] p-5 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Политика конфиденциальности"
    >
      <div
        className="w-full max-w-[560px] rounded-[14px] border border-line bg-panel p-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[20px] font-bold">Политика конфиденциальности</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 space-y-4 text-[14px] leading-relaxed text-muted">
          <p>
            Мы обрабатываем только те персональные данные, которые вы указываете в формах на сайте: имя, телефон и содержание
            обращения. Данные используются исключительно для связи с вами по вашему запросу.
          </p>
          <p>
            Данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством Республики Беларусь,
            и хранятся на защищённых серверах на территории РБ.
          </p>
          <p>
            Вы можете запросить удаление своих данных в любой момент, написав на{" "}
            <a href={`mailto:${CONTACTS.email}`} className="font-medium text-accent hover:text-limehi">
              {CONTACTS.email}
            </a>
            .
          </p>
        </div>
        <button type="button" onClick={onClose} className="btn btn-secondary btn-sm mt-6 w-full">
          Понятно, закрыть
        </button>
      </div>
    </div>
  );
}

/* ================= Футер ================= */

export function Footer() {
  const [policyOpen, setPolicyOpen] = useState(false);

  return (
    <footer className="relative z-10 border-t border-line bg-[#0b0e13]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-9 w-9" />
              <span className="leading-none">
                <span className="block text-[16px] font-extrabold tracking-tight">микроинвест</span>
                <span className="num block text-[10.5px] font-medium tracking-[0.18em] text-accent">.BY / АВТОМАТИЗАЦИЯ</span>
              </span>
            </div>
            <p className="mt-4 max-w-[300px] text-[13.5px] leading-relaxed text-muted">
              Локальные системы автоматизации для торговли, общепита и услуг. Работаем в Беларуси с 2012 года — 480+ внедрений.
            </p>
            <MessengerRow />
          </div>

          <nav aria-label="Решения">
            <h4 className="num text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Решения</h4>
            <ul className="mt-4 space-y-2.5">
              {NICHES.map((n) => (
                <li key={n.id}>
                  <button type="button" onClick={() => scrollToId("resheniya")} className="text-[13.5px] text-snow/80 transition-colors hover:text-accent">
                    {n.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Продукты">
            <h4 className="num text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Продукты</h4>
            <ul className="mt-4 space-y-2.5">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => scrollToId("produkty")} className="text-left text-[13.5px] text-snow/80 transition-colors hover:text-accent">
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="num text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Контакты</h4>
            <ul className="mt-4 space-y-3 text-[13.5px]">
              <li>
                <a href={CONTACTS.phoneHref} className="num flex items-center gap-2.5 font-semibold text-snow transition-colors hover:text-accent">
                  <Icon name="phone" className="h-4 w-4 text-accent" />
                  {CONTACTS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-2.5 text-snow/80 transition-colors hover:text-accent">
                  <Icon name="mail" className="h-4 w-4 text-accent" />
                  {CONTACTS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {CONTACTS.address}
              </li>
              <li className="flex items-center gap-2.5 text-muted">
                <Icon name="clock" className="h-4 w-4 shrink-0 text-accent" />
                {CONTACTS.hours}
              </li>
              <li>
                <a
                  href={CONTACTS.kb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-accent transition-colors hover:text-limehi"
                >
                  <Icon name="doc" className="h-4 w-4" />
                  База знаний и инструкции
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="num text-[12px] text-muted">© 2012–2026 Микроинвест · Все цены указаны в белорусских рублях (BYN)</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px]">
            <button type="button" onClick={() => setPolicyOpen(true)} className="text-muted transition-colors hover:text-accent">
              Политика конфиденциальности
            </button>
            <a href={CONTACTS.developer} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted transition-colors hover:text-accent">
              Разработка — SofTeam
              <Icon name="arrow" className="h-3 w-3 -rotate-45" />
            </a>
          </div>
        </div>
      </div>

      {policyOpen && <PolicyModal onClose={() => setPolicyOpen(false)} />}
    </footer>
  );
}
