import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useShipmentStore } from "@/lib/stores/shipment-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, Plus, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export function ShipmentList() {
  const { user } = useAuthStore();
  const { shipments, fetchShipments, isLoading } = useShipmentStore();

  useEffect(() => {
    if (user) {
      fetchShipments(user.id);
    }
  }, [user, fetchShipments]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>;
      case "in-transit":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Transit</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Pending</Badge>;
      case "delayed":
        return <Badge className="bg-red-500 hover:bg-red-600">Delayed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading your shipments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Your Shipments</h2>
          <p className="text-muted-foreground">Manage and track all your shipments</p>
        </div>
        <Button asChild>
          <Link to="/create-shipment" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            New Shipment
          </Link>
        </Button>
      </div>

      {shipments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No shipments yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              You haven't created any shipments yet. Create your first shipment to get started.
            </p>
            <Button asChild>
              <Link to="/create-shipment">Create Shipment</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {shipments.map((shipment) => (
            <Card key={shipment.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center">
                      <Package className="mr-2 h-5 w-5" />
                      {shipment.trackingNumber}
                    </CardTitle>
                    <CardDescription>
                      Created on {format(new Date(shipment.createdAt), "PPP")}
                    </CardDescription>
                  </div>
                  <div>{getStatusBadge(shipment.status)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{shipment.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium">{shipment.destination}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-medium">{format(new Date(shipment.estimatedDelivery), "PPP")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Update</p>
                    <p className="font-medium">
                      {shipment.updates.length > 0
                        ? format(new Date(shipment.updates[0].timestamp), "PPP")
                        : "No updates yet"}
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link to={`/tracking?number=${shipment.trackingNumber}`} className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Tracking Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}