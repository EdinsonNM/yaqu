import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { DeleteTabletUseCase } from "../../../domain/tablets/usecases/delete-tablet.usecase";

export const useTabletDelete = () => {
  const deleteTabletUseCase = container.resolve(DeleteTabletUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTabletUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tablets"] });
    },
  });
};
