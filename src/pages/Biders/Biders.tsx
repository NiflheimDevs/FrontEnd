/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import UserProfileCard from "../../Components/Biders/UserProfileCard";
import Header from "../../Components/DashboardComp/Header";
import Sidebar from "../../Components/DashboardComp/Sidebar";
import FilterComponent from "../../Components/Biders/FilterComponent";
import { GetProjectView } from "../../API";
import {
  Bider,
  formatPrice,
  mapApiDataToProfile,
} from "../../Components/Biders/types";
import { useParams } from "react-router-dom";

const Biders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { projectId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bidersData, setBidersData] = useState<Bider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
    maxDeliveryDays: 30,
    priceRange: [0, 5000000] as [number, number],
  });

  // Fetch biders data using useEffect
  useEffect(() => {
    const fetchBiders = async () => {
      try {
        if (projectId != undefined) {
          setLoading(true);
          setError(null);
          const response = await GetProjectView(projectId);
          if (response) {
            const mappedData = await Promise.all(
              response.map((item: any) => mapApiDataToProfile(item))
            );
            setBidersData(mappedData);
            console.log(response);
          }
        }
      } catch {
        setError("خطا در دریافت اطلاعات کارجویان.");
      } finally {
        setLoading(false);
      }
    };

    fetchBiders();
  }, [projectId]);

  const filteredBiders = bidersData.filter(
    (bider) =>
      (searchTerm === "" ||
        bider.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      bider.total >= filters.priceRange[0] &&
      bider.total <= filters.priceRange[1] &&
      bider.expected_time <= filters.maxDeliveryDays
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
          {loading ? (
            <div className="text-center bg-white shadow-md rounded-lg p-8 col-span-full">
              <p className="text-gray-600 text-xl">در حال بارگذاری...</p>
            </div>
          ) : error ? (
            <div className="text-center bg-white shadow-md rounded-lg p-8 col-span-full">
              <p className="text-red-600 text-xl">{error}</p>
            </div>
          ) : filteredBiders.length > 0 ? (
            filteredBiders.map((bider) => (
              <UserProfileCard
                bid_id={bider.bid_id}
                title={bider.title}
                prePayment={formatPrice(bider.pre_payment)}
                total={formatPrice(bider.total)}
                deliveryDays={bider.expected_time}
                imageUrl={bider.profile}
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
