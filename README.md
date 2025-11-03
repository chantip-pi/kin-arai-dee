# Kin Arai Dee — LINE Chatbot on Cloudflare Workers

Try it here>> https://line.me/R/ti/p/@772xrtyk

A simple LINE Messaging API bot deployed on Cloudflare Workers. It replies with:
- A random Thai food Flex message for text messages
- A nearby restaurant suggestion for location messages (no API key required via OpenStreetMap), with a Google Maps link

## Stack
- Cloudflare Workers (Wrangler)
- LINE Messaging API
- TypeScript

## Project structure
```
public/            # Optional static assets (served if bound via assets)
src/
  index.ts         # Worker entry (webhook handler)
  line.ts          # Minimal LINE Reply API helper
  utils.ts         # Flex builder, food list, nearby restaurant utils
wrangler.jsonc     # Worker config
```

## Prerequisites
- Node.js 18+
- A LINE Messaging API channel (Official Account)
- A long‑lived Channel access token (NOT the channel secret)

## Setup
Install deps:
```bash
npm install
```

### Local development (no secrets exposed)
Create a `.dev.vars` file at the project root (same directory as `wrangler.jsonc`):
```
LINE_MESSAGING_ACCESS_TOKEN=YOUR_LONG_LIVED_CHANNEL_ACCESS_TOKEN
```
Start dev server:
```bash
npm run dev
```
This runs `wrangler dev` locally and injects values from `.dev.vars`.

### Remote dev / Production (Cloudflare secrets)
Set the secret in your Cloudflare Worker (stored securely by Cloudflare):
```bash
npx wrangler secret put LINE_MESSAGING_ACCESS_TOKEN
```
Then run remote dev or deploy:
```bash
npx wrangler dev --remote
npm run deploy
```

## Configure LINE Webhook
- Webhook URL: your Worker URL (e.g. `https://<worker>.<account>.workers.dev/`)
- Method: POST
- Ensure the webhook is enabled in LINE Developers Console

This bot expects LINE’s webhook JSON (no custom headers required from LINE). It returns HTTP 200 quickly and sends replies asynchronously.

## Features
- Text message: sends a Flex card featuring a random Thai dish and image
- Location message: replies with one nearby restaurant (name + Google Maps link) using OpenStreetMap Overpass (no API key). Falls back to a nearby search link if OSM returns no results

## Testing
### Quick Postman/curl test (Worker 200 OK)
Use a non‑trigger payload (any text) to receive a 200 from the Worker without calling LINE:
```json
{
  "destination": "Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "events": [
    {
      "type": "message",
      "timestamp": 1730614000000,
      "source": { "type": "user", "userId": "Utestuser" },
      "message": { "id": "1", "type": "text", "text": "hello" }
    }
  ]
}
```
Note: To actually see a reply in LINE chat, you must use a real webhook from LINE (valid `replyToken`) and a valid `LINE_MESSAGING_ACCESS_TOKEN`.

## Environment variables
- `LINE_MESSAGING_ACCESS_TOKEN` (required): the long‑lived Channel access token from LINE Developers Console

## Common issues
- 401 Unauthorized (from LINE):
  - Using channel secret instead of channel access token
  - Token missing/invalid/not for the same channel as the webhook
  - Header must be `Authorization: Bearer <token>` (already handled in `src/line.ts`)
  - Verify via:
    ```bash
    curl -sH "Authorization: Bearer YOUR_TOKEN" https://api.line.me/v2/oauth/verify
    ```
- 405 Method Not Allowed from Worker:
  - The Worker only accepts POST for the webhook. Other methods should be avoided for the webhook URL
- 404 Not Found in LINE verify tool:
  - Ensure the webhook URL matches your deployed Worker route/URL

## Notes on SSL/TLS
`*.workers.dev` uses HTTPS with valid CA certificates by default. If you use a custom domain, ensure proper SSL settings in Cloudflare and correct route binding.

## Reference
https://medium.com/linedevth/line-food-random-x-cloudflare-workers-edb12972616d

## License
MIT


