---
review: tech-currency
target: ../ARCHITECTURE-SPINE.md (updated 2026-09-23)
lens: "Was every committed technical decision checked against the web as of September 2026, or asserted from training data?"
reviewed: 2026-09-23
spine_modified: false
---

# Review: Tech currency of the Dionysus architecture spine

## Verdict

The stack itself is current. Every pinned version exists and is the latest on npm today, and most API assumptions hold. The weak spot is the **deploy/routing wiring**, which the spine defers ("owned by the code once `api/` exists"). Three behaviours there were not reality-checked, and each one breaks AD-13 or the local dev loop if it's built the obvious way. There is also one **privacy gap** in AD-12: `:free` OpenRouter models, with the guest's name and answers in the prompt, can be served by a provider that trains on inputs.

Severity: **H** = will break or leak if built as written. **M** = will bite during build and has a cheap fix. **L** = note or tighten the wording.

---

## 1. Hono inside a Vite project's `api/` (not zero-config Hono mode)

### What is current (Sep 2026)

- For non-Next projects, Vercel still deploys **any file under `/api`** as a function. A Node function may default-export an object with a `fetch` method (the "fetch Web Standard export"). A Hono app *is* such an object, so **`export default app` is correct**. `handle()` from `hono/vercel` still exists in hono 4.13.8 (`(app) => (req: Request) => Response`), but it's the adapter for Next-style `export const GET/POST = handle(app)`. You don't need it here.
  - https://vercel.com/docs/functions/functions-api-reference (updated 2026-08-11): "Vercel Functions also support the `fetch` Web Standard export, used by many frameworks like Hono …"
  - https://vercel.com/docs/functions/runtimes/node-js (updated 2026-08-11)
- **Catch-all file naming in a non-Next `api/` is not the pattern to rely on.** `[[...route]].ts` is a Next.js App Router convention (`app/api/[[...route]]/route.ts`, from Hono's Next.js guide). The current pattern for a single Hono entry in a plain `api/` is **`api/index.ts` plus a `vercel.json` rewrite `/api/:path*` → `/api`**, as used in e.g. Komelin, "A Thin API Layer for React Apps on Vercel" (2026-03-17).
  - https://hono.dev/docs/getting-started/nextjs
  - https://komelin.com/blog/thin-api-layer-react-vercel
- **Zero-config Hono hijack risk: low, but pin it anyway.** In `vercel/vercel` `packages/frameworks/src/frameworks.ts` (main, fetched 2026-09-23):
  - The `vite` preset appears **before** `hono` in detection order.
  - The Hono detector needs both the `hono` package **and** one of `app|index|server.{js,cjs,mjs,ts,cts,mts}` at the root or in `src/`, whose content imports `hono`.

  The app has `src/main.tsx`, not `src/index.ts`, and the spine's `server/` is a directory, not `server.ts`. So Vite wins today. Two things can flip it: someone later adds `src/index.ts` or `server.ts` that imports hono, or the project is re-imported. The separate Node "server entrypoint" detection (`server.ts` / `src/server.ts` that calls `listen()`) is a second trap with the same file names.
  - https://github.com/vercel/vercel/blob/main/packages/frameworks/src/frameworks.ts
  - https://vercel.com/docs/frameworks/backend/hono (updated 2026-08-10), for the list of entry files
- Worth knowing: Vercel's Vite page now points plain-Vite projects that want functions at **Nitro**, not at `api/`. `api/` still works; it's just no longer the path Vercel advertises. https://vercel.com/docs/frameworks/frontend/vite (updated 2026-08-26)

### Findings

- **H-1: rewrites don't change the URL Hono sees.** On a rewrite, the Node function receives the **original request path**. That's why the `/(.*)` → `/api` Express/Hono single-function pattern works at all. So `/pour/:id` → `/api/share/:id` reaches Hono with the path `/pour/abc123`, not `/api/share/abc123`. An app built with `new Hono().basePath('/api')` then returns 404 for every share link.
  - **Correction:** register the share route on the path the browser actually uses (`app.get('/pour/:id', …)`), with no `/api` basePath for that route. Or rewrite to a query string (`/pour/:id` → `/api?share=:id`) and read the query. Prove it with a smoke test in `vercel dev` **and** on a preview deploy before building on top of it.
- **M-2: pin the preset.** Add `"framework": "vite"` to `vercel.json`. Add a Consistency Convention: "no root-level or `src/` `app|index|server.*` file may import hono". Put the Hono entry at `api/index.ts`.
- **L-3:** drop "catch-all" wording from the spine. Write "`api/index.ts` (Hono, `export default app`) + rewrite" in the Structural Seed.

## 2. `@vercel/og` 1.x in a non-Next Node function, `.tsx`, the size cap, same-deployment images

### What is current

- `@vercel/og` **1.0.3** (published 2026-09-22) needs `engines.node >=22`. It depends on satori 0.33.5 and resvg-wasm, and has a `node` export condition. The docs say it is "supported on the Node.js runtime". The non-Next example is **`api/og.tsx`** with a default-exported handler that returns `new ImageResponse(...)`. The "Pages Router + Node" restriction applies to Next only. https://vercel.com/docs/og-image-generation (updated 2026-06-16)
- The docs still list a **"Maximum bundle size of 500KB"**, which includes JSX, CSS, fonts and images bundled into the function. So the spine's "separate function for the 500KB cap" is still reasonable. Only `ttf`/`otf`/`woff` fonts work; layout is flexbox only.
- Local resources: the docs say to use `fs.readFile`, or `fetch` for remote resources. **Files in `public/` are not in the function bundle**, so `fs.readFile('public/personas/…')` fails unless you add `includeFiles`, and that counts toward the 500KB. `fetch(<request origin>/personas/<key>.jpg)` doesn't count toward the cap. satori 0.33.5 accepts png/jpeg/gif/webp/avif, so JPEG personas are fine.
- **Deployment Protection:** "Standard Protection" (Vercel Authentication on everything except production domains) is the recommended default. For server-side self-fetches, Vercel says to use **the incoming request's origin and forward its cookies**, not `VERCEL_URL`. https://vercel.com/docs/deployment-protection (updated 2026-09-15)

### Findings

- **M-4:** AD-13's "fetches the built `/index.html` from its own origin" and the OG function's image fetch must build the URL from `new URL(request.url).origin`, never from `VERCEL_URL`. On preview deploys, share pages and OG cards sit behind Vercel Authentication. Crawlers will get 401 there. That's expected, but write it down so nobody "fixes" it with a bypass secret in code.
- **L-5:** `api/og.tsx` needs a tsconfig that `@vercel/node` can see with `"jsx": "react-jsx"`. The root `tsconfig.json` is references-only (`"files": []`), and `jsx` is set only in `tsconfig.app.json`, which `include`s just `src`. Add a `tsconfig.api.json` (or `api/tsconfig.json`) that covers `api/`, `server/` and `shared/`. Wire it into `build` too, because `tsc -b` currently type-checks none of the new directories (see the memory note: plain `tsc --noEmit` checks nothing in this repo).

## 3. `vercel.json` rewrites: does the filesystem beat the catch-all?

### What is current

- The vercel.json reference says: "precedence is given to the filesystem prior to rewrites being applied." Rewrites are processed in array order, so catch-alls go last. https://vercel.com/docs/project-configuration/vercel-json (updated 2026-08-14)
- **Filesystem precedence covers static files and *exact* function paths, not dynamic function routes.** Vercel discussion #5448 documents that `{"source":"/(.*)","destination":"/index.html"}` also swallows `api/files/[fileId].ts`-style routes. The fix is the negative-lookahead source `/((?!api/).*)`. https://github.com/vercel/vercel/discussions/5448
- **Under `vercel dev`, an SPA catch-all rewrite intercepts Vite's own dev paths.** `/@vite/client`, `/@react-refresh` and `/src/main.tsx` get rewritten to raw `index.html`, React never mounts, and you get a white screen. This happens even with the `(?!api/)` lookahead. Production hides it because the built assets exist on the filesystem. See invoiser PR #34 (2026-09-19): https://github.com/gicontz/invoiser/pull/34

### Findings

- **H-6: the current `vercel.json` and the Structural Seed's "other non-/api → /index.html" collide with AD-13.** The live file is `{"source":"/(.*)","destination":"/index.html"}`:
  - It will capture `/api/og/:id` if that's a dynamic file (`api/og/[id].tsx`).
  - It will break `vercel dev` for the whole SPA.

  **Correction:** make the rewrite list explicit and ordered, and drop the global SPA fallback. The SPA only needs `/` plus `/pour/:id`, which is served by a function, and the pour fragment lives in the hash.

  ```json
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "framework": "vite",
    "rewrites": [
      { "source": "/pour/:id",   "destination": "/api" },
      { "source": "/api/og/:id", "destination": "/api/og?id=:id" },
      { "source": "/api/:path*", "destination": "/api" }
    ]
  }
  ```

  Here `api/og.tsx` is a static filename, which avoids dynamic-route precedence entirely. Hono routes `/pour/:id` and `/api/*` (see H-1). For unknown paths, ship the poetic 404 as a static `404.html` in the build output instead of an SPA catch-all. If a client-side catch-all is ever needed, use `/((?!api/|@|src/|node_modules/).*)` and test it under `vercel dev`.
- **M-7:** stop deferring "exact function file names and rewrite wiring". It's the one area where the obvious choice is wrong. Promote the snippet above, or its equivalent, into AD-13.

## 4. Upstash Redis via the Vercel Marketplace, and `@upstash/ratelimit` 2.x

### What is current

- `@upstash/redis` **1.39.0**: `Redis.fromEnv()` reads `UPSTASH_REDIS_REST_URL || KV_REST_API_URL` and `UPSTASH_REDIS_REST_TOKEN || KV_REST_API_TOKEN`. That was checked in the published source, `nodejs.mjs`. So both the Marketplace/KV-style names and the native Upstash names work.
- **When the vars are missing, `fromEnv()` does not throw.** It `console.warn`s and builds a client with `url: undefined`. The failure then happens on the first command.
- `@upstash/ratelimit` **2.1.0**: `new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "1 m"), prefix?, timeout? (default 5000 ms, fails open), analytics? (default false), ephemeralCache? })`. `limit(id)` returns `{ success, limit, remaining, reset, pending }`, and the type docs say to `waitUntil(pending)` on serverless. Verified in the published `dist/index.d.ts`.
  - https://www.npmjs.com/package/@upstash/redis
  - https://www.npmjs.com/package/@upstash/ratelimit
  - https://upstash.com/docs/redis/howto/vercelintegration

### Findings

- **M-8:** the Degradation convention says "missing Upstash means `pourId: null`", but `fromEnv()` won't give you that for free. **Correction:** guard explicitly. If neither URL var is set, skip both Redis and the rate limiter. Wrap each write in a try/catch that falls back to `pourId: null`.
- **M-9:** the ratelimit `timeout` of 5000 ms fails open, and it comes out of the AD-9 8-second budget. Set `timeout: 500` or so. Pass `pending` to `waitUntil` from `@vercel/functions`, and take the IP from `ipAddress(request)` in the same package. Name the vars in the Config row as `KV_REST_API_URL`/`KV_REST_API_TOKEN` (Marketplace) with `UPSTASH_REDIS_REST_*` as the fallback, rather than "Upstash vars".

## 5. OpenRouter: limits, slug, JSON on `:free`, privacy

### What is current

- **Free limits:** 20 requests/min, plus 50/day with less than $10 of credits ever purchased, or 1,000/day at $10 or more. These are **account-wide**, not per user. A secondary source (LLM Rumors, 2026-09-20) reports that **failed free requests also consume quota**.
  - https://openrouter.ai/docs/api/reference/limits
  - https://www.llmrumors.com/news/openrouter-free-model-limits-privacy-fallbacks
- **Slug:** `anthropic/claude-haiku-4.5` is correct and live, at $1/M input and $5/M output, with `structured_outputs` listed. There's also a moving alias, `~anthropic/claude-haiku-latest`. Pinning 4.5 is the right call. Checked via `GET https://openrouter.ai/api/v1/models` on 2026-09-23.
- **JSON on `:free`:** there are 21 `:free` models today, and only **6** advertise `structured_outputs`: nex-n2.5-mini, nex-n2.5-pro, qwen3.8-27b, dots-3-note-preview, lfm-2.5-2.6b and nemotron-3-super-120b. A few more accept `response_format` only. OpenRouter's structured-output guide says to send `response_format: {type:"json_schema", strict:true}` **and** `provider.require_parameters: true`, or the request can be routed to a provider that silently ignores the schema. A Response Healing plugin exists for non-streaming calls.
  - https://openrouter.ai/docs/guides/features/structured-outputs
  - https://openrouter.ai/docs/guides/routing/provider-selection
- **Privacy:** the OpenRouter privacy policy (updated 2026-08-31) says "OpenRouter does not use your Inputs or Outputs for model training" and "Some Model Providers may use your Inputs and Outputs for model training". Per-provider flags from `https://openrouter.ai/api/frontend/v1/all-providers` (2026-09-23):
  - **NVIDIA** is `training: true`, and NVIDIA serves the Nemotron `:free` models.
  - Google AI Studio retains prompts for 55 days.
  - Anthropic retains prompts for 30 days, with no training.

  The account has **separate training toggles for paid and free models**. Per request, `provider: { data_collection: "deny" }` or `zdr: true` restricts routing.
  - https://openrouter.ai/privacy
  - https://openrouter.ai/docs/guides/privacy/logging

### Findings

- **H-10: privacy gap in AD-12.** As written, the ladder can send `name` plus the answers to a provider that trains on them. AD-2 protects only the `trace`. **Correction:** add to AD-12:
  1. Every request carries `provider: { data_collection: "deny", require_parameters: true }`, and `zdr: true` if the ladder still has candidates with it.
  2. Set the account-level "free models: disallow training" toggle and record it in the Config convention.
  3. **Don't send the first name.** The epigraph and reading are second person, so the name adds nothing the template can't add afterwards. Add "no name in the prompt" to AD-2's rule next to the trace ban.
- **M-11: capacity.** With less than $10 of credits, 50 free calls a day is about 50 reveals a day before everything falls back to templates, and fewer if the ladder retries. 20 rpm is shared by every guest, so the per-IP limit of 10/min doesn't protect it. **Correction:**
  - Buy the one-off $10, which raises the limit to 1,000/day.
  - Count every ladder attempt as one quota unit.
  - Build `BARTENDER_MODELS` only from `:free` IDs that list `structured_outputs`, and re-check before launch, because free IDs churn.
  - Log `model` from the response. The logging convention already has this field.
- **L-12:** OpenRouter's native `models: [...]` fallback array is an alternative to a hand-rolled ladder. The hand-rolled ladder remains justified because it enforces the 7s budget per attempt. State that choice in AD-12 so nobody "simplifies" it later.

## 6. nanoid 6 and zod 4

### What is current

- `nanoid` **6.0.1** (2026-09-10) still exports `customAlphabet(alphabet, size)`. It is **ESM-only** (`"type": "module"`) and needs `engines.node` `^22 || ^24 || >=26`. The app's `package.json` is already `"type": "module"`. OK.
- `zod` **4.6.5**: `z.strictObject(shape)` exists, and so does `.strict()`, whose JSDoc says "Consider `z.strictObject(A.shape)` instead". Only `.passthrough()` is `@deprecated`.

### Findings

- **M-13: strict is shallow.** `z.strictObject` rejects unknown keys **only at its own level**. `seed`, `gravity` and `texture` are nested objects and default to *strip*. An extra key inside them gets silently dropped, not rejected. AD-2 says "unknown keys are rejected with 400". **Correction:** declare every nested object with `z.strictObject` too, and add a vitest case that posts `{seed:{hex,name,trace:"x"}}` and expects a rejection. Prefer `z.strictObject` over `.strict()` in `shared/answers.ts`.

## 7. `vercel dev` for Vite plus `api/`

### What is current

- `vercel dev` is still the tool for running framework dev plus `/api` functions locally. The Vite preset's dev command is `vite --port $PORT`. Vercel's own advice is not to use `vercel dev` when the framework's dev server already covers functions, and Vite's doesn't, so `vercel dev` is justified here. https://vercel.com/docs/cli/dev (updated 2026-08-11)
- Known breakage: the SPA catch-all rewrite under `vercel dev` (see H-6).

### Findings

- **M-14:** the spine says "Local development runs `vercel dev`". Add these conditions:
  1. `package.json` `dev` stays `vite`. Never set it to `vercel dev`, because that recurses.
  2. There must be no catch-all rewrite (H-6).
  3. `vercel env pull` provides the keys. Without them the app runs on templates, as the spine says.
  4. Keep a plain `vite` run for pure front-end work, where the API calls fail and the client falls back locally, which AD-9 already guarantees.
- **M-15, unverified but worth a smoke test:** community reports of `ERR_MODULE_NOT_FOUND` for relative imports in `"type":"module"` Vercel functions keep appearing. The app's tsconfig uses `allowImportingTsExtensions` with bundler resolution, so `shared/` imports like `./pairing.ts` compile fine in Vite but may not resolve in the Node function build. **Correction:** in `shared/`, `server/` and `api/`, use extensionless relative imports and no path aliases. The Vercel Node runtime docs say path mappings are unsupported. Run `vercel build` locally before the first preview deploy.
  - https://vercel.com/kb/guide/how-do-i-resolve-a-module-not-found-error
  - https://vercel.com/docs/functions/runtimes/node-js

## Stack table: currency check (npm, 2026-09-23)

| Package | Spine | Latest | Status |
| --- | --- | --- | --- |
| hono | ^4.13.8 | 4.13.8 (09-15) | current |
| zod | ^4.6.5 | 4.6.5 (09-13) | current |
| @vercel/og | ^1.0.3 | 1.0.3 (09-22) | current; node >=22 |
| @upstash/redis | ^1.39.0 | 1.39.0 (09-23) | current |
| @upstash/ratelimit | ^2.1.0 | 2.1.0 (09-23) | current |
| nanoid | ^6.0.1 | 6.0.1 (09-10) | current; ESM-only |
| vitest | ^5.0.1 | 5.0.1 (09-15) | current |
| Node (Vercel Functions) | 22+ | 24.x default, 22.x and 20.x available; Node 20 deprecated 2026-10-01 | OK. Set `engines.node: "24.x"` explicitly |

Node versions: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions

## Summary of required spine edits (for the spine owner; the spine was not modified)

1. **AD-13:** make the rewrite list explicit and ordered, with no SPA catch-all. Use static `api/og.tsx` and `api/index.ts` (Hono). Hono routes `/pour/:id` on its original path. Build self-fetches from the request origin. (H-1, H-6, M-4, M-7)
2. **AD-12 and AD-2:** send `data_collection:"deny"` and `require_parameters:true`; set the account free-model training toggle; keep the name out of the prompt; build the ladder only from `structured_outputs`-capable `:free` IDs; do the $10 top-up. (H-10, M-11)
3. **AD-2:** use nested `z.strictObject`, with a test. (M-13)
4. **Conventions:** name the env vars and guard explicitly when they're missing; set ratelimit `timeout` to about 500 ms and pass `pending` to `waitUntil`; pin `"framework":"vite"` and `engines.node`; forbid hono entry filenames at the root or in `src/`; add a tsconfig for the API that `build` also checks; use extensionless relative imports. (M-2, L-5, M-8, M-9, M-15)
