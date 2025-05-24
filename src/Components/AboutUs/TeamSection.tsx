/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

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
    description: "طراح UI/UX با چشمی تیز برای جزئیات Figma، کار زیاد.",
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

const TeamMemberCard = ({ person }: { person: any }) => (
  <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <img
      src={person.image}
      alt={`تصویر ${person.name}`}
      className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200 dark:border-gray-600 object-cover transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400"
    />
    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-4 text-center">
      {person.name}
    </h3>
    <p className="text-base text-gray-700 dark:text-gray-300 mt-2 text-center leading-relaxed">
      {person.description}
    </p>
    <div className="flex justify-center gap-4 mt-4">
      <a
        href={person.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram ${person.name}`}
      >
        <FaInstagram className="text-pink-500 dark:text-pink-400 text-2xl hover:text-pink-700 dark:hover:text-pink-600 hover:scale-110 transition-all duration-200" />
      </a>
      <a
        href={person.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`LinkedIn ${person.name}`}
      >
        <FaLinkedin className="text-blue-500 dark:text-blue-400 text-2xl hover:text-blue-700 dark:hover:text-blue-600 hover:scale-110 transition-all duration-200" />
      </a>
    </div>
  </div>
);

const TeamSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800 flex flex-col items-center">
      <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-200 mb-12 text-center">
        تیم ما
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4 max-w-7xl">
        {people.map((person) => (
          <TeamMemberCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
