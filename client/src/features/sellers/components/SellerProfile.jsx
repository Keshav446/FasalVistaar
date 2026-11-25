import { Link } from "react-router-dom";
import PageShell from "../../../components/layout/PageShell";
import { products } from "../../../data/products";
import { rupees } from "../../../utils/scoring";
import { VerifiedBadge } from "../../../components/cards/ProductCard";

export default function SellerProfile({ seller, onBack }) {
  const stock = Object.entries(seller.prices)
    .map(([id, price]) => {
      const p = products.find((x) => x.id === id);
      return p ? { ...p, shopPrice: price } : null;
    })
    .filter(Boolean);

  return (
    <PageShell
      label="SELLER"
      title={seller.name}
      lead={
        <>
          {seller.area} · {seller.rating}★{" "}
          <VerifiedBadge status={seller.verified ? "verified" : "unverified"} source="Seller verification" />
        </>
      }
    >
      <button className="btn btn-ghost back" onClick={onBack}>← Back to results</button>

      <div className="details-layout">
        <section className="panel">
          <h2>Products in stock ({stock.length})</h2>
          {stock.length === 0 ? (
            <div className="empty"><h3>No products listed</h3><p className="muted">This shop hasn’t added any products yet.</p></div>
          ) : (
            <ul className="stock-list">
              {stock.map((p) => (
                <li key={p.id} className="stock-item">
                  <div>
                    <Link className="card-title" to={`/compare-products/${p.id}`}><strong>{p.name}</strong></Link>
                    <p className="muted small">{p.brand} · {p.category}</p>
                    {p.ingredients.length > 0 && (
                      <div className="npk">
                        {p.ingredients.map((i) => (
                          <span key={i.name} className="npk-item" title={i.name}>
                            <b>{(i.name.match(/\(([^)]+)\)/) || [, i.name])[1]}</b> {i.percent}%
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="stock-price">
                    <strong>{rupees(p.shopPrice)}</strong>
                    <span className="muted small">/ {p.unit}</span>
                    {p.shopPrice < p.price && <span className="badge badge-ok">Below usual price</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="panel buy-box">
          <h2 style={{ fontSize: 18 }}>Shop details</h2>
          <dl className="info-list">
            <div><dt>Area</dt><dd>{seller.area}</dd></div>
            <div><dt>Distance</dt><dd>{seller.distanceKm} km away</dd></div>
            <div><dt>Rating</dt><dd>{seller.rating} / 5</dd></div>
            <div><dt>Status</dt><dd>{seller.verified ? "Verified seller" : "Not verified yet"}</dd></div>
            <div><dt>Phone</dt><dd>{seller.phone}</dd></div>
          </dl>
          <a className="btn" href={`tel:${seller.phone}`} style={{ width: "100%", marginTop: 18 }}>Call shop</a>
          <p className="muted small" style={{ marginTop: 12 }}>
            Call to confirm stock and price before you visit.
          </p>
        </aside>
      </div>
    </PageShell>
  );
}