import React from 'react';

interface Tag {
  ID: number;
  Name: string;
}

interface Step3Props {
  formData: {
    name: string;
    description: string;
    tags: number[];
    label: string[];
    files: File | null;
  };
  tags: Tag[];
  onSubmit: () => void;
  onPrev: () => void;
}

const Step3: React.FC<Step3Props> = ({ 
  formData, 
  tags, 
  onSubmit, 
  onPrev 
}) => {
  // Find tag names for selected tag IDs
  const getTagNames = () => {
    return formData.tags
      .map(tagId => tags.find(t => t.ID === tagId)?.Name)
      .filter(Boolean);
  };

  // Get total price for selected labels
  const getLabelPrice = () => {
    const labelPrices: {[key: string]: number} = {
      'فوری': 202000,
      'برجسته': 150000,
      'رایگان': 0
    };
    
    return formData.label.reduce((total, label) => {
      return total + (labelPrices[label] || 0);
    }, 0);
  };

  // Format price with thousand separators
  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR', { useGrouping: true }) + ' تومان';
  };

  // Truncate text if it's too long
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl mb-6 text-center text-gray-800 font-bold">بررسی نهایی پروژه</h2>

      <div className="bg-gray-50 p-6 rounded-md border border-gray-200 mb-6">
        <div className="space-y-4">
          <div>
            <strong className="text-gray-700 block mb-1">عنوان:</strong> 
            <p className="text-gray-900">{formData.name}</p>
          </div>
          
          <div>
            <strong className="text-gray-700 block mb-1">توضیحات:</strong> 
            <p className="text-gray-900 break-words whitespace-pre-wrap">
              {truncateText(formData.description, 200)}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <strong className="text-gray-700 block mb-1 w-full">تگ‌ها:</strong> 
            {getTagNames().map((tagName, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full"
              >
                {tagName}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <strong className="text-gray-700 block mb-1 w-full">برچسب‌ها:</strong> 
            {formData.label.map((label, index) => (
              <span 
                key={index} 
                className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full"
              >
                {label}
              </span>
            ))}
          </div>
          
          <div>
            <strong className="text-gray-700 block mb-1">قیمت پروژه:</strong> 
            <p className="text-green-600 font-bold">{formatPrice(getLabelPrice())}</p>
          </div>
          
          {formData.files && (
            <div>
              <strong className="text-gray-700 block mb-1">فایل ضمیمه:</strong> 
              <p className="text-gray-900">{formData.files.name}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button 
          onClick={onPrev}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          مرحله قبل
        </button>
        <button 
          onClick={onSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          ثبت نهایی پروژه
        </button>
      </div>
    </div>
  );
};

export default Step3;