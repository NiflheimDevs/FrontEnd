import { motion } from "framer-motion";
import Header from "../../Components/MainContent/Header";
import { Phone, MapPin } from "lucide-react";
import Footer from "../../Components/Footer/Footer";

export default function ContactUs() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <Header showSearch={false} />

      <motion.main
        className="flex-grow flex flex-col items-center px-4 py-16 bg-gray-100 dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12 mt-10">
            تماس با ما
          </h2>

          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-8 space-y-6 text-gray-700 dark:text-gray-300 text-lg">
            <div className="flex items-center gap-4">
              <Phone className="text-blue-500 dark:text-blue-400" size={24} />
              <span>تلفن: ۲۲۳۳۴۴۵۵-۰۲۱</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-500 dark:text-blue-400" size={24} />
              <span>
                تهران، رسالت، خیابان هنگام، خیابان دانشگاه، دانشگاه علم و صنعت
                ایران
              </span>
            </div>
          </div>

          <p className="text-center text-gray-500 dark:text-gray-300 text-sm mt-10">
            پاسخگویی همه روزه از ساعت ۹ تا ۱۷
          </p>
        </div>
      </motion.main>

      <div className="bg-gray-100 dark:bg-gray-800">
        <Footer />
      </div>
    </div>
  );
}
