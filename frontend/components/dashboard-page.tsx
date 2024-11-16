"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  AlertCircle,
  ArrowUp,
  DollarSign,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/ui/button";

const chartData = [
  { month: "January", impressions: 186000, clicks: 8000 },
  { month: "February", impressions: 305000, clicks: 12000 },
  { month: "March", impressions: 237000, clicks: 9500 },
  { month: "April", impressions: 273000, clicks: 11000 },
  { month: "May", impressions: 309000, clicks: 13500 },
  { month: "June", impressions: 314000, clicks: 14200 },
];

const chartConfig = {
  impressions: {
    label: "Impressions",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const campaignData = [
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

export const DashboardPage = () => {
  return (
    <>
      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-green-400">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-yellow-400 flex items-center gap-1">
              <AlertTriangle className="size-3" />2 ending soon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Impressions
            </CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892.1K</div>
            <p className="text-xs text-green-400">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
            <ArrowUp className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3%</div>
            <p className="text-xs text-green-400">+0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Impressions</CardTitle>
            <CardDescription>
              Total impressions over last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <AreaChart
                data={chartData}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <defs>
                  <linearGradient
                    id="fillImpressions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-impressions)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-impressions)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="impressions"
                  type="natural"
                  fill="url(#fillImpressions)"
                  fillOpacity={0.4}
                  stroke="var(--color-impressions)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none text-green-400">
                  Up by 18.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Clicks Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Clicks</CardTitle>
            <CardDescription>Total clicks over last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <AreaChart
                data={chartData}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <defs>
                  <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-clicks)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-clicks)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="clicks"
                  type="natural"
                  fill="url(#fillClicks)"
                  fillOpacity={0.4}
                  stroke="var(--color-clicks)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none text-green-400">
                  Up by 12.5% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Active Campaigns Table */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Active Campaigns</CardTitle>
          <Button variant="primary" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Create New Campaign
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto rounded-md">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-800 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Campaign Name</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Budget</th>
                  <th className="px-6 py-3">Spent</th>
                  <th className="px-6 py-3">Impressions</th>
                  <th className="px-6 py-3">Clicks</th>
                  <th className="px-6 py-3">CTR</th>
                </tr>
              </thead>
              <tbody>
                {campaignData.map((campaign) => (
                  <tr key={campaign.name} className="border-b border-zinc-800">
                    <td className="px-6 py-4 font-medium">{campaign.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          campaign.status === "Active"
                            ? "bg-green-500/10 text-green-500"
                            : campaign.status === "Scheduled"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-zinc-500/10 text-zinc-500"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{campaign.budget}</td>
                    <td className="px-6 py-4">{campaign.spent}</td>
                    <td className="px-6 py-4">{campaign.impressions}</td>
                    <td className="px-6 py-4">{campaign.clicks}</td>
                    <td className="px-6 py-4">{campaign.ctr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
