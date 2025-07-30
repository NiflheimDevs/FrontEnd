import React from "react";
import Header from "../MainContent/Header";
import BrowseProject from "./BrowseProject";

const BrowseProjectLayout: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] dark:bg-gray-700 z-[-1] min-h-screen h-screen"></div>
      <div className="flex flex-col bg-[#F7F7F7] dark:bg-gray-700 w-screen min-h-screen h-screen">
        <Header showSearch={false} />
        <BrowseProject />
      </div>
    </>
  );
};

export default BrowseProjectLayout;
