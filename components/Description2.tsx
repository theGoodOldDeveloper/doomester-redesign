"use client";

import { motion } from "framer-motion";

export default function Description2() {
  return (
    <section className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-dark-card border border-card-border rounded-2xl p-7 md:p-10">
          {/* Highlight box */}
          <div
            className="relative border border-amber-border rounded-xl p-6 md:p-8 overflow-hidden mb-6"
            style={{ background: "linear-gradient(135deg, rgba(240,140,60,0.05) 0%, #130d1a 25%, #130d1a 75%, rgba(140,80,200,0.05) 100%)" }}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer" />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-cream text-center font-manrope relative z-10 leading-snug">
              De ha bármi informatikai gond adódik otthon – számíthatsz rám.
            </h3>
          </div>

          <p className="font-lora text-base md:text-lg text-cream-muted leading-relaxed">
            Nem csak az okosotthonok világában segítek. Ha bármilyen informatikai probléma
            felbukkan otthon – lassú a gép, nem működik a wifi, rakoncátlankodik a laptop,
            nyomtató, router, vagy egyszerűen csak „nem azt csinálja, amit kéne" – nyugodtan
            szólj. Full stack fejlesztőként és DevOps szakemberként jól ismerem a teljes
            hátteret, a hálózattól a szerverig, a szoftvertől a hardverig. Célom, hogy otthonod
            technikája ne idegesítsen, hanem gond nélkül működjön. Segítek, akármi is a baj.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
