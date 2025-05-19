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
import { Textarea } from "@presentation/components/ui/textarea";
import { Checkbox } from "@presentation/components/ui/checkbox";
import { Button } from "@presentation/components/ui/button";
import { MenuItem } from "@domain/menu_item/models/menu-item.model";
import { UseFormReturn } from "react-hook-form";

interface MenuItemFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<Partial<MenuItem>>;
  handleSubmit: (data: Partial<MenuItem>) => void;
  isCreating: boolean;
}

export const MenuItemForm = ({
  isOpen,
  onOpenChange,
  form,
  handleSubmit,
  isCreating,
}: MenuItemFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Añadir nuevo plato</DialogTitle>
          <DialogDescription>
            Completa los campos para añadir un nuevo plato a tu carta.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del plato</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Paella Valenciana" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field: { value, onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe el plato..."
                      value={value || ""}
                      onChange={onChange}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value || "0"))
                      }
                      value={field.value}
                      aria-label="Precio del plato"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Plato disponible"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Disponible</FormLabel>
                    <FormDescription>
                      Indica si este plato está disponible para pedidos
                    </FormDescription>
                  </div>
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
                disabled={isCreating}
                aria-label="Añadir plato"
              >
                {isCreating ? "Añadiendo..." : "Añadir plato"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
