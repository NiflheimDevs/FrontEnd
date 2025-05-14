import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, X } from "lucide-react";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";

// Define interfaces
interface Chat {
  id: string;
  name: string;
  lastMessage: string;
}

interface Message {
  id: string;
  text: string;
  type: "sent" | "received";
  timestamp: string;
}

interface Messages {
  [key: string]: Message[];
}

interface SearchResult {
  id: string;
  name: string;
}

// Animation variants
const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

// Delete Chat Modal Component
const DeleteChatModal = ({
  isOpen,
  onClose,
  onConfirm,
  chatName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  chatName: string;
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg z-10"
        variants={modalVariants}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          حذف چت
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          آیا مطمئن هستید که می‌خواهید چت با{" "}
          <span className="font-medium">{chatName}</span> را حذف کنید؟
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            بله
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
          >
            لغو
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ChatMessageArea = () => {
  const [chatList, setChatList] = useState<Chat[]>([
    {
      id: "1",
      name: "ادمین",
      lastMessage: "سلام، چطور می‌توانم به شما کمک کنم؟",
    },
    { id: "2", name: "سبحان رنجبر", lastMessage: "پروژه جدید رو دیدی؟" },
    { id: "3", name: "کیارش سهرابی", lastMessage: "فردا ساعت چند جلسه داریم؟" },
  ]);

  const [allMessages, setAllMessages] = useState<Messages>({
    "1": [
      {
        id: "1",
        text: "سلام! چطور می‌توانم به شما کمک کنم؟",
        type: "received",
        timestamp: "2025-04-25T10:00:00",
      },
      {
        id: "2",
        text: "نیاز به کمک در پروژه‌ام دارم",
        type: "sent",
        timestamp: "2025-04-25T10:01:00",
      },
    ],
    "2": [
      {
        id: "1",
        text: "پروژه جدید رو دیدی؟",
        type: "received",
        timestamp: "2025-04-25T09:30:00",
      },
      {
        id: "2",
        text: "آره خیلی خوبه",
        type: "sent",
        timestamp: "2025-04-25T09:31:00",
      },
    ],
    "3": [
      {
        id: "1",
        text: "فردا ساعت چند جلسه داریم؟",
        type: "received",
        timestamp: "2025-04-25T08:00:00",
      },
      {
        id: "2",
        text: "ساعت ۱۰ صبح",
        type: "sent",
        timestamp: "2025-04-25T08:01:00",
      },
    ],
  });

  const [selectedChat, setSelectedChat] = useState<Chat | null>(chatList[0]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages: Message[] = selectedChat
    ? allMessages[selectedChat.id] || []
    : [];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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

  const handleRemoveChat = (chat: Chat) => {
    setChatToDelete(chat);
    setIsDialogOpen(true);
  };

  const confirmRemoveChat = () => {
    if (!chatToDelete) return;

    setChatList((prev) => prev.filter((c) => c.id !== chatToDelete.id));
    setAllMessages((prev) => {
      const newMessages = { ...prev };
      delete newMessages[chatToDelete.id];
      return newMessages;
    });

    if (selectedChat?.id === chatToDelete.id) {
      setSelectedChat(chatList[0] || null);
      setIsChatOpen(false);
    }

    setIsDialogOpen(false);
    setChatToDelete(null);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    try {
      const response = await fetch(
        `/api/users/search?query=${encodeURIComponent(searchQuery)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      if (data.length === 0) {
        setSearchError("هیچ کاربری یافت نشد");
        setSearchResults([]);
      } else {
        setSearchResults(data);
        setSearchError(null);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchError("خطا در جستجوی کاربران");
      setSearchResults([]);
    }
  };

  const handleStartChat = async (user: SearchResult) => {
    try {
      const response = await fetch("/api/chats/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to start chat");
      }

      const newChat = await response.json();
      setChatList((prev) => [
        ...prev,
        { id: newChat.id, name: newChat.name, lastMessage: "" },
      ]);
      setAllMessages((prev) => ({
        ...prev,
        [newChat.id]: [],
      }));
      setSelectedChat(newChat);
      setIsChatOpen(true);
      setSearchQuery("");
      setSearchResults([]);
      setSearchError(null);
    } catch (error) {
      console.error("Start chat error:", error);
      setSearchError("خطا در شروع چت");
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedChat) return;

    const newMsg: Message = {
      id: String(messages.length + 1),
      text: newMessage,
      type: "sent",
      timestamp: new Date().toISOString(),
    };

    setAllMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
    }));

    setChatList((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? { ...chat, lastMessage: newMessage }
          : chat
      )
    );

    setNewMessage("");
    scrollToBottom();
  };

  const truncateMessage = (message: string, maxLength: number = 20) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  return (
    <div
      className="flex flex-col md:flex-row mt-6 p-3 md:p-5 w-full max-w-[1080px] h-[85vh] gap-4 mx-auto rounded-2xl shadow-2xl bg-white"
      dir="rtl"
    >
      {/* Chat List */}
      <div
        className={`w-full md:w-[35%] h-full bg-gradient-to-b from-gray-100 to-gray-300 rounded-2xl p-5 flex flex-col transition-all duration-400 ${
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
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full py-3 pr-12 pl-4 text-right bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-sm shadow-sm transition-all duration-300"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer"
          >
            <Search
              size={20}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            />
          </button>
        </div>

        {/* Search Results or Chat List */}
        <div className="space-y-3 flex-1">
          {searchQuery.trim() && searchResults.length > 0 ? (
            searchResults.map((user) => (
              <motion.div
                key={user.id}
                onClick={() => handleStartChat(user)}
                className="flex items-center py-3 px-4 cursor-pointer rounded-xl bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={ProfileDefault}
                  alt="Profile"
                  className="w-10 h-10 min-w-10 min-h-10 rounded-full mx-3"
                />
                <div className="flex-1 text-right">
                  <p className="text-sm font-medium text-gray-800">
                    {user.name}
                  </p>
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
                onClick={() => handleChatSelect(chat)}
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
                      handleRemoveChat(chat);
                    }}
                    className="absolute -top-1 -left-1 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                    aria-label={`حذف چت ${chat.name}`}
                  >
                    <X size={12} className="text-white" />
                  </button>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm font-medium text-gray-800">
                    {chat.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">
                    {truncateMessage(chat.lastMessage)}
                  </p>
                </div>
              </motion.div>
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
        <div className="flex w-full h-[75px] bg-[#2466d7] text-white items-center rounded-t-2xl shadow-md">
          <button
            onClick={handleBackToChatList}
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

        {/* Messages */}
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

        {/* Input */}
        <div className="sticky bottom-0 mt-3 px-5 pb-5">
          <div className="flex items-center bg-gray-50 rounded-full p-2 shadow-lg">
            <input
              type="text"
              placeholder="پیامی بنویسید..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border-none outline-none text-sm px-4 bg-transparent placeholder-gray-500 text-black transition-all duration-300"
            />
            <motion.button
              onClick={handleSendMessage}
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
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteChatModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmRemoveChat}
        chatName={chatToDelete?.name || ""}
      />
    </div>
  );
};

export default ChatMessageArea;