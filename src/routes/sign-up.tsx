import { useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(formAction, null);

  async function formAction(_prevState: null | string, formData: FormData) {
    const signInForm = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    const {
      success,
      data,
      error: signInError,
    } = await signInUser(signInForm.email, signInForm.password);

    if (signInError) {
      return signInError;
    }

    if (success && data?.session) {
      navigate("/sign-in");
      return null;
    }

    return null;
  }

  return (
    <>
      <h1 className="landing-header">Paper Like A Boss</h1>
      <div className="sign-form-container">
        <form
          action={submitAction}
          aria-label="Sign up form"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Use this form to create a new account. Enter your email and
            password.
          </div>

          <h2 className="form-title">Sign up today!</h2>
          <p>
            Already have an account? <Link to="/">Sign in</Link>
          </p>

          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "form-error" : "form-description"}
            disabled={isPending}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "form-error" : "form-description"}
            disabled={isPending}
          />

          <button
            type="submit"
            className="form-button"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </button>

          {/* Error message */}
        </form>
      </div>
    </>
  );
};

export default Signup;
