"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Check,
  Search,
} from "lucide-react";
import {
  TOOLS_BY_STAGE,
  PIPELINE_STAGES,
  APP_TYPES,
  Tool,
  PipelineStage,
  getAIRecommendations,
  generateGitHubActionsYaml,
  PipelineConfig,
} from "@/app/lib/tools";

type WizardStep = "appType" | "tools" | "review";

export default function NewPipelinePage() {
  const router = useRouter();
  const [step, setStep] = useState<WizardStep>("appType");
  const [pipelineName, setPipelineName] = useState("");
  const [selectedAppType, setSelectedAppType] = useState("");
  const [selectedTools, setSelectedTools] = useState<Record<PipelineStage, Tool[]>>({
    build: [],
    test: [],
    security: [],
    monitor: [],
    deploy: [],
  });
  const [activeStage, setActiveStage] = useState<PipelineStage>("build");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiApplied, setAiApplied] = useState(false);
  const [generatedYaml, setGeneratedYaml] = useState("");
  const [yamlVisible, setYamlVisible] = useState(false);

  const handleAIRecommend = () => {
    if (!selectedAppType) return;
    const recommendations = getAIRecommendations(selectedAppType);
    const newTools: Record<PipelineStage, Tool[]> = {
      build: [],
      test: [],
      security: [],
      monitor: [],
      deploy: [],
    };
    for (const stage of PIPELINE_STAGES) {
      const ids = recommendations[stage.id] || [];
      newTools[stage.id] = TOOLS_BY_STAGE[stage.id].filter((t) => ids.includes(t.id));
    }
    setSelectedTools(newTools);
    setAiApplied(true);
  };

  const toggleTool = (tool: Tool, stage: PipelineStage) => {
    setSelectedTools((prev) => {
      const current = prev[stage];
      const exists = current.find((t) => t.id === tool.id);
      return {
        ...prev,
        [stage]: exists ? current.filter((t) => t.id !== tool.id) : [...current, tool],
      };
    });
  };

  const isToolSelected = (toolId: string, stage: PipelineStage) =>
    selectedTools[stage].some((t) => t.id === toolId);

  const totalSelectedTools = Object.values(selectedTools).flat().length;

  const handleGenerateYaml = () => {
    const config: PipelineConfig = {
      id: Date.now().toString(),
      name: pipelineName || "my-app",
      description: `DevSecOps pipeline for ${selectedAppType}`,
      appType: selectedAppType,
      tools: selectedTools,
      createdAt: new Date().toISOString(),
    };
    const yaml = generateGitHubActionsYaml(config);
    setGeneratedYaml(yaml);
    setYamlVisible(true);
    // Store in localStorage for the pipelines page
    const pipelines = JSON.parse(localStorage.getItem("pipelines") || "[]");
    pipelines.push({ ...config, yaml });
    localStorage.setItem("pipelines", JSON.stringify(pipelines));
  };

  const filteredTools = TOOLS_BY_STAGE[activeStage].filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Pipeline</h1>
        <p className="text-gray-500 mt-1">Configure your AI-powered DevSecOps pipeline</p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { id: "appType", label: "App Type" },
          { id: "tools", label: "Select Tools" },
          { id: "review", label: "Review & Generate" },
        ].map(({ id, label }, idx) => {
          const steps = ["appType", "tools", "review"];
          const current = steps.indexOf(step);
          const thisIdx = steps.indexOf(id);
          const done = thisIdx < current;
          const active = thisIdx === current;
          return (
            <div key={id} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                  done
                    ? "bg-indigo-600 text-white"
                    : active
                    ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {done ? <Check size={14} /> : idx + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  active ? "text-indigo-700" : done ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {label}
              </span>
              {idx < 2 && <ChevronRight size={14} className="text-gray-300" />}
            </div>
          );
        })}
      </div>

      {/* Step 1: App Type */}
      {step === "appType" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">What type of application are you building?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Our AI will recommend the best DevSecOps tools based on your application type.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pipeline Name</label>
            <input
              type="text"
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
              placeholder="e.g. my-app, frontend, api-service"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {APP_TYPES.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setSelectedAppType(id)}
                className={`p-4 rounded-xl border-2 text-left transition-all hover:border-indigo-300 ${
                  selectedAppType === id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className="text-2xl block mb-2">{icon}</span>
                <span className={`text-sm font-medium ${selectedAppType === id ? "text-indigo-700" : "text-gray-700"}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                if (selectedAppType) {
                  handleAIRecommend();
                  setStep("tools");
                }
              }}
              disabled={!selectedAppType}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={16} />
              AI Recommend & Continue
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Tool Selection */}
      {step === "tools" && (
        <div className="space-y-4">
          {aiApplied && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
              <Sparkles size={18} className="text-indigo-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-indigo-700">AI Recommendations Applied!</p>
                <p className="text-sm text-indigo-600 mt-0.5">
                  Based on your <strong>{APP_TYPES.find((a) => a.id === selectedAppType)?.label}</strong> app,
                  we&apos;ve pre-selected {totalSelectedTools} tools. Customize as needed.
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Stage tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {PIPELINE_STAGES.map((stage) => {
                const count = selectedTools[stage.id].length;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeStage === stage.id
                        ? "border-indigo-500 text-indigo-700 bg-indigo-50/50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
                    }`}
                  >
                    {stage.label}
                    {count > 0 && (
                      <span className="bg-indigo-100 text-indigo-700 text-xs rounded-full px-2 py-0.5 font-semibold">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeStage} tools...`}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Tools grid */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTools.map((tool) => {
                const selected = isToolSelected(tool.id, activeStage);
                return (
                  <button
                    key={tool.id}
                    onClick={() => toggleTool(tool, activeStage)}
                    className={`relative text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      selected
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-indigo-200"
                    }`}
                  >
                    {selected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{tool.logo}</span>
                      <span className={`font-semibold text-sm ${selected ? "text-indigo-700" : "text-gray-800"}`}>
                        {tool.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{tool.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary bar */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm text-gray-500 font-medium">Selected tools:</span>
              {PIPELINE_STAGES.map((stage) => {
                const count = selectedTools[stage.id].length;
                if (count === 0) return null;
                return (
                  <span key={stage.id} className={`text-xs font-medium px-2.5 py-1 rounded-full ${stage.bgColor} ${stage.color}`}>
                    {stage.label}: {count}
                  </span>
                );
              })}
              {totalSelectedTools === 0 && (
                <span className="text-sm text-gray-400">No tools selected yet</span>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep("appType")}
              className="flex items-center gap-2 text-gray-600 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <button
              onClick={() => setStep("review")}
              disabled={totalSelectedTools === 0}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review Pipeline
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === "review" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Pipeline Summary</h2>
            <p className="text-gray-500 text-sm mb-6">
              Review your DevSecOps pipeline configuration before generating.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Pipeline Name</label>
                <p className="text-gray-900 font-semibold mt-1">{pipelineName || "my-app"}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">App Type</label>
                <p className="text-gray-900 font-semibold mt-1">
                  {APP_TYPES.find((a) => a.id === selectedAppType)?.icon}{" "}
                  {APP_TYPES.find((a) => a.id === selectedAppType)?.label}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {PIPELINE_STAGES.map((stage) => {
                const tools = selectedTools[stage.id];
                return (
                  <div key={stage.id} className={`rounded-lg ${stage.bgColor} p-4`}>
                    <h3 className={`text-sm font-semibold ${stage.color} mb-2`}>{stage.label}</h3>
                    {tools.length === 0 ? (
                      <p className="text-xs text-gray-400">No tools selected</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {tools.map((tool) => (
                          <div
                            key={tool.id}
                            className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm"
                          >
                            <span>{tool.logo}</span>
                            <span>{tool.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generate YAML */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">GitHub Actions Pipeline</h2>
                <p className="text-gray-500 text-sm">Generate a ready-to-use CI/CD workflow YAML</p>
              </div>
              <button
                onClick={handleGenerateYaml}
                className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                <Sparkles size={16} />
                Generate YAML
              </button>
            </div>

            {yamlVisible && (
              <div className="relative">
                <pre className="bg-gray-900 text-green-400 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed max-h-96 overflow-y-auto">
                  {generatedYaml}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedYaml)}
                  className="absolute top-3 right-3 bg-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep("tools")}
              className="flex items-center gap-2 text-gray-600 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <Check size={16} />
              Save & Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
