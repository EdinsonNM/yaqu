import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { ToggleMenuActiveUseCase } from "../../../domain/menu/usecases/toggle-menu-active.usecase";

export const useMenuToggleActive = (restaurantId: string) => {
  const toggleMenuActiveUseCase = container.resolve(ToggleMenuActiveUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      toggleMenuActiveUseCase.execute(id, active),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menus", restaurantId],
      });
    },
  });
};
