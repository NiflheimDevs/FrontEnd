import { useState ,useEffect} from "react";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import ProfileForm from "../Components/DashboardComp/ProfileForm";

import React from "react";
import { Skeleton } from 'primereact/skeleton';

export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Simulate an API call or data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);
    const renderSkeleton = () => (
      <div className="animate-pulse justify-center items-center">
        {/* <Skeleton width="10%" height="24px" className="shiny-skeleton mb-2 mt-10 mx-auto" /> */}
        <div className="flex flex-col w-2/3 space-y-4 p-6 bg-white rounded-lg shadow-md justify-center items-center mx-auto mt-10">
        <div className="flex flex-col items-center">
          <Skeleton width="200px" height="200px" className="shiny-skeleton full border rounded-full border-gray-300" />
          <Skeleton width="200px" height="20px" className="shiny-skeleton mt-2 bg-gray-200 rounded" />
        </div>
          <Skeleton width="100%" height="40px" className="shiny-skeleton mb-4 rounded-2xl" />
          <Skeleton width="100%" height="40px" className="shiny-skeleton mb-2 mt-5 rounded-2xl" />
          <Skeleton width="100%" height="40px" className="shiny-skeleton mb-2 mt-5 rounded-2xl" />
          <Skeleton width="100%" height="40px" className="shiny-skeleton mb-4 mt-5 rounded-2xl" />
          <Skeleton width="100%" height="40px" className="shiny-skeleton mb-4 mt-5 rounded-2xl" />
          <Skeleton width="100%" height="40px" className="shiny-skeleton mb-4 mt-5 rounded-2xl" />
          <Skeleton width="100%" height="40px" className="shiny-skeleton mb-4 mt-5 rounded-2xl" />
          <Skeleton width="100%" height="40px" className="shiny-skeleton mb-4 mt-5 rounded-2xl" />
          
          <div className="flex flex-col space-y-2">
            <Skeleton width="100%" height="40px" className="shiny-skeleton" />
            <Skeleton width="100%" height="40px" className="shiny-skeleton" />
            <Skeleton width="100%" height="40px" className="shiny-skeleton" />
          </div>
          <div className="flex justify-between mt-4">
            <Skeleton width="48%" height="40px" className="shiny-skeleton" />
            <Skeleton width="48%" height="40px" className="shiny-skeleton" />
          </div>
        </div>
      </div>
    );
  return (
    <div className="flex h-fit bg-[#F7F7F7]" dir="rtl">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col pt-16 md:pr-24 sm:pr-24 pr-0">
      
        <Header toggleSidebar={toggleSidebar} />
        {isLoading ? (
              renderSkeleton()
            ) : (
        <ProfileForm />
      )}
      </main>
    </div>
  );
}
