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
      name: "videoUrl",
      title: "Video URL (YouTube)",
      type: "string",
      description: "YouTube link for the 'Watch Video' button",
    }),
  ],
});
