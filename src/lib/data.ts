export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tags: string[];
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  href?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const profile = {
  name: "Ashutosh Kumar Goswami",
  role: "Backend & Cloud Engineer",
  tagline: "I build event-driven, cloud-native payment systems.",
  intro:
    "Backend engineer specialising in Java, Spring Boot and AWS. Currently a Working Student at OTTO Payments in Hamburg and an M.Sc. High Integrity Systems candidate at Frankfurt UAS — shipping reliable, observable systems that stay up under peak load.",
  location: "Bad Vilbel, Germany",
  email: "ashutoshgoswami05@gmail.com",
  phone: "+4915566071249",
  socials: [
    { label: "Email", href: "mailto:ashutoshgoswami05@gmail.com" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export const stats = [
  { value: "153k+", label: "Peak requests handled" },
  { value: "60k+", label: "Users served on platform" },
  { value: "3+", label: "Years building backends" },
];

export const experiences: Experience[] = [
  {
    company: "OTTO Payments",
    role: "Working Student",
    period: "Aug 2024 — Present",
    location: "Hamburg, Germany",
    highlights: [
      "Engineered and maintained mission-critical, cloud-native payment systems with an event-driven architecture in Java and Spring Boot, sustaining reliable transaction processing under peak load of 153k+ requests.",
      "Designed and automated infrastructure provisioning with Terraform (IaC) for reproducible dev, QA and production environments and scalable AWS deployments.",
      "Automated deployment pipelines with GitHub Actions and IaC, cutting deployment effort and operational overhead.",
      "Implemented monitoring with Prometheus and Grafana for proactive detection of infrastructure and application performance issues.",
      "Collaborated with cross-functional Agile teams to build backend features, review pull requests and ship production-ready software.",
    ],
    tags: ["Java", "Spring Boot", "AWS", "Terraform", "GitHub Actions", "Prometheus", "Grafana"],
  },
  {
    company: "Harman Connected Services",
    role: "Software Engineer",
    period: "Sep 2021 — Mar 2023",
    location: "Gurugram, India",
    highlights: [
      "Developed scalable Java Spring Boot backend services powering a connected-vehicle platform serving 60,000+ users.",
      "Designed and implemented RESTful APIs integrated with PostgreSQL for vehicle telemetry and analytics.",
      "Improved backend performance through debugging, code optimisation and feature enhancements in a large enterprise codebase.",
      "Partnered with product owners and distributed teams to deliver customer-driven backend functionality.",
      "Participated in Agile ceremonies, peer code reviews, testing and continuous improvement.",
    ],
    tags: ["Java", "Spring Boot", "REST APIs", "PostgreSQL", "Agile"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages & Frameworks",
    items: ["Java 17", "Python", "Spring Boot", "Spring Security", "SQL / PostgreSQL", "REST APIs"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Docker", "Terraform", "Helm", "ECR", "WAF", "Linux", "Prometheus", "Grafana"],
  },
  {
    label: "Testing",
    items: ["JUnit 5", "JUnit", "Pytest", "WireMock"],
  },
  {
    label: "AI & Agents",
    items: ["Agentic AI", "LangGraph", "Tool Chaining", "Prompt Engineering", "GitHub Copilot", "Claude Code"],
  },
  {
    label: "Tools",
    items: ["Git", "Maven", "IntelliJ IDEA"],
  },
];

export const projects: Project[] = [
  {
    name: "Cloud-Native Service Orchestration",
    tagline: "Secure microservices on AWS EKS",
    description:
      "Secure backend services in Java 17 and Spring Boot with JWT auth and RESTful APIs. Containerised with Docker and deployed to AWS Kubernetes (EKS), with Terraform provisioning VPC, IAM, load balancers and networking, and Helm managing releases.",
    tags: ["Java 17", "Spring Boot", "JWT", "Docker", "EKS", "Terraform", "Helm"],
  },
  {
    name: "Autonomous Financial Analyst Agent",
    tagline: "Multi-agent AI research platform",
    description:
      "Automates equity research by combining financial metrics, market sentiment and earnings-call analysis into explainable investment recommendations. Built for retail investors, wealth managers and fintech teams to speed up consistent, data-driven decisions.",
    tags: ["Agentic AI", "LangGraph", "Python", "Tool Chaining"],
  },
];

export const education = {
  school: "Frankfurt University of Applied Sciences",
  degree: "M.Sc. — High Integrity Systems",
  period: "Apr 2023 — Present",
  location: "Frankfurt am Main, Germany",
};

export const certifications = ["AWS Certified Cloud Practitioner"];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "German", level: "B2 (B1 Goethe Certificate)" },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
