import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import kia from "../../assets/aboutus/kia2.jpg";
import sob from "../../assets/aboutus/sob.jpg";
import saman from "../../assets/aboutus/saman.jpg";
import parsa from "../../assets/aboutus/parsa.jpg";
import mmd from "../../assets/aboutus/mmd.jpg";
import ali from "../../assets/aboutus/ali.jpg";

interface Person {
  id: number;
  name: string;
  image: string;
  description: string;
  instagram: string;
  linkedin: string;
}

const people: Person[] = [
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

interface TeamMemberCardProps {
  person: Person;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ person }) => (
  person.id === 4 ? (
    <a href="/profile/3" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-[#e5e5e5] dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl shadow-md flex flex-col items-center space-y-2 w-full hover:scale-105 transform duration-300"
      >
        <img
          src={person.image}
          alt={`تصویر ${person.name}`}
          className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 transition-all"
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
            className="hover:scale-110 transition-all duration-200"
            onClick={e => e.stopPropagation()}
          >
            <FaInstagram className="text-pink-500 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-600 text-lg" />
          </a>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn ${person.name}`}
            className="hover:scale-110 transition-all duration-200"
            onClick={e => e.stopPropagation()}
          >
            <FaLinkedin className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-600 text-lg" />
          </a>
        </div>
      </motion.div>
    </a>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-[#e5e5e5] dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl shadow-md flex flex-col items-center space-y-2 w-full hover:scale-105 transform duration-300"
    >
      <img
        src={person.image}
        alt={`تصویر ${person.name}`}
        className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 transition-all"
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
          className="hover:scale-110 transition-all duration-200"
        >
          <FaInstagram className="text-pink-500 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-600 text-lg" />
        </a>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn ${person.name}`}
          className="hover:scale-110 transition-all duration-200"
        >
          <FaLinkedin className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-600 text-lg" />
        </a>
      </div>
    </motion.div>
  )
);

const TeamSection: React.FC = () => {
  return (
    <section className="py-12 bg-transparent">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center"
      >
        تیم ما
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
        {people.map((person) => (
          <TeamMemberCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;