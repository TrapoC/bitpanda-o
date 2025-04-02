// Backend function to handle contact form submissions
Deno.serve(async (req) => {
  try {
    const formData = await req.json();
    
    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message"];
    
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
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Invalid email format" 
        }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    // In a real application, this would save to a database and/or send an email
    // For demo purposes, we'll just log the data and return a success response
    console.log("Contact form submission:", formData);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your message has been sent successfully. We'll get back to you soon." 
      }),
      { 
        headers: { "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error("Error processing contact form:", error);
    
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