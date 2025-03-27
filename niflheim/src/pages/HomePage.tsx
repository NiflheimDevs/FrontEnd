import React, { useState } from "react";
import Header from "../Components/MainContent/Header"; // Adjust the path based on your file structure
import MainContent from "../Components/MainContent/MainContent"; // Adjust the path based on your file structure
import Footer from "../Components/Footer/Footer"; // Adjust the path based on your file structure

const HomePage = () => {
  return (
    <div className="flex flex-col bg-[#EEEEEE] min-h-screen">
      {/* Header */}
      <Header />



      {/* Main Content */}
      <MainContent />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;