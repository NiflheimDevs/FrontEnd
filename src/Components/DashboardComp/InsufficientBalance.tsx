import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWallet, FaExclamationTriangle } from 'react-icons/fa';

const InsufficientBalance: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <FaExclamationTriangle className="text-red-500 text-4xl" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">موجودی کافی نیست</h1>
        
        <p className="text-gray-600 mb-6">
          برای ایجاد این پروژه، موجودی کیف پول شما کافی نیست. لطفا ابتدا کیف پول خود را شارژ کنید.
        </p>
        
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            شما برای ایجاد این پروژه به موجودی بیشتری نیاز دارید. با شارژ کیف پول، می‌توانید پروژه خود را ثبت کنید.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/wallet')}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all flex items-center justify-center"
          >
            <FaWallet className="ml-2" />
            شارژ کیف پول
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-all"
          >
            بازگشت به داشبورد
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsufficientBalance;