// Loading / empty / error box used by every page.
export default function Notice({ loading, title, text, action }) {
  return (
    <div className="empty" role={loading ? "status" : undefined}>
      {loading && <span className="spinner" aria-hidden="true" />}
      <h3>{loading ? "Loading…" : title}</h3>
      {text && !loading && <p className="muted">{text}</p>}
      {action && !loading && <p style={{ marginTop: 14 }}>{action}</p>}
    </div>
  );
}