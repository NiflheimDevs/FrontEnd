import React from "react";

interface FilterDropdownProps {
  isOpen: boolean;
  toggleDropdown: () => void;
  selectedValue: string;
  options: string[];
  onSelect: (value: string) => void;
  isMultiSelect?: boolean;
  selectedValues?: string[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  toggleDropdown,
  selectedValue,
  options,
  onSelect,
  isMultiSelect = false,
  selectedValues = [],
}) => {
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-white border border-gray-300 px-6 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2"
      >
        {selectedValue}
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(option)}
              className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 flex items-center justify-end gap-2"
            >
              {isMultiSelect && (
                <svg
                  className={`w-4 h-4 ${selectedValues.includes(option) ? "text-blue-600" : "text-transparent"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;