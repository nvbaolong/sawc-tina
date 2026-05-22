"use client";

import { useState, useEffect } from "react";
import { useTina } from "tinacms/dist/react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BestBits from "@/components/BestBits";
import FriendsWithBenefits from "@/components/FriendsWithBenefits";
import CowsForCambodia from "@/components/CowsForCambodia";
import CosisChoir from "@/components/CosisChoir";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { HeroContent, TvShow, Event } from "@/types";

interface HomeClientProps {
  hero: {
    data: any;
    query: string;
    variables: any;
  };
  tvShows: {
    data: any;
    query: string;
    variables: any;
  };
  events: {
    data: any;
    query: string;
    variables: any;
  };
}

export default function HomeClient({ hero, tvShows, events }: HomeClientProps) {
  // State to toggle the click-to-edit outlines (Visual Edit Highlights)
  const [showEditHints, setShowEditHints] = useState(true);

  // States for Vercel deployment tracking
  const [deployStatus, setDeployStatus] = useState<"loading" | "success" | "pending" | "failure" | "error">("loading");
  const [latestCommit, setLatestCommit] = useState<{ sha: string; message: string; date: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Detect if inside an iframe (Tina editor), ?preview=true, or localhost for testing
    const inIframe = typeof window !== "undefined" && window.self !== window.top;
    const hasPreviewParam = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("preview");
    const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";
    
    setIsEditing(inIframe || hasPreviewParam || isLocalhost);
  }, []);

  const fetchDeployStatus = async () => {
    setIsSyncing(true);
    try {
      // Step 1: Fetch the combined status of the main branch
      const statusRes = await fetch("https://api.github.com/repos/nvbaolong/sawc-tina/commits/main/status");
      
      // Handle rate limiting gracefully (HTTP 403)
      if (statusRes.status === 403) {
        setDeployStatus("success");
        return;
      }

      if (!statusRes.ok) throw new Error("Failed to fetch status");
      const statusData = await statusRes.json();
      
      setDeployStatus(statusData.state || "success");
      
      // Step 2: Fetch the commit details
      const commitRes = await fetch("https://api.github.com/repos/nvbaolong/sawc-tina/commits/main");
      if (commitRes.ok) {
        const commitData = await commitRes.json();
        setLatestCommit({
          sha: commitData.sha?.substring(0, 7) || "",
          message: commitData.commit?.message?.split("\n")[0] || "Cập nhật nội dung",
          date: commitData.commit?.committer?.date || "",
        });
      }
    } catch (err) {
      console.error("Error fetching deploy status:", err);
      setDeployStatus("success");
    } finally {
      setIsSyncing(false);
    }
  };

  // Responsibly poll deployment status with visibility detection
  useEffect(() => {
    fetchDeployStatus(); // initial fetch

    let intervalId: any;

    const startPolling = () => {
      if (intervalId) clearInterval(intervalId);

      // Aggressive polling (12 seconds) when Vercel is pending to show rapid progress.
      // Slow polling (60 seconds) otherwise to keep GitHub rate-limit consumption low.
      const delay = deployStatus === "pending" ? 12000 : 60000;

      intervalId = setInterval(() => {
        if (document.visibilityState === "visible") {
          fetchDeployStatus();
        }
      }, delay);
    };

    startPolling();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchDeployStatus();
        startPolling();
      } else {
        if (intervalId) clearInterval(intervalId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [deployStatus]);

  // Use Tina hook for each data stream to support live visual editing
  const { data: heroData } = useTina({
    query: hero.query,
    variables: hero.variables,
    data: hero.data,
  });

  const { data: tvShowsData } = useTina({
    query: tvShows.query,
    variables: tvShows.variables,
    data: tvShows.data,
  });

  const { data: eventsData } = useTina({
    query: events.query,
    variables: events.variables,
    data: events.data,
  });

  // Extract real-time nodes from connections
  const rawTvShows =
    tvShowsData?.tvShowConnection?.edges?.map((edge: any) => edge?.node) || [];
  const rawEvents =
    eventsData?.eventConnection?.edges?.map((edge: any) => edge?.node) || [];

  // Sort according to orderRank (same logic as page.tsx)
  const sortedTvShows = [...rawTvShows].sort(
    (a: any, b: any) => (a?.orderRank ?? 999) - (b?.orderRank ?? 999)
  ) as TvShow[];

  const sortedEvents = [...rawEvents].sort(
    (a: any, b: any) => (a?.orderRank ?? 999) - (b?.orderRank ?? 999)
  ) as Event[];

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero initialData={heroData?.hero as HeroContent} showEditHints={showEditHints} />
      <BestBits initialTvShows={sortedTvShows} showEditHints={showEditHints} />
      <FriendsWithBenefits />
      <CowsForCambodia />
      <CosisChoir />
      <Events initialEvents={sortedEvents} showEditHints={showEditHints} />
      <Contact />
      <Footer />

      {/* Admin Panel: Visual Edit & Deployment Tracker */}
      {isEditing && (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 bg-black/90 backdrop-blur-md px-5 py-4 rounded-3xl border border-white/10 shadow-2xl shadow-black/80 max-w-[310px] w-[90vw] select-none transition-all duration-300 hover:border-white/20">
        
        {/* Row 1: Visual Edit Toggle */}
        <div className="flex items-center justify-between gap-6 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-5 h-5 transition-transform duration-500 ${showEditHints ? "text-[#eb242a] rotate-12" : "text-white/40"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
            <span className="text-[12px] font-heading font-black tracking-wider uppercase text-white">
              Visual Edit
            </span>
          </div>
          
          <button
            onClick={() => setShowEditHints(!showEditHints)}
            aria-label="Toggle visual edit highlights"
            className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
              showEditHints ? "bg-[#eb242a]" : "bg-white/10"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${
                showEditHints ? "translate-x-4.5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Row 2: Deployment Status Tracker */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Tiến trình xuất bản
            </span>
            <button
              onClick={fetchDeployStatus}
              disabled={isSyncing}
              className={`text-white/40 hover:text-white transition-all p-1 rounded-md hover:bg-white/5 active:scale-95 ${
                isSyncing ? "animate-spin text-white" : ""
              }`}
              title="Cập nhật trạng thái"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>

          {/* Stepper progress checklist */}
          <div className="flex flex-col gap-3.5 pt-1">
            {/* Step 1: Git push/commit */}
            <div className="flex items-start gap-2.5">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-white leading-none">
                  Bước 1: Lưu thay đổi
                </span>
                <span className="text-[10px] text-white/50 mt-1 leading-snug">
                  Đã đồng bộ lên hệ thống GitHub thành công.
                </span>
              </div>
            </div>

            {/* Step 2: Vercel Build */}
            <div className="flex items-start gap-2.5">
              <div className="shrink-0 mt-0.5">
                {deployStatus === "pending" ? (
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
                  </div>
                ) : deployStatus === "success" ? (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    ✓
                  </div>
                ) : (deployStatus === "failure" || deployStatus === "error") ? (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold">
                    ✗
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/5 text-white/30 border border-white/10 text-[10px] font-bold">
                    2
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className={`text-[12px] font-bold leading-none ${
                  deployStatus === "pending" ? "text-amber-400 animate-pulse" : "text-white"
                }`}>
                  Bước 2: Vercel biên dịch
                </span>
                <span className="text-[10px] text-white/50 mt-1 leading-snug">
                  {deployStatus === "loading" && "Đang kiểm tra trạng thái..."}
                  {deployStatus === "pending" && "⏳ Đang dựng website... (khoảng 2 phút)"}
                  {deployStatus === "success" && "Đã biên dịch thành công."}
                  {(deployStatus === "failure" || deployStatus === "error") && "❌ Biên dịch thất bại!"}
                </span>
              </div>
            </div>

            {/* Step 3: Live production */}
            <div className="flex items-start gap-2.5">
              <div className="shrink-0 mt-0.5">
                {deployStatus === "success" ? (
                  <div className="flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full text-[10px] text-white shadow-lg shadow-emerald-500/40 animate-bounce">
                    🚀
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/5 text-white/30 border border-white/10 text-[10px] font-bold">
                    3
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className={`text-[12px] font-bold leading-none ${
                  deployStatus === "success" ? "text-emerald-400 font-black" : "text-white/40"
                }`}>
                  Bước 3: Hoạt động (Live)
                </span>
                <span className="text-[10px] text-white/40 mt-1 leading-snug">
                  {deployStatus === "success" 
                    ? "🎉 Tuyệt vời! Website đã trực tiếp cập nhật nội dung mới." 
                    : "Đang chờ hoàn thành bước 2..."
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Commit details section */}
          {latestCommit && (
            <div className="mt-2 pt-2.5 border-t border-white/5 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[9px] text-white/30 font-mono">
                <span>Mã cập nhật: {latestCommit.sha}</span>
                {deployStatus === "success" && latestCommit.date && (
                  <span>
                    {new Date(latestCommit.date).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-white/70 italic line-clamp-2 leading-tight">
                "{latestCommit.message}"
              </span>
            </div>
          )}
        </div>
      </div>
      )}
    </main>
  );
}
