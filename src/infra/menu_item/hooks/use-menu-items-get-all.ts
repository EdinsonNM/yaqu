import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetAllMenuItemsUseCase } from "../../../domain/menu_item/usecases/get-all-menu-items.usecase";

export const useMenuItemsGetAll = () => {
  const getAllMenuItemsUseCase = container.resolve(GetAllMenuItemsUseCase);

  return useQuery({
    queryKey: ["menuItems"],
    queryFn: () => getAllMenuItemsUseCase.execute(),
  });
};
