import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./features/home/Home";
import VerifyProduct from "./features/Verification/VerificationProduct";
import HelpSupport from "./features/HelpSupport/HelpSupport";
import Products from "./features/products/Products";
import Sellers from "./features/sellers/Sellers";
import Knowledge from "./features/knowledge/Knowledge";
import ProductDetails from "./features/products/ProductDetails";
import SellerDashboard from "./dashboards/seller/sellerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Verify Product Page */}
        <Route path="/verify-product" element={<VerifyProduct />} />

        {/* Help and Support Page */}
        <Route path="/help-support" element={<HelpSupport />} />

        <Route path="/compare-products" element={<Products />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path = "/knowledge" element ={ <Knowledge/>} />
        <Route path="/compare-products/:id" element={<ProductDetails />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;