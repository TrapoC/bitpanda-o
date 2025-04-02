Deno.serve(async (req) => {
  try {
    const { trackingNumber } = await req.json();
    
    // Validate required fields
    if (!trackingNumber) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required field: trackingNumber" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }
    
    // In a real application, this would query a database
    // For demo purposes, we'll generate mock data based on the tracking number
    
    // Check if it's a valid format (GSS-YYYYMMDD-XXXXX)
    const isValidFormat = /^GSS-\d{8}-\d{5}$/.test(trackingNumber);
    
    if (!isValidFormat && trackingNumber !== "GSS1234567890") {
      return new Response(
        JSON.stringify({ 
          error: "Invalid tracking number format" 
        }),
        { 
          status: 404, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }
    
    // Extract date from tracking number or use demo data
    let shipmentDate;
    let updates = [];
    let status;
    
    if (trackingNumber === "GSS1234567890") {
      // Demo tracking number
      shipmentDate = new Date(2023, 5, 1); // June 1, 2023
      status = "in-transit";
      
      updates = [
        {
          id: "u1",
          shipmentId: "1",
          status: "pending",
          location: "New York Warehouse",
          timestamp: "2023-06-01T10:00:00Z",
          description: "Package received at origin facility"
        },
        {
          id: "u2",
          shipmentId: "1",
          status: "in-transit",
          location: "JFK International Airport",
          timestamp: "2023-06-03T14:30:00Z",
          description: "Package departed from origin airport"
        },
        {
          id: "u3",
          shipmentId: "1",
          status: "in-transit",
          location: "Heathrow Airport",
          timestamp: "2023-06-04T08:15:00Z",
          description: "Package arrived at destination airport"
        }
      ];
    } else {
      // Extract date from tracking number (GSS-YYYYMMDD-XXXXX)
      const dateStr = trackingNumber.split('-')[1];
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1;
      const day = parseInt(dateStr.substring(6, 8));
      
      shipmentDate = new Date(year, month, day);
      
      // Generate random status based on date
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - shipmentDate.getTime()) / (1000 * 3600 * 24));
      
      if (daysDiff < 1) {
        status = "pending";
        updates = [
          {
            id: crypto.randomUUID(),
            shipmentId: crypto.randomUUID(),
            status: "pending",
            location: "Origin Warehouse",
            timestamp: shipmentDate.toISOString(),
            description: "Shipment registered in system"
          }
        ];
      } else if (daysDiff < 3) {
        status = "in-transit";
        updates = [
          {
            id: crypto.randomUUID(),
            shipmentId: crypto.randomUUID(),
            status: "pending",
            location: "Origin Warehouse",
            timestamp: shipmentDate.toISOString(),
            description: "Shipment registered in system"
          },
          {
            id: crypto.randomUUID(),
            shipmentId: crypto.randomUUID(),
            status: "in-transit",
            location: "Departure Facility",
            timestamp: new Date(shipmentDate.getTime() + 86400000).toISOString(),
            description: "Package processed and in transit"
          }
        ];
      } else {
        status = "delivered";
        updates = [
          {
            id: crypto.randomUUID(),
            shipmentId: crypto.randomUUID(),
            status: "pending",
            location: "Origin Warehouse",
            timestamp: shipmentDate.toISOString(),
            description: "Shipment registered in system"
          },
          {
            id: crypto.randomUUID(),
            shipmentId: crypto.randomUUID(),
            status: "in-transit",
            location: "Departure Facility",
            timestamp: new Date(shipmentDate.getTime() + 86400000).toISOString(),
            description: "Package processed and in transit"
          },
          {
            id: crypto.randomUUID(),
            shipmentId: crypto.randomUUID(),
            status: "in-transit",
            location: "Transit Hub",
            timestamp: new Date(shipmentDate.getTime() + 172800000).toISOString(),
            description: "Package arrived at transit hub"
          },
          {
            id: crypto.randomUUID(),
            shipmentId: crypto.randomUUID(),
            status: "delivered",
            location: "Destination",
            timestamp: new Date(shipmentDate.getTime() + 259200000).toISOString(),
            description: "Package delivered to recipient"
          }
        ];
      }
    }
    
    // Create a shipment object
    const shipment = {
      id: crypto.randomUUID(),
      trackingNumber,
      origin: "New York, USA",
      destination: "London, UK",
      status,
      estimatedDelivery: new Date(shipmentDate.getTime() + 604800000).toISOString(), // 7 days after shipment
      actualDelivery: status === "delivered" ? new Date(shipmentDate.getTime() + 518400000).toISOString() : null, // 6 days after shipment if delivered
      userId: "system",
      createdAt: shipmentDate.toISOString(),
      updates
    };
    
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
    console.error("Error tracking shipment:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to track shipment" 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
});