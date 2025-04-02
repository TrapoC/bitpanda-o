import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Global Retail Inc.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: "GlobalShip has transformed our logistics operations. Their tracking system is incredibly accurate, and their customer service is exceptional. We've reduced shipping times by 30%."
    },
    {
      name: "Michael Chen",
      company: "Tech Innovations Ltd.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      quote: "As an e-commerce business, reliable shipping is crucial for us. GlobalShip has been a game-changer with their transparent tracking and consistent delivery times."
    },
    {
      name: "Emily Rodriguez",
      company: "Artisan Exports",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      quote: "We ship delicate handcrafted items worldwide, and GlobalShip handles them with the utmost care. Their international shipping expertise has helped us expand to new markets."
    },
    {
      name: "David Thompson",
      company: "Medical Supplies Co.",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      quote: "For time-sensitive medical supplies, we need a shipping partner we can trust. GlobalShip's expedited services and real-time tracking give us peace of mind."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground">
            Trusted by businesses worldwide for reliable shipping and logistics solutions.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <Card className="border-none shadow-md h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-6 flex-grow">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative mr-2" />
            <CarouselNext className="relative ml-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}