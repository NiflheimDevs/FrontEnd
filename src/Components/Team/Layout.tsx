import React, { useState } from "react";
import Header from "../DashboardComp/Header";
import Sidebar from "../DashboardComp/Sidebar";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // <div className="flex min-h-screen bg-gray-100">
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1] dark:bg-gray-800"></div>
      <div className="flex w-full h-screen overflow-auto bg-[#F7F7F7] scrollbar-hide dark:bg-gray-800">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 w-full flex flex-col pt-16 md:pl-4 sm:pl-4 md:pr-24 sm:pr-24">
          <Header toggleSidebar={toggleSidebar} />
          <main className="container mx-auto px-4 py-6">{children}</main>
        </main>
      </div>
    </>
  );
};

export default Layout;
