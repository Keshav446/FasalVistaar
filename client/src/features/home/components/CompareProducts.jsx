import { Link } from "react-router-dom";
import "./CompareProducts.css";

function CompareProducts() {
  const categories = [
    {
      name: "Fertilizers & Seeds",
      description: "Compare crop nutrients, seed varieties and prices.",
      image: "/images/compare/fertilizers-seeds.jpg",
    },
    {
      name: "Pesticides",
      description: "Explore product details and alternatives.",
      image: "/images/compare/pesticides.jpg",
    },
    {
      name: "Pipes & Irrigation",
      description: "Compare irrigation pipes, equipment and products.",
      image: "/images/compare/irrigation.jpg",
    },
  ];

  return (
    <section className="compare-section">
      <div className="compare-container">
        <div className="compare-heading">
          <span>MAKE BETTER CHOICES</span>
          <h2>
            Compare Products, <em>Choose Wisely.</em>
          </h2>
          <p>
            Compare agricultural products to find the right option for your
            farming needs and budget.
          </p>
        </div>

        <div className="compare-grid">
          {categories.map((category) => (
            <div className="compare-card" key={category.name}>
              <img src={category.image} alt={category.name} loading="lazy" />

              <div className="compare-card-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Link to="/compare-products" className="compare-button">
          Compare Products <span>→</span>
        </Link>
      </div>
    </section>
  );
}

export default CompareProducts;
