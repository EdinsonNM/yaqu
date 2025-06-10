import { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface LocationMapProps {
  initialPosition?: { lat: number; lng: number } | null;
  onPositionChange: (position: { lat: number; lng: number } | null) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
};

// Default center (Peru)
const defaultCenter = {
  lat: -9.189967,
  lng: -75.015152
};

const LocationMap = ({ initialPosition, onPositionChange }: LocationMapProps) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(initialPosition || null);
  // Map reference state to use in other functions if needed
  const [, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAZuaAVnFvTJiS53-vxoQVu-F0_JMgMbjc'
  });

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setMarker(newPosition);
      onPositionChange(newPosition);
    }
  }, [onPositionChange]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (initialPosition) {
      setMarker(initialPosition);
    }
  }, [initialPosition]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker || defaultCenter}
      zoom={marker ? 15 : 6}
      onClick={onMapClick}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
      }}
    >
      {marker && <Marker position={marker} draggable={true} onDragEnd={(e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const newPosition = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          };
          setMarker(newPosition);
          onPositionChange(newPosition);
        }
      }} />}
    </GoogleMap>
  );
};

export default LocationMap;
