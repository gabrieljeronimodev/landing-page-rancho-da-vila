import { createRouter, createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import LandingPage from "./routes/index";

function RootRoute() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Outlet />
    </QueryClientProvider>
  );
}

const rootRoute = createRootRoute({
  component: RootRoute,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
});

// Type augmentation for the router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
