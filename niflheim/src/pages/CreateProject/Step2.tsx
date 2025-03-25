import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProjectData } from '@/store/slices/projectSlice';

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
  onNext: () => void;
  onPrev: () => void;
}

const Step2: React.FC<Step2Props> = ({ formData, tags, onNext, onPrev }) => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState<number[]>(formData.tags);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(formData.label);
  const [error, setError] = useState('');

  // Predefined labels with prices
  const predefinedLabels = [
    { name: 'فوری', price: 202000 },
    { name: 'برجسته', price: 150000 },
    { name: 'رایگان', price: 0 }
  ];

  const toggleTag = (tagId: number) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newSelectedTags);
  };

  const toggleLabel = (label: string) => {
    // Allow multiple label selections
    const newSelectedLabels = selectedLabels.includes(label)
      ? selectedLabels.filter(l => l !== label)
      : [...selectedLabels, label];
    
    setSelectedLabels(newSelectedLabels);
  };

  const handleNext = () => {
    if (selectedTags.length === 0) {
      setError('حداقل یک تگ را انتخاب کنید');
      return;
    }

    if (selectedLabels.length === 0) {
      setError('حداقل یک برچسب را انتخاب کنید');
      return;
    }

    dispatch(setProjectData({ 
      tags: selectedTags, 
      label: selectedLabels 
    }));
    
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl mb-6 text-center text-gray-800 font-bold">انتخاب تگ‌ها و برچسب‌ها</h2>

      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="mb-3 text-lg font-semibold text-gray-700">انتخاب تگ‌ها</h3>
        <div className="flex flex-wrap gap-3">
          {tags.map(tag => (
            <button
              key={tag.ID}
              onClick={() => toggleTag(tag.ID)}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                selectedTags.includes(tag.ID) 
                  ? 'bg-blue-500 text-white scale-105' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tag.Name}
            </button>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="mb-3 text-lg font-semibold text-gray-700">انتخاب برچسب‌ها</h3>
        <div className="flex flex-wrap gap-3">
          {predefinedLabels.map(label => (
            <button
              key={label.name}
              onClick={() => toggleLabel(label.name)}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                selectedLabels.includes(label.name) 
                  ? 'bg-green-500 text-white scale-105' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {label.name} - {label.price.toLocaleString()} تومان
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button 
          onClick={onPrev}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          مرحله قبل
        </button>
        <button 
          onClick={handleNext}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default Step2;