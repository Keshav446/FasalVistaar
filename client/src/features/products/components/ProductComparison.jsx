import { rupees } from "../../../utils/scoring";
import { VerifiedBadge } from "../../../components/cards/ProductCard";

export default function ProductComparison({ items, scores, onClose, onRemove }) {
  const best = [...items].sort((a, b) => scores[b.id] - scores[a.id])[0];
  const cheapest = Math.min(...items.map((i) => i.price));
  const topRating = Math.max(...items.map((i) => i.rating));
  const ingredientNames = [...new Set(items.flatMap((i) => i.ingredients.map((g) => g.name)))];
  const specNames = [...new Set(items.flatMap((i) => Object.keys(i.specs || {})))];
  const pct = (i, n) => i.ingredients.find((g) => g.name === n)?.percent;

  const Row = ({ label, render, highlight }) => (
    <tr><th scope="row">{label}</th>{items.map((i) => <td key={i.id} className={highlight?.(i) ? "win" : ""}>{render(i) || "—"}</td>)}</tr>
  );

  return (
    <section className="compare" aria-label="Product comparison">
      <div className="compare-head">
        <h2>Comparing {items.length} products</h2>
        <button className="btn btn-ghost" onClick={onClose}>Close</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th />{items.map((i) => (
            <th key={i.id}>{i.name}{i.id === best.id && <span className="badge badge-ok">Best match</span>}
              <button className="link" onClick={() => onRemove(i.id)}>Remove</button></th>))}</tr></thead>
          <tbody>
            <Row label="Brand" render={(i) => i.brand} />
            <Row label="Price" render={(i) => `${rupees(i.price)} / ${i.unit}`} highlight={(i) => i.price === cheapest} />
            <Row label="Rating" render={(i) => `${i.rating}★`} highlight={(i) => i.rating === topRating} />
            <Row label="Verification" render={(i) => <VerifiedBadge {...i.verification} />} />
            <Row label="Checked against" render={(i) => i.verification.source} />
            <Row label="Suits crops" render={(i) => i.crops.join(", ")} />
            {ingredientNames.map((n) => <Row key={n} label={n} render={(i) => pct(i, n) != null && `${pct(i, n)}%`} />)}
            {specNames.map((n) => <Row key={n} label={n} render={(i) => i.specs?.[n]} />)}
            <Row label="Match score" render={(i) => `${scores[i.id]}%`} highlight={(i) => i.id === best.id} />
          </tbody>
        </table>
      </div>
      <p className="muted small">Green cells show the best value in that row. Match score = crop fit, rating, verification and budget.</p>
    </section>
  );
}