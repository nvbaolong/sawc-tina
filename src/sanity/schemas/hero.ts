import { defineType, defineField } from "sanity";
import { VideoTypeInput, VideoUrlInput, DEFAULT_YOUTUBE_URL } from "../components/VideoControl";

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
      initialValue: "youtube",
      components: {
        input: VideoTypeInput,
      },
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube Video URL",
      type: "string",
      initialValue: DEFAULT_YOUTUBE_URL,
      description: `YouTube video link for the 'Watch Video' button (Default: ${DEFAULT_YOUTUBE_URL})`,
      hidden: ({ parent }) => parent?.videoType === "upload",
      components: {
        input: VideoUrlInput,
      },
    }),
    defineField({
      name: "videoFile",
      title: "Uploaded Video File (Sanity CDN)",
      type: "file",
      description:
        "Upload a video file (MP4, WebM, MOV) hosted on Sanity CDN. To remove an uploaded video: click the three dots (...) on the right side of the file and select 'Clear'.",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.videoType !== "upload",
    }),
  ],
});
