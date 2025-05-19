import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetMenuByIdUseCase } from "../../../domain/menu/usecases/get-menu-by-id.usecase";

export const useMenuGetById = (id: string) => {
  const getMenuByIdUseCase = container.resolve(GetMenuByIdUseCase);

  return useQuery({
    queryKey: ["menus", id],
    queryFn: () => getMenuByIdUseCase.execute(id),
    enabled: !!id,
  });
};
