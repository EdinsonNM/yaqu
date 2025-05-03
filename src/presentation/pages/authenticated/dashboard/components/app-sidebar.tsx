"use client";

import * as React from "react";
import {
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
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
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavDocuments } from "./nav-documents";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Restaurantes",
      url: "#",
      icon: ListIcon,
    },
    {
      title: "Reportes",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Usuarios",
      url: "#",
      icon: UsersIcon,
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
      name: "Mi Restaurante",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Pedidos",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Reportes",
      url: "#",
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
        <img src={"/logo.png"} alt="Logo" className="w-30 mx-auto" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments title="Restaurante" items={data.documents} />
        <NavDocuments title="Cocina" items={data.kitchen} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
