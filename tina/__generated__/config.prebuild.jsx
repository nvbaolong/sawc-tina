// tina/config.ts
import { defineConfig } from "tinacms";
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
      // ─── FRIENDS WITH BENEFITS ─────────────────────────────────────────────
      {
        name: "friendsWithBenefits",
        label: "Friends With Benefits",
        path: "content/fwb",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          {
            type: "string",
            name: "badgeText",
            label: "Badge Text"
          },
          {
            type: "string",
            name: "titleLine1",
            label: "Title Line 1"
          },
          {
            type: "string",
            name: "titleLine2",
            label: "Title Line 2"
          },
          {
            type: "string",
            name: "subtext",
            label: "Subtext",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "buttonText",
            label: "Button Text"
          },
          {
            type: "string",
            name: "buttonLink",
            label: "Button Link"
          },
          {
            type: "string",
            name: "price",
            label: "Price Label (e.g. $4.95)"
          },
          {
            type: "image",
            name: "backgroundImage",
            label: "Background Image"
          },
          {
            type: "image",
            name: "cosiImage",
            label: "Cosi Cutout Image"
          },
          {
            type: "string",
            name: "card1Title",
            label: "Card 1 Title"
          },
          {
            type: "string",
            name: "card1Description",
            label: "Card 1 Description",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "card2Title",
            label: "Card 2 Title"
          },
          {
            type: "string",
            name: "card2Description",
            label: "Card 2 Description",
            ui: { component: "textarea" }
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
