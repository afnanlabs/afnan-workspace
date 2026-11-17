/**
 * Shields.io tech badges for the Recruiter Quick View.
 *
 * Keyed by the display labels used in `SKILL_GROUPS` and project stacks, so
 * the canonical content stays plain text and only its presentation changes.
 */
export const TECH_BADGES: Record<string, string> = {
  "JavaScript (ES6+)":
    "https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
  TypeScript:
    "https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white",
  Python:
    "https://img.shields.io/badge/-Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
  "C++":
    "https://img.shields.io/badge/c%2B%2B-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white",
  "Vue.js":
    "https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D",
  React:
    "https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black",
  "Next.js":
    "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white",
  "React Native":
    "https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
  HTML5:
    "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
  CSS3:
    "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
  "Tailwind CSS":
    "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white",
  "Node.js":
    "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white",
  "Express.js":
    "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white",
  "REST APIs":
    "https://img.shields.io/badge/REST_API-02303A?style=for-the-badge&logo=postman&logoColor=white",
  MySQL:
    "https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white",
  SQL:
    "https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white",
  PostgreSQL:
    "https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white",
  Redis:
    "https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white",
  Docker:
    "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white",
  Kubernetes:
    "https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white",
  Terraform:
    "https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white",
  AWS:
    "https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white",
  "Azure DevOps":
    "https://img.shields.io/badge/Azure_DevOps-0078D7?style=for-the-badge&logo=azure-devops&logoColor=white",
  Jenkins:
    "https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white",
  Ansible:
    "https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white",
  "GitHub Actions":
    "https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white",
  "OpenAI Agents SDK":
    "https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white",
  CrewAI:
    "https://img.shields.io/badge/CrewAI-101010?style=for-the-badge&logo=crew&logoColor=white",
  LangGraph:
    "https://img.shields.io/badge/LangGraph-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white",
  LangChain:
    "https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white",
  Git:
    "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white",
  GitHub:
    "https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white",
  Postman:
    "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white",
  "Burp Suite":
    "https://img.shields.io/badge/Burp_Suite-FF6633?style=for-the-badge&logo=burpsuite&logoColor=white",
  Jira:
    "https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white",
  "Linux (Bash/Fundamentals)":
    "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
  Windows:
    "https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white",

  // Project stack aliases and supporting badges.
  Vue:
    "https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D",
  Express:
    "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white",
  npm:
    "https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white",
  MariaDB:
    "https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white",
  OCR:
    "https://img.shields.io/badge/OCR-4B5563?style=for-the-badge",
  "VS Code API":
    "https://img.shields.io/badge/VS_Code_API-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white",
  PHP:
    "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white",
  "Google OAuth":
    "https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white",
  "Web Application":
    "https://img.shields.io/badge/Web_Application-4B5563?style=for-the-badge",
  Vercel:
    "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white",
};

const FALLBACK_COLOR = "4B5563";

/**
 * Returns a badge for a skill or stack label. Unknown labels get a neutral
 * badge instead of a broken image, so new content cannot regress the layout.
 */
export function getTechBadge(label: string): string {
  const badge = TECH_BADGES[label];
  if (badge) return badge;

  const text = encodeURIComponent(label.trim().replace(/\s+/g, "_"));
  return `https://img.shields.io/badge/${text}-${FALLBACK_COLOR}?style=for-the-badge`;
}
