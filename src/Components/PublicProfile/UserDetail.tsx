import { Image, Send, Calendar } from "lucide-react";
import { Color, Profile } from "./types";
import UserCareerDetail from "./UserCareerDetail";

interface UserDetailProps {
  localprofile: Profile;
  localcolor: Color;
}

const UserDetail = ({ localprofile, localcolor }: UserDetailProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-6 sm:px-6 px-4 py-8 md:px-10 md:py-12">
      {/* Profile Image and Actions */}
      <div className="flex flex-col items-center gap-4 w-full md:w-1/4 min-w-[160px]">
        <div
          className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-${localcolor.color} overflow-hidden bg-gray-100 shadow-md transition-transform duration-300 hover:scale-105`}
        >
          {localprofile.high_profile ? (
            <img
              src={localprofile.high_profile}
              alt={`${localprofile.firstName} ${localprofile.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image className="text-gray-400" size={48} />
          )}
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700 font-[vazirmatn]">
              {localprofile.join_Date}
            </span>
          </div>
          <button
            className={`flex items-center cursor-pointer gap-2 px-4 py-2 bg-${localcolor.color} text-white text-sm font-[vazirmatn] rounded-full shadow-md hover:bg-${localcolor.hover} focus:ring-2 focus:ring-${localcolor.color} focus:ring-offset-2 transition-all duration-200`}
          >
            <Send size={18} />
            ارسال پیام
          </button>
        </div>
      </div>

      {/* Profile Info and Work Experience */}
      <div className="flex flex-col md:px-0 px-6 gap-6 w-full md:text-start text-center md:w-1/2">
        {/* Bio */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-[vazirmatn]">
            {`${localprofile.firstName} ${localprofile.lastName}`}
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-[vazirmatn] leading-relaxed">
            {localprofile.bio}
          </p>
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
