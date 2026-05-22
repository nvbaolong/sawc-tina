import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BestBits from "@/components/BestBits";
import FriendsWithBenefits from "@/components/FriendsWithBenefits";
import CowsForCambodia from "@/components/CowsForCambodia";
import CosisChoir from "@/components/CosisChoir";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { promises as fs } from "fs";
import path from "path";
import type { HeroContent, TvShow, Event } from "@/types";

export const revalidate = 0;

async function readJsonDir<T>(dir: string): Promise<T[]> {
  const dirPath = path.join(process.cwd(), dir);
  try {
    const files = await fs.readdir(dirPath);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    const items = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await fs.readFile(path.join(dirPath, file), "utf-8");
        return { ...JSON.parse(content), _sys: { filename: file } };
      })
    );
    return items.sort(
      (a: any, b: any) => (a.orderRank ?? 999) - (b.orderRank ?? 999)
    ) as T[];
  } catch {
    return [];
  }
}

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), filePath),
      "utf-8"
    );
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

export default async function Home() {
  const [heroData, tvShows, events] = await Promise.all([
    readJson<HeroContent>("content/hero/index.json"),
    readJsonDir<TvShow>("content/tv-shows"),
    readJsonDir<Event>("content/events"),
  ]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero initialData={heroData} />
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
