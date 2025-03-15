import React from "react";
import { useState } from "react";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import { Button } from "@/components/ui/button";

const MyProjects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col p-6 md:p-10">
        <Header toggleSidebar={toggleSidebar} />
        <h2 className="mt-10 text-2xl font-semibold">پروژه های من</h2>
        <Button
          className="absolute place-self-end mt-10 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-sm transition-colors"
          onClick={() => alert("Project creation functionality to be implemented")}
        >
          + ساخت پروژه
        </Button>
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-[320px] h-[294px] border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center">
            <button
              className="flex flex-col items-center px-4 py-2 text-blue-500"
              onClick={() => alert("Create list functionality to be implemented")}
            >
              <span className="text-5xl">+</span>
              ایجاد لیست
            </button>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded">...</button>
        </div>
        <button className="text-gray-500">⬅️</button>
      </footer>
    </div>
  );
};

export default MyProjects;