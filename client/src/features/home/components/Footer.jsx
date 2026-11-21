
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Fasal<span>Vistaar</span>
          </Link>

          <p>
            Empowering farmers with reliable agricultural
            knowledge, trusted products and smarter decisions.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/knowledge">Crop Knowledge</Link>
          <Link to="/sellers">Find Sellers</Link>
          <Link to="/ask-ai">Ask AI Expert</Link>
        </div>

        <div className="footer-column">
          <h3>Our Services</h3>
          <Link to="/verify-product">Verify Products</Link>
          <Link to="/compare-products">Compare Products</Link>
          <Link to="/knowledge">Agricultural Knowledge</Link>
          <Link to="/ask-ai">AI Farming Assistant</Link>
        </div>

        <div className="footer-column">
          <h3>Get Started</h3>
          <Link to="/login">Login</Link>
          <Link to="/register">Create Account</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} FasalVistaar.
          All rights reserved.
        </p>

        <p>Growing Together 🌱</p>
      </div>
    </footer>
  );
}

export default Footer;
