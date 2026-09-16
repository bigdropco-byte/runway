'use client';

import React, { useEffect } from "react";
import Link from "next/link";
import { Compass, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;

      // 1. If user/bot accessed /en or /en/... redirect to root canonical path
      if (pathname === "/en" || pathname === "/en/") {
        window.location.replace("/");
        return;
      }
      if (pathname.startsWith("/en/")) {
        const cleanPath = pathname.replace(/^\/en/, "");
        const target = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
        window.location.replace(target + window.location.search + window.location.hash);
        return;
      }

      // 2. If path lacks trailing slash and has no file extension (.png, .xml, etc.)
      if (!pathname.endsWith("/") && !pathname.split("/").pop()?.includes(".")) {
        window.location.replace(`${pathname}/${window.location.search}${window.location.hash}`);
        return;
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 sm:px-6 text-center text-slate-900">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <Compass className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
          <p className="text-sm text-slate-600">
            The page you are looking for might have been moved or updated.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
          <Link
            href="/tools/"
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
          >
            Tools Directory
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
