import React from "react";
import { motion } from "framer-motion";

import Header from "../../Components/MainContent/Header";
import Sections from "../../Components/AboutUs/sections";
// import SwiperSection from "../../Components/AboutUs/swiper"; // Uncomment if needed
import TeamSection from "../../Components/AboutUs/TeamSection";
import Footer from "../../Components/Footer/Footer";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header showSearch={false} />

      {/* Intro Banner */}
      <section className="w-full py-4 px-4 bg-gray-50">
        <div className="flex items-center gap-3 max-w-5xl mx-auto">
          <div className="w-6 h-6 bg-gradient-to-b from-blue-800 to-blue-400 rounded-md transition-transform hover:scale-110" />
          <div className="text-xl font-bold text-gray-900">درباره بیدلنسر</div>
        </div>
      </section>

      {/* Sections */}
      <motion.section
        id="about-sections"
        className="py-8 px-4 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Sections />
      </motion.section>

      {/* Team Section or Swiper */}
      <motion.section
        id="team-section"
        className="py-10 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* <SwiperSection /> */}
        <TeamSection />
      </motion.section>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default AboutUs;