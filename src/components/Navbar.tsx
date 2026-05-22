"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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

  const navLinks = [
    { title: "Home", href: "#home", id: "home" },
    { title: "Our TV Show", href: "#our-tv-show", id: "our-tv-show" },
    { title: "FwB", href: "#fwb", id: "fwb" },
    { title: "Charity", href: "#cows-for-cambodia", id: "cows-for-cambodia" },
    { title: "Cosi's Choir", href: "#cosis-choir", id: "cosis-choir" },
    { title: "Event", href: "#book-events", id: "book-events" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/assets/SAWC logo.svg"
            alt="SAWC Logo"
            width={300}
            height={120}
            className={`w-auto transition-all duration-500 ${isScrolled ? "h-[40px] md:h-[50px]" : "h-[70px] md:h-[90px] lg:h-[120px]"}`}
            priority
          />
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] lg:text-[16px] transition-all duration-300 tracking-wide ${
                  isScrolled
                    ? isActive
                      ? "text-[#EB242A] font-bold"
                      : "text-[#131515] hover:text-[#EB242A] font-medium"
                    : isActive
                      ? link.id === "home"
                        ? "text-white font-bold"
                        : "text-[#EB242A] font-bold"
                      : "text-white hover:text-[#EB242A] font-medium"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        {/* Actions - Contact Button */}
        <div className="flex items-center">
          <Link
            href="#contact"
            className="bg-[#EB242A] text-white flex items-center justify-center gap-2 px-[20px] lg:px-[34px] py-[10px] lg:py-[14px] rounded-[100px] font-bold text-[14px] lg:text-[16px] hover:bg-[#d41b20] transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20 whitespace-nowrap"
          >
            Contact <span className="hidden lg:inline">Now</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
