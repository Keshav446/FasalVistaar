import React, { useState } from "react";

import ProductSearch from "./Components/ProductSearch";
import ImageUpload from "./Components/ImageUpload";
import ManualForm from "./Components/ManualForm";
import VerificationResult from "./Components/VerificationResult";

import "./VerificationProduct.css";

function VerifyProduct() {
  const [result, setResult] = useState(null);

  const handleVerify = (data) => {
    setResult({
      ...data,
      status: "pending",
    });
  };

  return (
    <div className="verify-page">
      {/* Hero Section */}
      <section className="verify-hero">
        <div className="hero-tag">TRUSTED AGRICULTURE PLATFORM</div>

        <h1>
          Verify Your <span>Product</span>
        </h1>

        <p>
          Ensure that your agricultural products are genuine. Scan, upload or
          enter product details to verify their authenticity before purchasing.
        </p>
      </section>

      <main className="verify-container">
        <div className="section-heading">
          <h2>Choose Your Verification Method</h2>

          <p>Select any one method to verify your agricultural product.</p>
        </div>

        <div className="verification-cards">
          <ProductSearch onVerify={handleVerify} />

          <ManualForm onVerify={handleVerify} />

          <ImageUpload onVerify={handleVerify} />
        </div>

        {result && <VerificationResult product={result} />}

        <section className="trust-section">
          <div className="trust-icon">🛡️</div>

          <div className="trust-content">
            <h3>Your Trust, Our Priority</h3>

            <p>
              We provide reliable agricultural product information using trusted
              sources.
            </p>
          </div>
        </section>
      </main>

      <footer className="verify-footer">
        <h3>🌱 FasalVistaar</h3>

        <p>Empowering farmers with trusted agricultural information.</p>

        <span>© 2026 FasalVistaar. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default VerifyProduct;
