"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Sparkles, Save, RotateCcw, Loader2 } from "lucide-react";

export default function BlogAISettingsPage() {
  const [settings, setSettings] = useState({
    autoGenerate: true,
    generateHour: "10:00",
    postsPerDay: 3,
    categories: ["Texnologiya", "Dasturlash", "Sun'iy Intellekt"],
    language: "uz",
    minWords: 800,
    maxWords: 1500,
    includeImages: true,
    seoOptimized: true,
    tone: "professional",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Blog AI Sozlamalari
            </h1>
            <p className="text-gray-400">
              AI yordamida blog post generatsiya sozlamalari
            </p>
          </div>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saved ? "Saqlandi ✓" : "Saqlash"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Auto Generate */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Avtomatik Generatsiya</h3>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoGenerate}
                  onChange={(e) => setSettings({...settings, autoGenerate: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <span className="text-gray-300">Avtomatik post yaratish</span>
              </label>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Kuniga nechta post</label>
                <select 
                  value={settings.postsPerDay}
                  onChange={(e) => setSettings({...settings, postsPerDay: Number(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                >
                  <option value={1}>1 ta</option>
                  <option value={2}>2 ta</option>
                  <option value={3}>3 ta</option>
                  <option value={5}>5 ta</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Generatsiya vaqti</label>
                <input
                  type="time"
                  value={settings.generateHour}
                  onChange={(e) => setSettings({...settings, generateHour: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Content Settings */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <h3 className="text-lg font-semibold text-white mb-4">Kontent Sozlamalari</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Til</label>
                <select 
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                >
                  <option value="uz">O'zbek</option>
                  <option value="ru">Rus</option>
                  <option value="en">Ingliz</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Ton</label>
                <select 
                  value={settings.tone}
                  onChange={(e) => setSettings({...settings, tone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Oddiy</option>
                  <option value="educational">Ta'limiy</option>
                  <option value="entertaining">Qiziqarli</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Min so'z</label>
                  <input
                    type="number"
                    value={settings.minWords}
                    onChange={(e) => setSettings({...settings, minWords: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Max so'z</label>
                  <input
                    type="number"
                    value={settings.maxWords}
                    onChange={(e) => setSettings({...settings, maxWords: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEO & Images */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <h3 className="text-lg font-semibold text-white mb-4">SEO va Rasmlar</h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.seoOptimized}
                  onChange={(e) => setSettings({...settings, seoOptimized: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <span className="text-gray-300">SEO optimizatsiya qilish</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.includeImages}
                  onChange={(e) => setSettings({...settings, includeImages: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <span className="text-gray-300">Rasmlar qo'shish (Unsplash)</span>
              </label>
            </div>
          </div>

          {/* API Status */}
          <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
            <h3 className="text-lg font-semibold text-white mb-4">API Holati</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Gemini API</span>
                <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Faol ✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Unsplash API</span>
                <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Faol ✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Cron Jobs</span>
                <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Ishlayapti ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
