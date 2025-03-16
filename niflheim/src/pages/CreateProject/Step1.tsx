import React, { useState } from "react";
//import Header from "@/components/DashboardComp/Header";
import { useNotification } from "../../Notification/NotificationProvider"
interface Step1Props {
  formData: { name: string; skills: string; description: string; files: File | null };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({ formData, handleChange, handleFileChange, nextStep }) => {
  // Backend is down, so using a static list for now
  // useEffect(() => {
  //   fetchSkills().then(setSkillsList); // Fetch skills from backend
  // }, [fetchSkills]);

  const [skillsList] = useState<string[]>(["JavaScript", "Python", "React", "Node.js"]); // Temporary data
  const [errors, setErrors] = useState<string>("");
  const [focused, setFocused] = useState<{ [key: string]: boolean }>({});

  const validateForm = () => {
    if (formData.name.trim().length < 5) {
      setErrors("نام پروژه باید حداقل ۵ کاراکتر باشد.");
      return false;
    }
    if (formData.description.trim().length < 20) {
      setErrors("توضیحات پروژه باید حداقل ۲۰ کاراکتر باشد.");
      return false;
    }
    setErrors("");
    return true;
  };
  const { error : notifyerror } = useNotification();    
  const handleNextStep = () => {
    if (validateForm()) {
      nextStep();
    } else {
        notifyerror(errors);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">مرحله ۱: اطلاعات پروژه</h2>

      <div className="mb-4">
        <label
          className={`block text-sm ${focused.name ? "text-blue-600" : "text-gray-600"}`}
        >
          نام پروژه
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocused({ ...focused, name: true })}
          onBlur={() => setFocused({ ...focused, name: false })}
          className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300"
          placeholder="نام پروژه را وارد کنید"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600">مهارت‌های مورد نیاز</label>
        <select
          id="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded focus:ring focus:ring-blue-300"
          required
        >
          <option value="">انتخاب کنید</option>
          {skillsList.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          className={`block text-sm ${focused.description ? "text-blue-600" : "text-gray-600"}`}
        >
          توضیحات پروژه
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          onFocus={() => setFocused({ ...focused, description: true })}
          onBlur={() => setFocused({ ...focused, description: false })}
          className="w-full p-2 mt-1 border resize-none rounded focus:ring focus:ring-blue-300"
          rows={3}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600">آپلود فایل (اختیاری)</label>
        <input type="file" onChange={handleFileChange} className="w-full p-2 mt-1 border rounded" />
      </div>

      {errors && <p className="text-red-500 text-sm mb-4">{errors}</p>}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleNextStep}
          className={`px-6 py-2 rounded shadow-lg text-white bg-[#5993F6] hover:bg-[#3E79DE]`}
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default Step1;
