import React, { ChangeEvent, useRef, useState, useEffect } from "react";

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: {
    minRating: number;
    maxPrice: number;
    maxDeliveryDays: number;
    priceRange: [number, number];
  };
  setFilters: (filters: {
    minRating: number;
    maxPrice: number;
    maxDeliveryDays: number;
    priceRange: [number, number];
  }) => void;
}

// کامپوننت اسلایدر سفارشی (بدون تغییر، چون از Mantine استفاده نمی‌کند)
const CustomSlider: React.FC<{
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
}> = ({ min, max, step, value, onChange, label }) => {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const calculateValue = (clientX: number) => {
    if (!trackRef.current) return value;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = 1 - (clientX - rect.left) / rect.width;
    const newValue = Math.round(min + (percentage * (max - min)) / step) * step;
    return Math.max(min, Math.min(max, newValue));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const newValue = calculateValue(e.clientX);
    onChange(newValue);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newValue = calculateValue(e.clientX);
      onChange(newValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div dir="rtl" className="space-y-2">
      <span className="text-sm font-semibold text-gray-800">
        {label}: {value}
      </span>
      <div
        ref={trackRef}
        className="relative h-2.5 mt-1 bg-gray-200 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-300"
        onMouseDown={handleMouseDown}
      >
        <div
          className="absolute h-2.5 bg-gradient-to-l from-blue-500 to-blue-600 rounded-full"
          style={{
            right: 0,
            left: `${100 - percentage}%`,
          }}
        />
        <div
          className="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full -top-1.5 shadow-lg transition-transform duration-200 hover:scale-125"
          style={{
            right: `${percentage}%`,
            transform: "translateX(50%)",
          }}
        />
      </div>
    </div>
  );
};

const FilterComponent: React.FC<FilterProps> = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => {
  const [tempFilters, setTempFilters] = useState(filters);
  const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);

  const handlePriceRangeChange = (value: number, index: 0 | 1) => {
    const newPriceRange: [number, number] = [...tempFilters.priceRange];
    newPriceRange[index] = value || 0;
    setTempFilters({ ...tempFilters, priceRange: newPriceRange });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setSearchTerm(tempSearchTerm);
  };

  return (
    <div
      className="mb-8 bg-white shadow-xl rounded-2xl p-8 border border-gray-50"
      dir="rtl"
    >
      <form className="flex flex-col space-y-8">
        {/* Search Input */}
        <div className="flex-grow">
          <label
            className="mb-2 font-semibold text-gray-800 text-base"
            htmlFor="search-input"
          >
            جستجوی پیمانکاران یا مهارت‌ها
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="جستجوی پیمانکاران یا مهارت‌ها..."
            value={tempSearchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTempSearchTerm(e.currentTarget.value)
            }
            className="w-full rounded-xl border border-gray-200 p-3 text-right transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            style={{ direction: "rtl" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sliders (Vertical Layout) */}
          <div className="space-y-20 px-4 py-2">
            <CustomSlider
              min={0}
              max={5}
              step={1}
              value={tempFilters.minRating}
              onChange={(value) =>
                setTempFilters({ ...tempFilters, minRating: value })
              }
              label="حداقل امتیاز"
            />
            <CustomSlider
              min={1}
              max={30}
              step={1}
              value={tempFilters.maxDeliveryDays}
              onChange={(value) =>
                setTempFilters({ ...tempFilters, maxDeliveryDays: value })
              }
              label="حداکثر روزهای تحویل"
            />
          </div>

          {/* Price Range Filter */}
          <div className="px-4">
            <span className="text-sm font-semibold text-gray-800 block mb-2">
              محدوده قیمت (تومان)
            </span>
            <div className="flex items-center gap-4" dir="rtl">
              <input
                type="number"
                min={0}
                max={10000000}
                value={tempFilters.priceRange[0]}
                onChange={(e) =>
                  handlePriceRangeChange(Number(e.target.value), 0)
                }
                className="w-full rounded-xl border border-gray-200 p-2.5 text-right transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 no-spinner"
                style={{ direction: "rtl" }}
              />
              <span className="text-sm text-gray-500 font-medium">تا</span>
              <input
                type="number"
                min={0}
                max={10000000}
                value={tempFilters.priceRange[1]}
                onChange={(e) =>
                  handlePriceRangeChange(Number(e.target.value), 1)
                }
                className="w-full rounded-xl border border-gray-200 p-2.5 text-right transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 no-spinner"
                style={{ direction: "rtl" }}
              />
            </div>
            <span className="text-xs text-gray-500 mt-3 block">
              از {formatPrice(tempFilters.priceRange[0])} تومان تا{" "}
              {formatPrice(tempFilters.priceRange[1])} تومان
            </span>
          </div>
        </div>

        {/* دکمه اعمال فیلتر */}
        <div className="flex justify-start">
          <button
            onClick={(e) => {
              e.preventDefault();
              applyFilters();
            }}
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            اعمال فیلتر
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterComponent;
