import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle, Plus } from "lucide-react";

// Static demo pipeline data
const demoData = {
  "1": {
    id: "1",
    name: "frontend-app",
    appType: "Node.js",
    description: "React frontend with CI/CD pipeline",
    status: "success",
    stages: [
      { name: "Build", status: "success", tool: "npm", duration: "1m 23s" },
      { name: "Test", status: "success", tool: "Jest", duration: "2m 45s" },
      { name: "Security", status: "success", tool: "Snyk", duration: "0m 52s" },
      { name: "Monitor", status: "success", tool: "Prometheus", duration: "–" },
      { name: "Deploy", status: "success", tool: "Kubernetes", duration: "3m 10s" },
    ],
    lastRun: "2 hours ago",
    tools: ["npm", "jest", "snyk", "prometheus", "kubernetes"],
  },
  "2": {
    id: "2",
    name: "api-service",
    appType: "Java",
    description: "Spring Boot microservice",
    status: "running",
    stages: [
      { name: "Build", status: "success", tool: "Maven", duration: "2m 10s" },
      { name: "Test", status: "success", tool: "JUnit", duration: "1m 30s" },
      { name: "Security", status: "running", tool: "Trivy", duration: "Running..." },
      { name: "Monitor", status: "pending", tool: "Grafana", duration: "–" },
      { name: "Deploy", status: "pending", tool: "ArgoCD", duration: "–" },
    ],
    lastRun: "Running now",
    tools: ["maven", "junit", "trivy", "grafana", "argocd"],
  },
  "3": {
    id: "3",
    name: "data-pipeline",
    appType: "Python",
    description: "Data processing pipeline with MLOps",
    status: "warning",
    stages: [
      { name: "Build", status: "success", tool: "Docker", duration: "3m 05s" },
      { name: "Test", status: "warning", tool: "pytest", duration: "4m 12s" },
      { name: "Security", status: "success", tool: "Semgrep", duration: "1m 00s" },
      { name: "Monitor", status: "pending", tool: "ELK Stack", duration: "–" },
      { name: "Deploy", status: "pending", tool: "Helm", duration: "–" },
    ],
    lastRun: "1 day ago",
    tools: ["docker", "pytest", "semgrep", "elk", "helm"],
  },
};

const stageStatus = {
  success: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50", border: "border-green-200" },
  running: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200" },
  pending: { icon: Clock, color: "text-gray-400", bg: "bg-gray-50", border: "border-gray-200" },
};

export function generateStaticParams() {
  return Object.keys(demoData).map((id) => ({ id }));
}

export default async function PipelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pipeline = demoData[id as keyof typeof demoData];

  if (!pipeline) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 mb-4">Pipeline not found</p>
        <Link href="/" className="text-indigo-600 hover:text-indigo-700">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const overallStatus = stageStatus[pipeline.status as keyof typeof stageStatus];
  const OverallIcon = overallStatus.icon;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link href="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft size={14} />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${overallStatus.bg} rounded-xl flex items-center justify-center`}>
            <OverallIcon size={20} className={overallStatus.color} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{pipeline.name}</h1>
            <p className="text-gray-500 text-sm">{pipeline.description} · {pipeline.lastRun}</p>
          </div>
          <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-medium">
            {pipeline.appType}
          </span>
        </div>
      </div>

      {/* Pipeline visualization */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Stages</h2>
        <div className="space-y-3">
          {pipeline.stages.map((stage, idx) => {
            const s = stageStatus[stage.status as keyof typeof stageStatus];
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-lg border ${s.border} ${s.bg}`}
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Icon size={16} className={s.color} />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-900 text-sm">{stage.name}</span>
                  <span className="ml-2 text-xs text-gray-500">{stage.tool}</span>
                </div>
                <span className="text-xs text-gray-500">{stage.duration}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tools used */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Tools Used</h2>
        <div className="flex flex-wrap gap-2">
          {pipeline.tools.map((tool) => (
            <span key={tool} className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg text-sm font-medium">
              {tool}
            </span>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link
            href="/pipeline/new"
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <Plus size={14} />
            Create a similar pipeline
          </Link>
        </div>
      </div>
    </div>
  );
}
