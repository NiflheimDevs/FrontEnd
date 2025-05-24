import React from "react";
import Header from "../../Components/MainContent/Header";
import BrowseProject from "../../Components/Browse/BrowseProject";

const BrowseLayout: React.FC = () => {
  return (
    <>
      <div className="flex flex-col bg-[#F7F7F7] w-screen h-screen">
        <Header showSearch={false} />

        <BrowseProject />
      </div>
    </>
  );
};

export default BrowseLayout;
