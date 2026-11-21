import { VerifiedBadge } from "../../../components/cards/ProductCard";

export default function ProductSpecifications({ product }) {
  const { ingredients = [], specs = {}, crops = [], verification } = product;
  const specRows = Object.entries(specs);
  const maxPercent = Math.max(0, ...ingredients.map((i) => i.percent));

  return (
    <div className="specs">
      {ingredients.length > 0 && (
        <section className="panel">
          <h2>Ingredients (nutrient content)</h2>
          <ul className="nutrients">
            {ingredients.map((i) => (
              <li key={i.name}>
                <div className="nutrient-row">
                  <span>{i.name}</span>
                  <strong>{i.percent}%</strong>
                </div>
                <div className="meter" aria-hidden="true">
                  <span style={{ width: `${(i.percent / maxPercent) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {specRows.length > 0 && (
        <section className="panel">
          <h2>Specifications</h2>
          <table className="spec-table">
            <tbody>
              {specRows.map(([k, v]) => (
                <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="panel">
        <h2>Suitable crops</h2>
        <div className="chips">
          {crops.map((c) => <span key={c} className="chip">{c}</span>)}
        </div>
      </section>

      <section className="panel">
        <h2>Verification</h2>
        <p><VerifiedBadge {...verification} /></p>
        <p className="muted small" style={{ marginTop: 10 }}>Checked against: {verification.source}</p>
        <p className="muted small" style={{ marginTop: 6 }}>
          This means the label details match a registered grade or standard. It is not a laboratory test of the contents.
        </p>
      </section>
    </div>
  );
}