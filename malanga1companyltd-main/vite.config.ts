import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const FIREBASE_PROJECT = "malanga1company";
const FIRESTORE_DATABASE = "default";

/**
 * Property pages live in Firestore, so their URLs are not known to the bundler.
 * The listing collection is public, so we read it at build time and prerender a
 * real HTML page (with its own title, description and JSON-LD) for every
 * listing that exists right now. Listings added later still work: they fall
 * back to `_shell.html` and are rendered by the client router.
 */
async function propertyPages(): Promise<{ path: string }[]> {
  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT}/databases/${FIRESTORE_DATABASE}/documents/properties`,
      { signal: AbortSignal.timeout(10_000) },
    );
    if (!response.ok) return [];
    const json = (await response.json()) as { documents?: { name: string }[] };
    return (json.documents ?? []).map((document) => ({
      path: `/properties/${document.name.split("/").pop()}`,
    }));
  } catch (error) {
    console.warn(`[prerender] Could not read property IDs, skipping detail pages: ${error}`);
    return [];
  }
}

export default defineConfig(async () => {
  const spaShell = process.env.BUILD_SHELL === "1";

  return {
    plugins: [
      tanstackStart(
        spaShell
          ? {
              // Pass 1 of the hosting build: emit a single `_shell.html` that the
              // client router can hydrate for any URL. Firebase Hosting serves it
              // as the fallback so dynamically-created property pages work.
              spa: { enabled: true },
            }
          : {
              // Pass 2: prerender every known route to real HTML for SEO.
              prerender: {
                enabled: true,
                crawlLinks: false,
                autoStaticPathsDiscovery: true,
                autoSubfolderIndex: true,
                failOnError: false,
              },
              pages: await propertyPages(),
            },
      ),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
      tsconfigPaths: true,
    },
    server: {
      port: 5173,
      strictPort: false,
    },
  };
});
