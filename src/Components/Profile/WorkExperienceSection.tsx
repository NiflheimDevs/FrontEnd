import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Profile, Skill, WorkExperience } from "./types";
import { skills } from "./types";
import React, { useState } from "react";

interface WorkExperienceSectionProps {
  localProfile: Profile;
  setLocalProfile: React.Dispatch<React.SetStateAction<Profile>>;
  validationErrors: {
    workExperiences?: { index: number; fields: (keyof WorkExperience)[] }[];
  };
  tabIndexStart: number;
}

export default function WorkExperienceSection({
  localProfile,
  setLocalProfile,
  validationErrors,
  tabIndexStart,
}: WorkExperienceSectionProps) {
  const [workSearchTerms, setWorkSearchTerms] = useState<string[]>([]);
  const [workDropdowns, setWorkDropdowns] = useState<boolean[]>([]);

  const handleAddWorkExperience = () => {
    setLocalProfile((prev) => ({
      ...prev,
      workExperiences: [
        ...prev.workExperiences,
        {
          id: -1,
          companyName: "",
          website: "",
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
  };

  const handleWorkExperienceChange = (
    index: number,
    field: keyof WorkExperience,
    value: string | boolean | Skill[]
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
            Object.keys(newProficiency).forEach((skillName) => {
              if (!value.some((s: Skill) => s.name === skillName)) {
                delete newProficiency[skillName];
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

  // const handleWorkSkillProficiencyChange = (
  //   index: number,
  //   skill: string,
  //   level: string
  // ) => {
  //   setLocalProfile((prev) => {
  //     const updatedExperiences = prev.workExperiences.map((exp, i) => {
  //       if (i === index) {
  //         return {
  //           ...exp,
  //           skillProficiency: { ...exp.skillProficiency, [skill]: level },
  //         };
  //       }
  //       return exp;
  //     });
  //     return { ...prev, workExperiences: updatedExperiences };
  //   });
  // };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const datePickerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: 8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 text-right">
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
              const baseTabIndex = tabIndexStart + index * 10;
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
                          handleWorkExperienceChange(
                            index,
                            "companyName",
                            e.target.value
                          )
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
                      <input
                        type="text"
                        value={exp.jobTitle}
                        placeholder="توسعه دهنده فرانت"
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "jobTitle",
                            e.target.value
                          )
                        }
                        className={`w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 ${
                          workError?.fields.includes("jobTitle")
                            ? "placeholder-red-500"
                            : "placeholder-gray-400"
                        }`}
                        tabIndex={baseTabIndex + 2}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm mt-2 font-semibold text-gray-700 w-24 text-right">
                        آدرس سایت
                      </label>
                      <input
                        type="text"
                        value={exp.website}
                        placeholder="www.niflheim.com"
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "website",
                            e.target.value
                          )
                        }
                        className={`w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400`}
                        tabIndex={baseTabIndex + 2}
                      />
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
                        onOpenPickNewDate={false}
                        highlightToday={true}
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        containerStyle={{ width: "100%" }}
                        render={(_value, openCalendar) => (
                          <input
                            value={exp.startDate || ""}
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
                            handleWorkExperienceChange(
                              index,
                              "isOngoing",
                              e.target.checked
                            )
                          }
                          className="w-5 h-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 transition-all duration-200"
                          tabIndex={baseTabIndex + 5}
                        />
                        هنوز در حال همکاری هستم
                      </label>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-600 text-right mb-2">
                        مهارت‌های استفاده شده
                      </h3>
                      <div className="relative mb-2">
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
                                    !exp.skills.some(
                                      (s: Skill) => s.name === skill.name
                                    ) &&
                                    skill.name
                                      .toLowerCase()
                                      .includes(
                                        (
                                          workSearchTerms[index] || ""
                                        ).toLowerCase()
                                      )
                                )
                                .map((skill) => (
                                  <motion.li
                                    key={skill.id}
                                    className="p-2 text-right [direction:rtl] hover:bg-gray-100 cursor-pointer"
                                    onMouseDown={() =>
                                      handleWorkExperienceChange(
                                        index,
                                        "skills",
                                        [
                                          ...exp.skills,
                                          {
                                            id: skill.id,
                                            name: skill.name,
                                          },
                                        ].filter(
                                          (v, i, a) =>
                                            a.findIndex(
                                              (s) => s.name === v.name
                                            ) === i
                                        )
                                      )
                                    }
                                  >
                                    {skill.name}
                                  </motion.li>
                                ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex flex-wrap mt-2 min-h-[40px] p-2 rounded-lg bg-gray-100 gap-2">
                        <AnimatePresence>
                          {exp.skills.length > 0 ? (
                            exp.skills.map((skill: Skill) => (
                              <motion.span
                                key={skill.name}
                                variants={chipVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex items-center gap-2 bg-blue-500 text-white text-sm px-2 py-1 rounded-full cursor-pointer hover:bg-blue-600 transition-colors "
                                onClick={() =>
                                  handleWorkExperienceChange(
                                    index,
                                    "skills",
                                    exp.skills.filter(
                                      (s: Skill) => s.name !== skill.name
                                    )
                                  )
                                }
                              >
                                {skill.name}
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
                            <span
                              className={`text-sm ${workError?.fields.includes("skills") ? "text-red-500" : "text-gray-400"}`}
                            >
                              مهارتی انتخاب نشده
                            </span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-400 text-sm bg-gray-100 rounded-lg p-2">
              سابقه کاری اضافه نشده
            </p>
          )}
        </AnimatePresence>
        <button
          onClick={handleAddWorkExperience}
          className="mt-2 bg-[#3E79DE] text-white py-2 px-4 rounded-[20px] shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg"
          tabIndex={tabIndexStart + localProfile.workExperiences.length * 10}
        >
          + افزودن سابقه کاری
        </button>
      </div>
    </div>
  );
}
