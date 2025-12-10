import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost, categories } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { generateSlug, calculateReadTime } from "@/lib/utils";
import { sendToChannel, notifySubscribers } from "@/lib/telegram";
import { fetchCategoryImage, trackImageDownload } from "@/lib/unsplash";

// Allow up to 300 seconds for this route (for Vercel/Render)
export const maxDuration = 300;

// Verify cron secret for security
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  if (!cronSecret) {
    console.warn("[CRON] CRON_SECRET not set - allowing request");
    return true;
  }
  
  return authHeader === `Bearer ${cronSecret}`;
}

// Background task to generate and publish post
async function generatePostInBackground(type: string) {
  try {
    console.log(`📝 [BACKGROUND] Starting ${type} post generation...`);

    // Select category based on type
    let selectedCategory: string;
    
    if (type === "trend") {
      const trendCategories = ["biznes", "texnologiya", "AI", "startaplar"];
      selectedCategory = trendCategories[Math.floor(Math.random() * trendCategories.length)];
    } else {
      selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    }
    
    console.log(`[BACKGROUND] Selected category: ${selectedCategory}`);

    // Generate content using Gemini
    console.log("[BACKGROUND] Calling Gemini API...");
    const generatedContent = await generateBlogPost(selectedCategory);
    console.log("[BACKGROUND] Content generated:", generatedContent.title?.substring(0, 50));
    
    // Generate unique slug
    const slug = generateSlug(generatedContent.title);
    
    // Calculate read time
    const readTime = calculateReadTime(generatedContent.content);
    
    // Fetch image from Unsplash
    console.log("[BACKGROUND] Fetching image...");
    const image = await fetchCategoryImage(selectedCategory);
    console.log(`🖼️ Image by ${image.author}`);

    // Save to database
    console.log("[BACKGROUND] Saving to database...");
    const post = await prisma.blogPost.create({
      data: {
        category: selectedCategory,
        title: generatedContent.title,
        slug,
        excerpt: generatedContent.excerpt,
        content: generatedContent.content,
        seoTitle: generatedContent.seoTitle,
        seoDescription: generatedContent.seoDescription,
        keywords: generatedContent.keywords,
        imageUrl: image.url,
        readTime,
        status: "PUBLISHED",
      },
    });
    console.log("[BACKGROUND] Blog post saved with ID:", post.id);

    // Track image download
    if (image.downloadUrl) {
      await trackImageDownload(image.downloadUrl);
    }

    // Send to Telegram channel
    const message = {
      title: post.title,
      content: post.excerpt,
      category: post.category,
      link: `/blog/${post.slug}`,
      imageUrl: post.imageUrl,
    };

    try {
      await sendToChannel(message);
      console.log(`📲 Sent to Telegram channel`);
    } catch (telegramError) {
      console.error("Telegram error (non-fatal):", telegramError);
    }

    // Notify subscribers
    try {
      await notifySubscribers(message);
    } catch (e) {
      console.error("Subscriber notification error (non-fatal):", e);
    }

    console.log(`✅ [BACKGROUND] Published: "${post.title}" [${selectedCategory}]`);

  } catch (error) {
    console.error(`❌ [BACKGROUND] Error:`, error);
  }
}

export async function GET(request: NextRequest) {
  console.log("[CRON API] Request received at", new Date().toISOString());
  
  // Verify authorization
  if (!verifyCronSecret(request)) {
    console.log("[CRON API] Unauthorized request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("[CRON API] Authorized successfully");
  
  // Check required environment variables
  const envCheck = {
    GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
    DATABASE_URL: !!process.env.DATABASE_URL,
    TELEGRAM_BOT_TOKEN: !!process.env.TELEGRAM_BOT_TOKEN,
  };
  
  console.log("[CRON API] Environment check:", envCheck);
  
  if (!envCheck.GEMINI_API_KEY) {
    return NextResponse.json({
      error: "GEMINI_API_KEY not configured",
      envCheck
    }, { status: 500 });
  }
  
  if (!envCheck.DATABASE_URL) {
    return NextResponse.json({
      error: "DATABASE_URL not configured",
      envCheck
    }, { status: 500 });
  }

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") || "hourly";

  // 🚀 Fire-and-forget: Start background task and immediately return
  // This prevents cron-job.org timeout (30 seconds limit)
  generatePostInBackground(type).catch(err => {
    console.error("[BACKGROUND] Unhandled error:", err);
  });

  // Return immediately with 202 Accepted
  return NextResponse.json({
    success: true,
    message: "Post generation started in background",
    type,
    timestamp: new Date().toISOString(),
  }, { status: 202 });
}

// POST method for manual triggering (same behavior)
export async function POST(request: NextRequest) {
  return GET(request);
}
