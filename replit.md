# VebDream - Professional Web Saytlar va IT Xizmatlari

## Umumiy Ma'lumot
VebDream - bu O'zbekiston uchun mo'ljallangan professional veb-agentlik platformasi bo'lib, web sayt yaratish, mobil ilovalar, Telegram botlar va zamonaviy IT xizmatlari taqdim etadi.

## Texnologiyalar
- **Framework**: Next.js 14 (App Router)
- **Til**: TypeScript
- **Ma'lumotlar bazasi**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS
- **UI Komponentlar**: Radix UI, Framer Motion
- **Autentifikatsiya**: NextAuth.js
- **AI Integratsiya**: Google Gemini API
- **Bot**: Grammy (Telegram)

## Loyiha Tuzilishi
```
/app              - Next.js App Router sahifalar va API routes
  /admin          - Admin panel sahifalari
  /api            - API routes (auth, blog, contact va h.k.)
  /blog           - Ommaviy blog sahifalari
  /portfolio      - Portfolio sahifalari
/components       - React komponentlar
  /admin          - Admin-ga xos komponentlar
  /sections       - Sahifa bo'limlari (hero, services va h.k.)
  /ui             - Qayta ishlatiladigan UI komponentlar
/lib              - Utility kutubxonalar va konfiguratsiyalar
/prisma           - Ma'lumotlar bazasi sxemasi
/public           - Statik fayllar
/scripts          - Yordamchi skriptlar
```

## Rivojlantirish
- Ishga tushirish: `npm run dev -- -p 5000 -H 0.0.0.0`
- Dev server 5000 portda ishlaydi

## Ma'lumotlar Bazasi
- PostgreSQL Prisma orqali
- Sxema `/prisma/schema.prisma` da
- Sxema o'zgarishlarini push qilish: `npx prisma@5 db push`
- Client yaratish: `npx prisma generate`

## Asosiy Xususiyatlar
- Zamonaviy responsive dizayn va animatsiyalar
- Admin panel (kontent boshqaruvi)
- Blog tizimi (SEO optimallashtirish bilan)
- Portfolio namoyishi
- Aloqa formasi
- AI orqali kontent yaratish (Gemini API kerak)
- Telegram bot integratsiyasi (ixtiyoriy)

## Kerakli Muhit O'zgaruvchilari
- `DATABASE_URL` - PostgreSQL ulanish (avtomatik)
- `NEXTAUTH_SECRET` - NextAuth.js maxfiy kalit
- `NEXTAUTH_URL` - Autentifikatsiya uchun URL
- `GEMINI_API_KEY` - Google Gemini API kaliti (ixtiyoriy, AI uchun)
- `TELEGRAM_BOT_TOKEN` - Telegram bot tokeni (ixtiyoriy)
- `UNSPLASH_ACCESS_KEY` - Unsplash API kaliti (ixtiyoriy, rasmlar uchun)

## Dizayn Tizimi
- **Asosiy rang**: Cyan (#0EA5E9)
- **Gradient**: Cyan -> Blue
- **Orqa fon**: Slate-900 (#0f172a)
- **Brend nomi**: VebDream
