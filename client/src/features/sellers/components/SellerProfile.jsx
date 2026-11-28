import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../../../components/layout/PageShell";
import Notice from "../../../components/common/Notice";
import { VerifiedBadge } from "../../../components/cards/ProductCard";
import { getSeller } from "../../../services/sellerService";
import { rupees } from "../../../utils/scoring";

const LOW_STOCK = 10;

function StockBadge({ quantity }) {
  if (quantity <= 0) return <span className="badge badge-off">Out of stock</span>;
  if (quantity <= LOW_STOCK) return <span className="badge badge-warn">Only {quantity} left</span>;
  return <span className="badge badge-ok">{quantity} in stock</span>;
}

// `seller` is the short info from the list; the full shop (with live stock) is loaded here.
export default function SellerProfile({ seller, onBack }) {
  const [state, setState] = useState({ loading: true, error: "", data: null });
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, error: "", data: null });
    getSeller(seller.id)
      .then((r) => !cancelled && setState({ loading: false, error: "", data: r.data }))
      .catch((e) => !cancelled && setState({ loading: false, error: e.message, data: null }));
    return () => { cancelled = true; };
  }, [seller.id, retry]);

  const shop = state.data;
  const stock = (shop?.stock || []).filter((s) => s.product);
  const rated = (shop?.rating ?? seller.rating) > 0;

  return (
    <PageShell
      label="SELLER"
      title={shop?.name || seller.name}
      lead={
        <>
          {shop?.area || seller.area}
          {rated && <> · {shop?.rating ?? seller.rating}★</>}{" "}
          <VerifiedBadge status={(shop?.verified ?? seller.verified) ? "verified" : "unverified"} source="Seller verification" />
        </>
      }
    >
      <button className="btn btn-ghost back" onClick={onBack}>← Back to results</button>

      {state.loading ? (
        <Notice loading />
      ) : state.error ? (
        <Notice title="Could not load this shop" text={state.error} action={<button className="btn" onClick={() => setRetry((n) => n + 1)}>Try again</button>} />
      ) : (
        <div className="details-layout">
          <section className="panel">
            <h2>Products in stock ({stock.length})</h2>
            {stock.length === 0 ? (
              <Notice title="No products listed" text="This shop hasn’t added any products yet." />
            ) : (
              <ul className="stock-list">
                {stock.map((s) => {
                  const p = s.product;
                  const pid = p.id || p._id;
                  return (
                    <li key={pid} className={`stock-item ${s.quantity <= 0 ? "stock-off" : ""}`}>
                      <div>
                        <Link className="card-title" to={`/compare-products/${pid}`}><strong>{p.name}</strong></Link>
                        <p className="muted small">{p.brand} · {p.category}</p>
                        {p.ingredients?.length > 0 && (
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
                        <strong>{rupees(s.price)}</strong>
                        <span className="muted small">/ {p.unit}</span>
                        <StockBadge quantity={s.quantity} />
                        {s.price < p.price && s.quantity > 0 && <span className="badge badge-ok">Below usual price</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <aside className="panel buy-box">
            <h2 style={{ fontSize: 18 }}>Shop details</h2>
            <dl className="info-list">
              <div><dt>Area</dt><dd>{shop.area}</dd></div>
              {seller.distanceKm != null && <div><dt>Distance</dt><dd>{seller.distanceKm} km away</dd></div>}
              <div><dt>Rating</dt><dd>{rated ? `${shop.rating} / 5` : "No ratings yet"}</dd></div>
              <div><dt>Status</dt><dd>{shop.verified ? "Verified seller" : "Not verified yet"}</dd></div>
              <div><dt>Phone</dt><dd>{shop.phone}</dd></div>
              <div><dt>Stock updated</dt><dd>{new Date(shop.updatedAt).toLocaleDateString("en-IN")}</dd></div>
            </dl>
            <a className="btn" href={`tel:${shop.phone}`} style={{ width: "100%", marginTop: 18 }}>Call shop</a>
            <p className="muted small" style={{ marginTop: 12 }}>Call to confirm stock and price before you visit.</p>
          </aside>
        </div>
      )}
    </PageShell>
  );
}