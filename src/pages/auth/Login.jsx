import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPaw,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";

import { toast } from "sonner";

import { AuthContext } from "../../context/AuthContext";
import authService from "../../services/authService";

import "../../styles/auth/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await authService.login(email, password);

      const userData = {
        token: response.token,
        email: response.email,
        role: response.role,
      };

      login(userData);

      // Success notification
      toast.success("Login successful!", {
        description:
          response.role === "ADMIN"
            ? "Welcome back, Admin!"
            : "Welcome back to PawCare!",
      });

      // Redirect based on role
      if (response.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Get backend error message
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid email or password.";

      // Show backend error through Sonner
      toast.error("Login failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast.info("Password Reset", {
      description: "Password reset functionality will be added.",
    });
  };

  return (
    <div className="pawcare-login-page">
      {/* =========================================
          BACKGROUND ATMOSPHERE
      ========================================= */}

      <div className="login-bg-gradient"></div>

      {/* Large glowing blobs */}
      <div className="login-decoration login-decoration-one"></div>
      <div className="login-decoration login-decoration-two"></div>
      <div className="login-decoration login-decoration-three"></div>

      {/* Decorative rings */}
      <div className="login-ring login-ring-one"></div>
      <div className="login-ring login-ring-two"></div>
      <div className="login-ring login-ring-three"></div>

      {/* Floating paw prints */}
      <div className="login-paw-decoration paw-one">
        <FaPaw />
      </div>

      <div className="login-paw-decoration paw-two">
        <FaPaw />
      </div>

      <div className="login-paw-decoration paw-three">
        <FaPaw />
      </div>

      <div className="login-paw-decoration paw-four">
        <FaPaw />
      </div>

      {/* Decorative dots */}
      <div className="login-dot login-dot-one"></div>
      <div className="login-dot login-dot-two"></div>
      <div className="login-dot login-dot-three"></div>
      <div className="login-dot login-dot-four"></div>

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div className="pawcare-login-container">
        {/* =========================================
            LEFT BRANDING SECTION
        ========================================= */}

        <div className="pawcare-login-brand">
          {/* Decorative elements inside brand panel */}
          <div className="brand-glow brand-glow-one"></div>
          <div className="brand-glow brand-glow-two"></div>

          <div className="brand-circle brand-circle-one"></div>
          <div className="brand-circle brand-circle-two"></div>

          <div className="brand-paw brand-paw-one">
            <FaPaw />
          </div>

          <div className="brand-paw brand-paw-two">
            <FaPaw />
          </div>

          {/* Brand top */}
          <div className="brand-top">
            <div className="brand-logo">
              <FaPaw />
            </div>

            <span>PawCare</span>
          </div>

          {/* Brand content */}
          <div className="brand-content">
            <span className="brand-badge">
              <FaHeart />
              Pet care made simple
            </span>

            <h1>
              Because every
              <span> paw </span>
              deserves the best.
            </h1>

            <p>
              Manage your pet&apos;s care, discover trusted services, and find
              everything your furry friend needs in one place.
            </p>

            {/* Features */}
            <div className="brand-features">
              <div className="brand-feature">
                <div className="feature-icon">
                  <FaHeart />
                </div>

                <div>
                  <strong>Complete Pet Care</strong>
                  <span>Everything in one place</span>
                </div>
              </div>

              <div className="brand-feature">
                <div className="feature-icon">
                  <FaShieldAlt />
                </div>

                <div>
                  <strong>Safe &amp; Trusted</strong>
                  <span>Built with your pet in mind</span>
                </div>
              </div>
            </div>
          </div>

          {/* Brand footer */}
          <div className="brand-bottom">
            <span>🐾</span>

            <p>Your pet&apos;s happiness is our priority.</p>
          </div>
        </div>

        {/* =========================================
            LOGIN SECTION
        ========================================= */}

        <div className="pawcare-login-form-section">
          <div className="login-form-wrapper">
            {/* Mobile Logo */}
            <div className="mobile-login-brand">
              <div className="brand-logo">
                <FaPaw />
              </div>

              <span>PawCare</span>
            </div>

            {/* Header */}
            <div className="login-form-header">
              <span className="welcome-label">WELCOME BACK</span>

              <h2>Good to see you!</h2>

              <p>Sign in to continue taking care of what matters most.</p>
            </div>

            {/* Form */}
            <form className="pawcare-login-form" onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="pawcare-field">
                <label htmlFor="email">Email Address</label>

                <div className="pawcare-input-wrapper">
                  <div className="pawcare-input-icon">
                    <FaEnvelope />
                  </div>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="pawcare-field">
                <div className="password-label-row">
                  <label htmlFor="password">Password</label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="pawcare-input-wrapper">
                  <div className="pawcare-input-icon">
                    <FaLock />
                  </div>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="pawcare-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* REMEMBER */}
              <label className="remember-me">
                <input type="checkbox" />

                <span className="custom-checkbox"></span>

                <span>Remember me</span>
              </label>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="pawcare-login-button"
                disabled={loading}
              >
                <span>{loading ? "Signing in..." : "Sign In"}</span>

                {!loading && <FaArrowRight />}
              </button>
            </form>

            {/* Register */}
            <div className="pawcare-register">
              <span>Don&apos;t have a PawCare account?</span>

              <Link to="/register">Create Account</Link>
            </div>

            {/* Security */}
            <div className="login-security">
              <FaShieldAlt />

              <span>Your information is securely protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
