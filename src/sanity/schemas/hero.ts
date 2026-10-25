import { defineType, defineField } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      description: "Short badge shown above the heading (e.g. 'Australia\\'s Favourite SA Show')",
    }),
    defineField({
      name: "mainHeading",
      title: "Main Heading",
      type: "string",
      description: "Large heading text (e.g. G\\'Day, South Australia!)",
    }),
    defineField({
      name: "subtext",
      title: "Subtext",
      type: "text",
      description: "Paragraph below the heading",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "Full-screen hero background photo",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "videoType",
      title: "Video Source",
      type: "string",
      description: "Choose whether to use a YouTube link or upload a video file directly to Sanity",
      initialValue: "youtube",
      options: {
        list: [
          { title: "YouTube Video URL", value: "youtube" },
          { title: "Upload Video File (Host on Sanity)", value: "upload" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube Video URL",
      type: "string",
      description: "YouTube link for the 'Watch Video' button (e.g. https://www.youtube.com/watch?v=...)",
      hidden: ({ parent }) => parent?.videoType === "upload",
    }),
    defineField({
      name: "videoFile",
      title: "Upload Video File",
      type: "file",
      description: "Upload video file (MP4, WebM, MOV) hosted directly on Sanity CDN",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.videoType && parent?.videoType !== "upload",
    }),
  ],
});

