import React, { useEffect, useState } from "react";
import Sections from "./AboutUs/sections";
import SwiperSection from "./AboutUs/swiper";

import newBgImage from "../assets/aboutus/aboutus.jpg";

import { motion } from "framer-motion";
import Footer from "../Components/Footer/Footer";

const AboutUs: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className={`fixed top-0 left-0 w-full h-screen transition-all duration-500 ${
          scrolled ? "blur-sm opacity-100" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${newBgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      ></div>

      {/* Header Section */}
      <header className="relative z-10 flex flex-col items-center min-h-screen bg-black/60 text-white text-center p-10">
        <div className="flex gap-20">
          <button
            onClick={() => scrollToSection("first-section")}
            className="cursor-pointer bg-blue-500 px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            درباره ما
          </button>
          <button
            onClick={() => scrollToSection("second-section")}
            className="cursor-pointer bg-green-500 px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            اهداف ما
          </button>
          <button
            onClick={() => scrollToSection("swiper-section")}
            className="cursor-pointer bg-purple-500 px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 transition"
          >
            تیم ما
          </button>
        </div>
      </header>

      {/* Content Sections with Animation */}
      <motion.div
        id="first-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Sections />
      </motion.div>

      <motion.div
        id="swiper-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <SwiperSection />
      </motion.div>
      <footer>
        <Footer />  
      </footer>
    </div>
  );
};

export default AboutUs;
