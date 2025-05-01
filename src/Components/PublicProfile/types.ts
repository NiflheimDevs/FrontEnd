/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  englishToPersianNumber,
  gregorianToPersian,
} from "../../pages/Profile";

export interface Skill {
  id?: number;
  name: string;
  level: number;
}

export const TogglePageSize = 4;
export const JobPageSize = 4;
export const SkillPageSize = 4;

export interface WorkExperience {
  id?: number;
  companyName: string;
  jobTitle: string;
  startDate?: string;
  website?: string;
  endDate?: string;
  isOngoing?: boolean;
  skills: Skill[];
}

export interface Projects {
  id?: number;
  title: string;
  description: string;
  skills: Skill[];
  label: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  bio: string;
  skills?: Skill[];
  workExperience?: WorkExperience[];
  freelancerprojects?: Projects[];
  employerprojects?: Projects[];
  rate?: string;
  comments?: string;
  resume?: File;
  high_profile?: string;
  join_Date?: string;
}

export interface Color {
  color: string;
  hover: string;
}

export const initialColor: Color = {
  color: "blue-500",
  hover: "blue-600",
};

export const mapApiDataToProfile = async (
  apiData: any,
  apiEmployer: any
): Promise<Profile> => {
  return {
    firstName: apiData.info?.firstname || initialProfile.firstName,
    lastName: apiData.info?.lastname || initialProfile.lastName,
    bio: apiData.info?.bio || initialProfile.bio,
    skills: apiData.tag
      ? apiData.tag.map((tag: any) => ({
          id: tag.id,
          name: tag.name || tag.id,
          level: tag.level,
        }))
      : [],
    workExperience: apiData.career
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
        }))
      : [],

    employerprojects: apiEmployer.projects
      ? apiEmployer.projects.map((project: any) => ({
          id: project.id,
          title: project.title || "",
          description: project.description || "",
          label: project.label.name,
          skills: project.tags
            ? project.tags.map((tag: any) => ({
                id: tag.id,
                name: tag.name || tag.id,
                level: -1,
              }))
            : [],
        }))
      : [],
    join_Date: initialProfile.join_Date,
    rate: initialProfile.rate,
    comments: initialProfile.comments,
    high_profile: apiData.info?.low_profile || initialProfile.high_profile,
  };
};

export const initialProfile: Profile = {
  firstName: "",
  lastName: "",
  bio: "",
  skills: [],
  workExperience: [],
  freelancerprojects: [],
  employerprojects: [],
  rate: "_",
  comments: "_",
  high_profile: "",
  join_Date: "", //gregorianToPersian(""),
};
