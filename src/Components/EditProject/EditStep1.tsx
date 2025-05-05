import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { setProjectData } from "../../store/slices/projectSlice";

interface EditStep1Props {
  formData: {
    name: string;
    description: string;
  };
  onNext: () => void;
}

const EditStep1: React.FC<EditStep1Props> = ({ formData, onNext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const MAX_DESCRIPTION_WORDS = 250;

  const validateField = (id: string, value: string) => {
    const newErrors: { [key: string]: string } = { ...errors };

    if (id === "name") {
      if (!value || value.trim().length < 5) {
        newErrors.name = "عنوان پروژه باید حداقل 5 کاراکتر باشد";
      } else {
        delete newErrors.name;
      }
    }

    if (id === "description") {
      const words = value ? value.trim().split(/\s+/) : [];
      if (!value || words.length < 20) {
        newErrors.description = "توضیحات پروژه باید حداقل 20 کلمه باشد";
      } else if (words.length > MAX_DESCRIPTION_WORDS) {
        newErrors.description = `توضیحات نباید بیشتر از ${MAX_DESCRIPTION_WORDS} کلمه باشد`;
      } else {
        delete newErrors.description;
      }
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    const descriptionWords = formData.description
      ? formData.description.trim().split(/\s+/)
      : [];

    if (!formData.name || formData.name.trim().length < 5) {
      newErrors.name = "عنوان پروژه باید حداقل 5 کاراکتر باشد";
    }

    if (!formData.description || descriptionWords.length < 20) {
      newErrors.description = "توضیحات پروژه باید حداقل 20 کلمه باشد";
    }

    if (descriptionWords.length > MAX_DESCRIPTION_WORDS) {
      newErrors.description = `توضیحات نباید بیشتر از ${MAX_DESCRIPTION_WORDS} کلمه باشد`;
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (id === "description") {
      const words = value.trim().split(/\s+/);
      if (words.length <= MAX_DESCRIPTION_WORDS) {
        dispatch(setProjectData({ [id]: value }));
      }
    } else {
      dispatch(setProjectData({ [id]: value }));
    }

    // اعتبارسنجی فقط برای فیلد در حال تغییر
    validateField(id, value);
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  // اعتبارسنجی اولیه هنگام بارگذاری کامپوننت
  useEffect(() => {
    validateStep();
  }, [formData]);

  const wordCount = formData.description
    ? formData.description.trim().split(/\s+/).length
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-gray-700 font-semibold"
        >
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
        <AnimatePresence>
          {errors.name && (
            <motion.ul
              key="name-errors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm text-right mt-1 font-[vazirmatn]"
            >
              <li>{errors.name}</li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-2 text-gray-700 font-semibold"
        >
          توضیحات پروژه
        </label>
        <div className="relative">
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border min-h-[100px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
            rows={4}
            placeholder="توضیحات کامل پروژه را وارد کنید"
          />
          <div className="text-sm text-gray-500 mt-1 text-left">
            {wordCount} / {MAX_DESCRIPTION_WORDS} کلمه
          </div>
          <AnimatePresence>
            {errors.description && (
              <motion.ul
                key="description-errors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-red-500 text-sm text-right mt-1 font-[vazirmatn]"
              >
                <li>{errors.description}</li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors flex items-center cursor-pointer"
        >
          بازگشت به داشبورد
        </button>
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`px-8 py-2 rounded-md transition-colors flex items-center cursor-pointer ${
            isFormValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default EditStep1;
