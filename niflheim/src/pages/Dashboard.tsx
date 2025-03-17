import { useState } from "react";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import ProfileForm from "../Components/DashboardComp/ProfileForm";
import React from "react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#F7F7F7]" dir="rtl">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col pt-16 pr-4 md:pr-24">
        <Header toggleSidebar={toggleSidebar} />
        <ProfileForm />
      </main>
    </div>
  );
}