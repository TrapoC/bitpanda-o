import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { fine } from "@/lib/fine";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShipmentList } from "@/components/dashboard/ShipmentList";
import { CreateShipmentForm } from "@/components/dashboard/CreateShipmentForm";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { Loader2, Package, User, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProtectedRoute } from "@/components/auth/route-components";

const DashboardContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shipments, setShipments] = useState([]);
  const { toast } = useToast();
  const { data: session } = fine.auth.useSession();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        // Call to backend function to get user's shipments
        const response = await fetch("/api/shipments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch shipments");
        }
        
        setShipments(data.shipments);
      } catch (err) {
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Failed to fetch shipments",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipments();
  }, [toast]);

  const handleCreateShipment = (newShipment: any) => {
    setShipments((prev) => [newShipment, ...prev]);
    toast({
      title: "Shipment Created",
      description: `Tracking number: ${newShipment.trackingNumber}`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session?.user?.name || "User"}
            </p>
          </div>
          
          <Tabs defaultValue="shipments" className="space-y-8">
            <TabsList>
              <TabsTrigger value="shipments" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Shipments
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Create Shipment
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="shipments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Shipments</CardTitle>
                  <CardDescription>
                    View and manage all your shipments in one place.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <ShipmentList shipments={shipments} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Shipment</CardTitle>
                  <CardDescription>
                    Fill in the details to create a new shipment and get a tracking number.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateShipmentForm onSuccess={handleCreateShipment} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>
                    Manage your personal information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserProfile />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This section is under development. Check back soon for more options.
                  </p>
                  <Button variant="outline">Change Password</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const Dashboard = () => {
  return <ProtectedRoute Component={DashboardContent} />;
};

export default Dashboard;