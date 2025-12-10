import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";
import WorkflowSection from "@/components/sections/workflow";
import TechStackSection from "@/components/sections/tech-stack";
import PortfolioSection from "@/components/sections/portfolio-section";
import PricingSection from "@/components/sections/pricing";
import BlogPreviewSection from "@/components/sections/blog-preview";
import TestimonialsSection from "@/components/sections/testimonials";
import FAQSection from "@/components/sections/faq";
import ContactSection from "@/components/sections/contact";
import BackToTop from "@/components/ui/back-to-top";
import FloatingContact from "@/components/ui/floating-contact";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering to avoid database calls during build
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch featured projects for homepage
  let projects = [];
  
  try {
    projects = await prisma.project.findMany({
      where: {
        status: "COMPLETED",
        featured: true,
      },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
  } catch (error) {
    console.error("Failed to fetch projects (Database might be offline):", error);
    // Fallback to mock data
    projects = [
      {
        id: "1",
        title: "E-Commerce Platform",
        slug: "e-commerce-platform",
        description: "To'liq funksional onlayn do'kon platformasi",
        category: "Web Development",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
        demoUrl: "#",
        githubUrl: "#",
        technologies: ["React", "Node.js", "Prisma"],
        clientName: "Retail Co",
        completedAt: new Date(),
        featured: true,
        status: "COMPLETED",
        views: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        title: "AI Chatbot Integration",
        slug: "ai-chatbot",
        description: "Mijozlarni qo'llab-quvvatlash uchun aqlli chatbot",
        category: "AI",
        tags: ["OpenAI", "Python", "FastAPI"],
        imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
        demoUrl: "#",
        githubUrl: "#",
        technologies: ["GPT-4", "LangChain"],
        clientName: "Tech Corp",
        completedAt: new Date(),
        featured: true,
        status: "COMPLETED",
        views: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ] as any;
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WorkflowSection />
      <TechStackSection />
      <PortfolioSection projects={projects} />
      <PricingSection />
      <BlogPreviewSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <BackToTop />
      <FloatingContact />
    </main>
  );
}
