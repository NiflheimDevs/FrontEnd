import React, { useState } from "react";
import UserProfileCard from "../../Components/Biders/UserProfileCard";
import Header from "../../Components/DashboardComp/Header";
import Sidebar from "../../Components/DashboardComp/Sidebar";
import FilterComponent from "../../Components/Biders/FilterComponent";
import image1 from "../../assets/biders/image1.webp";
import image2 from "../../assets/biders/image2.webp";
import image3 from "../../assets/biders/image3.webp";
import image4 from "../../assets/biders/image4.webp";
import image5 from "../../assets/biders/image5.webp";

const Biders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
    maxDeliveryDays: 30,
    priceRange: [0, 5000000] as [number, number],
  });
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  // Sample biders data
  const bidersData = [
    {
      username: "محمد حسینی",
      rating: 4,
      reviews: 145,
      price: 1200000,
      currency: "تومان",
      deliveryDays: 5,
      imageUrl: image1,
      skills: ["توسعه وب", "React", "Node.js", "MongoDB"],
      description:
        "توسعه دهنده فول استک با 7 سال تجربه حرفه‌ای در پروژه‌های بزرگ سازمانی و استارتاپی. متخصص در طراحی سیستم‌های مقیاس‌پذیر و بهینه.",
    },
    {
      username: "فاطمه امیری",
      rating: 5,
      reviews: 328,
      price: 2500000,
      currency: "تومان",
      deliveryDays: 14,
      imageUrl: image2,
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
      imageUrl: image3,
      skills: ["تولید محتوا", "ویراستاری", "مقاله نویسی", "SEO"],
      description:
        "نویسنده و مترجم حرفه‌ای با تسلط به سه زبان. تولیدکننده محتوای تخصصی در حوزه‌های فناوری، بازاریابی و پزشکی.",
    },
    {
      username: "نازنین کریمی",
      rating: 3,
      reviews: 96,
      price: 1500000,
      currency: "تومان",
      deliveryDays: 7,
      imageUrl: image4,
      skills: ["دیجیتال مارکتینگ", "اینستاگرام", "گوگل ادز", "تبلیغات"],
      description:
        "متخصص بازاریابی دیجیتال با سابقه مدیریت کمپین‌های موفق برای برندهای معتبر. افزایش فروش شما را تضمین می‌کنم.",
    },
    {
      username: "پویا مرادی",
      rating: 2,
      reviews: 63,
      price: 500000,
      currency: "تومان",
      deliveryDays: 2,
      imageUrl: image5,
      skills: ["تدوین فیلم", "موشن گرافیک", "پریمیر", "افتر افکت"],
      description:
        "تدوینگر حرفه‌ای با سابقه همکاری با شبکه‌های تلویزیونی. تخصص در ساخت تیزرهای تبلیغاتی و موشن گرافیک.",
    },
  ];

  // Filtering logic
  const filteredBiders = bidersData.filter(
    (bider) =>
      (searchTerm === "" ||
        bider.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bider.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      bider.rating >= filters.minRating &&
      bider.price >= filters.priceRange[0] &&
      bider.price <= filters.priceRange[1] &&
      bider.deliveryDays <= filters.maxDeliveryDays
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 max-w-[90rem] md:pr-24 sm:pr-24">
        <Header toggleSidebar={toggleSidebar} />

        {/* Filter Section */}
        <FilterComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />

        {/* Biders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBiders.length > 0 ? (
            filteredBiders.map((bider, index: number) => (
              <UserProfileCard
                key={index}
                username={bider.username}
                rating={bider.rating}
                reviews={bider.reviews}
                price={formatPrice(bider.price)}
                currency={bider.currency}
                deliveryDays={bider.deliveryDays}
                imageUrl={bider.imageUrl}
                skills={bider.skills}
                description={bider.description}
              />
            ))
          ) : (
            <div className="text-center bg-white shadow-md rounded-lg p-8 col-span-full">
              <p className="text-gray-600 text-xl">هیچ کارجویی یافت نشد.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Biders;
