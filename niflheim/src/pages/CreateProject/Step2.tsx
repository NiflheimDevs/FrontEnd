import React, { useState } from "react";

interface Tag {
  ID: number;
  Name: string;
}

interface Step2Props {
  formData: {
    tags: number[];
    label: string[];
  };
  tags: Tag[];
  handleTagChange: (selectedTags: number[]) => void;
  handleLabelChange: (selectedLabels: string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step2: React.FC<Step2Props> = ({ 
  formData, 
  tags, 
  handleTagChange, 
  handleLabelChange,
  nextStep, 
  prevStep 
}) => {
  const [errors, setErrors] = useState<string>("");
  const [customLabel, setCustomLabel] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<number[]>(formData.tags || []);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(formData.label || []);
  
  const labels = ["فوری", "ویژه", "اقتصادی", "حرفه‌ای", "آموزشی"];

  const toggleTag = (tagId: number) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newSelectedTags);
    handleTagChange(newSelectedTags);
  };

  const toggleLabel = (label: string) => {
    const newSelectedLabels = selectedLabels.includes(label)
      ? selectedLabels.filter(l => l !== label)
      : [...selectedLabels, label];
    
    setSelectedLabels(newSelectedLabels);
    handleLabelChange(newSelectedLabels);
  };

  const addCustomLabel = () => {
    if (customLabel && !selectedLabels.includes(customLabel)) {
      const newLabels = [...selectedLabels, customLabel];
      setSelectedLabels(newLabels);
      handleLabelChange(newLabels);
      setCustomLabel("");
    }
  };

  const validateForm = () => {
    if (selectedTags.length === 0) {
      setErrors("لطفا حداقل یک تگ انتخاب کنید.");
      return false;
    }
    
    setErrors("");
    return true;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-6 text-right">دسته‌بندی و برچسب‌های پروژه</h2>

      <div className="mb-6">
        <label className="block text-sm mb-3 text-right text-gray-600">
          تگ‌های پروژه *
        </label>
        <div className="flex flex-wrap gap-2 justify-end">
          {tags.map((tag) => (
            <button
              key={tag.ID}
              type="button"
              onClick={() => toggleTag(tag.ID)}
              className={`px-3 py-2 rounded-lg text-sm ${
                selectedTags.includes(tag.ID)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag.Name}
            </button>
          ))}
        </div>
        {errors && <p className="text-red-500 text-sm mt-2 text-right">{errors}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm mb-3 text-right text-gray-600">
          برچسب‌های پروژه (اختیاری)
        </label>
        <div className="flex flex-wrap gap-2 justify-end mb-3">
          {labels.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => toggleLabel(label)}
              className={`px-3 py-2 rounded-lg text-sm ${
                selectedLabels.includes(label)
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        
        {/* Uncomment if custom labels are needed
        <div className="flex">
          <input
            type="text"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-right"
            placeholder="افزودن برچسب دلخواه"
            dir="rtl"
          />
          <button
            type="button"
            onClick={addCustomLabel}
            className="mr-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={!customLabel}
          >
            +
          </button>
        </div>
        */}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-3 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-200"
        >
          مرحله قبل
        </button>
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

export default Step2;