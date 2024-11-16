export interface ChartDataPoint {
  month: string;
  impressions: number;
  clicks: number;
}

export interface Campaign {
  name: string;
  status: "Active" | "Scheduled" | "Draft";
  budget: string;
  spent: string;
  impressions: string;
  clicks: string;
  ctr: string;
}

export interface DashboardStats {
  totalSpent: number;
  totalSpentChange: number;
  activeCampaigns: number;
  endingSoon: number;
  totalImpressions: number;
  impressionsChange: number;
  averageCTR: number;
  ctrChange: number;
  impressionsGrowth: number;
  clicksGrowth: number;
}
