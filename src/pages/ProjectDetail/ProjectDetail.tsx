/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Header from "../../Components/MainContent/Header";
import { useParams, useNavigate } from "react-router-dom";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
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
import { getStatusText } from "../Projects/MyProjects";
import { RiTeamFill } from "react-icons/ri";
import { motion } from "framer-motion";
import InProgressProject from "./InProgressProject";

const ProjectDetail = () => {
  const { project_id } = useParams();
  const { error: notifyError, success: notifySuccess } = useNotification();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [biders, setBiders] = useState<Bider[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [editIds, setEditIds] = useState<number[]>([]);
  const [teams, setTeams] = useState<ApiTeamResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    team_id: 0,
    description: "",
    project_id: project_id ? parseInt(project_id) : 0,
  });

  const formatDuration = (dateString: string) => {
    const projectDate = new Date(dateString);
    const diffTime = projectDate.getTime();
    return diffTime <= 0 ? new Date().getTime() : diffTime;
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

  const fetchTeamsData = async () => {
    try {
      const teams = await GetTeamsForBidding();
      setTeams(mapApiData(teams));
      console.log(teams);
    } catch (error: any) {
      const errorData = error;
      if (errorData.tag && errorData.errors?.length > 0) {
        if (errorData.tag === "NOT_FOUND") {
          navigate("/error");
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
          console.log(bids);
          if (bids) {
            const mappedBiders: Bider[] = bids.bids
              ? bids.bids.map((bid: any) => ({
                  teamid: bid.team_info.id,
                  type: bid.team_info.type,
                  bid_id: bid.bid_id.toString(),
                  title: bid.team_info.title,
                  pre_payment: bid.pre_payment,
                  total: bid.total,
                  expected_time: bid.expected_time,
                  profile: bid.team_info.profile,
                  description: bid.description,
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
            setIds(listOfIds);
            setEditIds(listEditOfIds);
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
        <div className="fixed inset-0 bg-gray-100 dark:bg-gray-800 z-[-1]"></div>
        <div className="items-center bg-gray-100 dark:bg-gray-800 flex flex-col min-h-screen">
          <Header />
          <ProjectDetailSkeletonLoading />
        </div>
      </>
    );
  }

  if (error || !projectData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
          <div className="text-red-500 dark:text-red-400 text-sm font-medium">
            {error || "اطلاعات پروژه یافت نشد."}
          </div>
        </div>
      </>
    );
  }

  if (projectData.status >= 2) {
    return <InProgressProject />;
  }

  return (
    <>
      <div className="fixed inset-0 bg-gray-100 dark:bg-gray-800 z-[-1]"></div>
      <div className="items-center bg-gray-100 dark:bg-gray-800 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:mt-2 sm:mt-2 mt-20 flex justify-center w-full bg-gray-100 dark:bg-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 flex flex-col sm:flex-row w-full max-w-7xl mx-auto h-fit sm:h-[600px] gap-6 sm:gap-12 p-4 sm:p-6"
          >
            <div className="w-full sm:w-1/2 flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 text-right">
                  عنوان پروژه: {projectData.title}
                </h2>
                <div className="flex flex-col w-fit">
                  <div className="flex flex-row text-right text-xs sm:text-sm text-gray-600 dark:text-gray-300 gap-2">
                    <label className="font-semibold">وضعیت پروژه: </label>
                    <span>{getStatusText(projectData.status)}</span>
                  </div>
                  <div className="flex flex-row text-right text-xs sm:text-sm text-gray-600 dark:text-gray-300 gap-2">
                    <label className="font-semibold">تعداد پیشنهادها: </label>
                    <span>{biders.length} پیشنهاد</span>
                  </div>
                  <div className="flex mt-4">
                    <FlipClockCountdown
                      className="ltr flip-clock"
                      to={formatDuration(projectData.duration)}
                      labels={["روز", "ساعت", "دقیقه", "ثانیه"]}
                      hideOnComplete={false}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 text-right">
                  توضیحات پروژه:
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed text-right">
                  {projectData.description}
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 text-right">
                  مهارت‌های مورد نیاز:
                </h3>
                <div className="flex flex-wrap gap-2 justify-start">
                  {projectData.tags &&
                    projectData.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-blue-800/50"
                      >
                        {tag.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col space-y-4">
              <div className="flex-3/4">
                <h3
                  className={`text-base sm:text-lg font-semibold ${biders && biders.length > 0 ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"} mb-1 mt-3 text-right`}
                >
                  پیشنهاد دهندگان:
                </h3>
                <div className="space-y-3 max-h-107 overflow-y-auto pl-3 custom-scrollbar">
                  {biders && biders.length > 0 ? (
                    <>
                      {biders
                        .filter((bider) => editIds.includes(bider.teamid))
                        .map((bider) => (
                          <ProjectBiderCard
                            setTeams={setTeams}
                            project_id={project_id}
                            teamData={teams}
                            key={bider.teamid}
                            bider={bider}
                            color={1}
                            status={projectData.status}
                          />
                        ))}
                      {biders
                        .filter((bider) => !editIds.includes(bider.teamid))
                        .map((bider) => (
                          <ProjectBiderCard
                            setTeams={setTeams}
                            project_id={project_id}
                            teamData={teams}
                            key={bider.teamid}
                            bider={bider}
                            color={0}
                            status={projectData.status}
                          />
                        ))}
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 w-full justify-between py-3 px-2 rounded-lg shadow-md transition-all duration-300 ease-in-out bg-gray-100 dark:bg-gray-700"
                    >
                      <div className="flex items-center space-x-3 gap-3 space-x-reverse">
                        <RiTeamFill className="border-gray-200 dark:border-gray-600 border-2 text-gray-600 dark:text-gray-300 rounded-full w-8 sm:w-9 h-8 sm:h-9 min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 p-1" />
                        <div className="text-right flex justify-center items-center">
                          <p className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                            هیچ پیشنهادی برای پروژه درج نشده
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="flex justify-center gap-4 pl-2">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    fetchTeamsData();
                  }}
                  disabled={projectData.status > 1}
                  className={`bg-blue-600 dark:bg-blue-500 ${projectData.status > 1 ? "opacity-60 dark:opacity-50 cursor-not-allowed" : "hover:bg-blue-500 dark:hover:bg-blue-400 cursor-pointer"} w-full sm:w-3/4 h-[48px] text-white dark:text-gray-200 rounded-lg text-sm shadow-md transition-all duration-300 ease-in-out`}
                >
                  ارسال پیشنهاد
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 cursor-pointer w-full sm:w-1/4 h-[48px] rounded-lg text-white dark:text-gray-200 text-sm shadow-md transition-all duration-300 ease-in-out"
                >
                  بازگشت
                </button>
              </div>
            </div>
          </motion.div>
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
