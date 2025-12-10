const { PrismaClient } = require("@prisma/client");
const https = require("https");

const prisma = new PrismaClient();

async function testGenerate() {
  console.log("🧪 Testing API endpoint...\n");

  const url = "http://localhost:3003/api/generate";
  const data = JSON.stringify({ category: "AI" });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer random_cron_secret_456"
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer random_cron_secret_456"
      },
      body: data
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log("✅ Success! Post generated:");
      console.log("   ID:", result.post.id);
      console.log("   Title:", result.post.title);
      console.log("   Category:", result.post.category);
      console.log("   Slug:", result.post.slug);
      
      // Check database
      const post = await prisma.blogPost.findUnique({
        where: { id: result.post.id }
      });
      
      if (post) {
        console.log("\n✅ Post saved to database successfully!");
        console.log("   Status:", post.status);
        console.log("   Views:", post.views);
      }
    } else {
      console.log("❌ Error:", result);
    }
  } catch (error) {
    console.error("❌ Request failed:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testGenerate();
