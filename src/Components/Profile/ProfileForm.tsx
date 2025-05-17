/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "../../Notification/NotificationProvider";
import { setProfile } from "../../store/slices/profileSlice";
import {
  GetUser,
  PutUser,
  PutTag,
  PutCareer,
  UpdateProfile,
  DeleteProfile,
  GetResume,
  UpdateResume,
  DeleteResume,
} from "../../API";
import { Skeleton } from "primereact/skeleton";
import {
  initialProfile,
  Profile,
  WorkExperience,
  mapApiDataToProfile,
  validateForm,
  isWorkExperienceEmpty,
  proficiencyLevels,
} from "./types";
import UserInfoSection from "./UserInfoSection";
import SkillsSection from "./SkillsSection";
import WorkExperienceSection from "./WorkExperienceSection";
import ResumeSection from "./ResumeSection";
import {
  persianToEnglishNumber,
  persianToGregorian,
} from "../../pages/Profile/Profile";
import { errorMapper } from "../../pages/Error/Error";

const renderSkeleton = () => (
  <div className="animate-pulse justify-center items-center">
    <div className="flex flex-col md:w-2/3 sm:w-full w-9/10 space-y-4 p-6 bg-white rounded-lg shadow-md justify-center items-center mx-auto mt-10">
      <div className="flex flex-col items-center">
        <Skeleton
          width="160px"
          height="160px"
          className="shiny-skeleton full border rounded-full border-gray-300"
        />
        <Skeleton
          width="200px"
          height="30px"
          className="shiny-skeleton mt-4 bg-gray-200 rounded-2xl"
        />
      </div>
      <Skeleton
        width="100%"
        height="45px"
        className="shiny-skeleton my-4 rounded-2xl"
      />
      <Skeleton
        width="100%"
        height="45px"
        className="shiny-skeleton my-4 rounded-2xl"
      />
      <Skeleton
        width="100%"
        height="45px"
        className="shiny-skeleton my-4 rounded-2xl"
      />
      <Skeleton
        width="100%"
        height="45px"
        className="shiny-skeleton my-4 rounded-2xl"
      />
      <Skeleton
        width="100%"
        height="45px"
        className="shiny-skeleton my-4 rounded-2xl"
      />
      <Skeleton
        width="100%"
        height="45px"
        className="shiny-skeleton my-4 rounded-2xl"
      />
      <Skeleton
        width="100%"
        height="45px"
        className="shiny-skeleton my-4 rounded-2xl"
      />
      <Skeleton
        width="100%"
        height="45px"
        className="shiny-skeleton my-4 rounded-2xl"
      />
    </div>
  </div>
);

export default function ProfileForm() {
  const dispatch = useDispatch();
  const profileFromRedux = useSelector(
    (state: { profile: Profile }) => state.profile
  );
  const [localProfile, setLocalProfile] = useState<Profile>(initialProfile);
  const [changedPhone, setChangedPhone] = useState(false);
  const [changedEmail, setChangedEmail] = useState(false);
  const [changedUsername, setChangedUsername] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
  const [validationErrors, setValidationErrors] = useState<{
    skills?: string[];
    workExperiences?: { index: number; fields: (keyof WorkExperience)[] }[];
  }>({});
  const [tabIndex] = useState(12);
  const { error: notifyError, success: notifySuccess } = useNotification();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiData = await GetUser(0);
        const apiResume = await GetResume(0);
        setResumeName(apiResume ? "resume.pdf" : null);
        const mappedProfile = await mapApiDataToProfile(apiData, apiResume);
        setLocalProfile(mappedProfile);
        dispatch(setProfile(mappedProfile));
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || "خطا در بارگذاری اطلاعات کاربر");
        notifyError(err.message || "خطا در بارگذاری اطلاعات کاربر");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const filteredWorkExperiences = localProfile.workExperiences.filter(
      (exp) => !isWorkExperienceEmpty(exp)
    );
    setLocalProfile((prev) => ({
      ...prev,
      workExperiences: filteredWorkExperiences,
    }));

    const { errors, isValid } = validateForm(localProfile, notifyError);
    setValidationErrors(errors);

    if (!isValid) {
      setLoading(false);
      setTimeout(() => setValidationErrors({}), 3000);
      return;
    }

    try {
      const userData = {
        firstname: localProfile.firstName,
        lastname: localProfile.lastName,
        bio: localProfile.bio,
      };

      const tagData = {
        tags: localProfile.skills.map((skill) => ({
          id: skill.id || -1,
          level:
            proficiencyLevels.indexOf(
              localProfile.skillProficiency[skill.name]
            ) + 1 || -1,
        })),
      };

      const careerData = {
        careers: filteredWorkExperiences.map((exp) => ({
          id: exp.id || -1,
          company: exp.companyName || "",
          start_date: exp.startDate
            ? `${persianToGregorian(persianToEnglishNumber({ persianNumber: exp.startDate }))}T00:00:00Z`
            : "0001-01-01T00:00:00Z",
          end_date: exp.isOngoing
            ? "0001-01-01T00:00:00Z"
            : exp.endDate
              ? `${persianToGregorian(persianToEnglishNumber({ persianNumber: exp.endDate }))}T00:00:00Z`
              : "0001-01-01T00:00:00Z",
          role: exp.jobTitle || "",
          website: exp.website || "",
          tags: exp.skills.map((skill) => ({
            id: skill.id || -1,
            level:
              proficiencyLevels.indexOf(exp.skillProficiency[skill.name]) + 1 ||
              4,
          })),
        })),
      };

      const LocalProfile = new FormData();
      const LocalResume = new FormData();

      if (profilePictureFile) {
        LocalProfile.append("file", profilePictureFile);
        if (localProfile.resume) {
          LocalResume.append("file", localProfile.resume);
          await Promise.all([
            PutUser(userData),
            PutTag(tagData),
            PutCareer(careerData),
            UpdateProfile(LocalProfile),
            UpdateResume(LocalResume),
          ]);
        } else {
          await Promise.all([
            PutUser(userData),
            PutTag(tagData),
            PutCareer(careerData),
            UpdateProfile(LocalProfile),
            DeleteResume(),
          ]);
        }
      } else if (localProfile.high_profile) {
        if (localProfile.resume) {
          LocalResume.append("file", localProfile.resume);
          await Promise.all([
            PutUser(userData),
            PutTag(tagData),
            PutCareer(careerData),
            UpdateResume(LocalResume),
          ]);
        } else {
          await Promise.all([
            PutUser(userData),
            PutTag(tagData),
            PutCareer(careerData),
            DeleteResume(),
          ]);
        }
      } else {
        if (localProfile.resume) {
          LocalResume.append("file", localProfile.resume);
          await Promise.all([
            PutUser(userData),
            PutTag(tagData),
            PutCareer(careerData),
            DeleteProfile(),
            UpdateResume(LocalResume),
          ]);
        } else {
          await Promise.all([
            PutUser(userData),
            PutTag(tagData),
            PutCareer(careerData),
            DeleteProfile(),
            DeleteResume(),
          ]);
        }
      }

      dispatch(setProfile(localProfile));
      notifySuccess("پروفایل با موفقیت بروزرسانی شد");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      const errorData = error;
      if (errorData.tag && errorData.errors?.length > 0) {
        const allErrors = errorData.errors;
        const errorMessages = allErrors.map((err: any) => errorMapper(err));
        notifyError(`${errorMessages.join(" ")}`);
      } else {
        notifyError(`${errorMapper(errorData)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // محاسبه tabIndex برای هر بخش
  const skillsTabIndex = tabIndex;
  const workExperienceTabIndex =
    skillsTabIndex + localProfile.skills.length + 1;
  const resumeTabIndex =
    workExperienceTabIndex + localProfile.workExperiences.length * 10 + 1;
  const submitTabIndex = resumeTabIndex + 2;

  return (
    <>
      {isLoading ? (
        renderSkeleton()
      ) : (
        <>
          <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
          <section className="p-4 md:p-6 lg:p-8 bg-[#F7F7F7]">
            <h2 className="text-2xl font-bold mb-4 text-center">حساب کاربری</h2>
            <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md max-w-4xl mx-auto relative">
              <div className="border-t border-gray-300 w-full mb-6"></div>

              <UserInfoSection
                localProfile={localProfile}
                setLocalProfile={setLocalProfile}
                profileFromRedux={profileFromRedux}
                profilePictureFile={profilePictureFile}
                setProfilePictureFile={setProfilePictureFile}
                changedPhone={changedPhone}
                setChangedPhone={setChangedPhone}
                changedEmail={changedEmail}
                setChangedEmail={setChangedEmail}
                changedUsername={changedUsername}
                setChangedUsername={setChangedUsername}
              />

              <div className="mt-4 space-y-6">
                <SkillsSection
                  localProfile={localProfile}
                  setLocalProfile={setLocalProfile}
                  validationErrors={validationErrors}
                  tabIndexStart={skillsTabIndex}
                />

                <WorkExperienceSection
                  localProfile={localProfile}
                  setLocalProfile={setLocalProfile}
                  validationErrors={validationErrors}
                  tabIndexStart={workExperienceTabIndex}
                />

                <ResumeSection
                  localProfile={localProfile}
                  setLocalProfile={setLocalProfile}
                  resumeName={resumeName}
                  setResumeName={setResumeName}
                  tabIndexStart={resumeTabIndex}
                />

                <div className="flex flex-col items-end">
                  <button
                    className="w-46 flex justify-center items-center gap-2 transition-all duration-200 ease-in-out cursor-pointer rounded-[20px] bg-[#3E79DE] py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg"
                    onClick={handleSubmit}
                    disabled={loading}
                    tabIndex={submitTabIndex}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-file-check-icon lucide-file-check"
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="m9 15 2 2 4-4" />
                    </svg>
                    <p className="text-white font-[vazirmatn] font-extralight">
                      {loading ? "در حال ارسال..." : "بروزرسانی پروفایل"}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
