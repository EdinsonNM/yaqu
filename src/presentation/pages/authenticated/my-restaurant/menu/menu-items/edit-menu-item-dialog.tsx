import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMenuItemUpdate } from "@infra/menu_item/hooks/use-menu-item-update";
import { toast } from "sonner";
import { MenuItem } from "@domain/menu_item/models/menu-item.model";
import { menuItemSchema } from "./schemas/menu-item-schema";
import { MenuItemForm } from "./menu-item-form";

interface EditMenuItemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  menuItem: MenuItem | null;
}

export const EditMenuItemDialog = ({
  isOpen,
  onOpenChange,
  menuItem,
}: EditMenuItemDialogProps) => {
  const { mutate: updateMenuItem, isPending: isUpdating } = useMenuItemUpdate();

  const form = useForm<Partial<MenuItem>>({
    resolver: yupResolver<Partial<MenuItem>>(menuItemSchema),
    defaultValues: menuItem!,
    mode: "onChange",
  });
  console.log(menuItem);
  // Actualizar formulario cuando cambia el item seleccionado
  useEffect(() => {
    if (menuItem && isOpen) {
      form.reset({
        name: menuItem.name,
        description: menuItem.description || "",
        price: menuItem.price,
        available: menuItem.available,
        menuId: menuItem.menuId || "",
      });
    }
  }, [menuItem, isOpen, form]);

  const handleSubmit = (values: Partial<MenuItem>) => {
    if (!menuItem?.id) return;

    updateMenuItem(
      {
        id: menuItem.id,
        data: values,
      },
      {
        onSuccess: () => {
          toast.success("Plato actualizado correctamente");
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(`Error al actualizar el plato: ${error.message}`);
        },
      }
    );
  };
  console.log(form.formState.errors);
  return (
    <MenuItemForm
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      form={form}
      handleSubmit={handleSubmit}
      isCreating={isUpdating}
    />
  );
};
