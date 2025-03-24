import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/DashboardComp/Header";
import Sidebar from "@/components/DashboardComp/Sidebar";
import Step1 from "@/pages/CreateProject/Step1";
import Step2 from "@/pages/CreateProject/Step2";
import Step3 from "@/pages/CreateProject/Step3";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setProjectData, resetProject, createProject } from "@/store/slices/projectSlice";
import { authAxios } from "@/config/auth";

// Tag interface
interface Tag {
  ID: number;
  Name: string;
}

const CreateProject: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project);

  // Fetch tags on component mount
  useEffect(() => {
    fetchTags();
  }, []);

  // Fetch tags from API
  const fetchTags = async () => {
    try {
      const response = await authAxios.get('/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
      setError('خطا در دریافت تگ‌ها. لطفا مجددا تلاش کنید.');
    }
  };

  // Handle text input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setProjectData({ [e.target.id]: e.target.value }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(setProjectData({ files: e.target.files[0] }));
    }
  };

  // Handle tag selection
  const handleTagChange = (selectedTags: number[]) => {
    dispatch(setProjectData({ tags: selectedTags }));
  };

  // Handle label selection
  const handleLabelChange = (selectedLabels: string[]) => {
    dispatch(setProjectData({ label: selectedLabels }));
  };

  // Submit form
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append('title', project.name);
      formData.append('description', project.description);
      
      // Append tags as a JSON string
      formData.append('tags', JSON.stringify(project.tags));
      
      // Append labels as a JSON string
      formData.append('label', JSON.stringify(project.label || []));
      
      // Append file if it exists
      if (project.files) {
        formData.append('file', project.files);
      }
      
      // Use the Redux thunk action to create the project
      const resultAction = await dispatch(createProject(formData) as any);
      
      if (createProject.fulfilled.match(resultAction)) {
        setSuccess(true);
        setTimeout(() => {
          dispatch(resetProject());
          navigate('/dashboard/projects');
        }, 2000);
      } else {
        // If the action was rejected, extract the error message
        setError(resultAction.payload as string || 'خطا در ایجاد پروژه. لطفا مجددا تلاش کنید.');
      }
    } catch (error: any) {
      console.error('Error creating project:', error);
      setError('خطا در ایجاد پروژه. لطفا مجددا تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
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
      <main className="flex-1 flex flex-col mt-16 w-full bg-[#F7F7F7] lg:pr-64 md:pr-0">
        <Header toggleSidebar={toggleSidebar} />

        {/* Progress Bar */}
        <div className="w-full px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4 sm:gap-0 md:gap-0">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>1</div>
                <div className={`h-1 w-16 mx-2 sm:mx-0 md:mx-0 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>2</div>
                <div className={`h-1 w-16 mx-2 sm:mx-0 md:mx-0 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>3</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex justify-center px-4 sm:w-full md:w-full">
          <div className="w-[90%] sm:w-[60%] md:w-[80%] p-6 bg-white rounded-lg shadow-md">
            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-700 rounded">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-2 bg-green-100 border border-green-300 text-green-700 rounded">
                پروژه با موفقیت ایجاد شد! در حال انتقال به صفحه پروژه‌ها...
              </div>
            )}
            
            {step === 1 && (
              <Step1 
                formData={project} 
                handleChange={handleChange} 
                handleFileChange={handleFileChange} 
                nextStep={nextStep} 
              />
            )}
            
            {step === 2 && (
              <Step2 
                formData={project}
                tags={tags}
                handleTagChange={handleTagChange}
                handleLabelChange={handleLabelChange}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            
            {step === 3 && (
              <Step3 
                formData={project}
                tags={tags}
                prevStep={prevStep}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;