import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import { TextInput, NumberInput, Group, Text, Box } from "@mantine/core";

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
      <Text size="sm" fw={600} className="text-gray-800">
        {label}: {value}
      </Text>
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
    <Box
      className="mb-8 bg-white shadow-xl rounded-2xl p-8 border border-gray-50"
      dir="rtl"
    >
      <form className="flex flex-col space-y-8">
        {/* Search Input */}
        <div className="flex-grow">
          <TextInput
            label="جستجوی پیمانکاران یا مهارت‌ها"
            placeholder="جستجوی پیمانکاران یا مهارت‌ها..."
            value={tempSearchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTempSearchTerm(e.currentTarget.value)
            }
            className="w-full"
            styles={{
              input: {
                direction: "rtl",
                textAlign: "right",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                padding: "12px",
                transition: "all 0.3s ease",
                "&:focus": {
                  borderColor: "#4f46e5",
                  boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.1)",
                },
              },
              label: {
                marginBottom: "8px",
                fontWeight: 600,
                color: "#1f2937",
                fontSize: "16px",
              },
            }}
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
            <Text size="sm" fw={600} mb="xs" className="text-gray-800">
              محدوده قیمت (تومان)
            </Text>
            <Group gap="md" align="center" dir="rtl">
              <NumberInput
                min={0}
                max={10000000}
                value={tempFilters.priceRange[0]}
                hideControls={true}
                onChange={(value) => handlePriceRangeChange(Number(value), 0)}
                className="w-full"
                thousandSeparator=","
                styles={{
                  input: {
                    direction: "rtl",
                    textAlign: "right",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    padding: "10px",
                    transition: "all 0.3s ease",
                    "&:focus": {
                      borderColor: "#4f46e5",
                      boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.1)",
                    },
                  },
                }}
              />
              <Text size="sm" c="dimmed" fw={500}>
                تا
              </Text>
              <NumberInput
                min={0}
                max={10000000}
                value={tempFilters.priceRange[1]}
                hideControls={true}
                onChange={(value) => handlePriceRangeChange(Number(value), 1)}
                className="w-full"
                thousandSeparator=","
                styles={{
                  input: {
                    direction: "rtl",
                    textAlign: "right",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    padding: "10px",
                    transition: "all 0.3s ease",
                    "&:focus": {
                      borderColor: "#4f46e5",
                      boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.1)",
                    },
                  },
                }}
              />
            </Group>
            <Text size="xs" c="dimmed" mt="md">
              از {formatPrice(tempFilters.priceRange[0])} تومان تا{" "}
              {formatPrice(tempFilters.priceRange[1])} تومان
            </Text>
          </div>
        </div>

        {/* دکمه اعمال فیلتر */}
        <div className="flex justify-start">
          <button
            onClick={(e) => {
              e.preventDefault();
              applyFilters();
            }}
            onSubmit={(e) => {
              e.preventDefault();
              applyFilters();
            }}
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-103"
          >
            اعمال فیلتر
          </button>
        </div>
      </form>
    </Box>
  );
};

export default FilterComponent;
