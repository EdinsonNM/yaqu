"use client";

import {
  MoreHorizontalIcon,
  type LucideIcon,
  ChevronDownIcon,
  BuildingIcon,
  CheckIcon,
  PlusIcon,
  Building2Icon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import useRestaurantStore from "@presentation/store/restaurant-store";
import { useUserRestaurantsByUserId } from "@infra/user_restaurant/hooks/use-user-restaurants-by-user-id";
import useAuthStore from "@presentation/store/auth-store";
import { UserRestaurant } from "@domain/user_restaurant/models/user-restaurant.model";

export function NavAdmin({
  title,
  items,
}: {
  title: string;
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();
  const { currentRestaurant, setCurrentRestaurant } = useRestaurantStore();
  const { userSession } = useAuthStore();
  const { data: userRestaurants } = useUserRestaurantsByUserId(
    userSession?.user.id ?? ""
  );

  const location = useLocation();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {/* Selector de restaurante */}
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="justify-between">
                <div className="flex items-center gap-2">
                  <BuildingIcon />
                  <span>{currentRestaurant?.name ?? "Seleccione..."}</span>
                </div>
                <ChevronDownIcon className="h-4 w-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align={isMobile ? "end" : "start"}
            >
              {userRestaurants?.map((userRestaurant: UserRestaurant) => (
                <DropdownMenuItem
                  key={userRestaurant.restaurant!.id}
                  onClick={() =>
                    setCurrentRestaurant(userRestaurant.restaurant!)
                  }
                >
                  <BuildingIcon className="mr-2 h-4 w-4" />
                  <span>{userRestaurant.restaurant!.name}</span>
                  {currentRestaurant?.id === userRestaurant.restaurant!.id && (
                    <CheckIcon className="ml-auto h-4 w-4 text-green-500" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>

        {/* Elementos existentes */}
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {currentRestaurant ? (
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  className={
                    location.pathname === item.url
                      ? "min-w-8 bg-orange-500 text-primary-foreground hover:bg-orange-500/90 active:bg-orange-500/90"
                      : ""
                  }
                >
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton disabled>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontalIcon className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
