# WillowVibe | Data Synapse — Company Website

> Official website for WillowVibe | Data Synapse, a data engineering services company.
>
> 🌐 **Live site:** [www.willowvibe.com](https://www.willowvibe.com)
> 🔧 **Staging (Vercel preview):** [willowvibe-web.vercel.app](https://willowvibe-web.vercel.app)
> 📦 **Repository:** [github.com/Sruthi-ng/willowvibe-web](https://github.com/Sruthi-ng/willowvibe-web)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework — App Router |
| [React 19](https://react.dev) | UI library |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Nodemailer](https://nodemailer.com) | Contact form emails |
| [Lucide React](https://lucide.dev) | Icons |
| [Vercel](https://vercel.com) | Hosting + auto-deploy |

---

## Project Structure

```
willowvibe-web/
├── src/
│   ├── app/                        # All pages (Next.js App Router)
│   │   ├── page.tsx                # Home page
│   │   ├── about/page.tsx          # About Us page
│   │   ├── services/page.tsx       # Services page
│   │   ├── contact/page.tsx        # Contact page
│   │   ├── privacy/page.tsx        # Privacy Policy page
│   │   ├── terms/page.tsx          # Terms of Service page
│   │   ├── api/
│   │   │   └── contact/route.ts    # Contact form email API
│   │   ├── layout.tsx              # Root layout — Navbar + Footer on all pages
│   │   └── globals.css             # Global styles + Tailwind theme tokens
│   └── components/
│       ├── Navbar.tsx              # Top navigation bar
│       ├── Footer.tsx              # Site footer
│       ├── BeforeAfterSlider.tsx   # PLM project visual
│       ├── DataStreamVisual.tsx    # Logistics project visual
│       └── AnomalyDetectionVisual.tsx  # Fintech project visual
├── public/                         # Static assets (images, icons)
├── .env.local                      # Secret keys — NOT committed to GitHub
├── package.json
└── README.md
```

---

## Pages Overview

### Home (`/`)
- Hero section with pipeline animation
- Trust ticker (AWS, Snowflake, Databricks...)
- The Process section with robot animation
- Core Capabilities — 4 service cards
- Featured Projects — swipeable carousel (3 projects)
- Client Endorsements — swipe carousel on mobile, grid on desktop

### About (`/about`)
- Team section — flip cards in triangle on mobile, grid on desktop
- Mission statement
- Operating Principles — 3 compact blocks
- Stats (99.99% uptime, 50+ clients, 10PB+)

### Services (`/services`)
- 8 service cards in 2-column mobile / 4-column desktop grid
- Each card links to `/contact`

### Contact (`/contact`)
- Contact info (email + LinkedIn)
- Working contact form → sends email to `contact@willowvibe.com`
- Form has loading, success, and error states

### Privacy Policy (`/privacy`) and Terms of Service (`/terms`)
- Legal pages — last updated April 2026

---

## Local Development Setup

### 1. Clone the repo
```bash
git clone https://github.com/Sruthi-ng/willowvibe-web.git
cd willowvibe-web
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
Create a file called `.env.local` in the project root:
```
GMAIL_USER=your-company-gmail@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

> **How to get Gmail App Password:**
> 1. Go to myaccount.google.com → Security
> 2. Enable 2-Step Verification
> 3. Search "App Passwords" → create one named "WillowVibe"
> 4. Copy the 16-character password

### 4. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

The site auto-deploys to Vercel whenever you push to the `main` branch and goes live at **www.willowvibe.com**.

**How it works:**
- You push code to GitHub → Vercel detects it → builds and deploys automatically
- The custom domain `www.willowvibe.com` is connected to Vercel via Hostinger DNS
- The staging URL `willowvibe-web.vercel.app` always reflects the latest push too

```bash
git add .
git commit -m "your message here"
git push origin main
```

Vercel picks up the push and deploys in ~60 seconds.

### Environment Variables on Vercel
These must be added in Vercel dashboard → Project → Settings → Environment Variables:

| Variable | Value |
|---|---|
| `GMAIL_USER` | your-company-gmail@gmail.com |
| `GMAIL_APP_PASSWORD` | your 16-char app password |

> ⚠️ Never put these in the code or commit `.env.local` to GitHub.

---

## How to Make Common Updates

### Update team member info
File: `src/app/about/page.tsx`
Find the `TEAM` array at the top of the file. Edit `name`, `role`, `bio`, or `keywords` for each person.

### Add a team photo
In the same file, find the `FlipCard` component. Replace:
```tsx
<span className={`text-3xl font-extrabold font-mono ${t.text}`}>{member.initials}</span>
```
With:
```tsx
<img src="/photos/harish.jpg" alt={member.name} className="w-full h-full object-cover rounded-full" />
```
Put the photo file in the `public/photos/` folder.

### Update services
**Home page services (4 cards):** `src/app/page.tsx` → find `const SERVICES`
**Services page (8 cards):** `src/app/services/page.tsx` → find `const services`

### Update featured projects
File: `src/app/page.tsx`
Find `const PROJECTS` at the top and edit `title`, `desc`, `tags`, or `stat`.

### Update testimonials
File: `src/app/page.tsx`
Find `const TESTIMONIALS` and edit the `quote`, `name`, and `role` fields.

### Update contact email
File: `src/app/api/contact/route.ts`
Change the `to` address in `transporter.sendMail(...)`.

### Change brand colours
File: `src/app/globals.css`
The primary cyan colour is `--color-primary: #00f0ff`. Change this to update the glow colour across the whole site.

---

## Brand

| Item | Value |
|---|---|
| Brand name | WillowVibe \| Data Synapse |
| Primary colour | Cyan `#00f0ff` |
| Secondary colour | Purple `#7000ff` |
| Background | Near-black `#050505` |
| Font | Geist Sans + Geist Mono |
| Email | contact@willowvibe.com |
| LinkedIn | /company/willowvibe |

---

## Contact Form — How It Works

1. User fills in the form at `/contact`
2. Form submits to `/api/contact` (Next.js API route)
3. Server validates the fields
4. Nodemailer sends an email via Gmail SMTP
5. Email arrives at `contact@willowvibe.com`
6. User sees a success confirmation on screen

If the form shows an error, check:
- `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set correctly in Vercel env vars
- The Gmail account has 2-Step Verification enabled
- The App Password was generated for the correct Gmail account

---

## Git Workflow

```bash
# Check what changed
git status

# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "feat: add team photos"

# Push to GitHub → triggers Vercel auto-deploy
git push origin main
```

---

## Built and maintained by WillowVibe | Data Synapse
