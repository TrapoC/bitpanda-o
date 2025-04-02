import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/tracking?number=${trackingNumber.trim()}`);
    }
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2000&auto=format&fit=crop"
          alt="Shipping background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Global Shipping Solutions for Your Business
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              Reliable, efficient, and secure shipping services worldwide. Track your shipments in real-time and manage your logistics with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/auth?tab=register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Track Your Shipment</h2>
            <form onSubmit={handleTrackingSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-gray-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
              </div>
              <Button type="submit" className="w-full">
                Track Now
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Example tracking number: GSS1234567890
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}