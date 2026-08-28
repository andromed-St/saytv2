import { useEffect, useState } from "react";
import { Icon, LogoMark } from "./Icons";
import { CONTACTS, NICHES, PRODUCTS } from "../data";
import { scrollToId } from "../lib";

interface NavChild {
  label: string;
  target: string;
}
interface NavItem {
  label: string;
  target?: string;
  external?: string;
  children?: NavChild[];
}

const NAV: NavItem[] = [
  {
    label: "Решения",
    target: "resheniya",
    children: NICHES.map((n) => ({ label: n.title, target: "resheniya" })),
  },
  {
    label: "Продукты",
    target: "produkty",
    children: PRODUCTS.map((p) => ({ label: p.name, target: "produkty" })),
  },
  { label: "Оборудование", target: "oborudovanie" },
  { label: "Комплекты", target: "komplekty" },
  { label: "Калькулятор", target: "kalkulyator" },
  { label: "Кейсы", target: "keysy" },
  { label: "База знаний", external: CONTACTS.kb },
  { label: "Контакты", target: "kontakty" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (target?: string, external?: string) => {
    setOpen(false);
    setOpenGroup(null);
    if (external) {
      window.open(external, "_blank", "noopener,noreferrer");
      return;
    }
    if (target) scrollToId(target);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-[rgba(13,17,23,0.92)] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
          {/* Логотип */}
          <a
            href="#verh"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
            }}
            className="flex items-center gap-3"
            aria-label="Микроинвест — на главную"
          >
            <LogoMark className="h-9 w-9" />
            <span className="leading-none">
              <span className="block text-[17px] font-extrabold tracking-tight">микроинвест</span>
              <span className="num block text-[11px] font-medium tracking-[0.18em] text-accent">.BY / АВТОМАТИЗАЦИЯ</span>
            </span>
          </a>

          {/* Десктоп-меню */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основное меню">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    onClick={() => go(item.target)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-medium text-muted transition-colors hover:bg-surface hover:text-snow"
                  >
                    {item.label}
                    <Icon name="chevron" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full z-50 min-w-[240px] translate-y-1 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="border border-line bg-panel p-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)] rounded-[12px]">
                      {item.children.map((c) => (
                        <button
                          key={c.label}
                          type="button"
                          onClick={() => go(c.target)}
                          className="block w-full rounded-lg px-3 py-2 text-left text-[13.5px] text-muted transition-colors hover:bg-surface hover:text-accent"
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => go(item.target, item.external)}
                  className={`rounded-lg px-3 py-2 text-[14px] font-medium transition-colors hover:bg-surface hover:text-snow ${
                    item.label === "Калькулятор" ? "text-accent" : "text-muted"
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CONTACTS.phoneHref}
              className="num hidden items-center gap-2 text-[14px] font-semibold text-snow transition-colors hover:text-accent xl:flex"
            >
              <Icon name="phone" className="h-4 w-4 text-accent" />
              {CONTACTS.phone}
            </a>
            <button type="button" onClick={() => go("kalkulyator")} className="btn btn-primary btn-sm hidden sm:inline-flex">
              Рассчитать
            </button>
            {/* Бургер */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-snow transition-colors hover:border-accent lg:hidden"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
            >
              <Icon name={open ? "close" : "burger"} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-[rgba(13,17,23,0.98)] backdrop-blur-lg transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[560px] space-y-6 px-6 py-8">
          {NAV.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between text-[15px] font-bold text-snow"
                  >
                    {item.label}
                    <Icon
                      name="chevron"
                      className={`h-4 w-4 text-accent transition-transform duration-300 ${openGroup === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      openGroup === item.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <button
                        type="button"
                        onClick={() => go(item.target)}
                        className="mt-2 block w-full rounded-lg bg-surface px-3 py-2 text-left text-[13.5px] font-medium text-accent"
                      >
                        Все «{item.label.toLowerCase()}» →
                      </button>
                      {item.children.map((c) => (
                        <button
                          key={c.label}
                          type="button"
                          onClick={() => go(c.target)}
                          className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-[13.5px] text-muted hover:bg-surface hover:text-snow"
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => go(item.target, item.external)}
                  className="flex w-full items-center justify-between text-[15px] font-bold text-snow"
                >
                  {item.label}
                  {item.external && <Icon name="arrow" className="h-4 w-4 -rotate-45 text-accent" />}
                </button>
              )}
            </div>
          ))}
          <div className="border-t border-line pt-6">
            <a href={CONTACTS.phoneHref} className="num flex items-center gap-2 text-lg font-bold text-snow">
              <Icon name="phone" className="h-5 w-5 text-accent" />
              {CONTACTS.phone}
            </a>
            <button type="button" onClick={() => go("kalkulyator")} className="btn btn-primary mt-5 w-full">
              Рассчитать стоимость
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
