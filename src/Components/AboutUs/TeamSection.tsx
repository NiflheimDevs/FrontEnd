import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

import kia from "../../assets/aboutus/kia2.jpg";
import sob from "../../assets/aboutus/sob.jpg";
import saman from "../../assets/aboutus/saman.jpg";
import parsa from "../../assets/aboutus/parsa.jpg";
import mmd from "../../assets/aboutus/mmd.jpg";
import ali from "../../assets/aboutus/ali.jpg";

const people = [
  {
    id: 1,
    name: "کیارش",
    image: kia,
    description:
      "کدنویس واقعی، رتبه برتر در مسابقات برنامه‌نویسی، همچنین برادرم.",
    instagram: "https://www.instagram.com/k14s0h/",
    linkedin: "https://www.linkedin.com/in/kiarash-sohrabi-687101278/",
  },
  {
    id: 2,
    name: "سبحان",
    image: sob,
    description: "توسعه‌دهنده‌ای پرشور که عاشق کار با Redux و React است.",
    instagram: "https://www.instagram.com/paincarrier0_0/",
    linkedin: "https://www.linkedin.com/in/sobhan-ranjbar-8270b718a",
  },
  {
    id: 3,
    name: "سامان",
    image: saman,
    description:
      "همیشه ایده‌ها و بازخوردهای خلاقانه به میز می‌آورد، مغز بزرگ و بینی بزرگ.",
    instagram: "https://www.instagram.com/samansayad___/",
    linkedin: "https://www.linkedin.com/in/samansayadfaal",
  },
  {
    id: 4,
    name: "پارسا",
    image: parsa,
    description: "طراح UI/UX با چشمی تیز برای جزئیات Figma، پسر رباتیک خوب.",
    instagram: "https://www.instagram.com/parsasamieee",
    linkedin: "https://www.linkedin.com/in/parsa-samiee-1500b5254",
  },
  {
    id: 5,
    name: "امیر محمد",
    image: mmd,
    description:
      "طراح UI/UX با چشمی تیز برای جزئیات Figma، بینی بزرگ و کار زیاد.",
    instagram: "https://www.instagram.com/amir_m_4163/",
    linkedin: "https://www.linkedin.com/in/amir-mohammad-mohammadi-b593b8312/",
  },
  {
    id: 6,
    name: "علی",
    image: ali,
    description:
      "بهترین در همه چیز، هر کاری که می‌کند پادشاه است، بله، من بهترینم.",
    instagram: "https://www.instagram.com/gholamiali41382/",
    linkedin: "https://www.linkedin.com/in/ali-gholami-909113350/",
  },
];

const TeamMemberCard = ({
  person,
  alignRight,
}: {
  person: any;
  alignRight: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`w-full max-w-md p-5 bg-[#e5e5e5] rounded-xl shadow-md flex flex-col items-center space-y-3
      ${alignRight ? "ml-auto" : "mr-auto"}
    `}
  >
    <img
      src={person.image}
      alt={`تصویر ${person.name}`}
      className="w-24 h-24 rounded-full border-2 border-gray-300 hover:border-blue-600 transition-all"
    />
    <h3 className="text-lg font-semibold bg-blue-600 text-transparent bg-clip-text">
      {person.name}
    </h3>
    <p className="text-sm text-gray-700 text-center">{person.description}</p>
    <div className="flex gap-3">
      <a
        href={person.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram ${person.name}`}
      >
        <FaInstagram className="text-pink-500 hover:text-pink-700 text-xl" />
      </a>
      <a
        href={person.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`LinkedIn ${person.name}`}
      >
        <FaLinkedin className="text-blue-500 hover:text-blue-700 text-xl" />
      </a>
    </div>
  </motion.div>
);

const TeamSection: React.FC = () => {
  return (
    <section className="py-16 flex flex-col items-center bg-transparent">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-gray-900 mb-10"
      >
        تیم ما
      </motion.h2>
      <div className="flex flex-col gap-8 w-full px-4 max-w-5xl">
        {people.map((person, index) => (
          <TeamMemberCard
            key={person.id}
            person={person}
            alignRight={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;


