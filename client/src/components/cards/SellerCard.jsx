import { rupees } from "../../utils/scoring";

export default function SellerCard({ seller, rank, onOpen }) {
  const low = seller.quantity != null && seller.quantity <= 10;
  return (
    <article className={`card ${rank === 0 ? "card-best" : ""}`}>
      <div className="card-head">
        <h3>{seller.name}</h3>
        {rank === 0 && <span className="badge badge-ok">Best match</span>}
      </div>
      <p className="muted">
        {seller.area}
        {seller.distanceKm != null && ` · ${seller.distanceKm} km away`}
      </p>
      <p className="price">{rupees(seller.price)}{seller.unit && <span className="muted"> / {seller.unit}</span>}</p>
      {seller.quantity != null && (
        <p>
          <span className={`badge ${low ? "badge-warn" : "badge-ok"}`} style={{ marginLeft: 0 }}>
            {low ? `Only ${seller.quantity} left` : `${seller.quantity} in stock`}
          </span>
        </p>
      )}
      <p className="muted small">
        {seller.rating > 0 ? `${seller.rating}★` : "No ratings yet"} · {seller.verified ? "Verified seller" : "Seller not verified"} · Score {seller.score}%
      </p>
      <div className="card-actions"><button className="btn btn-ghost" onClick={() => onOpen(seller)}>View shop</button></div>
    </article>
  );
}