/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Header from "../../Components/MainContent/Header";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { GetProject } from "../../API";
import { errorMapper } from "../Error/Error";
import { useNotification } from "../../Notification/NotificationProvider";

// Define interfaces for our data structure
interface Tag {
  id: number;
  name: string;
}

interface Label {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProjectData {
  project_id: number;
  Owner_id: number;
  title: string;
  description: string;
  label: Label;
  tags: Tag[];
  first_name: string;
  last_name: string;
  username: string;
  duration: string;
}

interface Bidder {
  name: string;
  rating: number;
  bid: string;
}

const ProjectDetail = () => {
  const { project_id } = useParams();
  const { error: notifyError } = useNotification();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);
  // Sample bidders data - in a real app, this would also come from an API
  const bidders: Bidder[] = [
    { name: "احمد احمدی", rating: 4.1, bid: "۵۰۰ تومان" },
    { name: "محمد محمدی", rating: 4.2, bid: "۴۹۰ تومان" },
    { name: "علی رنجبر", rating: 3, bid: "۴۸۰ تومان" },
    { name: "رضا غلامی", rating: 2, bid: "۵۰۰ تومان" },
    { name: "حسن سهرابی", rating: 4.5, bid: "۴۷۵ تومان" },
    { name: "یاسر سمیعی", rating: 3.8, bid: "۴۹۵ تومان" },
    { name: "کریم صیاد فعال", rating: 4.0, bid: "۴۸۵ تومان" },
  ];

  // Format date to show how long ago the project was posted
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
          console.log("API response:", response);
          setProjectData(response);
          setLoading(false);
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
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [project_id]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
  //       <Header />
  //       <div className="mt-20">در حال بارگذاری...</div>
  //     </div>
  //   );
  // }

  if (error || !projectData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        {/* <Header /> */}
        {/* <div className="mt-20 text-red-500">{error || "اطلاعات پروژه یافت نشد."}</div> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 mt-20 flex justify-center">
        <div className="shadow-2xl rounded-2xl bg-white flex flex-col sm:flex-row w-full max-w-7xl mx-auto h-auto sm:h-[600px] gap-6 sm:gap-20 p-4 sm:p-6">
          {/* Left Half: Project Information (Top on small screens) */}
          <div className="w-full sm:w-1/2 flex flex-col space-y-6">
            {/* Project Title and Info */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3E79DE] text-right">
                عنوان پروژه: {projectData.title}
              </h2>
              <div className="flex flex-col text-right text-xs sm:text-sm text-gray-500">
                <span>{formatDuration(projectData.duration)}</span>
                <span>{bidders.length} پیشنهاد</span>
              </div>
            </div>
            {/* Creator Info */}
            <div>
              {/* <h3 className="text-base sm:text-lg font-semibold text-black mb-2 text-right">
                سازنده پروژه:
              </h3> */}
              <p className="font-semibold text-black text-xs sm:text-sm text-right"></p>
            </div>
            {/* Project Description */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-black mb-2 text-right">
                توضیحات پروژه:
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-right">
                {projectData.description}
              </p>
            </div>

            {/* Skills Required */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-black mb-2 text-right">
                مهارت‌های مورد نیاز:
              </h3>
              <div className="flex flex-wrap gap-2 justify-start">
                {projectData.tags &&
                  projectData.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-white border border-[#3E79DE] text-[#3E79DE] px-2 sm:px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Half: Bidders List and Buttons (Bottom on small screens) */}
          <div className="w-full sm:w-1/2 flex flex-col space-y-6">
            {/* Bidders List */}
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-[#3E79DE] mb-3 text-right">
                پیشنهاد دهندگان:
              </h3>
              <div className="space-y-3 max-h-105 overflow-y-auto pl-3 custom-scrollbar">
                {bidders.map((bidder, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gradient-to-l from-blue-500 to-blue-400 rounded-lg shadow-sm hover:bg-scale-103 transition"
                  >
                    <div className="flex items-center space-x-3 gap-3 space-x-reverse">
                      <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gray-300 rounded-full flex items-center justify-center">
                        {/* User initial or placeholder */}
                        {bidder.name.charAt(0)}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-xs sm:text-sm text-gray-200">
                          {bidder.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" size={12} />
                          <span className="text-xs text-yellow-400">
                            {bidder.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-200 text-xs sm:text-sm font-medium">
                      {bidder.bid}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons Below Bidders */}
            <div className="flex justify-center gap-4">
              <button className="bg-blue-500 cursor-pointer w-full sm:w-3/4 h-[48px] text-white rounded-lg hover:bg-blue-600 text-sm">
                ارسال پیشنهاد
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-500 cursor-pointer w-full sm:w-1/4 h-[48px] rounded-lg text-white hover:bg-gray-600 text-sm"
                بازگشت
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
