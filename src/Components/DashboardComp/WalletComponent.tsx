import { useState, useEffect, useRef } from "react";
import { Skeleton } from "primereact/skeleton";
import walletPic from "../../assets/Dashboard/Wallet.svg";
import { getBalance, getTransactions, depositToWallet, withdrawFromWallet } from "../../API";

type Transaction = {
  id: number;
  date: string;
  activity: string;
  description: string;
  amount: number;
};

type WalletComponentProps = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const WalletComponent = ({ isLoading, setIsLoading }: WalletComponentProps) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const transactionsPerPage = 5;

  const depositModalRef = useRef<HTMLDivElement>(null);
  const withdrawModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        depositModalRef.current &&
        isDepositModalOpen &&
        !depositModalRef.current.contains(event.target as Node)
      ) {
        setIsDepositModalOpen(false);
      }
      
      if (
        withdrawModalRef.current &&
        isWithdrawModalOpen &&
        !withdrawModalRef.current.contains(event.target as Node)
      ) {
        setIsWithdrawModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDepositModalOpen, isWithdrawModalOpen]);

  const fetchBalance = async () => {
    try {
      const balanceData = await getBalance();
      setBalance(Number(balanceData) || 0);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(0);
    }
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const offset = (currentPage - 1) * transactionsPerPage;
      //console.log(`Fetching page ${currentPage} with offset ${offset}`);
      
      const response = await getTransactions(
        offset,
        transactionsPerPage,
        "date",
        "desc",
        "all"
      );
      
      //console.log(`Got ${response.length} transactions for page ${currentPage}`);
      
      const formattedTransactions = response.map((tx: any, index: number) => ({
        id: tx.id || index,
        date: tx.date,
        activity: tx.type === 2 ? "واریز" : "برداشت",
        description: tx.description || "-",
        amount: tx.amount
      }));
      
      setTransactions(formattedTransactions);
      
      if (currentPage === 1) {
        if (response.length < transactionsPerPage) {
          setTotalTransactions(response.length);
        } else {
          setTotalTransactions(transactionsPerPage * 2);
        }
      } else if (response.length < transactionsPerPage) {
        setTotalTransactions((currentPage - 1) * transactionsPerPage + response.length);
      } else {
        setTotalTransactions(currentPage * transactionsPerPage + 1);
      }
    } catch (error) {
//      console.error("Error fetching transactions:", error);
//      console.error("Full error details:", error);
      setTransactions([]);
      setTotalTransactions(0);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const handleDeposit = async () => {
    setError("");
    if (!amount || parseFloat(amount) <= 0) {
      setError("لطفا مبلغ معتبر وارد کنید");
      return;
    }

    setIsLoading(true);
    try {
      await depositToWallet({
        amount: parseFloat(amount),
        description: description || undefined
      });
      setIsDepositModalOpen(false);
      setAmount("");
      setDescription("");
      await fetchBalance();
      await fetchTransactions();
    } catch (error: any) {
      setError(typeof error === 'string' ? error : "خطا در واریز به کیف پول");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setError("");
    if (!amount || parseFloat(amount) <= 0) {
      setError("لطفا مبلغ معتبر وارد کنید");
      return;
    }

    if (parseFloat(amount) > balance) {
      setError("موجودی کافی نیست");
      return;
    }

    setIsLoading(true);
    try {
      await withdrawFromWallet({
        amount: parseFloat(amount),
        description: description || undefined
      });
      setIsWithdrawModalOpen(false);
      setAmount("");
      setDescription("");
      await fetchBalance();
      await fetchTransactions();
    } catch (error: any) {
      setError(typeof error === 'string' ? error : "خطا در برداشت از کیف پول");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(totalTransactions / transactionsPerPage) || 1;
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      console.log(`Moving from page ${currentPage} to ${currentPage + 1}`);
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      console.log(`Moving from page ${currentPage} to ${currentPage - 1}`);
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToPage = (pageNumber: number) => {
    console.log(`Moving from page ${currentPage} to ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

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
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
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
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
        } rounded-md transition-all duration-300 font-medium ${currentPage > 2 ? "hidden" : "block"} md:block sm:block`}
      >
        1
      </button>
    );

    if (currentPage > 3) {
      pageNumbers.push(
        <span
          key="start-ellipsis"
          className="px-1 text-gray-500 hidden md:block sm:block"
        >
          ...
        </span>
      );
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`cursor-pointer flex px-4 py-2 mx-1 ${
            currentPage === i
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
          } rounded-md transition-all duration-300 font-medium`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span
          key="end-ellipsis"
          className="px-2 text-gray-500 hidden md:block sm:block"
        >
          ...
        </span>
      );
    }

    pageNumbers.push(
      <button
        key={totalPages}
        onClick={() => goToPage(totalPages)}
        className={`cursor-pointer flex px-4 py-2 mx-1 ${
          currentPage === totalPages
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
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
          <Skeleton
            width="100%"
            height="24px"
            className="shiny-skeleton mb-4"
          />
          <div className="text-center mb-4">
            <Skeleton
              width="50%"
              height="32px"
              className="shiny-skeleton mb-2"
            />
            <Skeleton className="shiny-skeleton" width="30%" height="16px" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="shiny-skeleton" width="45%" height="32px" />
            <Skeleton className="shiny-skeleton" width="45%" height="32px" />
          </div>
        </div>
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <Skeleton
            width="100%"
            height="32px"
            className="shiny-skeleton mb-4"
          />
          <table className="w-full text-center shiny-skeleton">
            <thead>
              <tr className="border-b">
                <th>
                  <Skeleton
                    className="shiny-skeleton"
                    width="100%"
                    height="24px"
                  />
                </th>
                <th>
                  <Skeleton
                    className="shiny-skeleton"
                    width="100%"
                    height="24px"
                  />
                </th>
                <th>
                  <Skeleton
                    className="shiny-skeleton"
                    width="100%"
                    height="24px"
                  />
                </th>
                <th>
                  <Skeleton
                    className="shiny-skeleton"
                    width="100%"
                    height="24px"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: transactionsPerPage }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td>
                    <Skeleton width="100%" height="24px" />
                  </td>
                  <td>
                    <Skeleton width="100%" height="24px" />
                  </td>
                  <td>
                    <Skeleton width="100%" height="24px" />
                  </td>
                  <td>
                    <Skeleton width="100%" height="24px" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-6 gap-2">
            <Skeleton className="shiny-skeleton" width="64px" height="32px" />
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                width="32px"
                height="32px"
                className="shiny-skeleton mx-1"
              />
            ))}
            <Skeleton className="shiny-skeleton" width="64px" height="32px" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? (
        renderSkeleton()
      ) : (
        <div className="flex flex-col md:flex-row w-full justify-between items-start mt-8 gap-4 md:scale-100 sm:scale-100 scale-[85%]">
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">کیف پول</h2>
            <div className="text-center mb-4">
              <p className="text-2xl font-bold">{(balance || 0).toLocaleString()}</p>
              <p>ریال</p>
            </div>
            <div className="flex justify-between">
              <button 
                onClick={() => setIsDepositModalOpen(true)}
                className="cursor-pointer bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-all duration-300"
              >
                <span>واریز</span>
              </button>
              <button 
                onClick={() => setIsWithdrawModalOpen(true)}
                className="cursor-pointer bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-all duration-300"
              >
                <span>برداشت</span>
              </button>
            </div>
          </div>
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b">
                  <th className="text-lg font-semibold py-2">
                    تاریخ
                  </th>
                  <th className="text-lg font-semibold py-2">
                    فعالیت
                  </th>
                  <th className="text-lg font-semibold py-2">توضیحات</th>
                  <th className="text-lg font-semibold py-2">
                    مبلغ
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions && transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="py-2">{transaction.date}</td>
                      <td className="py-2">{transaction.activity}</td>
                      <td className="py-2">{transaction.description || "-"}</td>
                      <td className={`py-2 ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount?.toLocaleString() || '0'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-gray-500">
                      تراکنشی یافت نشد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex max-w-full w-full justify-center items-center mt-6 md:scale-[94%] sm:scale-100 scale-[90%] md:gap-1 sm:gap-0 gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`cursor-pointer flex px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
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
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
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
              <Skeleton
                width="250px"
                height="100px"
                className="shiny-skeleton full border border-gray-300"
              />
              <Skeleton
                width="200px"
                height="20px"
                className="shiny-skeleton mt-2 bg-gray-200 rounded"
              />
            </div>
          </div>
        ) : (
          <>
            <img src={walletPic} alt="Illustration" />
            <p className="mt md:mt-0">شروع همیشه انگیزه دهنده است</p>
          </>
        )}
      </div>
      
      {isDepositModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div ref={depositModalRef} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">واریز به کیف پول</h2>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700 mb-2">مبلغ (ریال)</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 mb-2">توضیحات (اختیاری)</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDepositModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all ml-2"
              >
                انصراف
              </button>
              <button
                onClick={handleDeposit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
              >
                واریز
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div ref={withdrawModalRef} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">برداشت از کیف پول</h2>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">موجودی فعلی</label>
              <p className="font-semibold text-lg">{balance?.toLocaleString() || '0'} ریال</p>
            </div>
            <div className="mb-4">
              <label htmlFor="withdraw-amount" className="block text-gray-700 mb-2">مبلغ برداشت (ریال)</label>
              <input
                type="number"
                id="withdraw-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="withdraw-description" className="block text-gray-700 mb-2">توضیحات (اختیاری)</label>
              <textarea
                id="withdraw-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all ml-2"
              >
                انصراف
              </button>
              <button
                onClick={handleWithdraw}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
              >
                برداشت
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletComponent;