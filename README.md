# Relood

Buy and sell outgrown kids clothes, toys, and gear. Local pickup. Fixed prices. No haggling, no scams.

**Status:** v0 skeleton — landing page + item-listing preview route. Full marketplace not yet wired.

**Landing:** https://relood.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to GitHub and import into Vercel. No environment variables required — everything is public and hardcoded.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo grid, features, waitlist form |
| `/try` | Mock listing form: upload photo, set size/price/condition, preview card in grid |
| `/api/waitlist` | POST `{ email }` → forwards to waitlist-api-sigma with `product: "relood"` |
