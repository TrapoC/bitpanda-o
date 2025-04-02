import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface CreateShipmentFormProps {
  onSuccess: (shipment: any) => void;
}

export function CreateShipmentForm({ onSuccess }: CreateShipmentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    packageType: "parcel",
    weight: "",
    dimensions: "",
    description: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For demo purposes, we'll simulate a successful response
      // In a real application, this would call the backend API
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock shipment
      const mockShipment = {
        id: crypto.randomUUID(),
        trackingNumber: `SHPEX-${Math.floor(10000000 + Math.random() * 90000000)}`,
        origin: formData.senderAddress.split(',')[0],
        destination: formData.recipientAddress.split(',')[0],
        status: "Processing",
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        senderInfo: {
          name: formData.senderName,
          email: formData.senderEmail,
          phone: formData.senderPhone,
          address: formData.senderAddress
        },
        recipientInfo: {
          name: formData.recipientName,
          email: formData.recipientEmail,
          phone: formData.recipientPhone,
          address: formData.recipientAddress
        },
        packageInfo: {
          type: formData.packageType,
          weight: formData.weight,
          dimensions: formData.dimensions,
          description: formData.description
        }
      };

      onSuccess(mockShipment);
      
      // Reset form
      setFormData({
        senderName: "",
        senderEmail: "",
        senderPhone: "",
        senderAddress: "",
        recipientName: "",
        recipientEmail: "",
        recipientPhone: "",
        recipientAddress: "",
        packageType: "parcel",
        weight: "",
        dimensions: "",
        description: "",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create shipment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Sender Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senderName">Name</Label>
                <Input
                  id="senderName"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderEmail">Email</Label>
                <Input
                  id="senderEmail"
                  name="senderEmail"
                  type="email"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderPhone">Phone</Label>
                <Input
                  id="senderPhone"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderAddress">Address</Label>
                <Textarea
                  id="senderAddress"
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Recipient Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Name</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Email</Label>
                <Input
                  id="recipientEmail"
                  name="recipientEmail"
                  type="email"
                  value={formData.recipientEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientPhone">Phone</Label>
                <Input
                  id="recipientPhone"
                  name="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientAddress">Address</Label>
                <Textarea
                  id="recipientAddress"
                  name="recipientAddress"
                  value={formData.recipientAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Package Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="packageType">Package Type</Label>
            <Select
              value={formData.packageType}
              onValueChange={(value) => handleSelectChange("packageType", value)}
            >
              <SelectTrigger id="packageType">
                <SelectValue placeholder="Select package type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="parcel">Parcel</SelectItem>
                <SelectItem value="pallet">Pallet</SelectItem>
                <SelectItem value="freight">Freight</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              min="0.1"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
            <Input
              id="dimensions"
              name="dimensions"
              placeholder="e.g., 30 x 20 x 10"
              value={formData.dimensions}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Package Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe the contents of your package"
              required
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Creating Shipment...
          </>
        ) : (
          "Create Shipment"
        )}
      </Button>
    </form>
  );
}