import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

// When unconfigured, projectId is "" — guard callers with isSanityConfigured
// before fetching. We still create the client with a harmless placeholder so
// imports don't throw at module load.
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});

export { isSanityConfigured };
