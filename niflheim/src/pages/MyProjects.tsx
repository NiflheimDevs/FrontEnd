import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import { Button } from "../Components/ui/button";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import avatar from "@/assets/myproject/avatars.png";
import pencil from "@/assets/myproject/PencilSquare.png";
import { getUserProject } from "../API";

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
    scale: 1.03,
    boxShadow: "0px 0px 20px rgba(81, 137, 202, 0.6)",
    transition: { duration: 0.3 },
  },
};

// Pagination button variants
const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const MyProjects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const projectsPerPage = 4;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const offset = (currentPage - 1) * projectsPerPage;
        const data = await getUserProject(offset, projectsPerPage);
        const projectData = Array.isArray(data) ? data : [];
        setProjects(projectData);
        setTotalProjects(projectData.length); // Update if API provides total count
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
        setTotalProjects(0);
      }
    };

    fetchProjects();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProjects / projectsPerPage) || 1;
  const currentProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 flex flex-col pt-20 transition-all duration-300 sm:pr-24 pr-4 pl-4 relative z-10 ${
          isSidebarOpen ? "md:pr-52" : "md:pr-28"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-row justify-between items-center mt-8 px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            پروژه های من
          </motion.h2>
          <Link to="/createproject">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="border rounded-full bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 glowing-shadow hover:from-blue-600 hover:to-purple-500">
                + ساخت پروژه
              </Button>
            </motion.div>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {currentProjects.length > 0 ? (
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
                  key={project.project_id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  className="relative bg-gradient-to-br from-[#5189CA] to-[#1E3A8A] rounded-3xl w-full min-w-[250px] max-w-[335.06px] h-[246.92px] border border-blue-500/50 flex flex-col p-6 glowing-card overflow-hidden mx-auto"
                >
                  <motion.img
                    src={avatar}
                    alt="image"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="w-[107px] h-[29px] absolute top-[22.34px] left-[20px] z-10"
                  />
                  <div className="flex flex-col justify-between flex-grow z-10">
                    <div>
                      <p className="text-white text-[13.3px] opacity-70 font-semibold tracking-wider">
                        مرحله: انتخاب کارفرما
                      </p>
                      <p className="font-bold text-[22.34px] mt-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        {project.title}
                      </p>
                      <p className="text-white text-[13.3px] mt-1">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag.ID}
                          className="bg-white/30 text-white text-xs px-3 py-1 rounded-full glowing-shadow"
                        >
                          {tag.Name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{
                      scale: 1.3,
                      rotate: 180,
                      boxShadow: "0px 0px 15px rgba(255,255,255,0.5)",
                    }}
                    className="bg-transparent absolute bottom-[22px] size-[24px] left-[20px] z-10"
                  >
                    <img src={pencil} alt="Edit" />
                  </motion.button>
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
              className="mt-10 flex justify-center w-full"
            >
              <Link
                to="/createproject"
                className="md:absolute md:right-24 cursor-pointer w-full max-w-[320px] h-[294px] border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center"
              >
                <button className="flex cursor-pointer flex-col items-center px-4 py-2 text-blue-500">
                  <span className="text-5xl">+</span>
                  ایجاد لیست
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white ltr place-items-center border-t border-gray-200 self-center p-4 w-full relative z-10">
        <div className="flex justify-center items-center gap-4">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={goToPreviousPage}
            disabled={currentPage === 1 || currentProjects.length === 0}
            className={`flex hover:cursor-pointer items-center justify-center gap-2 w-24 h-10 rounded-full border border-gray-300 text-sm font-medium glowing-shadow ${
              currentPage === 1 || currentProjects.length === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 transition-colors"
            }`}
          >
            <FaArrowLeftLong className="w-4 h-4" />
            <div className="pt-1 text-blue-600">Previous</div>
          </motion.button>

          {currentProjects.length > 0 ? (
            Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <motion.button
                  key={pageNumber}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => goToPage(pageNumber)}
                  className={`flex items-center pt-1 justify-center w-10 h-10 rounded-full border ${
                    currentPage === pageNumber
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none"
                      : "text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors glowing-shadow"
                  }`}
                >
                  {pageNumber}
                </motion.button>
              )
            )
          ) : (
            <motion.button
              variants={buttonVariants}
              className="flex items-center pt-1 justify-center w-10 h-10 rounded-full border text-gray-700 border-gray-300 cursor-not-allowed"
              disabled
            >
              0
            </motion.button>
          )}

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={goToNextPage}
            disabled={currentPage === totalPages || currentProjects.length === 0}
            className={`flex hover:cursor-pointer items-center justify-center gap-2 w-24 h-10 rounded-full border border-gray-300 text-sm font-medium glowing-shadow ${
              currentPage === totalPages || currentProjects.length === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 transition-colors"
            }`}
          >
            <div className="pt-1 text-blue-600">Next</div>
            <FaArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default MyProjects;