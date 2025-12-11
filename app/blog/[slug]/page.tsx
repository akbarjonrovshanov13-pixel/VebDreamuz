import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BlogPostContent from "@/components/blog/blog-post-content";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!post) {
      return {
        title: "Post Not Found - VebDream",
      };
    }

    return {
      title: post.seoTitle,
      description: post.seoDescription,
      keywords: post.keywords,
      openGraph: {
        title: post.seoTitle,
        description: post.seoDescription,
        images: [post.imageUrl],
        type: "article",
        publishedTime: post.publishDate.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error fetching post metadata:", error);
    return {
      title: "Blog - VebDream",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!post || post.status !== "PUBLISHED") {
      notFound();
    }

    // Increment views (skip if using mock data)
    try {
      await prisma.blogPost.update({
        where: { slug: params.slug },
        data: { views: { increment: 1 } },
      });
    } catch (e) {
      // Ignore update error
    }

    return (
      <main className="min-h-screen bg-[#0A0E27]">
        <Navbar forceWhite />
        <div className="pt-20">
          <BlogPostContent post={post} />
        </div>
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Error fetching blog post (using mock data):", error);
    
    // Mock data fallback
    const mockPost = {
      id: "1",
      slug: params.slug,
      title: "AI Chatbotlar: Biznesingiz Uchun Kelajak",
      excerpt: "Qanday qilib AI chatbotlar mijozlar bilan muloqotni yaxshilaydi va sotuvni oshiradi",
      content: `
        <h2>AI Chatbotlar nima?</h2>
        <p>AI chatbotlar - bu sun'iy intellekt yordamida mijozlar bilan muloqot qiluvchi dasturlar...</p>
        <h2>Biznes uchun foydalari</h2>
        <ul>
          <li>24/7 xizmat ko'rsatish</li>
          <li>Tezkor javoblar</li>
          <li>Xarajatlarni kamaytirish</li>
        </ul>
      `,
      category: "AI",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      publishDate: new Date(),
      readTime: 5,
      views: 120,
      author: "VebDream Team",
      seoTitle: "AI Chatbotlar: Biznesingiz Uchun Kelajak",
      seoDescription: "AI chatbotlar biznesingizni qanday rivojlantirishi haqida to'liq ma'lumot",
      keywords: ["AI", "Chatbot", "Biznes", "Avtomatlashtirish"],
      status: "PUBLISHED",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return (
      <main className="min-h-screen bg-[#0A0E27]">
        <Navbar forceWhite />
        <div className="pt-20">
          <BlogPostContent post={mockPost as any} />
        </div>
        <Footer />
      </main>
    );
  }
}
