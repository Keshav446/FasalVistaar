import { useEffect, useMemo, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import SellerCard from "../../components/cards/SellerCard";
import Notice from "../../components/common/Notice";
import SellerProfile from "./components/SellerProfile";
import { getProducts, getProductSellers } from "../../services/productService";

// Works on its own (/sellers) or opened from a product card (product prop).
export default function Sellers({ product, onBack }) {
  const [catalog, setCatalog] = useState({ loading: true, error: "", items: [] });
  const [productId, setProductId] = useState(product?.id || "");
  const [sortBy, setSortBy] = useState("best");
  const [maxKm, setMaxKm] = useState("");
  const [where, setWhere] = useState(null); // { lat, lng } once the user shares their location
  const [geoMsg, setGeoMsg] = useState("");
  const [res, setRes] = useState({ loading: false, error: "", items: [] });
  const [retry, setRetry] = useState(0);
  const [open, setOpen] = useState(null);

  // Products for the dropdown
  useEffect(() => {
    getProducts({ limit: 50, sort: "rating" })
      .then((r) => {
        setCatalog({ loading: false, error: "", items: r.data });
        setProductId((id) => id || r.data[0]?.id || "");
      })
      .catch((e) => setCatalog({ loading: false, error: e.message, items: [] }));
  }, [retry]);

  // Shops that have the chosen product in stock (live from the sellers' dashboards)
  useEffect(() => {
    if (!productId) return;
    let cancelled = false;
    setRes((s) => ({ ...s, loading: true, error: "" }));
    getProductSellers(productId, { lat: where?.lat, lng: where?.lng, maxKm: where ? maxKm : "" })
      .then((r) => !cancelled && setRes({ loading: false, error: "", items: r.data }))
      .catch((e) => !cancelled && setRes({ loading: false, error: e.message, items: [] }));
    return () => { cancelled = true; };
  }, [productId, where, maxKm, retry]);

  const list = useMemo(() => {
    const items = [...res.items];
    if (sortBy === "price") items.sort((a, b) => a.price - b.price);
    if (sortBy === "distance") items.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
    if (sortBy === "rating") items.sort((a, b) => b.rating - a.rating);
    return items;
  }, [res.items, sortBy]);

  const useMyLocation = () => {
    if (!navigator.geolocation) return setGeoMsg("Your browser does not support location.");
    setGeoMsg("Finding your location…");
    navigator.geolocation.getCurrentPosition(
      (pos) => { setWhere({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setGeoMsg(""); },
      () => setGeoMsg("Could not get your location. Allow location access and try again.")
    );
  };

  if (open) return <SellerProfile seller={open} onBack={() => setOpen(null)} />;

  return (
    <PageShell
      label="FIND SELLERS"
      title="Find the Best"
      accent="Shop for Your Requirement"
      lead="Compare shops by price, distance and rating. Only shops that currently have the product in stock are shown."
    >
      {onBack && <button className="btn btn-ghost back" onClick={onBack}>← Back to products</button>}

      <form className="filters" onSubmit={(e) => e.preventDefault()}>
        <select className="input" aria-label="Product" value={productId} onChange={(e) => setProductId(e.target.value)}>
          {catalog.items.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select className="input" aria-label="Sort by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="best">Best overall</option>
          <option value="price">Lowest price</option>
          <option value="distance">Nearest</option>
          <option value="rating">Top rated</option>
        </select>
        {where ? (
          <>
            <input className="input" type="number" min="1" placeholder="Within km" aria-label="Within km" value={maxKm} onChange={(e) => setMaxKm(e.target.value)} />
            <button type="button" className="btn btn-ghost" onClick={() => { setWhere(null); setMaxKm(""); }}>Clear location</button>
          </>
        ) : (
          <button type="button" className="btn btn-ghost" onClick={useMyLocation}>Use my location</button>
        )}
      </form>
      {geoMsg && <p className="muted small" role="status" style={{ marginBottom: 16 }}>{geoMsg}</p>}

      {catalog.loading || res.loading ? (
        <Notice loading />
      ) : catalog.error || res.error ? (
        <Notice title="Could not load shops" text={catalog.error || res.error} action={<button className="btn" onClick={() => setRetry((n) => n + 1)}>Try again</button>} />
      ) : list.length === 0 ? (
        <Notice title="No shop found" text="No shop has this product in stock right now (or none within that distance)." />
      ) : (
        <div className="grid">
          {list.map((s, i) => <SellerCard key={s.id} seller={s} rank={sortBy === "best" ? i : -1} onOpen={setOpen} />)}
        </div>
      )}
    </PageShell>
  );
}