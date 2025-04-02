// Backend function to handle fetching user shipments
Deno.serve(async (req) => {
  try {
    // In a real application, this would query a database for the user's shipments
    // For demo purposes, we'll generate mock data
    
    // Generate 5 mock shipments
    const shipments = [];
    const statuses = ["Processing", "In Transit", "Out for Delivery", "Delivered", "Delayed"];
    
    for (let i = 0; i < 5; i++) {
      const trackingNumber = `SHPEX-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      shipments.push({
        id: crypto.randomUUID(),
        trackingNumber,
        origin: "New York, NY",
        destination: "Los Angeles, CA",
        status,
        estimatedDelivery: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000).toISOString()
      });
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        shipments 
      }),
      { 
        headers: { "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error("Error fetching shipments:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "An error occurred while fetching shipments" 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
});