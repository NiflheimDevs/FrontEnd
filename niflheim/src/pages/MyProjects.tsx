// import React from "react";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import Sidebar from "../Components/DashboardComp/Sidebar";
// import Header from "../Components/DashboardComp/Header";
// import { Button } from "@/components/ui/button";
// import { FaArrowLeftLong, FaArrowRight, FaStar } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";
// import avatar from "@/assets/myproject/avatars.png";
// import pencil from "@/assets/myproject/PencilSquare.png";
// import { MdArrowDropDown } from "react-icons/md";

// // Card animation variants with gamified "level-up" effect
// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.8, rotateX: 90 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     rotateX: 0,
//     transition: { type: "spring", stiffness: 120, damping: 15, duration: 0.8 },
//   },
//   exit: { opacity: 0, scale: 0.8, rotateX: -90, transition: { duration: 0.5 } },
//   hover: {
//     scale: 1.1,
//     rotateY: 15,
//     boxShadow: "0px 0px 40px rgba(255, 215, 0, 0.8)",
//     transition: { duration: 0.4 },
//   },
// };

// // Level-up animation for coins
// const coinVariants = {
//   initial: { y: 0, opacity: 0 },
//   animate: {
//     y: -50,
//     opacity: 1,
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
//   exit: { opacity: 0, y: -100, transition: { duration: 0.3 } },
// };

// // Button animation variants
// const buttonVariants = {
//   hover: { scale: 1.1, transition: { duration: 0.3 } },
//   tap: { scale: 0.95 },
// };

// const MyProjects = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();
//   const projectsPerPage = 4;

//   const [projects, setProjects] = useState([
//     { id: 1, title: "مرحله: انتخاب کارفرما", description: "سایت فروشگاهی", progress: 20, coins: 50 },
//     { id: 2, title: "مرحله: انتخاب کارفرما", description: "سایت فروشگاهی", progress: 40, coins: 75 },
//     { id: 3, title: "مرحله: انتخاب کارفرما", description: "سایت فروشگاهی", progress: 60, coins: 100 },
//     { id: 4, title: "مرحله: انتخاب کارفرما", description: "سایت فروشگاهی", progress: 80, coins: 125 },
//     { id: 5, title: "مرحله: انتخاب کارفرما", description: "سایت فروشگاهی", progress: 10, coins: 30 },
//     { id: 6, title: "مرحله: انتخاب کارفرما", description: "سایت فروشگاهی", progress: 90, coins: 150 },
//     { id: 7, title: "مرحله: انتخاب کارفرما", description: "سایت فروشگاهی", progress: 25, coins: 60 },
//     { id: 8, title: "مرحله: انتخاب کارفرما", description: "سایت فروشگاهی", progress: 50, coins: 85 },
//     { id: 9, title: "مرحله: انتخاب کارفرما", description: "سایت فروشگاهی", progress: 70, coins: 110 },
//     { id: 10, title: "مرحله: انتخاب کارفرما ۰", description: "سایت فروشگاهی ۰", progress: 95, coins: 200 },
//   ]);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   const totalPages = Math.ceil(projects.length / projectsPerPage) || 1;
//   const indexOfLastProject = currentPage * projectsPerPage;
//   const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//   const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

//   const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
//   const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
//   const goToPage = (pageNumber) => setCurrentPage(pageNumber);

//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   return (
//     <div className="min-h-screen flex flex-col relative overflow-hidden bg-gray-900">
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={{
//           background: { color: { value: "transparent" } },
//           fpsLimit: 120,
//           interactivity: {
//             events: {
//               onClick: { enable: true, mode: "push" },
//               onHover: { enable: true, mode: "repulse" },
//             },
//             modes: {
//               push: { quantity: 4 },
//               repulse: { distance: 200, duration: 0.4 },
//             },
//           },
//           particles: {
//             color: { value: "#FFD700" }, // Gold particles for a gamified feel
//             links: { color: "#FFD700", distance: 150, enable: true, opacity: 0.5, width: 1 },
//             move: { direction: "none", enable: true, outModes: "bounce", random: false, speed: 3 },
//             number: { density: { enable: true, area: 800 }, value: 80 },
//             opacity: { value: 0.6 },
//             shape: { type: "star" }, // Star-shaped particles
//             size: { value: { min: 1, max: 5 } },
//           },
//         }}
//         className="absolute inset-0 z-0"
//       />

//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <main
//         className={`flex-1 flex flex-col pt-20 transition-all duration-300 ${
//           isSidebarOpen ? "md:pr-64" : "md:pr-24"
//         } pr-4 pl-4 relative z-10`}
//       >
//         <Header toggleSidebar={toggleSidebar} />
//         <div className="flex flex-row justify-between items-center mt-12 px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="text-4xl font-bold text-yellow-400 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
//           >
//             ماموریت‌های من
//           </motion.h2>
//           <Link to="/createproject">
//             <motion.div whileHover={{ scale: 1.2, rotate: 360 }} whileTap={{ scale: 0.9 }}>
//               <Button className="border rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 glowing-shadow hover:from-orange-600 hover:to-yellow-500">
//                 + شروع ماموریت جدید
//               </Button>
//             </motion.div>
//           </Link>
//         </div>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentPage}
//             className="mt-12 mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {currentProjects.map((project, index) => (
//               <motion.div
//                 key={project.id}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 whileHover="hover"
//                 className="relative bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-3xl w-full md:w-[335.06px] h-[300px] border border-yellow-400/50 flex flex-col p-6 glowing-card overflow-hidden"
//               >
//                 {/* Floating Coin Animation */}
//                 <AnimatePresence>
//                   {Math.random() > 0.5 && (
//                     <motion.div
//                       variants={coinVariants}
//                       initial="initial"
//                       animate="animate"
//                       exit="exit"
//                       className="absolute top-4 right-4 text-yellow-300 text-lg font-bold"
//                     >
//                       +{project.coins} <FaStar className="inline-block" />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <motion.div
//                   className="absolute w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl"
//                   animate={{
//                     x: [0, 20, -20, 0],
//                     y: [0, -20, 20, 0],
//                     scale: [1, 1.2, 1],
//                   }}
//                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                 />
//                 <motion.img
//                   src={avatar}
//                   alt="image"
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: index * 0.2, duration: 0.5 }}
//                   className="w-[107px] h-[29px] absolute top-[22.34px] left-[20px] z-10"
//                 />
//                 <div className="flex flex-col justify-center flex-grow pb-5 z-10">
//                   <p className="text-white text-[13.3px] opacity-80 font-semibold tracking-wider">
//                     {project.title}
//                   </p>
//                   <p className="text-white font-bold text-[22.34px] mt-2 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
//                     {project.description}
//                   </p>
//                   {/* Progress Bar */}
//                   <div className="mt-4">
//                     <p className="text-white text-sm">پیشرفت ماموریت: {project.progress}%</p>
//                     <div className="w-full bg-gray-700 rounded-full h-2.5">
//                       <motion.div
//                         className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full"
//                         initial={{ width: 0 }}
//                         animate={{ width: `${project.progress}%` }}
//                         transition={{ duration: 1, ease: "easeInOut" }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <Button className="bg-gradient-to-l from-yellow-600 to-orange-600 absolute bottom-[61px] left-[20px] border w-[124px] h-[42.34px] flex items-center justify-between pr-0 glowing-shadow z-10 text-white hover:bg-gradient-to-l hover:from-orange-600 hover:to-yellow-600">
//                   <div className="flex items-center">
//                     <MdArrowDropDown className="text-white pb-1 size-7" />
//                     <span className="text-white font-semibold">Active Orders</span>
//                   </div>
//                 </Button>
//                 <motion.button
//                   whileHover={{
//                     scale: 1.5,
//                     rotate: 360,
//                     boxShadow: "0px 0px 20px rgba(255, 215, 0, 0.8)",
//                   }}
//                   className="bg-transparent absolute bottom-[22px] size-[24px] left-[20px] z-10"
//                 >
//                   <img src={pencil} alt="edit" />
//                 </motion.button>
//               </motion.div>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       </main>
//       <footer className="bg-gray-900 border-t border-yellow-500/50 self-center p-4 w-full relative z-10">
//         <div className="flex justify-center items-center gap-4">
//           <motion.button
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             onClick={goToPreviousPage}
//             disabled={currentPage === 1}
//             className={`flex items-center justify-center gap-2 w-24 h-10 rounded-full border border-yellow-400 text-sm font-medium glowing-shadow ${
//               currentPage === 1
//                 ? "text-gray-500 cursor-not-allowed"
//                 : "text-yellow-400 hover:bg-yellow-500/20 transition-colors"
//             }`}
//           >
//             <FaArrowLeftLong className="w-4 h-4" />
//             <div className="pt-1 text-yellow-400">Previous</div>
//           </motion.button>

//           {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
//             <motion.button
//               key={pageNumber}
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               onClick={() => goToPage(pageNumber)}
//               className={`flex items-center pt-1 justify-center w-10 h-10 rounded-full border ${
//                 currentPage === pageNumber
//                   ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-none"
//                   : "text-yellow-400 border-yellow-400 hover:bg-yellow-500/20 transition-colors glowing-shadow"
//               }`}
//             >
//               {pageNumber}
//             </motion.button>
//           ))}

//           <motion.button
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             onClick={goToNextPage}
//             disabled={currentPage === totalPages}
//             className={`flex items-center justify-center gap-2 w-24 h-10 rounded-full border border-yellow-400 text-sm font-medium glowing-shadow ${
//               currentPage === totalPages
//                 ? "text-gray-500 cursor-not-allowed"
//                 : "text-yellow-400 hover:bg-yellow-500/20 transition-colors"
//             }`}
//           >
//             <div className="pt-1 text-yellow-400">Next</div>
//             <FaArrowRight className="w-4 h-4" />
//           </motion.button>
//         </div>
//       </footer>
//     </div>
//   );
// };

// // Updated CSS styles
// const additionalStyles = `
//   .glowing-shadow {
//     box-shadow: 0px 0px 15px rgba(255, 215, 0, 0.5);
//     transition: all 0.3s ease;
//   }
//   .glowing-shadow:hover {
//     box-shadow: 0px 0px 25px rgba(255, 215, 0, 0.8);
//   }
//   .glowing-card {
//     background: linear-gradient(135deg, rgba(255, 215, 0, 0.8), rgba(255, 69, 0, 0.8));
//     backdrop-filter: blur(10px);
//     border: 1px solid rgba(255, 215, 0, 0.3);
//   }
// `;

// export default MyProjects;

import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import { Button } from "@/components/ui/button";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import avatar from "@/assets/myproject/avatars.png";
import pencil from "@/assets/myproject/PencilSquare.png";
import { MdArrowDropDown } from "react-icons/md";

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
    scale: 1.05,
    rotateY: 10,
    boxShadow: "0px 0px 30px rgba(81, 137, 202, 0.8)",
    transition: { duration: 0.3 },
  },
};

// Button animation variants (simplified for Active Orders)
const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } }, // Removed rotate to prevent bugs
  tap: { scale: 0.95 },
};

const MyProjects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const projectsPerPage = 4;

  const [projects, setProjects] = useState([
    { id: 1, title: "مرحله : انتخاب کارفرما ", description: "سایت فروشگاهی " },
    { id: 2, title: "مرحله : انتخاب کارفرما ", description: "سایت فروشگاهی " },
    { id: 3, title: "مرحله : انتخاب کارفرما ", description: "سایت فروشگاهی " },
    { id: 4, title: "مرحله : انتخاب کارفرما ", description: "سایت فروشگاهی " },
    { id: 5, title: "مرحله : انتخاب کارفرما ", description: "سایت فروشگاهی " },
    { id: 6, title: "مرحله : انتخاب کارفرما ", description: "سایت فروشگاهی " },
    { id: 7, title: "مرحله : انتخاب کارفرما ", description: "سایت فروشگاهی " },
    { id: 8, title: "مرحله : انتخاب کارفرما ", description: "سایت فروشگاهی " },
    { id: 9, title: "مرحله : انتخاب کارفرما ", description: "سایت فروشگاهی " },
    {
      id: 10,
      title: "مرحله : انتخاب کارفرما ۰",
      description: "سایت فروشگاهی ۰",
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const totalPages = Math.ceil(projects.length / projectsPerPage) || 1;
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

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
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
        className="absolute inset-0 z-0 pointer-events-none" // Added pointer-events-none
      />

      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 flex flex-col pt-20 transition-all duration-300 ${
          isSidebarOpen ? "md:pr-64" : "md:pr-24"
        } pr-4 pl-4 relative z-10`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-row justify-between items-center mt-12 px-4">
          {" "}
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
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

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="mt-12 mb-16 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                className="relative bg-gradient-to-br from-[#5189CA] to-[#1E3A8A] rounded-3xl w-full md:w-[335.06px] h-[246.92px] border border-blue-500/50 flex flex-col p-6 glowing-card overflow-hidden"
              >
                <motion.div
                  className="absolute w-40 h-40 bg-blue-400/30 rounded-full blur-3xl"
                  animate={{
                    x: [0, 20, -20, 0],
                    y: [0, -20, 20, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
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
                    {project.title}
                  </p>
                  <p className="text-white font-bold text-[22.34px] mt-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {project.description}
                  </p>
                </div>
                {/* <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                > */}
                <Button className="bg-gradient-to-l from-[#5189CA] to-[#1E3A8A] absolute bottom-[61px] left-[20px] border w-[124px] h-[42.34px] flex items-center justify-between pr-0 glowing-shadow z-10 text-white hover:bg-gradient-to-l hover:from-[#1E3A8A] hover:to-[#5189CA]">
                  <div className="flex items-center">
                    <MdArrowDropDown className="text-white pb-1 size-7" />
                    <span className="text-white font-semibold">
                      Active Orders
                    </span>
                  </div>
                </Button>
                {/* </motion.div> */}
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

// CSS styles
const additionalStyles = `
  .glowing-shadow {
    box-shadow: 0px 0px 15px rgba(81, 137, 202, 0.5);
    transition: all 0.3s ease;
  }
  .glowing-shadow:hover {
    box-shadow: 0px 0px 25px rgba(81, 137, 202, 0.8);
  }
  .glowing-card {
    background: linear-gradient(135deg, rgba(81, 137, 202, 0.8), rgba(30, 58, 138, 0.8));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export default MyProjects;
