import React from "react";

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
  prevStep: () => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

const Step3: React.FC<Step3Props> = ({ 
  formData, 
  tags,
  prevStep, 
  handleSubmit,
  isLoading
}) => {
  // Find tag names from IDs
  const getTagNames = () => {
    return formData.tags?.map(tagId => {
      const tag = tags.find(t => t.ID === tagId);
      return tag ? tag.Name : '';
    }).filter(Boolean) || [];
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-6 text-right">بررسی نهایی و ثبت پروژه</h2>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-medium text-lg mb-3 text-right">اطلاعات پروژه</h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1 text-right">عنوان پروژه:</p>
          <p className="text-right">{formData.name}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1 text-right">توضیحات پروژه:</p>
          <p className="text-right whitespace-pre-line">{formData.description}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1 text-right">تگ‌ها:</p>
          <div className="flex flex-wrap gap-2 justify-end">
            {getTagNames().map((tagName, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm">
                {tagName}
              </span>
            ))}
          </div>
        </div>
        
        {formData.label && formData.label.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1 text-right">برچسب‌ها:</p>
            <div className="flex flex-wrap gap-2 justify-end">
              {formData.label.map((label, index) => (
                <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {formData.files && (
          <div>
            <p className="text-sm text-gray-500 mb-1 text-right">فایل ضمیمه:</p>
            <p className="text-right">{formData.files.name}</p>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <p className="text-right text-yellow-700">
          لطفا قبل از ثبت نهایی پروژه، اطلاعات وارد شده را با دقت بررسی کنید. پس از ثبت، امکان ویرایش برخی اطلاعات وجود ندارد.
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-3 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-200"
          disabled={isLoading}
        >
          مرحله قبل
        </button>
        <button
          onClick={handleSubmit}
          className={`px-6 py-3 rounded-lg text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin mr-2">⟳</span>
              در حال ثبت...
            </>
          ) : (
            'ثبت نهایی پروژه'
          )}
        </button>
      </div>
    </div>
  );
};

export default Step3;