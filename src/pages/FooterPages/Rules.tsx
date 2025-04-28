import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../Components/MainContent/Header";
import Footer from "../../Components/Footer/Footer";

const rules = [
  {
    question: "قانون اول: احترام متقابل بین کاربران",
    answer:
      "همه کاربران ملزم به رعایت ادب، احترام و پرهیز از هرگونه توهین یا برخورد غیرحرفه‌ای در ارتباطات کاری هستند.",
  },
  {
    question: "قانون دوم: عدم انجام پروژه‌های ممنوعه",
    answer:
      "انجام پروژه‌هایی که با قوانین کشور مغایرت دارند یا شامل محتوای غیرقانونی، کلاهبرداری یا نقض حقوق دیگران هستند ممنوع است.",
  },
  {
    question: "قانون سوم: تسویه‌حساب از طریق سیستم سایت",
    answer:
      "تمام پرداخت‌ها باید فقط از طریق بستر سایت انجام شوند. پرداخت مستقیم بین کارفرما و فریلنسر مجاز نیست.",
  },
  {
    question: "قانون چهارم: حفظ حریم خصوصی",
    answer:
      "اطلاعات شخصی کاربران محرمانه است و بدون رضایت، نباید در اختیار دیگران قرار گیرد یا در پروژه‌ها استفاده شود.",
  },
  {
    question: "قانون پنجم: زمان‌بندی و تعهد به قرارداد",
    answer:
      "فریلنسر موظف است طبق زمان‌بندی توافق‌شده پروژه را تحویل دهد. تأخیر بدون اطلاع قبلی ممکن است باعث جریمه یا لغو پروژه شود.",
  },
  {
    question: "قانون ششم: حق داوری سایت",
    answer:
      "در صورت بروز اختلاف، تصمیم تیم داوری سایت نهایی و لازم‌الاجراست. کاربران متعهد به پذیرش آن هستند.",
  },
  {
    question: "قانون هفتم: استفاده از حساب کاربری شخصی",
    answer:
      "هر کاربر باید فقط یک حساب داشته باشد و استفاده از چند حساب یا حساب شخص دیگر ممنوع است.",
  },
];

export default function Rules() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleRule = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col bg-[#F7F7F7] w-screen h-full">
    <Header showSearch={false} />
    <motion.div
      className="bg-gray-100 text-right px-4 py-16 min-h-screen flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 ">
          قوانین و مقررات استفاده از سایت
        </h2>
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div
              key={index}
              className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md ${
                openIndex === index ? "border-red-500 bg-red-50" : ""
              }`}
              onClick={() => toggleRule(index)}
            >
              <div className="flex justify-between items-center cursor-pointer select-none">
                <p className="font-semibold text-gray-800 text-base md:text-lg">
                  {rule.question}
                </p>
                <ChevronDown
                  className={`transition-transform duration-300 text-gray-500 ${
                    openIndex === index ? "rotate-180 text-red-500" : ""
                  }`}
                  size={20}
                />
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-700 mt-3 leading-relaxed text-sm md:text-base">
                      {rule.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <p className="text-sm mt-12 text-gray-600 text-center font-medium mb-3">
          رعایت این قوانین برای استفاده از خدمات سایت الزامی است.
        </p>
      </div>
      <Footer />
    </motion.div>
    </div>
  );
}