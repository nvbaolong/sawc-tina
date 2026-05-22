import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  // Disable Next.js Draft Mode by clearing the preview cookie
  (await draftMode()).disable();
  
  // Redirect to home page to render the published data
  redirect("/");
}
