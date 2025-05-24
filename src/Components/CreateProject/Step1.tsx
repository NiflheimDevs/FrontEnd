import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setProjectData } from "../../store/slices/projectSlice";

interface Step1Props {
  formData: {
    name: string;
    description: string;
    files: File | null;
    duration: string;
  };
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ formData, onNext }) => {
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

    if (id === "duration") {
      if (!value || parseInt(value, -1) == -1) {
        newErrors.duration = "زمان انتظار برای کارجو به شکل صحیح وارد نشده";
      } else {
        delete newErrors.duration;
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

    if (!formData.duration) {
      newErrors.duration = "زمان انتظار برای کارجو به شکل صحیح وارد نشده";
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

    validateField(id, value);
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  useEffect(() => {
    validateStep();
  }, []);

  const wordCount = formData.description
    ? formData.description.trim().split(/\s+/).length
    : 0;

  return (

    <form className="space-y-6 dark:bg-gray-900">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-gray-700 font-semibold dark:text-gray-300"
        >
          عنوان پروژه
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 dark:border-gray-600 dark:focus:ring-blue-400"
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
              className="text-red-500 text-sm text-right mt-1 font-[vazirmatn] dark:text-red-400"
            >
              <li>{errors.name}</li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-2 text-gray-700 font-semibold dark:text-gray-300"
        >
          توضیحات پروژه
        </label>
        <div className="relative dark:bg-gray-900">
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border min-h-[100px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none dark:border-gray-600 dark:focus:ring-blue-400"
            rows={4}
            placeholder="توضیحات کامل پروژه را وارد کنید"
          />
          <div className="flex flex-row relative dark:bg-gray-900">
            <AnimatePresence>
              {errors.description && (
                <motion.ul
                  key="description-errors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-red-500 text-sm text-right mt-1 font-[vazirmatn] dark:text-red-400"
                >
                  <li>{errors.description}</li>
                </motion.ul>
              )}
            </AnimatePresence>
            <div className="flex text-sm absolute left-0 text-gray-500 mt-1 text-left dark:text-gray-400">
              {wordCount} / {MAX_DESCRIPTION_WORDS} کلمه
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="duration"
          className="block mb-2 text-gray-700 font-semibold"
        >
          زمان انتظار برای کارجو (روز):
        </label>
        <div className="relative">
          <input
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 border no-spinner border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            type="number"
            placeholder="زمان انتظار برای کارجو را وارد کنید"
          />
          <div className="flex flex-row relative">
            <AnimatePresence>
              {errors.duration && (
                <motion.ul
                  key="duration-errors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-red-500 text-sm text-right mt-1 font-[vazirmatn]"
                >
                  <li>{errors.duration}</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/dashboard")}
          type="button"
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors flex items-center cursor-pointer dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          بازگشت به داشبورد
        </button>
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          type="submit"
          className={`px-6 py-2 rounded-md transition-colors flex items-center cursor-pointer ${
            isFormValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          مرحله بعد
        </button>
      </div>
    </form>
  );
};

export default Step1;
