import { createContext, useContext } from "react";
import { type Session } from "@supabase/supabase-js";
export type AuthContextType = {
  session: Session | null | undefined;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
