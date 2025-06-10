import React, { useCallback, useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker, Data } from "@react-google-maps/api";
import GeoJsonInfoWindow from "./GeoJsonInfoWindow";

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface GeoJsonLayer {
  path: string;
  style?: {
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
  };
}

interface GoogleMapComponentProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  markers?: google.maps.LatLngLiteral[];
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  apiKey: string;
  geoJsonPath?: string; // Mantener para compatibilidad con versiones anteriores
  geoJsonLayers?: GeoJsonLayer[];
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  center = { lat: -12.046374, lng: -77.042793 }, // Default to Lima, Peru
  zoom = 10,
  markers = [],
  onMapClick,
  apiKey,
  geoJsonPath,
  geoJsonLayers = []
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [geoJsonDataMap, setGeoJsonDataMap] = useState<Map<string, any>>(new Map());
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<google.maps.Data.Feature | null>(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const dataLayerRefs = useRef<Map<string, google.maps.Data>>(new Map());
  
  // Referencia para mantener el estado del mapa sin causar re-renders
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    // Podemos realizar configuraciones adicionales del mapa aquí si es necesario
    console.log('Mapa cargado correctamente');
    setMap(map);
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    console.log('Mapa desmontado correctamente');
  }, []);

  // Cargar datos GeoJSON cuando las rutas cambien
  useEffect(() => {
    // Manejar geoJsonPath para compatibilidad con versiones anteriores
    if (geoJsonPath && map) {
      fetch(geoJsonPath)
        .then(response => response.json())
        .then(data => {
          setGeoJsonDataMap(prev => {
            const newMap = new Map(prev);
            newMap.set(geoJsonPath, data);
            return newMap;
          });
        })
        .catch(error => console.error(`Error loading GeoJSON ${geoJsonPath}:`, error));
    }
    
    // Manejar múltiples capas GeoJSON
    if (geoJsonLayers.length > 0 && map) {
      geoJsonLayers.forEach(layer => {
        fetch(layer.path)
          .then(response => response.json())
          .then(data => {
            setGeoJsonDataMap(prev => {
              const newMap = new Map(prev);
              newMap.set(layer.path, { data, style: layer.style });
              return newMap;
            });
          })
          .catch(error => console.error(`Error loading GeoJSON ${layer.path}:`, error));
      });
    }
  }, [geoJsonPath, geoJsonLayers, map]);

  // Estilo predeterminado para las características GeoJSON
  const defaultGeoJsonStyle = {
    fillColor: '#2196F3',
    fillOpacity: 0.5,
    strokeColor: '#1565C0',
    strokeWeight: 2,
    strokeOpacity: 1
  };

  return isLoaded ? (
    <div className="w-full h-full" style={{ minHeight: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        {markers.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
        
        {/* Renderizar capa GeoJSON para compatibilidad con versiones anteriores */}
        {geoJsonPath && geoJsonDataMap.has(geoJsonPath) && (
          <Data 
            options={{
              map,
              style: defaultGeoJsonStyle
            }}
            onLoad={(dataLayer: google.maps.Data) => {
              dataLayer.addGeoJson(geoJsonDataMap.get(geoJsonPath));
              
              // Configurar evento de clic para mostrar metadatos
              dataLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
                const feature = event.feature;
                setSelectedFeature(feature);
                if (event.latLng) {
                  setInfoWindowPosition({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                  });
                }
              });
              
              dataLayerRefs.current.set(geoJsonPath, dataLayer);
            }}
          />
        )}
        
        {/* Renderizar múltiples capas GeoJSON */}
        {geoJsonLayers.map((layer, index) => {
          const layerData = geoJsonDataMap.get(layer.path);
          if (!layerData) return null;
          
          return (
            <Data 
              key={`geojson-layer-${index}`}
              options={{
                map,
                style: layerData.style || defaultGeoJsonStyle
              }}
              onLoad={(dataLayer: google.maps.Data) => {
                dataLayer.addGeoJson(layerData.data || layerData);
                
                // Configurar evento de clic para mostrar metadatos
                dataLayer.addListener('click', (event: google.maps.Data.MouseEvent) => {
                  const feature = event.feature;
                  setSelectedFeature(feature);
                  if (event.latLng) {
                    setInfoWindowPosition({
                      lat: event.latLng.lat(),
                      lng: event.latLng.lng()
                    });
                  }
                });
                
                dataLayerRefs.current.set(layer.path, dataLayer);
              }}
            />
          );
        })}
        
        {/* Ventana de información para mostrar metadatos usando el componente separado */}
        {selectedFeature && infoWindowPosition && (
          <GeoJsonInfoWindow
            position={infoWindowPosition}
            feature={selectedFeature}
            onClose={() => {
              setSelectedFeature(null);
              setInfoWindowPosition(null);
            }}
          />
        )}
      </GoogleMap>
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-full">
      <p>Cargando mapa...</p>
    </div>
  );
};

export default GoogleMapComponent;
