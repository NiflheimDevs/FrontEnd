import { useDispatch, useSelector } from "react-redux";
import { Image, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  updateProfileField,
  setProfile,
} from "../../store/slices/profileSlice";
import axios from "axios";
import { RootState } from "../../store/store";
import { useState } from "react";
import React from "react";
export default function ProfileForm() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const skills = [
    "Django",
    "React",
    "Golang",
    "C#",
    "C++",
    "Python",
    "Java",
    "Node.js",
    "TypeScript",
    "Flutter",
    "Swift",
    "Kotlin",
    "PHP",
    "Ruby on Rails",
    "Vue.js",
  ];

  const handleInputChange = (field: keyof ProfileState, value: any) => {
    dispatch(updateProfileField({ field, value }));
  };

  // Handle file input changes (profile picture and resume)
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profilePicture" | "resume"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === "profilePicture" && !file.type.startsWith("image/")) {
        setError("پروفایل باید یک تصویر باشد");
        return;
      }
      dispatch(updateProfileField({ field, value: file }));
      if (field === "resume") setResumeName(file.name);
      setError(null);
    }
  };

  const handleRemoveResume = () => {
    dispatch(updateProfileField({ field: "resume", value: null }));
    setResumeName(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("firstName", profile.firstName);
    formData.append("lastName", profile.lastName);
    formData.append("phoneNumber", profile.phoneNumber);
    formData.append("username", profile.username);
    formData.append("email", profile.email);
    formData.append("bio", profile.bio);
    formData.append("skills", JSON.stringify(profile.skills));
    if (profile.profilePicture)
      formData.append("profilePicture", profile.profilePicture);
    if (profile.resume) formData.append("resume", profile.resume);

    // try {
    //   const response = await apiServices.updateProfile(formData);
    //   dispatch(setProfile(response.data));
    // } catch (err) {
    //   setError("خطایی در ارسال اطلاعات رخ داد. لطفاً دوباره تلاش کنید.");
    //   console.log(err);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#F7F7F7] z-[-1]"
        style={{ backgroundColor: "#F7F7F7" }}
      ></div>
      <section className="p-4 md:p-6 lg:p-8 bg-[#F7F7F7]">
        <h2 className="text-2xl font-bold mb-4 text-center">حساب کاربری</h2>
        <div className="bg-white p-4 md:p-6 lg:p-8 rounded shadow-md max-w-4xl mx-auto relative">
          <div className="border-t border-gray-300 w-full mb-6"></div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
              <label className="w-32 h-32 md:w-36 md:h-36 border-2 border-blue-500 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-gray-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "profilePicture")}
                  className="hidden"
                />
                {profile.profilePicture ? (
                  <img
                    src={URL.createObjectURL(profile.profilePicture)}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image className="text-gray-500" size={36} />
                )}
              </label>
              <span className="mt-2 font-semibold text-gray-600">پروفایل</span>
            </div>
          </div>

          {/* فرم ورودی‌ها */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                نام
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full sm:flex-1 p-2 border-2 rounded text-right [direction:rtl]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                نام خانوادگی
              </label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full sm:flex-1 p-2 border-2 rounded text-right [direction:rtl]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                شماره تماس
              </label>
              <input
                type="text"
                value={profile.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="*********09"
                className="w-full sm:flex-1 p-2 border-2 rounded text-right [direction:rtl]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                نام کاربری
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="w-full sm:flex-1 p-2 border-2 rounded text-right [direction:rtl]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                ایمیل
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@gmail.com"
                className="w-full sm:flex-1 p-2 border-2 rounded text-right [direction:rtl]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="font-semibold text-gray-600 w-24 text-right">
                بیوگرافی
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="w-full sm:flex-1 p-2 border-2 rounded resize-none h-24 text-right [direction:rtl]"
              />
            </div>
          </div>

          {/* بخش آپلود رزومه و برچسب‌ها */}
          <div className="mt-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-2 text-right">
              <label className="font-semibold text-gray-600 w-24 text-right">
                برچسب‌ها
              </label>
              <div className="w-full sm:flex-1">
                {/* نمایش چیپ‌های انتخاب‌شده */}
                <div className="flex flex-wrap gap-2 mb-2 min-h-[40px] p-2 border-2 rounded bg-gray-50">
                  {profile.skills.length > 0 ? (
                    profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1 bg-blue-500 text-white text-sm px-2 py-1 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                        onClick={() =>
                          handleInputChange(
                            "skills",
                            profile.skills.filter((s) => s !== skill)
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
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">
                      مهارتی انتخاب نشده
                    </span>
                  )}
                </div>

                {/* دراپ‌داون با قابلیت سرچ */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="جستجوی مهارت..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() =>
                      setTimeout(() => setIsDropdownOpen(false), 200)
                    }
                    className="w-full p-2 border-2 rounded text-right [direction:rtl] bg-white"
                  />
                  {isDropdownOpen && (
                    <ul className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto border-2 rounded bg-white shadow-md">
                      {skills
                        .filter(
                          (skill) =>
                            !profile.skills.includes(skill) &&
                            skill
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                        )
                        .map((skill) => (
                          <li
                            key={skill}
                            className="p-2 text-right [direction:rtl] hover:bg-gray-100 cursor-pointer"
                            onMouseDown={() =>
                              handleInputChange(
                                "skills",
                                [...profile.skills, skill].filter(
                                  (v, i, a) => a.indexOf(v) === i
                                )
                              )
                            }
                          >
                            {skill}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* بخش آپلود رزومه و دکمه ارسال در یک ردیف */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <label className="font-semibold text-gray-600 w-24 text-right">
                  آپلود رزومه
                </label>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <label className="relative cursor-pointer bg-[#3E79DE] py-2.5 text-white px-5 rounded-[20px] flex items-center gap-2 hover:bg-blue-600 transition-colors shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
                    <Upload size={18} />
                    <span>انتخاب رزومه</span>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, "resume")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
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
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <button
                className="w-50 flex justify-center items-center transition duration-200 ease-in-out cursor-pointer rounded-[20px] bg-[#3E79DE] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-2.5 hover:bg-blue-600"
                onClick={handleSubmit}
                disabled={loading}
              >
                <p className="text-white font-[vazirmatn] font-extralight">
                  {loading ? "در حال ارسال..." : "به‌روزرسانی پروفایل"}
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
