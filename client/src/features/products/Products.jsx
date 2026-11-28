import { useEffect, useRef, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import ProductCard from "../../components/cards/ProductCard";
import Notice from "../../components/common/Notice";
import ProductFilters from "./components/ProductFilters";
import ProductComparison from "./components/ProductComparison";
import Sellers from "../sellers/Sellers";
import { getProducts } from "../../services/productService";

const MAX_COMPARE = 4;

export default function Products() {
  const [filters, setFilters] = useState({ q: "", crop: "", category: "", budget: "", verifiedOnly: false });
  const [state, setState] = useState({ loading: true, error: "", items: [] });
  const [retry, setRetry] = useState(0);
  const [compareList, setCompareList] = useState([]); // full product objects, so they survive filter changes
  const [showCompare, setShowCompare] = useState(false);
  const [shopFor, setShopFor] = useState(null);
  const compareRef = useRef(null);

  // Load products from the API whenever a filter changes (small delay so typing doesn't spam the server)
  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: "" }));
    const timer = setTimeout(() => {
      getProducts({
        search: filters.q.trim(),
        crop: filters.crop,
        category: filters.category,
        maxPrice: filters.budget,
        verifiedOnly: filters.verifiedOnly ? "true" : "",
        limit: 50,
      })
        .then((r) => !cancelled && setState({ loading: false, error: "", items: r.data }))
        .catch((e) => !cancelled && setState({ loading: false, error: e.message, items: [] }));
    }, 300);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [filters, retry]);

  const toggle = (id) =>
    setCompareList((list) => {
      if (list.some((p) => p.id === id)) return list.filter((p) => p.id !== id);
      if (list.length >= MAX_COMPARE) return list;
      const product = state.items.find((p) => p.id === id);
      return product ? [...list, product] : list;
    });

  const openCompare = () => {
    setShowCompare(true);
    requestAnimationFrame(() => compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  if (shopFor) return <Sellers product={shopFor} onBack={() => setShopFor(null)} />;

  const compareIds = compareList.map((p) => p.id);
  const scores = Object.fromEntries(compareList.map((p) => [p.id, p.matchScore]));

  return (
    <PageShell
      label="COMPARE PRODUCTS"
      title="Find the Best"
      accent="Product for Your Crop"
      lead={`Pick your crop and budget, then tick “Compare” on up to ${MAX_COMPARE} products to see them side by side.`}
    >
      <ProductFilters filters={filters} setFilters={setFilters} />

      <div ref={compareRef}>
        {showCompare && compareList.length >= 2 && (
          <ProductComparison items={compareList} scores={scores} onClose={() => setShowCompare(false)} onRemove={toggle} />
        )}
      </div>

      {state.loading ? (
        <Notice loading />
      ) : state.error ? (
        <Notice title="Could not load products" text={state.error} action={<button className="btn" onClick={() => setRetry((n) => n + 1)}>Try again</button>} />
      ) : state.items.length === 0 ? (
        <Notice title="No products match" text="Try removing a filter or raising your budget." />
      ) : (
        <div className="grid">
          {state.items.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              score={p.matchScore}
              selected={compareIds.includes(p.id)}
              disableCompare={compareIds.length >= MAX_COMPARE}
              onToggleCompare={toggle}
              onOpen={setShopFor}
            />
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
    </PageShell>
  );
}