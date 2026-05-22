import { createClient } from "next-sanity";
import { draftMode } from "next/headers";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ihtjlqej";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-03-11";

export async function getSanityClient() {
  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch (e) {
    // draftMode() can throw if called outside of request context (e.g. during static build)
  }

  // If Next.js draft mode is enabled and a token is defined, use the preview client to fetch draft documents
  if (isDraft && process.env.SANITY_API_READ_TOKEN) {
    return createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: "previewDrafts",
      stega: {
        enabled: true,
        studioUrl: "/admin",
      },
    });
  }

  // Fallback to the standard public client (which reads published content only)
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  });
}
