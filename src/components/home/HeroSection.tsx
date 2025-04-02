import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HeroSectionProps {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  handleTrackingSubmit: (e: React.FormEvent) => void;
}

export function HeroSection({
  trackingNumber,
  setTrackingNumber,
  handleTrackingSubmit,
}: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-900/80 mix-blend-multiply" />
        <img
          src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Shipping and logistics"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Global Shipping Solutions for Modern Business
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Fast, reliable, and secure shipping services for businesses of all sizes.
            Track your shipments in real-time and manage your logistics with ease.
          </p>

          {/* Tracking Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8">
            <form onSubmit={handleTrackingSubmit} className="flex flex-col md:flex-row gap-3">
              <div className="flex-grow">
                <Input
                  type="text"
                  placeholder="Enter your tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="h-12 bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                <Search className="mr-2 h-5 w-5" />
                Track
              </Button>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}