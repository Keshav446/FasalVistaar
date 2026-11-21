
import { Link } from "react-router-dom";
import "./VerifyProduct.css";

function VerifyProduct() {
  return (
    <section className="verify-section">
      <div className="verify-container">

        <div className="verify-content">
          <span className="verify-tag">SMART PRODUCT VERIFICATION</span>

          <h2>
            Before You Buy, <em>Verify.</em>
          </h2>

          <p>
            Make informed decisions before purchasing fertilizers,
            pesticides and other farming products. Check product
            details and avoid misleading information.
          </p>

          <Link to="/verify-product" className="verify-button">
            Verify a Product <span>→</span>
          </Link>
        </div>

        <div className="verify-image">
          <img
            src="/images/product-verification.jpg"
            alt="Agricultural product verification"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}

export default VerifyProduct;
