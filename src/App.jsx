
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import SavedSearches from "./pages/SavedSearches";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ⭐ DEFAULT ROUTE — VERY IMPORTANT */}
        <Route path="/" element={<Properties />} />

        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/saved-searches" element={<SavedSearches />} />
        <Route path="/search" element={<Search />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
