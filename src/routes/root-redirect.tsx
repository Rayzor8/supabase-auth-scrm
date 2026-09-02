import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function RootRedirect() {
  const { session } = useAuth();

  if (session === undefined) {
    return <h1>Loading...</h1>;
  }

  return session ? <Navigate to="/dashboard" /> : <Navigate to="/sign-in" />;
}
