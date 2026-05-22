import { defineType, defineField } from "sanity";

export const tvShow = defineType({
  name: "tvShow",
  title: "TV Show Episode",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Episode Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "airDate",
      title: "Air Date",
      type: "datetime",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "string",
      description: "Link to watch this episode",
    }),
    defineField({
      name: "category",
      title: "Category / Season (e.g. Season 11)",
      type: "string",
      description: "Label for the card's top badge (e.g. Season 11, EP 01, Clip)",
    }),
    defineField({
      name: "orderRank",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first",
    }),
  ],
});
