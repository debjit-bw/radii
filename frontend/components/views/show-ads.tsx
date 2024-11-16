"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const adSpaces = [
  {
    id: 1,
    name: "Homepage Banner",
    size: "728x90",
    available: true,
    price: "$50/day",
    views: "15K-20K",
  },
  {
    id: 2,
    name: "Sidebar Premium",
    size: "300x600",
    available: true,
    price: "$40/day",
    views: "10K-15K",
  },
  {
    id: 3,
    name: "Content Native",
    size: "600x400",
    available: false,
    price: "$45/day",
    views: "12K-18K",
  },
];

export const ShowAdsView = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Available Ad Spaces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adSpaces.map((space) => (
              <Card key={space.id} className="bg-zinc-900/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">{space.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {space.size}
                      </p>
                    </div>
                    <Badge
                      variant={space.available ? "default" : "destructive"}
                      className={
                        space.available
                          ? `bg-green-950 text-green-400 rounded-full`
                          : `bg-red-950 text-red-400 rounded-full`
                      }
                    >
                      {space.available ? "Available" : "Taken"}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span>{space.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Views:</span>
                      <span>{space.views}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
