import React, { ChangeEvent } from "react";
import {
  TextInput,
  Slider,
  NumberInput,
  Group,
  Text,
  Box,
} from "@mantine/core";

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: {
    minRating: number;
    maxPrice: number; // اضافه شده برای همگام‌سازی با Biders.tsx
    maxDeliveryDays: number;
    priceRange: [number, number];
  };
  setFilters: (filters: {
    minRating: number;
    maxPrice: number; // اضافه شده برای همگام‌سازی
    maxDeliveryDays: number;
    priceRange: [number, number];
  }) => void;
}

const FilterComponent: React.FC<FilterProps> = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => {
  const handlePriceRangeChange = (value: number, index: 0 | 1) => {
    const newPriceRange: [number, number] = [...filters.priceRange];
    newPriceRange[index] = value || 0;
    setFilters({ ...filters, priceRange: newPriceRange });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  return (
    <Box className="mb-8 bg-white shadow-md rounded-lg p-6" dir="rtl">
      <div className="flex flex-col space-y-6">
        {/* Search Input */}
        <div className="flex-grow">
          <TextInput
            label="جستجوی پیمانکاران یا مهارت‌ها"
            placeholder="جستجوی پیمانکاران یا مهارت‌ها..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.currentTarget.value)
            }
            className="w-full"
            styles={{
              input: {
                direction: "rtl",
                textAlign: "right",
              },
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rating Filter */}
          <div>
            <Text size="sm" fw={500} mb="xs">
              حداقل امتیاز: {filters.minRating}
            </Text>
            <Slider
              min={0}
              max={5}
              step={1}
              value={filters.minRating}
              onChange={(value) => setFilters({ ...filters, minRating: value })}
              className="transition-all duration-300 ease-in-out"
              styles={{
                bar: {
                  backgroundColor: "#3b82f6",
                  transition: "width 300ms ease-in-out",
                },
                thumb: {
                  transition: "transform 300ms ease-in-out",
                  borderColor: "#3b82f6",
                  backgroundColor: "white",
                },
                track: {
                  backgroundColor: "#e5e7eb",
                },
              }}
            />
          </div>

          {/* Price Range Filter */}
          <div className="px-4">
            <Text size="sm" fw={500} mb="xs">
              محدوده قیمت (تومان)
            </Text>
            <Group gap="sm" align="center" dir="rtl">
              <NumberInput
                min={0}
                max={10000000}
                value={filters.priceRange[0]}
                hideControls={true}
                onChange={(value) => handlePriceRangeChange(Number(value), 0)}
                className="w-full"
                thousandSeparator=","
                styles={{
                  input: {
                    direction: "rtl",
                    textAlign: "right",
                  },
                }}
              />
              <Text size="sm" c="dimmed">
                تا
              </Text>
              <NumberInput
                min={0}
                max={10000000}
                value={filters.priceRange[1]}
                hideControls={true}
                onChange={(value) => handlePriceRangeChange(Number(value), 1)}
                className="w-full"
                thousandSeparator=","
                styles={{
                  input: {
                    direction: "rtl",
                    textAlign: "right",
                  },
                }}
              />
            </Group>
            <Text size="xs" c="dimmed" mt="xs">
              از {formatPrice(filters.priceRange[0])} تومان تا{" "}
              {formatPrice(filters.priceRange[1])} تومان
            </Text>
          </div>

          {/* Delivery Days Filter */}
          <div>
            <Text size="sm" fw={500} mb="xs">
              حداکثر روزهای تحویل: {filters.maxDeliveryDays}
            </Text>
            <Slider
              min={1}
              max={30}
              step={1}
              value={filters.maxDeliveryDays}
              onChange={(value) =>
                setFilters({ ...filters, maxDeliveryDays: value })
              }
              className="transition-all duration-300 ease-in-out"
              styles={{
                bar: {
                  backgroundColor: "#3b82f6",
                  transition: "width 300ms ease-in-out",
                },
                thumb: {
                  transition: "transform 300ms ease-in-out",
                  borderColor: "#3b82f6",
                  backgroundColor: "white",
                },
                track: {
                  backgroundColor: "#e5e7eb",
                },
              }}
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default FilterComponent;
