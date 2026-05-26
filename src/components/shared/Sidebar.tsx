"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  LayoutDashboard, 
  PenTool, 
  FolderHeart, 
  LineChart, 
  Sliders, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Flame
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useStore } from "@/lib/store";

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const brandProfile = useStore((state) => state.brandProfile);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Showcase Landing", href: "/", icon: Sparkles },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Post Generator", href: "/generator", icon: PenTool },
    { name: "Drafts Library", href: "/drafts", icon: FolderHeart },
    { name: "Brand Memory", href: "/settings/brand-profile", icon: Sliders },
    { name: "Post Analytics", href: "/analytics", icon: LineChart },
  ];

  return (
    <>
      {/* Mobile top navigation header */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-slate-200 dark:border-slate-800 bg-[#ffffff]/80 dark:bg-[#080b11]/80 backdrop-blur-md z-40 flex items-center justify-between px-6 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Forge
          </span>
        </Link>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg smooth-transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar background overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Primary Sidebar panel */}
      <aside className={`
        fixed top-0 bottom-0 left-0 w-64 border-r border-slate-200 dark:border-[#1e293b] 
        bg-white dark:bg-[#090d16]/95 backdrop-blur-xl z-50 flex flex-col justify-between 
        smooth-transition md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Top Section */}
        <div className="flex flex-col flex-1 p-6 overflow-y-auto">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 pb-8 mb-4 border-b border-slate-100 dark:border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Flame className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Forge
              </span>
              <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">
                AUTHENTIC BRANDING
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1.5 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? "bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-l-4 border-emerald-500" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-100"
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-emerald-500" : "text-slate-400 dark:text-slate-500"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
          {/* Theme toggler */}
          <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800/60">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 pl-2">Theme Mode</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all shadow-sm"
              aria-label="Toggle theme mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
            </button>
          </div>

          {/* User profile capsule */}
          <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1px]">
              <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-sm font-bold text-white">
                {brandProfile.name.split(" ").map(n => n[0]).join("")}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-slate-900 dark:text-slate-200 truncate">
                {brandProfile.name}
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {brandProfile.role}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
