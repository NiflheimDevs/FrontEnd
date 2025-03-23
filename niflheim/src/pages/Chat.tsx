import React, { useState } from "react";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import ChatMessageArea from "./MessageBox/ChatMessageArea";

export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#71C2F4] to-[#000D6E]">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col pt-16 md:pr-24 sm:pr-24 pr-0">
        <Header toggleSidebar={toggleSidebar} />
        <ChatMessageArea />
      </main>
    </div>
  );
}