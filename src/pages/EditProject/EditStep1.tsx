import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProjectData } from '../../store/slices/projectSlice';

interface EditStep1Props {
  formData: {
    name: string;
    description: string;
  };
  onNext: () => void;
}

const EditStep1: React.FC<EditStep1Props> = ({ formData, onNext }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const MAX_DESCRIPTION_WORDS = 250;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === 'description') {
      const words = value.trim().split(/\s+/);
      if (words.length <= MAX_DESCRIPTION_WORDS) {
        dispatch(setProjectData({ [id]: value }));
      }
    } else {
      dispatch(setProjectData({ [id]: value }));
    }
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    const descriptionWords = formData.description ? formData.description.trim().split(/\s+/) : [];

    if (!formData.name || formData.name.trim().length < 5) {
      newErrors.name = 'عنوان پروژه باید حداقل 5 کاراکتر باشد';
    }

    if (!formData.description || descriptionWords.length < 10) {
      newErrors.description = 'توضیحات پروژه باید حداقل 10 کلمه باشد';
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
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block mb-2 text-gray-700 font-semibold">
          عنوان پروژه
        </label>
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
        <label htmlFor="description" className="block mb-2 text-gray-700 font-semibold">
          توضیحات پروژه
        </label>
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

      <button 
        onClick={handleNext}
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors mt-4"
      >
        مرحله بعد
      </button>
    </div>
  );
};

export default EditStep1;