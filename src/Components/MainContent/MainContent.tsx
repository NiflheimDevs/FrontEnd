/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { BsArrowLeft, BsCashCoin } from "react-icons/bs";
import { FaChartColumn, FaPeopleGroup, FaMedal } from "react-icons/fa6";
import { Search } from "lucide-react";
import bg from "../../assets/Main/bg.png";
import bgDark from "../../assets/Main/bgDark.png";
import sourcecode from "../../assets/Main/source-code.png";
import design from "../../assets/Main/design.png";
import graphreport from "../../assets/Main/graph-report.png";
import videoedit from "../../assets/Main/video-editing.png";
import VideoEditing from "../../assets/Main/VIDEOEDITING.jpg";
import Seo from "../../assets/Main/SEO.jpg";
import LogoDesign from "../../assets/Main/LOGODESIGN.jpg";
import WebDevelopment from "../../assets/Main/WEBDEVELOPMENT.jpg";
import image1 from "../../assets/Main/image1.webp";
import image2 from "../../assets/Main/image2.webp";
import image3 from "../../assets/Main/image3.webp";
import image4 from "../../assets/Main/image4.webp";
import image5 from "../../assets/Main/image5.webp";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { GetLandingProjects } from "../../API";
import "../../../node_modules/swiper/swiper.css";
import "../../../node_modules/swiper/modules/pagination.css";
import "../../../node_modules/swiper/modules/navigation.css";
import "../../../node_modules/swiper/modules/autoplay.css";
import { ReactElement } from "react";

// تعریف اینترفیس برای ProjectCard
interface ProjectCard {
  project_id: number;
  projectname: string;
  description: string;
  price: string;
  image: ReactElement;
}

const MainContent = () => {
  const heroStyle = {
    height: `calc(100vh)`,
    minHeight: `450px`,
  };
  const categoriesRef = useRef<HTMLDivElement | null>(null);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const categories = [
    {
      title: "توسعه وب",
      icon: sourcecode,
      bg: WebDevelopment,
      overlay: "from-purple-700 to-blue-600",
    },
    {
      title: "طراحی لوگو",
      icon: design,
      bg: LogoDesign,
      overlay: "from-blue-400 to-blue-600",
    },
    {
      title: "سئو",
      icon: graphreport,
      bg: Seo,
      overlay: "from-green-400 to-teal-600",
    },
    {
      title: "تدوین",
      icon: videoedit,
      bg: VideoEditing,
      overlay: "from-purple-700 to-pink-600",
    },
  ];

  const [projectCards, setProjectCards] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // تابع برای تعیین مدال بر اساس label
  const getMedalIcon = (label: string): ReactElement => {
    switch (label) {
      case "Urgent":
        return <FaMedal size={22} color="#FFD700" />;
      case "Bold":
        return <FaMedal size={22} color="#A6A6A6" />;
      case "Free":
        return <FaMedal size={22} color="#CD7F32" />;
      default:
        return <FaMedal size={22} color="#A6A6A6" />;
    }
  };

  // فراخوانی API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await GetLandingProjects();
        const formattedProjects: ProjectCard[] = response.map(
          (project: any) => ({
            project_id: project.project_id,
            projectname: project.title || "بدون عنوان",
            description: project.descriptoin || "بدون توضیحات",
            price: project.price || "نامشخص",
            image: getMedalIcon(project.label),
          })
        );
        setProjectCards(formattedProjects);
      } catch (err) {
        setError("خطا در دریافت پروژه‌ها");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const trendingFreelancers = [
    {
      name: "پارسا",
      role: "طراح UI/UX",
      image: image1,
    },
    {
      name: "سامان",
      role: "توسعه دهنده بلاک چین",
      image: image2,
    },
    {
      name: "علی",
      role: "محقق دیتا",
      image: image3,
    },
    {
      name: "امیرمحمد",
      role: "توسعه دهنده فرانت اند",
      image: image4,
    },
    {
      name: "کیا",
      role: "توسعه دهنده بک اند",
      image: image5,
    },
  ];

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const handleDarkModeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Listen for changes in dark mode
    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    handleDarkModeChange();

    return () => observer.disconnect();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const freelancersPerPage = 3;
  const indexOfLastFreelancer = currentPage * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = trendingFreelancers.slice(
    indexOfFirstFreelancer,
    indexOfLastFreelancer
  );
  const totalPages = Math.ceil(trendingFreelancers.length / freelancersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="flex flex-col items-center w-full bg-white dark:bg-gray-800">
      {/* Hero Section */}
      <section
        className="w-full flex flex-col justify-center items-center px-2 text-white text-center bg-cover bg-center"
        style={{
          ...heroStyle,
          backgroundImage: `url(${isDarkMode ? bgDark : bg})`,
        }}
      >
        <h1 className="sm:text-[46px] md:text-[56px] text-[36px] duration-300 transition-all ease-in-out font-extrabold drop-shadow-lg">
          <span className="flex justify-center">کارفرما و فریلنسر</span>
          <span className="block">یک کلیک تا همکاری!</span>
        </h1>
        <div className="relative w-full max-w-[39rem] mt-6 md:mx-auto px-6 duration-300 transition-all ease-in-out">
          <input
            type="text"
            placeholder="جستجو"
            className="w-full py-4 pr-14 pl-6 rounded-full bg-gray-300 hover:bg-gray-200 text-black dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 dark:placeholder-gray-300 focus:outline-none duration-300 transition-all ease-in-out"
          />
          <button className="absolute right-13 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-200">
            <Search size={24} />
          </button>
        </div>
      </section>

      {/* Categories */}
      <section
        ref={categoriesRef}
        className="w-full py-12 rounded-3xl mt-12 bg-white dark:bg-gray-800"
      >
        <div className="hidden md:flex sm:flex flex-row flex-wrap justify-center gap-8 px-6 mx-auto">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer rounded-xl overflow-hidden h-48 flex items-center justify-center text-center shadow-lg group hover:scale-105 transition-all ease-in-out duration-300 min-w-[260px]"
            >
              <img
                src={cat.bg}
                alt={cat.title}
                className="absolute w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.overlay} opacity-70`}
              ></div>
              <div className="z-10 flex flex-col items-center justify-center text-white px-2">
                <img
                  src={cat.icon}
                  alt={cat.title}
                  className="w-10 h-10 mb-2"
                />
                <h3 className="text-sm font-bold tracking-wide uppercase">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden sm:hidden px-6">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            className="mySwiper rounded-xl shadow-lg"
          >
            {categories.map((cat, idx) => (
              <SwiperSlide
                key={idx}
                className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg duration-300 ease-in-out transition-all"
              >
                <div className="relative cursor-pointer rounded-xl overflow-hidden h-48 flex items-center justify-center text-center group">
                  <img
                    src={cat.bg}
                    alt={cat.title}
                    loading="lazy"
                    className="absolute w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.overlay} opacity-70`}
                  ></div>
                  <div className="z-10 flex flex-col items-center justify-center text-white px-2">
                    <img
                      src={cat.icon}
                      alt={cat.title}
                      className="w-10 h-10 mb-2"
                    />
                    <h3 className="text-sm font-bold tracking-wide uppercase">
                      {cat.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Project Cards */}
      <section className="w-full py-12 rounded-3xl bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center px-6 max-w-7xl mx-auto mb-6">
          <h2 className="md:text-2xl sm:text-2xl text-[18px] font-bold text-gray-800 dark:text-gray-200">
            جدیدترین پروژه‌ها
          </h2>
          <Link
            to="/Browseproject"
            className="bg-blue-600 text-white md:px-6 sm:px-6 px-4 py-2 rounded-full hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 duration-300 ease-in-out transition-all text-sm font-medium"
          >
            مشاهده همه
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            در حال بارگذاری...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : projectCards.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            هیچ پروژه‌ای یافت نشد
          </p>
        ) : (
          <>
            <div className="md:flex sm:flex hidden flex-wrap justify-center gap-8 px-6 max-w-7xl mx-auto">
              {projectCards.map((card) => (
                <Link
                  to={`/detail/${card.project_id}`}
                  key={card.project_id}
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg flex flex-col relative w-[calc(82%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(25%-1.5rem)] min-w-[260px] transition-all duration-300"
                >
                  <div className="w-full px-2 pt-2">{card.image}</div>
                  <div className="p-4 pb-9 flex flex-col">
                    <h4 className="text-[18px] text-right font-medium flex flex-wrap text-gray-800 dark:text-gray-200">
                      {card.projectname}
                    </h4>
                    <p className="text-sm text-right mt-2 text-gray-600 dark:text-gray-300 flex flex-wrap">
                      {truncateText(card.description, 200)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="md:hidden sm:hidden px-6">
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Pagination, Autoplay]}
                className="mySwiper rounded-xl shadow-lg bg-gray-100 dark:bg-gray-700 "
              >
                {projectCards.map((card) => (
                  <SwiperSlide
                    key={card.project_id}
                    className="rounded-xl h-full"
                  >
                    <Link
                      to={`/detail/${card.project_id}`}
                      className="flex flex-col relative"
                    >
                      <div className="w-full px-2 pt-2">{card.image}</div>
                      <div className="p-4 pb-2 flex flex-col">
                        <h4 className="text-[18px] text-right font-medium flex flex-wrap text-gray-800 dark:text-gray-200">
                          {card.projectname}
                        </h4>
                        <p className="text-sm text-right text-gray-600 dark:text-gray-300 mt-2 flex flex-wrap">
                          {truncateText(card.description, 200)}
                        </p>
                        <p className="my-4"></p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
      </section>

      {/* Trending Freelancers */}
      <section className="w-full md:mb-24 mb-12 py-10 bg-white dark:bg-gray-800">
        <div className="hidden md:block px-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-right mb-12 text-gray-800 dark:text-gray-200">
            فریلنسرهای محبوب 🔥
          </h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {currentFreelancers.map((freelancer, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={freelancer.image}
                    alt={freelancer.name}
                    className="w-full h-72 object-cover"
                  />
                  <div className="flex items-center justify-between px-4 py-3">
                    <div>
                      <h3 className="text-xl text-right font-semibold text-gray-800 dark:text-gray-200">
                        {freelancer.name}
                      </h3>
                      <p className="text-sm text-right text-gray-600 dark:text-gray-300">
                        {freelancer.role}
                      </p>
                    </div>
                    <BsArrowLeft
                      className="text-blue-500 dark:text-blue-400 cursor-pointer"
                      size={26}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="md:hidden px-6">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            className="mySwiper rounded-xl shadow-lg"
          >
            {trendingFreelancers.map((freelancer, index) => (
              <SwiperSlide
                key={index}
                className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg"
              >
                <div className="relative overflow-hidden pointer-events-none">
                  <img
                    src={freelancer.image}
                    alt={freelancer.name}
                    loading="lazy"
                    className="w-full h-72 object-cover"
                  />
                  <div className="flex items-center justify-between px-4 py-3 mb-8">
                    <div>
                      <h3 className="text-xl text-right font-semibold text-gray-800 dark:text-gray-200">
                        {freelancer.name}
                      </h3>
                      <p className="text-sm text-right text-gray-600 dark:text-gray-300">
                        {freelancer.role}
                      </p>
                    </div>
                    <BsArrowLeft
                      className="text-blue-500 dark:text-blue-400 cursor-pointer"
                      size={26}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden md:flex justify-center mt-10">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-2 cursor-pointer rounded-full mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-600 dark:bg-blue-500"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Benefits */}
        <div className="flex justify-center w-full px-4 mt-25">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full md:scale-97 sm:scale-95 scale-93 ease-in-out duration-300 transition-all max-w-[1440px]">
            <div className="flex flex-col items-center text-center">
              <BsCashCoin
                size={117}
                color="#808080"
                className="dark:text-gray-300"
              />
              <h3 className="text-[20px] mt-2 font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                قیمت‌گذاری مناسب
              </h3>
              <p className="text-[16px] font-normal text-gray-600 dark:text-gray-300 mt-2 max-w-xs">
                با سیستم مناقصه، مناسب‌ترین قیمت رو برای انجام هر پروژه پیدا کن!
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaPeopleGroup
                size={117}
                color="#808080"
                className="dark:text-gray-300"
              />
              <h3 className="text-[20px] mt-2 font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                جمعی برای بهترین‌ها
              </h3>
              <p className="text-[16px] font-normal text-gray-600 dark:text-gray-300 mt-2 max-w-xs">
                با بهترین افراد در هر حوزه آشنا شو و باهاشون ارتباط بگیر!
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaChartColumn
                size={117}
                color="#808080"
                className="dark:text-gray-300"
              />
              <h3 className="text-[20px] mt-2 font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                سنجش مهارت‌ها
              </h3>
              <p className="text-[16px] font-normal text-gray-600 dark:text-gray-300 mt-2 max-w-xs">
                مناسب‌ترین توانایی و مهارت رو بر اساس نیازمندی انتخاب کن!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
