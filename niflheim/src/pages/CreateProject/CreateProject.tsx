import React from "react";
import { Upload } from "lucide-react";
import step from "@/assets/CreateProject/step1.svg";
// const CreateProject: React.FC = () => {
//   return (
//     <div className="max-w-lg mx-auto p-6">
//         <div className="mb-4">
//         <img src={step} alt="Step 1" />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm text-gray-600" htmlFor="project-name">
//           نام پروژه
//         </label>
//         <input
//           id="project-name"
//           type="text"
//           placeholder="نام پروژه را وارد کنید"
//           className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm text-gray-600" htmlFor="">
//            مهارت های مورد نیاز
//         </label>
//         <input
//           id="username"
//           type="text"
//           placeholder="مهارت های مورد نیاز را وارد کنید"
//           className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300"
//         />
//       </div>


//       <div className="mb-4">
//         <label className="block text-sm text-gray-600" htmlFor="bio">
//           توضیحات پروژه
//         </label>
//         <textarea
//           id="bio"
//           placeholder=""
//           className="w-full p-2 mt-1 border rounded resize-none focus:ring focus:ring-blue-300"
//           rows={3}
//         ></textarea>
//       </div>

//       <div className="flex items-center justify-between">
//         <label
//           htmlFor="resume-upload"
//           className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer bg-[#5993F6] hover:bg-[#3E79DE] text-[#FFFFFF]"
//         >
//           <Upload size={18} /> آپلود فایل
//         </label>
//         <input type="file" className="hidden" id="resume-upload" />
//       </div>
//       <button
//             className="cursor-pointer bg-[#5993F6] px-4 py-2 rounded shadow-lg hover:bg-[#3E79DE] text-[#FFFFFF] "
//           >
//             مرحله بعد
//           </button>
//     </div>
//   );
// };

// export default CreateProject;


import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
import LOGO from "@/assets/BIDLANCERLOGO.svg";

const CreateProject: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Hidden on mobile) */}
      <aside
        className={`hidden lg:flex fixed top-16 right-0 h-full bg-[#D4D4D4] p-5 shadow-md transition-transform ${
          isSidebarOpen ? "w-64" : "w-16"
        } duration-300 flex-col items-center z-50`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 mb-4"
        >
          <Menu size={24} />
        </button>
        {isSidebarOpen && (
          <nav className="mt-5 space-y-3 w-full text-right pr-4">
            <a href="#" className="block p-2 rounded hover:bg-gray-200">
              خانه
            </a>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">
              پروفایل
            </a>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">
              تنظیمات
            </a>
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 w-full bg-[#F7F7F7] lg:pr-64">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white p-4 shadow flex justify-between items-center">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="">بیدلنسر</label>
            <img src={LOGO} alt="Logo" className="h-12 w-12" />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-1 border rounded"
            />
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <Bell className="text-gray-500 cursor-pointer" />
        </header>

        {/* Create Field */}
        <div className="flex justify-center px-4 sm:w-full sm:h-screen md:w-full md:h-screen">
        <div className="w-[90%] sm:w-[60%]  p-6 bg-white rounded-lg shadow-md">
          <div className="mb-4 text-center">
              <img src={step} alt="Step 1" className="mx-auto" />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600" htmlFor="project-name">
                نام پروژه
              </label>
              <input
                id="project-name"
                type="text"
                placeholder="نام پروژه را وارد کنید"
                className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm text-gray-600" htmlFor="skills">
                مهارت های مورد نیاز
              </label>
              <input
                id="skills"
                type="text"
                placeholder="مهارت های مورد نیاز را وارد کنید"
                className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600" htmlFor="bio">
                توضیحات پروژه
              </label>
              <textarea
                id="bio"
                placeholder=""
                className="w-full p-2 mt-1 border rounded resize-none focus:ring focus:ring-blue-300"
                rows={3}
              ></textarea>
            </div>

            {/* Upload Section */}
            <div className="flex border border-[#e4e4e7] p-4 w-full flex-col sm:flex-row">
              {/* Text Section */}
              <div className="flex-1 text-right space-y-2">
                <label className="block text-sm text-gray-600">
                  ⭐ تصاویر موردنظر برای پروژه را در اینجا قرار دهید.
                </label>
                <label className="block text-sm text-gray-600">
                  ⭐ حداکثر حجم آپلود: ۵۰ مگابایت.
                </label>
                <label className="block text-sm text-gray-600">
                  ⭐ تعداد فایل‌های مجاز برای آپلود: ۵ عدد.
                </label>
              </div>

              {/* Upload Button */}
              <div className="flex justify-center mt-2 sm:mt-0">
                <label
                  htmlFor="resume-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 border rounded cursor-pointer bg-[#5993F6] hover:bg-[#3E79DE] text-[#FFFFFF] self-start"
                >
                  آپلود فایل
                </label>
                <input type="file" className="hidden" id="resume-upload" />
              </div>
            </div>

            {/* Next Button */}
            <div className="flex mt-4 justify-end">
              <button className="bg-[#5993F6] px-6 py-2 rounded shadow-lg hover:bg-[#3E79DE] text-white">
                مرحله بعد
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

 export default CreateProject;
