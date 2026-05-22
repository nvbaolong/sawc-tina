import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Event Date",
      type: "date",
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "e.g. $25 or Free",
    }),
    defineField({
      name: "type",
      title: "Event Type",
      type: "string",
      description: "e.g. Concert, Fundraiser",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking URL",
      type: "string",
      description: "Link for 'Book Now' button",
    }),
    defineField({
      name: "orderRank",
      title: "Display Order",
      type: "number",
    }),
  ],
});
