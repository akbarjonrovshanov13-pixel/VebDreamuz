# VebDream - Quick Setup Guide

## 🚀 Quick Start (5 daqiqada)

### 1. Dependencies o'rnatish
```bash
npm install
```

### 2. Environment Variables sozlash
`.env` faylini yarating va quyidagilarni kiriting:

```env
# Database (Lokal test uchun - ixtiyoriy)
DATABASE_URL="postgresql://postgres:password@localhost:5432/vebdream"

# Gemini AI (MAJBURIY)
GEMINI_API_KEY="sizning_gemini_api_key"

# Telegram Bot (MAJBURIY)
TELEGRAM_BOT_TOKEN="sizning_bot_token"
TELEGRAM_CHANNEL_ID="@sizning_kanal"
TELEGRAM_ADMIN_ID="sizning_telegram_id"

# NextAuth
NEXTAUTH_SECRET="random_secret_key_123"
NEXTAUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
CRON_SECRET="random_cron_secret_456"
```

### 3. API Keys olish

#### Gemini API Key (2 daqiqa)
1. [Google AI Studio](https://makersuite.google.com/app/apikey) ga kiring
2. "Create API Key" tugmasini bosing
3. Kalitni nusxalang va `.env` ga kiriting

#### Telegram Bot Token (3 daqiqa)
1. Telegram'da [@BotFather](https://t.me/botfather) ni oching
2. `/newbot` buyrug'ini yuboring
3. Bot nomi va username kiriting
4. Tokenni nusxalang va `.env` ga kiriting

#### Telegram Channel ID
1. Telegram'da kanal yarating
2. Botni kanalga admin qiling
3. Kanal username'ini `.env` ga kiriting (masalan: `@vebdream_channel`)

### 4. Database sozlash (Ixtiyoriy - keyinroq ham qilish mumkin)
```bash
npm run db:push
```

### 5. Development serverni ishga tushirish
```bash
npm run dev
```

Brauzerda [http://localhost:3000](http://localhost:3000) ni oching

## ✅ Minimal sozlash (Database'siz test)

Agar databaseni keyinroq sozlamoqchi bo'lsangiz:

1. Faqat **GEMINI_API_KEY** ni sozlang
2. `lib/prisma.ts` dan foydalanadigan barcha joylarni comment qiling
3. Mock data bilan test qiling

## 🧪 AI Content Generation testi

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Authorization: Bearer random_cron_secret_456" \
  -H "Content-Type: application/json" \
  -d '{"category": "AI"}'
```

## 📱 Telegram Bot test

Telegram'da botingizga `/start` yuboring

## 🐛 Troubleshooting

### Database error
- Database URL to'g'ri ekanligini tekshiring
- PostgreSQL ishlab turganini tekshiring
- Yoki databasesiz mock data bilan test qiling

### Gemini API error
- API key to'g'ri ekanligini tekshiring
- Internet aloqangizni tekshiring
- Rate limit'ga yetmaganingizni tekshiring

### Telegram error
- Bot token to'g'ri ekanligini tekshiring
- Bot kanalda admin ekanligini tekshiring

## 📦 Production Deploy (Vercel)

1. GitHub'ga push qiling
2. [Vercel](https://vercel.com)'da import qiling
3. Environment variables'larni kiriting
4. Deploy qiling

## 💡 Keyingi qadamlar

1. ✅ Database'ni to'liq sozlash
2. ✅ Real content generate qilish
3. ✅ Telegram bot'ni to'liq test qilish
4. ✅ Admin dashboard qo'shish
5. ✅ Analytics integratsiya qilish

## 🎯 Minimal ishlaydigan versiya uchun kerak:

- ✅ Next.js dependencies
- ✅ Gemini API key
- ⭕ Database (keyinroq)
- ⭕ Telegram (keyinroq)

Savol bo'lsa: info@vebdream.uz
