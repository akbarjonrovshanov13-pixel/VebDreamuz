"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Save, Sparkles, Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react";

export default function AISettingsPage() {
  const [settings, setSettings] = useState({
    geminiApiKey: "AIzaSy*********************",
    model: "gemini-2.0-flash-exp",
    maxTokens: 8192,
    temperature: 0.7,
    language: "uz",
    autoModeration: true,
    safetyFilter: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    await new Promise(r => setTimeout(r, 2000));
    setTestResult("success");
    setTesting(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              AI Sozlamalari
            </h1>
            <p className="text-gray-400">
              Gemini AI integratsiya sozlamalari
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
          {/* API Key */}
          <div className="p-6 rounded-2xl border border-white/10 lg:col-span-2" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Gemini API</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">API Key</label>
                <div className="flex gap-3">
                  <input
                    type="password"
                    value={settings.geminiApiKey}
                    onChange={(e) => setSettings({...settings, geminiApiKey: e.target.value})}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                  <Button 
                    onClick={testConnection}
                    disabled={testing}
                    variant="outline"
                    className="border-cyan-500/30"
                  >
                    {testing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : testResult === "success" ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : testResult === "error" ? (
                      <XCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    <span className="ml-2">Test</span>
                  </Button>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  <a href="https://aistudio.google.com/apikey" target="_blank" className="text-cyan-400 hover:underline">
                    Google AI Studio
                  </a> dan oling
                </p>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Model</label>
                <select 
                  value={settings.model}
                  onChange={(e) => setSettings({...settings, model: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                >
                  <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash (Tavsiya)</option>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generation Settings */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <h3 className="text-lg font-semibold text-white mb-6">Generatsiya Sozlamalari</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Maximum Tokens</label>
                <input
                  type="number"
                  value={settings.maxTokens}
                  onChange={(e) => setSettings({...settings, maxTokens: Number(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  Temperature: {settings.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) => setSettings({...settings, temperature: Number(e.target.value)})}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Aniq</span>
                  <span>Ijodiy</span>
                </div>
              </div>

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
            </div>
          </div>

          {/* Safety */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <h3 className="text-lg font-semibold text-white mb-6">Xavfsizlik</h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoModeration}
                  onChange={(e) => setSettings({...settings, autoModeration: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <div>
                  <span className="text-gray-300">Avtomatik moderatsiya</span>
                  <p className="text-gray-500 text-xs">Noto'g'ri kontentni filtrlash</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.safetyFilter}
                  onChange={(e) => setSettings({...settings, safetyFilter: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <div>
                  <span className="text-gray-300">Safety Filter</span>
                  <p className="text-gray-500 text-xs">Google AI xavfsizlik filtri</p>
                </div>
              </label>
            </div>
          </div>

          {/* Status */}
          <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">API Holati</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-white font-medium">Gemini API</p>
                <p className="text-green-400 text-sm">Faol</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-white font-medium">Blog AI</p>
                <p className="text-green-400 text-sm">Ishlayapti</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-white font-medium">Chatbot</p>
                <p className="text-green-400 text-sm">Ishlayapti</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-white font-medium">Telegram AI</p>
                <p className="text-green-400 text-sm">Ishlayapti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
