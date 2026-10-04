# Nigeria Election Map

An interactive presidential election simulator for Nigeria's 36 states and the FCT, with real
state borders, a share button, and optional sign-in to save predictions.

**The map is public.** Nobody has to sign in to build a scenario, view results, or share a link.
Signing in is only needed for one thing: saving a named prediction to come back to later.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

You still need Clerk keys (below) for the app to start, even though visitors don't have to sign in.

## Required: set up Clerk (for the optional "Save" feature)

1. Go to **clerk.com**, sign up free, and create an application.
2. In the application's SSO/social connections settings, turn on **Google** and **Email**. These
   work immediately, no approval needed.
   Facebook and TikTok can be added the same way, but Meta and TikTok must approve your app for
   public users first -- that can take several days.
3. Copy the **Publishable key** and **Secret key** from the API Keys page.
4. **On Vercel**: open your project -> **Settings -> Environment Variables** -> add:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   Do this *before* your next deploy, or the build will fail.
5. **Locally**: create `.env.local` in the project root with the same two lines:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   ```

## How "Save this prediction" works

A saved prediction is stored on the signed-in user's own Clerk profile (their account's
metadata) -- there's no separate database to run for this. Each person can keep up to 20 named
predictions and reload any of them later. This is not a public leaderboard; nobody else can see
another person's saved list.

If you later want unlimited saves, a public leaderboard, or any other shared data across users,
that needs a real database. Vercel's own Postgres was retired in favour of Neon, available free
from the Vercel Marketplace -- ask me when you're ready to add it.

## Deploy on Vercel (free)

1. Push this folder to a GitHub repository (or update your existing one).
2. Add the two Clerk environment variables in Vercel first (see above).
3. Import/redeploy the project. No other setup is needed.

## Where things live

| File | What it does |
| --- | --- |
| `lib/data.js` | Parties, colours, the 37 units, registered voters, default turnout |
| `lib/geo.js` | Real state boundaries (geoBoundaries, CC BY 4.0), as SVG paths |
| `lib/engine.js` | The maths: national totals, 25% counts, winner/runoff, simulations |
| `lib/share.js` | Packs/unpacks a scenario into a short link |
| `components/NigeriaMap.js` | The map (real state shapes) |
| `components/Ranking.js` | National result and the 24-of-37 threshold strips |
| `components/ShareBar.js` | Share link, X/Facebook/WhatsApp, download as image |
| `components/SaveBar.js` | Optional sign-in; save/reload named predictions |
| `components/StatePanel.js` | Edit one state's turnout and party shares |
| `components/Tools.js` | National turnout, probabilities, simulations, zone scenarios |
| `middleware.js` | Keeps Clerk sessions in sync; does not block any page |

## Common changes

- Add or rename a party: edit `PARTIES` in `lib/data.js`.
- Update registered voters: edit `REGISTERED_VOTERS` in `lib/data.js` when INEC publishes new
  figures.
- Require sign-in for the whole app again: in `middleware.js`, change the export to
  `clerkMiddleware(async (auth) => { await auth.protect(); })`.

## SEO and AdSense (added October 2026)

New pages: /about, /paths-to-victory, /2023-election-results, /25-percent-rule,
/states/<name> (37 pages), /contact, /privacy, /terms, /disclaimer.
Sitemap: /sitemap.xml. Robots: /robots.txt. Share image: app/opengraph-image.js.

After deploying:
1. Google Search Console: add a Domain property for electionmap.ng, paste the
   TXT record it gives you into Whogohost DNS, verify, then submit
   https://www.electionmap.ng/sitemap.xml
2. Bing Webmaster Tools: "Import from Google Search Console".
3. Make sure support@electionmap.ng works (Zoho) before applying for AdSense.
   The address is set in lib/site.js.
4. AdSense needs Vercel Pro (Hobby is non-commercial). After approval, create
   public/ads.txt containing the line AdSense gives you, e.g.
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0

Party slots on the map are now APC, ADC, NDC (INEC final list, Sept 2026).

## Personalised share previews (v7)
- `app/og/route.js` draws a 1200x630 picture of a shared scenario: `/og?s=CODE`.
- `app/page.js` gives every shared link (`/?s=CODE`) its own title, `og:url` and preview image.
- `lib/scenarioImage.js` holds the shared helpers (decode, headline, map SVG).
- Test a link in Facebook's Sharing Debugger: https://developers.facebook.com/tools/debug/

## Icons (v8)
- `app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png`: browser tab and iPhone icons (Next.js picks them up automatically).
- `app/manifest.js` + `public/icon-192.png`, `public/icon-512.png`: Android "Add to home screen".
