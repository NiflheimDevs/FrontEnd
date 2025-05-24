/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  englishToPersianNumber,
  gregorianToPersian,
} from "../../pages/Profile/Profile";

export interface Skill {
  id?: number;
  name: string;
  level: number;
}

export const TogglePageSize = 4;
export const JobPageSize = 4;
export const SkillPageSize = 4;
export interface Teams {
  id: number;
  title: string;
  description: string;
  position: string;
  profile: string;
  owner: {
    member_info: {
      userid: number;
      username: string;
      firstname: string;
      lastname: string;
      position: string;
    };
    profile: string;
  };
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
}

export interface Projects {
  id?: number;
  title: string;
  description: string;
  skills: Skill[];
  label: string;
}

export interface Profile {
  profile_id: string;
  firstName: string;
  lastName: string;
  email: string;
  resumeAddress: string;
  bio: string;
  skills?: Skill[];
  workExperience?: WorkExperience[];
  freelancerprojects?: Projects[];
  employerprojects?: Projects[];
  teams?: Teams[];
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
  profile_id: string,
  apiData: any,
  apiEmployer: any,
  apiTeams: any,
  apiResume: any
): Promise<Profile> => {
  return {
    profile_id: profile_id,
    firstName: apiData.info?.firstname || initialProfile.firstName,
    lastName: apiData.info?.lastname || initialProfile.lastName,
    email: apiData.info?.email || initialProfile.email,
    resumeAddress: apiResume || initialProfile.resumeAddress,
    bio: apiData.info?.bio || initialProfile.bio,
    join_Date:
      englishToPersianNumber(
        gregorianToPersian(apiData.info?.created_at?.split("T")[0])
      ) || initialProfile.join_Date,
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
    teams: apiTeams
      ? apiTeams.map((team: any) => ({
          id: team.id,
          title: team.title,
          description: team.description,
          position: team.position,
          profile: team.profile,
          owner: {
            member_info: {
              userid: team.owner.member_info.userid,
              username: team.owner.member_info.username,
              firstname: team.owner.member_info.firstname,
              lastname: team.owner.member_info.lastname,
              position: team.owner.member_info.position,
            },
            profile: team.owner.profile,
          },
        }))
      : initialProfile.teams,
    employerprojects: apiEmployer.projects
      ? apiEmployer.projects.map((project: any) => ({
          id: project.project_id,
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
    rate: initialProfile.rate,
    comments: initialProfile.comments,
    high_profile: apiData.info?.high_profile || initialProfile.high_profile,
  };
};

export const initialProfile: Profile = {
  profile_id: "0",
  firstName: "",
  lastName: "",
  email: "",
  resumeAddress: "",
  bio: "",
  skills: [],
  teams: [],
  workExperience: [],
  freelancerprojects: [],
  employerprojects: [],
  rate: "_",
  comments: "_",
  high_profile: "",
  join_Date: "", //gregorianToPersian(""),
};
