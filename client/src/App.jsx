
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import Knowledge from "./features/knowledge/Knowledge";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/knowledge" element ={ <Knowledge/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
