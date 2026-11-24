
import { useState } from "react";
import "./FAQs.css";

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is FasalVistaar?",
      answer:
        "FasalVistaar is a farmer-focused platform that provides agricultural knowledge, product verification, product comparison and AI-powered farming guidance.",
    },
    {
      question: "How can I verify agricultural products?",
      answer:
        "You can explore product details and verification information through our Verify Product section to make more informed purchasing decisions.",
    },
    {
      question: "Can I compare different agricultural products?",
      answer:
        "Yes! You can compare fertilizers and seeds, pesticides, and pipes and irrigation products to explore different available options.",
    },
    {
      question: "How can I find trusted sellers?",
      answer:
        "Visit the Find Trusted Sellers section to discover seller profiles and available agricultural products.",
    },
    {
      question: "Can I ask farming-related questions?",
      answer:
        "Yes! Our Ask an AI Expert feature is designed to provide AI-powered guidance for crop, fertilizer, pest and irrigation-related queries.",
    },
    {
      question: "Is FasalVistaar free to use?",
      answer:
        "Our goal is to make useful agricultural information accessible to farmers. Check the platform for the latest feature availability and access details.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">

        <div className="faq-heading">
          <span>GOT QUESTIONS?</span>
          <h2>
            Frequently Asked <em>Questions.</em>
          </h2>
          <p>
            Find answers to common questions about FasalVistaar.
          </p>
        </div>

        <div className="faq-list">
          {questions.map((item, index) => (
            <div className="faq-item" key={index}>
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{item.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQs;
