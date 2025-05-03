import { CreateUserDTO } from "@domain/authentication/models/user";
import { CreateUserUsecase } from "@domain/authentication/usecases/create-user.usecase";
import { useMutation } from "@tanstack/react-query";
import { container } from "tsyringe";

export const useCreateUser = () => {
  const useCase = container.resolve(CreateUserUsecase);
  const result = useMutation({
    mutationFn: (userData: CreateUserDTO) => useCase.execute(userData),
  });
  return result;
};
