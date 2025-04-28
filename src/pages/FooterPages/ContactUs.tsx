import { motion } from "framer-motion";
import Header from "../../Components/MainContent/Header";
import { Phone, MapPin } from "lucide-react";
import Footer from "../../Components/Footer/Footer";

export default function ContactUs() {
  return (
  <div className="flex flex-col bg-[#F7F7F7] w-screen h-full">
    <Header showSearch={false} />
    <motion.div
      className="bg-gray-100 text-right px-4 py-16 min-h-screen flex flex-col items-center "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 mt-15">
          تماس با ما
        </h2>

        <div className="bg-white rounded-2xl shadow-md p-8 space-y-6 text-gray-700 text-lg">
          <div className="flex items-center gap-4">
            <Phone className="text-blue-500" size={24} />
            <span>تلفن: ۲۲۳۳۴۴۵۵-۰۲۱</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="text-blue-500" size={24} />
            <span>تهران،، رسالت، خیابان هنگام، خیابان دانشگاه، دانشگاه علم و صنعت ایران</span>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10 ">
          پاسخگویی همه روزه از ساعت ۹ تا ۱۷
        </p>
      </div>
    </motion.div>
    <Footer/>
    </div>
  );
}