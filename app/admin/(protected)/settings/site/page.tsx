"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Save, Globe, Mail, Phone, MapPin, Loader2 } from "lucide-react";

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "VebDream",
    siteDescription: "Professional veb-saytlar va mobil ilovalar yaratish xizmati",
    email: "info@vebdream.uz",
    phone: "+998 90 123 45 67",
    address: "Toshkent, O'zbekiston",
    telegram: "@vebdream_channel",
    instagram: "@vebdream",
    facebook: "",
    linkedin: "",
    workingHours: "Dush-Juma: 09:00 - 18:00",
    logo: "/logo.png",
    favicon: "/favicon.ico",
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
              Sayt Sozlamalari
            </h1>
            <p className="text-gray-400">
              Saytning umumiy sozlamalarini boshqaring
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
          {/* Basic Info */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Asosiy Ma'lumotlar</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Sayt nomi</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Tavsif</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white h-24 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Aloqa Ma'lumotlari</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Telefon</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Manzil</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <h3 className="text-lg font-semibold text-white mb-6">Ijtimoiy Tarmoqlar</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Telegram</label>
                <input
                  type="text"
                  value={settings.telegram}
                  onChange={(e) => setSettings({...settings, telegram: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="@username"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Instagram</label>
                <input
                  type="text"
                  value={settings.instagram}
                  onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="@username"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">Facebook</label>
                <input
                  type="text"
                  value={settings.facebook}
                  onChange={(e) => setSettings({...settings, facebook: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="https://facebook.com/..."
                />
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <h3 className="text-lg font-semibold text-white mb-6">Ish Vaqti</h3>
            
            <div>
              <label className="text-gray-400 text-sm block mb-2">Ish soatlari</label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => setSettings({...settings, workingHours: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
