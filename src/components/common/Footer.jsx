import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import "../../styles/common/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>🐾 PawCare</h2>

          <p>Caring for your pets, one step at a time.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/store">Pet Store</a>
          <a href="/contact">Contact Us</a>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>

          <div>
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </div>

      <div className="footer-bottom">© 2026 PawCare. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
