import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, MapPin, Package, Truck } from "lucide-react";

interface ShipmentUpdate {
  status: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

interface Shipment {
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  updates: ShipmentUpdate[];
}

interface TrackingResultProps {
  shipment: Shipment;
}

export function TrackingResult({ shipment }: TrackingResultProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500 hover:bg-green-600";
      case "in transit":
        return "bg-blue-500 hover:bg-blue-600";
      case "processing":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "pending":
        return "bg-orange-500 hover:bg-orange-600";
      case "delayed":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Shipment Details</CardTitle>
              <p className="text-muted-foreground mt-1">Tracking Number: {shipment.trackingNumber}</p>
            </div>
            <Badge className={`${getStatusColor(shipment.status)} text-white px-4 py-1 text-sm`}>
              {shipment.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-muted-foreground mb-2">Shipment Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Origin</p>
                    <p className="text-muted-foreground">{shipment.origin}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Destination</p>
                    <p className="text-muted-foreground">{shipment.destination}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-muted-foreground">{formatDate(shipment.estimatedDelivery)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground mb-2">Customer Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Name</p>
                  <p className="text-muted-foreground">{shipment.customer.name}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{shipment.customer.email}</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{shipment.customer.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tracking History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-3.5 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            
            <div className="space-y-8">
              {shipment.updates.map((update, index) => (
                <div key={index} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-0.5 h-7 w-7 rounded-full border-2 border-white flex items-center justify-center ${
                    update.completed ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                  }`}>
                    {update.completed ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                      <h3 className="font-semibold">{update.status}</h3>
                      <time className="text-sm text-muted-foreground">{formatDate(update.timestamp)}</time>
                    </div>
                    <p className="text-muted-foreground mb-1">{update.location}</p>
                    <p>{update.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}