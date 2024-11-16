import { Campaign, ChartDataPoint, DashboardStats } from "@/types/dashboard";

export const chartData: ChartDataPoint[] = [
  { month: "January", impressions: 186000, clicks: 8000 },
  { month: "February", impressions: 305000, clicks: 12000 },
  { month: "March", impressions: 237000, clicks: 9500 },
  { month: "April", impressions: 273000, clicks: 11000 },
  { month: "May", impressions: 309000, clicks: 13500 },
  { month: "June", impressions: 314000, clicks: 14200 },
];

export const campaignData: Campaign[] = [
  {
    name: "Summer Sale",
    status: "Active",
    budget: "$5,000",
    spent: "$3,245",
    impressions: "45.2K",
    clicks: "2.1K",
    ctr: "4.6%",
  },
  {
    name: "Back to School",
    status: "Scheduled",
    budget: "$3,000",
    spent: "$0",
    impressions: "-",
    clicks: "-",
    ctr: "-",
  },
  {
    name: "Holiday Special",
    status: "Draft",
    budget: "$10,000",
    spent: "$0",
    impressions: "-",
    clicks: "-",
    ctr: "-",
  },
];

export const dashboardStats: DashboardStats = {
  totalSpent: 45231.89,
  totalSpentChange: 20.1,
  activeCampaigns: 6,
  endingSoon: 2,
  totalImpressions: 892100,
  impressionsChange: 12,
  averageCTR: 4.3,
  ctrChange: 0.5,
  impressionsGrowth: 18.2,
  clicksGrowth: 12.5,
};
