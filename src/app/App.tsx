import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import routerConfig from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/useTheme";
import { TourBuilderProvider } from "@/hooks/useTourBuilder";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const router = createBrowserRouter(routerConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TourBuilderProvider>
          <RouterProvider router={router} />;
          <Toaster />
        </TourBuilderProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
