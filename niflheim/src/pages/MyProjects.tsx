import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import { Button } from "../Components/ui/button";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import avatar from "@/assets/myproject/avatars.png";
import pencil from "@/assets/myproject/PencilSquare.png";
import { FaTrash } from "react-icons/fa";
import { getUserProject, deleteProject } from "../API";
import { useNotification } from "../Notification/NotificationProvider";

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: 90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 120, damping: 15, duration: 0.8 },
  },
  exit: { opacity: 0, scale: 0.8, rotateX: -90, transition: { duration: 0.5 } },
  hover: {
    scale: 1.01,
    boxShadow: "0px 0px 20px rgba(81, 137, 202, 0.8)",
    transition: { duration: 0.2 },
  },
};

// Pagination button variants
const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 20px rgba(81, 137, 202, 0.6)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

// Modal animation variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const MyProjects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const projectsPerPage = 4;

  const { success, error } = useNotification();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Truncate text if it's too long
  // const truncateText = (text: string, maxLength: number) => {
  //   return text.length > maxLength
  //     ? text.substring(0, maxLength) + "..."
  //     : text;
  // };

  // Function to fetch projects
  const fetchProjects = async (page = currentPage) => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * projectsPerPage;
      const data = await getUserProject(offset, projectsPerPage);

      console.log(
        `Fetching projects for page ${page}, offset ${offset}:`,
        data
      );

      const projectData = data.projects || [];
      const totalCount = data.total || 0;

      setProjects(projectData);
      setTotalProjects(totalCount);

      // If the current page is empty and not the first page, go to the previous page
      if (projectData.length === 0 && page > 1) {
        console.log(`Page ${page} is empty, navigating to page ${page - 1}`);
        setCurrentPage(page - 1);
      }
    } catch (err:any) {
      console.error("Error fetching projects:", err);
      error(
        "خطا در بارگذاری پروژه‌ها: " +
          (err.message || "لطفاً دوباره تلاش کنید.")
      );
      setProjects([]);
      setTotalProjects(0);
      // Fallback: If fetching fails, try fetching the first page
      if (page !== 1) {
        console.log("Fetching failed, falling back to page 1");
        setCurrentPage(1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  // Function to handle project deletion
  const handleDeleteProject = (projectId:any) => {
    setProjectToDelete(projectId);
    setShowModal(true);
  };

  // Function to confirm deletion
  const confirmDelete = async () => {
    if (projectToDelete) {
      try {
        await deleteProject(projectToDelete);
        success("پروژه با موفقیت حذف شد!");
        // Refresh the project list by re-fetching from the API
        await fetchProjects(currentPage);
      } catch (err:any) {
        console.error("Error deleting project:", err);
        error(
          "خطا در حذف پروژه: " + (err.message || "لطفاً دوباره تلاش کنید.")
        );
      }
    }
    setShowModal(false);
    setProjectToDelete(null);
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setShowModal(false);
    setProjectToDelete(null);
  };

  const totalPages = Math.ceil(totalProjects / projectsPerPage) || 1;
  const currentProjects = projects;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber:any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#F7F7F7]">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 flex flex-col pt-20 transition-all duration-400 sm:pr-24 pr-4 pl-4 relative z-10 ${
            isSidebarOpen ? "md:pr-52" : "md:pr-28"
          } ${showModal ? "blur-sm" : ""}`}
        >
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex flex-row justify-between items-center mt-8 px-4">
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:text-4xl sm:text-3xl text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-400"
            >
              پروژه های من
            </motion.h2>
            <Link to="/createproject">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 20px rgba(81, 137, 202, 0.6)",
                  borderRadius: "9999px",
                  transition: { duration: 0.2 },
                }}
              >
                <Button className="rounded-full bg-gradient-to-l from-purple-600 to-blue-600 text-white px-6 py-3 md:scale-[115%] sm:scale-110 scale-100 transition-all duration-400 glowing-shadow cursor-pointer">
                  ساخت پروژه
                </Button>
              </motion.div>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-10 flex justify-center w-full"
              >
                <p className="text-gray-500">در حال بارگذاری...</p>
              </motion.div>
            ) : currentProjects.length > 0 ? (
              <motion.div
                key={currentPage}
                className="mt-12 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 w-full max-w-[1400px] mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={`project-${project.project_id}`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    className="relative bg-gradient-to-br from-[#5189CA] to-[#1E3A8A] rounded-3xl w-full min-w-[250px] max-w-[335.06px] h-fit min-h-[285px] flex flex-col p-6 glowing-card overflow-hidden mx-auto"
                  >
                    <div className="flex flex-col justify-between flex-grow z-10">
                      <div>
                        <div className="flex flex-row justify-between">
                          <p className="text-white text-[13.3px] opacity-70 font-semibold tracking-wider text-right">
                            مرحله: انتخاب کارفرما
                          </p>
                          <motion.img
                            src={avatar}
                            alt="image"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="w-[107px] h-[29px] flex"
                          />
                        </div>
                        <p className="font-bold text-[22.34px] mt-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent truncate">
                          {project.title.length > 20
                            ? project.title.substring(0, 20) + "..."
                            : project.title}
                        </p>
                        <p className="text-white text-[13.3px] mt-3">
                          {project.description.length > 120
                            ? project.description.substring(0, 120) + "..."
                            : project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap w-3/4 gap-2 mt-3">
                        {project.tags.slice(0, 2).map((tag:any) => (
                          <span
                            key={tag.id}
                            className="bg-white/30 text-white text-xs px-3 py-1 rounded-full glowing-shadow"
                          >
                            {tag.name}
                          </span>
                        ))}

                        {project.tags.length > 2 ? (
                          <span className="bg-white/30 text-white text-xs px-3 py-1 rounded-full glowing-shadow">
                            {project.tags.length - 2}+
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4 absolute bottom-[15px] left-[15px] z-10">
                      <Link to={`/edit-project/${project.project_id}`}>
                        <motion.button className="bg-transparent size-[24px] cursor-pointer hover:scale-[115%] transition-all duration-300">
                          <img src={pencil} alt="Edit" />
                        </motion.button>
                      </Link>
                      <motion.button
                        onClick={() => handleDeleteProject(project.project_id)}
                        className="bg-transparent size-[24px] text-red-500 cursor-pointer hover:scale-[115%] transition-all duration-300"
                      >
                        <FaTrash className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-24 justify-center items-center w-full flex flex-col md:scale-100 scale-90 transition-all duration-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="240"
                  height="240"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#grad1)"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-folder-open-icon lucide-folder-open"
                >
                  <defs>
                    <linearGradient
                      id="grad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" style={{ stopColor: "#2563EB" }} />{" "}
                      {/* blue-600 */}
                      <stop
                        offset="100%"
                        style={{ stopColor: "#9333EA" }}
                      />{" "}
                      {/* purple-600 */}
                    </linearGradient>
                  </defs>
                  <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
                </svg>
                <span className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  هنوز هیچ پروژه ای ایجاد نشده
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Modal for delete confirmation */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Backdrop with blur */}
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={cancelDelete}
              />
              {/* Modal content */}
              <motion.div
                className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg z-10"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  آیا مطمئن هستید؟
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  آیا می‌خواهید این پروژه را حذف کنید؟
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    بله
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
                  >
                    لغو
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer
          className={`bg-[#F7F7F7] ltr place-items-center ${currentProjects.length === 0 ? "" : "border-t border-gray-200 "}  self-center p-4 w-full relative z-10 transition-all duration-400 sm:pr-24 pr-4 pl-4 ${
            isSidebarOpen ? "md:pr-52" : "md:pr-28"
          }`}
        >
          <div className="flex justify-center items-center gap-4">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={goToPreviousPage}
              disabled={currentPage === 1 || currentProjects.length === 0}
              className={`flex items-center justify-center gap-2 w-24 h-10 rounded-full text-white text-sm font-medium glowing-shadow bg-gradient-to-r from-blue-500 to-purple-600 ${
                currentPage === 1 || currentProjects.length === 0
                  ? "cursor-not-allowed"
                  : "hover:bg-gray-100 transition-colors cursor-pointer"
              } ${currentProjects.length === 0 ? "hidden" : "block"} `}
            >
              <FaArrowLeftLong className="w-4 h-4" />
              <div className="py-1 text-white">قبلی</div>
            </motion.button>

            {currentProjects.length > 0 ? (
              <div className="flex items-center gap-2">
                {/* دکمه صفحه اول */}
                {currentPage > 2 && (
                  <motion.button
                    key={1}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => goToPage(1)}
                    className="flex items-center pt-1 justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition-colors glowing-shadow cursor-pointer"
                  >
                    1
                  </motion.button>
                )}

                {/* علامت ... اگه فاصله بیشتر از 1 باشه */}
                {currentPage > 3 && <span className="text-gray-700">...</span>}

                {/* صفحه قبلی (اگه وجود داشته باشه) */}
                {currentPage > 1 && (
                  <motion.button
                    key={currentPage - 1}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => goToPage(currentPage - 1)}
                    className="flex items-center pt-1 justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition-colors glowing-shadow cursor-pointer"
                  >
                    {currentPage - 1}
                  </motion.button>
                )}

                {/* صفحه فعلی */}
                <motion.button
                  key={currentPage}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => goToPage(currentPage)}
                  className="flex items-center pt-1 justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none"
                >
                  {currentPage}
                </motion.button>

                {/* صفحه بعدی (اگه وجود داشته باشه) */}
                {currentPage < totalPages && (
                  <motion.button
                    key={currentPage + 1}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => goToPage(currentPage + 1)}
                    className="flex items-center pt-1 justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition-colors glowing-shadow cursor-pointer"
                  >
                    {currentPage + 1}
                  </motion.button>
                )}

                {/* علامت ... اگه فاصله تا آخر بیشتر از 1 باشه */}
                {currentPage < totalPages - 2 && (
                  <span className="text-gray-700">...</span>
                )}

                {/* دکمه صفحه آخر */}
                {currentPage < totalPages - 1 && (
                  <motion.button
                    key={totalPages}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => goToPage(totalPages)}
                    className="flex items-center pt-1 justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition-colors glowing-shadow cursor-pointer"
                  >
                    {totalPages}
                  </motion.button>
                )}
              </div>
            ) : (
              <></>
            )}

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={goToNextPage}
              disabled={
                currentPage === totalPages || currentProjects.length === 0
              }
              className={`flex items-center justify-center gap-2 w-24 h-10 rounded-full text-white text-sm font-medium glowing-shadow bg-gradient-to-r from-blue-500 to-purple-600  ${
                currentPage === totalPages || currentProjects.length === 0
                  ? "cursor-not-allowed"
                  : "hover:bg-gray-100 transition-colors cursor-pointer"
              } ${currentProjects.length === 0 ? "hidden" : "block"} `}
            >
              <div className="py-1 text-white">بعدی</div>
              <FaArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MyProjects;
