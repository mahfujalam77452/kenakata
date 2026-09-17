# KenaKata — Modern E-commerce Storefront

A production-style e-commerce storefront built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, powered by the [Platzi Fake API](https://fakeapi.platzi.com/).

**Live site:** https://kenakata-umber.vercel.app/
**GitHub repository:** _[add repo link here]_

---

## Project overview

KenaKata is a full e-commerce storefront covering the public shopping flow end to end: a home page with a promotional hero and featured products, a filterable/sortable product listing, product detail pages with an image gallery and related products, a cart with persistent state, authentication (login/register), and a checkout flow that gates on login status before reaching a payment-success page.

The build prioritizes real, working functionality over scope — every page listed below is wired to the live API rather than left as a static mock, and includes a dark/light theme toggle available across the whole app.

**Core pages**
- Home (hero carousel, category section, featured products)
- Product listing (search, category filter, price filter, sort, pagination)
- Product details (image gallery, add to cart, reviews, related products)
- Cart (item list, checkout panel)
- Login / Register
- Payment success (static confirmation)

---

## Architecture explanation

**Stack:** Next.js App Router, TypeScript, Tailwind CSS, Platzi Fake API (`https://api.escuelajs.co/api/v1`).

**Folder structure** separates concerns the standard Next.js way:
```
app/            → routes (page.tsx, layout.tsx, loading.tsx, error.tsx per route)
components/     → layout/, products/, ui/ — grouped by what they belong to
lib/api/        → one file per API resource (products, categories, auth)
lib/types/      → shared TypeScript interfaces matching the API schema
lib/auth/       → session (login-state) helpers
context/        → CartContext, ProductContext for state shared across the tree
```

**A few decisions worth calling out specifically, since they were priorities for this build:**

- **Session persistence:** login state is stored client-side after calling the auth API, so a refresh doesn't log the user out mid-session. The checkout flow reads this state to decide whether to send the user to `/login` or straight to `/payment-success`.
- **Dark/light theme toggle** is implemented across the app, with the user's preference respected on return visits rather than resetting to a default every time they come back.
- **Default Next.js special files are all implemented, not skipped:** `loading.tsx`, `error.tsx`, `not-found.tsx`, and `global-error.tsx` are all in place, so route-level loading states, recoverable errors, missing routes, and unrecoverable root-level errors each have their own real UI instead of a blank screen or a default Next.js error page.

---

## Rendering strategy decisions

- **Home page is fully server-side rendered.** This was a deliberate SEO-driven decision — the home page is the most likely entry point for search engines and shared links, so its content (hero, categories, featured products) is rendered on the server rather than assembled client-side after a loading spinner. This gives crawlers real HTML on first response and improves first-contentful-paint for real users too.
- **Interactive pages (product listing, cart, login/register) are client components**, since their core behavior — live filtering, sorting, cart mutation, form submission — genuinely needs client-side state and can't be meaningfully server-rendered without losing the interactivity.
- **Product detail page** mixes both: the product data itself is fetched server-side for a fast, SEO-friendly first paint, while the image gallery and add-to-cart controls are isolated client components so only the interactive pieces ship JS-driven state.

---

## Tradeoffs made

- **Cart persistence uses `localStorage`, not a backend cart.** The Platzi API has no cart/order endpoints, so cart state is kept in `CartContext` and mirrored to `localStorage` so it survives refreshes and tab closes. This is a client-only tradeoff — cart contents don't sync across devices, which a real backend cart would solve.
- **Sorting is done on-page (client-side), not via the API.** The API has no `sortBy` query param, so once products are fetched, sorting (price low-high / high-low) is applied to the already-loaded array in the browser rather than re-fetched from the server.
- **Search is also on-page, with debouncing, rather than a server-side search endpoint.** Same root cause — the API doesn't expose a reliable search endpoint for this use case — so the product listing's search box debounces user input and filters the currently-loaded product list by title instead of issuing a new request per keystroke.
- **Skipped the "nice to have" tooling** (React Hook Form, Zod, Vitest/Jest) and the optional admin dashboard, to keep the scope focused on a fully working public storefront within the timeline, rather than a partially-working storefront plus partially-working admin tools.
- **Minimal AI assistance on the functional/business logic.** Most of the actual logic — data fetching, filter/sort behavior, cart and auth wiring — was thought through and written independently rather than generated; AI was used mainly for isolated UI/design scaffolding. This meant some "nice to have" performance optimizations that came to mind didn't make it in given the time available — noted below and under Future improvements.

---

## Performance considerations

- **Debounced search** — filtering the product list waits for the user to pause typing instead of running on every keystroke, avoiding unnecessary re-renders/filter passes.
- **Debounced min/max price filtering** — same reasoning applied to the price range inputs on the product listing sidebar, which would otherwise fire a new API request on every digit typed.
- **Explicit loading UI for API delay.** Rather than a blank or frozen-looking screen while a filter/sort/page change triggers a new fetch, the product grid area shows a loading state (spinner + message, with a fixed minimum height so the layout doesn't jump) until the response comes back.
- **`next/image`** is used throughout (hero, product cards, gallery, cart items) for automatic sizing/optimization instead of plain `<img>` tags.
- Acknowledged gap: with more time, list virtualization on longer product grids and reducing duplicate fetches (the filter sidebar currently renders — and fetches — separately for its mobile and desktop layout) were both considered but not implemented; see Future improvements.

---

## Challenges faced

- **The API occasionally returns junk/placeholder-looking data** (products with broken image URLs, generic titles, or categories that don't read well in a UI). Rather than let this leak into the design, a few spots (like long/unclear category names) fall back to clean static text so the UI stays presentable regardless of what the API returns for a given item.
- **No sort/search query params on the API** meant redesigning those features to work entirely against already-fetched data instead of the more typical "let the server do it" approach — this shaped several of the tradeoffs above.
- **Coordinating cart state with the checkout/login flow** — making the checkout button correctly distinguish between "not logged in" and "session expired" and route to the right page took some iteration to get right using `localStorage`-based session tracking, since the API doesn't provide a real session/expiry mechanism to hook into directly.
- **Getting pure-CSS interactions right in a few places** (e.g. a "See More" reveal on the related-products grid, the mobile menu) — using checkbox/label tricks and Tailwind's `has-*` variants instead of client JS took a few iterations to get the selector scoping correct.

---

## Future improvements

- Add the optional admin dashboard (product/category/user CRUD) that was deprioritized for this submission
- Move sorting and search to proper server-side query params if/when a more capable API is available
- Reduce duplicate data fetching between the mobile and desktop filter sidebar instances
- Add automated tests (Vitest/Jest) — skipped for this submission per the "nice to have" list
- Form validation with a dedicated library (Zod) instead of hand-written checks, if the project grows more complex forms
- Wishlist and product reviews (currently static) backed by real endpoints if the API adds support
- Further performance passes: virtualized long lists, reducing client bundle size on the more JS-heavy pages (cart, product listing)

---

## Setup instructions

```bash
git clone <repo-url>
cd kenakata
npm install
npm run dev
```

The app runs on `http://localhost:3000` by default.

## Environment variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_BASE_API=https://api.escuelajs.co/api/v1
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_API` | Base URL for the Platzi Fake API. Used by every API call in `lib/api/`. |

## Deployment

Deployed on Vercel: **https://kenakata-umber.vercel.app/**