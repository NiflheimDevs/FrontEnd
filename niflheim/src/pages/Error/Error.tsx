import React from "react";
import { useLocation } from "react-router-dom";

const Error = () => {
  const location = useLocation();
  const { title = "خطا", description = "مشکلی پیش آمده است." } = location.state || {};

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#DA1E30] to-[#74101A] px-10 text-center">
      <div className="text-white text-4xl font-bold space-y-4">
        <h1>{title}</h1>
        <h2 className="text-2xl">{description}</h2>
      </div>
      <object
        data="/src/assets/Error.svg"
        type="image/svg+xml"
        className="w-[300px] h-[300px] sm:w-[300px] sm:h-[450px] md:w-[480px] md:h-[590px]"
      />
    </div>
  );
};

export default Error;
