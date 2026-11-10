
import React, { useEffect, useState } from "react";

function ImageUpload({ onVerify }) {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {

        if (!image) {
            setPreview("");
            return;
        }

        const imageUrl = URL.createObjectURL(image);

        setPreview(imageUrl);

        return () => URL.revokeObjectURL(imageUrl);

    }, [image]);

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size should be less than 5 MB.");
            return;
        }

        setImage(file);
    };

    const handleImageVerify = () => {

        if (!image) {
            alert("Please upload a product image first.");
            return;
        }

        onVerify({
            productName: "Image uploaded",
            brand: "Not extracted yet",
            batchNumber: "Not available",
            category: "Not identified",
            method: "Image Upload"
        });
    };

    return (
        <div className="verify-card">

            <div className="card-top">
                <div className="card-icon">▧</div>
                <span className="card-number">03</span>
            </div>

            <h3>Upload Product Image</h3>

            <p className="card-description">
                Upload a clear picture of your product packaging.
            </p>

            <label htmlFor="product-image" className="upload-box">

                {preview ? (

                    <img
                        src={preview}
                        alt="Product Preview"
                        className="product-preview"
                    />

                ) : (

                    <>
                        <div className="upload-icon">☁</div>

                        <h4>Drop your image here</h4>

                        <p>Or click to browse files</p>
                    </>

                )}

                <span className="browse-btn">
                    Choose Image
                </span>

                <span className="file-note">
                    JPG, JPEG, PNG (Max 5 MB)
                </span>

                <input
                    type="file"
                    id="product-image"
                    accept="image/png,image/jpeg"
                    onChange={handleImageChange}
                    hidden
                />

            </label>

            {image && (
                <div className="selected-file">

                    <span>{image.name}</span>

                    <button
                        type="button"
                        onClick={() => setImage(null)}
                    >
                        Remove
                    </button>

                </div>
            )}

            <button
                type="button"
                className="verify-btn"
                onClick={handleImageVerify}
            >
                Verify Uploaded Image →
            </button>

        </div>
    );
}

export default ImageUpload;
