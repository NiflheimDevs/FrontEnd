/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../../Components/DashboardComp/Sidebar";
import Header from "../../Components/DashboardComp/Header";
import { Search } from "lucide-react";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";
import walletPic from "@/assets/Dashboard/Wallet.svg";
import LadyPic from "@/assets/ChangePass.svg";
import { getBalance, getTransactions, GetUserDashboard } from "../../API";
import { useNotification } from "../../Notification/NotificationProvider";
import { errorMapper } from "../Error/Error";
import { Skeleton } from "primereact/skeleton";
import { CgProfile } from "react-icons/cg";

// تعریف تایپ برای داده‌های پروفایل
interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phonenumber: string;
  low_profile: string;
}

type Transaction = {
  id: number;
  date: string;
  activity: string;
  description: string;
  amount: number;
};

// نمونه داده‌ها برای پیش‌نمایش
const chatList = [
  { id: 1, name: "ادمین", lastMessage: "سلام، چطور می‌توانم به شما کمک کنم؟" },
];

// انیمیشن‌ها
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// const skeletonVariants = {
//   shimmer: {
//     backgroundPosition: ["-100% center", "100% center"],
//     transition: {
//       duration: 1.2,
//       ease: "linear",
//       repeat: Infinity,
//     },
//   },
// };

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phonenumber: "",
    username: "",
    low_profile: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { error: notifyError } = useNotification();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  const bindtransaction = async () => {
    try {
      const response = await getTransactions(0, 2, "date", "desc", "all");
      const formattedTransactions = response.transactions.map(
        (tx: any, index: number) => ({
          id: tx.id || index,
          date: tx.date,
          activity: tx.type === 2 ? "واریز" : "برداشت",
          description: tx.description || "-",
          amount: tx.amount,
        })
      );

      setTransactions(formattedTransactions);
    } catch {
      setTransactions([]);
    }
  };

  const bindData = async () => {
    try {
      const data = await GetUserDashboard();
      setProfileData({
        firstName: data.info.firstname || "نام",
        lastName: data.info.lastname || "نام خانوادگی",
        email: data.info.email || "example@gmail.com",
        username: data.info.username || "@A12345",
        phonenumber: data.info.phonenumber || "09109879973",
        low_profile: data.info.low_profile || "",
      });
    } catch (error: any) {
      const errorData = error;
      if (errorData.tag && errorData.errors?.length > 0) {
        const allErrors = errorData.errors;
        const errorMessages = allErrors.map((err: any) => errorMapper(err));
        notifyError(`${errorMessages.join(" ")}`);
      } else {
        notifyError(`${errorMapper(errorData)}`);
      }
    }
  };

  const fetchBalance = async () => {
    try {
      const balanceData = await getBalance();
      setBalance(Number(balanceData) || 0);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([bindData(), fetchBalance(), bindtransaction()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderSkeletonGrid = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <motion.div key={index} custom={index} initial="hidden" animate="visible">
        <div>
          <div className="rounded-lg p-4 flex items-center flex-col md:scale-100 sm:scale-90 scale-88 transition-transform duration-400 ease-out">
            <Skeleton className="relative border-8 border-gray-300 z-10 w-full p-4 rounded-lg max-w-[490px] min-h-[300px] justify-center items-center flex flex-col gap-2 mx-auto overflow-hidden shiny-skeleton" />
            <Skeleton width="1.5rem" height="1.5rem" className="bg-gray-300" />
            <Skeleton
              width="8rem"
              height="1rem"
              className="rounded-md bg-gray-300"
            />
          </div>
        </div>
      </motion.div>
    ));
  };

  const [ProfileExists, SetProfileExist] = useState<boolean>(true);

  const renderContentGrid = () => {
    return (
      <>
        {/* Messages Preview */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-[490px] mx-auto md:scale-100 sm:scale-90 scale-88 transition-transform duration-400 ease-out md:hover:scale-103 sm:hover:scale-93 hover:scale-91 cursor-pointer overflow-hidden"
        >
          <Link to="/chat" className="block">
            <div className="bg-[#F7F7F7] rounded-lg">
              <div className="bg-gray-800 rounded-lg p-3 border-b-4 border-gray-900">
                <div className="bg-gradient-to-br min-h-73 from-[#71C2F4] to-[#3444c2] rounded-md p-4 overflow-hidden">
                  <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                    <span className="mr-2">📩</span> پیام‌ها
                  </h3>
                  <div className="flex flex-col">
                    <div className="w-full p-2 rounded-sm">
                      <div className="relative md:mb-2 sm:mb-2 mb-0 flex">
                        <input
                          type="text"
                          placeholder="جستجو"
                          className="border border-gray-500 py-1 pr-8 pl-2 rounded-sm w-full text-right bg-[#D9D9D9]/20 placeholder-black text-sm"
                          disabled
                        />
                        <Search
                          size={14}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        />
                      </div>
                      {chatList.slice(0, 1).map((chat) => (
                        <div
                          key={chat.id}
                          className="md:flex sm:flex hidden items-center border-none bg-white/30 p-2 justify-end rounded-sm"
                        >
                          <div className="flex-1 text-right">
                            <p className="text-sm font-medium text-gray-800">
                              {chat.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {chat.lastMessage}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col bg-transparent p-2 rounded-sm">
                      <div className="flex w-full h-8 border-none items-center bg-white/50 rounded-t-sm p-2">
                        <img
                          src={ProfileDefault}
                          alt="Profile"
                          className="w-5 h-5 rounded-full ml-2"
                        />
                        <h4 className="text-sm font-semibold text-gray-800">
                          {chatList[0].name}
                        </h4>
                      </div>
                      <div className="flex-1 p-2 bg-[#1a2a44] rounded-b-sm">
                        <div className="max-w-[70%] mb-2 p-2 rounded-lg text-xs bg-gray-200 text-gray-800 ml-auto rounded-tr-none">
                          سلام! چطور می‌توانم به شما کمک کنم؟
                        </div>
                        <div className="max-w-[70%] p-2 rounded-lg text-xs bg-blue-600 text-white mr-auto rounded-tl-none">
                          نیاز به کمک در پروژه‌ام دارم
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gray-700"></div>
                <div className="w-32 h-4 bg-gray-800 rounded-md shadow-md"></div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Profile Preview */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-[490px] mx-auto md:scale-100 sm:scale-90 scale-88 transition-transform duration-400 ease-out md:hover:scale-103 sm:hover:scale-93 hover:scale-91 cursor-pointer overflow-hidden"
        >
          <Link to="/profile" className="block cursor-pointer">
            <div className="bg-[#F7F7F7] rounded-lg">
              <div className="bg-gray-800 rounded-lg p-3 border-b-4 border-gray-900">
                <div className="bg-white min-h-73 rounded-md p-4 overflow-hidden">
                  <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                    <span className="mr-2">👤</span> پروفایل
                  </h3>
                  <div className="flex flex-col items-center space-y-1">
                    {ProfileExists ? (
                      <img
                        src={profileData.low_profile}
                        alt="Profile"
                        className="w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center bg-gray-200"
                        onError={() => SetProfileExist(false)}
                      />
                    ) : (
                      <CgProfile className="text-gray-400" size={46} />
                    )}
                    <div className="text-center flex flex-col pt-2">
                      <p className="text-sm ltr text-gray-800">
                        {profileData.username}
                      </p>
                      <p className="text-sm ltr text-gray-800">
                        {profileData.phonenumber}
                      </p>
                      <div className="flex flex-col gap-1">
                        <div className="flex text-sm flex-row gap-2 pt-4 cursor-pointer">
                          <label className="mt-2 text-gray-600 w-24 text-right ">
                            نام
                          </label>
                          <input
                            type="text"
                            placeholder="نام"
                            value={profileData.firstName}
                            className="w-full sm:flex-1 p-2 rounded-lg text-gray-600 bg-gray-200 text-right [direction:rtl] cursor-pointer"
                            disabled
                          />
                        </div>
                        <div className="flex flex-row text-sm gap-2 cursor-pointer">
                          <label className="mt-2 text-gray-600 w-24 text-right ">
                            نام خانوادگی
                          </label>
                          <input
                            type="text"
                            placeholder="نام خانوادگی"
                            value={profileData.lastName}
                            className="w-full sm:flex-1 p-2 rounded-lg text-gray-600 bg-gray-200 text-right [direction:rtl] cursor-pointer"
                            disabled
                          />
                        </div>
                        <div className="flex flex-row text-sm gap-2">
                          <label className="mt-2 text-gray-600 w-24 text-right cursor-pointer">
                            ایمیل
                          </label>
                          <input
                            type="text"
                            placeholder="ایمیل"
                            value={profileData.email}
                            className="w-full sm:flex-1 p-2 rounded-lg text-gray-600 bg-gray-200 text-right [direction:rtl] cursor-pointer"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gray-700"></div>
                <div className="w-32 h-4 bg-gray-800 rounded-md shadow-md"></div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Wallet Preview */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-[490px] mx-auto md:scale-100 sm:scale-90 scale-88 transition-transform duration-400 ease-out md:hover:scale-103 sm:hover:scale-93 hover:scale-91 cursor-pointer overflow-hidden"
        >
          <Link to="/wallet" className="block">
            <div className="bg-[#F7F7F7] rounded-lg">
              <div className="bg-gray-800 rounded-lg p-3 border-b-4 border-gray-900">
                <div className="bg-white min-h-73 rounded-md p-4 overflow-hidden">
                  <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                    <span className="mr-2">💰</span> کیف پول
                  </h3>
                  <div className="text-center mb-3">
                    <p className="text-xl font-bold text-gray-800">
                      {formatPrice(balance)}
                    </p>
                    <p className="text-xs text-gray-600">تومان</p>
                  </div>
                  <table className="w-full text-center text-xs text-gray-800">
                    <thead>
                      <tr className="border-b">
                        <th className="text-sm font-semibold py-1">تاریخ</th>
                        <th className="text-sm font-semibold py-1">فعالیت</th>
                        <th className="text-sm font-semibold py-1">مقدار</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b">
                          <td className="py-1 ltr">{transaction.date}</td>
                          <td className="py-1">{transaction.activity}</td>
                          <td className="py-1">
                            {formatPrice(transaction.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center">
                    <img
                      src={walletPic}
                      alt="Illustration"
                      className="w-22 h-22"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gray-700"></div>
                <div className="w-32 h-4 bg-gray-800 rounded-md shadow-md"></div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Change Password Preview */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-[490px] mx-auto md:scale-100 sm:scale-90 scale-88 transition-transform duration-400 ease-out md:hover:scale-103 sm:hover:scale-93 hover:scale-91 cursor-pointer overflow-hidden"
        >
          <Link to="/changepass" className="block">
            <div className="bg-[#F7F7F7] rounded-lg">
              <div className="bg-gray-800 rounded-lg p-3 border-b-4 border-gray-900">
                <div className="bg-gradient-to-br min-h-73 from-[#71C2F4] to-[#3444c2] rounded-md p-4 overflow-hidden">
                  <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                    <span className="mr-2">🔒</span> تغییر رمز
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="text-center mb-3">
                      <p className="text-sm font-semibold text-[#D9D9D9]">
                        رمز جدیدت رو وارد کن
                      </p>
                      <div className="w-1/2 h-0.5 bg-blue-400 mx-auto mt-1"></div>
                    </div>
                    <div className="w-full space-y-2">
                      <input
                        type="password"
                        placeholder="رمز عبور قدیمی"
                        className="w-full bg-[#E5E5E5] py-1 px-3 rounded-md text-right text-xs placeholder-black"
                        disabled
                      />
                      <input
                        type="password"
                        placeholder="رمز عبور"
                        className="w-full bg-[#E5E5E5] py-1 px-3 rounded-md text-right text-xs placeholder-black"
                        disabled
                      />
                      <input
                        type="password"
                        placeholder="تکرار رمز عبور"
                        className="w-full bg-[#E5E5E5] py-1 px-3 rounded-md text-right text-xs placeholder-black"
                        disabled
                      />
                    </div>
                    <div className="md:flex sm:flex hidden justify-center mt-4">
                      <img
                        src={LadyPic}
                        alt="Illustration"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gray-700"></div>
                <div className="w-32 h-4 bg-gray-800 rounded-md shadow-md"></div>
              </div>
            </div>
          </Link>
        </motion.div>
      </>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
      <div className="flex w-full bg-[#F7F7F7]" dir="rtl">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 flex flex-col pt-16 w-full md:pr-24 sm:pr-24 pr-0">
          <Header toggleSidebar={toggleSidebar} />
          <div className="mt-8 pb-4 px-4">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-10 text-center text-gray-800"
            >
              داشبورد
            </motion.h2>
            {/* Grid of Previews */}
            <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-16">
              {isLoading ? renderSkeletonGrid() : renderContentGrid()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
