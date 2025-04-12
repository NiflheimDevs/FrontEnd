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
  onPrev 
}) => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState<number[]>(formData.tags);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
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

  const filteredTags = tags.filter(tag => 
    !selectedTags.includes(tag.id) && tag.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                  filteredTags.map(tag => (
                    <div
                      key={tag.id}
                      onClick={() => {
                        toggleTag(tag.id);
                        setDropdownOpen(false); // Close the dropdown after selecting a tag
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
            {selectedTags.map(tagId => {
              const tag = tags.find(t => t.id === tagId);
              return tag ? (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full flex items-center gap-2"
                >
                  {tag.name}
                  <button 
                    onClick={() => toggleTag(tag.id)} 
                    className="text-white">×</button>
                </span>
              ) : null;
            })}
          </div>
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
                {projectLabel.price === 0 ? 'رایگان' : `${projectLabel.price.toLocaleString()} تومان`}
              </p>
              <div className="mt-3 text-xs text-gray-400">این برچسب قابل تغییر نیست</div>
            </div>
          ) :
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
            <p className="text-yellow-700">برچسب پروژه در حال بارگذاری...</p>
          </div>
          }
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 p-3 rounded-md">
          {error}
        </div>
      )}

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
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default EditStep2;
