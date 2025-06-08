import React from "react";
import Header from "../MainContent/Header";
import BrowseProject from "./BrowseProject";

const BrowseProjectLayout: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] dark:bg-gray-800 z-[-1]"></div>
      <div className="flex flex-col bg-[#F7F7F7] dark:bg-gray-800 w-screen h-screen overflow-auto">
        <Header showSearch={false} />
        <BrowseProject />
      </div>
    </>
  );
};

export default BrowseProjectLayout;
