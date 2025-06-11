import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@presentation/components/ui/sheet";
import { Commission } from "@domain/administration/models/commission";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Label } from "@presentation/components/ui/label";
import { MapPin, Phone, Mail, Info, MapPinIcon } from "lucide-react";
import dayjs from "dayjs";

interface CommissionDetailProps {
  isOpen: boolean;
  onClose: () => void;
  commission: Commission | null;
}

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "0.5rem",
};

const CommissionDetail = ({
  isOpen,
  onClose,
  commission,
}: CommissionDetailProps) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // For demonstration purposes, generate a random location near Peru if none exists
  useEffect(() => {
    if (commission) {
      // In a real application, this would come from the commission data
      // For now, we'll generate a random location near Peru if none exists
      if (!commission.coordinates) {
        // Random location near Peru
        setLocation({
          lat: -9.189967 + (Math.random() * 2 - 1),
          lng: -75.015152 + (Math.random() * 2 - 1),
        });
      } else {
        setLocation(commission.coordinates);
      }
    }
  }, [commission]);

  if (!commission) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto px-6">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-xl">{commission.name}</SheetTitle>
          <SheetDescription className="text-md">
            Código: <span className="font-medium">{commission.code}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8 py-6">
          {commission.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Descripción</Label>
              </div>
              <p className="text-sm text-muted-foreground px-2">
                {commission.description}
              </p>
            </div>
          )}

          {commission.location && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <MapPinIcon className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Ubicación</Label>
              </div>
              <p className="text-sm text-muted-foreground px-2">
                {commission.location}
              </p>
            </div>
          )}

          {commission.contactPhone && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Phone className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Teléfono</Label>
              </div>
              <p className="text-sm text-muted-foreground px-2">
                {commission.contactPhone}
              </p>
            </div>
          )}

          {commission.contactEmail && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="h-5 w-5 text-primary" />
                <Label className="text-base font-medium">Email</Label>
              </div>
              <p className="text-sm text-muted-foreground px-2">
                {commission.contactEmail}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <Label className="text-base font-medium">Ubicación en mapa</Label>
            </div>
            {isLoaded && location ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={15}
                options={{
                  streetViewControl: false,
                  mapTypeControl: true,
                  fullscreenControl: true,
                }}
              >
                <Marker position={location} />
              </GoogleMap>
            ) : (
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md border">
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 animate-pulse" />
                  Cargando mapa...
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2 border-t pt-4 mt-6">
            <Label className="text-xs text-muted-foreground">
              Fecha de creación
            </Label>
            <p className="text-sm font-medium">
              {dayjs(commission.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommissionDetail;
