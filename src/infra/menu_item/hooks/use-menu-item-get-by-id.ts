import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetMenuItemByIdUseCase } from "../../../domain/menu_item/usecases/get-menu-item-by-id.usecase";

export const useMenuItemGetById = (id: string) => {
  const getMenuItemByIdUseCase = container.resolve(GetMenuItemByIdUseCase);

  return useQuery({
    queryKey: ["menuItems", id],
    queryFn: () => getMenuItemByIdUseCase.execute(id),
    enabled: !!id,
  });
};
