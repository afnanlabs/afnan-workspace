export const FILE_ALIASES: Record<string, string> = {
  hrms: "hrms",
  thinktrack: "thinktrack",
  afnkit: "afnkit",
  codeglow: "codeglow",
  somnus: "somnus",
  fitscore: "fitscore",
  profile: "profile",
  experience: "experience",
  education: "education",
  certifications: "certifications",
  contact: "contact",
  skills: "skills",
  resume: "resume",
};

export function resolveFileId(arg: string | undefined): string | null {
  if (!arg) return null;
  const key = arg.trim().toLowerCase();
  if (!key) return null;

  if (FILE_ALIASES[key]) return key;

  return null;
}
