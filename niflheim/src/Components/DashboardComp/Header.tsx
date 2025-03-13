import { Bell, Search, Menu } from "lucide-react";
import LOGO from "@/assets/Dashboard/BIDLANCERLOGO.svg";

export default function Header({ toggleSidebar }:any) {
  return (
    <header
      className="shadow fixed top-0 left-0 right-0 z-50 bg-white p-4 flex justify-between items-center"
      style={{ transform: "rotate(0deg)" }}
    >
      <div className="flex items-center gap-2">
        <label className="text-lg font-semibold">بیدلنسر</label>
        <img src={LOGO} alt="Logo" className="h-11 w-14" />
      </div>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="جستجو"
          className="pl-4 pr-15 border-2 py-2 rounded w-64 md:w-200 text-right"
        />
        <button className="absolute right-0 top-0 bottom-0 bg-blue-600 hover:bg-blue-700 text-[#FFFFFF] px-4 rounded-r flex items-center">
          <Search size={18} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Bell className="text-gray-500 cursor-pointer" />
        <button onClick={toggleSidebar} className="md:hidden">
          <Menu className="text-gray-500 cursor-pointer" />
        </button>
      </div>
    </header>
  );
}