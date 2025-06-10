import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { CreateWaterUserUseCase } from "../../../domain/water-users/usecases/create-water-user.usecase";
import { CreateWaterUserDTO } from "../../../domain/water-users/dtos/create-water-user.dto";

export const useWaterUserCreate = () => {
  const createWaterUserUseCase = container.resolve(CreateWaterUserUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWaterUserDTO) => createWaterUserUseCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["water-users"] });
    },
  });
};
