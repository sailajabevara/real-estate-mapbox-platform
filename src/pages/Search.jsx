export default function Search() {
  return (
    <div>

      <h1>Advanced Search</h1>

      <input
        data-testid="location-autocomplete"
        placeholder="Search location"
      />

      <input
        type="range"
        data-testid="search-radius-slider"
        min="1"
        max="50"
      />

      <input
        data-testid="price-min-input"
        placeholder="Min price"
      />

      <input
        data-testid="price-max-input"
        placeholder="Max price"
      />

      <select data-testid="bedrooms-select">
        <option value="">Bedrooms</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
      </select>

      <button data-testid="draw-boundary-button">
        Draw Boundary
      </button>

      <button data-testid="apply-filters-button">
        Apply Filters
      </button>

      <div data-testid="results-count">
        Results: 0
      </div>

    </div>
  );
}
