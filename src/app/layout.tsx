import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SAWC | South Australia's Favourite Show",
  description:
    "Join Cosi on a mission to showcase the best of South Australia. Experience adventure, travel, and local stories with SAWC.",
  keywords: [
    "South Australia",
    "SAWC",
    "Cosi",
    "Travel",
    "Adventure",
    "Australian Show",
  ],
  openGraph: {
    title: "SAWC | South Australia's Favourite Show",
    description: "South Australia's most loved travel and lifestyle show.",
    images: ["/assets/SAWC logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAWC | South Australia's Favourite Show",
    description: "South Australia's most loved travel and lifestyle show.",
    images: ["/assets/SAWC logo.svg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${plusJakartaSans.variable} font-body antialiased`}
      >
        {children}
        {isDraft && <VisualEditing />}
      </body>
    </html>
  );
}
