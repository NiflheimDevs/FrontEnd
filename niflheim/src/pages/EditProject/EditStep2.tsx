import React, { useState, useEffect } from 'react';
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
  formData, 
  tags, 
  projectLabel,
  onNext, 
  onPrev 
}) => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Set selected tags from formData
    if (formData.tags && formData.tags.length > 0) {
      setSelectedTags([...formData.tags]);
    }
  }, [formData]);

  const toggleTag = (tagId: number) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newSelectedTags);
    dispatch(setProjectData({ tags: newSelectedTags }));
  };

  const handleNext = () => {
    if (selectedTags.length === 0) {
      setError('حداقل یک تگ را انتخاب کنید');
      return;
    }

    if (!formData.label || formData.label.length === 0) {
      setError('خطا در بارگذاری برچسب. لطفاً صفحه را بارگذاری مجدد کنید.');
      return;
    }

    dispatch(setProjectData({ tags: selectedTags }));
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Tags selection section */}
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

      {/* Label display section - read-only */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">برچسب پروژه</h3>
        
        {projectLabel ? (
          <div className="bg-white p-4 rounded-lg border-2 border-blue-500">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg">{projectLabel.name}</h4>
            </div>
            <p className="text-gray-600 mt-2">{projectLabel.description}</p>
            <p className="text-blue-600 font-bold mt-2">
              {projectLabel.price === 0 ? 'رایگان' : `${projectLabel.price.toLocaleString()} تومان`}
            </p>
            <div className="mt-3 text-xs text-gray-400">این برچسب قابل تغییر نیست</div>
          </div>
        ) : (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
            <p className="text-yellow-700">برچسب پروژه در حال بارگذاری...</p>
          </div>
        )}
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

export default EditStep2;