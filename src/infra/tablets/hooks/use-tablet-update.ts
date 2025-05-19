import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { UpdateTabletUseCase } from "../../../domain/tablets/usecases/update-tablet.usecase";

export const useTabletUpdate = () => {
  const updateTabletUseCase = container.resolve(UpdateTabletUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateTabletUseCase.execute(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tablets"] });
    },
  });
};
