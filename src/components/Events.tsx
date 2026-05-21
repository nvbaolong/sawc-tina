"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  AltArrowLeft,
  AltArrowRight,
  MapPoint,
} from "@solar-icons/react";
import type { Event } from "@/types";

const STATIC_EVENTS = [
  {
    _id: "1",
    title: "Cosi's Choir - Adelaide Hills",
    venue: "Mount Barker Town Hall",
    date: "2024-04-14T19:00:00Z",
    time: "7:00 PM - 9:30 PM",
    price: "$25",
  },
  {
    _id: "2",
    title: "Cows for Cambodia Fundraiser Gala",
    venue: "Adelaide Convention Centre",
    date: "2024-05-28T18:30:00Z",
    time: "6:30 PM - 11:00 PM",
    price: "$150",
  },
  {
    _id: "3",
    title: "South Aussie with Cosi Live Show",
    venue: "Thebarton Theatre",
    date: "2024-06-10T20:00:00Z",
    time: "8:00 PM - 10:00 PM",
    price: "$45",
  },
  {
    _id: "4",
    title: "Cosi's Choir - Barossa Valley",
    venue: "Tanunda Community Club",
    date: "2024-07-22T19:00:00Z",
    time: "7:00 PM - 9:30 PM",
    price: "$25",
  },
  {
    _id: "5",
    title: "Meet & Greet - Regional Tour",
    venue: "Port Lincoln Hotel",
    date: "2024-08-05T14:00:00Z",
    time: "2:00 PM - 4:00 PM",
    price: "Free",
  },
];

interface EventsProps {
  initialEvents?: Event[];
}

// Reusable event card
function EventCard({ event, noShadow }: { event: Event; noShadow?: boolean }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    };
  };

  const { day, month } = formatDate(event.date);

  return (
    <a
      href={event.bookingUrl || "#"}
      target={event.bookingUrl ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`flex flex-col bg-[#FCFCFD] rounded-[24px] overflow-hidden border border-[#E6E8EC]/50 transition-all duration-500 h-full group/card ${
        noShadow
          ? ""
          : "shadow-[5px_20px_40px_0px_rgba(0,0,0,0.1)] hover:shadow-[5px_30px_50px_0px_rgba(0,0,0,0.15)]"
      }`}
    >
      {/* Top Image Section */}
      <div className="relative h-[235px] w-full bg-slate-200 overflow-hidden">
        {event.coverImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={event.coverImage}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
        )}

        {/* Top Overlays */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {event.type ? (
            <div className="bg-[#F7F7F7] px-3 py-1.5 rounded-full text-[14px] font-medium text-[#131515] shadow-sm">
              {event.type}
            </div>
          ) : (
            <div></div>
          )}

          <div className="bg-white border border-[#12a70a] rounded-[12px] w-[58px] h-[58px] flex flex-col items-center justify-center shadow-[0px_10px_25px_0px_rgba(16,124,90,0.1)]">
            <div className="text-[12px] font-black text-[#494d4d] tracking-wider uppercase leading-none mb-0.5">
              {month}
            </div>
            <div className="text-[24px] font-black text-[#131515] leading-none">
              {day}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-[16px] font-bold text-[#131515] leading-tight mb-2 group-hover/card:text-primary transition-colors uppercase">
            {event.title}
          </h3>

          <div className="flex items-center gap-2 text-[#494d4d] font-normal text-[12px]">
            <MapPoint className="w-4 h-4 text-primary shrink-0" />
            {event.venue}
          </div>
        </div>

        <p className="text-[#131515]/90 text-[12px] font-normal leading-relaxed mb-6 flex-1 line-clamp-2">
          {event.shortDescription ||
            "'RIDING OUT THE DROUGHT' SA's Largest Horse Trail Ride Event"}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-[22px] font-bold text-[#23262F]">
            {event.price || "$0"}
          </span>

          <div className="flex items-center gap-2 text-[#eb242a] font-bold text-[18px] transition-all uppercase group/btn">
            BOOK NOW
            <AltArrowRight className="w-5 h-5 transform group-hover/card:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </a>
  );
}

// Empty state illustration
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <svg
        className="w-40 h-40 mb-6 text-gray-200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="80" fill="#F7F7F7" />
        <rect x="55" y="65" width="90" height="70" rx="10" fill="#E8E8E8" />
        <rect x="65" y="55" width="70" height="12" rx="4" fill="#D5D5D5" />
        <circle cx="100" cy="100" r="18" fill="#D5D5D5" />
        <path
          d="M93 100 L100 107 L115 92"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="70" y="122" width="60" height="6" rx="3" fill="#E8E8E8" />
        <rect x="80" y="133" width="40" height="4" rx="2" fill="#EBEBEB" />
      </svg>
      <h3 className="text-2xl font-heading font-black text-[#131515] mb-3">
        No Upcoming Events
      </h3>
      <p className="text-[#494D4D] font-body text-[16px] max-w-sm">
        Stay tuned! New South Aussie with Cosi events will be announced soon.
        Check back later or follow us on social media.
      </p>
    </div>
  );
}

export default function Events({ initialEvents }: EventsProps) {
  // Use CMS events if available; otherwise fall back to static data
  // Pass empty array to force empty state for testing: initialEvents=[]
  const eventsList = initialEvents !== undefined
    ? initialEvents
    : (STATIC_EVENTS as any as Event[]);

  const hasEvents = eventsList.length > 0;
  const showSlider = eventsList.length > 3;

  // Mobile scroll tracking
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0);

  const handleMobileScroll = useCallback(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / eventsList.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setMobileScrollIndex(Math.min(index, eventsList.length - 1));
  }, [eventsList.length]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(eventsList.length / itemsPerPage);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const visibleEvents = eventsList.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section
      id="book-events"
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-8 max-w-[1240px]">
        {/* Header Area */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="badge-white border border-gray-100">
            <Calendar className="w-4 h-4 text-[#12a70a] shrink-0" />
            Live Event
          </div>
          <h2 className="text-4xl lg:text-[48px] font-heading font-black tracking-tight text-[#131515] leading-[1.1] max-w-2xl px-4">
            Upcoming South Aussie with Cosi Event
          </h2>
          <p className="text-[#494D4D] font-body text-[18px] max-w-xl">
            Don't miss out — grab your tickets before they're gone.
          </p>
        </div>

        {/* Empty State */}
        {!hasEvents && <EmptyState />}

        {/* Events — Mobile horizontal scroll (1 card) */}
        {hasEvents && (
          <>
            {/* MOBILE: horizontal snap scroll */}
            <div className="md:hidden -mx-6 px-6">
              <div
                ref={mobileScrollRef}
                onScroll={handleMobileScroll}
                className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {eventsList.map((event) => (
                  <div
                    key={event._sys?.filename || event.title}
                    className="shrink-0 w-[85vw] snap-center"
                  >
                    <EventCard event={event} noShadow />
                  </div>
                ))}
              </div>

              {/* Mobile dot indicators — show only if more than 1 event */}
              {eventsList.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  {eventsList.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to event ${i + 1}`}
                      onClick={() => {
                        const el = mobileScrollRef.current;
                        if (!el) return;
                        const cardWidth = el.scrollWidth / eventsList.length;
                        el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        mobileScrollIndex === i
                          ? "w-8 bg-primary"
                          : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* DESKTOP (md+): paginated grid with optional slider */}
            <div className="hidden md:block relative group/events-list">
              {/* Side Navigation Buttons — only if > 3 items */}
              {showSlider && (
                <>
                  <button
                    onClick={prevPage}
                    className="hidden xl:flex absolute -left-10 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white transition-all border border-gray-200 shadow-lg z-10 transform hover:scale-110 active:scale-95"
                    aria-label="Previous events"
                  >
                    <AltArrowLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextPage}
                    className="hidden xl:flex absolute -right-10 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white transition-all border border-gray-200 shadow-lg z-10 transform hover:scale-110 active:scale-95"
                    aria-label="Next events"
                  >
                    <AltArrowRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap justify-center gap-8"
                >
                  {visibleEvents.map((event, index) => (
                    <motion.div
                      key={event._sys?.filename || event.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] max-w-[380px]"
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination dots + mobile arrows — only if > 3 items */}
              {showSlider && (
                <div className="flex items-center justify-center gap-6 mt-12">
                  <button
                    onClick={prevPage}
                    className="xl:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white transition-all border border-gray-200 shadow-sm"
                    aria-label="Previous events"
                  >
                    <AltArrowLeft className="w-6 h-6" />
                  </button>

                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentPage === i
                            ? "w-8 bg-primary"
                            : "w-2 bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextPage}
                    className="xl:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white transition-all border border-gray-200 shadow-sm"
                    aria-label="Next events"
                  >
                    <AltArrowRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
