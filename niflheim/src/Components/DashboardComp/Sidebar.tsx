import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import dashboard from "@/assets/Dashboard/Exclude.svg";
import projects from "@/assets/Dashboard/PencilSquare.svg";
import profile from "@/assets/Dashboard/PersonCheckFill.svg";
import Wallet from "@/assets/Dashboard/Credit.svg";
import messages from "@/assets/Dashboard/Message.svg";
import settings from "@/assets/Dashboard/Settings.svg";
import exit from "@/assets/Dashboard/DoorOpen.svg";

export default function Sidebar({ isSidebarOpen, toggleSidebar }: any) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Auth");
    console.log("User logged out");
  };

  return (
    <aside
      className={`fixed top-16 right-0 rounded-tl-3xl rounded-bl-3xl h-[calc(100vh-4rem)] bg-[#D4D4D4] p-5 shadow-sm transition-all duration-300 z-50
        ${
          isSidebarOpen ? "w-48" : "w-20"
        } sm:w-20 sm:hover:w-48 w-full group flex flex-col
        ${isSidebarOpen ? "block" : "hidden"} sm:block`}
    >
      <nav className="flex flex-col justify-between h-full">
        {/* Top Section */}
        <div className="mt-5 space-y-5 w-full items-center">
          <Link
            to="/dashboard"
            className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            <img src={dashboard} alt="Dashboard" className="w-6 h-6" />
            <span className="absolute right-14 sm:opacity-0 sm:group-hover:opacity-100  transition-opacity duration-300 text-gray-800">
              داشبورد
            </span>
          </Link>
          <Link
            to="/myprojects"
            className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            <img src={projects} alt="Projects" className="w-6 h-6" />
            <span className="absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800">
              پروژه ها
            </span>
          </Link>
          <Link
            to="/wallet"
            className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            <img src={Wallet} alt="Wallet" className="w-6 h-6" />
            <span className="absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800">
              کیف پول
            </span>
          </Link>
          <Link
            to="/profile"
            className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            <img src={profile} alt="Profile" className="w-6 h-6" />
            <span className="absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800">
              پروفایل
            </span>
          </Link>
          <Link
            to="/messages"
            className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            <img src={messages} alt="Messages" className="w-6 h-6" />
            <span className="absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800">
              پیام ها
            </span>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="space-y-5 w-full items-center">
          <Link
            to="/settings"
            className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            <img src={settings} alt="Setting" className="w-6 h-6" />
            <span className="absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800">
              تنظیمات
            </span>
          </Link>
          {/* Replaced Link with button for logout */}
          <button
            onClick={handleLogout}
            className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            <img src={exit} alt="exit" className="w-6 h-6" />
            <span className="cursor-pointer absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800">
              خروج
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
