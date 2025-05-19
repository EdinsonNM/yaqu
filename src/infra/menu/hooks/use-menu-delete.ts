import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { DeleteMenuUseCase } from "../../../domain/menu/usecases/delete-menu.usecase";

export const useMenuDelete = (restaurantId: string) => {
  const deleteMenuUseCase = container.resolve(DeleteMenuUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMenuUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menus", restaurantId],
      });
    },
  });
};
