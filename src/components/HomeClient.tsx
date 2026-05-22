"use client";

import { useState } from "react";
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

      {/* Visual Edit Highlight Toggle Control */}
      <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 bg-black/85 backdrop-blur-md px-4 py-3 rounded-full border border-white/10 shadow-2xl shadow-black/50 select-none transition-all duration-300 hover:scale-105 hover:border-white/20">
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
        <span className="text-xs font-heading font-black tracking-wider uppercase text-white">
          Visual Edit
        </span>
        <button
          onClick={() => setShowEditHints(!showEditHints)}
          aria-label="Toggle visual edit highlights"
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
            showEditHints ? "bg-[#eb242a]" : "bg-white/10"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${
              showEditHints ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </main>
  );
}
