"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Tv, Gift, Heart, Music, Calendar, Phone, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const sections = [
      "home",
      "our-tv-show",
      "fwb",
      "cows-for-cambodia",
      "cosis-choir",
      "book-events",
      "contact",
    ];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Block body scroll when mobile menu is open for better UX
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { title: "Home", href: "#home", id: "home", icon: Home },
    { title: "Our TV Show", href: "#our-tv-show", id: "our-tv-show", icon: Tv },
    { title: "Special Offer", href: "#fwb", id: "fwb", icon: Gift },
    { title: "Charity", href: "#cows-for-cambodia", id: "cows-for-cambodia", icon: Heart },
    { title: "Cosi's Choir", href: "#cosis-choir", id: "cosis-choir", icon: Music },
    { title: "Events", href: "#book-events", id: "book-events", icon: Calendar },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md py-3 shadow-lg"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/assets/SAWC logo.svg"
              alt="SAWC Logo"
              width={300}
              height={120}
              className={`w-auto transition-all duration-500 ${
                isScrolled
                  ? "h-[32px] sm:h-[40px] md:h-[50px]"
                  : "h-[50px] sm:h-[70px] md:h-[90px] lg:h-[120px]"
              }`}
              priority
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[14px] lg:text-[16px] transition-all duration-300 tracking-wide py-1.5 font-bold ${
                    isScrolled
                      ? isActive
                        ? "text-[#EB242A]"
                        : "text-[#131515]/80 hover:text-[#EB242A] font-medium"
                      : isActive
                        ? link.id === "home"
                          ? "text-white"
                          : "text-[#EB242A]"
                        : "text-white/85 hover:text-[#EB242A] font-medium"
                  }`}
                >
                  {link.title}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className={`absolute bottom-[-6px] left-0 right-0 h-[3px] rounded-full ${
                        isScrolled
                          ? "bg-[#EB242A]"
                          : link.id === "home"
                            ? "bg-white"
                            : "bg-[#EB242A]"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="#contact"
              className="bg-[#EB242A] text-white flex items-center justify-center gap-2 px-4 sm:px-6 lg:px-[34px] py-2 sm:py-2.5 lg:py-[14px] rounded-[100px] font-bold text-xs sm:text-sm lg:text-[16px] hover:bg-[#d41b20] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20 whitespace-nowrap"
            >
              Contact <span className="hidden sm:inline">Now</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`lg:hidden p-2 rounded-full transition-all duration-300 border ${
                isScrolled
                  ? "text-[#131515] border-black/10 hover:bg-black/5"
                  : "text-white border-white/20 hover:bg-white/10"
              }`}
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Dim Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-[999] backdrop-blur-sm lg:hidden"
            />

            {/* Slide-in Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[360px] bg-black z-[1000] shadow-2xl flex flex-col p-6 border-l border-white/10 lg:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/10">
                <div className="flex items-center">
                  <Image
                    src="/assets/SAWC logo.svg"
                    alt="SAWC Logo"
                    width={120}
                    height={48}
                    className="w-auto h-[35px] invert brightness-200"
                  />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white/80 hover:text-white transition-all active:scale-95"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Staggered Navigation Links */}
              <div className="flex flex-col gap-3.5 flex-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1 px-1">
                  Navigation Menu
                </span>
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? "bg-[#EB242A] border-transparent text-white shadow-lg shadow-red-600/30"
                            : "bg-white/5 border-white/5 text-white/80 hover:bg-white/10 hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`p-2 rounded-xl ${
                              isActive ? "bg-white/20" : "bg-white/10"
                            }`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-[15px] font-bold tracking-wide">
                            {link.title}
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isActive ? "translate-x-1" : "text-white/40"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer Footer Contact Button */}
              <div className="pt-6 border-t border-white/10 mt-6">
                <Link
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-[#EB242A] text-white flex items-center justify-center gap-2 py-4 rounded-full font-bold tracking-wide uppercase text-xs hover:bg-[#d41b20] transition-all shadow-lg shadow-red-600/20 active:scale-95 duration-200"
                >
                  <Phone className="w-4 h-4 text-white" />
                  Contact Us Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
