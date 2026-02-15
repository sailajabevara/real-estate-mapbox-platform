import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
