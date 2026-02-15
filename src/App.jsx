import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import SavedSearches from "./pages/SavedSearches";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/saved-searches" element={<SavedSearches />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
