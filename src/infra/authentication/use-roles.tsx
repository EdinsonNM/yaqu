import { RolesUseCase } from "@domain/authentication/usecases/roles.usecase";
import { useMutation } from "@tanstack/react-query";
import { container } from "tsyringe";

export const useRoles = () => {
  const useCase = container.resolve(RolesUseCase);
  const result = useMutation({
    mutationFn: (id: string) => useCase.execute(id),
  });
  return result;
};
