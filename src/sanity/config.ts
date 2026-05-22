import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./schemas";
import PreviewIframe from "./components/PreviewIframe";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ihtjlqej";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "SAWC Admin Studio",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [
    structureTool({
      defaultDocumentNode: (S, { schemaType }) => {
        // Show Preview tab for documents that have frontend representations
        if (["hero", "tvShow", "event"].includes(schemaType)) {
          return S.document().views([
            S.view.form(),
            S.view.component(PreviewIframe).title("Preview"),
          ]);
        }
        return S.document().views([S.view.form()]);
      },
      structure: (S) =>
        S.list()
          .title("SAWC Content Manager")
          .items([
            // Singleton structure for Hero Section - directly loads the document editor
            S.listItem()
              .title("Hero Section")
              .id("hero")
              .child(
                S.document()
                  .schemaType("hero")
                  .documentId("hero")
                  .title("Edit Hero Section")
                  .views([
                    S.view.form(),
                    S.view.component(PreviewIframe).title("Preview"),
                  ])
              ),
            S.divider(),
            S.documentTypeListItem("tvShow").title("TV Shows"),
            S.documentTypeListItem("event").title("Events"),
          ]),
    }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft",
          disable: "/api/disable-draft",
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
    // Hide the singleton from the "Create New Document" menu
    templates: (prev) => prev.filter((template) => template.id !== "hero"),
  },
  document: {
    // Restrict singleton actions - no delete, no duplicate
    actions: (prev, { schemaType }) => {
      if (schemaType === "hero") {
        return prev.filter(
          (action) =>
            action.action === "publish" ||
            action.action === "discardChanges" ||
            action.action === "restore"
        );
      }
      return prev;
    },
  },
});
