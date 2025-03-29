import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProjectData } from '@/store/slices/projectSlice';
import { FaCheck, FaLock } from 'react-icons/fa';

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
  labels: Label[];
  originalLabelId: number | null;
  onNext: () => void;
  onPrev: () => void;
}

const EditStep2: React.FC<EditStep2Props> = ({ 
  formData, 
  tags, 
  labels, 
  originalLabelId,
  onNext, 
  onPrev 
}) => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    
    if (formData.tags && formData.tags.length > 0) {
      setSelectedTags([...formData.tags]);
    }
    
    if (formData.label && formData.label.length > 0) {
      setSelectedLabel(formData.label[0]);
    } else if (originalLabelId) {
      setSelectedLabel(originalLabelId);
      dispatch(setProjectData({ label: [originalLabelId] }));
    }
  }, [formData, originalLabelId, dispatch]);

  const toggleTag = (tagId: number) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newSelectedTags);
    
    dispatch(setProjectData({ tags: newSelectedTags }));
  };

  const isLabelSelectable = (labelId: number) => {
    if (labelId === originalLabelId || labelId === selectedLabel) {
      return true;
    }
    
    const originalLabel = labels.find(l => l.id === originalLabelId);
    
    if (!originalLabel) return true; 
    
    if (originalLabel.price === 0) {
      const candidateLabel = labels.find(l => l.id === labelId);
      return candidateLabel?.price === 0;
    }
    
    const alreadySelectedLabels = formData.label || [];
    
    return !alreadySelectedLabels.includes(labelId);
  };

  const handleLabelSelect = (labelId: number) => {
    if (isLabelSelectable(labelId)) {
      setSelectedLabel(labelId);
      
      dispatch(setProjectData({ label: [labelId] }));
    }
  };

  const handleNext = () => {
    if (selectedTags.length === 0) {
      setError('حداقل یک تگ را انتخاب کنید');
      return;
    }

    if (!selectedLabel) {
      setError('لطفاً یک برچسب انتخاب کنید');
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
        
        {originalLabelId && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
            <p>توجه: اگر برچسب اصلی شما رایگان است، فقط می‌توانید برچسب‌های رایگان را انتخاب کنید. اگر برچسب اصلی پولی است، می‌توانید برچسب‌های جدید اضافه کنید اما نمی‌توانید برچسب‌هایی که قبلاً خریداری کرده‌اید را دوباره انتخاب کنید.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {labels.map(label => {
            const isSelectable = isLabelSelectable(label.id);
            const isSelected = selectedLabel === label.id;
            const isOriginal = label.id === originalLabelId;
            
            return (
              <div 
                key={label.id}
                onClick={() => isSelectable && handleLabelSelect(label.id)}
                className={`p-4 rounded-lg transition-all duration-300 border-2 relative ${
                  isSelected 
                    ? 'bg-green-100 border-green-500' 
                    : isSelectable
                      ? 'bg-white border-gray-200 hover:bg-gray-50 cursor-pointer'
                      : 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                } ${isOriginal ? 'ring-2 ring-blue-400' : ''}`}
              >
                {isOriginal && (
                  <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    برچسب اصلی
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">{label.name}</h4>
                  {isSelected && <FaCheck className="text-green-600" />}
                  {!isSelectable && !isSelected && <FaLock className="text-gray-400" />}
                </div>
                <p className="text-gray-600 mt-2">{label.description}</p>
                <p className="text-blue-600 font-bold mt-2">
                  {label.price === 0 ? 'رایگان' : `${label.price.toLocaleString()} تومان`}
                </p>
              </div>
            );
          })}
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

export default EditStep2;