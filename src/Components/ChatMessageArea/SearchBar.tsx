// src/components/ChatMessageArea/SearchBar.tsx
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchBar = ({ searchQuery, onSearch }: SearchBarProps) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="جستجوی مخاطب..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(searchQuery)}
        className="w-full py-3 pr-12 pl-4 text-right bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-sm shadow-sm transition-all duration-300"
      />
      <button
        onClick={() => onSearch(searchQuery)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer"
      >
        <Search
          size={20}
          className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
        />
      </button>
    </div>
  );
};

export default SearchBar;