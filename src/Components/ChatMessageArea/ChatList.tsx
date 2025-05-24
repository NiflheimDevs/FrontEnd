// src/components/ChatMessageArea/ChatList.tsx
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";
import { Chat, SearchResult } from "./types";
import SearchBar from "./SearchBar";

interface ChatListProps {
  isChatOpen: boolean;
  chatList: Chat[];
  selectedChat: Chat | null;
  searchQuery: string;
  searchResults: SearchResult[];
  searchError: string | null;
  onSearch: (query: string) => void;
  onChatSelect: (chat: Chat) => void;
  onRemoveChat: (chat: Chat) => void;
  onStartChat: (user: SearchResult) => void;
}

const ChatList = ({
  isChatOpen,
  chatList,
  selectedChat,
  searchQuery,
  searchResults,
  searchError,
  onSearch,
  onChatSelect,
  onRemoveChat,
  onStartChat,
}: ChatListProps) => {
  const truncateMessage = (message: string, maxLength: number = 20) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  return (
    <div
      className={`w-full md:w-[35%] h-full bg-gradient-to-b from-gray-100 to-gray-300 rounded-2xl p-5 flex flex-col transition-all duration-400 ${
        isChatOpen ? "hidden md:flex" : "flex"
      }`}
    >
      <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
      <div className="space-y-3 flex-1">
        {searchQuery.trim() && searchResults.length > 0 ? (
          searchResults.map((user) => (
            <motion.div
              key={user.id}
              onClick={() => onStartChat(user)}
              className="flex items-center py-3 px-4 cursor-pointer rounded-xl bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={ProfileDefault}
                alt="Profile"
                className="w-10 h-10 min-w-10 min-h-10 rounded-full mx-3"
              />
              <div className="flex-1 text-right">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">شروع چت جدید</p>
              </div>
            </motion.div>
          ))
        ) : searchQuery.trim() && searchError ? (
          <p className="text-center text-gray-500 text-sm">{searchError}</p>
        ) : (
          chatList.map((chat) => (
            <motion.div
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={`flex items-center py-3 px-4 cursor-pointer rounded-xl transition-all overflow-x-hidden duration-300 ${
                selectedChat?.id === chat.id
                  ? "bg-blue-50 shadow-md"
                  : "bg-white hover:bg-blue-50"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative mx-1">
                <img
                  src={ProfileDefault}
                  alt="Profile"
                  className="w-10 h-10 min-w-10 min-h-10 rounded-full"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveChat(chat);
                  }}
                  className="absolute -top-1 -left-1 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                  aria-label={`حذف چت ${chat.name}`}
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm font-medium text-gray-800">{chat.name}</p>
                <p className="text-xs text-gray-500 truncate max-w-[200px]">
                  {truncateMessage(chat.lastMessage)}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;