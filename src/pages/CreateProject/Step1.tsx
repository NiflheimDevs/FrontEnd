import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaCloudUploadAlt, FaTimesCircle } from 'react-icons/fa';
import { setProjectData } from '../../store/slices/projectSlice';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_DESCRIPTION_WORDS = 250;
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (ZIP only)
      if (!file.name.toLowerCase().endsWith('.zip')) {
        setErrors(prev => ({
          ...prev, 
          file: 'فقط فایل‌های ZIP مجاز هستند'
        }));
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setErrors(prev => ({
          ...prev, 
          file: 'حجم فایل نباید بیش از 50 مگابایت باشد'
        }));
        return;
      }

      dispatch(setProjectData({ files: file }));
      setErrors(prev => {
        const { file, ...rest } = prev;
        return rest;
      });
    }
  };

  const removeFile = () => {
    dispatch(setProjectData({ files: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

    // if (descriptionWords.length > MAX_DESCRIPTION_WORDS) {
    //   newErrors.description = `توضیحات نباید بیشتر از ${MAX_DESCRIPTION_WORDS} کلمه باشد`;
    // }

    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
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

      <div>
        <label className="block mb-2 text-gray-700 font-semibold">
          فایل پروژه (فقط ZIP)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".zip"
            className="hidden"
            id="file-upload"
          />
          {!formData.files ? (
            <label 
              htmlFor="file-upload" 
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <FaCloudUploadAlt className="text-5xl text-gray-400 mb-4" />
              <p className="text-gray-600">
                فایل ZIP خود را اینجا بکشید و رها کنید یا کلیک کنید
              </p>
              <span className="text-sm text-gray-500 mt-2">
                حداکثر حجم: 50 مگابایت
              </span>
            </label>
          ) : (
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-md">
              <div className="flex items-center">
                <FaCloudUploadAlt className="text-green-600 ml-3 text-2xl" />
                <span className="text-green-800">{formData.files.name}</span>
              </div>
              <button 
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                <FaTimesCircle className="text-2xl" />
              </button>
            </div>
          )}
        </div>
        {errors.file && <p className="text-red-500 text-sm mt-2">{errors.file}</p>}
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

export default Step1;