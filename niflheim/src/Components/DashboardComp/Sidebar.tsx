import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import dashboard from "@/assets/Dashboard/Exclude.svg";
import projects from "@/assets/Dashboard/PencilSquare.svg";
import profile from "@/assets/Dashboard/PersonCheckFill.svg";
import Wallet from "@/assets/Dashboard/Credit.svg";
import messages from "@/assets/Dashboard/Message.svg";
import settings from "@/assets/Dashboard/Settings.svg";
import exit from "@/assets/Dashboard/DoorOpen.svg";

export default function Sidebar({ isSidebarOpen, toggleSidebar }: any) {
  const navigate = useNavigate();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // New state to track hover

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Auth");
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

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsProjectsOpen(false); // Close projects dropdown
    setIsProfileOpen(false); // Close profile dropdown
  };

  return (
    <aside
      className={`fixed top-19 right-0 rounded-tl-3xl rounded-bl-3xl h-[calc(100vh-4rem)] bg-[#D4D4D4] p-5 shadow-sm transition-all duration-300 z-50
        ${
          isSidebarOpen ? "w-48" : "w-20"
        } sm:w-20 sm:hover:w-48 w-full group flex flex-col
        ${isSidebarOpen ? "block" : "hidden"} sm:block`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex flex-col justify-between h-full">
        {/* Top Section */}
        <div className="mt-5 space-y-5 w-full items-center">
          <Link
            to="/dashboard"
            className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            <img src={dashboard} alt="Dashboard" className="w-6 h-6" />
            <span className="absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800">
              داشبورد
            </span>
          </Link>

          {/* Projects Section with Click Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProjectsDropdown}
              className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
            >
              <img src={projects} alt="Projects" className="w-6 h-6" />
              <span className="absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800">
                پروژه ها
              </span>
              <MdArrowDropDown className="absolute right-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800" />
            </button>
            {/* Dropdown Menu for Projects - Visible on Click and Hover */}
            {isProjectsOpen && isHovered && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-200 rounded-lg shadow-lg z-50">
                <Link
                  to="/myprojects/active"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                >
                  پروژه‌های فعال
                </Link>
                <Link
                  to="/myprojects/completed"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                >
                  پروژه‌های تکمیل شده
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/wallet"
            className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            <img src={Wallet} alt="Wallet" className="w-6 h-6" />
            <span className="absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800">
              کیف پول
            </span>
          </Link>

          {/* Profile Section with Click Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300"
            >
              <img src={profile} alt="Profile" className="w-6 h-6" />
              <span className="absolute right-14 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800">
                پروفایل
              </span>
              <MdArrowDropDown className="absolute right-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-gray-800" />
            </button>
            {/* Dropdown Menu for Profile - Visible on Click and Hover */}
            {isProfileOpen && isHovered && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-200 rounded-lg shadow-lg z-50">
                <Link
                  to="/profile/edit"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                >
                  ویرایش پروفایل
                </Link>
                <Link
                  to="/changepassword"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                >
                  تغییر رمز
                </Link>
              </div>
            )}
          </div>

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
