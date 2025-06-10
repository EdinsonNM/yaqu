import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetAllWaterUsersUseCase } from "../../../domain/water-users/usecases/get-all-water-users.usecase";

export const useWaterUsersGetAll = () => {
  const getAllWaterUsersUseCase = container.resolve(GetAllWaterUsersUseCase);

  return useQuery({
    queryKey: ["water-users"],
    queryFn: () => getAllWaterUsersUseCase.execute(),
  });
};
