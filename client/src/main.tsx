import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";
import {
  loadResponsiveConfig,
  applyResponsiveConfigToRoot,
} from "./hooks/useResponsiveTokens";
// ── Initial load: apply the responsive config from localStorage ──
// Default presets are now loaded from the database via tRPC (see App.tsx).
// The responsive config in localStorage serves as the working state.
const responsiveConfig = loadResponsiveConfig();
applyResponsiveConfigToRoot(responsiveConfig);

// ── Cross-Tab Sync ──
// Disabled inside iframes – the parent StyleGuide controls tokens via pushToIframe.
// Also disabled on the /styleguide route itself – the hook manages state directly.
const isInsideIframe = window.self !== window.top;
const isStyleGuidePage = window.location.pathname === '/styleguide';

if (!isInsideIframe && !isStyleGuidePage) {
  const RESPONSIVE_KEY = 'cme-responsive-tokens';

  // Method 1: Native storage event (fires in OTHER tabs)
  window.addEventListener('storage', (event) => {
    if (event.key === RESPONSIVE_KEY && event.newValue) {
      try {
        const config = loadResponsiveConfig();
        applyResponsiveConfigToRoot(config);
      } catch { /* ignore */ }
    }
  });

  // Method 2: Same-tab custom event (only for the responsive key, not legacy keys)
  window.addEventListener('cme-token-change' as any, ((e: CustomEvent) => {
    if (e.detail?.key === RESPONSIVE_KEY) {
      const config = loadResponsiveConfig();
      applyResponsiveConfigToRoot(config);
    }
  }) as EventListener);

  // Method 3: Polling fallback (reduced frequency to 1s)
  let lastResponsiveJson = localStorage.getItem(RESPONSIVE_KEY) || '';

  setInterval(() => {
    const currentResponsive = localStorage.getItem(RESPONSIVE_KEY) || '';
    if (currentResponsive !== lastResponsiveJson) {
      lastResponsiveJson = currentResponsive;
      try {
        const config = loadResponsiveConfig();
        applyResponsiveConfigToRoot(config);
      } catch { /* ignore */ }
    }
  }, 1000);
}

// ── Render App ───────────────────────────────────────────────────────────
const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
