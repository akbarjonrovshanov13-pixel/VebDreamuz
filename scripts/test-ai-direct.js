const { PrismaClient } = require("@prisma/client");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const prisma = new PrismaClient();

// Gemini AI setup - make sure you have GEMINI_API_KEY in .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

async function generateBlogPost() {
  console.log("🤖 Generating AI blog post...\n");

  const category = "AI";
  const prompt = `O'zbek tilida professional blog post yozing. Mavzu: "${category}". 

Quyidagi formatda yozing:

TITLE: [Blog post sarlavhasi]
EXCERPT: [Qisqacha mazmun, 1-2 jumla]
SEO_TITLE: [SEO uchun title]
SEO_DESCRIPTION: [SEO description]
KEYWORDS: [kalit so'zlar, vergul bilan ajratilgan]

CONTENT:
[To'liq markdown formatda yozilgan maqola, kamida 500 so'z]`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log("✅ AI content generated!\n");
    console.log("Response length:", text.length, "characters\n");

    // Parse response
    const titleMatch = text.match(/TITLE:\s*(.+)/);
    const excerptMatch = text.match(/EXCERPT:\s*(.+)/);
    const seoTitleMatch = text.match(/SEO_TITLE:\s*(.+)/);
    const seoDescMatch = text.match(/SEO_DESCRIPTION:\s*(.+)/);
    const keywordsMatch = text.match(/KEYWORDS:\s*(.+)/);
    const contentMatch = text.match(/CONTENT:\s*([\s\S]+)/);

    if (!titleMatch || !contentMatch) {
      throw new Error("Could not parse AI response");
    }

    const title = titleMatch[1].trim();
    const excerpt = excerptMatch ? excerptMatch[1].trim() : "";
    const seoTitle = seoTitleMatch ? seoTitleMatch[1].trim() : title;
    const seoDescription = seoDescMatch ? seoDescMatch[1].trim() : excerpt;
    const keywordsStr = keywordsMatch ? keywordsMatch[1].trim() : "AI";
    const content = contentMatch[1].trim();

    // Save to database
    const post = await prisma.blogPost.create({
      data: {
        category,
        title,
        slug: generateSlug(title),
        excerpt,
        content,
        seoTitle,
        seoDescription,
        keywords: keywordsStr.split(",").map(k => k.trim()),
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
        readTime: calculateReadTime(content),
        status: "PUBLISHED",
      },
    });

    console.log("✅ Post saved to database!\n");
    console.log("   ID:", post.id);
    console.log("   Title:", post.title);
    console.log("   Slug:", post.slug);
    console.log("   Read Time:", post.readTime, "min");
    console.log("\n🎉 Success! New blog post created!");

  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.message.includes("API key")) {
      console.log("\n⚠️  Make sure GEMINI_API_KEY is set in your .env file");
    }
  } finally {
    await prisma.$disconnect();
  }
}

generateBlogPost();
