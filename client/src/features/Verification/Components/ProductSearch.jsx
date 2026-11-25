
import React from "react";

function ProductSearch() {

    const handleQRScan = () => {
        alert("QR Scanner will be integrated soon!");
    };

    return (
        <div className="verify-card">

            <div className="card-top">
                <div className="card-icon">▦</div>
                <span className="card-number">01</span>
            </div>

            <h3>Scan QR Code</h3>

            <p className="card-description">
                Scan the QR code printed on your fertilizer,
                pesticide or seed packaging.
            </p>

            <div className="qr-box">

                <div className="qr-symbol">▦</div>

                <h4>Scan Product QR Code</h4>

                <p>
                    Place your product QR code in front
                    of the scanner.
                </p>

            </div>

            <button
                className="verify-btn"
                type="button"
                onClick={handleQRScan}
            >
                Scan QR Code →
            </button>

            <span className="card-note">
                Quick and easy verification
            </span>

        </div>
    );
}

export default ProductSearch;
