import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { UpdateMenuUseCase } from "../../../domain/menu/usecases/update-menu.usecase";
import { Menu } from "../../../domain/menu/models/menu.model";

export const useMenuUpdate = () => {
  const updateMenuUseCase = container.resolve(UpdateMenuUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Menu> }) =>
      updateMenuUseCase.execute(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["menus", variables.data.restaurantId],
      });
      queryClient.invalidateQueries({
        queryKey: ["menus", variables.id],
      });
    },
  });
};
