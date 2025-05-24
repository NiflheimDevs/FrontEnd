/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import LOGO from "@/assets/Dashboard/BIDLANCERLOGO.svg";
import SearchIcon from "@/assets/Dashboard/Search.svg";
import { FaRegBell } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { GetProfile } from "../../API";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiHome, BiHomeAlt2 } from "react-icons/bi";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

const Header = ({ showSearch = false }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("authToken");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [error401, seterror401] = useState<boolean>(false);
  const [hoverDashboard, setHoverDashboard] = useState<boolean>(false);
  const [hoverHome, setHoverHome] = useState<boolean>(false);
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

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
      seterror401(false);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setProfilePicture("");
        seterror401(true);
      } else {
        setProfilePicture("");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
      <header
        className={`shadow w-full fixed md:relative sm:relative top-0 left-0 right-0 z-50 bg-white dark:bg-gray-700 p-4 flex justify-between items-center transition-colors duration-300`}
      >
        {/* Left Section: Logo and Title */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <button className="flex w-fit h-fit items-center cursor-pointer">
              <label className="text-lg font-semibold md:flex sm:flex hidden pointer-events-none text-gray-900 dark:text-gray-200">
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

        {/* Center Section: Search Bar */}
        {showSearch && (
          <div className="relative md:flex sm:flex hidden h-fit w-[60%] mr-6 items-center">
            <input
              type="text"
              placeholder="جستجو"
              className="border py-2 pr-14 mx-2 rounded w-[80%] border-blue-600 dark:border-blue-400 text-right bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-300"
            />
            <button className="absolute right-2 top-0 bottom-0 bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 transition-all duration-300 text-white px-4 rounded-r flex items-center cursor-pointer">
              <Search size={18} />
            </button>
          </div>
        )}

        {/* Right Section: Conditional Rendering */}
        {token && !error401 ? (
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
            {showSearch && (
              <button
                className="w-fit h-fit md:hidden sm:hidden flex cursor-pointer hover:scale-115 transition-transform"
                onClick={openModal}
              >
                <img
                  src={SearchIcon}
                  className="h-6 scale-95 pointer-events-none"
                  tabIndex={-1}
                  alt="Search"
                />
              </button>
            )}
            <div
              className={`flex justify-center items-center rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 p-1`}
            >
              <button className="w-fit h-fit cursor-pointer hover:scale-110 transition-transform">
                <FaRegBell
                  className="icon"
                  color={isDarkMode ? "#E5E7EB" : "#74767E"}
                  size={26}
                />
              </button>
            </div>
            <Link
              to="/"
              className={`flex justify-center items-center rounded-lg transition-all duration-300 ${
                isActive("/")
                  ? "bg-blue-100 dark:bg-blue-800/50 glow"
                  : "hover:bg-gray-100 dark:hover:bg-gray-600 p-1"
              }`}
              onMouseEnter={() => setHoverHome(true)}
              onMouseLeave={() => setHoverHome(false)}
            >
              <div className="relative hover:scale-110 transition-transform">
                {hoverHome || isActive("/") ? (
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
                ) : (
                  <BiHomeAlt2
                    className="icon"
                    color={isDarkMode ? "#E5E7EB" : "#74767E"}
                    size={28}
                  />
                )}
              </div>
            </Link>
            <Link
              to="/dashboard"
              className={`flex justify-center items-center rounded-lg transition-all duration-300 ${
                isActive("/dashboard")
                  ? "bg-blue-100 dark:bg-blue-800/50 glow"
                  : "hover:bg-gray-100 dark:hover:bg-gray-600 p-1"
              }`}
              onMouseEnter={() => setHoverDashboard(true)}
              onMouseLeave={() => setHoverDashboard(false)}
            >
              <div className="relative hover:scale-110 transition-transform">
                {hoverDashboard || isActive("/dashboard") ? (
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
                ) : (
                  <MdOutlineSpaceDashboard
                    className="icon"
                    color={isDarkMode ? "#E5E7EB" : "#74767E"}
                    size={28}
                  />
                )}
              </div>
            </Link>
            <Link
              to="/profile/0"
              className={`flex justify-center items-center rounded-lg transition-all duration-300 ${
                isActive("/profile/0")
                  ? "bg-blue-100 dark:bg-blue-800/50 glow"
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
        ) : (
          <div className="flex w-fit h-fit items-center md:gap-5 sm:gap-5 gap-[3vw]">
            {showSearch && (
              <button
                className="w-fit h-fit md:hidden sm:hidden flex cursor-pointer hover:scale-115 transition-transform"
                onClick={openModal}
              >
                <img
                  src={SearchIcon}
                  className="h-6 scale-95 pointer-events-none"
                  tabIndex={-1}
                  alt="Search"
                />
              </button>
            )}
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
            <Link to="/auth">
              <button
                className="border cursor-pointer p-4 rounded-full h-7 w-fit bg-gray-200 dark:bg-gray-600 flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-500 hover:shadow-lg hover:scale-105 text-gray-900 dark:text-gray-200"
                aria-label="Login"
              >
                <IoMdPerson aria-hidden="true" />
                ورود / ثبت نام
              </button>
            </Link>
          </div>
        )}
      </header>

      {/* Search Modal for Mobile */}
      {showSearch && (
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
      )}
    </>
  );
};

export default Header;
