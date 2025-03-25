import { Image, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "../../Notification/NotificationProvider";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { setProfile } from "../../store/slices/profileSlice";
import OtpInput from "react-otp-input";

interface WorkExperience {
  companyName: string;
  website: string;
  duration: string;
  jobTitle: string;
  startDate?: string;
  endDate?: string;
  isOngoing?: boolean;
  skills: string[];
  skillProficiency: { [key: string]: string };
}

interface Profile {
  phoneNumber: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  skillProficiency: { [key: string]: string };
  workExperiences: WorkExperience[];
  resume: File | null;
}

const initialProfile: Profile = {
  phoneNumber: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  skills: [],
  skillProficiency: {},
  workExperiences: [],
  resume: null,
};
export default function ProfileForm() {
  const dispatch = useDispatch();
  const profileFromRedux = useSelector((state: { profile: Profile }) => state.profile);
  const [localProfile, setLocalProfile] = useState<Profile>(initialProfile);
  const [changedPhone, setChangedPhone] = useState(false);
  const [changedEmail, setChangedEmail] = useState(false);
  const [changedUsername, setChangedUsername] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [mainSkillsSearchTerm, setMainSkillsSearchTerm] = useState("");
  const [isMainSkillsDropdownOpen, setIsMainSkillsDropdownOpen] = useState(false);
  const [workSearchTerms, setWorkSearchTerms] = useState<string[]>([]);
  const [workDropdowns, setWorkDropdowns] = useState<boolean[]>([]);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    skills?: string[];
    workExperiences?: { index: number; fields: (keyof WorkExperience)[] }[];
  }>({});
  const { error: notifyError, success: notifySuccess } = useNotification();

  const [token, setTokens] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isScaled, setIsScaled] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);

  useEffect(() => {
    dispatch(setProfile(initialProfile));
    setLocalProfile(initialProfile);
    setWorkSearchTerms([]);
    setWorkDropdowns([]);
  }, [dispatch]);

  useEffect(() => {
    if (timeLeft === 0 || !showOtpSection) return;
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, showOtpSection]);

  useEffect(() => {
    if (timeLeft === 0 && showOtpSection) {
      const intervalId = setInterval(() => {
        setIsScaled((prev) => !prev);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft, showOtpSection]);

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    const value = e.target.value;
    setLocalProfile((prev) => ({ ...prev, phoneNumber: value }));
    if (value.startsWith('09') && value.length === 11) {
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

  const handleAddWorkExperience = () => {
    setLocalProfile((prev) => ({
      ...prev,
      workExperiences: [
        ...prev.workExperiences,
        {
          companyName: "",
          website: "",
          duration: "",
          jobTitle: "",
          startDate: "",
          endDate: "",
          isOngoing: false,
          skills: [],
          skillProficiency: {},
        },
      ],
    }));
    setWorkSearchTerms((prev) => [...prev, ""]);
    setWorkDropdowns((prev) => [...prev, false]);
  };

  const handleRemoveWorkExperience = (index: number) => {
    setLocalProfile((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((_, i) => i !== index),
    }));
    setWorkSearchTerms((prev) => prev.filter((_, i) => i !== index));
    setWorkDropdowns((prev) => prev.filter((_, i) => i !== index));
    setValidationErrors((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences?.filter((err) => err.index !== index),
    }));
  };

  const handleWorkExperienceChange = (
    index: number,
    field: keyof WorkExperience,
    value: string | boolean | string[]
  ) => {
    setLocalProfile((prev) => {
      const updatedExperiences = prev.workExperiences.map((exp, i) => {
        if (i === index) {
          const updatedExp = { ...exp, [field]: value };
          if (field === "isOngoing" && value === true) {
            updatedExp.endDate = "";
          }
          if (field === "skills" && Array.isArray(value)) {
            const newProficiency = { ...updatedExp.skillProficiency };
            Object.keys(newProficiency).forEach((skill) => {
              if (!value.includes(skill)) {
                delete newProficiency[skill];
              }
            });
            updatedExp.skillProficiency = newProficiency;
          }
          return updatedExp;
        }
        return exp;
      });
      return { ...prev, workExperiences: updatedExperiences };
    });
  };

  const handleWorkSkillProficiencyChange = (
    index: number,
    skill: string,
    level: string
  ) => {
    setLocalProfile((prev) => {
      const updatedExperiences = prev.workExperiences.map((exp, i) => {
        if (i === index) {
          return {
            ...exp,
            skillProficiency: { ...exp.skillProficiency, [skill]: level },
          };
        }
        return exp;
      });
      return { ...prev, workExperiences: updatedExperiences };
    });
  };

  const handleInputChange = (field: keyof Profile, value: any) => {
    setLocalProfile((prev) => {
      const newProfile = { ...prev, [field]: value };
      if (field === "skills" && Array.isArray(value)) {
        const newProficiency = { ...newProfile.skillProficiency };
        Object.keys(newProficiency).forEach((skill) => {
          if (!value.includes(skill)) {
            delete newProficiency[skill];
          }
        });
        return { ...newProfile, skillProficiency: newProficiency };
      }
      return newProfile;
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profilePicture" | "resume"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === "profilePicture" && !file.type.startsWith("image/")) {
        setError("پروفایل باید یک تصویر باشد");
        notifyError("پروفایل باید یک تصویر باشد");
        return;
      }
      if (field === "profilePicture") {
        setProfilePictureFile(file);
        notifySuccess("عکس پروفایل با موفقیت آپلود شد");
      } else if (field === "resume") {
        setResumeName(file.name);
        setLocalProfile((prev) => ({ ...prev, resume: file }));
        notifySuccess("رزومه با موفقیت آپلود شد");
      }
      setError(null);
    } else {
      notifyError("هیچ فایلی انتخاب نشد");
    }
  };

  const handleRemoveResume = () => {
    setResumeName(null);
    setLocalProfile((prev) => ({ ...prev, resume: null }));
    notifySuccess("رزومه با موفقیت حذف شد");
  };

  const handleRemoveProfile = () => {
    setProfilePictureFile(null);
    notifySuccess("عکس پروفایل با موفقیت حذف شد");
  };

  const handleProficiencyChange = (skill: string, level: string) => {
    setLocalProfile((prev) => ({
      ...prev,
      skillProficiency: { ...prev.skillProficiency, [skill]: level },
    }));
  };

  const isWorkExperienceEmpty = (exp: WorkExperience) => {
    return (
      !exp.companyName &&
      !exp.website &&
      !exp.duration &&
      !exp.jobTitle &&
      !exp.startDate &&
      !exp.endDate &&
      !exp.isOngoing &&
      exp.skills.length === 0 &&
      Object.keys(exp.skillProficiency).length === 0
    );
  };
  const validateForm = () => {
    let errors: {
      skills?: string[];
      workExperiences?: { index: number; fields: (keyof WorkExperience)[] }[];
    } = {};
    if (localProfile.skills.length > 0) {
      const missingProficiencies = localProfile.skills.filter(
        (skill) => !localProfile.skillProficiency[skill]
      );
      if (missingProficiencies.length > 0) {
        errors.skills = missingProficiencies;
        notifyError("میزان تسلط برای تمام مهارت‌ها باید مشخص شده باشد.");
      }
    }
    if (localProfile.workExperiences.length > 0) {
      const workErrors = localProfile.workExperiences
        .map((exp, index) => {
          const missingFields: (keyof WorkExperience)[] = [];
          if (!isWorkExperienceEmpty(exp)) { 
            if (!exp.companyName) missingFields.push("companyName");
            if (!exp.jobTitle) missingFields.push("jobTitle");
            if (!exp.startDate) missingFields.push("startDate");
            if (!exp.duration) missingFields.push("duration");
            if (!exp.isOngoing && !exp.endDate) missingFields.push("endDate");
            if (exp.skills.length === 0) missingFields.push("skills"); 
            if (exp.skills.length > 0) {
              const missingProficiencies = exp.skills.filter(
                (skill) => !exp.skillProficiency[skill]
              );
              if (missingProficiencies.length > 0) {
                missingFields.push("skillProficiency");
              }
            }
          }
          return missingFields.length > 0 ? { index, fields: missingFields } : null;
        })
        .filter((err) => err !== null) as { index: number; fields: (keyof WorkExperience)[] }[];

      if (workErrors.length > 0) {
        errors.workExperiences = workErrors;
        notifyError("همه فیلدهای سوابق کاری باید تکمیل شده باشد.");
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    const filteredWorkExperiences = localProfile.workExperiences.filter(
      (exp) => !isWorkExperienceEmpty(exp)
    );
    setLocalProfile((prev) => ({
      ...prev,
      workExperiences: filteredWorkExperiences,
    }));
    setWorkSearchTerms((prev) => prev.slice(0, filteredWorkExperiences.length));
    setWorkDropdowns((prev) => prev.slice(0, filteredWorkExperiences.length));
    if (!validateForm()) {
      setLoading(false);
      setTimeout(() => {
        setValidationErrors({});
      }, 3000);
      return;
    }

    try {
      dispatch(setProfile(localProfile));
      notifySuccess("پروفایل با موفقیت بروزرسانی شد");
    } catch (err) {
      notifyError(`خطا در بروزرسانی پروفایل: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const HandleVerify = async () => {
    notifySuccess(`شماره تماس شما با موفقیت تغییر کرد.`);
    setShowOtpSection(false);
    setTimeLeft(120);
    setTokens("");
  };

  const handleTimeOut = async () => {
    setTimeLeft(120);
    setIsScaled(false);
    notifySuccess("کد جدید ارسال شد");
  };

  const handlePhoneChangeSubmit = () => {
    if (changedPhone) {
      setShowOtpSection(true);
      setTimeLeft(120);
      setTokens("");
      notifySuccess("کد تأیید به شماره جدید ارسال شد");
    }
  };

  const skills = [
    "Django", "React", "Golang", "C#", "C++", "Python", "Java", "Node.js",
    "TypeScript", "Flutter", "Swift", "Kotlin", "PHP", "Ruby on Rails", "Vue.js",
  ];

  const proficiencyLevels = ["مبتدی", "متوسط", "حرفه‌ای", "متخصص"];

  const jobTitles = [
    "توسعه‌دهنده فرانت‌اند",
    "توسعه‌دهنده بک‌اند",
    "توسعه‌دهنده فول‌استک",
    "مهندس DevOps",
    "طراح UI/UX",
    "تحلیل‌گر داده",
    "مهندس یادگیری ماشین",
    "مدیر پروژه",
    "توسعه‌دهنده موبایل",
    "مهندس نرم‌افزار",
  ];

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const datePickerVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.3, ease: "easeIn" } },
    visible: { opacity: 1, height: "auto", marginTop: 8, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const otpSectionVariants = {
    hidden: { opacity: 0, y: -20, height: 0, transition: { duration: 0.4, ease: "easeIn" } },
    visible: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
      <section className="p-4 md:p-6 lg:p-8 bg-[#F7F7F7]">
        <h2 className="text-2xl font-bold mb-4 text-center">حساب کاربری</h2>
        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md max-w-4xl mx-auto relative">
          <div className="border-t border-gray-300 w-full mb-6"></div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleRemoveProfile}
                      className="absolute bg-black bg-opacity-50 rounded-full p-1 border-2 border-white transition duration-200 ease-in-out hover:scale-110 cursor-pointer"
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
                className={`flex items-center gap-2 w-[170px] justify-center transition-all duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] ${
                  changedUsername ? "hover:bg-blue-600 focus:bg-blue-600 focus:shadow-lg cursor-pointer" : "opacity-60"
                }`}
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
              <input
                type="email"
                value={localProfile.email}
                onChange={handleChangeEmail}
                placeholder="example@gmail.com"
                className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
                tabIndex={5}
              />
              <button
                className={`flex items-center gap-2 w-[170px] justify-center transition-all duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] ${
                  changedEmail ? "hover:bg-blue-600 focus:bg-blue-600 focus:shadow-lg cursor-pointer" : "opacity-60"
                }`}
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
                className={`flex items-center gap-2 w-[170px] justify-center transition-all duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] ${
                  changedPhone ? "hover:bg-blue-600 focus:bg-blue-600 focus:shadow-lg cursor-pointer" : "opacity-60"
                }`}
                tabIndex={8}
                disabled={!changedPhone}
                onClick={handlePhoneChangeSubmit}
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
                <span>تغییر شماره تماس</span>
              </button>
            </div>
            <AnimatePresence>
              {showOtpSection && (
                <motion.div
                  variants={otpSectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex flex-col sm:flex-row items-center my-4 w-full"
                >
                  <div className="flex flex-col items-center gap-4 w-full">
                    <OtpInput
                      value={token}
                      onChange={setTokens}
                      numInputs={5}
                      containerStyle={"flex flex-wrap justify-center items-center w-full ltr"}
                      inputType="tel"
                      inputStyle={
                        "flex md:h-[40px] sm:h-[35px] h-[35px] md:scale-139 sm:scale-135 scale-160 font-[vazirmatn] font-normal md:text-[28px] sm:text-[28px] text-[24px] text-black text-center bg-gray-300 rounded-[18px] border-2 border-gray-300 transition-all ease-in-out duration-300 shadow-md focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg md:mx-[15px] sm:mx-[15px] mx-[17px]"
                      }
                      renderInput={(props) => <input {...props} />}
                    />
                    <div className={`flex w-fit h-fit transition-all mt-2 ${isScaled ? "scale-110" : "scale-100"}`}>
                      {timeLeft !== 0 ? (
                        <object
                          data="/src/assets/Clock.svg"
                          type="image/svg+xml"
                          className="w-6.5 h-6.5 pointer-events-none flex"
                        />
                      ) : (
                        <button
                          className={`cursor-pointer w-fit h-fit hover:scale-115 transition-all duration-200 ease-in-out rounded-full${
                            isScaled ? "scale-110" : "scale-100"
                          }`}
                          onClick={handleTimeOut}
                          tabIndex={9}
                        >
                          <object
                            data="/src/assets/Clock_B.svg"
                            type="image/svg+xml"
                            className="w-6.5 h-6.5 pointer-events-none flex transform origin-center"
                          />
                        </button>
                      )}
                      {timeLeft > 0 ? (
                        <span className="text-gray-600 font-[vazirmatn] mr-2">
                          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <button
                      className={`w-[160px] max-w-xs flex gap-2 flex-row justify-center items-center transition duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 ${
                        token.length !== 5 ? "opacity-60" : "hover:bg-blue-600 cursor-pointer"
                      }`}
                      disabled={token.length !== 5}
                      onClick={HandleVerify}
                      tabIndex={10}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-check-big"><path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"/><path d="m9 11 3 3L22 4"/></svg>
                      <p className="text-white font-[vazirmatn] font-extralight">تغییر شماره</p>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-full mx-auto my-0"></div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
                نام
              </label>
              <input
                type="text"
                value={localProfile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
                tabIndex={11}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
                نام خانوادگی
              </label>
              <input
                type="text"
                value={localProfile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
                tabIndex={12}
              />
            </div>
          </div>

          <div className="mt-4 space-y-6">
            <div className="flex flex-col sm:flex-row gap-2 text-right">
              <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
                مهارت‌ها
              </label>
              <div className="w-full sm:flex-1">
                <div className="flex flex-wrap gap-2 mb-2 min-h-[40px] p-2 border-2 rounded-lg bg-white">
                  <AnimatePresence>
                    {localProfile.skills.length > 0 ? (
                      localProfile.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          variants={chipVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="flex items-center gap-1 bg-blue-500 text-white text-sm px-2 py-1 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                          onClick={() =>
                            handleInputChange(
                              "skills",
                              localProfile.skills.filter((s) => s !== skill)
                            )
                          }
                        >
                          {skill}
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </motion.span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">
                        مهارتی انتخاب نشده
                      </span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative mt-4">
                  <input
                    type="text"
                    placeholder="جستجوی مهارت..."
                    value={mainSkillsSearchTerm}
                    onChange={(e) => setMainSkillsSearchTerm(e.target.value)}
                    onFocus={() => setIsMainSkillsDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsMainSkillsDropdownOpen(false), 200)}
                    className="w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white"
                    tabIndex={13}
                  />
                  <AnimatePresence>
                    {isMainSkillsDropdownOpen && (
                      <motion.ul
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto border-2 rounded-lg bg-white shadow-md"
                      >
                        {skills
                          .filter(
                            (skill) =>
                              !localProfile.skills.includes(skill) &&
                              skill.toLowerCase().includes(mainSkillsSearchTerm.toLowerCase())
                          )
                          .map((skill) => (
                            <motion.li
                              key={skill}
                              className="p-2 text-right [direction:rtl] hover:bg-gray-100 cursor-pointer"
                              onMouseDown={() =>
                                handleInputChange(
                                  "skills",
                                  [...localProfile.skills, skill].filter(
                                    (v, i, a) => a.indexOf(v) === i
                                  )
                                )
                              }
                            >
                              {skill}
                            </motion.li>
                          ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {localProfile.skills.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h3 className="text-sm font-semibold text-gray-600 text-right">
                      میزان تسلط بر مهارت‌ها
                    </h3>
                    <AnimatePresence>
                      {localProfile.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="flex items-center justify-between gap-2 p-2 bg-gray-100 rounded-lg"
                        >
                          <span className="text-sm text-gray-700">{skill}</span>
                          <select
                            value={localProfile.skillProficiency[skill] || ""}
                            onChange={(e) => handleProficiencyChange(skill, e.target.value)}
                            className={`px-3 py-1 border-2 rounded-lg text-right [direction:rtl] bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                              validationErrors.skills?.includes(skill)
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                            tabIndex={14 + skillIndex}
                          >
                            <option value="" disabled>
                              انتخاب سطح
                            </option>
                            {proficiencyLevels.map((level) => (
                              <option key={level} value={level}>
                                {level}
                              </option>
                            ))}
                          </select>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 text-right">
              <div className="flex flex-col w-full sm:flex-row gap-2 text-right">
                <label className="font-semibold text-gray-600 w-24 text-right">
                  سوابق کاری
                </label>
                <div className="w-full sm:flex-1 space-y-4">
                  <AnimatePresence>
                    {localProfile.workExperiences.length > 0 ? (
                      localProfile.workExperiences.map((exp, index) => {
                        const workError = validationErrors.workExperiences?.find(
                          (err) => err.index === index
                        );
                        const baseTabIndex = 14 + localProfile.skills.length + index * 10;
                        return (
                          <motion.div
                            key={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-gray-100 px-4 pb-4 pt-2 rounded-lg shadow-md border w-full border-gray-200 relative"
                          >
                            <button
                              onClick={() => handleRemoveWorkExperience(index)}
                              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 border-2 border-white transition duration-200 ease-in-out hover:scale-110 cursor-pointer"
                              tabIndex={baseTabIndex}
                            >
                              <X size={20} color="white" />
                            </button>
                            <div className="flex flex-col gap-3 mt-8">
                              <div className="flex items-center gap-2">
                                <label className="text-sm mt-2 font-semibold text-gray-700 w-24 text-right">
                                  اسم شرکت
                                </label>
                                <input
                                  type="text"
                                  value={exp.companyName}
                                  onChange={(e) =>
                                    handleWorkExperienceChange(index, "companyName", e.target.value)
                                  }
                                  placeholder="گوگل"
                                  className={`w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                    workError?.fields.includes("companyName")
                                      ? "placeholder-red-500"
                                      : "placeholder-gray-400"
                                  }`}
                                  tabIndex={baseTabIndex + 1}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <label className="text-sm mt-2 font-semibold text-gray-700 w-24 text-right">
                                  عنوان شغلی
                                </label>
                                <select
                                  value={exp.jobTitle}
                                  onChange={(e) =>
                                    handleWorkExperienceChange(index, "jobTitle", e.target.value)
                                  }
                                  className={`w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 ${
                                    workError?.fields.includes("jobTitle")
                                      ? "text-red-500"
                                      : "text-gray-400"
                                  }`}
                                  tabIndex={baseTabIndex + 2}
                                >
                                  <option value="" disabled>
                                    انتخاب عنوان شغلی
                                  </option>
                                  {jobTitles.map((title) => (
                                    <option key={title} value={title}>
                                      {title}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex items-center gap-2">
                                <label className="text-sm mt-2 font-semibold text-gray-700 w-24 text-right">
                                  تاریخ شروع
                                </label>
                                <DatePicker
                                  value={exp.startDate || ""}
                                  onChange={(date) =>
                                    handleWorkExperienceChange(
                                      index,
                                      "startDate",
                                      date ? date.format("YYYY/MM/DD") : ""
                                    )
                                  }
                                  calendar={persian}
                                  locale={persian_fa}
                                  calendarPosition="bottom-right"
                                  containerStyle={{ width: "100%" }}
                                  render={(value, openCalendar) => (
                                    <input
                                      value={value}
                                      onFocus={openCalendar}
                                      placeholder="تاریخ شروع را انتخاب کنید"
                                      className={`w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                        workError?.fields.includes("startDate")
                                          ? "placeholder-red-500"
                                          : "placeholder-gray-400"
                                      }`}
                                      tabIndex={baseTabIndex + 3}
                                      readOnly
                                    />
                                  )}
                                />
                              </div>
                              <AnimatePresence>
                                {!exp.isOngoing && (
                                  <motion.div
                                    variants={datePickerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    className="flex items-center gap-2"
                                  >
                                    <label className="text-sm mt-2 font-semibold text-gray-700 w-24 text-right">
                                      تاریخ اتمام
                                    </label>
                                    <DatePicker
                                      value={exp.endDate || ""}
                                      onChange={(date) =>
                                        handleWorkExperienceChange(
                                          index,
                                          "endDate",
                                          date ? date.format("YYYY/MM/DD") : ""
                                        )
                                      }
                                      calendar={persian}
                                      locale={persian_fa}
                                      calendarPosition="bottom-right"
                                      containerStyle={{ width: "100%" }}
                                      render={(value, openCalendar) => (
                                        <input
                                          value={value}
                                          onFocus={openCalendar}
                                          placeholder="تاریخ اتمام را انتخاب کنید"
                                          className={`w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                            workError?.fields.includes("endDate")
                                              ? "placeholder-red-500"
                                              : "placeholder-gray-400"
                                          }`}
                                          tabIndex={baseTabIndex + 4}
                                          readOnly
                                        />
                                      )}
                                    />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              <div className="flex items-center gap-2 justify-end">
                                <label className="flex items-center mt-2 gap-2 text-sm text-gray-700 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={exp.isOngoing}
                                    onChange={(e) =>
                                      handleWorkExperienceChange(index, "isOngoing", e.target.checked)
                                    }
                                    className="w-5 h-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 transition-all duration-200"
                                    tabIndex={baseTabIndex + 5}
                                  />
                                  هنوز در حال همکاری هستم
                                </label>
                              </div>
                              {/* Skills Section for Work Experience */}
                              <div className="mt-4">
                                <h3 className="text-sm font-semibold text-gray-600 text-right mb-2">
                                  مهارت‌های استفاده شده
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-2 min-h-[40px] p-2 border-2 rounded-lg bg-white">
                                  <AnimatePresence>
                                    {exp.skills.length > 0 ? (
                                      exp.skills.map((skill) => (
                                        <motion.span
                                          key={skill}
                                          variants={chipVariants}
                                          initial="hidden"
                                          animate="visible"
                                          exit="exit"
                                          className="flex items-center gap-1 bg-blue-500 text-white text-sm px-2 py-1 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                                          onClick={() =>
                                            handleWorkExperienceChange(
                                              index,
                                              "skills",
                                              exp.skills.filter((s) => s !== skill)
                                            )
                                          }
                                        >
                                          {skill}
                                          <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"
                                            />
                                          </svg>
                                        </motion.span>
                                      ))
                                    ) : (
                                      <span className={`text-sm ${workError?.fields.includes("skills") ? "text-red-500" : "text-gray-400"}`}>
                                        مهارتی انتخاب نشده
                                      </span>
                                    )}
                                  </AnimatePresence>
                                </div>
                                <div className="relative mt-2">
                                  <input
                                    type="text"
                                    placeholder="جستجوی مهارت..."
                                    value={workSearchTerms[index] || ""}
                                    onChange={(e) => {
                                      const newSearchTerms = [...workSearchTerms];
                                      newSearchTerms[index] = e.target.value;
                                      setWorkSearchTerms(newSearchTerms);
                                    }}
                                    onFocus={() => {
                                      const newDropdowns = [...workDropdowns];
                                      newDropdowns[index] = true;
                                      setWorkDropdowns(newDropdowns);
                                    }}
                                    onBlur={() =>
                                      setTimeout(() => {
                                        const newDropdowns = [...workDropdowns];
                                        newDropdowns[index] = false;
                                        setWorkDropdowns(newDropdowns);
                                      }, 200)
                                    }
                                    className="w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white"
                                    tabIndex={baseTabIndex + 6}
                                  />
                                  <AnimatePresence>
                                    {workDropdowns[index] && (
                                      <motion.ul
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto border-2 rounded-lg bg-white shadow-md"
                                      >
                                        {skills
                                          .filter(
                                            (skill) =>
                                              !exp.skills.includes(skill) &&
                                              skill.toLowerCase().includes((workSearchTerms[index] || "").toLowerCase())
                                          )
                                          .map((skill) => (
                                            <motion.li
                                              key={skill}
                                              className="p-2 text-right [direction:rtl] hover:bg-gray-100 cursor-pointer"
                                              onMouseDown={() =>
                                                handleWorkExperienceChange(
                                                  index,
                                                  "skills",
                                                  [...exp.skills, skill].filter(
                                                    (v, i, a) => a.indexOf(v) === i
                                                  )
                                                )
                                              }
                                            >
                                              {skill}
                                            </motion.li>
                                          ))}
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <p className="text-gray-400 text-sm border-2 rounded-lg p-2">سابقه کاری اضافه نشده</p>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={handleAddWorkExperience}
                    className="mt-2 bg-[#3E79DE] text-white py-2 px-4 rounded-[20px] shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg"
                    tabIndex={14 + localProfile.skills.length + localProfile.workExperiences.length * 10}
                  >
                    + افزودن سابقه کاری
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
                آپلود رزومه
              </label>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <label className="relative cursor-pointer bg-[#3E79DE] py-2.5 text-white px-5 rounded-[20px] flex items-center gap-2 transition-all duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg shadow-[0_4px_10px_rgba(0,0,0,0.2)] has-[:focus]:bg-blue-600 has-[:focus]:shadow-lg">
                  <Upload size={18} />
                  <span>انتخاب رزومه</span>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "resume")}
                    className="absolute inset-0 opacity-0 cursor-pointer focus:outline-none"
                    tabIndex={14 + localProfile.skills.length + localProfile.workExperiences.length * 10 + 1}
                  />
                </label>
                {resumeName && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-lg border border-gray-300">
                      {resumeName}
                    </span>
                    <button
                      onClick={handleRemoveResume}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      tabIndex={14 + localProfile.skills.length + localProfile.workExperiences.length * 10 + 2}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end">
              <button
                className="w-50 flex justify-center items-center transition-all duration-200 ease-in-out cursor-pointer rounded-[20px] bg-[#3E79DE] py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg"
                onClick={handleSubmit}
                disabled={loading}
                tabIndex={14 + localProfile.skills.length + localProfile.workExperiences.length * 10 + 3}
              >
                <p className="text-white font-[vazirmatn] font-extralight">
                  {loading ? "در حال ارسال..." : "بروزرسانی پروفایل"}
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}