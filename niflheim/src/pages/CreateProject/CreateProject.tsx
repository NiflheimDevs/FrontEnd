import React from "react";
import { Upload } from "lucide-react";
import step from "@/assets/CreateProject/step1.svg";
const CreateProject: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-6">
        <div className="mb-4">
        <img src={step} alt="Step 1" />
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
      <div className="mb-4">
        <label className="block text-sm text-gray-600" htmlFor="">
           مهارت های مورد نیاز
        </label>
        <input
          id="username"
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

      <div className="flex items-center justify-between">
        <label
          htmlFor="resume-upload"
          className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer bg-[#5993F6] hover:bg-[#3E79DE] text-[#FFFFFF]"
        >
          <Upload size={18} /> آپلود فایل
        </label>
        <input type="file" className="hidden" id="resume-upload" />
      </div>
      <button
            className="cursor-pointer bg-[#5993F6] px-4 py-2 rounded shadow-lg hover:bg-[#3E79DE] text-[#FFFFFF] "
          >
            مرحله بعد
          </button>
    </div>
  );
};

export default CreateProject;
