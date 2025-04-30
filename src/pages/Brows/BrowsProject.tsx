import { Search } from "lucide-react";
import React from "react";

const BrowseProject: React.FC = () => {
  const projects = [
    {
      title: "توسعه فرانت‌اند و بک‌اند یک پلتفرم وب (بر اساس UI/UX آماده)",
      description:
        "داریوش روانیم کردییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییی",
      timeLeft: "14 روز و 23 ساعت",
      views: 42,
      tags: ["SEO", "Photoshop", "Freelancing", "eCommerce", "Social Media"],
    },
    {
      title: "توسعه فرانت‌اند و بک‌اند یک پلتفرم وب (بر اساس UI/UX آماده)",
      description:
        "چرا کارییییییییییییییییییییییییی نمیکنی عرفاااااااااااااان",
      timeLeft: "14 روز و 23 ساعت",
      views: 42,
      tags: ["SEO", "Photoshop", "Freelancing", "eCommerce", "Social Media"],
    },
  ];

  return (
    <div className="flex flex-col w-full py-6 px-4 font-vazirmatn">
      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <div className="flex w-[70%]">
          <button className="bg-blue-600 text-white px-4 rounded-r flex items-center justify-center">
            <Search size={20} />
          </button>
          <input
            type="text"
            placeholder="جستجو"
            className="border border-blue-600 rounded-l py-2 pr-3 w-full text-right"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-10 mb-6">
        <button className="bg-gray-200 px-6 py-2 rounded text-sm">
          دسته بندی
        </button>
        <button className="bg-gray-200 px-6 py-2 rounded text-sm">
          مهارت ها
        </button>
        <button className="bg-gray-200 px-6 py-2 rounded text-sm">
          نوع مرتب سازی
        </button>
      </div>

      {/* Project Cards */}
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 text-right"
          >
            <h2 className="text-blue-600 font-bold text-md">{project.title}</h2>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-col mt-3 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{project.timeLeft} زمان باقی‌مانده</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 6h18M3 14h18M3 18h18"
                  />
                </svg>
                <span>{project.views} پیشنهاد</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-white border border-[#3E79DE] text-[#3E79DE] text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button className="text-blue-600 text-sm hover:underline">
                ارسال پیشنهاد
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseProject;
