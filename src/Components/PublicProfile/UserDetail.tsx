import { Image, Send, Calendar } from "lucide-react";
import { Color, Profile } from "./types";
import UserCareerDetail from "./UserCareerDetail";
import { useState } from "react";
import { Download } from "lucide-react";

interface UserDetailProps {
  localprofile: Profile;
  localcolor: Color;
}

const UserDetail = ({ localprofile, localcolor }: UserDetailProps) => {
  const [profileExists, setprofileExists] = useState<boolean>(true);
  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-6 sm:px-6 px-4 py-8 md:px-10 md:py-12">
      {/* Profile Image and Actions */}
      <div className="flex flex-col items-center gap-4 w-full md:w-1/4 min-w-[160px]">
        <div
          className={`relative flex justify-center items-center w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-${localcolor.color} dark:border-${localcolor.darkcolor} overflow-hidden bg-gray-100 shadow-md transition-transform duration-300 hover:scale-105`}
        >
          {profileExists ? (
            <img
              src={localprofile.high_profile}
              alt={`${localprofile.firstName} ${localprofile.lastName}`}
              className="w-full h-full object-cover"
              onError={() => setprofileExists(false)}
            />
          ) : (
            <Image className="text-gray-400" size={48} />
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-700 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-400 font-[vazirmatn]">
              {localprofile.join_Date}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-400 font-[vazirmatn]">
            {localprofile.email}
          </span>
          {localprofile.resumeAddress ? (
            <div className="flex items-center gap-2 border border-gray-300 bg-gray-100 dark:bg-gray-600 dark:border-gray-700 rounded-lg px-2 py-1">
              <a
                className="flex flex-row gap-1 items-center"
                href={localprofile.resumeAddress}
              >
                <Download
                  className="text-gray-700 dark:text-gray-200"
                  size={17}
                />
                <span className="text-sm text-gray-700 dark:text-gray-200 pointer-events-none">
                  رزومه کاربر
                </span>
              </a>
            </div>
          ) : (
            <></>
          )}
          {localprofile.profile_id != "0" ? (
            <button
              className={`flex items-center cursor-pointer gap-2 px-4 py-2 bg-${localcolor.color} dark:bg-${localcolor.darkcolor} text-white text-sm font-[vazirmatn] rounded-full shadow-md hover:bg-${localcolor.hover} dark:hover:bg-${localcolor.darkhover} focus:ring-2 focus:ring-${localcolor.color} dark:focus:ring-${localcolor.darkcolor} focus:ring-offset-2 transition-all duration-200`}
            >
              <Send size={18} />
              ارسال پیام
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Profile Info and Work Experience */}
      <div className="flex flex-col md:px-0 px-6 gap-6 w-full md:text-start text-center md:w-1/2">
        {/* Bio */}
        <div className="flex flex-col gap-2">
          {localprofile.firstName && localprofile.lastName ? (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-400 font-[vazirmatn]">
              {`${localprofile.firstName} ${localprofile.lastName}`}
            </h2>
          ) : (
            <h2 className="text-lg w-fit py-1 px-2 rounded-4xl md:text-xl font-bold text-gray-400 pointer-events-none box-shadow-custom font-[vazirmatn]">
              مشخصات فردی کاربر ثبت نشده است
            </h2>
          )}
          {localprofile.bio ? (
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-500 font-[vazirmatn] leading-relaxed">
              {localprofile.bio}
            </p>
          ) : (
            <p className="text-lg md:text-xl w-fit text-gray-400 pointer-events-none box-shadow-custom rounded-4xl py-1 px-2 font-[vazirmatn] leading-relaxed">
              بیوگرافی کاربر ثبت نشده است
            </p>
          )}
        </div>
      </div>

      {/* Career Details */}
      <div className="w-full md:px-0 h-full px-6 md:w-1/4 min-w-[200px]">
        <UserCareerDetail localprofile={localprofile} localcolor={localcolor} />
      </div>
    </div>
  );
};

export default UserDetail;
