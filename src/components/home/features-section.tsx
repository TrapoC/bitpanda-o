import { Clock, Shield, Globe, TrendingUp } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Monitor your shipments in real-time with accurate location updates and estimated delivery times."
    },
    {
      icon: Shield,
      title: "Secure Shipping",
      description: "Advanced security measures to ensure your packages are protected throughout the shipping journey."
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Extensive network covering over 200 countries and territories for worldwide shipping solutions."
    },
    {
      icon: TrendingUp,
      title: "Efficient Logistics",
      description: "Optimized routes and processes to ensure timely delivery and cost-effective shipping."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GlobalShip</h2>
          <p className="text-lg text-muted-foreground">
            We combine technology, expertise, and reliability to provide exceptional shipping experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop" 
                  alt="Shipping logistics" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-lg hidden md:flex items-center justify-center">
                <span className="text-white text-lg font-bold">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}