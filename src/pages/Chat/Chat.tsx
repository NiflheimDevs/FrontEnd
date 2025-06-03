import { useState, useEffect } from "react";
import Sidebar from "../../Components/DashboardComp/Sidebar";
import Header from "../../Components/DashboardComp/Header";
import ChatMessageArea from "../MessageBox/ChatMessageArea";

export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const renderSkeleton = () => (
    <div
      className="flex flex-col md:flex-row mt-6 mb-3 p-3 md:p-5 w-full max-w-[1080px] h-full mx-auto bg-[#e0e0e0] dark:bg-gray-900 rounded-2xl transition-colors duration-200"
      dir="rtl"
    >
      <div className="w-full md:w-[380px] h-full md:h-full bg-[#e0e0e0] dark:bg-gray-800 md:rounded-tr-2xl md:rounded-br-2xl px-5 flex flex-col transition-colors duration-200 py-3">
        <div className="flex-1 space-y-2">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-white dark:bg-gray-800 rounded-md shadow-md shiny-skeleton transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex-1 ml-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:flex hidden flex-col flex-1 min-h-0 mt-4 md:mt-0 md:ml-3 shiny-skeleton  rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-colors duration-200">
        {" "}
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-white dark:bg-gray-800 z-[-1]"></div>
      <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-800">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 flex flex-col pt-16 md:pr-24 sm:pr-24 md:pl-0 px-4">
          <Header toggleSidebar={toggleSidebar} />
          {isLoading ? renderSkeleton() : <ChatMessageArea />}
        </main>
      </div>
    </>
  );
}
