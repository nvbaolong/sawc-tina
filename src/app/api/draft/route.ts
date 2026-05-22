import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "/";
  
  // Enable Next.js Draft Mode by setting the preview cookie.
  // When inside Sanity Studio, this enables live preview of draft versions.
  (await draftMode()).enable();
  
  // Redirect to the target page to render the fresh drafts
  redirect(slug);
}
