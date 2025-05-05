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
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed inset-0 bg-gray-100 z-[-1]"></div>
      <div className="flex flex-col items-center w-full min-h-screen">
        <Header showSearch={false} />
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
      </div>
    </div>
  );
};

export default PublicProfile;
