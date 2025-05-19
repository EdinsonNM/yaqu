import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "tsyringe";
import { CreateTabletUseCase } from "../../../domain/tablets/usecases/create-tablet.usecase";

export const useTabletCreate = () => {
  const createTabletUseCase = container.resolve(CreateTabletUseCase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createTabletUseCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tablets"] });
    },
  });
};
