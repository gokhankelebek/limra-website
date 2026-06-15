# Connecting Sanity (one-time setup)

The CMS code is fully built. Until a Sanity project is connected, the site
runs on local fallback data (the menu still shows; the Journal shows an
empty state). The moment you add the project ID below, everything goes live
and editable.

## 1. Create the project (5 minutes)

```bash
npx sanity@latest login        # sign in / create a free Sanity account
npx sanity@latest init --env   # create a project + dataset, writes .env.local
```

When prompted:
- Create a **new project**, name it `Limra`.
- Use the default dataset name **production** (public).
- It writes `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
  into `.env.local`.

If you'd rather do it by hand, create `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
```

Restart `npm run dev` after editing env.

## 2. Open the Studio

Visit **/studio** (e.g. `http://localhost:3000/studio`, and `your-domain.com/studio`
in production). Sign in with the same Sanity account. You'll see:
Site settings · Menu categories · Dishes · Blog posts · Authors · Blog categories.

## 3. Invite the team (Pro Digital Strategy)

In <https://www.sanity.io/manage> → the Limra project → **Members → Invite**.
- Owners (Can & Elif): **Administrator**.
- Pro Digital Strategy authors: invite by email. On the **free plan** they
  edit everything; if you want them limited to the blog only, upgrade to the
  Growth plan and assign a custom role scoped to `post` / `author` /
  `blogCategory`.

Free plan covers 20 seats — no per-user cost at this scale.

## 4. (Optional) Seed the menu

The current sample menu lives in `src/data/menu.ts`. Re-enter those dishes in
the Studio (or we can run a one-time import script) and the page switches from
fallback to live data automatically.

## 5. Deploy notes (Vercel)

Add the same three `NEXT_PUBLIC_SANITY_*` env vars in the Vercel project
settings. Add your Vercel domain to the project's **CORS origins** in
sanity.io/manage so the Studio can connect in production.
