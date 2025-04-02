import { Shield, Clock, BarChart4, Globe, Smartphone, HeadphonesIcon } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Secure Shipping",
      description: "End-to-end security for your valuable shipments with insurance options and secure handling."
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Track your shipments in real-time with detailed updates and estimated delivery times."
    },
    {
      icon: BarChart4,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and reporting tools to optimize your shipping operations."
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Extensive network covering over 200 countries and territories worldwide."
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Manage your shipments on the go with our intuitive mobile application."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with any shipping inquiries."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ShipEx</h2>
          <p className="text-lg text-muted-foreground">
            We combine cutting-edge technology with logistics expertise to provide you with the best shipping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}