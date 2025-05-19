import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMenuItemCreate } from "@infra/menu_item/hooks/use-menu-item-create";
import { toast } from "sonner";
import { menuItemSchema } from "./schemas/menu-item-schema";
import { MenuItem } from "@domain/menu_item/models/menu-item.model";
import { MenuItemForm } from "./menu-item-form";

interface AddMenuItemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  menuId: string | undefined;
}

export const AddMenuItemDialog = ({
  isOpen,
  onOpenChange,
  menuId,
}: AddMenuItemDialogProps) => {
  const { mutate: createMenuItem, isPending: isCreating } = useMenuItemCreate();

  const form = useForm<Partial<MenuItem>>({
    resolver: yupResolver<Partial<MenuItem>>(menuItemSchema),
    defaultValues: {
      menuId,
    },
  });
  console.log(menuId);
  const handleSubmit = (values: Partial<MenuItem>) => {
    if (!menuId) return;

    createMenuItem(
      { ...values, menuId },
      {
        onSuccess: () => {
          toast.success("Plato añadido correctamente");
          onOpenChange(false);
          form.reset();
        },
        onError: (error) => {
          toast.error(`Error al añadir el plato: ${error.message}`);
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
      isCreating={isCreating}
    />
  );
};
