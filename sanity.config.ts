"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// Embedded Studio served at /studio. projectId falls back to a placeholder
// until the real project is created (see SANITY_SETUP.md).
export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
