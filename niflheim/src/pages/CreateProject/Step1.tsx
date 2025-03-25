import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProjectData } from '@/store/slices/projectSlice';

interface Step1Props {
  formData: {
    name: string;
    description: string;
    files: File | null;
  };
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ formData, onNext }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const MAX_DESCRIPTION_WORDS = 250;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === 'description') {
      // Count words and limit to 250
      const words = value.trim().split(/\s+/);
      if (words.length <= MAX_DESCRIPTION_WORDS) {
        dispatch(setProjectData({ [id]: value }));
      }
    } else {
      dispatch(setProjectData({ [id]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(setProjectData({ files: e.target.files[0] }));
    }
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    const descriptionWords = formData.description ? formData.description.trim().split(/\s+/) : [];

    if (!formData.name || formData.name.trim().length < 5) {
      newErrors.name = 'عنوان پروژه باید حداقل 5 کاراکتر باشد';
    }

    if (!formData.description || descriptionWords.length < 20) {
      newErrors.description = 'توضیحات پروژه باید حداقل 20 کلمه باشد';
    }

    if (descriptionWords.length > MAX_DESCRIPTION_WORDS) {
      newErrors.description = `توضیحات نباید بیشتر از ${MAX_DESCRIPTION_WORDS} کلمه باشد`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  const wordCount = formData.description ? formData.description.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl mb-6 text-center text-gray-800 font-bold">اطلاعات اولیه پروژه</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-gray-700 font-semibold">عنوان پروژه</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            placeholder="عنوان پروژه را وارد کنید"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 text-gray-700 font-semibold">توضیحات پروژه</label>
          <div className="relative">
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
              rows={4}
              placeholder="توضیحات کامل پروژه را وارد کنید"
            />
            <div className="text-sm text-gray-500 mt-1 text-left">
              {wordCount} / {MAX_DESCRIPTION_WORDS} کلمه
            </div>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="file" className="block mb-2 text-gray-700 font-semibold">فایل ضمیمه (اختیاری)</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button 
          onClick={handleNext}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-200 mt-4"
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default Step1;