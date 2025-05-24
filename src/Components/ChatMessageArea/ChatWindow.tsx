// src/components/ChatMessageArea/ChatWindow.tsx
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";
import { Chat, Message } from "./types";
import MessageInput from "./MessageInput";

interface ChatWindowProps {
  isChatOpen: boolean;
  selectedChat: Chat | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBackToChatList: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const ChatWindow = ({
  isChatOpen,
  selectedChat,
  messages,
  onSendMessage,
  onBackToChatList,
  messagesEndRef,
}: ChatWindowProps) => {
  return (
    <div
      className={`flex flex-col flex-1 min-h-0 mt-4 md:mt-0 md:ml-3 ${
        isChatOpen ? "flex" : "hidden md:flex"
      }`}
    >
      <div className="flex w-full h-[75px] bg-[#2466d7] text-white items-center rounded-t-2xl shadow-md">
        <button
          onClick={onBackToChatList}
          className="md:hidden text-white hover:text-gray-200 transition-colors duration-300 mr-2"
        >
          <ArrowRight className="cursor-pointer" size={24} />
        </button>
        <img
          src={ProfileDefault}
          alt="Profile"
          className="w-10 h-10 rounded-full mx-3"
        />
        <h2 className="text-lg font-semibold">
          {selectedChat?.name || "انتخاب چت"}
        </h2>
      </div>
      <div className="flex flex-col w-full flex-1 p-5 bg-gray-200 rounded-b-2xl overflow-y-auto">
        <AnimatePresence>
          {messages.length > 0 ? (
            messages.map((message) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                className={`max-w-[70%] mb-4 p-3 rounded-2xl text-sm leading-relaxed shadow-md transition-all duration-300 ${
                  message.type === "received"
                    ? "bg-white text-gray-800 mr-auto rounded-tl-none"
                    : "bg-[#2466d7] text-white ml-auto rounded-tr-none"
                }`}
              >
                <p className="break-all">{message.text}</p>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {new Date(message.timestamp).toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm mt-10">
              هنوز پیامی وجود ندارد
            </p>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;