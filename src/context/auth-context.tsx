import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../hooks/useAuth";
import supabase from "../supabase-client";
import type { Session } from "@supabase/supabase-js";

export type AuthContextType = {
  session: Session | null | undefined;
  signInUser: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error: string | null }>;
};

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

  async function signInUser(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLocaleLowerCase(),
        password,
      });

      if (error) {
        console.error("error signing in :",error.message);
        return {
          success: false,
          error: error.message,
        };
      }

      console.log("supabase sign in success :", data);
      return {
        success: true,
        data,
        error: null,
      };
    } catch (error) {
      console.error("Unknown error occurred", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  return (
    <AuthContext.Provider value={{ session, signInUser }}>
      {children}
    </AuthContext.Provider>
  );
};
