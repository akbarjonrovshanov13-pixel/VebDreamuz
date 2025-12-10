"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Bosh sahifa", href: "/" },
  { name: "Xizmatlar", href: "/#services" },
  { name: "Narxlar", href: "/#pricing" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/#faq" },
  { name: "Aloqa", href: "/#contact" },
];

interface NavbarProps {
  forceWhite?: boolean;
}

export default function Navbar({ forceWhite = false }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        forceWhite || isScrolled
          ? "bg-slate-900/90 backdrop-blur-lg shadow-lg border-b border-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Globe className={`w-8 h-8 ${
                isScrolled ? "text-cyan-400" : "text-white"
              }`} />
              <div className={`absolute inset-0 blur-xl animate-pulse ${
                isScrolled ? "bg-cyan-500/30" : "bg-white/30"
              }`}></div>
            </div>
            <span className={`text-2xl font-bold ${
              isScrolled ? "text-gradient" : "text-white"
            }`}>VebDream</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-cyan-400 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="gradient" size="lg">
              <a href="#contact">Bepul Konsultatsiya</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                : "hover:bg-white/10"
            }`}
          >
            {isOpen ? (
              <X className={isScrolled ? "w-6 h-6" : "w-6 h-6 text-white"} />
            ) : (
              <Menu className={isScrolled ? "w-6 h-6" : "w-6 h-6 text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-cyan-500/20"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild variant="gradient" className="w-full" size="lg">
                <a href="#contact" onClick={() => setIsOpen(false)}>Bepul Konsultatsiya</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
