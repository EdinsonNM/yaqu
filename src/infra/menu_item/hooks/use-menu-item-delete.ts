import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { DeleteMenuItemUseCase } from "../../../domain/menu_item/usecases/delete-menu-item.usecase";

export const useMenuItemDelete = () => {
  const deleteMenuItemUseCase = container.resolve(DeleteMenuItemUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMenuItemUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });
};
