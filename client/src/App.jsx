
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./features/home/Home";
import VerifyProduct from "./features/Verification/VerificationProduct";
import HelpSupport from "./features/HelpSupport/HelpSupport";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
