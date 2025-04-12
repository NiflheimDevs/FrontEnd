// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Sidebar from "../Components/DashboardComp/Sidebar";
// import Header from "../Components/DashboardComp/Header";
// import { Search } from "lucide-react";
// import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";
// import walletPic from "@/assets/dashboard/wallet.svg";
// import LadyPic from "/src/assets/Changepass.svg";

// // Sample data for previews (simplified for display)
// const chatList = [
//   { id: 1, name: "ادمین", lastMessage: "سلام، چطور می‌توانم به شما کمک کنم؟" },
// ];

// const transactions = [
//   {
//     id: 1,
//     date: "2023-10-01",
//     activity: "واریز",
//     description: "پروژه‌ی سایت",
//     amount: 5000,
//   },
// ];

// const profileData = {
//   firstName: "نام",
//   lastName: "خانوادگی",
//   email: "example@gmail.com",
//   skills: ["React", "Python"],
// };

// // Animation variants
// const cardVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.2,
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   }),
//   hover: {
//     scale: 1.03, // Reduced scale to prevent overlap
//     y: -5, // Slight lift effect
//     boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
//     transition: {
//       duration: 0.3,
//       ease: "easeInOut",
//     },
//   },
// };

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div
//       className="flex h-screen w-full bg-gradient-to-br from-[#1a2a44] to-[#0d1a2b]"
//       dir="rtl"
//     >
//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <main className="flex-1 flex flex-col pt-16 pr-4 md:pr-24">
//         <Header toggleSidebar={toggleSidebar} />
//         <div className="mt-8 px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl font-bold mb-10 text-center text-white drop-shadow-lg"
//           >
//             داشبورد
//           </motion.h2>
//           {/* Grid of Previews */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {/* Messages Preview */}
//             <motion.div
//               custom={0}
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               className="relative z-10" // Ensure z-index for hover isolation
//             >
//               <Link to="/chat" className="block">
//                 <div className="bg-gradient-to-br from-[#71C2F4] to-[#3444c2] rounded-2xl p-5 shadow-lg border border-white/10">
//                   <h3 className="text-xl font-bold mb-4 text-white flex items-center">
//                     <span className="mr-2">📩 </span> پیام‌ها
//                   </h3>
//                   <div className="flex flex-col">
//                     <div className="w-full bg-white/20 p-2 rounded-lg">
//                       <div className="relative mb-2">
//                         <input
//                           type="text"
//                           placeholder="جستجو"
//                           className="border border-white/30 py-1 pr-8 pl-2 rounded-lg w-full text-right bg-white/10 placeholder-white text-sm text-white"
//                           disabled
//                         />
//                         <Search
//                           size={14}
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
//                         />
//                       </div>
//                       {chatList.slice(0, 1).map((chat) => (
//                         <div
//                           key={chat.id}
//                           className="flex items-center border-b border-white/30 p-2 justify-end rounded-md"
//                         >
//                           <div className="flex-1 text-right">
//                             <p className="text-sm font-medium text-white">
//                               {chat.name}
//                             </p>
//                             <p className="text-xs text-white/80">
//                               {chat.lastMessage}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex flex-col mt-2 bg-white/10 p-2 rounded-lg">
//                       <div className="flex w-full h-8 border border-white/30 items-center bg-white/20 rounded-t-lg p-2">
//                         <img
//                           src={ProfileDefault}
//                           alt="Profile"
//                           className="w-5 h-5 rounded-full ml-2"
//                         />
//                         <h4 className="text-sm font-semibold text-white">
//                           {chatList[0].name}
//                         </h4>
//                       </div>
//                       <div className="flex-1 p-2 bg-[#1a2a44] rounded-b-lg">
//                         <div className="max-w-[70%] mb-2 p-2 rounded-xl text-xs bg-gray-200 text-gray-800 ml-auto rounded-tr-none">
//                           سلام! چطور می‌توانم به شما کمک کنم؟
//                         </div>
//                         <div className="max-w-[70%] p-2 rounded-xl text-xs bg-blue-600 text-white mr-auto rounded-tl-none">
//                           نیاز به کمک در پروژه‌ام دارم
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>

//             {/* Profile Preview */}
//             <motion.div
//               custom={1}
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               className="relative z-10"
//             >
//               <Link to="/profile" className="block">
//                 <div className="bg-[#4CAF50] rounded-2xl p-5 shadow-lg border border-white/10">
//                   <h3 className="text-xl font-bold mb-4 text-white flex items-center">
//                     <span className="mr-2">👤</span> پروفایل
//                   </h3>
//                   <div className="flex flex-col items-center">
//                     <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/20">
//                       <span className="text-white text-xs">پروفایل</span>
//                     </div>
//                     <div className="mt-2 text-center">
//                       <p className="text-sm font-semibold text-white">
//                         {profileData.firstName} {profileData.lastName}
//                       </p>
//                       <p className="text-xs text-white/80">
//                         {profileData.email}
//                       </p>
//                     </div>
//                     <div className="mt-4 w-full">
//                       <h4 className="text-sm font-semibold text-white/80 text-right">
//                         مهارت‌ها
//                       </h4>
//                       <div className="flex flex-wrap gap-2 mt-2 justify-end">
//                         {profileData.skills.map((skill) => (
//                           <span
//                             key={skill}
//                             className="bg-white/30 text-white text-xs px-4 py-1 rounded-full"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>

//             {/* Wallet Preview */}
//             <motion.div
//               custom={2}
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               className="relative z-10"
//             >
//               <Link to="/wallet" className="block">
//                 <div className="bg-gradient-to-br from-[#FF5733] to-[#C41E3A] rounded-2xl p-5 shadow-lg border border-white/10">
//                   <h3 className="text-xl font-bold mb-4 text-white flex items-center">
//                     <span className="mr-2">💰</span> کیف پول
//                   </h3>
//                   <div className="text-center mb-3">
//                     <p className="text-2xl font-bold text-white">0</p>
//                     <p className="text-xs text-white/80">ریال</p>
//                   </div>
//                   <table className="w-full text-center text-xs text-white">
//                     <thead>
//                       <tr className="border-b border-white/30">
//                         <th className="text-sm font-semibold py-1">تاریخ</th>
//                         <th className="text-sm font-semibold py-1">فعالیت</th>
//                         <th className="text-sm font-semibold py-1">مقدار</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {transactions.slice(0, 1).map((transaction) => (
//                         <tr
//                           key={transaction.id}
//                           className="border-b border-white/30"
//                         >
//                           <td className="py-1">{transaction.date}</td>
//                           <td className="py-1">{transaction.activity}</td>
//                           <td className="py-1">{transaction.amount}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <div className="flex justify-center mt-4">
//                     <img
//                       src={walletPic}
//                       alt="Illustration"
//                       className="w-12 h-12"
//                     />
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>

//             {/* Change Password Preview */}
//             <motion.div
//               custom={3}
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               className="relative z-10"
//             >
//               <Link to="/changepass" className="block">
//                 <div className="bg-gradient-to-br from-[#FFCA28] to-[#F57C00] rounded-2xl p-5 shadow-lg border border-white/10">
//                   <h3 className="text-xl font-bold mb-4 text-white flex items-center">
//                     <span className="mr-2">🔒</span> تغییر رمز
//                   </h3>
//                   <div className="flex flex-col items-center">
//                     <div className="text-center mb-3">
//                       <p className="text-sm font-semibold text-white">
//                         رمز جدیدت رو وارد کن
//                       </p>
//                       <div className="w-1/2 h-0.5 bg-white/50 mx-auto mt-1"></div>
//                     </div>
//                     <div className="w-full space-y-2">
//                       <input
//                         type="password"
//                         placeholder="رمز عبور قدیمی"
//                         className="w-full bg-white/20 py-1 px-3 rounded-lg text-right text-xs placeholder-white text-white border border-white/30"
//                         disabled
//                       />
//                       <input
//                         type="password"
//                         placeholder="رمز عبور"
//                         className="w-full bg-white/20 py-1 px-3 rounded-lg text-right text-xs placeholder-white text-white border border-white/30"
//                         disabled
//                       />
//                       <input
//                         type="password"
//                         placeholder="تکرار رمز عبور"
//                         className="w-full bg-white/20 py-1 px-3 rounded-lg text-right text-xs placeholder-white text-white border border-white/30"
//                         disabled
//                       />
//                     </div>
//                     <div className="flex justify-center mt-4">
//                       <img
//                         src={LadyPic}
//                         alt="Illustration"
//                         className="w-12 h-12"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import { Search } from "lucide-react";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";
import walletPic from "@/assets/dashboard/wallet.svg";
import LadyPic from "/src/assets/Changepass.svg";

// Sample data for previews (simplified for display)
const chatList = [
  { id: 1, name: "ادمین", lastMessage: "سلام، چطور می‌توانم به شما کمک کنم؟" },
];

const transactions = [
  {
    id: 1,
    date: "2023-10-01",
    activity: "واریز",
    description: "پروژه‌ی سایت",
    amount: 5000,
  },
  {
    id: 2,
    date: "2023-10-02",
    activity: "برداشت",
    description: "پروژه‌ی سایت",
    amount: 10000,
  },
];

const profileData = {
  firstName: "نام",
  lastName: "نام خانوادگی",
  email: "example@gmail.com",
  skills: ["React", "Python"],
  workExperiences: [
    {
      companyName: "گوگل",
      jobTitle: "برنامه‌نویس",
      startDate: "1400/01/01",
      endDate: "1402/01/01",
      isOngoing: false,
      skills: ["React", "JavaScript", "Node.js", "CSS"],
    },
  ],
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i:any) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
    <div className="flex h-screen w-full bg-[#F7F7F7]" dir="rtl">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col pt-16 w-full md:pr-24 sm:pr-24 pr-0">
        <Header toggleSidebar={toggleSidebar} />
        <div className="mt-8 pb-3 px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-10 text-center text-gray-800"
          >
            داشبورد
          </motion.h2>
          {/* Grid of Previews */}
          <div className="flex flex-wrap justify-center sm:gap-6 md:gap-16">
            {/* Messages Preview */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 w-[490px] md:scale-100 scale-90 transition-transform duration-400 ease-out md:hover:scale-105 hover:scale-95 cursor-pointer overflow-hidden"
            >
              <Link to="/chat" className="block">
                <div className="bg-[#F7F7F7] rounded-lg">
                  {/* Monitor Screen */}
                  <div className="bg-gray-800 rounded-lg p-3 border-b-4 border-gray-900">
                    <div className="bg-gradient-to-br from-[#71C2F4] to-[#3444c2] rounded-md p-4 overflow-hidden">
                      <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                        <span className="mr-2">📩</span> پیام‌ها
                      </h3>
                      <div className="flex flex-col">
                        <div className="w-full p-2 rounded-sm">
                          <div className="relative mb-2 md:flex sm:flex hidden">
                            <input
                              type="text"
                              placeholder="جستجو"
                              className="border border-gray-500 py-1 pr-8 pl-2 rounded-sm w-full text-right bg-[#D9D9D9]/20 placeholder-black text-sm"
                              disabled
                            />
                            <Search
                              size={14}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            />
                          </div>
                          {chatList.slice(0, 1).map((chat) => (
                            <div
                              key={chat.id}
                              className="flex items-center border-none bg-white/30 p-2 justify-end rounded-sm"
                            >
                              <div className="flex-1 text-right">
                                <p className="text-sm font-medium text-gray-800">
                                  {chat.name}
                                </p>
                                <p className="text-xs text-gray-600">{chat.lastMessage}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col bg-transparent p-2 rounded-sm">
                          <div className="flex w-full h-8 border-none items-center bg-white/50 rounded-t-sm p-2">
                            <img
                              src={ProfileDefault}
                              alt="Profile"
                              className="w-5 h-5 rounded-full ml-2"
                            />
                            <h4 className="text-sm font-semibold text-gray-800">
                              {chatList[0].name}
                            </h4>
                          </div>
                          <div className="flex-1 p-2 bg-[#1a2a44] rounded-b-sm">
                            <div className="max-w-[70%] mb-2 p-2 rounded-lg text-xs bg-gray-200 text-gray-800 ml-auto rounded-tr-none">
                              سلام! چطور می‌توانم به شما کمک کنم؟
                            </div>
                            <div className="max-w-[70%] p-2 rounded-lg text-xs bg-blue-600 text-white mr-auto rounded-tl-none">
                              نیاز به کمک در پروژه‌ام دارم
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-gray-700"></div>
                    <div className="w-32 h-4 bg-gray-800 rounded-md shadow-md"></div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Profile Preview */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 w-[490px] md:scale-100 scale-90 transition-transform duration-400 ease-out md:hover:scale-105 hover:scale-95 cursor-pointer overflow-hidden"
            >
              <Link to="/profile" className="block">
                <div className="bg-[#F7F7F7] rounded-lg">
                  {/* Monitor Screen */}
                  <div className="bg-gray-800 rounded-lg p-3 border-b-4 border-gray-900">
                    <div className="bg-white rounded-md p-4 overflow-hidden">
                      <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                        <span className="mr-2">👤</span> پروفایل
                      </h3>
                      <div className="flex flex-col items-center space-y-2">
                        {/* Profile Picture and Basic Info */}
                        <div className="w-12 h-12 border-2 border-blue-500 rounded-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-500 text-xs">پروفایل</span>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-gray-800">
                            {profileData.firstName} {profileData.lastName}
                          </p>
                          <p className="text-xs text-gray-600">{profileData.email}</p>
                        </div>
                        {/* Skills */}
                        <div className="w-full px-1">
                          <h4 className="text-sm font-semibold text-gray-600 text-right">
                            مهارت‌ها
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-2 justify-end">
                            {profileData.skills.map((skill) => (
                              <span
                                key={skill}
                                className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* Work History (Compact Version) */}
                        <div className="w-full md:flex sm:flex flex-col hidden">
                          <h4 className="text-sm px-1 font-semibold text-gray-600 text-right mb-2">
                            سابقه کاری
                          </h4>
                          {profileData.workExperiences.length > 0 ? (
                            profileData.workExperiences.slice(0, 1).map((exp, index) => (
                              <div
                                key={index}
                                className="bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200 text-right"
                              >
                                <p className="text-sm font-medium text-gray-800">{exp.companyName}</p>
                                <div className="flex items-center justify-between mt-1 gap-2">
                                  <p className="text-xs text-gray-600 flex-shrink-0">{exp.jobTitle}</p>
                                  <div className="flex flex-wrap gap-2 justify-end">
                                    {exp.skills.slice(0, 3).map((skill) => (
                                      <span
                                        key={skill}
                                        className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-gray-400 text-right">سابقه کاری ثبت نشده</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Monitor Stand */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-gray-700"></div>
                    <div className="w-32 h-4 bg-gray-800 rounded-md shadow-md"></div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Wallet Preview */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 w-[490px] md:scale-100 scale-90 transition-transform duration-400 ease-out md:hover:scale-105 hover:scale-95 cursor-pointer overflow-hidden"
            >
              <Link to="/wallet" className="block">
                <div className="bg-[#F7F7F7] rounded-lg">
                  {/* Monitor Screen */}
                  <div className="bg-gray-800 rounded-lg p-3 border-b-4 border-gray-900">
                    <div className="bg-white rounded-md p-4 overflow-hidden">
                      <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                        <span className="mr-2">💰</span> کیف پول
                      </h3>
                      <div className="text-center mb-3">
                        <p className="text-xl font-bold text-gray-800">0</p>
                        <p className="text-xs text-gray-600">ریال</p>
                      </div>
                      <table className="w-full text-center text-xs text-gray-800">
                        <thead>
                          <tr className="border-b">
                            <th className="text-sm font-semibold py-1">
                              تاریخ
                            </th>
                            <th className="text-sm font-semibold py-1">
                              فعالیت
                            </th>
                            <th className="text-sm font-semibold py-1">
                              مقدار
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.slice(0, 2).map((transaction) => (
                            <tr key={transaction.id} className="border-b">
                              <td className="py-1">{transaction.date}</td>
                              <td className="py-1">{transaction.activity}</td>
                              <td className="py-1">{transaction.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-center mt-4">
                        <img
                          src={walletPic}
                          alt="Illustration"
                          className="w-12 h-12"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-gray-700"></div>
                    <div className="w-32 h-4 bg-gray-800 rounded-md shadow-md"></div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Change Password Preview */}
            <motion.div
              custom={3}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 w-[490px] md:scale-100 scale-90 transition-transform duration-400 ease-out md:hover:scale-105 hover:scale-95 cursor-pointer overflow-hidden"
            >
              <Link to="/changepass" className="block">
                <div className="bg-[#F7F7F7] rounded-lg">
                  {/* Monitor Screen */}
                  <div className="bg-gray-800 rounded-lg p-3 border-b-4 border-gray-900">
                    <div className="bg-gradient-to-br from-[#71C2F4] to-[#3444c2] rounded-md p-4 overflow-hidden">
                      <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                        <span className="mr-2">🔒</span> تغییر رمز
                      </h3>
                      <div className="flex flex-col items-center">
                        <div className="text-center mb-3">
                          <p className="text-sm font-semibold text-[#D9D9D9]">
                            رمز جدیدت رو وارد کن
                          </p>
                          <div className="w-1/2 h-0.5 bg-blue-400 mx-auto mt-1"></div>
                        </div>
                        <div className="w-full space-y-2">
                          <input
                            type="password"
                            placeholder="رمز عبور قدیمی"
                            className="w-full bg-[#E5E5E5] py-1 px-3 rounded-md text-right text-xs placeholder-black"
                            disabled
                          />
                          <input
                            type="password"
                            placeholder="رمز عبور"
                            className="w-full bg-[#E5E5E5] py-1 px-3 rounded-md text-right text-xs placeholder-black"
                            disabled
                          />
                          <input
                            type="password"
                            placeholder="تکرار رمز عبور"
                            className="w-full bg-[#E5E5E5] py-1 px-3 rounded-md text-right text-xs placeholder-black"
                            disabled
                          />
                        </div>
                        <div className="flex justify-center mt-4">
                          <img
                            src={LadyPic}
                            alt="Illustration"
                            className="w-12 h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-gray-700"></div>
                    <div className="w-32 h-4 bg-gray-800 rounded-md shadow-md"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default Dashboard;
