export type ExternalLinks = {
  github?: string;
  live?: string;
};

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  stack: readonly string[];
  features: readonly string[];
  architecture: string;
  visual: "social" | "stocks" | "forum" | "practice";
  featured?: boolean;
  links?: ExternalLinks;
};

export type Experience = {
  company: string;
  role: string;
  project?: string;
  startDate: string;
  endDate: string;
  period: string;
  summary: string;
  responsibilities: readonly string[];
  metadata: readonly { label: string; value: string }[];
};

export type SkillGroup = {
  id: string;
  name: string;
  icon: "code" | "layout" | "server" | "database" | "terminal" | "network";
  items: readonly string[];
};

export type Principle = {
  id: string;
  title: string;
  description: string;
  icon: "users" | "layers" | "puzzle" | "check";
};
