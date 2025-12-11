"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Tag, Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

// Predefined categories from the system
const defaultCategories: Category[] = [
  { id: "1", name: "Texnologiya", slug: "texnologiya", postCount: 0 },
  { id: "2", name: "Dasturlash", slug: "dasturlash", postCount: 0 },
  { id: "3", name: "Sun'iy Intellekt", slug: "suniy-intellekt", postCount: 0 },
  { id: "4", name: "Veb Dizayn", slug: "veb-dizayn", postCount: 0 },
  { id: "5", name: "Mobil Ilovalar", slug: "mobil-ilovalar", postCount: 0 },
  { id: "6", name: "Startaplar", slug: "startaplar", postCount: 0 },
  { id: "7", name: "Marketing", slug: "marketing", postCount: 0 },
  { id: "8", name: "SEO", slug: "seo", postCount: 0 },
];

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleAdd = () => {
    if (!newCategory.trim()) return;
    
    const slug = newCategory
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    
    const newCat: Category = {
      id: Date.now().toString(),
      name: newCategory,
      slug,
      postCount: 0,
    };
    
    setCategories([...categories, newCat]);
    setNewCategory("");
    setShowAddModal(false);
  };

  const handleEdit = (id: string) => {
    const cat = categories.find(c => c.id === id);
    if (cat) {
      setEditingId(id);
      setEditName(cat.name);
    }
  };

  const handleSaveEdit = () => {
    if (!editName.trim() || !editingId) return;
    
    setCategories(categories.map(c => 
      c.id === editingId 
        ? { ...c, name: editName, slug: editName.toLowerCase().replace(/\s+/g, "-") }
        : c
    ));
    setEditingId(null);
    setEditName("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu kategoriyani o'chirmoqchimisiz?")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Blog Kategoriyalar
            </h1>
            <p className="text-gray-400">
              Blog maqolalari uchun kategoriyalarni boshqaring
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
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Kategoriya nomi"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white mb-4"
              />
              <div className="flex gap-3">
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
              className="p-6 rounded-2xl border border-white/10"
              style={{ background: "rgba(26, 31, 58, 0.5)" }}
            >
              {editingId === category.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveEdit} className="bg-green-500">
                      Saqlash
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                      Bekor
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <Tag className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{category.name}</h3>
                        <p className="text-gray-500 text-sm">/{category.slug}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      {category.postCount} ta post
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category.id)}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-blue-400 text-sm">
            💡 Kategoriyalar blog maqolalarini guruhlash uchun ishlatiladi. 
            AI avtomatik yangi maqola yaratganda mavjud kategoriyalardan birini tanlaydi.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
