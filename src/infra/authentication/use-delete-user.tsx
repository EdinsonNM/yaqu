import { DeleteUserUsecase } from "@domain/authentication/usecases/delete-user.usecase";
import { useMutation } from "@tanstack/react-query";
import { container } from "tsyringe";

export const useDeleteUser = () => {
  const useCase = container.resolve(DeleteUserUsecase);
  const result = useMutation({
    mutationFn: (userId: string) => useCase.execute(userId),
  });
  return result;
};
