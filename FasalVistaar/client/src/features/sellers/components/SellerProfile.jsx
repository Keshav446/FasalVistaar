import { products } from "../../../data/products";
import { rupees } from "../../../utils/scoring";

export default function SellerProfile({ seller, onBack }) {
  const stock = Object.entries(seller.prices).map(([id, price]) => ({ ...products.find((p) => p.id === id), price }));
  return (
    <main className="page">
      <button className="btn btn-ghost" onClick={onBack}>Back to results</button>
      <h1>{seller.name}</h1>
      <p className="muted">{seller.area} · {seller.distanceKm} km · {seller.rating}★ · {seller.verified ? "Verified seller" : "Not verified"}</p>
      <p>Phone: {seller.phone}</p>
      <h2>Products in stock</h2>
      <ul className="plain">{stock.map((s) => <li key={s.id}>{s.name} — {rupees(s.price)} / {s.unit}</li>)}</ul>
    </main>
  );
}