import { Link } from "react-router-dom";

const sections = [
  { to: "/verify", title: "Verify the product", text: "Check before you buy." },
  { to: "/products", title: "Find the best product", text: "Compare products for your crop and budget." },
  { to: "/sellers", title: "Find the best shop", text: "Best price, nearest verified seller." },
  { to: "/knowledge", title: "Crop knowledge", text: "Learn what matters for your crop." },
  { to: "/ask-expert", title: "Help and support", text: "Ask an agricultural expert." },
  { to: "/chatbot", title: "AI chatbot with voice", text: "Ask the AI in your own words." },
];

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <h1>FasalVistaar</h1>
        <p>Sahi Jaankari, Behtar Kheti. Independent farming knowledge and product verification.</p>
        <Link to="/products" className="btn">Find the best product</Link>
      </section>
      <div className="grid">
        {sections.map((s) => (
          <Link key={s.to} to={s.to} className="card card-link">
            <h3>{s.title}</h3>
            <p className="muted">{s.text}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}