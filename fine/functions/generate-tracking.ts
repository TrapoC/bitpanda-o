Deno.serve(async (req) => {
  try {
    const { origin, destination, userId } = await req.json();
    
    // Validate required fields
    if (!origin || !destination || !userId) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: origin, destination, and userId are required" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }
    
    // Generate a unique tracking number
    // Format: GSS-YYYYMMDD-XXXXX (where XXXXX is a random 5-digit number)
    const today = new Date();
    const dateStr = today.getFullYear().toString() +
                   (today.getMonth() + 1).toString().padStart(2, '0') +
                   today.getDate().toString().padStart(2, '0');
    
    const randomPart = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const trackingNumber = `GSS-${dateStr}-${randomPart}`;
    
    // Create a shipment object
    const shipment = {
      id: crypto.randomUUID(),
      trackingNumber,
      origin,
      destination,
      status: "pending",
      estimatedDelivery: new Date(today.setDate(today.getDate() + 7)).toISOString(),
      userId,
      createdAt: new Date().toISOString(),
      updates: [
        {
          id: crypto.randomUUID(),
          shipmentId: crypto.randomUUID(),
          status: "pending",
          location: origin,
          timestamp: new Date().toISOString(),
          description: "Shipment created and pending processing"
        }
      ]
    };
    
    // In a real application, this would be saved to a database
    
    // Return the shipment data
    return new Response(
      JSON.stringify({ 
        success: true, 
        shipment 
      }),
      { 
        headers: { "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error generating tracking number:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate tracking number" 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
});