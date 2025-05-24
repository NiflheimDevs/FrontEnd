import aboutus from "../../assets/aboutus/AboutUs-1.webp";
import porpuses from "../../assets/aboutus/AboutUs-porpuse.webp";

const Sections = () => {
  return (
    <div className="min-h-screen text-center py-12 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6 space-y-16">
        {/* First Section */}
        <section
          id="first-section"
          className="grid md:grid-cols-2 items-center gap-12 p-8 bg-white dark:bg-gray-700 shadow-lg rounded-2xl transition-transform hover:shadow-xl"
        >
          <div className="text-center md:text-right space-y-6 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200">
              بیشتر درباره ما بدانید
            </h2>
            <div className="mt-3 p-6 bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg transition-all duration-300 flex justify-center items-center h-48 opacity-100">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg leading-relaxed">
                ما یک پلتفرم معکوس برای فریلنسری ایجاد کرده‌ایم که در آن
                کارفرماها درخواست‌های خود را ثبت می‌کنند و فریلنسرها برای انجام
                کار پیشنهاد قیمت می‌دهند.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={aboutus}
              alt="Freelancers working"
              className="rounded-lg shadow-md w-full max-w-[400px] hover:scale-[103%] transition-transform"
            />
          </div>
        </section>

        {/* Second Section */}
        <section
          id="second-section"
          className="grid md:grid-cols-2 items-center gap-12 p-8 bg-white dark:bg-gray-700 shadow-lg rounded-2xl transition-transform hover:shadow-xl"
        >
          <div className="flex justify-center">
            <img
              src={porpuses}
              alt="Freelancers working"
              className="rounded-lg shadow-md w-full max-w-[400px] hover:scale-[103%] transition-transform"
            />
          </div>
          <div className="text-center md:text-right space-y-6 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200">
              اهداف ما
            </h2>
            <div className="mt-3 p-6 bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg transition-all duration-300 flex justify-center items-center h-48 opacity-100">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg leading-relaxed">
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
