// page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CampaignsView } from "@/components/views/campaigns";
import { BuyAdsView } from "@/components/views/buy-ads";
import { ShowAdsView } from "@/components/views/show-ads";
import { ProfileView } from "@/components/views/profile";

const Page = () => {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "campaigns";

  const renderView = () => {
    switch (currentView) {
      case "campaigns":
        return <CampaignsView />;
      case "buy":
        return <BuyAdsView />;
      case "show":
        return <ShowAdsView />;
      case "profile":
        return <ProfileView />;
      default:
        return <CampaignsView />;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case "campaigns":
        return "Campaign Dashboard";
      case "buy":
        return "Buy Advertisement";
      case "show":
        return "Available Ad Spaces";
      case "profile":
        return "Profile Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="flex items-center justify-between border-b border-zinc-800 px-6 py-6 pt-0">
        <div className="flex items-center">
          <SidebarTrigger className="mr-4" />
          <h1 className="text-xl font-bold leading-tight">{getViewTitle()}</h1>
        </div>
      </nav>

      <main className="p-6">{renderView()}</main>
    </div>
  );
};

export default Page;
