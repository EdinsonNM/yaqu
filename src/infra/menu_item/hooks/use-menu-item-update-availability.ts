import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { UpdateMenuItemAvailabilityUseCase } from "../../../domain/menu_item/usecases/update-menu-item-availability.usecase";

interface UpdateAvailabilityParams {
  id: string;
  available: boolean;
}

export const useMenuItemUpdateAvailability = () => {
  const updateMenuItemAvailabilityUseCase = container.resolve(
    UpdateMenuItemAvailabilityUseCase
  );
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, available }: UpdateAvailabilityParams) =>
      updateMenuItemAvailabilityUseCase.execute(id, available),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });
};
