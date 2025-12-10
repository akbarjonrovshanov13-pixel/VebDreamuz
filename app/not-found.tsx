import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-500/10 mb-8">
            <FileQuestion className="w-12 h-12 text-primary-500" />
          </div>
          
          {/* 404 */}
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-600 mb-4">
            404
          </h1>
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-white mb-4">
            Sahifa Topilmadi
          </h2>
          
          {/* Description */}
          <p className="text-gray-400 text-lg mb-8">
            Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all"
            >
              Bosh Sahifaga Qaytish
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
            >
              Blog'ni Ko'rish
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
