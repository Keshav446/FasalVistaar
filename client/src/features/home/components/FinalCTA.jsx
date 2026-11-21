
import { Link } from "react-router-dom";
import "./FinalCTA.css";

function FinalCTA() {
  return (
    <section className="final-cta-section">
      <div className="final-cta-container">

        <span>GROW WITH CONFIDENCE</span>

        <h2>
          Better Information.
          <br />
          <em>Better Farming.</em>
        </h2>

        <p>
          Make smarter farming decisions with reliable knowledge,
          product insights and AI-powered guidance.
        </p>

        <Link to="/register" className="final-cta-button">
          Get Started Today <span>→</span>
        </Link>

      </div>
    </section>
  );
}

export default FinalCTA;
