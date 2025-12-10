require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testMultipleModels() {
  console.log("🔑 GEMINI_API_KEY test...\n");

  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log("❌ GEMINI_API_KEY mavjud emas!");
    return;
  }

  console.log("✅ API key topildi:", apiKey.substring(0, 15) + "...");
  console.log("\n📡 Turli modellarni sinab ko'rish...\n");

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const modelsToTry = [
    "gemini-pro",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-2.0-flash-exp"
  ];

  for (const modelName of modelsToTry) {
    try {
      console.log(`\nSinab ko'rilmoqda: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent("Test: respond with 'OK' if you work");
      const text = result.response.text();
      
      console.log(`✅ ${modelName} - ISHLAYAPTI!`);
      console.log(`   Javob: ${text.substring(0, 50)}`);
      
      // If this works, use it for the real test
      console.log(`\n🎉 Ishlayotgan model topildi: ${modelName}`);
      return modelName;
      
    } catch (error) {
      console.log(`❌ ${modelName} - ${error.message.substring(0, 50)}...`);
    }
  }
  
  console.log("\n❌ Hech qanday model ishlamadi!");
  console.log("API key noto'g'ri yoki muddati tugagan bo'lishi mumkin");
}

testMultipleModels();
