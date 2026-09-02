import { createBrowserRouter } from "react-router-dom";
import Signin from "./routes/sign-in";
import Header from "./components/header";
import Dashboard from "./routes/dashboard";
import SignUp from "./routes/sign-up";
import RoutRedirect from "./routes/root-redirect";
import ProtectedRoute from "./routes/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutRedirect />,
  },
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: (
          <>
            <Header />
            <Dashboard />
          </>
        ),
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default router;
