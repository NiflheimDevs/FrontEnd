/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setProjectData,
  resetProject,
  updateProject,
} from "../../store/slices/projectSlice";
import { getTags } from "../../API";
import {
  FaClipboardList,
  FaTags,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import Header from "../../Components/DashboardComp/Header";
import Sidebar from "../../Components/DashboardComp/Sidebar";
import EditStep1 from "../../Components/EditProject/EditStep1";
import EditStep2 from "../../Components/EditProject/EditStep2";
import EditStep3 from "../../Components/EditProject/EditStep3";
import axios from "axios";

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

interface ProjectState {
  name: string;
  description: string;
  tags: number[];
  label: number[];
}

const EditProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [tags, setTags] = useState<Tag[]>([]);
  const [projectLabel, setProjectLabel] = useState<Label | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector(
    (state: RootState) => state.project
  ) as ProjectState;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `https://103.75.196.227:8080/project/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const projectData = response.data;

        const tagsArray = Array.isArray(projectData.tags)
          ? projectData.tags.map((tag: any) =>
              typeof tag === "object" ? tag.id : tag
            )
          : [projectData.tags];

        if (projectData.label) {
          if (typeof projectData.label === "object") {
            setProjectLabel(projectData.label);
          } else {
            setProjectLabel({
              id: projectData.label,
              name: projectData.labelName || "برچسب پروژه",
              description: projectData.labelDescription || "",
              price: projectData.labelPrice || 0,
            });
          }
        }

        dispatch(
          setProjectData({
            name: projectData.title,
            description: projectData.description,
            tags: tagsArray,
            label: projectData.label
              ? [
                  typeof projectData.label === "object"
                    ? projectData.label.id
                    : projectData.label,
                ]
              : [],
          })
        );

        const fetchedTags = await getTags();
        setTags(fetchedTags);

        setLoading(false);
      } catch {
        setError("خطا در بارگذاری اطلاعات پروژه. لطفاً دوباره تلاش کنید.");
        setLoading(false);
      }
    };

    fetchProjectData();

    return () => {
      dispatch(resetProject());
    };
  }, [projectId, dispatch]);

  const nextStep = () => setCurrentStep((current) => current + 1);
  const prevStep = () => setCurrentStep((current) => current - 1);

  const handleSubmit = async () => {
    const projectData = {
      title: project.name,
      description: project.description,
      tags: project.tags,
      label: project.label[0] ?? null,
    };
    console.log(projectData);
    try {
      if (projectId) {
        await dispatch(
          updateProject({ projectId, projectData }) as any
        ).unwrap();
        navigate("/myprojects");
      }
    } catch {
      setError("خطا در بروزرسانی پروژه. لطفاً دوباره تلاش کنید.");
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const StepIcons = [
    { icon: FaClipboardList, text: "اطلاعات پایه" },
    { icon: FaTags, text: "تگ‌ها و برچسب" },
    { icon: FaCheckCircle, text: "تأیید نهایی" },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 h-screen flex items-center justify-center dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <FaSpinner className="text-4xl text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            در حال بارگذاری اطلاعات پروژه...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 h-screen flex items-center justify-center dark:bg-gray-800">
        <div className="bg-red-50 border border-red-300 text-red-800 p-6 rounded-lg max-w-md text-center dark:bg-gray-900 dark:border-red-900 dark:text-red-300">
          <p className="text-xl font-bold mb-2 dark:text-[#E0D6C8]">خطا</p>
          <p className="dark:text-[#B4AA9C]">{error}</p>
          <button
            onClick={() => navigate("/myprojects")}
            className="mt-4 bg-blue-500 dark:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
          >
            بازگشت به لیست پروژه‌ها
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] dark:bg-gray-800 z-[-1]"></div>
      <div className="dark:bg-gray-800">
        <div className="container mx-auto md:pr-8 sm:pr-8 pr-0 py-8 mt-15 lg:max-w-4xl dark:bg-gray-800">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex justify-center md:mb-12 mb-0 space-x-4 lg:space-x-8 transition-all duration-400 md:scale-100 sm:scale-[90%] scale-[85%] dark:bg-gray-800">
            {StepIcons.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center transition-all duration-400 dark:bg-gray-800 ${
                  currentStep === index + 1 ? "scale-110" : "opacity-60"
                }`}
              >
                <step.icon
                  className={`text-3xl mb-2 ${
                    currentStep === index + 1
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    currentStep === index + 1
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 transition-all duration-400 md:scale-100 sm:scale-[90%] scale-[85%]">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center dark:text-[#E0D6C8]">
              ویرایش پروژه
            </h1>

            {currentStep === 1 && (
              <EditStep1 formData={project} onNext={nextStep} />
            )}

            {currentStep === 2 && (
              <EditStep2
                formData={project}
                tags={tags}
                projectLabel={projectLabel}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 3 && (
              <EditStep3
                formData={project}
                tags={tags}
                projectLabel={projectLabel}
                onSubmit={handleSubmit}
                onPrev={prevStep}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProject;
