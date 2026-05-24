"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="kapcsolat" className="container-custom py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto space-y-4"
      >
        <div className="section-label mb-6">Kapcsolat</div>

        {/* Contact form card */}
        <div className="bg-dark-card border border-card-border rounded-2xl p-7 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-cream mb-3 font-manrope">
            Vedd fel velem a kapcsolatot
          </h2>
          <p className="font-lora text-cream-muted text-base md:text-lg leading-relaxed mb-6">
            Kérdezz bátran bármit az okos otthon automatizálásról! Küldj egy üzenetet,
            és hamarosan válaszolok. Együtt találjuk meg a legjobb megoldást az otthonod számára.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-block bg-amber-accent text-dark font-extrabold text-sm tracking-[0.06em] uppercase px-7 py-3.5 rounded-xl hover:bg-amber-light transition-colors font-syne"
            >
              Kapcsolatfelvételi űrlap megnyitása →
            </Link>
          </motion.div>
        </div>

        {/* Booking card */}
        <div
          className="relative border border-amber-border rounded-2xl p-7 md:p-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(240,140,60,0.06) 0%, #130d1a 30%, #130d1a 70%, rgba(140,80,200,0.06) 100%)" }}
        >
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-cream mb-3 font-manrope">
              Ingyenes 15 perces konzultáció
            </h2>
            <p className="font-lora text-cream-muted text-base md:text-lg leading-relaxed mb-6">
              Foglalj időpontot egy ingyenes, 15 perces konzultációra, ahol együtt átbeszéljük
              az otthonod igényeit, és készítünk egy személyre szabott ajánlatot. Nincs
              kötelezettség, csak egy baráti beszélgetés az okos otthon lehetőségeiről.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="https://cal.com/tibor-vegh-xy710g/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-amber-accent text-dark font-extrabold text-sm tracking-[0.06em] uppercase px-7 py-3.5 rounded-xl hover:bg-amber-light transition-colors font-syne"
              >
                Időpont foglalása →
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
