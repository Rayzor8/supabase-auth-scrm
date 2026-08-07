import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../hooks/useAuth";
import supabase from "../supabase-client";
import { type AuthContextType } from "../hooks/useAuth";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<
    AuthContextType["session"] | null | undefined
  >(null);

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        if (data.session) {
          setSession(data.session);
        }
      } catch (error) {
        console.log("error getting session", error);
      }
    }

    getInitialSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("sesion changed", session);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};
