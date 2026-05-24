"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Category = "Összes" | "Általános" | "Telepítés & Eszközök" | "Árképzés" | "Próbaidőszak";

interface FAQItem {
  question: string;
  answer: string;
  category: Exclude<Category, "Összes">;
}

const faqs: FAQItem[] = [
  {
    category: "Általános",
    question: "Ez biztos nagyon bonyolult — én nem értek a számítógépekhez. Nekem való ez egyáltalán?",
    answer: "Pont ezért létezik a DOOMester. Te semmit nem konfigurálsz, semmit nem programozol — én elvégzem az egészet. Amit te kapsz: egy letisztult felületet a telefonodon, ahol gombokkal és magyar hangutasításokkal vezérelhetsz mindent. Ha tudod használni az okostelefont, tudod használni az okosotthont is.",
  },
  {
    category: "Általános",
    question: "A párom is tudja majd használni? Nem akarok én lenni az egyetlen \"mérnök\" a háznál.",
    answer: "Ez az egyik legfontosabb tervezési elv. Minden egyes rendszert úgy állítok be, hogy a legkevésbé tech-barátos családtag is kényelmesen tudja használni. Külön felhasználói fiókok, egyszerű felület, és — ami talán a legfontosabb — a fizikai kapcsolók sem tűnnek el. Ha lefagy valami (ami ritka, de előfordulhat), a hagyományos kapcsoló ugyanúgy működik.",
  },
  {
    category: "Általános",
    question: "Mennyibe kerül havonta? Vannak rejtett költségek?",
    answer: "A Home Assistant szoftver ingyenes — örökre. Nincs havidíj, nincs előfizetés, nincs prémium csomag. Csak az eszközökért fizetsz (izzók, érzékelők, kapumodul), és opcionálisan a Nabu Casa felhőszolgáltatásért (~3 000 Ft/hó), ami a kényelmes távoli elérést biztosítja. Nélküle is minden működik — csak távolról nem éred el. A DOOMester egyszeri telepítési díjért elvégez mindent, a karbantartás pedig igény szerinti csomag.",
  },
  {
    category: "Telepítés & Eszközök",
    question: "Mennyi ideig tart a beüzemelés? Napokra megbénítja a lakást?",
    answer: "Egy átlagos rendszer (10–15 eszköz) telepítése 1–2 nap. A meglévő kapcsolóid, eszközeid az egész idő alatt működnek — az okosítás fokozatos, nem kell leállítani az életet. Az alap rendszer maga 15–30 perc alatt feláll, a többi az eszközök és az automatizálások beállítása.",
  },
  {
    category: "Telepítés & Eszközök",
    question: "Működik a meglévő okoseszközeimmel? Vagy mindent újat kell vennem?",
    answer: "Szinte biztosan igen. Ahogy szokták mondani: „Amelyik eszköz nem integrálható a HA-ba, az nem is létezik.\" A Home Assistant több ezer gyártó eszközét ismeri. Ha van okosizzód, okosklímád, okos kapunyitód — az szinte biztosan integrálható. Én felmérem a meglévő eszközparkodat, és megmondom mi használható és mi nem — mielőtt bármit vennénk.",
  },
  {
    category: "Telepítés & Eszközök",
    question: "Mi kell a rendszerhez hardver szempontjából?",
    answer: "Az alaprendszer egy Raspberry Pi 4 vagy egy kis NUC mini PC — körülbelül 30-50 ezer forint értékű hardver. Erre települ a Home Assistant, ami ingyenes. Az okoseszközöket (izzók, kapcsolók, érzékelők) fokozatosan lehet bővíteni — nem kell egyszerre mindent megvenni. Én javaslom a legjobb ár/érték arányú eszközöket, és beüzemelem őket.",
  },
  {
    category: "Árképzés",
    question: "Mibe kerül a DOOMester szolgáltatás?",
    answer: "Az ár az igényektől függ: egy alaprendszer (5–10 eszköz, alapautomatizálások) olcsóbb, mint egy komplex, 30+ eszközös rendszer. Pontos árat az ingyenes konzultáció után tudok mondani, amikor felmértük az igényeidet. Nincs rejtett díj: egyszeri telepítési díj, opcionálisan havi karbantartási csomag ha szeretnéd, hogy folyamatosan figyeljem a rendszert.",
  },
  {
    category: "Árképzés",
    question: "Mikor térül meg a befektetés?",
    answer: "Egy átlagos háztartásban az energiamegtakarítás (fűtés, hűtés, világítás optimalizálása) évi 40.000–100.000 forint. A rendszer költségétől és a megtakarítástól függően ez általában 2–4 év alatt megtérül — utána tiszta nyereség. Az időmegtakarítás és a kényelem nem számolható pénzben.",
  },
  {
    category: "Próbaidőszak",
    question: "Mi van, ha mégsem tetszik? Visszaállítható az eredeti állapot?",
    answer: "Igen. A Home Assistant telepítése nem érinti a meglévő eszközöket — azok a beüzemelés előtti módon is működnek tovább. Ha valamiért vissza szeretnéd állítani az eredeti állapotot, az elvégezhető. A gyakorlatban erre még nem volt példa — de a lehetőség adott.",
  },
  {
    category: "Próbaidőszak",
    question: "Van garancia? Mi van ha elromlik valami?",
    answer: "Igen. A telepítés után 30 napig ingyenesen javítom a rendszerrel kapcsolatos problémákat. Ezt követően opcionálisan igénybe vehető karbantartási csomag, amiben távolról figyelem a rendszert és értesítelek, ha valami nem stimmel — mielőtt te észrevennéd. A hardvereszközökhöz gyártói garancia jár.",
  },
];

const categories: Category[] = ["Összes", "Általános", "Telepítés & Eszközök", "Árképzés", "Próbaidőszak"];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<Category>("Összes");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = faqs.filter(
    (f) => activeCategory === "Összes" || f.category === activeCategory
  );

  return (
    <section id="faq" className="container-custom py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label mb-4">Kérdések</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-cream tracking-tight leading-[1.25] mb-8 pb-1 font-manrope">
          Amit mindenki megkérdez
        </h2>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`text-xs font-bold tracking-[0.06em] uppercase px-4 py-2 rounded-lg transition-all font-syne ${
                activeCategory === cat
                  ? "bg-amber-dim border border-amber-border text-amber-accent"
                  : "bg-dark-card border border-card-border text-cream-muted hover:text-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="max-w-3xl space-y-2">
          {filtered.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-dark-card border border-card-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                <span className="text-base font-bold text-cream font-syne leading-snug flex-1">
                  {faq.question}
                </span>
                <span className={`text-amber-accent flex-shrink-0 transition-transform duration-200 mt-0.5 ${openIndex === i ? "rotate-180" : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-cream-muted font-lora text-base leading-relaxed border-t border-card-border pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
