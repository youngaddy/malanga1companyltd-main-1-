import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Routes whose data lives in Firestore. Their HTML is prerendered at build
 * time for SEO, but the content can change at any moment from the admin
 * dashboard, so the client refreshes them once after hydration.
 */
const FIRESTORE_ROUTES = new Set(["/", "/properties", "/properties/", "/gallery", "/properties/$id"]);

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  if (typeof window !== "undefined") {
    let refreshed = false;
    const refresh = () => {
      if (refreshed) return;
      refreshed = true;
      // Keep the prerendered markup on screen until fresh data arrives, so this
      // does not cause a flash of empty content.
      void router.invalidate({
        filter: (match) => FIRESTORE_ROUTES.has(match.routeId),
      });
    };

    router.subscribe("onResolved", refresh);
    if (router.state.status === "idle") refresh();
  }

  return router;
};
