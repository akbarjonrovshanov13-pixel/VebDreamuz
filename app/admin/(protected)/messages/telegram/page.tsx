"use client";

import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Send, User, Bot, Search, MoreVertical } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  userName?: string;
}

interface Chat {
  id: string;
  userName: string
  lastMessage: string;
  unread: number;
  timestamp: Date;
}

const mockChats: Chat[] = [
  { id: "1", userName: "Alisher", lastMessage: "Rahmat!", unread: 0, timestamp: new Date() },
  { id: "2", userName: "Nodira", lastMessage: "Qanday buyurtma qilsam bo'ladi?", unread: 2, timestamp: new Date() },
  { id: "3", userName: "Jasur", lastMessage: "Narxlar haqida ma'lumot bering", unread: 1, timestamp: new Date() },
  { id: "4", userName: "Dilnoza", lastMessage: "Assalomu alaykum", unread: 0, timestamp: new Date() },
];

const mockMessages: Message[] = [
  { id: "1", text: "Assalomu alaykum!", sender: "user", timestamp: new Date(), userName: "Nodira" },
  { id: "2", text: "Vaalaykum assalom! VebDream xizmatiga xush kelibsiz! Sizga qanday yordam bera olaman?", sender: "bot", timestamp: new Date() },
  { id: "3", text: "Qanday buyurtma qilsam bo'ladi?", sender: "user", timestamp: new Date(), userName: "Nodira" },
];

export default function TelegramChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[1]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const msg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "bot",
      timestamp: new Date(),
    };
    
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const filteredChats = mockChats.filter(chat => 
    chat.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Telegram Chat
          </h1>
          <p className="text-gray-400">
            Foydalanuvchilar bilan muloqot
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Chat List */}
          <div className="col-span-4 rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Qidirish..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-72px)]">
              {filteredChats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${
                    selectedChat?.id === chat.id ? 'bg-cyan-500/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      {chat.userName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium truncate">{chat.userName}</p>
                        {chat.unread > 0 && (
                          <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="col-span-8 rounded-2xl border border-white/10 overflow-hidden flex flex-col" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            {selectedChat ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      {selectedChat.userName[0]}
                    </div>
                    <div>
                      <p className="text-white font-medium">{selectedChat.userName}</p>
                      <p className="text-green-400 text-xs">Online</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'bot' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] p-3 rounded-2xl ${
                        msg.sender === 'bot' 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                          : 'bg-white/10 text-white'
                      }`}>
                        {msg.sender === 'user' && (
                          <p className="text-cyan-400 text-xs mb-1">{msg.userName}</p>
                        )}
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'bot' ? 'text-white/70' : 'text-gray-500'}`}>
                          {msg.timestamp.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Xabar yozing..."
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                    <Button 
                      onClick={handleSend}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Chatni tanlang
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
