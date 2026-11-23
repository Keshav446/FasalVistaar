
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Knowledge.css";

function Knowledge() {
  const [search, setSearch] = useState("");

  const crops = [
    {
      name: "Wheat",
      hindi: "Gehu",
      category: "Cereal",
      image: "/images/crops/wheat.jpg",
      slug: "wheat",
    },
    {
      name: "Rice",
      hindi: "Dhan",
      category: "Cereal",
      image: "/images/crops/rice.jpg",
      slug: "rice",
    },
    {
      name: "Mustard",
      hindi: "Sarson",
      category: "Oilseed",
      image: "/images/crops/mustard.jpg",
      slug: "mustard",
    },
    {
      name: "Cotton",
      hindi: "Kapas",
      category: "Cash Crop",
      image: "/images/crops/cotton.jpg",
      slug: "cotton",
    },
    {
      name: "Maize",
      hindi: "Makka",
      category: "Cereal",
      image: "/images/crops/maize.jpg",
      slug: "maize",
    },
    {
      name: "Bajra",
      hindi: "Pearl Millet",
      category: "Millet",
      image: "/images/crops/bajra.jpg",
      slug: "bajra",
    },
    {
      name: "Sugarcane",
      hindi: "Ganna",
      category: "Cash Crop",
      image: "/images/crops/sugarcane.jpg",
      slug: "sugarcane",
    },
    {
      name: "Groundnut",
      hindi: "Moongfali",
      category: "Oilseed",
      image: "/images/crops/groundnut.jpg",
      slug: "groundnut",
    },
  ];

  const filteredCrops = crops.filter((crop) =>
    `${crop.name} ${crop.hindi}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="knowledge-page">

        {/* Hero Section */}
        <section className="knowledge-hero">
          <div className="knowledge-hero-content">
            <span>FASALVISTAAR KNOWLEDGE CENTER</span>

            <h1>
              Grow Better with the
              <em> Right Knowledge.</em>
            </h1>

            <p>
              Explore crop guides, farming practices and
              useful agricultural information to make
              better farming decisions.
            </p>

            <div className="crop-search">
              <input
                type="text"
                placeholder="Search crops... e.g. Wheat, Rice"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span>⌕</span>
            </div>
          </div>
        </section>

        {/* Explore Crops */}
        <section className="explore-crops">
          <div className="explore-heading">
            <div>
              <span>EXPLORE AGRICULTURE</span>
              <h2>Explore Different Crops</h2>
              <p>
                Find useful information and farming guides
                for different crops.
              </p>
            </div>

            <span className="crop-count">
              {filteredCrops.length} Crops
            </span>
          </div>

          <div className="knowledge-crop-grid">
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop) => (
                <div className="knowledge-crop-card" key={crop.slug}>
                  <img
                    src={crop.image}
                    alt={crop.name}
                    loading="lazy"
                  />

                  <div className="knowledge-crop-info">
                    <span className="crop-category">
                      {crop.category}
                    </span>

                    <h3>{crop.name}</h3>
                    <p>{crop.hindi}</p>

                    <Link to={`/knowledge/${crop.slug}`}>
                      Explore Guide <span>→</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-crops">
                No crops found. Try searching another crop.
              </p>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Knowledge;
