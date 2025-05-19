import { useTabletsGetAll } from "@infra/tablets/hooks/use-tablets-get-all";
import { useTabletDelete } from "@infra/tablets/hooks/use-tablet-delete";
import { Tablet } from "@domain/tablets/models/tablet.model";
import { Button } from "@presentation/components/ui/button";
import { useState } from "react";
import { TabletForm } from "./tablet-form";
import { useForm } from "react-hook-form";

export const TabletList = () => {
  const { data, isLoading } = useTabletsGetAll();
  const deleteMutation = useTabletDelete();
  const [open, setOpen] = useState(false);
  const [selectedTablet, setSelectedTablet] = useState<Partial<Tablet> | null>(
    null
  );

  const handleEdit = (tablet: Tablet) => {
    setSelectedTablet(tablet);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar esta mesa?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleNew = () => {
    setSelectedTablet(null);
    setOpen(true);
  };

  const form = useForm<Partial<Tablet>>({
    defaultValues: selectedTablet || {},
    values: selectedTablet || {},
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Mesas del Restaurante</h2>
        <Button onClick={handleNew} aria-label="Añadir mesa">
          Añadir mesa
        </Button>
      </div>
      {isLoading ? (
        <div className="text-center py-4">Cargando mesas...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 font-semibold text-muted-foreground h-11">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Capacidad</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((tablet) => (
                <tr key={tablet.id} className="hover:bg-muted/50">
                  <td className="px-4 py-2 font-medium">
                    {tablet.tableNumber}
                  </td>
                  <td className="px-4 py-2">{tablet.seats}</td>
                  <td className="px-4 py-2">{tablet.status}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(tablet)}
                      aria-label="Editar"
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(tablet.id!)}
                      aria-label="Eliminar"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <TabletForm
        isOpen={open}
        onOpenChange={setOpen}
        form={form}
        handleSubmit={() => {}}
        isSaving={false}
      />
    </div>
  );
};
