import type {
  Experience,
  Principle,
  Project,
  SkillGroup,
} from "@/types/portfolio";

// All personal information and project content live here.
// Add verified links only. Undefined links are never rendered.
export const personal = {
  name: "Ali Alqassab",
  firstName: "Ali",
  lastName: "Alqassab",
  role: "Full-Stack Developer",
  studentStatus: "2nd-Year Programming Student",
  location: "Bahrain",
  email: "ali.alqassab01@gmail.com",
  phone: "+973 34465522",
  introduction:
    "I build software across the stack — from interfaces and APIs to databases and real-time systems.",
  profile:
    "I’m a second-year Programming student and Full-Stack Developer based in Bahrain. I turn what I learn into working software, connecting thoughtful interfaces with the systems behind them.",
  profileDetail:
    "My experience spans web applications, backend systems, databases, and real-time features. Along the way, I’ve worked with development teams and led testing activities — learning how good software comes together, and how to make it better.",
  socials: {
    linkedin: "https://linkedin.com/in/ali-alqassab-954565328",
    github: undefined as string | undefined,
  },
  // Place the PDF here; the download link appears only if the file exists.
  resumePath: "/Ali-Alqassab-CV.pdf",
} as const;

export const navigation = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "approach", label: "Approach" },
  { id: "education", label: "Education" },
] as const;

export const experiences: readonly Experience[] = [
  {
    company: "SKRA W.L.L.",
    role: "QA & Playtesting Team Lead",
    project: "Sindbad: Seas of Destiny",
    startDate: "2026-07",
    endDate: "2026-09",
    period: "Jul 2026 – Sep 2026",
    summary: "Led the people and processes behind a better player experience.",
    responsibilities: [
      "Led and coordinated a QA and playtesting team of approximately 20 members.",
      "Assigned testing responsibilities and organized playtesting sessions.",
      "Tracked bugs, reviewed team reports, and collaborated with developers to reproduce issues and verify fixes.",
      "Helped improve gameplay quality and the overall player experience.",
    ],
    metadata: [
      { label: "Team size", value: "≈20 members" },
      { label: "Responsibility", value: "Team leadership" },
      { label: "Focus", value: "Quality & playtesting" },
    ],
  },
  {
    company: "MenaMoney",
    role: "Software Developer Intern",
    startDate: "2026-01",
    endDate: "2026-02",
    period: "Jan 2026 – Feb 2026",
    summary: "Contributed across the stack to a stock portfolio platform.",
    responsibilities: [
      "Contributed to a stock portfolio platform using React.js, PostgreSQL, and Python.",
      "Worked across frontend, backend, database, and application logic.",
      "Helped implement portfolio tracking functionality and integrate portfolio data.",
      "Worked with Python-based AI functionality.",
    ],
    metadata: [
      { label: "Role", value: "Developer intern" },
      { label: "Stack", value: "React · PostgreSQL · Python" },
      { label: "Focus", value: "Full-stack development" },
    ],
  },
];

export const skills: readonly SkillGroup[] = [
  {
    id: "languages",
    name: "Languages",
    icon: "code",
    items: ["Go", "Python", "JavaScript", "TypeScript", "Rust"],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: "layout",
    items: ["React.js", "Next.js", "Vite", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    id: "backend",
    name: "Backend / APIs",
    icon: "server",
    items: ["FastAPI", "REST APIs", "WebSockets", "GraphQL"],
  },
  {
    id: "databases",
    name: "Databases",
    icon: "database",
    items: ["PostgreSQL", "MySQL", "SQLite", "Oracle DB"],
  },
  {
    id: "tools",
    name: "Tools / environment",
    icon: "terminal",
    items: ["Git", "Docker", "Linux"],
  },
  {
    id: "networking",
    name: "Other technical areas",
    icon: "network",
    items: ["Networking"],
  },
];

export const projects: readonly Project[] = [
  {
    id: "social-network",
    name: "Social Network Platform",
    category: "Full stack / Real-time",
    description:
      "A connected social experience, from the first sign-in to real-time conversations. Built across the frontend, backend, and database.",
    stack: ["Go", "Next.js", "WebSockets", "SQLite"],
    features: [
      "Authentication & user profiles",
      "Posts, comments & follows",
      "Groups & notifications",
      "Private & group chat",
      "Real-time WebSocket messaging",
      "SQLite persistence",
    ],
    architecture:
      "Next.js connects the interface to a Go backend, with WebSockets for real-time private and group chat and SQLite for persistent data.",
    visual: "social",
    featured: true,
    links: {},
  },
  {
    id: "stock-portfolio",
    name: "Stock Portfolio Tracker",
    category: "Full stack / Data",
    description:
      "An application for tracking investments and portfolio data, connecting a React interface with PostgreSQL and Python-based AI features.",
    stack: ["React.js", "PostgreSQL", "Python"],
    features: [
      "Portfolio tracking",
      "Investment data",
      "Frontend development",
      "Database integration",
      "Python functionality",
      "AI-related features",
    ],
    architecture:
      "React.js presents portfolio and investment data, PostgreSQL stores application data, and Python supports application logic and AI-related functionality.",
    visual: "stocks",
    featured: true,
    links: {},
  },
  {
    id: "stellar-forum",
    name: "Stellar Forum",
    category: "Full stack / Community",
    description:
      "A forum built around conversation: posts, comments, categories, and reactions, with authentication and persistent storage.",
    stack: ["Go", "SQLite", "HTML/CSS"],
    features: [
      "Authentication & user profiles",
      "Posts & comments",
      "Categories & filtering",
      "Likes & dislikes",
      "Session management",
      "SQLite persistence",
    ],
    architecture:
      "A Go backend handles authentication, sessions, and forum interactions. HTML and CSS provide the interface, with SQLite storing the community’s content.",
    visual: "forum",
    links: {},
  },
  {
    id: "coding-practice",
    name: "Coding Practice Platform",
    category: "Concept / Frontend project",
    description:
      "A frontend concept for choosing a programming language and working through coding questions at different difficulty levels.",
    stack: ["HTML", "CSS", "Vanilla JavaScript"],
    features: [
      "Language selection",
      "Go, Python & Java direction",
      "Multiple difficulty levels",
      "Coding question interface",
    ],
    architecture:
      "Built as a frontend concept with HTML, CSS, and vanilla JavaScript. The interface explores language selection and progressive question difficulty; no backend is claimed.",
    visual: "practice",
    links: {},
  },
];

export const moreBuilds = [
  { name: "wget reimplementation", technology: "Go" },
  { name: "push-swap", technology: "Go" },
  { name: "my-ls", technology: "Go" },
  { name: "ASCII Art Color", technology: "Go" },
  { name: "Ray Tracer", technology: "Rust" },
  { name: "UDP Maze Wars", technology: "Networking" },
  { name: "Filler Game Robot", technology: undefined },
  { name: "GraphQL Profile", technology: "GraphQL" },
  { name: "JavaScript Framework / TodoMVC", technology: "JavaScript" },
] as const;

export const principles: readonly Principle[] = [
  {
    id: "leadership",
    title: "Team leadership",
    description:
      "Organize tasks, support teammates, and help keep work aligned and on track.",
    icon: "users",
  },
  {
    id: "collaboration",
    title: "Full-stack collaboration",
    description:
      "Work across frontend and backend tasks, code reviews, and feature delivery.",
    icon: "layers",
  },
  {
    id: "problem-solving",
    title: "Problem solving",
    description:
      "Break down technical problems, debug issues, and build practical solutions.",
    icon: "puzzle",
  },
  {
    id: "quality",
    title: "Quality mindset",
    description:
      "Use QA and playtesting experience to identify issues early and improve software quality.",
    icon: "check",
  },
];

export const education = [
  {
    institution: "Bahrain Polytechnic",
    program: "BSc in ICT – Programming",
    status: "2nd-Year Student",
    current: true,
  },
  {
    institution: "Reboot Coding Institute",
    program: "Full-Stack Development Program",
    status: "Completed",
    current: false,
  },
] as const;

export const systemNodes = [
  {
    id: "frontend",
    label: "Frontend",
    meta: "THE INTERFACE",
    x: 25,
    y: 20,
    description:
      "Interfaces built with React, Next.js, and an eye for the details.",
    target: "stack",
    path: "M300 260 V155 Q300 104 250 104 H150",
  },
  {
    id: "backend",
    label: "Backend",
    meta: "THE LOGIC",
    x: 75,
    y: 20,
    description:
      "Application logic and backend systems built with Go and Python.",
    target: "stack",
    path: "M300 260 V155 Q300 104 350 104 H450",
  },
  {
    id: "databases",
    label: "Databases",
    meta: "THE MEMORY",
    x: 15,
    y: 50,
    description:
      "Connected, persistent data with PostgreSQL, MySQL, SQLite, and Oracle DB.",
    target: "stack",
    path: "M300 260 H90",
  },
  {
    id: "apis",
    label: "APIs",
    meta: "THE CONNECTION",
    x: 85,
    y: 50,
    description:
      "REST APIs, GraphQL, and the connections that make software work together.",
    target: "stack",
    path: "M300 260 H510",
  },
  {
    id: "quality",
    label: "Quality",
    meta: "THE STANDARD",
    x: 25,
    y: 80,
    description:
      "A quality mindset shaped by testing, teamwork, and leading approximately 20 people.",
    target: "approach",
    path: "M300 260 V365 Q300 416 250 416 H150",
  },
  {
    id: "realtime",
    label: "Real-time",
    meta: "THE PULSE",
    x: 75,
    y: 80,
    description:
      "Live notifications and private or group conversations, connected with WebSockets.",
    target: "projects",
    path: "M300 260 V365 Q300 416 350 416 H450",
  },
] as const;
