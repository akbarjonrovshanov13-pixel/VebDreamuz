"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Save, Bot, MessageSquare, Users, Loader2, CheckCircle, Power } from "lucide-react";

export default function TelegramBotSettingsPage() {
  const [settings, setSettings] = useState({
    botToken: "7677237553:AAE*********************",
    botUsername: "@vebdream_bot",
    channelId: "-1002768802284",
    adminId: "1021369079",
    welcomeMessage: "👋 Salom! Men VebDream botman. Sizga qanday yordam bera olaman?",
    autoReply: true,
    notifyOnNewOrder: true,
    notifyOnNewContact: true,
    aiResponses: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [botStatus, setBotStatus] = useState<"running" | "stopped">("running");

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleBot = () => {
    setBotStatus(botStatus === "running" ? "stopped" : "running");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Telegram Bot Sozlamalari
            </h1>
            <p className="text-gray-400">
              Telegram bot konfiguratsiyasi
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={toggleBot}
              variant={botStatus === "running" ? "outline" : "default"}
              className={botStatus === "running" ? "border-green-500/30 text-green-400" : "bg-red-500"}
            >
              <Power className="w-4 h-4 mr-2" />
              {botStatus === "running" ? "Bot ishlayapti" : "Bot to'xtagan"}
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-cyan-500 to-blue-500"
            >
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {saved ? "Saqlandi ✓" : "Saqlash"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bot Credentials */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Bot Ma'lumotlari</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Bot Token</label>
                <input
                  type="password"
                  value={settings.botToken}
                  onChange={(e) => setSettings({...settings, botToken: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
                <p className="text-gray-500 text-xs mt-1">@BotFather dan oling</p>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Bot Username</label>
                <input
                  type="text"
                  value={settings.botUsername}
                  onChange={(e) => setSettings({...settings, botUsername: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Channel Settings */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Kanal Sozlamalari</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Channel ID</label>
                <input
                  type="text"
                  value={settings.channelId}
                  onChange={(e) => setSettings({...settings, channelId: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Admin ID</label>
                <input
                  type="text"
                  value={settings.adminId}
                  onChange={(e) => setSettings({...settings, adminId: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Xabarlar</h3>
            </div>
            
            <div>
              <label className="text-gray-400 text-sm block mb-2">Salomlash xabari</label>
              <textarea
                value={settings.welcomeMessage}
                onChange={(e) => setSettings({...settings, welcomeMessage: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white h-24 resize-none"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <h3 className="text-lg font-semibold text-white mb-6">Bildirishnomalar</h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoReply}
                  onChange={(e) => setSettings({...settings, autoReply: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <span className="text-gray-300">Avtomatik javob berish</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.aiResponses}
                  onChange={(e) => setSettings({...settings, aiResponses: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <span className="text-gray-300">AI yordamida javob berish</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifyOnNewOrder}
                  onChange={(e) => setSettings({...settings, notifyOnNewOrder: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <span className="text-gray-300">Yangi buyurtmada xabar yuborish</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifyOnNewContact}
                  onChange={(e) => setSettings({...settings, notifyOnNewContact: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <span className="text-gray-300">Yangi kontaktda xabar yuborish</span>
              </label>
            </div>
          </div>

          {/* Status */}
          <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Bot Holati</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-white font-medium">Bot</p>
                <p className="text-green-400 text-sm">Online</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-white font-medium">Foydalanuvchilar</p>
                <p className="text-cyan-400 text-sm">156 ta</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-white font-medium">Xabarlar</p>
                <p className="text-purple-400 text-sm">1,234 ta</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-2">
                  <Bot className="w-6 h-6 text-orange-400" />
                </div>
                <p className="text-white font-medium">Komandalar</p>
                <p className="text-orange-400 text-sm">12 ta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
