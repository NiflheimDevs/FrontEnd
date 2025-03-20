import { useDispatch, useSelector } from "react-redux";
import { Image, Upload, X } from "lucide-react";
import { updateProfileField, setProfile, ProfileState } from "../../store/slices/profileSlice";
import { RootState } from "../../store/store";
import { useState, useEffect } from "react";
import { useNotification } from "../../Notification/NotificationProvider";
import { motion, AnimatePresence } from "framer-motion"; // اضافه کردن framer-motion
import React from "react";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const { error: notifyError, success: notifySuccess } = useNotification();

  const skills = [
    "Django", "React", "Golang", "C#", "C++", "Python", "Java", "Node.js",
    "TypeScript", "Flutter", "Swift", "Kotlin", "PHP", "Ruby on Rails", "Vue.js",
  ];

  const proficiencyLevels = [
    "مبتدی",
    "متوسط",
    "حرفه‌ای",
    "متخصص",
  ];

  const [localProfile, setLocalProfile] = useState<ProfileState>(() => ({
    ...profile,
    workExperiences: profile.workExperiences || [],
  }));
  const [workExperiences, setWorkExperiences] = useState<
    { companyName: string; website: string; duration: string }[]
  >(() => profile.workExperiences || []);

  useEffect(() => {
    setLocalProfile({ ...profile, workExperiences: profile.workExperiences || [] });
    setWorkExperiences(profile.workExperiences || []);
  }, [profile]);

  const handleAddWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      { companyName: "", website: "", duration: "" },
    ]);
  };

  const handleRemoveWorkExperience = (index: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  const handleWorkExperienceChange = (
    index: number,
    field: "companyName" | "website" | "duration",
    value: string
  ) => {
    const updatedExperiences = workExperiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setWorkExperiences(updatedExperiences);
  };

  const handleInputChange = (field: keyof ProfileState, value: any) => {
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

  const handleSubmit = () => {
    setLoading(true);
    setError(null);

    const updatedProfile = {
      ...localProfile,
      workExperiences,
    };

    try {
      dispatch(setProfile(updatedProfile));
      notifySuccess("پروفایل با موفقیت به‌روزرسانی شد");
    } catch (err) {
      notifyError(`خطا در به‌روزرسانی پروفایل: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // انیمیشن‌ها برای چیپس‌ها
  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  // انیمیشن برای کارت‌های سوابق کاری
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  // انیمیشن برای دراپ‌داون مهارت‌ها
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
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
              <label className="font-semibold text-gray-600 w-24 text-right">
                شماره تماس
              </label>
              <input
                type="text"
                value={localProfile.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                placeholder="*********09"
                className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right bg-gray-100 pointer-events-none [direction:rtl]"
                disabled
                tabIndex={-1}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                نام کاربری
              </label>
              <input
                type="text"
                value={localProfile.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="w-full sm:flex-1 p-2 border-2 rounded-lg bg-gray-100 pointer-events-none text-right [direction:rtl]"
                disabled
                tabIndex={-1}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                نام
              </label>
              <input
                type="text"
                value={localProfile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
                tabIndex={3}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                نام خانوادگی
              </label>
              <input
                type="text"
                value={localProfile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
                tabIndex={4}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                ایمیل
              </label>
              <input
                type="email"
                value={localProfile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@gmail.com"
                className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl]"
                tabIndex={5}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                بیوگرافی
              </label>
              <textarea
                value={localProfile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="w-full sm:flex-1 p-2 border-2 rounded-lg resize-none h-24 text-right [direction:rtl]"
                tabIndex={6}
              />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-2 text-right">
              <label className="font-semibold text-gray-600 w-24 text-right">
                مهارت‌ها
              </label>
              <div className="w-full sm:flex-1">
                <div className="flex flex-wrap gap-2 mb-2 min-h-[40px] p-2 border-2 rounded-lg bg-gray-100">
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
                            ></path>
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

                <div className="relative">
                  <input
                    type="text"
                    placeholder="جستجوی مهارت..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    className="w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white"
                    tabIndex={7}
                  />
                  <AnimatePresence>
                    {isDropdownOpen && (
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
                              skill.toLowerCase().includes(searchTerm.toLowerCase())
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
                            className="px-3 py-1 border-2 border-gray-300 rounded-lg text-right [direction:rtl] bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                            tabIndex={8 + skillIndex}
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
                    {workExperiences.length > 0 ? (
                      workExperiences.map((exp, index) => (
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
                            className="bg-black bg-opacity-50 rounded-full p-1 border-2 border-white transition duration-200 ease-in-out hover:scale-110 cursor-pointer"
                            tabIndex={8 + localProfile.skills.length + index * 4 + 1}
                          >
                            <X size={20} color="white" />
                          </button>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <label className="text-sm font-semibold text-gray-700 w-24 text-right">
                                اسم شرکت
                              </label>
                              <input
                                type="text"
                                value={exp.companyName}
                                onChange={(e) =>
                                  handleWorkExperienceChange(index, "companyName", e.target.value)
                                }
                                placeholder="گوگل"
                                className="w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                tabIndex={8 + localProfile.skills.length + index * 4 + 2}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="text-sm font-semibold text-gray-700 w-24 text-right">
                                آدرس سایت
                              </label>
                              <input
                                type="url"
                                value={exp.website}
                                onChange={(e) =>
                                  handleWorkExperienceChange(index, "website", e.target.value)
                                }
                                placeholder="https://google.com"
                                className="w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                tabIndex={8 + localProfile.skills.length + index * 4 + 3}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="text-sm font-semibold text-gray-700 w-24 text-right">
                                مدت همکاری
                              </label>
                              <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) =>
                                  handleWorkExperienceChange(index, "duration", e.target.value)
                                }
                                placeholder="۲ سال"
                                className="w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                tabIndex={8 + localProfile.skills.length + index * 4 + 4}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">سابقه کاری اضافه نشده</p>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={handleAddWorkExperience}
                    className="mt-2 bg-[#3E79DE] text-white py-2 px-4 rounded-[20px] shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg"
                    tabIndex={8 + localProfile.skills.length + workExperiences.length * 4 + 1}
                  >
                    + افزودن سابقه کاری
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <label className="font-semibold text-gray-600 w-24 text-right">
                آپلود رزومه
              </label>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <label
                  className="relative cursor-pointer bg-[#3E79DE] py-2.5 text-white px-5 rounded-[20px] flex items-center gap-2 transition-all duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg shadow-[0_4px_10px_rgba(0,0,0,0.2)] has-[:focus]:bg-blue-600 has-[:focus]:shadow-lg"
                >
                  <Upload size={18} />
                  <span>انتخاب رزومه</span>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "resume")}
                    className="absolute inset-0 opacity-0 cursor-pointer focus:outline-none"
                    tabIndex={8 + localProfile.skills.length + workExperiences.length * 4 + 2}
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
                      tabIndex={8 + localProfile.skills.length + workExperiences.length * 4 + 3}
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
                tabIndex={8 + localProfile.skills.length + workExperiences.length * 4 + 4}
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