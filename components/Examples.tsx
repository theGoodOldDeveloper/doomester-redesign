"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ExampleCard from "./ExampleCard";
import ExampleModal from "./ExampleModal";

interface Example {
  id: number;
  name: string;
  description: string;
  image: string;
  modalImage: string;
  modalDescription: string;
}

const automations = [
  { icon: "🎬", title: `A "Mozizunk" parancs`, description: `Egyetlen gomb vagy hangutasítás: a redőny lassan lehúzódik, a nappali lámpa elhalványul 20%-ra, a TV bekapcsol. Film vége után fordítva: felmegy a lámpa, feltekeredik a redőny. Három távirányító helyett egy mondat.` },
  { icon: "🌅", title: "Kelő nap ébresztő", description: `Az ébresztő szól → a HA 10 perc alatt, fokozatosan emeli a fényerőt a hálószobában, mint egy kelő nap. Egyidejűleg beindul a fürdőszobában a fűtés. Nem kell dermesztő csempén ébredni — és hangos csipogó sem kell.` },
  { icon: "🌧️", title: "Esős nap = nem locsolunk", description: `Ha az előző 24 órában esett, a locsolórendszer nem indul el — még ha a programban „kedd, 7:00" szerepel is. Talajnedvesség-érzékelővel még pontosabb. Vége a felesleges öntözésnek.` },
  { icon: "🪟", title: "Nyitott ablak + fűtés = logikátlan", description: `Télen kinyitod az ablakot szellőztetni és elfelejted a radiátort. A HA 5 perc után lekapcsolja a fűtést az adott szobában. Ha becsuktad az ablakot, visszakapcsolja. Nem kell rá gondolni.` },
  { icon: "🚪", title: "A kapu jelzőlámpa rendszere", description: `A bejáratnál egy kis színes izzó: zöld = kapu zárva. Sárga = 2 perce nyitva. Piros = 5 perce nyitva + értesítés. 10 perc után hangüzenet: „Figyu, már 10 perce nyitva a kapu." Nem kell kérdezgetni, látod.` },
  { icon: "🌙", title: `"Jó éjszakát" — és kész`, description: `Hangszóróba mondod: „Jó éjszakát." A HA lekapcsol minden villanyt, a klímát éjszakai módba teszi, leellenőrzi a kaput. Ha nyitva van, szól. Ha minden rendben — csend. 10 gombnyomás helyett egyetlen mondat.` },
  { icon: "📦", title: "Futár a kapunál — te meg máshol vagy", description: `A kamera mozgást érzékel a kapunál → értesítés a telefonra. Távolról megnyitod a kaput, a kamerán figyeled hogy belerakja a csomagot, majd bezárod. Nincs többé „nem voltam otthon" cédula.` },
  { icon: "🧺", title: "Mosógép kész — ne feledd áttenni", description: `A HA figyeli a mosógép áramfogyasztását. Amikor befejezi (leesik a fogyasztás), értesítés: „A mosás kész — tedd át, mielőtt megkeseredik!" Vége az ázó-savanyodó ruháknak a gépben.` },
  { icon: "🌓", title: "Naplemente = kerti lámpa be", description: `A kerti lámpa pontosan 15 perccel naplemente után kapcsol be — és ez minden nap más-más időpontra esik. Éjfélkor lekapcsol. Sosem kell azon gondolkodni: égve hagytam-e a kertet?` },
  { icon: "👥", title: "Mindenki elment = takarékos mód", description: `Ha az utolsó okostelefon is elhagyta az otthont, a HA lekapcsol minden felesleges villanyt, a klímát takarékos módba teszi. Az első telefon visszaér → minden visszaáll. Mire bemész az ajtón, már meleg van és világít.` },
  { icon: "💧", title: "Vízszivárgás — azonnal, nem másnap", description: `A mosógép, a bojler, a mosogatógép alá kerül egy kis érzékelő. Ha vizet érzékel: azonnali telefon értesítés. Nem kell „majd megnézem estére" — azonnal jelzi, mielőtt komolyabb kár keletkezne.` },
  { icon: "🌈", title: "Jelzőfény riasztási fokozatok", description: `Egy egyszerű okosizzó jelzőfényként: zöld = minden oké. Sárga = valami figyelmet igényel. Piros villogás = azonnali figyelmeztetés. Éjszaka is tudod a kapu állapotát — anélkül, hogy telefonra kellene nyúlni.` },
];

export default function Examples() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);

  useEffect(() => {
    fetch("/api/examples")
      .then((res) => res.json())
      .then((data) => setExamples(data))
      .catch(() => {});
  }, []);

  return (
    <section id="peldak" className="container-custom py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label mb-4">Automatizálás</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-cream tracking-tight leading-[1.25] mb-10 pb-1 font-manrope">
          Példák az automatizálásra
        </h2>

        {examples.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {examples.map((example) => (
              <ExampleCard
                key={example.id}
                example={example}
                onClick={() => setSelectedExample(example)}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {automations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-dark-card border border-card-border rounded-2xl p-6 flex flex-col hover:border-amber-border transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-dim border border-amber-border flex items-center justify-center text-xl mb-4 flex-shrink-0">
                {item.icon}
              </div>
              <h3 className="text-[14px] font-extrabold text-cream mb-2 font-manrope leading-snug">
                {item.title}
              </h3>
              <p className="text-cream-muted font-lora text-base leading-relaxed flex-grow">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedExample && (
        <ExampleModal
          example={selectedExample}
          onClose={() => setSelectedExample(null)}
        />
      )}
    </section>
  );
}
