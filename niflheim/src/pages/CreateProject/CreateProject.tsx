import React from "react";
import Header from "@/components/DashboardComp/Header";
import Sidebar from "@/components/DashboardComp/Sidebar";
import step from "@/assets/CreateProject/step1.svg";
import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";

const CreateProject: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 w-full bg-[#F7F7F7] lg:pr-64">
        {/* Header */}
          <Header toggleSidebar={toggleSidebar} />
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
