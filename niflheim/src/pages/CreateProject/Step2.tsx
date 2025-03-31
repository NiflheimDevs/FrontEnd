import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProjectData } from '@/store/slices/projectSlice';
import { FaCheck } from 'react-icons/fa';

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

interface Step2Props {
  formData: {
    tags: number[];
    label: number[];
  };
  tags: Tag[];
  labels: Label[];
  onNext: () => void;
  onPrev: () => void;
}

const Step2: React.FC<Step2Props> = ({ 
  formData = { tags: [], label: [] }, 
  tags = [], 
  labels = [], 
  onNext, 
  onPrev 
}) => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState<number[]>(formData.tags);
  const [selectedLabel, setSelectedLabel] = useState<number>(formData.label[0] || 1);
  const [error, setError] = useState('');

  const toggleTag = (tagId: number) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newSelectedTags);
  };

  const handleNext = () => {
    if (selectedTags.length === 0) {
      setError('حداقل یک تگ را انتخاب کنید');
      return;
    }

    if (!selectedLabel) {
      setError('یک برچسب را انتخاب کنید');
      return;
    }

    dispatch(setProjectData({ 
      tags: selectedTags, 
      label: [selectedLabel] 
    }));
    
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">انتخاب تگ‌ها</h3>
        <div className="flex flex-wrap gap-3">
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              className={`px-4 py-2 rounded-full flex items-center transition-all duration-200 ${
                selectedTags.includes(tag.id) 
                  ? 'bg-blue-500 text-white scale-105 shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {selectedTags.includes(tag.id) && <FaCheck className="ml-2" />}
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">انتخاب برچسب</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {labels.map(label => (
            <div 
              key={label.id}
              onClick={() => setSelectedLabel(label.id)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                selectedLabel === label.id 
                  ? 'bg-green-100 border-green-500' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">{label.name}</h4>
                {selectedLabel === label.id && <FaCheck className="text-green-600" />}
              </div>
              <p className="text-gray-600 mt-2">{label.description}</p>
              <p className="text-blue-600 font-bold mt-2">
                {label.price === 0 ? 'رایگان' : `${label.price.toLocaleString()} تومان`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button 
          onClick={onPrev}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors flex items-center"
        >
          مرحله قبل
        </button>
        <button 
          onClick={handleNext}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default Step2;