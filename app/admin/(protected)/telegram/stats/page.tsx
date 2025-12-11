"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { BarChart3, Users, MessageSquare, TrendingUp, Calendar, ArrowUp, ArrowDown } from "lucide-react";

export default function TelegramStatsPage() {
  const [period, setPeriod] = useState("week");

  const stats = {
    totalUsers: 156,
    newUsersToday: 12,
    totalMessages: 1234,
    messagesChange: 23,
    activeUsers: 89,
    activeChange: -5,
    postsToday: 8,
  };

  const dailyStats = [
    { day: "Dush", messages: 45, users: 12 },
    { day: "Sesh", messages: 62, users: 18 },
    { day: "Chor", messages: 38, users: 8 },
    { day: "Pay", messages: 89, users: 24 },
    { day: "Jum", messages: 76, users: 20 },
    { day: "Shan", messages: 34, users: 6 },
    { day: "Yak", messages: 28, users: 4 },
  ];

  const topCommands = [
    { command: "/start", count: 234, percent: 35 },
    { command: "/help", count: 156, percent: 23 },
    { command: "/posts", count: 123, percent: 18 },
    { command: "/contact", count: 89, percent: 13 },
    { command: "/about", count: 67, percent: 10 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Telegram Statistika
            </h1>
            <p className="text-gray-400">
              Bot va kanal statistikasi
            </p>
          </div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            <option value="today">Bugun</option>
            <option value="week">Hafta</option>
            <option value="month">Oy</option>
            <option value="year">Yil</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Jami foydalanuvchilar</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.totalUsers}</p>
                <p className="text-green-400 text-sm flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +{stats.newUsersToday} bugun
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Jami xabarlar</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.totalMessages}</p>
                <p className="text-green-400 text-sm flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +{stats.messagesChange}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Faol foydalanuvchilar</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.activeUsers}</p>
                <p className="text-red-400 text-sm flex items-center mt-1">
                  <ArrowDown className="w-3 h-3 mr-1" />
                  {stats.activeChange}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Bugungi postlar</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.postsToday}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Kanalga yuborilgan
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <h3 className="text-lg font-semibold text-white mb-6">Haftalik faollik</h3>
            <div className="flex items-end justify-between h-48 gap-2">
              {dailyStats.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-lg"
                    style={{ height: `${(day.messages / 100) * 100}%` }}
                  />
                  <span className="text-gray-500 text-xs">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Commands */}
          <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(26, 31, 58, 0.5)" }}>
            <h3 className="text-lg font-semibold text-white mb-6">Top Komandalar</h3>
            <div className="space-y-4">
              {topCommands.map((cmd, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-mono">{cmd.command}</span>
                    <span className="text-gray-400">{cmd.count}</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${cmd.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
