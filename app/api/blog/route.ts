import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where = category && category !== "Barcha" 
      ? { category, status: "PUBLISHED" as const }
      : { status: "PUBLISHED" as const };

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishDate: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error("Error fetching blog posts (using mock data):", error);
    
    // Mock data for fallback
    const mockPosts = [
      {
        id: "1",
        slug: "ai-chatbotlar-biznes-uchun",
        title: "AI Chatbotlar: Biznesingiz Uchun Kelajak",
        excerpt: "Qanday qilib AI chatbotlar mijozlar bilan muloqotni yaxshilaydi va sotuvni oshiradi",
        category: "AI",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        publishDate: new Date().toISOString(),
        readTime: 5,
        views: 120
      },
      {
        id: "2",
        slug: "telegram-bot-marketing",
        title: "Telegram Bot Marketing: To'liq Qo'llanma",
        excerpt: "Telegram botlar orqali marketing avtomatlashtirish va mijozlarni jalb qilish usullari",
        category: "Marketing",
        imageUrl: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800",
        publishDate: new Date().toISOString(),
        readTime: 7,
        views: 85
      },
      {
        id: "3",
        slug: "nextjs-14-guide",
        title: "Next.js 14 bilan Zamonaviy Web Sayt Yaratish",
        excerpt: "Next.js 14 ning yangi imkoniyatlari va SEO-optimallashtirilgan saytlar yaratish",
        category: "Dasturlash",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
        publishDate: new Date().toISOString(),
        readTime: 6,
        views: 200
      }
    ];

    return NextResponse.json({
      posts: mockPosts,
      total: mockPosts.length,
      hasMore: false,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const post = await prisma.blogPost.create({
      data: {
        category: body.category,
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        keywords: body.keywords,
        imageUrl: body.imageUrl,
        author: body.author || "EvolvoAI Team",
        readTime: body.readTime,
        status: body.status || "DRAFT",
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
