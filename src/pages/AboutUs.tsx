import React, { useEffect, useState } from "react";
import Sections from "./AboutUs/sections";
import SwiperSection from "./AboutUs/swiper";
import Header from "../Components/MainContent/Header";

import newBgImage from "../assets/aboutus/aboutus.jpg";

import { motion } from "framer-motion";
import Footer from "../Components/Footer/Footer";

const AboutUs: React.FC = () => {
  const [, setScrolled] = useState(false);

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

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <Header showSearch={false} />
      <section
        className="w-full flex h-100 flex-col justify-center items-center px-2 text-white text-center bg-cover bg-center mt-10"
        style={{ backgroundImage: `url(${newBgImage})` }}
      ></section>
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
