import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../Components/MainContent/Header";
import Footer from "../../Components/Footer/Footer";

const faqs = [
  {
    question: "چطور می‌تونم به عنوان فریلنسر ثبت‌نام کنم؟",
    answer:
      "برای ثبت‌نام به عنوان فریلنسر، فقط کافیه فرم عضویت رو پر کنید و نمونه‌کارهای خودتون رو بارگذاری کنید تا پروفایلتون فعال بشه.",
  },
  {
    question: "چطور پروژه ثبت کنم و فریلنسر مناسب پیدا کنم؟",
    answer:
      "کافیه وارد پنل کارفرما بشید، پروژه‌ی خودتون رو تعریف کنید و منتظر پیشنهادهای فریلنسرها باشید. همچنین می‌تونید مستقیماً به فریلنسرها پیام بدید.",
  },
  {
    question: "پرداخت‌ها چطور انجام می‌شه؟",
    answer:
      "پرداخت‌ها به صورت امن از طریق سیستم ضمانت سایت انجام می‌شن. هزینه پس از تأیید نهایی پروژه به فریلنسر پرداخت می‌شه.",
  },
  {
    question: "چطور از کیفیت کار فریلنسر مطمئن بشم؟",
    answer:
      "می‌تونید نمونه‌کارها، امتیازها و نظرات مشتریان قبلی هر فریلنسر رو ببینید. همچنین با سیستم قسطی یا مرحله‌ای کار کنید.",
  },
  {
    question: "آیا می‌تونم همزمان فریلنسر و کارفرما باشم؟",
    answer:
      "بله! شما می‌تونید هم پروژه تعریف کنید و هم روی پروژه‌های دیگران پیشنهاد ارسال کنید.",
  },
  {
    question: "اگه بین فریلنسر و کارفرما اختلاف پیش بیاد چی؟",
    answer:
      "تیم پشتیبانی ما نقش داور رو ایفا می‌کنه و با بررسی مدارک و گفتگو، سعی می‌کنه اختلاف رو منصفانه حل کنه.",
  },
  {
    question: "برای برداشت درآمدم چطور اقدام کنم؟",
    answer:
      "بعد از تأیید نهایی پروژه و پایان مهلت تضمین، می‌تونید درخواست برداشت ثبت کنید و مبلغ رو به حساب بانکی‌تون منتقل کنید.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
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
          سوالات متداول فریلنسرها و کارفرماها
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md ${
                openIndex === index ? "border-green-500 bg-red-50" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center cursor-pointer select-none">
                <p className="font-semibold text-gray-800 text-base md:text-lg">
                  {faq.question}
                </p>
                <ChevronDown
                  className={`transition-transform duration-300 text-gray-500 ${
                    openIndex === index ? "rotate-180 text-white-500" : ""
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
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <p className="text-sm mt-12 text-gray-600 text-center font-medium mb-3.5">
          سوالی دارید که اینجا نیست؟ با ما در تماس باشید 😊
        </p>
      </div>
    </motion.div>
    <Footer />
  </div>
  );
}