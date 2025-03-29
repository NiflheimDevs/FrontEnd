import React from 'react';
import { 
  FaProjectDiagram, 
  FaTags, 
  FaMoneyBillWave, 
  FaExclamationTriangle,
  FaInfoCircle
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

interface EditStep3Props {
  formData: {
    name: string;
    description: string;
    tags: number[];
    label: number[];
  };
  tags: Tag[];
  labels: Label[];
  originalLabelId: number | null;
  onSubmit: () => void;
  onPrev: () => void;
}

const EditStep3: React.FC<EditStep3Props> = ({ 
  formData, 
  tags, 
  labels, 
  originalLabelId,
  onSubmit, 
  onPrev 
}) => {
  const getTagNames = () => {
    return formData.tags
      .map(tagId => tags.find(t => t.id === tagId)?.name)
      .filter(Boolean);
  };

  const getSelectedLabel = () => {
    const labelId = formData.label && formData.label.length > 0 ? formData.label[0] : null;
    if (!labelId) return null;
    
    return labels.find(l => l.id === labelId) || null;
  };

  const getOriginalLabel = () => {
    if (!originalLabelId) return null;
    return labels.find(l => l.id === originalLabelId) || null;
  };

  const calculatePriceDifference = () => {
    const originalLabel = getOriginalLabel();
    const selectedLabel = getSelectedLabel();
    
    if (!originalLabel || !selectedLabel || originalLabel.id === selectedLabel.id) {
      return 0;
    }
    
    const diff = selectedLabel.price - originalLabel.price;
    return diff > 0 ? diff : 0;
  };

  const hasChanges = () => {
    const priceDifference = calculatePriceDifference();
    const labelChanged = originalLabelId !== (formData.label && formData.label.length > 0 ? formData.label[0] : null);
    
    return priceDifference > 0 || labelChanged;
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const selectedLabel = getSelectedLabel();
  const originalLabel = getOriginalLabel();
  const priceDifference = calculatePriceDifference();

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
            <p className="bg-gray-50 p-2 rounded">{formData.name}</p>
          </div>
          
          <div>
            <strong className="text-gray-600 block mb-2">توضیحات:</strong>
            <p className="bg-gray-50 p-2 rounded line-clamp-3">
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
              {getTagNames().map((tagName, index) => (
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
            {selectedLabel && (
              <div className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full inline-block">
                {selectedLabel.name}
              </div>
            )}
            
            {originalLabel && selectedLabel && originalLabel.id !== selectedLabel.id && (
              <div className="mt-2 text-xs text-blue-600">
                <FaInfoCircle className="inline ml-1" />
                تغییر از «{originalLabel.name}» به «{selectedLabel.name}»
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
        
        <div>
          <strong className="text-gray-600 block mb-2">هزینه برچسب:</strong>
          {selectedLabel ? (
            <p className="text-green-600 font-bold">
              {selectedLabel.price === 0 
                ? 'رایگان' 
                : `${selectedLabel.price.toLocaleString()} تومان`}
            </p>
          ) : (
            <p className="text-red-600">برچسبی انتخاب نشده است</p>
          )}
          
          {priceDifference > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded flex items-start">
              <FaExclamationTriangle className="text-yellow-500 mt-1 ml-2" />
              <div>
                <p className="text-yellow-700 font-bold">هزینه اضافی:</p>
                <p className="text-yellow-700">
                  برای ارتقاء برچسب از «{originalLabel?.name}» به «{selectedLabel?.name}»، مبلغ {priceDifference.toLocaleString()} تومان از کیف پول شما کسر خواهد شد.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button 
          onClick={onPrev}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors flex items-center"
        >
          مرحله قبل
        </button>
        <button 
          onClick={onSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          ثبت تغییرات
        </button>
      </div>
    </div>
  );
};

export default EditStep3;