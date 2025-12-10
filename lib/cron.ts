import cron from "node-cron";
import { generateBlogPost, categories } from "./gemini";
import { prisma } from "./prisma";
import { generateSlug, calculateReadTime } from "./utils";
import { sendToChannel, notifySubscribers } from "./telegram";
import { fetchCategoryImage, trackImageDownload } from "./unsplash";

// Direct blog post generation function
async function generateAndPublishPost(category: string, type: string = "normal") {
  try {
    console.log(`📝 Generating ${type} post for: ${category}`);

    // Generate content using Gemini
    const generatedContent = await generateBlogPost(category);
    
    // Generate unique slug
    const slug = generateSlug(generatedContent.title);
    
    // Calculate read time
    const readTime = calculateReadTime(generatedContent.content);
    
    // Fetch image from Unsplash
    const image = await fetchCategoryImage(category);
    console.log(`🖼️ Image by ${image.author}`);

    // Save to database
    const post = await prisma.blogPost.create({
      data: {
        category,
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
      console.error("Telegram error:", telegramError);
    }

    // Notify subscribers (only for new posts)
    try {
      await notifySubscribers(message);
    } catch (e) {
      console.error("Subscriber notification error:", e);
    }

    console.log(`✅ Published: "${post.title}" [${category}]`);
    return post;
  } catch (error) {
    console.error(`❌ Error generating ${category}:`, error);
    throw error;
  }
}

export function setupCronJobs() {
  // HOURLY content generation - 06:00 to 22:00 Tashkent time (UTC+5)
  // UTC hours: 01:00 to 17:00 (1-17)
  cron.schedule("0 1-17 * * *", async () => {
    console.log("🚀 [CRON] Hourly blog post generation starting...");
    
    try {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      await generateAndPublishPost(randomCategory, "hourly");
    } catch (error) {
      console.error("❌ [CRON] Hourly job failed:", error);
    }
  });

  // Trend posts - every 3 hours during active hours (08:30, 11:30, 14:30, 17:30, 20:30 Tashkent)
  // UTC: 03:30, 06:30, 09:30, 12:30, 15:30
  cron.schedule("30 3,6,9,12,15 * * *", async () => {
    console.log("🔥 [CRON] Trend post generation starting...");
    
    try {
      const trendCategories = ["biznes", "texnologiya", "AI", "startaplar"];
      const randomTrend = trendCategories[Math.floor(Math.random() * trendCategories.length)];
      await generateAndPublishPost(randomTrend, "trend");
    } catch (error) {
      console.error("❌ [CRON] Trend job failed:", error);
    }
  });

  console.log("⏰ Cron Jobs Active:");
  console.log("   📝 Hourly posts: 06:00-22:00 Tashkent time");
  console.log("   🔥 Trend posts: 08:30, 11:30, 14:30, 17:30, 20:30 Tashkent");
}

// Export for manual testing
export { generateAndPublishPost };
