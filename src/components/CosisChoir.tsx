"use client";

import { motion } from "framer-motion";
import { MusicNotes } from "@solar-icons/react";
import { ArrowRight } from "lucide-react";

export default function CosisChoir() {
  return (
    <section
      id="cosis-choir"
      className="py-24 bg-[#F7F7F7] relative overflow-hidden"
    >
      <div className="container mx-auto px-8 relative z-10 flex flex-col xl:flex-row items-center gap-16 xl:gap-10">
        {/* LEFT COLUMN: Content */}
        <div className="flex-1 w-full max-w-2xl flex flex-col items-start">
          <div className="badge-white mb-8 border border-gray-100">
            <MusicNotes className="w-4 h-4 text-green-500 shrink-0" />
            Community & Connection
          </div>

          <h2 className="text-4xl lg:text-[48px] font-heading font-black tracking-tight text-[#131515] mb-8 leading-[1.1]">
            Join the Chorus:
            <br />
            Cosi's Choir
          </h2>

          <div className="space-y-6 mb-10 max-w-lg">
            <p className="text-[#131515]/90 font-body text-[18px] leading-relaxed">
              <span className="font-bold">More Than Just Music: </span>
              Whether you sing in the shower, the car, or on a stage—this is for
              you! Cosi’s Choir is all about fun, friendship, and belting out
              your favourites hits together.
            </p>
            <p className="text-[#131515]/90 font-body text-[18px] leading-relaxed">
              <span className="font-bold">No Stress, Just Fun: </span>
              There are no auditions and you don't need to read music. Just
              bring your voice and your passion. It’s about feeling the
              incredible energy of a community uniting in song.
            </p>
            <p className="text-[#131515]/90 font-body text-[18px] leading-relaxed">
              <span className="font-bold">Get Involved: </span>
              We meet up to share a laugh and sing great tunes in a relaxed
              setting. It’s the best way to make new friends and connect through
              music.
            </p>
          </div>

          <a href="#" className="btn-primary px-8">
            <span>
              <span className="hidden sm:inline">Join </span>Community
            </span>{" "}
            <ArrowRight className="btn-icon shrink-0" />
          </a>
        </div>

        {/* RIGHT COLUMN: Illustration */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[650px]"
          >
            <img
              src="/assets/cosichoir.png"
              alt="Cosis Choir Graphic"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
