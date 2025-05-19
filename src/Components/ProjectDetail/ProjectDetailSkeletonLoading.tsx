import React from "react";
import { Skeleton } from "primereact/skeleton";

const ProjectDetailSkeletonLoading: React.FC = () => {
  return (
    <main className="flex-1 p-4 sm:p-6 md:mt-2 sm:mt-2 mt-20 flex justify-center">
      <div className="shadow-2xl rounded-3xl bg-white flex flex-col sm:flex-row w-full max-w-7xl mx-auto h-auto sm:h-[600px] gap-8 sm:gap-14 p-6 sm:p-8 transition-all duration-300">
        {/* Left Section: Project Info */}
        <div className="w-full sm:w-1/2 flex flex-col space-y-8">
          {/* Title and Meta */}
          <div className="flex flex-col space-y-3">
            <Skeleton
              width="65%"
              height="2.25rem"
              className="shiny-skeleton text-right rounded-lg"
            />
            <div className="flex flex-col space-y-2 text-right">
              <Skeleton
                width="35%"
                height="0.875rem"
                className="shiny-skeleton rounded-md"
              />
              <Skeleton
                width="25%"
                height="0.875rem"
                className="shiny-skeleton rounded-md"
              />
            </div>
          </div>
          {/* Description */}
          <div>
            <Skeleton
              width="45%"
              height="1.5rem"
              className="shiny-skeleton mb-3 text-right rounded-md"
            />
            <Skeleton
              width="100%"
              height="5rem"
              className="shiny-skeleton text-right rounded-lg"
            />
          </div>
          {/* Tags */}
          <div>
            <Skeleton
              width="45%"
              height="1.5rem"
              className="shiny-skeleton mb-3 text-right rounded-md"
            />
            <div className="flex flex-wrap gap-3 justify-start">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  width="4.5rem"
                  height="1.75rem"
                  className="shiny-skeleton rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Biders and Buttons */}
        <div className="w-full sm:w-1/2 flex flex-col space-y-6">
          <div className="flex-1">
            <Skeleton
              width="35%"
              height="1.5rem"
              className="shiny-skeleton mb-2 mt-4 text-right rounded-md !bg-blue-400"
            />
            <div className="space-y-4 max-h-107 overflow-y-auto  custom-scrollbar">
              <div className="flex items-center gap-3 w-full justify-between py-4 px-3 rounded-xl shadow-lg bg-blue-400 transition-all duration-200 hover:shadow-xl">
                <div className="flex items-center space-x-4 gap-4 space-x-reverse">
                  <Skeleton
                    shape="circle"
                    size="2.5rem"
                    className="shiny-skeleton border-2 border-gray-200 rounded-full"
                  />
                  <div className="text-right">
                    <Skeleton
                      width="6rem"
                      height="1rem"
                      className="shiny-skeleton mb-2 rounded-md"
                    />
                    <Skeleton
                      width="9rem"
                      height="0.875rem"
                      className="shiny-skeleton rounded-md"
                    />
                  </div>
                </div>
                <Skeleton
                  width="5rem"
                  height="1rem"
                  className="shiny-skeleton rounded-md"
                />
              </div>

              {/* Bider Cards Skeleton (3 cards) */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 w-full justify-between py-4 px-3 rounded-xl shadow-lg bg-blue-300 transition-all duration-200 hover:shadow-xl"
                >
                  <div className="flex items-center space-x-4 gap-4 space-x-reverse">
                    <Skeleton
                      shape="circle"
                      size="2.5rem"
                      className="shiny-skeleton border-2 border-gray-200 rounded-full"
                    />
                    <div className="text-right">
                      <Skeleton
                        width="6rem"
                        height="1rem"
                        className="shiny-skeleton mb-2 rounded-md"
                      />
                      <Skeleton
                        width="9rem"
                        height="0.875rem"
                        className="shiny-skeleton rounded-md"
                      />
                    </div>
                  </div>
                  <Skeleton
                    width="5rem"
                    height="1rem"
                    className="shiny-skeleton rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-center gap-6">
            <Skeleton
              width="75%"
              height="3.25rem"
              className="shiny-skeleton rounded-xl"
            />
            <Skeleton
              width="25%"
              height="3.25rem"
              className="shiny-skeleton rounded-xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailSkeletonLoading;
