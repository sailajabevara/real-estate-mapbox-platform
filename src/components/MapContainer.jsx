
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import properties from "../data/properties.json";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function MapContainer() {

  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {

    if (mapInstance.current) return;
    if (!mapRef.current) return;

    mapInstance.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96, 37.8],
      zoom: 4
    });

    mapInstance.current.on("load", () => {

      console.log(" MAP LOADED SUCCESSFULLY");

      // Puppeteer test
      const hidden = document.createElement("div");
      hidden.setAttribute("data-testid", "map-loaded");
      hidden.style.display = "none";
      document.body.appendChild(hidden);

      window.mapboxMap = mapInstance.current;
      window.mapboxMapLoaded = true;

      const bounds = new mapboxgl.LngLatBounds();

      properties.forEach((property) => {

        bounds.extend([property.longitude, property.latitude]);

        //  CREATE MARKER ELEMENT
        const el = document.createElement("div");

        el.style.width = "20px";
        el.style.height = "20px";
        el.style.backgroundColor = "#1976D2";
        el.style.borderRadius = "50%";
        el.style.border = "2px solid white";
        el.style.cursor = "pointer";

        el.setAttribute("data-testid", `map-marker-${property.id}`);

        //  CLICK EVENT ADDED HERE
        el.addEventListener("click", () => {

          const card = document.querySelector(
            `[data-testid="property-card-${property.id}"]`
          );

          if (card) {

            // remove old highlights
            document
              .querySelectorAll('[data-testid^="property-card-"]')
              .forEach(c => c.style.border = "1px solid #ccc");

            // highlight clicked
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            card.style.border = "3px solid #1976D2";
          }

        });

        new mapboxgl.Marker(el)
          .setLngLat([property.longitude, property.latitude])
          .addTo(mapInstance.current);

      });

      mapInstance.current.fitBounds(bounds, { padding: 60 });

    });

  }, []);

  return (
    <div
      ref={mapRef}
      data-testid="map-container"
      style={{
        height: "500px",  
        width: "100%",
        borderRadius: "12px"
      }}
    />
  );
}
