"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-card-border mt-8">
      <div className="container-custom py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-dark-card border border-card-border rounded-2xl p-7 md:p-10 mb-6">
            <h3 className="text-xl font-extrabold mb-6 text-center text-amber-accent font-manrope tracking-wide">
              Kapcsolat
            </h3>
            <div className="space-y-4 text-center">
              {[
                { icon: "🌐", label: "thegoodolddeveloper.com", href: "https://thegoodolddeveloper.com", external: true },
                { icon: "📧", label: "thegoodolddeveloper@gmail.com", href: "mailto:thegoodolddeveloper@gmail.com", external: false },
                { icon: "📞", label: "+36 30 928 3653", href: "tel:+36309283653", external: false },
              ].map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="font-lora text-cream-muted hover:text-cream transition-colors text-sm md:text-base"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="font-lora text-[12px] text-[rgba(255,255,255,0.15)]">
              © 2025 The Good Old Developer. Minden jog fenntartva. Minden sor kód mögött egy kávé ☕
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
