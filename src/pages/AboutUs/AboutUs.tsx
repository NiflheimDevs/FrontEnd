import React from "react";
import { motion } from "framer-motion";
import Header from "../../Components/MainContent/Header";
import Sections from "../../Components/AboutUs/sections";
import TeamSection from "../../Components/AboutUs/TeamSection";
import Footer from "../../Components/Footer/Footer";

const AboutUs: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-800 overflow-auto">
      {/* Header */}
      <Header showSearch={false} />

      {/* Intro Banner */}
      <section className="w-full pt-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 px-8">
          {/* Gradient Accent Shape */}
          <motion.div
            className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 rounded-xl shadow-md transition-all duration-300 hover:scale-110 hover:rotate-6"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/20 rounded-xl blur-sm" />
          </motion.div>

          {/* Title and Subtitle */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right space-y-2">
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-200 tracking-tight leading-tight"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              درباره بیدلنسر
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-md font-medium"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              پلتفرمی برای اتصال فریلنسرها و کارفرمایان با شفافیت بالا
            </motion.p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <motion.section
        id="about-sections"
        className="py-4 px-4 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Sections />
      </motion.section>

      {/* Team Section */}
      <motion.section
        id="team-section"
        className="pt-4 pb-8 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <TeamSection />
      </motion.section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-100 dark:bg-gray-800">
        <Footer />
      </footer>
    </div>
  );
};

export default AboutUs;
