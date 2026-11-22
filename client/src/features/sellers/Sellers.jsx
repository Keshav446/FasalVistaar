import "../../styles/products.css";
import { useMemo, useState } from "react";
import { sellers } from "../../data/sellers";
import { products } from "../../data/products";
import { rankSellers } from "../../utils/scoring";
import SellerCard from "../../components/cards/SellerCard";
import SellerProfile from "./components/SellerProfile";

// Use standalone (no props) or from a product card (product prop).
export default function Sellers({ product, onBack }) {
  const [productId, setProductId] = useState(product?.id || products[0].id);
  const [sortBy, setSortBy] = useState("best");
  const [maxKm, setMaxKm] = useState("");
  const [open, setOpen] = useState(null);

  const ranked = useMemo(() => {
    let list = rankSellers(sellers, productId).filter((s) => !maxKm || s.distanceKm <= Number(maxKm));
    if (sortBy === "price") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "distance") list = [...list].sort((a, b) => a.distanceKm - b.distanceKm);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [productId, sortBy, maxKm]);

  if (open) return <SellerProfile seller={open} onBack={() => setOpen(null)} />;

  return (
    <main className="fv">
      {onBack && <button className="btn btn-ghost back" onClick={onBack}>Back to products</button>}
      <span className="page-label"><i />FIND SELLERS</span>
      <h1>Find the best shop <span>for your requirement.</span></h1>
      <p className="lead">Compare sellers by price, distance and rating to find the best deal near you.</p>
      <form className="filters" onSubmit={(e) => e.preventDefault()}>
        <select className="input" value={productId} onChange={(e) => setProductId(e.target.value)}>
          {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="best">Best overall</option><option value="price">Lowest price</option>
          <option value="distance">Nearest</option><option value="rating">Top rated</option>
        </select>
        <input className="input" type="number" min="1" placeholder="Within km" value={maxKm} onChange={(e) => setMaxKm(e.target.value)} />
      </form>
      {ranked.length === 0 ? (
        <div className="empty"><h3>No shop found</h3><p>No seller stocks this product within that distance. Increase the distance.</p></div>
      ) : (
        <div className="grid">{ranked.map((s, i) => <SellerCard key={s.id} seller={s} rank={sortBy === "best" ? i : -1} onOpen={setOpen} />)}</div>
      )}
    </main>
  );
}