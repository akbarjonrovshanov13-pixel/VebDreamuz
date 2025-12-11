import { GoogleGenerativeAI } from "@google/generative-ai";

// API keys with fallback support (up to 3 keys)
const API_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY2,
  process.env.GEMINI_API_KEY3,
].filter(Boolean) as string[];

if (API_KEYS.length === 0) {
  throw new Error("No GEMINI_API_KEY configured in environment variables");
}

// Create clients for each API key
const clients = API_KEYS.map(key => new GoogleGenerativeAI(key));

export const categories = [
  "biznes",
  "texnologiya",
  "marketing",
  "AI",
  "dasturlash",
  "startaplar",
  "dizayn",
  "sotsiomedia",
  "e-commerce",
  "avtomatlashtirish",
  "chatbotlar",
  "SEO",
];


export interface GeneratedContent {
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  imagePrompt: string;
}

const currentDate = new Date().toLocaleDateString('uz-UZ', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});

const prompt = (category: string) => `Sen O'zbekistonning yetakchi ${category} bo'yicha professional jurnalist va tahlilchisan.
O'zbek auditoriyasi uchun yuqori sifatli, chuqur tahliliy va jurnalistik uslubda maqola yoz.

📅 BUGUNGI SANA: ${currentDate} (2025-yil, dekabr)
⚠️ MUHIM: Faqat 2025-yilning eng so'nggi, dolzarb ma'lumotlaridan foydalanib yoz! 
Eskirgan 2023-2024 yil ma'lumotlarini ISHLATMA.

🎯 MAVZU: ${category} sohasida 2025-yilning eng dolzarb, eng yangi mavzusini tanla.

📰 JURNALISTIK FORMAT:

1. SARLAVHA (60-80 belgi):
   - "Kim nima qildi" yoki "Nima sodir bo'ldi" formatida
   - 2025-yil kontekstida yoz

2. LID (2-3 gap):
   - 5W formati: Kim? Nima? Qachon? Qayerda? Nega?
   - Eng muhim faktni birinchi gapda ayt

3. ASOSIY MATN:
   
   ## Voqea tafsilotlari
   - 2025-yilning aniq faktlari va raqamlari
   - Ekspert fikrlari (ism va lavozim bilan)
   
   ## Tahlil
   - Nima uchun bu muhim?
   - Qanday oqibatlarga olib keladi?
   
   ## Xulosalar
   • Birinchi xulosa
   • Ikkinchi xulosa  
   • Uchinchi xulosa

4. XULOSA (1 paragraf):
   - Asosiy xulosa va CTA

📝 QOIDALAR:
- 2025-yilning ENG YANGI ma'lumotlari
- 600-1000 so'z (qisqa va lo'nda)
- Raqamlar va statistika
- Markdown formatlash
- Professional jurnalistik uslub

🎨 RASM PROMPT:
Maqola uchun giperrealistik raqamli illyustratsiya prompti yoz. Prompt quyidagi uslubda bo'lsin:
"Giperrealistik raqamli illyustratsiya — ${category} mavzusida sahna. [Mavzuga oid vizual tavsif]. 
Kinamatografik yoritish, 8k o'lcham, yuqori darajadagi detallashgan teksturalar, 
professional studiya sifatida, zamonaviy va futuristik atmosfera."

Javobni quyidagi JSON formatda qaytaring:
{
  "title": "Jurnalistik sarlavha",
  "excerpt": "1-2 gaplik qisqacha mazmun",
  "content": "Markdown formatdagi maqola (600-1000 so'z)",
  "seoTitle": "SEO sarlavha (60 belgi)",
  "seoDescription": "SEO tavsif (150-160 belgi)",
  "keywords": ["kalit1", "kalit2", "kalit3", "kalit4", "kalit5"],
  "imagePrompt": "Giperrealistik raqamli illyustratsiya — [sahna tavsifi]. Kinamatografik yoritish, 8k o'lcham, yuqori darajadagi detallashgan teksturalar."
}`;

// Generate content with a specific client and model
async function generateWithClient(
  client: GoogleGenerativeAI, 
  category: string,
  keyIndex: number,
  modelName: string = "gemini-2.5-flash"
): Promise<GeneratedContent> {
  const model = client.getGenerativeModel({ 
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
    }
  });
  
  console.log(`[Gemini] Using API key ${keyIndex + 1}/${clients.length} with model ${modelName}`);
  
  const result = await model.generateContent(prompt(category));
  const response = await result.response;
  const text = response.text();

  try {
    // If the model respects responseMimeType, it should be valid JSON.
    // We still do a basic cleanup just in case it wraps in markdown
    const cleanedText = text.replace(/```json\s*|\s*```/g, "").trim();
    const parsedContent: GeneratedContent = JSON.parse(cleanedText);

    // Validate required fields
    if (!parsedContent.title || !parsedContent.content) {
      throw new Error("Generated content is missing required fields");
    }

    return parsedContent;
  } catch (parseError) {
    console.error(`[Gemini] JSON Parse Error for ${modelName}:`, parseError);
    console.error(`[Gemini] Raw text was:`, text.substring(0, 200) + "...");
    throw new Error(`Failed to parse JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
  }
}

export async function generateBlogPost(category: string): Promise<GeneratedContent> {
  let lastError: Error | null = null;
  
  // Prioritize working models. Removed 1.5/1.0 pro models that returned 404.
  const models = [
    "gemini-2.5-flash",       // Confirmed working (but sometimes bad JSON)
    "gemini-2.0-flash-exp",   // Has quota usually, but good fallback
    "gemini-2.0-flash",       // Has quota usually
  ];

  // Try each combination of Model + API Key
  for (const modelName of models) {
    for (let i = 0; i < clients.length; i++) {
      try {
        return await generateWithClient(clients[i], category, i, modelName);
      } catch (error: any) {
        lastError = error;
        
        const errorMessage = error?.message || "Unknown error";
        console.warn(`[Gemini] Failed with Key ${i + 1} & Model ${modelName}: ${errorMessage.substring(0, 100)}...`);
        
        // Continue to next key/model
        continue;
      }
    }
  }

  // All combinations failed
  console.error(`[Gemini] All keys and models failed. Last error:`, lastError);
  throw lastError || new Error("All API keys and models exhausted");
}

export async function generateMultiplePosts(
  categories: string[],
  maxConcurrent: number = 3
): Promise<Array<{ category: string; content: GeneratedContent | null; error?: string }>> {
  const results: Array<{ category: string; content: GeneratedContent | null; error?: string }> = [];

  // Process in batches to avoid rate limiting
  for (let i = 0; i < categories.length; i += maxConcurrent) {
    const batch = categories.slice(i, i + maxConcurrent);
    const batchPromises = batch.map(async (category) => {
      try {
        const content = await generateBlogPost(category);
        return { category, content };
      } catch (error) {
        return {
          category,
          content: null,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Wait a bit between batches to avoid rate limiting
    if (i + maxConcurrent < categories.length) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return results;
}
