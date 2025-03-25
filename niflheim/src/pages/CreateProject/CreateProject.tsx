import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  setProjectData, 
  resetProject, 
  createProject 
} from '@/store/slices/projectSlice';
import { getTags } from '../../API';
import Header from "@/components/DashboardComp/Header";
import Sidebar from "@/components/DashboardComp/Sidebar";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

interface Tag {
  ID: number;
  Name: string;
}

const CreateProject: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tags, setTags] = useState<Tag[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const project = useSelector((state: RootState) => state.project);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  // Fetch tags on component mount
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await getTags();
        setTags(fetchedTags);
        
        // If no tags are found, log an error
        if (fetchedTags.length === 0) {
          console.error('No tags retrieved');
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    
    fetchTags();
  }, []);

  // Navigation methods
  const nextStep = () => setCurrentStep(current => current + 1);
  const prevStep = () => setCurrentStep(current => current - 1);

  // Form submission handler
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', project.name);
    formData.append('description', project.description);
    
    // Add the selected label (price)
    const selectedLabel = project.label[0];
    const labelPrices: {[key: string]: number} = {
      'فوری': 202000,
      'برجسته': 150000,
      'رایگان': 0
    };
    formData.append('price', labelPrices[selectedLabel].toString());
    
    // Append tags
    project.tags.forEach(tag => 
      formData.append('tags[]', tag.toString())
    );
    
    // Append the selected label
    formData.append('labels[]', selectedLabel);
    
    // Append file if exists
    if (project.files) {
      formData.append('file', project.files);
    }

    try {
      await dispatch(createProject(formData) as any).unwrap();
      navigate('/projects');
    } catch (error) {
      console.error('Project creation failed:', error);
    }
  };
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const renderSkeleton = () => (
    <>
    <div className="p-6 space-y-6 animate-pulse justify-center items-center flex flex-col ">
    <div className="h-6 w-1/3  bg-gray-300 rounded shiny-skeleton"></div>
    <div className="h-12 w-2/3 bg-gray-300 rounded shiny-skeleton"></div>
    <div className="h-12 w-2/3 bg-gray-300 rounded shiny-skeleton"></div>
    <div className="h-24 w-2/3 bg-gray-300 rounded shiny-skeleton"></div>
    <div className="h-12 w-2/3 bg-gray-300 rounded shiny-skeleton"></div>
    </div>
    <div className="h-10 w-32 bg-gray-400 rounded justify-start flex flex-col items-start mr-auto ml-55 shiny-skeleton"></div>
    </>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        {[1, 2, 3].map(step => (
          <div 
            key={step} 
            className={`w-10 h-10 mx-2 rounded-full flex items-center justify-center 
              ${currentStep === step ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {step}
          </div>
        ))}
      </div>


      {/* <div className="flex h-screen bg-gray-100"> */}
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      {/* </div><main className="flex-1 flex flex-col mt-16 w-full bg-[#F7F7F7] lg:pr-64 md:pr-0"> */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Progress Bar
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
        </div> */}


      {/* Step Components */}
      {currentStep === 1 && (
        <Step1 
          formData={project} 
          onNext={nextStep} 
        />
      )}
      
      {currentStep === 2 && (
        <Step2 
          formData={project} 
          tags={tags}
          onNext={nextStep} 
          onPrev={prevStep} 
        />
      )}
      
      {currentStep === 3 && (
        <Step3 
          formData={project} 
          tags={tags}
          onSubmit={handleSubmit} 
          onPrev={prevStep} 
        />
      )}
    </div>
  );
};

export default CreateProject;