import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      // In a real app, this would check with a backend
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        set({ user: JSON.parse(storedUser), isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in a real app this would be handled by the backend
      if (email === "demo@example.com" && password === "password") {
        const user = { id: "1", name: "Demo User", email };
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, isLoading: false });
      } else {
        set({ error: "Invalid email or password", isLoading: false });
      }
    } catch (error) {
      set({ error: "Login failed. Please try again.", isLoading: false });
    }
  },

  signup: async (name, email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock signup - in a real app this would be handled by the backend
      const user = { id: Date.now().toString(), name, email };
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: "Signup failed. Please try again.", isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  }
}));

// Initialize auth state on app load
if (typeof window !== "undefined") {
  useAuthStore.getState().checkAuth();
}