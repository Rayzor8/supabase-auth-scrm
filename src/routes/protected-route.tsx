import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { session } = useAuth();

  if (session === undefined) {
    return <h1>Loading...</h1>;
  }

  return session ? <Outlet /> : <Navigate to="/sign-in" />;
}
