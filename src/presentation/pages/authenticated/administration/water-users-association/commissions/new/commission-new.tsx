import { useState } from "react";
import { Button } from "@presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@presentation/components/ui/dialog";
import { Input } from "@presentation/components/ui/input";
import { Label } from "@presentation/components/ui/label";
import { Textarea } from "@presentation/components/ui/textarea";
import { Commission } from "@domain/administration/models/commission";
import { toast } from "sonner";

interface CommissionFormNewProps {
  isOpen: boolean;
  onClose: () => void;
  fetchCommissions: () => void;
}

const CommissionFormNew = ({
  isOpen,
  onClose,
  fetchCommissions,
}: CommissionFormNewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Commission>>({
    code: "",
    name: "",
    description: "",
    location: "",
    contactPhone: "",
    contactEmail: "",
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
      // Aquí iría la lógica para crear una nueva comisión
      // await createCommission(formData);

      toast("La comisión se ha creado correctamente");

      fetchCommissions();
      onClose();
    } catch (error) {
      toast("No se pudo crear la comisión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nueva Comisión</DialogTitle>
          <DialogDescription>
            Complete los datos para crear una nueva comisión
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="Ingrese el código"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ingrese el nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Ingrese la descripción"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                name="location"
                placeholder="Ingrese la ubicación"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Teléfono de contacto</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  placeholder="Ingrese el teléfono"
                  value={formData.contactPhone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email de contacto</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  placeholder="Ingrese el email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  type="email"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommissionFormNew;
