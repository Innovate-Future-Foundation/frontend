import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routerConfig from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/useTheme";

const App: React.FC = () => {
  const router = createBrowserRouter(routerConfig);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />;
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
