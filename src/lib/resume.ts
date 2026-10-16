/**
 * Resume asset URLs.
 *
 * The site is deployed to a subpath (GitHub Pages project site under
 * `base: "/afnan-workspace/"`), so asset URLs must be resolved through
 * `import.meta.env.BASE_URL`. A hardcoded `/resume.pdf` 404s on the
 * deployed site (it resolves to the domain root, not the project path).
 */
export const RESUME_URL = `${import.meta.env.BASE_URL}Afnan_Khan_Resume.pdf`;

/** Trigger a client-side download of the resume PDF. */
export function downloadResume(filename = "Afnan_Khan_Resume.pdf") {
  const a = document.createElement("a");
  a.href = RESUME_URL;
  a.download = filename;
  a.click();
}
