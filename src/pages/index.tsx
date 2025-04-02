import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { Services } from "@/components/home/Services";
import { Stats } from "@/components/home/Stats";
import { HeroSection } from "@/components/home/HeroSection";

const Index = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTrackingSubmit = (e: React.FormEvent) => {
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
      
      <main className="flex-grow">
        <HeroSection 
          trackingNumber={trackingNumber}
          setTrackingNumber={setTrackingNumber}
          handleTrackingSubmit={handleTrackingSubmit}
        />
        
        <Services />
        
        <Features />
        
        <Stats />
        
        <Testimonials />
        
        <section className="bg-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship with Confidence?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of businesses that trust us with their shipping needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="px-8">
                  <Link to="/signup">Create Account</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;