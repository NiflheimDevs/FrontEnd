import React from "react";
import LOGO from "@/assets/Dashboard/BIDLANCERLOGO.svg";
import SearchIcon from "@/assets/Dashboard/Search.svg";
import Mail from "@/assets/Dashboard/Mail.svg";
import FAQ from "@/assets/Dashboard/FAQ.svg";
import BELL from "@/assets/Dashboard/Bell.svg";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";

const Header = () => {
  // Check if the user is logged in by retrieving the token from localStorage
  const token = localStorage.getItem("authToken");

  return (
    <header className="shadow fixed top-0 left-0 right-0 z-50 bg-white p-4 flex justify-between items-center">
      {/* Left Section: Logo and Title (common for both states) */}
      <div className="flex items-center gap-3">
        <div className="flex w-fit h-fit items-center">
          <label className="text-lg font-semibold">بیدلنسر</label>
          <img src={LOGO} alt="Logo" className="h-11 w-14" />
        </div>
      </div>

      {/* Right Section: Conditional Rendering based on login status */}
      {token ? (
        // Logged-in state: Show the icons (Search, Bell, Mail, FAQ, Profile)
        <div className="flex w-fit h-fit items-center md:gap-5 sm:gap-5 gap-[3vw]">
          <button className="w-fit h-fit md:hidden sm:hidden flex cursor-pointer hover:scale-115 hover:animate-shake">
            <object
              data={SearchIcon}
              type="image/svg+xml"
              className="h-6 scale-95 pointer-events-none"
              tabIndex={-1}
            />
          </button>

          <button className="w-fit h-fit cursor-pointer hover:scale-110 hover:animate-shake">
            <object
              data={BELL}
              type="image/svg+xml"
              className="h-6 pointer-events-none"
              tabIndex={-1}
            />
          </button>

          <button className="w-fit h-fit cursor-pointer hover:scale-110 hover:animate-shake">
            <object
              data={Mail}
              type="image/svg+xml"
              className="h-6 pointer-events-none"
              tabIndex={-1}
            />
          </button>

          <button className="w-fit h-fit cursor-pointer hover:scale-110 hover:animate-shake">
            <object
              data={FAQ}
              type="image/svg+xml"
              className="h-6 pointer-events-none"
              tabIndex={-1}
            />
          </button>

          <button className="w-fit h-fit cursor-pointer">
            <img
              src={ProfileDefault}
              className="rounded-full object-cover min-w-8 pointer-events-none"
              alt="Profile"
              tabIndex={-1}
            />
          </button>
        </div>
      ) : (
        // Logged-out state: Show a simplified header (like in the image)
        <div className="flex w-fit h-fit items-center gap-3">
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
            العربية
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;