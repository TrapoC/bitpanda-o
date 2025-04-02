// Backend function to handle shipment creation
Deno.serve(async (req) => {
  try {
    const formData = await req.json();
    
    // Validate required fields
    const requiredFields = [
      "senderName", "senderEmail", "senderPhone", "senderAddress",
      "recipientName", "recipientEmail", "recipientPhone", "recipientAddress",
      "packageType", "weight", "dimensions", "description"
    ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: `${field} is required` 
          }),
          { 
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    }
    
    // Generate a unique tracking number
    const trackingNumber = generateTrackingNumber();
    
    // In a real application, this would save to a database
    // For demo purposes, we'll just return a success response with the generated tracking number
    
    // Create a mock shipment object
    const shipment = {
      id: crypto.randomUUID(),
      trackingNumber,
      origin: formData.senderAddress.split(',')[0],
      destination: formData.recipientAddress.split(',')[0],
      status: "Processing",
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      createdAt: new Date().toISOString(),
      senderInfo: {
        name: formData.senderName,
        email: formData.senderEmail,
        phone: formData.senderPhone,
        address: formData.senderAddress
      },
      recipientInfo: {
        name: formData.recipientName,
        email: formData.recipientEmail,
        phone: formData.recipientPhone,
        address: formData.recipientAddress
      },
      packageInfo: {
        type: formData.packageType,
        weight: formData.weight,
        dimensions: formData.dimensions,
        description: formData.description
      }
    };
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Shipment created successfully",
        shipment
      }),
      { 
        headers: { "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error("Error creating shipment:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "An error occurred while creating the shipment" 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
});

// Helper function to generate a unique tracking number
function generateTrackingNumber() {
  // Format: SHPEX-XXXXXXXX (where X is a digit)
  const prefix = "SHPEX-";
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000).toString();
  return prefix + randomDigits;
}