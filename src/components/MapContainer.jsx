import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import properties from "../data/properties.json";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

// ⭐ HAVERSINE FORMULA
function getDistance(lat1, lon1, lat2, lon2) {

  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) *
    Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

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

      console.log("✅ MAP LOADED");

      // ⭐ Puppeteer Test
      const hidden = document.createElement("div");
      hidden.setAttribute("data-testid", "map-loaded");
      hidden.style.display = "none";
      document.body.appendChild(hidden);

      window.mapboxMap = mapInstance.current;
      window.mapboxMapLoaded = true;

      // ⭐ SEARCH BOX
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Search location...",
        marker: false
      });

      mapInstance.current.addControl(geocoder, "top-left");

      // ⭐ DRAW TOOL
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });

      mapInstance.current.addControl(draw);

      const bounds = new mapboxgl.LngLatBounds();

      // ⭐ FUNCTION TO CREATE MARKERS WITH RADIUS
      const createMarkers = (center) => {

        const RADIUS_KM = 50;

        properties.forEach((property) => {

          const distance = getDistance(
            center.lat,
            center.lng,
            property.latitude,
            property.longitude
          );

          if (distance <= RADIUS_KM) {

            bounds.extend([property.longitude, property.latitude]);

            const el = document.createElement("div");

            el.style.width = "20px";
            el.style.height = "20px";
            el.style.backgroundColor = "#1976D2";
            el.style.borderRadius = "50%";
            el.style.border = "2px solid white";
            el.style.cursor = "pointer";

            el.setAttribute("data-testid", `map-marker-${property.id}`);

            // ⭐ CLICK → HIGHLIGHT CARD
            el.addEventListener("click", () => {

              const card = document.querySelector(
                `[data-testid="property-card-${property.id}"]`
              );

              if (card) {

                document
                  .querySelectorAll('[data-testid^="property-card-"]')
                  .forEach(c => c.style.border = "1px solid #ccc");

                card.scrollIntoView({ behavior: "smooth", block: "center" });
                card.style.border = "3px solid #1976D2";
              }

            });

            new mapboxgl.Marker(el)
              .setLngLat([property.longitude, property.latitude])
              .addTo(mapInstance.current);
          }

        });

      };

      // ⭐ INITIAL MARKERS
      createMarkers(mapInstance.current.getCenter());

      mapInstance.current.fitBounds(bounds, { padding: 60 });

      // ⭐ UPDATE MARKERS AFTER SEARCH
      geocoder.on("result", (e) => {

        const center = {
          lat: e.result.center[1],
          lng: e.result.center[0]
        };

        createMarkers(center);

        mapInstance.current.flyTo({
          center: e.result.center,
          zoom: 10
        });

      });

    });

  }, []);

  return (
    <div
      ref={mapRef}
      data-testid="map-container"
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "12px"
      }}
    />
  );
}
