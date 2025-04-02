import { create } from "zustand";

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: "pending" | "in-transit" | "delivered" | "delayed";
  estimatedDelivery: string;
  actualDelivery?: string;
  userId: string;
  createdAt: string;
  updates: ShipmentUpdate[];
}

export interface ShipmentUpdate {
  id: string;
  shipmentId: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

interface ShipmentState {
  shipments: Shipment[];
  currentShipment: Shipment | null;
  isLoading: boolean;
  error: string | null;
  fetchShipments: (userId: string) => Promise<void>;
  fetchShipmentByTracking: (trackingNumber: string) => Promise<Shipment | null>;
  createShipment: (shipmentData: Omit<Shipment, "id" | "trackingNumber" | "createdAt" | "updates">) => Promise<Shipment>;
}

// Mock data
const mockShipments: Shipment[] = [
  {
    id: "1",
    trackingNumber: "GSS1234567890",
    origin: "New York, USA",
    destination: "London, UK",
    status: "in-transit",
    estimatedDelivery: "2023-06-15",
    userId: "1",
    createdAt: "2023-06-01",
    updates: [
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
    ]
  },
  {
    id: "2",
    trackingNumber: "GSS9876543210",
    origin: "Tokyo, Japan",
    destination: "Sydney, Australia",
    status: "delivered",
    estimatedDelivery: "2023-05-20",
    actualDelivery: "2023-05-19",
    userId: "1",
    createdAt: "2023-05-10",
    updates: [
      {
        id: "u4",
        shipmentId: "2",
        status: "pending",
        location: "Tokyo Warehouse",
        timestamp: "2023-05-10T09:00:00Z",
        description: "Package received at origin facility"
      },
      {
        id: "u5",
        shipmentId: "2",
        status: "in-transit",
        location: "Narita International Airport",
        timestamp: "2023-05-12T11:45:00Z",
        description: "Package departed from origin airport"
      },
      {
        id: "u6",
        shipmentId: "2",
        status: "in-transit",
        location: "Sydney Airport",
        timestamp: "2023-05-13T07:30:00Z",
        description: "Package arrived at destination airport"
      },
      {
        id: "u7",
        shipmentId: "2",
        status: "delivered",
        location: "Sydney Distribution Center",
        timestamp: "2023-05-19T14:20:00Z",
        description: "Package delivered to recipient"
      }
    ]
  }
];

export const useShipmentStore = create<ShipmentState>((set, get) => ({
  shipments: [],
  currentShipment: null,
  isLoading: false,
  error: null,

  fetchShipments: async (userId) => {
    try {
      set({ isLoading: true, error: null });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter shipments by userId
      const userShipments = mockShipments.filter(shipment => shipment.userId === userId);
      set({ shipments: userShipments, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch shipments", isLoading: false });
    }
  },

  fetchShipmentByTracking: async (trackingNumber) => {
    try {
      set({ isLoading: true, error: null, currentShipment: null });
      
      // Try to fetch from backend function
      const response = await fetch('/api/track-shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trackingNumber }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to track shipment');
      }
      
      if (data.success && data.shipment) {
        set({ currentShipment: data.shipment, isLoading: false });
        return data.shipment;
      }
      
      // Fallback to mock data if backend function fails
      const shipment = mockShipments.find(s => s.trackingNumber === trackingNumber);
      
      if (shipment) {
        set({ currentShipment: shipment, isLoading: false });
        return shipment;
      } else {
        set({ error: "Shipment not found", isLoading: false });
        return null;
      }
    } catch (error) {
      // Fallback to mock data if backend function fails
      const shipment = mockShipments.find(s => s.trackingNumber === trackingNumber);
      
      if (shipment) {
        set({ currentShipment: shipment, isLoading: false });
        return shipment;
      } else {
        set({ error: "Shipment not found", isLoading: false });
        return null;
      }
    }
  },

  createShipment: async (shipmentData) => {
    try {
      set({ isLoading: true, error: null });
      
      // Try to use backend function
      try {
        const response = await fetch('/api/generate-tracking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(shipmentData),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate tracking number');
        }
        
        if (data.success && data.shipment) {
          set(state => ({ 
            shipments: [...state.shipments, data.shipment],
            isLoading: false 
          }));
          
          return data.shipment;
        }
      } catch (error) {
        console.error("Backend function failed, using fallback:", error);
        // Continue with fallback if backend function fails
      }
      
      // Fallback to client-side generation
      // Generate a random tracking number
      const trackingNumber = "GSS" + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
      
      const newShipment: Shipment = {
        id: Date.now().toString(),
        trackingNumber,
        ...shipmentData,
        createdAt: new Date().toISOString(),
        updates: [
          {
            id: "u" + Date.now(),
            shipmentId: Date.now().toString(),
            status: "pending",
            location: shipmentData.origin,
            timestamp: new Date().toISOString(),
            description: "Shipment created and pending processing"
          }
        ]
      };
      
      // In a real app, this would be saved to a database
      mockShipments.push(newShipment);
      
      set(state => ({ 
        shipments: [...state.shipments, newShipment],
        isLoading: false 
      }));
      
      return newShipment;
    } catch (error) {
      set({ error: "Failed to create shipment", isLoading: false });
      throw error;
    }
  }
}));