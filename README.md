# The Chapter

Classic literature delivered to your inbox, chapter by chapter.

## How It Works

1. User picks a book, enters their email, chooses delivery days
2. Chapter 1 arrives instantly (in-app + real email)
3. More chapters arrive on schedule — automatically
4. First 3 chapters free, then $2 per book

## Deploy to Vercel (5 minutes)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "The Chapter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/the-chapter.git
git push --set-upstream origin main
```

### 2. Deploy on Vercel

- Go to [vercel.com/new](https://vercel.com/new)
- Import the `the-chapter` repo
- Add environment variables:
  - `RESEND_API_KEY` = your Resend API key (`re_xxxx`)
  - `FROM_EMAIL` = `The Chapter <onboarding@resend.dev>` (or your verified domain)
- Click Deploy

### 3. Set up Resend

- Sign up at [resend.com](https://resend.com) (free: 100 emails/day)
- Get API key from Dashboard → API Keys
- Add it as `RESEND_API_KEY` in Vercel → Settings → Environment Variables
- Optional: verify a custom domain for branded sender address

## Architecture

```
the-chapter.jsx    → React frontend (artifact or standalone)
api/send.js        → Vercel serverless function (proxies to Resend)
```

The frontend calls `/api/send` with email data. The serverless function adds the API key server-side and forwards to Resend. No API keys in client code.

## Tech Stack

- **Frontend**: React (single-file JSX)
- **Text**: Wikisource API + Claude API fallback
- **AI Preludes**: Claude Sonnet via Anthropic API
- **Email**: Resend via Vercel serverless proxy
- **Storage**: Persistent browser storage
