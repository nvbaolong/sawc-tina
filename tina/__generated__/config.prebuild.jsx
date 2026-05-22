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
        label: "Trang ch\u1EE7 (\u0110\u1EA7u trang)",
        path: "content/hero",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
          router: () => "/"
        },
        fields: [
          {
            type: "string",
            name: "buildStatus",
            label: "Deployment Status"
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
        label: "T\u1EADp phim TV Show",
        path: "content/tv-shows",
        format: "json",
        ui: {
          router: () => "/"
        },
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
        label: "Danh s\xE1ch S\u1EF1 ki\u1EC7n",
        path: "content/events",
        format: "json",
        ui: {
          router: () => "/"
        },
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
