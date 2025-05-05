import { GetByEmailUserUsecase } from "@domain/authentication/usecases/get-by-email-user.usecase";
import { useMutation } from "@tanstack/react-query";
import { container } from "tsyringe";

export const useGetByEmailUser = () => {
  const useCase = container.resolve(GetByEmailUserUsecase);
  const result = useMutation({
    mutationFn: (email: string) => useCase.execute(email),
  });
  return result;
};
