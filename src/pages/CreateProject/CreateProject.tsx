import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { 
  // setProjectData, 
  // resetProject, 
  createProject 
} from '../../store/slices/projectSlice';
import { getTags, getLabels } from '../../API';
import { 
  FaClipboardList, 
  FaTags, 
  FaCheckCircle, 
  // FaArrowLeft, 
  // FaArrowRight 
} from 'react-icons/fa';
import Header from "../../Components/DashboardComp/Header";
import Sidebar from "../../Components/DashboardComp/Sidebar";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

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

const CreateProject: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tags, setTags] = useState<Tag[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const project = useSelector((state: RootState) => state.project);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  // Fetch tags and labels on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTags = await getTags();
        const fetchedLabels = await getLabels();
        
        setTags(fetchedTags);
        setLabels(fetchedLabels);
        
        if (fetchedTags.length === 0 || fetchedLabels.length === 0) {
          console.error('No tags or labels retrieved');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  // Navigation methods
  const nextStep = () => setCurrentStep(current => current + 1);
  const prevStep = () => setCurrentStep(current => current - 1);


  const handleSubmit = async () => {
    const projectData = {
      title: project.name,
      description: project.description,
      tags: project.tags, 
      label: project.label[0]
    };
  
    try {
      await dispatch(createProject(projectData) as any).unwrap();
      navigate('/project-created'); // Change this line
    } catch (error) {
      console.error('Project creation failed:', error);
    }
  };
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Step icons
  const StepIcons = [
    { icon: FaClipboardList, text: 'اطلاعات پایه' },
    { icon: FaTags, text: 'انتخاب برچسب‌ها' },
    { icon: FaCheckCircle, text: 'تأیید نهایی' }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
      <div className="container mx-auto md:pr-8 sm:pr-8 pr-0 py-8 mt-15 lg:max-w-4xl">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Header toggleSidebar={toggleSidebar} />
        {/* Progress Indicator */}
        <div className="flex justify-center md:mb-12 mb-0 space-x-5 lg:space-x-8 transition-all duration-400 md:scale-100 sm:scale-[90%] scale-[85%]">
          {StepIcons.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center transition-all duration-400 
                ${currentStep === index + 1 ? 'scale-110' : 'opacity-60'}
              `}
            >
              <step.icon 
                className={`text-3xl mb-2 
                  ${currentStep === index + 1 ? 'text-blue-600' : 'text-gray-400'}
                `} 
              />
              <span 
                className={`text-sm font-medium 
                  ${currentStep === index + 1 ? 'text-blue-600' : 'text-gray-500'}
                `}
              >
                {step.text}
              </span>
            </div>
          ))}
        </div>

        {/* Step Components */}
        <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-400 md:scale-100 sm:scale-[90%] scale-[85%]">
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
              labels={labels}
              onNext={nextStep} 
              onPrev={prevStep} 
            />
          )}
          
          {currentStep === 3 && (
            <Step3 
              formData={project} 
              tags={tags}
              labels={labels}
              onSubmit={handleSubmit} 
              onPrev={prevStep} 
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateProject;