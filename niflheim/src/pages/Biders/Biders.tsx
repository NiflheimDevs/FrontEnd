import React, { useState } from "react";
import UserProfileCard from '../../Components/Biders/UserProfileCard';
import Header from "../../Components/DashboardComp/Header";
import Sidebar from "../../Components/DashboardComp/Sidebar";
// Import images
import goodgirl1 from "@/assets/biders/goodgirl1.jpg";
import goodgirl3 from "@/assets/biders/goodgirl3.jpg";
import goodgirl4 from "@/assets/biders/goodgirl4.png";

const Biders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: 1000000, // High default to show all
    maxDeliveryDays: 30
  });

  // Sample biders data
  const bidersData = [
    {
      username: "احمد محمدی",
      rating: 4.1,
      reviews: 12,
      price: 500,
      currency: "ریال",
      deliveryDays: 10,
      imageUrl: goodgirl4,
      skills: ['برنامه نویسی وب', 'React', 'طراحی رابط کاربری'],
      description: "توسعه دهنده وب با 5 سال تجربه در ایجاد برنامه های تحت وب با تخصص در طراحی رابط کاربری پیشرفته و توسعه اپلیکیشن های مدرن"
    },
    {
      username: "سارا رضایی",
      rating: 4.5,
      reviews: 22,
      price: 750,
      currency: "ریال",
      deliveryDays: 7,
      imageUrl: goodgirl3,
      skills: ['طراحی گرافیک', 'برندسازی', 'تصویرسازی'],
      description: "طراح گرافیک خلاق متخصص در هویت برند و تصویرسازی دیجیتال با بیش از 8 سال تجربه در طراحی لوگو و برندینگ"
    },
    {
      username: "آتوسا لطیفی",
      rating: 5,
      reviews: 4004,
      price: 444444,
      currency: "تومان",
      deliveryDays: 4,
      imageUrl: goodgirl1,
      skills: ['طراحی گرافیک', 'برندسازی', 'تصویرسازی','پرطرفدار'],
      description: "از زمان کودکی به دنبال کار بود بعضی اوقات 4 ساعت کار می کرد و 4 بار حقوق می گرفت"
    },
  ];

  // Filtering logic
  const filteredBiders = bidersData.filter(bider => 
    (searchTerm === '' || 
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
        <div className="container mx-auto px-4 py-12 max-w-7xl"> {/* Increased max-w to max-w-7xl */}
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
              onChange={(e) => setFilters({
                ...filters, 
                minRating: Number(e.target.value)
              })}
            >
              <option value={0}>همه امتیازات</option>
              <option value={3}>3+ ستاره</option>
              <option value={4}>4+ ستاره</option>
            </select>

            {/* Price Filter */}
            <select 
              className="w-full md:w-1/4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.maxPrice}
              onChange={(e) => setFilters({
                ...filters, 
                maxPrice: Number(e.target.value)
              })}
            >
              <option value={1000000}>همه قیمت‌ها</option>
              <option value={250}>تا 250 ریال</option>
              <option value={500}>تا 500 ریال</option>
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
}

export default Biders;