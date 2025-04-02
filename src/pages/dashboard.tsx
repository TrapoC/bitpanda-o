import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ShipmentList } from "@/components/dashboard/shipment-list";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || "User"}
            </p>
          </div>
          
          <div className="space-y-10">
            <DashboardStats />
            <ShipmentList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}