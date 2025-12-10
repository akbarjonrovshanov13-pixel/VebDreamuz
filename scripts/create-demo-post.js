const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createDemoPost() {
  console.log("📝 Creating demo AI-generated post...\n");

  const demoPost = {
    category: "AI",
    title: "Gemini AI: Google'ning Eng Kuchli Sun'iy Intellekti",
    slug: "gemini-ai-google-suniy-intellekt",
    excerpt: "Google'ning yangi Gemini AI modeli GPT-4 bilan raqobatlashish uchun yaratilgan. Multimodal imkoniyatlar, tez ishlash va yuqori aniqlik - barchasini bir joyda.",
    content: `# Gemini AI: Google'ning Eng Kuchli Sun'iy Intellekti

Google 2024-yilda sun'iy intellekt sohasida yangi bosqichga ko'tarildi - **Gemini AI**ni taqdim etdi.

## Gemini AI Nima?

Gemini - bu Google tomonidan ishlab chiqilgan ilg'or multimodal AI model. U matn, rasm, video va ovozni bir vaqtning o'zida tushunishi mumkin.

### Asosiy Imkoniyatlari

🤖 **Multimodal**: Bir nechta format bilan ishlaydi
⚡ **Tez**: Real-time javoblar
🎯 **Aniq**: Yuqori to'g'rilik darajasi
💡 **Creative**: Ijodiy yechimlar

## Gemini vs GPT-4

| Xususiyat | Gemini Pro | GPT-4 |
|-----------|------------|-------|
| Multimodal | ✅ | ✅ |
| Tezlik | Tez | O'rtacha |
| Narx | Arzon | Qimmat |
| API | Bepul tier bor | To'lovli |

## O'zbekistonda Qo'llash

Gemini AI O'zbekistonda biznes jarayonlarini avtomatlashtirish uchun juda yaxshi tanlov:

1. **Chatbotlar** - Mijozlar bilan suhbatlashish
2. **Content Generation** - Blog, maqolalar yaratish
3. **Ma'lumot Tahlili** - Katta hajmdagi ma'lumotlarni qayta ishlash
4. **Tarjima** - O'zbek, rus, ingliz tillarida

### Narxlar

- **Gemini Pro**: 1M token ~ $0.50
- **Gemini Ultra**: 1M token ~ $3.00

## Xulosa

Gemini AI - bu zamonaviy bizneslar uchun kuchli vosita. **EvolvoAI** jamoasi Gemini'ni loyihalaringizga integratsiya qilishda yordam beradi!

---

📞 **Bepul konsultatsiya:** +998 90 123 45 67`,
    seoTitle: "Gemini AI: Google Sun'iy Intellekt | EvolvoAI",
    seoDescription: "Google Gemini AI haqida to'liq ma'lumot. Multimodal AI, imkoniyatlar, narxlar va O'zbekistonda qo'llash. Professional integratsiya xizmati.",
    keywords: ["Gemini AI", "Google AI", "multimodal AI", "chatbot", "O'zbekiston", "EvolvoAI"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
    readTime: 4,
    status: "PUBLISHED",
  };

  try {
    const post = await prisma.blogPost.create({
      data: demoPost,
    });

    console.log("✅ Demo post created successfully!\n");
    console.log("   ID:", post.id);
    console.log("   Title:", post.title);
    console.log("   Slug:", post.slug);
    console.log("   Category:", post.category);
    console.log("   Read Time:", post.readTime, "min");
    console.log("   Status:", post.status);
    console.log("\n🌐 View at: http://localhost:3003/blog/" + post.slug);
    console.log("\n✨ This demonstrates how AI-generated posts would work!");
    console.log("   (When GEMINI_API_KEY is configured)");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createDemoPost();
