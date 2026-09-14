import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPaw,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaHeart,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

import { toast } from "sonner";

import authService from "../../services/authService";

import "../../styles/auth/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await authService.register(formData);

      // Sonner success alert
      toast.success("Registration successful!", {
        description: "Your PawCare account has been created successfully.",
      });

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      // Get backend error message
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";

      setError(errorMessage);

      // Sonner error alert
      toast.error("Registration failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pawcare-register-page">
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div className="register-bg-gradient"></div>

      {/* Large glowing blobs */}
      <div className="register-decoration register-decoration-one"></div>
      <div className="register-decoration register-decoration-two"></div>
      <div className="register-decoration register-decoration-three"></div>

      {/* Decorative rings */}
      <div className="register-ring register-ring-one"></div>
      <div className="register-ring register-ring-two"></div>
      <div className="register-ring register-ring-three"></div>

      {/* Floating paw prints */}
      <div className="register-paw-decoration register-paw-one">
        <FaPaw />
      </div>

      <div className="register-paw-decoration register-paw-two">
        <FaPaw />
      </div>

      <div className="register-paw-decoration register-paw-three">
        <FaPaw />
      </div>

      <div className="register-paw-decoration register-paw-four">
        <FaPaw />
      </div>

      {/* Decorative dots */}
      <div className="register-dot register-dot-one"></div>
      <div className="register-dot register-dot-two"></div>
      <div className="register-dot register-dot-three"></div>
      <div className="register-dot register-dot-four"></div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="pawcare-register-container">
        {/* =====================================================
            LEFT BRANDING SECTION
        ===================================================== */}

        <div className="pawcare-register-brand">
          {/* Decorative elements */}
          <div className="register-brand-glow register-brand-glow-one"></div>
          <div className="register-brand-glow register-brand-glow-two"></div>

          <div className="register-brand-circle register-brand-circle-one"></div>
          <div className="register-brand-circle register-brand-circle-two"></div>

          <div className="register-brand-paw register-brand-paw-one">
            <FaPaw />
          </div>

          <div className="register-brand-paw register-brand-paw-two">
            <FaPaw />
          </div>

          {/* Brand top */}

          <div className="register-brand-top">
            <div className="register-brand-logo">
              <FaPaw />
            </div>

            <span>PawCare</span>
          </div>

          {/* Brand content */}

          <div className="register-brand-content">
            <span className="register-brand-badge">
              <FaHeart />
              Pet care made simple
            </span>

            <h1>
              Everything your
              <span> paw </span>
              needs starts here.
            </h1>

            <p>
              Create your PawCare account and manage your pet's care, discover
              trusted services, and find everything your furry friend needs in
              one place.
            </p>

            {/* Features */}

            <div className="register-brand-features">
              <div className="register-brand-feature">
                <div className="register-feature-icon">
                  <FaHeart />
                </div>

                <div>
                  <strong>Complete Pet Care</strong>
                  <span>Everything in one place</span>
                </div>
              </div>

              <div className="register-brand-feature">
                <div className="register-feature-icon">
                  <FaShieldAlt />
                </div>

                <div>
                  <strong>Safe & Trusted</strong>
                  <span>Built with your pet in mind</span>
                </div>
              </div>
            </div>
          </div>

          {/* Brand footer */}

          <div className="register-brand-bottom">
            <span>🐾</span>

            <p>Your pet's happiness is our priority.</p>
          </div>
        </div>

        {/* =====================================================
            REGISTER FORM SECTION
        ===================================================== */}

        <div className="pawcare-register-form-section">
          <div className="register-form-wrapper">
            {/* Mobile Logo */}

            <div className="mobile-register-brand">
              <div className="register-mobile-logo">
                <FaPaw />
              </div>

              <span>PawCare</span>
            </div>

            {/* Header */}

            <div className="register-form-header">
              <span className="register-welcome-label">GET STARTED</span>

              <h2>Create your account!</h2>

              <p>
                Join PawCare and start taking better care of what matters most.
              </p>
            </div>

            {/* Error */}

            {error && (
              <div className="pawcare-register-error">
                <span>!</span>

                <p>{error}</p>
              </div>
            )}

            {/* Form */}

            <form className="pawcare-register-form" onSubmit={handleSubmit}>
              {/* FULL NAME */}

              <div className="pawcare-register-field">
                <label htmlFor="fullName">Full Name</label>

                <div className="pawcare-register-input-wrapper">
                  <div className="pawcare-register-input-icon">
                    <FaUser />
                  </div>

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="pawcare-register-field">
                <label htmlFor="email">Email Address</label>

                <div className="pawcare-register-input-wrapper">
                  <div className="pawcare-register-input-icon">
                    <FaEnvelope />
                  </div>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* PHONE */}

              <div className="pawcare-register-field">
                <label htmlFor="phone">Phone Number</label>

                <div className="pawcare-register-input-wrapper">
                  <div className="pawcare-register-input-icon">
                    <FaPhone />
                  </div>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* ADDRESS */}

              <div className="pawcare-register-field">
                <label htmlFor="address">Address</label>

                <div className="pawcare-register-input-wrapper">
                  <div className="pawcare-register-input-icon">
                    <FaMapMarkerAlt />
                  </div>

                  <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className="pawcare-register-field">
                <label htmlFor="password">Password</label>

                <div className="pawcare-register-input-wrapper">
                  <div className="pawcare-register-input-icon">
                    <FaLock />
                  </div>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="pawcare-register-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* CREATE ACCOUNT BUTTON */}

              <button
                type="submit"
                className="pawcare-register-button"
                disabled={loading}
              >
                <span>
                  {loading ? "Creating Account..." : "Create Account"}
                </span>

                {!loading && <FaArrowRight />}
              </button>
            </form>

            {/* Login */}

            <div className="pawcare-login-link">
              <span>Already have a PawCare account?</span>

              <Link to="/login">Sign In</Link>
            </div>

            {/* Security */}

            <div className="register-security">
              <FaShieldAlt />

              <span>Your information is securely protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
