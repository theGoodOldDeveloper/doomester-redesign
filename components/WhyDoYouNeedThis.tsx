"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionModal from "./SectionModal";

interface Card {
  icon: string;
  title: string;
  bullets: string[];
  modalTitle: string;
  modalContent: React.ReactNode;
}

const cards: Card[] = [
  {
    icon: "📱",
    title: "5 app helyett 1 — végre.",
    bullets: [
      "Okosizzó, klíma, kapu, kamera — mind külön appban él a telefonodon",
      "Ha elmegy a net, az összes gyári \"okos\" cucc azonnal ostobává válik",
      "A DOOMester rendszer mindet egyetlen felületre hozza — internettel és anélkül is",
    ],
    modalTitle: "5 app helyett 1 — végre.",
    modalContent: (
      <>
        <p>
          Emlékszel a régi videózós napokra? VHS, DVD, műholdvevő, HI-FI torony — 5 távirányító
          a dohányzóasztalon. Az okosotthon-ipar ezt a fejlődést hozta el: izzó app, klíma app,
          kapu app, kamera app, locsoló app... és ha épp nem tölt a telefon, az ember áll és bámul.
        </p>
        <p>
          A DOOMester rendszer ezt az ipart söpri le az asztalról. Egyetlen alkalmazás, ahol az
          összes eszközöd egymással is kommunikál — és ami a legfontosabb: teljesen önállóan
          működik az internet kiesése esetén is. A villany kapcsol, a kapu nyit, az automatizálások
          futnak. Mert a rendszer nem valahol egy felhőben lakik, hanem a te otthonodban, egy kis dobozban.
        </p>
      </>
    ),
  },
  {
    icon: "🤝",
    title: "Én elvégzek mindent — Te csak élvezed",
    bullets: [
      "Tervezés, telepítés, beállítás, automatizálások — az én feladatom, nem a tiéd",
      "Egy letisztult felületet kapsz, amit a párod is örömmel használ (tesztelve! 😄)",
      "Utána sem hagylak magadra: távolról figyelem, ha valami nem stimmel, jelzem",
    ],
    modalTitle: "Én elvégzek mindent — Te csak élvezed",
    modalContent: (
      <>
        <p>
          A DOOMester nem egy csináld-magad készlet. Tudom, hogy az okosotthon fogalma sokakban
          azt a képet kelti, hogy hónapokig kell YouTube-videókat nézni, és minden második hétvégén
          valami nem működik. Ez a fordítottja annak, amit én kínálok.
        </p>
        <p>
          A folyamat egyszerű: felmérjük az igényeidet, megtervezzük a rendszert, én beüzemelem
          — a rendszer méretétől függően néhány nap alatt — te pedig másnap reggel arra ébredsz,
          hogy a fűtés már kellemes meleg, mire a fürdőszobába érsz. Onnantól én figyelem a rendszert
          távolról, és ha valami elromlik vagy bővíteni szeretnéd, szólok. Referencia otthon is van:
          nálam minden eszköz élesben fut, nem dobozból mutatom meg, hanem saját bőrömön tapasztalva ajánlom.
        </p>
      </>
    ),
  },
  {
    icon: "🔒",
    title: "Az adataid itthon maradnak",
    bullets: [
      "Az Amazon Alexa, Google Home minden szokásodat feltölti a saját szervereikre",
      "A DOOMester rendszer a te otthonodban fut — senki nem elemez, senki nem figyel",
      "Nincs felhő amitől függsz, nincs gyártó aki lekapcsolhatja az eszközödet",
    ],
    modalTitle: "Az adataid itthon maradnak",
    modalContent: (
      <>
        <p>
          Gondoltál már bele, hogy az Alexa vagy a Google Home pontosan tudja mikor kelsz fel,
          mikor mész el otthonról, mikor fekszel le, hány fokra állítod be a klímát, és mit mondasz
          a hangszóróba? Ez az adat nem enyészik el — feldolgozzák, elemzik, és felhasználják.
        </p>
        <p>
          A Home Assistant rendszer ezzel szemben helyi rendszer: minden adat, minden parancs,
          minden automatizálás a saját gépeden fut. Nem függ senki más szerverétől, nem szűnik
          meg ha a gyártó csődbe megy, és nem lesz drágább mert bevezet egy új előfizetési modellt.
          A rendszer a tied — örökre.
        </p>
      </>
    ),
  },
];

export default function WhyDoYouNeedThis() {
  const [openModal, setOpenModal] = useState<number | null>(null);

  return (
    <section id="miert" className="container-custom py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label mb-4">Miért kell ez neked</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-cream tracking-tight leading-[1.25] mb-3 pb-1 font-manrope">
          Az okosotthon ígéret eddig nem teljesült
        </h2>
        <p className="font-lora italic text-cream-muted text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
          5 app, 5 távirányító, és ha lefagy az internet — semmi sem működik. A DOOMester rendszer ezeket söpri le az asztalról.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-dark-card border border-card-border rounded-2xl p-6 flex flex-col cursor-pointer hover:border-amber-border transition-colors group"
              onClick={() => setOpenModal(i)}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-dim border border-amber-border flex items-center justify-center text-xl mb-4 flex-shrink-0">
                {card.icon}
              </div>
              <h3 className="text-[15px] font-extrabold text-cream mb-3 font-manrope leading-snug group-hover:text-amber-accent transition-colors">
                {card.title}
              </h3>
              <ul className="space-y-2 flex-1 mb-4">
                {card.bullets.map((b, j) => (
                  <li key={j} className="text-sm text-cream-muted font-lora leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-1 text-amber-accent text-[10px] font-syne">→</span>
                    {b}
                  </li>
                ))}
              </ul>
              <span className="text-[11px] text-amber-accent font-bold tracking-[0.08em] uppercase font-syne">
                Részletek →
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {openModal !== null && (
        <SectionModal
          isOpen={true}
          onClose={() => setOpenModal(null)}
          title={cards[openModal].modalTitle}
        >
          {cards[openModal].modalContent}
        </SectionModal>
      )}
    </section>
  );
}
