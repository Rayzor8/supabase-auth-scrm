import { createBrowserRouter } from "react-router-dom";
import Signin from "./routes/sign-in";
import Header from "./components/header";
import Dashboard from "./routes/dashboard";
import SignUp from "./routes/sign-up";

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
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default router;
