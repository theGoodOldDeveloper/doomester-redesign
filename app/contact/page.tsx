"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Az üzenet sikeresen elküldve! Hamarosan válaszolok." });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus({ type: "error", message: data.error || "Hiba történt az üzenet küldése során." });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Hiba történt. Kérlek, próbáld újra később." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-dark-card border border-card-border text-cream placeholder-cream-muted/50 focus:outline-none focus:border-amber-border transition-colors font-lora text-base disabled:opacity-50";
  const labelClass = "block text-sm font-bold text-cream-muted font-syne tracking-wide mb-2";

  return (
    <main className="min-h-screen bg-dark">
      <Header />
      <section className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-dark-card border border-card-border rounded-2xl p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-amber-accent font-manrope">
              Kapcsolatfelvételi űrlap
            </h1>
            <p className="font-lora text-cream-muted text-base leading-relaxed mb-8">
              Töltsd ki az alábbi űrlapot, és hamarosan felveszem veled a kapcsolatot!
            </p>

            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-xl border font-lora text-base ${
                  submitStatus.type === "success"
                    ? "bg-[rgba(100,200,100,0.08)] text-[rgba(140,220,140,0.9)] border-[rgba(100,200,100,0.2)]"
                    : "bg-[rgba(220,60,60,0.08)] text-[rgba(255,120,120,0.9)] border-[rgba(220,60,60,0.2)]"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className={labelClass}>Név *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  placeholder="Teljes neved"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email cím *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  placeholder="email@pelda.hu"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Telefonszám</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                  placeholder="+36 30 123 4567"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Üzenet *</label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Írd le, miben segíthetek..."
                  disabled={isSubmitting}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                disabled={isSubmitting}
                className="w-full bg-amber-accent hover:bg-amber-light text-dark font-extrabold text-sm tracking-[0.06em] uppercase px-8 py-4 rounded-xl transition-colors font-syne disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Küldés..." : "Üzenet küldése"}
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-card-border text-center">
              <p className="font-lora text-sm text-cream-muted">
                Vagy{" "}
                <Link href="/" className="text-amber-accent hover:text-amber-light transition-colors font-semibold">
                  vissza a főoldalra
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
