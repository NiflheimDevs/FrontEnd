import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import { Button } from "../Components/ui/button";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import avatar from "@/assets/myproject/avatars.png";
import pencil from "@/assets/myproject/PencilSquare.png";
import { MdArrowDropDown } from "react-icons/md";
import { getUserProject } from "../API"; // Adjust the import path

// Card animation variants for project cards
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
    scale: 1.05,
    rotateY: 10,
    boxShadow: "0px 0px 30px rgba(81, 137, 202, 0.8)",
    transition: { duration: 0.3 },
  },
};

// Button animation variants for pagination buttons
const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const MyProjects = () => {
  // State management for sidebar, pagination, and project data
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const projectsPerPage = 4;

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch projects from the API when the page changes
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const offset = (currentPage - 1) * projectsPerPage;
        const limit = projectsPerPage;
        const data = await getUserProject(offset, limit);
        setProjects(data);
        setTotalProjects(data.length); // Adjust if API returns total count
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [currentPage]);

  // Pagination logic
  const totalPages = Math.ceil(totalProjects / projectsPerPage) || 1;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  // Initialize particle background effect
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* Particle background effect */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#5189CA" },
            links: {
              color: "#5189CA",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: "bounce",
              random: false,
              speed: 2,
            },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Sidebar and main content */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 flex flex-col pt-20 transition-all duration-300 ${
          isSidebarOpen ? "md:pr-64" : "md:pr-24"
        } pr-4 pl-4 relative z-10`}
      >
        {/* Header section */}
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-row justify-between items-center mt-12 px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            پروژه های من
          </motion.h2>
          <Link to="/createproject">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button className="border rounded-full bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 glowing-shadow hover:from-blue-600 hover:to-purple-500">
                + ساخت پروژه
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Project cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="mt-12 mb-16 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4"
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
                className="relative bg-gradient-to-br from-[#5189CA] to-[#1E3A8A] rounded-3xl w-full md:w-[335.06px] h-[246.92px] border border-blue-500/50 flex flex-col p-6 glowing-card overflow-hidden"
              >
                {/* Removed the blurred background effect */}
                <motion.img
                  src={avatar}
                  alt="image"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="w-107px h-29px absolute top-[22.34px] left-[20px] z-10"
                />
                <div className="flex flex-col justify-center flex-grow pb-5 z-10">
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
                <Button className="bg-gradient-to-l from-[#5189CA] to-[#1E3A8A] absolute bottom-[61px] left-[20px] border w-[124px] h-[42.34px] flex items-center justify-between pr-0 glowing-shadow z-10 text-white hover:bg-gradient-to-l hover:from-[#1E3A8A] hover:to-[#5189CA]">
                  <div className="flex items-center">
                    <MdArrowDropDown className="text-white pb-1 size-7" />
                    <span className="text-white font-semibold">
                      Active Orders
                    </span>
                  </div>
                </Button>
                <motion.button
                  whileHover={{
                    scale: 1.3,
                    rotate: 180,
                    boxShadow: "0px 0px 15px rgba(255,255,255,0.5)",
                  }}
                  className="bg-transparent absolute bottom-[22px] size-[24px] left-[20px] z-10"
                >
                  <img src={pencil} alt="" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Pagination footer */}
      <footer className="bg-white ltr place-items-center border-t border-gray-200 self-center p-4 w-full relative z-10">
        <div className="flex justify-center items-center gap-4">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`flex hover:cursor-pointer items-center justify-center gap-2 w-24 h-10 rounded-full border border-gray-300 text-sm font-medium glowing-shadow ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 transition-colors"
            }`}
          >
            <FaArrowLeftLong className="w-4 h-4" />
            <div className="pt-1 text-blue-600">Previous</div>
          </motion.button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
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
          )}

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex hover:cursor-pointer items-center justify-center gap-2 w-24 h-10 rounded-full border border-gray-300 text-sm font-medium glowing-shadow ${
              currentPage === totalPages
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
