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
import { getSanityClient } from "@/sanity/lib/preview";

// export const revalidate = 0 means next.js fetches dynamic fresh data on every page hit, satisfying <1s update requirement
export const revalidate = 0;

export default async function Home() {
  let heroData: HeroContent | null = null;
  let tvShows: TvShow[] = [];
  let events: Event[] = [];

  try {
    const sanityClient = await getSanityClient();
    const [sanityHero, sanityTvShows, sanityEvents] = await Promise.all([
      sanityClient.fetch<HeroContent | null>(`*[_type == "hero"][0]`),
      sanityClient.fetch<TvShow[]>(`*[_type == "tvShow"] | order(orderRank asc, airDate desc)`),
      sanityClient.fetch<Event[]>(`*[_type == "event"] | order(orderRank asc, date asc)`),
    ]);
    
    heroData = sanityHero;
    tvShows = sanityTvShows || [];
    events = sanityEvents || [];
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
  }

  // Fallback defaults if Sanity is empty/not configured yet
  const finalHeroData: HeroContent = heroData || {
    badgeText: "Australia's Favourite SA Show",
    mainHeading: "G'Day, South Australia!",
    subtext: "Join Cosi on a mission to showcase the best of South Australia. Experience adventure, travel, and local stories with SAWC.",
    backgroundImage: "/assets/FwB.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero initialData={finalHeroData} />
      <BestBits initialTvShows={tvShows} />
      <FriendsWithBenefits />
      <CowsForCambodia />
      <CosisChoir />
      <Events initialEvents={events} />
      <Contact />
      <Footer />
    </main>
  );
}
