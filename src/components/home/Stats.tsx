export function Stats() {
  const stats = [
    { value: "10M+", label: "Packages Delivered" },
    { value: "99.8%", label: "On-time Delivery" },
    { value: "200+", label: "Countries Served" },
    { value: "24/7", label: "Customer Support" }
  ];

  return (
    <section className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}