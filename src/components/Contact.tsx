"use client";

import { motion } from "framer-motion";
import { Smartphone, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-[#F7F7F7] relative overflow-hidden"
    >
      <div className="container mx-auto px-8 relative z-10 flex flex-col-reverse xl:flex-row items-center gap-8 xl:gap-24">
        {/* LEFT COLUMN: Visuals (Now at bottom on mobile) */}
        <div className="w-full lg:w-[50%] relative flex flex-col items-center mt-8 xl:mt-0">
          {/* DESKTOP BADGE (Hidden on mobile/tablet) */}
          <div className="hidden xl:flex flex-col items-center mb-8 relative z-30 w-full lg:w-auto">
            <div className="bg-white border border-gray-100 px-6 py-2 rounded-full flex items-center gap-2 shadow-sm">
              <Smartphone className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[14px] font-medium text-[#131515]">
                Contact Us
              </span>
            </div>
          </div>

          <div className="relative flex flex-col items-center w-full">
            <div className="relative z-10 flex flex-col items-center w-full">
              {/* Portrait */}
              <div className="relative w-[calc(100%+4rem)] lg:w-full max-w-none lg:max-w-[1600px] h-auto overflow-hidden -ml-8 lg:ml-0">
                <img
                  src="/assets/contactcosi.png"
                  alt="Cosi"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Form (Now at top on mobile) */}
        <div className="w-full lg:w-[50%] flex flex-col items-center xl:items-start">
          {/* MOBILE/TABLET BADGE (Hidden on desktop) */}
          <div className="flex xl:hidden flex-col items-center mb-8 relative z-30">
            <div className="bg-white border border-gray-100 px-6 py-2 rounded-full flex items-center gap-2 shadow-sm">
              <Smartphone className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[14px] font-medium text-[#131515]">
                Contact Us
              </span>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-8 lg:p-12 xl:p-14 shadow-[0px_8px_20px_0px_rgba(19,21,21,0.05)] border border-gray-100 w-full">
            <h2 className="text-4xl lg:text-[48px] font-heading font-black text-[#131515] mb-10 tracking-tight leading-tight uppercase">
              GET IN TOUCH
            </h2>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#494D4D]">
                    Your name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full bg-[#E8E8E8] border-none rounded-[10px] px-6 py-4 outline-none transition-all font-body text-[#131515] placeholder:text-[#131515]/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#494D4D]">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Topic of your request"
                    className="w-full bg-[#E8E8E8] border-none rounded-[10px] px-6 py-4 outline-none transition-all font-body text-[#131515] placeholder:text-[#131515]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-bold text-[#494D4D]">
                  Email address*
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#E8E8E8] border-none rounded-[10px] px-6 py-4 outline-none transition-all font-body text-[#131515] placeholder:text-[#131515]/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-bold text-[#494D4D]">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full bg-[#E8E8E8] border-none rounded-[10px] px-6 py-4 outline-none transition-all font-body text-[#131515] placeholder:text-[#131515]/50 resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn-primary w-full px-6 sm:px-12 py-4 sm:py-5 rounded-full flex items-center justify-center gap-2 sm:gap-3"
                >
                  <span>
                    Send Message <span className="hidden sm:inline">Now</span>
                  </span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
