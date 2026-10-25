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
      title: "Chế độ Video (Video Source)",
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
      description: `Đường dẫn YouTube cho video Hero (Mặc định: ${DEFAULT_YOUTUBE_URL})`,
      hidden: ({ parent }) => parent?.videoType === "upload",
      components: {
        input: VideoUrlInput,
      },
    }),
    defineField({
      name: "videoFile",
      title: "File Video Tải Lên (Sanity CDN)",
      type: "file",
      description:
        "Tải file video (MP4, WebM, MOV) lưu trữ trên Sanity CDN. Để xoá/gỡ video: bấm vào dấu 3 chấm (...) ở góc bên phải của file và chọn 'Clear'.",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.videoType !== "upload",
    }),
  ],
});


