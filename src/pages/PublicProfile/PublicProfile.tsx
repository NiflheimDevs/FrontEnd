/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Header from "../../Components/MainContent/Header";
import UserDetail from "../../Components/PublicProfile/UserDetail";
import {
  Color,
  initialColor,
  initialProfile,
  mapApiDataToProfile,
  Profile,
} from "../../Components/PublicProfile/types";
import UserStateToggle from "../../Components/PublicProfile/UserStateToggle";
import UserJobExperience from "../../Components/PublicProfile/UserJobExperience";
import { GetUser, getUserProject, GetUserTeams } from "../../API";
import { useNotification } from "../../Notification/NotificationProvider";
import { useNavigate, useParams } from "react-router-dom";
import { errorMapper } from "../Error/Error";

const PublicProfile = () => {
  const { profile_id } = useParams();
  const navigate = useNavigate();
  const [localProfile, setLocalProfile] = useState<Profile>(initialProfile);
  const [localColor, setLocalColor] = useState<Color>(initialColor);
  const [isLoading, setIsLoading] = useState(true);
  const { error: notifyError } = useNotification();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (profile_id) {
          const apiData = await GetUser(parseInt(profile_id, 0));
          const apiTeams = await GetUserTeams(parseInt(profile_id, 0));
          const apiEmployer = await getUserProject(
            0,
            1000,
            parseInt(profile_id, 0)
          );
          console.log(apiData);
          const mappedProfile = await mapApiDataToProfile(
            apiData,
            apiEmployer,
            apiTeams
          );
          setLocalProfile(mappedProfile);
        }
      } catch (error: any) {
        const errorData = error;
        if (errorData.tag && errorData.errors?.length > 0) {
          if (errorData.tag == "NOT_FOUND") {
            navigate("/error");
          } else {
            const allErrors = errorData.errors;
            const errorMessages = allErrors.map((err: any) => errorMapper(err));
            notifyError(`${errorMessages.join(" ")}`);
          }
        } else {
          notifyError(`${errorMapper(errorData)}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, profile_id]);

  const renderSkeleton = () => (
    <div className="flex flex-col w-full max-w-5xl sm:my-0 mt-10 md:my-8 px-4 py-8 md:px-0 bg-white rounded-3xl shadow-lg animate-pulse gap-8">
      {/* UserDetail Skeleton */}
      <div className="flex flex-col md:flex-row items-start justify-center gap-6 sm:px-6 px-4 py-8 md:px-10 md:py-12 mt-[-2rem]">
        <div className="flex flex-col items-center gap-4 w-full md:w-1/4 min-w-[160px]">
          <div className="relative flex justify-center items-center w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-blue-400 overflow-hidden bg-gray-100 shadow-md shiny-skeleton" />
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex items-center gap-2">
              <span className="shiny-skeleton w-20 h-4 rounded" />
            </div>
            <span className="shiny-skeleton w-24 h-8 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col md:px-0 px-6 gap-6 w-full md:text-start text-center md:w-1/2 mt-10">
          <div className="flex flex-col gap-2">
            <span className="shiny-skeleton w-40 h-8 rounded mb-2" />
            <span className="shiny-skeleton w-4/5 h-4 rounded mb-1" />
            <span className="shiny-skeleton w-3/4 h-4 rounded mb-1" />
          </div>
        </div>

        <div className="w-full md:px-0 h-full px-4 md:w-1/4 min-w-[200px] flex flex-col gap-2 mt-10 animate-pulse">
          <span className="shiny-skeleton w-32 h-6 rounded mb-2 mr-3" />
          <span className="shiny-skeleton w-24 h-4 rounded mb-1 mr-3" />
          <span className="shiny-skeleton w-20 h-4 rounded mb-1 mr-3" />
        </div>
      </div>
      <span className="shiny-skeleton w-32 h-6 rounded mb-2 mx-8" />
      {/* UserStateToggle Skeleton */}
      <div className="flex bg-white rounded-full shadow-sm p-1 border border-gray-200 w-fit mx-auto ">
          <span className="shiny-skeleton w-24 h-8 rounded-full mx-2" />
          <span className="shiny-skeleton w-24 h-8 rounded-full mx-2" />
          <span className="shiny-skeleton w-24 h-8 rounded-full mx-2" />
      </div>
      {/* UserJobExperience Skeleton */}
      <div className="flex flex-col gap-4 px-4 mb-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-md border border-gray-100 shiny-skeleton flex flex-col gap-2 mb-2">
            <span className="shiny-skeleton w-24 h-4 rounded mb-1" />
            <span className="shiny-skeleton w-20 h-3 rounded mb-1" />
            <div className="flex gap-2 mt-2">
              <span className="shiny-skeleton w-12 h-4 rounded-full" />
              <span className="shiny-skeleton w-16 h-4 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full md:px-6 sm:px-6 px-4 flex flex-col gap-6 justify-center">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-md border border-gray-100 shiny-skeleton flex flex-col gap-2 mb-2">
            <span className="shiny-skeleton w-32 h-4 rounded mb-1" />
            <span className="shiny-skeleton w-24 h-3 rounded mb-1" />
            <div className="flex gap-2 mt-2">
              <span className="shiny-skeleton w-12 h-4 rounded-full" />
              <span className="shiny-skeleton w-16 h-4 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed inset-0 bg-gray-100 z-[-1]"></div>
      <div className="flex flex-col items-center w-full min-h-screen">
        <Header showSearch={false} />
        {isLoading ? (
          renderSkeleton()
        ) : (
          <main className="flex flex-col w-full max-w-5xl sm:my-0 mt-10 md:my-8 px-4 py-8 md:px-0 bg-white rounded-3xl shadow-lg">
            <UserDetail localprofile={localProfile} localcolor={localColor} />
            <UserJobExperience
              localprofile={localProfile}
              localcolor={localColor}
            />
            <UserStateToggle
              localprofile={localProfile}
              localcolor={localColor}
              setLocalColor={setLocalColor}
            />
          </main>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
