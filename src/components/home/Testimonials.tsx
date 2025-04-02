import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "ShipEx has transformed our logistics operations. Their real-time tracking and reliable delivery have significantly improved our customer satisfaction.",
      author: "Sarah Johnson",
      role: "Operations Director, TechCorp",
      avatar: "SJ"
    },
    {
      quote: "We've been using ShipEx for our international shipping needs for over 3 years. Their global network and customs expertise have made expansion into new markets seamless.",
      author: "Michael Chen",
      role: "CEO, Global Traders Inc.",
      avatar: "MC"
    },
    {
      quote: "The customer service at ShipEx is exceptional. They've gone above and beyond to ensure our time-sensitive deliveries arrive on schedule, every time.",
      author: "Emma Rodriguez",
      role: "Logistics Manager, FastRetail",
      avatar: "ER"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what businesses like yours have to say about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                <p className="mb-6 text-lg">{testimonial.quote}</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${index}`} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}