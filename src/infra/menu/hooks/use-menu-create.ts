import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { CreateMenuUseCase } from "../../../domain/menu/usecases/create-menu.usecase";
import { Menu } from "../../../domain/menu/models/menu.model";

export const useMenuCreate = () => {
  const createMenuUseCase = container.resolve(CreateMenuUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Menu>) => createMenuUseCase.execute(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["menus", variables.restaurantId],
      });
    },
  });
};
