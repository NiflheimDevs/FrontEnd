import { useState } from "react";
import { Bell, Search, Upload, User, Image, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Dashboard Navigation) */}
      <aside
        className={`fixed right-0 top-18 h-full bg-[#D4D4D4] p-5 shadow-md transition-transform ${
          isSidebarOpen ? "w-64" : "w-16"
        } duration-300 flex flex-col items-center`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 mb-4"
        >
          <Menu size={24} />
        </button>
        {isSidebarOpen && (
          <nav className="mt-5 space-y-3 w-full text-right pr-4">
            <a href="#" className="block p-2 rounded hover:bg-gray-200">
              خانه
            </a>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">
              پروفایل
            </a>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">
              تنظیمات
            </a>
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col ">
        {" "}
        {/* Adjust padding to prevent overlap */}
        {/* Header */}
        <header className="z-10 bg-white p-4 shadow flex justify-between items-center">
          <div className="flex items-center justify-between gap-4">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <div className="relative">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-1 border rounded"
              />
            </div>
          </div>
          <Bell className="text-gray-500 cursor-pointer" />
        </header>
        {/* Form Section */}
        <section className="p-6">
          <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <div className="flex items-center gap-6">
              {/* Profile Picture */}

              {/* Name Fields */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-center gap-20">
                  <label className="text-sm text-gray-600">نام</label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-2 border rounded text-right"
                  />
                </div>
                <div className="flex justify-between items-center gap-11">
                  <label className="text-sm text-gray-600">نام خانوادگی</label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-2 border rounded text-right"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <label className="w-24 h-24 border-2 border-blue-500 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-gray-200">
                  <input type="file" className="hidden" />
                  <Image className="text-gray-500" size={32} />
                </label>
                <span className="mt-2 text-sm text-gray-600">پروفایل</span>
              </div>
            </div>

            <div className="space-y-4 mt-4 ml-20">
              <div className="flex justify-between items-center gap-10">
                <label className="text-sm text-gray-600">شماره تماس</label>
                <input
                  type="text"
                  placeholder="*******0911"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-between items-center gap-13">
                <label className="text-sm text-gray-600">نام کاربری</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-between items-center gap-16">
                <label className="text-sm text-gray-600">ایمیل</label>
                <input
                  type="email"
                  placeholder=""
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-between items-center gap-12">
                <label className="text-sm text-gray-600">بیوگرافی</label>
                <textarea
                  placeholder="Biography"
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input type="file" className="hidden" id="resume-upload" />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center gap-2 p-2 border rounded cursor-pointer"
                >
                  <Upload size={18} /> Upload Resume
                </label>
              </div>
              <input
                type="text"
                placeholder="Labels (comma-separated)"
                className="w-full p-2 border rounded"
              />
              {/* <Button className="w-full bg-blue-500 text-white">Update</Button> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
