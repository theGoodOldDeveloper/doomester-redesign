"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Description() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header kártya */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="relative rounded-2xl p-8 md:p-10 mb-6 overflow-hidden text-center"
            style={{ background: "linear-gradient(135deg, rgba(240,140,60,0.18) 0%, rgba(240,100,20,0.28) 40%, rgba(180,60,200,0.18) 100%)", border: "1px solid rgba(240,140,60,0.3)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-accent/10 via-transparent to-purple-soft/10 pointer-events-none" />
            <h2 className="relative z-10 text-2xl md:text-3xl font-extrabold text-cream font-manrope leading-snug">
              Képzeld el, hogy hazamész, és a lakásod{" "}
              <span className="text-amber-accent">pontosan tudja, mire van szükséged</span>
            </h2>
          </motion.div>

          <div
            className="bg-dark-card border border-card-border rounded-2xl p-7 md:p-10 cursor-pointer hover:border-amber-border transition-colors group"
            onClick={() => setIsModalOpen(true)}
          >
            <p className="font-lora text-base md:text-lg text-cream-muted leading-relaxed mb-4">
              — anélkül, hogy egyetlen gombot megnyomnál. Felkapcsolnak a megfelelő lámpák,
              kellemes a hőmérséklet, nem zúg feleslegesen semmi, és ha bármi gyanús történik,
              a telefonod szól helyetted is figyel. Röviden: a lakás dolgozik, te pedig élsz
              benne kényelmesen.
            </p>
            <p className="font-lora text-base md:text-lg text-cream-muted leading-relaxed mb-4">
              Ezt tudja a Home Assistant-alapú okosotthon:{" "}
              <strong className="text-cream font-semibold">összefogja az összes eszközödet egy helyre</strong>,
              és egyszerű, érthető szabályok szerint „összehangolja" őket. Nem kell értened a
              technikai varázsszavakhoz – elég, ha azt meg tudod fogalmazni, mit szeretnél:
            </p>
            <div className="space-y-2 my-5 pl-4 border-l-2 border-amber-border">
              <p className="font-lora italic text-cream-muted text-base md:text-lg">„Ha besötétedik, kapcsoljanak fel a lámpák."</p>
              <p className="font-lora italic text-cream-muted text-base md:text-lg">„Ha elmegyek otthonról, kapcsoljon ki minden, ami felesleges."</p>
              <p className="font-lora italic text-cream-muted text-base md:text-lg">„Ha mozgást érzékel a rendszer, jelezzen a telefonomra."</p>
            </div>
            <p className="font-lora text-base md:text-lg text-cream-muted leading-relaxed mb-5">
              Az okosotthon{" "}
              <strong className="text-cream font-semibold">nem kütyügyűjtemény</strong>, hanem
              egy láthatatlan háttérrendszer, ami növeli a kényelmet, pénzt spórol, biztonságot
              ad — és mindezt úgy, hogy te döntöd el, mi történjen.
            </p>

            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-amber-accent group-hover:text-amber-light transition-colors font-syne">
              Részletek →
            </span>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-2 border border-card-border rounded-2xl shadow-large max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative bg-dark-3 border-b border-amber-border rounded-t-2xl p-6 md:p-8">
                <div className="absolute left-0 top-0 w-40 h-full bg-[rgba(240,140,60,0.06)] pointer-events-none rounded-tl-2xl" />
                <div className="flex items-start justify-between gap-4 relative">
                  <h3 className="text-lg md:text-xl font-extrabold text-cream font-manrope">
                    Mit tud valójában egy okosotthon?
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 rounded-lg bg-amber-dim border border-amber-border text-amber-accent flex items-center justify-center hover:bg-[rgba(240,140,60,0.2)] transition-colors text-lg font-bold flex-shrink-0"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-4 text-cream-muted font-lora text-base leading-relaxed">
                <p>
                  – anélkül, hogy egyetlen gombot megnyomnál. Felkapcsolnak a megfelelő lámpák,
                  kellemes a hőmérséklet, nem zúg feleslegesen semmi, és ha bármi gyanús történik,
                  a telefonod szól helyetted is figyel. Röviden: a lakás dolgozik, te pedig élsz
                  benne kényelmesen.
                </p>
                <p>
                  Ezt tudja a Home Assistant-alapú okosotthon:{" "}
                  <strong className="text-cream">összefogja az összes eszközödet egy helyre</strong>,
                  és egyszerű, érthető szabályok szerint „összehangolja" őket.
                </p>
                <p>
                  Az okosotthon <strong className="text-cream">nem kütyügyűjtemény</strong>, hanem
                  egy láthatatlan háttérrendszer, ami:
                </p>
                <ul className="space-y-2 pl-4">
                  {[
                    "növeli a kényelmet (kevesebb kapcsolgatás, több automatizmus),",
                    "pénzt spórol (fűtés, világítás, fogyasztás figyelése),",
                    "biztonságot ad (értesítések ajtóról, ablakról, mozgásról),",
                    "és mindezt úgy, hogy te döntöd el, mi történjen.",
                  ].map((item, i) => (
                    <li key={i} className="relative pl-4">
                      <span className="absolute left-0 top-1 text-amber-accent text-[10px] font-syne">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  A DOOMester abban segít, hogy ebből ne káosz, hanem{" "}
                  <strong className="text-cream">józanul felépített, átlátható rendszer</strong> legyen.
                  Az eredmény? Egy olyan otthon, ami alkalmazkodik hozzád – nem fordítva. És amikor
                  először átéled, általában csak ennyit mondasz:{" "}
                  <em>„Miért nem így működött ez eddig is?"</em>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
