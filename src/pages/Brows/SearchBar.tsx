import { Search } from "lucide-react";
import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-[70%] max-w-2xl">
        <input
          type="text"
          placeholder="جستجوی پروژه‌ها..."
          className="w-full py-3 pr-12 pl-4 text-right bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-sm"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors duration-200">
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;