
import {
  BookOpenCheck,
  ShieldCheck,
  Scale,
  Users,
  ArrowRight
} from "lucide-react";

import { Link } from "react-router-dom";
import "./WhyFasalVistaar.css";

function WhyFasalVistaar() {

  const benefits = [
    {
      icon: BookOpenCheck,
      title: "Reliable Agricultural Knowledge",
      description:
        "Access easy-to-understand information about crops, fertilizers, irrigation and modern farming practices.",
      link: "/knowledge",
      linkText: "Explore Knowledge"
    },
    {
      icon: ShieldCheck,
      title: "Make Informed Purchases",
      description:
        "Check product details and available verification information before purchasing agricultural products.",
      link: "/verify-product",
      linkText: "Verify Products"
    },
    {
      icon: Scale,
      title: "Compare Before You Buy",
      description:
        "Compare agricultural products based on composition, specifications, price and suitability.",
      link: "/compare-products",
      linkText: "Compare Products"
    },
    {
      icon: Users,
      title: "Expert Guidance & Support",
      description:
        "Get guidance from agricultural experts and make better decisions for your farming needs.",
      link: "/ask-expert",
      linkText: "Ask an Expert"
    }
  ];

  return (
    <section className="why-section">

      <div className="why-container">

        {/* Section Heading */}

        <div className="why-heading">

          <span className="why-label">
            WHY FASALVISTAAR?
          </span>

          <h2>
            Farming Decisions
            <span> Should Be Yours.</span>
          </h2>

          <p>
            Don't depend only on what someone recommends.
            Get the knowledge, tools and guidance you need
            to make informed farming decisions.
          </p>

        </div>

        {/* Benefits Grid */}

        <div className="benefits-grid">

          {benefits.map((benefit, index) => {

            const Icon = benefit.icon;

            return (
              <div className="benefit-card" key={index}>

                <div className="benefit-icon">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>

                <Link
                  to={benefit.link}
                  className="benefit-link"
                >
                  {benefit.linkText}
                  <ArrowRight size={16} />
                </Link>

              </div>
            );
          })}

        </div>

        {/* Bottom Message */}

        <div className="why-bottom">

          <p>
            <strong>Your Farm. Your Knowledge. Your Decision.</strong>
          </p>

          <Link to="/register">
            Start Your Journey
            <ArrowRight size={17} />
          </Link>

        </div>

      </div>

    </section>
  );
}

export default WhyFasalVistaar;
