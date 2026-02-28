"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Plus,
  GitBranch,
  Bot,
  Settings,
  Cpu,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/pipeline/new", icon: Plus, label: "New Pipeline" },
  { href: "/pipelines", icon: GitBranch, label: "My Pipelines" },
  { href: "/ai-assistant", icon: Bot, label: "AI Assistant" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Cpu size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-white text-lg leading-none">anIDP</span>
            <span className="block text-xs text-gray-400 leading-none mt-0.5">AI DevSecOps Platform</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* AI Badge */}
      <div className="px-4 py-4 border-t border-gray-700">
        <div className="rounded-lg bg-gradient-to-r from-indigo-900 to-purple-900 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Bot size={14} className="text-indigo-300" />
            <span className="text-xs font-semibold text-indigo-300">AI-Powered</span>
          </div>
          <p className="text-xs text-gray-400">
            Let AI recommend the best DevSecOps tools for your project.
          </p>
          <Link
            href="/pipeline/new"
            className="mt-2 block text-center text-xs font-medium py-1.5 px-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </aside>
  );
}
