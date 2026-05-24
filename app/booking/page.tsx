"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-medium"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            Ingyenes 15 perces konzultáció foglalása
          </h1>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Foglalj időpontot egy ingyenes, 15 perces konzultációra! Együtt átbeszéljük 
            az otthonod igényeit, és készítünk egy személyre szabott ajánlatot.
          </p>
          
          <div className="bg-gradient-to-r from-primary-50 to-cyan-50 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Mit várhatsz a konzultáció során?
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">✓</span>
                <span>Igényfelmérés és tanácsadás</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">✓</span>
                <span>Személyre szabott ajánlat készítése</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">✓</span>
                <span>Kérdések megválaszolása</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">✓</span>
                <span>Nincs kötelezettség, csak baráti beszélgetés</span>
              </li>
            </ul>
          </div>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Név *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Teljes neved"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email cím *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="email@pelda.hu"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefonszám *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="+36 30 123 4567"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Előnyben részesített dátum
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Előnyben részesített időpont
              </label>
              <select
                id="time"
                name="time"
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                <option value="">Válassz időpontot</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Üzenet (opcionális)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                placeholder="Van valami konkrét kérdésed vagy igényed?"
              />
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-primary-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-medium hover:shadow-glow transition-all duration-300"
            >
              Időpont foglalása
            </motion.button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Vagy{" "}
              <Link href="/" className="text-primary-600 hover:underline font-medium">
                vissza a főoldalra
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}

