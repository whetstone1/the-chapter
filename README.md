# The Chapter

Classic literature delivered to your inbox, chapter by chapter.

## What It Does

- Browse a curated library of public domain classics
- Subscribe with just your email and pick your delivery schedule (which days, how many chapters)
- Get Chapter 1 instantly — then chapters arrive on your schedule
- AI-generated preludes set the scene for each chapter
- Invite friends to read along at the same pace
- First 3 chapters free per book, then $2 for the full book
- Beautiful in-app reader with themes, fonts, and text-to-speech

## Tech Stack

- **Frontend**: React (single-file JSX, runs as a Claude artifact or standalone)
- **Text Sources**: Wikisource API + Claude API fallback
- **AI Preludes**: Claude Sonnet via Anthropic API
- **Email Delivery**: Resend API
- **Storage**: Browser persistent storage (artifact) or localStorage

## Setup

### 1. Email Delivery (Resend)

1. Go to [resend.com](https://resend.com) and create a free account
2. Get your API key from the dashboard
3. Set `RESEND_API_KEY` on line 19 of `the-chapter.jsx`
4. Optionally verify a custom domain, or use `onboarding@resend.dev` for testing

### 2. Deploy

The app runs as a Claude artifact. To deploy standalone, wrap it in a Vite/Next.js project.

## Configuration

All config is at the top of `the-chapter.jsx`:

```js
const RESEND_API_KEY = "";        // Your Resend API key
const FROM_EMAIL = "...";         // Verified sender address
const FREE_CHAPTERS = 3;          // Free trial length per book
```

## License

Content sourced from public domain works via Wikisource.
