"use client";

import { useState, useCallback } from "react";
import {
  Play,
  AltArrowLeft,
  AltArrowRight,
  Tv,
  Plain,
} from "@solar-icons/react";
import { motion } from "framer-motion";
import type { TvShow } from "@/types";

const STATIC_EPISODES = [
  {
    _id: "1",
    title: "Chateau Tanunda & Port Adelaide",
    description:
      "The gang take a trip to Chateau Tanunda, and travel to Port Adelaide to have a beer in the first pub to be owned by a woman.",
    episodeLabel: "EP 01",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/fyUs3Kqhe-cAKdBQ3n5EYQ/1200x800.webp",
    videoUrl: "#",
    category: "Season 11",
  },
  {
    _id: "2",
    title: "Adelaide Hills & Paracombe",
    description:
      "The gang head to the Adelaide Hills, where they come across a funky structure, ride along a 17 kilometre bike trail, and try a special pizza in Paracombe.",
    episodeLabel: "EP 02",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/IsKzELvW6NBPCV-8ffoSFA/1200x800.webp",
    videoUrl: "#",
    category: "Season 11",
  },
  {
    _id: "3",
    title: "Travelling in the South",
    description:
      "Cosi talks about the places he stays when he's travelling in the south, a region that he only recently discovered.",
    episodeLabel: "EP 04",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/td3qaBqMtWkQQsbR0G8z1Q/1200x800.webp",
    videoUrl: "#",
    category: "Season 11",
  },
  {
    _id: "4",
    title: "Hallett Cove & Boat Chef Cafe",
    description:
      "An exploration of Hallett Cove Conservation Park; the Boat Chef Cafe; the garden families can visit for free; the giant Santa needs to help to be put on display in Adelaide.",
    episodeLabel: "EP 13",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/XvOr42w7jp9WqHRfz2FZ5Q/1200x800.webp",
    videoUrl: "#",
    category: "Season 11",
  },
  {
    _id: "5",
    title: "Adelaide Festival Centre",
    description:
      "Cosi explores the Adelaide Festival Centre, and learns about the Children's Artspace; The Bend race track.",
    episodeLabel: "EP 14",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/JbWnvmtkw2S7v0VyXf4P_Q/1200x800.webp",
    videoUrl: "#",
    category: "Season 11",
  },
  {
    _id: "6",
    title: "Adelaide Botanical Gardens",
    description:
      "Cosi experiences illuminate at the Adelaide Botanical Gardens; a young girl takes her mum to a night out ice skating in Adelaide.",
    episodeLabel: "EP 15",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/afBOGMsxR_GWU7L5AgzQzQ/1200x800.webp",
    videoUrl: "#",
    category: "Season 11",
  },
  {
    _id: "7",
    title: "Marina Pier & Mount Lofty",
    description:
      "Cosi enjoys a feast at the Marina Pier; a winery in the Adelaide Hills that welcomes pets; retirees enjoy life at Mount Lofty Botanic Garden.",
    episodeLabel: "EP 16",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/OajoB5Oc-Qb4WLzGRaKwaw/1200x800.webp",
    videoUrl: "#",
    category: "Season 11",
  },
  {
    _id: "8",
    title: "Budget South Australia",
    description:
      "Cosi presents a variety of his preferred activities in South Australia, accommodating various budgets and interests.",
    episodeLabel: "EP 17",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/u5m8GLush3HJ1uLVFvcRbg/1200x800.webp",
    videoUrl: "#",
    category: "Season 11",
  },
  {
    _id: "9",
    title: "Travel Across SA",
    description:
      "Travel across South Australia and explore different ways to travel in the region with Andrew 'Cosi' Costello.",
    episodeLabel: "EP 18",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/ASfzXZC7Me5R_8Cz-IMjjg/1200x800.webp",
    videoUrl: "#",
    category: "Season 11",
  },
  {
    _id: "10",
    title: "Family Activity in Peterborough",
    description:
      "Cosi checks out a cheap activity for the whole family in Peterborough, and shares why its important what goes into the green bin.",
    episodeLabel: "EP 19",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/eZhqZwVmdZuFPYSLzNiSUQ/1200x800.webp",
    videoUrl: "#",
    category: "Season 11",
  },
];

import { urlFor } from "@/sanity/lib/image";

interface BestBitsProps {
  initialTvShows?: TvShow[];
}

export default function BestBits({ initialTvShows }: BestBitsProps) {
  const showsList = initialTvShows?.length
    ? initialTvShows
    : (STATIC_EPISODES as any as TvShow[]);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => prev - 1);
  }, []);

  const realActiveIndex =
    ((activeIndex % showsList.length) + showsList.length) % showsList.length;

  const getCardStyles = (index: number) => {
    let offset = index - realActiveIndex;

    // Shortest distance for infinite circular looping
    if (offset > Math.floor(showsList.length / 2)) {
      offset -= showsList.length;
    } else if (offset < -Math.floor(showsList.length / 2)) {
      offset += showsList.length;
    }

    const absOffset = Math.abs(offset);

    if (absOffset > 2)
      return {
        opacity: 0,
        pointerEvents: "none",
        transform: "scale(0.5)",
        zIndex: 0,
      };

    const translateX = offset * 260; // Distance between cards
    const rotateY = offset * -35; // 3D rotation angle
    const scale = 1 - absOffset * 0.15; // Scale down elements further away
    const zIndex = 50 - absOffset * 10;
    const opacity = 1 - absOffset * 0.2;

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevSlide();
    } else if (info.offset.x < -swipeThreshold) {
      nextSlide();
    }
  };

  return (
    <section
      id="our-tv-show"
      className="py-24 bg-[#F2F2F2] overflow-hidden flex flex-col items-center justify-center select-none"
    >
      <div className="container mx-auto px-8 relative z-10 text-center mb-16">
        <div className="badge-white mb-6">
          <Tv className="w-4 h-4 text-primary shrink-0" />
          Our TV Show
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-black mb-4 tracking-tight text-black leading-[1.1]">
          Watch The Best Bits <br className="hidden md:block" /> of South Aussie
          With Cosi!
        </h2>
        <p className="text-[#131515] max-w-2xl mx-auto text-lg leading-relaxed font-body font-medium">
          <span className="font-bold">400,000+</span> Aussies watch us every
          single week!
        </p>
      </div>

      {/* 3D COVERFLOW SLIDER */}
      <div
        className="relative w-full h-[550px] flex items-center justify-center -mt-8"
        style={{ perspective: "1200px" }}
      >
        {/* Left Blur Overlay */}
        <div
          className="absolute left-[-20px] top-[-20px] bottom-[-20px] w-[15%] md:w-[25%] z-40 pointer-events-none"
          style={{ background: "#F2F2F2", filter: "blur(40px)" }}
        />

        {/* Right Blur Overlay */}
        <div
          className="absolute right-[-20px] top-[-20px] bottom-[-20px] w-[15%] md:w-[25%] z-40 pointer-events-none"
          style={{ background: "#F2F2F2", filter: "blur(40px)" }}
        />

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-[5%] md:left-[15%] lg:left-[18%] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-black hover:text-white transition-all border border-gray-300 shadow-xl z-50 transform hover:scale-110 active:scale-95"
          aria-label="Previous slide"
        >
          <AltArrowLeft className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-[5%] md:right-[15%] lg:right-[18%] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-black hover:text-white transition-all border border-gray-300 shadow-xl z-50 transform hover:scale-110 active:scale-95"
          aria-label="Next slide"
        >
          <AltArrowRight className="w-6 h-6" />
        </button>

        <motion.div
          className="relative w-full max-w-6xl flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
        >
          {showsList.map((show, index) => {
            const styles = getCardStyles(index);
            const isActive = index === realActiveIndex;

            // Support both Sanity image references and fallback raw string paths
            let imageUrl = "";
            if (show.image) {
              if (typeof show.image === "string") {
                imageUrl = show.image;
              } else {
                imageUrl = urlFor(show.image)?.url() || "";
              }
            }

            return (
              <div
                key={show._id || show.title}
                style={styles as React.CSSProperties}
                className={`absolute w-[280px] md:w-[350px] aspect-[3/4.2] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/20 transform-gpu`}
                onClick={() => {
                  let diff = index - realActiveIndex;
                  if (diff > Math.floor(showsList.length / 2))
                    diff -= showsList.length;
                  else if (diff < -Math.floor(showsList.length / 2))
                    diff += showsList.length;
                  if (diff !== 0) setActiveIndex((prev) => prev + diff);
                }}
              >
                {/* Card Background Image */}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={show.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isActive ? "scale-105" : "scale-110 blur-[2px] grayscale-[0.3]"}`}
                  />
                )}

                {/* Content Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40"}`}
                >
                  <div
                    className={`flex items-center justify-between gap-4 mb-2 transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    <span className="text-[16px] text-white font-heading font-black tracking-tight text-left line-clamp-1 flex-1">
                      {show.title}
                    </span>
                    <span className="text-[13px] text-white/80 font-body font-medium tracking-wider shrink-0">
                      {show.airDate
                        ? new Date(show.airDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "2026"}
                    </span>
                  </div>

                  <p
                    className={`text-[#E5E5E5] font-body text-xs font-medium leading-[1.6] mb-6 line-clamp-3 transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    {show.description}
                  </p>

                  <div
                    className={`w-full transition-all duration-700 delay-100 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          show.videoUrl && window.open(show.videoUrl, "_blank")
                        }
                        className="inline-flex h-[40px] items-center gap-[6px] bg-[#E6001E] rounded-[4px] pr-[24px] relative overflow-hidden group hover:opacity-90 transition-opacity"
                      >
                        <div className="relative shrink-0 w-[52px] h-[40px] z-10">
                          <div className="absolute h-[40px] left-0 top-0 w-[48.5px]">
                            <svg
                              width="48.5"
                              height="40"
                              viewBox="0 0 48.5 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full h-full"
                            >
                              <path
                                d="M0 0.000194788L48.5 0L25.5 40.0002H0V0.000194788Z"
                                fill="#D2001A"
                              />
                              <path
                                d="M24.5 19.1342C25.1667 19.5191 25.1667 20.4813 24.5 20.8662L15.5 26.0624C14.8333 26.4473 14 25.9661 14 25.1963L14 14.804C14 14.0342 14.8333 13.5531 15.5 13.938L24.5 19.1342Z"
                                fill="#D9D9D9"
                              />
                            </svg>
                          </div>
                        </div>
                        <span className="font-heading font-bold text-white text-[18px] leading-none relative z-10">
                          Play Now
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reflection/Glare effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Controls (Dots only) */}
      <div className="flex items-center gap-6 mt-8 z-50">
        {/* Dots */}
        <div className="flex gap-2">
          {showsList.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                let diff = i - realActiveIndex;
                if (diff > Math.floor(showsList.length / 2))
                  diff -= showsList.length;
                else if (diff < -Math.floor(showsList.length / 2))
                  diff += showsList.length;
                setActiveIndex((prev) => prev + diff);
              }}
              className={`h-2 transition-all duration-500 rounded-full ${i === realActiveIndex ? "w-8 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 z-50 flex items-center justify-center">
        <a
          href="https://7plus.com.au/south-aussie-with-cosi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[12px] bg-[#EB242A] text-white px-[24px] sm:px-[34px] py-[16px] rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/20"
        >
          <span className="font-heading font-bold text-[16px] sm:text-[18px] tracking-tight">
            <span className="hidden sm:inline">Discover All Episodes </span>
            <span className="sm:hidden">Watch </span>on
          </span>
          <svg
            className="w-[33px] h-[20px] fill-white shrink-0"
            viewBox="0 0 566.6 363.2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m213.2 363.2 134.3-234.4-77.3-128.8-212.6 363.2zm-213.2-363.2 75.8 128.7h108.8l75.2-128.7zm421.4 53.1v75.6h-53.1l-38.6 67.4h91.7v75.7h69.1v-75.7h76.1v-67.4h-76.1v-75.6z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
