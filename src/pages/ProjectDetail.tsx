import { useEffect, useState } from "react";
import Header from "../Components/MainContent/Header";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);
  // Sample bidders data - in a real app, this would also come from an API
  const bidders: Bidder[] = [
    { name: "احمد۹۵", rating: 4.1, bid: "۵۰۰ دینار" },
    { name: "محمد۸۸", rating: 4.2, bid: "۴۹۰ دینار" },
    { name: "علی۷۷", rating: 3, bid: "۴۸۰ دینار" },
    { name: "رضا۶۶", rating: 2, bid: "۵۰۰ دینار" },
    { name: "حسن۵۵", rating: 4.5, bid: "۴۷۵ دینار" },
    { name: "یاسر۴۴", rating: 3.8, bid: "۴۹۵ دینار" },
    { name: "کریم۳۳", rating: 4.0, bid: "۴۸۵ دینار" },
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
        setLoading(true);

        // Create an instance of axios with custom configuration
        const axiosInstance = axios.create({
          baseURL: "https://103.75.196.227:8080",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        // Make the API call
        const response = await axiosInstance.get(`/project/${project_id}`);
        console.log("API response:", response.data);
        setProjectData(response.data);
        setLoading(false);
      } catch (err: any) {
        // console.error("Error fetching project data:", err);
        // More detailed error reporting
        // setError(
        //   err.response
        //     ? `خطا: ${err.response.status} - ${err.response.statusText}`
        //     : "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید."
        // );
        setLoading(false);
        window.location.href = "https://bidlancer.ir/404";
      }
    };

    if (project_id) {
      fetchProjectData();
    }
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
              <p className="font-semibold text-black text-xs sm:text-sm text-right">
                {projectData.first_name}
                {projectData.last_name} کارفرما این پروژه می باشد.
              </p>
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
              <div className="space-y-3 max-h-96 overflow-y-auto pl-3 custom-scrollbar">
                {bidders.map((bidder, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gradient-to-b from-[#B1D8FC] to-[#D4D4D4] rounded-lg shadow-sm hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center space-x-3 gap-3 space-x-reverse">
                      <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gray-300 rounded-full flex items-center justify-center">
                        {/* User initial or placeholder */}
                        {bidder.name.charAt(0)}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-xs sm:text-sm text-[#000000]">
                          {bidder.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" size={12} />
                          <span className="text-xs text-gray-500">
                            {bidder.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm font-medium">
                      {bidder.bid}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons Below Bidders */}
            <div className="flex justify-center">
              <button className="bg-[#3E79DE] cursor-pointer w-full sm:w-3/4 h-[48px] text-white rounded hover:bg-blue-700 text-sm">
                ارسال پیشنهاد
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
