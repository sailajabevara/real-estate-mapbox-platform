

import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import properties from "../data/properties.json";
import amenities from "../data/amenities.json";

mapboxgl.accessToken =
  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ||
  "pk.test.mock-token-for-testing-purposes";

// ⭐ Haversine Formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function PropertyDetail() {

  const { id } = useParams();
  const property = properties.find(p => p.id === Number(id));

  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {

    if (!mapRef.current) return;
    if (mapInstance.current) return;
    if (!property) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [property.longitude, property.latitude],
      zoom: 13
    });

    mapInstance.current = map;

    map.on("load", () => {
      new mapboxgl.Marker()
        .setLngLat([property.longitude, property.latitude])
        .addTo(map);
    });

  }, [property]);

  if (!property) return <h2>Property Not Found</h2>;

  return (
    <div data-testid="property-detail-container" style={{ padding: "20px" }}>

      <h1 data-testid="property-title">{property.title}</h1>

      <p data-testid="property-price">${property.price}</p>

      <p data-testid="property-full-address">
        {property.address}, {property.city}, {property.state}
      </p>

      {/* MAP */}
      <div
        ref={mapRef}
        data-testid="property-map"
        style={{
          height: "400px",
          width: "100%",
          marginTop: "20px",
          borderRadius: "12px"
        }}
      />

      <p data-testid="property-coordinates">
        {property.latitude}, {property.longitude}
      </p>

      {/* ⭐ Nearby Amenities Section */}
      <div data-testid="nearby-amenities" style={{ marginTop: "30px" }}>
        <h3>Nearby Amenities</h3>

        {amenities.map((amenity) => {

          const distance = getDistance(
            property.latitude,
            property.longitude,
            amenity.latitude,
            amenity.longitude
          );

          return (
            <div key={amenity.id} style={{ marginBottom: "10px" }}>
              <p>{amenity.name}</p>

              <p data-testid={`amenity-distance-${amenity.id}`}>
                {distance.toFixed(2)} km
              </p>
            </div>
          );

        })}

      </div>

    </div>
  );
}