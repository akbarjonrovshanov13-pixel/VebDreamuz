require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testAPI() {
  console.log("🔑 GEMINI_API_KEY test...\n");

  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log("❌ GEMINI_API_KEY mavjud emas!");
    console.log("   .env faylida GEMINI_API_KEY qo'shing");
    return;
  }

  console.log("✅ API key topildi:", apiKey.substring(0, 10) + "..." + apiKey.substring(apiKey.length - 5));
  console.log("\n📡 Gemini API'ga ulanish...\n");

  const genAI = new GoogleGenerativeAI(apiKey);

  // List available models
  try {
    console.log("Gemini API test...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent("Salom, ishlayapsizmi? O'zbekcha javob bering.");
    const text = result.response.text();
    
    console.log("\n✅ API ishlayapti!");
    console.log("Javob:", text.substring(0, 100) + "...");
    
  } catch (error) {
    console.error("\n❌ Xatolik:", error.message);
    console.log("\nDetal:", error);
  }
}

testAPI();
