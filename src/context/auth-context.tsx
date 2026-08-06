import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../hooks/useAuth";
import supabase from "../supabase-client";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<string | null | undefined>(null);

  useEffect(() => {
    async function getInitialSession() {
      try {
        const data = await supabase.auth.getSession();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    getInitialSession();
  }, []);
  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};
