
import { Link } from "react-router-dom";
import "./CropKnowledge.css";

function CropKnowledge() {
  const crops = [
    { name: "Wheat", image: "/images/crops/wheat.jpg" },
    { name: "Mustard", image: "/images/crops/mustard.jpg" },
    { name: "Rice", image: "/images/crops/rice.jpg" },
    { name: "Cotton", image: "/images/crops/cotton.jpg" },
  ];

  return (
    <section className="crop-section">
      <div className="crop-container">

        <div className="crop-heading">
          <span>CROP KNOWLEDGE</span>
          <h2>
            Know Your Crops, <em>Grow Better.</em>
          </h2>
          <p>
            Explore useful farming knowledge and guidance
            for different crops.
          </p>
        </div>

        <div className="crop-list">
          {crops.map((crop) => (
            <div className="crop-card" key={crop.name}>
              <img src={crop.image} alt={crop.name} loading="lazy" />
              <h3>{crop.name}</h3>
            </div>
          ))}
        </div>

        <Link to="/knowledge" className="crop-button">
          Explore All Crops <span>→</span>
        </Link>

      </div>
    </section>
  );
}

export default CropKnowledge;
