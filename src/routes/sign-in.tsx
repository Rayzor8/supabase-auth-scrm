import { useAuth } from "../hooks/useAuth";

const Signin = () => {
  const { session } = useAuth();
  console.log(session);
  return (
    <div>
      <h1 className="landing-header">Sign In Page</h1>
    </div>
  );
};

export default Signin;
