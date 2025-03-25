import React, { useState } from 'react';

interface UserProfileCardProps {
  username: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  deliveryDays: number;
  imageUrl: string;
  skills?: string[];
  description?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username,
  rating,
  reviews,
  price,
  currency,
  deliveryDays,
  imageUrl,
  skills = [],
  description = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 w-full transform transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col md:flex-row p-6">
        {/* Left Section - User Image and Basic Info */}
        <div className="flex-shrink-0 md:ml-6 flex flex-col items-center md:items-start">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={username} 
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-md"
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
              {rating.toFixed(1)}
            </div>
          </div>
          <div className="mt-4 text-center md:text-center">
            <div className="flex items-center justify-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{reviews} نظر</span>
            </div>
          </div>
        </div>

        {/* Right Section - Detailed Information */}
        <div className="flex-grow mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center md:text-right">{username}</h2>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 justify-center md:justify-start">
                  {skills.slice(0, 3).map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-center md:text-left w-full md:w-auto mt-4 md:mt-0">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold text-gray-700">{price} {currency}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">تحویل در {deliveryDays} روز</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="mt-4 text-gray-600 text-center md:text-right">
              <p className={`${isExpanded ? '' : 'line-clamp-2'}`}>
                {description}
              </p>
              {description.length > 100 && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-500 text-sm mt-2 hover:underline"
                >
                  {isExpanded ? 'بستن' : 'مشاهده بیشتر'}
                </button>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
            <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              چت
            </button>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              پذیرش
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;