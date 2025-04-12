import { motion, AnimatePresence } from "framer-motion";
import { Profile, Skill } from "./types";
import { proficiencyLevels, skills } from "./types";
import { useState } from "react";
import React from "react";

interface SkillsSectionProps {
  localProfile: Profile;
  setLocalProfile: React.Dispatch<React.SetStateAction<Profile>>;
  validationErrors: { skills?: string[] };
  tabIndexStart: number;
}

export default function SkillsSection({
  localProfile,
  setLocalProfile,
  validationErrors,
  tabIndexStart,
}: SkillsSectionProps) {
  const [mainSkillsSearchTerm, setMainSkillsSearchTerm] = useState("");
  const [isMainSkillsDropdownOpen, setIsMainSkillsDropdownOpen] =
    useState(false);

  const handleInputChange = (field: keyof Profile, value: any) => {
    setLocalProfile((prev) => {
      const newProfile = { ...prev, [field]: value };
      if (field === "skills" && Array.isArray(value)) {
        const newProficiency = { ...newProfile.skillProficiency };
        Object.keys(newProficiency).forEach((skillName) => {
          if (!value.some((s: Skill) => s.name === skillName)) {
            delete newProficiency[skillName];
          }
        });
        return { ...newProfile, skillProficiency: newProficiency };
      }
      return newProfile;
    });
  };

  const handleProficiencyChange = (skill: string, level: string) => {
    setLocalProfile((prev) => ({
      ...prev,
      skillProficiency: { ...prev.skillProficiency, [skill]: level },
    }));
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
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

  return (
    <div className="flex flex-col sm:flex-row gap-2 text-right">
      <label className="font-semibold mt-2 text-gray-600 w-24 text-right">
        مهارت‌ها
      </label>
      <div className="w-full sm:flex-1">
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="جستجوی مهارت..."
            value={mainSkillsSearchTerm}
            onChange={(e) => setMainSkillsSearchTerm(e.target.value)}
            onFocus={() => setIsMainSkillsDropdownOpen(true)}
            onBlur={() =>
              setTimeout(() => setIsMainSkillsDropdownOpen(false), 200)
            }
            className="w-full p-2 border-2 rounded-lg text-right [direction:rtl] bg-white"
            tabIndex={tabIndexStart}
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
                      !localProfile.skills.some(
                        (s: Skill) => s.name === skill.name
                      ) &&
                      skill.name
                        .toLowerCase()
                        .includes(mainSkillsSearchTerm.toLowerCase())
                  )
                  .map((skill) => (
                    <motion.li
                      key={skill.id}
                      className="p-2 text-right [direction:rtl] hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() =>
                        handleInputChange("skills", [
                          ...localProfile.skills,
                          { id: skill.id, name: skill.name },
                        ])
                      }
                    >
                      {skill.name}
                    </motion.li>
                  ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 min-h-[40px] p-2 rounded-lg bg-gray-100">
          <AnimatePresence>
            {localProfile.skills.length > 0 ? (
              localProfile.skills.map((skill: Skill) => (
                <motion.span
                  key={skill.name}
                  variants={chipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center gap-1 bg-blue-500 text-white text-sm px-2 py-1 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                  onClick={() =>
                    handleInputChange(
                      "skills",
                      localProfile.skills.filter(
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
              <span className="text-gray-400 text-sm">مهارتی انتخاب نشده</span>
            )}
          </AnimatePresence>
        </div>

        {localProfile.skills.length > 0 && (
          <div className="mt-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-600 text-right">
              میزان تسلط بر مهارت‌ها
            </h3>
            <AnimatePresence>
              {localProfile.skills.map((skill: Skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center justify-between gap-2 p-2 bg-gray-100 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{skill.name}</span>
                  <select
                    value={localProfile.skillProficiency[skill.name] || ""}
                    onChange={(e) =>
                      handleProficiencyChange(skill.name, e.target.value)
                    }
                    className={`px-3 py-1 border-2 rounded-lg text-right [direction:rtl] bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${
                      validationErrors.skills?.includes(skill.name)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                    tabIndex={tabIndexStart + 1 + skillIndex}
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
  );
}
