"use client";

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
      <Hero initialData={heroData?.hero as HeroContent} />
      <BestBits initialTvShows={sortedTvShows} />
      <FriendsWithBenefits />
      <CowsForCambodia />
      <CosisChoir />
      <Events initialEvents={sortedEvents} />
      <Contact />
      <Footer />
    </main>
  );
}
