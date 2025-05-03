import { LoginUsecase } from "@domain/authentication/usecases/login.usecase";
import { useMutation } from "@tanstack/react-query";
import { container } from "tsyringe";

export const useLogin = () => {
  const useCase = container.resolve(LoginUsecase);
  const result = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      useCase.execute(email, password),
  });
  return result;
};
