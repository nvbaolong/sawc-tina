// src/components/VercelDeployBadge.tsx
"use client";
import { usePathname } from "next/navigation";

export default function VercelDeployBadge() {
  const pathname = usePathname();
  // Show only inside the Tina CMS admin UI (URL contains /admin)
  if (!pathname.includes("/admin")) return null;

  // Vercel Deploy Badge – external service that shows a green check when the deployment is ready
  // You can get the project ID from .vercel/project.json (prj_45tJVuI2PsLhiVUKmrjIBshRmE6q)
  // The badge URL format is:
  //   https://deploy-badge.vercel.app/api/projects/<PROJECT_ID>.svg
  const projectId = process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID || "prj_45tJVuI2PsLhiVUKmrjIBshRmE6q";
  const badgeUrl = `https://deploy-badge.vercel.app/api/projects/${projectId}.svg`;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://vercel.com/dashboard"
        target="_blank"
        rel="noopener noreferrer"
        title="Open Vercel dashboard"
      >
        <img src={badgeUrl} alt="Vercel Deploy Status" className="h-6" />
      </a>
    </div>
  );
}
