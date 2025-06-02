import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProfileDefault from "@/assets/Dashboard/DefaultProfile.png";
import { getChats, getRoomMessages } from "../../API";

interface Chat {
  id: string;
  name: string;
  user_id: string;
}

interface Message {
  id: string;
  text: string;
  user_id: string;
  timestamp: string;
  type: "sent" | "received";
}

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const ChatMessageArea = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await getChats();
        if (!data || !Array.isArray(data)) {
          setChatList([]);
          return;
        }
        const chats: Chat[] = data.map((item: any) => ({
          id: String(item["room_id"]),
          user_id: String(item["user_id"]),
          name: `${item.firstname} ${item.lastname}`,
        }));
        setChatList(chats);
        if (chats.length > 0) {
          setSelectedChat(chats[0]);
          setSelectedUserId(chats[0].user_id);
          const msgs = await getRoomMessages(chats[0].id);
          if (!msgs || !Array.isArray(msgs)) {
            setMessages([]);
            return;
          }
          const formatted = msgs.map((m: any, index: number) => ({
            id: `${m.SendTime}-${index}`,
            text: m.Content,
            user_id: String(m.SenderID),
            timestamp: m.SendTime,
            type: (String(m.SenderID) === chats[0].user_id
              ? "received"
              : "sent") as "received" | "sent",
          }));

          setMessages(formatted);
          //2 below lines to make the first one set and ready to send message
          setIsChatOpen(true); //added with no ui not sure if works
          setupWebSocket(chats[0].id); //added with no ui not sure if works
        }
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };
    loadChats();
  }, []);

  const handleChatSelect = async (chat: Chat) => {
    try {
      setSelectedChat(chat);
      setSelectedUserId(chat.user_id);
      const msgs = await getRoomMessages(chat.id);
      if (!msgs || !Array.isArray(msgs)) {
        console.error("Messages data is not an array or is null", msgs);
        setMessages([]);
        return;
      }
      const formatted = msgs.map((m: any, index: number) => ({
        id: `${m.SendTime}-${index}`,
        text: m.Content,
        user_id: String(m.SenderID),
        timestamp: m.SendTime,
        type: (String(m.SenderID) === chat.user_id ? "received" : "sent") as
          | "received"
          | "sent",
      }));
      setMessages(formatted);
      setIsChatOpen(true);
      setupWebSocket(chat.id);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const setupWebSocket = (roomId: string) => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    const token = localStorage.getItem("authToken");
    const ws = new WebSocket(
      `wss://103.75.196.227:8080/ws/chat/${Number(roomId)}/token/${token}`
    );
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat" && data.content) {
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            text: data.content,
            user_id: selectedUserId || "",
            timestamp: new Date().toISOString(),
            type: "received",
          },
        ]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat || !wsRef.current) return;

    const message = {
      type: "chat",
      room_id: Number(selectedChat.id),
      content: newMessage,
    };

    wsRef.current.send(JSON.stringify(message));
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        text: newMessage,
        user_id: selectedUserId || "",
        timestamp: new Date().toISOString(),
        type: "sent",
      },
    ]);
    setNewMessage("");
    scrollToBottom();
  };

  return (
    <div
      className="flex flex-col md:flex-row mt-6 p-3 md:p-5 w-full max-w-[1080px] h-[85vh] gap-4 mx-auto rounded-2xl shadow-2xl bg-white"
      dir="rtl"
    >
      {/* Chat List */}
      <div
        className={`w-full md:w-[35%] h-full bg-gradient-to-b from-gray-100 to-gray-300 rounded-2xl p-5 flex flex-col transition-all duration-400 ${isChatOpen ? "hidden md:flex" : "flex"}`}
      >
        <div className="space-y-3 flex-1">
          {chatList.map((chat) => (
            <motion.div
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              className={`flex items-center py-3 px-4 cursor-pointer rounded-xl transition-all overflow-x-hidden duration-300 ${selectedChat?.id === chat.id ? "bg-blue-50 shadow-md" : "bg-white hover:bg-blue-50"}`}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={ProfileDefault}
                alt="Profile"
                className="w-10 h-10 min-w-10 min-h-10 rounded-full mx-3"
              />
              <div className="flex-1 text-right">
                <p className="text-sm font-medium text-gray-800">{chat.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`flex flex-col flex-1 min-h-0 mt-4 md:mt-0 md:ml-3 ${isChatOpen ? "flex" : "hidden md:flex"}`}
      >
        {/* Header */}
        <div className="flex w-full h-[75px] bg-[#2466d7] text-white items-center rounded-t-2xl shadow-md">
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
          <div className="flex items-center bg-gray-50 rounded-full border-2 border-blue-600 p-2 shadow-lg">
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
    </div>
  );
};

export default ChatMessageArea;
