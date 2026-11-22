import "../../styles/products.css";
import { useMemo, useRef, useState } from "react";
import { products } from "../../data/products";
import { scoreProduct } from "../../utils/scoring";
import ProductCard from "../../components/cards/ProductCard";
import ProductFilters from "./components/ProductFilters";
import ProductComparison from "./components/ProductComparison";
import Sellers from "../sellers/Sellers";

const MAX_COMPARE = 4;

export default function Products() {
  const [filters, setFilters] = useState({ q: "", crop: "", category: "", budget: "", verifiedOnly: false });
  const [compareIds, setCompareIds] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [shopFor, setShopFor] = useState(null); // product whose sellers are shown
  const compareRef = useRef(null);

  // Show the comparison and scroll up to it.
  const openCompare = () => {
    setShowCompare(true);
    requestAnimationFrame(() => compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const results = useMemo(() => {
    const ctx = { crop: filters.crop, budget: Number(filters.budget) || 0 };
    return products
      .filter((p) => !filters.q || `${p.name} ${p.brand}`.toLowerCase().includes(filters.q.toLowerCase()))
      .filter((p) => !filters.crop || p.crops.includes(filters.crop))
      .filter((p) => !filters.category || p.category === filters.category)
      .filter((p) => !ctx.budget || p.price <= ctx.budget)
      .filter((p) => !filters.verifiedOnly || p.verification.status === "verified")
      .map((p) => ({ p, score: scoreProduct(p, ctx) }))
      .sort((a, b) => b.score - a.score);
  }, [filters]);

  const scores = Object.fromEntries(results.map(({ p, score }) => [p.id, score]));
  const toggle = (id) => setCompareIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  const compareItems = products.filter((p) => compareIds.includes(p.id));
  compareItems.forEach((p) => { if (scores[p.id] == null) scores[p.id] = scoreProduct(p, {}); });

  if (shopFor) return <Sellers product={shopFor} onBack={() => setShopFor(null)} />;

  return (
    <main className="fv">
      <span className="page-label"><i />COMPARE PRODUCTS</span>
      <h1>Find the best product <span>for your crop.</span></h1>
      <p className="lead">Pick your crop and budget, then tick “Compare” on up to {MAX_COMPARE} products to see them side by side.</p>
      <ProductFilters filters={filters} setFilters={setFilters} />

      <div ref={compareRef}>
        {showCompare && compareItems.length >= 2 && (
          <ProductComparison items={compareItems} scores={scores} onClose={() => setShowCompare(false)} onRemove={toggle} />
        )}
      </div>

      {results.length === 0 ? (
        <div className="empty"><h3>No products match</h3><p>Try removing a filter or raising your budget.</p></div>
      ) : (
        <div className="grid">
          {results.map(({ p, score }) => (
            <ProductCard key={p.id} product={p} score={score} selected={compareIds.includes(p.id)}
              disableCompare={compareIds.length >= MAX_COMPARE} onToggleCompare={toggle} onOpen={setShopFor} />
          ))}
        </div>
      )}

      {compareIds.length > 0 && (
        <div className="compare-bar">
          <span>{compareIds.length} of {MAX_COMPARE} selected</span>
          <button className="btn" disabled={compareIds.length < 2} onClick={openCompare}>
            {compareIds.length < 2 ? "Select one more" : "Compare now"}
          </button>
        </div>
      )}
    </main>
  );
}