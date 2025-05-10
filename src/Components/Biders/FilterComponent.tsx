import React, { ChangeEvent, useRef, useState, useEffect } from "react";

interface FilterProps {
  maxDeliveryDays: number;
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

// کامپوننت اسلایدر سفارشی
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
  const rafRef = useRef<number | null>(null);

  const calculateValue = (clientX: number) => {
    if (!trackRef.current) return value;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    );
    const newValue = Math.round((min + percentage * (max - min)) / step) * step;
    return Math.max(min, Math.min(max, newValue));
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    const newValue = calculateValue(clientX);
    onChange(newValue);
  };

  const handleMove = (clientX: number, e: TouchEvent | MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // جلوگیری از اسکرول یا رفتارهای پیش‌فرض
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const newValue = calculateValue(clientX);
      onChange(newValue);
    });
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  // رویدادهای ماوس
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX, e);
  };

  // رویدادهای لمسی
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX, e);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2 flex flex-col w-full">
      <span className="text-sm font-semibold text-gray-800 select-none">
        {label}: {value}
      </span>
      <div
        dir="ltr"
        ref={trackRef}
        className="relative h-2 mt-1 bg-gray-200 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-300 touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className="absolute h-2 bg-gradient-to-l from-blue-500 to-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full -top-1.5 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-125"
          style={{
            left: `${percentage}%`,
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
};

const FilterComponent: React.FC<FilterProps> = ({
  maxDeliveryDays,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => {
  const [tempFilters, setTempFilters] = useState(filters);
  const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);

  const handlePriceRangeChange = (value: number, index: 0 | 1) => {
    const newPriceRange: [number, number] = [...tempFilters.priceRange];
    newPriceRange[index] = Math.max(0, value || 0);
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
    <div className="mb-8 mt-2 bg-white shadow-xl rounded-2xl py-8 px-10 border border-gray-50">
      <form className="flex flex-col space-y-8">
        <div className="flex md:flex-row sm:flex-row flex-col gap-[4vw]">
          <div className="flex-col w-full flex gap-[3vh]">
            {/* Search Input */}
            <div className="flex w-full flex-col">
              <span className="text-sm font-semibold text-gray-800 block mb-2 select-none">
                جستجوی پیمانکاران یا مهارت‌ها
              </span>
              <input
                id="search-input"
                type="text"
                placeholder="جستجو..."
                value={tempSearchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTempSearchTerm(e.currentTarget.value)
                }
                className="w-full h-fit rounded-xl border border-gray-200 px-3 py-2 text-right transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            {/* Price Range Filter */}
            <div className="flex-col flex w-full">
              <span className="text-sm font-semibold text-gray-800 block mb-2 select-none">
                محدوده قیمت (تومان)
              </span>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={10000000}
                  value={tempFilters.priceRange[0]}
                  onChange={(e) =>
                    handlePriceRangeChange(Number(e.target.value), 0)
                  }
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-right transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 no-spinner"
                />
                <span className="text-sm text-gray-500 font-medium select-none">
                  تا
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={10000000}
                  value={tempFilters.priceRange[1]}
                  onChange={(e) =>
                    handlePriceRangeChange(Number(e.target.value), 1)
                  }
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-right transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 no-spinner"
                />
              </div>
              <span className="text-xs text-gray-500 mt-3 block select-none">
                از {formatPrice(tempFilters.priceRange[0])} تومان تا{" "}
                {formatPrice(tempFilters.priceRange[1])} تومان
              </span>
            </div>
          </div>

          {/* Sliders (Vertical Layout) */}
          <div className="flex flex-col gap-[10vh] w-full">
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
              max={maxDeliveryDays}
              step={1}
              value={tempFilters.maxDeliveryDays}
              onChange={(value) =>
                setTempFilters({ ...tempFilters, maxDeliveryDays: value })
              }
              label="حداکثر روزهای تحویل"
            />
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
            className="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            اعمال فیلتر
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterComponent;
