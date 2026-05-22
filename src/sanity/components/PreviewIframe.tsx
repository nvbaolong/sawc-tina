"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  RotateCw,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
} from "lucide-react";

export default function PreviewIframe({ document: sanityDoc }: { document: any }) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { displayed } = sanityDoc;
  if (!displayed) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-950 p-6 text-center text-slate-400 font-body">
        <div>
          <Sparkles className="mx-auto mb-4 h-12 w-12 text-primary animate-pulse" />
          <p className="text-lg font-bold text-white">No Document Selected</p>
          <p className="mt-1 text-sm">Select or create a document to view live preview.</p>
        </div>
      </div>
    );
  }

  // Preview URL points to Next.js API draft route to enable Draft Mode.
  // We use process.env.NEXT_PUBLIC_SITE_URL or default to local development.
  const siteUrl = "http://localhost:3000";
  const previewUrl = `${siteUrl}/api/draft`;

  const reloadPreview = () => {
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  const openInNewTab = () => {
    window.open(siteUrl, "_blank");
  };

  const getContainerWidth = () => {
    switch (device) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#0F172A] select-none font-body">
      {/* Visual Header / Control Bar */}
      <div className="flex h-14 items-center justify-between border-b border-slate-800 bg-[#1E293B]/80 px-4 backdrop-blur-md z-30">
        {/* Document Info */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Live Preview
          </span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800">
          <button
            onClick={() => setDevice("desktop")}
            className={`flex h-8 w-10 items-center justify-center rounded-lg transition-all ${
              device === "desktop"
                ? "bg-primary text-white shadow-lg"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Desktop view"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`flex h-8 w-10 items-center justify-center rounded-lg transition-all ${
              device === "tablet"
                ? "bg-primary text-white shadow-lg"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Tablet view"
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`flex h-8 w-10 items-center justify-center rounded-lg transition-all ${
              device === "mobile"
                ? "bg-primary text-white shadow-lg"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Mobile view"
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={reloadPreview}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            title="Refresh Preview"
          >
            <RotateCw className={`h-4 w-4 ${isLoading ? "animate-spin text-primary" : ""}`} />
          </button>
          <button
            onClick={openInNewTab}
            className="flex h-9 items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-3 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            title="Open in new window"
          >
            <span className="hidden sm:inline">Open Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Preview Iframe Container */}
      <div className="flex-1 overflow-auto bg-slate-950/40 p-6 flex items-center justify-center relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-20 backdrop-blur-sm">
            <div className="text-center">
              <RotateCw className="mx-auto mb-4 h-10 w-10 text-primary animate-spin" />
              <p className="text-sm font-semibold text-slate-300">Connecting live draft editor...</p>
              <p className="text-xs text-slate-500 mt-1">Fetching latest unpublished changes</p>
            </div>
          </div>
        )}

        <div
          style={{
            width: getContainerWidth(),
            height: "100%",
            maxWidth: "100%",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 bg-white"
        >
          <iframe
            key={key}
            ref={iframeRef}
            src={previewUrl}
            className="w-full h-full border-none"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
