import * as React from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto p-4">
                <SidebarTrigger />
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
