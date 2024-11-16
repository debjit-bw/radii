import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Suspense } from "react";
import { Metadata } from "next";
import { AuthProvider } from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "Radii · Dashboard",
  description: "The Future of Digital Advertisements",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <main className="p-6 font-sans w-full">{children}</main>
    </>
  );
}
