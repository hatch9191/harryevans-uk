/**
 * Single source of truth for everything that also appears on the CV and
 * LinkedIn. Recruiters cross-check these, so change them here and nowhere
 * else, then reconcile the CV header and LinkedIn to match.
 */

export const SITE = {
  name: "Harry Evans",
  role: "Senior Full Stack Engineer",
  location: "Hackney, London",
  url: "https://harryevans.uk",
  email: "harry@harryevans.uk",
  phone: "07969 244 729",
} as const;

/**
 * Case studies and writing are written but not yet verified for publication,
 * so they are held back rather than deleted. Flipping a flag to true restores
 * the nav link, the home page section, the routes and the sitemap entries —
 * there is nothing else to remember.
 */
export const FEATURES = {
  WORK: false,
  WRITING: false,
} as const;

export const ROUTES = {
  HOME: "/",
  WORK: "/#work",
  WRITING: "/writing",
  HIRE: "/hire",
  LINKEDIN_BANNER: "/linkedin-banner",
} as const;

export const LINKS = {
  GITHUB: "https://github.com/hatch9191",
  LINKEDIN: "https://linkedin.com/in/harryevans9191",
  MIM: "https://trymim.com",
} as const;

export const STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Node",
  "GraphQL",
  "PostgreSQL",
  "Prisma",
  "Terraform",
  "GCP",
] as const;

/**
 * Commercial terms. These live on /hire only — never on an indexed page,
 * because the public site has to read the same to a recruiter and to an
 * investor looking me up during MiM's raise.
 */
export const TERMS = [
  { label: "Availability", value: "Available now" },
  { label: "Engagement", value: "Fractional or full-time" },
  { label: "Location", value: "London hybrid or fully remote" },
  { label: "Rate", value: "£600/day" },
  { label: "IR35", value: "Outside IR35 preferred" },
  { label: "Entity", value: "Harry Evans Software Ltd · Company no. 17385844" },
  {
    label: "Insurance",
    value:
      "£1m professional indemnity · £1m public liability · £10m employers' liability",
  },
] as const;

/**
 * Verbatim from the recruiter qualifying pitch. Must stay word-for-word
 * identical to the CV header, LinkedIn messages and the email signature.
 */
export const QUALIFYING_PITCH = [
  "Senior full stack engineer, 5 years, TypeScript / React / Next.js / Node / GraphQL / Postgres, AWS and GCP.",
  "London, hybrid or remote. Available now, fractional or full-time.",
  "£600/day, outside IR35 preferred. Own limited company, PI insured.",
] as const;

/**
 * Served under a clean slug, but downloaded under the full name — a recruiter
 * with three hundred of these in a folder should be able to identify mine
 * without opening it, and a URL with spaces in it is a URL that gets mangled.
 */
export const CV_DOWNLOAD_NAME = "Harry Evans - Senior Full Stack Engineer";

export const CV_FILES = {
  PDF: "/harry-evans-cv.pdf",
  DOCX: "/harry-evans-cv.docx",
} as const;
