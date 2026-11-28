import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import Notice from "../../components/common/Notice";
import { VerifiedBadge } from "../../components/cards/ProductCard";
import ProductSpecifications from "./components/ProductSpecifications";
import { getProduct, getProductSellers } from "../../services/productService";
import { rupees } from "../../utils/scoring";

// Route: /compare-products/:id
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ loading: true, error: "", status: 0, product: null, sellers: [] });
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, error: "", status: 0, product: null, sellers: [] });
    Promise.all([getProduct(id), getProductSellers(id)])
      .then(([p, s]) => !cancelled && setState({ loading: false, error: "", status: 0, product: p.data, sellers: s.data }))
      .catch((e) => !cancelled && setState({ loading: false, error: e.message, status: e.status || 0, product: null, sellers: [] }));
    return () => { cancelled = true; };
  }, [id, retry]);

  const { product, sellers } = state;

  if (state.loading) return <PageShell label="PRODUCT" title="Loading…"><Notice loading /></PageShell>;

  if (!product) {
    const missing = state.status === 404 || state.status === 400;
    return (
      <PageShell label="PRODUCT" title={missing ? "Product not found" : "Something went wrong"}>
        <Notice
          title={missing ? "Product not found" : "Could not load this product"}
          text={missing ? "This product may have been removed or the link is wrong." : state.error}
          action={
            missing
              ? <Link className="btn" to="/compare-products">Back to products</Link>
              : <button className="btn" onClick={() => setRetry((n) => n + 1)}>Try again</button>
          }
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      label={product.category.toUpperCase()}
      title={product.name}
      lead={<>{product.brand} · {product.rating}★ <VerifiedBadge {...product.verification} /></>}
    >
      <button className="btn btn-ghost back" onClick={() => navigate(-1)}>← Back</button>

      <div className="details-layout">
        <div><ProductSpecifications product={product} /></div>

        <aside className="panel buy-box">
          <p className="muted small">Typical price</p>
          <p className="price">{rupees(product.price)} <span className="muted">/ {product.unit}</span></p>

          <h2 style={{ marginTop: 22, fontSize: 18 }}>Best shops for this product</h2>
          {sellers.length === 0 ? (
            <p className="muted small" style={{ marginTop: 8 }}>No shop has this in stock right now.</p>
          ) : (
            <ul className="seller-list">
              {sellers.slice(0, 3).map((s, i) => (
                <li key={s.id}>
                  <div>
                    <strong>{s.name}</strong> {i === 0 && <span className="badge badge-ok">Best match</span>}
                    <p className="muted small">{s.area}{s.rating > 0 && ` · ${s.rating}★`} · {s.quantity <= 10 ? `only ${s.quantity} left` : `${s.quantity} in stock`}</p>
                  </div>
                  <strong>{rupees(s.price)}</strong>
                </li>
              ))}
            </ul>
          )}
          <Link className="btn" to="/sellers" style={{ width: "100%", marginTop: 18 }}>See all sellers</Link>
        </aside>
      </div>
    </PageShell>
  );
}