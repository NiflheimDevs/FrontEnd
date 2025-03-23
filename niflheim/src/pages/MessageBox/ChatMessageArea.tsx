import React, { useState } from "react";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";
import bg from "@/assets/message/bg.png";
import { Search } from "lucide-react";

const Messages = () => {
  const chatList = [
    { id: 1, name: "ادمین", lastMessage: "سلام، چطور می‌توانم به شما کمک کنم؟" },
    { id: 2, name: "سبحان رنجبر", lastMessage: "پروژه جدید رو دیدی؟" },
    { id: 3, name: "کیارش سهرابی", lastMessage: "فردا ساعت چند جلسه داریم؟" },
  ];

  const allMessages = {
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

  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const messages = allMessages[selectedChat.id] || [];

  return (
    <div
      className="flex flex-col md:flex-row mt-6 p-3 md:p-5 w-full max-w-[1080px] h-[88vh] mx-auto"
      dir="rtl"
    >
      {/* Chat List */}
      <div className="w-full md:w-[340px] h-[300px] md:h-full bg-white/40 md:rounded-tr-2xl md:rounded-br-2xl p-5 flex flex-col">
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="جستجو"
            className="border border-gray-500 py-[6px] pr-10 pl-4 rounded-sm w-full text-right bg-[#D9D9D9]/20 placeholder-black"
          />
          <button className="absolute right-3 top-0 bottom-0 flex items-center cursor-pointer">
            <Search size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Chat Items */}
        <div className="space-y-3 overflow-auto flex-1">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center border-b border-[#D9D9D9] p-2 justify-end cursor-pointer transition-all duration-300 rounded-md ${
                selectedChat.id === chat.id ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex-1 text-right">
                <p className="text-md font-medium text-gray-800">{chat.name}</p>
                <p className="text-[10px]">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex flex-col flex-1 min-h-0 mt-4 md:mt-0 md:ml-3">
        {/* Header */}
        <div className="flex w-full h-[60px] md:h-[75px] border border-black items-center bg-white/50 md:rounded-tl-2xl p-3">
          <img
            src={ProfileDefault}
            alt="Profile"
            className="w-10 h-10 rounded-full ml-3"
          />
          <h2 className="text-lg font-semibold text-gray-800">{selectedChat.name}</h2>
        </div>

        {/* Messages */}
        <div
          className="flex flex-col w-full flex-1 p-3 md:p-5 overflow-y-auto relative"
          style={{
            backgroundColor: "#1a2a44",
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "16px",
          }}
        >
          <div className="flex-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[70%] mb-4 p-3 rounded-2xl text-sm leading-relaxed ${
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
            <div className="flex items-center bg-white rounded-full p-[4px] w-full">
              <button className="text-blue-600 pt-1 text-lg cursor-pointer">➤</button>
              <input
                type="text"
                placeholder="پیامی بنویسید..."
                className="flex-1 border-none outline-none text-sm px-3 bg-transparent placeholder-gray-500 text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
