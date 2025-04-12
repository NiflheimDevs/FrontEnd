import { useState } from "react";
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
  type: "sent" | "received"; // Use a union type for specific values
}

// Define the type for allMessages with an index signature or specific keys
interface Messages {
  [key: number]: Message[]; // Allows any number as a key
  // Alternatively, use specific keys: 1: Message[]; 2: Message[]; 3: Message[];
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
  const messages: Message[] = allMessages[selectedChat.id] || [];

  const handleBackToChatList = () => {
    setIsChatOpen(false);
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setIsChatOpen(true);
  };

  return (
    <div
      className="flex flex-col md:flex-row mt-6 p-3 md:p-5 w-full max-w-[1080px] h-[88vh] gap-4 mx-auto rounded-2xl"
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
            placeholder="جستجو"
            className="w-full py-[6px] pr-10 pl-4 text-right bg-gray-300 border hover:bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black transition-all duration-400 ease-in-out"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer">
            <Search
              size={18}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-400 ease-in-out"
            />
          </button>
        </div>

        {/* Chat Items */}
        <div className="space-y-3 overflow-y-auto flex-1">
          {chatList.map((chat) => (
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
          ))}
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