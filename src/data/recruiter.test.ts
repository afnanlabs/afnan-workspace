import { describe, expect, it } from "vitest";
import { ALL_FILES, PROJECTS_FILES, commandOutputs, fileContents } from "./content";
import {
  RECRUITER_METRICS,
  RECRUITER_PROFILE,
  RECRUITER_PROJECTS,
  RECRUITER_SKILLS,
} from "./recruiter";

describe("recruiter quick view content", () => {
  it("has the identity fields a recruiter needs", () => {
    expect(RECRUITER_PROFILE.name).toBe("Afnan Khan");
    expect(RECRUITER_PROFILE.role).toMatch(/developer/i);
    expect(RECRUITER_PROFILE.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(RECRUITER_PROFILE.phone).toBe("+91 73041 42536");
    expect(RECRUITER_PROFILE.phoneHref).toBe("tel:+917304142536");
    expect(RECRUITER_PROFILE.linkedin).toMatch(/^https:\/\//);
    expect(RECRUITER_PROFILE.github).toMatch(/^https:\/\//);
    expect(RECRUITER_PROFILE.pitch.length).toBeGreaterThan(40);
    expect(RECRUITER_PROFILE.focus.length).toBeGreaterThan(0);
  });

  it("keeps contact details in sync with contact.ts", () => {
    const contact = fileContents.contact;
    expect(contact).toContain(RECRUITER_PROFILE.email);
    expect(contact).toContain(
      RECRUITER_PROFILE.linkedin.replace(/^https:\/\/(www\.)?/, ""),
    );
    expect(contact).toContain(RECRUITER_PROFILE.github.replace(/^https:\/\//, ""));
  });

  it("shows four proof metrics", () => {
    expect(RECRUITER_METRICS).toHaveLength(4);
    for (const metric of RECRUITER_METRICS) {
      expect(metric.value.trim()).not.toBe("");
      expect(metric.label.trim()).not.toBe("");
    }
  });

  it("references every existing project case study", () => {
    const projectIds = new Set(PROJECTS_FILES.map((project) => project.id));
    const allIds = new Set(ALL_FILES.map((file) => file.id));

    expect(RECRUITER_PROJECTS.map((project) => project.id).sort()).toEqual(
      PROJECTS_FILES.map((project) => project.id).sort(),
    );

    for (const project of RECRUITER_PROJECTS) {
      expect(allIds.has(project.id)).toBe(true);
      expect(projectIds.has(project.id)).toBe(true);
      expect(fileContents[project.id]).toBeTruthy();
      expect(project.name.trim()).not.toBe("");
      expect(project.tagline.trim()).not.toBe("");
      expect(project.proof.trim()).not.toBe("");
      expect(project.stack.length).toBeGreaterThan(0);

      if (project.source) {
        expect(project.source).toMatch(/^https:\/\/github\.com\//);
      }
    }
  });

  it("features each project only once", () => {
    const ids = RECRUITER_PROJECTS.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("groups the core skills without duplicates", () => {
    expect(RECRUITER_SKILLS.length).toBeGreaterThanOrEqual(3);
    const seen = new Set<string>();

    for (const group of RECRUITER_SKILLS) {
      expect(group.label.trim()).not.toBe("");
      expect(group.items.length).toBeGreaterThan(0);

      for (const item of group.items) {
        expect(seen.has(item)).toBe(false);
        seen.add(item);
      }
    }
  });

  it("matches the skills command exactly", () => {
    const commandSkills = JSON.parse(fileContents.skills) as Record<
      string,
      string[]
    >;

    expect(RECRUITER_SKILLS.map((group) => group.items)).toEqual(
      Object.values(commandSkills),
    );
    expect(RECRUITER_SKILLS).toHaveLength(Object.keys(commandSkills).length);
  });

  it("matches the terminal skills command", () => {
    const output = commandOutputs.skills;

    for (const group of RECRUITER_SKILLS) {
      expect(output).toContain(group.label);
      for (const item of group.items) {
        expect(output).toContain(item);
      }
    }
  });

  it("has education and certification context", () => {
    expect(RECRUITER_PROFILE.education).toMatch(/BSc/i);
    expect(RECRUITER_PROFILE.certifications).toMatch(/\d+/);
  });
});
