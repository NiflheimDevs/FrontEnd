import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "../../Notification/NotificationProvider";
import { setProfile } from "../../store/slices/profileSlice";
import {
  GetUser,
  PutUser,
  PutTag,
  PutCareer,
} from "../../API";
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
} from "../../pages/Profile";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const profileFromRedux = useSelector(
    (state: { profile: Profile }) => state.profile
  );
  const [localProfile, setLocalProfile] = useState<Profile>(initialProfile);
  const [changedPhone, setChangedPhone] = useState(false);
  const [changedEmail, setChangedEmail] = useState(false);
  const [changedUsername, setChangedUsername] = useState(false);
  const [_fetchLoading, setFetchLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [_error, setError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
  const [validationErrors, setValidationErrors] = useState<{
    skills?: string[];
    workExperiences?: { index: number; fields: (keyof WorkExperience)[] }[];
  }>({});
  const [tabIndex] = useState(12); // tabIndex اولیه
  const { error: notifyError, success: notifySuccess } = useNotification();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFetchLoading(true);
        const apiData = await GetUser();
        const mappedProfile = await mapApiDataToProfile(apiData);
        setLocalProfile(mappedProfile);
        dispatch(setProfile(mappedProfile));
        notifySuccess("اطلاعات کاربر با موفقیت بارگذاری شد");
        setFetchLoading(false);
      } catch (err:any) {
        setError(err.message || "خطا در بارگذاری اطلاعات کاربر");
        notifyError(err.message || "خطا در بارگذاری اطلاعات کاربر");
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
            ? `${persianToGregorian(persianToEnglishNumber(exp.startDate))}T00:00:00Z`
            : "0001-01-01T00:00:00Z",
          end_date: exp.isOngoing
            ? "0001-01-01T00:00:00Z"
            : exp.endDate
              ? `${persianToGregorian(persianToEnglishNumber(exp.endDate))}T00:00:00Z`
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

      await Promise.all([
        PutUser(userData),
        PutTag(tagData),
        PutCareer(careerData),
      ]);
      dispatch(setProfile(localProfile));
      notifySuccess("پروفایل با موفقیت بروزرسانی شد");
    } catch (err) {
      notifyError(`خطا در بروزرسانی پروفایل: ${(err as Error).message}`);
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
  );
}
