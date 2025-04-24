import { useState } from "react";
import Header from "../../Components/MainContent/Header";
import UserDetail from "../../Components/PublicProfile/UserDetail";
import {
  Color,
  initialColor,
  initialProfile,
  Profile,
} from "../../Components/PublicProfile/types";
import UserStateToggle from "../../Components/PublicProfile/UserStateToggle";
import UserJobExperience from "../../Components/PublicProfile/UserJobExperience";

const PublicProfile = () => {
  const [localProfile] = useState<Profile>(initialProfile);
  const [localColor, setLocalColor] = useState<Color>(initialColor);
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
