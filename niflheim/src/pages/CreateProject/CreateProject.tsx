import React, { useState } from "react";
import Header from "@/components/DashboardComp/Header";
import Sidebar from "@/components/DashboardComp/Sidebar";
import Step1 from "@/pages/CreateProject/Step1";
import Step2 from "@/pages/CreateProject/Step2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setProjectData, createProject } from "@/store/slices/projectSlice";

const CreateProject: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project);

  // Handle text input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setProjectData({ [e.target.id]: e.target.value }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(setProjectData({ files: e.target.files[0] }));
    }
  };

  // Submit form
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", project.name);
    formData.append("skills", project.skills);
    formData.append("description", project.description);
    if (project.files) {
      formData.append("files", project.files);
    }
    dispatch(createProject(formData));
  };

  // Next & Previous steps
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 w-full bg-[#F7F7F7] lg:pr-64">
        <Header toggleSidebar={toggleSidebar} />

        {/* Step Navigation */}
        <div className="flex justify-center px-4 sm:w-full sm:h-screen md:w-full md:h-screen">
          <div className="w-[90%] sm:w-[60%] p-6 bg-white rounded-lg shadow-md">
            {step === 1 && <Step1 formData={project} handleChange={handleChange} handleFileChange={handleFileChange} nextStep={nextStep} />}
            {step === 2 && <Step2 prevStep={prevStep} handleSubmit={handleSubmit} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;
