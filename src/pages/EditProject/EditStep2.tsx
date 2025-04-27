import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setProjectData } from "../../store/slices/projectSlice";
import { FaCheck, FaChevronDown } from "react-icons/fa";

interface Tag {
  id: number;
  name: string;
}

interface Label {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface EditStep2Props {
  formData: {
    tags: number[];
    label: number[];
  };
  tags: Tag[];
  projectLabel: Label | null;
  onNext: () => void;
  onPrev: () => void;
}

const EditStep2: React.FC<EditStep2Props> = ({
  formData = { tags: [], label: [] },
  tags = [],
  projectLabel,
  onNext,
  onPrev,
}) => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState<number[]>(formData.tags);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // اعتبارسنجی فرم
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (selectedTags.length === 0) {
      newErrors.tags = "حداقل یک تگ را انتخاب کنید";
    }

    if (!formData.label || formData.label.length === 0) {
      newErrors.label =
        "خطا در بارگذاری برچسب. لطفاً صفحه را بارگذاری مجدد کنید.";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
    return isValid;
  };

  // اعتبارسنجی بلادرنگ هنگام تغییر تگ‌ها
  const toggleTag = (tagId: number) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];

    setSelectedTags(newSelectedTags);
    dispatch(setProjectData({ tags: newSelectedTags }));
    validateForm();
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch(setProjectData({ tags: selectedTags }));
      onNext();
    }
  };

  // اعتبارسنجی اولیه
  useEffect(() => {
    validateForm();
  }, [selectedTags, formData.label]);

  const filteredTags = tags.filter(
    (tag) =>
      !selectedTags.includes(tag.id) &&
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Tag Selection */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">انتخاب تگ‌ها</h3>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full p-3 border rounded-lg bg-white flex justify-between items-center cursor-pointer"
          >
            انتخاب تگ‌ها
            <FaChevronDown className="text-gray-500" />
          </button>
          {dropdownOpen && (
            <div className="absolute w-full bg-white border rounded-lg mt-2 shadow-lg p-2 max-h-60 overflow-y-auto z-10">
              <input
                type="text"
                className="w-full p-2 border-b outline-none"
                placeholder="جستجو..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="mt-2 space-y-1">
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <div
                      key={tag.id}
                      onClick={() => {
                        toggleTag(tag.id);
                        setDropdownOpen(false);
                      }}
                      className="p-2 rounded-md flex items-center justify-between cursor-pointer transition-all hover:bg-gray-100"
                    >
                      {tag.name}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">موردی یافت نشد</p>
                )}
              </div>
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedTags.map((tagId) => {
              const tag = tags.find((t) => t.id === tagId);
              return tag ? (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full flex items-center gap-2"
                >
                  {tag.name}
                  <button
                    onClick={() => toggleTag(tag.id)}
                    className="text-white"
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
          </div>
          <AnimatePresence>
            {errors.tags && (
              <motion.ul
                key="tags-errors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-red-500 text-sm text-right mt-1 font-[vazirmatn]"
              >
                <li>{errors.tags}</li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Label Selection */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">انتخاب برچسب</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projectLabel ? (
            <div
              key={projectLabel.id}
              className={`p-4 rounded-lg transition-all duration-300 border-2 bg-green-100 border-green-500`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">{projectLabel.name}</h4>
                <FaCheck className="text-green-600" />
              </div>
              <p className="text-gray-600 mt-2">{projectLabel.description}</p>
              <p className="text-blue-600 font-bold mt-2">
                {projectLabel.price === 0
                  ? "رایگان"
                  : `${projectLabel.price.toLocaleString()} تومان`}
              </p>
              <div className="mt-3 text-xs text-gray-400">
                این برچسب قابل تغییر نیست
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
              <p className="text-yellow-700">برچسب پروژه در حال بارگذاری...</p>
            </div>
          )}
        </div>
        <AnimatePresence>
          {errors.label && (
            <motion.ul
              key="label-errors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm text-right mt-1 font-[vazirmatn]"
            >
              <li>{errors.label}</li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors flex items-center"
        >
          مرحله قبل
        </button>
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`px-6 py-2 rounded-md transition-colors flex items-center ${
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

export default EditStep2;
