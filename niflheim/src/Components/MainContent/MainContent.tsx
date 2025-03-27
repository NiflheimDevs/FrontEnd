import bg from "./bg.png";
import Frame from "./Frame.png";
import Skill from "./Skill.png";
import Fee from "./Fee.png";
import Best from "./best.png";
import Free1 from "./Free1.png";
import Free2 from "./Free2.png";
import Free3 from "./Free3.png";
import { BsArrowRight } from "react-icons/bs";
import { Search } from "lucide-react";
import React, { useState } from "react";

const MainContent = () => {
  const categories = [
    { title: "WEB DEVELOPMENT", icon: "web_dev_icon.svg" },
    { title: "DESIGN", icon: "design_icon.svg" },
    { title: "SEO", icon: "seo_icon.svg" },
    { title: "VIDEO EDITING", icon: "video_editing_icon.svg" },
  ];

  const freelancerCards = [
    {
      username: "ghasemianm70",
      description: "I will do mobile app design UI/UX for android and ios",
      price: "£50.00",
      image: "freelancer1.jpg",
    },
    {
      username: "hamid_shari",
      description: "I will do UI UX and ad design in figma",
      price: "£45.00",
      image: "freelancer2.jpg",
    },
    {
      username: "freelanceDigital",
      description: "I will do mobile app UI/UX design in figma",
      price: "£70.00",
      image: "freelancer3.jpg",
    },
    {
      username: "shahrokhian",
      description: "I will design awesome play store screenshots for your app",
      price: "£34.00",
      image: "freelancer4.jpg",
    },
  ];

  const trendingFreelancers = [
    { name: "Abinesh Jino", role: "UI/UX Designer", image: Free3 },
    { name: "Hrithik Tiwari", role: "Blockchain Dev", image: Free2 },
    { name: "Helen", role: "Data Scientist", image: Free1 },
    { name: "Helen", role: "Data Scientist", image: Free1 },
    { name: "Helen", role: "Data Scientist", image: Free1 },
    { name: "Helen", role: "Data Scientist", image: Free1 },
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="flex flex-col items-center w-full mt-[72px]">
      {/* Hero Section */}
      <section
        className="w-full flex flex-col gap-20 items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})`, height: "1040px" }}
      >
        <h1 className="text-[48px] md:text-[64px] w-[538px] h-[200px] text-black font-bold leading-tight">
          <span className="flex justify-center">کارفرما و فریلنسر</span>
          <span className="block">یک کلیک تا همکاری!</span>
        </h1>
        <div className="relative mt-6 w-3/4 md:w-[612px] bg-white rounded-full shadow-md">
          <input
            type="text"
            placeholder="جستجو"
            className="w-full py-4 pr-14 pl-4 rounded-full border-none focus:outline-none"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
            <Search size={24} />
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-11/12 max-w-6xl">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-white hover:bg-gray-50 transition-all duration-300"
            >
              <img
                src={`/path/to/${category.icon}`}
                alt={category.title}
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Freelancer Cards Section */}
      <section className="w-full py-12 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-11/12 max-w-6xl">
          {freelancerCards.map((freelancer, index) => (
            <div
              key={index}
              className="bg-white gap- rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={`/path/to/${freelancer.image}`}
                alt={freelancer.username}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h4 className="text-sm text-gray-600">
                  @{freelancer.username}
                </h4>
                <p className="text-md text-gray-800 mt-2 line-clamp-2">
                  {freelancer.description}
                </p>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  {freelancer.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        className="w-full py-16 flex justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Frame})`, height: "428px" }}
      >
        <div className="flex flex-col items-center w-11/12 max-w-3xl text-center">
          <p className="text-[32px] md:text-[40px] font-bold text-white">
            <span className="flex justify-center">همیشه در جریان جدیدترین</span>
            <span className="block">فرصت‌ها و اخبار ما باشید 🚀</span>
          </p>
          <div className="relative mt-8 w-full border md:w-[640px] bg-white">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full py-4 pr-14 pl-4 rounded-full border-none focus:outline-none text-gray-600 placeholder-gray-400 text-left"
            />
            <button className="absolute right-0 top-1/2 w-[216px] transform -translate-y-1/2 border bg-white text-[#62646A] px-6 py-4 font-semibold hover:bg-gray-100 transition">
              ارسال
            </button>
          </div>
        </div>
      </section>

      {/* Trending Freelancers Section */}
      <section className="w-full py-12 flex flex-col bg-[#EEEEEE]">
        <h2 className="text-[36px] font-extrabold text-left px-4 text-[#252525] mb-10">
          Trending FREELANCER
        </h2>
        <div className="flex justify-center w-full px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1440px]">
            {currentFreelancers.map((freelancer, index) => (
              <div
                key={index}
                className="w-full h-[450px] bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="w-full h-[360px] object-cover rounded-t-lg"
                />
                <div className="flex items-center justify-between p-4">
                  <button className="cursor-pointer">
                    <BsArrowRight
                      size={30}
                      className="text-blue-600 hover:text-blue-900 transition"
                    />
                  </button>
                  <div className="text-left">
                    <h3 className="text-[24px] font-medium text-[#252525] mb-1">
                      {freelancer.name}
                    </h3>
                    <p className="text-[18px] text-[#9D9D9D]">
                      {freelancer.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-[6px] rounded-2xl mx-1 ${
                currentPage === index + 1 ? "bg-blue-600" : "bg-gray-300"
              } hover:bg-blue-500 cursor-pointer transition-all duration-300`}
            />
          ))}
        </div>

        {/* Benefits Section */}
        <div className="flex justify-center w-full px-2 mt-25 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1440px]">
            <div className="text-left pl-5 pr-20">
              <img
                src={Skill}
                alt="Practical Skills"
                className="w-[32px] h-[32px]"
              />
              <div className="flex flex-col mt-4">
                <h3 className="text-[20px] font-semibold text-[#252525] leading-tight">
                  Practical skills
                </h3>
                <p className="text-[16px] font-normal text-[#9D9D9D] mt-2">
                  Learn proven methods, processes, and best practices to improve
                  your work immediately
                </p>
              </div>
            </div>
            <div className="text-left pl-5 pr-20">
              <img
                src={Best}
                alt="Learn from the Best"
                className="w-[32px] h-[32px]"
              />
              <div className="flex flex-col mt-4">
                <h3 className="text-[20px] font-semibold text-[#252525] leading-tight">
                  Learn from the best
                </h3>
                <p className="text-[16px] font-normal text-[#9D9D9D] mt-2">
                  Courses tailored for your professional needs, led by hand-picked industry experts
                </p>
              </div>
            </div>
            <div className="text-left pl-5 pr-18">
              <img
                src={Fee}
                alt="No Subscription Fees"
                className="w-[32px] h-[32px]"
              />
              <div className="flex flex-col mt-4">
                <h3 className="text-[20px] font-semibold text-[#252525] leading-tight">
                  No subscription fees
                </h3>
                <p className="text-[16px] font-normal text-[#9D9D9D] mt-2">
                  Pay only for courses you want to take, no monthly fees. Know the exact cost upfront
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;