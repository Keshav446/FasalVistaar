import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/verify", label: "Verify" },
  { to: "/products", label: "Best Product" },
  { to: "/sellers", label: "Best Shop" },
  { to: "/knowledge", label: "Knowledge" },
  { to: "/ask-expert", label: "Ask Expert" },
  { to: "/chatbot", label: "AI Chat" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>FasalVistaar</Link>
        <button className="nav-toggle" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          {open ? "✕" : "☰"}
        </button>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}>{l.label}</NavLink>
          ))}
          <Link to="/login" className="btn nav-login" onClick={() => setOpen(false)}>Login</Link>
        </nav>
      </div>
    </header>
  );
}