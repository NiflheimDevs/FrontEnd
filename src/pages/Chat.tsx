import { useState , useEffect} from "react";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import ChatMessageArea from "./MessageBox/ChatMessageArea";
// import { Skeleton } from 'primereact/skeleton';
// import { Search } from "lucide-react";


export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call or data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const renderSkeleton = () => (
    <div className="flex flex-col md:flex-row mt-6 p-3 md:p-5 w-full max-w-[1080px] h-[88vh] mx-auto shiny-skeleton rounded-2xl" dir="rtl">
      {/* Chat List */}
      <div className="w-full md:w-[340px] h-[300px] md:h-full bg-white/40 md:rounded-tr-2xl md:rounded-br-2xl p-5 flex flex-col shiny-skeleton">
        <div className="flex-1  space-y-2 mt-10">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center p-2 bg-white rounded-md shadow-md shiny-skeleton">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div className="flex-1 ml-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
          ))}
        </div>
      </div>
      {/* Chat Window */}
      <div className="flex flex-col flex-1 min-h-0 mt-4 md:mt-0 md:ml-3 shiny-skeleton rounded-2xl"> </div> 
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-[#71C2F4] to-[#000D6E] z-[-1]"></div>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-[#71C2F4] to-[#000D6E]">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 flex flex-col pt-16 md:pr-24 sm:pr-24 md:pl-0 px-4">
          <Header toggleSidebar={toggleSidebar} />

          {isLoading ? (
                renderSkeleton()
              ) : (
          <ChatMessageArea />
              )}
        </main>
      </div>
    </>
  );
}