import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetWaterUserByIdUseCase } from "../../../domain/water-users/usecases/get-water-user-by-id.usecase";

export const useWaterUserGetById = (id: string) => {
  const getWaterUserByIdUseCase = container.resolve(GetWaterUserByIdUseCase);

  return useQuery({
    queryKey: ["water-users", id],
    queryFn: () => getWaterUserByIdUseCase.execute(id),
    enabled: !!id,
  });
};
