"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Building2, Heart, Map, ArrowRight } from "lucide-react";

export default function CowsForCambodia() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="cows-for-cambodia"
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-8 relative z-10 flex flex-col xl:flex-row items-center gap-10 xl:gap-24">
        
        {/* MOBILE/TABLET HEADER (Hidden on desktop) */}
        <div className="flex xl:hidden flex-col items-start w-full">
          <div className="badge-white mb-6 border border-gray-100">
            <Heart className="w-4 h-4 text-green-500 shrink-0" />
            Travel with Heart
          </div>

          <h2 className="text-4xl lg:text-[48px] font-heading font-black tracking-tight text-[#131515] leading-[1.1]">
            The Cows for
            <br />
            Cambodia Experience
          </h2>
        </div>

        {/* LEFT COLUMN: Video & Features */}
        <div className="flex-1 w-full max-w-3xl flex flex-col gap-8">
          {/* Video Container */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-100 group">
            {!isPlaying ? (
              <>
                <img
                  src="/assets/cows-thumbnail.png"
                  alt="Cows for Cambodia Video Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="w-24 h-24 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-8 h-8 text-black ml-1 opacity-80"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <iframe
                className="w-full h-full absolute inset-0"
                title="vimeo-player"
                src="https://player.vimeo.com/video/1043425453?h=75d270250a&autoplay=1"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
              />
            )}
          </div>

          {/* Feature Pills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 max-w-[500px]">
            <div className="bg-[#F7F7F7] flex items-center gap-3 p-2 pr-6 rounded-full border border-gray-100 w-full max-w-[240px] shadow-sm">
              <div className="bg-[#FF5A00] w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md shadow-orange-500/10">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-[14px] text-[#131515] whitespace-nowrap">
                14-Day Guided Journey
              </span>
            </div>

            <div className="bg-[#F7F7F7] flex items-center gap-3 p-2 pr-6 rounded-full border border-gray-100 w-full max-w-[240px] shadow-sm">
              <div className="bg-[#0055FF] w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md shadow-blue-500/10">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-[14px] text-[#131515] whitespace-nowrap">
                All Accommodation
              </span>
            </div>

            <div className="bg-[#F7F7F7] flex items-center gap-3 p-2 pr-6 rounded-full border border-gray-100 w-full max-w-[240px] shadow-sm">
              <div className="bg-[#00C853] w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md shadow-green-500/10">
                <Heart className="w-4 h-4 text-white fill-white shrink-0 stroke-white" />
              </div>
              <span className="font-bold text-[14px] text-[#131515] whitespace-nowrap">
                Charity Contribution
              </span>
            </div>

            <div className="bg-[#F7F7F7] flex items-center gap-3 p-2 pr-6 rounded-full border border-gray-100 w-full max-w-[240px] shadow-sm">
              <div className="bg-[#FFA000] w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md shadow-yellow-500/10">
                <Map className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-[14px] text-[#131515] whitespace-nowrap">
                Expert Local Guides
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="flex-1 w-full max-w-2xl flex flex-col items-start xl:pt-2">
          
          {/* DESKTOP HEADER (Hidden on mobile/tablet) */}
          <div className="hidden xl:flex badge-white mb-8 border border-gray-100">
            <Heart className="w-4 h-4 text-green-500 shrink-0" />
            Travel with Heart
          </div>

          <h2 className="hidden xl:block text-4xl lg:text-[48px] font-heading font-black tracking-tight text-[#131515] mb-8 leading-[1.1]">
            The Cows for
            <br />
            Cambodia Experience
          </h2>

          <p className="text-[#131515]/90 font-body text-[18px] font-medium leading-relaxed mb-10 text-left max-w-[540px]">
            Explore the heart of Cambodia, one of the world's poorest nations,
            where a significant portion of the population resides in rural
            areas. Many families aspire to own a cow, yet with prices around
            $650 USD, 80% find this dream out of reach. Join us in supporting
            Cows for Cambodia, a unique initiative that functions like a "COW
            BANK." We provide a pregnant cow to a family, who nurtures it until
            it gives birth. They keep the calf, while we retrieve the mother to
            assist another family in need. This program offers a "hand up"
            rather than a simple handout, aiming to break the cycle of poverty.
          </p>

          <div className="flex items-center gap-6">
            <div className="w-[60px] h-[60px] shrink-0">
              <img
                src="/assets/cows-for-cambodia-logo.svg"
                alt="Cows for Cambodia"
                className="w-full h-full object-contain"
              />
            </div>
            <a
              href="https://www.cowsforcambodia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8"
            >
              <span>
                <span className="hidden sm:inline">Find Out </span>More
              </span>{" "}
              <ArrowRight className="btn-icon shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
