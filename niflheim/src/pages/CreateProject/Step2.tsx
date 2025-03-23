import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFeature } from "@/store/slices/projectSlice";

interface Step2Props {
  prevStep: () => void;
  nextStep: () => void;
}

const Step2: React.FC<Step2Props> = ({ prevStep, nextStep }) => {
  const dispatch = useDispatch();
  const { selectedFeatures } = useSelector((state: RootState) => state.project);

  const features = [
    { id: "unlimited", name: "ثبت رایگان", describe: "ثبت پروژه رایگان به مناسبت آغاز فعالیت سایت!", price: 0 },
    { id: "urgent", name: "پروژه فوری", describe: "پروژه فوری برای جلب توجه فریلنسر‌های حرفه‌ای.", price: 109000 },
    { id: "featured", name: "پروژه برجسته", describe: "افزایش شانس دریافت پیشنهادهای بهتر.", price: 295000 },
  ];

  // محاسبه مجموع مبلغ ویژگی‌های انتخاب‌شده
  const totalPrice = selectedFeatures.reduce((sum, feature) => sum + feature.price, 0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">انتخاب ویژگی‌های پروژه</h2>

      <div className="space-y-4">
        {features.map((feature) => {
          const isSelected = selectedFeatures.some(f => f.id === feature.id);
          const isMandatory = feature.id === "unlimited"; // این ویژگی اجباری است

          return (
            <button
              key={feature.id}
              onClick={() => !isMandatory && dispatch(toggleFeature(feature))}
              className={`w-full border-2 ${isSelected ? "border-blue-500" : ""} 
                ${isMandatory ? " border-blue-500" : "hover:border-blue-400"} 
                rounded-lg p-4 flex items-start transition-all`}
              disabled={isMandatory}
            >
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    {feature.name}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{feature.describe}</p>
                <div className="flex items-center mt-2">
                  <span className="text-xl font-bold">
                    {feature.price ? `${feature.price.toLocaleString()} تومان` : "رایگان"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* نمایش مجموع مبلغ پرداختی */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
        <span className="text-lg font-bold">جمع کل:</span>
        <span className="text-lg font-bold text-blue-600">{totalPrice.toLocaleString()} تومان</span>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={prevStep} className="bg-gray-300 text-gray-700 px-6 py-2 rounded shadow hover:bg-gray-400 transition-colors">
          بازگشت
        </button>
        <button onClick={nextStep} className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition-colors">
          ثبت پروژه
        </button>
      </div>
    </div>
  );
};

export default Step2;
