import React, { useRef, useEffect } from "react";

interface FilterDropdownProps {
  isOpen: boolean;
  toggleDropdown: () => void;
  selectedValue: string;
  options: string[];
  onSelect: (value: string) => void;
  isMultiSelect?: boolean;
  selectedValues?: string[];
  maxSelect?: number;
  renderSearchBar?: () => React.ReactNode;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  toggleDropdown,
  selectedValue,
  options,
  onSelect,
  isMultiSelect = false,
  selectedValues = [],
  maxSelect,
  renderSearchBar,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleDropdown(); // Close the dropdown
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-6 py-2 rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 flex items-center gap-2"
        aria-expanded={isOpen}
        aria-controls={`dropdown-${selectedValue.replace(/\s+/g, "-")}`}
      >
        {selectedValue}
        <svg
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id={`dropdown-${selectedValue.replace(/\s+/g, "-")}`}
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-52 overflow-y-auto"
        >
          {renderSearchBar && (
            <div className="px-3 pt-3 pb-1">{renderSearchBar()}</div>
          )}
          {options.map((option, index) => {
            const isSelected = isMultiSelect && selectedValues.includes(option);
            const isDisabled = isMultiSelect && maxSelect !== undefined && !isSelected && selectedValues.length >= maxSelect;
            return (
              <button
                key={index}
                onClick={() => {
                  if (isDisabled) return;
                  onSelect(option);
                }}
                className={`w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center justify-end gap-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isDisabled}
              >
                {isMultiSelect && (
                  <svg
                    className={`w-4 h-4 ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-transparent"}`}
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
