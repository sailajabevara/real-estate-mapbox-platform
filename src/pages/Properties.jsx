
import properties from "../data/properties.json";
import MapContainer from "../components/MapContainer";

export default function Properties() {
  return (
         <div
  data-testid="properties-container"
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
 // equal width
    height: "100vh",
    gap: "20px",
    padding: "20px"
  }}
>


      {/* MAP SIDE */}
      <div style={{ flex: 1 }}>
        <MapContainer />
      </div>

      {/* LIST SIDE */}
      <div
  data-testid="property-list"
  style={{
    overflowY: "auto",
    height: "100%",
    paddingRight: "10px"
  }}
>

        {properties.map((property) => (
          <div
            key={property.id}
            data-testid={`property-card-${property.id}`}
            data-latitude={property.latitude}
            data-longitude={property.longitude}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px"
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

    </div>
  );
}
