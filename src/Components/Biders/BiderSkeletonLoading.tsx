import React from "react";
import { Skeleton } from "primereact/skeleton";

const BiderSkeletonLoading: React.FC = () => {
  return (
    <>
      {/* Filter Section Skeleton */}
      <div className="mb-8 mt-2 bg-white dark:bg-gray-700 shadow-xl rounded-2xl py-8 px-10 border border-gray-50 dark:border-gray-600">
        <div className="flex flex-col space-y-8">
          <div className="flex md:flex-row sm:flex-row flex-col gap-[4vw]">
            {/* Left Section (Search and Price Range) */}
            <div className="flex-col w-full flex gap-[3vh]">
              {/* Search Input Skeleton */}
              <div className="flex w-full flex-col">
                <Skeleton
                  width="30%"
                  height="1rem"
                  className="shiny-skeleton mb-2 dark:!border-gray-600 dark:!bg-gray-600"
                />
                <Skeleton
                  width="100%"
                  height="2.5rem"
                  className="shiny-skeleton rounded-xl border !border-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                />
              </div>
              {/* Price Range Skeleton */}
              <div className="flex-col flex w-full">
                <Skeleton
                  width="30%"
                  height="1rem"
                  className="shiny-skeleton mb-2 dark:!border-gray-600 dark:!bg-gray-600"
                />
                <div className="flex items-center gap-4">
                  <Skeleton
                    width="100%"
                    height="2.5rem"
                    className="shiny-skeleton rounded-xl border !border-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                  />
                  <Skeleton
                    width="2rem"
                    height="1rem"
                    className="shiny-skeleton dark:!border-gray-600 dark:!bg-gray-600"
                  />
                  <Skeleton
                    width="100%"
                    height="2.5rem"
                    className="shiny-skeleton rounded-xl border !border-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                  />
                </div>
                <Skeleton
                  width="60%"
                  height="0.75rem"
                  className="shiny-skeleton mt-3 dark:!border-gray-600 dark:!bg-gray-600"
                />
              </div>
            </div>

            {/* Right Section (Sliders) */}
            <div className="flex flex-col gap-[10vh] w-full">
              {/* Min Rating Slider Skeleton */}
              <div className="space-y-2 flex flex-col w-full">
                <Skeleton
                  width="30%"
                  height="1rem"
                  className="shiny-skeleton dark:!border-gray-600 dark:!bg-gray-600"
                />
                <div className="relative h-2 mt-1 bg-gray-200 dark:!bg-gray-600 rounded-full">
                  <Skeleton
                    width="50%"
                    height="0.5rem"
                    className="absolute rounded-full px-2 dark:!border-gray-600 dark:!bg-gray-600"
                  />
                  <Skeleton
                    width="1.25rem"
                    height="1.25rem"
                    shape="circle"
                    className="absolute z-40 -top-3.5 border-2 bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                  />
                </div>
              </div>
              {/* Max Delivery Days Slider Skeleton */}
              <div className="space-y-2 flex flex-col w-full">
                <Skeleton
                  width="30%"
                  height="1rem"
                  className="shiny-skeleton dark:!border-gray-600 dark:!bg-gray-600"
                />
                <div className="relative h-2 mt-1 bg-gray-200 dark:!bg-gray-600 rounded-full">
                  <Skeleton
                    width="50%"
                    height="0.5rem"
                    className="absolute rounded-full px-2 dark:!border-gray-600 dark:!bg-gray-600"
                  />
                  <Skeleton
                    width="1.25rem"
                    height="1.25rem"
                    shape="circle"
                    className="absolute z-40 -top-3.5 border-2 bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button Skeleton */}
          <div className="flex justify-start">
            <Skeleton
              width="10rem"
              height="2.5rem"
              className="shiny-skeleton rounded-xl bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Biders List Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* UserProfileCard Skeleton (3 cards) */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-100 dark:!border-gray-600 dark:!bg-gray-700 w-full p-6 box-shadow-custom duration-300"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section Skeleton */}
              <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                <Skeleton
                  shape="circle"
                  size="6rem"
                  className="shiny-skeleton border-2 border-gray-200 bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                />
              </div>

              {/* Info Section Skeleton */}
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex flex-col w-full">
                    <Skeleton
                      width="60%"
                      height="1.5rem"
                      className="shiny-skeleton mb-2 text-center md:text-right bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                    />
                    <Skeleton
                      width="90%"
                      height="2.5rem"
                      className="shiny-skeleton text-center md:text-right bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                    />
                  </div>
                  <div className="flex flex-col w-full items-center md:items-start space-y-2">
                    <div className="flex items-center w-full">
                      <Skeleton
                        width="1.25rem"
                        height="1.25rem"
                        className="shiny-skeleton ml-2 bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                      />
                      <Skeleton
                        width="50%"
                        height="0.875rem"
                        className="shiny-skeleton bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                      />
                    </div>
                    <div className="flex items-center w-full">
                      <Skeleton
                        width="1.25rem"
                        height="1.25rem"
                        className="shiny-skeleton ml-2 bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                      />
                      <Skeleton
                        width="50%"
                        height="0.875rem"
                        className="shiny-skeleton bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                      />
                    </div>
                    <div className="flex items-center w-full">
                      <Skeleton
                        width="1.25rem"
                        height="1.25rem"
                        className="shiny-skeleton ml-2 bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                      />
                      <Skeleton
                        width="50%"
                        height="0.875rem"
                        className="shiny-skeleton bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="mt-4 flex flex-col md:flex-row gap-3 md:gap-4 md:space-x-reverse">
                  <Skeleton
                    width="100%"
                    height="2rem"
                    className="shiny-skeleton rounded-md bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                  />
                  <Skeleton
                    width="100%"
                    height="2rem"
                    className="shiny-skeleton rounded-md bg-gray-200 dark:!border-gray-600 dark:!bg-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BiderSkeletonLoading;
