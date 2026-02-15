import { useParams } from "react-router-dom";
import properties from "../data/properties.json";

export default function PropertyDetail() {
  const { id } = useParams();

  const property = properties.find(
    (p) => p.id === Number(id)
  );

  if (!property) return <div>Property not found</div>;

  return (
    <div data-testid="property-detail-container">

      <h1 data-testid="property-title">
        {property.title}
      </h1>

      <p data-testid="property-price">
        ${property.price}
      </p>

      <p data-testid="property-full-address">
        {property.address}, {property.city}
      </p>

      <div
        data-testid="property-map"
        style={{height:"300px", background:"#ddd"}}
      >
        Map will load here
      </div>

      <p data-testid="property-coordinates">
        {property.latitude}, {property.longitude}
      </p>

      <div data-testid="nearby-amenities">
        Nearby amenities will appear here
      </div>

    </div>
  );
}
