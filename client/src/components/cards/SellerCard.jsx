import { rupees } from "../../utils/scoring";

export default function SellerCard({ seller, rank, onOpen }) {
  return (
    <article className={`card ${rank === 0 ? "card-best" : ""}`}>
      <div className="card-head">
        <h3>{seller.name}</h3>
        {rank === 0 && <span className="badge badge-ok">Best match</span>}
      </div>
      <p className="muted">{seller.area} · {seller.distanceKm} km away</p>
      <p className="price">{rupees(seller.price)}</p>
      <p className="muted small">{seller.rating}★ · {seller.verified ? "Verified seller" : "Seller not verified"} · Score {seller.score}%</p>
      <button className="btn btn-ghost" onClick={() => onOpen(seller)}>View shop</button>
    </article>
  );
}