import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { CreateMenuItemUseCase } from "../../../domain/menu_item/usecases/create-menu-item.usecase";
import { CreateMenuItemDTO } from "../../../domain/menu_item/dtos/create-menu-item.dto";

export const useMenuItemCreate = () => {
  const createMenuItemUseCase = container.resolve(CreateMenuItemUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateMenuItemDTO>) =>
      createMenuItemUseCase.execute(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      if (variables.menuId) {
        queryClient.invalidateQueries({
          queryKey: ["menuItems", "byMenu", variables.menuId],
        });
      }
    },
  });
};
