import { LogoutUsecase } from "@domain/authentication/usecases/logout.usecase";
import { useMutation } from "@tanstack/react-query";
import { container } from "tsyringe";

export const useLogout = () => {
  const useCase = container.resolve(LogoutUsecase);
  const result = useMutation({
    mutationFn: () => useCase.execute(),
  });
  return result;
};
