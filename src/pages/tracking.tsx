import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackingResult } from "@/components/tracking/TrackingResult";
import { Loader2, Search } from "lucide-react";

const TrackingPage = () => {
  const { trackingNumber: urlTrackingNumber } = useParams<{ trackingNumber?: string }>();
  const [trackingNumber, setTrackingNumber] = useState(urlTrackingNumber || "");
  const [isLoading, setIsLoading] = useState(false);
  const [shipment, setShipment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchTrackingInfo = async (trackingNum: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll create a mock response if the backend isn't available
      // In a real application, this would call the backend API
      
      // Mock tracking data for demo
      const mockShipment = {
        trackingNumber: trackingNum,
        status: "In Transit",
        origin: "New York, NY, USA",
        destination: "Los Angeles, CA, USA",
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        customer: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567"
        },
        updates: [
          {
            status: "Processing",
            location: "New York Sorting Facility, NY",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            description: "Shipment has been processed and is ready for dispatch.",
            completed: true
          },
          {
            status: "In Transit",
            location: "Chicago Distribution Center, IL",
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            description: "Shipment is in transit to the next facility.",
            completed: true
          }
        ]
      };
      
      setShipment(mockShipment);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to fetch tracking information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (urlTrackingNumber) {
      fetchTrackingInfo(urlTrackingNumber);
    }
  }, [urlTrackingNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking number",
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/tracking/${trackingNumber}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Track Your Shipment</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                <div className="flex-grow">
                  <Input
                    type="text"
                    placeholder="Enter your tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-8" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Track
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="bg-destructive/10 text-destructive p-6 rounded-lg text-center">
                <p className="text-lg font-medium">{error}</p>
                <p className="mt-2">Please check your tracking number and try again.</p>
              </div>
            ) : shipment ? (
              <TrackingResult shipment={shipment} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Enter your tracking number to see shipment details.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackingPage;