import Header from "../Components/MainContent/Header";
import { FaStar } from "react-icons/fa";

const ProjectDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 mt-20 flex justify-center">
        <div className="shadow-2xl rounded-2xl bg-white flex flex-col sm:flex-row w-full max-w-7xl mx-auto h-auto sm:h-[600px] gap-6 sm:gap-20 p-4 sm:p-6">
          {/* Left Half: Project Information (Top on small screens) */}
          <div className="w-full sm:w-1/2 flex flex-col space-y-6">
            {/* Project Title and Info */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#000000] text-right">
                عنوان پروژه: طراحی UX/UI برای وب‌سایت (استاتیک)
              </h2>
              <div className="flex flex-col text-right text-xs sm:text-sm text-gray-500">
                <span>۱۴ روز پیش</span>
                <span>۴۲ پیشنهاد</span>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-2 text-right">
                توضیحات پروژه:
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-right">
                من به یک طراح UX/UI ماهر نیاز دارم تا یک رابط کاربری مدرن و
                کاربرپسند برای وب‌سایتم طراحی کند. طراحی باید تمیز، بصری و
                پاسخگو در تمام دستگاه‌ها باشد. این پروژه شامل ایجاد وایرفریم‌ها،
                ماکاپ‌ها و طراحی‌های نهایی برای ۵ صفحه اصلی است: صفحه اصلی،
                درباره ما، خدمات، نمونه کارها و تماس با ما. طراح باید تجربه کار
                با Figma یا Adobe XD داشته باشد و یک راهنمای سبک (Style Guide)
                همراه با تحویل نهایی ارائه دهد.
              </p>
            </div>

            {/* Skills Required */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-2 text-right">
                مهارت‌های مورد نیاز:
              </h3>
              <div className="flex flex-wrap gap-2 justify-start">
                {[
                  "فیگما",
                  "ادوبی XD",
                  "وایرفریمینگ",
                  "طراحی پاسخگو",
                  "UI/UX",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-2 text-right">
                بودجه:
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm text-right">
                قیمت ثابت: ۵۰۰ دینار
              </p>
            </div>
          </div>

          {/* Right Half: Bidders List and Buttons (Bottom on small screens) */}
          <div className="w-full sm:w-1/2 flex flex-col space-y-6">
            {/* Image Above Bidders */}
            {/* <div>
              <img
                src="https://www.sgstechnologies.net/sites/default/files/2021-08/future-webdesign.jpg"
                alt="طراحی وب‌سایت"
                className="w-full h-48 sm:h-56 object-cover rounded-lg shadow-sm"
              />
            </div> */}

            {/* Bidders List */}
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-3 text-right">
                پیشنهاد دهندگان:
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pl-3 custom-scrollbar">
                {[
                  {
                    name: "احمد۹۵",
                    rating: 4.1,
                    bid: "۵۰۰ دینار",
                  },
                  {
                    name: "محمد۸۸",
                    rating: 4.2,
                    bid: "۴۹۰ دینار",
                  },
                  {
                    name: "علی۷۷",
                    rating: 3,
                    bid: "۴۸۰ دینار",
                  },
                  {
                    name: "رضا۶۶",
                    rating: 2,
                    bid: "۵۰۰ دینار",
                  },
                  {
                    name: "حسن۵۵",
                    rating: 4.5,
                    bid: "۴۷۵ دینار",
                  },
                  {
                    name: "یاسر۴۴",
                    rating: 3.8,
                    bid: "۴۹۵ دینار",
                  },
                  {
                    name: "کریم۳۳",
                    rating: 4.0,
                    bid: "۴۸۵ دینار",
                  },
                ].map((bidder, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gradient-to-b from-[#B1D8FC] to-[#D4D4D4] rounded-lg shadow-sm hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center space-x-3 gap-3 space-x-reverse">
                      <img
                        alt=""
                        src="https://www.sgstechnologies.net/sites/default/files/2021-08/future-webdesign.jpg"
                        className="w-8 sm:w-9 h-8 sm:h-9 bg-gray-300 rounded-full flex items-center justify-center"
                      />
                      <div className="text-right">
                        <p className="font-semibold text-xs sm:text-sm text-[#000000]">
                          {bidder.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" size={12} />
                          <span className="text-xs text-gray-500">
                            {bidder.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm font-medium">
                      {bidder.bid}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons Below Bidders */}
            <div className="flex justify-center">
              <button className="bg-[#3E79DE] cursor-pointer w-full sm:w-3/4 h-[48px] text-white rounded hover:bg-blue-700 text-sm">
                ارسال پیشنهاد
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
