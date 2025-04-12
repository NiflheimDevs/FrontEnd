import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setProjectData } from '../../store/slices/projectSlice';
import { FaCheck, FaChevronDown } from 'react-icons/fa';

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
  const [selectedLabel, setSelectedLabel] = useState<number>(formData.label[0] || (labels[0] ? labels[0].id : 1));
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpenTags, setDropdownOpenTags] = useState(false);
  const [_dropdownOpenLabels, setDropdownOpenLabels] = useState(false);

  const dropdownRefTags = useRef<HTMLDivElement>(null);
  const dropdownRefLabels = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRefTags.current && !dropdownRefTags.current.contains(event.target as Node)) {
        setDropdownOpenTags(false);
      }
      if (dropdownRefLabels.current && !dropdownRefLabels.current.contains(event.target as Node)) {
        setDropdownOpenLabels(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTag = (tagId: number) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newSelectedTags);
    setDropdownOpenTags(false);
  };

  // const toggleLabel = (labelId: number) => {
  //   setSelectedLabel(labelId);
  //   setDropdownOpenLabels(false);
  // };

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

  const filteredTags = tags.filter(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
  // const filteredLabels = labels.filter(label => label.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">انتخاب تگ‌ها</h3>
        <div className="relative" ref={dropdownRefTags}>
          <button
            onClick={() => setDropdownOpenTags(!dropdownOpenTags)}
            className="w-full p-3 border rounded-lg bg-white flex justify-between items-center cursor-pointer"
          >
            انتخاب تگ‌ها
            <FaChevronDown className="text-gray-500" />
          </button>
          {dropdownOpenTags && (
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
                  filteredTags.map(tag => (
                    <div
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`p-2 rounded-md flex items-center justify-between cursor-pointer transition-all ${
                        selectedTags.includes(tag.id) ? 'hidden' : 'hover:bg-gray-100'
                      }`}
                    >
                      {tag.name}
                      {selectedTags.includes(tag.id) && <FaCheck />}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">موردی یافت نشد</p>
                )}
              </div>
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedTags.map(tagId => {
              const tag = tags.find(t => t.id === tagId);
              return tag ? (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full flex items-center gap-2"
                >
                  {tag.name}
                  <button onClick={() => toggleTag(tag.id)} className="text-white">×</button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">انتخاب برچسب</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {labels.map(label => (
            <div 
              key={label.id}
              onClick={() => setSelectedLabel(label.id)}
              className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                selectedLabel === label.id 
                  ? 'bg-green-100 border-green-500 shadow-md' 
                  : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-lg'
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg text-gray-800">{label.name}</h4>
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