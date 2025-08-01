/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Header from "../../Components/MainContent/Header";
import { useParams, useNavigate } from "react-router-dom";
import { GetCommentOfProject, GetProject, GetProjectBid } from "../../API";
import { errorMapper } from "../Error/Error";
import { useNotification } from "../../Notification/NotificationProvider";
import { Bider, ProjectData } from "../../Components/Biders/types";
import ProjectBiderCard from "../../Components/ProjectDetail/ProjectBiderCard";
import ProjectDetailSkeletonLoading from "../../Components/ProjectDetail/ProjectDetailSkeletonLoading";
import { ApiTeamResponse } from "./types";
import { getStatusText } from "../Projects/MyProjects";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const InProgressProject = () => {
  const { project_id } = useParams();
  const { error: notifyError } = useNotification();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [biders, setBiders] = useState<Bider[]>([]);
  const [teams, setTeams] = useState<ApiTeamResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        if (project_id) {
          setLoading(true);
          const response = await GetProject(project_id);
          setProjectData(response);
          if (response && response.status > 4) {
            const commentData = await GetCommentOfProject(project_id);
            setComment(commentData.content || "");
            setRating(commentData.rating || 0);
          }
          // console.log(response);
        }
      } catch (error: any) {
        notifyError(`${errorMapper(error)}`);
        setError(errorMapper(error));
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [project_id, notifyError]);

  useEffect(() => {
    const fetchProjectBids = async () => {
      try {
        if (project_id) {
          const bids = await GetProjectBid(project_id);
          if (bids && bids.bids) {
            const mappedBiders: Bider[] = bids.bids.map((bid: any) => ({
              teamid: bid.team_info.id,
              type: bid.team_info.type,
              bid_id: bid.bid_id.toString(),
              ownerid: bid.team_info.owner_id,
              title: bid.team_info.title,
              pre_payment: bid.pre_payment,
              total: bid.total,
              expected_time: bid.expected_time,
              profile: bid.team_info.profile,
              description: bid.description,
            }));
            setBiders(mappedBiders);
          }
        }
      } catch (error: any) {
        notifyError(`${errorMapper(error)}`);
        setError(errorMapper(error));
      }
    };
    fetchProjectBids();
  }, [project_id, notifyError]);

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

  // The first bid is the selected/accepted one (API returns only accepted bid for status 3)
  const selectedBid =
    biders && projectData?.selected_bid
      ? biders.find(
          (bider) => bider.bid_id === projectData?.selected_bid?.toString()
        )
      : null;

  const otherBids = biders
    ? biders.filter(
        (bider) => bider.bid_id !== projectData?.selected_bid?.toString()
      )
    : [];

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
            className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 flex flex-col w-full max-w-4xl mx-auto h-fit gap-6 p-4 sm:p-6"
          >
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 text-right">
                پروژه در حال انجام: {projectData.title}
              </h2>
              <div className="flex flex-row text-right text-xs sm:text-sm text-gray-600 dark:text-gray-300 gap-2">
                <label className="font-semibold">وضعیت پروژه: </label>
                <span>{getStatusText(projectData.status)}</span>
              </div>
              <div className="flex flex-row text-right text-xs sm:text-sm text-gray-600 dark:text-gray-300 gap-2">
                <label className="font-semibold">توضیحات پروژه: </label>
                <span>{projectData.description}</span>
              </div>
              <div className="flex flex-row text-right text-xs sm:text-sm text-gray-600 dark:text-gray-300 gap-2">
                <label className="font-semibold">مهارت‌های مورد نیاز:</label>
                <div className="flex flex-wrap gap-2 justify-start">
                  {projectData.tags &&
                    projectData.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-600 dark:text-green-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800/50"
                      >
                        {tag.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4 mt-4">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 text-right">
                تیم منتخب (برنده):
              </h3>
              {selectedBid ? (
                <ProjectBiderCard
                  setTeams={setTeams}
                  project_id={project_id}
                  teamData={teams}
                  bider={selectedBid}
                  color={2}
                  status={projectData.status}
                  isuser={selectedBid.type == 2}
                  id={
                    selectedBid.type == 2
                      ? selectedBid.ownerid
                      : selectedBid.teamid
                  }
                />
              ) : (
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  هیچ تیمی انتخاب نشده است.
                </div>
              )}
            </div>
            {projectData.status > 4 ? (
              <div className="flex flex-col space-y-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 text-right">
                  امتیاز و نظر:
                </h3>
                {/* سیستم امتیازدهی ستاره‌ای */}
                <div className="flex justify-start items-center gap-2 mb-4">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <FaStar
                        key={starValue}
                        size={30}
                        color={starValue <= rating ? "#ffc107" : "#e4e5e9"}
                      />
                    );
                  })}
                </div>
                {/* بخش کامنت */}
                <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                  {comment || "هیچ نظری ثبت نشده است..."}
                </div>
              </div>
            ) : (
              <></>
            )}
            {otherBids.length > 0 && (
              <div className="flex flex-col space-y-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 text-right">
                  سایر پیشنهادها:
                </h3>
                {otherBids.map((bider) => (
                  <ProjectBiderCard
                    setTeams={setTeams}
                    project_id={project_id}
                    teamData={teams}
                    key={bider.teamid}
                    bider={bider}
                    color={0}
                    status={projectData.status}
                    isuser={bider.type == 2}
                    id={bider.type == 2 ? bider.ownerid : bider.teamid}
                  />
                ))}
              </div>
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 cursor-pointer w-1/4 h-[48px] rounded-lg text-white dark:text-gray-200 text-sm shadow-md transition-all duration-300 ease-in-out"
              >
                بازگشت
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default InProgressProject;
