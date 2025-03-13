import { useDispatch, useSelector } from "react-redux";
import { Image, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateProfileField, setProfile } from "../../store/slices/profileSlice"; 
import axios from "axios";
import { RootState } from "../../store/store";
import { useState } from "react";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const skills = [
    "Django", "React", "Golang", "C#", "C++", "Python", "Java", "Node.js",
    "TypeScript", "Flutter", "Swift", "Kotlin", "PHP", "Ruby on Rails", "Vue.js",
  ];

  const handleInputChange = (field: keyof ProfileState, value: any) => {
    dispatch(updateProfileField({ field, value }));
  };

  // Handle file input changes (profile picture and resume)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "profilePicture" | "resume") => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === "profilePicture" && !file.type.startsWith("image/")) {
        setError("پروفایل باید یک تصویر باشد");
        return;
      }
      dispatch(updateProfileField({ field, value: file }));
      setError(null);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("firstName", profile.firstName);
    formData.append("lastName", profile.lastName);
    formData.append("phoneNumber", profile.phoneNumber);
    formData.append("username", profile.username);
    formData.append("email", profile.email);
    formData.append("bio", profile.bio);
    formData.append("skills", JSON.stringify(profile.skills));
    if (profile.profilePicture) formData.append("profilePicture", profile.profilePicture);
    if (profile.resume) formData.append("resume", profile.resume);

    try {
      const response = await axios.post("https://103.75.196.227:8080", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Profile updated successfully:", response.data);
      // Optionally update Redux state with backend response
      dispatch(setProfile(response.data));
    } catch (err) {
      setError("خطایی در ارسال اطلاعات رخ داد. لطفاً دوباره تلاش کنید.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">حساب کاربری</h2>
      <div className="bg-white pt-10 pr-4 pl-4 pb-7 md:pt-14 md:pr-25 md:pl-25 rounded shadow-md max-w-4xl mx-auto relative">
        <div className="border-t border-gray-300 w-full mb-4"></div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-col gap-4 flex-1 w-full">
            <div className="flex flex-col md:flex-row justify-start items-center gap-4">
              <label className="font-semibold text-base text-gray-600 w-24">نام</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="flex-1 p-2 border-2 rounded text-right"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-start items-center gap-4">
              <label className="font-semibold text-base text-gray-600 w-24">نام خانوادگی</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="flex-1 p-2 border-2 rounded text-right"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label className="w-36 h-36 border-2 border-blue-500 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-gray-200">
              <input
                type="file"
                accept="image/*" // Restrict to images only
                onChange={(e) => handleFileChange(e, "profilePicture")}
                className="hidden"
              />
              {profile.profilePicture ? (
                <img
                  src={URL.createObjectURL(profile.profilePicture)}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image className="text-gray-500" size={36} />
              )}
            </label>
            <span className="mt-2 font-semibold text-base text-gray-600">پروفایل</span>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row justify-start items-center gap-4">
            <label className="font-semibold text-base text-gray-600 w-24">شماره تماس</label>
            <input
              type="text"
              value={profile.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="*********091"
              className="flex-1 p-2 border-2 rounded text-right"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-start items-center gap-4">
            <label className="font-semibold text-base text-gray-600 w-24">نام کاربری</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="flex-1 p-2 border-2 rounded text-right"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-start items-center gap-4">
            <label className="font-semibold text-base text-gray-600 w-24">ایمیل</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="example@gmail.com"
              className="flex-1 p-2 border-2 rounded text-right"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-start items-center gap-4">
            <label className="font-semibold text-base text-gray-600 w-24">بیوگرافی</label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="flex-1 p-2 border-2 rounded resize-none h-24 text-right"
            />
          </div>
          <div className="flex items-center gap-2 md:place-self-end place-self-center">
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "resume")}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="flex items-center gap-2 p-2 border-2 rounded cursor-pointer text-gray-600"
            >
              <Upload size={18} />
              آپلود رزومه
            </label>
          </div>
          <div className="flex flex-col md:flex-row justify-start items-center gap-4 mb-15">
            <label className="font-semibold text-base text-gray-600 w-24">برچسب‌ها</label>
            <select
              multiple
              value={profile.skills}
              onChange={(e) =>
                handleInputChange(
                  "skills",
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="flex-1 p-2 border-2 rounded text-right h-32"
            >
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="absolute bottom-4 left-4">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {loading ? "در حال ارسال..." : "به‌روزرسانی"}
          </Button>
        </div>
      </div>
    </section>
  );
}