import { Truck, Ship, Plane, Package, BarChart, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Services() {
  const services = [
    {
      icon: Truck,
      title: "Road Freight",
      description: "Efficient road transportation solutions for local and national deliveries with real-time tracking."
    },
    {
      icon: Ship,
      title: "Ocean Freight",
      description: "Reliable sea freight services for international shipping with competitive rates and flexible options."
    },
    {
      icon: Plane,
      title: "Air Freight",
      description: "Express air freight services for time-sensitive shipments with global coverage and priority handling."
    },
    {
      icon: Package,
      title: "Warehousing",
      description: "Secure storage solutions with inventory management and distribution services for your goods."
    },
    {
      icon: BarChart,
      title: "Supply Chain",
      description: "End-to-end supply chain management with optimization strategies and performance analytics."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access to our worldwide network of partners and agents for seamless international logistics."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Shipping Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive logistics solutions tailored to your business needs with global reach and local expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}