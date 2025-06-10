import React, { useState } from "react";
import GoogleMapComponent from "./GoogleMap";
import path from "path";

const GoogleMapExample: React.FC = () => {
  // API key de Google Maps
  const apiKey = "AIzaSyAZuaAVnFvTJiS53-vxoQVu-F0_JMgMbjc";

  // Configuración de capas GeoJSON
  const geoJsonLayers = [
    {
      path: "/maps/CANALES_JU.geojson",
      style: {
        fillColor: "#2196F3",
        fillOpacity: 0.5,
        strokeColor: "#1565C0",
        strokeWeight: 2,
        strokeOpacity: 1,
      },
    },
    {
      path: "/maps/CASARANA.geojson",
      style: {
        fillColor: "#4CAF50",
        fillOpacity: 0.4,
        strokeColor: "#388E3C",
        strokeWeight: 2,
        strokeOpacity: 1,
      },
    },
    {
      path: "/maps/Chato.geojson",
      style: {
        fillColor: "#FFCDD2",
        fillOpacity: 0.4,
        strokeColor: "#D32F2F",
        strokeWeight: 2,
        strokeOpacity: 1,
      },
    },
    // Puedes añadir más capas GeoJSON aquí según necesites
  ];

  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newMarker = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setMarkers((prev) => [...prev, newMarker]);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      <div className="flex-1 border rounded-lg overflow-hidden">
        <GoogleMapComponent
          apiKey={apiKey}
          markers={markers}
          onMapClick={handleMapClick}
          geoJsonLayers={geoJsonLayers}
        />
      </div>
    </div>
  );
};

export default GoogleMapExample;
