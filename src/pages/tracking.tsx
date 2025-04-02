import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TrackingForm } from "@/components/tracking/tracking-form";
import { TrackingResult } from "@/components/tracking/tracking-result";

export default function TrackingPage() {
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);

  useEffect(() => {
    const number = searchParams.get("number");
    if (number) {
      setTrackingNumber(number);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Track Your Shipment</h1>
            
            {!trackingNumber ? (
              <TrackingForm />
            ) : (
              <div className="space-y-8">
                <TrackingForm />
                <TrackingResult trackingNumber={trackingNumber} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}