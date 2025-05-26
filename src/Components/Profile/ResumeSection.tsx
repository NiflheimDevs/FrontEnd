/* eslint-disable @typescript-eslint/no-unused-vars */
import { Upload, X, Download } from "lucide-react";
import { Profile } from "./types";
import { useNotification } from "../../Notification/NotificationProvider";
import React from "react";

interface ResumeSectionProps {
  localProfile: Profile;
  setLocalProfile: React.Dispatch<React.SetStateAction<Profile>>;
  resumeName: string | null;
  setResumeName: React.Dispatch<React.SetStateAction<string | null>>;
  tabIndexStart: number;
}

export default function ResumeSection({
  localProfile,
  setLocalProfile,
  resumeName,
  setResumeName,
  tabIndexStart,
}: ResumeSectionProps) {
  const { error: notifyError, success: notifySuccess } = useNotification();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    _field: "resume"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        notifyError("فقط فرمت PDF مجاز است");
        return;
      }
      setResumeName(file.name);
      setLocalProfile((prev) => ({ ...prev, resume: file }));
      notifySuccess("رزومه با موفقیت آپلود شد");
    } else {
      notifyError("هیچ فایلی انتخاب نشد");
    }
  };

  const handleRemoveResume = () => {
    setResumeName(null);
    setLocalProfile((prev) => ({ ...prev, resume: null }));
    setLocalProfile((prev) => ({ ...prev, resumeAddress: null }));
    notifySuccess("رزومه با موفقیت حذف شد");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <label className="font-semibold mt-2 text-gray-600 dark:text-gray-300  w-24 text-right">
        آپلود رزومه
      </label>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <label className="relative cursor-pointer bg-[#3E79DE] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-700 py-2.5 text-white px-5 rounded-[20px] flex items-center gap-2 transition-all duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg shadow-[0_4px_10px_rgba(0,0,0,0.2)] has-[:focus]:bg-blue-600 has-[:focus]:shadow-lg">
          <Upload size={18} />
          <span>انتخاب رزومه</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "resume")}
            className="absolute inset-0 opacity-0 cursor-pointer focus:outline-none"
            tabIndex={tabIndexStart}
          />
        </label>
        {resumeName && (
          <div className="flex items-center gap-2 border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 dark:bg-gray-300 dark:border-gray-400">
            {localProfile.resumeAddress ? (
              <a
                className="flex flex-row gap-1 items-center"
                href={localProfile.resumeAddress}
              >
                <Download color="#364153" size={17} />
                <span className="text-sm text-gray-700 pointer-events-none">
                  {resumeName}
                </span>
              </a>
            ) : (
              <span className="text-sm text-gray-700 pointer-events-none">
                {resumeName}
              </span>
            )}
            <button
              onClick={handleRemoveResume}
              className="text-gray-500 hover:text-red-500 transition-colors"
              tabIndex={tabIndexStart + 1}
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
