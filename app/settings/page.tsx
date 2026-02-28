import { Settings, Bell, Key, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Configure your anIDP platform preferences</p>
      </div>

      <div className="space-y-4">
        {/* General */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings size={18} className="text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">General</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
              <input
                type="text"
                defaultValue="My Organization"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Git Branch</label>
              <input
                type="text"
                defaultValue="main"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Key size={18} className="text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">AI Configuration</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">AI Model</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>anIDP Built-in (Recommended)</option>
                <option>OpenAI GPT-4</option>
                <option>Anthropic Claude</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key (Optional)</label>
              <input
                type="password"
                placeholder="sk-..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-gray-400 mt-1">Required for external AI models</p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={18} className="text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Require security scan before deploy", enabled: true },
              { label: "Block pipelines with critical vulnerabilities", enabled: true },
              { label: "Enable secret detection on all commits", enabled: true },
              { label: "Send security alerts via email", enabled: false },
            ].map(({ label, enabled }) => (
              <div key={label} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">{label}</span>
                <div
                  className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                    enabled ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                      enabled ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell size={18} className="text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Pipeline success notifications", enabled: false },
              { label: "Pipeline failure notifications", enabled: true },
              { label: "Security vulnerability alerts", enabled: true },
              { label: "Deployment notifications", enabled: true },
            ].map(({ label, enabled }) => (
              <div key={label} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">{label}</span>
                <div
                  className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                    enabled ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                      enabled ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette size={18} className="text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
          </div>
          <div className="flex gap-3">
            {["Light", "Dark", "System"].map((theme) => (
              <button
                key={theme}
                className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${
                  theme === "Light"
                    ? "border-indigo-500 text-indigo-700 bg-indigo-50"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
