/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";
import { getChats, getRoomMessages } from "../../API";
import { useLocation } from "react-router-dom";

interface Chat {
  id: string;
  name: string;
  user_id: string;
  username: string;
}

interface Message {
  id: string;
  text: string;
  user_id: string;
  timestamp: string;
  type: "sent" | "received";
}

interface LocationState {
  roomId?: string;
  targetUser?: { id: string; name: string };
}

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const generateUniqueId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const getDisplayName = (chat: Chat) => {
  return chat.name && chat.name.trim() !== "" ? chat.name : chat.username;
};

const ChatMessageArea = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const location = useLocation();
  const locationState = location.state as LocationState;

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const setupWebSocket = useCallback((chat: Chat) => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication token not found");
      return;
    }

    const wsUrl = `wss://103.75.196.227:8080/ws/chat/${Number(chat.id)}/token/${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () =>
      console.log(`WebSocket connected for chat ID: ${chat.id}`);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat" && data.content) {
          setMessages((prev) => [
            ...prev,
            {
              id: generateUniqueId(),
              text: data.content,
              user_id: String(data.sender_id),
              timestamp: new Date().toISOString(),
              type:
                String(data.sender_id) === chat.user_id ? "received" : "sent",
            },
          ]);
          scrollToBottom();
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
        setError("Failed to process incoming message");
      }
    };

    ws.onerror = () => setError("Internet Connection not established");
    ws.onclose = () => console.log(`WebSocket closed for chat ID: ${chat.id}`);
    wsRef.current = ws;
  }, []);

  const formatMessages = (msgs: any[], chat: Chat): Message[] => {
    if (!msgs || !Array.isArray(msgs)) {
      return [];
    }
    return msgs.map((m, index) => ({
      id: `${m.SendTime}-${index}`,
      text: m.Content,
      user_id: String(m.SenderID),
      timestamp: m.SendTime,
      type: String(m.SenderID) === chat.user_id ? "received" : "sent",
    }));
  };

  const loadMessages = useCallback(async (chat: Chat) => {
    try {
      const msgs = await getRoomMessages(chat.id);
      const formatted = formatMessages(msgs, chat);
      setMessages(formatted);
      setError(null);
      scrollToBottom();
    } catch (error) {
      console.error("Error loading messages:", error);
      setError("Failed to load messages");
    }
  }, []);

  const handleChatSelect = useCallback(
    async (chat: Chat) => {
      setSelectedChat(chat);
      setIsChatOpen(true);
      setupWebSocket(chat);
      await loadMessages(chat);
    },
    [setupWebSocket, loadMessages]
  );

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !selectedChat || !wsRef.current) return;

    const message = {
      type: "chat",
      room_id: Number(selectedChat.id),
      content: newMessage,
    };

    try {
      wsRef.current.send(JSON.stringify(message));
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    }
  }, [newMessage, selectedChat]);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await getChats();
        if (!Array.isArray(data)) {
          setError("Invalid chat data received");
          return;
        }

        const chats: Chat[] = data.map((item: any) => ({
          id: String(item.room_id),
          user_id: String(item.user_id),
          name: `${item.firstname} ${item.lastname}`.trim(),
          username: item.username,
        }));

        const { roomId, targetUser } = locationState || {};
        if (roomId && targetUser) {
          const chatExists = chats.some(
            (chat) => String(chat.id) === String(roomId)
          );
          if (!chatExists) {
            chats.push({
              id: String(roomId),
              user_id: String(targetUser.id),
              name: targetUser.name,
              username: "",
            });
          }
          const selected =
            chats.find((chat) => String(chat.id) === String(roomId)) ||
            chats[0];
          setChatList(chats);
          await handleChatSelect(selected);
        } else if (chats.length > 0) {
          setChatList(chats);
          await handleChatSelect(chats[0]);
        } else {
          setChatList([]);
          setError("No chats available");
        }
      } catch (error) {
        console.error("Error fetching chat list:", error);
        setError("Failed to load chats");
      }
    };

    loadChats();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [handleChatSelect]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div
      className="flex flex-col md:flex-row mt-6 p-3 md:p-5 w-full max-w-[1080px] h-[85vh] gap-4 mx-auto rounded-2xl shadow-2xl bg-white dark:bg-gray-900"
      dir="rtl"
    >
      {/* Chat List */}
      <div
        className={`w-full md:w-[35%] h-full bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700 rounded-2xl p-5 flex flex-col transition-all duration-400 ${
          isChatOpen ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
          {chatList.length > 0 ? (
            chatList.map((chat) => (
              <motion.div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`flex items-center py-3 px-4 cursor-pointer rounded-xl transition-all duration-300 ${
                  selectedChat?.id === chat.id
                    ? "bg-blue-50 dark:bg-blue-800/40 shadow-md"
                    : "bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-800/30"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={ProfileDefault}
                  alt="Profile"
                  className="w-10 h-10 min-w-10 min-h-10 rounded-full mx-3"
                />
                <div className="flex-1 text-right">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {getDisplayName(chat)}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
              No chats available
            </p>
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
        <div className="flex w-full h-[75px] bg-blue-700 text-white items-center rounded-t-2xl shadow-md dark:bg-blue-900">
          <button
            onClick={() => setIsChatOpen(false)}
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
            {selectedChat ? getDisplayName(selectedChat) : "Select a chat"}
          </h2>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex flex-col w-full flex-1 p-5 bg-gray-200 dark:bg-gray-800 rounded-b-2xl overflow-y-auto"
        >
          {error && (
            <p className="text-center text-red-500 dark:text-red-400 text-sm mt-2">
              {error}
            </p>
          )}
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
                      ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 mr-auto rounded-tl-none"
                      : "bg-blue-600 dark:bg-blue-700 text-white ml-auto rounded-tr-none"
                  }`}
                >
                  <p className="break-all">{message.text}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-300 mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
                No messages yet
              </p>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="sticky bottom-0 mt-3 px-5 pb-5">
          <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-full border-2 border-blue-600 dark:border-blue-700 p-2 shadow-lg">
            <input
              type="text"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border-none outline-none text-sm px-4 bg-transparent placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-gray-100"
            />
            <motion.button
              onClick={handleSendMessage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!newMessage.trim() || !selectedChat}
              className="cursor-pointer bg-blue-600 dark:bg-blue-700 text-white rounded-full p-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
};

export default ChatMessageArea;
