
import React from "react";
import VerificationBadge from "./VerificationBadge";

function VerificationResult({ product }) {

    return (
        <section className="result-section">

            <div className="result-header">

                <div>
                    <h2>Product Verification Report</h2>
                    <p>Your submitted product information</p>
                </div>

                <VerificationBadge status={product.status} />

            </div>

            <div className="result-grid">

                <div className="result-item">
                    <span>Product Name</span>
                    <strong>{product.productName}</strong>
                </div>

                <div className="result-item">
                    <span>Manufacturer</span>
                    <strong>{product.brand}</strong>
                </div>

                <div className="result-item">
                    <span>Batch Number</span>
                    <strong>{product.batchNumber}</strong>
                </div>

                <div className="result-item">
                    <span>Category</span>
                    <strong>{product.category}</strong>
                </div>

                <div className="result-item">
                    <span>Verification Method</span>
                    <strong>{product.method}</strong>
                </div>

            </div>

            <div className="result-message">
                Your details have been submitted.
                Actual authenticity verification will happen
                after connecting the backend.
            </div>

        </section>
    );
}

export default VerificationResult;
