/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, Menu } from "lucide-react";
import LOGO from "@/assets/Dashboard/BIDLANCERLOGO.svg";
import { Link, useLocation } from "react-router-dom";
import { GetProfile } from "../../API";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { BiHome, BiHomeAlt2 } from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

export default function Header({ toggleSidebar }: any) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [hoverDashboard, setHoverDashboard] = useState<boolean>(false);
  const [hoverHome, setHoverHome] = useState<boolean>(false);
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const fetchProfile = async () => {
    try {
      const response = await GetProfile();
      const isValidUrl =
        response.low_quality &&
        typeof response.low_quality === "string" &&
        response.low_quality.trim() !== "" &&
        /^https?:\/\//i.test(response.low_quality);

      if (isValidUrl) {
        setProfilePicture(response.low_quality);
      } else {
        setProfilePicture("");
      }
    } catch {
      setProfilePicture("");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <>
      <header className="shadow fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-700 p-4 flex justify-between items-center transition-colors duration-300">
        {/* Left Section: Hamburger Menu and Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleSidebar}
            className="w-fit h-fit cursor-pointer hover:scale-110 transition-transform sm:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} className="text-gray-600 dark:text-gray-200" />
          </button>

          {/* Logo and Title */}
          <Link to="/" className="h-11">
            <button className="w-fit h-fit items-center cursor-pointer lg:flex md:flex sm:flex hidden">
              <label className="text-lg font-semibold lg:flex md:flex sm:flex hidden pointer-events-none text-gray-900 dark:text-gray-200">
                بیدلنسر
              </label>
              <img
                src={LOGO}
                alt="Logo"
                className="h-11 w-14 pointer-events-none"
              />
            </button>
          </Link>
        </div>

        {/* Center Section: Search Bar (Hidden on Mobile) */}
        <div className="relative md:flex sm:flex hidden h-fit w-[60%] mr-6 items-center">
          <input
            type="text"
            placeholder="جستجو"
            className="border py-2 pr-14 mx-2 rounded w-[80%] border-blue-600 dark:border-blue-400 text-right bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-300"
          />
          <button className="absolute right-2 top-0 bottom-0 bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 transition-all duration-300 text-white px-4 rounded-r flex items-center cursor-pointer">
            <Search size={18} className="text-white dark:text-gray-200" />
          </button>
        </div>

        {/* Right Section: Icons */}
        <div className="flex w-fit h-fit items-center md:gap-5 sm:gap-5 gap-[3vw]">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="w-fit h-fit cursor-pointer hover:scale-110 transition-transform"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <MdOutlineWbSunny className="icon" color="#FFD700" size={26} />
            ) : (
              <IoMdMoon className="icon" color="#9CA3AF" size={26} />
            )}
          </button>
          <button
            className="w-fit h-fit md:hidden sm:hidden flex cursor-pointer hover:scale-115 transition-transform"
            onClick={openModal}
            aria-label="Search"
          >
            <Search size={24} className="text-gray-600 dark:text-gray-200" />
          </button>
          <Link
            to="/"
            className={`flex justify-center items-center rounded-lg transition-all duration-300 ${
              isActive("/")
                ? "glow"
                : "hover:bg-gray-100 dark:hover:bg-gray-600 p-1"
            }`}
            onMouseEnter={() => setHoverHome(true)}
            onMouseLeave={() => setHoverHome(false)}
          >
            <div className="relative hover:scale-110 transition-transform justify-center items-center flex">
              {hoverHome || isActive("/") ? (
                <div
                  key="home-hover"
                  className="flex items-center justify-center"
                >
                  <BiHome
                    className="icon"
                    color={
                      isActive("/")
                        ? "#3B82F6"
                        : isDarkMode
                          ? "#E5E7EB"
                          : "#74767E"
                    }
                    size={28}
                  />
                </div>
              ) : (
                <div key="home-default">
                  <BiHomeAlt2
                    className="icon"
                    color={isDarkMode ? "#E5E7EB" : "#74767E"}
                    size={28}
                  />
                </div>
              )}
            </div>
          </Link>
          <Link
            to="/dashboard"
            className={`flex justify-center items-center rounded-lg transition-all duration-300 ${
              isActive("/dashboard")
                ? "glow"
                : "hover:bg-gray-100 dark:hover:bg-gray-600 p-1"
            }`}
            onMouseEnter={() => setHoverDashboard(true)}
            onMouseLeave={() => setHoverDashboard(false)}
          >
            <div className="relative hover:scale-110 transition-transform justify-center items-center flex">
              {hoverDashboard || isActive("/dashboard") ? (
                <div
                  key="dashboard-hover"
                  className="flex items-center justify-center"
                >
                  <LuLayoutDashboard
                    className="icon"
                    color={
                      isActive("/dashboard")
                        ? "#3B82F6"
                        : isDarkMode
                          ? "#E5E7EB"
                          : "#74767E"
                    }
                    size={28}
                  />
                </div>
              ) : (
                <div key="dashboard-default">
                  <MdOutlineSpaceDashboard
                    className="icon"
                    color={isDarkMode ? "#E5E7EB" : "#74767E"}
                    size={28}
                  />
                </div>
              )}
            </div>
          </Link>
          <Link
            to="/profile/0"
            className={`flex justify-center items-center rounded-lg transition-all duration-300 ${
              isActive("/profile/0")
                ? "glow"
                : "hover:bg-gray-100 dark:hover:bg-gray-600 p-1 hover:scale-110"
            }`}
          >
            <button className="relative transition-transform cursor-pointer">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  className={`rounded-full h-9 w-9 object-cover min-w-8 pointer-events-none ${
                    isActive("/profile/0")
                      ? "border-3 border-blue-500 dark:border-blue-400"
                      : "border-2 border-blue-500 dark:border-blue-400"
                  }`}
                  alt="Profile"
                  tabIndex={-1}
                  onError={() => setProfilePicture("")}
                />
              ) : (
                <CgProfile
                  color={
                    isActive("/profile/0")
                      ? "#3B82F6"
                      : isDarkMode
                        ? "#E5E7EB"
                        : "#707070"
                  }
                  className="rounded-full h-8 w-8 pointer-events-none transition-transform"
                  tabIndex={-1}
                />
              )}
            </button>
          </Link>
        </div>
      </header>

      {/* Search Modal for Mobile */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            ref={modalRef}
            className="fixed left-0 right-0 z-50 md:hidden sm:hidden flex items-start justify-center bg-transparent backdrop-blur-xs h-screen py-4 px-2"
            style={{ top: "64px" }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative md:hidden sm:hidden flex h-fit w-full items-center justify-center">
              <input
                type="text"
                placeholder="جستجو"
                className="border py-2 pr-13 mx-2 rounded w-full bg-white dark:bg-gray-600 border-blue-600 dark:border-blue-400 text-right text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-300"
              />
              <button
                className="absolute right-2 top-0 bottom-0 bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 transition-all duration-300 text-white px-4 rounded-r flex items-center cursor-pointer"
                onClick={closeModal}
              >
                <Search size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
