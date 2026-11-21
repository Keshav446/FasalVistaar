
import "./FarmerReviews.css";

function FarmerReviews() {
  const reviews = [
    {
      name: "Ramesh Kumar",
      location: "Jaipur, Rajasthan",
      review:
        "FasalVistaar helped me understand agricultural products better and make more informed decisions.",
    },
    {
      name: "Suresh Singh",
      location: "Alwar, Rajasthan",
      review:
        "The crop knowledge and product comparison features make farming information easier to understand.",
    },
    {
      name: "Mohan Lal",
      location: "Sikar, Rajasthan",
      review:
        "Having farming guidance in one place saves time and helps me explore better options for my crops.",
    },
  ];

  return (
    <section className="reviews-section">
      <div className="reviews-container">

        <div className="reviews-heading">
          <span>FARMER EXPERIENCES</span>
          <h2>
            Growing Together, <em>Learning Together.</em>
          </h2>
          <p>
            Discover how FasalVistaar aims to make farming
            information more accessible for everyone.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((item, index) => (
            <div className="review-card" key={index}>
              <div className="review-stars">★★★★★</div>

              <p className="review-text">
                "{item.review}"
              </p>

              <div className="review-author">
                <div className="review-avatar">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3>{item.name}</h3>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FarmerReviews;
