
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import properties from "../data/properties.json";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";



mapboxgl.accessToken =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN) ||
  "pk.test.mock-token-for-testing-purposes";



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



export default function MapContainer() {

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {

    if (!mapRef.current) return;
    if (mapInstance.current) return;

    

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96, 37.8],
      zoom: 4
    });

    mapInstance.current = map;

    map.on("load", () => {

      
      setTimeout(() => map.resize(), 500);

     

      window.mapboxMap = map;
      window.mapboxMapLoaded = true;

      const hidden = document.createElement("div");
      hidden.setAttribute("data-testid", "map-loaded");
      hidden.style.display = "none";
      document.body.appendChild(hidden);


      

      const clearMarkers = () => {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
      };



      const createMarkers = (center = null) => {

        clearMarkers();

        properties.forEach(property => {

          // ✅ radius filter
          if (center) {

            const distance = getDistance(
              center.lat,
              center.lng,
              property.latitude,
              property.longitude
            );

            if (distance > 50) return;
          }



const el = document.createElement("div");

el.setAttribute("data-testid", `map-marker-${property.id}`);

el.style.width = "14px";
el.style.height = "14px";
el.style.background = "#1976D2";
el.style.borderRadius = "50%";
el.style.border = "2px solid white";


el.style.position = "relative";
// el.style.zIndex = "9999";
el.style.pointerEvents = "auto";

          

          el.setAttribute("data-testid", `map-marker-${property.id}`);


         
el.addEventListener("click", () => {

  document
    .querySelectorAll('[data-testid^="property-card-"]')
    .forEach(card => {
      card.classList.remove("highlight-card");
      card.removeAttribute("data-highlighted"); 
    });

  const card = document.querySelector(
    `[data-testid="property-card-${property.id}"]`
  );

  if (card) {

    card.classList.add("highlight-card");

    
    card.setAttribute("data-highlighted", "true");

    card.scrollIntoView({
      behavior: "instant",
      block: "center"
    });
  }

});


        
const marker = new mapboxgl.Marker({
  element: el
})
.setLngLat([property.longitude, property.latitude])
.addTo(map);


marker.getElement().style.zIndex = "999999";
marker.getElement().style.position = "relative";

          

        });

      };


  

      createMarkers();

   
      setTimeout(() => map.resize(), 800);




      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
        marker: false,
        placeholder: "Search location..."
      });

      map.addControl(geocoder, "top-left");

      geocoder.on("result", (e) => {

        const center = {
          lat: e.result.center[1],
          lng: e.result.center[0]
        };

        createMarkers(center);

        map.flyTo({
          center: e.result.center,
          zoom: 10
        });

      });



      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });

      map.addControl(draw, "top-left");

    });

  }, []);






  return (
    <div
      ref={mapRef}
      data-testid="map-container"
      style={{
        width: "100%",
        height: "700px" 
      }}
    />
  );
}
