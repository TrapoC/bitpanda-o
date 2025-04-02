import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, CheckCircle, AlertCircle, Clock, MapPin } from "lucide-react";
import { useShipmentStore, type Shipment, type ShipmentUpdate } from "@/lib/stores/shipment-store";

interface TrackingResultProps {
  trackingNumber: string;
}

export function TrackingResult({ trackingNumber }: TrackingResultProps) {
  const { fetchShipmentByTracking, currentShipment, isLoading, error } = useShipmentStore();
  const [shipment, setShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    const loadShipment = async () => {
      const result = await fetchShipmentByTracking(trackingNumber);
      if (result) {
        setShipment(result);
      }
    };

    loadShipment();
  }, [trackingNumber, fetchShipmentByTracking]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading shipment information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertCircle className="h-5 w-5 mr-2" />
            Tracking Error
          </CardTitle>
          <CardDescription>
            We couldn't find information for the tracking number: {trackingNumber}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please check the tracking number and try again, or contact customer support if you need assistance.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!shipment) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "in-transit":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "delayed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Shipment {shipment.trackingNumber}</CardTitle>
              <CardDescription>
                From {shipment.origin} to {shipment.destination}
              </CardDescription>
            </div>
            <div>{getStatusBadge(shipment.status)}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Shipment Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin:</span>
                  <span className="font-medium">{shipment.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destination:</span>
                  <span className="font-medium">{shipment.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">{formatDate(shipment.createdAt)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Delivery Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium capitalize">{shipment.status.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Delivery:</span>
                  <span className="font-medium">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</span>
                </div>
                {shipment.actualDelivery && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Actual Delivery:</span>
                    <span className="font-medium">{new Date(shipment.actualDelivery).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-6">Tracking History</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3.5 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="space-y-8">
            {shipment.updates.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((update, index) => (
              <div key={update.id} className="relative pl-10">
                {/* Timeline dot */}
                <div className={`absolute left-0 top-1.5 h-7 w-7 rounded-full border-4 border-white dark:border-gray-900 ${getStatusColor(update.status)} flex items-center justify-center`}>
                  {update.status === "delivered" ? (
                    <CheckCircle className="h-3 w-3 text-white" />
                  ) : update.status === "in-transit" ? (
                    <Package className="h-3 w-3 text-white" />
                  ) : (
                    <Clock className="h-3 w-3 text-white" />
                  )}
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h4 className="font-medium">{update.status.charAt(0).toUpperCase() + update.status.slice(1).replace('-', ' ')}</h4>
                    <span className="text-sm text-muted-foreground">{formatDate(update.timestamp)}</span>
                  </div>
                  <p className="text-muted-foreground mb-2">{update.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {update.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}