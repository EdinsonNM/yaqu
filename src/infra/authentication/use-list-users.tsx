import { ListUsersUsecase } from "@domain/authentication/usecases/list-users.usecase";
import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";

export const useListUsers = (role?: string) => {
  const useCase = container.resolve(ListUsersUsecase);
  const result = useQuery({
    queryKey: ["users", role], 
    queryFn: () => useCase.execute(role),
  });
  return result;
};
