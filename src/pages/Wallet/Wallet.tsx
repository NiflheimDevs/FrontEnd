import { useState } from "react";
import Sidebar from "../../Components/DashboardComp/Sidebar";
import Header from "../../Components/DashboardComp/Header";
//import WalletComponent from "../components/Dashboard/WalletComponent";
import WalletComponent from "../../Components/DashboardComp/WalletComponent";

const Wallet = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#F7F7F7] z-[-1]"
        style={{ backgroundColor: "#F7F7F7" }}
      ></div>
      <div className="flex h-full w-full bg-[#F7F7F7]">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 w-full flex flex-col pt-16 md:pl-4 sm:pl-4 md:pr-24 sm:pr-24">
          <Header toggleSidebar={toggleSidebar} />
          <WalletComponent 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </main>
      </div>
    </>
  );
};

export default Wallet;