import React from 'react';

interface UserProfileCardProps {
  username: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  deliveryDays: number;
  imageUrl: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username,
  rating,
  reviews,
  price,
  currency,
  deliveryDays,
  imageUrl
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
      {/* Left section with checkmarks/options */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="mr-2 text-right font-medium text-gray-800 rtl:text-right" dir="rtl">
            {price} {currency}
          </span>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md border border-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="mr-2 text-right font-medium text-gray-800 rtl:text-right" dir="rtl">
            زمان تحویل {deliveryDays} روز
          </span>
        </div>
      </div>
      
      {/* Right section with user info */}
      <div className="flex items-center">
        <div className="flex flex-col items-end mr-4">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded-full p-1 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-1.008c-.56.23-1.583.658-3.038.985a1.54 1.54 0 01-1.281-.232 1.648 1.648 0 01-.594-1.292c.037-.664.255-1.752.66-2.856.169-.455.411-1.653.669-2.268A6.827 6.827 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-bold text-lg">{username}</span>
          </div>
          
          <div className="flex items-center mt-1">
            <span className="text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {reviews}
            </span>
            <span className="flex items-center mx-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating}
            </span>
          </div>
        </div>
        
        <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white">
          <img src={imageUrl} alt={username} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;