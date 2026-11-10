import { CROPS, CATEGORIES } from "../../../data/products";

export default function ProductFilters({ filters, setFilters }) {
  const set = (k, v) => setFilters((f) => ({ ...f, [k]: v }));
  return (
    <form className="filters" onSubmit={(e) => e.preventDefault()}>
      <input className="input" placeholder="Search product or brand" value={filters.q} onChange={(e) => set("q", e.target.value)} />
      <select className="input" value={filters.crop} onChange={(e) => set("crop", e.target.value)}>
        <option value="">Any crop</option>{CROPS.map((c) => <option key={c}>{c}</option>)}
      </select>
      <select className="input" value={filters.category} onChange={(e) => set("category", e.target.value)}>
        <option value="">All types</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <input className="input" type="number" min="0" placeholder="Max budget (₹)" value={filters.budget} onChange={(e) => set("budget", e.target.value)} />
      <label className="check"><input type="checkbox" checked={filters.verifiedOnly} onChange={(e) => set("verifiedOnly", e.target.checked)} /> Verified only</label>
    </form>
  );
}