import { Image, X } from "lucide-react";
import { Profile } from "./types";
import { useNotification } from "../../Notification/NotificationProvider";
import { PutUserName, PutEmail, PutPhoneSendOtp } from "../../API";
import React, { useState } from "react";
import OtpSection from "./OtpSection";

interface UserInfoSectionProps {
  localProfile: Profile;
  setLocalProfile: React.Dispatch<React.SetStateAction<Profile>>;
  profileFromRedux: Profile;
  profilePictureFile: File | null;
  setProfilePictureFile: React.Dispatch<React.SetStateAction<File | null>>;
  changedPhone: boolean;
  setChangedPhone: React.Dispatch<React.SetStateAction<boolean>>;
  changedEmail: boolean;
  setChangedEmail: React.Dispatch<React.SetStateAction<boolean>>;
  changedUsername: boolean;
  setChangedUsername: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserInfoSection({
  localProfile,
  setLocalProfile,
  profileFromRedux,
  profilePictureFile,
  setProfilePictureFile,
  changedPhone,
  setChangedPhone,
  changedEmail,
  setChangedEmail,
  changedUsername,
  setChangedUsername,
}: UserInfoSectionProps) {
  const { error: notifyError, success: notifySuccess } = useNotification();
  const [showOtpSection, setShowOtpSection] = useState(false);
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    const value = e.target.value;
    setLocalProfile((prev) => ({ ...prev, phoneNumber: value }));
    if (value.startsWith("09") && value.length === 11) {
      setChangedPhone(value !== profileFromRedux.phoneNumber);
    } else {
      setChangedPhone(false);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalProfile((prev) => ({ ...prev, email: value }));
    setChangedEmail(value !== profileFromRedux.email);
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalProfile((prev) => ({ ...prev, username: value }));
    setChangedUsername(value !== profileFromRedux.username);
  };

  const handlePhoneChangeSubmit = async () => {
    if (changedPhone) {
      try {
        const phoneData = { phone: localProfile.phoneNumber };
        const codeSession = await PutPhoneSendOtp(phoneData);
        setLocalProfile((prev) => ({ ...prev, SessionID: codeSession }));
        console.log(codeSession);
        setShowOtpSection(true);
        notifySuccess("کد تایید ارسال شد");
      } catch (err:any) {
        notifyError(err.message || "خطا در ارسال کد تایید");
      }
    }
  };

  const ChangeUserName = async () => {
    try {
      const usernameData = { username: localProfile.username };
      await PutUserName(usernameData);
      notifySuccess("نام کاربری با موفقیت تغییر کرد");
    } catch (err:any) {
      notifyError(err.message || "خطا در تغییر نام کاربری");
    }
  };

  const ChangeEmail = async () => {
    try {
      const emailData = { email: localProfile.email };
      await PutEmail(emailData);
      notifySuccess("ایمیل با موفقیت تغییر کرد");
    } catch (err:any) {
      notifyError(err.message || "خطا در تغییر ایمیل");
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    _field: "profilePicture"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        notifyError("پروفایل باید یک تصویر باشد");
        return;
      }
      setProfilePictureFile(file);
      notifySuccess("عکس پروفایل با موفقیت آپلود شد");
    } else {
      notifyError("هیچ فایلی انتخاب نشد");
    }
  };

  const handleRemoveProfile = () => {
    setProfilePictureFile(null);
    setLocalProfile((prev) => ({ ...prev, profile: "" }));
    notifySuccess("عکس پروفایل با موفقیت حذف شد");
  };

  const handleInputChange = (field: keyof Profile, value: any) => {
    setLocalProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          <label className="w-32 h-32 md:w-36 md:h-36 border-2 border-blue-500 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-gray-200 relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "profilePicture")}
              className="hidden"
              tabIndex={1}
            />
            {profilePictureFile ? (
              <>
                <img
                  src={URL.createObjectURL(profilePictureFile)}
                  alt="Profile Preview"
                  className="w-full h-full object-cover transition-all duration-400 ease-in-out hover:scale-105"
                />
                <button
                  onClick={handleRemoveProfile}
                  className="absolute bg-black opacity-0 bg-opacity-50 rounded-full p-1 border-2 border-white transition duration-400 ease-in-out cursor-pointer hover:opacity-70"
                  tabIndex={2}
                >
                  <X size={20} color="white" />
                </button>
              </>
            ) : localProfile.profile ? (
              <>
                <img
                  src={localProfile.profile}
                  alt=""
                  className="w-full h-full object-cover transition-all duration-400 ease-in-out hover:scale-105"
                />
                <button
                  onClick={handleRemoveProfile}
                  className="absolute bg-black opacity-0 bg-opacity-50 rounded-full p-1 border-2 border-white transition duration-400 ease-in-out cursor-pointer hover:opacity-70"
                  tabIndex={2}
                >
                  <X size={20} color="white" />
                </button>
              </>
            ) : (
              <Image className="text-gray-500" size={36} />
            )}
          </label>
          <span className="mt-2 font-semibold text-gray-600">پروفایل</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
            نام کاربری
          </label>
          <input
            type="text"
            value={localProfile.username}
            onChange={handleChangeUsername}
            className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
            tabIndex={3}
          />
          <button
            className={`flex items-center gap-2 md:w-[170px] sm:w-[150px] justify-center transition-all duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] ${
              changedUsername
                ? "hover:bg-blue-600 focus:bg-blue-600 focus:shadow-lg cursor-pointer"
                : "opacity-60"
            }`}
            onClick={ChangeUserName}
            tabIndex={4}
            disabled={!changedUsername}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6 21.5H3v-3.5L15.232 5.232z"
              />
            </svg>
            <span>تغییر نام کاربری</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
            ایمیل
          </label>
          <div className="relative w-full sm:flex-1">
            <input
              type="email"
              value={localProfile.email}
              onChange={handleChangeEmail}
              placeholder="example@gmail.com"
              className="w-full p-2 border-2 rounded-lg text-right [direction:rtl]"
              tabIndex={5}
            />
            <span
              className={`absolute h-full justify-center items-center px-2 rounded-lg shadow-lg bg-green-500 flex left-0 top-1/2 transform -translate-y-1/2 text-sm ${"text-white"}`}
            >
              تایید شده
            </span>
          </div>
          <button
            className={`flex items-center gap-2 md:w-[170px] sm:w-[150px] justify-center transition-all duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] ${
              changedEmail
                ? "hover:bg-blue-600 focus:bg-blue-600 focus:shadow-lg cursor-pointer"
                : "opacity-60"
            }`}
            onClick={ChangeEmail}
            tabIndex={6}
            disabled={!changedEmail}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6 21.5H3v-3.5L15.232 5.232z"
              />
            </svg>
            <span>تغییر ایمیل</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
            شماره تماس
          </label>
          <input
            type="tel"
            value={localProfile.phoneNumber}
            onChange={handleChangePhone}
            placeholder="*********09"
            className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
            maxLength={11}
            tabIndex={7}
          />
          <button
            className={`flex items-center gap-2 md:w-[170px] sm:w-[150px] justify-center transition-all duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] ${
              changedPhone
                ? "hover:bg-blue-600 focus:bg-blue-600 focus:shadow-lg cursor-pointer"
                : "opacity-60"
            }`}
            tabIndex={8}
            disabled={!changedPhone}
            onClick={handlePhoneChangeSubmit}
          >
            {!showOtpSection ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6 21.5H3v-3.5L15.232 5.232z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-message-circle-reply-icon lucide-message-circle-reply"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                <path d="m10 15-3-3 3-3" />
                <path d="M7 12h7a2 2 0 0 1 2 2v1" />
              </svg>
            )}
            <span>
              {showOtpSection ? "دریافت مجدد کد" : "تغییر شماره تماس"}
            </span>
          </button>
        </div>

        <OtpSection
          showOtpSection={showOtpSection}
          setShowOtpSection={setShowOtpSection}
          phoneNumber={localProfile.phoneNumber}
          localProfile={localProfile}
          setLocalProfile={setLocalProfile}
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
            نام
          </label>
          <input
            type="text"
            value={localProfile.firstName}
            placeholder="امیر"
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
            tabIndex={9}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
            نام خانوادگی
          </label>
          <input
            type="text"
            value={localProfile.lastName}
            placeholder="امیری"
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
            tabIndex={10}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
            بیوگرافی
          </label>
          <textarea
            value={localProfile.bio}
            placeholder="فریلنسر خلاق، آماده برای پروژه بعدی..."
            onChange={(e) => handleInputChange("bio", e.target.value)}
            className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
            tabIndex={11}
          />
        </div>
      </div>
    </>
  );
}
