import { useState } from "react";
import { Bell, Search, Upload, User, Image, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
import LOGO from "@/assets/BIDLANCERLOGO.svg";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Dashboard Navigation) */}
      <aside
        className={`fixed top-16 right-0 h-full bg-[#D4D4D4] p-5 shadow-md transition-transform ${
          isSidebarOpen ? "w-64" : "w-16"
        } duration-300 flex flex-col items-center z-50`}
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
      <main className="flex-1 flex flex-col pt-16 pr-64 bg-[#F7F7F7]">
        {" "}
        {/* Adjust padding */}
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white p-4 shadow flex justify-between items-center">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="">بیدلنسر</label>
            <img src={LOGO} alt="Logo" className="h-12 w-12" />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-1 border rounded"
            />
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <Bell className="text-gray-500 cursor-pointer" />
        </header>
        {/* Form Section */}
        <section className="p-6">
          <div className="relative">

          <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
          <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
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
                  placeholder="*********091"
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
                  placeholder=""
                  className="w-full p-2 border rounded resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 place-self-end">
                <input type="file" className="hidden" id="resume-upload" />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center gap-2 p-2 border rounded cursor-pointer"
                >
                  <Upload size={18} /> Upload Resume
                </label>
              </div>

              <div className="flex justify-between items-center gap-10">
                <label className="text-sm text-gray-600">برچسب‌ها</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* <Button className="w-full bg-blue-500 text-white">Update</Button> */}
            </div>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
}
