# anIDP – AI-Powered Internal Developer Platform

An IDP with AI inside. A SaaS-style web application with a dashboard that lets teams select DevSecOps tools and generate CI/CD pipelines to **build, test, secure, monitor, and deploy** any type of application.

## Features

- 🤖 **AI-Powered Recommendations** – Select your app type and get instant AI-curated tool suggestions
- 🔨 **Build** – Docker, Maven, Gradle, npm, Make, Bazel
- 🧪 **Test** – Jest, pytest, JUnit, Cypress, SonarQube, k6
- �� **Security** – Snyk, Semgrep, Trivy, OWASP ZAP, Gitleaks, Checkov
- 📊 **Monitor** – Prometheus, Grafana, Datadog, ELK Stack, Jaeger, PagerDuty
- 🚀 **Deploy** – Kubernetes, ArgoCD, Terraform, Helm, AWS CodeDeploy, GitHub Actions
- 📝 **YAML Generation** – Produces ready-to-use GitHub Actions pipeline YAML
- 💬 **AI Assistant** – Chat interface for DevSecOps advice and best practices

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── layout.tsx          # Root layout with sidebar
├── page.tsx            # Dashboard
├── ai-assistant/       # AI chat assistant
├── pipeline/
│   ├── new/            # 3-step pipeline wizard
│   └── [id]/           # Pipeline detail view
├── pipelines/          # Pipeline list
├── settings/           # Platform settings
├── components/
│   └── Sidebar.tsx     # Navigation sidebar
└── lib/
    └── tools.ts        # Tool catalog, AI recommendations, YAML generator
```
