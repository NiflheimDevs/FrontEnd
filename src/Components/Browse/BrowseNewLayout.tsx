import React from "react";
import Header from "../MainContent/Header";
import BrowsePage from ".";

const BrowseNewLayout: React.FC = () => {
  return (
    <>
      <div className="flex inset-0 bg-[#F7F7F7] dark:bg-gray-800 z-[-1]"></div>
      <div className="flex flex-col bg-[#F7F7F7] dark:bg-gray-800 w-screen h-screen">
        <Header showSearch={false} />
          <BrowsePage />
        </div>
    </>
  );
};

export default BrowseNewLayout; 