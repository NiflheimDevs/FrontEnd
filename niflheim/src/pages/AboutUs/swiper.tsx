import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import kia from "../../assets/kia2.jpg";
import sob from "../../assets/sob.jpg";
import saman from "../../assets/saman.jpg";
import parsa from "../../assets/parsa.jpg";
import mmd from "../../assets/mmd.jpg";
import ali from "../../assets/ali.jpg";
import { motion } from "framer-motion";

const people = [
  {
    id: 1,
    name: "کیارش",
    image: kia,
    description: "Real coder, top-ranked in programming competitions, also my bro.",
  },
  {
    id: 2,
    name: "سبحان",
    image: sob,
    description: "A passionate developer who loves working with Redux & React, he as well.",
  },
  {
    id: 3,
    name: "سامان",
    image: saman,
    description: "Always bringing creative ideas and feedback to the table., big brain and nose",
  },
  {
    id: 4,
    name: "پارسا",
    image: parsa,
    description: "Skilled UI/UX designer with a keen eye for Figma details. good robot guy",
  },
  {
    id: 5,
    name: "امیر محمد",
    image: mmd,
    description: "Skilled UI/UX designer with a keen eye for Figma details., big nose and work",
  },
  {
    id: 6,
    name: "ali",
    image: ali,
    description: "best at everything whatever he does he is the king and yeah., im the best",
  },
];

const SwiperSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center py-16 ">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        تیم ما
      </motion.h2>

      <div className="relative w-full max-w-5xl">
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
          className="py-6"
        >
          {people.map((person) => (
            <SwiperSlide key={person.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full text-center p-8 border rounded-3xl  bg-white transition-all duration-300"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="rounded-full mx-auto w-32 h-32 mb-4  border-4 border-gray-300 hover:border-gray-500 transition-all duration-300"
                />
                <h3 className="text-2xl font-semibold text-gray-800">
                  {person.name}
                </h3>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed px-4">
                  {person.description}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SwiperSection;
