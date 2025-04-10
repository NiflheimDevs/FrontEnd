import { getTags } from "../../API";
import { useEffect, useState } from "react";
import {
  gregorianToPersian,
  englishToPersianNumber,
} from "../../pages/Profile";

export interface Skill {
  id?: number;
  name: string;
}

export interface WorkExperience {
  id?: number;
  companyName: string;
  jobTitle: string;
  startDate?: string;
  website?: string;
  endDate?: string;
  isOngoing?: boolean;
  skills: Skill[];
  skillProficiency: { [key: string]: string };
}

export interface Profile {
  phoneNumber: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  skills: Skill[];
  skillProficiency: { [key: string]: string };
  workExperiences: WorkExperience[];
  resume: File | null;
  profile?: string;
  SessionID?: string;
}

export const initialProfile: Profile = {
  phoneNumber: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  bio: "",
  skills: [],
  skillProficiency: {},
  workExperiences: [],
  resume: null,
  profile: "",
  SessionID: "",
};

export const proficiencyLevels = ["مبتدی", "متوسط", "حرفه‌ای", "متخصص"];

export let skills: Skill[] = [];

export const mapApiDataToProfile = async (apiData: any): Promise<Profile> => {
  skills = await getTags();
  return {
    phoneNumber: apiData.info?.phonenumber || initialProfile.phoneNumber,
    username: apiData.info?.username || initialProfile.username,
    firstName: apiData.info?.firstname || initialProfile.firstName,
    lastName: apiData.info?.lastname || initialProfile.lastName,
    email: apiData.info?.email || initialProfile.email,
    bio: apiData.info?.bio || initialProfile.bio,
    skills: apiData.tag
      ? apiData.tag.map((tag: any) => ({
          id: tag.id,
          name: tag.name || tag.id,
        }))
      : [],
    skillProficiency: apiData.tag
      ? apiData.tag.reduce((acc: { [key: string]: string }, tag: any) => {
          acc[tag.name || tag.id] = proficiencyLevels[tag.level - 1] || "";
          return acc;
        }, {})
      : {},
    workExperiences: apiData.career
      ? apiData.career.map((career: any) => ({
          id: career.id,
          companyName: career.company || "",
          jobTitle: career.role || "",
          website: career.website || "",
          startDate:
            englishToPersianNumber(
              gregorianToPersian(career.start_date)?.split("T")[0]
            ) || "",
          endDate:
            gregorianToPersian(career.end_date)?.split("T")[0] === "0001-01-01"
              ? ""
              : englishToPersianNumber(
                  gregorianToPersian(career.end_date)?.split("T")[0]
                ) || "",
          isOngoing: career.end_date === "0001-01-01T00:00:00Z",
          skills: career.tags
            ? career.tags.map((tag: any) => ({
                id: tag.id,
                name: tag.name || tag.id,
              }))
            : [],
          skillProficiency: career.tags
            ? career.tags.reduce((acc: { [key: string]: string }, tag: any) => {
                acc[tag.name || tag.id] =
                  proficiencyLevels[tag.level - 1] || "";
                return acc;
              }, {})
            : {},
        }))
      : [],
    resume: initialProfile.resume,
    profile: apiData.info?.profile || initialProfile.profile,
  };
};

export const isWorkExperienceEmpty = (exp: WorkExperience) => {
  return (
    !exp.companyName &&
    !exp.jobTitle &&
    !exp.startDate &&
    !exp.endDate &&
    !exp.isOngoing &&
    !exp.website &&
    exp.skills.length === 0 &&
    Object.keys(exp.skillProficiency).length === 0
  );
};

export const validateForm = (
  profile: Profile,
  notifyError: (message: string) => void
) => {
  let errors: {
    skills?: string[];
    workExperiences?: { index: number; fields: (keyof WorkExperience)[] }[];
  } = {};
  if (profile.skills.length > 0) {
    const missingProficiencies = profile.skills
      .filter((skill) => !profile.skillProficiency[skill.name])
      .map((skill) => skill.name);
    if (missingProficiencies.length > 0) {
      errors.skills = missingProficiencies;
      notifyError("میزان تسلط برای تمام مهارت‌ها باید مشخص شده باشد.");
    }
  }
  if (profile.workExperiences.length > 0) {
    const workErrors = profile.workExperiences
      .map((exp, index) => {
        const missingFields: (keyof WorkExperience)[] = [];
        if (!isWorkExperienceEmpty(exp)) {
          if (!exp.companyName) missingFields.push("companyName");
          if (!exp.jobTitle) missingFields.push("jobTitle");
          if (!exp.startDate) missingFields.push("startDate");
          if (!exp.isOngoing && !exp.endDate) missingFields.push("endDate");
        }
        return missingFields.length > 0
          ? { index, fields: missingFields }
          : null;
      })
      .filter((err) => err !== null) as {
      index: number;
      fields: (keyof WorkExperience)[];
    }[];

    if (workErrors.length > 0) {
      errors.workExperiences = workErrors;
      notifyError("همه فیلدهای سوابق کاری باید تکمیل شده باشد.");
    }
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};

export const useOtpTimer = (initialTime: number, showOtpSection: boolean) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isScaled, setIsScaled] = useState(false);

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

  return { timeLeft, setTimeLeft, isScaled, setIsScaled };
};
