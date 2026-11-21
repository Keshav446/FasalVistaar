import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/products.css";
import { products } from "../../data/products";
import { sellers } from "../../data/sellers";
import { rankSellers, rupees } from "../../utils/scoring";
import { VerifiedBadge } from "../../components/cards/ProductCard";
import ProductSpecifications from "./components/ProductSpecifications";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const topSellers = useMemo(() => (product ? rankSellers(sellers, product.id).slice(0, 3) : []), [product]);

  if (!product) {
    return (
      <main className="fv">
        <div className="empty">
          <h3>Product not found</h3>
          <p className="muted">This product may have been removed or the link is wrong.</p>
          <p style={{ marginTop: 16 }}><Link className="btn" to="/compare-products">Back to products</Link></p>
        </div>
      </main>
    );
  }

  return (
    <main className="fv">
      <button className="btn btn-ghost back" onClick={() => navigate(-1)}>← Back</button>

      <span className="page-label"><i />{product.category.toUpperCase()}</span>
      <h1>{product.name}</h1>
      <p className="lead">
        {product.brand} · {product.rating}★ <VerifiedBadge {...product.verification} />
      </p>

      <div className="details-layout">
        <div>
          <ProductSpecifications product={product} />
        </div>

        <aside className="panel buy-box">
          <p className="muted small">Typical price</p>
          <p className="price">{rupees(product.price)} <span className="muted">/ {product.unit}</span></p>

          <h2 style={{ marginTop: 22, fontSize: 18 }}>Best shops for this product</h2>
          {topSellers.length === 0 ? (
            <p className="muted small" style={{ marginTop: 8 }}>No seller has listed this product yet.</p>
          ) : (
            <ul className="seller-list">
              {topSellers.map((s, i) => (
                <li key={s.id}>
                  <div>
                    <strong>{s.name}</strong> {i === 0 && <span className="badge badge-ok">Best match</span>}
                    <p className="muted small">{s.area} · {s.distanceKm} km · {s.rating}★</p>
                  </div>
                  <strong>{rupees(s.price)}</strong>
                </li>
              ))}
            </ul>
          )}
          <Link className="btn" to="/sellers" style={{ width: "100%", marginTop: 18 }}>See all sellers</Link>
        </aside>
      </div>
    </main>
  );
}