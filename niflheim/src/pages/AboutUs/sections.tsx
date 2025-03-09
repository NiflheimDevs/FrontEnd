import img from "../../assets/aboutus.svg";
import goal from "./our-goal-text-button-our-goal-sign-icon-label-sticker-web-buttons-vector.jpg";
import React, { useState } from "react";

const Sections = () => {
  const [visibleSection, setVisibleSection] = useState(null);

  const toggleSection = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  return (
    <div className="min-h-screen text-center py-12">
      <div className="container mx-auto px-6 space-y-16">
        {/* First Section */}
        <section className="scale-[82%] grid md:grid-cols-2 items-center gap-12 p-8 bg-white shadow-xl rounded-xl transition-transform transform hover:scale-[92%]">
          <div className="text-center md:text-right space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              بیشتر درباره ما بدانید
            </h2>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              onClick={() => toggleSection("first")}
            >
              {visibleSection === "first" ? "پنهان کردن" : "نمایش بیشتر"}
            </button>
            {/* Box container for text */}
            <div
              className={`mt-3 p-4 border border-gray-300 bg-gray-100 shadow-md rounded-lg transition-all duration-500 ${
                visibleSection === "first"
                  ? "opacity-100 max-h-96"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <p className="text-gray-700 font-bold text-xl leading-relaxed">
                ما یک پلتفرم معکوس برای فریلنسری ایجاد کرده‌ایم که در آن
                کارفرماها درخواست‌های خود را ثبت می‌کنند و فریلنسرها برای انجام
                کار پیشنهاد قیمت می‌دهند.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={img}
              alt="Freelancers working"
              className="rounded-lg shadow-lg w-full max-w-[400px] hover:scale-110 transition-transform"
            />
          </div>
        </section>

        {/* Second Section */}
        <section
          id="second-section"
          className="scale-[82%] grid md:grid-cols-2 items-center gap-12 p-8 bg-white shadow-xl rounded-xl transition-transform transform hover:scale-[92%]"
        >
          <div className="text-center md:text-right space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900">اهداف ما</h2>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              onClick={() => toggleSection("second")}
            >
              {visibleSection === "second" ? "پنهان کردن" : "نمایش بیشتر"}
            </button>
            {/* Box container for text */}
            <div
              className={`mt-3 p-4 border border-gray-300 bg-gray-100 shadow-md rounded-lg transition-all duration-500 ${
                visibleSection === "second"
                  ? "opacity-100 max-h-96"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <p className="text-gray-700 font-bold text-xl leading-relaxed">
                هدف ما فراهم کردن محیطی رقابتی و کارآمد برای فریلنسرها و
                کارفرمایان است. ما به دنبال افزایش شفافیت در فرآیند استخدام،
                کاهش هزینه‌ها، و ایجاد فرصت‌های برابر هستیم.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={img}
              alt="Freelancers working"
              className="rounded-lg shadow-lg w-full max-w-[400px] hover:scale-110 transition-transform"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sections;


// import img from "../../assets/aboutus.svg";
// import React from "react";

// const Sections = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen text-center">
//       <header className="bg-gray-900 text-white py-5 text-2xl">
//         درباره ما
//       </header>

//       <div className="container mx-auto px-4 py-10">
//         {/* First Section */}
//         <section className="bg-gray-100 flex flex-wrap md:flex-nowrap items-center justify-between gap-8 p-6 md:p-12">
//           {/* Right Side - Text Content */}
//               <h2 className="place-self-start text-2xl font-bold mb-4">درباره ما</h2>
//           <div className="w-full md:w-1/2 flex justify-center md:justify-end">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 text-right border border-gray-300">
//               <p className="text-gray-700 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               </p>
//             </div>
//           </div>
//           {/* Left Side - Image */}
//           <div className="w-full md:w-1/2 flex justify-center">
//             <img
//               src={img}
//               alt="Freelancers working"
//               className="rounded-lg shadow-lg w-full max-w-[400px] sm:max-w-[480px] hover:scale-110 transition-transform"
//             />
//           </div>
//         </section>

//         {/* Second Section */}
//         <section className="bg-gray-100 flex flex-wrap md:flex-nowrap items-center justify-between gap-8 p-6 md:p-12">
//           {/* Left Side - Image */}
//           <div className="w-full md:w-1/2 flex justify-center">
//             <img
//               src={img}
//               alt="Freelancers working"
//               className="rounded-lg shadow-lg w-full max-w-[400px] sm:max-w-[480px] hover:scale-110 transition-transform"
//             />
//           </div>
//           {/* Right Side - Text Content */}
//               <h2 className="place-self-start text-2xl font-bold mb-4">درباره ما</h2>
//           <div className="w-full md:w-1/2 flex justify-center md:justify-start">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 text-right border border-gray-300">
//               <p className="text-gray-700 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Sections;
