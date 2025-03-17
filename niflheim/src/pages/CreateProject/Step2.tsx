import React, { useState } from "react";

interface Step2Props {
  prevStep: () => void;
  nextStep: () => void;
}

const Step2: React.FC<Step2Props> = ({ prevStep, nextStep }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md rtl">
      <div className="space-y-4">
      <button 
          onClick={() => toggleOption("unlimited")}
          className={`w-full border-2 ${selectedOptions.includes("unlimited") ? "border-blue-500" : "border-gray-300"} rounded-lg p-4 flex items-start hover:border-blue-400 transition-all`}
        >
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">ساخت پروژه</div>
            </div>
            <div className="mb-2">
              <p className="text-gray-600 text-sm">فرصت بی‌نظیر! به‌مناسبت آغاز فعالیت سایت، ثبت پروژه‌ها به صورت کاملاً رایگان انجام می‌شود. همین حالا اقدام کنید و پروژه خود را ثبت کنید!</p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="line-through text-gray-400 text-sm">۵۰,۰۰۰</span>
                <span className="text-gray-400 text-sm mr-1">تومان</span>
              </div>
              <div className="flex items-center mr-4">
                <span className="text-xl font-bold">رایگان</span>
              </div>
            </div>
          </div>
        </button>


        {/* Urgent Option */}
        <button 
          onClick={() => toggleOption("urgent")}
          className={`w-full border-2 ${selectedOptions.includes("urgent") ? "border-blue-500" : "border-gray-300"} rounded-lg p-4 flex items-start hover:border-blue-400 transition-all`}
        >
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">فوری</div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">پروژه فوری نشانگر عجله کارفرما برای انجام هرچه سریع تر پروژه است و مورد توجه فریلنسرهای حرفه ای که علاقه دارند زودتر پروژه دریافت کنند قرار می گیرد.</p>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xl font-bold">۱۰۹,۰۰۰</span>
              <span className="text-gray-700 mr-1">تومان</span>
            </div>
          </div>
        </button>

        {/* Featured Option */}
        <button 
          onClick={() => toggleOption("featured")}
          className={`w-full border-2 ${selectedOptions.includes("featured") ? "border-blue-500" : "border-gray-300"} rounded-lg p-4 flex items-start hover:border-blue-400 transition-all`}
        >
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">برجسته</div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">پروژه برجسته به دلیل برجسته بودن بیشتر مورد توجه فریلنسرهای حرفه ای قرار می گیرد و فریلنسرهای بیشتری در پروژه شرکت خواهند کرد.</p>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xl font-bold">۲۹۵,۰۰۰</span>
              <span className="text-gray-700 mr-1">تومان</span>
            </div>
          </div>
        </button>

        {/* Professional Option */}
        <button 
          onClick={() => toggleOption("professional")}
          className={`w-full border-2 ${selectedOptions.includes("professional") ? "border-blue-500" : "border-gray-300"} rounded-lg p-4 flex items-start hover:border-blue-400 transition-all`}
        >
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">حرفه‌ای</div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">پروژه شما توسط متخصصین ما ویرایش می‌شود تا توضیحات کامل و واضح‌تری نوشته شود و پیشنهاد های دقیق‌تری دریافت کنید.</p>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xl font-bold">۶۹,۰۰۰</span>
              <span className="text-gray-700 mr-1">تومان</span>
            </div>
          </div>
        </button>

        {/* Distinctive Option */}

      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded shadow hover:bg-gray-400 transition-colors"
        >
          بازگشت
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition-colors"
        >
          ثبت پروژه
        </button>
      </div>
    </div>
  );
};

export default Step2;