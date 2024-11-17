"use client";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
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
  ArrowUp,
  DollarSign,
  Users,
  TrendingUp,
  AlertTriangle,
  ChartArea,
} from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

// Chart data with proper typing
const chartData = [
  { month: "January", impressions: 186000, clicks: 8000 },
  { month: "February", impressions: 305000, clicks: 12000 },
  { month: "March", impressions: 237000, clicks: 9500 },
  { month: "April", impressions: 273000, clicks: 11000 },
  { month: "May", impressions: 309000, clicks: 13500 },
  { month: "June", impressions: 314000, clicks: 14200 },
];

// Chart configuration
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

// Campaign data
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

// Animation variants for Framer Motion
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const CampaignsView = () => {
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalSpentChange: 0,
    activeCampaigns: 0,
    endingSoon: 0,
    totalImpressions: 0,
    impressionsChange: 0,
    averageCTR: 0,
    ctrChange: 0,
    impressionsGrowth: 0,
    clicksGrowth: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
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
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        animate: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Stats Overview */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={fadeInUp}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span>$</span>
              <NumberFlow
                value={stats.totalSpent}
                format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                transformTiming={{ duration: 750, easing: "ease-out" }}
              />
            </div>
            <p className="text-xs text-green-400">
              +<NumberFlow value={stats.totalSpentChange} />% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
            <ChartArea className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">
              <NumberFlow value={stats.activeCampaigns} />
            </div>
            <p className="text-xs text-yellow-400 flex items-center gap-1">
              <AlertTriangle className="size-3" />
              <NumberFlow value={stats.endingSoon} /> ending soon
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
            <div className="text-2xl font-bold font-mono">
              <NumberFlow
                value={stats.totalImpressions}
                format={{ notation: "compact", maximumFractionDigits: 1 }}
              />
            </div>
            <p className="text-xs text-green-400">
              +<NumberFlow value={stats.impressionsChange} />% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
            <ArrowUp className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">
              <NumberFlow value={stats.averageCTR} />%
            </div>
            <p className="text-xs text-green-400">
              +<NumberFlow value={stats.ctrChange} />% from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
        variants={fadeInUp}
      >
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
                  Up by <NumberFlow value={stats.impressionsGrowth} />% this
                  month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

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
                  Up by <NumberFlow value={stats.clicksGrowth} />% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Active Campaigns Table */}
      <motion.div variants={fadeInUp}>
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Campaigns</CardTitle>
            <Button
              asChild
              variant="primary"
              className="flex items-center gap-2"
            >
              <Link href="/dashboard?view=buy">
                <DollarSign className="h-4 w-4" />
                Create New Campaign
              </Link>
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
                    <tr
                      key={campaign.name}
                      className="border-b border-zinc-800"
                    >
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
      </motion.div>
    </motion.div>
  );
};
