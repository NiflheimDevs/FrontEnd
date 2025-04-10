import { useState, useRef, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Search } from "lucide-react";
import bg from "../../assets/Main/bg.png";
import Frame from "../../assets/Main/Frame.png";
import Skill from "../../assets/Main/Skill.png";
import Fee from "../../assets/Main/Fee.png";
import Best from "../../assets/Main/best.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MainContent = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = (e: any) => {
      e.preventDefault();
      if (categoriesRef.current) {
        const targetPosition =
          categoriesRef.current.getBoundingClientRect().top + window.scrollY;
        const offset = 45; // Adjust this value (e.g., 30-40 pixels less)
        window.scrollTo({
          top: targetPosition - offset,
          behavior: "smooth",
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

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
      username: "ghasemianm70",
      description: "Mobile app design UI/UX for Android and iOS",
      price: "£50.00",
      image: "https://unsplash.com/photos/1SAnrIxw5OY/download?force=true",
    },
    {
      username: "hamid_shari",
      description: "UI UX and ad design in Figma",
      price: "£45.00",
      image: "https://unsplash.com/photos/m_HRfLhgABo/download?force=true",
    },
    {
      username: "freelanceDigital",
      description: "Mobile app UI/UX design in Figma",
      price: "£70.00",
      image: "https://unsplash.com/photos/1K9T5YiZ2WU/download?force=true",
    },
    {
      username: "shahrokhian",
      description: "Awesome Play Store screenshots for your app",
      price: "£34.00",
      image: "https://unsplash.com/photos/4hbJ-eymZ1o/download?force=true",
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
    <main className="flex flex-col items-center w-full mt-18">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="w-full h-[660px] flex flex-col justify-center items-center text-white text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="text-[40px] md:text-[56px] font-extrabold drop-shadow-lg">
          <span className="flex justify-center">کارفرما و فریلنسر</span>
          <span className="block">یک کلیک تا همکاری!</span>
        </h1>
        <div className="relative w-full max-w-xl mt-6 mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-4 pr-14 pl-6 rounded-full bg-gray-300 hover:bg-gray-100 text-black shadow-md focus:outline-none"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
            <Search size={24} />
          </button>
        </div>
      </section>

      {/* Categories */}
      <section
        ref={categoriesRef}
        className="w-full py-12 rounded-3xl mt-8 mb-8"
      >
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer rounded-xl overflow-hidden h-48 flex items-center justify-center text-center shadow-lg group hover:scale-105 transition"
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
        <div className="md:hidden px-6">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {categories.map((cat, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative cursor-pointer rounded-xl overflow-hidden h-48 flex items-center justify-center text-center shadow-lg group">
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
      <section className="w-full py-16 rounded-3xl mb-10">
        <div className="flex justify-between items-center px-6 max-w-7xl mx-auto mb-6">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition text-sm font-medium"
          >
            مشاهده همه
          </Link>
          <h2 className="text-2xl font-bold text-[#333]">Featured Projects</h2>
        </div>

        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
          {freelancerCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col relative"
              style={{ minHeight: "350px" }}
            >
              <img
                src={
                  card.image ||
                  `https://source.unsplash.com/400x300/?freelancer,design,${idx}`
                }
                alt={card.username}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4 pb-14">
                <h4 className="text-sm text-left text-gray-600">
                  @{card.username}
                </h4>
                <p className="text-md text-left font-medium mt-2">
                  {card.description}
                </p>
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="text-lg font-bold text-blue-600">{card.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden px-6">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {freelancerCards.map((card, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col relative"
                  style={{ minHeight: "350px" }}
                >
                  <img
                    src={
                      card.image ||
                      `https://source.unsplash.com/400x300/?freelancer,design,${idx}`
                    }
                    alt={card.username}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4 pb-14">
                    <h4 className="text-sm text-left text-gray-600">
                      @{card.username}
                    </h4>
                    <p className="text-md text-left font-medium mt-2">
                      {card.description}
                    </p>
                  </div>
                  <div className="absolute bottom-4 left-4">
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
      <section
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
      </section>

      {/* Trending Freelancers */}
      <section className="w-full mb-20 mt-8 py-20">
        <h2 className="text-[36px] font-bold text-center mb-12 text-[#222]">
          🔥 Trending Freelancers
        </h2>

        <div className="hidden md:block px-6 max-w-7xl mx-auto">
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
            className="mySwiper"
          >
            {trendingFreelancers.map((freelancer, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#f0f0f0] rounded-lg overflow-hidden shadow">
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
        <div className="flex justify-center w-full px-4 mt-20 mb-20">
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
