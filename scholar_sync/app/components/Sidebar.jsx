"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  GraduationCap,
  Briefcase,
  Users,
  MessageSquare,
  Settings,
  BookOpen,
  User,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Colleges", href: "/colleges", icon: GraduationCap },
  { name: "Scholarships", href: "/scholarships", icon: GraduationCap },
  { name: "Internships", href: "/internships", icon: Briefcase },
  { name: "Educators", href: "/educators", icon: Users },
  { name: "Community", href: "/community", icon: MessageSquare },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          <span className="font-serif text-2xl text-indigo-600">
            ScholarSync
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}>
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 ml-auto" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
}
