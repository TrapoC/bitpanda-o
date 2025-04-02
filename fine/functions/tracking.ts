// Backend function to handle tracking requests
Deno.serve(async (req) => {
  try {
    const { tracking } = await req.json();
    
    if (!tracking) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Tracking number is required" 
        }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    // In a real application, this would query a database
    // For demo purposes, we'll generate mock data based on the tracking number
    
    // Check if tracking number follows our format (SHPEX-XXXXXXXX)
    const isValidFormat = /^SHPEX-\d{8}$/.test(tracking);
    
    if (!isValidFormat) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Invalid tracking number format" 
        }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    // Generate deterministic but random-looking data based on the tracking number
    const numericPart = parseInt(tracking.split('-')[1]);
    const randomSeed = numericPart % 5; // Use modulo to get 0-4 for different statuses
    
    // Define possible statuses
    const statuses = ["Processing", "In Transit", "Out for Delivery", "Delivered", "Delayed"];
    const status = statuses[randomSeed];
    
    // Generate mock shipment data
    const shipment = {
      trackingNumber: tracking,
      status: status,
      origin: "New York, NY, USA",
      destination: "Los Angeles, CA, USA",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567"
      },
      updates: generateShipmentUpdates(tracking, status)
    };
    
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
    console.error("Error processing tracking request:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "An error occurred while processing your request" 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
});

// Helper function to generate shipment updates
function generateShipmentUpdates(tracking: string, currentStatus: string) {
  const updates = [];
  const now = new Date();
  
  // Order of statuses in shipping process
  const statusSequence = ["Processing", "In Transit", "Out for Delivery", "Delivered"];
  const currentStatusIndex = statusSequence.indexOf(currentStatus);
  
  // If status is "Delayed", handle differently
  if (currentStatus === "Delayed") {
    updates.push({
      status: "Processing",
      location: "New York Sorting Facility, NY",
      timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Shipment has been processed and is ready for dispatch.",
      completed: true
    });
    
    updates.push({
      status: "In Transit",
      location: "Chicago Distribution Center, IL",
      timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Shipment is in transit to the next facility.",
      completed: true
    });
    
    updates.push({
      status: "Delayed",
      location: "Denver Sorting Facility, CO",
      timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      description: "Shipment has been delayed due to weather conditions.",
      completed: true
    });
    
    return updates;
  }
  
  // Generate updates for normal shipping process
  for (let i = 0; i <= currentStatusIndex; i++) {
    const status = statusSequence[i];
    let location, description;
    
    switch (status) {
      case "Processing":
        location = "New York Sorting Facility, NY";
        description = "Shipment has been processed and is ready for dispatch.";
        break;
      case "In Transit":
        location = "Chicago Distribution Center, IL";
        description = "Shipment is in transit to the next facility.";
        break;
      case "Out for Delivery":
        location = "Los Angeles Distribution Center, CA";
        description = "Shipment is out for delivery to the recipient.";
        break;
      case "Delivered":
        location = "Los Angeles, CA";
        description = "Shipment has been delivered to the recipient.";
        break;
    }
    
    updates.push({
      status,
      location,
      timestamp: new Date(now.getTime() - (currentStatusIndex - i) * 24 * 60 * 60 * 1000).toISOString(),
      description,
      completed: true
    });
  }
  
  return updates;
}