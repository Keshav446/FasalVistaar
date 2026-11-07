
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Verify Product", path: "/verify-product" },
    { name: "Compare", path: "/compare-products" },
    { name: "Find Sellers", path: "/sellers" },
    { name: "Knowledge", path: "/knowledge" },
    { name: "Ask Expert", path: "/ask-expert" }
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon">🌱</div>

          <div className="logo-text">
            <h2>FasalVistaar</h2>
            <span>Growing Together</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={closeMenu}
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Authentication */}
          <div className="mobile-auth">
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link
              to="/register"
              className="get-started-btn"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Desktop Authentication */}
        <div className="nav-actions">
          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="get-started-btn">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>
    </header>
  );
}

export default Navbar;
