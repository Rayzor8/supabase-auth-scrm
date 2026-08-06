import { createContext, useContext } from "react";

type AuthContextType = {
  session: string | null | undefined;
  setSession: React.Dispatch<React.SetStateAction<string | null | undefined>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
