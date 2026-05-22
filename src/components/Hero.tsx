"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowRightDown,
  VerifiedCheck,
  CloseCircle,
} from "@solar-icons/react";

import { urlFor } from "@/sanity/lib/image";
import type { HeroContent } from "@/types";

interface HeroProps {
  initialData?: HeroContent | null;
}

export default function Hero({ initialData }: HeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Default values supporting both raw local strings and Sanity image references
  let bgImage = "/assets/bg_optimized.jpg";
  if (initialData?.backgroundImage) {
    if (typeof initialData.backgroundImage === "string") {
      if (initialData.backgroundImage === "/assets/bg.png") {
        bgImage = "/assets/bg_optimized.jpg";
      } else {
        bgImage = initialData.backgroundImage;
      }
    } else {
      bgImage = urlFor(initialData.backgroundImage)?.url() || bgImage;
    }
  }

  const badgeText = initialData?.badgeText || "Australia's Favourite SA Show";
  const mainHeading = initialData?.mainHeading || "G'Day, South Australia!";
  const subtext =
    initialData?.subtext ||
    "I’m Cosi, and I’m on a mission to showcase the best of our beautiful state. Experience adventure, travel, and local stories with SAWC.";

  // Handle YouTube URL to Embed URL conversion
  const getEmbedUrl = (url: string) => {
    if (!url) return "https://www.youtube.com/embed/H4VKPO4kXiE?autoplay=1";

    // Simple regex to extract ID from common youtube links
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
      : url;
  };

  const videoEmbedUrl = getEmbedUrl(initialData?.videoUrl || "");

  // Helper to split heading for the <br /> if it matches the default or has a specific pattern
  const renderHeading = (text: string) => {
    if (text === "G'Day, South Australia!") {
      return (
        <>
          G'Day, <br />
          <span className="text-white">South Australia!</span>
        </>
      );
    }
    return text;
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-[65%_center] sm:object-center pointer-events-none"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0.1) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      <div className="container mx-auto px-8 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="badge-white mb-8"
          >
            <VerifiedCheck className="w-4 h-4 text-primary shrink-0" />
            <span className="hidden lg:inline">{badgeText}</span>
            <span className="lg:hidden">Favorite Show</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-black text-white leading-[1.1] tracking-tight mb-8"
          >
            {renderHeading(mainHeading)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 font-body mb-10 leading-relaxed max-w-lg"
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6"
          >
            <button
              onClick={() => setIsVideoOpen(true)}
              className="btn-primary group"
            >
              <Play className="btn-icon fill-current" />
              Watch Video
            </button>
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="hidden lg:block relative h-full min-h-[600px]"></div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-[110]"
            >
              <CloseCircle className="w-10 h-10" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src={videoEmbedUrl}
                title="SAWC Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
