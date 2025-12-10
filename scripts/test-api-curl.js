require("dotenv").config();

async function testDirectRestAPI() {
  console.log("📡 Testing Gemini REST API directly...");
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ No API Key found");
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
  const data = {
    contents: [{
      parts: [{ text: "Hello, are you working?" }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error (${response.status}):`);
      console.error(errorText);
      return;
    }

    const result = await response.json();
    console.log("✅ Success!");
    console.log("Response:", JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error("❌ Network/Fetch Error:", error.message);
  }
}

testDirectRestAPI();
