import { useState, useEffect } from "react";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";
import bg from "@/assets/message/bg.png";
import { Search, ArrowRight } from "lucide-react";

// Define the shape of a chat
interface Chat {
  id: number;
  name: string;
  lastMessage: string;
}

// Define the shape of a message
interface Message {
  id: number;
  text: string;
  type: "sent" | "received";
}

// Define the type for allMessages
interface Messages {
  [key: number]: Message[];
}

// Define the shape of a search result
interface SearchResult {
  id: number;
  name: string;
}

const Messages = () => {
  const chatList: Chat[] = [
    { id: 1, name: "ادمین", lastMessage: "سلام، چطور می‌توانم به شما کمک کنم؟" },
    { id: 2, name: "سبحان رنجبر", lastMessage: "پروژه جدید رو دیدی؟" },
    { id: 3, name: "کیارش سهرابی", lastMessage: "فردا ساعت چند جلسه داریم؟" },
  ];

  const allMessages: Messages = {
    1: [
      { id: 1, text: "سلام! چطور می‌توانم به شما کمک کنم؟", type: "received" },
      { id: 2, text: "نیاز به کمک در پروژه‌ام دارم", type: "sent" },
    ],
    2: [
      { id: 1, text: "پروژه جدید رو دیدی؟", type: "received" },
      { id: 2, text: "آره خیلی خوبه", type: "sent" },
    ],
    3: [
      { id: 1, text: "فردا ساعت چند جلسه داریم؟", type: "received" },
      { id: 2, text: "ساعت ۱۰ صبح", type: "sent" },
    ],
  };

  const [selectedChat, setSelectedChat] = useState<Chat>(chatList[0]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const messages: Message[] = allMessages[selectedChat.id] || [];

  const handleBackToChatList = () => {
    setIsChatOpen(false);
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setIsChatOpen(true);
    setSearchQuery("");
    setSearchResults([]);
    setSearchError(null);
  };

  // Handle search API call
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    const searchUsers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/users/search?query=${encodeURIComponent(searchQuery)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any necessary authorization headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        // Expect data to be an array of { id: number, name: string }
        if (data.length === 0) {
          setSearchError("No such person found");
          setSearchResults([]);
        } else {
          setSearchResults(data);
          setSearchError(null);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchError("Error searching for users");
        setSearchResults([]);
      }
    };

    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(searchUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle starting a new chat from search results
  const handleStartChat = async (user: SearchResult) => {
    try {
      // Replace with your actual API endpoint to start a new chat
      const response = await fetch("/api/chats/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any necessary authorization headers
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to start chat");
      }

      const newChat = await response.json();
      // Expect newChat to be { id: number, name: string, lastMessage: string }
      setSelectedChat(newChat);
      setIsChatOpen(true);
      setSearchQuery("");
      setSearchResults([]);
      setSearchError(null);
    } catch (error) {
      console.error("Start chat error:", error);
      setSearchError("Failed to start chat");
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row mt-6 p-3 md:p-5 w-full max-w-[1080px] h-[87vh] gap-4 mx-auto rounded-2xl"
      dir="rtl"
    >
      {/* Chat List */}
      <div
        className={`w-full md:w-[40%] h-[300px] md:h-full bg-white/40 rounded-2xl p-5 flex flex-col transition-all duration-400 ease-in-out ${
          isChatOpen ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="جستجوی مخاطب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-[6px] pr-10 pl-4 text-right bg-gray-300 border hover:bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black transition-all duration-400 ease-in-out"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer">
            <Search
              size={18}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-400 ease-in-out"
            />
          </button>
        </div>

        {/* Search Results or Chat List */}
        <div className="space-y-3 overflow-y-auto flex-1">
          {searchQuery.trim() && searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div
                key={user.id}
                onClick={() => handleStartChat(user)}
                className="flex items-center py-2 cursor-pointer rounded-xl hover:bg-blue-100 hover:shadow-md transition-all duration-400 ease-in-out bg-gray-300"
              >
                <img
                  src={ProfileDefault}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mx-3"
                />
                <div className="flex-1 text-right">
                  <p className="text-md font-medium text-gray-800">{user.name}</p>
                  <p className="text-[10px] text-gray-500">شروع چت جدید</p>
                </div>
              </div>
            ))
          ) : searchQuery.trim() && searchError ? (
            <p className="text-center text-gray-500 text-sm">{searchError}</p>
          ) : (
            chatList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`flex items-center py-2 cursor-pointer rounded-xl hover:bg-blue-100 hover:shadow-md transition-all duration-400 ease-in-out ${
                  selectedChat.id === chat.id ? "bg-gray-50" : "bg-gray-300"
                }`}
              >
                <img
                  src={ProfileDefault}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mx-3"
                />
                <div className="flex-1 text-right">
                  <p className="text-md font-medium text-gray-800">{chat.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`flex flex-col flex-1 min-h-0 mt-4 md:mt-0 md:ml-3 ${
          isChatOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {/* Header */}
        <div className="flex w-full h-[60px] md:h-[75px] bg-white/50 items-center rounded-t-2xl shadow-md">
          <button
            onClick={handleBackToChatList}
            className="md:hidden text-gray-800 hover:text-blue-600 transition-colors duration-400 ease-in-out mr-2"
          >
            <ArrowRight size={24} />
          </button>
          <img
            src={ProfileDefault}
            alt="Profile"
            className="w-10 h-10 rounded-full mx-3"
          />
          <h2 className="text-lg font-semibold text-gray-800">{selectedChat.name}</h2>
        </div>

        {/* Messages */}
        <div
          className="flex flex-col w-full flex-1 p-3 md:p-5 overflow-y-auto relative rounded-b-2xl"
          style={{
            backgroundColor: "#1a2a44",
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex-1 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[70%] mb-4 p-3 rounded-2xl text-sm leading-relaxed shadow-md transition-all duration-400 ease-in-out ${
                  message.type === "received"
                    ? "bg-gray-200 text-gray-800 ml-auto rounded-tr-none"
                    : "bg-blue-600 text-white mr-auto rounded-tl-none"
                }`}
              >
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="sticky bottom-0 mt-3">
            <div className="flex items-center bg-white rounded-full p-[4px] shadow-lg">
              <button className="text-blue-600 pt-1 text-lg cursor-pointer px-3 hover:text-blue-800 transition-colors duration-400 ease-in-out">
                ➤
              </button>
              <input
                type="text"
                placeholder="پیامی بنویسید..."
                className="flex-1 border-none outline-none text-sm px-3 bg-transparent placeholder-gray-500 text-black transition-all duration-400 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

// import { useState, useEffect, useCallback } from "react";
// import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";
// import bg from "@/assets/message/bg.png";
// import { Search, ArrowRight, X } from "lucide-react"; // Replaced Trash2 with X

// // Define interfaces (unchanged)
// interface Chat {
//   id: string;
//   name: string;
//   lastMessage: string;
// }

// interface Message {
//   id: string;
//   text: string;
//   type: "sent" | "received";
// }

// interface Messages {
//   [key: string]: Message[];
// }

// interface SearchResult {
//   id: string;
//   name: string;
// }

// // Dialog Component for Confirmation (unchanged)
// const DeleteChatDialog = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   chatName,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   chatName: string;
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div
//         className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg transform transition-all duration-300 ease-in-out"
//         dir="rtl"
//       >
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//           حذف چت
//         </h3>
//         <p className="text-sm text-gray-600 mb-6">
//           آیا مطمئن هستید که می‌خواهید چت با{" "}
//           <span className="font-medium">{chatName}</span> را حذف کنید؟ این
//           عملیات قابل بازگشت نیست.
//         </p>
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
//           >
//             لغو
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
//           >
//             حذف
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Messages = () => {
//   const [chatList, setChatList] = useState<Chat[]>([
//     { id: "1", name: "ادمین", lastMessage: "سلام چطور می‌توانم به شما کمک کنم؟" },
//     { id: "2", name: "سبحان رنجبر", lastMessage: "پروژه جدید رو دیدی؟ حتما یه نگاهی بنداز خیلی جالبه" },
//     { id: "3", name: "کیارش سهرابی", lastMessage: "فردا ساعت چند جلسه داریم؟" },
//   ]);

//   const [allMessages, setAllMessages] = useState<Messages>({
//     "1": [
//       { id: "1", text: "سلام! چطور می‌توانم به شما کمک کنم؟", type: "received" },
//       { id: "2", text: "نیاز به کمک در پروژه‌ام دارم", type: "sent" },
//     ],
//     "2": [
//       { id: "1", text: "پروژه جدید رو دیدی؟", type: "received" },
//       { id: "2", text: "آره خیلی خوبه", type: "sent" },
//     ],
//     "3": [
//       { id: "1", text: "فردا ساعت چند جلسه داریم؟", type: "received" },
//       { id: "2", text: "ساعت ۱۰ صبح", type: "sent" },
//     ],
//   });

//   const [selectedChat, setSelectedChat] = useState<Chat>(chatList[0]);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [searchError, setSearchError] = useState<string | null>(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);
//   const messages: Message[] = allMessages[selectedChat.id] || [];

//   const scrollToBottom = useCallback(() => {
//     const messageContainer = document.querySelector(".message-container");
//     if (messageContainer) {
//       messageContainer.scrollTop = messageContainer.scrollHeight;
//     }
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, scrollToBottom]);

//   const handleBackToChatList = () => {
//     setIsChatOpen(false);
//   };

//   const handleChatSelect = (chat: Chat) => {
//     setSelectedChat(chat);
//     setIsChatOpen(true);
//     setSearchQuery("");
//     setSearchResults([]);
//     setSearchError(null);
//   };

//   const handleRemoveChat = (chat: Chat) => {
//     setChatToDelete(chat);
//     setIsDialogOpen(true);
//   };

//   const confirmRemoveChat = () => {
//     if (!chatToDelete) return;

//     setChatList((prev) => prev.filter((c) => c.id !== chatToDelete.id));
//     setAllMessages((prev) => {
//       const newMessages = { ...prev };
//       delete newMessages[chatToDelete.id];
//       return newMessages;
//     });
//     if (selectedChat.id === chatToDelete.id) {
//       setSelectedChat(chatList[0] || null);
//       setIsChatOpen(false);
//     }
//     setIsDialogOpen(false);
//     setChatToDelete(null);
//   };

//   // Handle search API call (unchanged)
//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setSearchResults([]);
//       setSearchError(null);
//       return;
//     }

//     const searchUsers = async () => {
//       try {
//         const response = await fetch(`/api/users/search?query=${encodeURIComponent(searchQuery)}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }

//         const data = await response.json();
//         if (data.length === 0) {
//           setSearchError("No such person found");
//           setSearchResults([]);
//         } else {
//           setSearchResults(data);
//           setSearchError(null);
//         }
//       } catch (error) {
//         console.error("Search error:", error);
//         setSearchError("Error searching for users");
//         setSearchResults([]);
//       }
//     };

//     const timeoutId = setTimeout(searchUsers, 300);
//     return () => clearTimeout(timeoutId);
//   }, [searchQuery]);

//   const handleStartChat = async (user: SearchResult) => {
//     try {
//       const response = await fetch("/api/chats/start", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId: user.id }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to start chat");
//       }

//       const newChat = await response.json();
//       setChatList((prev) => [...prev, { id: newChat.id, name: newChat.name, lastMessage: "" }]);
//       setAllMessages((prev) => ({
//         ...prev,
//         [newChat.id]: [],
//       }));
//       setSelectedChat(newChat);
//       setIsChatOpen(true);
//       setSearchQuery("");
//       setSearchResults([]);
//       setSearchError(null);
//     } catch (error) {
//       console.error("Start chat error:", error);
//       setSearchError("Failed to start chat");
//     }
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "" || !selectedChat) return;

//     const newMsg: Message = {
//       id: String(messages.length + 1),
//       text: newMessage,
//       type: "sent",
//     };

//     setAllMessages((prev) => ({
//       ...prev,
//       [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
//     }));

//     setChatList((prev) =>
//       prev.map((chat) =>
//         chat.id === selectedChat.id ? { ...chat, lastMessage: newMessage } : chat
//       )
//     );

//     setNewMessage("");
//     scrollToBottom();
//   };

//   // Function to truncate long messages (unchanged)
//   const truncateMessage = (message: string, maxLength: number = 20) => {
//     if (message.length <= maxLength) return message;
//     return message.substring(0, maxLength) + "...";
//   };

//   return (
//     <div
//       className="flex flex-col md:flex-row mt-6 p-3 md:p-5 w-full max-w-[1080px] h-[87vh] gap-4 mx-auto rounded-2xl"
//       dir="rtl"
//     >
//       {/* Chat List */}
//       <div
//         className={`w-full md:w-[40%] h-[300px] md:h-full bg-white/40 rounded-2xl p-5 flex flex-col transition-all duration-400 ease-in-out ${
//           isChatOpen ? "hidden md:flex" : "flex"
//         }`}
//       >
//         {/* Search */}
//         <div className="relative mb-4">
//           <input
//             type="text"
//             placeholder="جستجوی مخاطب..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full py-[6px] pr-10 pl-4 text-right bg-gray-300 border hover:bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black transition-all duration-400 ease-in-out"
//           />
//           <button className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer">
//             <Search
//               size={18}
//               className="text-gray-500 hover:text-blue-600 transition-colors duration-400 ease-in-out"
//             />
//           </button>
//         </div>

//         {/* Search Results or Chat List */}
//         <div className="space-y-3 overflow-y-auto flex-1">
//           {searchQuery.trim() && searchResults.length > 0 ? (
//             searchResults.map((user) => (
//               <div
//                 key={user.id}
//                 onClick={() => handleStartChat(user)}
//                 className="flex items-center py-2 cursor-pointer rounded-xl hover:bg-blue-100 hover:shadow-md transition-all duration-400 ease-in-out bg-gray-300"
//               >
//                 <div className="relative mx-3">
//                   <img
//                     src={ProfileDefault}
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full"
//                   />
//                 </div>
//                 <div className="flex-1 text-right">
//                   <p className="text-md font-medium text-gray-800">{user.name}</p>
//                   <p className="text-[10px] text-gray-500">شروع چت جدید</p>
//                 </div>
//               </div>
//             ))
//           ) : searchQuery.trim() && searchError ? (
//             <p className="text-center text-gray-500 text-sm">{searchError}</p>
//           ) : (
//             chatList.map((chat) => (
//               <div
//                 key={chat.id}
//                 onClick={() => handleChatSelect(chat)}
//                 className={`flex items-center py-2 cursor-pointer rounded-xl hover:bg-blue-100 hover:shadow-md transition-all duration-400 ease-in-out ${
//                   selectedChat.id === chat.id ? "bg-gray-50" : "bg-gray-300"
//                 }`}
//               >
//                 <div className="relative mx-3">
//                   <img
//                     src={ProfileDefault}
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleRemoveChat(chat);
//                     }}
//                     className="absolute top-0 left-0 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
//                     aria-label={`حذف چت ${chat.name}`}
//                   >
//                     <X size={12} className="text-white" />
//                   </button>
//                 </div>
//                 <div className="flex-1 text-right flex flex-col">
//                   <p className="text-md font-medium text-gray-800">{chat.name}</p>
//                   <p className="text-[10px] text-gray-500">
//                     {truncateMessage(chat.lastMessage)}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Chat Window */}
//       <div
//         className={`flex flex-col flex-1 min-h-0 mt-4 md:mt-0 md:ml-3 ${
//           isChatOpen ? "flex" : "hidden md:flex"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex w-full h-[60px] md:h-[75px] bg-white/50 items-center rounded-t-2xl shadow-md">
//           <button
//             onClick={handleBackToChatList}
//             className="md:hidden text-gray-800 hover:text-blue-600 transition-colors duration-400 ease-in-out mr-2"
//           >
//             <ArrowRight size={24} />
//           </button>
//           <img
//             src={ProfileDefault}
//             alt="Profile"
//             className="w-10 h-10 rounded-full mx-3"
//           />
//           <h2 className="text-lg font-semibold text-gray-800">{selectedChat.name}</h2>
//         </div>

//         {/* Messages */}
//         <div
//           className="message-container flex flex-col w-full flex-1 p-3 md:p-5 overflow-y-auto relative rounded-b-2xl"
//           style={{
//             backgroundColor: "#1a2a44",
//             backgroundImage: `url(${bg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="flex-1 space-y-4">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`max-w-[70%] mb-4 p-3 rounded-2xl text-sm leading-relaxed shadow-md transition-all duration-400 ease-in-out ${
//                   message.type === "received"
//                     ? "bg-gray-200 text-gray-800 ml-auto rounded-tr-none"
//                     : "bg-blue-600 text-white mr-auto rounded-tl-none"
//                 }`}
//               >
//                 <p>{message.text}</p>
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <div className="sticky bottom-0 mt-3">
//             <div className="flex items-center bg-white rounded-full p-[4px] shadow-lg">
//               <button
//                 onClick={handleSendMessage}
//                 className="text-blue-600 pt-1 text-lg cursor-pointer px-3 hover:text-blue-800 transition-colors duration-400 ease-in-out"
//               >
//                 ➤
//               </button>
//               <input
//                 type="text"
//                 placeholder="پیامی بنویسید..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     handleSendMessage();
//                   }
//                 }}
//                 className="flex-1 border-none outline-none text-sm px-3 bg-transparent placeholder-gray-500 text-black transition-all duration-400 ease-in-out"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Dialog */}
//       <DeleteChatDialog
//         isOpen={isDialogOpen}
//         onClose={() => setIsDialogOpen(false)}
//         onConfirm={confirmRemoveChat}
//         chatName={chatToDelete?.name || ""}
//       />
//     </div>
//   );
// };

// export default Messages;