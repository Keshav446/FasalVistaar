
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HelpSupport.css";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
function HelpSupport() {

    const [activeFAQ, setActiveFAQ] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const faqs = [
        {
            question: "How can I verify an agricultural product?",
            answer: "Visit the Verify Product page. You can scan the QR code, enter product details manually, or upload a product image to start verification."
        },
        {
            question: "How do I identify fake fertilizers or pesticides?",
            answer: "You can submit the product details, batch number and registration information through our verification section to check available product information."
        },
        {
            question: "What if my product verification is unsuccessful?",
            answer: "Check whether the entered product details are correct. If the issue continues, contact our support team with the product information."
        },
        {
            question: "Can I upload a product image?",
            answer: "Yes. Go to Verify Product, choose the Upload Product Image option and select a clear image of your product packaging."
        },
        {
            question: "Is FasalVistaar free to use?",
            answer: "FasalVistaar is designed to make trusted agricultural information accessible to farmers. Please check the platform for the availability of individual services."
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Thank you! Your query has been submitted.");

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    return (
        <div className="help-page">
            <Navbar />

            {/* HERO SECTION */}

            <section className="help-hero">

                <span className="help-tag">
                    FASALVISTAAR SUPPORT CENTER
                </span>

                <h1>
                    How Can We <span>Help You?</span>
                </h1>

                <p>
                    Have questions about agricultural products?
                    We are here to help you find the right answers
                    and make your farming journey easier.
                </p>

                <Link to="/verify-product" className="help-main-btn">
                    Verify Your Product →
                </Link>

            </section>


            {/* QUICK HELP SECTION */}

            <section className="help-container">

                <div className="help-heading">
                    <h2>How Can We Assist You?</h2>

                    <p>
                        Find help with our most commonly used services.
                    </p>
                </div>

                <div className="help-cards">

                    <div className="help-card">
                        <div className="help-icon">🔍</div>

                        <h3>Product Verification</h3>

                        <p>
                            Need help checking whether your
                            fertilizer, seeds or pesticides are genuine?
                        </p>

                        <Link to="/verify-product">
                            Verify Product →
                        </Link>
                    </div>


                    <div className="help-card">
                        <div className="help-icon">🌱</div>

                        <h3>Agriculture Guidance</h3>

                        <p>
                            Get assistance with agricultural
                            information and farming-related queries.
                        </p>

                        <a href="#contact">
                            Get Assistance →
                        </a>
                    </div>


                    <div className="help-card">
                        <div className="help-icon">💬</div>

                        <h3>Technical Support</h3>

                        <p>
                            Facing any issue while using
                            FasalVistaar? Tell us about it.
                        </p>

                        <a href="#contact">
                            Contact Support →
                        </a>
                    </div>

                </div>


                {/* FAQ SECTION */}

                <section className="faq-section">

                    <div className="help-heading">
                        <h2>Frequently Asked Questions</h2>

                        <p>
                            Find answers to some common questions.
                        </p>
                    </div>

                    <div className="faq-list">

                        {faqs.map((faq, index) => (

                            <div className="faq-item" key={index}>

                                <button
                                    className="faq-question"
                                    onClick={() =>
                                        setActiveFAQ(
                                            activeFAQ === index ? null : index
                                        )
                                    }
                                >
                                    <span>{faq.question}</span>

                                    <span className="faq-arrow">
                                        {activeFAQ === index ? "−" : "+"}
                                    </span>

                                </button>

                                {activeFAQ === index && (
                                    <div className="faq-answer">
                                        {faq.answer}
                                    </div>
                                )}

                            </div>

                        ))}

                    </div>

                </section>


                {/* CONTACT SECTION */}

                <section className="contact-section" id="contact">

                    <div className="contact-info">

                        <span className="help-tag">
                            WE ARE HERE FOR YOU
                        </span>

                        <h2>
                            Still Need <span>Help?</span>
                        </h2>

                        <p>
                            Couldn't find the answer you were looking for?
                            Send us your query and our team can assist you.
                        </p>

                        <div className="contact-detail">
                            <span>📩</span>
                            <div>
                                <h4>Support Assistance</h4>
                                <p>Submit your query through the form.</p>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <span>🌾</span>
                            <div>
                                <h4>Farmer First</h4>
                                <p>Making agricultural information easier to access.</p>
                            </div>
                        </div>

                    </div>


                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >

                        <h3>Send Us a Message</h3>

                        <div className="contact-field">
                            <label>Your Name</label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="contact-field">
                            <label>Email Address</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="contact-field">
                            <label>Subject</label>

                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a subject</option>
                                <option value="Product Verification">
                                    Product Verification
                                </option>
                                <option value="Agriculture Guidance">
                                    Agriculture Guidance
                                </option>
                                <option value="Technical Issue">
                                    Technical Issue
                                </option>
                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </div>


                        <div className="contact-field">
                            <label>Your Message</label>

                            <textarea
                                name="message"
                                placeholder="Describe your query..."
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                required
                            />
                        </div>


                        <button type="submit" className="contact-btn">
                            Submit Query →
                        </button>

                    </form>

                </section>

            </section>


            {/* FOOTER */}

            <footer className="help-footer">

                <h3>🌱 FasalVistaar</h3>

                <p>
                    Empowering farmers with trusted agricultural information.
                </p>

                <span>
                    © 2026 FasalVistaar. All rights reserved.
                </span>

            </footer>

        </div>
    );
}

export default HelpSupport;
