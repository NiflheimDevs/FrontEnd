// src/components/ChatMessageArea/ChatMessageArea.tsx
import { useState, useCallback, useRef, useEffect } from "react";
import { Chat, Message , Messages, SearchResult } from "./types";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import DeleteChatModal from "./DeleteChatModal";

const ChatMessageArea = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [allMessages, setAllMessages] = useState<Messages>({});
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WebSocket API Integration: Initialize WebSocket connection
  // useEffect(() => {
  //   const ws = new WebSocket('ws://your-backend-url');
  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     // Handle incoming messages, e.g., update allMessages or chatList
  //     if (data.type === 'newMessage') {
  //       setAllMessages((prev) => ({
  //         ...prev,
  //         [data.chatId]: [...(prev[data.chatId] || []), data.message],
  //       }));
  //       setChatList((prev) =>
  //         prev.map((chat) =>
  //           chat.id === data.chatId ? { ...chat, lastMessage: data.message.text } : chat
  //         )
  //       );
  //     } else if (data.type === 'chatListUpdate') {
  //       setChatList(data.chats);
  //     }
  //   };
  //   return () => ws.close();
  // }, []);

  // WebSocket API Integration: Fetch initial chat list and messages
  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     try {
  //       const response = await fetch('/api/chats');
  //       const chats = await response.json();
  //       setChatList(chats);
  //       // Optionally fetch messages for each chat
  //       const messagesResponse = await fetch('/api/messages');
  //       const messages = await response.json();
  //       setAllMessages(messages);
  //       setSelectedChat(chats[0] || null);
  //     } catch (error) {
  //       console.error('Error fetching initial data:', error);
  //     }
  //   };
  //   fetchInitialData();
  // }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, allMessages, scrollToBottom]);

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

    // WebSocket API Integration: Notify backend to delete chat
    // const ws = new WebSocket('ws://your-backend-url');
    // ws.send(JSON.stringify({ type: 'deleteChat', chatId: chatToDelete.id }));

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

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    // WebSocket API Integration: Search users via WebSocket or REST
    // const ws = new WebSocket('ws://your-backend-url');
    // ws.send(JSON.stringify({ type: 'searchUsers', query }));
    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   if (data.error) {
    //     setSearchError(data.error);
    //     setSearchResults([]);
    //   } else {
    //     setSearchResults(data.users);
    //     setSearchError(null);
    //   }
    // };
    try {
      const response = await fetch(
        `/api/users/search?query=${encodeURIComponent(query)}`,
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
    // WebSocket API Integration: Start new chat via WebSocket or REST
    // const ws = new WebSocket('ws://your-backend-url');
    // ws.send(JSON.stringify({ type: 'startChat', userId: user.id }));
    // ws.onmessage = (event) => {
    //   const newChat = JSON.parse(event.data);
    //   setChatList((prev) => [...prev, { id: newChat.id, name: newChat.name, lastMessage: "" }]);
    //   setAllMessages((prev) => ({ ...prev, [newChat.id]: [] }));
    //   setSelectedChat(newChat);
    //   setIsChatOpen(true);
    //   setSearchQuery("");
    //   setSearchResults([]);
    //   setSearchError(null);
    // };
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

  const handleSendMessage = (text: string) => {
    if (text.trim() === "" || !selectedChat) return;

    const newMsg: Message = {
      id: String(Date.now()), // Use a unique ID, ideally from backend
      text,
      type: "sent",
      timestamp: new Date().toISOString(),
    };

    // WebSocket API Integration: Send message via WebSocket
    // const ws = new WebSocket('ws://your-backend-url');
    // ws.send(JSON.stringify({ type: 'sendMessage', chatId: selectedChat.id, message: newMsg }));

    setAllMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
    }));

    setChatList((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id ? { ...chat, lastMessage: text } : chat
      )
    );
  };

  return (
    <div
      className="flex flex-col md:flex-row mt-6 p-3 md:p-5 w-full max-w-[1080px] h-[85vh] gap-4 mx-auto rounded-2xl shadow-2xl bg-white"
      dir="rtl"
    >
      <ChatList
        isChatOpen={isChatOpen}
        chatList={chatList}
        selectedChat={selectedChat}
        searchQuery={searchQuery}
        searchResults={searchResults}
        searchError={searchError}
        onSearch={handleSearch}
        onChatSelect={handleChatSelect}
        onRemoveChat={handleRemoveChat}
        onStartChat={handleStartChat}
      />
      <ChatWindow
        isChatOpen={isChatOpen}
        selectedChat={selectedChat}
        messages={selectedChat ? allMessages[selectedChat.id] || [] : []}
        onSendMessage={handleSendMessage}
        onBackToChatList={() => setIsChatOpen(false)}
        messagesEndRef={messagesEndRef}
      />
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