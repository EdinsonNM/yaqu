"use client";

import * as React from "react";
import {
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/presentation/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { ProtectedRoute } from "@presentation/components/molecules/protected-route/protected-route";
import { RoleName } from "@domain/authentication/enums/role.enum";
import { NavAdmin } from "./nav-admin";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Usuarios",
      url: "/dashboard/usuarios",
      icon: UsersIcon,
    },
    {
      title: "Restaurantes",
      url: "/dashboard/restaurantes",
      icon: ListIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      title: "Dashboard",
      url: "/dashboard/dashboard-admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Mi Restaurante",
      url: "/dashboard/mi-restaurante",
      icon: DatabaseIcon,
    },
    {
      title: "Pedidos",
      url: "/dashboard/restaurantes/1/pedidos",
      icon: ClipboardListIcon,
    },
    {
      title: "Reportes",
      url: "/dashboard/restaurantes/1/reportes",
      icon: FileIcon,
    },
  ],
  kitchen: [
    {
      name: "Cocina",
      url: "#",
      icon: FileIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <img src={"/carta_viva.png"} alt="Logo" className="w-30 mx-auto" />
      </SidebarHeader>
      <SidebarContent>
        <ProtectedRoute allowedRoles={[RoleName.SUPER_ADMIN]}>
          <NavMain title="Administración General" items={data.navMain} />
        </ProtectedRoute>
        <ProtectedRoute allowedRoles={[RoleName.SUPER_ADMIN, RoleName.ADMIN]}>
          <NavAdmin
            title="Administrador de Restaurantes"
            items={data.documents}
          />
        </ProtectedRoute>

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
