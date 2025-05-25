/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
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
import BiderSkeletonLoading from "../../Components/Biders/BiderSkeletonLoading";

const Biders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { projectId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bidersData, setBidersData] = useState<Bider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterVersion, setFilterVersion] = useState(0);
  const [maxExpectedTime, setmaxExpectedTime] = useState(0);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
    maxDeliveryDays: 0,
    priceRange: [0, 0] as [number, number],
  });

  // Create a ref to track filters
  const filtersRef = useRef(filters);

  // Update the ref whenever filters change
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

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

            const maxTotal = Math.max(
              ...mappedData.map((bider: Bider) => bider.total),
              0
            );
            const maxExpectedTime = Math.max(
              ...mappedData.map((bider: Bider) => bider.expected_time),
              0
            );

            // Update filters using the current ref value
            setFilters({
              ...filtersRef.current,
              priceRange: [0, maxTotal] as [number, number],
              maxDeliveryDays: maxExpectedTime,
            });
            setFilterVersion(1);
            setmaxExpectedTime(maxExpectedTime);
          }
        }
      } catch {
        setError("خطا در دریافت اطلاعات کارجویان.");
      } finally {
        setLoading(true);
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
    <>
      <div className="fixed inset-0 bg-gray-100 dark:bg-gray-800 z-[-1]"></div>
      <div className="bg-gray-100 dark:bg-gray-800 min-h-screen overflow-auto">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-20 max-w-[90rem] md:pr-24 sm:pr-24 dark:bg-gray-800">
          <Header toggleSidebar={toggleSidebar} />
          {loading ? (
            <BiderSkeletonLoading />
          ) : (
            <>
              {/* Filter Section */}
              <FilterComponent
                maxDeliveryDays={maxExpectedTime}
                key={`filter-${filterVersion}`}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                setFilters={setFilters}
              />

              {/* Biders List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {error ? (
                  <div className="text-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-8 col-span-full">
                    <p className="text-red-600 dark:text-red-400 text-xl">
                      {error}
                    </p>
                  </div>
                ) : filteredBiders.length > 0 ? (
                  filteredBiders.map((bider) => (
                    <UserProfileCard
                      key={bider.bid_id}
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
                  <div className="text-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-8 col-span-full">
                    <p className="text-gray-600 dark:text-gray-300 text-xl">
                      هیچ کارجویی یافت نشد.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Biders;
