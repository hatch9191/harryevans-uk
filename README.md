# harryevans.uk

Personal site. Next.js 16 App Router, React 19, Tailwind CSS v4, shadcn/ui (Radix base), deployed on Vercel.

Replaces the 2021 Create React App site (`hatch9191/personal_portfolio`, Netlify).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## The one rule about this site

**The public site is capability-only. Commercial terms live on `/hire` and nowhere else.**

Recruiters and investors both look me up, and during MiM's fundraise the public
site has to read the same to both. So availability, day rate, IR35 stance and
insurance appear only on `/hire`, which is:

- `noindex, nofollow, nocache` via route metadata
- disallowed in `src/app/robots.ts`
- excluded from `src/app/sitemap.ts`
- absent from the site nav

It stays reachable by anyone with the link. It just will not surface in a search
for my name. The URL is distributed via the CV header, the LinkedIn Featured
section and recruiter messages.

If you add a route, decide which side of that line it sits on before building it.

## Content lives in one place

`src/lib/site.ts` holds everything that also appears on the CV and LinkedIn —
terms, stack, the recruiter qualifying pitch. Recruiters cross-check these, so
change them there and then reconcile the CV and LinkedIn to match. The
qualifying pitch in particular must stay word-for-word identical across the
site, the CV header, LinkedIn messages and the email signature.

## Design

Editorial: warm paper ground, warm near-black ink, single oxblood accent,
Instrument Serif display over IBM Plex Sans and Mono, hairline rules, near-zero
border radius, fine grain overlay. Light only — **there is deliberately no dark
mode**.

The whole shadcn theme layer is overwritten in `src/app/globals.css`. Stock
shadcn — slate and zinc, `--radius: 0.625rem`, Geist, a dark mode toggle — is
the most recognisable generated-in-an-afternoon look going, which is the
opposite of the point. Semantic shadcn tokens (`--primary`, `--muted`, and so
on) are mapped onto the palette so any component added later inherits it.

Custom utilities: `eyebrow` (mono caps label), `grain`, `rise` (staggered page
load, set `--step` per child).

## To do

- **Drop the CV into `public/`** as `Harry Evans - Senior Full Stack Engineer.pdf`
  and `.docx`. The download buttons on `/hire` are resolved at build time against
  `public/` and only render once the files exist, so until then the page falls
  back to "email me and I'll send it over". No dead links either way.
- Add the company number to `TERMS` in `src/lib/site.ts` once Companies House
  issues it.
- Case studies at `/work/mim`, `/work/togather-quoting`, `/work/togather-platform`,
  then add them to the nav and `sitemap.ts`.
- Writing section at `/writing` with MDX.
