"use client";

import { motion } from "framer-motion";
import { Award, Ticket, Percent, Sparkles } from "lucide-react";

export default function FriendsWithBenefits() {
  // Static values with fixed link, price, images and content
  const badgeText = "Premium Membership";
  const titleLine1 = "Friends With";
  const titleLine2 = "Benefits";
  const subtext = "Join the exclusive FWB membership for local deals, priority access, and your ultimate SA guide.";
  const buttonText = "JOIN NOW";
  const buttonLink = "https://cosisfriendswithbenefits.com.au";
  const price = "$10";
  const backgroundImage = "/assets/FwB_optimized.jpg";
  const cosiImage = "/assets/014A1782_1_optimized.png";
  const card1Title = "Instant Rewards";
  const card1Description = "Redeem an offer from one of over 100 retail partners through the app.";
  const card2Title = "Be First in Line";
  const card2Description = "Get priority booking for Cosi’s Choir and special events before they sell out!";

  return (
    <section
      id="fwb"
      className="pt-20 pb-0 lg:pt-24 lg:pb-0 relative overflow-hidden"
    >
      {/* Background Image absolute container for direct crisp loading */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={backgroundImage}
          alt="Friends With Benefits Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-8 relative z-10 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-24">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="flex-none lg:flex-1 w-full max-w-2xl flex flex-col justify-center items-start text-left pb-0 lg:pb-24 pt-4 lg:pt-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="badge-white mb-6 border border-sky-100 flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[#101828]">{badgeText}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[72px] font-heading font-black tracking-tight text-[#101828] mb-8 leading-[1.05]"
            >
              {titleLine1}
              <br />
              {titleLine2}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#101828]/80 font-body text-[18px] md:text-[20px] font-medium leading-relaxed mb-10 max-w-[500px]"
            >
              {subtext}
            </motion.p>

            {/* CTA & Price */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full"
            >
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 flex items-center justify-center gap-3 shrink-0"
              >
                <span>{buttonText}</span>
                <Ticket className="w-5 h-5 shrink-0" />
              </a>

              <div className="font-heading text-lg md:text-[22px] font-bold text-[#101828] leading-none sm:pt-1">
                for just <span className="text-primary font-black">{price}</span>/month
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Interactive Image + Floating Cards */}
          <div className="flex-none lg:flex-1 w-full lg:max-w-[1100px] flex flex-col lg:flex-row justify-center lg:justify-end items-end relative">

            {/* Mobile-only: Cards stacked ABOVE the character */}
            <div className="flex lg:hidden flex-col gap-4 w-full mb-4 z-20">
              {/* Mobile Card 1 */}
              <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-2xl w-full text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-[#00C853] w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20">
                    <Percent className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-[#101828] text-[16px]">{card1Title}</h4>
                </div>
                <p className="font-body text-[13px] font-medium text-[#101828]/80 leading-normal">{card1Description}</p>
              </div>
              {/* Mobile Card 2 */}
              <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-2xl w-full text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-[#FF6D00] w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-[#101828] text-[16px]">{card2Title}</h4>
                </div>
                <p className="font-body text-[13px] font-medium text-[#101828]/80 leading-normal">{card2Description}</p>
              </div>
            </div>

            {/* Character image — bigger on all sizes */}
            <div className="relative w-full max-w-[780px] lg:max-w-[1100px] z-10 select-none">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
              >
                <img
                  src={cosiImage}
                  alt="Cosi Costello Smiling"
                  loading="eager"
                  className="w-full h-auto object-contain block pointer-events-none"
                />
              </motion.div>

              {/* Desktop-only floating Card 1: Instant Rewards — shifted up to top-[2%] left-[-10%] */}
              <div className="hidden lg:block absolute top-[2%] left-[-10%] bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-2xl w-[369px] z-20 text-left hover:scale-[1.05] transition-all duration-300">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="bg-[#00C853] w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20">
                    <Percent className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-[#101828] text-[18px]">{card1Title}</h4>
                </div>
                <p className="font-body text-[15px] font-medium text-[#101828]/80 leading-normal">{card1Description}</p>
              </div>

              {/* Desktop-only floating Card 2: Be First in Line — shifted down to top-[36%] left-[-2%] */}
              <div className="hidden lg:block absolute top-[36%] left-[-2%] bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-2xl w-[369px] z-20 text-left hover:scale-[1.05] transition-all duration-300">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="bg-[#FF6D00] w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-[#101828] text-[18px]">{card2Title}</h4>
                </div>
                <p className="font-body text-[15px] font-medium text-[#101828]/80 leading-normal">{card2Description}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

