export interface Tool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: PipelineStage;
  tags: string[];
}

export type PipelineStage = "build" | "test" | "security" | "monitor" | "deploy";

export interface PipelineConfig {
  id: string;
  name: string;
  description: string;
  appType: string;
  tools: Record<PipelineStage, Tool[]>;
  createdAt: string;
}

export const PIPELINE_STAGES: { id: PipelineStage; label: string; color: string; bgColor: string }[] = [
  { id: "build", label: "Build", color: "text-blue-600", bgColor: "bg-blue-50" },
  { id: "test", label: "Test", color: "text-green-600", bgColor: "bg-green-50" },
  { id: "security", label: "Security", color: "text-red-600", bgColor: "bg-red-50" },
  { id: "monitor", label: "Monitor", color: "text-purple-600", bgColor: "bg-purple-50" },
  { id: "deploy", label: "Deploy", color: "text-orange-600", bgColor: "bg-orange-50" },
];

export const TOOLS: Tool[] = [
  // Build tools
  {
    id: "docker",
    name: "Docker",
    description: "Build and containerize applications using Docker images",
    logo: "🐳",
    category: "build",
    tags: ["container", "image", "oci"],
  },
  {
    id: "maven",
    name: "Maven",
    description: "Java project build automation and dependency management",
    logo: "🪶",
    category: "build",
    tags: ["java", "jvm", "artifacts"],
  },
  {
    id: "gradle",
    name: "Gradle",
    description: "Flexible build automation for Java, Kotlin, and more",
    logo: "🐘",
    category: "build",
    tags: ["java", "kotlin", "android"],
  },
  {
    id: "npm",
    name: "npm / Node.js",
    description: "Package manager and build tooling for JavaScript/TypeScript",
    logo: "📦",
    category: "build",
    tags: ["javascript", "typescript", "node"],
  },
  {
    id: "make",
    name: "Make",
    description: "Classic build automation tool for C/C++ and general projects",
    logo: "⚙️",
    category: "build",
    tags: ["c", "cpp", "native"],
  },
  {
    id: "bazel",
    name: "Bazel",
    description: "Fast, scalable, multi-language build system by Google",
    logo: "🔥",
    category: "build",
    tags: ["polyglot", "monorepo", "google"],
  },
  // Test tools
  {
    id: "jest",
    name: "Jest",
    description: "Delightful JavaScript testing framework with zero config",
    logo: "🃏",
    category: "test",
    tags: ["javascript", "unit", "snapshot"],
  },
  {
    id: "pytest",
    name: "pytest",
    description: "Full-featured Python testing framework",
    logo: "🐍",
    category: "test",
    tags: ["python", "unit", "functional"],
  },
  {
    id: "junit",
    name: "JUnit",
    description: "Unit testing framework for Java applications",
    logo: "☕",
    category: "test",
    tags: ["java", "unit", "tdd"],
  },
  {
    id: "cypress",
    name: "Cypress",
    description: "End-to-end testing for modern web applications",
    logo: "🌲",
    category: "test",
    tags: ["e2e", "web", "javascript"],
  },
  {
    id: "sonarqube",
    name: "SonarQube",
    description: "Continuous code quality and coverage analysis",
    logo: "📊",
    category: "test",
    tags: ["quality", "coverage", "analysis"],
  },
  {
    id: "k6",
    name: "k6",
    description: "Modern load testing tool for performance testing",
    logo: "📈",
    category: "test",
    tags: ["load", "performance", "stress"],
  },
  // Security tools
  {
    id: "snyk",
    name: "Snyk",
    description: "Developer-first security for code, containers, and IaC",
    logo: "🛡️",
    category: "security",
    tags: ["sast", "sca", "containers"],
  },
  {
    id: "semgrep",
    name: "Semgrep",
    description: "Fast, open-source SAST for finding bugs and enforcing standards",
    logo: "🔍",
    category: "security",
    tags: ["sast", "open-source", "rules"],
  },
  {
    id: "trivy",
    name: "Trivy",
    description: "Comprehensive container and filesystem vulnerability scanner",
    logo: "🔬",
    category: "security",
    tags: ["container", "scan", "vulnerability"],
  },
  {
    id: "owasp-zap",
    name: "OWASP ZAP",
    description: "Dynamic application security testing (DAST) tool",
    logo: "⚡",
    category: "security",
    tags: ["dast", "web", "penetration"],
  },
  {
    id: "gitleaks",
    name: "Gitleaks",
    description: "Detect secrets and sensitive data in Git repositories",
    logo: "🔐",
    category: "security",
    tags: ["secrets", "git", "compliance"],
  },
  {
    id: "checkov",
    name: "Checkov",
    description: "Static analysis for infrastructure-as-code security",
    logo: "🏗️",
    category: "security",
    tags: ["iac", "terraform", "k8s"],
  },
  // Monitor tools
  {
    id: "prometheus",
    name: "Prometheus",
    description: "Open-source monitoring and alerting toolkit",
    logo: "🔥",
    category: "monitor",
    tags: ["metrics", "alerting", "open-source"],
  },
  {
    id: "grafana",
    name: "Grafana",
    description: "Observability and data visualization platform",
    logo: "📉",
    category: "monitor",
    tags: ["dashboards", "visualization", "alerts"],
  },
  {
    id: "datadog",
    name: "Datadog",
    description: "Cloud monitoring, APM, and security platform",
    logo: "🐕",
    category: "monitor",
    tags: ["apm", "cloud", "saas"],
  },
  {
    id: "elk",
    name: "ELK Stack",
    description: "Elasticsearch, Logstash, Kibana for log management",
    logo: "📋",
    category: "monitor",
    tags: ["logs", "elasticsearch", "kibana"],
  },
  {
    id: "jaeger",
    name: "Jaeger",
    description: "End-to-end distributed tracing for microservices",
    logo: "🕵️",
    category: "monitor",
    tags: ["tracing", "microservices", "opentelemetry"],
  },
  {
    id: "pagerduty",
    name: "PagerDuty",
    description: "Digital operations management and incident response",
    logo: "📟",
    category: "monitor",
    tags: ["incidents", "alerting", "on-call"],
  },
  // Deploy tools
  {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Container orchestration for scalable deployments",
    logo: "☸️",
    category: "deploy",
    tags: ["containers", "orchestration", "cloud-native"],
  },
  {
    id: "argocd",
    name: "ArgoCD",
    description: "Declarative GitOps continuous delivery for Kubernetes",
    logo: "🐙",
    category: "deploy",
    tags: ["gitops", "kubernetes", "cd"],
  },
  {
    id: "terraform",
    name: "Terraform",
    description: "Infrastructure as Code for cloud resource provisioning",
    logo: "🏔️",
    category: "deploy",
    tags: ["iac", "cloud", "hashicorp"],
  },
  {
    id: "helm",
    name: "Helm",
    description: "Kubernetes package manager for managing chart releases",
    logo: "⛵",
    category: "deploy",
    tags: ["kubernetes", "packages", "charts"],
  },
  {
    id: "aws",
    name: "AWS CodeDeploy",
    description: "Automated deployment service for AWS infrastructure",
    logo: "☁️",
    category: "deploy",
    tags: ["aws", "cloud", "ec2"],
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    description: "CI/CD automation built into GitHub repositories",
    logo: "🐈",
    category: "deploy",
    tags: ["ci", "cd", "github"],
  },
];

export const TOOLS_BY_STAGE: Record<PipelineStage, Tool[]> = {
  build: TOOLS.filter((t) => t.category === "build"),
  test: TOOLS.filter((t) => t.category === "test"),
  security: TOOLS.filter((t) => t.category === "security"),
  monitor: TOOLS.filter((t) => t.category === "monitor"),
  deploy: TOOLS.filter((t) => t.category === "deploy"),
};

export const APP_TYPES = [
  { id: "nodejs", label: "Node.js / JavaScript", icon: "📦" },
  { id: "java", label: "Java / JVM", icon: "☕" },
  { id: "python", label: "Python", icon: "🐍" },
  { id: "go", label: "Go", icon: "🐹" },
  { id: "dotnet", label: ".NET / C#", icon: "🔷" },
  { id: "containers", label: "Containerized App", icon: "🐳" },
  { id: "microservices", label: "Microservices", icon: "🧩" },
  { id: "other", label: "Other", icon: "⚙️" },
];

export function generateGitHubActionsYaml(config: PipelineConfig): string {
  const allTools = Object.values(config.tools).flat();
  const hasDocker = allTools.some((t) => t.id === "docker");
  const hasMaven = allTools.some((t) => t.id === "maven");
  const hasNpm = allTools.some((t) => t.id === "npm");
  const hasGradle = allTools.some((t) => t.id === "gradle");
  const hasPytest = allTools.some((t) => t.id === "pytest");
  const hasJest = allTools.some((t) => t.id === "jest");
  const hasJunit = allTools.some((t) => t.id === "junit");
  const hasSnyk = allTools.some((t) => t.id === "snyk");
  const hasTrivy = allTools.some((t) => t.id === "trivy");
  const hasSemgrep = allTools.some((t) => t.id === "semgrep");
  const hasCheckov = allTools.some((t) => t.id === "checkov");
  const hasGitleaks = allTools.some((t) => t.id === "gitleaks");
  const hasK8s = allTools.some((t) => t.id === "kubernetes");
  const hasHelm = allTools.some((t) => t.id === "helm");
  const hasArgoCD = allTools.some((t) => t.id === "argocd");
  const hasTerraform = allTools.some((t) => t.id === "terraform");
  const hasSonarQube = allTools.some((t) => t.id === "sonarqube");
  const hasPrometheus = allTools.some((t) => t.id === "prometheus");

  const buildSteps: string[] = [];
  const testSteps: string[] = [];
  const securitySteps: string[] = [];
  const deploySteps: string[] = [];

  // Build steps
  if (hasNpm) {
    buildSteps.push(`      - name: Install dependencies
        run: npm ci
      - name: Build application
        run: npm run build`);
  }
  if (hasMaven) {
    buildSteps.push(`      - name: Build with Maven
        run: mvn -B package --no-transfer-progress`);
  }
  if (hasGradle) {
    buildSteps.push(`      - name: Build with Gradle
        run: ./gradlew build`);
  }
  if (hasPytest) {
    buildSteps.push(`      - name: Install Python dependencies
        run: pip install -r requirements.txt`);
  }
  if (hasDocker) {
    buildSteps.push(`      - name: Build Docker image
        run: docker build -t \${{ env.IMAGE_NAME }}:\${{ github.sha }} .`);
  }

  // Test steps
  if (hasJest) {
    testSteps.push(`      - name: Run Jest tests
        run: npm test -- --coverage`);
  }
  if (hasPytest) {
    testSteps.push(`      - name: Run pytest
        run: pytest --cov=. --cov-report=xml`);
  }
  if (hasJunit) {
    testSteps.push(`      - name: Run JUnit tests
        run: mvn test`);
  }
  if (hasSonarQube) {
    testSteps.push(`      - name: SonarQube analysis
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: \${{ secrets.SONAR_HOST_URL }}
        run: sonar-scanner`);
  }

  // Security steps
  if (hasGitleaks) {
    securitySteps.push(`      - name: Detect secrets with Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`);
  }
  if (hasSemgrep) {
    securitySteps.push(`      - name: Run Semgrep SAST
        uses: semgrep/semgrep-action@v1
        with:
          config: auto`);
  }
  if (hasSnyk) {
    securitySteps.push(`      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}`);
  }
  if (hasTrivy) {
    securitySteps.push(`      - name: Scan image with Trivy
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: \${{ env.IMAGE_NAME }}:\${{ github.sha }}
          format: sarif
          output: trivy-results.sarif`);
  }
  if (hasCheckov) {
    securitySteps.push(`      - name: Run Checkov IaC scan
        uses: bridgecrewio/checkov-action@master
        with:
          directory: .`);
  }

  // Deploy steps
  if (hasTerraform) {
    deploySteps.push(`      - name: Terraform init
        run: terraform init
      - name: Terraform plan
        run: terraform plan -out=tfplan
      - name: Terraform apply
        if: github.ref == 'refs/heads/main'
        run: terraform apply tfplan`);
  }
  if (hasHelm) {
    deploySteps.push(`      - name: Deploy with Helm
        run: |
          helm upgrade --install \${{ env.APP_NAME }} ./charts/\${{ env.APP_NAME }} \\
            --namespace \${{ env.NAMESPACE }} \\
            --set image.tag=\${{ github.sha }} \\
            --wait`);
  }
  if (hasK8s && !hasHelm) {
    deploySteps.push(`      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/\${{ env.APP_NAME }} \\
            app=\${{ env.IMAGE_NAME }}:\${{ github.sha }}
          kubectl rollout status deployment/\${{ env.APP_NAME }}`);
  }
  if (hasArgoCD) {
    deploySteps.push(`      - name: Sync ArgoCD application
        run: |
          argocd app sync \${{ env.APP_NAME }} --auth-token \${{ secrets.ARGOCD_TOKEN }}
          argocd app wait \${{ env.APP_NAME }} --health`);
  }

  const monitorTools = config.tools.monitor || [];

  let yaml = `# Generated by anIDP - ${config.name}
# App type: ${config.appType}
# Generated at: ${config.createdAt}

name: ${config.name} DevSecOps Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  APP_NAME: ${config.name.toLowerCase().replace(/\s+/g, "-")}
  IMAGE_NAME: ghcr.io/\${{ github.repository_owner }}/${config.name.toLowerCase().replace(/\s+/g, "-")}
  NAMESPACE: production

jobs:
`;

  if (buildSteps.length > 0) {
    yaml += `  build:
    name: 🔨 Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up build environment
        run: echo "Setting up build for ${config.appType}"
${buildSteps.join("\n")}

`;
  }

  if (testSteps.length > 0) {
    yaml += `  test:
    name: 🧪 Test
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
${testSteps.join("\n")}

`;
  }

  if (securitySteps.length > 0) {
    yaml += `  security:
    name: 🔒 Security
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
${securitySteps.join("\n")}

`;
  }

  if (deploySteps.length > 0) {
    yaml += `  deploy:
    name: 🚀 Deploy
    runs-on: ubuntu-latest
    needs: [test, security]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
${deploySteps.join("\n")}

`;
  }

  if (monitorTools.length > 0 && (hasPrometheus)) {
    yaml += `  # Monitoring is configured via ${monitorTools.map((t) => t.name).join(", ")}
  # See your monitoring configuration in the infrastructure setup

`;
  }

  return yaml;
}

export function getAIRecommendations(appType: string): Record<PipelineStage, string[]> {
  const recommendations: Record<string, Record<PipelineStage, string[]>> = {
    nodejs: {
      build: ["npm", "docker"],
      test: ["jest", "cypress", "sonarqube"],
      security: ["snyk", "semgrep", "gitleaks"],
      monitor: ["prometheus", "grafana"],
      deploy: ["kubernetes", "helm", "github-actions"],
    },
    java: {
      build: ["maven", "docker"],
      test: ["junit", "sonarqube"],
      security: ["snyk", "trivy", "semgrep"],
      monitor: ["prometheus", "grafana", "jaeger"],
      deploy: ["kubernetes", "helm", "argocd"],
    },
    python: {
      build: ["docker", "make"],
      test: ["pytest", "sonarqube"],
      security: ["snyk", "semgrep", "gitleaks"],
      monitor: ["prometheus", "grafana", "elk"],
      deploy: ["kubernetes", "helm", "github-actions"],
    },
    go: {
      build: ["docker", "make"],
      test: ["sonarqube", "k6"],
      security: ["trivy", "semgrep", "gitleaks"],
      monitor: ["prometheus", "grafana", "jaeger"],
      deploy: ["kubernetes", "helm", "argocd"],
    },
    containers: {
      build: ["docker"],
      test: ["sonarqube", "k6"],
      security: ["trivy", "snyk", "checkov"],
      monitor: ["prometheus", "grafana", "datadog"],
      deploy: ["kubernetes", "helm", "argocd"],
    },
    microservices: {
      build: ["docker", "gradle"],
      test: ["sonarqube", "k6"],
      security: ["snyk", "trivy", "semgrep", "gitleaks"],
      monitor: ["prometheus", "grafana", "jaeger", "elk"],
      deploy: ["kubernetes", "helm", "argocd"],
    },
  };

  return (
    recommendations[appType] || {
      build: ["docker"],
      test: ["jest"],
      security: ["snyk", "gitleaks"],
      monitor: ["prometheus", "grafana"],
      deploy: ["kubernetes", "github-actions"],
    }
  );
}
