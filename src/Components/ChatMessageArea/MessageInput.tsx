// src/components/ChatMessageArea/MessageInput.tsx
import { motion } from "framer-motion";
import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="sticky bottom-0 mt-3 px-5 pb-5">
      <div className="flex items-center bg-gray-50 rounded-full border-2 border-blue-600 p-2 shadow-lg">
        <input
          type="text"
          placeholder="پیامی بنویسید..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border-none outline-none text-sm px-4 bg-transparent placeholder-gray-500 text-black transition-all duration-300"
        />
        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer bg-blue-600 text-white rounded-full p-2 hover:shadow-lg transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default MessageInput;