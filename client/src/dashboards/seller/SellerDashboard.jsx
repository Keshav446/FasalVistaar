import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import Notice from "../../components/common/Notice";
import { getProducts } from "../../services/productService";
import { getMySeller, createSeller, updateSeller, saveStock, removeStock } from "../../services/sellerService";
import { rupees } from "../../utils/scoring";

const LOW_STOCK = 10; // same limit the user side uses for "Only N left"
const PHONE_RE = /^[0-9+\-\s]{8,15}$/;

const errorText = (e) => (e.details?.length ? `${e.message}: ${e.details.map((d) => `${d.field} – ${d.message}`).join("; ")}` : e.message);

/* ---------- Create / edit shop form ---------- */
function ShopForm({ initial, submitLabel, busy, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    area: initial?.area || "",
    phone: initial?.phone || "",
    lat: initial?.location?.lat ?? "",
    lng: initial?.location?.lng ?? "",
  });
  const [errors, setErrors] = useState({});
  const [geoMsg, setGeoMsg] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const locate = () => {
    if (!navigator.geolocation) return setGeoMsg("Your browser does not support location.");
    setGeoMsg("Finding your location…");
    navigator.geolocation.getCurrentPosition(
      (p) => { setForm((f) => ({ ...f, lat: p.coords.latitude.toFixed(5), lng: p.coords.longitude.toFixed(5) })); setGeoMsg("Location added."); },
      () => setGeoMsg("Could not get location. Allow access and try again.")
    );
  };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = "Enter the shop name";
    if (form.area.trim().length < 2) err.area = "Enter the area / town";
    if (!PHONE_RE.test(form.phone.trim())) err.phone = "Enter a valid phone number (8–15 digits)";
    const hasLat = form.lat !== "", hasLng = form.lng !== "";
    if (hasLat !== hasLng) err.lat = "Add both latitude and longitude, or leave both empty";
    setErrors(err);
    if (Object.keys(err).length) return;

    const payload = { name: form.name.trim(), area: form.area.trim(), phone: form.phone.trim() };
    if (hasLat && hasLng) payload.location = { lat: Number(form.lat), lng: Number(form.lng) };
    onSubmit(payload);
  };

  return (
    <form className="form-grid" onSubmit={submit} noValidate>
      <label className="field">Shop name
        <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Shree Krishi Kendra" />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>
      <label className="field">Area / town
        <input className="input" value={form.area} onChange={(e) => set("area", e.target.value)} placeholder="e.g. Chomu, Jaipur" />
        {errors.area && <span className="field-error">{errors.area}</span>}
      </label>
      <label className="field">Phone
        <input className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="e.g. 9800000000" inputMode="tel" />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </label>
      <div className="field">
        Shop location (optional – used to show distance to farmers)
        <div className="inline-fields">
          <input className="input" aria-label="Latitude" type="number" step="any" placeholder="Latitude" value={form.lat} onChange={(e) => set("lat", e.target.value)} />
          <input className="input" aria-label="Longitude" type="number" step="any" placeholder="Longitude" value={form.lng} onChange={(e) => set("lng", e.target.value)} />
          <button type="button" className="btn btn-ghost" onClick={locate}>Use my location</button>
        </div>
        {errors.lat && <span className="field-error">{errors.lat}</span>}
        {geoMsg && <span className="muted small">{geoMsg}</span>}
      </div>
      <div className="form-actions">
        <button className="btn" disabled={busy}>{busy ? "Saving…" : submitLabel}</button>
        {onCancel && <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

/* ---------- One row of the stock table ---------- */
function StockRow({ item, busy, onSave, onRemove }) {
  const p = item.product;
  const pid = p.id || p._id;
  const [price, setPrice] = useState(String(item.price));
  const [qty, setQty] = useState(String(item.quantity));

  // keep the inputs in sync after the shop is refreshed from the server
  useEffect(() => { setPrice(String(item.price)); setQty(String(item.quantity)); }, [item.price, item.quantity]);

  const priceOk = price !== "" && Number(price) >= 0;
  const qtyOk = qty !== "" && Number.isInteger(Number(qty)) && Number(qty) >= 0;
  const dirty = Number(price) !== item.price || Number(qty) !== item.quantity;
  const q = Number(qty);

  return (
    <tr>
      <th scope="row">
        <strong>{p.name}</strong>
        <span className="muted small" style={{ display: "block", fontWeight: 400 }}>{p.brand} · {p.unit}</span>
      </th>
      <td>
        <input className="input input-sm" type="number" min="0" aria-label={`Price of ${p.name}`} value={price} onChange={(e) => setPrice(e.target.value)} />
      </td>
      <td>
        <input className="input input-sm" type="number" min="0" step="1" aria-label={`Quantity of ${p.name}`} value={qty} onChange={(e) => setQty(e.target.value)} />
      </td>
      <td>
        {item.quantity <= 0 ? <span className="badge badge-off">Out of stock</span>
          : item.quantity <= LOW_STOCK ? <span className="badge badge-warn">Low stock</span>
          : <span className="badge badge-ok">In stock</span>}
      </td>
      <td>
        <div className="row-actions">
          <button className="btn" disabled={busy || !dirty || !priceOk || !qtyOk}
            onClick={() => onSave(pid, { price: Number(price), quantity: q })}>Save</button>
          <button className="btn btn-ghost" disabled={busy}
            onClick={() => { if (window.confirm(`Remove ${p.name} from your shop? Farmers will no longer see it.`)) onRemove(pid, p.name); }}>Remove</button>
        </div>
      </td>
    </tr>
  );
}

/* ---------- Add a product form ---------- */
function AddProduct({ options, busy, onAdd }) {
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [error, setError] = useState("");

  const choose = (id) => {
    setProductId(id);
    const p = options.find((o) => o.id === id);
    setPrice(p ? String(p.price) : "");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!productId) return setError("Choose a product");
    if (price === "" || Number(price) < 0) return setError("Enter a valid price");
    if (qty === "" || !Number.isInteger(Number(qty)) || Number(qty) < 0) return setError("Quantity must be a whole number (0 or more)");
    setError("");
    onAdd({ product: productId, price: Number(price), quantity: Number(qty) }).then((ok) => {
      if (ok) { setProductId(""); setPrice(""); setQty(""); }
    });
  };

  if (options.length === 0) return <p className="muted">You have added every product in the catalogue.</p>;

  return (
    <form className="form-grid add-form" onSubmit={submit} noValidate>
      <label className="field">Product
        <select className="input" value={productId} onChange={(e) => choose(e.target.value)}>
          <option value="">Choose a product…</option>
          {options.map((o) => <option key={o.id} value={o.id}>{o.name} ({o.unit})</option>)}
        </select>
      </label>
      <label className="field">Your price (₹)
        <input className="input" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <label className="field">Quantity in stock
        <input className="input" type="number" min="0" step="1" value={qty} onChange={(e) => setQty(e.target.value)} />
      </label>
      <div className="form-actions"><button className="btn" disabled={busy}>Add to my shop</button></div>
      {error && <span className="field-error" style={{ gridColumn: "1 / -1" }}>{error}</span>}
    </form>
  );
}

/* ---------- Page ---------- */
export default function SellerDashboard() {
  const [shop, setShop] = useState(undefined); // undefined = loading, null = no shop yet
  const [problem, setProblem] = useState(null); // { kind: "login" | "role" | "error", text }
  const [catalog, setCatalog] = useState([]);
  const [msg, setMsg] = useState(null); // { type: "ok" | "err", text }
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await getMySeller();
      setShop(r.data);
      setProblem(null);
    } catch (e) {
      if (e.status === 401) setProblem({ kind: "login" });
      else if (e.status === 403) setProblem({ kind: "role" });
      else setProblem({ kind: "error", text: e.message });
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    getProducts({ limit: 50, sort: "rating" }).then((r) => setCatalog(r.data)).catch(() => {});
  }, []);

  // Runs an action, refreshes the shop from the server, and shows a message
  const run = async (action, okText) => {
    setBusy(true);
    setMsg(null);
    try {
      await action();
      await load();
      setMsg({ type: "ok", text: okText });
      return true;
    } catch (e) {
      setMsg({ type: "err", text: errorText(e) });
      return false;
    } finally {
      setBusy(false);
    }
  };

  /* --- states before the dashboard --- */
  if (problem?.kind === "login") {
    return (
      <PageShell label="SELLER DASHBOARD" title="Manage Your" accent="Shop">
        <Notice title="Please log in" text="Log in with your seller account to manage your shop." action={<Link className="btn" to="/login">Go to login</Link>} />
      </PageShell>
    );
  }
  if (problem?.kind === "role") {
    return (
      <PageShell label="SELLER DASHBOARD" title="Manage Your" accent="Shop">
        <Notice title="This page is for sellers" text="Your account is not a seller account. Register as a seller to list your shop." />
      </PageShell>
    );
  }
  if (problem?.kind === "error") {
    return (
      <PageShell label="SELLER DASHBOARD" title="Manage Your" accent="Shop">
        <Notice title="Could not load your shop" text={problem.text} action={<button className="btn" onClick={load}>Try again</button>} />
      </PageShell>
    );
  }
  if (shop === undefined) {
    return <PageShell label="SELLER DASHBOARD" title="Manage Your" accent="Shop"><Notice loading /></PageShell>;
  }

  /* --- no shop yet: create one --- */
  if (shop === null) {
    return (
      <PageShell label="SELLER DASHBOARD" title="Add Your" accent="Shop" lead="Tell farmers where to find you. You can add your products after this step.">
        {msg && <p className={`banner banner-${msg.type}`} role="status">{msg.text}</p>}
        <section className="panel" style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2>Shop details</h2>
          <ShopForm submitLabel="Create my shop" busy={busy} onSubmit={(data) => run(() => createSeller(data), "Your shop was created. Now add your products.")} />
        </section>
      </PageShell>
    );
  }

  /* --- the dashboard --- */
  const stock = shop.stock.filter((s) => s.product);
  const inShop = new Set(stock.map((s) => s.product.id || s.product._id));
  const options = catalog.filter((p) => !inShop.has(p.id));
  const units = stock.reduce((sum, s) => sum + s.quantity, 0);
  const low = stock.filter((s) => s.quantity > 0 && s.quantity <= LOW_STOCK).length;
  const out = stock.filter((s) => s.quantity <= 0).length;

  return (
    <PageShell label="SELLER DASHBOARD" title="Manage" accent={shop.name} lead="Changes you save here show up for farmers on the Find Sellers page straight away.">
      {msg && <p className={`banner banner-${msg.type}`} role="status">{msg.text}</p>}
      {!shop.verified && (
        <p className="banner banner-warn">Your shop is not verified yet, so farmers see a “Not verified” label. An admin has to verify it.</p>
      )}

      <div className="stats">
        <div className="stat"><strong>{stock.length}</strong><span>Products listed</span></div>
        <div className="stat"><strong>{units}</strong><span>Units in stock</span></div>
        <div className="stat"><strong>{low}</strong><span>Low stock (≤ {LOW_STOCK})</span></div>
        <div className="stat"><strong>{out}</strong><span>Out of stock</span></div>
      </div>

      <section className="panel" style={{ marginBottom: 24 }}>
        <div className="compare-head">
          <h2>Shop details</h2>
          {!editing && <button className="btn btn-ghost" onClick={() => setEditing(true)}>Edit</button>}
        </div>
        {editing ? (
          <ShopForm initial={shop} submitLabel="Save changes" busy={busy}
            onCancel={() => setEditing(false)}
            onSubmit={(data) => run(() => updateSeller(shop.id, data), "Shop details updated.").then((ok) => ok && setEditing(false))} />
        ) : (
          <dl className="info-list">
            <div><dt>Name</dt><dd>{shop.name}</dd></div>
            <div><dt>Area</dt><dd>{shop.area}</dd></div>
            <div><dt>Phone</dt><dd>{shop.phone}</dd></div>
            <div><dt>Location</dt><dd>{shop.location?.lat != null ? `${shop.location.lat}, ${shop.location.lng}` : "Not set (distance won’t be shown)"}</dd></div>
          </dl>
        )}
      </section>

      <section className="panel" style={{ marginBottom: 24 }}>
        <h2>Your products</h2>
        {stock.length === 0 ? (
          <Notice title="No products yet" text="Add your first product below so farmers can find your shop." />
        ) : (
          <>
            <p className="muted small" style={{ marginBottom: 12 }}>Change the price or quantity and press Save. Set the quantity to 0 to show a product as out of stock.</p>
            <div className="table-wrap">
              <table className="dash-table">
                <thead><tr><th>Product</th><th>Price (₹)</th><th>Quantity</th><th>Status</th><th /></tr></thead>
                <tbody>
                  {stock.map((item) => (
                    <StockRow key={item.product.id || item.product._id} item={item} busy={busy}
                      onSave={(pid, v) => run(() => saveStock(shop.id, { product: pid, ...v }), "Saved. Farmers can see the new price and quantity.")}
                      onRemove={(pid, name) => run(() => removeStock(shop.id, pid), `${name} removed from your shop.`)} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <section className="panel">
        <h2>Add a product</h2>
        <AddProduct options={options} busy={busy}
          onAdd={(v) => run(() => saveStock(shop.id, v), "Product added to your shop.")} />
      </section>
    </PageShell>
  );
}