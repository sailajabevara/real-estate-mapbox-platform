import properties from "../data/properties.json";
export default function Properties() {
  return (
   <div data-testid="property-list" style={{ marginTop: "20px" }}>
  {properties.map((property) => (
    <div
      key={property.id}
      data-testid={`property-card-${property.id}`}
      data-latitude={property.latitude}
      data-longitude={property.longitude}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px"
      }}
    >
      <h3 data-testid={`property-title-${property.id}`}>
        {property.title}
      </h3>

      <p data-testid={`property-price-${property.id}`}>
        ${property.price}
      </p>

      <p data-testid={`property-address-${property.id}`}>
        {property.address}
      </p>

      <button data-testid={`save-property-${property.id}`}>
        Save Property
      </button>
    </div>
  ))}
</div>


  );
}
