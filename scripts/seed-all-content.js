const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const blogPosts = [
  {
    category: "AI",
    title: "Sun'iy Intellekt: Kelajak Texnologiyasi",
    slug: "suniy-intellekt-kelajak-texnologiyasi",
    excerpt: "Sun'iy intellekt (AI) zamonaviy dunyoning eng muhim texnologiyalaridan biridir. Biznes, tibbiyot va boshqa sohalarda AI inqilob qilmoqda.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
    content: `# Sun'iy Intellekt: Kelajak Texnologiyasi

Sun'iy intellekt (AI) - bu kompyuter tizimlarining inson intellekti talab qiladigan vazifalarni bajarish qobiliyatidir.

## AI ning Asosiy Yo'nalishlari

### Machine Learning
Kompyuterlarning ma'lumotlardan o'rganib, tajriba orqali o'z samaradorligini oshirishi.

### Deep Learning
Ko'p qatlamli neyron tarmoqlar yordamida murakkab muammolarni yechish.

### Natural Language Processing
Kompyuterlarga inson tilini tushunish va qayta ishlash imkonini beradi.

## AI ning Qo'llanilishi

- **Biznes**: CRM, marketing, prognozlash
- **Tibbiyot**: Diagnostika, dori ishlab chiqish
- **Ta'lim**: Shaxsiylashtirilgan o'qitish
- **Transport**: Avtopilot tizimlari

**VebDream** jamoasi sifatida biz sizga AI yechimlarini biznesingizga integratsiya qilishda yordam beramiz!`,
    seoTitle: "Sun'iy Intellekt (AI): Kelajak Texnologiyasi | VebDream",
    seoDescription: "Sun'iy intellekt nima? AI qanday ishlaydi va biznesda qanday qo'llaniladi? Machine Learning va Deep Learning haqida ma'lumot.",
    keywords: ["sun'iy intellekt", "AI", "machine learning", "deep learning", "NLP", "AI O'zbekiston"],
  },
  {
    category: "Biznes",
    title: "Biznesingizni Qanday Avtomatlashtirish Mumkin",
    slug: "biznesingizni-avtomatlashtirish",
    excerpt: "Zamonaviy biznesni avtomatlashtirish - bu raqobatda ustunlik qilish kalitidir. CRM, chatbotlar va avtomatik marketing haqida.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
    content: `# Biznesingizni Qanday Avtomatlashtirish Mumkin

Zamonaviy biznes dunyosida avtomatlashtirish - bu zaruratdir.

## Avtomatlashtirish Yo'nalishlari

### 1. CRM Tizimlar
Mijozlar bilan barcha munosabatlarni boshqarish.

### 2. Marketing Avtomatlashtirish
- Email marketing
- SMS marketing
- Ijtimoiy tarmoqlar

### 3. Chatbotlar
24/7 mijozlar bilan aloqa.

### 4. Telegram Bot
Biznes jarayonlarini Telegram orqali boshqarish.

**VebDream** sizga biznes jarayonlaringizni avtomatlashtirishda yordam beradi!`,
    seoTitle: "Biznesni Avtomatlashtirish: To'liq Qo'llanma | VebDream",
    seoDescription: "Biznes jarayonlarini qanday avtomatlashtirish mumkin? CRM, chatbot, Telegram bot va marketing avtomatlashtirish yechimlar.",
    keywords: ["biznes avtomatlashtirish", "CRM", "chatbot", "telegram bot", "marketing"],
  },
  {
    category: "Web Development",
    title: "Next.js bilan Zamonaviy Web Sayt Yaratish",
    slug: "nextjs-bilan-web-sayt-yaratish",
    excerpt: "Next.js - zamonaviy web ilovalar yaratish uchun eng yaxshi framework. SSR, SEO va performance haqida batafsil ma'lumot.",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=630&fit=crop",
    content: `# Next.js bilan Zamonaviy Web Sayt Yaratish

Next.js - React asosidagi eng mashhur framework.

## Next.js Afzalliklari

- **SEO optimizatsiya**: Server-side rendering
- **Fast Performance**: Automatic code splitting
- **Easy Routing**: File-based routing system
- **API Routes**: Backend logic in the same project

**VebDream** Next.js yordamida professional web saytlar yaratadi!`,
    seoTitle: "Next.js: Zamonaviy Web Sayt Yaratish | VebDream",
    seoDescription: "Next.js framework bilan SEO-optimallashtirilgan, tez va zamonaviy web saytlar yaratish. Server-side rendering va API routes.",
    keywords: ["Next.js", "web development", "React", "SSR", "SEO", "O'zbekiston"],
  },
  {
    category: "Telegram",
    title: "Telegram Bot: Biznesingiz Uchun Kuchli Vosita",
    slug: "telegram-bot-biznes-uchun",
    excerpt: "Telegram botlari yordamida savdo, xizmat ko'rsatish va mijozlar bilan muloqotni avtomatlashtiring. 2024-yilda Telegram bot yaratish.",
    imageUrl: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=630&fit=crop",
    content: `# Telegram Bot: Biznesingiz Uchun Kuchli Vosita

Telegram - O'zbekistonda eng mashhur messenger. Bot orqali biznesingizni avtomatlashtiring!

## Bot Imkoniyatlari

### Savdo va E-commerce
- Katalog ko'rsatish
- Buyurtma qabul qilish
- To'lov (Click/Payme)
- Yetkazib berish

### Mijozlar Xizmati
- 24/7 qo'llab-quvvatlash
- FAQ javoblari
- Murojaatlarni qabul qilish

**VebDream** sizga professional Telegram bot yaratib beradi!`,
    seoTitle: "Telegram Bot Yaratish: Biznes Avtomatlashtirish | VebDream",
    seoDescription: "Telegram bot orqali savdo, xizmat va mijozlar bilan aloqani avtomatlashtiring. Click/Payme integratsiya, katalog va buyurtma tizimi.",
    keywords: ["telegram bot", "biznes bot", "click payme", "avtomatlashtirish", "O'zbekiston"],
  },
  {
    category: "SEO",
    title: "SEO Optimizatsiya: Google'da Birinchi O'ringa Chiqish",
    slug: "seo-optimizatsiya-google",
    excerpt: "SEO orqali saytingizni Google'da yuqori o'rinlarga chiqaring. 2024-yil uchun eng samarali SEO strategiyalari va amaliy maslahatlar.",
    imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200&h=630&fit=crop",
    content: `# SEO Optimizatsiya: Google'da Birinchi O'ringa Chiqish

SEO (Search Engine Optimization) - bu saytingizni qidiruv tizimlarida yuqori o'rinlarga chiqarish san'ati.

## SEO Asoslari

### 1. On-Page SEO
- **Title tags**: Har bir sahifa uchun unikal
- **Meta descriptions**: Qisqacha va jozibali
- **Headers**: H1, H2, H3 strukturasi
- **Content**: Sifatli va foydali kontent

### 2. Technical SEO
- **Site speed**: Tez yuklash
- **Mobile-friendly**: Mobil optimizatsiya
- **HTTPS**: Xavfsiz ulanish
- **Sitemap**: XML sitemap

**VebDream** saytingizni SEO bo'yicha to'liq optimallashtirisadi!`,
    seoTitle: "SEO Optimizatsiya: Google'da TOP ga Chiqish | VebDream",
    seoDescription: "Professional SEO xizmatlari. On-page, technical va off-page SEO. Saytingizni Google'da yuqori o'rinlarga chiqaring.",
    keywords: ["SEO", "SEO optimizatsiya", "Google", "qidiruv tizimi", "O'zbekiston SEO"],
  },
  {
    category: "Mobile",
    title: "Mobil Ilova: iOS va Android Uchun Yaratish",
    slug: "mobil-ilova-yaratish",
    excerpt: "Mobil ilovalar biznesingizni yangi bosqichga olib chiqadi. React Native va Flutter yordamida tez va arzon ilova yaratish.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=630&fit=crop",
    content: `# Mobil Ilova: iOS va Android Uchun Yaratish

Mobil ilovalar - bu zamonaviy biznesning muhim qismi.

## Texnologiyalar

### React Native
- Bir kod - ikkala platforma
- JavaScript/TypeScript
- Katta community

### Flutter
- Google tomonidan
- Beautiful UI
- High performance

**VebDream** professional mobil ilovalar yaratadi!`,
    seoTitle: "Mobil Ilova Yaratish: iOS va Android | VebDream",
    seoDescription: "Professional mobil ilovalar yaratish xizmati. React Native va Flutter. E-commerce, xizmatlar va ijtimoiy ilovalar.",
    keywords: ["mobil ilova", "React Native", "Flutter", "iOS", "Android", "O'zbekiston"],
  },
  {
    category: "AI",
    title: "ChatGPT va AI Chatbotlar: Biznesda Qo'llash",
    slug: "chatgpt-ai-chatbotlar",
    excerpt: "ChatGPT texnologiyasi bilan aqlli chatbotlar yarating. Mijozlar bilan suhbat, ma'lumot to'plash va qo'llab-quvvatlashni avtomatlashtirish.",
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=630&fit=crop",
    content: `# ChatGPT va AI Chatbotlar: Biznesda Qo'llash

AI chatbotlar - bu mijozlar bilan muloqotni yangi bosqichga olib chiqadi.

## AI Chatbot Imkoniyatlari

### Aqlli Suhbat
- Natural language understanding
- O'zbek, rus, ingliz tillarida

### Biznes Jarayonlar
- FAQ avtomatik javoblar
- Buyurtma qabul qilish
- Ma'lumot to'plash

**VebDream** GPT-4 asosida professional chatbotlar yaratadi!`,
    seoTitle: "AI Chatbot va ChatGPT: Biznes Uchun | VebDream",
    seoDescription: "GPT-4 asosida aqlli chatbotlar. 24/7 mijozlar bilan suhbat, avtomatik javoblar, CRM integratsiya.",
    keywords: ["AI chatbot", "ChatGPT", "GPT-4", "aqlli bot", "biznes avtomatlashtirish"],
  },
  {
    category: "Design",
    title: "UI/UX Dizayn: Foydalanuvchilarga Yoqadigan Interfeys",
    slug: "uiux-dizayn-interfeys",
    excerpt: "Yaxshi dizayn - bu muvaffaqiyatli mahsulotning asosi. UI/UX prinsiplari, zamonaviy trendlar va amaliy maslahatlar.",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=630&fit=crop",
    content: `# UI/UX Dizayn: Foydalanuvchilarga Yoqadigan Interfeys

Yaxshi dizayn - bu shunchaki chiroyli emas, bu samarali!

## UI vs UX

### UI (User Interface)
- Vizual dizayn
- Ranglar va tipografiya
- Iconlar va grafikalar

### UX (User Experience)
- Foydalanuvchi tajribasi
- Navigatsiya
- Oson foydalanish

**VebDream** professional UI/UX dizayn xizmatlari!`,
    seoTitle: "UI/UX Dizayn Xizmatlari: Professional Interfeys | VebDream",
    seoDescription: "Modern UI/UX dizayn. Foydalanuvchilarga yoqadigan, samarali va chiroyli interfeys yaratish.",
    keywords: ["UI dizayn", "UX dizayn", "interfeys", "dizayn", "O'zbekiston"],
  },
];

const projects = [
  {
    title: "E-Commerce Platform - Onlayn Do'kon",
    slug: "ecommerce-platform-uzbekistan",
    description: "To'liq funksional onlayn do'kon platformasi Click/Payme to'lov tizimlari, admin panel va Telegram bot integratsiyasi bilan.",
    category: "Web Development",
    tags: ["Next.js", "E-commerce", "Click", "Payme", "Telegram Bot"],
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop",
    demoUrl: "https://vebdream.uz",
    technologies: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    clientName: "Fashion Store UZ",
    featured: true,
    status: "COMPLETED",
  },
  {
    title: "AI Chatbot - Mijozlar Xizmati",
    slug: "ai-chatbot-customer-service",
    description: "GPT-4 asosida ishlaydigan aqlli chatbot. O'zbek, rus va ingliz tillarida mijozlar bilan suhbatlashadi, FAQ javoblar beradi.",
    category: "AI",
    tags: ["AI", "ChatGPT", "GPT-4", "NLP", "Chatbot"],
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=800&fit=crop",
    technologies: ["OpenAI GPT-4", "Python", "FastAPI", "React", "WebSocket"],
    clientName: "Tech Support Center",
    featured: true,
    status: "COMPLETED",
  },
  {
    title: "Telegram Bot - Savdo va Katalog",
    slug: "telegram-bot-sales-catalog",
    description: "Telegram bot orqali mahsulotlar sotish, buyurtma qabul qilish, Click/Payme to'lov va yetkazib berish boshqaruvi.",
    category: "Telegram Bot",
    tags: ["Telegram", "Bot", "Click", "Payme", "E-commerce"],
    imageUrl: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&fit=crop",
    technologies: ["Grammy.js", "TypeScript", "PostgreSQL", "Click API", "Payme API"],
    clientName: "Electronics Shop",
    featured: true,
    status: "COMPLETED",
  },
  {
    title: "CRM Tizim - Biznes Boshqaruvi",
    slug: "crm-system-business-management",
    description: "Mijozlar, buyurtmalar, vazifalar va hisobotlarni boshqarish uchun to'liq CRM tizimi. Telegram integratsiya va avtomatik xabarnomalar.",
    category: "Web Development",
    tags: ["CRM", "Business", "Management", "Dashboard", "Analytics"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    technologies: ["Next.js", "Prisma", "Chart.js", "Telegram API"],
    clientName: "Service Company",
    featured: true,
    status: "COMPLETED",
  },
  {
    title: "Mobil Ilova - Yetkazib Berish",
    slug: "mobile-app-delivery-service",
    description: "Ovqat yetkazib berish xizmati uchun mobil ilova. Real-time tracking, to'lov va buyurtmalar tarixi.",
    category: "Mobile App",
    tags: ["React Native", "Mobile", "Delivery", "Geolocation"],
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
    technologies: ["React Native", "Expo", "Firebase", "Google Maps API"],
    clientName: "Food Delivery UZ",
    featured: false,
    status: "COMPLETED",
  },
  {
    title: "Corporate Website - Company Portal",
    slug: "corporate-website-company-portal",
    description: "Zamonaviy corporate vebsayt. Blog, portfolio, services va contact formalar bilan to'liq SEO optimizatsiya.",
    category: "Web Development",
    tags: ["Website", "Corporate", "SEO", "Blog"],
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Prisma"],
    clientName: "IT Company",
    featured: false,
    status: "COMPLETED",
  },
];

async function seedContent() {
  console.log("🌱 Ma'lumotlar bazasiga seed boshlandi...\n");

  try {
    // Clear existing data
    console.log("🗑️  Eski ma'lumotlarni o'chirish...");
    await prisma.blogPost.deleteMany({});
    await prisma.project.deleteMany({});
    console.log("✅ Eski ma'lumotlar o'chirildi\n");

    // Seed blog posts
    console.log("📝 Blog postlarini yaratish...");
    for (const post of blogPosts) {
      const created = await prisma.blogPost.create({
        data: {
          ...post,
          author: "VebDream Team",
          readTime: Math.ceil(post.content.split(" ").length / 200),
          status: "PUBLISHED",
        },
      });
      console.log(`✅ ${created.title}`);
    }
    console.log(`\n🎉 ${blogPosts.length} ta blog post yaratildi!\n`);

    // Seed projects
    console.log("💼 Loyihalarni yaratish...");
    for (const project of projects) {
      const created = await prisma.project.create({
        data: {
          ...project,
          completedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          views: Math.floor(Math.random() *500),
        },
      });
      console.log(`✅ ${created.title}`);
    }
    console.log(`\n🎉 ${projects.length} ta loyiha yaratildi!\n`);

    console.log("✨ Seed muvaffaqiyatli yakunlandi!");
  } catch (error) {
    console.error("❌ Xatolik:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedContent();
