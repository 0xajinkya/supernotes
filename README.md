# 🚀 Getting Started with SuperNotes

## 🧩 Set Up Supabase

1. Create a project at [Supabase Dashboard](https://supabase.com/dashboard/projects).
2. Copy your `Supabase URL` and `Anon Key` into your `.env` file.
3. Click the **Connect** button at the top-left corner (next to the project name).
4. Copy the **Direct Connection URL** and **Transaction Pooler URL** into your `.env`.

---

## 🔐 Create Google OAuth Credentials

1. Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Click **Create Credentials** → **OAuth Client ID**.
3. Choose `Web Application` as the application type.
4. Add the following as **Authorized JavaScript Origins**:
   - Your Development URL
   - Your Supabase Project URL
   - Your Production App URL

---

## 🔧 Configure Google OAuth in Supabase

1. Go to the **Authentication** tab in your Supabase project.
2. Under **Auth Providers**, select **Google**.
3. Enter your **Google OAuth Client ID** and **Client Secret**.
4. Copy the **Callback URL** and paste it into the **Authorized Redirect URIs** in your Google Console.

---

## ✉️ Customize Email Template

```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">
    Confirm your mail
  </a>
</p>
```

---

## ⚙️ Add Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your_supabase_url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DIRECT_URL=your_supabase_direct_url
NEXT_PUBLIC_DB_URL=your_supabase_db_url
NEXT_PUBLIC_NODE_ENV=development # or production
NEXT_PUBLIC_API_DOMAIN=http://localhost:3000
NEXT_PUBLIC_GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

---

## 📥 Clone the Repository

```bash
git clone https://github.com/0xajinkya/supernotes.git 
```

---

## 🛠️ Local Setup

### Install dependencies

```bash
pnpm i
```

### Migrate the database schemas

```bash
pnpm db:migrate
```

### Generate database types

```bash
pnpm db:generate
```

### Start development server

```bash
pnpm dev
```

---

## 🚀 Production Setup

### Install dependencies

```bash
pnpm i
```

### Build project

```bash
pnpx prisma migrate && pnpx prisma generate && pnpm run build
```

---

## 🧱 Tech Stack

- **Next.js** (with API Routes)
- **ShadCN** + **Tailwind CSS**
- **Supabase**
- **Google GenAI**
- **Prisma**
- **Tiptap**
- **React Query**
- **Redux Toolkit**
- **React Redux**

---

## ✨ Features / Flows

### 🔐 Create an Account
- Use email or Google login.
- Email-based login sends a confirmation email.

### 🔑 Log In
- Log in using your email or Google.
- Google login will create an account if one doesn't exist.
- Unverified emails will receive a new confirmation link.

### 📝 Create Note
- Click `New Note` or the ➕ icon in `/app`.
- Requires a title and content.
- Automatically generates an AI summary.

### ✏️ Update Note
- On the note page, the ➕ icon becomes ✏️.
- Update title/content, and the slug & AI summary update too.

### 🚪 Log Out
- Simply logs you out of your session.

---

## 🧬 Database Schema

### 👤 User
- First Name
- Last Name
- Email  
*Passwords are managed by Supabase Auth.*

### 🗒️ Note
- Title
- Content
- Slug
- AI Summary

---

## 📁 Folder Structure

```
├── prisma
│   └── migrations
│       ├── 20250422012923_added_user_table
│       └── 20250422173930_added_note_model
├── public
│   ├── home
│   ├── icons
│   └── login
└── src
    ├── api
    ├── app
    │   ├── api
    │   │   ├── auth
    │   │   │   ├── callback
    │   │   │   ├── get-me
    │   │   │   ├── login
    │   │   │   ├── oauth
    │   │   │   │   └── google
    │   │   │   └── signup
    │   │   └── note
    │   │       ├── create
    │   │       ├── get-note
    │   │       ├── get-side-notes
    │   │       └── [slug]
    │   ├── (auth)
    │   │   ├── auth
    │   │   │   └── confirm
    │   │   ├── login
    │   │   └── signup
    │   ├── dashboard
    │   ├── error
    │   └── (protected)
    │       ├── app
    │       └── list
    │           └── [...slug]
    ├── components
    │   ├── App
    │   ├── Auth
    │   ├── Home
    │   ├── List
    │   ├── providers
    │   └── ui
    ├── hooks
    ├── interfaces
    ├── lib
    ├── middlewares
    ├── services
    ├── store
    │   └── slices
    └── utils
        └── supabase
```

---

# Demo
https://www.loom.com/share/dd03f7a8e2b8475d868e2bff5c860567?sid=9e31f49a-e39a-4de1-a594-ffa3a88dbff4