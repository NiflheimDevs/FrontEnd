import React, { useState } from "react";

interface Step1Props {
  formData: { 
    name: string; 
    description: string; 
    files: File | null;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({ formData, handleChange, handleFileChange, nextStep }) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [focused, setFocused] = useState<{ [key: string]: boolean }>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name || formData.name.trim().length < 5) {
      newErrors.name = "عنوان پروژه باید حداقل ۵ کاراکتر باشد.";
    }
    
    if (!formData.description || formData.description.trim().length < 20) {
      newErrors.description = "توضیحات پروژه باید حداقل ۲۰ کاراکتر باشد.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  const handleFocus = (field: string) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-6 text-right">اطلاعات اصلی پروژه</h2>

      <div className="mb-6">
        <label className={`block text-sm mb-1 text-right ${focused.name ? "text-blue-600" : "text-gray-600"}`}>
          عنوان پروژه *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name || ''}
          onChange={handleChange}
          onFocus={() => handleFocus('name')}
          onBlur={() => handleBlur('name')}
          className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-300 text-right`}
          placeholder="عنوان پروژه را وارد کنید"
          dir="rtl"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1 text-right">{errors.name}</p>}
      </div>

      <div className="mb-6">
        <label className={`block text-sm mb-1 text-right ${focused.description ? "text-blue-600" : "text-gray-600"}`}>
          توضیحات پروژه *
        </label>
        <textarea
          id="description"
          value={formData.description || ''}
          onChange={handleChange}
          onFocus={() => handleFocus('description')}
          onBlur={() => handleBlur('description')}
          className={`w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} resize-none rounded-lg focus:ring focus:ring-blue-300 text-right`}
          rows={6}
          placeholder="توضیحات کامل پروژه را وارد کنید"
          dir="rtl"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1 text-right">{errors.description}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm mb-1 text-right text-gray-600">
          فایل ضمیمه (اختیاری)
        </label>
        <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="hidden" 
            id="projectFile" 
          />
          <label htmlFor="projectFile" className="cursor-pointer text-blue-500 hover:text-blue-700">
            برای آپلود فایل کلیک کنید یا فایل را اینجا رها کنید
          </label>
          {formData.files && (
            <p className="mt-2 text-sm text-gray-600">
              {formData.files.name}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNextStep}
          className="px-6 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-200"
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default Step1;