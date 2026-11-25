import Navbar from "./Navbar";
import "../../styles/products.css";

// Same page structure as the Verify Product page:
// navbar on top -> centred hero band (label, title, intro) -> content below.
export default function PageShell({ label, title, accent, lead, children }) {
  return (
    <>
      <Navbar />
      <div className="fv">
        <header className="fv-hero">
          <span className="page-label"><i />{label}</span>
          <h1>
            {title}
            {accent && <> <span>{accent}</span></>}
          </h1>
          {lead && <p className="lead">{lead}</p>}
        </header>
        <main className="fv-body">{children}</main>
      </div>
    </>
  );
}