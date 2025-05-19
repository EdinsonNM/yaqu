import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@presentation/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@presentation/components/ui/form";
import { Input } from "@presentation/components/ui/input";
import { Button } from "@presentation/components/ui/button";
import { Tablet } from "@domain/tablets/models/tablet.model";
import { UseFormReturn } from "react-hook-form";

interface TabletFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<Partial<Tablet>>;
  handleSubmit: (data: Partial<Tablet>) => void;
  isSaving: boolean;
}

export const TabletForm = ({
  isOpen,
  onOpenChange,
  form,
  handleSubmit,
  isSaving,
}: TabletFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {form.getValues("id") ? "Editar mesa" : "Añadir nueva mesa"}
          </DialogTitle>
          <DialogDescription>
            Completa los campos para{" "}
            {form.getValues("id") ? "editar" : "añadir"} una mesa.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="tableNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número o nombre de mesa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Mesa 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidad (asientos)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. libre, ocupada, reservada"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qrCodeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL del código QR</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                type="button"
                aria-label="Cancelar"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                aria-label={
                  form.getValues("id") ? "Guardar cambios" : "Añadir mesa"
                }
              >
                {isSaving
                  ? form.getValues("id")
                    ? "Guardando..."
                    : "Añadiendo..."
                  : form.getValues("id")
                  ? "Guardar cambios"
                  : "Añadir mesa"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
