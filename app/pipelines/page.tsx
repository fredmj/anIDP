import Link from "next/link";
import { Plus, GitBranch, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const pipelines = [
  {
    id: "1",
    name: "frontend-app",
    appType: "Node.js",
    status: "success",
    tools: ["npm", "jest", "snyk", "kubernetes"],
    lastRun: "2 hours ago",
    runs: 42,
  },
  {
    id: "2",
    name: "api-service",
    appType: "Java",
    status: "running",
    tools: ["maven", "junit", "trivy", "argocd"],
    lastRun: "Running now",
    runs: 18,
  },
  {
    id: "3",
    name: "data-pipeline",
    appType: "Python",
    status: "warning",
    tools: ["docker", "pytest", "semgrep", "helm"],
    lastRun: "1 day ago",
    runs: 9,
  },
];

const statusConfig = {
  success: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50", label: "Success" },
  running: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50", label: "Running" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50", label: "Warning" },
};

export default function PipelinesPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Pipelines</h1>
          <p className="text-gray-500 mt-1">All your DevSecOps pipeline configurations</p>
        </div>
        <Link
          href="/pipeline/new"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} />
          New Pipeline
        </Link>
      </div>

      {pipelines.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-16 text-center">
          <GitBranch size={40} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No pipelines yet</h3>
          <p className="text-gray-400 mb-6">Create your first AI-powered DevSecOps pipeline.</p>
          <Link
            href="/pipeline/new"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} />
            Create Pipeline
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {pipelines.map((pipeline) => {
            const status = statusConfig[pipeline.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            return (
              <Link
                key={pipeline.id}
                href={`/pipeline/${pipeline.id}`}
                className="block bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${status.bg} rounded-xl flex items-center justify-center`}>
                    <StatusIcon size={20} className={status.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 group-hover:text-indigo-700 text-lg">
                        {pipeline.name}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {pipeline.appType}
                      </span>
                      <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pipeline.tools.map((tool) => (
                        <span key={tool} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">{pipeline.lastRun}</p>
                    <p className="text-xs text-gray-400 mt-1">{pipeline.runs} runs</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
