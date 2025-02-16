/// <reference lib="WebWorker" />

import { BackgroundSyncPlugin } from "workbox-background-sync";
import { NetworkFirst, NetworkOnly } from "workbox-strategies";
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import type { HTTPMethod } from "workbox-routing/utils/constants";

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

/** @type {RegExp[] | undefined} */
let allowlist;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.dev) allowlist = [/^\/$/];

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL("/"), { allowlist }));

// -------------------------
// Supabase cache
// -------------------------

const supabaseRestPath = "/rest/v1";

// GET requests
registerRoute(
  ({ request, url }) =>
    request.method === "GET" && url.pathname.startsWith(supabaseRestPath),
  new NetworkFirst({
    cacheName: "supabase-cache",
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

// POST/PUT/DELETE requests
const bgSyncPlugin = new BackgroundSyncPlugin("supabaseQueue", {
  maxRetentionTime: 24 * 60, // Retry for up to 24 hours (in minutes),
});

const updateMethods: HTTPMethod[] = ["POST", "PUT", "DELETE"];
updateMethods.forEach((method) => {
  registerRoute(
    ({ url }) => url.pathname.startsWith(supabaseRestPath),
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    method // Specify the HTTP method here.
  );
});

// Cache invalidation
self.addEventListener("message", async (event) => {
  if (event.data && event.data.type === "UPDATE_CACHE") {
    const { key, data } = event.data;
    try {
      const cache = await caches.open("supabase-cache");

      const request = new Request(key, {
        method: "GET",
        mode: "cors",
      });
      const response = new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

      await cache.put(request, response);

      event.source?.postMessage({
        type: "CACHE_UPDATED",
        key,
        data,
      });
    } catch (error) {
      console.error("Error updating cache:", error);
    }
  }
});
