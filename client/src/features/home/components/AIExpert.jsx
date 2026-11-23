
import { Link } from "react-router-dom";
import "./AIExpert.css";

function AIExpert() {
  return (
    <section className="ai-expert-section">
      <div className="ai-expert-container">

        <div className="ai-expert-content">
          <span className="ai-expert-tag">
            YOUR SMART FARMING ASSISTANT
          </span>

          <h2>
            Ask an AI Expert, <em>Grow Smarter.</em>
          </h2>

          <p>
            Have questions about crops, fertilizers, pests or
            irrigation? Get quick, AI-powered guidance to make
            better farming decisions.
          </p>

          <Link to="/ask-ai" className="ai-expert-button">
            Ask AI Expert <span>→</span>
          </Link>
        </div>

        <div className="ai-expert-image">
          <img
            src="/images/ai-farming-expert.jpg"
            alt="AI-powered farming assistant"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}

export default AIExpert;
