/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Header from "../../Components/MainContent/Header";
import { useParams, useNavigate } from "react-router-dom";
import {
  GetProject,
  GetProjectBid,
  GetTeamsForBidding,
  PutBid,
} from "../../API";
import { errorMapper } from "../Error/Error";
import { useNotification } from "../../Notification/NotificationProvider";
import { Bider, ProjectData } from "../../Components/Biders/types";
import ProjectBiderCard from "../../Components/ProjectDetail/ProjectBiderCard";
import BidModal from "../../Components/ProjectDetail/BidModal";
import ProjectDetailSkeletonLoading from "../../Components/ProjectDetail/ProjectDetailSkeletonLoading";
import { ApiTeamResponse, mapApiData } from "./types";

const ProjectDetail = () => {
  const { project_id } = useParams();
  const { error: notifyError, success: notifySuccess } = useNotification();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [biders, setBiders] = useState<Bider[]>([]);
  const [ids, setids] = useState<number[]>([]);
  const [Editids, setEditids] = useState<number[]>([]);
  const [teams, setTeams] = useState<ApiTeamResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    team_id: 0,
    description: "",
    project_id: project_id ? parseInt(project_id) : 0,
  });

  const formatDuration = (dateString: string) => {
    const projectDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - projectDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} روز پیش`;
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        if (project_id) {
          setLoading(true);
          const response = await GetProject(project_id);
          setProjectData(response);
        }
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
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [project_id, navigate, notifyError]);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProjectBids = async () => {
      try {
        if (project_id) {
          const bids = await GetProjectBid(project_id);
          if (bids) {
            const mappedBiders: Bider[] = bids.bids
              ? bids.bids.map((bid: any) => ({
                  teamid: bid.team_info.id,
                  type: bid.team_info.type,
                  bid_id: bid.bid_id.toString(),
                  title: bid.team_info.title,
                  pre_payment: 0,
                  total: bid.total,
                  expected_time: bid.expected_time,
                  profile: bid.team_info.profile,
                  description: bid.team_info.description,
                }))
              : [];
            const listOfIds: number[] = bids.ids
              ? bids.ids.filter(
                  (id: number) =>
                    !mappedBiders.some((bider) => bider.teamid === id)
                )
              : [];
            const listEditOfIds: number[] = bids.ids
              ? bids.ids.filter((id: number) =>
                  mappedBiders.some((bider) => bider.teamid === id)
                )
              : [];
            setids(listOfIds);
            setEditids(listEditOfIds);
            setBiders(mappedBiders);
          }
        }
      } catch (error: any) {
        setError(errorMapper(error));
        notifyError(`${errorMapper(error)}`);
      }
    };
    fetchProjectBids();
  }, [project_id, notifyError]);

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
      await PutBid(formData);
      notifySuccess("پیشنهاد با موفقیت ارسال شد.");
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      notifyError(`${errorMapper(error)}`);
    }
  };

  if (loading) {
    return (
      <>
        <Header />

        <ProjectDetailSkeletonLoading />
      </>
    );
  }

  if (error || !projectData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center">
          <div className="text-red-500">
            {error || "اطلاعات پروژه یافت نشد."}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
      <div className="items-center bg-[#F7F7F7] flex flex-col overflow-auto h-screen">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:mt-2 sm:mt-2 mt-20 flex justify-center h-fit">
          <div className="shadow-xl rounded-2xl bg-white flex flex-col sm:flex-row w-full max-w-7xl mx-auto h-fit sm:h-[600px] gap-6 sm:gap-12 p-4 sm:p-6">
            <div className="w-full sm:w-1/2 flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-400 text-right">
                  عنوان پروژه: {projectData.title}
                </h2>
                <div className="flex flex-col text-right text-xs sm:text-sm text-gray-500">
                  <span>{formatDuration(projectData.duration)}</span>
                  <span>{biders.length} پیشنهاد</span>
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 text-right">
                  توضیحات پروژه:
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-right">
                  {projectData.description}
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 text-right">
                  مهارت‌های مورد نیاز:
                </h3>
                <div className="flex flex-wrap gap-2 justify-start">
                  {projectData.tags &&
                    projectData.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-blue-50 border border-blue-200 text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col space-y-4">
              <div className="flex-3/4">
                <h3 className="text-base sm:text-lg font-semibold text-blue-500 mb-1 mt-3 text-right">
                  پیشنهاد دهندگان:
                </h3>
                <div className="space-y-3 max-h-107 overflow-y-auto pl-3 custom-scrollbar">
                  <>
                    {biders
                      .filter((bider) => Editids.includes(bider.teamid))
                      .map((bider) => (
                        <ProjectBiderCard
                          setTeams={setTeams}
                          project_id={project_id}
                          teamData={teams}
                          key={bider.teamid}
                          bider={bider}
                          color={1}
                        />
                      ))}

                    {biders
                      .filter((bider) => !Editids.includes(bider.teamid))
                      .map((bider) => (
                        <ProjectBiderCard
                          setTeams={setTeams}
                          project_id={project_id}
                          teamData={teams}
                          key={bider.teamid}
                          bider={bider}
                          color={0}
                        />
                      ))}
                  </>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    fetchProjectData();
                  }}
                  className="bg-blue-400 hover:bg-blue-500 cursor-pointer w-full sm:w-3/4 h-[48px] text-white rounded-lg text-sm shadow-md transition-colors"
                >
                  ارسال پیشنهاد
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="bg-gray-400 hover:bg-[#F7F7F7]0 cursor-pointer w-full sm:w-1/4 h-[48px] rounded-lg text-white text-sm shadow-md transition-colors"
                >
                  بازگشت
                </button>
              </div>
            </div>
          </div>
        </main>

        <BidModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          teamData={teams}
          ids={ids}
          formData={formData}
          handleInputChange={handleInputChange}
          handleTeamSelect={handleTeamSelect}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default ProjectDetail;
