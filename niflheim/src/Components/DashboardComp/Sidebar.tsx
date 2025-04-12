import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import dashboard from "@/assets/Dashboard/Exclude.svg";
import projects from "@/assets/Dashboard/PencilSquare.svg";
import profile from "@/assets/Dashboard/PersonCheckFill.svg";
import Wallet from "@/assets/Dashboard/Credit.svg";
import messages from "@/assets/Dashboard/Message.svg";
import settings from "@/assets/Dashboard/Settings.svg";
import exit from "@/assets/Dashboard/DoorOpen.svg";
import { useNotification } from "../../Notification/NotificationProvider";
import { logout } from "../../API"; // Adjust the path

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  isSidebarOpen,
}: SidebarProps) {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { success: notifySuccess } = useNotification();
  const location = useLocation();

  const handleLogout = () => {
    logout(); // Use the imported logout function which handles token removal and navigation
    notifySuccess("شما خارج شدید"); // Show success notification
    console.log("User logged out");
  };

  const toggleProjectsDropdown = () => {
    if (isSidebarOpen || window.innerWidth >= 640) {
      setIsProjectsOpen(!isProjectsOpen);
    }
  };

  const toggleProfileDropdown = () => {
    if (isSidebarOpen || window.innerWidth >= 640) {
      setIsProfileOpen(!isProfileOpen);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsProjectsOpen(false);
    setIsProfileOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`fixed top-19 right-0 md:rounded-tl-3xl md:rounded-bl-3xl sm:rounded-tl-3xl sm:rounded-bl-3xl h-[calc(100vh-4rem)] bg-[#D4D4D4] p-5 shadow-sm transition-all duration-300 z-50
        ${isSidebarOpen ? "w-48" : "w-20"} sm:w-20 sm:hover:w-48 w-full group flex flex-col
        ${isSidebarOpen ? "block" : "hidden"} sm:block`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex flex-col justify-between h-full">
        <div className="mt-5 space-y-5 w-full items-center">
          <Link
            to="/dashboard"
            className={`relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300 ${isActive("/dashboard") ? "font-bold text-black bg-blue-200" : "text-gray-800"}`}
          >
            <img src={dashboard} alt="Dashboard" className="w-6 h-6" />
            <span
              className={`absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ${isActive("/dashboard") ? "text-black" : "text-gray-800"}`}
            >
              داشبورد
            </span>
            {isActive("/dashboard") && (
              <div className="absolute left-0 w-1 h-full bg-blue-400"></div>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={toggleProjectsDropdown}
              className={`cursor-pointer relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300 ${isActive("/myprojects") || isActive("/myprojects/active") || isActive("/myprojects/completed") ? "font-bold text-black bg-blue-200" : "text-gray-800"}`}
            >
              <img src={projects} alt="Projects" className="w-6 h-6" />
              <span
                className={`absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ${isActive("/myprojects") || isActive("/myprojects/active") || isActive("/myprojects/completed") ? "text-black" : "text-gray-800"}`}
              >
                پروژه ها
              </span>
              <MdArrowDropDown className="absolute right-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800" />
            </button>
            {isProjectsOpen && isHovered && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-200 rounded-lg shadow-lg z-50">
                <Link
                  to="/myprojects"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:rounded-lg"
                >
                  پروژه های من
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:rounded-lg"
                >
                  پیشنهادات
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/wallet"
            className={`relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300 ${isActive("/wallet") ? "font-bold text-black bg-blue-200" : "text-gray-800"}`}
          >
            <img src={Wallet} alt="Wallet" className="w-6 h-6" />
            <span
              className={`absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ${isActive("/wallet") ? "text-black" : "text-gray-800"}`}
            >
              کیف پول
            </span>
            {isActive("/wallet") && (
              <div className="absolute left-0 w-1 h-full bg-blue-400"></div>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className={`cursor-pointer relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300 ${isActive("/profile") || isActive("/profile/edit") || isActive("/changepass") ? "font-bold text-black bg-blue-200" : "text-gray-800"}`}
            >
              <img src={profile} alt="Profile" className="w-6 h-6" />
              <span
                className={` absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ${isActive("/profile") || isActive("/profile/edit") || isActive("/changepass") ? "text-black" : "text-gray-800"}`}
              >
                پروفایل
              </span>
              {isActive("/profile") && (
                <div className="absolute left-0 w-1 h-full bg-blue-400"></div>
              )}

              <MdArrowDropDown className="absolute right-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800" />
            </button>
            {isProfileOpen && isHovered && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-200 rounded-lg shadow-lg z-50">
                <Link
                  to="/profile"
                  className={`block px-4 py-2 hover:bg-gray-300 hover:rounded-lg ${isActive("profile") ? "font-bold text-black bg-blue-200" : "text-gray-800"}`}
                >
                  ویرایش پروفایل
                </Link>
                <Link
                  to="/changepass"
                  className={`block px-4 py-2 hover:bg-gray-300 hover:rounded-lg ${isActive("/changepass") ? "font-bold text-black bg-blue-500" : "text-gray-800"}`}
                >
                  تغییر رمز
                  {isActive("/changepass") && (
                    <div className="absolute left-0 w-1 h-full bg-blue-400"></div>
                  )}
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/chat"
            className={`relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300 ${isActive("/chat") ? "font-bold text-black bg-blue-200" : "text-gray-800"}`}
          >
            <img src={messages} alt="chat" className="w-6 h-6" />
            <span
              className={`absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ${isActive("/chat") ? "text-black" : "text-gray-800"}`}
            >
              پیام ها
            </span>
            {isActive("/chat") && (
              <div className="absolute left-0 w-1 h-full bg-blue-400"></div>
            )}
          </Link>
        </div>

        <div className="space-y-5 w-full items-center">
          <Link
            to="/settings"
            className={`relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300 ${isActive("/settings") ? "font-bold text-black bg-blue-500" : "text-gray-800"}`}
          >
            <img src={settings} alt="Setting" className="w-6 h-6" />
            <span
              className={`absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ${isActive("/settings") ? "text-white" : "text-gray-800"}`}
            >
              تنظیمات
            </span>
            {isActive("/settings") && (
              <div className="absolute left-0 w-1 h-full bg-blue-700"></div>
            )}
          </Link>
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
