// import aboutus from "../../assets/aboutus/sob.jpg"

// const Sections = () => {
//   return (
//     <div className="min-h-screen text-center py-12 bg-transparent text-gray-800">
//       <div className="container mx-auto px-6 space-y-16">
//         {/* First Section */}
//         <section
//           id="first-section"
//           className="scale-[85%] grid md:grid-cols-2 items-center gap-12 p-8 bg-[#e5e5e5] shadow-xl rounded-xl transition-transform"
//         >
//           <div className="text-center md:text-right space-y-6 flex flex-col justify-center">
//             <h2 className="text-3xl font-extrabold text-gray-800">
//               بیشتر درباره ما بدانید
//             </h2>
//             <div className="mt-3 p-4 border rounded-lg transition-all duration-500 flex justify-center items-center h-40 opacity-100 max-h-96">
//               <p className="text-gray-800 font-bold text-xl leading-relaxed">
//                 ما یک پلتفرم معکوس برای فریلنسری ایجاد کرده‌ایم که در آن
//                 کارفرماها درخواست‌های خود را ثبت می‌کنند و فریلنسرها برای انجام
//                 کار پیشنهاد قیمت می‌دهند.
//               </p>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <img
//               src={aboutus}
//               alt="Freelancers working"
//               className="rounded-lg shadow-lg w-full max-w-[400px] hover:scale-[103%] transition-transform"
//             />
//           </div>
//         </section>

//         {/* Second Section */}
//         <section
//           id="second-section"
//           className="scale-[85%] grid md:grid-cols-2 items-center gap-12 p-8 bg-[#e5e5e5] shadow-xl rounded-xl transition-transform"
//         >
//           <div className="flex justify-center">
//             <img
//               src={aboutus}
//               alt="Freelancers working"
//               className="rounded-lg shadow-lg w-full max-w-[400px] hover:scale-[103%] transition-transform"
//             />
//           </div>
//           <div className="text-center md:text-right space-y-6 flex flex-col justify-center">
//             <h2 className="text-3xl font-extrabold text-gray-800">اهداف ما</h2>
//             <div className="mt-3 p-4 border rounded-lg transition-all duration-500 flex justify-center items-center h-40 opacity-100 max-h-96">
//               <p className="text-gray-800 font-bold text-xl leading-relaxed">
//                 هدف ما فراهم کردن محیطی رقابتی و کارآمد برای فریلنسرها و
//                 کارفرمایان است. ما به دنبال افزایش شفافیت در فرآیند استخدام،
//                 کاهش هزینه‌ها، و ایجاد فرصت‌های برابر هستیم.
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Sections;
const Sections = () => {
  return (
    <div className="min-h-screen text-center py-12 bg-transparent text-gray-800">
      <div className="container mx-auto px-6 space-y-12">
        {/* First Section */}
        <section
          id="first-section"
          className="p-6 bg-[#e5e5e5] shadow-xl rounded-xl"
        >
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-800">
              بیشتر درباره ما بدانید
            </h2>
            <div className="p-4 border rounded-lg transition-all duration-500 flex justify-center items-center h-40 max-h-96">
              <p className="text-gray-800 font-bold text-xl leading-relaxed">
                ما یک پلتفرم معکوس برای فریلنسری ایجاد کرده‌ایم که در آن
                کارفرماها درخواست‌های خود را ثبت می‌کنند و فریلنسرها برای انجام
                کار پیشنهاد قیمت می‌دهند.
              </p>
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section
          id="second-section"
          className="p-6 bg-[#e5e5e5] shadow-xl rounded-xl"
        >
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-800">اهداف ما</h2>
            <div className="p-4 border rounded-lg transition-all duration-500 flex justify-center items-center h-40 max-h-96">
              <p className="text-gray-800 font-bold text-xl leading-relaxed">
                هدف ما فراهم کردن محیطی رقابتی و کارآمد برای فریلنسرها و
                کارفرمایان است. ما به دنبال افزایش شفافیت در فرآیند استخدام،
                کاهش هزینه‌ها، و ایجاد فرصت‌های برابر هستیم.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sections;