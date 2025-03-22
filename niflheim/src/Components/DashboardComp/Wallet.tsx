import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import walletPic from '/src/assets/dashboard/wallet.svg';
import React from "react";

type Transaction = {
  id: number;
  date: string;
  activity: string;
  description: string;
  amount: number;
};

const Wallet = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [balance, setBalance] = useState(0); // Initialize balance state
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5; // Set transactions per page to 5

  const transactions: Transaction[] = [
    { id: 1, date: "2023-10-01", activity: "واریز", description: "پروژه‌ی سایت", amount: 5000 },
    { id: 2, date: "2023-10-05", activity: "برداشت", description: "", amount: -1500 },
    { id: 3, date: "2023-10-10", activity: "واریز", description: "پروژه‌ی طراحی لوگو", amount: 2000 },
    { id: 4, date: "2023-10-15", activity: "واریز", description: "پروژه‌ی اپلیکیشن", amount: 3000 },
    { id: 5, date: "2023-10-20", activity: "برداشت", description: "خرید تجهیزات", amount: -2000 },
    { id: 6, date: "2023-10-25", activity: "واریز", description: "پروژه‌ی جدید", amount: 4000 },
    { id: 7, date: "2023-10-01", activity: "واریز", description: "پروژه‌ی سایت", amount: 5000 },
    { id: 8, date: "2023-10-05", activity: "برداشت", description: "", amount: -1500 },
    { id: 9, date: "2023-10-10", activity: "واریز", description: "پروژه‌ی طراحی لوگو", amount: 2000 },
    { id: 10, date: "2023-10-15", activity: "واریز", description: "پروژه‌ی اپلیکیشن", amount: 3000 },
    { id: 11, date: "2023-10-20", activity: "برداشت", description: "خرید تجهیزات", amount: -2000 },
    { id: 12, date: "2023-10-25", activity: "واریز", description: "پروژه‌ی جدید", amount: 4000 },
  ]; // Added more transactions for pagination

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const totalPages = Math.ceil(transactions.length / transactionsPerPage) || 1;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToPage = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen w-full bg-[#F7F7F7]">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col pt-16 pr-4 md:pr-24">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-col md:flex-row justify-between items-start mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">کیف پول</h2>
            <div className="text-center mb-4">
              <p className="text-2xl font-bold">{balance}</p>
              <p>ریال</p>
            </div>
            <div className="flex justify-between">
              <button className="cursor-pointer bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-all duration-300">
                <span>واریز</span>
              </button>
              <button className="cursor-pointer bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-all duration-300">
                <span>برداشت</span>
              </button>
            </div>
          </div>
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b">
                  <th className="text-lg font-semibold py-2">تاریخ</th>
                  <th className="text-lg font-semibold py-2">فعالیت</th>
                  <th className="text-lg font-semibold py-2">توضیحات</th>
                  <th className="text-lg font-semibold py-2">مقدار</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-2">{transaction.date}</td>
                    <td className="py-2">{transaction.activity}</td>
                    <td className="py-2">{transaction.description}</td>
                    <td className="py-2">{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 transition-all duration-300"
              >
                قبلی
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => goToPage(index + 1)}
                  className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded hover:bg-gray-400 transition-all duration-300`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 transition-all duration-300"
              >
                بعدی
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-64 mt-8">
          <img src={walletPic} alt="Illustration" />
          <p className="mt md:mt-0">شروع همیشه انگیزه دهنده است</p>
        </div>
      </main>
    </div>
  );
}

export default Wallet;