import { Edit, Trash2 } from "lucide-react";
import {
  TableCell,
  TableBody,
  TableRow,
  TableHeader,
  TableHead,
  Table,
} from "@presentation/components/ui/table";
import { Button } from "@presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@presentation/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useTabletsGetAll } from "@infra/tablets/hooks/use-tablets-get-all";
import { useTabletDelete } from "@infra/tablets/hooks/use-tablet-delete";
import { useTabletCreate } from "@infra/tablets/hooks/use-tablet-create";
import { useTabletUpdate } from "@infra/tablets/hooks/use-tablet-update";
import { Tablet } from "@domain/tablets/models/tablet.model";
import { useState } from "react";
import { TabletForm } from "./tablet-form";
import { useForm } from "react-hook-form";
import useRestaurantStore from "@presentation/store/restaurant-store";
import { QrCode } from "lucide-react";
import { QRTabletModal } from "./qr-tablet-modal";

export default function MyRestaurantTablets() {
  const { currentRestaurant } = useRestaurantStore();
  const restaurantId = currentRestaurant?.id || "";
  const { data: tablets, isLoading, refetch } = useTabletsGetAll(restaurantId);
  const deleteMutation = useTabletDelete();
  const createMutation = useTabletCreate();
  const updateMutation = useTabletUpdate();
  const [open, setOpen] = useState(false);
  const [selectedTablet, setSelectedTablet] = useState<Partial<Tablet> | null>(
    null
  );
  const [qrTablet, setQrTablet] = useState<Tablet | null>(null);
  const [qrOpen, setQrOpen] = useState(false);

  const handleEdit = (tablet: Tablet) => {
    setSelectedTablet(tablet);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar esta mesa?")) {
      deleteMutation.mutate(id, { onSuccess: () => refetch() });
    }
  };

  const handleNew = () => {
    setSelectedTablet(null);
    setOpen(true);
  };

  const handleShowQr = (tablet: Tablet) => {
    setQrTablet(tablet);
    setQrOpen(true);
  };

  const form = useForm<Partial<Tablet>>({
    defaultValues: selectedTablet || {},
    values: selectedTablet || {},
  });

  const handleSubmit = (data: Partial<Tablet>) => {
    if (!restaurantId) return;
    if (selectedTablet && selectedTablet.id) {
      updateMutation.mutate(
        { id: selectedTablet.id, data: { ...data, restaurantId } },
        {
          onSuccess: () => {
            setOpen(false);
            refetch();
          },
        }
      );
    } else {
      createMutation.mutate(
        { ...data, restaurantId },
        {
          onSuccess: () => {
            setOpen(false);
            refetch();
          },
        }
      );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Mesas del Restaurante</CardTitle>
          <CardDescription>
            Gestiona las mesas disponibles en tu local
          </CardDescription>
        </div>
        <Button
          className="flex items-center gap-1"
          onClick={handleNew}
          aria-label="Añadir Mesa"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Añadir Mesa</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Cargando mesas...
                </TableCell>
              </TableRow>
            ) : (
              tablets?.map((tablet) => (
                <TableRow key={tablet.id}>
                  <TableCell className="font-medium">
                    {tablet.tableNumber}
                  </TableCell>
                  <TableCell>{tablet.seats}</TableCell>
                  <TableCell>{tablet.status}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(tablet)}
                        aria-label="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(tablet.id!)}
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleShowQr(tablet)}
                        aria-label="Mostrar QR"
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <TabletForm
        isOpen={open}
        onOpenChange={setOpen}
        form={form}
        handleSubmit={handleSubmit}
        isSaving={createMutation.isPending || updateMutation.isPending}
      />
      <QRTabletModal open={qrOpen} onOpenChange={setQrOpen} tablet={qrTablet} />
    </Card>
  );
}
