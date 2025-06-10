import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@presentation/components/ui/card";
import { Input } from "@presentation/components/ui/input";
import { Label } from "@presentation/components/ui/label";
import { Textarea } from "@presentation/components/ui/textarea";
import { Button } from "@presentation/components/ui/button";
import { Save, MapPin } from "lucide-react";
import { toast } from "sonner";
import LocationMap from "./location-map";

interface WaterUsersAssociationDataProps {
  code?: string;
  name?: string;
  ruc?: string;
  address?: string;
  mission?: string;
  vision?: string;
  phone?: string;
  location?: {
    lat: number;
    lng: number;
  } | null;
}

const WaterUsersAssociationData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<WaterUsersAssociationDataProps>({
    code: "",
    name: "",
    ruc: "",
    address: "",
    mission: "",
    vision: "",
    phone: "",
    location: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí iría la lógica para guardar los datos
      // await saveWaterUsersAssociationData(formData);

      toast("Los datos de la junta se han guardado correctamente");
    } catch (error) {
      toast("No se pudieron guardar los datos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos de la Junta</CardTitle>
        <CardDescription>
          Información general de la junta de usuarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de Junta</Label>
              <Input
                id="code"
                name="code"
                placeholder="Ingrese el código"
                value={formData.code}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ingrese el nombre de la junta"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ruc">RUC</Label>
              <Input
                id="ruc"
                name="ruc"
                placeholder="Ingrese el RUC"
                value={formData.ruc}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                name="address"
                placeholder="Ingrese la dirección"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission">Misión</Label>
            <Textarea
              id="mission"
              name="mission"
              placeholder="Ingrese la misión de la junta"
              value={formData.mission}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vision">Visión</Label>
            <Textarea
              id="vision"
              name="vision"
              placeholder="Ingrese la visión de la junta"
              value={formData.vision}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Ingrese el teléfono de contacto"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Ubicación exacta
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Haga clic en el mapa para seleccionar la ubicación exacta de la junta
            </p>
            <LocationMap
              initialPosition={formData.location}
              onPositionChange={(position) => {
                setFormData(prev => ({ ...prev, location: position }));
              }}
            />
            {formData.location && (
              <div className="mt-2 text-sm">
                <span className="font-medium">Coordenadas: </span>
                Lat: {formData.location.lat.toFixed(6)}, Lng: {formData.location.lng.toFixed(6)}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WaterUsersAssociationData;
