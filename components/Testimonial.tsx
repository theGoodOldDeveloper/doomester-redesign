"use client";

import { motion } from "framer-motion";

export default function Testimonial() {
  return (
    <section className="container-custom py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="max-w-4xl mx-auto"
      >
        <div
          className="relative border border-amber-border rounded-2xl p-8 md:p-12 overflow-hidden text-center"
          style={{ background: "linear-gradient(135deg, rgba(240,140,60,0.06) 0%, #130d1a 30%, #130d1a 70%, rgba(140,80,200,0.06) 100%)" }}
        >

          {/* Shimmer */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shimmer" />
          </div>

          <div className="relative z-10">
            <p className="font-lora italic text-lg md:text-xl text-cream leading-relaxed">
              És akik már használják, azok az első nap végén rendszerint ezt mondják:{" "}
              <span className="font-semibold text-amber-accent">
                „Ez jó mulatság, férfi munka volt!"
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
