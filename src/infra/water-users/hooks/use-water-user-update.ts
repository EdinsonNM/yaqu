import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { UpdateWaterUserUseCase } from "../../../domain/water-users/usecases/update-water-user.usecase";
import { UpdateWaterUserDTO } from "../../../domain/water-users/dtos/update-water-user.dto";

export const useWaterUserUpdate = (id: string) => {
  const updateWaterUserUseCase = container.resolve(UpdateWaterUserUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateWaterUserDTO) => updateWaterUserUseCase.execute(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["water-users"] });
      queryClient.invalidateQueries({ queryKey: ["water-users", id] });
    },
  });
};
