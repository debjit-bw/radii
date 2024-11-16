/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Button as UIButton } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Upload } from "lucide-react";
import Select from "react-select/creatable";

const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "hsl(var(--background))",
    borderColor: state.isFocused ? "hsl(var(--primary))" : "hsl(var(--border))",
    borderRadius: "var(--radius)",
    padding: "2px",
    boxShadow: state.isFocused ? "0 0 0 1px hsl(var(--primary))" : "none",
    "&:hover": {
      borderColor: state.isFocused
        ? "hsl(var(--primary))"
        : "hsl(var(--border))",
    },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "hsl(var(--background))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "var(--radius)",
    boxShadow: "var(--shadow)",
    fontSize: "14px",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "hsl(var(--accent))" : "transparent",
    color: state.isFocused ? "hsl(var(--accent-foreground))" : "inherit",
    "&:active": {
      backgroundColor: "hsl(var(--accent))",
    },
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "hsl(var(--accent))",
    borderRadius: "var(--radius)",
    paddingInline: "0.25rem",
    overflow: "hidden",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "hsl(var(--accent-foreground))",
    fontSize: "12px",
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "hsl(var(--accent-foreground))",
    marginRight: "-4px",
    marginLeft: "4px",
    borderRadius: "0",
    "&:hover": {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  }),
  input: (base: any) => ({
    ...base,
    fontSize: "14px",
    color: "hsl(var(--foreground))",
  }),
  placeholder: (base: any) => ({
    ...base,
    fontSize: "14px",
    color: "hsl(var(--muted-foreground))",
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    backgroundColor: "hsl(var(--border))",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "hsl(var(--foreground))",
  }),
};

const tagOptions = [
  { value: "technology", label: "Technology" },
  { value: "gaming", label: "Gaming" },
  { value: "sports", label: "Sports" },
  { value: "fashion", label: "Fashion" },
  { value: "food", label: "Food & Dining" },
  { value: "travel", label: "Travel" },
  { value: "education", label: "Education" },
  { value: "business", label: "Business" },
];

const viewCountOptions = [
  { value: "500", label: "500 views" },
  { value: "2000", label: "2,000 views" },
  { value: "5000", label: "5,000 views" },
  { value: "10000", label: "10,000 views" },
  { value: "25000", label: "25,000 views" },
  { value: "50000", label: "50,000 views" },
];

export const BuyAdsView = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Advertisement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Campaign Name</Label>
              <Input placeholder="Enter campaign name" />
            </div>
            <div className="space-y-2">
              <Label>Budget</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  className="pl-9"
                  placeholder="Enter budget amount"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Target Tags</Label>
              <Select
                isMulti
                isClearable
                options={tagOptions}
                styles={customSelectStyles}
                placeholder="Select or create tags"
                formatCreateLabel={(inputValue: string) =>
                  `Create tag "${inputValue}"`
                }
                className="react-select-container"
                classNamePrefix="react-select"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Create custom tags or select from existing ones
              </p>
            </div>
            <div className="space-y-2">
              <Label>View Count Target</Label>
              <Select
                options={viewCountOptions}
                styles={customSelectStyles}
                placeholder="Select target view counts"
                className="react-select-container"
                classNamePrefix="react-select"
                formatGroupLabel={(data: any) => (
                  <div className="flex items-center justify-between">
                    <span>{data.label}</span>
                    <span className="text-muted-foreground text-sm">
                      {data.options.length}
                    </span>
                  </div>
                )}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Select multiple view count targets
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Advertisement Content</Label>
            <Card className="bg-zinc-900/50 border-dashed">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your ad content here, or click to upload
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <UIButton variant="primary" className="w-full">
            Create Campaign
          </UIButton>
        </CardContent>
      </Card>
    </div>
  );
};
