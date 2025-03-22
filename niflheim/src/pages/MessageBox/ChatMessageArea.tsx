import React from "react";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png"; // Default profile image
import bg from "@/assets/message/bg.png"; // Pet-themed background image

const Messages = () => {
  // Sample data for the chat list (replace with your data)
  const chatList = [
    {
      id: 1,
      name: "الناز",
      lastMessage: "سلام، چطور می‌توانم به شما کمک کنم؟",
    },
    { id: 2, name: "سحر زارع", lastMessage: "پروژه جدید رو دیدی؟" },
    { id: 3, name: "کیمیا صمدی", lastMessage: "فردا ساعت چند جلسه داریم؟" },
  ];

  // Sample messages for the selected chat (replace with your data)
  const messages = [
    { id: 1, text: "سلام! چطور می‌توانم به شما کمک کنم؟", type: "received" },
    {
      id: 2,
      text: "سلام، من به کمک در مورد پروژه‌ام نیاز دارم。",
      type: "sent",
    },
  ];

  return (
    <div className="flex mt-16 p-5 self-center">
      {/* Wrapper for Chat List and Message Area to make them a single unit */}
      <div className="flex flex-1 rounded-2xl border-2 border-transparent relative">
        {/* Gradient border effect for the entire unit */}
        <div className="absolute inset-0 -m-[2px] bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl z-[-1]"></div>

        {/* Right Section: Chat List */}
        <div className="w-[340px] h-[800px] bg-white/40 rounded-tr-2xl rounded-br-2xl p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">پیام‌ها</h3>
          <div className="space-y-3 overflow-y-auto h-[calc(800px-80px)]">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300"
              >
                <img
                  src={ProfileDefault}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {chat.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Section: Message Area */}
        <div className="flex flex-col">
          {/* Chat Header */}
          <div className="flex w-[639px] h-[75px] items-center bg-white/40 rounded-tl-2xl p-3">
            <img
              src={ProfileDefault}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">سحر زارع</h2>
          </div>

          {/* Message Area */}
          <div
            className="bg-[#1a2a44] flex flex-col w-[639px] h-[725px] rounded-bl-2xl p-5 overflow-y-auto"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundRepeat: "repeat", // Ensure the background repeats to fill the area
              backgroundSize: "auto", // Let the pattern repeat naturally
              backgroundClip: "padding-box",
            }}
          >
            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[60%] mb-4 p-3 rounded-2xl text-sm leading-relaxed ${
                  message.type === "received"
                    ? "bg-gray-200 text-gray-800 mr-auto rounded-tl-none"
                    : "bg-blue-600 text-white ml-auto rounded-tr-none"
                }`}
              >
                <p>{message.text}</p>
              </div>
            ))}

            {/* Input Area */}
            <div className="flex items-center bg-white rounded-full p-[4px] mt-2">
              <button className="text-blue-600 pt-1 text-lg cursor-pointer">
                ➤
                Li
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border-none outline-none text-sm px-3 bg-transparent placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
