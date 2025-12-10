"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send, Bot, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FloatingContact() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-3">
        {/* AI Chatbot */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowChatbot(!showChatbot)}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
          >
            <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </button>
        </motion.div>

        {/* Telegram */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            href="https://t.me/vebdream"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0088cc] text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
          >
            <Send className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Chatbot Widget */}
      {showChatbot && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed bottom-24 left-8 z-50 w-96 h-[500px] bg-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-white">VebDream Assistant</span>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="p-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <iframe
            src="/chatbot"
            className="w-full flex-1"
            title="VebDream Chatbot"
          />
        </motion.div>
      )}
    </>
  );
}
