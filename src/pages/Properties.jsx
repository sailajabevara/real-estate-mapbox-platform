// import { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import properties from "../data/properties.json";

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// export default function MapContainer() {

//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);

//   useEffect(() => {

//     // IMPORTANT SAFETY CHECK
//     if (!mapRef.current) return;
//     if (mapInstance.current) return;

//     mapInstance.current = new mapboxgl.Map({
//       container: mapRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [-95, 37],
//       zoom: 3.5
//     });

//     mapInstance.current.on("load", () => {

//       window.mapboxMap = mapInstance.current;
//       window.mapboxMapLoaded = true;

//       // ADD MARKERS
//       properties.forEach((property) => {
//         new mapboxgl.Marker()
//           .setLngLat([property.longitude, property.latitude])
//           .addTo(mapInstance.current);
//       });

//     });

//   }, []);

//   return (
//   <div
//     ref={mapRef}
//     style={{
//       height: "600px",
//       width: "100%",
//       marginTop: "20px"
//     }}
//   />
// );
// }

// export default function Properties() {
//   return <h1>Properties Page Working ✅</h1>;
// }
// import properties from "../data/properties.json";
// import MapContainer from "../components/MapContainer";

// export default function Properties() {
//   return (
//     <div data-testid="properties-container">

//       <MapContainer />

//       <div data-testid="property-list">
//         {properties.map((property) => (
//           <div
//             key={property.id}
//             data-testid={`property-card-${property.id}`}
//             data-latitude={property.latitude}
//             data-longitude={property.longitude}
//           >
//             <h3 data-testid={`property-title-${property.id}`}>
//               {property.title}
//             </h3>

//             <p data-testid={`property-price-${property.id}`}>
//               ${property.price}
//             </p>

//             <p data-testid={`property-address-${property.id}`}>
//               {property.address}
//             </p>

//             <button data-testid={`save-property-${property.id}`}>
//               Save Property
//             </button>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

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
