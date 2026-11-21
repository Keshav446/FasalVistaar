
import { Link } from "react-router-dom";
import "./TrustedSellers.css";

function TrustedSellers() {
  return (
    <section className="seller-section">
      <div className="seller-container">

        <div className="seller-image">
          <img
            src="/images/trusted-sellers.jpg"
            alt="Agricultural products and trusted seller"
            loading="lazy"
          />
        </div>

        <div className="seller-content">
          <span className="seller-tag">TRUSTED FARMING NETWORK</span>

          <h2>
            Find Sellers You Can <em>Trust.</em>
          </h2>

          <p>
            Connect with verified agricultural sellers and
            discover genuine farming products without relying
            only on local recommendations.
          </p>

          <div className="seller-points">
            <div>✓ Verified Seller Details</div>
            <div>✓ Product & Brand Information</div>
            <div>✓ Transparent Seller Profiles</div>
          </div>

          <Link to="/sellers" className="seller-button">
            Find Trusted Sellers <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default TrustedSellers;
