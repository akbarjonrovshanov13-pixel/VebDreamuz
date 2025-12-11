const fs = require('fs');

const envContent = `DATABASE_URL=postgresql://neondb_owner:npg_BqiI0U9WSkgV@ep-twilight-band-agu82qml-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
NODE_ENV=development

# NextAuth
NEXTAUTH_SECRET=sKYRjI6Nz7CMOW82TBlQSR4MZ3HJOw6w+OrttFM00JQ=
NEXTAUTH_URL=http://localhost:3000

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BM1ZY9bMwtW6sAEhZFleehznJ5fkwjbT2OvNpQM2tjGbrA5LJzz7YRMAwdAiCn345st_TwoTNG569TmvYTQMz5o
VAPID_PRIVATE_KEY=hY6loS43xvKmaAN-oWPeTivPf4ykHniS9y8qJIa2qVw
`;

fs.writeFileSync('.env', envContent);
console.log('.env file updated with NEXTAUTH_SECRET!');
