"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Building,
  Phone,
  AlertCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  AwaitedReactNode,
  Key,
  ReactPortal,
} from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const fetchTransfers = async (walletAddress: string) => {
  const response = await fetch(
    `https://base-sepolia.blockscout.com/api/v2/addresses/${walletAddress}/token-transfers?type=ERC-20&filter=to&token=0x87DaDbc6636DF9507Ee59e0f6068b785969420D0`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch transfers");
  }
  return response.json();
};

const formatValue = (value: string, decimals: string) => {
  const numeric = parseInt(value) / Math.pow(10, parseInt(decimals));
  return numeric.toLocaleString();
};

const formatDate = (timestamp: string | number | Date) => {
  return new Date(timestamp).toLocaleString();
};

const TransferList = ({ transfers }: { transfers: any }) => (
  <div className="space-y-4">
    {transfers.map(
      (transfer: {
        transaction_hash:
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | Promise<AwaitedReactNode>
          | Key
          | null
          | undefined;
        total: { value: any; decimals: any };
        token: {
          symbol:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<AwaitedReactNode>
            | null
            | undefined;
        };
        timestamp: any;
      }) => (
        <div
          key={transfer.transaction_hash as string}
          className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Amount:</span>{" "}
              <span className="font-medium">
                {formatValue(transfer.total.value, transfer.total.decimals)}{" "}
                {transfer.token.symbol}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Date:</span>{" "}
              <span className="font-medium">
                {formatDate(transfer.timestamp)}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Tx Hash:</span>{" "}
              <span className="font-medium break-all">
                {transfer.transaction_hash}
              </span>
            </div>
          </div>
        </div>
      )
    )}
  </div>
);

export const ProfileView = () => {
  const { primaryWallet } = useDynamicContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["transfers", primaryWallet?.address],
    queryFn: () => fetchTransfers(primaryWallet?.address!),
    staleTime: 30000,
    refetchInterval: 60000,
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="John Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Company Name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>
          <Button variant="primary" className="w-full">
            Update Profile
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Token Transfer History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Loading transfers...</span>
            </div>
          ) : isError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error?.message || "Failed to load transfers"}
              </AlertDescription>
            </Alert>
          ) : data?.items?.length === 0 ? (
            <div className="text-center text-sm py-4 text-muted-foreground flex justify-center items-center gap-2">
              <AlertTriangle className="size-3.5" />
              No transfers found
            </div>
          ) : (
            <TransferList transfers={data.items} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;
