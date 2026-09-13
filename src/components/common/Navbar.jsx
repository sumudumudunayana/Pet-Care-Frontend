import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  FaPaw,
  FaShoppingCart,
  FaUserCircle,
  FaHome,
  FaHistory,
  FaPhoneAlt,
  FaBoxOpen,
  FaTachometerAlt,
  FaPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";

import "../../styles/common/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="pawcare-navbar">
        {/* =========================
            LOGO
        ========================== */}
        <Link to="/" className="pawcare-navbar-logo" onClick={closeMobileMenu}>
          <div className="pawcare-navbar-logo-icon">
            <FaPaw />
          </div>

          <div className="pawcare-navbar-brand">
            <span className="pawcare-navbar-brand-name">PawCare</span>

            <span className="pawcare-navbar-brand-tagline">
              PET CARE • SMARTER
            </span>
          </div>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <div className="pawcare-navbar-links">
          {user && user.role === "CUSTOMER" && (
            <>
              <Link to="/" className="pawcare-navbar-link">
                <FaHome />
                <span>Home</span>
              </Link>

              <Link to="/store" className="pawcare-navbar-link">
                <FaBoxOpen />
                <span>Pet Store</span>
              </Link>

              <Link to="/history" className="pawcare-navbar-link">
                <FaHistory />
                <span>History</span>
              </Link>

              <Link to="/contact" className="pawcare-navbar-link">
                <FaPhoneAlt />
                <span>Contact</span>
              </Link>
            </>
          )}

          {user && user.role === "ADMIN" && (
            <>
              <Link to="/admin" className="pawcare-navbar-link">
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>

              <Link to="/admin/products" className="pawcare-navbar-link">
                <FaBoxOpen />
                <span>Products</span>
              </Link>

              <Link to="/admin/products/add" className="pawcare-navbar-link">
                <FaPlus />
                <span>Add Product</span>
              </Link>

              <Link to="/" className="pawcare-navbar-link">
                <FaHome />
                <span>Home</span>
              </Link>

              <Link to="/store" className="pawcare-navbar-link">
                <FaBoxOpen />
                <span>Pet Store</span>
              </Link>

              <Link to="/history" className="pawcare-navbar-link">
                <FaHistory />
                <span>History</span>
              </Link>

              <Link to="/contact" className="pawcare-navbar-link">
                <FaPhoneAlt />
                <span>Contact</span>
              </Link>
            </>
          )}
        </div>

        {/* =========================
            DESKTOP ACTIONS
        ========================== */}
        <div className="pawcare-navbar-actions">
          {user && user.role === "CUSTOMER" && (
            <Link to="/store" className="pawcare-navbar-action">
              <FaShoppingCart />

              <span className="pawcare-navbar-cart-dot"></span>

              <span className="pawcare-navbar-tooltip">Pet Store</span>
            </Link>
          )}

          {user ? (
            <>
              <Link to="/profile" className="pawcare-navbar-profile">
                <div className="pawcare-navbar-profile-icon">
                  <FaUserCircle />
                </div>

                <div className="pawcare-navbar-user-info">
                  <span className="pawcare-navbar-user-name">
                    {user.name || "User"}
                  </span>

                  <span className="pawcare-navbar-user-role">{user.role}</span>
                </div>
              </Link>

              <button className="pawcare-navbar-logout" onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="pawcare-navbar-login">
              <span>Login</span>
              <span className="pawcare-navbar-login-arrow">→</span>
            </Link>
          )}

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            className="pawcare-navbar-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* =========================
          MOBILE NAVIGATION
      ========================== */}
      <div
        className={`pawcare-mobile-menu ${
          mobileMenuOpen ? "pawcare-mobile-menu-open" : ""
        }`}
      >
        <div className="pawcare-mobile-menu-inner">
          {user && user.role === "CUSTOMER" && (
            <>
              <Link
                to="/"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaHome />
                <span>Home</span>
              </Link>

              <Link
                to="/store"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaBoxOpen />
                <span>Pet Store</span>
              </Link>

              <Link
                to="/history"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaHistory />
                <span>History</span>
              </Link>

              <Link
                to="/contact"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaPhoneAlt />
                <span>Contact Us</span>
              </Link>

              <Link
                to="/profile"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaUserCircle />
                <span>Profile</span>
              </Link>
            </>
          )}

          {user && user.role === "ADMIN" && (
            <>
              <Link
                to="/admin"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/admin/products"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaBoxOpen />
                <span>Product Management</span>
              </Link>

              <Link
                to="/admin/products/add"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaPlus />
                <span>Add Product</span>
              </Link>

              <Link
                to="/"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaHome />
                <span>Home</span>
              </Link>

              <Link
                to="/store"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaBoxOpen />
                <span>Pet Store</span>
              </Link>

              <Link
                to="/history"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaHistory />
                <span>History</span>
              </Link>

              <Link
                to="/contact"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaPhoneAlt />
                <span>Contact Us</span>
              </Link>

              <Link
                to="/profile"
                className="pawcare-mobile-link"
                onClick={closeMobileMenu}
              >
                <FaUserCircle />
                <span>Profile</span>
              </Link>
            </>
          )}

          {!user && (
            <Link
              to="/login"
              className="pawcare-mobile-login"
              onClick={closeMobileMenu}
            >
              Login
              <span>→</span>
            </Link>
          )}

          {user && (
            <button className="pawcare-mobile-logout" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
