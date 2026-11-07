import { Routes, Route, Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout.jsx";
import Home from "../features/home/Home.jsx";
import Products from "../features/products/Products.jsx";
import Sellers from "../features/sellers/Sellers.jsx";
import VerifyProduct from "../features/verification/VerifyProduct.jsx";
import KnowledgeHub from "../features/knowledge/KnowledgeHub.jsx";
import AskExpert from "../features/experts/AskExpert.jsx";
import Chatbot from "../features/chatbot/Chatbot.jsx";
import Login from "../features/auth/Login.jsx";
import Register from "../features/auth/Register.jsx";

function NotFound() {
  return (
    <main className="page">
      <div className="empty">
        <h2>Page not found</h2>
        <p><Link to="/">Go back home</Link></p>
      </div>
    </main>
  );
}

// Add ProtectedRoute / RoleRoute wrappers around dashboard routes later.
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<VerifyProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/knowledge" element={<KnowledgeHub />} />
        <Route path="/ask-expert" element={<AskExpert />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}