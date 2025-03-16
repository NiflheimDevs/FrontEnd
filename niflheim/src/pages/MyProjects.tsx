import React from "react";
import { useState } from "react";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const MyProjects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const projectsPerPage = 4;

  const [projects, setProjects] = useState([
    { id: 1, title: "پروژه ۱", description: "توضیحات پروژه ۱" },
    { id: 2, title: "پروژه ۲", description: "توضیحات پروژه ۲" },
    { id: 3, title: "پروژه ۳", description: "توضیحات پروژه ۳" },
    { id: 4, title: "پروژه ۴", description: "توضیحات پروژه ۴" },
    { id: 5, title: "پروژه ۵", description: "توضیحات پروژه ۵" },
    { id: 6, title: "پروژه ۶", description: "توضیحات پروژه ۶" },
    { id: 7, title: "پروژه ۷", description: "توضیحات پروژه ۷" },
    { id: 8, title: "پروژه ۸", description: "توضیحات پروژه ۸" },
    { id: 9, title: "پروژه ۹", description: "توضیحات پروژه ۹" },
    { id: 10, title: "پروژه ۱۰", description: "توضیحات پروژه ۱۰" },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

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

  const goToPage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 flex flex-col pt-16 transition-all duration-300 ${
          isSidebarOpen ? "md:pr-64" : "md:pr-24"
        } pr-4`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-row justify-between items-center mt-10 px-4">
          <h2 className="text-3xl font-bold text-gray-700">پروژه های من</h2>
          <Link to="/createproject">
            <Button className="border cursor-pointer rounded-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition-colors">
              + ساخت پروژه
            </Button>
          </Link>
        </div>

        {/* Render projects for the current page */}
        {currentProjects.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {currentProjects.map((project) => (
              <div
                key={project.id}
                className="hover:bg-gray-50 rounded-xl w-full md:w-[319.84px] h-[294px] border border-gray-300 flex flex-col items-center justify-center p-4"
              >
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="hover:bg-gray-50 rounded-xl mt-10 w-full md:w-[319.84px] h-[294px] border border-gray-300 flex items-center justify-center mx-4">
            <Link to="/createproject">
              <button className="flex flex-col cursor-pointer justify-between items-center px-4 py-2 text-blue-500">
                <label className="text-5xl" htmlFor="">
                  +
                </label>
                Create a List
              </button>
            </Link>
          </div>
        )}
      </main>
      <footer className="bg-white ltr place-items-center border-t self-center border-gray-200 p-4 w-full">
        {/* Pagination Controls Inside Footer */}
        {projects.length > projectsPerPage && (
          <div className="flex justify-center items-center gap-4">
            {/* Previous Arrow */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center justify-center gap-2 w-24 h-10 rounded-sm border border-white text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200 transition-colors hover:cursor-pointer"
              }`}
            >
              <FaArrowLeftLong className="w-4 h-4" />
              <div className="pt-1 text-blue-600">Previous</div>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  className={`flex items-center pt-1 justify-center w-10 h-10 rounded-sm border ${
                    currentPage === pageNumber
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-700 border-white hover:bg-gray-300 hover:cursor-pointer transition-colors"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            {/* Next Arrow */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center gap-2 w-24 h-10 rounded-sm border border-white text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed "
                  : "text-gray-700 hover:bg-gray-200 transition-colors hover:cursor-pointer"
              }`}
            >
              <div className="pt-1 text-blue-600">Next</div>
              <FaArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default MyProjects;
