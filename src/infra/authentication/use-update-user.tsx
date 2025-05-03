import { UpdateUserDTO } from "@domain/authentication/models/user";
import { UpdateUserUsecase } from "@domain/authentication/usecases/update-user.usecase";
import { useMutation } from "@tanstack/react-query";
import { container } from "tsyringe";

export const useUpdateUser = () => {
  const useCase = container.resolve(UpdateUserUsecase);
  const result = useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: UpdateUserDTO }) => 
      useCase.execute(id, userData),
  });
  return result;
};
