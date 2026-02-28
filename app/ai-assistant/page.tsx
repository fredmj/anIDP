"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: "0",
  role: "assistant",
  content:
    "Hello! I'm your AI DevSecOps assistant. I can help you:\n\n• **Choose the right tools** for your DevSecOps pipeline\n• **Explain best practices** for building, testing, securing, and deploying applications\n• **Recommend configurations** based on your tech stack\n• **Answer questions** about any DevSecOps tool or process\n\nWhat would you like help with today?",
  timestamp: new Date(),
};

function getAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes("security") || msg.includes("sast") || msg.includes("dast") || msg.includes("scan")) {
    return "For security scanning in your DevSecOps pipeline, I recommend a layered approach:\n\n🔍 **SAST (Static Analysis)**:\n- **Semgrep** – Fast, customizable rules for any language\n- **Snyk Code** – Developer-friendly with IDE integration\n\n🔬 **SCA (Dependencies)**:\n- **Snyk** – Scans npm, Maven, pip packages for CVEs\n- **Dependabot** – Auto-creates PRs to update vulnerable deps\n\n🐳 **Container Scanning**:\n- **Trivy** – Comprehensive, free, and fast\n- Integrate into your Docker build step\n\n⚡ **DAST (Dynamic)**:\n- **OWASP ZAP** – Great for API and web app testing\n\n🔐 **Secret Detection**:\n- **Gitleaks** – Run as a pre-commit hook AND in CI\n\nWant me to generate a security-focused pipeline configuration?";
  }

  if (msg.includes("kubernetes") || msg.includes("k8s") || msg.includes("deploy")) {
    return "For Kubernetes deployment, here's a modern GitOps approach:\n\n☸️ **Deployment Strategy**:\n1. **Build** → Docker image → push to container registry (GHCR/ECR)\n2. **Scan** → Trivy vulnerability scan on the image\n3. **Deploy** → Use ArgoCD or Flux for GitOps\n\n⛵ **Helm** is recommended for packaging your K8s manifests:\n```bash\nhelm upgrade --install my-app ./charts/my-app \\\n  --set image.tag=$IMAGE_TAG \\\n  --namespace production\n```\n\n🐙 **ArgoCD** provides:\n- Declarative GitOps deployments\n- Automatic sync from Git\n- Rollback capabilities\n- Web UI for visibility\n\nWould you like a complete Kubernetes pipeline configuration?";
  }

  if (msg.includes("monitor") || msg.includes("observability") || msg.includes("metrics") || msg.includes("logging")) {
    return "Observability consists of three pillars:\n\n📊 **Metrics** (Prometheus + Grafana):\n- Prometheus scrapes metrics from your app (`/metrics`)\n- Grafana visualizes with pre-built dashboards\n- Set up alerts for SLOs/SLAs\n\n📋 **Logs** (ELK Stack or Loki):\n- Elasticsearch + Logstash + Kibana\n- Or Grafana Loki (lighter weight)\n- Structured JSON logging is essential\n\n🕵️ **Tracing** (Jaeger or Tempo):\n- Distributed tracing for microservices\n- OpenTelemetry for vendor-neutral instrumentation\n\n📟 **Alerting** (PagerDuty or Alertmanager):\n- Alert on error rate, latency, saturation\n- Use the **SRE Golden Signals**: Latency, Traffic, Errors, Saturation\n\nFor a new project, I'd start with **Prometheus + Grafana** – they're open-source and battle-tested.";
  }

  if (msg.includes("node") || msg.includes("javascript") || msg.includes("typescript") || msg.includes("react") || msg.includes("next")) {
    return "For a Node.js/TypeScript DevSecOps pipeline, here's my recommended stack:\n\n🔨 **Build**: `npm ci && npm run build`\n\n🧪 **Test**:\n- **Jest** for unit tests + coverage\n- **Cypress** for E2E\n- **k6** for load testing\n\n🔒 **Security**:\n- **Snyk** for npm dependency vulnerabilities\n- **Semgrep** for SAST\n- **Gitleaks** for secret detection\n- **npm audit** (built-in, always run it!)\n\n📊 **Monitor**: Prometheus + Grafana, or Datadog for managed solution\n\n🚀 **Deploy**: Docker → Kubernetes with Helm, or GitHub Actions → Vercel/AWS\n\nHere's a key tip: Run `npm audit --audit-level=high` in your CI to fail the build on high severity vulnerabilities. Want me to create a full pipeline for you?";
  }

  if (msg.includes("java") || msg.includes("spring") || msg.includes("maven") || msg.includes("gradle")) {
    return "For a Java/Spring Boot DevSecOps pipeline:\n\n🔨 **Build**: Maven or Gradle\n```bash\nmvn -B package -DskipTests\n# or\n./gradlew build\n```\n\n🧪 **Test**:\n- **JUnit 5** for unit tests\n- **SonarQube** for code quality & coverage gate\n- **JMeter** or **k6** for performance\n\n🔒 **Security**:\n- **Snyk** for Maven/Gradle dependency scanning\n- **SpotBugs + Find Security Bugs** plugin for SAST\n- **Trivy** for container scanning\n- **OWASP Dependency-Check** for CVEs\n\n📊 **Monitor**: Micrometer + Prometheus + Grafana\n- Spring Boot Actuator exposes `/actuator/prometheus` out of the box!\n\n🚀 **Deploy**: Docker → Kubernetes with Helm + ArgoCD\n\nSonarQube quality gates are especially valuable for Java – they can block merges when coverage drops below a threshold.";
  }

  if (msg.includes("python") || msg.includes("django") || msg.includes("flask") || msg.includes("fastapi")) {
    return "For a Python DevSecOps pipeline:\n\n🔨 **Build**:\n```bash\npip install -r requirements.txt\n# or\npoetry install\n```\nAlways use `pip install --require-hashes` for supply chain security!\n\n🧪 **Test**:\n- **pytest** with `pytest-cov` for coverage\n- **Bandit** for Python-specific security issues\n- **mypy** for type checking\n\n🔒 **Security**:\n- **Safety** or **Snyk** for pip vulnerabilities\n- **Semgrep** with Python rules\n- **Bandit** – Python-specific SAST\n- **Trivy** for container scanning\n\n📊 **Monitor**: Prometheus Python client + Grafana\n- Or **OpenTelemetry** for vendor-neutral instrumentation\n\n🚀 **Deploy**: Docker → Kubernetes or AWS Lambda (for serverless)";
  }

  if (msg.includes("github actions") || msg.includes("ci/cd") || msg.includes("pipeline") || msg.includes("workflow")) {
    return "GitHub Actions is an excellent CI/CD choice! Here's a robust DevSecOps workflow structure:\n\n```yaml\nname: DevSecOps Pipeline\n\non:\n  push:\n    branches: [main, develop]\n  pull_request:\n    branches: [main]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      # ... build steps\n\n  test:\n    needs: build\n    # ... test steps\n\n  security:\n    needs: build\n    # ... security scans\n\n  deploy:\n    needs: [test, security]\n    if: github.ref == 'refs/heads/main'\n    # ... deployment\n```\n\n**Key best practices**:\n- Use `actions/checkout@v4` (pinned versions)\n- Store secrets in GitHub Secrets, never in code\n- Use `needs:` to define stage dependencies\n- Gate deployment on both test AND security passing\n\nWant me to create a complete pipeline? Use the [Pipeline Wizard →](/pipeline/new)";
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("help")) {
    return "Hello! I'm here to help you build great DevSecOps pipelines. Here are some things you can ask me:\n\n• *\"What security tools should I use for a Node.js app?\"*\n• *\"How do I set up Kubernetes deployments?\"*\n• *\"Recommend a monitoring stack for microservices\"*\n• *\"How do I configure GitHub Actions for Python?\"*\n• *\"What's the difference between SAST and DAST?\"*\n\nOr just use the [Pipeline Wizard](/pipeline/new) to get an AI-curated pipeline in minutes!";
  }

  return `Great question! Let me provide some guidance on "${userMessage}".\n\nFor DevSecOps best practices, I recommend:\n\n1. **Shift Security Left** – Integrate security scanning early in the pipeline (SAST on every commit)\n2. **Fail Fast** – Run quick checks (lint, unit tests, secret detection) before slower ones\n3. **Defense in Depth** – Use multiple security tools: SAST + SCA + container scanning + DAST\n4. **GitOps** – Keep all configuration in Git, use pull-based deployments\n5. **Observability** – Metrics, logs, and traces from day one\n\nWould you like me to dive deeper into any specific aspect? You can also use the **[Pipeline Wizard](/pipeline/new)** to create a customized pipeline for your tech stack.`;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = getAIResponse(userMessage.content);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split("\n")
      .map((line, i) => {
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Inline code
        line = line.replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-1 rounded text-xs font-mono">$1</code>');
        // Links
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-600 hover:text-indigo-700 underline">$1</a>');
        return <p key={i} className="mb-1 last:mb-0" dangerouslySetInnerHTML={{ __html: line }} />;
      });
  };

  const suggestions = [
    "What tools for a Node.js app?",
    "How to set up Kubernetes?",
    "Best monitoring stack?",
    "GitHub Actions best practices",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">AI DevSecOps Assistant</h1>
            <p className="text-sm text-gray-500">Ask me anything about pipelines, tools, and best practices</p>
          </div>
          <div className="ml-auto">
            <Link
              href="/pipeline/new"
              className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <Sparkles size={14} />
              Pipeline Wizard
            </Link>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={16} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-sm"
                  : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="space-y-0.5">{formatContent(message.content)}</div>
              ) : (
                message.content
              )}
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                <User size={16} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-2">
          <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about DevSecOps tools, pipelines, security practices..."
              rows={1}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
