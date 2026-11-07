
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">

      <div className="hero-container">

        {/* Left Content */}

        <div className="hero-content">

          <div className="hero-label">
            <span className="label-dot"></span>
            EMPOWERING INDIAN FARMERS
          </div>

          <h1>
            Sahi Jaankari.
            <span> Behtar Kheti.</span>
          </h1>

          <p className="hero-description">
            Ab kheti ke har faisle mein rahe aapka bharosa.
            Reliable agricultural knowledge, product verification
            aur expert guidance – sab ek hi jagah.
          </p>

          {/* CTA Buttons */}

          <div className="hero-buttons">

            <Link to="/verify-product" className="hero-primary-btn">
              Verify Product
              <span>↗</span>
            </Link>

            <Link to="/knowledge" className="hero-secondary-btn">
              Explore Knowledge
              <span>→</span>
            </Link>

          </div>

          {/* Trust Information */}

          <div className="hero-trust">

            <div className="trust-icon">✓</div>

            <p>
              Make informed farming decisions
              <strong> with confidence.</strong>
            </p>

          </div>

        </div>

        {/* Right Image */}

        <div className="hero-image-wrapper">

          <img
            src="/images/hero-farmer.png"
            alt="Indian farmer standing in a green agricultural field"
            className="hero-image"
          />

          <div className="hero-image-overlay"></div>

          {/* Floating Information Card */}

          <div className="hero-info-card">
            <div className="info-icon">🌱</div>

            <div>
              <h4>Grow with Knowledge</h4>
              <p>Make smarter farming choices</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
