"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Button as UIButton } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Upload } from "lucide-react";
import { useState } from "react";
import Select from "react-select/creatable";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useDropzone } from "react-dropzone";
import { formatEther, parseEther } from "viem";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { purchaseAdvert } from "@/utils/transitions";
import { getWeb3Provider } from "@dynamic-labs/ethers-v6";
import { parseUnits } from "ethers";

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
  { value: 1, label: "Technology" },
  { value: 2, label: "Gaming" },
  { value: 3, label: "Sports" },
  { value: 4, label: "Fashion" },
  { value: 5, label: "Food & Dining" },
  { value: 6, label: "Travel" },
  { value: 7, label: "Education" },
  { value: 8, label: "Business" },
];

const viewCountOptions = [
  { value: "500", label: "500 views" },
  { value: "2000", label: "2,000 views" },
  { value: "5000", label: "5,000 views" },
  { value: "10000", label: "10,000 views" },
  { value: "25000", label: "25,000 views" },
  { value: "50000", label: "50,000 views" },
];

async function uploadToShutter(file: File) {
  // return {
  //   originalImageHash:
  //     "bafkreicnq3dltpse6pbrg2iahdunpo35tyd7r6yzweqege25aukez7hvpq",
  // };
  const reader = new FileReader();
  const fileBuffer = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(Buffer.from(reader.result as ArrayBuffer));
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });

  const type = file.type;
  console.log("Type: ", type);

  const response = await fetch(
    "https://shutter-image-magic-876401151866.us-central1.run.app",
    {
      method: "PUT",
      headers: {
        "Content-Type": type,
      },
      body: fileBuffer as any,
    }
  );

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

interface CampaignForm {
  name: string;
  budget: string;
  tags: Array<{ value: string; label: string }>;
  viewCount: { value: string; label: string } | null;
  file: File | null;
}

export const BuyAdsView = () => {
  const { primaryWallet } = useDynamicContext();
  const [form, setForm] = useState<CampaignForm>({
    name: "",
    budget: "",
    tags: [],
    viewCount: null,
    file: null,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setForm((prev) => ({ ...prev, file: acceptedFiles[0] }));
    },
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (data: CampaignForm) => {
      if (!data.file || !primaryWallet?.connector)
        throw new Error("Missing file or wallet");

      // 1. Upload file to Shutter
      const { originalImageHash: contentId } = await uploadToShutter(data.file);

      // 2. Get signer
      const provider = await getWeb3Provider(primaryWallet);
      const signer = await provider.getSigner();

      // 3. Convert tags to numbers (you'll need to implement this based on your tag system)
      const tagNumbers = data.tags.map((tag) => parseInt(tag.value));

      // 4. Get view count
      const viewCount = parseInt(data.viewCount?.value || "0");

      // 5. Convert budget to wei
      // value should be data.tags.length * viewCount * 1000;

      const valueInWei =
        BigInt(data.tags.length) * BigInt(viewCount) * BigInt(1000);

      // 6. Call contract
      return purchaseAdvert(
        contentId,
        tagNumbers,
        viewCount,
        valueInWei,
        signer
      );
    },
    onSuccess: () => {
      toast.success("Campaign created successfully!");
      // Reset form
      setForm({
        name: "",
        budget: "",
        tags: [],
        viewCount: null,
        file: null,
      });
    },
    onError: (error) => {
      toast.error(`Failed to create campaign: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createCampaignMutation.mutate(form);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Advertisement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Campaign Name</Label>
                <Input
                  placeholder="Enter campaign name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Budget (ETH)</Label>
                <div className="relative">
                  {(BigInt(form.tags.length) *
                    BigInt(Number(form.viewCount?.value || 0)) *
                    BigInt(1000)) /
                    BigInt(10 ** 18)}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Target Tags</Label>
                <Select
                  isMulti
                  value={form.tags}
                  onChange={(newValue) =>
                    setForm((prev) => ({
                      ...prev,
                      tags: newValue as Array<{ value: string; label: string }>,
                    }))
                  }
                  options={tagOptions.map((tag) => ({
                    value: tag.value.toString(),
                    label: tag.label,
                  }))}
                  styles={customSelectStyles}
                  placeholder="Select or create tags"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>View Count Target</Label>
                <Select
                  value={form.viewCount}
                  onChange={(newValue) =>
                    setForm((prev) => ({
                      ...prev,
                      viewCount: newValue as { value: string; label: string },
                    }))
                  }
                  options={viewCountOptions}
                  styles={customSelectStyles}
                  placeholder="Select target view counts"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Advertisement Content</Label>
              <Card
                className={`bg-zinc-900/50 border-dashed cursor-pointer transition-colors
                  ${isDragActive ? "border-primary" : ""}`}
                {...getRootProps()}
              >
                <CardContent className="p-6">
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    {form.file ? (
                      <p className="text-sm text-muted-foreground">
                        Selected: {form.file.name}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {isDragActive
                          ? "Drop the file here"
                          : "Drag and drop your ad content here, or click to upload"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <UIButton
              variant="primary"
              className="w-full"
              type="submit"
              disabled={createCampaignMutation.isPending || !form.file}
            >
              {createCampaignMutation.isPending
                ? "Creating Campaign..."
                : "Create Campaign"}
            </UIButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
