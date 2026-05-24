"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyDoYouNeedThis from "@/components/WhyDoYouNeedThis";
import WhatHAGivesYou from "@/components/WhatHAGivesYou";
import UseCasesCarousel from "@/components/UseCasesCarousel";
import FAQ from "@/components/FAQ";
import Description from "@/components/Description";
import Examples from "@/components/Examples";
import Testimonial from "@/components/Testimonial";
import Description2 from "@/components/Description2";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Header />
      <Hero />
      <WhyDoYouNeedThis />
      <WhatHAGivesYou />
      <UseCasesCarousel />
      <FAQ />
      <Description />
      <Examples />
      <Testimonial />
      <Description2 />
      <ContactSection />
      <Footer />
    </main>
  );
}
