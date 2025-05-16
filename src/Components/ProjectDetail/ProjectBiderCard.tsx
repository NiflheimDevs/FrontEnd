/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Bider, formatPrice, truncateText } from "../Biders/types";
import { RiTeamFill } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { ApiTeamResponse } from "../../pages/ProjectDetail/types";
import BidEditModal from "./BidEditModal";
import { errorMapper } from "../../pages/Error/Error";
import { useNotification } from "../../Notification/NotificationProvider";
import { UpdateBid } from "../../API";

interface ProjectBiderCardProps {
  bider: Bider;
  color: number;
  project_id: string | undefined;
  teamData: ApiTeamResponse | undefined;
}

const ProjectBiderCard: React.FC<ProjectBiderCardProps> = ({
  bider,
  color,
  teamData,
  project_id,
}) => {
  const [profileExists, setProfileExists] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { error: notifyError, success: notifySuccess } = useNotification();
  const [formData, setFormData] = useState({
    team_id: bider.teamid,
    description: "",
    project_id: project_id ? parseInt(project_id) : 0,
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "pre_payment" || name === "total" || name === "expected_time"
          ? parseInt(value)
          : value,
    }));
  };

  const handleTeamSelect = (team_id: number) => {
    setFormData((prev) => ({ ...prev, team_id }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await UpdateBid(formData, bider.bid_id);
      notifySuccess("پیشنهاد با موفقیت ارسال شد.");
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      notifyError(`${errorMapper(error)}`);
    }
  };

  return (
    <>
      <BidEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teamData={teamData}
        ids={[bider.teamid]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleTeamSelect={handleTeamSelect}
        handleSubmit={handleSubmit}
      />
      <div
        className={`flex items-center gap-2 w-full justify-between py-3 px-2 rounded-lg shadow-md transition-colors ${
          color === 1 ? "bg-blue-500" : "bg-blue-400"
        }`}
      >
        <div className="flex items-center space-x-3 gap-3 space-x-reverse">
          {profileExists ? (
            <img
              className="w-8 sm:w-9 h-8 sm:h-9 min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 border border-gray-200 rounded-full flex items-center justify-center"
              alt={bider.title}
              src={bider.profile}
              onError={() => setProfileExists(false)}
            />
          ) : bider.title ? (
            <div className="w-8 sm:w-9 h-8 sm:h-9 min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 p-1 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              {bider.title.charAt(0)}
            </div>
          ) : (
            <RiTeamFill className="border-gray-200 border-2 text-gray-600 rounded-full w-8 sm:w-9 h-8 sm:h-9 min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 p-1" />
          )}
          <div className="text-right">
            <p className="font-semibold text-xs sm:text-sm text-white">
              {bider.title}
            </p>
            <div className="mt-1 flex items-center gap-1 text-gray-100 text-xs">
              {truncateText(bider.description, 50)}
            </div>
          </div>
        </div>
        <p className="text-white text-xs sm:text-sm text-center font-semibold p-2 items-center justify-center flex gap-2">
          <span>{`${formatPrice(bider.total)} تومان`}</span>
          {color == 1 ? (
            <button
              className="cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <GrEdit size={15} />
            </button>
          ) : (
            <></>
          )}
        </p>
      </div>
    </>
  );
};

export default ProjectBiderCard;
