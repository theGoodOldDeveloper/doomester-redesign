"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionModal from "./SectionModal";

interface Tab {
  id: string;
  label: string;
  title: string;
  intro: string;
  features: string[];
  modalContent: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "nyugalom",
    label: "Nyugalom 😌",
    title: "A legnagyobb ajándék: nem kell aggódnod",
    intro: "Lekapcsoltam a vasalót? Bezártam a kaput? Megvan a gyerek? Egy pillantás, és tudod. Vagy a HA maga szól, ha valami nincs rendben.",
    features: [
      "Értesítés ha a kapu nyitva marad — és hangosan is szól, ha 10 perce nem csukják be",
      "Automatikus lekapcsolás ha mindenki elhagyta az otthont",
      "„Gyerek hazaért\" értesítés a telefonra",
      "Vasaló, hajsütővas — távolról is lekapcsolható",
      "Kamera live nézet a telefonon, bárhonnan",
    ],
    modalContent: (
      <>
        <p>
          A legtöbb okosotthon-megrendelő ezzel az érzéssel indul: szeretnék végre tudni, mi
          történik otthon, amikor nem vagyok ott. Ez pontosan az, amit a rendszer megold.
        </p>
        <p>
          Nem kell visszafordulni az autóval. Nem kell a sógornőt felhívni, hogy menjen el
          ellenőrizni. Nem kell az egész nyaralás alatt azon rágódni, hogy bezártam-e a kaput.
          A HA figyeli az egészet — és csak akkor szól, amikor valóban szükséges. Nem minden
          5 másodpercben riadóztat, hanem emberséges logikával: figyelmeztet, majd ha nem
          reagálsz, hangosan szól.
        </p>
      </>
    ),
  },
  {
    id: "sporalas",
    label: "Spórolás ⚡",
    title: "Havonta több ezer forint — automatikusan",
    intro: "Az okosotthon nem csak kényelmet hoz — visszahozza a befektetést is. Teljesen automatikusan, anélkül, hogy gondolni kellene rá.",
    features: [
      "Fűtés csak ott fűt, ahol valóban tartózkodtok — üres szobát nem",
      "Klíma és fűtés leáll, ha nyitva felejtitek az ablakot",
      "Locsoló nem indul el, ha az előző nap esett",
      "Bojler csak akkor melegít, amikor valóban szükség van rá",
      "Minden villany automatikusan lekapcsol, ha mindenki elmegy",
    ],
    modalContent: (
      <>
        <p>
          Az energiamegtakarítás az okosotthon egyik legkézzelfoghatóbb hozadéka. A fűtés és
          hűtés teszi ki a legtöbb háztartás villanyszámlájának 50-60%-át — és a legtöbb esetben
          ezek az eszközök akkor is üzemelnek, amikor nem kellene.
        </p>
        <p>
          A DOOMester rendszer okosan kezeli ezeket: csak ott és csak akkor fűt, ahol és amikor
          valóban szükséges. Egy átlagos háztartásban ez évi 40.000–80.000 forint megtakarítást
          jelent — és ez nem marketing fogás, hanem valós, mérhető eredmény.
        </p>
      </>
    ),
  },
  {
    id: "egyszeruseg",
    label: "Egyszerűség 🎛️",
    title: "Egyszer beállítva — örökre működik",
    intro: "Nem kell értened a technikához. Nem kell emlékezned semmire. A rendszer csinálja, te csak élvezed.",
    features: [
      "\"Jó éjt\" gomb: minden lekapcsol, riasztás élesedik, klíma éjszakai módba vált",
      "Magyar hangutasítások, helyi feldolgozással — internet nélkül is",
      "A fizikai kapcsolók megmaradnak — ha lefagy valami, azok is működnek",
      "A párod és a gyerekeid is tudják használni, külön profilokkal",
      "Távolról is vezérelhető — nyaralásból is",
    ],
    modalContent: (
      <>
        <p>
          Az egyik leggyakoribb félelem: mi van, ha bonyolult? Mi van, ha a feleségem/férjem/szülőm
          nem tudja használni? Ez a kérdés jogos — és pont erre terveztem a DOOMester rendszert.
        </p>
        <p>
          Minden rendszert úgy állítok be, hogy a legkevésbé tech-barátos családtag is kényelmesen
          kezelje. Egyszerű ikonok, magyar feliratok, nagy gombok. A fizikai kapcsolók nem tűnnek el
          — ha valaki nem akar appot, a hagyományos módszer is működik. Az okosotthon segítség, nem akadály.
        </p>
      </>
    ),
  },
  {
    id: "biztonság",
    label: "Biztonság 🔐",
    title: "Otthonod védi magát — és téged értesít",
    intro: "Mozgásérzékelők, ajtószenzorok, kamerák — mind egy rendszerben, okos logikával. Nem riadóztat feleslegesen, de ha kell, azonnal szól.",
    features: [
      "Mozgásérzékelők az ajtóknál, értesítés ha illetéktelen belép",
      "Okos riasztó, amit te élesítesz — telefonról bárhonnan",
      "Kamera mozgásra fotót küld a telefonra",
      "Ha sokáig nem érzékel mozgást (pl. idős szülőknél), jelzés",
      "Szimulált jelenlét: véletlenszerű fénykapcsolgatás távollét alatt",
    ],
    modalContent: (
      <>
        <p>
          A biztonság nem azt jelenti, hogy minden percben riadót kapsz. A jól beállított
          okosotthon tudja a különbséget: a háziállat mozgása más, mint egy illetéktelen belépő.
          Az automatizálások okos logikával szűrik a valódi riasztásokat.
        </p>
        <p>
          Ráadásul a rendszer aktívan védi az otthonod távolléted idején: véletlenszerűen
          kapcsolgatja a lámpákat, mintha otthon lennél. Nem kell drága biztonsági céget fogadni
          — a rendszer maga figyel, te pedig bárhonnan látod mi történik.
        </p>
      </>
    ),
  },
];

export default function WhatHAGivesYou() {
  const [activeTab, setActiveTab] = useState("nyugalom");
  const [openModal, setOpenModal] = useState(false);

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="mit-ad" className="container-custom py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label mb-4">Mit kapsz</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-cream tracking-tight leading-[1.25] mb-3 pb-1 font-manrope">
          Amire valóban szükséged van
        </h2>
        <p className="font-lora italic text-cream-muted text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
          Nem kütyügyűjtemény — egy láthatatlan háttérrendszer, ami rád dolgozik.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-bold tracking-[0.06em] uppercase px-4 py-2 rounded-lg transition-all font-syne ${
                activeTab === tab.id
                  ? "bg-amber-dim border border-amber-border text-amber-accent"
                  : "bg-dark-card border border-card-border text-cream-muted hover:text-cream hover:border-[rgba(255,255,255,0.12)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-card border border-card-border rounded-2xl p-6 md:p-8 cursor-pointer hover:border-amber-border transition-colors group"
            onClick={() => setOpenModal(true)}
          >
            <h3 className="text-xl md:text-2xl font-extrabold text-cream mb-3 font-manrope group-hover:text-amber-accent transition-colors">
              {current.title}
            </h3>
            <p className="font-lora italic text-cream-muted text-base md:text-lg leading-relaxed mb-6">
              {current.intro}
            </p>
            <ul className="space-y-3 mb-6">
              {current.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-accent text-[11px] font-syne font-bold mt-1 flex-shrink-0">→</span>
                  <span className="text-cream-muted font-lora text-base leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-amber-accent font-syne">
              Részletek →
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <SectionModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={current.title}
      >
        {current.modalContent}
      </SectionModal>
    </section>
  );
}
