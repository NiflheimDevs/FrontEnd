import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import kia from "../../assets/aboutus/kia2.jpg";
import sob from "../../assets/aboutus/sob.jpg";
import saman from "../../assets/aboutus/saman.jpg";
import parsa from "../../assets/aboutus/parsa.jpg";
import mmd from "../../assets/aboutus/mmd.jpg";
import ali from "../../assets/aboutus/ali.jpg";
import { motion } from "framer-motion";

const people = [
  {
    id: 1,
    name: "کیارش",
    image: kia,
    description:
      "Real coder, top-ranked in programming competitions, also my bro.",
    instagram: "https://www.instagram.com/k14s0h/",
    linkedin: "https://www.linkedin.com/in/kiarash-sohrabi-687101278/",
  },
  {
    id: 2,
    name: "سبحان",
    image: sob,
    description:
      "A passionate developer who loves working with Redux & React, he as well.",
    instagram: "https://www.instagram.com/paincarrier0_0/",
    linkedin: "https://www.linkedin.com/in/sobhan-ranjbar-8270b718a",
  },
  {
    id: 3,
    name: "سامان",
    image: saman,
    description:
      "Always bringing creative ideas and feedback to the table., big brain and nose",
    instagram: "https://www.instagram.com/samansayad___/",
    linkedin: "https://www.linkedin.com/in/samansayadfaal",
  },
  {
    id: 4,
    name: "پارسا",
    image: parsa,
    description:
      "Skilled UI/UX designer with a keen eye for Figma details. good robot guy",
    instagram:
      "www.instagram.com/parsasamieee",
    linkedin:
      "https://www.linkedin.com/in/parsa-samiee-1500b5254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    id: 5,
    name: "امیر محمد",
    image: mmd,
    description:
      "Skilled UI/UX designer with a keen eye for Figma details., big nose and work",
    instagram: "https://www.instagram.com/amir_m_4163/",
    linkedin: "https://www.linkedin.com/in/amir-mohammad-mohammadi-b593b8312/",
  },
  {
    id: 6,
    name: "علی",
    image: ali,
    description:
      "best at everything whatever he does he is the king and yeah., im the best",
    instagram: "https://www.instagram.com/gholamiali41382/",
    linkedin: "https://www.linkedin.com/in/ali-gholami-909113350/",
  },
];

const SwiperSection: React.FC = () => {
  return (
    <section className="flex flex-col bg-transparent items-center justify-center py-16 ">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 mb-8 rounded-full"
      >
        تیم ما
      </motion.h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="relative w-full max-w-5xl py-12"
      >
        {people.map((person) => (
          <SwiperSlide key={person.id}>
            <motion.div
              whileHover={{ zIndex: 10 }}
              className="relative w-full text-center p-8 border rounded-3xl bg-[#e5e5e5] transition-all duration-300"
            >
              <img
                src={person.image}
                alt={person.name}
                className="rounded-full mx-auto w-32 h-32 mb-4 border-4 border-gray-300 hover:border-blue-600 transition-all duration-300"
              />
              <h3 className="text-2xl font-semibold bg-gradient-to-l from-blue-600 to-blue-300 text-transparent bg-clip-text">
                {person.name}
              </h3>
              <p className="text-gray-700 mt-3 text-sm leading-relaxed px-4">
                {person.description}
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href={person.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-pink-500 text-2xl hover:text-pink-700 transition-all duration-300" />
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-blue-500 text-2xl hover:text-blue-700 transition-all duration-300" />
                </a>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SwiperSection;
