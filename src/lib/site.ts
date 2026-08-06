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
  email: "harry.evans9191@gmail.com",
  phone: "07969 244 729",
} as const;

export const ROUTES = {
  HOME: "/",
  HIRE: "/hire",
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
  { label: "Available from", value: "1 September 2026" },
  { label: "Days", value: "Four days a week" },
  { label: "Location", value: "London hybrid or fully remote" },
  { label: "Rate", value: "£600/day" },
  { label: "IR35", value: "Outside IR35 preferred" },
  { label: "Entity", value: "Harry Evans Software Ltd" },
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
  "London, hybrid or remote. Available from 1 September 2026, four days a week.",
  "£600/day, outside IR35 preferred. Own limited company, PI insured.",
] as const;

export const CV_FILES = {
  PDF: "/Harry Evans - Senior Full Stack Engineer.pdf",
  DOCX: "/Harry Evans - Senior Full Stack Engineer.docx",
} as const;
