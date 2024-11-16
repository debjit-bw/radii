import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-6 font-sans w-full">{children}</main>
      </SidebarProvider>
    </Suspense>
  );
}
