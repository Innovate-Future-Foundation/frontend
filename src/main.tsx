import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import routerConfig from "@/routes";
import "@/index.css";

const queryClient = new QueryClient();
const router = createBrowserRouter(routerConfig);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  </StrictMode>
);
