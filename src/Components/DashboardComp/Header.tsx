/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, Menu } from "lucide-react";
import LOGO from "@/assets/Dashboard/BIDLANCERLOGO.svg";
import SearchIcon from "@/assets/Dashboard/Search.svg";
// import Mail from "@/assets/Dashboard/Mail.svg";
// import FAQ from "@/assets/Dashboard/Faq.svg";
import BELL from "@/assets/Dashboard/Bell.svg";
import { Link, useLocation } from "react-router-dom";
import { GetProfile } from "../../API";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { BiHome, BiHomeAlt2 } from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

export default function Header({ toggleSidebar }: any) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [hoverDashboard, setHoverDashboard] = useState<boolean>(false);
  const [hoverHome, setHoverHome] = useState<boolean>(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const fetchProfile = async () => {
    try {
      const response = await GetProfile();
      // Validate that low_quality is a non-empty string and a URL
      const isValidUrl =
        response.low_quality &&
        typeof response.low_quality === "string" &&
        response.low_quality.trim() !== "" &&
        /^https?:\/\//i.test(response.low_quality);

      if (isValidUrl) {
        setProfilePicture(response.low_quality);
      } else {
        setProfilePicture(""); // Set to empty if not a valid URL
      }
    } catch {
      setProfilePicture(""); // Set to empty on error
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

  return (
    <>
      <header className="shadow fixed top-0 left-0 right-0 z-50 bg-white p-4 flex justify-between items-center">
        {/* Left Section: Hamburger Menu and Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleSidebar}
            className="w-fit h-fit cursor-pointer hover:scale-110 hover:animate-shake sm:hidden transition-all duration-400 ease-out"
          >
            <Menu size={24} className="text-gray-600" />
          </button>

          {/* Logo and Title */}
          <Link to="/">
            <button className="flex w-fit h-fit items-center cursor-pointer">
              <label className="text-lg font-semibold md:flex sm:flex hidden pointer-events-none">
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
            className="border-1 py-2 pr-14 mx-2 rounded w-[80%] border-blue-600 text-right"
          />
          <button className="absolute right-2 top-0 bottom-0 bg-blue-600 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-400 text-[#FFFFFF] px-4 rounded-r flex items-center cursor-pointer">
            <Search size={18} />
          </button>
        </div>

        {/* Right Section: Icons */}
        <div className="flex w-fit h-fit items-center md:gap-5 sm:gap-5 gap-[3vw]">
          <button
            className="w-fit h-fit md:hidden sm:hidden flex cursor-pointer hover:scale-115 hover:animate-shake transition-all duration-400 ease-out"
            onClick={openModal}
          >
            <img
              src={SearchIcon}
              className="h-6 scale-95 pointer-events-none"
              tabIndex={-1}
            />
          </button>

          <div
            className={`flex justify-center items-center rounded-lg transition-all duration-300 hover:bg-gray-100 p-1`}
          >
            <button className="w-fit h-fit cursor-pointer hover:scale-110 hover:animate-shake">
              <img
                src={BELL}
                className="h-6 pointer-events-none"
                tabIndex={-1}
              />
            </button>
          </div>

          {/* <button className="w-fit h-fit cursor-pointer hover:scale-110 hover:animate-shake transition-all duration-400 ease-out">
            <img src={Mail} className="h-6 pointer-events-none" tabIndex={-1} />
          </button> */}

          {/* <button className="w-fit h-fit cursor-pointer hover:scale-110 hover:animate-shake transition-all duration-400 ease-out">
            <img src={FAQ} className="h-6 pointer-events-none" tabIndex={-1} />
          </button> */}
          <Link
            to="/"
            className={`flex justify-center items-center rounded-lg transition-all duration-300 ${
              isActive("/") ? "active glow" : "hover:bg-gray-100 p-1"
            }`}
            onMouseEnter={() => {
              setHoverHome(true);
            }}
            onMouseLeave={() => {
              setHoverHome(false);
            }}
          >
            <div className="relative hover:scale-110 duration-400">
              {hoverHome || isActive("/") ? (
                <div
                  key="home-hover"
                  className="flex items-center justify-center"
                >
                  <BiHome
                    className="icon"
                    color={isActive("/") ? "#3B82F6" : "#74767E"}
                    size={28}
                  />
                </div>
              ) : (
                <div key="home-default">
                  <BiHomeAlt2 className="icon" color="#74767E" size={28} />
                </div>
              )}
            </div>
          </Link>
          <Link
            to="/dashboard"
            className={`flex justify-center items-center rounded-lg transition-all duration-300 ${
              isActive("/dashboard") ? "active glow" : "hover:bg-gray-100 p-1"
            }`}
            onMouseEnter={() => {
              setHoverDashboard(true);
            }}
            onMouseLeave={() => {
              setHoverDashboard(false);
            }}
          >
            <div className="relative hover:scale-110 duration-400">
              {hoverDashboard || isActive("/dashboard") ? (
                <div
                  key="dashboard-hover"
                  className="flex items-center justify-center"
                >
                  <LuLayoutDashboard
                    className="icon"
                    color={isActive("/dashboard") ? "#3B82F6" : "#74767E"}
                    size={28}
                  />
                </div>
              ) : (
                <div key="dashboard-default">
                  <MdOutlineSpaceDashboard
                    className="w-fit h-fit cursor-pointer transition-all hover: duration-400 ease-out"
                    color="#74767E"
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
                ? "active glow"
                : "hover:bg-gray-100 hover:scale-110 p-1"
            }`}
          >
            <button className="relative duration-400 cursor-pointer">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  className={`rounded-full h-[36px] w-[36px] object-cover min-w-8 pointer-events-none ${
                    isActive("/profile/0") ? "border-3" : "border-2"
                  } border-blue-500`}
                  alt="Profile"
                  tabIndex={-1}
                  onError={() => setProfilePicture("")}
                />
              ) : (
                <CgProfile
                  color={isActive("/profile/0") ? "#3B82F6" : "#707070"}
                  className="rounded-full object-cover min-w-8 h-[32px] w-[32px] pointer-events-none transition-all hover: duration-400 ease-out"
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
                className="border-1 py-2 pr-13 mx-2 rounded w-full bg-white border-blue-600 text-right"
              />
              <button
                className="absolute right-2 top-0 bottom-0 bg-blue-600 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-400 text-[#FFFFFF] px-4 rounded-r flex items-center cursor-pointer"
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
