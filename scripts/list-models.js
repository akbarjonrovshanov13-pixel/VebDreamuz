require("dotenv").config();

async function listModels() {
  console.log("📡 Listing available models...");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      console.error(`❌ API Error (${response.status}):`);
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    console.log("✅ Available Models:");
    if (result.models) {
      result.models.forEach(m => {
        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
          console.log(`- ${m.name}`);
        }
      });
    } else {
      console.log("No models found in response");
      console.log(JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.error("❌ Network Error:", error.message);
  }
}

listModels();
