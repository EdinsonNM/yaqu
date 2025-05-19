import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { GetMenuItemsByMenuIdUseCase } from "../../../domain/menu_item/usecases/get-menu-items-by-menu-id.usecase";

export const useMenuItemsGetByMenuId = (menuId: string) => {
  const getMenuItemsByMenuIdUseCase = container.resolve(
    GetMenuItemsByMenuIdUseCase
  );

  return useQuery({
    queryKey: ["menuItems", "byMenu", menuId],
    queryFn: () => getMenuItemsByMenuIdUseCase.execute(menuId),
    enabled: !!menuId,
  });
};
