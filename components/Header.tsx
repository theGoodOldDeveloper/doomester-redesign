"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Főoldal", href: "#hero" },
  { label: "Miért?", href: "#miert" },
  { label: "Mit ad?", href: "#mit-ad" },
  { label: "Felhasználói esetek", href: "#esetek" },
  { label: "Példák", href: "#peldak" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark/95 backdrop-blur-md border-b border-amber-border"
            : "bg-dark border-b border-amber-border"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Logo */}
            <button
              onClick={() => handleNav("#hero")}
              className="flex items-center gap-2 text-amber-accent font-syne font-extrabold text-base md:text-lg tracking-[0.1em] uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-amber-accent animate-amber-pulse" />
              DOOMester
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="text-cream-muted hover:text-amber-accent text-sm font-bold tracking-[0.07em] uppercase px-3 py-2 rounded-md transition-colors hover:bg-amber-dim font-syne"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("#kapcsolat")}
                className="ml-2 bg-amber-accent text-dark text-sm font-extrabold tracking-[0.07em] uppercase px-4 py-2 rounded-lg hover:bg-amber-light transition-colors font-syne"
              >
                Konzultáció →
              </button>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
              className="lg:hidden border border-amber-border rounded-md p-2 text-amber-accent transition-colors hover:bg-amber-dim"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {menuOpen ? (
                  <>
                    <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-dark-3 border-b border-amber-border"
          >
            <div className="container-custom py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="text-cream-muted hover:text-amber-accent text-sm font-bold tracking-[0.07em] uppercase px-3 py-3 rounded-lg text-left transition-colors hover:bg-amber-dim flex items-center justify-between font-syne"
                >
                  {item.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
              <div className="h-px bg-card-border my-1" />
              <button
                onClick={() => handleNav("#kapcsolat")}
                className="bg-amber-accent text-dark text-sm font-extrabold tracking-[0.06em] uppercase px-4 py-3 rounded-lg hover:bg-amber-light transition-colors font-syne text-center"
              >
                Konzultáció →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
