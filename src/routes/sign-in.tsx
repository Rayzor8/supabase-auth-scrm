import { useActionState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(formAction, null);

  async function formAction(_prevState: null | string, formData: FormData) {
    const signInForm = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    const { success,data, error: signInError } = await signInUser(
      signInForm.email,
      signInForm.password,
    );

    if (signInError) {
      return signInError;
    }

    if (success && data?.session) {
      navigate("/dashboard");
      return null;
    }

    return null;
  }

  return (
    <>
      <h1 className="landing-header">Sign In Page</h1>

      <div className="sign-form-container">
        <form
          //action=
          aria-label="Sign in form"
          aria-describedby="form-description"
          action={submitAction}
        >
          <div id="form-description" className="sr-only">
            Use this form to sign in to your account. Enter your email and
            password.
          </div>

          <h2 className="form-title">Sign in</h2>
          <p>
            Don't have an account yet?{" "}
            <Link to="/sign-up" className="form-link">
              Sign up
            </Link>
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
            aria-invalid={error !== null}
            aria-describedby={error !== null ? "email-error" : undefined}
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
            aria-invalid={error !== null}
            aria-describedby={error !== null ? "password-error" : undefined}
            disabled={isPending}
          />

          <button
            type="submit"
            disabled={isPending}
            className="form-button"
            aria-busy={isPending}
          >
            {isPending ? "Signing in" : "Sign In"}
          </button>

          {error && (
            <div
              id="signin-error"
              role="alert"
              className="sign-form-error-message"
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Signin;
