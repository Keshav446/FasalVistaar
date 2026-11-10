import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import Products from "./features/products/Products";
import Sellers from "./features/sellers/Sellers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare-products" element={<Products />} />
        <Route path="/sellers" element={<Sellers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;