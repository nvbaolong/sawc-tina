// tina/config.ts
import React from "react";
import { defineConfig } from "tinacms";
var VercelStatusBadge = () => {
  return React.createElement(
    "div",
    { style: { marginTop: "12px", marginBottom: "20px", padding: "16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px" } },
    React.createElement(
      "label",
      { style: { display: "block", fontSize: "14px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" } },
      "Website Update Status (Ti\u1EBFn tr\xECnh c\u1EADp nh\u1EADt)"
    ),
    React.createElement("img", {
      src: "https://deploy-badge.vercel.app/api/nvbaolong-1191s-projects/sawc-tina.svg",
      alt: "Vercel Deployment Status",
      style: { display: "block", height: "28px" }
    }),
    React.createElement(
      "p",
      { style: { fontSize: "12px", color: "#4b5563", marginTop: "8px", lineHeight: "1.4" } },
      'After clicking "Save" on any section, Vercel will rebuild the website (takes ~2 minutes). Once this badge turns green (Ready), your changes are live on the website.'
    ),
    React.createElement(
      "p",
      { style: { fontSize: "12px", color: "#9ca3af", marginTop: "4px", fontStyle: "italic" } },
      "(Sau khi b\u1EA5m Save, Vercel s\u1EBD ti\u1EBFn h\xE0nh c\u1EADp nh\u1EADt website. Khi n\xFAt chuy\u1EC3n sang m\xE0u xanh l\xE1 c\xE2y, n\u1ED9i dung m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c hi\u1EC3n th\u1ECB tr\xEAn trang ch\u1EE7.)"
    )
  );
};
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─── HERO ──────────────────────────────────────────────────────────────
      {
        name: "hero",
        label: "Hero Section",
        path: "content/hero",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          {
            type: "string",
            name: "buildStatus",
            label: "Deployment Status",
            ui: {
              component: VercelStatusBadge
            }
          },
          {
            type: "string",
            name: "badgeText",
            label: "Badge Text",
            description: "Short badge shown above the heading (e.g. 'Australia's Favourite SA Show')"
          },
          {
            type: "string",
            name: "mainHeading",
            label: "Main Heading",
            description: "Large heading text (e.g. G'Day, South Australia!)"
          },
          {
            type: "string",
            name: "subtext",
            label: "Subtext",
            description: "Paragraph below the heading",
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "backgroundImage",
            label: "Background Image",
            description: "Full-screen hero background photo"
          },
          {
            type: "string",
            name: "videoUrl",
            label: "Video URL (YouTube)",
            description: "YouTube link for the 'Watch Video' button"
          }
        ]
      },
      // ─── TV SHOWS ──────────────────────────────────────────────────────────
      {
        name: "tvShow",
        label: "TV Show Episodes",
        path: "content/tv-shows",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Episode Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "image",
            label: "Cover Image"
          },
          {
            type: "datetime",
            name: "airDate",
            label: "Air Date"
          },
          {
            type: "string",
            name: "videoUrl",
            label: "Video URL",
            description: "Link to watch this episode"
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { value: "full-episode", label: "Full Episode" },
              { value: "clip", label: "Clip" },
              { value: "behind-the-scenes", label: "Behind the Scenes" }
            ]
          },
          {
            type: "number",
            name: "orderRank",
            label: "Display Order",
            description: "Lower number = shown first"
          }
        ]
      },
      // ─── EVENTS ────────────────────────────────────────────────────────────
      {
        name: "event",
        label: "Events",
        path: "content/events",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Event Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date & Time",
            required: true
          },
          {
            type: "string",
            name: "venue",
            label: "Venue"
          },
          {
            type: "string",
            name: "time",
            label: "Time (display)",
            description: "e.g. 7:00 PM \u2013 9:30 PM"
          },
          {
            type: "string",
            name: "price",
            label: "Price",
            description: "e.g. $25 or Free"
          },
          {
            type: "string",
            name: "type",
            label: "Event Type",
            description: "e.g. Concert, Fundraiser"
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Short Description",
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image"
          },
          {
            type: "string",
            name: "bookingUrl",
            label: "Booking URL",
            description: "Link for 'Book Now' button"
          },
          {
            type: "number",
            name: "orderRank",
            label: "Display Order"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
