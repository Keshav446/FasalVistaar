import { rupees } from "../../utils/scoring";

export function VerifiedBadge({ status, source }) {
  const ok = status === "verified";
  return <span className={`badge ${ok ? "badge-ok" : "badge-warn"}`} title={source}>{ok ? "Verified" : "Not verified"}</span>;
}

export default function ProductCard({ product, score, selected, onToggleCompare, disableCompare, onOpen }) {
  return (
    <article className={`card ${selected ? "card-selected" : ""}`}>
      <div className="card-head">
        <h3>{product.name}</h3>
        <VerifiedBadge {...product.verification} />
      </div>
      <p className="muted">{product.brand} · {product.category} · {product.rating}★</p>
      <p className="price">{rupees(product.price)} <span className="muted">/ {product.unit}</span></p>
      <p className="muted small">Suits: {product.crops.join(", ")}</p>
      {score != null && <p className="match">Match score: <strong>{score}%</strong></p>}
      <div className="card-actions">
        <button className="btn btn-ghost" onClick={() => onOpen(product)}>Find best shop</button>
        <label className={`check ${disableCompare && !selected ? "disabled" : ""}`}>
          <input type="checkbox" checked={selected} disabled={disableCompare && !selected} onChange={() => onToggleCompare(product.id)} />
          Compare
        </label>
      </div>
    </article>
  );
}