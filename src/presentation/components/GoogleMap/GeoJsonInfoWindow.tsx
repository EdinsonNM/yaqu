import React from 'react';
import { InfoWindow } from '@react-google-maps/api';

interface GeoJsonInfoWindowProps {
  position: google.maps.LatLngLiteral;
  feature: google.maps.Data.Feature;
  onClose: () => void;
}

const GeoJsonInfoWindow: React.FC<GeoJsonInfoWindowProps> = ({ 
  position, 
  feature, 
  onClose 
}) => {
  return (
    <InfoWindow
      position={position}
      onCloseClick={onClose}
      options={{
        // Evitar que el InfoWindow afecte al mapa subyacente
        disableAutoPan: true
      }}
    >
      <div className="p-2 max-w-md">
        <h3 className="font-bold text-lg mb-2">Propiedades</h3>
        <div className="overflow-y-auto max-h-60">
          <table className="w-full text-sm">
            <tbody>
              {(() => {
                // Obtener todas las propiedades del feature
                const propertyNames: string[] = [];
                
                // Usar forEachProperty para recopilar todas las propiedades
                feature.forEachProperty((_, propertyKey) => {
                  if (propertyKey !== 'geometry') {
                    propertyNames.push(propertyKey);
                  }
                });
                
                return propertyNames.map(key => {
                  const value = feature.getProperty(key);
                  return (
                    <tr key={key} className="border-b">
                      <td className="font-medium py-1 pr-2">{key}</td>
                      <td className="py-1">{String(value)}</td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </InfoWindow>
  );
};

export default GeoJsonInfoWindow;
