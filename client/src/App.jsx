import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";

import VerifyProduct from "./features/Verification/VerificationProduct";

function App() {
  return (
    <BrowserRouter>
      

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Verify Product Page */}
        <Route path="/verify-product" element={<VerifyProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
