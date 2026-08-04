import { createBrowserRouter } from "react-router-dom";
import Signin from "./routes/sign-in";
import Header from "./components/header";
import Dashboard from "./routes/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
]);

export default router;
