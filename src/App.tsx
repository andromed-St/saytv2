import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Compare, WhyLocal } from "./components/WhyAndCompare";
import { Equipment, Niches, Products } from "./components/Solutions";
import { Calculator, Timeline } from "./components/TimelineCalc";
import { Cases, Faq, Reviews } from "./components/Proof";
import { ContactCta, Footer } from "./components/ContactFooter";
import { Icon } from "./components/Icons";
import { scrollToId } from "./lib";
import type { BizId } from "./data";

export default function App() {
  const [bizType, setBizType] = useState<BizId>("magazin");
  const [calcNote, setCalcNote] = useState("");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* выбор ниши → калькулятор с предустановленным типом бизнеса */
  const pickNiche = (id: BizId) => {
    setBizType(id);
    scrollToId("kalkulyator");
  };

  /* расчёт / запрос КП → форма заявки с готовым текстом */
  const sendNote = (note: string) => {
    setCalcNote(note);
    scrollToId("kontakty");
  };

  return (
    <div id="verh" className="relative min-h-screen">
      <div className="bg-grid" aria-hidden="true" />

      <Header />

      <main className="relative z-10">
        <Hero />
        <WhyLocal />
        <Compare />
        <Niches onPick={pickNiche} />
        <Products onCalc={() => scrollToId("kalkulyator")} />
        <Equipment onNote={sendNote} />
        <Timeline />
        <Calculator bizType={bizType} setBizType={setBizType} onSend={sendNote} />
        <Cases />
        <Reviews />
        <Faq />
        <ContactCta calcNote={calcNote} />
      </main>

      <Footer />

      {/* кнопка «наверх» */}
      <button
        type="button"
        onClick={() => scrollToId("verh")}
        aria-label="Наверх"
        className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-[12px] border border-line bg-panel text-accent shadow-[0_12px_30px_-14px_rgba(15,23,42,0.45)] transition-all duration-300 hover:border-accent hover:text-limedeep ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <Icon name="arrow" className="h-5 w-5 -rotate-90" />
      </button>
    </div>
  );
}
