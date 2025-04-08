import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import walletPic from '/src/assets/dashboard/wallet.svg';
import React from "react";
import { Skeleton } from 'primereact/skeleton';

type Transaction = {
  id: number;
  date: string;
  activity: string;
  description: string;
  amount: number;
};

const Wallet = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activityFilter, setActivityFilter] = useState('all');
  const [isActivityFilterOpen, setIsActivityFilterOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const transactionsPerPage = 5;
  const [isLoading, setIsLoading] = useState(true);

  // رفرنس به مودال فیلتر
  const filterModalRef = useRef<HTMLDivElement>(null);

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
    { id: 13, date: "2023-10-01", activity: "واریز", description: "پروژه‌ی سایت", amount: 5000 },
    { id: 14, date: "2023-10-05", activity: "برداشت", description: "", amount: -1500 },
    { id: 15, date: "2023-10-10", activity: "واریز", description: "پروژه‌ی طراحی لوگو", amount: 2000 },
    { id: 16, date: "2023-10-15", activity: "واریز", description: "پروژه‌ی اپلیکیشن", amount: 3000 },
    { id: 17, date: "2023-10-20", activity: "برداشت", description: "خرید تجهیزات", amount: -2000 },
    { id: 18, date: "2023-10-25", activity: "واریز", description: "پروژه‌ی جدید", amount: 4000 },
    { id: 19, date: "2023-10-01", activity: "واریز", description: "پروژه‌ی سایت", amount: 5000 },
    { id: 20, date: "2023-10-05", activity: "برداشت", description: "", amount: -1500 },
    { id: 21, date: "2023-10-10", activity: "واریز", description: "پروژه‌ی طراحی لوگو", amount: 2000 },
    { id: 22, date: "2023-10-15", activity: "واریز", description: "پروژه‌ی اپلیکیشن", amount: 3000 },
    { id: 23, date: "2023-10-20", activity: "برداشت", description: "خرید تجهیزات", amount: -2000 },
    { id: 24, date: "2023-10-25", activity: "واریز", description: "پروژه‌ی جدید", amount: 4000 },
    { id: 25, date: "2023-10-01", activity: "واریز", description: "پروژه‌ی سایت", amount: 5000 },
    { id: 26, date: "2023-10-05", activity: "برداشت", description: "", amount: -1500 },
    { id: 27, date: "2023-10-10", activity: "واریز", description: "پروژه‌ی طراحی لوگو", amount: 2000 },
    { id: 28, date: "2023-10-15", activity: "واریز", description: "پروژه‌ی اپلیکیشن", amount: 3000 },
    { id: 29, date: "2023-10-20", activity: "برداشت", description: "خرید تجهیزات", amount: -2000 },
    { id: 30, date: "2023-10-25", activity: "واریز", description: "پروژه‌ی جدید", amount: 4000 },
    { id: 31, date: "2023-10-01", activity: "واریز", description: "پروژه‌ی سایت", amount: 5000 },
    { id: 32, date: "2023-10-05", activity: "برداشت", description: "", amount: -1500 },
    { id: 33, date: "2023-10-10", activity: "واریز", description: "پروژه‌ی طراحی لوگو", amount: 2000 },
    { id: 34, date: "2023-10-15", activity: "واریز", description: "پروژه‌ی اپلیکیشن", amount: 3000 },
    { id: 35, date: "2023-10-20", activity: "برداشت", description: "خرید تجهیزات", amount: -2000 },
    { id: 36, date: "2023-10-25", activity: "واریز", description: "پروژه‌ی جدید", amount: 4000 },
  ];

  useEffect(() => {
    // شبیه‌سازی بارگذاری داده‌ها
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // بستن مودال هنگام کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterModalRef.current && !filterModalRef.current.contains(event.target as Node)) {
        setIsActivityFilterOpen(false);
      }
    };

    if (isActivityFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActivityFilterOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredTransactions = activityFilter === 'all'
    ? transactions
    : transactions.filter(t => t.activity === activityFilter);

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (sortBy === 'amount') {
      return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage) || 1;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToPage = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers: React.ReactNode[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`cursor-pointer flex px-4 py-2 mx-1 ${
              currentPage === i
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
            } rounded-md transition-all duration-300 font-medium`}
          >
            {i}
          </button>
        );
      }
      return pageNumbers;
    }

    pageNumbers.push(
      <button
        key={1}
        onClick={() => goToPage(1)}
        className={`cursor-pointer flex px-4 py-2 mx-1 ${
          currentPage === 1
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
            : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
        } rounded-md transition-all duration-300 font-medium ${currentPage > 2 ? "hidden" : "block"} md:block sm:block`}
      >
        1
      </button>
    );

    if (currentPage > 3) {
      pageNumbers.push(<span key="start-ellipsis" className="px-1 text-gray-500 hidden md:block sm:block">...</span>);
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`cursor-pointer flex px-4 py-2 mx-1 ${
            currentPage === i
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
              : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
          } rounded-md transition-all duration-300 font-medium`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(<span key="end-ellipsis" className="px-2 text-gray-500 hidden md:block sm:block">...</span>);
    }

    pageNumbers.push(
      <button
        key={totalPages}
        onClick={() => goToPage(totalPages)}
        className={`cursor-pointer flex px-4 py-2 mx-1 ${
          currentPage === totalPages
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
            : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
        } rounded-md transition-all duration-300 font-medium ${currentPage < totalPages - 1 ? "hidden" : "block"} md:block sm:block`}
      >
        {totalPages}
      </button>
    );

    return pageNumbers;
  };

  const renderSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row justify-between items-start mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <Skeleton width="100%" height="24px" className="shiny-skeleton mb-4" />
          <div className="text-center mb-4">
            <Skeleton width="50%" height="32px" className="shiny-skeleton mb-2" />
            <Skeleton className="shiny-skeleton" width="30%" height="16px" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="shiny-skeleton" width="45%" height="32px" />
            <Skeleton className="shiny-skeleton" width="45%" height="32px" />
          </div>
        </div>
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <Skeleton width="100%" height="32px" className="shiny-skeleton mb-4" />
          <table className="w-full text-center shiny-skeleton">
            <thead>
              <tr className="border-b">
                <th><Skeleton className="shiny-skeleton" width="100%" height="24px" /></th>
                <th><Skeleton className="shiny-skeleton" width="100%" height="24px" /></th>
                <th><Skeleton className="shiny-skeleton" width="100%" height="24px" /></th>
                <th><Skeleton className="shiny-skeleton" width="100%" height="24px" /></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(transactionsPerPage)].map((_, index) => (
                <tr key={index} className="border-b">
                  <td><Skeleton width="100%" height="24px" /></td>
                  <td><Skeleton width="100%" height="24px" /></td>
                  <td><Skeleton width="100%" height="24px" /></td>
                  <td><Skeleton width="100%" height="24px" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-6 gap-2">
            <Skeleton className="shiny-skeleton" width="64px" height="32px" />
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} width="32px" height="32px" className="shiny-skeleton mx-1" />
            ))}
            <Skeleton className="shiny-skeleton" width="64px" height="32px" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]" style={{ backgroundColor: "#F7F7F7" }}></div>
      <div className="flex h-full w-full bg-[#F7F7F7]">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 w-full flex flex-col pt-16 md:pl-4 sm:pl-4 md:pr-24 sm:pr-24">
          <Header toggleSidebar={toggleSidebar} />
          {isLoading ? (
            renderSkeleton()
          ) : (
            <div className="flex flex-col md:flex-row w-full justify-between items-start mt-8 gap-4 md:scale-100 sm:scale-100 scale-[85%]">
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
                      <th className="text-lg font-semibold py-2 cursor-pointer" onClick={() => { setSortBy('date'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>
                        تاریخ {sortBy === 'date' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th className="text-lg font-semibold py-2 relative">
                        <div className="flex items-center justify-center cursor-pointer" onClick={() => setIsActivityFilterOpen(!isActivityFilterOpen)}>
                          <span>فعالیت</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                        {isActivityFilterOpen && (
                          <div ref={filterModalRef} className="absolute top-full left-0 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <button
                              onClick={() => {
                                setActivityFilter('all');
                                setIsActivityFilterOpen(false);
                                setCurrentPage(1);
                              }}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              همه
                            </button>
                            <button
                              onClick={() => {
                                setActivityFilter('واریز');
                                setIsActivityFilterOpen(false);
                                setCurrentPage(1);
                              }}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              واریز
                            </button>
                            <button
                              onClick={() => {
                                setActivityFilter('برداشت');
                                setIsActivityFilterOpen(false);
                                setCurrentPage(1);
                              }}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              برداشت
                            </button>
                          </div>
                        )}
                        {activityFilter !== 'all' && (
                          <span className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-full text-xs mt-1 mr-1">
                            {activityFilter}
                          </span>
                        )}
                      </th>
                      <th className="text-lg font-semibold py-2">توضیحات</th>
                      <th className="text-lg font-semibold py-2 cursor-pointer" onClick={() => { setSortBy('amount'); setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); }}>
                        مبلغ {sortBy === 'amount' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
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
                <div className="flex max-w-full w-full justify-center items-center mt-6 md:scale-[94%] sm:scale-100 scale-[90%] md:gap-1 sm:gap-0 gap-2">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`cursor-pointer flex px-4 py-2 rounded-md ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                    } transition-all duration-300 font-medium`}
                  >
                    قبلی
                  </button>
                  {renderPageNumbers()}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`cursor-pointer flex px-4 py-2 rounded-md ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                    } transition-all duration-300 font-medium`}
                  >
                    بعدی
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center justify-center h-64 mt-2">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-60 mt-4">
                <div className="flex flex-col items-center">
                  <Skeleton width="250px" height="100px" className="shiny-skeleton full border border-gray-300" />
                  <Skeleton width="200px" height="20px" className="shiny-skeleton mt-2 bg-gray-200 rounded" />
                </div>
              </div>
            ) : (
              <>
                <img src={walletPic} alt="Illustration" />
                <p className="mt md:mt-0">شروع همیشه انگیزه دهنده است</p>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Wallet;