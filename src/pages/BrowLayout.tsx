import { useState } from "react";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import BrowseProject from "./Brows/BrowsProject";

const BrowLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#F7F7F7]" dir="rtl">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}  />
        <main
          className={`flex-1 flex flex-col pt-20 transition-all duration-400 sm:pr-24 pr-4 pl-4 relative z-10 ${
            isSidebarOpen ? "md:pr-52" : "md:pr-28"
          } bg-white`}
        >
          <Header showSearch={true} />
          <BrowseProject />
        </main>
      </div>
    </>
  );
};

export default BrowLayout;