import { useState, useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Search } from "lucide-react";
import bg from "../../assets/Main/bg.png";
// import Frame from "../../assets/Main/Frame.png";
import bg1 from "../../assets/Main/bg1.jpg";
import bg2 from "../../assets/Main/bg2.jpg";
import bg3 from "../../assets/Main/bg3.jpg";
import bg4 from "../../assets/Main/bg4.jpg";
import Skill from "../../assets/Main/Skill.png";
import Fee from "../../assets/Main/Fee.png";
import Best from "../../assets/Main/best.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "../../../node_modules/swiper/swiper.css";
import "../../../node_modules/swiper/modules/pagination.css";
import "../../../node_modules/swiper/modules/navigation.css";
// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

const MainContent = () => {
  const heroStyle = {
    height: `calc(100vh - 76px)`,
  };
  const categoriesRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    {
      title: "WEB DEVELOPMENT",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/source-code.png",
      bg: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=400&q=80",
      overlay: "from-purple-700 to-blue-600",
    },
    {
      title: "LOGO DESIGN",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/design.png",
      bg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      overlay: "from-blue-400 to-blue-600",
    },
    {
      title: "SEO",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/graph-report.png",
      bg: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=400&q=80",
      overlay: "from-green-400 to-teal-600",
    },
    {
      title: "VIDEO EDITING",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/video-editing.png",
      bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCuqO8ywpvhcuxTyXhDjQzV7M1r7pOFSRCggXAmw5_hBsNMVzY-KTFOAK597LoN3GjkmU&usqp=CAU",
      overlay: "from-purple-700 to-pink-600",
    },
  ];

  const freelancerCards = [
    {
      projectname: "طراحی UI/UX",
      description: "طراح UI/UX برای اندروید و IOS",
      price: "5,000,000",
      image: bg1,
    },
    {
      projectname: "سایت فروش آنلاین",
      description: "فروشگاه آنلاین برای فروش لوازم خانگی",
      price: "45,000,000",
      image: bg2,
    },
    {
      projectname: "سایت تولید محتوا",
      description: "سایتی برای تولد محتوای خبری",
      price: "7,000,000",
      image: bg3,
    },
    {
      projectname: "نرم افزار وضعیت آب و هوا",
      description: "ساخت اپ موبایل برای نمایش آب و هوا",
      price: "340,000",
      image: bg4,
    },
  ];

  const trendingFreelancers = [
    {
      name: "Abinesh Jino",
      role: "UI/UX Designer",
      image: "https://unsplash.com/photos/m_HRfLhgABo/download?force=true",
    },
    {
      name: "Hrithik Tiwari",
      role: "Blockchain Developer",
      image: "https://unsplash.com/photos/5fNmWej4tAA/download?force=true",
    },
    {
      name: "Helen",
      role: "Data Scientist",
      image: "https://unsplash.com/photos/Mf23RF8xArY/download?force=true",
    },
    {
      name: "Max",
      role: "Frontend Developer",
      image: "https://unsplash.com/photos/1K9T5YiZ2WU/download?force=true",
    },
    {
      name: "Sara",
      role: "Backend Developer",
      image: "https://unsplash.com/photos/Im7lZjxeLhg/download?force=true",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const freelancersPerPage = 3;
  const indexOfLastFreelancer = currentPage * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = trendingFreelancers.slice(
    indexOfFirstFreelancer,
    indexOfLastFreelancer
  );
  const totalPages = Math.ceil(trendingFreelancers.length / freelancersPerPage);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section
        className="w-full flex flex-col justify-center items-center px-2 text-white text-center bg-cover bg-center"
        style={{ ...heroStyle, backgroundImage: `url(${bg})` }}
      >
        <h1 className="sm:text-[46px] md:text-[56px] text-[36px] duration-300 transition-all ease-in-out font-extrabold drop-shadow-lg">
          <span className="flex justify-center">کارفرما و فریلنسر</span>
          <span className="block">یک کلیک تا همکاری!</span>
        </h1>
        <div className="relative w-full max-w-[39rem] mt-6 md:mx-auto px-6 duration-300 transition-all ease-in-out">
          <input
            type="text"
            placeholder="جستجو"
            className="w-full py-4 pr-14 pl-6 rounded-full bg-gray-300 hover:bg-gray-200 text-black shadow-md focus:outline-none duration-300 transition-all ease-in-out"
          />
          <button className="absolute right-13 top-1/2 -translate-y-1/2 text-gray-600">
            <Search size={24} />
          </button>
        </div>
      </section>

      {/* Categories */}
      <section ref={categoriesRef} className="w-full py-12 rounded-3xl mt-12">
        <div className="hidden md:flex sm:flex flex-row flex-wrap justify-center gap-8 px-6 mx-auto">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer rounded-xl overflow-hidden h-48 flex items-center justify-center text-center shadow-lg group hover:scale-105 transition min-w-[260px]"
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
            modules={[Pagination]}
            className="mySwiper rounded-xl shadow-md hover:shadow-xl duration-300 ease-in-out transition-all"
          >
            {categories.map((cat, idx) => (
              <SwiperSlide
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl duration-300 ease-in-out transition-all"
              >
                <div className="relative cursor-pointer mb-7 mt-1.5 mx-1.5 rounded-xl overflow-hidden h-48 flex items-center justify-center text-center shadow-lg group">
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Freelancer Cards */}
      <section className="w-full py-12 rounded-3xl">
        <div className="flex justify-between items-center px-6 max-w-7xl mx-auto mb-6">
          <h2 className="md:text-2xl sm:text-2xl text-[18px] font-bold text-[#333] duration-300 ease-in-out transition-all">
            جدیدترین پروژه ها
          </h2>
          <Link
            to="/"
            className="bg-blue-600 text-white md:px-6 sm:px-6 px-4 py-2 rounded-full hover:bg-blue-700 duration-300 ease-in-out transition-all text-sm font-medium"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="md:flex sm:flex hidden flex-wrap justify-center gap-8 px-6 max-w-7xl mx-auto">
          {freelancerCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-xl duration-300 ease-in-out transition-all flex flex-col relative w-[calc(82%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(25%-1.5rem)] min-w-[260px]"
            >
              <img
                src={
                  card.image ||
                  `https://source.unsplash.com/400x300/?freelancer,design,${idx}`
                }
                alt={card.projectname}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4 pb-14">
                <h4 className="text-sm text-right text-gray-600">
                  {card.projectname}
                </h4>
                <p className="text-md text-right font-medium mt-2">
                  {card.description}
                </p>
              </div>
              <div className="text-right pb-3 px-4">
                <p className="text-lg font-bold text-blue-600">
                  {card.price} تومان
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden sm:hidden px-6">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper rounded-xl shadow-md hover:shadow-xl duration-300 ease-in-out transition-all"
          >
            {freelancerCards.map((card, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white flex flex-col relative min-w-[350px]">
                  <img
                    src={
                      card.image ||
                      `https://source.unsplash.com/400x300/?freelancer,design,${idx}`
                    }
                    alt={card.projectname}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4 pb-2">
                    <h4 className="text-md text-right text-gray-600">
                      {card.projectname}
                    </h4>
                    <p className="text-sm text-right font-medium mt-2">
                      {card.description}
                    </p>
                  </div>
                  <div className="text-right mb-4  p-4">
                    <p className="text-lg font-bold text-blue-600">
                      {card.price}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section
        className="w-full py-25 text-white text-center mt-8 mb-8"
        style={{
          backgroundImage: `url(${Frame})`,
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="flex justify-center">همیشه در جریان جدیدترین</span>
          <span className="block">فرصت‌ها و اخبار ما باشید 🚀</span>
        </h2>
        <div className="relative max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-black py-4 text-left px-6 rounded-full text-black focus:outline-none"
          />
          <button className="absolute right-[1px] bottom-[1px] top-[1px] bg-blue-500 text-white font-bold px-6 rounded-full hover:bg-blue-700 transition">
            Subscribe
          </button>
        </div>
      </section> */}

      {/* Trending Freelancers */}
      <section className="w-full md:mb-24 mb-12 py-10">
        <div className="hidden md:block px-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-right mb-12 text-[#333]">
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
                  className="bg-[#f0f0f0] rounded-lg overflow-hidden shadow"
                >
                  <img
                    src={freelancer.image}
                    alt={freelancer.name}
                    className="w-full h-72 object-cover"
                  />
                  <div className="flex items-center justify-between px-4 py-3">
                    <BsArrowRight className="text-blue-500" size={26} />
                    <div>
                      <h3 className="text-xl text-left font-semibold text-[#333]">
                        {freelancer.name}
                      </h3>
                      <p className="text-sm text-left text-[#888]">
                        {freelancer.role}
                      </p>
                    </div>
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
            modules={[Pagination]}
            className="mySwiper rounded-xl shadow-md hover:shadow-xl duration-300 ease-in-out transition-all"
          >
            {trendingFreelancers.map((freelancer, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-lg overflow-hidden shadow">
                  <img
                    src={freelancer.image}
                    alt={freelancer.name}
                    className="w-full h-72 object-cover"
                  />
                  <div className="flex items-center justify-between px-4 py-3">
                    <BsArrowRight className="text-blue-500" size={26} />
                    <div>
                      <h3 className="text-xl text-left font-semibold text-[#333]">
                        {freelancer.name}
                      </h3>
                      <p className="text-sm text-left text-[#888]">
                        {freelancer.role}
                      </p>
                    </div>
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
                currentPage === index + 1 ? "bg-blue-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Benefits */}
        <div className="flex justify-center w-full px-4 mt-25 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-[1440px]">
            {[
              {
                icon: Skill,
                title: "مهارت‌های کاربردی",
                description:
                  "یادگیری روش‌ها، فرایندها و بهترین شیوه‌ها برای بهبود فوری عملکرد شما",
              },
              {
                icon: Best,
                title: "یادگیری از بهترین‌ها",
                description:
                  "دوره‌هایی با نیازهای حرفه‌ای شما طراحی شده و توسط متخصصان منتخب صنعت ارائه می‌شوند",
              },
              {
                icon: Fee,
                title: "بدون هزینه اشتراک",
                description:
                  "فقط برای دوره‌هایی که می‌خواهید پرداخت کنید، بدون هزینه‌های ماهانه. هزینه را از قبل بدانید",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <img
                  src={benefit.icon}
                  alt={benefit.title}
                  className="w-12 h-12 mb-4"
                />
                <h3 className="text-[20px] font-semibold text-[#252525] leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-[16px] font-normal text-[#9D9D9D] mt-2 max-w-xs">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
