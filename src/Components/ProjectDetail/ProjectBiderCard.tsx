/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Bider, formatPrice, truncateText } from "../Biders/types";
import { RiTeamFill } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { ApiTeamResponse, mapApiData } from "../../pages/ProjectDetail/types";
import BidEditModal from "./BidEditModal";
import { errorMapper } from "../../pages/Error/Error";
import { useNotification } from "../../Notification/NotificationProvider";
import { GetTeamsForBidding, UpdateBid } from "../../API";
import { useNavigate } from "react-router-dom";

interface ProjectBiderCardProps {
  bider: Bider;
  color: number;
  setTeams: React.Dispatch<React.SetStateAction<ApiTeamResponse | undefined>>;
  project_id: string | undefined;
  teamData: ApiTeamResponse | undefined;
  status: number;
}

const ProjectBiderCard: React.FC<ProjectBiderCardProps> = ({
  bider,
  color,
  setTeams,
  teamData,
  project_id,
  status,
}) => {
  const [profileExists, setProfileExists] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { error: notifyError, success: notifySuccess } = useNotification();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    team_id: bider.teamid,
    description: bider.description,
    total: bider.total,
    expected_time: bider.expected_time,
    pre_payment: bider.pre_payment,
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

  const fetchProjectData = async () => {
    try {
      const teams = await GetTeamsForBidding();
      setTeams(mapApiData(teams));
    } catch (error: any) {
      const errorData = error;
      if (errorData.tag && errorData.errors?.length > 0) {
        if (errorData.tag === "NOT_FOUND") {
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
        className={`flex items-center gap-2 w-full justify-between py-3 px-1 rounded-lg shadow-md transition-colors ${
          color === 1 ? "bg-blue-400" : color === 2 ? "bg-green-700" :"bg-blue-300"
          
        }`}
      >
        <div className="flex items-center space-x-3 gap-2 space-x-reverse">
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
        <p className="text-white text-[12px] md:text-xs lg:text-xs text-center font-semibold p-2 items-center justify-center flex gap-3">
          <div className="flex flex-col whitespace-nowrap gap-1">
            <span>{`${formatPrice(bider.total)} تومان`}</span>
            <span>{`${formatPrice(bider.pre_payment)} تومان`}</span>
          </div>
          {color == 1 ? (
            <button
              className={`${status > 1 ? "hidden" : "cursor-pointer block"}`}
              onClick={() => {
                setIsModalOpen(true);
                fetchProjectData();
              }}
              disabled={status > 1}
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
