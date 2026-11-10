
import React, { useState } from "react";

function ManualForm({ onVerify }) {

    const [formData, setFormData] = useState({
        productName: "",
        brand: "",
        batchNumber: "",
        category: "",
        registrationNumber: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onVerify({
            ...formData,
            method: "Manual Entry"
        });
    };

    return (

        <div className="verify-card">

            <div className="card-top">
                <div className="card-icon">✎</div>
                <span className="card-number">02</span>
            </div>

            <h3>Enter Product Details</h3>

            <p className="card-description">
                Don't have a QR code? Enter your product
                information manually.
            </p>

            <form
                className="product-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">
                    <label>Product Name</label>

                    <input
                        type="text"
                        name="productName"
                        placeholder="Enter product name"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Brand / Manufacturer</label>

                    <input
                        type="text"
                        name="brand"
                        placeholder="Enter brand name"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Batch / Lot Number</label>

                    <input
                        type="text"
                        name="batchNumber"
                        placeholder="Enter batch number"
                        value={formData.batchNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Product Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Pesticide">Pesticide</option>
                        <option value="Seeds">Seeds</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Registration Number (Optional)</label>

                    <input
                        type="text"
                        name="registrationNumber"
                        placeholder="Enter registration number"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="verify-btn"
                    type="submit"
                >
                    Verify Product →
                </button>

            </form>

        </div>
    );
}

export default ManualForm;
