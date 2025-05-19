import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { UpdateMenuItemUseCase } from "../../../domain/menu_item/usecases/update-menu-item.usecase";
import { UpdateMenuItemDTO } from "../../../domain/menu_item/dtos/update-menu-item.dto";

interface UpdateMenuItemParams {
  id: string;
  data: Partial<UpdateMenuItemDTO>;
}

export const useMenuItemUpdate = () => {
  const updateMenuItemUseCase = container.resolve(UpdateMenuItemUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateMenuItemParams) =>
      updateMenuItemUseCase.execute(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });

      if (variables.data.menuId) {
        queryClient.invalidateQueries({
          queryKey: ["menuItems", "byMenu", variables.data.menuId],
        });
      }
    },
  });
};
