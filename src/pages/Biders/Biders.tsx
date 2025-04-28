import React, { useState } from "react";
import UserProfileCard from "../../Components/Biders/UserProfileCard";
import Header from "../../Components/DashboardComp/Header";
import Sidebar from "../../Components/DashboardComp/Sidebar";

const Biders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: 1000000,
    maxDeliveryDays: 30,
  });

  // Sample biders data
  const bidersData = [
    {
      username: "محمد حسینی",
      rating: 4.8,
      reviews: 145,
      price: 1200000,
      currency: "تومان",
      deliveryDays: 5,
      imageUrl: "https://example.com/images/freelancer1.jpg",
      skills: ["توسعه وب", "React", "Node.js", "MongoDB"],
      description:
        "توسعه دهنده فول استک با 7 سال تجربه حرفه‌ای در پروژه‌های بزرگ سازمانی و استارتاپی. متخصص در طراحی سیستم‌های مقیاس‌پذیر و بهینه.",
    },
    {
      username: "فاطمه امیری",
      rating: 4.9,
      reviews: 328,
      price: 2500000,
      currency: "تومان",
      deliveryDays: 14,
      imageUrl: "https://example.com/images/designer1.jpg",
      skills: ["طراحی UI/UX", "Figma", "Adobe XD", "پروتوتایپ"],
      description:
        "طراح تجربه کاربری حرفه‌ای با سابقه همکاری با شرکت‌های معتبر بین‌المللی. تخصص در طراحی رابط‌های کاربری مدرن و کاربرپسند.",
    },
    {
      username: "علی رضوانی",
      rating: 5,
      reviews: 42,
      price: 800000,
      currency: "تومان",
      deliveryDays: 3,
      imageUrl: "https://example.com/images/writer1.jpg",
      skills: ["تولید محتوا", "ویراستاری", "مقاله نویسی", "SEO"],
      description:
        "نویسنده و مترجم حرفه‌ای با تسلط به سه زبان. تولیدکننده محتوای تخصصی در حوزه‌های فناوری، بازاریابی و پزشکی.",
    },
    {
      username: "نازنین کریمی",
      rating: 4.7,
      reviews: 96,
      price: 1500000,
      currency: "تومان",
      deliveryDays: 7,
      imageUrl: "https://example.com/images/marketer1.jpg",
      skills: ["دیجیتال مارکتینگ", "اینستاگرام", "گوگل ادز", "تبلیغات"],
      description:
        "متخصص بازاریابی دیجیتال با سابقه مدیریت کمپین‌های موفق برای برندهای معتبر. افزایش فروش شما را تضمین می‌کنم.",
    },
    {
      username: "پویا مرادی",
      rating: 4.5,
      reviews: 63,
      price: 500000,
      currency: "تومان",
      deliveryDays: 2,
      imageUrl: "https://example.com/images/editor1.jpg",
      skills: ["تدوین فیلم", "موشن گرافیک", "پریمیر", "افتر افکت"],
      description:
        "تدوینگر حرفه‌ای با سابقه همکاری با شبکه‌های تلویزیونی. تخصص در ساخت تیزرهای تبلیغاتی و موشن گرافیک.",
    },
  ];

  // Filtering logic
  const filteredBiders = bidersData.filter(
    (bider) =>
      (searchTerm === "" ||
        bider.username.toLowerCase().includes(searchTerm.toLowerCase())) &&
      bider.rating >= filters.minRating &&
      bider.price <= filters.maxPrice &&
      bider.deliveryDays <= filters.maxDeliveryDays
  );
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 max-w-[90rem] md:pr-24 sm:pr-24">
        {/* Increased max-w to max-w-7xl */}
        <Header toggleSidebar={toggleSidebar} />
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
            {/* Search Input */}
            <div className="flex-grow">
              <input
                type="text"
                placeholder="جستجوی پیمانکاران..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Rating Filter */}
            <select
              className="w-full md:w-1/4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.minRating}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minRating: Number(e.target.value),
                })
              }
            >
              <option value={0}>همه امتیازات</option>
              <option value={3}>3+ ستاره</option>
              <option value={4}>4+ ستاره</option>
            </select>

            {/* Price Filter */}
            <select
              className="w-full md:w-1/4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxPrice: Number(e.target.value),
                })
              }
            >
              <option value={1000000}>همه قیمت‌ها</option>
              <option value={250}>تا 250 تومان</option>
              <option value={500}>تا 500 تومان</option>
            </select>
          </div>
        </div>
        {/* Biders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBiders.length > 0 ? (
            filteredBiders.map((bider, index) => (
              <UserProfileCard
                key={index}
                username={bider.username}
                rating={bider.rating}
                reviews={bider.reviews}
                price={bider.price}
                currency={bider.currency}
                deliveryDays={bider.deliveryDays}
                imageUrl={bider.imageUrl}
                skills={bider.skills}
                description={bider.description}
              />
            ))
          ) : (
            <div className="text-center bg-white shadow-md rounded-lg p-8 col-span-full">
              <p className="text-gray-600 text-xl">هیچ پیمانکاری یافت نشد</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Biders;
