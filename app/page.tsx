import Link from "next/link";
import {
  GitBranch,
  Shield,
  Cpu,
  Rocket,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

const stats = [
  { label: "Active Pipelines", value: "3", icon: GitBranch, color: "bg-blue-500", change: "+1 this week" },
  { label: "Security Scans", value: "24", icon: Shield, color: "bg-green-500", change: "All passed" },
  { label: "AI Recommendations", value: "12", icon: Cpu, color: "bg-indigo-500", change: "Applied today" },
  { label: "Deployments", value: "8", icon: Rocket, color: "bg-orange-500", change: "This month" },
];

const recentPipelines = [
  {
    id: "1",
    name: "frontend-app",
    appType: "Node.js",
    status: "success",
    tools: ["npm", "jest", "snyk", "kubernetes"],
    lastRun: "2 hours ago",
  },
  {
    id: "2",
    name: "api-service",
    appType: "Java",
    status: "running",
    tools: ["maven", "junit", "trivy", "argocd"],
    lastRun: "Running now",
  },
  {
    id: "3",
    name: "data-pipeline",
    appType: "Python",
    status: "warning",
    tools: ["docker", "pytest", "semgrep", "helm"],
    lastRun: "1 day ago",
  },
];

const stages = [
  { label: "Build", emoji: "🔨", desc: "Compile and package your application" },
  { label: "Test", emoji: "🧪", desc: "Run unit, integration, and e2e tests" },
  { label: "Security", emoji: "🔒", desc: "SAST, DAST, and vulnerability scans" },
  { label: "Monitor", emoji: "📊", desc: "Metrics, tracing, and alerting" },
  { label: "Deploy", emoji: "🚀", desc: "Deploy to cloud or on-prem environments" },
];

const statusConfig = {
  success: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50", label: "Success" },
  running: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50", label: "Running" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50", label: "Warning" },
};

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your AI-powered DevSecOps pipelines</p>
        </div>
        <Link
          href="/pipeline/new"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} />
          New Pipeline
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
                <Icon size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{value}</span>
            </div>
            <p className="text-sm font-medium text-gray-700">{label}</p>
            <p className="text-xs text-gray-400 mt-1">{change}</p>
          </div>
        ))}
      </div>

      {/* Pipeline Stages Overview */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">DevSecOps Pipeline Stages</h2>
        <div className="flex flex-col sm:flex-row gap-2 items-stretch">
          {stages.map(({ label, emoji, desc }, idx) => (
            <div key={label} className="flex items-center flex-1 gap-2">
              <div className="flex-1 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-sm font-semibold text-gray-800">{label}</div>
                <div className="text-xs text-gray-500 mt-1 hidden lg:block">{desc}</div>
              </div>
              {idx < stages.length - 1 && (
                <ArrowRight size={16} className="text-gray-300 flex-shrink-0 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Pipelines */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Pipelines</h2>
          <Link href="/pipelines" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {recentPipelines.map((pipeline) => {
            const status = statusConfig[pipeline.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            return (
              <Link
                key={pipeline.id}
                href={`/pipeline/${pipeline.id}`}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors group"
              >
                <div className={`w-8 h-8 ${status.bg} rounded-lg flex items-center justify-center`}>
                  <StatusIcon size={16} className={status.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 group-hover:text-indigo-700">
                      {pipeline.name}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {pipeline.appType}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {pipeline.tools.map((tool) => (
                      <span key={tool} className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                  <p className="text-xs text-gray-400 mt-0.5">{pipeline.lastRun}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">🤖 AI Pipeline Wizard</h3>
            <p className="text-indigo-200 text-sm mt-1">
              Tell our AI about your app and get a tailored DevSecOps pipeline in seconds.
            </p>
          </div>
          <Link
            href="/pipeline/new"
            className="flex-shrink-0 bg-white text-indigo-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Create Pipeline →
          </Link>
        </div>
      </div>
    </div>
  );
}
