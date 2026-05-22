"use client";

import { motion } from "framer-motion";
import { Award, Ticket, Percent, Sparkles } from "lucide-react";

export default function FriendsWithBenefits() {
  // Static values with fixed link, price, images and content
  const badgeText = "Special Offer";
  const titleLine1 = "Friends With";
  const titleLine2 = "Benefits";
  const subtext = "Join the exclusive FWB membership for local deals, priority access, and your ultimate SA guide.";
  const buttonText = "JOIN NOW";
  const buttonLink = "https://cosisfriendswithbenefits.com.au";
  const price = "$10";
  const backgroundImage = "/uploads/assets/FwB.png";
  const cosiImage = "/uploads/assets/014A1782_1.png";
  const card1Title = "Instant Rewards";
  const card1Description = "Grab \"Buy 1 Get 1 Free\" drinks and huge discounts at SA’s best pubs, wineries, and shops.";
  const card2Title = "Be First in Line";
  const card2Description = "Get priority booking for Cosi’s Choir and special events before they sell out!";

  return (
    <section
      id="fwb"
      className="pt-20 pb-0 lg:pt-24 lg:pb-0 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >

      <div className="container mx-auto px-8 relative z-10 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row items-stretch gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="flex-1 w-full max-w-2xl flex flex-col justify-center items-start text-left pb-16 lg:pb-24 pt-8">
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
          <div className="flex-1 w-full lg:max-w-[780px] flex justify-center lg:justify-end items-end relative min-h-[480px] lg:min-h-[580px]">
            <div className="relative w-full max-w-[650px] lg:max-w-[754px] z-10 select-none">
              
              {/* Cutout Image of Cosi */}
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
                  className="w-full h-auto object-contain block pointer-events-none"
                />
              </motion.div>

              {/* Floating Card 1: Instant Rewards */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
                className="absolute top-[15%] -left-4 sm:left-[-15%] md:left-[-20%] lg:left-[-24.4%] bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-2xl w-[280px] sm:w-[320px] lg:w-[369px] z-20 text-left hover:scale-[1.05] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="bg-[#00C853] w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20">
                    <Percent className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-[#101828] text-[18px]">
                    {card1Title}
                  </h4>
                </div>
                <p className="font-body text-[14px] sm:text-[15px] font-medium text-[#101828]/80 leading-normal">
                  {card1Description}
                </p>
              </motion.div>

              {/* Floating Card 2: Be First in Line */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
                className="absolute top-[60%] -right-4 sm:-right-8 md:left-[2%] lg:left-[5%] left-auto md:right-auto bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-2xl w-[280px] sm:w-[320px] lg:w-[369px] z-20 text-left hover:scale-[1.05] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="bg-[#FF6D00] w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-[#101828] text-[18px]">
                    {card2Title}
                  </h4>
                </div>
                <p className="font-body text-[14px] sm:text-[15px] font-medium text-[#101828]/80 leading-normal">
                  {card2Description}
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

