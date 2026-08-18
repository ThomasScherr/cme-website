import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import superjson from "superjson";
import { Router } from "wouter";
import App from "./App";
import { useLocalizedBrowserLocation } from "@/lib/localizedRouting";
import { getLoginUrl } from "./const";
import "./index.css";

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

const container = document.getElementById("root")!;

const tree = (
  <HelmetProvider>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Der Router uebersetzt interne Ziele in die Sprache der aktuellen URL.
            Ohne ihn fuehrte auf /en/... jeder Klick zurueck ins Deutsche und im
            HTML stuenden nur deutsche Links. Siehe lib/localizedRouting.ts. */}
        <Router hook={useLocalizedBrowserLocation}>
          <App />
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  </HelmetProvider>
);

// Vorgerenderte Seiten werden hydratisiert, nicht neu aufgebaut. Ist der
// Container leer – etwa bei einer Route ohne vorgerenderte Datei –, wird wie
// bisher gerendert. Ohne diese Unterscheidung wuerde React das vorhandene
// Markup verwerfen und der Vorteil des Vorrenderns waere weg.
if (container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
