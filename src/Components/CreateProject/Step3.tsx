import React from 'react';
import { 
  FaProjectDiagram, 
  FaTags, 
  FaMoneyBillWave, 
  FaFileArchive,
  FaExclamationTriangle,
  FaWallet
} from 'react-icons/fa';

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

interface Step3Props {
  formData: {
    name: string;
    description: string;
    tags: number[];
    label: number[];
    files: File | null;
  };
  tags: Tag[];
  labels: Label[];
  walletBalance: number;
  onSubmit: () => void;
  onPrev: () => void;
}

const Step3: React.FC<Step3Props> = ({ 
  formData, 
  tags, 
  labels, 
  walletBalance,
  onSubmit, 
  onPrev 
}) => {
  // Find tag names for selected tag IDs
  const getTagNames = () => {
    return formData.tags
      .map(tagId => tags.find(t => t.id === tagId)?.name)
      .filter(Boolean);
  };

  // Get label details
  const getSelectedLabel = () => {
    return labels.find(l => l.id === formData.label[0]);
  };

  // Truncate text if it's too long
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Limit tags to 5 and show the rest as "+X more"
  const getLimitedTags = () => {
    const tagNames = getTagNames();
    if (tagNames.length > 5) {
      return [
        ...tagNames.slice(0, 5),
        `+${tagNames.length - 5} more`
      ];
    }
    return tagNames;
  };

  // Check if user has enough balance
  const hasEnoughBalance = () => {
    const projectPrice = getSelectedLabel()?.price || 0;
    return walletBalance >= projectPrice;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FaProjectDiagram className="text-blue-600 ml-3 text-2xl" />
          <h2 className="text-xl font-bold text-gray-800">اطلاعات پروژه</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <strong className="text-gray-600 block mb-2">عنوان پروژه:</strong>
            <p className="bg-gray-50 px-2 py-1.5 rounded">{formData.name}</p>
          </div>
          
          <div>
            <strong className="text-gray-600 block mb-2">توضیحات:</strong>
            <p className="bg-gray-50 px-2 py-1.5 rounded line-clamp-3">
              {truncateText(formData.description, 200)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FaTags className="text-green-600 ml-3 text-2xl" />
          <h2 className="text-xl font-bold text-gray-800">تگ‌ها و برچسب</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <strong className="text-gray-600 block mb-2">تگ‌های انتخاب شده:</strong>
            <div className="flex flex-wrap gap-2">
              {getLimitedTags().map((tagName, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full"
                >
                  {tagName}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <strong className="text-gray-600 block mb-2">برچسب انتخاب شده:</strong>
            {getSelectedLabel() && (
              <div className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full inline-block">
                {getSelectedLabel()?.name}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FaMoneyBillWave className="text-purple-600 ml-3 text-2xl" />
          <h2 className="text-xl font-bold text-gray-800">جزئیات مالی</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <strong className="text-gray-600 block mb-2">هزینه پروژه:</strong>
            <p className="text-green-600 font-bold">
              {!getSelectedLabel()?.price || getSelectedLabel()?.price === 0 
                ? 'رایگان' 
                : `${getSelectedLabel()?.price.toLocaleString()} تومان`}
            </p>
          </div>
          
          <div>
            <strong className="text-gray-600 block mb-2">موجودی کیف پول:</strong>
            <p className={`font-bold ${hasEnoughBalance() ? 'text-green-600' : 'text-red-600'}`}>
              {walletBalance.toLocaleString()} تومان
            </p>
          </div>
        </div>
        
        {!hasEnoughBalance() && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
            <FaExclamationTriangle className="text-red-500 mt-1 ml-2" />
            <div>
              <p className="text-red-700 font-medium">موجودی کیف پول شما کافی نیست!</p>
              <p className="text-red-600 text-sm mt-1">
                برای ثبت این پروژه، ابتدا کیف پول خود را شارژ کنید.
              </p>
            </div>
          </div>
        )}
      </div>

      {formData.files && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaFileArchive className="text-orange-600 ml-3 text-2xl" />
            <h2 className="text-xl font-bold text-gray-800">فایل ضمیمه</h2>
          </div>
          
          <div>
            <strong className="text-gray-600 block mb-2">نام فایل:</strong>
            <p className="bg-gray-50 p-2 rounded">{formData.files.name}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button 
          onClick={onPrev}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors flex items-center cursor-pointer"
        >
          مرحله قبل
        </button>
        
        {hasEnoughBalance() ? (
          <button 
            onClick={onSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center cursor-pointer"
          >
            ثبت نهایی پروژه
          </button>
        ) : (
          <button 
            onClick={onSubmit} 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center cursor-pointer"
          >
            <FaWallet className="ml-2" />
            شارژ کیف پول و ادامه
          </button>
        )}
      </div>
    </div>
  );
};

export default Step3;