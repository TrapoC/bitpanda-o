import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ShipmentForm } from "@/components/shipment/shipment-form";

export default function CreateShipmentPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Create New Shipment</h1>
            <ShipmentForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}