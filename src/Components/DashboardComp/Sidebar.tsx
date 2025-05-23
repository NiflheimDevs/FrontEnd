import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import dashboard from "@/assets/Dashboard/Exclude.svg";
import projects from "@/assets/Dashboard/PencilSquare.svg";
import profile from "@/assets/Dashboard/PersonCheckFill.svg";
import Wallet from "@/assets/Dashboard/Credit.svg";
import messages from "@/assets/Dashboard/Message.svg";
import teams from "@/assets/Dashboard/Teams.svg";
import exit from "@/assets/Dashboard/DoorOpen.svg";
import { logout } from "../../API";
import { text } from "stream/consumers";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps) {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef<HTMLElement>(null);

  const projectsDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true'; // Return true if dark mode was previously enabled
  });

  const handleLogout = () => {
    logout();
  };

  const toggleProjectsDropdown = () => {
    if (isSidebarOpen || window.innerWidth >= 640) {
      setIsProjectsOpen(!isProjectsOpen);
      setIsProfileOpen(false);
    }
  };

  const toggleProfileDropdown = () => {
    if (isSidebarOpen || window.innerWidth >= 640) {
      setIsProfileOpen(!isProfileOpen);
      setIsProjectsOpen(false);
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 640) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 640) {
      setIsHovered(false);
      setIsProjectsOpen(false);
      setIsProfileOpen(false);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    if (window.innerWidth < 640) return;

    const checkHoverStatus = () => {
      if (sidebarRef.current) {
        const isMouseOver = sidebarRef.current.matches(":hover");
        setIsHovered(isMouseOver);
      }
    };

    checkHoverStatus();

    const interval = setInterval(checkHoverStatus, 100);

    return () => clearInterval(interval);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectsDropdownRef.current &&
        !projectsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProjectsOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsHovered(false);
        if (isSidebarOpen) {
          toggleSidebar();
        }
      } else {
        setIsHovered(isSidebarOpen);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen, toggleSidebar]);

  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsHovered(isSidebarOpen);
    }
  }, [isSidebarOpen]);

  const isTextVisible = window.innerWidth < 640 ? isSidebarOpen : isHovered;

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-19 right-0 md:rounded-tl-3xl sm:rounded-tl-3xl h-[calc(100vh-76px)] bg-[#D4D4D4] p-5 shadow-sm transition-all duration-400 ease-in-out z-50 will-change-[width] 
        ${isSidebarOpen ? "w-48" : "w-20"} sm:w-20 sm:hover:w-48 w-full group flex flex-col
        ${isSidebarOpen ? "block" : "hidden"} sm:block dark:bg-[#0C0B0B]`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex flex-col justify-between h-full">
        <div className="mt-5 space-y-[3.5vh] w-full items-center">
          <Link
            to="/dashboard"
            className={`relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-400 ease-in-out dark:hover:bg-[#565149] ${
              isActive("/dashboard")
                ? "font-bold text-black bg-blue-200 dark:bg-[#2b496d]"
                : "text-gray-800"
            }
            `}
          >
            <img src={dashboard} alt="Dashboard" className={`w-6 h-6 ${isDarkMode ? 'filter invert' : ''}`} />
            <span
              className={`absolute right-14 transition-all duration-200 ease-in-out will-change-[opacity,transform] ${
                isTextVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              } ${isActive("/dashboard") ? "text-black" : "text-gray-800"}  dark:text-[#F5F5F5]`}
            >
              داشبورد
            </span>
            {isActive("/dashboard") && (
              <div className="absolute left-0 w-1 h-full bg-blue-400 dark:bg-[#4270a9] "></div>
            )}
          </Link>

          <div className="relative" ref={projectsDropdownRef}>
            <button
              onClick={toggleProjectsDropdown}
              className={`cursor-pointer relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-400 ease-in-out dark:hover:bg-[#565149] ${
                isActive("/myprojects") ||
                isActive("/myprojects/active") ||
                isActive("/myprojects/completed")
                  ? "font-bold text-black bg-blue-200 "
                  : "text-gray-800"
              }`}
            >
              <img src={projects} alt="Projects" className={`w-6 h-6 ${isDarkMode ? 'filter invert' : ''}`} />
              <span
                className={`absolute right-14 transition-all duration-200 ease-in-out will-change-[opacity,transform] ${
                  isTextVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                } ${
                  isActive("/myprojects") ||
                  isActive("/myprojects/active") ||
                  isActive("/myprojects/completed")
                    ? "text-black"
                    : "text-gray-800 "
                } dark:text-[#F5F5F5] `}
              >
                پروژه‌ها
              </span>
              <MdArrowDropDown
                className={`absolute right-10 transition-all duration-200 ease-in-out will-change-[opacity,transform] ${
                  isTextVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                } text-gray-800`}
              />
            </button>

            {isProjectsOpen && isTextVisible && (
              <div className="absolute right-0 mt-2 w-full bg-gray-200 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out">
                <Link
                  to="/myprojects"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:rounded-lg dark:text-[#F5F5F5] dark:hover:bg-[#565149]"
                >
                  پروژه‌های من
                </Link>
                <Link
                  to="/createproject"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:rounded-lg dark:text-[#F5F5F5] dark:hover:bg-[#565149]"
                >
                  ساخت پروژه
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/wallet"
            className={`relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-400 ease-in-out dark:hover:bg-[#565149] ${
              isActive("/wallet")
                ? "font-bold text-black bg-blue-200"
                : "text-gray-800" 
              }
              dark:text-[#F5F5F5]`}
          >
            <img src={Wallet} alt="Wallet" className={`w-6 h-6 ${isDarkMode ? 'filter invert' : ''}`} />
            <span
              className={`absolute right-14 transition-all duration-200 whitespace-nowrap ease-in-out will-change-[opacity,transform] ${
                isTextVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              } ${isActive("/wallet") ? "text-black" : "text-gray-800"} dark:text-[#F5F5F5]`}
            >
              کیف پول
            </span>
            {isActive("/wallet") && (
              <div className="absolute left-0 w-1 h-full bg-blue-400"></div>
            )}
          </Link>

          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={toggleProfileDropdown}
              className={`cursor-pointer relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-400 ease-in-out dark:hover:bg-[#565149] ${
                isActive("/profile") ||
                isActive("/profile/edit") ||
                isActive("/changepass")
                  ? "font-bold text-black bg-blue-200"
                  : "text-gray-800"
              }`}
            >
              <img src={profile} alt="Profile" className={`w-6 h-6 ${isDarkMode ? 'filter invert' : ''}`} />
              <span
                className={`absolute right-14 transition-all duration-200 ease-in-out will-change-[opacity,transform] ${
                  isTextVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                } ${
                  isActive("/profile") ||
                  isActive("/profile/edit") ||
                  isActive("/changepass")
                    ? "text-black"
                    : "text-gray-800"
                }
                dark:text-[#F5F5F5]`}
              >
                پروفایل
              </span>
              <MdArrowDropDown
                className={`absolute right-10 transition-all duration-200 ease-in-out will-change-[opacity,transform] ${
                  isTextVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                } text-gray-800 dark:text-[#F5F5F5]`}
              />
            </button>

            {isProfileOpen && isTextVisible && (
              <div className="absolute right-0 mt-2 w-full bg-gray-200 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out dark:hover:bg-[#565149] ">
                <Link
                  to="/profile"
                  className={`block px-4 py-2 hover:bg-gray-300 hover:rounded-lg ${
                    isActive("/profile")
                      ? "font-bold text-black bg-blue-200"
                      : "text-gray-800"
                  }
                  dark:text-[#F5F5F5]`}
                >
                  ویرایش پروفایل
                </Link>
                <Link
                  to="/changepass"
                  className={`block px-4 py-2 hover:bg-gray-300 hover:rounded-lg  dark:hover:bg-[#565149] ${
                    isActive("/changepass")
                      ? "font-bold text-black bg-blue-200"
                      : "text-gray-800"
                  }`}
                >
                  تغییر رمز
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/chat"
            className={`relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-400 ease-in-out dark:hover:bg-[#565149] ${
              isActive("/chat")
                ? "font-bold text-black bg-blue-200"
                : "text-gray-800"
            }
            dark:text-[#F5F5F5]`}
          >
            <img src={messages} alt="chat" className={`w-6 h-6 ${isDarkMode ? 'filter invert' : ''}`} />
            <span
              className={`absolute right-14 transition-all duration-200 ease-in-out will-change-[opacity,transform] ${
                isTextVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              } ${isActive("/chat") ? "text-black" : "text-gray-800"} dark:text-[#F5F5F5]`}
            >
              پیام‌ها
            </span>
            {isActive("/chat") && (
              <div className="absolute left-0 w-1 h-full bg-blue-400"></div>
            )}
          </Link>

          <Link
            to="/teams"
            className={`relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-300 dark:hover:bg-[#565149] ${
              isActive("/teams")
                ? "font-bold text-black bg-blue-200"
                : "text-gray-800"
            }
            dark:text-[#F5F5F5]`}
          >
            <img src={teams} alt="teams" className={`w-6 h-6 ${isDarkMode ? 'filter invert' : ''}`} />
            <span
              className={`absolute right-14 transition-all duration-200 whitespace-nowrap ease-in-out will-change-[opacity,transform] ${
                isTextVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              } ${isActive("/teams") ? "text-black" : "text-gray-800"} dark:text-[#F5F5F5]`}
            >
              تیم‌ها
            </span>
            {isActive("/teams") && (
              <div className="absolute left-0 w-1 h-full bg-blue-400"></div>
            )}
          </Link>

          <div className="w-full relative lg:hidden md:hidden sm:hidden block">
            <button
              onClick={handleLogout}
              className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-400 ease-in-out cursor-pointer"
            >
              <img src={exit} alt="exit" className={`w-6 h-6 ${isDarkMode ? 'filter invert' : ''}`} />
              <span
                className={`absolute right-14 transition-all duration-200 ease-in-out will-change-[opacity,transform] ${
                  isTextVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                } text-gray-800 cursor-pointer dark:text-[#F5F5F5]`}
              >
                خروج
              </span>
            </button>
          </div>
        </div>

        <div className="w-full static lg:block md:block sm:block hidden">
          <button
            onClick={handleLogout}
            className="relative flex items-center w-full p-2 rounded hover:bg-gray-200 transition-all duration-400 ease-in-out cursor-pointer dark:hover:bg-[#1A1814]"
          >
            <img src={exit} alt="exit" className={`w-6 h-6 ${isDarkMode ? 'filter invert' : ''}`} />
            <span
              className={`absolute right-14 transition-all duration-200 ease-in-out will-change-[opacity,transform] ${
                isTextVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              } text-gray-800 cursor-pointer dark:text-[#F5F5F5]`}
            >
              خروج
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
