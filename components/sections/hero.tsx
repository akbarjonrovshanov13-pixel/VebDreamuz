"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Globe, Code, Smartphone } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-20 left-10"
          >
            <Globe className="w-12 h-12 text-cyan-400 opacity-50" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-40 right-20"
          >
            <Code className="w-16 h-16 text-blue-400 opacity-50" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute bottom-40 left-20"
          >
            <Smartphone className="w-14 h-14 text-sky-400 opacity-50" />
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-cyan-500/10 backdrop-blur-lg border border-cyan-500/30 rounded-full px-6 py-2 mb-8"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-white text-sm font-medium">
              Professional IT Xizmatlari
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Raqamli Orzularingiz
            <br />
            <span className="text-gradient bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-400 bg-clip-text text-transparent">
              Biz Bilan Amalga Oshadi
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Professional web saytlar, mobil ilovalar, Telegram botlar va 
            zamonaviy IT yechimlarini yaratamiz
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              asChild
              variant="gradient"
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              <a href="#contact">Bepul Konsultatsiya</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-white/5 backdrop-blur-lg border-cyan-500/30 text-white hover:bg-cyan-500/10 hover:border-cyan-400"
            >
              <a href="#portfolio">Portfolioni Ko&apos;rish</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "100+", label: "Loyihalar" },
              { number: "50+", label: "Mijozlar" },
              { number: "99%", label: "Mamnunlik" },
              { number: "24/7", label: "Qo'llab-quvvatlash" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-cyan-400/50" />
        </motion.div>
      </div>
    </section>
  );
}
