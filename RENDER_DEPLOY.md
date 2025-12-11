# VebDream - Render.com Deploy Guide

Ushbu qo'llanma orqali **VebDream** loyihasini **Render.com** ga bepul deploy qilishingiz mumkin.

## 1. Tayyorgarlik

1. Loyihangizni **GitHub** ga yuklang (agar yuklanmagan bo'lsa).
2. [Render.com](https://render.com) dan ro'yxatdan o'ting (GitHub orqali kiring).

## 2. Blueprint Orqali Deploy (Eng Oson Usul)

Biz loyihada `render.yaml` faylini yaratdik, bu jarayonni avtomatlashtiradi.

1. Render Dashboard da **"New +"** tugmasini bosing va **"Blueprint"** ni tanlang.
2. **"Connect a repository"** bo'limida GitHub dagi `vebdream` repozitoriyangizni tanlang.
3. **"Service Name"** ga nom bering (masalan: `vebdream-app`).
4. **"Apply"** tugmasini bosing.

Render avtomatik ravishda:
- **PostgreSQL Database** yaratadi
- **Web Service** (Next.js app) yaratadi
- Ikkalasini bir-biriga ulaydi

## 3. Environment Variables Sozlash

Blueprint yaratilgandan so'ng, ba'zi maxfiy kalitlarni qo'lda kiritish kerak bo'ladi.

1. Render Dashboard da **vebdream** web service'iga kiring.
2. **"Environment"** bo'limiga o'ting.
3. Quyidagi o'zgaruvchilarni tekshiring va to'ldiring:

| Key | Value | Izoh |
|-----|-------|------|
| `GEMINI_API_KEY` | `AIzaSy...` | Google AI Studio dan olingan key |
| `TELEGRAM_BOT_TOKEN` | `123456:ABC...` | BotFather dan olingan token |
| `TELEGRAM_CHANNEL_ID` | `@kanal_nomi` | Kanalingiz username'i |
| `TELEGRAM_ADMIN_ID` | `99887766` | O'zingizning Telegram ID raqamingiz |
| `NEXT_PUBLIC_APP_URL` | `https://sizning-app.onrender.com` | Render bergan domen |
| `NEXTAUTH_URL` | `https://sizning-app.onrender.com` | Render bergan domen |

> **Eslatma:** `DATABASE_URL`, `NEXTAUTH_SECRET` va `CRON_SECRET` avtomatik yaratiladi.

## 4. Deploy Jarayoni

1. O'zgaruvchilarni saqlaganingizdan so'ng, **"Manual Deploy"** -> **"Deploy latest commit"** tugmasini bosing.
2. Build jarayoni boshlanadi (taxminan 5-10 daqiqa davom etadi).
3. Agar hammasi to'g'ri bo'lsa, **"Live"** statusini ko'rasiz.

## 5. Admin Foydalanuvchi Yaratish

Deploy bo'lgandan so'ng, database bo'sh bo'ladi. Admin yaratish uchun:

1. Render da Web Service ichida **"Shell"** tabiga o'ting.
2. Quyidagi buyruqni yozing:
   ```bash
   node scripts/create-admin.js
   ```
3. Bu sizga admin login va parolini chiqarib beradi.

## 6. Kontent Yaratish (Seed)

Sayt bo'sh ko'rinmasligi uchun boshlang'ich kontentni yuklang:

1. Yana **"Shell"** tabida:
   ```bash
   node scripts/seed-all-content.js
   ```
2. Bu 8 ta blog post va 6 ta portfolio loyihasini yaratadi.

## 🎉 Tabriklaymiz!

Saytingiz endi internetda jonli! 
Domen: `https://sizning-app-nomi.onrender.com`
