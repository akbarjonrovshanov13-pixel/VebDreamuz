"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Folder, Loader2, Image } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  projectCount: number;
  icon: string;
}

const defaultCategories: Category[] = [
  { id: "1", name: "Veb Saytlar", slug: "veb-saytlar", description: "Korporativ va shaxsiy veb saytlar", projectCount: 5, icon: "🌐" },
  { id: "2", name: "Mobil Ilovalar", slug: "mobil-ilovalar", description: "iOS va Android ilovalar", projectCount: 3, icon: "📱" },
  { id: "3", name: "E-Commerce", slug: "e-commerce", description: "Onlayn do'konlar", projectCount: 4, icon: "🛒" },
  { id: "4", name: "UI/UX Dizayn", slug: "ui-ux-dizayn", description: "Interfeys dizaynlari", projectCount: 6, icon: "🎨" },
  { id: "5", name: "Telegram Botlar", slug: "telegram-botlar", description: "Telegram bot loyihalar", projectCount: 8, icon: "🤖" },
  { id: "6", name: "AI Loyihalar", slug: "ai-loyihalar", description: "Sun'iy intellekt loyihalari", projectCount: 2, icon: "🧠" },
];

export default function PortfolioCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "", icon: "📁" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newCategory.name.trim()) return;
    
    const slug = newCategory.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    
    setCategories([...categories, {
      id: Date.now().toString(),
      name: newCategory.name,
      slug,
      description: newCategory.description,
      projectCount: 0,
      icon: newCategory.icon,
    }]);
    setNewCategory({ name: "", description: "", icon: "📁" });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu kategoriyani o'chirmoqchimisiz?")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const icons = ["📁", "🌐", "📱", "🛒", "🎨", "🤖", "🧠", "💻", "🔧", "📊"];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Portfolio Kategoriyalar
            </h1>
            <p className="text-gray-400">
              Portfolio loyihalaringiz uchun kategoriyalar
            </p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yangi kategoriya
          </Button>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1A1F3A] p-6 rounded-2xl w-full max-w-md border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Yangi kategoriya</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Icon</label>
                  <div className="flex gap-2 flex-wrap">
                    {icons.map(icon => (
                      <button
                        key={icon}
                        onClick={() => setNewCategory({...newCategory, icon})}
                        className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center ${
                          newCategory.icon === icon ? 'bg-cyan-500' : 'bg-white/5'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Kategoriya nomi"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
                
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Tavsif (ixtiyoriy)"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white h-24 resize-none"
                />
              </div>
              
              <div className="flex gap-3 mt-4">
                <Button onClick={handleAdd} className="flex-1 bg-cyan-500">
                  Qo'shish
                </Button>
                <Button 
                  onClick={() => setShowAddModal(false)} 
                  variant="outline"
                  className="flex-1"
                >
                  Bekor qilish
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-colors"
              style={{ background: "rgba(26, 31, 58, 0.5)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{category.name}</h3>
                    <p className="text-gray-500 text-sm">{category.projectCount} ta loyiha</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{category.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">/{category.slug}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
