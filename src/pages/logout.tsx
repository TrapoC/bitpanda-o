import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { fine } from "@/lib/fine";
import { useToast } from "@/hooks/use-toast";

export default function Logout() {
  const { toast } = useToast();

  useEffect(() => {
    const signOut = async () => {
      try {
        await fine.auth.signOut();
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
      }
    };

    signOut();
  }, [toast]);

  return <Navigate to="/" />;
}