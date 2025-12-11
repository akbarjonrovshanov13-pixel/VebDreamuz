"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Save, Search, Globe, FileText, Loader2 } from "lucide-react";

export default function SEOSettingsPage() {
  const [settings, setSettings] = useState({
    defaultTitle: "VebDream - Professional Veb Saytlar Yaratish",
    defaultDescription: "O'zbekistonda eng yaxshi veb-saytlar, mobil ilovalar va Telegram botlar yaratish xizmati. AI yordamida zamonaviy yechimlar.",
    defaultKeywords: "veb sayt, mobil ilova, telegram bot, dasturlash, o'zbekiston, veb dizayn",
    googleVerification: "",
    yandexVerification: "",
    bingVerification: "",
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://vebdream.onrender.com/sitemap.xml",
    structuredData: true,
    openGraph: true,
    twitterCards: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
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
              SEO Sozlamalari
            </h1>
            <p className="text-gray-400">
              Qidiruv tizimlari uchun optimizatsiya
            </p>
          </div>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {saved ? "Saqlandi ✓" : "Saqlash"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Meta Tags */}
          <div className="p-6 rounded-2xl border border-white/10 lg:col-span-2" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Meta Taglar (Default)</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Default Title</label>
                <input
                  type="text"
                  value={settings.defaultTitle}
                  onChange={(e) => setSettings({...settings, defaultTitle: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
                <p className="text-gray-500 text-xs mt-1">{settings.defaultTitle.length}/60 belgi</p>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Default Description</label>
                <textarea
                  value={settings.defaultDescription}
                  onChange={(e) => setSettings({...settings, defaultDescription: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white h-24 resize-none"
                />
                <p className="text-gray-500 text-xs mt-1">{settings.defaultDescription.length}/160 belgi</p>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Keywords</label>
                <input
                  type="text"
                  value={settings.defaultKeywords}
                  onChange={(e) => setSettings({...settings, defaultKeywords: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="so'z1, so'z2, so'z3..."
                />
              </div>
            </div>
          </div>

          {/* Verification */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Tasdiqlash Kodlari</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Google Search Console</label>
                <input
                  type="text"
                  value={settings.googleVerification}
                  onChange={(e) => setSettings({...settings, googleVerification: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="google-site-verification=..."
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Yandex Webmaster</label>
                <input
                  type="text"
                  value={settings.yandexVerification}
                  onChange={(e) => setSettings({...settings, yandexVerification: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="yandex-verification=..."
                />
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Ijtimoiy Tarmoq SEO</h3>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.openGraph}
                  onChange={(e) => setSettings({...settings, openGraph: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <div>
                  <span className="text-gray-300">Open Graph (Facebook)</span>
                  <p className="text-gray-500 text-xs">Facebook va boshqa platformalar uchun</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twitterCards}
                  onChange={(e) => setSettings({...settings, twitterCards: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <div>
                  <span className="text-gray-300">Twitter Cards</span>
                  <p className="text-gray-500 text-xs">Twitter uchun karta ko'rinishi</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.structuredData}
                  onChange={(e) => setSettings({...settings, structuredData: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <div>
                  <span className="text-gray-300">Structured Data (JSON-LD)</span>
                  <p className="text-gray-500 text-xs">Google rich snippets uchun</p>
                </div>
              </label>
            </div>
          </div>

          {/* Robots.txt */}
          <div className="p-6 rounded-2xl border border-white/10 lg:col-span-2" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <h3 className="text-lg font-semibold text-white mb-4">robots.txt</h3>
            <textarea
              value={settings.robotsTxt}
              onChange={(e) => setSettings({...settings, robotsTxt: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm h-32 resize-none"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
