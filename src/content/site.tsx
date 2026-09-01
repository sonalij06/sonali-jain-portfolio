export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Registry" },
  { href: "#writing", label: "Changelog" },
  { href: "#github", label: "Artifacts" },
  { href: "#contact", label: "Contact" },
  { href: "#remarks", label: "Reviews" },
] as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/sonali-devops-engineer/" },
  { label: "GitHub ↗", href: "https://github.com/sonalij06" },
  { label: "Medium ↗", href: "https://medium.com/@sonalijain0605" },
  { label: "sonali-jain-portfolio.vercel.app ↗", href: "https://sonali-jain-portfolio.vercel.app" },
] as const;

export const STATS = [
  { value: "4.5", suffix: "+", count: 4.5, label: "Years in DevOps" },
  { value: "40", suffix: "+", count: null, label: "Repos migrated" },
  { value: "1,300", suffix: "+", count: null, label: "Servers automated" },
  { value: "60", suffix: "%", count: null, label: "Less manual effort" },
] as const;

export const TERMINAL_LINES = [
  { type: "prompt", text: "$ whoami" },
  { type: "out", text: "sonali-jain · devops-engineer" },
  { type: "prompt", text: "$ uptime" },
  { type: "out", text: "4y 6m · 0 incidents unresolved" },
  { type: "prompt", text: "$ terraform apply" },
  { type: "out", text: "Plan: 42 to add, 0 to change, 0 to destroy." },
  { type: "ok", text: "Apply complete! Resources: 42 added." },
  { type: "prompt", text: "$ kubectl get pods -n prod" },
  { type: "out", text: "6/6 Running · 0 restarts" },
] as const;

export const JOBS = [
  {
    role: "DevOps Engineer",
    org: "Airties India Private Limited",
    dates: "Nov 2025 – Present",
    location: "Bangalore, India",
    bullets: [
      <>Managed monitoring and incident response across AWS accounts with <strong>CloudWatch, JIRA and AWS Incident Manager</strong>; integrated an Agentic AI + AWS Bedrock POC for LLM-driven log analysis.</>,
      <>Designed and deployed scalable AWS infrastructure with <strong>CloudFormation nested stacks</strong>, and automated CI/CD pipelines on GitLab workflows.</>,
      <>Supported real-time streaming and data pipeline automation across platforms using <strong>Amazon Kinesis, EMR and Databricks</strong>.</>,
      <>Managed IAM policies across multiple AWS accounts and automated identity provisioning in <strong>Keycloak</strong>, improving access governance.</>,
    ],
    tech: ["AWS Bedrock", "CloudFormation", "GitLab CI", "Kinesis", "EMR", "Databricks", "Keycloak"],
  },
  {
    role: "DevOps Engineer",
    org: "S&P Global · Communify Fincentric",
    dates: "Feb 2022 – Nov 2025",
    location: "Noida, India",
    bullets: [
      <>Migrated <strong>40+ repositories</strong> from Bitbucket/Jenkins to GitLab; automated CI/CD and provisioning via GitLab Runner + Chef, boosting efficiency <strong>35%</strong> and cutting manual workload <strong>60%</strong>.</>,
      <>Drove AWS &amp; Azure migration initiatives, provisioning infrastructure with <strong>Terraform</strong> (EC2, S3, VPC, IAM, Azure VMs, Storage Accounts) and RBAC-based state management.</>,
      <>Executed <strong>RHEL 7 → RHEL 9</strong> migration and upgraded the monitoring stack — Prometheus, Grafana, Alertmanager — across <strong>100+ nodes</strong>, lifting observability accuracy <strong>40%</strong>.</>,
      <>Automated platform upgrades for Rundeck and Sentry (Docker, Kafka, Snuba, ClickHouse, LDAP), scaling Filebeat to <strong>1,300+ servers</strong>.</>,
      <>Built proactive monitoring with Node.js, TestCafe and Prometheus — cutting MTTR <strong>45%</strong> and manual backup effort <strong>70%</strong>.</>,
    ],
    tech: ["Terraform", "Chef", "RHEL 9", "Prometheus", "Grafana", "ELK", "Sentry", "Kafka", "LDAP"],
  },
] as const;

export const SKILL_GROUPS = [
  { title: "Cloud Platforms", tags: ["AWS EC2", "S3", "IAM", "ELB", "RDS", "VPC", "Kinesis", "EMR", "Bedrock", "CloudWatch", "Azure VMs", "GCP"] },
  { title: "CI/CD & Automation", tags: ["Jenkins", "GitHub Actions", "GitLab CI", "Bitbucket", "Chef", "Rundeck"] },
  { title: "Containers & Orchestration", tags: ["Docker", "Kubernetes", "Nomad", "Consul"] },
  { title: "IaC & Config Management", tags: ["Terraform", "CloudFormation", "RHEL", "RBAC"] },
  { title: "Monitoring & Observability", tags: ["Prometheus", "Grafana", "ELK Stack", "Alertmanager", "Filebeat", "Sentry"] },
  { title: "Data, AI & Security", tags: ["Kafka", "ClickHouse", "Databricks", "Agentic AI", "LLM", "Keycloak", "LDAP"] },
] as const;

export const MARQUEE_TOOLS = [
  "Terraform", "AWS", "Azure", "GCP", "Kubernetes", "Docker", "GitLab CI", "Jenkins",
  "Prometheus", "Grafana", "ELK", "Chef", "Kafka", "Keycloak", "RHEL", "CloudFormation",
  "Sentry", "Bedrock", "Kinesis",
] as const;

export const ARTICLES = [
  {
    date: "Jul 2026",
    title: "Building an Autonomous Agent AI Publishing Platform",
    description: "A production-grade 7-agent publishing engine on Google ADK + Gemini — agents for research, planning, writing, review, SEO and visual suggestions.",
    href: "https://medium.com/@sonalijain0605/building-an-autonomous-agent-ai-publishing-platform-4bc386296a07",
  },
  {
    date: "Jul 2026",
    title: "Building a Self-Healing CI/CD Pipeline with GitLab, n8n & Cursor AI",
    description: "Automating first response to pipeline failures: GitLab CI/CD + n8n orchestration + Cursor's API detect, propose fixes, and open merge requests.",
    href: "https://medium.com/@sonalijain0605/building-a-self-healing-ci-cd-pipeline-with-gitlab-n8n-and-cursor-ai-4a6a8ff8e49e",
  },
  {
    date: "Sep 2025",
    title: "Enhancing Kubernetes Monitoring with Grafana — No Helm, Just YAML (Part 2)",
    description: "Extends a manual monitoring stack with Grafana dashboards, alerting, and persistent volumes for CPU, memory, disk and network metrics.",
    href: "https://medium.com/@sonalijain0605/enhancing-kubernetes-monitoring-with-grafana-dashboards-alerting-no-helm-just-yaml-part-2-6f65987c6798",
  },
  {
    date: "Aug 2025",
    title: "Implementing a Prometheus & Grafana Stack in Kubernetes — Manual Deployment",
    description: "Hands-on YAML-based deployment with no Helm charts — namespaces, deployments, services and config, built from the ground up.",
    href: "https://medium.com/@sonalijain0605/implementing-a-prometheus-grafana-monitoring-stack-in-kubernetes-manual-deployment-no-helm-54aee52d991e",
  },
  {
    date: "Aug 2024",
    title: "Basic Load Balancing Concept",
    description: "Practical load balancing across Azure regions using VMs, Application Gateway and Traffic Manager, routed by geographic proximity.",
    href: "https://medium.com/@sonalijain0605/basic-load-balancing-concept-b6c25a5671f4",
  },
  {
    date: "Jan 2024",
    title: "Docker fundamentals series",
    description: "Four-part primer — architecture, installing Docker, data persistence, and the Linux kernel primitives that make containers possible.",
    href: "https://medium.com/@sonalijain0605",
  },
] as const;

export const REPOS = [
  {
    name: "Autonomous-Agent-AI-Publishing-Platform",
    description: "A 7-agent content pipeline on Google ADK + Gemini — research, plan, write, review, SEO, and image-suggestion agents that turn a topic into a finished blog post.",
    href: "https://github.com/sonalij06/Autonomous-Agent-AI-Publishing-Platform",
    lang: "Python",
    meta: "AI agents",
  },
  {
    name: "Kubernetes-monitoring-stack",
    description: "Manual, Helm-free Prometheus + Grafana monitoring stack for Kubernetes — the companion repo to the writing series above.",
    href: "https://github.com/sonalij06/Kubernetes-monitoring-stack",
    lang: "YAML",
    meta: "★ 1 · ⑂ 1",
  },
  {
    name: "StateFul-App-Kubernetes-Cluster",
    description: "A stateful Node.js + Redis app on Kubernetes with auto-scaling, persistent storage and monitoring — HPA triggered by live CPU metrics.",
    href: "https://github.com/sonalij06/StateFul-App-Kubernetes-Cluster",
    lang: "JavaScript",
    meta: "K8s",
  },
  {
    name: "house-of-rivana",
    description: "A fashion jewellery e-commerce platform on Next.js 16 — full storefront, admin dashboard, Prisma + Postgres, and Razorpay payments.",
    href: "https://github.com/sonalij06/house-of-rivana",
    lang: "TypeScript",
    meta: "full-stack",
  },
] as const;
