"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { num: "1", label: "alkalmazás az összes eszköznek" },
  { num: "15p", label: "ingyenes konzultáció" },
  { num: "0 Ft", label: "HA szoftver havidíj örökre" },
  { num: "30 év", label: "IT tapasztalat a hátad mögött" },
];

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="container-custom pt-10 pb-12 md:pt-16 md:pb-16">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 min-w-0"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-amber-dim border border-amber-border text-amber-accent text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full mb-5 font-syne text-center"
          >
            <span className="text-cream">D</span>igitális{" "}
            <span className="text-cream">O</span>kos{" "}
            <span className="text-cream">O</span>tthon{" "}
            <span className="text-cream">Mester</span>
            <span className="block mt-1 opacity-70">Home Assistant szakértő</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-[1.25] tracking-tight text-cream mb-4 pb-1 font-manrope"
          >
            Az otthonod{" "}
            <span className="text-amber-accent">végre rád figyel</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-lora italic text-base md:text-lg text-cream-muted leading-relaxed mb-8 max-w-xl"
          >
            Láthatatlan kényelem, összehangolt rendszerek és modern harmónia —
            anélkül, hogy egyetlen gombot megnyomnál.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <button
              onClick={() => scrollTo("#kapcsolat")}
              className="bg-amber-accent text-dark font-extrabold text-sm tracking-[0.06em] uppercase px-6 py-3.5 rounded-xl hover:bg-amber-light transition-colors font-syne"
            >
              Konzultáció / Kapcsolat
            </button>
            <button
              onClick={() => scrollTo("#miert")}
              className="border border-[rgba(140,100,160,0.3)] text-cream-muted font-bold text-sm tracking-[0.06em] uppercase px-6 py-3.5 rounded-xl hover:text-purple-soft hover:border-[rgba(140,100,160,0.5)] transition-colors font-syne"
            >
              Miért kell nekem ez?
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="grid grid-cols-2 gap-3"
          >
            {stats.map((s) => (
              <div
                key={s.num}
                className="bg-dark-card border border-card-border rounded-xl p-4 text-center flex flex-col items-center gap-3"
              >
                {/* Inner card — number */}
                <div className="w-full bg-[rgba(255,255,255,0.04)] border border-amber-border/40 rounded-lg py-3 px-2">
                  <span className="block text-5xl font-bold text-amber-accent leading-none font-oswald tracking-wide">
                    {s.num}
                  </span>
                </div>
                <span className="text-sm text-cream-muted font-lora leading-snug">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: hero image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="w-full lg:w-[48%] flex-shrink-0"
        >
          <div className="relative w-full aspect-[8/5] rounded-2xl overflow-hidden bg-dark-3 border border-amber-border">
            {/* Placeholder ha nincs kép */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "linear-gradient(rgba(240,140,60,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,140,60,0.04) 1px, transparent 1px)",
                  backgroundSize: "30px 30px"
                }}
              />
              <span className="relative text-[11px] font-bold tracking-[0.15em] uppercase text-amber-border font-syne z-10">
                heroimage1.jpg
              </span>
            </div>
            <Image
              src="/images/heroimage1.jpg"
              alt="DOOMester okosotthon"
              fill
              className="object-cover relative z-10"
              unoptimized
              priority
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent z-20 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
