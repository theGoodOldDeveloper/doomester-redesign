"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

interface Slide {
  badge: string;
  situation: string;
  solution: string;
  result: string;
}

const slides: Slide[] = [
  {
    badge: "🏡 Kisgyermekes família · Gyöngyös",
    situation: `Reggel mindenki rohan, senki nem tudja kinek mi a feladata. A gyerekek iskolába, apa munkába, anya egyszerre mindenütt. Közben valaki nyitva hagyta a kaput, a fürdőszobai lámpa ég, és a „bezártad a kocsit?\" kérdés még autóból is elhangzik.`,
    solution: `Reggeli rutin automatizálás: 6:30-kor a HA felemeli a fűtést, 7:00-kor bekapcsol a fürdőszobában a fűtés. Ha a gyerek hazaér az iskolából, telefon értesítés: „Bence hazaért.\" A kaput? Telefonról 2 másodperc alatt megnézheted.`,
    result: `Az anya az első héten azt mondta: „Miért nem csináltuk ezt meg korábban?\" A reggeli rutin azóta 15 perccel rövidebb lett.`,
  },
  {
    badge: "🏖️ Nyaraló dilemma · 1 hetes távollét",
    situation: `Egész évben tervezi az ember, majd az egész vakáción azon rágja az agyát: „Biztosan bezártam?\" „Mindent lekapcsoltam?\" A strandolás ott, az aggódás itt.`,
    solution: `Távollét mód — ami nem kell, nem üzemel. Este véletlenszerűen kapcsolgatnak a villanyok, mintha otthon lennél. Hazainduláskor egy kattintás a telefonon: az élet visszaáll a régi kerékvágásba — mire megérkezel, minden a helyén van.`,
    result: `„A következő nyaralón csak a strandot néztem, nem a telefont. Na jó, egyszer azért megnéztem — de csak mert akartam, nem mert kellett.\"`,
  },
  {
    badge: "🚗 A felesleges visszafordulás",
    situation: `Mindenki ismeri. Félúton az autóban felvillan: a hajsütővas! Megfordulsz, visszamész, és persze ki volt kapcsolva. Évente 6–8 felesleges visszafordulás, stressz, elveszett idő.`,
    solution: `A HA figyeli a konnektort. Ha nem kapcsolod ki indulás előtt, 5 perccel később értesítés jön. Ha nem reagálsz — távolról lekapcsolja. Nincs visszafordulás, nincs aggódás.`,
    result: `„Évi kb. 8 visszafordulástól szabadultam meg. Már az időmegtakarítás is megérte.\"`,
  },
  {
    badge: "🏠 Kiadó lakás · Eger",
    situation: `Airbnb-s lakás: minden vendégváltásnál ott kell lenni kulccsal. Ha a vendég elkésik, az ember vár. Ha a bérbeadó nem ér rá, szervezési rémálom.`,
    solution: `Okos zár + HA. Minden vendégnek egyedi, időkorlátozott kód a foglalás idejére. Megérkezéskor értesítés, távozáskor automatikusan törlődik a kód. A fűtés 2 órával a foglalás előtt beindul.`,
    result: `A bérbeadó azóta kulcs nélkül üzemelteti a lakást. „Legutóbb Görögországból adtam ki egy hétvégét. Semmi gond nem volt.\"`,
  },
  {
    badge: "👴 Gondoskodó gyerek · Hatvan",
    situation: `Szülők 70+ évesek, egyedül laknak. A gyerek aggódik, de nem tud minden nap odamenni. Rendben van-e Anya? Felkelt-e? Nem esett-e el?`,
    solution: `Mozgásérzékelők a lakásban. Ha délelőtt 10-ig nincs mozgás, automatikus üzenet a gyereknek. Ráadásul van egy egyszerű „Jól vagyok\" gomb, amit a szülő minden reggel megnyom.`,
    result: `„Apa büszke, hogy okosotthonban lakik. Én meg végre tudok aludni.\"`,
  },
  {
    badge: "🌿 Sok app, nulla kényelem · Újépítésű ház",
    situation: `Új ház, okos eszközök — de 5 különböző appban szétszórva. Klíma itt, fűtés ott, villanyok amott. Fizet az ember a kényelemért, aztán ugyanolyan kényelmetlenül él.`,
    solution: `A HA összefogja az összeset. Klíma leáll ha nyitva marad az ablak. Locsoló nem indul ha esett. Fűtés lejjebb megy ha mindenki elment. Minden eszköz egy képernyőn, egymással kommunikálva.`,
    result: `Első télen akár 20–25%-os fűtésmegtakarítás — a tényleges összeg a ház méretétől függ. „A rendszer néhány év alatt kijön magából — utána csak spórolok.\"`,
  },
];

export default function UseCasesCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  // Measure all slides to find the tallest
  useEffect(() => {
    if (!measureRef.current) return;
    const children = measureRef.current.children;
    let tallest = 0;
    for (let i = 0; i < children.length; i++) {
      tallest = Math.max(tallest, (children[i] as HTMLElement).offsetHeight);
    }
    setMaxHeight(tallest);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, next]);

  const slide = slides[current];

  return (
    <section id="esetek" className="container-custom py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label mb-4">Valós esetek</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-cream tracking-tight leading-[1.25] mb-10 pb-1 font-manrope">
          Felhasználói esetek
        </h2>

        {/* Hidden measurement container */}
        <div ref={measureRef} className="absolute invisible pointer-events-none max-w-3xl w-full" style={{ left: "-9999px" }}>
          {slides.map((s, i) => (
            <div key={i} className="bg-dark-card border border-card-border rounded-2xl p-6 md:p-10">
              <span className="inline-block bg-amber-dim border border-amber-border text-amber-accent text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full mb-6 font-syne">
                {s.badge}
              </span>
              <div className="space-y-5">
                <div className="border-l-2 border-amber-accent pl-4">
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-amber-accent mb-1.5 font-syne">A helyzet:</p>
                  <p className="text-cream-muted font-lora text-base leading-relaxed">{s.situation}</p>
                </div>
                <div className="border-l-2 border-purple-soft pl-4">
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-purple-soft mb-1.5 font-syne">A megoldás:</p>
                  <p className="text-cream-muted font-lora text-base leading-relaxed">{s.solution}</p>
                </div>
                <div className="border-l-2 border-[rgba(100,200,100,0.5)] pl-4">
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[rgba(140,220,140,0.8)] mb-1.5 font-syne">Az eredmény:</p>
                  <p className="text-cream-muted font-lora text-base leading-relaxed">{s.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-2xl" style={maxHeight ? { minHeight: maxHeight } : undefined}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="bg-dark-card border border-card-border rounded-2xl p-6 md:p-10"
              >
                <span className="inline-block bg-amber-dim border border-amber-border text-amber-accent text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full mb-6 font-syne">
                  {slide.badge}
                </span>

                <div className="space-y-5">
                  <div className="border-l-2 border-amber-accent pl-4">
                    <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-amber-accent mb-1.5 font-syne">A helyzet:</p>
                    <p className="text-cream-muted font-lora text-base leading-relaxed">{slide.situation}</p>
                  </div>
                  <div className="border-l-2 border-purple-soft pl-4">
                    <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-purple-soft mb-1.5 font-syne">A megoldás:</p>
                    <p className="text-cream-muted font-lora text-base leading-relaxed">{slide.solution}</p>
                  </div>
                  <div className="border-l-2 border-[rgba(100,200,100,0.5)] pl-4">
                    <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[rgba(140,220,140,0.8)] mb-1.5 font-syne">Az eredmény:</p>
                    <p className="text-cream-muted font-lora text-base leading-relaxed">{slide.result}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-6">
            <button
              onClick={prev}
              aria-label="Előző"
              className="w-10 h-10 rounded-full bg-dark-card border border-card-border flex items-center justify-center text-cream-muted hover:text-amber-accent hover:border-amber-border transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2 items-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`${i + 1}. eset`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2.5 bg-amber-accent"
                      : "w-2.5 h-2.5 bg-[rgba(255,255,255,0.1)] hover:bg-amber-dim"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Következő"
              className="w-10 h-10 rounded-full bg-dark-card border border-card-border flex items-center justify-center text-cream-muted hover:text-amber-accent hover:border-amber-border transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
